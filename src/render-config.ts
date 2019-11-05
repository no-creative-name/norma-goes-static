export const exampleRenderConfig = {
    components: ["navigation", "accordion_container", "accordion_item", "footer"],
    fileUrl: "src/components/",
    mapping: [
        {
            htmlTag: "header",
            property: "mainNavigation",
        },
        {
            htmlTag: "main",
            property: "content",
        },
        {
            htmlTag: "footer",
            property: "footer",
        },
    ],
    prefix: "x",
};
