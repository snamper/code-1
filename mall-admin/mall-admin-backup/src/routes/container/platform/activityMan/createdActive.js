"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
// import { routerRedux } from 'dva/router'
import { Breadcrumb, Form, Input, Upload, Icon, Button, InputNumber, Tabs } from 'antd';
// import queryString from 'query-string';
import styles from './createdActive.less'
//商品打包管理
// const confirm = Modal.confirm;
const TabPane = Tabs.TabPane; 
const FormItem = Form.Item;
const { TextArea } = Input
const addGoodsPackItem = ({
  createdActiveFn,
  loading,
  dispatch, 
  location,  
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldsValue
  },
})=>{
  // const { pathname } = location;
  // const handleRefresh = (newQuery) => {
  // 	console.log(pathname)
  //   dispatch(routerRedux.push({
  //     pathname,
  //     search: queryString.stringify({
  //       ...newQuery,
  //     }),
  //   }))
  // }
  // const modalProps = {
  //   currentItem:packList.currentItem,
  //   handleRefresh:handleRefresh
  // }
  const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 7 },
  };
//const formItemLayoutSmall = {
//  labelCol: { span: 3 },
//  wrapperCol: { span: 3 },
//};
//const showPackGoodsDialog = (source,id) => {//新增推荐商品
//  dispatch({type:'createdActiveFn/showSelPackGoods',payload:{}}).then((result) => {
//    
//    console.log(result)
//  })
//};
  return (
    <div>
      <div className='formBody' style={{height: 40}}>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>运营管理</Breadcrumb.Item>
          <Breadcrumb.Item>活动管理</Breadcrumb.Item>
          <Breadcrumb.Item>创建活动</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Tabs type="card">
        <TabPane tab="活动" key="1">
          <Tabs type="card">
             <TabPane tab="打包活动" key="11">
                <Form layout="vertical">
			        <FormItem {...formItemLayout} label="活动名称">
			          {getFieldDecorator('goodPackName', {
			            rules: [{ 
			              required: true, 
			              whitespace: true,
			              max:50,
			              message: '请输入50字以内的活动名称!'
			            }],
			            validateTrigger: 'onBlur'
			          })(<Input placeholder="请输入50字以内的活动名称"/>)}
			        </FormItem>
			        <FormItem {...formItemLayout} label="活动关键字">
			          {getFieldDecorator('activeKeyword', {
			            rules: [{ 
			              required: true, 
			              whitespace: true,
			              max:6,
			              message: '请输入6字以内的活动关键字!'
			            }],
			            validateTrigger: 'onBlur'
			          })(<Input placeholder="请输入6字以内的活动关键字"/>)}
			        </FormItem>
			        <FormItem {...formItemLayout} label="活动图">
			          <div className="dropbox">
			            {getFieldDecorator('dragger', {
			              valuePropName: 'fileList',
			              getValueFromEvent: this.normFile,
			              rules: [{ required: false}]
			            })(
			              <Upload.Dragger name="files" action="/upload.do">
			                <p className="ant-upload-drag-icon">
			                  <Icon type="inbox" />
			                </p>
			                <p className="ant-upload-text">点击上传活动图</p>
			                <p className="ant-upload-hint">请上传图片格式为jpg、jpeg、png（限10M以内大小）</p>
			              </Upload.Dragger>
			            )}
			          </div>
			        </FormItem>
			        <FormItem {...formItemLayout} label="活动文案">
			          {getFieldDecorator('activeCopywriting', {
			            validateTrigger: 'onBlur'
			          })(<TextArea rows={4} />)}
			        </FormItem>
			      </Form>
			      <div className={styles.goodsPackSaveBtn}>
			          <Button type="primary">保存</Button>
			          <Button>取消</Button>
			        </div>
             </TabPane>
             <TabPane tab="类王者荣耀活动" key="12">
               <Form layout="vertical">
			        <FormItem {...formItemLayout} label="活动名称">
			          {getFieldDecorator('activeName', {
			            rules: [{ 
			              required: true, 
			              whitespace: true,
			              max:50,
			              message: '请输入50字以内的活动名称!'
			            }],
			            validateTrigger: 'onBlur'
			          })(<Input placeholder="请输入50字以内的活动名称"/>)}
			        </FormItem>
			        <FormItem {...formItemLayout} label="邀请用户获取积分">
			          {getFieldDecorator('activeGetPoint', {
			            rules: [{ 
			              required: true, 
			              whitespace: true,
			              message: '请输入不小于0的数字!'
			            }],
			            validateTrigger: 'onBlur'
			          })( <InputNumber style={{width: 473, height: 32}} min={1} max={1000000} placeholder="请输入邀请用户获取积分"/>)}
			        </FormItem>
			        <FormItem {...formItemLayout} label="邀请用户数量限制">
			          {getFieldDecorator('activeLimit', {
			            rules: [{
			              whitespace: true,
			              min:1,
			              max:5,
			              message: '请输入不小于0的数字!'
			            }],
			            validateTrigger: 'onBlur'
			          })(<InputNumber style={{width: 473, height: 32}} min={1} max={10000} placeholder="请输入邀请用户数量限制"/>)}
			        </FormItem>
			   </Form>
			   <div className={styles.goodsPackSaveBtn}>
		          <Button type="primary">保存</Button>
		          <Button>取消</Button>
		        </div>
             </TabPane>
          </Tabs>
        </TabPane>
        <TabPane tab="渠道" key="2">
  		  <Form layout="vertical">
  		  <div style={{height:40}}>推广渠道信息</div>
	        <FormItem {...formItemLayout} label="渠道名称">
	          {getFieldDecorator('activeName', {
	            rules: [{ 
	              required: true, 
	              whitespace: true,
	              max:10,
	              message: '请输入10字以内的渠道名称!'
	            }],
	            validateTrigger: 'onBlur'
	          })(<Input placeholder="请输入10字以内的渠道名称"/>)}
	        </FormItem>
	        <FormItem {...formItemLayout} label="联系人">
	          {getFieldDecorator('activeGetPoint', {
	            rules: [{ 
	              required: true, 
	              whitespace: true,
	              max:5,
	              message: '请输入10字以内的渠道名称!'
	            }],
	            validateTrigger: 'onBlur'
	          })( <Input placeholder="请输入5字以内的联系人名称"/>)}
	        </FormItem>
	        <FormItem {...formItemLayout} label="联系电话">
	          {getFieldDecorator('linkPhone', {
                    rules: [{required:true, pattern:/^1(3|4|5|7|8|6|9)\d{9}$/, message: '请输入正确的联系电话'}],
                })(
                  <Input autoComplete="off" />
              )}
	        </FormItem>
	        
	        <div style={{height:40}}>渠道方收款信息</div>
  		</Form>
        </TabPane>
      </Tabs>
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({createdActiveFn,loading})=>({createdActiveFn,loading}))(Form.create()(addGoodsPackItem));
//类型检测
addGoodsPackItem.protoTypes = {
  createdActiveFn:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};