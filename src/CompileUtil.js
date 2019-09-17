// 工具方法
// vue 开启严格模式, 不支持with!!!!!!
// with会导致变量泄漏到全局, 因为他没有var 与 let关键字, 所以会被默认提升
import { Watcher } from './Watch';

const CompileUtil = {
  /**
   * @method 处理文本节点
   * @param { node } 想要遍历的节点对象
   */
  text(node, expr, vm) {
    let content = expr.replace(/\{\{(.+?)\}\}/g, ($0, $1) => {
      new Watcher(vm, $1, () => {
        this.updater.textUpdater(node, this.getContentValue(vm, expr));
      });

      return this.getVal(vm, $1);
    });
    this.updater.textUpdater(node, content);
  },
  /**
   * @method 根据value取得对应值
   * @param { vm } 框架实例
   * @param { expression } 要执行的表达式或变量
   */
  getVal(vm, expression) {
    let result,
      __whoToVar = '';
    for (let i in vm.$data) {
      // data下期做代理, 不用去掉原型上的属性
      __whoToVar += `let ${i} = vm['${i}'];`;
    }
    if (/cc_cb/.test(expression)) {
      __whoToVar = `let _res;function cc_cb(v){ _res = v;}${__whoToVar}${expression};return _res`;
    } else {
      __whoToVar = `${__whoToVar} return ${expression}`;
    }
    result = new Function('vm', __whoToVar)(vm);
    return result;
  },
  getContentValue(vm, expr) {
    return expr.replace(/\{\{(.+?)\}\}/g, ($0, $1) => {
      $1 = $1.trim();
      return this.getVal(vm, $1);
    });
  },
  /**
   * @method 更新方法大集合
   */
  updater: {
    /**
     * @method 更新文本信息
     * @param { node } 更新谁
     * @param { value } 新的值
     */
    textUpdater(node, value) {
      node.textContent = value;
    }
  },
  // 专门放指令的对象
  dir: {
    // 这个指令也就那样吧, 没感觉太精髓
    html(vm, node, value, expr) {
      node.innerHTML = value;
      new Watcher(vm, expr, (old, newVale) => {
        node.innerHTML = newVale;
      });
    },
    // 思想很重要, 当然只是我自己想的.
    show(vm, node, value, expr) {
      value
        ? node.classList.remove('cc_vue-hidden')
        : node.classList.add('cc_vue-hidden');
      new Watcher(vm, expr, (old, newVale) => {
        newVale
          ? node.classList.remove('cc_vue-hidden')
          : node.classList.add('cc_vue-hidden');
      });
    }
  }
};

export default CompileUtil;
