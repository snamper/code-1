"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Breadcrumb, Button, Modal } from 'antd';
import DataTabel from '@/components/DataTabel';
import FilterItem from '@/components/FilterItem';
import SupplierModal from './supplierModal'
const confirm = Modal.confirm;
const supplierManager = ({supplierModel,loading,dispatch, location})=>{
  const columns = [{
    title: '序号',
    dataIndex: 'channelId',
    key: 'channelId',
    render:(text,record,index) => (<span>{(supplierModel.currentPage-1)*supplierModel.pageSize+index+1}</span>)
  }, {
    title: '供应商ID',
    dataIndex: 'id',
    key: 'id'
  }, {
    title: '供应商简称',
    dataIndex: 'short_name',
    key: 'short_name'
  },{
    title: '供应商全称',
    dataIndex: 'full_name',
    key: 'full_name'
  }, {
    title: '发货方式',
    dataIndex: 'deliver_way',
    key: 'deliver_way',
    render:(text,record,index) => (<span>{record.deliver_way === 1 ? '供货商发货':'平台发货'}</span>)
  },{
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time'
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
          <a onClick={() => dispatch({type:'supplierModel/showDialog',payload:{currentItem:record,isUpdate:true}})}>编辑</a>
          <a style={{marginLeft:12}} onClick={() => resetPassword({id:record.id})}>删除</a>
        </span>
    ),
  }];
  const resetPassword = (data) => { //删除
    confirm({
      title: '您确定要删除该供应商吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
          dispatch({type:'supplierModel/delSupplier',payload:{id:data.id}})
      }
    });
  }
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"id",  //key值
    dataSource:supplierModel.dataSource,  //tabel数据源
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:supplierModel.currentPage, //当前页码
      total:supplierModel.totalSize,  //总条数
      defaultPageSize:supplierModel.pageSize  //当前每页显示条数
    }
  }
  const filterProps = {
    location:location,
    dispatch:dispatch,
    filterArray : [
      {
        label:'供货商全称',
        name:'fullName',
        type:'input'
      },{
        label:'发货方式',
        type:'select',
        name:'deliverWay',
        options:[
          {
            value:'0',
            name:'全部'
          },{
            value:'1',
            name:'供货商发货'
          },{
            value:'2',
            name:'平台发货'
          }
        ]
      }
    ]
  }
  return (
    <div>
      <div className='formBody'>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>商户管理</Breadcrumb.Item>
          <Breadcrumb.Item>商户账号管理</Breadcrumb.Item>
        </Breadcrumb>
        <Button onClick={() => dispatch({type:'supplierModel/showDialog'})} type="primary" style={{marginBottom:16,float:'right'}}>新增自营供货商</Button>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <FilterItem {...filterProps}  />
      <DataTabel {...tabelProps} />
      {supplierModel.visible ? <SupplierModal /> : ''}
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({supplierModel,loading})=>({supplierModel,loading}))(supplierManager);
//类型检测
supplierManager.protoTypes = {
  supplierModel:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};