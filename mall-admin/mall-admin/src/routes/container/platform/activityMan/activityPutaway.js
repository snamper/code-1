"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
// import { routerRedux } from 'dva/router'
import { Divider, Breadcrumb, Tabs } from 'antd';
import queryString from 'query-string';
import DataTabel from '@/components/DataTabel';//引入表格方法
import FilterItem from '@/components/FilterItem';//引入搜索方法
// import styles from './activityaway.less'
//活动管理
// const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;
const putaways = ({
  activityPutawayList,
  loading,
  dispatch, 
  location
})=>{
  const { pathname, query } = location;
  const handleRefresh = (pathname,newQuery) => {
  	console.log(pathname,query)
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...newQuery,
      }),
    }))
  }
  // const modalProps = {
  //   currentItem:packList.currentItem,
  //   handleRefresh:handleRefresh
  // }
  const columns = [{
    title: '序号',
    dataIndex: 'channelId',
    key: 'channelId',
    render:(text,record,index) => (<span>{(activityPutawayList.currentPage-1)*activityPutawayList.pageSize+index+1}</span>)
  }, {
    title: '活动名称',
    dataIndex: 'channelName',
    key: 'channelName',
    className:'channelName',
  },{
    title: '设置时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },{
    title: '设置人',
    dataIndex: 'linkMan',
    key: 'linkMan',
  },{
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a onClick={() => handleRefresh('/platform/setActivityPut',{activeId:record})}>待设置</a>
        <Divider type="vertical" />
        <a onClick={() => {dispatch({type:'activityPutawayList/packLisDelFn',payload:{packsId:record}})}}>编辑</a>
        <Divider type="vertical" />
        <a onClick={() => {dispatch({type:'activityPutawayList/packLisDelFn',payload:{packsId:record}})}}>上架</a>
        <Divider type="vertical" />
        <a onClick={() => {dispatch({type:'activityPutawayList/packLisDelFn',payload:{packsId:record}})}}>下架</a>
      </span>
    ),
  }];
  //删除操作
  // const packLisDelFnClick = (packsId) => {
  //   confirm({
  //     title: '您确定执行此次操作吗？',
  //     okText:'确定',
  //     cancelText:'取消',
  //     onOk() {
  //       dispatch({type:'packList/packLisDelFn',packsId:packsId})
  //       .then((result) => {
  //     	  if(result.message !== '成功'){
  //           message.error(result.message);
  //           return;
  //     	  }
  //         dispatch({type:'packList/query',pageNo:activityPutawayList.currentPage,pageSize:activityPutawayList.pageSize})
  //       })
  //     },
  //     onCancel() {
  //       console.log('取消了')
  //     },
  //   });
  // }
  const filterProps = {//搜索过滤的方法
    location:location,
    dispatch:dispatch,
    filterArray : [
      {
        label:'活动名称',
        name:'member',
        type:'input'
      },{
        label:'时间',
        type:'timer',
        name:'timerRange',
        format:'YYYY-MM-DD HH:mm:ss',
        children:['startTime','endTime']
      }
    ]
  }
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"channelId",  //key值
    dataSource:activityPutawayList.dataSource,  //tabel数据源
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:activityPutawayList.currentPage, //当前页码
      total:activityPutawayList.totalSize,  //总条数
      defaultPageSize:activityPutawayList.pageSize  //当前每页显示条数
    }
  }
  const changeTab = (key) => {
    handleRefresh(pathname,{tabStatus:key})
  }
  return (
    <div>
      <div className='formBody'>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>活动管理</Breadcrumb.Item>
          <Breadcrumb.Item>活动上架管理</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <Tabs defaultActiveKey={String(activityPutawayList.activeTab)} onChange={changeTab}>
        <TabPane tab="待设置" key="1"></TabPane>
        <TabPane tab="待上架" key="2"></TabPane>
        <TabPane tab="已上架" key="3"></TabPane>
        <TabPane tab="全部" key="4"></TabPane>
      </Tabs>
      <FilterItem {...filterProps} />
      <DataTabel {...tabelProps} />
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({activityPutawayList,loading})=>({activityPutawayList,loading}))(putaways);
//类型检测
putaways.protoTypes = {
  activityPutawayList:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};