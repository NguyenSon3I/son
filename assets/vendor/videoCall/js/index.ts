(fm as any).websync.client.enableMultiple = true;

var Names = [
    "Aurora",
    "Argus",
    "Baker",
    "Blackrock",
    "Caledonia",
    "Coquitlam",
    "Doom",
    "Dieppe",
    "Eon",
    "Elkhorn",
    "Fairweather",
    "Finlayson",
    "Garibaldi",
    "Grouse",
    "Hoodoo",
    "Helmer",
    "Isabelle",
    "Itcha",
    "Jackpass",
    "Josephine",
    "Klinkit",
    "King Albert",
    "Lilliput",
    "Lyall",
    "Mallard",
    "Douglas",
    "Nahlin",
    "Normandy",
    "Omega",
    "One Eye",
    "Pukeashun",
    "Plinth",
    "Quadra",
    "Quartz",
    "Razerback",
    "Raleigh",
    "Sky Pilot",
    "Swannell",
    "Tatlow",
    "Thomlinson",
    "Unnecessary",
    "Upright",
    "Vista",
    "Vedder",
    "Whistler",
    "Washington",
    "Yeda",
    "Yellowhead",
    "Zoa"
];

fm.icelink.Util.addOnLoad(function () {
    // Get DOM elements.
    var sessionSelector = document.getElementById('sessionSelector') as HTMLInputElement;
    var startSessionInput = document.getElementById('start-session-input') as HTMLInputElement;
    var nameInput = document.getElementById('name-input') as HTMLInputElement;
    var startSessionButton = document.getElementById('start-session-button') as HTMLButtonElement;
    var screencaptureCheckbox = document.getElementById('screencapture-checkbox') as HTMLInputElement;

    var videoChat = document.getElementById('video-chat');
    var loading = document.getElementById('loading');
    var video = document.getElementById('video');

    var text = document.getElementById('text') as HTMLInputElement;
    var sendInput = document.getElementById('sendInput') as HTMLInputElement;
    var sendButton = document.getElementById('sendButton') as HTMLButtonElement
    var leaveButton = document.getElementById('leaveButton') as HTMLButtonElement;

    var toggleAudioMute = document.getElementById('toggleAudioMute') as HTMLButtonElement;
    var toggleVideoMute = document.getElementById('toggleVideoMute') as HTMLButtonElement;
    var chromeExtensionInstallButton = document.getElementById('chromeExtensionInstallButton') as HTMLButtonElement;

    var audioDeviceList = document.getElementById('audioDeviceList') as HTMLSelectElement;
    var videoDeviceList = document.getElementById('videoDeviceList') as HTMLSelectElement;

    videoChat.style.height = (window.innerHeight - 138 - 138).toString();
    sessionSelector.style.height = (window.innerHeight - 138 - 138).toString();

    // Create new App.
    var app = new chat.websync.App(document.getElementById('log'));

    var getUrlParameter = function (name: string) {
        name = encodeURI(name);
        let pairStrings = document.location.search.substr(1).split('&');
        for (let i = 0; i < pairStrings.length; i++) {
            let pair = pairStrings[i].split('=');
            if (pair[0] == name) {
                if (pair.length > 1) {
                    return pair[1];
                }
                return '';
            }
        }
        return null;
    };

    var setUrlParameter = function (name: string, value: string) {
        name = encodeURI(name);
        value = encodeURI(value);
        let pairStrings = document.location.search.substr(1).split('&');
        let updated = false;
        for (let i = 0; i < pairStrings.length; i++) {
            let pair = pairStrings[i].split('=');
            if (pair[0] == name) {
                if (pair.length > 1) {
                    pair[1] = value;
                } else {
                    pair.push(value);
                }
                pairStrings[i] = pair.join('=');
                updated = true;
                break;
            }
        }
        if (!updated) {
            pairStrings.push([name, value].join('='));
        }
        var qString = pairStrings.join('&');
        if (qString[0] == '&') {
            qString = qString.substr(1);
        }
        history.pushState(null, '', '?' + qString);

    };

    // Create a random 6 digit number for the new session ID or get the info from the URL
    let sessionId = getUrlParameter("sessionId");
    if (sessionId && sessionId.length === 6) {
        startSessionInput.value = sessionId;
    } else {
        startSessionInput.value = (Math.floor(Math.random() * 900000) + 100000).toString();
    }

    // Safari does not support screen-sharing.
    screencaptureCheckbox.disabled = fm.icelink.Util.isSafari();

    // If the browser is not Safari, get info on the screen capture checkbox from the URL, if present
    let captureScreen = getUrlParameter("screenCapture");
    if (captureScreen && !fm.icelink.Util.isSafari()) {
        screencaptureCheckbox.checked = (captureScreen != '0' && captureScreen != 'false' && captureScreen != 'no');
    } 

    // Choose a random entry for the new user's Name
    nameInput.value = Names[Math.floor(Math.random() * Names.length)];

    var start = function (sessionId: string, name: string) {
        if (window.console && window.console.log) {
            window.console.log(sessionId);
        }

        if (app.sessionId) {
            return;
        }

        if (sessionId.length != 6) {
            alert('Session ID must be 6 digits long.');
            return;
        }

        if (name.length == 0) {
            alert('Must type a name.');
            return;
        }

        app.sessionId = sessionId;
        app.name = name;

        // Switch the UI context.
        setUrlParameter("sessionId", app.sessionId);
        setUrlParameter("screenCapture", screencaptureCheckbox.checked ? '1' : '0');

        try {
            // I've seen this fail on some browsers.
            localStorage.setItem('screen', screencaptureCheckbox.checked ? '1' : '0');
            localStorage.setItem('name', name);
        }
        catch (ex) {
            console.error(ex);
        }

        videoChat.style.display = 'block';
        sessionSelector.style.display = 'none';

        fm.icelink.Log.info('Joining session ' + app.sessionId + '.');

        // Start the local media.
        app.startLocalMedia(video, screencaptureCheckbox.checked, audioDeviceList, videoDeviceList).then((localMedia) => {
            // Update the UI context.
            loading.style.display = 'none';
            video.style.display = 'block';

            writeMessage('<b>You\'ve joined session ' + app.sessionId + ' as ' + app.name + '.</b>')

            // Enable the media controls (if there is a track to disable).
            if (localMedia.getAudioTrack()) {
                toggleAudioMute.removeAttribute('disabled');
            }
            if (localMedia.getVideoTrack()) {
                toggleVideoMute.removeAttribute('disabled');
            }

            // Join the session.
            return app.joinAsync(incomingMessage, peerLeft, peerJoined);
        }, (ex) => {
            fm.icelink.Log.error('Could not start local media.', ex);
            alert('Could not start local media.\n' + (ex.message || ex.name));
            stop();
        }).then((o) => {
            // Enable the leave button.
            leaveButton.removeAttribute('disabled');
            fm.icelink.Log.info('<span style="font-size: 1.5em;">' + app.sessionId + '</span>');
        }, (ex) => {
            fm.icelink.Log.error('Could not join session.', ex);
            stop();
        });
    };

    let switchToSessionSelectionScreen = () => {
        // Disable the media controls.
        toggleAudioMute.setAttribute('disabled', 'disabled');
        toggleVideoMute.setAttribute('disabled', 'disabled');

        // Update the UI context.
        video.style.display = 'none';
        loading.style.display = 'block';
        text.innerHTML = '';

        // Switch the UI context.
        sessionSelector.style.display = 'block';
        videoChat.style.display = 'none';
        location.hash = '';
    }

    var stop = function () {
        if (!app.sessionId) {
            return;
        }
        
        app.sessionId = '';

        // Disable the leave button.
        leaveButton.setAttribute('disabled', 'disabled');
        
        fm.icelink.Log.info('Leaving session.');
        app.leaveAsync().then((o) => {
            fm.icelink.Log.info('Left session.');
            switchToSessionSelectionScreen();
        }, (ex) => {
            fm.icelink.Log.error('Could not leave session.', ex);
        });
        
        fm.icelink.Log.info('Stopping local media.');
        app.stopLocalMedia().then((o) => {
            fm.icelink.Log.info('Stopped local media.');
        }, (ex) => {
            fm.icelink.Log.error('Could not stop local media.', ex);
        });
    };

    // Attach DOM events.
    fm.icelink.Util.observe(startSessionButton, 'click', function (evt: any) {
        evt.preventDefault();
        start(startSessionInput.value, nameInput.value);
    });
    fm.icelink.Util.observe(screencaptureCheckbox, 'click', function (evt: any) {
        if (this.checked) {
            if (fm.icelink.Plugin.getChromeExtensionRequired() && !fm.icelink.LocalMedia.getChromeExtensionInstalled()) {
                chromeExtensionInstallButton.setAttribute('class', 'btn btn-default');
                startSessionButton.setAttribute('disabled', 'disabled');
            }
        } else {
            if (fm.icelink.Plugin.getChromeExtensionRequired() && !fm.icelink.LocalMedia.getChromeExtensionInstalled()) {
                chromeExtensionInstallButton.setAttribute('class', 'btn btn-default hidden');
                startSessionButton.removeAttribute('disabled');
            }
        }
    });
    fm.icelink.Util.observe(startSessionInput, 'keydown', function (evt: any) {
        // Treat Enter as button click.
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode == 13) {
            start(startSessionInput.value, nameInput.value);
            return false;
        }
    });
    fm.icelink.Util.observe(sendInput, 'keydown', function (evt: any) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode == 13) {
            var msg = sendInput.value;
            sendInput.value = '';

            if (msg != '') {
                incomingMessage('Me', msg);
                app.sendMessage(msg);
            }
        }
    });
    fm.icelink.Util.observe(sendButton, 'click', function (evt: any) {
        var msg = sendInput.value;
        sendInput.value = '';

        if (msg != '') {
            incomingMessage('Me', msg);
            app.sendMessage(msg);
        }
    });
    fm.icelink.Util.observe(leaveButton, 'click', function (evt: any) {
        if (!app.sessionId) {
            // Stop local media
            app.stopLocalMedia().then((o) => { }, (ex) => {
                fm.icelink.Log.error('Could not leave session.', ex);
            });

            // Switch the UI context.
            sessionSelector.style.display = 'block';
            videoChat.style.display = 'none';
            location.hash = '';
        } else {
            stop();
        }
    });
    fm.icelink.Util.observe(window, 'unload', function () {
        stop();
    });
    fm.icelink.Util.observe(toggleAudioMute, 'click', function (evt: any) {
        var muted = app.toggleAudioMute();
        toggleAudioMute.innerHTML = muted ? '&nbsp;<i class="fa fa-lg fa-microphone-slash" aria-hidden="true"></i>' : '&nbsp;<i class="fa fa-lg fa-microphone" aria-hidden="true"></i>';
    });
    fm.icelink.Util.observe(toggleVideoMute, 'click', function (evt: any) {
        var muted = app.toggleVideoMute();
        toggleVideoMute.style.backgroundImage = muted ? 'url(images/no-cam.png)' : 'url(images/cam.png)';
    });
    fm.icelink.Util.observe(audioDeviceList, 'change', function (evt: any) {
        audioDeviceList.disabled = true;
        let option = audioDeviceList.options[audioDeviceList.selectedIndex];
        app.changeAudioDevice(option.value, option.text).then((o) => {
            audioDeviceList.disabled = false;
        }, (ex) => {
            audioDeviceList.disabled = false;
            alert('Could not change audio device. ' + (ex.message || ex.name));
        });
    });
    fm.icelink.Util.observe(videoDeviceList, 'change', function (evt: any) {
        videoDeviceList.disabled = true;
        let option = videoDeviceList.options[videoDeviceList.selectedIndex];
        app.changeVideoDevice(option.value, option.text).then((o) => {
            videoDeviceList.disabled = false;
        }, (ex) => {
            videoDeviceList.disabled = false;
            alert('Could not change video device. ' + (ex.message || ex.name));
        });
    });
    fm.icelink.Util.observe(chromeExtensionInstallButton, 'click', function () {
        if (fm.icelink.LocalMedia.getChromeExtensionRequiresUserGesture()) {
            // Try inline install.
            (window as any).chrome.webstore.install(fm.icelink.LocalMedia.getChromeExtensionUrl(), function () {
                location.reload();
            },
                function (error: Error) {
                    // Worst case scenario prompt to install manually.
                    if (confirm('Inline installation failed. ' + error + '\n\nOpen Chrome Web Store?')) {
                        window.open(fm.icelink.LocalMedia.getChromeExtensionUrl(), '_blank');
                    }
                });
        } else {
            // Manual installation required.
            window.open(fm.icelink.LocalMedia.getChromeExtensionUrl(), '_blank');
        }
    });

    var isNumeric = function (evt: any) {
        // Only accept digit- and control-keys.
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        return (charCode <= 31 || (charCode >= 48 && charCode <= 57));
    };

    var writeMessage = function (msg: string) {
        var content = document.createElement('p');
        content.innerHTML = msg;
        text.appendChild(content);
        text.scrollTop = text.scrollHeight;
    };

    var incomingMessage = function (name: string, message: string) {
        writeMessage('<b>' + name + ':</b> ' + message);
    };

    var peerLeft = function (name: string) {
        writeMessage('<b>' + name + ' left.</b>')
    };

    var peerJoined = function (name: string) {
        writeMessage('<b>' + name + ' joined.</b>');
    };

    // Register for handling fullscreen change event.
    fm.icelink.Util.observe(document, 'fullscreenchange', function (evt: any) { fullscreenChange(); });
    fm.icelink.Util.observe(document, 'webkitfullscreenchange', function (evt: any) { fullscreenChange(); });
    fm.icelink.Util.observe(document, 'mozfullscreenchange', function (evt: any) { fullscreenChange(); });
    fm.icelink.Util.observe(document, 'msfullscreenchange', function (evt: any) { fullscreenChange(); });

    // Register for mouse events over video element: show/hide fullscreen toggle.
    fm.icelink.Util.observe(video, 'mouseenter', function (evt: any) {

        video.classList.add('visible-controls');
    });
    fm.icelink.Util.observe(video, 'mouseleave', function (evt: any) {

        video.classList.remove('visible-controls');
    });

    // Hook click on video conference full screen toggle.
    fm.icelink.Util.observe(document.getElementById('fullscreen'), 'click', function (evt: any) {

        var fs = document.getElementById('fullscreen'),
            icon = document.getElementById('fullscreen-icon');

        if (icon.classList.contains('fa-expand')) {
            enterFullScreen();
        }
        else {
            exitFullScreen();
        }
    });

    // Put video element into fullscreen.
    var enterFullScreen = function () {

        var icon = document.getElementById('fullscreen-icon'),
            video = document.getElementById('video');

        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if ((video as any).webkitRequestFullscreen) {
            (video as any).webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
        else {
            // Add "fake" fullscreen via CSS.
            icon.classList.remove('fa-expand');
            icon.classList.add('fa-compress');
            video.classList.add('fs-fallback');
        }
    };

    // Take doc out of fullscreen.
    var exitFullScreen = function () {

        var icon = document.getElementById('fullscreen-icon'),
            video = document.getElementById('video');

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        else {
            // Remove "fake" CSS fullscreen.
            icon.classList.add('fa-expand');
            icon.classList.remove('fa-compress');
            video.classList.remove('fs-fallback');
        }
    };

    // Handle event: doc has entered/exited fullscreen. 
    var fullscreenChange = function () {

        var icon = document.getElementById('fullscreen-icon'),
            fullscreenElement = (document as any).fullscreenElement ||
                document.mozFullScreenElement ||
                (document as any).webkitFullscreenElement ||
                document.msFullscreenElement;

        if (fullscreenElement) {
            icon.classList.remove('fa-expand');
            icon.classList.add('fa-compress');
        }
        else {
            icon.classList.add('fa-expand');
            icon.classList.remove('fa-compress');
        }
    };
});

// So TS does not complain we extend document and element typings
interface Document {
    msExitFullscreen: any;
    mozCancelFullScreen: any;
    mozFullScreenElement: any;
    msFullscreenElement: any;
}

interface HTMLElement {
    msRequestFullscreen(): void;
    mozRequestFullScreen(): void;
}
