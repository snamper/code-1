"use strict";
//起始日期选择器组件
var dateComponent = function(opt) {
	/******
	基于layui
	opt参数说明
	sMin：开始时日期最小值格式及限制 
	sMax：开始时日期最大值格式及限制 
	eMin：结束时日期格式及限制 
	format：日期格式
	上述3个参数都为非必需
	************/
	var _this = this;
	this.start = {
		min: (opt && opt.sMin) ? opt.sMin : '2017-01-01',
		max: (opt && opt.sMax) ? opt.sMax : laydate.now(),
		istime: (opt && opt.format) ? true : false,
		istoday: false,
		format: (opt && opt.format) ? opt.format : 'YYYY-MM-DD',
		choose: function(datas) {
			_this.end.min = datas; //开始日选好后，重置结束日的最小日期
			_this.end.start = datas //将结束日的初始值设定为开始日	
		}
	};
	this.end = {
		min: (opt && opt.eMin) ? opt.eMin : '2017-01-01',
		max: (opt && opt.eMax) ? opt.eMax : laydate.now(),
		istime: (opt && opt.format) ? true : false,
		istoday: false,
		format: (opt && opt.format) ? opt.format : 'YYYY-MM-DD',
		choose: function(datas) {
			_this.start.max = datas; //结束日选好后，重置开始日的最大日期
		}
	};
	this.init = function() {
		document.getElementById('LAY_demorange_s').onclick = function() {
			_this.start.elem = this;
			laydate(_this.start);
		}
		document.getElementById('LAY_demorange_e').onclick = function() {
			_this.end.elem = this;
			laydate(_this.end);
		}
		if(document.getElementById('LAY_demorange_ss')){
			document.getElementById('LAY_demorange_ss').onclick = function() {
				_this.start.elem = this;
				laydate(_this.start);
			}
			document.getElementById('LAY_demorange_ee').onclick = function() {
				_this.end.elem = this;
				laydate(_this.end);
			}
		}
	};
	_this.init();
}

//获取url查询参数
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return unescape(r[2]);
	}
	return null;
};
var beforeSend = function() {
	console.log("beforeSend");

}

function pricing(str) { //定价&售价
	var reg = /(^[0-9]{1,3})+(.[0-9]{2})?$/;
	if(Number(str) >= 0.01 && reg.test(str)) {
		return true;
	};
	return false;
};

function moreWords(str) { //商品介绍文本域
	var reg = 200;
	if(str.length <= reg) {
		return true;
	};
	return false;
};

function infoVerify(str, name) { //声明信息
	if(name == 'goodsNames') { //验证商品名称
		var reg = /^.[\u4E00-\u9FA5A-Za-z0-9]{0,15}$/;
	} else if(name == 'shortName') { //验证短商品名称
		var reg = /^.[\u4E00-\u9FA5A-Za-z0-9]{0,9}$/;
	} else if(name == 'proNum') { //验证商品数量||验证设置积分消耗里的购买数量
		var reg = /^[1-9][0-9]{0,8}$/;
	} else if(name == 'indate') { //验证兑换码有效期
		var reg = /^.[\u4E00-\u9FA50-9]{1,10}$/;
	} else if(name == 'notice') { //验证注意事项文本
		var reg = /^(.|\n){1,50}$/;
	} else if(name == 'usepro') { //验证使用流程文本
		var reg = /^(.|\n){1,500}$/;
	} else if(name == 'lawInfo') { //验证法律声明
		var reg = /^(.|\n){1,200}$/;
	} else if(name == 'btnInf') { //验证会员注册按钮
		var reg = /^.[\u4E00-\u9FA5A-Za-z]{0,10}$/;
	} else if(name == 'btnUrl') { //验证按钮链接
		var reg = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
	} else if(name == 'integral') { //验证设置积分消耗里的消耗积分
		var reg = /^[1-9][0-9]{0,}$/;
	}
	if(reg.test(str)) {
		return true;
	};
	return false;
};
//1-5数字(排序)
function regularSort(str, name) { //str为需要验证的val值，name为正则验证的区分
	if(name == '4') {
		var reg = /^[1-4]*$/;
	} else if(name == '8') {
		var reg = /^[1-8]*$/;
	}
	if(reg.test(str)) {
		return true;
	};
	return false;
};
//获取cookie里的登录用户id
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg)) {
		return unescape(arr[2]);
	} else {
		return null;
	}
}
//校验插件封装
/*
 * 使用个例子
 * $("").check().number()  /true or false
 * if(!$("").check().number()){
 * 		console.log($("").check().error)/ 错误提示信息
 * }
 */
(function($) {
	var wshc = $.fn.check = function() {
		return wshc.fn.init(this);
	} 
	wshc.fn = {
		init: function(obj) {
			wshc.fn.val = obj.val();
			return wshc.fn;
		},
		notNull: function() {
			if(this.val) {
				return true;
			}
			error("您没有输入任何字符!");
			return false;
		},
		number: function(min, max) { //检查字数是否超过限制  
			if(this.val.length >= min && this.val.length <= max) {
				return true;
			}
			error("只能输入" + min + "-" + max + "字!");
			return false;
		},
		specialChar: function(pat) { //检查是否包含特殊字符  
			var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>%/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]") ;
			if(pattern.test(this.val)){
			     return false;
			}
			return true;
		},
		isNum: function(len) { //检查是否为数字  
			if(!isNaN(this.val)) {
				return true;
			}
			error("必须输入数字!");
			return false;
		},
		integer: function() { //检查是否为整数  
			if(this.val == parseInt(this.val)) {
				return true;
			}
			error("必须输入整数！");
			return false;
		},
		noZero: function(val){//非零正整数
			var reg = /^[1-9]\d*$/;
			if(reg.test(val)){
			     return false;
			}
			return true;
		},
		hasZero: function(val){//非负的整数
			var reg = /^[0-9]\d*$/;
			if(reg.test(val)){
			     return false;
			}
			return true;
		},
		character: function (min,max){//文字
			var reg = RegExp("^.[\u4E00-\u9FA5A-Za-z0-9]{"+min+","+max+"}$","i");
			if(reg.test(this.val)) {
				if(strlen(this.val) <= max){
					return true;
				}else{
					return false;
				}
			}
			return false;
		},
		float: function() { //检查是否为小数  
			if(this.isNum() && !this.integer()) {
				return true;
			}
			error("您输入的不是小数！");
			return false;
		},
		rmb: function() { //检查是否为货币（RMB标准格式为：0.00 or 10.00 除个位数外首位不为零）  
			var pat = /^([1-9][0-9]+|[0-9])\.[0-9]{2}$/;
			error("您输入的不是人民币货币格式！");
			return mat(this.val, pat);
		},
		email: function(pat) { //检查是否符合电子邮件格式  
			pat = pat || /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{0,4}$/;
			error("请输入正确的email格式！");
			return mat(this.val, pat);
		},
		http: function(pat) { //检查是否为网站的地址（包含http）  
			pat = pat || /^(http|HTTP|https):\/\/[^s]*/;
			error("请输入正确的http路径！");
			return mat(this.val, pat);
		},
		url: function(pat) { //检查是否为通信地址  
			pat = pat || /^[a-zA-z]+:\/\/[^s]*/;
			error("请输入正确的路径！");
			return mat(this.val, pat);
		},
		image: function(pat) { //检查是否为图片地址(jpg gif png bmp jpeg )  
			pat = pat || /^(http|HTTP):\/\/[^s]*(jpg|JPG|png|PNG|gif|GIF|bmp|BMP|jpeg|JPEG)$/;
			error("您输入的不是网页允许的图片格式！");
			return mat(this.val, pat);
		},
		password: function(pat) {
			pat = pat || /^\w*$/;
			error("您输入的不是密码格式！");
			return mat(this.val, pat);
		},
		tel: function(pat) {
			pat = pat || /^\d{3}\-\d{8}$|^\d{4}\-\d{7}$/;
			error("您输入的不是中国地区的固定电话格式！");
			return mat(this.val, pat);
		},
		mobile: function(pat) {
			pat = pat || /^1\d{10}$/;
			error("手机号格式不正确！");
			return mat(this.val, pat);
		},
		datatime: function() {
			return DATETIME;
		},
		date: function(type) {
			var pat;
			switch(type) {
				case "DATETIME.FULL":
					pat = /^(([1-9]\d{0,3}|0)\-\d{2}\-\d{2})|(([1-9]\d{0,3}|0)\.\d{2}\.\d{2})|(([1-9]\d{0,3}|0)\/\d{2}\/\d{2})$/;
					break;
				case "DATETIME.SIMPLE":
					pat = /^(\d{2}\-\d{1,2}\-\d{1,2})|(\d{2}\.\d{1,2}\.\d{1,2})|(\d{2}\/\d{1,2}\/\d{1,2})$/;
					break;
				case "DATETIME.ENGLISH":
					pat = /^\w* \d{1,2},(([1-9]\d{0,3}|0)| ([1-9]\d{0,3}|0))$/;
					break;
				case "DATETIME.JAPANESE":
					pat = /^(([1-9]\d{0,3}|0)年\d{2}月\d{2}日)$/;
					break;
				case" DATETIME.CHINESE":
					pat = /^(([1-9]\d{0,3}|0)年\d{2}月\d{2}日)$/;
					break;
			}
			error("您输入的日期格式不正确！");
			return mat(this.val, pat);
		},
		time: function(type) {
			var pat;
			switch(type) {
				case DATETIME.FULL:
					pat = /^\d{2}:\d{2}:\d{2}$/;
					break;
				case DATETIME.SIMPLE:
					pat = /^\d{1,2}:\d{1,2}:\d{1,2}$/;
					break;
				case DATETIME.ENGLISH:
					pat = /^\d{1,2}:\d{1,2}:\d{1,2}$/;
					break;
				case DATETIME.JAPANESE:
					pat = /^\d{1,2}時\d{1,2}分\d{1,2}秒$/;
					break;
				case DATETIME.CHINESE:
					pat = /^\d{1,2}时\d{1,2}分\d{1,2}秒$/;
					break;
			}
			error("您输入的时间格式不正确！");
			return mat(this.val, pat);
		}
	}
	var mat = function(val, pat) {
		if(val.match(pat)) {
			return true;
		}
		return false;
	}
	var error = function(err) {
		wshc.fn.error = err || "无格式错误！";
	}
	
})(jQuery);

//字节长度函数
function strlen(str){  
	var len = 0;  
    for (var i=0; i<str.length; i++) {  
         var c = str.charCodeAt(i);  
         //单字节加1  
         if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {  
               len++;  
         }else {  
               len+=2;  
         }  
    }  
	return len;  
}  

function dataURLtoBlob(dataurl) {
	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while(n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], {
	type: mime
	});
}
//分页
var jumpPage = function(string) {
		
	if(getQueryString("pageNo") || getQueryString("pNo")){	//如果当前有分页信息
		var href = window.location.href,
			parameterList = [];
				if(href.split("?")[1].indexOf("&") < 0) return;
		parameterList = href.split("?")[1].split("&");
		for(var i = 0; i < parameterList.length; i++){
			if(parameterList[i].indexOf("pageNo") > -1 || parameterList[i].indexOf("pNo") > -1){
				if(string.indexOf("pageNo") > -1 || string.indexOf("pNo") > -1){
					if(string.indexOf("&") > -1){
						var list = string.split("&");
						for(var n = 0; n < list.length; n++){
							if(list[n].indexOf("pageNo") > -1 || list[n].indexOf("pNo") > -1)
								parameterList[i] = list[n];
						}
					}
				}
			}else if(parameterList[i].indexOf("pageSize") > -1 || parameterList[i].indexOf("pSize") > -1){
				if(string.indexOf("pageSize") > -1 || string.indexOf("pSize") > -1){
					if(string.indexOf("&") > -1){
						var list = string.split("&");
						for(var n = 0; n < list.length; n++){
							if(list[n].indexOf("pageSize") > -1 || list[n].indexOf("pSize") > -1)
								parameterList[i] = list[n];
						}
					}
					
				}
			}
		}
		var url = ""
		for(var i = 0; i < parameterList.length; i++){
			url += parameterList[i];
			if(i < parameterList.length - 1) url += "&";
		}
	}else{
		var url = "";
		if(string){
			if(string.indexOf("&")){
				var list = string.split("&");
				for(var i = 0; i < list.length; i++){
					url += list[i];
					if(i < list.length - 1) url += "&";
				}
			}else{
				url += string;
			}
		}
	}
	window.location.search = url;
}