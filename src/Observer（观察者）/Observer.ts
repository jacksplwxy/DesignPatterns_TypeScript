
class Observer extends Singleton {
    private constructor() {
        super()
    }
    //存储事件数据和方法
    private EventList: Array<Array<Function>> = []
    //触发事件
    public dispatchEvent(eventType: EventType, content?: Object) {
        // let event = Array.prototype.shift.call(arguments) // 取出消息类型,arguments[0]
        let fns = this.EventList[eventType] // 取出该消息对应的回调函数集合
        if (!fns || fns.length === 0) { // 如果没有订阅该消息，则返回
            return false
        }
        for (let i = 0, fn; fn = fns[i++];) {
            fn.call(Observer, content) // arguments 是发布消息时附送的参数,arguments[1]
        }
    }
    //添加事件：EventType不存在时需在EventType枚举中定义好
    public addEventListener(event: EventType, fn: Function) {
        if (!this.EventList[event]) { // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
            this.EventList[event] = []
        }
        this.EventList[event].push(fn) // 订阅的消息添加进消息缓存列表
    }
    //移除事件
    public removeEventListener(event: EventType, fn: Function) {
        let fns = this.EventList[event]
        if (!fns) { // 如果event 对应的消息没有被人订阅，则直接返回
            return false;
        }
        if (!fn) { // 如果没有传入具体的回调函数，表示需要取消event 对应消息的所有订阅
            fns && (fns.length = 0);
        } else {
            for (let l = fns.length - 1; l >= 0; l--) { // 反向遍历订阅的回调函数列表
                let _fn = fns[l];
                if (_fn === fn) {
                    fns.splice(l, 1); // 删除订阅者的回调函数
                }
            }
        }
    }
    //清空所有事件
    public removeAllEventListener(): void {
        this.EventList = []
    }
}