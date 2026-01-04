import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'object',
      fields: [
        {name: 'ko', type: 'string', title: 'Korean'},
        {name: 'en', type: 'string', title: 'English'},
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'object',
      fields: [
        {name: 'ko', type: 'string', title: 'Korean'},
        {name: 'en', type: 'string', title: 'English'},
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'object',
      fields: [
        {name: 'ko', type: 'text', title: 'Korean', rows: 8},
        {name: 'en', type: 'text', title: 'English', rows: 8},
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        {name: 'instagram', type: 'url', title: 'Instagram'},
        {name: 'linkedin', type: 'url', title: 'LinkedIn'},
        {name: 'behance', type: 'url', title: 'Behance'},
      ],
    }),
    defineField({
      name: 'expertise',
      title: 'Expertise',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'ko', type: 'string', title: 'Korean'},
            {name: 'en', type: 'string', title: 'English'},
          ],
        },
      ],
    }),
    defineField({
      name: 'experience',
      title: 'Experience',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'object',
              title: 'Title',
              fields: [
                {name: 'ko', type: 'string', title: 'Korean'},
                {name: 'en', type: 'string', title: 'English'},
              ],
            },
            {
              name: 'role',
              type: 'object',
              title: 'Role',
              fields: [
                {name: 'ko', type: 'string', title: 'Korean'},
                {name: 'en', type: 'string', title: 'English'},
              ],
            },
            {name: 'period', type: 'string', title: 'Period'},
            {
              name: 'description',
              type: 'object',
              title: 'Description',
              fields: [
                {name: 'ko', type: 'text', title: 'Korean'},
                {name: 'en', type: 'text', title: 'English'},
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'degree', type: 'string', title: 'Degree'},
            {name: 'school', type: 'string', title: 'School'},
            {name: 'year', type: 'string', title: 'Year'},
          ],
        },
      ],
    }),
    defineField({
      name: 'clients',
      title: 'Clients',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      title: 'name.ko',
      subtitle: 'role.ko',
    },
  },
})
