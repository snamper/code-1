<template>
  <div class="classify clear">
  <div ref="wrapper" class='left_nav_main'>
    <ul class="left_nav">
      <li v-for="(item, index) in list" :key='index' :class='{active: firActive===item.sortName}' @click='toggle(item.sortName,item.id)'><span>{{item.sortName}}</span></li>
    </ul>
  </div>
  <div class="classify_main">
    <div class="second_nav" v-show="navFlag" ref="secondNav">
      <van-tabs v-model="active1" v-if="secList.length > 0" sticky @click="secondClick">
        <van-tab v-for="index in secList" :key="index.id" :title="index.sortName" ></van-tab>
     </van-tabs>
    </div>
    <ul class="clear list_main" :class="{marginTop : navFlag }">
      <!-- <div class="loading" v-if="loading">
        <van-loading type="spinner" color="black" />
      </div> -->
      <van-list
        :finished="finished"
        v-model="pageLoading"
        @load="onLoad"
        :offset="offset"
      >
        <!-- <van-pull-refresh v-model="loading" @refresh="onRefresh"> -->
          <li v-for="(item, index) in shopList" :key='index' @click="showGoodsDetail($event,item.id,item.existCpsEntrance,index)">
            <van-card :title="item.full_name">
            <div slot="thumb" class="classify_thumb">
              <img :src="item.image_url">
              <div class="icon_info icon_info_left" v-show="item.product_ad_attr == 1 ? ( item.product_num_status ? ( item.specialOfferFlag ? true:false ) :  true) : false">{{item.product_num_status ? ( item.specialOfferFlag ? "特价商品" : ''): '无货'}}</div>
              <div class="icon_info icon_info_right" v-show="item.product_ad_attr == 1 ? ( item.product_num_status ? ( item.tag ? true:false ) :  false) : ( item.tag ? true:false )">{{item.tag}}</div>
            </div>
              <div slot="desc" class="desc">
                <div><span>{{item.exchange_points}}</span> 积分</div>
                <!-- <div>原价: {{item.retail_price}}元</div> -->
              </div>
              <div slot="footer" class="foot_sale">
                已售: <span>{{item.sales_base}}</span>件
                <button v-if="item.existCpsEntrance" class="cpsEntrance">{{item.cpsEntrance.entranceButtonName}}</button>
              </div>
            </van-card>
          </li>
          <div class="loadFinish" v-show="noDataInfo">已经到底啦</div>
        <!-- </van-pull-refresh> -->
      </van-list>
    </ul>
  </div>
  </div>
</template>

<script>
import './index.less'
import { Toast } from 'vant'
import BScroll from 'better-scroll'
import banner1 from '@/assets/index/banner1.png'
export default {
  name: 'classify',
  data () {
    return {
      list: [],
      active: 0,
      active1: 0,
      loading: false,
      pageLoading:false,
      finished: false,
      noDataInfo: false,
      shopList: [],
      navFlag: false,
      showLoad: false,
      banner1: banner1,
      offset: Number(10),
      allCateList:[],
      secList:[],
      firActive:'全部',	//选中的一级id
      pageSize:10,	//每页显示条数
      pageNo:0,	//页码
      sortId:'',	//分类id
      sortType:0, //分类类型
      scroll:''
    }
  },
  created () {
  	// this.showLoadding()
    const that = this;
    this.$store.dispatch('commonService',{"apid": 194})
    .then((result) => {
      // console.log(result)
			// this.getGoodsList(0)	//全部商品
            if(result.apidata.code !== 1){
              Toast(result.apidata.message);
              return
            }
        	that.allCateList = result.apidata.data;
        	that.list.push({sortName:'全部',sortType:0})  //默认添加一个全部
        	result.apidata.data.map((item,index) => {
        		that.list.push(item)
        	})
    })
    .catch((error) => {
    	console.log(error)
    })
  },
  methods: {
    onRefresh() { //下拉刷新
      this.pageNo = 0;
      this.getGoodsList()
    },
    clearData() {

    },
  	getGoodsList () {
      const that = this;
      that.pageNo = that.pageNo + 1;
      if(that.pageNo > 2) that.pageLoading = true;
      this.$store.dispatch('commonService',{"apid": 195,
       params: {
        pageSize: that.pageSize,
        pageNo: that.pageNo,
        location:that.sortType,
        sortId:that.sortId
      }})
      .then((result) => {
  			if(result.apidata.code !== 1){
  				Toast(result.apidata.message);
  				return
        }
        if(that.pageNo == 1 ){
          // console.log("1111")
          that.shopList = [];
        }
          // that.pageNo = that.pageNo + 1;
          that.showLoad = false
          that.loading = false
          that.finished = false
          that.noDataInfo = false
          that.pageLoading = false;
          if (result.apidata.data.datas.length <= 0 && that.pageNo > 2) {
            that.finished = true
            that.noDataInfo = true
          }
          if (result.apidata.data.datas.length <= 5) {
            that.finished = true
          }
          // that.shopList.push(result.apidata.data.datas);
          // console.log(that.pageNo,result.apidata.data.datas)
          that.shopList = that.shopList.concat(result.apidata.data.datas);	
          if ( that.shopList.length < 5) {
            that.noDataInfo = false
          }
          if ( that.shopList.length > 5 && result.apidata.data.datas.length <= 10) {
            that.noDataInfo = true
          }

  		})
  	},
    toggle (name,id) {	//点击一级分类
      this.showLoadding()	//显示加载
      this.pageNo = 0;
      this.shopList = [];
      this.pageLoading = false
      this.finished = false;
      this.noDataInfo = false
    	if(name !== '全部'){
    		this.secList = [];
    		this.allCateList.map((item,index) => {
	      	if(item.id === id && item.sortChildren && item.sortChildren.length > 0){  //如果有子类
            this.secList.push({sortType:1,sortName:'全部',id:item.id})  //添加一个二级全部
            this.secList = this.secList.concat(item.sortChildren) //剩下的数据进行拼接
	      	}
	      })
    		this.active1 = 0; //二级分类高亮显示tab
    		this.sortId = id	//点击的id存储起来用来发送请求
        this.sortType = 1;
    		this.getGoodsList()	//获取一级分类商品下列表
    		this.secList.length > 0 ? this.navFlag = true : this.navFlag = false;	//如果有二级就显示，没有则不显示二级导航
    	}else {
    		this.navFlag = false
        this.sortId = '';	//点击全部时id置空
        this.sortType = 0;
    		this.getGoodsList()
    	}
      this.firActive = name;
      
    },
    showLoadding() {
      this.loading = true;
      this.handleScroll()
      this.shopList = []
    },
    showGoodsDetail(event,goodsId,existCpsEntrance,index) { //是否跳转到商品详情
      const entranceUrl = this.shopList[index].cpsEntrance ? this.shopList[index].cpsEntrance.entranceUrl : ''
      if(existCpsEntrance){ //存在cps入口 只有点击按钮才可跳转
        event.target.className == "cpsEntrance" ? this.$router.push({path: '/cpsDetail', query: {entranceUrl: entranceUrl}}) : ''
      }else{  //不存在cps入口
        this.$router.push({path: '/goodDetail', query: {id: goodsId}})
      }
    },
    onLoad () {
      this.getGoodsList()	    
    },
    secondClick (index) {
    	this.active1 = index;
    	this.sortId = this.secList[index].id	//点击的id存储起来用来发送请求
      this.showLoadding()	//显示加载
      this.sortType = this.secList[index].sortType;
      this.pageNo = 0;
      this.shopList = [];
      this.pageLoading = false
			this.getGoodsList()	//获取一级分类商品下列表
    },
    handleScroll () {
      // window.pageYOffset = 0
      // document.documentElement.scrollTop = 0
      // document.body.scrollTop = 0
    },
    toggleNav () {
      this.showLoad = true
      this.handleScroll()
      this.shopList = []
      this.finished = true
      this.onLoad()
    },
    _initScroll(){
      if(!this.$refs.wrapper){
        return 
      }

      this.scroll=new BScroll(this.$refs.wrapper,{
        scrollY: true,
        click:true
      })
    }
  },
  mounted() {
    const _this = this; 
    setTimeout(()=>{
      _this.scroll = new BScroll(_this.$refs.wrapper,{
        scrollY:true,
        click:true
      });
    },20)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
