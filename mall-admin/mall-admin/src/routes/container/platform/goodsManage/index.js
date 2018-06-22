'use strict';
/**
 * 推荐商品管理页
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import {Button,Modal,Tabs,Breadcrumb} from "antd";
import styles from './index.less';
import DataTabel from '@/components/DataTabel';
import FilterItem from '@/components/FilterItem';
import { routerRedux } from 'dva/router'
import GoodsModal from './goodsDialog'
import queryString from 'query-string';
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;

const CheckPendingGoods = ({checkPendingGoods,loading,dispatch,location})=>{
  location.query = queryString.parse(location.search) //获取当前的过滤条件
  const { pathname, query } = location;
  const handleRefresh = (pathname,newQuery) => { //当前页面刷新
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }
  const modalProps = {
    handleRefresh,
    pathname
  }
const updateStatus = (res) => { 
  confirm({
    title: '是否确定审核商品',
    okText:'确定',
    cancelText:'取消',
    onOk() {
      console.log(res)
        dispatch({type:'checkPendingGoods/reviewStatus',payload:{id:res.id,productState:'11'}})
    }
  });
}

const updateStatusAll = () => { 
  confirm({
    title: '是否确定批量审核商品',
    okText:'确定',
    cancelText:'取消',
    onOk() {
      let dataStr = checkPendingGoods.chooseGoodsKeys.join() 
      dispatch({type:'checkPendingGoods/reviewStatusAll',payload:{productIds:dataStr,productState:'11'}})
    }
  });
}

const checkSelection = {
  selectedRowKeys:checkPendingGoods.chooseGoodsKeys,         //回显的key数组
  onSelect: (record, selected, selectedRows) => {   //单个checkbox选择与取消
    const chooseGoodsIds = checkPendingGoods.chooseGoodsIds;
    const chooseGoodsKeys = checkPendingGoods.chooseGoodsKeys;
    if(selected ){
        chooseGoodsIds.push({id:record.id})
        chooseGoodsKeys.push(record.id)
    }else {
      chooseGoodsIds.map((item1,index) => 
        <span>{record.id === item1.id ? chooseGoodsIds.splice(index,1): ''}</span> 
      );
      chooseGoodsKeys.map((item1,index) => 
        <span>{record.id === item1 ? chooseGoodsKeys.splice(index,1): ''}</span> 
      );
    }
    dispatch({
      type:'checkPendingGoods/changeChooseGoods',
      chooseGoodsIds,
      chooseGoodsKeys
    })
  },
  onSelectAll: (selected, selectedRows, changeRows) => {  //全选、反选
    const chooseGoodsIds = checkPendingGoods.chooseGoodsIds;
    const chooseGoodsKeys = checkPendingGoods.chooseGoodsKeys;
    if(selected && changeRows.length > 0){
      changeRows.map((item) => 
        <span>
          {chooseGoodsIds.push({id:item.id})}
          {chooseGoodsKeys.push(item.id)}
        </span>
      )
    }else if(!selected && changeRows.length > 0){
      changeRows.map((item) => 
        <span>
          {chooseGoodsIds.map((item1,index) => 
            <span>{item.id === item1.id ? chooseGoodsIds.splice(index,1): ''}</span>
          )}
          {chooseGoodsKeys.map((item1,index) => 
            <span>{ item.id === item1 ? chooseGoodsKeys.splice(index,1): ''}</span>
          )}
        </span>
      )
    }
    dispatch({
      type:'checkPendingGoods/changeChooseGoods',
      chooseGoodsIds,
      chooseGoodsKeys
    })
  },
  
};
const changeTab = (key) => {
  dispatch({type:'checkPendingGoods/changeActiveTab',payload:{activeTab:key}})
  handleRefresh(pathname,{productState :key})
}

const columns =[
  {
  	title:"序号",
  	dataIndex:"product_id",
    key:"product_id",
    render:(text,record,index) => (<span>{(checkPendingGoods.currentPage-1)*checkPendingGoods.pageSize+index+1}</span>)
  },
  {
  	title:"商品ID",
  	dataIndex:"id",
  	key:"id"
  },{
  	title:"商品名称",
  	dataIndex:"full_name",
  	key:"full_name",
  },{
  	title:"供货商",
  	dataIndex:"merchant_short_name",
  	key:"merchant_short_name"
  },{
  	title:"成本价（元）",
  	dataIndex:"cost_price",
    key:"cost_price",
  },{
  	title:"渠道价（元）",
  	dataIndex:"channel_price",
    key:"channel_price",
  },{
  	title:"建议售价（元）",
  	dataIndex:"retail_price",
    key:"retail_price",
  },{
  	title:"库存总量",
  	dataIndex:"product_code_sum",
  	key:"product_code_sum",
  },{
  	title:"状态",
  	dataIndex:"product_state",
    key:"product_state",
    render:(text,record,inde) => (<span>{record.product_state === '6' ? '审核未通过':(record.product_state === '10' ? '待审核':'已删除')}</span>)
  },{
  	title:"进货时间",
  	dataIndex:"create_time",
  	key:"create_time"
  },{
  	title:"操作",
  	render:(text,record,index)=>(
      record.product_state === '10'?
      <a onClick={() => handleRefresh('/platform/goodsAudit',{source:2,id:record.id})}>审核</a> :
      record.product_state === '6'?
      <span>
        <a onClick={() => handleRefresh('platemAddGoods',{id:record.id,source:1,redict:'audit'})}>编辑</a>
        <a onClick={() => {dispatch({type:'checkPendingGoods/modalControll',modalSouurce:'',failedReason:record.failedReason})}} style={{marginLeft:12}}>备注</a>
      </span> :''
  	)
  }
];

const tabelProps = {  //表格属性
  columns:columns,  //tabel表格列
  keySource:"id",  //key值
  dataSource:checkPendingGoods.dataSource,  //tabel数据源
  rowSelection:checkSelection,
  location:location,  //location方法
  dispatch:dispatch,  //dispatch方法
  notNeedPagination:false,  //是否需要分页
  paginationProps: {  //分页属性
    defaultCurrent:checkPendingGoods.currentPage, //当前页码
    total:checkPendingGoods.totalSize,  //总条数
    defaultPageSize:checkPendingGoods.pageSize  //当前每页显示条数
  }
}
const filterProps = {
  location:location,
  dispatch:dispatch,
  filterArray : [
    {
      label:'商品ID',
      name:'id',
      type:'input'
    },{
      label:'供货商',
      name:'merchantShortName',
      type:'input'
    },{
      label:'商品名称',
      name:'fullName',
      type:'input'
    },{
      label:'进货时间',
      type:'timer',
      name:'timerRange',
      format:'YYYY-MM-DD HH:mm:ss',
      children:['startTime','endTime']
    }
  ]
}

  return (
    <div>
      <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>商品管理</Breadcrumb.Item>
          <Breadcrumb.Item>待审核商品</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
       <Tabs defaultActiveKey={String(checkPendingGoods.activeTab)} onChange={changeTab}>
        <TabPane tab="全部" key=""></TabPane>
        <TabPane tab="待审核" key="10"></TabPane>
        <TabPane tab="审核未通过" key="6"></TabPane>
      </Tabs>
      <FilterItem {...filterProps} />
      <div className={styles.btnGroup}>
      {checkPendingGoods.activeTab === '10'?<Button className={styles.right} type="primary" onClick={() => {dispatch({type:'checkPendingGoods/modalControll',modalSouurce:'audit'})}}>批量审核</Button>:''}
        <div className={styles.clear}></div>
      </div>
      <DataTabel {...tabelProps} />
      {checkPendingGoods.visible?<GoodsModal {...modalProps} /> : ''}
    </div>
  )
};

export default connect(({checkPendingGoods,account,loading})=>({checkPendingGoods,account,loading}))(CheckPendingGoods);

//参数类型检测
CheckPendingGoods.protoTypes = {
  dispatch:PropTypes.object,
  loading:PropTypes.object,
  location:PropTypes.object,
  checkPendingGoods:PropTypes.object,
};