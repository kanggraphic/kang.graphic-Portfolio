/**
 * Google Sheets → Sanity CMS Sync Script
 * 
 * This script synchronizes data from Google Sheets to Sanity CMS
 * Supporting: Project, Article, Category, and Client documents
 * 
 * Installation:
 * 1. Open Google Sheets
 * 2. Extensions → Apps Script
 * 3. Copy all files from this folder
 * 4. Set up Script Properties (see CONFIG.md)
 * 5. Run `setupTriggers()` once to enable auto-sync
 * 
 * Usage:
 * - Edit any row in the sheets → Auto-sync triggers
 * - Use custom menu "Sanity Sync" → Manual sync options
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  SANITY_PROJECT_ID: PropertiesService.getScriptProperties().getProperty('SANITY_PROJECT_ID') || 'mhicus98',
  SANITY_DATASET: PropertiesService.getScriptProperties().getProperty('SANITY_DATASET') || 'production',
  SANITY_TOKEN: PropertiesService.getScriptProperties().getProperty('SANITY_TOKEN'),
  SANITY_API_VERSION: '2024-01-01',
  VERCEL_DEPLOY_HOOK: PropertiesService.getScriptProperties().getProperty('VERCEL_DEPLOY_HOOK'),
  
  SHEET_NAMES: {
    PROJECT: 'Project',
    ARTICLE: 'Article',
    CATEGORY: 'Category',
    CLIENT: 'Client'
  }
};

function getSanityUrl() {
  return `https://${CONFIG.SANITY_PROJECT_ID}.api.sanity.io/v${CONFIG.SANITY_API_VERSION}/data/mutate/${CONFIG.SANITY_DATASET}`;
}

// ============================================================================
// MAIN SYNC FUNCTIONS
// ============================================================================

/**
 * Sync all sheets to Sanity
 */
function syncAllToSanity() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let results = {
    categories: syncCategories(ss),
    clients: syncClients(ss),
    projects: syncProjects(ss),
    articles: syncArticles(ss)
  };
  
  Logger.log('Sync completed:', results);
  
  // Trigger Vercel deployment
  if (CONFIG.VERCEL_DEPLOY_HOOK) {
    triggerVercelDeploy();
  }
  
  SpreadsheetApp.getUi().alert('✅ Sync completed successfully!\\n\\n' + JSON.stringify(results, null, 2));
  return results;
}

/**
 * Sync only Categories
 */
function syncCategories(ss) {
  ss = ss || SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.CATEGORY);
  if (!sheet) return {error: 'Category sheet not found'};
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  let mutations = [];
  
  rows.forEach((row, index) => {
    if (!row[0]) return; // Skip empty rows
    
    const doc = {
      _type: 'category',
      _id: `category-${generateSlug(row[1])}`, // Use nameEn slug as ID
      nameKr: row[0],
      nameEn: row[1],
      slug: { current: row[2] || generateSlug(row[1]) },
      color: row[3] || '#000000',
      order: row[4] || index + 1
    };
    
    mutations.push({
      createOrReplace: doc
    });
  });
  
  return executeSanityMutations(mutations);
}

/**
 * Sync only Clients
 */
function syncClients(ss) {
  ss = ss || SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.CLIENT);
  if (!sheet) return {error: 'Client sheet not found'};
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  let mutations = [];
  
  rows.forEach((row, index) => {
    if (!row[0]) return; // Skip empty rows
    
    const doc = {
      _type: 'client',
      _id: `client-${generateSlug(row[1])}`,
      nameKr: row[0],
      nameEn: row[1],
      slug: { current: row[2] || generateSlug(row[1]) },
      website: row[4] || undefined
    };
    
    // Handle logo image if URL provided
    if (row[3]) {
      doc.logo = uploadImageFromUrl(row[3]);
    }
    
    mutations.push({
      createOrReplace: doc
    });
  });
  
  return executeSanityMutations(mutations);
}

/**
 * Sync only Projects
 */
function syncProjects(ss) {
  ss = ss || SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.PROJECT);
  if (!sheet) return {error: 'Project sheet not found'};
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  let mutations = [];
  
  rows.forEach((row, index) => {
    if (!row[1]) return; // Skip if no titleKr
    
    const slug = row[3] || generateSlug(row[2]); // Use slug column or generate from titleEn
    const visibility = row[12] !== false && row[12] !== 'FALSE'; // Default true
    
    // If visibility is false, delete the document
    if (!visibility) {
      mutations.push({
        delete: { id: `project-${slug}` }
      });
      return;
    }
    
    const doc = {
      _type: 'project',
      _id: `project-${slug}`,
      year: parseInt(row[0]) || new Date().getFullYear(),
      title: {
        ko: row[1],
        en: row[2]
      },
      slug: { current: slug },
      category: { _type: 'reference', _ref: `category-${generateSlug(row[4])}` },
      tags: row[5] ? row[5].split(',').map(t => t.trim()) : [],
      description: {
        ko: row[6] || '',
        en: row[7] || ''
      },
      featured: row[12] === true || row[12] === 'TRUE',
      visibility: visibility,
      date: `${row[0]}-${getMonthAbbr(new Date().getMonth() + 1)}` // Legacy field
    };
    
    // Add optional fields
    if (row[13]) doc.client = { _type: 'reference', _ref: `client-${generateSlug(row[13])}` };
    if (row[14]) doc.collaborators = row[14];
    if (row[15]) doc.externalLink = row[15];
    
    // Handle cover image
    if (row[10]) {
      doc.coverImage = uploadImageFromUrl(row[10]);
    }
   
   // Handle gallery images
    if (row[11]) {
      const imageUrls = row[11].split(',').map(url => url.trim());
      doc.images = imageUrls.map(url => uploadImageFromUrl(url)).filter(img => img);
    }
    
    mutations.push({
      createOrReplace: doc
    });
  });
  
  return executeSanityMutations(mutations);
}

/**
 * Sync only Articles
 */
function syncArticles(ss) {
  ss = ss || SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.ARTICLE);
  if (!sheet) return {error: 'Article sheet not found'};
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  let mutations = [];
  
  rows.forEach((row, index) => {
    if (!row[1]) return; // Skip if no titleKr
    
    const slug = row[3] || generateSlug(row[2]);
    const visibility = row[10] !== false && row[10] !== 'FALSE'; // Default true
    
    // If visibility is false, delete
    if (!visibility) {
      mutations.push({
        delete: { id: `article-${slug}` }
      });
      return;
    }
    
    const doc = {
      _type: 'article',
      _id: `article-${slug}`,
      title: {
        ko: row[1],
        en: row[2]
      },
      slug: { current: slug },
      publishedAt: row[0] ? new Date(row[0]).toISOString() : new Date().toISOString(),
      category: row[4] ? { _type: 'reference', _ref: `category-${generateSlug(row[4])}` } : undefined,
      author: row[10] || undefined,
      excerpt: {
        ko: row[5] || '',
        en: row[6] || ''
      },
      visibility: visibility
    };
    
    // Handle cover image
    if (row[9]) {
      doc.coverImage = uploadImageFromUrl(row[9]);
    }
    
    mutations.push({
      createOrReplace: doc
    });
  });
  
  return executeSanityMutations(mutations);
}

// ============================================================================
// SANITY API HELPERS
// ============================================================================

/**
 * Execute mutations in Sanity
 */
function executeSanityMutations(mutations) {
  if (!mutations || mutations.length === 0) {
    return { success: true, count: 0 };
  }
  
  const url = getSanityUrl();
  const payload = { mutations: mutations };
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': `Bearer ${CONFIG.SANITY_TOKEN}`
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    
    if (response.getResponseCode() === 200) {
      Logger.log(`✅ Successfully synced ${mutations.length} documents`);
      return { success: true, count: mutations.length, result: result };
    } else {
      Logger.log(`❌ Error: ${response.getContentText()}`);
      return { success: false, error: result };
    }
  } catch (error) {
    Logger.log(`❌ Exception: ${error.toString()}`);
    return { success: false, error: error.toString() };
  }
}

/**
 * Upload image from URL to Sanity
 */
function uploadImageFromUrl(imageUrl) {
  if (!imageUrl) return null;
  
  try {
    const imageResponse = UrlFetchApp.fetch(imageUrl);
    const imageBlob = imageResponse.getBlob();
    
    // Upload to Sanity Assets API
    const uploadUrl = `https://${CONFIG.SANITY_PROJECT_ID}.api.sanity.io/v${CONFIG.SANITY_API_VERSION}/assets/images/${CONFIG.SANITY_DATASET}`;
    
    const options = {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${CONFIG.SANITY_TOKEN}`
      },
      payload: imageBlob,
      muteHttpExceptions: true
    };
    
    const response = UrlFetchApp.fetch(uploadUrl, options);
    const result = JSON.parse(response.getContentText());
    
    if (response.getResponseCode() === 200) {
      return {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: result.document._id
        }
      };
    } else {
      Logger.log(`Failed to upload image: ${imageUrl}`);
      return null;
    }
  } catch (error) {
    Logger.log(`Image upload error: ${error.toString()}`);
    return null;
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function generateSlug(text) {
  if (!text) return '';
  return text.toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function getMonthAbbr(month) {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  return months[month - 1] || 'JAN';
}

// ============================================================================
// VERCEL DEPLOYMENT
// ============================================================================

function triggerVercelDeploy() {
  if (!CONFIG.VERCEL_DEPLOY_HOOK) {
    Logger.log('⚠️ No Vercel deploy hook configured');
    return false;
  }
  
  try {
    const options = {
      method: 'post',
      muteHttpExceptions: true
    };
    
    const response = UrlFetchApp.fetch(CONFIG.VERCEL_DEPLOY_HOOK, options);
    Logger.log('✅ Vercel deployment triggered');
    return true;
  } catch (error) {
    Logger.log(`❌ Vercel deployment failed: ${error.toString()}`);
    return false;
  }
}

// ============================================================================
// TRIGGERS & MENU
// ============================================================================

/**
 * Create custom menu when spreadsheet opens
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🔄 Sanity Sync')
    .addItem('Sync All', 'syncAllToSanity')
    .addSeparator()
    .addItem('Sync Categories Only', 'syncCategories')
    .addItem('Sync Clients Only', 'syncClients')
    .addItem('Sync Projects Only', 'syncProjects')
    .addItem('Sync Articles Only', 'syncArticles')
    .addSeparator()
    .addItem('Setup Auto-Sync', 'setupTriggers')
    .addItem('Test Vercel Deploy', 'triggerVercelDeploy')
    .addToUi();
}

/**
 * Setup automatic triggers
 * Run this once after installing the script
 */
function setupTriggers() {
  // Delete existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // Create new trigger for onChange
  ScriptApp.newTrigger('onSheetChange')
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onChange()
    .create();
  
  Logger.log('✅ Triggers setup completed');
  SpreadsheetApp.getUi().alert('Auto-sync triggers installed!');
}

/**
 * Handle sheet changes
 */
function onSheetChange(e) {
  // Debounce - wait a bit before syncing
  Utilities.sleep(2000);
  syncAllToSanity();
}
