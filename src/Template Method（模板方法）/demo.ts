abstract class Beverage {
    boilWater() {
        console.log("把水煮沸");
    }

    abstract brew(): void;
    abstract pourInCup(): void;
    abstract addCondiments(): void;

    makeBeverage() {
        this.boilWater();
        this.brew();
        this.pourInCup();
        this.addCondiments();
    }
}

class Coffee extends Beverage {
    brew(): void {
        console.log("用沸水冲泡咖啡");
    }
    pourInCup(): void {
        console.log("把咖啡倒进杯子");
    }
    addCondiments(): void {
        console.log("加糖和牛奶");
    }
}

class Tea extends Beverage {
    brew(): void {
        console.log("用沸水浸泡茶叶");
    }
    pourInCup(): void {
        console.log("把茶倒进杯子");
    }
    addCondiments(): void {
        console.log("加柠檬");
    }
}

class Client {
    public static main(): void {
        const coffee: Coffee = new Coffee();
        const tea: Tea = new Tea();
        coffee.makeBeverage();
        tea.makeBeverage();
    }
}
Client.main()

// 把水煮沸
// 用沸水冲泡咖啡
// 把咖啡倒进杯子
// 加糖和牛奶
// 把水煮沸
// 用沸水浸泡茶叶
// 把茶倒进杯子
// 加柠檬
