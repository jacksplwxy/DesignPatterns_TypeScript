interface Composite {
    add(c: Composite): void;
    remove(c: Composite): void;
    draw(): void;
}
class Circle implements Composite {
    add(c: Composite): void {
        throw new Error('I can not do it');
    }
    remove(c: Composite): void {
        throw new Error('I can not do it');
    }
    draw(): void {
        console.log('Draw a Circle');
    }
}
class Square implements Composite {
    add(c: Composite): void {
        throw new Error('I can not do it');
    }
    remove(c: Composite): void {
        throw new Error('I can not do it');
    }
    draw(): void {
        console.log('Draw a Square');
    }
}

class ShapeDiagram implements Composite {
    private list: Composite[] = [];
    add(c: Composite): void {
        this.list.push(c);
    }
    remove(c: Composite): void {
        this.list.forEach((item, index) => {
            if (item === c) this.list.splice(index, 1);
        });
    }
    draw(): void {
        this.list.forEach((item, index) => {
            item.draw();
        });
    }
}

class Client {
    public static main(): void {
        let diagram: Composite = new ShapeDiagram();
        let circle1: Composite = new Circle();
        diagram.add(circle1);
        let square1: Composite = new Square();
        diagram.add(square1);
        let circle2: Composite = new Circle();
        diagram.add(circle2);
        diagram.draw();
        diagram.remove(square1);
        square1.add(square1);
        diagram.draw();
    }
}
Client.main()

// Draw a Circle
// Draw a Square
// Draw a Circle
// Error: 'I can not do it '. at Square.add