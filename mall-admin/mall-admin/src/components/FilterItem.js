import React from 'react'
import { routerRedux } from 'dva/router'
import queryString from 'query-string';
import {  Form, Input, Button, Select, DatePicker } from 'antd';
import moment from 'moment';
import CalendarLocale from 'rc-calendar/lib/locale/zh_CN';

const FilterItem = ({
  form: {
    getFieldDecorator,
    getFieldsValue
  },
  ...filterProps,
}) => {
  const FormItem = Form.Item;
  const { RangePicker } = DatePicker  //时间插件
  const Option = Select.Option; //下拉组件
  const {filterArray, location, dispatch} = filterProps 
  location.query = queryString.parse(location.search) //获取当前的过滤条件
  const { pathname, query } = location;
  const handleRefresh = (newQuery) => { //当前页面刷新
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }
  let startName = ''  //时间搜索开始名称
  let endTime = ''    //时间搜索结束时间名称
  let initialCreateTime = []
  const getDateName = (children,timerRange, format) => {  //初始化时间插件时获取需要的时间名称以及格式
    startName = children[0];
    endTime = children[1];
    if(query[startName] && query[endTime]){ //如果当前搜索条件中有当前时间名称
      initialCreateTime = [moment(query[startName]), moment(query[endTime])]  //将时间日期格式化传给时间组件
      return initialCreateTime
    }else
     return []
  }
  //搜索事件
  const handelSearch = () => {  
    let values = getFieldsValue() //获取form域中的值
    values = handleFields(values);  //过滤时间
    if(startName || endTime) {  //如果有时间的话需要转为接口需要的格式
      values[startName] = values.timerRange[0];
      values[endTime] = values.timerRange[1];
      delete values.timerRange
    }
    values.pageNo = 1;
    handleRefresh(values) //刷新路由
  }
  const handleFields = (values) => {  //时间格式转化
    const { timerRange } = values
    if (timerRange && timerRange.length) {
      values.timerRange = [timerRange[0].format('YYYY-MM-DD HH:mm:ss'), timerRange[1].format('YYYY-MM-DD HH:mm:ss')]
    }
    return values
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
    <Form layout="inline" style={{marginBottom:8}} >
      {filterArray.length > 0?filterArray.map(item => (
          item.type === 'input'?
          <FormItem label={item.label} key={item.label} >
            {getFieldDecorator(item.name, { initialValue:query[item.name] || ''})(<Input autoComplete="off" />)}
          </FormItem>:
          item.type === 'select' ?
          <FormItem label={item.label} key={item.label}>
            {getFieldDecorator(item.name, { initialValue: query[item.name] || ''})(
              <Select placeholder="请选择" style={{width:150}}>
                <Option value='' disabled key=''>请选择</Option>
                {item.options.map(item1 => (
                    <Option value={item1.value} key={item1.value}>{item1.name}</Option>
                ))}
              </Select>
            )}
          </FormItem>: 
          item.type === 'timer' ?
          <FormItem label={item.label} key={item.label}>
            {getFieldDecorator(item.name, {
              initialValue:query[item.name]?getDateName(item.children,initialCreateTime,item.format):getDateName(item.children,initialCreateTime,item.format)
            })(
              <RangePicker
                style={{ width: 400 }}
                disabledDate={disabledDate}
                disabledTime={disabledRangeTime}
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment(new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds(), 'HH:mm:ss')],
                }}
                format={item.format}
                locale={local}
              />
            )}
          </FormItem>:''
        )) :''
      }
      <Button style={{marginTop:3}} type="primary" onClick={() => handelSearch()}>{filterProps.btnName?filterProps.btnName:'搜索'}</Button>
    </Form>
    
  )
}

export default Form.create()(FilterItem)

//filterProps                      搜索属性对象，参数如下
//   location                      location方法
//   dispatch                      dispatch方法,
//   filterArray : [               需要的筛选条件数组
//     {
//       label:'会员账号',          筛选前面需要的label名称
//       name:'member',            接口需要的参数名
//       type:'input'              搜索类型  input为输入框  slelect为下拉选择 timer为时间
//     },{
      //   label:'状态',           
      //   type:'select',
      //   name:'channelStatus',   接口需要的参数名
      //   options:[               下拉选择的option数组
      //     {
      //       value:'1',          筛选对应的字段值
      //       name:'启用'          筛选对应的名称
      //     },{
      //       value:'2',
      //       name:'禁用'
      //     }
      //   ]
      // },{                    
//       label:'注册时间',                         时间搜索
//       type:'timer',
//       name:'timerRange',                       名称必须为'timerRange'
//       format:'YYYY-MM-DD HH:mm:ss',            格式定义，可以不传，默认带时分秒
//       children:['startTime','endTime']         children字段必须，传入接口需要的开始、结束字段名，顺序不可乱
//     }  
//   ]
// }

//示例如下
// const filterProps = {
//   location:location,
//   dispatch:dispatch,
//   filterArray : [
//     {
//       label:'渠道名称',
//       name:'channelName',
//       type:'input'
//     },{
//       label:'状态',
//       type:'select',
//       name:'channelStatus',
//       options:[
//         {
//           value:'1',
//           name:'启用'
//         },{
//           value:'2',
//           name:'禁用'
//         }
//       ]
//     },{
//       label:'时间范围',
//       type:'timer',
//       name:'timerRange',
//       format:'YYYY-MM-DD HH:mm:ss',
//       children:['startTime','endTime']
//     }
//   ],
//   btnName: //string default '搜索' 非必须 按钮名称
// }