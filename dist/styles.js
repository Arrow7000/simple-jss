"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var langs = [
    ['js', 80],
    ['ts', 90],
    ['html', 85],
    ['css', 75],
    ['python', 45],
    ['fs', 15],
];
var mixinWide = function (lang) {
    return _a = {},
        _a["." + lang[0]] = {
            '&.skill': {
                height: lang[1]
            },
            gridArea: lang[0]
        },
        _a;
    var _a;
};
var mixinNarrow = function (lang) {
    return _a = {},
        _a["." + lang[0]] = {
            '&&.skill &': {
                height: '100%',
                width: lang[1]
            }
        },
        _a;
    var _a;
};
var wideClasses = langs.reduce(function (all, lang) {
    var langStyle = mixinWide(lang);
    return __assign({}, all, langStyle);
}, {});
var narrowClasses = langs.reduce(function (all, lang) {
    var langStyle = mixinNarrow(lang);
    return __assign({}, all, langStyle);
}, {});
var styles = __assign({ '.button': {
        'background-color': 'red',
        paddingTop: '4px'
    }, '.item': {
        padding: '10px',
        '.item__button': {
            textAlign: 'center',
            backgroundColor: 'blue'
        }
    }, '.grid-section': {
        display: 'grid',
        gridTemplateColumns: "repeat(" + langs.length + ", 1fr)",
        gridTemplateRows: '100vh',
        gridTemplateAreas: "\"" + langs.map(function (l) { return l[0]; }).join(' ') + "\""
    } }, wideClasses, { '@media (max-width: 768px)': __assign({ '.grid-section': {
            gridTemplateRows: "repeat(" + langs.length + ", calc(100vh / " + langs.length + "))",
            gridTemplateColumns: '1fr',
            gridTemplateAreas: langs.map(function (l) { return "\"" + l[0] + "\""; }).join(' ')
        } }, narrowClasses) });
module.exports = styles;
