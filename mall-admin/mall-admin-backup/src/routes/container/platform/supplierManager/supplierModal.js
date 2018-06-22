import React from 'react';
import { Modal, Form, Input, Radio   } from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'dva';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

const SupplierModal = ({
  supplierModel,
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
  }
})=>{   
  const formItemLayout = {
    labelCol: {
      xs: { span: 26 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 18 },
      sm: { span: 11 },
    }
  };
  const checkMessage = () => {
    validateFieldsAndScroll((errors, values) => {
      console.log(values)
      if (errors) {
        console.log(errors)
      }else{
        
      }
    })
  }
    return (
      <Modal 
            visible={supplierModel.visible}
            onCancel={() => {dispatch({type:'supplierModel/hideDialog'})}}
            okText={'确定'}
            cancelText={'取消'}
            title={supplierModel.isUpdate?'商户编辑':'新增商户'}
            onOk={() => checkMessage()}
        >
          <Form layout="horizontal">
            <FormItem label="发货方式" {...formItemLayout} hasFeedback>
              {supplierModel.isUpdate?<span>平台发货</span>:getFieldDecorator('linkPhone', {
                    initialValue: '',
                })(
                  <RadioGroup >
                    <Radio value={1}>供货商发货</Radio>
                    <Radio value={2}>平台发货</Radio>
                  </RadioGroup>
              )}
            </FormItem> 
            
            <FormItem label="供应商简称" {...formItemLayout} hasFeedback>
              {getFieldDecorator('name1', {
                    initialValue: supplierModel.currentItem.linkPhone,
                    rules: [{required:true, max:8, message: '请输入8个字以内供应商简称'}],
                })(
                  <Input autoComplete="off" />
              )}
            </FormItem> 
            <FormItem label="供应商全称" {...formItemLayout} hasFeedback>
              {supplierModel.isUpdate?<span>北京1234567个小矮人公司</span>:getFieldDecorator('name2', {
                    initialValue: supplierModel.currentItem.linkPhone,
                    rules: [{required:true, max:8, message: '请输入15个字以内供应商全称'}],
                })(
                  <Input autoComplete="off" />
              )}
            </FormItem>
            <FormItem label="供应商简称" {...formItemLayout} hasFeedback>
              {getFieldDecorator('linkPhone', {
                    initialValue: supplierModel.currentItem.linkPhone,
                    rules: [{required:true, max:8, message: '请输入8个字以内供应商简称'}],
                })(
                  <Input autoComplete="off" />
              )}
            </FormItem>
            <FormItem label="供应商描述" {...formItemLayout} >
              {getFieldDecorator('text', {
                    initialValue: supplierModel.currentItem.linkPhone,
                    rules: [{max:200, message: '最多输入200字'}],
                })(
                  <TextArea style={{minHeight:120,minWidth:280}}  />
              )}
            </FormItem>
          </Form>
      </Modal>
    );
    
}

SupplierModal.propTypes = {
  form: PropTypes.object,
  supplierModel: PropTypes.object,
}

//将model中的state的数据绑定到组件;
export default connect(({supplierModel,loading})=>({supplierModel,loading}))(Form.create()(SupplierModal));