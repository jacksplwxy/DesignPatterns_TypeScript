//微信小程序中的toast或者loading组件，无论你创建多少次，它永远都只会出现一次（要是出现几个toast会让人觉得很奇怪）。要实现这种功能，办法就是单例模式：

class Toast {
    private static instance: Toast
    private constructor() { }
    public static getInstance(): Toast {
        if (!Toast.instance) {
            Toast.instance = new Toast()
        }
        return Toast.instance
    }
}

class Client {
    public static main(): void {
        const toast1 = Toast.getInstance()
        const toast2 = Toast.getInstance()
        console.log(toast1 === toast2)	//true
    }
}
Client.main()