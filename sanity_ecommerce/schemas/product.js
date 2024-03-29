export default{
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of:[{type: 'image'}],
            options: {
                hotspot: true,
            }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',

        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        },
        {
            name:'price',
            title:'Price',
            type:'number',
            // description:'Price in cents',
            // validation: Rule => Rule.min(1000).max(1000000),
            validation: Rule => Rule.precision(2),
            
            
        },

        {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Tell us about the product',
        }
    ]
}