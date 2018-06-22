import React from 'react';
import { Modal, Table, Pagination, message } from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'dva';
import GoodsFilter from './GoodsFilter';
const confirm = Modal.confirm;
const ChooseGoodsModal = ({
  goodsCate,
  loading,
  dispatch
})=>{   
  const columns = [{
    title: '序号',
    dataIndex: 'id',
    key: '1',
    render:(text,record,index) => (<span>{(goodsCate.currentPageModal-1)*goodsCate.pageSize+index+1}</span>)
  },{
    title: '商品ID',
    dataIndex: 'id',
    key: 'id'
  }, {
    title: '商品名称',
    dataIndex: 'productName',
    key: 'productName',
  },{
    title: '商户名称',
    dataIndex: 'merchantName',
    key: 'merchantName',
  },{
    title: '零售价（元）',
    dataIndex: 'retailPrice',
    key: 'retailPrice',
  },{
    title: '成本价（元）',
    dataIndex: 'costPrice',
    key: 'costPrice',
  },{
    title: '库存数量',
    dataIndex: 'stockNum',
    key: 'stockNum'
  }];
  
  const rowSelection = {
    selectedRowKeys:goodsCate.chooseGoodsKeys,         //回显的key数组
    onSelect: (record, selected, selectedRows) => {   //单个checkbox选择与取消
      const chooseGoodsIds = goodsCate.chooseGoodsIds;
      const chooseGoodsKeys = goodsCate.chooseGoodsKeys;
      if(selected ){
          chooseGoodsIds.push({id:record.id})
          chooseGoodsKeys.push(record.id)
      }else {
        chooseGoodsIds.map((item1,index) => 
          <span>{ record.id === item1.id ? chooseGoodsIds.splice(index,1): ''}</span>
        );
        chooseGoodsKeys.map((item1,index) => 
          <span>{ record.id === item1 ? chooseGoodsKeys.splice(index,1): ''}</span>
        );
      }
      dispatch({
        type:'goodsCate/changeChooseGoods',
        chooseGoodsIds,
        chooseGoodsKeys
      })
    },
    onSelectAll: (selected, selectedRows, changeRows) => {  //全选、反选
      const chooseGoodsIds = goodsCate.chooseGoodsIds;
      const chooseGoodsKeys = goodsCate.chooseGoodsKeys;
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
              <span>{item.id === item1 ? chooseGoodsKeys.splice(index,1): ''}</span>
            )}
          </span>
        )
      }
      dispatch({
        type:'goodsCate/changeChooseGoods',
        chooseGoodsIds,
        chooseGoodsKeys
      })
    },
    
  };
  const submitChooseGoods = () => {
  	if(goodsCate.chooseGoodsIds.length <= 0){
  		message.destroy()
      message.error("请先选择商品！")
  		return;
  	}
    confirm({
      title: '您确定提交吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
        dispatch({
          type:'goodsCate/commitGoods',
          channelId:goodsCate.channelId,
          ids:goodsCate.chooseGoodsIds,
          dispatch,
          payload:{
            pageNo:goodsCate.currentPage,pageSize:goodsCate.pageSize,channelId:goodsCate.channelId
          }
        })
      },
      onCancel() {
        
      },
    });
  }
  const locale = {
    filterTitle: '筛选',
    filterConfirm: '确定',
    filterReset: '重置',
    emptyText: '暂无数据',
  };
  return (
    <Modal
      visible={goodsCate.visible}
      onCancel={() => {dispatch({type:'goodsCate/hideDialog'})}}
      okText='提交商品'
      cancelText={'取消'}
      maskClosable={false}
      width={1200}
      onOk={() => submitChooseGoods()}
  >
      <GoodsFilter />
      <Table 
        columns={columns} 
        rowSelection={rowSelection} 
        selections={true} 
        rowKey={record => record.id}
        dataSource={goodsCate.goodsList} 
        pagination={false}
        locale={locale}
      />
      <div style={{width:'100%',height:'50px',paddingTop:'15px'}}>
        <Pagination 
          showSizeChanger   
          defaultCurrent={goodsCate.currentPageModal} 
          onChange={(pageNo, pageSize) => {dispatch({type:'goodsCate/getGoodsList',payload:{pageNo, pageSize}})}}  
          onShowSizeChange={(pageNo, pageSize) => {dispatch({type:'goodsCate/getGoodsList',payload:{pageNo, pageSize}})}} 
          total={goodsCate.totalSizeModal} 
          defaultPageSize={goodsCate.pageSize} 
        />
      </div>
    </Modal>
  );
    
}

ChooseGoodsModal.propTypes = {
  form: PropTypes.object,
  index: PropTypes.object,
}

//将model中的state的数据绑定到组件;
export default connect(({goodsCate,loading})=>({goodsCate,loading}))(ChooseGoodsModal);