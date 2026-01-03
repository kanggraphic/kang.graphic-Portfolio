import {defineField, defineType} from 'sanity'

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
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Design', value: 'design'},
          {title: 'Development', value: 'development'},
          {title: 'Editorial', value: 'editorial'},
          {title: 'Photography', value: 'photography'},
        ],
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'object',
      fields: [
        {name: 'ko', type: 'text', title: 'Korean', rows: 3},
        {name: 'en', type: 'text', title: 'English', rows: 3},
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
          of: [{type: 'block'}, {type: 'image'}],
        },
        {
          name: 'en',
          type: 'array',
          title: 'English',
          of: [{type: 'block'}, {type: 'image'}],
        },
      ],
    }),
  ],
  preview: {
    select: {
      titleKo: 'title.ko',
      titleEn: 'title.en',
      date: 'publishedAt',
      media: 'coverImage',
    },
    prepare(selection) {
      const {titleKo, titleEn, date, media} = selection
      return {
        title: titleKo || titleEn,
        subtitle: date ? new Date(date).toLocaleDateString() : 'No date',
        media,
      }
    },
  },
})
