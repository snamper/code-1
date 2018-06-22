const platemRouter = [
  {
    path: '/platform/merchantAccount',   //商户账号管理
    models: () => [import('@/models/container/platform/merchantAccount')],
    component: () => import('@/routes/container/platform/merchantAccount'),
  },
  {
    path: '/platform/merchantChannelManager',   //商户渠道管理
    models: () => [import('@/models/container/platform/merchantChannelManager')],
    component: () => import('@/routes/container/platform/merchantChannelManager'),
  },
  {
    path: '/platform/supplierManager',   //供货商管理
    models: () => [import('@/models/container/platform/supplierManager')],
    component: () => import('@/routes/container/platform/supplierManager'),
  },
  {
    path:'/platform/memberManage', //会员管理
    models: () => [import('@/models/container/platform/memberManage')],
    component: () => import('@/routes/container/platform/memberManage'),
  },
  {
    path:'/platform/platemOrderManage', //订单管理
    models: () => [import('@/models/container/platform/platemOrderManage')],
    component: () => import('@/routes/container/platform/platemOrderManage'),
  },
  {
    path: '/platform/platemGoodsManager',   //选品库
    models: () => [import('@/models/container/platform/platemGoodsManager')],
    component: () => import('@/routes/container/platform/platemGoodsManager'),
  },
  {
    path: '/platform/platemAddGoods',   //新增商品
    models: () => [import('@/models/container/platform/platemAddGoods')],
    component: () => import('@/routes/container/platform/platemAddGoods'),
  },
  {
    path: '/platform/platemGoodsHouse',   //管理商品库
    models: () => [import('@/models/container/platform/platemGoodsHouse')],
    component: () => import('@/routes/container/platform/platemGoodsHouse'),
  },
  {
    path: '/platform/platemStoreManage',   // 库存管理
    models: () => [import('@/models/container/platform/stockMan/stockMan')],
    component: () => import('@/routes/container/platform/stockMan/stockMan'),
  },
  {
    path: '/platform/platemCateManage',   // 分类管理
    models: () => [import('@/models/container/platform/platemCateManage')],
    component: () => import('@/routes/container/platform/platemCateManage'),
  },
  {
    path: '/platform/activityMan',   // 活动管理
    models: () => [import('@/models/container/platform/activityMan/activityManList')],
    component: () => import('@/routes/container/platform/activityMan/activityMan'),
  },
  {
    path: '/platform/activityDetails',   // 活动管理-活动详情
    models: () => [import('@/models/container/platform/activityMan/activityDetails')],
    component: () => import('@/routes/container/platform/activityMan/activityDetails'),
  },{
    path: '/platform/checkPendingGoods',   // 商品管理-待审核商品列表
    models: () => [import('@/models/container/platform/goodsManage/checkPendingGoods')],
    component: () => import('@/routes/container/platform/goodsManage'),
  },
  {
    path: '/platform/purchaseDetail',   // 活动管理-活动详情-购买明细
    models: () => [import('@/models/container/platform/activityMan/purchaseDetail')],
    component: () => import('@/routes/container/platform/activityMan/purchaseDetail'),
  },
  {
    path: '/platform/goodsRecycle',   // 商品管理-商品回收站
    models: () => [import('@/models/container/platform/goodsManage/goodsBackup')],
    component: () => import('@/routes/container/platform/goodsManage/goodsBackup'),
  },{
    path: '/platform/activityPutaway',   // 活动管理-活动上架管理
    models: () => [import('@/models/container/platform/activityMan/activityPutaway')],
    component: () => import('@/routes/container/platform/activityMan/activityPutaway'),
  },
  {
    path: '/platform/setActivityPut',   // 活动管理-设置活动上架
    models: () => [import('@/models/container/platform/activityMan/setActivityPut')],
    component: () => import('@/routes/container/platform/activityMan/setActivityPut'),
  },
  {
    path: '/platform/createdActive',   // 活动管理-创建活动
    models: () => [import('@/models/container/platform/activityMan/createdActive')],
    component: () => import('@/routes/container/platform/activityMan/createdActive'),
  },
  {
    path: '/platform/shareActiveConfig',   // 活动管理-设置活动上架
    models: () => [import('@/models/container/platform/activityMan/shareActiveConfig')],
    component: () => import('@/routes/container/platform/activityMan/shareActiveConfig'),
  }
];

export default platemRouter;