"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table, Breadcrumb, Pagination } from 'antd'; //子页面内的面包屑导航
import queryString from 'query-string';
import styles from './index.less' //引入样式
const channelOrderManage = ({channelOrders,loading,dispatch})=>{
	//this.statel.loading = true;
//console.log(channelOrders)
  const columns = [{
    title: '序号',
    dataIndex: 'id',
    key: '1',
    render:(text,record,index) => (<span>{(channelOrders.currentPage-1)*channelOrders.pageSize+index+1}</span>),
    className: styles.tableTextCtnter,
  }, {
    title: '渠道号',
    dataIndex: 'channelId',
    key: 'channelId',
    className: styles.tableTextCtnter,
  }, {
    title: '渠道名称',
    dataIndex: 'channelName',
    key: 'channelName',
    className: styles.tableTextCtnter,
  },{
    title: '联系人',
    dataIndex: 'linkMan',
    key: 'linkMan',
    className: styles.tableTextCtnter,
  },{
    title: '操作',
    key: 'action',
    render: (text, record, index) => (
      <a onClick={() => handleRefresh('channelOrderManage/channelOrderLists',{pageNo:1,pageSize:10,tChannelId:record.channelId,channelName:record.channelName})}>查看订单</a>
    ),
    className: styles.tableTextCtnter,
  }];
  const handleRefresh = (pathname,newQuery) => {
  	console.log(pathname)
    dispatch(routerRedux.push({
      pathname,
      search: newQuery?queryString.stringify({
        ...newQuery,
      }):'',
    }))
  }
  return (
    <div>
      <Breadcrumb separator=">" style={{marginBottom: 20}}>
        <Breadcrumb.Item>渠道订单管理</Breadcrumb.Item>
        <Breadcrumb.Item>渠道订单管理</Breadcrumb.Item>
      </Breadcrumb>
      <Table 
        columns={columns} 
        rowKey={record => record.channelId}  
        dataSource={channelOrders.dataSource} 
        pagination={false} bordered={true} 
      />      
      <div style={{width:'100%',height:'50px',paddingTop:'15px'}}>
        <Pagination 
          showSizeChanger   
          defaultCurrent={channelOrders.currentPage} 
          pageSize={channelOrders.pageSize}
          onChange={(pageNo, pageSize) => {dispatch({type:'channelOrders/query',pageNo, pageSize})}}  
          onShowSizeChange={(pageNo, pageSize) => {dispatch({type:'channelOrders/query',pageNo, pageSize})}} 
          total={channelOrders.totalSize} 
          defaultPageSize={channelOrders.pageSize} 
        />
      </div>
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({channelOrders,loading})=>({channelOrders,loading}))(channelOrderManage);
//类型检测
channelOrderManage.protoTypes = {
  channelOrders:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};