//简单命令:点菜场景下，客户点餐后完全不需要知道做菜的厨师是谁，记载着客户点菜信息的订单就是一个命令。

// 命令的基类，只包含了一个执行方法
class Command {
    execute(arg?): void { }
}

// 厨师类，每个厨师都会做面包和肉
class Cook {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    makeBread() {
        console.log(` ${this.name} 在做面包`);
    }
    makeMeal() {
        console.log(` ${this.name} 在做肉`);
    }
}

// 简单命令只需要包含接收者和执行接口
class SimpleCommand extends Command {
    // 接收者，在点菜系统里是厨师
    receiver: Cook;
}

// 做面包的命令类
class BreadCommand extends SimpleCommand {
    constructor(cook: Cook) {
        super();
        this.receiver = cook;
    }
    execute() {
        this.receiver.makeBread();
    }
}

// 做肉的命令类
class MealCommand extends SimpleCommand {
    constructor(cook: Cook) {
        super();
        this.receiver = cook;
    }
    execute() {
        this.receiver.makeMeal();
    }
}

// 系统启动时，将命令注册到菜单上，生成可被到处使用的命令对象
class Client {
    public static main(): void {
        const cook1 = new Cook('厨师1');
        const cook2 = new Cook('厨师2');

        // 生成菜单，上架销售，顾客可以选择点肉或点面包
        const breadCommand: Command = new BreadCommand(cook1);
        const mealCommand: Command = new MealCommand(cook2);

        // 客户点菜时，完全不需要知道是哪个厨师做的，只需要从菜单上点想要的菜，即下命令即可
        // 此时已经做到了命令的触发者与接收者的分离
        // 命令对象可以在整个系统中到处传递，如经过多个服务员，而不会丢失接受者的信息
        breadCommand.execute();
        mealCommand.execute();
    }
}
Client.main()

// 厨师1 在做面包
// 厨师2 在做肉




//可撤销命令：相比简单命令，除了在命令对象中保存了接收者，还需要存储额外的状态信息，如接收者上次执行操作的参数
class AdvancedCommand extends Command {
  // 接收者
  ball: Ball;
  // 额外状态信息，移动的距离
  pos: number;
  // 执行命令时候，向左移动，同时记录下移动的距离
  execute(pos: number) {
    this.pos = pos;
    this.ball.moveToLeft(pos);
  }
  // 撤销时执行反向操作
  unExecute() {
    this.ball.moveToRight(this.pos);
  }
}



//宏命令：同时允许多个命令，这里不需要显式的接收者，因为每个命令都已经定义了各自的接收者
class MacroCommand extends Command {
  // 保存命令列表
  cmdSet: Set<Command> = [];
  add(cmd: Command): void {
    this.cmdSet.add(cmd);
  }
  remove(cmd: Command): void {
    this.cmdSet.delete(cmd);
  }
  execute(): void {
    this.cmdSet.forEach((cmd: Command) => {
      cmd.execute();
    });
  }
}








