import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'category',
    title: 'Category',
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
            name: 'color',
            title: 'Color',
            type: 'string',
            description: 'Hex color code (e.g., #2B2B2B)',
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in which this category appears',
        }),
    ],
    preview: {
        select: {
            nameKr: 'nameKr',
            nameEn: 'nameEn',
            order: 'order',
        },
        prepare(selection) {
            const { nameKr, nameEn, order } = selection
            return {
                title: nameKr || nameEn,
                subtitle: `Order: ${order || 'N/A'}`,
            }
        },
    },
})
