if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}
function plusReady(){
	var wv = plus.webview.currentWebview()
	var id = wv.value
	console.log(JSON.stringify(id))
	getNotice(id);
};

mui('#topBar').on('tap', '#back', function(e) {
	plus.webview.currentWebview().close()
});
function getNotice(id){
	var json={
		'sign':sign,
		'token':token,
		'user_id':user_id,
	}
	$('.str_origin').empty();
	mui.ajax(uri+'Common/GetNotice',{
		dataType:'json',
		data:json,
		type:'get',
		success:function(data){
			console.log(JSON.stringify(data.info))
			var html='';
			$.each(data.info, function(i,v) {
				if(id.title==v.title && id.time==v.add_time){
					$('.title').html(v.title);
					$('.cont').html(v.content);
					$('.time').html(v.add_time);
				}
			}); 
		}
		
	})
}