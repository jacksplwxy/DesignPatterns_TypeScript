//ES6 Proxy实例：https://www.w3cplus.com/javascript/use-cases-for-es6-proxies.html




·远程代理:为一个对象在不同的地址空间提供局部代表，延迟获取远程对象
class RemoteResource {
  getContent(): string {
    return '读取远程文件内容';
  }
}
class RemoteRecourceProxy {
  getContent() {
    const resource = this.request();
    return resource.getContent();
  }

  request(): RemoteResource {
    console.log('千辛万苦从远程拿到了文件')
    return new RemoteResource();
  }
}
function remoteProxyDemo() {
  const resource = new RemoteRecourceProxy();
  const content = resource.getContent();
  console.log(content);
}
remoteProxyDemo();


·虚代理：如果需要创建一个资源消耗较大的对象，先创建一个消耗相对较小的对象，真实对象只在需要时才会被真正创建。
  // 大图片，绘制会消耗较多资源
  class BigImage {
    private name: string;
    constructor(name: string) {
      this.name = name;
      this.draw();
    }
    // 绘制
    draw(): void {
      console.log('绘制 ${this.name}，需要消耗大量资源');
    }
    // 预览
    preview(): void {
      console.log(`展示 ${this.name} 的预览效果`);
    }
    getName(): string {
      return this.name;
    }
  }
  class VirutalBigImageProxy {
    private image: BigImage;
    private name: string;
    // 虚代理先创建一个大图片的代理，而不真正创建实际对象
    constructor(name: string) {
      this.name = name;
    }
    // 只有在要预览时，才真正绘制图像
    preview(): void {
      if (!this.image) {
        this.image = new BigImage(this.name);
      }
      this.image.preview();
    }
    getName(): string {
      if (!this.image) {
        console.log('返回虚代理里保存的名称');
        return this.name;
      }
      console.log('实际图片已经被创建，返回实际图片的名称');
      return this.image.getName();
    }
  }
  function virutalProxyDemo() {
    const image1 = new VirutalBigImageProxy('图1');
    const image2 = new VirutalBigImageProxy('图2');
    // 读取图1的名称，此时不需要真正绘制大图片，只需要返回虚代理里存储的数据即可，减小开销
    console.log(image1.getName());
    // 只有在真正需要使用大图片时，才创建大图片对象
    image2.preview();
  }
  virutalProxyDemo();

·保护代理：控制对原始对象的访问，保护代理用户对象应该有不同的访问权限的时候。
  class SecretDoc {
    read(): string {
      return '机密文件内容';
    }
  }
  class ProtectionSecretDocProxy {
    private name: string;
    private  doc: SecretDoc;
    constructor(name: string) {
      this.name = name;
      this.doc = new SecretDoc();
    }
    // 提供相同的方法名，但是加了权限控制的代码
    read(): string {
      if (this.name === '远峰') {
        const content = this.doc.read();
        return content;
      }
      return '';
    }
  }
  function protectionProxyDemo() {
    const doc1 = new ProtectionSecretDocProxy('远峰');
    console.log(`远峰读出了: ${doc1.read()}`);
    const doc2 = new ProtectionSecretDocProxy('其他人');
    console.log(`其他人读出了: ${doc2.read()}`);
  }
  protectionProxyDemo();


·智能代理：在访问对象时执行一些附加的操作。
class Resource {
  content: string;
  constructor(content: string) {
    this.content = content;
  }
  read(): string {
    return this.content;
  }
  write(content: string): Promise<null> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.content = content;
        resolve();
      }, 1000);
    })
  }
}

// 智能代理，多了一个是否上锁的属性，以及相关对锁的操作
class SmartResourceProxy {
  lock: boolean;
  resource: Resource;
  constructor() {
    this.resource = new Resource('文件内容');
  }
  read(): string|Error {
    if (this.lock) { return new Error('别人正在写'); }
    console.log('正在读');
    return this.resource.read();
  }
  write(content: string) {
    console.log('正在写')
    this.lock = true;
    this.resource.write(content)
      .then(() => {
        this.lock = false;
      });
  }
}
function smartProxyDemo() {
  const resource = new SmartResourceProxy();
  // 能读到内容
  console.log(resource.read());

  resource.write('新的文件内容');
  // 由于别人正在写，读不到内容
  try {
    resource.read();
  } catch (e) {
    console.error(e);
  }
}
smartProxyDemo();

