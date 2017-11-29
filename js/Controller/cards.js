/*
 * 绑定银行卡
 */

if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

function plusReady() {
	var page = plus.webview.getWebviewById('bankcards.html')
	setTimeout("plus.webview.getWebviewById('bankcards.html').close()",500)
	getPlist()
	getBlist()
}

mui('#topBar').on('tap', '#back', function(e) {
    plus.webview.currentWebview().close()
});

mui('#air').on('tap', '#submit', function(e) {
    submitBindCard()
});

$('#air').on('change', '#plist', function(e) {
    var id = $(this).children('option:selected').attr('data-id');
    getClist(id)
});

function getBlist(){
	plus.nativeUI.showWaiting()
	mui.ajax(uri+'Common/Getpaybankslist',{
        dataType:'json',
        data: {'sign':sign,'token':token,'user_id':user_id},
        type:'post',
        success:function(data){
        	console.log(JSON.stringify(data))
//      	if(data.code == 202){
//          	plus.runtime.restart()
//          }
        	$('#blist').empty()
            if(data.code == 1){
            	var html = ''
            	$.each(data.info, function(i,v) {           		
            		    html += '<option data-id="'+v.bank_id+'">'+v.bank+'</option>'	
            	});
            	$('#blist').append(html)
            }else{
              mui.alert('请求失败')
            }
            plus.nativeUI.closeWaiting()
        },
        error:function(xhr,type,errorThrown){
        	plus.nativeUI.showWaiting()
            getBlist()
        }
  })
}

function getPlist(){
	plus.nativeUI.showWaiting()
	mui.ajax(uri+'Common/Getprovincelist',{
        dataType:'json',
        data: {'sign':sign,'token':token,'user_id':user_id},
        type:'post',
        
        success:function(data){
        	$('#plist').empty()
            if(data.code == 1){
            	var html = ''
            	$.each(data, function(i,v) {
            		if(v != 1){
            		    html += '<option data-id="'+v.p_id+'">'+v.p_name+'</option>'	
            		}
            	});
            	$('#plist').append(html)
            	var id = $('#plist').find("option:selected").attr('data-id'); 
            	console.log(id)
            	getClist(id)
            }else{
              mui.alert('请求失败')
            }
            plus.nativeUI.closeWaiting()
        },
        error:function(xhr,type,errorThrown){
            plus.nativeUI.showWaiting()
            getPlist()
        }
  })
}

function getClist(id){
	plus.nativeUI.showWaiting()
	mui.ajax(uri+'Common/Getcitylist',{
        dataType:'json',
        data: {'p_id':id,'sign':sign,'token':token,'user_id':user_id},
        type:'post',
        
        success:function(data){
        	console.log(JSON.stringify(data))
        	$('#clist').empty()
            if(data.code == 1){
            	var html = ''
            	$.each(data, function(i,v) {
            		if(v != 1){
            		    html += '<option data-id="'+v.c_id+'">'+v.c_name+'</option>'
            		}
            	});
            	$('#clist').append(html)
            }else{
              mui.alert('请求失败')
            }
            plus.nativeUI.closeWaiting()
        },
        error:function(xhr,type,errorThrown){
            plus.nativeUI.showWaiting()
            getClist()
        }
  })
}


function submitBindCard(){
	var real_name = $('#real_name').val()
	var bank_id = $('#blist').children('option:selected').attr('data-id')
	var p_id = $('#plist').children('option:selected').attr('data-id')
	var c_id = $('#clist').children('option:selected').attr('data-id')
	var card_no = $('#card_no').val()
	var r_card_no = $('#card_no1').val()
	var drawword = $('#pwd').val()
	var open_area = $('#open_area').val()
	var json = {
		"sign":sign,
		"token":token,
		"user_id":user_id,
		"real_name":real_name,
		"p_id":Number(p_id),
		"c_id":Number(c_id),
		"bank_id":Number(bank_id),
		"card_no":card_no,
		"r_card_no":r_card_no,
		"drawword":drawword,
		"open_area":open_area
   }
	
	console.log(JSON.stringify(json))
	
	if(real_name == '' || card_no == '' || open_area == ''){
		toast("填写的信息不完整，请添加完成再提交")
	}else{
		mui.ajax(uri+'Account/BindBankCard',{
            dataType:'json',
            data: json,
            type:'post',
            
            success:function(data){
            	console.log(JSON.stringify(data))
            	switch (data.code){
            		case 0 :
            		  toast("表示绑定失败 ");
            		  break;
            		case 1 :
            		  toast("绑定成功")
            		  setTimeout("openWV('bankcards.html','bankcards','left','')",2000)
            		  break;
            		case 2 :
            		  toast("银行卡不能多于5张");
            		  break;
            		case 3 :
            		  toast("用户姓名不能为空");
            		  break;
            		case 4 :
            		  toast("用户名不一致");
            		  break;
            		case 5 :
            		  toast("卡号已绑定");
            		  break;
            		case 6 :
            		  toast("银行ID有误");
            		  break;
            		case 7 :
            		  toast("省份ID有误");
            		  break;
            		case 8 :
            		  toast("城市ID有误");
            		  break;
            	    case 9 :
            		  toast("银行卡格式不正确");
            		  break;
            		case 10 :
            		  toast("两次卡号不一致");
            		  break;
            		case 11 :
            		  toast("开户行有误");
            		  break;
            		case 12 :
            		  toast("资金密码为空");
            		  break;
            		case 13 :
            		  toast("资金密码有误");
            		  break;
            		default :
            		  toast("填写的信息不完整");
            		  break;
            	}
            },
            error:function(xhr,type,errorThrown){
                plus.nativeUI.showWaiting()
                submitBindCard()
            }
         })
	}
}
