import { IContent } from "../interfaces/content";

export const generateHtmlTag = (
    componentData: IContent,
    prefix?: string,
    fileUrl?: string,
    innerHTML?: string,
): string => {
    if (!componentData) {
        throw new Error("Could not generate HTML tag: Component data is undefined");
    }
    return `<${generateTagName(componentData.type, prefix)}
                data-resources="[{paths: ['${fileUrl ? fileUrl : ``}index.ts']}]"
                ${Object.keys(componentData.data).map((key) => generateAttribute(componentData.data[key], key)).join(" ")}
            >
                ${innerHTML ? innerHTML : ``}
            </${generateTagName(componentData.type, prefix)}>`;
};

const generateTagName = (componentType: string, prefix?: string) => {
    return `${prefix ? camelSnakeToKebab(prefix) + `-` : ``}${camelSnakeToKebab(componentType)}`;
};

const generateAttribute = (value: string | number | any[] | any, key: string) => {
    if (typeof value === "number") {
        return `${camelSnakeToKebab(key)}=${value}`;
    }
    if (typeof value === "string") {
        return `${camelSnakeToKebab(key)}="${value}"`;
    }
    return `${camelSnakeToKebab(key)}="${JSON.stringify(value)}"`;
};

const camelSnakeToKebab = (camel: string) => {
    return camel
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .replace(/([A-Z])([A-Z])(?=[a-z])/g, "$1-$2")
      .replace(/_/g, "-")
      .toLowerCase();
};
