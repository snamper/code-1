<template>
  <div class="order_content_mainL">
  <div class="phoneInput pwdInput">
        <span class="icon">设置密码</span>
        <input type="password" maxlength='6' v-on:input="pwdChange" minLength='6' name="tel"  v-model="password" placeholder="请输入密码（6位数字）" value="" />
    </div>
  <div class="phoneInput pwdInput">
        <span class="icon">确认密码</span>
        <input type="password" maxlength='6' v-on:input="pwdChange" minLength='6' name="tel"  v-model="password1" placeholder="请输入密码（6数字）" value="" />
    </div>
    <button class="goLogin" v-on:click="goConfim" v-bind:class="{btn_allow:registerAllow}">确认</button>
  </div>
</template>
<script>
import {Dialog, Toast} from 'vant'
/* 系统设置 */
export default {
  name: 'sysConfig',
  data () {
    return {
      password:'',
      password1:'',
      registerAllow:false,
      check:'',
      userId:'',
      phone:''
    }
  },
  methods: {
    pwdChange() {
      let regExp =  /^\d{6}$/;
      if(  this.password.length == 6 && this.password1.length == 6 && this.password1 == this.password && regExp.test(this.password) ){
         this.registerAllow = true
      }else{
        this.registerAllow = false
      }
    },
    goConfim(){
      let that = this
      let regExp =  /^\d{6}$/;
      if(  this.password.length == 6 && this.password1.length == 6 && this.password1 == this.password && regExp.test(this.password) ){
         this.registerAllow = true
      }else{
        this.registerAllow = false
        Toast('两次密码不一致或密码格式不正确')
        return
      }

      that.$store.dispatch('commonService',{"apid": 48,params: {
              signature:that.check,
              payPsw:that.password,
              payPswRepeat:that.password1,
              userId:that.userId,
              phone:that.phone
          }})
            .then((result) => {
               if(result.apidata.code == '1'){
                 Toast('修改交易密码成功')
                 if( sessionStorage['editTransactionPwd']  ){
                   let goodId = sessionStorage['editTransactionPwd']
                   that.$router.replace({path:'/order/confirmOrder',query:{id:goodId}})
                 }else{
                   that.$router.replace({path:'/mine'})
                 }
                  
              }else{
                 Toast(result.apidata.message)
              }
            })
            .catch((error) => {
              console.log(error)
            })
    }
 },
  mounted() {
    this.check = this.$route.query.check
    this.phone = this.$route.query.telNum
    this.userId = this.$route.query.userId
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.order_content_mainL{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  top: 0.748rem;
  bottom: 0;
  font-size: 0.2rem;
    .btn_allow{
        background-color:#ffd83b !important;
        color:#b32524 !important;
      }
      .btn_disabled{
        background-color: rgb(231, 231, 231);
          color: rgb(180, 180, 180);
      }
  .phoneInput{
    width: 100%;
    height: 0.8rem;
    border-bottom: 1px solid #dcdcdc;
    .icon{
    width: 24%;
    height: 100%;
    float: left;
    padding-top: 0.21rem;         
    }
    input{
      float: left;
      width: 75%;
      height: 100%;
      font-size: 0.24rem;
      border:none;
      color: #595959;
    }
  }
  .goLogin{
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
</style>
