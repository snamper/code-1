"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
//import { routerRedux } from 'dva/router'
// import { routerRedux } from 'dva/router'
import { Divider, Breadcrumb, Input, Form, Upload } from 'antd';
//import queryString from 'query-string';
import config from '@/utils/config';
import DataTabel from '@/components/DataTabel';//引入表格方法
import FilterItem from '@/components/FilterItem';//引入搜索方法
//库存管理
// const confirm = Modal.confirm;
const stockMan = ({stockList,loading,dispatch, location, form:{
  getFieldDecorator,
  getFieldsValue
}})=>{
//const { pathname } = location;
//const handleRefresh = (newQuery) => {
//	console.log(pathname)
//  dispatch(routerRedux.push({
//    pathname,
//    search: queryString.stringify({
//      ...newQuery,
//    }),
//  }))
//}
  const changeListFile = (info,source) => { 
    console.log(info)
//  if (info.file.status === 'uploading') {
//    dispatch({type:'addGoodsModel/imgUpload',payload:{loading:true}})
//    return;
//  }
//  if (info.file.status === 'done') {
//    switch (source) {
//      case 'list':
//        dispatch({type:'addGoodsModel/listImgUpload',payload:{loading:false,listImgUrl:info.file.response.data.httpsPath}})
//        break;
//      case 'main':
//        dispatch({type:'addGoodsModel/mainImgUpload',payload:{loading:false,mainImgUrl:info.file.response.data.httpsPath}})
//        break;
//      default:
//        return false;
//    }
//    
//  }
  }
  const columns = [{
    title: '序号',
    dataIndex: 'channelId',
    key: 'channelId',
    render:(text,record,index) => (<span>{(stockList.currentPage-1)*stockList.pageSize+index+1}</span>)
  }, {
    title: '商品ID',
    dataIndex: 'channelName',
    key: 'channelName',
    className:'channelName',
    onCell:(record) => ({title:record.channelName}),
    render:(text,record) => <span>{text.length > 10?text.slice(0,9)+'...':text}</span>
  }, {
    title: '商品名称',
    dataIndex: 'companyName',
    key: 'companyName',
    className:'companyName',
    onCell:(record) => ({title:record.companyName}),
    render:(text,record) => <span>{text.length > 10?text.slice(0,9)+'...':text}</span>
  }, {
    title: '供货商名称',
    dataIndex: 'channelStatus',
    key: 'channelStatus'
  }, {
    title: '库存总量',
    dataIndex: 'linkPhone',
    key: 'linkPhone'
  }, {
    title: '订单占用库存',
    dataIndex: 'createTime',
    key: 'createTime'
  },{
    title: '可用库存',
    dataIndex: 'linkMan1',
    key: 'linkMan1',
  },
  {
    title: '阈值',
    dataIndex: 'linkMan',
    key: 'linkMan',
    render: (text, record, index) => (
      <span>
      {
        stockList.updateThreshold === index?
        getFieldDecorator('product', {
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
    key: 'action',
    render: (text, record, index) => (
      <span>
         <Upload
	          name="uploadFile"
	          listType="picture-card"
	          className="avatar-uploader"
	          showUploadList={false}
	          action={config.api.upLoadFile}
	          data = {{id:'123'}}
	          onChange={(info) => changeListFile(info,'main')}
	        >
			      导入兑换码
        </Upload>
{    /*    <a onClick={() => {dispatch({type:'index/showDialog',payload:{currentItem:record,isUpdate:true}})}}>导入兑换码</a>*/}
        <Divider type="vertical" />

        {
        stockList.updateThreshold === index ? 
        <a onClick={() => dispatch({type:'stockList/saveThreshold',payload:{values:getFieldsValue,id:record.channelId}})}>保存阈值</a>:
        <a onClick={() => dispatch({type:'stockList/changeThreshold',index})}>修改阈值</a>
      }
        {/* <a onClick={() => dispatch({type:'stockList/changeThreshold',index})}>修改阈值</a> */}
      </span>
    ),
  }];
  const filterProps = {//搜索过滤的方法
    location:location,
    dispatch:dispatch,
    filterArray : [
      {
        label:'商品ID',
        name:'memberId',
        type:'input'
      },
      {
        label:'商品名称',
        name:'member',
        type:'input'
      },
      {
        label:'供应商名称',
        name:'supplier',
        type:'input'
      },{
        label:'商品分类属性',
        type:'select',
        name:'status',
        options:[
          {
            value:'1',
            name:'全部'
          },
          {
            value:'2',
            name:'实物商品'
          },
          {
            value:'3',
            name:'虚拟商品'
          }
        ]
      }
    ]
  }
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"channelId",  //key值
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