"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { Table, Divider, Breadcrumb, Pagination, Button, Modal } from 'antd';
import queryString from 'query-string';
import ChannelDialog from './ChannelDialog';

const confirm = Modal.confirm;

const channelChooseGoods = ({index,loading,dispatch, location})=>{
  const { pathname } = location;
  const handleRefresh = (newQuery) => {
  	console.log(pathname)
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...newQuery,
      }),
    }))
  }
  const modalProps = {
    currentItem:index.currentItem,
    handleRefresh:handleRefresh
  }
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
    ),
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
            // changePage(1,index.pageSize)
            dispatch({type:'index/query',pageNo:index.currentPage,pageSize:index.pageSize})
          })
        else
          dispatch({type:'index/disabletchannel',tChannelId:channelId})
          .then(() => {
            // changePage(1,index.pageSize)
            dispatch({type:'index/query',pageNo:index.currentPage,pageSize:index.pageSize})
          })
      },
      onCancel() {
        
      },
    });
  }
  const changePage = (pageNo, pageSize) => {
    handleRefresh({pageNo:pageNo,pageSize:pageSize})
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

      <Table 
        columns={columns} 
        rowKey={record => record.channelId} 
        dataSource={index.dataSource}
        pagination={false}
      />
      
      <div style={{width:'100%',height:'50px',paddingTop:'15px'}}>
        <Pagination 
          showSizeChanger   
          defaultCurrent={index.currentPage} 
          onChange={(pageNo, pageSize) => {changePage(pageNo, pageSize)}}  
          onShowSizeChange={(pageNo, pageSize) => {changePage(pageNo, pageSize)}} 
          total={index.totalSize} 
          defaultPageSize={index.pageSize} 
        />
      </div>
      {index.visible?<ChannelDialog {...modalProps}/>:'' }
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