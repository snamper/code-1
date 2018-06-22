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
        <div class="orderPaymentBox">小计：<i>{{payPrice}}</i></div>
      </div>
      <!-- 支付方式 -->
      <div class="instructions margin8 padding20">
        <div class="payment qcPayment">
          <img :src="qcIcon" alt="积分支付">
          <span class="payName">积分支付</span>
          <van-checkbox v-model="qcChecked" @change="changeQc" :disabled="Number(total_balance)<=0"></van-checkbox>
        </div>
        <div class="otherPayment">
          <img :src="wxIcon" alt="微信支付">
          <span class="payName">微信支付</span>
          <van-checkbox v-model="wxChecked" @change="changeWx" ></van-checkbox>
          <!-- <van-radio-group v-model="radio">
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
          </van-radio-group> -->
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
        <span class="payInfoText">实付款: {{payPrice}}</span>
        <span class="payBtn" @click="submitOrderBtn()">提交订单</span>
      </div>
    </div>
	<!-- <van-popup v-model="popShow" position="right" :overlay="true"> -->
	  <div v-html="alipayHtml" class="pay_wrap"></div>
    <!-- </van-popup> -->	 
    <van-popup v-model="show" class="pupshowKeyboard" @click-overlay="clickPopup">
      <van-password-input
        :value="password"
        info=""
        @focus="showKeyboard = true"
      />
      <div class="forgetPwd">
        <span @click="forgetPwdFn">忘记密码</span>
      </div>

    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
    </van-popup> 	
  </div>
</template>
<script>
import wx from 'weixin-js-sdk'
import './confirmOrder.less'
// import goodsImg from '@/assets/orderDetial/goodsImg.jpg'
import qcIcon from '@/assets/orderDetial/qcIcon.png'
import wxIcon from '@/assets/orderDetial/wxIcon.png'
import zfbIcon from '@/assets/orderDetial/zfbIcon.png'
import {Dialog,Toast} from 'vant'
export default {
  name: 'orderPayment',
  data () {
    return {
      openId:'',
      productId: '',//商品id
      goodsImg: '',// 商品图标
      goodsTitle: '',// 商品名称
      goodsPrice: '',// 商品售价
      payPrice: '', //支付价格
      orderId:'',
      ifShowWx:true,
      total_balance:0,  //积分余额
      qcIcon: qcIcon,
      wxIcon: wxIcon,
      zfbIcon: zfbIcon,
      qcChecked: false, //积分支付
      radio: '1',//支付方式
      wxChecked:false,  //支付方式
      value: '',//留言
      alipayHtml:'',
      clickNum:1, //重复点击
      show:false, // 弹窗
      password: '', //支付密码
      showKeyboard: true,
      payPwdFlag:'0'
    }
  },
  mounted () {
    // 动态获取设备的高度并赋值
    let height = window.innerHeight - this.$refs.orderPage.offsetTop
    this.$refs.orderPage.style.height = height + 'px'
    if (typeof WeixinJSBridge == "undefined"){
      if( document.addEventListener ){
          document.addEventListener('WeixinJSBridgeReady', this.arrowPay, false);
      }else if (document.attachEvent){
          document.attachEvent('WeixinJSBridgeReady', this.arrowPay); 
          document.attachEvent('onWeixinJSBridgeReady', this.arrowPay);
      }
    }else{
      // this.onBridgeReady();
    }

    let that = this
    this.$store.dispatch('commonService',{"apid": 53,params: {}})
    .then((result) => {
        if(result.apidata.message == '成功'){
          this.payPwdFlag = result.apidata.data.payPasswordState
      }else {
        Toast(result.apidata.message)
      }
    })
    .catch((error) => {
      console.log(error)
    })

  },
  created () {
    let thisId = String(this.$route.query.id) //当前商品的id
    const that = this;
    this.productId = thisId;//赋值商品id
    this.$store.dispatch('commonService',{"apid": 110,
     params: {// 需要传的参数集合
        productId: thisId
      }})
    .then((result) => {
      that.goodsImg = result.apidata.data.product_logo// 赋值商品LOGO
      that.goodsTitle = result.apidata.data.full_name// 赋值商品名字
      that.goodsPrice = (result.apidata.data.retail_price)// 赋值商品售价

      this.$store.dispatch('commonService',{"apid": 53})//获取个人信息
      .then((res) => {

        if(res.apidata.code == 1){ 
          that.total_balance = res.apidata.data.total_balance;
          if(that.total_balance > 0) that.qcChecked = true;
          if(Number(res.apidata.data.total_balance)/100 >= that.goodsPrice){
            that.payPrice = that.goodsPrice*100 + ' 积分 + 0元'
          }else if(Number(res.apidata.data.total_balance)/100 < that.goodsPrice){
            that.payPrice = res.apidata.data.total_balance + ' 积分 + '+ (that.goodsPrice*100-res.apidata.data.total_balance)/100 +'元'
            that.wxChecked = true;
          } 
        }else{
          Toast(res.apidata.message)
        }
        
      })
      .catch((error) => {
        console.log(error)
      });

    })
    .catch((error) => {
    	console.log(error)
    });
    
  },
  methods: {
    changeWx:function(value) {  //微信复选框
      if(Number(this.total_balance)/100 >= this.goodsPrice && this.qcChecked){  //如果选择了积分支付并且积分余额大于支付积分余额
        this.wxChecked = false
      }else  
        this.wxChecked = value;
    },
    clickPopup(){
      this.$router.push({path:'/order'})
    },
    changeQc:function(value) {  //积分支付复选
      this.qcChecked = value;
      if(Number(this.total_balance)/100 >= this.goodsPrice && this.wxChecked){
        this.wxChecked = false
      }
    },
    submitOrderBtn: function(){
      if( this.clickNum > 1 ){
        return
      }
      this.clickNum = 2
      let paymentType;
      const _this = this;	  
      console.log(this.wxChecked ,this.qcChecked)
      if(this.wxChecked && this.qcChecked){//混合支付
        paymentType = '2';
      }else if(this.wxChecked && !this.qcChecked){//微信支付
        paymentType = '3';
      }else if(!this.wxChecked && this.qcChecked){  //纯积分支付
        paymentType = '1';
        if(_this.payPwdFlag != '1') {  // 1
          Dialog.confirm({
            message: '为了保护您的资金安全，请先设置交易密码！'
          }).then(() => {
            sessionStorage['editTransactionPwd'] = _this.$route.query.id
            _this.$router.replace({path:"/editTransactionPwd",query:{id:_this.$route.query.id}})
          }).catch(() => {
            // on cancel
          }); 
          return
        }
        
        
      }else if(!this.wxChecked && !this.qcChecked){ //没有选择支付方式
        this.clickNum = 1;
        Toast('请选择支付方式')
        return;
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
        _this.orderId = orderId;
        if(orderId){
          if(_this.wxChecked && _this.qcChecked){//混合支付
            return _this.getOpenIId(orderId)
          }else if(_this.wxChecked && !_this.qcChecked){//微信支付
            return _this.getOpenIId(orderId)
          }else if(!_this.wxChecked && _this.qcChecked){  //纯积分支付
            return _this.rouseCodePay(orderId)
          }else if(!_this.wxChecked && !_this.qcChecked){
            Toast('请选择支付方式')
            return;
          }
        }
      }else{
        _this.clickNum = 1
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
  rouseCodePay:function() { //唤醒输入支付密码
    
    this.show = true;
  },
  forgetPwdFn(){
    let _this = this
    sessionStorage['editTransactionPwd'] = _this.$route.query.id
   _this.$router.replace({path:"/editTransactionPwd",query:{id:_this.$route.query.id}})
  },
  onInput(key) {
    this.password = (this.password + key).slice(0, 6);
    if(this.password.length >= 6){
      this.codePay()
      this.show = false;
    }
  },
  onDelete() {
    this.password = this.password.slice(0, this.password.length - 1);
  },
  
  codePay:function() { //积分支付
    const _this = this;
	  this.$store.dispatch("commonService",{"apid":"87",
      "params":{
        "orderId":String(_this.orderId),
        "paypwd":this.password
      }
	  }).then(function(result){
      _this.clickNum = 1
      if(result.apidata.code == 2020){
        Toast('购买成功')
        _this.$router.push({ path: '/buyComplete',query:{id:_this.orderId}})
      }else{
        Toast(result.apidata.message)
      }
      _this.password = ''
	  }).catch((error2)=>{
      _this.clickNum = 1
		  console.log(error2)
	  })
  },
  getOpenIId:function() { //获取openId
    const _this = this;
    if(sessionStorage['openId']){ //如果有openId
      _this.openId = sessionStorage['openId'];
      _this.wxPay(_this.orderId)
    }else{  //没有openId
      this.$store.dispatch("commonService",{"apid":"221",
      "params":{
        "code":sessionStorage['code']
      }
      }).then(function(result){
        if(result.apidata.code == 1){
          _this.openId = result.apidata.data.openId
          sessionStorage['openId'] = _this.openId;
          _this.wxPay(_this.orderId)
        }else{
          Toast(result.apidata.message)
        }
      }).catch((error2)=>{
        console.log(error2)
      })
    }
	  
  },
  wxPay: function() { //获取微信支付参数
    const _this = this;
	  this.$store.dispatch("commonService",{"apid":"220",
		"params":{
      "orderId":_this.orderId,
      "tradeType":"JSAPI",
      "openId":_this.openId
		}
	  }).then(function(result){
      if(result.apidata.code == 1){
        _this.arrowPay(result.apidata.data) //唤起微信支付
      }else{
        Toast(result.apidata.message)
      }
	  }).catch((error2)=>{
		  console.log(error2)
	  })
  },
  arrowPay: function(param) { //唤醒微信支付收银台
    const _this = this;
    WeixinJSBridge.invoke(
       'getBrandWCPayRequest', param,
       function(res){   
         _this.clickNum = 1
           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
             Toast('支付成功！')
             _this.$router.push({ path: '/buyComplete',query:{id:_this.orderId}})//需要去做跳转并且抹除掉当前浏览器历史记录
           }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
       }
   ); 
  },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.pay_wrap{display:none}
.forgetPwd{
    width: 100%;
    height:0.5rem;
    margin-top: 0.3rem;
    font-size: 0.25rem;
    span{
      float: right;
      width: 2rem;
      height:100%;
    }
  }
</style>
