

/**
 * 映射视图模型
 *
 * @param {Array, Object} data 数据模型
 * @param {Object} viewModelProps 视图模型
 * */
export function mappingToViewModel(data, viewModelProps) {
    if (Array.isArray(data)) {
        return data.map(o => mappingToViewModel(o, viewModelProps))
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
            model[prop] = mappingToViewModel(data[key], viewModelProps[prop])
        }
    }

    return model;
}

/**
 * 是否是一个对象
 *
 * @param {Object} objectToCheck
 * */
function isObject(objectToCheck) {
    return objectToCheck && {}.toString.call(objectToCheck) === '[object Object]'
}

const mappingProps = {
    data: {
        $$prop: 'rows',
        code: 'orderCode',
        id: 'orderId',
        status: 'orderStatus',
        arr: {
            $$prop: 'items',
            toName: 'name',
            toValue: 'value',
        }
    }
};

const data = {
    "rows": [{
        "orderCode": "600231631980089575",
        "orderStatus": 5,
        "orderId": "1d9db629c4bf41bbbc6b1a344fc9c61d",
        "items": [
            {name: '600231631980089575--1', value: 'gfdgdfg'},
            {name: '600231631980089575--2', value: 'gdfgdfghjfg'}
        ]
    }, {
        "orderCode": "600231622720091155",
        "orderStatus": 6,
        "orderId": "6290382a2a994da6bd86a9fc84001e4a",
        "items": [
            {name: '600231622720091155--1', value: '哈哈哈'},
            {name: '600231622720091155--2', value: '呵呵呵'}
        ]
    }, {
        "orderCode": "600231622770090901",
        "orderStatus": 5,
        "orderId": "29326259ab8347e0b07e31cee6a0760f"
        "items": [
            {name: '600231622770090901--1', value: '嗯嗯嗯'},
            {name: '600231622770090901--2', value: '哦哦哦'}
        ]
    }]
};

console.log(mappingToViewModel(data, mappingProps));
