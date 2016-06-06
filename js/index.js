$(function() {
		// document.addEventListener("WeixinJSBridgeReady", function () { 
  //       document.getElementById('video').play(); 
  //   }, false); 
  	getThumbnail();
		intialize();
		
    $('body').on('click', 'nav div', function(){clickNav(this);});
    $('body').on('tap', 'header', tapVideo);
    $('body').on('click', 'header', clickVideo);
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
            shareid: "42f904d242fd6e358a490f97a2013f23",
            uk: "2050712015",
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
            shareid: "e2e63b40b7355e9e8192b02588375710",
            uk: "878364372",
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
		$("#video").css({"width": "100%","height": "auto"}).parents(".wrap").css({"width":"100%","height":"100%"});
	} else if (browser.versions.android) {
		$("#video").css({"width": "100%","height": "auto"}).parents(".wrap").addClass("mask");
	}
}

function clickVideo () {
	$('video').get(0).play();
	// $("video").parent().addClass("mask");
    // $.ajax({
    //     url: 'https://pcs.baidu.com/rest/2.0/pcs/device',
    //     type: "get",
    //     data: {
    //         method: "liveplay",
    //         shareid: "42f904d242fd6e358a490f97a2013f23",
    //         uk: "2050712015",
    //         type: 'hls'
    //     },
    //     dataType: "jsonp",
    //     success: function (data) {
    //     	console.log(data);
    //     	// $(".mask").css({"width":"100%", "height":"100%"});
    //     	// $("#video").addClass("myVideo").attr("src", data["src"]).get(0).play();
    //     	// myVideo.play();
    //     	var div = data['div'] + "<script>init_player('100%', 'auto')</script>";
    //       $(".mask").css({"width":"100%", "height":"100%", "display":"table"}).append(div);
    //       $(".mask video").addClass("myVideo").get(0).play();
    //     },
    //     error: function (XMLHttpRequest, textStatus, errThrown) {}
    // })
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