<template>
  <div class='wrap'>
     <iframe class="iframe"  src="https://uat.mobile.eratpay.com/appMsg/sdServiceCenter.html" frameborder="0"></iframe>
  </div>
</template>
<script>
export default {
  name: 'ServiceCenter'
}
</script>
<style lang='less' scoped>
.wrap {
  width:100%;
  position: absolute;
  left:0;
  top:.748rem;
  height:100%;
  .iframe{
    width:100%;
	height:100%;
  }
}
</style>
