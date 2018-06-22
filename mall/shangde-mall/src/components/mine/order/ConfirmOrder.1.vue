<template>
  <!-- 确认订单页面 -->
  <div class="order_payment" ref="orderPage">
    <div class="orderPaymentContBox">
      <!-- 商品信息相关 -->
      <div class="goodsInfoBox margin8 padding20">
        <div class="orderGoodsInfoBox clear">
          <div class="orderGoodsInfo fl">
            <img class="goodsImg" :src="goodsImg" alt="">
          </div>
          <div class="orderGoodsInfoText fl">
            <span class="goodsTitle">{{goodsTitle}}</span>
          </div>
        </div>
        <div class="orderPaymentBox">小计：<i>0积分+{{goodsPrice}}元</i></div>
      </div>
      <!-- 支付方式 -->
      <div class="instructions margin8 padding20">
        <!-- <div class="payment qcPayment">
          <img :src="qcIcon" alt="千程">
          <span class="payName">千程积分</span>
          <van-checkbox v-model="qcChecked" disabled></van-checkbox>
        </div> -->
        <div class="otherPayment">
          <van-radio-group v-model="radio">
            <div class="payment wxPayment">
              <img :src="wxIcon" alt="微信">
              <span class="payName">微信支付</span>
              <van-radio name="1"></van-radio>
            </div>
            <div class="payment zfbPayment">
              <img :src="zfbIcon" alt="支付宝">
              <span class="payName">支付宝支付</span>
              <van-radio name="2"></van-radio>
            </div>
          </van-radio-group>
        </div>
      </div>
      <!-- 买家留言 -->
      <div class="buyerBessage padding20">
        <van-cell-group>
          <van-field
            v-model="value"
            label="买家留言"
            type="textarea"
            placeholder="选填,请输入留言"
            rows="1"
            autosize
          />
        </van-cell-group>
      </div>
    </div>
    <!-- 底部固定的付款操作 -->
    <div class="footerPayBox">
      <div class="payInfoBox">
        <span class="payInfoText">实付款: 0积分+{{goodsPrice}}元</span>
        <span class="payBtn" @click="submitOrderBtn()">提交订单</span>
      </div>
    </div>
	<!-- <van-popup v-model="popShow" position="right" :overlay="true"> -->
	 
	  <div v-html="alipayHtml" class="pay_wrap"></div>
    <!-- </van-popup> -->	  	
  </div>
</template>
<script>
import './confirmOrder.less'
// import goodsImg from '@/assets/orderDetial/goodsImg.jpg'
import qcIcon from '@/assets/orderDetial/qcIcon.png'
import wxIcon from '@/assets/orderDetial/wxIcon.png'
import zfbIcon from '@/assets/orderDetial/zfbIcon.png'
import {Dialog, Toast} from 'vant'
export default {
  name: 'orderPayment',
  data () {
    return {
      productId: '',//商品id
      goodsImg: '',// 商品图标
      goodsTitle: '',// 商品名称
      goodsPrice: '',// 商品售价
      qcIcon: qcIcon,
      wxIcon: wxIcon,
      zfbIcon: zfbIcon,
      qcChecked: false,
      radio: '1',//支付方式
      value: '',//留言
      alipayHtml:'',
      clickNum:1
    }
  },
  mounted () {
    // alert(this.$refs.orderPage.offsetTop)
    // 动态获取设备的高度并赋值
    let height = window.innerHeight - this.$refs.orderPage.offsetTop
    this.$refs.orderPage.style.height = height + 'px'
  },
  created () {
    let thisId = String(this.$route.query.id) //当前商品的id
    this.productId = thisId;//赋值商品id
    this.$store.dispatch('commonService',{"apid": 110,
        params: {// 需要传的参数集合
        productId: thisId
      }})
    .then((result) => {
      //console.log(result)
      this.goodsImg = result.apidata.data.product_logo// 赋值商品LOGO
      this.goodsTitle = result.apidata.data.full_name// 赋值商品名字
      this.goodsPrice = (result.apidata.data.retail_price / 100)// 赋值商品售价
    })
    .catch((error) => {
    	console.log(error)
    });
    this.$store.dispatch('commonService',{"apid": 124,
        params: {// 需要传的参数集合
        status: '0',
        pageNo: '1',
        pageSize: '10'
      }})
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
    	console.log(error)
    });
  },
  methods: {
    submitOrderBtn: function(){//暂时禁用积分，目前只是写死的2种支付方式，后期再调整
      if( this.clickNum > 1 ){
        // Toast('请勿重复提交')
        return
      }
      this.clickNum = this.clickNum + 1
      let paymentType;
      const _this = this;	  
      if(this.radio == '1'){//微信支付
        paymentType = '3';
      }else{//支付宝支付
        paymentType = '5';
      } 
      this.$store.dispatch('commonService',{"apid": 86,
        params: {// 需要传的参数集合
          productId: this.productId,
          paymentType: paymentType,// 支付类型
          paymentAmount: String(this.goodsPrice),// 支付金额(如果支付类型为1 可为空)
          paymentPoints: null,// 支付积分(如果支付类型为1、3、5 可为空)
          sourceType: null,// 订单来源： 2：推广活动类型
          sourceId: null,// 对应的来源id
          buyMessage: this.value?this.value:null,// 买家留言
          couponCodeId: null,// 使用的优惠券id
          sourceType2: null// 订单来源  3：新手福利方式
        }
      })
      .then((result) => {       
		/**
		  1、提交订单，获取后台生成的订单号
		  2、调用支付接口
		  3、支付回调后返回支付成功页
		**/  
        if(result.apidata.code == 1){
		  const orderId = result.apidata.data.orderId;
		  if(orderId){
		     if(paymentType == "3"){  //微信支付
			   return _this.wxpay(orderId);
			 }else if(paymentType == "5"){ //支付宝支付
			   return _this.alipay(orderId);
			 }else{
			   console.log("支付方式不对！")
			 }
		  }
		}else{
		  Dialog.alert({
		    title:"温馨提示",
			message:result.apidata.message,
		  });
		}		
      })
      .catch((error) => {
        console.log(error)
      });
    },
	alipay:function(orderId){	  
	  const _this = this;
	  this.$store.dispatch("commonService",{"apid":"219",
		"params":{
		  "orderId":String(orderId)
		}
	  }).then(function(alipayHtml){
	    // console.log(alipayHtml);
		if(alipayHtml.apidata.code == 1){ //调用成功
		  _this.alipayHtml = alipayHtml.apidata.data;
		  _this.popShow = true;
		  setTimeout(function(){
		    document.forms["punchout_form"].submit();
		  },1);	  
		}		
	  }).catch((error2)=>{
		console.log(error2)
	  })
	},
	wxpay:function(orderId){	  
	  const _this = this;
	  // console.log("wxpay");
	  this.$store.dispatch("commonService",{"apid":"220",
		"params":{
		  "orderId":String(orderId)
		}
	  }).then(function(wxpayUrl){
		if(wxpayUrl.apidata.code == 1){ //调用成功
		  _this.wxpayUrl = wxpayUrl.apidata.data;
		  _this.popShow = true;
		  window.open(_this.wxpayUrl);	  
		}		
	  }).catch((error2)=>{
		console.log(error2)
	  })
	},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pay_wrap{display:none}
</style>
