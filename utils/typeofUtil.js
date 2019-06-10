'use strict';

export function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
}

export function isObject(objectToCheck) {
    return objectToCheck && {}.toString.call(objectToCheck) === '[object Object]'
}


/**
 * 不是空数组
 * */
export function isNotEmptyArray(arrayToCheck) {
    return Array.isArray(arrayToCheck) && arrayToCheck.length
}
