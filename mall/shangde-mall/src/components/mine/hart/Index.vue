<template>
  <div class="hart_content">
   <div class="header">
    <van-nav-bar title="我的心愿单"  left-arrow @click-left="routergo" :right-text="this.flag ? '完成' : '编辑' " @click-right="onClickRight" />
   </div>
   <div class="hart_list clear" :class="{hart_list_margin: !flag}">
     <van-list
       v-model="loading"
       :finished="finished"
       @load="onLoad"
       :offset="offset"
     >
     <van-checkbox-group v-model="result" @change="change">
     <div class="hart_detail clear" v-for="(item, index) in hartList" :key="index" :name="item">
      <div class="hart_left" v-if="item.is_favorites >0 ? flag : false">
        <van-checkbox  :key="item.id"  :name="item.id"></van-checkbox>
      </div>
      <div class="hart_right" :class="{hart_right_margin: item.is_favorites >0 ? !flag : true}">
        <div class="hart_image" @click="goodDetail({id:item.id})">
          <img :src="item.image_url">
          <div class="icon_info icon_info_left" v-show="item.product_ad_attr == 1 ? ( item.product_num_status ? ( item.specialOfferFlag ? true:false ) :  true) : false">{{item.product_num_status ? ( item.specialOfferFlag ? "特价商品" : ''): '无货'}}</div>
              <div class="icon_info icon_info_right" v-show="item.product_ad_attr == 1 ? ( item.product_num_status ? ( item.tag ? true:false ) :  false) : ( item.tag ? true:false )">{{item.tag}}</div>
        </div>
        <div class="hart_main">
          <div class="h3_name" @click="goodDetail({id:item.id})">{{item.full_name}}</div>
          <div class="shop_price" @click="goodDetail({id:item.id})">
            <span class="point"><i>{{item.exchange_points}}</i> 积分</span>
            <!-- <span class="money">原价：{{item.retail_price}}元</span> -->
          </div>
          <div class="shop_sale_detail clear">
            <span class="sale" @click="goodDetail({id:item.id})">已售：<i>{{item.sales}}</i> 件</span>
            <span class="exchange"   @click="goExchange({type:item.is_favorites, id:item.id})">{{item.is_favorites >0 ?  "去兑换":'收藏'}}</span>
          </div>
        </div>
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
      <div class="cancel" @click="cancelCollection">取消收藏</div>
     </div>
   </div>
  </div>
</template>

<script>
import './index.less'
import { Toast } from 'vant'
export default {
  name: 'hart',
  data () {
    return {
      loading: false, // 加载loading
      finished: false, // 是否开启上拉加载 false 为 是
      flag: false, // 控制显示 完成或编辑
      list: [], // 全部复选框列表
      result: [], // 已选复选框列表
      allSelectFlag: false, // 全部按钮
      offset: Number(10), // 距离底部多少开始加载数据
      hartList:[], // 列表数据
      pageNo: '1',
      dataFlag: false // 无更多数据
    }
  },
  methods: {
    routergo: function () {
      this.$router.back(-1)
    },
    onClickRight () {
      this.flag = !this.flag
      this.result = []
    },
    onLoad () {  // 上拉加载
      let that = this
      this.$store.dispatch('commonService',{"apid": 176,
        params: {
          pageSize: "10",
          pageNo: String(that.pageNo),
        }})
      .then((result) => {
        if( result.apidata.code == 1) {
          if( result.apidata.data.datas.length > 0 ) {
             let dataList = result.apidata.data.datas
            this.loading = false
            that.hartList = that.hartList.concat( result.apidata.data.datas )
            for ( var i=0;i<that.hartList.length; i++){
              if( that.hartList[i].is_favorites>0 ) that.list.push(that.hartList[i].id)
            }
            that.pageNo++
            // console.log(result.apidata.data.datas.length)
            if(result.apidata.data.datas.length < 10 ) {
              that.finished = true
              that.dataFlag = true
            }
            if( that.hartList.length < 5   ) { 
              that.dataFlag = false
            }
          }else{
              that.finished = true
              that.loading = false
              that.dataFlag = true
          }
        }else{
          Toast(result.apidata.message)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    },
    goExchange (type) {  // 收藏&兑换按钮
      if( this.flag ){
        return;
      }
      let that = this
      if( type.type == 1 ) { // 去兑换
        // console.log(type)
         this.$router.push({path: '/goodDetail', query: {id: type.id}})
      }else{
      this.$store.dispatch('commonService',{"apid": 175,
        params: {
          id:String( type.id )
        }})
      .then((result) => {
        if( result.apidata.code == 1) {
          that.hartList = []
          that.list = []
          that.pageNo = '1'
          that.onLoad()
        }else{
          Toast('收藏失败')
        }
      })
      .catch((error) => {
        console.log(error)
      })
      }
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
    cancelCollection() {
      let that = this
      if(  that.result.length <= 0 ) {
        Toast("没有可取消商品")
        return false;
      }
      let dataString =(that.result).join()
      // console.log(dataString)
      this.$store.dispatch('commonService',{"apid": 177,
        params: {
          ids: dataString,
          type:'1'
        }})
        .then((result) => {
          if( result.apidata.code == 1) {
            Toast("已成功取消收藏")
            that.hartList = []
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
    },
    goodDetail(message){
      if( !this.flag )  this.$router.push({path:'/goodDetail', query:{id:message.id}})
    }
  },
  created () {
   
  },
  mounted () {
     
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>

</style>
