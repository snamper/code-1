<template>
  <div class="order_content_mainL">
   <div class="userInfo">请输入发送到您所绑定的手机：{{telNum1}}上的验证码，
以验证您的身份</div>
    <div class="phoneInput pwdInput">
        <span class="icon"><img src="../../../assets/yzm.png" class="yzm"></span>
        <input type="number" maxlength='6' name="code" v-on:input="codeChange"  v-model="code" placeholder="请输入验证码" class="codeInput" value="" />
         <button class="sendCode btn_allow" v-on:click="getCode" >{{btnMessage}}</button>
    </div>
    <button class="goLogin" v-on:click="toLogin" v-bind:class="{btn_allow:registerAllow}" :disabled="!registerAllow">确认</button>
  </div>
</template>
<script>
import {Dialog, Toast} from 'vant'
/* 系统设置 */
export default {
  name: 'sysConfig',
  data () {
    return {
      productId: '',//订单内商品的ID
      code:'',
      tips:'',
      getCodeAllow:false,
      telNum:'156****8990',
      telNum1:'156****8990',
      userId:'11221',
      timeIndex:59,
      btnMessage:'获取验证码',
      timer:'',
      registerAllow:false,
    }
  },
  methods: {
    routergo: function () {
      this.$router.back(-1)
    },
    getCode () {  //获取验证码
       const that = this;
       if(that.timeIndex<59 && that.timeIndex > 0 ) {
          return
       }
           that.$store.dispatch('commonService',{"apid": 23,params: {
                      phoenNum: that.telNum
                  }})
          .then((result) => {
             if(result.apidata.message == '成功'){
                that.getCodeAllow = false;
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
    },
    codeChange: function() {
        this.tips = '';
        if(this.code.length >= 4 && this.code.length <= 8){   
            this.registerAllow = true;
        }else{
            this.registerAllow = false;
        }
    },
   toLogin(){
    let that = this
    that.$store.dispatch('commonService',{"apid": 28,params: {
            phoenNum: that.telNum,
            viladeCode:that.code
        }})
          .then((result) => {
             if(result.apidata.code == '1'){

               that.$store.dispatch('commonService',{"apid": 104,params: {
                  handleType: String("2"),
                  viladCode: String(that.code),
                  pwd:'',
                  phone:String(that.telNum),
                  userId:String(that.userId)
              }})
                .then((result) => {
                   if(result.apidata.code == '1'){
                    let pwdCode = result.apidata.data["check_with_code"]
                    console.log(result.apidata.data["check_with_code"])
                      that.$router.replace({path:'/resetTransactionPwd',query:{check:result.apidata.data["check_with_code"],userId:that.userId,telNum:that.telNum}})
                  }else{
                     Toast(result.apidata.message)
                  }
                })
                .catch((error) => {
                  console.log(error)
                })
            }else{
               Toast(result.apidata.message)
            }
          })
          .catch((error) => {
            console.log(error)
          })

     
   }
},
created() {
    let that = this
       this.$store.dispatch('commonService',{"apid": 53,params: {}})
        .then((result) => {
           if(result.apidata.message == '成功'){
              console.log(result)
              let phoneNum = String(result.apidata.data.tel_num) 
              that.telNum = phoneNum
              that.telNum1 = phoneNum.substring(0,3) +"****" +phoneNum.substring(7,11)
              that.userId = result.apidata.data.id
          }else {
            that.tips = result.apidata.message
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  mounted() {
   
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
  .userInfo{
    width: 88%;
    margin: 0.2rem auto;
    text-align: center;
    font-size: 0.22rem;
    line-height: 0.36rem;
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
      background-color:#f66e6e;
      border-radius:.25rem;
      box-shadow: 0px .05rem .05rem #dcdcdc;
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
