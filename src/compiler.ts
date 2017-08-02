
function isObject(val: any): val is object {
    if (val === null) { return false; }
    return ((typeof val === 'function') || (typeof val === 'object'));
}

function camelCaseToDash(myStr: string): string {
    return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

const repeatChars = (char: string, num: number) => new Array(num).fill(char).join('');

type propValue = string | number;

interface StyleObject {
    [propOrSelector: string]: propValue | StyleObject;
}

type iterFunc = <O extends object, K extends keyof O & string, V extends O[keyof O]>(value?: V, key?: K, obj?: O) => object | V;

function mapValues<T extends object>(obj: T, func: iterFunc): T {
    const newObj: T = {} as T;
    for (const prop in obj) {
        const value = obj[prop];
        newObj[prop] = func(value, prop, obj);
    }
    return newObj;
}


// function resolveAncestorRefs(rawStyleObj: StyleObject, indent: number = 0): StyleObject {
//     const style = rawStyleObj;

//     const resolved = mapValues(style, (value, key) => {
//         if (isObject(value)) {
//             const resolved = resolveAncestorRefs(value);
//             return resolved;
//         } else {

//             if (typeof value === 'string') {
//                 const ampersandList = value.match(/&+/g);
//                 if (ampersandList) console.log({ ampersandList });
//                 return value;
//             } else {
//                 return value;
//             }
//         }
//     });
//     console.log({ resolved });
//     return resolved;
// }

function resolveAncestorRefs(rawStyleObj: StyleObject, indent: number = 0): StyleObject {
    const style = rawStyleObj;

    const newObj = {};

    for (const prop in style) {
        const value = style[prop];


        if (isObject(value)) {
            if (typeof prop === 'string') {
                const ampersandList = prop.match(/&+/g);
                console.log({ ampersandList });
                if (ampersandList) {



                }
            }






            const resolved = resolveAncestorRefs(value);
            newObj[prop] = resolved;
        } else {
            newObj[prop] = value;
        }
    }
    console.log({ newObj });
    return newObj;
}








function objToCss(styleObj: StyleObject, minified: boolean = false, indent: number = 0) {
    const space = minified ? '' : ' ';
    const tab = minified ? '' : '  ';
    const nl = minified ? '' : '\n';

    let string = '';
    const indentation = repeatChars(tab, indent);

    for (const prop in styleObj) {
        const value = styleObj[prop];
        if (isObject(value)) {
            const body = objToCss(value, minified, indent + 1);
            string += `${indentation}${prop}${space}{${nl}${body}${indentation}}${nl}`;
        } else {
            const normalProp = camelCaseToDash(prop)
            string += (`${indentation}${normalProp}:${space}${value};${nl}`);
        }
    }

    return string;
}

function compiler(style: StyleObject, minified: boolean = true) {
    const resolvedAncestors = resolveAncestorRefs(style);
    const css = objToCss(resolvedAncestors, minified);
    return css;
}


export = compiler;