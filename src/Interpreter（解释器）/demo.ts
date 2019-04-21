//参考：https://www.oodesign.com/interpreter-pattern.html

//罗马数字转换为阿拉伯数字
class Context {
    private input: string;
    private output: number;
    public constructor(input: string) {
        this.input = input;
    }
    public getInput(): string {
        return this.input;
    }
    public setInput(input: string): void {
        this.input = input;
    }
    public getOutput(): number {
        return this.output || 0;
    }
    public setOutput(output: number = 0): void {
        this.output = output;
    }
}

abstract class Expression {
    public abstract one(): string;
    public abstract four(): string;
    public abstract five(): string;
    public abstract nine(): string;
    public abstract multiplier(): number;
    public interpret(context: Context): void {
        if (context.getInput().length == 0) {
            return null;
        }
        if (context.getInput().indexOf(this.nine()) === 0) {
            context.setOutput(context.getOutput() + (9 * this.multiplier()));
            context.setInput(context.getInput().substring(2));
        } else if (context.getInput().indexOf(this.four()) === 0) {
            context.setOutput(context.getOutput() + (4 * this.multiplier()));
            context.setInput(context.getInput().substring(2));
        } else if (context.getInput().indexOf(this.five()) === 0) {
            context.setOutput(context.getOutput() + (5 * this.multiplier()));
            context.setInput(context.getInput().substring(1));
        }
        while (context.getInput().indexOf(this.one()) === 0) {
            context.setOutput(context.getOutput() + (1 * this.multiplier()));
            context.setInput(context.getInput().substring(1));
        }
    }
}

//千位表达式
class ThousandExpression extends Expression {
    public one(): string { return "M"; }
    public four(): string { return " "; }
    public five(): string { return " "; }
    public nine(): string { return " "; }
    public multiplier(): number { return 1000; }
}
//百位表达式
class HundredExpression extends Expression {
    public one(): string { return "C"; }
    public four(): string { return "CD"; }
    public five(): string { return "D"; }
    public nine(): string { return "CM"; }
    public multiplier(): number { return 100; }
}
//十位表达式
class TenExpression extends Expression {
    public one(): string { return "X"; }
    public four(): string { return "XL"; }
    public five(): string { return "L"; }
    public nine(): string { return "XC"; }
    public multiplier(): number { return 10; }
}
//个位表达式
class OneExpression extends Expression {
    public one(): string { return "I"; }
    public four(): string { return "IV"; }
    public five(): string { return "V"; }
    public nine(): string { return "IX"; }
    public multiplier(): number { return 1; }
}


class Client {
    public static main(): void {
        const roman: string = "MCMXXVIII";
        const context: Context = new Context(roman);

        // Build the 'parse tree' 
        const tree: Array<Expression> = [];
        tree.push(new ThousandExpression());
        tree.push(new HundredExpression());
        tree.push(new TenExpression());
        tree.push(new OneExpression());

        // Interpret 
        tree.forEach(expression => {
            expression.interpret(context);
        })
        console.log(roman + " => " + context.getOutput());
    }
}
Client.main()

//MCMXXVIII => 1928