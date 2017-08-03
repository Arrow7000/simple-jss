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
var repeatStr = function (str, num) { return new Array(num).fill(str).join(''); };
function flatten(style) {
    console.log(JSON.stringify(style, null, 2));
    var css = {};
    crawlStyleObj(style);
    return css;
    function crawlStyleObj(style, parentSelector) {
        if (parentSelector === void 0) { parentSelector = ''; }
        for (var prop in style) {
            var value = style[prop];
            var parent_1 = parentSelector.trim();
            if (isObject(value)) {
                if (parent_1.startsWith('@media')) {
                    // do something else
                }
                else {
                    crawlStyleObj(value, parentSelector + ' ' + prop);
                }
            }
            else {
                css[parent_1] = (_a = {}, _a[prop] = value, _a);
            }
        }
        var _a;
    }
}
function objToCss(styleObj, minified, indent) {
    if (minified === void 0) { minified = false; }
    if (indent === void 0) { indent = 0; }
    var space = minified ? '' : ' ';
    var tab = minified ? '' : '  ';
    var nl = minified ? '' : '\n';
    var string = '';
    var indentation = repeatStr(tab, indent);
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
    // const resolvedAncestors = resolveAncestorRefs(style);
    console.log(flatten(style));
    var css = objToCss(style, minified);
    return css;
}
module.exports = compiler;
