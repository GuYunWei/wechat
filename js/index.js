$(function() {
  	getThumbnail();
		intialize();
		var num = 0, timer = null;
		
    $('body').on('click', 'nav div', function(){clickNav(this);});
    $('body').on('tap', 'header', tapVideo);
    $('body').on('click', 'header', clickVideo);
    $('body').on('touchmove', function(event) {
        if($("#video").hasClass("mask")){
            event.preventDefault();
        }
    })
    var $video = $("#video");
		$video.on('playing', function() {
			timer = setInterval(function() {
				if (num >= 15) {
					video.pause();
					video.webkitExitFullScreen();
					$("#video").removeClass("fullscreen mask");
					setTimeout(function(){
						Message.showNotify("免费观看时间已到！",2000);
					}, 500);
				} else {
					num++;
				}
			}, 1000)
		})
		$video.on('pause', function() {
			clearInterval(timer);
		})
})

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
		$("#video").addClass("fullscreen");
	} else{
		$("#video").addClass("mask");
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
