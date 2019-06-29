/**
 * Object Array 深拷贝
 *
 * @param {Array, Object} data
 * */
function deepCopy(data) {
    if (Array.isArray(data)) {
        return data.map(item => deepCopy(item))
    } else if (isObject(data)) {
        const newObj = {};
        for (let index in data) {
            newObj[index] = deepCopy(data[index])
        }
        return newObj;
    } else {
        return data
    }
}

/**
 * 是否是一个对象
 *
 * @param {Object} objectToCheck
 * */
function isObject(objectToCheck) {
    return objectToCheck && {}.toString.call(objectToCheck) === '[object Object]'
}
