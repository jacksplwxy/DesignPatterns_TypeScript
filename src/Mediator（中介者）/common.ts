

/**
 * 中介者：用于模块之间通信。
 */

//抽象中介者
abstract class Mediator {
    public abstract register(colleague: Colleague): void;
    public abstract relay(cl: Colleague): void; //转发
}
//具体中介者
class ConcreteMediator extends Mediator {
    private colleagues: Array<Colleague> = []
    public register(colleague: Colleague): void {
        if (this.colleagues.indexOf(colleague) === -1) {
            this.colleagues.push(colleague)
            colleague.setMedium(this)
        }
    }
    public relay(cl: Colleague): void {
        this.colleagues.forEach((colleague: Colleague, index) => {
            if (cl !== colleague) {
                colleague.receive()
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
    public abstract receive(): void;
    public abstract send(): void;
}
//具体同事类
class ConcreteColleague1 extends Colleague {
    constructor() {
        super()
    }
    public receive(): void {
        console.log("具体同事类1收到请求。");
    }
    public send(): void {
        console.log("具体同事类1发出请求。");
        this.mediator.relay(this); //请中介者转发
    }
}
//具体同事类
class ConcreteColleague2 extends Colleague {
    constructor() {
        super()
    }
    public receive(): void {
        console.log("具体同事类2收到请求。");
    }
    public send(): void {
        console.log("具体同事类2发出请求。");
        this.mediator.relay(this); //请中介者转发
    }
}
//具体同事类
class ConcreteColleague3 extends Colleague {
    constructor() {
        super()
    }
    public receive(): void {
        console.log("具体同事类3收到请求。");
    }
    public send(): void {
        console.log("具体同事类3发出请求。");
        this.mediator.relay(this); //请中介者转发
    }
}

class ConcreteMediatorClient {
    public static main(): void {
        let md: Mediator = new ConcreteMediator();
        let c1: Colleague = new ConcreteColleague1();
        let c2: Colleague = new ConcreteColleague2();
        let c3: Colleague = new ConcreteColleague3();
        md.register(c1);
        md.register(c2);
        md.register(c3);
        c1.send();
        c2.send();
    }
}
