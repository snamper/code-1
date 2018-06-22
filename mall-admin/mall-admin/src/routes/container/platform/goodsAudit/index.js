"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Breadcrumb  ,Button,message, Modal,Radio, Input, Form} from 'antd';
import { routerRedux } from 'dva/router'
import GoodsMessage from './../platemAddGoods/goodsMessage';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const goodsAudit = ({goodsAuditModel,loading,dispatch, location, form:{
  getFieldDecorator,
  validateFieldsAndScroll
}})=>{
  // const confirm = Modal.confirm;
  const handleRefresh = (pathname) => { //当前页面刷新
    dispatch(routerRedux.push({
      pathname
    }))
  }
  const goodsProps = {  //商品详情参数
    
    listImgUrl:goodsAuditModel.listImgUrl,
    mainImgUrl:goodsAuditModel.mainImgUrl,
    isUpdate:goodsAuditModel.isUpdate,
    loading:goodsAuditModel.loading,
    goodsDetail:goodsAuditModel.goodsDetail,
    ifShowDetail:true,
    productMerchant:goodsAuditModel.productMerchant,
    currentProduct:goodsAuditModel.currentProduct,
    imgList:goodsAuditModel.imgList,
    exchangeMessage:goodsAuditModel.exchangeMessage,
    extendedDetail:goodsAuditModel.extendedDetail,
  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 10 },
      sm: { span: 16 },
    }
  };
  const auditGoods = (source) => {
    validateFieldsAndScroll((errors,values) => {
      const payload = {
        id:goodsAuditModel.goodsId,
        productState:values.productState
      }
      if(values.productState === '6' && !values.failedReason){
        message.destroy()
        message.error('请输入审核不通过原因')
        return
      }
      if(values.productState === '6') payload.failedReason = values.failedReason

      dispatch({type:'goodsAuditModel/audit',payload})
      .then((result) => {
        if(result.message === '成功'){
          message.success('审核成功')
          handleRefresh('/platform/checkPendingGoods')
        }else{
          message.error(result.message)
        }
      })
    })
    
  }
  return (
    <Form>
      <div className='formBody'>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>商品管理</Breadcrumb.Item>
          <Breadcrumb.Item>商品审核</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <GoodsMessage {...goodsProps} />
      <Button onClick={() => {dispatch({type:'goodsAuditModel/dialogControll'})}} type="primary" style={{marginLeft:'30%',marginTop:50}}>审核</Button>
      {goodsAuditModel.AuditVisble?
      <Modal 
        visible={goodsAuditModel.AuditVisble}
        onCancel={() => {dispatch({type:'goodsAuditModel/dialogControll'})}}
        okText={'确定'}
        width={500}
        cancelText={'取消'}
        title='商品审核？'
        onOk={() => auditGoods()}
      >
      <FormItem label="审核结果" {...formItemLayout} >
          {getFieldDecorator('productState', {
            initialValue: '11',
            rules: [{required: true, message: ''}]
          })(
            <RadioGroup onChange={(e) => dispatch({type:'goodsAuditModel/changeStatus'})}>
              <Radio value={'11'}>通过</Radio>
              <Radio value={'6'}>不通过</Radio>
            </RadioGroup>
          )}
        </FormItem>
        {
          goodsAuditModel.showFailReason ? '' :<FormItem label="审核失败原因" {...formItemLayout} >
            {getFieldDecorator('failedReason', {
                  initialValue: '',
                  rules: [{ required:false, message: '请输入审核失败原因'}]
              })(
                <TextArea style={{width:200,height:50}} autoComplete="off" />
            )}
          </FormItem>
        }
        
      </Modal>
      :''}
    </Form>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({goodsAuditModel,loading})=>({goodsAuditModel,loading}))(Form.create()(goodsAudit));
//类型检测
goodsAudit.protoTypes = {
  goodsAuditModel:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};