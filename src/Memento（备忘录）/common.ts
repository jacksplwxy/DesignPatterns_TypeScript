
//±¸ÍüÂ¼
class Memento {
    private state: string;
    public constructor(state: string) {
        this.state = state;
    }
    public setState(state: string): void {
        this.state = state;
    }
    public getState(): string {
        return this.state;
    }
}
//·¢ÆğÈË
class Originator {
    private state: string;
    public setState(state: string): void {
        this.state = state;
    }
    public getState(): string {
        return this.state;
    }
    public createMemento(): Memento {
        return new Memento(this.state);
    }
    public restoreMemento(m: Memento): void {
        this.setState(m.getState());
    }
}
//¹ÜÀíÕß
class Caretaker {
    private memento: Memento;
    public setMemento(m: Memento): void {
        this.memento = m;
    }
    public getMemento(): Memento {
        return this.memento;
    }
}


class Client {
    public static main(): void {
        const or: Originator = new Originator();
        const cr: Caretaker = new Caretaker();
        or.setState("S0");
        console.log("³õÊ¼×´Ì¬:" + or.getState());
        cr.setMemento(or.createMemento()); //±£´æ×´Ì¬      
        or.setState("S1");
        console.log("ĞÂµÄ×´Ì¬:" + or.getState());
        or.restoreMemento(cr.getMemento()); //»Ö¸´×´Ì¬
        console.log("»Ö¸´×´Ì¬:" + or.getState());
    }
}
Client.main()

// ³õÊ¼×´Ì¬:S0
// ĞÂµÄ×´Ì¬:S1
// »Ö¸´×´Ì¬:S0