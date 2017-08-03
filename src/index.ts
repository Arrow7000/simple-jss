import compiler = require('./compiler');
import styles = require('./styles');

const css = compiler(styles, false);
console.log(css);