export interface Iterator {
    next(): any
    hasNext(): boolean
}

interface Aggregator {
    createIterator(): Iterator
}

class ConcreteIterator implements Iterator {
    private collection: any[] = []
    private position: number = 0
    constructor(collection: any[]) {
        this.collection = collection
    }
    /**
     * 获取下一个元素
     */
    public next(): any {
        var result = this.collection[this.position]
        this.position += 1
        return result
    }
    /**
     * 判断是否还有下一个元素
     */
    public hasNext(): boolean {
        return this.position < this.collection.length
    }
}

class Numbers implements Aggregator {
    private collection: number[] = []
    constructor(collection: number[]) {
        this.collection = collection
    }
    public createIterator(): Iterator {
        return new ConcreteIterator(this.collection)
    }
}

class Client {
    public static main(): void {
        const nArray = [7, 29, 8, 15, 2, 14]
        const numbers: Numbers = new Numbers(
            nArray
        ),
            it: ConcreteIterator = <
                ConcreteIterator
                >numbers.createIterator()

        while (it.hasNext()) {
            console.log(it.next())
        }
    }
}
Client.main()

// 7
// 29
// 8
// 15
// 2
// 14