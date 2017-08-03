import maxBy = require('lodash/maxBy');
import mapKeys = require('lodash/mapKeys');
import mapValues = require('lodash/mapValues');

function isObject(val: any): val is Obj {
    if (val === null) { return false; }
    return ((typeof val === 'function') || (typeof val === 'object'));
}

function camelCaseToDash(myStr: string): string {
    return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

const repeatStr = (str: string, num: number) => new Array(num).fill(str).join('');

type propValue = string | number;

interface StyleObject {
    [propOrSelector: string]: propValue | StyleObject;
}

interface Obj {
    [key: string]: string | number | Obj;
}

interface UnnestedObj {
    [key: string]: string | number;
}

interface CssObj {
    [selector: string]: UnnestedObj;
}


function flatten(style: Obj): Obj {
    console.log(JSON.stringify(style, null, 2));
    const css: Obj = {};
    crawlStyleObj(style, css);

    return css;



    function crawlStyleObj(style: Obj, mount: Obj, parentSelector: string = '') {

        for (const prop in style) {
            const value = style[prop];
            const parent = parentSelector.trim();

            if (isObject(value)) {
                if (parent.startsWith('@media')) {
                    if (!mount[parent]) {
                        mount[parent] = {};
                    }
                    crawlStyleObj(value, mount[parent] as Obj, prop);
                } else {
                    const newSelector = parent + ' ' + prop;
                    crawlStyleObj(value, mount, newSelector);
                }
            } else {
                if (!mount[parent]) {
                    mount[parent] = {};
                }
                mount[parent][prop] = value;
            }
        }
    }
}





function objToCss(styleObj: StyleObject, minified: boolean = false, indent: number = 0) {
    const space = minified ? '' : ' ';
    const tab = minified ? '' : '  ';
    const nl = minified ? '' : '\n';

    let string = '';
    const indentation = repeatStr(tab, indent);

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
    // const resolvedAncestors = resolveAncestorRefs(style);
    // console.log(flatten(style));

    const css = objToCss(flatten(style), minified);
    return css;
}


export = compiler;