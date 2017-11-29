/*
 * 代理
 */

var agent_fd,agent_chess_fd,gent_person_fd;
$(".user2").hide(); 
$(".user1").show(); 
if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

function plusReady() {
	getAgentRabate()
}

mui('#topBar').on('tap', '#back', function(e) {
	plus.webview.currentWebview().close()
});
mui('#record-menu').on('tap', 'a', function(e) {
	setTimeout('getAttr',350)
});

mui('#item1').on('tap', '.agent-reg', function(e) {
	agentReg(1)
});
mui('#item2').on('tap', '.agent-reg', function(e) {
	agentReg(2)
});

mui('#item3').on('tap', '.generate', function(e) {
	generateLinks(1)
});
mui('#item4').on('tap', '.generate', function(e) {
	generateLinks(2)
});


mui("#record-menu").on('tap', '.c1', function(e){
	$(".user2").hide(); 
	$(".user1").show(); 
});
mui("#record-menu").on('tap', '.c2', function(e){
	$(".user1").hide(); 
	$(".user2").show(); 
});
mui("#record-menu").on('tap', '.c3', function(e){
	$(".user1").hide(); 
	$(".user2").hide(); 
});


//mui('#item3').on('tap', '.generate', function(e) {
 //   generateLinks()
//});

mui('#item5').on('tap', '.links-reg', function(e) {
    LinksReg()
});

function getAgentRabate(){
	mui.ajax(uri+'Agentmanage/GetRebate',{
        dataType:'json',
        data: {'user_id':user_id,'token':token,'sign':sign},
        type:'post',
        success:function(data){
        	console.log(JSON.stringify(data))
            plus.nativeUI.closeWaiting()
            if(data.info.code == 1){
            	 agent_fd = data.info.flevel_fd
            	 agent_banker_fd = data.info.flevel_banker_fd
            	 //agent_person_fd = data.info.flevel_person_fd
            	 getAttr()
            	 
            }else{
            	toast("请求失败")
            }
        },
        error:function(xhr,type,errorThrown){
        	plus.nativeUI.showWaiting()
            getAgentRabate()
        }
    })
}


function getAttr(){
	$('#item1 #flevel_fd,#item2 #flevel_fd,#item3 #flevel_fd,#item4 #flevel_fd').attr('placeholder','请输入返点，返点0 - '+agent_fd)
    $('#item1 #flevel_banker_fd,#item2 #flevel_banker_fd,#item3 #flevel_banker_fd,#item4 #flevel_banker_fd').attr('placeholder','请输入返点，返点0 - '+agent_banker_fd)
    //$('#item1 #flevel_person_fd,#item2 #flevel_person_fd,#item3 #flevel_person_fd').attr('placeholder','请输入返点，返点0 - '+agent_person_fd)
}

function agentReg(user_type){
	console.log(user_type)
    //plus.nativeUI.showWaiting()
    if(user_type ==1){
    var user_name_n = $('#item1 #user_name_n').val()
    var nick_name_n = $('#item1 #nick_name_n').val()
    var password_n = $('#item1 #password_n').val()
    var re_password_n = $('#item1 #password_n').val()
    var flevel_fd = $('#item1 #flevel_fd').val()
    var flevel_banker_fd = $('#item1 #flevel_banker_fd').val()
    }
    if(user_type ==2){
    var user_name_n = $('#item2 #user_name_n').val()
    var nick_name_n = $('#item2 #nick_name_n').val()
    var password_n = $('#item2 #password_n').val()
    var re_password_n = $('#item2 #password_n').val()
    var flevel_fd = $('#item2 #flevel_fd').val()
    var flevel_banker_fd = $('#item2 #flevel_banker_fd').val()
    }
    //var flevel_person_fd = $('#item1 #flevel_person_fd').val()
    var json = {
        "sign":sign,
        "token":token,
        "user_id":user_id,
        "user_name_n":user_name_n,
        "nick_name_n":nick_name_n,
        "password_n":password_n,
        "re_password_n":re_password_n,
        "flevel_fd":flevel_fd,
        "flevel_banker_fd":flevel_banker_fd,
        //"flevel_person_fd":flevel_person_fd
        "user_type" : user_type,
    }
    console.log(JSON.stringify(json))
    if(user_name_n == '' || nick_name_n ==''|| password_n ==''|| re_password_n ==''|| flevel_fd ==''|| flevel_banker_fd ==''){
        toast("填写的信息不完整，请添加完成再提交")
    }else{
    	mui.ajax(uri+'AgentManage/AddUser',{
            dataType:'json',
            data: json,
            type:'post',
            success:function(data){
            	console.log(JSON.stringify(data))
                plus.nativeUI.closeWaiting()
            	switch (data.code){
            		case 202 :
            		   plus.runtime.restart()
            		   break;
                    case 0 :
                       toast('失败')
                       break;
                    case 1 :
                    	$('.input_label input').val('');
                       toast('成功');
                       
                       break;
                    case 2 :
                       toast('用户名错误')
                       break;
                    case 3 :
                       toast('用户名已经存在')
                       break;
                    case 4 :
                       toast('昵称错误')
                       break;
                    case 5 :
                       toast('用户密码错误')
                       break;
                    case 6 :
                       toast('两次密码不一致')
                       break;
                    case 7:
                       toast('返点错误')
                       break;
                    case 8 :
                       toast('棋牌返点错误')
                       break;
                    case 9 :
                       toast('真人返点错误')
                       break;
                    case 10 :
                       toast('庄家返点错误 ')
                       break;
                    case 11 :
                       toast('获取用户返点错误')
                       break;
                    case 12 :
                       toast('新用户的返点不能高以代理返点')
                       break;
                    case 13 :
                       toast('新用户的棋牌返点不能高以代理棋牌返点')
                       break;
                    case 14 :
                       toast('新用户的真人返点不能高以代理真人返点')
                       break;
                    case 15 :
                       toast('新用户的庄家返点不能高以代理庄家返点')
                       break;
                }
            },
            error:function(xhr,type,errorThrown){
                plus.nativeUI.showWaiting()
                agentReg()
            }
        })
    }
}

    
//推广连接
function generateLinks(user_type){
	if(user_type ==1){
		 var flevel_fd = $('#item3 #flevel_fd').val()
         var flevel_banker_fd = $('#item3 #flevel_banker_fd').val()
	}
	if(user_type ==2){
		 var flevel_fd = $('#item4 #flevel_fd').val()
         var flevel_banker_fd = $('#item4 #flevel_banker_fd').val()
	}
	console.log(user_type)
    //var flevel_fd = $('#flevel_fd').val()
    //var flevel_chess_fd = $('#flevel_chess_fd').val()
    //var flevel_person_fd = $('#flevel_person_fd').val()
    //var flevel_banker_fd = $('#item1 #flevel_banker_fd').val()
    var json = {
        "sign":sign,
        "token":token,
        "user_id":user_id,
        "flevel_fd":flevel_fd,
        "flevel_banker_fd":flevel_banker_fd,
        "user_type":user_type,
        //"flevel_chess_fd":flevel_chess_fd,
        //"flevel_person_fd":flevel_person_fd
    }
    console.log(JSON.stringify(json))
    if( flevel_fd == ''|| flevel_banker_fd ==''){
        toast("填写的信息不完整，请添加完成再提交")
    }else{
        mui.ajax(uri+'AgentManage/AddUserLink',{
            dataType:'json',
            data: json,
            type:'post',
            success:function(data){
                console.log(JSON.stringify(data))
                switch (data.code){
                    case 0 :
                       toast('失败')
                       break;
                    case 1 :
                       toast('链接生成成功')
                       if(user_type ==1){
                       $("#item3 #url1").val("http://"+data.url)
                       }
                       if(user_type ==2){
                       $("#item4 #url2").val("http://"+data.url)
                       }
                       //alert('http://'+data.url)
                       break;
                    case 2 :
                       toast('返点错误')
                       break;
                    case 3 :
                       toast('棋牌返点错误')
                       break;
                    case 4 :
                       toast('真人返点错误')
                       break;
                    case 5 :
                       toast('庄家返点错误 ')
                       break;
                    case 6 :
                       toast('获取用户返点错误')
                       break;
                    case 7 :
                       toast('新用户的返点不能高以代理返点')
                       break;
                    case 8 :
                       toast('新用户的棋牌返点不能高以代理棋牌返点')
                       break;
                    case 9 :
                       toast('新用户的真人返点不能高以代理真人返点')
                       break;
                    case 10 :
                       toast('新用户的庄家返点不能高以代理庄家返点')
                       break;
                }
            },
            error:function(xhr,type,errorThrown){
               plus.nativeUI.showWaiting()
               generateLinks()
            }
        })
    }
  
}

  var clipboard = new Clipboard('.copy'); 
	clipboard.on('success', function(e) {
		mui.alert('复制成功')
        e.clearSelection();
    });
 
  

function LinksReg(){
    var exp_date = $('#item3 #exp_date').val()
    var user_name_n = $('#item3 #user_name_n').val()
    var nick_name_n = $('#item3 #nick_name_n').val()
    var password_n = $('#item3 #password_n').val()
    var re_password_n = $('#item3 #password_n').val()
    var flevel_fd = $('#item3 #flevel_fd').val()
    var flevel_chess_fd = $('#item3 #flevel_chess_fd').val()
    var flevel_person_fd = $('#item3 #flevel_person_fd').val()
    var json = {
        "sign":sign,
        "token":token,
        "user_id":user_id,
        "exp_date":exp_date,
        "user_name_n":user_name_n,
        "nick_name_n":nick_name_n,
        "password_n":password_n,
        "re_password_n":re_password_n,
        //"flevel_fd":flevel_fd,
        //"flevel_chess_fd":flevel_chess_fd,
        //"flevel_person_fd":flevel_person_fd
    }
    console.log(JSON.stringify(json))
    if($('#item3 input').val() == ''){
        toast("填写的信息不完整，请添加完成再提交")
    }else{
        mui.ajax(uri+'AgentManage/Regadduser',{
            dataType:'json',
            data: json,
            type:'post',
            success:function(data){
                console.log(JSON.stringify(data))
                switch (data.code){
                    case 0 :
                       toast('失败')
                       break;
                    case 1 :
                       toast('成功')
                       break;
                    case 2 :
                       toast('用户名错误')
                       break;
                    case 3 :
                       toast('用户名已经存在')
                       break;
                    case 4 :
                       toast('昵称错误')
                       break;
                    case 5 :
                       toast('用户密码错误')
                       break;
                    case 6 :
                       toast('两次密码不一致')
                       break;
                    case 7 :
                       toast('返点错误')
                       break;
                    case 8 :
                       toast('棋牌返点错误')
                       break;
                    case 9 :
                       toast('真人返点错误')
                       break;
                    case 10 :
                       toast('获取用户返点错误')
                       break;
                    case 11 :
                       toast('新用户的返点不能高以代理返点')
                       break;
                    case 12 :
                       toast('新用户的棋牌返点不能高以代理棋牌返点')
                       break;
                    case 13 :
                       toast('新用户的真人返点不能高以代理真人返点')
                       break;
                    case 14 :
                       toast('有效日期失效')
                       break;
                }
            },
            error:function(xhr,type,errorThrown){
               plus.nativeUI.showWaiting()
               LinksReg()
            }
        })
    }
}