import {isObject} from 'utils/typeofUtil'

/**
 * 映射视图模型
 *
 * @param {Array, Object} data 数据模型
 * @param {Object} viewModelProps 视图模型
 * */
export function mappingToViewModel(data, viewModelProps) {

    if (Array.isArray(data)) {
        return data.map(o => {
            if (Array.isArray(o)) {
                return mappingToViewModel(o, viewModelProps);
            } else {
                return dataToViewModel(o, viewModelProps)
            }
        })
    } else if (isObject(data)) {
        return dataToViewModel(data, viewModelProps)
    } else {
        return data
    }
}

/**
 * 数据转视图模型
 *
 * @param {Array, Object} data
 * @param {Object} viewModelProps
 * */
export function dataToViewModel(data, viewModelProps) {
    const model = {};

    for (let prop in viewModelProps) {
        const key = viewModelProps[prop];
        /** 如果映射的是一个Object 说明是数据存在嵌套 */
        if (isObject(key)) {
            model[prop] = mappingToViewModel(data[key['$$prop']], viewModelProps[prop])
        } else if (data.hasOwnProperty(key) && key !== '$$prop') {
            if (Array.isArray(data[key]) || isObject(data[key])) {
                model[prop] = mappingToViewModel(data[key], viewModelProps[prop])
            } else {
                model[prop] = data[key]
            }
        }
    }

    return model;
}

function isObject(objectToCheck) {
    return objectToCheck && {}.toString.call(objectToCheck) === '[object Object]'
}
