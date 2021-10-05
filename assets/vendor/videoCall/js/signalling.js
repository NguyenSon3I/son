/// <reference path="../lib/fm.websync.subscribers.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chat;
(function (chat) {
    var websync;
    (function (websync) {
        var Signalling = /** @class */ (function () {
            function Signalling(serverUrl, name, sessionId, createConnection, onReceivedText) {
                this.sessionId = null;
                this.serverUrl = null;
                this.userName = null;
                this.userId = null;
                this.sessionChannel = null;
                this.metadataChannel = null;
                this.userIdKey = null;
                this.userNameKey = null;
                this.textMessageKey = null;
                this.createConnection = null;
                this.onReceivedText = null;
                this.client = null;
                this.Connections = null;
                this.serverUrl = serverUrl;
                this.sessionId = sessionId;
                this.userName = name;
                this.createConnection = createConnection;
                this.userId = fm.icelink.Guid.newGuid().toString();
                this.userIdKey = "userId";
                this.userNameKey = "userName";
                this.onReceivedText = onReceivedText;
                this.defineChannels();
            }
            Signalling.prototype.closeAllConnections = function () {
                var conns = this.Connections.getValues();
                conns.forEach(function (connection) {
                    connection.close();
                });
                this.Connections.removeAll();
            };
            Signalling.prototype.bindUserMetadata = function (k, v) {
                var promise = new fm.icelink.Promise();
                this.client.bind({
                    record: {
                        key: k,
                        value: v
                    },
                    onFailure: function (ex) {
                        promise.reject(ex);
                    },
                    onSuccess: function () {
                        promise.resolve(null);
                    }
                });
                return promise;
            };
            Signalling.prototype.unbindUserMetadata = function (k, v) {
                var promise = new fm.icelink.Promise();
                this.client.unbind({
                    record: {
                        key: k,
                        value: v
                    },
                    onFailure: function (args) {
                        promise.reject(args.getException());
                    },
                    onSuccess: function (args) {
                        promise.resolve(null);
                    }
                });
                return promise;
            };
            Signalling.prototype.unsubscribeFromChannel = function (c) {
                var promise = new fm.icelink.Promise();
                try {
                    // Leave the signalling channel.
                    var leaveArgs = new fm.icelink.websync4.LeaveConferenceArgs(c);
                    leaveArgs.setOnSuccess(function (args) {
                        promise.resolve(null);
                    });
                    leaveArgs.setOnFailure(function (args) {
                        promise.reject(args.getException());
                    });
                    fm.icelink.websync4.ClientExtensions.leaveConference(this.client, leaveArgs);
                }
                catch (error) {
                    promise.reject(error);
                }
                return promise;
            };
            Signalling.prototype.joinAsync = function () {
                var _this = this;
                var promise = new fm.icelink.Promise();
                try {
                    this.Connections = new fm.icelink.ConnectionCollection();
                    // Create the signalling client and connect.
                    this.client = new fm.websync.client(this.serverUrl);
                    this.client.setAutoDisconnect({
                        synchronous: true
                    });
                    this.client.connect({
                        onSuccess: function (args) {
                            _this.subscribeToMetadataChannel().then(function () {
                                _this.doJoinAsync(promise);
                            });
                        },
                        onFailure: function (args) {
                            if (promise.getState() === fm.icelink.FutureState.Pending) {
                                promise.reject(args.getException());
                            }
                        },
                        onStreamFailure: function (streamFailureArgs) {
                            _this.closeAllConnections();
                        },
                        /*
                            Used to override the client's default backoff.
                            By default the backoff doubles after each failure.
                            For example purposes that gets too long.
                            Add a comment to this line
                         */
                        retryBackoff: function (retryBackoffArgs) {
                            return 1000; // milliseconds
                        }
                    });
                }
                catch (ex) {
                    if (promise.getState() === fm.icelink.FutureState.Pending) {
                        promise.reject(ex);
                    }
                }
                return promise;
            };
            Signalling.prototype.leaveAsync = function () {
                var promise = new fm.icelink.Promise();
                this.closeAllConnections();
                try {
                    this.client.disconnect({
                        onComplete: function (args) {
                            promise.resolve(null);
                        }
                    });
                }
                catch (ex) {
                    if (promise.getState() === fm.icelink.FutureState.Pending) {
                        promise.reject(ex);
                    }
                }
                return promise;
            };
            Signalling.prototype.subscribeToMetadataChannel = function () {
                var _this = this;
                var promise = new fm.icelink.Promise();
                try {
                    this.client.subscribe({
                        channel: this.metadataChannel,
                        onSuccess: function () {
                            promise.resolve(null);
                        },
                        onFailure: function (args) {
                            promise.reject(args.getException());
                        },
                        onReceive: function (args) {
                            if (!args.getWasSentByMe()) {
                                var jsonData = args.getData();
                                _this.onReceivedText(jsonData.userName, jsonData.textMsg);
                            }
                        }
                    });
                }
                catch (ex) {
                    if (promise.getState() === fm.icelink.FutureState.Pending) {
                        promise.reject(ex);
                    }
                }
                return promise;
            };
            Signalling.prototype.writeLine = function (message) {
                var json = {
                    userName: this.userName,
                    textMsg: message
                };
                this.client.publish(new fm.websync.PublishArgs(this.metadataChannel, JSON.stringify(json)));
            };
            return Signalling;
        }());
        websync.Signalling = Signalling;
        var ManualSignalling = /** @class */ (function (_super) {
            __extends(ManualSignalling, _super);
            function ManualSignalling(serverUrl, name, sessionId, createConnection, onReceivedText) {
                var _this = _super.call(this, serverUrl, name, sessionId, createConnection, onReceivedText) || this;
                _this.offerTag = "offer";
                _this.answerTag = "answer";
                _this.candidateTag = "candidate";
                return _this;
            }
            ManualSignalling.prototype.defineChannels = function () {
                this.userChannel = "/user/" + this.userId;
                this.sessionChannel = "/manual-signalling/" + this.sessionId;
                this.metadataChannel = this.sessionChannel + "/metadata";
            };
            ManualSignalling.prototype.doJoinAsync = function (promise) {
                var _this = this;
                this.bindUserMetadata(this.userIdKey, this.userId)
                    .then(function () {
                    return _this.bindUserMetadata(_this.userNameKey, _this.userName);
                })
                    .then(function () {
                    return _this.subscribeToUserChannel();
                })
                    .then(function () {
                    return _this.subscribeToSessionChannel();
                })
                    .then(function () {
                    if (promise.getState() === fm.icelink.FutureState.Pending) {
                        promise.resolve(null);
                    }
                })
                    .fail(function (ex) {
                    if (promise.getState() === fm.icelink.FutureState.Pending) {
                        promise.reject(ex);
                    }
                });
            };
            ManualSignalling.prototype.subscribeToUserChannel = function () {
                var _this = this;
                var promise = new fm.icelink.Promise();
                this.client.subscribe({
                    channel: this.userChannel,
                    onSuccess: function () {
                        promise.resolve(null);
                    },
                    onFailure: function (args) {
                        promise.reject(args.getException());
                    },
                    onReceive: function (args) {
                        var remoteClientId = args.getClient().getClientId()._guid;
                        var remoteUserId = fm.icelink.Serializer.deserializeString(args.getPublishingClient().getBoundRecords()[_this.userIdKey].getValueJson());
                        var connection = _this.Connections.getByExternalId(remoteClientId);
                        if (args.getTag() === _this.candidateTag) {
                            if (connection == null) {
                                connection = _this.createConnectionAndWireOnLocalCandidate(new fm.icelink.websync4.PeerClient(args.getPublishingClient().getClientId(), args.getPublishingClient().getBoundRecords()), remoteUserId);
                                connection.setExternalId(remoteClientId);
                                _this.Connections.add(connection);
                            }
                            fm.icelink.Log.info("Received candidate from remote peer.");
                            connection.addRemoteCandidate(fm.icelink.Candidate.fromJson(args.getDataJson()))
                                .fail(function (ex) {
                                fm.icelink.Log.error("Could not process candidate from remote peer.", ex);
                            });
                        }
                        else if (args.getTag() === _this.offerTag) {
                            fm.icelink.Log.info("Received offer from remote peer.");
                            if (connection == null) {
                                connection = _this.createConnectionAndWireOnLocalCandidate(new fm.icelink.websync4.PeerClient(args.getPublishingClient().getClientId(), args.getPublishingClient().getBoundRecords()), remoteUserId);
                                connection.setExternalId(remoteClientId);
                                _this.Connections.add(connection);
                            }
                            connection.setRemoteDescription(fm.icelink.SessionDescription.fromJson(args.getDataJson()))
                                .then(function (offer) {
                                return connection.createAnswer();
                            })
                                .then(function (answer) {
                                return connection.setLocalDescription(answer);
                            })
                                .then(function (answer) {
                                _this.client.publish({
                                    channel: "/user/" + remoteUserId,
                                    dataJson: answer.toJson(),
                                    tag: _this.answerTag,
                                    onSuccess: function (args) {
                                        fm.icelink.Log.info("Published answer to remote peer.");
                                        promise.resolve(null);
                                    },
                                    onFailure: function (args) {
                                        fm.icelink.Log.error("Could not publish answer to remote peer.", args.getException());
                                        promise.reject(args.getException());
                                    }
                                });
                            })
                                .fail(function (ex) {
                                fm.icelink.Log.error("Could not process offer from remote peer.", ex);
                            });
                        }
                        else if (args.getTag() === _this.answerTag) {
                            if (connection != null) {
                                fm.icelink.Log.info("Received answer from remote peer.");
                                connection.setRemoteDescription(fm.icelink.SessionDescription.fromJson(args.getDataJson()))
                                    .fail(function (ex) {
                                    fm.icelink.Log.error("Could not process answer from remote peer.", ex);
                                });
                            }
                            else {
                                fm.icelink.Log.error("Received answer, but connection does not exist!");
                            }
                        }
                    }
                });
                return promise;
            };
            /**
             * Handles subscribing to the session channel and connecting to subscribed clients.
             *
             * See the Subscribing to the Session Channel and Connecting to Subscribed Clients sections
             * of the Advanced Topics Manual Signalling Guide for more info.
             */
            ManualSignalling.prototype.subscribeToSessionChannel = function () {
                var _this = this;
                var promise = new fm.icelink.Promise();
                var subscribeArgs = new fm.websync.subscribeArgs([this.sessionChannel]);
                subscribeArgs.setOnSuccess(function () {
                    promise.resolve(null);
                });
                subscribeArgs.setOnFailure(function (args) {
                    promise.reject(args.getException());
                });
                fm.websync.subscribers.subscribeArgsExtensions.setOnClientSubscribe(subscribeArgs, function (args) {
                    var remoteClientId = args.getClient().getClientId()._guid;
                    var remoteUserId = fm.icelink.Serializer.deserializeString(args.getSubscribedClient().getBoundRecords()[_this.userIdKey].getValueJson());
                    var connection = _this.createConnectionAndWireOnLocalCandidate(new fm.icelink.websync4.PeerClient(args.getSubscribedClient().getClientId(), args.getSubscribedClient().getBoundRecords()), remoteUserId);
                    connection.setExternalId(remoteClientId);
                    _this.Connections.add(connection);
                    connection.createOffer()
                        .then(function (offer) {
                        return connection.setLocalDescription(offer);
                    })
                        .then(function (offer) {
                        _this.client.publish({
                            channel: "/user/" + remoteUserId,
                            dataJson: offer.toJson(),
                            tag: _this.offerTag,
                            onSuccess: function (args) {
                                fm.icelink.Log.info("Published offer to remote peer.");
                            },
                            onFailure: function (args) {
                                fm.icelink.Log.error("Could not publish offer to remote peer.", args.getException());
                            }
                        });
                    });
                });
                fm.websync.subscribers.subscribeArgsExtensions.setOnClientUnsubscribe(subscribeArgs, function (args) {
                    var remoteClientId = args.getClient().getClientId()._guid;
                    var connection = _this.Connections.getById(remoteClientId);
                    if (connection != null) {
                        _this.Connections.remove(connection);
                        connection.close();
                    }
                });
                this.client.subscribe(subscribeArgs);
                return promise;
            };
            ManualSignalling.prototype.createConnectionAndWireOnLocalCandidate = function (remoteClient, remoteUserId) {
                var _this = this;
                var connection = this.createConnection(remoteClient);
                connection.addOnLocalCandidate(function (conn, candidate) {
                    _this.client.publish({
                        channel: "/user/" + remoteUserId,
                        dataJson: candidate.toJson(),
                        tag: _this.candidateTag,
                        onSuccess: function (args) {
                            fm.icelink.Log.info("Published candidate to remote peer.");
                        },
                        onFailure: function (args) {
                            fm.icelink.Log.error("Could not publish candidate to remote peer.", args.getException());
                        }
                    });
                });
                return connection;
            };
            ManualSignalling.prototype.reconnect = function (remoteClient, connection) {
                //TODO
            };
            return ManualSignalling;
        }(Signalling));
        websync.ManualSignalling = ManualSignalling;
        var AutoSignalling = /** @class */ (function (_super) {
            __extends(AutoSignalling, _super);
            function AutoSignalling(serverUrl, name, sessionId, createConnection, onReceivedText) {
                return _super.call(this, serverUrl, name, sessionId, createConnection, onReceivedText) || this;
            }
            AutoSignalling.prototype.defineChannels = function () {
                this.sessionChannel = "/" + this.sessionId;
                this.metadataChannel = this.sessionChannel + "/metadata";
            };
            AutoSignalling.prototype.doJoinAsync = function (promise) {
                var _this = this;
                this.bindUserMetadata(this.userIdKey, this.userId)
                    .then(function () {
                    return _this.bindUserMetadata(_this.userNameKey, _this.userName);
                })
                    .then(function () {
                    return _this.subscribeToSessionChannel();
                })
                    .then(function () {
                    if (promise.getState() === fm.icelink.FutureState.Pending) {
                        promise.resolve(null);
                    }
                })
                    .fail(function (ex) {
                    if (promise.getState() === fm.icelink.FutureState.Pending) {
                        promise.reject(ex);
                    }
                });
            };
            AutoSignalling.prototype.subscribeToSessionChannel = function () {
                var _this = this;
                var promise = new fm.icelink.Promise();
                try {
                    var joinArgs = new fm.icelink.websync4.JoinConferenceArgs(this.sessionChannel);
                    joinArgs.setOnSuccess(function (args) {
                        promise.resolve(null);
                    });
                    joinArgs.setOnFailure(function (args) {
                        promise.reject(args.getException());
                    });
                    joinArgs.setOnRemoteClient(function (remoteClient) {
                        var connection = _this.createConnection(remoteClient);
                        _this.Connections.add(connection);
                        return connection;
                    });
                    fm.icelink.websync4.ClientExtensions.joinConference(this.client, joinArgs);
                }
                catch (error) {
                    promise.reject(error);
                }
                return promise;
            };
            AutoSignalling.prototype.reconnect = function (remoteClient, connection) {
                fm.icelink.websync4.ClientExtensions.reconnectRemoteClient(this.client, remoteClient, connection);
            };
            return AutoSignalling;
        }(Signalling));
        websync.AutoSignalling = AutoSignalling;
    })(websync = chat.websync || (chat.websync = {}));
})(chat || (chat = {}));
