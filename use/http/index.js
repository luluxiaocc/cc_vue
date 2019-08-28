// 自己封装的请求模块
const interceptorsList = {};
class C_http {
  constructor() {
    let request = new XMLHttpRequest();
    request.timeout = 5000;
    request.responseType = 'json';
    request.ontimeout = this.ontimeout;
    this.request = request;
  }
  handleReadyStateChange() { 
    // 这个需要在open之后写
    this.request.setRequestHeader(
      'content-type',
      'application/json;charset=utf-8'
    );
    return new Promise((resolve) => {
      this.request.onreadystatechange = () => {
        if (this.request.readyState === 4) {
          if (this.request.status === 200) {
            resolve(this.request.response);
          }
        }
      };
      this.send();
    });
  }
  send() {
    for (let i in interceptorsList) {
      interceptorsList[i](this);
    }
    this.request.send(JSON.stringify(this.data));
  }
  ontimeout() {
    throw new Error('超时了,快检查一下');
  }
  abort() {
    // 个人认为取消真的没啥用
    this.request.abort();
  }
}
// 顾名思义, get请求
function get(path, data) {
  let c_http = new C_http();
  let str = '?';
  for (let i in data) {
    str += `${i}=${data[i]}&`;
  }
  if (str.charAt(str.length - 1) === '&') {
    str = str.slice(0, -1);
  }
  path = str === '?' ? path : `${path}${str}`;
  c_http.request.open('GET', path);
  return c_http.handleReadyStateChange();
}
// 顾名思义, post请求
function post(path, data) {
  let c_http = new C_http();
  c_http.request.open('POST', path);
  c_http.data = data;
  return c_http.handleReadyStateChange();
}
function interceptors(cb, type) {
  if (type === 'remove') {
    delete interceptorsList[cb];
  } else if (typeof cb === 'function') {
    interceptorsList[cb] = cb;
  }
}
export default {
  get,
  post,
  interceptors
};
