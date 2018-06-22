"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
// import { routerRedux } from 'dva/router'
import { Breadcrumb, Form, Upload, Icon, Button, InputNumber, Select, Radio   } from 'antd';
// import queryString from 'query-string';
import config from '@/utils/config'
// import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import styles from './activityaway.less'
//活动管理-设置活动上架
// const confirm = Modal.confirm;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const setPutaways = ({
  setActivityPutFn,
  loading,
  dispatch, 
  location,  
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldsValue
  },
})=>{
  // const { pathname } = location;
  // const handleRefresh = (newQuery) => {
  // 	console.log(pathname)
  //   dispatch(routerRedux.push({
  //     pathname,
  //     search: queryString.stringify({
  //       ...newQuery,
  //     }),
  //   }))
  // }
  // const modalProps = {
  //   currentItem:packList.currentItem,
  //   handleRefresh:handleRefresh
  // }
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  
  function handleBlur() {
    console.log('blur');
  }
  
  function handleFocus() {
    console.log('focus');
  }
  const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 7 },
  };
  const formItemLayoutBig = {
    labelCol: { span: 2 },
    wrapperCol: { span: 3 },
  };
  const uploadMainImgButton = ( //主图
    <div>
      <Icon type={setActivityPutFn.loading && setActivityPutFn.mainImgUrl ? 'loading' : 'plus'} />
      <div className="ant-upload-text">通栏活动图</div>
    </div>
  )
  const changeListImg = (info,source) => { 
    console.log(info)
    if (info.file.status === 'uploading') {
      dispatch({type:'addGoodsModel/imgUpload',payload:{loading:true}})
      return;
    }
    if (info.file.status === 'done') {
      switch (source) {
        case 'list':
          dispatch({type:'addGoodsModel/listImgUpload',payload:{loading:false,listImgUrl:info.file.response.data.httpsPath}})
          break;
        case 'main':
          dispatch({type:'addGoodsModel/mainImgUpload',payload:{loading:false,mainImgUrl:info.file.response.data.httpsPath}})
          break;
        default:
          return false;
      }
      
    }
  }
  return (
    <div>
      <div className='formBody' style={{height: 40}}>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>活动管理</Breadcrumb.Item>
          <Breadcrumb.Item>活动上架管理</Breadcrumb.Item>
          <Breadcrumb.Item>设置活动上架</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form layout="vertical">
        <FormItem {...formItemLayout} label="选择活动:">
          {getFieldDecorator('goodPackName', {
            rules: [{ 
              required: true, 
              whitespace: true,
            }],
            validateTrigger: 'onBlur'
          })(<Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>)}
        </FormItem>
        <FormItem {...formItemLayout} label="通栏活动图:">
          {getFieldDecorator('activeImg1', {
            rules: [{ 
              required: true, 
              whitespace: true,
            }],
            validateTrigger: 'onBlur'
          })(<div style={{width:'70%',marginLeft:'15%'}}>
          <div style={{float:'left',marginRight:'10'}}>
            <Upload
              name="imageFile"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={config.api.uploadImg}
              onChange={(info) => changeListImg(info,'list')}
            >
              {setActivityPutFn.listImgUrl ? <img src={setActivityPutFn.listImgUrl} alt="avatar" /> : uploadMainImgButton}
            </Upload>
          </div>
        </div>)}
        </FormItem>
        <FormItem {...formItemLayout} label="一左一右活动图:">
          {getFieldDecorator('activeImg1', {
            rules: [{ 
              required: true, 
              whitespace: true,
            }],
            validateTrigger: 'onBlur'
          })(<div style={{width:'70%',marginLeft:'15%'}}>
          <div style={{float:'left',marginRight:'10'}}>
            <Upload
              name="imageFile"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={config.api.uploadImg}
              onChange={(info) => changeListImg(info,'list')}
            >
              {setActivityPutFn.listImgUrl ? <img src={setActivityPutFn.listImgUrl} alt="avatar" /> : uploadMainImgButton}
            </Upload>
          </div>
        </div>)}
        </FormItem>
        <FormItem {...formItemLayout} label="三栏活动图:">
          {getFieldDecorator('activeImg1', {
            rules: [{ 
              required: true, 
              whitespace: true,
            }],
            validateTrigger: 'onBlur'
          })(<div style={{width:'70%',marginLeft:'15%'}}>
          <div style={{float:'left',marginRight:'10'}}>
            <Upload
              name="imageFile"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={config.api.uploadImg}
              onChange={(info) => changeListImg(info,'list')}
            >
              {setActivityPutFn.listImgUrl ? <img src={setActivityPutFn.listImgUrl} alt="avatar" /> : uploadMainImgButton}
            </Upload>
          </div>
        </div>)}
        </FormItem>
        <FormItem {...formItemLayoutBig} label="排序号:">
          {getFieldDecorator('activeSort', {
            rules: [{ 
              required: true, 
              whitespace: true,
            }],
            validateTrigger: 'onBlur'
          })(<InputNumber min={1} placeholder="排序号" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="显示页面:">
          {getFieldDecorator('showPage', {
            rules: [{ 
              required: false, 
              whitespace: true,
            }],
            validateTrigger: 'onBlur'
          })(<RadioGroup name="radiogroup" initialValue={1}>
              <Radio value={1}>首页</Radio>
              <Radio value={2}>商城</Radio>
            </RadioGroup>)}
        </FormItem>
        <div className={styles.setActivityFnBtn}>
          <Button type="primary">保存</Button>
          <Button type="primary">上架</Button>
          <Button>取消</Button>
        </div>
      </Form>  
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({setActivityPutFn,loading})=>({setActivityPutFn,loading}))(Form.create()(setPutaways));
//类型检测
setPutaways.protoTypes = {
  setActivityPutFn:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};