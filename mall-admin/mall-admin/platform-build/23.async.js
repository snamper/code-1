webpackJsonp([23],{383:function(e,t,r){"use strict";function n(e){switch(e.arrayFormat){case"index":return function(t,r,n){return null===r?[o(t,e),"[",n,"]"].join(""):[o(t,e),"[",o(n,e),"]=",o(r,e)].join("")};case"bracket":return function(t,r){return null===r?o(t,e):[o(t,e),"[]=",o(r,e)].join("")};default:return function(t,r){return null===r?o(t,e):[o(t,e),"=",o(r,e)].join("")}}}function a(e){var t;switch(e.arrayFormat){case"index":return function(e,r,n){if(t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),!t)return void(n[e]=r);void 0===n[e]&&(n[e]={}),n[e][t[1]]=r};case"bracket":return function(e,r,n){return t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0===n[e]?void(n[e]=[r]):void(n[e]=[].concat(n[e],r)):void(n[e]=r)};default:return function(e,t,r){if(void 0===r[e])return void(r[e]=t);r[e]=[].concat(r[e],t)}}}function o(e,t){return t.encode?t.strict?i(e):encodeURIComponent(e):e}function c(e){return Array.isArray(e)?e.sort():"object"==typeof e?c(Object.keys(e)).sort(function(e,t){return Number(e)-Number(t)}).map(function(t){return e[t]}):e}var i=r(399),u=r(65);t.extract=function(e){return e.split("?")[1]||""},t.parse=function(e,t){t=u({arrayFormat:"none"},t);var r=a(t),n=Object.create(null);return"string"!=typeof e?n:(e=e.trim().replace(/^(\?|#|&)/,""))?(e.split("&").forEach(function(e){var t=e.replace(/\+/g," ").split("="),a=t.shift(),o=t.length>0?t.join("="):void 0;o=void 0===o?null:decodeURIComponent(o),r(decodeURIComponent(a),o,n)}),Object.keys(n).sort().reduce(function(e,t){var r=n[t];return Boolean(r)&&"object"==typeof r&&!Array.isArray(r)?e[t]=c(r):e[t]=r,e},Object.create(null))):n},t.stringify=function(e,t){t=u({encode:!0,strict:!0,arrayFormat:"none"},t);var r=n(t);return e?Object.keys(e).sort().map(function(n){var a=e[n];if(void 0===a)return"";if(null===a)return o(n,t);if(Array.isArray(a)){var c=[];return a.slice().forEach(function(e){void 0!==e&&c.push(r(n,e,c.length))}),c.join("&")}return o(n,t)+"="+o(a,t)}).filter(function(e){return e.length>0}).join("&"):""}},399:function(e,t,r){"use strict";e.exports=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}},643:function(e,t,r){"use strict";r.d(t,"b",function(){return i}),r.d(t,"a",function(){return u});var n=r(15),a=r.n(n),o=r(383),c=r.n(o),i=["/platform/merchantAccount","/platform/merchantChannelManager","/platform/supplierManager","/platform/memberManage","/platform/platemGoodsManager","/platform/platemAddGoods","/platform/platemGoodsHouse","/platform/checkPendingGoods","/platform/goodsRecycle","/merchant/goodsPackMan","/platform/platemOrderManage","/platform/platemStoreManage","/platform/platemCateManage","/platform/goodsAudit"],u=function(e,t,r){t.listen(function(t){var n,o=c.a.parse(t.search);if(n=o.pageNo&&o.pageSize?c.a.parse(t.search):a()({},o,{pageNo:1,pageSize:10}),t.pathname===r)return e({type:"query",payload:n})})}},922:function(e,t,r){"use strict";function n(e){return Object(d.a)({url:f,method:"get",data:e})}function a(e){return Object(d.a)({url:g,method:"post",data:e})}Object.defineProperty(t,"__esModule",{value:!0});var o=r(72),c=r.n(o),i=(r(68),r(69)),u=r.n(i),s=r(15),p=r.n(s),d=r(183),l=r(25),f=l.api.stokeMan,g=l.api.saveThreshold,m=r(643);t.default={namespace:"stockList",state:{dataSource:[],totalSize:0,pageSize:10,currentPage:1,isUpdate:!1,visible:!1,currentItem:{},updateThreshold:""},subscriptions:{setup:function(e){var t=e.dispatch,r=e.history;Object(m.a)(t,r,m.b[11])}},reducers:{getList:function(e,t){return p()({},e,{dataSource:t.dataSource?t.dataSource:"",totalSize:t.totalSize?t.totalSize:e.totalSize,currentPage:t.currentPage?t.currentPage:e.currentPage,pageSize:t.pageSize?t.pageSize:e.pageSize})},changeThreshold:function(e,t){return p()({},e,{updateThreshold:t.index||0===t.index?t.index:""})}},effects:{query:c.a.mark(function e(t,r){var a,o,i,s,p,d,l,f,g;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.payload,o=r.put,i=r.call,s=r.select,e.next=4,i(n,a);case 4:if(p=e.sent,!p.success){e.next=14;break}return d=p.data.datas.list,l=p.data.totalRows,f=p.data.pageNo,g=p.data.pageSize,e.next=12,o({type:"getList",dataSource:d,totalSize:l,currentPage:f,pageSize:g});case 12:e.next=15;break;case 14:u.a.error(p.message);case 15:case"end":return e.stop()}},e,this)}),saveThreshold:c.a.mark(function e(t,r){var n,o,i,s,p,d;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.payload,o=r.put,i=r.call,e.next=4,o({type:"app/noLoading",noLoading:!0});case 4:return s=n.values(),p={id:String(n.id),stockThreshold:s.value},e.next=8,i(a,p);case 8:if(d=e.sent,"\u6210\u529f"!==d.message){e.next=15;break}return e.next=12,o({type:"app/noLoading",noLoading:!1});case 12:window.location.reload(),e.next=16;break;case 15:u.a.error(d.message);case 16:case"end":return e.stop()}},e,this)})}}}});