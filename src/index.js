// import init from '../use/1:模板解析/index.js';
import '../public/css/index.css';
import init from '../use/2:双向绑定/index.js';
import Compiler from './Compiler.js';
import Observer from './Observer.js';

class C {
  constructor(options) {
    // 1: 不管你传啥, 我都放进来, 方便以后的扩展;
    for (let key in options) {
      this['$' + key] = options[key];
    }

    // 2: 劫持data上面的操作
    new Observer(this,this.$data);

    // 3: 把$data挂在vm身上, 用户可以直接this.xxx获取到值
    this.proxyVm(this.$data);

    // end: 没有挂载元素vue不让你玩, 但是我让你玩😼, 里面处理的时候, 会给$el一个默认的#app;
    new Compiler(this.$el, this);
  }
   /**
   * @method 把某个对象的值, 代理到目标对象上
   * @param { data } 想要被代理的对象
   * @param { target } 代理到谁身上
   */
  proxyVm(data = {}, target = this) {
    for (let key in data) {
      Reflect.defineProperty(target, key, {
        enumerable: true, // 描述属性是否会出现在for in 或者 Object.keys()的遍历中
        configurable: true, // 描述属性是否配置，以及可否删除
        get() {
          return Reflect.get(data,key)
        },
        set(newVal) {
          if (newVal !== data[key]) {
            Reflect.set(data,key,newVal)
          }
        }
      });
    }
  }
}

window.C = C;
init();

// 还没有写绑定, 所以暂时不使用
// if (module.hot) {
//   module.hot.accept('../use/1:模板解析/index.js', function() {
//     let init = require('../use/1:模板解析/index.js');
//     init();
//   });
// }
