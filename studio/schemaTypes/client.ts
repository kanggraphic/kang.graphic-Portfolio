import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'client',
    title: 'Client',
    type: 'document',
    fields: [
        defineField({
            name: 'nameKr',
            title: 'Name (Korean)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'nameEn',
            title: 'Name (English)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'nameEn',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'website',
            title: 'Website',
            type: 'url',
        }),
    ],
    preview: {
        select: {
            nameKr: 'nameKr',
            nameEn: 'nameEn',
            media: 'logo',
        },
        prepare(selection) {
            const { nameKr, nameEn, media } = selection
            return {
                title: nameKr || nameEn,
                media,
            }
        },
    },
})
