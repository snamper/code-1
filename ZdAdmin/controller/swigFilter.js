"use strict";
var swig = require("swig");
//毫秒转时分秒
exports.convertTime = swig.setFilter('convertTime',function (value){//  value为毫秒
	var theTime = parseInt(value/1000);// 秒
	var theTime1 = 0;// 分
	if(theTime > 60) {
	  theTime1 = parseInt(theTime/60);
	  theTime = parseInt(theTime%60);
	}else{
		theTime = parseInt(theTime);
	}
	if(theTime1 > 0) {
		if(theTime == 0){
			var result = parseInt(theTime1)+"分钟";
		}else{
			var result = parseInt(theTime1)+"分"+parseInt(theTime)+"秒";
		}
	}else{
		var result = parseInt(theTime)+"秒";
	}
  return result;
});
//秒转分秒
exports.conTime = swig.setFilter('conTime',function (value){//  value为毫秒
	var theTime = value/1000;// 秒
	var theTime1 = 0;// 分
	if(theTime > 60) {
	  theTime1 = parseInt(theTime/60);
	  theTime = parseInt(theTime%60);
	}else{
		theTime = parseInt(theTime);
	}
	if(theTime1 > 0) {
		if(theTime == 0){
			var result = parseInt(theTime1)+"分钟";
		}else{
			var result = parseInt(theTime1)+"分"+parseInt(theTime)+"秒";
		}
	}else{
		var result = parseInt(theTime)+"秒";
	}
  return result;
});
//
exports.conTeeime = swig.setFilter('conTeeime',function (value){//  value为毫秒 
//	var   now = value
//	var   year=now.getYear();     
//  var   month=now.getMonth()+1;     
//  var   date=now.getDate();     
//  var   hour=now.getHours();     
//  var   minute=now.getMinutes();     
//  var   second=now.getSeconds();  
//	return year +"年"+month+"月"+date+"日" +"   " +hour+":"+minute+":"+second
return new Date(value).toLocaleString();
 
});
//保留小数点后两位
exports.twoNumber = swig.setFilter('twoNumber',function (input){//  value为毫秒
	return input.toFixed(2);
});
//字符串转换
exports.jsonStr = swig.setFilter('jsonStr',function (input){//  value为毫秒
	return eval('(' + input + ')');
});
//时间串(只包含年月日)
exports.birthStr = swig.setFilter('birthStr',function (data){//  data为年月日时分秒
	if(data.length > 11){
		return data.substring(0,data.indexOf(' '));
	}else{
		return data;
	}
});
//超过长度显示...
exports.hideFlow = swig.setFilter('hideFlow',function (value,number){//  value为毫秒
	if(!value) return "";
	var string = String(value),returnString = "";
	number = Number(number);
	if(string.length > number){
		for(var i = 0; i < number; i++){
			returnString += string[i];
		}
		returnString += "..."
		return returnString;
	}else{
		returnString = value;
		return returnString;
	}
	
	
});
//序号连续递增

exports.sortNum = swig.setFilter('sortNum',function (pageNo,loopIndex){//  value为毫秒
	if (pageNo > 1){
		if(loopIndex == 10){
			return pageNo + '0' ;
		}else{
			return pageNo - 1 + "" +  loopIndex ;
		}
	}else{
		return loopIndex;
	}	
});

//日期去掉时分秒
exports.dateSplit = swig.setFilter('dateSplit',function (val){//  value为毫秒
	return val.split(' ')[0];
});
//浮点数处理
exports.floatMul = swig.setFilter('floatMul',function (a,b){//第一个参数是要转换的值，第二个参数是放大的倍数
	var c = 0,
		d = a.toString(),
		e = b.toString();
	try {
		c += d.split(".")[1].length;
	} catch (f) {}
	try {
		c += e.split(".")[1].length;
	} catch (f) {}
	return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
});

//处理渠道配置优惠券列表字符串
exports.couponIdStr = swig.setFilter('couponIdStr',function (data){//传入数据data(array)返回name字符串
	console.log(data)
	var idStr = '';
	for(var i = 0;i < data.length;i++){
		idStr += data[i].name + ',';
	}
	idStr = idStr.substring(0,idStr.length-1);//去除最后的逗号
	console.log(idStr)
	return idStr
});