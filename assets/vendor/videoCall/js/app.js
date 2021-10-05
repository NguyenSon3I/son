var chat;
(function (chat) {
    var websync;
    (function (websync) {
        var App = /** @class */ (function () {
            function App(logContainer) {
                // Chrome screen-sharing extension registration.
                // fm.icelink.Plugin.setChromeExtensionId('nidjnlpklmpflfmfflalpddmadlgjckn');
                // This flag determines the signalling mode used.
                // Note that Manual and Auto signalling do not Interop.
                this.SIGNAL_MANUALLY = false;
                this.signalling = null;
                this.iceServers = [
                    new fm.icelink.IceServer('stun:turn.frozenmountain.com:3478'),
                    // NB: The URL "turn:turn.icelink.fm:443" implies that the TURN server supports both UDP and TCP.
                    // If you want to restrict the network protocol, append "?transport=udp" or "?transport=tcp" to
                    // the URL, per RFC 7065: https://tools.ietf.org/html/rfc7065#section-3.1.
                    new fm.icelink.IceServer('turn:turn.frozenmountain.com:80', 'test', 'pa55w0rd!'),
                    new fm.icelink.IceServer('turns:turn.frozenmountain.com:443', 'test', 'pa55w0rd!')
                ];
                this.websyncServerUrl = 'https://v4.websync.fm/websync.ashx'; // WebSync Cloud
                this.localMedia = null;
                this.layoutManager = null;
                this.sessionId = null;
                this.name = null;
                this.chromeExtensionInstallButton = document.getElementById('chromeExtensionInstallButton');
                // Log to console and the DOM.
                fm.icelink.Log.registerProvider(new fm.icelink.ConsoleLogProvider(fm.icelink.LogLevel.Debug));
                fm.icelink.Log.registerProvider(new fm.icelink.DomLogProvider(logContainer, fm.icelink.LogLevel.Debug));
            }
            App.prototype.startLocalMedia = function (videoContainer, captureScreen, audioDeviceList, videoDeviceList) {
                var _this = this;
                var promise = new fm.icelink.Promise();
                try {
                    if (this.localMedia != null) {
                        throw new Error("Local media has already been started.");
                    }
                    var pluginConfig = new fm.icelink.PluginConfig();
                    pluginConfig.setActiveXPath("./FM.IceLink.ActiveX.cab");
                    fm.icelink.Plugin.install(pluginConfig).then(function (result) {
                        // Check if this browser is supported with local media.
                        if (!fm.icelink.Plugin.isReady(true)) {
                            // Check if this browser is supported without local media.
                            if (fm.icelink.Plugin.isReady()) {
                                promise.reject(new Error('This browser supports WebRTC, but does not support media capture.'));
                            }
                            else {
                                promise.reject(new Error('This browser does not support WebRTC, and no plugin could be found.'));
                            }
                            return;
                        }
                        // Set up the local media.
                        var audio = true;
                        var video = captureScreen ? new fm.icelink.VideoConfig(window.screen.width, window.screen.height, 3) : new fm.icelink.VideoConfig(640, 480, 30);
                        _this.localMedia = new fm.icelink.LocalMedia(audio, video, captureScreen);
                        // Set up the layout manager.
                        _this.layoutManager = new fm.icelink.DomLayoutManager(videoContainer);
                        // Start the local media.
                        _this.localMedia.start().then(function (localMedia) {
                            // Audio device selection.
                            if (audioDeviceList) {
                                audioDeviceList.options.length = 0;
                                var currentAudioSourceInput_1 = localMedia.getAudioSourceInput();
                                localMedia.getAudioSourceInputs().then(function (inputs) {
                                    for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
                                        var input = inputs_1[_i];
                                        var option = document.createElement('option');
                                        option.value = input.getId();
                                        option.text = input.getName();
                                        option.selected = (currentAudioSourceInput_1 != null && currentAudioSourceInput_1.getId() == input.getId());
                                        audioDeviceList.add(option);
                                    }
                                });
                            }
                            // Video device selection.
                            if (videoDeviceList) {
                                videoDeviceList.options.length = 0;
                                if (!captureScreen) {
                                    var currentVideoSourceInput_1 = localMedia.getVideoSourceInput();
                                    localMedia.getVideoSourceInputs().then(function (inputs) {
                                        for (var _i = 0, inputs_2 = inputs; _i < inputs_2.length; _i++) {
                                            var input = inputs_2[_i];
                                            var option = document.createElement('option');
                                            option.value = input.getId();
                                            option.text = input.getName();
                                            option.selected = (currentVideoSourceInput_1 != null && currentVideoSourceInput_1.getId() == input.getId());
                                            videoDeviceList.add(option);
                                        }
                                    });
                                }
                            }
                            // Add the local view to the layout.
                            var localView = localMedia.getView();
                            if (localView != null) {
                                localView.id = 'localView';
                                _this.layoutManager.setLocalView(localView);
                            }
                            promise.resolve(_this.localMedia);
                        }, function (ex) {
                            if (captureScreen && fm.icelink.Plugin.getChromeExtensionRequired() && !fm.icelink.Plugin.getChromeExtensionInstalled()) {
                                promise.reject(new Error(ex + '\n\nClick "Install Screen-Sharing Extension" to install screen-sharing extension.'));
                            }
                            else {
                                promise.reject(ex);
                            }
                        });
                    }, function (ex) {
                        promise.reject(ex);
                    });
                }
                catch (ex) {
                    promise.reject(ex);
                }
                return promise;
            };
            App.prototype.stopLocalMedia = function () {
                var _this = this;
                var promise = new fm.icelink.Promise();
                try {
                    if (this.localMedia == null) {
                        throw new Error("Local media has already been stopped.");
                    }
                    this.localMedia.stop().then(function (result) {
                        // Tear down the layout manager.
                        var lm = _this.layoutManager;
                        if (lm != null) {
                            lm.removeRemoteViews();
                            lm.unsetLocalView();
                            _this.layoutManager = null;
                        }
                        // Tear down the local media.
                        if (_this.localMedia != null) {
                            _this.localMedia.destroy();
                            _this.localMedia = null;
                        }
                        promise.resolve(null);
                    }, function (ex) {
                        promise.reject(ex);
                    });
                }
                catch (ex) {
                    promise.reject(ex);
                }
                return promise;
            };
            App.prototype.joinAsync = function (incomingMessage, peerLeft, peerJoined) {
                if (this.SIGNAL_MANUALLY) {
                    this.signalling = this.manualSignalling(incomingMessage, peerLeft, peerJoined);
                }
                else {
                    this.signalling = this.autoSignalling(incomingMessage, peerLeft, peerJoined);
                }
                return this.signalling.joinAsync();
            };
            App.prototype.autoSignalling = function (incomingMessage, peerLeft, peerJoined) {
                var self = this;
                return new websync.AutoSignalling(this.websyncServerUrl, this.name, this.sessionId, function (remoteClient) {
                    return self.connection(remoteClient, peerLeft, peerJoined);
                }, incomingMessage);
            };
            App.prototype.manualSignalling = function (incomingMessage, peerLeft, peerJoined) {
                var self = this;
                return new websync.ManualSignalling(this.websyncServerUrl, this.name, this.sessionId, function (remoteClient) {
                    return self.connection(remoteClient, peerLeft, peerJoined);
                }, incomingMessage);
            };
            App.prototype.connection = function (remoteClient, peerLeft, peerJoined) {
                var _this = this;
                var self = this;
                var peerName = "Unkown";
                if (remoteClient.getBoundRecords() && remoteClient.getBoundRecords()['userName']) {
                    peerName = remoteClient.getBoundRecords()['userName'].getValue();
                }
                var remoteMedia = new fm.icelink.RemoteMedia();
                remoteMedia.setAudioMuted(false);
                // Add the remote view to the layout.
                var remoteView = remoteMedia.getView();
                if (remoteView != null) {
                    remoteView.id = 'remoteView_' + remoteMedia.getId();
                    remoteMedia.getViewSink().setViewScale(fm.icelink.LayoutScale.Contain);
                    this.layoutManager.addRemoteView(remoteMedia.getId(), remoteView);
                }
                // Create connection to remote client.
                var audioStream = new fm.icelink.AudioStream(this.localMedia, remoteMedia);
                var videoStream = new fm.icelink.VideoStream(this.localMedia, remoteMedia);
                var connection = new fm.icelink.Connection([audioStream, videoStream]);
                connection.setIceServers(this.iceServers);
                connection.addOnStateChange(function (c) {
                    var error = connection.getError();
                    fm.icelink.Log.info('Connection state is ' + new fm.icelink.ConnectionStateWrapper(connection.getState()).toString() + '.', error ? error.getException() : undefined);
                    if (connection.getState() === fm.icelink.ConnectionState.Connected) {
                        peerJoined(peerName);
                    }
                    else if (connection.getState() === fm.icelink.ConnectionState.Closing ||
                        connection.getState() === fm.icelink.ConnectionState.Failing) {
                        // Remove the remote view from the layout.
                        var lm = _this.layoutManager;
                        if (lm != null) {
                            lm.removeRemoteView(remoteMedia.getId());
                        }
                        remoteMedia.destroy();
                    }
                    else if (connection.getState() === fm.icelink.ConnectionState.Closed) {
                        peerLeft(peerName);
                    }
                    else if (connection.getState() === fm.icelink.ConnectionState.Failed) {
                        peerLeft(peerName);
                        //Attempt to reconnect
                        if (!self.SIGNAL_MANUALLY)
                            self.signalling.reconnect(remoteClient, connection);
                    }
                });
                return connection;
            };
            App.prototype.leaveAsync = function () {
                if (this.signalling != null) {
                    return this.signalling.leaveAsync();
                }
                else {
                    var promise = new fm.icelink.Promise();
                    promise.resolve(null);
                    return promise;
                }
            };
            App.prototype.toggleAudioMute = function () {
                var audioTrack = this.localMedia.getAudioTrack();
                audioTrack.setMuted(!audioTrack.getMuted());
                return audioTrack.getMuted();
            };
            App.prototype.toggleVideoMute = function () {
                var videoTrack = this.localMedia.getVideoTrack();
                videoTrack.setMuted(!videoTrack.getMuted());
                return videoTrack.getMuted();
            };
            App.prototype.changeAudioDevice = function (id, name) {
                return this.localMedia.changeAudioSourceInput(new fm.icelink.SourceInput(id, name));
            };
            App.prototype.changeVideoDevice = function (id, name) {
                return this.localMedia.changeVideoSourceInput(new fm.icelink.SourceInput(id, name));
            };
            App.prototype.sendMessage = function (message) {
                this.signalling.writeLine(message);
            };
            return App;
        }());
        websync.App = App;
    })(websync = chat.websync || (chat.websync = {}));
})(chat || (chat = {}));
