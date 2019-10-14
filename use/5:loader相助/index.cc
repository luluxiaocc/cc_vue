<template>
  <div class="box"
       v-on:click='add'>
    <span>{{n}}</span>
  </div>
</template>
<script>
console.log('此处也可执行代码');
export default {
  el: "#app",
  data: {
    n: 2
  },
  methods: {
    add() {
      this.n++;
    }
  },
  created() {
    let d = document.getElementsByClassName("box");
    console.log("created", this.n, d);
  },
  mounted() {
    let d = document.getElementsByClassName("box");
    console.log("mounted", this.n, d);
  }
};
</script>
<style>
.box {
  border: 1px solid;
  height: 600px;
}
</style>