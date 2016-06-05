$(function() {
		getThumbnail();
    $('body').on('click', 'nav div', function(){clickNav(this);});
    $('body').on('click', 'header', playVideo);
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

// function intialize () {
// 	$.ajax({
//         url: 'https://pcs.baidu.com/rest/2.0/pcs/device',
//         type: "get",
//         data: {
//             method: "liveplay",
//             shareid: "e2e63b40b7355e9e8192b02588375710",
//             uk: "878364372",
//             type: 'hls'
//         },
//         dataType: "jsonp",
//         success: function (data) {
//         	console.log(data);
//         	$(".mask").css({"width":"100%", "height":"100%"});
//         	$("#video").addClass("myVideo").attr("src", data["src"]).get(0).play();
//         	// myVideo.play();
//         	// var div = data['div'] + "<script>init_player('100%', 'auto')</script>";
//          //  $(".mask").css("display", "table").find(".mask_inner").append(data['div']);
//         },
//         error: function (XMLHttpRequest, textStatus, errThrown) {}
//     })
// }

function playVideo () {
    $.ajax({
        url: 'https://pcs.baidu.com/rest/2.0/pcs/device',
        type: "get",
        data: {
            method: "liveplay",
            shareid: "42f904d242fd6e358a490f97a2013f23",
            uk: "2050712015",
            type: 'hls'
        },
        dataType: "jsonp",
        success: function (data) {
        	console.log(data);
        	// $(".mask").css({"width":"100%", "height":"100%"});
        	// $("#video").addClass("myVideo").attr("src", data["src"]).get(0).play();
        	// myVideo.play();
        	var div = data['div'] + "<script>init_player('100%', 'auto')</script>";
          $(".mask").css({"width":"100%", "height":"100%", "display":"table"}).append(div);
          $(".mask video").addClass("myVideo");
        },
        error: function (XMLHttpRequest, textStatus, errThrown) {}
    })
}