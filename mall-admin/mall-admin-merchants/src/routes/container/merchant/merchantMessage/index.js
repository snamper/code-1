"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form } from 'antd';

const FormItem = Form.Item;
const merchantAccount = ({account,loading,dispatch, location,form: {
  getFieldDecorator,
  validateFieldsAndScroll
},})=>{

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
        <FormItem label="商户号" {...formItemLayout}>
        {account.merchantItem.channelId}
        </FormItem>
        <FormItem label="商城名称" {...formItemLayout}>
        {account.merchantItem.channelName}
        </FormItem>
        <FormItem label="积分汇率" {...formItemLayout}>
        {account.merchantItem.pointsWorth}积分=1元
        </FormItem>
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