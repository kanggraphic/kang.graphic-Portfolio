import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {name: 'ko', type: 'string', title: 'Korean'},
        {name: 'en', type: 'string', title: 'English'},
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
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'Format: YYYY-MMM (e.g., 2025-JAN)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'object',
      fields: [
        {name: 'ko', type: 'string', title: 'Korean'},
        {name: 'en', type: 'string', title: 'English'},
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {name: 'ko', type: 'text', title: 'Korean', rows: 3},
        {name: 'en', type: 'text', title: 'English', rows: 3},
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
            {type: 'block'},
            {
              type: 'image',
              options: {hotspot: true},
            },
          ],
        },
        {
          name: 'en',
          type: 'array',
          title: 'English',
          of: [
            {type: 'block'},
            {
              type: 'image',
              options: {hotspot: true},
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
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this project on the homepage',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      titleKo: 'title.ko',
      titleEn: 'title.en',
      date: 'date',
      media: 'coverImage',
    },
    prepare(selection) {
      const {titleKo, titleEn, date, media} = selection
      return {
        title: titleKo || titleEn,
        subtitle: date,
        media,
      }
    },
  },
})
