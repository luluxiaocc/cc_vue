//
import CompileUtil from './CompileUtil';
class Compiler {
  constructor(el = '#app', vm) {
    this.vm = vm;
    // 1: 拿到真正的dom
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    // 2: 制作文档碎片
    let fragment = this.node2fragment(this.el);
    // 3: 解析元素, 文档流也是对象
    this.compile(fragment);

    // 最后一步: 处理完再放回去
    this.el.appendChild(fragment);
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
    [...childNodes].map(child => {
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
    // 先解析出指令吧

  }
  /**
   * @method 处理文本节点
   * @param { node } 想要遍历的节点对象
   */
  compileText(node) {
    let content = node.textContent;
    if (/\{\{.+?\}\}/.test(content)) {
      CompileUtil.text(node, content, this.vm);
    }
  }
}

export default Compiler;
