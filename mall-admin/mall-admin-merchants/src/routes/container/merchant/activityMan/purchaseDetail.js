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
    dataIndex: 'creartDate',
    key: 'creartDate'
  }, {
    title: '商品包／商品名称',
    dataIndex: 'productName',
    key: 'productName',
    className:'channelName'
  }, {
    title: '原价',
    dataIndex: 'retailPrice',
    key: 'retailPrice',
    className:'companyName'
  }, {
    title: '打包价',
    dataIndex: 'packageTotalPrice',
    key: 'packageTotalPrice'
  }, {
    title: '支付积分',
    dataIndex: 'point',
    key: 'point',
  }, {
    title: '支付金额',
    dataIndex: 'paymentAmount',
    key: 'paymentAmount'
  },{
    title: '用户手机号',
    dataIndex: 'paymentPhone',
    key: 'paymentPhone',
  },{
    title: '下单时间',
    dataIndex: 'creartTime',
    key: 'creartTime',
  },{
    title: '付款时间',
    dataIndex: 'paymentTime',
    key: 'paymentTime',
  },{
    title: '订单状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => (
      <span>
        { record.status === 1 ? '未付款' : 
        	record.status === 2 ? '已完成' :
          record.status === 3 ? '已取消' :
          record.status === 4 ? '已关闭' :
          record.status === 5 ? '未知' :
          record.status === 6 ? '积分已支付现金未支付' :
          record.status === 7 ? '兑换失败' :
          record.status === 8 ? '已支付' : ''
        }
      </span>
  ),
  }];
  const filterProps = {//搜索过滤的方法
    location:location,
    dispatch:dispatch,
    filterArray : [
      {
        label:'商品包／商品名称',
        name:'name',
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
            name:'未付款'
          },{
            value:'2',
            name:'已完成'
          },{
            value:'3',
            name:'已取消'
          },{
            value:'4',
            name:'已关闭'
          },{
            value:'5',
            name:'兑换状态未知'
          },{
            value:'6',
            name:'积分已支付现金未支付'
          },{
            value:'7',
            name:'兑换失败'
          },{
            value:'8',
            name:'已支付'
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
          <Breadcrumb.Item>购买明细</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{clear:"both"}}></div>
        <div className={styles.contBox}>
          <ul>
            <li style={{width:500,float:"left",marginBottom:10}}>活动类型：{purchaseDetail.dataInfo.type === 1 ? "活动":"渠道"}</li>
            <li style={{width:900,float:"left",marginBottom:10}}>活动链接：{purchaseDetail.dataInfo.url}</li>
            <li style={{width:500,float:"left",marginBottom:10}}>活动名称：{purchaseDetail.dataInfo.name}</li>
          </ul>
        </div>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <FilterItem {...filterProps} />
      <div className={styles.dataNumBox}>
        <ul>
          <li><span className={styles.dataNumText}>{purchaseDetail.dataInfo.totalPoint||0}</span><span>支付积分</span></li>
          <li><span className={styles.dataNumText}>{purchaseDetail.dataInfo.totalPrice||0}</span><span>支付现金</span></li>
        </ul>
      </div>
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