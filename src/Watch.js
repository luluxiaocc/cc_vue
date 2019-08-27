// 观察者模式与订阅发布模式的一种结合
import CompileUtil from './CompileUtil';
// 1. 订阅发布
export class Dep {
  constructor() {
    this.subs = [];
  }
  /**
   * @method 添加进订阅队列.
   */
  addSub(w) {
    this.subs.push(w);
  }
  /**
   * @method 发布信息,通知所有订阅者.
   */
  notify() {
    this.subs.forEach(w => w.update());
  }
}
// 2.观察者
export class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    this.oldValue = this.getOld();
  }
  /**
   * @method 只有第一次的取值会调用他,对老值的记录,以及被订阅.
   */
  getOld() {
    Dep.target = this;
    let value = CompileUtil.getVal(this.vm, this.expr.trim());
    Dep.target = null;
    return value;
  }
  /**
   * @method 更新值.
   */
  update() {
    let newVal = CompileUtil.getVal(this.vm, this.expr.trim());
    if (newVal !== this.oldValue) {
    //   this.cb(newVal);
    this.cb();
    }
  }
}
