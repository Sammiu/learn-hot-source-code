(function (exports) {
    'use strict';

    /** 私有变量 用来存储状态与数据 */
    var states = {};

    /** 判断数据类型 */
    function type(elem) {
        if (elem == null) {
            return elem + '';
        }
        var str = toString.call(elem).replace(/[\[\]]/g, '').split('')[1].toLowerCase();
        return str;
    }

    /**
     * @Param name 属性名
     * @Description 通过属性名获取保存在states中的值
     */
    function get(name) {
        return states[name] || '';

    }

    function getStates() {
        return states;
    }

    /**
     * @param options {object} 键值对
     * @param target {object} 属性值为对象的属性，只在函数实现时递归中传入
     * @desc 通过传入键值对的方式修改state树，使用方式与小程序的data或者react中的setStates类似
     */
    function set(option, target) {
        var keys = Object.keys(option);
        var o = target || states;

        keys.forEach(function (item) {
            if (typeof o[item] === 'undefined') {
                o[item] = option[item];
            } else {
                type(o[item]) == 'object' ? set(option[item], o[item]) : o[item] = option[item]
            }
        })
    }

    /** 对外提供接口 */
    exports.set = set;
    exports.get = get;
    exports.getStates = getStates;

})(window);

debugger;

set({a: 20});
set({b: 100});
set({c: 10});
set({o: {m: 10, n: 20}});

set({o: {m: 1000}});

// 给对象o中增加一个c属性
set({o: {c: 100}});


console.log(getStates());