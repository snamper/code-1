const merchant = [
  {
    path: '/merchant/merchantAccount',    //商户账户管理
    models: () => [import('@/models/container/merchant/merchantAccount')],  //同下公用一个状态机
    component: () => import('@/routes/container/merchant/merchantAccount'),
  },{
    path:'/merchant/merchantMessage', //商户信息
    models: () => [import('@/models/container/merchant/merchantAccount')],  //同上公用一个状态机
    component: () => import('@/routes/container/merchant/merchantMessage'), 
  },{
    path:'/merchant/merchantMemberManage', //会员管理
    models: () => [import('@/models/container/merchant/merchantMemberManage')],
    component: () => import('@/routes/container/merchant/merchantMemberManage'),
  },{
    path:'/merchant/merchantChooseGoods', //选取商品
    models: () => [import('@/models/container/merchant/merchantChooseGoods')],
    component: () => import('@/routes/container/merchant/merchantChooseGoods'),
  },{
    path:'/merchant/merchantCancelGoods', //取消选品
    models: () => [import('@/models/container/merchant/merchantCancelGoods')],
    component: () => import('@/routes/container/merchant/merchantCancelGoods'),
  },{
    path:'/merchant/merchantGoodsManage', //管理商品
    models: () => [import('@/models/container/merchant/merchantGoodsManage')],
    component: () => import('@/routes/container/merchant/merchantGoodsManage'),
  },{
    path: '/merchant/goodsPackMan',   //商品打包管理
    models: () => [import('@/models/container/merchant/goodsPackMan/goodsPackMan')],
    component: () => import('@/routes/container/merchant/goodsPackMan/goodsPackMan'),
  },{
    path: '/merchant/addGoodsPack',   //商品打包管理-创建商品包页面
    models: () => [import('@/models/container/merchant/goodsPackMan/addGoodsPack')],
    component: () => import('@/routes/container/merchant/goodsPackMan/addGoodsPack'),
  },{
    path: '/merchant/editorGoodsPack',   //商品打包管理-编辑商品包页面
    models: () => [import('@/models/container/merchant/goodsPackMan/editorGoodsPack')],
    component: () => import('@/routes/container/merchant/goodsPackMan/editorGoodsPack'),
  },{
    path:'/merchant/platemOrderManage', //订单管理
    models: () => [import('@/models/container/merchant/platemOrderManage')],
    component: () => import('@/routes/container/merchant/platemOrderManage'),
  },{
    path:'/merchant/goodsPackDetail', //商品打包管理-商品包详情
    models: () => [import('@/models/container/merchant/goodsPackMan/goodsPackDetail')],
    component: () => import('@/routes/container/merchant/goodsPackMan/goodsPackDetail'),
  },  
  ///////分割线
  ///////
  {
    path:'/merchant/merchantRecommendGoods', //推荐商品管理
    models: () => [import('@/models/container/merchant/setRecGoodsList')],
    component: () => import('@/routes/container/merchant/operatingManage'),
  },{
    path:"/merchant/merchantBannerManager",
    models:()=>[import('@/models/container/merchant/banner')],
    component: () => import('@/routes/container/merchant/operatingManage/banner'),
  },
  //商品包活动管理
  {
    path: '/merchant/activityPutaway',   // 活动上下架管理列表
    models: () => [import('@/models/container/merchant/activityMan/activityPutaway')],
    component: () => import('@/routes/container/merchant/activityMan/activityPutaway'),
  },
  {
    path: '/merchant/activityListMan',   // 活动管理列表
    models: () => [import('@/models/container/merchant/activityMan/activityListMan')],
    component: () => import('@/routes/container/merchant/activityMan/activityListMan'),
  },
  {
    path: '/merchant/activityDetails',   // 活动管理-活动详情
    models: () => [import('@/models/container/merchant/activityMan/activityDetails')],
    component: () => import('@/routes/container/merchant/activityMan/activityDetails'),
  },{
    path: '/merchant/purchaseDetail',   // 活动管理-活动详情-购买明细
    models: () => [import('@/models/container/merchant/activityMan/purchaseDetail')],
    component: () => import('@/routes/container/merchant/activityMan/purchaseDetail'),
  },
  {
    path: '/merchant/setActivityPut',   // 活动管理-设置活动上架
    models: () => [import('@/models/container/merchant/activityMan/setActivityPut')],
    component: () => import('@/routes/container/merchant/activityMan/setActivityPut'),
  },
  {
    path: '/merchant/createdActive',   // 活动管理-创建活动
    models: () => [import('@/models/container/merchant/activityMan/createdActive')],
    component: () => import('@/routes/container/merchant/activityMan/createdActive'),
  },
  {
    path: '/merchant/editorActives',   // 活动管理-编辑活动
    models: () => [import('@/models/container/merchant/activityMan/editorActives')],
    component: () => import('@/routes/container/merchant/activityMan/editorActives'),
  },
  {
    path: '/merchant/shareActiveConfig',   // 活动管理-分享配置
    models: () => [import('@/models/container/merchant/activityMan/shareActiveConfig')],
    component: () => import('@/routes/container/merchant/activityMan/shareActiveConfig'),
  }
];

export default merchant;