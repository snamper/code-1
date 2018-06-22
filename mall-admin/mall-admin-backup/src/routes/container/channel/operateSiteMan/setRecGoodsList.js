"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Input, Button, Table, Divider, Breadcrumb, message, Modal, Form } from 'antd'; //子页面内的面包屑导航
import styles from './index.less' //引入样式
import AddRecGoodsDialog from './addRecGoodsDialog'//引入增加商品推荐 弹窗
// import ChangeRecGoodsDialog from './changeRecGoodsDialog'//引入编辑商品推荐 弹窗
/*运营位管理-渠道推荐商品管理*/
const confirm = Modal.confirm;
const channelRecGoodsManager = ({
	setRecGoodsList,
	loading,
	dispatch,
	form: {
	  getFieldDecorator,
	  validateFieldsAndScroll,
	},
})=>{
	//this.statel.loading = true;
  console.log(setRecGoodsList)
  const columns = [{
    title: '序号',
    dataIndex: 'sort',
    key: '1',
    render: (text, record, index) => (
   	  <span>{setRecGoodsList.editSort?
        getFieldDecorator('banner_sore'+record.id, {
          initialValue: text,
          rules: [{ required: true }],
        })(
          <Input size={"small"} style={{maxWidth:80}} />
        )
      :text}</span>
    ),
    className: styles.tableTextCtnter,
  }, {
    title: '商品ID',
    dataIndex: 'product_id',
    key: 'product_id',
    className: styles.tableTextCtnter,
  }, {
    title: '商品名称',
    dataIndex: 'full_name',
    key: 'full_name',
    className: styles.tableTextCtnter,
  }, {
    title: '商户名称',
    dataIndex: 'merchant_short_name',
    key: 'merchant_short_name',
    className: styles.tableTextCtnter,
  }, {
    title: '零售价(元)',
    dataIndex: 'retail_price',
    key: 'retail_price',
    className: styles.tableTextCtnter,
  }, {
    title: '成本价(元)',
    dataIndex: 'cost_price',
    key: 'cost_price',
    className: styles.tableTextCtnter,
  }, {
    title: '库存数量',
    dataIndex: 'stock_count',
    key: 'stock_count',
    className: styles.tableTextCtnter,
  }, {
    title: '操作',
    key: 'action',
    render: (text, record, index) => (
      <span>
    	<a onClick={() => showRecGoodsDialog('edit',record.id)}>替换</a>
	    <Divider type="vertical" />
	    <a onClick={() => confirmModal(record.id)}>删除</a>
      </span>
    ),
    className: styles.tableTextCtnter,
  }];
  const showRecGoodsDialog = (source,id) => {//新增推荐商品
    dispatch({type:'setRecGoodsList/getRecGoodsLis',payload:{channelId:setRecGoodsList.channelId}}).then((result) => {
      if(result.message !== '成功'){
        message.error("获取列表失败！")
        return;
      }
      console.log(result)
      dispatch({type:'setRecGoodsList/showDialog', recGoodsList:result.data,chooseProductId:id,source})
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
        dispatch({type:'setRecGoodsList/recGoodsDelete',id:id})
        .then((result) => {
          if(result.message !== '成功'){
            message.error(result.message);
            return
          }
          message.success("删除成功")
          setTimeout(function(){
            dispatch({type:'setRecGoodsList/query',payload:{channelId:setRecGoodsList.channelId}})
          },1000)
        })  
      },
      onCancel() {
        console.log('取消了')
      },
    });
  };
  const recGoodsListPublish = () => {
  	const data = setRecGoodsList.dataSource;
  	let ids = '';//存放当前列表的所有商品id
  	data.map((item,index) => (
  		index < data.length - 1?ids += item.id+",":ids += item.id
  	))
    confirm({
      title: '您确定要执行发布操作吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
        dispatch({type:'setRecGoodsList/releaseBtn',id:ids})
        .then((result) => {
          if(result.message !== "成功"){
            message.error(result.message)
            return;
          }
          message.success("发布成功",1,dispatch({type:'setRecGoodsList/query',payload:{channelId:setRecGoodsList.channelId}}))
          
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
            sort:values[key],
            channelId:setRecGoodsList.channelId
          })
        }
        data.productInfo = productInfo;
        dispatch({type:'setRecGoodsList/editorSortSave',data})
        .then((result) => {
          if(result.message !== '成功'){
            message.error(result.message)
            return;
          }
          dispatch({type:'setRecGoodsList/query',payload:{channelId:setRecGoodsList.channelId}})
        })
      }
    })
  }
  return (
    <div>
	  <Breadcrumb separator=">" style={{marginBottom: 20}}>
	    <Breadcrumb.Item>运营位管理</Breadcrumb.Item>
	    <Breadcrumb.Item>渠道推荐商品管理</Breadcrumb.Item>
	    <Breadcrumb.Item>推荐商品设置列表</Breadcrumb.Item>
	  </Breadcrumb>
	  <div className={styles.clearfix} style={{marginBottom: 15}}>
	  	<Button className={styles.left} type="primary" onClick={() => showRecGoodsDialog('add')}>新增推荐商品</Button>
	  	{
	  	  setRecGoodsList.dataSource && setRecGoodsList.dataSource.length > 0?
	  	  <div>
	  	    <Button className={styles.right} style={{marginLeft: 20}} type="primary" onClick={() => recGoodsListPublish()}>发布</Button>
	  	    {!setRecGoodsList.editSort?
	      	<Button className={styles.right} type="primary" onClick={()=>{dispatch({type:'setRecGoodsList/editorSortBtn'})}}>编辑排序</Button>:
	      	<span>
	        <Button className={styles.right} style={{marginLeft: 20}} type="primary" onClick={()=>checkMessage(validateFieldsAndScroll)}>保存</Button>
	        <Button className={styles.right}  type="primary" onClick={()=>{dispatch({type:'setRecGoodsList/cancelSortBtn'})}}>取消编辑</Button>
	      	</span>
	        }
	  	  </div>:''
	  	}
	  	
	  </div>
      <Table
        columns={columns}
        dataSource={setRecGoodsList.dataSource}
        rowKey={record => record.id}
        pagination={false}
        bordered={true}
    />
	 <AddRecGoodsDialog />
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({setRecGoodsList,loading})=>({setRecGoodsList,loading}))(Form.create()(channelRecGoodsManager));
//类型检测
channelRecGoodsManager.protoTypes = {
  setRecGoodsList:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};