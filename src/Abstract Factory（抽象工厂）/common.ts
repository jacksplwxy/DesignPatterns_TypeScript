/**
 * 使用抽象工厂模式一般要满足以下条件：①系统中有多个产品族，每个具体工厂创建同一族但属于不同等级结构的产品。②系统一次只可能消费其中某一族产品，即同族的产品一起使用。
 * 产品族和等级产品：例如 海尔空调和海尔电视属于一个产品族，海尔空调和格力空调属于一个等级产品
 */

//产品等级A接口，例如空调
interface AbstractProductA {
    methodA(): string
}
//产品等级B接口，例如电视
interface AbstractProductB {
    methodB(): number
}
//工厂接口：包含实现生产2种产品的方法。缺点：如要拓展产品种类，将导致工厂实例全部修改的问题
interface AbstractFactory {
    createProductA(param?: any): AbstractProductA
    createProductB(): AbstractProductB
}
//等级A产品，例如海尔空调
class ProductA1 implements AbstractProductA {
    methodA = () => {
        return "This is methodA of ProductA1"
    }
}
//等级B产品，例如海尔电视
class ProductB1 implements AbstractProductB {
    methodB = () => {
        return 1
    }
}
//等级A产品，例如格力空调
class ProductA2 implements AbstractProductA {
    methodA = () => {
        return "This is methodA of ProductA2"
    }
}
//等级B产品，例如格力电视
class ProductB2 implements AbstractProductB {
    methodB = () => {
        return 2
    }
}
//产品族1：例如海尔
class ConcreteFactory1 implements AbstractFactory {
    createProductA(param?: any): AbstractProductA {
        return new ProductA1()
    }
    createProductB(param?: any): AbstractProductB {
        return new ProductB1()
    }
}
//产品族2：例如格力
class ConcreteFactory2 implements AbstractFactory {
    createProductA(param?: any): AbstractProductA {
        return new ProductA2()
    }
    createProductB(param?: any): AbstractProductB {
        return new ProductB2()
    }
}


class Client {
    public static main(factory: AbstractFactory): void {
        const productA: AbstractProductA = factory.createProductA()
        const productB: AbstractProductB = factory.createProductB()
        console.log(productA.methodA())
        console.log(productB.methodB())
    }
}
Client.main(new ConcreteFactory1())
