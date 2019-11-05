export const renderConfig = {
    components: ['navigation', 'accordion_container', 'accordion_item', 'footer'],
    attributesOnly: [],
    mapping: [
        {
            htmlTag: 'header',
            property: 'mainNavigation'
        },
        {
            htmlTag: 'main',
            property: 'content'
        },
        {
            htmlTag: 'footer',
            property: 'footer'
        }
    ],
    prefix: 'x',
    fileUrl: 'src/components/'
};