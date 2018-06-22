'use strict'
/* eslint-disable */
/**
 * [global actions]
 * @type {Object}
 */
import api  from '@/api';
const { login,commonApiService } = api;
const Actions = {
  async loginIn(context,data){
    const req = await login(data);
	if(req.message == "成功"){
	  context.commit('loginIn',{token:req.data.token});
	  //localStorage存入登录信息
	  localStorage.setItem('login',JSON.stringify(data));
	  return false;
	}else{
	  return req.message;
	}
  },
  async commonService(context,data){
		const loginInfo = JSON.parse(localStorage.getItem("login"));
		if(!localStorage['token']){			
			if(loginInfo&&loginInfo.tel_num){
        window.location.href = `/#/token?client_id=${loginInfo.client_id}&tel_num=${loginInfo.tel_num}&user_id=${loginInfo.user_id}&timestamp=${loginInfo.timestamp}&sign=${loginInfo.sign}`;
			}else{
				window.location.href = `/#/token`;
			}		
			return true;  
		} 
    
	// 	return {
  //     message:'token无效！',
	//     data:{
	// 	   code:1
	//     }
	// };
	const submitData = {
	  token:localStorage['token'],
	  data,
	}
	const req = await commonApiService(submitData);
	if(req.apidata.code == 401){  //token失效，导向token page
	  if(loginInfo&&loginInfo.tel_num){
			window.location.href = `/#/token?client_id=${loginInfo.client_id}&tel_num=${loginInfo.tel_num}&user_id=${loginInfo.user_id}&timestamp=${loginInfo.timestamp}&sign=${loginInfo.sign}`;
		}else{
			window.location.href = `/#/token`;
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