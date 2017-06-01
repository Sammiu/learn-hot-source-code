(function (exports) {
    'use strict';

    function Observer(data) {
        this.data = data;
        this.walk(data);
    }


    Observer.prototype = {
        walk: function (data) {
            var me = this;
            Object.keys(data).forEach(function (key) {
                me.convert(key, data[key]);
            });
        },
        convert: function (key, val) {
            this.defineReactive(this.data, key, val);
        },

        defineReactive: function (data, key, val) {
            var dep = new Dep();
            var childObj = observe(val);

            Object.defineProperty(data, key, {
                enumerable: true, // 可枚举
                configurable: false, // 不能再define
                get: function () {
                    Dep.target && dep.depend();
                    return val;
                },
                set: function (newVal) {
                    if (newVal === val) {
                        return;
                    }
                    val = newVal;
                    // 新的值是object的话，进行监听
                    childObj = observe(newVal);
                    // 通知订阅者
                    dep.notify();
                }
            });
        }
    };

    function observe(value, vm) {
        if (!value || typeof value !== 'object') {
            return;
        }

        return new Observer(value);
    };

    exports.observe = observe;
})(window);