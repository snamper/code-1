<template>
  <div class="login login_register" >
   <div class="header">
    <van-nav-bar title="登录"  left-arrow @click-left="routergo" right-text="注册" @click-right="onClickRight" />
   </div>
   <div class="phoneInput">
        <span class="icon"><img src="../../assets/phone1.png"></span>
        <input type="tel" maxlength='11' name="tel" v-model="telNum" v-on:input="phoneChange" placeholder="请输入手机号" value="" />
    </div>
    <div class="phoneInput pwdInput">
        <span class="icon"><img src="../../assets/pwd1.png"></span>
        <input type="password" maxlength='16' minLength='6' name="tel" v-on:input="pwdChange" v-model="password" placeholder="请输入密码" value="" />
    </div>
    <div class="register_tips">
            <span class="register_phone_tips" >{{tips}}</span>
        </div>
    <button class="goLogin" v-on:click="toLogin">登录</button>
    <div class="loginBottom">
    	<div class="forget"><router-link to='forgetPwd' replace> 忘记密码</router-link></div>
    	<div class="fastLogin"><router-link to='fastLogin' replace>手机号快捷登录</router-link></div>
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
      password:'',
      tips:'',
      registerAllow:false
    }
  },
  methods: {
   onClickRight() {
     this.$router.push({path:'/register'})  //注册
     if( sessionStorage['currentRouterInfo'] ) {
       this.$router.replace({path:'/register'})  //注册  不存历史记录
     }else{
       this.$router.push({path:'/register'})  //注册
     }
   },
   routergo(){
    if( this.$route.query.goback ){
        this.$router.push({path:'/index'})
    }else{
      this.$router.back(-1)
    }
   	
   },
   phoneChange(){
     this.tips = ''
   },
   pwdChange() {
     this.tips = ''
   },
    toLogin(){
      const regExp = /^1(3|4|5|7|8|6|9)\d{9}$/;
      let that = this
      if(!this.telNum){
          this.tips = '请输入手机号'
          return false
      }else{
        if(!regExp.test(this.telNum)){
          this.tips = '请输入正确的手机号'
          return false
        }else{
          this.tips = ''
        }
      }
      if(this.password.length >= 6 && this.password.length < 17  ){
        this.tips = ''
        this.$store.dispatch('commonService',{"apid": 26,params: {
                    phoneNum: that.telNum,
                    password:that.password,
                    LoginType:2
                }})
        .then((result) => {
           if(result.apidata.message == '成功'){
            sessionStorage['token'] = result.apidata.data.token;
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


      }else{
        if(this.password.length > 0){
            this.tips = '密码不正确'
        }else{
          this.tips = '请输入密码'
        }
        return false
      }
    }
  },
  created () {
   console.log(this.$route.query.goback)
  },
  mounted() {
  
  }
}
</script>
<style lang='less' scoped>
.login{
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
        background-color:#ffd83b !important;
        color:#b32524 !important;
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
      color: #777;
  	}
  	.fastLogin{
  		width: 50%;
  		height: 100%;
  		float: right;
  		text-align: right;
      line-height: 0.6rem;
      color: #777;
  	}
  	/*background: #666;*/
  }
}

</style>
