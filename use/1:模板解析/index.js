
function init(){
  new C({
    el: '#app',
    data: {
      title: '努力学习',
      ary: [1, 2, 3],
      obj: {
        name: '金毛',
        type: ['幼年期', '成熟期', '完全体']
      },
      fn() {
        return '大家好我是: ' + this.obj.name;
      }
    }
  });
}

export default init;
