import React from 'react';
import { Modal, Form, Input, Button, Table, Pagination, Row, Col, message } from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'dva';
import styles from './index.less' //引入样式

const confirm = Modal.confirm;
const addRecGoodsDialog = ({
  setRecGoodsList,
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldsValue
  },
})=>{
  const columns = [{
    title: '序号',
    dataIndex: 'idx',
    key: '1',
    render:(text,record,index) => (<span>{(setRecGoodsList.currentPageModal-1)*setRecGoodsList.pageSizeModal+index+1}</span>),
    className: styles.tableTextCtnter,
  }, {
    title: '商品ID',
    dataIndex: 'product_id',
    key: 'product_id',
    className: styles.tableTextCtnter,
  }, {
    title: '商品名称',
    dataIndex: 'full_name',
    key: 'full_name',
    className: styles.tableTextCtnter,
  }, {
    title: '商户名称',
    dataIndex: 'merchant_short_name',
    key: 'merchant_short_name',
    className: styles.tableTextCtnter,
  }, {
    title: '零售价(元)',
    dataIndex: 'retail_price',
    key: 'retail_price',
    className: styles.tableTextCtnter,
  }, {
    title: '成本价(元)',
    dataIndex: 'cost_price',
    key: 'cost_price',
    className: styles.tableTextCtnter,
  }, {
    title: '库存数量',
    dataIndex: 'stock_num',
    key: 'stock_num',
    className: styles.tableTextCtnter,
  }, {
    title: '操作',
    key: 'action',
    render: (text, record, index) => (
      <span>
        {setRecGoodsList.isUpload?<a onClick={() => confirmChooseGoods(record.product_id)}>选择商品</a>:''}
      </span>
    ),
    className: styles.tableTextCtnter,
  }];
  const rowSelection = {  //checkbox操作
    selectedRowKeys:setRecGoodsList.chooseGoodsKeys,         //回显的key数组
    onSelect: (record, selected, selectedRows) => {   //单个checkbox选择与取消
      const chooseGoodsIds = setRecGoodsList.chooseGoodsIds;
      const chooseGoodsKeys = setRecGoodsList.chooseGoodsKeys;
      if(selected ){
          chooseGoodsIds.push({channelId:setRecGoodsList.channelId,productId:record.product_id})
          chooseGoodsKeys.push(record.id)
      }else {
        chooseGoodsIds.map((item1,index) => 
          <span>{ record.product_id === item1.productId ? chooseGoodsIds.splice(index,1): ''}</span>
        );
        chooseGoodsKeys.map((item1,index) => 
          <span>{ record.id === item1 ? chooseGoodsKeys.splice(index,1): ''}</span>
        );
      }
      dispatch({
        type:'setRecGoodsList/changeChooseGoods',
        chooseGoodsIds,
        chooseGoodsKeys
      })
    },
    onSelectAll: (selected, selectedRows, changeRows) => {  //全选、反选
      const chooseGoodsIds = setRecGoodsList.chooseGoodsIds;
      const chooseGoodsKeys = setRecGoodsList.chooseGoodsKeys;
      if(selected && changeRows.length > 0){
        changeRows.map((item) => 
        <span>
          {chooseGoodsIds.push({channelId:setRecGoodsList.channelId,productId:item.product_id})}
          {chooseGoodsKeys.push(item.id)}
        </span>
      )
      }else if(!selected && changeRows.length > 0){
        changeRows.map((item) => 
          <span>
            {chooseGoodsIds.map((item1,index) => 
              <span>{item.product_id === item1.productId ? chooseGoodsIds.splice(index,1): ''}</span>
            )}
            {chooseGoodsKeys.map((item1,index) => 
              <span>{item.id === item1 ? chooseGoodsKeys.splice(index,1): ''}</span>
            )}
          </span>
          
        )
      }
      dispatch({
        type:'setRecGoodsList/changeChooseGoods',
        chooseGoodsIds,
        chooseGoodsKeys
      })
    },
  };
  //弹窗列表搜索事件
  const filterChange = (values) => {
  	console.log(setRecGoodsList.isUpload)
    dispatch({
      type:'setRecGoodsList/getGoodsList',
      pageNo:1,
      pageSize:setRecGoodsList.pageSizeModal,
      fullName:values.fullName,
      merchantShortName:values.merchantShortName,
      source:setRecGoodsList.isUpload?'edit':'add',
      chooseProductId:setRecGoodsList.chooseProductId
    })
  }
  const handleSubmit = () => {
    let fields = getFieldsValue()
    filterChange(fields)
  }
  //输入框的样式
  const ColProps = {
    xs: 24,
    sm: 12,
    style: {
      marginBottom: 16,
    },
  }
  const TwoColProps = {
    ...ColProps,
    xl: 96,
  }
  //单个商品替换
  const confirmChooseGoods = (id) => {
    if(!id) {
    	message.destroy()
      message.error("请先选择商品！")
      return;
    }
    confirm({
      title: '您确定要替换成该商品吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
        const data = {
          id:setRecGoodsList.chooseProductId,
          channelId:setRecGoodsList.channelId,
          productId:id
        }
          dispatch({type:'setRecGoodsList/channelGoodsUpdate',data})
          .then((result) => {
            if(result.message !== '成功'){
              message.error(result.message);
              return
            }
            message.success("提交成功！")
            dispatch({type:'setRecGoodsList/query',payload:{pageNo:setRecGoodsList.currentPage,pageSize:setRecGoodsList.pageSize,channelId:setRecGoodsList.channelId,productId:setRecGoodsList.productId}})
            dispatch({type:'setRecGoodsList/hideDialog'})
          })
      },
      onCancel() {
        
      },
    })
  }
  //弹窗选择商品提交按钮
  const submitChooseGoods = () => {
    if(setRecGoodsList.chooseGoodsIds.length <= 0){
    	message.destroy()
      message.error("请先选择商品！")
      return;
    }
    confirm({
      title: '您确定提交吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
          dispatch({type:'setRecGoodsList/commitGoods',data:setRecGoodsList.chooseGoodsIds})
          .then((result) => {
            console.log(result)
            if(result.message !== '成功'){
              message.error(result.message);
              return
            }
            message.success("提交成功！")
            dispatch({type:'setRecGoodsList/query',payload:{pageNo:setRecGoodsList.currentPage,pageSize:setRecGoodsList.pageSize,channelId:setRecGoodsList.channelId,productId:setRecGoodsList.productId}})
            dispatch({type:'setRecGoodsList/hideDialog'})
          })
      },
      onCancel() {
        
      },
    });
  }
	return (
    <Modal
	    visible={setRecGoodsList.visible}
	    onCancel={() => {dispatch({type:'setRecGoodsList/hideDialog'})}}
	    okText={'确定'}
	    cancelText={'取消'}
	    title={'新增推荐商品'}
	    onOk={() => submitChooseGoods()}
	    width={1200}
    >
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('fullName', { initialValue: setRecGoodsList.fullName })(<Input placeholder="商品名称"  />)}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('merchantShortName', { initialValue: setRecGoodsList.merchantShortName })(<Input placeholder="商户名称"  />)}
      </Col>
      <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            <Button type="primary" className="margin-right" onClick={handleSubmit}>搜索</Button>
          </div>
        </div>
      </Col>
    </Row>
    {setRecGoodsList.isUpload?<Table 
      columns={columns} 
      rowKey={record => record.id} 
      dataSource={setRecGoodsList.recGoodsList} 
      pagination={false} 
      bordered={true} 
    />:<Table 
      rowSelection={rowSelection} 
      columns={columns} 
      rowKey={record => record.id} 
      dataSource={setRecGoodsList.recGoodsList} 
      pagination={false} 
      bordered={true} 
    />}
    

      <div style={{width:'100%',height:'50px',paddingTop:'15px'}}>
        <Pagination 
          showSizeChanger   
          defaultCurrent={setRecGoodsList.currentPageModal} 
          onChange={(pageNo, pageSize) => {dispatch({type:'setRecGoodsList/getGoodsList',payload:{pageNo:pageNo,pageSize:pageSize,fullName:setRecGoodsList.fullName,merchantShortName:setRecGoodsList.merchantShortName,channelId:setRecGoodsList.channelId,source:setRecGoodsList.ifUpload?'edit':'add'}})}}  
          onShowSizeChange={(pageNo, pageSize) => {dispatch({type:'setRecGoodsList/getGoodsList',payload:{pageNo:pageNo,pageSize:pageSize,fullName:setRecGoodsList.fullName,merchantShortName:setRecGoodsList.merchantShortName,channelId:setRecGoodsList.channelId,source:setRecGoodsList.ifUpload?'edit':'add'}})}} 
          total={setRecGoodsList.totalSizeModal} 
          defaultPageSize={setRecGoodsList.pageSizeModal} 
        />
      </div>
    </Modal>
	);
}

addRecGoodsDialog.propTypes = {
  form: PropTypes.object,
  setRecGoodsList: PropTypes.object,
}

//将model中的state的数据绑定到组件;
export default connect(({setRecGoodsList,loading})=>({setRecGoodsList,loading}))(Form.create()(addRecGoodsDialog));