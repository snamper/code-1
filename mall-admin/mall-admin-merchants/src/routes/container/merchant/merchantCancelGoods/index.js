"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router'
import queryString from 'query-string';
import { connect } from 'dva';
import { Breadcrumb, Modal ,message, Button,Cascader} from 'antd';
import DataTabel from '@/components/DataTabel';
import FilterItem from '@/components/FilterItem';

const confirm = Modal.confirm;

const cancelGoods = ({cancelGoodsModel,loading,dispatch, location})=>{
  const columns = [{
    title: '序号',
    dataIndex: 'channelId1',
    key: 'channelId1',
    render:(text,record,index) => (<span>{(cancelGoodsModel.currentPage-1)*cancelGoodsModel.pageSize+index+1}</span>)
  }, {
    title: '商品ID',
    dataIndex: 'productId',
    key: 'productId'
  }, {
    title: '商品名称',
    dataIndex: 'productName',
    key: 'productName'
  }, {
    title: '结算价（元）',
    dataIndex: 'channelPrice',
    key: 'channelPrice'
  },{
    title: '建议售价（元）',
    dataIndex: 'retailPrice',
    key: 'retailPrice'
  }, {
    title: '库存总量',
    dataIndex: 'stockNum',
    key: 'stockNum'
  },{
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render:(text,record) => (<span>{record.status === 0 ? '待上架':(record.status === 1?'已上架':(record.status === 2?'已下架':'已失效'))}</span>)
  },{
    title: '选品时间',
    dataIndex: 'date',
    key: 'date'
  },{
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <a onClick={() => {confirmModal(record.id)}}>取消选品</a>
    )
  }];
  const filterProps = {
    location:location,
    dispatch:dispatch,
    filterArray : [
      {
        label:'商品ID',
        name:'productId',
        type:'input'
      },{
        label:'商品名称',
        name:'productName',
        type:'input'
      },{
        label:'选品时间',
        type:'timer',
        name:'timerRange',
        format:'YYYY-MM-DD HH:mm:ss',
        children:['startTime','endTime']
      },{
      	label:'分类',
      	type:'select2',
      	name:'selectRange',
      	children:['sortId','level'],
      	filedNames:{ label: 'name', value: 'id', children: 'children' },
      	options:cancelGoodsModel.getTypeList || []
//    	{ cancelGoodsModel.getTypeList.length>0? <Cascader filedNames={{ label: 'name', value: 'id', children: 'children' }} options={cancelGoodsModel.getTypeList} onChange={onChange} placeholder="Please select" />:''}  
      }
    ]
  }
  const confirmModal = (id) => {
    confirm({
      title: '您确定要取消该选品吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
      	dispatch({type:'cancelGoodsModel/cancelProduct',payload:{id:id}}) 
      },
      onCancel() {
        return;
      },
    });
  }
  location.query = queryString.parse(location.search) //获取当前的过滤条件
  const { pathname, query } = location;
  const handleRefresh = (newQuery) => { //当前页面刷新
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }
  const filter = {
    handleRefresh:handleRefresh,
    query:location.query
  }
  const checkSelection = {
    selectedRowKeys:cancelGoodsModel.chooseGoodsKeys,         //回显的key数组
    onSelect: (record, selected, selectedRows) => {   //单个checkbox选择与取消
      const chooseGoodsIds = cancelGoodsModel.chooseGoodsIds;
      const chooseGoodsKeys = cancelGoodsModel.chooseGoodsKeys;
      if(selected ){
//    	console.log(record)
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
        type:'cancelGoodsModel/changeChooseGoods',
        chooseGoodsIds,
        chooseGoodsKeys
      })
    },
    onSelectAll: (selected, selectedRows, changeRows) => {  //全选、反选
      const chooseGoodsIds = cancelGoodsModel.chooseGoodsIds;
      const chooseGoodsKeys = cancelGoodsModel.chooseGoodsKeys;
      if(selected && changeRows.length > 0){
        changeRows.map((item) => 
          <span>
            {chooseGoodsIds.push({"id":item.id})}
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
        type:'cancelGoodsModel/changeChooseGoods',
        chooseGoodsIds,
        chooseGoodsKeys
      })
    }
  };
  const cancelModal = (data) => {  //取消选品
    confirm({
      title: '您确定执行该操作吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
          if(cancelGoodsModel.chooseGoodsIds.length <= 0) {
            message.error("请先选择商品！");
            return;
          }
          let payload = {
            ids:cancelGoodsModel.chooseGoodsKeys.join()
          }
          console.log(payload)
//        return
          dispatch({type:'cancelGoodsModel/cancelProductBatch',payload})
          .then((result) => {
            if(result.message !== '成功'){
              message.error(result.message);
              return;
            }
            message.success("取消成功！",1,handleRefresh())
          })
      }
    });
  }
  const onChange = (value) => {
  console.log(value);
}
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"id",  //key值
    dataSource:cancelGoodsModel.dataSource,  //tabel数据源
    rowSelection:checkSelection,
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:cancelGoodsModel.currentPage, //当前页码
      total:cancelGoodsModel.totalSize,  //总条数
      defaultPageSize:cancelGoodsModel.pageSize  //当前每页显示条数
    }
  }
  return (
    <div>
      <div className='formBody'>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>商品管理</Breadcrumb.Item>
          <Breadcrumb.Item>取消选品</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
        <FilterItem {...filterProps}  />
        
        <Button style={{float:"right",marginBottom:"10px"}} onClick={ () => cancelModal() } type="primary">批量取消选品</Button>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      <DataTabel {...tabelProps} />
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({cancelGoodsModel,loading})=>({cancelGoodsModel,loading}))(cancelGoods);
//类型检测
cancelGoods.protoTypes = {
  cancelGoodsModel:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};