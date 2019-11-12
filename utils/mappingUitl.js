
/**
 * 映射数据模型 --
 * 由于mappingToViewModel命名有歧义 现扩展mappingToModel 为过渡性方案
 * 届时将删除 mappingToViewModel, 全部改成 mappingToModel 调用
 *
 * @param {Array, Object} data 数据模型
 * @param {Object} mappingProps 视图模型
 * */
export function mappingToModel(data, mappingProps) {
   if (Array.isArray(data)) {
    return data.map(o => {
      if (Array.isArray(o)) {
        return mappingToModel(o, mappingProps);
      } else {
        return dataToModel(o, mappingProps)
      }
    })
  } else if (isObject(data)) {
    return dataToModel(data, mappingProps)
  } else {
    return data
  }
}

/**
 * 数据转视图模型
 *
 * @param {Array, Object} data
 * @param {Object} mappingProps
 * */
export function dataToModel(data, mappingProps) {
  const model = {};

  for (let prop in mappingProps) {
    const key = mappingProps[prop];
    /** 如果映射的是一个Object 说明是数据存在嵌套 */
    if (isObject(key)) {
      model[prop] = mappingToModel(data[key['$$prop']], mappingProps[prop])
    } else if (data.hasOwnProperty(key) && key !== '$$prop') {
      if (Array.isArray(data[key]) || isObject(data[key])) {
        model[prop] = mappingToModel(data[key], mappingProps[prop])
      } else {
        model[prop] = data[key]
      }
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

console.log(mappingToModel(data, mappingProps));
