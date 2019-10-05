// 固定样式初始化
class CCStyle {
  constructor() {
    let first = document.body.firstChild,
      style = document.createElement('style'),
      typeList = this.typeList();
    for (let key in typeList) {
      style.innerText += `.${key}{${typeList[key]}}\n`;
    }
    document.body.insertBefore(style, first);
  }
  typeList() {
    return {
      // 1: 控制元素隐藏的
      'cc_vue-hidden': 'display:none!important',

      // 2: 控制元素内容上下左右居中的
      'cc_vue-center':'display:flex!important;justify-content:center!important;align-items:center!important;'
    };
  }
}

export default CCStyle;
