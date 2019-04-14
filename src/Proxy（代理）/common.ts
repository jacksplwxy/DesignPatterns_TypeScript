//抽象主题
interface Subject {
    Request(): void
}
//真实主题
class RealSubject implements Subject {
    public Request(): void {
        console.log("访问真实主题方法...")
    }
}
//代理
class Proxy_ implements Subject {
    private realSubject: RealSubject
    public Request(): void {
        if (this.realSubject == null) {
            this.realSubject = new RealSubject()
        }
        this.preRequest()
        this.realSubject.Request()
        this.postRequest()
    }
    public preRequest(): void {
        console.log("访问真实主题之前的预处理。")
    }
    public postRequest(): void {
        console.log("访问真实主题之后的后续处理。")
    }
}

class Client {
    public static main(): void {
        const proxy: Proxy_ = new Proxy_()
        proxy.Request()
    }
}
Client.main()
/**
 * 访问真实主题之前的预处理。
 * 访问真实主题方法...
 * 访问真实主题之后的后续处理。
 */