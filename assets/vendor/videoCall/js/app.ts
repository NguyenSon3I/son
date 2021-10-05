namespace chat.websync {
    export class App {

        // This flag determines the signalling mode used.
        // Note that Manual and Auto signalling do not Interop.
        private SIGNAL_MANUALLY: boolean = false;
        private signalling: Signalling = null;

        private iceServers: fm.icelink.IceServer[] = [
            new fm.icelink.IceServer('stun:turn.frozenmountain.com:3478'),
            // NB: The URL "turn:turn.icelink.fm:443" implies that the TURN server supports both UDP and TCP.
            // If you want to restrict the network protocol, append "?transport=udp" or "?transport=tcp" to
            // the URL, per RFC 7065: https://tools.ietf.org/html/rfc7065#section-3.1.
            new fm.icelink.IceServer('turn:turn.frozenmountain.com:80', 'test', 'pa55w0rd!'),
            new fm.icelink.IceServer('turns:turn.frozenmountain.com:443', 'test', 'pa55w0rd!')
        ];

        private websyncServerUrl: string = 'https://v4.websync.fm/websync.ashx'; // WebSync Cloud
        
        private localMedia: fm.icelink.LocalMedia = null;
        private layoutManager: fm.icelink.DomLayoutManager = null;

        public sessionId: string = null;
        public name: string = null;

        private chromeExtensionInstallButton = document.getElementById('chromeExtensionInstallButton') as HTMLButtonElement;

        public constructor(logContainer: HTMLElement) {
            // Chrome screen-sharing extension registration.
            // fm.icelink.Plugin.setChromeExtensionId('nidjnlpklmpflfmfflalpddmadlgjckn');
            
            // Log to console and the DOM.
            fm.icelink.Log.registerProvider(new fm.icelink.ConsoleLogProvider(fm.icelink.LogLevel.Debug));
            fm.icelink.Log.registerProvider(new fm.icelink.DomLogProvider(logContainer, fm.icelink.LogLevel.Debug));
        }

        public startLocalMedia(videoContainer: HTMLElement, captureScreen: boolean, audioDeviceList: HTMLSelectElement, videoDeviceList: HTMLSelectElement): fm.icelink.Future<fm.icelink.LocalMedia> {
            var promise = new fm.icelink.Promise<fm.icelink.LocalMedia>();
            try {
                if (this.localMedia != null) {
                    throw new Error("Local media has already been started.");
                }

                var pluginConfig = new fm.icelink.PluginConfig();
                pluginConfig.setActiveXPath("./FM.IceLink.ActiveX.cab");

                fm.icelink.Plugin.install(pluginConfig).then((result) => {

                    // Check if this browser is supported with local media.
                    if (!fm.icelink.Plugin.isReady(true)) {
                        // Check if this browser is supported without local media.
                        if (fm.icelink.Plugin.isReady()) {
                            promise.reject(new Error('This browser supports WebRTC, but does not support media capture.'));
                        } else {
                            promise.reject(new Error('This browser does not support WebRTC, and no plugin could be found.'));
                        }
                        return;
                    }

                    // Set up the local media.
                    var audio = true;
                    var video = captureScreen ? new fm.icelink.VideoConfig(window.screen.width, window.screen.height, 3) : new fm.icelink.VideoConfig(640, 480, 30);
                    this.localMedia = new fm.icelink.LocalMedia(audio, video, captureScreen);

                    // Set up the layout manager.
                    this.layoutManager = new fm.icelink.DomLayoutManager(videoContainer);

                    // Start the local media.
                    this.localMedia.start().then((localMedia) => {

                        // Audio device selection.
                        if (audioDeviceList) {
                            audioDeviceList.options.length = 0;
                            let currentAudioSourceInput = localMedia.getAudioSourceInput();
                            localMedia.getAudioSourceInputs().then((inputs) => {
                                for (var input of inputs) {
                                    var option = document.createElement('option');
                                    option.value = input.getId();
                                    option.text = input.getName();
                                    option.selected = (currentAudioSourceInput != null && currentAudioSourceInput.getId() == input.getId());
                                    audioDeviceList.add(option);
                                }
                            });
                        }
                        
                        // Video device selection.
                        if (videoDeviceList) {
                            videoDeviceList.options.length = 0;
                            if (!captureScreen) {
                                let currentVideoSourceInput = localMedia.getVideoSourceInput();
                                localMedia.getVideoSourceInputs().then((inputs) => {
                                    for (var input of inputs) {
                                        var option = document.createElement('option');
                                        option.value = input.getId();
                                        option.text = input.getName();
                                        option.selected = (currentVideoSourceInput != null && currentVideoSourceInput.getId() == input.getId());
                                        videoDeviceList.add(option);
                                    }
                                });
                            }
                        }

                        // Add the local view to the layout.
                        var localView = localMedia.getView();
                        if (localView != null) {
                            localView.id = 'localView';
                            this.layoutManager.setLocalView(localView);
                        }
                        promise.resolve(this.localMedia);
                    }, (ex) => {
                        if (captureScreen && fm.icelink.Plugin.getChromeExtensionRequired() && !fm.icelink.Plugin.getChromeExtensionInstalled()) {
                            promise.reject(new Error(ex + '\n\nClick "Install Screen-Sharing Extension" to install screen-sharing extension.'));
                        } else {
                            promise.reject(ex);
                        }
                    });
                }, (ex) => {
                    promise.reject(ex);
                });
            } catch (ex) {
                promise.reject(ex);
            }
            return promise;
        }

        public stopLocalMedia(): fm.icelink.Future<Object> {
            var promise = new fm.icelink.Promise();
            try {
                if (this.localMedia == null) {
                    throw new Error("Local media has already been stopped.");
                }

                this.localMedia.stop().then((result) => {
                    // Tear down the layout manager.
                    var lm = this.layoutManager;
                    if (lm != null) {
                        lm.removeRemoteViews();
                        lm.unsetLocalView();
                        this.layoutManager = null;
                    }

                    // Tear down the local media.
                    if (this.localMedia != null) {
                        this.localMedia.destroy();
                        this.localMedia = null;
                    }

                    promise.resolve(null);
                }, (ex) => {
                    promise.reject(ex);
                });
            } catch (ex) {
                promise.reject(ex);
            }
            return promise;
        }

        public joinAsync(incomingMessage: (name: string, message: string) => void, peerLeft: (name: string) => void, peerJoined: (name: string) => void): fm.icelink.Future<Object> {
            if (this.SIGNAL_MANUALLY) {
                this.signalling = this.manualSignalling(incomingMessage, peerLeft, peerJoined);
            }
            else {
                this.signalling = this.autoSignalling(incomingMessage, peerLeft, peerJoined);
            }

            return this.signalling.joinAsync();
        }

        private autoSignalling(incomingMessage: (name: string, message: string) => void, peerLeft: (name: string) => void, peerJoined: (name: string) => void): Signalling {
            var self = this;
            return new AutoSignalling(this.websyncServerUrl, this.name, this.sessionId, (remoteClient: any): fm.icelink.Connection => {
                return self.connection(remoteClient, peerLeft, peerJoined);
            }, incomingMessage);
        }

        private manualSignalling(incomingMessage: (name: string, message: string) => void, peerLeft: (name: string) => void, peerJoined: (name: string) => void): Signalling {
            var self = this;
            return new ManualSignalling(this.websyncServerUrl, this.name, this.sessionId, (remoteClient: any): fm.icelink.Connection => {
                return self.connection(remoteClient, peerLeft, peerJoined);
            }, incomingMessage);
        }

        private connection(remoteClient: any, peerLeft: (name: string) => void, peerJoined: (name: string) => void): fm.icelink.Connection {
            var self = this;
            var peerName = "Unkown";
            if (remoteClient.getBoundRecords() && remoteClient.getBoundRecords()['userName']) {
                peerName = (remoteClient.getBoundRecords()['userName'] as any).getValue();
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
            connection.addOnStateChange((c: fm.icelink.Connection) => {
                var error = connection.getError();
                fm.icelink.Log.info('Connection state is ' + new fm.icelink.ConnectionStateWrapper(connection.getState()).toString() + '.', error ? error.getException() : undefined);

                if (connection.getState() === fm.icelink.ConnectionState.Connected) {
                    peerJoined(peerName);
                }
                else if (connection.getState() === fm.icelink.ConnectionState.Closing ||
                    connection.getState() === fm.icelink.ConnectionState.Failing) {
                    // Remove the remote view from the layout.
                    var lm = this.layoutManager;
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
        }

        public leaveAsync(): fm.icelink.Future<Object> {
            if (this.signalling != null) {
                return this.signalling.leaveAsync();
            } else {
                var promise = new fm.icelink.Promise();
                promise.resolve(null);
                return promise;
            }
        }

        public toggleAudioMute(): boolean {
            var audioTrack = this.localMedia.getAudioTrack();
            audioTrack.setMuted(!audioTrack.getMuted());
            return audioTrack.getMuted();
        }

        public toggleVideoMute(): boolean {
            var videoTrack = this.localMedia.getVideoTrack();
            videoTrack.setMuted(!videoTrack.getMuted());
            return videoTrack.getMuted();
        }

        public changeAudioDevice(id: string, name: string): fm.icelink.Future<Object> {
            return this.localMedia.changeAudioSourceInput(new fm.icelink.SourceInput(id, name));
        }

        public changeVideoDevice(id: string, name: string): fm.icelink.Future<Object> {
            return this.localMedia.changeVideoSourceInput(new fm.icelink.SourceInput(id, name));
        }

        public sendMessage(message: string): void {
            this.signalling.writeLine(message);
        }
    }
}
