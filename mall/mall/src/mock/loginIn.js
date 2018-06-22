/* eslint-disable */
'use strict';
import Mock from 'mockjs';
import { api } from './../utils/config'; 
const { loginIn } = api;

const Data = Mock.mock({
    "code":1,
    "data":{
    		"token": "febbb5b6120c4532a77643acab49a5a1",
    	},
    "message":"成功"
});
Mock.mock(/.*sso.do.*/, 'get',Data);
// Mock.mock(loginIn, 'get',Data);