"use strict";
var langs = {
     en_us:{
		 language:"中文",
		 nav1:"HOME",
		 nav2:"FOR PLAYER",
		 nav3:"FOR DEVELOPER",
		 nav4:"FOR OPERATOR",
		 nav5:"WHITE PAPER",
		 homeContent1:"An open and fair and game platform",
		 homeContent2:"An autonomous and sustainable ecosystem based on blockchain technology",
		 playerTitle:"Next generation game system, innovative game experience",
		 playerSmallTitle1:"Fund security:",
		 playerContent1:"No more deposit, no more withdraw",
		 playerSmallTitle2:"Fair game:",
		 playerContent2:"Collaborated random number generator, game information isolation",
		 playerSmallTitle3:"Builtin exchange: ",
		 playerContent3:" Flexible and convenient asset conversion",
		 developerTitle:"Realize your talent, monetize your effort",
		 developerContent1:"Provide with plug-n-play game container, featured with front-end Javascript SDK and on-chain sandbox",
		 developerContent2:"Well designed process for game submission and fee model customization ",
		 operatorTitle:"Dream fulfilled - Open your own house",
		 operatorContent1:"Operate your own game hall, game room or game table with minimum efforts and flexible operating modes",
		 operatorContent2:"Choose games from game market and customize the game settings",
		 paperTitle:"White paper and Equal Chain Coin(ECC)",
		 paperBtn1:"White Paper",
		 paperBtn2:"ECC Structure",
		 contactUs:"Contact Us",
		 name:"Your Name",
		 phone:"Your Phone",
		 eMail:"Your Email",
		 message:"Send message",
	     namePlaceHolder:"Please enter your name",
		 phonePlaceHolder:"Please enter your phone",
		 emailPlaceHolder:"Please enter your e-mail",
		 messageInfo:"Sending...",
		 messageBoard:"Message",
		 send:"Send",
		 cancel:"Cancel",
		 emptyInfo:"The input can not be empty!",
		 nameInfo:"The name you entered is more than 15 characters!",
		 phoneInfo:"The phone is invalid or already taken!",
		 emailInfo:"Email is invalid or already taken!"
	 },
	 sp_cn:{
		 language:"EN",
		 nav1:"首页",
		 nav2:"玩家",
		 nav3:"开发者",
		 nav4:"运营者",
		 nav5:"白皮书",
		 homeContent1:"基于区块链技术的公平、公正、",
		 homeContent2:"开放的游戏平台以及自主的、可持续的游戏生态体系",
		 playerTitle:"新一代游戏系统，创新式的游戏体验",
		 playerSmallTitle1:"资金安全:",
		 playerContent1:"不再托管，全程可控",
		 playerSmallTitle2:"公平游戏: ",
		 playerContent2:"协作式随机数生成机制, 真实的游戏信息隔离和保护",
		 playerSmallTitle3:"内建交易所: ",
		 playerContent3:" 灵活方便的资产配置转换",
		 developerTitle:"实现你的天赋，变现你的努力",
		 developerContent1:"基于前端JavaScript开发SDK和链上沙盒（sandbox）技术，提供给开发者即插即用的游戏容器",
		 developerContent2:"实现完整的工作流程给开发者用于游戏提交，发布更新以及灵活制定收费模型",
		 operatorTitle:"梦想成真 - 运营自己的游戏厅",
		 operatorContent1:"灵活开办在线游戏场或者游戏房间，多种运作模式",
		 operatorContent2:"大量的游戏可供选择和定制，实时清算",
		 paperTitle:"白皮书和链代币",
		 paperBtn1:"白皮书",
		 paperBtn2:"链代币计划",
		 contactUs:"联系我们",
		 name:"您的名字",
		 phone:"您的电话",
		 eMail:"您的邮箱",
		 message:"发送留言",
		 namePlaceHolder:"请输入您的名字",
		 phonePlaceHolder:"请输入您的电话号码",
		 emailPlaceHolder:"请输入您的邮箱地址",
		 messageInfo:"邮件发送中...",
		 messageBoard:"留言",
		 send:"发送",
		 cancel:"取消",
		 emptyInfo:"输入不能为空！",
		 nameInfo:"您输入的名字超过15个字符！",
		 phoneInfo:"电话无效或已被占用！",
		 emailInfo:"电子邮件无效或已被占用！"
	 }
};
var setLang = function(lang){
	 if(lang=="en_us"){
		 var langsText = langs.en_us;		 
	 }else if(lang="sp_cn"){
		 var langsText = langs.sp_cn;		 
	 }else{
		 return console.log("lang error!");
	 }
	 $("[lang-text='language']").html(langsText.language);
     $("[lang-text='nav1']").html(langsText.nav1);
	 $("[lang-text='nav2']").html(langsText.nav2);
	 $("[lang-text='nav3']").html(langsText.nav3);
	 $("[lang-text='nav4']").html(langsText.nav4);
	 $("[lang-text='nav5']").html(langsText.nav5);
	 $("[lang-text='homeContent1']").html(langsText.homeContent1);
	 $("[lang-text='homeContent2']").html(langsText.homeContent2);
	 $("[lang-text='playerTitle']").html(langsText.playerTitle);
	 $("[lang-text='playerSmallTitle1']").html(langsText.playerSmallTitle1);
	 $("[lang-text='playerContent1']").html(langsText.playerContent1);
	 $("[lang-text='playerSmallTitle2']").html(langsText.playerSmallTitle2);
	 $("[lang-text='playerContent2']").html(langsText.playerContent2);
	 $("[lang-text='playerSmallTitle3']").html(langsText.playerSmallTitle3);
	 $("[lang-text='playerContent3']").html(langsText.playerContent3);
	 $("[lang-text='developerTitle']").html(langsText.developerTitle);
	 $("[lang-text='developerContent1']").html(langsText.developerContent1);
	 $("[lang-text='developerContent2']").html(langsText.developerContent2);
	 $("[lang-text='operatorTitle']").html(langsText.operatorTitle);
	 $("[lang-text='operatorContent1']").html(langsText.operatorContent1);
	 $("[lang-text='operatorContent2']").html(langsText.operatorContent2);
	 $("[lang-text='paperTitle']").html(langsText.paperTitle);
	 $("[lang-text='paperBtn1']").html(langsText.paperBtn1);
	 $("[lang-text='paperBtn2']").html(langsText.paperBtn2);
	 $("[lang-text='contactUs']").html(langsText.contactUs);
	 $("[lang-text='name']").html(langsText.name);
	 $("[lang-text='phone']").html(langsText.phone);
	 $("[lang-text='eMail']").html(langsText.eMail);
	 $("[lang-text='message']").html(langsText.message);
	 $("[lang-text='namePlaceHolder']").attr("placeholder", langsText.namePlaceHolder);
	 $("[lang-text='phonePlaceHolder']").attr("placeholder", langsText.phonePlaceHolder);
	 $("[lang-text='emailPlaceHolder']").attr("placeholder", langsText.emailPlaceHolder);
	 $("[lang-text='messageInfo']").html(langsText.messageInfo);
	 $("[lang-text='messageBoard']").html(langsText.messageBoard);
	 $("[lang-text='send']").html(langsText.send);
	 $("[lang-text='cancel']").html(langsText.cancel);
	 $("[lang-text='empty']").html(langsText.emptyInfo);
	 $("[lang-text='nameInfo']").html(langsText.nameInfo);
	 $("[lang-text='phoneInfo']").html(langsText.phoneInfo);
	 $("[lang-text='emailInfo']").html(langsText.emailInfo);
	 
};


