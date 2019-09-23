// 解析模板系列节目
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
    let attributes = node.attributes;
    [...attributes].map(attr => {
      let name = attr.name,
        value = attr.value,
        obj = this.isDirective(name);
      if (obj.type === '指令') {
        CompileUtil.dir[obj.attrName] &&
          CompileUtil.dir[obj.attrName](
            this.vm,
            node,
            CompileUtil.getVal(this.vm, value),
            value
          );
      } else if (obj.type === '事件') {
        // 当前只处理了原生事件;
        if(CompileUtil.eventHandler.list.includes(obj.attrName)){
         CompileUtil.eventHandler.handler(obj.attrName,this.vm, node, value);
        }else{
          // eventHandler[obj.attrName] 这个事件不是原生挂载事件, 不能用handler 处理
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
    content = content.replace(/\s/g,'');
    if (/\{\{.+?\}\}/.test(content)) {
      CompileUtil.text(node, content, this.vm);
    }
  }
  // 是什么指令
  isDirective(attrName) {
    if (attrName.startsWith('c-')) {
      return { type: '指令', attrName: attrName.split('c-')[1] };
    } else if (attrName.startsWith(':')) {
      return { type: '变量', attrName: attrName.split(':')[1] };
    } else if (attrName.startsWith('v-on:')) {
      return { type: '事件', attrName: attrName.split('v-on:')[1] };
    } else if (attrName.startsWith('@')) {
      return { type: '事件', attrName: attrName.split('@')[1] };
    }
    return {};
  }
}

export default Compiler;
