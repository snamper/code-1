"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import DataTabel from '@/components/DataTabel';
import FilterItem from '@/components/FilterItem';

const merchantMember = ({platemberModel,loading,dispatch, location})=>{
  const columns = [{
    title: '序号',
    dataIndex: 'channelId',
    key: 'channelId',
    render:(text,record,index) => (<span>{(platemberModel.currentPage-1)*platemberModel.pageSize+index+1}</span>)
  }, {
    title: '会员账号',
    dataIndex: 'h5_store_user_identify',
    key: 'h5_store_user_identify'
  }, {
    title: '商户渠道号',
    dataIndex: 'h5_store_channel_id',
    key: 'h5_store_channel_id'
  }, {
    title: '商户渠道名称',
    dataIndex: 'channel_name',
    key: 'channel_name'
  },{
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    render:(text,record,index) => (<span>{(record.sex === "1" ? '男' : (record.sex === "2" ? '女':'--'))}</span>)
  }, {
    title: '出生年月',
    dataIndex: 'birth',
    key: 'birth'
  },{
    title: '积分余额',
    dataIndex: 'u_score_balance',
    key: 'u_score_balance'
  },{
    title: '注册时间',
    dataIndex: 'create_time',
    key: 'create_time'
  },{
    title: '最近登录',
    dataIndex: 'last_login_time',
    key: 'last_login_time'
  }];
  
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"channelId",  //key值
    dataSource:platemberModel.dataSource,  //tabel数据源
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:platemberModel.currentPage, //当前页码
      total:platemberModel.totalSize,  //总条数
      defaultPageSize:platemberModel.pageSize  //当前每页显示条数
    }
  }
  const filterProps = {
    location:location,
    dispatch:dispatch,
    filterArray : [
      {
        label:'渠道号',
        name:'h5StoreChannelId',
        type:'input'
      },{
        label:'会员账号',
        name:'h5StoreUserIdentify',
        type:'input'
      },{
        label:'积分余额',
        name:'scoreFloor',
        type:'input'
      },{
        label:'至',
        name:'scorePlatfond',
        type:'input'
      },{
        label:'注册时间',
        type:'timer',
        name:'timerRange',
        format:'YYYY-MM-DD HH:mm:ss',
        children:['registTimeStart','registTimeEnd']
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
export default connect(({platemberModel,loading})=>({platemberModel,loading}))(merchantMember);
//类型检测
merchantMember.protoTypes = {
  platemberModel:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};