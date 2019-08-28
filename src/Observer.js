// 数据劫持
import { Dep } from './Watch';
class Observer {
  constructor(data) {
    this.data = data;
    this.observer(data);
  }
  /**
   * @method 针对对象进行观察
   * @param { data } 要观察的对象
   */
  observer(data) {
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      for (let key in data) {
        this.defineReactive(data, key, data[key]);
      }
    }
  }
  /**
   * @method 进行双向绑定,每个值以后的操作动作,都会反应到这里.
   * @param { obj } 要观察的对象
   * @param { key } 要观察的对象
   * @param { value } 要观察的对象
   */
  defineReactive(obj, key, value) {
    this.observer(obj[key]);
    let dep = new Dep();
    let _this = this;
    Object.defineProperty(obj, key, {
      configurable: true, // 可改变可删除
      enumerable: true, // 可枚举
      get() {
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set(newVal) {
        if (value !== newVal) {
          // 如果用户传进来的新值是个对象, 那就重新观察他
          _this.observer(newVal);
          value = newVal;
          dep.notify()
        }
      }
    });
  }
}

export default Observer;
