"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { Divider, Breadcrumb, Button, Modal, message } from 'antd';
import queryString from 'query-string';
import DataTabel from '@/components/DataTabel';//引入表格方法
import FilterItem from '@/components/FilterItem';//引入搜索方法

//商品打包管理
const confirm = Modal.confirm;
const goodsPacks = ({packList,loading,dispatch, location})=>{
  // const { pathname } = location;
  const handleRefresh = (pathname,newQuery) => {
  	// console.log(pathname)
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...newQuery,
      }),
    }))
  }
  // const modalProps = {
  //   currentItem:packList.currentItem,
  //   handleRefresh:handleRefresh
  // }
  const columns = [{
    title: '序号',
    key: 'channelId',
    render:(text,record,index) => (<span>{(packList.currentPage-1)*packList.pageSize+index+1}</span>)
  }, {
    title: '商品包编号',
    dataIndex: 'packageId',
    key: 'packageId',
    className:'packageId',
    onCell:(record) => ({title:record.packageId}),
    render:(text,record) => <span>{text.length > 10?text.slice(0,20)+'...':text}</span>
  }, {
    title: '商品包名称',
    dataIndex: 'packageName',
    key: 'packageName',
    className:'packageName',
    onCell:(record) => ({title:record.packageName}),
    render:(text,record) => <a onClick={() => handleRefresh('/merchant/goodsPackDetail',{packageId:record.packageId})}>{text.length > 10?text.slice(0,20)+'...':text}</a>
  }, {
    title: '商品数量',
    dataIndex: 'productsSize',
    key: 'productsSize'
  }, {
    title: '打包总价',
    dataIndex: 'packageTotalPrice',
    key: 'packageTotalPrice'
  }, {
    title: '创建时间',
    dataIndex: 'createDateTime',
    key: 'createDateTime'
  },{
    title: '创建人',
    dataIndex: 'createUserName',
    key: 'createUserName',
  },{
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        {
          record.allowEdit?
          <a onClick={() => handleRefresh('/merchant/editorGoodsPack',{packageId:record.packageId})}>编辑</a>:
          <a onClick={() => notEditorClick()}>编辑</a>
        }
        <Divider type="vertical" />
        {record.allowDelete?<a onClick={() => packLisDelFnClick(record.packageId,packList.dataSource,packList.pageSize,packList.currentPage,packList.totalSize)}>删除</a>:''}
        {record.allowDelete?<Divider type="vertical" />:''}
        <a onClick={() => packLisuseFnClick(record.packageId)}>应用生效</a>
      </span>
    ),
  }];

  //当列表数据中allowEdit返回false的时候(也就是说该商品包下面的商品都被删除的时候)，提示不可编辑
  const notEditorClick = () => {
    message.error('该商品包下的商品为空，不可编辑！')
    return
  }
  //应用生效
  const packLisuseFnClick = (packageId) => {
    confirm({
      title: '您确定执行此次操作吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
        dispatch({type:'packList/packLisUseFn',packageId})
        .then((result) => {
      	  if(result.message !== '成功'){
            message.error(result.message);
            return;
      	  }
          dispatch({type:'packList/query',pageNo:packList.currentPage,pageSize:packList.pageSize})
        })
      },
      onCancel() {
        // console.log('取消了')
      },
    });
  }
  //删除操作
  const packLisDelFnClick = (packageId,data,pageSize,totalSize,total) => {
    //pageSize 页长
    //totalSize 总页数
    //total 总条数
    // console.log(packageId)
    //console.log(data);
    //console.log(pageSize);
    //console.log(totalSize);
    
    confirm({
      title: '您确定执行此次操作吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
        dispatch({type:'packList/packLisDelFn',packageId})
        .then((result) => {
      	  if(result.message !== '成功'){
            message.error(result.message);
            return;
          }
          message.success('删除成功！')
          if(packList.dataSource.length <= 1){
            handleRefresh(location.pathname,{pageNo:packList.currentPage-1,pageSize:packList.pageSize})
          }
          // if(totalSize>1&&Math.ceil(total/pageSize)<totalSize){
          //   dispatch({type:'packList/query',pageNo:(packList.currentPage-1),pageSize:packList.pageSize})
          // }
          // dispatch({type:'packList/query',pageNo:packList.currentPage,pageSize:packList.pageSize})
        })
      },
      onCancel() {
        // console.log('取消了')
      },
    });
  }
  const filterProps = {//搜索过滤的方法
    location:location,
    dispatch:dispatch,
    filterArray : [
      {
        label:'商品包名称',
        name:'packageName',
        type:'input'
      },{
        label:'创建时间',
        type:'timer',
        name:'timerRange',
        format:'YYYY-MM-DD',
        children:['createDateTimeStart','createDateTimeEnd']
      }
    ]
  }
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"packageId",  //key值
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