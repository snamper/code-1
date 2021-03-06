/* eslint-disable */
'use strict';
import utils from './../utils';
const { request,config } = utils;
const { api } = config;
const { commonApi } = api;


export default function commonApiService(datas){
  // const  reqUrl = `${commonApi}?channelId=1001&token=${datas.token}`;  
  const  reqUrl = `${commonApi}?channelId=10000&token=${datas.token}`; 
  //console.log(reqUrl);
  const data = datas.data;
  return request({
    url:reqUrl,
    method: 'post',
    headers:{ 'Content-Type': 'application/json' },
    data,
  });
}