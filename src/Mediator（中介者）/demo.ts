// 抽象中介者
abstract class Mediator {
    abstract contact(message: string, person: Human): void
}

// 抽象同事类
abstract class Human {
    name: string
    mediator: Mediator
    constructor(name: string, mediator: Mediator) {
        this.name = name
        this.mediator = mediator
    }
}

// 2个具体的同事类
// 房主类
class HouseOwner extends Human {
    contact(message: string) {
        console.log(`房主 ${this.name} 发送消息 ${message}`)
        this.mediator.contact(message, this)
    }
    getMessage(message: string) {
        console.log(`房主 ${this.name} 收到消息 ${message}`)
    }
}

// 租客类
class Tenant extends Human {
    contact(message: string) {
        console.log(`租客 ${this.name} 发送消息 ${message}`)
        this.mediator.contact(message, this)
    }
    getMessage(message: string) {
        console.log(`租客 ${this.name} 收到消息 ${message}`)
    }
}

// 具体中介者
class ConcreteMediator extends Mediator {
    private tenant: Tenant
    private houseOwner: HouseOwner
    setTenant(tenant: Tenant) {
        this.tenant = tenant
    }
    setHouseOwner(houseOwner: HouseOwner) {
        this.houseOwner = houseOwner
    }
    // 由中介者来设置同事对象之间的联系关系
    contact(message: string, person: Human) {
        console.log('中介传递消息')
        if (person === this.houseOwner) {
            this.tenant.getMessage(message)
        } else {
            this.houseOwner.getMessage(message)
        }
    }
}

class Client {
    public static main(): void {
        const mediator = new ConcreteMediator()
        const houseOwner = new HouseOwner('财大气粗的房叔', mediator)
        const tenant = new Tenant('远峰', mediator)
        // 向中介者注册成员
        mediator.setHouseOwner(houseOwner)
        mediator.setTenant(tenant)
        // 中介的成员只需要发送信息，而不需要关心具体接受者，联系关系都维护在了中介者中
        tenant.contact('我想租房')
        houseOwner.contact('我有房，你要租吗')
    }
}
Client.main()

// 租客 远峰 发送消息 我想租房
// 中介传递消息
// 房主 财大气粗的房叔 收到消息 我想租房
// 房主 财大气粗的房叔 发送消息 我有房，你要租吗
// 中介传递消息
// 租客 远峰 收到消息 我有房，你要租吗
