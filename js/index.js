$(function () {
    getThumbnail();
    intialize();
    var num = 0,timer = null;

    $('body').on('click', 'nav div', function () {
            clickNav(this);
        })
        .on('tap', 'header', tapVideo)
        .on('click', 'header', clickVideo)
        .on('touchmove', function (event) {
            if ($("#video").hasClass("mask")) {
                event.preventDefault();
            }
        })
        .on('tap', "footer.join", function () {
            window.location.href = './joinClass.html';
        })
        .on('click', "#btnSendCode", sendMessage)
        .on('click', "#joinIn", joinClass);
    var $video = $("#video");
    $video.on('playing', function () {
        timer = setInterval(function () {
            if (num >= 15) {
                video.pause();
                video.webkitExitFullScreen();
                $("#video").removeClass("fullscreen mask");
                clearInterval(timer);
                setTimeout(function () {
                    $video.remove();
                    tip("免费观看时间已到~");
                }, 500);
            } else {
                num++;
            }
        }, 1000)
    });
    $video.on('pause', function () {
        clearInterval(timer);
    });
    if (window.localStorage.getItem("isLogin")){
        $("header .warning").html('您可免费观看五分钟，完整观看请<a href="###">立即购买</a>该系列课')
        $("footer").removeClass("join").addClass("download").html('<img src="images/logo.png" alt=""><a href="download.html" class="download"><img src="images/download.png" alt=""></a><p class="p1">乐现云课堂</p><p class="p2">传播知识与智慧的平台</p>');
    }
})

function clickNav(that) {
    if ($(that).hasClass("active")) return false;
    $("nav div").removeClass("active");
    $(that).addClass("active");
    $("[data-toggle='tab']").hide();
    $("[data-tab='" + that.id + "']").show();
}

function getThumbnail() {
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
            if (data.list.length > 0) {
                $("header>img").attr("src", data.list[0].url);
            } else {
                $("header>img").attr("src", "images/default-thumbnail.jpg");
            }
        },
        error: function (XMLHttpRequest, textStatus, errThrown) {}
    })
}

function intialize() {
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
    if ($("#video").length == 0) {
        setTimeout(function () {
            tip("免费观看时间已到~");
        }, 200);
    } else {
        if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
            $("#video").addClass("fullscreen");
        } else {
            $("#video").addClass("mask");
        }
    }
}

function clickVideo() {
    $('video').get(0).play();
}

var browser = {
    versions: function () {
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
};

function tip(content) {
    if ($('.tooltip').length > 0) {
        return false;
    }
    $('body').append('<div class="tooltip fadeIn">' + content + '</div>');
    setTimeout(function () {
        $('.tooltip').removeClass("fadeIn");
        setTimeout(function () {
            $('.tooltip').remove();
        }, 300);
    }, 2000);
}

var InterValObj; //timer变量，控制时间  
var count = 3; //间隔函数，1秒执行  
var curCount; //当前剩余秒数  
var code = ""; //验证码  
var codeLength = 6; //验证码长度
function sendMessage() {
    curCount = count;
    var phone = $("#cellphone").val(); //手机号码  
    if (phone != "") {
        //产生验证码  
        for (var i = 0; i < codeLength; i++) {
            code += parseInt(Math.random() * 9).toString();
        }
        //设置button效果，开始计时  
        $("#btnSendCode").attr("disabled", true).removeClass("enable");
        $("#btnSendCode").val(curCount + "秒");
        InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次  
        //向后台发送处理数据  
        // $.ajax({  
        //     type: "POST", //用POST方式传输  
        //     dataType: "text", //数据格式:JSON  
        //     url: 'Login.ashx', //目标地址  
        //     data: "phone=" + phone + "&code=" + code,  
        //     error: function (XMLHttpRequest, textStatus, errorThrown) { },  
        //     success: function (msg){ }  
        // });  
    } else {
        tip("手机号码不能为空！");
    }
}
//timer处理函数  
function SetRemainTime() {
    if (curCount == 1) {
        window.clearInterval(InterValObj); //停止计时器  
        $("#btnSendCode").removeAttr("disabled").addClass("enable"); //启用按钮  
        $("#btnSendCode").val("重新发送");
        code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效      
    } else {
        curCount--;
        $("#btnSendCode").val(curCount + "秒");
    }
}

function getUrlParams() {
    var aQuery = window.location.href.split("?");
    var aGET = new Array();
    if (aQuery.length > 1) {
        var aBuf = aQuery[1].split("&");
        for (var i = 0, iLoop = aBuf.length; i < iLoop; i++) {
            var aTmp = aBuf[i].split("=");
            aGET[aTmp[0]] = aTmp[1];
        }
    }
    return aGET;
};

function joinClass() {
    var phone = $("#cellphone").val(); //手机号码  
    var code = $("#verifyCode").val(); //验证码
    if (phone !== "" && code !== "") {
        window.location.href = "index.html";
        window.localStorage.setItem("isLogin", true);
//        $.ajax({
//            type: "POST",
//            dataType: "text",
//            url: 'Login.ashx',
//            data: "phone=" + phone + "&code=" + code,
//            error: function (XMLHttpRequest, textStatus, errorThrown) {},
//            success: function (msg) {}
//        });
    } else if (phone === "") {
        tip("手机号码不能为空！");
    } else {
        tip("验证码不能为空！");
    }
}