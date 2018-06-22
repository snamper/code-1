			/*
				create by zhaolei 2011-6-20 version 1.0
				company www.ingit.com
			*/
			var HH=23;
			var MM=59;
			var SS=59;
			var mode={};
			var LOOP;
			
			function loopInit(id,sign){
				LOOP=true;				
				change(id,sign);
			}
			function loopBreak(){
				LOOP=false;
			}
			function getTag(id,tagName,str,attr){
					var tagArray=document.getElementById(id).getElementsByTagName(tagName);
					for(i=0;i<tagArray.length;i++){
							if(eval("tagArray[i]."+attr)==str){
									return tagArray[i];
							}		
					}	
			}
			function setMode(id,hms){
					var selectInputPre = getTag(id,'input',mode[id+"mode"],'name');
					var selectInput = getTag(id,'input',hms,'name');
					selectInputPre.style.backgroundColor="#FFFFFF";
					mode[id+"mode"]=hms;
					selectInput.style.backgroundColor="#7FFFD4";
			}
			function change(id,sign){
					if(LOOP){
						var num=getTag(id,'input',mode[id+"mode"],'name').value-0;
						var changeNum=eval(num+sign+1)+"";
						if(changeNum>=0&changeNum<=eval(mode[id+"mode"])){	
							changeNum=complete(changeNum);
							getTag(id,'input',mode[id+"mode"],'name').value=changeNum;		
						}
						setTimeout("change('"+id+"','"+sign+"')",200);		
					}		
			}
			function complete(num){
					while(!(num.length==2)){
						num="0"+num;	
					}
			return num;		
			}
			function returnTimer(id){
					var strHH=getTag(id,'input','HH','name').value;
					var strMM=getTag(id,'input','MM','name').value;
					var strSS=getTag(id,'input','SS','name').value;
					return strHH+':'+strMM+':'+strSS;
			}
			function checkNum(id,sign,value){
				if(value<10){
					value=complete(value);
					getTag(id,'input',sign,'name').value=value;
				}else{
					if(value>eval(sign)){
						getTag(id,'input',sign,'name').value=eval(sign);
					}
				}
			}
			function keyDown(id,key,onFocusObject){
				var nextObject;
				if(onFocusObject.name=='HH'){
					nextObject='MM';
				}else if(onFocusObject.name=='MM'){
					nextObject='SS';
				}else if(onFocusObject.name=='SS'){
					nextObject='HH';
				}
				if(!((key>=48 && key<=57)||(key>=96 && key<=105)||(key==8)||(key==46)||(key>=37 && key<=40))){
					event.returnValue=false;
				}
				if(key==37||key==39){
					getTag(id,'input',nextObject,'name').focus();
				}
				if(key==38){
					loopInit(id,'+');
				}
				if(key==40){
					loopInit(id,'-');
				}				
			}
			function keyUp(key){
				if(key==38||40){
					loopBreak();
				}		
			}
			
	//当前时间
	function getNowFormatDate() {
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    var getMinutes = date.getMinutes();
	    var getSeconds = date.getSeconds();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    if (getMinutes >= 1 && getMinutes <= 9) {
	        getMinutes = "0" + getMinutes;
	    }
	    if (getSeconds >= 0 && getSeconds <= 9) {
	        getSeconds = "0" + getSeconds;
	    }
	    var currentdate = date.getFullYear() + seperator2 + month + seperator2 + strDate
	            + " " + date.getHours() + seperator2 + getMinutes
	            + seperator2 + getSeconds;
	    return currentdate;
	};
//	console.log(getNowFormatDate())
	function showTimer(tempId){
		 var date = new Date();
		 var getHours = date.getHours();
		 var getMinutes = date.getMinutes();
		 var getSeconds = date.getSeconds();
		 if (getHours >= 1 && getHours <= 9) {
	        getHours = "0" + getHours;
	    }
		 if (getMinutes >= 1 && getMinutes <= 9) {
	        getMinutes = "0" + getMinutes;
	    }
	    if (getSeconds >= 0 && getSeconds <= 9) {
	        getSeconds = "0" + getSeconds;
	    }
		mode[tempId+"mode"] = "HH";
		var timerConent='<table class="timer" cellpadding="0" cellspacing="0" style="border:#949495 1px solid;table-layout : fixed" >'+
							'<tr style="width:85px;height:35px">'+
								'<td width="60" style="border:0px;display:block;"><input type="text" class="time_hour" maxlength="2" style="border:0;background:transparent;width:15px" name="HH" value="'+getHours+'" onchange="checkNum('+"'"+tempId+"',"+"'HH',"+'this.value)" onkeydown="keyDown('+"'"+tempId+"'"+',event.keyCode,this)" onkeyup="keyUp(event.keyCode)" onfocus="setMode('+"'"+tempId+"','HH'"+')"/><input type="text"  style="border:0;background:transparent;width:6px;" readOnly=true  value=":"/><input type="text" class="time_minute" maxlength="2" style="border:0;background:transparent;width:15px" name="MM" value="'+getMinutes+'" onchange="checkNum('+"'"+tempId+"',"+"'MM',"+'this.value)" onkeydown="keyDown('+"'"+tempId+"'"+',event.keyCode,this)" onkeyup="keyUp(event.keyCode)" onfocus="setMode('+"'"+tempId+"','MM'"+')"/><input type="text"  style="border:0;background:transparent;width:6px;"  readOnly=true value=":"/><input type="text" class="time_second" maxlength="2" style="border:0;background:transparent;width:15px;height: 30px;" name="SS" value="'+getSeconds+'" onchange="checkNum('+"'"+tempId+"',"+"'SS',"+'this.value)" onkeydown="keyDown('+"'"+tempId+"'"+',event.keyCode,this)" onkeyup="keyUp(event.keyCode)" onfocus="setMode('+"'"+tempId+"','SS'"+')"/></td>'+
								'<td width="20" style="border:0px;"><input type="button" hidefocus="true" style=";border-width:2px;display:block;background:url(/images/up.jpg);width:20px;height:10px;" onmouseup="loopBreak()" onmousedown="loopInit('+"'"+tempId+"','+'"+')"/><input type="button" hidefocus="true" style="border-width:2px ;background:url(/images/down.jpg);width:20px;height:10px;" onmouseup="loopBreak()" onmousedown="loopInit('+"'"+tempId+"','-'"+')"/></td>'+
							'</tr>'+
					  	'</table>';
		document.getElementById(tempId).innerHTML=timerConent;	
	}