webpackJsonp([4],{"75JN":function(t,e){},"IH0+":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={name:"NoHeaderLayout",components:{Footer:n("sEd7").a}},a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("router-view"),this._v(" "),e("Footer")],1)},staticRenderFns:[]};var i=n("Z0/y")(r,a,!1,function(t){n("MW/4")},null,null);e.default=i.exports},"MW/4":function(t,e){},NpON:function(t,e){},OLVh:function(t,e){},XDjx:function(t,e){},a4KA:function(t,e,n){"use strict";var r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"header_common"},[e("van-nav-bar",{attrs:{title:this.titleName,"left-arrow":""},on:{"click-left":this.routergo}})],1)},staticRenderFns:[]};var a=n("Z0/y")({name:"headers",data:function(){return{titleName:this.$route.name}},methods:{routergo:function(){this.$router.back(-1)}},watch:{$route:function(){this.titleName=this.$route.name}}},r,!1,function(t){n("OLVh")},null,null);e.a=a.exports},"i/0a":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("a4KA"),a=n("sEd7"),i={name:"Layout",components:{Header:r.a,Footer:a.a}},s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("Header"),this._v(" "),e("router-view"),this._v(" "),e("Footer")],1)},staticRenderFns:[]};var o=n("Z0/y")(i,s,!1,function(t){n("XDjx")},null,null);e.default=o.exports},sEd7:function(t,e,n){"use strict";n("NpON");var r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"footer"},[n("ul",{staticClass:"footer_nav"},[n("li",[n("router-link",{attrs:{"active-class":"router-link-active",to:"/index"}},[n("i",{staticClass:"indexIcon"}),t._v(" "),n("span",[t._v("首页")])])],1),t._v(" "),n("li",[n("router-link",{attrs:{"active-class":"router-link-active",to:"/classify"}},[n("i",{staticClass:"classIcon"}),t._v(" "),n("span",[t._v("分类")])])],1),t._v(" "),n("li",[n("router-link",{attrs:{"active-class":"router-link-active",to:"/mine"}},[n("i",{staticClass:"mineIcon"}),t._v(" "),n("span",[t._v("我的")])])],1)])])},staticRenderFns:[]};var a=n("Z0/y")({name:"Footer"},r,!1,function(t){n("75JN")},"data-v-b5d90ee0",null);e.a=a.exports}});
//# sourceMappingURL=4.3faf5657670099fc8393.js.map