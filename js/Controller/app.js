/*
 * 入口处理
 */

if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

function plusReady(){
	// 获取本地应用资源版本号
	plus.runtime.getProperty(plus.runtime.appid,function(inf){
		var wgtVer=null;
		wgtVer=inf.version;
		console.log("当前应用版本："+wgtVer);
		checkUpdate(wgtVer)
		openWV('View/Login/login.html','login','bottom','')
    	plus.nativeUI.closeWaiting()
	});
}

function checkUpdate(wgtVer){
	// 检测更新
    var checkUrl="http://120.78.128.99/ceshizf_app/zf_update.php";
	plus.nativeUI.showWaiting("检测更新...");
    mui.ajax(checkUrl,{
        dataType:'json',
        data: {'version':wgtVer},
        type:'get',
        success:function(data){
            if(data.code == 1){
            	openWV('View/Login/login.html','login','bottom','')
            	plus.nativeUI.closeWaiting()
            }else{
            	plus.nativeUI.closeWaiting();
            	var wgtUrl = data.url
            	downWgt(wgtUrl)
            }
        },
        error:function(xhr,type,errorThrown){
           console.log(type+':'+errorThrown)
           mui.alert('网络错误')
        }
    });	
}
// 下载wgt文件
function downWgt(wgtUrl){
	plus.nativeUI.showWaiting("下载更新文件...");
	plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){
		if ( status == 200 ) { 
			console.log("下载更新成功："+d.filename);
			installWgt(d.filename);	// 安装wgt包
		} else {
			console.log("下载更新失败！");
			plus.nativeUI.alert("下载更新失败！");
		}
		plus.nativeUI.closeWaiting();
	}).start();
}
// 更新应用资源
function installWgt(path){
	plus.nativeUI.showWaiting("安装更新文件...");
	plus.runtime.install(path,{},function(){
		plus.nativeUI.closeWaiting();
		console.log("安装更新文件成功！");
		plus.nativeUI.alert("应用资源更新完成！",function(){
			localStorage.clear();
			plus.runtime.restart();
		});
	},function(e){
		plus.nativeUI.closeWaiting();
		console.log("安装更新文件失败["+e.code+"]："+e.message);
		plus.nativeUI.alert("安装更新文件失败["+e.code+"]："+e.message);
	});
}

function getUserStatus(){
	plus.nativeUI.showWaiting()
	mui.ajax(uri+'user/GetUserStatus?user_id='+user_id+'&sign'+sign,{
        dataType:'json',
        type:'get',
        success:function(data){
            plus.nativeUI.closeWaiting()
            if(data.code == 0){
               openWV('View/Login/login.html','login','bottom','')	
            }else{
               openWV('View/Index/index.html','index','right','')	
            }
        }
    });
}
