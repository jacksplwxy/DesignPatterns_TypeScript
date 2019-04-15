//在开发中，一个场景我们经常遇到，就是要给某个类增加方法，但这个不是自己类的，里面的代码乱七八糟，我们当然不想修改这样的代码。解决方案就是装饰器

//别人写的战斗机类
@addMissileFire
class Fighter {
    public doSomething() {

    }
}
//现在想给战斗机增加发射导弹的功能
function addMissileFire(target) {
    target.missileFire = () => { console.log('发射导弹') }
}
//测试
class Client {
    public static main() {
        Fighter.missileFire()
    }
}
Client.main()//发射导弹