import React from 'react';
import { Modal,  message, Radio, Input, Form} from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'dva';
const goodsModal = ({
  checkPendingGoods,
  loading,
  dispatch,
  form:{
    getFieldDecorator,
    validateFieldsAndScroll
  },
  ...modalProps
})=>{   
  const RadioGroup = Radio.Group;
  const FormItem = Form.Item;
  const {TextArea} = Input
  const {handleRefresh} = modalProps
  const formItemLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 10 },
      sm: { span: 14 },
    }
  };
  const confirmModal = () => {
    if(checkPendingGoods.modalSouurce === 'audit'){
      validateFieldsAndScroll((errors,values) => {
        if(!values.failedReason && values.productState==='6'){
          message.destroy()
          message.error('请输入审核不通过原因')
          return;
        }
        if(checkPendingGoods.chooseGoodsIds.length <= 0){
          message.destroy()
          message.error('请先选择商品')
          return;
        }
        let dataStr = checkPendingGoods.chooseGoodsKeys.join()
        dispatch({type:'checkPendingGoods/reviewStatusAll',payload:{productIds:dataStr,productState:values.productState,failedReason:values.failedReason}})
        .then((result) => {
          if(result.message === '成功'){
            message.success('审核成功')
            handleRefresh()
          }else{
            message.destroy()
            message.error(result.message)
          }
        })
      })
    }else dispatch({type:'checkPendingGoods/modalControll'})
  }

  return (
    <Modal
      visible={checkPendingGoods.visible}
      onCancel={() => {dispatch({type:'checkPendingGoods/modalControll'})}}
      okText='确定'
      title={checkPendingGoods.modalSouurce === 'audit'?"批量审核":'备注'}
      cancelText={'取消'}
      maskClosable={false}
      width={600}
      onOk={() => confirmModal()}
    >
    {checkPendingGoods.modalSouurce === 'audit' ?
      <Form layout="horizontal">
        <FormItem label="审核结果" {...formItemLayout} >
          {getFieldDecorator('productState', {
            initialValue: '11',
          })(
            <RadioGroup onChange={() => {dispatch({type:'checkPendingGoods/changeFailReason'})}}>
              <Radio value={'11'}>审核通过</Radio>
              <Radio value={'6'}>审核未通过</Radio>
            </RadioGroup>
          )}
        </FormItem>


        
        {
          checkPendingGoods.ifShowFailReason?<FormItem label="审核不通过备注" {...formItemLayout} >
            {getFieldDecorator('failedReason', {
              initialValue: '',
            })(
              <TextArea />
            )}
          </FormItem>:''
        }
        
      </Form> :
        <FormItem label="审核不通过原因：" {...formItemLayout} >
          <span>{checkPendingGoods.failedReason}</span>
        </FormItem>
      }
    </Modal>
  );
    
}

goodsModal.propTypes = {
  form: PropTypes.object,
  index: PropTypes.object,
}

//将model中的state的数据绑定到组件;
export default connect(({checkPendingGoods,loading})=>({checkPendingGoods,loading}))(Form.create()(goodsModal));