"use strict";
import { goodsCateList, goodsList, addTypeProduct, addBatchProduct } from '@/services/container/platform/goodsCate';
import queryString from 'query-string';
export default {
  namespace: 'goodsCate',
  state: {
    dataSource: [{
      id: 1,
      name: 'John Brown sr.',
      age: 60,
      address: 'New York No. 1 Lake Park',
      type:1,
      sort:1,
      children: [{
        id: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
        type:2,
        sort:1,
        pid:1,
        len:3
      }, {
        id: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        type:2,
        sort:2,
        pid:1,
        len:3
      }, {
        id: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        type:2,
        sort:3,
        pid:1,
        len:3
      }],
    }, {
      id: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      type:1,
      sort:2,
      children: [{
        id: 131,
        name: 'Jim Green',
        age: 42,
        address: 'London No. 2 Lake Park',
        type:2,
        sort:1,
        pid:2,
        len:1
      }],
    },{
      id:3,
      name:'liuyi',
      age:18,
      type:1,
      address:'bj',
      sort:3,
      children: [{
        id: 1311,
        name: 'Jim Green jr.',
        age: 25,
        address: 'London No. 3 Lake Park',
        sort:1,
        pid:3,
        len:2
      }, {
        id: 1312,
        name: 'Jimmy Green sr.',
        age: 18,
        address: 'London No. 4 Lake Park',
        sort:2,
        pid:3,
        len:2
      }],
    }], //渠道列表
    defaultExpandedRowKeys:[],  //默认展开的行号
    goodsList:[], //商品列表
    totalSize:0,
    pageSize: 10,
    currentPage: 1,
    defaultExpandAllRows:false
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/platform/platemCateManage') {
          const payload = location.search ? queryString.parse(location.search) : { pageNo: 1, pageSize: 10, channelId:1}
          if(!payload.pageNo || !payload.pageSize) {
            payload.pageNo = 1;
            payload.pageSize = 10;
          }
          // dispatch({
          //   type: 'query',
          //   payload,
          // })
        }
      })
    },
  },
  reducers: {
  	getList:function(state,action){
      return {
        ...state,
        dataSource: action.dataSource,
        totalSize: action.totalSize,
        currentPage: action.currentPage,
        pageSize: action.pageSize,
        channelId: action.channelId,
        chooseGoodsIds:[],  //已选商品列表
		    chooseGoodsKeys:[], 
		    chooseCateIds:[],  //已选分类列表
		    chooseCateKeys:[],
      }
    },
    addChild:function(state,action){  //添加子分类
      return {
        ...state,
        dataSource: action.dataSource
      }
    },
    changeSort:function(state,action){  //改变排序
      return {
        ...state,
        dataSource: action.dataSource
      }
    },
    expandAllRows: function(state,action) {
      return {
        ...state,
        defaultExpandAllRows: true
      }
    },
    changeExpandRows: function(state, action) {
      return {
        ...state,
        defaultExpandedRowKeys: action.defaultExpandedRowKeys,
      }
    }
  },
  effects:{
    *query({payload = {},source},{put,call}){
      const data = yield call(goodsCateList, payload);
      if(data.success){
        const dataSource = data.data.datas;
        const totalSize = data.data.totalRows;
        const currentPage = data.data.pageNo;
        const pageSize = data.data.pageSize;
        const channelId = payload.channelId;
        yield put({type:'getList',dataSource,totalSize,currentPage,pageSize,channelId})
        if(source === 'clearKeys'){   //如果是提交成功则清除选中的chenckbox
          yield put({type:'changeChooseGoodsCate'})
        }
      }else{
        console.log("out")
      }
    },
    *getGoodsList({payload = {},pageNo,pageSize,productName,merchantName,sortId},{select,put,call}){
      payload = {
        pageNo:pageNo,
        pageSize:pageSize,
        productName:productName,
        merchantName:merchantName,
        sortId:sortId
      }
      const data = yield call(goodsList, payload);
      if(data.success){
        const goodsList = data.data;
        yield put({type:'showDialog',sortId,goodsList,productName,merchantName})
      }else{
        console.log("out")
      }
    },  
    *chooseGoods({sortId,pageNo,pageSize,channelId},{put, call}){  //显示弹窗
      const data = yield call(goodsList,{sortId:sortId,pageNo:pageNo,pageSize:pageSize,channelId:channelId})
      if(data.success){
        const goodsList = data.data;
        yield put({type:'showDialog', sortId, goodsList})
      }else{
        
      }
      
    },
    *hideDialog({test},{put, call}){  //隐藏弹窗
      const visible = false;
      const isUpdate = false;
      yield put({type:'dialogControll',visible, isUpdate})
    },
    *commitGoodsByCate({channelId,ids},{put,call}){ //根据分类添加商品
      const data = {
        channelId:Number(channelId),
        ids:JSON.stringify(ids)
      }
      const result = yield call(addTypeProduct,data)
      return result
    },
    *commitGoods({channelId,ids},{put,call}){ //批量添加商品
      const data = {
        channelId:Number(channelId),
        ids:JSON.stringify(ids)
      }
      console.log(data)
      const result = yield call(addBatchProduct,data)
      console.log(result)
      return result
    },
    saveMessage({validateFieldsAndScroll},{put,call}) {
      validateFieldsAndScroll((errors, values) => {
        console.log(values)
        if (errors) {
          return
        }
      })
    }
  },
  

};