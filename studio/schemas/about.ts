import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
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
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'object',
      fields: [
        {name: 'ko', type: 'text', title: 'Korean', rows: 5},
        {name: 'en', type: 'text', title: 'English', rows: 5},
      ],
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        {name: 'instagram', type: 'url', title: 'Instagram'},
        {name: 'behance', type: 'url', title: 'Behance'},
        {name: 'linkedin', type: 'url', title: 'LinkedIn'},
        {name: 'github', type: 'url', title: 'GitHub'},
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
            {name: 'year', type: 'string', title: 'Year'},
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
              name: 'company',
              type: 'object',
              title: 'Company',
              fields: [
                {name: 'ko', type: 'string', title: 'Korean'},
                {name: 'en', type: 'string', title: 'English'},
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role.en',
      media: 'profileImage',
    },
  },
})
