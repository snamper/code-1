var fs = require('fs');
var path = require("path");
var config = require('./config');
var upload = {	 
	 imgUrl:'./public/upload/images/',
	 imgUpload:function(req,res){
		 var imgsays = [];
         var num = 0;
         var isStart = false;
         var ws;
         var filename;
         var path;
		 req.on('data',function(chunk){
             var start = 0;
             var end = chunk.length;
             var rems = [];
             for(var i=0;i<chunk.length;i++){
                 if(chunk[i]==13 && chunk[i+1]==10){
                     num++;
                     rems.push(i);
                     if(num==4){
                         start = i+2;
                         isStart = true;
                         var str = (new Buffer(imgsays)).toString();	                				
				         filename = new Date().getTime()+"."+(str.split('Content-Type:')[1].split("/")[1]).replace(/(^\s*)|(\s*$)/g,"");				
                         //filename = str.match(/filename=".*"/g)[0].split('"')[1];
                         path = upload.imgUrl+filename;
                         ws = fs.createWriteStream(path);
                     }else if(i==chunk.length-2){    //说明到了数据尾部的\r\n
                         end = rems[rems.length-2];
                         break;
                     }
                 };
                 if(num<4){
                     imgsays.push(chunk[i])
                 };
             };
             if(isStart){
                 ws.write(chunk.slice(start , end));
             };
         });
		 req.on("end",function(){
             ws.end();
             console.log("保存"+filename+"成功");
             console.log(new Date().getTime());
	         res.send({msg:"success",url:'/upload/images/'+filename,host:config.host+":"+config.port});
         });
	 },
	 delImg:function(file,res) {
         var files = [];
         //判断给定的路径是否存在
		 var curPath = path.join("./public",file);
         if(fs.existsSync(curPath)){               			 
			 fs.unlinkSync(curPath);
			 res.send({msg:"success"});                         
         }else{
             res.send({msg:{error:"给定的文件路径不存在！"}});
         }
     },
};
module.exports=upload;
