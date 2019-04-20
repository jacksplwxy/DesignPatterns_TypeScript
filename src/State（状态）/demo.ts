// 账户有几种状态：正常，透支，受限

// 状态抽象类
abstract class State {
    private name: string;
    protected acc: Account;
    constructor(name: string) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    abstract deposit(amount: number);
    abstract withdraw(amount: number);
    abstract computeInterest();
    abstract stateCheck();
}

// 正常状态类
class NormalState extends State {
    acc: Account;
    constructor(acc: Account) {
        super('正常');
        this.acc = acc;
    }
    deposit(amount: number) {
        this.acc.setBalance(this.acc.getBalance() + amount);
        this.stateCheck();
    }
    withdraw(amount: number) {
        this.acc.setBalance(this.acc.getBalance() - amount);
        this.stateCheck();
    }
    computeInterest() {
        console.log('正常状态，无须支付利息');
    }
    // 状态转换
    stateCheck() {
        if (this.acc.getBalance() > -2000 && this.acc.getBalance() <= 0) {
            this.acc.setState(new OverdraftState(this.acc));
        } else if (this.acc.getBalance() == -2000) {
            this.acc.setState(new RestrictedState(this.acc));
        } else if (this.acc.getBalance() < -2000) {
            console.log('操作受限');
        }
    }
}

// 透支状态
class OverdraftState extends State {
    acc: Account;
    constructor(acc: Account) {
        super('透支');
        this.acc = acc;
    }
    deposit(amount: number) {
        this.acc.setBalance(this.acc.getBalance() + amount);
        this.stateCheck();
    }
    withdraw(amount: number) {
        this.acc.setBalance(this.acc.getBalance() - amount);
        this.stateCheck();
    }
    computeInterest() {
        console.log('计算利息');
    }
    // 状态转换
    stateCheck() {
        if (this.acc.getBalance() > 0) {
            this.acc.setState(new NormalState(this.acc));
        } else if (this.acc.getBalance() == -2000) {
            this.acc.setState(new RestrictedState(this.acc));
        } else if (this.acc.getBalance() < -2000) {
            console.log('操作受限');
        }
    }
}

// 受限状态
class RestrictedState extends State {
    acc: Account;
    constructor(acc: Account) {
        super('受限');
        this.acc = acc;
    }
    deposit(amount: number) {
        this.acc.setBalance(this.acc.getBalance() + amount);
        this.stateCheck();
    }
    withdraw(ammount: number) {
        console.log('账号受限，取款失败');
    }
    computeInterest() {
        console.log('计算利息');
    }
    // 状态转换
    stateCheck() {
        if (this.acc.getBalance() > 0) {
            this.acc.setState(new NormalState(this.acc));
        } else if (this.acc.getBalance() > -2000) {
            this.acc.setState(new OverdraftState(this.acc));
        }
    }
}

// 账户类，代表状态模式中的环境
class Account {
    private name: string;
    private state: State;
    // 余额
    private balance = 0;
    // 初始时为正常状态
    constructor(name: string) {
        this.name = name;
        this.state = new NormalState(this);
        console.log(`用户 ${this.name} 开户，余额为 ${this.balance}`);
        console.log('--------');
    }
    getBalance(): number {
        return this.balance;
    }
    setBalance(balance: number) {
        this.balance = balance;
    }
    setState(state: State) {
        this.state = state;
    }
    // 存款
    deposit(amount: number) {
        this.state.deposit(amount);
        console.log(`存款 ${amount}`);
        console.log(`余额为 ${this.balance}`);
        console.log(`账户状态为 ${this.state.getName()}`);
        console.log('--------');
    }
    // 取款
    withdraw(amount: number) {
        this.state.withdraw(amount);
        console.log(`取款 ${amount}`);
        console.log(`余额为 ${this.balance}`);
        console.log(`账户状态为 ${this.state.getName()}`);
        console.log('--------');
    }
    // 结算利息
    computeInterest() {
        this.state.computeInterest();
    }
}

class Client {
    public static main(): void {
        const acc = new Account('Bob');
        acc.deposit(1000);
        acc.withdraw(2000);
        acc.deposit(3000);
        acc.withdraw(4000);
        acc.withdraw(1000);
        acc.computeInterest();
    }
}
Client.main()

// 用户 Bob 开户，余额为 0
// --------
// 存款 1000
// 余额为 1000
// 账户状态为 正常
// --------
// 取款 2000
// 余额为 -1000
// 账户状态为 透支
// --------
// 存款 3000
// 余额为 2000
// 账户状态为 正常
// --------
// 取款 4000
// 余额为 -2000
// 账户状态为 受限
// --------
// 账号受限，取款失败
// 取款 1000
// 余额为 -2000
// 账户状态为 受限
// --------
// 计算利息