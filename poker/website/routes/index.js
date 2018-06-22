var express = require('express');
var router = express.Router();
var nodeMailer = require("nodemailer");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
/* config for mailer */
var mailerConf = {
	 auth: {
        user: 'customer@tianyuehudong.com',
        pass: 'Secret123',
     },
	 receiver:'chenyaowen@tianyuehudong.com',
	 subject:"",
	 text:"",
};
var transporter = nodeMailer.createTransport({
    host: 'smtp.exmail.qq.com',
    port: 465,
    secure: true,
    auth: mailerConf.auth,	
});
/* send mailer */
router.post('/', function(req, res, next) {
     var data = req.body;
	 var subject = "链游官网"+data.name+"的留言";
	 var html = "<table border='0' cellspacing='0' cellpadding='0' style='min-width:800px;margin-top:100px;border:1px solid gray'>"+
	 "<tr><th style='line-height:32px;border-bottom:1px solid gray;border-right:1px solid gray'>姓名</th>"+
	 "<th style='line-height:32px;border-bottom:1px solid gray;border-right:1px solid gray'>电话</th>"+
	 "<th style='line-height:32px;border-bottom:1px solid gray;border-right:1px solid gray'>邮箱</th>"+
	 "<th style='line-height:32px;border-bottom:1px solid gray'>留言内容</th>"+
	 "</tr><tr><td style='line-height:32px;border-right:1px solid gray;text-align:center;min-width:150px'>"+data.name+"</td>"+
	 "<td style='line-height:32px;border-right:1px solid gray;text-align:center;min-width:150px'>"+data.phone+"</td>"+
	 "<td style='line-height:32px;border-right:1px solid gray;text-align:center;min-width:150px'>"+data.mail+"</td>"+
	 "<td style='line-height:32px;text-align:center;max-width:500px;padding:10px;'>"+data.msg+"</td></tr></table>";
	 if(req.body){
		 transporter.sendMail({from:'"'+data.name+'"'+mailerConf.auth.user,to:mailerConf.receiver,subject:subject,html:html},function(error, info){
			 if (error) {
                 console.log(error);
			     return res.send({msg:error});
             }
             console.log('Message %s sent: %s', info.messageId, info.response);
		     res.send({msg:"success",info:info});
		 });
	 }   
});
module.exports = router;
