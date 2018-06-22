"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Breadcrumb, Button } from 'antd';
import DataTabel from '@/components/DataTabel';
import FilterItem from '@/components/FilterItem';

const merchantOrder = ({orderModel,loading,dispatch, location})=>{
  const columns = [{
    title: '序号',
    dataIndex: 'channelId',
    key: 'channelId',
    render:(text,record,index) => (<span>{(orderModel.currentPage-1)*orderModel.pageSize+index+1}</span>)
  }, {
    title: '订单编号',
    dataIndex: 'channelName',
    key: 'channelName'
  }, {
    title: '商品名称',
    dataIndex: 'companyName',
    key: 'companyName'
  },{
    title: '会员账号',
    dataIndex: 'linkMan',
    key: 'linkMan'
  }, {
    title: '消耗积分',
    dataIndex: 'createTime',
    key: 'createTime'
  },{
    title: '消耗金额（元）',
    dataIndex: 'createTime',
    key: 'regitserTime'
  },{
    title: '订单状态',
    dataIndex: 'createTime',
    key: 'status'
  },{
    title: '下单时间',
    dataIndex: 'createTime',
    key: 'loginTime'
  },{
    title: '支付状态',
    dataIndex: 'createTime',
    key: 'patStatus'
  }];
  
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"channelId",  //key值
    dataSource:orderModel.dataSource,  //tabel数据源
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:orderModel.currentPage, //当前页码
      total:orderModel.totalSize,  //总条数
      defaultPageSize:orderModel.pageSize  //当前每页显示条数
    }
  }
  const filterProps = {
    location:location,
    dispatch:dispatch,
    filterArray : [
      {
        label:'订单编号',
        name:'member',
        type:'input'
      },{
        label:'商品名称',
        name:'name',
        type:'input'
      },{
        label:'会员账号',
        name:'pointStart',
        type:'input'
      },{
        label:'订单状态',
        type:'select',
        name:'status',
        options:[
          {
            value:'1',
            name:'待付款'
          },{
            value:'2',
            name:'已完成'
          },{
            value:'3',
            name:'已取消'
          }
        ]
      },{
        label:'下单时间',
        type:'timer',
        name:'timerRange',
        format:'YYYY-MM-DD HH:mm:ss',
        children:['startTime','endTime']
      }
    ]
  }
  return (
    <div>
      <div className='formBody'>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>订单管理</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" style={{float:'right'}} onClick={() => {dispatch({type:'orderModel/exportExcel',payload:{orderStatus:0},that:this})}}>导出</Button>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <FilterItem {...filterProps}  />
      <DataTabel {...tabelProps} />
      <a style={{display:'none'}} id='test' download='导出结果.xlsx' href={orderModel.exportUrl}>导出</a>
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({orderModel,loading})=>({orderModel,loading}))(merchantOrder);
//类型检测
merchantOrder.protoTypes = {
  orderModel:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};