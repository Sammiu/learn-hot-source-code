/**
 * Object Array 深拷贝
 *
 * @param {Array, Object} data
 * */
function deepCopy(data) {
    if (Array.isArray(data)) {
        return data.map(item => deepCopy(item))
    } else if (isObject(data)) {
        return deepCopyObject(data)
    } else {
        return data
    }
}


/**
 * Object 深拷贝
 *
 * @param {Object} obj
 * */
function deepCopyObject(obj) {
    const newObj = {};
    for (let index in obj) {
        newObj[index] = deepCopy(obj[index])
    }
    return newObj;
}

/**
 * 是否是一个对象
 *
 * @param {Object} objectToCheck
 * */
function isObject(objectToCheck) {
    return objectToCheck && {}.toString.call(objectToCheck) === '[object Object]'
}
