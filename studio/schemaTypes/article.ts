import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
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
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Article author name',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'object',
      fields: [
        { name: 'ko', type: 'text', title: 'Korean', rows: 3 },
        { name: 'en', type: 'text', title: 'English', rows: 3 },
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
      name: 'content',
      title: 'Content',
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
      name: 'visibility',
      title: 'Visibility',
      type: 'boolean',
      description: 'If false, article will be hidden from the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      titleKo: 'title.ko',
      titleEn: 'title.en',
      date: 'publishedAt',
      media: 'coverImage',
      visible: 'visibility',
    },
    prepare(selection) {
      const { titleKo, titleEn, date, media, visible } = selection
      return {
        title: `${visible === false ? '🔒 ' : ''}${titleKo || titleEn}`,
        subtitle: date ? new Date(date).toLocaleDateString() : 'No date',
        media,
      }
    },
  },
})
