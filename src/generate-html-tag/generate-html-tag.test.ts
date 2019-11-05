import { generateHtmlTag } from "./generate-html-tag"

describe('generateHtmlTag', () => {
    test('throws error if component data is undefined', () => {
        expect(() => generateHtmlTag(undefined)).toThrow(Error);
    });
    test('returns tag without prefix if undefined', () => {
        const componentData = {
            data: {
                parameter_1: 'xyz',
                'parameter-2': 45,
                parameterThree: {
                    x: 1
                },
                parameterFour: [
                    {
                        x: 1
                    },
                    {
                        y: 2
                    }
                ]
            },
            id: '',
            type: 'SuperSlider'
        }
        const fileUrl = 'fileUrl';
        const outputTag = `
            <super-slider 
                data-resources="[{paths: ['fileUrl/index.ts']}]"
                parameter-1="xyz"
                parameter-2=45
                parameter-three="{"x": 1}"
                parameter-four="[{"x": 1},{"y": 2}]"
            >
            </super-slider>`
        expect(generateHtmlTag(componentData, undefined, fileUrl).replace(/\s/g, '')).toBe(outputTag.replace(/\s/g, ''));
    });
    test('returns tag without fileUrl extension if undefined', () => {
        const componentData = {
            data: {
                parameter_1: 'xyz',
                'parameter-2': 45,
                parameterThree: {
                    x: 1
                },
                parameterFour: [
                    {
                        x: 1
                    },
                    {
                        y: 2
                    }
                ]
            },
            id: '',
            type: 'SuperSlider'
        }
        const outputTag = `
            <super-slider 
                data-resources="[{paths: ['index.ts']}]"
                parameter-1="xyz"
                parameter-2=45
                parameter-three="{"x": 1}"
                parameter-four="[{"x": 1},{"y": 2}]"
            >
            </super-slider>`
        expect(generateHtmlTag(componentData, undefined, undefined).replace(/\s/g, '')).toBe(outputTag.replace(/\s/g, ''));
    });
    test('returns tag without inner html if defined', () => {
        const componentData = {
            data: {
                parameter_1: 'xyz',
                'parameter-2': 45,
                parameterThree: {
                    x: 1
                },
                parameterFour: [
                    {
                        x: 1
                    },
                    {
                        y: 2
                    }
                ]
            },
            id: '',
            type: 'SuperSlider'
        }
        const outputTag = `
            <super-slider 
                data-resources="[{paths: ['index.ts']}]"
                parameter-1="xyz"
                parameter-2=45
                parameter-three="{"x": 1}"
                parameter-four="[{"x": 1},{"y": 2}]"
            >
            inner
            </super-slider>`
        expect(generateHtmlTag(componentData, undefined, undefined, 'inner').replace(/\s/g, '')).toBe(outputTag.replace(/\s/g, ''));
    });
    test('returns html tag string', () => {
        const componentData = {
            data: {
                parameter_1: 'xyz',
                'parameter-2': 45,
                parameterThree: {
                    x: 1
                },
                parameterFour: [
                    {
                        x: 1
                    },
                    {
                        y: 2
                    }
                ]
            },
            id: '',
            type: 'SuperSlider'
        }
        const prefix = 'prefix';
        const fileUrl = 'fileUrl';
        const outputTag = `
            <prefix-super-slider 
                data-resources="[{paths: ['fileUrl/index.ts']}]"
                parameter-1="xyz"
                parameter-2=45
                parameter-three="{"x": 1}"
                parameter-four="[{"x": 1},{"y": 2}]"
            >
            </prefix-super-slider>`
        expect(generateHtmlTag(componentData, prefix, fileUrl).replace(/\s/g, '')).toBe(outputTag.replace(/\s/g, ''));
    });
});