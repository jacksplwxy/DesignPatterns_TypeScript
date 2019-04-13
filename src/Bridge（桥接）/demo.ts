
// 模拟女士皮包的选购：
// 分析：女士皮包有很多种，可以按用途分、按皮质分、按品牌分、按颜色分、按大小分等，存在多个维度的变化，所以采用桥接模式来实现女士皮包的选购比较合适。
// 本实例按用途分可选钱包（Wallet）和挎包（HandBag），按颜色分可选黄色（Yellow）和红色（Red）。可以按两个维度定义为颜色类和包类。
//颜色类（Color）是一个维度，定义为实现化角色，它有两个具体实现化角色：黄色和红色，通过 getColor() 方法可以选择颜色；
//包类（Bag）是另一个维度，定义为抽象化角色，它有两个扩展抽象化角色：挎包和钱包，它包含了颜色类对象，通过 getName() 方法可以选择相关颜色的挎包和钱包。

//实现化角色：颜色
interface Color {
    getColor(): String
}
//具体实现化角色：黄色
class Yellow implements Color {
    public getColor(): String {
        return "yellow"
    }
}
//具体实现化角色：红色
class Red implements Color {
    public getColor(): String {
        return "red"
    }
}
//抽象化角色：包
abstract class Bag {
    protected color: Color
    public setColor(color: Color): void {
        this.color = color
    }
    public abstract getName(): String
}
//扩展抽象化角色：挎包
class HandBag extends Bag {
    public getName(): String {
        return this.color.getColor() + "HandBag"
    }
}
//扩展抽象化角色：钱包
class Wallet extends Bag {
    public getName(): String {
        return this.color.getColor() + "Wallet"
    }
}

class Client {
    public static main(): void {
        const yellow:Color=new Yellow()
        const red:Color=new Red()
        const handBag:Bag=new HandBag()
        const wallet:Bag=new Wallet()
    
        handBag.setColor(yellow)
        console.log(handBag.getName())

        handBag.setColor(red)
        console.log(handBag.getName())

        wallet.setColor(yellow)
        console.log(wallet.getName())

        wallet.setColor(red)
        console.log(wallet.getName())
    }
}
Client.main()
