<template>
  <div class='wrap'>
  <div class='header'>
    <img src="./../../assets/mine/mine-top-bg.png" class="headerBg" alt="">
  <div class="headerFont">
  <span class="left headerFontName">{{name}}</span>
  <div class='right head_portrait'>
  <img src="@/assets/mine/ic_integrel_self_logo.png" alt="" />
  </div>
  </div>
  </div>
  <router-link to="/order/serviceCenter">
     <img src="./../../assets/mine/customer.jpg" class='customer' alt="">
  </router-link>
  <div class="link_wrap">
  <router-link class='like_li' to="/order">
  <img class='left' src="./../../assets/mine/my_order_icon.png" alt="">
  <span class='left item_list'>我的订单</span>
  </router-link>
  <router-link class='like_li' :to="{path: '/pointDetial', query: {userid: this.userId}}">
  <img class='left' src="./../../assets/mine/my_detail_icon.png" alt="">
  <span class='left item_list'>积分明细</span>
  </router-link>
  <router-link class='like_li' to="/cardBag">
  <img class='left' src="./../../assets/mine/my_card_icon.png" alt="">
  <span class='left item_list' >我的卡包</span>
  </router-link>
  <router-link class='like_li' to="/hart">
  <img class='left' src="./../../assets/mine/icon_my_collect.png" alt="">
  <span class='left item_list' >我的心愿单</span>
  </router-link>
  </div>
  </div>
</template>
<script>
export default {
  name: 'Mine',
  data () {
    return {
      name:"赚动",
      userId: '',//用户id
    }
  },
  created () {
    let that = this
    this.$store.dispatch('commonService',{"apid": "53", params:{}})
      .then((result) => {
        // console.log(result)
        if( result.apidata.code == 1) {
          that.name = result.apidata.data.NAME
          that.userId = result.apidata.data.id
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

}
</script>
<style lang='less' scoped>
.wrap {
  width:100%;
  position: relative;
  .left {
  float:left;
  }
  .right {
  float:right;
  }
  .header{
  position: relative
  }
  .headerBg{
  display:block;
  width:100%;
  }
  .headerFont{
  position: absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  .headerFontName {
  font-size: .31rem;
  color:white;
  font-weight: 700;
  position: absolute;
  bottom:.56rem;
  left:.35rem;
  }
  }
  .head_portrait {
  width:.87rem;
  height:.87rem;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  overflow: hidden;
  /*background-color: white; */
  position: absolute;
  right:.36rem;
  bottom:.22rem;
  font-size: 0;
  img{
  width:100%;
  height:100%
  }
  }
  .customer {
  width:1.95rem;
  height:.61rem;
  margin:.35rem 0 0 .35rem;
  display: block
  }
  .link_wrap{
  width:92%;
  margin:0 auto;
  .like_li{
  border-bottom:1px solid #dcdcdc;
  height:.86rem;
  display: block;
  img{
  margin-left:.15rem;
  width:.35rem;
  margin-top:.25rem;
  }
  .item_list {
  color:#2e2e2e;
  font-size: .23rem;
  line-height: .86rem;
  margin-left: .26rem;
  }
  }
  .no-border{
  border:none;
  }
  }
  }
</style>
