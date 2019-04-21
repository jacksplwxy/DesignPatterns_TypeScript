// 解释器模式包含以下主要角色:
// 1、抽象表达式（Abstract Expression）角色：定义解释器的接口，约定解释器的解释操作，主要包含解释方法 interpret()。
// 2、终结符表达式（Terminal    Expression）角色：是抽象表达式的子类，用来实现文法中与终结符相关的操作，文法中的每一个终结符都有一个具体终结表达式与之相对应。
// 3、非终结符表达式（Nonterminal Expression）角色：也是抽象表达式的子类，用来实现文法中与非终结符相关的操作，文法中的每条规则都对应于一个非终结符表达式。
// 4、环境（Context）角色：通常包含各个解释器需要的数据或是公共的功能，一般用来传递被所有解释器共享的数据，后面的解释器可以从这里获取这些值。
// 5、客户端（Client）：主要任务是将需要分析的句子或表达式转换成使用解释器对象描述的抽象语法树，然后调用解释器的解释方法，当然也可以通过环境角色间接访问解释器的解释方法。

//抽象表达式类
interface AbstractExpression {
    interpret(info: string): void;    //解释方法
}
//终结符表达式类
class TerminalExpression implements AbstractExpression {
    public interpret(info: string): void {
        //对终结符表达式的处理
    }
}
//非终结符表达式类
class NonterminalExpression implements AbstractExpression {
    private exp1: AbstractExpression;
    private exp2: AbstractExpression;
    public interpret(info: string): void {
        //非对终结符表达式的处理
    }
}
//环境类
class Context {
    private exp: AbstractExpression;
    public constructor() {
        //数据初始化
    }
    public operation(info: string): void {
        //调用相关表达式类的解释方法
    }
}
//客户端
class Client {
    public static main(): void {

    }
}
Client.main()