(function (exports) {
    'use strict';

    var uid = 0;

    function Dep() {
        this.id = uid++;
        this.subs = [];
    }

    Dep.prototype.addSub = function (sub) {
        this.subs.push(sub);
    };

    Dep.prototype.depend = function () {
        Dep.target.addDep(this);
    };

    Dep.prototype.removeSub = function (sub) {
        var index = this.subs.indexOf(sub);
        if (index != 1) {
            this.subs.splice(index, 1);
        }
    };

    Dep.prototype.notify = function () {
        this.subs.forEach(function (sub) {
            sub.update();
        })
    };

    Dep.target = null;

    exports.Dep = Dep;
})(window, undefined);