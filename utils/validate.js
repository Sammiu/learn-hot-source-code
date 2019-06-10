'use strict';

export function verifyInteger(value) {
    if (value) {
        return value.replace(/[^\d]/g, '')
    }
    return value
}

const numRegExp = new RegExp('^[0-9]*$');

export function verifyFloat(value) {
    if (value) {
        let index = 0;
        let temp = [];
        let hasDecimalPoint = false;
        while (value[index]) {
            if (numRegExp.test(value[index])) {
                temp.push(value[index]);
            } else if (value[index] === '.' && index > 0 && hasDecimalPoint === false) {
                temp.push('.');
                hasDecimalPoint = true;
            }
            index++;
        }
        return temp.join('')
    }
    return value
}
