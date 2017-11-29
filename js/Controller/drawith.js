/*
 * 提现
 */

if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

mui('#topBar').on('tap', '#back', function(e) {
	plus.webview.currentWebview().close()
});

mui('#air').on('tap', '#submit', function(e) {
	var User_bank_id = $('#blist').children('option:selected').attr('data-id')
	var draw_id = $('#plist').children('option:selected').attr('data-id')
	var draw_money = $('#money').val()
	var drawword = $('#pwd').val()
	var json = {
        "token":token,
        "sign":sign,
        "username":username,
        "user_id": parseInt(user_id),
        "draw_id":1,
        "user_bank_id":Number(User_bank_id),
        "draw_money":parseFloat(draw_money),
        "drawword":drawword,
        "userspay":''
	}
	
	if(draw_money == '' || drawword == ''){
		return toast("您填写的信息不完整")
	}
	plus.nativeUI.showWaiting()
	console.log(JSON.stringify(json))
	mui.ajax(uri+'Cash/Draw',{
        dataType:'json',
        data:json,
        type:'post',
        
        success:function(data){
        	if(data.code == 202){
            	plus.runtime.restart()
            }
        	console.log(JSON.stringify(data))
        	switch(data.code){
        		case 0 :
        		   toast("提现失败")
        		   break;
        		case 1 :
        		   toast("提现成功")
        		   break;
        		case 2 :
        		   toast("2秒内不能重覆提交")
        		   break;
        		case 3 :
        		   toast("提现金额不在范围内")
        		   break;
        		case 4 :
        		   toast("资金密码有误")
        		   break;
        		case 5 :
        		   toast("余额不足")
        		   break;
        		case 6 :
        		   toast("提现渠道有误")
        		   break;
        		case 7 :
        		   toast("提现银行卡有误")
        		   break;
        		case 8 :
        		   toast("提现银行有误")
        		   break;
        		case 9 :
        		   toast("超过当天可提现最大次数")
        		   break;
        	}
            plus.nativeUI.closeWaiting()
        },
        error:function(xhr,type,errorThrown){
            mui.alert('请求失败')
        }
    })
	
});


function plusReady() {
	getDrawList()
	//getDrawChannel()
}


function getDrawList(){
	plus.nativeUI.showWaiting()
	var json = {
        	"user_id":user_id,
        	"token":token,
        	"sign":sign
       }
	mui.ajax(uri+'Account/GetBindBankList',{
        dataType:'json',
        data:json,
        type:'post',
        success:function(data){
        	console.log(JSON.stringify(data))
        	$('#blist').empty()
            if(data.code == 1){
            	var html = ''
            	$.each(data.data, function(i,v) {
            		if(v == 0){
            			toast("您还没有绑定银行卡")
            		}else{
            		    console.log(JSON.stringify(v))
            		    html += '<option data-id="'+v.id+'">'+v.bank+':'+v.card_no+'</option>'		
            		}
            	});
            	$('#blist').append(html)
            }else{
                toast("您还没有绑定银行卡")
            }
            plus.nativeUI.closeWaiting()
        },
        error:function(xhr,type,errorThrown){
        	plus.nativeUI.showWaiting()
            getDrawList()
        }
    })
}

//function getDrawChannel(){
//	plus.nativeUI.showWaiting()
//	var json = {
//      	"sign":sign
//     }
//	mui.ajax(uri+'common/getdrawbanklist',{
//      dataType:'json',
//      data:json,
//      type:'post',
//      
//      success:function(data){
//      	console.log(JSON.stringify(data))
//          $('#plist').empty()
//          if(data.code == 1){
//          	var html = ''
//          	$.each(data, function(i,v) {
//          		if(v != 1){
//          		    html += '<option data-id="'+v.types+'">'+v.draw+'</option>'		
//          		}
//          	});
//          	$('#plist').append(html)
//          }else{
//            mui.alert('请求失败')
//          }
//          plus.nativeUI.closeWaiting()
//      },
//      error:function(xhr,type,errorThrown){
//          mui.alert('请求失败')
//      }
//})
//}

