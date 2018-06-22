<template>
  <!-- 兑换页面 -->
  <div class="goodsConvert_content">
   <div class="header">
    <van-nav-bar title="兑换"  left-arrow @click-left="routergo" right-text='完成' @click-right="onClickRight" />
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
             <div class="buy_success">
               <img :src="buySuccessIcon" alt="">
               <span>购买成功</span>
             </div>
             <!-- <div class="buy_bottom">兑换码已经存入卡包，进入我的卡包查看或者兑换</div> -->
           </div>
         </div>
       </div>
       <div class="convertAccount">
         <div class="iptBox">
           <input class="iptText" type="text" v-model="value" placeholder="请输入商家账号" />
         </div>
        <span class="converBtn" @click="convertBtn()">兑换</span>
       </div>
       <div class="explain">
         <div class="title">兑换说明: </div>
         <p class="explain_detail">{{instructions}}</p>
       </div>
     </div>
   </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import './goodsConvert.less'
import pageBg from '@/assets/mine/buyBg.png'
import buySuccessIcon from '@/assets/mine/buySuccess.png'//购买成功图标
import buyFaildIcon from '@/assets/mine/buyFaild.png'//购买失败图标
export default {
  name: 'goodsConvert',
  data () {
    return {
      pageBg: pageBg,
      offset: Number(0),
      value: '',//商家账号输入内容
      goodsImg: '',//商品图片
      goodsTitle: '',//商品标题
      status: '-3',//购买状态
      buySuccessIcon: buySuccessIcon,//购买成功图标
      buyFaildIcon: buyFaildIcon,//购买失败图标
      instructions: '',//兑换说明
    }
  },
  created () {
    let _this = this
     // let orderId = String(this.$route.query.orderId) // 当前订单id
    let cardId = String(this.$route.query.cardId) //当前卡包的id
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
      // conole.log(result.apidata.data.image_url)
      _this.goodsImg = result.apidata.data.image_url// 赋值商品LOGO
      _this.goodsTitle = result.apidata.data.productDetail.fullName// 赋值商品名字
      // _this.status = result.apidata.data.status
      // console.log(_this.status,"111")
      let refundInfo = result.apidata.data.productDetail.productExtendedDetailList//商品描述信息列表
      for(let i=0;i<refundInfo.length;i++){
        if(refundInfo[i].attrDicName == 'purchaseSucceedsMsg'){//兑换说明
          _this.instructions = refundInfo[i].detailDesc
        }
      }
    })
    .catch((error) => {

    });
  },
  methods: {
    routergo: function () {
      this.$router.back(-1)
    },
    onClickRight () {
      this.$router.push({path:'/cardBag'})
    },
    convertBtn: function (){//兑换按钮点击
      if(!this.value){
        Toast('请输入账号')
        return
      }
      const toast = Toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        mask: true,
        loadingType: 'spinner',
        message: '兑换中'
      });
      let orderId = String(this.$route.query.orderId) //当前订单的id
      this.$store.dispatch('commonService',{"apid": 118,//卡包详情调用
        params: {// 需要传的参数集合
          orderId: orderId,
          account: this.value
      }})
      .then((result) => {
        // if(  result.apidata.code != 1){
        //   Toast(result.apidata.message)
        //   return;
        // }
        // Toast.clear()
        // 传订单id 兑换状态 兑换输入的账号
        this.$router.push({path: '/convertResults', query: {cardId: String(this.$route.query.cardId), status: this.status, account: this.value}})
      })
      .catch((error) => {
        Toast.clear()
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>

</style>
