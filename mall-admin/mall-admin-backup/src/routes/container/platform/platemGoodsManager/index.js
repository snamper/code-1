"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Breadcrumb, Button, Modal } from 'antd';
import DataTabel from '@/components/DataTabel';
import FilterItem from '@/components/FilterItem';

const confirm = Modal.confirm;

const platemGoodsManager = ({platGoodsModel,loading,dispatch, location})=>{
  const columns = [{
    title: '序号',
    dataIndex: 'channelId',
    key: 'channelId',
    render:(text,record,index) => (<span>{(platGoodsModel.currentPage-1)*platGoodsModel.pageSize+index+1}</span>)
  }, {
    title: '商品ID',
    dataIndex: 'channelName',
    key: 'channelName'
  }, {
    title: '商品名称',
    dataIndex: 'companyName',
    key: 'companyName'
  },{
    title: '供货商',
    dataIndex: 'linkMan',
    key: 'test'
  },{
    title: '成本价（元）',
    dataIndex: 'linkMan',
    key: 'linkMan'
  }, {
    title: '渠道价（元）',
    dataIndex: 'createTime',
    key: 'createTime'
  },{
    title: '消耗金额（元）',
    dataIndex: 'createTime',
    key: 'regitserTime'
  },{
    title: '库存数量',
    dataIndex: 'createTime',
    key: 'status'
  },{
    title: '进货时间',
    dataIndex: 'createTime',
    key: 'loginTime'
  },{
    title: '支付状态',
    dataIndex: 'createTime',
    key: 'patStatus'
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
          <a onClick={() =>  confirmModal(record.id)}>下线</a>
          <a style={{marginLeft:12}} >详情</a>
        </span>
    ),
  }];
  const checkSelection = {
    selectedRowKeys:platGoodsModel.chooseGoodsKeys,         //回显的key数组
    onSelect: (record, selected, selectedRows) => {   //单个checkbox选择与取消
      const chooseGoodsIds = platGoodsModel.chooseGoodsIds;
      const chooseGoodsKeys = platGoodsModel.chooseGoodsKeys;
      if(selected ){
          chooseGoodsIds.push({id:record.channelId})
          chooseGoodsKeys.push(record.channelId)
      }else {
        chooseGoodsIds.map((item1,index) => 
          <span>{record.channelId === item1.id ? chooseGoodsIds.splice(index,1): ''}</span> 
        );
        chooseGoodsKeys.map((item1,index) => 
          <span>{record.channelId === item1 ? chooseGoodsKeys.splice(index,1): ''}</span> 
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
            {chooseGoodsIds.push({id:item.channelId})}
            {chooseGoodsKeys.push(item.channelId)}
          </span>
        )
      }else if(!selected && changeRows.length > 0){
        changeRows.map((item) => 
          <span>
            {chooseGoodsIds.map((item1,index) => 
              <span>{item.channelId === item1.id ? chooseGoodsIds.splice(index,1): ''}</span>
            )}
            {chooseGoodsKeys.map((item1,index) => 
              <span>{ item.channelId === item1 ? chooseGoodsKeys.splice(index,1): ''}</span>
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
    keySource:"channelId",  //key值
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
        name:'merchant',
        type:'input'
      },{
        label:'商品名称',
        name:'name',
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
  const confirmModal = (id) => {
    confirm({
      title: '您确定要下线操作吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
        if(id){ //单个下线

        }else{ //批量下线

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
        <Button type="primary" style={{float:'right',marginLeft:12}} onClick={() => {dispatch({type:'platGoodsModel/exportExcel',payload:{orderStatus:0},that:this})}}>导出</Button>
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