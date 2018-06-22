<template>
  <div class="pack_active clear">
    <div class="topImg" v-if="topImgFlag">
      <img :src="imgBanner" alt="">
    </div>
    <ul class="pack_list clear">
      <li v-for='(item, index) in list' :key='index' @click="goGoodDetail({idType:'1',id:item.id})">
        <div class="pack_content" :class='{pack_content_right: index % 2 == 1 ? false:true, pack_content_large:(item.fullName.replace(/[^\x00-\xff]/g, "01").length) > 24 ? true:false}'>
          <h2>{{item.fullName}}</h2>
          <div class="pack_price">打包优惠：{{item.packagePrice}}积分</div>
          <div class="old_price">原价：{{item.retailPrice}}积分</div>
          <div class="go_exchange">去兑换</div>
        </div>
        <div class="img_left" :class='{img_right: index % 2 == 1 ? true:false}'>
          <img src="./../assets/pack_shop1.png"  alt="">
          <div class="shop_status">热销</div>
        </div>
      </li>
    </ul>
    <div class="footer clear">
      <div class="foot_left">
        <div class="all_pack_price">打包价：{{packageTotalPrice}}积分</div>
        <div class="all_old_price">原价：{{originTotalPrice}}积分</div>
      </div>
      <div class="foot_right" @click="goGoodDetail({idType:'2',id:''})">去兑换</div>
    </div>
    <div class="active_rule" @click="rulePopup = !rulePopup" v-show="ruleFlag">活动规则+</div>
    <div class="active_rule_detail" v-show="rulePopup">
      <div class="close" @click="rulePopup = !rulePopup">
        <div class="close_main"></div>
      </div>
      <div class="rule_main clear">
        <div class="rule_main_top">活动规则</div>
        <div class="rule_main_content">
          <!-- <p>1.活动时间：</p>
          <div class="time">{{activityTime}}</div> -->
          <p>活动规则：</p>
          <ul class="clear">
            <li v-for='(item,index) in activityRule' :key="index">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import imgBanner from "@/assets/pack_banner.png"
import wx from 'weixin-js-sdk'
export default {
  name:"PackActive",
  data () {
    return {
      list:['喝一杯可以占卜的答案奶茶案奶茶', '123456喝一杯可以喝一杯以', '喝一杯可以占卜的答案奶茶案奶茶', '喝一杯可以占卜的答案奶茶', '喝一杯可以占卜', '喝一杯可以占卜的答案奶茶案奶茶' ], // 商品列表
      topImgFlag:true, // 活动图显示开关
      imgBanner:imgBanner, // 活动图片
      rulePopup:false, // 活动规则弹窗
      ruleFlag:true, // 活动规则显隐
      activityRule:["参与互动活动\"写一封给妈妈的情书\",领取活动商品，每满188-25满减券", "每满减券在有效期使用，逾期将自动作废","本次活动所有数据均以网易严选活动组织方为统计"], //活动规则
      originTotalPrice: '', // 原价
      packageTotalPrice: '', // 打包总价
      packageId: this.$router.packageId ? this.$router.packageId:'11' // 打包活动id

    }
  },
  methods:{
    goGoodDetail(messsage) { // 三个参数
      let data = {
        id: messsage.id, // 商品id
        idType: messsage.idType, // 1 单个商品 2 打包商品
        activeId: "12" // 打包活动id
      }
      let dataMessage = JSON.stringify(data)
      if(this.$route.query.type == 1) { // 判断应用内外 应用内
        let u = navigator.userAgent, app = navigator.appVersion;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isIOS){
          alert("iphone")
          // console.log(window)
          // window.sendData(dataMessage)
        }else{
          alert("android")
          // window.androidjs.sendData(dataMessage)
        }
      }else{
        let shareOwner = '', productId='', shareSign='';
        this.$router.push({path:'register', query: { shareOwner: shareOwner, spreadId:'', spreadChannel:'', productId: productId, spreadType: 3,shareSign: shareSign}})
      }
    },
    activeData () {
			let that = this;
			axios.get('share/goodspackage/manager/get.do', { // 活动列表接口
				params: {
					packageId: that.$router.packageId ? that.$router.packageId:'11',
				}
			})
			.then(function (result) {
        that.list = result.data.data.tProductList
        that.originTotalPrice = result.data.data.originTotalPrice
        that.packageTotalPrice = result.data.data.packageTotalPrice
				console.log(result.data.data.tProductList)
			})
			.catch(function (error) {
				console.log(error)
			});
    },
    dataRrcord () { // 记录浏览次数
			let that = this;
			axios.get('/share/active/click/record/add.do', {
				params: {
					userId: '',
					visitorId: '',
					activeId: ''
				}
			})
			.then(function (result) {
				console.log(result)
			})
			.catch(function (error) {
				console.log(error)
			});
    },
    ruleData() { // 规则数据
    let that = this
      axios.get('share/active/manager/getactiverule.do', {
				params: {
					spreadId: that.$router.packageId ? that.$router.packageId:'11',
				}
			})
			.then(function (result) {
				console.log(result)
			})
			.catch(function (error) {
				console.log(error)
			});
    },
    wxShare () { // 微信分享
      // console.log(wx)
      // alert("111")
      let timestamp = Date.parse(new Date())
      let shareUrl = window.location.href
      axios.get('/wx/ticket', {
        params: {'timeStamp': timestamp, 'url': shareUrl}
      }).then(function (res) {
        wx.config({
          debug: false,
          appId: 'wx3d1a1c125df0ae9a', // 必填，公众号的唯一标识
          timestamp: timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.signature, // 必填，签名，见附录1
          jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        wx.ready(function () {
          wx.onMenuShareAppMessage({
            title: '积分运营综合服务商',
            desc: '深度解决积分用户运营，精准定向用户引流开源。',
            link: shareUrl,
            imgUrl: 'http://uat.mobile.eratpay.com/aboutus/logo.png',
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          })
          wx.onMenuShareTimeline({
            title: '积分运营综合服务商', // 分享标题
            link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://uat.mobile.eratpay.com/aboutus/logo.png', // 分享图标
            success: function () {
            // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          })
          wx.error(function (res) {
            alert(res.errMsg)
          })
        })
      }).catch(function (error) {
        alert(error)
      })
    }

  },
  created() {
    // 请求 浏览次数接口
    this.activeData()
    // this.dataRrcord()
    this.ruleData()
    
  },
  mounted(){
    // this.wxShare()  // 微信分享
  }
}
</script>
<style scoped lang='scss'>
 .pack_active{
   width: 100%;
   height: auto;
   font-size: 0;
   .topImg{
    width: 100%;
    height: auto;
    img{
      width: 100%;
    }
  }
  .pack_list{
    width: 100%;
    margin-bottom:1.28rem;
    li{
      width: 100%;
      height: 2.9rem;
      padding: 0.38rem 0.2rem 0.4rem;
      font-size: 0.24rem;
      border-bottom: 0.02rem solid #f0f0f0;
      .pack_content{
        width: 3.6rem;
        height: 100%;
        float: left;
        h2{
          font-size: 0.25rem;
          letter-spacing: 0.02rem;
        }
        .pack_price{
          font-size: 0.26rem;
          line-height: 0.3rem;
          color:#ff7171;
          margin-top: 0.26rem;
        }
        .old_price{
          font-size: 0.26rem;
          line-height: 0.3rem;
          color:#9d9c9c;
          margin-top: 0.18rem;
          text-decoration: line-through;
        }
        .go_exchange{
          width: 1.56rem;
          height: 0.5rem;
          font-size: 0.24rem;
          padding-top:0.085rem;
          color: #fff;
          text-align: center;
          margin-top: 0.2rem;
          letter-spacing: 0.04rem;
          border-radius: 0.08rem;
          background: rgb(255, 103, 103)
        }
      }
      .pack_content_large{
        .pack_price{
          margin-top: 0.1rem;
        }
        .old_price{
          margin-top: 0.09rem;
        }
        .go_exchange{
          margin-top: 0.1rem;
        }
      }
      .img_left{
        float: left;
        width: 3.4rem;
        height: 2.08rem;
        position: relative;
        img{
          width: 100%;
          height: 100%;
        }
        .shop_status{
          width: auto;
          height: 0.28rem;
          font-size: 0.2rem;
          padding: 0 0.1rem;
          text-align: center;
          color: #fff;
          background: #ff6767;
          border-bottom-left-radius: 0.04rem;
          border-top-left-radius: 0.04rem;
          position: absolute;
          top: 0.2rem;
          right: 0;
        }
      }
      .pack_content_right{
        float: right;
        text-align: right;
        .go_exchange{
          float: right;
        }
      }
      .img_right{
        float: right;
      }
    }
  }
  .footer{
    width: 100%;
    height: 1.28rem;
    padding-left: 4%;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #ffffff;
    .foot_left{
      width: 44%;
      height: 100%;
      float: left;
      .all_pack_price{
        width: 100%;
        font-size: 0.3rem;
        color: #ff6767;
        margin-top: 0.25rem;
      }
      .all_old_price{
        width: 100%;
        font-size: 0.3rem;
        color: #9d9c9c;
        text-decoration: line-through;
        margin-top: 0.05rem;
      }
    }
    .foot_right{
      width: 55%;
      height: 100%;
      float: right;
      background: #f66f6f;
      font-size: 0.36rem;
      color: white;
      text-align: center;
      font-weight: 600;
      letter-spacing: 0.04rem;
      line-height: 1.28rem;
    }
  }
  .active_rule{
    position: fixed;
    right: 0;
    top: 0.15rem;
    border-bottom-left-radius: 0.04rem;
    border-top-left-radius: 0.04rem;
    font-size: 0.2rem;
    color: #fff;
    text-align: right;
    width: 1.22rem;
    height: 0.48rem;
    background: #ff6767;
    text-align: center;
    line-height: 0.48rem;
  }
  .active_rule_detail{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    .close{
      position: absolute;
      top:2.3rem;
      right: .95rem;
      width: 0.66rem;
      height: 0.66rem;
      background: rgba(0, 0, 0, 0.6);
      font-size: 0;
      text-align: center;
      border-radius: 50%;
      padding-top: 0.15rem;
      .close_main{
        position: relative;
        width:0.04rem;
        height:0.35rem;
        background: #fff;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        display: inline-block;
        
      }
      .close_main:after{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width:0.04rem;
        height:0.35rem;
        background: #fff;
        -webkit-transform: rotate(270deg);
        -moz-transform: rotate(270deg);
        -o-transform: rotate(270deg);
        -ms-transform: rotate(270deg);
        transform: rotate(270deg);
        }
    }
    .rule_main{
      width:5.82rem;
      height: auto;
      background: #fff;
      position: absolute;
      left: 50%;
      top: 3rem;
      margin-left: -2.91rem;
      border-radius: 0.26rem;
      overflow: hidden;
      .rule_main_top{
        width: 100%;
        height: 1.2rem;
        background: #f66e6e;
        font-size: 0.3rem;
        text-align: center;
        line-height: 1.2rem;
        color: #fff;
      }
      .rule_main_content{
        width: 100%;
        padding: 0.26rem 0.6rem;
        height: auto;
        color: #ff9593;
        font-size: 0.24rem;
        p{
          width: 100%;
          height: 0.4rem;   
          line-height: 0.4rem;
        }
        .time{
          width: 100%;
          height: 0.5rem;
          line-height: 0.5rem;
          margin-left:0.56rem; 
        }
        ul{
          width: 100%;
          li{
            font-size: 0.24rem;
            width: 100%;
            line-height: 0.4rem;
            margin-top: 0.1rem;
          }
        }
      }
    }
  }
 }
 
 
</style>


