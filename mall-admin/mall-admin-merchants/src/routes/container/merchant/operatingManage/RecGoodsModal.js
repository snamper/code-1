import React from 'react';
import { Modal, Form, Input, Button, Table, Pagination, Row, Col, message } from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'dva';
import styles from './index.less' //引入样式

const confirm = Modal.confirm;
const RecGoodsModal = ({
  recGoodsModel,
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
    render:(text,record,index) => (<span>{(recGoodsModel.currentPageModal-1)*recGoodsModel.pageSizeModal+index+1}</span>),
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
    title: '渠道售价(元)',
    dataIndex: 'costPrice',
    key: 'costPrice',
    className: styles.tableTextCtnter,
  }, {
    title: '建议售价(元)',
    dataIndex: 'retailPrice',
    key: 'retailPrice',
    className: styles.tableTextCtnter,
  }, {
    title: '库存数量',
    dataIndex: 'product_code_sum',
    key: 'product_code_sum',
    className: styles.tableTextCtnter,
  }, {
    title: '操作',
    key: 'action',
    render: (text, record, index) => (
      <span>
        {recGoodsModel.isUpload?<a onClick={() => confirmChooseGoods(record.id)}>选择商品</a>:''}
      </span>
    ),
    className: styles.tableTextCtnter,
  }];
  const rowSelection = {  //checkbox操作
    selectedRowKeys:recGoodsModel.chooseGoodsKeys,         //回显的key数组
    onSelect: (record, selected, selectedRows) => {   //单个checkbox选择与取消
      const chooseGoodsIds = recGoodsModel.chooseGoodsIds;
      const chooseGoodsKeys = recGoodsModel.chooseGoodsKeys;
      if(selected ){
          chooseGoodsIds.push({id:record.id})
          chooseGoodsKeys.push(record.id)
      }else {
        chooseGoodsIds.map((item1,index) => 
          <span>{ record.id === item1.productId ? chooseGoodsIds.splice(index,1): ''}</span>
        );
        chooseGoodsKeys.map((item1,index) => 
          <span>{ record.id === item1 ? chooseGoodsKeys.splice(index,1): ''}</span>
        );
      }
      dispatch({
        type:'recGoodsModel/changeChooseGoods',
        chooseGoodsIds,
        chooseGoodsKeys
      })
    },
    onSelectAll: (selected, selectedRows, changeRows) => {  //全选、反选
      const chooseGoodsIds = recGoodsModel.chooseGoodsIds;
      const chooseGoodsKeys = recGoodsModel.chooseGoodsKeys;
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
        type:'recGoodsModel/changeChooseGoods',
        chooseGoodsIds,
        chooseGoodsKeys
      })
    },
  };
  //弹窗列表搜索事件
  const filterChange = (values) => {
    dispatch({
      type:'recGoodsModel/getGoodsList',
      payload:{
        pageNo:1,
        pageSize:recGoodsModel.pageSizeModal,
        fullName:values.fullName,
        merchantShortName:values.merchantShortName,
        source:recGoodsModel.isUpload?'edit':'add',
        chooseProductId:recGoodsModel.chooseProductId
      }
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
          oldId:recGoodsModel.chooseProductId,	//准备被替换的id
          id:id	//要替换的id
        }
          dispatch({type:'recGoodsModel/channelGoodsUpdate',data})
          .then((result) => {
            if(result.message !== '成功'){
              message.error(result.message);
              return
            }
            message.success("提交成功！")
            dispatch({type:'recGoodsModel/query',payload:{pageNo:recGoodsModel.currentPage,pageSize:recGoodsModel.pageSize,channelId:recGoodsModel.channelId,id:recGoodsModel.productId}})
            dispatch({type:'recGoodsModel/hideDialog'})
          })
      },
      onCancel() {
        
      },
    })
  }
  //弹窗选择商品提交按钮
  const submitChooseGoods = () => {
    if(recGoodsModel.chooseGoodsIds.length <= 0){
    	message.destroy()
      message.error("请先选择商品！")
      return;
    }
    confirm({
      title: '您确定提交吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
          dispatch({type:'recGoodsModel/commitGoods',data:recGoodsModel.chooseGoodsIds})
          .then((result) => {
            if(result.message !== '成功'){
              message.error(result.message);
              return
            }
            message.success("提交成功！")
            dispatch({type:'recGoodsModel/query',payload:{pageNo:recGoodsModel.currentPage,pageSize:recGoodsModel.pageSize,channelId:recGoodsModel.channelId,productId:recGoodsModel.productId}})
            dispatch({type:'recGoodsModel/hideDialog'})
          })
      },
      onCancel() {
        
      },
    });
  }
	return (
    <Modal
	    visible={recGoodsModel.goodsVisible}
	    onCancel={() => {dispatch({type:'recGoodsModel/hideDialog'})}}
	    okText={'确定'}
	    cancelText={'取消'}
	    title={'新增推荐商品'}
	    onOk={() => submitChooseGoods()}
	    width={1200}
    >
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('fullName', { initialValue: recGoodsModel.fullName })(<Input placeholder="商品名称"  />)}
      </Col>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('merchantShortName', { initialValue: recGoodsModel.merchantShortName })(<Input placeholder="商户名称"  />)}
      </Col>
      <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            <Button type="primary" className="margin-right" onClick={handleSubmit}>搜索</Button>
          </div>
        </div>
      </Col>
    </Row>
    {recGoodsModel.isUpload?<Table 
      columns={columns} 
      rowKey={record => record.id} 
      dataSource={recGoodsModel.recGoodsList} 
      pagination={false} 
      bordered={true} 
    />:<Table 
      rowSelection={rowSelection} 
      columns={columns} 
      rowKey={record => record.id} 
      dataSource={recGoodsModel.recGoodsList} 
      pagination={false} 
      bordered={true} 
    />}
      <div style={{width:'100%',height:'50px',paddingTop:'15px'}}>
        <Pagination 
          showSizeChanger   
          defaultCurrent={recGoodsModel.currentPageModal} 
          onChange={(pageNo, pageSize) => {dispatch({type:'recGoodsModel/getGoodsList',payload:{pageNo:pageNo,pageSize:pageSize,fullName:recGoodsModel.fullName,merchantShortName:recGoodsModel.merchantShortName,channelId:recGoodsModel.channelId,source:recGoodsModel.chooseProductId?'edit':'add'}})}}  
          onShowSizeChange={(pageNo, pageSize) => {dispatch({type:'recGoodsModel/getGoodsList',payload:{pageNo:pageNo,pageSize:pageSize,fullName:recGoodsModel.fullName,merchantShortName:recGoodsModel.merchantShortName,channelId:recGoodsModel.channelId,source:recGoodsModel.chooseProductId?'edit':'add'}})}} 
          total={recGoodsModel.totalSizeModal} 
          defaultPageSize={recGoodsModel.pageSizeModal} 
        />
      </div>
    </Modal>
	);
}

RecGoodsModal.propTypes = {
  form: PropTypes.object,
  recGoodsModel: PropTypes.object,
}

//将model中的state的数据绑定到组件;
export default connect(({recGoodsModel,loading})=>({recGoodsModel,loading}))(Form.create()(RecGoodsModal));