/*
 * 充值
 */

if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

var myDate = new Date();
var mydate = myDate.toLocaleDateString();
var mytime = myDate.toLocaleTimeString();
var now_time = mydate + '  ' + mytime;
$("#nowTime").val(now_time);

mui('#topBar').on('tap', '#back', function(e) {
	plus.webview.currentWebview().close()
});

//充值传参(充值url,充值方式id)
mui('#air').on('tap', '#submit_wy', function(e) {
	var url = $(".wy_s").val();
	var fs_id = $(".wy_id").val();
	var min = $(".wy_min").val();
	var max = $(".wy_max").val();
	wy(url, fs_id,min,max)
});

mui('#air').on('tap', '#submit_wx', function(e) {
	var url = $(".zx_s").val();
	var fs_id = $(".zx_id").val();
	var min = $(".zx_min").val();
	var max = $(".zx_max").val();
	zx(url, fs_id,min,max)
});

mui('#air').on('tap', '#submit_sm', function(e) {
	var url = $(".sm_s").val();
	var fs_id = $(".sm_id").val();
	var min = $(".sm_min").val();
	var max = $(".sm_max").val();
	sm(url, fs_id,min,max)
});

//充值金额
mui('#air').on('tap', '.money1', function(e) {
	var money = $(".money1").text();
	$("#money_sm").val(money)
});
mui('#air').on('tap', '.money2', function(e) {
	var money = $(".money2").text();
	$("#money_sm").val(money)
});
mui('#air').on('tap', '.money3', function(e) {
	var money = $(".money3").text();
	$("#money_sm").val(money)
});
mui('#air').on('tap', '.money4', function(e) {
	var money = $(".money4").text();
	$("#money_sm").val(money)
});
mui('#air').on('tap', '.money5', function(e) {
	var money = $(".money5").text();
	$("#money_sm").val(money)
});

mui('#air').on('tap', '.code', function(e) {
	$(this).hide()
});

mui('#record-menu').on('tap', 'a', function(e) {
	$('.input_label').hide()
	var index = $(this).index()
	$('.input_label').eq(index).show()
	getList(index)
});

function plusReady() {
	getList(0)
	getWY()
}
//网银
function getWY(bank_list,min,max) {
	plus.nativeUI.showWaiting()

	var json = {
		"user_id": user_id,
		"token": token,
		"sign": sign
	}
	console.log(user_id)
    $("#money").attr('placeholder',"充值金额额度为"+min+"元-"+max+"元");
	mui.ajax(uri + 'Account/GetPayBankCode', {
		dataType: 'json',
		data: json,
		type: 'post',
		success: function(data) {
			console.log(JSON.stringify(data))
			if(data.code == 202) {
				plus.runtime.restart()
			}
			if(data.code == 1) {
				var html = ''
				$('#sk').empty()
				var len = data.data.length;
				for(var i = 0; i < len; i++) {
					html += '<option sel="' + i + '" data-rid="' + data.data[i].rid + '" data-bank-id="' + data.data[i].bank_id + '">' + data.data[i].bank + '</option>'
				}
				$('#sk').append(html)
				//初始化
					$('#recename').val(data.data[0].recename)
					$('#rececode').val(data.data[0].rececode)
					//$//('#pid').attr('data-bid', data.data[i].open_bank)
					$('#bid').val(data.data[0].open_bank)
					$('#copy1').attr('data-clipboard-text', data.data[0].bank)
					$('#copy4').attr('data-clipboard-text', data.data[0].open_bank)
					$('#copy2').attr('data-clipboard-text', data.data[0].recename)
					$('#copy3').attr('data-clipboard-text', data.data[0].rececode)
			    //点击事件
				$("#sk").change(function() {
					var i = $('#sk').children('option:selected').attr('sel')
					$('#recename').val(data.data[i].recename)
					$('#rececode').val(data.data[i].rececode)
					//$//('#pid').attr('data-bid', data.data[i].open_bank)
					$('#bid').val(data.data[i].open_bank)
					$('#copy1').attr('data-clipboard-text', data.data[i].bank)
					$('#copy4').attr('data-clipboard-text', data.data[i].open_bank)
					$('#copy2').attr('data-clipboard-text', data.data[i].recename)
					$('#copy3').attr('data-clipboard-text', data.data[i].rececode)
				})
				plus.nativeUI.closeWaiting()
			} else {
				mui.alert('暂无可充值银行卡')
			}
			plus.nativeUI.closeWaiting()
		}
	})

	/*
	var html = ''
    $('#sk').empty()
    var len = bank_list.length;
    console.log(len)
    for(var i=0;i<len;i++){
            html += '<option data-id="'+bank_list[i].id+'" data-code="'+bank_list[i].bank_code+'">'+bank_list[i].bank_name+'</option>'
        }
    plus.nativeUI.closeWaiting()
    $('#sk').append(html)
    
	$('#pid').val(data.data[0].bank)
    $('#bid').val(data.data[0].open_bank)
    $('#recename').val(data.data[0].recename)
    $('#rececode').val(data.data[0].rececode)
    $('#pid').attr('data-bid',data.data[0].bank_id)
    $('#pid').attr('data-pid',data.data[0].pay_id)
    $('#copy1').attr('data-clipboard-text',data.data[0].bank)
    $('#copy4').attr('data-clipboard-text',data.data[0].open_bank)
    $('#copy2').attr('data-clipboard-text',data.data[0].recename)
    $('#copy3').attr('data-clipboard-text',data.data[0].rececode)
    */
	var clipboard = new Clipboard('.copy');
	clipboard.on('success', function(e) {
		mui.alert('复制成功')
		e.clearSelection();
	});
}
//扫码
function getSM(bank_list,min,max) {
	plus.nativeUI.showWaiting()
	$("#money_sm").attr('placeholder',"充值金额额度为"+min+"元-"+max+"元");
	var html = ''
	$('#sm_list').empty()
	var len = bank_list.length;
	console.log(len)
	for(var i = 0; i < len; i++) {
		html += '<option data-id="' + bank_list[i].id + '" data-code="' + bank_list[i].bank_code + '">' + bank_list[i].bank_name + '</option>'
	}
	plus.nativeUI.closeWaiting()
	$('#sm_list').append(html)

}
//在线
function getZX(bank_list,min,max) {
	plus.nativeUI.showWaiting()
	  $("#money_wx").attr('placeholder',"充值金额额度为"+min+"元-"+max+"元");
	var html = ''
	$('#blist').empty()
	var len = bank_list.length;
	for(var i = 0; i < len; i++) {
		html += '<option data-id="' + bank_list[i].id + '" data-code="' + bank_list[i].bank_code + '">' + bank_list[i].bank_name + '</option>'
	}
	plus.nativeUI.closeWaiting()
	$('#blist').append(html)
}

//获取可用充值渠道*****
function getList(id) {
	console.log(id)
	var json = {
		"token": token,
		"sign": sign,
		"user_id": parseInt(user_id),
		"app": 1,
	}
	mui.ajax(uri + 'Common/GetPayBankList', {
		dataType: 'json',
		data: json,
		type: 'post',
		success: function(data) {
			console.log(JSON.stringify(data))
			if(data.code == 0) {
				toast("暂无可用充值渠道")
			} else if(data.code == 1) {
				switch(id) {
					case 0:
						console.log(data.info.data.wy.submitUrl)
						$(".wy_s").val(data.info.data.wy.submitUrl);
						$(".wy_id").val(data.info.data.wy.id);
						$(".wy_min").val(data.info.data.wy.minPrice)
						$(".wy_max").val(data.info.data.wy.maxPrice)
						getWY(data.info.data.wy.bankList,data.info.data.wy.minPrice,data.info.data.wy.maxPrice)
						break;
					case 1:
						console.log(data.info.data.zx.submitUrl)
						$(".zx_s").val(data.info.data.zx.submitUrl);
						$(".zx_id").val(data.info.data.zx.id);
						$(".zx_min").val(data.info.data.zx.minPrice)
						$(".zx_max").val(data.info.data.zx.maxPrice)
						getZX(data.info.data.zx.bankList,data.info.data.zx.minPrice,data.info.data.zx.maxPrice)
						break;
					case 2:
						console.log(data.info.data.sm.submitUrl)
						$(".sm_s").val(data.info.data.sm.submitUrl);
						$(".sm_id").val(data.info.data.sm.id);
						$(".sm_min").val(data.info.data.sm.minPrice)
						$(".sm_max").val(data.info.data.sm.maxPrice)
						getSM(data.info.data.sm.bankList,data.info.data.sm.minPrice,data.info.data.sm.maxPrice)
						break;
				}
			} else {
				toast("参数错误")
			}
			plus.nativeUI.closeWaiting()
		}
	})

}

//提交之后
//网银转账 ->ok
function wy(pay_url, fs_id,min,max) {
	console.log(pay_url)
	var price = parseFloat($('#money').val()) //金额
	//var pay_id = parseInt($('#pid').attr('data-pid'))
	//var bank_id = parseInt($('#pid').attr('data-bid'))
	//var recename = $('#recename').val()
	var rid = $('#sk').children('option:selected').attr('data-rid')  //收款rid
	//var open_bank = $('#bid').val()
	var postscript = $('#ps').val() //附言

	if(price == '' || isNaN(price)) {
		return toast("充值金额不能为空")
	}

	if(price < min || price > max) {
		return toast("充值金额额度为"+min+"元-"+max+"元")
	}
	
	var json = {
		"token": token,
		"sign": sign,
		"uid": parseInt(user_id),
		//"pay_id":pay_id,
		"price": price,
		//"bank_id":bank_id,
		//"recename":recename,
		"rid": rid,
		"typeid": fs_id,
		"postscript": postscript
	}

	plus.nativeUI.showWaiting()
	console.log(JSON.stringify(json))
	console.log(pay_url)
	mui.ajax(pay_url, {
		dataType: 'json',
		data: json,
		type: 'post',
		success: function(data) {
			console.log(JSON.stringify(data))
			if(data.code == 1) {
				toast("提交的参数不符合规则")
			} else if(data.code == 0) {
				toast("提交成功,审核中")
			} else if(data.code == 2) {
				toast("收款账户不存在")
			} else if(data.code == 3) {
				toast("充值渠道不存在")
			} else if(data.code == 4) {
				toast("用户不存在")
			} else if(data.code == 5) {
				toast("提交失败")
			}
			plus.nativeUI.closeWaiting()
		}
	})
}
//在线 ->ok
function zx(pay_url, fs_id,min,max) {
	console.log(pay_url)
	console.log(fs_id)
	var price = parseFloat($('#money_wx').val())
	var bid = parseInt($('#blist').children('option:selected').attr('data-id'))
	var pay_code = $('#blist').children('option:selected').attr('data-code')
	if(price == '' || isNaN(price)) {
		return toast("充值金额不能为空")
	}

	if(price < min || price > max) {
		return toast("充值金额额度为"+min+"元-"+max+"元")
	}

	var json = {
		"token": token,
		"sign": sign,
		"uid": parseInt(user_id),
		"bid": bid, //银行id
		"bank_code": pay_code, //银行编码
		"price": price, //金额
		"typeid": fs_id //充值方式id
	}

	plus.nativeUI.showWaiting()
	console.log(JSON.stringify(json))
	mui.ajax(pay_url, {
		dataType: 'json',
		data: json,
		type: 'post',
		success: function(data) {
			console.log(JSON.stringify(data))
			if(data.code == 1) {
				toast("提交的参数不符合规则")
			} else if(data.code == 0) {
				toast("请稍等")
				//window.location.href=data.data;
				mui.init({
					subpages: [{
						url: data.data, //子页面HTML地址，支持本地地址和网络地址
						id: '', //子页面标志
						styles: {
							top: '45px', //子页面顶部位置
							bottom: '10px', //子页面底部位置
						},
						extras: {} //额外扩展参数
					}]
				});
				//$('#air').append('<div class="code" style="width:100%;height:100%;top:0;left:0;position:fixed;background:rgba(0,0,0,.5);z-index:1"><a href='+data.data+'>打开连接</a><p style="position:fixed;width:300px;height:200px;left:50%;top:50%;margin-left:-150px;margin-top:-200px;color:#fff;z-index:2">充值方式：将二维码存入相册，用微信扫一扫即可支付</p></div>')
			} else if(data.code == 2) {
				toast("读取数据失败")
			} else if(data.code == 3) {
				toast("充值渠道不存在")
			} else if(data.code == 4) {
				toast("用户不存在")
			} else if(data.code == 5) {
				toast("银行信息不存在或提交的参数与数据库内不一致")
			} else if(data.code == 6) {
				toast("提交失败")
			}
			plus.nativeUI.closeWaiting()
		},
		error: function(xhr, type, errorThrown) {
			mui.alert('网络错误')
		}
	})
}
//扫码  ok
function sm(pay_url, fs_id,min,max) {
	console.log(pay_url)
	console.log(fs_id)
	var price = parseFloat($('#money_sm').val())
	var pay_type = $('#sm_list').children('option:selected').attr('data-code')
	console.log(pay_type)
	//var pay_id = parseInt($('#sm_list').children('option:selected').attr('data-id'))
	//var platform = $('#sm_list').children('option:selected').attr('data-code')
	//var sm_type=$("#sm_list").val()
	//console.log(sm_type)
	if(price == '' || isNaN(price)) {
		return toast("充值金额不能为空")
	}

	if(price < min || price > max) {
		return toast("充值金额额度为"+min+"元-"+max+"元")
	}

	var json = {
		"token": token,
		"sign": sign,
		//"user_id":parseInt(user_id),
		"uid": parseInt(user_id), //用户id
		"typeid": fs_id, //充值方式id
		"price": price, //充值金额
		//"platform":platform,
		//"sm_type" :sm_type,
		"scanType": pay_type, //扫码方式
		//"typeid":1
	}

	console.log(JSON.stringify(json))
	console.log(pay_url)
	mui.ajax(pay_url, {
		dataType: 'jsonp',
		data: json,
		type: 'post',
		success: function(data) {
			console.log('2')
			console.log(JSON.stringify(data))
			var str = data.replace(/\\/g, "");
			eval("data=" + str);
			if(data.code == 1) {
				toast("提交的参数不符合规则")
			} else if(data.code == 0) {
				console.log(data.img_path)
				toast("获取二维码成功")
				if(pay_type == 'alipay') {
					var name = '支付宝';
				} else if(pay_type == 'weixinpay') {
					var name = 'QQ或者微信';
				} else if(pay_type == 'tenpay') {
					var name = 'QQ或者微信';
				}
					var host =uri.substring(0,uri.length-4); 
			savePicture(host +data.img_path);
	$('#air').append('<div class="code" style="width:100%;height:100%;top:0;left:0;position:fixed;background:rgba(0,0,0,.5);z-index:1"><img style="position:fixed;width:200px;height:200px;left:50%;top:50%;margin-left:-100px;margin-top:-150px;z-index:2" src=' + host + data.img_path + '><p style="position:fixed;width:300px;height:200px;left:50%;top:50%;margin-left:-150px;margin-top:-200px;color:#fff;z-index:2">充值方式：二维码已存入相册，用微信或者支付宝扫一扫即可支付</p></div>')

			
			} else if(data.code == 2) {
				toast("读取数据失败")
			} else if(data.code == 3) {
				toast("充值渠道不存在")
			} else if(data.code == 4) {
				toast("用户不存在")
			} else if(data.code == 5) {
				toast("获取二维码失败")
			} else if(data.code == 6) {
				toast("提交失败")
			}
			plus.nativeUI.closeWaiting()
		},
		error: function(xhr, type, errorThrown) {
			mui.alert('网络错误')
		}
	})
}

//保存图片
function savePicture(url) {
	var picname = new Date().getTime() + ".png";
	var dtask = plus.downloader.createDownload(url, {
		filename: "_downloads/" + picname
	}, function(d, status) {
		if(status == 200) {
			plus.gallery.save(d.filename, function() {
				mui.toast("成功保存到相册");
			}, function(err) {
				mui.toast(err.message + ":" + err.code);
			});
		} else {
			ui.toast("保存失败");
		}
	});

	dtask.start();
}

/*
    
//识别二维码
   var ws=null,wo=null;
    var scan=null,domready=false;
    // H5 plus事件处理
    function plusReady(){
        if(ws||!window.plus||!domready){
            return;
        }
        // 获取窗口对象
        ws=plus.webview.currentWebview();
        wo=ws.opener();
        // 开始扫描
        ws.addEventListener('show', function(){
            scan=new plus.barcode.Barcode('bcid');
            scan.onmarked=onmarked;
            scan.start({conserve:true,filename:'_doc/barcode/'});
        }, false);
        // 显示页面并关闭等待框
        ws.show('pop-in');
        
       
    }
    if(window.plus){
        plusReady();
    }else{
        document.addEventListener('plusready', plusReady, false);
    }
    // 监听DOMContentLoaded事件
    document.addEventListener('DOMContentLoaded', function(){
        domready=true;
        plusReady();
    }, false);
    // 二维码扫描成功
    function onmarked(type, result, file){
        switch(type){
            case plus.barcode.QR:
            type = 'QR';
            break;
            case plus.barcode.EAN13:
            type = 'EAN13';
            break;
            case plus.barcode.EAN8:
            type = 'EAN8';
            break;
            default:
            type = '其它'+type;
            break;
        }
        result = result.replace(/\n/g, '');
       
        //分析扫描结果：是URL就跳转 ，不是就提示
        if(result.indexOf('http://')==0  || result.indexOf('https://')==0){
            plus.nativeUI.confirm(result, function(i){
                if(i.index == 0){
                    
                    back();//返回上一页
                    plus.runtime.openURL(result);
                }else{
                    back();//返回上一页
                }
            }, '', ['打开', '取消']);
        } else{
            back();//返回上一页
            plus.nativeUI.alert(result);
        }
    }
 function scanPicture(){
        plus.gallery.pick(function(path){
            plus.barcode.scan(path,onmarked,function(error){
                plus.nativeUI.alert('无法识别此图片');
            });
        }, function(err){
            plus.nativeUI.alert('Failed: '+err.message);
        });
    }
 */