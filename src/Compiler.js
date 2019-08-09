class Compiler {
  constructor(el = '#app', vm) {
    this.vm = vm;
    // 1: 拿到真正的dom
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    // 2: 制作文档碎片
    let fragment = this.node2fragment(this.el);

    // 最后一步: 处理完再放回去
    this.el.appendChild(fragment);
  }
  isElementNode(node){
    return node.nodeType === 1;
  }
  node2fragment(node) {
    let firstChild,
        fragment = document.createDocumentFragment();
    while (firstChild = node.firstChild) {
      fragment.appendChild(firstChild);
    }
    return fragment;
  }
}


export default Compiler;