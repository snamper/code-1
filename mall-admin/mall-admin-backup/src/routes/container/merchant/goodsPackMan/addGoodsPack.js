"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
// import { routerRedux } from 'dva/router'
import { Breadcrumb, Form, Input, Upload, Icon, Button, InputNumber } from 'antd';
// import queryString from 'query-string';
import styles from './addGoodsPack.less'
//商品打包管理
// const confirm = Modal.confirm;
const FormItem = Form.Item;
const addGoodsPackItem = ({
  addPackFn,
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
  const formItemLayoutSmall = {
    labelCol: { span: 3 },
    wrapperCol: { span: 3 },
  };
  const showPackGoodsDialog = (source,id) => {//新增推荐商品
    dispatch({type:'addPackFn/showSelPackGoods',payload:{}}).then((result) => {
      
      console.log(result)
    })
  };
  return (
    <div>
      <div className='formBody' style={{height: 40}}>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>运营管理</Breadcrumb.Item>
          <Breadcrumb.Item>商品管理</Breadcrumb.Item>
          <Breadcrumb.Item>商品打包管理</Breadcrumb.Item>
          <Breadcrumb.Item>创建商品包</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form layout="vertical">
        <FormItem {...formItemLayout} label="商品包名称">
          {getFieldDecorator('goodPackName', {
            rules: [{ 
              required: true, 
              whitespace: true,
              max:50,
              message: '请输入50字以内的商品包名称!'
            }],
            validateTrigger: 'onBlur'
          })(<Input placeholder="请输入50字以内的商品包名称"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="封面图">
          <div className="dropbox">
            {getFieldDecorator('dragger', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
              rules: [{ required: true}]
            })(
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击上传封面图</p>
                <p className="ant-upload-hint">请上传图片格式为jpg、jpeg、png（限10M以内大小）</p>
              </Upload.Dragger>
            )}
          </div>
        </FormItem>
        <FormItem {...formItemLayout} label="选择商品">
          {getFieldDecorator('selGoodPack', {
            rules: [{ required: true, message: '请选择商品!' }],
          })(<Button type="primary" onClick={() => showPackGoodsDialog()}>点击选择商品</Button>)}
        </FormItem>
        <div className={styles.partLine}>选中打包商品</div>
        <div className={styles.selectedBox}>
          <ul>
          {  
            [1,2,3].map(function(username,index){  
                return <li className={styles.selGoodsLis} key={index}>
                  <span className={styles.selGoodsName + ' ' + styles.fl + ' ' + styles.marginRight20}>{username}爱奇艺VIP　　</span>
                  <span>原价：{username}66666积分　　</span>
                  <span>进货价：{username}66666666积分　　</span>
                  <span>*</span><span>打包价：</span>
                  <InputNumber style={{width: 100, height: 32}} min={1} max={10} placeholder="小于售价"/>积分
                  <Icon className={styles.delIcon} type="delete" title="删除" />
                </li>  
            })  
          }  
          </ul>
        </div>
        <div className={styles.partLine}>防薅策略</div>
        <FormItem {...formItemLayoutSmall} label="单账号购买数量限制">
          {getFieldDecorator('accountLimit')(<InputNumber min={1} />)}
        </FormItem>
        <FormItem {...formItemLayoutSmall} label="单设备购买数量限制">
          {getFieldDecorator('facilityLimit')(<InputNumber min={1} />)}
        </FormItem>
        <FormItem {...formItemLayoutSmall} label="同一支付账号数量限制">
          {getFieldDecorator('payAccountLimit')(<InputNumber min={1} />)}
        </FormItem>
        <div className={styles.goodsPackSaveBtn}>
          <Button type="primary">保存</Button>
          <Button>取消</Button>
        </div>
      </Form>  
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({addPackFn,loading})=>({addPackFn,loading}))(Form.create()(addGoodsPackItem));
//类型检测
addGoodsPackItem.protoTypes = {
  addPackFn:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};