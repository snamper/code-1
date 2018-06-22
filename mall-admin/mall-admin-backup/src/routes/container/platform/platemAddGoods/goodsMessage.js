"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Modal, Form, Input, message, Select, Divider, Upload, Icon } from 'antd';
import config from '@/utils/config'
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

const confirm = Modal.confirm;
const FormItem = Form.Item;
const Option = Select.Option;
const GoodsMessage = ({addGoodsModel,loading,dispatch, location,form: {
  getFieldDecorator,
  validateFieldsAndScroll
},})=>{
  
  const confirmModal = () => {
    console.log(addGoodsModel.goodsDetail)
    validateFieldsAndScroll((errors, values) => {
      if(errors){
        return
      }else{
        confirm({
          title: '您确定保存修改吗？',
          okText:'确定',
          cancelText:'取消',
          onOk() {
              dispatch({type:'addGoodsModel/disabletchannel'})
              .then((result) => {
                if(result.message === '成功'){
                  message.success("修改成功");
                }else{
                  message.error(result.message);
                }
              })
          },
          onCancel() {
            return;
          },
        });
      }
    })
  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 10 },
      sm: { span: 5 },
    }
  };
  const uploadListImgButton = ( //列表图
    <div>
      <Icon type={addGoodsModel.loading && addGoodsModel.listImgUrl ? 'loading' : 'plus'} />
      <div className="ant-upload-text">列表图</div>
    </div>
  );
  const uploadMainImgButton = ( //主图
    <div>
      <Icon type={addGoodsModel.loading && addGoodsModel.mainImgUrl ? 'loading' : 'plus'} />
      <div className="ant-upload-text">商品主图</div>
    </div>
  )
  const uploadDetailImgButton = (  //细节图
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">细节图</div>
    </div>
  );
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
  const changeDetailImg = (fileList ) => { //细节图
    console.log(fileList)
    dispatch({type:'addGoodsModel/mainImgUpload',payload:{loading:false,fileList:fileList}})
  }
  const handlePreview = (file) => {
    dispatch({type:'addGoodsModel/preview',previewImage: file.url || file.thumbUrl,previewVisible: true,})
  }
  const toolbarOptions = {toolbar:[  
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons  
    ['blockquote', 'code-block'],  

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values  
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],  
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript  
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent  
    [{ 'direction': 'rtl' }],                         // text direction  

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown  
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],  

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme  
    [{ 'font': [] }],  
    [{ 'align': [] }],  
    ['link', 'image', 'video'],  
    ['clean']                                         // remove formatting button  
]};  
  const changeGoodsDetail = (value) => {
    dispatch({type:'addGoodsModel/changeGoodsDetail',value})
  }
  return (
    <div style={{marginTop:50}}>
      <Form layout="horizontal">
        { addGoodsModel.isUpdate || addGoodsModel.ifShowDetail ?
            <FormItem label="商品分类" {...formItemLayout}>
              <span>手机数码  —  手机  —  智能手机</span>
            </FormItem>:''
        }
        <Divider orientation="left" style={{width:'80%',marginLeft:'10%'}}>供货信息</Divider>
        <FormItem label="供货商" {...formItemLayout}>
        {addGoodsModel.isUpdate || addGoodsModel.ifShowDetail?<span>京东</span>:getFieldDecorator('password', {
            initialValue:  '',
            rules: [{required: true, message: '请选择供货商'}]
        })(
          <Select >
            <Option value="">请选择供货商</Option>
            <Option value="1">选项1</Option>
            <Option value="2">选项2</Option>
            <Option value="3">选项3</Option>
          </Select>
        )}
        </FormItem>
        <FormItem label="商品名称" {...formItemLayout} >
          {addGoodsModel.ifShowDetail?<span>京东E卡5元</span>:getFieldDecorator('goodsName', {
                initialValue: '',
                rules: [{required: true , message: '请输入商品名称'}],
                validateTrigger:'onBlur'
            })(
              <Input autoComplete="off"/>
          )}
        </FormItem>   
        <Divider orientation="left" style={{width:'80%',marginLeft:'10%'}}>商品信息</Divider>
        <FormItem label="建议售价" {...formItemLayout} >
          {addGoodsModel.ifShowDetail?<span>5元</span>:getFieldDecorator('price4', {
                initialValue: '',
                rules: [{required: true, pattern:/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '请输入数字类型建议售价'}]
            })(
              <span><Input autoComplete="off" style={{width:'80%'}}/>元</span>
          )}
        </FormItem> 
        <FormItem label="渠道售价" {...formItemLayout} >
          {addGoodsModel.ifShowDetail?<span>5元</span>:getFieldDecorator('price1', {
                initialValue: '',
                rules: [{required: true, pattern:/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '请输入数字类型渠道售价'}]
            })(
              <span><Input autoComplete="off" style={{width:'80%'}}/>元</span>
          )}
        </FormItem> 
        <FormItem label="成本价" {...formItemLayout} >
          {addGoodsModel.ifShowDetail?<span>5元</span>:getFieldDecorator('price2', {
                initialValue: '',
                rules: [{required: true, pattern:/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '请输入数字类型成本价'}]
            })(
              <span><Input autoComplete="off" style={{width:'80%'}}/>元</span>
          )}
        </FormItem> 
        <FormItem label="库存" {...formItemLayout} >
          {addGoodsModel.isUpdate || addGoodsModel.ifShowDetail?<span>1000 个</span>:getFieldDecorator('store', {
                initialValue: '',
                rules: [{ pattern:/^\d+$/, message: '请输入数字整数'}]
            })(
              <span><Input autoComplete="off" style={{width:'80%'}}/>个</span>
          )}
        </FormItem> 
        <Divider orientation="left" style={{width:'80%',marginLeft:'10%'}}>商品图片</Divider>
        <div style={{width:'70%',marginLeft:'15%'}}>
          <div style={{float:'left',marginRight:'10'}}>
            <Upload
              name="imageFile"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={config.api.uploadImg}
              onChange={(info) => changeListImg(info,'list')}
            >
              {addGoodsModel.listImgUrl ? <img src={addGoodsModel.listImgUrl} alt="avatar" /> : uploadListImgButton}
            </Upload>
          </div>
          <div style={{float:'left',marginRight:'10'}}>
            <Upload
              name="imageFile"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={config.api.uploadImg}
              onChange={(info) => changeListImg(info,'main')}
            >
              {addGoodsModel.mainImgUrl ? <img src={addGoodsModel.mainImgUrl} alt="avatar" /> : uploadMainImgButton}
            </Upload>
          </div>
          <div style={{float:'left',marginRight:'10',minWidth:500}}>
            <Upload
              name="imageFile"
              multiple={true}
              action={config.api.uploadImg}
              listType="picture-card"
              fileList={addGoodsModel.imgList}
              onPreview={handlePreview}
              onChange={changeDetailImg}
            >
              {addGoodsModel.imgList.length >= 4 ? null : uploadDetailImgButton}
            </Upload>
            <Modal visible={addGoodsModel.previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={addGoodsModel.previewImage} />
            </Modal>
          </div>
          <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
        </div>
        <Divider orientation="left" style={{width:'80%',marginLeft:'10%'}}>商品详情</Divider>
        {addGoodsModel.ifShowDetail?
          <div style={{width:'70%',marginLeft:'15%'}}>这里是商品详情</div>:
          <ReactQuill onChange={changeGoodsDetail} style={{width:'70%',marginLeft:'15%',height:400}} modules={toolbarOptions} value={addGoodsModel.goodsDetail}  />
        }
        {addGoodsModel.ifShowDetail ?'':<Button onClick={() => confirmModal()} style={{marginLeft:'30%',marginTop:80}}>保存</Button>}
      </Form>
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({addGoodsModel,loading})=>({addGoodsModel,loading}))(Form.create()(GoodsMessage));
//类型检测
GoodsMessage.protoTypes = {
  addGoodsModel:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};

