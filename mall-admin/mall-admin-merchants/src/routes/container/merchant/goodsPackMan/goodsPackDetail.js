"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { Breadcrumb, Form, Button } from 'antd';
// import queryString from 'query-string';
import styles from './addGoodsPack.less'
// import config from '@/utils/config.js'
//商品打包详情页面
// const confirm = Modal.confirm;
// const Option = Select.Option;
const FormItem = Form.Item;
const goodsPackDetialItem = ({
  packDetialFn,
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
  const formItemLayoutSmall = {
    labelCol: { span: 3 },
    wrapperCol: { span: 3 },
  };

  //返回按钮操作  返回列表页
  const backGoodsPackMan = () => {
    dispatch(routerRedux.push({//跳转到首页列表
      pathname:'/merchant/goodsPackMan'
    }))
  }

  return (
    <div>
      <div className='formBody' style={{height: 40}}>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>运营管理</Breadcrumb.Item>
          <Breadcrumb.Item>商品管理</Breadcrumb.Item>
          <Breadcrumb.Item>商品打包管理</Breadcrumb.Item>
          <Breadcrumb.Item>商品包详情</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form layout="vertical">
        <FormItem {...formItemLayout} label="商品包名称">
          <span>{packDetialFn.dataSource.packageName}</span>
        </FormItem>
        <FormItem {...formItemLayout} label="封面图">
          <div className="dropbox">
          <img src={packDetialFn.dataSource.sealImgUrl} alt="封面图"/>
          </div>
        </FormItem>
        <div className={styles.partLine}>选中打包商品</div>
        <div className={styles.selectedBox}>
          <ul>
            { packDetialFn.dataSource.tProductList &&  packDetialFn.dataSource.tProductList.length > 0 ?
            (packDetialFn.dataSource.tProductList.map(function(item,index){  
                  return <li className={styles.selGoodsLis} key={index}>
                    <span className={styles.selGoodsName + ' ' + styles.fl + ' ' + styles.marginRight20}>{item.fullName}　　</span>
                    <span>原价：{item.retailPrice}积分　　</span>
                    <span>进货价：{item.costPrice}积分　　</span>
                    <span>打包价：{item.packagePrice}积分</span>
                    {item.productState !== '1'?<span style={{color:'#fb040a'}}>此商品不是已上架的商品</span>:''}
                  </li>  
              }) ) : ''
            }  
          </ul>
          { packDetialFn.dataSource.tProductList &&
            packDetialFn.dataSource.tProductList.length > 0?
            (<div style={{paddingTop: 50}}><FormItem {...formItemLayoutSmall} label="原价总价">
              <span>{packDetialFn.dataSource.originTotalPrice}　积分</span>
            </FormItem>
            <FormItem {...formItemLayoutSmall} label="进货总价">
              <span>{packDetialFn.dataSource.purchaseTotalPrice}　积分</span>
            </FormItem>
            <FormItem {...formItemLayoutSmall} label="打包总价">
              <span>{packDetialFn.dataSource.packageTotalPrice}　积分</span>
            </FormItem>
            <FormItem {...formItemLayoutSmall} label="打包商品库存">
              <span>{packDetialFn.dataSource.packageStock}</span>
            </FormItem></div>):''
          }
        </div>
        <div className={styles.partLine}>防薅策略</div>
        <FormItem {...formItemLayoutSmall} label="单账号购买数量限制">
          <span>{packDetialFn.dataSource.singleAcLimit}</span>
        </FormItem>
        <FormItem {...formItemLayoutSmall} label="单设备购买数量限制">
        	<span>{packDetialFn.dataSource.singleApLimit}</span>
        </FormItem>
        <div className={styles.goodsPackSaveBtn}>
          <Button onClick={() => backGoodsPackMan()}>取消</Button>
        </div>
      </Form>  
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({packDetialFn,loading})=>({packDetialFn,loading}))(Form.create()(goodsPackDetialItem));
//类型检测
goodsPackDetialItem.protoTypes = {
  packDetialFn:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};