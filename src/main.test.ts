import { renderPage } from "./main"
import { renderConfig } from "./render-config";

describe('renderPage', () => {
    test('throws error when renderConfig is undefined.', () => {
        expect(() => renderPage(undefined, {data: {}, id:'', type: ''})).toThrow(Error);
    });
    test('throws error when pageData is undefined.', () => {
        expect(() => renderPage(renderConfig, undefined)).toThrow(Error);
    });
})