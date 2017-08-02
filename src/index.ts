import compiler = require('./compiler');
import styles = require('./styles');

const css = compiler(styles);
console.log(css);