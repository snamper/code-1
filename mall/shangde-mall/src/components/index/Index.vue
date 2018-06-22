<template>
  <div class="index_content" ref="wrapper1">
    <div class="index_content_main clear" >
      <!-- <div class="index_content_margin"></div> -->
      <van-loading type="spinner" color="black" v-show="loading" />
      <div class="carouser">
        <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in lunboList" :key="index" @click='linkTo(item.redirect_url)'>
            <!-- <img src="./../assets/images/logos1.png" alt=""> -->
            <img :src="item.img_url"/>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      </div>
      <div class="hart_main">
      <van-cell value="心愿单" class="hart" :center="center" :border="border">
          <div slot="right-icon" class="hart_more"><router-link to='/hart'><span>查看更多</span><van-icon name="arrow" /></router-link></div>
        </van-cell>
        <div class="list" ref="hart">
          <ul class="clear">
            <li v-for="(item, index) in hartList" :key="index">
              <router-link :to="{path:'/goodDetail',query:{id:item.id}}">
                <img :src="item.image_url" />
                <div class="exchange" v-show='false'>{{item.is_favorites >0 ? (Number(item.buy_percent) >= 1 ? "去兑换" : item.total_balance +'/'+ item.exchange_points ):'收藏'}}</div>
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
  </div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper.min.js'
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
      lunboList: [],
      isLoading: false,
      center: Boolean(true),
      border: Boolean(false),
      hotList: [],
      hartList:[],
      scroll:'',
      hartScroll:'',
      loading:false,
      mySwiper:''
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
        // console.log("22")
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
          that.loading = false
          that.scroll.finishPullDown()
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
        that.lunboList=[]
        if( result.apidata.code == 1) {
          that.lunboList = result.apidata.data
          if( that.isLoading ) {
            that.getHartData()
          }
          // that.swiper.update()
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
    let href = window.location.href
    
    if(href.indexOf("code=") >= 0 && href.split("code=")[1].split("&")[0]){
      sessionStorage['code'] = href.split("code=")[1].split("&")[0];
    }
    this.getBannerData()
    this.getHotData()
    this.getHartData()
  },
  mounted() {
    const _this = this; 
    setTimeout(()=>{
      _this.scroll = new BScroll(_this.$refs.wrapper1,{
        scrollY:true,
        // scrollX:false,
        scrollbar:false,
        click:true,
        bounceTime:500,
        pullDownRefresh:{
          threshold: 60, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
          stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
        }
      });
      _this.scroll.on('pullingDown', () => {
          _this.isLoading = true
          _this.loading = true
          _this.getBannerData()
            // 在刷新数据完成之后，调用 finishPullDown 方法，回弹到顶部
      })
      
      _this.hartScroll = new BScroll(_this.$refs.hart,{
        scrollX:true,
        scrollbar:false,
        click:true
      });
      
    },20)

    setTimeout( ()=> {
        _this.mySwiper = new Swiper('.swiper-container', { // eslint-disable-line no-unused-vars
          loop: true,
          speed: 1000,
          autoplay: {
            delay: 4000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          observer:true,//修改swiper自己或子元素时，自动初始化swiper 
          observeParents:true,//修改swiper的父元素时，自动初始化swiper 
          onSlideChangeEnd: function(swiper){ 
  　　　     swiper.update();  
  　　　     mySwiper.startAutoplay();
  　　       mySwiper.reLoop();  
          } 
      })
    },500)
     
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>

</style>
