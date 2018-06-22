'use strict';
/**
 * 推荐商品管理页
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import {Button,Modal} from "antd";
import styles from './index.less';
import DataTabel from '@/components/DataTabel';
import FilterItem from '@/components/FilterItem';
const confirm = Modal.confirm;

const GoodsBackup = ({goodsBackup,loading,dispatch,location})=>{
// const rowSelection = {};
const updateStatus = (res) => { 
  confirm({
    title: '是否确定恢复商品',
    okText:'确定',
    cancelText:'取消',
    onOk() {
        dispatch({type:'goodsBackup/updateStatus',payload:[{id:res.id,productSortId:res.product_sort_id,productSortId2:res.product_sort_id2}]})
    }
  });
}

const updateStatusAll = () => { 
  confirm({
    title: '是否确定批量恢复商品',
    okText:'确定',
    cancelText:'取消',
    onOk() {
      // console.log(goodsBackup.chooseGoodsKeys)
      let payload = goodsBackup.chooseGoodsIds
      dispatch({type:'goodsBackup/updateStatus',payload})
    }
  });
}

const checkSelection = {
  selectedRowKeys:goodsBackup.chooseGoodsKeys,         //回显的key数组
  onSelect: (record, selected, selectedRows) => {   //单个checkbox选择与取消
    const chooseGoodsIds = goodsBackup.chooseGoodsIds;
    const chooseGoodsKeys = goodsBackup.chooseGoodsKeys;
    if(selected ){
        chooseGoodsIds.push({id:record.id,productSortId:record.product_sort_id,productSortId2:record.product_sort_id2})
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
      type:'goodsBackup/changeChooseGoods',
      chooseGoodsIds,
      chooseGoodsKeys
    })
  },
  onSelectAll: (selected, selectedRows, changeRows) => {  //全选、反选
    const chooseGoodsIds = goodsBackup.chooseGoodsIds;
    const chooseGoodsKeys = goodsBackup.chooseGoodsKeys;
    if(selected && changeRows.length > 0){
      changeRows.map((item) => 
        <span>
          {chooseGoodsIds.push({id:item.id,productSortId:item.product_sort_id,productSortId2:item.product_sort_id2})}
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
      type:'goodsBackup/changeChooseGoods',
      chooseGoodsIds,
      chooseGoodsKeys
    })
  },
  
};

const columns =[
  {
  	title:"序号",
  	dataIndex:"product_id",
    key:"product_id",
    render:(text,record,index) => (<span>{(goodsBackup.currentPage-1)*goodsBackup.pageSize+index+1}</span>)
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
  	dataIndex:"available_product_code_count",
  	key:"available_product_code_count",
  },{
  	title:"进货时间",
  	dataIndex:"create_time",
  	key:"create_time"
  },{
  	title:"操作",
  	render:(text,record,index)=>(
      <a onClick={() => updateStatus(record)}>恢复</a> 
  	)
  }
];
const tabelProps = {  //表格属性
  columns:columns,  //tabel表格列
  keySource:"id",  //key值
  dataSource:goodsBackup.dataSource,  //tabel数据源
  rowSelection:checkSelection,
  location:location,  //location方法
  dispatch:dispatch,  //dispatch方法
  notNeedPagination:false,  //是否需要分页
  paginationProps: {  //分页属性
    defaultCurrent:goodsBackup.currentPage, //当前页码
    total:goodsBackup.totalSize,  //总条数
    defaultPageSize:goodsBackup.pageSize  //当前每页显示条数
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
      <FilterItem {...filterProps} />
      <div className={styles.btnGroup}>
        <Button className={styles.right} type="primary" onClick={() => updateStatusAll()}>批量恢复</Button>
        <div className={styles.clear}></div>
      </div>
      {/* <Table style={{marginTop:20}} rowSelection={rowSelection} columns={columns} dataSource={data} rowKey="id" /> */}
      
      <DataTabel {...tabelProps} />
    </div>
  )
};

export default connect(({goodsBackup,account,loading})=>({goodsBackup,account,loading}))(GoodsBackup);

//参数类型检测
GoodsBackup.protoTypes = {
  dispatch:PropTypes.object,
  loading:PropTypes.object,
  location:PropTypes.object,
  goodsBackup:PropTypes.object,
};