<template>
  <div class='footer'>
    <ul class="footer_nav">
    <li><router-link active-class="router-link-active" to="/index">
      <i class="indexIcon"></i>
      <span>首页</span>
    </router-link></li>
    <li><router-link active-class="router-link-active" to="/classify">
      <i class="classIcon"></i>
      <span>分类</span>
    </router-link></li>
    <li><router-link active-class="router-link-active" to="/mine">
      <i class="mineIcon"></i>
      <span>我的</span>
    </router-link></li>
  </ul>
  </div>
</template>
<script>
import './test.less'
export default {
  name: 'Footer'
}
</script>
<style lang='less' scoped>
.footer{
  // height: 1.12rem;
  height: 10vh;
  width: 100%;
  background: #fff;
  color: #282828;
  font-size: .204rem;
  position: fixed;
  left: 0;
  bottom: 0;
  border-top:1px solid #e7e7e7;
  z-index: 10000;
  .footer_nav {
      width: 100%;
      li{
          float: left;
          width: 33.33%;
          a{
            display: block;
          }
          i{
            display: block;
            width: 0.34rem;
            height:0.34rem;
            margin-left: 0.855rem;
            margin-top: .272rem;
          }
          span{
            display: block;
            width: 100%;
            height:0.51rem;
            font-size: 0.204rem;
            letter-spacing: 0.068rem;
            line-height: 0.51rem;
          }
          .router-link-active {
              color: #f36e6e;
          }
      }
      i.indexIcon{
       background: url('./../../assets/index.png') no-repeat;
       background-size: 100%;
      }
      i.classIcon{
       background: url('./../../assets/classfly.png') no-repeat;
       background-size: 100%;
      }
      i.mineIcon{
       background: url('./../../assets/my.png') no-repeat;
       background-size: 100%;
      }
      .router-link-active{
        i.indexIcon{
       background: url('./../../assets/index1.png') no-repeat;
       background-size: 100%;
      }
      i.classIcon{
       background: url('./../../assets/classfly1.png') no-repeat;
       background-size: 100%;
      }
      i.mineIcon{
       background: url('./../../assets/my1.png') no-repeat;
       background-size: 100%;
      }
      }
  }
}
</style>
