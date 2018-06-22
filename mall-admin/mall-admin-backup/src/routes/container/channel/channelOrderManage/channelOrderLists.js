"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Form, Input, Button, Table, Breadcrumb, Pagination, DatePicker, Modal, message } from 'antd'; //子页面内需要引入的UI模块
import moment from 'moment';
import queryString from 'query-string'
import { routerRedux } from 'dva/router'
import styles from './index.less' //引入样式

//渠道列表点击查看详情进入的二级渠道订单列表
const confirm = Modal.confirm;
const channelOrderManage = ({
  channelOrderListItem,
  loading,
  dispatch,
  location,
  onFilterChange,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldsValue
  },
})=>{
  const FormItem = Form.Item;
  const columns = [{
    title: '序号',
    dataIndex: 'idx',
    key: '1',
    render:(text,record,index) => (<span>{(channelOrderListItem.currentPage-1)*channelOrderListItem.pageSize+index+1}</span>),
    className: styles.tableTextCtnter,
  }, {
    title: '支付单号',
    dataIndex: 'trade_no',
    key: 'trade_no',
    className: styles.tableTextCtnter,
  }, {
    title: '订单编号',
    dataIndex: 'orderno',
    key: 'orderno',
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
    title: '手机号',
    dataIndex: 'payment_phone',
    key: 'payment_phone',
    className: styles.tableTextCtnter,
  }, {
    title: '消耗积分',
    dataIndex: 'point',
    key: 'point',
    className: styles.tableTextCtnter,
  }, {
    title: '消耗金额',
    dataIndex: 'payment_amount',
    key: 'payment_amount',
    className: styles.tableTextCtnter,
    render: (text, record) => (
      <span>{record.payment_amount/100}</span>
    )
  }, {
    title: '订单状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => (
      <span>
      	{text === 1?'未付款':text === 2?'已完成':text === 3?'已取消':text === 4?'已关闭':text === 5?'兑换状态未知':text === 6?'积分已支付现金未支付':text === 7?'兑换失败':text === '8'?'已支付':''}
      </span>
    ),
    className: styles.tableTextCtnter,
  }, {
    title: '交易时间',
    dataIndex: 'create_time',
    key: 'create_time',
    className: styles.tableTextCtnter,
  }, {
    title: '支付状态',
    dataIndex: 'payment_status',
    key: 'payment_status',
    render: (text, record) => (
      <span>{text === '1'?'未支付':text === '2'?'已支付':text === '3'?'已退款':''}</span>
    ),
    className: styles.tableTextCtnter,
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
      {
      	record.need_refund_flag === 1?
      	<a onClick={() => orderRefund(record.id)}>退款</a>:
      	record.need_refund_flag === 2?
      	'已关闭':''
      }
      {	record.metchant_deliver_way === 2 && record.ship_status === 0 && record.status === 8?
      	<a onClick={() => orderDelive(record.id)}>发货</a>:''
      }
      </span>
    ),
    className: styles.tableTextCtnter,
  }];
  //获取地址栏里面的参数
  location.query = queryString.parse(location.search);
  const { query } = location;
  let orderProductName = ''
  if(query.orderProductName) orderProductName = query.orderProductName
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  };
  //退款操作
  const orderRefund = (orderId) => {
    confirm({
      title: '您确定执行此次操作吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
        dispatch({type:'channelOrderListItem/orderRefundBtnFn',orderId:orderId})
        .then((result) => {
      	  if(result.message !== '成功'){
            message.error(result.message);
            return;
      	  }
          dispatch({type:'channelOrderListItem/query',pageNo:channelOrderListItem.currentPage,pageSize:channelOrderListItem.pageSize})
        })
      },
      onCancel() {
        console.log('取消了')
      },
    });
  }
  //发货操作
  const orderDelive = (orderId) => {
  	console.log(orderId)
    confirm({
      title: '您确定执行发货操作吗？',
      okText:'确定',
      cancelText:'取消',
      onOk() {
      	dispatch({type:'channelOrderListItem/orderDeliveBtnFn',orderId:orderId}).then((result) => {
      		console.log(result)
      	  if(result.message !== '成功'){
      		message.error(result.message);
      		return;
      	  }
          dispatch({type:'channelOrderListItem/query',pageNo:channelOrderListItem.currentPage,pageSize:channelOrderListItem.pageSize})
        })
      },
      onCancel() {
        console.log('取消了')
      },
    });
  }
  const startTimeChange = (key,values) => {
    console.log(key,values)
    dispatch({
      type:'channelOrderListItem/changeTimeRange',
      startValue:values,
      endValue:channelOrderListItem.endValue,
    })
  }
  
  const endTimeChange = (key,values) => {
    dispatch({
      type:'channelOrderListItem/changeTimeRange',
      startValue:channelOrderListItem.startValue,
      endValue:values,
    })
  }
  const handleStartOpenChange = (open) => {
    if (!open) {
      dispatch({
        type:'channelOrderListItem/changeOpen',
        endOpen:open
      })
    }
  }
  const handleEndOpenChange = (open) => {
    dispatch({
      type:'channelOrderListItem/changeOpen',
      endOpen:open
    })
  }
  const disabledStartDate = (startValue) => {
    const endValue = channelOrderListItem.endValue;
    if(startValue && !endValue){
      // console.log(startValue , endValue.valueOf(), moment())
      return startValue > moment();
    }else if(!startValue && endValue){
      console.log(startValue , endValue.valueOf(), moment())
      return startValue > moment();
    }else if(!startValue && !endValue){
      return false
    }
    // return startValue > moment();
    return startValue > endValue.valueOf() && startValue < new Date().valueOf();
  }

  const disabledEndDate = (endValue) => {
    const startValue = channelOrderListItem.startValue;
    if (!endValue || !startValue) {
      return endValue > moment();
    }
    return endValue.valueOf() < startValue || endValue.valueOf() > moment() ;
  }

  const handleSubmit = () => {
    const values = getFieldsValue()
    orderProductName = values.orderProductName;
    const data = {
      orderProductName:orderProductName,
      orderCreateStartTime:channelOrderListItem.startValue,
      orderCreateEndTime:channelOrderListItem.endValue
    }
    console.log(data)
    handleRefresh(data);
  }
  const changePage = (pageNo, pageSize) => {//翻页刷新的时候只改变页码字段
    handleRefresh({pageNo:pageNo,pageSize:pageSize})
  }
  return (
    <div>
	  <Breadcrumb separator=">" style={{marginBottom: 20}}>
	    <Breadcrumb.Item>渠道订单管理</Breadcrumb.Item>
	    <Breadcrumb.Item>渠道订单管理</Breadcrumb.Item>
	  </Breadcrumb>
	  <div className={styles.channelNameBox}>渠道名称: {query.channelName}</div>
	  <div className={styles.searchBox}>
	  	<Form layout="inline">
        <FormItem label="商品名称：">
            {getFieldDecorator('orderProductName', { initialValue: orderProductName })(<Input placeholder="商品名称" autoComplete="off"  />)}
	      </FormItem>
	      <FormItem
	        label="下单时间："
	      >
	      	{getFieldDecorator('orderCreateStartTime', {
            initialValue:channelOrderListItem.startValue?moment(channelOrderListItem.startValue, 'YYYY-MM-DD'):channelOrderListItem.startValue
          })(
            <DatePicker 
              placeholder="开始时间"
              format= 'YYYY-MM-DD'
              onChange = {(key,values) => startTimeChange(key,values)}
              onOpenChange={(open) => handleStartOpenChange(open)}
              disabledDate={(startValue) => disabledStartDate(startValue)}
          	/>
          )}
          </FormItem>
          <FormItem label="至" colon={false}>
          {getFieldDecorator('orderCreateEndTime', {
            initialValue:channelOrderListItem.endValue?moment(channelOrderListItem.endValue, 'YYYY-MM-DD'):channelOrderListItem.endValue
          })(
            <DatePicker 
              placeholder="结束时间"
              format= 'YYYY-MM-DD' 
              onChange = {(key,values) => endTimeChange(key,values)}
              open={channelOrderListItem.endOpen}
              onOpenChange={(open) => handleEndOpenChange(open)}
              disabledDate={(endValue) => disabledEndDate(endValue)}
            />
          )}
	      </FormItem>
	      <Button type="primary" className={styles.searchBtn} onClick={() => handleSubmit(validateFieldsAndScroll)}>搜索</Button>
	    </Form>
	  </div>
    <Table columns={columns} rowKey={record => record.id} dataSource={channelOrderListItem.dataSource} pagination={false} bordered={true} />
      <div style={{width:'100%',height:'50px',paddingTop:'15px'}}>
        <Pagination 
          showSizeChanger   
          defaultCurrent={channelOrderListItem.currentPage} 
          onChange={(pageNo, pageSize) => {changePage(pageNo, pageSize)}}  
          onShowSizeChange={(pageNo, pageSize) => {changePage(pageNo, pageSize)}} 
          total={channelOrderListItem.totalSize} 
          defaultPageSize={channelOrderListItem.pageSize} 
        />
      </div>
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({channelOrderListItem,loading})=>({channelOrderListItem,loading}))(Form.create()(channelOrderManage));
//类型检测
channelOrderManage.protoTypes = {
  channelOrderListItem:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};