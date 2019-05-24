abstract class SmartDevice {
    //相关设备打开之后 使其进入准备状态
    public abstract readyState(instruction: String): void
    //操作该设备
    public abstract operateDevice(instruction: String, mediator: SmartMediator): void
}


class CurtainDevice extends SmartDevice {
    public operateDevice(instruction: String, mediator: SmartMediator): void {
        console.log("窗帘已" + instruction)//通过传入指令，打开或关闭窗帘
        mediator.curtain(instruction)//窗帘通过中介者唤醒音乐设备和洗浴设备
    }
    public readyState(instruction: String): void {
        //如果其他设备开启则调用此方法，唤醒窗帘
        console.log("窗帘设备准备" + instruction)
    }

}
class MusicDevice extends SmartDevice {
    public operateDevice(instruction: String, mediator: SmartMediator): void {
        console.log("音乐设备已" + instruction)
        mediator.music(instruction)
    }
    public readyState(instruction: String): void {
        console.log("音乐设备准备" + instruction)
    }

}
class BathDevice extends SmartDevice {
    public operateDevice(instruction: String, mediator: SmartMediator): void {
        console.log("洗浴设备" + instruction)
        mediator.bath(instruction)
    }
    public readyState(instruction: String): void {
        console.log("洗浴设备正在准备" + instruction)
    }

}
abstract class SmartMediator {
    //保留所有设备的引用是为了当接收指令时可以唤醒其他设备的操作
    protected bd: SmartDevice
    protected md: SmartDevice
    protected cd: SmartDevice
    public constructor(bd: SmartDevice, cd: SmartDevice, md: SmartDevice) {
        this.bd = bd
        this.cd = cd
        this.md = md
    }
    public abstract music(instruction: String): void
    public abstract curtain(instruction: String): void
    public abstract bath(instruction: String): void
}
class ConcreteMediator extends SmartMediator {
    public constructor(bd: SmartDevice, cd: SmartDevice, md: SmartDevice) {
        super(bd, cd, md)
    }
    public music(instruction: String): void {//音乐被唤醒后，使其他设备进入准备状态
        this.cd.readyState(instruction)//调用窗帘的准备方法
        this.bd.readyState(instruction)//调用洗浴设备的准备方法
    }
    public curtain(instruction: String): void {
        this.md.readyState(instruction)
        this.bd.readyState(instruction)
    }
    public bath(instruction: String): void {
        this.cd.readyState(instruction)
        this.md.readyState(instruction)
    }
}

class Client {
    public static main(): void {
        let bd: SmartDevice = new BathDevice()
        let cd: SmartDevice = new CurtainDevice()
        let md: SmartDevice = new MusicDevice()
        let sm: SmartMediator = new ConcreteMediator(bd, cd, md)//把设备引用都保存在调停者中
        cd.operateDevice("open", sm) //开启窗帘
        md.operateDevice("close", sm)//关闭音乐
    }
}
Client.main()
// 窗帘已open
// 音乐设备准备open
// 洗浴设备正在准备open

// 音乐设备已close
// 窗帘设备准备close
// 洗浴设备正在准备close
