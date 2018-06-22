"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Modal, Form, Input, Icon, message } from 'antd';

const confirm = Modal.confirm;
const FormItem = Form.Item;
const merchantAccount = ({account,loading,dispatch, location,form: {
  getFieldDecorator,
  validateFieldsAndScroll
},})=>{
  
  const confirmModal = () => {
    validateFieldsAndScroll((errors, values) => {
      if(errors){
        message.destroy()
        message.error('信息填写错误，请修改！')
        return
      }else{
        confirm({
          title: '您确定保存修改吗？',
          okText:'确定',
          cancelText:'取消',
          onOk() {
              dispatch({type:'account/disabletchannel'})
              .then((result) => {
                if(result.message === '成功'){
                  message.success("修改成功");
                }else{
                  message.error(result.message);
                }
              })
          },
          onCancel() {
            return;
          },
        });
      }
    })
  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 10 },
      sm: { span: 5 },
    }
  };
  return (
    <div>
      <Form layout="horizontal">
        <FormItem label="商户类型" {...formItemLayout}>
        商城类商户
        </FormItem>
        <FormItem label="账号" {...formItemLayout}>
        商城类商户
        </FormItem>
        <FormItem label="密码" {...formItemLayout}>
        {account.passwordUpdate?getFieldDecorator('password', {
            initialValue:  account.merchantMessage.password,
            rules: [{required: true, message: '请输入密码'}],
            validateTrigger:'onBlur'
        })(
            <Input type="password" autoComplete="off"/>
        ):
          <span>******<Icon onClick={() => {dispatch({type:'account/editPassword'})}} style={{marginTop:8,cursor:"pointer",float:'right',fontSize:26}} type="edit" /></span>
        }
        </FormItem>
        <FormItem label="商户类型" {...formItemLayout}>
        商城类商户
        </FormItem>
        <FormItem label="商户类型" {...formItemLayout}>
        商城类商户
        </FormItem>
        
        <FormItem label="联系人" {...formItemLayout} hasFeedback>
          {getFieldDecorator('linkMan', {
                initialValue:  account.merchantMessage.channelName || '',
                rules: [{required: true, max:20, message: '请输入20字内的联系人名称'}],
                validateTrigger:'onBlur'
            })(
              <Input  autoComplete="off"/>
          )}
        </FormItem>
        <FormItem label="联系电话" {...formItemLayout} hasFeedback>
          {getFieldDecorator('linkPhone', {
                initialValue: account.merchantMessage.linkPhone || '',
                rules: [{required: true ,pattern:/^1(3|4|5|7|8|6|9)\d{9}$/,max:11, message: '请输入正确的联系电话'}],
                validateTrigger:'onBlur'
            })(
              <Input autoComplete="off"/>
          )}
        </FormItem>   
        <Button onClick={() => confirmModal()} style={{marginLeft:'25%'}}>保存</Button>
      </Form>
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({account,loading})=>({account,loading}))(Form.create()(merchantAccount));
//类型检测
merchantAccount.protoTypes = {
  account:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};