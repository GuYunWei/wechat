$(function() {
		document.addEventListener("WeixinJSBridgeReady", function () { 
        document.getElementById('video').play(); 
    }, false); 
  	getThumbnail();
		intialize();
		
    $('body').on('click', 'nav div', function(){clickNav(this);});
    $('body').on('tap', 'header', tapVideo);
    $('body').on('click', 'header', clickVideo);
    $('body').on('touchmove', function(event) {
        if($(".wrap").hasClass("mask")){
            event.preventDefault();
        }
    })

    var $video = $("#video");
    var video = $video.get(0);

	$video.on('playing', function() {
		// 开始播放时打点
		$video.attr('data-updateTime', +new Date());
		video.addEventListener("timeupdate", function (event) { getCurrentVideoTime(event); }, false);
	})

	$video.on('pause', function() {
		// 暂停播放时清除打点
		$video.removeAttr('data-updateTime')
	})

	// 累加播放时间
	// $video.on('timeupdate', function(event) {
	// 	var $video = $(event.target),
	// 		updateTime = parseInt($video.attr('data-updateTime') || 0),
	// 		playingTime = parseInt($video.attr('data-playingTime') || 0),
	// 		times = parseInt($video.attr('data-times') || 0),
	// 		newtimes = 0,
	// 		video = $video.get(0),
	// 		duration = parseFloat($video.attr('data-duration') || 0),
	// 		now = +new Date()

	// 	// 播放时间
	// 	playingTime = playingTime + now - updateTime
	// 	if(playingTime/1000 > 10){
	// 		video.pause();
	// 		// if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
	// 			// video.webkitExitFullScreen(); 
	// 		// } else{
	// 			// $("#video").parents(".wrap").removeClass("mask").end().css({"width": "1px","height": "1px"});
	// 		// }
	// 		$("#video").parents(".wrap").removeClass("mask").css({"width":"1px","height":"1px"});
	// 		video.webkitExitFullScreen();
	// 		// alert("免费观看时间已到！");
	// 	};
	// 	// 播放次数
	// 	newtimes = Math.ceil(playingTime / 1000 / duration)
	// 	$video.attr('data-playingTime', playingTime)
	// 	$video.attr('data-updateTime', now)
	// })
})

function getCurrentVideoTime(event){
	var $video = $(event.target),
			updateTime = parseInt($video.attr('data-updateTime') || 0),
			playingTime = parseInt($video.attr('data-playingTime') || 0),
			times = parseInt($video.attr('data-times') || 0),
			newtimes = 0,
			video = $video.get(0),
			duration = parseFloat($video.attr('data-duration') || 0),
			now = +new Date();

		// 播放时间
		playingTime = playingTime + now - updateTime;
		if(playingTime/1000 > 10){
			video.pause();
			// if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
				// video.webkitExitFullScreen(); 
			// } else{
				// $("#video").parents(".wrap").removeClass("mask").end().css({"width": "1px","height": "1px"});
			// }
			video.removeEventListener("timeupdate", function (event) { getCurrentVideoTime(event); }, false);
			$("#video").parents(".wrap").removeClass("mask").css({"width":"1px","height":"1px"});
			video.webkitExitFullScreen();
			alert("免费观看时间已到！");
		};
		// 播放次数
		newtimes = Math.ceil(playingTime / 1000 / duration);
		$video.attr('data-playingTime', playingTime);
		$video.attr('data-updateTime', now);
}

function clickNav(that){
    if($(that).hasClass("active")) return false;
    $("nav div").removeClass("active");
    $(that).addClass("active");
    $("[data-toggle='tab']").hide();
    $("[data-tab='"+that.id+"']").show();
}

function getThumbnail () {
	$.ajax({
        url: 'https://pcs.baidu.com/rest/2.0/pcs/device',
        type: "get",
        data: {
            method: "thumbnail",
            shareid: "f6861d561f8850118c537069448230ee",
            uk: "3746924779",
            latest: '1'
        },
        dataType: "jsonp",
        success: function (data) {
        	if(data.list.length > 0){
        		$("header>img").attr("src", data.list[0].url);
        	}else{
        		$("header>img").attr("src", "images/default-thumbnail.jpg");
        	}
        },
        error: function (XMLHttpRequest, textStatus, errThrown) {}
    })
}

function intialize () {
	$.ajax({
        url: 'https://pcs.baidu.com/rest/2.0/pcs/device',
        type: "get",
        data: {
            method: "liveplay",
            shareid: "f6861d561f8850118c537069448230ee",
            uk: "3746924779",
            type: 'hls'
        },
        dataType: "jsonp",
        success: function (data) {
        	$("#video").attr("src", data["src"]);
        },
        error: function (XMLHttpRequest, textStatus, errThrown) {}
    })
}

function tapVideo() {
	if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
		$("#video").parents(".wrap").css({"width":"100%","height":"100%"});
	} else{
		$("#video").parents(".wrap").addClass("mask");
	}
}

function clickVideo () {
	$('video').get(0).play();
}

var browser = {
		versions: function() {
			var u = navigator.userAgent,
				app = navigator.appVersion;
			return { //移动终端浏览器版本信息 
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
				iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
				webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
			};
		}()
	}
