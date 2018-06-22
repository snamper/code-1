import React from 'react';
import { Modal, Form, Input, DatePicker, Upload, Icon, message } from 'antd';
import PropTypes from 'prop-types'
import moment from 'moment';
import { connect } from 'dva';
import config from '@/utils/config.js'
import CalendarLocale from 'rc-calendar/lib/locale/zh_CN';
import { routerRedux } from 'dva/router'

//设置首页banner弹窗组件
const FormItem = Form.Item;
const bannerDialog = ({
  banner,
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
  ...modalProps
})=>{  
	const { location } = modalProps
	const { pathname } = location
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname
    }))
  }
  const { RangePicker } = DatePicker  //时间插件
  const uploadImgButton = (  //上传按钮
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">上传</div>
    </div>
  );
  const handleChange = (info) => { 
    if (info.file.status === 'uploading') {
      dispatch({type:'banner/imgLoadding',payload:{imgLoading:true}})
      return;
    }
    if (info.file.status === 'done') {
      dispatch({type:'banner/imgUploadDown',imgUrl:info.file.response.data.httpsPath}) 
    }
  }
  const onOk = function(){  //异步保存操作
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        console.log(errors)
      }else{
        let data = {
          title:values.title,
          startTime:values.timeRange[0].format('YYYY-MM-DD HH:mm:ss'),
          endTime:values.timeRange[1].format('YYYY-MM-DD HH:mm:ss'),
          imgUrl:banner.imgUrl,
          redirectUrl:values.redirect_url
        }
        banner.isUpload ? data.id = banner.bannerId :'';
        dispatch({type:!banner.isUpload?'banner/addMessage':'banner/saveMessage',data})
        .then((result) => {
          if(result.message !== '成功'){
            message.destroy()
            message.error(result.message)
            return;
          }
          message.success("保存成功！")
          dispatch({type:'banner/clearStatus'})
          handleRefresh()
        })
      }
    })
    
  }
	
  const onCancel = function(){
    dispatch({type:"banner/hideModal"});
  }
  const formItemLayout = {
    labelCol:{span:6},
    wrapperCol:{span:14},
  }
  //时间插件
  let initialCreateTime = []
  const timeChange = (startTime,endTime) => {  //初始化时间插件时获取需要的时间名称以及格式
    initialCreateTime = [moment(startTime), moment(endTime)]  //将时间日期格式化传给时间组件
    return initialCreateTime
  }
  const range = (start, end) => { //范围函数
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  const disabledDate = (current) => { //不可选择日期
  	if(current)
    	return current.endOf('day') < moment().endOf('day');
    else return false
  }
  const disabledRangeTime = (_, type) => {  //不可选择时间范围
    if (type === 'start' && _ && _[0] && _[0].endOf('day') <= moment().endOf('day')) {
      return {
        disabledHours: () => range(0, 24).splice(0,new Date().getHours())
      };
    }

	if(_ && _[1] && _[0] && _[1].endOf('day') > _[0].endOf('day')){	//如果不是同一天
			return false
   }else{	//如果是同一天
    	return {
      	disabledHours: () => range(0, 24).splice(0,new Date().getHours())
    	};
    }
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
  const timeConfig = {
  	hideDisabledOptions: true,
  	defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss')],
	}
	return (
    <Modal 
        visible={banner.visible}
        onOk={onOk}
        okText='确定'
        cancelText={'取消'}
        onCancel={onCancel} 
        width={600}
        title="banner设置" >
        <Form layout="inline">
          <FormItem {...formItemLayout}
            label="标题："
            style={{width:"100%"}}
          >
            {getFieldDecorator('title', {
              initialValue: banner.bannerDetail.title,
              rules: [{ required: true, message: '请输入标题!'}],
            })(
              <Input autoComplete="off" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="banner图："
            required={true}
            style={{width:"100%"}}
          >
            <Upload
              name="imageFile"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={config.api.uploadImg}
              onChange={(info) => handleChange(info)}
            >
              {banner.imgUrl ? <img style={{maxWidth:160,maxHeight:160}} src={banner.imgUrl} alt="avatar" /> : uploadImgButton}
            </Upload>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="上下线时间："
            style={{width:"100%"}}
          >
            {getFieldDecorator('timeRange', {
              initialValue:banner.bannerDetail.start_time?timeChange(banner.bannerDetail.start_time,banner.bannerDetail.end_time):initialCreateTime,
              rules: [{ required: true, message: '请选择上下线时间：!'}],
            })(
              <RangePicker
                style={{ width: 400 }}
                
                showTime={true}
                format='YYYY-MM-DD HH:mm:ss'
                locale={local}
              />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="跳转链接："
            style={{width:"100%"}}
          >
            {getFieldDecorator('redirect_url', {
              initialValue: banner.bannerDetail.redirect_url,
              rules: [{ required: false, message: '请输入跳转链接!', whitespace: true }],
            })(
              <Input autoComplete="off" />
            )}
          </FormItem>
        </Form>      
      </Modal>  
	);
}

bannerDialog.propTypes = {
  form: PropTypes.object,
  setBannerLis: PropTypes.object,
}

//将model中的state的数据绑定到组件;
export default connect(({banner,loading})=>({banner,loading}))(Form.create()(bannerDialog));