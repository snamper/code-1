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
  activityList1,
  loading,
  dispatch, 
  location
})=>{
  // const { pathname } = location;
  const handleRefresh = (pathname, newQuery) => {
  	// console.log(pathname)
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...newQuery,
      }),
    }))
  }
  const columns = [{
    title: '日期',
    dataIndex: 'date',
    key: 'date'
  }, {
    title: '页面pv',
    dataIndex: 'pv',
    key: 'pv',
    className:'channelName'
  }, {
    title: '页面uv',
    dataIndex: 'uv',
    key: 'uv',
    className:'companyName'
  }, {
    title: '购买次数',
    dataIndex: 'buyCount',
    key: 'buyCount'
  }, {
    title: '总金额',
    dataIndex: 'priceTotal',
    key: 'priceTotal',
    render:(text,record) => <a onClick={() => handleRefresh('/merchant/purchaseDetail',{id:activityList1.id,date:record.date})}>{text}</a>
  }, {
    title: '分享次数',
    dataIndex: 'shareCount',
    key: 'shareCount'
  },{
    title: '注册用户',
    dataIndex: 'registerUser',
    key: 'registerUser',
  },{
    title: '激活用户',
    dataIndex: 'activateUser',
    key: 'activateUser',
  },{
    title: '次留',
    dataIndex: 'nextDay',
    key: 'nextDay',
  },{
    title: '7日留存',
    dataIndex: 'nextWeek',
    key: 'nextWeek',
  },{
    title: '发放积分',
    dataIndex: 'point',
    key: 'point',
  }];
 
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"date",  //key值
    dataSource:activityList1.dataSource,  //tabel数据源
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:activityList1.currentPage, //当前页码
      total:activityList1.totalSize,  //总条数
      defaultPageSize:activityList1.pageSize<1?1:activityList1.pageSize  //当前每页显示条数
    }
  }
  // /***<DataTabel {...tabelProps} />***/
  return (
    <div>
      <div className={styles.formBody}>
        <Breadcrumb style={{marginBottom:30,float:'left'}}>
          <Breadcrumb.Item>活动管理</Breadcrumb.Item>
          <Breadcrumb.Item>活动详情</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.contentBox}>
          <ul>
            <li>活动类型：{activityList1.content.type===1?"活动":"未知"}</li>
            <li>活动链接：{activityList1.content.url}</li>
            <li>活动名称：{activityList1.content.name}</li>
            <li>活动图：<img src={activityList1.content.imageUrl} alt="活动图" /></li>
            <li>选择商品：{activityList1.content.productInfo}</li>
            <li>活动文案：{activityList1.content.describe}</li>
          </ul>
        </div>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <DataTabel {...tabelProps} />
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({activityList1,loading})=>({activityList1,loading}))(activeLis);
//类型检测
activeLis.protoTypes = {
  activityList1:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};