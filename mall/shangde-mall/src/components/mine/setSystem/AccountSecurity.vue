<template>
  <div class="order_content_mainL">
  <router-link to="/editPwd">
   <van-cell value="修改登录密码" class="hart" :center="center" :border="border">
      <div slot="right-icon" class="hart_more"><van-icon name="arrow" /></div>
    </van-cell>
    </router-link>
    <router-link to="/editTransactionPwd">
   <van-cell value="修改交易密码" class="hart" :center="center" :border="border">
      <div slot="right-icon" class="hart_more"><van-icon name="arrow" /></div>
    </van-cell>
    </router-link>
  </div>
</template>
<script>
import {Dialog, Toast} from 'vant'
/* 系统设置 */
export default {
  name: 'sysConfig',
  data () {
    return {
      productId: '',//订单内商品的ID
      center:Boolean(true),
      border:Boolean(true)
    }
  },
  methods: {
    routergo: function () {
      this.$router.back(-1)
    }
	},
  mounted() {
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.order_content_mainL{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  top: 0.748rem;
  bottom: 0;
  font-size: 0.2rem;
  .hart{
    border-bottom: 1px solid #e5e5e5;
  }
  [class*=van-hairline]::after {
    border: none;
  }
}
</style>
