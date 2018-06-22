'use strict';
/**
 * 首页轮播图设置
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import queryString from 'query-string'
import { routerRedux } from 'dva/router'
import {Button,Switch,Input,Modal,message, Form} from 'antd';
import DataTabel from '@/components/DataTabel';
import styles from './index.less';
import BannerDialog from './bannerModal'

const confirm = Modal.confirm;
//渲染数据
const translateBanner = function(status){
  switch(status){
  	case '0':
  	  return "未上线";
  	case '1':
  	  return "进行中"
    case '2':
      return "已上线"
    case '3':
      return "已结束"
    case '4':
      return "已下线"
    default:
      return false
   }
};
const translateStatus = function(status){
  switch(status){
  	case '0':
  	  return "未发布";
  	case '1':
  	  return "已发布"
  	case '5':
      return "有更新"
    default:
      return "状态未知"
  }
}

const Banner = ({banner,loading,dispatch,location,form: {
  getFieldDecorator,
  validateFieldsAndScroll,
}})=>{
  const editSort = function(){
  	dispatch({type:"banner/editSort"})
  }
  //table格式
const columns = [
  {
    title:"排序",
    dataIndex:"banner_sore",
    key:"id",
    render:(text,record)=>(
	  <span>{record.id?getFieldDecorator('banner_sore'+record.id, {
        	initialValue: text,
        	rules: [{ required: true, message:'请输入正确的排序！', pattern:/^[0-9]*$/ }],
      	})(
        	<Input style={{width:100}}  disabled={!banner.editDisable}/>
      	):''
      }</span>
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
    key:"start_time",
    render:(record)=>(
      <span>{record.start_time} - {record.end_time}</span>
  	)
  },{
  	title:"开关",
  	dataIndex:"switch_status",
  	key:"switch_status",
  	render:(status,record)=>(
      <span>{record.id?<Switch onChange={(status) => swithOption(record.id,status)} defaultChecked={status==='1'?true:false}/>:''}</span>
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
  	dataIndex:"push_status",
  	key:"push_status",
  	render:(text,record,index)=>(
      <span>{record.switch_status === '1' ? translateStatus(text) : ''}</span>
    )
  },{
  	title:"操作",
  	render:(text, record, index)=>(
      <a onClick={()=>dispatch({type:'banner/showModal',bannerDetail:record})}>设置</a>
  	)
  }
]; 

  const { pathname } = location
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...newQuery,
      }),
    }))
  }
  const modalProps = {
    location
  }
  const swithOption = (id,status) => { //更改开关状态
    dispatch({type:'banner/changeStatus',payload:{id:id,switchStatus:status?1:0}})
    .then((result) => {
      if(result.message !== '成功'){
        message.destroy()
        message.error(result.message);
        return;
      }
      message.success("修改成功！",1,handleRefresh())
    })
  }
  const checkMessage = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        message.destroy();
        message.error("请输入正确的排序！")
      }else{
        let data = {}
        let bannerInfo = [];
        const fieldsValue = values;
        for(let key in values){
          let flag = true;
          for(let key1 in fieldsValue){
            if(key !== key1 && Number(values[key]) === Number(fieldsValue[key1])) flag = false
          }
          if(!flag) {
            message.destroy();
            message.error("排序号不可重复")
            return;
          }
          bannerInfo.push({
            id:key.split("banner_sore")[1],
            bannerSore:values[key]
          })
        }
        data.bannerInfo = bannerInfo;
        dispatch({type:'banner/editorSort',data})
        .then((result) => {
          if(result.message !== '成功'){
            message.error(result.message)
            return;
          }
          dispatch({type:'banner/clearStatus'})
          message.success("保存成功！");
          handleRefresh()
        })
      }
    })
  }
  const confirmPublish = () => {
    confirm({
      title: '您确定要发布吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
        let bannerIds = '';
        const dataSource = banner.dataSource;
        dataSource.map((item,index) => (
          <span>{item.id ? index>0 ? bannerIds += ","+item.id : bannerIds += item.id : ''}</span>
        ))
        dispatch({type:'banner/releaseBanner',bannerIds})
        .then((result) => {
          if(result.message !== '成功'){
            message.error(result.message);
            return;
          }
          message.success("发布成功！")
          handleRefresh()
        })
      },
      onCancel() {
        
      },
    });
  }
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"id",  //key值
    dataSource:banner.dataSource,  //tabel数据源
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:true,  //是否需要分页
  }
  return (
  	<div>
  	  <div style={{marginBottom:12}}>
        <Button type="primary" onClick={()=>confirmPublish()} className={styles.right}>发布</Button>
        {
          banner.editDisable ? 
          <Button onClick={checkMessage} type="primary" className={styles.right} style={{marginRight:20}}>保存</Button>:
          <Button onClick={editSort} type="primary" className={styles.right} style={{marginRight:20}}>编辑排序</Button>
        }
  	    <div className={styles.clear}></div>
  	  </div>   
      <DataTabel {...tabelProps} />  
      {banner.visible?<BannerDialog {...modalProps} />:''}
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