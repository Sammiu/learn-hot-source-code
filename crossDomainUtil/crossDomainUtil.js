'use strict';

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        /** AMD */
        define(factory)
    } else if (typeof exports === 'object' && typeof module === 'object') {
        /** Node, CommonJs */
        module.exports = factory();
    } else if (typeof exports === 'object')
        exports["cross_omain"] = factory();
    else
        root["cross_domain"] = factory();

})(this, function () {

    var eventObj = {};

    addHandler(window, 'message', receiveMessage);

    function receiveMessage(event) {

        var item = JSON.parse(event.data),
            exp = (item.eventType || '').split('.'),
            eventFn = eventObj;

        exp.forEach(function (k) {
            eventFn = eventFn[k];
        })

        if (typeof eventFn !== 'function') {
            console.warn('the events[' + exp + '] is not a function');
            return;
        }

        eventFn(item.params);
    }


    function registerMessageEvents(events) {
        set(events, eventObj)
    }

    /**
     * @param options {object} 键值对
     * @param target {object} 属性值为对象的属性，只在函数实现时递归中传入
     * @desc 通过传入键值对的方式修改事件树
     */
    function set(option, target) {
        var keys = Object.keys(option);
        var o = target || eventObj;

        keys.forEach(function (item) {
            if (typeof o[item] === 'undefined') {
                o[item] = option[item];
            } else {
                type(o[item]) == 'object' ? set(option[item], o[item]) : o[item] = option[item]
            }
        })
    }

    /**
     * 添加监听事件
     * @param {Object} element 事件的元素
     * @param {String} type 事件的类型
     * @param {Function} handler 事件触发的回调函数
     **/
    function addHandler(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    };

    /**
     * 移除监听事件
     * @param {Object} element 事件的元素
     * @param {String} type 事件的类型
     * @param {Function} handler 事件触发的回调函数
     **/
    function removeHandler(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    };

    /**
     * iframe 加载完毕
     * @param {Object} iframe 目标元素
     * @param {Function} handler 事件触发的回调函数
     **/
    function iframeReady(iframe, handler) {
        if (iframe.attachEvent) {
            iframe.attachEvent("onload", function () {
                handler && handler.call(iframe);
            });
        } else {
            iframe.onload = function () {
                handler && handler.call(iframe);
            };
        }
    }

    return {
        iframeReady: iframeReady,
        registerMessageEvents: registerMessageEvents
    }
});