"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { Breadcrumb, Form, Input, Upload, Icon, Button, InputNumber, message, Modal } from 'antd';
import queryString from 'query-string';
import styles from './addGoodsPack.less'
import config from '@/utils/config.js'
//商品打包管理
const confirm = Modal.confirm;
// const Option = Select.Option;
const FormItem = Form.Item;
const editorGoodsPackItem = ({
  editorPackFn,
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
  //console.log(editorPackFn);
  //console.log(editorPackFn.dataSource.packageStatus);
  //console.log((editorPackFn.dataSource.packageStatus==="1)?true:false)
  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 8 },
  };
  const formItemLayoutSmall = {
    labelCol: { span: 4 },
    wrapperCol: { span: 4 },
  };

  //上传按钮
  const uploadImgButton = (  
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">上传</div>
    </div>
  );
  //点击上传图片操作事件
  const handleChangeUp = (info) => { 
    if (info.file.status === 'uploading') {
      dispatch({type:'editorPackFn/imgLoadding',payload:{imgLoading:true}})
      return;
    }
    if (info.file.status === 'done') {//编辑的时候，再次更改图片其实图片已经上传成功，只不过没有把状态更改过来
      let dataSource = editorPackFn.dataSource;
      dataSource.sealImgUrl = info.file.response.data.httpsPath;
      dispatch({type:'editorPackFn/imgUploadDown',imgUrl:info.file.response.data.httpsPath,dataSource}) 
    }
  }
  //获取已选商品列表所有的打包总价
  const getPackGoodsStocks = () => {
    let packAllStocks = 0;//总的打包总价
    validateFieldsAndScroll((errors,values) => {
      let length1 = editorPackFn.dataSource.tProductList.length;// 把已选中的商品在总下拉列表中的下标数组赋值
      for(let i = 0;i<length1;i++){
        packAllStocks += Number(values['selectedGoods'+i ])
      }
    })
    dispatch({type:'editorPackFn/getAllPackPrice',payload:{packAllStocks:packAllStocks}})
  }

  // 保存商品包数据
  const editorSavePackData = (source) => {//source 1:保存   2： 应用生效
    if(!editorPackFn.productState){// 说明此商品包中含有已下架的商品
      message.error('此商品包中含有已下架的商品，请先上架！')
      return
    }
    validateFieldsAndScroll((errors,values) => {
      if(errors){
        message.error('请完善配置信息')
        return;
      }
      // console.log(errors,values)
      let arrData = [];//创建存放接口需要的已选商品的相关数据(id + value)
      let length = editorPackFn.dataSource.tProductList.length||0;
      for(let i = 0;i<length;i++){
        arrData.push({"point":values['selectedGoods'+i],"goodsId":editorPackFn.dataSource.tProductList[i].id})
      }
      let packName = values.goodPackName||'';// 获取商品包名称
      // console.log(values.selGoodPackImg)
      let packImg = values.selGoodPackImg?values.selGoodPackImg.file.response.data.httpsPath||'':editorPackFn.imgUrl;// 获取商品包图片
      let singleAcLimit = values.accountLimit||'';// 单账号购买限制
      let singleApLimit = values.facilityLimit||'';// 单设备购买限制
      // let singlePayAcLimit = values.payAccountLimit||'';// 单支付账号购买限制
      let packStock = values.packStock||'';// 打包商品库存
      let datas = {
        "goodsIds": JSON.stringify(arrData),
        "sealImgUrl": packImg,
        "packageName": packName,
        "singleAcLimit": singleAcLimit,
        "singleApLimit": singleApLimit,
        // "singlePayAcLimit": singlePayAcLimit,
        "packageStock": packStock,
        "packageId": queryString.parse(location.search).packageId
      };
     
      if( editorPackFn.initAllPackPrice > editorPackFn.dataSource.purchaseTotalPrice  ) { // 打包价大于进货价
        confirm({
          title: '打包总价大于原价总价是否确认保存？',
          okText:'确定',
          cancelText:'取消',
          onOk() {
            dispatch({type:'editorPackFn/editorGoodsPackSaveFn',datas})
            .then((result) => {
              // console.log(result)
              if(result.success === true){
                if(result.code === 1){//成功
                  if( source === '1' ){ //当前操作
                    message.success('编辑成功！')
                    dispatch(routerRedux.push({//跳转到首页列表
                      pathname:'/merchant/goodsPackMan'
                    }))
                  }else{//应用生效
                    let packId = queryString.parse(location.search).packageId;
                    dispatch({type:'editorPackFn/packLisUseFn',payload:{packId,}})
                    .then((result) => {
                      // console.log(result)
                      if(result.message !== '成功'){
                        message.error(result.message);
                        return;
                      }
                      dispatch(routerRedux.push({//跳转到首页列表
                        pathname:'/merchant/goodsPackMan'
                      }))
                    })
                  }
                }else{
                  message.error(result.message)
                }
              }else{//失败的话就返回信息
                message.error(result.message)
              }
            })
          },
          onCancel() {
            return;
          },
        });
      }else{
        dispatch({type:'editorPackFn/editorGoodsPackSaveFn',datas})
        .then((result) => {
          // console.log(result)
          if(result.success === true){
            if(result.code === 1){//成功
              if( source === '1' ){
                message.success('编辑成功！')
                dispatch(routerRedux.push({//跳转到首页列表
                  pathname:'/merchant/goodsPackMan'
                }))
              }else{//应用生效
                let packId = queryString.parse(location.search).packageId;
                dispatch({type:'editorPackFn/packLisUseFn',payload:{packId,}})
                .then((result) => {
                  if(result.message !== '成功'){
                    message.error(result.message);
                    return;
                  }
                  dispatch(routerRedux.push({//跳转到首页列表
                    pathname:'/merchant/goodsPackMan'
                  }))
                })
              }
            }else{
              message.error(result.message)
              return
            }
          }else{//失败的话就返回信息
            message.error(result.message)
            return
          }
        })
     }
    })
  }
  //返回按钮操作  返回列表页
  const backGoodsPackMan = () => {
    dispatch(routerRedux.push({//跳转到首页列表
      pathname:'/merchant/goodsPackMan'
    }))
  }

  return (
    <div>
      <div className='formBody' style={{height: 40}}>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>运营管理</Breadcrumb.Item>
          <Breadcrumb.Item>商品管理</Breadcrumb.Item>
          <Breadcrumb.Item>商品打包管理</Breadcrumb.Item>
          <Breadcrumb.Item>编辑商品包</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form layout="vertical">
        <FormItem {...formItemLayout} label="商品包名称">
          {getFieldDecorator('goodPackName', {
            initialValue: editorPackFn.dataSource.packageName,
            rules: [{ 
              required: true, 
              whitespace: true,
              max:50,
              message: '请输入50字以内的商品包名称!'
            }],
            validateTrigger: 'onBlur'
          })(<Input placeholder="请输入50字以内的商品包名称"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="封面图" required={true}>
          <div className="dropbox">
          {getFieldDecorator('selGoodPackImg', {
          })(
            <Upload
              name="imageFile"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={config.api.uploadImg}
              onChange={(info) => handleChangeUp(info)}
            >
              {editorPackFn.dataSource.sealImgUrl ? <img style={{maxWidth:160,maxHeight:160}} src={editorPackFn.dataSource.sealImgUrl} alt="avatar" /> : 
              uploadImgButton}
            </Upload>)}
            <span style={{color: '#ccc'}}>请上传图片，限制10M以内的.jpg/.jpeg/.png</span>
          </div>
        </FormItem>
        <div className={styles.partLine}>选中打包商品</div>
        <div className={styles.selectedBox}>
          <ul>
            { (editorPackFn.dataSource.tProductList && editorPackFn.dataSource.tProductList.length > 0) ?
            (editorPackFn.dataSource.tProductList.map(function(item,index){  
                  return <li className={styles.selGoodsLis} key={index}>
                    <span className={styles.selGoodsName + ' ' + styles.fl + ' ' + styles.marginRight20}>{item.fullName}　　</span>
                    <span>原价：{item.retailPrice}积分　　</span>
                    <span>进货价：{item.costPrice}积分　　</span>
                    <span>库存：{item.stockNum}　　</span>
                    <span>*</span><span>打包价：</span>
                    {getFieldDecorator('selectedGoods'+index, {
                      initialValue: item.packagePrice,
                      rules: [{ required: true, message: '请输入打包价!' }],
                    })(<InputNumber precision={0} style={{width: 120, height: 32}} min={0} max={item.retailPrice} placeholder="限低于原价" onBlur={() => getPackGoodsStocks()}/>)}积分
                    {item.productState !== '1'?<span style={{color:'#fb040a'}}>此商品不是已上架的商品</span>:''}
                  </li>  
              }) ) : ''
            }  
          </ul>
          {
            (editorPackFn.dataSource.tProductList && editorPackFn.dataSource.tProductList.length > 0)?
            (<div style={{paddingTop: 50}}><FormItem {...formItemLayoutSmall} label="原价总价">
              {getFieldDecorator('allCosts')(<span>{editorPackFn.dataSource.originTotalPrice}　积分</span>)}
            </FormItem>
            <FormItem {...formItemLayoutSmall} label="进货总价">
              {getFieldDecorator('allStock')(<span>{editorPackFn.dataSource.purchaseTotalPrice}　积分</span>)}
            </FormItem>
            <FormItem {...formItemLayoutSmall} label="打包总价">
              {getFieldDecorator('allPack',{
                initialValue: editorPackFn.initAllPackPrice
              })(
                <span>
                {editorPackFn.initAllPackPrice?editorPackFn.initAllPackPrice:editorPackFn.dataSource.packageTotalPrice||''}　积分
                </span>
              )}
            </FormItem>
            <FormItem {...formItemLayoutSmall} label="打包商品库存">
              {getFieldDecorator('packStock',{initialValue: editorPackFn.dataSource.packageStock,rules: [{ required: true, message: '请填写打包商品库存!' }]})(<InputNumber disabled={(editorPackFn.dataSource.packageStatus===1)?true:false} precision={0} min={1} />)}
            </FormItem></div>):''
          }
        </div>
        <div className={styles.partLine}>防薅策略</div>
        <FormItem {...formItemLayoutSmall} label="单账号购买数量限制">
          {getFieldDecorator('accountLimit',{initialValue: editorPackFn.dataSource.singleAcLimit})(<InputNumber precision={0} min={1} />)}
        </FormItem>
        <FormItem {...formItemLayoutSmall} label="单设备购买数量限制">
          {getFieldDecorator('facilityLimit',{initialValue: editorPackFn.dataSource.singleApLimit})(<InputNumber precision={0} min={1} />)}
        </FormItem>
        <div className={styles.goodsPackSaveBtn}>
          <Button type="primary" onClick={() => editorSavePackData("1")}>保存</Button>
          <Button type="primary" onClick={() => editorSavePackData("2")}>应用生效</Button>
          {/* <Button type="primary" onClick={() => packLisuseFnClick(queryString.parse(location.search).packageId)}>应用生效</Button> */}
          <Button onClick={() => backGoodsPackMan()}>取消</Button>
        </div>
      </Form>  
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({editorPackFn,loading})=>({editorPackFn,loading}))(Form.create()(editorGoodsPackItem));
//类型检测
editorGoodsPackItem.protoTypes = {
  editorPackFn:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};