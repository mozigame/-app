if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

function plusReady() {
	$('#play_label').empty()
	var data = JSON.parse(window.localStorage['lotPlayName'])
	var html = ''
	$.each(data, function(i,v) {
		if(v != 1){
			html += '<li data-id="'+v.play_id+'" data-name="'+v.play_name+'"><span>'+v.play_name+'</span></li>'
		}
	});
	$('#play_label').append(html)
}

mui('#topBar').on('tap', '#back', function(e) {
	plus.webview.currentWebview().close()
});

mui('#play_label').on('tap', 'li', function(e) {
	var id = this.getAttribute('data-id')
	var text = this.getAttribute('data-name')
	var page = plus.webview.getWebviewById('bet')
	mui.fire(page,'refreshPlayName',{
		id:id,
		text:text
	})
	plus.webview.currentWebview().close()
});
