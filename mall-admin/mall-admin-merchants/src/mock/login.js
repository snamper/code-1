"use strict";
import { APIV1 } from './../utils/config'; 
const Mock = require("mockjs");

const  plateMenu = Mock.mock([ //平台端菜单
  {
    key: '1',
    icon: 'switcher',
    name: '渠道管理',
    route: '/channelManager',
  },{
    key: '2',
    icon: 'api',
    name: '渠道选品',
    children:[
      {
        key:'channelChooseGoods',
        name: '选择商品',
        route: '/channelChooseGoods',
      },{
        key:'channelGoodsManage',
        name: '渠道商品管理',
        route: '/channelGoodsManage',
      },
    ]
  },{
    key: '3',
    icon: 'profile',
    name: '渠道订单管理',
    route: '/channelOrderManage',
  },{
    key: '4',
    icon: 'api',
    name: '运营位管理',
    children:[
      {
        key:'channelRecGoodsMan',
        name: '渠道推荐商品管理',
        route: '/channelRecGoodsMan',
      },{
        key:'channelHomeBannerMan',
        name: '渠道首页banner管理',
        route: '/channelHomeBannerMan',
      },
    ]
  }
])

module.exports = {
  [`GET ${APIV1}/getMenu`](req,res){
    console.log(res,req)
    res.status(200).json(plateMenu);
  },
}