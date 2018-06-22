var http = require("http");
var querystring = require('querystring');
var cookie = require('cookie');
var config = require('../../controller/config');
var fs = require("fs");
var httptest = function(serive) { //req配置,req参数,res,0:异步,1:同步,
    var body1 = "";
    var dft1 = {
        options: {
            host: config.serviceHost,
            port: config.servicePort,
            path: "/admin/login/user/resource/meuns.do", //请求地址
            method:  'GET', //请求方式
            headers: (serive.options && serive.options.headers) ? serive.options.headers : '', //req head
        }
    };
    var dft = {
        options: {
            host: config.serviceHost,
            port: config.servicePort,
            path: (serive.options && serive.options.path) ? serive.options.path : "/", //请求地址
            method: (serive.options && serive.options.method) ? serive.options.method : 'GET', //请求方式
            headers: (serive.options && serive.options.headers) ? serive.options.headers : '', //req head
        },
        page: {
            asyn: serive.page.asyn ? serive.page.asyn : false, //同步f/异步t
            url: serive.page.url ? serive.page.url : "", //模板地址
            navConf: { //导航信息
                nav: serive.page.navConf ? serive.page.navConf.nav : "1",
                navSec: serive.page.navConf ? serive.page.navConf.navSec : "1",
                navThird: serive.page.navConf ? serive.page.navConf.navThird : "",
            },
        },
        contents: serive.contents ? serive.contents : {
            pageNo: "1",
            pageSize: "10"
        }, //请求传入参数
        res: serive.res ? serive.res : "", //res
        jsonUrl: serive.jsonUrl ? serive.jsonUrl : "",
    };
    var contents = querystring.stringify(dft.contents);
    var menuUrl = dft.options.path;
    if(dft.options.method == "get" || dft.options.method == "GET") {
        dft.options.path += "?" + contents;
        contents = "";
    };

    var sreq = http.request(dft.options, function(sres) {
        var body = "";
        sres.on('data', function(data) {
            body += data;
        });
        sres.on("end", function() {
            var menuName = ""
            if(dft.page.navConf.navThird) {
                menuName = dft.page.navConf.navThird + "="
            } else {
                menuName = dft.page.navConf.navSec + "="
            }
            var splitCookie = "";
            var curSourceCodeMenu = "";         //取出按钮菜单并返回
            if(dft.options.headers.cookie) {
                splitCookie = dft.options.headers.cookie.split(";");
                for(var j = 0; j < splitCookie.length; j++) {
                    if(splitCookie[j].split(menuName).length > 1) {
                        curSourceCodeMenu = JSON.parse(splitCookie[j].split(menuName)[1]);
                    }
                }
            }
            var reg = /^2\d{2}$/;
            if(!reg.test(sres.statusCode) || !body) { //后台如果重启服务拿不到数据时，nodejs进程会中断,nginx会出现502错误
                console.log(sres.statusCode,body)
                dft.res.redirect("/404"); //系统错误导向404
                return;
            }
            var returnData = JSON.parse(body.toString("utf-8"));
            if(returnData.code == "4033") return dft.res.redirect("/login");
            if(dft.page.asyn) { //异步请求
                var reg = /^2\d{2}$/;
                if(reg.test(sres.statusCode)) {
                    dft.res.send(returnData);
                } else {
                    dft.res.send({
                        data: {
                            message: "系统错误",
                            statusCode: sres.statusCode
                        }
                    });
                }
            } else { //同步请求
//          	console.log(JSON.parse(body).data)
				var result = returnData.data.datas;
				if(result && result.length > 0){
					for(var i = 0; i < result.length; i++){
						if(result[i].couponBaseList.length > 0){
							returnData.data.datas[i].totalHeight = 21 * result[i].couponBaseList.length + 'px';
							returnData.data.datas[i].oneHeight = 21 + 'px'
						}else{
							returnData.data.datas[i].totalHeight = 21  + 'px';
							returnData.data.datas[i].oneHeight = 21 + 'px'
						}
					}
				}
				console.log(returnData.data)
                http.get(dft1.options,function(s1Res) {     //同步请求再去请求菜单并一起返回
                    s1Res.on('data',function(data){
                        body1 += data;
                    });
                    s1Res.on("end",function(){
                        var navList = JSON.parse(body1.toString("utf-8"));
                        if(!navList || !navList.data || navList.data.length <= 0) {
                            dft.res.render("/login");
                            return;
                        }
                        var userMessage = JSON.parse(cookie.parse(dft.options.headers.cookie).userMessage)
                        var menuFirstList = JSON.parse(cookie.parse(dft.options.headers.cookie).resource);
                        var reg = /^2\d{2}$/;
                        if(reg.test(sres.statusCode)) {
                            dft.res.render(dft.page.url, {
                                page: dft.contents,
                                userMessage: userMessage,
                                pageurl: serive.page.url,
                                menuList: menuFirstList,        //一级导航
                                navConf: dft.page.navConf,      //当前路由
                                data: returnData,               //收到的数据
                                menuCodeList: curSourceCodeMenu,    //按钮权限
                                navList:navList                 //二级、三级导航
                            });
                        } else {
                            dft.res.redirect("/404"); //系统错误导向404
                        }
                    });
                });
            }
        });
    });
    sreq.on('error', function(e) {
        console.log('problem with request:' + e.message);
    });
    sreq.write(contents);
    sreq.end();

};
module.exports = httptest;