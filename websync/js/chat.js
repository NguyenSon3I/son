//Global variables
var webSyncHandleUrl = 'https://websync.s-work.vn/websync.ashx';

fm.util.addOnLoad(function () {
    var chat = {
        alias: 'Unknown',
        clientId: 0,
        channels: {
            main: '/chat'
        },
        dom: {
            chat: {
                container: document.getElementById('chat'),
                text: document.getElementById('text'),
                log: document.getElementById('log'),
                send: document.getElementById('send'),
                username: document.getElementById('username'),
                roomid: document.getElementById('roomid')
            }
        },
        util: {
            start: function () {
                chat.alias = chat.dom.chat.username.value;
                chat.clientId = chat.dom.chat.roomid.value;
                //chat.util.hide(chat.dom.prechat.container);
                chat.util.show(chat.dom.chat.container);
                chat.util.scroll();
                chat.dom.chat.text.focus();
            },
            stopEvent: function (event) {
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
                if (event.stopPropagation) {
                    event.stopPropagation();
                } else {
                    event.cancelBubble = true;
                }
            },
            send: function () {
                if (chat.util.isEmpty(chat.dom.chat.text)) {
                    chat.util.setInvalid(chat.dom.chat.text);
                } else {
                    client.publish({
                        channel: '/' + chat.dom.chat.roomid.value,
                        data: {
                            alias: chat.alias,
                            text: chat.dom.chat.text.value
                        },
                        onSuccess: function (args) {
                            chat.util.clear(chat.dom.chat.text);
                        }
                    });
                }
            },
            show: function (el) {
                el.style.display = '';
            },
            hide: function (el) {
                el.style.display = 'none';
            },
            clear: function (el) {
                el.value = '';
            },
            observe: fm.util.observe,
            isEnter: function (e) {
                return (e.keyCode == 13);
            },
            isEmpty: function (el) {
                return (el.value == '');
            },
            setInvalid: function (el) {
                el.className = 'invalid';
            },
            clearLog: function () {
                chat.dom.chat.log.innerHTML = '';
            },
            logMessage: function (alias, text, me) {
                var html = '<span';
                if (me) {
                    html += ' class="me"';
                }
                html += '>' + alias + ': ' + text + '</span>';
                chat.util.log(html);
            },
            logSuccess: function (text) {
                chat.util.log('<span class="success">' + text + '</span>');
            },
            logFailure: function (text) {
                chat.util.log('<span class="failure">' + text + '</span>');
            },
            log: function (html) {
                var div = document.createElement('div');
                div.innerHTML = html;
                chat.dom.chat.log.appendChild(div);
                chat.util.scroll();
            },
            scroll: function () {
                chat.dom.chat.log.scrollTop = chat.dom.chat.log.scrollHeight;
            }
        }
    };

    // chat.util.observe(chat.dom.prechat.start, 'click', function (e) {
    //     chat.util.start();
    // });

    // chat.util.observe(chat.dom.prechat.alias, 'keydown', function (e) {
    //     if (chat.util.isEnter(e)) {
    //         chat.util.start();
    //         chat.util.stopEvent(e);
    //     }
    // });

    chat.util.observe(chat.dom.chat.send, 'click', function (e) {
        chat.util.start();
        chat.util.send();
    });

    chat.util.observe(chat.dom.chat.text, 'keydown', function (e) {
        if (chat.util.isEnter(e)) {
            chat.util.start();
            chat.util.send();
            chat.util.stopEvent(e);
        }
    });

    var client = new fm.websync.client(webSyncHandleUrl);

    client.connect({
        onSuccess: function (args) {
            chat.clientId = args.clientId;
            chat.util.clearLog();
            //chat.util.logSuccess('Nội dung chat của khách.');
            //chat.util.show(chat.dom.prechat.container);
            chat.util.show(chat.dom.chat.container);
        },
        onFailure: function (args) {
            //chat.util.logSuccess('Could not connect to WebSync.');
        }
    });

    client.subscribe({
        channel: '/' + chat.dom.chat.roomid.value,
        onSuccess: function (args) {
            chat.util.logSuccess('Nội dung chat của khách.');
            var logs = args.getExtensionValue('logs');
            if(logs != null){
                for (var i = 0; i < logs.length; i++) {
                    chat.util.logMessage(logs[i].alias, logs[i].text, false);
                }
            }
        },
        onFailure: function (args) {
            chat.util.logSuccess('Đang bị mất kết nối.');
        },
        onReceive: function (args) {            
            //alert(args.getData().alias + ":" + args.getData().text);
            chat.util.logMessage(args.getData().alias, args.getData().text, args.getWasSentByMe());
        }
    });
});