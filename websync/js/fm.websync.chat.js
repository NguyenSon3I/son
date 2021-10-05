
/*
 * Title: WebSync Client Chat Extension for JavaScript
 * Version: 4.5.1
 * Copyright Frozen Mountain Software 2011+
 */

(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else this[name] = definition();
}('fm.websync.chat', function() {

if (typeof global !== 'undefined' && !global.window) { global.window = global; global.document = { cookie: '' }; }

if (!window.fm) { throw new Error("fm must be loaded before fm.websync.chat."); }

if (!window.fm.websync) { throw new Error("fm.websync must be loaded before fm.websync.chat."); }

if (!window.fm.websync.chat) { window.fm.websync.chat = {}; }

var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

var __hasProp = {}.hasOwnProperty;

var __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

/*<span id='cls-fm.websync.chat.chatUser'>&nbsp;</span>
*/

/**
@class fm.websync.chat.chatUser
 <div>
 An instance of a chat participant.
 </div>

@extends fm.serializable
*/


fm.websync.chat.chatUser = (function(_super) {

  __extends(chatUser, _super);

  chatUser.prototype.__boundRecords = null;

  chatUser.prototype.__userId = null;

  chatUser.prototype.__userNickname = null;

  /*<span id='method-fm.websync.chat.chatUser-fm.websync.chat.chatUser'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.chat.chatUser">fm.websync.chat.chatUser</see> class.
  	 </div>
  	@function fm.websync.chat.chatUser
  	@param {String} userId The user ID of the chat participant.
  	@param {String} userNickname The user nickname of the chat participant.
  	@param {Object} boundRecords The bounds records of the chat participant.
  	@return {}
  */


  function chatUser() {
    this.setUserNickname = __bind(this.setUserNickname, this);

    this.setUserId = __bind(this.setUserId, this);

    this.setBoundRecords = __bind(this.setBoundRecords, this);

    this.getUserNickname = __bind(this.getUserNickname, this);

    this.getUserId = __bind(this.getUserId, this);

    this.getBoundRecords = __bind(this.getBoundRecords, this);

    var boundRecords, userId, userNickname;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      chatUser.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    userId = arguments[0];
    userNickname = arguments[1];
    boundRecords = arguments[2];
    chatUser.__super__.constructor.call(this);
    this.setUserId(userId);
    this.setUserNickname(userNickname);
    this.__boundRecords = boundRecords;
  }

  /*<span id='method-fm.websync.chat.chatUser-getBoundRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the bound records of the chat participant.
  	 </div>
  
  	@function getBoundRecords
  	@return {Object}
  */


  chatUser.prototype.getBoundRecords = function() {
    return this.__boundRecords;
  };

  /*<span id='method-fm.websync.chat.chatUser-getUserId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the user ID of the chat participant.
  	 </div>
  
  	@function getUserId
  	@return {String}
  */


  chatUser.prototype.getUserId = function() {
    return this.__userId;
  };

  /*<span id='method-fm.websync.chat.chatUser-getUserNickname'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the user nickname of the chat participant.
  	 </div>
  
  	@function getUserNickname
  	@return {String}
  */


  chatUser.prototype.getUserNickname = function() {
    return this.__userNickname;
  };

  /*<span id='method-fm.websync.chat.chatUser-setBoundRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the bound records of the chat participant.
  	 </div>
  
  	@function setBoundRecords
  	@param {Object} value
  	@return {void}
  */


  chatUser.prototype.setBoundRecords = function() {
    var value;
    value = arguments[0];
    this.setIsDirty(true);
    return this.__boundRecords = value;
  };

  /*<span id='method-fm.websync.chat.chatUser-setUserId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the user ID of the chat participant.
  	 </div>
  
  	@function setUserId
  	@param {String} value
  	@return {void}
  */


  chatUser.prototype.setUserId = function() {
    var value;
    value = arguments[0];
    this.setIsDirty(true);
    return this.__userId = value;
  };

  /*<span id='method-fm.websync.chat.chatUser-setUserNickname'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the user nickname of the chat participant.
  	 </div>
  
  	@function setUserNickname
  	@param {String} value
  	@return {void}
  */


  chatUser.prototype.setUserNickname = function() {
    var value;
    value = arguments[0];
    this.setIsDirty(true);
    return this.__userNickname = value;
  };

  return chatUser;

})(fm.serializable);


/*<span id='cls-fm.websync.chat.clientExtensions'>&nbsp;</span>
*/

/**
@class fm.websync.chat.clientExtensions
 <div>
 Extensions for the <see cref="fm.websync.client">fm.websync.client</see> class.
 </div>
*/

fm.websync.chat.clientExtensions = (function() {

  clientExtensions._argsKey = null;

  clientExtensions._joinStateKey = null;

  clientExtensions._leaveStateKey = null;

  clientExtensions._userCacheKey = null;

  clientExtensions._userCacheLockKey = null;

  clientExtensions._userIdKey = null;

  clientExtensions._userNicknameKey = null;

  function clientExtensions() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientExtensions.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
  }

  clientExtensions.getRecordValueJson = function() {
    var key, records;
    records = arguments[0];
    key = arguments[1];
    if (fm.hashExtensions.containsKey(records, key)) {
      return records[key].getValueJson();
    }
    return null;
  };

  clientExtensions.getRecordValueJsonFromArray = function() {
    var key, record, records, _i, _len, _var0;
    records = arguments[0];
    key = arguments[1];
    _var0 = records;
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      record = _var0[_i];
      if (record.getKey() === key) {
        return record.getValueJson();
      }
    }
    return null;
  };

  clientExtensions.getUser = function() {
    var channel, records;
    records = arguments[0];
    channel = arguments[1];
    return new fm.websync.chat.chatUser(fm.websync.chat.clientExtensions.getUserId(records, channel), fm.websync.chat.clientExtensions.getUserNickname(records, channel), records);
  };

  clientExtensions.getUserId = function() {
    var channel, recordValueJson, records, _var0;
    records = arguments[0];
    channel = arguments[1];
    recordValueJson = fm.websync.chat.clientExtensions.getRecordValueJson(records, fm.websync.chat.clientExtensions.getUserIdKey(channel));
    _var0 = recordValueJson;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    return fm.serializer.deserializeString(recordValueJson);
  };

  clientExtensions.getUserIdFromArray = function() {
    var channel, recordValueJsonFromArray, records, _var0;
    records = arguments[0];
    channel = arguments[1];
    recordValueJsonFromArray = fm.websync.chat.clientExtensions.getRecordValueJsonFromArray(records, fm.websync.chat.clientExtensions.getUserIdKey(channel));
    _var0 = recordValueJsonFromArray;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    return fm.serializer.deserializeString(recordValueJsonFromArray);
  };

  /*<span id='method-fm.websync.chat.clientExtensions-getUserIdKey'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the binding key for a user ID.
  	 </div>
  	@function getUserIdKey
  	@param {String} channel The subscribed channel.
  	@return {String}
  */


  clientExtensions.getUserIdKey = function() {
    var channel;
    channel = arguments[0];
    return fm.stringExtensions.concat(fm.websync.chat.clientExtensions._userIdKey, channel);
  };

  clientExtensions.getUserNickname = function() {
    var channel, recordValueJson, records, _var0;
    records = arguments[0];
    channel = arguments[1];
    recordValueJson = fm.websync.chat.clientExtensions.getRecordValueJson(records, fm.websync.chat.clientExtensions.getUserNicknameKey(channel));
    _var0 = recordValueJson;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    return fm.serializer.deserializeString(recordValueJson);
  };

  clientExtensions.getUserNicknameFromArray = function() {
    var channel, recordValueJsonFromArray, records, _var0;
    records = arguments[0];
    channel = arguments[1];
    recordValueJsonFromArray = fm.websync.chat.clientExtensions.getRecordValueJsonFromArray(records, fm.websync.chat.clientExtensions.getUserNicknameKey(channel));
    _var0 = recordValueJsonFromArray;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    return fm.serializer.deserializeString(recordValueJsonFromArray);
  };

  /*<span id='method-fm.websync.chat.clientExtensions-getUserNicknameKey'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the binding key for a user nickname.
  	 </div>
  	@function getUserNicknameKey
  	@param {String} channel The subscribed channel.
  	@return {String}
  */


  clientExtensions.getUserNicknameKey = function() {
    var channel;
    channel = arguments[0];
    return fm.stringExtensions.concat(fm.websync.chat.clientExtensions._userNicknameKey, channel);
  };

  /*<span id='method-fm.websync.chat.clientExtensions-join'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Binds/subscribes the client to the channel with the specified
  	 user ID and nickname.
  	 </div><div>
  	 When the join completes successfully, the OnSuccess callback
  	 will be invoked, passing in the joined channel, user ID, and
  	 user nickname, <b>including any modifications made on the server</b>.
  	 </div>
  	@function join
  	@param {fm.websync.client} client The client.
  	@param {fm.websync.chat.joinArgs} joinArgs The join arguments.
  	 See fm.websync.chat.joinArgs for details.
  	@return {fm.websync.client} The client.
  */


  clientExtensions.join = function() {
    var args, args3, args4, bindArgs, client, joinArgs;
    client = arguments[0];
    joinArgs = arguments[1];
    if (fm.stringExtensions.isNullOrEmpty(joinArgs.getChannel())) {
      throw new Error("channel cannot be null.");
    }
    if (fm.stringExtensions.isNullOrEmpty(joinArgs.getUserId())) {
      throw new Error("userId cannot be null.");
    }
    if (fm.stringExtensions.isNullOrEmpty(joinArgs.getUserNickname())) {
      throw new Error("userNickname cannot be null.");
    }
    joinArgs.setDynamicValue(fm.websync.chat.clientExtensions._joinStateKey, new fm.websync.chat.joinState());
    joinArgs.setDynamicValue(fm.websync.chat.clientExtensions._userIdKey, joinArgs.getUserId());
    joinArgs.setDynamicValue(fm.websync.chat.clientExtensions._userNicknameKey, joinArgs.getUserNickname());
    client.startBatch();
    args3 = new fm.websync.bindArgs([new fm.websync.record(fm.websync.chat.clientExtensions.getUserIdKey(joinArgs.getChannel()), fm.serializer.serializeString(joinArgs.getUserId())), new fm.websync.record(fm.websync.chat.clientExtensions.getUserNicknameKey(joinArgs.getChannel()), fm.serializer.serializeString(joinArgs.getUserNickname()))]);
    args3.setRequestUrl(joinArgs.getRequestUrl());
    args3.setRequestTimeout(joinArgs.getRequestTimeout());
    args3.setSynchronous(joinArgs.getSynchronous());
    args3.setOnSuccess(clientExtensions.onBindSuccess);
    args3.setOnFailure(clientExtensions.onBindFailure);
    args3.setDynamicProperties(joinArgs.getDynamicProperties());
    bindArgs = args3;
    bindArgs.setDynamicValue(fm.websync.chat.clientExtensions._argsKey, joinArgs);
    bindArgs.copyExtensions(joinArgs);
    client.bind(bindArgs);
    args4 = new fm.websync.subscribeArgs(joinArgs.getChannels(), joinArgs.getTag());
    args4.setRequestUrl(joinArgs.getRequestUrl());
    args4.setRequestTimeout(joinArgs.getRequestTimeout());
    args4.setSynchronous(joinArgs.getSynchronous());
    args4.setOnSuccess(clientExtensions.onSubscribeSuccess);
    args4.setOnFailure(clientExtensions.onSubscribeFailure);
    args4.setOnReceive(clientExtensions.onReceive);
    args4.setDynamicProperties(joinArgs.getDynamicProperties());
    args = args4;
    fm.websync.subscribers.subscribeArgsExtensions.setOnClientSubscribe(args, clientExtensions.onClientSubscribe);
    fm.websync.subscribers.subscribeArgsExtensions.setOnClientUnsubscribe(args, clientExtensions.onClientUnsubscribe);
    args.setDynamicValue(fm.websync.chat.clientExtensions._argsKey, joinArgs);
    args.copyExtensions(joinArgs);
    client.subscribe(args);
    client.endBatch();
    return client;
  };

  /*<span id='method-fm.websync.chat.clientExtensions-leave'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Unsubscribes/unbinds the client from the channel.
  	 </div><div>
  	 When the leave completes successfully, the OnSuccess callback
  	 will be invoked, passing in the left
  	 channel, <b>including any modifications made on the server</b>.
  	 </div>
  	@function leave
  	@param {fm.websync.client} client The client.
  	@param {fm.websync.chat.leaveArgs} leaveArgs The leave arguments.
  	 See fm.websync.chat.leaveArgs for details.
  	@return {fm.websync.client} The client.
  */


  clientExtensions.leave = function() {
    var args3, args4, client, leaveArgs, unbindArgs, unsubscribeArgs;
    client = arguments[0];
    leaveArgs = arguments[1];
    if (fm.stringExtensions.isNullOrEmpty(leaveArgs.getChannel())) {
      throw new Error("channel cannot be null.");
    }
    leaveArgs.setDynamicValue(fm.websync.chat.clientExtensions._leaveStateKey, new fm.websync.chat.leaveState());
    client.startBatch();
    args3 = new fm.websync.unsubscribeArgs(leaveArgs.getChannels(), leaveArgs.getTag());
    args3.setRequestUrl(leaveArgs.getRequestUrl());
    args3.setRequestTimeout(leaveArgs.getRequestTimeout());
    args3.setSynchronous(leaveArgs.getSynchronous());
    args3.setOnSuccess(clientExtensions.onUnsubscribeSuccess);
    args3.setOnFailure(clientExtensions.onUnsubscribeFailure);
    args3.setDynamicProperties(leaveArgs.getDynamicProperties());
    unsubscribeArgs = args3;
    unsubscribeArgs.setDynamicValue(fm.websync.chat.clientExtensions._argsKey, leaveArgs);
    unsubscribeArgs.copyExtensions(leaveArgs);
    client.unsubscribe(unsubscribeArgs);
    args4 = new fm.websync.unbindArgs([new fm.websync.record(fm.websync.chat.clientExtensions.getUserIdKey(leaveArgs.getChannel())), new fm.websync.record(fm.websync.chat.clientExtensions.getUserNicknameKey(leaveArgs.getChannel()))]);
    args4.setRequestUrl(leaveArgs.getRequestUrl());
    args4.setRequestTimeout(leaveArgs.getRequestTimeout());
    args4.setSynchronous(leaveArgs.getSynchronous());
    args4.setOnSuccess(clientExtensions.onUnbindSuccess);
    args4.setOnFailure(clientExtensions.onUnbindFailure);
    args4.setDynamicProperties(leaveArgs.getDynamicProperties());
    unbindArgs = args4;
    unbindArgs.setDynamicValue(fm.websync.chat.clientExtensions._argsKey, leaveArgs);
    unbindArgs.copyExtensions(leaveArgs);
    client.unbind(unbindArgs);
    client.endBatch();
    return client;
  };

  clientExtensions.onBindFailure = function() {
    var args, dynamicValue;
    args = arguments[0];
    dynamicValue = args.getDynamicValue(fm.websync.chat.clientExtensions._argsKey);
    return dynamicValue.getDynamicValue(fm.websync.chat.clientExtensions._joinStateKey).updateBindFailure(args);
  };

  clientExtensions.onBindSuccess = function() {
    var args, dynamicValue;
    args = arguments[0];
    dynamicValue = args.getDynamicValue(fm.websync.chat.clientExtensions._argsKey);
    dynamicValue.getDynamicValue(fm.websync.chat.clientExtensions._joinStateKey).updateBindSuccess(args);
    dynamicValue.setDynamicValue(fm.websync.chat.clientExtensions._userIdKey, fm.websync.chat.clientExtensions.getUserIdFromArray(args.getRecords(), dynamicValue.getChannel()));
    return dynamicValue.setDynamicValue(fm.websync.chat.clientExtensions._userNicknameKey, fm.websync.chat.clientExtensions.getUserNicknameFromArray(args.getRecords(), dynamicValue.getChannel()));
  };

  clientExtensions.onClientSubscribe = function() {
    var args, dynamicValue;
    args = arguments[0];
    dynamicValue = args.getDynamicValue(fm.websync.chat.clientExtensions._argsKey);
    return fm.websync.chat.clientExtensions.process(fm.websync.subscribers.subscriberChangeType.Subscribe, args.getSubscribedClient(), args.getChannel(), dynamicValue, args, true);
  };

  clientExtensions.onClientUnsubscribe = function() {
    var args, dynamicValue;
    args = arguments[0];
    dynamicValue = args.getDynamicValue(fm.websync.chat.clientExtensions._argsKey);
    return fm.websync.chat.clientExtensions.process(fm.websync.subscribers.subscriberChangeType.Unsubscribe, args.getUnsubscribedClient(), args.getChannel(), dynamicValue, args, true);
  };

  clientExtensions.onReceive = function() {
    var args, args4, dynamicValue, p;
    args = arguments[0];
    dynamicValue = args.getDynamicValue(fm.websync.chat.clientExtensions._argsKey);
    args4 = new fm.websync.chat.joinReceiveArgs(args.getChannel(), args.getDataJson(), args.getDataBytes(), args.getConnectionType(), args.getReconnectAfter());
    args4.__publishingUser = fm.websync.chat.clientExtensions.getUser(args.getPublishingClient().getBoundRecords(), dynamicValue.getChannel());
    args4.__userId = dynamicValue.getDynamicValue(fm.websync.chat.clientExtensions._userIdKey);
    args4.__userNickname = dynamicValue.getDynamicValue(fm.websync.chat.clientExtensions._userNicknameKey);
    args4.setClient(args.getClient());
    args4.setTimestamp(args.getTimestamp());
    args4.setDynamicProperties(dynamicValue.getDynamicProperties());
    p = args4;
    p.copyExtensions(args);
    return dynamicValue.getOnReceive()(p);
  };

  clientExtensions.onSubscribeFailure = function() {
    var args, dynamicValue, state;
    args = arguments[0];
    dynamicValue = args.getDynamicValue(fm.websync.chat.clientExtensions._argsKey);
    state = dynamicValue.getDynamicValue(fm.websync.chat.clientExtensions._joinStateKey);
    state.updateSubscribeFailure(args);
    if (state.getBindSuccess()) {
      throw new Error("Join failed (bind succeeded, subscribe failed).");
    }
    return fm.websync.chat.clientExtensions.raiseJoinFailure(dynamicValue, args, args.getIsResubscribe());
  };

  clientExtensions.onSubscribeSuccess = function() {
    var args, client, clientArray, dynamicValue, item, state, users, _i, _len, _var0, _var1;
    args = arguments[0];
    dynamicValue = args.getDynamicValue(fm.websync.chat.clientExtensions._argsKey);
    state = dynamicValue.getDynamicValue(fm.websync.chat.clientExtensions._joinStateKey);
    state.updateSubscribeSuccess(args);
    dynamicValue.setDynamicValue(fm.websync.chat.clientExtensions._userCacheKey, {});
    dynamicValue.setDynamicValue(fm.websync.chat.clientExtensions._userCacheLockKey, new fm.object());
    if (!state.getBindSuccess()) {
      throw new Error("Join failed (subscribe succeeded, bind failed).");
    }
    clientArray = fm.websync.subscribers.subscribeSuccessArgsExtensions.getSubscribedClients(args)[args.getChannel()];
    users = [];
    _var0 = clientArray;
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      client = _var0[_i];
      item = fm.websync.chat.clientExtensions.process(fm.websync.subscribers.subscriberChangeType.Subscribe, client, args.getChannel(), dynamicValue, args, false);
      _var1 = item;
      if (_var1 !== null && typeof _var1 !== 'undefined') {
        fm.arrayExtensions.add(users, item);
      }
    }
    return fm.websync.chat.clientExtensions.raiseJoinSuccess(dynamicValue, args, users);
  };

  clientExtensions.onUnbindFailure = function() {
    var args, dynamicValue, state;
    args = arguments[0];
    dynamicValue = args.getDynamicValue(fm.websync.chat.clientExtensions._argsKey);
    state = dynamicValue.getDynamicValue(fm.websync.chat.clientExtensions._leaveStateKey);
    state.updateUnbindFailure(args);
    if (state.getUnsubscribeSuccess()) {
      throw new Error("Leave failed (unsubscribe succeeded, unbind failed).");
    }
    return fm.websync.chat.clientExtensions.raiseLeaveFailure(dynamicValue, state.getUnsubscribeFailureArgs());
  };

  clientExtensions.onUnbindSuccess = function() {
    var args, dynamicValue, state;
    args = arguments[0];
    dynamicValue = args.getDynamicValue(fm.websync.chat.clientExtensions._argsKey);
    state = dynamicValue.getDynamicValue(fm.websync.chat.clientExtensions._leaveStateKey);
    state.updateUnbindSuccess(args);
    dynamicValue.setDynamicValue(fm.websync.chat.clientExtensions._userIdKey, fm.websync.chat.clientExtensions.getUserIdFromArray(args.getRecords(), dynamicValue.getChannel()));
    dynamicValue.setDynamicValue(fm.websync.chat.clientExtensions._userNicknameKey, fm.websync.chat.clientExtensions.getUserNicknameFromArray(args.getRecords(), dynamicValue.getChannel()));
    if (!state.getUnsubscribeSuccess()) {
      throw new Error("Leave failed (unbind succeeded, unsubscribe failed).");
    }
    return fm.websync.chat.clientExtensions.raiseLeaveSuccess(dynamicValue, state.getUnsubscribeSuccessArgs());
  };

  clientExtensions.onUnsubscribeFailure = function() {
    var args, dynamicValue;
    args = arguments[0];
    dynamicValue = args.getDynamicValue(fm.websync.chat.clientExtensions._argsKey);
    return dynamicValue.getDynamicValue(fm.websync.chat.clientExtensions._leaveStateKey).updateUnsubscribeFailure(args);
  };

  clientExtensions.onUnsubscribeSuccess = function() {
    var args, dynamicValue;
    args = arguments[0];
    dynamicValue = args.getDynamicValue(fm.websync.chat.clientExtensions._argsKey);
    return dynamicValue.getDynamicValue(fm.websync.chat.clientExtensions._leaveStateKey).updateUnsubscribeSuccess(args);
  };

  clientExtensions.process = function() {
    var args2, args3, args4, channel, dictionary2, dynamicValue, fireEvents, flag, flag2, joinArgs, obj2, outputArgs, p, subscriber, type, user, _var0, _var1, _var2, _var3, _var4, _var5, _var6, _var7, _var8;
    type = arguments[0];
    subscriber = arguments[1];
    channel = arguments[2];
    joinArgs = arguments[3];
    outputArgs = arguments[4];
    fireEvents = arguments[5];
    dynamicValue = joinArgs.getDynamicValue(fm.websync.chat.clientExtensions._userCacheKey);
    obj2 = joinArgs.getDynamicValue(fm.websync.chat.clientExtensions._userCacheLockKey);
    _var0 = dynamicValue;
    _var1 = obj2;
    if ((_var0 !== null && typeof _var0 !== 'undefined') && (_var1 !== null && typeof _var1 !== 'undefined')) {
      user = fm.websync.chat.clientExtensions.getUser(subscriber.getBoundRecords(), joinArgs.getChannel());
      _var2 = user.getUserId();
      if (_var2 === null || typeof _var2 === 'undefined') {
        throw new Error("Remote client did not specify a user ID. Is the remote client using the Chat extension?");
      }
      if (user.getUserId() === joinArgs.getDynamicValue(fm.websync.chat.clientExtensions._userIdKey)) {
        return null;
      }
      if (type === fm.websync.subscribers.subscriberChangeType.Subscribe) {
        flag = false;
        dictionary2 = null;
        _var3 = new fm.holder(dictionary2);
        _var4 = fm.hashExtensions.tryGetValue(dynamicValue, user.getUserId(), _var3);
        dictionary2 = _var3.getValue();
        if (!_var4) {
          dictionary2 = {};
        }
        dictionary2[subscriber.getClientId().toString()] = new fm.object();
        flag = fm.hashExtensions.getCount(dictionary2) === 1;
        if (flag) {
          dynamicValue[user.getUserId()] = dictionary2;
        }
        if (flag) {
          _var5 = joinArgs.getOnUserJoin();
          if (fireEvents && (_var5 !== null && typeof _var5 !== 'undefined')) {
            args2 = new fm.websync.chat.userJoinArgs(channel, subscriber);
            args2.__joinedUser = user;
            args2.__userId = joinArgs.getDynamicValue(fm.websync.chat.clientExtensions._userIdKey);
            args2.__userNickname = joinArgs.getDynamicValue(fm.websync.chat.clientExtensions._userNicknameKey);
            args2.setClient(outputArgs.getClient());
            args2.setTimestamp(outputArgs.getTimestamp());
            args2.setDynamicProperties(outputArgs.getDynamicProperties());
            p = args2;
            p.copyExtensions(outputArgs);
            joinArgs.getOnUserJoin()(p);
          }
          return user;
        }
      } else {
        flag2 = false;
        dictionary2 = null;
        _var6 = new fm.holder(dictionary2);
        _var7 = fm.hashExtensions.tryGetValue(dynamicValue, user.getUserId(), _var6);
        dictionary2 = _var6.getValue();
        if (!_var7) {
          return null;
        }
        fm.hashExtensions.remove(dictionary2, subscriber.getClientId().toString());
        flag2 = fm.hashExtensions.getCount(dictionary2) === 0;
        if (flag2) {
          fm.hashExtensions.remove(dynamicValue, user.getUserId());
        }
        if (flag2) {
          _var8 = joinArgs.getOnUserLeave();
          if (fireEvents && (_var8 !== null && typeof _var8 !== 'undefined')) {
            args4 = new fm.websync.chat.userLeaveArgs(channel, subscriber);
            args4.__leftUser = user;
            args4.__userId = joinArgs.getDynamicValue(fm.websync.chat.clientExtensions._userIdKey);
            args4.__userNickname = joinArgs.getDynamicValue(fm.websync.chat.clientExtensions._userNicknameKey);
            args4.setClient(outputArgs.getClient());
            args4.setTimestamp(outputArgs.getTimestamp());
            args4.setDynamicProperties(outputArgs.getDynamicProperties());
            args3 = args4;
            args3.copyExtensions(outputArgs);
            joinArgs.getOnUserLeave()(args3);
          }
          return user;
        }
      }
    }
    return null;
  };

  clientExtensions.raiseJoinFailure = function() {
    var args, args3, args4, args5, exception, isRejoin, joinArgs, onComplete, onFailure, p, retry, _var0, _var1;
    joinArgs = arguments[0];
    args = arguments[1];
    isRejoin = arguments[2];
    retry = false;
    onFailure = joinArgs.getOnFailure();
    _var0 = onFailure;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      args3 = new fm.websync.chat.joinFailureArgs();
      args3.__channels = args.getChannels();
      args3.__userId = joinArgs.getDynamicValue(fm.websync.chat.clientExtensions._userIdKey);
      args3.__userNickname = joinArgs.getDynamicValue(fm.websync.chat.clientExtensions._userNicknameKey);
      args3.__isRejoin = isRejoin;
      args3.setRetry(args.getRetry());
      args3.setClient(args.getClient());
      args3.setException(args.getException());
      args3.setTimestamp(args.getTimestamp());
      args3.setDynamicProperties(joinArgs.getDynamicProperties());
      p = args3;
      p.copyExtensions(args);
      try {
        onFailure(p);
      } catch (exception1) {
        exception = exception1;
        if (!args.getClient().raiseUnhandledException(exception)) {
          fm.asyncException.asyncThrow(exception, "Client -> Join -> OnFailure");
        }
      } finally {

      }
      retry = p.getRetry();
    }
    onComplete = joinArgs.getOnComplete();
    _var1 = onComplete;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      args5 = new fm.websync.chat.joinCompleteArgs();
      args5.__isRejoin = isRejoin;
      args5.setClient(args.getClient());
      args5.setTimestamp(args.getTimestamp());
      args5.setDynamicProperties(joinArgs.getDynamicProperties());
      args4 = args5;
      args4.copyExtensions(args);
      try {
        onComplete(args4);
      } catch (exception2) {
        exception = exception2;
        if (!args.getClient().raiseUnhandledException(exception)) {
          fm.asyncException.asyncThrow(exception, "Client -> Join -> OnComplete");
        }
      } finally {

      }
    }
    if (retry) {
      joinArgs.setIsRetry(true);
      return fm.websync.chat.clientExtensions.join(args.getClient(), joinArgs);
    }
  };

  clientExtensions.raiseJoinSuccess = function() {
    var args, args3, args4, args5, exception, joinArgs, onComplete, onSuccess, p, users, _var0, _var1;
    joinArgs = arguments[0];
    args = arguments[1];
    users = arguments[2];
    joinArgs.setDynamicValue(fm.websync.chat.clientExtensions._userCacheKey, {});
    joinArgs.setDynamicValue(fm.websync.chat.clientExtensions._userCacheLockKey, new fm.object());
    onSuccess = joinArgs.getOnSuccess();
    _var0 = onSuccess;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      args3 = new fm.websync.chat.joinSuccessArgs();
      args3.__channels = args.getChannels();
      args3.__userId = joinArgs.getDynamicValue(fm.websync.chat.clientExtensions._userIdKey);
      args3.__userNickname = joinArgs.getDynamicValue(fm.websync.chat.clientExtensions._userNicknameKey);
      args3.__users = fm.arrayExtensions.toArray(users);
      args3.__isRejoin = args.getIsResubscribe();
      args3.setClient(args.getClient());
      args3.setTimestamp(args.getTimestamp());
      args3.setDynamicProperties(joinArgs.getDynamicProperties());
      p = args3;
      p.copyExtensions(args);
      try {
        onSuccess(p);
      } catch (exception1) {
        exception = exception1;
        if (!args.getClient().raiseUnhandledException(exception)) {
          fm.asyncException.asyncThrow(exception, "Client -> Join -> OnSuccess");
        }
      } finally {

      }
    }
    onComplete = joinArgs.getOnComplete();
    _var1 = onComplete;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      args5 = new fm.websync.chat.joinCompleteArgs();
      args5.__isRejoin = args.getIsResubscribe();
      args5.setClient(args.getClient());
      args5.setTimestamp(args.getTimestamp());
      args5.setDynamicProperties(joinArgs.getDynamicProperties());
      args4 = args5;
      args4.copyExtensions(args);
      try {
        return onComplete(args4);
      } catch (exception2) {
        exception = exception2;
        if (!args.getClient().raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, "Client -> Join -> OnComplete");
        }
      } finally {

      }
    }
  };

  clientExtensions.raiseLeaveFailure = function() {
    var args, args3, args4, args5, exception, leaveArgs, onComplete, onFailure, p, retry, _var0, _var1;
    leaveArgs = arguments[0];
    args = arguments[1];
    retry = false;
    onFailure = leaveArgs.getOnFailure();
    _var0 = onFailure;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      args3 = new fm.websync.chat.leaveFailureArgs();
      args3.__channels = args.getChannels();
      args3.__userId = fm.global.tryCastString(leaveArgs.getDynamicValue(fm.websync.chat.clientExtensions._userIdKey));
      args3.__userNickname = fm.global.tryCastString(leaveArgs.getDynamicValue(fm.websync.chat.clientExtensions._userNicknameKey));
      args3.setRetry(args.getRetry());
      args3.setClient(args.getClient());
      args3.setException(args.getException());
      args3.setTimestamp(args.getTimestamp());
      args3.setDynamicProperties(leaveArgs.getDynamicProperties());
      p = args3;
      p.copyExtensions(args);
      try {
        onFailure(p);
      } catch (exception1) {
        exception = exception1;
        if (!args.getClient().raiseUnhandledException(exception)) {
          fm.asyncException.asyncThrow(exception, "Client -> Leave -> OnFailure");
        }
      } finally {

      }
      retry = p.getRetry();
    }
    onComplete = leaveArgs.getOnComplete();
    _var1 = onComplete;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      args5 = new fm.websync.chat.leaveCompleteArgs();
      args5.setClient(args.getClient());
      args5.setTimestamp(args.getTimestamp());
      args5.setDynamicProperties(leaveArgs.getDynamicProperties());
      args4 = args5;
      args4.copyExtensions(args);
      try {
        onComplete(args4);
      } catch (exception2) {
        exception = exception2;
        if (!args.getClient().raiseUnhandledException(exception)) {
          fm.asyncException.asyncThrow(exception, "Client -> Leave -> OnComplete");
        }
      } finally {

      }
    }
    if (retry) {
      leaveArgs.setIsRetry(true);
      return fm.websync.chat.clientExtensions.leave(args.getClient(), leaveArgs);
    }
  };

  clientExtensions.raiseLeaveSuccess = function() {
    var args, args3, args4, args5, exception, leaveArgs, onComplete, onSuccess, p, _var0, _var1;
    leaveArgs = arguments[0];
    args = arguments[1];
    onSuccess = leaveArgs.getOnSuccess();
    _var0 = onSuccess;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      args3 = new fm.websync.chat.leaveSuccessArgs();
      args3.__channels = args.getChannels();
      args3.__userId = leaveArgs.getDynamicValue(fm.websync.chat.clientExtensions._userIdKey);
      args3.__userNickname = leaveArgs.getDynamicValue(fm.websync.chat.clientExtensions._userNicknameKey);
      args3.setClient(args.getClient());
      args3.setTimestamp(args.getTimestamp());
      args3.setDynamicProperties(leaveArgs.getDynamicProperties());
      p = args3;
      p.copyExtensions(args);
      try {
        onSuccess(p);
      } catch (exception1) {
        exception = exception1;
        if (!args.getClient().raiseUnhandledException(exception)) {
          fm.asyncException.asyncThrow(exception, "Client -> Leave -> OnSuccess");
        }
      } finally {

      }
    }
    onComplete = leaveArgs.getOnComplete();
    _var1 = onComplete;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      args5 = new fm.websync.chat.leaveCompleteArgs();
      args5.setClient(args.getClient());
      args5.setTimestamp(args.getTimestamp());
      args5.setDynamicProperties(leaveArgs.getDynamicProperties());
      args4 = args5;
      args4.copyExtensions(args);
      try {
        return onComplete(args4);
      } catch (exception2) {
        exception = exception2;
        if (!args.getClient().raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, "Client -> Leave -> OnComplete");
        }
      } finally {

      }
    }
  };

  clientExtensions.getRecordValue = function() {
    var key, records;
    records = arguments[0];
    key = arguments[1];
    return fm.json.deserialize(clientExtensions.getRecordValueJson.apply(clientExtensions, arguments));
  };

  /*<span id='method-fm.websync.chat.clientExtensions-join'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Binds/subscribes the client to the channel with the specified
  	 user ID and nickname.
  	 </div><div>
  	 When the join completes successfully, the OnSuccess callback
  	 will be invoked, passing in the joined channel, user ID, and
  	 user nickname, <b>including any modifications made on the server</b>.
  	 </div>
  	@function join
  	@param {fm.websync.chat.joinArgs} joinArgs The join arguments.
  	 See fm.websync.chat.joinArgs for details.
  	@return {fm.websync.client} The client.
  */


  fm.websync.client.prototype.join = function() {
    var joinArgs;
    joinArgs = arguments[0];
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.websync.chat.clientExtensions.join.apply(this, arguments);
  };

  /*<span id='method-fm.websync.chat.clientExtensions-leave'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Unsubscribes/unbinds the client from the channel.
  	 </div><div>
  	 When the leave completes successfully, the OnSuccess callback
  	 will be invoked, passing in the left
  	 channel, <b>including any modifications made on the server</b>.
  	 </div>
  	@function leave
  	@param {fm.websync.chat.leaveArgs} leaveArgs The leave arguments.
  	 See fm.websync.chat.leaveArgs for details.
  	@return {fm.websync.client} The client.
  */


  fm.websync.client.prototype.leave = function() {
    var leaveArgs;
    leaveArgs = arguments[0];
    Array.prototype.splice.call(arguments, 0, 0, this);
    return fm.websync.chat.clientExtensions.leave.apply(this, arguments);
  };

  clientExtensions._userIdKey = "fm.chat.userId";

  clientExtensions._userNicknameKey = "fm.chat.userNickname";

  clientExtensions._userCacheKey = "fm.chat.userCache";

  clientExtensions._userCacheLockKey = "fm.chat.userCacheLock";

  clientExtensions._joinStateKey = "fm.chat.joinState";

  clientExtensions._leaveStateKey = "fm.chat.leaveState";

  clientExtensions._argsKey = "fm.chat.args";

  return clientExtensions;

}).call(this);




fm.websync.chat.leaveState = (function(_super) {

  __extends(leaveState, _super);

  leaveState.prototype._unbindFailureArgs = null;

  leaveState.prototype._unbindSuccess = false;

  leaveState.prototype._unbindSuccessArgs = null;

  leaveState.prototype._unsubscribeFailureArgs = null;

  leaveState.prototype._unsubscribeSuccess = false;

  leaveState.prototype._unsubscribeSuccessArgs = null;

  function leaveState() {
    this.updateUnsubscribeSuccess = __bind(this.updateUnsubscribeSuccess, this);

    this.updateUnsubscribeFailure = __bind(this.updateUnsubscribeFailure, this);

    this.updateUnbindSuccess = __bind(this.updateUnbindSuccess, this);

    this.updateUnbindFailure = __bind(this.updateUnbindFailure, this);

    this.setUnsubscribeSuccessArgs = __bind(this.setUnsubscribeSuccessArgs, this);

    this.setUnsubscribeSuccess = __bind(this.setUnsubscribeSuccess, this);

    this.setUnsubscribeFailureArgs = __bind(this.setUnsubscribeFailureArgs, this);

    this.setUnbindSuccessArgs = __bind(this.setUnbindSuccessArgs, this);

    this.setUnbindSuccess = __bind(this.setUnbindSuccess, this);

    this.setUnbindFailureArgs = __bind(this.setUnbindFailureArgs, this);

    this.getUnsubscribeSuccessArgs = __bind(this.getUnsubscribeSuccessArgs, this);

    this.getUnsubscribeSuccess = __bind(this.getUnsubscribeSuccess, this);

    this.getUnsubscribeFailureArgs = __bind(this.getUnsubscribeFailureArgs, this);

    this.getUnbindSuccessArgs = __bind(this.getUnbindSuccessArgs, this);

    this.getUnbindSuccess = __bind(this.getUnbindSuccess, this);

    this.getUnbindFailureArgs = __bind(this.getUnbindFailureArgs, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      leaveState.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    leaveState.__super__.constructor.call(this);
  }

  leaveState.prototype.getUnbindFailureArgs = function() {
    return this._unbindFailureArgs;
  };

  leaveState.prototype.getUnbindSuccess = function() {
    return this._unbindSuccess;
  };

  leaveState.prototype.getUnbindSuccessArgs = function() {
    return this._unbindSuccessArgs;
  };

  leaveState.prototype.getUnsubscribeFailureArgs = function() {
    return this._unsubscribeFailureArgs;
  };

  leaveState.prototype.getUnsubscribeSuccess = function() {
    return this._unsubscribeSuccess;
  };

  leaveState.prototype.getUnsubscribeSuccessArgs = function() {
    return this._unsubscribeSuccessArgs;
  };

  leaveState.prototype.setUnbindFailureArgs = function() {
    var value;
    value = arguments[0];
    return this._unbindFailureArgs = value;
  };

  leaveState.prototype.setUnbindSuccess = function() {
    var value;
    value = arguments[0];
    return this._unbindSuccess = value;
  };

  leaveState.prototype.setUnbindSuccessArgs = function() {
    var value;
    value = arguments[0];
    return this._unbindSuccessArgs = value;
  };

  leaveState.prototype.setUnsubscribeFailureArgs = function() {
    var value;
    value = arguments[0];
    return this._unsubscribeFailureArgs = value;
  };

  leaveState.prototype.setUnsubscribeSuccess = function() {
    var value;
    value = arguments[0];
    return this._unsubscribeSuccess = value;
  };

  leaveState.prototype.setUnsubscribeSuccessArgs = function() {
    var value;
    value = arguments[0];
    return this._unsubscribeSuccessArgs = value;
  };

  leaveState.prototype.updateUnbindFailure = function() {
    var unbindFailureArgs;
    unbindFailureArgs = arguments[0];
    this.setUnbindSuccess(false);
    return this.setUnbindFailureArgs(unbindFailureArgs);
  };

  leaveState.prototype.updateUnbindSuccess = function() {
    var unbindSuccessArgs;
    unbindSuccessArgs = arguments[0];
    this.setUnbindSuccess(true);
    return this.setUnbindSuccessArgs(unbindSuccessArgs);
  };

  leaveState.prototype.updateUnsubscribeFailure = function() {
    var unsubscribeFailureArgs;
    unsubscribeFailureArgs = arguments[0];
    this.setUnsubscribeSuccess(false);
    return this.setUnsubscribeFailureArgs(unsubscribeFailureArgs);
  };

  leaveState.prototype.updateUnsubscribeSuccess = function() {
    var unsubscribeSuccessArgs;
    unsubscribeSuccessArgs = arguments[0];
    this.setUnsubscribeSuccess(true);
    return this.setUnsubscribeSuccessArgs(unsubscribeSuccessArgs);
  };

  return leaveState;

})(fm.object);


/*<span id='cls-fm.websync.chat.joinArgs'>&nbsp;</span>
*/

/**
@class fm.websync.chat.joinArgs
 <div>
 Arguments for a client joining a chat channel.
 </div>

@extends fm.websync.baseInputArgs
*/


fm.websync.chat.joinArgs = (function(_super) {

  __extends(joinArgs, _super);

  joinArgs.prototype.__channels = null;

  joinArgs.prototype._onComplete = null;

  joinArgs.prototype._onFailure = null;

  joinArgs.prototype._onReceive = null;

  joinArgs.prototype._onSuccess = null;

  joinArgs.prototype._onUserJoin = null;

  joinArgs.prototype._onUserLeave = null;

  joinArgs.prototype._rejoin = false;

  joinArgs.prototype._userId = null;

  joinArgs.prototype._userNickname = null;

  /*<span id='method-fm.websync.chat.joinArgs-fm.websync.chat.joinArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.chat.joinArgs">fm.websync.chat.joinArgs</see> class.
  	 </div>
  	@function fm.websync.chat.joinArgs
  	@param {fm.array} channels The channels to join.
  	@param {String} tag The tag identifying the subscription.
  	@return {}
  */


  function joinArgs() {
    this.setUserNickname = __bind(this.setUserNickname, this);

    this.setUserId = __bind(this.setUserId, this);

    this.setTag = __bind(this.setTag, this);

    this.setRejoin = __bind(this.setRejoin, this);

    this.setOnUserLeave = __bind(this.setOnUserLeave, this);

    this.setOnUserJoin = __bind(this.setOnUserJoin, this);

    this.setOnSuccess = __bind(this.setOnSuccess, this);

    this.setOnReceive = __bind(this.setOnReceive, this);

    this.setOnFailure = __bind(this.setOnFailure, this);

    this.setOnComplete = __bind(this.setOnComplete, this);

    this.setChannels = __bind(this.setChannels, this);

    this.setChannel = __bind(this.setChannel, this);

    this.getUserNickname = __bind(this.getUserNickname, this);

    this.getUserId = __bind(this.getUserId, this);

    this.getTag = __bind(this.getTag, this);

    this.getRejoin = __bind(this.getRejoin, this);

    this.getOnUserLeave = __bind(this.getOnUserLeave, this);

    this.getOnUserJoin = __bind(this.getOnUserJoin, this);

    this.getOnSuccess = __bind(this.getOnSuccess, this);

    this.getOnReceive = __bind(this.getOnReceive, this);

    this.getOnFailure = __bind(this.getOnFailure, this);

    this.getOnComplete = __bind(this.getOnComplete, this);

    this.getChannels = __bind(this.getChannels, this);

    this.getChannel = __bind(this.getChannel, this);

    var channels, tag;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      joinArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 2) {
      channels = arguments[0];
      tag = arguments[1];
      joinArgs.__super__.constructor.call(this);
      this.setChannels(channels);
      this.setTag(tag);
      return;
    }
    if (arguments.length === 1) {
      channels = arguments[0];
      joinArgs.__super__.constructor.call(this);
      this.setChannels(channels);
      return;
    }
  }

  /*<span id='method-fm.websync.chat.joinArgs-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel to which the client should be subscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.chat.joinArgs.channels">fm.websync.chat.joinArgs.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  joinArgs.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };

  /*<span id='method-fm.websync.chat.joinArgs-getChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channels to which the client should be subscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.chat.joinArgs.channel">fm.websync.chat.joinArgs.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
  */


  joinArgs.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };

  /*<span id='method-fm.websync.chat.joinArgs-getOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke after <see cref="fm.websync.chat.joinArgs.onSuccess">fm.websync.chat.joinArgs.onSuccess</see> or <see cref="fm.websync.chat.joinArgs.onFailure">fm.websync.chat.joinArgs.onFailure</see>.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
  */


  joinArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };

  /*<span id='method-fm.websync.chat.joinArgs-getOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the request fails.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
  */


  joinArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };

  /*<span id='method-fm.websync.chat.joinArgs-getOnReceive'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke when data is received on the channel.
  	 See <see cref="fm.websync.chat.joinReceiveArgs">fm.websync.chat.joinReceiveArgs</see> for callback argument details.
  	 </div>
  
  	@function getOnReceive
  	@return {fm.singleAction}
  */


  joinArgs.prototype.getOnReceive = function() {
    return this._onReceive;
  };

  /*<span id='method-fm.websync.chat.joinArgs-getOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
  */


  joinArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };

  /*<span id='method-fm.websync.chat.joinArgs-getOnUserJoin'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke when a user joins the channel.
  	 See <see cref="fm.websync.chat.userJoinArgs">fm.websync.chat.userJoinArgs</see> for callback argument details.
  	 </div>
  
  	@function getOnUserJoin
  	@return {fm.singleAction}
  */


  joinArgs.prototype.getOnUserJoin = function() {
    return this._onUserJoin;
  };

  /*<span id='method-fm.websync.chat.joinArgs-getOnUserLeave'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke when a user leaves the channel.
  	 See <see cref="fm.websync.chat.userLeaveArgs">fm.websync.chat.userLeaveArgs</see> for callback argument details.
  	 </div>
  
  	@function getOnUserLeave
  	@return {fm.singleAction}
  */


  joinArgs.prototype.getOnUserLeave = function() {
    return this._onUserLeave;
  };

  joinArgs.prototype.getRejoin = function() {
    return this._rejoin;
  };

  /*<span id='method-fm.websync.chat.joinArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a tag that will uniquely identify this subscription so it
  	 can be unsubscribed later without affecting other subscriptions with the same channel.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  joinArgs.prototype.getTag = function() {
    var _ref;
    return (_ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? _ref : fm.stringExtensions.empty;
  };

  /*<span id='method-fm.websync.chat.joinArgs-getUserId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the current user ID.
  	 </div>
  
  	@function getUserId
  	@return {String}
  */


  joinArgs.prototype.getUserId = function() {
    return this._userId;
  };

  /*<span id='method-fm.websync.chat.joinArgs-getUserNickname'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the current user nickname.
  	 </div>
  
  	@function getUserNickname
  	@return {String}
  */


  joinArgs.prototype.getUserNickname = function() {
    return this._userNickname;
  };

  /*<span id='method-fm.websync.chat.joinArgs-setChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the channel to which the client should be subscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.chat.joinArgs.channels">fm.websync.chat.joinArgs.channels</see>.
  	 </div>
  
  	@function setChannel
  	@param {String} value
  	@return {void}
  */


  joinArgs.prototype.setChannel = function() {
    var value;
    value = arguments[0];
    return this.__channels = fm.websync.extensible.sharedSetChannel(value);
  };

  /*<span id='method-fm.websync.chat.joinArgs-setChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the channels to which the client should be subscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.chat.joinArgs.channel">fm.websync.chat.joinArgs.channel</see>.
  	 </div>
  
  	@function setChannels
  	@param {fm.array} value
  	@return {void}
  */


  joinArgs.prototype.setChannels = function() {
    var value;
    value = arguments[0];
    return this.__channels = fm.websync.extensible.sharedSetChannels(value);
  };

  /*<span id='method-fm.websync.chat.joinArgs-setOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke after <see cref="fm.websync.chat.joinArgs.onSuccess">fm.websync.chat.joinArgs.onSuccess</see> or <see cref="fm.websync.chat.joinArgs.onFailure">fm.websync.chat.joinArgs.onFailure</see>.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  joinArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };

  /*<span id='method-fm.websync.chat.joinArgs-setOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the request fails.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  joinArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };

  /*<span id='method-fm.websync.chat.joinArgs-setOnReceive'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke when data is received on the channel.
  	 See <see cref="fm.websync.chat.joinReceiveArgs">fm.websync.chat.joinReceiveArgs</see> for callback argument details.
  	 </div>
  
  	@function setOnReceive
  	@param {fm.singleAction} value
  	@return {void}
  */


  joinArgs.prototype.setOnReceive = function() {
    var value;
    value = arguments[0];
    return this._onReceive = value;
  };

  /*<span id='method-fm.websync.chat.joinArgs-setOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  joinArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };

  /*<span id='method-fm.websync.chat.joinArgs-setOnUserJoin'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke when a user joins the channel.
  	 See <see cref="fm.websync.chat.userJoinArgs">fm.websync.chat.userJoinArgs</see> for callback argument details.
  	 </div>
  
  	@function setOnUserJoin
  	@param {fm.singleAction} value
  	@return {void}
  */


  joinArgs.prototype.setOnUserJoin = function() {
    var value;
    value = arguments[0];
    return this._onUserJoin = value;
  };

  /*<span id='method-fm.websync.chat.joinArgs-setOnUserLeave'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke when a user leaves the channel.
  	 See <see cref="fm.websync.chat.userLeaveArgs">fm.websync.chat.userLeaveArgs</see> for callback argument details.
  	 </div>
  
  	@function setOnUserLeave
  	@param {fm.singleAction} value
  	@return {void}
  */


  joinArgs.prototype.setOnUserLeave = function() {
    var value;
    value = arguments[0];
    return this._onUserLeave = value;
  };

  joinArgs.prototype.setRejoin = function() {
    var value;
    value = arguments[0];
    return this._rejoin = value;
  };

  /*<span id='method-fm.websync.chat.joinArgs-setTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets a tag that will uniquely identify this subscription so it
  	 can be unsubscribed later without affecting other subscriptions with the same channel.
  	 </div>
  
  	@function setTag
  	@param {String} value
  	@return {void}
  */


  joinArgs.prototype.setTag = function() {
    var value;
    value = arguments[0];
    return this.setExtensionValueJson("fm.tag", fm.serializer.serializeString(value != null ? value : fm.stringExtensions.empty), false);
  };

  /*<span id='method-fm.websync.chat.joinArgs-setUserId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the current user ID.
  	 </div>
  
  	@function setUserId
  	@param {String} value
  	@return {void}
  */


  joinArgs.prototype.setUserId = function() {
    var value;
    value = arguments[0];
    return this._userId = value;
  };

  /*<span id='method-fm.websync.chat.joinArgs-setUserNickname'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the current user nickname.
  	 </div>
  
  	@function setUserNickname
  	@param {String} value
  	@return {void}
  */


  joinArgs.prototype.setUserNickname = function() {
    var value;
    value = arguments[0];
    return this._userNickname = value;
  };

  return joinArgs;

})(fm.websync.baseInputArgs);




fm.websync.chat.joinState = (function(_super) {

  __extends(joinState, _super);

  joinState.prototype._bindFailureArgs = null;

  joinState.prototype._bindSuccess = false;

  joinState.prototype._bindSuccessArgs = null;

  joinState.prototype._subscribeFailureArgs = null;

  joinState.prototype._subscribeSuccess = false;

  joinState.prototype._subscribeSuccessArgs = null;

  function joinState() {
    this.updateSubscribeSuccess = __bind(this.updateSubscribeSuccess, this);

    this.updateSubscribeFailure = __bind(this.updateSubscribeFailure, this);

    this.updateBindSuccess = __bind(this.updateBindSuccess, this);

    this.updateBindFailure = __bind(this.updateBindFailure, this);

    this.setSubscribeSuccessArgs = __bind(this.setSubscribeSuccessArgs, this);

    this.setSubscribeSuccess = __bind(this.setSubscribeSuccess, this);

    this.setSubscribeFailureArgs = __bind(this.setSubscribeFailureArgs, this);

    this.setBindSuccessArgs = __bind(this.setBindSuccessArgs, this);

    this.setBindSuccess = __bind(this.setBindSuccess, this);

    this.setBindFailureArgs = __bind(this.setBindFailureArgs, this);

    this.getSubscribeSuccessArgs = __bind(this.getSubscribeSuccessArgs, this);

    this.getSubscribeSuccess = __bind(this.getSubscribeSuccess, this);

    this.getSubscribeFailureArgs = __bind(this.getSubscribeFailureArgs, this);

    this.getBindSuccessArgs = __bind(this.getBindSuccessArgs, this);

    this.getBindSuccess = __bind(this.getBindSuccess, this);

    this.getBindFailureArgs = __bind(this.getBindFailureArgs, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      joinState.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    joinState.__super__.constructor.call(this);
  }

  joinState.prototype.getBindFailureArgs = function() {
    return this._bindFailureArgs;
  };

  joinState.prototype.getBindSuccess = function() {
    return this._bindSuccess;
  };

  joinState.prototype.getBindSuccessArgs = function() {
    return this._bindSuccessArgs;
  };

  joinState.prototype.getSubscribeFailureArgs = function() {
    return this._subscribeFailureArgs;
  };

  joinState.prototype.getSubscribeSuccess = function() {
    return this._subscribeSuccess;
  };

  joinState.prototype.getSubscribeSuccessArgs = function() {
    return this._subscribeSuccessArgs;
  };

  joinState.prototype.setBindFailureArgs = function() {
    var value;
    value = arguments[0];
    return this._bindFailureArgs = value;
  };

  joinState.prototype.setBindSuccess = function() {
    var value;
    value = arguments[0];
    return this._bindSuccess = value;
  };

  joinState.prototype.setBindSuccessArgs = function() {
    var value;
    value = arguments[0];
    return this._bindSuccessArgs = value;
  };

  joinState.prototype.setSubscribeFailureArgs = function() {
    var value;
    value = arguments[0];
    return this._subscribeFailureArgs = value;
  };

  joinState.prototype.setSubscribeSuccess = function() {
    var value;
    value = arguments[0];
    return this._subscribeSuccess = value;
  };

  joinState.prototype.setSubscribeSuccessArgs = function() {
    var value;
    value = arguments[0];
    return this._subscribeSuccessArgs = value;
  };

  joinState.prototype.updateBindFailure = function() {
    var bindFailureArgs;
    bindFailureArgs = arguments[0];
    this.setBindSuccess(false);
    return this.setBindFailureArgs(bindFailureArgs);
  };

  joinState.prototype.updateBindSuccess = function() {
    var bindSuccessArgs;
    bindSuccessArgs = arguments[0];
    this.setBindSuccess(true);
    return this.setBindSuccessArgs(bindSuccessArgs);
  };

  joinState.prototype.updateSubscribeFailure = function() {
    var subscribeFailureArgs;
    subscribeFailureArgs = arguments[0];
    this.setSubscribeSuccess(false);
    return this.setSubscribeFailureArgs(subscribeFailureArgs);
  };

  joinState.prototype.updateSubscribeSuccess = function() {
    var subscribeSuccessArgs;
    subscribeSuccessArgs = arguments[0];
    this.setSubscribeSuccess(true);
    return this.setSubscribeSuccessArgs(subscribeSuccessArgs);
  };

  return joinState;

})(fm.object);


/*<span id='cls-fm.websync.chat.userJoinArgs'>&nbsp;</span>
*/

/**
@class fm.websync.chat.userJoinArgs
 <div>
 Arguments for <see cref="fm.websync.chat.joinArgs.onUserJoin">fm.websync.chat.joinArgs.onUserJoin</see>.
 </div>

@extends fm.websync.subscribers.clientSubscribeArgs
*/


fm.websync.chat.userJoinArgs = (function(_super) {

  __extends(userJoinArgs, _super);

  userJoinArgs.prototype.__joinedUser = null;

  userJoinArgs.prototype.__userId = null;

  userJoinArgs.prototype.__userNickname = null;

  /*<span id='method-fm.websync.chat.userJoinArgs-fm.websync.chat.userJoinArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.chat.userJoinArgs">fm.websync.chat.userJoinArgs</see> class.
  	 </div>
  	@function fm.websync.chat.userJoinArgs
  	@param {String} channel The channel.
  	@param {fm.websync.subscribedClient} subscribedClient The subscribed client.
  	@return {}
  */


  function userJoinArgs() {
    this.getUserNickname = __bind(this.getUserNickname, this);

    this.getUserId = __bind(this.getUserId, this);

    this.getJoinedUser = __bind(this.getJoinedUser, this);

    var channel, subscribedClient;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      userJoinArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    channel = arguments[0];
    subscribedClient = arguments[1];
    userJoinArgs.__super__.constructor.call(this, channel, subscribedClient);
  }

  /*<span id='method-fm.websync.chat.userJoinArgs-getJoinedUser'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the user that joined.
  	 </div>
  
  	@function getJoinedUser
  	@return {fm.websync.chat.chatUser}
  */


  userJoinArgs.prototype.getJoinedUser = function() {
    return this.__joinedUser;
  };

  /*<span id='method-fm.websync.chat.userJoinArgs-getUserId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the ID of the current user.
  	 </div>
  
  	@function getUserId
  	@return {String}
  */


  userJoinArgs.prototype.getUserId = function() {
    return this.__userId;
  };

  /*<span id='method-fm.websync.chat.userJoinArgs-getUserNickname'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the nickname of the current user.
  	 </div>
  
  	@function getUserNickname
  	@return {String}
  */


  userJoinArgs.prototype.getUserNickname = function() {
    return this.__userNickname;
  };

  return userJoinArgs;

})(fm.websync.subscribers.clientSubscribeArgs);


/*<span id='cls-fm.websync.chat.userLeaveArgs'>&nbsp;</span>
*/

/**
@class fm.websync.chat.userLeaveArgs
 <div>
 Arguments for <see cref="fm.websync.chat.joinArgs.onUserLeave">fm.websync.chat.joinArgs.onUserLeave</see>.
 </div>

@extends fm.websync.subscribers.clientUnsubscribeArgs
*/


fm.websync.chat.userLeaveArgs = (function(_super) {

  __extends(userLeaveArgs, _super);

  userLeaveArgs.prototype.__leftUser = null;

  userLeaveArgs.prototype.__userId = null;

  userLeaveArgs.prototype.__userNickname = null;

  /*<span id='method-fm.websync.chat.userLeaveArgs-fm.websync.chat.userLeaveArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.chat.userLeaveArgs">fm.websync.chat.userLeaveArgs</see> class.
  	 </div>
  	@function fm.websync.chat.userLeaveArgs
  	@param {String} channel The channel.
  	@param {fm.websync.subscribedClient} unsubscribedClient The unsubscribed client.
  	@return {}
  */


  function userLeaveArgs() {
    this.getUserNickname = __bind(this.getUserNickname, this);

    this.getUserId = __bind(this.getUserId, this);

    this.getLeftUser = __bind(this.getLeftUser, this);

    var channel, unsubscribedClient;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      userLeaveArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    channel = arguments[0];
    unsubscribedClient = arguments[1];
    userLeaveArgs.__super__.constructor.call(this, channel, unsubscribedClient);
  }

  /*<span id='method-fm.websync.chat.userLeaveArgs-getLeftUser'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the user that left.
  	 </div>
  
  	@function getLeftUser
  	@return {fm.websync.chat.chatUser}
  */


  userLeaveArgs.prototype.getLeftUser = function() {
    return this.__leftUser;
  };

  /*<span id='method-fm.websync.chat.userLeaveArgs-getUserId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the ID of the current user.
  	 </div>
  
  	@function getUserId
  	@return {String}
  */


  userLeaveArgs.prototype.getUserId = function() {
    return this.__userId;
  };

  /*<span id='method-fm.websync.chat.userLeaveArgs-getUserNickname'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the nickname of the current user.
  	 </div>
  
  	@function getUserNickname
  	@return {String}
  */


  userLeaveArgs.prototype.getUserNickname = function() {
    return this.__userNickname;
  };

  return userLeaveArgs;

})(fm.websync.subscribers.clientUnsubscribeArgs);


/*<span id='cls-fm.websync.chat.leaveArgs'>&nbsp;</span>
*/

/**
@class fm.websync.chat.leaveArgs
 <div>
 Arguments for a client leaving a chat channel.
 </div>

@extends fm.websync.baseInputArgs
*/


fm.websync.chat.leaveArgs = (function(_super) {

  __extends(leaveArgs, _super);

  leaveArgs.prototype.__channels = null;

  leaveArgs.prototype._onComplete = null;

  leaveArgs.prototype._onFailure = null;

  leaveArgs.prototype._onSuccess = null;

  /*<span id='method-fm.websync.chat.leaveArgs-fm.websync.chat.leaveArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.chat.leaveArgs">fm.websync.chat.leaveArgs</see> class.
  	 </div>
  	@function fm.websync.chat.leaveArgs
  	@param {fm.array} channels The channels to leave.
  	@param {String} tag The tag identifying the subscription.
  	@return {}
  */


  function leaveArgs() {
    this.setTag = __bind(this.setTag, this);

    this.setOnSuccess = __bind(this.setOnSuccess, this);

    this.setOnFailure = __bind(this.setOnFailure, this);

    this.setOnComplete = __bind(this.setOnComplete, this);

    this.setChannels = __bind(this.setChannels, this);

    this.setChannel = __bind(this.setChannel, this);

    this.getTag = __bind(this.getTag, this);

    this.getOnSuccess = __bind(this.getOnSuccess, this);

    this.getOnFailure = __bind(this.getOnFailure, this);

    this.getOnComplete = __bind(this.getOnComplete, this);

    this.getChannels = __bind(this.getChannels, this);

    this.getChannel = __bind(this.getChannel, this);

    var channels, tag;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      leaveArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 2) {
      channels = arguments[0];
      tag = arguments[1];
      leaveArgs.__super__.constructor.call(this);
      this.setChannels(channels);
      this.setTag(tag);
      return;
    }
    if (arguments.length === 1) {
      channels = arguments[0];
      leaveArgs.__super__.constructor.call(this);
      this.setChannels(channels);
      return;
    }
  }

  /*<span id='method-fm.websync.chat.leaveArgs-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel from which the client should be unsubscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.chat.leaveArgs.channels">fm.websync.chat.leaveArgs.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  leaveArgs.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };

  /*<span id='method-fm.websync.chat.leaveArgs-getChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channels from which the client should be unsubscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.chat.leaveArgs.channel">fm.websync.chat.leaveArgs.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
  */


  leaveArgs.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };

  /*<span id='method-fm.websync.chat.leaveArgs-getOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke after <see cref="fm.websync.chat.leaveArgs.onSuccess">fm.websync.chat.leaveArgs.onSuccess</see> or <see cref="fm.websync.chat.leaveArgs.onFailure">fm.websync.chat.leaveArgs.onFailure</see>.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
  */


  leaveArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };

  /*<span id='method-fm.websync.chat.leaveArgs-getOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the request fails.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
  */


  leaveArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };

  /*<span id='method-fm.websync.chat.leaveArgs-getOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
  */


  leaveArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };

  /*<span id='method-fm.websync.chat.leaveArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a tag that uniquely identifies a subscription so
  	 other subscriptions with the same channel are not affected.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  leaveArgs.prototype.getTag = function() {
    var _ref;
    return (_ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? _ref : fm.stringExtensions.empty;
  };

  /*<span id='method-fm.websync.chat.leaveArgs-setChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the channel from which the client should be unsubscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.chat.leaveArgs.channels">fm.websync.chat.leaveArgs.channels</see>.
  	 </div>
  
  	@function setChannel
  	@param {String} value
  	@return {void}
  */


  leaveArgs.prototype.setChannel = function() {
    var value;
    value = arguments[0];
    return this.__channels = fm.websync.extensible.sharedSetChannel(value);
  };

  /*<span id='method-fm.websync.chat.leaveArgs-setChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the channels from which the client should be unsubscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.chat.leaveArgs.channel">fm.websync.chat.leaveArgs.channel</see>.
  	 </div>
  
  	@function setChannels
  	@param {fm.array} value
  	@return {void}
  */


  leaveArgs.prototype.setChannels = function() {
    var value;
    value = arguments[0];
    return this.__channels = fm.websync.extensible.sharedSetChannels(value);
  };

  /*<span id='method-fm.websync.chat.leaveArgs-setOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke after <see cref="fm.websync.chat.leaveArgs.onSuccess">fm.websync.chat.leaveArgs.onSuccess</see> or <see cref="fm.websync.chat.leaveArgs.onFailure">fm.websync.chat.leaveArgs.onFailure</see>.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  leaveArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };

  /*<span id='method-fm.websync.chat.leaveArgs-setOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the request fails.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  leaveArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };

  /*<span id='method-fm.websync.chat.leaveArgs-setOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  leaveArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };

  /*<span id='method-fm.websync.chat.leaveArgs-setTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets a tag that uniquely identifies a subscription so
  	 other subscriptions with the same channel are not affected.
  	 </div>
  
  	@function setTag
  	@param {String} value
  	@return {void}
  */


  leaveArgs.prototype.setTag = function() {
    var value;
    value = arguments[0];
    return this.setExtensionValueJson("fm.tag", fm.serializer.serializeString(value != null ? value : fm.stringExtensions.empty), false);
  };

  return leaveArgs;

})(fm.websync.baseInputArgs);


/*<span id='cls-fm.websync.chat.joinCompleteArgs'>&nbsp;</span>
*/

/**
@class fm.websync.chat.joinCompleteArgs
 <div>
 Arguments for join complete callbacks.
 </div>

@extends fm.websync.baseCompleteArgs
*/


fm.websync.chat.joinCompleteArgs = (function(_super) {

  __extends(joinCompleteArgs, _super);

  joinCompleteArgs.prototype.__isRejoin = false;

  function joinCompleteArgs() {
    this.getIsRejoin = __bind(this.getIsRejoin, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      joinCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    joinCompleteArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.chat.joinCompleteArgs-getIsRejoin'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the join call was automatically
  	 invoked following a stream failure.
  	 </div>
  
  	@function getIsRejoin
  	@return {Boolean}
  */


  joinCompleteArgs.prototype.getIsRejoin = function() {
    return this.__isRejoin;
  };

  return joinCompleteArgs;

})(fm.websync.baseCompleteArgs);


/*<span id='cls-fm.websync.chat.joinFailureArgs'>&nbsp;</span>
*/

/**
@class fm.websync.chat.joinFailureArgs
 <div>
 Arguments for join failure callbacks.
 </div>

@extends fm.websync.baseFailureArgs
*/


fm.websync.chat.joinFailureArgs = (function(_super) {

  __extends(joinFailureArgs, _super);

  joinFailureArgs.prototype.__channels = null;

  joinFailureArgs.prototype.__isRejoin = false;

  joinFailureArgs.prototype.__userId = null;

  joinFailureArgs.prototype.__userNickname = null;

  function joinFailureArgs() {
    this.getUserNickname = __bind(this.getUserNickname, this);

    this.getUserId = __bind(this.getUserId, this);

    this.getTag = __bind(this.getTag, this);

    this.getIsRejoin = __bind(this.getIsRejoin, this);

    this.getChannels = __bind(this.getChannels, this);

    this.getChannel = __bind(this.getChannel, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      joinFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    joinFailureArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.chat.joinFailureArgs-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel to which the client failed to be subscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.chat.joinFailureArgs.channels">fm.websync.chat.joinFailureArgs.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  joinFailureArgs.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };

  /*<span id='method-fm.websync.chat.joinFailureArgs-getChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channels to which the client failed to be subscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.chat.joinFailureArgs.channel">fm.websync.chat.joinFailureArgs.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
  */


  joinFailureArgs.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };

  /*<span id='method-fm.websync.chat.joinFailureArgs-getIsRejoin'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the join call was automatically
  	 invoked following a stream failure.
  	 </div>
  
  	@function getIsRejoin
  	@return {Boolean}
  */


  joinFailureArgs.prototype.getIsRejoin = function() {
    return this.__isRejoin;
  };

  /*<span id='method-fm.websync.chat.joinFailureArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag associated with the subscribe request.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  joinFailureArgs.prototype.getTag = function() {
    var _ref;
    return (_ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? _ref : fm.stringExtensions.empty;
  };

  /*<span id='method-fm.websync.chat.joinFailureArgs-getUserId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the ID of the current user.
  	 </div>
  
  	@function getUserId
  	@return {String}
  */


  joinFailureArgs.prototype.getUserId = function() {
    return this.__userId;
  };

  /*<span id='method-fm.websync.chat.joinFailureArgs-getUserNickname'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the nickname of the current user.
  	 </div>
  
  	@function getUserNickname
  	@return {String}
  */


  joinFailureArgs.prototype.getUserNickname = function() {
    return this.__userNickname;
  };

  return joinFailureArgs;

})(fm.websync.baseFailureArgs);


/*<span id='cls-fm.websync.chat.joinSuccessArgs'>&nbsp;</span>
*/

/**
@class fm.websync.chat.joinSuccessArgs
 <div>
 Arguments for join success callbacks.
 </div>

@extends fm.websync.baseSuccessArgs
*/


fm.websync.chat.joinSuccessArgs = (function(_super) {

  __extends(joinSuccessArgs, _super);

  joinSuccessArgs.prototype.__channels = null;

  joinSuccessArgs.prototype.__isRejoin = false;

  joinSuccessArgs.prototype.__userId = null;

  joinSuccessArgs.prototype.__userNickname = null;

  joinSuccessArgs.prototype.__users = null;

  function joinSuccessArgs() {
    this.getUsers = __bind(this.getUsers, this);

    this.getUserNickname = __bind(this.getUserNickname, this);

    this.getUserId = __bind(this.getUserId, this);

    this.getTag = __bind(this.getTag, this);

    this.getIsRejoin = __bind(this.getIsRejoin, this);

    this.getChannels = __bind(this.getChannels, this);

    this.getChannel = __bind(this.getChannel, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      joinSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    joinSuccessArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.chat.joinSuccessArgs-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel to which the client was subscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.chat.joinSuccessArgs.channels">fm.websync.chat.joinSuccessArgs.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  joinSuccessArgs.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };

  /*<span id='method-fm.websync.chat.joinSuccessArgs-getChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channels to which the client was subscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.chat.joinSuccessArgs.channel">fm.websync.chat.joinSuccessArgs.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
  */


  joinSuccessArgs.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };

  /*<span id='method-fm.websync.chat.joinSuccessArgs-getIsRejoin'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the join call was automatically
  	 invoked following a stream failure.
  	 </div>
  
  	@function getIsRejoin
  	@return {Boolean}
  */


  joinSuccessArgs.prototype.getIsRejoin = function() {
    return this.__isRejoin;
  };

  /*<span id='method-fm.websync.chat.joinSuccessArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag associated with the subscribe request.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  joinSuccessArgs.prototype.getTag = function() {
    var _ref;
    return (_ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? _ref : fm.stringExtensions.empty;
  };

  /*<span id='method-fm.websync.chat.joinSuccessArgs-getUserId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the ID of the current user.
  	 </div>
  
  	@function getUserId
  	@return {String}
  */


  joinSuccessArgs.prototype.getUserId = function() {
    return this.__userId;
  };

  /*<span id='method-fm.websync.chat.joinSuccessArgs-getUserNickname'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the nickname of the current user.
  	 </div>
  
  	@function getUserNickname
  	@return {String}
  */


  joinSuccessArgs.prototype.getUserNickname = function() {
    return this.__userNickname;
  };

  /*<span id='method-fm.websync.chat.joinSuccessArgs-getUsers'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the array of users in the channel.
  	 </div>
  
  	@function getUsers
  	@return {fm.array}
  */


  joinSuccessArgs.prototype.getUsers = function() {
    return this.__users;
  };

  return joinSuccessArgs;

})(fm.websync.baseSuccessArgs);


/*<span id='cls-fm.websync.chat.leaveCompleteArgs'>&nbsp;</span>
*/

/**
@class fm.websync.chat.leaveCompleteArgs
 <div>
 Arguments for leave complete callbacks.
 </div>

@extends fm.websync.baseCompleteArgs
*/


fm.websync.chat.leaveCompleteArgs = (function(_super) {

  __extends(leaveCompleteArgs, _super);

  function leaveCompleteArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      leaveCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    leaveCompleteArgs.__super__.constructor.call(this);
  }

  return leaveCompleteArgs;

})(fm.websync.baseCompleteArgs);


/*<span id='cls-fm.websync.chat.leaveFailureArgs'>&nbsp;</span>
*/

/**
@class fm.websync.chat.leaveFailureArgs
 <div>
 Arguments for leave failure callbacks.
 </div>

@extends fm.websync.baseFailureArgs
*/


fm.websync.chat.leaveFailureArgs = (function(_super) {

  __extends(leaveFailureArgs, _super);

  leaveFailureArgs.prototype.__channels = null;

  leaveFailureArgs.prototype.__userId = null;

  leaveFailureArgs.prototype.__userNickname = null;

  function leaveFailureArgs() {
    this.getUserNickname = __bind(this.getUserNickname, this);

    this.getUserId = __bind(this.getUserId, this);

    this.getTag = __bind(this.getTag, this);

    this.getChannels = __bind(this.getChannels, this);

    this.getChannel = __bind(this.getChannel, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      leaveFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    leaveFailureArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.chat.leaveFailureArgs-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel from which the client failed to be unsubscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.chat.leaveFailureArgs.channels">fm.websync.chat.leaveFailureArgs.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  leaveFailureArgs.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };

  /*<span id='method-fm.websync.chat.leaveFailureArgs-getChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channels from which the client failed to be unsubscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.chat.leaveFailureArgs.channel">fm.websync.chat.leaveFailureArgs.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
  */


  leaveFailureArgs.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };

  /*<span id='method-fm.websync.chat.leaveFailureArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag associated with the subscribe request.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  leaveFailureArgs.prototype.getTag = function() {
    var _ref;
    return (_ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? _ref : fm.stringExtensions.empty;
  };

  /*<span id='method-fm.websync.chat.leaveFailureArgs-getUserId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the ID of the current user.
  	 </div>
  
  	@function getUserId
  	@return {String}
  */


  leaveFailureArgs.prototype.getUserId = function() {
    return this.__userId;
  };

  /*<span id='method-fm.websync.chat.leaveFailureArgs-getUserNickname'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the nickname of the current user.
  	 </div>
  
  	@function getUserNickname
  	@return {String}
  */


  leaveFailureArgs.prototype.getUserNickname = function() {
    return this.__userNickname;
  };

  return leaveFailureArgs;

})(fm.websync.baseFailureArgs);


/*<span id='cls-fm.websync.chat.leaveSuccessArgs'>&nbsp;</span>
*/

/**
@class fm.websync.chat.leaveSuccessArgs
 <div>
 Arguments for leave success callbacks.
 </div>

@extends fm.websync.baseSuccessArgs
*/


fm.websync.chat.leaveSuccessArgs = (function(_super) {

  __extends(leaveSuccessArgs, _super);

  leaveSuccessArgs.prototype.__channels = null;

  leaveSuccessArgs.prototype.__userId = null;

  leaveSuccessArgs.prototype.__userNickname = null;

  function leaveSuccessArgs() {
    this.getUserNickname = __bind(this.getUserNickname, this);

    this.getUserId = __bind(this.getUserId, this);

    this.getTag = __bind(this.getTag, this);

    this.getChannels = __bind(this.getChannels, this);

    this.getChannel = __bind(this.getChannel, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      leaveSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    leaveSuccessArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.chat.leaveSuccessArgs-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel from which the client was unsubscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.chat.leaveSuccessArgs.channels">fm.websync.chat.leaveSuccessArgs.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  leaveSuccessArgs.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };

  /*<span id='method-fm.websync.chat.leaveSuccessArgs-getChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channels from which the client was unsubscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.chat.leaveSuccessArgs.channel">fm.websync.chat.leaveSuccessArgs.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
  */


  leaveSuccessArgs.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };

  /*<span id='method-fm.websync.chat.leaveSuccessArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag associated with the subscribe request.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  leaveSuccessArgs.prototype.getTag = function() {
    var _ref;
    return (_ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? _ref : fm.stringExtensions.empty;
  };

  /*<span id='method-fm.websync.chat.leaveSuccessArgs-getUserId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the ID of the current user.
  	 </div>
  
  	@function getUserId
  	@return {String}
  */


  leaveSuccessArgs.prototype.getUserId = function() {
    return this.__userId;
  };

  /*<span id='method-fm.websync.chat.leaveSuccessArgs-getUserNickname'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the nickname of the current user.
  	 </div>
  
  	@function getUserNickname
  	@return {String}
  */


  leaveSuccessArgs.prototype.getUserNickname = function() {
    return this.__userNickname;
  };

  return leaveSuccessArgs;

})(fm.websync.baseSuccessArgs);


/*<span id='cls-fm.websync.chat.joinReceiveArgs'>&nbsp;</span>
*/

/**
@class fm.websync.chat.joinReceiveArgs
 <div>
 Arguments for join receive callbacks.
 </div>

@extends fm.websync.subscribeReceiveArgs
*/


fm.websync.chat.joinReceiveArgs = (function(_super) {

  __extends(joinReceiveArgs, _super);

  joinReceiveArgs.prototype.__publishingUser = null;

  joinReceiveArgs.prototype.__userId = null;

  joinReceiveArgs.prototype.__userNickname = null;

  /*<span id='method-fm.websync.chat.joinReceiveArgs-fm.websync.chat.joinReceiveArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.chat.joinReceiveArgs">fm.websync.chat.joinReceiveArgs</see> class.
  	 </div>
  	@function fm.websync.chat.joinReceiveArgs
  	@param {String} channel The channel over which data was received.
  	@param {String} dataJson The data in JSON format.
  	@param {fm.array} dataBytes The data in binary format.
  	@param {fm.websync.connectionType} connectionType The current connection type.
  	@param {Integer} reconnectAfter The amount of time in milliseconds to pause before reconnecting to the server.
  	@return {}
  */


  function joinReceiveArgs() {
    this.getUserNickname = __bind(this.getUserNickname, this);

    this.getUserId = __bind(this.getUserId, this);

    this.getPublishingUser = __bind(this.getPublishingUser, this);

    var channel, connectionType, dataBytes, dataJson, reconnectAfter;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      joinReceiveArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    channel = arguments[0];
    dataJson = arguments[1];
    dataBytes = arguments[2];
    connectionType = arguments[3];
    reconnectAfter = arguments[4];
    joinReceiveArgs.__super__.constructor.call(this, channel, dataJson, dataBytes, connectionType, reconnectAfter);
  }

  /*<span id='method-fm.websync.chat.joinReceiveArgs-getPublishingUser'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the user that published the message.
  	 </div>
  
  	@function getPublishingUser
  	@return {fm.websync.chat.chatUser}
  */


  joinReceiveArgs.prototype.getPublishingUser = function() {
    return this.__publishingUser;
  };

  /*<span id='method-fm.websync.chat.joinReceiveArgs-getUserId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the ID of the current user.
  	 </div>
  
  	@function getUserId
  	@return {String}
  */


  joinReceiveArgs.prototype.getUserId = function() {
    return this.__userId;
  };

  /*<span id='method-fm.websync.chat.joinReceiveArgs-getUserNickname'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the nickname of the current user.
  	 </div>
  
  	@function getUserNickname
  	@return {String}
  */


  joinReceiveArgs.prototype.getUserNickname = function() {
    return this.__userNickname;
  };

  return joinReceiveArgs;

})(fm.websync.subscribeReceiveArgs);


var methodName, _fn, _i, _len, _ref;

_ref = ['join', 'leave'];
_fn = function(methodName) {
  var method;
  method = fm.websync.client.prototype[methodName];
  return fm.websync.client.prototype[methodName] = function() {
    var obj;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      obj = arguments[0];
      return method.call(this, new fm.websync.chat[methodName + 'Args'](obj));
    } else {
      return method.apply(this, arguments);
    }
  };
};
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  methodName = _ref[_i];
  _fn(methodName);
}


return fm.websync.chat;
}));