webpackJsonp([37],{383:function(e,t,a){"use strict";function r(e){switch(e.arrayFormat){case"index":return function(t,a,r){return null===a?[c(t,e),"[",r,"]"].join(""):[c(t,e),"[",c(r,e),"]=",c(a,e)].join("")};case"bracket":return function(t,a){return null===a?c(t,e):[c(t,e),"[]=",c(a,e)].join("")};default:return function(t,a){return null===a?c(t,e):[c(t,e),"=",c(a,e)].join("")}}}function n(e){var t;switch(e.arrayFormat){case"index":return function(e,a,r){if(t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),!t)return void(r[e]=a);void 0===r[e]&&(r[e]={}),r[e][t[1]]=a};case"bracket":return function(e,a,r){return t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0===r[e]?void(r[e]=[a]):void(r[e]=[].concat(r[e],a)):void(r[e]=a)};default:return function(e,t,a){if(void 0===a[e])return void(a[e]=t);a[e]=[].concat(a[e],t)}}}function c(e,t){return t.encode?t.strict?i(e):encodeURIComponent(e):e}function o(e){return Array.isArray(e)?e.sort():"object"==typeof e?o(Object.keys(e)).sort(function(e,t){return Number(e)-Number(t)}).map(function(t){return e[t]}):e}var i=a(392),s=a(64);t.extract=function(e){return e.split("?")[1]||""},t.parse=function(e,t){t=s({arrayFormat:"none"},t);var a=n(t),r=Object.create(null);return"string"!=typeof e?r:(e=e.trim().replace(/^(\?|#|&)/,""))?(e.split("&").forEach(function(e){var t=e.replace(/\+/g," ").split("="),n=t.shift(),c=t.length>0?t.join("="):void 0;c=void 0===c?null:decodeURIComponent(c),a(decodeURIComponent(n),c,r)}),Object.keys(r).sort().reduce(function(e,t){var a=r[t];return Boolean(a)&&"object"==typeof a&&!Array.isArray(a)?e[t]=o(a):e[t]=a,e},Object.create(null))):r},t.stringify=function(e,t){t=s({encode:!0,strict:!0,arrayFormat:"none"},t);var a=r(t);return e?Object.keys(e).sort().map(function(r){var n=e[r];if(void 0===n)return"";if(null===n)return c(r,t);if(Array.isArray(n)){var o=[];return n.slice().forEach(function(e){void 0!==e&&o.push(a(r,e,o.length))}),o.join("&")}return c(r,t)+"="+c(n,t)}).filter(function(e){return e.length>0}).join("&"):""}},392:function(e,t,a){"use strict";e.exports=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}},491:function(e,t,a){"use strict";a.d(t,"b",function(){return i}),a.d(t,"a",function(){return s});var r=a(16),n=a.n(r),c=a(383),o=a.n(c),i=["/merchant/merchantAccount","/merchant/merchantMessage","/merchant/merchantMemberManage","/merchant/merchantChooseGoods","/merchant/merchantCancelGoods","/merchant/merchantGoodsManage","/merchant/platemOrderManage","/merchant/merchantRecommendGoods","/merchant/merchantBannerManager","/merchant/goodsPackMan","/merchant/addGoodsPack","/merchant/editorGoodsPack","/merchant/activityPutaway","/merchant/createdActive","/merchant/editorActives","/merchant/activityDetails","/merchant/purchaseDetail","/merchant/shareActiveConfig","/merchant/setActivityPut","/merchant/activityListMan","/merchant/goodsPackDetail"],s=function(e,t,a){t.listen(function(t){var r,c=o.a.parse(t.search);if(r=c.pageNo&&c.pageSize?o.a.parse(t.search):n()({},c,{pageNo:1,pageSize:10}),t.pathname===a)return e({type:"query",payload:r})})}},665:function(e,t,a){"use strict";function r(e){if(e.url&&e.url.indexOf("//")>-1){var t="".concat(e.url.split("//")[0],"//").concat(e.url.split("//")[1].split("/")[0]);window.location.origin!==t&&(z.CORS&&z.CORS.indexOf(t)>-1?e.fetchType="CORS":z.YQL&&z.YQL.indexOf(t)>-1?e.fetchType="YQL":e.fetchType="JSONP")}return P(e).then(function(t){var a=t.statusText,r=t.status;if(4033===t.data.code)return void(window.location.href="/#/login");var n="YQL"===e.fetchType?t.data.query.results.json:t.data;return n instanceof Array&&(n={list:n}),i.a.resolve(c()({success:!0,message:a,statusCode:r},n))}).catch(function(e){var t=e.response;if(t&&t instanceof Object){var a=t.data,r=t.statusText;t.status,a.message||r}else 600,e.message||"Network Error";return window.location.href="/#/error",!0})}t.a=r;var n=a(16),c=a.n(n),o=a(70),i=a.n(o),s=a(105),u=(a.n(s),a(106)),l=a.n(u),d=a(33),p=a.n(d),f=a(110),h=a.n(f),m=a(176),g=a.n(m),v=a(177),y=a.n(v),b=a(178),w=a.n(b),S=a(179),j=a.n(S),x=a(180),O=a.n(x),z=a(32),P=(a.n(z),function(e){var t=e.method,a=void 0===t?"get":t,r=e.data,n=e.fetchType,c=e.url,o=j.a.cloneDeep(r);try{var s="";if(c.match(/[a-zA-z]+:\/\/[^\/]*/)){var u=c.match(/[a-zA-z]+:\/\/[^\/]*/);s=h()(u,1)[0],c=c.slice(s.length)}var d=O.a.parse(c);c=O.a.compile(c)(r);var f=!0,m=!1,v=void 0;try{for(var b,S=p()(d);!(f=(b=S.next()).done);f=!0){var x=b.value;x instanceof Object&&x.name in o&&delete o[x.name]}}catch(e){m=!0,v=e}finally{try{f||null==S.return||S.return()}finally{if(m)throw v}}c=s+c}catch(e){l.a.error(e.message)}if("JSONP"===n)return new i.a(function(e,t){w()(c,{param:"".concat(y.a.stringify(r),"&callback"),name:"jsonp_".concat((new Date).getTime()),timeout:4e3},function(a,r){a&&t(a),e({statusText:"OK",status:200,data:r})})});switch("YQL"===n&&(c="http://query.yahooapis.com/v1/public/yql?q=select * from json where url='".concat(e.url,"?").concat(encodeURIComponent(y.a.stringify(e.data)),"'&format=json"),r=null),a.toLowerCase()){case"get":return g.a.get(c,{params:o});case"delete":return g.a.delete(c,{data:o});case"post":return g.a.post(c,o);case"put":return g.a.put(c,o);case"patch":return g.a.patch(c,o);default:return g()(e)}})},888:function(e,t,a){"use strict";function r(e){return Object(f.a)({url:g,method:"post",data:e})}function n(e){return Object(h.a)({url:v,method:"post",data:e})}function c(e){return Object(f.a)({url:y,method:"post",data:e})}function o(e){return Object(f.a)({url:b,method:"get",data:e})}Object.defineProperty(t,"__esModule",{value:!0});var i=a(69),s=a.n(i),u=(a(105),a(106)),l=a.n(u),d=a(16),p=a.n(d),f=a(109),h=a(665),m=a(32),g=m.api.cancelProductList,v=m.api.cancelProductUrl,y=m.api.cancelProductAllUrl,b=m.api.getTypeListUrl,w=a(491);t.default={namespace:"cancelGoodsModel",state:{dataSource:[],totalSize:0,pageSize:10,currentPage:1,isUpdate:!1,visible:!1,currentItem:{},chooseGoodsIds:[],chooseGoodsKeys:[],getTypeList:[]},subscriptions:{setup:function(e){var t=e.dispatch,a=e.history;Object(w.a)(t,a,w.b[4])}},reducers:{getList:function(e,t){return p()({},e,{dataSource:t.dataSource?t.dataSource:"",totalSize:t.totalSize?t.totalSize:e.totalSize,currentPage:t.currentPage?t.currentPage:e.currentPage,pageSize:t.pageSize?t.pageSize:e.pageSize})},getTypeList:function(e,t){return p()({},e,{getTypeList:t.getTypeList?t.getTypeList:""})},changeChooseGoods:function(e,t){return p()({},e,{chooseGoodsIds:t.chooseGoodsIds,chooseGoodsKeys:t.chooseGoodsKeys})},showDialog:function(e,t){var a=t.payload;return p()({},e,a,{visible:!0})},hideDialog:function(e){return p()({},e,{visible:!1,currentItem:{},isUpdate:!1})},dialogControll:function(e,t){return p()({},e,{visible:t.visible,isUpdate:t.isUpdate})}},effects:{query:s.a.mark(function e(t,a){var n,c,i,u,d,p,f,h,m,g,v,y,b,w;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.payload,c=void 0===n?{}:n,i=t.pageNo,u=t.pageSize,d=a.put,p=a.call,f=a.select,e.next=4,p(r,c);case 4:if(h=e.sent,console.log(h),!h.success){e.next=15;break}return m=h.data.datas,g=h.data.totalRows,v=h.data.pageNo,y=h.data.pageSize,e.next=13,d({type:"getList",dataSource:m,totalSize:g,currentPage:v,pageSize:y});case 13:e.next=16;break;case 15:l.a.error(h.message);case 16:return e.next=18,p(o,c);case 18:if(b=e.sent,"\u6210\u529f"!==b.message){e.next=26;break}return w=b.data,console.log(b),e.next=24,d({type:"getTypeList",getTypeList:w});case 24:e.next=27;break;case 26:l.a.error(h.message);case 27:case"end":return e.stop()}},e,this)}),cancelProduct:s.a.mark(function e(t,a){var r,c,o,i,u;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.payload,c=a.put,o=a.call,i=a.select,e.next=4,o(n,r);case 4:u=e.sent,"\u6210\u529f"===u.message?(l.a.success("\u53d6\u6d88\u6210\u529f"),window.location.reload()):l.a.error(u.message);case 6:case"end":return e.stop()}},e,this)}),cancelProductBatch:s.a.mark(function e(t,a){var r,n,o,i,u;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.payload,n=a.put,o=a.call,i=a.select,e.next=4,o(c,r);case 4:return u=e.sent,e.abrupt("return",u);case 6:case"end":return e.stop()}},e,this)})}}}});