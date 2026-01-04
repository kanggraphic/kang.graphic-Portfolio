/**
 * Sanity HTTP API Client
 * No package dependencies - uses native fetch
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mhicus98';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';

export interface SanityImageAsset {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface Project {
  _id: string;
  _type: 'project';
  title: {
    ko: string;
    en: string;
  };
  date: string;
  category: {
    ko: string;
    en: string;
  };
  tags: string[];
  description?: {
    ko: string;
    en: string;
  };
  images?: SanityImageAsset[];
  featured?: boolean;
}

export interface Article {
  _id: string;
  _type: 'article';
  title: {
    ko: string;
    en: string;
  };
  slug: {
    current: string;
  };
  publishedAt: string;
  category: string;
  excerpt?: {
    ko: string;
    en: string;
  };
  coverImage?: SanityImageAsset;
}

export interface About {
  _id: string;
  _type: 'about';
  name: {
    ko: string;
    en: string;
  };
  role: {
    ko: string;
    en: string;
  };
  bio: {
    ko: string;
    en: string;
  };
  email?: string;
  phone?: string;
  social?: {
    instagram?: string;
    linkedin?: string;
    behance?: string;
  };
  expertise?: Array<{
    ko: string;
    en: string;
  }>;
  experience?: Array<{
    title: { ko: string; en: string };
    role: { ko: string; en: string };
    period: string;
    description: { ko: string; en: string };
  }>;
  education?: Array<{
    degree: string;
    school: string;
    year: string;
  }>;
  clients?: string[];
}

/**
 * Execute a GROQ query against Sanity API
 */
export async function sanityFetch<T = any>(query: string): Promise<T> {
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Sanity API error: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Failed to fetch from Sanity:', error);
    throw error;
  }
}

/**
 * Get Sanity image URL
 */
export function getSanityImageUrl(image: SanityImageAsset, width?: number): string {
  if (!image?.asset?._ref) return '';

  const ref = image.asset._ref;
  const [, id, dimensions, format] = ref.split('-');

  let url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;

  if (width) {
    url += `?w=${width}&auto=format`;
  }

  return url;
}

/**
 * Common GROQ queries
 */
export const queries = {
  // Get all projects
  allProjects: `*[_type == "project"] | order(date desc) {
    _id,
    title,
    date,
    category,
    tags,
    description,
    images,
    featured
  }`,

  // Get single project by ID
  projectById: (id: string) => `*[_type == "project" && _id == "${id}"][0] {
    _id,
    title,
    date,
    category,
    tags,
    description,
    images,
    featured
  }`,

  // Get all articles
  allArticles: `*[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    category,
    excerpt,
    coverImage
  }`,

  // Get single article by slug
  articleBySlug: (slug: string) => `*[_type == "article" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    publishedAt,
    category,
    excerpt,
    coverImage,
    content
  }`,

  // Get about data
  about: `*[_type == "about"][0] {
    _id,
    name,
    role,
    bio,
    email,
    phone,
    social,
    expertise,
    experience,
    education,
    clients
  }`,
};
