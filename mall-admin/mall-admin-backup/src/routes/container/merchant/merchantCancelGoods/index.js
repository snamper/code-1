"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router'
import queryString from 'query-string';
import { connect } from 'dva';
import { Breadcrumb, Modal } from 'antd';
import DataTabel from '@/components/DataTabel';
import GoodsFilter from './cancelGoodsFilter'

const confirm = Modal.confirm;

const cancelGoods = ({cancelGoodsModel,loading,dispatch, location})=>{
  const columns = [{
    title: '序号',
    dataIndex: 'channelId',
    key: 'channelId',
    render:(text,record,index) => (<span>{(cancelGoodsModel.currentPage-1)*cancelGoodsModel.pageSize+index+1}</span>)
  }, {
    title: '商品ID',
    dataIndex: 'channelId',
    key: 'id'
  }, {
    title: '商品名称',
    dataIndex: 'channelName',
    key: 'channelName'
  }, {
    title: '结算价（元）',
    dataIndex: 'companyName',
    key: 'companyName'
  },{
    title: '建议售价（元）',
    dataIndex: 'linkMan',
    key: 'linkMan'
  }, {
    title: '库存总量',
    dataIndex: 'createTime',
    key: 'createTime'
  },{
    title: '状态',
    dataIndex: 'createTime',
    key: 'regitserTime'
  },{
    title: '选品时间',
    dataIndex: 'createTime',
    key: 'loginTime'
  },{
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <a onClick={() => {confirmModal(record.id)}}>取消选品</a>
    )
  }];
  const confirmModal = () => {
    confirm({
      title: '您确定要取消该选品吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
          
      },
      onCancel() {
        return;
      },
    });
  }
  location.query = queryString.parse(location.search) //获取当前的过滤条件
  const { pathname, query } = location;
  const handleRefresh = (newQuery) => { //当前页面刷新
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }
  const filter = {
    handleRefresh:handleRefresh,
    query:location.query
  }
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"channelId",  //key值
    dataSource:cancelGoodsModel.dataSource,  //tabel数据源
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:cancelGoodsModel.currentPage, //当前页码
      total:cancelGoodsModel.totalSize,  //总条数
      defaultPageSize:cancelGoodsModel.pageSize  //当前每页显示条数
    }
  }
  return (
    <div>
      <div className='formBody'>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>商品管理</Breadcrumb.Item>
          <Breadcrumb.Item>取消选品</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <GoodsFilter {...filter} />
      <DataTabel {...tabelProps} />
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({cancelGoodsModel,loading})=>({cancelGoodsModel,loading}))(cancelGoods);
//类型检测
cancelGoods.protoTypes = {
  cancelGoodsModel:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};