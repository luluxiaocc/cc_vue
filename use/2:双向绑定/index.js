// 网络请求
import http from '../http/index';
function init() {
  let vm = new C({
    el: '#app',
    data: {
      n: [1, 2, 3],
      m: 2,
      http: '等待中'
    }
  });
  function cb(request) {
    // console.log('第一次处理', request);
  }
  http.interceptors(cb);
  // http.interceptors(cb,'remove')
  http.get('http://localhost:9998/', { name: 'lulu', age: '23' }).then(data => {
    // vm.n[1] += 1;
    vm.http = data.data;
    setTimeout(()=>{
      console.log('改变length');
     vm.n.length = 1
    },1000)
    setTimeout(()=>{
      vm.n.push('2')
    },2000)
  });

  http.post('http://localhost:9998/', { name: 'cc' }).then(data => {
    // console.log('获取到了post:', data);
  });
}

export default init;
