//创建2台车：一台是宝马车架、宝马轮子、宝马引擎的汽车，另一台是宝马车架、宝马轮子、奔驰引擎的汽车

//汽车类
class Car {
    private carBody: String
    private wheel: String
    private engine: String
    public setCarBody(carBody: String): void {
        this.carBody = carBody
    }
    public setWheel(wheel: String): void {
        this.wheel = wheel
    }
    public setEngine(engine: String): void {
        this.engine = engine
    }
    public show(): void {
        //显示产品的特性
        console.log('汽车的组成分别为：', this.carBody, this.wheel, this.engine)
    }
}

abstract class Builder {
    protected car: Car = new Car()
    public abstract buildCarBody(): void
    public abstract buildWheel(): void
    public abstract buildEngine(): void
    public getResult(): Car {
        return this.car
    }
}
//汽车1的建造者
class ConcreteBuilder extends Builder {
    constructor() {
        super()
    }
    public buildCarBody(): void {
        this.car.setCarBody("BMWCarBody")
    }
    public buildWheel(): void {
        this.car.setWheel("BMWWheel")
    }
    public buildEngine(): void {
        this.car.setEngine("BMWEngine")
    }
}
//汽车2的建造者
class ConcreteBuilder1 extends Builder {
    constructor() {
        super()
    }
    public buildCarBody(): void {
        this.car.setCarBody("BMWCarBody")
    }
    public buildWheel(): void {
        this.car.setWheel("BMWWheel")
    }
    public buildEngine(): void {
        this.car.setEngine("BenzEngine")
    }
}
class Director {
    public static getProduct(builder: Builder) {
        builder.buildCarBody()
        builder.buildWheel()
        builder.buildEngine()
        return builder.getResult()
    }
}

//测试
class Client {
    public static main(): void {
        //第一台汽车:创建者builder
        const builder: Builder = new ConcreteBuilder()
        const car: Car = Director.getProduct(builder)
        car.show()
        //第二台汽车:创建者builder1,调整部件
        const builder1: Builder = new ConcreteBuilder1()
        const car1: Car = Director.getProduct(builder1)
        car1.show()
    }
}
Client.main()

//小结：想创建一个宝马车架、奥迪车轮、奔驰引擎的汽车，也只需要新建一个建造者类，符合开闭原则