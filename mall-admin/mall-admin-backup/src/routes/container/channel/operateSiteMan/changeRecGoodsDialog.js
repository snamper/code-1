import React from 'react';
import { Modal, Form, Input, Button, Table, Pagination, Row, Col } from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'dva';
import styles from './index.less' //引入样式

//替换推荐商品弹窗组件
const changeRecGoodsDialog = ({
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
    dataIndex: 'id',
    key: '1',
    render: (text, record, index) => (
      index+1
    ),
    className: styles.tableTextCtnter,
  }, {
    title: '商品ID',
    dataIndex: 'id',
    key: 'id',
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
  },{
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    render: (text, record) => (
    	<a onClick={() => {dispatch({type:'setRecGoodsList/showChangeDialog',productId:record.id})}}>选择</a>
    ),
    className: styles.tableTextCtnter,
  }];
  //弹窗列表搜索事件
  const filterChange = (values) => {
  	console.log(values)
    dispatch({
      type:'setRecGoodsList/getGoodsList',
      pageNo:1,
      pageSize:setRecGoodsList.pageSizeModal,
      fullName:values.fullName,
      merchantShortName:values.merchantShortName
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
	return (
    <Modal
	    visible={setRecGoodsList.changeVisuble}
	    onCancel={() => {dispatch({type:'setRecGoodsList/hideChangeDialog'})}}
	    cancelText={'取消'}
	    title={'替换推荐商品'}
	    width={1200}
	    footer={null}
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
    <Table columns={columns} rowKey={record=>record.id} dataSource={setRecGoodsList.recGoodsList} pagination={false} bordered={true} />:

      <div style={{width:'100%',height:'50px',paddingTop:'15px'}}>
        <Pagination 
          showSizeChanger   
          defaultCurrent={setRecGoodsList.currentPage} 
          onChange={(pageNo, pageSize) => {dispatch({type:'setRecGoodsList/query',pageNo, pageSize})}}  
          onShowSizeChange={(pageNo, pageSize) => {dispatch({type:'setRecGoodsList/query',pageNo, pageSize})}} 
          total={setRecGoodsList.totalSize} 
          defaultPageSize={setRecGoodsList.pageSize} 
        />
      </div>
    </Modal>
	);
}

changeRecGoodsDialog.propTypes = {
  form: PropTypes.object,
  setRecGoodsList: PropTypes.object,
}

//将model中的state的数据绑定到组件;
export default connect(({setRecGoodsList,loading})=>({setRecGoodsList,loading}))(Form.create()(changeRecGoodsDialog));