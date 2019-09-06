'use strict';

/**
 * 只输入整数值
 * 会根据传入的value 进行正则替换掉非数字的值, 包括小数点
 *
 * @param {string} value 值
 * */
export function onlyInputInteger(value: string): string {
    if (value) {
        return value.replace(/[^\d]/g, '')
    }
    return value
}

const numRegExp = new RegExp('^[0-9]*$');

/**
 * 只输入整数值或者小数
 * 会根据传入的value 进行正则替换掉非数字的值
 *
 * @param {string} value 值
 * */
export function onlyInputFloat(value: string): string {
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

/**
 * 只输入不包含文字的值
 * 会根据传入的value 进行正则替换掉文字的值
 *
 * @param {string} value 值
 * */
export function onlyInputNotChineseCharacters(value: string): string {
    if (value) {
        return value.replace(/^[\u4e00-\u9fa5]/g, '')
    }
    return value
}

/**
 * 验证身份证号码
 *
 * @param {string} value 值
 * */
export function verifyIDCardNo(value: string): boolean {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/.test(value)
}

/**
 * 验证手机号码
 *
 * @param {string} value 值
 * */
export function verifyPhoneNo(value: string): boolean {
    return /^1(3|4|5|7|8)\d{9}$/.test(value)
}

/**
 * 验证11位整数
 *
 * @param {string} value 值
 * */
export function verifyNumber(value: string): boolean {
    return /^\d{11}$/.test(value)
}

/**
 * 验证全部都是文字
 *
 * @param {string} value 值
 * */
export function verifyChineseCharacters(value: string): boolean {
    return /^[\u4e00-\u9fa5]+$/.test(value)
}

/**
 * 验证数字和字母的结合
 *
 * @param {string} value 值
 * */
export function verifyAlphanumericCombination(value: string): boolean {
    return /^(([A-Za-z]+[0-9]+)|([0-9]+[A-Za-z]+))[A-Za-z0-9]*$/.test(value)
}


/**
 * 验证数字或者字母
 *
 * @param {string} value 值
 * */
export function verifyAlphanumeric(value: string): boolean {
    return /^(([A-Za-z]+)|([0-9]+))[A-Za-z0-9]*$/.test(value)
}



