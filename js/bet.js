/*
 * 投注页面
 */

var lotName,lotText;

if(window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}

function plusReady() {
	var wv = plus.webview.currentWebview()
	lotName = wv.value.lotteryName
	lotText = wv.value.lotteryText
	$("#title").text(lotText)
	switch(lotName){
		case 'xycqssc' : case 'xyhgssc': case 'xyjlpssc' : case 'xymskssc': case 'xyxjpssc' : case 'xywh2fc' :
		  break;
		default :
		  $('.bet-details').css('opacity',1)
		  break;	
	}
	getPlayList()
	getBet()
	getRebate()

}

window.addEventListener('refreshPlayName',function(event){
	var id = event.detail.id
	var text = event.detail.text
	$('#bet-play').attr('data-id',id)
	$('#bet-play').text(text)
	getPlayListMainSubMenu(lotName,id,0)
});

window.addEventListener('refreshData',function(event){
	empty()
});

mui('#topBar').on('tap', '#back', function(e) {
	var page = plus.webview.getWebviewById('../Home/home.html')
	mui.fire(page,'refreshUserInfo',{
	})
	plus.webview.currentWebview().close()
});

mui('#betMain').on('tap', '#bet-play', function(e) {
	openWV('play.html','betPlay','right','')
	empty()
});

mui('#topBar').on('tap', '#history', function(e) {
	var json = {"lot":lotName,"name":lotText}
	openWV('history.html','history','right',json)
});

mui('#betMain').on('tap', '.balls-l span', function(e) {
	$(this).toggleClass('active')
});

mui('#betMain').on('tap', '.betbar li', function(e) {
	var playName = $('#bet-play-list a.mui-active').attr('data-id')
	switch(lotName){
		case 'gd11x5' :case 'sd11x5' : case 'jx11x5' : case 'sh11x5' :
		  calc115(playName)
		  break;
		case 'bjpk10' : case  'jlpsm' :
		  calcPK10(playName)
		  break;
		case 'xycqssc' : case 'xyhgssc': case 'xyjlpssc' : case 'xymskssc': case 'xyxjpssc' : case 'xywh2fc' :
		  calcXY(playName)
		  break;
		default :
		  calcSSC(playName)
		  break;	
	}
})

mui('#betMain').on('tap', '.balls-r span', function(e) {
	var name = $(this).attr('data-type')
	fastSelect(name,$(this),lotName)
});

mui('.bet-select').on('tap', 'span', function(e) {
	$(this).addClass('active').siblings().removeClass('active')
});

mui('.bet-rebate').on('tap', 'span', function(e) {
	$(this).addClass('active').siblings().removeClass('active')
});

mui('#betBar').on('tap', '#gobuy', function(e) {
	je = $('#je').text()
	zs = $('#zs').text()
	if(zs == '0' || je == '0'){
		toast('请选择正确的投注号码')
	}else{
		createOrder()
	    setTimeout("openWV('order.html','order','right','')",350)
	}
})

mui('#betBar').on('tap', '#auto', function(e) {
	je = $('#je').text()
	zs = $('#zs').text()
	if(zs == '0' || je == '0'){
		toast('请选择正确的投注号码')
	}else{
		createOrder(true)
	}
})

mui('.betbar').on('tap', '#single-btn', function(e){
    var playName = $('#bet-play-list a.mui-active').attr('data-id')
    if(lotName.indexOf('11x5') > 0){
        calc115(playName)
    }else if(lotName == 'bjpk10' || lotName == 'jlpsm'){
    	calcPK10(playName)	
    }else{
    	calcSSC(playName)		
    }
	if(zs == '0' || je == '0'){
		toast('请输入正确的投注号码')
	}
})

mui('.betbar').on('tap', '.pos span', function(e) {
	$(this).toggleClass('active')
	if($(this).hasClass('active')){
		$(this).attr('data-id','1')
	}else{
		$(this).attr('data-id','0')
	}
	var playName = $('#bet-play-list a.mui-active').attr('data-id')
	calcSSC(playName)
})

mui('#betBar').on('tap', '.clearAll', function(e) {
	empty()
})

mui('#bet-select').on('tap', 'span', function(e) {
	ms = Number($(this).attr('data-val'))
	calcResult()
})

$("#test").bind("input  propertychange",function(){
	bs = Number($(this).val())
	calcResult()
});

mui('.bet-mode').on('tap','button',function(e){
	bs = Number($('#test').val())
	calcResult()
})

mui('#bet-play-list').on('tap', 'a', function(e) {
	var id = this.getAttribute('data-id')
    creatBetMain(id)
    empty()
})

function getBet(){
	plus.nativeUI.showWaiting()
	$.ajax({
		url: uri+'Play/Bet',
        dataType:'json',
        data: {'lottery':lotName,'sign':sign,'user_id':user_id,'token':token},
        type:'get',
        
        success:function(data){
        	console.log(JSON.stringify(data))
        	if(data.code == 202){
            	plus.runtime.restart()
            }
           if(data.code == 1){
           	   countTime = data.buyenddate
           	   $("#issue_name").text(data.no)
           	   if(Date.parse(new Date(countTime)) - Date.parse(new Date()) < 0){
           	      	getBet()
           	   }else{
           	   	     timer()
           	   }
           }else{
           	  
           }
           plus.nativeUI.closeWaiting()
        },
        error:function(xhr,type,errorThrown){
        	console.log(type+":"+errorThrown)
            plus.nativeUI.showWaiting()
            getBet()
        }
    });
}

function getRebate(){
	$('#bet-rebate').empty()
	plus.nativeUI.showWaiting()
	$.ajax({
		url: uri+'Common/GetLotteryInfo',
        dataType:'json',
        data: {'lottery':lotName,'sign':sign,'user_id':user_id,'token':token},
        type:'get',
        
        success:function(data){
        	if(data.code == 202){
            	plus.runtime.restart()
            }
           if(data.code == 1){
           	console.log(JSON.stringify(data))
             	$('.bet-rebate').append('<option data-val="'+(Number(data.rebate_mode_min)+Number(flevel_fd)*20)+'">'+(Number(data.rebate_mode_min)+Number(flevel_fd)*20)+' - 0%</option><option data-val="'+data.rebate_mode_min+'">'+data.rebate_mode_min+' - '+flevel_fd+'%</option>')	
                window.localStorage['price'] = data.price
           }else{
           	  
           }
        },
        error:function(xhr,type,errorThrown){
        	plus.nativeUI.showWaiting()
            getRebate()
        }
    });
}

function getPlayList(){
	plus.nativeUI.showWaiting()
	$.ajax({
		url: uri+'Common/GetPlayList',
        dataType:'json',
        data: {'lottery':lotName,'sign':sign,'user_id':user_id,'token':token},
        type:'get',
        
        success:function(data){
//      	if(data.code == 202){
//          	plus.runtime.restart()
//          }
           if(data.code == 1){
           	   window.localStorage['lotPlayName'] = JSON.stringify(data)
               $('#bet-play').text(data[0]['play_name'])
               $('#bet-play').attr('data-id',data[0]['play_id'])
               getPlayListMainSubMenu(lotName,data[0]['play_id'],0)
           }else{
//         	   toast('请求失败')
           }
        },
        error:function(xhr,type,errorThrown){
        	plus.nativeUI.showWaiting()
            getPlayList()
        }
    });
}

function getPlayListMainSubMenu(name,id,seri){
	plus.nativeUI.showWaiting()
	$('#bet-play-list').empty()
	$.ajax({
		url: uri+'Common/GetGameList',
        dataType:'json',
        data: {'lottery':lotName,'play_id':id,'sign':sign,'user_id':user_id,'token':token},
        type:'get',
        success:function(data){
           //console.log(JSON.stringify(id))
           //console.log(JSON.stringify(data))
           plus.nativeUI.closeWaiting()
//         if(data.code == 202){
//          	plus.runtime.restart()
//          }
           if(data.code == 1){
           	   var html = ''
           	   $.each(data, function(i,v) {
           	   	   if(v != 1){
                        switch (v.game){  
	           	   	   	  case 'w0' :case 'w1' :case 'w2' :case 'w3' :case 'w4' :case 'w5' :case 'w6' :case 'w7' :case 'w8' :case 'w9' :
	           	   	   	  case 'wd' :case 'wda' :case 'ws' :case 'wx' :
	           	   	   	    html += '<a data-id="'+v.game+'" class="mui-control-item">万'+v.game_name+'</a>'
	           	   	   	    break;
			              case 'q0' :case 'q1' :case 'q2' :case 'q3' :case 'q4' :case 'q5' :case 'q6' :case 'q7' :case 'q8' :case 'q9' :
			              case 'qd' :case 'qda' :case 'qs' :case 'qx' :
			                if(lotName.indexOf('11x5')>0){
			                	html += '<a data-id="'+v.game+'" class="mui-control-item">'+v.game_name+'</a>'
			                }else{
			                    html += '<a data-id="'+v.game+'" class="mui-control-item">千'+v.game_name+'</a>'	
			                }
	           	   	   	    break;
			              case 'b0' :case 'b1' :case 'b2' :case 'b3' :case 'b4' :case 'b5' :case 'b6' :case 'b7' :case 'b8' :case 'b9' :
			              case 'bd' :case 'bda' :case 'bs' :case 'bx' :
			                html += '<a data-id="'+v.game+'" class="mui-control-item">百'+v.game_name+'</a>'
	           	   	   	    break;
			              case 's0' :case 's1' :case 's2' :case 's3' :case 's4' :case 's5' :case 's6' :case 's7' :case 's8' :case 's9' :
			              case 'sd' :case 'sda' :case 'ss' :case 'sx' :
			                html += '<a data-id="'+v.game+'" class="mui-control-item">十'+v.game_name+'</a>'
	           	   	   	    break;
			              case 'g0' :case 'g1' :case 'g2' :case 'g3' :case 'g4' :case 'g5' :case 'g6' :case 'g7' :case 'g8' :case 'g9' :
			              case 'gd' :case 'gda' :case 'gs' :case 'gx' :
			                html += '<a data-id="'+v.game+'" class="mui-control-item">个'+v.game_name+'</a>'
	           	   	   	    break;
	           	   	   	  case 'qsbz' : case 'qssz' :case 'qsdz' :case 'qsbs' :case 'qszl' :
			                html += '<a data-id="'+v.game+'" class="mui-control-item">前三'+v.game_name+'</a>'
	           	   	   	    break;
	           	   	   	  case 'zsbz' : case 'zssz' :case 'zsdz' :case 'zsbs' :case 'zszl' :
			                html += '<a data-id="'+v.game+'" class="mui-control-item">中三'+v.game_name+'</a>'
	           	   	   	    break;
	           	   	   	  case 'hsbz' : case 'hssz' :case 'hsdz' :case 'hsbs' :case 'hszl' :
			                html += '<a data-id="'+v.game+'" class="mui-control-item">后三'+v.game_name+'</a>'
	           	   	   	    break;
	           	   	   	  case 'q2hz' : case 'h2hz' :
			                html += '<a data-id="'+v.game+'" class="mui-control-item">直选'+v.game_name+'</a>'
	           	   	   	    break;
	           	   	   	  case 'q2zxhz' : case 'h2zxhz' :
			                html += '<a data-id="'+v.game+'" class="mui-control-item">组选'+v.game_name+'</a>'
	           	   	   	    break;
	           	   	   	  case 'r2fs' : case 'r2ds' :case 'r2zxhz' : case 'r2zxfs' :case 'r2zxds' : case 'r2zuxhz' :
			                html += '<a data-id="'+v.game+'" class="mui-control-item">任二'+v.game_name+'</a>'
	           	   	   	    break;
	           	   	   	  case 'r3fs' : case 'r3ds' :case 'r3zxhz' : case 'r3zx3' :case 'r3zx6' : case 'r3zxhx' :case 'r3zuxhz' :
			                html += '<a data-id="'+v.game+'" class="mui-control-item">任三'+v.game_name+'</a>'
	           	   	   	    break;
	           	   	   	  case 'r4fs' : case 'r4ds' :case 'r4zx24' : case 'r4zx12' :case 'r4zx6' : case 'r4zx4' :
			                html += '<a data-id="'+v.game+'" class="mui-control-item">任四'+v.game_name+'</a>'
	           	   	   	    break;
	           	   	   	  default :
	           	   	   	    html += '<a data-id="'+v.game+'" class="mui-control-item">'+v.game_name+'</a>'
	           	   	   	    break;
	           	   	   	}
           	   	   }
           	   });
           	   $('#bet-play-list').append(html)
           	   $('#bet-play-list a').eq(seri).addClass('mui-active')
           	   var game_id = $('#bet-play-list a.mui-active').attr('data-id')
           	   creatBetMain(game_id)
           }
        },
        error:function(xhr,type,errorThrown){
            plus.nativeUI.showWaiting()
            getPlayList()
        }
   });
}

function timer(){
	var str = new Date(Date.parse(countTime));
	var nowTime = new Date().getTime();
	var endTime = str	
	var t = endTime.getTime() - nowTime;

	if(t<=0){
		toast('本期已经封单，请投注下一期')
		getBet()
		return false;
	}

	var d = Math.floor(t/1000/60/60/24);
	var h = Math.floor(t/1000/60/60%24);
	var i = Math.floor(t/1000/60%60);
	var s = Math.floor(t/1000%60);
	
	if(h > 9){
		document.getElementById('h').innerHTML = h;
	}else{
		document.getElementById('h').innerHTML = '0'+h;
	}
	
	if(i > 9){
		document.getElementById('i').innerHTML = i;
	}else{
		document.getElementById('i').innerHTML = '0'+i;
	}

	if(s > 9){
		document.getElementById('s').innerHTML = s;
	}else{
		document.getElementById('s').innerHTML = '0'+s;
	}
	setTimeout(timer, 1000);
}

function creatBetMain(id){
	$('.betbar').empty()
	if(lotName == 'xycqssc' ||lotName == 'xyhgssc'||lotName == 'xyjlpssc'||lotName == 'xymskssc'||lotName == 'xyxjpssc'||lotName == 'xywh2fc'){
        switch (id){
			//-------------------------------------------------------------------------
			//幸运玩法  - 开始
			//-------------------------------------------------------------------------
			case 'wd' : case 'wda' : case 'wx' : case 'ws' :
			case 'qd' : case 'qda' : case 'qx' : case 'qs' :
			case 'bd' : case 'bda' : case 'bx' : case 'bs' :
			case 'sd' : case 'sda' : case 'sx' : case 'ss' :
			case 'gd' : case 'gda' : case 'gx' : case 'gs' : 
			  betLukcy(xySSC,'1.96','珠仔')
			  break;
			case 'zda' :case 'zx' : case 'zd' : case 'zs' :
			  betLukcy(xySSC,'1.96','总和')
			  break;
			case 'l' :case 'h' :
			  betLukcy(xySSC,'2.178','总和')
			  break;
			case 'he' :
			  betLukcy(xySSC,'9.8','总和')
			  break;
			case 'mn' :case 'n1' :case 'n2' :case 'n3' :case 'n4' :case 'n5' :case 'n6' :case 'n7' :case 'n8' :case 'n9' :case 'nn' :
			  betLukcy(xySSC,'15.027','斗牛')
			  break;
			case 'nd' : case 'nda' : case 'nx' : case 'ns' : 
			  betLukcy(xySSC,'3.005','斗牛')
			  break;
			case 'hsbz' : case 'zsbz' : case 'qsbz' :
			  betLukcy(xySSC,'97.999','组合')
			  break;
			case 'hssz' : case 'zssz' : case 'qssz' :
			  betLukcy(xySSC,'16.333','组合')
			  break;
			case 'hsdz' : case 'zsdz' : case 'qsdz' :
			  betLukcy(xySSC,'3.626','组合')
			  break;
			case 'hsbs' : case 'zsbs' : case 'qsbs' :
			  betLukcy(xySSC,'2.722','组合')
			  break;
			case 'hszl' : case 'zszl' : case 'qszl' :
			  betLukcy(xySSC,'3.267','组合')
			  break;
			case 'wt' :
			  betLukcy(xySSC,'9799.920','梭哈')
			  break;
			case 'sit' :
			  betLukcy(xySSC,'217.776','梭哈')
			  break;
			case 'st' :
			  betLukcy(xySSC,'13.611','梭哈')
			  break;
			case 'ld' :
			  betLukcy(xySSC,'9.038','梭哈')
			  break;
			case 'yd' :
			  betLukcy(xySSC,'1.938','梭哈')
			  break;
			case 'hl' :
			  betLukcy(xySSC,'108.888','梭哈')
			  break;
			case 'sz' :
			  betLukcy(xySSC,'90.704','梭哈')
			  break;
			case 'zh' :
			  betLukcy(xySSC,'3.234','梭哈')
			  break;
			default :
			  betLukcy(xySSC,'9.8','珠仔')
			  break;
	    }
        
	}else
    if(lotName.indexOf('11x5') > 0){	
		switch (id) {
			//-------------------------------------------------------------------------
			//11选5 - 复式 - 开始
			//-------------------------------------------------------------------------
			case 'q3fs' :
			  betLabel(lot115,'normal','zhixuanQ3','nums',3,true,false)
			  break;
			case 'z3fs' :
			  betLabel(lot115,'normal','zhixuanZ3','nums',3,true,false)
			  break;
			case 'h3fs' :
			  betLabel(lot115,'normal','zhixuanH3','nums',3,true,false)
			  break;
			case 'q2fs' :
			  betLabel(lot115,'normal','zhixuanQ2','nums',2,true,false)
			  break;
			case 'h2fs' :
			  betLabel(lot115,'normal','zhixuanH2','nums',2,true,false)
			  break;
			case 'q1' :
			  betLabel(lot115,'normal','zhixuanQ1','nums',1,true,false)
			  break;
			case 'fsrx2z2' :
			  betLabel(lot115,'normal','2z2','nums',1,true,false)
			  break;
			case 'fsrx3z3' :
			  betLabel(lot115,'normal','3z3','nums',1,true,false)
			  break;
			case 'fsrx4z4' :
			  betLabel(lot115,'normal','4z4','nums',1,true,false)
			  break;
			case 'fsrx5z5' :
			  betLabel(lot115,'normal','5z5','nums',1,true,false)
			  break;
			case 'fsrx6z5' :
			  betLabel(lot115,'normal','6z5','nums',1,true,false)
			  break;
			case 'fsrx7z5' :
			  betLabel(lot115,'normal','7z5','nums',1,true,false)
			  break;
			case 'fsrx8z5' :
			  betLabel(lot115,'normal','8z5','nums',1,true,false)
			  break;
			case 'dwd' :
			  betLabel(lot115,'normal','dwd','nums',3,true,false)
			  break;
			case 'q3bdwd' :
			  betLabel(lot115,'normal','bdd','nums',1,true,false)
			  break;
			case 'q2zx' :
			  betLabel(lot115,'normal','zuxuan','nums',1,true,false)
			  break;
			case 'h2zx' :
			  betLabel(lot115,'normal','zuxuan','nums',1,true,false)
			  break;
			default :
			  betTextarea(lot115,false)
			  break;
			//-------------------------------------------------------------------------
			//11选5 - 复式  - 结束
			//-------------------------------------------------------------------------
		}
	
	}else if(lotName == 'fc3d' || lotName == 'pl3'){
		switch (id) {
		    //-------------------------------------------------------------------------
			//福彩3D/P3 - 复式 - 开始
			//-------------------------------------------------------------------------
			case 'zxfs' :
			  betLabel(lotSSC,'normal','zhixuanH3','nums',3,true,false)
			  break;
			case 'z3fs' :
			  betLabel(lotSSC,'normal','z3','nums',1,true,false)
			  break;
			case 'z6fs' :
			  betLabel(lotSSC,'normal','z6','nums',1,true,false)
			  break;
			case 'q2zxfs' :
			  betLabel(lotSSC,'normal','zhixuanZ2','nums',2,true,false)
			  break;
			case 'h2zxfs' :
			  betLabel(lotSSC,'normal','zhixuanH2','nums',2,true,false)
			  break;
			case 'q2zx' :
			  betLabel(lotSSC,'normal','zuxuan','nums',1,true,false)
			  break;
			case 'h2zx' :
			  betLabel(lotSSC,'normal','zuxuan','nums',1,true,false)
			  break;
			case 'dwd' :
			  betLabel(lotSSC,'normal','zhixuanH3','nums',3,true,false)
			  break;
			case 'bdwd' :
			  betLabel(lotSSC,'normal','bdd','nums',1,true,false)
			  break;
			default:
			  betTextarea(false)
			  break;
			//-------------------------------------------------------------------------
			//福彩3D/P3 - 复式 - 结束
			//-------------------------------------------------------------------------
	    }

	}else if(lotName == 'bjpk10' || lotName == 'jlpsm'){
        switch (id){
			//-------------------------------------------------------------------------
			//PK10/赛马 - 复式 - 开始
			//-------------------------------------------------------------------------
			case 'cgjfs' :
			  betLabel(PK10,'normal','guan','nums',1,true,false)
			  break;
			case 'cgyjfs' :
			  betLabel(PK10,'normal','guanya','nums',2,true,false)
			  break;
			case 'cq3mfs' :
			  betLabel(PK10,'normal','q3','nums',3,true,false)
			  break;
			case 'dwd15' :
			  betLabel(PK10,'normal','c15','nums',5,true,false)
			  break;
			case 'dwd610' :
			  betLabel(PK10,'normal','c610','nums',5,true,false)
			  break;
			case 'dxd1m' :
			  betLabel(PK10,'normal','d1','dx_nums',1,false,false)
			  break;
			case 'dxd2m' :
			  betLabel(PK10,'normal','d2','dx_nums',1,false,false)
			  break;
			case 'dxd3m' :
			  betLabel(PK10,'normal','d3','dx_nums',1,false,false)
			  break;
			case 'dsd1m' :
			  betLabel(PK10,'normal','d1','ds_nums',1,false,false)
			  break;
			case 'dsd2m' :
			  betLabel(PK10,'normal','d2','ds_nums',1,false,false)
			  break;
			case 'dsd3m' :
			  betLabel(PK10,'normal','d3','ds_nums',1,false,false)
			  break;
			case 'gjvsd10m' :
			  betLabel(PK10,'normal','1v10','lh_nums',1,false,false)
			  break;
			case 'yjvsd9m' :
			  betLabel(PK10,'normal','2v9','lh_nums',1,false,false)
			  break;
			case 'jjvsd8m' :
			  betLabel(PK10,'normal','3v8','lh_nums',1,false,false)
			  break;
			case 'd4mvsd7m' :
			  betLabel(PK10,'normal','4v7','lh_nums',1,false,false)
			  break;
			case 'd5mvsd6m' :
			  betLabel(PK10,'normal','5v6','lh_nums',1,false,false)
			  break;
			case 'q2hz' :
			  betLabel(PK10,'normal','hz','hz_nums',1,false,false)
			  break;
			default :
			  betTextarea('')
			  break;
			//-------------------------------------------------------------------------
			//PK10/赛马 - 复式 - 结束
			//-------------------------------------------------------------------------
		}
	    
    }else{
	    switch (id){
			//-------------------------------------------------------------------------
			//时时彩  - 五星 - 开始
			//-------------------------------------------------------------------------
			case '5xfs' : case 'r2fs' : case 'r3fs' : case 'r4fs' : case '5xdwd' :
			  betLabel(lotSSC,'normal','zhixuan','nums',5,true,false)
			  break;
			case '5xzx120' : case '4xzx24' : case '4xzx6' :
			  betLabel(lotSSC,'normal','zuxuan','nums',1,true,false)
			  break;
			case '5xzx60' : case '5xzx30' : case '4xzx12' : 
			  betLabel(lotSSC,'normal','zuxuan60','nums',2,true,false)
			  break;
			case '5xzx20' : case '4xzx4' : 
			  betLabel(lotSSC,'normal','zuxuan30','nums',2,true,false)
			  break;
			case '5xzx10' :
			  betLabel(lotSSC,'normal','zuxuan10','nums',2,true,false)
			  break;
			case '5xzx5' :
			  betLabel(lotSSC,'normal','zuxuan5','nums',2,true,false)
			  break;
			//-------------------------------------------------------------------------
			//时时彩  - 五星 - 结束
			//-------------------------------------------------------------------------
			
			//-------------------------------------------------------------------------
			//时时彩  - 四星 - 开始
			//-------------------------------------------------------------------------
			case '4xq4fs' :
			  betLabel(lotSSC,'normal','zhixuanQ4','nums',4,true,false)
			  break;
			case '4xh4fs' :
			  betLabel(lotSSC,'normal','zhixuanH4','nums',4,true,false)
			  break;
			//-------------------------------------------------------------------------
			//时时彩  - 四星 - 结束
			//-------------------------------------------------------------------------
			
			//-------------------------------------------------------------------------
			//时时彩  - 三星 - 开始
			//-------------------------------------------------------------------------
			case '3xq3fs' :
			  betLabel(lotSSC,'normal','zhixuanQ3','nums',3,true,false)
			  break;
			case '3xz3fs' :
			  betLabel(lotSSC,'normal','zhixuanZ3','nums',3,true,false)
			  break;
			case '3xh3fs' :
			  betLabel(lotSSC,'normal','zhixuanH3','nums',3,true,false)
			  break;
			case '3xq3hz' : case '3xz3hz' : case '3xh3hz' :
			  betLabel(lotSSC,'normal','zhixuanHZ','hz_nums',1,false,false)
			  break;
			case '3xq3z3' : case '3xz3z3' : case '3xh3z3' :
			  betLabel(lotSSC,'normal','z3','nums',1,true,false)
			  break;
			case '3xq3z6' : case '3xz3z6' : case '3xh3z6' :
			  betLabel(lotSSC,'normal','z6','nums',1,true,false)
			  break;
			case '3xq3z6' : case '3zq3z6' : case '3hq3z6' : case '3xq3zxhz' : case '3xz3zxhz' : case '3xh3zxhz' :
			  betLabel(lotSSC,'normal','zhixuanHZ','zxhz_nums',1,false,false)
			  break;
			  
			//-------------------------------------------------------------------------
			//时时彩  - 三星 - 结束
			//-------------------------------------------------------------------------
			
			//-------------------------------------------------------------------------
			//时时彩  - 二星 - 开始
			//-------------------------------------------------------------------------
			case '2xq2fs' :
			  betLabel(lotSSC,'normal','zhixuanQ2','nums',2,true,false)
			  break;
			case '2xh2fs' :
			  betLabel(lotSSC,'normal','zhixuanH2','nums',2,true,false)
			  break;
			case 'q2hz' : case 'h2hz' :
			  betLabel(lotSSC,'normal','zhixuanHZ','x2hz_nums',1,false,false)
			  break;
			case '2xq2zx' : case '2xh2zx' :
			  betLabel(lotSSC,'normal','zuxuan','nums',1,true,false)
			  break;
			case 'q2zxhz' : case 'h2zxhz' :
			  betLabel(lotSSC,'normal','zhixuanHZ','x2zxhz_nums',1,false,false)
			  break;
			//-------------------------------------------------------------------------
			//时时彩  - 二星 - 结束
			//-------------------------------------------------------------------------
			
			//-------------------------------------------------------------------------
			//时时彩  - 任选 - 开始
			//-------------------------------------------------------------------------
			case 'r2zxhz' : 
			  betLabel(lotSSC,'normal','zhixuanHZ','x2hz_nums',1,false,true,'zhixuan')
			  break;
			case 'r2zxfs' :
			  betLabel(lotSSC,'normal','zuxuan','nums',1,true,true,'zhixuan')
			  break;
			case 'r2zuxhz' : 
			  betLabel(lotSSC,'normal','zhixuanHZ','x2zxhz_nums',1,false,true,'zhixuan')
			  break;
			case 'r3zxhz' : 
			  betLabel(lotSSC,'normal','zhixuanHZ','hz_nums',1,false,true,'zhixuan')
			  break;
			case 'r3zx3' : 
			  betLabel(lotSSC,'normal','z3','nums',1,true,true,'zhixuan')
			  break;
			case 'r3zx6' : 
			  betLabel(lotSSC,'normal','z6','nums',1,true,true,'zhixuan')
			  break;
			case 'r3zuxhz' : 
			  betLabel(lotSSC,'normal','zuxuan','zxhz_nums',1,false,true,'zhixuan')
			  break;
			case 'r4zx24' : case 'r4zx6' : 
			  betLabel(lotSSC,'normal','zuxuan','nums',1,true,true,'zhixuan')
			  break;
			case 'r4zx12' : 
			  betLabel(lotSSC,'normal','zuxuan60','nums',2,true,true,'zhixuan')
			  break;
			case 'r4zx4' : 
			  betLabel(lotSSC,'normal','zuxuan30','nums',2,true,true,'zhixuan')
			  break;
			case 'r2ds':case 'r3ds':case 'r4ds': case 'r2zxds': case 'r3zxhx':
			  betTextarea(lotSSC,true)
			  break;
			//-------------------------------------------------------------------------
			//时时彩  - 任选 - 结束
			//-------------------------------------------------------------------------
			
			//-------------------------------------------------------------------------
			//时时彩  - 龙虎和 - 开始
			//-------------------------------------------------------------------------
			case 'lhwq' : case 'lhwb' : case 'lhws' : case 'lhwg' : case 'lhqb' : case 'lhqs' : case 'lhqg' : case 'lhbs' : case 'lhbg' : case 'lhsg' : 
			  betLabel(lotSSC,'normal','lhh','lhh_nums',1,false,false)
			  break;
			//-------------------------------------------------------------------------
			//时时彩  - 龙虎和 - 结束
			//-------------------------------------------------------------------------
			
			//-------------------------------------------------------------------------
			//时时彩  - 斗牛 - 开始
			//-------------------------------------------------------------------------
			case 'youniu' : 
			  betLabel(lotSSC,'normal','niu','nn_nums',1,false,false)
			  break;
			case 'meiniu' : 
			  betLabel(lotSSC,'normal','niu','mn_nums',1,false,false)
			  break;
			case 'ndxds' : 
			  betLabel(lotSSC,'normal','niu','dxds_nums',1,false,false)
			  break;
			//-------------------------------------------------------------------------
			//时时彩  - 斗牛 - 结束
			//-------------------------------------------------------------------------
			
			//-------------------------------------------------------------------------
			//时时彩  - 其他 - 开始
			//-------------------------------------------------------------------------
			case 'q31mbdd' : case 'q32mbdd' : case 'h31mbdd' : case 'h32mbdd' :case '5x1mbdd' :case '5x2mbdd' :case '5x3mbdd' :
			case 'q41mbdd' : case 'q42mbdd' : case 'h41mbdd' :case 'h42mbdd' : case 'z31mbdd' :case 'z32mbdd' :
			  betLabel(lotSSC,'normal','bdd','nums',1,true,false)
			  break;
			case 'q2dxds' :
			  betLabel(lotSSC,'normal','zhixuanQ2','dxds_nums',2,false,false)
			  break;
			case 'h2dxds' :
			  betLabel(lotSSC,'normal','zhixuanH2','dxds_nums',2,false,false)
			  break;
			case '5xyffs' : case '5xhscs' : case '5xsxbx' : case '5xsjfc' :
			  betLabel(lotSSC,'normal','qw','nums',1,true,false)
			  break;
			case 'zhdx' :
			  betLabel(lotSSC,'normal','qw','dx_nums',1,false,false)
			  break;
			case 'zhds' : case 'zdds' : case 'zxds' :
			  betLabel(lotSSC,'normal','qw','ds_nums',1,false,false)
			  break;
			//-------------------------------------------------------------------------
			//时时彩  - 其他 - 结束
			//-------------------------------------------------------------------------

			//-------------------------------------------------------------------------
			//时时彩  - 单式 - 开始
			//-------------------------------------------------------------------------
			default:
			  betTextarea(false)
			  break;
			//-------------------------------------------------------------------------
			//时时彩  - 单式 - 结束
			//-------------------------------------------------------------------------
		}
	
	}
}

function betLabel(lot,type,menu,nums,num,isFast,isPos,pos){
	var html = ''
	for(var i=0;i<num;i++){
	    html += '<div class="balls"><span>'+lot[type]['label'][menu][i]+'</span>'
	    html += '<div class="balls-bar"><ul class="balls-l">'
	    for(var j=0;j<lot[type]['label'][nums].length;j++){
	       	   html += '<li><span>'+lot[type]['label'][nums][j]+'</span></li>'
	    }
	    html += '</ul>'
	    if(isFast == true){
	    	html += '<ul class="balls-r"><li><span data-type="big">大</span></li><li><span data-type="small">小</span></li><li><span data-type="all">全</span></li><li><span data-type="odd">奇</span></li><li><span data-type="even">偶</span></li><li><span data-type="clear">清</span></li></ul>'
	    }
	    html += '</div></div>'
	}
	if(isPos == true){
		html += '<div id="pos" class="pos">'
		for(var i=0;i<lot['normal']['label']['zhixuan'].length;i++){
			html += '<span data-id="0">'+lot['normal']['label']['zhixuan'][i]+'</span>'
		}
		html += '</div>'
	}
	$('.betbar').append(html)
}

function betTextarea(lot,isPos){
	var html = ''
	html += '<textarea class="textarea" id="textarea"></textarea>'
	if(isPos == true){
		html += '<div id="pos" class="pos">'
		for(var i=0;i<lot['normal']['label']['zhixuan'].length;i++){
			html += '<span data-id="0">'+lot['normal']['label']['zhixuan'][i]+'</span>'
		}
		html += '</div>'
	}
	html += '<b id="single-btn">添加号码</b>'
	$('.betbar').append(html)
}

function betLukcy(lot,odds,name){
	var html = ''
	html += '<div class="balls" id="lucky"><span>'+name+'</span><div class="balls-bar"><ul class="balls-l"><li class="xy-balls"><span>'+lot['normal']['label'][odds]+'</span></li></ul><div><div>'
	$('.betbar').append(html)
}

function empty(){
	$('#zs').text('0')
	$('#je').text('0.000')
	$('#betMain .balls-l span').removeClass('active')
	if($('#textarea').size()>0){
		$('#textarea').val('')
	}
	if($('#pos').size()>0){
		$('#pos span').removeClass('active')
	}
}


//创建订单
function createOrder(sta){
	var order_ms = $('.bet-select .active').attr('data-val')
	var order_bs = $('#test').val()
	var order_fdms = $('.bet-rebate').children('option:selected').attr('data-val')
	var order_je = $('#je').text()
	var order_zs = $('#zs').text()
	var order_play_id = $('#bet-play-list .mui-active').attr('data-id')
	var order_play_name = $('#bet-play').text() + '-' +$('#bet-play-list .mui-active').text()
	var order_no = $('#issue_name').text()
	var order_nums = []
	var order_pl = ''
	var order_pos = ''
	if($('#textarea').size() > 0){
		order_nums.push($('#textarea').val())
	}
	
	if($('#lukcy').size() > 0){
		order_pl += $('#lukcy .balls .active').text()
		order_nums.push($('#bet-play-list .mui-active').text())
	}
	
	if($('#pos').size() > 0){
		$.each($('#pos span'), function() {
			order_pos += $(this).attr('data-id')
		});
	}
	
	if($('.balls').size() > 0){
		if(lotName.indexOf('11x5') > 0 || lotName == 'bjpk10'|| lotName == 'jlpsm'){
			$.each($('.betbar .balls'), function(i) {
		         var str = $(this).find('.active').text()
		         if(str == '大小'){
		         	order_nums.push('大 小')
		         }else if(str == '单双'){
		         	order_nums.push('单 双')
		         }else if(str == '龙虎'){
		         	order_nums.push('龙 虎')
		         }else{
		            order_nums.push(str.replace(/\B(?=(?:\d{2})+\b)/g, ' '))	
		         }
		    });
		}else if(order_play_id=='3xq3hz'||order_play_id=='3xz3hz'||order_play_id=='3xh3hz'||order_play_id=='3xq3zxhz'||order_play_id=='3xz3zxhz'||order_play_id=='3xh3zxhz'||order_play_id=='q2hz'||order_play_id=='h2hz'||order_play_id=='q2zxhz'||order_play_id=='h2zxhz'||order_play_id=='r2zxhz'||order_play_id=='r2zuxhz'||order_play_id=="r3zxhz"||order_play_id=="r3zuxhz"||order_play_id=="zxq2hz"){
			$.each($('.betbar .balls .active'), function(i) {
				order_nums.push($(this).text())
		    });
		}else if(order_play_id == 'r2fs'||order_play_id == 'r3fs'||order_play_id == 'r4fs'){
			$.each($('.betbar .balls'), function(i) {
				var num = $(this).find('.active').size()
				order_nums.push($(this).find('.active').text())
				if(num == 0){
					order_pos += '0'
				}else{
					order_pos += '1'
				}
		   });
		}else{
		   $.each($('.betbar .balls'), function(i) {
		       var str = $(this).find('.active').text()
			   order_nums.push(str)
		   });	
		}
	}
	if(order_play_id=='dsrx2z2'||order_play_id=='dsrx3z3'||order_play_id=='dsrx4z4'||order_play_id=='dsrx5z5'||order_play_id=='dsrx6z5'||order_play_id=='dsrx7z5'||order_play_id=='dsrx2z5'){
		order_nums = arr_115_rx
	}
	var json = {
		"order_lottery":lotName,
		"order_ms": order_ms,
		"order_bs": order_bs,
		"order_fdms":order_fdms,
		"order_je":order_je,
		"order_zs":order_zs,
		"order_play_id":order_play_id,
		"order_play_name":order_play_name,
		"order_nums":order_nums,
		"order_pos":order_pos,
		"order_pl":order_pl,
		"order_no":order_no
	}
	window.localStorage['orderInfo'] = JSON.stringify(json)
	
	if(sta == true){
		goBet()
	}
}


function rxfs(num){
	$.each($('.betbar .balls'), function(i) {
		var num = $(this).find('.active').size()
		order_nums.push($(this).find('.active').text())
		if(num > num){
			order_pos += '1'
		}else{
			order_pos += '0'
		}
	});
}

function goBet(){
	var detail = JSON.parse(window.localStorage['orderInfo'])
	$('#hidden').val(detail.order_nums)
	plus.nativeUI.showWaiting()
	var json = {
        	"user_id":user_id,
        	"token":token,
        	"sign":sign,
        	"lottery":detail.order_lottery,
        	"data":[{
        	   "multiple":Number(detail.order_bs),
        	   "num":$('#hidden').val(),
        	   "pattern":Number(detail.order_ms),
        	   "play":detail.order_play_id,
        	   "price":Number(detail.order_je),
        	   "rxw":detail.order_pos,
        	   "zhushu":Number(detail.order_zs),
        	   "peilv":detail.order_pl,
        	}],
        	"total_zhushu":Number(detail.order_zs),
        	"no":Number(detail.order_no),
        	"flevel_modes":detail.order_fdms,
        	"total_price":Number(detail.order_je)
    }
	var str = JSON.stringify(json)
	console.log(str)
	mui.ajax(uri+'Play/BetIng',{
        dataType:'json',
        data: json,
        type:'post',
        success:function(data){
        	if(data.code == 202){
            	plus.runtime.restart()
            }
        	console.log(JSON.stringify(data))
            plus.nativeUI.closeWaiting()
            switch (data.code){
            	case 1 :
            	  toast('投注成功')
	              window.localStorage['orderInfo'] = '' 
	              empty()
                  break;
                case 2 :
                  toast('提交数据不全')
                  break;
                case 3 :
                  toast('请检查彩种是否可投注')
                  break;
                case 4 :
                  toast('请查询该期号是否开奖')
                  break;
                  case 5 :
                  toast('返点模式有误')
                  break;
                  case 6 :
                  toast('玩法上庄返点系统最低返点BA彩种')
                  break;
                  case 7 :
                  toast('单注投注数单不正确')
                  break;
                  case 8 :
                  toast('单注投注金额不正确')
                  break;
                  case 9 :
                  toast('请对比金额注数')
                  break;
                  case 10 :
                  toast('请检查玩法是否开放')
                  break;
                  case 11 :
                  toast('请检查用户金额')
                  break;
                  case 12 :
                  toast('请检查用户金额')
                  break;
                 
            }
        },
        error:function(xhr,type,errorThrown){
            plus.nativeUI.showWaiting()
            goBet()
        }
    })  
}