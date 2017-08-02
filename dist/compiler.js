"use strict";
function isObject(val) {
    if (val === null) {
        return false;
    }
    return ((typeof val === 'function') || (typeof val === 'object'));
}
function camelCaseToDash(myStr) {
    return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
var repeatChars = function (char, num) { return new Array(num).fill(char).join(''); };
function mapValues(obj, func) {
    var newObj = {};
    for (var prop in obj) {
        var value = obj[prop];
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
function resolveAncestorRefs(rawStyleObj, indent) {
    if (indent === void 0) { indent = 0; }
    var style = rawStyleObj;
    var newObj = {};
    for (var prop in style) {
        var value = style[prop];
        if (isObject(value)) {
            if (typeof prop === 'string') {
                var ampersandList = prop.match(/&+/g);
                console.log({ ampersandList: ampersandList });
                if (ampersandList) {
                }
            }
            var resolved = resolveAncestorRefs(value);
            newObj[prop] = resolved;
        }
        else {
            newObj[prop] = value;
        }
    }
    console.log({ newObj: newObj });
    return newObj;
}
function objToCss(styleObj, minified, indent) {
    if (minified === void 0) { minified = false; }
    if (indent === void 0) { indent = 0; }
    var space = minified ? '' : ' ';
    var tab = minified ? '' : '  ';
    var nl = minified ? '' : '\n';
    var string = '';
    var indentation = repeatChars(tab, indent);
    for (var prop in styleObj) {
        var value = styleObj[prop];
        if (isObject(value)) {
            var body = objToCss(value, minified, indent + 1);
            string += "" + indentation + prop + space + "{" + nl + body + indentation + "}" + nl;
        }
        else {
            var normalProp = camelCaseToDash(prop);
            string += ("" + indentation + normalProp + ":" + space + value + ";" + nl);
        }
    }
    return string;
}
function compiler(style, minified) {
    if (minified === void 0) { minified = true; }
    var resolvedAncestors = resolveAncestorRefs(style);
    var css = objToCss(resolvedAncestors, minified);
    return css;
}
module.exports = compiler;
