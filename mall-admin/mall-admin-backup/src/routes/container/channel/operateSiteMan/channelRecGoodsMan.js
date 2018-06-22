"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import queryString from 'query-string';
import { Table, Breadcrumb, Pagination } from 'antd'; //子页面内的面包屑导航
import styles from './index.less' //引入样式
/*运营位管理-渠道推荐商品管理*/
const channelRecGoodsMan = ({channelRecGood,loading,dispatch})=>{
  const columns = [{
    title: '渠道号',
    dataIndex: 'channelId',
    key: 'channelId'
  }, {
    title: '渠道名称',
    dataIndex: 'channelName',
    key: 'channelName',
  }, {
    title: '企业名称',
    dataIndex: 'companyName',
    key: 'companyName',
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },{
    title: '联系人',
    dataIndex: 'linkMan',
    key: 'linkMan',
  },{
    title: '联系电话',
    dataIndex: 'linkPhone',
    key: 'linkPhone',
  },{
    title: '状态',
    dataIndex: 'channelStatus',
    key: 'channelStatus',
    render:(text) => <span>{text === 1?'已启用':'已停用'}</span>
  },{
    title: '操作',
    key: 'action',
    render: (text, record, index) => (
      <a onClick={() => handleRefresh('channelRecGoodsMan/setRecGoodsList',{channelId:record.channelId})}>设置</a>
    ),
    className: styles.tableTextCtnter,
  }];
  const handleRefresh = (pathname,newQuery) => {
  	console.log(pathname,newQuery)
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
	    <Breadcrumb.Item>运营位管理</Breadcrumb.Item>
	    <Breadcrumb.Item>渠道推荐商品管理</Breadcrumb.Item>
	  </Breadcrumb>
    <Table columns={columns} rowKey={record => record.channelId} dataSource={channelRecGood.dataSource} pagination={false} bordered={true} />
      <div style={{width:'100%',height:'50px',paddingTop:'15px'}}>
        <Pagination 
          showSizeChanger   
          defaultCurrent={channelRecGood.currentPage} 
          onChange={(pageNo, pageSize) => {dispatch({type:'channelRecGood/query',pageNo, pageSize})}}  
          onShowSizeChange={(pageNo, pageSize) => {dispatch({type:'channelRecGood/query',pageNo, pageSize})}} 
          total={channelRecGood.totalSize} 
          defaultPageSize={channelRecGood.pageSize} 
        />
      </div>
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({channelRecGood,loading})=>({channelRecGood,loading}))(channelRecGoodsMan);
//类型检测
channelRecGoodsMan.protoTypes = {
  channelRecGood:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};