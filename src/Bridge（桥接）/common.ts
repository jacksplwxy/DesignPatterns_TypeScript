
//实现化角色接口
interface Implementor {
    OperationImpl(): void
}
//具体实现化角色
class ConcreteImplementorA implements Implementor {
    public OperationImpl(): void {
        console.log("具体实现化(Concrete Implementor)角色被访问")
    }
}
//抽象化角色
abstract class Abstraction {
    constructor(protected imple: Implementor) { }
    public abstract Operation(): void
}
//扩展抽象化角色
class RefinedAbstraction extends Abstraction {
    public Operation(): void {
        console.log("扩展抽象化(Refined Abstraction)角色被访问")
        this.imple.OperationImpl()
    }
}

class Client {
    public static main(): void {
        const imple: Implementor = new ConcreteImplementorA()
        const abs: Abstraction = new RefinedAbstraction(imple)
        abs.Operation()
    }
}
Client.main()
