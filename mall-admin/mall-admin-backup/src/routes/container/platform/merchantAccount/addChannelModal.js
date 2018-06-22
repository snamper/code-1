import React from 'react';
import { Modal, Form, Input  } from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'dva';

const FormItem = Form.Item;

const ChannelModal = ({
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
      console.log(values)
      if (errors) {
        console.log(errors)
      }else{
        
      }
    })
  }
    return (
        <Modal 
            visible={accountModel.channelVisible}
            onCancel={() => {dispatch({type:'accountModel/hideChannelDialog'})}}
            okText={'确定'}
            cancelText={'取消'}
            title={'创建渠道'}
            onOk={() => checkMessage()}
        >
            <Form layout="horizontal">
             
              <FormItem label="渠道名称" {...formItemLayout} hasFeedback>
                {getFieldDecorator('password', {
                      initialValue: '',
                      rules: [{required: true , message: '请输入渠道名称'}]
                  })(
                    <Input  autoComplete="off"/>
                )}
              </FormItem>    
             
              <FormItem label="积分汇率" {...formItemLayout} hasFeedback>
                {getFieldDecorator('companyName', {
                      initialValue: '',
                      rules: [{required: true, message: '请输入积分汇率'}]
                  })(
                    <Input  autoComplete="off" />
                )}
              </FormItem> 
             
            </Form>
        </Modal>
    );
    
}

ChannelModal.propTypes = {
  form: PropTypes.object,
  accountModel: PropTypes.object,
}

//将model中的state的数据绑定到组件;
export default connect(({accountModel,loading})=>({accountModel,loading}))(Form.create()(ChannelModal));