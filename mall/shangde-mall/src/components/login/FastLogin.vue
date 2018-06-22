<template>
  <div class="fastLogin login_register" >
   <div class="header">
    <van-nav-bar title="手机号快捷登录"  left-arrow @click-left="routergo" right-text="注册" @click-right="onClickRight" />
   </div>
   <div class="phoneInput">
        <span class="icon"><img src="../../assets/phone1.png"></span>
        <input type="tel" maxlength='11' name="tel" v-on:input="phoneChange" v-model="telNum" placeholder="请输入手机号" value="" />
    </div>
    <div class="phoneInput pwdInput">
        <span class="icon"><img src="../../assets/yzm.png" class="yzm"></span>
        <input type="number" maxlength='6' name="code" v-on:input="codeChange"  v-model="code" placeholder="请输入验证码" class="codeInput" value="" />
         <button class="sendCode" v-on:click="getCode" v-bind:class="{btn_allow:getCodeAllow}" :disabled="!getCodeAllow">{{btnMessage}}</button>
    </div>
    <div class="register_tips">
            <span class="register_phone_tips" >{{tips}}</span>
        </div>
    <button class="goLogin" v-on:click="toLogin" v-bind:class="{btn_allow:registerAllow}" :disabled="!registerAllow">登录</button>
    <div class="loginBottom">
    	<div class="fastLogin"><router-link to='login' replace>使用密码登录</router-link></div>
    </div>
  </div>
</template>

<script>
import './login.less'
import { Toast } from 'vant'
export default {
  name: 'Login',
  data () {
    return {
      telNum:'',
      code:'',
      btnMessage:'发送验证码',
      tips:'',
      getCodeAllow:false,
      registerAllow:false,
      timeIndex: 59,
    }
  },
  methods: {
   onClickRight() {
   	this.$router.push({path:'/register'})  //注册
   },
   routergo(){
   	this.$router.back(-1)
   },
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
   toLogin(){
      let that = this
     this.$store.dispatch('commonService',{"apid": 26,params: {
                    phoneNum: that.telNum,
                    vilcode:that.code,
                    LoginType:1
                }})
        .then((result) => {
           if(result.apidata.message == '成功'){
            sessionStorage['token'] = result.apidata.data.token;
             // this.$router.push({path:"/index"})
             if( sessionStorage['currentRouterInfo'] ) {
                let shopId = sessionStorage['currentRouterInfo']
                 this.$router.replace({path:'/goodDetail',query:{id:shopId}})
            }else{
              this.$router.push({path:"/index"})
            }
          }else that.tips = result.apidata.message
        })
        .catch((error) => {
          console.log(error)
        })
   }
  },
  created () {
 
  },
  mounted() {
  
  }
}
</script>
<style lang='less' scoped>
.fastLogin{
   height: 100%;
   overflow: hidden;
   input::-webkit-input-placeholder{color: #595959}
   input:-moz-placeholder{color: #595959}
   input::-moz-placeholder{color: #595959}
   input:-ms-input-placeholde{color: #595959}
   .register_tips{width: 80%;height: .3rem;color: red !important;font-size: .22rem;margin: .1rem auto; text-align: left;}
      .register_message{
        width: 4.4rem;
        margin: 0 auto;
        color: #fff;
        font-size: .24rem;
        text-align: center;
        height: .41rem;
      }
      .btn_allow{
        background-color:#f66e6e !important;
        color:#fff !important;
      }
      .btn_disabled{
        background-color: rgb(231, 231, 231);
          color: rgb(180, 180, 180);
      }
  .phoneInput{
  	width: 80%;
  	height: 0.8rem;
  	margin: 1.4rem auto 0.3rem;
  	border-bottom: 1px solid #dcdcdc;
  	.icon{
		width: .48rem;
		height: 100%;
		float: left;
		padding-top: 0.21rem;
		img{
		      float: left;
			width: 0.25rem;
			height: 0.38rem;
		}
            .yzm{
              width: 0.34rem;
              height: 0.38rem;
            }
  	}
  	input{
  	  float: left;
  	  width: 80%;
  	  height: 100%;
  	  font-size: 0.24rem;
  	  border:none;
  	  color: #595959;
  	}
  }
  .pwdInput{
  	margin-top: 0;
    margin-bottom: 0rem;
    .codeInput{
      width: 50%;
    }
    .sendCode{
      width:40%;
      height: 70%;
      float: right;
      margin-top: 0.1rem;
      font-size: 0.25rem;
      letter-spacing: 0.02rem;
      color:#fff;
      background-color:#dcdcdc;
      border-radius:.25rem;
      box-shadow: 0px .05rem .05rem #dcdcdc;
    }
  }
  .goLogin{
  	width: 80%;
  	height: 0.8rem;
  	margin: 0 auto;
      background: #f66e6e;
      border-radius: 0.4rem;
      font-size: 0.3rem;
      text-align: center;
      /*padding-top: 0.2rem;*/
      letter-spacing: 0.1rem;
      color: #fff;
  }
  .loginBottom{
  	width: 80%;
  	height: 0.6rem;
  	margin: 0.15rem auto 0;
  	font-size: 0.25rem;
  	color: #b5b5b5;
  	.forget{
  		width: 40%;
  		height: 100%;
  		line-height: 0.6rem;
  		float: left;
  		text-align: left;
  	}
  	.fastLogin{
  		width: 40%;
      height: 100%;
      color: #777;
  		float: right;
  		text-align: right;
  		line-height: 0.6rem;
  	}
  	/*background: #666;*/
  }
  .bottom{
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0.5rem;
      font-size: 0.24rem;
      text-align: center;
      color: #595959;
    }
}

</style>
