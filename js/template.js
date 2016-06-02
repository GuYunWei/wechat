function loadNav(type){
	var on = 'class="on"';
	var home = '',podcast='',live='';
	switch (type) {
    	case 'home':home=on;break;
    	case 'podcast':podcast=on;break;
    	case 'live':live=on;break;
    }
	var html = ''+
		'<div class="nav_inner">'+
            '<div class="logo">'+
            	'<img src="images/logo.png" alt="">'+
            '</div>'+
            '<ul class="menu">'+
                '<li name="home" '+home+'>Homepage</li>'+
                '<li name="podcast" '+podcast+'>Podcasts</li>'+
                '<li name="live" '+live+'>Live</li>'+
            '</ul>'+
        '</div>';
    return html;
}

function loadContent(type){
    switch (type) {
        case 'podcast':{
            var html = ''+
            '<div class="podcasts_wrapper">Podcasts(<span id="podItems">4</span>)</div>' + 
            '<div class="podItem clearfix">' +
                '<div class="podMusic">' +
                    '<div class="controls stop"></div>' +
                '</div>' +
                '<div class="podContent">' +
                    '<div class="avatar"><img src="images/123.jpg""></img></div>' +
                    '<div class="title">飞机乘务员广播词</div>' +
                    '<div class="body">Good morning Ladies and Gentlemen:Welcome Air Ch Airlines flight CA1576 Welcome Air Ch Airlines flight CA1576</div>' +
                '</div>' +
                '<div class="podInfo">' +
                    '<div class="time">6分钟前</div>' +
                    '<div class="comments">30</div>' +
                    '<div class="listeners">150</div>' +
                '</div>' +
            '</div>' +
            '<div class="podItem clearfix">' +
                '<div class="podMusic">' +
                    '<div class="controls play"></div>' +
                '</div>' +
                '<div class="podContent">' +
                    '<div class="avatar"><img src="images/123.jpg""></img></div>' +
                    '<div class="title">飞机乘务员广播词</div>' +
                    '<div class="body">Good morning Ladies and Gentlemen:Welcome Air Ch Airlines flight CA1576 Welcome Air Ch Airlines flight CA1576</div>' +
                '</div>' +
                '<div class="podInfo">' +
                    '<div class="time">6分钟前</div>' +
                    '<div class="comments">30</div>' +
                    '<div class="listeners">150</div>' +
                '</div>' +
            '</div>';
            break;
        };
        case 'live':{
            var html = ''+
            '<div class="live_wrapper">Live(<span id="liveItems">4</span>)</div>' + 
            '<div class="liveContent clearfix">' +
                '<div class="liveItem">' +
                    '<img class="liveImage" src="images/liveBack.jpg"/>' +
                    '<div class="liveTip living">正在直播</div>' +
                    '<div class="enrolls">20人报名</div>' +
                    '<div class="subtitle">Alice教你说出正宗的英式英语</div>' +
                '</div>' +
                '<div class="liveItem">' +
                    '<img class="liveImage" src="images/liveBack.jpg"/>' +
                    '<div class="liveTip living">正在直播</div>' +
                    '<div class="enrolls">20人报名</div>' +
                    '<div class="subtitle">Alice教你说出正宗的英式英语</div>' +
                '</div>' +
                '<div class="liveItem">' +
                    '<img class="liveImage" src="images/liveBack.jpg"/>' +
                    '<div class="liveTip waiting">05-29 11:20开播</div>' +
                    '<div class="enrolls">20人报名</div>' +
                    '<div class="subtitle">Alice教你说出正宗的英式英语</div>' +
                '</div>' +
                '<div class="liveItem">' +
                    '<img class="liveImage" src="images/liveBack.jpg"/>' +
                    '<div class="liveTip waiting">05-29 11:20开播</div>' +
                    '<div class="enrolls">20人报名</div>' +
                    '<div class="subtitle">Alice教你说出正宗的英式英语</div>' +
                '</div>' +
            '</div>';
            break;
        };
        case undefined:
        case 'home':{
            $(".content").css("background","url(images/homepage.jpg) center center no-repeat");
            var html = ''+
            '<div class="cellphone">' +
                '<img src="images/cellphone.png"/>' +
            '</div>' +
            '<div class="palfish">' +
                '<img src="images/palfish.png"/>' +
            '</div>' +
            '<div class="downloads">' +
                '<img src="images/downloads.png"/>' +
            '</div>' +
            '<div class="QRcode">' +
                '<img src="images/QRcode.png"/>' +
            '</div>' +
            '<div class="extra">京ICP备15009744号-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系我们：bd@ipalfish.com</div>';
            break;
        };
    }
    return html;
}