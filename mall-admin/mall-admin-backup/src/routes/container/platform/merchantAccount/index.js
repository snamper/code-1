"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Breadcrumb, Button, Modal } from 'antd';
import DataTabel from '@/components/DataTabel';
import FilterItem from '@/components/FilterItem';
import AccountModal from './accountModal'
import ChannelModal from './addChannelModal'
const confirm = Modal.confirm;
const merchantAccount = ({accountModel,loading,dispatch, location})=>{
  const columns = [{
    title: '序号',
    dataIndex: 'channelId',
    key: 'channelId',
    render:(text,record,index) => (<span>{(accountModel.currentPage-1)*accountModel.pageSize+index+1}</span>)
  }, {
    title: '账号',
    dataIndex: 'channelName',
    key: 'channelName'
  }, {
    title: '商户名称',
    dataIndex: 'companyName',
    key: 'companyName'
  },{
    title: '联系人电话',
    dataIndex: 'linkMan',
    key: 'linkMan'
  }, {
    title: '商户类型',
    dataIndex: 'createTime',
    key: 'createTime'
  },{
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'regitserTime'
  },{
    title: '状态',
    dataIndex: 'createTime',
    key: 'loginTime'
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
          <a onClick={() => dispatch({type:'accountModel/showDialog',payload:{currentItem:record,isUpdate:true}})}>修改</a>
          <a style={{marginLeft:12}} onClick={() => resetPassword()}>重置密码</a>
          <a style={{marginLeft:12}} onClick={() => updateStatus('启用')}>启用</a>
          <a style={{marginLeft:12,color:'red'}} onClick={() => updateStatus('封停')}>封停</a>
          <a style={{marginLeft:12}} onClick={() => dispatch({type:'accountModel/showChannelDialog'})}>创建渠道</a>
        </span>
    ),
  }];
  const resetPassword = () => { //重置密码
    confirm({
      title: '您确定要重置密码吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
          dispatch({type:'accountModel/resetPassword',payload:{}})
      }
    });
  }
  const updateStatus = (source) => { //启用封停
    confirm({
      title: source === '启用'?'您确定要启用该账号吗？':'您确定要禁用该账号吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
          dispatch({type:'accountModel/updateStatus',payload:{}})
      }
    });
  }
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"channelId",  //key值
    dataSource:accountModel.dataSource,  //tabel数据源
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:accountModel.currentPage, //当前页码
      total:accountModel.totalSize,  //总条数
      defaultPageSize:accountModel.pageSize  //当前每页显示条数
    }
  }
  const filterProps = {
    location:location,
    dispatch:dispatch,
    filterArray : [
      {
        label:'商户类型',
        type:'select',
        name:'type',
        options:[
          {
            value:'1',
            name:'供应商'
          },{
            value:'2',
            name:'商城商户'
          }
        ]
      },{
        label:'商户名称',
        name:'member',
        type:'input'
      },{
        label:'账号',
        name:'name',
        type:'input'
      },{
        label:'创建时间',
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
          <Breadcrumb.Item>商户管理</Breadcrumb.Item>
          <Breadcrumb.Item>商户账号管理</Breadcrumb.Item>
        </Breadcrumb>
        <Button onClick={() => dispatch({type:'accountModel/showDialog'})} type="primary" style={{marginBottom:16,float:'right'}}>新增商户</Button>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <FilterItem {...filterProps}  />
      <DataTabel {...tabelProps} />
      {accountModel.visible ? <AccountModal /> : ''}
      {accountModel.channelVisible ? <ChannelModal /> : ''}
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({accountModel,loading})=>({accountModel,loading}))(merchantAccount);
//类型检测
merchantAccount.protoTypes = {
  accountModel:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};