"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Breadcrumb, Button, Modal, Tabs  } from 'antd';
import { routerRedux } from 'dva/router'
import queryString from 'query-string';
import DataTabel from '@/components/DataTabel';
import FilterItem from '@/components/FilterItem';

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
        ...newQuery,
      }),
    }))
  }
  const columns = [{
    title: '序号',
    dataIndex: 'channelId',
    key: 'channelId',
    render:(text,record,index) => (<span>{(goodsHouseModel.currentPage-1)*goodsHouseModel.pageSize+index+1}</span>)
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
          <a style={{marginLeft:12,color:'red'}} onClick={() => confirmModal('4')}>下线</a>
          <a style={{marginLeft:12}} onClick={() => confirmModal('5')}>上线</a>
          <a style={{marginLeft:12}} onClick={() => handleRefresh('platemAddGoods',{id:record.channelId,source:2})}>详情</a>
          <a style={{marginLeft:12}} onClick={() => handleRefresh('platemAddGoods',{id:record.channelId,source:1})}>编辑</a>
          <a style={{marginLeft:12,color:'red'}} onClick={() => confirmModal('6')}>删除</a>
        </span>
    ),
  }];
  const checkSelection = {
    selectedRowKeys:goodsHouseModel.chooseGoodsKeys,         //回显的key数组
    onSelect: (record, selected, selectedRows) => {   //单个checkbox选择与取消
      const chooseGoodsIds = goodsHouseModel.chooseGoodsIds;
      const chooseGoodsKeys = goodsHouseModel.chooseGoodsKeys;
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
        type:'goodsHouseModel/changeChooseGoods',
        chooseGoodsIds,
        chooseGoodsKeys
      })
    },
    
  };
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"channelId",  //key值
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
  const confirmModal = (source) => {
    let title = '';
    if(source === '1'){ //批量归类
      title = '您确定要批量归类吗？'
    }else if(source === '2'){ //批量上线
      title = '您确定要批量上线吗？'
    }else if(source === '3'){ //全部上线
      title = '您确定要全部上线吗？'
    }else if(source === '4'){ //下线
      title = '您确定要执行下线操作吗？'
    }else if(source === '5'){ //上线
      title = '您确定要执行上线操作吗？'
    }else if(source === '6'){ //删除
      title = '您确定要删除该商品吗？'
    }
    confirm({
      title: title,
      okText:'确定',
      cancelText:'取消',
      onOk() {
        
      }
    });
  }
  const changeTab = (key) => {
    handleRefresh(pathname,{status:key})
  }
  
  return (
    <div>
      <div className='formBody'>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>商品管理</Breadcrumb.Item>
          <Breadcrumb.Item>选品库</Breadcrumb.Item>
        </Breadcrumb>
        <Button type="primary" style={{float:'right'}} onClick={() =>  handleRefresh('/platform/platemAddGoods',{type:'add'})}>新增商品</Button>
        <Button type="primary" style={{float:'right',marginRight:10}} onClick={() => confirmModal('1')}>批量归类</Button>
        <Button type="primary" style={{float:'right',marginRight:10}} onClick={() => confirmModal('2')}>批量上线</Button>
        <Button type="primary" style={{float:'right',marginRight:10}} onClick={() => confirmModal('3')}>全部上线</Button>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <Tabs defaultActiveKey={String(goodsHouseModel.activeTab)} onChange={changeTab}>
        <TabPane tab="全部" key="1"></TabPane>
        <TabPane tab="待上线" key="2"></TabPane>
        <TabPane tab="已上线" key="3"></TabPane>
      </Tabs>
      <FilterItem {...filterProps} />
      <DataTabel {...tabelProps} />
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