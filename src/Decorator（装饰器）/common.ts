//得益于JS在语法层面实现了装饰器（提案），这让装饰器的实现变得非常简单
@testable
class MyTestableClass {
  // ...
}
function testable(target) {
  target.isTestable = true;
}
MyTestableClass.isTestable // true

//上面代码中，@testable就是一个修饰器。它修改了MyTestableClass这个类的行为，为它加上了静态属性isTestable。testable函数的参数target是MyTestableClass类本身。

//基本上，修饰器的行为就是下面这样。
@decorator
class A {}
// 等同于
class A {}
A = decorator(A) || A;

