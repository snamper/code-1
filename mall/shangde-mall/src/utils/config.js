/* eslint-disable */
'use strict';
const mockApi = '/api/mock';  //mock数据接口;
const prodApi = '/api/prod';  //生产环境地址;
const devApi = '/api/dev';   //本地调试地址;
const api = devApi;
module.exports = {
  CORS:[],
  name:'Vue Mall',
  mockApi,
  prodApi,
  devApi,
  api:{
    loginIn:`${api}/h5/sso.do`,
    commonApi:`${api}/h5/to/b/handler.do`,
  }
};