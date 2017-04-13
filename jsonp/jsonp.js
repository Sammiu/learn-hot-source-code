(function (exports) {

    'use strict';

    function addScriptTag(script, src) {
        script.setAttribute('type', 'text/javascript');
        script.src = src;
        document.body.appendChild(script);
    }

    function geUrl(url, callbackName) {
        if (url.indexOf('?') > -1) {
            url += '&callback=' + callbackName;
        } else {
            url += '?callback=' + callbackName;
        }

        return url;
    }

    function jsonp(url, callback, thisArg) {
        var script,
            body,
            handler,
            callbackName = '_jsonp' + Math.random().toString(36).substr(2);

        handler = function (ref) {
            var type = ref.type;
            var status = 0;

            if (type === 'load' && body !== null) {
                status = 200;
            } else if (type === 'error') {
                status = 500;
            }

            if (Object.prototype.toString.call(callback) === '[object Function]') {
                if (!thisArg) {
                    thisArg = this;
                }
                callback.call(thisArg, {body: body, status: status});
            }
            window[callbackName] = null;
            document.body.removeChild(script);
        };

        window[callbackName] = function (result) {
            body = result;
        };

        script = document.createElement('script');
        script.onload = handler;
        script.onerror = handler;

        addScriptTag(script, geUrl(url, callbackName));
    }

    exports.jsonp = jsonp;

    document.getElementById('btnLoad').onclick = function () {
        // do something
        var url = '';

        jsonp(url, function (res) {
            console.log(res);
        });
    };

})(window);
