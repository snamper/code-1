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
//打包活动管理列表
// const openUrl = function(url){
// 	// window.location.reload();
// 	window.location.href= `/#${url}`;
// }
const confirm = Modal.confirm;
const activeLis = ({
  activityList,
  loading,
  dispatch, 
  location
})=>{
  const handleRefresh = (pathname,newQuery) => {
  	//console.log(pathname)
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
    dataIndex: 'activeId',
    key: 'activeId',
    render:(text,record,index) => (<span>{(activityList.currentPage-1)*activityList.pageSize+index+1}</span>)
  }, {
    title: '活动名称',
    dataIndex: 'name',
    key: 'name',
    render:(text,record) => <a onClick={() => handleRefresh('/merchant/activityDetails',{id:record.activeId})}>{text.length > 10?text.slice(0,9)+'...':text}</a>
  }, {
    title: '分享用户数',
    dataIndex: 'sharingnum',
    key: 'sharingnum',
  }, {
    title: '激活用户数',
    dataIndex: 'actnum',
    key: 'actnum'
  }, {
    title: '次日留存',
    dataIndex: 'daynum',
    key: 'daynum'
  }, {
    title: '七日留存',
    dataIndex: 'weeknum',
    key: 'weeknum'
  },{
    title: '发放积分',
    dataIndex: 'pointnum',
    key: 'pointnum',
  },{
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a onClick={() => handleRefresh('/merchant/createdActive',{spreadEventId:record.activeId})}>编辑</a>
        <Divider type="vertical" />
        {
          record.state === 1?<a onClick={() => activeStatusChangeFn({id:record.id,state:0})}>启用</a>:<a onClick={() => activeStatusChangeFn({id:record.id,state:1})}>关闭</a>
        }
      </span>
    ),
  }];
  //修改活动状态操作
  const activeStatusChangeFn = (id,state) => {
    confirm({
      title: '您确定执行此次操作吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
        dispatch({type:'activityList/changeStatusFn',id:id,state:state})
        .then((result) => {
          // console.log(result)
      	  if(result.message !== '成功'){
            message.error(result.message);
            return;
          }
          handleRefresh()//刷新当前页面
          // dispatch({type:'packList/query',pageNo:activityList.currentPage,pageSize:activityList.pageSize})
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
        label:'活动名称',
        name:'name',
        type:'input'
      },{
        label:'时间',
        type:'timer',
        name:'timerRange',
        format:'YYYY-MM-DD',
        children:['startTime','endTime']
      }
    ]
  }
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"activeId",  //key值
    dataSource:activityList.dataSource,  //tabel数据源
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
        <Button type="primary" style={{float:'right'}} onClick={() => handleRefresh('/merchant/createdActive')}>新增活动</Button>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <FilterItem {...filterProps} />
      <div className={styles.dataNumBox}>
        <ul>
          <li><span className={styles.dataNumText}>{activityList.getCircleData.pointnum}</span><span>发放积分</span></li>
          <li><span className={styles.dataNumText}>{activityList.getCircleData.actnum}</span><span>激活用户</span></li>
          <li><span className={styles.dataNumText}>{activityList.getCircleData.regnum}</span><span>注册用户</span></li>
          <li><span className={styles.dataNumText}>{activityList.getCircleData.daynum}</span><span>次日留存</span></li>
          <li><span className={styles.dataNumText}>{activityList.getCircleData.weeknum}</span><span>七日留存</span></li>
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