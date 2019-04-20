//一个公司有两种员工，正式工和临时工，他们有不同的工时和薪酬结算方法。
// 员工接口
interface Employee {
    accept(handler: Department): void
}

// 全职员工类
class FulltimeEmployee implements Employee {
    private name = ''
    // 全职员工按周薪计算薪酬
    private weeklyWage = 0
    // 工作时长
    private workTime = 0
    constructor(name: string, weeklyWage: number, workTime: number) {
        this.name = name
        this.weeklyWage = weeklyWage
        this.workTime = workTime
    }
    getName(): string {
        return this.name
    }
    getWeeklyWage(): number {
        return this.weeklyWage
    }
    getWorkTime(): number {
        return this.workTime
    }
    // 实现接口，调用访问者处理全职员工的方法
    accept(handler: Department) {
        handler.visitFulltime(this)
    }
}

// 临时员工类
class ParttimeEmployee implements Employee {
    private name = ''
    // 临时员工按时薪计算薪酬
    private hourWage = 0
    // 工作时长
    private workTime = 0
    constructor(name: string, hourWage: number, workTime: number) {
        this.name = name
        this.hourWage = hourWage
        this.workTime = workTime
    }
    getName(): string {
        return this.name
    }
    getHourWage(): number {
        return this.hourWage
    }
    getWorkTime(): number {
        return this.workTime
    }
    // 实现接口，调用访问者处理临时工的方法
    accept(handler: Department) {
        handler.visitParttime(this)
    }
}

// 部门接口
interface Department {
    visitFulltime(employee: FulltimeEmployee): void
    visitParttime(employee: ParttimeEmployee): void
}

// 具体访问者——财务部，结算薪酬实现部门接口
class FADepartment implements Department {
    // 全职员工薪酬计算方式
    visitFulltime(employee: FulltimeEmployee) {
        const name: string = employee.getName()
        let workTime: number = employee.getWorkTime()
        let weekWage: number = employee.getWeeklyWage()
        const WEEK_WORK_TIME = 40
        if (workTime > WEEK_WORK_TIME) {
            // 计算加班工资
            const OVER_TIME_WAGE = 100
            weekWage = weekWage + (workTime - WEEK_WORK_TIME) * OVER_TIME_WAGE
        } else if (workTime < WEEK_WORK_TIME) {
            if (workTime < 0) {
                workTime = 0
            }
            // 扣款
            const CUT_PAYMENT = 80
            weekWage = weekWage - (WEEK_WORK_TIME - workTime) * CUT_PAYMENT
        }
        console.log(`正式员工 ${name} 实际工资为：${weekWage}`)
    }
    // 临时工薪酬计算方式
    visitParttime(employee: ParttimeEmployee) {
        const name = employee.getName()
        const hourWage = employee.getHourWage()
        const workTime = employee.getWorkTime()
        console.log(`临时工 ${name} 实际工资为：${hourWage * workTime}`)
    }
}

// 具体访问者——人力资源部，结算工作时间，实现部门接口
class HRDepartment implements Department {
    // 全职员工工作时间报告
    visitFulltime(employee: FulltimeEmployee) {
        const name: string = employee.getName()
        let workTime: number = employee.getWorkTime()
        // 实际工作时间报告
        let report = `正式员工 ${name} 实际工作时间为 ${workTime} 小时`
        const WEEK_WORK_TIME = 40
        if (workTime > WEEK_WORK_TIME) {
            // 加班时间报告
            report = `${report}，加班 ${WEEK_WORK_TIME - workTime} 小时`
        } else if (workTime < WEEK_WORK_TIME) {
            if (workTime < 0) {
                workTime = 0
            }
            // 请假时间报告
            report = `${report}，请假 ${WEEK_WORK_TIME - workTime} 小时`
        }
        console.log(report)
    }
    // 临时工工作时间报告
    visitParttime(employee: ParttimeEmployee) {
        const name: string = employee.getName()
        const workTime: number = employee.getWorkTime()
        console.log(`临时工 ${name} 实际工作时间为 ${workTime} 小时`)
    }
}

// 员工集合类
class EmployeeList {
    list: Array<Employee> = []
    add(employee: Employee) {
        this.list.push(employee)
    }
    // 遍历员工集合中的每一个对象
    accept(handler: Department) {
        this.list.forEach((employee: Employee) => {
            employee.accept(handler)
        })
    }
}


class Client {
    public static main(): void {
        const list: EmployeeList = new EmployeeList()
        const full1 = new FulltimeEmployee('Bob', 3000, 45)
        const full2 = new FulltimeEmployee('Mikel', 2000, 35)
        const full3 = new FulltimeEmployee('Joe', 4000, 40)
        const part1 = new ParttimeEmployee('Lili', 80, 20)
        const part2 = new ParttimeEmployee('Lucy', 60, 15)
        list.add(full1)
        list.add(full2)
        list.add(full3)
        list.add(part1)
        list.add(part2)
        // 财务部计算薪酬
        const faHandler = new FADepartment()
        list.accept(faHandler)
        // 人力资源部出工作报告
        const hrHandler = new HRDepartment()
        list.accept(hrHandler)
    }
}
Client.main()

// 正式员工 Bob 实际工资为：3500
// 正式员工 Mikel 实际工资为：1600
// 正式员工 Joe 实际工资为：4000
// 临时工 Lili 实际工资为：1600
// 临时工 Lucy 实际工资为：900
// 正式员工 Bob 实际工作时间为 45 小时，加班 -5 小时
// 正式员工 Mikel 实际工作时间为 35 小时，请假 5 小时
// 正式员工 Joe 实际工作时间为 40 小时
// 临时工 Lili 实际工作时间为 20 小时