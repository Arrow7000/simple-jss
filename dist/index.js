"use strict";
exports.__esModule = true;
var compiler = require("./compiler");
var styles = require("./styles");
var css = compiler(styles);
console.log(css);