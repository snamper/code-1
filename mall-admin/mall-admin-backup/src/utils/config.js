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
    users:`${APIV1}/users`,
    login:`${APIV3}/merchant/login.do`,   //登录接口
    logout:`${APIV3}/admin/user/login/out.do`, //退出登录
    exportOrderExcel:`${APIV3}/admin/order/manage/list/excel/export.do`,//导出订单列表
    channelList:`${APIV3}/admin/tchannel/manager/gettchannellist.do`, //渠道列表
    enabletchannel:`${APIV3}/admin/tchannel/manager/enabletchannel.do`, //渠道启用
    disabletchannel:`${APIV3}/admin/tchannel/manager/disabletchannel.do`, //渠道禁用
    addchannel:`${APIV3}/admin/tchannel/manager/add.do`, //添加渠道
    updatechannel:`${APIV3}/admin/tchannel/manager/edit.do`, //修改渠道
    checkedProducts:`${APIV3}/admin/channel/selection/getCheckedProducts.do`, //渠道选品列表
    goodscatelist:`${APIV3}/admin/channel/selection/getClassify.do`, //商品分类列表
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
    stokeMan:`${APIV3}/admin/tchannel/manager/gettchannellist.do`, // 库存管理
    activityManUrl:`${APIV3}/admin/tchannel/manager/gettchannellist.do`, //活动管理-渠道列表
    activityDetailsUrl:`${APIV3}/admin/tchannel/manager/gettchannellist.do`, //活动管理-渠道列表-活动详情
    purchaseDetailUrl:`${APIV3}/admin/tchannel/manager/gettchannellist.do`, //活动管理-渠道列表-活动详情-购买明细
    activityPutawayUrl:`${APIV3}/admin/tchannel/manager/gettchannellist.do`, //活动管理-活动上架列表
    setActivityPutUrl: `${APIV3}/admin/tchannel/manager/gettchannellist.do`, //活动管理-活动上架列表-设置活动上架
    shareActiveConfigUrl: `${APIV3}/admin/tchannel/manager/gettchannellist.do`, //活动管理-活动分享配置
    upLoadFile:`${APIV3}/admin/product/info/import/exchange/code.do`,  // 上传文件
    createdActive:`${APIV3}/admin/tchannel/manager/gettchannellist.do`, // 创建活动
  },
};
