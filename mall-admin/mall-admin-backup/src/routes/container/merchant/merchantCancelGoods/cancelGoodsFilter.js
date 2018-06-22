import React from 'react';
import PropTypes from 'prop-types'
import { Form, Input, Button, Select, DatePicker } from 'antd'
import { connect } from 'dva';
import moment from 'moment';
import CalendarLocale from 'rc-calendar/lib/locale/zh_CN';

const GoodsFilter = ({
  form: {
    getFieldDecorator,
    getFieldsValue
  },
  ...filter
})=>{  
  const FormItem = Form.Item;
  const Option = Select.Option; //下拉组件
  const { RangePicker } = DatePicker  //时间插件
  const { handleRefresh,query } = filter;

  let initialTime = []
  if (query.startTime) {
    initialTime[0] = moment(query.startTime)
  }
  if (query.endTime ) {
    initialTime[1] = moment(query.endTime)
  }

  const handleFields = (values) => {  //时间格式转化
    const { timerRange } = values
    if (timerRange.length) {
      values.timerRange = [timerRange[0].format('YYYY-MM-DD HH:mm:ss'), timerRange[1].format('YYYY-MM-DD HH:mm:ss')]
    }
    return values
  }
  const handleSubmit = () => {
    let values = getFieldsValue() //获取form域中的值
    values = handleFields(values);  //过滤时间
    console.log(values)
    values.startTime = values.timerRange[0];
    values.endTime = values.timerRange[1];
    delete values.timerRange
    handleRefresh(values) //刷新路由
  }
  const range = (start, end) => { //范围函数
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  const disabledDate = (current) => { //不可选择日期
    return current > moment().endOf('day');
  }
  const disabledRangeTime = (_, type) => {  //不可选择时间范围
    if (type === 'start') {
      return {
        disabledHours: () => range(0, 60).splice(new Date().getHours()+1, 24-new Date().getHours())
      };
    }
    return {
      disabledHours: () => range(0, 60).splice(new Date().getHours()+1, 24-new Date().getHours())
    };
  }
  
  const local = { //插件中文化
    lang: {
      rangePlaceholder: ["开始时间","结束时间"],
      month: "M月",
      year: "年",
      timeSelect: "选择时间",
      ok: "确定",
      monthFormat: 'M月',
      ...CalendarLocale,
    }
  }
    
  return (
    <Form layout="inline">
	    	<FormItem label='商品ID:'>
          {getFieldDecorator('productId', {
            initialValue: query.productId || ''
          })(
            <Input autoComplete="off" />
          )}
        </FormItem>
        <FormItem label='商品名称:'>
          {getFieldDecorator('name', {
            initialValue: query.name || ''
          })(
            <Input autoComplete="off" />
          )}
        </FormItem>
        <FormItem label='分类:'>
          {getFieldDecorator('firCate', {
            initialValue: query.firCate || ''
          })(
            <Select placeholder="请选择" style={{width:150}}>
              <Option value='' disabled key=''>请选择</Option>
              <Option value='1' key='1'>选项1</Option>
              <Option value='2' key='2'>选项2</Option>
              <Option value='3' key='3'>选项3</Option>
            </Select>
          )}
        </FormItem>
        <FormItem >
          {getFieldDecorator('secCate', {
            initialValue: query.secCate || ''
          })(
            <Select placeholder="请选择" style={{width:150}}>
              <Option value='' disabled key=''>请选择</Option>
              <Option value='11' key='11'>选项1</Option>
              <Option value='21' key='21'>选项2</Option>
              <Option value='31' key='31'>选项3</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label='选品时间:'>
          {getFieldDecorator('timerRange', {
            initialValue: initialTime
          })(
            <RangePicker
              style={{ width: 400 }}
              disabledDate={disabledDate}
              disabledTime={disabledRangeTime}
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment(new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds(), 'HH:mm:ss')],
              }}
              format='YYYY-MM-DD HH:mm:ss'
              locale={local}
            />
          )}
        </FormItem>
        
        <Button onClick={() => {handleSubmit()}} style={{marginTop:3}} type="primary">搜索</Button>
	  	</Form>
  )
}

GoodsFilter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

//将model中的state的数据绑定到组件;
export default connect(({goodsCate,loading})=>({goodsCate,loading}))(Form.create()(GoodsFilter));