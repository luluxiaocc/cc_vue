// 解析模板系列节目
import CompileUtil from './CompileUtil';

// 专门用来顶替if语句的
// 模拟koa2的写法, 进行 
class HandlerStarts {
  constructor() {
    this.list = [];
  }
  add(type, name) {
    this.list.push({ type, name });
  }
  search(attrName) {
    let result = {},
      list = this.list;
    for (let i = 0, len = list.length; i < len; i++) {
      let { name, type } = list[i];
      if (attrName.startsWith(name)) {
        result = {
          type,
          attrName: attrName.split(name)[1]
        };
        break;
      }
    }
    return result;
  }
}

let handlerStarts = new HandlerStarts();

handlerStarts.add('事件', 'c-on:');
handlerStarts.add('指令', 'c-');
handlerStarts.add('变量', ':');
handlerStarts.add('事件', '@');

class Compiler {
  constructor(el = '#app', vm) {
    this.vm = vm;
    // 1: 拿到真正的dom
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    // 2: 制作文档碎片
    let fragment = this.node2fragment(this.el);
    // 3: 解析元素, 文档流也是对象
    this.compile(fragment);
    // 4: 进行生命周期函数, 他真的一点都不高大上
    vm.$created && vm.$created.call(vm);

    // 最后一步: 处理完再放回去
    this.el.appendChild(fragment);
    // 调用声明周期钩子
    vm.$mounted && vm.$mounted.call(vm);
  }
  /**
   * @method 判断是不是元素节点
   * @param { node } 要判断的节点
   * @return { boolean } 是否为标签节点, 文本节点为3
   */
  isElementNode(node) {
    return node.nodeType === 1;
  }
  /**
   * @method 判断是不是文本节点
   * @param { node } 要判断的节点
   * @return { boolean } 是否为标签节点, 文本节点为3
   */
  isTextNode(node) {
    return node.nodeType === 3;
  }
  /**
   * @method 把节点全部放入文档流里面
   * @param { node } 想要遍历的节点对象
   * @return { fragment } 返回生成的文档流
   */
  node2fragment(node) {
    let fragment = document.createDocumentFragment();
    while (node.firstChild) {
      fragment.appendChild(node.firstChild);
    }
    return fragment;
  }
  /**
   * @method 把节点分门别类,交给对应的函数处理
   * @param { node } 想要遍历的节点对象
   */
  compile(node) {
    let childNodes = node.childNodes;
    childNodes.forEach(child => {
      if (this.isElementNode(child)) {
        this.compileElement(child);
        this.compile(child);
      } else if (this.isTextNode(child)) {
        this.compileText(child);
      }
    });
  }
  /**
   * @method 处理元素节点
   * @param { node } 想要遍历的节点对象
   */
  compileElement(node) {
    // 第一步: 解析出指令吧
    let attributes = node.attributes;
    [...attributes].forEach(attr => {
      let name = attr.name,
        value = attr.value,
        obj = this.isDirective(name);
      if (obj.type === '指令') {
        // 第二步: 有这个指令才执行, 没有就不管他了.
        let dir = CompileUtil.dir[obj.attrName];
        dir && dir(this.vm, node, CompileUtil.getVal(this.vm, value), value);
      } else if (obj.type === '事件') {
        // 第二步: 解析各种事件.
        // 当前只处理了原生事件;
        if (CompileUtil.eventHandler.list.includes(obj.attrName)) {
          CompileUtil.eventHandler.handler(obj.attrName, this.vm, node, value);
        } else {
          // eventHandler[obj.attrName] 这个事件不是原生挂载事件, 不能用handler 处理
          // 比如说, 监听子组件的$emit事件
        }
      }
    });
  }
  /**
   * @method 处理文本节点
   * @param { node } 想要遍历的节点对象
   */
  compileText(node) {
    let content = node.textContent;
    content = content.replace(/\s/g, '');
    if (/\{\{.+?\}\}/.test(content)) {
      CompileUtil.text(node, content, this.vm);
    }
  }
  // 是什么指令
  isDirective(attrName) {
    // if (attrName.startsWith('c-on:')) {
    //   return { type: '事件', attrName: attrName.split('c-on:')[1] };
    // }
    // if (attrName.startsWith('c-')) {
    //   return { type: '指令', attrName: attrName.split('c-')[1] };
    // }
    // if (attrName.startsWith(':')) {
    //   return { type: '变量', attrName: attrName.split(':')[1] };
    // }
    // if (attrName.startsWith('@')) {
    //   return { type: '事件', attrName: attrName.split('@')[1] };
    // }
    // return {};
    //  console.log(handlerStarts.search(attrName))
    return handlerStarts.search(attrName);
  }
}

export default Compiler;
