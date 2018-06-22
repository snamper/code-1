'use strict';
/**
 * 推荐商品管理页
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import {Form,Input,Col,DatePicker,Table,Button} from "antd";
import styles from './index.less';

const FormItem = Form.Item;
const formitemLayout = {
  labelCol:{span:6},
  wrapperCol:{span:18}
};
const data =[];
for(let i=0;i<45;i++){ 
  data.push({
  	id:i,
  	product_id:`10000${i}`,
  	product_name:`tester${i}`,
  	supplier:`2018/5/${i}`,
  	cost_price:`10000${i}`,
  	channel_price:`10000${i}`,
  	sale:`10000${i}`,
  	total:`10000${i}`,
  	time:`2018/5/${i}`,
  })	
};
const rowSelection = {};
const columns =[
  {
  	title:"序号",
  	dataIndex:"id",
  	key:"id",
  },
  {
  	title:"商品ID",
  	dataIndex:"product_id",
  	key:"product_id"
  },{
  	title:"商品名称",
  	dataIndex:"product_name",
  	key:"product_name",
  },{
  	title:"供货商",
  	dataIndex:"supplier",
  	key:"supplier"
  },{
  	title:"成本价（元）",
  	dataIndex:"cost_price",
  	key:"cost_price"
  },{
  	title:"渠道价（元）",
  	dataIndex:"channel_price",
  	key:"channel_price"
  },{
  	title:"建议售价（元）",
  	dataIndex:"sale",
  	key:"sale"
  },{
  	title:"库存总量",
  	dataIndex:"total",
  	key:"total",
  },{
  	title:"进货时间",
  	dataIndex:"time",
  	key:"time"
  },{
  	title:"操作",
  	render:(text)=>(
      <a >恢复</a>   //
  	)
  }
];
const GoodsBackup = ({goodsBackup,loading,dispatch,location})=>{
  return (
    <div>
      <Form 
      layout="inline" 
      > 
        <Col>
        <FormItem 
          {...formitemLayout}
          label="商品ID："
          className={styles.formItem}
        >
          <Input/>
        </FormItem>
        <FormItem
          {...formitemLayout}          
          label="供货商："
          className={styles.formItem}
        >
          <Input/>
        </FormItem>
        </Col>
        <Col>
        <FormItem  
          {...formitemLayout}     
          label="商品名称："
          className={styles.formItem}
        >
          <Input/>
        </FormItem>
        <FormItem  
          {...formitemLayout}
          label="进货时间："
          className={styles.formItem}
        > 
          <Col span="8">
            <DatePicker placeholder="起始时间"/>
          </Col>
          <Col span="2">
            <span>至</span>
          </Col>
          <Col span="8">
            <DatePicker placeholder="终止时间"/>
          </Col> 
          <Col span="6">
            <Button type="primary" style={{marginLeft:22}}>查询</Button>
          </Col>       
        </FormItem>
        </Col>
      </Form>
      <div className={styles.btnGroup}>
        <Button className={styles.right} type="primary">批量恢复</Button>
        <div className={styles.clear}></div>
      </div>
      <Table style={{marginTop:20}} rowSelection={rowSelection} columns={columns} dataSource={data} rowKey="id" />
    </div>
  )
};

export default connect(({goodsBackup,account,loading})=>({account,loading}))(Form.create()(GoodsBackup));

//参数类型检测
GoodsBackup.protoTypes = {
  dispatch:PropTypes.object,
  loading:PropTypes.object,
  location:PropTypes.object,
  goodsBackup:PropTypes.object,
};