"use strict";
import { goodsDetail, goodsAudit } from '@/services/container/platform/goodsManager';
import { message } from 'antd';
import {pathCheck,routes} from '@/app/pathCheck';
export default {
  namespace: 'goodsAuditModel',
  state: {
    isUpdate:false, //是否是编辑
    ifShowDetail:false, //是否只是查看详情
    showFailReason:true,
    productType:1,  //商品类型
    listImgUrl:{},  //列表图
    mainImgUrl:{},  //商品主图
    imgList:[], //细节图
    loading:false,
    goodsDetail:'', //商品详情
    goodsId:'',   //当前商品id
    currentProduct:'',  //当前商品详情
    productMerchant:'1',  //是否为赚动添加特殊商品
    exchangeMessage:{ //兑换方式详情
      productAdAttr:'1',  //商品广告属性
      exchangeMethods:'1',  //兑换方式
    }, 
    extendedDetail:{},  
    AuditVisble:false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch,history,routes[13])
    },
  },
  reducers: {
    getGoodsDetail:function(state,action){  //商品详情
      return {
        ...state,
        currentProduct: action.currentProduct || '',
        exchangeMessage:action.currentProduct.product_detail,
        extendedDetail:action.productExtendedDetail || {},
        goodsId:action.id,
        step:2, //如果是修改则直接到第二步
        isUpdate:action.source && action.source === '1'?true:false, //是否是编辑
        ifShowDetail:action.source && action.source === '2'?true:false, //是否只是显示详情
        listImgUrl:action.listImgUrl?action.listImgUrl:{},
        mainImgUrl:action.mainImgUrl?action.mainImgUrl:{},
        imgList:action.imgList?action.imgList:[],
        goodsDetail:action.currentProduct.product_detail.product_describe,
        productMerchant:String(action.currentProduct.product_detail.channel_type) === '10000'?'1':'2',
        showFailReason:true,
      }
    },
    dialogControll:function(state,action){  
      return {
        ...state,
        AuditVisble:!state.AuditVisble
      }
    },
    changeStatus:function(state,action){
      return {
        ...state,
        showFailReason:!state.showFailReason
      }
    },
  },
  effects:{
    *query({payload = {}},{put,call}){  //获取商品详情
      if(!payload.id){
        message.error('商品查询失败')
        return 
      }
      const data = yield call(goodsDetail, {productId:payload.id});
      if(data.success){
        console.log(data.data)
        let listImgUrl;
        let mainImgUrl;
        let imgList = [];
        for(let i = 0; i <data.data.img.length; i++ ){
          const item = data.data.img[i];
           item.imgUrl = item.image_url
          if(String(item.type) === '1'){
            listImgUrl = item;
          }else if(String(item.type) === '2') {
            mainImgUrl = item;
          }else{
            imgList.push(item);
          }
        }
        let productExtendedDetail = []
        if(data.data.productExtendedDetail && data.data.productExtendedDetail.length > 0){
          for(let i = 0; i < data.data.productExtendedDetail.length; i++){
            const item = data.data.productExtendedDetail[i];
            if(item.attrDicName === 'announcements'){ //注意事项
              productExtendedDetail.announcements = item.detailDesc
            }else if(item.attrDicName === 'statement'){ //法律说明
              productExtendedDetail.statement = item.detailDesc
            }else if(item.attrDicName === 'useFlow'){ //使用流程
              productExtendedDetail.useFlow = item.detailDesc
            }else if(item.attrDicName === 'usefulTime'){ //使用有效期
              productExtendedDetail.usefulTime = item.detailDesc
            }else if(item.attrDicName === 'purchaseSucceedsMsg'){ //购买成功文案
              productExtendedDetail.purchaseSucceedsMsg = item.detailDesc
            }else if(item.attrDicName === 'purchaseSucceedsMsg'){ //
              productExtendedDetail.purchaseSucceedsMsg = item.detailDesc
            }else if(item.attrDicName === 'purchaseSucceedsMsg'){ //购买成功文案
              productExtendedDetail.purchaseSucceedsMsg = item.detailDesc
            }
          }
          console.log(productExtendedDetail)
        }
        console.log(listImgUrl)
        yield put({type:'getGoodsDetail',
          currentProduct:data.data,
          productExtendedDetail,
          source:payload.source,
          listImgUrl:listImgUrl,
          mainImgUrl:mainImgUrl,
          imgList:imgList,
          id:payload.id
        })
      }else{
        message.error(data.message)
      }
    },
    *audit({payload = {}},{put,call}){  //审核
      const data = yield call(goodsAudit, payload);
      return data;
    },
  },
  

};