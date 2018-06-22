"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Divider, Breadcrumb, Input, Form, Upload,message } from 'antd';
import config from '@/utils/config';
import DataTabel from '@/components/DataTabel';//引入表格方法
import FilterItem from '@/components/FilterItem';//引入搜索方法
//库存管理
const stockMan = ({stockList,loading,dispatch, location, form:{
  getFieldDecorator,
  getFieldsValue
}})=>{
  const changeListFile = (info,source) => { 
    if(info.file.response){
      if(info.file.response.message==="成功"){
        message.info("导入成功！");
        setTimeout(function(){
          window.location.reload()
        },1000)
      }else{
        message.error(info.file.response.message);
      }
    }
  }
  const columns = [{
    title: '序号',
    key:'create_time',
    render:(text,record,index) => (<span>{(stockList.currentPage-1)*stockList.pageSize+index+1}</span>)
  }, {
    title: '商品ID',
    dataIndex: 'id',
    key: 'id',
    className:'channelName',
    onCell:(record) => ({title:record.channelName}),
    render:(text,record) => <span>{text.length > 10?text.slice(0,9)+'...':text}</span>
  }, {
    title: '商品名称',
    dataIndex: 'full_name',
    key: 'full_name',
    className:'companyName',
    onCell:(record) => ({title:record.companyName}),
    render:(text,record) => <span>{text.length > 10?text.slice(0,9)+'...':text}</span>
  }, {
    title: '供货商名称',
    dataIndex: 'merchant_short_name',
    key: 'merchant_short_name',
    render:(text)=>(text?text:'参数缺失')
  }, {
    title: '库存总量',
    dataIndex: 'product_code_count',
    key: 'product_code_count'
  }, {
    title: '订单占用库存',
    dataIndex: 'order_occupy_product_code_count',
    key: 'order_occupy_product_code_count'
  },{
    title: '可用库存',
    dataIndex: 'available_product_code_count',
    key: 'available_product_code_count',
  },
  {
    title: '阈值',
    dataIndex: 'stock_threshold',
    key: 'stock_threshold',
    render: (text, record, index) => (
      <span>
      {
        stockList.updateThreshold === index?
        getFieldDecorator('value', {
          initialValue: text,
          rules: [{ required: true, message:'请输入正确的阈值！', pattern:/^[0-9]*$/ }],
        })(
          <Input size={"small"} style={{maxWidth:800}} />
        ):text
      }
      </span>
    )
  },{
    title: '操作',
    key: 'product_type',
    render: (text, record, index) => (
      <span>
        {String(record.product_ad_attr) === '1'?
        <Upload
            name="uploadFile"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={config.api.upLoadFile}
            data = {{id:record.id}}
            onChange={(info) => changeListFile(info,'main')}
          >
            导入兑换码
        </Upload>
        :''}
        <Divider type="vertical" />
        {
        stockList.updateThreshold === index ? 
        <a onClick={() => dispatch({type:'stockList/saveThreshold',payload:{values:getFieldsValue,id:record.id}})}>保存阈值</a>:
        <a onClick={() => dispatch({type:'stockList/changeThreshold',index})}>修改阈值</a>
      }
      </span>
    ),
  }];
  const filterProps = {  //搜索过滤的方法
    location:location,
    dispatch:dispatch,
    filterArray : [
      {
        label:'商品ID',
        name:'id',
        type:'input'
      },
      {
        label:'商品名称',
        name:'fullName',
        type:'input'
      },
      {
        label:'供应商名称',
        name:'merchantShortName',
        type:'input'
      }
    ]
  }
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"id",  //key值
    dataSource:stockList.dataSource,  //tabel数据源
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:stockList.currentPage, //当前页码
      total:stockList.totalSize,  //总条数
      defaultPageSize:stockList.pageSize  //当前每页显示条数
    }
  }
  return (
    <div>
      <div className='formBody'>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>运营管理</Breadcrumb.Item>
          <Breadcrumb.Item>库存管理</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
      </div>
      <FilterItem {...filterProps} />
      <DataTabel {...tabelProps} />
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({stockList,loading})=>({stockList,loading}))(Form.create()(stockMan));
//类型检测
stockMan.protoTypes = {
  stockList:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};