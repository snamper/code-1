/* eslint-disable */
'use strict';
import Mock from 'mockjs';
import { api } from './../utils/config'; 
const { hartlist } = api;

const Data = {
  'success':true,
  data:[
    {
                "id": '11',
                "activity_id": '1ii2',
                "status": 4,
                "full_name": '爱奇艺黄金会员',
                "exchange_points": '600',
                "image_url": 'https://oss.eratpay.com/c0f07be0e4f04a54aebbc878ba435a83.jpg',
                "merchant_name": '121',
                "buy_percent":'10',
                "retail_price":'600',
                special_offer_flag: true,
                tag:'',
                product_ad_attr: 1,
                product_num_status:200,
                sales: '333',
                is_favorites:1,
                total_balance: 8000
     },
     {
                "id": '12',
                "activity_id": '1jj3',
                "status": 4,
                "full_name": '爱奇艺黄金会员1',
                "exchange_points": '6100',
                "image_url": 'https://oss.eratpay.com/0b36804735074acc9b0d3109000d6b89.jpg',
                "merchant_name": '121',
                "buy_percent":'20',
                "retail_price":'600',
                special_offer_flag: true,
                tag:'',
                product_ad_attr: 1,
                product_num_status:200,
                sales: '333',
                is_favorites:1,
                total_balance: 8000
     },
      {
                "id": '13',
                "activity_id": '1hh4',
                "status": 4,
                "full_name": '爱奇艺黄金会员爱奇艺黄金会员',
                "exchange_points": '6020',
                "image_url": 'https://oss.eratpay.com/8b16e899eacb4fdcb47a184dd1fea09e.jpg',
                "merchant_name": '121',
                "buy_percent":'80',
                "retail_price":'6000',
                special_offer_flag: true,
                tag:'',
                product_ad_attr: 1,
                product_num_status:2000,
                sales: '333',
                is_favorites:0,
                total_balance: 8000
     },
     {
                "id": '14',
                "activity_id": '2ll2',
                "status": 4,
                "full_name": '爱奇艺黄金会员',
                "exchange_points": '600',
                "image_url": 'https://oss.eratpay.com/c0f07be0e4f04a54aebbc878ba435a83.jpg',
                "merchant_name": '121',
                "buy_percent":'10',
                "retail_price":'600',
                special_offer_flag: true,
                tag:'',
                product_ad_attr: 1,
                product_num_status:200,
                sales: '333',
                is_favorites:0,
                total_balance: 8000
     },
     {
                "id": '18',
                "activity_id": '2dd2',
                "status": 4,
                "full_name": '爱奇艺黄金会员1',
                "exchange_points": '6100',
                "image_url": 'https://oss.eratpay.com/0b36804735074acc9b0d3109000d6b89.jpg',
                "merchant_name": '121',
                "buy_percent":'20',
                "retail_price":'600',
                special_offer_flag: true,
                tag:'',
                product_ad_attr: 1,
                product_num_status:200,
                sales: '333',
                is_favorites:0,
                total_balance: 8000
     },
      {
                "id": '15',
                "activity_id": '2ww2',
                "status": 4,
                "full_name": '爱奇艺黄金会员爱奇艺黄金会员',
                "exchange_points": '6020',
                "image_url": 'https://oss.eratpay.com/8b16e899eacb4fdcb47a184dd1fea09e.jpg',
                "merchant_name": '121',
                "buy_percent":'80',
                "retail_price":'6000',
                special_offer_flag: true,
                tag:'',
                product_ad_attr: 1,
                product_num_status:2000,
                sales: '333',
                is_favorites:1,
                total_balance: 8000
     }
  ]
}


Mock.mock(`${hartlist}`,function(opt){
  return Data;
});
