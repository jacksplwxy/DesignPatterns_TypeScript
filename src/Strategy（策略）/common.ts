interface Strategy {
    execute(): void
}

class ConcreteStrategyA implements Strategy {
    public execute(): void {
        console.log("`execute` method of ConcreteStrategy1 is being called")
    }
}

class ConcreteStrategyB implements Strategy {
    public execute(): void {
        console.log("`execute` method of ConcreteStrategy2 is being called")
    }
}

class Context {
    private strategy: Strategy
    constructor(strategy: Strategy) {
        this.strategy = strategy
    }
    public executeStrategy(): void {
        this.strategy.execute()
    }
}

class Client {
    public static main(): void {
        let context: Context = new Context(
            new ConcreteStrategyA()
        )
        context.executeStrategy()
        context = new Context(
            new ConcreteStrategyB()
        )
        context.executeStrategy()
    }
}
Client.main()

// `execute` method of ConcreteStrategy1 is being called
// `execute` method of ConcreteStrategy2 is being called