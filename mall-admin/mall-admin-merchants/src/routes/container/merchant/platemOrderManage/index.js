"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Breadcrumb, Button } from 'antd';
import DataTabel from '@/components/DataTabel';
import FilterItem from '@/components/FilterItem';

const chanslateStatus = function(status){
  switch(status){
    case 1 :
      return "待付款";
    case 2 :
      return "已完成";
    case 3 :
      return "已取消";
    case 4 :
      return "已关闭";
    case 5 :
      return "兑换状态未知";
    case 6 :
      return "积分已支付现金未支付";
    case 7 :
      return "兑换失败";
    case 8 :
      return "已支付";     
    default:
      return "未知状态"
  }
};
const payment_status = function(status){
  switch(status){
    case '1' :
      return "未支付";
    case '2' :
      return "已支付";
    case '3' :
      return "已退款";    
    default:
      return "参数错误"
  }
}
const merchantOrder = ({orderModel,loading,dispatch, location})=>{
  const columns = [{
    title: '序号',
    key: 'id',
    render:(text,record,index) => (<span>{(orderModel.currentPage-1)*orderModel.pageSize+index+1}</span>)
  }, {
    title: '订单编号',
    dataIndex: 'orderno',
    key: 'orderno'
  }, {
    title: '商品名称',
    dataIndex: 'full_name',
    key: 'full_name'
  },{
    title: '会员账号',
    dataIndex: 'h5_store_user_identify',
    key: 'h5_store_user_identify'
  }, {
    title: '消耗积分',
    dataIndex: 'point',
    key: 'point'
  },{
    title: '消耗金额（元）',
    dataIndex: 'payment_amount',
    key: 'payment_amount',
    render:(text)=>(`${text/100}`)
  },{
    title: '订单状态',
    dataIndex: 'status',
    key: 'status',
    render:(text)=>(chanslateStatus(text))
  },{
    title: '下单时间',
    dataIndex: 'create_time',
    key: 'create_time'
  },{
    title: '支付状态',
    dataIndex: 'payment_status',
    key: 'payment_status',
    render:(text)=>(payment_status(text))
  }];
  
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"id",  //key值
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
        name:'orderno',
        type:'input'
      },{
        label:'商品名称',
        name:'productName',
        type:'input'
      },{
        label:'会员账号',
        name:'h5StoreUserIdentify',
        type:'input'
      },{
        label:'订单状态',
        type:'select',
        name:'orderStatus',
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
          }
        ]
      },{
        label:'下单时间',
        type:'timer',
        name:'timerRange',
        format:'YYYY-MM-DD HH:mm:ss',
        children:['createTimeBefore','createTimeEnd']
      }
    ]
  }
  return (
    <div>
      <div className='formBody'>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>订单管理</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" style={{float:'right'}} onClick={() => {dispatch({type:'orderModel/exportExcel',payload:location.query,that:this})}}>导出</Button>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <FilterItem {...filterProps}  />
      <DataTabel {...tabelProps} />
      <a style={{display:'none'}} id='export' download='导出结果.xlsx' href={orderModel.exportUrl}>导出</a>
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