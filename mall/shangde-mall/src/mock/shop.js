/* eslint-disable */
'use strict';
import Mock from 'mockjs';
import { api } from './../utils/config'; 
const { indexlist } = api;
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
const Data1 = {
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
const Data = {
    code: 1,
    message: "成功",
    data: {
    pageNo: 1,
    pageSize: 7,
    totalRows: 66,
    totalPage: 10,
    startRow: 0,
    endRow: 7,
    datas: [
        {
            deliver_way: 1,
            product_ad_attr: 1,
            recharge_type: null,
            image_url: "https://oss.eratpay.com/d780de8e920a455bb60c7b0b88e80465.jpg",
            hasExchangeCode: 1,
            product_name: "测试二级2",
            exchange_url: null,
            exchange_time: null,
            buy_time: 1526458058000,
            existCpsEntrance: false,
            full_name: "测试二级2",
            price: 20,
            product_id: 541,
            detail_desc: "撒",
            exchange_account: null,
            id: 2549,
            exchange_code: "utrytjyyjuyt1573",
            order_id: 4948,
            product_exchange_type: 1,
            status: -3,
        },
        {
            deliver_way: 1,
            product_ad_attr: 1,
            recharge_type: null,
            image_url: "https://oss.eratpay.com/d780de8e920a455bb60c7b0b88e80465.jpg",
            hasExchangeCode: 1,
            product_name: "测试二级2",
            exchange_url: null,
            exchange_time: null,
            buy_time: 1526458040000,
            existCpsEntrance: false,
            full_name: "测试二级2",
            price: 20,
            product_id: 541,
            detail_desc: "撒",
            exchange_account: null,
            id: 2548,
            exchange_code: "utrytjyyjuyt2699",
            order_id: 4947,
            product_exchange_type: 1,
            status: -3,
        },
        {
            deliver_way: 1,
            product_ad_attr: 1,
            recharge_type: null,
            image_url: "https://oss.eratpay.com/d780de8e920a455bb60c7b0b88e80465.jpg",
            hasExchangeCode: 1,
            product_name: "测试二级2",
            exchange_url: null,
            exchange_time: null,
            buy_time: 1526457793000,
            existCpsEntrance: false,
            full_name: "测试二级2",
            price: 20,
            product_id: 541,
            detail_desc: "撒",
            exchange_account: null,
            id: 2541,
            exchange_code: "utrytjyyjuyt2502",
            order_id: 4940,
            product_exchange_type: 1,
            status: -3,
        },
        {
            deliver_way: 1,
            product_ad_attr: 1,
            recharge_type: null,
            image_url: "https://oss.eratpay.com/d780de8e920a455bb60c7b0b88e80465.jpg",
            hasExchangeCode: 1,
            product_name: "测试二级2",
            exchange_url: null,
            exchange_time: null,
            buy_time: 1526457785000,
            existCpsEntrance: false,
            full_name: "测试二级2",
            price: 20,
            product_id: 541,
            detail_desc: "撒",
            exchange_account: null,
            id: 2540,
            exchange_code: "utrytjyyjuyt2277",
            order_id: 4939,
            product_exchange_type: 1,
            status: -3,
        },
        {
            deliver_way: 1,
            product_ad_attr: 1,
            recharge_type: null,
            image_url: "https://oss.eratpay.com/d780de8e920a455bb60c7b0b88e80465.jpg",
            hasExchangeCode: 1,
            product_name: "测试二级2",
            exchange_url: null,
            exchange_time: null,
            buy_time: 1526457780000,
            existCpsEntrance: false,
            full_name: "测试二级2",
            price: 20,
            product_id: 541,
            detail_desc: "撒",
            exchange_account: null,
            id: 2539,
            exchange_code: "utrytjyyjuyt1692",
            order_id: 4938,
            product_exchange_type: 1,
            status: -3,
        },
        {
            deliver_way: 1,
            product_ad_attr: 1,
            recharge_type: null,
            image_url: "https://oss.eratpay.com/d780de8e920a455bb60c7b0b88e80465.jpg",
            hasExchangeCode: 1,
            product_name: "测试二级2",
            exchange_url: null,
            exchange_time: 1526460367000,
            buy_time: 1526457713000,
            existCpsEntrance: false,
            full_name: "测试二级2",
            price: 20,
            product_id: 541,
            detail_desc: "撒",
            exchange_account: null,
            id: 2538,
            exchange_code: "utrytjyyjuyt930",
            order_id: 4937,
            product_exchange_type: 1,
            status: -3,
        },
        {
            deliver_way: 1,
            product_ad_attr: 1,
            recharge_type: null,
            image_url: "https://oss.eratpay.com/dd1faf00e1cc4ae8afb94f8f3dccc6d4.jpg",
            hasExchangeCode: 1,
            product_name: "wb0207H5",
            exchange_url: "https://www.baidu.com/",
            exchange_time: null,
            buy_time: 1518160906000,
            existCpsEntrance: false,
            full_name: "wb0207H5",
            price: 20,
            product_id: 531,
            detail_desc: "购买成功文案",
            exchange_account: null,
            id: 2226,
            exchange_code: "fdgfdg2230",
            order_id: 4196,
            product_exchange_type: 3,
            status: -3,
        }
   ]
 }
}

Mock.mock(`${indexlist}`,'post',Data);
