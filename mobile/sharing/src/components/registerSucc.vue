<template id="registerSucc">
  <div class="wrap wrapSiginPage">
    <div class="register_goods">
      <ul class="goods_top">
        <li></li>
        <li>热门商品兑换专区</li>
        <li></li>
      </ul>
      <ul class="goods_content">
        <li>
          <img src="../images/register/goods1.png" alt="" />
          <h3>1个月爱奇艺会员</h3>
        </li>
        <li>
          <img src="../images/register/goods2.png" alt="" />
          <h3>公交一卡通</h3>
        </li>
        <li>
          <img src="../images/register/goods3.png" alt="" />
          <h3>10元滴滴打车券</h3>
        </li>
        <li>
          <img src="../images/register/goods4.png" alt="" />
          <h3>饿了么现金券</h3>
        </li>
        <li>
          <img src="../images/register/goods5.png" alt="" />
          <h3>酷我会员</h3>
        </li>
        <li>
          <img src="../images/register/goods6.png" alt="" />
          <h3>手机话费充值</h3>
        </li>
        <div style="clear:both;height: 0;overflow:hidden"></div>
      </ul>
    </div>
    <div class="register_area succMessage_area">
      <p class="succMessage">恭喜您完成邀请注册！</p>
      <p class="succMessage succMessage1">前去下载应用领取邀请奖励!</p>
      <button class="toDownload" v-on:click="downloadApp">前去下载应用</button>
    </div>
    <div class="share_tips" v-show="downFlag">
      <img class="share_tips_close" src="../images/close.png" v-on:click="closeTips" alt="" />
      <div class="tips_icon"></div>
    </div>
  </div>
</template>

<script src="../controller/shareRegisterSucc.js"></script>
<style>
	@import '../css/registerSucc.css';
</style>