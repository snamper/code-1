<template>
  <!-- 积分明细列表 -->
  <div class="order_content">
   <div class="order_nav" @click="hidepULLDownBox()">
     <div class="posBg">
      <img class="pageBg" :src="pageBg" alt="">
      <ul class="pointTypeBox clear">
        <li class="pointType"><span class="nowPointNum">{{nowPointNum}}</span><span class="nowPointText">当前积分</span></li>
        <li class="pointLine"></li>
        <li class="pointType"><span class="totalGainNum">{{totalGainNum}}</span><span class="totalGainText">累计获取</span></li>
        <li class="pointLine"></li>
        <li class="pointType"><span class="consumNum">{{consumNum}}</span><span class="consumText">累计消费</span></li>
      </ul>
     </div>
   </div>
   <div class="selectBox clear">
     <div class="deal allDealBox fl">
       <div class="allDealHead" @click="allDealClick()">{{selAllDealText?selAllDealText:'全部交易'}}<span class="dealIcon allDealIcon"></span></div>
       <div class="pullDownBox" v-show="allDealDownBox">
         <ul class="pullLisBox">
           <li class="pullLisIcon"><i></i></li>
           <li class="pullLis" @click="getAllDealVal({type:'0',name:'全部交易'})">全部交易</li>
           <li class="pullLis" @click="getAllDealVal({type:'1',name:'积分获取'})">积分获取</li>
           <li class="pullLis" @click="getAllDealVal({type:'2',name:'积分支出'})">积分支出</li>
         </ul>
       </div>
     </div>
     <div class="fl dealLine"></div>
     <div class="deal dealTimeBox fl">
       <div class="dealTimeHead" @click="dealTimeClick()">{{selDealTimeText?selDealTimeText:'交易时间'}}<span class="dealIcon dealTimeIcon"></span></div>
       <div class="pullDownBox" v-show="dealTimeDownBox">
         <ul class="pullLisBox">
           <li class="pullLisIcon"><i></i></li>
           <li class="pullLis" @click="getDealTimeVal({type:'0',name:'交易时间'})">交易时间</li>
           <li class="pullLis" @click="getDealTimeVal({type:'1',name:'今天'})">今天</li>
           <li class="pullLis" @click="getDealTimeVal({type:'2',name:'一周'})">一周</li>
           <li class="pullLis" @click="getDealTimeVal({type:'3',name:'一个月'})">一个月</li>
         </ul>
       </div>
     </div>
   </div>
   <div class="order_list" @click="hidepULLDownBox()">
    <div class="loading" v-if="showLoad">
      <div class="loading_main clear">
        <van-loading color="black" /><span>加载中...</span>
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      @load="turnPage"
      :offset="offset"
      >
      <div class="order_empty" v-show="!isShop">
        <p class="noDatas">暂无数据</p>
      </div>
      <ul class="order_list_main" v-show="isShop">
        <li v-for="item in shopList" :key='item.id' class="clear">
          <span class="approachText fl">{{item.descr}}</span>
          <span class="approachBox fr">
            <span class="pointNum">{{item.points == '0'?'0':item.type == '1'?'+':'-'+item.points}}</span>
            <span class="getTime">{{item.create_time}}</span>
          </span>
        </li>
      </ul>
      <div class="no_data_info clear" v-show="dataFlag">没有更多数据了...</div>
    </van-list>
   </div>
  </div>
</template>
<script>
import {formatDate} from '@/components/mine/cardBag/date.js'
import pageBg from '@/assets/test.png'
import {Dialog} from 'vant'
import './index.less'
export default {
  name: 'pointDetial',
  data () {
    return {
      pageBg: pageBg,//背景图
      userid: '',//当前用户id
      nowPointNum: '',//当前积分
      totalGainNum: '',//累计获取
      consumNum: '',//累计消费
      selAllDealText: '',//全部交易选择项
      selDealTimeText: '',//交易时间选择项
      allDealDownBox: false,//初始化隐藏全部交易下拉框
      dealTimeDownBox: false,//初始化隐藏交易时间下拉框
      type: '0',//全部交易类型初始化
      dateType: '0',//交易时间初始化
      loading: false,
      finished: false,
      shopList: [],
      showLoad: false,
      offset: Number(10),
      isShop: true,
      pageNo:0, //默认页码
      dataFlag: false,//加载数据时无更多数据
    }
  },
  mounted: function (){
    document.addEventListener('click', (e) => {//点击其他地方就隐藏掉下拉框
       if (!this.$el.contains(e.target)) this.allDealDownBox = false
    })
    window.addEventListener('scroll', (e) => {//当前页面滑动就隐藏掉下拉框
      this.allDealDownBox = false//隐藏全部交易下拉框
      this.dealTimeDownBox = false//隐藏交易时间下拉框
    })
  },
  created () {
    this.userid = String(this.$route.query.userid)
    this.$store.dispatch('commonService',{"apid": 54,//积分明细调用
      params: {// 需要传的参数集合
        id: String(this.$route.query.userid),//当前用户id
        type: String(this.type),//全部交易类型
        dateType: String(this.dateType),//交易时间类型
        pageNo: '1',
        pageSize: '10'
    }})
    .then((result) => {
      this.nowPointNum = result.apidata.data.all.uScoreBalance //赋值当前积分
      this.totalGainNum = result.apidata.data.all.uScoreAll //赋值累计获取
      this.consumNum = result.apidata.data.all.uScoreExpenseAll //赋值累计消费
    })
    .catch((error) => {

    });
  },
  methods: {
    routergo: function () {
      this.$router.back(-1)
    },
    allDealClick: function (){
      this.dealTimeDownBox = false//隐藏交易时间下拉框
      this.allDealDownBox = true//显示全部交易下拉框
    },
    dealTimeClick: function (){
      this.allDealDownBox = false//隐藏全部交易下拉框
      this.dealTimeDownBox = true//显示交易时间下拉框
    },
    getAllDealVal: function (data){//选择全部交易下拉列表的内容
      this.selAllDealText = data.name//赋值选择的内容到显示区域
      this.allDealDownBox = false//隐藏全部交易下拉框
      this.type = data.type// 赋值全部交易类型
      this.pageNo = 0
      this.shopList = []
      this.finished = false
      this.turnPage()
    },
    getDealTimeVal: function (data){//选择交易时间下拉列表的内容
      this.selDealTimeText = data.name//赋值选择的内容到显示区域
      this.dealTimeDownBox = false//隐藏交易时间下拉框
      this.dateType =data.type// 赋值交易时间类型
      this.pageNo = 0
      this.shopList = []
      this.finished = false
      this.turnPage()
    },
    hidepULLDownBox: function (){
      this.allDealDownBox = false//隐藏全部交易下拉框
      this.dealTimeDownBox = false//隐藏交易时间下拉框
    },
    turnPage () {
      this.pageNo += 1;
      const data = {
        apid:"54",
        params:{
          pageNo: String(this.pageNo),
          id: String(this.$route.query.userid),//当前用户id
          type: this.type,//全部交易类型
          dateType: this.dateType,//交易时间类型
          pageSize: '10'
        }
      };
      this.loadData(data)  //此处需单独调用查询积分明细列表接口做'数据已经加载完成'处理。
    },
    loadData (data) {
      const _this = this;
      const defaultData = {apid:"54",params:{
        'pageNo':'1',
        'pageSize':'10',
        'status':_this.pageStatus,
        }};
      if(!data){
        data = defaultData;
      }
      this.$store.dispatch('commonService',data).then(function(res){
        if(res.apidata.data.dataInfo.datas.length>0){  //有积分明细数据
          _this.shopList =_this.shopList.concat(res.apidata.data.dataInfo.datas);
          _this.isShop = true;
          _this.loading = false;
          if( _this.shopList.length < 10  ) {
              _this.finished = true;
              _this.dataFlag = false
          }
        }else{ //无积分明细数据
          _this.finished = true;
          _this.loading = false;
          if(_this.shopList.length <1 && res.apidata.data.dataInfo.datas.length <1 ){
            _this.isShop = false;
            _this.dataFlag = false;
          }else{
            if(_this.shopList.length > 9) {
              _this.dataFlag = true
            } else {
              _this.dataFlag = false
            }
          }
        }
      _this.showLoad = false;
        }).catch((error) => {

        });
    },
    handleScroll () {
      window.pageYOffset = 0
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
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
<style scoped>

</style>
