<template>
  <div class='wrap'>
  <div class="center">
  <img src="@/assets/icon.png" alt="" />
  <span>赚动商城</span>
  </div>
  <van-button @click='loginIn' type="danger" class="btn">确认登录</van-button>
  </div>
</template>
<script>
import { Dialog } from 'vant'
export default {
  name: 'Token',
  methods: {
    loginIn: function () {
	  const client_id = this.queryString("client_id");
	  const tel_num = this.queryString('tel_num');
	  const user_id = this.queryString('user_id');
	  const timestamp = this.queryString('timestamp');
	  const sign = this.queryString('sign'); 
	  const _this = this;
	  if(!sign||!client_id||!tel_num||!user_id||!timestamp){
	    return  Dialog.alert({
          title: 'Error',
          message: '参数缺失'
        }).then(() => {
        });
	  }	 
	  const data = {
	    client_id,
		tel_num,
		user_id,
		timestamp,
		sign,
	  }
	  this.$store.dispatch('loginIn',data).then(function(result){
	     if(!result){
		     return _this.$router.push("/");
		 }else{
		   Dialog.alert({
             title: '提示',
             message: result
           }).then(() => {
             // on close
           });
		 }
	  });
    },
	queryString: function(key){
	  var name,value; 
      var str=location.href; //取得整个地址栏
      var num=str.indexOf("?") 
      str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
      var arr=str.split("&"); //各个参数放到数组里
      for(var i=0;i < arr.length;i++){ 
        num=arr[i].indexOf("="); 
        if(num>0){ 
          name=arr[i].substring(0,num);
          value=arr[i].substr(num+1);
          this[name]=value;
        } 
      }
	  return this[key];
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .wrap {
  .center {
  width:90%;
  margin:1rem 0 0 5%;
  border-bottom:1px solid gray;
  img {
  display:block;
  margin:0 auto;
  }
  span {
  font-size:.4rem;
  line-height:.5rem;
  display:block;
  text-align:center;
  margin:.3rem auto;
  }
  }
  .btn{
  width:60%;
  font-size:.4rem;
  font-weight:700;
  background-color:#E95552;
  margin-top:1rem;
  }
  }
</style>
