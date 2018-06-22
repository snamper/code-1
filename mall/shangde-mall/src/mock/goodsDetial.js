/* eslint-disable */
'use strict';
import Mock from 'mockjs';
import { api } from './../utils/config'; 
const { h5Api } = api;
console.log(h5Api)

// 商品详情数据mock
const Data = {
  'success':true,
  "data":{
    "product_bananer": [
        {
            "imageUrl": "https://oss.eratpay.com/7a05d5006be049fba5b706d5d36f7c40.jpg", // 商品列表图
        },
        {
            "imageUrl": "https://oss.eratpay.com/7a05d5006be049fba5b706d5d36f7c40.jpg", // 商品列表图
        }
    ],
    "risk_buy_allowed":0, // 是否允许高风险帐号购买 1 允许 0 不允许
    "sales_base": 1000, // 售出基数
    "stock_num": 1, // 库存数量
    "enableBuy":false, // 是否允许当前用户购买
    "specialOfferFlag": false, // 是否为特价商品 true 是 false 不是 
    "userScore": "10000",  // 用户积分
    "pro_extends": [ ], 
    "retail_price": 1,  // 零售价
    "discount": 80,  // 折扣
    "discountPrice": 1,  // 折扣后价格
    "exchange_points": 1,  // 折扣前价格
    "product_logo": "https://oss.eratpay.com/93ea9388059d405b9aa7207a3ba3ff5d.jpg", // 商品logo
    "existCpsEntrance": false, 
    "full_name": "西部数据2.5英寸 天空蓝 移动硬盘", // 商品名称
    "product_type": "1",  // 商品类型 商品类型 1虚拟 2实物
    "exchange_explain": [ ], 
    "merchant_short_name": "滴滴出行",  // 商家简称
    "image_host": "http://oss.eratpay.com/", 
    "id": 210, // 商品id
    "product_ad_attr":"1", // 商品广告属性  1:购买商品  2：广告商品
    "favorite_status":"1", // 收藏状态  1:已收藏  2：未收藏
    "noob_good": "0", // 是否新手商品 0：否   1：是
    "noob_exchange_points": 500,// 新手商品兑换积分
    "isNoob": 1,// 有新手权限购买 0:否  1：是
    "validity": "2018-01-01 24:00:00" // 模拟有效期(自己添加的)
    }
}

Mock.mock(`${h5Api}`,'post',Data);
