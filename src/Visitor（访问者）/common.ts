//抽象元素（Element）角色：声明一个包含接受操作 accept() 的接口，被接受的访问者对象作为 accept() 方法的参数。
interface Elemente {
    accept(visitor: Visitor): void
}

//具体元素（ConcreteElement）角色：实现抽象元素角色提供的 accept() 操作，其方法体通常都是 visitor.visit(this) ，另外具体元素中可能还包含本身业务逻辑的相关操作。
class ConcreteElementA implements Elemente {
    constructor(private name: string, private num: number) {

    }
    getName(): string {
        return this.name;
    }
    getMoney(): string {
        return this.num + '万元';
    }
    accept(visitor: Visitor) {
        visitor.visitA(this)
    }
}

//具体元素（ConcreteElement）角色：实现抽象元素角色提供的 accept() 操作，其方法体通常都是 visitor.visit(this) ，另外具体元素中可能还包含本身业务逻辑的相关操作。
class ConcreteElementB implements Elemente {
    constructor(private name: string, private num: number) {

    }
    getName(): string {
        return this.name;
    }
    getMoney(): string {
        return this.num + '万元';
    }
    accept(visitor: Visitor) {
        visitor.visitB(this)
    }
}

//抽象访问者（Visitor）角色：定义一个访问具体元素的接口，为每个具体元素类对应一个访问操作 visit() ，该操作中的参数类型标识了被访问的具体元素。
interface Visitor {
    visitA(element: ConcreteElementA): void
    visitB(element: ConcreteElementB): void
}

// 具体访问者（ConcreteVisitor）角色：实现抽象访问者角色中声明的各个访问操作，确定访问者访问一个元素时该做什么。
class ConcreteVisitorA implements Visitor {
    visitA(element: ConcreteElementA) {
        console.log(`${element.getName()}使用${element.getMoney()}去买房`)
    }
    visitB(element: ConcreteElementB) {
        console.log(`${element.getName()}使用${element.getMoney()}去买房`)
    }
}

// 具体访问者（ConcreteVisitor）角色：实现抽象访问者角色中声明的各个访问操作，确定访问者访问一个元素时该做什么。
class ConcreteVisitorB implements Visitor {
    visitA(element: ConcreteElementA) {
        console.log(`${element.getName()}使用${element.getMoney()}去买车`)
    }
    visitB(element: ConcreteElementB) {
        console.log(`${element.getName()}使用${element.getMoney()}去买车`)
    }
}

class ObjectStructure {
    list: Array<Elemente> = []
    add(element: Elemente) {
        this.list.push(element)
    }
    accept(visitor: Visitor) {
        this.list.forEach((element: Elemente) => {
            element.accept(visitor)
        })
    }
}


class Client {
    public static main(): void {
        const list: ObjectStructure = new ObjectStructure()
        const shangren1 = new ConcreteElementA('商人1', 30)
        const shangren2 = new ConcreteElementA('商人2', 50)
        const shangren3 = new ConcreteElementA('商人3', 60)
        const diaosi1 = new ConcreteElementB('屌丝1', 60)
        const diaosi2 = new ConcreteElementB('屌丝1', 80)
        list.add(shangren1)
        list.add(shangren2)
        list.add(shangren3)
        list.add(diaosi1)
        list.add(diaosi2)
        const visitorA = new ConcreteVisitorA()
        list.accept(visitorA)
        const visitorB = new ConcreteVisitorB()
        list.accept(visitorB)
    }
}
Client.main()

// 商人1使用30万元去买房
// 商人2使用50万元去买房
// 商人3使用60万元去买房
// 屌丝1使用60万元去买房
// 屌丝1使用80万元去买房
// 商人1使用30万元去买车
// 商人2使用50万元去买车
// 商人3使用60万元去买车
// 屌丝1使用60万元去买车
// 屌丝1使用80万元去买车