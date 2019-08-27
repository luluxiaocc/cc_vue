function init() {
  let vm = new C({
    el: '#app',
    data: {
      n: 1,
      m: 2
    }
  });
  setInterval(() => {
    vm.n += 1;
  }, 1000);
}

export default init;
