
//外观角色
class Facade {
    private obj1: SubSystem01 = new SubSystem01();
    private obj2: SubSystem02 = new SubSystem02();
    private obj3: SubSystem03 = new SubSystem03();
    public method(): void {
        this.obj1.method1();
        this.obj2.method2();
        this.obj3.method3();
    }
}
//子系统角色
class SubSystem01 {
    public method1(): void {
        console.log("子系统01的method1()被调用！");
    }
}
//子系统角色
class SubSystem02 {
    public method2(): void {
        console.log("子系统02的method2()被调用！");
    }
}
//子系统角色
class SubSystem03 {
    public method3(): void {
        console.log("子系统03的method3()被调用！");
    }
}

class Client {
    public static main(): void {
        const f: Facade = new Facade();
        f.method();
    }
}
Client.main()