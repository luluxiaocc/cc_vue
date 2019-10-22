<template>
  <div class="box">
    <button c-on:click='addn'> n++</button>
    <p>n:{{n}}</p>
  </div>
</template>
<script>
export default {
  el: "#app",
  data: {
    n: 1
  },
  methods: {
    addn() {
      this.n++;
    }
  },
  watch: {
    n(newVal, oldVal) {
      console.log("我被触发了", newVal, oldVal);
    }
  }
};
</script>
