'use strict'
/* eslint-disable */
/**
 * [global actions]
 * @type {Object}
 */
import api  from '@/api';
const { login,commonApiService } = api;
const Actions = {
 //  async loginIn(context,data){
 //    const req = await login(data);
	// if(req.message == "成功"){
	//   context.commit('loginIn',{token:req.data.token});
	//   //localStorage存入登录信息
	//   localStorage.setItem('login',JSON.stringify(data));
	//   return false;
	// }else{
	//   return req.message;
	// }
 //  },
  async commonService(context,data){
		// const loginInfo = JSON.parse(localStorage.getItem("login"));
		// if(!sessionStorage['token']){			
		//   window.location.href = `/#/login`;	
		// } 
    
	// 	return {
  //     message:'token无效！',
	//     data:{
	// 	   code:1
	//     }
	// };
	const submitData = {
	  token:sessionStorage['token'],
	  data,
	}
	const req = await commonApiService(submitData);
	if(req.apidata.code == 401){  //token失效，导向token page
	  if(loginInfo&&loginInfo.tel_num){
			window.location.href = `/#/login`;
		}else{
			window.location.href = `/#/login`;
		}
	}else{
      return req;
	}
  },
  /* async alipay(context,data){
    if(!localStorage['token']) return {
      message:'token无效！',
	  data:{
		 code:0
	  }
	};
	const submitData = {
	  token:"677DF6788C7C4E6CBAF52C1AAD740CAB",
	  data,
	}
	//console.log(submitData);
    const req = await commonApiService(submitData);
    return req;
  }, */
}
export default Actions;