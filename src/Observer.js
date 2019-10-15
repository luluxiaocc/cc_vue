// 数据劫持
import { Dep } from './Watch';
// 写在这里有些丑, 等以后工具类多了就单独抽出去一个;
let toString = Object.prototype.toString;
// 具体的劫持类
class Observer {
  constructor(vm, data) {
    this.vm = vm;
    vm.$data = this.observer(data, true);
  }
  /**
   * @method 遍历出需要观察的对象
   * @param { data } 要观察的对象
   */
  observer(data, init = false) {
    let type = toString.call(data),
      $data = this.defineReactive(data, init);
    if (type === '[object Object]') {
      for (let item in data) {
        data[item] = this.defineReactive(data[item]);
      }
    } else if (type === '[object Array]') {
      let len = data.length;
      for (let i; i < len; i++) {
        data[i] = this.defineReactive(data[i]);
      }
    }
    return $data;
  }
  /**
   * @method 针对对象进行观察
   * @param { data } 要观察的对象
   */
  defineReactive(data, init) {
    let type = toString.call(data);
    if (type !== '[object Object]' && type !== '[object Array]') return data;
    let _this = this,
      dep = new Dep();
    return new Proxy(data, {
      get(target, key) {
        Dep.target && dep.addSub(Dep.target);
        return target[key];
      },
      set(target, key, value) {
        if (target[key] !== value) {
          if (init) {
            // 对data的数据进行watch处理
            (_this.vm.$watch || {})[key] &&
              _this.vm.$watch[key].call(_this, value, target[key]);
          }
          target[key] = _this.observer(value);
          dep.notify();
        }
        return value;
      }
    });
  }
}

export default Observer;
