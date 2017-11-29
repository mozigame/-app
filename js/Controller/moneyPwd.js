/*
 * 资金密码
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
	var old_pwd = document.getElementById("old-pwd").value
	var new_pwd = document.getElementById("new-pwd").value
	var con_pwd = document.getElementById("con-pwd").value
	
	if( old_pwd=='' ||new_pwd == '' ||con_pwd == '' ){
		toast("您填写的信息不完整")
	}else{
		subLoginPwd(old_pwd,new_pwd,con_pwd)
	}
});

function subLoginPwd(o,n,c){
	plus.nativeUI.showWaiting()
	mui.ajax(uri+'Account/ChangeDrawPW',{
        dataType:'json',
        data: {'drawword_o':o,'drawword_n':n,'re_drawword_n':c,"user_id":user_id,"token":token,"sign":sign},
        type:'post',
        
        success:function(data){
        	if(data.code == 202){
            	plus.runtime.restart()
            }
            plus.nativeUI.closeWaiting()
            switch (data.code){
            	case 0 :
            	  toast("密码设置失败")
            	  break;
            	case 1 :
            	  toast("密码设置成功")
            	  break;
            	case 2 :
            	  toast("密码格式错误（密码：6-16位，字母、数字组成。必须字母开头,字母必须小写）")
            	  break;
            	case 3 :
            	  toast("两次密码不一致")
            	  break;
            	case 4 :
            	  toast("资金密码没有设置")
            	  break;
            	case 5 :
            	  toast("旧的密码不对")
            	  break;
            }
        }
    });	
}