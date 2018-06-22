import React from 'react';
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input } from 'antd'
import { connect } from 'dva';


const GoodsFilter = ({
  filter,
  goodsCate,
  onFilterChange,
  dispatch,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
})=>{   
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
  const filterChange = (values) => {
    dispatch({
      type:'goodsCate/getGoodsList',
      payload:{
        pageNo:1,
        pageSize:goodsCate.pageSizeModal,
        productName:values.productName,
        sortId:goodsCate.chooseCateId,
        channelId:goodsCate.channelId
      }
    })
  }
  const handleSubmit = () => {
    let fields = getFieldsValue()
    filterChange(fields)
  }
  
    
  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('productName', { initialValue: goodsCate.productName })(<Input placeholder="商品名称"  />)}
      </Col>
      <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            <Button type="primary" className="margin-right" onClick={handleSubmit}>搜索</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
    
}

GoodsFilter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

//将model中的state的数据绑定到组件;
export default connect(({goodsCate,loading})=>({goodsCate,loading}))(Form.create()(GoodsFilter));