// 工具方法
// vue 开启严格模式, 不支持with!!!!!!
// with会导致变量泄漏到全局, 因为他没有var 与 let关键字, 所以会被默认提升
import {Watcher, Dep} from './Watch';
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
      // data下期做代理, 并且去掉原型上的属性
      let item = vm.$data[i];
      if (typeof item === 'function') {
        __whoToVar += `function ${i}(...arg){return vm['${i}'].call(vm,...arg)}`;
      } else {
        __whoToVar += `let ${i}=vm['${i}'];`;
      }
    }
    __whoToVar = `${__whoToVar}result=${expression}`;
    eval(__whoToVar);
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
  }
};

export default CompileUtil;
