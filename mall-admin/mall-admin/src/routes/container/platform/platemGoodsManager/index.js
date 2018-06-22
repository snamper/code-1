"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import queryString from 'query-string';
import { Breadcrumb, Button, Modal } from 'antd';
import { routerRedux } from 'dva/router'
import DataTabel from '@/components/DataTabel';
import FilterItem from '@/components/FilterItem';

const confirm = Modal.confirm;

const platemGoodsManager = ({platGoodsModel,loading,dispatch, location})=>{
  location.query = queryString.parse(location.search) //获取当前的过滤条件
  const {  query } = location;
  const handleRefresh = (pathname,newQuery) => { //当前页面刷新
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }
  const columns = [{
    title: '序号',
    key: 'order',
    dataIndex: 'id',
    render:(text,record,index) => (<span>{(platGoodsModel.currentPage-1)*platGoodsModel.pageSize+index+1}</span>)
  }, {
    title: '商品ID',
    dataIndex: 'id',
    key: 'id'
  }, {
    title: '商品名称',
    dataIndex: 'full_name',
    key: 'full_name'
  },{
    title: '供货商',
    dataIndex: 'merchant_short_name',
    key: 'merchant_short_name'
  },{
    title: '成本价（元）',
    dataIndex: 'cost_price',
    key: 'cost_price',
  }, {
    title: '渠道价（元）',
    dataIndex: 'channel_price',
    key: 'channel_price',
  },{
    title: '消耗金额（元）',
    dataIndex: 'retail_price',
    key: 'retail_price',
  },{
    title: '库存数量',
    dataIndex: 'product_code_sum',
    key: 'product_code_sum'
  },{
    title: '进货时间',
    dataIndex: 'create_time',
    key: 'create_time'
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a onClick={() =>  confirmModal(record.id,record.channel_product_used)}>下线</a>
        <a style={{marginLeft:12}} onClick={() => handleRefresh('platemAddGoods',{id:record.id,source:2})}>详情</a>
      </span>
    ),
  }];
  const checkSelection = {
    selectedRowKeys:platGoodsModel.chooseGoodsKeys,         //回显的key数组
    onSelect: (record, selected, selectedRows) => {   //单个checkbox选择与取消
      const chooseGoodsIds = platGoodsModel.chooseGoodsIds;
      const chooseGoodsKeys = platGoodsModel.chooseGoodsKeys;
      if(selected ){
          chooseGoodsIds.push({id:record.id,used:record.channel_product_used})
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
        type:'platGoodsModel/changeChooseGoods',
        chooseGoodsIds,
        chooseGoodsKeys
      })
    },
    onSelectAll: (selected, selectedRows, changeRows) => {  //全选、反选
      const chooseGoodsIds = platGoodsModel.chooseGoodsIds;
      const chooseGoodsKeys = platGoodsModel.chooseGoodsKeys;
      if(selected && changeRows.length > 0){
        changeRows.map((item) => 
          <span>
            {chooseGoodsIds.push({id:item.id,used:item.channel_product_used})}
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
        type:'platGoodsModel/changeChooseGoods',
        chooseGoodsIds,
        chooseGoodsKeys
      })
    },
    
  };
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"id",  //key值
    dataSource:platGoodsModel.dataSource,  //tabel数据源
    rowSelection:checkSelection,
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:platGoodsModel.currentPage, //当前页码
      total:platGoodsModel.totalSize,  //总条数
      defaultPageSize:platGoodsModel.pageSize  //当前每页显示条数
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
  const confirmModal = (id,ifUsed) => {
    let title = ''
    if(String(ifUsed) === '1') title = '商品出售中，下线后商家端商品将失效，是否强制下线?'
    else{
      if(id) title = '您确定要下线操作吗？'
      else{
        for(let i = 0; i < platGoodsModel.chooseGoodsIds.length; i++){
          if(String(platGoodsModel.chooseGoodsIds[i].used) === '1'){
            title = '商品出售中，下线后商家端商品将失效，是否强制下线?'
          }
        }
      } 
    }
    confirm({
      title: title,
      okText:'确定',
      cancelText:'取消',
      onOk() {
        if(id){ //单个下线
          dispatch({type:'platGoodsModel/queryOutLine',payload:{id:id}})
        }else{ //批量下线
          let dataStr = platGoodsModel.chooseGoodsKeys.join() 
          dispatch({type:'platGoodsModel/queryOutBatchLine',payload:{ids:dataStr}})
        }
      }
    });
  }
  return (
    <div>
      <div className='formBody'>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>商品管理</Breadcrumb.Item>
          <Breadcrumb.Item>选品库</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" style={{float:'right',marginLeft:12}} onClick={() => {dispatch({type:'platGoodsModel/exportExcel',payload:queryString.parse(location.search)})}}>导出</Button>
        <Button type="primary" style={{float:'right'}} onClick={() => confirmModal()}>批量下线</Button>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <FilterItem {...filterProps} />
      <DataTabel {...tabelProps} />
      <a style={{display:'none'}} id='test' download='导出结果.xlsx' href={platGoodsModel.exportUrl}>导出</a>
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({platGoodsModel,loading})=>({platGoodsModel,loading}))(platemGoodsManager);
//类型检测
platemGoodsManager.protoTypes = {
  platGoodsModel:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};