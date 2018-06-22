<template>
  <!-- 兑换结果页面 -->
  <div class="goodsConvert_content">
   <div class="header">
    <van-nav-bar title="兑换结果"  left-arrow @click-left="routergo" right-text='完成' @click-right="onClickRight" />
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
            <div class="buy_success">{{status}}</div>
            <!-- <div class="buy_bottom">兑换码已经存入卡包，进入我的卡包查看或者兑换</div> -->
          </div>
         </div>
       </div>
       <div class="convertAccount">
        <span class="converBtn" @click="convertBtn(statusText)">{{statusText}}</span>
       </div>
     </div>
   </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import pageBg from '@/assets/mine/buyBg.png'
import './goodsConvert.less'
export default {
  name: 'goodsConvert',
  data () {
    return {
      pageBg: pageBg,
      goodsImg: '',//商品图片
      goodsTitle: '',//商品标题
      status: '',//兑换状态
      statusText: '',//兑换结果页面的按钮文案
    }
  },
  created () {
    let cardId = String(this.$route.query.cardId)
    // let cardId = String(this.$route.query.cardId) //当前卡包的id
    
    let _this = this

    this.$store.dispatch('commonService',{"apid": 117,//卡包详情调用
        params: {// 需要传的参数集合
          cardId: cardId
      }})
    .then((result) => {
      // console.log(result)
      if(  result.apidata.code != 1){
          Toast(result.apidata.message)
          return;
        }
      _this.goodsImg = result.apidata.data.image_url// 赋值商品LOGO
      _this.goodsTitle = result.apidata.data.productDetail.fullName// 赋值商品名字

      let $status = result.apidata.data.order.status//兑换的状态 -200 兑换失败 -3未兑换 -2 兑换异常  1兑换成功
      if($status == '-200'){
        _this.status = '兑换失败，积分已返回到我的积分'
        _this.statusText = '我的积分'
      }else if($status == '1'){
        _this.status = '兑换成功进入商家平台可直接使用也可进入我的卡包进行查看'
        _this.statusText = '我的卡包'
      }else if($status == '2'){
        _this.status = '异常错误，请重新兑换。'
        _this.statusText = '重新兑换'
      }else{
        _this.status = '兑换失败'
        _this.statusText = '重新兑换'
      }

    })
    .catch((error) => {
    	console.log(error)
    });
  },
  methods: {
    routergo: function () {
      this.$router.back(-1)
    },
    onClickRight () {
      this.$router.push({path:'/cardBag'})
    },
    convertBtn: function (mes){//兑换结果页按钮点击
      if(mes == '我的卡包'){
        this.$router.push({path:'/cardBag'})
      }else if(mes == '我的积分'){
        // this.$router.push({path:'/cardBag'})
      }else if(mes == '重新兑换'){
        const toast = Toast.loading({
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          mask: true,
          loadingType: 'spinner',
          message: '兑换中'
        });
        let orderId = String(this.$route.query.orderId) //当前订单的id
        let account = String(this.$route.query.account) // 上次兑换输入的商家账号
        this.$store.dispatch('commonService',{"apid": 118,//卡包详情兑换调用
          params: {// 需要传的参数集合
            orderId: orderId,
            account: account
        }})
        .then((result) => {
          // console.log(result)
          Toast.clear()
          this.$router.push({path: '/convertResults', query: {orderId: orderId, status: this.status, account: account}})
        })
        .catch((error) => {
          console.log(error)
          Toast.clear()
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>

</style>
