"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { Breadcrumb, Form, Input, Upload, Icon, Button, InputNumber, Select, message, Modal } from 'antd';
// import queryString from 'query-string';
import styles from './addGoodsPack.less'
import config from '@/utils/config.js'
//商品打包管理
const confirm = Modal.confirm;
const Option = Select.Option;
const FormItem = Form.Item;
const addGoodsPackItem = ({
  addPackFn,
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
  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 8 },
  };
  const formItemLayoutSmall = {
    labelCol: { span: 4 },
    wrapperCol: { span: 4 },
  };

  // 选择商品下拉框操作事件
  let selGoodsArr = [];// 初始化已选择的商品数据的下标
  let $initAllCosts = 0;//过渡赋值 原价总价
  let $initAllStock = 0;//过渡赋值 进货总价
  function handleChange(value) {
    // console.log(`selected ${value}`);//返回的是已选中的列表的key值
    value.map((item) => {
      return selGoodsArr.push(addPackFn.goodsList[item])
    })
    // console.log(selGoodsArr)
    for(let i=0;i<selGoodsArr.length;i++){//循环已经选取的商品列表，进行赋值，然后回传给payload去更新初始化的 原价总价 & 进货总价
      $initAllCosts += Number(selGoodsArr[i].retailPrice||0);
      $initAllStock += Number(selGoodsArr[i].costPrice||0);
    }
    
    // console.log($initAllCosts,$initAllStock)
    //每次选择列表都会调用此方法进行数据更新，拿到最新的已选择的商品
    dispatch({type:'addPackFn/getSelGoodsLis',payload:{selGoodsLis:selGoodsArr,initAllCosts:$initAllCosts,initAllStock:$initAllStock}})
    setTimeout(function(){
      getPackGoodsStocks()
    },10)
  }
  //上传按钮
  const uploadImgButton = (  
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">上传</div>
    </div>
  );
  //点击上传图片操作事件
  const handleChangeUp = (info) => { 
    // console.log(info)
    if (info.file.status === 'uploading') {
      dispatch({type:'addPackFn/imgLoadding',payload:{imgLoading:true}})
      return;
    }
    if (info.file.status === 'done') {
      dispatch({type:'addPackFn/imgUploadDown',imgUrl:info.file.response.data.httpsPath}) 
    }
  }
  // 保存商品包数据
  const savePackData = () => {
    validateFieldsAndScroll((errors,values) => {
      if(errors){
        message.error('请完善配置信息')
        return
      }
      // console.log(errors,values)
      let goodListIdx = values.selGoodPack||[];// 把已选中的商品在总下拉列表中的下标数组赋值
      let arrData = [];//创建存放接口需要的已选商品的相关数据(id + value)
      let length = goodListIdx.length?goodListIdx.length:0;
      if( length > 1 ) {
        for(let i = 0;i<length;i++){
        //  console.log('selectedGoods'+ goodListIdx[i])
         arrData.push({"point":values['selectedGoods'+ addPackFn.goodsList[goodListIdx[i]].id],"goodsId":addPackFn.goodsList[goodListIdx[i]].id})
        }
      }else{
        message.error('请选择商品并完善相关配置,最少2个商品！')
        return;
      }
      let packName = values.goodPackName||'';// 获取商品包名称
      let packImg = values.selGoodPackImg?values.selGoodPackImg.file.response.data.httpsPath||'':'';// 获取商品包图片
      let singleAcLimit = values.accountLimit||'';// 单账号购买限制
      let singleApLimit = values.facilityLimit||'';// 单设备购买限制
      // let singlePayAcLimit = values.payAccountLimit||'';// 单支付账号购买限制
      let packStock = values.packStock||'';// 打包商品库存
      // console.log(arrData)
      let datas = {
        "goodsIds": JSON.stringify(arrData),
        "sealImgUrl": packImg,
        "packageName": packName,
        "singleAcLimit": singleAcLimit,
        "singleApLimit": singleApLimit,
        // "singlePayAcLimit": singlePayAcLimit,
        "packageStock": packStock
      };
      // console.log(datas)

      if( addPackFn.initAllStock > addPackFn.initAllPackPrice  ) { // 打包价小于进货价
        confirm({
          title: '打包总价小于进货总价是否确认保存？',
          okText:'确定',
          cancelText:'取消',
          onOk() {
            dispatch({type:'addPackFn/addGoodsPacSaveFn',datas})
            .then((result) => {
              // console.log(result)
              if(result.success === true){
                if(result.code === 1){//成功
                  message.success('创建成功！')
                  dispatch(routerRedux.push({//跳转到首页列表
                    pathname:'/merchant/goodsPackMan'
                  }))
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
        dispatch({type:'addPackFn/addGoodsPacSaveFn',datas})
        .then((result) => {
          // console.log(result)
          if(result.success === true){
            if(result.code === 1){//成功
              message.success('创建成功！')
              dispatch(routerRedux.push({//跳转到首页列表
                pathname:'/merchant/goodsPackMan'
              }))
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

  const getPackGoodsStocks = () => {
    let packAllStocks = 0;//总的打包总价
    validateFieldsAndScroll((errors,values) => {
      // console.log(values)
      let goodListIdx1 = values.selGoodPack||[];// 把已选中的商品在总下拉列表中的下标数组赋值
      let length1 = goodListIdx1.length?goodListIdx1.length:0;
      for(let i = 0;i<length1;i++){
      //  console.log('selectedGoods'+ goodListIdx[i])
        packAllStocks += Number(values['selectedGoods'+ addPackFn.goodsList[goodListIdx1[i]].id]||0)
      }
    })
    dispatch({type:'addPackFn/getAllPackPrice',payload:{packAllStocks:packAllStocks}})
  }
  return (
    <div>
      <div className='formBody' style={{height: 40}}>
        <Breadcrumb style={{marginBottom:16,float:'left'}}>
          <Breadcrumb.Item>运营管理</Breadcrumb.Item>
          <Breadcrumb.Item>商品管理</Breadcrumb.Item>
          <Breadcrumb.Item>商品打包管理</Breadcrumb.Item>
          <Breadcrumb.Item>创建商品包</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form layout="vertical">
        <FormItem {...formItemLayout} label="商品包名称">
          {getFieldDecorator('goodPackName', {
            rules: [{ 
              required: true, 
              whitespace: true,
              max:50,
              message: '请输入50字以内的商品包名称!'
            }],
            validateTrigger: 'onBlur'
          })(<Input placeholder="请输入50字以内的商品包名称"/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="封面图">
          <div className="dropbox">
          {getFieldDecorator('selGoodPackImg', {
            rules: [{ required: true, message: '请上传商品包图片!' }],
          })(
            <Upload
              name="imageFile"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={config.api.uploadImg}
              onChange={(info) => handleChangeUp(info)}
            >
              {addPackFn.imgUrl ? <img style={{maxWidth:160,maxHeight:160}} src={addPackFn.imgUrl} alt="avatar" /> : uploadImgButton}
            </Upload>)}
            <span style={{color: '#ccc'}}>请上传图片，限制10M以内的.jpg/.jpeg/.png</span>
          </div>
        </FormItem>
        <FormItem {...formItemLayout} label="选择商品">
          {getFieldDecorator('selGoodPack', {
            rules: [{ required: true, message: '请选择商品!' }],
          })(<Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="请选择商品"
              initialValue={''}
              optionFilterProp="children"
              onChange={handleChange}
            >
              {addPackFn.goodsList.map((item,index) => {
                return <Option key={index}>{item.fullName}</Option>
              })}
            </Select>)}
        </FormItem>
        <div className={styles.partLine}>选中打包商品</div>
        <div className={styles.selectedBox}>
          <ul>
            { (addPackFn.selGoodsLis && addPackFn.selGoodsLis.length > 0) ?
            (addPackFn.selGoodsLis.map(function(item,index){  
                  return <li className={styles.selGoodsLis} key={index}>
                    <span className={styles.selGoodsName + ' ' + styles.fl + ' ' + styles.marginRight20}>{item.fullName}　　</span>
                    <span>原价：{item.retailPrice}积分　　</span>
                    <span>进货价：{item.costPrice}积分　　</span>
                    <span>库存：{item.stockNum}　　</span>
                    <span>*</span><span>打包价：</span>
                    {getFieldDecorator('selectedGoods'+item.id, {
                      rules: [{ required: true, message: '请输入打包价!' }],
                    })(<InputNumber precision={0} style={{width: 120, height: 32}} min={0} max={item.retailPrice} placeholder="限低于原价" onBlur={() => getPackGoodsStocks()}/>)}积分
                  </li>  
              }) ) : ''
            }  
          </ul>
          {
            (addPackFn.selGoodsLis && addPackFn.selGoodsLis.length > 0)?
            (<div style={{paddingTop: 50}}><FormItem {...formItemLayoutSmall} label="原价总价">
              {getFieldDecorator('allCosts')(<span>{addPackFn.initAllCosts}　积分</span>)}
            </FormItem>
            <FormItem {...formItemLayoutSmall} label="进货总价">
              {getFieldDecorator('allStock')(<span>{addPackFn.initAllStock}　积分</span>)}
            </FormItem>
            <FormItem {...formItemLayoutSmall} label="打包总价">
              {getFieldDecorator('allPack')(<span>{addPackFn.initAllPackPrice}　积分</span>)}
            </FormItem>
            <FormItem {...formItemLayoutSmall} label="打包商品库存">
              {getFieldDecorator('packStock',{rules: [{ required: true, message: '请填写打包商品库存!' }]})(<InputNumber precision={0} min={1} />)}
            </FormItem></div>):''
          }
        </div>
        <div className={styles.partLine}>防薅策略</div>
        <FormItem {...formItemLayoutSmall} label="单账号购买数量限制">
          {getFieldDecorator('accountLimit')(<InputNumber precision={0} min={1} />)}
        </FormItem>
        <FormItem {...formItemLayoutSmall} label="单设备购买数量限制">
          {getFieldDecorator('facilityLimit')(<InputNumber precision={0} min={1} />)}
        </FormItem>
        <div className={styles.goodsPackSaveBtn}>
          <Button type="primary" onClick={() => savePackData()}>保存</Button>
          <Button onClick={() => backGoodsPackMan()}>取消</Button>
        </div>
      </Form>  
    </div>
  );
};
//将model中的state的数据绑定到组件;
export default connect(({addPackFn,loading})=>({addPackFn,loading}))(Form.create()(addGoodsPackItem));
//类型检测
addGoodsPackItem.protoTypes = {
  addPackFn:PropTypes.object,
  dispatch:PropTypes.object,
  loading:PropTypes.object,
};