// 网络请求
import http from '../http/index';
function init() {
  let vm = new C({
    el: '#app',
    data: {
      n: 3,
      s:false,
      name:'ccc',
      add(){return 16},
      dom:'<p>我是p</p>'
    }
  });

  setInterval(()=>{
    vm.s = !vm.s;
  },1000)
}

export default init;
