// 代码中心类
import '../public/css/index.css';
import Compiler from './Compiler.js';
class C {
  constructor(options) {
    // 1: 不管你传啥, 我都放进来, 方便以后的扩展;
    for (let key in options) {
      this['$' + key] = options[key];
    }
    console.log(2)
    // end: 没有挂载元素vue不让你玩, 但是我让你玩😼, 里面处理的时候, 会给$el一个默认的#app;
    new Compiler(this.$el, this);
  }
}

window.C = C;
