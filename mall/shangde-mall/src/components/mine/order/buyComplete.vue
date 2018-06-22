<template>
  <div class="buy_complete_content">
   <div class="header">
    <van-nav-bar title="购买成功"  left-arrow @click-left="routergo" right-text='完成' @click-right="onClickRight" />
   </div>
   <div class="buy_main">
     <div class="buy_shop">
       <div class="buy_shop_top">
         <div class="buy_shop_topMain">
           <img class="pageBg" :src="pageBg" alt="">
           <div class="pageCardBox">
            <div class="name">
              <img :src="goodsImg">
              <span>{{goodsTitle}}</span>
            </div>
            <img src="./../../../assets/mine/buySuccess.png" class="buy_success_img">
            <div class="buy_success">购买成功</div>
            <div class="buy_bottom">兑换码已经存入卡包，进入我的卡包查看或者兑换</div>
          </div>
         </div>
       </div>
       <div class="congratulations">恭喜您买到心仪的商品！邀请更多的好友一起赚动吧~</div>
       <router-link to='/cardBag'><div class="go_card">我的卡包</div></router-link>
       <!-- <div class="explain">
         <div class="title">兑换说明: </div>
         <ul class="explain_detail">
          <li>{{instructions}}</li>
         </ul>
       </div> -->
     </div>
   </div>
  </div>
</template>

<script>
import './buyComplete.less'
import pageBg from '@/assets/mine/buyBg.png'
export default {
  name: 'hart',
  data () {
    return {
      pageBg: pageBg,
      offset: Number(0),
      goodsImg: '',
      goodsTitle: '',
      instructions:'',
      product_id:''
    }
  },
  methods: {
    routergo: function () {
      this.$router.push({path: '/goodDetail', query: {id:this.product_id}})
    },
    onClickRight () {
      this.$router.push({path:'/index'})
    }
  },
  created () {
    let _this = this
    let orderId = String(this.$route.query.id) ? String(this.$route.query.id) : '1756' //当前商品的id
    this.$store.dispatch('commonService',{"apid": 123,//订单详情调用
        params: {// 需要传的参数集合
          orderId: orderId
      }})
    .then((result) => {
      // console.log(result)
      if(  result.apidata.code != 1){
        Toast(result.apidata.message)
        return;
      }
      // conole.log(result.apidata.data.image_url)
      _this.goodsImg = result.apidata.data.image_url// 赋值商品LOGO
      _this.goodsTitle = result.apidata.data.full_name// 赋值商品名字
      _this.instructions = result.apidata.data.detail_desc
      _this.product_id = result.apidata.data.product_id
      // _this.status = result.apidata.data.status
      // console.log(_this.status,"111")
    })
    .catch((error) => {

    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>

</style>
