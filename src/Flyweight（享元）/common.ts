
//非享元角色
class UnsharedConcreteFlyweight {
    private info: string;
    constructor(info: string) {
        this.info = info;
    }
    public getInfo(): string {
        return this.info;
    }
    public setInfo(info: string): void {
        this.info = info;
    }
}
//抽象享元角色
interface Flyweight {
    operation(state: UnsharedConcreteFlyweight): void;
}
//具体享元角色
class ConcreteFlyweight implements Flyweight {
    private key: string;
    constructor(key: string) {
        this.key = key;
        console.log("具体享元" + this.key + "被创建！");
    }
    public operation(outState: UnsharedConcreteFlyweight): void {
        console.log("具体享元" + this.key + "被调用，");
        console.log("非享元信息是:" + outState.getInfo());
    }
}
//享元工厂角色
interface FlyweightObjs {
    [propName: string]: Flyweight;
}
class FlyweightFactory {
    private flyweightObjs: FlyweightObjs = {}
    constructor() { }
    public getFlyweight(key: string): Flyweight {
        let flyweight: Flyweight = this.flyweightObjs[key]
        if (flyweight != null) {
            console.log("具体享元" + key + "已经存在，被成功获取！");
        } else {
            flyweight = new ConcreteFlyweight(key);
            this.flyweightObjs[key] = flyweight;
        }
        return flyweight;
    }
}

(function () {
    let factory: FlyweightFactory = new FlyweightFactory();
    let f01: Flyweight = factory.getFlyweight("a");
    let f02: Flyweight = factory.getFlyweight("a");
    let f03: Flyweight = factory.getFlyweight("a");
    let f11: Flyweight = factory.getFlyweight("b");
    let f12: Flyweight = factory.getFlyweight("b");
    f01.operation(new UnsharedConcreteFlyweight("第1次调用a。"));
    f02.operation(new UnsharedConcreteFlyweight("第2次调用a。"));
    f03.operation(new UnsharedConcreteFlyweight("第3次调用a。"));
    f11.operation(new UnsharedConcreteFlyweight("第1次调用b。"));
    f12.operation(new UnsharedConcreteFlyweight("第2次调用b。"));
}())
/**
具体享元a被创建！
具体享元a已经存在，被成功获取！
具体享元a已经存在，被成功获取！
具体享元b被创建！
具体享元b已经存在，被成功获取！
具体享元a被调用，非享元信息是:第1次调用a。
具体享元a被调用，非享元信息是:第2次调用a。
具体享元a被调用，非享元信息是:第3次调用a。
具体享元b被调用，非享元信息是:第1次调用b。
具体享元b被调用，非享元信息是:第2次调用b。
 */