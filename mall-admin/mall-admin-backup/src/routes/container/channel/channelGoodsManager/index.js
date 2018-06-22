"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Modal, Table, Divider, Breadcrumb, Pagination, Button, Tabs, message  } from 'antd';
import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import GoodsDetail from './goodsDetail'
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
const channelChooseGoods = ({goodsManage,loading,dispatch, location})=>{
  const columns = [{
    title: '序号',
    dataIndex: 'id',
    key: '1',
    render:(text,record,index) => (<span>{(goodsManage.currentPage-1)*goodsManage.pageSize+index+1}</span>)
  }, {
    title: '商品id',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: '商品名称',
    dataIndex: 'productName',
    key: 'productName',
  }, {
    title: '商户名称',
    dataIndex: 'merchantName',
    key: 'merchantName',
    render:(text) => <span>{!text?'--':text}</span>
  },{
    title: '零售价（元）',
    dataIndex: 'retailPrice',
    key: 'retailPrice',
  },{
    title: '成本价（元）',
    dataIndex: 'costPrice',
    key: 'costPrice',
  },{
    title: '库存数量',
    dataIndex: 'stockNum',
    key: 'stockNum'
  },{
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        {goodsManage.chooseTab === '0'?
          <span><a onClick={() => confirmModal(record.id,false,'up')}>上架</a><Divider type="vertical" /></span>
        :'' }
        {goodsManage.chooseTab === '1'?
        <span>
        <a onClick={() => confirmModal(record.id,false,'down')}>下架</a>
        <Divider type="vertical" />
        </span>
        :'' }
        <a onClick={() => showGoodsDetail(record.code)}>预览</a>
        {goodsManage.chooseTab === '0' || goodsManage.chooseTab === '2'?
        <span><Divider type="vertical" /><a onClick={() => cancelModal([{id:record.id}],false)}>取消选品</a></span>:'' }
      </span>
    ),
  }];
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }
  const showGoodsDetail = (productId) => {
    dispatch({type:'goodsManage/getGoodsDetail',payload:{productId:productId}})
    .then((result) => {
      if(result.message !== '成功'){
        message.error("获取详情失败！")
        return;
      }
      dispatch({type:'goodsManage/showGoodsDetail',productId:productId, goodsMessage:result.data})
    })
  }
  const checkSelection = {
    selectedRowKeys:goodsManage.chooseGoodsKeys,         //回显的key数组
    onSelect: (record, selected, selectedRows) => {   //单个checkbox选择与取消
      const chooseGoodsIds = goodsManage.chooseGoodsIds;
      const chooseGoodsKeys = goodsManage.chooseGoodsKeys;
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
        type:'goodsManage/changeChooseGoods',
        chooseGoodsIds,
        chooseGoodsKeys
      })
    },
    onSelectAll: (selected, selectedRows, changeRows) => {  //全选、反选
      const chooseGoodsIds = goodsManage.chooseGoodsIds;
      const chooseGoodsKeys = goodsManage.chooseGoodsKeys;
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
        type:'goodsManage/changeChooseGoods',
        chooseGoodsIds,
        chooseGoodsKeys
      })
    },
    
  };
  const confirmModal = (data,ifbatch,source) => { //上下架操作
    
    confirm({
      title: '您确定执行该操作吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
          let payload = {}
          if(ifbatch){  //批量
            if(goodsManage.chooseGoodsIds.length <= 0){
              message.error("请先选择上架的商品！");
              return;
            }
            payload = {
              ids:goodsManage.chooseGoodsIds,
              status:source === 'up'?1:2
            }
          }else{
            payload = {
              id:data,
              status:source === 'up'?1:2
            }
          }
          dispatch({type:ifbatch?'goodsManage/updateBatchStatus':'goodsManage/updateGoods',payload})
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
  const cancelModal = (data,source) => {  //取消选品
    confirm({
      title: '您确定执行该操作吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
          if(source && goodsManage.chooseGoodsIds.length <= 0) {
            message.error("请先选择商品！");
            return;
          }
          let payload = {
            ids:source?goodsManage.chooseGoodsIds:data

          }
          dispatch({type:'goodsManage/cancelBatchProduct',payload})
          .then((result) => {
            if(result.message !== '成功'){
              message.error(result.message);
              return;
            }
            message.success("取消成功！",1,handleRefresh())
          })
      },
      onCancel() {
        
      },
    });
  }
  return (
    <div>
      <div className='formBody'>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>渠道选品</Breadcrumb.Item>
          <Breadcrumb.Item>渠道商品管理</Breadcrumb.Item>
        </Breadcrumb>
        {
          goodsManage.chooseTab === '0'?<span>
            <Button type="primary" style={{float:'right'}} onClick={() => cancelModal('',true)}>批量取消选品</Button>
            <Button type="primary" style={{float:'right',marginRight:12}} onClick={() => confirmModal('',true,'up')}>批量上架</Button>
          </span>:''
        }
        {
          goodsManage.chooseTab === '2'?<span>
            <Button type="primary" style={{float:'right'}} onClick={() => cancelModal('',true)}>批量取消选品</Button>
          </span>:''
        }
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <Tabs defaultActiveKey={goodsManage.chooseTab} onChange={(key) => handleRefresh({status:key,pageNo:1,pageSize:goodsManage.pageSize,ifRestart:1})}>
        <TabPane tab="全部" key="3"></TabPane>
        <TabPane tab="待上架" key="0"></TabPane>
        <TabPane tab="已上架" key="1"></TabPane>
        <TabPane tab="已下架" key="2"></TabPane>
      </Tabs>
      <Table 
        columns={columns}  
        rowSelection={checkSelection} 
        dataSource={goodsManage.dataSource} 
        pagination={false}
        rowKey={record => record.id}
      />
      <div style={{width:'100%',height:'50px',paddingTop:'15px'}}>
        <Pagination 
          showSizeChanger   
          defaultCurrent={goodsManage.currentPage} 
          onChange={(pageNo, pageSize) => {handleRefresh({pageNo, pageSize,status:goodsManage.chooseTab})}}  
          onShowSizeChange={(pageNo, pageSize) => {handleRefresh({pageNo, pageSize,status:goodsManage.chooseTab})}} 
          total={goodsManage.totalSize} 
          defaultPageSize={goodsManage.pageSize} 
        />
      </div>
      <GoodsDetail />
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({goodsManage,loading})=>({goodsManage,loading}))(channelChooseGoods);
//类型检测
channelChooseGoods.protoTypes = {
  goodsManage:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};