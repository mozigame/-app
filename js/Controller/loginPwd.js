/*
 * 登录密码
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
	
	if(old_pwd == '' ||new_pwd == '' ||con_pwd == '' ){
		toast("您填写的信息不完整")
	}else{
		subLoginPwd(old_pwd,new_pwd,con_pwd)
	}
});

function subLoginPwd(o,n,c){
	plus.nativeUI.showWaiting()
	var json = {'password_o':o,'password_n':n,'re_password_n':c,"user_id":user_id,"token":token,"sign":sign}
	console.log(JSON.stringify(json))
	mui.ajax(uri+'Account/ChangePassword',{
        dataType:'json',
        data: {'password_o':o,'password_n':n,'re_password_n':c,"user_id":user_id,"token":token,"sign":sign},
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
            	  toast("旧的密码不对")
            	  break;
            	default:
            	  toast("密码设置成功")
            	  window.localStorage['token'] = data.info.token
                  window.localStorage['username'] = data.info.username
                  window.localStorage['user_id'] = data.info.user_id
            	  setTimeout("backLoginPage()",2000)
            	  break;
            }
        }
    });	
}
function backLoginPage(){
	openWV('../Login/login.html','login','bottom','')
}
