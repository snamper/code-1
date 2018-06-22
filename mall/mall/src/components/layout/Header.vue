<template>
<div class="header_common">
  <van-nav-bar :title="titleName"  left-arrow @click-left="routergo"/>
</div>
</template>

<script>
export default {
  name: 'headers',
  data () {
    return {
      titleName: this.$route.name // default
    }
  },
  methods: {
    routergo: function () {
      this.$router.back(-1)
    }
  },
  watch: {
    '$route': function () {
      this.titleName = this.$route.name
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.header_common{
  // height: .748rem;
  height: 7vh;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 200;
  .van-nav-bar{
    height: .748rem;
    line-height: 0.748rem;
    position: relative;
  }
  .van-nav-bar__title {
    color: #282828;
    font-size: .278rem;
  }
  .van-nav-bar .van-icon{
    color: #282828;
  }
  .header_navinoc {
   position: absolute;
   left: .17rem;
   top: 50%;
   transform: translateY(-50%);
   display: inline-block;
   width: .34rem;
   height: .34rem;
  }
}
</style>
