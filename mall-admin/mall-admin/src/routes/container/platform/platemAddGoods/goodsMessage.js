"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'dva';
import { Button, Modal, Form, Input, message, Select, Divider, Upload, Icon,Radio, DatePicker  } from 'antd';
import config from '@/utils/config'
import queryString from 'query-string';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import { routerRedux } from 'dva/router'

const confirm = Modal.confirm;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

const GoodsMessage = ({addGoodsModel,dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
  },
  ...goodsProps
})=>{
  const { redict, listImgUrl, mainImgUrl, isUpdate, productMerchant, goodsDetail, loading, ifShowDetail, currentProduct, imgList, exchangeMessage, extendedDetail, fileList } = goodsProps
  const confirmModal = () => {
    
    validateFieldsAndScroll((errors, values) => {
      if(errors){
        return
      }else{
        if(!addGoodsModel.listImgUrl.imgUrl){
          message.destroy();
          message.error("请选择商品列表图！")
          return;
        }
        if(!addGoodsModel.mainImgUrl.imgUrl){
          message.destroy();
          message.error("请选择商品主图！")
          return;
        }
        
        confirm({
          title: '您确定保存修改吗？',
          okText:'确定',
          cancelText:'取消',
          onOk() {
            let data = {}
            let userMessage = getCookie('userMessage');
            userMessage = JSON.parse(userMessage)
            if(!addGoodsModel.isUpdate){ //新增
              data = {  //商品基本信息
                classify:{parentId:addGoodsModel.chooseCateId[0]}, //分类id
                merchantId:values.merchant.split("/")[0],  //供货商id
                creator:userMessage.userId,                //创建人
                createName:unescape(userMessage.name),
                channelType:addGoodsModel.productMerchant === '1' ? '10000' : '0',        // 渠道类型
                merchantShortName:values.merchant.split("/")[1] //供应商名称
              };
              if(addGoodsModel.chooseCateId[1]) data.classify.childId = addGoodsModel.chooseCateId[1]
            }else{                      //修改
              data = {  //商品基本信息
                merchantId:addGoodsModel.currentProduct.product_detail.merchant_id,  //供货商id
                id:addGoodsModel.goodsId, //商品id
                creator:userMessage.userId,                //创建人
                createName:unescape(userMessage.name),
                channelType:addGoodsModel.productMerchant === '1' ? '10000' : '0',        // 渠道类型
                merchantShortName:addGoodsModel.currentProduct.product_detail.merchant_short_name //供应商名称
              };
            }
            if(addGoodsModel.isUpdate)
              data.imgUrlInfo = [
                {imgUrl:addGoodsModel.listImgUrl.imgUrl, type:1,img_id:addGoodsModel.listImgUrl.img_id},
                {imgUrl:addGoodsModel.mainImgUrl.imgUrl,  type:2,img_id:addGoodsModel.mainImgUrl.img_id}
              ]
            else data.imgUrlInfo = [
              {imgUrl:addGoodsModel.listImgUrl.imgUrl,  type:1},//列表图
              {imgUrl:addGoodsModel.mainImgUrl.imgUrl,  type:2} //主图
            ]
            data.fullName = values.fullName;  //商品名称
            data.costPrice = values.costPrice; //成本价 
            data.retailPrice = values.retailPrice; //建议售价
            data.channelPrice = values.channelPrice; //渠道售价
            data.productDescribe = addGoodsModel.goodsDetail;   //商品详情
            if(addGoodsModel.imgList.length > 0){
              addGoodsModel.imgList.map(item => (  //细节图
                <span>
                  {addGoodsModel.isUpdate?
                    data.imgUrlInfo.push({imgUrl:item.imgUrl, img_id:item.img_id,type:3}):
                    data.imgUrlInfo.push({imgUrl:item.imgUrl, type:3})}
                </span>
              ))
            }
            dispatch({type:addGoodsModel.isUpdate ?'addGoodsModel/UpdateMessage' :'addGoodsModel/saveMessage',data})
            .then((result) => {
              if(result.message === '成功'){
                if(addGoodsModel.productMerchant === '1'){  //如果是为赚动特殊商品
                  console.log(values)
                  let productMessage = {
                    id:result.data || addGoodsModel.goodsId,  //新增会返回商品id  否则编辑从状态中取值
                    productAdAttr:values.productAdAttr        //商品广告属性
                  }
                  if(values.productAdAttr === '1'){ //购买商品
                    productMessage.exchangeMethods = values.exchangeMethods //兑换方式
                    if(values.exchangeMethods === '2'){ //H5链接
                      productMessage.hasExchangeCode = values.hasExchangeCode;  //是否需要兑换码
                      productMessage.exchangeUrl = values.exchangeUrl;  //兑换链接
                      productMessage.dataTransfer = 2;
                    }else{  //API接口
                      productMessage.accountType = values.accountType;  //账号类型
                    }
                    productMessage.usefulTime = values.usefulTime.format('YYYY-MM-DD HH:mm:ss');
                    productMessage.announcements = values.announcements;
                    productMessage.useFlow = values.useFlow;
                    productMessage.statement = values.statement;
                    productMessage.numberPurchasedIn30Days = values.numberPurchasedIn30Days;
                    productMessage.purchaseSucceedsMsg = values.purchaseSucceedsMsg;
                  }else if(values.productAdAttr === '2'){ //广告商品
                    productMessage.announcements = values.announcements;
                    productMessage.useFlow = values.useFlow;
                    productMessage.statement = values.statement;
                  }else{  //充值商品
                    productMessage.numberPurchasedIn30Days = values.numberPurchasedIn30Days;
                    productMessage.prepaidRefillMsg = values.prepaidRefillMsg;
                    productMessage.flowRechargeMsg = values.flowRechargeMsg;
                    productMessage.usefulTime = values.usefulTime.format('YYYY-MM-DD HH:mm:ss');
                  }
                  dispatch({type:'addGoodsModel/setExchange',productMessage})
                  .then((res) => {
                    if(res.message === '成功'){
                      message.success('保存成功')
                      dispatch({type:'addGoodsModel/changeStep'})
                      if(addGoodsModel.isUpdate){
                        if(redict === 'audit') dispatch(routerRedux.push({pathname:'/platform/checkPendingGoods'}))
                        else dispatch(routerRedux.push({pathname:'/platform/platemGoodsHouse'}))
                      }
                      else 
                        window.location.reload()
                    }else{
                      message.destroy()
                      message.error(res.message)
                      return;
                    }
                  })
                }else{
                  message.success("保存成功");
                  if(addGoodsModel.isUpdate){
                    if(redict === 'audit') dispatch(routerRedux.push({pathname:'/platform/checkPendingGoods'}))
                    else dispatch(routerRedux.push({pathname:'/platform/platemGoodsHouse'}))
                  }
                    // dispatch(routerRedux.push({pathname:'/platform/platemGoodsHouse'}))
                  else setTimeout(function(){
                    dispatch({type:'app/noLoading',noLoading:true})
                    window.location.reload()
                  },1000)
                  // dispatch({type:'addGoodsModel/changeStep'})
                  // dispatch(routerRedux.push({pathname:'/platform/platemGoodsHouse'}))
                }
              }else{
                message.error(result.message);
              }
            })
          }
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
  const getCookie = (cname) =>{
    const name = cname + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i<ca.length; i++)
    {
      let c = ca[i].trim();
      if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
  }
  const uploadListImgButton = ( //列表图
    <div>
      <Icon type={loading && listImgUrl.imgUrl ? 'loading' : 'plus'} />
      <div className="ant-upload-text">列表图</div>
    </div>
  );
  const uploadMainImgButton = ( //主图
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
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
    if (info.file.status === 'uploading') {
      dispatch({type:'addGoodsModel/imgUpload',payload:{loading:true}})
      return;
    }
    if (info.file.status === 'done') {
      let payload = {}
      switch (source) {
        case 'list':
          const listImgUrl = addGoodsModel.listImgUrl;
          payload = {
            imgUrl:info.file.response.data.httpsPath,
            type:1
          }
          if(listImgUrl.img_id) payload.img_id = listImgUrl.img_id
          dispatch({type:'addGoodsModel/listImgUpload',payload})
          break;
        case 'main':
          const mainImgUrl = addGoodsModel.mainImgUrl;
          payload = {
            imgUrl:info.file.response.data.httpsPath,
            type:1
          }
          if(mainImgUrl.img_id) payload.img_id = mainImgUrl.img_id
          dispatch({type:'addGoodsModel/mainImgUpload',payload})
          break;
        default:
          return false;
      }
      
    }
  }
  const changeDetailImg = (info ) => { //细节图
    console.log(info,info.fileList)
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      let imgDetailList = imgList;
      let fileImgList = fileList;
      console.log(imgList)
      imgDetailList.push({
        imgUrl:info.file.response.data.httpsPath,
        type:3  
      })
      dispatch({type:'addGoodsModel/detailImgUpload',payload:{loading:false,imgList:imgDetailList}})
    }
  }
  const removeImg = (info) => { //清除细节图
    let imgDetailList = imgList;
    for(let i = 0; i < imgDetailList.length; i++){
      if(imgDetailList[i].imgUrl === info.response.data.httpsPath){
        imgDetailList.splice(i,1)
      }
    }
    dispatch({type:'addGoodsModel/detailImgUpload',payload:{loading:false,imgList:imgDetailList}})
  }
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  const disabledDate = (current) => {
    return current && current < moment().endOf('day');
  }
  
  const disabledDateTime = () => {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
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
  const changeGoodsDetail = (value) => {  //富文本更改
    dispatch({type:'addGoodsModel/changeGoodsDetail',value})
  }
  const changeType = (e,source) => {  //readio更改
    let exchangeMessage = addGoodsModel.exchangeMessage;
    const value = String(e.target.value);
    if(source === 'productAdAttr'){ //商品广告属性
      exchangeMessage.productAdAttr = value;
      exchangeMessage.product_ad_attr = ''
    }else if(source === 'exchangeMethods'){ //兑换方式
      exchangeMessage.exchangeMethods = value;
      exchangeMessage.exchange_methods = ''
    }else if(source === 'hasExchangeCode'){ //是否需要兑换码
      exchangeMessage.hasExchangeCode = value;
    }else if(source === 'accountType'){ //商家账号类型
      exchangeMessage.accountType = value;
    }else if(source === 'productMerchant'){  //是否为赚动添加特殊商品
      dispatch({type:'addGoodsModel/productMerchant',value})
    }
    dispatch({type:'addGoodsModel/changeData',exchangeMessage})
  }
  
  return (
    <div style={{marginTop:50}}>
      <Form layout="horizontal">
        { isUpdate || ifShowDetail ?
            <FormItem label="商品分类" {...formItemLayout}>
              <span>{currentProduct.classify && currentProduct.classify.sort_name}{currentProduct.classify && currentProduct.classify.child?' — '+currentProduct.classify.child.sort_name : ''}  </span>
            </FormItem>:''
        }
        <Divider orientation="left" style={{width:'80%',marginLeft:'10%'}}>供货信息</Divider>
        <FormItem label="供货商" {...formItemLayout}>
        {isUpdate || ifShowDetail?<span>{currentProduct.product_detail.merchant_short_name}</span>:getFieldDecorator('merchant', {
            initialValue: currentProduct.product_detail ? currentProduct.product_detail.merchant_short_name : '',
            rules: [{required: true, message: '请选择供货商'}]
        })(
          <Select>
            {
              addGoodsModel.merchantList.map(item => {
                return <Option value={item.id + "/" + item.short_name} key={item.id}>{item.short_name}</Option>
              })
            }
          </Select>
        )}
        </FormItem>
        <FormItem label="商品名称" {...formItemLayout} >
          {ifShowDetail?<span>{currentProduct.product_detail.full_name}</span>:getFieldDecorator('fullName', {
                initialValue:currentProduct.product_detail ? currentProduct.product_detail.full_name : '',
                rules: [{required: true , message: '请输入商品名称'}],
                validateTrigger:'onBlur'
            })(
              <Input autoComplete="off"/>
          )}
        </FormItem>   
        <Divider orientation="left" style={{width:'80%',marginLeft:'10%'}}>商品信息</Divider>
        <FormItem label="建议售价" {...formItemLayout} >
          {ifShowDetail?<span>{currentProduct.product_detail.retail_price}</span>:getFieldDecorator('retailPrice', {
                initialValue: currentProduct.product_detail ? currentProduct.product_detail.retail_price : '',
                rules: [{required: true, pattern:/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '请输入数字类型建议售价'}]
            })(
              <Input autoComplete="off" style={{width:'80%'}}/>
          )}
          元
        </FormItem> 
        <FormItem label="渠道售价" {...formItemLayout} >
          {ifShowDetail?<span>{currentProduct.product_detail.channel_price}</span>:getFieldDecorator('channelPrice', {
                initialValue: currentProduct.product_detail ? currentProduct.product_detail.channel_price : '',
                rules: [{required: true, pattern:/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '请输入数字类型渠道售价'}]
            })(
              <Input autoComplete="off" style={{width:'80%'}}/>
          )}元
        </FormItem> 
        <FormItem label="成本价" {...formItemLayout} >
          {ifShowDetail?<span>{currentProduct.product_detail.cost_price}</span>:getFieldDecorator('costPrice', {
                initialValue: currentProduct.product_detail ? currentProduct.product_detail.cost_price : '',
                rules: [{required: true, pattern:/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '请输入数字类型成本价'}]
            })(
              <Input autoComplete="off" style={{width:'80%'}}/>
          )}元
        </FormItem> 
        <FormItem label="库存" {...formItemLayout} >
          {isUpdate || ifShowDetail?<span>{currentProduct.product_detail.product_code_sum} </span>:getFieldDecorator('store', {
                initialValue: currentProduct.product_detail ? currentProduct.product_detail.product_code_sum : '',
                rules: [{ pattern:/^\d+$/, message: '请输入数字整数'}]
            })(
              <Input autoComplete="off" style={{width:'80%'}}/>
          )}个
        </FormItem> 
        <Divider orientation="left" style={{width:'80%',marginLeft:'10%'}}>商品图片</Divider>
        <div style={{width:'70%',marginLeft:'15%'}}>
          <div style={{float:'left',marginRight:'10'}}>
          {!ifShowDetail?
            <Upload
              name="imageFile"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={config.api.uploadImg}
              onChange={(info) => changeListImg(info,'list')}
            >
              {listImgUrl.hasOwnProperty('imgUrl') ? <img src={listImgUrl.imgUrl} style={{maxWidth:160,maxHeight:160}} alt="avatar" /> : uploadListImgButton}
            </Upload>:
            <img style={{maxWidth:160,maxHeight:160,marginLeft:8}} src={listImgUrl.imgUrl} alt={listImgUrl.imgUrl} />
          }
          </div>
          <div style={{float:'left',marginRight:'10'}}>
          {!ifShowDetail?
            <Upload
              name="imageFile"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={config.api.uploadImg}
              onChange={(info) => changeListImg(info,'main')}
            >
              {mainImgUrl.hasOwnProperty('imgUrl') ? <img style={{maxWidth:160,maxHeight:160}} src={mainImgUrl.imgUrl} alt="avatar" /> : uploadMainImgButton}
            </Upload>:
            <img style={{maxWidth:160,maxHeight:160,marginLeft:8}} src={mainImgUrl.imgUrl} alt={mainImgUrl.imgUrl} />
          }
          </div>
          {!ifShowDetail?<span>{imgList.map(item => {
            return <div style={{float:'left',marginRight:'10'}}>
            <Upload
              name="imageFile"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={config.api.uploadImg}
              onChange={(fileList) => changeDetailImg(fileList)}
            >
              {item.imgUrl ? <img style={{maxWidth:160,maxHeight:160}} src={item.imgUrl} alt="avatar" /> : uploadDetailImgButton}
            </Upload>
            </div>
            })}
            <div style={{float:'left',marginRight:'10'}}>
            {imgList.length >= 4? '' : <Upload
              name="imageFile"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={config.api.uploadImg}
              onChange={(info) => changeDetailImg(info)}
            >
              {uploadDetailImgButton}
            </Upload>}
            </div>
          </span>:
          <div style={{float:'left',marginRight:'10'}}>
            {imgList.map(item => {
              return <img style={{maxWidth:160,maxHeight:160,marginLeft:8}} src={item.imgUrl} alt={item.imgUrl} />
            })}
          </div> 

          }
          
          <div style={{clear:'both',height: 0,overflow:'hidden'}}></div>
        </div>
        <Divider orientation="left" style={{width:'80%',marginLeft:'10%'}}>商品详情</Divider>
        {ifShowDetail?
          <div style={{width:'70%',marginLeft:'15%'}} dangerouslySetInnerHTML={{ __html: goodsDetail }}></div>:
          <ReactQuill onChange={changeGoodsDetail} style={{width:'70%',marginLeft:'15%',height:400}} modules={toolbarOptions} value={addGoodsModel.goodsDetail}  />
        }
        <FormItem label="是否为赚动添加特殊商品" {...formItemLayout} style={{marginTop:80}}>
          {ifShowDetail?<span>{productMerchant === '1'?'是':'否'}</span>:getFieldDecorator('productMerchant', {
            initialValue: addGoodsModel.productMerchant || '1',
            rules: [{required: true, message: ''}]
          })(
            <RadioGroup onChange={(e) => changeType(e,'productMerchant')}>
              <Radio value={'1'}>是</Radio>
              <Radio value={'2'}>否</Radio>
            </RadioGroup>
          )}
        </FormItem>
        {
          productMerchant === '1'? <span>
          <Divider orientation="left" style={{width:'80%',marginLeft:'10%',marginTop:30}}>赚动--兑换方式</Divider>
          <FormItem label="商品广告属性" {...formItemLayout} >
            {ifShowDetail?<span>{String(exchangeMessage.product_ad_attr)==='1'?'购买商品':
              String(exchangeMessage.product_ad_attr)==='2'?'广告商品':'充值商品'}</span>:getFieldDecorator('productAdAttr', {
              initialValue: addGoodsModel.exchangeMessage.productAdAttr || String(addGoodsModel.exchangeMessage.product_ad_attr),
              rules: [{required: true, message: ''}]
            })(
              <RadioGroup onChange={(e) => changeType(e,'productAdAttr')}>
                <Radio value={'1'} disabled={addGoodsModel.isUpdate?true:false}>购买商品</Radio>
                <Radio value={'2'} disabled={addGoodsModel.isUpdate?true:false}>广告商品</Radio>
                <Radio value={'3'} disabled={addGoodsModel.isUpdate?true:false}>充值商品</Radio>
              </RadioGroup>
            )}
          </FormItem>
          {exchangeMessage.productAdAttr === '1'  || String(exchangeMessage.product_ad_attr) === '1'?

            <FormItem label="兑换方式" {...formItemLayout} >
            {ifShowDetail?<span>{String(exchangeMessage.exchange_methods) === '1'?'手动':
                String(exchangeMessage.exchange_methods) === '2'?'H5链接':String(exchangeMessage.exchange_methods) === '3'?'API接口':''
              }</span>:getFieldDecorator('exchangeMethods', {
              initialValue:addGoodsModel.exchangeMessage.exchangeMethods || String(addGoodsModel.exchangeMessage.exchange_methods) ,
              rules: [{required: true, message: ''}]
            })(
              <RadioGroup  onChange={(e) => changeType(e,'exchangeMethods')}>
                <Radio value={'1'}>手动</Radio>
                <Radio value={'2'}>H5链接</Radio>
                <Radio value={'3'}>API接口</Radio>
              </RadioGroup>
            )}
          </FormItem> :''}
          
          {(exchangeMessage.productAdAttr === '1' || String(exchangeMessage.product_ad_attr) === '1') && (exchangeMessage.exchangeMethods === '2' || String(exchangeMessage.exchange_methods) === '2') ? 
            <FormItem label="是否需要兑换码" {...formItemLayout} >
              {ifShowDetail?<span>{String(exchangeMessage.has_exchange_code)==='1'?'需要':'不需要'}</span>:getFieldDecorator('hasExchangeCode', {
                initialValue: exchangeMessage.hasExchangeCode || String(addGoodsModel.exchangeMessage.has_exchange_code),
                rules: [{required: true, message: ''}]
              })(
                <RadioGroup  onChange={(e) => changeType(e,'hasExchangeCode')}>
                  <Radio value={'1'}>需要</Radio>
                  <Radio value={'2'}>不需要</Radio>
                </RadioGroup>
              )}
            </FormItem> : ''
          }
          {(exchangeMessage.productAdAttr === '1' || String(exchangeMessage.product_ad_attr) === '1') && (exchangeMessage.exchangeMethods === '2' || String(exchangeMessage.exchange_methods) === '2') ? 
            <FormItem label="兑换链接" {...formItemLayout} >
              {ifShowDetail?<span>{exchangeMessage.exchange_url}</span>:getFieldDecorator('exchangeUrl', {
                  initialValue: addGoodsModel.exchangeMessage.exchange_url,
                  rules: [{ required:true, message: '请输入兑换链接'}]
                })(
                  <Input autoComplete="off" />
              )}
            </FormItem> : ''
          }
          {(exchangeMessage.productAdAttr === '1' || String(exchangeMessage.product_ad_attr) === '1') && exchangeMessage.exchangeMethods === '3' ? 
            <FormItem label="商家账号类型" {...formItemLayout} >
              {ifShowDetail?<span>{String(exchangeMessage.account_type)==='1'?'手机号':'其他'}</span>:getFieldDecorator('accountType', {
                initialValue: addGoodsModel.exchangeMessage.account_type || '1',
                rules: [{required: true, message: ''}]
              })(
                <RadioGroup  onChange={(e) => changeType(e,'accountType')}>
                  <Radio value={'1'}>手机号</Radio>
                  <Radio value={'2'}>其他</Radio>
                </RadioGroup>
              )}
            </FormItem> : ''
          }
          {exchangeMessage.productAdAttr === '1' || String(exchangeMessage.product_ad_attr) === '1' || exchangeMessage.productAdAttr === '3' || String(exchangeMessage.product_ad_attr) === '3'?
            <FormItem label="商品30天购买次数" {...formItemLayout} >
              {ifShowDetail?<span>{exchangeMessage.number_purchased_in_30_days}</span>:getFieldDecorator('numberPurchasedIn30Days', {
                    initialValue: addGoodsModel.exchangeMessage.number_purchased_in_30_days || '',
                    rules: [{ required:true, message: '商品30天购买次数'}]
                })(
                  <Input  />
              )}
            </FormItem> : ''
          }
          {exchangeMessage.productAdAttr === '1' || String(exchangeMessage.product_ad_attr) === '1' || exchangeMessage.productAdAttr === '3' || String(exchangeMessage.product_ad_attr) === '3'?
            <FormItem label="使用有效期" {...formItemLayout} >
            {ifShowDetail?<span>{extendedDetail.usefulTime}</span>:getFieldDecorator('usefulTime', {
                  initialValue: addGoodsModel.extendedDetail.usefulTime?moment(addGoodsModel.extendedDetail.usefulTime):'',
                  rules: [{ required:true, message: '使用有效期'}]
              })(
                <DatePicker
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="使用有效期"
                  disabledDate={disabledDate}
                  disabledTime={disabledDateTime}
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                />
            )}
          </FormItem> : ''
          }
          {exchangeMessage.productAdAttr === '1' || String(exchangeMessage.product_ad_attr) === '1' || exchangeMessage.productAdAttr === '2' || String(exchangeMessage.product_ad_attr) === '2'?
          <FormItem label="注意事项" {...formItemLayout} >
            {ifShowDetail?<span>{extendedDetail.announcements}</span>:getFieldDecorator('announcements', {
                  initialValue: addGoodsModel.extendedDetail.announcements || '',
                  rules: [{ required:true, message: '注意事项'}]
              })(
                <TextArea autosize />
            )}
          </FormItem> : ''
          }
          {exchangeMessage.productAdAttr === '1' || String(exchangeMessage.product_ad_attr) === '1' || exchangeMessage.productAdAttr === '2' || String(exchangeMessage.product_ad_attr) === '2' ?
          <FormItem label="使用流程" {...formItemLayout} >
            {ifShowDetail?<span>{extendedDetail.useFlow}</span>:getFieldDecorator('useFlow', {
                  initialValue: addGoodsModel.extendedDetail.useFlow || '',
                  rules: [{ required:true, message: '使用流程'}]
              })(
                <TextArea autosize />
            )}
          </FormItem> : ''
          }
          {exchangeMessage.productAdAttr === '1' || String(exchangeMessage.product_ad_attr) === '1' || exchangeMessage.productAdAttr === '2' || String(exchangeMessage.product_ad_attr) === '2'?
          <FormItem label="法律说明" {...formItemLayout} >
            {ifShowDetail?<span>{extendedDetail.statement}</span>:getFieldDecorator('statement', {
                  initialValue: addGoodsModel.extendedDetail.statement || '',
                  rules: [{ required:true, message: '法律说明'}]
              })(
                <TextArea autosize />
            )}
          </FormItem> : ''
          }
          {exchangeMessage.productAdAttr === '1' || String(exchangeMessage.product_ad_attr) === '1'?
          <FormItem label="购买成功文案" {...formItemLayout} >
            {ifShowDetail?<span>{extendedDetail.purchaseSucceedsMsg}</span>:getFieldDecorator('purchaseSucceedsMsg', {
                  initialValue: addGoodsModel.extendedDetail.purchaseSucceedsMsg || '',
                  rules: [{ required:true, message: '购买成功文案'}]
              })(
                <TextArea autosize />
            )}
          </FormItem> : ''
          }
          {exchangeMessage.productAdAttr === '3' || String(exchangeMessage.product_ad_attr) === '3'?
          <FormItem label="话费充值说明" {...formItemLayout} >
            {ifShowDetail?<span>{extendedDetail.prepaidRefillMsg}</span>:getFieldDecorator('prepaidRefillMsg', {
                  initialValue: addGoodsModel.extendedDetail.prepaidRefillMsg || '',
                  rules: [{ required:true, message: '话费充值说明'}]
              })(
                <TextArea autosize />
            )}
          </FormItem> : ''
          }
          {exchangeMessage.productAdAttr === '3' || String(exchangeMessage.product_ad_attr) === '3'?
          <FormItem label="流量充值说明" {...formItemLayout} >
            {ifShowDetail?<span>{extendedDetail.flowRechargeMsg}</span>:getFieldDecorator('flowRechargeMsg', {
                  initialValue: addGoodsModel.extendedDetail.flowRechargeMsg || '',
                  rules: [{ required:true, message: '流量充值说明'}]
              })(
                <TextArea autosize />
            )}
          </FormItem> : ''
          }

          </span> : ''
        }
        
        {ifShowDetail ?'':<Button onClick={() => confirmModal()} style={{marginLeft:'30%',marginTop:30}}>保存</Button>}

      </Form>
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({addGoodsModel})=>({addGoodsModel}))(Form.create()(GoodsMessage));
//类型检测
GoodsMessage.protoTypes = {
  addGoodsModel:PropTypes.object,
  dispatch:PropTypes.object
};

