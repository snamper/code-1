/* eslint-disable */
'use strict';
import Mock from 'mockjs';
import { api } from './../utils/config'; 
const  path = require('path');
const { commonApi } = api;
const HotShop = Mock.mock({
  'success':true,
  'array|6':[
    {
      'full_name|+1':[
        '中石油加油卡',
        '物美5元代金券',
        '京东E卡10元(电子卡)'
      ],
      'id|+1': 1,
      'product_jifen|+10': 1000,
      'sales|+4': 200
    }
  ],
});
const Data = {
  'success':true,
  data:[
    {
          "product_num_status":true,
          "id": '190', 
          full_name: '京东E卡10元',
          retail_price: '2',
          "enableBuy":false, 
          "specialOfferFlag": false,
          sales_base: '888',
          product_jifen: '1001',
          product_ad_attr: '1',
          image_url: 'https://oss.eratpay.com/9d0bb9da2d9a4297bb40dd9ce28b74fd.jpg',
          sales: '500',
          existCpsEntrance: true,
          cpsEntrance:{
              entranceType: 0,
              entranceUrl: '入口链接',
              entrancePicUrl: '入口图片地址',
              entranceButtonName: '入口按钮名称',
          },
          discount: '对应等级用户的折扣',
          discountPrice: '323',
     },
     {
          "product_num_status":true,
          "id": '190', 
          full_name: '爱奇艺黄金会员',
          retail_price: '2',
          "enableBuy":false, 
          "specialOfferFlag": false,
          sales_base: '666',
          product_jifen: '1000',
          product_ad_attr: '1',
          image_url: 'https://oss.eratpay.com/c0f07be0e4f04a54aebbc878ba435a83.jpg',
          sales: '300',
          existCpsEntrance: true,
          cpsEntrance:{
              entranceType: 0,
              entranceUrl: '入口链接',
              entrancePicUrl: '入口图片地址',
              entranceButtonName: '入口按钮名称',
          },
          discount: '对应等级用户的折扣',
          discountPrice: '333',
     },
     {
          "product_num_status":true,
          "id": '190', 
          full_name: '中石油加油卡',
          retail_price: '2',
          "enableBuy":false, 
          "specialOfferFlag": false,
          sales_base: '636',
          product_jifen: '1200',
          product_ad_attr: '1',
          image_url: 'https://oss.eratpay.com/0b36804735074acc9b0d3109000d6b89.jpg',
          sales: '300',
          existCpsEntrance: true,
          cpsEntrance:{
              entranceType: 0,
              entranceUrl: '入口链接',
              entrancePicUrl: '入口图片地址',
              entranceButtonName: '入口按钮名称',
          },
          discount: '对应等级用户的折扣',
          discountPrice: '233',
     },
     {
          "product_num_status":true,
          "id": '190', 
          full_name: '京东E卡10元',
          retail_price: '2',
          "enableBuy":false, 
          "specialOfferFlag": false,
          sales_base: '666',
          product_jifen: '1000',
          product_ad_attr: '1',
          image_url: 'https://oss.eratpay.com/a21efc5a1f8045129105d51696fdac4f.jpg',
          sales: '300',
          existCpsEntrance: true,
          cpsEntrance:{
              entranceType: 0,
              entranceUrl: '入口链接',
              entrancePicUrl: '入口图片地址',
              entranceButtonName: '入口按钮名称',
          },
          discount: '对应等级用户的折扣',
          discountPrice: '333',
     },
     {
          "product_num_status":true,
          "id": '190', 
          full_name: '京东E卡10元',
          retail_price: '2',
          "enableBuy":false, 
          "specialOfferFlag": false,
          sales_base: '666',
          product_jifen: '1000',
          product_ad_attr: '1',
          image_url: 'https://oss.eratpay.com/da1ca44bcd83480892e89c6e6e7a6e92.jpg',
          sales: '300',
          existCpsEntrance: true,
          cpsEntrance:{
              entranceType: 0,
              entranceUrl: '入口链接',
              entrancePicUrl: '入口图片地址',
              entranceButtonName: '入口按钮名称',
          },
          discount: '对应等级用户的折扣',
          discountPrice: '333',
     },
     {
          "product_num_status":true,
          "id": '190', 
          full_name: '中石油加油卡',
          retail_price: '2',
          "enableBuy":false, 
          "specialOfferFlag": false,
          sales_base: '636',
          product_jifen: '1200',
          product_ad_attr: '1',
          image_url: 'https://oss.eratpay.com/8b16e899eacb4fdcb47a184dd1fea09e.jpg',
          sales: '300',
          existCpsEntrance: true,
          cpsEntrance:{
              entranceType: 0,
              entranceUrl: '入口链接',
              entrancePicUrl: '入口图片地址',
              entranceButtonName: '入口按钮名称',
          },
          discount: '对应等级用户的折扣',
          discountPrice: '233',
     },
  ]
}

Mock.mock(`${commonApi}`,function(opts){
   console.log(JSON.parse(opts.body).apid);
   const apid = JSON.parse(opts.body).apid;
   const url = "./"+apid;
   console.log(path(url));
   const testData = require(path(url));
   console.log(testData.default);
   console.log('end');
   /* switch(opts.body.apid){
	 case '':
	   return data1;
	   break;
	 default:
	   return {code:0,msg:"error!"}
	   break
   } */
});
