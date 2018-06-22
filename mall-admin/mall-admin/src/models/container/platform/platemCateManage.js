"use strict";
import { getCateManagerList,saveCate } from '@/services/container/platform/goodsManager';
import {pathCheck,routes} from '@/app/pathCheck';
export default {
  namespace: 'goodsCate',
  state: {
    dataSource: [], //分类列表
    defaultExpandedRowKeys:[],  //默认展开的行号
    defaultExpandAllRows:false, //是否全部展开
    changeList:[],  //保存之前所有操作
    editCurrId: '',  //当前编辑的是哪个
    editCurrKey:'',  //是否当前存在新增但是没有添加内容的分类
    visible:false,  //弹窗是否显示
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      pathCheck(dispatch, history,routes[12]);
    },
  },
  reducers: {
  	getList:function(state,action){
      return {
        ...state,
        dataSource: action.dataSource,
        editCurrId: '',  //当前编辑的是哪个
        editCurrKey:'',  //是否当前存在新增但是没有添加内容的分类
      }
    },
    addChild:function(state,action){  //添加子分类
      return {
        ...state,
        dataSource: action.dataSource,
        editCurrKey:action.keyFlag
      }
    },
    changeSource:function(state,action){  //改变数据源（排序，删除）
      return {
        ...state,
        dataSource: action.dataSource
      }
    },
    changeListSource:function(state,action){  //改变要保存的数据列表
      console.log(action.changeList)
      return {
        ...state,
        changeList: action.changeList
      }
    },
    editName:function(state,action){  //编辑
      return {
        ...state,
        editCurrId: action.id,
        editCurrKey:action.key
      }
    },
    showModal:function(state,action){  //显示弹窗
      return {
        ...state,
        visible: true
      }
    },
    hideDialog:function(state,action){  //显示弹窗
      return {
        ...state,
        visible: false
      }
    },
    // clearState:function(state,action){  //编辑
    //   return {
    //     ...state,
    //     editCurrId: action.payload.,
    //     editCurrKey:action.key
    //   }
    // },
    expandAllRows: function(state,action) {
      return {
        ...state,
        defaultExpandAllRows: !state.defaultExpandAllRows
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
      const data = yield call(getCateManagerList, payload);
      if(data.success){
        const dataSource = data.data;
        yield put({type:'getList',dataSource})
        if(source === 'clearKeys'){   //如果是提交成功则清除选中的chenckbox
          yield put({type:'changeChooseGoodsCate'})
        }
      }else{
        console.log("out")
      }
    },
    *saveCateMessage({changeList},{put,call}){
      const data = yield call(saveCate, changeList);
      return data
    },
  },
  

};