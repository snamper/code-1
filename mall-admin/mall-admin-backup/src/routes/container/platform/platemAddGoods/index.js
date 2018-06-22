"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Breadcrumb, Steps, Radio ,Cascader ,Button } from 'antd';
import GoodsMessage from './goodsMessage';

const platAddGoods = ({addGoodsModel,loading,dispatch, location})=>{
  const Step = Steps.Step;
  const RadioGroup = Radio.Group;
  const options = [{
    value: 'zhejiang',
    label: '手机数码',
    children: [{
      value: 'hangzhou',
      label: '手机配件',
      children: [{
        value: 'xihu',
        label: '智能手机',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
  }];
  const changeCate = (value) => {
    console.log(value)
  }
  const nextStep = (value) => {
    dispatch({type:'addGoodsModel/nextStep'})
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
          <RadioGroup  value={addGoodsModel.goodsType}>
            <Radio value={1}>虚拟商品</Radio>
            <Radio value={2} disabled>实物商品</Radio>
          </RadioGroup>
          <div style={{width:'70%',marginLeft:'15%',marginTop:30}}>
          <Cascader style={{width:'100%'}} size="large" popupVisible={true} options={options} onChange={changeCate} placeholder="Please select" />
          </div>
          <Button type="primary" onClick={() => nextStep()} style={{left:'46%',position:'absolute',bottom:10}}>下一步填写详细信息</Button>
        </div>:<GoodsMessage />

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