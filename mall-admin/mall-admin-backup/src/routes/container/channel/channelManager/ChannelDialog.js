import React from 'react';
import { Modal, Form, Input  } from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'dva';

const FormItem = Form.Item;


const ChannelDialog = ({
  currentItem = {},
  index,
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
  },
  ...modalProps
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
  const checkMessage = (validateFieldsAndScroll) => {
    validateFieldsAndScroll((errors, values) => {
      console.log(values)
      if (errors) {
        console.log(errors)
      }else{
        let data = {
          channelName:values.channelName,
          companyName:values.companyName,
          linkMan:values.linkMan,
          linkPhone:values.linkPhone,
          pointsWorth:10
        }
        if(index.isUpdate) data = {   //如果修改
          channelId:currentItem.channelId,
          linkMan:values.linkMan,
          linkPhone:values.linkPhone
        }
        dispatch({type:index.isUpdate?'index/updateChannel':'index/addChannel',data})
        .then(() => {
          dispatch({type:'index/query',pageNo:index.isUpdate?index.currentPage:1,pageSize:index.pageSize})
          // modalProps.handleRefresh({pageNo:1,pageSize:index.pageSize})
        })
      }
    })
  }
    return (
        <Modal {...modalProps}
            visible={index.visible}
            onCancel={() => {dispatch({type:'index/hideDialog'})}}
            okText={index.isUpdate?'修改':'创建'}
            cancelText={'取消'}
            title={index.isUpdate?'修改渠道':'创建渠道'}
            onOk={() => checkMessage(validateFieldsAndScroll)}
        >
            <Form layout="horizontal">
              {
                index.isUpdate?<FormItem label="渠道号" {...formItemLayout}>
                  {getFieldDecorator('channelId', {
                        initialValue: currentItem.channelId || ''
                    })(
                      <Input disabled = { index.isUpdate? true: false} autoComplete="off"/>
                  )}            
                </FormItem>:''
              }
              
              <FormItem label="渠道名称" {...formItemLayout} hasFeedback>
                {getFieldDecorator('channelName', {
                      initialValue:  currentItem.channelName,
                      rules: [{required: true, max:20, message: '请输入20字内的渠道名称'}],
                      validateTrigger:'onBlur'
                  })(
                    <Input disabled = { index.isUpdate? true: false} autoComplete="off"/>
                )}
              </FormItem>
              <FormItem label="企业名称" {...formItemLayout} hasFeedback>
                {getFieldDecorator('companyName', {
                      initialValue: currentItem.companyName,
                      rules: [{required: true ,max:20, message: '请输入20字内的企业名称'}],
                      validateTrigger:'onBlur'
                  })(
                    <Input disabled = { index.isUpdate? true: false} autoComplete="off"/>
                )}
              </FormItem>    
              <FormItem label="联系人" {...formItemLayout} hasFeedback>
                {getFieldDecorator('linkMan', {
                      initialValue: currentItem.linkMan,
                      rules: [{required: true, min:1, max:10, message: '请输入10字内的联系人'}],
                      validateTrigger:'onBlur'
                  })(
                    <Input autoComplete="off" />
                )}
              </FormItem> 
              <FormItem label="联系电话" {...formItemLayout} hasFeedback>
                {getFieldDecorator('linkPhone', {
                      initialValue: currentItem.linkPhone,
                      rules: [{required:true, pattern:/^1(3|4|5|7|8|6|9)\d{9}$/, message: '请输入正确的联系电话'}],
                      validateTrigger:'onBlur'
                  })(
                    <Input autoComplete="off" />
                )}
              </FormItem> 
            </Form>
        </Modal>
    );
    
}

ChannelDialog.propTypes = {
  form: PropTypes.object,
  index: PropTypes.object,
}

//将model中的state的数据绑定到组件;
export default connect(({index,loading})=>({index,loading}))(Form.create()(ChannelDialog));