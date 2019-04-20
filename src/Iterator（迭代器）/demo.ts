interface Aggregate {
    iterator(): Iterater;
}
interface Iterater {
    hasNext(): boolean;
    next(): Object;
}
class Book {
    private name: string;
    constructor(n: string) {
        this.name = n;
    }
    public getName(): string {
        return this.name;
    }
}
class BookShelf implements Aggregate {
    private books: Book[] = [];
    private count: number;
    constructor() {
        this.count = 0;
    }
    public getBook(index: number): Book { //取得哪本書
        return this.books[index];
    }
    public appendBook(book: Book): void { //增加書
        this.books.push(book);
        this.count++;
    }
    public getLength(): number { //取得書架目前多少書
        return this.count;
    }
    public iterator(): Iterater { //取得尋訪方法 會將自己放入Iterator內產出一遍歷方法
        return new BookShelfIterator(this);
    }

}
class BookShelfIterator implements Iterater {
    private bookshelf: BookShelf;
    private index: number;
    constructor(bshelf: BookShelf) { //把書架放進來
        this.bookshelf = bshelf;
        this.index = 0; //目前位置在0
    }
    public hasNext(): boolean { //是否有下一個就是由現在位置並確定書架是不是有那麼多書 如果現在位置9 且書也只有9本，代表已經沒有下一個了
        if (this.index < this.bookshelf.getLength()) {
            return true;
        } else {
            return false;
        }
    }
    //取得下一本書，且會透過該書架
    public next(): Object {
        let book: Book = this.bookshelf.getBook(this.index);
        this.index++;
        return book;
    }

}

class Client {
    public static main(): void {
        let bookshelf: BookShelf = new BookShelf();
        bookshelf.appendBook(new Book('A Book'));
        bookshelf.appendBook(new Book('B Book'));
        bookshelf.appendBook(new Book('C Book'));
        let it: Iterater = bookshelf.iterator();
        while (it.hasNext()) {
            console.log((<Book>it.next()).getName());
        }
    }
}
Client.main()

// A Book
// B Book
// C Book