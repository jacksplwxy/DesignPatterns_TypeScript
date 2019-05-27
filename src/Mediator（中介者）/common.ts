

/**
 * 中介者：用于模块之间通信。
 */
//抽象中介者
abstract class Mediator {
    //存储
    public colleagues: Object = {}
    //注册
    public register(clName: string, colleague: Colleague): void {
        if (this.colleagues[clName]) {
            console.error(`${clName}名称已存在`)
        } else {
            this.colleagues[clName] = colleague
            colleague.setMedium(this)
        }
    }
    //转发
    public relay(cl: Colleague, message?: any): void {
        Object.keys(this.colleagues).forEach((clName: string) => {
            if (this.colleagues[clName] !== cl) {
                this.colleagues[clName].receive(message)
            }
        })
    }
}
//抽象同事类
abstract class Colleague {
    protected mediator: Mediator;
    public setMedium(mediator: Mediator): void {
        this.mediator = mediator;
    }
    public receive(message?: any): void {
        console.log(this.constructor.name + "收到请求：", message);
    }
    public send(message?: any): void {
        console.log(this.constructor.name + "发出请求：", message);
        this.mediator.relay(this, message); //请中介者转发
    }
}


//具体中介者
class ConcreteMediator extends Mediator {
    constructor() {
        super()
    }
}
//具体同事类1
class ConcreteColleague1 extends Colleague {
    constructor() {
        super()
    }
    public receive(message?: any): void {
        if (message === '大家嗨起来') {
            console.log(this.constructor.name + '：drink、drink、drink')
        } else if (message === '大家静下来') {
            console.log(this.constructor.name + '：no、no、no')
        }
    }
}
//具体同事类2
class ConcreteColleague2 extends Colleague {
    constructor() {
        super()
    }
    public receive(message?: any): void {
        if (message === '大家嗨起来') {
            console.log(this.constructor.name + '：dance、dance、dance')
        } else if (message === '大家静下来') {
            console.log(this.constructor.name + '：no、no、no')
        }
    }
}
//具体同事类3
class ConcreteColleague3 extends Colleague {
    constructor() {
        super()
    }
    public receive(message?: any): void {
        if (message === '大家嗨起来') {
            console.log(this.constructor.name + '：drink、drink、drink')
        } else if (message === '大家静下来') {
            console.log(this.constructor.name + '：no、no、no')
        }
    }
}

class Client {
    public static main(): void {
        let md: Mediator = new ConcreteMediator();
        let c1: Colleague = new ConcreteColleague1();
        let c2: Colleague = new ConcreteColleague2();
        let c3: Colleague = new ConcreteColleague3();
        md.register('c1', c1);
        md.register('c2', c2);
        md.register('c3', c3);
        c1.send('大家嗨起来');
        c2.send('大家静下来');
    }
}
Client.main()

// ConcreteColleague1发出请求: 大家嗨起来
// ConcreteColleague2：dance、dance、dance
// ConcreteColleague3：drink、drink、drink
// ConcreteColleague2发出请求: 大家静下来
// ConcreteColleague1：no、no、no
// ConcreteColleague3：no、no、no
