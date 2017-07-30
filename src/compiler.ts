import styles = require('./styles');

function isObject(val: any): val is object {
    if (val === null) { return false; }
    return ((typeof val === 'function') || (typeof val === 'object'));
}

function camelCaseToDash(myStr: string): string {
    return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

const repeatChars = (char: string, num: number) => new Array(num).fill(char).join('');


function compiler(style: object, minified: boolean = false, isTop: boolean = true, indent: number = 0) {
    const space = minified ? '' : ' ';
    const tab = minified ? '' : '  ';
    const nl = minified ? '' : '\n';

    let string = '';
    const indentation = repeatChars(tab, indent);

    for (const prop in style) {
        const value = style[prop];
        if (isObject(value)) {
            const body = compiler(value, minified, false, indent + 1);
            string += `${indentation}${prop}${space}{${nl}${body}${indentation}}${nl}`;
        } else {
            const normalProp = camelCaseToDash(prop)
            string += (`${indentation}${normalProp}:${space}${value};${nl}`);
        }
    }

    return string;
}

console.log(compiler(styles));

export = (style: object, minified: boolean) => compiler(style, minified);