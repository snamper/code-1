"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { Breadcrumb, Form, Upload, Icon, Button, Checkbox, Modal, message, InputNumber } from 'antd';
import queryString from 'query-string';
import config from '@/utils/config'
// import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import styles from './activityaway.less'
//活动管理-设置活动上架
const confirm = Modal.confirm;
const FormItem = Form.Item;
const openUrl = function(url){
	// window.location.reload();
	window.location.href= `/#${url}`;
}
// const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const setPutaways = ({
  setActivityPutFn,
  loading,
  dispatch, 
  location,  
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
  },
})=>{
    //  const handleRefresh = (pathname) => {
    //    dispatch(routerRedux.push({
    //      pathname
    //    }))
    //  }
  // function handleChange(value) {
  //   let activeDetail = setActivityPutFn.activeDetail;
	//   activeDetail.activeId = value
	//   dispatch({type:'setActivityPutFn/changeData',activeDetail})
  // }
  const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 7 },
  };
  const formItemLayoutBig = {
    labelCol: { span: 2 },
    wrapperCol: { span: 3 },
  };
  const uploadMainImgButton = ( //主图
    <div>
      <Icon type={setActivityPutFn.loading && setActivityPutFn.mainImgUrl ? 'loading' : 'plus'} />
      <div className="ant-upload-text">点击上传</div>
    </div>
  )
  const changeListImg = (info,source) => { 
    //console.log(info)
    if (info.file.status === 'uploading') {
      dispatch({type:'addGoodsModel/imgUpload',payload:{loading:true}})
      return;
    }
    if (info.file.status === 'done') {
    	let activeDetail = setActivityPutFn.activeDetail;
    	if(source === 'noticeImg'){ //首页通知栏
    		activeDetail.noticeImg = info.file.response.data.httpsPath
    	}else if(source === 'leftRightImg'){ //一左一右图
    		activeDetail.leftRightImg = info.file.response.data.httpsPath
    	}else if(source === 'threeColumnImg'){ //三栏图
    		activeDetail.threeColumnImg = info.file.response.data.httpsPath
    	}
    	dispatch({type:'setActivityPutFn/changeData',activeDetail})
    }
  }
  const options = [
	  { label: '首页', value: 'HOMEPAGE' }
	  // { label: '商城', value: 'SHOPPINGMALL' }
	];
	const changePosition = (checkedValues) => {
		let activeDetail = setActivityPutFn.activeDetail;
		// console.log(checkedValues.join())
		activeDetail.showPosition = checkedValues.slice(1).toString();
		// activeDetail.showPosition = checkedValues.join();
		
	  dispatch({type:'setActivityPutFn/changeData',activeDetail})
	}
	const saveMessage = (source) => {	//保存
		validateFieldsAndScroll((errors,values) => {
			if(errors){
				// console.log(errors);
			}else{
				confirm({
					title: source === 'save'?'确定要保存吗?':'确定要上架吗?',
					okText:'确定',
          cancelText:'取消',
			    onOk() {
			    	let data = {
			    		activeId:setActivityPutFn.activeDetail.activeId?setActivityPutFn.activeDetail.activeId:queryString.parse(location.search).activeId,
			    		noticeImg:setActivityPutFn.activeDetail.noticeImg,
			    		leftRightImg:setActivityPutFn.activeDetail.leftRightImg,
			    		threeColumnImg:setActivityPutFn.activeDetail.threeColumnImg,
			    		orderNum:values.orderNum,
			    		showPosition:"HOMEPAGE"
						}
			    	if(setActivityPutFn.id) data.id = setActivityPutFn.id;
			      dispatch({type:setActivityPutFn.id?'setActivityPutFn/UpdateMessage':'setActivityPutFn/saveMessage',data}).then((result) => {
              // console.log(result);
			      	if(result.message === '成功'){
			      		if(source === 'save') {
			      			message.success("保存成功")
			      			openUrl('/merchant/activityPutaway')
			      		}else{
			      			dispatch({type:'setActivityPutFn/putAway',id:setActivityPutFn.id}).then((result) => {
			      				if(result.message === '成功'){
			      					openUrl('/merchant/activityPutaway')
			      				}else{
			      					message.destroy()
			      					message.error(result.message)
			      					return;
			      				}
			      			})
			      		}
			      	}else{
			      		message.destroy()
			      		message.error(result.message)
			      	}
			      })
			    }
			  });
			}
		})
		
	}
	
	//返回按钮操作  返回列表页
  const backGoodsPackMan = () => {
    dispatch(routerRedux.push({//跳转到首页列表
      pathname:'/merchant/activityPutaway'
    }))
  }
  return (
    <div>
      <div className='formBody' style={{height: 40}}>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>活动管理</Breadcrumb.Item>
          <Breadcrumb.Item>活动上架管理</Breadcrumb.Item>
          <Breadcrumb.Item>设置活动上架</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form layout="vertical">
        <FormItem {...formItemLayout} label="活动名称:">
          <span>{queryString.parse(location.search).name}</span>
        </FormItem>
        <FormItem {...formItemLayout} label="通栏活动图:" required={true}>
          <div style={{width:'70%',marginLeft:'15%'}}>
						<div style={{float:'left',marginRight:'10'}}>
						{getFieldDecorator('noticeImg', {
							rules:setActivityPutFn.activeDetail.noticeImg?"":[{ required: true, message: '请上传商品包图片!' }],
						})(
              <Upload
							name="imageFile"
							listType="picture-card"
							className="avatar-uploader"
							showUploadList={false}
							action={config.api.uploadImg}
							onChange={(info) => changeListImg(info,'noticeImg')}
						>
							{setActivityPutFn.activeDetail.noticeImg ? <img src={setActivityPutFn.activeDetail.noticeImg} style={{maxWidth:160,maxHeight:160}} alt="avatar" /> : uploadMainImgButton}
						</Upload>
						)}	            
	          </div>
	        </div>
        </FormItem>
        <FormItem {...formItemLayout} label="一左一右活动图:" required={true}>
          <div style={{width:'100%',marginLeft:'15%'}}>
						<div style={{float:'left',marginRight:'10'}}>
						{getFieldDecorator('leftRightImg', {
							rules:setActivityPutFn.activeDetail.leftRightImg?"":[{ required: true, message: '请上传商品包图片!' }],
						})(
              <Upload
							name="imageFile"
							listType="picture-card"
							className="avatar-uploader"
							showUploadList={false}
							action={config.api.uploadImg}
							onChange={(info) => changeListImg(info,'leftRightImg')}
						>
							{setActivityPutFn.activeDetail.leftRightImg ? <img src={setActivityPutFn.activeDetail.leftRightImg} style={{maxWidth:160,maxHeight:160}} alt="avatar" /> : uploadMainImgButton}
						</Upload>
						)}
	          </div>
	        </div>
        </FormItem>
        <FormItem {...formItemLayout} label="三栏活动图:" required={true}>
          <div style={{width:'70%',marginLeft:'15%'}}>
						<div style={{float:'left',marginRight:'10'}}>
						{getFieldDecorator('threeColumnImg', {
							rules:setActivityPutFn.activeDetail.threeColumnImg?"":[{ required: true, message: '请上传商品包图片!' }],
						})(
              <Upload
							name="imageFile"
							listType="picture-card"
							className="avatar-uploader"
							showUploadList={false}
							action={config.api.uploadImg}
							onChange={(info) => changeListImg(info,'threeColumnImg')}
						>
							{setActivityPutFn.activeDetail.threeColumnImg ? <img src={setActivityPutFn.activeDetail.threeColumnImg} style={{maxWidth:160,maxHeight:160}} alt="avatar" /> : uploadMainImgButton}
						</Upload>
						)}            
	          </div>
	        </div>
        </FormItem>
				<FormItem {...formItemLayoutBig} label="排序号:">
          {getFieldDecorator('orderNum', {
          	initialValue:setActivityPutFn.activeDetail.orderNum ? setActivityPutFn.activeDetail.orderNum: "",
            rules: setActivityPutFn.activeDetail.orderNum?"":[{ 
              required: true, 
              whitespace: true,
              message:'只能输入数字类型'
            }],
            validateTrigger: 'onBlur'
          })(<InputNumber precision={0} min={1} placeholder="请输入排序号" />)}
        </FormItem>
				<FormItem {...formItemLayout} label="显示页面:" required={true} >
				<CheckboxGroup options={options} defaultValue={["HOMEPAGE"]} disabled={true} onChange={changePosition} />
          {/**--<CheckboxGroup options={options} defaultValue={[setActivityPutFn.activeDetail.showPosition]}  onChange={changePosition} />**/}
        </FormItem>
        <div className={styles.setActivityFnBtn}>
					<Button type="primary" onClick={() => saveMessage('save')}>保存</Button>
					{queryString.parse(location.search).id?<Button type="primary" onClick={() => saveMessage('putAway')}>上架</Button>:''}
          <Button onClick={() => backGoodsPackMan()}>取消</Button>
        </div>
      </Form>  
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({setActivityPutFn,loading})=>({setActivityPutFn,loading}))(Form.create()(setPutaways));
//类型检测
setPutaways.protoTypes = {
  setActivityPutFn:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};