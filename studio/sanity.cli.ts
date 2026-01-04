import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'mhicus98',
    dataset: 'production'
  },
  studioHost: process.env.SANITY_STUDIO_HOSTNAME || 'kang-portfolio',
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: false,
  }
})
