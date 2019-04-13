//Object.create() 方法会使用指定的原型对象及其属性去创建一个新的对象
function clone(prototype: any) {
    return Object.create(prototype)
}
