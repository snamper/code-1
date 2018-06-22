<template>
  <!-- 卡包详情页面 -->
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
        <p class="convertInfoText">{{instructions}} </p>
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
import './cardDetial.less'
import { Toast } from 'vant'
import goodsImg from '@/assets/orderDetial/orderDetialGoodsImg.png'
import {formatDate} from './date.js' //调用时间戳转化方法
export default {
  name: 'cardDetail',
  data () {
    return {
      goodsImg: '',//商品图片
      goodsTitle: '',//商品标题
      goodsPoint: '',//积分
      usefulTime: '',//有效期
      instructions: '',//兑换说明
      payAmount: '',//支付金额
      orderNum: '',//订单编号
      payment: '',//支付方式
      payTime: '',//支付时间
    }
  },
  created () {
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
      this.goodsImg = result.apidata.data.image_url// 赋值商品LOGO
      this.goodsTitle = result.apidata.data.productDetail.fullName// 赋值商品名字
      this.goodsPoint = result.apidata.data.productDetail.productRule.exchangePoints//积分
      this.usefulTime = result.apidata.data.usefulTime // 有效期
      this.payAmount = result.apidata.data.payment_amount// 支付金额
      this.orderNum = result.apidata.data.order.orderno // 赋值订单编号
      this.payTime = result.apidata.data.order.paymentTime// 赋值支付时间
      this.payment = result.apidata.data.paymentType// 赋值支付方式
      let refundInfo = result.apidata.data.productDetail.productExtendedDetailList//商品描述信息列表
      for(let i=0;i<refundInfo.length;i++){
        if(refundInfo[i].attrDicName == 'purchaseSucceedsMsg'){//兑换说明
          this.instructions = refundInfo[i].detailDesc
        }
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
