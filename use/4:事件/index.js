// 网络请求
import http from '../http/index';
function init() {
  let vm = new C({
    el: '#app',
    data: {
      n: 1,
    },
    methods:{
      add(...arg){
        console.log(arg)
        this.n++
      }
    }
  });
}

export default init;
