//获取单例
var getSingle = function(fn){
    var result
    return function (){
        return result || (result=fn.apply(this,arguments))
    }
}
//创建div登录框
var createLoginLayer=function (){
    var div= document.createElement('div')
    div.innerHTML='我是登录框'
    document.body.appendChild(div)
    return div
}
//创建iframe的dom节点
var createIframe=function(){
    //创建irame节点的代码
}
var createSingleLoginLayer = getSingle(createLoginLayer)
var createSingleIframe=getSingle(createIframe)
var loginLayer1 = createSingleLoginLayer()
var loginLayer2 = createSingleLoginLayer()
var iframe1=createSingleIframe()
var iframe2=createSingleIframe()
console.log(loginLayer1 === loginLayer2)


//通用的单例创建的例子就是通过封装一个getSingle需要实现单例模式的对象。而且只是会只创建一次。因为使用了闭包的原因通过getSingle创建的result会在内存中一直存在不会销毁（除非页面关闭，或者手动释放）。
