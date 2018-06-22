"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Breadcrumb, Button, Modal, Tabs, message } from 'antd';
import { routerRedux } from 'dva/router'
import queryString from 'query-string';
import DataTabel from '@/components/DataTabel';
import FilterItem from '@/components/FilterItem';
import CateModal from './cateModal'

const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;
const platemGoodsHouse = ({goodsHouseModel,loading,dispatch, location})=>{
  location.query = queryString.parse(location.search) //获取当前的过滤条件
  const { pathname, query } = location;
  const handleRefresh = (pathname,newQuery) => { //当前页面刷新
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery
      }),
    }))
  }
  const modalProps = {
    handleRefresh,
    pathname
  }
  const columns = [{
    title: '序号',
    dataIndex: 'id',
    key: 'id1',
    render:(text,record,index) => (<span>{(goodsHouseModel.currentPage-1)*goodsHouseModel.pageSize+index+1}</span>)
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
    title: '建议售价（元）',
    dataIndex: 'retail_price',
    key: 'retail_price',
  },{
    title: '库存数量',
    dataIndex: 'available_product_code_count',
    key: 'available_product_code_count'
  },{
    title: '进货时间',
    dataIndex: 'create_time',
    key: 'create_time'
  },{
    title: '状态',
    dataIndex: 'product_state',
    key: 'product_state',
    render: (text, record) => (
      <span>
        { record.product_state === '2' ? '待上架（已設置）' : 
          record.product_state === '3' ? '已下架' :
          record.product_state === '4' ? '已上架' :
          record.product_state === '5' ? '待审核' :
          record.product_state === '6' ? '审核失败' :
          record.product_state === '7' ? '已删除' :
          record.product_state === '10' ? '待审核' :
          record.product_state === '11' ? '待上线' :
          record.product_state === '12' ? '已上线' :
          record.product_state === '13' ? '已下线' :
          record.product_state === '14' ? '回收站(已删除) ' : ''
        }
      </span>
  ),
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        {record.product_state === '11' ? <a style={{marginLeft:12}} onClick={() => confirmModal({type:'5',id:record.id})}>上线</a> : ''}
        <a style={{marginLeft:12}} onClick={() => handleRefresh('platemAddGoods',{id:record.id,source:2})}>详情</a>
        <a style={{marginLeft:12}} onClick={() => handleRefresh('platemAddGoods',{id:record.id,source:1})}>编辑</a>
        <a style={{marginLeft:12}} onClick={() => {dispatch({type:'goodsHouseModel/getCateList',goodsId:record.id})}}>商品归类</a>
        {record.product_state === '11' ? <a style={{marginLeft:12,color:'red'}} onClick={() => confirmModal({type:'6',id:record.id})}>删除</a> : ''}
      </span>
    )
  }];
  const checkSelection = {
    selectedRowKeys:goodsHouseModel.chooseGoodsKeys,         //回显的key数组
    onSelect: (record, selected, selectedRows) => {   //单个checkbox选择与取消
      const chooseGoodsIds = goodsHouseModel.chooseGoodsIds;
      const chooseGoodsKeys = goodsHouseModel.chooseGoodsKeys;
      if(selected){
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
        type:'goodsHouseModel/changeChooseGoods',
        chooseGoodsIds,
        chooseGoodsKeys
      })
    },
    onSelectAll: (selected, selectedRows, changeRows) => {  //全选、反选
      const chooseGoodsIds = goodsHouseModel.chooseGoodsIds;
      const chooseGoodsKeys = goodsHouseModel.chooseGoodsKeys;
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
        type:'goodsHouseModel/changeChooseGoods',
        chooseGoodsIds,
        chooseGoodsKeys
      })
    },
    
  };
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"id",  //key值
    dataSource:goodsHouseModel.dataSource,  //tabel数据源
    rowSelection:checkSelection,
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:goodsHouseModel.currentPage, //当前页码
      total:goodsHouseModel.totalSize,  //总条数
      defaultPageSize:goodsHouseModel.pageSize  //当前每页显示条数
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
  const confirmModal = (source) => {
    let title = '';
    if(source.type === '1'){ //批量归类
      title = '您确定要批量归类吗？'
    }else if(source.type === '2'){ //批量上线
      title = '您确定要批量上线吗？'
    }else if(source.type === '3'){ //全部上线
      title = '您确定要全部上线吗？'
    }else if(source.type === '4'){ //下线
      title = '您确定要执行下线操作吗？'
    }else if(source.type === '5'){ //上线
      title = '您确定要执行上线操作吗？'
    }else if(source.type === '6'){ //删除
      title = '您确定要删除该商品吗？'
    }
    confirm({
      title: title,
      okText:'确定',
      cancelText:'取消',
      onOk() {
        switch (source.type) {
          case '2': // 批量上线
          let batchStr = goodsHouseModel.chooseGoodsKeys.join() 
           dispatch({type:'goodsHouseModel/queryBatchOnLine',payload:{ids:batchStr}}).then( () => {handleRefresh(pathname)})
           break;
          case '3': // 全部上线
           dispatch({type:'goodsHouseModel/queryAllOnLine'}).then( () => {handleRefresh(pathname)})
           break;
          case '5': // 上线
           dispatch({type:'goodsHouseModel/queryonline',payload:{id:source.id}}).then( () => {handleRefresh(pathname)})
           break;
          case '6':
          dispatch({type:'goodsHouseModel/querydelete',payload:{productId:source.id}}).then( () => {handleRefresh(pathname)})
           break;
          default:
           break;
        }
      }
    });
  }
  const changeTab = (key) => {
    handleRefresh(pathname,{productState :key,pageNo:1,pageSize:10})
  }
  const batchCate = () => {
    if(goodsHouseModel.chooseGoodsIds.length <= 0){
      message.destroy()
      message.error('请先选择商品！')
      return;
    }
    dispatch({type:'goodsHouseModel/getCateList'})
  }
  return (
    <div>
      <div className='formBody'>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>商品管理</Breadcrumb.Item>
          <Breadcrumb.Item>管理商品库</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
        <Button type="primary" style={{float:'right'}} onClick={() =>  handleRefresh('/platform/platemAddGoods',{type:'add'})}>新增商品</Button>
        <Button type="primary" style={{float:'right',marginRight:10}} onClick={() => batchCate()}>批量归类</Button>
        { goodsHouseModel.activeTab === '11' ? (<Button type="primary" style={{float:'right',marginRight:10}} onClick={() => confirmModal({type:'2'})}>批量上线</Button>) : '' }
        { goodsHouseModel.activeTab === '11' ? (<Button type="primary" style={{float:'right',marginRight:10}} onClick={() => confirmModal({type:'3'})}>全部上线</Button>) : '' } 
      </div>
      <Tabs defaultActiveKey={String(goodsHouseModel.activeTab)} onChange={changeTab}>
        <TabPane tab="全部" key=""></TabPane>
        <TabPane tab="待上线" key="11"></TabPane>
        <TabPane tab="已上线" key="12"></TabPane>
      </Tabs>
      <FilterItem {...filterProps} />
      <DataTabel {...tabelProps} />
      {goodsHouseModel.visible?<CateModal {...modalProps}/> : ''}
      <a style={{display:'none'}} id='test' download='导出结果.xlsx' href={goodsHouseModel.exportUrl}>导出</a>
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({goodsHouseModel,loading})=>({goodsHouseModel,loading}))(platemGoodsHouse);
//类型检测
platemGoodsHouse.protoTypes = {
  goodsHouseModel:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};