interface RequestData {
    name: string,
    increaseNum: number,
}

/**
 * 抽象处理者
 */
abstract class Handler {
    protected next: Handler;
    setNext(next: Handler) {
        this.next = next;
    }
    abstract processRequest(request: RequestData): void;
}

class IdentityValidator extends Handler {
    processRequest(request: RequestData) {
        if (request.name === 'yuanfeng') {
            console.log(`${request.name} 是本公司的员工`);
            this.next.processRequest(request);
        } else {
            console.log('不是本公司员工');
        }
    }
}

class Manager extends Handler {
    processRequest(request: RequestData) {
        if (request.increaseNum < 300) {
            console.log('低于300的涨薪，经理直接批准了');
        } else {
            console.log(`${request.name}的涨薪要求超过了经理的权限，需要更高级别审批`);
            this.next.processRequest(request);
        }
    }
}

class Boss extends Handler {
    processRequest(request: RequestData) {
        console.log('hehe，想涨薪，你可以走了');
    }
}



class Client {
    public static main(): void {
        const identityValidator = new IdentityValidator();
        const manager = new Manager();
        const boss = new Boss();
        // 构建职责链
        identityValidator.setNext(manager);
        manager.setNext(boss);

        const request: RequestData = {
            name: 'yuanfeng',
            increaseNum: 500,
        };
        identityValidator.processRequest(request);
    }
}
Client.main()

// yuanfeng 是本公司的员工
// yuanfeng的涨薪要求超过了经理的权限，需要更高级别审批
// hehe，想涨薪，你可以走了
