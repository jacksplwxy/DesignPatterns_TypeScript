interface Strategy {
    Operation(): void; //发电操作的方法
    getName(): string; //发电型能名称
}

//核能发电
class NuclearPower implements Strategy {
    Operation(): void {
        console.log("Ohhh!! 好可怕哦");
        console.log("Power Coming!!");
    }
    getName(): string {
        return 'NuclearPower';
    }
}
//水发电
class WaterPower implements Strategy {
    Operation(): void {
        console.log("Waiting..."); //很慢
        console.log("Waiting..."); //缺水
        console.log("Waiting..."); //就只能发那么多 不要急
        console.log("Power Coming!!"); //电來咯
    }
    getName(): string {
        return 'WaterPower';
    }
}
//火发电
class FirePower implements Strategy {
    Operation(): void {
        console.log("Ohhh!! 乾淨的煤"); //別擔心！干净的煤
        console.log("A lot of Smoke!!"); //是雾霾
        console.log("Power Coming!!");  //电來咯
    }
    getName(): string {
        return 'FirePower';
    }
}

class Battery {
    private strategy: Strategy; //充电策略
    setPowerStrategy(str: Strategy) {
        this.strategy = str; //設定充电策略
    }
    charge(): void {
        console.log('Use: ' + this.strategy.getName() + ' Charging...'); //正在用什么电充电
        this.strategy.Operation(); //充电吧
    }
    discharge(): void {
        console.log('Discharging...');
    }
}

class Client {
    public static main(): void {
        let gogorobattery: Battery = new Battery(); //新增一电池

        gogorobattery.setPowerStrategy(new FirePower()); //更改电池充电方法
        gogorobattery.charge(); //帮电池充电咯
        gogorobattery.discharge(); //耗电池的电
        console.log('沒电了 拿去充电');

        gogorobattery.setPowerStrategy(new NuclearPower());
        gogorobattery.charge();
        gogorobattery.discharge();
        console.log('沒电了 拿去充电');

        gogorobattery.setPowerStrategy(new WaterPower());
        gogorobattery.charge();
        gogorobattery.discharge();
    }
}
Client.main()

// Use: FirePower Charging...
// Ohhh!! 乾淨的煤
// A lot of Smoke!!
// Power Coming!!
// Discharging...
// 沒电了 拿去充电
// Use: NuclearPower Charging...
// Ohhh!! 好可怕哦
// Power Coming!!
// Discharging...
// 沒电了 拿去充电
// Use: WaterPower Charging...
// Waiting...
// Waiting...
// Waiting...
// Power Coming!!
// Discharging...