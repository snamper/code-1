webpackJsonp([36],{383:function(e,t,a){"use strict";function n(e){switch(e.arrayFormat){case"index":return function(t,a,n){return null===a?[r(t,e),"[",n,"]"].join(""):[r(t,e),"[",r(n,e),"]=",r(a,e)].join("")};case"bracket":return function(t,a){return null===a?r(t,e):[r(t,e),"[]=",r(a,e)].join("")};default:return function(t,a){return null===a?r(t,e):[r(t,e),"=",r(a,e)].join("")}}}function o(e){var t;switch(e.arrayFormat){case"index":return function(e,a,n){if(t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),!t)return void(n[e]=a);void 0===n[e]&&(n[e]={}),n[e][t[1]]=a};case"bracket":return function(e,a,n){return t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0===n[e]?void(n[e]=[a]):void(n[e]=[].concat(n[e],a)):void(n[e]=a)};default:return function(e,t,a){if(void 0===a[e])return void(a[e]=t);a[e]=[].concat(a[e],t)}}}function r(e,t){return t.encode?t.strict?s(e):encodeURIComponent(e):e}function c(e){return Array.isArray(e)?e.sort():"object"==typeof e?c(Object.keys(e)).sort(function(e,t){return Number(e)-Number(t)}).map(function(t){return e[t]}):e}var s=a(392),i=a(64);t.extract=function(e){return e.split("?")[1]||""},t.parse=function(e,t){t=i({arrayFormat:"none"},t);var a=o(t),n=Object.create(null);return"string"!=typeof e?n:(e=e.trim().replace(/^(\?|#|&)/,""))?(e.split("&").forEach(function(e){var t=e.replace(/\+/g," ").split("="),o=t.shift(),r=t.length>0?t.join("="):void 0;r=void 0===r?null:decodeURIComponent(r),a(decodeURIComponent(o),r,n)}),Object.keys(n).sort().reduce(function(e,t){var a=n[t];return Boolean(a)&&"object"==typeof a&&!Array.isArray(a)?e[t]=c(a):e[t]=a,e},Object.create(null))):n},t.stringify=function(e,t){t=i({encode:!0,strict:!0,arrayFormat:"none"},t);var a=n(t);return e?Object.keys(e).sort().map(function(n){var o=e[n];if(void 0===o)return"";if(null===o)return r(n,t);if(Array.isArray(o)){var c=[];return o.slice().forEach(function(e){void 0!==e&&c.push(a(n,e,c.length))}),c.join("&")}return r(n,t)+"="+r(o,t)}).filter(function(e){return e.length>0}).join("&"):""}},392:function(e,t,a){"use strict";e.exports=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}},491:function(e,t,a){"use strict";a.d(t,"b",function(){return s}),a.d(t,"a",function(){return i});var n=a(16),o=a.n(n),r=a(383),c=a.n(r),s=["/merchant/merchantAccount","/merchant/merchantMessage","/merchant/merchantMemberManage","/merchant/merchantChooseGoods","/merchant/merchantCancelGoods","/merchant/merchantGoodsManage","/merchant/platemOrderManage","/merchant/merchantRecommendGoods","/merchant/merchantBannerManager","/merchant/goodsPackMan","/merchant/addGoodsPack","/merchant/editorGoodsPack","/merchant/activityPutaway","/merchant/createdActive","/merchant/editorActives","/merchant/activityDetails","/merchant/purchaseDetail","/merchant/shareActiveConfig","/merchant/setActivityPut","/merchant/activityListMan","/merchant/goodsPackDetail"],i=function(e,t,a){t.listen(function(t){var n,r=c.a.parse(t.search);if(n=r.pageNo&&r.pageSize?c.a.parse(t.search):o()({},r,{pageNo:1,pageSize:10}),t.pathname===a)return e({type:"query",payload:n})})}},665:function(e,t,a){"use strict";function n(e){if(e.url&&e.url.indexOf("//")>-1){var t="".concat(e.url.split("//")[0],"//").concat(e.url.split("//")[1].split("/")[0]);window.location.origin!==t&&(k.CORS&&k.CORS.indexOf(t)>-1?e.fetchType="CORS":k.YQL&&k.YQL.indexOf(t)>-1?e.fetchType="YQL":e.fetchType="JSONP")}return G(e).then(function(t){var a=t.statusText,n=t.status;if(4033===t.data.code)return void(window.location.href="/#/login");var o="YQL"===e.fetchType?t.data.query.results.json:t.data;return o instanceof Array&&(o={list:o}),s.a.resolve(r()({success:!0,message:a,statusCode:n},o))}).catch(function(e){var t=e.response;if(t&&t instanceof Object){var a=t.data,n=t.statusText;t.status,a.message||n}else 600,e.message||"Network Error";return window.location.href="/#/error",!0})}t.a=n;var o=a(16),r=a.n(o),c=a(70),s=a.n(c),i=a(105),u=(a.n(i),a(106)),d=a.n(u),l=a(33),p=a.n(l),h=a(110),f=a.n(h),m=a(176),g=a.n(m),y=a(177),v=a.n(y),b=a(178),x=a.n(b),w=a(179),C=a.n(w),S=a(180),j=a.n(S),k=a(32),G=(a.n(k),function(e){var t=e.method,a=void 0===t?"get":t,n=e.data,o=e.fetchType,r=e.url,c=C.a.cloneDeep(n);try{var i="";if(r.match(/[a-zA-z]+:\/\/[^\/]*/)){var u=r.match(/[a-zA-z]+:\/\/[^\/]*/);i=f()(u,1)[0],r=r.slice(i.length)}var l=j.a.parse(r);r=j.a.compile(r)(n);var h=!0,m=!1,y=void 0;try{for(var b,w=p()(l);!(h=(b=w.next()).done);h=!0){var S=b.value;S instanceof Object&&S.name in c&&delete c[S.name]}}catch(e){m=!0,y=e}finally{try{h||null==w.return||w.return()}finally{if(m)throw y}}r=i+r}catch(e){d.a.error(e.message)}if("JSONP"===o)return new s.a(function(e,t){x()(r,{param:"".concat(v.a.stringify(n),"&callback"),name:"jsonp_".concat((new Date).getTime()),timeout:4e3},function(a,n){a&&t(a),e({statusText:"OK",status:200,data:n})})});switch("YQL"===o&&(r="http://query.yahooapis.com/v1/public/yql?q=select * from json where url='".concat(e.url,"?").concat(encodeURIComponent(v.a.stringify(e.data)),"'&format=json"),n=null),a.toLowerCase()){case"get":return g.a.get(r,{params:c});case"delete":return g.a.delete(r,{data:c});case"post":return g.a.post(r,c);case"put":return g.a.put(r,c);case"patch":return g.a.patch(r,c);default:return g()(e)}})},886:function(e,t,a){"use strict";function n(e){return Object(h.a)({url:b,method:"get",data:e})}function o(e){return Object(h.a)({url:g,method:"get",data:e})}function r(e){return Object(m.a)({url:y,method:"post",data:e})}function c(e){return Object(m.a)({url:v,method:"post",data:e})}Object.defineProperty(t,"__esModule",{value:!0});var s=a(191),i=a.n(s),u=a(69),d=a.n(u),l=a(16),p=a.n(l),h=a(109),f=a(32),m=a(665),g=(f.api.checkedProducts,f.api.goodscatelist,f.api.goodslist),y=f.api.addtypeproduct,v=f.api.addbatchproduct,b=f.api.selectGoods,x=a(491);t.default={namespace:"goodsCate",state:{dataSource:[],defaultExpandedRowKeys:[],goodsList:[],totalSize:0,pageSize:10,currentPage:1,visible:!1,chooseCateId:"",totalSizeModal:0,pageSizeModal:10,currentPageModal:1,chooseGoodsIds:[],chooseGoodsKeys:[],chooseCateIds:[],chooseCateKeys:[],productName:"",merchantName:""},subscriptions:{setup:function(e){var t=e.dispatch,a=e.history;Object(x.a)(t,a,x.b[3])}},reducers:{getList:function(e,t){return p()({},e,{dataSource:t.dataSource,totalSize:t.totalSize,currentPage:t.currentPage,pageSize:t.pageSize,channelId:t.channelId,visible:!1,chooseGoodsIds:[],chooseGoodsKeys:[]})},showDialog:function(e,t){return p()({},e,{visible:!0,chooseCateId:t.payload.sortId||"",goodsList:t.goodsList.datas,totalSizeModal:t.goodsList.totalRows,pageSizeModal:t.goodsList.pageSize<10?10:t.goodsList.pageSize,currentPageModal:t.goodsList.pageNo,productName:t.payload.productName?t.payload.productName:"",merchantName:t.payload.merchantName?t.payload.merchantName:""})},hideDialog:function(e){return p()({},e,{visible:!1,chooseCateId:"",chooseGoodsIds:[],chooseGoodsKeys:[]})},changeChooseGoodsCate:function(e,t){return p()({},e,{chooseCateIds:t.chooseCateIds?t.chooseCateIds:[],chooseCateKeys:t.chooseCateKeys?t.chooseCateKeys:[]})},changeChooseGoods:function(e,t){return p()({},e,{chooseGoodsIds:t.chooseGoodsIds,chooseGoodsKeys:t.chooseGoodsKeys})},changeExpandRows:function(e,t){return p()({},e,{defaultExpandedRowKeys:t.defaultExpandedRowKeys})}},effects:{query:d.a.mark(function e(t,a){var o,r,c,s,i,u,l,p,h,f,m;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return o=t.payload,r=void 0===o?{}:o,c=t.source,s=a.put,i=a.call,e.next=4,i(n,r);case 4:if(u=e.sent,console.log(u),!u.success){e.next=19;break}return l=u.data.datas,p=u.data.totalRows,h=u.data.pageNo,f=u.data.pageSize,m=r.channelId,e.next=14,s({type:"getList",dataSource:l,totalSize:p,currentPage:h,pageSize:f,channelId:m});case 14:if("clearKeys"!==c){e.next=17;break}return e.next=17,s({type:"changeChooseGoodsCate"});case 17:e.next=20;break;case 19:console.log("out");case 20:case"end":return e.stop()}},e,this)}),getGoodsList:d.a.mark(function e(t,a){var n,r,c,s,i,u,l;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.payload,r=void 0===n?{}:n,c=a.select,s=a.put,i=a.call,e.next=4,i(o,r);case 4:if(u=e.sent,!u.success){e.next=11;break}return l=u.data,e.next=9,s({type:"showDialog",goodsList:l,payload:r});case 9:e.next=12;break;case 11:console.log("out");case 12:case"end":return e.stop()}},e,this)}),chooseGoods:d.a.mark(function e(t,a){var n,r,c,s,i,u;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.payload,r=void 0===n?{}:n,c=a.put,s=a.call,e.next=4,s(o,r);case 4:if(i=e.sent,!i.success){e.next=11;break}return u=i.data,e.next=9,c({type:"showDialog",goodsList:u,payload:r});case 9:e.next=11;break;case 11:case"end":return e.stop()}},e,this)}),hideDialog:d.a.mark(function e(t,a){var n,o,r,c,s;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.test,o=a.put,r=a.call,c=!1,s=!1,e.next=6,o({type:"dialogControll",visible:c,isUpdate:s});case 6:case"end":return e.stop()}},e,this)}),commitGoodsByCate:d.a.mark(function e(t,a){var n,o,c,s,u;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.ids,o=a.put,c=a.call,s={ids:i()(n)},e.next=5,c(r,s);case 5:return u=e.sent,e.abrupt("return",u);case 7:case"end":return e.stop()}},e,this)}),commitGoods:d.a.mark(function e(t,a){var n,o,r,s,u,l,p;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.ids,o=t.dispatch,r=t.payload,s=a.put,u=a.call,l={ids:i()(n)},e.next=5,u(c,l);case 5:return p=e.sent,e.abrupt("return",p);case 7:case"end":return e.stop()}},e,this)}),saveMessage:function(e,t){var a=e.validateFieldsAndScroll;t.put,t.call;a(function(e,t){console.log(t)})}}}}});