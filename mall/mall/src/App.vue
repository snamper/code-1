<template>
  <div id="app">
     <!-- <keep-alive>
      <router-view />
     </keep-alive> -->
     <keep-alive>
          <router-view v-if="keepAlive"></router-view>
     </keep-alive>
     <router-view v-if="!keepAlive"></router-view>
  </div>
</template>

<script>
import Router from 'vue-router'
export default {
  name: 'App',
  data () {
    return {
      keepAlive: false // default
    }
  },
  created: function () {
    // console.log(route)
  },
  watch: {
    '$route': function () {
      this.keepAlive = this.$route.meta.keepAlive
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background: #fff; */
}
</style>
