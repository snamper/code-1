/* eslint-disable */
'use strict';
import Mock from 'mockjs';
import { api } from './../utils/config'; 
const { goodscate, goodsCateLists } = api;
// console.log(goodsCateLists)
const Data = {
  'success':true,
  data:[
    {
       id:1,
       sortName:'一级1', //分类名称
       sortType:'1',//分类类型 1：一级分类  2：二级分类
       sortOrder: '1',//分类排序 
       fid: '0', //父ID
       sortChildren:[
        {
            id:10,
            sortName:'二级10',//分类名称
            sortType:'2',//分类类型 1：一级分类  2：二级分类
            sortOrder:'1',//分类排序 
            fid:1//父ID
        },
        {
            id:11,
            sortName:'二级11',//分类名称
            sortType:'2',//分类类型 1：一级分类  2：二级分类
            sortOrder:'2',//分类排序 
            fid:1//父ID
        },
        {
            id:12,
            sortName:'二级12',//分类名称
            sortType:'2',//分类类型 1：一级分类  2：二级分类
            sortOrder:'3',//分类排序 
            fid:1//父ID
        }
       ]
    },
    {
       id:2,
       sortName:'一级2', //分类名称
       sortType:'1',//分类类型 1：一级分类  2：二级分类
       sortOrder: '2',//分类排序 
       fid: '0', //父ID
       sortChildren:[
        {
            id:20,
            sortName:'二级20',//分类名称
            sortType:'2',//分类类型 1：一级分类  2：二级分类
            sortOrder:'1',//分类排序 
            fid:2//父ID
        },
        {
            id:21,
            sortName:'二级21',//分类名称
            sortType:'2',//分类类型 1：一级分类  2：二级分类
            sortOrder:'2',//分类排序 
            fid:2//父ID
        },
        {
            id:22,
            sortName:'二级22',//分类名称
            sortType:'2',//分类类型 1：一级分类  2：二级分类
            sortOrder:'3',//分类排序 
            fid:2//父ID
        },
        {
            id:23,
            sortName:'二级23',//分类名称
            sortType:'2',//分类类型 1：一级分类  2：二级分类
            sortOrder:'4',//分类排序 
            fid:2//父ID
        },
        {
            id:24,
            sortName:'二级24',//分类名称
            sortType:'2',//分类类型 1：一级分类  2：二级分类
            sortOrder:'5',//分类排序 
            fid:2//父ID
        }
       ]
    },
    {
       id:3,
       sortName:'一级3', //分类名称
       sortType:'1',//分类类型 1：一级分类  2：二级分类
       sortOrder: '3',//分类排序 
       fid: '0', //父ID
       sortChildren:[
        {
            id:30,
            sortName:'二级30',//分类名称
            sortType:'2',//分类类型 1：一级分类  2：二级分类
            sortOrder:'1',//分类排序 
            fid:3//父ID
        },
        {
            id:31,
            sortName:'二级31',//分类名称
            sortType:'2',//分类类型 1：一级分类  2：二级分类
            sortOrder:'2',//分类排序 
            fid:3//父ID
        },
        {
            id:32,
            sortName:'二级32',//分类名称
            sortType:'2',//分类类型 1：一级分类  2：二级分类
            sortOrder:'3',//分类排序 
            fid:3//父ID
        },
        {
            id:33,
            sortName:'二级33',//分类名称
            sortType:'2',//分类类型 1：一级分类  2：二级分类
            sortOrder:'4',//分类排序 
            fid:3//父ID
        }
       ]
    },
    {
       id:4,
       sortName:'一级4', //分类名称
       sortType:'1',//分类类型 1：一级分类  2：二级分类
       sortOrder: '4',//分类排序 
       fid: '0', //父ID
    }
  ]
}

const goodsList = {
	'success':true,
	data:{
        "code": 1, 
        "datas": {
            "pageNo": 1,
            "pageSize": 10,
            "totalRows": 23,
            "totalPage": 3,
            "startRow": 0,
            "endRow": 10,
            "datas": [
              	{
                    "product_num_status":true,  //# true 有货，false无货
                    "id": 190,  //# 商品id
                    full_name:'爱奇艺', //商品名称,
                    retail_price:'10', //零售价,
                    "enableBuy":false, //# 是否允许当前用户购买
                    "specialOfferFlag": false, //# 是否为特价商品 true 是 false 不是 
                    sales_base: 10,//已售基数，
                    product_jifen: 100,//兑换积分，
                    product_ad_attr: 1,//商品广告属性 1：购买商品  2：广告商品
                    image_url:'https://oss.eratpay.com/b868130b13d246fbb82dfad83f26c1cb.jpg',//列表图片,
                    sales: 10,//已售数量,
                    existCpsEntrance: false,//true || false 是否存在cps入口,
                    cpsEntrance:{
                        entranceType:1,//入口类型 0：按钮  1：图片
                        entranceUrl: 'https://oss.eratpay.com/b868130b13d246fbb82dfad83f26c1cb.jpg',//入口链接，
                        entrancePicUrl: 'https://oss.eratpay.com/b868130b13d246fbb82dfad83f26c1cb.jpg',//入口图片地址,
                        entranceButtonName: '11',//入口按钮名称
                    },
                    discount:1, //对应等级用户的折扣
                    discountPrice:90,  //折扣后的价格
            	},
            	{
                    "product_num_status":true,  //# true 有货，false无货
                    "id": 190,  //# 商品id
                    full_name:'爱奇艺', //商品名称,
                    retail_price:'10', //零售价,
                    "enableBuy":false, //# 是否允许当前用户购买
                    "specialOfferFlag": false, //# 是否为特价商品 true 是 false 不是 
                    sales_base: 10,//已售基数，
                    product_jifen: 100,//兑换积分，
                    product_ad_attr: 1,//商品广告属性 1：购买商品  2：广告商品
                    image_url:'https://oss.eratpay.com/b868130b13d246fbb82dfad83f26c1cb.jpg',//列表图片,
                    sales: 10,//已售数量,
                    existCpsEntrance: false,//true || false 是否存在cps入口,
                    cpsEntrance:{
                        entranceType:1,//入口类型 0：按钮  1：图片
                        entranceUrl: 'https://oss.eratpay.com/b868130b13d246fbb82dfad83f26c1cb.jpg',//入口链接，
                        entrancePicUrl: 'https://oss.eratpay.com/b868130b13d246fbb82dfad83f26c1cb.jpg',//入口图片地址,
                        entranceButtonName: '11',//入口按钮名称
                    },
                    discount:1, //对应等级用户的折扣
                    discountPrice:90,  //折扣后的价格
            	},
            	{
                    "product_num_status":true,  //# true 有货，false无货
                    "id": 190,  //# 商品id
                    full_name:'爱奇艺', //商品名称,
                    retail_price:'10', //零售价,
                    "enableBuy":false, //# 是否允许当前用户购买
                    "specialOfferFlag": false, //# 是否为特价商品 true 是 false 不是 
                    sales_base: 10,//已售基数，
                    product_jifen: 100,//兑换积分，
                    product_ad_attr: 1,//商品广告属性 1：购买商品  2：广告商品
                    image_url:'https://oss.eratpay.com/b868130b13d246fbb82dfad83f26c1cb.jpg',//列表图片,
                    sales: 10,//已售数量,
                    existCpsEntrance: false,//true || false 是否存在cps入口,
                    cpsEntrance:{
                        entranceType:1,//入口类型 0：按钮  1：图片
                        entranceUrl: 'https://oss.eratpay.com/b868130b13d246fbb82dfad83f26c1cb.jpg',//入口链接，
                        entrancePicUrl: 'https://oss.eratpay.com/b868130b13d246fbb82dfad83f26c1cb.jpg',//入口图片地址,
                        entranceButtonName: '11',//入口按钮名称
                    },
                    discount:1, //对应等级用户的折扣
                    discountPrice:90,  //折扣后的价格
            	}
            ], 
        }
    }
	
}

Mock.mock(`${goodscate}`,'post',Data);
Mock.mock(`${goodsCateLists}`,'post',goodsList);
