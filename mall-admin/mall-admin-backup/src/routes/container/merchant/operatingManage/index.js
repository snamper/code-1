'use strict';
/**
 * 推荐商品管理页
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button,Divider,Input,Modal,Form,Table } from 'antd';
import FilterItem from 'components/FilterItem';
import DataTabel from 'components/DataTabel';
import styles from './index.less';
const FormItem = Form.Item;
const dataSource2 = [];
for(let i = 0;i<20;i++){
  dataSource2.push({
    id:i,
    product_id:`1000${i}`,
    product_name:`tester10${i}`,
    mall_sale:`100${i}`,
    num:`1000${i}`
  })
}
const rowSelection = {

};
const columns2 = [
  {
    
  },
  {
    title:"序号",
    dataIndex:"id",
    key:"id"
  },{
    title:"商品ID",
    dataIndex:"product_id",
    key:"product_id"
  },{
    title:"商品名称",
    dataIndex:"product_name",
    key:"product_name"
  },{
    title:"商城售价（元）",
    dataIndex:"mall_sale",
    key:"mall_sale"
  },{
    title:"库存数量",
    dataIndex:"num",
    key:"num"
  }
];
const filterProps = {
  filterArray:[ 
	  {
		label:'商品ID：',
		name:'goodsId',
		type:'input'
	  },
	  {
		label:'商品名称：',
		name:'goodsName',
		type:'input'
	  }
	],
  btnName:'查询'
};

const Index = ({setRecGoodsList,loading,dispatch,location})=>{
  const columns = [{
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    render:(text,record,index) => (<Input type="text" disabled={setRecGoodsList.disabled} defaultValue={text}/>)
  }, {
    title: '商品ID',
    dataIndex: 'product_id',
    key: 'product_id'
  }, {
    title: '商品名称',
    dataIndex: 'full_name',
    key: 'full_name'
  },{
    title: '商城售价（元）',
    dataIndex: 'mall_sale',
    key: 'mall_sale'
  }, {
    title: '库存数量',
    dataIndex: 'total',
    key: 'total'
  },{
    title: '推荐状态',
    dataIndex: 'status',
    key: 'status'
  },{
    title: '操作',
    key: 'action',
    render: (text,record,index)=>(
      <span>
        <a >替换</a>
        <Divider type="vertical"/>
        <a >删除</a>
      </span>
    ),
  }]; 
  const tabelProps = {  //表格属性
    columns:columns,  //tabel表格列
    keySource:"product_id",  //key值
    dataSource:setRecGoodsList.dataSource,  //tabel数据源
    location:location,  //location方法
    dispatch:dispatch,  //dispatch方法
    notNeedPagination:false,  //是否需要分页
    paginationProps: {  //分页属性
      defaultCurrent:setRecGoodsList.currentPage, //当前页码
      total:setRecGoodsList.totalSize,  //总条数
      defaultPageSize:setRecGoodsList.pageSize  //当前每页显示条数
    }
  }
  const sort = function(){  //排序
  	dispatch({type:'setRecGoodsList/sort'})
  }
  const onModal = function(){
  	dispatch({type:'setRecGoodsList/modalIn'})
  }
  const onOk = function(){
    dispatch({type:'setRecGoodsList/onOk'})
  }
  const onCancel = function(){
    dispatch({type:'setRecGoodsList/modalOut'})
  }
  return (
  	<div>
      <FilterItem dispatch={dispatch} location={location} {...filterProps}  />   
      <div className={styles.box}>
        <Button onClick={onModal} type="primary" className={styles.left} >新增推荐商品</Button>
        <Button type="primary" className={styles.right}>发布</Button>
        <Button onClick={sort}  type="primary" className={styles.right} style={{marginRight:20}}>{setRecGoodsList.disabledText}</Button>       
        <div className={styles.clear}></div>
      </div>     
      <DataTabel {...tabelProps} />
      <Modal title="选择推荐商品"
        visible={setRecGoodsList.visible}
        onOk={onOk}
        onCancel={onCancel}
        width="80%" 
        maskClosable = {false}
      >
        <div>
          <Form layout="inline">
            <FormItem label="商品名称：">
              <Input defaultValue=""/>
            </FormItem>
            <FormItem label="商品ID：">
              <Input defaultValue=""/>
            </FormItem>
            <FormItem>
              <Button type="primary">查询</Button> 
            </FormItem>
          </Form>
          <Table style={{marginTop:20}} rowKey="id" rowSelection={rowSelection} dataSource={dataSource2} columns={columns2}>
            
          </Table>
        </div>
      </Modal>
    </div>
  )
};

export default connect(({account,loading,setRecGoodsList})=>({account,loading,setRecGoodsList}))(Index);

//参数类型检测
Index.protoTypes = {
  dispatch:PropTypes.object,
  loading:PropTypes.object,
  location:PropTypes.object,
  setRecGoodsList:PropTypes.object,
};