$(function() {
		getThumbnail();
    $('body').on('click', 'nav div', function(){clickNav(this);});
    // $('body').on('tap', 'header', intialize);
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
            shareid: "e2e63b40b7355e9e8192b02588375710",
            uk: "878364372",
            latest: '1'
        },
        dataType: "jsonp",
        success: function (data) {
        	console.log(data.list[0].url);
        	if(data.list.length > 0){
        		$("header>img").attr("src", data.list[0].url);
        	}else{
        		$("header>img").attr("src", "images/default-thumbnail.jpg");
        	}
        },
        error: function (XMLHttpRequest, textStatus, errThrown) {}
    })
}

function playVideo () {
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
        //jsonpCallback: 'jsonpCallback',
        success: function (data) {
        	var div = data['div'];
            $(".mask").show().append(data['div']);
        },
        error: function (XMLHttpRequest, textStatus, errThrown) {}
    })
}

// function playVideo () {
	
// }