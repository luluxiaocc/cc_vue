import '../public/css/index.css';
import CCStyle from './CCStyle.js';
import Compiler from './Compiler.js';
import Observer from './Observer.js';

// import init from '../use/1:模板解析/index.js';
// import init from '../use/2:双向绑定/index.js';
// import init from '../use/3:指令/index.js';
// import init from '../use/4:事件/index.js';
// import component from '../use/5:loader相助/index.cc';
// import component from '../use/6:计算属性/index.cc';
import component from '../use/7:观察者/index.cc';

class C {
  constructor(options) {
    // 1: 不管你传啥, 我都放进来, 方便以后的扩展;
    for (let key in options) {
      this['$' + key] = options[key];
    }

    // 2: 头部插入css样式
    new CCStyle();

    // 3: 劫持data上面的操作
    new Observer(this, this.$data);

    // 4: 把$data代理到vm身上, 用户可以直接this.xxx获取到值
    this.proxyVm(this.$data);

    // 5: 把$methods代理到vm身上
    this.proxyVm(this.$methods, true);

    // 6: 把$computed代理到vm身上
    this.proxyVm(this.$computed, true, true);

    // end: 没有挂载元素vue不让你玩, 但是我让你玩😼, 里面处理的时候, 会给$el一个默认的#app;
    new Compiler(this.$el, this);
  }
  /**
   * @method 把某个对象的值, 代理到目标对象上
   * @param { data } 想要被代理的对象
   * @param { noRepeat } 是否检测重复数据
   * @param { f } 属性是否为函数类型
   */
  proxyVm(data = {}, noRepeat, f) {
    let target = this;
    for (let key in data) {
      if (noRepeat && target[key]) {
        // 防止data里面的变量名与其他属性重复
        throw Error(`变量名${key}重复`);
      }
      Reflect.defineProperty(target, key, {
        enumerable: true, // 描述属性是否会出现在for in 或者 Object.keys()的遍历中
        configurable: true, // 描述属性是否配置，以及可否删除
        get() {
          // 计算属性上的值肯定是函数啊
          return f ? data[key].call(target) : Reflect.get(data, key);
        },
        set(newVal) {
          if (newVal !== data[key]) {
            Reflect.set(data, key, newVal);
          }
        }
      });
    }
  }
}

new C(component);

// init();
// 还没有写绑定, 所以暂时不使用
// if (module.hot) {
//   module.hot.accept('../use/5:loader相助/index.cc', function() {
//
//   });
// }
