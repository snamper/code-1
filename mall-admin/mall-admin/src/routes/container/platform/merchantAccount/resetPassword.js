import React from 'react';
import { Modal, Form, Input, message  } from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'dva';

const FormItem = Form.Item;

const ResetPwdModal = ({
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
        console.log(values)
        let datas = {
          password: values.password,
          id: accountModel.currentItemChannel.id
        }
        dispatch({type:'accountModel/resetPassword',datas}).then((data)=> {
           if(data.message === '成功'){
            message.success('重置成功')
            dispatch({type:'accountModel/hideResetPwdDialog'})
          }else{
            message.error(data.message)
          }
          
        })
      }
    })
  }
    return (
        <Modal 
            visible={accountModel.resetPwd}
            onCancel={() => {dispatch({type:'accountModel/hideResetPwdDialog'})}}
            okText={'确定'}
            cancelText={'取消'}
            title={'重置密码'}
            onOk={() => checkMessage()}
        >
            <Form layout="horizontal"> 
              <FormItem label="账号" {...formItemLayout} hasFeedback>
              <span>{accountModel.currentItemChannel.account}</span>
              </FormItem>    
              <FormItem label="商户名称" {...formItemLayout} hasFeedback>
              <span>{accountModel.currentItemChannel.name}</span>
              </FormItem> 
              <FormItem label="重置密码" {...formItemLayout} hasFeedback>
              {getFieldDecorator('password', {
                      initialValue: '',
                      rules: [{required: true, message: '请输入密码'}]
                  })(
                    <Input type="password" autoComplete="off"/>
                )}
                  
              </FormItem>
            </Form>
        </Modal>
    );
    
}

ResetPwdModal.propTypes = {
  form: PropTypes.object,
  accountModel: PropTypes.object,
}

//将model中的state的数据绑定到组件;
export default connect(({accountModel,loading})=>({accountModel,loading}))(Form.create()(ResetPwdModal));