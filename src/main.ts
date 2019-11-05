import { renderConfig } from './render-config';
import { IRenderConfig } from './interfaces/render-config';
import { generateHtmlTag } from './generate-html-tag/generate-html-tag';
import { IContent } from './interfaces/content';

const pageObject = {
    data: {
        mainNavigation: {
            data: {
                prop1: 'val1',
                prop2: 'val2'
            },
            id: '',
            type: 'navigation'
        },
        content: [
            {
                data: {
                    prop1: 1,
                    subContent: [
                        {
                            data: {
                                propX: 'Y'
                            },
                            id: '',
                            type: 'accordion_item'
                        },
                        {
                            data: {
                                propX: 'Z'
                            },
                            id: '',
                            type: 'accordion_item'
                        }
                    ]
                },
                id: '',
                type: 'accordion_container'
            },
            {
                data: {
                    prop1: 2
                },
                id: '',
                type: 'slider'
            }
        ]
    },
    id: '',
    type: 'page'
}

export const renderPage = (renderConfig: IRenderConfig, pageData: IContent) => {
    if(!renderConfig) {
        throw new Error(`Couldn't render page: render config is undefined`);
    }
    if(!pageData) {
        throw new Error(`Couldn't render page: page data is undefined`);
    }
    const htmlStrings = renderConfig.mapping.map(contentMap => {
        const contentData = pageData.data[contentMap.property];
        if(contentData) {
            if(Array.isArray(contentData)) {
                const htmlContent = contentData.map(singularData => {
                    return renderComponent(singularData, renderConfig);
                });
                return `<${contentMap.htmlTag}>${htmlContent.join('')}</${contentMap.htmlTag}>`
            }
            return `<${contentMap.htmlTag}>
                ${renderComponent(contentData, renderConfig)}
            </${contentMap.htmlTag}>`;
        }
        return '';
    });
    return htmlStrings.join('');
}

export const renderComponent = (componentData: IContent, renderConfig: IRenderConfig): string => {
    let subComponentHTML = ``;
    const strippedData = Object.assign({}, componentData);
    Object.keys(componentData.data).forEach(key => {
        const propData = componentData.data[key];
        
        if (Array.isArray(propData)) {
            for(let i = 0; i < componentData.data[key].length; i++) {
                const subData = componentData.data[key][i];
                if('type' in subData && renderConfig.components.includes(subData.type)) {
                    strippedData.data[key].splice(i, 1);
                    subComponentHTML += renderComponent(subData, renderConfig);
                    i--;
                }
            }
            if(componentData.data[key].length === 0) {
                delete strippedData.data[key];
            }
        }
        else if (typeof propData === 'object') {
            if('type' in propData && renderConfig.components.includes(propData.type)) {
                delete strippedData.data[key];
                subComponentHTML += renderComponent(propData, renderConfig);
            }
        }
    });
    
    return generateHtmlTag(componentData, renderConfig.prefix, renderConfig.fileUrl, subComponentHTML);
}

document.body.innerHTML = renderPage(renderConfig, pageObject);