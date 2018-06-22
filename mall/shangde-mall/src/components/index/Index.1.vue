<template>
  <div class="index_content">
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
    <div class="carouser">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item,index) in lunboList" :key="index">
           <img :src="item.img_url" @click='linkTo(item.redirect_url)'/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="hart_main">
     <van-cell value="心愿单" class="hart" :center="center" :border="border">
        <div slot="right-icon" class="hart_more"><router-link to='/hart'><span>查看更多</span><van-icon name="arrow" /></router-link></div>
      </van-cell>
      <div class="list">
        <ul class="clear">
          <li v-for="(item, index) in hartList" :key="index">
            <router-link :to="{path:'/goodDetail',query:{id:item.id}}">
              <img :src="item.image_url" />
              <div class="exchange">{{item.is_favorites >0 ? (Number(item.buy_percent) >= 1 ? "去兑换" : item.total_balance +'/'+ item.exchange_points ):'收藏'}}</div>
              <div class="icon_info icon_info_left" v-show="item.product_ad_attr == 1 ? ( item.product_num_status ? ( item.specialOfferFlag ? true:false ) :  true) : false">{{item.product_num_status ? ( item.specialOfferFlag ? "特价商品" : ''): '无货'}}</div>
              <div class="icon_info icon_info_right" v-show="item.product_ad_attr == 1 ? ( item.product_num_status ? ( item.tag ? true:false ) :  false) : ( item.tag ? true:false )">{{item.tag}}</div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- </van-pull-refresh> -->
    <div class="hot_shop" v-show="hotList.length > 0 ? true:false">
     <van-cell value="热卖商品" class="hart" :center="center" :border="border">
       <div slot="right-icon" class="hart_more"><router-link to='/classify'><span>查看更多</span><van-icon name="arrow" /></router-link></div>
     </van-cell>
      <div class="hot_list">
        <HotShop :hot='hotList'/>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import './index.less'
import { Toast } from 'vant'
import HotShop from './HotShop'
import banner1 from '@/assets/index/banner1.png'
import banner2 from '@/assets/index/banner2.png'
export default {
  name: 'Index',
  components: {
    HotShop
  },
  data () {
    return {
      lunboList: [{img_url:banner1}, {img_url:banner2}],
      isLoading: false,
      center: Boolean(true),
      border: Boolean(false),
      hotList: [],
      hartList:[]
    }
  },
  methods: {
    onRefresh () {
      this.isLoading = true
      this.getBannerData()
      // console.log("1111")
      // this.getHotData()
      // this.getHartData()
    },
    linkTo(imgUrl) {
      if(imgUrl) {
        window.location.href=imgUrl
      }
      
    },
    getHartData () {
      let that = this
      this.$store.dispatch('commonService',{"apid": 176,
        params: {
          pageSize: "3",
          pageNo: "1",
        }})
      .then((result) => {
        if( result.apidata.code == 1) {
          that.hartList = result.apidata.data.datas
          if( that.isLoading ) that.getHotData()
          // console.log(result.apidata.data)
        }else{
          Toast(result.apidata.message);
        }
      })
      .catch((error) => {
        console.log(error)
      })
    },
    getHotData () {
      let that = this
      this.$store.dispatch('commonService',{"apid": 199, // 196改为199
        params: {
          pageSize: "10",
          pageNo: "1",
          limitNum: '6'
        }})
      .then((result) => {
        if( result.apidata.code == 1) {
          
          that.hotList = result.apidata.data
          that.isLoading = false
        }else{
          Toast(result.apidata.message);
        }
      })
      .catch((error) => {
        console.log(error)
      })
    },
    getBannerData () {
      let that = this
      this.$store.dispatch('commonService',{"apid": "218", params:{}})
      .then((result) => {
        // console.log(result)
        if( result.apidata.code == 1) {
          that.lunboList = result.apidata.data
          if( that.isLoading ) that.getHartData()
        }else{
          Toast(result.apidata.message);
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  created () {
    this.getBannerData()
    this.getHotData()
    this.getHartData()
  },
  mounted() {
  	const _this = this; 
    setTimeout(()=>{
      _this.scroll = new BScroll(_this.$refs.wrapper,{
        scrollY:true,
        click:true,
        pullDownRefresh:{
        	threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
          stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
        },
        pullUpLoad:{
        	threshold: 20, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
        }
      });
      _this.scroll.on('pullingDown', () => {
  // 刷新数据的过程中，回弹停留在距离顶部还有20px的位置
			    console.log("下拉刷新")
			    _this.loading = true
			    
			      // 在刷新数据完成之后，调用 finishPullDown 方法，回弹到顶部
			      setTimeout( () => {
			      	_this.scroll.finishPullDown()
			      	_this.loading = false
			      },20000 )
			    
			})
      _this.scroll.on('pullingUp', () => {
			  console.log("上拉加载")
			  let arr = [11,12,13,14,15,16,17,18,19]
			  _this.list = _this.list.concat(arr)
			  _this.scroll.refresh()
			  _this.scroll.finishPullUp()
			})
    },20)
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>

</style>
