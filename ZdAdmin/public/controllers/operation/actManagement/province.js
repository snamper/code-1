var defaults = {
    s1: 'provid',
    s2: 'cityid',
    s3: 'areaid',
    v1: null,
    v2: null,
    v3: null
};
var $form;
var form;
var $;
layui.define(['element','jquery', 'form'], function () {
    $ = layui.jquery;
    form = layui.form();
    $form = $('form');
    
   console.log(getQueryString('id'))
   var v1="" ,v2="", v3="";
   if ( getQueryString('id')  ) {
   		var id = getQueryString('id') ;
   		$.ajax({
			type: "get",
			dataType: "json",
			url: "/admin/spread/channel/getChannelDetail.do?pageNo=1&pageSize=10&id="+ id,
			beforeSend:beforeSend(),
			success: function(json) {
				if(json.message == "成功") {
					v1= json.data.province_code;
					v2= json.data.city_code;
					v3= json.data.district_code;
					var defaults = {
					    s1: 'provid',
					    s2: 'cityid',
					    s3: 'areaid',
					    v1: v1,
					    v2: v2,
					    v3: v3
					};
					treeSelect(defaults);
					
				}
			},error: function(){
				layer.msg('保存失败！', {
					time: 1500, //1s后自动关闭
					icon: 2
				});
			}
		})

   	
   		
		
   }else {
   		var defaults = {
		    s1: 'provid',
		    s2: 'cityid',
		    s3: 'areaid',
		    v1: null,
		    v2: null,
		    v3: null
		};
   		treeSelect(defaults);
   }
   
    
    
    
    function treeSelect(config) {
	    config.v1 = config.v1 ? config.v1 : "请选择省";
	    config.v2 = config.v2 ? config.v2 : "请选择市";
	    config.v3 = config.v3 ? config.v3 : "请选择县";
	    $.each(threeSelectData, function (k, v) {
	        appendOptionTo($form.find('select[name=' + config.s1 + ']'), k, v.val, config.v1);
	    });
	    form.render('select');
	    cityEvent(config);
	    areaEvent(config);
	    form.on('select(' + config.s1 + ')', function (data) {
	        cityEvent(data);
	        form.on('select(' + config.s2 + ')', function (data) {
	            areaEvent(data);
	        });
	    });
	
	    function cityEvent(data) {
	        $form.find('select[name=' + config.s2 + ']').html("");
	        config.v1 = data.value ? data.value : config.v1;
	        $.each(threeSelectData, function (k, v) {
	            if (v.val == config.v1) {
	                if (v.items) {
	                    $.each(v.items, function (kt, vt) {
	                        appendOptionTo($form.find('select[name=' + config.s2 + ']'), kt, vt.val, config.v2);
	                    });
	                }
	            }
	        });
	        form.render();
	        config.v2 = $('select[name=' + config.s2 + ']').val();
	        areaEvent(config);
	    }
	    function areaEvent(data) {
	        $form.find('select[name=' + config.s3 + ']').html("");
	        config.v2 = data.value ? data.value : config.v2;
	        $.each(threeSelectData, function (k, v) {
	            if (v.val == config.v1) {
	                if (v.items) {
	                    $.each(v.items, function (kt, vt) {
	                        if (vt.val == config.v2) {
	                            $.each(vt.items, function (ka, va) {
	                                appendOptionTo($form.find('select[name=' + config.s3 + ']'), ka, va, config.v3);
	                            });
	                        }
	                    });
	                }
	            }
	        });
	        form.render();
	        form.on('select(' + config.s3 + ')', function (data) { });
	    }
	    function appendOptionTo($o, k, v, d) {
	        var $opt = $("<option>").text(k).val(v);
	        if (v == d) { $opt.attr("selected", "selected") }
	        $opt.appendTo($o);
	    }
	}
});
