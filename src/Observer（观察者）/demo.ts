// 场景：顾客点菜后，服务员记下顾客的信息，菜做好后广播通知顾客领取

// 观察者基类
class Observer {
    take(msg: string): void { }
}

// 目标基类
class Subject {
    set: Set<Observer> = new Set();
    // 注册回调
    add(observer: Observer): void {
        this.set.add(observer);
    }
    // 注销回调
    remove(observer: Observer): void {
        this.set.delete(observer);
    }
    // 触发所有已注册的回调
    notify(msg: string): void {
        this.set.forEach(observer => {
            observer.take(msg);
        });
    }
}

// 具体目标，服务员类
class Waiter extends Subject {
    // 菜做完后通知所有注册了的顾客
    ready(): void {
        this.notify('ready');
    }
}

// 具体观察者，顾客类
class Clienter extends Observer {
    name: string;
    // 初始化时将自身注册到目标，以便接收通知
    constructor(name: string, waiter: Waiter) {
        super();
        this.name = name;
        waiter.add(this);
    }
    take(msg: string) {
        console.log(`顾客 ${this.name} 收到了消息显示状态是<${msg}>， 到吧台领取了菜`);
    }
}


class Client {
    public static main(): void {
        const waiter = new Waiter();
        // 顾客点菜后，等待服务员通知
        const bob = new Clienter('Bob', waiter);
        const mick = new Clienter('Mick', waiter);
        // 菜准备好后，服务员广播通知顾客可以到吧台领取了
        waiter.ready();
    }
}
Client.main()

// 顾客 Bob 收到了消息显示状态是<ready>， 到吧台领取了菜
// 顾客 Mick 收到了消息显示状态是<ready>， 到吧台领取了菜