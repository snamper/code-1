"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
// import { routerRedux } from 'dva/router'
import { Divider, Breadcrumb, Button, Modal, message } from 'antd';
import queryString from 'query-string';
import DataTabel from '@/components/DataTabel';//引入表格方法
import FilterItem from '@/components/FilterItem';//引入搜索方法
import styles from './activityMan.less'
//活动管理
const confirm = Modal.confirm;
const activeLis = ({
  activityList,
  loading,
  dispatch, 
  location
})=>{
  const handleRefresh = (pathname,newQuery) => {
  	console.log(pathname)
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
    dataIndex: 'spread_id',
    key: 'spread_id',
    render:(text,record,index) => (<span>{(activityList.currentPage-1)*activityList.pageSize+index+1}</span>)
  }, {
    title: '活动/渠道名称',
    dataIndex: 'spread_name',
    key: 'spread_name',
    className:'channelName',
    render:(text,record) => <a onClick={() => handleRefresh('/platform/activityDetails',{id:record.channelId})}>{text.length > 10?text.slice(0,9)+'...':text}</a>
  }, {
    title: '分享用户数',
    dataIndex: 'sharing_num',
    key: 'sharing_num',
    className:'companyName'
  }, {
    title: '激活用户数',
    dataIndex: 'activate_num',
    key: 'activate_num'
  }, {
    title: '次日留存',
    dataIndex: 'nextday_num',
    key: 'nextday_num'
  }, {
    title: '七日留存',
    dataIndex: 'nextweek_num',
    key: 'nextweek_num'
  },{
    title: '发放积分',
    dataIndex: 'point_num',
    key: 'point_num',
  },{
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a onClick={() => {dispatch({type:'activityList/packLisDelFn',payload:{packsId:record}})}}>编辑</a>
        <Divider type="vertical" />
        <a onClick={() => packLisDelFnClick(record.id)}>关闭</a>
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
          dispatch({type:'packList/query',pageNo:activityList.currentPage,pageSize:activityList.pageSize})
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
        label:'活动/渠道名称',
        name:'spreadName',
        type:'input'
      },{
        label:'类型',
        type:'select',
        name:'spreadType',
        options:[
          {
            value:'0',
            name:'全部'
          },{
            value:'1',
            name:'活动'
          },{
            value:'2',
            name:'渠道'
          }
        ]
      },{
        label:'状态',
        type:'select',
        name:'closed',
        options:[
          {
            value:'2',
            name:'全部'
          },{
            value:'0',
            name:'进行中'
          },{
            value:'1',
            name:'已关闭'
          }
        ]
      },{
        label:'时间',
        type:'timer',
        name:'timerRange',
        format:'YYYY-MM-DD HH:mm:ss',
        children:['startTime','endTime']
      }
    ]
  }
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"spread_id",  //key值
    dataSource:activityList.dataSource.datalist,  //tabel数据源
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:activityList.currentPage, //当前页码
      total:activityList.totalSize,  //总条数
      defaultPageSize:activityList.pageSize  //当前每页显示条数
    }
  }
  return (
    <div>
      <div className='formBody'>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>活动管理</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" style={{float:'right'}} onClick={() => handleRefresh('/platform/createdActive')}>新增活动</Button>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <FilterItem {...filterProps} />
      <div className={styles.dataNumBox}>
        <ul>
          <li><span className={styles.dataNumText}>{activityList.dataSource.datastastic?activityList.dataSource.datastastic.pointnum:0}</span><span>发放积分</span></li>
          <li><span className={styles.dataNumText}>{activityList.dataSource.datastastic?activityList.dataSource.datastastic.actnum:0}</span><span>激活用户</span></li>
          <li><span className={styles.dataNumText}>{activityList.dataSource.datastastic?activityList.dataSource.datastastic.regnum:0}</span><span>注册用户</span></li>
          <li><span className={styles.dataNumText}>{activityList.dataSource.datastastic?activityList.dataSource.datastastic.daynum:0}</span><span>次日留存</span></li>
          <li><span className={styles.dataNumText}>{activityList.dataSource.datastastic?activityList.dataSource.datastastic.weeknum:0}</span><span>七日留存</span></li>
        </ul>
      </div>
      <DataTabel {...tabelProps} />
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({activityList,loading})=>({activityList,loading}))(activeLis);
//类型检测
activeLis.protoTypes = {
  activityList:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};