/*
 * 记录详情
 */

if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

mui('#topBar').on('tap', '#back', function(e) {
	plus.webview.currentWebview().close()
});

function plusReady() {
	var wv = plus.webview.currentWebview()
	var title = wv.value.lotText
	document.getElementById("title").innerHTML = title
	getListDetails(wv.value.lotName,title)
}

function getListDetails(name,text){
   $('#recent-list').empty()
   plus.nativeUI.showWaiting()
    $.ajax({
        url: uri+'Common/GetRecentLotteryInfo',
        dataType:'json',
        data: {'lottery':name,'num':10,'sign':sign},
        type:'get',
        success:function(data){
           plus.nativeUI.closeWaiting()
           if(data.code == 202){
            	plus.runtime.restart()
            }
           if(data.code == 1){
           	    var html = ''
                $.each(data, function(i,v) {
                	if(v != 1){
                		if(v.number != ''){
                	       html += '<li><span>'+text+'</span><span>第'+v.no+'期</span><div class="recent-balls">'
                	       var tem = v.number.split(',')
                	       $.each(tem, function(i,k) {
                	         html += '<i>'+k+'</i>'
                           });
  			               html += '</div></li>'
  			            }
                	}
                });
                $('#recent-list').append(html)
           	  
           }else{
           	   toast('请求失败')
           }
        }
    });
}