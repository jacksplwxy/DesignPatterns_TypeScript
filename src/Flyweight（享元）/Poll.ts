//其他对象池参考：https://github.com/egret-labs/egret-game-library/blob/master/src/game/ObjectPool.ts

class Pool {
    static instance: Pool
    // 单例模式
    static getInstance() {
        if (!Pool.instance) {
            Pool.instance = new Pool()
        }
        return Pool.instance
    }

    public constructor() {

    }

    public getPoolBySign(name) {
        return this[name] || (this[name] = [])
    }

    public getItemByClass(name, className) {
        let pool = this.getPoolBySign(name)
        let result = (pool.length ? pool.shift() : new className())
        return result
    }

    public recover(name, instance) {
        this.getPoolBySign(name).push(instance)
    }
}

