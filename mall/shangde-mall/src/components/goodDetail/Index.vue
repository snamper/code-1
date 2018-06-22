<template>
  <div class="good_detail">
   <div class="header">
    <van-nav-bar title="商品详情"  left-arrow @click-left="routergo" />
    <span v-show="collectIcon">
      <img class="collectIcon" @click="changeCollectIcon" :src="collectStas == '2'?collect1:collect2" ref="collectIcon" alt="收藏">
    </span>
   </div>
   <div class="good_detail_content">
      <div class="carouser">
        <van-swipe :autoplay="3000" :show-indicators='indicators'>
          <van-swipe-item v-for="(item,index) in lunboList" :key="index"><img :src="item"/></van-swipe-item>
        </van-swipe>
      </div>
      <div class="detail_main">
        <div class="good_name">{{goodsName}}</div>
        <div class="good_info"><span class="pointNum">{{goodsPoint}}</span><span class="pointText"> 积分</span>　库存：{{goodsStock}}件</div>
        <span class="soldNum">已售：<span class="redNum">{{goodsSold}}</span> 件</span>
      </div>
      <div class="safeguardBox">
        <ul class="safeguard clear">
          <li class="deliverIcon"><img :src="safeguard1" alt="闪电发货" /><span>闪电发货</span></li>
          <li class="compensateIcon"><img :src="safeguard2" alt="假一赔十" /><span>假一赔十</span></li>
          <li class="qualityIcon"><img :src="safeguard3" alt="正品保障" /><span>正品保障</span></li>
        </ul>
      </div>
      <div class="purchaseBox">
        <h4>购买须知：</h4>
        <div class="purchaseBoxDetail" v-for="(item,index) in proExtends" :key="item.id">
          <h4 class="redNum">{{item.attrDicNameCN}}</h4>
          <p>{{item.detailDesc}}</p>
        </div>
        <!-- <h4 class="redNum">使用流程：</h4>
        <p>{{useFlow}}</p>
        <h4 class="redNum">法律声明：</h4>
        <p>{{statement}}</p>
        <h4 class="redNum">使用有效期：</h4>
        <span class="validTimes">{{validity}}</span> -->
      </div>
      <!-- 底部固定的付款操作 -->
      <div class="footerPayBox">
        <div class="payInfoBox" v-show="bottomStatus">
          <span class="payInfoText">积分余额: <span class="redNum">{{userScore}}</span></span>
          <!-- <router-link v-if="goodsStock" :to="{path:'/order/confirmOrder',query:{id:productId}}"> -->
          <span class="payBtn" v-if="goodsStock" @click="goconfirmOrder({id:productId})" :class="{payBtnBg: goodsStock}">立即购买</span>
          <!-- </router-link> -->
          <span v-else class="payBtn noStockBtnBg">库存不足</span>
        </div>
      </div>
   </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import './index.less'
import safeguard1 from '@/assets/goodsDetial/icon_mall_ship.png'
import safeguard2 from '@/assets/goodsDetial/icon_mall_compensation.png'
import safeguard3 from '@/assets/goodsDetial/icon_mall_genuine.png'
import collect1 from '@/assets/goodsDetial/goods_not_collection.png'//未收藏
import collect2 from '@/assets/goodsDetial/goods_collected.png'//已收藏
export default {
  name: 'hart',
  data () {
    return {
      productId: '',//商品id
      lunboList: '',// 轮播图数据初始化
      indicators: Boolean(false),// 去除轮播图里的索引(跟随轮播的点点点)
      safeguard1: safeguard1,// 保障说明图标
      safeguard2: safeguard2,// 保障说明图标
      safeguard3: safeguard3,// 保障说明图标
      collectIcon: false,// 控制收藏图标展示框的显示隐藏
      collectStas: '',// 控制收藏图标的显示隐藏状态
      collect1: collect1,// 收藏图标1
      collect2: collect2, // 收藏图标2
      goodsName: '',// 商品名字
      goodsPoint: '',//商品积分
      goodsSold: '',//商品已售数量
      goodsStock: '',//库存
      bottomStatus: false,//底部状态区域初始化不显示，等待数据加载完成显示，防止有库存/无库存文案跳闪
      userScore: '',//积分余额
      validity: '',//使用有效期
      announcements: '',//注意事项
      useFlow: '',//使用流程
      statement: '',//法律声明
      dataListInfo:'',
      proExtends:''
    }
  },
  created () {
    let thisId = String(this.$route.query.id) //当前商品的id
    this.productId = thisId // 赋值商品id，传到提交订单页面
    this.$store.dispatch('commonService',{"apid": 110,
        params: {// 需要传的参数集合
        productId: thisId
      }})
    .then((result) => {
      this.bottomStatus = true;//底部状态区域初始化不显示，等待数据加载完成显示，防止有库存/无库存文案跳闪
      this.collectIcon = true;// 该商品的收藏显示框的状态
      this.collectStas = result.apidata.data.favorite_status// 该商品的收藏状态
      this.lunboList = result.apidata.data.product_bananer// 赋值轮播图数据
      this.goodsName = result.apidata.data.full_name// 赋值商品名字
      this.goodsPoint = result.apidata.data.exchange_points// 赋值商品积分
      this.goodsSold = result.apidata.data.sales_base// 赋值商品已售数量
      this.goodsStock = result.apidata.data.stock_num// 库存
      this.userScore = result.apidata.data.userScore// 积分余额
      this.proExtends = result.apidata.data.pro_extends //购买须知的综合数据
      this.dataListInfo = result.apidata.data.product_describe
      // for(var i=0;i<proExtends.length;i++){
      //   if(proExtends[i].attrDicName == 'usefulTime'){//  使用有效期
      //     this.validity = proExtends[i].detailDesc// 更新有效期
      //   }else if(proExtends[i].attrDicName == 'announcements'){// 注意事项
      //     this.announcements = proExtends[i].detailDesc// 更新注意事项
      //   }else if(proExtends[i].attrDicName == 'useFlow'){// 使用流程
      //     this.useFlow = proExtends[i].detailDesc// 更新使用流程
      //   }else if(proExtends[i].attrDicName == 'statement'){// 法律说明
      //     this.statement = proExtends[i].detailDesc// 更新法律说明
      //   }
      // }
    })
    .catch((error) => {
    	console.log(error)
    });
  },
  methods: {
    routergo: function () {
      this.$router.back(-1)
    },
    changeCollectIcon: function () {// 收藏按钮点击
      let thisId = this.$route.query.id.toString() //当前商品的id
      if(this.collectStas == '2'){//判断当前商品是否已收藏 1:已收藏  2：未收藏
        this.$store.dispatch('commonService',{"apid": 175,//收藏商品
          params: {// 需要传的参数集合
          id: thisId
        }})
        .then((result) => {
          this.collectStas = '1'
          Toast.success('收藏成功')
        })
        .catch((error) => {
          console.log(error)
        });
      }else{
        this.$store.dispatch('commonService',{"apid": 177,//取消收藏商品
          params: {// 需要传的参数集合
          ids: thisId,
          type: '2'
        }})
        .then((result) => {
          this.collectStas = '2'
          Toast.success('已取消收藏')
        })
        .catch((error) => {
          console.log(error)
        });
      }
    },
    goconfirmOrder(data){
   // console.log(sessionStorage['token'])   current
    if(!sessionStorage['token']){      
      // window.location.href = `/#/login`; 
      sessionStorage['currentRouterInfo'] = data.id
      this.$router.replace({path:'/login'})
    }else{
      this.$router.push({path:'/order/confirmOrder',query:{id:data.id}})
    }  
    }
  },
  mounted() {
    // window.location.reload()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>

</style>
