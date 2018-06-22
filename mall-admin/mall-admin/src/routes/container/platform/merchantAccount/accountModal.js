import React from 'react';
import { Modal, Form, Input, Select  } from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'dva';

const FormItem = Form.Item;
const Option = Select.Option;

const AccountModal = ({
  accountModel,
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
      
      if (errors) {
        console.log(errors)
      }else{
        let data = values
        // console.log(data)
        // return
//      console.log(data)
//      return
        if(accountModel.isUpdate) data = {   //如果修改
          connectUserName:values.connectUserName,
          connectUserPhone:values.connectUserPhone,
          id:accountModel.currentItem.id
        }
        dispatch({type:accountModel.isUpdate?'accountModel/updateUserInfo':'accountModel/addChannel',data})
        .then((res) => {  //hideDialog
//      	console.log(res)
//      	if(res.message === '成功') {
        		dispatch({type:'accountModel/hideDialog'})
            dispatch({type:'accountModel/query',pageNo:accountModel.isUpdate?accountModel.currentPage:1,pageSize:accountModel.pageSize})
//      	}
        })
      }
    })
  }
    return (
      <Modal 
            visible={accountModel.visible}
            onCancel={() => {dispatch({type:'accountModel/hideDialog'})}}
            okText={'确定'}
            cancelText={'取消'}
            title={accountModel.isUpdate?'商户编辑':'新增商户'}
            onOk={() => checkMessage()}
        >
          <Form layout="horizontal">
            <FormItem label="商户类型" {...formItemLayout} hasFeedback>
              {accountModel.isUpdate?<span>{accountModel.currentItem.type === 1 ? '商城类商户':(accountModel.currentItem.type === 2 ? '商品类商品':'供应商')}</span>:getFieldDecorator('type', {
                    initialValue:  accountModel.currentItem.type,
                    rules: [{required: true,message: '请选择商户类型'}]
                })(
                  <Select>
                    <Option value="1">商城类商户</Option>
                    <Option value="2">商品类商户</Option>
                    <Option value="3">供应商</Option>
                  </Select>
              )}
            </FormItem>
            <FormItem label="账号" {...formItemLayout} hasFeedback>
              {accountModel.isUpdate?<span>{accountModel.currentItem.account}</span>:getFieldDecorator('account', {
                    initialValue: '' ,
                    rules: [{
                      required: true, 
                      pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, 
                      message: '邮箱格式输入不正确'
                    }],
                })(
                  <Input placeholder="仅支持邮箱格式" name="kasjgfir" autoComplete="off"/>
              )}
            </FormItem>
            <FormItem label="密码" {...formItemLayout} hasFeedback>
              {accountModel.isUpdate?<span>******</span>:getFieldDecorator('password', {
                    initialValue: '',
                    rules: [{required: true , message: '请输入密码'}]
                })(
                  <Input type="" name="paswdfgn" autoComplete="off"/>
              )}
            </FormItem>    
            <FormItem label="商户名称" {...formItemLayout} hasFeedback>
              {accountModel.isUpdate?<span>{accountModel.currentItem.name}</span>:getFieldDecorator('name', {
                    initialValue: '',
                    rules: [{required: true, message: '请输入商户名称'}]
                })(
                  <Input placeholder="公司简称" autoComplete="off" />
              )}
            </FormItem> 
            <FormItem label="公司名称" {...formItemLayout} hasFeedback>
              {accountModel.isUpdate?<span>{accountModel.currentItem.companyName}</span>:getFieldDecorator('companyName', {
                    initialValue: accountModel.currentItem.companyName,
                    rules: [{required: true, message: '请输入公司名称'}]
                })(
                  <Input  autoComplete="off" />
              )}
            </FormItem> 
            <FormItem label="联系人" {...formItemLayout} hasFeedback>
              {getFieldDecorator('connectUserName', {
                    initialValue: accountModel.currentItem.connectUserName,
                    rules: [{required: true, message: '请输入联系人'}]
                })(
                  <Input autoComplete="off" />
              )}
            </FormItem> 
            <FormItem label="联系电话" {...formItemLayout} hasFeedback>
              {getFieldDecorator('connectUserPhone', {
                    initialValue: accountModel.currentItem.connectUserPhone,
                    rules: [{required:true, pattern:/^1(3|4|5|7|8|6|9)\d{9}$/, message: '请输入正确的联系电话'}],
                })(
                  <Input autoComplete="off" />
              )}
            </FormItem> 
          </Form>
      </Modal>
    );
    
}

AccountModal.propTypes = {
  form: PropTypes.object,
  accountModel: PropTypes.object,
}

//将model中的state的数据绑定到组件;
export default connect(({accountModel,loading})=>({accountModel,loading}))(Form.create()(AccountModal));