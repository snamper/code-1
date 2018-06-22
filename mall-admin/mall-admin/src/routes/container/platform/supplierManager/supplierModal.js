import React from 'react';
import { Modal, Form, Input, Radio ,Checkbox   } from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'dva';

const CheckboxGroup = Checkbox.Group;
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
  const plainOptions = ['android', 'ios'];
  const defaultCheckedList = ['android', 'ios'];
  let showPlantType = '0'
  const showPlantFn = (data) => {
  	switch (data) {
  		case 2: ['ios']
  		  return ['ios']
  		  break;
  		case 1:
  		  return ['android']
  		  break;
  		default:
  		  return ['android', 'ios']
  		  break;
  	}
  }
  const onChange = (values) => {
//	console.log(values)
		
  }
  const checkMessage = () => {
    validateFieldsAndScroll((errors, values) => {
      console.log(values)
      if (values.showPlant.length > 1){
				showPlantType = '0'
			}else{
				values.showPlant.map( (item) => {
	//		  console.log(item)
	        if(item == "ios") {
	        	showPlantType = '2'
	        }else{
	        	showPlantType = '1'
	        }
	  	  })
			}
      if (errors) {
        console.log(errors)
      }else{
        if(supplierModel.isUpdate) {
          const dataCreat = {
            merchantId:supplierModel.currentItem.id,
            shortName:values.short_name,
            fullName:supplierModel.currentItem.full_name,
            introduce:values.introduce,
            phoneType:showPlantType
          }
          dispatch({type:'supplierModel/queryCreated',payload:dataCreat}).then( () => { dispatch({type:'supplierModel/hideDialog'})}  )
        } else {
          const dataNew = {
            shortName:values.short_name,
            fullName:values.full_name,
            deliverWay:values.deliverWay,
            introduce:values.introduce,
            phoneType:showPlantType
          }
          dispatch({type:'supplierModel/queryNew',payload:dataNew}).then( () => { dispatch({type:'supplierModel/hideDialog'})}  )
        }
      }
    })
  }
    return (
      <Modal 
            visible={supplierModel.visible}
            onCancel={() => {dispatch({type:'supplierModel/hideDialog'})}}
            okText={'确定'}
            cancelText={'取消'}
            title={supplierModel.isUpdate?'供应商编辑':'新增供应商'}
            onOk={() => checkMessage()}
        >
          <Form layout="horizontal">
            <FormItem label="发货方式" {...formItemLayout}>
              {supplierModel.isUpdate?<span>{supplierModel.currentItem.sales_way  === "1" ? '供货商发货':'平台发货'}</span>:getFieldDecorator('deliverWay', {
                    initialValue: 1,
                })(
                  <RadioGroup>
                    <Radio value={1}>供货商发货</Radio>
                    <Radio value={2}>平台发货</Radio>
                  </RadioGroup>
              )}
            </FormItem> 
            <FormItem label="选择平台" {...formItemLayout}>
            	{getFieldDecorator('showPlant', {
                    initialValue: showPlantFn(supplierModel.currentItem.phone_type),
                    rules: [{required:true, message: '请选择展示平台'}],
                })(<CheckboxGroup options={plainOptions} onChange={onChange} />)}
            </FormItem> 
            
            <FormItem label="供应商简称" {...formItemLayout} hasFeedback>
              {getFieldDecorator('short_name', {
                    initialValue: supplierModel.currentItem.short_name,
                    rules: [{required:true, max:8, message: '请输入8个字以内供应商简称'}],
                })(
                  <Input autoComplete="off" />
              )}
            </FormItem> 
            <FormItem label="供应商全称" {...formItemLayout} hasFeedback>
              {supplierModel.isUpdate?<span>{supplierModel.currentItem.full_name}</span>:getFieldDecorator('full_name', {
                    initialValue: '',
                    rules: [{required:true, max:15, message: '请输入15个字以内供应商全称'}],
                })(
                  <Input autoComplete="off" />
              )}
            </FormItem>
            <FormItem label="供应商描述" {...formItemLayout} >
              {getFieldDecorator('introduce', {
                    initialValue: supplierModel.currentItem.introduce,
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