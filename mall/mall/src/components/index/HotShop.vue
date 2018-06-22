<template>
  <div class="hot">
    <div class="list">
      <ul class="clear">
        <li v-for="(item, index) in hot" :key="item.id">
          <router-link :to="{path:'/goodDetail',query:{id:item.id}}">
          <div class="icon_info icon_info_left" v-show="item.product_ad_attr == 1 ? ( item.product_num_status ? ( item.specialOfferFlag ? true:false ) :  true) : false">{{item.product_num_status ? ( item.specialOfferFlag ? "特价商品" : ''): '无货'}}</div>
              <div class="icon_info icon_info_right" v-show="item.product_ad_attr == 1 ? ( item.product_num_status ? ( item.tag ? true:false ) :  false) : ( item.tag ? true:false )">{{item.tag}}</div>
          <img :src="item.image_url">
          <div class="names">{{item.full_name}}</div>
          <div class="detail">
            <div class="point">
             <span>{{item.exchange_points ? item.exchange_points : 0 }}</span>积分
            </div>
            <div class="sale">
              销量:&nbsp;<span>{{item.sales ? item.sales : 0}}</span>份
            </div>
         </div>
         </router-link>
        </li>
      </ul>
     </div>
   </div>
</template>

<script>
export default {
  name: 'wish',
  props: {
    hot: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.hot{
  width: 100%;
  padding: 0 3%;
  // padding-bottom: 1.12rem;
  background: #fff;
  .title{
   width: 100%;
   height: 0.816rem;
   background: #fff;
   font-size: 0.306rem;
   h5{
    width: 30%;
    float: left;
    color: #292929;
    text-align: left;
    line-height: 0.816rem;
   }
   .more{
    float: right;
    width: auto;
    height: 100%;
    text-align: center;
    font-size: 0.204rem;
    line-height: 0.816rem;
    color: #FF6869;
   }
  }
  .list{
    ul{
     width: 100%;
     li{
      float: left;
      width: 48%;
      height: 2.856rem;
      font-size: 0;
      margin-bottom: 0.1rem;
      border-bottom: 1px solid #F0F0F0;
      background: #fff;
      position: relative;
      .icon_info{
        position: absolute;
        top: 0.2rem;
       padding: 0.05rem 0.1rem;
        width: auto;
        height: auto;
        color:#fff;
        font-size: 0.17rem;
        background: #ff6767;
      }
      .icon_info_left{
        left: 0;
        border-bottom-right-radius: 0.05rem;
        border-top-right-radius: 0.05rem;
      }
      .icon_info_right{
        right: 0rem;
        border-bottom-left-radius: 0.05rem;
        border-top-left-radius: 0.05rem;
      }
      img{
       width: 100%;
       height: 1.768rem;
       border-radius: 0.068rem;
     }
       .names{
        width: 100%;
        height: 0.28rem;
        font-size: 0.22rem;
        color: #292929;
        text-align: left;
        line-height: 0.255rem;
        margin: 0.204rem 0 0.17rem;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
       }
       .point{
        width: 50%;
        height: 0.34rem;
        float: left;
        font-size: 0.204rem;
        text-align: left;
        line-height: 0.34rem;
        color: #808080;
        span{
         font-size: 0.248rem;
         color: #F66E6E;
         padding-right: 0.04rem;
        }
       }
       .sale{
        width: 50%;
        height: 0.34rem;
        float: left;
        text-align: right;
        font-size: 0.204rem;
        line-height: 0.34rem;
        color: #808080;
       }
      }
      li:nth-child(2n){
       width: 48%;
       margin-left: 4%;
      }
     }
  }
  img{
   width: 100%;
  }
}
</style>
