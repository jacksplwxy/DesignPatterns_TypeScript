class Singleton {
    private static instance: Singleton
    private constructor() {}	//设置构造函数private，防止new实例化
    public static getInstance(): Singleton {
      if (!Singleton.instance) {
        Singleton.instance = new Singleton()
      }
      return Singleton.instance
    }
}