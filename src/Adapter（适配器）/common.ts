//目标接口:当前系统业务所期待的接口
interface Target {
    request(): void
}
//适配者:它是被访问和适配的现存组件库中的组件接口。
class Adaptee {
    public specificRequest(): void {
        console.log("适配者中的业务代码被调用！")
    }
}
//适配器:它是一个转换器
class ClassAdapter extends Adaptee implements Target {
    constructor() {
        super()
    }
    public request(): void {
        this.specificRequest()
    }
}
//客户端代码
class Client {
    public static main(): void {
        const target: Target = new ClassAdapter()
        target.request()
    }
}
Client.main()	//适配者中的业务代码被调用！
