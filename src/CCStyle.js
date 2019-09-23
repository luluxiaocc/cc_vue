// 固定样式初始化
class CCStyle {
  constructor() {
    let first = document.body.firstChild,
        style = document.createElement('style');
    style.innerText='.cc_vue-hidden{display:noneimportant}';
    document.body.insertBefore(style, first);
  }
}

export default CCStyle;
