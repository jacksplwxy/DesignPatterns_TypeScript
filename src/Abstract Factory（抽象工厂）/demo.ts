//软件公司欲开发一套界面皮肤库，初始具有Spring和Summer两套皮肤。用户在使用时可以通过菜单来选择皮肤，不同的皮肤将提供视觉效果不同的按钮、文本框、组合框等界面元素。该皮肤库需要具备良好的灵活性和可扩展性，用户可以自由选择不同的皮肤，开发人员可以在不修改既有代码的基础上增加新的皮肤。

//按钮接口：抽象产品
interface Button {
    display(): void;
}
//Spring按钮类：具体产品
class SpringButton implements Button {
    public display(): void {
        console.log("显示浅绿色按钮。");
    }
}
//Summer按钮类：具体产品
class SummerButton implements Button {
    public display(): void {
        console.log("显示浅蓝色按钮。");
    }
}
//文本框接口：抽象产品
interface TextField {
    display(): void;
}
//Spring文本框类：具体产品
class SpringTextField implements TextField {
    public display(): void {
        console.log("显示绿色边框文本框。");
    }
}
//Summer文本框类：具体产品
class SummerTextField implements TextField {
    public display(): void {
        console.log("显示蓝色边框文本框。");
    }
}
//组合框接口：抽象产品
interface ComboBox {
    display(): void;
}
//Spring组合框类：具体产品
class SpringComboBox implements ComboBox {
    public display(): void {
        console.log("显示绿色边框组合框。");
    }
}
//Summer组合框类：具体产品
class SummerComboBox implements ComboBox {
    public display(): void {
        console.log("显示蓝色边框组合框。");
    }
}
//界面皮肤工厂接口：抽象工厂
interface SkinFactory {
    createButton(): Button;
    createTextField(): TextField;
    createComboBox(): ComboBox;
}
//Spring皮肤工厂：具体工厂
class SpringSkinFactory implements SkinFactory {
    public createButton(): Button {
        return new SpringButton();
    }
    public createTextField(): TextField {
        return new SpringTextField();
    }
    public createComboBox(): ComboBox {
        return new SpringComboBox();
    }
}
//Summer皮肤工厂：具体工厂
class SummerSkinFactory implements SkinFactory {
    public createButton(): Button {
        return new SummerButton();
    }
    public createTextField(): TextField {
        return new SummerTextField();
    }
    public createComboBox(): ComboBox {
        return new SummerComboBox();
    }
}
//客户端
class Client {
    public static main(skinFactory: SkinFactory): void {
        const button: Button = skinFactory.createButton()
        const textField: TextField = skinFactory.createButton()
        const comboBox: ComboBox = skinFactory.createComboBox()
        button.display()
        textField.display()
        comboBox.display()
    }
}
// Client.main(new SummerSkinFactory())
Client.main(new SpringSkinFactory())


 //小结：想使用哪套皮肤就传那个工厂即可。要拓展皮肤只需增加代码。调用者代码无需任何变动。