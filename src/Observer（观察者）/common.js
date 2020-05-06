/***************ES6 common*****************/
class Event {
    constructor() { }
    // 事件容器
    handlers = {}

    // 事件添加方法，参数有事件名和事件方法
    on(type, handler) {
        console.log('绑定事件', type, handler)
        // 首先判断handlers内有没有type事件容器，没有则创建一个新数组容器
        if (!(type in this.handlers)) {
            this.handlers[type] = []
        }
        // 将事件存入
        this.handlers[type].push(handler)
    }

    // 触发事件两个参数（事件名，参数）
    emit(type, ...params) {
        console.log('触发事件', type, ...params)
        // 若没有注册该事件则抛出错误
        if (!(type in this.handlers)) {
            return new Error('未注册该事件')
        }
        // 遍历触发
        this.handlers[type].forEach(handler => {
            handler(...params)
        })
    }

    // 事件移除参数（事件名，删除的事件，若无第二个参数则删除该事件的订阅和发布）
    off(type, handler) {
        console.log('触发事件移除', type, handler)
        // 无效事件抛出
        if (!(type in this.handlers)) {
            return new Error('无效事件')
        }
        //清除所有事件
        if (!type) {
            this.handlers = {}
        }
        // 移除指定类型下的所有事件
        else if (!handler) {
            delete this.handlers[type]
        } else {
            if (typeof handler !== "function") {
                return new Error('无效handler')
            }
            const idx = this.handlers[type].findIndex(ele => ele === handler)
            // 抛出异常事件
            if (idx === undefined) {
                return new Error('无该绑定事件')
            }
            // 移除事件
            this.handlers[type].splice(idx, 1)
            if (this.handlers[type].length === 0) {
                delete this.handlers[type]
            }
        }
    }
}



/********************ES5 demo***********************/
var salesOffices = {}; // 定义售楼处
salesOffices.clientList = []; // 缓存列表，存放订阅者的回调函数

salesOffices.listen = function( key, fn ){
    if ( !this.clientList[ key ] ){ // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
        this.clientList[ key ] = [];
    }
    this.clientList[ key ].push( fn ); // 订阅的消息添加进消息缓存列表
};

salesOffices.trigger = function(){ // 发布消息
    var key = Array.prototype.shift.call( arguments ), // 取出消息类型
    fns = this.clientList[ key ]; // 取出该消息对应的回调函数集合
    if ( !fns || fns.length === 0 ){ // 如果没有订阅该消息，则返回
        return false;
    }
    for( var i = 0, fn; fn = fns[ i++ ]; ){
        fn.apply( this, arguments ); // (2) // arguments 是发布消息时附送的参数
    }
};

salesOffices.listen( 'squareMeter88', function( price ){ // 小明订阅88 平方米房子的消息
    console.log( '价格= ' + price ); // 输出： 2000000
});

salesOffices.listen( 'squareMeter110', function( price ){ // 小红订阅110 平方米房子的消息
    console.log( '价格= ' + price ); // 输出： 3000000
});

salesOffices.trigger( 'squareMeter88', 2000000 ); // 发布88 平方米房子的价格
salesOffices.trigger( 'squareMeter110', 3000000 ); // 发布110 平方米房子的价格
