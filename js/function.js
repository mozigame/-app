/*
 * 方法合集
 */

mui.back=function () {  
    var btnArray = ['是', '否'];  
    mui.confirm('是否退出应用', '系统提示', btnArray, function(e) {  
        if (e.index == 0) {  
            plus.runtime.quit();  
        }  
    })  
}


function openWV(url,id,pos,data){
	mui.openWindow({
       url:url,
       id:id,
       extras:{
          value:data
       },
       createNew:false,
       show:{
          autoShow:true,
          aniShow:'slide-in-'+pos,
          duration:300,
       },
       waiting:{
           autoShow:true,
           title:'正在加载...'
       }
    })
}

function toast(message){
	plus.nativeUI.toast(
	   message,
	   {'verticalAlign':'center'}
	)
}

function clone(obj) {
    var o;
    if (typeof obj == "object") {
        if (obj === null) {
            o = null;
        } else {
            if (obj instanceof Array) {
                o = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    o.push(clone(obj[i]));
                }
            } else {
                o = {};
                for (var j in obj) {
                    o[j] = clone(obj[j]);
                }
            }
        }
    } else {
        o = obj;
    }
    return o;
}

function hasClass(obj, cls) {  
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
}  
  
function addClass(obj, cls) {  
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
}  
  
function removeClass(obj, cls) {  
    if (hasClass(obj, cls)) {  
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
        obj.className = obj.className.replace(reg, ' ');  
    }  
}  
  
function toggleClass(obj,cls){  
    if(hasClass(obj,cls)){  
        removeClass(obj, cls);  
    }else{  
        addClass(obj, cls);  
    }  
} 

function fastSelect(name,obj,lotname){
	obj.parents('.balls-bar').find('.balls-l span').removeClass('active')
	switch (name) {
		case 'big' :
		  obj.parents('.balls-bar').find('.balls-l li').slice(5,11).find('span').addClass('active')
		  break;  
		case 'small' :
		  obj.parents('.balls-bar').find('.balls-l li').slice(0,5).find('span').addClass('active')
		  break;
		case 'all' :
		  obj.parents('.balls-bar').find('.balls-l li span').addClass('active')
		  break;
		case 'odd' :
		  if(lotname.indexOf('11x5')>0 || lotname == 'jlpsm' || lotname == 'bjpk10'){
		       obj.parents('.balls-bar').find('.balls-l li:even span').addClass('active')
		  }else{
		  	   obj.parents('.balls-bar').find('.balls-l li:odd span').addClass('active')
		  }
		  break;
		case 'even' :
		  if(lotname.indexOf('11x5')>0 || lotname == 'jlpsm' || lotname == 'bjpk10'){
		       obj.parents('.balls-bar').find('.balls-l li:odd span').addClass('active')
		  }else{
		  	   obj.parents('.balls-bar').find('.balls-l li:even span').addClass('active')
		  }
		  break;
	}
}

function getOnlineTime(){
	mui.ajax(uri+'User/UpdateOnlineTime',{
       dataType:'json',
       data: {'user_id':user_id,'token':token,'sign':sign},
       type:'post',
       
       success:function(data){
       }
    })
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var min = date.getMinutes();
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (min >= 0 && min <= 9) {
        min = "0" + min;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + min
            + seperator2 + date.getSeconds();
    return currentdate;
}