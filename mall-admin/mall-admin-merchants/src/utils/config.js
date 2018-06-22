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
    login:`${APIV3}/merchant/login.do`,   //登录接口
    logout:`${APIV3}/merchant/logout.do`, //退出登录
    enabletchannel:`${APIV3}/admin/tchannel/manager/enabletchannel.do`, //渠道启用
    disabletchannel:`${APIV3}/admin/tchannel/manager/disabletchannel.do`, //渠道禁用
    addchannel:`${APIV3}/admin/tchannel/manager/add.do`, //添加渠道
    updatechannel:`${APIV3}/admin/tchannel/manager/edit.do`, //修改渠道
    checkedProducts:`${APIV3}/admin/channel/selection/getCheckedProducts.do`, //渠道选品列表
    goodscatelist:`${APIV3}/merchant/channel/product/list/all.do`, //商品选品
    goodslist:`${APIV3}/admin/channel/selection/getProducts.do`, //二级分类商品选取列表
    addtypeproduct:`${APIV3}/admin/channel/selection/addTypeProduct.do`, //根据类型批量添加商品
    addbatchproduct:`${APIV3}/admin/channel/selection/addBatchProduct.do`, //批量添加商品
    getchannelproducts:`${APIV3}/admin/channel/selection/getChannelProducts.do`, //渠道商品列表
    cancelBatchProduct:`${APIV3}/admin/channel/selection/cancelBatchProduct.do`, //批量取消选品
    channelGoodsList:`${APIV3}/admin/product/info/list.do`,
    channelOrderIndex:`${APIV3}/admin/tchannel/manager/gettchannellist.do`,//渠道订单列表
    channelOrderLists:`${APIV3}/admin/tchannel/order/getlist.do`,//渠道订单二级列表
    orderRefundFn:`${APIV3}/admin/order/refund.do`,//渠道订单二级列表 退款按钮操作
    orderDeliveFn:`${APIV3}/admin/order/manage/set/shipStatus.do`,//渠道订单二级列表 发货按钮操作
    getGoodsDetail: `${APIV3}/admin/product/info/detail.do`,
    channelRecGoodsMan:`${APIV3}/admin/tchannel/manager/gettchannellist.do`,//运营位管理-渠道推荐商品
    channelHomeBannerMan:`${APIV3}/admin/tchannel/manager/gettchannellist.do`,//运营位管理-渠道首页banner
    recGoodsListEditorOk:`${APIV3}/admin/channel/product/update/product.do`,//渠道推荐商品-推荐商品设置列表-新增/替换 商品推荐弹窗里的替换编辑确定提交按钮
    recGoodsListPublish:`${APIV3}/merchant/channel/product/publish.do`,//渠道推荐商品-推荐商品设置列表-发布按钮
    
    
    //刘熠
    setRecGoodsList:`${APIV3}/merchant/channel/product/list.do`,//运营位管理-渠道推荐商品-推荐商品设置列表
    recGoodsListDialog:`${APIV3}/merchant/channel/product/list/all.do`,//运营位管理-渠道推荐商品-推荐商品设置列表-新增/替换 商品推荐弹窗
    recGoodsListOk:`${APIV3}/merchant/channel/product/add/product.do`,//渠道推荐商品-推荐商品设置列表-新增/替换 商品推荐弹窗里的确定提交按钮
    setHomeBannerList:`${APIV3}/merchant/channel/banner/list.do`,//运营管理-banner设置列表
    changebannerstats:`${APIV3}/merchant/channel/banner/unput.do`,//banner开关
    recbannereditorsort:`${APIV3}/merchant/channel/banner/update/sort.do`,//banner排序
    recbannerPublish:`${APIV3}/merchant/channel/banner/publish.do`,//banner发布
    setbanner:`${APIV3}/merchant/channel/banner/set.do`,//banner设置
    addbanner:`${APIV3}/merchant/channel/banner/add.do`,//新增banner
    channelgoodsupdate:`${APIV3}/merchant/channel/product/update/product.do`,//商品替换
    recGoodsListEditorSort:`${APIV3}/merchant/channel/product/update/product/sort.do`,//渠道推荐商品-推荐商品设置列表-修改排序按钮
    recGoodsListDelete:`${APIV3}/merchant/channel/product/delete.do`,//渠道推荐商品-推荐商品设置列表-删除
    cancelProduct:`${APIV3}/admin/channel/selection/cancelBatchProduct.do`, //批量取消选品
    cancelProductList:`${APIV3}/admin/channel/selection/getCancelPorduts.do`, //取消选品列表
    cancelProductUrl:`${APIV3}/admin/channel/selection/cancelProduct.do`, //取消单个选品
    cancelProductAllUrl:`${APIV3}/admin/channel/selection/cancelBatchProduct.do`, //批量取消选品
    getTypeListUrl:`${APIV3}/admin/channel/selection/getTypeList.do`, // 分类列表
    
    /* 平台端 */
    stokeMan:`${APIV3}/admin/tchannel/manager/gettchannellist.do`, // 库存管理
    setActivityPutUrl: `${APIV3}/admin/tchannel/manager/gettchannellist.do`, //活动管理-活动上架列表-设置活动上架
    upLoadFile:`${APIV3}/admin/product/info/import/exchange/code.do`,  // 上传文件
    createdActive:`${APIV3}/admin/tchannel/manager/gettchannellist.do`, // 创建活动
    selectGoods:`${APIV3}/admin/channel/selection/getClassify.do`,  //商品选取
    orderList:`${APIV3}/merchant/order/manage/list.do`, //订单列表
    exportOrderExcel:`${APIV3}/merchant/order/manage/list/excel/export.do`, //订单列表--导出

   //chenrongzhong
   uploadImg:`${APIV3}/merchant/file/image/upload.do`,//图片上传
   goodsPackManUrl:`${APIV3}/admin/goodspackage/manager/query.do`, //打包商品管理列表
   addGoodsPackUrl:`${APIV3}/admin/goodspackage/manager/add.do`,//打包商品创建提交保存接口
   packLisDelUrl:`${APIV3}/admin/goodspackage/manager/delete.do`, //打包商品管理-删除按钮事件
   packLisUseUrl:`${APIV3}/admin/goodspackage/manager/effectpackage.do`, //打包商品管理-应用生效按钮事件
  //  packLisDetialUrl:`${APIV3}/admin/goodspackage/manager/get.do`, //打包商品管理-编辑获取详情
   packLisEditorUrl:`${APIV3}/admin/goodspackage/manager/get.do`, //打包商品管理-编辑按钮事件
   editorGoodsPackUrl:`${APIV3}/admin/goodspackage/manager/edit.do`,//打包商品编辑提交保存接口
   getAllSelGoodsUrl:`${APIV3}/admin/goodspackage/manager/getpordutsforpackage.do`,// 创建编辑打包商品页面的下拉商品选择列表
   manGoodsList:`${APIV3}/admin/channel/selection/getManagerPorduts.do`, //商品管理-管理商品列表
   updategoodsstatus:`${APIV3}/admin/channel/selection/updateStatus.do`, //单个修改商品上下架状态
   updatebatchgoodsstatus:`${APIV3}/admin/channel/selection/updateBatchStatus.do`, //批量修改商品上下架状态
   editorGoodsPriceUrl:`${APIV3}/admin/channel/selection/updateMailPrice.do`,// 商品管理-管理商品列表-修改商品价格

   goodsPreviewUrl:`${APIV3}/admin/product/info/detail.do`,// 商品管理-管理商品列表-商品预览
   activityPutawayUrl:`${APIV3}/admin/active/manager/query.do`, //打包活动管理-活动上架列表
   activityDetailsUrl:`${APIV3}/admin/pack/activity/getInfo.do`, //活动管理-活动详情
   purchaseDetailUrl:`${APIV3}/admin/pack/activity/getBuyInfo.do`, //活动管理-活动详情-购买明细
   shareActiveConfigListUrl: `${APIV3}/admin/active/manager/query.do`, //活动管理-活动分享配置列表
   shareActiveConfigUrl: `${APIV3}/admin/active/manager/edit.do`, //活动管理-活动分享配置-再次编辑
   shareActiveConfigAddUrl: `${APIV3}/admin/active/manager/add.do`, //活动管理-活动分享配置--初次设置
   activityManListUrl:`${APIV3}/admin/pack/activity/getActiveList.do`, //活动管理列表
   changeActiveStatusUrl:`${APIV3}/admin/pack/activity/updateState.do`, //活动管理列表-修改活动状态
   changeActiveSortUrl:`${APIV3}/admin/active/manager/updateordernum.do`, //活动上下架管理-列表修改排序号
   
   
   
   
  chooseGoodsPack: `${APIV3}/admin/pack/activity/getPackProducts.do`, //商品包列表--创建活动
   selectGoodsPack: `${APIV3}/admin/pack/activity/getPackProductInfo.do`, //选择商品包--创建活动
   addGoodsPackActive: `${APIV3}/admin/spread/event/add.do`, //创建商品包活动
   getPackDetailById: `${APIV3}/admin/spread/event/detail.do`, //获取详情接口
		updateGoodsPackActive: `${APIV3}/admin/spread/event/update.do`, //创建商品包活动

			avtiveDetail: `${APIV3}/admin/active/manager/get.do`, //活动设置详情
		setActivePutAway: `${APIV3}/admin/active/manager/add.do`, //设置活动上架
		setActiveChooseList:`${APIV3}/admin/pack/activity/getActives.do`,	//活动上下架设置   活动列表
		setActivePutAwayUpdate:`${APIV3}/admin/active/manager/edit.do`,	//活动上下架设置   活动列表

    // 对接接口 hqp
    channelList:`${APIV3}/merchant/user/detail.do`, //用户信息
    userInfo:`${APIV3}/merchant/user/change/info.do`, // 修改用户信息
    channelInfo:`${APIV3}/admin/tchannel/manager/get.do`,  //商户信息
    userPassWordUrl:`${APIV3}/merchant/user/password/reset.do`, // 修改用户密码
    vipInfo:`${APIV3}/merchant/app/user/list.do`, // 会员管理
    // 对接接口 hqp
    putDownUrl:`${APIV3}/admin/active/manager/downshelves.do`, //打包活动下架
    putUpUrl:`${APIV3}/admin/active/manager/upshelves.do`, //打包活动上架
  },
};
