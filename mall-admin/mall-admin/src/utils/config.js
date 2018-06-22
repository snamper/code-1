"use strict";
const APIV1 = "/api/mock";   //mock
const APIV2 = "/api/v2";   //dev
const APIV3 = "/api/mallManager";   //dev
// const API = APIV2;
module.exports = {
  name:"Mall Admin",
  loginTitle:"赚动积分商城管理平台",
  footerText:"Mall Admin © 2018 zhuandong",
  logoTitle:"Mall Admin",
  welcome:"Welcome!",
  openPages:['/login'],
  CORS: [],
  APIV1,
  APIV2,
  APIV3,
  api:{
    login:`${APIV3}/admin/user/login.do`,   //登录接口
    logout:`${APIV3}/admin/user/login/out.do`, //退出登录
    exportOrderExcel:`${APIV3}/admin/order/manage/list/excel/export.do`,//导出订单列表
    channelList:`${APIV3}/admin/tchannel/manager/gettchannellist.do`, //渠道列表
    enabletchannel:`${APIV3}/admin/tchannel/manager/enabletchannel.do`, //渠道启用
    disabletchannel:`${APIV3}/admin/tchannel/manager/disabletchannel.do`, //渠道禁用
    addchannel:`${APIV3}/admin/tchannel/manager/add.do`, //添加渠道
    updatechannel:`${APIV3}/admin/tchannel/manager/edit.do`, //修改渠道
    checkedProducts:`${APIV3}/admin/channel/selection/getCheckedProducts.do`, //渠道选品列表
    goodslist:`${APIV3}/admin/channel/selection/getProducts.do`, //二级分类商品选取列表
    addtypeproduct:`${APIV3}/admin/channel/selection/addTypeProduct.do`, //根据类型批量添加商品
    addbatchproduct:`${APIV3}/admin/channel/selection/addBatchProduct.do`, //批量添加商品
    getchannelproducts:`${APIV3}/admin/channel/selection/getChannelProducts.do`, //渠道商品列表
    updategoodsstatus:`${APIV3}/admin/channel/selection/updateStatus.do`, //修改商品上下架状态
    updatebatchgoodsstatus:`${APIV3}/admin/channel/selection/updateBatchStatus.do`, //批量修改商品上下架状态
    cancelBatchProduct:`${APIV3}/admin/channel/selection/cancelBatchProduct.do`, //批量取消选品
    channelGoodsList:`${APIV3}/admin/product/info/list.do`,
    channelOrderIndex:`${APIV3}/admin/tchannel/manager/gettchannellist.do`,//渠道订单列表
    channelOrderLists:`${APIV3}/admin/tchannel/order/getlist.do`,//渠道订单二级列表
    orderRefundFn:`${APIV3}/admin/order/refund.do`,//渠道订单二级列表 退款按钮操作
    orderDeliveFn:`${APIV3}/admin/order/manage/set/shipStatus.do`,//渠道订单二级列表 发货按钮操作
    getGoodsDetail: `${APIV3}/admin/product/info/detail.do`,
    channelRecGoodsMan:`${APIV3}/admin/tchannel/manager/gettchannellist.do`,//运营位管理-渠道推荐商品
    channelHomeBannerMan:`${APIV3}/admin/tchannel/manager/gettchannellist.do`,//运营位管理-渠道首页banner
    setRecGoodsList:`${APIV3}/admin/channel/product/list.do`,//运营位管理-渠道推荐商品-推荐商品设置列表
    recGoodsListDialog:`${APIV3}/admin/channel/product/list/all.do`,//运营位管理-渠道推荐商品-推荐商品设置列表-新增/替换 商品推荐弹窗
    recGoodsListOk:`${APIV3}/admin/channel/product/add/product.do`,//渠道推荐商品-推荐商品设置列表-新增/替换 商品推荐弹窗里的确定提交按钮
    recGoodsListEditorOk:`${APIV3}/admin/channel/product/update/product.do`,//渠道推荐商品-推荐商品设置列表-新增/替换 商品推荐弹窗里的替换编辑确定提交按钮
    recGoodsListEditorSort:`${APIV3}/admin/channel/product/update/product/sort.do`,//渠道推荐商品-推荐商品设置列表-修改排序按钮
    recGoodsListPublish:`${APIV3}/admin/channel/product/publish.do`,//渠道推荐商品-推荐商品设置列表-发布按钮
    channelgoodsupdate:`${APIV3}/admin/channel/product/update/product.do`,//商品替换
    recGoodsListDelete:`${APIV3}/admin/channel/product/delete.do`,//渠道推荐商品-推荐商品设置列表-删除
    setHomeBannerList:`${APIV3}/admin/channel/banner/list.do`,//运营位管理-渠道首页banner-首页banner设置列表
    changebannerstats:`${APIV3}/admin/channel/banner/unput.do`,//banner开关
    recbannereditorsort:`${APIV3}/admin/channel/banner/update/sort.do`,//banner排序
    recbannerPublish:`${APIV3}/admin/channel/banner/publish.do`,//banner发布
    uploadImg:`${APIV3}/admin/file/image/upload.do`,//图片上传
    setbanner:`${APIV3}/admin/channel/banner/set.do`,//banner设置
    addbanner:`${APIV3}/admin/channel/banner/add.do`,//新增banner
    goodsPackManUrl:`${APIV3}/admin/tchannel/manager/gettchannellist.do`, //打包商品管理列表
    packLisDelUrl:`${APIV3}/admin/tchannel/manager/gettchannellist.do`, //打包商品管理-删除按钮事件
    packLisUseUrl:`${APIV3}/admin/tchannel/manager/gettchannellist.do`, //打包商品管理-应用生效按钮事件
    packLisEditorUrl:`${APIV3}/admin/tchannel/manager/gettchannellist.do`, //打包商品管理-编辑按钮事件
    
    /* 平台端 */
    activityDetailsUrl:`${APIV3}/admin/tchannel/manager/gettchannellist.do`, //活动管理-渠道列表-活动详情
    purchaseDetailUrl:`${APIV3}/admin/tchannel/manager/gettchannellist.do`, //活动管理-渠道列表-活动详情-购买明细
    activityPutawayUrl:`${APIV3}/admin/tchannel/manager/gettchannellist.do`, //活动管理-活动上架列表
    setActivityPutUrl: `${APIV3}/admin/tchannel/manager/gettchannellist.do`, //活动管理-活动上架列表-设置活动上架
    shareActiveConfigUrl: `${APIV3}/admin/tchannel/manager/gettchannellist.do`, //活动管理-活动分享配置
    upLoadFile:`${APIV3}/admin/product/info/import/exchange/code.do`,  // 上传文件
    createdActive:`${APIV3}/admin/tchannel/manager/gettchannellist.do`, // 创建活动


     /* 接口对接  hqp */ 
    // 商户管理

    merchantList:`${APIV3}/admin/merchant/user/list.do`, //商户列表
    stokeMan:`${APIV3}/platform/product/manage/list.do`, // 库存管理
    //channelList:`${APIV3}/admin/order/manage/list.do`,  //订单管理
    //exportOrderExcel:`${APIV3}/admin/order/manage/list/excel/export.do`,  //订单excel导出


    //merchantList:`${APIV3}/admin/merchant/user/list.do`, //商户列表  
    changeUserInfoUrl:`${APIV3}/admin/merchant/user/change/info.do`, // 修改商户信息  
    resetPasswordUrl:`${APIV3}/admin/merchant/user/password/reset.do`, // 重置密码
    updateStatusUrl:`${APIV3}/admin/merchant/user/unfreeze.do`, // 解除封停
    disabledStatusUrl:`${APIV3}/admin/merchant/user/freeze.do`, // 封停  
    createdChannelUrl:`${APIV3}/admin/tchannel/manager/add.do`, // 创建渠道
    memberListUrl:`${APIV3}/admin/tchannel/manager/gettchannellist.do`, // 渠道列表  
    addChannelUrl:`${APIV3}/admin/merchant/user/add.do`, // 新增商户
    supplierManUrl:`${APIV3}/admin/merchant/query/list.do`, // 供应商   
    supplierManCreatedUrl:`${APIV3}/admin/merchant/update.do`,  // 修改供应商商户信息  
    supplierManDelUrl:`${APIV3}/admin/merchant/del.do`,  // 删除供货商
    queryNewUrl:`${APIV3}/admin/merchant/create.do`, //新增供货商
    goodsBackupUrl:`${APIV3}/platform/product/recycleList.do`, // 商品回收站
    recoveryGoodUrl:`${APIV3}/platform/product/recyclesRecovers.do`, // 恢复商品
    appUserListUrl:`${APIV3}/app/user/list.do`, // 会员管理
    // 管理商品库
    onlineUrl:`${APIV3}/platform/product/online.do`, // 商品上线
    deleteUrl:`${APIV3}/platform/product/delete.do`, // 商品删除
    queryAllOnLineUrl:`${APIV3}/platform/product/all/online.do`, // 全部上线  
    batchOnLineUrl:`${APIV3}/platform/product/batch/online.do`, // 批量上线

    // 68
    getChooseGoodsOutLineUrl:`${APIV3}/platform/product/offline.do`, // 商品下线
    queryOutBatchLineUrl:`${APIV3}/platform/product/batch/offline.do`, // 批量下线
    // 68
    
    chooseGoodsList:`${APIV3}/platform/product/list.do`, // 选品库列表
    exportGoodsList:`${APIV3}/platform/product/excel.do`, // 导出商品列表
    productBatchClassify:`${APIV3}/platform/product/productBatchClassify.do`, // 商品归类
    
    // /platform/product/review/list.do  
    productReviewUrl:`${APIV3}/platform/product/review/list.do`, // 待审核列表
    reviewGoodUrl:`${APIV3}/platform/product/review.do`,  // 单个审核
    reviewGoodAllUrl:`${APIV3}/platform/product/batch/review.do`,  // 批量审核
    // 
    //刘熠
    goodscatelist:`${APIV3}/platform/product/sort/classify.do`, //商品分类列表
    addProduct:`${APIV3}/platform/product/add.do`, //商品创建
    getMerchant:`${APIV3}/admin/merchant/query/name.do`, //供货商列表
    goodsList:`${APIV3}/platform/product/manage/list.do`, //商品库列表
    productDetail:`${APIV3}/platform/product/detail.do`, //商品详情
    updategoods:`${APIV3}/platform/product/update.do`, //商品修改
    auditProduct:`${APIV3}/platform/product/review.do`, //商品审核
    cateManagerList:`${APIV3}/platform/product/sort/list.do`, //商品分类管理列表
    saveCateMessage:`${APIV3}/platform/product/sort/save.do`, //分类内容修改
    saveThreshold:`${APIV3}/platform/product/set/stock/threshold.do`, //库存管理--设置阈值
    upLoadFile:`${APIV3}/admin/product/info/import/exchange/code.do`,  //库存管理--excek上传
    setExchange:`${APIV3}/admin/product/info/exchange.do`,  //商品管理--兑换方式设置
    platemOrderList:`${APIV3}/admin/order/manage/list.do`,  //订单管理
    refund:`${APIV3}/admin/order/refund.do`,  //退款
    sendOrder:`${APIV3}/admin/order/manage/set/shipStatus.do`,  //发货
  },
};
