// 工具方法
// vue 开启严格模式, 不支持with!!!!!!
// with会导致变量泄漏到全局, 因为他没有var 与 let关键字, 所以会被默认提升
import { Watcher } from './Watch';
// 这个是更新内容的对象集合
const updater = {
  /**
   * @method 更新文本信息
   * @param { node } 更新谁
   * @param { value } 新的值
   */
  textUpdater(node, value) {
    node.textContent = value;
  },
  /**
   * @method 新增class
   * @param { node } 更新谁
   */
  addClass(node, name) {
    node.classList.add(`cc_vue-${name}`);
  },
  /**
   * @method 移除class
   * @param { node } 更新谁
   */
  removeClass(node, name) {
    node.classList.remove(`cc_vue-${name}`);
  },
  /**
   * @method 索性直接让他来控制三元就完事了
   */
  doClass(val, node, name) {
    val ? this.removeClass(node, name) : this.addClass(node, name);
  }
};
const CompileUtil = {
  /**
   * @method 处理文本节点
   * @param { node } 想要遍历的节点对象
   */
  text(node, expr, vm) {
    let content = expr.replace(/\{\{(.+?)\}\}/g, ($0, $1) => {
      new Watcher(vm, $1, () => {
        updater.textUpdater(node, this.getContentValue(vm, expr));
      });
      return this.getVal(vm, $1);
    });
    updater.textUpdater(node, content);
  },
  /**
   * @method 根据value取得对应值
   * @param { vm } 框架实例
   * @param { expression } 要执行的表达式或变量
   * 这个获取应该分为两步: (可能要到10月末做了);
   * 第一步: 做一个取值的'池', 实时更新这个'池'.
   * 第二步: 从这个池的环境里面, 运行我们的语句来获取到真正的值.
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
  /**
   * @method 处理复合型的文本内容例如:{{n}}--{{m}}
   * @param { vm } 框架实例
   * @param { expr } 要执行的表达式或变量
   */
  getContentValue(vm, expr) {
    return expr.replace(/\{\{(.+?)\}\}/g, ($0, $1) =>
      this.getVal(vm, $1.trim())
    );
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
    // 源码的show是先保存标签上的display属性, 如果没有就不保存
    // 然后通过添加none与 移除none来做到的隐藏
    show(vm, node, value, expr) {
      updater.doClass(value, node, 'hidden');
      new Watcher(vm, expr, (old, newVale) => {
        updater.doClass(newVale, node, 'hidden');
      });
    },
    center(vm, node, value, expr) {
      updater.doClass(value, node, 'center');
      new Watcher(vm, expr, (old, newVale) => {
        updater.doClass(value, node, 'center');
      });
    }
  },
  // 专门处理事件
  // list 就是原生事件名列表, 绑定原生函数用handler
  eventHandler: {
    list: [
      'blur',
      'focus',
      'click',
      'mouseup',
      'dblClick',
      'mousemove',
      'mousedown'
    ],
    /**
     * @method 绑定原生事件的处理函数
     * @param { eventName } 事件名例如: click 
     * @param { vm } 框架实例
     * @param { node } 元素
     * @param { type } 执行的函数的名称
     */
    handler(eventName, vm, node, type) {
      if (/\(.*\)/.test(type)) {
        let str = /\((.*)\)/.exec(type)[1];
        str = str.replace(/\s/g, '');
        type = type.split('(')[0];
        if (str) {
          let arg = str.split(',');
          node.addEventListener( eventName,  e => {
            for (let i = 0; i < arg.length; i++) {
              // 这样就做到了$event的映射关系
              arg[i] === '$event' && (arg[i] = e);
            }
            vm[type].apply(vm, arg);
          }, false );
          return;
        }
      }
      // 不带括号的直接挂就行了
      node.addEventListener( eventName, () => {
          vm[type].call(vm);
        }, false );
    }
  }
};

export default CompileUtil;
