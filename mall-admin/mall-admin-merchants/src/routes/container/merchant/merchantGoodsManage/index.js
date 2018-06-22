"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Breadcrumb, Tabs, Modal, message, Button, Form, InputNumber  } from 'antd';
import { routerRedux } from 'dva/router'
import queryString from 'query-string';
import DataTabel from '@/components/DataTabel';
import FilterItem from '@/components/FilterItem';
import GoodsDetail from './goodsDetail'

const goodsManager = ({goodsManagerModel,loading,dispatch, location, form:{
  getFieldDecorator,
  getFieldsValue
}})=>{
  const TabPane = Tabs.TabPane;
  const confirm = Modal.confirm;
  location.query = queryString.parse(location.search) //获取当前的过滤条件
  const { pathname, query } = location;
  const handleRefresh = (newQuery) => { //当前页面刷新
//	let unionSet = new Set({...query, ...newQuery});
//	console.log(unionSet)
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }
  // const FormItem = Form.Item;
  const columns = [{
    title: '序号',
    dataIndex: 'id',
    key: '1',
    render:(text,record,index) => (<span>{(goodsManagerModel.currentPage-1)*goodsManagerModel.pageSize+index+1}</span>)
  }, {
    title: '商品id',
    dataIndex: 'productId',
    key: 'productId',
  }, {
    title: '商品名称',
    dataIndex: 'productName',
    key: 'productName',
  }, {
    title: '结算价（元）',
    dataIndex: 'channelPrice',
    key: 'channelPrice',
  },{
    title: '建议售价（元）',
    dataIndex: 'retailPrice',
    key: 'retailPrice',
  },{
    title: '商城售价（元）',
    dataIndex: 'mailPrice',
    key: 'mailPrice',
    render: (text, record, index) => (
      <span>
      {
        goodsManagerModel.updatePrice === index?
        getFieldDecorator('product', {
          initialValue: text,
          type:'number',
          rules: [{ required: true, message:'请规范输入价格！', pattern:/^[0-9]*$/ }],
        })(
          <InputNumber min={0} size={"small"} style={{maxWidth:80}} />
        ):text
      }
      </span>
    )
  },{
    title: '库存总量',
    dataIndex: 'stockNum',
    key: 'stockNum'
  },{
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record, index) => (
      <span>
      {record.status === 0?'待上架':record.status === 1?'已上架':record.status === 2?'已下架':record.status === 3?'已失效':''}
      </span>
    )
  },{
    title: '时间',
    dataIndex: 'date',
    key: 'date'
  },{
    title: '操作',
    key: 'action',
    render: (text, record,index) => (
      <span>
      {record.status === 0 || record.status === 2 ?<Button onClick={() => confirmModal(record.id,false,'up')}>上架</Button>:'' }
      {record.status === 1?<Button style={{marginLeft:8}}  onClick={() => confirmModal(record.id,false,'down')}>下架</Button>:'' }
      {
        goodsManagerModel.updatePrice === index ? 
        <Button style={{marginLeft:8}} onClick={() => dispatch({type:'goodsManagerModel/savePrice',payload:{values:getFieldsValue,id:record.id},handleRefresh})}>保存售价</Button>:
        <Button style={{marginLeft:8}} onClick={() => dispatch({type:'goodsManagerModel/changePrice',index})}>修改价格</Button>
      }
      <Button style={{marginLeft:8}} onClick={() => showGoodsDetail(record.productId)}>预览</Button>
    </span>
    )
  }];
  const showGoodsDetail = (productId) => {
    console.log(productId)
    dispatch({type:'goodsManagerModel/getGoodsDetail',payload:{productId:productId}})
    .then((result) => {
      if(result.message !== '成功'){
        message.error("获取详情失败！")
        return;
      }
      dispatch({type:'goodsManagerModel/showGoodsDetail',productId:productId, goodsMessage:result.data})
    })
  }
  const confirmModal = (data,ifbatch,source) => { //上下架操作
    confirm({
      title: '您确定执行该操作吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
          let payload = {}
          if(ifbatch){  //批量
            if(goodsManagerModel.chooseGoodsIds.length <= 0){
              message.error("请先选择上架的商品！");
              return;
            }
            payload = {
              ids:goodsManagerModel.chooseGoodsIds,
              status:source === 'up'?1:2
            }
          }else{
            payload = {
              id:data,
              status:source === 'up'?1:2
            }
          }
          dispatch({type:ifbatch?'goodsManagerModel/updateBatchStatus':'goodsManagerModel/updateGoods',payload})
          .then((result) => {
            if(result.message !== '成功'){
              message.error(result.message);
              return;
            }
            const tips = source === 'up'?'上架成功！':'下架成功！'
            message.success(tips,1,handleRefresh())
            
          })
      },
      onCancel() {
        
      },
    });
  }
  const checkSelection = {
    selectedRowKeys:goodsManagerModel.chooseGoodsKeys,         //回显的key数组
    onSelect: (record, selected, selectedRows) => {   //单个checkbox选择与取消
      const chooseGoodsIds = goodsManagerModel.chooseGoodsIds;
      const chooseGoodsKeys = goodsManagerModel.chooseGoodsKeys;
      if(selected ){
          chooseGoodsIds.push({id:record.id})
          chooseGoodsKeys.push(record.id)
      }else {
        chooseGoodsIds.map((item1,index) => 
          <span>{record.id === item1.id ? chooseGoodsIds.splice(index,1): ''}</span> 
        );
        chooseGoodsKeys.map((item1,index) => 
          <span>{record.id === item1 ? chooseGoodsKeys.splice(index,1): ''}</span> 
        );
      }
      dispatch({
        type:'goodsManagerModel/changeChooseGoods',
        chooseGoodsIds,
        chooseGoodsKeys
      })
    },
    onSelectAll: (selected, selectedRows, changeRows) => {  //全选、反选
      const chooseGoodsIds = goodsManagerModel.chooseGoodsIds;
      const chooseGoodsKeys = goodsManagerModel.chooseGoodsKeys;
      if(selected && changeRows.length > 0){
        changeRows.map((item) => 
          <span>
            {chooseGoodsIds.push({id:item.id})}
            {chooseGoodsKeys.push(item.id)}
          </span>
        )
      }else if(!selected && changeRows.length > 0){
        changeRows.map((item) => 
          <span>
            {chooseGoodsIds.map((item1,index) => 
              <span>{item.id === item1.id ? chooseGoodsIds.splice(index,1): ''}</span>
            )}
            {chooseGoodsKeys.map((item1,index) => 
              <span>{ item.id === item1 ? chooseGoodsKeys.splice(index,1): ''}</span>
            )}
          </span>
        )
      }
      dispatch({
        type:'goodsManagerModel/changeChooseGoods',
        chooseGoodsIds,
        chooseGoodsKeys
      })
    },
    
  };
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"id",  //key值
    dataSource:goodsManagerModel.dataSource,  //tabel数据源
    rowSelection:checkSelection,
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:goodsManagerModel.currentPage, //当前页码
      total:goodsManagerModel.totalSize,  //总条数
      defaultPageSize:goodsManagerModel.pageSize  //当前每页显示条数
    }
  }
  const filterProps = {
    location:location,
    dispatch:dispatch,
    filterArray : [
      {
        label:'商品ID',
        name:'productId',
        type:'input'
      },{
        label:'商品名称',
        name:'productName',
        type:'input'
      }
    ]
  }
  // const updatebatchClick = () => {
  //   console.log(goodsManagerModel.chooseGoodsIds)
  // }
  
  return (
    <div>
      <div className='formBody'>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>商品管理</Breadcrumb.Item>
          <Breadcrumb.Item>管理商品</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      {(goodsManagerModel.tabActive === '0'||goodsManagerModel.tabActive === '1'||goodsManagerModel.tabActive === '2')?
      <Button type="primary" style={{marginLeft:8,position:'absolute',right:24}} onClick={() => {
        dispatch({
          type:'goodsManagerModel/updateBatchStatus',
          payload:{
            ids:goodsManagerModel.chooseGoodsKeys.join(),status:(goodsManagerModel.tabActive === '0'||goodsManagerModel.tabActive === '2')?1:goodsManagerModel.tabActive === '1'?2:''
          }
        })
      }}>{(goodsManagerModel.tabActive === '0'||goodsManagerModel.tabActive === '2')?'批量上架':'批量下架'}</Button>:''}
      <FilterItem {...filterProps} />
      <Tabs defaultActiveKey={goodsManagerModel.tabActive} onChange={(key) => handleRefresh({status:key,pageNo:1,pageSize:goodsManagerModel.pageSize})}>
        <TabPane tab="全部" key="4"></TabPane>
        <TabPane tab="待上架" key="0"></TabPane>
        <TabPane tab="已上架" key="1"></TabPane>
        <TabPane tab="已下架" key="2"></TabPane>
        <TabPane tab="已失效" key="3"></TabPane>
      </Tabs>
      <DataTabel {...tabelProps} />
      <GoodsDetail />
    </div>
  );
};

//将model中的state的数据绑定到组件;
export default connect(({goodsManagerModel,loading})=>({goodsManagerModel,loading}))(Form.create()(goodsManager));
//类型检测
goodsManager.protoTypes = {
  goodsManagerModel:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
}; 