// 组件基类
class Component {
    // 模板方法，把组件渲染的流程定义好
    setup() {
      this.componentWillMount();
      this.doRender();
      this.componentDidMount();
    }
    private doRender() {
      // 做实际的渲染工作
    }
    componentWillMount() {}
    componentDidMount() {}
  }
  
  class ComponentA extends Component {
    componentWillMount() {
      console.log('A组件即将被渲染');
    }
    componentDidMount() {
      console.log('A组件渲染完成');
    }
  }
  
  class ComponentB extends Component {
    componentWillMount() {
      console.log('B组件即将被渲染');
    }
    componentDidMount() {
      console.log('B组件渲染完成');
    }
  }
  

class Client {
    public static main(): void {
        const compA = new ComponentA();
        compA.setup();
      
        const compB = new ComponentB();
        compB.setup();
    }
}
Client.main()

// A组件即将被渲染
// A组件渲染完成
// B组件即将被渲染
// B组件渲染完成