//
// Title: IceLink for JavaScript
// Version: 3.8.1.24993
// Copyright Frozen Mountain Software 2011+
//
declare namespace fm {
    interface singleAction<T> {
    }
    class serializable {
        getTypeString(): string;
        constructor(...params: any[]);
    }
    class dynamic extends serializable {
        getTypeString(): string;
        constructor(...params: any[]);
        getDynamicProperties(): any;
        setDynamicProperties(value: any): void;
        getDynamicValue(key: string): any;
        setDynamicValue(key: string, value: any): void;
        unsetDynamicValue(key: string): boolean;
    }
}
declare namespace fm {
    interface SingleAction<T> extends singleAction<T> {
    }
    class Serializable extends serializable {
    }
    class Dynamic extends dynamic {
    }
}
declare namespace fm.websync {
    class extensible extends dynamic {
        getTypeString(): string;
        constructor(...params: any[]);
        getExtensions(): any;
        setExtensions(value: any): void;
        getExtensionCount(): number;
        getExtensionNames(): string[];
        copyExtensions(extensible: extensible): void;
        setExtensionValueJson(name: string, valueJson: string): void;
        setExtensionValueJson(name: string, valueJson: string, validate: boolean): void;
        getExtensionValueJson(name: string): string;
        getMetaJson(): any;
        setMetaJson(value: any): void;
    }
    class client extends dynamic {
        getTypeString(): string;
        constructor(...params: any[]);
        getInstanceId(): any;
        getClientId(): any;
        publish(...params: any[]): any;
        joinConference(...params: any[]): any;
        leaveConference(...params: any[]): any;
        renegotiate(...params: any[]): any;
        reconnectRemoteClient(...params: any[]): any;
        addOnStreamFailure(...params: any[]): any;
    }
    enum connectionType {
    }
    class record {
        getTypeString(): string;
        constructor(...params: any[]);
    }
    class publishingClient extends serializable {
        getBoundRecords(): any;
    }
    class baseInputArgs extends extensible {
        getTypeString(): string;
        constructor(...params: any[]);
        getRequestUrl(): any;
        setRequestUrl(value: any): void;
        getRequestTimeout(): any;
        setRequestTimeout(value: any): void;
        getIsRetry(): any;
        setIsRetry(value: any): void;
        getSynchronous(): any;
        setSynchronous(value: any): void;
    }
    class baseOutputArgs extends extensible {
        getTypeString(): string;
        constructor(...params: any[]);
        getTimestamp(): any;
        setTimestamp(value: any): void;
        getClient(): any;
        setClient(value: any): void;
    }
    class baseSuccessArgs extends baseOutputArgs {
        getTypeString(): string;
        constructor(...params: any[]);
    }
    class baseFailureArgs extends baseOutputArgs {
        getTypeString(): string;
        constructor(...params: any[]);
        getException(): any;
        setException(value: any): void;
        getErrorCode(): any;
        getErrorMessage(): any;
        getRetry(): any;
        setRetry(value: any): void;
    }
    class baseReceiveArgs extends baseSuccessArgs {
        getTypeString(): string;
        constructor(...params: any[]);
        getDataJson(): any;
        getDataBytes(): any;
        getIsBinary(): any;
        getTag(): any;
        getConnectionType(): any;
        getReconnectAfter(): any;
        setReconnectAfter(value: any): void;
    }
    class streamFailureArgs extends baseFailureArgs {
    }
    class subscribeArgs extends baseInputArgs {
        getTypeString(): string;
        constructor(...params: any[]);
        setChannel(channel: string): void;
        getOnSuccess(): any;
        setOnSuccess(value: any): void;
        getOnFailure(): any;
        setOnFailure(value: any): void;
        getOnReceive(): any;
        setOnReceive(value: any): void;
    }
    class subscribeSuccessArgs extends baseSuccessArgs {
        getTypeString(): string;
        constructor(...params: any[]);
    }
    class subscribeFailureArgs extends baseFailureArgs {
        getTypeString(): string;
        constructor(...params: any[]);
    }
    class subscribeReceiveArgs extends baseReceiveArgs {
        getTypeString(): string;
        constructor(...params: any[]);
        getChannel(): any;
        getWasSentByMe(): any;
        getPublishingClient(): any;
    }
    class publishArgs extends baseInputArgs {
        getTypeString(): string;
        constructor(...params: any[]);
        setChannel(channel: string): void;
        getOnSuccess(): any;
        setOnSuccess(value: any): void;
        getOnFailure(): any;
        setOnFailure(value: any): void;
    }
    class publishSuccessArgs extends baseSuccessArgs {
        getTypeString(): string;
        constructor(...params: any[]);
    }
    class publishFailureArgs extends baseFailureArgs {
        getTypeString(): string;
        constructor(...params: any[]);
    }
    class serviceArgs extends baseInputArgs {
        getTypeString(): string;
        constructor(...params: any[]);
        setChannel(channel: string): void;
        getOnSuccess(): any;
        setOnSuccess(value: any): void;
        getOnFailure(): any;
        setOnFailure(value: any): void;
    }
    class serviceSuccessArgs extends baseSuccessArgs {
        getTypeString(): string;
        constructor(...params: any[]);
    }
    class serviceFailureArgs extends baseFailureArgs {
        getTypeString(): string;
        constructor(...params: any[]);
    }
    class disconnectArgs extends baseInputArgs {
        constructor(...params: any[]);
        setOnComplete(value: any): void;
    }
}
declare namespace fm.websync {
    class Extensible extends extensible {
    }
    class Client extends client {
    }
    enum ConnectionType {
    }
    class Record extends record {
    }
    class PublishingClient extends publishingClient {
    }
    class BaseInputArgs extends baseInputArgs {
    }
    class BaseOutputArgs extends baseOutputArgs {
    }
    class BaseSuccessArgs extends baseSuccessArgs {
    }
    class BaseFailureArgs extends baseFailureArgs {
    }
    class BaseReceiveArgs extends baseReceiveArgs {
    }
    class StreamFailureArgs extends streamFailureArgs {
    }
    class SubscribeArgs extends subscribeArgs {
    }
    class SubscribeSuccessArgs extends subscribeSuccessArgs {
    }
    class SubscribeFailureArgs extends subscribeFailureArgs {
    }
    class SubscribeReceiveArgs extends subscribeReceiveArgs {
    }
    class PublishArgs extends publishArgs {
    }
    class PublishSuccessArgs extends publishSuccessArgs {
    }
    class PublishFailureArgs extends publishFailureArgs {
    }
    class ServiceArgs extends serviceArgs {
    }
    class ServiceSuccessArgs extends serviceSuccessArgs {
    }
    class ServiceFailureArgs extends serviceFailureArgs {
    }
    class DisconnectArgs extends disconnectArgs {
    }
}
declare namespace fm.websync.chat {
    class clientExtensions {
        getTypeString(): string;
        constructor(...params: any[]);
        static join(...params: any[]): any;
        static leave(...params: any[]): any;
    }
    class chatUser {
        getTypeString(): string;
        constructor(...params: any[]);
        getUserId(): any;
        getUserNickname(): any;
    }
    class joinArgs extends baseInputArgs {
        getTypeString(): string;
        constructor(...params: any[]);
        getUserId(): any;
        setUserId(value: any): void;
        getUserNickname(): any;
        setUserNickname(value: any): void;
        getOnSuccess(): any;
        setOnSuccess(value: any): void;
        getOnFailure(): any;
        setOnFailure(value: any): void;
        getOnReceive(): any;
        setOnReceive(value: any): void;
        getOnUserJoin(): any;
        setOnUserJoin(value: any): void;
        getOnUserLeave(): any;
        setOnUserLeave(value: any): void;
    }
    class joinFailureArgs extends baseFailureArgs {
        getTypeString(): string;
        constructor(...params: any[]);
    }
    class joinSuccessArgs extends baseSuccessArgs {
        getTypeString(): string;
        constructor(...params: any[]);
        getUsers(): any;
    }
    class joinReceiveArgs extends subscribeReceiveArgs {
        getTypeString(): string;
        constructor(...params: any[]);
        getUserId(): any;
        getUserNickname(): any;
        getPublishingUser(): any;
    }
    class userJoinArgs extends baseSuccessArgs {
        getTypeString(): string;
        constructor(...params: any[]);
        getJoinedUser(): any;
    }
    class userLeaveArgs extends baseSuccessArgs {
        getTypeString(): string;
        constructor(...params: any[]);
        getLeftUser(): any;
    }
    class leaveArgs extends baseInputArgs {
        getTypeString(): string;
        constructor(...params: any[]);
        getOnSuccess(): any;
        setOnSuccess(value: any): void;
        getOnFailure(): any;
        setOnFailure(value: any): void;
    }
    class leaveFailureArgs extends baseFailureArgs {
        getTypeString(): string;
        constructor(...params: any[]);
    }
    class leaveSuccessArgs extends baseSuccessArgs {
        getTypeString(): string;
        constructor(...params: any[]);
    }
}
declare namespace fm.websync.chat {
    class ClientExtensions extends clientExtensions {
    }
    class ChatUser extends chatUser {
    }
    class JoinArgs extends joinArgs {
    }
    class JoinFailureArgs extends joinFailureArgs {
    }
    class JoinSuccessArgs extends joinSuccessArgs {
    }
    class JoinReceiveArgs extends joinReceiveArgs {
    }
    class UserJoinArgs extends userJoinArgs {
    }
    class UserLeaveArgs extends userLeaveArgs {
    }
    class LeaveArgs extends leaveArgs {
    }
    class LeaveFailureArgs extends leaveFailureArgs {
    }
    class LeaveSuccessArgs extends leaveSuccessArgs {
    }
}
declare namespace fm.icelink.websync4 {
    /** @hidden */
    class PendingRenegotiationProperties {
        getTypeString(): string;
        /** @hidden */
        private _channel;
        /** @hidden */
        private _client;
        /** @hidden */
        private _pendingPromise;
        constructor(pendingPromise: fm.icelink.Promise<fm.icelink.SessionDescription>, client: fm.websync.Client, channel: string);
        getChannel(): string;
        getClient(): fm.websync.Client;
        getPendingPromise(): fm.icelink.Promise<fm.icelink.SessionDescription>;
        /** @hidden */
        private setChannel;
        /** @hidden */
        private setClient;
        /** @hidden */
        private setPendingPromise;
    }
}
declare namespace fm.icelink.websync4 {
    /** @hidden */
    class State {
        getTypeString(): string;
        /** @hidden */
        private _connections;
        /** @hidden */
        private _unlinkAllOnLeaveSuccess;
        /** @hidden */
        private _unlinkExistingOnUserJoin;
        /** @hidden */
        private _unlinkOnUserLeave;
        private fmicelinkwebsync4StateInit;
        constructor();
        getConnections(): fm.icelink.websync4.ConnectionCollection;
        getUnlinkAllOnLeaveSuccess(): boolean;
        getUnlinkExistingOnUserJoin(): boolean;
        getUnlinkOnUserLeave(): boolean;
        setConnections(value: fm.icelink.websync4.ConnectionCollection): void;
        setUnlinkAllOnLeaveSuccess(value: boolean): void;
        setUnlinkExistingOnUserJoin(value: boolean): void;
        setUnlinkOnUserLeave(value: boolean): void;
    }
}
declare namespace fm.icelink.websync4 {
    /**
    Arguments for a client joining an IceLink conference.
    */
    class JoinConferenceArgs extends fm.websync.BaseInputArgs {
        getTypeString(): string;
        /** @hidden */
        private _conferenceChannel;
        /** @hidden */
        private _joinSuccessTimestamp;
        /** @hidden */
        private _joinTimestamp;
        /** @hidden */
        private _onFailure;
        /** @hidden */
        private _onReceive;
        /** @hidden */
        private _onRemoteClient;
        /** @hidden */
        private _onSuccess;
        /** @hidden */
        private _unlinkExistingOnUserJoin;
        /** @hidden */
        private _unlinkOnUserLeave;
        private fmicelinkwebsync4JoinConferenceArgsInit;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.websync4.joinConferenceArgs]] class.
        @param conferenceChannel The conference channel.
        */
        constructor(conferenceChannel: string);
        /**
        Gets the conference channel.
        */
        getConferenceChannel(): string;
        /** @hidden */
        getJoinSuccessTimestamp(): number;
        /** @hidden */
        getJoinTimestamp(): number;
        /**
        Gets the callback to invoke if the request fails. See [[fm.icelink.websync4.joinConferenceFailureArgs]] for callback argument details.
        */
        getOnFailure(): fm.icelink.IAction1<fm.icelink.websync4.JoinConferenceFailureArgs>;
        /**
        Gets the callback to invoke when data is received on the channel. See [[fm.icelink.websync4.joinConferenceReceiveArgs]] for callback argument details.
        */
        getOnReceive(): fm.icelink.IAction1<fm.icelink.websync4.JoinConferenceReceiveArgs>;
        /**
        Gets the callback to invoke when a new remote client needs a connection.
        */
        getOnRemoteClient(): fm.icelink.IFunction1<fm.icelink.websync4.PeerClient, fm.icelink.Connection>;
        /**
        Gets the callback to invoke if the request succeeds. See [[fm.icelink.websync4.joinConferenceSuccessArgs]] for callback argument details.
        */
        getOnSuccess(): fm.icelink.IAction1<fm.icelink.websync4.JoinConferenceSuccessArgs>;
        /**
        Gets a value indicating whether this endpoint should drop existing links in favour of new ones when remote peers join the channel. Defaults to `true`.
        */
        getUnlinkExistingOnUserJoin(): boolean;
        /**
        Gets a value indicating whether this endpoint should initiate an unlink when remote peers leave the channel. Defaults to `true`.
        */
        getUnlinkOnUserLeave(): boolean;
        /**
        Sets the conference channel.
        */
        setConferenceChannel(value: string): void;
        /** @hidden */
        setJoinSuccessTimestamp(value: number): void;
        /** @hidden */
        setJoinTimestamp(value: number): void;
        /**
        Sets the callback to invoke if the request fails. See [[fm.icelink.websync4.joinConferenceFailureArgs]] for callback argument details.
        */
        setOnFailure(value: fm.icelink.IAction1<fm.icelink.websync4.JoinConferenceFailureArgs>): void;
        /**
        Sets the callback to invoke when data is received on the channel. See [[fm.icelink.websync4.joinConferenceReceiveArgs]] for callback argument details.
        */
        setOnReceive(value: fm.icelink.IAction1<fm.icelink.websync4.JoinConferenceReceiveArgs>): void;
        /**
        Sets the callback to invoke when a new remote client needs a connection.
        */
        setOnRemoteClient(value: fm.icelink.IFunction1<fm.icelink.websync4.PeerClient, fm.icelink.Connection>): void;
        /**
        Sets the callback to invoke if the request succeeds. See [[fm.icelink.websync4.joinConferenceSuccessArgs]] for callback argument details.
        */
        setOnSuccess(value: fm.icelink.IAction1<fm.icelink.websync4.JoinConferenceSuccessArgs>): void;
        /**
        Sets a value indicating whether this endpoint should drop existing links in favour of new ones when remote peers join the channel. Defaults to `true`.
        */
        setUnlinkExistingOnUserJoin(value: boolean): void;
        /**
        Sets a value indicating whether this endpoint should initiate an unlink when remote peers leave the channel. Defaults to `true`.
        */
        setUnlinkOnUserLeave(value: boolean): void;
    }
}
declare namespace fm.icelink.websync4 {
    /**
    Arguments for join-conference failure callbacks.
    */
    class JoinConferenceFailureArgs extends fm.websync.BaseFailureArgs {
        getTypeString(): string;
        /** @hidden */
        __conferenceChannel: string;
        constructor();
        /**
        Gets the ID of the conference that failed to be joined.
        */
        getConferenceChannel(): string;
    }
}
declare namespace fm.icelink.websync4 {
    /**
    Arguments for join-conference receive callbacks.
    */
    class JoinConferenceReceiveArgs extends fm.websync.SubscribeReceiveArgs {
        getTypeString(): string;
        /** @hidden */
        __publishingPeer: fm.icelink.websync4.PeerClient;
        /**
        Initializes a new instance of the [[fm.icelink.websync4.joinConferenceReceiveArgs]] class.
        @param channel The channel over which data was received.
        @param dataJson The data in JSON format.
        @param dataBytes The data in binary format.
        @param connectionType The current connection type.
        @param reconnectAfter The amount of time in milliseconds to pause before reconnecting to the server.
        */
        constructor(channel: string, dataJson: string, dataBytes: Uint8Array, connectionType: fm.websync.ConnectionType, reconnectAfter: number);
        /**
        Gets the user that published the message.
        */
        getPublishingPeer(): fm.icelink.websync4.PeerClient;
    }
}
declare namespace fm.icelink.websync4 {
    /**
    Arguments for join-conference success callbacks.
    */
    class JoinConferenceSuccessArgs extends fm.websync.BaseSuccessArgs {
        getTypeString(): string;
        /** @hidden */
        __conferenceChannel: string;
        /** @hidden */
        __users: fm.websync.chat.ChatUser[];
        constructor();
        /**
        Gets the ID of the conference that was joined.
        */
        getConferenceChannel(): string;
        /**
        Gets the array of users in the channel.
        */
        getUsers(): fm.websync.chat.ChatUser[];
    }
}
declare namespace fm.icelink.websync4 {
    /**
    Arguments for a client leaving an IceLink conference.
    */
    class LeaveConferenceArgs extends fm.websync.BaseInputArgs {
        getTypeString(): string;
        /** @hidden */
        private _conferenceChannel;
        /** @hidden */
        private _leaveSuccessTimestamp;
        /** @hidden */
        private _leaveTimestamp;
        /** @hidden */
        private _onFailure;
        /** @hidden */
        private _onSuccess;
        /** @hidden */
        private _unlinkAllOnSuccess;
        private fmicelinkwebsync4LeaveConferenceArgsInit;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.websync4.leaveConferenceArgs]] class.
        @param conferenceChannel The conference ID.
        */
        constructor(conferenceChannel: string);
        /**
        Gets the conference channel.
        */
        getConferenceChannel(): string;
        /** @hidden */
        getLeaveSuccessTimestamp(): number;
        /** @hidden */
        getLeaveTimestamp(): number;
        /**
        Gets the callback to invoke if the request fails.
        */
        getOnFailure(): fm.icelink.IAction1<fm.icelink.websync4.LeaveConferenceFailureArgs>;
        /**
        Gets the callback to invoke if the request succeeds.
        */
        getOnSuccess(): fm.icelink.IAction1<fm.icelink.websync4.LeaveConferenceSuccessArgs>;
        /**
        Gets a value indicating whether this endpoint should initiate an unlink from everyone after leaving the channel successfully. Defaults to `true`.
        */
        getUnlinkAllOnSuccess(): boolean;
        /**
        Sets the conference channel.
        */
        setConferenceChannel(value: string): void;
        /** @hidden */
        setLeaveSuccessTimestamp(value: number): void;
        /** @hidden */
        setLeaveTimestamp(value: number): void;
        /**
        Sets the callback to invoke if the request fails.
        */
        setOnFailure(value: fm.icelink.IAction1<fm.icelink.websync4.LeaveConferenceFailureArgs>): void;
        /**
        Sets the callback to invoke if the request succeeds.
        */
        setOnSuccess(value: fm.icelink.IAction1<fm.icelink.websync4.LeaveConferenceSuccessArgs>): void;
        /**
        Sets a value indicating whether this endpoint should initiate an unlink from everyone after leaving the channel successfully. Defaults to `true`.
        */
        setUnlinkAllOnSuccess(value: boolean): void;
    }
}
declare namespace fm.icelink.websync4 {
    /**
    Arguments for leave-conference failure callbacks.
    */
    class LeaveConferenceFailureArgs extends fm.websync.BaseFailureArgs {
        getTypeString(): string;
        /** @hidden */
        __conferenceChannel: string;
        constructor();
        /**
        Gets the ID of the conference that failed to be left.
        */
        getConferenceChannel(): string;
    }
}
declare namespace fm.icelink.websync4 {
    /**
    Arguments for leave-conference success callbacks.
    */
    class LeaveConferenceSuccessArgs extends fm.websync.BaseSuccessArgs {
        getTypeString(): string;
        /** @hidden */
        __conferenceChannel: string;
        constructor();
        /**
        Gets the ID of the conference that was left.
        */
        getConferenceChannel(): string;
    }
}
declare namespace fm.icelink.websync4 {
    /**
    Extension methods for [[fm.websync.client]] instances.
    */
    abstract class ClientExtensions {
        getTypeString(): string;
        /** @hidden */
        private static fm_icelink_websync4_ClientExtensions___lock;
        /** @hidden */
        static readonly RemoteClientTag: string;
        /** @hidden */
        static readonly Retriable: string;
        /** @hidden */
        private static acceptAnswer;
        /** @hidden */
        private static acceptOfferCreateAnswerAndSend;
        /** @hidden */
        private static createAndSendOffer;
        /** @hidden */
        private static createNewConnectionAndSend;
        /** @hidden */
        private static doJoinConference;
        /** @hidden */
        private static doLeaveConference;
        /** @hidden */
        private static doRenegotiateConference;
        /** @hidden */
        private static getAndCacheConnection;
        /** @hidden */
        private static getInstanceChannel;
        /**
        Joins an IceLink conference.
        @param client The WebSync client.
        @param args The arguments.
        @return The WebSync client.
        */
        static joinConference(client: fm.websync.Client, args: fm.icelink.websync4.JoinConferenceArgs): fm.websync.Client;
        /**
        Leaves an IceLink conference.
        @param client The WebSync client.
        @param args The arguments.
        @return The WebSync client.
        */
        static leaveConference(client: fm.websync.Client, args: fm.icelink.websync4.LeaveConferenceArgs): fm.websync.Client;
        /** @hidden */
        private static preparePendingRenegotiationPromise;
        /** @hidden */
        private static processConnectionSignallingStateChange;
        /** @hidden */
        private static processConnectionStateChange;
        /** @hidden */
        private static processReadyForRenegotiation;
        /** @hidden */
        private static raiseJoinFailure;
        /** @hidden */
        private static raiseJoinReceive;
        /** @hidden */
        private static raiseJoinRemoteClient;
        /** @hidden */
        private static raiseJoinSuccess;
        /** @hidden */
        private static raiseLeaveFailure;
        /** @hidden */
        private static raiseLeaveSuccess;
        /** @hidden */
        private static receiveRemoteCandidate;
        /** @hidden */
        private static receiveRemoteDescription;
        /**
        Reconnects remote client.
        @param client The WebSync client.
        @param remoteClient The remote client.
        @param failedConnection Failed connection that requires reconnection.
        */
        static reconnectRemoteClient(client: fm.websync.Client, remoteClient: fm.icelink.websync4.PeerClient, failedConnection: fm.icelink.Connection): void;
        /**
        Commences session description renegotiation for the specified connection.
        @param client The WebSync client.
        @param conferenceChannel Conference channel.
        @param connection The connection on which to renegotiate.
        */
        static renegotiate(client: fm.websync.Client, conferenceChannel: string, connection: fm.icelink.Connection): fm.icelink.Future<Object>;
        /** @hidden */
        private static renegotiateConnection;
        /** @hidden */
        private static resolveNextConnection;
        /** @hidden */
        private static sendLocalCandidate;
        /** @hidden */
        private static sendLocalDescription;
        /** @hidden */
        private static setRemoteDescription;
        /** @hidden */
        private static __fmicelinkwebsync4ClientExtensionsInitialized;
        /** @hidden */
        static fmicelinkwebsync4ClientExtensionsInitialize(): void;
    }
}
declare namespace fm.icelink.websync4 {
    /** @hidden */
    class ConnectionCollection extends fm.icelink.ConnectionCollection {
        getTypeString(): string;
        /** @hidden */
        private __lookupByRemoteUserId;
        /** @hidden */
        private __lookupByRemoteUserIdLock;
        /** @hidden */
        private __onLocalCandidate;
        /** @hidden */
        private _joinArgs;
        /** @hidden */
        private _onLocalCandidate;
        /** @hidden */
        static readonly RemoteUserId: string;
        private fmicelinkwebsync4ConnectionCollectionInit;
        constructor(joinArgs: fm.icelink.websync4.JoinConferenceArgs);
        add(value: fm.icelink.Connection): boolean;
        addOnLocalCandidate(value: fm.icelink.IAction2<fm.icelink.Connection, fm.icelink.Candidate>): void;
        protected addSuccess(value: fm.icelink.Connection): void;
        checkForExistingConnection(remoteUserId: string, tieBreaker: string): boolean;
        getByRemoteUserId(remoteUserId: string): fm.icelink.Connection;
        getJoinArgs(): fm.icelink.websync4.JoinConferenceArgs;
        /** @hidden */
        private processLocalCandidate;
        removeOnLocalCandidate(value: fm.icelink.IAction2<fm.icelink.Connection, fm.icelink.Candidate>): void;
        protected removeSuccess(value: fm.icelink.Connection): void;
        /** @hidden */
        private setJoinArgs;
        tryGetByRemoteUserId(remoteUserId: string, connection: fm.icelink.Holder<fm.icelink.Connection>): boolean;
    }
}
declare namespace fm.icelink.websync4 {
    /**
    Details about a remote WebSync instance.
    */
    class PeerClient {
        getTypeString(): string;
        /** @hidden */
        private _boundRecords;
        /** @hidden */
        private _instanceId;
        /** @hidden */
        private _state;
        /**
        Initializes a new instance of the [[fm.icelink.websync4.peerClient]] class.
        @param instanceId The WebSync instance ID.
        @param boundRecords The WebSync bound records.
        */
        constructor(instanceId: string, boundRecords: fm.icelink.Hash<string, fm.websync.Record>);
        /** @hidden */
        static createPeerClient(instanceId: string, boundRecords: fm.icelink.Hash<string, fm.websync.Record>, state: fm.icelink.websync4.State): fm.icelink.websync4.PeerClient;
        /**
        Gets the WebSync bound records.
        */
        getBoundRecords(): fm.icelink.Hash<string, fm.websync.Record>;
        /**
        Gets the WebSync instance ID.
        */
        getInstanceId(): string;
        /** @hidden */
        getState(): fm.icelink.websync4.State;
        /**
        Sets the WebSync bound records.
        */
        setBoundRecords(value: fm.icelink.Hash<string, fm.websync.Record>): void;
        /**
        Sets the WebSync instance ID.
        */
        setInstanceId(value: string): void;
        /** @hidden */
        private setState;
    }
}
declare namespace fm.icelink.websync4 {
}
