//缓存代理的实现
var mult = function () {
    console.log('开始计算乘机')
    var a = 1
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments[i]
    }
    return a
}
var proxyMult = (function () {
    var cache = {}
    return function () {
        var args = Array.prototype.join.call(arguments, ',')
        if (args in cache) {
            return cache[args] //直接返回
        }
        return cache[args] = mult.apply(this, arguments)
    }
})()

proxyMult(1, 2, 3, 4)  //输出：24
proxyMult(1, 2, 3, 4)  //输出：24

//通过缓存代理模式，可将决定权交给代理函数对象proxyMult，而mult函数可以专注于自身的职责。



/*---------------------------------------------ES6 Proxy实现代理-----------------------------------------------------------------------------*/
//对于那些调用频繁、运行缓慢或占用执行环境资源较多的属性或接口，开发者会希望记录它们的使用情况或性能表现，这个时候就可以使用 Proxy 充当中间件的角色，轻而易举实现日志功能：
let api = {
    _apiKey: '123abc456def',
    getUsers: function () { /* ... */ },
    getUser: function (userId) { /* ... */ },
    setUser: function (userId, config) { /* ... */ }
}

function logMethodAsync(timestamp, method) {
    setTimeout(function () {
        console.log(`${timestamp} - Logging ${method} request asynchronously.`)
    }, 0)
}

api = new Proxy(api, {
    get: function (target, key, proxy) {
        var value = target[key]
        return function (...arguments) {
            logMethodAsync(new Date(), key)
            return Reflect.apply(value, target, arguments)
        }
    }
})

api.getUsers()