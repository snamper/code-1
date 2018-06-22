<template>
  <!-- 订单详情页面 -->
  <div class="order_detial">
    <div class="orderDetialContBox">
      <!-- 商品信息相关 -->
      <div class="goodsInfoBox margin8 padding20">
        <div class="orderGoodsInfoBox clear">
          <div class="orderGoodsInfo fl">
            <img class="goodsImg" :src="goodsImg" alt="">
          </div>
          <div class="orderGoodsInfoText fl">
            <span class="goodsTitle">{{goodsTitle}}</span>
            <span class="goodsPoint"><i>{{goodsPoint}}</i>积分</span>
            <!-- <span class="goodsValidity">有效期：{{usefulTime}}</span> -->
          </div>
        </div>
        <div class="orderPaymentBox">支付金额：<i>0积分+{{payAmount}}元</i></div>
      </div>
      <!-- 兑换说明 -->
      <!-- <div class="instructions margin8 padding20">
        <span class="instructionsTitle">兑换说明：</span><br/>
        <p class="convertInfoText">{{detailDesc}}</p>
      </div> -->
      <!-- 订单编号相关 -->
      <div class="orderRelated padding20">
        <span class="orderNum">订单编号：{{orderNum}}</span>
        <span class="orderPayment">支付方式：{{payment}}</span>
        <span class="orderPaymentTime">付款时间：{{payTime}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import './orderDetial.less'
import {formatDate} from './../cardBag/date.js'
export default {
  name: 'orderDetail',
  data () {
    return {
      goodsImg: '',//订单商品图片
      goodsTitle: '',//订单商品名称
      goodsPoint: '',//订单商品积分
      usefulTime: '',//订单商品有效期
      payAmount: '',//支付金额
      detailDesc: '',//兑换说明
      orderNum: '',//订单编号
      payment: '',//支付方式
      payTime: '',//支付时间
    }
  },
  created (){
    let thisId = String(this.$route.query.orderId) //当前订单的id
    this.$store.dispatch('commonService',{"apid": 123,
        params: {// 需要传的参数集合
        orderId: thisId
      }})
    .then((result) => {
      // console.log(result)
      this.goodsImg = result.apidata.data.image_url// 赋值商品LOGO
      this.goodsTitle = result.apidata.data.full_name// 赋值商品名字
      this.payAmount = result.apidata.data.payment_amount// 赋值支付金额
      this.goodsPoint = result.apidata.data.cost_price// 赋值商品积分
      this.usefulTime = result.apidata.data.useful_time //赋值商品有效期
      this.detailDesc = result.apidata.data.detail_desc // 赋值兑换说明
      this.orderNum = result.apidata.data.orderno // 赋值订单编号
      this.payTime = result.apidata.data.payment_time// 赋值支付时间
      let payMentType = result.apidata.data.payment_type// 赋值支付方式
      if(payMentType == '1'){
        this.payment = '积分支付'
      }else if(payMentType == '2'){
        this.payment = '积分微信支付'
      }else if(payMentType == '3'){
        this.payment = '微信支付'
      }else if(payMentType == '4'){
        this.payment = '积分支付宝支付'
      }else if(payMentType == '5'){
        this.payment = '支付宝支付'
      }else if(payMentType == '6'){
        this.payment = '中奖'
      }else{
        this.payment = ''
      }
    })
    .catch((error) => {
    	console.log(error)
    });
  },
  filters: {
    formatDate(time) {
        var date = new Date(time);
         return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
