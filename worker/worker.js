self.addEventListener('message',function(ev){
    var obj = {
        beenget: 0,
        h_m: 107105,
        sbmsgid: "0",
        smax_msgid: "0",
        token: "85fb70418b53730020dd30714c866fb3"
    }
    getMsgList(obj);
// self.postMessage();
})


function getMsgList(obj){
    var request = new XMLHttpRequest();
    request.open('POST', 'http://www.ipalfish.com/klian/im/sync_msgs', true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var resp = request.responseText;
        } else {
            // We reached our target server, but it returned an error
        }
    };
    request.onerror = function() {
        // There was a connection error of some sort
    };
    request.send(JSON.stringify(obj));
}