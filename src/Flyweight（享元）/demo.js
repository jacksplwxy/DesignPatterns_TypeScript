/**
 * 苹果公司批量生产iphone，iphone的大部分数据比如型号，屏幕都是一样，少数部分数据比如内存有分16G,32G等。
 */

//未使用享元模式前：
function Iphone(model, screen, memory, SN) {
    this.model = model;
    this.screen = screen;
    this.memory = memory;
    this.SN = SN;
}
var phones = [];
for (var i = 0; i < 1000000; i++) {
    var memory = i % 2 == 0 ? 16 : 32;
    phones.push(new Iphone("iphone6s", 5.0, memory, i));
}

//使用享元模式：
//大部分的iphone的型号，屏幕，内存都是一样的，那这部分数据就可以公用，就是享元模式中的内在数据，定义享元类如下：
function IphoneFlyweight(model, screen, memory) {
    this.model = model;
    this.screen = screen;
    this.memory = memory;
}
//我们定义了iphone的享元类，其中包含型号，屏幕和内存三个数据。我们还需要一个享元工厂来维护这些数据：
var flyweightFactory = (function () {
    var iphones = {};
    return {
        get: function (model, screen, memory) {
            var key = model + screen + memory;
            if (!iphones[key]) {
                iphones[key] = new IphoneFlyweight(model, screen, memory);
            }
            return iphones[key];
        }
    };
})();
//接着我们创建一个客户端类，这个客户端类就是修改自iphone类：
function Iphone(model, screen, memory, SN) {
    this.flyweight = flyweightFactory.get(model, screen, memory);   //所有的‘model + screen + memory’共享
    this.SN = SN;
}
//然后我们依旧像之间那样生成多个iphone
var phones = [];
for (var i = 0; i < 1000000; i++) {
    var memory = i % 2 == 0 ? 16 : 32;
    phones.push(new Iphone("iphone6s", 5.0, memory, i));
}
console.log(phones);