<template>
  <div class="order_content_mainL">
   <div class="order_nav">
     <van-tabs @click='navClick'>
       <van-tab v-for="(item, index) in list" :title="item" :key="index"></van-tab>
     </van-tabs>
   </div>
   <div class="order_list">
   <!-- <div class="loading" v-if="showLoad">
   <div class="loading_main clear">
   <van-loading color="black" /><span>加载中...</span>
   </div>
    </div> -->
    <van-list
     v-model="loading"
     :finished="finished"
     @load="turnPage"
     :offset="offset"
    >
    <div class="order_empty" v-show="!isShop">
      <div class="empty_img">
        <img src="./../../../assets/mine/noCard.png">
      </div>
      <p>暂无相关订单~</p>
      <router-link class='go_index' to="/index">去消费</router-link>
    </div>
   <div class="order_list_main clear" v-for="(item, index) in shopList" :key='item.id' v-show="isShop">
     <div class="order_title">
      <span class="title">{{item.short_name}}</span>
      <span class="state" :class='{state_active: item.status == 2 ?  false:(item.status == 3 ? false:true)}'>{{statusTranslate(item.status)}}</span>
     </div>
     <router-link :to="{path:'/order/orderDetial',query:{orderId:item.id}}">
     <van-card :thumb="item.image_url">
        <div slot="footer" class="foot_detail">{{item.full_name}}</div>
     </van-card>
     </router-link>
     <div class="order_money">共计{{item.product_num}}件商品&nbsp;&nbsp;小计: {{item.point}}积分+{{item.payment_amount}}元</div>
     <div class="order_button"  v-show="item.status == 1 ? true:(item.status == 6 ? true:false)">
       <span class="payment" @click="payment({orderId:item.id,payment_type:item.payment_type})">付款</span>
       <span class="cancel_order" @click="cancelOrder({id:item.id, index:index})">取消订单</span>
     </div>
     <div class="margin_bottom"></div>
   </div>
   <div class="no_data_info clear" v-show="dataFlag">没有更多数据了...</div>
   </van-list>
   </div>
   <div v-html="alipayHtml" class="pay_wrap"></div>
  </div>
</template>
<script>
import banner1 from '@/assets/index/banner1.png'
import {Dialog, Toast} from 'vant'
import './index.less'
export default {
  name: 'order',
  data () {
    return {
      productId: '',//订单内商品的ID
      orderId: '',//订单id
      list: ['全部', '待付款', '已完成', '已取消'],
      banner1: banner1,
      loading: false,  // 加载loading显隐
      finished: false, //  是否开启上拉加载 false为是
      shopList: [],  // 订单列表
      showLoad: false,  // 自定义loading 显隐
      offset: Number(50), // 滚动条距离底部多少开始加载
      isShop: true, // 是否有数据
	  pageNo:0, //默认页码
	  pageStatus:0, //当前页的订单状态
      dataFlag: false,  // 无更多商品
	  alipayHtml:""
    }
  },
  methods: {
    routergo: function () {
      this.$router.back(-1)
    },
	statusTranslate (code) {
	  // console.log(code);
	  switch(code){
	    case 1:
	      return "待付款";
          break
        case 2:
     	  return "已完成";
          break;
        case 3:
          return "已取消";
		  break;
        case 4:
          return "超时未付款，订单已关闭";
          break;
        case 5:
          return "兑换状态未知";
          break;
        case 6:
          return "积分已支付现金未支付";
		  break;
        case 7:
 		  return "兑换失败";
		  break;
	case 8:
		  return "已支付";
		  break;
	default:
		  return "状态未知";
		  break;
	  }
	},
	turnPage () {  
	  this.pageNo += 1;
      const data = {
	    apid:"124",
		params:{
	      'pageNo':this.pageNo,
	      'pageSize':'10',
	      'status':this.pageStatus,
        }
	  };
	  this.loadData(data)  //此处需单独调用查询订单列表接口做'数据已经加载完成'处理。
	},
	loadData (data) {
    // console.log(data)
	  const _this = this;
	  const defaultData = {apid:"124",params:{
	    'pageNo':'1',
	    'pageSize':'10',
	    'status':_this.pageStatus,
      }};
	  if(!data){
	     data = defaultData;
	  }
	  this.$store.dispatch('commonService',data).then(function(res){
          if( res.apidata.code != 1){
            Toast(res.apidata.message)
            return;
          }
	    if(res.apidata.data.datas.length>0){  //有订单数据
		   _this.shopList = _this.shopList.concat( res.apidata.data.datas );
               // console.log(_this.shopList)
            if( res.apidata.data.datas.length >  9) { //
                _this.finished = false;
              }
              if( _this.shopList.length <  3) {
                _this.finished = true;
                _this.dataFlag = false;
              }
               _this.loading = false;
		   _this.isShop = true;
		}else{ //无订单数据
               _this.loading = false;
               _this.finished = true;
               if (_this.shopList.length < 1 && res.apidata.data.datas.length <1 ) {
                 _this.isShop = false;
                 _this.showLoad = false;
               }else{
                  _this.dataFlag = true;
               } 
		}
		_this.showLoad = false
      }).catch((error) => {
        console.log(error)
      });
    },
    navClick (index) {
      // console.log(index)
      this.loading = false;
	this.showLoad = true;
      // this.finished = false;
	this.pageStatus = index;
      this.dataFlag = false;
      this.pageNo = 0;
      this.isShop = true;
      this.toggleNav();
      this.turnPage();   
    },
    toggleNav () {
      this.showLoad = true
      this.handleScroll()
      this.shopList = []
    },
    handleScroll () {
      window.pageYOffset = 0
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    },
    payment (message) {
      //未做支付方式处理，统一调支付宝支付
      if(message.payment_type == '2' || message.payment_type == '3')
      	this.alipayWx(message.orderId);
      else if(message.payment_type == '4' || message.payment_type == '5')
	  		this.alipay(message.orderId);
    },
    alipayWx(orderId){
    	const _this = this;
		  this.$store.dispatch("commonService",{"apid":"220",
			"params":{
			  "orderId":String(orderId)
			}
		  }).then(function(wxpayUrl){
			if(wxpayUrl.apidata.code == 1){ //调用成功
			  _this.wxpayUrl = wxpayUrl.apidata.data;
	      _this.popShow = true;
	      _this.clickNum = 1
	      window.location.href = _this.wxpayUrl  
			}		
		  }).catch((error2)=>{
			console.log(error2)
		  })
		},
	alipay(orderId){
	  const _this = this;
	  this.$store.dispatch("commonService",{"apid":"219",
		"params":{
		  "orderId":String(orderId)
		}
	  }).then(function(alipayHtml){
		if(alipayHtml.apidata.code == 1){ //调用成功
		  _this.alipayHtml = alipayHtml.apidata.data;	 
		  setTimeout(function(){
		    document.forms["punchout_form"].submit();
		  },1);	  
		}else{
               Toast(alipayHtml.apidata.message)
             }		
	  }).catch((error2)=>{
		console.log(error2)
	  })
	},
    cancelOrder (data) {
      let that = this
      Dialog.confirm({
        message: "是否确认取消订单？",
        className:'aaaa'
      }).then(() => {
        // 取消点单
        this.$store.dispatch('commonService',{'apid':"122", params:{"orderId": String(data.id)}}).then(function(res){
           // console.log("成功")
           if(res.apidata.code == 1) {
              that.shopList[data.index].status = 3
             Toast("订单已取消成功")
           }else{
            Toast(res.apidata.message)
           } 
        }).catch((error) => {
          console.log(error)
        });
      }).catch(() => {
        console.log('取消付款')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pay_wrap{display:none}
</style>
