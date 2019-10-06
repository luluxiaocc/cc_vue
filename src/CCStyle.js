// 内置class样式的初始化.
class CCStyle {
  constructor() {
   let typeList = this.typeList(),
       first = document.body.firstChild,
       style = document.createElement('style');
    // 把对象拼接为一个合理的css格式.
    for (let key in typeList) {
      style.innerText += `.cc_vue-${key}{${typeList[key]}}\n`;
    }
    document.body.insertBefore(style, first);
  }
  /**
   * @method class列表,以cc_vue-为首部.
   */
  typeList() {
    return {
      // 1: 控制元素内容上下左右居中的
      center: 'display:flex!important;justify-content:center!important;align-items:center!important;',
      // 2: 控制元素隐藏的.(这个要放在下面, 因为他怕被其他属性覆盖);
      hidden: 'display:none!important',
    };
  }
}

export default CCStyle;
