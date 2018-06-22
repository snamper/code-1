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
                {goodsManagerModel.goodsMessage.productState === "1"?'待上架（未设置）':goodsManagerModel.goodsMessage.productState === "2"?'待上架（已設置）':goodsManagerModel.goodsMessage.productState === "3"?'已下架':goodsManagerModel.goodsMessage.productState === "4"?'已上架':goodsManagerModel.goodsMessage.productState === "5"?'待审核':goodsManagerModel.goodsMessage.productState === "6"?'审核失败':'草稿'}
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
                {goodsManagerModel.goodsMessage.productType === "1"?'虚拟':'实物'}
              </span>
            </p>
            <p>
              <label>商户:</label>
              <span>{goodsManagerModel.goodsMessage.merchantShortName}</span>
            </p>
          </div>
          <div className={styles.goods_message}>
            <p>
              <label>兑换方式:</label>
              <span>{goodsManagerModel.goodsMessage.exchangeMethods === "1"?'手动':goodsManagerModel.goodsMessage.exchangeMethods === "2"?'H5链接':goodsManagerModel.goodsMessage.exchangeMethods === "3"?'API接口':'--'}</span>
            </p>
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
              <span>{goodsManagerModel.goodsMessage.productAdAttr === "1"?'购买商品':goodsManagerModel.goodsMessage.productAdAttr === "1"?'广告商品':'充值商品'}</span>
            </p>
          </div>
          <div className={styles.goods_message}>
            <p>
              <label>是否允许高风险用户购买:</label>
              <span>{goodsManagerModel.goodsMessage.riskBuyAllowed === 1?'是':'否'}</span>
            </p>
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
        {goodsManagerModel.goodsMessage.productAdAttr !== 3?<TabPane tab="商品进货信息" key="2">
          <div className={styles.goods_message}>
            <p>
              <label>进货数量:</label>
              <span>{goodsManagerModel.goodsMessage.productNum}</span>
            </p>
          </div>
          <div className={styles.goods_message}>
            <p>
              <label>进货总价:</label>
              <span>{goodsManagerModel.goodsMessage.totalPrice||0} 元</span>
            </p>
          </div>
          <div className={styles.goods_message}>
            <p>
              <label>成本价:</label>
              <span>{goodsManagerModel.goodsMessage.costPrice} 元</span>
            </p>
          </div>
          <div className={styles.goods_message}>
            <p>
              <label>零售价:</label>
              <span>{goodsManagerModel.goodsMessage.retailPrice} 元</span>
            </p>
          </div>
          
        </TabPane>:''}
        <TabPane tab="商品销售信息" key="3">
        <div className={styles.goods_message}>
            <p>
              <label>销售数量:</label>
              <span>{goodsManagerModel.goodsMessage.soldNumber}</span>
            </p>
          </div>
          <div className={styles.goods_message}>
            <p>
              <label>库存数量:</label>
              <span>{goodsManagerModel.goodsMessage.stockNum}</span>
            </p>
          </div>
          {goodsManagerModel.goodsMessage.productAdAttr !== 3?<div className={styles.goods_message}>
            <p>
              <label>兑换积分:</label>
              <span>{goodsManagerModel.goodsMessage.exchangePoints}</span>
            </p>
          </div>:''}
        </TabPane>
        <TabPane tab="运营设置信息" key="4">
          {goodsManagerModel.goodsMessage.recommendList && goodsManagerModel.goodsMessage.recommendList.length>0?
            goodsManagerModel.goodsMessage.recommendList.map(item => (
              <div className={styles.goods_message}>
                  <p>
                    <label>排序号:</label>
                    <span>{item.sord}</span>
                  </p>
                  <p>
                    <label>推荐位置:</label>
                    {item.location === 1?<span>频道页</span>:<span>首页</span>}
                  </p>
              </div>
            )):''
          }
          <div className={styles.goods_message}>
            <p>
              <label>CPS入口:</label>
              <span>
                {goodsManagerModel.goodsMessage.entranceMark && goodsManagerModel.goodsMessage.entranceMark.length > 0?
                  goodsManagerModel.goodsMessage.entranceMark.map((item,index) => (
                    <span key={index}>{item && index===0?'首页':item && index===1?'商城页':item && index===2?'卡包列表':item && index===3?'购买成功页':item && index===4?'兑换成功页':item && index===5?'商品详情页':''}</span>
                  )):''}
                </span>
            </p>
          </div>
        </TabPane>
        <TabPane tab="商品兑换方式" key="5">
        <div className={styles.goods_message}>
            <p>
              <label>商品30天购买次数:</label>
              <span>{goodsManagerModel.goodsMessage.numberPurchasedIn30Days}</span>
            </p>
          </div>
          {goodsManagerModel.goodsMessage.productAdAttr !== 3?
          <div>
            <div className={styles.goods_message}>
              <p>
                <label>使用有效期:</label>
                <span>
                {goodsManagerModel.goodsMessage.productExtendedDetailList&&goodsManagerModel.goodsMessage.productExtendedDetailList.length>0?
                  goodsManagerModel.goodsMessage.productExtendedDetailList.map((item) => (
                    <span key={item.detailDesc}>{item.attrDicName === "usefulTime"?item.detailDesc:''}</span>
                  )):''
                }
                </span>
              </p>
            </div>
            <div className={styles.goods_message}>
              <p>
                <label>注意事项:</label>
                <span>
                {goodsManagerModel.goodsMessage.productExtendedDetailList&&goodsManagerModel.goodsMessage.productExtendedDetailList.length>0?
                  goodsManagerModel.goodsMessage.productExtendedDetailList.map((item) => (
                    <span key={item.detailDesc}>{item.attrDicName === "announcements"?item.detailDesc:''}</span>
                  )):''
                }
                </span>
              </p>
            </div>
            <div className={styles.goods_message}>
              <p>
                <label>使用流程:</label>
                <span>
                {goodsManagerModel.goodsMessage.productExtendedDetailList&&goodsManagerModel.goodsMessage.productExtendedDetailList.length>0?
                  goodsManagerModel.goodsMessage.productExtendedDetailList.map((item) => (
                    <span key={item.detailDesc}>{item.attrDicName === "useFlow"?item.detailDesc:''}</span>
                  )):''
                }
                </span>
              </p>
            </div>
            <div className={styles.goods_message}>
              <p>
                <label>法律声明:</label>
                <span>
                {goodsManagerModel.goodsMessage.productExtendedDetailList&&goodsManagerModel.goodsMessage.productExtendedDetailList.length>0?
                  goodsManagerModel.goodsMessage.productExtendedDetailList.map((item) => (
                    <span key={item.detailDesc}>{item.attrDicName === "statement"?item.detailDesc:''}</span>
                  )):''
                }
                </span>
              </p>
            </div>
            <div className={styles.goods_message}>
              <p>
                <label>购买成功文案:</label>
                <span>
                {goodsManagerModel.goodsMessage.productExtendedDetailList&&goodsManagerModel.goodsMessage.productExtendedDetailList.length>0?
                  goodsManagerModel.goodsMessage.productExtendedDetailList.map((item) => (
                    <span key={item.detailDesc}>{item.attrDicName === "purchaseSucceedsMsg"?item.detailDesc:''}</span>
                  )):''
                }
                </span>
              </p>
            </div>
          </div>:<div>
            <div className={styles.goods_message}>
              <p>
                <label>话费充值说明:</label>
                <span>
                {goodsManagerModel.goodsMessage.productExtendedDetailList&&goodsManagerModel.goodsMessage.productExtendedDetailList.length>0?
                  goodsManagerModel.goodsMessage.productExtendedDetailList.map((item) => (
                    <span key={item.detailDesc}>{item.attrDicName === "prepaidRefillMsg"?item.detailDesc:''}</span>
                  )):''
                }
                </span>
              </p>
            </div>
            <div className={styles.goods_message}>
              <p>
                <label>流量充值说明:</label>
                <span>
                {goodsManagerModel.goodsMessage.productExtendedDetailList&&goodsManagerModel.goodsMessage.productExtendedDetailList.length>0?
                  goodsManagerModel.goodsMessage.productExtendedDetailList.map((item) => (
                    <span key={item.detailDesc}>{item.attrDicName === "flowRechargeMsg"?item.detailDesc:''}</span>
                  )):''
                }
                </span>
              </p>
            </div>
          </div>
          }
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