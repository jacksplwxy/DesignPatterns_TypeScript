/**
 * 苹果公司批量生产iphone，iphone的大部分数据比如型号，屏幕都是一样，少数部分数据比如内存有分16G,32G等。
 */

//未使用享元模式前：
class Iphone {
    constructor(model: string, screen: number, memory: number, SN: number) { }
}
let phones = [];
for (var i = 0; i < 10000; i++) {
    let memory = i % 2 == 0 ? 16 : 32;
    phones.push(new Iphone("iPhone6s", 5.0, memory, i));
}


//使用享元模式：
//定义 iPhone 对应的享元类：
class IphoneFlyweight {
    constructor(model: string, screen: number, memory: number) { }
}
//我们定义了iphone的享元类，其中包含型号，屏幕和内存三个数据。我们还需要一个享元工厂来维护这些数据：
export class FlyweightFactory {
    private phonesMap: { [s: string]: IphoneFlyweight } = <any>{};
    public get(model: string, screen: number, memory: number): IphoneFlyweight {
        const key = model + screen + memory;
        if (!this.phonesMap[key]) {
            this.phonesMap[key] = new IphoneFlyweight(model, screen, memory);
        }
        return this.phonesMap[key];
    }
}
//Iphone类：
export class Iphone {
    constructor(flyweight: IphoneFlyweight, sn: number) { }
}
//Iphone工厂类：
export class IphoneFactory {
    private static flyweightFactory: FlyweightFactory = new FlyweightFactory();
    public getIphone(model: string, screen: number, memory: number, sn: number) {
        const flyweight: IphoneFlyweight = IphoneFactory.flyweightFactory.get(model, screen, memory);
        return new Iphone(flyweight, sn);
    }
}
//然后我们依旧像之间那样生成多个iphone
export function show(): void {
    const iphoneFactory = new IphoneFactory();
    const phones = [];
    for (var i = 0; i < 10000; i++) {
        var memory = i % 2 == 0 ? 16 : 32;
        phones.push(iphoneFactory.getIphone("iPhoneX", 5.0, memory, i));
    }
    console.log("Already created 10000 iPhoneX");
}