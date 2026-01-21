import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      description: 'Project year (e.g., 2025)',
      validation: (Rule) => Rule.required().min(2000).max(2100),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'ko', type: 'string', title: 'Korean' },
        { name: 'en', type: 'string', title: 'English' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'ko', type: 'text', title: 'Korean', rows: 3 },
        { name: 'en', type: 'text', title: 'English', rows: 3 },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Project Details',
      type: 'object',
      fields: [
        {
          name: 'ko',
          type: 'array',
          title: 'Korean',
          of: [
            { type: 'block' },
            {
              type: 'image',
              options: { hotspot: true },
            },
          ],
        },
        {
          name: 'en',
          type: 'array',
          title: 'English',
          of: [
            { type: 'block' },
            {
              type: 'image',
              options: { hotspot: true },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'reference',
      to: [{ type: 'client' }],
    }),
    defineField({
      name: 'collaborators',
      title: 'Collaborators',
      type: 'string',
      description: 'Comma-separated list of collaborators',
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Link to external project page or portfolio',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this project on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'visibility',
      title: 'Visibility',
      type: 'boolean',
      description: 'If false, project will be hidden from the website',
      initialValue: true,
    }),
    // Legacy field for compatibility - will be derived from year
    defineField({
      name: 'date',
      title: 'Date (Legacy)',
      type: 'string',
      description: 'Format: YYYY-MMM (auto-generated from year)',
      hidden: true,
    }),
  ],
  preview: {
    select: {
      titleKo: 'title.ko',
      titleEn: 'title.en',
      year: 'year',
      media: 'coverImage',
      visible: 'visibility',
    },
    prepare(selection) {
      const { titleKo, titleEn, year, media, visible } = selection
      return {
        title: `${visible === false ? '🔒 ' : ''}${titleKo || titleEn}`,
        subtitle: `${year || 'N/A'}`,
        media,
      }
    },
  },
})
