<template>
  <div id="app">
    <img src="./assets/top.png" class='topImg' alt="">
    <img src="./assets/font.png" class='fontImg' alt="">
    <img src="./assets/banner.png" class='bannerImg' alt="">
    <div class='from-group'>
      <div class='inline-form'>
        <input type="text" maxlength="11" @input='openBtn' v-model='phone' class='username' placeholder="请输入手机号码" />
      </div>
      <div class='inline-form'>
        <input type="number" v-model='code' class="code left" placeholder="短信验证码"  @input='openSubmit' />
        <button class='code-btn left' :disabled="btnOn?false:'disabled'" @click="checkPhone" :class="btnOn?'code-btn-on':'code-btn-off'" >{{codeText}}</button>
        <div class="clear"></div>
      </div> 
      <button class='submit-btn' :disabled="submitBtn?false:'disabled'" @click="submitRegister" :class="submitBtn?'submit-btn-on':'submit-btn-off'">点击领取优惠券</button>
      <div class='tip-msg'>{{tipMsg}}</div>
    </div>
    <div class='dashed'></div>
    <div class='content'>
      <p class='title'>使用规则：</p>
      <ul class="item_content">
        <li>1、新用户手机注册领取优惠券，9元尊享VIP月卡；  </li>
        <li>2、领取优惠券成功后，点击进入“赚动”app；</li>
        <li>3、注册手机号码登录“赚动”app，进入我的“优惠券”点击“去使用”，下单成功，请在“我的卡包”查看兑换码；</li>
        <li>4、芒果VIP会员卡可在芒果TV的PC端、移动端使用，不包括TV端；</li>
        <li>5、本活动最终解释权归赚动所有。</li>
      </ul>
    </div>
    <van-popup class='popWrap' v-model='pop'>
      <p class="popTitle">恭喜你</p>
      <div class='popContent'>
        领取优惠券成功！
      </div>
      <div class='popBtn'>
        <button @click='goDownload'>我知道了</button>
        <img src="./assets/btnBg.png" alt="">
      </div>
      <p class='popDes'>
        请进入“赚动”app进行领取芒果tv月卡兑换码
      </p>
    </van-popup>
    <van-popup class="code_box" id='code-box' v-model='showCode'>
      
    </van-popup>
  </div>
</template>

<script>
import axios from 'axios';
import { Dialog } from 'vant';
export default {
  name: 'App',
  methods: {
    initSmcp(){
      const _this = this;
      this.showCode = true;
      setTimeout(function(){
      initSMCaptcha({
        organization:'UPLdPizkPMmRZklBqqit',
        appId:'tyhd',
        appendTo:'code-box',
        onError:function(errType, errMsg) {
          console.log(errMsg)
        }},function(SMCaptcha){
          SMCaptcha.onSuccess(function(data){
            if(data.pass){
              _this.rid = data.rid; //传入rid
              _this.sendCode();
            } 
          }); 
          SMCaptcha.onError(function (errType,errMsg) {
            console.log('onError , errType, errMsg');
          });
        }
      );
      },1)      
    },
    openBtn(){
      this.tipMsg = '';
      if(this.phone.length>0 && !this.snedWait){
        this.btnOn = true; //验证码按钮开启
        if(this.code.length>0){
          this.submitBtn = true; //注册按钮开启
        }        
      }else{
        this.btnOn = false;
        this.submitBtn = false;
      }
    },
    openSubmit(){
      this.tipMsg = '';
      if(this.phone.length>0&&this.code.length>0){
        this.submitBtn = true;
      }else{
        this.submitBtn = false;
      }
    },
    checkPhone(){
      const myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
      if(!myreg.test(this.phone)){ // 手机号格式不正确
        this.tipMsg = '请输入正确的手机号！';
        this.btnOn = false;
        this.submitBtn = false;
      }else{ //判断是否注册 
        this.btnOn = false;
        this.queryPhone();
      }
    },
    queryPhone(){ //验证手机是否已注册;
      const _this = this;
      axios.get('/share/user/h5/register.do',{
        params:{
          telNum:this.phone,
          type:"1"
        }
      }).then(function(res){
        _this.codeOn(res.data);
      }).catch(function(error){
        alert(error);
      })
    },
    codeOn(data){ //判断是否启用验证码按钮;
      if(data.message == "成功"){ //启用
        this.tipMsg = '';
        this.btnOn = true;
        //this.submitBtn = true;
        this.initSmcp();      
      }else{
        this.tipMsg = data.message;
        this.btnOn = false;
        this.submitBtn = false;
      }
    },
    sendCode(){ //获取验证码
      this.showCode = false;
      const _this = this;
      axios.get('/tyuehd/user/phonecode.do',{
        params:{
          phoenNum:_this.phone,
        }
      }).then(function(res){
        if(res.data.message == "成功"){ //成功发送验证码
          _this.indexNum();
        }else{
          _this.tipMsg = res.data.message;
          _this.btnOn = false;
        }
      }).catch(function(error){
        alert(error);
      })
    },
    indexNum(){
      this.btnOn = false;
      this.tipMsg = '';
      let codeNum = 59;
      this.snedWait = true;
      const _this = this;
      const beginIndex =  setInterval(function(){
        _this.codeText = codeNum+' S';
        codeNum--;
        if(codeNum < 1) return _this.timeInterval(beginIndex);
      },1000);
    },
    timeInterval(time){
      clearInterval(time);  //清除计时器；
      this.btnOn = true;
      this.snedWait = false;
      this.codeText = '获取验证码';
    },
    submitRegister(){
      const _this = this;
      if(!_this.queryString('spreadType')||!_this.queryString('spreadId'))
         return  Dialog.alert({
           title:'提示',
           message:'渠道参数有误！'
         }).then(()=>{

         });
      axios.get('/share/user/h5/register.do',{
        params:{
          telNum:this.phone,
          vildCode:this.code,
          type:'2',
          spreadType:_this.queryString('spreadType'),
          spreadChannel:'4',
          spreadId:_this.queryString('spreadId'),
          rid:this.rid,
          productId:"169",
        }
      }).then(function(res){
        if(res.data.message == '成功'){ //注册成功，显示模态框;
          _this.pop = true;
        }else{
          _this.tipMsg = res.data.message;
        }
      }).catch(function(error){
        alert(error);
      });
    },
    goDownload(){
      this.pop = false;
    },
    queryString(name){
      var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
      if(result == null || result.length < 1){
        return "";
      }
      return result[1];
    }
  },
  data() {
    return {
      showCode: false,  //验证显示状态
      tipMsg:'',  //输入校验提示
      phone:'',  //手机号
      code:'',   //验证码
      btnOn:false,  //验证码按钮是否禁用
      pop:false,  //领券弹窗;
      submitBtn:false,
      codeText:'获取验证码',
      snedWait:false,
      rid:''
    }
  }
}
</script>

<style>
#app {
  width: 100%;
}
.topImg {
  width:100%;
  display: block
}
.fontImg {
  width: 100%;
  display: block
}
.bannerImg {
  width:93%;
  display: block;
  margin:10px auto;
}
.username {
  width:100%;
  position: absolute;
  color:#d7a54a;
  border:none;
  background-color: #faedd5;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  text-indent: .1rem;
  margin-top:.17rem;
  display: block;
  font-size:.26rem;
  line-height: .74rem;
  padding:0 3%;
  padding:0;
}
.inline-form {
  width:93%;
  margin:.17rem auto 0 auto;
  position:relative; 
  height: .74rem;
  margin-top:.2rem 
}
.code {
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  border:none;
  background-color: #faedd5;
  text-indent: .1rem;
  font-size:.26rem;
  line-height: .74rem;
  width:60%;
  color:#d7a54a;
  padding-left:3%;
  position:absolute; 
  top:0;
  left:0;
  padding:0;
}
.left {
  float:left;
}
.right {
  float:right;
}
.code-btn{
  color:white;
  font-size:.26rem;
  line-height:.74rem;
  height:.74rem;
  border:none;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  width:34%;
  position:absolute;
  display: block;
  bottom:0rem;
  right:0;
}
.code-btn-on{
  background-color: #ff7a25;
}
.code-btn-off{
  background-color: gray;
}
.submit-btn {
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  display: block;
  margin:.34rem auto 0 auto;
  border:none;
  color:white;
  line-height: .87rem;
  font-size: .35rem;
  width:93%;
  box-shadow:0 4px 0px #d2631d; 
  -moz-box-shadow:0 4px 0px #d2631d; 
  -webkit-box-shadow:0 4px 0px #d2631d; 
}
.submit-btn-on {
  background-color: #ff7a25;
  box-shadow:0 4px 0px #d2631d; 
  -moz-box-shadow:0 4px 0px #d2631d; 
  -webkit-box-shadow:0 4px 0px #d2631d;
}
.submit-btn-off {
  background-color:gray;
  box-shadow:0 4px 0px #3a3838; 
  -moz-box-shadow:0 4px 0px #3a3838; 
  -webkit-box-shadow:0 4px 0px #3a3838;
}
.tip-msg {
  color:#ffb390;
  width: 93%;
  margin:.2rem auto 0 auto;
  text-indent: .06rem;
  min-height:.3rem;
  line-height:.3rem;
}
.dashed {
  border-top:1px dashed #d7a54a;
  width:93%;
  margin:.1rem auto .2rem auto;
}
.content{
  width:93%;
  margin:.1rem auto 0 auto;
  color:#d7a54a;
}
.title{
  font-siez:.22rem;
  line-height:.15rem;
  margin-top:.3rem;
}
.item_content{
  line-height:.32rem;
  margin-bottom:.17rem;
}
.popWrap{
  width:80%;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  overflow: hidden;
}
.popWrap .popTitle{
  background-color: #ff7a25;
  line-height: .71rem;
  margin-top:0;
  text-align:center;
  color:white;
  font-size: .31rem;
}
.popWrap .popContent{
  font-family: '黑体';
  font-size:.52rem;
  color:#ff7a25;
  text-align:center;
  margin-top:.43rem;
}
.popWrap .popBtn{
  width:66%;
  position: relative;
  margin:.43rem auto;
}
.popWrap .popBtn img{
  display: block;
  width:100%;
}
.popWrap .popBtn button {
  z-index:100;
  position: absolute;
  border:none;
  width:100%;
  height:100%;
  background: none;
  color:white;
  line-height: 100%;
  font-size: .34rem
}
.popWrap .popDes{
  color:#83807d;
  text-align:center;
  margin-bottom: .44rem;
  font-size: 12px
}
.code_box{width:80%;margin:-120px auto;}
input::-ms-input-placeholder{color:#d7a54a}
input::-webkit-input-placeholder{color:#d7a54a}
input::-moz-placeholder{color:#d7a54a}
.clear{
  clear:both;
}
</style>
