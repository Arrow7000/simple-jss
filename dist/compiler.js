"use strict";
var styles = require("./styles");
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
function compiler(style, minified, isTop, indent) {
    if (minified === void 0) { minified = false; }
    if (isTop === void 0) { isTop = true; }
    if (indent === void 0) { indent = 0; }
    var space = minified ? '' : ' ';
    var tab = minified ? '' : '  ';
    var nl = minified ? '' : '\n';
    var string = '';
    var indentation = repeatChars(tab, indent);
    for (var prop in style) {
        var value = style[prop];
        if (isObject(value)) {
            var body = compiler(value, minified, false, indent + 1);
            string += "" + indentation + prop + space + "{" + nl + body + indentation + "}" + nl;
        }
        else {
            var normalProp = camelCaseToDash(prop);
            string += ("" + indentation + normalProp + ":" + space + value + ";" + nl);
        }
    }
    return string;
}
console.log(compiler(styles));
module.exports = function (style, minified) { return compiler(style, minified); };
