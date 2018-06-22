"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { Breadcrumb, Tabs, Divider, Modal, InputNumber, Form, message } from 'antd';
import queryString from 'query-string';
import DataTabel from '@/components/DataTabel';//引入表格方法
import FilterItem from '@/components/FilterItem';//引入搜索方法
// import styles from './activityaway.less'
//活动管理（活动上下架管理）
  const openUrl = function(url){
    // window.location.reload();
    window.location.href= `/#${url}`;
  }
  const confirm = Modal.confirm;
  const TabPane = Tabs.TabPane;
// const FormItem = Form.Item;
  const putaways = ({
    activityPutawayList,
    loading,
    dispatch, 
    location, 
    form: {
      getFieldDecorator,
      validateFieldsAndScroll,
      getFieldsValue
    },
  })=>{
  const { pathname } = location;
  const handleRefresh = (pathname,newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...newQuery,
      }),
    }))
  }
  //console.log(activityPutawayList);
  // const modalProps = {
  //   currentItem:packList.currentItem,
  //   handleRefresh:handleRefresh
  // }
  
  const putaWayInfo = (source) => { //上下架
    let sortNum = '';
    validateFieldsAndScroll((errors,values) => {
      sortNum = values['getSortNum'+source.id];
    })
    if(sortNum){
      confirm({
        title: source.type === '1'?'您确定要下架吗？':'您确定要上架吗？',
        okText:'确定',
        cancelText:'取消',
        onOk() {
          if(source.type === '1') {
            dispatch({type:'activityPutawayList/putDown',payload:{id:source.id}}) // 下架
  //        dispatch({type:'accountModel/updateStatus',payload:{id:source.id}})
          }else{  // disabledStatus
  //        dispatch({type:'accountModel/disabledStatus',payload:{id:source.id}})
            dispatch({type:'activityPutawayList/putUp',payload:{id:source.id}}) // 上架
          }
            
        }
      });
    }else{
      message.destroy()
      message.error('请规范输入排序号')
      return
    }
  }
  
  let columns = [{//各个状态下公用的表头
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    render:(text,record,index) => (<span>{(activityPutawayList.currentPage-1)*activityPutawayList.pageSize+index+1}</span>)
  }, {
    title: '活动名称',
    dataIndex: 'spreadName',
    key: 'spreadName',
    onCell:(record) => ({title:record.spreadName}),
    render:(text,record) => <a onClick={() =>openUrl(`/merchant/activityDetails?id=${record.activeId}`)}>{text.length > 10?text.slice(0,9)+'...':text}</a>
  },{
    title: '设置时间',
    dataIndex: 'createDateTime',
    key: 'createDateTime'
  },{
    title: '设置人',
    dataIndex: 'createUserName',
    key: 'createUserName',
  }];
  
  const tabStatus = queryString.parse(location.search)||'';//获取地址栏里面的tab状态参数 默认为''或者5
  if(tabStatus.activeTab === "2"||tabStatus.activeTab === "3"||tabStatus.activeTab === "4"){// 2待上架 3已上架 4已下架  这几种状态下是有排序的
    columns= columns.concat( [{
      title: '排序号',
      dataIndex: 'orderNum',
      key: 'orderNum',
      render: (text, record, index) => (
        <Form>
          {getFieldDecorator('getSortNum'+ record.id, {
            initialValue:text,
            rules: [{ max:1 }],
            validateTrigger: 'onBlur'
          })(<InputNumber min={1} onBlur={() => changeSortsFn(record.id)} />)}
        </Form>
      )
    },{
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
        {
          record.status === 3?<a onClick={() => putaWayInfo({type:'1',id:record.id})}>下架</a>:
          record.status === 2||record.status === 4?<span><a onClick={() => openUrl(`/merchant/setActivityPut?id=${record.id}&name=${record.spreadName}`)}>设置</a><Divider type="vertical"/><a onClick={() => putaWayInfo({type:'2',id:record.id})}>上架</a></span>:''
        }
        </span>
      ),
    }]);
  }else{
    columns= columns.concat( [{
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
        {
          record.status === 1?<a onClick={() => openUrl(`/merchant/setActivityPut?activeId=${record.activeId}&name=${record.spreadName}`)}>设置</a>:
          record.status === 3?<a onClick={() => putaWayInfo({type:'1',id:record.id})}>下架</a>:
          record.status === 2||record.status === 4?<span><a onClick={() => openUrl(`/merchant/setActivityPut?id=${record.id}&name=${record.spreadName}`)}>设置</a><Divider type="vertical"/><a onClick={() => putaWayInfo({type:'2',id:record.id})}>上架</a></span>:''
        }
        </span>
      ),
    }]);
  }
  
  const filterProps = {//搜索过滤的方法
    location:location,
    dispatch:dispatch,
    filterArray : [
      {
        label:'活动名称',
        name:'spreadName',
        type:'input'
      },{
        label:'时间',
        type:'timer',
        name:'timerRange',
        format:'YYYY-MM-DD',
        children:['createTimeStart','createTimeEnd']
      }
    ]
  }
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"spreadName",  //key值
    dataSource:activityPutawayList.dataSource,  //tabel数据源
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:activityPutawayList.currentPage, //当前页码
      total:activityPutawayList.totalSize,  //总条数
      defaultPageSize:activityPutawayList.pageSize  //当前每页显示条数
    }
  }
  //切换列表的导航状态
  const changeTab = (key) => {
    handleRefresh(pathname,{activeTab:key})
  }
 // 改变列表的排序号  changeSorts
  const changeSortsFn = (id) => {
    let getSortNum = '';
    validateFieldsAndScroll((errors,values) => {
      getSortNum = values['getSortNum'+id];
    })
    if(getSortNum){
      dispatch({type:'activityPutawayList/changeSorts',getSortNum,id})
    }else{
      message.destroy()
      message.error('请规范输入排序号')
      return
    }
  }
  


  return (
    <div>
      <div className='formBody'>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>活动管理</Breadcrumb.Item>
          <Breadcrumb.Item>活动上架管理</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <Tabs defaultActiveKey={String(tabStatus.activeTab)} onChange={changeTab}>
        <TabPane tab="待设置" key="1"></TabPane>
        <TabPane tab="待上架" key="2"></TabPane>
        <TabPane tab="已上架" key="3"></TabPane>
        <TabPane tab="已下架" key="4"></TabPane>
        <TabPane tab="全部" key="5"></TabPane>
      </Tabs>
      <FilterItem {...filterProps} />
      <DataTabel {...tabelProps} />
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({activityPutawayList,loading})=>({activityPutawayList,loading}))(Form.create()(putaways));
//类型检测
putaways.protoTypes = {
  activityPutawayList:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};