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
    path:'/merchant/platemOrderManage', //订单管理
    models: () => [import('@/models/container/merchant/platemOrderManage')],
    component: () => import('@/routes/container/merchant/platemOrderManage'),
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
  }
];

export default merchant;