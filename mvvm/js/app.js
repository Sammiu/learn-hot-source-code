(function (exports) {
    'usr strict';

    var vm = new exports.MVVM({
        el: '#mvvm-app',
        data: {
            word: 'Hello World!',
            type: null
        },
        methods: {
            sayHi: function () {
                this.word = 'Hi, everybody!';
            }
        }
    });

    console.log(vm);
})(window, undefined);