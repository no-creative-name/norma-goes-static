export interface IRenderConfig {
    components: string[];
    mapping: IComponentMap[];
    prefix?: string;
    fileUrl?: string;
}

interface IComponentMap {
    htmlTag: string;
    property: string;
}
