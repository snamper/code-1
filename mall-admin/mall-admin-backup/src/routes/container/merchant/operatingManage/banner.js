'use strict';
/**
 * 首页轮播图设置
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import {DatePicker,Table,Button,Switch,Input,Modal,Form,Upload,Icon,Col} from 'antd';
import styles from './index.less';

const FormItem = Form.Item; 
//渲染数据
const dataSource = [];
const bannerData = {
  id:"默认",
  img_url:"https://afp.alicdn.com/afp-creative/creative/u124884735/d935c45d3b10f359a0319fa50b895e27.jpg",
  title:"默认banner图",
  time:"",
  switch:1,
  status:0,
  online:0,
};
dataSource.push(bannerData);
for(let i=1;i<46;i++){
	dataSource.push({
	  id:`100${i}`,
	  img_url:"https://afp.alicdn.com/afp-creative/creative/u124884735/d935c45d3b10f359a0319fa50b895e27.jpg",
	  title:`标题${i}`,
	  time:`2018/05/${i}`,
	  switch:"0",
	  status:i,
	  online:i,
	})
}
//
const translateBanner = function(status){
  switch(status){
  	case 0:
  	  return "进行中";
  	case 1:
  	  return "未上线"
    case 2:
      return "已下线"
    case 3:
      return "已结束"
    default:
      return "状态未知"
   }
};
const translateStatus = function(status){
  switch(status){
  	case 0:
  	  return "已发布";
  	case 1:
  	  return "未发布"
    case 2:
      return "有更新"
    case 3:
      return "已发布"
    default:
      return "状态未知"
  }
}
const formItemLayout = {
  labelCol:{span:6},
  wrapperCol:{span:14},
}
const Banner = ({banner,loading,dispatch,location,form: {
  getFieldDecorator
}})=>{
  const editSort = function(){
  	dispatch({type:"banner/editSort"})
  }
  //table格式
const columns = [
  {
    title:"排序",
    dataIndex:"id",
    key:"id",
    render:(text)=>(
      <Input style={{width:100}} defaultValue={text} disabled={banner.editDisable}/>
    )
  },{
  	title:"图片",
  	dataIndex:"img_url",
  	key:"img_url",
  	render:(text)=>(
      <img src={text} style={{width:100}} alt="" />
  	),
  },{
  	title:"标题",
  	dataIndex:"title",
  	key:"title"
  },{
  	title:"上/下时间",
  	dataIndex:"time",
  	key:"time",
  },{
  	title:"开关",
  	dataIndex:"switch",
  	key:"switch",
  	render:(status)=>(
      <Switch defaultChecked={status===1?true:false}/>
  	)
  },{
  	title:"banner状态",
  	dataIndex:"status",
  	key:"status",
  	render:(status)=>(
      translateBanner(status)
  	)
  },{
  	title:"发布状态",
  	dataIndex:"online",
  	key:"online",
  	render:(status)=>(
      translateStatus(status)
    )
  },{
  	title:"操作",
  	render:(text)=>(
      <a onClick={(text)=>modalIn(text)}>设置</a>
  	)
  }
]; 
  const onOk = function(){  //异步保存操作
    dispatch({type:"banner/onOk"});
  }
  const onCancel = function(){
    dispatch({type:"banner/modal",payload:{visible:false}});
  }
  const modalIn = function(text){
  	dispatch({type:"banner/modal",payload:{visible:true}})
  }
  return (
  	<div>
  	  <div>
        <Button type="primary" className={styles.right}>发布</Button>
        <Button onClick={editSort} type="primary" className={styles.right} style={{marginRight:20}}>{banner.editText}</Button>
  	    <div className={styles.clear}></div>
  	  </div>     
      <Table
        dataSource={dataSource}
        rowKey="id"
        columns={columns}
        style={{marginTop:20}}
      >
      </Table> 
      <Modal 
        visible={banner.visible}
        onOk={onOk}
        onCancel={onCancel} 
        title="banner设置" >
        <Form layout="inline">
          <FormItem
            {...formItemLayout}
            label="标题："
            required={true}
            style={{width:"100%"}}
          >
            <Input />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="banner图："
            required={true}
            style={{width:"100%"}}
          >
            <Col span={16}><Input /></Col>
            <Col span={8} className={styles.right}>
              <Upload style={{paddingLeft:10}}>
                <Button>
                  <Icon type="upload" />上传
                </Button>
              </Upload>
            </Col>
          </FormItem>
          <img className={styles.uploadImg} alt="上传图片" src="https://afp.alicdn.com/afp-creative/creative/u124884735/d935c45d3b10f359a0319fa50b895e27.jpg"/>
          <FormItem
            {...formItemLayout}
            label="上下线时间："
            required={true}
            style={{width:"100%"}}
          >
            <Col span={10}>
              <DatePicker placeholder="起始日期" />
            </Col>
            <Col span={2} style={{padding:1}}>
              <span>至</span>
            </Col>
            <Col span={10}>
              <DatePicker placeholder="终止日期" />
            </Col> 
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="跳转链接："
            style={{width:"100%"}}
          >
            <Input />
          </FormItem>
        </Form>      
      </Modal>  
  	</div>  	
  )
};

export default connect(({banner,account,loading})=>({banner,account,loading}))(Form.create()(Banner));

//参数类型检测
Banner.protoTypes = {
  dispatch:PropTypes.object,
  loading:PropTypes.object,
  location:PropTypes.object,
  banner:PropTypes.object,
};