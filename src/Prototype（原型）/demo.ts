function clone(prototype: any) {
    return Object.create(prototype)
}

class Apple {
    private weight: number = 0
    constructor() {
        this.weight = this.getWeight()
    }
    private getWeight(): number {
        let weight: number = 0
        for (let i = 0; i < 1000000000; i++) {
            weight += i
        }
        return weight
    }
}

class Client {
    public static main(): void {
        const time0 = new Date().getTime()
        const apple0 = new Apple()
        const time1 = new Date().getTime()
        console.log('创建apple0耗时：', time1 - time0)
        const apple1 = clone(apple0)
        const time2 = new Date().getTime()
        console.log('创建apple1耗时：', time2 - time1)
    }
}
Client.main()


//创建apple0耗时： 1245 ; 创建apple1耗时： 6。  由此可见clone比new效率高很多

