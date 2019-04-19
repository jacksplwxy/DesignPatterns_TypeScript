
//抽象构件
interface Component {
    add(c: Component): void;
    remove(c: Component): void;
    getChild(i: number): Component;
    operation(): void;
}
//树叶构件
class Leaf implements Component {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    public add(c: Component): void { }
    public remove(c: Component): void { }
    public getChild(i: number): Component {
        return null;
    }
    public operation(): void {
        console.log("树叶" + this.name + "：被访问！");
    }
}
//树枝构件
class Composite implements Component {
    private children: Array<Component> = [];
    public add(c: Component): void {
        this.children.push(c);
    }
    public remove(c: Component): void {
        deleteVal(this.children, c)
    }
    public getChild(i: number): Component {
        return this.children[i];
    }
    public operation(): void {
        this.children.forEach((component: Component) => {
            component.operation()
        })
    }
}
//删除数组中指定的元素
function deleteVal(arr: Array<any>, val: any) {
    let index = arr.indexOf(val);
    if (index > -1) {
        arr.splice(index, 1);
    }
}


class Client {
    public static main(): void {
        const c0: Component = new Composite();
        const c1: Component = new Composite();
        const leaf1: Component = new Leaf("1");
        const leaf2: Component = new Leaf("2");
        const leaf3: Component = new Leaf("3");
        c0.add(leaf1);
        c0.add(c1);
        c1.add(leaf2);
        c1.add(leaf3);
        c0.operation();
    }
}
Client.main()

// 树叶1：被访问！
// 树叶2：被访问！
// 树叶3：被访问！