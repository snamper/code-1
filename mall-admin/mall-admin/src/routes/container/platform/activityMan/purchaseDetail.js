"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
// import { routerRedux } from 'dva/router'
// import { routerRedux } from 'dva/router'
import {  Breadcrumb } from 'antd';
// import queryString from 'query-string';
// import config from '@/utils/config'
// import ReactQuill from 'react-quill'; // ES6
// import 'react-quill/dist/quill.snow.css'; // ES6
import DataTabel from '@/components/DataTabel';//引入表格方法
import FilterItem from '@/components/FilterItem';//引入搜索方法
import styles from './activityMan.less'
//活动管理-活动详情-购买 明细
// const confirm = Modal.confirm;

const purchaseLis = ({
  purchaseDetail,
  loading,
  dispatch, 
  location
})=>{
  // const { pathnames } = location;
  // const handleRefresh = (pathname, newQuery) => {
  // 	console.log(pathname)
  //   dispatch(routerRedux.push({
  //     pathname,
  //     search: queryString.stringify({
  //       ...newQuery,
  //     }),
  //   }))
  // }
  // const modalProps = {
  //   currentItem:packList.currentItem,
  //   handleRefresh:handleRefresh
  // }
  const columns = [{
    title: '下单日期',
    dataIndex: 'channelId',
    key: 'channelId'
  }, {
    title: '商品／商品名称',
    dataIndex: 'channelName',
    key: 'channelName',
    className:'channelName'
  }, {
    title: '原价',
    dataIndex: 'companyName',
    key: 'companyName',
    className:'companyName'
  }, {
    title: '购买金额',
    dataIndex: 'createTime',
    key: 'createTime'
  }, {
    title: '用户手机号',
    dataIndex: 'linkPhone',
    key: 'linkPhone',
  }, {
    title: '分享次数',
    dataIndex: 'createTime',
    key: 'createTime1'
  },{
    title: '付款时间',
    dataIndex: 'linkMan',
    key: 'linkMan',
  },{
    title: '付款时间',
    dataIndex: 'linkMan',
    key: 'linkMan2',
  }];
  const filterProps = {//搜索过滤的方法
    location:location,
    dispatch:dispatch,
    filterArray : [
      {
        label:'商品包／商品名称',
        name:'member',
        type:'input'
      },{
        label:'手机号',
        name:'phone',
        type:'input'
      },{
        label:'订单状态',
        type:'select',
        name:'type',
        options:[
          {
            value:'0',
            name:'全部'
          },{
            value:'1',
            name:'已完成'
          },{
            value:'2',
            name:'已关闭'
          }
        ]
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
    dataSource:purchaseDetail.dataSource,  //tabel数据源
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:purchaseDetail.currentPage, //当前页码
      total:purchaseDetail.totalSize,  //总条数
      defaultPageSize:purchaseDetail.pageSize  //当前每页显示条数
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
          </ul>
        </div>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <FilterItem {...filterProps} />
      <DataTabel {...tabelProps} />
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({purchaseDetail,loading})=>({purchaseDetail,loading}))(purchaseLis);
//类型检测
purchaseLis.protoTypes = {
  purchaseDetail:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};