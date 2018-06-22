import React from 'react';
import { Modal, Tabs  } from 'antd'
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './goodsDetail.less'
const TabPane = Tabs.TabPane;
const GoodsDetail = ({
  goodsManagerModel,
  dispatch,
  loading
})=>{   
  
  return (
    <Modal
      visible={goodsManagerModel.ifShowDetail}
      onCancel={() => {dispatch({type:'goodsManagerModel/hideDialog'})}}
      onOk={() => {dispatch({type:'goodsManagerModel/hideDialog'})}}
      okText='确定'
      cancelText={'取消'}
      maskClosable={false}
      width={1200}
    >
      <Tabs defaultActiveKey="1" >
        <TabPane tab="商品基本信息" key="1">
          <div className={styles.goods_message}>
            <p>
              <label>商品状态:</label>
              <span>
                {goodsManagerModel.goodsMessage.productState === "0"?'待上架':goodsManagerModel.goodsMessage.productState === "1"?'已上架':goodsManagerModel.goodsMessage.productState === "2"?'已下架':goodsManagerModel.goodsMessage.productState === "3"?'已失效':''}
              </span>
            </p>
            <p>
              <label>商品编号:</label>
              <span>{goodsManagerModel.goodsMessage.id}</span>
            </p>
          </div>
          {goodsManagerModel.goodsMessage.productState === "6"?
          <div className={styles.goods_message}>
            <p>
              <label>审核失败原因:</label>
              <span>{goodsManagerModel.goodsMessage.failedReason}</span>
            </p>
          </div>:''}
          <div className={styles.goods_message}>
            <p>
              <label>商品类型:</label>
              <span>
                {goodsManagerModel.goodsMessage.productType === 1?'虚拟':'实物'}
              </span>
            </p>
            <p>
              <label>商户:</label>
              <span>{goodsManagerModel.goodsMessage.merchantShortName}</span>
            </p>
          </div>
          <div className={styles.goods_message}>
            <p>
              <label>商品分类:</label>
              <span>{goodsManagerModel.goodsMessage.productSortName}</span>
            </p>
          </div>
          {goodsManagerModel.goodsMessage.exchangeMethods === 3?<div className={styles.goods_message}>
            <p>
              <label>账号类型:</label>
              <span>{goodsManagerModel.goodsMessage.accountType === 1?'手机号类型':goodsManagerModel.goodsMessage.accountType === 2?'其他':'--'}</span>
            </p>
          </div>:''}
          {goodsManagerModel.goodsMessage.exchangeMethods === 2?<div className={styles.goods_message}>
            <p>
              <label>H5链接形式:</label>
              <span>{goodsManagerModel.goodsMessage.dataTransfer === 1?'手机号模式':goodsManagerModel.goodsMessage.dataTransfer === 2?'兑换码模式':'--'}</span>
            </p>
            <p>
              <label>兑换链接:</label>
              <span>{goodsManagerModel.goodsMessage.exchangeUr?goodsManagerModel.goodsMessage.exchangeUrl:'--'}</span>
            </p>
          </div>:''}
          <div className={styles.goods_message}>
            <p>
              <label>商品名称:</label>
              <span>{goodsManagerModel.goodsMessage.fullName}</span>
            </p>
            <p>
              <label>商品广告属性:</label>
              <span>{goodsManagerModel.goodsMessage.productAdAttr === 1?'购买商品':'广告商品'}</span>
            </p>
          </div>
          <div className={styles.goods_message}>
            <p>
              <label>创建人:</label>
              <span>{goodsManagerModel.goodsMessage.createName}</span>
            </p>
          </div>
          <div className={styles.goods_message}>
            <p>
              <label>创建时间:</label>
              <span>{goodsManagerModel.goodsMessage.createTime}</span>
            </p>
          </div>
          <div className={styles.goods_message}>
            <p>
              <label>商品列表图:</label>
              <span><img src={goodsManagerModel.goodsMessage.listImage} alt="商品列表图"/></span>
            </p>
          </div>
          {goodsManagerModel.goodsMessage.productAdAttr !== 3?<div className={styles.goods_message}>
            <p>
              <label>商品详情图:</label>
              <span>
                {goodsManagerModel.goodsMessage.detailImages && goodsManagerModel.goodsMessage.detailImages.length > 0?
                  goodsManagerModel.goodsMessage.detailImages.map((item) => (
                      <img key={item.imageUrl} src={item.imageUrl} alt="商品详情图" /> 
                  )):''}
              </span>
            </p>
          </div>:''}
        </TabPane>
        
      </Tabs>
    </Modal>
  )
    
}

GoodsDetail.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

//将model中的state的数据绑定到组件;
export default connect(({goodsManagerModel,loading})=>({goodsManagerModel,loading}))(GoodsDetail);