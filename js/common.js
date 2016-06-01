/*功能集*/
//全局域名
ajaxDomain = '/';
if (document.domain.indexOf('ipalfish.net') >= 0) {
    fileDomain = 'http://www.ipalfish.net/';
} else {
    fileDomain = 'http://' + location.host + '/';
}

/***************JSON**************/
'use strict';
var escape = /["\\\x00-\x1f\x7f-\x9f]/g,
    meta = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\'
    },
    hasOwn = Object.prototype.hasOwnProperty;
$.toJSON = typeof JSON === 'object' && JSON.stringify ? JSON.stringify : function(o) {
    if (o === null) {
        return 'null';
    }
    var pairs, k, name, val, type = $.type(o);
    if (type === 'undefined') {
        return undefined;
    }
    if (type === 'number' || type === 'boolean') {
        return String(o);
    }
    if (type === 'string') {
        return $.quoteString(o);
    }
    if (typeof o.toJSON === 'function') {
        return $.toJSON(o.toJSON());
    }
    if (type === 'date') {
        var month = o.getUTCMonth() + 1,
            day = o.getUTCDate(),
            year = o.getUTCFullYear(),
            hours = o.getUTCHours(),
            minutes = o.getUTCMinutes(),
            seconds = o.getUTCSeconds(),
            milli = o.getUTCMilliseconds();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        if (milli < 100) {
            milli = '0' + milli;
        }
        if (milli < 10) {
            milli = '0' + milli;
        }
        return '"' + year + '-' + month + '-' + day + 'T' +
            hours + ':' + minutes + ':' + seconds + '.' + milli + 'Z"';
    }
    pairs = [];
    if ($.isArray(o)) {
        for (k = 0; k < o.length; k++) {
            pairs.push($.toJSON(o[k]) || 'null');
        }
        return '[' + pairs.join(',') + ']';
    }
    if (typeof o === 'object') {
        for (k in o) {
            if (hasOwn.call(o, k)) {
                type = typeof k;
                if (type === 'number') {
                    name = '"' + k + '"';
                } else if (type === 'string') {
                    name = $.quoteString(k);
                } else {
                    continue;
                }
                type = typeof o[k];
                if (type !== 'function' && type !== 'undefined') {
                    val = $.toJSON(o[k]);
                    pairs.push(name + ':' + val);
                }
            }
        }
        return '{' + pairs.join(',') + '}';
    }
};
$.evalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function(str) {
    return eval('(' + str + ')');
};
$.secureEvalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function(str) {
    var filtered = str.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '');
    if (/^[\],:{}\s]*$/.test(filtered)) {
        return eval('(' + str + ')');
    }
    throw new SyntaxError('Error parsing JSON, source is not valid.');
};
$.quoteString = function(str) {
    if (str.match(escape)) {
        return '"' + str.replace(escape, function(a) {
            var c = meta[a];
            if (typeof c === 'string') {
                return c;
            }
            c = a.charCodeAt();
            return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
        }) + '"';
    }
    return '"' + str + '"';
};
/*********************************/

/***************时间戳**************/
//返回时间戳，调用此函数，获得此刻的unix时间戳
function getUnix() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var hours = today.getHours();
    var mins = today.getMinutes();
    var secs = today.getSeconds();
    var datetime = year + '-' + month + '-' + day + ' ' + hours + ':' + mins + ':' + secs;
    var tmp_datetime = datetime.replace(/:/g, '-');
    tmp_datetime = tmp_datetime.replace(/ /g, '-');
    var arr = tmp_datetime.split("-");
    var now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
    return parseInt(now.getTime() / 1000);
};
//返回今天0点的时间戳
function getToday() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var hours = 0;
    var mins = 0;
    var secs = 0;
    var datetime = year + '-' + month + '-' + day + ' ' + hours + ':' + mins + ':' + secs;
    var tmp_datetime = datetime.replace(/:/g, '-');
    tmp_datetime = tmp_datetime.replace(/ /g, '-');
    var arr = tmp_datetime.split("-");
    var now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
    return parseInt(now.getTime() / 1000);
};
//返回今年0点的时间戳
function getYear() {
    var today = new Date();
    var year = today.getFullYear();
    var month = 0;
    var day = 1;
    var hours = 0;
    var mins = 0;
    var secs = 0;
    var datetime = year + '-' + month + '-' + day + ' ' + hours + ':' + mins + ':' + secs;
    var tmp_datetime = datetime.replace(/:/g, '-');
    tmp_datetime = tmp_datetime.replace(/ /g, '-');
    var arr = tmp_datetime.split("-");
    var now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
    return parseInt(now.getTime() / 1000);
};
//时间戳转日期
function unixToDate(time) {
    var unixtime = time * 1000;
    var date = new Date(unixtime);
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    //var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    //var mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return date.getFullYear() + "." + month + "." + currentDate;
    //返回格式：yyyy-MM-dd
};
//返回月日时间
function getLastDate(time, type) {
    var unixtime = time * 1000;
    var date = new Date(unixtime);
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    if (type == 'month') {
        return month + "-" + currentDate + ' ' + hh + ':' + mm;
    } else {
        return date.getFullYear() + '-' + month + "-" + currentDate + ' ' + hh + ':' + mm;
    };
};
//时间换算
function getTheTime(time) {
    var now = getUnix(); //当前时间戳
    var today = getToday(); //今天0点时间戳
    var year = getYear(); //今年0点时间戳
    var timer = now - time;
    var tip = '';
    if (timer < 3600) {
        tip = Math.floor(timer / 60) + '分钟前';
    } else if (timer >= 3600 && (time - today >= 0)) {
        tip = Math.floor(timer / 3600) + '小时前';
    } else if (time - today < 0 && (time - year >= 0)) {
        tip = getLastDate(time, 'month');
    } else {
        tip = getLastDate(time, 'year');
    };
    return tip;
};
/***********************************/

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




