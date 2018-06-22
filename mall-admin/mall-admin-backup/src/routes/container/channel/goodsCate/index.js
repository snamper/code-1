"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import queryString from 'query-string'
import { routerRedux } from 'dva/router'
import { Table, Breadcrumb, Pagination, Button, Modal, message } from 'antd';
import ChooseGoodsModal from './chooseGoodsModal';
const confirm = Modal.confirm;

const channelChooseGoods = ({goodsCate,loading,dispatch,location})=>{
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const columns = [{
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    render:(text,record,index) => (<span>{record.parentId === record.id?(goodsCate.currentPage-1)*goodsCate.pageSize+index+1:''}</span>)
  }, {
    title: '一级分类',
    dataIndex: 'name',
    key: 'name',
    render:(text,record) => <span>{record.parentId === record.id?text:''}</span>
  }, {
    title: '二级分类',
    dataIndex: 'name',
    key: 'name1',
    render:(text,record) => <span>{record.parentId !== record.id?text:''}</span>
  }, {
    title: '已选/总数',
    dataIndex: 'total',
    key: 'total',
    render:(text,record) => <span>{record.checked} / {record.total}</span>
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        record.parentId !== record.id ? 
        <span >
          <a onClick={() => {dispatch({type:'goodsCate/chooseGoods',sortId:record.id,pageNo:goodsCate.currentPageModal,pageSize:goodsCate.pageSizeModal,channelId:goodsCate.channelId})}}>商品选取</a>
        </span> : ''
    ),
  }];
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }
  const rowSelection = {
    selectedRowKeys:goodsCate.chooseCateKeys,         //回显的key数组
    onSelect: (record, selected, selectedRows) => {   //单个checkbox选择与取消
      const chooseCateIds = goodsCate.chooseCateIds;
      const chooseCateKeys = goodsCate.chooseCateKeys;
      if(selected ){
          if(record.hasOwnProperty('children') && record.children.length > 0) {    //如果选择的是一级分类
            record.children.map(item => 
                <span>
                  {chooseCateIds.push({id:item.id,type:2})}
                  {chooseCateKeys.push(item.id)}
                </span>
              
            )
          }
          chooseCateIds.push({id:record.id,type:1})
          chooseCateKeys.push(record.id)
      }else { 
        if(record.hasOwnProperty('children')) {  //如果选择的是一级分类
          console.log(chooseCateKeys)
          for(let i = 0; i < record.children.length; i++){
            const item = record.children[i];
            chooseCateIds.map((item1,index) => 
                <span>{item.id === item1.id ? chooseCateIds.splice(index,1): ''}</span>
            )
            chooseCateKeys.map((item1,index) => 
                <span>{ item.id === item1 ? chooseCateKeys.splice(index,1): ''}</span>
            )
          }
          chooseCateIds.map((item1,index) => 
              <span>{ record.id === item1.id ? chooseCateIds.splice(index,1): ''}</span>
          )
          chooseCateKeys.map((item1,index) => 
              <span>{ record.id === item1 ? chooseCateKeys.splice(index,1): ''}</span>
          )
          
        }else{
          let parentItem = {}
          goodsCate.dataSource.list.map(item => {  //拿到父元素
            return item.id === record.parentId ? parentItem = item : ''
          })
          chooseCateIds.map((item1,index) => {
            return record.id === item1.id ? chooseCateIds.splice(index,1): ''
          })
          chooseCateKeys.map((item1,index) => (
              <span>{record.id === item1 ? chooseCateKeys.splice(index,1): ''}
              {parentItem.id && parentItem.id === item1 ? chooseCateKeys.splice(index,1): ''}</span>
          ))
        }
      }
      dispatch({
        type:'goodsCate/changeChooseGoodsCate',
        chooseCateIds,
        chooseCateKeys
      })
    },
    onSelectAll: (selected, selectedRows, changeRows) => {  //全选、反选
      const chooseCateIds = goodsCate.chooseCateIds;
      const chooseCateKeys = goodsCate.chooseCateKeys;
      if(selected && changeRows.length > 0){
        changeRows.map((item) => 
          <span>
            {chooseCateIds.push({id:item.id,type:item.id === item.parentId?1:2})}
            {chooseCateKeys.push(item.id)}
          </span>
        )
      }else if(!selected && changeRows.length > 0){
        changeRows.map((item) => 
          <span>
          {chooseCateIds.length > 0?chooseCateIds.map((item1,index) => 
            <span>{item.id === item1.id ? chooseCateIds.splice(index,1): ''}</span>
          ):''}
          {chooseCateKeys.length > 0?chooseCateKeys.map((item1,index) => 
            <span>{item.id === item1 ? chooseCateKeys.splice(index,1): ''}</span>
          ):''}
          </span>
        )
      }
      dispatch({
        type:'goodsCate/changeChooseGoodsCate',
        chooseCateIds,
        chooseCateKeys
      })
    },
    
  };

  const onExpand = (expanded, record) => {  //记录列表展开的状态
    const defaultExpandedRowKeys = goodsCate.defaultExpandedRowKeys;
    if(expanded)  defaultExpandedRowKeys.push(record.id);
    else defaultExpandedRowKeys.map((item,index) => {
      return item === record.id?defaultExpandedRowKeys.splice(index,1): ''
    })
    dispatch({
      type:'goodsCate/changeExpandRows',
      defaultExpandedRowKeys
    })
  }
  const confirmModal = () => {
    if(goodsCate.chooseCateIds.length <= 0){
      message.error("请先选择分类")
      return;
    }
    confirm({
      title: '您确定提交吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
          dispatch({type:'goodsCate/commitGoodsByCate',channelId:goodsCate.channelId,ids:goodsCate.chooseCateIds})
          .then((result) => {
            if(result.message !== '成功'){
              message.error(result.message);
              return;
            }
            const payload = {
              pageNo:goodsCate.currentPage,
              pageSize:goodsCate.pageSize,
              channelId:goodsCate.channelId
            }
            message.success("提交成功！",1,dispatch({type:'goodsCate/query',payload,source:'clearKeys'}))
            
          })
      },
      onCancel() {
        
      },
    });
  }
  return (
    <div>
      <div className='formBody'>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>渠道选品</Breadcrumb.Item>
          <Breadcrumb.Item>渠道选品</Breadcrumb.Item>
          <Breadcrumb.Item>分类选品</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{marginLeft:36,float:'left',color:'#333'}}>渠道名称：{goodsCate.dataSource.channelName}</div>
        <Button type="primary" style={{float:'right'}} onClick={() => confirmModal()}>提交</Button>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <Table 
        columns={columns} 
        selections={true} 
        defaultExpandedRowKeys={goodsCate.defaultExpandedRowKeys}  
        onExpand={onExpand} 
        rowSelection={rowSelection} 
        rowKey={record => record.id}  
        dataSource={goodsCate.dataSource.list} 
        pagination={false}
      />
      
      <div style={{width:'100%',height:'50px',paddingTop:'15px'}}>
        <Pagination 
          showSizeChanger   
          defaultCurrent={goodsCate.currentPage} 
          onChange={(pageNo, pageSize) => handleRefresh({pageNo, pageSize})}  
          onShowSizeChange={(pageNo, pageSize) => handleRefresh({pageNo, pageSize})} 
          total={goodsCate.totalSize} 
          defaultPageSize={goodsCate.pageSize} 
        />
      </div>

      <ChooseGoodsModal location/>
      
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({goodsCate,loading})=>({goodsCate,loading}))(channelChooseGoods);
//类型检测
channelChooseGoods.protoTypes = {
  goodsCate:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};