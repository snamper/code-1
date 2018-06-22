"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Input, Button, Divider, Breadcrumb, message, Modal, Form } from 'antd'; //子页面内的面包屑导航
import DataTabel from '@/components/DataTabel';
import FilterItem from '@/components/FilterItem';
import RecGoodsModal from './RecGoodsModal'//引入编辑商品推荐 弹窗
/*运营位管理-渠道推荐商品管理*/
const confirm = Modal.confirm;
const recGoodsManager = ({
	recGoodsModel,
  loading,
  location,
	dispatch,
	form: {
	  getFieldDecorator,
	  validateFieldsAndScroll,
	},
})=>{
	//this.statel.loading = true;
  console.log(recGoodsModel)
  const columns = [{
    title: '序号',
    dataIndex: 'sort',
    key: '1',
    render: (text, record, index) => (
   	  <span>{recGoodsModel.editSort?
        getFieldDecorator('banner_sore'+record.id, {
          initialValue: text,
          rules: [{ required: false }],
        })(
          <Input size={"small"} style={{maxWidth:80}} />
        )
      :text}</span>
    ),
  }, {
    title: '商品ID',
    dataIndex: 'product_id',
    key: 'product_id',
  }, {
    title: '商品名称',
    dataIndex: 'full_name',
    key: 'full_name',
  }, {
    title: '商城售价(元)',
    dataIndex: 'retail_price',
    key: 'retail_price',
  }, {
    title: '库存数量',
    dataIndex: 'stock_count',
    key: 'stock_count',
  },{
    title: '推荐状态',
    dataIndex: 'recommend_status',
    key: 'recommend_status',
    render:(text, record, index) => (<span>{ 
    	String(record.product_status) === '2' || String(record.product_status) === '8' ? '失效':String(record.publish_status) === '0'?'新增':'生效'
//  	String(record.publish_status) === '0' ? '新增': String(record.product_status) === '2' || String(record.product_status) === '8' ? '失效' : '生效'
    }</span>)
  }, {
    title: '操作',
    key: 'action',
    render: (text, record, index) => (
      <span>
    	<a onClick={() => showRecGoodsDialog('edit',record.id)}>替换</a>
	    <Divider type="vertical" />
	    <a onClick={() => confirmModal(record.id)}>删除</a>
      </span>
    )
  }];
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"product_id",  //key值
    dataSource:recGoodsModel.dataSource,  //tabel数据源
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:true
  }
  const showRecGoodsDialog = (source,id) => {//新增推荐商品
    dispatch({type:'recGoodsModel/getRecGoodsLis',payload:{pageNo:1,pageSize:10}}).then((result) => {
      if(result.message !== '成功'){
        message.error("获取列表失败！")
        return;
      }
      const recGoodsList = result.data
      dispatch({type:'recGoodsModel/showDialog',recGoodsList:result.data, payload:{chooseProductId:id},source})
    })
  };
  //删除按钮操作
  const confirmModal = (id) => {
  	console.log(id)
    confirm({
      title: '您确定要执行删除操作吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
        dispatch({type:'recGoodsModel/recGoodsDelete',id:id})
        .then((result) => {
          if(result.message !== '成功'){
            message.error(result.message);
            return
          }
          message.success("删除成功")
          setTimeout(function(){
            dispatch({type:'recGoodsModel/query',payload:{channelId:recGoodsModel.channelId}})
          },1000)
        })  
      },
      onCancel() {
        console.log('取消了')
      },
    });
  };
  const recGoodsListPublish = () => {
  	const data = recGoodsModel.dataSource;
  	let ids = '';//存放当前列表的所有商品id
  	data.map((item,index) => (
  		index < data.length - 1?ids += item.id+",":ids += item.id
  	))
    confirm({
      title: '您确定要执行发布操作吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
        dispatch({type:'recGoodsModel/releaseBtn',id:ids})
        .then((result) => {
          if(result.message !== "成功"){
            message.error(result.message)
            return;
          }
          message.success("发布成功",1,dispatch({type:'recGoodsModel/query',payload:{channelId:recGoodsModel.channelId}}))
          
        })  
      },
      onCancel() {
        console.log('取消了')
      },
    });
  };
  //保存编辑后的排序
  const checkMessage = (validateFieldsAndScroll) => {
    validateFieldsAndScroll((errors, values) => {
      console.log(values)
      if (errors) {
        message.error("请输入正确的排序号！")
        return;
      }else{
        let data = {}
        let productInfo = [];
        console.log(data)
        for(let key in values){
          productInfo.push({
            id:key.split("banner_sore")[1],
            sort:values[key] || null,
            channelId:recGoodsModel.channelId
          })
        }
        data.productInfo = productInfo;
        dispatch({type:'recGoodsModel/editorSortSave',data})
        .then((result) => {
          if(result.message !== '成功'){
            message.error(result.message)
            return;
          }
          dispatch({type:'recGoodsModel/query',payload:{channelId:recGoodsModel.channelId}})
        })
      }
    })
  }
  const filterProps = {
    location:location,
    dispatch:dispatch,
    filterArray : [
      {
        label:'商品ID',
        name:'id',
        type:'input'
      },{
        label:'商品名称',
        name:'fullName',
        type:'input'
      }
    ]
  }
  return (
    <div>
	  <Breadcrumb separator=">" style={{marginBottom: 20}}>
	    <Breadcrumb.Item>运营位管理</Breadcrumb.Item>
	    <Breadcrumb.Item>渠道推荐商品管理</Breadcrumb.Item>
	    <Breadcrumb.Item>推荐商品设置列表</Breadcrumb.Item>
	  </Breadcrumb>
    <FilterItem {...filterProps}/>
	  <div  style={{marginBottom: 25}}>
	  	  <Button style={{marginLeft: 20}} type="primary" onClick={() => showRecGoodsDialog('add')}>新增推荐商品</Button>
        <Button style={{float:'right',marginLeft: 20}} type="primary" onClick={() => recGoodsListPublish()}>发布</Button>
        {!recGoodsModel.editSort?
        <Button type="primary" style={{float:'right',marginLeft: 20}} onClick={()=>{dispatch({type:'recGoodsModel/editorSortBtn'})}}>编辑排序</Button>:
        <span>
        <Button style={{float:'right',marginLeft: 20}} type="primary" onClick={()=>checkMessage(validateFieldsAndScroll)}>保存</Button>
        <Button  type="primary" style={{float:'right',marginLeft: 20}} onClick={()=>{dispatch({type:'recGoodsModel/cancelSortBtn'})}}>取消编辑</Button>
        </span>
	  	}
	  </div>
      <DataTabel {...tabelProps}/>
      <RecGoodsModal />
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({recGoodsModel,loading})=>({recGoodsModel,loading}))(Form.create()(recGoodsManager));
//类型检测
recGoodsManager.protoTypes = {
  recGoodsModel:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};