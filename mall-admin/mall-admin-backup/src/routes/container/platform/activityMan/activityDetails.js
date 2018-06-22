"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
// import { routerRedux } from 'dva/router'
import { Breadcrumb } from 'antd';
import queryString from 'query-string';
import DataTabel from '@/components/DataTabel';//引入表格方法
import styles from './activityMan.less'
//活动管理-活动详情
// const confirm = Modal.confirm;
const activeLis = ({
  activityList,
  loading,
  dispatch, 
  location
})=>{
  // const { pathname } = location;
  const handleRefresh = (pathname, newQuery) => {
  	console.log(pathname)
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
    title: '日期',
    dataIndex: 'channelId',
    key: 'channelId'
  }, {
    title: '页面pv',
    dataIndex: 'channelName',
    key: 'channelName',
    className:'channelName'
  }, {
    title: '页面uv',
    dataIndex: 'companyName',
    key: 'companyName',
    className:'companyName'
  }, {
    title: '购买次数',
    dataIndex: 'createTime',
    key: 'createTime'
  }, {
    title: '总金额',
    dataIndex: 'linkPhone',
    key: 'linkPhone',
    render:(text,record) => <a onClick={() => handleRefresh('/platform/purchaseDetail',{id: record.channelId})}>{text.length > 10?text.slice(0,9)+'...':text}</a>
  }, {
    title: '分享次数',
    dataIndex: 'createTime',
    key: 'createTime1'
  },{
    title: '注册用户',
    dataIndex: 'linkMan',
    key: 'linkMan',
  },{
    title: '激活用户',
    dataIndex: 'linkMan',
    key: 'linkMan2',
  },{
    title: '次留',
    dataIndex: 'linkMan',
    key: 'linkMan3',
  },{
    title: '7日留存',
    dataIndex: 'linkMan',
    key: 'linkMan4',
  },{
    title: '发放积分',
    dataIndex: 'linkMan',
    key: 'linkMan5',
  }];
 
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"channelId",  //key值
    dataSource:activityList.dataSource,  //tabel数据源
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:activityList.currentPage, //当前页码
      total:activityList.totalSize,  //总条数
      defaultPageSize:activityList.pageSize  //当前每页显示条数
    }
  }
  return (
    <div>
      <div className={styles.formBody}>
        <Breadcrumb style={{marginBottom:30,float:'left'}}>
          <Breadcrumb.Item>活动管理</Breadcrumb.Item>
          <Breadcrumb.Item>活动详情</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.contBox}>
          <ul>
            <li>活动类型：12313213</li>
            <li>活动链接：12313213</li>
            <li>活动名称：12313213</li>
            <li>可否用优惠券：12313213</li>
            <li>活动图：<img src="https://afp.alicdn.com/afp-creative/creative/u124884735/55308755880f8b637dde1f88b84ea9da.png" alt="活动图" /></li>
            <li>选择商品：88888888888,666666,55555</li>
            <li>活动文案：8888888888879874984654613132131111111111111111115646131561321561432165132</li>
          </ul>
        </div>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <DataTabel {...tabelProps} />
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({activityList,loading})=>({activityList,loading}))(activeLis);
//类型检测
activeLis.protoTypes = {
  activityList:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};