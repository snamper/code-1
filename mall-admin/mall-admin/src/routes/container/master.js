'use strict';
/**
 * 推荐商品管理页
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';


const Index = ({loading,dispatch,location})=>{
  return (
    <div>running!</div>
  )
};

export default connect(({account,loading})=>({account,loading}))(Index);

//参数类型检测
Index.protoTypes = {
  dispatch:PropTypes.object,
  loading:PropTypes.object,
  location:PropTypes.object,
};