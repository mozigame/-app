/*
 *  银行卡
 */

if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

function plusReady() {
}

mui('#topBar').on('tap', '#back', function(e) {
    plus.webview.currentWebview().close()
});

mui('.input_label').on('tap', '#submit', function(e) {
	var new_pwd = document.getElementById("new-pwd").value
	var con_pwd = document.getElementById("con-pwd").value
	
	if(new_pwd == '' ||con_pwd == '' ){
		toast("您填写的信息不完整")
	}else{
		subPwd(new_pwd,con_pwd)
	}
});

function subPwd(n,c){
	plus.nativeUI.showWaiting()
	mui.ajax(uri+'Account/SetDrawPW',{
        dataType:'json',
        data: {'drawword_n':n,'re_drawword_n':c,"user_id":user_id,"token":token,"sign":sign},
        type:'post',
        
        success:function(data){
        	if(data.code == 202){
            	plus.runtime.restart()
            }
        	console.log(JSON.stringify(data))
            plus.nativeUI.closeWaiting()
            switch (data.code){
            	case 0 :
            	  toast("密码设置失败")
            	  break;
            	case 2 :
            	  toast("密码格式错误")
            	  break;
            	case 3 :
            	  toast("两次密码不一致")
            	  break;
            	case 4 :
            	  toast("已经设置过资金密码")
            	  break;
            	default:
            	  toast("密码设置成功")
            	  break;
            }
        }
    });	
}