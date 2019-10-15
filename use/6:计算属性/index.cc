<template>
  <div class="box">
    <button v-on:click='addn'> n++</button>
    <button v-on:click='addm'> m++</button>
    <p>n: {{n}}</p>
    <p>m: {{m}}</p>
    <p>x: {{x}}</p>
    <p>n+m+x: {{v}}</p>
    <p>v+v: {{v+v}}</p>
  </div>
</template>
<script>
export default {
  data: {
    n: 1,
    m: 1,
    x: 1
  },
  methods: {
    addn() {
      this.n++;
      console.log(this.v)
    },
    addm() {
      this.m++;
    }
  },
  computed: {
    v() {
      return this.n + this.m + this.x;
    }
  }
};
</script>
