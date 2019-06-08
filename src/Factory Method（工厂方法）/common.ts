interface Product {
    use(param?: any): void
}

class ConcreteProductA implements Product {
    use(param?: any): void {
        console.log("ConcreteProductA's use method has been called!")
    }
}

class ConcreteProductB implements Product {
    use(param?: any): void {
        console.log("ConcreteProductB's use method has been called!")
    }
}

abstract class Factory {
    abstract createProduct(): Product
}

class ConcreteFactoryA extends Factory {
    createProduct(): Product {
        return new ConcreteProductA()
    }
}

class ConcreteFactoryB extends Factory {
    createProduct(): Product {
        return new ConcreteProductB()
    }
}
