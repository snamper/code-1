import React from 'react';
import { Modal, Form, Input, DatePicker, Upload, Icon, message } from 'antd';
import PropTypes from 'prop-types'
import moment from 'moment';
import { connect } from 'dva';
import config from '../../../utils/config.js'

//设置首页banner弹窗组件
const FormItem = Form.Item;
const setHomeBannerDialog = ({
  setBannerLis,
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
})=>{   
  const formItemLayout = {
    labelCol: {
      xs: { span: 18 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 26 },
      sm: { span: 14},
    }
  };
 
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  const handleChange = (info,file) => {
    if (info && info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => dispatch({type:'setBannerLis/uploadImgDown',imageUrl:info.file.response.data.httpsPath}))
    }
  }
  const checkMessage = (validateFieldsAndScroll) => {
    // if(!values.start_time || !values.end_time){
    //   message.error("请选择时间");
    //   return;
    // }
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        console.log(errors)
      }else{
        console.log(values)
        let data = {
          title:values.title,
          startTime:setBannerLis.startTime,
          endTime:setBannerLis.endTime,
          imgUrl:setBannerLis.imgUrl,
          channel:setBannerLis.channelId,
          redirectUrl:values.redirect_url
        }
        if(setBannerLis.isUpload){
          data.id = setBannerLis.bannerId;
        }
        dispatch({type:!setBannerLis.isUpload?'setBannerLis/addMessage':'setBannerLis/saveMessage',data})
        .then((result) => {
          if(result.message !== '成功'){
            message.error(result.message)
            return;
          }
          message.success("保存成功！",1,dispatch({type:'setBannerLis/query',payload:{channelId:setBannerLis.channelId}}))
        })
      }
    })
  }
  const startTimeChange = (key,values) => {
    console.log(values)
    dispatch({
      type:'setBannerLis/changeTime',
      startTime:values,
      endTime:setBannerLis.endTime
    })
  }
  
  const endTimeChange = (key,values) => {
    dispatch({
      type:'setBannerLis/changeTime',
      startTime:setBannerLis.startTime,
      endTime:values
    })
  }
	return (
    <Modal
	    visible={setBannerLis.homeBannerVisuble}
	    onCancel={() => {dispatch({type:'setBannerLis/hideHomeBannerDialog'})}}
	    cancelText={'取消'}
	    title={'banner设置'}
	    okText={'确定'}
	    onOk={() => checkMessage(validateFieldsAndScroll)}
	    width={700}
    >
	    <Form onSubmit={this.handleSubmit}>
	    	<FormItem
          {...formItemLayout}
          label='标题:'
        >
          {getFieldDecorator('title', {
            initialValue: setBannerLis.bannerDetail.title,
            rules: [{ required: true, message: '请输入标题!', whitespace: true }],
          })(
            <Input autoComplete="off" />
          )}
        </FormItem>
        <FormItem
        	{...formItemLayout}
          label="*banner图:"
        >
          <Upload
            name="imageFile"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={config.api.uploadImg}
            onChange={(info,file) => handleChange(info,file)}
          >
            {setBannerLis.imgUrl ? <img src={setBannerLis.imgUrl} style={{maxWidth:160,maxHeight:160}} alt="imgUrl" /> : 
            <div>
              <Icon type={!loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>}
          </Upload>
          
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="上下线时间"
        >
          {getFieldDecorator('start_time', {
            initialValue:setBannerLis.startTime?moment(setBannerLis.startTime, 'YYYY-MM-DD HH:mm:ss'):setBannerLis.startTime,
            rules: [{ required: true, message: '请选择上线时间!'}],
          })(
            <DatePicker 
              showTime={{format: 'YYYY-MM-DD HH:mm:ss'}} 
              format= 'YYYY-MM-DD HH:mm:ss' 
              renderExtraFooter={() => '上线时间'}
              onChange = {(key,values) => startTimeChange(key,values)}
          />
          )}
          至
          {getFieldDecorator('end_time', {
            initialValue:setBannerLis.endTime?moment(setBannerLis.endTime, 'YYYY-MM-DD HH:mm:ss'):setBannerLis.endTime,
            rules: [{ required: true, message: '请选择下线时间!'}],
          })(
            <DatePicker 
              showTime={{format: 'YYYY-MM-DD HH:mm:ss'}} 
              format= 'YYYY-MM-DD HH:mm:ss' 
              renderExtraFooter={() => '下线时间'} 
              onChange = {(key,values) => endTimeChange(key,values)}
            />
          )}
        </FormItem>
        <FormItem
        	{...formItemLayout}
          label="跳转链接:"
        >
          {getFieldDecorator('redirect_url', {
            initialValue: setBannerLis.bannerDetail.redirect_url,
            rules: [{ required: false, message: '请输入跳转链接!', whitespace: true }],
          })(
            <Input autoComplete="off" />
          )}
        </FormItem>
	  	</Form>
    </Modal>
	);
}

setHomeBannerDialog.propTypes = {
  form: PropTypes.object,
  setBannerLis: PropTypes.object,
}

//将model中的state的数据绑定到组件;
export default connect(({setBannerLis,loading})=>({setBannerLis,loading}))(Form.create()(setHomeBannerDialog));