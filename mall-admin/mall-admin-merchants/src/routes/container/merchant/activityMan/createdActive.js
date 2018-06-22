"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
   import { routerRedux } from 'dva/router'
import { Breadcrumb, Form, Input, Upload, Icon, Button, Select, message } from 'antd';
import queryString from 'query-string';
import config from '@/utils/config.js'
import styles from './createdActive.less'
//商品打包管理
// const confirm = Modal.confirm;
const Option = Select.Option;
// const RadioGroup = Radio.Group;
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

  const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 7 },
  };

	// 选择商品下拉框操作事件
	function handleChange(value) {
		validateFieldsAndScroll((errors,values) => {
			dispatch({type:'createdActiveFn/getPackGoodslist',value,values})
		
		})
	}

//上传按钮
const uploadImgButton = (  
	<div>
		<Icon type="plus" />
		<div className="ant-upload-text">上传</div>
	</div>
);
	//点击上传图片操作事件
	const handleChangeUp = (info,source,record) => { 
		if (info.file.status === 'uploading') {
			dispatch({type:'createdActiveFn/imgLoadding',payload:{imgLoading:true}})
			return;
		}
		if (info.file.status === 'done') {
			if(source === 'active')	//活动图
				dispatch({type:'createdActiveFn/activeImgUp',imgUrl:info.file.response.data.httpsPath}) 
			else{	//商品图
				let goodsList = createdActiveFn.goodsList;
				for(let i = 0; i < goodsList.length; i++){
					if(record.id === goodsList[i].id){
						goodsList[i].imageUrl = info.file.response.data.httpsPath
					}
				}
				dispatch({type:'createdActiveFn/goodsImgUp',goodsList}) 
			}
		}
	}
	const saveActive = () => {
		validateFieldsAndScroll((errors,values) => {
			if(errors){
				
			}else{
				let data = {
					type:1,	//打包类型
					keyword:values.keyword,
					imageUrl:createdActiveFn.imgUrl,
					describe:values.describe,
					id:createdActiveFn.id?createdActiveFn.id:"",
					infos:[],
					name:values.name,
				}
				for(let i = 0; i < createdActiveFn.goodsList.length; i++){
					const item = createdActiveFn.goodsList[i];
					const name = 'goods' + item.id
					data.infos.push({
						"id":item.id, 
						"name": values[name], 
						"url": item.imageUrl, 
					})
				}
				data.infos = JSON.stringify(data.infos);
				if(createdActiveFn.id){  //编辑
					//data.spreadEventId = createdActiveFn.spreadEventId;
					//data.packId = createdActiveFn.packId;
					//console.log(data);
					dispatch({type:'createdActiveFn/saveMessage',data})
					.then((result) => {
						if(result.message === '成功'){
							message.success('保存成功');
							dispatch(routerRedux.push({
								pathname:'/merchant/activityListMan'
							}))
						}else{
							message.error(result.message)
						}
					});
				}else{  //新建
					data.packId = createdActiveFn.packId;
          dispatch({type:'createdActiveFn/saveMessage',data})
					.then((result) => {
						if(result.message === '成功'){
							message.success('保存成功');
							dispatch(routerRedux.push({
								pathname:'/merchant/activityListMan'
							}))
						}else{
							message.error(result.message)
						}
					});
				} 
				
			}
		})
	}

  return (
    <div>
      <div className='formBody' style={{height: 40}}>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>运营管理</Breadcrumb.Item>
          <Breadcrumb.Item>活动管理</Breadcrumb.Item>
          <Breadcrumb.Item>创建活动</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form layout="vertical">
				<FormItem {...formItemLayout} label="活动名称">
					{getFieldDecorator('name', {
						initialValue:createdActiveFn.name,
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
					{getFieldDecorator('keyword', {
						initialValue:createdActiveFn.keyword,
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
						onChange={(info) => handleChangeUp(info,'active')}
					>
						{createdActiveFn.imgUrl ? <img style={{maxWidth:160,maxHeight:160}} src={createdActiveFn.imgUrl} alt="avatar" /> : uploadImgButton}
					</Upload>
					</div>
				</FormItem>
				<FormItem {...formItemLayout} label="活动文案">
					{getFieldDecorator('describe', {
						initialValue:createdActiveFn.describe,
						validateTrigger: 'onBlur'
					})(<TextArea rows={4} />)}
				</FormItem>
				{
					queryString.parse(location.search).spreadEventId?'':
					<FormItem {...formItemLayout} label="选择商品包">
						{getFieldDecorator('selGoodPack', {
							initialValue:createdActiveFn.packId,
							rules: [{ required: true, message: '请选择商品包!' }],
						})(<Select
								style={{ width: '100%' }}
								placeholder="请选择商品包"
								initialValue={['a10', 'c12']}
								onChange={handleChange}
							>
								{createdActiveFn.goodsPackList.map((item,index) => {
									return <Option key={item.id}>{item.name}</Option>
								})}
							</Select>)}
					</FormItem>
				}
				<div className={styles.partLine}>选中的打包商品</div>
				<div className={styles.selectedBox}>
					<ul>
					{  
						createdActiveFn.goodsList.map(function(item,index){  
							return <li className={styles.selGoodsLis} key={index}>
								<span style={{marginRight:20}} className={styles.selGoodsName + ' ' + styles.fl + ' ' + styles.marginRight20}>
								{getFieldDecorator('goods'+item.id, {
									initialValue: item.name,
									rules: [{ required: true, message: '请选择商品包!' }],
								})(<Input />)}
								</span>
								<Upload
									name="imageFile"
									className="avatar-uploader"
									showUploadList={false}
									action={config.api.uploadImg}
									onChange={(info) => handleChangeUp(info,'goods',item)}
								>
									{item.imageUrl ? <img src={item.imageUrl} style={{maxWigth:100,maxHeight:100}} alt="avatar" /> : uploadImgButton}
								</Upload>
								<span style={{marginLeft:20}}>
									<span >原价：{item.primalPrice}　　</span>
									<span>进货价：{item.stockPrice}　　</span>
									{createdActiveFn.spreadEventId?'':<span>打包价：{item.packPrice}</span>}
								</span>
								
							</li>  
						})  
					}  
					</ul>
				</div>
			</Form>
			<div style={{marginLeft:180}} className={styles.goodsPackSaveBtn}>
				<Button type="primary" onClick={() => saveActive()}>保存</Button>
				<Button onClick={()=>dispatch(routerRedux.push({
						  pathname:'/merchant/activityListMan'
						}))} >取消</Button>
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