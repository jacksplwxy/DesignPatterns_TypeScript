
//调用者
class Invoker {
    private command: Command;
    public constructor(command: Command) {
        this.command = command;
    }
    public setCommand(command: Command): void {
        this.command = command;
    }
    public run(): void {
        console.log("调用者执行命令command...");
        this.command.execute();
    }
}
//抽象命令
interface Command {
    execute(): void;
}
//具体命令
class ConcreteCommand implements Command {
    private receiver: Receiver;
    constructor() {
        this.receiver = new Receiver();
    }
    public execute(): void {
        this.receiver.action();
    }
}
//接收者
class Receiver {
    public action(): void {
        console.log("接收者的action()方法被调用...");
    }
}

class Client {
    public static main(): void {
        const cmd: Command = new ConcreteCommand();
        const ir: Invoker = new Invoker(cmd);
        console.log("客户访问调用者的run()方法...");
        ir.run();
    }
}
Client.main()


// 客户访问调用者的run()方法...
// 调用者执行命令command...
// 接收者的action()方法被调用...
