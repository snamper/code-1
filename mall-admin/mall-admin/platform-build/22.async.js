webpackJsonp([22],{383:function(t,e,r){"use strict";function a(t){switch(t.arrayFormat){case"index":return function(e,r,a){return null===r?[o(e,t),"[",a,"]"].join(""):[o(e,t),"[",o(a,t),"]=",o(r,t)].join("")};case"bracket":return function(e,r){return null===r?o(e,t):[o(e,t),"[]=",o(r,t)].join("")};default:return function(e,r){return null===r?o(e,t):[o(e,t),"=",o(r,t)].join("")}}}function n(t){var e;switch(t.arrayFormat){case"index":return function(t,r,a){if(e=/\[(\d*)\]$/.exec(t),t=t.replace(/\[\d*\]$/,""),!e)return void(a[t]=r);void 0===a[t]&&(a[t]={}),a[t][e[1]]=r};case"bracket":return function(t,r,a){return e=/(\[\])$/.exec(t),t=t.replace(/\[\]$/,""),e?void 0===a[t]?void(a[t]=[r]):void(a[t]=[].concat(a[t],r)):void(a[t]=r)};default:return function(t,e,r){if(void 0===r[t])return void(r[t]=e);r[t]=[].concat(r[t],e)}}}function o(t,e){return e.encode?e.strict?u(t):encodeURIComponent(t):t}function c(t){return Array.isArray(t)?t.sort():"object"==typeof t?c(Object.keys(t)).sort(function(t,e){return Number(t)-Number(e)}).map(function(e){return t[e]}):t}var u=r(399),i=r(65);e.extract=function(t){return t.split("?")[1]||""},e.parse=function(t,e){e=i({arrayFormat:"none"},e);var r=n(e),a=Object.create(null);return"string"!=typeof t?a:(t=t.trim().replace(/^(\?|#|&)/,""))?(t.split("&").forEach(function(t){var e=t.replace(/\+/g," ").split("="),n=e.shift(),o=e.length>0?e.join("="):void 0;o=void 0===o?null:decodeURIComponent(o),r(decodeURIComponent(n),o,a)}),Object.keys(a).sort().reduce(function(t,e){var r=a[e];return Boolean(r)&&"object"==typeof r&&!Array.isArray(r)?t[e]=c(r):t[e]=r,t},Object.create(null))):a},e.stringify=function(t,e){e=i({encode:!0,strict:!0,arrayFormat:"none"},e);var r=a(e);return t?Object.keys(t).sort().map(function(a){var n=t[a];if(void 0===n)return"";if(null===n)return o(a,e);if(Array.isArray(n)){var c=[];return n.slice().forEach(function(t){void 0!==t&&c.push(r(a,t,c.length))}),c.join("&")}return o(a,e)+"="+o(n,e)}).filter(function(t){return t.length>0}).join("&"):""}},399:function(t,e,r){"use strict";t.exports=function(t){return encodeURIComponent(t).replace(/[!'()*]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}},643:function(t,e,r){"use strict";r.d(e,"b",function(){return u}),r.d(e,"a",function(){return i});var a=r(15),n=r.n(a),o=r(383),c=r.n(o),u=["/platform/merchantAccount","/platform/merchantChannelManager","/platform/supplierManager","/platform/memberManage","/platform/platemGoodsManager","/platform/platemAddGoods","/platform/platemGoodsHouse","/platform/checkPendingGoods","/platform/goodsRecycle","/merchant/goodsPackMan","/platform/platemOrderManage","/platform/platemStoreManage","/platform/platemCateManage","/platform/goodsAudit"],i=function(t,e,r){e.listen(function(e){var a,o=c.a.parse(e.search);if(a=o.pageNo&&o.pageSize?c.a.parse(e.search):n()({},o,{pageNo:1,pageSize:10}),e.pathname===r)return t({type:"query",payload:a})})}},769:function(t,e,r){"use strict";function a(t){return Object(D.a)({url:U,method:"get",data:t})}function n(t){return Object(D.a)({url:k,method:"post",data:t})}function o(t){return Object(M.a)({url:A,method:"post",data:t})}function c(t){return Object(D.a)({url:I,method:"post",data:t})}function u(t){return Object(M.a)({url:L,method:"post",data:t})}function i(t){return Object(M.a)({url:C,method:"post",data:t})}function s(t){return Object(M.a)({url:F,method:"post",data:t})}function d(t){return Object(M.a)({url:P,method:"post",data:t})}function l(t){return Object(D.a)({url:N,method:"get",data:t})}function p(t){return Object(D.a)({url:E,method:"post",data:t})}function f(t){return Object(D.a)({url:G,method:"post",data:t})}function m(t){return Object(D.a)({url:R,method:"post",data:t})}function g(t){return Object(D.a)({url:_,method:"post",data:t})}function h(t){return Object(D.a)({url:q,method:"post",data:t})}function b(t){return Object(D.a)({url:S,method:"get",data:t})}function j(t){return Object(D.a)({url:w,method:"get",data:t})}function y(t){return Object(D.a)({url:$,method:"post",data:t})}function v(t){return Object(D.a)({url:B,method:"post",data:t})}function O(t){return Object(D.a)({url:T,method:"post",data:t})}e.o=a,e.e=n,e.s=o,e.h=c,e.c=u,e.b=i,e.a=s,e.k=d,e.m=l,e.l=p,e.p=f,e.f=m,e.q=g,e.d=h,e.i=b,e.g=j,e.j=y,e.r=v,e.n=O;var D=r(183),x=r(25),M=(r.n(x),r(189)),U=x.api.goodsList,A=x.api.saveCateMessage,I=x.api.cateManagerList,S=x.api.chooseGoodsList,w=x.api.exportGoodsList,k=x.api.goodscatelist,L=x.api.productBatchClassify,C=x.api.addProduct,P=x.api.getMerchant,N=x.api.productDetail,F=x.api.updategoods,E=x.api.auditProduct,G=x.api.onlineUrl,R=x.api.deleteUrl,_=x.api.queryAllOnLineUrl,q=x.api.batchOnLineUrl,$=x.api.getChooseGoodsOutLineUrl,B=x.api.queryOutBatchLineUrl,T=x.api.setExchange},918:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r(72),n=r.n(a),o=r(68),c=(r.n(o),r(69)),u=r.n(c),i=r(15),s=r.n(i),d=r(769),l=r(643);e.default={namespace:"goodsAuditModel",state:{isUpdate:!1,ifShowDetail:!1,showFailReason:!0,productType:1,listImgUrl:{},mainImgUrl:{},imgList:[],loading:!1,goodsDetail:"",goodsId:"",currentProduct:"",productMerchant:"1",exchangeMessage:{productAdAttr:"1",exchangeMethods:"1"},extendedDetail:{},AuditVisble:!1},subscriptions:{setup:function(t){var e=t.dispatch,r=t.history;Object(l.a)(e,r,l.b[13])}},reducers:{getGoodsDetail:function(t,e){return s()({},t,{currentProduct:e.currentProduct||"",exchangeMessage:e.currentProduct.product_detail,extendedDetail:e.productExtendedDetail||{},goodsId:e.id,step:2,isUpdate:!(!e.source||"1"!==e.source),ifShowDetail:!(!e.source||"2"!==e.source),listImgUrl:e.listImgUrl?e.listImgUrl:{},mainImgUrl:e.mainImgUrl?e.mainImgUrl:{},imgList:e.imgList?e.imgList:[],goodsDetail:e.currentProduct.product_detail.product_describe,productMerchant:"10000"===String(e.currentProduct.product_detail.channel_type)?"1":"2",showFailReason:!0})},dialogControll:function(t,e){return s()({},t,{AuditVisble:!t.AuditVisble})},changeStatus:function(t,e){return s()({},t,{showFailReason:!t.showFailReason})}},effects:{query:n.a.mark(function t(e,r){var a,o,c,i,s,l,p,f,m,g,h,b,j;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(a=e.payload,o=void 0===a?{}:a,c=r.put,i=r.call,o.id){t.next=5;break}return u.a.error("\u5546\u54c1\u67e5\u8be2\u5931\u8d25"),t.abrupt("return");case 5:return t.next=7,i(d.m,{productId:o.id});case 7:if(s=t.sent,!s.success){t.next=19;break}for(console.log(s.data),f=[],m=0;m<s.data.img.length;m++)g=s.data.img[m],g.imgUrl=g.image_url,"1"===String(g.type)?l=g:"2"===String(g.type)?p=g:f.push(g);if(h=[],s.data.productExtendedDetail&&s.data.productExtendedDetail.length>0){for(b=0;b<s.data.productExtendedDetail.length;b++)j=s.data.productExtendedDetail[b],"announcements"===j.attrDicName?h.announcements=j.detailDesc:"statement"===j.attrDicName?h.statement=j.detailDesc:"useFlow"===j.attrDicName?h.useFlow=j.detailDesc:"usefulTime"===j.attrDicName?h.usefulTime=j.detailDesc:"purchaseSucceedsMsg"===j.attrDicName?h.purchaseSucceedsMsg=j.detailDesc:"purchaseSucceedsMsg"===j.attrDicName?h.purchaseSucceedsMsg=j.detailDesc:"purchaseSucceedsMsg"===j.attrDicName&&(h.purchaseSucceedsMsg=j.detailDesc);console.log(h)}return console.log(l),t.next=17,c({type:"getGoodsDetail",currentProduct:s.data,productExtendedDetail:h,source:o.source,listImgUrl:l,mainImgUrl:p,imgList:f,id:o.id});case 17:t.next=20;break;case 19:u.a.error(s.message);case 20:case"end":return t.stop()}},t,this)}),audit:n.a.mark(function t(e,r){var a,o,c,u,i;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.payload,o=void 0===a?{}:a,c=r.put,u=r.call,t.next=4,u(d.l,o);case 4:return i=t.sent,t.abrupt("return",i);case 6:case"end":return t.stop()}},t,this)})}}}});