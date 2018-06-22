"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Breadcrumb, Steps, Radio ,Cascader ,Button,message } from 'antd';
import queryString from 'query-string';
import GoodsMessage from './goodsMessage';

const platAddGoods = ({addGoodsModel,loading,dispatch, location})=>{
  const Step = Steps.Step;
  const RadioGroup = Radio.Group;
  const filedNames = {  //字段名修改
    label: 'sort_name', value: 'id'
  }
  const changeCate = (value) => { //分类修改
    const chooseCateId = value;
    dispatch({type:'addGoodsModel/chooseCateId',chooseCateId})
  }
  const nextStep = (value) => { //填写下一步
    if(!addGoodsModel.chooseCateId){
      message.destroy();
      message.error('请先选择分类！')
      return;
    }
    dispatch({type:'addGoodsModel/queryMerchantList'}).then((result) => {
      if(result.message === '成功'){
        dispatch({type:'addGoodsModel/nextStep'})
      }else{
        message.error(result.error(result.message))
      }
    })
    
  }
  location.query = queryString.parse(location.search) //获取当前的过滤条件
  const { redict } = location.query;
  const goodsProps = {
    redict:redict,
    fileList:addGoodsModel.fileList,
    listImgUrl:addGoodsModel.listImgUrl,
    mainImgUrl:addGoodsModel.mainImgUrl,
    isUpdate:addGoodsModel.isUpdate,
    productMerchant:addGoodsModel.productMerchant,
    loading:addGoodsModel.loading,
    goodsDetail:addGoodsModel.goodsDetail,
    ifShowDetail:addGoodsModel.ifShowDetail,
    currentProduct:addGoodsModel.currentProduct,
    imgList:addGoodsModel.imgList,
    exchangeMessage:addGoodsModel.exchangeMessage,
    extendedDetail:addGoodsModel.extendedDetail,
  }
  return (
    <div>
      <div className='formBody'>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>商品管理</Breadcrumb.Item>
          <Breadcrumb.Item>新增商品</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <Steps size="small" current={addGoodsModel.step} style={{width:'70%',marginLeft:'15%'}}>
        <Step title="选择分类" />
        <Step title="详细信息" />
        <Step title="提交审核" />
      </Steps>
      {
        addGoodsModel.step === 1 ? 
        <div style={{marginTop:30}}>
          <RadioGroup  value={addGoodsModel.productType}>
            <Radio value={1}>虚拟商品</Radio>
            <Radio value={2} disabled>实物商品</Radio>
          </RadioGroup>
          <div style={{width:'70%',marginLeft:'15%',marginTop:30}} id="goodsCateContainer">
            <Cascader 
              style={{width:'100%'}} 
              getPopupContainer={() => document.getElementById('goodsCateContainer')}
              size="large" 
              popupVisible={true} 
              options={addGoodsModel.dataSource} 
              filedNames={filedNames} 
              onChange={changeCate} 
              placeholder="请选择分类" 
            />
          </div>
          <Button type="primary" onClick={() => nextStep()} style={{left:'46%',position:'absolute',bottom:10}}>下一步填写详细信息</Button>
        </div>:<GoodsMessage {...goodsProps} />
      }
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({addGoodsModel,loading})=>({addGoodsModel,loading}))(platAddGoods);
//类型检测
platAddGoods.protoTypes = {
  addGoodsModel:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};