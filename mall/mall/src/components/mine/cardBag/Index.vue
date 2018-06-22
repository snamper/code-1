<template>
  <div class="card_content">
   <div class="header">
    <van-nav-bar title="我的卡包"  left-arrow @click-left="routergo" :right-text="this.flag ? '完成' : '编辑' " @click-right="onClickRight" />
   </div>
   <div class="hart_list" :class="{hart_list_bottom:!flag}">
     <van-list
       v-model="loading"
       :finished="finished"
       @load="onLoad"
       :offset="offset"
     >
     <div class="order_empty" v-show="!hasShop" ref="card">
      <div class="empty_img">
        <img src="./../../../assets/mine/noCard.png">
      </div>
      <p>暂无购买成功商品~</p>
      <router-link class='go_index' to="/index">去消费</router-link>
    </div>
     <van-checkbox-group v-model="result" @change="change">
     <div class="hart_detail" v-for="(item, index) in listData" :key="index" :name="item" v-show="hasShop">
      <div class="hart_left" v-if="item.deliver_way == 1 ? ( item.status < -1 ? ( item.product_exchange_type < 4 ? flag : false):false ) : false">
        <van-checkbox  :key="item.id"  :name="item.id"></van-checkbox>
      </div>
      <div class="card" :class="{cardActive:item.deliver_way == 1 ? ( item.status < -1 ? ( item.product_exchange_type < 4 ? flag : false):false ) : false}" >
        <div class="card_top">
          <div class="card_info" v-show="item.status == -3 ?  false: (item.status == 0 ? false:true ) ">{{ item.status == -2 ? "兑换异常":(item.status == 0 ? '兑换成功':'兑换失败' ) }}</div>
          <div class="card_main" @click="goCardDetail({id:item.id})">
            <div class="card_price" :class="{card_price_active: item.status == 0 ? true:false}">￥<span>{{item.price}}</span></div>
            <div class="card_name">
              <p class="title">{{item.product_name}}</p>
              <p class="title1" v-show="item.product_exchange_type == 1 ? true : false">{{item.exchange_code}}</p>
              <p class="title2">{{item.buy_time}}</p>
            </div>
            <div class="card_img" :class="{card_img_active: item.status == 0 ? true:false}" v-show="item.status == -3 ?  false: true ">
              <img :src="item.status == 0 ? successIcon:defeatedIcon ">
            </div>
          </div>
        </div>
        <div class="circle circleLeft"></div>
        <div class="circle circleRight"></div>
        <div class="card_button" v-show="item.product_exchange_type == 1 ? ( item.status < -1 ? (item.status == -4 ? false: true) :false ) : false" v-clipboard:copy="item.exchange_code" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</div>
        <div class="card_button card_button_no" v-show="item.product_exchange_type == 1 ? ( item.status < -1 ? (item.status == -4 ? true : false) :true ) : false" @click='copyNo'>复制</div>
        <div class="card_button" :class="{card_button_no:item.status < -1 ? false:true}" v-show="item.product_exchange_type == 1 ? false : true" @click="goToConvert({status:item.status,orderId:item.order_id,cardId:item.id,type:item.product_exchange_type,url:item.exchange_url,code:item.exchange_code,hasExchangeCode:item.hasExchangeCode})">兑换</div>
      </div>
     </div>
     <div class="no_data_info clear" v-show="dataFlag">没有更多数据了...</div>
     </van-checkbox-group>
     </van-list>
     <div class="hart_bottom" v-show="flag">
      <div class="allSelect">
        <div class="aaa">
          <i class="van-icon van-icon-success van-checkbox__icon van-checkbox--round" :class="{allChecked:allSelectFlag}"  @click="allSelect"></i>
          <span class="van-checkbox__label">全选</span>
        </div>
      </div>
      <div class="cancel" @click='readyExchange'>已兑换</div>
     </div>
   </div>
  </div>
</template>

<script>
import './index.less'
import { Toast, Dialog } from 'vant'
import {formatDate} from './date.js'
import successIcon from '@/assets/mine/my_card_success.png'
import defeatedIcon from '@/assets/mine/my_card_defeated.png'
import costpayDefeated from '@/assets/mine/my_card_costpay_defeated.png'
import costpaySuccess from '@/assets/mine/my_card_costpay_success.png'
export default {
  name: 'cardBag',
  data () {
    return {
      loading: false, // loading加载
      finished: false, // 是否开启上拉加载
      flag: false, // 编辑开关
      list: [], // 所有复选框列表
      result: [], // 已选复选框列表
      allSelectFlag: false, // 全选
      offset: Number(50), // 距离底部位置开始加载
      hasShop: true, // 有无商品
      successIcon: successIcon,  // 成功图片
      defeatedIcon: defeatedIcon, // 失败图片
      costpayDefeated: costpayDefeated,
      costpaySuccess: costpaySuccess,
      listData:[], // 列表
      pageNo:'1',
      dataFlag:false // 无更多商品
    }
  },
  methods: {
    routergo: function () {
      this.$router.back(-1)
    },
    onClickRight () {
      if(this.hasShop){
        this.flag = !this.flag
        this.result = []
      }
    },
    onLoad () {
      let that = this
      this.$store.dispatch('commonService',{"apid": 115,
      params: {
        pageSize: "10",
         pageNo: String(that.pageNo),
    }})
      .then((result) => {
        if( result.apidata.code == 1) {
          that.pageNo++
          if( result.apidata.data.datas.length > 0 ) {
            let dataList = result.apidata.data.datas
            this.loading = false
            that.listData = that.listData.concat( result.apidata.data.datas )
            if(that.listData.length < 6 ) {
              that.finished = true
            }
            that.list = []   // 存可选复选框list
            for ( let j=0;j<that.listData.length; j++){
              if( that.listData[j].deliver_way == 1 && that.listData[j].status < -1 &&  that.listData[j].product_exchange_type < 4  ) that.list.push(that.listData[j].id)
            }
          }else{
             that.finished = true
             that.loading = false
             if (that.listData.length < 1 && result.apidata.data.datas.length <1 ) {
               that.hasShop = false;
             }else{
                that.dataFlag = true;
             }
             // Toast('没有更多数据了...');
          }
        }else{
           Toast(result.apidata.message);
        }
      })
      .catch((error) => {
        console.log(error)
      })
    },
    change () { // 复选按钮
      // console.log(this.result.length,this.list.length)
      if (this.result.length == this.list.length && this.result.length >0 ) {
        this.allSelectFlag = true
      } else {
        this.allSelectFlag = false
      }
    },
    allSelect () {  // 全选按钮
      this.allSelectFlag = !this.allSelectFlag
      if (this.allSelectFlag) {
        this.result = this.list
      } else {
        this.result = []
      }
    },
    copyNo(){
      Toast("已经兑换成功，不可重复兑换")
    },
    onCopy(){
      Toast("兑换码已复制到剪切板")
    },
    onError() {
      console.log("error")
    },
    goToConvert (data) {
      // console.log(data)
      if(data.status == -2 || data.status ==-3 ){
        // alert('可点击')
        switch (data.type) {
          case 2 :
            this.$router.push({path:'/cpsDetail',query:{entranceUrl:data.url}})   // 传手机号
            break;
          case 3:
            if( data.hasExchangeCode == 1 ) {
              this.$router.push({path:'/cpsDetail',query:{entranceUrl:data.url+data.code}})  // 传兑换码
            }else{
              this.$router.push({path:'/cpsDetail',query:{entranceUrl:data.url}})  // 不传兑换码
            }
            break;
          case 4:
            this.$router.push({path:'/convertResults',query:{status:data.status,orderId:data.orderId,cardId:data.cardId}})  // A流程
            break;
          case 5:
            this.$router.push({path:'/goodsConvert',query:{orderId:data.orderId,cardId:data.cardId}}) // B流程
            break;
        }

      } else{
        if(data.status == 0 ){
          Toast("已经兑换成功，不可重复兑换")
        }else{
          Toast("已经兑换失败，无法重复兑换")
        }

      }
    },
    goCardDetail (data) {
       if( this.flag ){
        return;
      }
      this.$router.push({path: '/order/cardDetail', query: {cardId: data.id}})
    },
    readyExchange() {  // 已兑换
      let that = this
      if(  that.result.length <= 0 ) {
        Toast("未选择商品，请选择！")
        return false;
      }
      Dialog.confirm({
        message: '是否兑换成功？'
      }).then(() => {
        let dataString =(that.result).join()
      // console.log(dataString)
      this.$store.dispatch('commonService',{"apid": '116',
        params: {
          cardIds: dataString
        }})
        .then((result) => {
          if( result.apidata.code == 1) {
            Toast("已成功更改兑换状态")
            // console.log("sucess")
            that.listData = []
            that.list = []
            that.result = []
            that.pageNo = '1'
            that.onLoad()
            that.allSelectFlag = false
          }else{
            Toast(result.apidata.message)
          }
        })
        .catch((error) => {
          console.log(error)
        })
      }).catch(() => {
         // on cancel
    });
    }
  },
  mounted () {
    // alert(window.innerWidth)
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
<style lang='less'>

</style>
