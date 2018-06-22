"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
   import { routerRedux } from 'dva/router'
import { Upload, Breadcrumb, Icon, Input, Form, message } from 'antd';
// import queryString from 'query-string';
import config from '@/utils/config'
import DataTabel from '@/components/DataTabel';//引入表格方法
import FilterItem from '@/components/FilterItem';//引入搜索方法
//活动管理-分享活动配置
// const confirm = Modal.confirm;
const shareActivity = ({
  shareActivityConfigModul,
  loading,
  dispatch, 
  location,
  form:{
  	getFieldDecorator,
  	validateFieldsAndScroll
  }
})=>{
	const { pathname } = location;
	const handleRefresh = () => { //当前页面刷新
		dispatch(routerRedux.push({
			pathname
		}))
	}
  const uploadMainImgButton = ( //分享图标
    <div>
      <Icon type={shareActivityConfigModul.uploadding ? 'loading' : 'plus'} />
    </div>
  )
  const changeListImg = (info,id) => { 
    if (info.file.status === 'uploading') {
      dispatch({type:'addGoodsModel/imgUpload',loading:true})
      return;
    }
    if (info.file.status === 'done') {
    	let dataSource = shareActivityConfigModul.dataSource
    	for(let i = 0; i < dataSource.length; i++){
    		const item = dataSource[i];
    		if(item.activeId === id){
    			item.shareImgUrl = info.file.response.data.httpsPath;
    		}
    	}
      dispatch({type:'shareActivityConfigModul/imgUpload',uploadding:false,dataSource})
    }
  }
  const confirmSave = (record,index) => {
  	validateFieldsAndScroll((errors,values) => {
			const mainTitle = 'mainTitle'+record.activeId;
			const subTitle = 'subTitle'+record.activeId;
			let data = {
				mainTitle:values[mainTitle],
				subTitle:values[subTitle],
				shareImgUrl:shareActivityConfigModul.dataSource[index].shareImgUrl
      }
      if(record.id){
        data.id = record.id;
        data.activeId = record.activeId;
      }else{
        data.activeId = record.activeId;
      }
			if((data.mainTitle&&data.mainTitle.length) > 50){
				message.destroy()
				message.error("分享标题不可超过50字")
				return
			}
			if(!data.shareImgUrl){
				message.destroy()
				message.error("分享图片不可为空")
				return
			}
			dispatch({type:'shareActivityConfigModul/setActive',data})
			.then((result) => {
				if(result.message === '成功'){
          if(result.code === 1){
            message.success('配置成功')
          }else{
            message.error(result.message)
          }
					handleRefresh()
				}else{
					message.destroy()
					message.error(result.message)
				}
			})
  		
  	})
  }
  const columns = [{
    title: '序号',
    dataIndex: 'activeId',
    key: 'activeId',
    render:(text,record,index) => (<span>{(shareActivityConfigModul.currentPage-1)*shareActivityConfigModul.pageSize+index+1}</span>)
  }, {
    title: '活动名称',
    dataIndex: 'spreadName',
    key: 'spreadName',
    onCell:(record) => ({title:record.spreadName}),
    render:(text,record) => <span>{text.length > 10?text.slice(0,9)+'...':text}</span>
  },{
    title: '分享标题',
    dataIndex: 'mainTitle',
    key: 'mainTitle',
    render:(text,record,index) => (
    	getFieldDecorator('mainTitle'+record.activeId, {
        initialValue: text?text:record.spreadName,
        rules: [{max:50}]
    	})(
      	<Input autoComplete="off" style={{maxWidth:400}}/>
      )
    )
  },{
    title: '分享副标题',
    dataIndex: 'subTitle',
    key: 'subTitle',
    render:(text,record,index) => (
    	getFieldDecorator('subTitle'+record.activeId, {
        initialValue: text,
        rules: [{max:50}]
    	})(
      	<Input autoComplete="off" style={{maxWidth:300}}/>
      )
    )
  },{
    title: '分享图片',
    dataIndex: 'shareImgUrl',
    key: 'shareImgUrl',
    render: (text, record) => (
      <div style={{width:'100',marginLeft:'15%'}}>
        <Upload
          name="imageFile"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={config.api.uploadImg}
          onChange={(info) => changeListImg(info,record.activeId)}
        >
          {record.shareImgUrl ? <img src={record.shareImgUrl} style={{maxWigth:100,maxHeight:100}} alt="avatar" /> : uploadMainImgButton}
        </Upload>
      </div>
    ),
  },{
    title: '操作',
    key: 'action',
    render: (text, record,index) => (
      <a type="primary" onClick={() => confirmSave(record,index)}>保存修改</a>
    ),
  }];
  
  
  
  const filterProps = {//搜索过滤的方法
    location:location,
    dispatch:dispatch,
    filterArray : [
      {
        label:'活动名称',
        name:'spreadName',
        type:'input'
      }
    ]
  }
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"spreadName",  //key值
    dataSource:shareActivityConfigModul.dataSource,  //tabel数据源
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:shareActivityConfigModul.currentPage, //当前页码
      total:shareActivityConfigModul.totalSize,  //总条数
      defaultPageSize:shareActivityConfigModul.pageSize  //当前每页显示条数
    }
  }
  return (
    <div>
      <div className='formBody'>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>活动管理</Breadcrumb.Item>
          <Breadcrumb.Item>分享活动配置</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <FilterItem {...filterProps} />
      <DataTabel {...tabelProps} />
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({shareActivityConfigModul,loading})=>({shareActivityConfigModul,loading}))(Form.create()(shareActivity));
//类型检测
shareActivity.protoTypes = {
  shareActivityConfigModul:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};