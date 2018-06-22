"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import queryString from 'query-string';
import { Table, Breadcrumb, Pagination } from 'antd'; //子页面内需要引入的UI模块
import styles from './index.less' //引入样式
/*运营位管理-渠道首页banner管理*/
const channelHomeBannerMan = ({homeBanners,loading,dispatch})=>{
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
    dataIndex: 'push_status',
    key: 'push_status',
    render:(text) => <span>{text === "1"?'已发布':'未发布'}</span>
  },{
    title: '操作',
    key: 'action',
    render: (text, record, index) => (
      <a onClick={() => handleRefresh('channelHomeBannerMan/setHomeBannerList',{channelId:record.channelId})}>设置</a>
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
	    <Breadcrumb.Item>运营位管理</Breadcrumb.Item>
	    <Breadcrumb.Item>渠道首页banner管理</Breadcrumb.Item>
	  </Breadcrumb>
        <Table columns={columns}  dataSource={homeBanners.dataSource} pagination={false} rowKey={record => record.channelId} bordered={true} />
      <div style={{width:'100%',height:'50px',paddingTop:'15px'}}>
        <Pagination 
          showSizeChanger   
          defaultCurrent={homeBanners.currentPage} 
          onChange={(pageNo, pageSize) => {dispatch({type:'homeBanners/query',pageNo, pageSize})}}  
          onShowSizeChange={(pageNo, pageSize) => {dispatch({type:'homeBanners/query',pageNo, pageSize})}} 
          total={homeBanners.totalSize} 
          defaultPageSize={homeBanners.pageSize} 
        />
      </div>
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({homeBanners,loading})=>({homeBanners,loading}))(channelHomeBannerMan);
//类型检测
channelHomeBannerMan.protoTypes = {
  homeBanners:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};