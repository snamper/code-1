"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import {  Divider, Breadcrumb, Button, Modal } from 'antd';
import DataTabel from '../../../../components/DataTabel';
import FilterItem from '../../../../components/FilterItem';

const confirm = Modal.confirm;

const channelChooseGoods = ({index,loading,dispatch, location})=>{
  const columns = [{
    title: '渠道号',
    dataIndex: 'channelId',
    key: 'channelId'
  }, {
    title: '渠道名称',
    dataIndex: 'channelName',
    key: 'channelName',
    className:'channelName',
    onCell:(record) => ({title:record.channelName}),
    render:(text,record) => <span>{text.length > 10?text.slice(0,9)+'...':text}</span>
  }, {
    title: '企业名称',
    dataIndex: 'companyName',
    key: 'companyName',
    className:'companyName',
    onCell:(record) => ({title:record.companyName}),
    render:(text,record) => <span>{text.length > 10?text.slice(0,9)+'...':text}</span>
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },{
    title: '联系人',
    dataIndex: 'linkMan',
    key: 'linkMan',
  },{
    title: '联系电话',
    dataIndex: 'linkPhone',
    key: 'linkPhone',
  },{
    title: '状态',
    dataIndex: 'channelStatus',
    key: 'channelStatus',
    render:(text,record) => <span>{text === 1?'已启用':'已停用'}</span>
  },{
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a onClick={() => {dispatch({type:'index/showDialog',payload:{currentItem:record,isUpdate:true}})}}>编辑</a>
        <Divider type="vertical" />
        {
          record.channelStatus===1?
          <a onClick={() => confirmModal(record.channelId,'disable')}>禁用</a>:
          <a onClick={() => confirmModal(record.channelId,'enable')}>启用</a>
        }
      </span>
    )
  }];
  const confirmModal = (channelId,source) => {
    confirm({
      title: source === 'enable'?'您确定启用吗？':'您确定禁用吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
        if(source === 'enable') //去启用
          dispatch({type:'index/enabletchannel',tChannelId:channelId})
          .then(() => {
            dispatch({type:'index/query',pageNo:index.currentPage,pageSize:index.pageSize})
          })
        else
          dispatch({type:'index/disabletchannel',tChannelId:channelId})
          .then(() => {
            dispatch({type:'index/query',pageNo:index.currentPage,pageSize:index.pageSize})
          })
      },
      onCancel() {
        
      },
    });
  }
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"channelId",  //key值
    dataSource:index.dataSource,  //tabel数据源
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:index.currentPage, //当前页码
      total:index.totalSize,  //总条数
      defaultPageSize:index.pageSize  //当前每页显示条数
    }
  }
  const filterProps = {
    location:location,
    dispatch:dispatch,
    filterArray : [
      {
        label:'渠道名称',
        name:'channelName',
        type:'input'
      },{
        label:'状态',
        type:'select',
        name:'channelStatus',
        options:[
          {
            value:'1',
            name:'启用'
          },{
            value:'2',
            name:'禁用'
          }
        ]
      },{
        label:'时间范围',
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
          <Breadcrumb.Item>渠道管理</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" style={{float:'right'}} onClick={() => {dispatch({type:'index/showDialog',payload:{currentItem:{},isUpdate:false}})}}>新建</Button>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <FilterItem {...filterProps}  />
      <DataTabel {...tabelProps} />
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({index,loading})=>({index,loading}))(channelChooseGoods);
//类型检测
channelChooseGoods.protoTypes = {
  index:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};