"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Breadcrumb, Button, Modal } from 'antd';
import DataTabel from '@/components/DataTabel';
import FilterItem from '@/components/FilterItem';
import AccountModal from './accountModal'
import ChannelModal from './addChannelModal'
import ResetPwdModal from './resetPassword'
const confirm = Modal.confirm;
const merchantAccount = ({accountModel,loading,dispatch, location})=>{
  const columns = [{
    title: '序号',
    dataIndex: 'channelId',
    key: 'channelId',
    render:(text,record,index) => (<span>{(accountModel.currentPage-1)*accountModel.pageSize+index+1}</span>)
  }, {
    title: '账号',
    dataIndex: 'account',
    key: 'account'
  }, {
    title: '商户名称',
    dataIndex: 'name',
    key: 'name'
  },{
    title: '联系人电话',
    dataIndex: 'connectUserPhone',
    key: 'connectUserPhone'
  }, {
    title: '商户类型',
    dataIndex: 'type',
    key: 'type',
    render:(text,record,index) => (<span>{record.type === 1 ? '商城类商户':(record.type === 2 ? '商品类商品':'供应商')}</span>)
  },{
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },{
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render:(text,record,index) => (<span>{record.status === 1 ? '封停':'正常'}</span>)
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
          <a onClick={() => dispatch({type:'accountModel/showDialog',payload:{currentItem:record,isUpdate:true}})}>修改</a>
          <a style={{marginLeft:12}} onClick={() =>  dispatch({type:'accountModel/showResetPwdDialog',payload:{currentItemChannel:record}})}>重置密码</a>
          { record.status === 0 ? <a style={{marginLeft:12,color:'red'}} onClick={() => updateStatus({type:'封停',id:record.id})}>封停</a> : <a style={{marginLeft:12}} onClick={() => updateStatus({type:'启用',id:record.id})}>启用</a> }
          { record.hasChannel === 0 ? <a style={{marginLeft:12}} onClick={() => dispatch({type:'accountModel/showChannelDialog',payload:{currentItemChannel:record}})}>创建渠道</a> : '' }
        </span>
    ),
  }];
  // const resetPassword = (data) => { //重置密码
  //   confirm({
  //     title: '您确定要重置密码吗？',
  //     okText:'确定',
  //     cancelText:'取消',
  //     onOk() {
  //         dispatch({type:'accountModel/resetPassword',data})
  //     }
  //   });
  // }
  const updateStatus = (source) => { //启用封停
    confirm({
      title: source.type === '启用'?'您确定要启用该账号吗？':'您确定要禁用该账号吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
        if(source.type === '启用') {
          dispatch({type:'accountModel/updateStatus',payload:{id:source.id}})
        }else{  // disabledStatus
          dispatch({type:'accountModel/disabledStatus',payload:{id:source.id}})
        }
          
      }
    });
  }
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"id",  //key值
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
            value:'2',
            name:'供应商'
          },{
            value:'1',
            name:'商城商户'
          }
        ]
      },{
        label:'商户名称',
        name:'name',
        type:'input'
      },{
        label:'账号',
        name:'account',
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
      {accountModel.resetPwd ? <ResetPwdModal /> : ''}
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