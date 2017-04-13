(function (exports) {
    'use strict';

    var nextTick = setTimeout;
    var RESOLVED = 0;
    var REJECTED = 1;
    var PENDING = 2;

    function Promise(executor) {
        this.state = PENDING;
        this.value = undefined;
        this.deferred = [];

        var promise = this;

        try {
            executor(function (x) {
                promise.resolve(x);
            }, function (r) {
                promise.reject(r);
            })
        } catch (e) {
            promise.reject(e)
        }
    }

    Promise.reject = function (r) {
        return new Promise(function (resolve, reject) {
            reject(r);
        })
    };

    Promise.resolve = function (x) {
        return new Promise(function (resolve, reject) {
            resolve(x);
        })
    };

    Promise.all = function (iterable) {
        return new Promise(function (resolve, reject) {
            var count = 0,
                result = [];

            if (iterable.length === 0) {
                resolve(result);
            }

            function resolver(i) {
                return function (x) {
                    result[i] = x;
                    count += 1;

                    if (count === iterable.length) {
                        resolve(result);
                    }
                }
            }

            iterable.length.forEach(function (item, index) {
                Promise.resolve(item).then(resolver(index), reject);
            })
        })
    };

    Promise.race = function race(iterable) {
        return new Promise(function (resolve, reject) {
            for (var i = 0; i < iterable.length; i += 1) {
                Promise.resolve(iterable[i]).then(resolve, reject);
            }
        });
    };

    Promise.prototype.resolve = function (x) {
        var promise = this;
        if (promise.state === PENDING) {
            if (x === promise) {
                throw new TypeError('Promise settled with itself.');
            }

            var called = false;

            try {
                var then = x && x['then'];
                if (x !== null && typeof x === Object && typeof then === "function") {
                    then.call(x, function (x) {
                        if (!called) {
                            promise.resolve(x);
                        }

                        called = true;
                    }, function (r) {
                        if (!called) {
                            promise.reject(r);
                        }

                        called = true;
                    });
                    return;
                }
            } catch (e) {
                if (!called) {
                    promise.reject(e);
                }
                return;
            }

            promise.state = RESOLVED;
            promise.value = x;
            promise.notify();
        }
    };


    Promise.prototype.reject = function (resson) {
        var promise = this;

        if (promise.state === PENDING) {
            if (resson === promise) {
                throw new TypeError('Promise settled with itself.');
            }

            promise.state = REJECTED;
            promise.value = resson;
            promise.notify();
        }
    };

    Promise.prototype.notify = function () {
        var promise = this;

        nextTick(function () {
            if (promise.state !== PENDING) {
                while (promise.deferred.length) {
                    var deferred = promise.deferred.shift(),
                        onResolved = deferred[0],
                        onRejected = deferred[1],
                        resolve = deferred[2],
                        reject = deferred[3];

                    try {
                        if (promise.state === RESOLVED) {
                            if (typeof onResolved === "function") {
                                resolve(onResolved.call(undefined, promise.value))
                            } else {
                                resolve(promise.value);
                            }
                        } else if (promise.state === REJECTED) {
                            if (typeof onRejected === "function") {
                                reject(onRejected.call(undefined, promise.value));
                            } else {
                                reject(promise.value);
                            }
                        }
                    } catch (e) {
                        reject(e)
                    }
                }
            }
        })
    };


    Promise.prototype.then = function (onResolved, onRejected) {
        var promise = this;

        return new Promise(function (resolve, reject) {
            promise.deferred.push([onResolved, onRejected, resolve, reject]);
            promise.notify();
        })
    };

    Promise.prototype.catch = function (onRejected) {
        return this.then(undefined, onRejected);
    };

    exports.Promise = Promise;

})(window);