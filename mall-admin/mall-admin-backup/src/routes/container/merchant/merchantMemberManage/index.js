"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import DataTabel from '@/components/DataTabel';
import FilterItem from '@/components/FilterItem';

const merchantMember = ({memberModel,loading,dispatch, location})=>{
  const columns = [{
    title: '序号',
    dataIndex: 'channelId',
    key: 'channelId',
    render:(text,record,index) => (<span>{(memberModel.currentPage-1)*memberModel.pageSize+index+1}</span>)
  }, {
    title: '会员账号',
    dataIndex: 'channelName',
    key: 'channelName'
  }, {
    title: '昵称',
    dataIndex: 'companyName',
    key: 'companyName'
  },{
    title: '性别',
    dataIndex: 'linkMan',
    key: 'linkMan'
  }, {
    title: '出生年月',
    dataIndex: 'createTime',
    key: 'createTime'
  },{
    title: '注册时间',
    dataIndex: 'createTime',
    key: 'regitserTime'
  },{
    title: '最近登录',
    dataIndex: 'createTime',
    key: 'loginTime'
  }];
  
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"channelId",  //key值
    dataSource:memberModel.dataSource,  //tabel数据源
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:memberModel.currentPage, //当前页码
      total:memberModel.totalSize,  //总条数
      defaultPageSize:memberModel.pageSize  //当前每页显示条数
    }
  }
  const filterProps = {
    location:location,
    dispatch:dispatch,
    filterArray : [
      {
        label:'会员账号',
        name:'member',
        type:'input'
      },{
        label:'昵称',
        name:'name',
        type:'input'
      },{
        label:'积分余额',
        name:'pointStart',
        type:'input'
      },{
        label:'至',
        name:'pointEnd',
        type:'input'
      },{
        label:'注册时间',
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
          <Breadcrumb.Item>会员管理</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <FilterItem {...filterProps}  />
      <DataTabel {...tabelProps} />
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({memberModel,loading})=>({memberModel,loading}))(merchantMember);
//类型检测
merchantMember.protoTypes = {
  memberModel:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};