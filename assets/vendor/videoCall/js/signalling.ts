/// <reference path="../lib/fm.websync.subscribers.d.ts" />

namespace chat.websync {
    export abstract class Signalling {

        protected sessionId: string = null;
        protected serverUrl: string = null;
        protected userName: string = null;
        protected userId: string = null;
        protected sessionChannel: string = null;
        protected metadataChannel: string = null;
        protected userIdKey: string = null;
        protected userNameKey: string = null;
        protected textMessageKey: string = null;
        protected createConnection: any = null;
        protected onReceivedText: any = null;
        protected client: any = null;
        protected Connections: fm.icelink.ConnectionCollection = null;

        public constructor(serverUrl: string, name: string, sessionId: string, createConnection: any, onReceivedText: any) {
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
        
        protected abstract defineChannels(): void

        private closeAllConnections(): void {
            var conns = this.Connections.getValues();
            conns.forEach((connection: fm.icelink.Connection) => {
                connection.close();
            });
            this.Connections.removeAll();
        }

        protected bindUserMetadata(k: string, v: string): fm.icelink.Future<Object> {
            var promise = new fm.icelink.Promise();

            this.client.bind({
                record: {
                    key: k,
                    value: v
                },
                onFailure: (ex: any) => {
                    promise.reject(ex);
                },
                onSuccess: () => {
                    promise.resolve(null);
                }
            });
            return promise;
        }

        protected unbindUserMetadata(k: string, v: string): fm.icelink.Future<Object> {
            var promise = new fm.icelink.Promise();

            this.client.unbind({
                record: {
                    key: k,
                    value: v
                },
                onFailure: (args: any) => {
                    promise.reject(args.getException());
                },
                onSuccess: (args: any) => {
                    promise.resolve(null);
                }
            });
            return promise;
        }

        protected unsubscribeFromChannel(c: string): fm.icelink.Future<Object> {
            var promise = new fm.icelink.Promise();

            try {
                // Leave the signalling channel.
                var leaveArgs = new fm.icelink.websync4.LeaveConferenceArgs(c);
                leaveArgs.setOnSuccess((args: any) => {
                    promise.resolve(null);
                });
                leaveArgs.setOnFailure((args: any) => {
                    promise.reject(args.getException());
                });
                fm.icelink.websync4.ClientExtensions.leaveConference(this.client, leaveArgs);
            }
            catch (error) {
                promise.reject(error);
            }
            return promise;
        }

        public joinAsync(): fm.icelink.Future<Object> {
            var promise = new fm.icelink.Promise();

            try {
                this.Connections = new fm.icelink.ConnectionCollection();
                // Create the signalling client and connect.
                this.client = new fm.websync.client(this.serverUrl);
                this.client.setAutoDisconnect({
                    synchronous: true
                });
                this.client.connect({
                    onSuccess: (args: any) => {
                        this.subscribeToMetadataChannel().then(() => {
                            this.doJoinAsync(promise);
                        });
                    },
                    onFailure: (args: any) => {
                        if (promise.getState() === fm.icelink.FutureState.Pending) {
                            promise.reject(args.getException());
                        }
                    },
                    onStreamFailure: (streamFailureArgs: any) => {
                        this.closeAllConnections();
                    },
                    /*
                        Used to override the client's default backoff.
                        By default the backoff doubles after each failure.
                        For example purposes that gets too long.
                        Add a comment to this line
                     */
                    retryBackoff: (retryBackoffArgs: any) => {
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
        }

        public leaveAsync(): fm.icelink.Future<Object> {
            var promise = new fm.icelink.Promise();

            this.closeAllConnections();

            try {
                this.client.disconnect({
                    onComplete: (args: any) => {
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
        }

        protected subscribeToMetadataChannel(): fm.icelink.Future<Object> {
            var promise = new fm.icelink.Promise();

            try {
                this.client.subscribe({
                    channel: this.metadataChannel,
                    onSuccess: () => {
                        promise.resolve(null);
                    },
                    onFailure: (args: any) => {
                        promise.reject(args.getException());
                    },
                    onReceive: (args: any) => {
                        if (!args.getWasSentByMe()) {
                            var jsonData = args.getData();
                            this.onReceivedText(jsonData.userName, jsonData.textMsg);
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
        }

        public writeLine(message: string): void {
            var json = {
                userName: this.userName,
                textMsg: message
            };

            this.client.publish(new fm.websync.PublishArgs(this.metadataChannel, JSON.stringify(json)));
        }

        protected abstract doJoinAsync(promise: fm.icelink.Promise<Object>): void
        public abstract reconnect(remoteClient: any, connection: any): void
    }

    export class ManualSignalling extends Signalling {

        private offerTag: string = "offer";
        private answerTag: string = "answer";
        private candidateTag: string = "candidate";
        private userChannel: string;

        public constructor(serverUrl: string, name: string, sessionId: string, createConnection: any, onReceivedText: any) {
            super(serverUrl, name, sessionId, createConnection, onReceivedText);
        }

        protected defineChannels(): void {
            this.userChannel = "/user/" + this.userId;
            this.sessionChannel = "/manual-signalling/" + this.sessionId;
            this.metadataChannel = this.sessionChannel + "/metadata";
        }

        public doJoinAsync(promise: fm.icelink.Promise<Object>): void {

            this.bindUserMetadata(this.userIdKey, this.userId)
                .then(() => {
                    return this.bindUserMetadata(this.userNameKey, this.userName);
                })
                .then(() => {
                    return this.subscribeToUserChannel();
                })
                .then(() => {
                    return this.subscribeToSessionChannel();
                })
                .then(() => {
                    if (promise.getState() === fm.icelink.FutureState.Pending) {
                        promise.resolve(null);
                    }
                })
                .fail((ex: any) => {
                    if (promise.getState() === fm.icelink.FutureState.Pending) {
                        promise.reject(ex);
                    }
                });
        }

        private subscribeToUserChannel(): fm.icelink.Future<Object> {
            var promise = new fm.icelink.Promise();

            this.client.subscribe({
                channel: this.userChannel,
                onSuccess: () => {
                    promise.resolve(null);
                },
                onFailure: (args: any) => {
                    promise.reject(args.getException());
                },
                onReceive: (args: any) => {
                    var remoteClientId = args.getClient().getClientId()._guid;
                    var remoteUserId = fm.icelink.Serializer.deserializeString(args.getPublishingClient().getBoundRecords()[this.userIdKey].getValueJson());

                    var connection = this.Connections.getByExternalId(remoteClientId);

                    if (args.getTag() === this.candidateTag) {
                        if (connection == null) {
                            connection = this.createConnectionAndWireOnLocalCandidate(new fm.icelink.websync4.PeerClient(args.getPublishingClient().getClientId(), args.getPublishingClient().getBoundRecords()), remoteUserId);
                            connection.setExternalId(remoteClientId);
                            this.Connections.add(connection);
                        }

                        fm.icelink.Log.info("Received candidate from remote peer.");

                        connection.addRemoteCandidate(fm.icelink.Candidate.fromJson(args.getDataJson()))
                            .fail((ex: any) => {
                                fm.icelink.Log.error("Could not process candidate from remote peer.", ex);
                            });
                    }
                    else if (args.getTag() === this.offerTag) {

                        fm.icelink.Log.info("Received offer from remote peer.");

                        if (connection == null) {
                            connection = this.createConnectionAndWireOnLocalCandidate(new fm.icelink.websync4.PeerClient(args.getPublishingClient().getClientId(), args.getPublishingClient().getBoundRecords()), remoteUserId);
                            connection.setExternalId(remoteClientId);
                            this.Connections.add(connection);
                        }

                        connection.setRemoteDescription(fm.icelink.SessionDescription.fromJson(args.getDataJson()))
                            .then((offer: fm.icelink.SessionDescription) => {
                                return connection.createAnswer();
                            })
                            .then((answer: fm.icelink.SessionDescription) => {
                                return connection.setLocalDescription(answer);
                            })
                            .then((answer: fm.icelink.SessionDescription) => {
                                this.client.publish({
                                    channel: "/user/" + remoteUserId,
                                    dataJson: answer.toJson(),
                                    tag: this.answerTag,
                                    onSuccess: (args: any) => {
                                        fm.icelink.Log.info("Published answer to remote peer.");
                                        promise.resolve(null);
                                    },
                                    onFailure: (args: any) => {
                                        fm.icelink.Log.error("Could not publish answer to remote peer.", args.getException());
                                        promise.reject(args.getException());
                                    }
                                });
                            })
                            .fail((ex: any) => {
                                fm.icelink.Log.error("Could not process offer from remote peer.", ex);
                            });
                    }
                    else if (args.getTag() === this.answerTag) {
                        if (connection != null) {
                            fm.icelink.Log.info("Received answer from remote peer.");

                            connection.setRemoteDescription(fm.icelink.SessionDescription.fromJson(args.getDataJson()))
                                .fail((ex: any) => {
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
        }

        /**
         * Handles subscribing to the session channel and connecting to subscribed clients.
         *
         * See the Subscribing to the Session Channel and Connecting to Subscribed Clients sections
         * of the Advanced Topics Manual Signalling Guide for more info.
         */
        private subscribeToSessionChannel(): fm.icelink.Future<Object> {
            var promise = new fm.icelink.Promise();

            var subscribeArgs = new fm.websync.subscribeArgs([this.sessionChannel]);

            subscribeArgs.setOnSuccess(() => {
                promise.resolve(null);
            });
            subscribeArgs.setOnFailure((args: any) => {
                promise.reject(args.getException());
            });

            fm.websync.subscribers.subscribeArgsExtensions.setOnClientSubscribe(subscribeArgs, (args: any) => {
                var remoteClientId = args.getClient().getClientId()._guid;
                var remoteUserId = fm.icelink.Serializer.deserializeString(args.getSubscribedClient().getBoundRecords()[this.userIdKey].getValueJson());
                var connection = this.createConnectionAndWireOnLocalCandidate(new fm.icelink.websync4.PeerClient(args.getSubscribedClient().getClientId(), args.getSubscribedClient().getBoundRecords()), remoteUserId);
                connection.setExternalId(remoteClientId);
                this.Connections.add(connection);

                connection.createOffer()
                    .then((offer: fm.icelink.SessionDescription) => {
                        return connection.setLocalDescription(offer);
                    })
                    .then((offer: fm.icelink.SessionDescription) => {
                        this.client.publish({
                            channel: "/user/" + remoteUserId,
                            dataJson: offer.toJson(),
                            tag: this.offerTag,
                            onSuccess: (args: fm.websync.PublishSuccessArgs) => {
                                fm.icelink.Log.info("Published offer to remote peer.");
                            },
                            onFailure: (args: fm.websync.PublishFailureArgs) => {
                                fm.icelink.Log.error("Could not publish offer to remote peer.", args.getException());
                            }
                        });
                    });
            });

            fm.websync.subscribers.subscribeArgsExtensions.setOnClientUnsubscribe(subscribeArgs, (args: any) => {
                var remoteClientId = args.getClient().getClientId()._guid;

                var connection = this.Connections.getById(remoteClientId);
                if (connection != null) {
                    this.Connections.remove(connection);
                    connection.close();
                }
            });

            this.client.subscribe(subscribeArgs);

            return promise;
        }

        private createConnectionAndWireOnLocalCandidate(remoteClient: any, remoteUserId: string): fm.icelink.Connection {
            let connection = this.createConnection(remoteClient);

            connection.addOnLocalCandidate((conn: fm.icelink.Connection, candidate: fm.icelink.Candidate) => {
                this.client.publish({
                    channel: "/user/" + remoteUserId,
                    dataJson: candidate.toJson(),
                    tag: this.candidateTag,
                    onSuccess: (args: fm.websync.PublishSuccessArgs) => {
                        fm.icelink.Log.info("Published candidate to remote peer.");
                    },
                    onFailure: (args: fm.websync.PublishFailureArgs) => {
                        fm.icelink.Log.error("Could not publish candidate to remote peer.", args.getException());
                    }
                });
            });

            return connection;
        }

        public reconnect(remoteClient: any, connection: any): void {
            //TODO
        }
    }

    export class AutoSignalling extends Signalling {

        public constructor(serverUrl: string, name: string, sessionId: string, createConnection: any, onReceivedText: any) {
            super(serverUrl, name, sessionId, createConnection, onReceivedText);
        }

        protected defineChannels(): void {
            this.sessionChannel = "/" + this.sessionId;
            this.metadataChannel = this.sessionChannel + "/metadata";
        }

        public doJoinAsync(promise: fm.icelink.Promise<Object>): void {

            this.bindUserMetadata(this.userIdKey, this.userId)
                .then(() => {
                    return this.bindUserMetadata(this.userNameKey, this.userName);
                })
                .then(() => {
                    return this.subscribeToSessionChannel();
                })
                .then(() => {
                    if (promise.getState() === fm.icelink.FutureState.Pending) {
                        promise.resolve(null);
                    }
                })
                .fail((ex: any) => {
                    if (promise.getState() === fm.icelink.FutureState.Pending) {
                        promise.reject(ex);
                    }
                });
        }

        private subscribeToSessionChannel(): fm.icelink.Future<Object> {
            var promise = new fm.icelink.Promise();

            try {
                var joinArgs = new fm.icelink.websync4.JoinConferenceArgs(this.sessionChannel);
                joinArgs.setOnSuccess((args) => {
                    promise.resolve(null);
                });
                joinArgs.setOnFailure((args) => {
                    promise.reject(args.getException());
                });
                joinArgs.setOnRemoteClient((remoteClient) => {
                    var connection = this.createConnection(remoteClient);
                    this.Connections.add(connection);
                    return connection;
                });
                fm.icelink.websync4.ClientExtensions.joinConference(this.client, joinArgs);
            }
            catch (error) {
                promise.reject(error);
            }

            return promise;
        }

        public reconnect(remoteClient: any, connection: any): void {
            fm.icelink.websync4.ClientExtensions.reconnectRemoteClient(this.client, remoteClient, connection);
        }
    }
}
