<template>
  <div class="forgetPwd login_register" >
    <div class="header">
      <van-nav-bar title="忘记密码"  left-arrow @click-left="routergo" />
    </div>
    <div class="register_area">
      <ul>
        <li>
          <img src="../../assets/phone.png">
          <input type="tel" maxlength='11' name="tel" v-on:input="phoneChange"  v-model="telNum" placeholder="请输入手机号" value="" />
        </li>
        <li>
          <img src="../../assets/yzm.png" class="yzm">
          <input type="number" maxlength='6' name="code" v-on:input="codeChange"  v-model="code" placeholder="请输入验证码" class="codeInput" value="" />
          <button class="sendCode" v-on:click="getCode" v-bind:class="{btn_allow:getCodeAllow}" :disabled="!getCodeAllow">{{btnMessage}}</button>
        </li>
        <li>
          <img src="../../assets/pwd1.png">
          <input type="password" maxlength='16' v-on:input="pwdChange" minLength='6' name="pass"  v-model="password" placeholder="请输入密码（6-16位数字，字母组合）" value="" />
        </li>
        <li>
          <img src="../../assets/pwd1.png">
          <input type="password" maxlength='16' v-on:input="pwdChange" minLength='6' name="pass"  v-model="password1" placeholder="请确认密码（6-16位数字，字母组合）" value="" />
        </li>
      </ul>
      <div class="register_tips">
            <span class="register_phone_tips" >{{tips}}</span>
        </div>
      <button class="toRegister" v-on:click="forgetPwd" v-bind:class="{btn_allow:registerAllow}" :disabled="!registerAllow">修改密码</button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'Register',
  data () {
    return {
      telNum:'',
      code:'',  
      password:'',
      password1:'',
      tips:'',
      getCodeAllow:false,
      registerAllow:false,
      btnMessage:'发送验证码',
      timeIndex: 59,
      confirmPhone:''
    }
  },
  methods: {
    phoneChange: function() {
      this.tips = '';
      if(this.telNum.length == 11 && this.phoneCheck()){   // 长度达到11位
          this.ifRegister();
          this.getCodeAllow = true;
      }else{
          this.getCodeAllow = false;
          this.registerAllow = false;
      }
    },
    codeChange: function() {
            this.tips = '';
            if(this.code.length >= 4 && this.code.length <= 8){   
                this.ifRegister();
            }else{
                this.registerAllow = false;
            }
        },
    pwdChange(){
      this.tips = ''
    },
    getCode () {  //获取验证码
       const that = this;
        if(this.phoneCheck()){
           that.$store.dispatch('commonService',{"apid": 23,params: {
                      phoenNum: that.telNum
                  }})
          .then((result) => {
             if(result.apidata.message == '成功'){
                that.getCodeAllow = false;
                that.confirmPhone = that.telNum;
                that.timer = setInterval(function(){
                    that.btnMessage = that.timeIndex + 'S';
                    that.timeIndex --;
                    if(that.timeIndex < 0){
                        that.timer = window.clearInterval(that.timer);
                        that.btnMessage = '重新发送';
                        that.getCodeAllow = true;
                    }
                },1000)
            }else that.tips = result.apidata.message
          })
          .catch((error) => {
            console.log(error)
          })
        }
    },
    ifRegister: function() {
        if(this.telNum == this.confirmPhone && this.code.length >= 4 && this.code.length < 8){
            console.log("aaa")
            this.registerAllow = true;
        } else{
           this.registerAllow = false;
        }
    },
    phoneCheck: function() {
      const regExp = /^1(3|4|5|7|8|6|9)\d{9}$/;
      if(!this.telNum){
          this.tips = '请输入手机号'
          return false
      }else{
        if(!regExp.test(this.telNum)){
          this.tips = '请输入正确的手机号'
          return false
        }
        return true;
      }
    },
    forgetPwd: function() {
      let that = this
      if( that.password != that.password1 ){
        this.tips = '两次输入密码不一致'
        return false
      }else{
        this.tips = ''
      }
     that.$store.dispatch('commonService',{"apid": 77,params: {
                phone: that.confirmPhone,
                viladCode:that.code,
                loginPwd:that.password
            }})
    .then((result) => {
       if(result.apidata.message == '成功'){
         Toast('修改密码成功')
         this.$router.push({path:"/index"})
      }else that.tips = result.apidata.message
    })
    .catch((error) => {
      console.log(error)
    })
    },

    toLogin() {  //去登录页面
      this.$router.push({path:"/login"})
    },
    routergo() { //跳转上一页
      this.$router.back(-1)
    }
  },
  created () {
 
  },
  mounted() {
  
  }
}
</script>
<style lang='less' scoped>
  input,button{outline:none}
  input{
    -webkit-user-drag: text;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
  input::-webkit-input-placeholder{color: #dcdcdc}
  input:-moz-placeholder{color: #fff}
  input::-moz-placeholder{color: #fff}
  input:-ms-input-placeholde{color: #fff}

  .forgetPwd{
    height: 100%;
    overflow: hidden;
    .header{
      height:0.748rem;
      width:100%;
      z-index: 100;
      .van-nav-bar .van-icon{
        color: #282828;
      }
      .van-nav-bar__text{
        color:#dcdcdc;
      }
    }
    .btn_allow{
        background-color:#f66e6e !important;
        color:#fff !important;
      }
      .btn_disabled{
        background-color: rgb(231, 231, 231);
          color: rgb(180, 180, 180);
      }
    .register_area{
      width:6.3rem;
      margin:0 auto;
      .register_tips{width: 6rem;height: .3rem;color: #333 !important;font-size: .22rem;margin: .1rem auto;}
      .register_message{
        width: 4.4rem;
        margin: 0 auto;
        color: #fff;
        font-size: .24rem;
        text-align: center;
        height: .41rem;
      }
      ul{
        padding:0 .8rem;
        width:6.3rem;
        height:100%;
        margin-top:.6rem;
        li{
          width:100%;
          height:1.05rem;
          position:relative;
          padding-top:.5rem;
          padding-bottom:.2rem;
          border-bottom: .01rem solid #dcdcdc;
          img{
            width:.3rem;
            height:.36rem;
            position:absolute;
            left:0;
            bottom:.2rem
          }
          .yzm{
              width: 0.34rem;
              height: 0.38rem;
            }
          input{
            display:block;
            border:0;
            width: 100%;
            margin: 0 auto;
            color: #595959;
            font-size: .24rem;
            height:.36rem;
            padding-left:.5rem;
          }
          .codeInput{
            width:2.6rem;
            float:left;
          }
          .sendCode{
            width:1.9rem;
            height:.5rem;
            position:absolute;
            right:0;
            bottom:.1rem;
            font-size:.26rem;
            color:#fff;
            background-color:#dcdcdc;
            border-radius:.25rem;
            box-shadow: 0px .05rem .05rem #dcdcdc;
          }
        }
      }
      .toRegister{
        width:4.8rem;
        margin-left:..5rem;
        height:.7rem;
        background-color:#dcdcdc;
        color:#fff;
        text-align:center;
        font-size:.26rem;
        margin-top:.6rem;
        border-radius:.32rem;
        font-weight:700;
      }
    }
    
  }
  
</style>
