"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
// import { routerRedux } from 'dva/router'
import { Divider, Breadcrumb, Button, Modal, message } from 'antd';
// import queryString from 'query-string';
import DataTabel from '@/components/DataTabel';//引入表格方法
import FilterItem from '@/components/FilterItem';//引入搜索方法
//商品打包管理
const confirm = Modal.confirm;
const goodsPacks = ({packList,loading,dispatch, location})=>{
  // const { pathname } = location;
  const handleRefresh = (pathname) => {
  	console.log(pathname)
    dispatch(routerRedux.push({
      pathname
    }))
  }
  // const modalProps = {
  //   currentItem:packList.currentItem,
  //   handleRefresh:handleRefresh
  // }
  const columns = [{
    title: '序号',
    dataIndex: 'channelId',
    key: 'channelId',
    render:(text,record,index) => (<span>{(packList.currentPage-1)*packList.pageSize+index+1}</span>)
  }, {
    title: '商品包编号',
    dataIndex: 'channelName',
    key: 'channelName',
    className:'channelName',
    onCell:(record) => ({title:record.channelName}),
    render:(text,record) => <span>{text.length > 10?text.slice(0,9)+'...':text}</span>
  }, {
    title: '商品包名称',
    dataIndex: 'companyName',
    key: 'companyName',
    className:'companyName',
    onCell:(record) => ({title:record.companyName}),
    render:(text,record) => <span>{text.length > 10?text.slice(0,9)+'...':text}</span>
  }, {
    title: '商品数量',
    dataIndex: 'channelStatus',
    key: 'channelStatus'
  }, {
    title: '打包总价',
    dataIndex: 'linkPhone',
    key: 'linkPhone'
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },{
    title: '创建人',
    dataIndex: 'linkMan',
    key: 'linkMan',
  },{
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a onClick={() => {dispatch({type:'packList/packLisDelFn',payload:{packsId:record}})}}>编辑</a>
        <Divider type="vertical" />
        <a onClick={() => packLisDelFnClick(record.id)}>删除</a>
        <Divider type="vertical" />
        <a onClick={() => {dispatch({type:'packList/packLisUseFn',payload:{orderId:record}})}}>应用生效</a>
      </span>
    ),
  }];
  //删除操作
  const packLisDelFnClick = (packsId) => {
    confirm({
      title: '您确定执行此次操作吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
        dispatch({type:'packList/packLisDelFn',packsId:packsId})
        .then((result) => {
      	  if(result.message !== '成功'){
            message.error(result.message);
            return;
      	  }
          dispatch({type:'packList/query',pageNo:packList.currentPage,pageSize:packList.pageSize})
        })
      },
      onCancel() {
        console.log('取消了')
      },
    });
  }
  const filterProps = {//搜索过滤的方法
    location:location,
    dispatch:dispatch,
    filterArray : [
      {
        label:'商品包名称',
        name:'member',
        type:'input'
      },{
        label:'创建时间',
        type:'timer',
        name:'timerRange',
        format:'YYYY-MM-DD',
        children:['startTime','endTime']
      }
    ]
  }
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"channelId",  //key值
    dataSource:packList.dataSource,  //tabel数据源
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:packList.currentPage, //当前页码
      total:packList.totalSize,  //总条数
      defaultPageSize:packList.pageSize  //当前每页显示条数
    }
  }
  return (
    <div>
      <div className='formBody'>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>运营管理</Breadcrumb.Item>
          <Breadcrumb.Item>商品管理</Breadcrumb.Item>
          <Breadcrumb.Item>商品打包管理</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" style={{float:'right'}} onClick={() => handleRefresh('/merchant/addGoodsPack')}>创建商品包</Button>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <FilterItem {...filterProps} />
      <DataTabel {...tabelProps} />
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({packList,loading})=>({packList,loading}))(goodsPacks);
//类型检测
goodsPacks.protoTypes = {
  packList:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};