

interface Car {
    drive(): void
}
abstract class Factory {
    abstract createProduct(): Car
}
//创建奔驰车
class Benz implements Car {
    drive(): void {
        console.log("Benz车开在公路上兜风")
    }
}
class BenzFactory extends Factory {
    createProduct(): Car {
        return new Benz()
    }
}
const benzFactory: Factory = new BenzFactory()
const benz: Car = benzFactory.createProduct()
//创建宝马车
class BMW implements Car {
    drive(): void {
        console.log("BMW车开在公路上兜风")
    }
}
class BMWFactory extends Factory {
    createProduct(): Car {
        return new BMW()
    }
}
const bmwFactory: Factory = new BMWFactory()
const bmw: Car = bmwFactory.createProduct()
//创建奥迪车
class Audi implements Car {
    drive(): void {
        console.log("Audi车开在公路上兜风")
    }
}
class AudiFactory extends Factory {
    createProduct(): Car {
        return new Audi()
    }
}
const audiFactory: Factory = new AudiFactory()
const audi: Car = audiFactory.createProduct()


class Client {
    public static main(car: Car): void {
        car.drive()
    }
}
// Client.main(benz)//最开始您想开奔驰车
// Client.main(bmw)//接着，您想开宝马
Client.main(audi)//最后，您想开奥迪


//小结：可以看到，无论您想开什么车，只需要拓展即可，客户端内部的代码完全无需修改，很好的满足开闭原则