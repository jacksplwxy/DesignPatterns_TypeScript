//产品角色：包含多个组成部件的复杂对象。
class Product {
    private partA: String
    private partB: String
    private partC: String
    public setPartA(partA: String): void {
        this.partA = partA
    }
    public setPartB(partB: String): void {
        this.partB = partB
    }
    public setPartC(partC: String): void {
        this.partC = partC
    }
    public show(): void {
        //显示产品的特性
        console.log('产品的部件分别为：', this.partA, this.partB, this.partC)
    }
}
//抽象建造者：包含创建产品各个子部件的抽象方法。
abstract class Builder {
    //创建产品对象
    protected product: Product = new Product()
    public abstract buildPartA(): void
    public abstract buildPartB(): void
    public abstract buildPartC(): void
    //返回产品对象
    public getResult(): Product {
        return this.product
    }
}
//具体建造者：实现了抽象建造者接口。
class ConcreteBuilder extends Builder {
    constructor() {
        super()
    }
    public buildPartA(): void {
        this.product.setPartA("partA")
    }
    public buildPartB(): void {
        this.product.setPartB("partB")
    }
    public buildPartC(): void {
        this.product.setPartC("partC")
    }
}
//具体建造者1：实现了抽象建造者接口。
class ConcreteBuilder1 extends Builder {
    constructor() {
        super()
    }
    public buildPartA(): void {
        this.product.setPartA("partA1")
    }
    public buildPartB(): void {
        this.product.setPartB("partB1")
    }
    public buildPartC(): void {
        this.product.setPartC("partC1")
    }
}
//指挥者：调用建造者中的方法完成复杂对象的创建。
class Director {
    public static getProduct(builder: Builder) {
        builder.buildPartA()
        builder.buildPartB()
        builder.buildPartC()
        return builder.getResult()
    }
}

//测试
class Client {
    public static main(): void {
        const builder0: Builder = new ConcreteBuilder()
        const builder1: Builder = new ConcreteBuilder1()
        //测试:创建者builder0
        // const product: Product = Director.getProduct(builder0)
        //测试:创建者builder1,调整部件
        const product: Product = Director.getProduct(builder1)
        product.show()
    }
}
Client.main()