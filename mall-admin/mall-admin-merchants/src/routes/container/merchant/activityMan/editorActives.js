"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
// import { routerRedux } from 'dva/router'
import { Breadcrumb, Form, Input, Upload, Icon, Button, Radio, Select  } from 'antd';
// import queryString from 'query-string';
import config from '@/utils/config.js'
import styles from './createdActive.less'
//商品打包管理-编辑活动
// const confirm = Modal.confirm;
const Option = Select.Option;
const RadioGroup = Radio.Group;
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

// 选择商品下拉框操作事件
const selGoodsLis = [];// 初始化已选择的商品数据的下标
function handleChange(value) {
	selGoodsLis.push({value})
	console.log(value)
	console.log(`selected ${value}`);//返回的是已选中的列表的key值
	value.map((item) => {
		console.log(item)
		return selGoodsLis.push(createdActiveFn.goodsList[item])
	})
	console.log(selGoodsLis)
}

//上传按钮
const uploadImgButton = (  
	<div>
		<Icon type="plus" />
		<div className="ant-upload-text">上传</div>
	</div>
);
//点击上传图片操作事件
const handleChangeUp = (info) => { 
	console.log(info)
	if (info.file.status === 'uploading') {
		dispatch({type:'createdActiveFn/imgLoadding',payload:{imgLoading:true}})
		return;
	}
	if (info.file.status === 'done') {
		dispatch({type:'createdActiveFn/imgUploadDown',payload:{imgLoading:false,imgUrl:info.file.response.data.httpsPath}}) 
	}
}
  return (
    <div>
      <div className='formBody' style={{height: 40}}>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>运营管理</Breadcrumb.Item>
          <Breadcrumb.Item>活动管理</Breadcrumb.Item>
          <Breadcrumb.Item>编辑活动</Breadcrumb.Item>
        </Breadcrumb>
      </div>
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
					<Upload
						name="imageFile"
						listType="picture-card"
						className="avatar-uploader"
						showUploadList={false}
						action={config.api.uploadImg}
						onChange={(info) => handleChangeUp(info)}
					>
						{createdActiveFn.imgUrl ? <img style={{maxWidth:160,maxHeight:160}} src={createdActiveFn.imgUrl} alt="avatar" /> : uploadImgButton}
					</Upload>
					</div>
				</FormItem>
				<FormItem {...formItemLayout} label="活动文案">
					{getFieldDecorator('activeCopywriting', {
						validateTrigger: 'onBlur'
					})(<TextArea rows={4} />)}
				</FormItem>
				<FormItem {...formItemLayout} label="可否用优惠券">
					{getFieldDecorator('activeUseCoup', {})(
						<RadioGroup name="radiogroup" initialValue={1}>
							<Radio value={1}>不可用</Radio>
							<Radio value={2}>可用</Radio>
						</RadioGroup>)}
				</FormItem>
				<FormItem {...formItemLayout} label="选择商品包">
					{getFieldDecorator('selGoodPack', {
						rules: [{ required: true, message: '请选择商品包!' }],
					})(<Select
							mode="multiple"
							style={{ width: '100%' }}
							placeholder="请选择商品包"
							initialValue={['a10', 'c12']}
							onChange={handleChange}
						>
							{[1,3,4,5,9].map((item,index) => {
								return <Option key={index}>{item}</Option>
							})}
						</Select>)}
				</FormItem>
				<div className={styles.partLine}>选中的打包商品</div>
				<div className={styles.selectedBox}>
					<ul>
					{  
						[1,2,3,4,5].map(function(username,index){  
								return <li className={styles.selGoodsLis} key={index}>
									<span className={styles.selGoodsName + ' ' + styles.fl + ' ' + styles.marginRight20}>{username}爱奇艺VIP　　</span>
									<Upload
										name="imageFile"
										listType="picture-card"
										className="avatar-uploader"
										showUploadList={false}
										action={config.api.uploadImg}
										onChange={(info) => handleChangeUp(info)}
									>
									</Upload>
									<span>原价：{username}66666积分　　</span>
									<span>进货价：{username}66666666积分　　</span>
									<span>打包价：{username}0000000000积分</span>
								</li>  
						})  
					}  
					</ul>
				</div>
			</Form>
			<div className={styles.goodsPackSaveBtn}>
				<Button type="primary">保存</Button>
				<Button>取消</Button>
			</div>
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