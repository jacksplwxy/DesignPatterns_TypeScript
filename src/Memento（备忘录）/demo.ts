// 备忘录类
class Memento {
    private x: number;
    private y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    getX(): number {
        return this.x;
    }
    getY(): number {
        return this.y;
    }
}

// 原发器类
class Role {
    private x: number;
    private y: number;
    constructor(name: string, x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    // 移动到新的位置
    moveTo(x: number, y: number): Memento {
        this.x = x;
        this.y = y;
        return this.save();
    }
    save(): Memento {
        return new Memento(this.x, this.y);
    }
    // 根据备忘录回退到某一个位置
    goBack(memento: Memento) {
        this.x = memento.getX();
        this.y = memento.getY();
    }
}

// 负责人，管理所有备忘录
class HistoryRecords {
    private records = [];
    // 添加备忘录
    add(record: Memento): void {
        this.records.push(record);
    }
    // 返回备忘录
    get(index: number): Memento {
        if (this.records[index]) {
            return this.records[index];
        }
        return null;
    }
    // 清除指定位置后面的备忘录
    cleanRecordsAfter(index: number): void {
        this.records.slice(0, index + 1);
    }
}


class Client {
    public static main(): void {
        const role = new Role('卡通小人', 0, 0);
        const records = new HistoryRecords();
        // 记录初始位置
        records.add(role.save());
        // 移动时添加备忘录
        role.moveTo(10, 10);
        records.add(role.save());
        role.moveTo(20, 30);
        records.add(role.save());
        // 回退到初始位置
        const GO_BACK_STEP = 0;
        const firstMemento = records.get(GO_BACK_STEP);
        role.goBack(firstMemento);
        // 清除后面的记录
        records.cleanRecordsAfter(GO_BACK_STEP);
    }
}
Client.main()

