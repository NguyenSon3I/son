
/*
 * Title: WebSync Client for JavaScript
 * Version: 4.5.1
 * Copyright Frozen Mountain Software 2011+
 */

(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else this[name] = definition();
}('fm.websync', function() {

if (typeof global !== 'undefined' && !global.window) { global.window = global; global.document = { cookie: '' }; }

if (!window.fm) { throw new Error("fm must be loaded before fm.websync."); }

if (!window.fm.websync) { window.fm.websync = {}; }

var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

var __hasProp = {}.hasOwnProperty;

var __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };


fm.websync.crypto = (function() {

  function crypto() {}

  crypto.base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

  crypto.base64Encode = function(b) {
    if (!b) {
      return null;
    }
    return fm.base64.encode(b);
  };

  crypto.base64Decode = function(s) {
    if (!s) {
      return null;
    }
    if (!crypto.base64Regex.test(s)) {
      return null;
    }
    return fm.base64.decode(s);
  };

  crypto.tryBase64Encode = function(b, result) {
    var encoded;
    try {
      encoded = crypto.base64Encode(b);
      result.setValue(encoded);
      if (!encoded) {
        return false;
      }
      return true;
    } catch (error) {
      result.setValue(null);
      return false;
    }
  };

  crypto.tryBase64Decode = function(s, result) {
    var decoded;
    try {
      decoded = crypto.base64Decode(s);
      result.setValue(decoded);
      if (!decoded) {
        return false;
      }
      return true;
    } catch (error) {
      result.setValue(null);
      return false;
    }
  };

  return crypto;

}).call(this);




fm.websync.webSocket = (function() {

  webSocket.getExists = function() {
    return true;
  };

  webSocket._disableBinary = false;

  webSocket.setDisableBinary = function(disableBinary) {
    return webSocket._disableBinary = disableBinary;
  };

  webSocket.getDisableBinary = function() {
    if (typeof Uint8Array === 'undefined') {
      return true;
    }
    return webSocket._disableBinary;
  };

  function webSocket(requestUrl) {
    this.raiseOnResponseReceived = __bind(this.raiseOnResponseReceived, this);

    this.raiseOnRequestCreated = __bind(this.raiseOnRequestCreated, this);

    this.raiseCloseComplete = __bind(this.raiseCloseComplete, this);

    this.raiseReceive = __bind(this.raiseReceive, this);

    this.raiseStreamFailure = __bind(this.raiseStreamFailure, this);

    this.raiseOpenFailure = __bind(this.raiseOpenFailure, this);

    this.raiseOpenSuccess = __bind(this.raiseOpenSuccess, this);

    this.close = __bind(this.close, this);

    this.send = __bind(this.send, this);

    this.open = __bind(this.open, this);

    this.getIsOpen = __bind(this.getIsOpen, this);

    this.getBufferedAmount = __bind(this.getBufferedAmount, this);
    requestUrl = fm.util.absolutizeUrl(requestUrl);
    requestUrl = requestUrl.replace("https://", "wss://");
    requestUrl = requestUrl.replace("http://", "ws://");
    this._requestUrl = requestUrl;
  }

  webSocket.prototype.getBufferedAmount = function() {
    if (!this._webSocket) {
      return 0;
    }
    return this._webSocket.bufferedAmount;
  };

  webSocket.prototype.getIsOpen = function() {
    if (!this._webSocket) {
      return false;
    }
    return this._webSocket.readyState === 1;
  };

  webSocket.prototype.open = function(args) {
    var headers, headersHash, url,
      _this = this;
    url = this._requestUrl;
    headers = args.getHeaders();
    headersHash = {};
    if (headers) {
      headersHash = headers.toHash();
    }
    if (fm.websync.webSocket.getDisableBinary()) {
      headersHash['X-FM-DisableBinary'] = 'true';
    }
    url = fm.httpTransfer.addQueryToUrl(url, 'headers', fm.json.serialize(headersHash));
    if ('WebSocket' in window) {
      this._webSocket = new WebSocket(url);
    } else if ('MozWebSocket' in window) {
      this._webSocket = new MozWebSocket(url);
    }
    if (!this._webSocket) {
      raiseOpenFailure(args, {
        statusCode: 0,
        exception: new Error('Could not create WebSocket.')
      });
      return;
    }
    if (!fm.websync.webSocket.getDisableBinary()) {
      try {
        this._webSocket.binaryType = 'arraybuffer';
      } catch (error) {
        fm.websync.webSocket.setDisableBinary(true);
      }
    }
    this._onRequestCreated = args.getOnRequestCreated();
    this._onResponseReceived = args.getOnResponseReceived();
    this.raiseOnRequestCreated(args);
    this._opening = true;
    this._closing = false;
    this._webSocket.onopen = function(e) {
      _this.raiseOnResponseReceived(args);
      _this._opening = false;
      return _this.raiseOpenSuccess(args);
    };
    this._webSocket.onerror = function(e) {
      if (_this._opening) {
        _this._opening = false;
        return _this.raiseOpenFailure(args, {
          statusCode: e.code,
          exception: new Error(e.message || 'Unspecified WebSocket error.')
        });
      } else if (!_this._closing) {
        return _this.raiseStreamFailure(args, {
          statusCode: e.code,
          exception: new Error(e.message || 'Unspecified WebSocket error.')
        });
      }
    };
    this._webSocket.onclose = function(e) {
      if (_this._opening) {
        _this._opening = false;
        return _this.raiseOpenFailure(args, {
          statusCode: e.code,
          exception: new Error('Could not open WebSocket.')
        });
      } else if (_this._aborting) {
        return _this.raiseStreamFailure(args, {
          statusCode: e.code,
          exception: new Error('WebSocket request timed out.')
        });
      }
    };
    return this._webSocket.onmessage = function(e) {
      var binaryMessage, textMessage;
      if (_this._timer) {
        window.clearTimeout(_this._timer);
      }
      _this.raiseOnResponseReceived(_this._sendArgs);
      _this._sendArgs = null;
      binaryMessage = null;
      textMessage = null;
      if (!fm.websync.webSocket.getDisableBinary() && e.data instanceof ArrayBuffer) {
        binaryMessage = new Uint8Array(e.data);
        fm.log.debug('Received WebSocket binary.');
      } else {
        textMessage = e.data;
        fm.log.debug('Received WebSocket text.');
      }
      return _this.raiseReceive(args, {
        textMessage: textMessage,
        binaryMessage: binaryMessage
      });
    };
  };

  webSocket.prototype.send = function(args) {
    var binary, sentBinary,
      _this = this;
    if (!this._webSocket) {
      return;
    }
    this._sendArgs = args;
    this.raiseOnRequestCreated(args);
    this._timer = window.setTimeout(function() {
      _this._aborting = true;
      return _this._webSocket.close();
    }, args.getTimeout());
    sentBinary = false;
    binary = args.getBinaryMessage();
    if (!fm.websync.webSocket.getDisableBinary() && binary) {
      try {
        this._webSocket.send(binary.buffer);
        sentBinary = true;
      } catch (error) {
        fm.websync.webSocket.setDisableBinary(true);
      }
    }
    if (sentBinary) {
      return fm.log.debug('Sent WebSocket binary.');
    } else {
      this._webSocket.send(args.getTextMessage());
      return fm.log.debug('Sent WebSocket text.');
    }
  };

  webSocket.prototype.close = function(args) {
    var code, reason;
    if (!args) {
      this.close(new fm.websync.webSocketCloseArgs());
    }
    if (!this._webSocket) {
      return false;
    }
    code = args.getStatusCode() || fm.websync.webSocketStatusCode.Normal;
    reason = args.getReason() || '';
    this._closing = true;
    this._webSocket.close(code, reason);
    this._webSocket = null;
    this.raiseCloseComplete(args, {
      statusCode: code,
      reason: reason
    });
    return true;
  };

  webSocket.prototype.raiseOpenSuccess = function(openArgs) {
    var cb;
    cb = openArgs.getOnSuccess();
    if (cb) {
      return cb(new fm.websync.webSocketOpenSuccessArgs());
    }
  };

  webSocket.prototype.raiseOpenFailure = function(openArgs, e) {
    var cb;
    cb = openArgs.getOnFailure();
    if (cb) {
      return cb(new fm.websync.webSocketOpenFailureArgs(e));
    }
  };

  webSocket.prototype.raiseStreamFailure = function(openArgs, e) {
    var cb;
    cb = openArgs.getOnStreamFailure();
    if (cb) {
      return cb(new fm.websync.webSocketStreamFailureArgs(e));
    }
  };

  webSocket.prototype.raiseReceive = function(openArgs, e) {
    var cb;
    cb = openArgs.getOnReceive();
    if (cb) {
      return cb(new fm.websync.webSocketReceiveArgs(e));
    }
  };

  webSocket.prototype.raiseCloseComplete = function(closeArgs, e) {
    var cb;
    cb = closeArgs.getOnComplete();
    if (cb) {
      return cb(new fm.websync.webSocketCloseCompleteArgs(e));
    }
  };

  webSocket.prototype.raiseOnRequestCreated = function(requestArgs) {
    var args, cb;
    cb = this._onRequestCreated();
    if (cb) {
      args = new fm.httpRequestCreatedArgs();
      args.setRequestArgs(requestArgs);
      args.setSender(requestArgs.getSender());
      args.setRequest(null);
      return cb(args);
    }
  };

  webSocket.prototype.raiseOnResponseReceived = function(requestArgs) {
    var args, cb;
    cb = this._onResponseReceived();
    if (cb) {
      args = new fm.httpResponseReceivedArgs();
      args.setRequestArgs(requestArgs);
      args.setSender(requestArgs.getSender());
      args.setResponse(null);
      return cb(args);
    }
  };

  return webSocket;

}).call(this);


/*<span id='cls-fm.websync.connectRetryMode'>&nbsp;</span>
*/

/**
@class fm.websync.connectRetryMode
 <div>
 Various behaviour modes for handling connect retries.
 </div>

@extends fm.enum
*/

fm.websync.connectRetryMode = {
  /*<span id='prop-fm.websync.connectRetryMode-Aggressive'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the client should automatically
  	 retry after a connect failure, even if the failure
  	 originates from a custom server-side event.
  	 </div>
  
  	@field Aggressive
  	@type {fm.websync.connectRetryMode}
  */

  Aggressive: 1,
  /*<span id='prop-fm.websync.connectRetryMode-Intelligent'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the client should automatically
  	 retry after a connect failure, unless the failure
  	 originates from a custom server-side event.
  	 </div>
  
  	@field Intelligent
  	@type {fm.websync.connectRetryMode}
  */

  Intelligent: 2,
  /*<span id='prop-fm.websync.connectRetryMode-None'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the client should not automatically
  	 retry after a connect failure.
  	 </div>
  
  	@field None
  	@type {fm.websync.connectRetryMode}
  */

  None: 3,
  /*<span id='prop-fm.websync.connectRetryMode-Default'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Same as <see cref="fm.websync.connectRetryMode.Intelligent">fm.websync.connectRetryMode.Intelligent</see>.
  	 </div>
  
  	@field Default
  	@type {fm.websync.connectRetryMode}
  */

  Default: 2
};


/*<span id='cls-fm.websync.concurrencyMode'>&nbsp;</span>
*/

/**
@class fm.websync.concurrencyMode
 <div>
 Various behaviour modes for the streaming connection.
 </div>

@extends fm.enum
*/

fm.websync.concurrencyMode = {
  /*<span id='prop-fm.websync.concurrencyMode-Low'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the client will not be competing with
  	 many other clients within the same process.
  	 </div>
  
  	@field Low
  	@type {fm.websync.concurrencyMode}
  */

  Low: 1,
  /*<span id='prop-fm.websync.concurrencyMode-High'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the client will have to compete with
  	 hundreds or thousands of other clients within the same
  	 process for processor time.
  	 </div>
  
  	@field High
  	@type {fm.websync.concurrencyMode}
  */

  High: 2,
  /*<span id='prop-fm.websync.concurrencyMode-Default'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Same as <see cref="fm.websync.concurrencyMode.Low">fm.websync.concurrencyMode.Low</see>.
  	 </div>
  
  	@field Default
  	@type {fm.websync.concurrencyMode}
  */

  Default: 1
};


/*<span id='cls-fm.websync.reconnect'>&nbsp;</span>
*/

/**
@class fm.websync.reconnect
 <div>
 Allowed reconnect advice values for <see cref="fm.websync.message"> Messages</see>.
 </div>

@extends fm.enum
*/

fm.websync.reconnect = {
  /*<span id='prop-fm.websync.reconnect-Retry'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the client should retry its last request.
  	 </div>
  
  	@field Retry
  	@type {fm.websync.reconnect}
  */

  Retry: 1,
  /*<span id='prop-fm.websync.reconnect-Handshake'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the client should attempt to handshake.
  	 </div>
  
  	@field Handshake
  	@type {fm.websync.reconnect}
  */

  Handshake: 2,
  /*<span id='prop-fm.websync.reconnect-None'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the client should not attempt to reconnect.
  	 </div>
  
  	@field None
  	@type {fm.websync.reconnect}
  */

  None: 3
};


/*<span id='cls-fm.websync.connectionType'>&nbsp;</span>
*/

/**
@class fm.websync.connectionType
 <div>
 Allowed connection type values for <see cref="fm.websync.message">Messages</see>.
 </div>

@extends fm.enum
*/

fm.websync.connectionType = {
  /*<span id='prop-fm.websync.connectionType-WebSocket'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the WebSocket connection type is supported.
  	 </div>
  
  	@field WebSocket
  	@type {fm.websync.connectionType}
  */

  WebSocket: 1,
  /*<span id='prop-fm.websync.connectionType-LongPolling'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the long-polling connection type is supported.
  	 </div>
  
  	@field LongPolling
  	@type {fm.websync.connectionType}
  */

  LongPolling: 2,
  /*<span id='prop-fm.websync.connectionType-CallbackPolling'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the callback-polling connection type is supported.
  	 </div>
  
  	@field CallbackPolling
  	@type {fm.websync.connectionType}
  */

  CallbackPolling: 3,
  /*<span id='prop-fm.websync.connectionType-IFrame'>&nbsp;</span>
  */

  /**
  	 <div>
  	 (Unsupported) Indicates that the iframe connection type is supported.
  	 </div>
  
  	@field IFrame
  	@type {fm.websync.connectionType}
  */

  IFrame: 4,
  /*<span id='prop-fm.websync.connectionType-Flash'>&nbsp;</span>
  */

  /**
  	 <div>
  	 (Unsupported) Indicates that the flash connection type is supported.
  	 </div>
  
  	@field Flash
  	@type {fm.websync.connectionType}
  */

  Flash: 5,
  /*<span id='prop-fm.websync.connectionType-Unknown'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the connection type was not recognized.
  	 </div>
  
  	@field Unknown
  	@type {fm.websync.connectionType}
  */

  Unknown: 99
};


/*<span id='cls-fm.websync.messageType'>&nbsp;</span>
*/

/**
@class fm.websync.messageType
 <div>
 Possible message types for <see cref="fm.websync.message">Messages</see>.
 </div>

@extends fm.enum
*/

fm.websync.messageType = {
  /*<span id='prop-fm.websync.messageType-Connect'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Message is a connect request/response.
  	 </div>
  
  	@field Connect
  	@type {fm.websync.messageType}
  */

  Connect: 1,
  /*<span id='prop-fm.websync.messageType-Disconnect'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Message is a disconnect request/response.
  	 </div>
  
  	@field Disconnect
  	@type {fm.websync.messageType}
  */

  Disconnect: 2,
  /*<span id='prop-fm.websync.messageType-Bind'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Messages is a bind request/response.
  	 </div>
  
  	@field Bind
  	@type {fm.websync.messageType}
  */

  Bind: 3,
  /*<span id='prop-fm.websync.messageType-Unbind'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Messages is an unbind request/response.
  	 </div>
  
  	@field Unbind
  	@type {fm.websync.messageType}
  */

  Unbind: 4,
  /*<span id='prop-fm.websync.messageType-Subscribe'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Message is a subscribe request/response.
  	 </div>
  
  	@field Subscribe
  	@type {fm.websync.messageType}
  */

  Subscribe: 5,
  /*<span id='prop-fm.websync.messageType-Unsubscribe'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Message is an unsubscribe request/response.
  	 </div>
  
  	@field Unsubscribe
  	@type {fm.websync.messageType}
  */

  Unsubscribe: 6,
  /*<span id='prop-fm.websync.messageType-Publish'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Message is a publish request/response.
  	 </div>
  
  	@field Publish
  	@type {fm.websync.messageType}
  */

  Publish: 7,
  /*<span id='prop-fm.websync.messageType-Notify'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Message is a notify request/response.
  	 </div>
  
  	@field Notify
  	@type {fm.websync.messageType}
  */

  Notify: 8,
  /*<span id='prop-fm.websync.messageType-Service'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Message is a service request/response.
  	 </div>
  
  	@field Service
  	@type {fm.websync.messageType}
  */

  Service: 9,
  /*<span id='prop-fm.websync.messageType-Stream'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Message is a stream request/response.
  	 </div>
  
  	@field Stream
  	@type {fm.websync.messageType}
  */

  Stream: 10,
  /*<span id='prop-fm.websync.messageType-Unknown'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Message is an unknown request/response.
  	 </div>
  
  	@field Unknown
  	@type {fm.websync.messageType}
  */

  Unknown: 11
};


/*<span id='cls-fm.websync.webSocketStatusCode'>&nbsp;</span>
*/

/**
@class fm.websync.webSocketStatusCode
 <div>
 An enumeration of potential WebSocket status codes.
 </div>

@extends fm.enum
*/

fm.websync.webSocketStatusCode = {
  /*<span id='prop-fm.websync.webSocketStatusCode-Normal'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates normal closure, meaning that the purpose for which
  	 the connection was established has been fulfilled.
  	 </div>
  
  	@field Normal
  	@type {fm.websync.webSocketStatusCode}
  */

  Normal: 1000,
  /*<span id='prop-fm.websync.webSocketStatusCode-GoingAway'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that an endpoint is "going away", such as a server
  	 going down or a browser having navigated away from a page.
  	 </div>
  
  	@field GoingAway
  	@type {fm.websync.webSocketStatusCode}
  */

  GoingAway: 1001,
  /*<span id='prop-fm.websync.webSocketStatusCode-ProtocolError'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that an endpoint is terminating the connection
  	 due to a protocol error.
  	 </div>
  
  	@field ProtocolError
  	@type {fm.websync.webSocketStatusCode}
  */

  ProtocolError: 1002,
  /*<span id='prop-fm.websync.webSocketStatusCode-InvalidType'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that an endpoint is terminating the connection
  	 because it has received a type of data that it cannot accept.
  	 </div>
  
  	@field InvalidType
  	@type {fm.websync.webSocketStatusCode}
  */

  InvalidType: 1003,
  /*<span id='prop-fm.websync.webSocketStatusCode-NoStatus'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that no status code was present in the Close frame.
  	 Reserved for use outside Close frames.
  	 </div>
  
  	@field NoStatus
  	@type {fm.websync.webSocketStatusCode}
  */

  NoStatus: 1005,
  /*<span id='prop-fm.websync.webSocketStatusCode-Abnormal'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the connection was closed abnormally, without
  	 sending a Close frame. Reserved for use outside Close frames.
  	 </div>
  
  	@field Abnormal
  	@type {fm.websync.webSocketStatusCode}
  */

  Abnormal: 1006,
  /*<span id='prop-fm.websync.webSocketStatusCode-InvalidData'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that an endpoint is terminating the connection
  	 because it has received data within a message that was not
  	 consistent with the type of message.
  	 </div>
  
  	@field InvalidData
  	@type {fm.websync.webSocketStatusCode}
  */

  InvalidData: 1007,
  /*<span id='prop-fm.websync.webSocketStatusCode-PolicyViolation'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that an endpoint is terminating the connection
  	 because it has received a message that violates its policy.
  	 </div>
  
  	@field PolicyViolation
  	@type {fm.websync.webSocketStatusCode}
  */

  PolicyViolation: 1008,
  /*<span id='prop-fm.websync.webSocketStatusCode-MessageTooLarge'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that an endpoint is terminating the connection
  	 because it has received a message that is too big for it
  	 to process.
  	 </div>
  
  	@field MessageTooLarge
  	@type {fm.websync.webSocketStatusCode}
  */

  MessageTooLarge: 1009,
  /*<span id='prop-fm.websync.webSocketStatusCode-UnsupportedExtension'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the client is terminating the connection
  	 because it has expected the server to negotiate one or
  	 more extensions, but the server didn't return them in the
  	 response message of the WebSocket handshake.
  	 </div>
  
  	@field UnsupportedExtension
  	@type {fm.websync.webSocketStatusCode}
  */

  UnsupportedExtension: 1010,
  /*<span id='prop-fm.websync.webSocketStatusCode-UnexpectedCondition'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the server is terminating the connection
  	 because it encountered an unexpected condition that
  	 prevented it from fulfilling the request.
  	 </div>
  
  	@field UnexpectedCondition
  	@type {fm.websync.webSocketStatusCode}
  */

  UnexpectedCondition: 1011,
  /*<span id='prop-fm.websync.webSocketStatusCode-SecureHandshakeFailure'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the connection was closed due to a failure
  	 to perform a TLS handshake. Reserved for use outside Close
  	 frames.
  	 </div>
  
  	@field SecureHandshakeFailure
  	@type {fm.websync.webSocketStatusCode}
  */

  SecureHandshakeFailure: 1015
};


/*<span id='cls-fm.websync.backoffArgs'>&nbsp;</span>
*/

/**
@class fm.websync.backoffArgs
 <div>
 Arguments used for <see cref="fm.websync.connectArgs.retryBackoff">fm.websync.connectArgs.retryBackoff</see></div>

@extends fm.object
*/


fm.websync.backoffArgs = (function(_super) {

  __extends(backoffArgs, _super);

  backoffArgs.prototype._index = 0;

  backoffArgs.prototype._lastTimeout = 0;

  function backoffArgs() {
    this.setLastTimeout = __bind(this.setLastTimeout, this);

    this.setIndex = __bind(this.setIndex, this);

    this.getLastTimeout = __bind(this.getLastTimeout, this);

    this.getIndex = __bind(this.getIndex, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      backoffArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    backoffArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.backoffArgs-getIndex'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the current backoff index. Starts at <c>0</c> and
  	 increments by <c>1</c> for each backoff attempt.
  	 </div>
  
  	@function getIndex
  	@return {Integer}
  */


  backoffArgs.prototype.getIndex = function() {
    return this._index;
  };

  /*<span id='method-fm.websync.backoffArgs-getLastTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets last timeout value used.
  	 </div>
  
  	@function getLastTimeout
  	@return {Integer}
  */


  backoffArgs.prototype.getLastTimeout = function() {
    return this._lastTimeout;
  };

  backoffArgs.prototype.setIndex = function() {
    var value;
    value = arguments[0];
    return this._index = value;
  };

  backoffArgs.prototype.setLastTimeout = function() {
    var value;
    value = arguments[0];
    return this._lastTimeout = value;
  };

  return backoffArgs;

})(fm.object);


/*<span id='cls-fm.websync.extensible'>&nbsp;</span>
*/

/**
@class fm.websync.extensible
 <div>
 <p>
 Base class that defines the properties and methods shared by any class that
 is considered extensible by the Bayeux specification.
 </p>
 <p>
 The Bayeux specification defines the Ext field, which allows custom data to be
 stored with a message using a namespaced key to access the information. This class
 provides methods that store and retrieve JSON data stored in this manner. For example,
 the <see cref="fm.websync.extensible.metaJson">fm.websync.extensible.metaJson</see> property uses the Ext field to store its value
 using "fm.meta" as a key.
 </p>
 <p>
 In addition, classes which inherit from <see cref="fm.websync.extensible">fm.websync.extensible</see> can store
 dynamic property values for local read/write access without the need to serialize
 to JSON. This can aid greatly in the
 development of third-party extensions to WebSync. Custom information can be stored
 with method arguments in the "before" event and read out again for further
 processing in the "after" event.
 </p>
 </div>

@extends fm.dynamic
*/


fm.websync.extensible = (function(_super) {

  __extends(extensible, _super);

  extensible.prototype.__extensions = null;

  /*<span id='prop-fm.websync.extensible-_acknowledgementExtensionName'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The reserved extension name for acknowledgement of received messages.
  	 </div>
  
  	@field _acknowledgementExtensionName
  	@type {String}
  */


  extensible._acknowledgementExtensionName = "fm.ack";

  /*<span id='prop-fm.websync.extensible-_disableBinaryExtensionName'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The reserved extension name for disabling the transmission of binary data as binary.
  	 </div>
  
  	@field _disableBinaryExtensionName
  	@type {String}
  */


  extensible._disableBinaryExtensionName = "fm.dbin";

  /*<span id='prop-fm.websync.extensible-_lastClientIdExtensionName'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The reserved extension name for enhanced cleanup of old client IDs.
  	 </div>
  
  	@field _lastClientIdExtensionName
  	@type {String}
  */


  extensible._lastClientIdExtensionName = "fm.lcid";

  /*<span id='prop-fm.websync.extensible-_lastSessionIdExtensionName'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The reserved extension name for enhanced cleanup of old session IDs.
  	 </div>
  
  	@field _lastSessionIdExtensionName
  	@type {String}
  */


  extensible._lastSessionIdExtensionName = "fm.lsid";

  /*<span id='prop-fm.websync.extensible-_metaExtensionName'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The reserved extension name for message/publication meta-data.
  	 </div>
  
  	@field _metaExtensionName
  	@type {String}
  */


  extensible._metaExtensionName = "fm.meta";

  /*<span id='prop-fm.websync.extensible-_notifyClientIdExtensionName'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The reserved extension name for the client ID targeted by a notification.
  	 </div>
  
  	@field _notifyClientIdExtensionName
  	@type {String}
  */


  extensible._notifyClientIdExtensionName = "fm.notify";

  /*<span id='prop-fm.websync.extensible-_notifyingClientExtensionName'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The reserved extension name for records bound to notifying clients.
  	 </div>
  
  	@field _notifyingClientExtensionName
  	@type {String}
  */


  extensible._notifyingClientExtensionName = "fm.notifying";

  /*<span id='prop-fm.websync.extensible-_publishingClientExtensionName'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The reserved extension name for records bound to publishing clients.
  	 </div>
  
  	@field _publishingClientExtensionName
  	@type {String}
  */


  extensible._publishingClientExtensionName = "fm.publishing";

  /*<span id='prop-fm.websync.extensible-_serverActionsExtensionName'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The reserved extension name for passing back server actions to a client.
  	 </div>
  
  	@field _serverActionsExtensionName
  	@type {String}
  */


  extensible._serverActionsExtensionName = "fm.server";

  /*<span id='prop-fm.websync.extensible-_serverTimeoutExtensionName'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The reserved extension name for the server-defined timeout interval.
  	 </div>
  
  	@field _serverTimeoutExtensionName
  	@type {String}
  */


  extensible._serverTimeoutExtensionName = "fm.timeout";

  /*<span id='prop-fm.websync.extensible-_sessionIdExtensionName'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The reserved extension name for the secure session ID.
  	 </div>
  
  	@field _sessionIdExtensionName
  	@type {String}
  */


  extensible._sessionIdExtensionName = "fm.sessionId";

  /*<span id='prop-fm.websync.extensible-_tagExtensionName'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The reserved extension name for tags.
  	 </div>
  
  	@field _tagExtensionName
  	@type {String}
  */


  extensible._tagExtensionName = "fm.tag";

  function extensible() {
    this.setMeta = __bind(this.setMeta, this);

    this.setExtensionValue = __bind(this.setExtensionValue, this);

    this.getMeta = __bind(this.getMeta, this);

    this.getExtensionValue = __bind(this.getExtensionValue, this);

    this.setMetaJson = __bind(this.setMetaJson, this);

    this.setExtensionValueJson = __bind(this.setExtensionValueJson, this);

    this.setExtensions = __bind(this.setExtensions, this);

    this.getMetaJson = __bind(this.getMetaJson, this);

    this.getExtensionValueJson = __bind(this.getExtensionValueJson, this);

    this.getExtensions = __bind(this.getExtensions, this);

    this.getExtensionNames = __bind(this.getExtensionNames, this);

    this.getExtensionCount = __bind(this.getExtensionCount, this);

    this.copyExtensions = __bind(this.copyExtensions, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      extensible.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    extensible.__super__.constructor.call(this);
  }

  extensible.convertKeyToRecord = function() {
    var key;
    key = arguments[0];
    return new fm.websync.record(key);
  };

  extensible.convertRecordToKey = function() {
    var record;
    record = arguments[0];
    return record.getKey();
  };

  /*<span id='method-fm.websync.extensible-sharedGetChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the first channel from an array of channels.
  	 </div>
  	@function sharedGetChannel
  	@param {fm.array} channels The channels to scan.
  	@return {String} The first channel.
  */


  extensible.sharedGetChannel = function() {
    var channels, _var0;
    channels = arguments[0];
    _var0 = channels;
    if ((_var0 === null || typeof _var0 === 'undefined') || (channels.length === 0)) {
      return null;
    }
    return channels[0];
  };

  /*<span id='method-fm.websync.extensible-sharedGetChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Converts an array of channels to itself.
  	 </div>
  	@function sharedGetChannels
  	@param {fm.array} channels The array of channels.
  	@return {fm.array} The array of channels.
  */


  extensible.sharedGetChannels = function() {
    var channels;
    channels = arguments[0];
    return channels;
  };

  /*<span id='method-fm.websync.extensible-sharedGetKey'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the first key from an array of records.
  	 </div>
  	@function sharedGetKey
  	@param {fm.array} records The records to scan.
  	@return {String} The first key.
  */


  extensible.sharedGetKey = function() {
    var record, records, _var0;
    records = arguments[0];
    record = fm.websync.extensible.sharedGetRecord(records);
    _var0 = record;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    return fm.websync.extensible.convertRecordToKey(record);
  };

  /*<span id='method-fm.websync.extensible-sharedGetKeys'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Converts an array of records to an array of keys.
  	 </div>
  	@function sharedGetKeys
  	@param {fm.array} records The array of records.
  	@return {fm.array} The array of keys.
  */


  extensible.sharedGetKeys = function() {
    var list, record, records, _i, _len, _var0, _var1;
    records = arguments[0];
    records = fm.websync.extensible.sharedGetRecords(records);
    _var0 = records;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    list = [];
    _var1 = records;
    for (_i = 0, _len = _var1.length; _i < _len; _i++) {
      record = _var1[_i];
      fm.arrayExtensions.add(list, fm.websync.extensible.convertRecordToKey(record));
    }
    return fm.arrayExtensions.toArray(list);
  };

  /*<span id='method-fm.websync.extensible-sharedGetRecord'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the first record from an array of records.
  	 </div>
  	@function sharedGetRecord
  	@param {fm.array} records The records to scan.
  	@return {fm.websync.record} The first record.
  */


  extensible.sharedGetRecord = function() {
    var records, _var0;
    records = arguments[0];
    _var0 = records;
    if ((_var0 === null || typeof _var0 === 'undefined') || (records.length === 0)) {
      return null;
    }
    return records[0];
  };

  /*<span id='method-fm.websync.extensible-sharedGetRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Converts an array of records to itself.
  	 </div>
  	@function sharedGetRecords
  	@param {fm.array} records The array of records.
  	@return {fm.array} The array of records.
  */


  extensible.sharedGetRecords = function() {
    var records;
    records = arguments[0];
    return records;
  };

  /*<span id='method-fm.websync.extensible-sharedSetChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Converts a channel to a validated channel array.
  	 </div>
  	@function sharedSetChannel
  	@param {String} channel The channel to convert.
  	@param {Boolean} validate Whether or not to validate the channel.
  	@return {fm.array} The validated channel array.
  */


  extensible.sharedSetChannel = function() {
    var channel, error, validate, _var0, _var1, _var2;
    if (arguments.length === 2) {
      channel = arguments[0];
      validate = arguments[1];
      _var0 = channel;
      if (_var0 === null || typeof _var0 === 'undefined') {
        return null;
      }
      error = null;
      _var1 = new fm.holder(error);
      _var2 = fm.websync.extensible.validateChannel(channel, _var1);
      error = _var1.getValue();
      if (!(!validate || _var2)) {
        throw new Error(fm.stringExtensions.format("Invalid channel. {0}", error));
      }
      return [channel];
      return;
    }
    if (arguments.length === 1) {
      channel = arguments[0];
      return fm.websync.extensible.sharedSetChannel(channel, true);
    }
  };

  /*<span id='method-fm.websync.extensible-sharedSetChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Converts an array of channels to an array of validated channels.
  	 </div>
  	@function sharedSetChannels
  	@param {fm.array} channels The array of channels.
  	@param {Boolean} validate Whether or not to validate the channels.
  	@return {fm.array} The array of validated channels.
  */


  extensible.sharedSetChannels = function() {
    var channels, error, str, validate, _i, _len, _var0, _var1, _var2, _var3;
    if (arguments.length === 2) {
      channels = arguments[0];
      validate = arguments[1];
      _var0 = channels;
      if (_var0 !== null && typeof _var0 !== 'undefined') {
        _var1 = channels;
        for (_i = 0, _len = _var1.length; _i < _len; _i++) {
          str = _var1[_i];
          error = null;
          _var2 = new fm.holder(error);
          _var3 = fm.websync.extensible.validateChannel(str, _var2);
          error = _var2.getValue();
          if (!(!validate || _var3)) {
            throw new Error(fm.stringExtensions.format("Invalid channel. {0}", error));
          }
        }
      }
      return channels;
      return;
    }
    if (arguments.length === 1) {
      channels = arguments[0];
      return fm.websync.extensible.sharedSetChannels(channels, true);
    }
  };

  /*<span id='method-fm.websync.extensible-sharedSetKey'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Converts a key to a validated record array.
  	 </div>
  	@function sharedSetKey
  	@param {String} key The key to convert.
  	@param {Boolean} validate Whether or not to validate the record.
  	@return {fm.array} The validated record array.
  */


  extensible.sharedSetKey = function() {
    var error, key, record, validate, _var0, _var1, _var2;
    if (arguments.length === 2) {
      key = arguments[0];
      validate = arguments[1];
      _var0 = key;
      if (_var0 === null || typeof _var0 === 'undefined') {
        return null;
      }
      record = fm.websync.extensible.convertKeyToRecord(key);
      error = null;
      _var1 = new fm.holder(error);
      _var2 = fm.websync.extensible.validateRecord(record, _var1);
      error = _var1.getValue();
      if (!(!validate || _var2)) {
        throw new Error(fm.stringExtensions.format("Invalid record. {0}", error));
      }
      return [record];
      return;
    }
    if (arguments.length === 1) {
      key = arguments[0];
      return fm.websync.extensible.sharedSetKey(key, true);
    }
  };

  /*<span id='method-fm.websync.extensible-sharedSetKeys'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Converts an array of keys to an array of validated records.
  	 </div>
  	@function sharedSetKeys
  	@param {fm.array} keys The array of keys.
  	@param {Boolean} validate Whether or not to validate the records.
  	@return {fm.array} The array of records.
  */


  extensible.sharedSetKeys = function() {
    var error, keys, list, record, str, validate, _i, _len, _var0, _var1, _var2, _var3;
    if (arguments.length === 1) {
      keys = arguments[0];
      return fm.websync.extensible.sharedSetKeys(keys, true);
      return;
    }
    if (arguments.length === 2) {
      keys = arguments[0];
      validate = arguments[1];
      _var0 = keys;
      if (_var0 === null || typeof _var0 === 'undefined') {
        return null;
      }
      list = [];
      _var1 = keys;
      for (_i = 0, _len = _var1.length; _i < _len; _i++) {
        str = _var1[_i];
        record = fm.websync.extensible.convertKeyToRecord(str);
        error = null;
        _var2 = new fm.holder(error);
        _var3 = fm.websync.extensible.validateRecord(record, _var2);
        error = _var2.getValue();
        if (!(!validate || _var3)) {
          throw new Error(fm.stringExtensions.format("Invalid record. {0}", error));
        }
        fm.arrayExtensions.add(list, record);
      }
      return fm.arrayExtensions.toArray(list);
    }
  };

  /*<span id='method-fm.websync.extensible-sharedSetRecord'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Converts a record to a validated record array.
  	 </div>
  	@function sharedSetRecord
  	@param {fm.websync.record} record The record to convert.
  	@param {Boolean} validate Whether or not to validate the record.
  	@return {fm.array} The validated record array.
  */


  extensible.sharedSetRecord = function() {
    var error, record, validate, _var0, _var1;
    if (arguments.length === 2) {
      record = arguments[0];
      validate = arguments[1];
      error = null;
      _var0 = new fm.holder(error);
      _var1 = fm.websync.extensible.validateRecord(record, _var0);
      error = _var0.getValue();
      if (!(!validate || _var1)) {
        throw new Error(fm.stringExtensions.format("Invalid record. {0}", error));
      }
      return [record];
      return;
    }
    if (arguments.length === 1) {
      record = arguments[0];
      return fm.websync.extensible.sharedSetRecord(record, true);
    }
  };

  /*<span id='method-fm.websync.extensible-sharedSetRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Converts an array of records to an array of validated records.
  	 </div>
  	@function sharedSetRecords
  	@param {fm.array} records The array of records.
  	@param {Boolean} validate Whether or not to validate the records.
  	@return {fm.array} The array of validated records.
  */


  extensible.sharedSetRecords = function() {
    var error, record, records, validate, _i, _len, _var0, _var1, _var2, _var3;
    if (arguments.length === 2) {
      records = arguments[0];
      validate = arguments[1];
      _var0 = records;
      if (_var0 !== null && typeof _var0 !== 'undefined') {
        _var1 = records;
        for (_i = 0, _len = _var1.length; _i < _len; _i++) {
          record = _var1[_i];
          error = null;
          _var2 = new fm.holder(error);
          _var3 = fm.websync.extensible.validateRecord(record, _var2);
          error = _var2.getValue();
          if (!(!validate || _var3)) {
            throw new Error(fm.stringExtensions.format("Invalid record. {0}", error));
          }
        }
      }
      return records;
      return;
    }
    if (arguments.length === 1) {
      records = arguments[0];
      return fm.websync.extensible.sharedSetRecords(records, true);
    }
  };

  /*<span id='method-fm.websync.extensible-validateChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Validates a channel.
  	 </div>
  	@function validateChannel
  	@param {String} channel The channel to validate.
  	@param {fm.holder} error The error, if validation failed.
  	@return {Boolean} true if validation succeeded; otherwise false.
  */


  extensible.validateChannel = function() {
    var channel, error, _var0;
    channel = arguments[0];
    error = arguments[1];
    _var0 = channel;
    if (_var0 === null || typeof _var0 === 'undefined') {
      error.setValue("Channel is null.");
      return false;
    }
    if (!fm.stringExtensions.startsWith(channel, "/", fm.stringComparison.Ordinal)) {
      error.setValue("Channel must start with a forward-slash (/).");
      return false;
    }
    if (fm.stringExtensions.indexOf(channel, "*", fm.stringComparison.Ordinal) >= 0) {
      error.setValue("Channel may not contain asterisks (*).");
      return false;
    }
    if (fm.websync.metaChannels.isReservedChannel(channel)) {
      error.setValue("Channel is reserved.");
      return false;
    }
    error.setValue(null);
    return true;
  };

  /*<span id='method-fm.websync.extensible-validateRecord'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Validates a record.
  	 </div>
  	@function validateRecord
  	@param {fm.websync.record} record The record to validate.
  	@param {fm.holder} error The error, if validation failed.
  	@return {Boolean} true if validation succeeded; otherwise false.
  */


  extensible.validateRecord = function() {
    var error, record, _var0;
    record = arguments[0];
    error = arguments[1];
    _var0 = record;
    if (_var0 === null || typeof _var0 === 'undefined') {
      error.setValue("Record is null.");
      return false;
    }
    if (fm.stringExtensions.isNullOrEmpty(record.getKey())) {
      error.setValue("Key is null or empty.");
      return false;
    }
    error.setValue(null);
    return true;
  };

  /*<span id='method-fm.websync.extensible-copyExtensions'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Copies extension values from one instance into this instance.
  	 </div>
  	@function copyExtensions
  	@param {fm.websync.extensible} extensible The object with the extensions to copy.
  	@return {void} This instance.
  */


  extensible.prototype.copyExtensions = function() {
    var extensible, str, _i, _len, _results, _var0;
    extensible = arguments[0];
    _var0 = extensible.getExtensionNames();
    _results = [];
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      str = _var0[_i];
      _results.push(this.setExtensionValueJson(str, extensible.getExtensionValueJson(str), false));
    }
    return _results;
  };

  /*<span id='method-fm.websync.extensible-getExtensionCount'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the number of extensions stored with this instance.
  	 </div>
  
  	@function getExtensionCount
  	@return {Integer}
  */


  extensible.prototype.getExtensionCount = function() {
    return this.getExtensions().getCount();
  };

  /*<span id='method-fm.websync.extensible-getExtensionNames'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the names of the extensions stored with this instance.
  	 </div>
  
  	@function getExtensionNames
  	@return {Array}
  */


  extensible.prototype.getExtensionNames = function() {
    return this.getExtensions().getNames();
  };

  /*<span id='method-fm.websync.extensible-getExtensions'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the internal extensions collection.
  	 </div>
  
  	@function getExtensions
  	@return {fm.websync.extensions}
  */


  extensible.prototype.getExtensions = function() {
    var _var0;
    _var0 = this.__extensions;
    if (_var0 === null || typeof _var0 === 'undefined') {
      this.__extensions = new fm.websync.extensions();
    }
    return this.__extensions;
  };

  /*<span id='method-fm.websync.extensible-getExtensionValueJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a serialized value stored in the extensions.
  	 </div>
  	@function getExtensionValueJson
  	@param {String} name Fully-qualified extension name.
  	@return {String} The extension value in JSON format.
  */


  extensible.prototype.getExtensionValueJson = function() {
    var name;
    name = arguments[0];
    return this.getExtensions().getValueJson(name);
  };

  /*<span id='method-fm.websync.extensible-getMetaJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets meta-data associated with the message/publication.  Must be valid JSON.
  	 </div><div>
  	 Use this property to define meta-data about the request itself, such as
  	 authentication details, etc.
  	 </div>
  
  	@function getMetaJson
  	@return {String}
  */


  extensible.prototype.getMetaJson = function() {
    return this.getExtensionValueJson("fm.meta");
  };

  /*<span id='method-fm.websync.extensible-setExtensions'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the internal extensions collection.
  	 </div>
  
  	@function setExtensions
  	@param {fm.websync.extensions} value
  	@return {void}
  */


  extensible.prototype.setExtensions = function() {
    var value, _var0;
    value = arguments[0];
    _var0 = value;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return this.__extensions = new fm.websync.extensions();
    } else {
      return this.__extensions = value;
    }
  };

  /*<span id='method-fm.websync.extensible-setExtensionValueJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Stores a serialized value in the extensions.  Must be valid JSON.
  	 </div>
  	@function setExtensionValueJson
  	@param {String} name Fully-qualified extension name.
  	@param {String} valueJson The extension value in valid JSON format.
  	@param {Boolean} validate Whether or not to validate the JSON value.
  	@return {void}
  */


  extensible.prototype.setExtensionValueJson = function() {
    var name, validate, valueJson;
    if (arguments.length === 3) {
      name = arguments[0];
      valueJson = arguments[1];
      validate = arguments[2];
      this.getExtensions().setValueJson(name, valueJson, validate);
      this.setIsDirty(true);
      return;
    }
    if (arguments.length === 2) {
      name = arguments[0];
      valueJson = arguments[1];
      this.getExtensions().setValueJson(name, valueJson);
      this.setIsDirty(true);
    }
  };

  /*<span id='method-fm.websync.extensible-setMetaJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets meta-data associated with the message/publication.  Must be valid JSON.
  	 </div><div>
  	 Use this property to define meta-data about the request itself, such as
  	 authentication details, etc.
  	 </div>
  
  	@function setMetaJson
  	@param {String} value
  	@return {void}
  */


  extensible.prototype.setMetaJson = function() {
    var value;
    value = arguments[0];
    return this.setExtensionValueJson("fm.meta", value);
  };

  extensible.prototype.getExtensionValue = function() {
    var name;
    name = arguments[0];
    return fm.json.deserialize(this.getExtensionValueJson.apply(this, arguments));
  };

  extensible.prototype.getMeta = function() {
    return fm.json.deserialize(this.getMetaJson.apply(this, arguments));
  };

  extensible.prototype.setExtensionValue = function() {
    var extensionValue, name, valueJson;
    if (arguments.length === 3) {
      name = arguments[0];
      valueJson = arguments[1];
      extensionValue = arguments[2];
      arguments[arguments.length - 1] = fm.json.serialize(arguments[arguments.length - 1]);
      this.setExtensionValueJson.apply(this, arguments);
      return;
    }
    if (arguments.length === 2) {
      name = arguments[0];
      extensionValue = arguments[1];
      arguments[arguments.length - 1] = fm.json.serialize(arguments[arguments.length - 1]);
      this.setExtensionValueJson.apply(this, arguments);
    }
  };

  extensible.prototype.setMeta = function() {
    var meta;
    meta = arguments[0];
    arguments[arguments.length - 1] = fm.json.serialize(arguments[arguments.length - 1]);
    return this.setMetaJson.apply(this, arguments);
  };

  return extensible;

}).call(this, fm.dynamic);


/*<span id='cls-fm.websync.baseInputArgs'>&nbsp;</span>
*/

/**
@class fm.websync.baseInputArgs
 <div>
 Base input arguments for WebSync <see cref="fm.websync.client">fm.websync.client</see> methods.
 </div>

@extends fm.websync.extensible
*/


fm.websync.baseInputArgs = (function(_super) {

  __extends(baseInputArgs, _super);

  baseInputArgs.prototype._isRetry = false;

  baseInputArgs.prototype._requestTimeout = null;

  baseInputArgs.prototype._requestUrl = null;

  baseInputArgs.prototype._synchronous = null;

  function baseInputArgs() {
    this.setSynchronous = __bind(this.setSynchronous, this);

    this.setRequestUrl = __bind(this.setRequestUrl, this);

    this.setRequestTimeout = __bind(this.setRequestTimeout, this);

    this.setIsRetry = __bind(this.setIsRetry, this);

    this.getSynchronous = __bind(this.getSynchronous, this);

    this.getRequestUrl = __bind(this.getRequestUrl, this);

    this.getRequestTimeout = __bind(this.getRequestTimeout, this);

    this.getIsRetry = __bind(this.getIsRetry, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseInputArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    baseInputArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.baseInputArgs-getIsRetry'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether this method call is a retry following a failure.
  	 </div>
  
  	@function getIsRetry
  	@return {Boolean}
  */


  baseInputArgs.prototype.getIsRetry = function() {
    return this._isRetry;
  };

  /*<span id='method-fm.websync.baseInputArgs-getRequestTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the request timeout to use for this request. This will
  	 override any client-level request timeout settings.
  	 </div>
  
  	@function getRequestTimeout
  	@return {fm.nullable}
  */


  baseInputArgs.prototype.getRequestTimeout = function() {
    return this._requestTimeout;
  };

  /*<span id='method-fm.websync.baseInputArgs-getRequestUrl'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the absolute URL of the WebSync request handler, typically
  	 ending with websync.ashx, to use for this request. Overrides the
  	 client-level setting. This request will be sent using the
  	 <see cref="fm.websync.client.StreamRequestTransfer">fm.websync.client.StreamRequestTransfer</see> class (especially relevant if
  	 WebSockets are in use).
  	 </div>
  
  	@function getRequestUrl
  	@return {String}
  */


  baseInputArgs.prototype.getRequestUrl = function() {
    return this._requestUrl;
  };

  /*<span id='method-fm.websync.baseInputArgs-getSynchronous'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the request should be executed asynchronously.
  	 If <c>true</c>, the request will be executed synchronously.
  	 If <c>false</c>, the request will be executed asynchronously.
  	 If <c>null</c>, the request will be executed synchronously or asynchronously,
  	 depending on the value of <see cref="fm.websync.client.synchronous">fm.websync.client.synchronous</see>.
  	 Defaults to <c>null</c>.
  	 </div>
  
  	@function getSynchronous
  	@return {fm.nullable}
  */


  baseInputArgs.prototype.getSynchronous = function() {
    return this._synchronous;
  };

  /*<span id='method-fm.websync.baseInputArgs-setIsRetry'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets whether this method call is a retry following a failure.
  	 </div>
  
  	@function setIsRetry
  	@param {Boolean} value
  	@return {void}
  */


  baseInputArgs.prototype.setIsRetry = function() {
    var value;
    value = arguments[0];
    return this._isRetry = value;
  };

  /*<span id='method-fm.websync.baseInputArgs-setRequestTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the request timeout to use for this request. This will
  	 override any client-level request timeout settings.
  	 </div>
  
  	@function setRequestTimeout
  	@param {fm.nullable} value
  	@return {void}
  */


  baseInputArgs.prototype.setRequestTimeout = function() {
    var value;
    value = arguments[0];
    return this._requestTimeout = value;
  };

  /*<span id='method-fm.websync.baseInputArgs-setRequestUrl'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the absolute URL of the WebSync request handler, typically
  	 ending with websync.ashx, to use for this request. Overrides the
  	 client-level setting. This request will be sent using the
  	 <see cref="fm.websync.client.StreamRequestTransfer">fm.websync.client.StreamRequestTransfer</see> class (especially relevant if
  	 WebSockets are in use).
  	 </div>
  
  	@function setRequestUrl
  	@param {String} value
  	@return {void}
  */


  baseInputArgs.prototype.setRequestUrl = function() {
    var value;
    value = arguments[0];
    return this._requestUrl = value;
  };

  /*<span id='method-fm.websync.baseInputArgs-setSynchronous'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets whether the request should be executed asynchronously.
  	 If <c>true</c>, the request will be executed synchronously.
  	 If <c>false</c>, the request will be executed asynchronously.
  	 If <c>null</c>, the request will be executed synchronously or asynchronously,
  	 depending on the value of <see cref="fm.websync.client.synchronous">fm.websync.client.synchronous</see>.
  	 Defaults to <c>null</c>.
  	 </div>
  
  	@function setSynchronous
  	@param {fm.nullable} value
  	@return {void}
  */


  baseInputArgs.prototype.setSynchronous = function() {
    var value;
    value = arguments[0];
    return this._synchronous = value;
  };

  return baseInputArgs;

})(fm.websync.extensible);


/*<span id='cls-fm.websync.baseOutputArgs'>&nbsp;</span>
*/

/**
@class fm.websync.baseOutputArgs
 <div>
 Base output arguments for WebSync <see cref="fm.websync.baseOutputArgs.client">fm.websync.baseOutputArgs.client</see> methods.
 </div>

@extends fm.websync.extensible
*/


fm.websync.baseOutputArgs = (function(_super) {

  __extends(baseOutputArgs, _super);

  baseOutputArgs.prototype.__timestamp = null;

  baseOutputArgs.prototype._client = null;

  function baseOutputArgs() {
    this.setTimestamp = __bind(this.setTimestamp, this);

    this.setClient = __bind(this.setClient, this);

    this.getTimestamp = __bind(this.getTimestamp, this);

    this.getClient = __bind(this.getClient, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseOutputArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    baseOutputArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.baseOutputArgs-getClient'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the active WebSync <see cref="fm.websync.baseOutputArgs.client">fm.websync.baseOutputArgs.client</see> who made the request.
  	 </div>
  
  	@function getClient
  	@return {fm.websync.client}
  */


  baseOutputArgs.prototype.getClient = function() {
    return this._client;
  };

  /*<span id='method-fm.websync.baseOutputArgs-getTimestamp'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the date/time the message was processed on the server (in UTC/GMT).
  	 </div>
  
  	@function getTimestamp
  	@return {fm.nullable}
  */


  baseOutputArgs.prototype.getTimestamp = function() {
    return this.__timestamp;
  };

  /*<span id='method-fm.websync.baseOutputArgs-setClient'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the active WebSync <see cref="fm.websync.baseOutputArgs.client">fm.websync.baseOutputArgs.client</see> who made the request.
  	 </div>
  
  	@function setClient
  	@param {fm.websync.client} value
  	@return {void}
  */


  baseOutputArgs.prototype.setClient = function() {
    var value;
    value = arguments[0];
    return this._client = value;
  };

  /*<span id='method-fm.websync.baseOutputArgs-setTimestamp'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the date/time the message was processed on the server (in UTC/GMT).
  	 </div>
  
  	@function setTimestamp
  	@param {fm.nullable} value
  	@return {void}
  */


  baseOutputArgs.prototype.setTimestamp = function() {
    var value;
    value = arguments[0];
    if (value !== null) {
      return this.__timestamp = value;
    } else {
      return this.__timestamp = null;
    }
  };

  return baseOutputArgs;

})(fm.websync.extensible);


/*<span id='cls-fm.websync.basePublisherEventArgs'>&nbsp;</span>
*/

/**
@class fm.websync.basePublisherEventArgs
 <div>
 Base arguments for <see cref="fm.websync.basePublisherEventArgs.publisher">fm.websync.basePublisherEventArgs.publisher</see>-triggered events.
 </div>

@extends fm.object
*/


fm.websync.basePublisherEventArgs = (function(_super) {

  __extends(basePublisherEventArgs, _super);

  basePublisherEventArgs.prototype._publisher = null;

  function basePublisherEventArgs() {
    this.setPublisher = __bind(this.setPublisher, this);

    this.getPublisher = __bind(this.getPublisher, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      basePublisherEventArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    basePublisherEventArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.basePublisherEventArgs-getPublisher'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the <see cref="fm.websync.basePublisherEventArgs.publisher">fm.websync.basePublisherEventArgs.publisher</see> triggering the event.
  	 </div>
  
  	@function getPublisher
  	@return {fm.websync.publisher}
  */


  basePublisherEventArgs.prototype.getPublisher = function() {
    return this._publisher;
  };

  /*<span id='method-fm.websync.basePublisherEventArgs-setPublisher'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the <see cref="fm.websync.basePublisherEventArgs.publisher">fm.websync.basePublisherEventArgs.publisher</see> triggering the event.
  	 </div>
  
  	@function setPublisher
  	@param {fm.websync.publisher} value
  	@return {void}
  */


  basePublisherEventArgs.prototype.setPublisher = function() {
    var value;
    value = arguments[0];
    return this._publisher = value;
  };

  return basePublisherEventArgs;

})(fm.object);


/*<span id='cls-fm.websync.basePublisherResponseEventArgs'>&nbsp;</span>
*/

/**
@class fm.websync.basePublisherResponseEventArgs
 <div>
 Base arguments for <see cref="fm.websync.publisher">fm.websync.publisher</see> events that occur
 after a response is received.
 </div>

@extends fm.websync.basePublisherEventArgs
*/


fm.websync.basePublisherResponseEventArgs = (function(_super) {

  __extends(basePublisherResponseEventArgs, _super);

  basePublisherResponseEventArgs.prototype._exception = null;

  function basePublisherResponseEventArgs() {
    this.setException = __bind(this.setException, this);

    this.getException = __bind(this.getException, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      basePublisherResponseEventArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    basePublisherResponseEventArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.basePublisherResponseEventArgs-getException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the exception generated while completing the request, if any.
  	 Will be <c>null</c> if no exception was generated.
  	 </div>
  
  	@function getException
  	@return {Error}
  */


  basePublisherResponseEventArgs.prototype.getException = function() {
    return this._exception;
  };

  /*<span id='method-fm.websync.basePublisherResponseEventArgs-setException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the exception generated while completing the request, if any.
  	 Will be <c>null</c> if no exception was generated.
  	 </div>
  
  	@function setException
  	@param {Error} value
  	@return {void}
  */


  basePublisherResponseEventArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  return basePublisherResponseEventArgs;

})(fm.websync.basePublisherEventArgs);


/*<span id='cls-fm.websync.basePublisherResponseEventArgsGeneric'>&nbsp;</span>
*/

/**
@class fm.websync.basePublisherResponseEventArgsGeneric
 <div>
 Generic base arguments for <see cref="fm.websync.publisher">fm.websync.publisher</see> events that occur
 after a response is received.
 </div>

@extends fm.websync.basePublisherResponseEventArgs
*/


fm.websync.basePublisherResponseEventArgsGeneric = (function(_super) {

  __extends(basePublisherResponseEventArgsGeneric, _super);

  basePublisherResponseEventArgsGeneric.prototype._requests = null;

  basePublisherResponseEventArgsGeneric.prototype._responses = null;

  function basePublisherResponseEventArgsGeneric() {
    this.setResponses = __bind(this.setResponses, this);

    this.setRequests = __bind(this.setRequests, this);

    this.getResponses = __bind(this.getResponses, this);

    this.getRequests = __bind(this.getRequests, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      basePublisherResponseEventArgsGeneric.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    basePublisherResponseEventArgsGeneric.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.basePublisherResponseEventArgsGeneric-getRequests'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the requests sent to the server.
  	 </div>
  
  	@function getRequests
  	@return {fm.array}
  */


  basePublisherResponseEventArgsGeneric.prototype.getRequests = function() {
    return this._requests;
  };

  /*<span id='method-fm.websync.basePublisherResponseEventArgsGeneric-getResponses'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the responses received from the server.
  	 </div>
  
  	@function getResponses
  	@return {fm.array}
  */


  basePublisherResponseEventArgsGeneric.prototype.getResponses = function() {
    return this._responses;
  };

  /*<span id='method-fm.websync.basePublisherResponseEventArgsGeneric-setRequests'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the requests sent to the server.
  	 </div>
  
  	@function setRequests
  	@param {fm.array} value
  	@return {void}
  */


  basePublisherResponseEventArgsGeneric.prototype.setRequests = function() {
    var value;
    value = arguments[0];
    return this._requests = value;
  };

  /*<span id='method-fm.websync.basePublisherResponseEventArgsGeneric-setResponses'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the responses received from the server.
  	 </div>
  
  	@function setResponses
  	@param {fm.array} value
  	@return {void}
  */


  basePublisherResponseEventArgsGeneric.prototype.setResponses = function() {
    var value;
    value = arguments[0];
    return this._responses = value;
  };

  return basePublisherResponseEventArgsGeneric;

})(fm.websync.basePublisherResponseEventArgs);


/*<span id='cls-fm.websync.basePublisherRequestEventArgs'>&nbsp;</span>
*/

/**
@class fm.websync.basePublisherRequestEventArgs
 <div>
 Base arguments for <see cref="fm.websync.publisher">fm.websync.publisher</see> events that occur
 before a request is sent.
 </div>

@extends fm.websync.basePublisherEventArgs
*/


fm.websync.basePublisherRequestEventArgs = (function(_super) {

  __extends(basePublisherRequestEventArgs, _super);

  basePublisherRequestEventArgs.prototype._cancel = false;

  function basePublisherRequestEventArgs() {
    this.setCancel = __bind(this.setCancel, this);

    this.getCancel = __bind(this.getCancel, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      basePublisherRequestEventArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    basePublisherRequestEventArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.basePublisherRequestEventArgs-getCancel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether or not to cancel the request.
  	 If set to <c>true</c>, the request will not be processed.
  	 Defaults to <c>false</c>.
  	 </div>
  
  	@function getCancel
  	@return {Boolean}
  */


  basePublisherRequestEventArgs.prototype.getCancel = function() {
    return this._cancel;
  };

  /*<span id='method-fm.websync.basePublisherRequestEventArgs-setCancel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets whether or not to cancel the request.
  	 If set to <c>true</c>, the request will not be processed.
  	 Defaults to <c>false</c>.
  	 </div>
  
  	@function setCancel
  	@param {Boolean} value
  	@return {void}
  */


  basePublisherRequestEventArgs.prototype.setCancel = function() {
    var value;
    value = arguments[0];
    return this._cancel = value;
  };

  return basePublisherRequestEventArgs;

})(fm.websync.basePublisherEventArgs);


/*<span id='cls-fm.websync.basePublisherRequestEventArgsGeneric'>&nbsp;</span>
*/

/**
@class fm.websync.basePublisherRequestEventArgsGeneric
 <div>
 Generic base arguments for <see cref="fm.websync.publisher">fm.websync.publisher</see> events that occur
 before a request is sent.
 </div>

@extends fm.websync.basePublisherRequestEventArgs
*/


fm.websync.basePublisherRequestEventArgsGeneric = (function(_super) {

  __extends(basePublisherRequestEventArgsGeneric, _super);

  basePublisherRequestEventArgsGeneric.prototype._requests = null;

  function basePublisherRequestEventArgsGeneric() {
    this.setRequests = __bind(this.setRequests, this);

    this.getRequests = __bind(this.getRequests, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      basePublisherRequestEventArgsGeneric.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    basePublisherRequestEventArgsGeneric.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.basePublisherRequestEventArgsGeneric-getRequests'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the requests being sent to the server.
  	 </div>
  
  	@function getRequests
  	@return {fm.array}
  */


  basePublisherRequestEventArgsGeneric.prototype.getRequests = function() {
    return this._requests;
  };

  /*<span id='method-fm.websync.basePublisherRequestEventArgsGeneric-setRequests'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the requests being sent to the server.
  	 </div>
  
  	@function setRequests
  	@param {fm.array} value
  	@return {void}
  */


  basePublisherRequestEventArgsGeneric.prototype.setRequests = function() {
    var value;
    value = arguments[0];
    return this._requests = value;
  };

  return basePublisherRequestEventArgsGeneric;

})(fm.websync.basePublisherRequestEventArgs);


/*<span id='cls-fm.websync.baseClientEventArgs'>&nbsp;</span>
*/

/**
@class fm.websync.baseClientEventArgs
 <div>
 Base arguments for <see cref="fm.websync.baseClientEventArgs.client">fm.websync.baseClientEventArgs.client</see>-triggered events.
 </div>

@extends fm.object
*/


fm.websync.baseClientEventArgs = (function(_super) {

  __extends(baseClientEventArgs, _super);

  baseClientEventArgs.prototype._client = null;

  function baseClientEventArgs() {
    this.setClient = __bind(this.setClient, this);

    this.getClient = __bind(this.getClient, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseClientEventArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    baseClientEventArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.baseClientEventArgs-getClient'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the <see cref="fm.websync.baseClientEventArgs.client">fm.websync.baseClientEventArgs.client</see> triggering the event.
  	 </div>
  
  	@function getClient
  	@return {fm.websync.client}
  */


  baseClientEventArgs.prototype.getClient = function() {
    return this._client;
  };

  /*<span id='method-fm.websync.baseClientEventArgs-setClient'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the <see cref="fm.websync.baseClientEventArgs.client">fm.websync.baseClientEventArgs.client</see> triggering the event.
  	 </div>
  
  	@function setClient
  	@param {fm.websync.client} value
  	@return {void}
  */


  baseClientEventArgs.prototype.setClient = function() {
    var value;
    value = arguments[0];
    return this._client = value;
  };

  return baseClientEventArgs;

})(fm.object);


/*<span id='cls-fm.websync.baseClientEndEventArgs'>&nbsp;</span>
*/

/**
@class fm.websync.baseClientEndEventArgs
 <div>
 Base arguments for <see cref="fm.websync.client">fm.websync.client</see> events that occur
 after a response has been processed.
 </div>

@extends fm.websync.baseClientEventArgs
*/


fm.websync.baseClientEndEventArgs = (function(_super) {

  __extends(baseClientEndEventArgs, _super);

  baseClientEndEventArgs.prototype._exception = null;

  baseClientEndEventArgs.prototype._response = null;

  function baseClientEndEventArgs() {
    this.setResponse = __bind(this.setResponse, this);

    this.setException = __bind(this.setException, this);

    this.getResponse = __bind(this.getResponse, this);

    this.getException = __bind(this.getException, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseClientEndEventArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    baseClientEndEventArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.baseClientEndEventArgs-getException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the exception generated while completing the request, if any.
  	 Will be <c>null</c> if no exception was generated.
  	 </div>
  
  	@function getException
  	@return {Error}
  */


  baseClientEndEventArgs.prototype.getException = function() {
    return this._exception;
  };

  /*<span id='method-fm.websync.baseClientEndEventArgs-getResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the response received from the server.
  	 </div>
  
  	@function getResponse
  	@return {fm.websync.message}
  */


  baseClientEndEventArgs.prototype.getResponse = function() {
    return this._response;
  };

  /*<span id='method-fm.websync.baseClientEndEventArgs-setException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the exception generated while completing the request, if any.
  	 Will be <c>null</c> if no exception was generated.
  	 </div>
  
  	@function setException
  	@param {Error} value
  	@return {void}
  */


  baseClientEndEventArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  /*<span id='method-fm.websync.baseClientEndEventArgs-setResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the response received from the server.
  	 </div>
  
  	@function setResponse
  	@param {fm.websync.message} value
  	@return {void}
  */


  baseClientEndEventArgs.prototype.setResponse = function() {
    var value;
    value = arguments[0];
    return this._response = value;
  };

  return baseClientEndEventArgs;

})(fm.websync.baseClientEventArgs);


/*<span id='cls-fm.websync.baseClientEndEventArgsGeneric'>&nbsp;</span>
*/

/**
@class fm.websync.baseClientEndEventArgsGeneric
 <div>
 Generic base arguments for <see cref="fm.websync.client">fm.websync.client</see> events that occur
 after a response has been processed.
 </div>

@extends fm.websync.baseClientEndEventArgs
*/


fm.websync.baseClientEndEventArgsGeneric = (function(_super) {

  __extends(baseClientEndEventArgsGeneric, _super);

  baseClientEndEventArgsGeneric.prototype._methodArgs = null;

  function baseClientEndEventArgsGeneric() {
    this.setMethodArgs = __bind(this.setMethodArgs, this);

    this.getMethodArgs = __bind(this.getMethodArgs, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseClientEndEventArgsGeneric.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    baseClientEndEventArgsGeneric.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.baseClientEndEventArgsGeneric-getMethodArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the original arguments passed into the client method.
  	 </div>
  
  	@function getMethodArgs
  	@return {fm.object}
  */


  baseClientEndEventArgsGeneric.prototype.getMethodArgs = function() {
    return this._methodArgs;
  };

  /*<span id='method-fm.websync.baseClientEndEventArgsGeneric-setMethodArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the original arguments passed into the client method.
  	 </div>
  
  	@function setMethodArgs
  	@param {fm.object} value
  	@return {void}
  */


  baseClientEndEventArgsGeneric.prototype.setMethodArgs = function() {
    var value;
    value = arguments[0];
    return this._methodArgs = value;
  };

  return baseClientEndEventArgsGeneric;

})(fm.websync.baseClientEndEventArgs);


/*<span id='cls-fm.websync.baseClientResponseEventArgs'>&nbsp;</span>
*/

/**
@class fm.websync.baseClientResponseEventArgs
 <div>
 Base arguments for <see cref="fm.websync.client">fm.websync.client</see> events that occur
 after a response is received.
 </div>

@extends fm.websync.baseClientEventArgs
*/


fm.websync.baseClientResponseEventArgs = (function(_super) {

  __extends(baseClientResponseEventArgs, _super);

  baseClientResponseEventArgs.prototype._exception = null;

  baseClientResponseEventArgs.prototype._response = null;

  function baseClientResponseEventArgs() {
    this.setResponse = __bind(this.setResponse, this);

    this.setException = __bind(this.setException, this);

    this.getResponse = __bind(this.getResponse, this);

    this.getException = __bind(this.getException, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseClientResponseEventArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    baseClientResponseEventArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.baseClientResponseEventArgs-getException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the exception generated while completing the request, if any.
  	 Will be <c>null</c> if no exception was generated.
  	 </div>
  
  	@function getException
  	@return {Error}
  */


  baseClientResponseEventArgs.prototype.getException = function() {
    return this._exception;
  };

  /*<span id='method-fm.websync.baseClientResponseEventArgs-getResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the response received from the server.
  	 </div>
  
  	@function getResponse
  	@return {fm.websync.message}
  */


  baseClientResponseEventArgs.prototype.getResponse = function() {
    return this._response;
  };

  /*<span id='method-fm.websync.baseClientResponseEventArgs-setException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the exception generated while completing the request, if any.
  	 Will be <c>null</c> if no exception was generated.
  	 </div>
  
  	@function setException
  	@param {Error} value
  	@return {void}
  */


  baseClientResponseEventArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  /*<span id='method-fm.websync.baseClientResponseEventArgs-setResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the response received from the server.
  	 </div>
  
  	@function setResponse
  	@param {fm.websync.message} value
  	@return {void}
  */


  baseClientResponseEventArgs.prototype.setResponse = function() {
    var value;
    value = arguments[0];
    return this._response = value;
  };

  return baseClientResponseEventArgs;

})(fm.websync.baseClientEventArgs);


/*<span id='cls-fm.websync.baseClientResponseEventArgsGeneric'>&nbsp;</span>
*/

/**
@class fm.websync.baseClientResponseEventArgsGeneric
 <div>
 Generic base arguments for <see cref="fm.websync.client">fm.websync.client</see> events that occur
 after a response is received.
 </div>

@extends fm.websync.baseClientResponseEventArgs
*/


fm.websync.baseClientResponseEventArgsGeneric = (function(_super) {

  __extends(baseClientResponseEventArgsGeneric, _super);

  baseClientResponseEventArgsGeneric.prototype._methodArgs = null;

  function baseClientResponseEventArgsGeneric() {
    this.setMethodArgs = __bind(this.setMethodArgs, this);

    this.getMethodArgs = __bind(this.getMethodArgs, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseClientResponseEventArgsGeneric.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    baseClientResponseEventArgsGeneric.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.baseClientResponseEventArgsGeneric-getMethodArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the original arguments passed into the client method.
  	 </div>
  
  	@function getMethodArgs
  	@return {fm.object}
  */


  baseClientResponseEventArgsGeneric.prototype.getMethodArgs = function() {
    return this._methodArgs;
  };

  /*<span id='method-fm.websync.baseClientResponseEventArgsGeneric-setMethodArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the original arguments passed into the client method.
  	 </div>
  
  	@function setMethodArgs
  	@param {fm.object} value
  	@return {void}
  */


  baseClientResponseEventArgsGeneric.prototype.setMethodArgs = function() {
    var value;
    value = arguments[0];
    return this._methodArgs = value;
  };

  return baseClientResponseEventArgsGeneric;

})(fm.websync.baseClientResponseEventArgs);


/*<span id='cls-fm.websync.clientNotifyResponseArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientNotifyResponseArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnNotifyResponse">fm.websync.client.addOnNotifyResponse</see>.
 </div>

@extends fm.websync.baseClientResponseEventArgsGeneric
*/


fm.websync.clientNotifyResponseArgs = (function(_super) {

  __extends(clientNotifyResponseArgs, _super);

  function clientNotifyResponseArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientNotifyResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientNotifyResponseArgs.__super__.constructor.call(this);
  }

  return clientNotifyResponseArgs;

})(fm.websync.baseClientResponseEventArgsGeneric);


/*<span id='cls-fm.websync.baseServerArgs'>&nbsp;</span>
*/

/**
@class fm.websync.baseServerArgs
 <div>
 Base arguments for <see cref="fm.websync.connectArgs">fm.websync.connectArgs</see> "OnServer" callbacks.
 </div>

@extends fm.websync.baseOutputArgs
*/


fm.websync.baseServerArgs = (function(_super) {

  __extends(baseServerArgs, _super);

  function baseServerArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseServerArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    baseServerArgs.__super__.constructor.call(this);
  }

  return baseServerArgs;

})(fm.websync.baseOutputArgs);


/*<span id='cls-fm.websync.baseSuccessArgs'>&nbsp;</span>
*/

/**
@class fm.websync.baseSuccessArgs
 <div>
 Base arguments for <see cref="fm.websync.client">fm.websync.client</see> "OnSuccess" callbacks.
 </div>

@extends fm.websync.baseOutputArgs
*/


fm.websync.baseSuccessArgs = (function(_super) {

  __extends(baseSuccessArgs, _super);

  function baseSuccessArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    baseSuccessArgs.__super__.constructor.call(this);
  }

  return baseSuccessArgs;

})(fm.websync.baseOutputArgs);


/*<span id='cls-fm.websync.baseReceiveArgs'>&nbsp;</span>
*/

/**
@class fm.websync.baseReceiveArgs
 <div>
 Arguments for <see cref="fm.websync.subscribeArgs.onReceive">fm.websync.subscribeArgs.onReceive</see>.
 </div>

@extends fm.websync.baseSuccessArgs
*/


fm.websync.baseReceiveArgs = (function(_super) {

  __extends(baseReceiveArgs, _super);

  baseReceiveArgs.prototype.__connectionType = null;

  baseReceiveArgs.prototype.__dataBytes = null;

  baseReceiveArgs.prototype.__dataJson = null;

  baseReceiveArgs.prototype._reconnectAfter = 0;

  /*<span id='method-fm.websync.baseReceiveArgs-fm.websync.baseReceiveArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.baseReceiveArgs">fm.websync.baseReceiveArgs</see> class.
  	 </div>
  	@function fm.websync.baseReceiveArgs
  	@param {String} dataJson The data in JSON format.
  	@param {fm.array} dataBytes The data in binary format.
  	@param {fm.websync.connectionType} connectionType The current connection type.
  	@param {Integer} reconnectAfter The amount of time in milliseconds to pause before reconnecting to the server.
  	@return {}
  */


  function baseReceiveArgs() {
    this.getData = __bind(this.getData, this);

    this.setReconnectAfter = __bind(this.setReconnectAfter, this);

    this.getTag = __bind(this.getTag, this);

    this.getReconnectAfter = __bind(this.getReconnectAfter, this);

    this.getIsBinary = __bind(this.getIsBinary, this);

    this.getDataJson = __bind(this.getDataJson, this);

    this.getDataBytes = __bind(this.getDataBytes, this);

    this.getConnectionType = __bind(this.getConnectionType, this);

    var connectionType, dataBytes, dataJson, reconnectAfter;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseReceiveArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    dataJson = arguments[0];
    dataBytes = arguments[1];
    connectionType = arguments[2];
    reconnectAfter = arguments[3];
    baseReceiveArgs.__super__.constructor.call(this);
    this.__dataJson = dataJson;
    this.__dataBytes = dataBytes;
    this.__connectionType = connectionType;
    this.setReconnectAfter(reconnectAfter);
  }

  /*<span id='method-fm.websync.baseReceiveArgs-getConnectionType'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the current connection type.
  	 </div>
  
  	@function getConnectionType
  	@return {fm.websync.connectionType}
  */


  baseReceiveArgs.prototype.getConnectionType = function() {
    return this.__connectionType;
  };

  /*<span id='method-fm.websync.baseReceiveArgs-getDataBytes'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data that was sent in binary format.
  	 </div>
  
  	@function getDataBytes
  	@return {fm.array}
  */


  baseReceiveArgs.prototype.getDataBytes = function() {
    var decoded, valueJson, _var0, _var1, _var2, _var3;
    decoded = this.__dataBytes;
    valueJson = this.__dataJson;
    _var0 = decoded;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return decoded;
    }
    _var1 = valueJson;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      _var2 = new fm.holder(decoded);
      _var3 = fm.websync.crypto.tryBase64Decode(fm.serializer.deserializeString(valueJson), _var2);
      decoded = _var2.getValue();
      _var3;

      this.__dataBytes = decoded;
      return decoded;
    }
    return null;
  };

  /*<span id='method-fm.websync.baseReceiveArgs-getDataJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data that was sent in JSON format.
  	 </div>
  
  	@function getDataJson
  	@return {String}
  */


  baseReceiveArgs.prototype.getDataJson = function() {
    var b, str, _var0, _var1;
    str = this.__dataJson;
    b = this.__dataBytes;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return str;
    }
    _var1 = b;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      str = fm.serializer.serializeString(fm.websync.crypto.base64Encode(b));
      this.__dataJson = str;
      return str;
    }
    return null;
  };

  /*<span id='method-fm.websync.baseReceiveArgs-getIsBinary'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether or not the data is binary.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
  */


  baseReceiveArgs.prototype.getIsBinary = function() {
    var _var0;
    _var0 = this.getDataBytes();
    return _var0 !== null && typeof _var0 !== 'undefined';
  };

  /*<span id='method-fm.websync.baseReceiveArgs-getReconnectAfter'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the amount of time in milliseconds to pause
  	 before reconnecting to the server.
  	 </div>
  
  	@function getReconnectAfter
  	@return {Integer}
  */


  baseReceiveArgs.prototype.getReconnectAfter = function() {
    return this._reconnectAfter;
  };

  /*<span id='method-fm.websync.baseReceiveArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  baseReceiveArgs.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };

  /*<span id='method-fm.websync.baseReceiveArgs-setReconnectAfter'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the amount of time in milliseconds to pause
  	 before reconnecting to the server.
  	 </div>
  
  	@function setReconnectAfter
  	@param {Integer} value
  	@return {void}
  */


  baseReceiveArgs.prototype.setReconnectAfter = function() {
    var value;
    value = arguments[0];
    return this._reconnectAfter = value;
  };

  baseReceiveArgs.prototype.getData = function() {
    return fm.json.deserialize(this.getDataJson.apply(this, arguments));
  };

  return baseReceiveArgs;

})(fm.websync.baseSuccessArgs);


/*<span id='cls-fm.websync.baseClientRequestEventArgs'>&nbsp;</span>
*/

/**
@class fm.websync.baseClientRequestEventArgs
 <div>
 Base arguments for <see cref="fm.websync.client">fm.websync.client</see> events that occur
 before a request is sent.
 </div>

@extends fm.websync.baseClientEventArgs
*/


fm.websync.baseClientRequestEventArgs = (function(_super) {

  __extends(baseClientRequestEventArgs, _super);

  baseClientRequestEventArgs.prototype._cancel = false;

  function baseClientRequestEventArgs() {
    this.setCancel = __bind(this.setCancel, this);

    this.getCancel = __bind(this.getCancel, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseClientRequestEventArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    baseClientRequestEventArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.baseClientRequestEventArgs-getCancel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether or not to cancel the request.
  	 If set to <c>true</c>, the request will not be processed.
  	 Defaults to <c>false</c>.
  	 </div>
  
  	@function getCancel
  	@return {Boolean}
  */


  baseClientRequestEventArgs.prototype.getCancel = function() {
    return this._cancel;
  };

  /*<span id='method-fm.websync.baseClientRequestEventArgs-setCancel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets whether or not to cancel the request.
  	 If set to <c>true</c>, the request will not be processed.
  	 Defaults to <c>false</c>.
  	 </div>
  
  	@function setCancel
  	@param {Boolean} value
  	@return {void}
  */


  baseClientRequestEventArgs.prototype.setCancel = function() {
    var value;
    value = arguments[0];
    return this._cancel = value;
  };

  return baseClientRequestEventArgs;

})(fm.websync.baseClientEventArgs);


/*<span id='cls-fm.websync.baseClientRequestEventArgsGeneric'>&nbsp;</span>
*/

/**
@class fm.websync.baseClientRequestEventArgsGeneric
 <div>
 Generic base arguments for <see cref="fm.websync.client">fm.websync.client</see> events that occur
 before a request is sent.
 </div>

@extends fm.websync.baseClientRequestEventArgs
*/


fm.websync.baseClientRequestEventArgsGeneric = (function(_super) {

  __extends(baseClientRequestEventArgsGeneric, _super);

  baseClientRequestEventArgsGeneric.prototype._methodArgs = null;

  function baseClientRequestEventArgsGeneric() {
    this.setMethodArgs = __bind(this.setMethodArgs, this);

    this.getMethodArgs = __bind(this.getMethodArgs, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseClientRequestEventArgsGeneric.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    baseClientRequestEventArgsGeneric.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.baseClientRequestEventArgsGeneric-getMethodArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the original arguments passed into the client method.
  	 </div>
  
  	@function getMethodArgs
  	@return {fm.object}
  */


  baseClientRequestEventArgsGeneric.prototype.getMethodArgs = function() {
    return this._methodArgs;
  };

  /*<span id='method-fm.websync.baseClientRequestEventArgsGeneric-setMethodArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the original arguments passed into the client method.
  	 </div>
  
  	@function setMethodArgs
  	@param {fm.object} value
  	@return {void}
  */


  baseClientRequestEventArgsGeneric.prototype.setMethodArgs = function() {
    var value;
    value = arguments[0];
    return this._methodArgs = value;
  };

  return baseClientRequestEventArgsGeneric;

})(fm.websync.baseClientRequestEventArgs);


/*<span id='cls-fm.websync.clientNotifyRequestArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientNotifyRequestArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnNotifyRequest">fm.websync.client.addOnNotifyRequest</see>.
 </div>

@extends fm.websync.baseClientRequestEventArgsGeneric
*/


fm.websync.clientNotifyRequestArgs = (function(_super) {

  __extends(clientNotifyRequestArgs, _super);

  function clientNotifyRequestArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientNotifyRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientNotifyRequestArgs.__super__.constructor.call(this);
  }

  return clientNotifyRequestArgs;

})(fm.websync.baseClientRequestEventArgsGeneric);


/*<span id='cls-fm.websync.clientSubscribeEndArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientSubscribeEndArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnSubscribeEnd">fm.websync.client.addOnSubscribeEnd</see>.
 </div>

@extends fm.websync.baseClientEndEventArgsGeneric
*/


fm.websync.clientSubscribeEndArgs = (function(_super) {

  __extends(clientSubscribeEndArgs, _super);

  function clientSubscribeEndArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientSubscribeEndArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientSubscribeEndArgs.__super__.constructor.call(this);
  }

  return clientSubscribeEndArgs;

})(fm.websync.baseClientEndEventArgsGeneric);


/*<span id='cls-fm.websync.clientBindEndArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientBindEndArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnBindEnd">fm.websync.client.addOnBindEnd</see>.
 </div>

@extends fm.websync.baseClientEndEventArgsGeneric
*/


fm.websync.clientBindEndArgs = (function(_super) {

  __extends(clientBindEndArgs, _super);

  function clientBindEndArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientBindEndArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientBindEndArgs.__super__.constructor.call(this);
  }

  return clientBindEndArgs;

})(fm.websync.baseClientEndEventArgsGeneric);


/*<span id='cls-fm.websync.clientConnectEndArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientConnectEndArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnConnectEnd">fm.websync.client.addOnConnectEnd</see>.
 </div>

@extends fm.websync.baseClientEndEventArgsGeneric
*/


fm.websync.clientConnectEndArgs = (function(_super) {

  __extends(clientConnectEndArgs, _super);

  function clientConnectEndArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientConnectEndArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientConnectEndArgs.__super__.constructor.call(this);
  }

  return clientConnectEndArgs;

})(fm.websync.baseClientEndEventArgsGeneric);


/*<span id='cls-fm.websync.clientDisconnectEndArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientDisconnectEndArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnDisconnectEnd">fm.websync.client.addOnDisconnectEnd</see>.
 </div>

@extends fm.websync.baseClientEndEventArgsGeneric
*/


fm.websync.clientDisconnectEndArgs = (function(_super) {

  __extends(clientDisconnectEndArgs, _super);

  function clientDisconnectEndArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientDisconnectEndArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientDisconnectEndArgs.__super__.constructor.call(this);
  }

  return clientDisconnectEndArgs;

})(fm.websync.baseClientEndEventArgsGeneric);


/*<span id='cls-fm.websync.clientNotifyEndArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientNotifyEndArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnNotifyEnd">fm.websync.client.addOnNotifyEnd</see>.
 </div>

@extends fm.websync.baseClientEndEventArgsGeneric
*/


fm.websync.clientNotifyEndArgs = (function(_super) {

  __extends(clientNotifyEndArgs, _super);

  function clientNotifyEndArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientNotifyEndArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientNotifyEndArgs.__super__.constructor.call(this);
  }

  return clientNotifyEndArgs;

})(fm.websync.baseClientEndEventArgsGeneric);


/*<span id='cls-fm.websync.clientPublishEndArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientPublishEndArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnPublishEnd">fm.websync.client.addOnPublishEnd</see>.
 </div>

@extends fm.websync.baseClientEndEventArgsGeneric
*/


fm.websync.clientPublishEndArgs = (function(_super) {

  __extends(clientPublishEndArgs, _super);

  function clientPublishEndArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientPublishEndArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientPublishEndArgs.__super__.constructor.call(this);
  }

  return clientPublishEndArgs;

})(fm.websync.baseClientEndEventArgsGeneric);


/*<span id='cls-fm.websync.clientServiceEndArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientServiceEndArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnServiceEnd">fm.websync.client.addOnServiceEnd</see>.
 </div>

@extends fm.websync.baseClientEndEventArgsGeneric
*/


fm.websync.clientServiceEndArgs = (function(_super) {

  __extends(clientServiceEndArgs, _super);

  function clientServiceEndArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientServiceEndArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientServiceEndArgs.__super__.constructor.call(this);
  }

  return clientServiceEndArgs;

})(fm.websync.baseClientEndEventArgsGeneric);


/*<span id='cls-fm.websync.clientUnbindEndArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientUnbindEndArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnUnbindEnd">fm.websync.client.addOnUnbindEnd</see>.
 </div>

@extends fm.websync.baseClientEndEventArgsGeneric
*/


fm.websync.clientUnbindEndArgs = (function(_super) {

  __extends(clientUnbindEndArgs, _super);

  function clientUnbindEndArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientUnbindEndArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientUnbindEndArgs.__super__.constructor.call(this);
  }

  return clientUnbindEndArgs;

})(fm.websync.baseClientEndEventArgsGeneric);


/*<span id='cls-fm.websync.clientUnsubscribeEndArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientUnsubscribeEndArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnUnsubscribeEnd">fm.websync.client.addOnUnsubscribeEnd</see>.
 </div>

@extends fm.websync.baseClientEndEventArgsGeneric
*/


fm.websync.clientUnsubscribeEndArgs = (function(_super) {

  __extends(clientUnsubscribeEndArgs, _super);

  function clientUnsubscribeEndArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientUnsubscribeEndArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientUnsubscribeEndArgs.__super__.constructor.call(this);
  }

  return clientUnsubscribeEndArgs;

})(fm.websync.baseClientEndEventArgsGeneric);


/*<span id='cls-fm.websync.notifyReceiveArgs'>&nbsp;</span>
*/

/**
@class fm.websync.notifyReceiveArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnNotify">fm.websync.client.addOnNotify</see>.
 </div>

@extends fm.websync.baseReceiveArgs
*/


fm.websync.notifyReceiveArgs = (function(_super) {

  __extends(notifyReceiveArgs, _super);

  /*<span id='method-fm.websync.notifyReceiveArgs-fm.websync.notifyReceiveArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.notifyReceiveArgs">fm.websync.notifyReceiveArgs</see> class.
  	 </div>
  	@function fm.websync.notifyReceiveArgs
  	@param {String} dataJson The data in JSON format.
  	@param {fm.array} dataBytes The data in binary format.
  	@param {fm.websync.connectionType} connectionType The current connection type.
  	@param {Integer} reconnectAfter The amount of time in milliseconds to pause before reconnecting to the server.
  	@return {}
  */


  function notifyReceiveArgs() {
    this.getWasSentByMe = __bind(this.getWasSentByMe, this);

    this.getNotifyingClient = __bind(this.getNotifyingClient, this);

    var connectionType, dataBytes, dataJson, reconnectAfter;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      notifyReceiveArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    dataJson = arguments[0];
    dataBytes = arguments[1];
    connectionType = arguments[2];
    reconnectAfter = arguments[3];
    notifyReceiveArgs.__super__.constructor.call(this, dataJson, dataBytes, connectionType, reconnectAfter);
  }

  /*<span id='method-fm.websync.notifyReceiveArgs-getNotifyingClient'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets details about the client sending the notification.
  	 </div>
  
  	@function getNotifyingClient
  	@return {fm.websync.notifyingClient}
  */


  notifyReceiveArgs.prototype.getNotifyingClient = function() {
    return fm.websync.notifyingClient.fromJson(this.getExtensionValueJson("fm.notifying"));
  };

  /*<span id='method-fm.websync.notifyReceiveArgs-getWasSentByMe'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the data was sent by the current client.
  	 </div>
  
  	@function getWasSentByMe
  	@return {Boolean}
  */


  notifyReceiveArgs.prototype.getWasSentByMe = function() {
    var _var0, _var1, _var2;
    _var0 = this.getNotifyingClient();
    _var1 = this.getClient();
    _var2 = this.getNotifyingClient().getClientId();
    return (((_var0 !== null && typeof _var0 !== 'undefined') && (_var1 !== null && typeof _var1 !== 'undefined')) && (this.getNotifyingClient().getClientId() !== null)) && (_var2 === null ? _var2 === this.getClient().getClientId() : _var2.equals(this.getClient().getClientId()));
  };

  return notifyReceiveArgs;

})(fm.websync.baseReceiveArgs);


/*<span id='cls-fm.websync.socketOpenFailureArgs'>&nbsp;</span>
*/

/**
@class fm.websync.socketOpenFailureArgs
 <div>
 Failure arguments for use with the <see cref="fm.websync.socketMessageTransfer">fm.websync.socketMessageTransfer</see>.
 </div>

@extends fm.dynamic
*/


fm.websync.socketOpenFailureArgs = (function(_super) {

  __extends(socketOpenFailureArgs, _super);

  socketOpenFailureArgs.prototype._exception = null;

  function socketOpenFailureArgs() {
    this.setException = __bind(this.setException, this);

    this.getException = __bind(this.getException, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      socketOpenFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    socketOpenFailureArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.socketOpenFailureArgs-getException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the exception generated while connecting.
  	 </div>
  
  	@function getException
  	@return {Error}
  */


  socketOpenFailureArgs.prototype.getException = function() {
    return this._exception;
  };

  /*<span id='method-fm.websync.socketOpenFailureArgs-setException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the exception generated while connecting.
  	 </div>
  
  	@function setException
  	@param {Error} value
  	@return {void}
  */


  socketOpenFailureArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  return socketOpenFailureArgs;

})(fm.dynamic);


/*<span id='cls-fm.websync.socketOpenSuccessArgs'>&nbsp;</span>
*/

/**
@class fm.websync.socketOpenSuccessArgs
 <div>
 Success arguments for use with the <see cref="fm.websync.socketMessageTransfer">fm.websync.socketMessageTransfer</see>.
 </div>

@extends fm.dynamic
*/


fm.websync.socketOpenSuccessArgs = (function(_super) {

  __extends(socketOpenSuccessArgs, _super);

  function socketOpenSuccessArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      socketOpenSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    socketOpenSuccessArgs.__super__.constructor.call(this);
  }

  return socketOpenSuccessArgs;

})(fm.dynamic);


/*<span id='cls-fm.websync.socketStreamFailureArgs'>&nbsp;</span>
*/

/**
@class fm.websync.socketStreamFailureArgs
 <div>
 Stream failure arguments for use with the <see cref="fm.websync.socketMessageTransfer">fm.websync.socketMessageTransfer</see>.
 </div>

@extends fm.dynamic
*/


fm.websync.socketStreamFailureArgs = (function(_super) {

  __extends(socketStreamFailureArgs, _super);

  socketStreamFailureArgs.prototype._exception = null;

  function socketStreamFailureArgs() {
    this.setException = __bind(this.setException, this);

    this.getException = __bind(this.getException, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      socketStreamFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    socketStreamFailureArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.socketStreamFailureArgs-getException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the exception generated by the active connection.
  	 </div>
  
  	@function getException
  	@return {Error}
  */


  socketStreamFailureArgs.prototype.getException = function() {
    return this._exception;
  };

  /*<span id='method-fm.websync.socketStreamFailureArgs-setException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the exception generated by the active connection.
  	 </div>
  
  	@function setException
  	@param {Error} value
  	@return {void}
  */


  socketStreamFailureArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  return socketStreamFailureArgs;

})(fm.dynamic);


/*<span id='cls-fm.websync.serverSubscribeArgs'>&nbsp;</span>
*/

/**
@class fm.websync.serverSubscribeArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnServerSubscribe">fm.websync.client.addOnServerSubscribe</see>.
 </div>

@extends fm.websync.baseSuccessArgs
*/


fm.websync.serverSubscribeArgs = (function(_super) {

  __extends(serverSubscribeArgs, _super);

  serverSubscribeArgs.prototype.__channels = null;

  function serverSubscribeArgs() {
    this.getTag = __bind(this.getTag, this);

    this.getChannels = __bind(this.getChannels, this);

    this.getChannel = __bind(this.getChannel, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      serverSubscribeArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    serverSubscribeArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.serverSubscribeArgs-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel to which the client was subscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.serverSubscribeArgs.channels">fm.websync.serverSubscribeArgs.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  serverSubscribeArgs.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };

  /*<span id='method-fm.websync.serverSubscribeArgs-getChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channels to which the client was subscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.serverSubscribeArgs.channel">fm.websync.serverSubscribeArgs.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
  */


  serverSubscribeArgs.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };

  /*<span id='method-fm.websync.serverSubscribeArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag associated with the subscribe request.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  serverSubscribeArgs.prototype.getTag = function() {
    var _ref;
    return (_ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? _ref : fm.stringExtensions.empty;
  };

  return serverSubscribeArgs;

})(fm.websync.baseSuccessArgs);


/*<span id='cls-fm.websync.serverUnsubscribeArgs'>&nbsp;</span>
*/

/**
@class fm.websync.serverUnsubscribeArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnServerUnsubscribe">fm.websync.client.addOnServerUnsubscribe</see>.
 </div>

@extends fm.websync.baseSuccessArgs
*/


fm.websync.serverUnsubscribeArgs = (function(_super) {

  __extends(serverUnsubscribeArgs, _super);

  serverUnsubscribeArgs.prototype.__channels = null;

  function serverUnsubscribeArgs() {
    this.getTag = __bind(this.getTag, this);

    this.getChannels = __bind(this.getChannels, this);

    this.getChannel = __bind(this.getChannel, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      serverUnsubscribeArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    serverUnsubscribeArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.serverUnsubscribeArgs-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel from which the client was unsubscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.serverUnsubscribeArgs.channels">fm.websync.serverUnsubscribeArgs.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  serverUnsubscribeArgs.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };

  /*<span id='method-fm.websync.serverUnsubscribeArgs-getChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channels from which the client was unsubscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.serverUnsubscribeArgs.channel">fm.websync.serverUnsubscribeArgs.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
  */


  serverUnsubscribeArgs.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };

  /*<span id='method-fm.websync.serverUnsubscribeArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag associated with the unsubscribe request.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  serverUnsubscribeArgs.prototype.getTag = function() {
    var _ref;
    return (_ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? _ref : fm.stringExtensions.empty;
  };

  return serverUnsubscribeArgs;

})(fm.websync.baseSuccessArgs);


/*<span id='cls-fm.websync.serverUnbindArgs'>&nbsp;</span>
*/

/**
@class fm.websync.serverUnbindArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnServerUnbind">fm.websync.client.addOnServerUnbind</see>.
 </div>

@extends fm.websync.baseSuccessArgs
*/


fm.websync.serverUnbindArgs = (function(_super) {

  __extends(serverUnbindArgs, _super);

  serverUnbindArgs.prototype.__records = null;

  function serverUnbindArgs() {
    this.getRecords = __bind(this.getRecords, this);

    this.getRecord = __bind(this.getRecord, this);

    this.getKeys = __bind(this.getKeys, this);

    this.getKey = __bind(this.getKey, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      serverUnbindArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    serverUnbindArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.serverUnbindArgs-getKey'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record key from which the client was unbound.
  	 Overrides <see cref="fm.websync.serverUnbindArgs.keys">fm.websync.serverUnbindArgs.keys</see>, <see cref="fm.websync.serverUnbindArgs.record">fm.websync.serverUnbindArgs.record</see>, and <see cref="fm.websync.serverUnbindArgs.records">fm.websync.serverUnbindArgs.records</see>.
  	 </div>
  
  	@function getKey
  	@return {String}
  */


  serverUnbindArgs.prototype.getKey = function() {
    return fm.websync.extensible.sharedGetKey(this.__records);
  };

  /*<span id='method-fm.websync.serverUnbindArgs-getKeys'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record keys from which the client was unbound.
  	 Overrides <see cref="fm.websync.serverUnbindArgs.key">fm.websync.serverUnbindArgs.key</see>, <see cref="fm.websync.serverUnbindArgs.record">fm.websync.serverUnbindArgs.record</see>, and <see cref="fm.websync.serverUnbindArgs.records">fm.websync.serverUnbindArgs.records</see>.
  	 </div>
  
  	@function getKeys
  	@return {fm.array}
  */


  serverUnbindArgs.prototype.getKeys = function() {
    return fm.websync.extensible.sharedGetKeys(this.__records);
  };

  /*<span id='method-fm.websync.serverUnbindArgs-getRecord'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record from which the client was unbound.
  	 Overrides <see cref="fm.websync.serverUnbindArgs.records">fm.websync.serverUnbindArgs.records</see>, <see cref="fm.websync.serverUnbindArgs.key">fm.websync.serverUnbindArgs.key</see>, and <see cref="fm.websync.serverUnbindArgs.keys">fm.websync.serverUnbindArgs.keys</see>.
  	 </div>
  
  	@function getRecord
  	@return {fm.websync.record}
  */


  serverUnbindArgs.prototype.getRecord = function() {
    return fm.websync.extensible.sharedGetRecord(this.__records);
  };

  /*<span id='method-fm.websync.serverUnbindArgs-getRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the records from which the client was unbound.
  	 Overrides <see cref="fm.websync.serverUnbindArgs.record">fm.websync.serverUnbindArgs.record</see>, <see cref="fm.websync.serverUnbindArgs.key">fm.websync.serverUnbindArgs.key</see>, and <see cref="fm.websync.serverUnbindArgs.keys">fm.websync.serverUnbindArgs.keys</see>.
  	 </div>
  
  	@function getRecords
  	@return {fm.array}
  */


  serverUnbindArgs.prototype.getRecords = function() {
    return fm.websync.extensible.sharedGetRecords(this.__records);
  };

  return serverUnbindArgs;

})(fm.websync.baseSuccessArgs);


/*<span id='cls-fm.websync.serverBindArgs'>&nbsp;</span>
*/

/**
@class fm.websync.serverBindArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnServerBind">fm.websync.client.addOnServerBind</see>.
 </div>

@extends fm.websync.baseServerArgs
*/


fm.websync.serverBindArgs = (function(_super) {

  __extends(serverBindArgs, _super);

  serverBindArgs.prototype.__records = null;

  function serverBindArgs() {
    this.getRecords = __bind(this.getRecords, this);

    this.getRecord = __bind(this.getRecord, this);

    this.getKeys = __bind(this.getKeys, this);

    this.getKey = __bind(this.getKey, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      serverBindArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    serverBindArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.serverBindArgs-getKey'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record key to which the client was bound.
  	 Overrides <see cref="fm.websync.serverBindArgs.keys">fm.websync.serverBindArgs.keys</see>, <see cref="fm.websync.serverBindArgs.record">fm.websync.serverBindArgs.record</see>, and <see cref="fm.websync.serverBindArgs.records">fm.websync.serverBindArgs.records</see>.
  	 </div>
  
  	@function getKey
  	@return {String}
  */


  serverBindArgs.prototype.getKey = function() {
    return fm.websync.extensible.sharedGetKey(this.__records);
  };

  /*<span id='method-fm.websync.serverBindArgs-getKeys'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record keys to which the client was bound.
  	 Overrides <see cref="fm.websync.serverBindArgs.key">fm.websync.serverBindArgs.key</see>, <see cref="fm.websync.serverBindArgs.record">fm.websync.serverBindArgs.record</see>, and <see cref="fm.websync.serverBindArgs.records">fm.websync.serverBindArgs.records</see>.
  	 </div>
  
  	@function getKeys
  	@return {fm.array}
  */


  serverBindArgs.prototype.getKeys = function() {
    return fm.websync.extensible.sharedGetKeys(this.__records);
  };

  /*<span id='method-fm.websync.serverBindArgs-getRecord'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record to which the client was bound.
  	 Overrides <see cref="fm.websync.serverBindArgs.records">fm.websync.serverBindArgs.records</see>, <see cref="fm.websync.serverBindArgs.key">fm.websync.serverBindArgs.key</see>, and <see cref="fm.websync.serverBindArgs.keys">fm.websync.serverBindArgs.keys</see>.
  	 </div>
  
  	@function getRecord
  	@return {fm.websync.record}
  */


  serverBindArgs.prototype.getRecord = function() {
    return fm.websync.extensible.sharedGetRecord(this.__records);
  };

  /*<span id='method-fm.websync.serverBindArgs-getRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the records to which the client was bound.
  	 Overrides <see cref="fm.websync.serverBindArgs.record">fm.websync.serverBindArgs.record</see>, <see cref="fm.websync.serverBindArgs.key">fm.websync.serverBindArgs.key</see>, and <see cref="fm.websync.serverBindArgs.keys">fm.websync.serverBindArgs.keys</see>.
  	 </div>
  
  	@function getRecords
  	@return {fm.array}
  */


  serverBindArgs.prototype.getRecords = function() {
    return fm.websync.extensible.sharedGetRecords(this.__records);
  };

  return serverBindArgs;

})(fm.websync.baseServerArgs);


/*<span id='cls-fm.websync.messageRequestCreatedArgs'>&nbsp;</span>
*/

/**
@class fm.websync.messageRequestCreatedArgs
 <div>
 Arguments passed into callbacks when a message request is created.
 </div>

@extends fm.object
*/


fm.websync.messageRequestCreatedArgs = (function(_super) {

  __extends(messageRequestCreatedArgs, _super);

  messageRequestCreatedArgs.prototype._requests = null;

  messageRequestCreatedArgs.prototype._sender = null;

  function messageRequestCreatedArgs() {
    this.setSender = __bind(this.setSender, this);

    this.setRequests = __bind(this.setRequests, this);

    this.getSender = __bind(this.getSender, this);

    this.getRequests = __bind(this.getRequests, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      messageRequestCreatedArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    messageRequestCreatedArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.messageRequestCreatedArgs-getRequests'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the outgoing messages about to be sent to the server.
  	 </div>
  
  	@function getRequests
  	@return {fm.array}
  */


  messageRequestCreatedArgs.prototype.getRequests = function() {
    return this._requests;
  };

  /*<span id='method-fm.websync.messageRequestCreatedArgs-getSender'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the sender of the request, either a client or publisher.
  	 </div>
  
  	@function getSender
  	@return {fm.object}
  */


  messageRequestCreatedArgs.prototype.getSender = function() {
    return this._sender;
  };

  messageRequestCreatedArgs.prototype.setRequests = function() {
    var value;
    value = arguments[0];
    return this._requests = value;
  };

  messageRequestCreatedArgs.prototype.setSender = function() {
    var value;
    value = arguments[0];
    return this._sender = value;
  };

  return messageRequestCreatedArgs;

})(fm.object);


/*<span id='cls-fm.websync.messageResponseReceivedArgs'>&nbsp;</span>
*/

/**
@class fm.websync.messageResponseReceivedArgs
 <div>
 Arguments passed into callbacks when a message response is created.
 </div>

@extends fm.object
*/


fm.websync.messageResponseReceivedArgs = (function(_super) {

  __extends(messageResponseReceivedArgs, _super);

  messageResponseReceivedArgs.prototype._responses = null;

  messageResponseReceivedArgs.prototype._sender = null;

  function messageResponseReceivedArgs() {
    this.setSender = __bind(this.setSender, this);

    this.setResponses = __bind(this.setResponses, this);

    this.getSender = __bind(this.getSender, this);

    this.getResponses = __bind(this.getResponses, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      messageResponseReceivedArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    messageResponseReceivedArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.messageResponseReceivedArgs-getResponses'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the incoming messages about to be processed by the client.
  	 </div>
  
  	@function getResponses
  	@return {fm.array}
  */


  messageResponseReceivedArgs.prototype.getResponses = function() {
    return this._responses;
  };

  /*<span id='method-fm.websync.messageResponseReceivedArgs-getSender'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the sender of the request, either a client or publisher.
  	 </div>
  
  	@function getSender
  	@return {fm.object}
  */


  messageResponseReceivedArgs.prototype.getSender = function() {
    return this._sender;
  };

  messageResponseReceivedArgs.prototype.setResponses = function() {
    var value;
    value = arguments[0];
    return this._responses = value;
  };

  messageResponseReceivedArgs.prototype.setSender = function() {
    var value;
    value = arguments[0];
    return this._sender = value;
  };

  return messageResponseReceivedArgs;

})(fm.object);


/*<span id='cls-fm.websync.messageRequestArgs'>&nbsp;</span>
*/

/**
@class fm.websync.messageRequestArgs
 <div>
 Arguments for sending a message request.
 </div>

@extends fm.dynamic
*/


fm.websync.messageRequestArgs = (function(_super) {

  __extends(messageRequestArgs, _super);

  messageRequestArgs.prototype._headers = null;

  messageRequestArgs.prototype._messages = null;

  messageRequestArgs.prototype._onHttpRequestCreated = null;

  messageRequestArgs.prototype._onHttpResponseReceived = null;

  messageRequestArgs.prototype._onRequestCreated = null;

  messageRequestArgs.prototype._onResponseReceived = null;

  messageRequestArgs.prototype._sender = null;

  messageRequestArgs.prototype._timeout = 0;

  messageRequestArgs.prototype._url = null;

  /*<span id='method-fm.websync.messageRequestArgs-fm.websync.messageRequestArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.messageRequestArgs">fm.websync.messageRequestArgs</see> class
  	 with default values.
  	 </div>
  
  	@function fm.websync.messageRequestArgs
  	@param {fm.nameValueCollection} headers
  	@return {}
  */


  function messageRequestArgs() {
    this.setUrl = __bind(this.setUrl, this);

    this.setTimeout = __bind(this.setTimeout, this);

    this.setSender = __bind(this.setSender, this);

    this.setOnResponseReceived = __bind(this.setOnResponseReceived, this);

    this.setOnRequestCreated = __bind(this.setOnRequestCreated, this);

    this.setOnHttpResponseReceived = __bind(this.setOnHttpResponseReceived, this);

    this.setOnHttpRequestCreated = __bind(this.setOnHttpRequestCreated, this);

    this.setMessages = __bind(this.setMessages, this);

    this.setHeaders = __bind(this.setHeaders, this);

    this.getUrl = __bind(this.getUrl, this);

    this.getTimeout = __bind(this.getTimeout, this);

    this.getSender = __bind(this.getSender, this);

    this.getOnResponseReceived = __bind(this.getOnResponseReceived, this);

    this.getOnRequestCreated = __bind(this.getOnRequestCreated, this);

    this.getOnHttpResponseReceived = __bind(this.getOnHttpResponseReceived, this);

    this.getOnHttpRequestCreated = __bind(this.getOnHttpRequestCreated, this);

    this.getMessages = __bind(this.getMessages, this);

    this.getIsBinary = __bind(this.getIsBinary, this);

    this.getHeaders = __bind(this.getHeaders, this);

    var headers;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      messageRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    headers = arguments[0];
    messageRequestArgs.__super__.constructor.call(this);
    this.setTimeout(15000);
    this.setHeaders(headers);
  }

  /*<span id='method-fm.websync.messageRequestArgs-getHeaders'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the headers for the request.
  	 </div>
  
  	@function getHeaders
  	@return {fm.nameValueCollection}
  */


  messageRequestArgs.prototype.getHeaders = function() {
    return this._headers;
  };

  /*<span id='method-fm.websync.messageRequestArgs-getIsBinary'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether or not each message in the batch is in binary format and can
  	 be tranferred as such.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
  */


  messageRequestArgs.prototype.getIsBinary = function() {
    var message, _i, _len, _var0;
    _var0 = this.getMessages();
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      message = _var0[_i];
      if (!((message.getDisableBinary() !== true) && message.getIsBinary())) {
        return false;
      }
    }
    return true;
  };

  /*<span id='method-fm.websync.messageRequestArgs-getMessages'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the messages to transfer.
  	 </div>
  
  	@function getMessages
  	@return {fm.array}
  */


  messageRequestArgs.prototype.getMessages = function() {
    return this._messages;
  };

  /*<span id='method-fm.websync.messageRequestArgs-getOnHttpRequestCreated'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke whenever an underlying HTTP request
  	 has been created and is about to be transferred to the server. This is a
  	 good place to add headers/cookies. For WebSocket streams, this will fire
  	 only once for the initial HTTP-based handshake.
  	 </div>
  
  	@function getOnHttpRequestCreated
  	@return {fm.singleAction}
  */


  messageRequestArgs.prototype.getOnHttpRequestCreated = function() {
    return this._onHttpRequestCreated;
  };

  /*<span id='method-fm.websync.messageRequestArgs-getOnHttpResponseReceived'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke whenever an underlying HTTP response
  	 has been received and is about to be processed by the client. This is a
  	 good place to read headers/cookies. For WebSocket streams, this will fire
  	 only once for the initial HTTP-based handshake.
  	 </div>
  
  	@function getOnHttpResponseReceived
  	@return {fm.singleAction}
  */


  messageRequestArgs.prototype.getOnHttpResponseReceived = function() {
    return this._onHttpResponseReceived;
  };

  /*<span id='method-fm.websync.messageRequestArgs-getOnRequestCreated'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke whenever a new request is created
  	 and about to be transferred to the server. This is a good place to read
  	 or modify outgoing messages.
  	 </div>
  
  	@function getOnRequestCreated
  	@return {fm.singleAction}
  */


  messageRequestArgs.prototype.getOnRequestCreated = function() {
    return this._onRequestCreated;
  };

  /*<span id='method-fm.websync.messageRequestArgs-getOnResponseReceived'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke whenever a new response is received
  	 and about to be processed by the client. This is a good place to read
  	 or modify incoming messages.
  	 </div>
  
  	@function getOnResponseReceived
  	@return {fm.singleAction}
  */


  messageRequestArgs.prototype.getOnResponseReceived = function() {
    return this._onResponseReceived;
  };

  /*<span id='method-fm.websync.messageRequestArgs-getSender'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the sender of the content, either a client or publisher.
  	 </div>
  
  	@function getSender
  	@return {fm.object}
  */


  messageRequestArgs.prototype.getSender = function() {
    return this._sender;
  };

  /*<span id='method-fm.websync.messageRequestArgs-getTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the number of milliseconds to wait before timing out the transfer.
  	 Defaults to 15000 (15 seconds).
  	 </div>
  
  	@function getTimeout
  	@return {Integer}
  */


  messageRequestArgs.prototype.getTimeout = function() {
    return this._timeout;
  };

  /*<span id='method-fm.websync.messageRequestArgs-getUrl'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the target URL for the request.
  	 </div>
  
  	@function getUrl
  	@return {String}
  */


  messageRequestArgs.prototype.getUrl = function() {
    return this._url;
  };

  /*<span id='method-fm.websync.messageRequestArgs-setHeaders'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the headers for the request.
  	 </div>
  
  	@function setHeaders
  	@param {fm.nameValueCollection} value
  	@return {void}
  */


  messageRequestArgs.prototype.setHeaders = function() {
    var value;
    value = arguments[0];
    return this._headers = value;
  };

  /*<span id='method-fm.websync.messageRequestArgs-setMessages'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the messages to transfer.
  	 </div>
  
  	@function setMessages
  	@param {fm.array} value
  	@return {void}
  */


  messageRequestArgs.prototype.setMessages = function() {
    var value;
    value = arguments[0];
    return this._messages = value;
  };

  /*<span id='method-fm.websync.messageRequestArgs-setOnHttpRequestCreated'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke whenever an underlying HTTP request
  	 has been created and is about to be transferred to the server. This is a
  	 good place to add headers/cookies. For WebSocket streams, this will fire
  	 only once for the initial HTTP-based handshake.
  	 </div>
  
  	@function setOnHttpRequestCreated
  	@param {fm.singleAction} value
  	@return {void}
  */


  messageRequestArgs.prototype.setOnHttpRequestCreated = function() {
    var value;
    value = arguments[0];
    return this._onHttpRequestCreated = value;
  };

  /*<span id='method-fm.websync.messageRequestArgs-setOnHttpResponseReceived'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke whenever an underlying HTTP response
  	 has been received and is about to be processed by the client. This is a
  	 good place to read headers/cookies. For WebSocket streams, this will fire
  	 only once for the initial HTTP-based handshake.
  	 </div>
  
  	@function setOnHttpResponseReceived
  	@param {fm.singleAction} value
  	@return {void}
  */


  messageRequestArgs.prototype.setOnHttpResponseReceived = function() {
    var value;
    value = arguments[0];
    return this._onHttpResponseReceived = value;
  };

  /*<span id='method-fm.websync.messageRequestArgs-setOnRequestCreated'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke whenever a new request is created
  	 and about to be transferred to the server. This is a good place to read
  	 or modify outgoing messages.
  	 </div>
  
  	@function setOnRequestCreated
  	@param {fm.singleAction} value
  	@return {void}
  */


  messageRequestArgs.prototype.setOnRequestCreated = function() {
    var value;
    value = arguments[0];
    return this._onRequestCreated = value;
  };

  /*<span id='method-fm.websync.messageRequestArgs-setOnResponseReceived'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke whenever a new response is received
  	 and about to be processed by the client. This is a good place to read
  	 or modify incoming messages.
  	 </div>
  
  	@function setOnResponseReceived
  	@param {fm.singleAction} value
  	@return {void}
  */


  messageRequestArgs.prototype.setOnResponseReceived = function() {
    var value;
    value = arguments[0];
    return this._onResponseReceived = value;
  };

  /*<span id='method-fm.websync.messageRequestArgs-setSender'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the sender of the content, either a client or publisher.
  	 </div>
  
  	@function setSender
  	@param {fm.object} value
  	@return {void}
  */


  messageRequestArgs.prototype.setSender = function() {
    var value;
    value = arguments[0];
    return this._sender = value;
  };

  /*<span id='method-fm.websync.messageRequestArgs-setTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the number of milliseconds to wait before timing out the transfer.
  	 Defaults to 15000 (15 seconds).
  	 </div>
  
  	@function setTimeout
  	@param {Integer} value
  	@return {void}
  */


  messageRequestArgs.prototype.setTimeout = function() {
    var value;
    value = arguments[0];
    return this._timeout = value;
  };

  /*<span id='method-fm.websync.messageRequestArgs-setUrl'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the target URL for the request.
  	 </div>
  
  	@function setUrl
  	@param {String} value
  	@return {void}
  */


  messageRequestArgs.prototype.setUrl = function() {
    var value;
    value = arguments[0];
    return this._url = value;
  };

  return messageRequestArgs;

})(fm.dynamic);


/*<span id='cls-fm.websync.messageResponseArgs'>&nbsp;</span>
*/

/**
@class fm.websync.messageResponseArgs
 <div>
 Arguments for receiving a message response.
 </div>

@extends fm.dynamic
*/


fm.websync.messageResponseArgs = (function(_super) {

  __extends(messageResponseArgs, _super);

  messageResponseArgs.prototype._exception = null;

  messageResponseArgs.prototype._headers = null;

  messageResponseArgs.prototype._messages = null;

  messageResponseArgs.prototype._requestArgs = null;

  /*<span id='method-fm.websync.messageResponseArgs-fm.websync.messageResponseArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.messageResponseArgs">fm.websync.messageResponseArgs</see> class.
  	 </div>
  	@function fm.websync.messageResponseArgs
  	@param {fm.websync.messageRequestArgs} requestArgs The request arguments.
  	@return {}
  */


  function messageResponseArgs() {
    this.setRequestArgs = __bind(this.setRequestArgs, this);

    this.setMessages = __bind(this.setMessages, this);

    this.setHeaders = __bind(this.setHeaders, this);

    this.setException = __bind(this.setException, this);

    this.getRequestArgs = __bind(this.getRequestArgs, this);

    this.getMessages = __bind(this.getMessages, this);

    this.getHeaders = __bind(this.getHeaders, this);

    this.getException = __bind(this.getException, this);

    var requestArgs;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      messageResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    requestArgs = arguments[0];
    messageResponseArgs.__super__.constructor.call(this);
    this.setRequestArgs(requestArgs);
  }

  /*<span id='method-fm.websync.messageResponseArgs-getException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the exception generated while completing the request.
  	 </div>
  
  	@function getException
  	@return {Error}
  */


  messageResponseArgs.prototype.getException = function() {
    return this._exception;
  };

  /*<span id='method-fm.websync.messageResponseArgs-getHeaders'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the headers for the response.
  	 </div>
  
  	@function getHeaders
  	@return {fm.nameValueCollection}
  */


  messageResponseArgs.prototype.getHeaders = function() {
    return this._headers;
  };

  /*<span id='method-fm.websync.messageResponseArgs-getMessages'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the messages read from the response.
  	 </div>
  
  	@function getMessages
  	@return {fm.array}
  */


  messageResponseArgs.prototype.getMessages = function() {
    return this._messages;
  };

  /*<span id='method-fm.websync.messageResponseArgs-getRequestArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the original <see cref="fm.websync.messageRequestArgs">fm.websync.messageRequestArgs</see>.
  	 </div>
  
  	@function getRequestArgs
  	@return {fm.websync.messageRequestArgs}
  */


  messageResponseArgs.prototype.getRequestArgs = function() {
    return this._requestArgs;
  };

  /*<span id='method-fm.websync.messageResponseArgs-setException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the exception generated while completing the request.
  	 </div>
  
  	@function setException
  	@param {Error} value
  	@return {void}
  */


  messageResponseArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  /*<span id='method-fm.websync.messageResponseArgs-setHeaders'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the headers for the response.
  	 </div>
  
  	@function setHeaders
  	@param {fm.nameValueCollection} value
  	@return {void}
  */


  messageResponseArgs.prototype.setHeaders = function() {
    var value;
    value = arguments[0];
    return this._headers = value;
  };

  /*<span id='method-fm.websync.messageResponseArgs-setMessages'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the messages read from the response.
  	 </div>
  
  	@function setMessages
  	@param {fm.array} value
  	@return {void}
  */


  messageResponseArgs.prototype.setMessages = function() {
    var value;
    value = arguments[0];
    return this._messages = value;
  };

  /*<span id='method-fm.websync.messageResponseArgs-setRequestArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the original <see cref="fm.websync.messageRequestArgs">fm.websync.messageRequestArgs</see>.
  	 </div>
  
  	@function setRequestArgs
  	@param {fm.websync.messageRequestArgs} value
  	@return {void}
  */


  messageResponseArgs.prototype.setRequestArgs = function() {
    var value;
    value = arguments[0];
    return this._requestArgs = value;
  };

  return messageResponseArgs;

})(fm.dynamic);


/*<span id='cls-fm.websync.notifyArgs'>&nbsp;</span>
*/

/**
@class fm.websync.notifyArgs
 <div>
 Arguments for client notify requests.
 </div>

@extends fm.websync.baseInputArgs
*/


fm.websync.notifyArgs = (function(_super) {

  __extends(notifyArgs, _super);

  notifyArgs.prototype.__dataBytes = null;

  notifyArgs.prototype.__dataJson = null;

  notifyArgs.prototype._onComplete = null;

  notifyArgs.prototype._onFailure = null;

  notifyArgs.prototype._onSuccess = null;

  /*<span id='method-fm.websync.notifyArgs-fm.websync.notifyArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.notifyArgs">fm.websync.notifyArgs</see> class.
  	 </div>
  	@function fm.websync.notifyArgs
  	@param {fm.guid} clientId The client ID to which the data should be sent.
  	@param {String} dataJson The data to send in JSON format.
  	@param {String} tag The tag that identifies the contents of the payload.
  	@return {}
  */


  function notifyArgs() {
    this.setData = __bind(this.setData, this);

    this.getData = __bind(this.getData, this);

    this.setTag = __bind(this.setTag, this);

    this.setOnSuccess = __bind(this.setOnSuccess, this);

    this.setOnFailure = __bind(this.setOnFailure, this);

    this.setOnComplete = __bind(this.setOnComplete, this);

    this.setDataJson = __bind(this.setDataJson, this);

    this.setDataBytes = __bind(this.setDataBytes, this);

    this.setClientId = __bind(this.setClientId, this);

    this.getTag = __bind(this.getTag, this);

    this.getOnSuccess = __bind(this.getOnSuccess, this);

    this.getOnFailure = __bind(this.getOnFailure, this);

    this.getOnComplete = __bind(this.getOnComplete, this);

    this.getIsBinary = __bind(this.getIsBinary, this);

    this.getDataJson = __bind(this.getDataJson, this);

    this.getDataBytes = __bind(this.getDataBytes, this);

    this.getClientId = __bind(this.getClientId, this);

    var clientId, dataJson, tag;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      notifyArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 3) {
      clientId = arguments[0];
      dataJson = arguments[1];
      tag = arguments[2];
      notifyArgs.__super__.constructor.call(this);
      this.setClientId(clientId);
      this.setDataJson(dataJson);
      this.setTag(tag);
      return;
    }
    if (arguments.length === 2) {
      clientId = arguments[0];
      dataJson = arguments[1];
      notifyArgs.call(this, clientId, dataJson, null);
      return;
    }
  }

  /*<span id='method-fm.websync.notifyArgs-getClientId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the client ID to notify.
  	 </div>
  
  	@function getClientId
  	@return {fm.guid}
  */


  notifyArgs.prototype.getClientId = function() {
    var nullable;
    nullable = fm.serializer.deserializeGuid(this.getExtensionValueJson("fm.notify"));
    if (nullable !== null) {
      return nullable;
    }
    return fm.guid.empty;
  };

  /*<span id='method-fm.websync.notifyArgs-getDataBytes'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data to send in binary format.
  	 (Overrides <see cref="fm.websync.notifyArgs.dataJson">fm.websync.notifyArgs.dataJson</see>.)
  	 </div>
  
  	@function getDataBytes
  	@return {fm.array}
  */


  notifyArgs.prototype.getDataBytes = function() {
    var decoded, valueJson, _var0, _var1, _var2, _var3;
    decoded = this.__dataBytes;
    valueJson = this.__dataJson;
    _var0 = decoded;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return decoded;
    }
    _var1 = valueJson;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      _var2 = new fm.holder(decoded);
      _var3 = fm.websync.crypto.tryBase64Decode(fm.serializer.deserializeString(valueJson), _var2);
      decoded = _var2.getValue();
      _var3;

      this.__dataBytes = decoded;
      return decoded;
    }
    return null;
  };

  /*<span id='method-fm.websync.notifyArgs-getDataJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data to send in JSON format.
  	 (Overrides <see cref="fm.websync.notifyArgs.dataBytes">fm.websync.notifyArgs.dataBytes</see>.)
  	 </div>
  
  	@function getDataJson
  	@return {String}
  */


  notifyArgs.prototype.getDataJson = function() {
    var b, str, _var0, _var1;
    str = this.__dataJson;
    b = this.__dataBytes;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return str;
    }
    _var1 = b;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      str = fm.serializer.serializeString(fm.websync.crypto.base64Encode(b));
      this.__dataJson = str;
      return str;
    }
    return null;
  };

  /*<span id='method-fm.websync.notifyArgs-getIsBinary'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether or not the data is binary.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
  */


  notifyArgs.prototype.getIsBinary = function() {
    var _var0;
    _var0 = this.getDataBytes();
    return _var0 !== null && typeof _var0 !== 'undefined';
  };

  /*<span id='method-fm.websync.notifyArgs-getOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke after <see cref="fm.websync.notifyArgs.onSuccess">fm.websync.notifyArgs.onSuccess</see> or <see cref="fm.websync.notifyArgs.onFailure">fm.websync.notifyArgs.onFailure</see>.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
  */


  notifyArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };

  /*<span id='method-fm.websync.notifyArgs-getOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the request fails.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
  */


  notifyArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };

  /*<span id='method-fm.websync.notifyArgs-getOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
  */


  notifyArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };

  /*<span id='method-fm.websync.notifyArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  notifyArgs.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };

  /*<span id='method-fm.websync.notifyArgs-setClientId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the client ID to notify.
  	 </div>
  
  	@function setClientId
  	@param {fm.guid} value
  	@return {void}
  */


  notifyArgs.prototype.setClientId = function() {
    var value;
    value = arguments[0];
    return this.setExtensionValueJson("fm.notify", fm.serializer.serializeGuid(value), false);
  };

  /*<span id='method-fm.websync.notifyArgs-setDataBytes'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the data to send in binary format.
  	 (Overrides <see cref="fm.websync.notifyArgs.dataJson">fm.websync.notifyArgs.dataJson</see>.)
  	 </div>
  
  	@function setDataBytes
  	@param {fm.array} value
  	@return {void}
  */


  notifyArgs.prototype.setDataBytes = function() {
    var value;
    value = arguments[0];
    this.__dataJson = null;
    return this.__dataBytes = value;
  };

  /*<span id='method-fm.websync.notifyArgs-setDataJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the data to send in JSON format.
  	 (Overrides <see cref="fm.websync.notifyArgs.dataBytes">fm.websync.notifyArgs.dataBytes</see>.)
  	 </div>
  
  	@function setDataJson
  	@param {String} value
  	@return {void}
  */


  notifyArgs.prototype.setDataJson = function() {
    var value, _var0;
    value = arguments[0];
    _var0 = value;
    if (!((_var0 === null || typeof _var0 === 'undefined') || fm.serializer.isValidJson(value))) {
      throw new Error("The value is not valid JSON.");
    }
    this.__dataJson = value;
    return this.__dataBytes = null;
  };

  /*<span id='method-fm.websync.notifyArgs-setOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke after <see cref="fm.websync.notifyArgs.onSuccess">fm.websync.notifyArgs.onSuccess</see> or <see cref="fm.websync.notifyArgs.onFailure">fm.websync.notifyArgs.onFailure</see>.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  notifyArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };

  /*<span id='method-fm.websync.notifyArgs-setOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the request fails.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  notifyArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };

  /*<span id='method-fm.websync.notifyArgs-setOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  notifyArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };

  /*<span id='method-fm.websync.notifyArgs-setTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function setTag
  	@param {String} value
  	@return {void}
  */


  notifyArgs.prototype.setTag = function() {
    var value;
    value = arguments[0];
    return this.setExtensionValueJson("fm.tag", fm.serializer.serializeString(value), false);
  };

  notifyArgs.prototype.getData = function() {
    return fm.json.deserialize(this.getDataJson.apply(this, arguments));
  };

  notifyArgs.prototype.setData = function() {
    var data;
    data = arguments[0];
    arguments[arguments.length - 1] = fm.json.serialize(arguments[arguments.length - 1]);
    return this.setDataJson.apply(this, arguments);
  };

  return notifyArgs;

})(fm.websync.baseInputArgs);


/*<span id='cls-fm.websync.baseCompleteArgs'>&nbsp;</span>
*/

/**
@class fm.websync.baseCompleteArgs
 <div>
 Base arguments for <see cref="fm.websync.client">fm.websync.client</see> "OnComplete" callbacks.
 </div>

@extends fm.websync.baseOutputArgs
*/


fm.websync.baseCompleteArgs = (function(_super) {

  __extends(baseCompleteArgs, _super);

  function baseCompleteArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    baseCompleteArgs.__super__.constructor.call(this);
  }

  return baseCompleteArgs;

})(fm.websync.baseOutputArgs);


/*<span id='cls-fm.websync.notifyCompleteArgs'>&nbsp;</span>
*/

/**
@class fm.websync.notifyCompleteArgs
 <div>
 Arguments for notify complete callbacks.
 </div>

@extends fm.websync.baseCompleteArgs
*/


fm.websync.notifyCompleteArgs = (function(_super) {

  __extends(notifyCompleteArgs, _super);

  function notifyCompleteArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      notifyCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    notifyCompleteArgs.__super__.constructor.call(this);
  }

  return notifyCompleteArgs;

})(fm.websync.baseCompleteArgs);


/*<span id='cls-fm.websync.baseFailureArgs'>&nbsp;</span>
*/

/**
@class fm.websync.baseFailureArgs
 <div>
 Base arguments for <see cref="fm.websync.client">fm.websync.client</see> "OnFailure" callbacks.
 </div>

@extends fm.websync.baseOutputArgs
*/


fm.websync.baseFailureArgs = (function(_super) {

  __extends(baseFailureArgs, _super);

  baseFailureArgs.prototype._exception = null;

  baseFailureArgs.prototype._retry = false;

  function baseFailureArgs() {
    this.setRetry = __bind(this.setRetry, this);

    this.setException = __bind(this.setException, this);

    this.getRetry = __bind(this.getRetry, this);

    this.getException = __bind(this.getException, this);

    this.getErrorMessage = __bind(this.getErrorMessage, this);

    this.getErrorCode = __bind(this.getErrorCode, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    baseFailureArgs.__super__.constructor.call(this);
  }

  baseFailureArgs.getErrorCode = function() {
    var exception, intResult, s, _var0, _var1, _var2;
    exception = arguments[0];
    intResult = -1;
    try {
      _var0 = exception;
      if ((_var0 === null || typeof _var0 === 'undefined') || fm.stringExtensions.isNullOrEmpty(exception.message)) {
        return intResult;
      }
      if (fm.stringExtensions.indexOf(exception.message, "::") > -1) {
        s = fm.websync.splitter.split(exception.message, "::")[0];
        _var1 = new fm.holder(intResult);
        _var2 = fm.parseAssistant.tryParseIntegerValue(s, _var1);
        intResult = _var1.getValue();
        _var2;

      }
    } catch (obj1) {

    } finally {

    }
    return intResult;
  };

  baseFailureArgs.getErrorMessage = function() {
    var exception, message, _var0;
    exception = arguments[0];
    message = null;
    try {
      _var0 = exception;
      if ((_var0 === null || typeof _var0 === 'undefined') || fm.stringExtensions.isNullOrEmpty(exception.message)) {
        return message;
      }
      if (fm.stringExtensions.indexOf(exception.message, "::") > -1) {
        return fm.websync.splitter.split(exception.message, "::")[1];
      }
      message = exception.message;
    } catch (obj1) {

    } finally {

    }
    return message;
  };

  /*<span id='method-fm.websync.baseFailureArgs-getErrorCode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the error code value, if the exception was generated by WebSync; otherwise -1.
  	 </div>
  
  	@function getErrorCode
  	@return {Integer}
  */


  baseFailureArgs.prototype.getErrorCode = function() {
    return fm.websync.baseFailureArgs.getErrorCode(this.getException());
  };

  /*<span id='method-fm.websync.baseFailureArgs-getErrorMessage'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the error message value, if the exception was generated by WebSync; otherwise <c>null</c>.
  	 </div>
  
  	@function getErrorMessage
  	@return {String}
  */


  baseFailureArgs.prototype.getErrorMessage = function() {
    return fm.websync.baseFailureArgs.getErrorMessage(this.getException());
  };

  /*<span id='method-fm.websync.baseFailureArgs-getException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the exception generated while completing the request.
  	 </div>
  
  	@function getException
  	@return {Error}
  */


  baseFailureArgs.prototype.getException = function() {
    return this._exception;
  };

  /*<span id='method-fm.websync.baseFailureArgs-getRetry'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether or not to retry automatically after completing this operation.
  	 </div>
  
  	@function getRetry
  	@return {Boolean}
  */


  baseFailureArgs.prototype.getRetry = function() {
    return this._retry;
  };

  /*<span id='method-fm.websync.baseFailureArgs-setException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the exception generated while completing the request.
  	 </div>
  
  	@function setException
  	@param {Error} value
  	@return {void}
  */


  baseFailureArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  /*<span id='method-fm.websync.baseFailureArgs-setRetry'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets whether or not to retry automatically after completing this operation.
  	 </div>
  
  	@function setRetry
  	@param {Boolean} value
  	@return {void}
  */


  baseFailureArgs.prototype.setRetry = function() {
    var value;
    value = arguments[0];
    return this._retry = value;
  };

  return baseFailureArgs;

}).call(this, fm.websync.baseOutputArgs);


/*<span id='cls-fm.websync.notifyFailureArgs'>&nbsp;</span>
*/

/**
@class fm.websync.notifyFailureArgs
 <div>
 Arguments for notify failure callbacks.
 </div>

@extends fm.websync.baseFailureArgs
*/


fm.websync.notifyFailureArgs = (function(_super) {

  __extends(notifyFailureArgs, _super);

  notifyFailureArgs.prototype.__dataBytes = null;

  notifyFailureArgs.prototype.__dataJson = null;

  function notifyFailureArgs() {
    this.getData = __bind(this.getData, this);

    this.getTag = __bind(this.getTag, this);

    this.getIsBinary = __bind(this.getIsBinary, this);

    this.getDataJson = __bind(this.getDataJson, this);

    this.getDataBytes = __bind(this.getDataBytes, this);

    this.getClientId = __bind(this.getClientId, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      notifyFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    notifyFailureArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.notifyFailureArgs-getClientId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the client ID to which the data failed to be sent.
  	 </div>
  
  	@function getClientId
  	@return {fm.guid}
  */


  notifyFailureArgs.prototype.getClientId = function() {
    var nullable;
    nullable = fm.serializer.deserializeGuid(this.getExtensionValueJson("fm.notify"));
    if (nullable !== null) {
      return nullable;
    }
    return fm.guid.empty;
  };

  /*<span id='method-fm.websync.notifyFailureArgs-getDataBytes'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data that failed to be sent in binary format.
  	 </div>
  
  	@function getDataBytes
  	@return {fm.array}
  */


  notifyFailureArgs.prototype.getDataBytes = function() {
    var decoded, valueJson, _var0, _var1, _var2, _var3;
    decoded = this.__dataBytes;
    valueJson = this.__dataJson;
    _var0 = decoded;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return decoded;
    }
    _var1 = valueJson;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      _var2 = new fm.holder(decoded);
      _var3 = fm.websync.crypto.tryBase64Decode(fm.serializer.deserializeString(valueJson), _var2);
      decoded = _var2.getValue();
      _var3;

      this.__dataBytes = decoded;
      return decoded;
    }
    return null;
  };

  /*<span id='method-fm.websync.notifyFailureArgs-getDataJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data that failed to be sent in JSON format.
  	 </div>
  
  	@function getDataJson
  	@return {String}
  */


  notifyFailureArgs.prototype.getDataJson = function() {
    var b, str, _var0, _var1;
    str = this.__dataJson;
    b = this.__dataBytes;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return str;
    }
    _var1 = b;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      str = fm.serializer.serializeString(fm.websync.crypto.base64Encode(b));
      this.__dataJson = str;
      return str;
    }
    return null;
  };

  /*<span id='method-fm.websync.notifyFailureArgs-getIsBinary'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether or not the data is binary.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
  */


  notifyFailureArgs.prototype.getIsBinary = function() {
    var _var0;
    _var0 = this.getDataBytes();
    return _var0 !== null && typeof _var0 !== 'undefined';
  };

  /*<span id='method-fm.websync.notifyFailureArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  notifyFailureArgs.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };

  notifyFailureArgs.prototype.getData = function() {
    return fm.json.deserialize(this.getDataJson.apply(this, arguments));
  };

  return notifyFailureArgs;

})(fm.websync.baseFailureArgs);


/*<span id='cls-fm.websync.notifySuccessArgs'>&nbsp;</span>
*/

/**
@class fm.websync.notifySuccessArgs
 <div>
 Arguments for notify success callbacks.
 </div>

@extends fm.websync.baseSuccessArgs
*/


fm.websync.notifySuccessArgs = (function(_super) {

  __extends(notifySuccessArgs, _super);

  notifySuccessArgs.prototype.__dataBytes = null;

  notifySuccessArgs.prototype.__dataJson = null;

  function notifySuccessArgs() {
    this.getData = __bind(this.getData, this);

    this.getTag = __bind(this.getTag, this);

    this.getIsBinary = __bind(this.getIsBinary, this);

    this.getDataJson = __bind(this.getDataJson, this);

    this.getDataBytes = __bind(this.getDataBytes, this);

    this.getClientId = __bind(this.getClientId, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      notifySuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    notifySuccessArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.notifySuccessArgs-getClientId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the client ID to which the data was sent.
  	 </div>
  
  	@function getClientId
  	@return {fm.guid}
  */


  notifySuccessArgs.prototype.getClientId = function() {
    var nullable;
    nullable = fm.serializer.deserializeGuid(this.getExtensionValueJson("fm.notify"));
    if (nullable !== null) {
      return nullable;
    }
    return fm.guid.empty;
  };

  /*<span id='method-fm.websync.notifySuccessArgs-getDataBytes'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data that was sent in binary format.
  	 </div>
  
  	@function getDataBytes
  	@return {fm.array}
  */


  notifySuccessArgs.prototype.getDataBytes = function() {
    var decoded, valueJson, _var0, _var1, _var2, _var3;
    decoded = this.__dataBytes;
    valueJson = this.__dataJson;
    _var0 = decoded;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return decoded;
    }
    _var1 = valueJson;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      _var2 = new fm.holder(decoded);
      _var3 = fm.websync.crypto.tryBase64Decode(fm.serializer.deserializeString(valueJson), _var2);
      decoded = _var2.getValue();
      _var3;

      this.__dataBytes = decoded;
      return decoded;
    }
    return null;
  };

  /*<span id='method-fm.websync.notifySuccessArgs-getDataJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data that was sent in JSON format.
  	 </div>
  
  	@function getDataJson
  	@return {String}
  */


  notifySuccessArgs.prototype.getDataJson = function() {
    var b, str, _var0, _var1;
    str = this.__dataJson;
    b = this.__dataBytes;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return str;
    }
    _var1 = b;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      str = fm.serializer.serializeString(fm.websync.crypto.base64Encode(b));
      this.__dataJson = str;
      return str;
    }
    return null;
  };

  /*<span id='method-fm.websync.notifySuccessArgs-getIsBinary'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether or not the data is binary.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
  */


  notifySuccessArgs.prototype.getIsBinary = function() {
    var _var0;
    _var0 = this.getDataBytes();
    return _var0 !== null && typeof _var0 !== 'undefined';
  };

  /*<span id='method-fm.websync.notifySuccessArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  notifySuccessArgs.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };

  notifySuccessArgs.prototype.getData = function() {
    return fm.json.deserialize(this.getDataJson.apply(this, arguments));
  };

  return notifySuccessArgs;

})(fm.websync.baseSuccessArgs);


/*<span id='cls-fm.websync.publisherNotifyResponseArgs'>&nbsp;</span>
*/

/**
@class fm.websync.publisherNotifyResponseArgs
 <div>
 Arguments for <see cref="fm.websync.publisher.addOnNotifyResponse">fm.websync.publisher.addOnNotifyResponse</see>.
 </div>

@extends fm.websync.basePublisherResponseEventArgsGeneric
*/


fm.websync.publisherNotifyResponseArgs = (function(_super) {

  __extends(publisherNotifyResponseArgs, _super);

  function publisherNotifyResponseArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      publisherNotifyResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    publisherNotifyResponseArgs.__super__.constructor.call(this);
  }

  return publisherNotifyResponseArgs;

})(fm.websync.basePublisherResponseEventArgsGeneric);


/*<span id='cls-fm.websync.publisherNotifyRequestArgs'>&nbsp;</span>
*/

/**
@class fm.websync.publisherNotifyRequestArgs
 <div>
 Arguments for <see cref="fm.websync.publisher.addOnNotifyRequest">fm.websync.publisher.addOnNotifyRequest</see>.
 </div>

@extends fm.websync.basePublisherRequestEventArgsGeneric
*/


fm.websync.publisherNotifyRequestArgs = (function(_super) {

  __extends(publisherNotifyRequestArgs, _super);

  function publisherNotifyRequestArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      publisherNotifyRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    publisherNotifyRequestArgs.__super__.constructor.call(this);
  }

  return publisherNotifyRequestArgs;

})(fm.websync.basePublisherRequestEventArgsGeneric);


/*<span id='cls-fm.websync.unhandledExceptionArgs'>&nbsp;</span>
*/

/**
@class fm.websync.unhandledExceptionArgs
 <div>
 Arguments for an unhandled exception.
 </div>

@extends fm.object
*/


fm.websync.unhandledExceptionArgs = (function(_super) {

  __extends(unhandledExceptionArgs, _super);

  unhandledExceptionArgs.prototype.__exception = null;

  unhandledExceptionArgs.prototype._handled = false;

  function unhandledExceptionArgs() {
    this.setHandled = __bind(this.setHandled, this);

    this.getHandled = __bind(this.getHandled, this);

    this.getException = __bind(this.getException, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      unhandledExceptionArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    unhandledExceptionArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.unhandledExceptionArgs-getException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the unhandled exception.
  	 </div>
  
  	@function getException
  	@return {Error}
  */


  unhandledExceptionArgs.prototype.getException = function() {
    return this.__exception;
  };

  /*<span id='method-fm.websync.unhandledExceptionArgs-getHandled'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the exception has been
  	 appropriately handled. If set to <c>true</c>,
  	 then the exception will not be thrown.
  	 </div>
  
  	@function getHandled
  	@return {Boolean}
  */


  unhandledExceptionArgs.prototype.getHandled = function() {
    return this._handled;
  };

  /*<span id='method-fm.websync.unhandledExceptionArgs-setHandled'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets whether the exception has been
  	 appropriately handled. If set to <c>true</c>,
  	 then the exception will not be thrown.
  	 </div>
  
  	@function setHandled
  	@param {Boolean} value
  	@return {void}
  */


  unhandledExceptionArgs.prototype.setHandled = function() {
    var value;
    value = arguments[0];
    return this._handled = value;
  };

  return unhandledExceptionArgs;

})(fm.object);




fm.websync.clientResponseArgs = (function(_super) {

  __extends(clientResponseArgs, _super);

  clientResponseArgs.prototype._exception = null;

  clientResponseArgs.prototype._responses = null;

  function clientResponseArgs() {
    this.setResponses = __bind(this.setResponses, this);

    this.setResponse = __bind(this.setResponse, this);

    this.setException = __bind(this.setException, this);

    this.getResponses = __bind(this.getResponses, this);

    this.getResponse = __bind(this.getResponse, this);

    this.getException = __bind(this.getException, this);

    this.getErrorMessage = __bind(this.getErrorMessage, this);

    this.getErrorCode = __bind(this.getErrorCode, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientResponseArgs.__super__.constructor.call(this);
  }

  clientResponseArgs.prototype.getErrorCode = function() {
    return fm.websync.baseFailureArgs.getErrorCode(this.getException());
  };

  clientResponseArgs.prototype.getErrorMessage = function() {
    return fm.websync.baseFailureArgs.getErrorMessage(this.getException());
  };

  clientResponseArgs.prototype.getException = function() {
    return this._exception;
  };

  clientResponseArgs.prototype.getResponse = function() {
    var _var0;
    _var0 = this.getResponses();
    if ((_var0 === null || typeof _var0 === 'undefined') || (this.getResponses().length === 0)) {
      return null;
    }
    return this.getResponses()[0];
  };

  clientResponseArgs.prototype.getResponses = function() {
    return this._responses;
  };

  clientResponseArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  clientResponseArgs.prototype.setResponse = function() {
    var value;
    value = arguments[0];
    return this.setResponses([value]);
  };

  clientResponseArgs.prototype.setResponses = function() {
    var value;
    value = arguments[0];
    return this._responses = value;
  };

  return clientResponseArgs;

})(fm.dynamic);


/*<span id='cls-fm.websync.connectArgs'>&nbsp;</span>
*/

/**
@class fm.websync.connectArgs
 <div>
 Arguments for client connect requests.
 </div>

@extends fm.websync.baseInputArgs
*/


fm.websync.connectArgs = (function(_super) {

  __extends(connectArgs, _super);

  connectArgs.prototype._defaultRetryBackoffTimeout = 0;

  connectArgs.prototype._isReconnect = false;

  connectArgs.prototype._lastClientId = null;

  connectArgs.prototype._lastSessionId = null;

  connectArgs.prototype._onComplete = null;

  connectArgs.prototype._onFailure = null;

  connectArgs.prototype._onStreamFailure = null;

  connectArgs.prototype._onSuccess = null;

  connectArgs.prototype._retryBackoff = null;

  connectArgs.prototype._retryMode = null;

  /*<span id='method-fm.websync.connectArgs-fm.websync.connectArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Creates a new instance of <see cref="fm.websync.connectArgs">fm.websync.connectArgs</see>.
  	 </div>
  
  	@function fm.websync.connectArgs
  	@return {}
  */


  function connectArgs() {
    this.setRetryMode = __bind(this.setRetryMode, this);

    this.setRetryBackoff = __bind(this.setRetryBackoff, this);

    this.setOnSuccess = __bind(this.setOnSuccess, this);

    this.setOnStreamFailure = __bind(this.setOnStreamFailure, this);

    this.setOnFailure = __bind(this.setOnFailure, this);

    this.setOnComplete = __bind(this.setOnComplete, this);

    this.setLastSessionId = __bind(this.setLastSessionId, this);

    this.setLastClientId = __bind(this.setLastClientId, this);

    this.setIsReconnect = __bind(this.setIsReconnect, this);

    this.getRetryMode = __bind(this.getRetryMode, this);

    this.getRetryBackoff = __bind(this.getRetryBackoff, this);

    this.getOnSuccess = __bind(this.getOnSuccess, this);

    this.getOnStreamFailure = __bind(this.getOnStreamFailure, this);

    this.getOnFailure = __bind(this.getOnFailure, this);

    this.getOnComplete = __bind(this.getOnComplete, this);

    this.getLastSessionId = __bind(this.getLastSessionId, this);

    this.getLastClientId = __bind(this.getLastClientId, this);

    this.getIsReconnect = __bind(this.getIsReconnect, this);

    this.defaultRetryBackoff = __bind(this.defaultRetryBackoff, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      connectArgs.__super__.constructor.call(this);
      this._defaultRetryBackoffTimeout = 500;
      this.setRetryMode(fm.websync.connectRetryMode.Intelligent);
      this.setRetryBackoff(this.defaultRetryBackoff);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    connectArgs.__super__.constructor.call(this);
    this._defaultRetryBackoffTimeout = 500;
    this.setRetryMode(fm.websync.connectRetryMode.Intelligent);
    this.setRetryBackoff(this.defaultRetryBackoff);
  }

  connectArgs.prototype.defaultRetryBackoff = function() {
    var e;
    e = arguments[0];
    if (e.getIndex() === 0) {
      return this._defaultRetryBackoffTimeout;
    }
    return e.getLastTimeout() * 2;
  };

  connectArgs.prototype.getIsReconnect = function() {
    return this._isReconnect;
  };

  connectArgs.prototype.getLastClientId = function() {
    return this._lastClientId;
  };

  connectArgs.prototype.getLastSessionId = function() {
    return this._lastSessionId;
  };

  /*<span id='method-fm.websync.connectArgs-getOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke after <see cref="fm.websync.connectArgs.onSuccess">fm.websync.connectArgs.onSuccess</see> or <see cref="fm.websync.connectArgs.onFailure">fm.websync.connectArgs.onFailure</see>.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
  */


  connectArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };

  /*<span id='method-fm.websync.connectArgs-getOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the request fails.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
  */


  connectArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };

  /*<span id='method-fm.websync.connectArgs-getOnStreamFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the streaming connection fails.
  	 See <see cref="fm.websync.streamFailureArgs">fm.websync.streamFailureArgs</see> for callback argument details.
  	 </div><div>
  	 <p>
  	 This method will be invoked if the connection was lost or the client
  	 record no longer exists on the server (either due to network loss or
  	 an application pool recycle). In either case, the client will automatically
  	 reconnect after firing this callback. If the reconnect succeeds, the
  	 OnSuccess callback will be invoked with <see cref="fm.websync.connectSuccessArgs.isReconnect">fm.websync.connectSuccessArgs.isReconnect</see>
  	 set to <c>true</c>. If the reconnect succeeds, the OnFailure callback
  	 will be invoked with <see cref="fm.websync.connectFailureArgs.isReconnect">fm.websync.connectFailureArgs.isReconnect</see> set
  	 to <c>true</c>.
  	 </p>
  	 <p>
  	 This is the recommended place to perform any UI updates necessary to
  	 inform the application user that the connection has been temporarily
  	 lost. Any UI components shown by this callback can be hidden in
  	 either OnSuccess or OnFailure.
  	 </p>
  	 </div>
  
  	@function getOnStreamFailure
  	@return {fm.singleAction}
  */


  connectArgs.prototype.getOnStreamFailure = function() {
    return this._onStreamFailure;
  };

  /*<span id='method-fm.websync.connectArgs-getOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
  */


  connectArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };

  /*<span id='method-fm.websync.connectArgs-getRetryBackoff'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the backoff algorithm to use when retrying a failed connect handshake.
  	 Used to calculate the sleep timeout before retrying if <see cref="fm.websync.baseFailureArgs.retry">fm.websync.baseFailureArgs.retry</see>
  	 is set to <c>true</c> in <see cref="fm.websync.connectFailureArgs">fm.websync.connectFailureArgs</see>. The function should return
  	 the desired timeout in milliseconds.
  	 </div>
  
  	@function getRetryBackoff
  	@return {fm.websync.retryBackoffCallback}
  */


  connectArgs.prototype.getRetryBackoff = function() {
    return this._retryBackoff;
  };

  /*<span id='method-fm.websync.connectArgs-getRetryMode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the mode under which the client is expected to operate when
  	 a connect handshake fails. This property controls the default value of
  	 <see cref="fm.websync.baseFailureArgs.retry">fm.websync.baseFailureArgs.retry</see> in <see cref="fm.websync.connectFailureArgs">fm.websync.connectFailureArgs</see>,
  	 which can be overridden.
  	 </div>
  
  	@function getRetryMode
  	@return {fm.websync.connectRetryMode}
  */


  connectArgs.prototype.getRetryMode = function() {
    return this._retryMode;
  };

  connectArgs.prototype.setIsReconnect = function() {
    var value;
    value = arguments[0];
    return this._isReconnect = value;
  };

  connectArgs.prototype.setLastClientId = function() {
    var value;
    value = arguments[0];
    return this._lastClientId = value;
  };

  connectArgs.prototype.setLastSessionId = function() {
    var value;
    value = arguments[0];
    return this._lastSessionId = value;
  };

  /*<span id='method-fm.websync.connectArgs-setOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke after <see cref="fm.websync.connectArgs.onSuccess">fm.websync.connectArgs.onSuccess</see> or <see cref="fm.websync.connectArgs.onFailure">fm.websync.connectArgs.onFailure</see>.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  connectArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };

  /*<span id='method-fm.websync.connectArgs-setOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the request fails.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  connectArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };

  /*<span id='method-fm.websync.connectArgs-setOnStreamFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the streaming connection fails.
  	 See <see cref="fm.websync.streamFailureArgs">fm.websync.streamFailureArgs</see> for callback argument details.
  	 </div><div>
  	 <p>
  	 This method will be invoked if the connection was lost or the client
  	 record no longer exists on the server (either due to network loss or
  	 an application pool recycle). In either case, the client will automatically
  	 reconnect after firing this callback. If the reconnect succeeds, the
  	 OnSuccess callback will be invoked with <see cref="fm.websync.connectSuccessArgs.isReconnect">fm.websync.connectSuccessArgs.isReconnect</see>
  	 set to <c>true</c>. If the reconnect succeeds, the OnFailure callback
  	 will be invoked with <see cref="fm.websync.connectFailureArgs.isReconnect">fm.websync.connectFailureArgs.isReconnect</see> set
  	 to <c>true</c>.
  	 </p>
  	 <p>
  	 This is the recommended place to perform any UI updates necessary to
  	 inform the application user that the connection has been temporarily
  	 lost. Any UI components shown by this callback can be hidden in
  	 either OnSuccess or OnFailure.
  	 </p>
  	 </div>
  
  	@function setOnStreamFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  connectArgs.prototype.setOnStreamFailure = function() {
    var value;
    value = arguments[0];
    return this._onStreamFailure = value;
  };

  /*<span id='method-fm.websync.connectArgs-setOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  connectArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };

  /*<span id='method-fm.websync.connectArgs-setRetryBackoff'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the backoff algorithm to use when retrying a failed connect handshake.
  	 Used to calculate the sleep timeout before retrying if <see cref="fm.websync.baseFailureArgs.retry">fm.websync.baseFailureArgs.retry</see>
  	 is set to <c>true</c> in <see cref="fm.websync.connectFailureArgs">fm.websync.connectFailureArgs</see>. The function should return
  	 the desired timeout in milliseconds.
  	 </div>
  
  	@function setRetryBackoff
  	@param {fm.websync.retryBackoffCallback} value
  	@return {void}
  */


  connectArgs.prototype.setRetryBackoff = function() {
    var value;
    value = arguments[0];
    return this._retryBackoff = value;
  };

  /*<span id='method-fm.websync.connectArgs-setRetryMode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the mode under which the client is expected to operate when
  	 a connect handshake fails. This property controls the default value of
  	 <see cref="fm.websync.baseFailureArgs.retry">fm.websync.baseFailureArgs.retry</see> in <see cref="fm.websync.connectFailureArgs">fm.websync.connectFailureArgs</see>,
  	 which can be overridden.
  	 </div>
  
  	@function setRetryMode
  	@param {fm.websync.connectRetryMode} value
  	@return {void}
  */


  connectArgs.prototype.setRetryMode = function() {
    var value;
    value = arguments[0];
    return this._retryMode = value;
  };

  return connectArgs;

})(fm.websync.baseInputArgs);


/*<span id='cls-fm.websync.bindArgs'>&nbsp;</span>
*/

/**
@class fm.websync.bindArgs
 <div>
 Arguments for client bind requests.
 </div>

@extends fm.websync.baseInputArgs
*/


fm.websync.bindArgs = (function(_super) {

  __extends(bindArgs, _super);

  bindArgs.prototype.__records = null;

  bindArgs.prototype._autoRebind = null;

  bindArgs.prototype._isRebind = false;

  bindArgs.prototype._onComplete = null;

  bindArgs.prototype._onFailure = null;

  bindArgs.prototype._onSuccess = null;

  /*<span id='method-fm.websync.bindArgs-fm.websync.bindArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.bindArgs">fm.websync.bindArgs</see> class.
  	 </div>
  	@function fm.websync.bindArgs
  	@param {fm.array} records The records to bind.
  	@return {}
  */


  function bindArgs() {
    this.setRecords = __bind(this.setRecords, this);

    this.setRecord = __bind(this.setRecord, this);

    this.setOnSuccess = __bind(this.setOnSuccess, this);

    this.setOnFailure = __bind(this.setOnFailure, this);

    this.setOnComplete = __bind(this.setOnComplete, this);

    this.setIsRebind = __bind(this.setIsRebind, this);

    this.setAutoRebind = __bind(this.setAutoRebind, this);

    this.getRecords = __bind(this.getRecords, this);

    this.getRecord = __bind(this.getRecord, this);

    this.getOnSuccess = __bind(this.getOnSuccess, this);

    this.getOnFailure = __bind(this.getOnFailure, this);

    this.getOnComplete = __bind(this.getOnComplete, this);

    this.getIsRebind = __bind(this.getIsRebind, this);

    this.getAutoRebind = __bind(this.getAutoRebind, this);

    var records;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      bindArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    records = arguments[0];
    bindArgs.__super__.constructor.call(this);
    this.setRecords(records);
  }

  /*<span id='method-fm.websync.bindArgs-getAutoRebind'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether to call Bind with these args
  	 immediately after a reconnect following a stream failure.
  	 Generally, this should be <c>null</c>. The client will
  	 analyze the current context and set this flag as needed.
  	 However, it can be overridden for special cases. If set
  	 explicitly to <c>false</c>, then the client will assume
  	 that this call to Bind is being invoked from the
  	 OnSuccess callback of another WebSync method call, and
  	 therefore will be called again implicitly after a
  	 network reconnection. If set to
  	 <c>true</c>, then the client will assume this call to
  	 Bind is being invoked as a part of some external
  	 action and will force a Bind call using these arguments
  	 after a network reconnection. Defaults to <c>null</c>.
  	 </div>
  
  	@function getAutoRebind
  	@return {fm.nullable}
  */


  bindArgs.prototype.getAutoRebind = function() {
    return this._autoRebind;
  };

  bindArgs.prototype.getIsRebind = function() {
    return this._isRebind;
  };

  /*<span id='method-fm.websync.bindArgs-getOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke after <see cref="fm.websync.bindArgs.onSuccess">fm.websync.bindArgs.onSuccess</see> or <see cref="fm.websync.bindArgs.onFailure">fm.websync.bindArgs.onFailure</see>.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
  */


  bindArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };

  /*<span id='method-fm.websync.bindArgs-getOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the request fails.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
  */


  bindArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };

  /*<span id='method-fm.websync.bindArgs-getOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
  */


  bindArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };

  /*<span id='method-fm.websync.bindArgs-getRecord'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record to bind.
  	 Overrides <see cref="fm.websync.bindArgs.records">fm.websync.bindArgs.records</see>.
  	 </div>
  
  	@function getRecord
  	@return {fm.websync.record}
  */


  bindArgs.prototype.getRecord = function() {
    return fm.websync.extensible.sharedGetRecord(this.__records);
  };

  /*<span id='method-fm.websync.bindArgs-getRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the records to bind.
  	 Overrides <see cref="fm.websync.bindArgs.record">fm.websync.bindArgs.record</see>.
  	 </div>
  
  	@function getRecords
  	@return {fm.array}
  */


  bindArgs.prototype.getRecords = function() {
    return fm.websync.extensible.sharedGetRecords(this.__records);
  };

  /*<span id='method-fm.websync.bindArgs-setAutoRebind'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets whether to call Bind with these args
  	 immediately after a reconnect following a stream failure.
  	 Generally, this should be <c>null</c>. The client will
  	 analyze the current context and set this flag as needed.
  	 However, it can be overridden for special cases. If set
  	 explicitly to <c>false</c>, then the client will assume
  	 that this call to Bind is being invoked from the
  	 OnSuccess callback of another WebSync method call, and
  	 therefore will be called again implicitly after a
  	 network reconnection. If set to
  	 <c>true</c>, then the client will assume this call to
  	 Bind is being invoked as a part of some external
  	 action and will force a Bind call using these arguments
  	 after a network reconnection. Defaults to <c>null</c>.
  	 </div>
  
  	@function setAutoRebind
  	@param {fm.nullable} value
  	@return {void}
  */


  bindArgs.prototype.setAutoRebind = function() {
    var value;
    value = arguments[0];
    return this._autoRebind = value;
  };

  bindArgs.prototype.setIsRebind = function() {
    var value;
    value = arguments[0];
    return this._isRebind = value;
  };

  /*<span id='method-fm.websync.bindArgs-setOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke after <see cref="fm.websync.bindArgs.onSuccess">fm.websync.bindArgs.onSuccess</see> or <see cref="fm.websync.bindArgs.onFailure">fm.websync.bindArgs.onFailure</see>.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  bindArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };

  /*<span id='method-fm.websync.bindArgs-setOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the request fails.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  bindArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };

  /*<span id='method-fm.websync.bindArgs-setOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  bindArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };

  /*<span id='method-fm.websync.bindArgs-setRecord'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the record to bind.
  	 Overrides <see cref="fm.websync.bindArgs.records">fm.websync.bindArgs.records</see>.
  	 </div>
  
  	@function setRecord
  	@param {fm.websync.record} value
  	@return {void}
  */


  bindArgs.prototype.setRecord = function() {
    var value;
    value = arguments[0];
    return this.__records = fm.websync.extensible.sharedSetRecord(value);
  };

  /*<span id='method-fm.websync.bindArgs-setRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the records to bind.
  	 Overrides <see cref="fm.websync.bindArgs.record">fm.websync.bindArgs.record</see>.
  	 </div>
  
  	@function setRecords
  	@param {fm.array} value
  	@return {void}
  */


  bindArgs.prototype.setRecords = function() {
    var value;
    value = arguments[0];
    return this.__records = fm.websync.extensible.sharedSetRecords(value);
  };

  return bindArgs;

})(fm.websync.baseInputArgs);


/*<span id='cls-fm.websync.serviceArgs'>&nbsp;</span>
*/

/**
@class fm.websync.serviceArgs
 <div>
 Arguments for client service requests.
 </div>

@extends fm.websync.baseInputArgs
*/


fm.websync.serviceArgs = (function(_super) {

  __extends(serviceArgs, _super);

  serviceArgs.prototype.__channel = null;

  serviceArgs.prototype.__dataBytes = null;

  serviceArgs.prototype.__dataJson = null;

  serviceArgs.prototype._onComplete = null;

  serviceArgs.prototype._onFailure = null;

  serviceArgs.prototype._onSuccess = null;

  /*<span id='method-fm.websync.serviceArgs-fm.websync.serviceArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.serviceArgs">fm.websync.serviceArgs</see> class.
  	 </div>
  	@function fm.websync.serviceArgs
  	@param {String} channel The channel to which the data should be sent.
  	@param {String} dataJson The data to send in JSON format.
  	@param {String} tag The tag that identifies the contents of the payload.
  	@return {}
  */


  function serviceArgs() {
    this.setData = __bind(this.setData, this);

    this.getData = __bind(this.getData, this);

    this.setTag = __bind(this.setTag, this);

    this.setOnSuccess = __bind(this.setOnSuccess, this);

    this.setOnFailure = __bind(this.setOnFailure, this);

    this.setOnComplete = __bind(this.setOnComplete, this);

    this.setDataJson = __bind(this.setDataJson, this);

    this.setDataBytes = __bind(this.setDataBytes, this);

    this.setChannel = __bind(this.setChannel, this);

    this.getTag = __bind(this.getTag, this);

    this.getOnSuccess = __bind(this.getOnSuccess, this);

    this.getOnFailure = __bind(this.getOnFailure, this);

    this.getOnComplete = __bind(this.getOnComplete, this);

    this.getIsBinary = __bind(this.getIsBinary, this);

    this.getDataJson = __bind(this.getDataJson, this);

    this.getDataBytes = __bind(this.getDataBytes, this);

    this.getChannel = __bind(this.getChannel, this);

    var channel, dataJson, tag;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      serviceArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 3) {
      channel = arguments[0];
      dataJson = arguments[1];
      tag = arguments[2];
      serviceArgs.__super__.constructor.call(this);
      this.setChannel(channel);
      this.setDataJson(dataJson);
      this.setTag(tag);
      return;
    }
    if (arguments.length === 2) {
      channel = arguments[0];
      dataJson = arguments[1];
      serviceArgs.call(this, channel, dataJson, null);
      return;
    }
  }

  /*<span id='method-fm.websync.serviceArgs-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel to which the data should be sent.
  	 Must start with a forward slash (/).
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  serviceArgs.prototype.getChannel = function() {
    return this.__channel;
  };

  /*<span id='method-fm.websync.serviceArgs-getDataBytes'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data to send in binary format.
  	 (Overrides <see cref="fm.websync.serviceArgs.dataJson">fm.websync.serviceArgs.dataJson</see>.)
  	 </div>
  
  	@function getDataBytes
  	@return {fm.array}
  */


  serviceArgs.prototype.getDataBytes = function() {
    var decoded, valueJson, _var0, _var1, _var2, _var3;
    decoded = this.__dataBytes;
    valueJson = this.__dataJson;
    _var0 = decoded;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return decoded;
    }
    _var1 = valueJson;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      _var2 = new fm.holder(decoded);
      _var3 = fm.websync.crypto.tryBase64Decode(fm.serializer.deserializeString(valueJson), _var2);
      decoded = _var2.getValue();
      _var3;

      this.__dataBytes = decoded;
      return decoded;
    }
    return null;
  };

  /*<span id='method-fm.websync.serviceArgs-getDataJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data to send in JSON format.
  	 (Overrides <see cref="fm.websync.serviceArgs.dataBytes">fm.websync.serviceArgs.dataBytes</see>.)
  	 </div>
  
  	@function getDataJson
  	@return {String}
  */


  serviceArgs.prototype.getDataJson = function() {
    var b, str, _var0, _var1;
    str = this.__dataJson;
    b = this.__dataBytes;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return str;
    }
    _var1 = b;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      str = fm.serializer.serializeString(fm.websync.crypto.base64Encode(b));
      this.__dataJson = str;
      return str;
    }
    return null;
  };

  /*<span id='method-fm.websync.serviceArgs-getIsBinary'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether or not the data is binary.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
  */


  serviceArgs.prototype.getIsBinary = function() {
    var _var0;
    _var0 = this.getDataBytes();
    return _var0 !== null && typeof _var0 !== 'undefined';
  };

  /*<span id='method-fm.websync.serviceArgs-getOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke after <see cref="fm.websync.serviceArgs.onSuccess">fm.websync.serviceArgs.onSuccess</see> or <see cref="fm.websync.serviceArgs.onFailure">fm.websync.serviceArgs.onFailure</see>.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
  */


  serviceArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };

  /*<span id='method-fm.websync.serviceArgs-getOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the request fails.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
  */


  serviceArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };

  /*<span id='method-fm.websync.serviceArgs-getOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
  */


  serviceArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };

  /*<span id='method-fm.websync.serviceArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  serviceArgs.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };

  /*<span id='method-fm.websync.serviceArgs-setChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the channel to which the data should be sent.
  	 Must start with a forward slash (/).
  	 </div>
  
  	@function setChannel
  	@param {String} value
  	@return {void}
  */


  serviceArgs.prototype.setChannel = function() {
    var error, value, _var0, _var1;
    value = arguments[0];
    error = null;
    _var0 = new fm.holder(error);
    _var1 = fm.websync.extensible.validateChannel(value, _var0);
    error = _var0.getValue();
    if (!_var1) {
      throw new Error(fm.stringExtensions.format("Invalid channel. {0}", error));
    }
    return this.__channel = value;
  };

  /*<span id='method-fm.websync.serviceArgs-setDataBytes'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the data to send in binary format.
  	 (Overrides <see cref="fm.websync.serviceArgs.dataJson">fm.websync.serviceArgs.dataJson</see>.)
  	 </div>
  
  	@function setDataBytes
  	@param {fm.array} value
  	@return {void}
  */


  serviceArgs.prototype.setDataBytes = function() {
    var value;
    value = arguments[0];
    this.__dataJson = null;
    return this.__dataBytes = value;
  };

  /*<span id='method-fm.websync.serviceArgs-setDataJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the data to send in JSON format.
  	 (Overrides <see cref="fm.websync.serviceArgs.dataBytes">fm.websync.serviceArgs.dataBytes</see>.)
  	 </div>
  
  	@function setDataJson
  	@param {String} value
  	@return {void}
  */


  serviceArgs.prototype.setDataJson = function() {
    var value, _var0;
    value = arguments[0];
    _var0 = value;
    if (!((_var0 === null || typeof _var0 === 'undefined') || fm.serializer.isValidJson(value))) {
      throw new Error("The value is not valid JSON.");
    }
    this.__dataJson = value;
    return this.__dataBytes = null;
  };

  /*<span id='method-fm.websync.serviceArgs-setOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke after <see cref="fm.websync.serviceArgs.onSuccess">fm.websync.serviceArgs.onSuccess</see> or <see cref="fm.websync.serviceArgs.onFailure">fm.websync.serviceArgs.onFailure</see>.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  serviceArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };

  /*<span id='method-fm.websync.serviceArgs-setOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the request fails.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  serviceArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };

  /*<span id='method-fm.websync.serviceArgs-setOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  serviceArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };

  /*<span id='method-fm.websync.serviceArgs-setTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function setTag
  	@param {String} value
  	@return {void}
  */


  serviceArgs.prototype.setTag = function() {
    var value;
    value = arguments[0];
    return this.setExtensionValueJson("fm.tag", fm.serializer.serializeString(value), false);
  };

  serviceArgs.prototype.getData = function() {
    return fm.json.deserialize(this.getDataJson.apply(this, arguments));
  };

  serviceArgs.prototype.setData = function() {
    var data;
    data = arguments[0];
    arguments[arguments.length - 1] = fm.json.serialize(arguments[arguments.length - 1]);
    return this.setDataJson.apply(this, arguments);
  };

  return serviceArgs;

})(fm.websync.baseInputArgs);


/*<span id='cls-fm.websync.unbindArgs'>&nbsp;</span>
*/

/**
@class fm.websync.unbindArgs
 <div>
 Arguments for client unbind requests.
 </div>

@extends fm.websync.baseInputArgs
*/


fm.websync.unbindArgs = (function(_super) {

  __extends(unbindArgs, _super);

  unbindArgs.prototype.__records = null;

  unbindArgs.prototype._onComplete = null;

  unbindArgs.prototype._onFailure = null;

  unbindArgs.prototype._onSuccess = null;

  /*<span id='method-fm.websync.unbindArgs-fm.websync.unbindArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.unbindArgs">fm.websync.unbindArgs</see> class.
  	 </div>
  	@function fm.websync.unbindArgs
  	@param {fm.array} records The records to unbind.
  	@return {}
  */


  function unbindArgs() {
    this.setRecords = __bind(this.setRecords, this);

    this.setRecord = __bind(this.setRecord, this);

    this.setOnSuccess = __bind(this.setOnSuccess, this);

    this.setOnFailure = __bind(this.setOnFailure, this);

    this.setOnComplete = __bind(this.setOnComplete, this);

    this.setKeys = __bind(this.setKeys, this);

    this.setKey = __bind(this.setKey, this);

    this.getRecords = __bind(this.getRecords, this);

    this.getRecord = __bind(this.getRecord, this);

    this.getOnSuccess = __bind(this.getOnSuccess, this);

    this.getOnFailure = __bind(this.getOnFailure, this);

    this.getOnComplete = __bind(this.getOnComplete, this);

    this.getKeys = __bind(this.getKeys, this);

    this.getKey = __bind(this.getKey, this);

    var records;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      unbindArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    records = arguments[0];
    unbindArgs.__super__.constructor.call(this);
    this.setRecords(records);
  }

  /*<span id='method-fm.websync.unbindArgs-getKey'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record key to unbind.
  	 Overrides <see cref="fm.websync.unbindArgs.keys">fm.websync.unbindArgs.keys</see>, <see cref="fm.websync.unbindArgs.record">fm.websync.unbindArgs.record</see>, and <see cref="fm.websync.unbindArgs.records">fm.websync.unbindArgs.records</see>.
  	 </div>
  
  	@function getKey
  	@return {String}
  */


  unbindArgs.prototype.getKey = function() {
    return fm.websync.extensible.sharedGetKey(this.__records);
  };

  /*<span id='method-fm.websync.unbindArgs-getKeys'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record keys to unbind.
  	 Overrides <see cref="fm.websync.unbindArgs.key">fm.websync.unbindArgs.key</see>, <see cref="fm.websync.unbindArgs.record">fm.websync.unbindArgs.record</see>, and <see cref="fm.websync.unbindArgs.records">fm.websync.unbindArgs.records</see>.
  	 </div>
  
  	@function getKeys
  	@return {fm.array}
  */


  unbindArgs.prototype.getKeys = function() {
    return fm.websync.extensible.sharedGetKeys(this.__records);
  };

  /*<span id='method-fm.websync.unbindArgs-getOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke after <see cref="fm.websync.unbindArgs.onSuccess">fm.websync.unbindArgs.onSuccess</see> or <see cref="fm.websync.unbindArgs.onFailure">fm.websync.unbindArgs.onFailure</see>.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
  */


  unbindArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };

  /*<span id='method-fm.websync.unbindArgs-getOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the request fails.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
  */


  unbindArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };

  /*<span id='method-fm.websync.unbindArgs-getOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
  */


  unbindArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };

  /*<span id='method-fm.websync.unbindArgs-getRecord'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record to unbind.
  	 Overrides <see cref="fm.websync.unbindArgs.records">fm.websync.unbindArgs.records</see>, <see cref="fm.websync.unbindArgs.key">fm.websync.unbindArgs.key</see>, and <see cref="fm.websync.unbindArgs.keys">fm.websync.unbindArgs.keys</see>.
  	 </div>
  
  	@function getRecord
  	@return {fm.websync.record}
  */


  unbindArgs.prototype.getRecord = function() {
    return fm.websync.extensible.sharedGetRecord(this.__records);
  };

  /*<span id='method-fm.websync.unbindArgs-getRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the records to unbind.
  	 Overrides <see cref="fm.websync.unbindArgs.record">fm.websync.unbindArgs.record</see>, <see cref="fm.websync.unbindArgs.key">fm.websync.unbindArgs.key</see>, and <see cref="fm.websync.unbindArgs.keys">fm.websync.unbindArgs.keys</see>.
  	 </div>
  
  	@function getRecords
  	@return {fm.array}
  */


  unbindArgs.prototype.getRecords = function() {
    return fm.websync.extensible.sharedGetRecords(this.__records);
  };

  /*<span id='method-fm.websync.unbindArgs-setKey'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the record key to unbind.
  	 Overrides <see cref="fm.websync.unbindArgs.keys">fm.websync.unbindArgs.keys</see>, <see cref="fm.websync.unbindArgs.record">fm.websync.unbindArgs.record</see>, and <see cref="fm.websync.unbindArgs.records">fm.websync.unbindArgs.records</see>.
  	 </div>
  
  	@function setKey
  	@param {String} value
  	@return {void}
  */


  unbindArgs.prototype.setKey = function() {
    var value;
    value = arguments[0];
    return this.__records = fm.websync.extensible.sharedSetKey(value);
  };

  /*<span id='method-fm.websync.unbindArgs-setKeys'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the record keys to unbind.
  	 Overrides <see cref="fm.websync.unbindArgs.key">fm.websync.unbindArgs.key</see>, <see cref="fm.websync.unbindArgs.record">fm.websync.unbindArgs.record</see>, and <see cref="fm.websync.unbindArgs.records">fm.websync.unbindArgs.records</see>.
  	 </div>
  
  	@function setKeys
  	@param {fm.array} value
  	@return {void}
  */


  unbindArgs.prototype.setKeys = function() {
    var value;
    value = arguments[0];
    return this.__records = fm.websync.extensible.sharedSetKeys(value);
  };

  /*<span id='method-fm.websync.unbindArgs-setOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke after <see cref="fm.websync.unbindArgs.onSuccess">fm.websync.unbindArgs.onSuccess</see> or <see cref="fm.websync.unbindArgs.onFailure">fm.websync.unbindArgs.onFailure</see>.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  unbindArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };

  /*<span id='method-fm.websync.unbindArgs-setOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the request fails.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  unbindArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };

  /*<span id='method-fm.websync.unbindArgs-setOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  unbindArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };

  /*<span id='method-fm.websync.unbindArgs-setRecord'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the record to unbind.
  	 Overrides <see cref="fm.websync.unbindArgs.records">fm.websync.unbindArgs.records</see>, <see cref="fm.websync.unbindArgs.key">fm.websync.unbindArgs.key</see>, and <see cref="fm.websync.unbindArgs.keys">fm.websync.unbindArgs.keys</see>.
  	 </div>
  
  	@function setRecord
  	@param {fm.websync.record} value
  	@return {void}
  */


  unbindArgs.prototype.setRecord = function() {
    var value;
    value = arguments[0];
    return this.__records = fm.websync.extensible.sharedSetRecord(value);
  };

  /*<span id='method-fm.websync.unbindArgs-setRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the records to unbind.
  	 Overrides <see cref="fm.websync.unbindArgs.record">fm.websync.unbindArgs.record</see>, <see cref="fm.websync.unbindArgs.key">fm.websync.unbindArgs.key</see>, and <see cref="fm.websync.unbindArgs.keys">fm.websync.unbindArgs.keys</see>.
  	 </div>
  
  	@function setRecords
  	@param {fm.array} value
  	@return {void}
  */


  unbindArgs.prototype.setRecords = function() {
    var value;
    value = arguments[0];
    return this.__records = fm.websync.extensible.sharedSetRecords(value);
  };

  return unbindArgs;

})(fm.websync.baseInputArgs);


/*<span id='cls-fm.websync.disconnectArgs'>&nbsp;</span>
*/

/**
@class fm.websync.disconnectArgs
 <div>
 Arguments for client disconnect requests.
 </div>

@extends fm.websync.baseInputArgs
*/


fm.websync.disconnectArgs = (function(_super) {

  __extends(disconnectArgs, _super);

  disconnectArgs.prototype._onComplete = null;

  function disconnectArgs() {
    this.setOnComplete = __bind(this.setOnComplete, this);

    this.getOnComplete = __bind(this.getOnComplete, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      disconnectArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    disconnectArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.disconnectArgs-getOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke after the disconnection is complete.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
  */


  disconnectArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };

  /*<span id='method-fm.websync.disconnectArgs-setOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke after the disconnection is complete.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  disconnectArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };

  return disconnectArgs;

})(fm.websync.baseInputArgs);


/*<span id='cls-fm.websync.publishArgs'>&nbsp;</span>
*/

/**
@class fm.websync.publishArgs
 <div>
 Arguments for client publish requests.
 </div>

@extends fm.websync.baseInputArgs
*/


fm.websync.publishArgs = (function(_super) {

  __extends(publishArgs, _super);

  publishArgs.prototype.__channel = null;

  publishArgs.prototype.__dataBytes = null;

  publishArgs.prototype.__dataJson = null;

  publishArgs.prototype._onComplete = null;

  publishArgs.prototype._onFailure = null;

  publishArgs.prototype._onSuccess = null;

  /*<span id='method-fm.websync.publishArgs-fm.websync.publishArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.publishArgs">fm.websync.publishArgs</see> class.
  	 </div>
  	@function fm.websync.publishArgs
  	@param {String} channel The channel to which the data should be sent.
  	@param {String} dataJson The data to send in JSON format.
  	@param {String} tag The tag that identifies the contents of the payload.
  	@return {}
  */


  function publishArgs() {
    this.setData = __bind(this.setData, this);

    this.getData = __bind(this.getData, this);

    this.setTag = __bind(this.setTag, this);

    this.setOnSuccess = __bind(this.setOnSuccess, this);

    this.setOnFailure = __bind(this.setOnFailure, this);

    this.setOnComplete = __bind(this.setOnComplete, this);

    this.setDataJson = __bind(this.setDataJson, this);

    this.setDataBytes = __bind(this.setDataBytes, this);

    this.setChannel = __bind(this.setChannel, this);

    this.getTag = __bind(this.getTag, this);

    this.getOnSuccess = __bind(this.getOnSuccess, this);

    this.getOnFailure = __bind(this.getOnFailure, this);

    this.getOnComplete = __bind(this.getOnComplete, this);

    this.getIsBinary = __bind(this.getIsBinary, this);

    this.getDataJson = __bind(this.getDataJson, this);

    this.getDataBytes = __bind(this.getDataBytes, this);

    this.getChannel = __bind(this.getChannel, this);

    var channel, dataJson, tag;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      publishArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 3) {
      channel = arguments[0];
      dataJson = arguments[1];
      tag = arguments[2];
      publishArgs.__super__.constructor.call(this);
      this.setChannel(channel);
      this.setDataJson(dataJson);
      this.setTag(tag);
      return;
    }
    if (arguments.length === 2) {
      channel = arguments[0];
      dataJson = arguments[1];
      publishArgs.call(this, channel, dataJson, null);
      return;
    }
  }

  /*<span id='method-fm.websync.publishArgs-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel to which the data should be sent.
  	 Must start with a forward slash (/).
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  publishArgs.prototype.getChannel = function() {
    return this.__channel;
  };

  /*<span id='method-fm.websync.publishArgs-getDataBytes'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data to send in binary format.
  	 (Overrides <see cref="fm.websync.publishArgs.dataJson">fm.websync.publishArgs.dataJson</see>.)
  	 </div>
  
  	@function getDataBytes
  	@return {fm.array}
  */


  publishArgs.prototype.getDataBytes = function() {
    var decoded, valueJson, _var0, _var1, _var2, _var3;
    decoded = this.__dataBytes;
    valueJson = this.__dataJson;
    _var0 = decoded;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return decoded;
    }
    _var1 = valueJson;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      _var2 = new fm.holder(decoded);
      _var3 = fm.websync.crypto.tryBase64Decode(fm.serializer.deserializeString(valueJson), _var2);
      decoded = _var2.getValue();
      _var3;

      this.__dataBytes = decoded;
      return decoded;
    }
    return null;
  };

  /*<span id='method-fm.websync.publishArgs-getDataJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data to send in JSON format.
  	 (Overrides <see cref="fm.websync.publishArgs.dataBytes">fm.websync.publishArgs.dataBytes</see>.)
  	 </div>
  
  	@function getDataJson
  	@return {String}
  */


  publishArgs.prototype.getDataJson = function() {
    var b, str, _var0, _var1;
    str = this.__dataJson;
    b = this.__dataBytes;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return str;
    }
    _var1 = b;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      str = fm.serializer.serializeString(fm.websync.crypto.base64Encode(b));
      this.__dataJson = str;
      return str;
    }
    return null;
  };

  /*<span id='method-fm.websync.publishArgs-getIsBinary'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether or not the data is binary.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
  */


  publishArgs.prototype.getIsBinary = function() {
    var _var0;
    _var0 = this.getDataBytes();
    return _var0 !== null && typeof _var0 !== 'undefined';
  };

  /*<span id='method-fm.websync.publishArgs-getOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke after <see cref="fm.websync.publishArgs.onSuccess">fm.websync.publishArgs.onSuccess</see> or <see cref="fm.websync.publishArgs.onFailure">fm.websync.publishArgs.onFailure</see>.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
  */


  publishArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };

  /*<span id='method-fm.websync.publishArgs-getOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the request fails.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
  */


  publishArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };

  /*<span id='method-fm.websync.publishArgs-getOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
  */


  publishArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };

  /*<span id='method-fm.websync.publishArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  publishArgs.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };

  /*<span id='method-fm.websync.publishArgs-setChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the channel to which the data should be sent.
  	 Must start with a forward slash (/).
  	 </div>
  
  	@function setChannel
  	@param {String} value
  	@return {void}
  */


  publishArgs.prototype.setChannel = function() {
    var error, value, _var0, _var1;
    value = arguments[0];
    error = null;
    _var0 = new fm.holder(error);
    _var1 = fm.websync.extensible.validateChannel(value, _var0);
    error = _var0.getValue();
    if (!_var1) {
      throw new Error(fm.stringExtensions.format("Invalid channel. {0}", error));
    }
    return this.__channel = value;
  };

  /*<span id='method-fm.websync.publishArgs-setDataBytes'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the data to send in binary format.
  	 (Overrides <see cref="fm.websync.publishArgs.dataJson">fm.websync.publishArgs.dataJson</see>.)
  	 </div>
  
  	@function setDataBytes
  	@param {fm.array} value
  	@return {void}
  */


  publishArgs.prototype.setDataBytes = function() {
    var value;
    value = arguments[0];
    this.__dataJson = null;
    return this.__dataBytes = value;
  };

  /*<span id='method-fm.websync.publishArgs-setDataJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the data to send in JSON format.
  	 (Overrides <see cref="fm.websync.publishArgs.dataBytes">fm.websync.publishArgs.dataBytes</see>.)
  	 </div>
  
  	@function setDataJson
  	@param {String} value
  	@return {void}
  */


  publishArgs.prototype.setDataJson = function() {
    var value, _var0;
    value = arguments[0];
    _var0 = value;
    if (!((_var0 === null || typeof _var0 === 'undefined') || fm.serializer.isValidJson(value))) {
      throw new Error("The value is not valid JSON.");
    }
    this.__dataJson = value;
    return this.__dataBytes = null;
  };

  /*<span id='method-fm.websync.publishArgs-setOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke after <see cref="fm.websync.publishArgs.onSuccess">fm.websync.publishArgs.onSuccess</see> or <see cref="fm.websync.publishArgs.onFailure">fm.websync.publishArgs.onFailure</see>.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  publishArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };

  /*<span id='method-fm.websync.publishArgs-setOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the request fails.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  publishArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };

  /*<span id='method-fm.websync.publishArgs-setOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  publishArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };

  /*<span id='method-fm.websync.publishArgs-setTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function setTag
  	@param {String} value
  	@return {void}
  */


  publishArgs.prototype.setTag = function() {
    var value;
    value = arguments[0];
    return this.setExtensionValueJson("fm.tag", fm.serializer.serializeString(value), false);
  };

  publishArgs.prototype.getData = function() {
    return fm.json.deserialize(this.getDataJson.apply(this, arguments));
  };

  publishArgs.prototype.setData = function() {
    var data;
    data = arguments[0];
    arguments[arguments.length - 1] = fm.json.serialize(arguments[arguments.length - 1]);
    return this.setDataJson.apply(this, arguments);
  };

  return publishArgs;

})(fm.websync.baseInputArgs);


/*<span id='cls-fm.websync.subscribeArgs'>&nbsp;</span>
*/

/**
@class fm.websync.subscribeArgs
 <div>
 Arguments for client subscribe requests.
 </div>

@extends fm.websync.baseInputArgs
*/


fm.websync.subscribeArgs = (function(_super) {

  __extends(subscribeArgs, _super);

  subscribeArgs.prototype.__channels = null;

  subscribeArgs.prototype._autoResubscribe = null;

  subscribeArgs.prototype._isResubscribe = false;

  subscribeArgs.prototype._onComplete = null;

  subscribeArgs.prototype._onFailure = null;

  subscribeArgs.prototype._onReceive = null;

  subscribeArgs.prototype._onSuccess = null;

  /*<span id='method-fm.websync.subscribeArgs-fm.websync.subscribeArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.subscribeArgs">fm.websync.subscribeArgs</see> class.
  	 </div>
  	@function fm.websync.subscribeArgs
  	@param {fm.array} channels The channels to subscribe.
  	@param {String} tag The tag identifying the subscription.
  	@return {}
  */


  function subscribeArgs() {
    this.setTag = __bind(this.setTag, this);

    this.setOnSuccess = __bind(this.setOnSuccess, this);

    this.setOnReceive = __bind(this.setOnReceive, this);

    this.setOnFailure = __bind(this.setOnFailure, this);

    this.setOnComplete = __bind(this.setOnComplete, this);

    this.setIsResubscribe = __bind(this.setIsResubscribe, this);

    this.setChannels = __bind(this.setChannels, this);

    this.setChannel = __bind(this.setChannel, this);

    this.setAutoResubscribe = __bind(this.setAutoResubscribe, this);

    this.getTag = __bind(this.getTag, this);

    this.getOnSuccess = __bind(this.getOnSuccess, this);

    this.getOnReceive = __bind(this.getOnReceive, this);

    this.getOnFailure = __bind(this.getOnFailure, this);

    this.getOnComplete = __bind(this.getOnComplete, this);

    this.getIsResubscribe = __bind(this.getIsResubscribe, this);

    this.getChannels = __bind(this.getChannels, this);

    this.getChannel = __bind(this.getChannel, this);

    this.getAutoResubscribe = __bind(this.getAutoResubscribe, this);

    var channels, tag;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      subscribeArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 2) {
      channels = arguments[0];
      tag = arguments[1];
      subscribeArgs.__super__.constructor.call(this);
      this.setChannels(channels);
      this.setTag(tag);
      return;
    }
    if (arguments.length === 1) {
      channels = arguments[0];
      subscribeArgs.__super__.constructor.call(this);
      this.setChannels(channels);
      return;
    }
  }

  /*<span id='method-fm.websync.subscribeArgs-getAutoResubscribe'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether to call Subscribe with these args
  	 immediately after a reconnect following a stream failure.
  	 Generally, this should be <c>null</c>. The client will
  	 analyze the current context and set this flag as needed.
  	 However, it can be overridden for special cases. If set
  	 explicitly to <c>false</c>, then the client will assume
  	 that this call to Subscribe is being invoked from the
  	 OnSuccess callback of another WebSync method call, and
  	 therefore will be called again implicitly after a
  	 network reconnection. If set to
  	 <c>true</c>, then the client will assume this call to
  	 Subscribe is being invoked as a part of some external
  	 action and will force a Subscribe call using these arguments
  	 after a network reconnection. Defaults to <c>null</c>.
  	 </div>
  
  	@function getAutoResubscribe
  	@return {fm.nullable}
  */


  subscribeArgs.prototype.getAutoResubscribe = function() {
    return this._autoResubscribe;
  };

  /*<span id='method-fm.websync.subscribeArgs-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel to which the client should be subscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.subscribeArgs.channels">fm.websync.subscribeArgs.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  subscribeArgs.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };

  /*<span id='method-fm.websync.subscribeArgs-getChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channels to which the client should be subscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.subscribeArgs.channel">fm.websync.subscribeArgs.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
  */


  subscribeArgs.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };

  subscribeArgs.prototype.getIsResubscribe = function() {
    return this._isResubscribe;
  };

  /*<span id='method-fm.websync.subscribeArgs-getOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke after <see cref="fm.websync.subscribeArgs.onSuccess">fm.websync.subscribeArgs.onSuccess</see> or <see cref="fm.websync.subscribeArgs.onFailure">fm.websync.subscribeArgs.onFailure</see>.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
  */


  subscribeArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };

  /*<span id='method-fm.websync.subscribeArgs-getOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the request fails.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
  */


  subscribeArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };

  /*<span id='method-fm.websync.subscribeArgs-getOnReceive'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke when data is received on the channel(s).
  	 See <see cref="fm.websync.subscribeReceiveArgs">fm.websync.subscribeReceiveArgs</see> for callback argument details.
  	 </div>
  
  	@function getOnReceive
  	@return {fm.singleAction}
  */


  subscribeArgs.prototype.getOnReceive = function() {
    return this._onReceive;
  };

  /*<span id='method-fm.websync.subscribeArgs-getOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
  */


  subscribeArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };

  /*<span id='method-fm.websync.subscribeArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a tag that will uniquely identify this subscription so it
  	 can be unsubscribed later without affecting other subscriptions with the same channel.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  subscribeArgs.prototype.getTag = function() {
    var _ref;
    return (_ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? _ref : fm.stringExtensions.empty;
  };

  /*<span id='method-fm.websync.subscribeArgs-setAutoResubscribe'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets whether to call Subscribe with these args
  	 immediately after a reconnect following a stream failure.
  	 Generally, this should be <c>null</c>. The client will
  	 analyze the current context and set this flag as needed.
  	 However, it can be overridden for special cases. If set
  	 explicitly to <c>false</c>, then the client will assume
  	 that this call to Subscribe is being invoked from the
  	 OnSuccess callback of another WebSync method call, and
  	 therefore will be called again implicitly after a
  	 network reconnection. If set to
  	 <c>true</c>, then the client will assume this call to
  	 Subscribe is being invoked as a part of some external
  	 action and will force a Subscribe call using these arguments
  	 after a network reconnection. Defaults to <c>null</c>.
  	 </div>
  
  	@function setAutoResubscribe
  	@param {fm.nullable} value
  	@return {void}
  */


  subscribeArgs.prototype.setAutoResubscribe = function() {
    var value;
    value = arguments[0];
    return this._autoResubscribe = value;
  };

  /*<span id='method-fm.websync.subscribeArgs-setChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the channel to which the client should be subscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.subscribeArgs.channels">fm.websync.subscribeArgs.channels</see>.
  	 </div>
  
  	@function setChannel
  	@param {String} value
  	@return {void}
  */


  subscribeArgs.prototype.setChannel = function() {
    var value;
    value = arguments[0];
    return this.__channels = fm.websync.extensible.sharedSetChannel(value);
  };

  /*<span id='method-fm.websync.subscribeArgs-setChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the channels to which the client should be subscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.subscribeArgs.channel">fm.websync.subscribeArgs.channel</see>.
  	 </div>
  
  	@function setChannels
  	@param {fm.array} value
  	@return {void}
  */


  subscribeArgs.prototype.setChannels = function() {
    var value;
    value = arguments[0];
    return this.__channels = fm.websync.extensible.sharedSetChannels(value);
  };

  subscribeArgs.prototype.setIsResubscribe = function() {
    var value;
    value = arguments[0];
    return this._isResubscribe = value;
  };

  /*<span id='method-fm.websync.subscribeArgs-setOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke after <see cref="fm.websync.subscribeArgs.onSuccess">fm.websync.subscribeArgs.onSuccess</see> or <see cref="fm.websync.subscribeArgs.onFailure">fm.websync.subscribeArgs.onFailure</see>.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  subscribeArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };

  /*<span id='method-fm.websync.subscribeArgs-setOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the request fails.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  subscribeArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };

  /*<span id='method-fm.websync.subscribeArgs-setOnReceive'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke when data is received on the channel(s).
  	 See <see cref="fm.websync.subscribeReceiveArgs">fm.websync.subscribeReceiveArgs</see> for callback argument details.
  	 </div>
  
  	@function setOnReceive
  	@param {fm.singleAction} value
  	@return {void}
  */


  subscribeArgs.prototype.setOnReceive = function() {
    var value;
    value = arguments[0];
    return this._onReceive = value;
  };

  /*<span id='method-fm.websync.subscribeArgs-setOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  subscribeArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };

  /*<span id='method-fm.websync.subscribeArgs-setTag'>&nbsp;</span>
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


  subscribeArgs.prototype.setTag = function() {
    var value;
    value = arguments[0];
    return this.setExtensionValueJson("fm.tag", fm.serializer.serializeString(value != null ? value : fm.stringExtensions.empty), false);
  };

  return subscribeArgs;

})(fm.websync.baseInputArgs);


/*<span id='cls-fm.websync.unsubscribeArgs'>&nbsp;</span>
*/

/**
@class fm.websync.unsubscribeArgs
 <div>
 Arguments for client unsubscribe requests.
 </div>

@extends fm.websync.baseInputArgs
*/


fm.websync.unsubscribeArgs = (function(_super) {

  __extends(unsubscribeArgs, _super);

  unsubscribeArgs.prototype.__channels = null;

  unsubscribeArgs.prototype._onComplete = null;

  unsubscribeArgs.prototype._onFailure = null;

  unsubscribeArgs.prototype._onSuccess = null;

  /*<span id='method-fm.websync.unsubscribeArgs-fm.websync.unsubscribeArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.unsubscribeArgs">fm.websync.unsubscribeArgs</see> class.
  	 </div>
  	@function fm.websync.unsubscribeArgs
  	@param {fm.array} channels The channels to unsubscribe.
  	@param {String} tag The tag identifying the subscription.
  	@return {}
  */


  function unsubscribeArgs() {
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
      unsubscribeArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 2) {
      channels = arguments[0];
      tag = arguments[1];
      unsubscribeArgs.__super__.constructor.call(this);
      this.setChannels(channels);
      this.setTag(tag);
      return;
    }
    if (arguments.length === 1) {
      channels = arguments[0];
      unsubscribeArgs.__super__.constructor.call(this);
      this.setChannels(channels);
      return;
    }
  }

  /*<span id='method-fm.websync.unsubscribeArgs-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel from which the client should be unsubscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.unsubscribeArgs.channels">fm.websync.unsubscribeArgs.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  unsubscribeArgs.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };

  /*<span id='method-fm.websync.unsubscribeArgs-getChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channels from which the client should be unsubscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.unsubscribeArgs.channel">fm.websync.unsubscribeArgs.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
  */


  unsubscribeArgs.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };

  /*<span id='method-fm.websync.unsubscribeArgs-getOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke after <see cref="fm.websync.unsubscribeArgs.onSuccess">fm.websync.unsubscribeArgs.onSuccess</see> or <see cref="fm.websync.unsubscribeArgs.onFailure">fm.websync.unsubscribeArgs.onFailure</see>.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
  */


  unsubscribeArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };

  /*<span id='method-fm.websync.unsubscribeArgs-getOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the request fails.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
  */


  unsubscribeArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };

  /*<span id='method-fm.websync.unsubscribeArgs-getOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
  */


  unsubscribeArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };

  /*<span id='method-fm.websync.unsubscribeArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a tag that uniquely identifies a subscription so
  	 other subscriptions with the same channel are not affected.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  unsubscribeArgs.prototype.getTag = function() {
    var _ref;
    return (_ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? _ref : fm.stringExtensions.empty;
  };

  /*<span id='method-fm.websync.unsubscribeArgs-setChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the channel from which the client should be unsubscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.unsubscribeArgs.channels">fm.websync.unsubscribeArgs.channels</see>.
  	 </div>
  
  	@function setChannel
  	@param {String} value
  	@return {void}
  */


  unsubscribeArgs.prototype.setChannel = function() {
    var value;
    value = arguments[0];
    return this.__channels = fm.websync.extensible.sharedSetChannel(value);
  };

  /*<span id='method-fm.websync.unsubscribeArgs-setChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the channels from which the client should be unsubscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.unsubscribeArgs.channel">fm.websync.unsubscribeArgs.channel</see>.
  	 </div>
  
  	@function setChannels
  	@param {fm.array} value
  	@return {void}
  */


  unsubscribeArgs.prototype.setChannels = function() {
    var value;
    value = arguments[0];
    return this.__channels = fm.websync.extensible.sharedSetChannels(value);
  };

  /*<span id='method-fm.websync.unsubscribeArgs-setOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke after <see cref="fm.websync.unsubscribeArgs.onSuccess">fm.websync.unsubscribeArgs.onSuccess</see> or <see cref="fm.websync.unsubscribeArgs.onFailure">fm.websync.unsubscribeArgs.onFailure</see>.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  unsubscribeArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };

  /*<span id='method-fm.websync.unsubscribeArgs-setOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the request fails.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  unsubscribeArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };

  /*<span id='method-fm.websync.unsubscribeArgs-setOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  unsubscribeArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };

  /*<span id='method-fm.websync.unsubscribeArgs-setTag'>&nbsp;</span>
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


  unsubscribeArgs.prototype.setTag = function() {
    var value;
    value = arguments[0];
    return this.setExtensionValueJson("fm.tag", fm.serializer.serializeString(value != null ? value : fm.stringExtensions.empty), false);
  };

  return unsubscribeArgs;

})(fm.websync.baseInputArgs);


/*<span id='cls-fm.websync.connectCompleteArgs'>&nbsp;</span>
*/

/**
@class fm.websync.connectCompleteArgs
 <div>
 Arguments for connect complete callbacks.
 </div>

@extends fm.websync.baseCompleteArgs
*/


fm.websync.connectCompleteArgs = (function(_super) {

  __extends(connectCompleteArgs, _super);

  connectCompleteArgs.prototype._isReconnect = false;

  function connectCompleteArgs() {
    this.setIsReconnect = __bind(this.setIsReconnect, this);

    this.getIsReconnect = __bind(this.getIsReconnect, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      connectCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    connectCompleteArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.connectCompleteArgs-getIsReconnect'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the connect call was automatically
  	 invoked following a stream failure.
  	 </div>
  
  	@function getIsReconnect
  	@return {Boolean}
  */


  connectCompleteArgs.prototype.getIsReconnect = function() {
    return this._isReconnect;
  };

  connectCompleteArgs.prototype.setIsReconnect = function() {
    var value;
    value = arguments[0];
    return this._isReconnect = value;
  };

  return connectCompleteArgs;

})(fm.websync.baseCompleteArgs);


/*<span id='cls-fm.websync.bindCompleteArgs'>&nbsp;</span>
*/

/**
@class fm.websync.bindCompleteArgs
 <div>
 Arguments for bind complete callbacks.
 </div>

@extends fm.websync.baseCompleteArgs
*/


fm.websync.bindCompleteArgs = (function(_super) {

  __extends(bindCompleteArgs, _super);

  bindCompleteArgs.prototype._isRebind = false;

  function bindCompleteArgs() {
    this.setIsRebind = __bind(this.setIsRebind, this);

    this.getIsRebind = __bind(this.getIsRebind, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      bindCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    bindCompleteArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.bindCompleteArgs-getIsRebind'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the bind call was automatically
  	 invoked following a stream failure.
  	 </div>
  
  	@function getIsRebind
  	@return {Boolean}
  */


  bindCompleteArgs.prototype.getIsRebind = function() {
    return this._isRebind;
  };

  bindCompleteArgs.prototype.setIsRebind = function() {
    var value;
    value = arguments[0];
    return this._isRebind = value;
  };

  return bindCompleteArgs;

})(fm.websync.baseCompleteArgs);


/*<span id='cls-fm.websync.serviceCompleteArgs'>&nbsp;</span>
*/

/**
@class fm.websync.serviceCompleteArgs
 <div>
 Arguments for service complete callbacks.
 </div>

@extends fm.websync.baseCompleteArgs
*/


fm.websync.serviceCompleteArgs = (function(_super) {

  __extends(serviceCompleteArgs, _super);

  function serviceCompleteArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      serviceCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    serviceCompleteArgs.__super__.constructor.call(this);
  }

  return serviceCompleteArgs;

})(fm.websync.baseCompleteArgs);


/*<span id='cls-fm.websync.unbindCompleteArgs'>&nbsp;</span>
*/

/**
@class fm.websync.unbindCompleteArgs
 <div>
 Arguments for unbind complete callbacks.
 </div>

@extends fm.websync.baseCompleteArgs
*/


fm.websync.unbindCompleteArgs = (function(_super) {

  __extends(unbindCompleteArgs, _super);

  unbindCompleteArgs.prototype.__forced = false;

  function unbindCompleteArgs() {
    this.getForced = __bind(this.getForced, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      unbindCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    unbindCompleteArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.unbindCompleteArgs-getForced'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether this unbind was forced due to a disconnect.
  	 </div>
  
  	@function getForced
  	@return {Boolean}
  */


  unbindCompleteArgs.prototype.getForced = function() {
    return this.__forced;
  };

  return unbindCompleteArgs;

})(fm.websync.baseCompleteArgs);


/*<span id='cls-fm.websync.disconnectCompleteArgs'>&nbsp;</span>
*/

/**
@class fm.websync.disconnectCompleteArgs
 <div>
 Arguments for disconnect complete callbacks.
 </div>

@extends fm.websync.baseCompleteArgs
*/


fm.websync.disconnectCompleteArgs = (function(_super) {

  __extends(disconnectCompleteArgs, _super);

  disconnectCompleteArgs.prototype._exception = null;

  function disconnectCompleteArgs() {
    this.setException = __bind(this.setException, this);

    this.getException = __bind(this.getException, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      disconnectCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    disconnectCompleteArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.disconnectCompleteArgs-getException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the exception that was thrown while disconnecting.
  	 Will be <c>null</c> if the disconnect was performed gracefully.
  	 </div>
  
  	@function getException
  	@return {Error}
  */


  disconnectCompleteArgs.prototype.getException = function() {
    return this._exception;
  };

  disconnectCompleteArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  return disconnectCompleteArgs;

})(fm.websync.baseCompleteArgs);


/*<span id='cls-fm.websync.publishCompleteArgs'>&nbsp;</span>
*/

/**
@class fm.websync.publishCompleteArgs
 <div>
 Arguments for publish complete callbacks.
 </div>

@extends fm.websync.baseCompleteArgs
*/


fm.websync.publishCompleteArgs = (function(_super) {

  __extends(publishCompleteArgs, _super);

  function publishCompleteArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      publishCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    publishCompleteArgs.__super__.constructor.call(this);
  }

  return publishCompleteArgs;

})(fm.websync.baseCompleteArgs);


/*<span id='cls-fm.websync.subscribeCompleteArgs'>&nbsp;</span>
*/

/**
@class fm.websync.subscribeCompleteArgs
 <div>
 Arguments for subscribe complete callbacks.
 </div>

@extends fm.websync.baseCompleteArgs
*/


fm.websync.subscribeCompleteArgs = (function(_super) {

  __extends(subscribeCompleteArgs, _super);

  subscribeCompleteArgs.prototype._isResubscribe = false;

  function subscribeCompleteArgs() {
    this.setIsResubscribe = __bind(this.setIsResubscribe, this);

    this.getIsResubscribe = __bind(this.getIsResubscribe, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      subscribeCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    subscribeCompleteArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.subscribeCompleteArgs-getIsResubscribe'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the subscribe call was automatically
  	 invoked following a stream failure.
  	 </div>
  
  	@function getIsResubscribe
  	@return {Boolean}
  */


  subscribeCompleteArgs.prototype.getIsResubscribe = function() {
    return this._isResubscribe;
  };

  subscribeCompleteArgs.prototype.setIsResubscribe = function() {
    var value;
    value = arguments[0];
    return this._isResubscribe = value;
  };

  return subscribeCompleteArgs;

})(fm.websync.baseCompleteArgs);


/*<span id='cls-fm.websync.unsubscribeCompleteArgs'>&nbsp;</span>
*/

/**
@class fm.websync.unsubscribeCompleteArgs
 <div>
 Arguments for unsubscribe complete callbacks.
 </div>

@extends fm.websync.baseCompleteArgs
*/


fm.websync.unsubscribeCompleteArgs = (function(_super) {

  __extends(unsubscribeCompleteArgs, _super);

  unsubscribeCompleteArgs.prototype.__forced = false;

  function unsubscribeCompleteArgs() {
    this.getForced = __bind(this.getForced, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      unsubscribeCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    unsubscribeCompleteArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.unsubscribeCompleteArgs-getForced'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether this unsubscribe was forced due to a disconnect.
  	 </div>
  
  	@function getForced
  	@return {Boolean}
  */


  unsubscribeCompleteArgs.prototype.getForced = function() {
    return this.__forced;
  };

  return unsubscribeCompleteArgs;

})(fm.websync.baseCompleteArgs);


/*<span id='cls-fm.websync.clientConnectResponseArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientConnectResponseArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnConnectResponse">fm.websync.client.addOnConnectResponse</see>.
 </div>

@extends fm.websync.baseClientResponseEventArgsGeneric
*/


fm.websync.clientConnectResponseArgs = (function(_super) {

  __extends(clientConnectResponseArgs, _super);

  function clientConnectResponseArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientConnectResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientConnectResponseArgs.__super__.constructor.call(this);
  }

  return clientConnectResponseArgs;

})(fm.websync.baseClientResponseEventArgsGeneric);


/*<span id='cls-fm.websync.clientDisconnectResponseArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientDisconnectResponseArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnDisconnectResponse">fm.websync.client.addOnDisconnectResponse</see>.
 </div>

@extends fm.websync.baseClientResponseEventArgsGeneric
*/


fm.websync.clientDisconnectResponseArgs = (function(_super) {

  __extends(clientDisconnectResponseArgs, _super);

  function clientDisconnectResponseArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientDisconnectResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientDisconnectResponseArgs.__super__.constructor.call(this);
  }

  return clientDisconnectResponseArgs;

})(fm.websync.baseClientResponseEventArgsGeneric);


/*<span id='cls-fm.websync.clientPublishResponseArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientPublishResponseArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnPublishResponse">fm.websync.client.addOnPublishResponse</see>.
 </div>

@extends fm.websync.baseClientResponseEventArgsGeneric
*/


fm.websync.clientPublishResponseArgs = (function(_super) {

  __extends(clientPublishResponseArgs, _super);

  function clientPublishResponseArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientPublishResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientPublishResponseArgs.__super__.constructor.call(this);
  }

  return clientPublishResponseArgs;

})(fm.websync.baseClientResponseEventArgsGeneric);


/*<span id='cls-fm.websync.clientSubscribeResponseArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientSubscribeResponseArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnSubscribeResponse">fm.websync.client.addOnSubscribeResponse</see>.
 </div>

@extends fm.websync.baseClientResponseEventArgsGeneric
*/


fm.websync.clientSubscribeResponseArgs = (function(_super) {

  __extends(clientSubscribeResponseArgs, _super);

  function clientSubscribeResponseArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientSubscribeResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientSubscribeResponseArgs.__super__.constructor.call(this);
  }

  return clientSubscribeResponseArgs;

})(fm.websync.baseClientResponseEventArgsGeneric);


/*<span id='cls-fm.websync.clientUnsubscribeResponseArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientUnsubscribeResponseArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnUnsubscribeResponse">fm.websync.client.addOnUnsubscribeResponse</see>.
 </div>

@extends fm.websync.baseClientResponseEventArgsGeneric
*/


fm.websync.clientUnsubscribeResponseArgs = (function(_super) {

  __extends(clientUnsubscribeResponseArgs, _super);

  function clientUnsubscribeResponseArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientUnsubscribeResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientUnsubscribeResponseArgs.__super__.constructor.call(this);
  }

  return clientUnsubscribeResponseArgs;

})(fm.websync.baseClientResponseEventArgsGeneric);


/*<span id='cls-fm.websync.clientBindResponseArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientBindResponseArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnBindResponse">fm.websync.client.addOnBindResponse</see>.
 </div>

@extends fm.websync.baseClientResponseEventArgsGeneric
*/


fm.websync.clientBindResponseArgs = (function(_super) {

  __extends(clientBindResponseArgs, _super);

  function clientBindResponseArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientBindResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientBindResponseArgs.__super__.constructor.call(this);
  }

  return clientBindResponseArgs;

})(fm.websync.baseClientResponseEventArgsGeneric);


/*<span id='cls-fm.websync.clientUnbindResponseArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientUnbindResponseArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnUnbindResponse">fm.websync.client.addOnUnbindResponse</see>.
 </div>

@extends fm.websync.baseClientResponseEventArgsGeneric
*/


fm.websync.clientUnbindResponseArgs = (function(_super) {

  __extends(clientUnbindResponseArgs, _super);

  function clientUnbindResponseArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientUnbindResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientUnbindResponseArgs.__super__.constructor.call(this);
  }

  return clientUnbindResponseArgs;

})(fm.websync.baseClientResponseEventArgsGeneric);


/*<span id='cls-fm.websync.clientServiceResponseArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientServiceResponseArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnServiceResponse">fm.websync.client.addOnServiceResponse</see>.
 </div>

@extends fm.websync.baseClientResponseEventArgsGeneric
*/


fm.websync.clientServiceResponseArgs = (function(_super) {

  __extends(clientServiceResponseArgs, _super);

  function clientServiceResponseArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientServiceResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientServiceResponseArgs.__super__.constructor.call(this);
  }

  return clientServiceResponseArgs;

})(fm.websync.baseClientResponseEventArgsGeneric);


/*<span id='cls-fm.websync.clientConnectRequestArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientConnectRequestArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnConnectRequest">fm.websync.client.addOnConnectRequest</see>.
 </div>

@extends fm.websync.baseClientRequestEventArgsGeneric
*/


fm.websync.clientConnectRequestArgs = (function(_super) {

  __extends(clientConnectRequestArgs, _super);

  function clientConnectRequestArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientConnectRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientConnectRequestArgs.__super__.constructor.call(this);
  }

  return clientConnectRequestArgs;

})(fm.websync.baseClientRequestEventArgsGeneric);


/*<span id='cls-fm.websync.clientDisconnectRequestArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientDisconnectRequestArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnDisconnectRequest">fm.websync.client.addOnDisconnectRequest</see>.
 </div>

@extends fm.websync.baseClientRequestEventArgsGeneric
*/


fm.websync.clientDisconnectRequestArgs = (function(_super) {

  __extends(clientDisconnectRequestArgs, _super);

  function clientDisconnectRequestArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientDisconnectRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientDisconnectRequestArgs.__super__.constructor.call(this);
  }

  return clientDisconnectRequestArgs;

})(fm.websync.baseClientRequestEventArgsGeneric);


/*<span id='cls-fm.websync.clientPublishRequestArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientPublishRequestArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnPublishRequest">fm.websync.client.addOnPublishRequest</see>.
 </div>

@extends fm.websync.baseClientRequestEventArgsGeneric
*/


fm.websync.clientPublishRequestArgs = (function(_super) {

  __extends(clientPublishRequestArgs, _super);

  function clientPublishRequestArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientPublishRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientPublishRequestArgs.__super__.constructor.call(this);
  }

  return clientPublishRequestArgs;

})(fm.websync.baseClientRequestEventArgsGeneric);


/*<span id='cls-fm.websync.clientSubscribeRequestArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientSubscribeRequestArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnSubscribeRequest">fm.websync.client.addOnSubscribeRequest</see>.
 </div>

@extends fm.websync.baseClientRequestEventArgsGeneric
*/


fm.websync.clientSubscribeRequestArgs = (function(_super) {

  __extends(clientSubscribeRequestArgs, _super);

  function clientSubscribeRequestArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientSubscribeRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientSubscribeRequestArgs.__super__.constructor.call(this);
  }

  return clientSubscribeRequestArgs;

})(fm.websync.baseClientRequestEventArgsGeneric);


/*<span id='cls-fm.websync.clientUnsubscribeRequestArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientUnsubscribeRequestArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnUnsubscribeRequest">fm.websync.client.addOnUnsubscribeRequest</see>.
 </div>

@extends fm.websync.baseClientRequestEventArgsGeneric
*/


fm.websync.clientUnsubscribeRequestArgs = (function(_super) {

  __extends(clientUnsubscribeRequestArgs, _super);

  function clientUnsubscribeRequestArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientUnsubscribeRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientUnsubscribeRequestArgs.__super__.constructor.call(this);
  }

  return clientUnsubscribeRequestArgs;

})(fm.websync.baseClientRequestEventArgsGeneric);


/*<span id='cls-fm.websync.clientBindRequestArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientBindRequestArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnBindRequest">fm.websync.client.addOnBindRequest</see>.
 </div>

@extends fm.websync.baseClientRequestEventArgsGeneric
*/


fm.websync.clientBindRequestArgs = (function(_super) {

  __extends(clientBindRequestArgs, _super);

  function clientBindRequestArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientBindRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientBindRequestArgs.__super__.constructor.call(this);
  }

  return clientBindRequestArgs;

})(fm.websync.baseClientRequestEventArgsGeneric);


/*<span id='cls-fm.websync.clientUnbindRequestArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientUnbindRequestArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnUnbindRequest">fm.websync.client.addOnUnbindRequest</see>.
 </div>

@extends fm.websync.baseClientRequestEventArgsGeneric
*/


fm.websync.clientUnbindRequestArgs = (function(_super) {

  __extends(clientUnbindRequestArgs, _super);

  function clientUnbindRequestArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientUnbindRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientUnbindRequestArgs.__super__.constructor.call(this);
  }

  return clientUnbindRequestArgs;

})(fm.websync.baseClientRequestEventArgsGeneric);


/*<span id='cls-fm.websync.clientServiceRequestArgs'>&nbsp;</span>
*/

/**
@class fm.websync.clientServiceRequestArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnServiceRequest">fm.websync.client.addOnServiceRequest</see>.
 </div>

@extends fm.websync.baseClientRequestEventArgsGeneric
*/


fm.websync.clientServiceRequestArgs = (function(_super) {

  __extends(clientServiceRequestArgs, _super);

  function clientServiceRequestArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientServiceRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientServiceRequestArgs.__super__.constructor.call(this);
  }

  return clientServiceRequestArgs;

})(fm.websync.baseClientRequestEventArgsGeneric);


/*<span id='cls-fm.websync.connectFailureArgs'>&nbsp;</span>
*/

/**
@class fm.websync.connectFailureArgs
 <div>
 Arguments for connect failure callbacks.
 </div>

@extends fm.websync.baseFailureArgs
*/


fm.websync.connectFailureArgs = (function(_super) {

  __extends(connectFailureArgs, _super);

  connectFailureArgs.prototype._isReconnect = false;

  function connectFailureArgs() {
    this.setIsReconnect = __bind(this.setIsReconnect, this);

    this.getIsReconnect = __bind(this.getIsReconnect, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      connectFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    connectFailureArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.connectFailureArgs-getIsReconnect'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the connect call was automatically
  	 invoked following a stream failure.
  	 </div>
  
  	@function getIsReconnect
  	@return {Boolean}
  */


  connectFailureArgs.prototype.getIsReconnect = function() {
    return this._isReconnect;
  };

  connectFailureArgs.prototype.setIsReconnect = function() {
    var value;
    value = arguments[0];
    return this._isReconnect = value;
  };

  return connectFailureArgs;

})(fm.websync.baseFailureArgs);


/*<span id='cls-fm.websync.bindFailureArgs'>&nbsp;</span>
*/

/**
@class fm.websync.bindFailureArgs
 <div>
 Arguments for bind failure callbacks.
 </div>

@extends fm.websync.baseFailureArgs
*/


fm.websync.bindFailureArgs = (function(_super) {

  __extends(bindFailureArgs, _super);

  bindFailureArgs.prototype.__records = null;

  bindFailureArgs.prototype._isRebind = false;

  function bindFailureArgs() {
    this.setIsRebind = __bind(this.setIsRebind, this);

    this.getRecords = __bind(this.getRecords, this);

    this.getRecord = __bind(this.getRecord, this);

    this.getKeys = __bind(this.getKeys, this);

    this.getKey = __bind(this.getKey, this);

    this.getIsRebind = __bind(this.getIsRebind, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      bindFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    bindFailureArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.bindFailureArgs-getIsRebind'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the bind call was automatically
  	 invoked following a stream failure.
  	 </div>
  
  	@function getIsRebind
  	@return {Boolean}
  */


  bindFailureArgs.prototype.getIsRebind = function() {
    return this._isRebind;
  };

  /*<span id='method-fm.websync.bindFailureArgs-getKey'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record key to which the client failed to be bound.
  	 Overrides <see cref="fm.websync.bindFailureArgs.keys">fm.websync.bindFailureArgs.keys</see>, <see cref="fm.websync.bindFailureArgs.record">fm.websync.bindFailureArgs.record</see>, and <see cref="fm.websync.bindFailureArgs.records">fm.websync.bindFailureArgs.records</see>.
  	 </div>
  
  	@function getKey
  	@return {String}
  */


  bindFailureArgs.prototype.getKey = function() {
    return fm.websync.extensible.sharedGetKey(this.__records);
  };

  /*<span id='method-fm.websync.bindFailureArgs-getKeys'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record keys to which the client failed to be bound.
  	 Overrides <see cref="fm.websync.bindFailureArgs.key">fm.websync.bindFailureArgs.key</see>, <see cref="fm.websync.bindFailureArgs.record">fm.websync.bindFailureArgs.record</see>, and <see cref="fm.websync.bindFailureArgs.records">fm.websync.bindFailureArgs.records</see>.
  	 </div>
  
  	@function getKeys
  	@return {fm.array}
  */


  bindFailureArgs.prototype.getKeys = function() {
    return fm.websync.extensible.sharedGetKeys(this.__records);
  };

  /*<span id='method-fm.websync.bindFailureArgs-getRecord'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record to which the client failed to be bound.
  	 Overrides <see cref="fm.websync.bindFailureArgs.records">fm.websync.bindFailureArgs.records</see>, <see cref="fm.websync.bindFailureArgs.key">fm.websync.bindFailureArgs.key</see>, and <see cref="fm.websync.bindFailureArgs.keys">fm.websync.bindFailureArgs.keys</see>.
  	 </div>
  
  	@function getRecord
  	@return {fm.websync.record}
  */


  bindFailureArgs.prototype.getRecord = function() {
    return fm.websync.extensible.sharedGetRecord(this.__records);
  };

  /*<span id='method-fm.websync.bindFailureArgs-getRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the records to which the client failed to be bound.
  	 Overrides <see cref="fm.websync.bindFailureArgs.record">fm.websync.bindFailureArgs.record</see>, <see cref="fm.websync.bindFailureArgs.key">fm.websync.bindFailureArgs.key</see>, and <see cref="fm.websync.bindFailureArgs.keys">fm.websync.bindFailureArgs.keys</see>.
  	 </div>
  
  	@function getRecords
  	@return {fm.array}
  */


  bindFailureArgs.prototype.getRecords = function() {
    return fm.websync.extensible.sharedGetRecords(this.__records);
  };

  bindFailureArgs.prototype.setIsRebind = function() {
    var value;
    value = arguments[0];
    return this._isRebind = value;
  };

  return bindFailureArgs;

})(fm.websync.baseFailureArgs);


/*<span id='cls-fm.websync.serviceFailureArgs'>&nbsp;</span>
*/

/**
@class fm.websync.serviceFailureArgs
 <div>
 Arguments for service failure callbacks.
 </div>

@extends fm.websync.baseFailureArgs
*/


fm.websync.serviceFailureArgs = (function(_super) {

  __extends(serviceFailureArgs, _super);

  serviceFailureArgs.prototype.__channel = null;

  serviceFailureArgs.prototype.__dataBytes = null;

  serviceFailureArgs.prototype.__dataJson = null;

  function serviceFailureArgs() {
    this.getData = __bind(this.getData, this);

    this.getTag = __bind(this.getTag, this);

    this.getIsBinary = __bind(this.getIsBinary, this);

    this.getDataJson = __bind(this.getDataJson, this);

    this.getDataBytes = __bind(this.getDataBytes, this);

    this.getChannel = __bind(this.getChannel, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      serviceFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    serviceFailureArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.serviceFailureArgs-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel to which the data failed to be sent.
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  serviceFailureArgs.prototype.getChannel = function() {
    return this.__channel;
  };

  /*<span id='method-fm.websync.serviceFailureArgs-getDataBytes'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data that failed to be sent in binary format.
  	 </div>
  
  	@function getDataBytes
  	@return {fm.array}
  */


  serviceFailureArgs.prototype.getDataBytes = function() {
    var decoded, valueJson, _var0, _var1, _var2, _var3;
    decoded = this.__dataBytes;
    valueJson = this.__dataJson;
    _var0 = decoded;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return decoded;
    }
    _var1 = valueJson;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      _var2 = new fm.holder(decoded);
      _var3 = fm.websync.crypto.tryBase64Decode(fm.serializer.deserializeString(valueJson), _var2);
      decoded = _var2.getValue();
      _var3;

      this.__dataBytes = decoded;
      return decoded;
    }
    return null;
  };

  /*<span id='method-fm.websync.serviceFailureArgs-getDataJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data that failed to be sent in JSON format.
  	 </div>
  
  	@function getDataJson
  	@return {String}
  */


  serviceFailureArgs.prototype.getDataJson = function() {
    var b, str, _var0, _var1;
    str = this.__dataJson;
    b = this.__dataBytes;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return str;
    }
    _var1 = b;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      str = fm.serializer.serializeString(fm.websync.crypto.base64Encode(b));
      this.__dataJson = str;
      return str;
    }
    return null;
  };

  /*<span id='method-fm.websync.serviceFailureArgs-getIsBinary'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether or not the data is binary.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
  */


  serviceFailureArgs.prototype.getIsBinary = function() {
    var _var0;
    _var0 = this.getDataBytes();
    return _var0 !== null && typeof _var0 !== 'undefined';
  };

  /*<span id='method-fm.websync.serviceFailureArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  serviceFailureArgs.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };

  serviceFailureArgs.prototype.getData = function() {
    return fm.json.deserialize(this.getDataJson.apply(this, arguments));
  };

  return serviceFailureArgs;

})(fm.websync.baseFailureArgs);


/*<span id='cls-fm.websync.unbindFailureArgs'>&nbsp;</span>
*/

/**
@class fm.websync.unbindFailureArgs
 <div>
 Arguments for unbind failure callbacks.
 </div>

@extends fm.websync.baseFailureArgs
*/


fm.websync.unbindFailureArgs = (function(_super) {

  __extends(unbindFailureArgs, _super);

  unbindFailureArgs.prototype.__records = null;

  function unbindFailureArgs() {
    this.getRecords = __bind(this.getRecords, this);

    this.getRecord = __bind(this.getRecord, this);

    this.getKeys = __bind(this.getKeys, this);

    this.getKey = __bind(this.getKey, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      unbindFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    unbindFailureArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.unbindFailureArgs-getKey'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record key from which the client failed to be unbound.
  	 Overrides <see cref="fm.websync.unbindFailureArgs.keys">fm.websync.unbindFailureArgs.keys</see>, <see cref="fm.websync.unbindFailureArgs.record">fm.websync.unbindFailureArgs.record</see>, and <see cref="fm.websync.unbindFailureArgs.records">fm.websync.unbindFailureArgs.records</see>.
  	 </div>
  
  	@function getKey
  	@return {String}
  */


  unbindFailureArgs.prototype.getKey = function() {
    return fm.websync.extensible.sharedGetKey(this.__records);
  };

  /*<span id='method-fm.websync.unbindFailureArgs-getKeys'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record keys from which the client failed to be unbound.
  	 Overrides <see cref="fm.websync.unbindFailureArgs.key">fm.websync.unbindFailureArgs.key</see>, <see cref="fm.websync.unbindFailureArgs.record">fm.websync.unbindFailureArgs.record</see>, and <see cref="fm.websync.unbindFailureArgs.records">fm.websync.unbindFailureArgs.records</see>.
  	 </div>
  
  	@function getKeys
  	@return {fm.array}
  */


  unbindFailureArgs.prototype.getKeys = function() {
    return fm.websync.extensible.sharedGetKeys(this.__records);
  };

  /*<span id='method-fm.websync.unbindFailureArgs-getRecord'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record from which the client failed to be unbound.
  	 Overrides <see cref="fm.websync.unbindFailureArgs.records">fm.websync.unbindFailureArgs.records</see>, <see cref="fm.websync.unbindFailureArgs.key">fm.websync.unbindFailureArgs.key</see>, and <see cref="fm.websync.unbindFailureArgs.keys">fm.websync.unbindFailureArgs.keys</see>.
  	 </div>
  
  	@function getRecord
  	@return {fm.websync.record}
  */


  unbindFailureArgs.prototype.getRecord = function() {
    return fm.websync.extensible.sharedGetRecord(this.__records);
  };

  /*<span id='method-fm.websync.unbindFailureArgs-getRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the records from which the client failed to be unbound.
  	 Overrides <see cref="fm.websync.unbindFailureArgs.record">fm.websync.unbindFailureArgs.record</see>, <see cref="fm.websync.unbindFailureArgs.key">fm.websync.unbindFailureArgs.key</see>, and <see cref="fm.websync.unbindFailureArgs.keys">fm.websync.unbindFailureArgs.keys</see>.
  	 </div>
  
  	@function getRecords
  	@return {fm.array}
  */


  unbindFailureArgs.prototype.getRecords = function() {
    return fm.websync.extensible.sharedGetRecords(this.__records);
  };

  return unbindFailureArgs;

})(fm.websync.baseFailureArgs);


/*<span id='cls-fm.websync.streamFailureArgs'>&nbsp;</span>
*/

/**
@class fm.websync.streamFailureArgs
 <div>
 Arguments for <see cref="fm.websync.connectArgs.onStreamFailure">fm.websync.connectArgs.onStreamFailure</see>.
 </div>

@extends fm.websync.baseFailureArgs
*/


fm.websync.streamFailureArgs = (function(_super) {

  __extends(streamFailureArgs, _super);

  streamFailureArgs.prototype._connectArgs = null;

  function streamFailureArgs() {
    this.setConnectArgs = __bind(this.setConnectArgs, this);

    this.getConnectArgs = __bind(this.getConnectArgs, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      streamFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    streamFailureArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.streamFailureArgs-getConnectArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the connect arguments to use
  	 for the next connect attempt.
  	 </div>
  
  	@function getConnectArgs
  	@return {fm.websync.connectArgs}
  */


  streamFailureArgs.prototype.getConnectArgs = function() {
    return this._connectArgs;
  };

  /*<span id='method-fm.websync.streamFailureArgs-setConnectArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the connect arguments to use
  	 for the next connect attempt.
  	 </div>
  
  	@function setConnectArgs
  	@param {fm.websync.connectArgs} value
  	@return {void}
  */


  streamFailureArgs.prototype.setConnectArgs = function() {
    var value;
    value = arguments[0];
    return this._connectArgs = value;
  };

  return streamFailureArgs;

})(fm.websync.baseFailureArgs);


/*<span id='cls-fm.websync.publishFailureArgs'>&nbsp;</span>
*/

/**
@class fm.websync.publishFailureArgs
 <div>
 Arguments for publish failure callbacks.
 </div>

@extends fm.websync.baseFailureArgs
*/


fm.websync.publishFailureArgs = (function(_super) {

  __extends(publishFailureArgs, _super);

  publishFailureArgs.prototype.__channel = null;

  publishFailureArgs.prototype.__dataBytes = null;

  publishFailureArgs.prototype.__dataJson = null;

  function publishFailureArgs() {
    this.getData = __bind(this.getData, this);

    this.getTag = __bind(this.getTag, this);

    this.getIsBinary = __bind(this.getIsBinary, this);

    this.getDataJson = __bind(this.getDataJson, this);

    this.getDataBytes = __bind(this.getDataBytes, this);

    this.getChannel = __bind(this.getChannel, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      publishFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    publishFailureArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.publishFailureArgs-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel to which the data failed to be sent.
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  publishFailureArgs.prototype.getChannel = function() {
    return this.__channel;
  };

  /*<span id='method-fm.websync.publishFailureArgs-getDataBytes'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data that failed to be sent in binary format.
  	 </div>
  
  	@function getDataBytes
  	@return {fm.array}
  */


  publishFailureArgs.prototype.getDataBytes = function() {
    var decoded, valueJson, _var0, _var1, _var2, _var3;
    decoded = this.__dataBytes;
    valueJson = this.__dataJson;
    _var0 = decoded;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return decoded;
    }
    _var1 = valueJson;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      _var2 = new fm.holder(decoded);
      _var3 = fm.websync.crypto.tryBase64Decode(fm.serializer.deserializeString(valueJson), _var2);
      decoded = _var2.getValue();
      _var3;

      this.__dataBytes = decoded;
      return decoded;
    }
    return null;
  };

  /*<span id='method-fm.websync.publishFailureArgs-getDataJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data that failed to be sent in JSON format.
  	 </div>
  
  	@function getDataJson
  	@return {String}
  */


  publishFailureArgs.prototype.getDataJson = function() {
    var b, str, _var0, _var1;
    str = this.__dataJson;
    b = this.__dataBytes;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return str;
    }
    _var1 = b;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      str = fm.serializer.serializeString(fm.websync.crypto.base64Encode(b));
      this.__dataJson = str;
      return str;
    }
    return null;
  };

  /*<span id='method-fm.websync.publishFailureArgs-getIsBinary'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether or not the data is binary.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
  */


  publishFailureArgs.prototype.getIsBinary = function() {
    var _var0;
    _var0 = this.getDataBytes();
    return _var0 !== null && typeof _var0 !== 'undefined';
  };

  /*<span id='method-fm.websync.publishFailureArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  publishFailureArgs.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };

  publishFailureArgs.prototype.getData = function() {
    return fm.json.deserialize(this.getDataJson.apply(this, arguments));
  };

  return publishFailureArgs;

})(fm.websync.baseFailureArgs);


/*<span id='cls-fm.websync.subscribeFailureArgs'>&nbsp;</span>
*/

/**
@class fm.websync.subscribeFailureArgs
 <div>
 Arguments for subscribe failure callbacks.
 </div>

@extends fm.websync.baseFailureArgs
*/


fm.websync.subscribeFailureArgs = (function(_super) {

  __extends(subscribeFailureArgs, _super);

  subscribeFailureArgs.prototype.__channels = null;

  subscribeFailureArgs.prototype._isResubscribe = false;

  function subscribeFailureArgs() {
    this.setIsResubscribe = __bind(this.setIsResubscribe, this);

    this.getTag = __bind(this.getTag, this);

    this.getIsResubscribe = __bind(this.getIsResubscribe, this);

    this.getChannels = __bind(this.getChannels, this);

    this.getChannel = __bind(this.getChannel, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      subscribeFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    subscribeFailureArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.subscribeFailureArgs-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel to which the client failed to be subscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.subscribeFailureArgs.channels">fm.websync.subscribeFailureArgs.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  subscribeFailureArgs.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };

  /*<span id='method-fm.websync.subscribeFailureArgs-getChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channels to which the client failed to be subscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.subscribeFailureArgs.channel">fm.websync.subscribeFailureArgs.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
  */


  subscribeFailureArgs.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };

  /*<span id='method-fm.websync.subscribeFailureArgs-getIsResubscribe'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the subscribe call was automatically
  	 invoked following a stream failure.
  	 </div>
  
  	@function getIsResubscribe
  	@return {Boolean}
  */


  subscribeFailureArgs.prototype.getIsResubscribe = function() {
    return this._isResubscribe;
  };

  /*<span id='method-fm.websync.subscribeFailureArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag associated with the subscribe request.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  subscribeFailureArgs.prototype.getTag = function() {
    var _ref;
    return (_ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? _ref : fm.stringExtensions.empty;
  };

  subscribeFailureArgs.prototype.setIsResubscribe = function() {
    var value;
    value = arguments[0];
    return this._isResubscribe = value;
  };

  return subscribeFailureArgs;

})(fm.websync.baseFailureArgs);


/*<span id='cls-fm.websync.unsubscribeFailureArgs'>&nbsp;</span>
*/

/**
@class fm.websync.unsubscribeFailureArgs
 <div>
 Arguments for unsubscribe failure callbacks.
 </div>

@extends fm.websync.baseFailureArgs
*/


fm.websync.unsubscribeFailureArgs = (function(_super) {

  __extends(unsubscribeFailureArgs, _super);

  unsubscribeFailureArgs.prototype.__channels = null;

  function unsubscribeFailureArgs() {
    this.getTag = __bind(this.getTag, this);

    this.getChannels = __bind(this.getChannels, this);

    this.getChannel = __bind(this.getChannel, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      unsubscribeFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    unsubscribeFailureArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.unsubscribeFailureArgs-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel from which the client failed to be unsubscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.unsubscribeFailureArgs.channels">fm.websync.unsubscribeFailureArgs.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  unsubscribeFailureArgs.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };

  /*<span id='method-fm.websync.unsubscribeFailureArgs-getChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channels from which the client failed to be unsubscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.unsubscribeFailureArgs.channel">fm.websync.unsubscribeFailureArgs.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
  */


  unsubscribeFailureArgs.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };

  /*<span id='method-fm.websync.unsubscribeFailureArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag associated with the subscribe request.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  unsubscribeFailureArgs.prototype.getTag = function() {
    var _ref;
    return (_ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? _ref : fm.stringExtensions.empty;
  };

  return unsubscribeFailureArgs;

})(fm.websync.baseFailureArgs);


/*<span id='cls-fm.websync.connectSuccessArgs'>&nbsp;</span>
*/

/**
@class fm.websync.connectSuccessArgs
 <div>
 Arguments for connect success callbacks.
 </div>

@extends fm.websync.baseSuccessArgs
*/


fm.websync.connectSuccessArgs = (function(_super) {

  __extends(connectSuccessArgs, _super);

  connectSuccessArgs.prototype._connectionType = null;

  connectSuccessArgs.prototype._isReconnect = false;

  function connectSuccessArgs() {
    this.setIsReconnect = __bind(this.setIsReconnect, this);

    this.setConnectionType = __bind(this.setConnectionType, this);

    this.getIsReconnect = __bind(this.getIsReconnect, this);

    this.getConnectionType = __bind(this.getConnectionType, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      connectSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    connectSuccessArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.connectSuccessArgs-getConnectionType'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the connection type of the stream.
  	 </div>
  
  	@function getConnectionType
  	@return {fm.websync.connectionType}
  */


  connectSuccessArgs.prototype.getConnectionType = function() {
    return this._connectionType;
  };

  /*<span id='method-fm.websync.connectSuccessArgs-getIsReconnect'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the connect call was automatically
  	 invoked following a stream failure.
  	 </div>
  
  	@function getIsReconnect
  	@return {Boolean}
  */


  connectSuccessArgs.prototype.getIsReconnect = function() {
    return this._isReconnect;
  };

  connectSuccessArgs.prototype.setConnectionType = function() {
    var value;
    value = arguments[0];
    return this._connectionType = value;
  };

  connectSuccessArgs.prototype.setIsReconnect = function() {
    var value;
    value = arguments[0];
    return this._isReconnect = value;
  };

  return connectSuccessArgs;

})(fm.websync.baseSuccessArgs);


/*<span id='cls-fm.websync.bindSuccessArgs'>&nbsp;</span>
*/

/**
@class fm.websync.bindSuccessArgs
 <div>
 Arguments for bind success callbacks.
 </div>

@extends fm.websync.baseSuccessArgs
*/


fm.websync.bindSuccessArgs = (function(_super) {

  __extends(bindSuccessArgs, _super);

  bindSuccessArgs.prototype.__records = null;

  bindSuccessArgs.prototype._isRebind = false;

  function bindSuccessArgs() {
    this.setIsRebind = __bind(this.setIsRebind, this);

    this.getRecords = __bind(this.getRecords, this);

    this.getRecord = __bind(this.getRecord, this);

    this.getKeys = __bind(this.getKeys, this);

    this.getKey = __bind(this.getKey, this);

    this.getIsRebind = __bind(this.getIsRebind, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      bindSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    bindSuccessArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.bindSuccessArgs-getIsRebind'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the bind call was automatically
  	 invoked following a stream failure.
  	 </div>
  
  	@function getIsRebind
  	@return {Boolean}
  */


  bindSuccessArgs.prototype.getIsRebind = function() {
    return this._isRebind;
  };

  /*<span id='method-fm.websync.bindSuccessArgs-getKey'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record key to which the client was bound.
  	 Overrides <see cref="fm.websync.bindSuccessArgs.keys">fm.websync.bindSuccessArgs.keys</see>, <see cref="fm.websync.bindSuccessArgs.record">fm.websync.bindSuccessArgs.record</see>, and <see cref="fm.websync.bindSuccessArgs.records">fm.websync.bindSuccessArgs.records</see>.
  	 </div>
  
  	@function getKey
  	@return {String}
  */


  bindSuccessArgs.prototype.getKey = function() {
    return fm.websync.extensible.sharedGetKey(this.__records);
  };

  /*<span id='method-fm.websync.bindSuccessArgs-getKeys'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record keys to which the client was bound.
  	 Overrides <see cref="fm.websync.bindSuccessArgs.key">fm.websync.bindSuccessArgs.key</see>, <see cref="fm.websync.bindSuccessArgs.record">fm.websync.bindSuccessArgs.record</see>, and <see cref="fm.websync.bindSuccessArgs.records">fm.websync.bindSuccessArgs.records</see>.
  	 </div>
  
  	@function getKeys
  	@return {fm.array}
  */


  bindSuccessArgs.prototype.getKeys = function() {
    return fm.websync.extensible.sharedGetKeys(this.__records);
  };

  /*<span id='method-fm.websync.bindSuccessArgs-getRecord'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record to which the client was bound.
  	 Overrides <see cref="fm.websync.bindSuccessArgs.records">fm.websync.bindSuccessArgs.records</see>, <see cref="fm.websync.bindSuccessArgs.key">fm.websync.bindSuccessArgs.key</see>, and <see cref="fm.websync.bindSuccessArgs.keys">fm.websync.bindSuccessArgs.keys</see>.
  	 </div>
  
  	@function getRecord
  	@return {fm.websync.record}
  */


  bindSuccessArgs.prototype.getRecord = function() {
    return fm.websync.extensible.sharedGetRecord(this.__records);
  };

  /*<span id='method-fm.websync.bindSuccessArgs-getRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the records to which the client was bound.
  	 Overrides <see cref="fm.websync.bindSuccessArgs.record">fm.websync.bindSuccessArgs.record</see>, <see cref="fm.websync.bindSuccessArgs.key">fm.websync.bindSuccessArgs.key</see>, and <see cref="fm.websync.bindSuccessArgs.keys">fm.websync.bindSuccessArgs.keys</see>.
  	 </div>
  
  	@function getRecords
  	@return {fm.array}
  */


  bindSuccessArgs.prototype.getRecords = function() {
    return fm.websync.extensible.sharedGetRecords(this.__records);
  };

  bindSuccessArgs.prototype.setIsRebind = function() {
    var value;
    value = arguments[0];
    return this._isRebind = value;
  };

  return bindSuccessArgs;

})(fm.websync.baseSuccessArgs);


/*<span id='cls-fm.websync.serviceSuccessArgs'>&nbsp;</span>
*/

/**
@class fm.websync.serviceSuccessArgs
 <div>
 Arguments for service success callbacks.
 </div>

@extends fm.websync.baseSuccessArgs
*/


fm.websync.serviceSuccessArgs = (function(_super) {

  __extends(serviceSuccessArgs, _super);

  serviceSuccessArgs.prototype.__channel = null;

  serviceSuccessArgs.prototype.__dataBytes = null;

  serviceSuccessArgs.prototype.__dataJson = null;

  function serviceSuccessArgs() {
    this.getData = __bind(this.getData, this);

    this.getTag = __bind(this.getTag, this);

    this.getIsBinary = __bind(this.getIsBinary, this);

    this.getDataJson = __bind(this.getDataJson, this);

    this.getDataBytes = __bind(this.getDataBytes, this);

    this.getChannel = __bind(this.getChannel, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      serviceSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    serviceSuccessArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.serviceSuccessArgs-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel to which the data was sent.
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  serviceSuccessArgs.prototype.getChannel = function() {
    return this.__channel;
  };

  /*<span id='method-fm.websync.serviceSuccessArgs-getDataBytes'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data that was sent in binary format.
  	 </div>
  
  	@function getDataBytes
  	@return {fm.array}
  */


  serviceSuccessArgs.prototype.getDataBytes = function() {
    var decoded, valueJson, _var0, _var1, _var2, _var3;
    decoded = this.__dataBytes;
    valueJson = this.__dataJson;
    _var0 = decoded;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return decoded;
    }
    _var1 = valueJson;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      _var2 = new fm.holder(decoded);
      _var3 = fm.websync.crypto.tryBase64Decode(fm.serializer.deserializeString(valueJson), _var2);
      decoded = _var2.getValue();
      _var3;

      this.__dataBytes = decoded;
      return decoded;
    }
    return null;
  };

  /*<span id='method-fm.websync.serviceSuccessArgs-getDataJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data that was sent in JSON format.
  	 </div>
  
  	@function getDataJson
  	@return {String}
  */


  serviceSuccessArgs.prototype.getDataJson = function() {
    var b, str, _var0, _var1;
    str = this.__dataJson;
    b = this.__dataBytes;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return str;
    }
    _var1 = b;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      str = fm.serializer.serializeString(fm.websync.crypto.base64Encode(b));
      this.__dataJson = str;
      return str;
    }
    return null;
  };

  /*<span id='method-fm.websync.serviceSuccessArgs-getIsBinary'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether or not the data is binary.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
  */


  serviceSuccessArgs.prototype.getIsBinary = function() {
    var _var0;
    _var0 = this.getDataBytes();
    return _var0 !== null && typeof _var0 !== 'undefined';
  };

  /*<span id='method-fm.websync.serviceSuccessArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  serviceSuccessArgs.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };

  serviceSuccessArgs.prototype.getData = function() {
    return fm.json.deserialize(this.getDataJson.apply(this, arguments));
  };

  return serviceSuccessArgs;

})(fm.websync.baseSuccessArgs);


/*<span id='cls-fm.websync.unbindSuccessArgs'>&nbsp;</span>
*/

/**
@class fm.websync.unbindSuccessArgs
 <div>
 Arguments for unbind success callbacks.
 </div>

@extends fm.websync.baseSuccessArgs
*/


fm.websync.unbindSuccessArgs = (function(_super) {

  __extends(unbindSuccessArgs, _super);

  unbindSuccessArgs.prototype.__forced = false;

  unbindSuccessArgs.prototype.__records = null;

  function unbindSuccessArgs() {
    this.getRecords = __bind(this.getRecords, this);

    this.getRecord = __bind(this.getRecord, this);

    this.getKeys = __bind(this.getKeys, this);

    this.getKey = __bind(this.getKey, this);

    this.getForced = __bind(this.getForced, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      unbindSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    unbindSuccessArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.unbindSuccessArgs-getForced'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether this unbind was forced due to a disconnect.
  	 </div>
  
  	@function getForced
  	@return {Boolean}
  */


  unbindSuccessArgs.prototype.getForced = function() {
    return this.__forced;
  };

  /*<span id='method-fm.websync.unbindSuccessArgs-getKey'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record key from which the client was unbound.
  	 Overrides <see cref="fm.websync.unbindSuccessArgs.keys">fm.websync.unbindSuccessArgs.keys</see>, <see cref="fm.websync.unbindSuccessArgs.record">fm.websync.unbindSuccessArgs.record</see>, and <see cref="fm.websync.unbindSuccessArgs.records">fm.websync.unbindSuccessArgs.records</see>.
  	 </div>
  
  	@function getKey
  	@return {String}
  */


  unbindSuccessArgs.prototype.getKey = function() {
    return fm.websync.extensible.sharedGetKey(this.__records);
  };

  /*<span id='method-fm.websync.unbindSuccessArgs-getKeys'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record keys from which the client was unbound.
  	 Overrides <see cref="fm.websync.unbindSuccessArgs.key">fm.websync.unbindSuccessArgs.key</see>, <see cref="fm.websync.unbindSuccessArgs.record">fm.websync.unbindSuccessArgs.record</see>, and <see cref="fm.websync.unbindSuccessArgs.records">fm.websync.unbindSuccessArgs.records</see>.
  	 </div>
  
  	@function getKeys
  	@return {fm.array}
  */


  unbindSuccessArgs.prototype.getKeys = function() {
    return fm.websync.extensible.sharedGetKeys(this.__records);
  };

  /*<span id='method-fm.websync.unbindSuccessArgs-getRecord'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record from which the client was unbound.
  	 Overrides <see cref="fm.websync.unbindSuccessArgs.records">fm.websync.unbindSuccessArgs.records</see>, <see cref="fm.websync.unbindSuccessArgs.key">fm.websync.unbindSuccessArgs.key</see>, and <see cref="fm.websync.unbindSuccessArgs.keys">fm.websync.unbindSuccessArgs.keys</see>.
  	 </div>
  
  	@function getRecord
  	@return {fm.websync.record}
  */


  unbindSuccessArgs.prototype.getRecord = function() {
    return fm.websync.extensible.sharedGetRecord(this.__records);
  };

  /*<span id='method-fm.websync.unbindSuccessArgs-getRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the records from which the client was unbound.
  	 Overrides <see cref="fm.websync.unbindSuccessArgs.record">fm.websync.unbindSuccessArgs.record</see>, <see cref="fm.websync.unbindSuccessArgs.key">fm.websync.unbindSuccessArgs.key</see>, and <see cref="fm.websync.unbindSuccessArgs.keys">fm.websync.unbindSuccessArgs.keys</see>.
  	 </div>
  
  	@function getRecords
  	@return {fm.array}
  */


  unbindSuccessArgs.prototype.getRecords = function() {
    return fm.websync.extensible.sharedGetRecords(this.__records);
  };

  return unbindSuccessArgs;

})(fm.websync.baseSuccessArgs);


/*<span id='cls-fm.websync.publishSuccessArgs'>&nbsp;</span>
*/

/**
@class fm.websync.publishSuccessArgs
 <div>
 Arguments for publish success callbacks.
 </div>

@extends fm.websync.baseSuccessArgs
*/


fm.websync.publishSuccessArgs = (function(_super) {

  __extends(publishSuccessArgs, _super);

  publishSuccessArgs.prototype.__channel = null;

  publishSuccessArgs.prototype.__dataBytes = null;

  publishSuccessArgs.prototype.__dataJson = null;

  function publishSuccessArgs() {
    this.getData = __bind(this.getData, this);

    this.getTag = __bind(this.getTag, this);

    this.getIsBinary = __bind(this.getIsBinary, this);

    this.getDataJson = __bind(this.getDataJson, this);

    this.getDataBytes = __bind(this.getDataBytes, this);

    this.getChannel = __bind(this.getChannel, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      publishSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    publishSuccessArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.publishSuccessArgs-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel to which the data was sent.
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  publishSuccessArgs.prototype.getChannel = function() {
    return this.__channel;
  };

  /*<span id='method-fm.websync.publishSuccessArgs-getDataBytes'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data that was sent in binary format.
  	 </div>
  
  	@function getDataBytes
  	@return {fm.array}
  */


  publishSuccessArgs.prototype.getDataBytes = function() {
    var decoded, valueJson, _var0, _var1, _var2, _var3;
    decoded = this.__dataBytes;
    valueJson = this.__dataJson;
    _var0 = decoded;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return decoded;
    }
    _var1 = valueJson;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      _var2 = new fm.holder(decoded);
      _var3 = fm.websync.crypto.tryBase64Decode(fm.serializer.deserializeString(valueJson), _var2);
      decoded = _var2.getValue();
      _var3;

      this.__dataBytes = decoded;
      return decoded;
    }
    return null;
  };

  /*<span id='method-fm.websync.publishSuccessArgs-getDataJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data that was sent in JSON format.
  	 </div>
  
  	@function getDataJson
  	@return {String}
  */


  publishSuccessArgs.prototype.getDataJson = function() {
    var b, str, _var0, _var1;
    str = this.__dataJson;
    b = this.__dataBytes;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return str;
    }
    _var1 = b;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      str = fm.serializer.serializeString(fm.websync.crypto.base64Encode(b));
      this.__dataJson = str;
      return str;
    }
    return null;
  };

  /*<span id='method-fm.websync.publishSuccessArgs-getIsBinary'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether or not the data is binary.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
  */


  publishSuccessArgs.prototype.getIsBinary = function() {
    var _var0;
    _var0 = this.getDataBytes();
    return _var0 !== null && typeof _var0 !== 'undefined';
  };

  /*<span id='method-fm.websync.publishSuccessArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  publishSuccessArgs.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };

  publishSuccessArgs.prototype.getData = function() {
    return fm.json.deserialize(this.getDataJson.apply(this, arguments));
  };

  return publishSuccessArgs;

})(fm.websync.baseSuccessArgs);


/*<span id='cls-fm.websync.subscribeReceiveArgs'>&nbsp;</span>
*/

/**
@class fm.websync.subscribeReceiveArgs
 <div>
 Arguments for <see cref="fm.websync.subscribeArgs.onReceive">fm.websync.subscribeArgs.onReceive</see>.
 </div>

@extends fm.websync.baseReceiveArgs
*/


fm.websync.subscribeReceiveArgs = (function(_super) {

  __extends(subscribeReceiveArgs, _super);

  subscribeReceiveArgs.prototype.__channel = null;

  /*<span id='method-fm.websync.subscribeReceiveArgs-fm.websync.subscribeReceiveArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.subscribeReceiveArgs">fm.websync.subscribeReceiveArgs</see> class.
  	 </div>
  	@function fm.websync.subscribeReceiveArgs
  	@param {String} channel The channel over which data was received.
  	@param {String} dataJson The data in JSON format.
  	@param {fm.array} dataBytes The data in binary format.
  	@param {fm.websync.connectionType} connectionType The current connection type.
  	@param {Integer} reconnectAfter The amount of time in milliseconds to pause before reconnecting to the server.
  	@return {}
  */


  function subscribeReceiveArgs() {
    this.getWasSentByMe = __bind(this.getWasSentByMe, this);

    this.getPublishingClient = __bind(this.getPublishingClient, this);

    this.getChannel = __bind(this.getChannel, this);

    var channel, connectionType, dataBytes, dataJson, reconnectAfter;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      subscribeReceiveArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    channel = arguments[0];
    dataJson = arguments[1];
    dataBytes = arguments[2];
    connectionType = arguments[3];
    reconnectAfter = arguments[4];
    subscribeReceiveArgs.__super__.constructor.call(this, dataJson, dataBytes, connectionType, reconnectAfter);
    this.__channel = channel;
  }

  /*<span id='method-fm.websync.subscribeReceiveArgs-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel over which the data was published.
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  subscribeReceiveArgs.prototype.getChannel = function() {
    return this.__channel;
  };

  /*<span id='method-fm.websync.subscribeReceiveArgs-getPublishingClient'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets details about the client sending the publication.
  	 </div>
  
  	@function getPublishingClient
  	@return {fm.websync.publishingClient}
  */


  subscribeReceiveArgs.prototype.getPublishingClient = function() {
    return fm.websync.publishingClient.fromJson(this.getExtensionValueJson("fm.publishing"));
  };

  /*<span id='method-fm.websync.subscribeReceiveArgs-getWasSentByMe'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the data was sent by the current client.
  	 </div>
  
  	@function getWasSentByMe
  	@return {Boolean}
  */


  subscribeReceiveArgs.prototype.getWasSentByMe = function() {
    var _var0, _var1, _var2;
    _var0 = this.getPublishingClient();
    _var1 = this.getClient();
    _var2 = this.getPublishingClient().getClientId();
    return (((_var0 !== null && typeof _var0 !== 'undefined') && (_var1 !== null && typeof _var1 !== 'undefined')) && (this.getPublishingClient().getClientId() !== null)) && (_var2 === null ? _var2 === this.getClient().getClientId() : _var2.equals(this.getClient().getClientId()));
  };

  return subscribeReceiveArgs;

})(fm.websync.baseReceiveArgs);


/*<span id='cls-fm.websync.subscribeSuccessArgs'>&nbsp;</span>
*/

/**
@class fm.websync.subscribeSuccessArgs
 <div>
 Arguments for subscribe success callbacks.
 </div>

@extends fm.websync.baseSuccessArgs
*/


fm.websync.subscribeSuccessArgs = (function(_super) {

  __extends(subscribeSuccessArgs, _super);

  subscribeSuccessArgs.prototype.__channels = null;

  subscribeSuccessArgs.prototype._isResubscribe = false;

  function subscribeSuccessArgs() {
    this.setIsResubscribe = __bind(this.setIsResubscribe, this);

    this.getTag = __bind(this.getTag, this);

    this.getIsResubscribe = __bind(this.getIsResubscribe, this);

    this.getChannels = __bind(this.getChannels, this);

    this.getChannel = __bind(this.getChannel, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      subscribeSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    subscribeSuccessArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.subscribeSuccessArgs-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel to which the client was subscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.subscribeSuccessArgs.channels">fm.websync.subscribeSuccessArgs.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  subscribeSuccessArgs.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };

  /*<span id='method-fm.websync.subscribeSuccessArgs-getChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channels to which the client was subscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.subscribeSuccessArgs.channel">fm.websync.subscribeSuccessArgs.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
  */


  subscribeSuccessArgs.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };

  /*<span id='method-fm.websync.subscribeSuccessArgs-getIsResubscribe'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the subscribe call was automatically
  	 invoked following a stream failure.
  	 </div>
  
  	@function getIsResubscribe
  	@return {Boolean}
  */


  subscribeSuccessArgs.prototype.getIsResubscribe = function() {
    return this._isResubscribe;
  };

  /*<span id='method-fm.websync.subscribeSuccessArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag associated with the subscribe request.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  subscribeSuccessArgs.prototype.getTag = function() {
    var _ref;
    return (_ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? _ref : fm.stringExtensions.empty;
  };

  subscribeSuccessArgs.prototype.setIsResubscribe = function() {
    var value;
    value = arguments[0];
    return this._isResubscribe = value;
  };

  return subscribeSuccessArgs;

})(fm.websync.baseSuccessArgs);


/*<span id='cls-fm.websync.unsubscribeSuccessArgs'>&nbsp;</span>
*/

/**
@class fm.websync.unsubscribeSuccessArgs
 <div>
 Arguments for unsubscribe success callbacks.
 </div>

@extends fm.websync.baseSuccessArgs
*/


fm.websync.unsubscribeSuccessArgs = (function(_super) {

  __extends(unsubscribeSuccessArgs, _super);

  unsubscribeSuccessArgs.prototype.__channels = null;

  unsubscribeSuccessArgs.prototype.__forced = false;

  function unsubscribeSuccessArgs() {
    this.getTag = __bind(this.getTag, this);

    this.getForced = __bind(this.getForced, this);

    this.getChannels = __bind(this.getChannels, this);

    this.getChannel = __bind(this.getChannel, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      unsubscribeSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    unsubscribeSuccessArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.unsubscribeSuccessArgs-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel from which the client was unsubscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.unsubscribeSuccessArgs.channels">fm.websync.unsubscribeSuccessArgs.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  unsubscribeSuccessArgs.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };

  /*<span id='method-fm.websync.unsubscribeSuccessArgs-getChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channels from which the client was unsubscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.unsubscribeSuccessArgs.channel">fm.websync.unsubscribeSuccessArgs.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
  */


  unsubscribeSuccessArgs.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };

  /*<span id='method-fm.websync.unsubscribeSuccessArgs-getForced'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether this unsubscribe was forced due to a disconnect.
  	 </div>
  
  	@function getForced
  	@return {Boolean}
  */


  unsubscribeSuccessArgs.prototype.getForced = function() {
    return this.__forced;
  };

  /*<span id='method-fm.websync.unsubscribeSuccessArgs-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag associated with the subscribe request.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  unsubscribeSuccessArgs.prototype.getTag = function() {
    var _ref;
    return (_ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? _ref : fm.stringExtensions.empty;
  };

  return unsubscribeSuccessArgs;

})(fm.websync.baseSuccessArgs);


/*<span id='cls-fm.websync.publisherPublishResponseArgs'>&nbsp;</span>
*/

/**
@class fm.websync.publisherPublishResponseArgs
 <div>
 Arguments for <see cref="fm.websync.publisher.addOnPublishResponse">fm.websync.publisher.addOnPublishResponse</see>.
 </div>

@extends fm.websync.basePublisherResponseEventArgsGeneric
*/


fm.websync.publisherPublishResponseArgs = (function(_super) {

  __extends(publisherPublishResponseArgs, _super);

  function publisherPublishResponseArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      publisherPublishResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    publisherPublishResponseArgs.__super__.constructor.call(this);
  }

  return publisherPublishResponseArgs;

})(fm.websync.basePublisherResponseEventArgsGeneric);


/*<span id='cls-fm.websync.publisherPublishRequestArgs'>&nbsp;</span>
*/

/**
@class fm.websync.publisherPublishRequestArgs
 <div>
 Arguments for <see cref="fm.websync.publisher.addOnPublishRequest">fm.websync.publisher.addOnPublishRequest</see>.
 </div>

@extends fm.websync.basePublisherRequestEventArgsGeneric
*/


fm.websync.publisherPublishRequestArgs = (function(_super) {

  __extends(publisherPublishRequestArgs, _super);

  function publisherPublishRequestArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      publisherPublishRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    publisherPublishRequestArgs.__super__.constructor.call(this);
  }

  return publisherPublishRequestArgs;

})(fm.websync.basePublisherRequestEventArgsGeneric);




fm.websync.deferredRetryConnectState = (function(_super) {

  __extends(deferredRetryConnectState, _super);

  deferredRetryConnectState.prototype._backoffTimeout = 0;

  deferredRetryConnectState.prototype._connectArgs = null;

  function deferredRetryConnectState() {
    this.setConnectArgs = __bind(this.setConnectArgs, this);

    this.setBackoffTimeout = __bind(this.setBackoffTimeout, this);

    this.getConnectArgs = __bind(this.getConnectArgs, this);

    this.getBackoffTimeout = __bind(this.getBackoffTimeout, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      deferredRetryConnectState.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    deferredRetryConnectState.__super__.constructor.call(this);
  }

  deferredRetryConnectState.prototype.getBackoffTimeout = function() {
    return this._backoffTimeout;
  };

  deferredRetryConnectState.prototype.getConnectArgs = function() {
    return this._connectArgs;
  };

  deferredRetryConnectState.prototype.setBackoffTimeout = function() {
    var value;
    value = arguments[0];
    return this._backoffTimeout = value;
  };

  deferredRetryConnectState.prototype.setConnectArgs = function() {
    var value;
    value = arguments[0];
    return this._connectArgs = value;
  };

  return deferredRetryConnectState;

})(fm.object);




fm.websync.deferredStreamState = (function(_super) {

  __extends(deferredStreamState, _super);

  deferredStreamState.prototype._connectArgs = null;

  deferredStreamState.prototype._receivedMessages = false;

  function deferredStreamState() {
    this.setReceivedMessages = __bind(this.setReceivedMessages, this);

    this.setConnectArgs = __bind(this.setConnectArgs, this);

    this.getReceivedMessages = __bind(this.getReceivedMessages, this);

    this.getConnectArgs = __bind(this.getConnectArgs, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      deferredStreamState.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    deferredStreamState.__super__.constructor.call(this);
  }

  deferredStreamState.prototype.getConnectArgs = function() {
    return this._connectArgs;
  };

  deferredStreamState.prototype.getReceivedMessages = function() {
    return this._receivedMessages;
  };

  deferredStreamState.prototype.setConnectArgs = function() {
    var value;
    value = arguments[0];
    return this._connectArgs = value;
  };

  deferredStreamState.prototype.setReceivedMessages = function() {
    var value;
    value = arguments[0];
    return this._receivedMessages = value;
  };

  return deferredStreamState;

})(fm.object);


/*<span id='cls-fm.websync.messageTransfer'>&nbsp;</span>
*/

/**
@class fm.websync.messageTransfer
 <div>
 Base class that defines methods for transferring messages over HTTP.
 </div>

@extends fm.object
*/


fm.websync.messageTransfer = (function(_super) {

  __extends(messageTransfer, _super);

  messageTransfer.prototype._messageTransferCallbackKey = null;

  function messageTransfer() {
    this.shutdown = __bind(this.shutdown, this);

    this.sendMessagesAsync = __bind(this.sendMessagesAsync, this);

    this.sendMessages = __bind(this.sendMessages, this);

    this.sendAsyncCallback = __bind(this.sendAsyncCallback, this);

    this.sendAsync = __bind(this.sendAsync, this);

    this.send = __bind(this.send, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      messageTransfer.__super__.constructor.call(this);
      this._messageTransferCallbackKey = "fm.websync.messageTransfer.callback";
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    messageTransfer.__super__.constructor.call(this);
    this._messageTransferCallbackKey = "fm.websync.messageTransfer.callback";
  }

  messageTransfer.raiseRequestCreated = function() {
    var p, requestArgs, _var0;
    requestArgs = arguments[0];
    _var0 = requestArgs.getOnRequestCreated();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      p = new fm.websync.messageRequestCreatedArgs();
      p.setRequests(requestArgs.getMessages());
      p.setSender(requestArgs.getSender());
      return requestArgs.getOnRequestCreated()(p);
    }
  };

  messageTransfer.raiseResponseReceived = function() {
    var p, responseArgs, _var0, _var1;
    responseArgs = arguments[0];
    _var0 = responseArgs.getException();
    _var1 = responseArgs.getRequestArgs().getOnResponseReceived();
    if ((_var0 === null || typeof _var0 === 'undefined') && (_var1 !== null && typeof _var1 !== 'undefined')) {
      p = new fm.websync.messageResponseReceivedArgs();
      p.setResponses(responseArgs.getMessages());
      p.setSender(responseArgs.getRequestArgs().getSender());
      return responseArgs.getRequestArgs().getOnResponseReceived()(p);
    }
  };

  /*<span id='method-fm.websync.messageTransfer-send'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends messages synchronously.
  	 </div>
  	@function send
  	@param {fm.websync.messageRequestArgs} requestArgs The message parameters.
  	@return {fm.websync.messageResponseArgs} The resulting response.
  */


  messageTransfer.prototype.send = function() {
    var args, args2, requestArgs;
    requestArgs = arguments[0];
    fm.websync.messageTransfer.raiseRequestCreated(requestArgs);
    try {
      args = this.sendMessages(requestArgs);
      fm.websync.messageTransfer.raiseResponseReceived(args);
    } catch (exception) {
      args2 = new fm.websync.messageResponseArgs(requestArgs);
      args2.setException(exception);
      args = args2;
    } finally {

    }
    return args;
  };

  /*<span id='method-fm.websync.messageTransfer-sendAsync'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends messages asynchronously.
  	 </div>
  	@function sendAsync
  	@param {fm.websync.messageRequestArgs} requestArgs The message parameters.
  	@param {fm.singleAction} callback The callback to execute with the resulting response.
  	@return {void}
  */


  messageTransfer.prototype.sendAsync = function() {
    var callback, p, requestArgs;
    requestArgs = arguments[0];
    callback = arguments[1];
    fm.websync.messageTransfer.raiseRequestCreated(requestArgs);
    requestArgs.setDynamicValue(this._messageTransferCallbackKey, callback);
    try {
      return this.sendMessagesAsync(requestArgs, this.sendAsyncCallback);
    } catch (exception) {
      p = new fm.websync.messageResponseArgs(requestArgs);
      p.setException(exception);
      return callback(p);
    } finally {

    }
  };

  messageTransfer.prototype.sendAsyncCallback = function() {
    var dynamicValue, responseArgs;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getRequestArgs().getDynamicValue(this._messageTransferCallbackKey);
    fm.websync.messageTransfer.raiseResponseReceived(responseArgs);
    return dynamicValue(responseArgs);
  };

  /*<span id='method-fm.websync.messageTransfer-sendMessages'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends a request synchronously.
  	 </div>
  	@function sendMessages
  	@param {fm.websync.messageRequestArgs} requestArgs The request parameters.
  	@return {fm.websync.messageResponseArgs} The response parameters.
  */


  messageTransfer.prototype.sendMessages = function() {
    var requestArgs;
    return requestArgs = arguments[0];
  };

  /*<span id='method-fm.websync.messageTransfer-sendMessagesAsync'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends a request asynchronously.
  	 </div>
  	@function sendMessagesAsync
  	@param {fm.websync.messageRequestArgs} requestArgs The request parameters.
  	@param {fm.singleAction} callback The callback to execute with the response parameters.
  	@return {void}
  */


  messageTransfer.prototype.sendMessagesAsync = function() {
    var callback, requestArgs;
    requestArgs = arguments[0];
    return callback = arguments[1];
  };

  /*<span id='method-fm.websync.messageTransfer-shutdown'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Releases any resources and shuts down.
  	 </div>
  
  	@function shutdown
  	@return {void}
  */


  messageTransfer.prototype.shutdown = function() {};

  return messageTransfer;

}).call(this, fm.object);


/*<span id='cls-fm.websync.socketMessageTransfer'>&nbsp;</span>
*/

/**
@class fm.websync.socketMessageTransfer
 <div>
 Base class that defines methods for transferring messages over HTTP.
 </div>

@extends fm.websync.messageTransfer
*/


fm.websync.socketMessageTransfer = (function(_super) {

  __extends(socketMessageTransfer, _super);

  socketMessageTransfer.prototype._handshakeTimeout = 0;

  socketMessageTransfer.prototype._onOpenFailure = null;

  socketMessageTransfer.prototype._onOpenSuccess = null;

  socketMessageTransfer.prototype._onRequestCreated = null;

  socketMessageTransfer.prototype._onResponseReceived = null;

  socketMessageTransfer.prototype._onStreamFailure = null;

  socketMessageTransfer.prototype._sender = null;

  socketMessageTransfer.prototype._streamTimeout = 0;

  function socketMessageTransfer() {
    this.setStreamTimeout = __bind(this.setStreamTimeout, this);

    this.setSender = __bind(this.setSender, this);

    this.setOnStreamFailure = __bind(this.setOnStreamFailure, this);

    this.setOnResponseReceived = __bind(this.setOnResponseReceived, this);

    this.setOnRequestCreated = __bind(this.setOnRequestCreated, this);

    this.setOnOpenSuccess = __bind(this.setOnOpenSuccess, this);

    this.setOnOpenFailure = __bind(this.setOnOpenFailure, this);

    this.setHandshakeTimeout = __bind(this.setHandshakeTimeout, this);

    this.open = __bind(this.open, this);

    this.getStreamTimeout = __bind(this.getStreamTimeout, this);

    this.getSender = __bind(this.getSender, this);

    this.getOnStreamFailure = __bind(this.getOnStreamFailure, this);

    this.getOnResponseReceived = __bind(this.getOnResponseReceived, this);

    this.getOnRequestCreated = __bind(this.getOnRequestCreated, this);

    this.getOnOpenSuccess = __bind(this.getOnOpenSuccess, this);

    this.getOnOpenFailure = __bind(this.getOnOpenFailure, this);

    this.getHandshakeTimeout = __bind(this.getHandshakeTimeout, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      socketMessageTransfer.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    socketMessageTransfer.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.socketMessageTransfer-getHandshakeTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the timeout for the initial handshake.
  	 </div>
  
  	@function getHandshakeTimeout
  	@return {Integer}
  */


  socketMessageTransfer.prototype.getHandshakeTimeout = function() {
    return this._handshakeTimeout;
  };

  /*<span id='method-fm.websync.socketMessageTransfer-getOnOpenFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the handshake fails.
  	 </div>
  
  	@function getOnOpenFailure
  	@return {fm.singleAction}
  */


  socketMessageTransfer.prototype.getOnOpenFailure = function() {
    return this._onOpenFailure;
  };

  /*<span id='method-fm.websync.socketMessageTransfer-getOnOpenSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the handshake succeeds.
  	 </div>
  
  	@function getOnOpenSuccess
  	@return {fm.singleAction}
  */


  socketMessageTransfer.prototype.getOnOpenSuccess = function() {
    return this._onOpenSuccess;
  };

  /*<span id='method-fm.websync.socketMessageTransfer-getOnRequestCreated'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke when the handshake request is created.
  	 </div>
  
  	@function getOnRequestCreated
  	@return {fm.singleAction}
  */


  socketMessageTransfer.prototype.getOnRequestCreated = function() {
    return this._onRequestCreated;
  };

  /*<span id='method-fm.websync.socketMessageTransfer-getOnResponseReceived'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke when the handshake response is received.
  	 </div>
  
  	@function getOnResponseReceived
  	@return {fm.singleAction}
  */


  socketMessageTransfer.prototype.getOnResponseReceived = function() {
    return this._onResponseReceived;
  };

  /*<span id='method-fm.websync.socketMessageTransfer-getOnStreamFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke if the stream errors out.
  	 </div>
  
  	@function getOnStreamFailure
  	@return {fm.singleAction}
  */


  socketMessageTransfer.prototype.getOnStreamFailure = function() {
    return this._onStreamFailure;
  };

  /*<span id='method-fm.websync.socketMessageTransfer-getSender'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the sender of the messages.
  	 </div>
  
  	@function getSender
  	@return {fm.object}
  */


  socketMessageTransfer.prototype.getSender = function() {
    return this._sender;
  };

  /*<span id='method-fm.websync.socketMessageTransfer-getStreamTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the timeout for the stream.
  	 </div>
  
  	@function getStreamTimeout
  	@return {Integer}
  */


  socketMessageTransfer.prototype.getStreamTimeout = function() {
    return this._streamTimeout;
  };

  /*<span id='method-fm.websync.socketMessageTransfer-open'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Opens the socket.
  	 </div>
  	@function open
  	@param {fm.nameValueCollection} headers The headers to pass in with the initial handshake.
  	@return {void}
  */


  socketMessageTransfer.prototype.open = function() {
    var headers;
    return headers = arguments[0];
  };

  /*<span id='method-fm.websync.socketMessageTransfer-setHandshakeTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the timeout for the initial handshake.
  	 </div>
  
  	@function setHandshakeTimeout
  	@param {Integer} value
  	@return {void}
  */


  socketMessageTransfer.prototype.setHandshakeTimeout = function() {
    var value;
    value = arguments[0];
    return this._handshakeTimeout = value;
  };

  /*<span id='method-fm.websync.socketMessageTransfer-setOnOpenFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the handshake fails.
  	 </div>
  
  	@function setOnOpenFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  socketMessageTransfer.prototype.setOnOpenFailure = function() {
    var value;
    value = arguments[0];
    return this._onOpenFailure = value;
  };

  /*<span id='method-fm.websync.socketMessageTransfer-setOnOpenSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the handshake succeeds.
  	 </div>
  
  	@function setOnOpenSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  socketMessageTransfer.prototype.setOnOpenSuccess = function() {
    var value;
    value = arguments[0];
    return this._onOpenSuccess = value;
  };

  /*<span id='method-fm.websync.socketMessageTransfer-setOnRequestCreated'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke when the handshake request is created.
  	 </div>
  
  	@function setOnRequestCreated
  	@param {fm.singleAction} value
  	@return {void}
  */


  socketMessageTransfer.prototype.setOnRequestCreated = function() {
    var value;
    value = arguments[0];
    return this._onRequestCreated = value;
  };

  /*<span id='method-fm.websync.socketMessageTransfer-setOnResponseReceived'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke when the handshake response is received.
  	 </div>
  
  	@function setOnResponseReceived
  	@param {fm.singleAction} value
  	@return {void}
  */


  socketMessageTransfer.prototype.setOnResponseReceived = function() {
    var value;
    value = arguments[0];
    return this._onResponseReceived = value;
  };

  /*<span id='method-fm.websync.socketMessageTransfer-setOnStreamFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke if the stream errors out.
  	 </div>
  
  	@function setOnStreamFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  socketMessageTransfer.prototype.setOnStreamFailure = function() {
    var value;
    value = arguments[0];
    return this._onStreamFailure = value;
  };

  /*<span id='method-fm.websync.socketMessageTransfer-setSender'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the sender of the messages.
  	 </div>
  
  	@function setSender
  	@param {fm.object} value
  	@return {void}
  */


  socketMessageTransfer.prototype.setSender = function() {
    var value;
    value = arguments[0];
    return this._sender = value;
  };

  /*<span id='method-fm.websync.socketMessageTransfer-setStreamTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the timeout for the stream.
  	 </div>
  
  	@function setStreamTimeout
  	@param {Integer} value
  	@return {void}
  */


  socketMessageTransfer.prototype.setStreamTimeout = function() {
    var value;
    value = arguments[0];
    return this._streamTimeout = value;
  };

  return socketMessageTransfer;

})(fm.websync.messageTransfer);


/*<span id='cls-fm.websync.messageTransferFactory'>&nbsp;</span>
*/

/**
@class fm.websync.messageTransferFactory
 <div>
 Creates implementations of <see cref="fm.websync.messageTransfer">fm.websync.messageTransfer</see>.
 </div>

@extends fm.object
*/


fm.websync.messageTransferFactory = (function(_super) {

  __extends(messageTransferFactory, _super);

  messageTransferFactory._createHttpMessageTransfer = null;

  messageTransferFactory._createWebSocketMessageTransfer = null;

  function messageTransferFactory() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      messageTransferFactory.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    messageTransferFactory.__super__.constructor.call(this);
  }

  messageTransferFactory.defaultCreateHttpMessageTransfer = function() {
    return new fm.websync.httpWebRequestTransfer();
  };

  messageTransferFactory.defaultCreateWebSocketMessageTransfer = function() {
    var requestUrl;
    requestUrl = arguments[0];
    return new fm.websync.webSocketTransfer(requestUrl);
  };

  /*<span id='method-fm.websync.messageTransferFactory-getCreateHttpMessageTransfer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback that creates an HTTP-based message transfer class.
  	 </div>
  
  	@function getCreateHttpMessageTransfer
  	@return {fm.emptyFunction}
  */


  messageTransferFactory.getCreateHttpMessageTransfer = function() {
    return fm.websync.messageTransferFactory._createHttpMessageTransfer;
  };

  /*<span id='method-fm.websync.messageTransferFactory-getCreateWebSocketMessageTransfer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback that creates a WebSocket-based message transfer class.
  	 </div>
  
  	@function getCreateWebSocketMessageTransfer
  	@return {fm.singleFunction}
  */


  messageTransferFactory.getCreateWebSocketMessageTransfer = function() {
    return fm.websync.messageTransferFactory._createWebSocketMessageTransfer;
  };

  /*<span id='method-fm.websync.messageTransferFactory-getHttpMessageTransfer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets an instance of the HTTP-based message transfer class.
  	 </div>
  	@function getHttpMessageTransfer
  	@return {fm.websync.messageTransfer}
  */


  messageTransferFactory.getHttpMessageTransfer = function() {
    var transfer, _var0, _var1;
    _var0 = fm.websync.messageTransferFactory.getCreateHttpMessageTransfer();
    if (_var0 === null || typeof _var0 === 'undefined') {
      messageTransferFactory.setCreateHttpMessageTransfer(messageTransferFactory.defaultCreateHttpMessageTransfer);
    }
    transfer = fm.websync.messageTransferFactory.getCreateHttpMessageTransfer()();
    _var1 = transfer;
    if (_var1 === null || typeof _var1 === 'undefined') {
      transfer = fm.websync.messageTransferFactory.defaultCreateHttpMessageTransfer();
    }
    return transfer;
  };

  /*<span id='method-fm.websync.messageTransferFactory-getWebSocketMessageTransfer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets an instance of the WebSocket-based message transfer class.
  	 </div>
  	@function getWebSocketMessageTransfer
  	@param {String} requestUrl
  	@return {fm.websync.socketMessageTransfer}
  */


  messageTransferFactory.getWebSocketMessageTransfer = function() {
    var requestUrl, transfer, _var0, _var1;
    requestUrl = arguments[0];
    _var0 = fm.websync.messageTransferFactory.getCreateWebSocketMessageTransfer();
    if (_var0 === null || typeof _var0 === 'undefined') {
      messageTransferFactory.setCreateWebSocketMessageTransfer(messageTransferFactory.defaultCreateWebSocketMessageTransfer);
    }
    transfer = fm.websync.messageTransferFactory.getCreateWebSocketMessageTransfer()(requestUrl);
    _var1 = transfer;
    if (_var1 === null || typeof _var1 === 'undefined') {
      transfer = fm.websync.messageTransferFactory.defaultCreateWebSocketMessageTransfer(requestUrl);
    }
    return transfer;
  };

  /*<span id='method-fm.websync.messageTransferFactory-setCreateHttpMessageTransfer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback that creates an HTTP-based message transfer class.
  	 </div>
  
  	@function setCreateHttpMessageTransfer
  	@param {fm.emptyFunction} value
  	@return {void}
  */


  messageTransferFactory.setCreateHttpMessageTransfer = function() {
    var value;
    value = arguments[0];
    return messageTransferFactory._createHttpMessageTransfer = value;
  };

  /*<span id='method-fm.websync.messageTransferFactory-setCreateWebSocketMessageTransfer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback that creates a WebSocket-based message transfer class.
  	 </div>
  
  	@function setCreateWebSocketMessageTransfer
  	@param {fm.singleFunction} value
  	@return {void}
  */


  messageTransferFactory.setCreateWebSocketMessageTransfer = function() {
    var value;
    value = arguments[0];
    return messageTransferFactory._createWebSocketMessageTransfer = value;
  };

  return messageTransferFactory;

}).call(this, fm.object);


/*<span id='cls-fm.websync.webSocketCloseArgs'>&nbsp;</span>
*/

/**
@class fm.websync.webSocketCloseArgs
 <div>
 Close arguments for the <see cref="fm.websync.webSocket">fm.websync.webSocket</see> class.
 </div>

@extends fm.dynamic
*/


fm.websync.webSocketCloseArgs = (function(_super) {

  __extends(webSocketCloseArgs, _super);

  webSocketCloseArgs.prototype._onComplete = null;

  webSocketCloseArgs.prototype._reason = null;

  webSocketCloseArgs.prototype._statusCode = null;

  /*<span id='method-fm.websync.webSocketCloseArgs-fm.websync.webSocketCloseArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Creates a new instance of <see cref="fm.websync.webSocketCloseArgs">fm.websync.webSocketCloseArgs</see>
  	 with default values.
  	 </div>
  
  	@function fm.websync.webSocketCloseArgs
  	@return {}
  */


  function webSocketCloseArgs() {
    this.setStatusCode = __bind(this.setStatusCode, this);

    this.setReason = __bind(this.setReason, this);

    this.setOnComplete = __bind(this.setOnComplete, this);

    this.getStatusCode = __bind(this.getStatusCode, this);

    this.getReason = __bind(this.getReason, this);

    this.getOnComplete = __bind(this.getOnComplete, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      webSocketCloseArgs.__super__.constructor.call(this);
      this.setStatusCode(fm.websync.webSocketStatusCode.Normal);
      this.setReason(fm.stringExtensions.empty);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    webSocketCloseArgs.__super__.constructor.call(this);
    this.setStatusCode(fm.websync.webSocketStatusCode.Normal);
    this.setReason(fm.stringExtensions.empty);
  }

  /*<span id='method-fm.websync.webSocketCloseArgs-getOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to execute when the connection is closed.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
  */


  webSocketCloseArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };

  /*<span id='method-fm.websync.webSocketCloseArgs-getReason'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the reason to send with the close frame.
  	 </div>
  
  	@function getReason
  	@return {String}
  */


  webSocketCloseArgs.prototype.getReason = function() {
    return this._reason;
  };

  /*<span id='method-fm.websync.webSocketCloseArgs-getStatusCode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the status code to send with the close frame.
  	 </div>
  
  	@function getStatusCode
  	@return {fm.websync.webSocketStatusCode}
  */


  webSocketCloseArgs.prototype.getStatusCode = function() {
    return this._statusCode;
  };

  /*<span id='method-fm.websync.webSocketCloseArgs-setOnComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to execute when the connection is closed.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  webSocketCloseArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };

  /*<span id='method-fm.websync.webSocketCloseArgs-setReason'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the reason to send with the close frame.
  	 </div>
  
  	@function setReason
  	@param {String} value
  	@return {void}
  */


  webSocketCloseArgs.prototype.setReason = function() {
    var value;
    value = arguments[0];
    return this._reason = value;
  };

  /*<span id='method-fm.websync.webSocketCloseArgs-setStatusCode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the status code to send with the close frame.
  	 </div>
  
  	@function setStatusCode
  	@param {fm.websync.webSocketStatusCode} value
  	@return {void}
  */


  webSocketCloseArgs.prototype.setStatusCode = function() {
    var value;
    value = arguments[0];
    return this._statusCode = value;
  };

  return webSocketCloseArgs;

})(fm.dynamic);


/*<span id='cls-fm.websync.webSocketCloseCompleteArgs'>&nbsp;</span>
*/

/**
@class fm.websync.webSocketCloseCompleteArgs
 <div>
 Arguments for <see cref="fm.websync.webSocketCloseArgs.onComplete">fm.websync.webSocketCloseArgs.onComplete</see>.
 </div>

@extends fm.dynamic
*/


fm.websync.webSocketCloseCompleteArgs = (function(_super) {

  __extends(webSocketCloseCompleteArgs, _super);

  webSocketCloseCompleteArgs.prototype._reason = null;

  webSocketCloseCompleteArgs.prototype._statusCode = null;

  function webSocketCloseCompleteArgs() {
    this.setStatusCode = __bind(this.setStatusCode, this);

    this.setReason = __bind(this.setReason, this);

    this.getStatusCode = __bind(this.getStatusCode, this);

    this.getReason = __bind(this.getReason, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      webSocketCloseCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    webSocketCloseCompleteArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.webSocketCloseCompleteArgs-getReason'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the reason given for closing the connection.
  	 </div>
  
  	@function getReason
  	@return {String}
  */


  webSocketCloseCompleteArgs.prototype.getReason = function() {
    return this._reason;
  };

  /*<span id='method-fm.websync.webSocketCloseCompleteArgs-getStatusCode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the status code associated with the close operation.
  	 </div>
  
  	@function getStatusCode
  	@return {fm.websync.webSocketStatusCode}
  */


  webSocketCloseCompleteArgs.prototype.getStatusCode = function() {
    return this._statusCode;
  };

  /*<span id='method-fm.websync.webSocketCloseCompleteArgs-setReason'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the reason given for closing the connection.
  	 </div>
  
  	@function setReason
  	@param {String} value
  	@return {void}
  */


  webSocketCloseCompleteArgs.prototype.setReason = function() {
    var value;
    value = arguments[0];
    return this._reason = value;
  };

  /*<span id='method-fm.websync.webSocketCloseCompleteArgs-setStatusCode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the status code associated with the close operation.
  	 </div>
  
  	@function setStatusCode
  	@param {fm.websync.webSocketStatusCode} value
  	@return {void}
  */


  webSocketCloseCompleteArgs.prototype.setStatusCode = function() {
    var value;
    value = arguments[0];
    return this._statusCode = value;
  };

  return webSocketCloseCompleteArgs;

})(fm.dynamic);




fm.websync.webSocketSendState = (function(_super) {

  __extends(webSocketSendState, _super);

  webSocketSendState.prototype._requestBytes = null;

  webSocketSendState.prototype._sendArgs = null;

  function webSocketSendState() {
    this.setSendArgs = __bind(this.setSendArgs, this);

    this.setRequestBytes = __bind(this.setRequestBytes, this);

    this.getSendArgs = __bind(this.getSendArgs, this);

    this.getRequestBytes = __bind(this.getRequestBytes, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      webSocketSendState.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    webSocketSendState.__super__.constructor.call(this);
  }

  webSocketSendState.prototype.getRequestBytes = function() {
    return this._requestBytes;
  };

  webSocketSendState.prototype.getSendArgs = function() {
    return this._sendArgs;
  };

  webSocketSendState.prototype.setRequestBytes = function() {
    var value;
    value = arguments[0];
    return this._requestBytes = value;
  };

  webSocketSendState.prototype.setSendArgs = function() {
    var value;
    value = arguments[0];
    return this._sendArgs = value;
  };

  return webSocketSendState;

})(fm.object);


/*<span id='cls-fm.websync.httpWebRequestTransfer'>&nbsp;</span>
*/

/**
@class fm.websync.httpWebRequestTransfer
 <div>
 Defines methods for transferring messages using an instance of <see cref="fm.httpWebRequestTransfer">fm.httpWebRequestTransfer</see>.
 </div>

@extends fm.websync.messageTransfer
*/


fm.websync.httpWebRequestTransfer = (function(_super) {

  __extends(httpWebRequestTransfer, _super);

  httpWebRequestTransfer.prototype._callbackKey = null;

  httpWebRequestTransfer.prototype._httpTransfer = null;

  httpWebRequestTransfer.prototype._requestArgsKey = null;

  function httpWebRequestTransfer() {
    this.shutdown = __bind(this.shutdown, this);

    this.sendMessagesAsyncCallback = __bind(this.sendMessagesAsyncCallback, this);

    this.sendMessagesAsync = __bind(this.sendMessagesAsync, this);

    this.sendMessages = __bind(this.sendMessages, this);

    this.messageToHttpRequest = __bind(this.messageToHttpRequest, this);

    this.httpToMessageResponse = __bind(this.httpToMessageResponse, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      httpWebRequestTransfer.__super__.constructor.call(this);
      this._httpTransfer = fm.httpTransferFactory.getHttpTransfer();
      this._callbackKey = "fm.websync.httpWebRequestTransfer.callback";
      this._requestArgsKey = "fm.websync.httpWebRequestTransfer.requestArgs";
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    httpWebRequestTransfer.__super__.constructor.call(this);
    this._httpTransfer = fm.httpTransferFactory.getHttpTransfer();
    this._callbackKey = "fm.websync.httpWebRequestTransfer.callback";
    this._requestArgsKey = "fm.websync.httpWebRequestTransfer.requestArgs";
  }

  httpWebRequestTransfer.prototype.httpToMessageResponse = function() {
    var args2, args3, dynamicValue, httpResponseArgs, _var0;
    httpResponseArgs = arguments[0];
    dynamicValue = httpResponseArgs.getRequestArgs().getDynamicValue(this._requestArgsKey);
    args3 = new fm.websync.messageResponseArgs(dynamicValue);
    args3.setException(httpResponseArgs.getException());
    args3.setHeaders(httpResponseArgs.getHeaders());
    args2 = args3;
    if (!fm.stringExtensions.isNullOrEmpty(httpResponseArgs.getTextContent())) {
      args2.setMessages(fm.websync.message.fromJsonMultiple(httpResponseArgs.getTextContent()));
      return args2;
    }
    _var0 = httpResponseArgs.getBinaryContent();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      args2.setMessages(fm.websync.message.fromBinaryMultiple(httpResponseArgs.getBinaryContent()));
    }
    return args2;
  };

  httpWebRequestTransfer.prototype.messageToHttpRequest = function() {
    var args, args2, requestArgs, str, _i, _len, _var0;
    requestArgs = arguments[0];
    args2 = new fm.httpRequestArgs();
    args2.setMethod(fm.httpMethod.Post);
    args2.setOnRequestCreated(requestArgs.getOnHttpRequestCreated());
    args2.setOnResponseReceived(requestArgs.getOnHttpResponseReceived());
    args2.setSender(requestArgs.getSender());
    args2.setTimeout(requestArgs.getTimeout());
    args2.setUrl(requestArgs.getUrl());
    args2.setDynamicProperties(requestArgs.getDynamicProperties());
    args = args2;
    args.setDynamicValue(this._requestArgsKey, requestArgs);
    _var0 = requestArgs.getHeaders().getAllKeys();
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      str = _var0[_i];
      args.getHeaders().set(str, requestArgs.getHeaders().get(str));
    }
    args.setTextContent(fm.websync.message.toJsonMultiple(requestArgs.getMessages()));
    args.getHeaders().set("Content-Type", "application/json");
    if (requestArgs.getIsBinary()) {
      args.setBinaryContent(fm.websync.message.toBinaryMultiple(requestArgs.getMessages()));
      args.getHeaders().set("Content-Type", "application/octet-stream");
    }
    return args;
  };

  /*<span id='method-fm.websync.httpWebRequestTransfer-sendMessages'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends a request synchronously.
  	 </div>
  	@function sendMessages
  	@param {fm.websync.messageRequestArgs} requestArgs The request parameters.
  	@return {fm.websync.messageResponseArgs} The response parameters.
  */


  httpWebRequestTransfer.prototype.sendMessages = function() {
    var args, httpResponseArgs, requestArgs;
    requestArgs = arguments[0];
    args = this.messageToHttpRequest(requestArgs);
    httpResponseArgs = this._httpTransfer.send(args);
    return this.httpToMessageResponse(httpResponseArgs);
  };

  /*<span id='method-fm.websync.httpWebRequestTransfer-sendMessagesAsync'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends a request asynchronously.
  	 </div>
  	@function sendMessagesAsync
  	@param {fm.websync.messageRequestArgs} requestArgs The request parameters.
  	@param {fm.singleAction} callback The callback to execute with the resulting response.
  	@return {void}
  */


  httpWebRequestTransfer.prototype.sendMessagesAsync = function() {
    var args, callback, requestArgs;
    requestArgs = arguments[0];
    callback = arguments[1];
    args = this.messageToHttpRequest(requestArgs);
    args.setDynamicValue(this._callbackKey, callback);
    return this._httpTransfer.sendAsync(args, this.sendMessagesAsyncCallback);
  };

  httpWebRequestTransfer.prototype.sendMessagesAsyncCallback = function() {
    var dynamicValue, httpResponseArgs;
    httpResponseArgs = arguments[0];
    dynamicValue = httpResponseArgs.getRequestArgs().getDynamicValue(this._callbackKey);
    return dynamicValue(this.httpToMessageResponse(httpResponseArgs));
  };

  /*<span id='method-fm.websync.httpWebRequestTransfer-shutdown'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Releases any resources and shuts down.
  	 </div>
  
  	@function shutdown
  	@return {void}
  */


  httpWebRequestTransfer.prototype.shutdown = function() {
    try {
      return this._httpTransfer.shutdown();
    } catch (exception1) {

    } finally {

    }
  };

  return httpWebRequestTransfer;

})(fm.websync.messageTransfer);


/*<span id='cls-fm.websync.notifyingClient'>&nbsp;</span>
*/

/**
@class fm.websync.notifyingClient
 <div>
 Details about the client sending the notification data.
 </div>

@extends fm.serializable
*/


fm.websync.notifyingClient = (function(_super) {

  __extends(notifyingClient, _super);

  notifyingClient.prototype._boundRecords = null;

  notifyingClient.prototype._clientId = null;

  /*<span id='method-fm.websync.notifyingClient-fm.websync.notifyingClient'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.notifyingClient">fm.websync.notifyingClient</see> class.
  	 </div>
  	@function fm.websync.notifyingClient
  	@param {fm.nullable} clientId The notifying client's ID.
  	@param {Object} boundRecords The records bound to the client.
  	@return {}
  */


  function notifyingClient() {
    this.getBoundRecordValue = __bind(this.getBoundRecordValue, this);

    this.toJson = __bind(this.toJson, this);

    this.setClientId = __bind(this.setClientId, this);

    this.setBoundRecords = __bind(this.setBoundRecords, this);

    this.getClientId = __bind(this.getClientId, this);

    this.getBoundRecordValueJson = __bind(this.getBoundRecordValueJson, this);

    this.getBoundRecords = __bind(this.getBoundRecords, this);

    var boundRecords, clientId;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      notifyingClient.__super__.constructor.call(this);
      this.setBoundRecords({});
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 2) {
      clientId = arguments[0];
      boundRecords = arguments[1];
      notifyingClient.__super__.constructor.call(this);
      this.setClientId(clientId);
      this.setBoundRecords(boundRecords);
      return;
    }
    if (arguments.length === 0) {
      notifyingClient.__super__.constructor.call(this);
      this.setBoundRecords({});
      return;
    }
  }

  /*<span id='method-fm.websync.notifyingClient-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a JSON-formatted notifying client.
  	 </div>
  	@function fromJson
  	@param {String} notifyingClientJson The JSON-formatted notifying client to deserialize.
  	@return {fm.websync.notifyingClient} The notifying client.
  */


  notifyingClient.fromJson = function() {
    var notifyingClientJson;
    notifyingClientJson = arguments[0];
    return fm.websync.serializer.deserializeNotifyingClient(notifyingClientJson);
  };

  /*<span id='method-fm.websync.notifyingClient-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a notifying client to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.notifyingClient} notifyingClient The notifying client to serialize.
  	@return {String} The JSON-formatted notifying client.
  */


  notifyingClient.toJson = function() {
    var notifyingClient;
    notifyingClient = arguments[0];
    return fm.websync.serializer.serializeNotifyingClient(notifyingClient);
  };

  /*<span id='method-fm.websync.notifyingClient-getBoundRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the notifying client's bound records.
  	 </div>
  
  	@function getBoundRecords
  	@return {Object}
  */


  notifyingClient.prototype.getBoundRecords = function() {
    return this._boundRecords;
  };

  /*<span id='method-fm.websync.notifyingClient-getBoundRecordValueJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the JSON value of a record bound to the notifying client.
  	 </div>
  	@function getBoundRecordValueJson
  	@param {String} key The record key.
  	@return {String} The JSON value of the record, if it exists, or null.
  */


  notifyingClient.prototype.getBoundRecordValueJson = function() {
    var key, record, _var0, _var1, _var2;
    key = arguments[0];
    _var0 = this.getBoundRecords();
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    record = null;
    _var1 = new fm.holder(record);
    _var2 = fm.hashExtensions.tryGetValue(this.getBoundRecords(), key, _var1);
    record = _var1.getValue();
    if (!_var2) {
      return null;
    }
    return record.getValueJson();
  };

  /*<span id='method-fm.websync.notifyingClient-getClientId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the notifying client's ID.
  	 </div>
  
  	@function getClientId
  	@return {fm.nullable}
  */


  notifyingClient.prototype.getClientId = function() {
    return this._clientId;
  };

  /*<span id='method-fm.websync.notifyingClient-setBoundRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the notifying client's bound records.
  	 </div>
  
  	@function setBoundRecords
  	@param {Object} value
  	@return {void}
  */


  notifyingClient.prototype.setBoundRecords = function() {
    var value;
    value = arguments[0];
    return this._boundRecords = value;
  };

  /*<span id='method-fm.websync.notifyingClient-setClientId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the notifying client's ID.
  	 </div>
  
  	@function setClientId
  	@param {fm.nullable} value
  	@return {void}
  */


  notifyingClient.prototype.setClientId = function() {
    var value;
    value = arguments[0];
    return this._clientId = value;
  };

  /*<span id='method-fm.websync.notifyingClient-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String} The JSON-formatted notifying client.
  */


  notifyingClient.prototype.toJson = function() {
    return fm.websync.notifyingClient.toJson(this);
  };

  notifyingClient.prototype.getBoundRecordValue = function() {
    var key;
    key = arguments[0];
    return fm.json.deserialize(this.getBoundRecordValueJson.apply(this, arguments));
  };

  return notifyingClient;

}).call(this, fm.serializable);


/*<span id='cls-fm.websync.baseMessage'>&nbsp;</span>
*/

/**
@class fm.websync.baseMessage
 <div>
 Base class for WebSync client/publisher messages.
 </div>

@extends fm.websync.extensible
*/


fm.websync.baseMessage = (function(_super) {

  __extends(baseMessage, _super);

  baseMessage.prototype.__dataBytes = null;

  baseMessage.prototype.__dataJson = null;

  baseMessage.prototype.__error = null;

  baseMessage.prototype.__successful = false;

  baseMessage.prototype.__timestamp = null;

  baseMessage.prototype._validate = false;

  /*<span id='method-fm.websync.baseMessage-fm.websync.baseMessage'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.baseMessage">fm.websync.baseMessage</see> class.
  	 </div>
  
  	@function fm.websync.baseMessage
  	@return {}
  */


  function baseMessage() {
    this.setData = __bind(this.setData, this);

    this.getData = __bind(this.getData, this);

    this.setValidate = __bind(this.setValidate, this);

    this.setTimestamp = __bind(this.setTimestamp, this);

    this.setSuccessful = __bind(this.setSuccessful, this);

    this.setError = __bind(this.setError, this);

    this.setDataJson = __bind(this.setDataJson, this);

    this.setDataBytes = __bind(this.setDataBytes, this);

    this.getValidate = __bind(this.getValidate, this);

    this.getTimestamp = __bind(this.getTimestamp, this);

    this.getSuccessful = __bind(this.getSuccessful, this);

    this.getIsBinary = __bind(this.getIsBinary, this);

    this.getError = __bind(this.getError, this);

    this.getDataJson = __bind(this.getDataJson, this);

    this.getDataBytes = __bind(this.getDataBytes, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseMessage.__super__.constructor.call(this);
      this.setValidate(true);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    baseMessage.__super__.constructor.call(this);
    this.setValidate(true);
  }

  /*<span id='method-fm.websync.baseMessage-getDataBytes'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data payload
  	 in binary format. (Overrides <see cref="fm.websync.baseMessage.dataJson">fm.websync.baseMessage.dataJson</see>.)
  	 </div>
  
  	@function getDataBytes
  	@return {fm.array}
  */


  baseMessage.prototype.getDataBytes = function() {
    var decoded, valueJson, _var0, _var1, _var2, _var3;
    decoded = this.__dataBytes;
    valueJson = this.__dataJson;
    _var0 = decoded;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return decoded;
    }
    _var1 = valueJson;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      _var2 = new fm.holder(decoded);
      _var3 = fm.websync.crypto.tryBase64Decode(fm.serializer.deserializeString(valueJson), _var2);
      decoded = _var2.getValue();
      _var3;

      this.__dataBytes = decoded;
      return decoded;
    }
    return null;
  };

  /*<span id='method-fm.websync.baseMessage-getDataJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the data payload
  	 in JSON format. (Overrides <see cref="fm.websync.baseMessage.dataBytes">fm.websync.baseMessage.dataBytes</see>.)
  	 </div>
  
  	@function getDataJson
  	@return {String}
  */


  baseMessage.prototype.getDataJson = function() {
    var b, str, _var0, _var1;
    str = this.__dataJson;
    b = this.__dataBytes;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return str;
    }
    _var1 = b;
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      str = fm.serializer.serializeString(fm.websync.crypto.base64Encode(b));
      this.__dataJson = str;
      return str;
    }
    return null;
  };

  /*<span id='method-fm.websync.baseMessage-getError'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the friendly error message if <see cref="fm.websync.baseMessage.successful">fm.websync.baseMessage.successful</see> is
  	 <c>false</c>.
  	 </div>
  
  	@function getError
  	@return {String}
  */


  baseMessage.prototype.getError = function() {
    return this.__error;
  };

  /*<span id='method-fm.websync.baseMessage-getIsBinary'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether or not the data is binary.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
  */


  baseMessage.prototype.getIsBinary = function() {
    var _var0;
    _var0 = this.getDataBytes();
    return _var0 !== null && typeof _var0 !== 'undefined';
  };

  /*<span id='method-fm.websync.baseMessage-getSuccessful'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the flag that indicates whether the request should be
  	 processed. If the message represents a response, this indicates whether the
  	 processing was successful. If set to <c>false</c>, the <see cref="fm.websync.baseMessage.error">fm.websync.baseMessage.error</see>
  	 property should be set to a friendly error message.
  	 </div>
  
  	@function getSuccessful
  	@return {Boolean}
  */


  baseMessage.prototype.getSuccessful = function() {
    return this.__successful;
  };

  /*<span id='method-fm.websync.baseMessage-getTimestamp'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the date/time the message was processed on the server (in UTC/GMT).
  	 </div>
  
  	@function getTimestamp
  	@return {fm.nullable}
  */


  baseMessage.prototype.getTimestamp = function() {
    return this.__timestamp;
  };

  /*<span id='method-fm.websync.baseMessage-getValidate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether to skip validation while deserializing, used internally.
  	 </div>
  
  	@function getValidate
  	@return {Boolean}
  */


  baseMessage.prototype.getValidate = function() {
    return this._validate;
  };

  /*<span id='method-fm.websync.baseMessage-setDataBytes'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the data payload
  	 in binary format. (Overrides <see cref="fm.websync.baseMessage.dataJson">fm.websync.baseMessage.dataJson</see>.)
  	 </div>
  
  	@function setDataBytes
  	@param {fm.array} value
  	@return {void}
  */


  baseMessage.prototype.setDataBytes = function() {
    var value;
    value = arguments[0];
    this.__dataJson = null;
    this.__dataBytes = value;
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.baseMessage-setDataJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the data payload
  	 in JSON format. (Overrides <see cref="fm.websync.baseMessage.dataBytes">fm.websync.baseMessage.dataBytes</see>.)
  	 </div>
  
  	@function setDataJson
  	@param {String} value
  	@return {void}
  */


  baseMessage.prototype.setDataJson = function() {
    var value, _var0;
    value = arguments[0];
    _var0 = value;
    if (!((!this.getValidate() || (_var0 === null || typeof _var0 === 'undefined')) || fm.serializer.isValidJson(value))) {
      throw new Error("The value is not valid JSON.");
    }
    this.__dataJson = value;
    this.__dataBytes = null;
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.baseMessage-setError'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the friendly error message if <see cref="fm.websync.baseMessage.successful">fm.websync.baseMessage.successful</see> is
  	 <c>false</c>.
  	 </div>
  
  	@function setError
  	@param {String} value
  	@return {void}
  */


  baseMessage.prototype.setError = function() {
    var value;
    value = arguments[0];
    this.__error = value;
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.baseMessage-setSuccessful'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the flag that indicates whether the request should be
  	 processed. If the message represents a response, this indicates whether the
  	 processing was successful. If set to <c>false</c>, the <see cref="fm.websync.baseMessage.error">fm.websync.baseMessage.error</see>
  	 property should be set to a friendly error message.
  	 </div>
  
  	@function setSuccessful
  	@param {Boolean} value
  	@return {void}
  */


  baseMessage.prototype.setSuccessful = function() {
    var value;
    value = arguments[0];
    this.__successful = value;
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.baseMessage-setTimestamp'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the date/time the message was processed on the server (in UTC/GMT).
  	 </div>
  
  	@function setTimestamp
  	@param {fm.nullable} value
  	@return {void}
  */


  baseMessage.prototype.setTimestamp = function() {
    var value;
    value = arguments[0];
    this.__timestamp = value;
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.baseMessage-setValidate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets whether to skip validation while deserializing, used internally.
  	 </div>
  
  	@function setValidate
  	@param {Boolean} value
  	@return {void}
  */


  baseMessage.prototype.setValidate = function() {
    var value;
    value = arguments[0];
    return this._validate = value;
  };

  baseMessage.prototype.getData = function() {
    return fm.json.deserialize(this.getDataJson.apply(this, arguments));
  };

  baseMessage.prototype.setData = function() {
    var data;
    data = arguments[0];
    arguments[arguments.length - 1] = fm.json.serialize(arguments[arguments.length - 1]);
    return this.setDataJson.apply(this, arguments);
  };

  return baseMessage;

})(fm.websync.extensible);


/*<span id='cls-fm.websync.notification'>&nbsp;</span>
*/

/**
@class fm.websync.notification
 <div>
 The WebSync notification used for direct notifying.
 </div>

@extends fm.websync.baseMessage
*/


fm.websync.notification = (function(_super) {

  __extends(notification, _super);

  /*<span id='method-fm.websync.notification-fm.websync.notification'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Creates a new notification with a client ID and JSON data.
  	 </div>
  	@function fm.websync.notification
  	@param {fm.guid} clientId The client ID to target.
  	@param {String} dataJson The data to send (in JSON format).
  	@param {String} tag The tag that identifies the contents of the payload.
  	@return {}
  */


  function notification() {
    this.toJson = __bind(this.toJson, this);

    this.setTag = __bind(this.setTag, this);

    this.setClientId = __bind(this.setClientId, this);

    this.getTag = __bind(this.getTag, this);

    this.getClientId = __bind(this.getClientId, this);

    var clientId, dataJson, tag;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      notification.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 2) {
      clientId = arguments[0];
      dataJson = arguments[1];
      notification.call(this, clientId, dataJson, null);
      return;
    }
    if (arguments.length === 3) {
      clientId = arguments[0];
      dataJson = arguments[1];
      tag = arguments[2];
      notification.__super__.constructor.call(this);
      this.setClientId(clientId);
      this.setDataJson(dataJson);
      this.setTag(tag);
      return;
    }
    if (arguments.length === 0) {
      notification.__super__.constructor.call(this);
      return;
    }
    if (arguments.length === 1) {
      clientId = arguments[0];
      notification.__super__.constructor.call(this);
      this.setClientId(clientId);
      return;
    }
  }

  /*<span id='method-fm.websync.notification-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a notification from JSON.
  	 </div>
  	@function fromJson
  	@param {String} notificationJson A JSON string to deserialize.
  	@return {fm.websync.notification} A deserialized notification.
  */


  notification.fromJson = function() {
    var notificationJson;
    notificationJson = arguments[0];
    return fm.websync.serializer.deserializeNotification(notificationJson);
  };

  /*<span id='method-fm.websync.notification-fromJsonMultiple'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a list of notifications from JSON.
  	 </div>
  	@function fromJsonMultiple
  	@param {String} notificationsJson A JSON string to deserialize.
  	@return {fm.array} A deserialized list of notifications.
  */


  notification.fromJsonMultiple = function() {
    var notificationsJson;
    notificationsJson = arguments[0];
    return fm.websync.serializer.deserializeNotificationArray(notificationsJson);
  };

  /*<span id='method-fm.websync.notification-fromMessage'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Converts a Notification from its Message format.
  	 </div>
  	@function fromMessage
  	@param {fm.websync.message} message The message.
  	@return {fm.websync.notification} The notification.
  */


  notification.fromMessage = function() {
    var message, notification, _var0;
    message = arguments[0];
    _var0 = message;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    notification = new fm.websync.notification();
    notification.setClientId(message.getNotifyClientId());
    notification.setSuccessful(message.getSuccessful());
    notification.setError(message.getError());
    notification.setTimestamp(message.getTimestamp());
    notification.setDataJson(message.getDataJson());
    notification.setExtensions(message.getExtensions());
    return notification;
  };

  /*<span id='method-fm.websync.notification-fromMessages'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Converts a set of Notifications from their Message formats.
  	 </div>
  	@function fromMessages
  	@param {fm.array} messages The messages.
  	@return {fm.array} The notifications.
  */


  notification.fromMessages = function() {
    var i, messages, notificationArray, _var0;
    messages = arguments[0];
    _var0 = messages;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    notificationArray = new Array(messages.length);
    i = 0;
    while (i < messages.length) {
      try {
        notificationArray[i] = fm.websync.notification.fromMessage(messages[i]);
      } finally {
        i++;
      }
    }
    return notificationArray;
  };

  /*<span id='method-fm.websync.notification-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a notification to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.notification} notification A notification to serialize.
  	@return {String} A JSON-serialized notification.
  */


  notification.toJson = function() {
    var notification;
    notification = arguments[0];
    return fm.websync.serializer.serializeNotification(notification);
  };

  /*<span id='method-fm.websync.notification-toJsonMultiple'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a list of notifications to JSON.
  	 </div>
  	@function toJsonMultiple
  	@param {fm.array} notifications A list of notifications to serialize.
  	@return {String} A JSON-serialized array of notifications.
  */


  notification.toJsonMultiple = function() {
    var notifications;
    notifications = arguments[0];
    return fm.websync.serializer.serializeNotificationArray(notifications);
  };

  /*<span id='method-fm.websync.notification-toMessage'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Converts a Notification to its Message format.
  	 </div>
  	@function toMessage
  	@param {fm.websync.notification} notification The notification.
  	@return {fm.websync.message} The message.
  */


  notification.toMessage = function() {
    var message, notification, _var0;
    notification = arguments[0];
    _var0 = notification;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    message = new fm.websync.message();
    message.setNotifyClientId(notification.getClientId());
    message.setSuccessful(notification.getSuccessful());
    message.setError(notification.getError());
    message.setTimestamp(notification.getTimestamp());
    message.setDataJson(notification.getDataJson());
    message.setExtensions(notification.getExtensions());
    return message;
  };

  /*<span id='method-fm.websync.notification-toMessages'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Converts a set of Notifications to their Message formats.
  	 </div>
  	@function toMessages
  	@param {fm.array} notifications The notifications.
  	@return {fm.array} The messages.
  */


  notification.toMessages = function() {
    var i, messageArray, notifications, _var0;
    notifications = arguments[0];
    _var0 = notifications;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    messageArray = new Array(notifications.length);
    i = 0;
    while (i < notifications.length) {
      try {
        messageArray[i] = fm.websync.notification.toMessage(notifications[i]);
      } finally {
        i++;
      }
    }
    return messageArray;
  };

  /*<span id='method-fm.websync.notification-getClientId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the client ID the publisher is targeting.
  	 </div>
  
  	@function getClientId
  	@return {fm.guid}
  */


  notification.prototype.getClientId = function() {
    var nullable;
    nullable = fm.serializer.deserializeGuid(this.getExtensionValueJson("fm.notify"));
    if (nullable !== null) {
      return nullable;
    }
    return fm.guid.empty;
  };

  /*<span id='method-fm.websync.notification-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  notification.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };

  /*<span id='method-fm.websync.notification-setClientId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the client ID the publisher is targeting.
  	 </div>
  
  	@function setClientId
  	@param {fm.guid} value
  	@return {void}
  */


  notification.prototype.setClientId = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.notify", fm.serializer.serializeGuid(value), false);
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.notification-setTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function setTag
  	@param {String} value
  	@return {void}
  */


  notification.prototype.setTag = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.tag", fm.serializer.serializeString(value), false);
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.notification-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes the notification to JSON.
  	 </div>
  	@function toJson
  	@return {String} The notification in JSON-serialized format.
  */


  notification.prototype.toJson = function() {
    return fm.websync.notification.toJson(this);
  };

  return notification;

}).call(this, fm.websync.baseMessage);




fm.websync.publisherResponseArgs = (function(_super) {

  __extends(publisherResponseArgs, _super);

  publisherResponseArgs.prototype._exception = null;

  publisherResponseArgs.prototype._responses = null;

  function publisherResponseArgs() {
    this.setResponses = __bind(this.setResponses, this);

    this.setResponse = __bind(this.setResponse, this);

    this.setException = __bind(this.setException, this);

    this.getResponses = __bind(this.getResponses, this);

    this.getResponse = __bind(this.getResponse, this);

    this.getException = __bind(this.getException, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      publisherResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    publisherResponseArgs.__super__.constructor.call(this);
  }

  publisherResponseArgs.prototype.getException = function() {
    return this._exception;
  };

  publisherResponseArgs.prototype.getResponse = function() {
    var _var0;
    _var0 = this.getResponses();
    if ((_var0 === null || typeof _var0 === 'undefined') || (this.getResponses().length === 0)) {
      return null;
    }
    return this.getResponses()[0];
  };

  publisherResponseArgs.prototype.getResponses = function() {
    return this._responses;
  };

  publisherResponseArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  publisherResponseArgs.prototype.setResponse = function() {
    var value;
    value = arguments[0];
    return this.setResponses([value]);
  };

  publisherResponseArgs.prototype.setResponses = function() {
    var value;
    value = arguments[0];
    return this._responses = value;
  };

  return publisherResponseArgs;

})(fm.object);


/*<span id='cls-fm.websync.baseClient'>&nbsp;</span>
*/

/**
@class fm.websync.baseClient
 <div>
 Base class for WebSync clients and publishers.
 </div>

@extends fm.dynamic
*/


fm.websync.baseClient = (function(_super) {

  __extends(baseClient, _super);

  baseClient.prototype.__domainName = null;

  baseClient.prototype._concurrencyMode = null;

  baseClient.prototype._disableBinary = false;

  baseClient.prototype._domainKey = null;

  baseClient._headers = null;

  /*<span id='prop-fm.websync.baseClient-_invalidResponseMessage'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The default message for an invalid server response.
  	 </div>
  
  	@field _invalidResponseMessage
  	@type {String}
  */


  baseClient._invalidResponseMessage = "Invalid response received from server.";

  baseClient.prototype._onHttpRequestCreated = null;

  baseClient.prototype._onHttpResponseReceived = null;

  baseClient.prototype._onRequestCreated = null;

  baseClient.prototype._onResponseReceived = null;

  baseClient.prototype._onUnhandledException = null;

  baseClient.prototype._requestTimeout = 0;

  baseClient.prototype._requestUrl = null;

  /*<span id='method-fm.websync.baseClient-fm.websync.baseClient'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.baseClient">fm.websync.baseClient</see> class.
  	 </div>
  	@function fm.websync.baseClient
  	@param {String} requestUrl The absolute URL of the WebSync server request handler.
  	@return {}
  */


  function baseClient() {
    this.setRequestUrl = __bind(this.setRequestUrl, this);

    this.setRequestTimeout = __bind(this.setRequestTimeout, this);

    this.setDomainName = __bind(this.setDomainName, this);

    this.setDomainKey = __bind(this.setDomainKey, this);

    this.setDisableBinary = __bind(this.setDisableBinary, this);

    this.setConcurrencyMode = __bind(this.setConcurrencyMode, this);

    this.removeOnUnhandledException = __bind(this.removeOnUnhandledException, this);

    this.removeOnResponseReceived = __bind(this.removeOnResponseReceived, this);

    this.removeOnRequestCreated = __bind(this.removeOnRequestCreated, this);

    this.removeOnHttpResponseReceived = __bind(this.removeOnHttpResponseReceived, this);

    this.removeOnHttpRequestCreated = __bind(this.removeOnHttpRequestCreated, this);

    this.raiseUnhandledException = __bind(this.raiseUnhandledException, this);

    this.raiseBaseEvent = __bind(this.raiseBaseEvent, this);

    this.internalOnResponseReceived = __bind(this.internalOnResponseReceived, this);

    this.internalOnRequestCreated = __bind(this.internalOnRequestCreated, this);

    this.internalOnHttpResponseReceived = __bind(this.internalOnHttpResponseReceived, this);

    this.internalOnHttpRequestCreated = __bind(this.internalOnHttpRequestCreated, this);

    this.getRequestUrl = __bind(this.getRequestUrl, this);

    this.getRequestTimeout = __bind(this.getRequestTimeout, this);

    this.getDomainName = __bind(this.getDomainName, this);

    this.getDomainKey = __bind(this.getDomainKey, this);

    this.getDisableBinary = __bind(this.getDisableBinary, this);

    this.getConcurrencyMode = __bind(this.getConcurrencyMode, this);

    this.createHeadersNoCache = __bind(this.createHeadersNoCache, this);

    this.createHeaders = __bind(this.createHeaders, this);

    this.addOnUnhandledException = __bind(this.addOnUnhandledException, this);

    this.addOnResponseReceived = __bind(this.addOnResponseReceived, this);

    this.addOnRequestCreated = __bind(this.addOnRequestCreated, this);

    this.addOnHttpResponseReceived = __bind(this.addOnHttpResponseReceived, this);

    this.addOnHttpRequestCreated = __bind(this.addOnHttpRequestCreated, this);

    var requestUrl, _var0;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseClient.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    requestUrl = arguments[0];
    baseClient.__super__.constructor.call(this);
    _var0 = requestUrl;
    if (_var0 === null || typeof _var0 === 'undefined') {
      throw new Error("requestUrl cannot be null.");
    }
    this.setRequestUrl(fm.httpTransfer.replaceWildcards(requestUrl));
    this.setRequestTimeout(15000);
    this.setDomainKey(fm.websync.defaults.getDomainKey());
    this.setDomainName(fm.websync.defaults.getDomainName());
    this.setConcurrencyMode(fm.websync.concurrencyMode.Low);
  }

  baseClient.sanitizeDomainName = function() {
    var domainName, index;
    domainName = arguments[0];
    if (fm.stringExtensions.startsWith(domainName, "http://", fm.stringComparison.Ordinal)) {
      domainName = domainName.substring("http://".length);
    } else {
      if (fm.stringExtensions.startsWith(domainName, "https://", fm.stringComparison.Ordinal)) {
        domainName = domainName.substring("https://".length);
      }
    }
    index = fm.stringExtensions.indexOf(domainName, "/");
    if (index !== -1) {
      domainName = fm.stringExtensions.substring(domainName, 0, index);
    }
    return domainName;
  };

  /*<span id='method-fm.websync.baseClient-addOnHttpRequestCreated'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever an underlying HTTP request
  	 has been created and is about to be transferred to the server. This is a
  	 good place to add headers/cookies. For WebSocket streams, this will fire
  	 only once for the initial HTTP-based handshake.
  	 </div>
  
  	@function addOnHttpRequestCreated
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseClient.prototype.addOnHttpRequestCreated = function() {
    var value;
    value = arguments[0];
    return this._onHttpRequestCreated = fm.delegate.combine(this._onHttpRequestCreated, value);
  };

  /*<span id='method-fm.websync.baseClient-addOnHttpResponseReceived'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever an underlying HTTP response
  	 has been received and is about to be processed by the client. This is a
  	 good place to read headers/cookies. For WebSocket streams, this will fire
  	 only once for the initial HTTP-based handshake.
  	 </div>
  
  	@function addOnHttpResponseReceived
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseClient.prototype.addOnHttpResponseReceived = function() {
    var value;
    value = arguments[0];
    return this._onHttpResponseReceived = fm.delegate.combine(this._onHttpResponseReceived, value);
  };

  /*<span id='method-fm.websync.baseClient-addOnRequestCreated'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a new request is created
  	 and about to be transferred to the server. This is a good place to read
  	 or modify outgoing messages.
  	 </div>
  
  	@function addOnRequestCreated
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseClient.prototype.addOnRequestCreated = function() {
    var value;
    value = arguments[0];
    return this._onRequestCreated = fm.delegate.combine(this._onRequestCreated, value);
  };

  /*<span id='method-fm.websync.baseClient-addOnResponseReceived'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a new response is received
  	 and about to be processed by the client. This is a good place to read
  	 or modify incoming messages.
  	 </div>
  
  	@function addOnResponseReceived
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseClient.prototype.addOnResponseReceived = function() {
    var value;
    value = arguments[0];
    return this._onResponseReceived = fm.delegate.combine(this._onResponseReceived, value);
  };

  /*<span id='method-fm.websync.baseClient-addOnUnhandledException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised when an exception is thrown in user code and not handled,
  	 typically in a callback or event handler.
  	 </div>
  
  	@function addOnUnhandledException
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseClient.prototype.addOnUnhandledException = function() {
    var value;
    value = arguments[0];
    return this._onUnhandledException = fm.delegate.combine(this._onUnhandledException, value);
  };

  /*<span id='method-fm.websync.baseClient-createHeaders'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Creates an initial set of headers, including
  	 the domain key and domain name.
  	 </div>
  	@function createHeaders
  	@return {fm.nameValueCollection}
  */


  baseClient.prototype.createHeaders = function() {
    var _var0;
    if (this.getConcurrencyMode() === fm.websync.concurrencyMode.High) {
      _var0 = fm.websync.baseClient._headers;
      if (_var0 === null || typeof _var0 === 'undefined') {
        this._headers = this.createHeadersNoCache();
      }
      return fm.websync.baseClient._headers;
    }
    return this.createHeadersNoCache();
  };

  baseClient.prototype.createHeadersNoCache = function() {
    var values, _var0;
    values = new fm.nameValueCollection();
    if (this.getDomainName() !== fm.websync.defaults.getDomainName()) {
      values.set("X-FM-DomainName", this.getDomainName());
    }
    _var0 = this.getDomainKey();
    if ((_var0 === null ? _var0 !== fm.websync.defaults.getDomainKey() : !_var0.equals(fm.websync.defaults.getDomainKey()))) {
      values.set("X-FM-DomainKey", this.getDomainKey().toString());
    }
    return values;
  };

  /*<span id='method-fm.websync.baseClient-getConcurrencyMode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a flag indicating the level of concurrency in the current process.
  	 The intended use of this property is to lighten the processor load when hundreds
  	 or thousands of instances are created in a single process for the purposes of
  	 generating load for testing.
  	 </div>
  
  	@function getConcurrencyMode
  	@return {fm.websync.concurrencyMode}
  */


  baseClient.prototype.getConcurrencyMode = function() {
    return this._concurrencyMode;
  };

  /*<span id='method-fm.websync.baseClient-getDisableBinary'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether to disable the transmission of binary payloads
  	 as binary on the wire. If set to <c>true</c>, binary payloads will
  	 be sent over the wire as base64-encoded strings.
  	 </div>
  
  	@function getDisableBinary
  	@return {Boolean}
  */


  baseClient.prototype.getDisableBinary = function() {
    return this._disableBinary;
  };

  /*<span id='method-fm.websync.baseClient-getDomainKey'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the domain key for sandboxing connections to the server.
  	 Defaults to "11111111-1111-1111-1111-111111111111". If you are using
  	 WebSync On-Demand, this should be set to the private domain key if you
  	 are attempting to use methods that have been secured in the Portal;
  	 otherwise, use the public domain key.
  	 </div>
  
  	@function getDomainKey
  	@return {fm.guid}
  */


  baseClient.prototype.getDomainKey = function() {
    return this._domainKey;
  };

  /*<span id='method-fm.websync.baseClient-getDomainName'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the domain name to send as the <tt>Referrer</tt> with each request.
  	 Defaults to "localhost". If you are using WebSync On-Demand, this field is only
  	 necessary if you are using the public domain key, in which case it should be set
  	 to equal the domain name entered in the Portal for the domain key (e.g.
  	 "frozenmountain.com").
  	 </div>
  
  	@function getDomainName
  	@return {String}
  */


  baseClient.prototype.getDomainName = function() {
    return this.__domainName;
  };

  /*<span id='method-fm.websync.baseClient-getRequestTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the number of milliseconds to wait for a standard request to
  	 return a response before it is aborted and another request is attempted.
  	 Defaults to 15000 (15 seconds).
  	 </div>
  
  	@function getRequestTimeout
  	@return {Integer}
  */


  baseClient.prototype.getRequestTimeout = function() {
    return this._requestTimeout;
  };

  /*<span id='method-fm.websync.baseClient-getRequestUrl'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the absolute URL of the WebSync request handler, typically
  	 ending with websync.ashx.
  	 </div>
  
  	@function getRequestUrl
  	@return {String}
  */


  baseClient.prototype.getRequestUrl = function() {
    return this._requestUrl;
  };

  baseClient.prototype.internalOnHttpRequestCreated = function() {
    var e;
    e = arguments[0];
    return this.raiseBaseEvent(this._onHttpRequestCreated, e, "OnHttpRequestCreated");
  };

  baseClient.prototype.internalOnHttpResponseReceived = function() {
    var e;
    e = arguments[0];
    return this.raiseBaseEvent(this._onHttpResponseReceived, e, "OnHttpResponseReceived");
  };

  baseClient.prototype.internalOnRequestCreated = function() {
    var e;
    e = arguments[0];
    return this.raiseBaseEvent(this._onRequestCreated, e, "OnRequestCreated");
  };

  baseClient.prototype.internalOnResponseReceived = function() {
    var e;
    e = arguments[0];
    return this.raiseBaseEvent(this._onResponseReceived, e, "OnResponseReceived");
  };

  baseClient.prototype.raiseBaseEvent = function() {
    var args, eventMethod, eventName, _var0;
    eventMethod = arguments[0];
    args = arguments[1];
    eventName = arguments[2];
    _var0 = eventMethod;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      try {
        return eventMethod(args);
      } catch (exception) {
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, fm.stringExtensions.format("BaseClient -> {0}", eventName));
        }
      } finally {

      }
    }
  };

  /*<span id='method-fm.websync.baseClient-raiseUnhandledException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Raises an unhandled exception.
  	 </div>
  	@function raiseUnhandledException
  	@param {Error} exception The unhandled exception.
  	@return {Boolean} true if the exception was handled; otherwise, false.
  */


  baseClient.prototype.raiseUnhandledException = function() {
    var args2, exception, onUnhandledException, p, _var0;
    exception = arguments[0];
    onUnhandledException = this._onUnhandledException;
    _var0 = onUnhandledException;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      args2 = new fm.websync.unhandledExceptionArgs();
      args2.__exception = exception;
      p = args2;
      try {
        onUnhandledException(p);
      } catch (exception2) {
        fm.asyncException.asyncThrow(exception2, "BaseClient -> OnUnhandledException");
      } finally {

      }
      return p.getHandled();
    }
    return false;
  };

  /*<span id='method-fm.websync.baseClient-removeOnHttpRequestCreated'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever an underlying HTTP request
  	 has been created and is about to be transferred to the server. This is a
  	 good place to add headers/cookies. For WebSocket streams, this will fire
  	 only once for the initial HTTP-based handshake.
  	 </div>
  
  	@function removeOnHttpRequestCreated
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseClient.prototype.removeOnHttpRequestCreated = function() {
    var value;
    value = arguments[0];
    return this._onHttpRequestCreated = fm.delegate.remove(this._onHttpRequestCreated, value);
  };

  /*<span id='method-fm.websync.baseClient-removeOnHttpResponseReceived'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever an underlying HTTP response
  	 has been received and is about to be processed by the client. This is a
  	 good place to read headers/cookies. For WebSocket streams, this will fire
  	 only once for the initial HTTP-based handshake.
  	 </div>
  
  	@function removeOnHttpResponseReceived
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseClient.prototype.removeOnHttpResponseReceived = function() {
    var value;
    value = arguments[0];
    return this._onHttpResponseReceived = fm.delegate.remove(this._onHttpResponseReceived, value);
  };

  /*<span id='method-fm.websync.baseClient-removeOnRequestCreated'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a new request is created
  	 and about to be transferred to the server. This is a good place to read
  	 or modify outgoing messages.
  	 </div>
  
  	@function removeOnRequestCreated
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseClient.prototype.removeOnRequestCreated = function() {
    var value;
    value = arguments[0];
    return this._onRequestCreated = fm.delegate.remove(this._onRequestCreated, value);
  };

  /*<span id='method-fm.websync.baseClient-removeOnResponseReceived'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a new response is received
  	 and about to be processed by the client. This is a good place to read
  	 or modify incoming messages.
  	 </div>
  
  	@function removeOnResponseReceived
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseClient.prototype.removeOnResponseReceived = function() {
    var value;
    value = arguments[0];
    return this._onResponseReceived = fm.delegate.remove(this._onResponseReceived, value);
  };

  /*<span id='method-fm.websync.baseClient-removeOnUnhandledException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised when an exception is thrown in user code and not handled,
  	 typically in a callback or event handler.
  	 </div>
  
  	@function removeOnUnhandledException
  	@param {fm.singleAction} value
  	@return {void}
  */


  baseClient.prototype.removeOnUnhandledException = function() {
    var value;
    value = arguments[0];
    return this._onUnhandledException = fm.delegate.remove(this._onUnhandledException, value);
  };

  /*<span id='method-fm.websync.baseClient-setConcurrencyMode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets a flag indicating the level of concurrency in the current process.
  	 The intended use of this property is to lighten the processor load when hundreds
  	 or thousands of instances are created in a single process for the purposes of
  	 generating load for testing.
  	 </div>
  
  	@function setConcurrencyMode
  	@param {fm.websync.concurrencyMode} value
  	@return {void}
  */


  baseClient.prototype.setConcurrencyMode = function() {
    var value;
    value = arguments[0];
    return this._concurrencyMode = value;
  };

  /*<span id='method-fm.websync.baseClient-setDisableBinary'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets whether to disable the transmission of binary payloads
  	 as binary on the wire. If set to <c>true</c>, binary payloads will
  	 be sent over the wire as base64-encoded strings.
  	 </div>
  
  	@function setDisableBinary
  	@param {Boolean} value
  	@return {void}
  */


  baseClient.prototype.setDisableBinary = function() {
    var value;
    value = arguments[0];
    return this._disableBinary = value;
  };

  /*<span id='method-fm.websync.baseClient-setDomainKey'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the domain key for sandboxing connections to the server.
  	 Defaults to "11111111-1111-1111-1111-111111111111". If you are using
  	 WebSync On-Demand, this should be set to the private domain key if you
  	 are attempting to use methods that have been secured in the Portal;
  	 otherwise, use the public domain key.
  	 </div>
  
  	@function setDomainKey
  	@param {fm.guid} value
  	@return {void}
  */


  baseClient.prototype.setDomainKey = function() {
    var value;
    value = arguments[0];
    return this._domainKey = value;
  };

  /*<span id='method-fm.websync.baseClient-setDomainName'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the domain name to send as the <tt>Referrer</tt> with each request.
  	 Defaults to "localhost". If you are using WebSync On-Demand, this field is only
  	 necessary if you are using the public domain key, in which case it should be set
  	 to equal the domain name entered in the Portal for the domain key (e.g.
  	 "frozenmountain.com").
  	 </div>
  
  	@function setDomainName
  	@param {String} value
  	@return {void}
  */


  baseClient.prototype.setDomainName = function() {
    var value, _var0;
    value = arguments[0];
    _var0 = value;
    if (_var0 === null || typeof _var0 === 'undefined') {
      value = fm.websync.defaults.getDomainName();
    }
    return this.__domainName = fm.websync.baseClient.sanitizeDomainName(value);
  };

  /*<span id='method-fm.websync.baseClient-setRequestTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the number of milliseconds to wait for a standard request to
  	 return a response before it is aborted and another request is attempted.
  	 Defaults to 15000 (15 seconds).
  	 </div>
  
  	@function setRequestTimeout
  	@param {Integer} value
  	@return {void}
  */


  baseClient.prototype.setRequestTimeout = function() {
    var value;
    value = arguments[0];
    return this._requestTimeout = value;
  };

  /*<span id='method-fm.websync.baseClient-setRequestUrl'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the absolute URL of the WebSync request handler, typically
  	 ending with websync.ashx.
  	 </div>
  
  	@function setRequestUrl
  	@param {String} value
  	@return {void}
  */


  baseClient.prototype.setRequestUrl = function() {
    var value;
    value = arguments[0];
    return this._requestUrl = value;
  };

  baseClient._headers = null;

  return baseClient;

}).call(this, fm.dynamic);


/*<span id='cls-fm.websync.baseAdvice'>&nbsp;</span>
*/

/**
@class fm.websync.baseAdvice
 <div>
 Base advice class used in <see cref="fm.websync.message">Messages</see> and for nested advice.
 </div>

@extends fm.serializable
*/


fm.websync.baseAdvice = (function(_super) {

  __extends(baseAdvice, _super);

  baseAdvice.prototype.__hosts = null;

  baseAdvice.prototype.__interval = null;

  baseAdvice.prototype.__reconnect = null;

  function baseAdvice() {
    this.toJson = __bind(this.toJson, this);

    this.setReconnect = __bind(this.setReconnect, this);

    this.setInterval = __bind(this.setInterval, this);

    this.setHosts = __bind(this.setHosts, this);

    this.getReconnect = __bind(this.getReconnect, this);

    this.getInterval = __bind(this.getInterval, this);

    this.getHosts = __bind(this.getHosts, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      baseAdvice.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    baseAdvice.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.baseAdvice-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a single base advice object from JSON.
  	 </div>
  	@function fromJson
  	@param {String} baseAdviceJson The JSON base advice object to deserialize.
  	@return {fm.websync.baseAdvice} The deserialized advice object.
  */


  baseAdvice.fromJson = function() {
    var baseAdviceJson;
    baseAdviceJson = arguments[0];
    return fm.websync.serializer.deserializeBaseAdvice(baseAdviceJson);
  };

  /*<span id='method-fm.websync.baseAdvice-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a single base advice object to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.baseAdvice} baseAdvice The base advice object to serialize.
  	@return {String} The serialized advice object.
  */


  baseAdvice.toJson = function() {
    var baseAdvice;
    baseAdvice = arguments[0];
    return fm.websync.serializer.serializeBaseAdvice(baseAdvice);
  };

  /*<span id='method-fm.websync.baseAdvice-getHosts'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the list of host names that may be used as alternate servers.
  	 </div>
  
  	@function getHosts
  	@return {fm.array}
  */


  baseAdvice.prototype.getHosts = function() {
    return this.__hosts;
  };

  /*<span id='method-fm.websync.baseAdvice-getInterval'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the interval to wait before following the reconnect advice.
  	 </div>
  
  	@function getInterval
  	@return {fm.nullable}
  */


  baseAdvice.prototype.getInterval = function() {
    return this.__interval;
  };

  /*<span id='method-fm.websync.baseAdvice-getReconnect'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets how the client should attempt to re-establish a connection with the server.
  	 </div>
  
  	@function getReconnect
  	@return {fm.nullable}
  */


  baseAdvice.prototype.getReconnect = function() {
    return this.__reconnect;
  };

  /*<span id='method-fm.websync.baseAdvice-setHosts'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the list of host names that may be used as alternate servers.
  	 </div>
  
  	@function setHosts
  	@param {fm.array} value
  	@return {void}
  */


  baseAdvice.prototype.setHosts = function() {
    var value;
    value = arguments[0];
    this.__hosts = value;
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.baseAdvice-setInterval'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the interval to wait before following the reconnect advice.
  	 </div>
  
  	@function setInterval
  	@param {fm.nullable} value
  	@return {void}
  */


  baseAdvice.prototype.setInterval = function() {
    var value;
    value = arguments[0];
    this.__interval = value;
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.baseAdvice-setReconnect'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets how the client should attempt to re-establish a connection with the server.
  	 </div>
  
  	@function setReconnect
  	@param {fm.nullable} value
  	@return {void}
  */


  baseAdvice.prototype.setReconnect = function() {
    var value;
    value = arguments[0];
    this.__reconnect = value;
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.baseAdvice-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes the base advice object to JSON.
  	 </div>
  	@function toJson
  	@return {String} The serialized advice object.
  */


  baseAdvice.prototype.toJson = function() {
    return fm.websync.baseAdvice.toJson(this);
  };

  return baseAdvice;

}).call(this, fm.serializable);


/*<span id='cls-fm.websync.advice'>&nbsp;</span>
*/

/**
@class fm.websync.advice
 <div>
 Advice class used in <see cref="fm.websync.message">Messages</see>.
 </div>

@extends fm.websync.baseAdvice
*/


fm.websync.advice = (function(_super) {

  __extends(advice, _super);

  advice.prototype._callbackPolling = null;

  advice.prototype._longPolling = null;

  advice.prototype._webSocket = null;

  function advice() {
    this.toJson = __bind(this.toJson, this);

    this.setWebSocket = __bind(this.setWebSocket, this);

    this.setLongPolling = __bind(this.setLongPolling, this);

    this.setCallbackPolling = __bind(this.setCallbackPolling, this);

    this.getWebSocket = __bind(this.getWebSocket, this);

    this.getLongPolling = __bind(this.getLongPolling, this);

    this.getCallbackPolling = __bind(this.getCallbackPolling, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      advice.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    advice.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.advice-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a single advice object from JSON.
  	 </div>
  	@function fromJson
  	@param {String} adviceJson The JSON advice object to deserialize.
  	@return {fm.websync.advice} The deserialized advice object.
  */


  advice.fromJson = function() {
    var adviceJson;
    adviceJson = arguments[0];
    return fm.websync.serializer.deserializeAdvice(adviceJson);
  };

  /*<span id='method-fm.websync.advice-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a single advice object to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.advice} advice The advice object to serialize.
  	@return {String} The serialized advice object.
  */


  advice.toJson = function() {
    var advice;
    advice = arguments[0];
    return fm.websync.serializer.serializeAdvice(advice);
  };

  /*<span id='method-fm.websync.advice-getCallbackPolling'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets advice specific to callback-polling clients.
  	 </div>
  
  	@function getCallbackPolling
  	@return {fm.websync.baseAdvice}
  */


  advice.prototype.getCallbackPolling = function() {
    return this._callbackPolling;
  };

  /*<span id='method-fm.websync.advice-getLongPolling'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets advice specific to long-polling clients.
  	 </div>
  
  	@function getLongPolling
  	@return {fm.websync.baseAdvice}
  */


  advice.prototype.getLongPolling = function() {
    return this._longPolling;
  };

  /*<span id='method-fm.websync.advice-getWebSocket'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets advice specific to WebSocket clients.
  	 </div>
  
  	@function getWebSocket
  	@return {fm.websync.baseAdvice}
  */


  advice.prototype.getWebSocket = function() {
    return this._webSocket;
  };

  /*<span id='method-fm.websync.advice-setCallbackPolling'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets advice specific to callback-polling clients.
  	 </div>
  
  	@function setCallbackPolling
  	@param {fm.websync.baseAdvice} value
  	@return {void}
  */


  advice.prototype.setCallbackPolling = function() {
    var value;
    value = arguments[0];
    return this._callbackPolling = value;
  };

  /*<span id='method-fm.websync.advice-setLongPolling'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets advice specific to long-polling clients.
  	 </div>
  
  	@function setLongPolling
  	@param {fm.websync.baseAdvice} value
  	@return {void}
  */


  advice.prototype.setLongPolling = function() {
    var value;
    value = arguments[0];
    return this._longPolling = value;
  };

  /*<span id='method-fm.websync.advice-setWebSocket'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets advice specific to WebSocket clients.
  	 </div>
  
  	@function setWebSocket
  	@param {fm.websync.baseAdvice} value
  	@return {void}
  */


  advice.prototype.setWebSocket = function() {
    var value;
    value = arguments[0];
    return this._webSocket = value;
  };

  /*<span id='method-fm.websync.advice-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes the advice object to JSON.
  	 </div>
  	@function toJson
  	@return {String} The serialized advice object.
  */


  advice.prototype.toJson = function() {
    return fm.websync.advice.toJson(this);
  };

  return advice;

}).call(this, fm.websync.baseAdvice);


/*<span id='cls-fm.websync.metaChannels'>&nbsp;</span>
*/

/**
@class fm.websync.metaChannels
 <div>
 Contains the reserved Bayeux meta-channels and methods to assist in detecting them.
 </div>

@extends fm.object
*/


fm.websync.metaChannels = (function(_super) {

  __extends(metaChannels, _super);

  /*<span id='prop-fm.websync.metaChannels-_bind'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The reserved channel for bind requests/responses.
  	 </div>
  
  	@field _bind
  	@type {String}
  */


  metaChannels._bind = "/meta/bind";

  /*<span id='prop-fm.websync.metaChannels-_connect'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The reserved channel for connect requests/responses.
  	 </div>
  
  	@field _connect
  	@type {String}
  */


  metaChannels._connect = "/meta/connect";

  /*<span id='prop-fm.websync.metaChannels-_disconnect'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The reserved channel for disconnect requests/responses.
  	 </div>
  
  	@field _disconnect
  	@type {String}
  */


  metaChannels._disconnect = "/meta/disconnect";

  /*<span id='prop-fm.websync.metaChannels-_handshake'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The reserved channel for handshake requests/responses.
  	 </div>
  
  	@field _handshake
  	@type {String}
  */


  metaChannels._handshake = "/meta/handshake";

  /*<span id='prop-fm.websync.metaChannels-_metaPrefix'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The reserved prefix for Bayeux meta-channels.
  	 </div>
  
  	@field _metaPrefix
  	@type {String}
  */


  metaChannels._metaPrefix = "/meta/";

  /*<span id='prop-fm.websync.metaChannels-_notify'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The reserved channel for notify requests/responses.
  	 </div>
  
  	@field _notify
  	@type {String}
  */


  metaChannels._notify = "/meta/notify";

  /*<span id='prop-fm.websync.metaChannels-_servicePrefix'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The reserved prefix for Bayeux service-channels.
  	 </div>
  
  	@field _servicePrefix
  	@type {String}
  */


  metaChannels._servicePrefix = "/service/";

  /*<span id='prop-fm.websync.metaChannels-_subscribe'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The reserved channel for subscribe requests/responses.
  	 </div>
  
  	@field _subscribe
  	@type {String}
  */


  metaChannels._subscribe = "/meta/subscribe";

  /*<span id='prop-fm.websync.metaChannels-_unbind'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The reserved channel for unbind requests/responses.
  	 </div>
  
  	@field _unbind
  	@type {String}
  */


  metaChannels._unbind = "/meta/unbind";

  /*<span id='prop-fm.websync.metaChannels-_unsubscribe'>&nbsp;</span>
  */


  /**
  	 <div>
  	 The reserved channel for unsubscribe requests/responses.
  	 </div>
  
  	@field _unsubscribe
  	@type {String}
  */


  metaChannels._unsubscribe = "/meta/unsubscribe";

  function metaChannels() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      metaChannels.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
  }

  /*<span id='method-fm.websync.metaChannels-convertChannelFromServiced'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Converts a serviced channel into its original form.
  	 </div>
  	@function convertChannelFromServiced
  	@param {String} channel The channel to convert.
  	@return {String} The channel without the service prefix.
  */


  metaChannels.convertChannelFromServiced = function() {
    var channel;
    channel = arguments[0];
    if (!fm.websync.metaChannels.isServiceChannel(channel)) {
      return channel;
    }
    return channel.substring("/service/".length - 1);
  };

  /*<span id='method-fm.websync.metaChannels-convertChannelToServiced'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Converts a channel into its serviced equivalent.
  	 </div>
  	@function convertChannelToServiced
  	@param {String} channel The channel to convert.
  	@return {String} The channel with the service prefix.
  */


  metaChannels.convertChannelToServiced = function() {
    var channel, _var0;
    channel = arguments[0];
    _var0 = channel;
    if ((_var0 === null || typeof _var0 === 'undefined') || (channel.length < 1)) {
      return "/service/";
    }
    return fm.stringExtensions.concat("/service/", channel.substring(1));
  };

  metaChannels.getMessageType = function() {
    var bayeuxChannel;
    bayeuxChannel = arguments[0];
    if (bayeuxChannel === "/meta/handshake") {
      return fm.websync.messageType.Connect;
    }
    if (bayeuxChannel === "/meta/connect") {
      return fm.websync.messageType.Stream;
    }
    if (bayeuxChannel === "/meta/disconnect") {
      return fm.websync.messageType.Disconnect;
    }
    if (bayeuxChannel === "/meta/bind") {
      return fm.websync.messageType.Bind;
    }
    if (bayeuxChannel === "/meta/unbind") {
      return fm.websync.messageType.Unbind;
    }
    if (bayeuxChannel === "/meta/subscribe") {
      return fm.websync.messageType.Subscribe;
    }
    if (bayeuxChannel === "/meta/unsubscribe") {
      return fm.websync.messageType.Unsubscribe;
    }
    if (bayeuxChannel === "/meta/notify") {
      return fm.websync.messageType.Notify;
    }
    if (fm.websync.metaChannels.isServiceChannel(bayeuxChannel)) {
      return fm.websync.messageType.Service;
    }
    if (!fm.websync.metaChannels.isMetaChannel(bayeuxChannel)) {
      return fm.websync.messageType.Publish;
    }
    return fm.websync.messageType.Unknown;
  };

  /*<span id='method-fm.websync.metaChannels-isMetaChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Determines whether the specified channel name is a reserved Bayeux /meta channel.
  	 </div>
  	@function isMetaChannel
  	@param {String} channel The channel name to check.
  	@return {Boolean} true if the specified channel name is a reserved Bayeux /meta channel; otherwise, false.
  */


  metaChannels.isMetaChannel = function() {
    var channel, _var0;
    channel = arguments[0];
    _var0 = channel;
    return (_var0 !== null && typeof _var0 !== 'undefined') && fm.stringExtensions.startsWith(channel, "/meta/", fm.stringComparison.Ordinal);
  };

  /*<span id='method-fm.websync.metaChannels-isReservedChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Determines whether the specified channel name is a reserved Bayeux channel.
  	 </div>
  	@function isReservedChannel
  	@param {String} channel The channel name to check.
  	@return {Boolean} true if the specified channel name is reserved; otherwise, false.
  */


  metaChannels.isReservedChannel = function() {
    var channel;
    channel = arguments[0];
    return fm.websync.metaChannels.isMetaChannel(channel) || fm.websync.metaChannels.isServiceChannel(channel);
  };

  /*<span id='method-fm.websync.metaChannels-isServiceChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Determines whether the specified channel name is a reserved Bayeux /service channel.
  	 </div>
  	@function isServiceChannel
  	@param {String} channel The channel name to check.
  	@return {Boolean} true if the specified channel name is a reserved Bayeux /service channel; otherwise, false.
  */


  metaChannels.isServiceChannel = function() {
    var channel, _var0;
    channel = arguments[0];
    _var0 = channel;
    return (_var0 !== null && typeof _var0 !== 'undefined') && fm.stringExtensions.startsWith(channel, "/service/", fm.stringComparison.Ordinal);
  };

  return metaChannels;

}).call(this, fm.object);


/*<span id='cls-fm.websync.client'>&nbsp;</span>
*/

/**
@class fm.websync.client
 <div>
 <p>
 The WebSync client, used for subscribing to channels and receiving data, as well as
 publishing data to specific channels.
 </p>
 </div><div>
 <p>
 The WebSync client has 9 primary operations:
 </p>
 <ol>
 <li>
 Connect/Disconnect: Sets up/takes down a streaming connection to the server.
 </li>
 <li>
 Bind/Unbind: Attaches/detaches records to the client (e.g. display name, user ID).
 </li>
 <li>
 Subscribe/Unsubscribe: Opts in/out of receiving data published to a channel.
 </li>
 <li>
 Publish: Broadcasts data to any clients subscribed to the channel.
 </li>
 <li>
 Notify: Pushes data directly to a specific client (no subscription necessary).
 </li>
 <li>
 Service: Sends data to the server for traditional request/response processing.
 </li>
 </ol>
 <p>
 Each method (and the constructor) take a single "args" object. This object defines
 callback functions, configuration settings, and error handling information. It
 allows the client to default to sensible values while allowing easy overrides.
 </p>
 <p>
 The WebSync client is designed to be as robust and fault-tolerant as possible. If
 there are any failures in the streaming connection, the client will automatically
 reconnect and set up a new one.
 </p>
 <p>
 Maintaining a streaming connection lies at the heart of WebSync, and so special care
 is given to ensure that a streaming connection remains active, even in the presence
 of total network failure.
 </p>
 <p>
 Since WebSync clients often subscribe to channels to receive partial updates, it is
 highly recommended to do initial state load in the OnSuccess callback of the call
 to Subscribe. This way, (a) there are no missed
 partial updates between the state load and the subscription, and (b) in the event of
 connection failure and automatic reconnection/resubscription, the state will be
 automatically refreshed.
 </p>
 <p>
 When a connection is lost, <see cref="fm.websync.client.ConnectArgs">fm.websync.client.ConnectArgs</see>.OnStreamFailure will be called.
 This is an excellent time to update the UI to let your user know that the connection
 is temporarily offline and a new one is being established. The client will
 automatically re-attempt a connect.
 </p>
 <p>
 Shortly afterwards, either <see cref="fm.websync.client.ConnectArgs">fm.websync.client.ConnectArgs</see>.OnSuccess or
 <see cref="fm.websync.client.ConnectArgs">fm.websync.client.ConnectArgs</see>.OnFailure will be called, depending on whether or not
 the client could successfully negotiate a new connection with the server.
 If <see cref="fm.websync.client.ConnectArgs">fm.websync.client.ConnectArgs</see>.OnSuccess is called, the connection is officially
 re-established. If <see cref="fm.websync.client.ConnectArgs">fm.websync.client.ConnectArgs</see>.OnFailure is called, you should
 analyze the response, and if appropriate, set <see cref="fm.websync.baseFailureArgs.retry">fm.websync.baseFailureArgs.retry</see>
 to true or false, depending on whether you want to retry the connection. The default
 value of <see cref="fm.websync.baseFailureArgs.retry">fm.websync.baseFailureArgs.retry</see> is governed by <see cref="fm.websync.client.ConnectArgs">fm.websync.client.ConnectArgs</see>.RetryMode.
 Custom backoff algorithms can be defined using <see cref="fm.websync.client.ConnectArgs">fm.websync.client.ConnectArgs</see>.RetryBackoff.
 </p>
 <p>
 By the time <see cref="fm.websync.client.ConnectArgs">fm.websync.client.ConnectArgs</see>.OnSuccess is called, the client has a new
 client ID. Any pre-existing subscriptions or bindings performed outside the
 connect callback chain will be automatically recreated.
 </p>
 <p>
 Within a given OnSuccess or OnFailure callback, a boolean flag is always present to
 indicate whether the callback is being executed as part of an automatic reconnect.
 Refer to <see cref="fm.websync.connectSuccessArgs.isReconnect">fm.websync.connectSuccessArgs.isReconnect</see>,
 <see cref="fm.websync.connectFailureArgs.isReconnect">fm.websync.connectFailureArgs.isReconnect</see>,
 <see cref="fm.websync.subscribeSuccessArgs.isResubscribe">fm.websync.subscribeSuccessArgs.isResubscribe</see>,
 <see cref="fm.websync.subscribeFailureArgs.isResubscribe">fm.websync.subscribeFailureArgs.isResubscribe</see>,
 <see cref="fm.websync.bindSuccessArgs.isRebind">fm.websync.bindSuccessArgs.isRebind</see>, and
 <see cref="fm.websync.bindFailureArgs.isRebind">fm.websync.bindFailureArgs.isRebind</see>.
 </p>
 </div>

@extends fm.websync.baseClient
*/


fm.websync.client = (function(_super) {

  __extends(client, _super);

  client._argsKey = null;

  client.prototype._batchCounter = 0;

  client.prototype._batchCounterLock = null;

  client._bayeuxMinimumVersion = null;

  client._bayeuxVersion = null;

  client.prototype._boundRecords = null;

  client.prototype._boundRecordsLock = null;

  client.prototype._clientId = null;

  client.prototype._connectArgs = null;

  client.prototype._connectionType = null;

  client.prototype._counter = 0;

  client.prototype._counterLock = null;

  client.prototype._customOnReceives = null;

  client.prototype._customOnReceivesLock = null;

  client.prototype._disableWebSockets = false;

  client.prototype._instanceId = null;

  client.prototype._isConnected = false;

  client.prototype._isConnecting = false;

  client.prototype._isDisconnecting = false;

  client.prototype._lastBackoffIndex = 0;

  client.prototype._lastBackoffTimeout = 0;

  client.prototype._lastInterval = 0;

  client.prototype._lastReconnect = null;

  client.prototype._onBindComplete = null;

  client._onBindEnd = null;

  client.prototype._onBindFailure = null;

  client._onBindRequest = null;

  client._onBindResponse = null;

  client.prototype._onBindSuccess = null;

  client.prototype._onConnectComplete = null;

  client._onConnectEnd = null;

  client.prototype._onConnectFailure = null;

  client._onConnectRequest = null;

  client._onConnectResponse = null;

  client.prototype._onConnectSuccess = null;

  client.prototype._onDisconnectComplete = null;

  client._onDisconnectEnd = null;

  client._onDisconnectRequest = null;

  client._onDisconnectResponse = null;

  client.prototype._onNotify = null;

  client.prototype._onNotifyComplete = null;

  client._onNotifyEnd = null;

  client.prototype._onNotifyFailure = null;

  client._onNotifyRequest = null;

  client._onNotifyResponse = null;

  client.prototype._onNotifySuccess = null;

  client.prototype._onPublishComplete = null;

  client._onPublishEnd = null;

  client.prototype._onPublishFailure = null;

  client._onPublishRequest = null;

  client._onPublishResponse = null;

  client.prototype._onPublishSuccess = null;

  client.prototype._onServerBind = null;

  client.prototype._onServerSubscribe = null;

  client.prototype._onServerUnbind = null;

  client.prototype._onServerUnsubscribe = null;

  client.prototype._onServiceComplete = null;

  client._onServiceEnd = null;

  client.prototype._onServiceFailure = null;

  client._onServiceRequest = null;

  client._onServiceResponse = null;

  client.prototype._onServiceSuccess = null;

  client.prototype._onStreamFailure = null;

  client.prototype._onSubscribeComplete = null;

  client._onSubscribeEnd = null;

  client.prototype._onSubscribeFailure = null;

  client._onSubscribeRequest = null;

  client._onSubscribeResponse = null;

  client.prototype._onSubscribeSuccess = null;

  client.prototype._onUnbindComplete = null;

  client._onUnbindEnd = null;

  client.prototype._onUnbindFailure = null;

  client._onUnbindRequest = null;

  client._onUnbindResponse = null;

  client.prototype._onUnbindSuccess = null;

  client.prototype._onUnsubscribeComplete = null;

  client._onUnsubscribeEnd = null;

  client.prototype._onUnsubscribeFailure = null;

  client._onUnsubscribeRequest = null;

  client._onUnsubscribeResponse = null;

  client.prototype._onUnsubscribeSuccess = null;

  client.prototype._pendingReceives = null;

  client.prototype._queueActivated = false;

  client.prototype._queueLock = null;

  client.prototype._rebindCache = null;

  client.prototype._reconnectCache = null;

  client.prototype._reconnectCacheLock = null;

  client.prototype._requestQueue = null;

  client.prototype._requestTransfer = null;

  client._requestUrlCache = null;

  client._requestUrlCacheLock = null;

  client.prototype._responseArgs = null;

  client.prototype._resubscribeCache = null;

  client.prototype._serverTimeout = 0;

  client.prototype._sessionId = null;

  client._stateKey = null;

  client.prototype._stateLock = null;

  client.prototype._streamRequestTransfer = null;

  client.prototype._streamRequestUrl = null;

  client.prototype._subscribedChannels = null;

  client.prototype._subscribedChannelsLock = null;

  client.prototype._subscribedDynamicProperties = null;

  client.prototype._subscribedOnReceives = null;

  client.prototype._subscribedOnReceivesLock = null;

  client.prototype._supportedConnectionTypes = null;

  client.prototype._synchronous = null;

  client.prototype._threadCounters = null;

  client.prototype._threadCountersLock = null;

  client.prototype._token = null;

  client.prototype._webSocketOpened = false;

  /*<span id='method-fm.websync.client-fm.websync.client'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.client">fm.websync.client</see> class.
  	 </div>
  	@function fm.websync.client
  	@param {String} requestUrl The absolute URL of the WebSync server request handler for non-streaming requests.
  	@param {String} streamRequestUrl The absolute URL of the WebSync server request handler for streaming requests.
  	@return {}
  */


  function client() {
    this.webSocketStreamFailure = __bind(this.webSocketStreamFailure, this);

    this.webSocketOpenSuccess = __bind(this.webSocketOpenSuccess, this);

    this.webSocketOpenFailure = __bind(this.webSocketOpenFailure, this);

    this.unsubscribe = __bind(this.unsubscribe, this);

    this.unsetCustomOnReceiveWithTag = __bind(this.unsetCustomOnReceiveWithTag, this);

    this.unsetCustomOnReceive = __bind(this.unsetCustomOnReceive, this);

    this.unbind = __bind(this.unbind, this);

    this.tryWebSocket = __bind(this.tryWebSocket, this);

    this.subscribe = __bind(this.subscribe, this);

    this.streamDeferred = __bind(this.streamDeferred, this);

    this.streamCallback = __bind(this.streamCallback, this);

    this.stream = __bind(this.stream, this);

    this.startBatch = __bind(this.startBatch, this);

    this.setToken = __bind(this.setToken, this);

    this.setSynchronous = __bind(this.setSynchronous, this);

    this.setStreamRequestUrl = __bind(this.setStreamRequestUrl, this);

    this.setSessionId = __bind(this.setSessionId, this);

    this.setServerTimeout = __bind(this.setServerTimeout, this);

    this.setIsDisconnecting = __bind(this.setIsDisconnecting, this);

    this.setIsConnecting = __bind(this.setIsConnecting, this);

    this.setIsConnected = __bind(this.setIsConnected, this);

    this.setInstanceId = __bind(this.setInstanceId, this);

    this.setDisableWebSockets = __bind(this.setDisableWebSockets, this);

    this.setCustomOnReceiveWithTag = __bind(this.setCustomOnReceiveWithTag, this);

    this.setCustomOnReceive = __bind(this.setCustomOnReceive, this);

    this.setClientId = __bind(this.setClientId, this);

    this.service = __bind(this.service, this);

    this.sendMany = __bind(this.sendMany, this);

    this.sendCallback = __bind(this.sendCallback, this);

    this.send = __bind(this.send, this);

    this.retryConnectDeferred = __bind(this.retryConnectDeferred, this);

    this.retryConnect = __bind(this.retryConnect, this);

    this.restream = __bind(this.restream, this);

    this.removeSubscribedOnReceive = __bind(this.removeSubscribedOnReceive, this);

    this.removeSubscribedChannels = __bind(this.removeSubscribedChannels, this);

    this.removeOnUnsubscribeSuccess = __bind(this.removeOnUnsubscribeSuccess, this);

    this.removeOnUnsubscribeFailure = __bind(this.removeOnUnsubscribeFailure, this);

    this.removeOnUnsubscribeComplete = __bind(this.removeOnUnsubscribeComplete, this);

    this.removeOnUnbindSuccess = __bind(this.removeOnUnbindSuccess, this);

    this.removeOnUnbindFailure = __bind(this.removeOnUnbindFailure, this);

    this.removeOnUnbindComplete = __bind(this.removeOnUnbindComplete, this);

    this.removeOnSubscribeSuccess = __bind(this.removeOnSubscribeSuccess, this);

    this.removeOnSubscribeFailure = __bind(this.removeOnSubscribeFailure, this);

    this.removeOnSubscribeComplete = __bind(this.removeOnSubscribeComplete, this);

    this.removeOnStreamFailure = __bind(this.removeOnStreamFailure, this);

    this.removeOnServiceSuccess = __bind(this.removeOnServiceSuccess, this);

    this.removeOnServiceFailure = __bind(this.removeOnServiceFailure, this);

    this.removeOnServiceComplete = __bind(this.removeOnServiceComplete, this);

    this.removeOnServerUnsubscribe = __bind(this.removeOnServerUnsubscribe, this);

    this.removeOnServerUnbind = __bind(this.removeOnServerUnbind, this);

    this.removeOnServerSubscribe = __bind(this.removeOnServerSubscribe, this);

    this.removeOnServerBind = __bind(this.removeOnServerBind, this);

    this.removeOnPublishSuccess = __bind(this.removeOnPublishSuccess, this);

    this.removeOnPublishFailure = __bind(this.removeOnPublishFailure, this);

    this.removeOnPublishComplete = __bind(this.removeOnPublishComplete, this);

    this.removeOnNotifySuccess = __bind(this.removeOnNotifySuccess, this);

    this.removeOnNotifyFailure = __bind(this.removeOnNotifyFailure, this);

    this.removeOnNotifyComplete = __bind(this.removeOnNotifyComplete, this);

    this.removeOnNotify = __bind(this.removeOnNotify, this);

    this.removeOnDisconnectComplete = __bind(this.removeOnDisconnectComplete, this);

    this.removeOnConnectSuccess = __bind(this.removeOnConnectSuccess, this);

    this.removeOnConnectFailure = __bind(this.removeOnConnectFailure, this);

    this.removeOnConnectComplete = __bind(this.removeOnConnectComplete, this);

    this.removeOnBindSuccess = __bind(this.removeOnBindSuccess, this);

    this.removeOnBindFailure = __bind(this.removeOnBindFailure, this);

    this.removeOnBindComplete = __bind(this.removeOnBindComplete, this);

    this.removeBoundRecords = __bind(this.removeBoundRecords, this);

    this.reconnect = __bind(this.reconnect, this);

    this.receiveMessage = __bind(this.receiveMessage, this);

    this.raiseUnsubscribeSuccess = __bind(this.raiseUnsubscribeSuccess, this);

    this.raiseUnsubscribeFailure = __bind(this.raiseUnsubscribeFailure, this);

    this.raiseUnsubscribeComplete = __bind(this.raiseUnsubscribeComplete, this);

    this.raiseUnbindSuccess = __bind(this.raiseUnbindSuccess, this);

    this.raiseUnbindFailure = __bind(this.raiseUnbindFailure, this);

    this.raiseUnbindComplete = __bind(this.raiseUnbindComplete, this);

    this.raiseSubscribeSuccess = __bind(this.raiseSubscribeSuccess, this);

    this.raiseSubscribeFailure = __bind(this.raiseSubscribeFailure, this);

    this.raiseSubscribeDelivery = __bind(this.raiseSubscribeDelivery, this);

    this.raiseSubscribeComplete = __bind(this.raiseSubscribeComplete, this);

    this.raiseStreamFailure = __bind(this.raiseStreamFailure, this);

    this.raiseServiceSuccess = __bind(this.raiseServiceSuccess, this);

    this.raiseServiceFailure = __bind(this.raiseServiceFailure, this);

    this.raiseServiceComplete = __bind(this.raiseServiceComplete, this);

    this.raiseServerUnsubscribe = __bind(this.raiseServerUnsubscribe, this);

    this.raiseServerUnbind = __bind(this.raiseServerUnbind, this);

    this.raiseServerSubscribe = __bind(this.raiseServerSubscribe, this);

    this.raiseServerBind = __bind(this.raiseServerBind, this);

    this.raiseSendException = __bind(this.raiseSendException, this);

    this.raiseRetriable = __bind(this.raiseRetriable, this);

    this.raiseResponseEvent = __bind(this.raiseResponseEvent, this);

    this.raiseRequestEvent = __bind(this.raiseRequestEvent, this);

    this.raisePublishSuccess = __bind(this.raisePublishSuccess, this);

    this.raisePublishFailure = __bind(this.raisePublishFailure, this);

    this.raisePublishComplete = __bind(this.raisePublishComplete, this);

    this.raiseNotifySuccess = __bind(this.raiseNotifySuccess, this);

    this.raiseNotifyFailure = __bind(this.raiseNotifyFailure, this);

    this.raiseNotifyDelivery = __bind(this.raiseNotifyDelivery, this);

    this.raiseNotifyComplete = __bind(this.raiseNotifyComplete, this);

    this.raiseFunctionManual = __bind(this.raiseFunctionManual, this);

    this.raiseFunction = __bind(this.raiseFunction, this);

    this.raiseForcedUnsubscribes = __bind(this.raiseForcedUnsubscribes, this);

    this.raiseForcedUnbinds = __bind(this.raiseForcedUnbinds, this);

    this.raiseEvent = __bind(this.raiseEvent, this);

    this.raiseDisconnectComplete = __bind(this.raiseDisconnectComplete, this);

    this.raiseConnectSuccess = __bind(this.raiseConnectSuccess, this);

    this.raiseConnectFailure = __bind(this.raiseConnectFailure, this);

    this.raiseConnectComplete = __bind(this.raiseConnectComplete, this);

    this.raiseCompleteEvent = __bind(this.raiseCompleteEvent, this);

    this.raiseBindSuccess = __bind(this.raiseBindSuccess, this);

    this.raiseBindFailure = __bind(this.raiseBindFailure, this);

    this.raiseBindComplete = __bind(this.raiseBindComplete, this);

    this.raiseActionManual = __bind(this.raiseActionManual, this);

    this.raiseAction = __bind(this.raiseAction, this);

    this.publish = __bind(this.publish, this);

    this.processServerAction = __bind(this.processServerAction, this);

    this.processRequestUrl = __bind(this.processRequestUrl, this);

    this.processQueue = __bind(this.processQueue, this);

    this.processPendingReceives = __bind(this.processPendingReceives, this);

    this.processAdvice = __bind(this.processAdvice, this);

    this.preRaise = __bind(this.preRaise, this);

    this.postRaise = __bind(this.postRaise, this);

    this.performUnsubscribeCallback = __bind(this.performUnsubscribeCallback, this);

    this.performUnsubscribe = __bind(this.performUnsubscribe, this);

    this.performUnbindCallback = __bind(this.performUnbindCallback, this);

    this.performUnbind = __bind(this.performUnbind, this);

    this.performSubscribeCallback = __bind(this.performSubscribeCallback, this);

    this.performSubscribe = __bind(this.performSubscribe, this);

    this.performServiceCallback = __bind(this.performServiceCallback, this);

    this.performService = __bind(this.performService, this);

    this.performPublishCallback = __bind(this.performPublishCallback, this);

    this.performPublish = __bind(this.performPublish, this);

    this.performNotifyCallback = __bind(this.performNotifyCallback, this);

    this.performNotify = __bind(this.performNotify, this);

    this.performDisconnectCallback = __bind(this.performDisconnectCallback, this);

    this.performDisconnect = __bind(this.performDisconnect, this);

    this.performConnectCallback = __bind(this.performConnectCallback, this);

    this.performConnect = __bind(this.performConnect, this);

    this.performBindCallback = __bind(this.performBindCallback, this);

    this.performBind = __bind(this.performBind, this);

    this.notify = __bind(this.notify, this);

    this.initialize = __bind(this.initialize, this);

    this.inCallback = __bind(this.inCallback, this);

    this.inBatch = __bind(this.inBatch, this);

    this.getToken = __bind(this.getToken, this);

    this.getThreadId = __bind(this.getThreadId, this);

    this.getSynchronous = __bind(this.getSynchronous, this);

    this.getSubscribedChannels = __bind(this.getSubscribedChannels, this);

    this.getStreamRequestUrl = __bind(this.getStreamRequestUrl, this);

    this.getStreamRequestTimeout = __bind(this.getStreamRequestTimeout, this);

    this.getSessionId = __bind(this.getSessionId, this);

    this.getServerTimeout = __bind(this.getServerTimeout, this);

    this.getIsDisconnecting = __bind(this.getIsDisconnecting, this);

    this.getIsConnecting = __bind(this.getIsConnecting, this);

    this.getIsConnected = __bind(this.getIsConnected, this);

    this.getInstanceId = __bind(this.getInstanceId, this);

    this.getDisableWebSockets = __bind(this.getDisableWebSockets, this);

    this.getCustomOnReceiveWithTag = __bind(this.getCustomOnReceiveWithTag, this);

    this.getCustomOnReceive = __bind(this.getCustomOnReceive, this);

    this.getClientId = __bind(this.getClientId, this);

    this.getBoundRecords = __bind(this.getBoundRecords, this);

    this.endBatch = __bind(this.endBatch, this);

    this.doLongPolling = __bind(this.doLongPolling, this);

    this.disconnect = __bind(this.disconnect, this);

    this.connect = __bind(this.connect, this);

    this.clearSubscribedChannels = __bind(this.clearSubscribedChannels, this);

    this.clearBoundRecords = __bind(this.clearBoundRecords, this);

    this.checkSynchronous = __bind(this.checkSynchronous, this);

    this.bind = __bind(this.bind, this);

    this.addToQueue = __bind(this.addToQueue, this);

    this.addSubscribedOnReceive = __bind(this.addSubscribedOnReceive, this);

    this.addSubscribedChannels = __bind(this.addSubscribedChannels, this);

    this.addOnUnsubscribeSuccess = __bind(this.addOnUnsubscribeSuccess, this);

    this.addOnUnsubscribeFailure = __bind(this.addOnUnsubscribeFailure, this);

    this.addOnUnsubscribeComplete = __bind(this.addOnUnsubscribeComplete, this);

    this.addOnUnbindSuccess = __bind(this.addOnUnbindSuccess, this);

    this.addOnUnbindFailure = __bind(this.addOnUnbindFailure, this);

    this.addOnUnbindComplete = __bind(this.addOnUnbindComplete, this);

    this.addOnSubscribeSuccess = __bind(this.addOnSubscribeSuccess, this);

    this.addOnSubscribeFailure = __bind(this.addOnSubscribeFailure, this);

    this.addOnSubscribeComplete = __bind(this.addOnSubscribeComplete, this);

    this.addOnStreamFailure = __bind(this.addOnStreamFailure, this);

    this.addOnServiceSuccess = __bind(this.addOnServiceSuccess, this);

    this.addOnServiceFailure = __bind(this.addOnServiceFailure, this);

    this.addOnServiceComplete = __bind(this.addOnServiceComplete, this);

    this.addOnServerUnsubscribe = __bind(this.addOnServerUnsubscribe, this);

    this.addOnServerUnbind = __bind(this.addOnServerUnbind, this);

    this.addOnServerSubscribe = __bind(this.addOnServerSubscribe, this);

    this.addOnServerBind = __bind(this.addOnServerBind, this);

    this.addOnPublishSuccess = __bind(this.addOnPublishSuccess, this);

    this.addOnPublishFailure = __bind(this.addOnPublishFailure, this);

    this.addOnPublishComplete = __bind(this.addOnPublishComplete, this);

    this.addOnNotifySuccess = __bind(this.addOnNotifySuccess, this);

    this.addOnNotifyFailure = __bind(this.addOnNotifyFailure, this);

    this.addOnNotifyComplete = __bind(this.addOnNotifyComplete, this);

    this.addOnNotify = __bind(this.addOnNotify, this);

    this.addOnDisconnectComplete = __bind(this.addOnDisconnectComplete, this);

    this.addOnConnectSuccess = __bind(this.addOnConnectSuccess, this);

    this.addOnConnectFailure = __bind(this.addOnConnectFailure, this);

    this.addOnConnectComplete = __bind(this.addOnConnectComplete, this);

    this.addOnBindSuccess = __bind(this.addOnBindSuccess, this);

    this.addOnBindFailure = __bind(this.addOnBindFailure, this);

    this.addOnBindComplete = __bind(this.addOnBindComplete, this);

    this.addBoundRecords = __bind(this.addBoundRecords, this);

    this.activateStream = __bind(this.activateStream, this);

    var requestUrl, streamRequestUrl;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      client.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 2) {
      requestUrl = arguments[0];
      streamRequestUrl = arguments[1];
      client.__super__.constructor.call(this, requestUrl);
      this._counter = 0;
      this._lastBackoffTimeout = 0;
      this._lastBackoffIndex = -1;
      this._threadCounters = {};
      this._threadCountersLock = new fm.object();
      this._lastInterval = 0;
      this._lastReconnect = null;
      this._connectArgs = null;
      this._responseArgs = null;
      this._reconnectCacheLock = new fm.object();
      this._reconnectCache = [];
      this._rebindCache = {};
      this._resubscribeCache = {};
      this._boundRecordsLock = new fm.object();
      this._boundRecords = {};
      this._subscribedChannelsLock = new fm.object();
      this._subscribedChannels = {};
      this._subscribedOnReceivesLock = new fm.object();
      this._subscribedOnReceives = {};
      this._subscribedDynamicProperties = {};
      this._pendingReceives = {};
      this._customOnReceivesLock = new fm.object();
      this._customOnReceives = {};
      this._stateLock = new fm.object();
      this._queueLock = new fm.object();
      this._queueActivated = false;
      this._requestQueue = {};
      this._supportedConnectionTypes = new Array(0);
      this._connectionType = fm.websync.connectionType.LongPolling;
      this._batchCounter = 0;
      this._batchCounterLock = new fm.object();
      this._webSocketOpened = false;
      this._counterLock = new fm.object();
      this.initialize(streamRequestUrl);
      return;
    }
    if (arguments.length === 1) {
      requestUrl = arguments[0];
      client.call(this, requestUrl, requestUrl);
      return;
    }
  }

  /*<span id='method-fm.websync.client-addOnBindEnd'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> bind ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function addOnBindEnd
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnBindEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onBindEnd = fm.delegate.combine(fm.websync.client._onBindEnd, value);
  };

  /*<span id='method-fm.websync.client-addOnBindRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> bind request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnBindRequest
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnBindRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onBindRequest = fm.delegate.combine(fm.websync.client._onBindRequest, value);
  };

  /*<span id='method-fm.websync.client-addOnBindResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> bind response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnBindResponse
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnBindResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onBindResponse = fm.delegate.combine(fm.websync.client._onBindResponse, value);
  };

  /*<span id='method-fm.websync.client-addOnConnectEnd'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> connect ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function addOnConnectEnd
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnConnectEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onConnectEnd = fm.delegate.combine(fm.websync.client._onConnectEnd, value);
  };

  /*<span id='method-fm.websync.client-addOnConnectRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> connect request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnConnectRequest
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnConnectRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onConnectRequest = fm.delegate.combine(fm.websync.client._onConnectRequest, value);
  };

  /*<span id='method-fm.websync.client-addOnConnectResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> connect response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnConnectResponse
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnConnectResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onConnectResponse = fm.delegate.combine(fm.websync.client._onConnectResponse, value);
  };

  /*<span id='method-fm.websync.client-addOnDisconnectEnd'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> disconnect ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function addOnDisconnectEnd
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnDisconnectEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onDisconnectEnd = fm.delegate.combine(fm.websync.client._onDisconnectEnd, value);
  };

  /*<span id='method-fm.websync.client-addOnDisconnectRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> disconnect request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnDisconnectRequest
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnDisconnectRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onDisconnectRequest = fm.delegate.combine(fm.websync.client._onDisconnectRequest, value);
  };

  /*<span id='method-fm.websync.client-addOnDisconnectResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> disconnect response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnDisconnectResponse
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnDisconnectResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onDisconnectResponse = fm.delegate.combine(fm.websync.client._onDisconnectResponse, value);
  };

  /*<span id='method-fm.websync.client-addOnNotifyEnd'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> notify ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function addOnNotifyEnd
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnNotifyEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onNotifyEnd = fm.delegate.combine(fm.websync.client._onNotifyEnd, value);
  };

  /*<span id='method-fm.websync.client-addOnNotifyRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> notify request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnNotifyRequest
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnNotifyRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onNotifyRequest = fm.delegate.combine(fm.websync.client._onNotifyRequest, value);
  };

  /*<span id='method-fm.websync.client-addOnNotifyResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> notify response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnNotifyResponse
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnNotifyResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onNotifyResponse = fm.delegate.combine(fm.websync.client._onNotifyResponse, value);
  };

  /*<span id='method-fm.websync.client-addOnPublishEnd'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> publish ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function addOnPublishEnd
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnPublishEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onPublishEnd = fm.delegate.combine(fm.websync.client._onPublishEnd, value);
  };

  /*<span id='method-fm.websync.client-addOnPublishRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> publish request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnPublishRequest
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnPublishRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onPublishRequest = fm.delegate.combine(fm.websync.client._onPublishRequest, value);
  };

  /*<span id='method-fm.websync.client-addOnPublishResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> publish response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnPublishResponse
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnPublishResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onPublishResponse = fm.delegate.combine(fm.websync.client._onPublishResponse, value);
  };

  /*<span id='method-fm.websync.client-addOnServiceEnd'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> service ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function addOnServiceEnd
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnServiceEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onServiceEnd = fm.delegate.combine(fm.websync.client._onServiceEnd, value);
  };

  /*<span id='method-fm.websync.client-addOnServiceRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> service request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnServiceRequest
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnServiceRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onServiceRequest = fm.delegate.combine(fm.websync.client._onServiceRequest, value);
  };

  /*<span id='method-fm.websync.client-addOnServiceResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> service response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnServiceResponse
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnServiceResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onServiceResponse = fm.delegate.combine(fm.websync.client._onServiceResponse, value);
  };

  /*<span id='method-fm.websync.client-addOnSubscribeEnd'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> subscribe ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function addOnSubscribeEnd
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnSubscribeEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onSubscribeEnd = fm.delegate.combine(fm.websync.client._onSubscribeEnd, value);
  };

  /*<span id='method-fm.websync.client-addOnSubscribeRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> subscribe request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnSubscribeRequest
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnSubscribeRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onSubscribeRequest = fm.delegate.combine(fm.websync.client._onSubscribeRequest, value);
  };

  /*<span id='method-fm.websync.client-addOnSubscribeResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> subscribe response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnSubscribeResponse
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnSubscribeResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onSubscribeResponse = fm.delegate.combine(fm.websync.client._onSubscribeResponse, value);
  };

  /*<span id='method-fm.websync.client-addOnUnbindEnd'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> unbind ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function addOnUnbindEnd
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnUnbindEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnbindEnd = fm.delegate.combine(fm.websync.client._onUnbindEnd, value);
  };

  /*<span id='method-fm.websync.client-addOnUnbindRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> unbind request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnUnbindRequest
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnUnbindRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnbindRequest = fm.delegate.combine(fm.websync.client._onUnbindRequest, value);
  };

  /*<span id='method-fm.websync.client-addOnUnbindResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> unbind response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnUnbindResponse
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnUnbindResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnbindResponse = fm.delegate.combine(fm.websync.client._onUnbindResponse, value);
  };

  /*<span id='method-fm.websync.client-addOnUnsubscribeEnd'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> unsubscribe ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function addOnUnsubscribeEnd
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnUnsubscribeEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnsubscribeEnd = fm.delegate.combine(fm.websync.client._onUnsubscribeEnd, value);
  };

  /*<span id='method-fm.websync.client-addOnUnsubscribeRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> unsubscribe request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnUnsubscribeRequest
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnUnsubscribeRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnsubscribeRequest = fm.delegate.combine(fm.websync.client._onUnsubscribeRequest, value);
  };

  /*<span id='method-fm.websync.client-addOnUnsubscribeResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> unsubscribe response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnUnsubscribeResponse
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.addOnUnsubscribeResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnsubscribeResponse = fm.delegate.combine(fm.websync.client._onUnsubscribeResponse, value);
  };

  /*<span id='method-fm.websync.client-generateToken'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Generates a new token based on the current date/time.
  	 </div>
  	@function generateToken
  	@return {String} The generated token.
  */


  client.generateToken = function() {
    var str;
    str = fm.intExtensions.toString(fm.dateTime.getUtcNow().getTicks());
    return fm.stringExtensions.substring(str, str.length - 12, 8);
  };

  client.getChannelForPublish = function() {
    var publishArgs, response, _var0, _var1;
    response = arguments[0];
    publishArgs = arguments[1];
    _var0 = response;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return publishArgs.__channel;
    }
    _var1 = response.getChannel();
    if (_var1 === null || typeof _var1 === 'undefined') {
      return publishArgs.__channel;
    }
    return response.getChannel();
  };

  client.getChannelForService = function() {
    var response, serviceArgs, _var0, _var1;
    response = arguments[0];
    serviceArgs = arguments[1];
    _var0 = response;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return serviceArgs.__channel;
    }
    _var1 = response.getChannel();
    if (_var1 === null || typeof _var1 === 'undefined') {
      return serviceArgs.__channel;
    }
    return response.getChannel();
  };

  client.getChannelsForSubscribe = function() {
    var response, subscribeArgs, _var0, _var1;
    response = arguments[0];
    subscribeArgs = arguments[1];
    _var0 = response;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return subscribeArgs.__channels;
    }
    _var1 = response.getChannels();
    if (_var1 === null || typeof _var1 === 'undefined') {
      return subscribeArgs.__channels;
    }
    return response.getChannels();
  };

  client.getChannelsForUnsubscribe = function() {
    var response, unsubscribeArgs, _var0, _var1;
    response = arguments[0];
    unsubscribeArgs = arguments[1];
    _var0 = response;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return unsubscribeArgs.__channels;
    }
    _var1 = response.getChannels();
    if (_var1 === null || typeof _var1 === 'undefined') {
      return unsubscribeArgs.__channels;
    }
    return response.getChannels();
  };

  client.getDataBytesForNotify = function() {
    var notifyArgs, response, _var0, _var1;
    response = arguments[0];
    notifyArgs = arguments[1];
    _var0 = response;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return notifyArgs.__dataBytes;
    }
    _var1 = response.getDataBytes();
    if (_var1 === null || typeof _var1 === 'undefined') {
      return notifyArgs.__dataBytes;
    }
    return response.getDataBytes();
  };

  client.getDataBytesForPublish = function() {
    var publishArgs, response, _var0, _var1;
    response = arguments[0];
    publishArgs = arguments[1];
    _var0 = response;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return publishArgs.__dataBytes;
    }
    _var1 = response.getDataBytes();
    if (_var1 === null || typeof _var1 === 'undefined') {
      return publishArgs.__dataBytes;
    }
    return response.getDataBytes();
  };

  client.getDataBytesForService = function() {
    var response, serviceArgs, _var0, _var1;
    response = arguments[0];
    serviceArgs = arguments[1];
    _var0 = response;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return serviceArgs.__dataBytes;
    }
    _var1 = response.getDataBytes();
    if (_var1 === null || typeof _var1 === 'undefined') {
      return serviceArgs.__dataBytes;
    }
    return response.getDataBytes();
  };

  client.getDataJsonForNotify = function() {
    var notifyArgs, response, _var0, _var1;
    response = arguments[0];
    notifyArgs = arguments[1];
    _var0 = response;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return notifyArgs.__dataJson;
    }
    _var1 = response.getDataJson();
    if (_var1 === null || typeof _var1 === 'undefined') {
      return notifyArgs.__dataJson;
    }
    return response.getDataJson();
  };

  client.getDataJsonForPublish = function() {
    var publishArgs, response, _var0, _var1;
    response = arguments[0];
    publishArgs = arguments[1];
    _var0 = response;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return publishArgs.__dataJson;
    }
    _var1 = response.getDataJson();
    if (_var1 === null || typeof _var1 === 'undefined') {
      return publishArgs.__dataJson;
    }
    return response.getDataJson();
  };

  client.getDataJsonForService = function() {
    var response, serviceArgs, _var0, _var1;
    response = arguments[0];
    serviceArgs = arguments[1];
    _var0 = response;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return serviceArgs.__dataJson;
    }
    _var1 = response.getDataJson();
    if (_var1 === null || typeof _var1 === 'undefined') {
      return serviceArgs.__dataJson;
    }
    return response.getDataJson();
  };

  client.getExtensions = function() {
    var methodArgs, response, _var0;
    response = arguments[0];
    methodArgs = arguments[1];
    _var0 = response;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return response.getExtensions();
    }
    return methodArgs.getExtensions();
  };

  client.getRecordsForBind = function() {
    var bindArgs, response, _var0, _var1;
    response = arguments[0];
    bindArgs = arguments[1];
    _var0 = response;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return bindArgs.__records;
    }
    _var1 = response.getRecords();
    if (_var1 === null || typeof _var1 === 'undefined') {
      return bindArgs.__records;
    }
    return response.getRecords();
  };

  client.getRecordsForUnbind = function() {
    var response, unbindArgs, _var0, _var1;
    response = arguments[0];
    unbindArgs = arguments[1];
    _var0 = response;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return unbindArgs.__records;
    }
    _var1 = response.getRecords();
    if (_var1 === null || typeof _var1 === 'undefined') {
      return unbindArgs.__records;
    }
    return response.getRecords();
  };

  client.getSubscribeKey = function() {
    var channel, tag, _var0;
    channel = arguments[0];
    tag = arguments[1];
    _var0 = tag;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return fm.stringExtensions.format("-1|{0}", channel);
    }
    return fm.stringExtensions.format("{0}|{1}{2}", fm.intExtensions.toString(tag.length), tag, channel);
  };

  client.getTimestamp = function() {
    var response, _var0;
    response = arguments[0];
    _var0 = response;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return response.getTimestamp();
    }
    return null;
  };

  /*<span id='method-fm.websync.client-removeOnBindEnd'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> bind ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function removeOnBindEnd
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnBindEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onBindEnd = fm.delegate.remove(fm.websync.client._onBindEnd, value);
  };

  /*<span id='method-fm.websync.client-removeOnBindRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> bind request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnBindRequest
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnBindRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onBindRequest = fm.delegate.remove(fm.websync.client._onBindRequest, value);
  };

  /*<span id='method-fm.websync.client-removeOnBindResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> bind response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnBindResponse
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnBindResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onBindResponse = fm.delegate.remove(fm.websync.client._onBindResponse, value);
  };

  /*<span id='method-fm.websync.client-removeOnConnectEnd'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> connect ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function removeOnConnectEnd
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnConnectEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onConnectEnd = fm.delegate.remove(fm.websync.client._onConnectEnd, value);
  };

  /*<span id='method-fm.websync.client-removeOnConnectRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> connect request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnConnectRequest
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnConnectRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onConnectRequest = fm.delegate.remove(fm.websync.client._onConnectRequest, value);
  };

  /*<span id='method-fm.websync.client-removeOnConnectResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> connect response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnConnectResponse
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnConnectResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onConnectResponse = fm.delegate.remove(fm.websync.client._onConnectResponse, value);
  };

  /*<span id='method-fm.websync.client-removeOnDisconnectEnd'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> disconnect ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function removeOnDisconnectEnd
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnDisconnectEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onDisconnectEnd = fm.delegate.remove(fm.websync.client._onDisconnectEnd, value);
  };

  /*<span id='method-fm.websync.client-removeOnDisconnectRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> disconnect request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnDisconnectRequest
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnDisconnectRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onDisconnectRequest = fm.delegate.remove(fm.websync.client._onDisconnectRequest, value);
  };

  /*<span id='method-fm.websync.client-removeOnDisconnectResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> disconnect response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnDisconnectResponse
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnDisconnectResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onDisconnectResponse = fm.delegate.remove(fm.websync.client._onDisconnectResponse, value);
  };

  /*<span id='method-fm.websync.client-removeOnNotifyEnd'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> notify ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function removeOnNotifyEnd
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnNotifyEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onNotifyEnd = fm.delegate.remove(fm.websync.client._onNotifyEnd, value);
  };

  /*<span id='method-fm.websync.client-removeOnNotifyRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> notify request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnNotifyRequest
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnNotifyRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onNotifyRequest = fm.delegate.remove(fm.websync.client._onNotifyRequest, value);
  };

  /*<span id='method-fm.websync.client-removeOnNotifyResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> notify response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnNotifyResponse
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnNotifyResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onNotifyResponse = fm.delegate.remove(fm.websync.client._onNotifyResponse, value);
  };

  /*<span id='method-fm.websync.client-removeOnPublishEnd'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> publish ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function removeOnPublishEnd
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnPublishEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onPublishEnd = fm.delegate.remove(fm.websync.client._onPublishEnd, value);
  };

  /*<span id='method-fm.websync.client-removeOnPublishRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> publish request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnPublishRequest
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnPublishRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onPublishRequest = fm.delegate.remove(fm.websync.client._onPublishRequest, value);
  };

  /*<span id='method-fm.websync.client-removeOnPublishResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> publish response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnPublishResponse
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnPublishResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onPublishResponse = fm.delegate.remove(fm.websync.client._onPublishResponse, value);
  };

  /*<span id='method-fm.websync.client-removeOnServiceEnd'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> service ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function removeOnServiceEnd
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnServiceEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onServiceEnd = fm.delegate.remove(fm.websync.client._onServiceEnd, value);
  };

  /*<span id='method-fm.websync.client-removeOnServiceRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> service request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnServiceRequest
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnServiceRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onServiceRequest = fm.delegate.remove(fm.websync.client._onServiceRequest, value);
  };

  /*<span id='method-fm.websync.client-removeOnServiceResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> service response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnServiceResponse
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnServiceResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onServiceResponse = fm.delegate.remove(fm.websync.client._onServiceResponse, value);
  };

  /*<span id='method-fm.websync.client-removeOnSubscribeEnd'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> subscribe ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function removeOnSubscribeEnd
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnSubscribeEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onSubscribeEnd = fm.delegate.remove(fm.websync.client._onSubscribeEnd, value);
  };

  /*<span id='method-fm.websync.client-removeOnSubscribeRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> subscribe request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnSubscribeRequest
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnSubscribeRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onSubscribeRequest = fm.delegate.remove(fm.websync.client._onSubscribeRequest, value);
  };

  /*<span id='method-fm.websync.client-removeOnSubscribeResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> subscribe response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnSubscribeResponse
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnSubscribeResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onSubscribeResponse = fm.delegate.remove(fm.websync.client._onSubscribeResponse, value);
  };

  /*<span id='method-fm.websync.client-removeOnUnbindEnd'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> unbind ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function removeOnUnbindEnd
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnUnbindEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnbindEnd = fm.delegate.remove(fm.websync.client._onUnbindEnd, value);
  };

  /*<span id='method-fm.websync.client-removeOnUnbindRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> unbind request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnUnbindRequest
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnUnbindRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnbindRequest = fm.delegate.remove(fm.websync.client._onUnbindRequest, value);
  };

  /*<span id='method-fm.websync.client-removeOnUnbindResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> unbind response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnUnbindResponse
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnUnbindResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnbindResponse = fm.delegate.remove(fm.websync.client._onUnbindResponse, value);
  };

  /*<span id='method-fm.websync.client-removeOnUnsubscribeEnd'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> unsubscribe ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function removeOnUnsubscribeEnd
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnUnsubscribeEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnsubscribeEnd = fm.delegate.remove(fm.websync.client._onUnsubscribeEnd, value);
  };

  /*<span id='method-fm.websync.client-removeOnUnsubscribeRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> unsubscribe request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnUnsubscribeRequest
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnUnsubscribeRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnsubscribeRequest = fm.delegate.remove(fm.websync.client._onUnsubscribeRequest, value);
  };

  /*<span id='method-fm.websync.client-removeOnUnsubscribeResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> unsubscribe response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnUnsubscribeResponse
  	@param {fm.doubleAction} value
  	@return {void}
  */


  client.removeOnUnsubscribeResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnsubscribeResponse = fm.delegate.remove(fm.websync.client._onUnsubscribeResponse, value);
  };

  client.prototype.activateStream = function() {
    var args, connectArgs, responseArgs;
    connectArgs = arguments[0];
    responseArgs = arguments[1];
    this.raiseConnectSuccess(this._connectArgs, this._responseArgs);
    this.raiseConnectComplete(this._connectArgs, this._responseArgs);
    args = new fm.websync.clientConnectEndArgs();
    args.setMethodArgs(connectArgs);
    this.raiseCompleteEvent(fm.websync.client._onConnectEnd, args, "OnConnectEnd", responseArgs);
    this.processQueue(true);
    return this.stream(this._connectArgs, false);
  };

  client.prototype.addBoundRecords = function() {
    var record, records, _i, _len, _results, _var0;
    records = arguments[0];
    _var0 = records;
    _results = [];
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      record = _var0[_i];
      _results.push(this._boundRecords[record.getKey()] = record);
    }
    return _results;
  };

  /*<span id='method-fm.websync.client-addOnBindComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client completes a bind, successfully or not.
  	 </div>
  
  	@function addOnBindComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnBindComplete = function() {
    var value;
    value = arguments[0];
    return this._onBindComplete = fm.delegate.combine(this._onBindComplete, value);
  };

  /*<span id='method-fm.websync.client-addOnBindFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client fails to bind.
  	 </div>
  
  	@function addOnBindFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnBindFailure = function() {
    var value;
    value = arguments[0];
    return this._onBindFailure = fm.delegate.combine(this._onBindFailure, value);
  };

  /*<span id='method-fm.websync.client-addOnBindSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client successfully binds.
  	 </div>
  
  	@function addOnBindSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnBindSuccess = function() {
    var value;
    value = arguments[0];
    return this._onBindSuccess = fm.delegate.combine(this._onBindSuccess, value);
  };

  /*<span id='method-fm.websync.client-addOnConnectComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client completes a connect, successfully or not.
  	 </div>
  
  	@function addOnConnectComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnConnectComplete = function() {
    var value;
    value = arguments[0];
    return this._onConnectComplete = fm.delegate.combine(this._onConnectComplete, value);
  };

  /*<span id='method-fm.websync.client-addOnConnectFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client fails to connect.
  	 </div>
  
  	@function addOnConnectFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnConnectFailure = function() {
    var value;
    value = arguments[0];
    return this._onConnectFailure = fm.delegate.combine(this._onConnectFailure, value);
  };

  /*<span id='method-fm.websync.client-addOnConnectSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client successfully connects.
  	 </div>
  
  	@function addOnConnectSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnConnectSuccess = function() {
    var value;
    value = arguments[0];
    return this._onConnectSuccess = fm.delegate.combine(this._onConnectSuccess, value);
  };

  /*<span id='method-fm.websync.client-addOnDisconnectComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client completes a disconnect.
  	 </div>
  
  	@function addOnDisconnectComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnDisconnectComplete = function() {
    var value;
    value = arguments[0];
    return this._onDisconnectComplete = fm.delegate.combine(this._onDisconnectComplete, value);
  };

  /*<span id='method-fm.websync.client-addOnNotify'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a notification is sent to this client.
  	 </div>
  
  	@function addOnNotify
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnNotify = function() {
    var value;
    value = arguments[0];
    return this._onNotify = fm.delegate.combine(this._onNotify, value);
  };

  /*<span id='method-fm.websync.client-addOnNotifyComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client completes a notify, successfully or not.
  	 </div>
  
  	@function addOnNotifyComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnNotifyComplete = function() {
    var value;
    value = arguments[0];
    return this._onNotifyComplete = fm.delegate.combine(this._onNotifyComplete, value);
  };

  /*<span id='method-fm.websync.client-addOnNotifyFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client fails to notify.
  	 </div>
  
  	@function addOnNotifyFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnNotifyFailure = function() {
    var value;
    value = arguments[0];
    return this._onNotifyFailure = fm.delegate.combine(this._onNotifyFailure, value);
  };

  /*<span id='method-fm.websync.client-addOnNotifySuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client successfully notifies.
  	 </div>
  
  	@function addOnNotifySuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnNotifySuccess = function() {
    var value;
    value = arguments[0];
    return this._onNotifySuccess = fm.delegate.combine(this._onNotifySuccess, value);
  };

  /*<span id='method-fm.websync.client-addOnPublishComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client completes a publish, successfully or not.
  	 </div>
  
  	@function addOnPublishComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnPublishComplete = function() {
    var value;
    value = arguments[0];
    return this._onPublishComplete = fm.delegate.combine(this._onPublishComplete, value);
  };

  /*<span id='method-fm.websync.client-addOnPublishFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client fails to publish.
  	 </div>
  
  	@function addOnPublishFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnPublishFailure = function() {
    var value;
    value = arguments[0];
    return this._onPublishFailure = fm.delegate.combine(this._onPublishFailure, value);
  };

  /*<span id='method-fm.websync.client-addOnPublishSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client successfully publishes.
  	 </div>
  
  	@function addOnPublishSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnPublishSuccess = function() {
    var value;
    value = arguments[0];
    return this._onPublishSuccess = fm.delegate.combine(this._onPublishSuccess, value);
  };

  /*<span id='method-fm.websync.client-addOnServerBind'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever the server binds
  	 the client to a record or set of records.
  	 </div>
  
  	@function addOnServerBind
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnServerBind = function() {
    var value;
    value = arguments[0];
    return this._onServerBind = fm.delegate.combine(this._onServerBind, value);
  };

  /*<span id='method-fm.websync.client-addOnServerSubscribe'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever the server subscribes
  	 the client to a channel or set of channels.
  	 </div>
  
  	@function addOnServerSubscribe
  	@param {fm.singleFunction} value
  	@return {void}
  */


  client.prototype.addOnServerSubscribe = function() {
    var value;
    value = arguments[0];
    return this._onServerSubscribe = fm.delegate.combine(this._onServerSubscribe, value);
  };

  /*<span id='method-fm.websync.client-addOnServerUnbind'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever the server unbinds
  	 the client from a record or set of records.
  	 </div>
  
  	@function addOnServerUnbind
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnServerUnbind = function() {
    var value;
    value = arguments[0];
    return this._onServerUnbind = fm.delegate.combine(this._onServerUnbind, value);
  };

  /*<span id='method-fm.websync.client-addOnServerUnsubscribe'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever the server unsubscribes
  	 the client from a channel or set of channels.
  	 </div>
  
  	@function addOnServerUnsubscribe
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnServerUnsubscribe = function() {
    var value;
    value = arguments[0];
    return this._onServerUnsubscribe = fm.delegate.combine(this._onServerUnsubscribe, value);
  };

  /*<span id='method-fm.websync.client-addOnServiceComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client completes a service, successfully or not.
  	 </div>
  
  	@function addOnServiceComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnServiceComplete = function() {
    var value;
    value = arguments[0];
    return this._onServiceComplete = fm.delegate.combine(this._onServiceComplete, value);
  };

  /*<span id='method-fm.websync.client-addOnServiceFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client fails to service.
  	 </div>
  
  	@function addOnServiceFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnServiceFailure = function() {
    var value;
    value = arguments[0];
    return this._onServiceFailure = fm.delegate.combine(this._onServiceFailure, value);
  };

  /*<span id='method-fm.websync.client-addOnServiceSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client successfully services.
  	 </div>
  
  	@function addOnServiceSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnServiceSuccess = function() {
    var value;
    value = arguments[0];
    return this._onServiceSuccess = fm.delegate.combine(this._onServiceSuccess, value);
  };

  /*<span id='method-fm.websync.client-addOnStreamFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever the client's streaming connection breaks down.
  	 </div>
  
  	@function addOnStreamFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnStreamFailure = function() {
    var value;
    value = arguments[0];
    return this._onStreamFailure = fm.delegate.combine(this._onStreamFailure, value);
  };

  /*<span id='method-fm.websync.client-addOnSubscribeComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client completes a subscribe, successfully or not.
  	 </div>
  
  	@function addOnSubscribeComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnSubscribeComplete = function() {
    var value;
    value = arguments[0];
    return this._onSubscribeComplete = fm.delegate.combine(this._onSubscribeComplete, value);
  };

  /*<span id='method-fm.websync.client-addOnSubscribeFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client fails to subscribe.
  	 </div>
  
  	@function addOnSubscribeFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnSubscribeFailure = function() {
    var value;
    value = arguments[0];
    return this._onSubscribeFailure = fm.delegate.combine(this._onSubscribeFailure, value);
  };

  /*<span id='method-fm.websync.client-addOnSubscribeSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client successfully subscribes.
  	 </div>
  
  	@function addOnSubscribeSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnSubscribeSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSubscribeSuccess = fm.delegate.combine(this._onSubscribeSuccess, value);
  };

  /*<span id='method-fm.websync.client-addOnUnbindComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client completes an unbind, successfully or not.
  	 </div>
  
  	@function addOnUnbindComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnUnbindComplete = function() {
    var value;
    value = arguments[0];
    return this._onUnbindComplete = fm.delegate.combine(this._onUnbindComplete, value);
  };

  /*<span id='method-fm.websync.client-addOnUnbindFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client fails to unbind.
  	 </div>
  
  	@function addOnUnbindFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnUnbindFailure = function() {
    var value;
    value = arguments[0];
    return this._onUnbindFailure = fm.delegate.combine(this._onUnbindFailure, value);
  };

  /*<span id='method-fm.websync.client-addOnUnbindSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client successfully unbinds.
  	 </div>
  
  	@function addOnUnbindSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnUnbindSuccess = function() {
    var value;
    value = arguments[0];
    return this._onUnbindSuccess = fm.delegate.combine(this._onUnbindSuccess, value);
  };

  /*<span id='method-fm.websync.client-addOnUnsubscribeComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client completes an unsubscribe, successfully or not.
  	 </div>
  
  	@function addOnUnsubscribeComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnUnsubscribeComplete = function() {
    var value;
    value = arguments[0];
    return this._onUnsubscribeComplete = fm.delegate.combine(this._onUnsubscribeComplete, value);
  };

  /*<span id='method-fm.websync.client-addOnUnsubscribeFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client fails to unsubscribe.
  	 </div>
  
  	@function addOnUnsubscribeFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnUnsubscribeFailure = function() {
    var value;
    value = arguments[0];
    return this._onUnsubscribeFailure = fm.delegate.combine(this._onUnsubscribeFailure, value);
  };

  /*<span id='method-fm.websync.client-addOnUnsubscribeSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client successfully unsubscribes.
  	 </div>
  
  	@function addOnUnsubscribeSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.addOnUnsubscribeSuccess = function() {
    var value;
    value = arguments[0];
    return this._onUnsubscribeSuccess = fm.delegate.combine(this._onUnsubscribeSuccess, value);
  };

  client.prototype.addSubscribedChannels = function() {
    var channels, list, str, tag, _i, _len, _results, _var0, _var1, _var2;
    tag = arguments[0];
    channels = arguments[1];
    list = null;
    _var0 = new fm.holder(list);
    _var1 = fm.hashExtensions.tryGetValue(this._subscribedChannels, tag, _var0);
    list = _var0.getValue();
    if (!_var1) {
      list = [];
      this._subscribedChannels[tag] = list;
    }
    _var2 = channels;
    _results = [];
    for (_i = 0, _len = _var2.length; _i < _len; _i++) {
      str = _var2[_i];
      if (!fm.arrayExtensions.contains(list, str)) {
        _results.push(fm.arrayExtensions.add(list, str));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  client.prototype.addSubscribedOnReceive = function() {
    var channels, dictionary, dynamicProperties, onReceive, reconnectAfter, str, tag, _i, _len, _var0, _var1, _var2;
    tag = arguments[0];
    channels = arguments[1];
    onReceive = arguments[2];
    dynamicProperties = arguments[3];
    reconnectAfter = arguments[4];
    dictionary = null;
    _var0 = new fm.holder(dictionary);
    _var1 = fm.hashExtensions.tryGetValue(this._subscribedOnReceives, tag, _var0);
    dictionary = _var0.getValue();
    if (!_var1) {
      dictionary = {};
      this._subscribedOnReceives[tag] = dictionary;
    }
    _var2 = channels;
    for (_i = 0, _len = _var2.length; _i < _len; _i++) {
      str = _var2[_i];
      dictionary[str] = onReceive;
      this._subscribedDynamicProperties[fm.websync.client.getSubscribeKey(str, tag)] = dynamicProperties;
    }
    reconnectAfter = this.processPendingReceives(channels, reconnectAfter);
    return reconnectAfter;
  };

  client.prototype.addToQueue = function() {
    var key, request, synchronous, timeout, url;
    request = arguments[0];
    url = arguments[1];
    synchronous = arguments[2];
    timeout = arguments[3];
    url = url != null ? url : this.getRequestUrl();
    key = fm.stringExtensions.format("{0}|{1}{2}", fm.intExtensions.toString(timeout), (synchronous ? "1" : "0"), url);
    if (!fm.hashExtensions.containsKey(this._requestQueue, key)) {
      this._requestQueue[key] = [];
    }
    return fm.arrayExtensions.add(this._requestQueue[key], request);
  };

  /*<span id='method-fm.websync.client-bind'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Binds the client to a public or private data record so it is visible to other
  	 clients or just to the server.
  	 </div><div>
  	 <p>
  	 When the bind completes successfully, the OnSuccess callback
  	 will be invoked, passing in the bound record(s),
  	 <b>including any modifications made on the server</b>.
  	 </p>
  	 </div>
  	@function bind
  	@param {fm.websync.bindArgs} bindArgs The bind arguments.
  	 See fm.websync.bindArgs for details.
  	@return {fm.websync.client} The client.
  */


  client.prototype.bind = function() {
    var bindArgs, record, _i, _len, _var0, _var1, _var2, _var3;
    bindArgs = arguments[0];
    _var0 = bindArgs.getRecords();
    if ((_var0 === null || typeof _var0 === 'undefined') || (bindArgs.getRecords().length === 0)) {
      throw new Error("records cannot be null.");
    }
    _var1 = bindArgs.getRecords();
    for (_i = 0, _len = _var1.length; _i < _len; _i++) {
      record = _var1[_i];
      _var2 = record.getKey();
      if (_var2 === null || typeof _var2 === 'undefined') {
        throw new Error("key cannot be null.");
      }
      _var3 = record.getValueJson();
      if (_var3 === null || typeof _var3 === 'undefined') {
        throw new Error("valueJson cannot be null.");
      }
    }
    this.performBind(bindArgs);
    return this;
  };

  client.prototype.checkSynchronous = function() {
    var synchronous;
    synchronous = arguments[0];
    if (synchronous !== null) {
      return synchronous;
    }
    if (this.getSynchronous() !== null) {
      return this.getSynchronous();
    }
    return false;
  };

  client.prototype.clearBoundRecords = function() {
    return fm.hashExtensions.clear(this._boundRecords);
  };

  client.prototype.clearSubscribedChannels = function() {
    fm.hashExtensions.clear(this._subscribedChannels);
    return fm.hashExtensions.clear(this._customOnReceives);
  };

  /*<span id='method-fm.websync.client-connect'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets up and maintains a streaming connection to the server.
  	 </div><div>
  	 <p>
  	 While this method will typically run asychronously, the WebSync client
  	 is designed to be used without (much) consideration for its asynchronous nature.
  	 To that end, any calls to methods that require an active connection, like
  	 bind, subscribe, and publish, will be
  	 queued automatically and executed once this method has completed successfully.
  	 </p>
  	 </div>
  	@function connect
  	@param {fm.websync.connectArgs} connectArgs The connect arguments.
  	 See fm.websync.client.ConnectArgs for details.
  	@return {fm.websync.client} The client.
  */


  client.prototype.connect = function() {
    var connectArgs;
    if (arguments.length === 1) {
      connectArgs = arguments[0];
      this.performConnect(connectArgs);
      return this;
      return;
    }
    if (arguments.length === 0) {
      return this.connect(new fm.websync.connectArgs());
    }
  };

  /*<span id='method-fm.websync.client-disconnect'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Takes down a streaming connection to the server and unsubscribes/unbinds the client.
  	 </div><div>
  	 <p>
  	 After the disconnect completes successfully,
  	 any further calls to methods that require an active connection, like
  	 bind, subscribe, and publish, will be
  	 queued automatically and executed only if/when the client reconnects.
  	 </p>
  	 </div>
  	@function disconnect
  	@param {fm.websync.disconnectArgs} disconnectArgs The disconnect arguments.
  	 See fm.websync.disconnectArgs for details.
  	@return {fm.websync.client} The client.
  */


  client.prototype.disconnect = function() {
    var disconnectArgs;
    if (arguments.length === 0) {
      return this.disconnect(new fm.websync.disconnectArgs());
      return;
    }
    if (arguments.length === 1) {
      disconnectArgs = arguments[0];
      this.performDisconnect(disconnectArgs);
      return this;
    }
  };

  client.prototype.doLongPolling = function() {
    this._connectionType = fm.websync.connectionType.LongPolling;
    this._streamRequestTransfer = fm.websync.messageTransferFactory.getHttpMessageTransfer();
    return this.activateStream(this._connectArgs, this._responseArgs);
  };

  /*<span id='method-fm.websync.client-endBatch'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Flags the end of a batch of requests and starts sending them to the server.
  	 </div><div>
  	 This is used in conjunction with <see cref="fm.websync.client.startBatch">fm.websync.client.startBatch</see>, which must
  	 be called first to flag the start of a batch of requests to be sent together
  	 to the server. Batching is used to optimize round-trips to the server by
  	 reducing the overhead associated with creating multiple HTTP requests.
  	 </div>
  	@function endBatch
  	@return {fm.websync.client} The client.
  */


  client.prototype.endBatch = function() {
    var flag;
    flag = false;
    this._batchCounter--;
    if (this._batchCounter <= 0) {
      this._batchCounter = 0;
      flag = true;
    }
    if (flag) {
      this.processQueue(false);
    }
    return this;
  };

  /*<span id='method-fm.websync.client-getBoundRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a collection of all the records to which the client is currently bound.
  	 </div>
  	@function getBoundRecords
  	@return {Object} A collection of all the records to which the client is currently bound
  */


  client.prototype.getBoundRecords = function() {
    var dictionary, str, _i, _len, _var0;
    dictionary = {};
    _var0 = fm.hashExtensions.getKeys(this._boundRecords);
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      str = _var0[_i];
      dictionary[str] = this._boundRecords[str].duplicate();
    }
    return dictionary;
  };

  /*<span id='method-fm.websync.client-getClientId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the server-generated WebSync client ID. This value is only set if the client is
  	 connected, so reference it only after successfully connecting the client.
  	 </div>
  
  	@function getClientId
  	@return {fm.guid}
  */


  client.prototype.getClientId = function() {
    return this._clientId;
  };

  /*<span id='method-fm.websync.client-getCustomOnReceive'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback invoked whenever messages are received on the specified
  	 channel.
  	 </div>
  	@function getCustomOnReceive
  	@param {String} channel The channel over which the messages are being received.
  	@return {fm.singleAction} The callback invoked when a message is received, if a callback
  	 is set; otherwise null.
  */


  client.prototype.getCustomOnReceive = function() {
    var channel;
    channel = arguments[0];
    return this.getCustomOnReceiveWithTag(channel, fm.stringExtensions.empty);
  };

  /*<span id='method-fm.websync.client-getCustomOnReceiveWithTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback invoked whenever messages are received on the specified
  	 channel.  The tag denotes a specific callback.
  	 </div>
  	@function getCustomOnReceiveWithTag
  	@param {String} channel The channel over which the messages are being received.
  	@param {String} tag The identifier for the callback.
  	@return {fm.singleAction} The callback invoked when a message is received, if a callback
  	 is set; otherwise null.
  */


  client.prototype.getCustomOnReceiveWithTag = function() {
    var action, channel, dictionary, tag, _var0, _var1, _var2, _var3, _var4, _var5;
    channel = arguments[0];
    tag = arguments[1];
    _var0 = channel;
    if (_var0 === null || typeof _var0 === 'undefined') {
      throw new Error("channel cannot be null.");
    }
    _var1 = tag;
    if (_var1 === null || typeof _var1 === 'undefined') {
      tag = fm.stringExtensions.empty;
    }
    action = null;
    dictionary = null;
    _var2 = new fm.holder(dictionary);
    _var3 = fm.hashExtensions.tryGetValue(this._customOnReceives, tag, _var2);
    dictionary = _var2.getValue();
    if (_var3) {
      _var4 = new fm.holder(action);
      _var5 = fm.hashExtensions.tryGetValue(dictionary, channel, _var4);
      action = _var4.getValue();
      _var5;

    }
    return action;
  };

  /*<span id='method-fm.websync.client-getDisableWebSockets'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether to disable WebSocket protocol support and use long-polling,
  	 even if the server is capable of accepting WebSocket requests.
  	 </div>
  
  	@function getDisableWebSockets
  	@return {Boolean}
  */


  client.prototype.getDisableWebSockets = function() {
    return this._disableWebSockets;
  };

  /*<span id='method-fm.websync.client-getInstanceId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a locally-generated instance ID. This value is set immediately upon construction,
  	 is local-only, and does not change for the duration of this client instance.
  	 </div>
  
  	@function getInstanceId
  	@return {fm.guid}
  */


  client.prototype.getInstanceId = function() {
    return this._instanceId;
  };

  /*<span id='method-fm.websync.client-getIsConnected'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the client is currently connected.
  	 </div>
  
  	@function getIsConnected
  	@return {Boolean}
  */


  client.prototype.getIsConnected = function() {
    return this._isConnected;
  };

  /*<span id='method-fm.websync.client-getIsConnecting'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the client is currently connecting.
  	 </div>
  
  	@function getIsConnecting
  	@return {Boolean}
  */


  client.prototype.getIsConnecting = function() {
    return this._isConnecting;
  };

  /*<span id='method-fm.websync.client-getIsDisconnecting'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether the client is currently disconnecting.
  	 </div>
  
  	@function getIsDisconnecting
  	@return {Boolean}
  */


  client.prototype.getIsDisconnecting = function() {
    return this._isDisconnecting;
  };

  /*<span id='method-fm.websync.client-getServerTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the number of milliseconds before the server takes action to discover
  	 if this client is idling or still active.
  	 </div>
  
  	@function getServerTimeout
  	@return {Integer}
  */


  client.prototype.getServerTimeout = function() {
    return this._serverTimeout;
  };

  /*<span id='method-fm.websync.client-getSessionId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the server-generated WebSync session ID. This value is only set if the client is
  	 connected.
  	 </div>
  
  	@function getSessionId
  	@return {fm.guid}
  */


  client.prototype.getSessionId = function() {
    return this._sessionId;
  };

  /*<span id='method-fm.websync.client-getStreamRequestTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the number of milliseconds to wait for a stream request to
  	 return a response before it is aborted and another stream request is attempted.
  	 </div>
  
  	@function getStreamRequestTimeout
  	@return {Integer}
  */


  client.prototype.getStreamRequestTimeout = function() {
    return this.getRequestTimeout() + this.getServerTimeout();
  };

  /*<span id='method-fm.websync.client-getStreamRequestUrl'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the absolute URL of the WebSync request handler for streaming connections, typically
  	 ending with websync.ashx.
  	 </div>
  
  	@function getStreamRequestUrl
  	@return {String}
  */


  client.prototype.getStreamRequestUrl = function() {
    return this._streamRequestUrl;
  };

  /*<span id='method-fm.websync.client-getSubscribedChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a list of all the channels to which the client is currently subscribed.
  	 </div>
  	@function getSubscribedChannels
  	@param {String} tag The subscription tag identifier.
  	@return {fm.array} 
  	 A list of all the channels to which the client is currently subscribed
  */


  client.prototype.getSubscribedChannels = function() {
    var list, str, tag, _i, _len, _var0, _var1, _var2;
    if (arguments.length === 0) {
      list = [];
      _var0 = fm.hashExtensions.getKeys(this._subscribedChannels);
      for (_i = 0, _len = _var0.length; _i < _len; _i++) {
        str = _var0[_i];
        fm.arrayExtensions.addRange(list, this._subscribedChannels[str]);
      }
      return fm.arrayExtensions.toArray(list);
      return;
    }
    if (arguments.length === 1) {
      tag = arguments[0];
      list = null;
      _var0 = new fm.holder(list);
      _var1 = fm.hashExtensions.tryGetValue(this._subscribedChannels, tag, _var0);
      list = _var0.getValue();
      _var1;

      _var2 = list;
      if (_var2 === null || typeof _var2 === 'undefined') {
        list = [];
      }
      return fm.arrayExtensions.toArray(list);
    }
  };

  /*<span id='method-fm.websync.client-getSynchronous'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether or not to execute client methods synchronously. This approach is not
  	 recommended for UI threads, as it will block until the request completes.
  	 Defaults to <c>false</c>.
  	 </div>
  
  	@function getSynchronous
  	@return {fm.nullable}
  */


  client.prototype.getSynchronous = function() {
    return this._synchronous;
  };

  client.prototype.getThreadId = function() {
    return fm.managedThread.currentThreadId();
  };

  /*<span id='method-fm.websync.client-getToken'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the token sent with each request for load balancing purposes.
  	 </div>
  
  	@function getToken
  	@return {String}
  */


  client.prototype.getToken = function() {
    return this._token;
  };

  /*<span id='method-fm.websync.client-inBatch'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether or not requests are currently being batched.
  	 </div>
  	@function inBatch
  	@return {Boolean} true if requests are being batched; otherwise false.
  */


  client.prototype.inBatch = function() {
    return this._batchCounter > 0;
  };

  client.prototype.inCallback = function() {
    var threadId;
    threadId = this.getThreadId();
    return fm.hashExtensions.containsKey(this._threadCounters, threadId) && (this._threadCounters[threadId] > 0);
  };

  client.prototype.initialize = function() {
    var streamRequestUrl, _var0;
    streamRequestUrl = arguments[0];
    _var0 = streamRequestUrl;
    if (_var0 === null || typeof _var0 === 'undefined') {
      throw new Error("streamRequestUrl cannot be null.");
    }
    this.setStreamRequestUrl(fm.httpTransfer.replaceWildcards(streamRequestUrl));
    this.setSynchronous(false);
    this.setToken(fm.websync.client.generateToken());
    this.setInstanceId(fm.guid.newGuid());
    this.setDisableWebSockets(fm.websync.webSocket.getExists());
    return this._requestTransfer = fm.websync.messageTransferFactory.getHttpMessageTransfer();
  };

  /*<span id='method-fm.websync.client-notify'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends data to a specified client ID.
  	 </div><div>
  	 When the notify completes successfully, the OnSuccess callback
  	 will be invoked, passing in the
  	 channel and published data, <b>including any modifications made on the server</b>.
  	 </div>
  	@function notify
  	@param {fm.websync.notifyArgs} notifyArgs The notify arguments.
  	 See fm.websync.notifyArgs for more details.
  	@return {fm.websync.client} The client.
  */


  client.prototype.notify = function() {
    var notifyArgs;
    notifyArgs = arguments[0];
    if (fm.stringExtensions.isNullOrEmpty(notifyArgs.getDataJson())) {
      throw new Error("dataJson cannot be null.");
    }
    this.performNotify(notifyArgs);
    return this;
  };

  client.prototype.performBind = function() {
    var args, bindArgs, message, request, request2, synchronous;
    bindArgs = arguments[0];
    if (!(bindArgs.getAutoRebind() !== null)) {
      bindArgs.setAutoRebind(!this.inCallback());
    }
    args = new fm.websync.clientBindRequestArgs();
    args.setMethodArgs(bindArgs);
    if (this.raiseRequestEvent(fm.websync.client._onBindRequest, args, "OnBindRequest")) {
      synchronous = this.checkSynchronous(bindArgs.getSynchronous());
      request2 = new fm.websync.clientRequest();
      message = new fm.websync.message("/meta/bind");
      message.setValidate(false);
      message.setRecords(bindArgs.getRecords());
      message.setExtensions(bindArgs.getExtensions());
      request2.setMessage(message);
      request2.setCallback(this.performBindCallback);
      request = request2;
      request.setDynamicValue(fm.websync.client._argsKey, bindArgs);
      this.addToQueue(request, bindArgs.getRequestUrl(), synchronous, (bindArgs.getRequestTimeout() !== null ? bindArgs.getRequestTimeout() : 0));
      return this.processQueue(false);
    }
  };

  client.prototype.performBindCallback = function() {
    var args, args2, args3, dynamicValue, flag, record, responseArgs, _i, _len, _var0, _var1;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getDynamicValue(fm.websync.client._argsKey);
    args = new fm.websync.clientBindResponseArgs();
    args.setMethodArgs(dynamicValue);
    this.raiseResponseEvent(fm.websync.client._onBindResponse, args, "OnBindResponse", responseArgs);
    _var0 = responseArgs.getException();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      flag = this.raiseBindFailure(dynamicValue, responseArgs, false);
      this.raiseBindComplete(dynamicValue, responseArgs);
      args2 = new fm.websync.clientBindEndArgs();
      args2.setMethodArgs(dynamicValue);
      this.raiseCompleteEvent(fm.websync.client._onBindEnd, args2, "OnBindEnd", responseArgs);
      if (flag) {
        dynamicValue.setIsRetry(true);
        return this.bind(dynamicValue);
      }
    } else {
      if (dynamicValue.getAutoRebind() === true) {
        fm.arrayExtensions.add(this._reconnectCache, dynamicValue);
        _var1 = responseArgs.getResponse().getRecords();
        for (_i = 0, _len = _var1.length; _i < _len; _i++) {
          record = _var1[_i];
          this._rebindCache[record.getKey()] = dynamicValue;
        }
      }
      this.addBoundRecords(responseArgs.getResponse().getRecords());
      this.raiseBindSuccess(dynamicValue, responseArgs);
      this.raiseBindComplete(dynamicValue, responseArgs);
      args3 = new fm.websync.clientBindEndArgs();
      args3.setMethodArgs(dynamicValue);
      return this.raiseCompleteEvent(fm.websync.client._onBindEnd, args3, "OnBindEnd", responseArgs);
    }
  };

  client.prototype.performConnect = function() {
    var args, args2, args4, args5, connectArgs, list, message, message2, request, request2, responseArgs, str, synchronous;
    connectArgs = arguments[0];
    args5 = new fm.websync.clientConnectRequestArgs();
    args5.setMethodArgs(connectArgs);
    if (this.raiseRequestEvent(fm.websync.client._onConnectRequest, args5, "OnConnectRequest")) {
      if (this.getIsConnecting() || this.getIsConnected()) {
        str = (this.getIsConnecting() ? "Already connecting." : "Already connected.");
        args2 = new fm.websync.clientResponseArgs();
        args2.setDynamicProperties(connectArgs.getDynamicProperties());
        message = new fm.websync.message("/meta/handshake");
        message.setExtensions(connectArgs.getExtensions());
        message.setTimestamp(fm.dateTime.getUtcNow());
        message.setSuccessful(false);
        message.setError(str);
        args2.setResponse(message);
        args2.setException(new Error(str));
        responseArgs = args2;
        args = new fm.websync.clientConnectResponseArgs();
        args.setMethodArgs(connectArgs);
        this.raiseResponseEvent(fm.websync.client._onConnectResponse, args, "OnConnectResponse", responseArgs);
        this.raiseConnectFailure(connectArgs, responseArgs, false);
        this.raiseConnectComplete(connectArgs, responseArgs);
        args4 = new fm.websync.clientConnectEndArgs();
        args4.setMethodArgs(connectArgs);
        this.raiseCompleteEvent(fm.websync.client._onConnectEnd, args4, "OnConnectEnd", responseArgs);
        return;
      }
      this.setIsConnecting(true);
      this._connectArgs = connectArgs;
      list = [];
      if (!this.getDisableWebSockets()) {
        fm.arrayExtensions.add(list, fm.websync.connectionType.WebSocket);
      }
      fm.arrayExtensions.add(list, fm.websync.connectionType.LongPolling);
      this._supportedConnectionTypes = fm.arrayExtensions.toArray(list);
      synchronous = this.checkSynchronous(connectArgs.getSynchronous());
      request2 = new fm.websync.clientRequest();
      message2 = new fm.websync.message("/meta/handshake");
      message2.setVersion(fm.websync.client._bayeuxVersion);
      message2.setMinimumVersion(fm.websync.client._bayeuxMinimumVersion);
      message2.setSupportedConnectionTypes(this._supportedConnectionTypes);
      message2.setExtensions(connectArgs.getExtensions());
      request2.setMessage(message2);
      request2.setCallback(this.performConnectCallback);
      request = request2;
      if ((connectArgs.getLastClientId() !== null) && (connectArgs.getLastSessionId() !== null)) {
        request.getMessage().setLastClientId(connectArgs.getLastClientId());
        request.getMessage().setLastSessionId(connectArgs.getLastSessionId());
      }
      request.setDynamicValue(fm.websync.client._argsKey, connectArgs);
      return this.send(request, connectArgs.getRequestUrl(), synchronous, (connectArgs.getRequestTimeout() !== null ? connectArgs.getRequestTimeout() : 0));
    }
  };

  client.prototype.performConnectCallback = function() {
    var args, args2, args3, bindArgs, dynamicValue, extensible, i, index, list, responseArgs, retry, serverTimeout, sessionId, state, subscribeArgs, timeout, type, _i, _j, _len, _len1, _var0, _var1, _var2, _var3, _var4, _var5, _var6;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getDynamicValue(fm.websync.client._argsKey);
    args = new fm.websync.clientConnectResponseArgs();
    args.setMethodArgs(dynamicValue);
    this.raiseResponseEvent(fm.websync.client._onConnectResponse, args, "OnConnectResponse", responseArgs);
    _var0 = responseArgs.getException();
    if (_var0 === null || typeof _var0 === 'undefined') {
      this.setClientId(responseArgs.getResponse().getClientId());
      sessionId = responseArgs.getResponse().getSessionId();
      if (sessionId !== null) {
        this.setSessionId(sessionId);
      }
      serverTimeout = responseArgs.getResponse().getServerTimeout();
      if (serverTimeout !== null) {
        this.setServerTimeout(serverTimeout);
      } else {
        this.setServerTimeout(25000);
      }
      index = 2147483647;
      _var1 = responseArgs.getResponse().getSupportedConnectionTypes();
      for (_i = 0, _len = _var1.length; _i < _len; _i++) {
        type = _var1[_i];
        i = 0;
        while (i < this._supportedConnectionTypes.length) {
          try {
            if (this._supportedConnectionTypes[i] === type) {
              if (i < index) {
                index = i;
              }
              break;
            }
          } finally {
            i++;
          }
        }
      }
      if ((index < 0) || (index > this._supportedConnectionTypes.length)) {
        responseArgs.setException(new Error("Could not negotiate a connection type with the server."));
      } else {
        this._connectionType = this._supportedConnectionTypes[index];
      }
    }
    _var2 = responseArgs.getException();
    if (_var2 === null || typeof _var2 === 'undefined') {
      this._lastBackoffIndex = -1;
      this._lastBackoffTimeout = 0;
      list = [];
      fm.arrayExtensions.addRange(list, this._reconnectCache);
      fm.arrayExtensions.clear(this._reconnectCache);
      fm.hashExtensions.clear(this._rebindCache);
      fm.hashExtensions.clear(this._resubscribeCache);
      _var3 = list;
      for (_j = 0, _len1 = _var3.length; _j < _len1; _j++) {
        extensible = _var3[_j];
        bindArgs = fm.global.tryCast(extensible, fm.websync.bindArgs);
        _var4 = bindArgs;
        if (_var4 !== null && typeof _var4 !== 'undefined') {
          bindArgs.setIsRetry(false);
          bindArgs.setIsRebind(true);
          this.bind(bindArgs);
        } else {
          subscribeArgs = fm.global.tryCast(extensible, fm.websync.subscribeArgs);
          _var5 = subscribeArgs;
          if (_var5 !== null && typeof _var5 !== 'undefined') {
            subscribeArgs.setIsRetry(false);
            subscribeArgs.setIsResubscribe(true);
            this.subscribe(subscribeArgs);
            continue;
          }
        }
      }
      this.setIsConnecting(false);
      this.setIsConnected(true);
      this._responseArgs = responseArgs;
      if ((this._connectionType === fm.websync.connectionType.WebSocket) && !this.getDisableWebSockets()) {
        try {
          return this.tryWebSocket();
        } catch (exception1) {
          return this.doLongPolling();
        } finally {

        }
      } else {
        return this.doLongPolling();
      }
    } else {
      this.setIsConnecting(false);
      retry = false;
      switch (dynamicValue.getRetryMode()) {
        case fm.websync.connectRetryMode.Aggressive:
          retry = true;
          break;
        case fm.websync.connectRetryMode.Intelligent:
          retry = (responseArgs.getErrorCode() < 800) || (responseArgs.getErrorCode() > 899);
          break;
      }
      retry = this.raiseConnectFailure(dynamicValue, responseArgs, retry);
      this.raiseConnectComplete(dynamicValue, responseArgs);
      args3 = new fm.websync.clientConnectEndArgs();
      args3.setMethodArgs(dynamicValue);
      this.raiseCompleteEvent(fm.websync.client._onConnectEnd, args3, "OnConnectEnd", responseArgs);
      if (retry) {
        timeout = 0;
        _var6 = dynamicValue.getRetryBackoff();
        if (_var6 !== null && typeof _var6 !== 'undefined') {
          args2 = new fm.websync.backoffArgs();
          args2.setIndex(this._lastBackoffIndex + 1);
          args2.setLastTimeout(this._lastBackoffTimeout);
          timeout = dynamicValue.getRetryBackoff()(args2);
        }
        if (timeout > 0) {
          state = new fm.websync.deferredRetryConnectState();
          state.setConnectArgs(dynamicValue);
          state.setBackoffTimeout(timeout);
          return fm.deferrer.defer(this.retryConnectDeferred, timeout, state);
        } else {
          return this.retryConnect(dynamicValue, timeout);
        }
      }
    }
  };

  client.prototype.performDisconnect = function() {
    var args, disconnectArgs, message, request, request2, synchronous;
    disconnectArgs = arguments[0];
    args = new fm.websync.clientDisconnectRequestArgs();
    args.setMethodArgs(disconnectArgs);
    if (this.raiseRequestEvent(fm.websync.client._onDisconnectRequest, args, "OnDisconnectRequest")) {
      this.setIsDisconnecting(true);
      synchronous = this.checkSynchronous(disconnectArgs.getSynchronous());
      request2 = new fm.websync.clientRequest();
      message = new fm.websync.message("/meta/disconnect");
      message.setExtensions(disconnectArgs.getExtensions());
      request2.setMessage(message);
      request2.setCallback(this.performDisconnectCallback);
      request = request2;
      request.setDynamicValue(fm.websync.client._argsKey, disconnectArgs);
      this.addToQueue(request, disconnectArgs.getRequestUrl(), synchronous, (disconnectArgs.getRequestTimeout() !== null ? disconnectArgs.getRequestTimeout() : 0));
      return this.processQueue(false);
    }
  };

  client.prototype.performDisconnectCallback = function() {
    var args, args3, dynamicValue, responseArgs, _var0, _var1;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getDynamicValue(fm.websync.client._argsKey);
    args = new fm.websync.clientDisconnectResponseArgs();
    args.setMethodArgs(dynamicValue);
    this.raiseResponseEvent(fm.websync.client._onDisconnectResponse, args, "OnDisconnectResponse", responseArgs);
    this.raiseForcedUnsubscribes(dynamicValue, responseArgs);
    this.raiseForcedUnbinds(dynamicValue, responseArgs);
    this.clearBoundRecords();
    this.clearSubscribedChannels();
    this.setIsDisconnecting(false);
    this.setIsConnected(false);
    this._webSocketOpened = false;
    try {
      _var0 = this._requestTransfer;
      if (_var0 !== null && typeof _var0 !== 'undefined') {
        this._requestTransfer.shutdown();
      }
      _var1 = this._streamRequestTransfer;
      if (_var1 !== null && typeof _var1 !== 'undefined') {
        this._streamRequestTransfer.shutdown();
      }
    } catch (exception1) {

    } finally {

    }
    this.raiseDisconnectComplete(dynamicValue, responseArgs);
    this._queueActivated = false;
    args3 = new fm.websync.clientDisconnectEndArgs();
    args3.setMethodArgs(dynamicValue);
    return this.raiseCompleteEvent(fm.websync.client._onDisconnectEnd, args3, "OnDisconnectEnd", responseArgs);
  };

  client.prototype.performNotify = function() {
    var args, message, notifyArgs, request, request2, synchronous;
    notifyArgs = arguments[0];
    args = new fm.websync.clientNotifyRequestArgs();
    args.setMethodArgs(notifyArgs);
    if (this.raiseRequestEvent(fm.websync.client._onNotifyRequest, args, "OnNotifyRequest")) {
      synchronous = this.checkSynchronous(notifyArgs.getSynchronous());
      request2 = new fm.websync.clientRequest();
      message = new fm.websync.message("/meta/notify");
      message.setValidate(false);
      message.setDataJson(notifyArgs.getDataJson());
      message.setExtensions(notifyArgs.getExtensions());
      request2.setMessage(message);
      request2.setCallback(this.performNotifyCallback);
      request = request2;
      request.setDynamicValue(fm.websync.client._argsKey, notifyArgs);
      this.addToQueue(request, notifyArgs.getRequestUrl(), synchronous, (notifyArgs.getRequestTimeout() !== null ? notifyArgs.getRequestTimeout() : 0));
      return this.processQueue(false);
    }
  };

  client.prototype.performNotifyCallback = function() {
    var args, args2, args3, dynamicValue, flag, responseArgs, _var0;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getDynamicValue(fm.websync.client._argsKey);
    args = new fm.websync.clientNotifyResponseArgs();
    args.setMethodArgs(dynamicValue);
    this.raiseResponseEvent(fm.websync.client._onNotifyResponse, args, "OnNotifyResponse", responseArgs);
    _var0 = responseArgs.getException();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      flag = this.raiseNotifyFailure(dynamicValue, responseArgs, false);
      this.raiseNotifyComplete(dynamicValue, responseArgs);
      args2 = new fm.websync.clientNotifyEndArgs();
      args2.setMethodArgs(dynamicValue);
      this.raiseCompleteEvent(fm.websync.client._onNotifyEnd, args2, "OnNotifyEnd", responseArgs);
      if (flag) {
        dynamicValue.setIsRetry(true);
        return this.notify(dynamicValue);
      }
    } else {
      this.raiseNotifySuccess(dynamicValue, responseArgs);
      this.raiseNotifyComplete(dynamicValue, responseArgs);
      args3 = new fm.websync.clientNotifyEndArgs();
      args3.setMethodArgs(dynamicValue);
      return this.raiseCompleteEvent(fm.websync.client._onNotifyEnd, args3, "OnNotifyEnd", responseArgs);
    }
  };

  client.prototype.performPublish = function() {
    var args, message, publishArgs, request, request2, synchronous;
    publishArgs = arguments[0];
    args = new fm.websync.clientPublishRequestArgs();
    args.setMethodArgs(publishArgs);
    if (this.raiseRequestEvent(fm.websync.client._onPublishRequest, args, "OnPublishRequest")) {
      synchronous = this.checkSynchronous(publishArgs.getSynchronous());
      request2 = new fm.websync.clientRequest();
      message = new fm.websync.message(publishArgs.getChannel());
      message.setValidate(false);
      message.setDataJson(publishArgs.getDataJson());
      message.setExtensions(publishArgs.getExtensions());
      request2.setMessage(message);
      request2.setCallback(this.performPublishCallback);
      request = request2;
      request.setDynamicValue(fm.websync.client._argsKey, publishArgs);
      this.addToQueue(request, publishArgs.getRequestUrl(), synchronous, (publishArgs.getRequestTimeout() !== null ? publishArgs.getRequestTimeout() : 0));
      return this.processQueue(false);
    }
  };

  client.prototype.performPublishCallback = function() {
    var args, args2, args3, dynamicValue, flag, responseArgs, _var0;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getDynamicValue(fm.websync.client._argsKey);
    args = new fm.websync.clientPublishResponseArgs();
    args.setMethodArgs(dynamicValue);
    this.raiseResponseEvent(fm.websync.client._onPublishResponse, args, "OnPublishResponse", responseArgs);
    _var0 = responseArgs.getException();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      flag = this.raisePublishFailure(dynamicValue, responseArgs, false);
      this.raisePublishComplete(dynamicValue, responseArgs);
      args2 = new fm.websync.clientPublishEndArgs();
      args2.setMethodArgs(dynamicValue);
      this.raiseCompleteEvent(fm.websync.client._onPublishEnd, args2, "OnPublishEnd", responseArgs);
      if (flag) {
        dynamicValue.setIsRetry(true);
        return this.publish(dynamicValue);
      }
    } else {
      this.raisePublishSuccess(dynamicValue, responseArgs);
      this.raisePublishComplete(dynamicValue, responseArgs);
      args3 = new fm.websync.clientPublishEndArgs();
      args3.setMethodArgs(dynamicValue);
      return this.raiseCompleteEvent(fm.websync.client._onPublishEnd, args3, "OnPublishEnd", responseArgs);
    }
  };

  client.prototype.performService = function() {
    var args, message, request, request2, serviceArgs, synchronous;
    serviceArgs = arguments[0];
    args = new fm.websync.clientServiceRequestArgs();
    args.setMethodArgs(serviceArgs);
    if (this.raiseRequestEvent(fm.websync.client._onServiceRequest, args, "OnServiceRequest")) {
      synchronous = this.checkSynchronous(serviceArgs.getSynchronous());
      request2 = new fm.websync.clientRequest();
      message = new fm.websync.message(fm.websync.metaChannels.convertChannelToServiced(serviceArgs.getChannel()));
      message.setValidate(false);
      message.setDataJson(serviceArgs.getDataJson());
      message.setExtensions(serviceArgs.getExtensions());
      request2.setMessage(message);
      request2.setCallback(this.performServiceCallback);
      request = request2;
      request.setDynamicValue(fm.websync.client._argsKey, serviceArgs);
      this.addToQueue(request, serviceArgs.getRequestUrl(), synchronous, (serviceArgs.getRequestTimeout() !== null ? serviceArgs.getRequestTimeout() : 0));
      return this.processQueue(false);
    }
  };

  client.prototype.performServiceCallback = function() {
    var args, args2, args3, dynamicValue, flag, responseArgs, _var0;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getDynamicValue(fm.websync.client._argsKey);
    args = new fm.websync.clientServiceResponseArgs();
    args.setMethodArgs(dynamicValue);
    this.raiseResponseEvent(fm.websync.client._onServiceResponse, args, "OnServiceResponse", responseArgs);
    _var0 = responseArgs.getException();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      flag = this.raiseServiceFailure(dynamicValue, responseArgs, false);
      this.raiseServiceComplete(dynamicValue, responseArgs);
      args2 = new fm.websync.clientServiceEndArgs();
      args2.setMethodArgs(dynamicValue);
      this.raiseCompleteEvent(fm.websync.client._onServiceEnd, args2, "OnServiceEnd", responseArgs);
      if (flag) {
        dynamicValue.setIsRetry(true);
        return this.service(dynamicValue);
      }
    } else {
      this.raiseServiceSuccess(dynamicValue, responseArgs);
      this.raiseServiceComplete(dynamicValue, responseArgs);
      args3 = new fm.websync.clientServiceEndArgs();
      args3.setMethodArgs(dynamicValue);
      return this.raiseCompleteEvent(fm.websync.client._onServiceEnd, args3, "OnServiceEnd", responseArgs);
    }
  };

  client.prototype.performSubscribe = function() {
    var args, message, request, request2, subscribeArgs, synchronous;
    subscribeArgs = arguments[0];
    if (!(subscribeArgs.getAutoResubscribe() !== null)) {
      subscribeArgs.setAutoResubscribe(!this.inCallback());
    }
    args = new fm.websync.clientSubscribeRequestArgs();
    args.setMethodArgs(subscribeArgs);
    if (this.raiseRequestEvent(fm.websync.client._onSubscribeRequest, args, "OnSubscribeRequest")) {
      synchronous = this.checkSynchronous(subscribeArgs.getSynchronous());
      request2 = new fm.websync.clientRequest();
      message = new fm.websync.message("/meta/subscribe");
      message.setValidate(false);
      message.setChannels(subscribeArgs.getChannels());
      message.setExtensions(subscribeArgs.getExtensions());
      request2.setMessage(message);
      request2.setCallback(this.performSubscribeCallback);
      request = request2;
      request.setDynamicValue(fm.websync.client._argsKey, subscribeArgs);
      this.addToQueue(request, subscribeArgs.getRequestUrl(), synchronous, (subscribeArgs.getRequestTimeout() !== null ? subscribeArgs.getRequestTimeout() : 0));
      return this.processQueue(false);
    }
  };

  client.prototype.performSubscribeCallback = function() {
    var args, args2, args3, dynamicValue, flag, responseArgs, str, _i, _j, _len, _len1, _var0, _var1, _var2;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getDynamicValue(fm.websync.client._argsKey);
    args = new fm.websync.clientSubscribeResponseArgs();
    args.setMethodArgs(dynamicValue);
    this.raiseResponseEvent(fm.websync.client._onSubscribeResponse, args, "OnSubscribeResponse", responseArgs);
    _var0 = responseArgs.getException();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      flag = this.raiseSubscribeFailure(dynamicValue, responseArgs, false);
      this.raiseSubscribeComplete(dynamicValue, responseArgs);
      args2 = new fm.websync.clientSubscribeEndArgs();
      args2.setMethodArgs(dynamicValue);
      this.raiseCompleteEvent(fm.websync.client._onSubscribeEnd, args2, "OnSubscribeEnd", responseArgs);
      if (flag) {
        dynamicValue.setIsRetry(true);
        return this.subscribe(dynamicValue);
      }
    } else {
      if (dynamicValue.getAutoResubscribe() === true) {
        fm.arrayExtensions.add(this._reconnectCache, dynamicValue);
        _var1 = responseArgs.getResponse().getChannels();
        for (_i = 0, _len = _var1.length; _i < _len; _i++) {
          str = _var1[_i];
          this._resubscribeCache[fm.websync.client.getSubscribeKey(str, dynamicValue.getTag())] = dynamicValue;
        }
      }
      _var2 = responseArgs.getResponse().getChannels();
      for (_j = 0, _len1 = _var2.length; _j < _len1; _j++) {
        str = _var2[_j];
        this._subscribedDynamicProperties[fm.websync.client.getSubscribeKey(str, dynamicValue.getTag())] = dynamicValue.getDynamicProperties();
      }
      this.addSubscribedChannels(responseArgs.getResponse().getTag(), responseArgs.getResponse().getChannels());
      this.raiseSubscribeSuccess(dynamicValue, responseArgs);
      this.raiseSubscribeComplete(dynamicValue, responseArgs);
      this.addSubscribedOnReceive(responseArgs.getResponse().getTag(), responseArgs.getResponse().getChannels(), dynamicValue.getOnReceive(), dynamicValue.getDynamicProperties(), this._lastInterval);
      args3 = new fm.websync.clientSubscribeEndArgs();
      args3.setMethodArgs(dynamicValue);
      return this.raiseCompleteEvent(fm.websync.client._onSubscribeEnd, args3, "OnSubscribeEnd", responseArgs);
    }
  };

  client.prototype.performUnbind = function() {
    var args, message, request, request2, synchronous, unbindArgs;
    unbindArgs = arguments[0];
    args = new fm.websync.clientUnbindRequestArgs();
    args.setMethodArgs(unbindArgs);
    if (this.raiseRequestEvent(fm.websync.client._onUnbindRequest, args, "OnUnbindRequest")) {
      synchronous = this.checkSynchronous(unbindArgs.getSynchronous());
      request2 = new fm.websync.clientRequest();
      message = new fm.websync.message("/meta/unbind");
      message.setValidate(false);
      message.setRecords(unbindArgs.getRecords());
      message.setExtensions(unbindArgs.getExtensions());
      request2.setMessage(message);
      request2.setCallback(this.performUnbindCallback);
      request = request2;
      request.setDynamicValue(fm.websync.client._argsKey, unbindArgs);
      this.addToQueue(request, unbindArgs.getRequestUrl(), synchronous, (unbindArgs.getRequestTimeout() !== null ? unbindArgs.getRequestTimeout() : 0));
      return this.processQueue(false);
    }
  };

  client.prototype.performUnbindCallback = function() {
    var args, args2, args3, args4, dynamicValue, flag, i, list, record, responseArgs, _i, _len, _var0, _var1, _var2, _var3, _var4;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getDynamicValue(fm.websync.client._argsKey);
    args = new fm.websync.clientUnbindResponseArgs();
    args.setMethodArgs(dynamicValue);
    this.raiseResponseEvent(fm.websync.client._onUnbindResponse, args, "OnUnbindResponse", responseArgs);
    _var0 = responseArgs.getException();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      flag = this.raiseUnbindFailure(dynamicValue, responseArgs, false);
      this.raiseUnbindComplete(dynamicValue, responseArgs, false);
      args2 = new fm.websync.clientUnbindEndArgs();
      args2.setMethodArgs(dynamicValue);
      this.raiseCompleteEvent(fm.websync.client._onUnbindEnd, args2, "OnUnbindEnd", responseArgs);
      if (flag) {
        dynamicValue.setIsRetry(true);
        return this.unbind(dynamicValue);
      }
    } else {
      _var1 = responseArgs.getResponse().getRecords();
      for (_i = 0, _len = _var1.length; _i < _len; _i++) {
        record = _var1[_i];
        args3 = null;
        _var2 = new fm.holder(args3);
        _var3 = fm.hashExtensions.tryGetValue(this._rebindCache, record.getKey(), _var2);
        args3 = _var2.getValue();
        _var3;

        _var4 = args3;
        if (_var4 !== null && typeof _var4 !== 'undefined') {
          list = [];
          i = 0;
          while (i < fm.arrayExtensions.getCount(list)) {
            try {
              if (list[i].getKey() === record.getKey()) {
                list.removeAt(i);
                i--;
              }
            } finally {
              i++;
            }
          }
          args3.setRecords(fm.arrayExtensions.toArray(list));
          fm.hashExtensions.remove(this._rebindCache, record.getKey());
          if (!fm.hashExtensions.containsValue(this._rebindCache, args3)) {
            fm.arrayExtensions.remove(this._reconnectCache, args3);
          }
        }
      }
      this.removeBoundRecords(responseArgs.getResponse().getRecords());
      this.raiseUnbindSuccess(dynamicValue, responseArgs, false);
      this.raiseUnbindComplete(dynamicValue, responseArgs, false);
      args4 = new fm.websync.clientUnbindEndArgs();
      args4.setMethodArgs(dynamicValue);
      return this.raiseCompleteEvent(fm.websync.client._onUnbindEnd, args4, "OnUnbindEnd", responseArgs);
    }
  };

  client.prototype.performUnsubscribe = function() {
    var args, message, request, request2, synchronous, unsubscribeArgs;
    unsubscribeArgs = arguments[0];
    args = new fm.websync.clientUnsubscribeRequestArgs();
    args.setMethodArgs(unsubscribeArgs);
    if (this.raiseRequestEvent(fm.websync.client._onUnsubscribeRequest, args, "OnUnsubscribeRequest")) {
      synchronous = this.checkSynchronous(unsubscribeArgs.getSynchronous());
      request2 = new fm.websync.clientRequest();
      message = new fm.websync.message("/meta/unsubscribe");
      message.setValidate(false);
      message.setChannels(unsubscribeArgs.getChannels());
      message.setExtensions(unsubscribeArgs.getExtensions());
      request2.setMessage(message);
      request2.setCallback(this.performUnsubscribeCallback);
      request = request2;
      request.setDynamicValue(fm.websync.client._argsKey, unsubscribeArgs);
      this.addToQueue(request, unsubscribeArgs.getRequestUrl(), synchronous, (unsubscribeArgs.getRequestTimeout() !== null ? unsubscribeArgs.getRequestTimeout() : 0));
      return this.processQueue(false);
    }
  };

  client.prototype.performUnsubscribeCallback = function() {
    var args, args2, args3, args4, dynamicValue, flag, list, responseArgs, str, subscribeKey, _i, _len, _var0, _var1, _var2, _var3, _var4;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getDynamicValue(fm.websync.client._argsKey);
    args = new fm.websync.clientUnsubscribeResponseArgs();
    args.setMethodArgs(dynamicValue);
    this.raiseResponseEvent(fm.websync.client._onUnsubscribeResponse, args, "OnUnsubscribeResponse", responseArgs);
    _var0 = responseArgs.getException();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      flag = this.raiseUnsubscribeFailure(dynamicValue, responseArgs, false);
      this.raiseUnsubscribeComplete(dynamicValue, responseArgs, false);
      args2 = new fm.websync.clientUnsubscribeEndArgs();
      args2.setMethodArgs(dynamicValue);
      this.raiseCompleteEvent(fm.websync.client._onUnsubscribeEnd, args2, "OnUnsubscribeEnd", responseArgs);
      if (flag) {
        dynamicValue.setIsRetry(true);
        return this.unsubscribe(dynamicValue);
      }
    } else {
      _var1 = responseArgs.getResponse().getChannels();
      for (_i = 0, _len = _var1.length; _i < _len; _i++) {
        str = _var1[_i];
        args3 = null;
        subscribeKey = fm.websync.client.getSubscribeKey(str, dynamicValue.getTag());
        _var2 = new fm.holder(args3);
        _var3 = fm.hashExtensions.tryGetValue(this._resubscribeCache, subscribeKey, _var2);
        args3 = _var2.getValue();
        _var3;

        _var4 = args3;
        if (_var4 !== null && typeof _var4 !== 'undefined') {
          list = [];
          fm.arrayExtensions.remove(list, str);
          args3.setChannels(fm.arrayExtensions.toArray(list));
          fm.hashExtensions.remove(this._resubscribeCache, subscribeKey);
          if (!fm.hashExtensions.containsValue(this._resubscribeCache, args3)) {
            fm.arrayExtensions.remove(this._reconnectCache, args3);
          }
        }
      }
      this.removeSubscribedChannels(responseArgs.getResponse().getTag(), responseArgs.getResponse().getChannels());
      this.removeSubscribedOnReceive(responseArgs.getResponse().getTag(), responseArgs.getResponse().getChannels());
      this.raiseUnsubscribeSuccess(dynamicValue, responseArgs, false);
      this.raiseUnsubscribeComplete(dynamicValue, responseArgs, false);
      args4 = new fm.websync.clientUnsubscribeEndArgs();
      args4.setMethodArgs(dynamicValue);
      return this.raiseCompleteEvent(fm.websync.client._onUnsubscribeEnd, args4, "OnUnsubscribeEnd", responseArgs);
    }
  };

  client.prototype.postRaise = function() {
    var num, threadId;
    threadId = arguments[0];
    if (this.getConcurrencyMode() === fm.websync.concurrencyMode.Low) {
      num = this._threadCounters[threadId];
      if (num === 1) {
        return fm.hashExtensions.remove(this._threadCounters, threadId);
      } else {
        return this._threadCounters[threadId] = num - 1;
      }
    } else {
      num = this._threadCounters[threadId];
      return this._threadCounters[threadId] = num - 1;
    }
  };

  client.prototype.preRaise = function() {
    var num, threadId;
    threadId = arguments[0];
    num = 0;
    if (fm.hashExtensions.containsKey(this._threadCounters, threadId)) {
      num = this._threadCounters[threadId];
    }
    return this._threadCounters[threadId] = num + 1;
  };

  client.prototype.processAdvice = function() {
    var advice;
    advice = arguments[0];
    if (advice.getInterval() !== null) {
      this._lastInterval = advice.getInterval();
    }
    if (advice.getReconnect() !== null) {
      return this._lastReconnect = advice.getReconnect();
    }
  };

  client.prototype.processPendingReceives = function() {
    var channels, list, message, reconnectAfter, str, _i, _j, _len, _len1, _var0, _var1, _var2, _var3, _var4;
    channels = arguments[0];
    reconnectAfter = arguments[1];
    _var0 = channels;
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      str = _var0[_i];
      list = null;
      _var1 = new fm.holder(list);
      _var2 = fm.hashExtensions.tryGetValue(this._pendingReceives, str, _var1);
      list = _var1.getValue();
      if (_var2) {
        fm.hashExtensions.remove(this._pendingReceives, str);
      }
      _var3 = list;
      if (_var3 !== null && typeof _var3 !== 'undefined') {
        _var4 = list;
        for (_j = 0, _len1 = _var4.length; _j < _len1; _j++) {
          message = _var4[_j];
          reconnectAfter = this.receiveMessage(message, reconnectAfter);
        }
      }
    }
    return reconnectAfter;
  };

  client.prototype.processQueue = function() {
    var activate, index, requestQueue, requests, s, str, str3, synchronous, timeout, url, _i, _len, _results, _var0;
    activate = arguments[0];
    if (activate) {
      this._queueActivated = true;
    }
    if (this._queueActivated && !this.inBatch()) {
      requestQueue = this._requestQueue;
      this._requestQueue = {};
      _var0 = fm.hashExtensions.getKeys(requestQueue);
      _results = [];
      for (_i = 0, _len = _var0.length; _i < _len; _i++) {
        str = _var0[_i];
        index = fm.stringExtensions.indexOf(str, "|");
        s = fm.stringExtensions.substring(str, 0, index);
        str3 = str.substring(index + 1);
        timeout = fm.parseAssistant.parseIntegerValue(s);
        synchronous = fm.stringExtensions.substring(str3, 0, 1) === "1";
        url = str3.substring(1);
        requests = fm.arrayExtensions.toArray(requestQueue[str]);
        _results.push(this.sendMany(requests, url, synchronous, timeout));
      }
      return _results;
    }
  };

  client.prototype.processRequestUrl = function() {
    var flag, requestUrl, str, _var0, _var1;
    requestUrl = arguments[0];
    if (fm.stringExtensions.isNullOrEmpty(requestUrl)) {
      requestUrl = this.getRequestUrl();
    }
    flag = false;
    str = null;
    if (this.getConcurrencyMode() === fm.websync.concurrencyMode.High) {
      _var0 = new fm.holder(str);
      _var1 = fm.hashExtensions.tryGetValue(fm.websync.client._requestUrlCache, requestUrl, _var0);
      str = _var0.getValue();
      flag = _var1;
    }
    if (!flag) {
      str = requestUrl;
      str = fm.httpTransfer.addQueryToUrl(fm.httpTransfer.addQueryToUrl(fm.httpTransfer.addQueryToUrl(str, "token", this.getToken()), "src", fm.httpWebRequestTransfer.getPlatformCode()), "AspxAutoDetectCookieSupport", "1");
      if (this.getConcurrencyMode() !== fm.websync.concurrencyMode.High) {
        return str;
      }
      fm.websync.client._requestUrlCache[requestUrl] = str;
    }
    return str;
  };

  client.prototype.processServerAction = function() {
    var onReceive, reconnectAfter, serverAction, _var0;
    serverAction = arguments[0];
    reconnectAfter = arguments[1];
    if (serverAction.getBayeuxChannel() === "/meta/bind") {
      this.addBoundRecords(serverAction.getRecords());
      this.raiseServerBind(serverAction);
      return reconnectAfter;
    }
    if (serverAction.getBayeuxChannel() === "/meta/unbind") {
      this.removeBoundRecords(serverAction.getRecords());
      this.raiseServerUnbind(serverAction);
      return reconnectAfter;
    }
    if (serverAction.getBayeuxChannel() === "/meta/subscribe") {
      this.addSubscribedChannels(serverAction.getTag(), serverAction.getChannels());
      onReceive = this.raiseServerSubscribe(serverAction);
      _var0 = onReceive;
      if (_var0 === null || typeof _var0 === 'undefined') {
        throw new Error(fm.stringExtensions.format("The server subscribed the client to [{0}], but the client did not supply a callback to handle received messages. A callback must be specified in the client's OnServerSubscribe event.", fm.stringExtensions.join(", ", serverAction.getChannels())));
      }
      reconnectAfter = this.addSubscribedOnReceive(serverAction.getTag(), serverAction.getChannels(), onReceive, serverAction.getDynamicProperties(), reconnectAfter);
      return reconnectAfter;
    }
    if (serverAction.getBayeuxChannel() === "/meta/unsubscribe") {
      this.removeSubscribedChannels(serverAction.getTag(), serverAction.getChannels());
      this.raiseServerUnsubscribe(serverAction);
      this.removeSubscribedOnReceive(serverAction.getTag(), serverAction.getChannels());
    }
    return reconnectAfter;
  };

  /*<span id='method-fm.websync.client-publish'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends data to a specified channel.
  	 </div><div>
  	 When the publish completes successfully, the OnSuccess callback
  	 will be invoked, passing in the
  	 channel and published data, <b>including any modifications made on the server</b>.
  	 </div>
  	@function publish
  	@param {fm.websync.publishArgs} publishArgs The publish arguments.
  	 See fm.websync.publishArgs for more details.
  	@return {fm.websync.client} The client.
  */


  client.prototype.publish = function() {
    var publishArgs;
    publishArgs = arguments[0];
    if (fm.stringExtensions.isNullOrEmpty(publishArgs.getChannel())) {
      throw new Error("channel cannot be null.");
    }
    if (fm.stringExtensions.isNullOrEmpty(publishArgs.getDataJson())) {
      throw new Error("dataJson cannot be null.");
    }
    this.performPublish(publishArgs);
    return this;
  };

  client.prototype.raiseAction = function() {
    var args, callback, source;
    callback = arguments[0];
    args = arguments[1];
    source = arguments[2];
    return this.raiseActionManual(callback, args, source, false);
  };

  client.prototype.raiseActionManual = function() {
    var args, callback, exception, manualThreadManagement, source, threadId;
    callback = arguments[0];
    args = arguments[1];
    source = arguments[2];
    manualThreadManagement = arguments[3];
    if (manualThreadManagement) {
      try {
        return callback(args);
      } catch (exception1) {
        exception = exception1;
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, source);
        }
      } finally {

      }
    } else {
      threadId = this.getThreadId();
      this.preRaise(threadId);
      try {
        return callback(args);
      } catch (exception2) {
        exception = exception2;
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, source);
        }
      } finally {
        this.postRaise(threadId);
      }
    }
  };

  client.prototype.raiseBindComplete = function() {
    var args, args2, bindArgs, onBindComplete, responseArgs, _var0, _var1;
    bindArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.bindCompleteArgs();
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), bindArgs));
    args2.setIsRebind(bindArgs.getIsRebind());
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(bindArgs.getDynamicProperties());
    args = args2;
    onBindComplete = this._onBindComplete;
    _var0 = onBindComplete;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onBindComplete, args, "Client -> OnBindComplete");
    }
    _var1 = bindArgs.getOnComplete();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return this.raiseAction(bindArgs.getOnComplete(), args, "Client -> Bind -> OnComplete");
    }
  };

  client.prototype.raiseBindFailure = function() {
    var args, args2, bindArgs, onBindFailure, responseArgs, retry, _var0, _var1;
    bindArgs = arguments[0];
    responseArgs = arguments[1];
    retry = arguments[2];
    args2 = new fm.websync.bindFailureArgs();
    args2.__records = fm.websync.client.getRecordsForBind(responseArgs.getResponse(), bindArgs);
    args2.setException(responseArgs.getException());
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), bindArgs));
    args2.setIsRebind(bindArgs.getIsRebind());
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(bindArgs.getDynamicProperties());
    args = args2;
    onBindFailure = this._onBindFailure;
    _var0 = onBindFailure;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onBindFailure, args, "Client -> OnBindFailure");
    }
    _var1 = bindArgs.getOnFailure();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      retry = this.raiseRetriable(bindArgs.getOnFailure(), retry, args, "Client -> Bind -> OnFailure");
    }
    return retry;
  };

  client.prototype.raiseBindSuccess = function() {
    var args, args2, bindArgs, onBindSuccess, responseArgs, _var0, _var1;
    bindArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.bindSuccessArgs();
    args2.__records = fm.websync.client.getRecordsForBind(responseArgs.getResponse(), bindArgs);
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), bindArgs));
    args2.setIsRebind(bindArgs.getIsRebind());
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(bindArgs.getDynamicProperties());
    args = args2;
    onBindSuccess = this._onBindSuccess;
    _var0 = onBindSuccess;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onBindSuccess, args, "Client -> OnBindSuccess");
    }
    _var1 = bindArgs.getOnSuccess();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return this.raiseAction(bindArgs.getOnSuccess(), args, "Client -> Bind -> OnSuccess");
    }
  };

  client.prototype.raiseCompleteEvent = function() {
    var args, eventMethod, eventName, responseArgs;
    eventMethod = arguments[0];
    args = arguments[1];
    eventName = arguments[2];
    responseArgs = arguments[3];
    args.setException(responseArgs.getException());
    args.setResponse(responseArgs.getResponse());
    return this.raiseEvent(eventMethod, args, eventName);
  };

  client.prototype.raiseConnectComplete = function() {
    var args, args2, connectArgs, onConnectComplete, responseArgs, _var0, _var1;
    connectArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.connectCompleteArgs();
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), connectArgs));
    args2.setIsReconnect(connectArgs.getIsReconnect());
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(connectArgs.getDynamicProperties());
    args = args2;
    onConnectComplete = this._onConnectComplete;
    _var0 = onConnectComplete;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onConnectComplete, args, "Client -> OnConnectComplete");
    }
    _var1 = connectArgs.getOnComplete();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return this.raiseAction(connectArgs.getOnComplete(), args, "Client -> Connect -> OnComplete");
    }
  };

  client.prototype.raiseConnectFailure = function() {
    var args, args2, connectArgs, onConnectFailure, responseArgs, retry, _var0, _var1;
    connectArgs = arguments[0];
    responseArgs = arguments[1];
    retry = arguments[2];
    args2 = new fm.websync.connectFailureArgs();
    args2.setException(responseArgs.getException());
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), connectArgs));
    args2.setIsReconnect(connectArgs.getIsReconnect());
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(connectArgs.getDynamicProperties());
    args = args2;
    onConnectFailure = this._onConnectFailure;
    _var0 = onConnectFailure;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onConnectFailure, args, "Client -> OnConnectFailure");
    }
    _var1 = connectArgs.getOnFailure();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      retry = this.raiseRetriable(connectArgs.getOnFailure(), retry, args, "Client -> Connect -> OnFailure");
    }
    return retry;
  };

  client.prototype.raiseConnectSuccess = function() {
    var args, args2, connectArgs, onConnectSuccess, responseArgs, _var0, _var1;
    connectArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.connectSuccessArgs();
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), connectArgs));
    args2.setConnectionType(this._connectionType);
    args2.setIsReconnect(connectArgs.getIsReconnect());
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(connectArgs.getDynamicProperties());
    args = args2;
    onConnectSuccess = this._onConnectSuccess;
    _var0 = onConnectSuccess;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onConnectSuccess, args, "Client -> OnConnectSuccess");
    }
    _var1 = connectArgs.getOnSuccess();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return this.raiseAction(connectArgs.getOnSuccess(), args, "Client -> Connect -> OnSuccess");
    }
  };

  client.prototype.raiseDisconnectComplete = function() {
    var args, args2, disconnectArgs, onDisconnectComplete, responseArgs, _var0, _var1;
    disconnectArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.disconnectCompleteArgs();
    args2.setException(responseArgs.getException());
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), disconnectArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(disconnectArgs.getDynamicProperties());
    args = args2;
    onDisconnectComplete = this._onDisconnectComplete;
    _var0 = onDisconnectComplete;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onDisconnectComplete, args, "Client -> OnDisconnectComplete");
    }
    _var1 = disconnectArgs.getOnComplete();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return this.raiseAction(disconnectArgs.getOnComplete(), args, "Client -> Disconnect -> OnComplete");
    }
  };

  client.prototype.raiseEvent = function() {
    var args, eventMethod, eventName, _var0;
    eventMethod = arguments[0];
    args = arguments[1];
    eventName = arguments[2];
    args.setClient(this);
    _var0 = eventMethod;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      try {
        return eventMethod(this, args);
      } catch (exception) {
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, fm.stringExtensions.format("Client -> {0}", eventName));
        }
      } finally {

      }
    }
  };

  client.prototype.raiseForcedUnbinds = function() {
    var args2, inputArgs, item, list, responseArgs, str, _i, _j, _len, _len1, _results, _var0, _var1;
    inputArgs = arguments[0];
    responseArgs = arguments[1];
    list = [];
    _var0 = fm.hashExtensions.getKeys(this._boundRecords);
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      str = _var0[_i];
      item = new fm.websync.unbindArgs([this._boundRecords[str]]);
      item.setRequestUrl(inputArgs.getRequestUrl());
      item.setSynchronous(inputArgs.getSynchronous());
      item.setIsRetry(inputArgs.getIsRetry());
      item.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), inputArgs));
      item.setDynamicProperties(inputArgs.getDynamicProperties());
      fm.arrayExtensions.add(list, item);
    }
    _var1 = list;
    _results = [];
    for (_j = 0, _len1 = _var1.length; _j < _len1; _j++) {
      args2 = _var1[_j];
      this.raiseUnbindSuccess(args2, responseArgs, true);
      _results.push(this.raiseUnbindComplete(args2, responseArgs, true));
    }
    return _results;
  };

  client.prototype.raiseForcedUnsubscribes = function() {
    var args2, inputArgs, item, list, responseArgs, str, str2, _i, _j, _k, _len, _len1, _len2, _results, _var0, _var1, _var2;
    inputArgs = arguments[0];
    responseArgs = arguments[1];
    list = [];
    _var0 = fm.hashExtensions.getKeys(this._subscribedChannels);
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      str = _var0[_i];
      _var1 = this._subscribedChannels[str];
      for (_j = 0, _len1 = _var1.length; _j < _len1; _j++) {
        str2 = _var1[_j];
        item = new fm.websync.unsubscribeArgs([str2], str);
        item.setRequestUrl(inputArgs.getRequestUrl());
        item.setSynchronous(inputArgs.getSynchronous());
        item.setIsRetry(inputArgs.getIsRetry());
        item.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), inputArgs));
        item.setDynamicProperties(inputArgs.getDynamicProperties());
        fm.arrayExtensions.add(list, item);
      }
    }
    _var2 = list;
    _results = [];
    for (_k = 0, _len2 = _var2.length; _k < _len2; _k++) {
      args2 = _var2[_k];
      this.raiseUnsubscribeSuccess(args2, responseArgs, true);
      _results.push(this.raiseUnsubscribeComplete(args2, responseArgs, true));
    }
    return _results;
  };

  client.prototype.raiseFunction = function() {
    var args, callback, source;
    callback = arguments[0];
    args = arguments[1];
    source = arguments[2];
    return this.raiseFunctionManual(callback, args, source, false);
  };

  client.prototype.raiseFunctionManual = function() {
    var args, callback, exception, local, manualThreadManagement, source, threadId;
    callback = arguments[0];
    args = arguments[1];
    source = arguments[2];
    manualThreadManagement = arguments[3];
    if (manualThreadManagement) {
      try {
        return callback(args);
      } catch (exception1) {
        exception = exception1;
        if (!this.raiseUnhandledException(exception)) {
          fm.asyncException.asyncThrow(exception, source);
        }
        return null;
      } finally {

      }
    }
    threadId = this.getThreadId();
    this.preRaise(threadId);
    try {
      local = callback(args);
    } catch (exception2) {
      exception = exception2;
      if (!this.raiseUnhandledException(exception)) {
        fm.asyncException.asyncThrow(exception, source);
      }
      local = null;
    } finally {
      this.postRaise(threadId);
    }
    return local;
  };

  client.prototype.raiseNotifyComplete = function() {
    var args, args2, notifyArgs, onNotifyComplete, responseArgs, _var0, _var1;
    notifyArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.notifyCompleteArgs();
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), notifyArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(notifyArgs.getDynamicProperties());
    args = args2;
    onNotifyComplete = this._onNotifyComplete;
    _var0 = onNotifyComplete;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onNotifyComplete, args, "Client -> OnNotifyComplete");
    }
    _var1 = notifyArgs.getOnComplete();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return this.raiseAction(notifyArgs.getOnComplete(), args, "Client -> Notify -> OnComplete");
    }
  };

  client.prototype.raiseNotifyDelivery = function() {
    var args, args2, onReceive, reconnectAfter, response, _var0;
    onReceive = arguments[0];
    response = arguments[1];
    reconnectAfter = arguments[2];
    args2 = new fm.websync.notifyReceiveArgs(response.__dataJson, response.__dataBytes, this._connectionType, reconnectAfter);
    args2.setExtensions(response.getExtensions());
    args2.setTimestamp(fm.websync.client.getTimestamp(response));
    args2.setClient(this);
    args = args2;
    _var0 = onReceive;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseActionManual(onReceive, args, "Client -> OnNotify", true);
    }
    return args.getReconnectAfter();
  };

  client.prototype.raiseNotifyFailure = function() {
    var args, args2, notifyArgs, onNotifyFailure, responseArgs, retry, _var0, _var1;
    notifyArgs = arguments[0];
    responseArgs = arguments[1];
    retry = arguments[2];
    args2 = new fm.websync.notifyFailureArgs();
    args2.__dataJson = fm.websync.client.getDataJsonForNotify(responseArgs.getResponse(), notifyArgs);
    args2.__dataBytes = fm.websync.client.getDataBytesForNotify(responseArgs.getResponse(), notifyArgs);
    args2.setException(responseArgs.getException());
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), notifyArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(notifyArgs.getDynamicProperties());
    args = args2;
    onNotifyFailure = this._onNotifyFailure;
    _var0 = onNotifyFailure;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onNotifyFailure, args, "Client -> OnNotifyFailure");
    }
    _var1 = notifyArgs.getOnFailure();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      retry = this.raiseRetriable(notifyArgs.getOnFailure(), retry, args, "Client -> Notify -> OnFailure");
    }
    return retry;
  };

  client.prototype.raiseNotifySuccess = function() {
    var args, args2, notifyArgs, onNotifySuccess, responseArgs, _var0, _var1;
    notifyArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.notifySuccessArgs();
    args2.__dataJson = fm.websync.client.getDataJsonForNotify(responseArgs.getResponse(), notifyArgs);
    args2.__dataBytes = fm.websync.client.getDataBytesForNotify(responseArgs.getResponse(), notifyArgs);
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), notifyArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(notifyArgs.getDynamicProperties());
    args = args2;
    onNotifySuccess = this._onNotifySuccess;
    _var0 = onNotifySuccess;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onNotifySuccess, args, "Client -> OnNotifySuccess");
    }
    _var1 = notifyArgs.getOnSuccess();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return this.raiseAction(notifyArgs.getOnSuccess(), args, "Client -> Notify -> OnSuccess");
    }
  };

  client.prototype.raisePublishComplete = function() {
    var args, args2, onPublishComplete, publishArgs, responseArgs, _var0, _var1;
    publishArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.publishCompleteArgs();
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), publishArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(publishArgs.getDynamicProperties());
    args = args2;
    onPublishComplete = this._onPublishComplete;
    _var0 = onPublishComplete;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onPublishComplete, args, "Client -> OnPublishComplete");
    }
    _var1 = publishArgs.getOnComplete();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return this.raiseAction(publishArgs.getOnComplete(), args, "Client -> Publish -> OnComplete");
    }
  };

  client.prototype.raisePublishFailure = function() {
    var args, args2, onPublishFailure, publishArgs, responseArgs, retry, _var0, _var1;
    publishArgs = arguments[0];
    responseArgs = arguments[1];
    retry = arguments[2];
    args2 = new fm.websync.publishFailureArgs();
    args2.__channel = fm.websync.client.getChannelForPublish(responseArgs.getResponse(), publishArgs);
    args2.__dataJson = fm.websync.client.getDataJsonForPublish(responseArgs.getResponse(), publishArgs);
    args2.__dataBytes = fm.websync.client.getDataBytesForPublish(responseArgs.getResponse(), publishArgs);
    args2.setException(responseArgs.getException());
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), publishArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(publishArgs.getDynamicProperties());
    args = args2;
    onPublishFailure = this._onPublishFailure;
    _var0 = onPublishFailure;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onPublishFailure, args, "Client -> OnPublishFailure");
    }
    _var1 = publishArgs.getOnFailure();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      retry = this.raiseRetriable(publishArgs.getOnFailure(), retry, args, "Client -> Publish -> OnFailure");
    }
    return retry;
  };

  client.prototype.raisePublishSuccess = function() {
    var args, args2, onPublishSuccess, publishArgs, responseArgs, _var0, _var1;
    publishArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.publishSuccessArgs();
    args2.__channel = fm.websync.client.getChannelForPublish(responseArgs.getResponse(), publishArgs);
    args2.__dataJson = fm.websync.client.getDataJsonForPublish(responseArgs.getResponse(), publishArgs);
    args2.__dataBytes = fm.websync.client.getDataBytesForPublish(responseArgs.getResponse(), publishArgs);
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), publishArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(publishArgs.getDynamicProperties());
    args = args2;
    onPublishSuccess = this._onPublishSuccess;
    _var0 = onPublishSuccess;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onPublishSuccess, args, "Client -> OnPublishSuccess");
    }
    _var1 = publishArgs.getOnSuccess();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return this.raiseAction(publishArgs.getOnSuccess(), args, "Client -> Publish -> OnSuccess");
    }
  };

  client.prototype.raiseRequestEvent = function() {
    var args, eventMethod, eventName;
    eventMethod = arguments[0];
    args = arguments[1];
    eventName = arguments[2];
    this.raiseEvent(eventMethod, args, eventName);
    return !args.getCancel();
  };

  client.prototype.raiseResponseEvent = function() {
    var args, eventMethod, eventName, responseArgs;
    eventMethod = arguments[0];
    args = arguments[1];
    eventName = arguments[2];
    responseArgs = arguments[3];
    args.setException(responseArgs.getException());
    args.setResponse(responseArgs.getResponse());
    return this.raiseEvent(eventMethod, args, eventName);
  };

  client.prototype.raiseRetriable = function() {
    var args, callback, retry, source;
    callback = arguments[0];
    retry = arguments[1];
    args = arguments[2];
    source = arguments[3];
    args.setRetry(retry);
    this.raiseAction(callback, args, source);
    return args.getRetry();
  };

  client.prototype.raiseSendException = function() {
    var exception, p, request, state, _i, _len, _results, _var0;
    state = arguments[0];
    exception = arguments[1];
    _var0 = state.getRequests();
    _results = [];
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      request = _var0[_i];
      p = new fm.websync.clientResponseArgs();
      p.setDynamicProperties(request.getDynamicProperties());
      p.setException(exception);
      _results.push(request.getCallback()(p));
    }
    return _results;
  };

  client.prototype.raiseServerBind = function() {
    var args, onServerBind, serverAction, _var0;
    serverAction = arguments[0];
    onServerBind = this._onServerBind;
    _var0 = onServerBind;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      args = new fm.websync.serverBindArgs();
      args.__records = serverAction.getRecords();
      args.setExtensions(serverAction.getExtensions());
      args.setTimestamp(serverAction.getTimestamp());
      args.setClient(this);
      return this.raiseAction(onServerBind, args, "Client -> OnServerBind");
    }
  };

  client.prototype.raiseServerSubscribe = function() {
    var args, onServerSubscribe, serverAction, _var0;
    serverAction = arguments[0];
    onServerSubscribe = this._onServerSubscribe;
    _var0 = onServerSubscribe;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      args = new fm.websync.serverSubscribeArgs();
      args.__channels = serverAction.getChannels();
      args.setExtensions(serverAction.getExtensions());
      args.setTimestamp(serverAction.getTimestamp());
      args.setClient(this);
      return this.raiseFunction(onServerSubscribe, args, "Client -> OnServerSubscribe");
    }
    return null;
  };

  client.prototype.raiseServerUnbind = function() {
    var args, onServerUnbind, serverAction, _var0;
    serverAction = arguments[0];
    onServerUnbind = this._onServerUnbind;
    _var0 = onServerUnbind;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      args = new fm.websync.serverUnbindArgs();
      args.__records = serverAction.getRecords();
      args.setExtensions(serverAction.getExtensions());
      args.setTimestamp(serverAction.getTimestamp());
      args.setClient(this);
      return this.raiseAction(onServerUnbind, args, "Client -> OnServerUnbind");
    }
  };

  client.prototype.raiseServerUnsubscribe = function() {
    var args, onServerUnsubscribe, serverAction, _var0;
    serverAction = arguments[0];
    onServerUnsubscribe = this._onServerUnsubscribe;
    _var0 = onServerUnsubscribe;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      args = new fm.websync.serverUnsubscribeArgs();
      args.__channels = serverAction.getChannels();
      args.setExtensions(serverAction.getExtensions());
      args.setTimestamp(serverAction.getTimestamp());
      args.setClient(this);
      return this.raiseAction(onServerUnsubscribe, args, "Client -> OnServerUnsubscribe");
    }
  };

  client.prototype.raiseServiceComplete = function() {
    var args, args2, onServiceComplete, responseArgs, serviceArgs, _var0, _var1;
    serviceArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.serviceCompleteArgs();
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), serviceArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(serviceArgs.getDynamicProperties());
    args = args2;
    onServiceComplete = this._onServiceComplete;
    _var0 = onServiceComplete;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onServiceComplete, args, "Client -> OnServiceComplete");
    }
    _var1 = serviceArgs.getOnComplete();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return this.raiseAction(serviceArgs.getOnComplete(), args, "Client -> Service -> OnComplete");
    }
  };

  client.prototype.raiseServiceFailure = function() {
    var args, args2, onServiceFailure, responseArgs, retry, serviceArgs, _var0, _var1;
    serviceArgs = arguments[0];
    responseArgs = arguments[1];
    retry = arguments[2];
    args2 = new fm.websync.serviceFailureArgs();
    args2.__channel = fm.websync.client.getChannelForService(responseArgs.getResponse(), serviceArgs);
    args2.__dataJson = fm.websync.client.getDataJsonForService(responseArgs.getResponse(), serviceArgs);
    args2.__dataBytes = fm.websync.client.getDataBytesForService(responseArgs.getResponse(), serviceArgs);
    args2.setException(responseArgs.getException());
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), serviceArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(serviceArgs.getDynamicProperties());
    args = args2;
    onServiceFailure = this._onServiceFailure;
    _var0 = onServiceFailure;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onServiceFailure, args, "Client -> OnServiceFailure");
    }
    _var1 = serviceArgs.getOnFailure();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      retry = this.raiseRetriable(serviceArgs.getOnFailure(), retry, args, "Client -> Service -> OnFailure");
    }
    return retry;
  };

  client.prototype.raiseServiceSuccess = function() {
    var args, args2, onServiceSuccess, responseArgs, serviceArgs, _var0, _var1;
    serviceArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.serviceSuccessArgs();
    args2.__channel = fm.websync.client.getChannelForService(responseArgs.getResponse(), serviceArgs);
    args2.__dataJson = fm.websync.client.getDataJsonForService(responseArgs.getResponse(), serviceArgs);
    args2.__dataBytes = fm.websync.client.getDataBytesForService(responseArgs.getResponse(), serviceArgs);
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), serviceArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(serviceArgs.getDynamicProperties());
    args = args2;
    onServiceSuccess = this._onServiceSuccess;
    _var0 = onServiceSuccess;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onServiceSuccess, args, "Client -> OnServiceSuccess");
    }
    _var1 = serviceArgs.getOnSuccess();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return this.raiseAction(serviceArgs.getOnSuccess(), args, "Client -> Service -> OnSuccess");
    }
  };

  client.prototype.raiseStreamFailure = function() {
    var args, args2, connectArgs, onStreamFailure, responseArgs, _var0, _var1;
    connectArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.streamFailureArgs();
    args2.setException(responseArgs.getException());
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), connectArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setConnectArgs(connectArgs);
    args2.setDynamicProperties(connectArgs.getDynamicProperties());
    args = args2;
    onStreamFailure = this._onStreamFailure;
    _var0 = onStreamFailure;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onStreamFailure, args, "Client -> OnStreamFailure");
    }
    _var1 = connectArgs.getOnStreamFailure();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      this.raiseAction(connectArgs.getOnStreamFailure(), args, "Client -> Connect -> OnStreamFailure");
    }
    return args.getConnectArgs();
  };

  client.prototype.raiseSubscribeComplete = function() {
    var args, args2, onSubscribeComplete, responseArgs, subscribeArgs, _var0, _var1;
    subscribeArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.subscribeCompleteArgs();
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), subscribeArgs));
    args2.setIsResubscribe(subscribeArgs.getIsResubscribe());
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(subscribeArgs.getDynamicProperties());
    args = args2;
    onSubscribeComplete = this._onSubscribeComplete;
    _var0 = onSubscribeComplete;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onSubscribeComplete, args, "Client -> OnSubscribeComplete");
    }
    _var1 = subscribeArgs.getOnComplete();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return this.raiseAction(subscribeArgs.getOnComplete(), args, "Client -> Subscribe -> OnComplete");
    }
  };

  client.prototype.raiseSubscribeDelivery = function() {
    var args, args2, dynamicProperties, onReceive, reconnectAfter, response, _var0;
    onReceive = arguments[0];
    dynamicProperties = arguments[1];
    response = arguments[2];
    reconnectAfter = arguments[3];
    args2 = new fm.websync.subscribeReceiveArgs(response.getBayeuxChannel(), response.__dataJson, response.__dataBytes, this._connectionType, reconnectAfter);
    args2.setExtensions(response.getExtensions());
    args2.setTimestamp(fm.websync.client.getTimestamp(response));
    args2.setClient(this);
    args2.setDynamicProperties(dynamicProperties);
    args = args2;
    _var0 = onReceive;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseActionManual(onReceive, args, "Client -> Subscribe -> OnReceive", true);
    }
    return args.getReconnectAfter();
  };

  client.prototype.raiseSubscribeFailure = function() {
    var args, args2, onSubscribeFailure, responseArgs, retry, subscribeArgs, _var0, _var1;
    subscribeArgs = arguments[0];
    responseArgs = arguments[1];
    retry = arguments[2];
    args2 = new fm.websync.subscribeFailureArgs();
    args2.__channels = fm.websync.client.getChannelsForSubscribe(responseArgs.getResponse(), subscribeArgs);
    args2.setException(responseArgs.getException());
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), subscribeArgs));
    args2.setIsResubscribe(subscribeArgs.getIsResubscribe());
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(subscribeArgs.getDynamicProperties());
    args = args2;
    onSubscribeFailure = this._onSubscribeFailure;
    _var0 = onSubscribeFailure;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onSubscribeFailure, args, "Client -> OnSubscribeFailure");
    }
    _var1 = subscribeArgs.getOnFailure();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      retry = this.raiseRetriable(subscribeArgs.getOnFailure(), retry, args, "Client -> Subscribe -> OnFailure");
    }
    return retry;
  };

  client.prototype.raiseSubscribeSuccess = function() {
    var args, args2, onSubscribeSuccess, responseArgs, subscribeArgs, _var0, _var1;
    subscribeArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.subscribeSuccessArgs();
    args2.__channels = fm.websync.client.getChannelsForSubscribe(responseArgs.getResponse(), subscribeArgs);
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), subscribeArgs));
    args2.setIsResubscribe(subscribeArgs.getIsResubscribe());
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(subscribeArgs.getDynamicProperties());
    args = args2;
    onSubscribeSuccess = this._onSubscribeSuccess;
    _var0 = onSubscribeSuccess;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onSubscribeSuccess, args, "Client -> OnSubscribeSuccess");
    }
    _var1 = subscribeArgs.getOnSuccess();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return this.raiseAction(subscribeArgs.getOnSuccess(), args, "Client -> Subscribe -> OnSuccess");
    }
  };

  client.prototype.raiseUnbindComplete = function() {
    var args, args2, forced, onUnbindComplete, responseArgs, unbindArgs, _var0, _var1;
    unbindArgs = arguments[0];
    responseArgs = arguments[1];
    forced = arguments[2];
    args2 = new fm.websync.unbindCompleteArgs();
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), unbindArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(unbindArgs.getDynamicProperties());
    args2.__forced = forced;
    args = args2;
    onUnbindComplete = this._onUnbindComplete;
    _var0 = onUnbindComplete;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onUnbindComplete, args, "Client -> OnUnbindComplete");
    }
    _var1 = unbindArgs.getOnComplete();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return this.raiseAction(unbindArgs.getOnComplete(), args, "Client -> Unbind -> OnComplete");
    }
  };

  client.prototype.raiseUnbindFailure = function() {
    var args, args2, onUnbindFailure, responseArgs, retry, unbindArgs, _var0, _var1;
    unbindArgs = arguments[0];
    responseArgs = arguments[1];
    retry = arguments[2];
    args2 = new fm.websync.unbindFailureArgs();
    args2.__records = fm.websync.client.getRecordsForUnbind(responseArgs.getResponse(), unbindArgs);
    args2.setException(responseArgs.getException());
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), unbindArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(unbindArgs.getDynamicProperties());
    args = args2;
    onUnbindFailure = this._onUnbindFailure;
    _var0 = onUnbindFailure;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onUnbindFailure, args, "Client -> OnUnbindFailure");
    }
    _var1 = unbindArgs.getOnFailure();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      retry = this.raiseRetriable(unbindArgs.getOnFailure(), retry, args, "Client -> Unbind -> OnFailure");
    }
    return retry;
  };

  client.prototype.raiseUnbindSuccess = function() {
    var args, args2, forced, onUnbindSuccess, responseArgs, unbindArgs, _var0, _var1;
    unbindArgs = arguments[0];
    responseArgs = arguments[1];
    forced = arguments[2];
    args2 = new fm.websync.unbindSuccessArgs();
    args2.__records = fm.websync.client.getRecordsForUnbind(responseArgs.getResponse(), unbindArgs);
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), unbindArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(unbindArgs.getDynamicProperties());
    args2.__forced = forced;
    args = args2;
    onUnbindSuccess = this._onUnbindSuccess;
    _var0 = onUnbindSuccess;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onUnbindSuccess, args, "Client -> OnUnbindSuccess");
    }
    _var1 = unbindArgs.getOnSuccess();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return this.raiseAction(unbindArgs.getOnSuccess(), args, "Client -> Unbind -> OnSuccess");
    }
  };

  client.prototype.raiseUnsubscribeComplete = function() {
    var args, args2, forced, onUnsubscribeComplete, responseArgs, unsubscribeArgs, _var0, _var1;
    unsubscribeArgs = arguments[0];
    responseArgs = arguments[1];
    forced = arguments[2];
    args2 = new fm.websync.unsubscribeCompleteArgs();
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), unsubscribeArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(unsubscribeArgs.getDynamicProperties());
    args2.__forced = forced;
    args = args2;
    onUnsubscribeComplete = this._onUnsubscribeComplete;
    _var0 = onUnsubscribeComplete;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onUnsubscribeComplete, args, "Client -> OnUnsubscribeComplete");
    }
    _var1 = unsubscribeArgs.getOnComplete();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return this.raiseAction(unsubscribeArgs.getOnComplete(), args, "Client -> Unsubscribe -> OnComplete");
    }
  };

  client.prototype.raiseUnsubscribeFailure = function() {
    var args, args2, onUnsubscribeFailure, responseArgs, retry, unsubscribeArgs, _var0, _var1;
    unsubscribeArgs = arguments[0];
    responseArgs = arguments[1];
    retry = arguments[2];
    args2 = new fm.websync.unsubscribeFailureArgs();
    args2.__channels = fm.websync.client.getChannelsForUnsubscribe(responseArgs.getResponse(), unsubscribeArgs);
    args2.setException(responseArgs.getException());
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), unsubscribeArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(unsubscribeArgs.getDynamicProperties());
    args = args2;
    onUnsubscribeFailure = this._onUnsubscribeFailure;
    _var0 = onUnsubscribeFailure;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onUnsubscribeFailure, args, "Client -> OnUnsubscribeFailure");
    }
    _var1 = unsubscribeArgs.getOnFailure();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      retry = this.raiseRetriable(unsubscribeArgs.getOnFailure(), retry, args, "Client -> Unsubscribe -> OnFailure");
    }
    return retry;
  };

  client.prototype.raiseUnsubscribeSuccess = function() {
    var args, args2, forced, onUnsubscribeSuccess, responseArgs, unsubscribeArgs, _var0, _var1;
    unsubscribeArgs = arguments[0];
    responseArgs = arguments[1];
    forced = arguments[2];
    args2 = new fm.websync.unsubscribeSuccessArgs();
    args2.__channels = fm.websync.client.getChannelsForUnsubscribe(responseArgs.getResponse(), unsubscribeArgs);
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), unsubscribeArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(unsubscribeArgs.getDynamicProperties());
    args2.__forced = forced;
    args = args2;
    onUnsubscribeSuccess = this._onUnsubscribeSuccess;
    _var0 = onUnsubscribeSuccess;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      this.raiseAction(onUnsubscribeSuccess, args, "Client -> OnUnsubscribeSuccess");
    }
    _var1 = unsubscribeArgs.getOnSuccess();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return this.raiseAction(unsubscribeArgs.getOnSuccess(), args, "Client -> Unsubscribe -> OnSuccess");
    }
  };

  client.prototype.receiveMessage = function() {
    var dictionary, dictionary2, dictionary3, i, list, list2, list3, message, onNotify, onReceive, reconnectAfter, serverAction, str, str2, _i, _j, _k, _l, _len, _len1, _len2, _len3, _var0, _var1, _var2, _var3, _var4, _var5, _var6, _var7, _var8;
    message = arguments[0];
    reconnectAfter = arguments[1];
    if (message.getBayeuxChannel() === "/meta/notify") {
      if (message.getTag() === "fm.server") {
        serverAction = fm.websync.message.fromJson(message.getDataJson());
        reconnectAfter = this.processServerAction(serverAction, reconnectAfter);
      } else {
        onNotify = this._onNotify;
        _var0 = onNotify;
        if (_var0 !== null && typeof _var0 !== 'undefined') {
          reconnectAfter = this.raiseNotifyDelivery(onNotify, message, reconnectAfter);
        }
      }
      return reconnectAfter;
    }
    list = [];
    list2 = [];
    _var1 = fm.hashExtensions.getKeys(this._customOnReceives);
    for (_i = 0, _len = _var1.length; _i < _len; _i++) {
      str = _var1[_i];
      dictionary = this._customOnReceives[str];
      _var2 = fm.hashExtensions.getKeys(dictionary);
      for (_j = 0, _len1 = _var2.length; _j < _len1; _j++) {
        str2 = _var2[_j];
        if (str2 === message.getChannel()) {
          fm.arrayExtensions.add(list, dictionary[str2]);
          fm.arrayExtensions.add(list2, {});
        }
      }
    }
    _var3 = fm.hashExtensions.getKeys(this._subscribedOnReceives);
    for (_k = 0, _len2 = _var3.length; _k < _len2; _k++) {
      str = _var3[_k];
      dictionary2 = this._subscribedOnReceives[str];
      _var4 = fm.hashExtensions.getKeys(dictionary2);
      for (_l = 0, _len3 = _var4.length; _l < _len3; _l++) {
        str2 = _var4[_l];
        if (str2 === message.getChannel()) {
          fm.arrayExtensions.add(list, dictionary2[str2]);
          dictionary3 = null;
          _var5 = new fm.holder(dictionary3);
          _var6 = fm.hashExtensions.tryGetValue(this._subscribedDynamicProperties, fm.websync.client.getSubscribeKey(str2, str), _var5);
          dictionary3 = _var5.getValue();
          if (!_var6) {
            dictionary3 = {};
          }
          fm.arrayExtensions.add(list2, dictionary3);
        }
      }
    }
    if (fm.arrayExtensions.getCount(list) === 0) {
      list3 = null;
      _var7 = new fm.holder(list3);
      _var8 = fm.hashExtensions.tryGetValue(this._pendingReceives, message.getChannel(), _var7);
      list3 = _var7.getValue();
      if (!_var8) {
        list3 = [];
        this._pendingReceives[message.getChannel()] = list3;
      }
      fm.arrayExtensions.add(list3, message);
      return reconnectAfter;
    }
    i = 0;
    while (i < fm.arrayExtensions.getCount(list)) {
      try {
        onReceive = list[i];
        dictionary3 = null;
        if (i < fm.arrayExtensions.getCount(list2)) {
          dictionary3 = list2[i];
        }
        reconnectAfter = this.raiseSubscribeDelivery(onReceive, dictionary3, message, reconnectAfter);
      } finally {
        i++;
      }
    }
    return reconnectAfter;
  };

  client.prototype.reconnect = function() {
    var connectArgs, responseArgs;
    connectArgs = arguments[0];
    responseArgs = arguments[1];
    this.raiseForcedUnsubscribes(connectArgs, responseArgs);
    this.raiseForcedUnbinds(connectArgs, responseArgs);
    this.clearBoundRecords();
    this.clearSubscribedChannels();
    this.setIsConnected(false);
    this._queueActivated = false;
    connectArgs.setIsReconnect(true);
    connectArgs.setLastClientId(this.getClientId());
    connectArgs.setLastSessionId(this.getSessionId());
    this.connect(connectArgs);
    return this;
  };

  client.prototype.removeBoundRecords = function() {
    var record, records, _i, _len, _results, _var0;
    records = arguments[0];
    _var0 = records;
    _results = [];
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      record = _var0[_i];
      _results.push(fm.hashExtensions.remove(this._boundRecords, record.getKey()));
    }
    return _results;
  };

  /*<span id='method-fm.websync.client-removeOnBindComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client completes a bind, successfully or not.
  	 </div>
  
  	@function removeOnBindComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnBindComplete = function() {
    var value;
    value = arguments[0];
    return this._onBindComplete = fm.delegate.remove(this._onBindComplete, value);
  };

  /*<span id='method-fm.websync.client-removeOnBindFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client fails to bind.
  	 </div>
  
  	@function removeOnBindFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnBindFailure = function() {
    var value;
    value = arguments[0];
    return this._onBindFailure = fm.delegate.remove(this._onBindFailure, value);
  };

  /*<span id='method-fm.websync.client-removeOnBindSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client successfully binds.
  	 </div>
  
  	@function removeOnBindSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnBindSuccess = function() {
    var value;
    value = arguments[0];
    return this._onBindSuccess = fm.delegate.remove(this._onBindSuccess, value);
  };

  /*<span id='method-fm.websync.client-removeOnConnectComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client completes a connect, successfully or not.
  	 </div>
  
  	@function removeOnConnectComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnConnectComplete = function() {
    var value;
    value = arguments[0];
    return this._onConnectComplete = fm.delegate.remove(this._onConnectComplete, value);
  };

  /*<span id='method-fm.websync.client-removeOnConnectFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client fails to connect.
  	 </div>
  
  	@function removeOnConnectFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnConnectFailure = function() {
    var value;
    value = arguments[0];
    return this._onConnectFailure = fm.delegate.remove(this._onConnectFailure, value);
  };

  /*<span id='method-fm.websync.client-removeOnConnectSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client successfully connects.
  	 </div>
  
  	@function removeOnConnectSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnConnectSuccess = function() {
    var value;
    value = arguments[0];
    return this._onConnectSuccess = fm.delegate.remove(this._onConnectSuccess, value);
  };

  /*<span id='method-fm.websync.client-removeOnDisconnectComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client completes a disconnect.
  	 </div>
  
  	@function removeOnDisconnectComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnDisconnectComplete = function() {
    var value;
    value = arguments[0];
    return this._onDisconnectComplete = fm.delegate.remove(this._onDisconnectComplete, value);
  };

  /*<span id='method-fm.websync.client-removeOnNotify'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a notification is sent to this client.
  	 </div>
  
  	@function removeOnNotify
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnNotify = function() {
    var value;
    value = arguments[0];
    return this._onNotify = fm.delegate.remove(this._onNotify, value);
  };

  /*<span id='method-fm.websync.client-removeOnNotifyComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client completes a notify, successfully or not.
  	 </div>
  
  	@function removeOnNotifyComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnNotifyComplete = function() {
    var value;
    value = arguments[0];
    return this._onNotifyComplete = fm.delegate.remove(this._onNotifyComplete, value);
  };

  /*<span id='method-fm.websync.client-removeOnNotifyFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client fails to notify.
  	 </div>
  
  	@function removeOnNotifyFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnNotifyFailure = function() {
    var value;
    value = arguments[0];
    return this._onNotifyFailure = fm.delegate.remove(this._onNotifyFailure, value);
  };

  /*<span id='method-fm.websync.client-removeOnNotifySuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client successfully notifies.
  	 </div>
  
  	@function removeOnNotifySuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnNotifySuccess = function() {
    var value;
    value = arguments[0];
    return this._onNotifySuccess = fm.delegate.remove(this._onNotifySuccess, value);
  };

  /*<span id='method-fm.websync.client-removeOnPublishComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client completes a publish, successfully or not.
  	 </div>
  
  	@function removeOnPublishComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnPublishComplete = function() {
    var value;
    value = arguments[0];
    return this._onPublishComplete = fm.delegate.remove(this._onPublishComplete, value);
  };

  /*<span id='method-fm.websync.client-removeOnPublishFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client fails to publish.
  	 </div>
  
  	@function removeOnPublishFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnPublishFailure = function() {
    var value;
    value = arguments[0];
    return this._onPublishFailure = fm.delegate.remove(this._onPublishFailure, value);
  };

  /*<span id='method-fm.websync.client-removeOnPublishSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client successfully publishes.
  	 </div>
  
  	@function removeOnPublishSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnPublishSuccess = function() {
    var value;
    value = arguments[0];
    return this._onPublishSuccess = fm.delegate.remove(this._onPublishSuccess, value);
  };

  /*<span id='method-fm.websync.client-removeOnServerBind'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever the server binds
  	 the client to a record or set of records.
  	 </div>
  
  	@function removeOnServerBind
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnServerBind = function() {
    var value;
    value = arguments[0];
    return this._onServerBind = fm.delegate.remove(this._onServerBind, value);
  };

  /*<span id='method-fm.websync.client-removeOnServerSubscribe'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever the server subscribes
  	 the client to a channel or set of channels.
  	 </div>
  
  	@function removeOnServerSubscribe
  	@param {fm.singleFunction} value
  	@return {void}
  */


  client.prototype.removeOnServerSubscribe = function() {
    var value;
    value = arguments[0];
    return this._onServerSubscribe = fm.delegate.remove(this._onServerSubscribe, value);
  };

  /*<span id='method-fm.websync.client-removeOnServerUnbind'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever the server unbinds
  	 the client from a record or set of records.
  	 </div>
  
  	@function removeOnServerUnbind
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnServerUnbind = function() {
    var value;
    value = arguments[0];
    return this._onServerUnbind = fm.delegate.remove(this._onServerUnbind, value);
  };

  /*<span id='method-fm.websync.client-removeOnServerUnsubscribe'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever the server unsubscribes
  	 the client from a channel or set of channels.
  	 </div>
  
  	@function removeOnServerUnsubscribe
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnServerUnsubscribe = function() {
    var value;
    value = arguments[0];
    return this._onServerUnsubscribe = fm.delegate.remove(this._onServerUnsubscribe, value);
  };

  /*<span id='method-fm.websync.client-removeOnServiceComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client completes a service, successfully or not.
  	 </div>
  
  	@function removeOnServiceComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnServiceComplete = function() {
    var value;
    value = arguments[0];
    return this._onServiceComplete = fm.delegate.remove(this._onServiceComplete, value);
  };

  /*<span id='method-fm.websync.client-removeOnServiceFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client fails to service.
  	 </div>
  
  	@function removeOnServiceFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnServiceFailure = function() {
    var value;
    value = arguments[0];
    return this._onServiceFailure = fm.delegate.remove(this._onServiceFailure, value);
  };

  /*<span id='method-fm.websync.client-removeOnServiceSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client successfully services.
  	 </div>
  
  	@function removeOnServiceSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnServiceSuccess = function() {
    var value;
    value = arguments[0];
    return this._onServiceSuccess = fm.delegate.remove(this._onServiceSuccess, value);
  };

  /*<span id='method-fm.websync.client-removeOnStreamFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever the client's streaming connection breaks down.
  	 </div>
  
  	@function removeOnStreamFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnStreamFailure = function() {
    var value;
    value = arguments[0];
    return this._onStreamFailure = fm.delegate.remove(this._onStreamFailure, value);
  };

  /*<span id='method-fm.websync.client-removeOnSubscribeComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client completes a subscribe, successfully or not.
  	 </div>
  
  	@function removeOnSubscribeComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnSubscribeComplete = function() {
    var value;
    value = arguments[0];
    return this._onSubscribeComplete = fm.delegate.remove(this._onSubscribeComplete, value);
  };

  /*<span id='method-fm.websync.client-removeOnSubscribeFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client fails to subscribe.
  	 </div>
  
  	@function removeOnSubscribeFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnSubscribeFailure = function() {
    var value;
    value = arguments[0];
    return this._onSubscribeFailure = fm.delegate.remove(this._onSubscribeFailure, value);
  };

  /*<span id='method-fm.websync.client-removeOnSubscribeSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client successfully subscribes.
  	 </div>
  
  	@function removeOnSubscribeSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnSubscribeSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSubscribeSuccess = fm.delegate.remove(this._onSubscribeSuccess, value);
  };

  /*<span id='method-fm.websync.client-removeOnUnbindComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client completes an unbind, successfully or not.
  	 </div>
  
  	@function removeOnUnbindComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnUnbindComplete = function() {
    var value;
    value = arguments[0];
    return this._onUnbindComplete = fm.delegate.remove(this._onUnbindComplete, value);
  };

  /*<span id='method-fm.websync.client-removeOnUnbindFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client fails to unbind.
  	 </div>
  
  	@function removeOnUnbindFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnUnbindFailure = function() {
    var value;
    value = arguments[0];
    return this._onUnbindFailure = fm.delegate.remove(this._onUnbindFailure, value);
  };

  /*<span id='method-fm.websync.client-removeOnUnbindSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client successfully unbinds.
  	 </div>
  
  	@function removeOnUnbindSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnUnbindSuccess = function() {
    var value;
    value = arguments[0];
    return this._onUnbindSuccess = fm.delegate.remove(this._onUnbindSuccess, value);
  };

  /*<span id='method-fm.websync.client-removeOnUnsubscribeComplete'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client completes an unsubscribe, successfully or not.
  	 </div>
  
  	@function removeOnUnsubscribeComplete
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnUnsubscribeComplete = function() {
    var value;
    value = arguments[0];
    return this._onUnsubscribeComplete = fm.delegate.remove(this._onUnsubscribeComplete, value);
  };

  /*<span id='method-fm.websync.client-removeOnUnsubscribeFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client fails to unsubscribe.
  	 </div>
  
  	@function removeOnUnsubscribeFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnUnsubscribeFailure = function() {
    var value;
    value = arguments[0];
    return this._onUnsubscribeFailure = fm.delegate.remove(this._onUnsubscribeFailure, value);
  };

  /*<span id='method-fm.websync.client-removeOnUnsubscribeSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client successfully unsubscribes.
  	 </div>
  
  	@function removeOnUnsubscribeSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  client.prototype.removeOnUnsubscribeSuccess = function() {
    var value;
    value = arguments[0];
    return this._onUnsubscribeSuccess = fm.delegate.remove(this._onUnsubscribeSuccess, value);
  };

  client.prototype.removeSubscribedChannels = function() {
    var channels, list, str, tag, _i, _len, _var0, _var1, _var2;
    tag = arguments[0];
    channels = arguments[1];
    list = null;
    _var0 = new fm.holder(list);
    _var1 = fm.hashExtensions.tryGetValue(this._subscribedChannels, tag, _var0);
    list = _var0.getValue();
    if (_var1) {
      _var2 = channels;
      for (_i = 0, _len = _var2.length; _i < _len; _i++) {
        str = _var2[_i];
        fm.arrayExtensions.remove(list, str);
      }
      if (fm.arrayExtensions.getCount(list) === 0) {
        return fm.hashExtensions.remove(this._subscribedChannels, tag);
      }
    }
  };

  client.prototype.removeSubscribedOnReceive = function() {
    var channels, dictionary, str, tag, _i, _len, _var0, _var1, _var2;
    tag = arguments[0];
    channels = arguments[1];
    dictionary = null;
    _var0 = new fm.holder(dictionary);
    _var1 = fm.hashExtensions.tryGetValue(this._subscribedOnReceives, tag, _var0);
    dictionary = _var0.getValue();
    if (_var1) {
      _var2 = channels;
      for (_i = 0, _len = _var2.length; _i < _len; _i++) {
        str = _var2[_i];
        fm.hashExtensions.remove(dictionary, str);
        fm.hashExtensions.remove(this._subscribedDynamicProperties, fm.websync.client.getSubscribeKey(str, tag));
      }
      if (fm.hashExtensions.getCount(dictionary) === 0) {
        return fm.hashExtensions.remove(this._subscribedOnReceives, tag);
      }
    }
  };

  client.prototype.restream = function() {
    var connectArgs, receivedMessages, reconnectAfter, state;
    connectArgs = arguments[0];
    receivedMessages = arguments[1];
    reconnectAfter = arguments[2];
    if (reconnectAfter < this._lastInterval) {
      reconnectAfter = this._lastInterval;
    }
    if ((this.getConcurrencyMode() === fm.websync.concurrencyMode.Low) && (reconnectAfter > 0)) {
      state = new fm.websync.deferredStreamState();
      state.setConnectArgs(connectArgs);
      state.setReceivedMessages(receivedMessages);
      return fm.deferrer.defer(this.streamDeferred, reconnectAfter, state);
    } else {
      return this.stream(connectArgs, receivedMessages);
    }
  };

  client.prototype.retryConnect = function() {
    var backoffTimeout, connectArgs;
    connectArgs = arguments[0];
    backoffTimeout = arguments[1];
    this._lastBackoffIndex++;
    this._lastBackoffTimeout = backoffTimeout;
    connectArgs.setIsRetry(true);
    return this.connect(connectArgs);
  };

  client.prototype.retryConnectDeferred = function() {
    var s, state;
    s = arguments[0];
    state = s;
    return this.retryConnect(state.getConnectArgs(), state.getBackoffTimeout());
  };

  client.prototype.send = function() {
    var request, synchronous, timeout, url;
    request = arguments[0];
    url = arguments[1];
    synchronous = arguments[2];
    timeout = arguments[3];
    return this.sendMany([request], url, synchronous, timeout);
  };

  client.prototype.sendCallback = function() {
    var advice, args2, dynamicValue, list, message, message2, p, request, responseArgs, serverActions, _i, _j, _len, _len1, _results, _var0, _var1, _var10, _var11, _var2, _var3, _var4, _var5, _var6, _var7, _var8, _var9;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getRequestArgs().getDynamicValue(fm.websync.client._stateKey);
    _var0 = responseArgs.getException();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return this.raiseSendException(dynamicValue, responseArgs.getException());
    } else {
      _var1 = responseArgs.getMessages();
      if ((_var1 === null || typeof _var1 === 'undefined') || (responseArgs.getMessages().length === 0)) {
        return this.raiseSendException(dynamicValue, new Error("Invalid response received from server."));
      } else {
        list = [];
        _var2 = responseArgs.getMessages();
        for (_i = 0, _len = _var2.length; _i < _len; _i++) {
          message = _var2[_i];
          advice = message.getAdvice();
          _var3 = advice;
          if (_var3 !== null && typeof _var3 !== 'undefined') {
            this.processAdvice(advice);
            switch (this._connectionType) {
              case fm.websync.connectionType.WebSocket:
                _var4 = advice.getWebSocket();
                if (_var4 !== null && typeof _var4 !== 'undefined') {
                  this.processAdvice(advice.getWebSocket());
                }
                break;
              case fm.websync.connectionType.LongPolling:
                _var5 = advice.getLongPolling();
                if (_var5 !== null && typeof _var5 !== 'undefined') {
                  this.processAdvice(advice.getLongPolling());
                }
                break;
              case fm.websync.connectionType.CallbackPolling:
                _var6 = advice.getCallbackPolling();
                if (_var6 !== null && typeof _var6 !== 'undefined') {
                  this.processAdvice(advice.getCallbackPolling());
                }
                break;
            }
          }
          if (!dynamicValue.getIsStream() || (message.getBayeuxChannel() === "/meta/connect")) {
            if (fm.stringExtensions.isNullOrEmpty(message.getId())) {
              this.raiseSendException(dynamicValue, new Error(message.getError()));
              return;
            }
            request = null;
            _var7 = new fm.holder(request);
            _var8 = fm.hashExtensions.tryGetValue(dynamicValue.getRequestMapping(), message.getId(), _var7);
            request = _var7.getValue();
            if (!_var8) {
              this.raiseSendException(dynamicValue, new Error(message.getError()));
              return;
            }
            p = new fm.websync.clientResponseArgs();
            p.setDynamicProperties(request.getDynamicProperties());
            p.setResponse(message);
            p.setException((message.getSuccessful() ? null : new Error(message.getError())));
            request.getCallback()(p);
          } else {
            fm.arrayExtensions.add(list, message);
          }
        }
        if (fm.arrayExtensions.getCount(list) > 0) {
          args2 = new fm.websync.clientResponseArgs();
          args2.setDynamicProperties(dynamicValue.getRequests()[0].getDynamicProperties());
          args2.setResponses(fm.arrayExtensions.toArray(list));
          dynamicValue.getRequests()[0].getCallback()(args2);
        }
        _var9 = responseArgs.getMessages();
        _results = [];
        for (_j = 0, _len1 = _var9.length; _j < _len1; _j++) {
          message = _var9[_j];
          serverActions = message.getServerActions();
          _var10 = serverActions;
          if (_var10 !== null && typeof _var10 !== 'undefined') {
            _var11 = serverActions;
            _results.push((function() {
              var _k, _len2, _results1;
              _results1 = [];
              for (_k = 0, _len2 = _var11.length; _k < _len2; _k++) {
                message2 = _var11[_k];
                _results1.push(this.processServerAction(message2, this._lastInterval));
              }
              return _results1;
            }).call(this));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    }
  };

  client.prototype.sendMany = function() {
    var args3, dictionary, flag, list, request, requestArgs, requests, responseArgs, state, str, synchronous, timeout, transfer, url, _i, _len, _var0, _var1;
    requests = arguments[0];
    url = arguments[1];
    synchronous = arguments[2];
    timeout = arguments[3];
    flag = false;
    if (requests.length === 1) {
      flag = requests[0].getMessage().getBayeuxChannel() === "/meta/connect";
    }
    dictionary = {};
    list = [];
    _var0 = requests;
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      request = _var0[_i];
      _var1 = this.getClientId();
      if (!(!(_var1 === null ? _var1 !== fm.guid.empty : !_var1.equals(fm.guid.empty)) || request.getMessage().isConnect())) {
        request.getMessage().setClientId(this.getClientId());
        request.getMessage().setSessionId(this.getSessionId());
      }
      if (this.getDisableBinary()) {
        request.getMessage().setDisableBinary(this.getDisableBinary());
      }
      this._counter++;
      request.getMessage().setId(fm.intExtensions.toString(this._counter));
      fm.arrayExtensions.add(list, request.getMessage());
      dictionary[request.getMessage().getId()] = request;
    }
    str = this.processRequestUrl(url);
    url = this.processRequestUrl(url);
    if (flag) {
      timeout = this.getStreamRequestTimeout();
    } else {
      if (timeout === 0) {
        timeout = this.getRequestTimeout();
      }
    }
    transfer = (flag ? this._streamRequestTransfer : this._requestTransfer);
    args3 = new fm.websync.messageRequestArgs(this.createHeaders());
    args3.setMessages(fm.arrayExtensions.toArray(list));
    args3.setOnRequestCreated(this.internalOnRequestCreated);
    args3.setOnResponseReceived(this.internalOnResponseReceived);
    args3.setOnHttpRequestCreated(this.internalOnHttpRequestCreated);
    args3.setOnHttpResponseReceived(this.internalOnHttpResponseReceived);
    args3.setSender(this);
    args3.setTimeout(timeout);
    args3.setUrl(url);
    requestArgs = args3;
    requestArgs.setDynamicValue("frameUrl", str);
    state = new fm.websync.clientSendState();
    state.setRequests(requests);
    state.setRequestMapping(dictionary);
    state.setIsStream(flag);
    requestArgs.setDynamicValue(fm.websync.client._stateKey, state);
    if (synchronous) {
      responseArgs = transfer.send(requestArgs);
      return this.sendCallback(responseArgs);
    } else {
      return transfer.sendAsync(requestArgs, this.sendCallback);
    }
  };

  /*<span id='method-fm.websync.client-service'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Services data to a specified channel.
  	 </div><div>
  	 <p>
  	 Servicing allows the client to send data to the server in a traditional
  	 request/response fashion. Data is not broadcast and the state of the
  	 client remains unchanged after service calls.
  	 </p>
  	 <p>
  	 When the service completes successfully, the OnSuccess callback
  	 will be invoked, passing in the
  	 channel and serviced data, <b>including any modifications made on the server</b>.
  	 </p>
  	 </div>
  	@function service
  	@param {fm.websync.serviceArgs} serviceArgs The service arguments.
  	 See fm.websync.serviceArgs for more details.
  	@return {fm.websync.client} The client.
  */


  client.prototype.service = function() {
    var serviceArgs;
    serviceArgs = arguments[0];
    if (fm.stringExtensions.isNullOrEmpty(serviceArgs.getChannel())) {
      throw new Error("channel cannot be null.");
    }
    this.performService(serviceArgs);
    return this;
  };

  client.prototype.setClientId = function() {
    var value;
    value = arguments[0];
    return this._clientId = value;
  };

  /*<span id='method-fm.websync.client-setCustomOnReceive'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets a callback to be invoked whenever messages are received on the specified
  	 channel.
  	 </div><div>
  	 <p>
  	 This method does <b>not</b> subscribe you to a channel. Rather, it caches a
  	 callback to be executed when messages are received on a particular
  	 channel.
  	 </p>
  	 </div>
  	@function setCustomOnReceive
  	@param {String} channel The channel over which the messages will be received.
  	@param {fm.singleAction} onReceive The callback to invoke when a message is received.
  	@return {void}
  */


  client.prototype.setCustomOnReceive = function() {
    var channel, onReceive;
    channel = arguments[0];
    onReceive = arguments[1];
    return this.setCustomOnReceiveWithTag(channel, fm.stringExtensions.empty, onReceive);
  };

  /*<span id='method-fm.websync.client-setCustomOnReceiveWithTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets a callback to be invoked whenever messages are received on the specified
  	 channel. The tag allows multiple callbacks to be registered for
  	 the same channel.
  	 </div><div>
  	 <p>
  	 This method does <b>not</b> subscribe you to a channel. Rather, it caches a
  	 callback to be executed when messages are received on a particular
  	 channel.
  	 </p>
  	 </div>
  	@function setCustomOnReceiveWithTag
  	@param {String} channel The channel over which the messages will be received.
  	@param {String} tag The identifier for this callback.
  	@param {fm.singleAction} onReceive The callback to invoke when a message is received.
  	@return {void}
  */


  client.prototype.setCustomOnReceiveWithTag = function() {
    var channel, dictionary, onReceive, tag, _var0, _var1, _var2, _var3, _var4;
    channel = arguments[0];
    tag = arguments[1];
    onReceive = arguments[2];
    _var0 = channel;
    if (_var0 === null || typeof _var0 === 'undefined') {
      throw new Error("channel cannot be null.");
    }
    _var1 = onReceive;
    if (_var1 === null || typeof _var1 === 'undefined') {
      throw new Error("onReceive cannot be null.");
    }
    _var2 = tag;
    if (_var2 === null || typeof _var2 === 'undefined') {
      tag = fm.stringExtensions.empty;
    }
    dictionary = null;
    _var3 = new fm.holder(dictionary);
    _var4 = fm.hashExtensions.tryGetValue(this._customOnReceives, tag, _var3);
    dictionary = _var3.getValue();
    if (!_var4) {
      dictionary = {};
      this._customOnReceives[tag] = dictionary;
    }
    dictionary[channel] = onReceive;
    return this.processPendingReceives([channel], this._lastInterval);
  };

  /*<span id='method-fm.websync.client-setDisableWebSockets'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets whether to disable WebSocket protocol support and use long-polling,
  	 even if the server is capable of accepting WebSocket requests.
  	 </div>
  
  	@function setDisableWebSockets
  	@param {Boolean} value
  	@return {void}
  */


  client.prototype.setDisableWebSockets = function() {
    var value;
    value = arguments[0];
    return this._disableWebSockets = value;
  };

  client.prototype.setInstanceId = function() {
    var value;
    value = arguments[0];
    return this._instanceId = value;
  };

  client.prototype.setIsConnected = function() {
    var value;
    value = arguments[0];
    return this._isConnected = value;
  };

  client.prototype.setIsConnecting = function() {
    var value;
    value = arguments[0];
    return this._isConnecting = value;
  };

  client.prototype.setIsDisconnecting = function() {
    var value;
    value = arguments[0];
    return this._isDisconnecting = value;
  };

  client.prototype.setServerTimeout = function() {
    var value;
    value = arguments[0];
    return this._serverTimeout = value;
  };

  client.prototype.setSessionId = function() {
    var value;
    value = arguments[0];
    return this._sessionId = value;
  };

  /*<span id='method-fm.websync.client-setStreamRequestUrl'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the absolute URL of the WebSync request handler for streaming connections, typically
  	 ending with websync.ashx.
  	 </div>
  
  	@function setStreamRequestUrl
  	@param {String} value
  	@return {void}
  */


  client.prototype.setStreamRequestUrl = function() {
    var value;
    value = arguments[0];
    return this._streamRequestUrl = value;
  };

  /*<span id='method-fm.websync.client-setSynchronous'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets whether or not to execute client methods synchronously. This approach is not
  	 recommended for UI threads, as it will block until the request completes.
  	 Defaults to <c>false</c>.
  	 </div>
  
  	@function setSynchronous
  	@param {fm.nullable} value
  	@return {void}
  */


  client.prototype.setSynchronous = function() {
    var value;
    value = arguments[0];
    return this._synchronous = value;
  };

  /*<span id='method-fm.websync.client-setToken'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the token sent with each request for load balancing purposes.
  	 </div>
  
  	@function setToken
  	@param {String} value
  	@return {void}
  */


  client.prototype.setToken = function() {
    var value;
    value = arguments[0];
    return this._token = value;
  };

  /*<span id='method-fm.websync.client-startBatch'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Flags the start of a batch of requests to be sent together to the server.
  	 </div><div>
  	 This is used in conjunction with <see cref="fm.websync.client.endBatch">fm.websync.client.endBatch</see>, which flags
  	 the end of a batch of requests and starts sending them to the server. Batching
  	 is used to optimize round-trips to the server by reducing the overhead
  	 associated with creating multiple HTTP requests.
  	 </div>
  	@function startBatch
  	@return {fm.websync.client} The client.
  */


  client.prototype.startBatch = function() {
    this._batchCounter++;
    return this;
  };

  client.prototype.stream = function() {
    var connectArgs, message, receivedMessages, request, request2;
    connectArgs = arguments[0];
    receivedMessages = arguments[1];
    request2 = new fm.websync.clientRequest();
    message = new fm.websync.message("/meta/connect");
    message.setConnectionType(this._connectionType);
    message.setAcknowledgement(receivedMessages);
    request2.setMessage(message);
    request2.setCallback(this.streamCallback);
    request = request2;
    request.setDynamicValue(fm.websync.client._argsKey, connectArgs);
    return this.send(request, this.getStreamRequestUrl(), false, 0);
  };

  client.prototype.streamCallback = function() {
    var args2, dynamicValue, lastInterval, message, responseArgs, threadId, _i, _len, _var0, _var1, _var2, _var3, _var4;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getDynamicValue(fm.websync.client._argsKey);
    if ((this.getIsConnected() && !this.getIsConnecting()) && !this.getIsDisconnecting()) {
      _var0 = responseArgs.getException();
      if (_var0 !== null && typeof _var0 !== 'undefined') {
        _var1 = responseArgs.getResponses();
        if (_var1 !== null && typeof _var1 !== 'undefined') {
          if ((this._lastReconnect !== null) && (this._lastReconnect === fm.websync.reconnect.Retry)) {
            return this.restream(dynamicValue, false, this._lastInterval);
          } else {
            args2 = this.raiseStreamFailure(dynamicValue, responseArgs);
            _var2 = args2;
            if (_var2 === null || typeof _var2 === 'undefined') {
              args2 = dynamicValue;
            }
            return this.reconnect(args2, responseArgs);
          }
        } else {
          args2 = this.raiseStreamFailure(dynamicValue, responseArgs);
          _var3 = args2;
          if (_var3 === null || typeof _var3 === 'undefined') {
            args2 = dynamicValue;
          }
          return this.reconnect(args2, responseArgs);
        }
      } else {
        if ((responseArgs.getResponses().length === 1) && (responseArgs.getResponses()[0].getBayeuxChannel() === "/meta/connect")) {
          return this.restream(dynamicValue, false, this._lastInterval);
        } else {
          lastInterval = this._lastInterval;
          threadId = this.getThreadId();
          this.preRaise(threadId);
          try {
            _var4 = responseArgs.getResponses();
            for (_i = 0, _len = _var4.length; _i < _len; _i++) {
              message = _var4[_i];
              lastInterval = this.receiveMessage(message, lastInterval);
            }
          } finally {
            this.postRaise(threadId);
          }
          return this.restream(dynamicValue, true, lastInterval);
        }
      }
    }
  };

  client.prototype.streamDeferred = function() {
    var s, state;
    s = arguments[0];
    state = s;
    return this.stream(state.getConnectArgs(), state.getReceivedMessages());
  };

  /*<span id='method-fm.websync.client-subscribe'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Subscribes the client to receive messages on one or more channels.
  	 </div><div>
  	 When the subscribe completes successfully, the OnSuccess callback
  	 will be invoked, passing in the subscribed
  	 channel(s), <b>including any modifications made on the server</b>.
  	 </div>
  	@function subscribe
  	@param {fm.websync.subscribeArgs} subscribeArgs The subscribe arguments.
  	 See fm.websync.subscribeArgs for details.
  	@return {fm.websync.client} The client.
  */


  client.prototype.subscribe = function() {
    var subscribeArgs, _var0, _var1, _var2;
    subscribeArgs = arguments[0];
    _var0 = subscribeArgs.getChannels();
    if ((_var0 === null || typeof _var0 === 'undefined') || (subscribeArgs.getChannels().length === 0)) {
      throw new Error("channels cannot be null.");
    }
    _var1 = subscribeArgs.getOnReceive();
    if (_var1 === null || typeof _var1 === 'undefined') {
      throw new Error("onReceive cannot be null.");
    }
    _var2 = subscribeArgs.getTag();
    if (_var2 === null || typeof _var2 === 'undefined') {
      subscribeArgs.setTag(fm.stringExtensions.empty);
    }
    this.performSubscribe(subscribeArgs);
    return this;
  };

  client.prototype.tryWebSocket = function() {
    var webSocketMessageTransfer;
    webSocketMessageTransfer = fm.websync.messageTransferFactory.getWebSocketMessageTransfer(this.processRequestUrl(this.getStreamRequestUrl()));
    webSocketMessageTransfer.setHandshakeTimeout(this.getRequestTimeout());
    webSocketMessageTransfer.setStreamTimeout(this.getStreamRequestTimeout());
    webSocketMessageTransfer.setOnRequestCreated(this.internalOnHttpRequestCreated);
    webSocketMessageTransfer.setOnResponseReceived(this.internalOnHttpResponseReceived);
    webSocketMessageTransfer.setOnOpenSuccess(this.webSocketOpenSuccess);
    webSocketMessageTransfer.setOnOpenFailure(this.webSocketOpenFailure);
    webSocketMessageTransfer.setOnStreamFailure(this.webSocketStreamFailure);
    webSocketMessageTransfer.setSender(this);
    this._connectionType = fm.websync.connectionType.WebSocket;
    this._streamRequestTransfer = webSocketMessageTransfer;
    return webSocketMessageTransfer.open(this.createHeaders());
  };

  /*<span id='method-fm.websync.client-unbind'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Unbinds the client from a public or private data record so it is no longer visible
  	 by other clients or the server.
  	 </div><div>
  	 When the unbind completes successfully, the OnSuccess callback
  	 will be invoked, passing in the unbound
  	 record(s), <b>including any modifications made on the server</b>.
  	 </div>
  	@function unbind
  	@param {fm.websync.unbindArgs} unbindArgs The unbind arguments.
  	 See fm.websync.unbindArgs for details.
  	@return {fm.websync.client} The client.
  */


  client.prototype.unbind = function() {
    var record, unbindArgs, _i, _len, _var0, _var1, _var2;
    unbindArgs = arguments[0];
    _var0 = unbindArgs.getRecords();
    if ((_var0 === null || typeof _var0 === 'undefined') || (unbindArgs.getRecords().length === 0)) {
      throw new Error("records cannot be null.");
    }
    _var1 = unbindArgs.getRecords();
    for (_i = 0, _len = _var1.length; _i < _len; _i++) {
      record = _var1[_i];
      _var2 = record.getKey();
      if (_var2 === null || typeof _var2 === 'undefined') {
        throw new Error("key cannot be null.");
      }
    }
    this.performUnbind(unbindArgs);
    return this;
  };

  /*<span id='method-fm.websync.client-unsetCustomOnReceive'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Unsets a callback invoked whenever messages are received on the specified
  	 channel.
  	 </div><div>
  	 <p>
  	 This method does <b>not</b> unsubscribe you from a channel. Rather, it stop the
  	 callback from executing when messages are received on a particular
  	 channel.
  	 </p>
  	 </div>
  	@function unsetCustomOnReceive
  	@param {String} channel The channel over which the messages are being received.
  	@return {Boolean} true if the callback was previously set; otherwise, false.
  */


  client.prototype.unsetCustomOnReceive = function() {
    var channel;
    channel = arguments[0];
    return this.unsetCustomOnReceiveWithTag(channel, fm.stringExtensions.empty);
  };

  /*<span id='method-fm.websync.client-unsetCustomOnReceiveWithTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Unsets a callback invoked whenever messages are received on the specified
  	 channel.  The tag denotes a specific callback.
  	 </div><div>
  	 <p>
  	 This method does <b>not</b> unsubscribe you from a channel. Rather, it stop the
  	 callback from executing when messages are received on a particular
  	 channel.
  	 </p>
  	 </div>
  	@function unsetCustomOnReceiveWithTag
  	@param {String} channel The channel over which the messages are being received.
  	@param {String} tag The identifier for this callback.
  	@return {Boolean} true if the callback was previously set; otherwise, false.
  */


  client.prototype.unsetCustomOnReceiveWithTag = function() {
    var channel, dictionary, tag, _var0, _var1, _var2, _var3;
    channel = arguments[0];
    tag = arguments[1];
    _var0 = channel;
    if (_var0 === null || typeof _var0 === 'undefined') {
      throw new Error("channel cannot be null.");
    }
    _var1 = tag;
    if (_var1 === null || typeof _var1 === 'undefined') {
      tag = fm.stringExtensions.empty;
    }
    dictionary = null;
    _var2 = new fm.holder(dictionary);
    _var3 = fm.hashExtensions.tryGetValue(this._customOnReceives, tag, _var2);
    dictionary = _var2.getValue();
    if (_var3) {
      if (fm.hashExtensions.remove(dictionary, channel)) {
        if (fm.hashExtensions.getCount(dictionary) === 0) {
          fm.hashExtensions.remove(this._customOnReceives, tag);
        }
        return true;
      }
      return false;
    }
    return false;
  };

  /*<span id='method-fm.websync.client-unsubscribe'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Unsubscribes the client from receiving messages on one or more channels.
  	 </div><div>
  	 When the unsubscribe completes successfully, the OnSuccess callback
  	 will be invoked, passing in the
  	 unsubscribed channel(s), <b>including any modifications made on the server</b>.
  	 </div>
  	@function unsubscribe
  	@param {fm.websync.unsubscribeArgs} unsubscribeArgs The unsubscribe arguments.
  	 See fm.websync.unsubscribeArgs for details.
  	@return {fm.websync.client} The client.
  */


  client.prototype.unsubscribe = function() {
    var unsubscribeArgs, _var0, _var1;
    unsubscribeArgs = arguments[0];
    _var0 = unsubscribeArgs.getChannels();
    if ((_var0 === null || typeof _var0 === 'undefined') || (unsubscribeArgs.getChannels().length === 0)) {
      throw new Error("channels cannot be null.");
    }
    _var1 = unsubscribeArgs.getTag();
    if (_var1 === null || typeof _var1 === 'undefined') {
      unsubscribeArgs.setTag(fm.stringExtensions.empty);
    }
    this.performUnsubscribe(unsubscribeArgs);
    return this;
  };

  client.prototype.webSocketOpenFailure = function() {
    var e;
    e = arguments[0];
    if (this._webSocketOpened) {
      return this.tryWebSocket();
    } else {
      return this.doLongPolling();
    }
  };

  client.prototype.webSocketOpenSuccess = function() {
    var e;
    e = arguments[0];
    this._webSocketOpened = true;
    return this.activateStream(this._connectArgs, this._responseArgs);
  };

  client.prototype.webSocketStreamFailure = function() {
    var e, responseArgs;
    e = arguments[0];
    responseArgs = new fm.websync.clientResponseArgs();
    responseArgs.setDynamicProperties(this._responseArgs.getDynamicProperties());
    responseArgs.setException(new Error(fm.stringExtensions.format("WebSocket stream error. {0}", e.getException().message)));
    return this.streamCallback(responseArgs);
  };

  client._bayeuxVersion = "1.0";

  client._bayeuxMinimumVersion = "1.0";

  client._argsKey = "fm.args";

  client._stateKey = "fm.state";

  client._requestUrlCache = {};

  client._requestUrlCacheLock = new fm.object();

  return client;

}).call(this, fm.websync.baseClient);




fm.websync.clientSendState = (function(_super) {

  __extends(clientSendState, _super);

  clientSendState.prototype._isStream = false;

  clientSendState.prototype._requestMapping = null;

  clientSendState.prototype._requests = null;

  function clientSendState() {
    this.setRequests = __bind(this.setRequests, this);

    this.setRequestMapping = __bind(this.setRequestMapping, this);

    this.setIsStream = __bind(this.setIsStream, this);

    this.getRequests = __bind(this.getRequests, this);

    this.getRequestMapping = __bind(this.getRequestMapping, this);

    this.getIsStream = __bind(this.getIsStream, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientSendState.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientSendState.__super__.constructor.call(this);
  }

  clientSendState.prototype.getIsStream = function() {
    return this._isStream;
  };

  clientSendState.prototype.getRequestMapping = function() {
    return this._requestMapping;
  };

  clientSendState.prototype.getRequests = function() {
    return this._requests;
  };

  clientSendState.prototype.setIsStream = function() {
    var value;
    value = arguments[0];
    return this._isStream = value;
  };

  clientSendState.prototype.setRequestMapping = function() {
    var value;
    value = arguments[0];
    return this._requestMapping = value;
  };

  clientSendState.prototype.setRequests = function() {
    var value;
    value = arguments[0];
    return this._requests = value;
  };

  return clientSendState;

})(fm.object);




fm.websync.clientRequest = (function(_super) {

  __extends(clientRequest, _super);

  clientRequest.prototype._callback = null;

  clientRequest.prototype._message = null;

  function clientRequest() {
    this.setMessage = __bind(this.setMessage, this);

    this.setCallback = __bind(this.setCallback, this);

    this.getMessage = __bind(this.getMessage, this);

    this.getCallback = __bind(this.getCallback, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      clientRequest.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    clientRequest.__super__.constructor.call(this);
  }

  clientRequest.prototype.getCallback = function() {
    return this._callback;
  };

  clientRequest.prototype.getMessage = function() {
    return this._message;
  };

  clientRequest.prototype.setCallback = function() {
    var value;
    value = arguments[0];
    return this._callback = value;
  };

  clientRequest.prototype.setMessage = function() {
    var value;
    value = arguments[0];
    return this._message = value;
  };

  return clientRequest;

})(fm.dynamic);


/*<span id='cls-fm.websync.defaults'>&nbsp;</span>
*/

/**
@class fm.websync.defaults
 <div>
 A collection of read-only default values for WebSync.
 </div>

@extends fm.object
*/


fm.websync.defaults = (function(_super) {

  __extends(defaults, _super);

  defaults.__domainKey = null;

  defaults.__domainName = null;

  function defaults() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      defaults.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    defaults.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.defaults-getDomainKey'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the default domain key ("11111111-1111-1111-1111-111111111111").
  	 </div>
  
  	@function getDomainKey
  	@return {fm.guid}
  */


  defaults.getDomainKey = function() {
    return fm.websync.defaults.__domainKey;
  };

  /*<span id='method-fm.websync.defaults-getDomainName'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the default domain name ("localhost").
  	 </div>
  
  	@function getDomainName
  	@return {String}
  */


  defaults.getDomainName = function() {
    return fm.websync.defaults.__domainName;
  };

  defaults.__domainKey = new fm.guid("11111111-1111-1111-1111-111111111111");

  defaults.__domainName = "localhost";

  return defaults;

}).call(this, fm.object);


/*<span id='cls-fm.websync.publishingClient'>&nbsp;</span>
*/

/**
@class fm.websync.publishingClient
 <div>
 Details about the client sending the publication data.
 </div>

@extends fm.serializable
*/


fm.websync.publishingClient = (function(_super) {

  __extends(publishingClient, _super);

  publishingClient.prototype._boundRecords = null;

  publishingClient.prototype._clientId = null;

  /*<span id='method-fm.websync.publishingClient-fm.websync.publishingClient'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.publishingClient">fm.websync.publishingClient</see> class.
  	 </div>
  	@function fm.websync.publishingClient
  	@param {fm.nullable} clientId The publishing client's ID.
  	@param {Object} boundRecords The records bound to the client.
  	@return {}
  */


  function publishingClient() {
    this.getBoundRecordValue = __bind(this.getBoundRecordValue, this);

    this.toJson = __bind(this.toJson, this);

    this.setClientId = __bind(this.setClientId, this);

    this.setBoundRecords = __bind(this.setBoundRecords, this);

    this.getClientId = __bind(this.getClientId, this);

    this.getBoundRecordValueJson = __bind(this.getBoundRecordValueJson, this);

    this.getBoundRecords = __bind(this.getBoundRecords, this);

    var boundRecords, clientId;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      publishingClient.__super__.constructor.call(this);
      this.setBoundRecords({});
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 2) {
      clientId = arguments[0];
      boundRecords = arguments[1];
      publishingClient.__super__.constructor.call(this);
      this.setClientId(clientId);
      this.setBoundRecords(boundRecords);
      return;
    }
    if (arguments.length === 0) {
      publishingClient.__super__.constructor.call(this);
      this.setBoundRecords({});
      return;
    }
  }

  /*<span id='method-fm.websync.publishingClient-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a JSON-formatted publishing client.
  	 </div>
  	@function fromJson
  	@param {String} publishingClientJson The JSON-formatted publishing client to deserialize.
  	@return {fm.websync.publishingClient} The publishing client.
  */


  publishingClient.fromJson = function() {
    var publishingClientJson;
    publishingClientJson = arguments[0];
    return fm.websync.serializer.deserializePublishingClient(publishingClientJson);
  };

  /*<span id='method-fm.websync.publishingClient-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a publishing client to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.publishingClient} publishingClient The publishing client to serialize.
  	@return {String} The JSON-formatted publishing client.
  */


  publishingClient.toJson = function() {
    var publishingClient;
    publishingClient = arguments[0];
    return fm.websync.serializer.serializePublishingClient(publishingClient);
  };

  /*<span id='method-fm.websync.publishingClient-getBoundRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the publishing client's bound records.
  	 </div>
  
  	@function getBoundRecords
  	@return {Object}
  */


  publishingClient.prototype.getBoundRecords = function() {
    return this._boundRecords;
  };

  /*<span id='method-fm.websync.publishingClient-getBoundRecordValueJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the JSON value of a record bound to the publishing client.
  	 </div>
  	@function getBoundRecordValueJson
  	@param {String} key The record key.
  	@return {String} The JSON value of the record, if it exists, or null.
  */


  publishingClient.prototype.getBoundRecordValueJson = function() {
    var key, record, _var0, _var1, _var2;
    key = arguments[0];
    _var0 = this.getBoundRecords();
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    record = null;
    _var1 = new fm.holder(record);
    _var2 = fm.hashExtensions.tryGetValue(this.getBoundRecords(), key, _var1);
    record = _var1.getValue();
    if (!_var2) {
      return null;
    }
    return record.getValueJson();
  };

  /*<span id='method-fm.websync.publishingClient-getClientId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the publishing client's ID.
  	 </div>
  
  	@function getClientId
  	@return {fm.nullable}
  */


  publishingClient.prototype.getClientId = function() {
    return this._clientId;
  };

  /*<span id='method-fm.websync.publishingClient-setBoundRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the publishing client's bound records.
  	 </div>
  
  	@function setBoundRecords
  	@param {Object} value
  	@return {void}
  */


  publishingClient.prototype.setBoundRecords = function() {
    var value;
    value = arguments[0];
    return this._boundRecords = value;
  };

  /*<span id='method-fm.websync.publishingClient-setClientId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the publishing client's ID.
  	 </div>
  
  	@function setClientId
  	@param {fm.nullable} value
  	@return {void}
  */


  publishingClient.prototype.setClientId = function() {
    var value;
    value = arguments[0];
    return this._clientId = value;
  };

  /*<span id='method-fm.websync.publishingClient-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String} The JSON-formatted publishing client.
  */


  publishingClient.prototype.toJson = function() {
    return fm.websync.publishingClient.toJson(this);
  };

  publishingClient.prototype.getBoundRecordValue = function() {
    var key;
    key = arguments[0];
    return fm.json.deserialize(this.getBoundRecordValueJson.apply(this, arguments));
  };

  return publishingClient;

}).call(this, fm.serializable);


/*<span id='cls-fm.websync.extensions'>&nbsp;</span>
*/

/**
@class fm.websync.extensions
 <div>
 The extensions library that wraps the Bayeux Ext field, used with instances of classes
 that derive from <see cref="fm.websync.extensible">fm.websync.extensible</see>.
 </div>

@extends fm.dynamic
*/


fm.websync.extensions = (function(_super) {

  __extends(extensions, _super);

  extensions.prototype._extensionJsons = null;

  /*<span id='method-fm.websync.extensions-fm.websync.extensions'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.extensions">fm.websync.extensions</see> class.
  	 </div>
  
  	@function fm.websync.extensions
  	@return {}
  */


  function extensions() {
    this.setValue = __bind(this.setValue, this);

    this.getValue = __bind(this.getValue, this);

    this.toJson = __bind(this.toJson, this);

    this.setValueJson = __bind(this.setValueJson, this);

    this.setExtensionJsons = __bind(this.setExtensionJsons, this);

    this.getValueJson = __bind(this.getValueJson, this);

    this.getNames = __bind(this.getNames, this);

    this.getExtensionJsons = __bind(this.getExtensionJsons, this);

    this.getCount = __bind(this.getCount, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      extensions.__super__.constructor.call(this);
      this.setExtensionJsons({});
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    extensions.__super__.constructor.call(this);
    this.setExtensionJsons({});
  }

  /*<span id='method-fm.websync.extensions-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a single extensions library from JSON.
  	 </div>
  	@function fromJson
  	@param {String} extensionsJson The JSON extensions library to deserialize.
  	@return {fm.websync.extensions} The deserialized extensions library.
  */


  extensions.fromJson = function() {
    var extensionsJson;
    extensionsJson = arguments[0];
    return fm.websync.serializer.deserializeExtensions(extensionsJson);
  };

  /*<span id='method-fm.websync.extensions-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a single extensions library to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.extensions} extensions The extensions library to serialize.
  	@return {String} The serialized extensions library.
  */


  extensions.toJson = function() {
    var extensions;
    extensions = arguments[0];
    return fm.websync.serializer.serializeExtensions(extensions);
  };

  /*<span id='method-fm.websync.extensions-getCount'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the number of extensions in the library.
  	 </div>
  
  	@function getCount
  	@return {Integer}
  */


  extensions.prototype.getCount = function() {
    return fm.hashExtensions.getCount(this.getExtensionJsons());
  };

  extensions.prototype.getExtensionJsons = function() {
    return this._extensionJsons;
  };

  /*<span id='method-fm.websync.extensions-getNames'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the names of the extensions in the library.
  	 </div>
  
  	@function getNames
  	@return {Array}
  */


  extensions.prototype.getNames = function() {
    var list;
    list = [];
    fm.arrayExtensions.addRange(list, fm.hashExtensions.getKeys(this.getExtensionJsons()));
    return list;
  };

  /*<span id='method-fm.websync.extensions-getValueJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a serialized value stored in the extensions.
  	 </div>
  	@function getValueJson
  	@param {String} name Fully-qualified extension name.
  	@return {String} The extension value (in JSON format).
  */


  extensions.prototype.getValueJson = function() {
    var name;
    name = arguments[0];
    if (fm.hashExtensions.containsKey(this.getExtensionJsons(), name)) {
      return this.getExtensionJsons()[name];
    }
    return null;
  };

  extensions.prototype.setExtensionJsons = function() {
    var value;
    value = arguments[0];
    return this._extensionJsons = value;
  };

  /*<span id='method-fm.websync.extensions-setValueJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Stores a serialized value in the extensions.  Must be valid JSON.
  	 </div>
  	@function setValueJson
  	@param {String} name Fully-qualified extension name.
  	@param {String} valueJson The extension value in valid JSON format.
  	@param {Boolean} validate Whether or not to validate the JSON.
  	@return {void}
  */


  extensions.prototype.setValueJson = function() {
    var name, validate, valueJson, _var0;
    if (arguments.length === 3) {
      name = arguments[0];
      valueJson = arguments[1];
      validate = arguments[2];
      _var0 = valueJson;
      if (_var0 === null || typeof _var0 === 'undefined') {
        if (fm.hashExtensions.containsKey(this.getExtensionJsons(), name)) {
          fm.hashExtensions.remove(this.getExtensionJsons(), name);
        }
      } else {
        if (!(!validate || fm.serializer.isValidJson(valueJson))) {
          throw new Error("The value is not valid JSON.");
        }
        this.getExtensionJsons()[name] = valueJson;
      }
      this.setIsDirty(true);
      return;
    }
    if (arguments.length === 2) {
      name = arguments[0];
      valueJson = arguments[1];
      this.setValueJson(name, valueJson, true);
    }
  };

  /*<span id='method-fm.websync.extensions-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes the extensions library to JSON.
  	 </div>
  	@function toJson
  	@return {String} The serialized extensions library.
  */


  extensions.prototype.toJson = function() {
    return fm.websync.extensions.toJson(this);
  };

  extensions.prototype.getValue = function() {
    var name;
    name = arguments[0];
    return fm.json.deserialize(this.getValueJson.apply(this, arguments));
  };

  extensions.prototype.setValue = function() {
    var name, value, valueJson;
    if (arguments.length === 3) {
      name = arguments[0];
      valueJson = arguments[1];
      value = arguments[2];
      arguments[arguments.length - 1] = fm.json.serialize(arguments[arguments.length - 1]);
      this.setValueJson.apply(this, arguments);
      return;
    }
    if (arguments.length === 2) {
      name = arguments[0];
      value = arguments[1];
      arguments[arguments.length - 1] = fm.json.serialize(arguments[arguments.length - 1]);
      this.setValueJson.apply(this, arguments);
    }
  };

  return extensions;

}).call(this, fm.dynamic);


/*<span id='cls-fm.websync.message'>&nbsp;</span>
*/

/**
@class fm.websync.message
 <div>
 The WebSync message used for all <see cref="fm.websync.client">fm.websync.client</see> requests/responses.
 </div>

@extends fm.websync.baseMessage
*/


fm.websync.message = (function(_super) {

  __extends(message, _super);

  message.prototype.__advice = null;

  message.prototype.__bayeuxChannel = null;

  message.prototype.__channels = null;

  message.prototype.__clientId = null;

  message.prototype.__connectionType = null;

  message.prototype.__id = null;

  message.prototype.__minimumVersion = null;

  message.prototype.__records = null;

  message.prototype.__supportedConnectionTypes = null;

  message.prototype.__version = null;

  message.prototype._toJsonNoDataLock = null;

  /*<span id='method-fm.websync.message-fm.websync.message'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.message">fm.websync.message</see> class.
  	 </div>
  	@function fm.websync.message
  	@param {String} bayeuxChannel The Bayeux channel with which to initialize the message.
  	@return {}
  */


  function message() {
    this.toJsonNoData = __bind(this.toJsonNoData, this);

    this.toJson = __bind(this.toJson, this);

    this.toBinary = __bind(this.toBinary, this);

    this.setVersion = __bind(this.setVersion, this);

    this.setTag = __bind(this.setTag, this);

    this.setSupportedConnectionTypes = __bind(this.setSupportedConnectionTypes, this);

    this.setSessionId = __bind(this.setSessionId, this);

    this.setServerTimeout = __bind(this.setServerTimeout, this);

    this.setServerActions = __bind(this.setServerActions, this);

    this.setRecords = __bind(this.setRecords, this);

    this.setRecord = __bind(this.setRecord, this);

    this.setPublishingClient = __bind(this.setPublishingClient, this);

    this.setNotifyingClient = __bind(this.setNotifyingClient, this);

    this.setNotifyClientId = __bind(this.setNotifyClientId, this);

    this.setMinimumVersion = __bind(this.setMinimumVersion, this);

    this.setLastSessionId = __bind(this.setLastSessionId, this);

    this.setLastClientId = __bind(this.setLastClientId, this);

    this.setKeys = __bind(this.setKeys, this);

    this.setKey = __bind(this.setKey, this);

    this.setId = __bind(this.setId, this);

    this.setDisableBinary = __bind(this.setDisableBinary, this);

    this.setConnectionType = __bind(this.setConnectionType, this);

    this.setClientId = __bind(this.setClientId, this);

    this.setChannels = __bind(this.setChannels, this);

    this.setChannel = __bind(this.setChannel, this);

    this.setBayeuxChannel = __bind(this.setBayeuxChannel, this);

    this.setAdvice = __bind(this.setAdvice, this);

    this.setAcknowledgement = __bind(this.setAcknowledgement, this);

    this.isUnsubscribingFrom = __bind(this.isUnsubscribingFrom, this);

    this.isUnsubscribe = __bind(this.isUnsubscribe, this);

    this.isUnbindingFrom = __bind(this.isUnbindingFrom, this);

    this.isUnbind = __bind(this.isUnbind, this);

    this.isSubscribingTo = __bind(this.isSubscribingTo, this);

    this.isSubscribe = __bind(this.isSubscribe, this);

    this.isStream = __bind(this.isStream, this);

    this.isService = __bind(this.isService, this);

    this.isPublish = __bind(this.isPublish, this);

    this.isNotify = __bind(this.isNotify, this);

    this.isDisconnect = __bind(this.isDisconnect, this);

    this.isConnect = __bind(this.isConnect, this);

    this.isBindingTo = __bind(this.isBindingTo, this);

    this.isBind = __bind(this.isBind, this);

    this.getVersion = __bind(this.getVersion, this);

    this.getType = __bind(this.getType, this);

    this.getTag = __bind(this.getTag, this);

    this.getSupportedConnectionTypes = __bind(this.getSupportedConnectionTypes, this);

    this.getSessionId = __bind(this.getSessionId, this);

    this.getServerTimeout = __bind(this.getServerTimeout, this);

    this.getServerActions = __bind(this.getServerActions, this);

    this.getRecords = __bind(this.getRecords, this);

    this.getRecord = __bind(this.getRecord, this);

    this.getPublishingClient = __bind(this.getPublishingClient, this);

    this.getNotifyingClient = __bind(this.getNotifyingClient, this);

    this.getNotifyClientId = __bind(this.getNotifyClientId, this);

    this.getMinimumVersion = __bind(this.getMinimumVersion, this);

    this.getLastSessionId = __bind(this.getLastSessionId, this);

    this.getLastClientId = __bind(this.getLastClientId, this);

    this.getKeys = __bind(this.getKeys, this);

    this.getKey = __bind(this.getKey, this);

    this.getId = __bind(this.getId, this);

    this.getDisableBinary = __bind(this.getDisableBinary, this);

    this.getConnectionType = __bind(this.getConnectionType, this);

    this.getClientId = __bind(this.getClientId, this);

    this.getChannels = __bind(this.getChannels, this);

    this.getChannel = __bind(this.getChannel, this);

    this.getBayeuxChannel = __bind(this.getBayeuxChannel, this);

    this.getAdvice = __bind(this.getAdvice, this);

    this.getAcknowledgement = __bind(this.getAcknowledgement, this);

    var bayeuxChannel;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      message.__super__.constructor.call(this);
      this._toJsonNoDataLock = new fm.object();
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 0) {
      message.__super__.constructor.call(this);
      this._toJsonNoDataLock = new fm.object();
      return;
    }
    if (arguments.length === 1) {
      bayeuxChannel = arguments[0];
      message.__super__.constructor.call(this);
      this._toJsonNoDataLock = new fm.object();
      this.setValidate(false);
      this.setBayeuxChannel(bayeuxChannel);
      this.setValidate(true);
      return;
    }
  }

  message.bytesToInt = function() {
    var bytes, index;
    bytes = arguments[0];
    index = arguments[1];
    if (bytes.length < (index + 4)) {
      return -1;
    }
    return fm.bitAssistant.toIntegerNetwork(bytes, index);
  };

  /*<span id='method-fm.websync.message-fromBinary'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a message from binary.
  	 </div>
  	@function fromBinary
  	@param {fm.array} bytes A byte array to deserialize.
  	@param {Integer} offset The offset into the array.
  	@return {fm.websync.message} A deserialized message.
  */


  message.fromBinary = function() {
    var buffer, buffer2, bytes, count, message, num2, offset;
    if (arguments.length === 1) {
      bytes = arguments[0];
      return fm.websync.message.fromBinary(bytes, 0);
      return;
    }
    if (arguments.length === 2) {
      bytes = arguments[0];
      offset = arguments[1];
      count = fm.websync.message.bytesToInt(bytes, offset);
      if (count < 0) {
        return null;
      }
      offset = offset + 4;
      num2 = fm.websync.message.bytesToInt(bytes, offset);
      if (num2 < 0) {
        return null;
      }
      offset = offset + 4;
      buffer = fm.bitAssistant.subArray(bytes, offset, count);
      offset = offset + count;
      buffer2 = fm.bitAssistant.subArray(bytes, offset, num2);
      offset = offset + num2;
      message = fm.websync.message.fromJson(fm.encoding.getUtf8().getString(buffer, 0, buffer.length));
      message.setDataBytes(buffer2);
      return message;
    }
  };

  /*<span id='method-fm.websync.message-fromBinaryMultiple'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a list of messages from binary.
  	 </div>
  	@function fromBinaryMultiple
  	@param {fm.array} bytes A byte array to deserialize.
  	@return {fm.array} A deserialized list of messages.
  */


  message.fromBinaryMultiple = function() {
    var bytes, i, index, message, messageArray, num2, num4, _var0;
    bytes = arguments[0];
    index = 0;
    num2 = fm.websync.message.bytesToInt(bytes, index);
    if (num2 < 0) {
      return new Array(0);
    }
    index = index + 4;
    messageArray = new Array(num2);
    i = 0;
    while (i < num2) {
      try {
        num4 = fm.websync.message.bytesToInt(bytes, index);
        if (num4 < 0) {
          return new Array(0);
        }
        index = index + 4;
        message = fm.websync.message.fromBinary(bytes, index);
        _var0 = message;
        if (_var0 === null || typeof _var0 === 'undefined') {
          return new Array(0);
        }
        index = index + num4;
        messageArray[i] = message;
      } finally {
        i++;
      }
    }
    return messageArray;
  };

  /*<span id='method-fm.websync.message-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a message from JSON.
  	 </div>
  	@function fromJson
  	@param {String} messageJson A JSON string to deserialize.
  	@return {fm.websync.message} A deserialized message.
  */


  message.fromJson = function() {
    var messageJson;
    messageJson = arguments[0];
    return fm.websync.serializer.deserializeMessage(messageJson);
  };

  /*<span id='method-fm.websync.message-fromJsonMultiple'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a list of messages from JSON.
  	 </div>
  	@function fromJsonMultiple
  	@param {String} messagesJson A JSON string to deserialize.
  	@return {fm.array} A deserialized list of messages.
  */


  message.fromJsonMultiple = function() {
    var messagesJson;
    messagesJson = arguments[0];
    return fm.websync.serializer.deserializeMessageArray(messagesJson);
  };

  message.intToBytes = function() {
    var i;
    i = arguments[0];
    return fm.bitAssistant.getIntegerBytesNetwork(i);
  };

  /*<span id='method-fm.websync.message-toBinary'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a message to binary.
  	 </div>
  	@function toBinary
  	@param {fm.websync.message} message A message to serialize.
  	@return {fm.array} A binary-serialized message.
  */


  message.toBinary = function() {
    var bytes, dataBytes, dataJson, destination, destinationIndex, message, s, _var0, _var1, _var2, _var3, _var4, _var5;
    message = arguments[0];
    dataBytes = null;
    dataJson = null;
    _var0 = new fm.holder(dataBytes);
    _var1 = new fm.holder(dataJson);
    _var2 = message.toJsonNoData(_var0, _var1);
    dataBytes = _var0.getValue();
    dataJson = _var1.getValue();
    s = _var2;
    _var3 = dataBytes;
    if (_var3 === null || typeof _var3 === 'undefined') {
      _var4 = dataJson;
      if (_var4 === null || typeof _var4 === 'undefined') {
        throw new Error("Message data bytes cannot be null.");
      }
      throw new Error(fm.stringExtensions.format("Message data bytes cannot be null (JSON: {0}).", dataJson));
    }
    _var5 = s;
    if (_var5 === null || typeof _var5 === 'undefined') {
      throw new Error("Message JSON cannot be null.");
    }
    bytes = fm.encoding.getUtf8().getBytes(s);
    destination = new Uint8Array((8 + bytes.length) + dataBytes.length);
    destinationIndex = 0;
    fm.bitAssistant.copy(fm.websync.message.intToBytes(bytes.length), 0, destination, destinationIndex, 4);
    destinationIndex = destinationIndex + 4;
    fm.bitAssistant.copy(fm.websync.message.intToBytes(dataBytes.length), 0, destination, destinationIndex, 4);
    destinationIndex = destinationIndex + 4;
    fm.bitAssistant.copy(bytes, 0, destination, destinationIndex, bytes.length);
    destinationIndex = destinationIndex + bytes.length;
    fm.bitAssistant.copy(dataBytes, 0, destination, destinationIndex, dataBytes.length);
    destinationIndex = destinationIndex + dataBytes.length;
    return destination;
  };

  /*<span id='method-fm.websync.message-toBinaryMultiple'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a list of messages to binary.
  	 </div>
  	@function toBinaryMultiple
  	@param {fm.array} messages A list of messages to serialize.
  	@return {fm.array} A binary-serialized array of messages.
  */


  message.toBinaryMultiple = function() {
    var buffer, destination, destinationIndex, item, list, message, messages, num, _i, _j, _len, _len1, _var0, _var1;
    messages = arguments[0];
    num = 4;
    list = [];
    _var0 = messages;
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      message = _var0[_i];
      item = fm.websync.message.toBinary(message);
      fm.arrayExtensions.add(list, item);
      num = num + (4 + item.length);
    }
    destination = new Uint8Array(num);
    destinationIndex = 0;
    fm.bitAssistant.copy(fm.websync.message.intToBytes(fm.arrayExtensions.getCount(list)), 0, destination, destinationIndex, 4);
    destinationIndex = destinationIndex + 4;
    _var1 = list;
    for (_j = 0, _len1 = _var1.length; _j < _len1; _j++) {
      buffer = _var1[_j];
      fm.bitAssistant.copy(fm.websync.message.intToBytes(buffer.length), 0, destination, destinationIndex, 4);
      destinationIndex = destinationIndex + 4;
      fm.bitAssistant.copy(buffer, 0, destination, destinationIndex, buffer.length);
      destinationIndex = destinationIndex + buffer.length;
    }
    return destination;
  };

  /*<span id='method-fm.websync.message-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a message to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.message} message A message to serialize.
  	@return {String} A JSON-serialized message.
  */


  message.toJson = function() {
    var message;
    message = arguments[0];
    return fm.websync.serializer.serializeMessage(message);
  };

  /*<span id='method-fm.websync.message-toJsonMultiple'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a list of messages to JSON.
  	 </div>
  	@function toJsonMultiple
  	@param {fm.array} messages A list of messages to serialize.
  	@return {String} A JSON-serialized array of messages.
  */


  message.toJsonMultiple = function() {
    var messages;
    messages = arguments[0];
    return fm.websync.serializer.serializeMessageArray(messages);
  };

  /*<span id='method-fm.websync.message-getAcknowledgement'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the acknowledgement flag, used internally for stream requests following message delivery.
  	 </div>
  
  	@function getAcknowledgement
  	@return {fm.nullable}
  */


  message.prototype.getAcknowledgement = function() {
    return fm.serializer.deserializeBoolean(this.getExtensionValueJson("fm.ack"));
  };

  /*<span id='method-fm.websync.message-getAdvice'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets details on how the client should reconnect, used internally.
  	 </div>
  
  	@function getAdvice
  	@return {fm.websync.advice}
  */


  message.prototype.getAdvice = function() {
    return this.__advice;
  };

  /*<span id='method-fm.websync.message-getBayeuxChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the Bayeux message channel.
  	 </div>
  
  	@function getBayeuxChannel
  	@return {String}
  */


  message.prototype.getBayeuxChannel = function() {
    return this.__bayeuxChannel;
  };

  /*<span id='method-fm.websync.message-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel to which the current client is publishing, subscribing, or unsubscribing.
  	 Overrides <see cref="fm.websync.message.channels">fm.websync.message.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  message.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };

  /*<span id='method-fm.websync.message-getChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channels to which the current client is subscribing or unsubscribing.
  	 Overrides <see cref="fm.websync.message.channel">fm.websync.message.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
  */


  message.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };

  /*<span id='method-fm.websync.message-getClientId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the unique identifier of the current client associated with the request/response.
  	 </div>
  
  	@function getClientId
  	@return {fm.nullable}
  */


  message.prototype.getClientId = function() {
    return this.__clientId;
  };

  /*<span id='method-fm.websync.message-getConnectionType'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the type of connection the client is using, used internally.
  	 </div>
  
  	@function getConnectionType
  	@return {fm.nullable}
  */


  message.prototype.getConnectionType = function() {
    return this.__connectionType;
  };

  /*<span id='method-fm.websync.message-getDisableBinary'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether binary is disabled.
  	 </div>
  
  	@function getDisableBinary
  	@return {fm.nullable}
  */


  message.prototype.getDisableBinary = function() {
    return fm.serializer.deserializeBoolean(this.getExtensionValueJson("fm.dbin"));
  };

  /*<span id='method-fm.websync.message-getId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the unique message identifier.
  	 </div>
  
  	@function getId
  	@return {String}
  */


  message.prototype.getId = function() {
    return this.__id;
  };

  /*<span id='method-fm.websync.message-getKey'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record key to which the current client is binding or unbinding.
  	 Overrides <see cref="fm.websync.message.keys">fm.websync.message.keys</see>, <see cref="fm.websync.message.record">fm.websync.message.record</see>, and <see cref="fm.websync.message.records">fm.websync.message.records</see>.
  	 </div>
  
  	@function getKey
  	@return {String}
  */


  message.prototype.getKey = function() {
    return fm.websync.extensible.sharedGetKey(this.__records);
  };

  /*<span id='method-fm.websync.message-getKeys'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record keys to which the current client is binding or unbinding.
  	 Overrides <see cref="fm.websync.message.key">fm.websync.message.key</see>, <see cref="fm.websync.message.record">fm.websync.message.record</see>, and <see cref="fm.websync.message.records">fm.websync.message.records</see>.
  	 </div>
  
  	@function getKeys
  	@return {fm.array}
  */


  message.prototype.getKeys = function() {
    return fm.websync.extensible.sharedGetKeys(this.__records);
  };

  /*<span id='method-fm.websync.message-getLastClientId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the last used client ID.
  	 </div>
  
  	@function getLastClientId
  	@return {fm.nullable}
  */


  message.prototype.getLastClientId = function() {
    return fm.serializer.deserializeGuid(this.getExtensionValueJson("fm.lcid"));
  };

  /*<span id='method-fm.websync.message-getLastSessionId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the last used session ID.
  	 </div>
  
  	@function getLastSessionId
  	@return {fm.nullable}
  */


  message.prototype.getLastSessionId = function() {
    return fm.serializer.deserializeGuid(this.getExtensionValueJson("fm.lsid"));
  };

  /*<span id='method-fm.websync.message-getMinimumVersion'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the minimum supported server version, used internally.
  	 </div>
  
  	@function getMinimumVersion
  	@return {String}
  */


  message.prototype.getMinimumVersion = function() {
    return this.__minimumVersion;
  };

  /*<span id='method-fm.websync.message-getNotifyClientId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the ID of the client which the current client is notifying.
  	 </div>
  
  	@function getNotifyClientId
  	@return {fm.nullable}
  */


  message.prototype.getNotifyClientId = function() {
    return fm.serializer.deserializeGuid(this.getExtensionValueJson("fm.notify"));
  };

  /*<span id='method-fm.websync.message-getNotifyingClient'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the notifying client details, used internally.
  	 </div>
  
  	@function getNotifyingClient
  	@return {fm.websync.notifyingClient}
  */


  message.prototype.getNotifyingClient = function() {
    return fm.websync.serializer.deserializeNotifyingClient(this.getExtensionValueJson("fm.notifying"));
  };

  /*<span id='method-fm.websync.message-getPublishingClient'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the publishing client details, used internally.
  	 </div>
  
  	@function getPublishingClient
  	@return {fm.websync.publishingClient}
  */


  message.prototype.getPublishingClient = function() {
    return fm.websync.serializer.deserializePublishingClient(this.getExtensionValueJson("fm.publishing"));
  };

  /*<span id='method-fm.websync.message-getRecord'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record to which the current client is binding or unbinding.
  	 Overrides <see cref="fm.websync.message.records">fm.websync.message.records</see>, <see cref="fm.websync.message.key">fm.websync.message.key</see>, and <see cref="fm.websync.message.keys">fm.websync.message.keys</see>.
  	 </div>
  
  	@function getRecord
  	@return {fm.websync.record}
  */


  message.prototype.getRecord = function() {
    return fm.websync.extensible.sharedGetRecord(this.__records);
  };

  /*<span id='method-fm.websync.message-getRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the records to which the current client is binding or unbinding.
  	 Overrides <see cref="fm.websync.message.record">fm.websync.message.record</see>, <see cref="fm.websync.message.key">fm.websync.message.key</see>, and <see cref="fm.websync.message.keys">fm.websync.message.keys</see>.
  	 </div>
  
  	@function getRecords
  	@return {fm.array}
  */


  message.prototype.getRecords = function() {
    return fm.websync.extensible.sharedGetRecords(this.__records);
  };

  /*<span id='method-fm.websync.message-getServerActions'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the server actions, used internally.
  	 </div>
  
  	@function getServerActions
  	@return {fm.array}
  */


  message.prototype.getServerActions = function() {
    var extensionValueJson, messageArray, _var0;
    extensionValueJson = this.getExtensionValueJson("fm.server");
    if (!fm.stringExtensions.isNullOrEmpty(extensionValueJson)) {
      messageArray = fm.websync.message.fromJsonMultiple(extensionValueJson);
      _var0 = messageArray;
      if (_var0 !== null && typeof _var0 !== 'undefined') {
        return messageArray;
      }
    }
    return null;
  };

  /*<span id='method-fm.websync.message-getServerTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the server timeout, used internally.
  	 </div>
  
  	@function getServerTimeout
  	@return {fm.nullable}
  */


  message.prototype.getServerTimeout = function() {
    return fm.serializer.deserializeInteger(this.getExtensionValueJson("fm.timeout"));
  };

  /*<span id='method-fm.websync.message-getSessionId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the session ID associated with the message, used internally.
  	 </div>
  
  	@function getSessionId
  	@return {fm.nullable}
  */


  message.prototype.getSessionId = function() {
    return fm.serializer.deserializeGuid(this.getExtensionValueJson("fm.sessionId"));
  };

  /*<span id='method-fm.websync.message-getSupportedConnectionTypes'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the connection types supported by an endpoint, used internally.
  	 </div>
  
  	@function getSupportedConnectionTypes
  	@return {fm.array}
  */


  message.prototype.getSupportedConnectionTypes = function() {
    return this.__supportedConnectionTypes;
  };

  /*<span id='method-fm.websync.message-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag associated with the request.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  message.prototype.getTag = function() {
    var _ref;
    return (_ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? _ref : fm.stringExtensions.empty;
  };

  /*<span id='method-fm.websync.message-getType'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the type of the message.
  	 </div>
  
  	@function getType
  	@return {fm.websync.messageType}
  */


  message.prototype.getType = function() {
    return fm.websync.metaChannels.getMessageType(this.getBayeuxChannel());
  };

  /*<span id='method-fm.websync.message-getVersion'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the current server version, used internally.
  	 </div>
  
  	@function getVersion
  	@return {String}
  */


  message.prototype.getVersion = function() {
    return this.__version;
  };

  /*<span id='method-fm.websync.message-isBind'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Detects whether this is a bind request/response.
  	 </div>
  	@function isBind
  	@return {Boolean}
  */


  message.prototype.isBind = function() {
    return this.getType() === fm.websync.messageType.Bind;
  };

  /*<span id='method-fm.websync.message-isBindingTo'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Determines whether or not the current message represents a bind
  	 request/response for a particular key.
  	 </div>
  	@function isBindingTo
  	@param {String} key The key to test.
  	@return {Boolean} true if the message represents a bind request/response
  	 for the specified key; otherwise false.
  */


  message.prototype.isBindingTo = function() {
    var key, record, _i, _len, _var0, _var1;
    key = arguments[0];
    if (this.getType() === fm.websync.messageType.Bind) {
      _var0 = this.getRecords();
      if (_var0 === null || typeof _var0 === 'undefined') {
        return false;
      }
      _var1 = this.getRecords();
      for (_i = 0, _len = _var1.length; _i < _len; _i++) {
        record = _var1[_i];
        if (record.getKey() === key) {
          return true;
        }
      }
    }
    return false;
  };

  /*<span id='method-fm.websync.message-isConnect'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Detects whether this is a connect request/response.
  	 </div>
  	@function isConnect
  	@return {Boolean}
  */


  message.prototype.isConnect = function() {
    return this.getType() === fm.websync.messageType.Connect;
  };

  /*<span id='method-fm.websync.message-isDisconnect'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Detects whether this is a disconnect request/response.
  	 </div>
  	@function isDisconnect
  	@return {Boolean}
  */


  message.prototype.isDisconnect = function() {
    return this.getType() === fm.websync.messageType.Disconnect;
  };

  /*<span id='method-fm.websync.message-isNotify'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Detects whether this is a notify request/response.
  	 </div>
  	@function isNotify
  	@return {Boolean}
  */


  message.prototype.isNotify = function() {
    return this.getType() === fm.websync.messageType.Notify;
  };

  /*<span id='method-fm.websync.message-isPublish'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Detects whether this is a publish request/response.
  	 </div>
  	@function isPublish
  	@return {Boolean}
  */


  message.prototype.isPublish = function() {
    return this.getType() === fm.websync.messageType.Publish;
  };

  /*<span id='method-fm.websync.message-isService'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Detects whether this is a service request/response.
  	 </div>
  	@function isService
  	@return {Boolean}
  */


  message.prototype.isService = function() {
    return this.getType() === fm.websync.messageType.Service;
  };

  /*<span id='method-fm.websync.message-isStream'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Detects whether this is a stream request/response.
  	 </div>
  	@function isStream
  	@return {Boolean}
  */


  message.prototype.isStream = function() {
    return this.getType() === fm.websync.messageType.Stream;
  };

  /*<span id='method-fm.websync.message-isSubscribe'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Detects whether this is a subscribe request/response.
  	 </div>
  	@function isSubscribe
  	@return {Boolean}
  */


  message.prototype.isSubscribe = function() {
    return this.getType() === fm.websync.messageType.Subscribe;
  };

  /*<span id='method-fm.websync.message-isSubscribingTo'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Determines whether or not the current message represents a subscribe
  	 request/response for a particular channel.
  	 </div>
  	@function isSubscribingTo
  	@param {String} channel The channel to test.
  	@return {Boolean} true if the message represents a subscribe request/response
  	 for the specified channel; otherwise false.
  */


  message.prototype.isSubscribingTo = function() {
    var channel, str, _i, _len, _var0, _var1;
    channel = arguments[0];
    if (this.getType() === fm.websync.messageType.Subscribe) {
      _var0 = this.getChannels();
      if (_var0 === null || typeof _var0 === 'undefined') {
        return false;
      }
      _var1 = this.getChannels();
      for (_i = 0, _len = _var1.length; _i < _len; _i++) {
        str = _var1[_i];
        if (str === channel) {
          return true;
        }
      }
    }
    return false;
  };

  /*<span id='method-fm.websync.message-isUnbind'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Detects whether this is a bind request/response.
  	 </div>
  	@function isUnbind
  	@return {Boolean}
  */


  message.prototype.isUnbind = function() {
    return this.getType() === fm.websync.messageType.Unbind;
  };

  /*<span id='method-fm.websync.message-isUnbindingFrom'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Determines whether or not the current message represents an unbind
  	 request/response for a particular key.
  	 </div>
  	@function isUnbindingFrom
  	@param {String} key The key to test.
  	@return {Boolean} true if the message represents an unbind request/response
  	 for the specified key; otherwise false.
  */


  message.prototype.isUnbindingFrom = function() {
    var key, record, _i, _len, _var0, _var1;
    key = arguments[0];
    if (this.getType() === fm.websync.messageType.Unbind) {
      _var0 = this.getRecords();
      if (_var0 === null || typeof _var0 === 'undefined') {
        return false;
      }
      _var1 = this.getRecords();
      for (_i = 0, _len = _var1.length; _i < _len; _i++) {
        record = _var1[_i];
        if (record.getKey() === key) {
          return true;
        }
      }
    }
    return false;
  };

  /*<span id='method-fm.websync.message-isUnsubscribe'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Detects whether this is an unsubscribe request/response.
  	 </div>
  	@function isUnsubscribe
  	@return {Boolean}
  */


  message.prototype.isUnsubscribe = function() {
    return this.getType() === fm.websync.messageType.Unsubscribe;
  };

  /*<span id='method-fm.websync.message-isUnsubscribingFrom'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Determines whether or not the current message represents an unsubscribe
  	 request/response for a particular channel.
  	 </div>
  	@function isUnsubscribingFrom
  	@param {String} channel The channel to test.
  	@return {Boolean} true if the message represents an unsubscribe request/response
  	 for the specified channel; otherwise false.
  */


  message.prototype.isUnsubscribingFrom = function() {
    var channel, str, _i, _len, _var0, _var1;
    channel = arguments[0];
    if (this.getType() === fm.websync.messageType.Unsubscribe) {
      _var0 = this.getChannels();
      if (_var0 === null || typeof _var0 === 'undefined') {
        return false;
      }
      _var1 = this.getChannels();
      for (_i = 0, _len = _var1.length; _i < _len; _i++) {
        str = _var1[_i];
        if (str === channel) {
          return true;
        }
      }
    }
    return false;
  };

  /*<span id='method-fm.websync.message-setAcknowledgement'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the acknowledgement flag, used internally for stream requests following message delivery.
  	 </div>
  
  	@function setAcknowledgement
  	@param {fm.nullable} value
  	@return {void}
  */


  message.prototype.setAcknowledgement = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.ack", fm.serializer.serializeBoolean(value), false);
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setAdvice'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets details on how the client should reconnect, used internally.
  	 </div>
  
  	@function setAdvice
  	@param {fm.websync.advice} value
  	@return {void}
  */


  message.prototype.setAdvice = function() {
    var value;
    value = arguments[0];
    this.__advice = value;
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setBayeuxChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the Bayeux message channel.
  	 </div>
  
  	@function setBayeuxChannel
  	@param {String} value
  	@return {void}
  */


  message.prototype.setBayeuxChannel = function() {
    var value;
    value = arguments[0];
    this.__bayeuxChannel = value;
    if (fm.websync.metaChannels.isServiceChannel(value)) {
      this.setChannel(fm.websync.metaChannels.convertChannelFromServiced(value));
    } else {
      if (!fm.websync.metaChannels.isMetaChannel(value)) {
        this.setChannel(value);
      }
    }
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the channel to which the current client is publishing, subscribing, or unsubscribing.
  	 Overrides <see cref="fm.websync.message.channels">fm.websync.message.channels</see>.
  	 </div>
  
  	@function setChannel
  	@param {String} value
  	@return {void}
  */


  message.prototype.setChannel = function() {
    var value;
    value = arguments[0];
    this.__channels = fm.websync.extensible.sharedSetChannel(value, this.getValidate());
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setChannels'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the channels to which the current client is subscribing or unsubscribing.
  	 Overrides <see cref="fm.websync.message.channel">fm.websync.message.channel</see>.
  	 </div>
  
  	@function setChannels
  	@param {fm.array} value
  	@return {void}
  */


  message.prototype.setChannels = function() {
    var value;
    value = arguments[0];
    this.__channels = fm.websync.extensible.sharedSetChannels(value, this.getValidate());
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setClientId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the unique identifier of the current client associated with the request/response.
  	 </div>
  
  	@function setClientId
  	@param {fm.nullable} value
  	@return {void}
  */


  message.prototype.setClientId = function() {
    var value;
    value = arguments[0];
    this.__clientId = value;
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setConnectionType'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the type of connection the client is using, used internally.
  	 </div>
  
  	@function setConnectionType
  	@param {fm.nullable} value
  	@return {void}
  */


  message.prototype.setConnectionType = function() {
    var value;
    value = arguments[0];
    this.__connectionType = value;
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setDisableBinary'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets whether binary is disabled.
  	 </div>
  
  	@function setDisableBinary
  	@param {fm.nullable} value
  	@return {void}
  */


  message.prototype.setDisableBinary = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.dbin", fm.serializer.serializeBoolean(value), false);
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the unique message identifier.
  	 </div>
  
  	@function setId
  	@param {String} value
  	@return {void}
  */


  message.prototype.setId = function() {
    var value;
    value = arguments[0];
    this.__id = value;
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setKey'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the record key to which the current client is binding or unbinding.
  	 Overrides <see cref="fm.websync.message.keys">fm.websync.message.keys</see>, <see cref="fm.websync.message.record">fm.websync.message.record</see>, and <see cref="fm.websync.message.records">fm.websync.message.records</see>.
  	 </div>
  
  	@function setKey
  	@param {String} value
  	@return {void}
  */


  message.prototype.setKey = function() {
    var value;
    value = arguments[0];
    this.__records = fm.websync.extensible.sharedSetKey(value, this.getValidate());
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setKeys'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the record keys to which the current client is binding or unbinding.
  	 Overrides <see cref="fm.websync.message.key">fm.websync.message.key</see>, <see cref="fm.websync.message.record">fm.websync.message.record</see>, and <see cref="fm.websync.message.records">fm.websync.message.records</see>.
  	 </div>
  
  	@function setKeys
  	@param {fm.array} value
  	@return {void}
  */


  message.prototype.setKeys = function() {
    var value;
    value = arguments[0];
    this.__records = fm.websync.extensible.sharedSetKeys(value, this.getValidate());
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setLastClientId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the last used client ID.
  	 </div>
  
  	@function setLastClientId
  	@param {fm.nullable} value
  	@return {void}
  */


  message.prototype.setLastClientId = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.lcid", fm.serializer.serializeGuid(value), false);
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setLastSessionId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the last used session ID.
  	 </div>
  
  	@function setLastSessionId
  	@param {fm.nullable} value
  	@return {void}
  */


  message.prototype.setLastSessionId = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.lsid", fm.serializer.serializeGuid(value), false);
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setMinimumVersion'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the minimum supported server version, used internally.
  	 </div>
  
  	@function setMinimumVersion
  	@param {String} value
  	@return {void}
  */


  message.prototype.setMinimumVersion = function() {
    var value;
    value = arguments[0];
    this.__minimumVersion = value;
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setNotifyClientId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the ID of the client which the current client is notifying.
  	 </div>
  
  	@function setNotifyClientId
  	@param {fm.nullable} value
  	@return {void}
  */


  message.prototype.setNotifyClientId = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.notify", fm.serializer.serializeGuid(value), false);
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setNotifyingClient'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the notifying client details, used internally.
  	 </div>
  
  	@function setNotifyingClient
  	@param {fm.websync.notifyingClient} value
  	@return {void}
  */


  message.prototype.setNotifyingClient = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.notifying", fm.websync.serializer.serializeNotifyingClient(value), false);
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setPublishingClient'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the publishing client details, used internally.
  	 </div>
  
  	@function setPublishingClient
  	@param {fm.websync.publishingClient} value
  	@return {void}
  */


  message.prototype.setPublishingClient = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.publishing", fm.websync.serializer.serializePublishingClient(value), false);
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setRecord'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the record to which the current client is binding or unbinding.
  	 Overrides <see cref="fm.websync.message.records">fm.websync.message.records</see>, <see cref="fm.websync.message.key">fm.websync.message.key</see>, and <see cref="fm.websync.message.keys">fm.websync.message.keys</see>.
  	 </div>
  
  	@function setRecord
  	@param {fm.websync.record} value
  	@return {void}
  */


  message.prototype.setRecord = function() {
    var value;
    value = arguments[0];
    this.__records = fm.websync.extensible.sharedSetRecord(value, this.getValidate());
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the records to which the current client is binding or unbinding.
  	 Overrides <see cref="fm.websync.message.record">fm.websync.message.record</see>, <see cref="fm.websync.message.key">fm.websync.message.key</see>, and <see cref="fm.websync.message.keys">fm.websync.message.keys</see>.
  	 </div>
  
  	@function setRecords
  	@param {fm.array} value
  	@return {void}
  */


  message.prototype.setRecords = function() {
    var value;
    value = arguments[0];
    this.__records = fm.websync.extensible.sharedSetRecords(value, this.getValidate());
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setServerActions'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the server actions, used internally.
  	 </div>
  
  	@function setServerActions
  	@param {fm.array} value
  	@return {void}
  */


  message.prototype.setServerActions = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.server", fm.websync.message.toJsonMultiple(value), false);
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setServerTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the server timeout, used internally.
  	 </div>
  
  	@function setServerTimeout
  	@param {fm.nullable} value
  	@return {void}
  */


  message.prototype.setServerTimeout = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.timeout", fm.serializer.serializeInteger(value), false);
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setSessionId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the session ID associated with the message, used internally.
  	 </div>
  
  	@function setSessionId
  	@param {fm.nullable} value
  	@return {void}
  */


  message.prototype.setSessionId = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.sessionId", fm.serializer.serializeGuid(value), false);
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setSupportedConnectionTypes'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the connection types supported by an endpoint, used internally.
  	 </div>
  
  	@function setSupportedConnectionTypes
  	@param {fm.array} value
  	@return {void}
  */


  message.prototype.setSupportedConnectionTypes = function() {
    var value;
    value = arguments[0];
    this.__supportedConnectionTypes = value;
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the tag associated with the request.
  	 </div>
  
  	@function setTag
  	@param {String} value
  	@return {void}
  */


  message.prototype.setTag = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.tag", fm.serializer.serializeString(value != null ? value : fm.stringExtensions.empty), false);
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-setVersion'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the current server version, used internally.
  	 </div>
  
  	@function setVersion
  	@param {String} value
  	@return {void}
  */


  message.prototype.setVersion = function() {
    var value;
    value = arguments[0];
    this.__version = value;
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.message-toBinary'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes the message to binary.
  	 </div>
  	@function toBinary
  	@return {fm.array} The message in binary-serialized format.
  */


  message.prototype.toBinary = function() {
    return fm.websync.message.toBinary(this);
  };

  /*<span id='method-fm.websync.message-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes the message to JSON.
  	 </div>
  	@function toJson
  	@return {String} The message in JSON-serialized format.
  */


  message.prototype.toJson = function() {
    return fm.websync.message.toJson(this);
  };

  message.prototype.toJsonNoData = function() {
    var dataBytes, dataJson, str;
    dataBytes = arguments[0];
    dataJson = arguments[1];
    if (this.getIsBinary()) {
      dataBytes.setValue(this.getDataBytes());
      dataJson.setValue(null);
      this.setDataBytes(null);
      str = this.toJson();
      this.setDataBytes(dataBytes.getValue());
      return str;
    }
    dataBytes.setValue(null);
    dataJson.setValue(this.getDataJson());
    this.setDataJson(null);
    str = this.toJson();
    this.setDataJson(dataJson.getValue());
    return str;
  };

  return message;

}).call(this, fm.websync.baseMessage);


/*<span id='cls-fm.websync.publication'>&nbsp;</span>
*/

/**
@class fm.websync.publication
 <div>
 The WebSync publication used for direct publishing.
 </div>

@extends fm.websync.baseMessage
*/


fm.websync.publication = (function(_super) {

  __extends(publication, _super);

  publication.prototype.__channel = null;

  /*<span id='method-fm.websync.publication-fm.websync.publication'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Creates a new publication with a channel and JSON data.
  	 </div>
  	@function fm.websync.publication
  	@param {String} channel The channel to target.
  	@param {String} dataJson The data to send (in JSON format).
  	@param {String} tag The tag that identifies the contents of the payload.
  	@return {}
  */


  function publication() {
    this.toJson = __bind(this.toJson, this);

    this.setTag = __bind(this.setTag, this);

    this.setChannel = __bind(this.setChannel, this);

    this.getTag = __bind(this.getTag, this);

    this.getChannel = __bind(this.getChannel, this);

    var channel, dataJson, tag;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      publication.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 2) {
      channel = arguments[0];
      dataJson = arguments[1];
      publication.call(this, channel, dataJson, null);
      return;
    }
    if (arguments.length === 3) {
      channel = arguments[0];
      dataJson = arguments[1];
      tag = arguments[2];
      publication.__super__.constructor.call(this);
      this.setChannel(channel);
      this.setDataJson(dataJson);
      this.setTag(tag);
      return;
    }
    if (arguments.length === 0) {
      publication.__super__.constructor.call(this);
      return;
    }
    if (arguments.length === 1) {
      channel = arguments[0];
      publication.__super__.constructor.call(this);
      this.setChannel(channel);
      return;
    }
  }

  /*<span id='method-fm.websync.publication-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a publication from JSON.
  	 </div>
  	@function fromJson
  	@param {String} publicationJson A JSON string to deserialize.
  	@return {fm.websync.publication} A deserialized publication.
  */


  publication.fromJson = function() {
    var publicationJson;
    publicationJson = arguments[0];
    return fm.websync.serializer.deserializePublication(publicationJson);
  };

  /*<span id='method-fm.websync.publication-fromJsonMultiple'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a list of publications from JSON.
  	 </div>
  	@function fromJsonMultiple
  	@param {String} publicationsJson A JSON string to deserialize.
  	@return {fm.array} A deserialized list of publications.
  */


  publication.fromJsonMultiple = function() {
    var publicationsJson;
    publicationsJson = arguments[0];
    return fm.websync.serializer.deserializePublicationArray(publicationsJson);
  };

  /*<span id='method-fm.websync.publication-fromMessage'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Converts a Publication from its Message format.
  	 </div>
  	@function fromMessage
  	@param {fm.websync.message} message The message.
  	@return {fm.websync.publication} The publication.
  */


  publication.fromMessage = function() {
    var message, publication, _var0;
    message = arguments[0];
    _var0 = message;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    publication = new fm.websync.publication();
    publication.setChannel(message.getBayeuxChannel());
    publication.setSuccessful(message.getSuccessful());
    publication.setError(message.getError());
    publication.setTimestamp(message.getTimestamp());
    publication.setDataJson(message.getDataJson());
    publication.setExtensions(message.getExtensions());
    return publication;
  };

  /*<span id='method-fm.websync.publication-fromMessages'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Converts a set of Publications from their Message formats.
  	 </div>
  	@function fromMessages
  	@param {fm.array} messages The messages.
  	@return {fm.array} The publications.
  */


  publication.fromMessages = function() {
    var i, messages, publicationArray, _var0;
    messages = arguments[0];
    _var0 = messages;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    publicationArray = new Array(messages.length);
    i = 0;
    while (i < messages.length) {
      try {
        publicationArray[i] = fm.websync.publication.fromMessage(messages[i]);
      } finally {
        i++;
      }
    }
    return publicationArray;
  };

  /*<span id='method-fm.websync.publication-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a publication to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.publication} publication A publication to serialize.
  	@return {String} A JSON-serialized publication.
  */


  publication.toJson = function() {
    var publication;
    publication = arguments[0];
    return fm.websync.serializer.serializePublication(publication);
  };

  /*<span id='method-fm.websync.publication-toJsonMultiple'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a list of publications to JSON.
  	 </div>
  	@function toJsonMultiple
  	@param {fm.array} publications A list of publications to serialize.
  	@return {String} A JSON-serialized array of publications.
  */


  publication.toJsonMultiple = function() {
    var publications;
    publications = arguments[0];
    return fm.websync.serializer.serializePublicationArray(publications);
  };

  /*<span id='method-fm.websync.publication-toMessage'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Converts a Publication to its Message format.
  	 </div>
  	@function toMessage
  	@param {fm.websync.publication} publication The publication.
  	@return {fm.websync.message} The message.
  */


  publication.toMessage = function() {
    var message, publication, _var0;
    publication = arguments[0];
    _var0 = publication;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    message = new fm.websync.message();
    message.setBayeuxChannel(publication.getChannel());
    message.setSuccessful(publication.getSuccessful());
    message.setError(publication.getError());
    message.setTimestamp(publication.getTimestamp());
    message.setDataJson(publication.getDataJson());
    message.setExtensions(publication.getExtensions());
    return message;
  };

  /*<span id='method-fm.websync.publication-toMessages'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Converts a set of Publications to their Message formats.
  	 </div>
  	@function toMessages
  	@param {fm.array} publications The publications.
  	@return {fm.array} The messages.
  */


  publication.toMessages = function() {
    var i, messageArray, publications, _var0;
    publications = arguments[0];
    _var0 = publications;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    messageArray = new Array(publications.length);
    i = 0;
    while (i < publications.length) {
      try {
        messageArray[i] = fm.websync.publication.toMessage(publications[i]);
      } finally {
        i++;
      }
    }
    return messageArray;
  };

  /*<span id='method-fm.websync.publication-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the channel the publisher is targeting.
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  publication.prototype.getChannel = function() {
    return this.__channel;
  };

  /*<span id='method-fm.websync.publication-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  publication.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };

  /*<span id='method-fm.websync.publication-setChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the channel the publisher is targeting.
  	 </div>
  
  	@function setChannel
  	@param {String} value
  	@return {void}
  */


  publication.prototype.setChannel = function() {
    var error, value, _var0, _var1, _var2;
    value = arguments[0];
    _var0 = value;
    if (_var0 === null || typeof _var0 === 'undefined') {
      this.__channel = value;
      return this.setIsDirty(true);
    } else {
      error = null;
      _var1 = new fm.holder(error);
      _var2 = fm.websync.extensible.validateChannel(value, _var1);
      error = _var1.getValue();
      if (!(!this.getValidate() || _var2)) {
        throw new Error(fm.stringExtensions.format("Invalid channel. {0}", error));
      }
      this.__channel = value;
      return this.setIsDirty(true);
    }
  };

  /*<span id='method-fm.websync.publication-setTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function setTag
  	@param {String} value
  	@return {void}
  */


  publication.prototype.setTag = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.tag", fm.serializer.serializeString(value), false);
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.publication-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes the publication to JSON.
  	 </div>
  	@function toJson
  	@return {String} The publication in JSON-serialized format.
  */


  publication.prototype.toJson = function() {
    return fm.websync.publication.toJson(this);
  };

  return publication;

}).call(this, fm.websync.baseMessage);


/*<span id='cls-fm.websync.publisher'>&nbsp;</span>
*/

/**
@class fm.websync.publisher
 <div>
 <p>
 The WebSync publisher, used for publishing data rapidly and efficiently.
 </p>
 </div><div>
 <p>
 When developing real-time applications, it is often most efficient and secure to
 publish data from a server, a web service, or in general, a source that doesn't
 require the ability to subscribe to channels.  The <see cref="fm.websync.publisher">fm.websync.publisher</see> is
 designed to do just that.
 </p>
 <p>
 A common use case for the <see cref="fm.websync.publisher">fm.websync.publisher</see> is to send out data as it
 arrives from a real-time feed (e.g. stock data, sports scores, news articles, etc.).
 Wherever the feed is located, the <see cref="fm.websync.publisher">fm.websync.publisher</see> can be used to send
 out the data rapidly to any subscribed clients.
 </p>
 <p>
 For security reasons, WebSync Server blocks Publisher requests by default. To
 enable direct publication, make sure "allowPublishers" is enabled in web.config.
 </p>
 <p>
 The publisher always runs synchronously.
 </p>
 <p>
 There are multiple overloads for the "Publish" method. For batch
 publications, use the overloads that take a collection of
 <see cref="fm.websync.publication">Publications</see>. They will be automatically batched and
 delivered in a single round-trip.
 </p>
 </div>

@extends fm.websync.baseClient
*/


fm.websync.publisher = (function(_super) {

  __extends(publisher, _super);

  publisher._onNotifyRequest = null;

  publisher._onNotifyResponse = null;

  publisher._onPublishRequest = null;

  publisher._onPublishResponse = null;

  publisher._requestUrlCache = null;

  publisher._requestUrlCacheLock = null;

  /*<span id='method-fm.websync.publisher-fm.websync.publisher'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.publisher">fm.websync.publisher</see> class.
  	 </div>
  	@function fm.websync.publisher
  	@param {String} requestUrl The absolute URL of the WebSync server request handler.
  	@return {}
  */


  function publisher() {
    this.send = __bind(this.send, this);

    this.raiseResponseEvent = __bind(this.raiseResponseEvent, this);

    this.raiseRequestEvent = __bind(this.raiseRequestEvent, this);

    this.raiseEvent = __bind(this.raiseEvent, this);

    this.publishMany = __bind(this.publishMany, this);

    this.publish = __bind(this.publish, this);

    this.processRequestUrl = __bind(this.processRequestUrl, this);

    this.performPublish = __bind(this.performPublish, this);

    this.performNotify = __bind(this.performNotify, this);

    this.notifyMany = __bind(this.notifyMany, this);

    this.notify = __bind(this.notify, this);

    var requestUrl;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      publisher.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    requestUrl = arguments[0];
    publisher.__super__.constructor.call(this, requestUrl);
  }

  /*<span id='method-fm.websync.publisher-addOnNotifyRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.publisher">fm.websync.publisher</see> notify request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnNotifyRequest
  	@param {fm.doubleAction} value
  	@return {void}
  */


  publisher.addOnNotifyRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.publisher._onNotifyRequest = fm.delegate.combine(fm.websync.publisher._onNotifyRequest, value);
  };

  /*<span id='method-fm.websync.publisher-addOnNotifyResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.publisher">fm.websync.publisher</see> notify response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnNotifyResponse
  	@param {fm.doubleAction} value
  	@return {void}
  */


  publisher.addOnNotifyResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.publisher._onNotifyResponse = fm.delegate.combine(fm.websync.publisher._onNotifyResponse, value);
  };

  /*<span id='method-fm.websync.publisher-addOnPublishRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.publisher">fm.websync.publisher</see> publish request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnPublishRequest
  	@param {fm.doubleAction} value
  	@return {void}
  */


  publisher.addOnPublishRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.publisher._onPublishRequest = fm.delegate.combine(fm.websync.publisher._onPublishRequest, value);
  };

  /*<span id='method-fm.websync.publisher-addOnPublishResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.publisher">fm.websync.publisher</see> publish response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnPublishResponse
  	@param {fm.doubleAction} value
  	@return {void}
  */


  publisher.addOnPublishResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.publisher._onPublishResponse = fm.delegate.combine(fm.websync.publisher._onPublishResponse, value);
  };

  /*<span id='method-fm.websync.publisher-removeOnNotifyRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.publisher">fm.websync.publisher</see> notify request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnNotifyRequest
  	@param {fm.doubleAction} value
  	@return {void}
  */


  publisher.removeOnNotifyRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.publisher._onNotifyRequest = fm.delegate.remove(fm.websync.publisher._onNotifyRequest, value);
  };

  /*<span id='method-fm.websync.publisher-removeOnNotifyResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.publisher">fm.websync.publisher</see> notify response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnNotifyResponse
  	@param {fm.doubleAction} value
  	@return {void}
  */


  publisher.removeOnNotifyResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.publisher._onNotifyResponse = fm.delegate.remove(fm.websync.publisher._onNotifyResponse, value);
  };

  /*<span id='method-fm.websync.publisher-removeOnPublishRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.publisher">fm.websync.publisher</see> publish request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnPublishRequest
  	@param {fm.doubleAction} value
  	@return {void}
  */


  publisher.removeOnPublishRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.publisher._onPublishRequest = fm.delegate.remove(fm.websync.publisher._onPublishRequest, value);
  };

  /*<span id='method-fm.websync.publisher-removeOnPublishResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.publisher">fm.websync.publisher</see> publish response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnPublishResponse
  	@param {fm.doubleAction} value
  	@return {void}
  */


  publisher.removeOnPublishResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.publisher._onPublishResponse = fm.delegate.remove(fm.websync.publisher._onPublishResponse, value);
  };

  /*<span id='method-fm.websync.publisher-notify'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends a notification synchronously over HTTP.
  	 </div><div>
  	 This method always executes synchronously and returns the
  	 <see cref="fm.websync.notification">fm.websync.notification</see> it automatically creates.
  	 </div>
  	@function notify
  	@param {fm.guid} clientId The client to which the data should be sent.
  	@param {String} dataJson The data to deliver (in JSON format).
  	@param {String} tag The tag that identifies the contents of the payload.
  	@return {fm.websync.notification} The generated notification.
  */


  publisher.prototype.notify = function() {
    var clientId, dataJson, notification, notificationArray, tag, _var0;
    if (arguments.length === 3) {
      clientId = arguments[0];
      dataJson = arguments[1];
      tag = arguments[2];
      return this.notify(new fm.websync.notification(clientId, dataJson, tag));
      return;
    }
    if (arguments.length === 1) {
      notification = arguments[0];
      notificationArray = this.notifyMany([notification]);
      _var0 = notificationArray;
      if ((_var0 === null || typeof _var0 === 'undefined') || (notificationArray.length === 0)) {
        return null;
      }
      return notificationArray[0];
      return;
    }
    if (arguments.length === 2) {
      clientId = arguments[0];
      dataJson = arguments[1];
      return this.notify(new fm.websync.notification(clientId, dataJson));
    }
  };

  /*<span id='method-fm.websync.publisher-notifyMany'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends an array of notifications synchronously over HTTP.
  	 </div><div>
  	 This method always executes synchronously and returns the
  	 <see cref="fm.websync.notification">Notifications</see> it sends.
  	 </div>
  	@function notifyMany
  	@param {fm.array} notifications The notifications to send.
  	@return {fm.array} The completed notifications.
  */


  publisher.prototype.notifyMany = function() {
    var notifications, _var0;
    notifications = arguments[0];
    _var0 = notifications;
    if ((_var0 === null || typeof _var0 === 'undefined') || (notifications.length === 0)) {
      throw new Error("notifications cannot be null/empty.");
    }
    return this.performNotify(notifications);
  };

  publisher.prototype.performNotify = function() {
    var args, args3, notificationArray, requestMessages, requestNotifications, responseArgs, _var0;
    requestNotifications = arguments[0];
    args3 = new fm.websync.publisherNotifyRequestArgs();
    args3.setRequests(requestNotifications);
    if (this.raiseRequestEvent(fm.websync.publisher._onNotifyRequest, args3)) {
      requestMessages = fm.websync.notification.toMessages(requestNotifications);
      responseArgs = this.send(requestMessages, this.getRequestUrl());
      notificationArray = fm.websync.notification.fromMessages(responseArgs.getResponses());
      args = new fm.websync.publisherNotifyResponseArgs();
      args.setRequests(requestNotifications);
      args.setResponses(notificationArray);
      this.raiseResponseEvent(fm.websync.publisher._onNotifyResponse, args, responseArgs);
      _var0 = responseArgs.getException();
      if (_var0 !== null && typeof _var0 !== 'undefined') {
        throw responseArgs.getException();
      }
      return notificationArray;
    }
    return null;
  };

  publisher.prototype.performPublish = function() {
    var args, args3, publicationArray, requestMessages, requestPublications, responseArgs, _var0;
    requestPublications = arguments[0];
    args3 = new fm.websync.publisherPublishRequestArgs();
    args3.setRequests(requestPublications);
    if (this.raiseRequestEvent(fm.websync.publisher._onPublishRequest, args3)) {
      requestMessages = fm.websync.publication.toMessages(requestPublications);
      responseArgs = this.send(requestMessages, this.getRequestUrl());
      publicationArray = fm.websync.publication.fromMessages(responseArgs.getResponses());
      args = new fm.websync.publisherPublishResponseArgs();
      args.setRequests(requestPublications);
      args.setResponses(publicationArray);
      this.raiseResponseEvent(fm.websync.publisher._onPublishResponse, args, responseArgs);
      _var0 = responseArgs.getException();
      if (_var0 !== null && typeof _var0 !== 'undefined') {
        throw responseArgs.getException();
      }
      return publicationArray;
    }
    return null;
  };

  publisher.prototype.processRequestUrl = function() {
    var flag, requestUrl, str, _var0, _var1;
    requestUrl = arguments[0];
    if (fm.stringExtensions.isNullOrEmpty(requestUrl)) {
      requestUrl = this.getRequestUrl();
    }
    flag = false;
    str = null;
    if (this.getConcurrencyMode() === fm.websync.concurrencyMode.High) {
      _var0 = new fm.holder(str);
      _var1 = fm.hashExtensions.tryGetValue(fm.websync.publisher._requestUrlCache, requestUrl, _var0);
      str = _var0.getValue();
      flag = _var1;
    }
    if (!flag) {
      str = requestUrl;
      str = fm.httpTransfer.addQueryToUrl(fm.httpTransfer.addQueryToUrl(str, "src", fm.httpWebRequestTransfer.getPlatformCode()), "AspxAutoDetectCookieSupport", "1");
      if (this.getConcurrencyMode() !== fm.websync.concurrencyMode.High) {
        return str;
      }
      fm.websync.publisher._requestUrlCache[requestUrl] = str;
    }
    return str;
  };

  /*<span id='method-fm.websync.publisher-publish'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends a publication synchronously over HTTP.
  	 </div><div>
  	 This method always executes synchronously and returns the
  	 <see cref="fm.websync.publication">fm.websync.publication</see> it automatically creates.
  	 </div>
  	@function publish
  	@param {String} channel The channel to which the data should be sent.
  	@param {String} dataJson The data to send (in JSON format).
  	@param {String} tag The tag that identifies the contents of the payload.
  	@return {fm.websync.publication} The generated publication.
  */


  publisher.prototype.publish = function() {
    var channel, dataJson, publication, publicationArray, tag, _var0;
    if (arguments.length === 3) {
      channel = arguments[0];
      dataJson = arguments[1];
      tag = arguments[2];
      return this.publish(new fm.websync.publication(channel, dataJson, tag));
      return;
    }
    if (arguments.length === 1) {
      publication = arguments[0];
      publicationArray = this.publishMany([publication]);
      _var0 = publicationArray;
      if ((_var0 === null || typeof _var0 === 'undefined') || (publicationArray.length === 0)) {
        return null;
      }
      return publicationArray[0];
      return;
    }
    if (arguments.length === 2) {
      channel = arguments[0];
      dataJson = arguments[1];
      return this.publish(new fm.websync.publication(channel, dataJson));
    }
  };

  /*<span id='method-fm.websync.publisher-publishMany'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends an array of publications synchronously over HTTP.
  	 </div><div>
  	 This method always executes synchronously and returns the
  	 <see cref="fm.websync.publication">Publications</see> it sends.
  	 </div>
  	@function publishMany
  	@param {fm.array} publications The publications to send.
  	@return {fm.array} The completed publications.
  */


  publisher.prototype.publishMany = function() {
    var publications, _var0;
    publications = arguments[0];
    _var0 = publications;
    if ((_var0 === null || typeof _var0 === 'undefined') || (publications.length === 0)) {
      throw new Error("publications cannot be null/empty.");
    }
    return this.performPublish(publications);
  };

  publisher.prototype.raiseEvent = function() {
    var args, eventMethod, _var0;
    eventMethod = arguments[0];
    args = arguments[1];
    args.setPublisher(this);
    _var0 = eventMethod;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return eventMethod(this, args);
    }
  };

  publisher.prototype.raiseRequestEvent = function() {
    var args, eventMethod;
    eventMethod = arguments[0];
    args = arguments[1];
    this.raiseEvent(eventMethod, args);
    return !args.getCancel();
  };

  publisher.prototype.raiseResponseEvent = function() {
    var args, eventMethod, responseArgs;
    eventMethod = arguments[0];
    args = arguments[1];
    responseArgs = arguments[2];
    args.setException(responseArgs.getException());
    return this.raiseEvent(eventMethod, args);
  };

  publisher.prototype.send = function() {
    var args2, args3, args4, args5, args6, httpMessageTransfer, message, requestArgs, requestMessages, str, url, _i, _len, _var0, _var1, _var2;
    requestMessages = arguments[0];
    url = arguments[1];
    str = this.processRequestUrl(url);
    url = this.processRequestUrl(url);
    _var0 = requestMessages;
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      message = _var0[_i];
      if (this.getDisableBinary()) {
        message.setDisableBinary(this.getDisableBinary());
      }
    }
    args6 = new fm.websync.messageRequestArgs(this.createHeaders());
    args6.setMessages(requestMessages);
    args6.setOnRequestCreated(this.internalOnRequestCreated);
    args6.setOnResponseReceived(this.internalOnResponseReceived);
    args6.setOnHttpRequestCreated(this.internalOnHttpRequestCreated);
    args6.setOnHttpResponseReceived(this.internalOnHttpResponseReceived);
    args6.setSender(this);
    args6.setTimeout(this.getRequestTimeout());
    args6.setUrl(url);
    requestArgs = args6;
    requestArgs.setDynamicValue("frameUrl", str);
    httpMessageTransfer = fm.websync.messageTransferFactory.getHttpMessageTransfer();
    args2 = httpMessageTransfer.send(requestArgs);
    try {
      httpMessageTransfer.shutdown();
    } catch (exception1) {

    } finally {

    }
    _var1 = args2.getException();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      args3 = new fm.websync.publisherResponseArgs();
      args3.setException(args2.getException());
      return args3;
    }
    _var2 = args2.getMessages();
    if ((_var2 === null || typeof _var2 === 'undefined') || (args2.getMessages().length === 0)) {
      args4 = new fm.websync.publisherResponseArgs();
      args4.setException(new Error("Invalid response received from server."));
      return args4;
    }
    args5 = new fm.websync.publisherResponseArgs();
    args5.setResponses(args2.getMessages());
    return args5;
  };

  publisher._requestUrlCache = {};

  publisher._requestUrlCacheLock = new fm.object();

  return publisher;

}).call(this, fm.websync.baseClient);


/*<span id='cls-fm.websync.record'>&nbsp;</span>
*/

/**
@class fm.websync.record
 <div>
 A key-value record for binding to a client.
 </div>

@extends fm.dynamic
*/


fm.websync.record = (function(_super) {

  __extends(record, _super);

  record.prototype.__key = null;

  record.prototype.__priv = false;

  record.prototype.__valueJson = null;

  record.prototype._validate = false;

  /*<span id='method-fm.websync.record-fm.websync.record'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.record">fm.websync.record</see> class.
  	 </div>
  	@function fm.websync.record
  	@param {String} key The key used to locate the value.
  	@param {String} valueJson The value in JSON format.
  	@param {Boolean} priv Whether the record is (to be) private.
  	@return {}
  */


  function record() {
    this.setValue = __bind(this.setValue, this);

    this.getValue = __bind(this.getValue, this);

    this.toString = __bind(this.toString, this);

    this.toJson = __bind(this.toJson, this);

    this.setValueJson = __bind(this.setValueJson, this);

    this.setValidate = __bind(this.setValidate, this);

    this.setPrivate = __bind(this.setPrivate, this);

    this.setKey = __bind(this.setKey, this);

    this.getValueJson = __bind(this.getValueJson, this);

    this.getValidate = __bind(this.getValidate, this);

    this.getPrivate = __bind(this.getPrivate, this);

    this.getKey = __bind(this.getKey, this);

    this.getHashCode = __bind(this.getHashCode, this);

    this.equals = __bind(this.equals, this);

    this.duplicate = __bind(this.duplicate, this);

    var key, priv, valueJson;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      record.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 1) {
      key = arguments[0];
      record.call(this, key, null);
      return;
    }
    if (arguments.length === 2) {
      key = arguments[0];
      valueJson = arguments[1];
      record.call(this, key, valueJson, false);
      return;
    }
    if (arguments.length === 3) {
      key = arguments[0];
      valueJson = arguments[1];
      priv = arguments[2];
      record.__super__.constructor.call(this);
      this.setValidate(true);
      this.setKey(key);
      this.setValueJson(valueJson);
      this.setPrivate(priv);
      return;
    }
  }

  /*<span id='method-fm.websync.record-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a record from JSON.
  	 </div>
  	@function fromJson
  	@param {String} recordJson A JSON string to deserialize.
  	@return {fm.websync.record} A deserialized record.
  */


  record.fromJson = function() {
    var recordJson;
    recordJson = arguments[0];
    return fm.websync.serializer.deserializeRecord(recordJson);
  };

  /*<span id='method-fm.websync.record-fromJsonMultiple'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a list of records from JSON.
  	 </div>
  	@function fromJsonMultiple
  	@param {String} recordsJson A JSON string to deserialize.
  	@return {fm.array} A deserialized list of records.
  */


  record.fromJsonMultiple = function() {
    var recordsJson;
    recordsJson = arguments[0];
    return fm.websync.serializer.deserializeRecordArray(recordsJson);
  };

  /*<span id='method-fm.websync.record-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a record to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.record} record A record to serialize.
  	@return {String} A JSON-serialized record.
  */


  record.toJson = function() {
    var record;
    record = arguments[0];
    return fm.websync.serializer.serializeRecord(record);
  };

  /*<span id='method-fm.websync.record-toJsonMultiple'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a list of records to JSON.
  	 </div>
  	@function toJsonMultiple
  	@param {fm.array} records A list of records to serialize.
  	@return {String} A JSON-serialized array of records.
  */


  record.toJsonMultiple = function() {
    var records;
    records = arguments[0];
    return fm.websync.serializer.serializeRecordArray(records);
  };

  /*<span id='method-fm.websync.record-duplicate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Creates a deep clone of this record.
  	 </div>
  	@function duplicate
  	@return {fm.websync.record} A deep clone of this record.
  */


  record.prototype.duplicate = function() {
    return new fm.websync.record(this.getKey(), this.getValueJson(), this.getPrivate());
  };

  /*<span id='method-fm.websync.record-equals'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Determines whether the specified object is equal to this instance.
  	 </div>
  	@function equals
  	@param {fm.object} obj The object to compare with this instance.
  	@return {Boolean} true if the specified object is equal to this instance; otherwise, false.
  */


  record.prototype.equals = function() {
    var obj, record;
    obj = arguments[0];
    record = fm.global.tryCast(obj, fm.websync.record);
    return record === this;
  };

  /*<span id='method-fm.websync.record-getHashCode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Returns a hash code for this instance.
  	 </div>
  	@function getHashCode
  	@return {Integer} 
  	 A hash code for this instance, suitable for use in hashing algorithms and data structures like a hash table.
  */


  record.prototype.getHashCode = function() {
    var num, _var0, _var1;
    num = 17;
    _var0 = this.getKey();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      num = (num * 23) + this.getKey().hashCode();
    }
    _var1 = this.getValueJson();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      num = (num * 23) + this.getValueJson().hashCode();
    }
    return (num * 23) + this.getPrivate().hashCode();
  };

  /*<span id='method-fm.websync.record-getKey'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the key used to locate the value.
  	 </div>
  
  	@function getKey
  	@return {String}
  */


  record.prototype.getKey = function() {
    return this.__key;
  };

  /*<span id='method-fm.websync.record-getPrivate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the flag that indicates whether or not the record is (to be) hidden from other
  	 clients. If <c>true</c>, the record will only be visible to the source client
  	 and the server. If <c>false</c> or <c>null</c>, the record will be publicly
  	 visible to other clients. Defaults to <c>null</c>.
  	 </div>
  
  	@function getPrivate
  	@return {Boolean}
  */


  record.prototype.getPrivate = function() {
    return this.__priv;
  };

  record.prototype.getValidate = function() {
    return this._validate;
  };

  /*<span id='method-fm.websync.record-getValueJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the record value.  This must be valid JSON.
  	 </div>
  
  	@function getValueJson
  	@return {String}
  */


  record.prototype.getValueJson = function() {
    return this.__valueJson;
  };

  /*<span id='method-fm.websync.record-setKey'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the key used to locate the value.
  	 </div>
  
  	@function setKey
  	@param {String} value
  	@return {void}
  */


  record.prototype.setKey = function() {
    var value, _var0;
    value = arguments[0];
    _var0 = value;
    if (_var0 === null || typeof _var0 === 'undefined') {
      throw new Error("key cannot be null.");
    }
    this.__key = value;
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.record-setPrivate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the flag that indicates whether or not the record is (to be) hidden from other
  	 clients. If <c>true</c>, the record will only be visible to the source client
  	 and the server. If <c>false</c> or <c>null</c>, the record will be publicly
  	 visible to other clients. Defaults to <c>null</c>.
  	 </div>
  
  	@function setPrivate
  	@param {Boolean} value
  	@return {void}
  */


  record.prototype.setPrivate = function() {
    var value;
    value = arguments[0];
    this.__priv = value;
    return this.setIsDirty(true);
  };

  record.prototype.setValidate = function() {
    var value;
    value = arguments[0];
    return this._validate = value;
  };

  /*<span id='method-fm.websync.record-setValueJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the record value.  This must be valid JSON.
  	 </div>
  
  	@function setValueJson
  	@param {String} value
  	@return {void}
  */


  record.prototype.setValueJson = function() {
    var value, _var0;
    value = arguments[0];
    _var0 = value;
    if (!((!this.getValidate() || (_var0 === null || typeof _var0 === 'undefined')) || fm.serializer.isValidJson(value))) {
      throw new Error("value is not valid JSON.");
    }
    this.__valueJson = value;
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.record-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes the record to JSON.
  	 </div>
  	@function toJson
  	@return {String} The record in JSON-serialized format.
  */


  record.prototype.toJson = function() {
    return fm.websync.record.toJson(this);
  };

  /*<span id='method-fm.websync.record-toString'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Returns a string that represents this instance.
  	 </div>
  	@function toString
  	@return {String} 
  	 A string that represents this instance.
  */


  record.prototype.toString = function() {
    return this.toJson();
  };

  record.prototype.getValue = function() {
    return fm.json.deserialize(this.getValueJson.apply(this, arguments));
  };

  record.prototype.setValue = function() {
    var value;
    value = arguments[0];
    arguments[arguments.length - 1] = fm.json.serialize(arguments[arguments.length - 1]);
    return this.setValueJson.apply(this, arguments);
  };

  return record;

}).call(this, fm.dynamic);




fm.websync.serializer = (function(_super) {

  __extends(serializer, _super);

  function serializer() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      serializer.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    serializer.__super__.constructor.call(this);
  }

  serializer.createAdvice = function() {
    return new fm.websync.advice();
  };

  serializer.createBaseAdvice = function() {
    return new fm.websync.baseAdvice();
  };

  serializer.createBoundRecords = function() {
    return {};
  };

  serializer.createExtensions = function() {
    return new fm.websync.extensions();
  };

  serializer.createMessage = function() {
    return new fm.websync.message();
  };

  serializer.createNotification = function() {
    return new fm.websync.notification();
  };

  serializer.createNotifyingClient = function() {
    return new fm.websync.notifyingClient();
  };

  serializer.createPublication = function() {
    return new fm.websync.publication();
  };

  serializer.createPublishingClient = function() {
    return new fm.websync.publishingClient();
  };

  serializer.createRecord = function() {
    return new fm.websync.record("key");
  };

  serializer.createSubscribedClient = function() {
    return new fm.websync.subscribedClient();
  };

  serializer.createSubscription = function() {
    return new fm.websync.subscription("/");
  };

  serializer.deserializeAdvice = function() {
    var adviceJson;
    adviceJson = arguments[0];
    return fm.serializer.deserializeObjectFast(adviceJson, serializer.createAdvice, serializer.deserializeAdviceCallback);
  };

  serializer.deserializeAdviceCallback = function() {
    var advice, name, valueJson;
    advice = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    switch (name) {
      case "websocket":
        advice.setWebSocket(fm.websync.serializer.deserializeBaseAdvice(valueJson));
        return;
      case "long-polling":
        advice.setLongPolling(fm.websync.serializer.deserializeBaseAdvice(valueJson));
        return;
      case "callback-polling":
        advice.setCallbackPolling(fm.websync.serializer.deserializeBaseAdvice(valueJson));
        return;
    }
    return fm.websync.serializer.deserializeBaseAdviceCallback(advice, name, valueJson);
  };

  serializer.deserializeBaseAdvice = function() {
    var baseAdviceJson;
    baseAdviceJson = arguments[0];
    return fm.serializer.deserializeObjectFast(baseAdviceJson, serializer.createBaseAdvice, serializer.deserializeBaseAdviceCallback);
  };

  serializer.deserializeBaseAdviceCallback = function() {
    var advice, name, str, valueJson, _var0;
    advice = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      if (!(str === "hosts")) {
        if (str === "interval") {
          return advice.setInterval(fm.serializer.deserializeInteger(valueJson));
        } else {
          if (str === "reconnect") {
            return advice.setReconnect(fm.websync.serializer.deserializeReconnect(valueJson));
          }
        }
      } else {
        return advice.setHosts(fm.serializer.deserializeStringArray(valueJson));
      }
    }
  };

  serializer.deserializeBoundRecords = function() {
    var boundRecordsJson;
    boundRecordsJson = arguments[0];
    return fm.serializer.deserializeObject(boundRecordsJson, serializer.createBoundRecords, serializer.deserializeBoundRecordsCallback);
  };

  serializer.deserializeBoundRecordsCallback = function() {
    var boundRecords, name, valueJson;
    boundRecords = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    return boundRecords[name] = new fm.websync.record(name, fm.serializer.deserializeRaw(valueJson));
  };

  serializer.deserializeConnectionType = function() {
    var connectionTypeJson;
    connectionTypeJson = arguments[0];
    switch (fm.serializer.deserializeString(connectionTypeJson)) {
      case "long-polling":
        return fm.websync.connectionType.LongPolling;
      case "callback-polling":
        return fm.websync.connectionType.CallbackPolling;
      case "websocket":
        return fm.websync.connectionType.WebSocket;
      case "iframe":
        return fm.websync.connectionType.IFrame;
      case "flash":
        return fm.websync.connectionType.Flash;
    }
    return fm.websync.connectionType.Unknown;
  };

  serializer.deserializeConnectionTypeArray = function() {
    var connectionTypesJson, i, strArray, typeArray;
    connectionTypesJson = arguments[0];
    if (((fm.stringExtensions.isNullOrEmpty(connectionTypesJson) || (connectionTypesJson === "null")) || ((connectionTypesJson.length < 2) || (connectionTypesJson.charAt(0) !== '['))) || (connectionTypesJson.charAt(connectionTypesJson.length - 1) !== ']')) {
      return null;
    }
    connectionTypesJson = fm.stringExtensions.substring(connectionTypesJson, 1, connectionTypesJson.length - 2);
    strArray = fm.stringExtensions.split(connectionTypesJson, [',']);
    typeArray = new Array(strArray.length);
    i = 0;
    while (i < strArray.length) {
      try {
        typeArray[i] = fm.websync.serializer.deserializeConnectionType(strArray[i]);
      } finally {
        i++;
      }
    }
    return typeArray;
  };

  serializer.deserializeExtensions = function() {
    var extensionsJson;
    extensionsJson = arguments[0];
    return fm.serializer.deserializeObjectFast(extensionsJson, serializer.createExtensions, serializer.deserializeExtensionsCallback);
  };

  serializer.deserializeExtensionsCallback = function() {
    var extensions, name, valueJson;
    extensions = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    return extensions.setValueJson(name, fm.serializer.deserializeRaw(valueJson), false);
  };

  serializer.deserializeMessage = function() {
    var messageJson;
    messageJson = arguments[0];
    return fm.serializer.deserializeObjectFast(messageJson, serializer.createMessage, serializer.deserializeMessageCallback);
  };

  serializer.deserializeMessageArray = function() {
    var list, messagesJson, _var0;
    messagesJson = arguments[0];
    list = fm.serializer.deserializeObjectArrayFast(messagesJson, serializer.createMessage, serializer.deserializeMessageCallback);
    _var0 = list;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    return fm.arrayExtensions.toArray(list);
  };

  serializer.deserializeMessageCallback = function() {
    var message, name, nullable, str, valueJson;
    message = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    message.setValidate(false);
    switch (name) {
      case "advice":
        message.setAdvice(fm.websync.serializer.deserializeAdvice(valueJson));
        break;
      case "binding":
        message.setRecords(fm.websync.serializer.deserializeRecordArray(valueJson));
        break;
      case "channel":
        message.setBayeuxChannel(fm.serializer.deserializeString(valueJson));
        break;
      case "clientId":
        message.setClientId(fm.serializer.deserializeGuid(valueJson));
        break;
      case "connectionType":
        message.setConnectionType(fm.websync.serializer.deserializeConnectionType(valueJson));
        break;
      case "data":
        message.setDataJson(fm.serializer.deserializeRaw(valueJson));
        break;
      case "error":
        message.setError(fm.serializer.deserializeString(valueJson));
        break;
      case "ext":
        message.setExtensions(fm.websync.serializer.deserializeExtensions(valueJson));
        break;
      case "id":
        message.setId(fm.serializer.deserializeString(valueJson));
        break;
      case "minimumVersion":
        message.setMinimumVersion(fm.serializer.deserializeString(valueJson));
        break;
      case "subscription":
        if (!fm.stringExtensions.startsWith(valueJson, "[")) {
          str = fm.serializer.deserializeString(valueJson);
          if (!fm.stringExtensions.isNullOrEmpty(str)) {
            message.setChannels([str]);
          }
          break;
        }
        message.setChannels(fm.serializer.deserializeStringArray(valueJson));
        break;
      case "successful":
        nullable = fm.serializer.deserializeBoolean(valueJson);
        message.setSuccessful(nullable === true);
        break;
      case "supportedConnectionTypes":
        message.setSupportedConnectionTypes(fm.websync.serializer.deserializeConnectionTypeArray(valueJson));
        break;
      case "timestamp":
        message.setTimestamp(fm.websync.serializer.deserializeTimestamp(valueJson));
        break;
      case "version":
        message.setVersion(fm.serializer.deserializeString(valueJson));
        break;
    }
    return message.setValidate(true);
  };

  serializer.deserializeNotification = function() {
    var notificationJson;
    notificationJson = arguments[0];
    return fm.serializer.deserializeObjectFast(notificationJson, serializer.createNotification, serializer.deserializeNotificationCallback);
  };

  serializer.deserializeNotificationArray = function() {
    var list, notificationsJson, _var0;
    notificationsJson = arguments[0];
    list = fm.serializer.deserializeObjectArrayFast(notificationsJson, serializer.createNotification, serializer.deserializeNotificationCallback);
    _var0 = list;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    return fm.arrayExtensions.toArray(list);
  };

  serializer.deserializeNotificationCallback = function() {
    var name, notification, nullable, str, valueJson, _var0;
    notification = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    notification.setValidate(false);
    str = name;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      if (!(str === "data")) {
        if (str === "ext") {
          notification.setExtensions(fm.websync.serializer.deserializeExtensions(valueJson));
        } else {
          if (str === "successful") {
            nullable = fm.serializer.deserializeBoolean(valueJson);
            notification.setSuccessful(nullable === true);
          } else {
            if (str === "error") {
              notification.setError(fm.serializer.deserializeString(valueJson));
            } else {
              if (str === "timestamp") {
                notification.setTimestamp(fm.websync.serializer.deserializeTimestamp(valueJson));
              }
            }
          }
        }
      } else {
        notification.setDataJson(fm.serializer.deserializeRaw(valueJson));
      }
    }
    return notification.setValidate(true);
  };

  serializer.deserializeNotifyingClient = function() {
    var notifyingClientJson;
    notifyingClientJson = arguments[0];
    return fm.serializer.deserializeObjectFast(notifyingClientJson, serializer.createNotifyingClient, serializer.deserializeNotifyingClientCallback);
  };

  serializer.deserializeNotifyingClientCallback = function() {
    var name, notifyingClient, str, valueJson, _var0;
    notifyingClient = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      if (!(str === "clientId")) {
        if (str === "boundRecords") {
          return notifyingClient.setBoundRecords(fm.websync.serializer.deserializeBoundRecords(valueJson));
        }
      } else {
        return notifyingClient.setClientId(fm.serializer.deserializeGuid(valueJson));
      }
    }
  };

  serializer.deserializePublication = function() {
    var publicationJson;
    publicationJson = arguments[0];
    return fm.serializer.deserializeObjectFast(publicationJson, serializer.createPublication, serializer.deserializePublicationCallback);
  };

  serializer.deserializePublicationArray = function() {
    var list, publicationsJson, _var0;
    publicationsJson = arguments[0];
    list = fm.serializer.deserializeObjectArrayFast(publicationsJson, serializer.createPublication, serializer.deserializePublicationCallback);
    _var0 = list;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    return fm.arrayExtensions.toArray(list);
  };

  serializer.deserializePublicationCallback = function() {
    var name, nullable, publication, str, valueJson, _var0;
    publication = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    publication.setValidate(false);
    str = name;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      if (!(str === "channel")) {
        if (str === "data") {
          publication.setDataJson(fm.serializer.deserializeRaw(valueJson));
        } else {
          if (str === "ext") {
            publication.setExtensions(fm.websync.serializer.deserializeExtensions(valueJson));
          } else {
            if (str === "successful") {
              nullable = fm.serializer.deserializeBoolean(valueJson);
              publication.setSuccessful(nullable === true);
            } else {
              if (str === "error") {
                publication.setError(fm.serializer.deserializeString(valueJson));
              } else {
                if (str === "timestamp") {
                  publication.setTimestamp(fm.websync.serializer.deserializeTimestamp(valueJson));
                }
              }
            }
          }
        }
      } else {
        publication.setChannel(fm.serializer.deserializeString(valueJson));
      }
    }
    return publication.setValidate(true);
  };

  serializer.deserializePublishingClient = function() {
    var publishingClientJson;
    publishingClientJson = arguments[0];
    return fm.serializer.deserializeObjectFast(publishingClientJson, serializer.createPublishingClient, serializer.deserializePublishingClientCallback);
  };

  serializer.deserializePublishingClientCallback = function() {
    var name, publishingClient, str, valueJson, _var0;
    publishingClient = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      if (!(str === "clientId")) {
        if (str === "boundRecords") {
          return publishingClient.setBoundRecords(fm.websync.serializer.deserializeBoundRecords(valueJson));
        }
      } else {
        return publishingClient.setClientId(fm.serializer.deserializeGuid(valueJson));
      }
    }
  };

  serializer.deserializeReconnect = function() {
    var reconnectJson;
    reconnectJson = arguments[0];
    switch (fm.serializer.deserializeString(reconnectJson)) {
      case "retry":
        return fm.websync.reconnect.Retry;
      case "handshake":
        return fm.websync.reconnect.Handshake;
      case "none":
        return fm.websync.reconnect.None;
    }
    throw new Error("Unknown reconnect advice.");
  };

  serializer.deserializeRecord = function() {
    var recordJson;
    recordJson = arguments[0];
    return fm.serializer.deserializeObjectFast(recordJson, serializer.createRecord, serializer.deserializeRecordCallback);
  };

  serializer.deserializeRecordArray = function() {
    var list, recordsJson, _var0;
    recordsJson = arguments[0];
    list = fm.serializer.deserializeObjectArrayFast(recordsJson, serializer.createRecord, serializer.deserializeRecordCallback);
    _var0 = list;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    return fm.arrayExtensions.toArray(list);
  };

  serializer.deserializeRecordCallback = function() {
    var name, nullable, record, str, valueJson, _var0;
    record = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    record.setValidate(false);
    str = name;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      if (!(str === "key")) {
        if (str === "private") {
          nullable = fm.serializer.deserializeBoolean(valueJson);
          record.setPrivate(nullable === true);
        } else {
          if (str === "value") {
            record.setValueJson(fm.serializer.deserializeRaw(valueJson));
          }
        }
      } else {
        record.setKey(fm.serializer.deserializeString(valueJson));
      }
    }
    return record.setValidate(true);
  };

  serializer.deserializeSubscribedClient = function() {
    var subscribedClientJson;
    subscribedClientJson = arguments[0];
    return fm.serializer.deserializeObjectFast(subscribedClientJson, serializer.createSubscribedClient, serializer.deserializeSubscribedClientCallback);
  };

  serializer.deserializeSubscribedClientArray = function() {
    var list, subscribedClientsJson, _var0;
    subscribedClientsJson = arguments[0];
    list = fm.serializer.deserializeObjectArrayFast(subscribedClientsJson, serializer.createSubscribedClient, serializer.deserializeSubscribedClientCallback);
    _var0 = list;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    return fm.arrayExtensions.toArray(list);
  };

  serializer.deserializeSubscribedClientCallback = function() {
    var name, str, subscribedClient, valueJson, _var0;
    subscribedClient = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      if (!(str === "clientId")) {
        if (str === "boundRecords") {
          return subscribedClient.setBoundRecords(fm.websync.serializer.deserializeBoundRecords(valueJson));
        }
      } else {
        return subscribedClient.setClientId(fm.serializer.deserializeGuid(valueJson));
      }
    }
  };

  serializer.deserializeSubscription = function() {
    var subscriptionJson;
    subscriptionJson = arguments[0];
    return fm.serializer.deserializeObjectFast(subscriptionJson, serializer.createSubscription, serializer.deserializeSubscriptionCallback);
  };

  serializer.deserializeSubscriptionArray = function() {
    var list, subscriptionsJson, _var0;
    subscriptionsJson = arguments[0];
    list = fm.serializer.deserializeObjectArrayFast(subscriptionsJson, serializer.createSubscription, serializer.deserializeSubscriptionCallback);
    _var0 = list;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    return fm.arrayExtensions.toArray(list);
  };

  serializer.deserializeSubscriptionCallback = function() {
    var name, str, subscription, valueJson, _var0;
    subscription = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    _var0 = str;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      if (!(str === "channel")) {
        if (str === "tag") {
          return subscription.setTag(fm.serializer.deserializeString(valueJson));
        }
      } else {
        return subscription.setChannel(fm.serializer.deserializeString(valueJson));
      }
    }
  };

  serializer.deserializeTimestamp = function() {
    var intResult, num2, num3, num4, num5, num6, s, str, str10, str2, str3, str5, str6, str7, str8, strArray, timestampJson, utcNow, _var0, _var1, _var10, _var11, _var2, _var3, _var4, _var5, _var6, _var7, _var8, _var9;
    timestampJson = arguments[0];
    str = fm.serializer.deserializeString(timestampJson);
    utcNow = fm.dateTime.getUtcNow();
    if (!fm.stringExtensions.isNullOrEmpty(str)) {
      strArray = fm.stringExtensions.split(str, ['T']);
      if (strArray.length !== 2) {
        return utcNow;
      }
      str2 = strArray[0];
      str3 = strArray[1];
      strArray = fm.stringExtensions.split(str2, ['-']);
      if (strArray.length !== 3) {
        return utcNow;
      }
      s = strArray[0];
      str5 = strArray[1];
      str6 = strArray[2];
      strArray = fm.stringExtensions.split(str3, [':']);
      if (strArray.length !== 3) {
        return utcNow;
      }
      str7 = strArray[0];
      str8 = strArray[1];
      strArray = fm.stringExtensions.split(strArray[2], ['.']);
      if (strArray.length !== 2) {
        return utcNow;
      }
      str10 = strArray[0];
      intResult = 0;
      num2 = 0;
      num3 = 0;
      num4 = 0;
      num5 = 0;
      num6 = 0;
      _var0 = new fm.holder(intResult);
      _var1 = fm.parseAssistant.tryParseIntegerValue(s, _var0);
      intResult = _var0.getValue();
      _var2 = new fm.holder(num2);
      _var3 = fm.parseAssistant.tryParseIntegerValue(str5, _var2);
      num2 = _var2.getValue();
      _var4 = new fm.holder(num3);
      _var5 = fm.parseAssistant.tryParseIntegerValue(str6, _var4);
      num3 = _var4.getValue();
      _var6 = new fm.holder(num4);
      _var7 = fm.parseAssistant.tryParseIntegerValue(str7, _var6);
      num4 = _var6.getValue();
      _var8 = new fm.holder(num5);
      _var9 = fm.parseAssistant.tryParseIntegerValue(str8, _var8);
      num5 = _var8.getValue();
      _var10 = new fm.holder(num6);
      _var11 = fm.parseAssistant.tryParseIntegerValue(str10, _var10);
      num6 = _var10.getValue();
      if ((((_var1 && _var3) && (_var5 && _var7)) && _var9) && _var11) {
        utcNow = new fm.dateTime(intResult, num2, num3, num4, num5, num6);
      }
    }
    return utcNow;
  };

  serializer.serializeAdvice = function() {
    var advice;
    advice = arguments[0];
    return fm.serializer.serializeObjectFast(advice, serializer.serializeAdviceCallback);
  };

  serializer.serializeAdviceCallback = function() {
    var advice, jsonObject, _var0, _var1, _var2;
    advice = arguments[0];
    jsonObject = arguments[1];
    fm.websync.serializer.serializeBaseAdviceCallback(advice, jsonObject);
    _var0 = advice.getWebSocket();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      jsonObject["websocket"] = fm.websync.serializer.serializeBaseAdvice(advice.getWebSocket());
    }
    _var1 = advice.getLongPolling();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      jsonObject["long-polling"] = fm.websync.serializer.serializeBaseAdvice(advice.getLongPolling());
    }
    _var2 = advice.getCallbackPolling();
    if (_var2 !== null && typeof _var2 !== 'undefined') {
      return jsonObject["callback-polling"] = fm.websync.serializer.serializeBaseAdvice(advice.getCallbackPolling());
    }
  };

  serializer.serializeBaseAdvice = function() {
    var baseAdvice;
    baseAdvice = arguments[0];
    return fm.serializer.serializeObjectFast(baseAdvice, serializer.serializeBaseAdviceCallback);
  };

  serializer.serializeBaseAdviceCallback = function() {
    var baseAdvice, jsonObject, _var0;
    baseAdvice = arguments[0];
    jsonObject = arguments[1];
    _var0 = baseAdvice.getHosts();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      jsonObject["hosts"] = fm.serializer.serializeStringArray(baseAdvice.getHosts());
    }
    if (baseAdvice.getInterval() !== null) {
      jsonObject["interval"] = fm.serializer.serializeInteger(baseAdvice.getInterval());
    }
    if (baseAdvice.getReconnect() !== null) {
      return jsonObject["reconnect"] = fm.websync.serializer.serializeReconnect(baseAdvice.getReconnect());
    }
  };

  serializer.serializeBoundRecords = function() {
    var boundRecords;
    boundRecords = arguments[0];
    return fm.serializer.serializeObject(boundRecords, serializer.serializeBoundRecordsCallback);
  };

  serializer.serializeBoundRecordsCallback = function() {
    var boundRecords, jsonObject, str, _i, _len, _results, _var0;
    boundRecords = arguments[0];
    jsonObject = arguments[1];
    _var0 = fm.hashExtensions.getKeys(boundRecords);
    _results = [];
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      str = _var0[_i];
      _results.push(jsonObject[str] = fm.serializer.serializeRaw(boundRecords[str].getValueJson()));
    }
    return _results;
  };

  serializer.serializeConnectionType = function() {
    var connectionType, str;
    connectionType = arguments[0];
    str = null;
    switch (connectionType) {
      case fm.websync.connectionType.WebSocket:
        str = "websocket";
        break;
      case fm.websync.connectionType.LongPolling:
        str = "long-polling";
        break;
      case fm.websync.connectionType.CallbackPolling:
        str = "callback-polling";
        break;
      case fm.websync.connectionType.IFrame:
        str = "iframe";
        break;
      case fm.websync.connectionType.Flash:
        str = "flash";
        break;
    }
    return fm.serializer.serializeString(str);
  };

  serializer.serializeConnectionTypeArray = function() {
    var connectionTypes, i, strArray;
    connectionTypes = arguments[0];
    strArray = new Array(connectionTypes.length);
    i = 0;
    while (i < connectionTypes.length) {
      try {
        strArray[i] = fm.websync.serializer.serializeConnectionType(connectionTypes[i]);
      } finally {
        i++;
      }
    }
    return fm.stringExtensions.concat("[", fm.stringExtensions.join(",", strArray), "]");
  };

  serializer.serializeExtensions = function() {
    var extensions;
    extensions = arguments[0];
    return fm.serializer.serializeObjectFast(extensions, serializer.serializeExtensionsCallback);
  };

  serializer.serializeExtensionsCallback = function() {
    var extensions, jsonObject, str, _i, _len, _results, _var0;
    extensions = arguments[0];
    jsonObject = arguments[1];
    _var0 = extensions.getNames();
    _results = [];
    for (_i = 0, _len = _var0.length; _i < _len; _i++) {
      str = _var0[_i];
      _results.push(jsonObject[str] = fm.serializer.serializeRaw(extensions.getValueJson(str)));
    }
    return _results;
  };

  serializer.serializeMessage = function() {
    var message;
    message = arguments[0];
    return fm.serializer.serializeObjectFast(message, serializer.serializeMessageCallback);
  };

  serializer.serializeMessageArray = function() {
    var messages;
    messages = arguments[0];
    return fm.serializer.serializeObjectArrayFast(messages, serializer.serializeMessageCallback);
  };

  serializer.serializeMessageCallback = function() {
    var jsonObject, message, _var0, _var1, _var2, _var3, _var4, _var5, _var6, _var7, _var8, _var9;
    message = arguments[0];
    jsonObject = arguments[1];
    if (message.getClientId() !== null) {
      jsonObject["clientId"] = fm.serializer.serializeGuid(message.getClientId());
    }
    if (message.getTimestamp() !== null) {
      jsonObject["timestamp"] = fm.websync.serializer.serializeTimestamp(message.getTimestamp());
    }
    _var0 = message.getAdvice();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      jsonObject["advice"] = fm.websync.serializer.serializeAdvice(message.getAdvice());
    }
    _var1 = message.getRecords();
    if ((_var1 !== null && typeof _var1 !== 'undefined') && ((message.getType() === fm.websync.messageType.Bind) || (message.getType() === fm.websync.messageType.Unbind))) {
      jsonObject["binding"] = fm.websync.serializer.serializeRecordArray(message.getRecords());
    }
    _var2 = message.getBayeuxChannel();
    if (_var2 !== null && typeof _var2 !== 'undefined') {
      jsonObject["channel"] = fm.serializer.serializeString(message.getBayeuxChannel());
    }
    if (message.getConnectionType() !== null) {
      jsonObject["connectionType"] = fm.websync.serializer.serializeConnectionType(message.getConnectionType());
    }
    _var3 = message.getDataJson();
    if (_var3 !== null && typeof _var3 !== 'undefined') {
      jsonObject["data"] = fm.serializer.serializeRaw(message.getDataJson());
    }
    _var4 = message.getError();
    if (_var4 !== null && typeof _var4 !== 'undefined') {
      jsonObject["error"] = fm.serializer.serializeString(message.getError());
    }
    if (message.getExtensions().getCount() > 0) {
      jsonObject["ext"] = fm.websync.serializer.serializeExtensions(message.getExtensions());
    }
    _var5 = message.getId();
    if (_var5 !== null && typeof _var5 !== 'undefined') {
      jsonObject["id"] = fm.serializer.serializeString(message.getId());
    }
    _var6 = message.getMinimumVersion();
    if (_var6 !== null && typeof _var6 !== 'undefined') {
      jsonObject["minimumVersion"] = fm.serializer.serializeString(message.getMinimumVersion());
    }
    _var7 = message.getChannels();
    if ((_var7 !== null && typeof _var7 !== 'undefined') && ((message.getType() === fm.websync.messageType.Subscribe) || (message.getType() === fm.websync.messageType.Unsubscribe))) {
      jsonObject["subscription"] = fm.serializer.serializeStringArray(message.getChannels());
    }
    if (message.getSuccessful()) {
      jsonObject["successful"] = fm.serializer.serializeBoolean(message.getSuccessful());
    }
    _var8 = message.getSupportedConnectionTypes();
    if (_var8 !== null && typeof _var8 !== 'undefined') {
      jsonObject["supportedConnectionTypes"] = fm.websync.serializer.serializeConnectionTypeArray(message.getSupportedConnectionTypes());
    }
    _var9 = message.getVersion();
    if (_var9 !== null && typeof _var9 !== 'undefined') {
      return jsonObject["version"] = fm.serializer.serializeString(message.getVersion());
    }
  };

  serializer.serializeNotification = function() {
    var notification;
    notification = arguments[0];
    return fm.serializer.serializeObjectFast(notification, serializer.serializeNotificationCallback);
  };

  serializer.serializeNotificationArray = function() {
    var notifications;
    notifications = arguments[0];
    return fm.serializer.serializeObjectArrayFast(notifications, serializer.serializeNotificationCallback);
  };

  serializer.serializeNotificationCallback = function() {
    var jsonObject, notification, _var0, _var1;
    notification = arguments[0];
    jsonObject = arguments[1];
    _var0 = notification.getError();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      jsonObject["error"] = fm.serializer.serializeString(notification.getError());
    }
    if (notification.getSuccessful()) {
      jsonObject["successful"] = fm.serializer.serializeBoolean(notification.getSuccessful());
    }
    if (notification.getTimestamp() !== null) {
      jsonObject["timestamp"] = fm.websync.serializer.serializeTimestamp(notification.getTimestamp());
    }
    if (notification.getExtensions().getCount() > 0) {
      jsonObject["ext"] = fm.websync.serializer.serializeExtensions(notification.getExtensions());
    }
    _var1 = notification.getDataJson();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return jsonObject["data"] = fm.serializer.serializeRaw(notification.getDataJson());
    }
  };

  serializer.serializeNotifyingClient = function() {
    var notifyingClient;
    notifyingClient = arguments[0];
    return fm.serializer.serializeObjectFast(notifyingClient, serializer.serializeNotifyingClientCallback);
  };

  serializer.serializeNotifyingClientCallback = function() {
    var jsonObject, notifyingClient, _var0;
    notifyingClient = arguments[0];
    jsonObject = arguments[1];
    if (notifyingClient.getClientId() !== null) {
      jsonObject["clientId"] = fm.serializer.serializeGuid(notifyingClient.getClientId());
    }
    _var0 = notifyingClient.getBoundRecords();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return jsonObject["boundRecords"] = fm.websync.serializer.serializeBoundRecords(notifyingClient.getBoundRecords());
    }
  };

  serializer.serializePublication = function() {
    var publication;
    publication = arguments[0];
    return fm.serializer.serializeObjectFast(publication, serializer.serializePublicationCallback);
  };

  serializer.serializePublicationArray = function() {
    var publications;
    publications = arguments[0];
    return fm.serializer.serializeObjectArrayFast(publications, serializer.serializePublicationCallback);
  };

  serializer.serializePublicationCallback = function() {
    var jsonObject, publication, _var0, _var1, _var2;
    publication = arguments[0];
    jsonObject = arguments[1];
    _var0 = publication.getChannel();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      jsonObject["channel"] = fm.serializer.serializeString(publication.getChannel());
    }
    _var1 = publication.getError();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      jsonObject["error"] = fm.serializer.serializeString(publication.getError());
    }
    if (publication.getSuccessful()) {
      jsonObject["successful"] = fm.serializer.serializeBoolean(publication.getSuccessful());
    }
    if (publication.getTimestamp() !== null) {
      jsonObject["timestamp"] = fm.websync.serializer.serializeTimestamp(publication.getTimestamp());
    }
    if (publication.getExtensions().getCount() > 0) {
      jsonObject["ext"] = fm.websync.serializer.serializeExtensions(publication.getExtensions());
    }
    _var2 = publication.getDataJson();
    if (_var2 !== null && typeof _var2 !== 'undefined') {
      return jsonObject["data"] = fm.serializer.serializeRaw(publication.getDataJson());
    }
  };

  serializer.serializePublishingClient = function() {
    var publishingClient;
    publishingClient = arguments[0];
    return fm.serializer.serializeObjectFast(publishingClient, serializer.serializePublishingClientCallback);
  };

  serializer.serializePublishingClientCallback = function() {
    var jsonObject, publishingClient, _var0;
    publishingClient = arguments[0];
    jsonObject = arguments[1];
    if (publishingClient.getClientId() !== null) {
      jsonObject["clientId"] = fm.serializer.serializeGuid(publishingClient.getClientId());
    }
    _var0 = publishingClient.getBoundRecords();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return jsonObject["boundRecords"] = fm.websync.serializer.serializeBoundRecords(publishingClient.getBoundRecords());
    }
  };

  serializer.serializeReconnect = function() {
    var reconnect, str;
    reconnect = arguments[0];
    str = null;
    switch (reconnect) {
      case fm.websync.reconnect.Retry:
        str = "retry";
        break;
      case fm.websync.reconnect.Handshake:
        str = "handshake";
        break;
      case fm.websync.reconnect.None:
        str = "none";
        break;
    }
    return fm.serializer.serializeString(str);
  };

  serializer.serializeRecord = function() {
    var record;
    record = arguments[0];
    return fm.serializer.serializeObjectFast(record, serializer.serializeRecordCallback);
  };

  serializer.serializeRecordArray = function() {
    var records;
    records = arguments[0];
    return fm.serializer.serializeObjectArrayFast(records, serializer.serializeRecordCallback);
  };

  serializer.serializeRecordCallback = function() {
    var jsonObject, record, _var0, _var1;
    record = arguments[0];
    jsonObject = arguments[1];
    _var0 = record.getKey();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      jsonObject["key"] = fm.serializer.serializeString(record.getKey());
    }
    if (record.getPrivate()) {
      jsonObject["private"] = fm.serializer.serializeBoolean(record.getPrivate());
    }
    _var1 = record.getValueJson();
    if (_var1 !== null && typeof _var1 !== 'undefined') {
      return jsonObject["value"] = fm.serializer.serializeRaw(record.getValueJson());
    }
  };

  serializer.serializeSubscribedClient = function() {
    var subscribedClient;
    subscribedClient = arguments[0];
    return fm.serializer.serializeObjectFast(subscribedClient, serializer.serializeSubscribedClientCallback);
  };

  serializer.serializeSubscribedClientArray = function() {
    var subscribedClients;
    subscribedClients = arguments[0];
    return fm.serializer.serializeObjectArrayFast(subscribedClients, serializer.serializeSubscribedClientCallback);
  };

  serializer.serializeSubscribedClientCallback = function() {
    var jsonObject, subscribedClient, _var0;
    subscribedClient = arguments[0];
    jsonObject = arguments[1];
    jsonObject["clientId"] = fm.serializer.serializeGuid(subscribedClient.getClientId());
    _var0 = subscribedClient.getBoundRecords();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return jsonObject["boundRecords"] = fm.websync.serializer.serializeBoundRecords(subscribedClient.getBoundRecords());
    }
  };

  serializer.serializeSubscription = function() {
    var subscription;
    subscription = arguments[0];
    return fm.serializer.serializeObjectFast(subscription, serializer.serializeSubscriptionCallback);
  };

  serializer.serializeSubscriptionArray = function() {
    var subscriptions;
    subscriptions = arguments[0];
    return fm.serializer.serializeObjectArrayFast(subscriptions, serializer.serializeSubscriptionCallback);
  };

  serializer.serializeSubscriptionCallback = function() {
    var jsonObject, subscription, _var0;
    subscription = arguments[0];
    jsonObject = arguments[1];
    jsonObject["channel"] = fm.serializer.serializeString(subscription.getChannel());
    _var0 = subscription.getTag();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return jsonObject["tag"] = fm.serializer.serializeString(subscription.getTag());
    }
  };

  serializer.serializeTimestamp = function() {
    var str, str2, str3, str4, str5, str6, str7, timestamp;
    timestamp = arguments[0];
    str = null;
    if (timestamp !== null) {
      str2 = fm.intExtensions.toString(timestamp.getYear());
      str3 = fm.intExtensions.toString(timestamp.getMonth());
      str4 = fm.intExtensions.toString(timestamp.getDay());
      str5 = fm.intExtensions.toString(timestamp.getHour());
      str6 = fm.intExtensions.toString(timestamp.getMinute());
      str7 = fm.intExtensions.toString(timestamp.getSecond());
      while (str2.length < 4) {
        str2 = fm.stringExtensions.concat("0", str2);
      }
      while (str3.length < 2) {
        str3 = fm.stringExtensions.concat("0", str3);
      }
      while (str4.length < 2) {
        str4 = fm.stringExtensions.concat("0", str4);
      }
      while (str5.length < 2) {
        str5 = fm.stringExtensions.concat("0", str5);
      }
      while (str6.length < 2) {
        str6 = fm.stringExtensions.concat("0", str6);
      }
      while (str7.length < 2) {
        str7 = fm.stringExtensions.concat("0", str7);
      }
      str = fm.stringExtensions.format("{0}-{1}-{2}T{3}:{4}:{5}.00", [str2, str3, str4, str5, str6, str7]);
    }
    return fm.serializer.serializeString(str);
  };

  return serializer;

}).call(this, fm.object);




fm.websync.splitter = (function(_super) {

  __extends(splitter, _super);

  function splitter() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      splitter.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    splitter.__super__.constructor.call(this);
  }

  splitter.split = function() {
    var ch, ch2, delimiter, i, list, num2, startIndex, str, _var0, _var1;
    str = arguments[0];
    delimiter = arguments[1];
    _var0 = str;
    if (_var0 === null || typeof _var0 === 'undefined') {
      throw new Error("str cannot be null.");
    }
    _var1 = delimiter;
    if (_var1 === null || typeof _var1 === 'undefined') {
      throw new Error("delimiter cannot be null.");
    }
    if (delimiter.length === 0) {
      return [str];
    }
    startIndex = 0;
    num2 = 0;
    list = [];
    i = 0;
    while (i < str.length) {
      try {
        ch = str.charAt(i);
        ch2 = delimiter.charAt(num2);
        if (ch === ch2) {
          if (num2 === (delimiter.length - 1)) {
            fm.arrayExtensions.add(list, fm.stringExtensions.substring(str, startIndex, (i - num2) - startIndex));
            startIndex = i + 1;
            num2 = 0;
          } else {
            num2++;
          }
        } else {
          num2 = 0;
        }
      } finally {
        i++;
      }
    }
    fm.arrayExtensions.add(list, str.substring(startIndex));
    return fm.arrayExtensions.toArray(list);
  };

  return splitter;

}).call(this, fm.object);


/*<span id='cls-fm.websync.subscription'>&nbsp;</span>
*/

/**
@class fm.websync.subscription
 <div>
 A channel/tag identifier for a client subscription.
 </div>

@extends fm.dynamic
*/


fm.websync.subscription = (function(_super) {

  __extends(subscription, _super);

  subscription.prototype.__channel = null;

  subscription.prototype.__tag = null;

  /*<span id='method-fm.websync.subscription-fm.websync.subscription'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.subscription">fm.websync.subscription</see> class.
  	 </div>
  	@function fm.websync.subscription
  	@param {String} channel The subscription channel.
  	@param {String} tag The identifier for the subscription.
  	@return {}
  */


  function subscription() {
    this.toJson = __bind(this.toJson, this);

    this.setTag = __bind(this.setTag, this);

    this.setChannel = __bind(this.setChannel, this);

    this.getTag = __bind(this.getTag, this);

    this.getHashCode = __bind(this.getHashCode, this);

    this.getChannel = __bind(this.getChannel, this);

    this.equals = __bind(this.equals, this);

    this.duplicate = __bind(this.duplicate, this);

    var channel, tag;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      subscription.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 2) {
      channel = arguments[0];
      tag = arguments[1];
      subscription.__super__.constructor.call(this);
      this.setChannel(channel);
      this.setTag(tag);
      return;
    }
    if (arguments.length === 1) {
      channel = arguments[0];
      subscription.__super__.constructor.call(this);
      this.setChannel(channel);
      return;
    }
  }

  /*<span id='method-fm.websync.subscription-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a subscription from JSON.
  	 </div>
  	@function fromJson
  	@param {String} subscriptionJson A JSON string to deserialize.
  	@return {fm.websync.subscription} A deserialized subscription.
  */


  subscription.fromJson = function() {
    var subscriptionJson;
    subscriptionJson = arguments[0];
    return fm.websync.serializer.deserializeSubscription(subscriptionJson);
  };

  /*<span id='method-fm.websync.subscription-fromJsonMultiple'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a list of subscriptions from JSON.
  	 </div>
  	@function fromJsonMultiple
  	@param {String} subscriptionsJson A JSON string to deserialize.
  	@return {fm.array} A deserialized list of subscriptions.
  */


  subscription.fromJsonMultiple = function() {
    var subscriptionsJson;
    subscriptionsJson = arguments[0];
    return fm.websync.serializer.deserializeSubscriptionArray(subscriptionsJson);
  };

  /*<span id='method-fm.websync.subscription-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a subscription to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.subscription} subscription A subscription to serialize.
  	@return {String} A JSON-serialized subscription.
  */


  subscription.toJson = function() {
    var subscription;
    subscription = arguments[0];
    return fm.websync.serializer.serializeSubscription(subscription);
  };

  /*<span id='method-fm.websync.subscription-toJsonMultiple'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a list of subscriptions to JSON.
  	 </div>
  	@function toJsonMultiple
  	@param {fm.array} subscriptions A list of subscriptions to serialize.
  	@return {String} A JSON-serialized array of subscriptions.
  */


  subscription.toJsonMultiple = function() {
    var subscriptions;
    subscriptions = arguments[0];
    return fm.websync.serializer.serializeSubscriptionArray(subscriptions);
  };

  /*<span id='method-fm.websync.subscription-duplicate'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Creates a deep clone of this subscription.
  	 </div>
  	@function duplicate
  	@return {fm.websync.subscription} A deep clone of this subscription.
  */


  subscription.prototype.duplicate = function() {
    return new fm.websync.subscription(this.getChannel(), this.getTag());
  };

  /*<span id='method-fm.websync.subscription-equals'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Determines whether the specified <see cref="fm.websync.subscription">fm.websync.subscription</see> is equal to this instance.
  	 </div>
  	@function equals
  	@param {fm.object} obj The fm.websync.subscription to compare with this instance.
  	@return {Boolean} true if the specified fm.websync.subscription is equal to this instance; otherwise, false.
  */


  subscription.prototype.equals = function() {
    var obj, subscription;
    obj = arguments[0];
    subscription = fm.global.tryCast(obj, fm.websync.subscription);
    return subscription === this;
  };

  /*<span id='method-fm.websync.subscription-getChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the subscription channel.
  	 </div>
  
  	@function getChannel
  	@return {String}
  */


  subscription.prototype.getChannel = function() {
    return this.__channel;
  };

  /*<span id='method-fm.websync.subscription-getHashCode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Returns a hash code for this instance.
  	 </div>
  	@function getHashCode
  	@return {Integer} 
  	 A hash code for this instance, suitable for use in hashing algorithms and data structures like a hash table.
  */


  subscription.prototype.getHashCode = function() {
    var num, _var0;
    num = 17;
    num = (num * 23) + this.getChannel().hashCode();
    _var0 = this.getTag();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      num = (num * 23) + this.getTag().hashCode();
    }
    return num;
  };

  /*<span id='method-fm.websync.subscription-getTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the identifier for the subscription.
  	 </div>
  
  	@function getTag
  	@return {String}
  */


  subscription.prototype.getTag = function() {
    var _ref;
    return (_ref = this.__tag) != null ? _ref : fm.stringExtensions.empty;
  };

  /*<span id='method-fm.websync.subscription-setChannel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the subscription channel.
  	 </div>
  
  	@function setChannel
  	@param {String} value
  	@return {void}
  */


  subscription.prototype.setChannel = function() {
    var value, _var0;
    value = arguments[0];
    _var0 = value;
    if (_var0 === null || typeof _var0 === 'undefined') {
      throw new Error("channel cannot be null.");
    }
    this.__channel = value;
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.subscription-setTag'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the identifier for the subscription.
  	 </div>
  
  	@function setTag
  	@param {String} value
  	@return {void}
  */


  subscription.prototype.setTag = function() {
    var value;
    value = arguments[0];
    this.__tag = value != null ? value : fm.stringExtensions.empty;
    return this.setIsDirty(true);
  };

  /*<span id='method-fm.websync.subscription-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes the record to JSON.
  	 </div>
  	@function toJson
  	@return {String} The record in JSON-serialized format.
  */


  subscription.prototype.toJson = function() {
    return fm.websync.subscription.toJson(this);
  };

  return subscription;

}).call(this, fm.dynamic);


/*<span id='cls-fm.websync.subscribedClient'>&nbsp;</span>
*/

/**
@class fm.websync.subscribedClient
 <div>
 Details about the subscribed client.
 </div>

@extends fm.serializable
*/


fm.websync.subscribedClient = (function(_super) {

  __extends(subscribedClient, _super);

  subscribedClient.prototype._boundRecords = null;

  subscribedClient.prototype._clientId = null;

  /*<span id='method-fm.websync.subscribedClient-fm.websync.subscribedClient'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.subscribedClient">fm.websync.subscribedClient</see> class.
  	 </div>
  	@function fm.websync.subscribedClient
  	@param {fm.guid} clientId The subscribed client's ID.
  	@param {Object} boundRecords The records bound to the client.
  	@return {}
  */


  function subscribedClient() {
    this.getBoundRecordValue = __bind(this.getBoundRecordValue, this);

    this.toJson = __bind(this.toJson, this);

    this.setClientId = __bind(this.setClientId, this);

    this.setBoundRecords = __bind(this.setBoundRecords, this);

    this.getClientId = __bind(this.getClientId, this);

    this.getBoundRecordValueJson = __bind(this.getBoundRecordValueJson, this);

    this.getBoundRecords = __bind(this.getBoundRecords, this);

    var boundRecords, clientId;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      subscribedClient.__super__.constructor.call(this);
      this.setBoundRecords({});
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 2) {
      clientId = arguments[0];
      boundRecords = arguments[1];
      subscribedClient.__super__.constructor.call(this);
      this.setClientId(clientId);
      this.setBoundRecords(boundRecords);
      return;
    }
    if (arguments.length === 0) {
      subscribedClient.__super__.constructor.call(this);
      this.setBoundRecords({});
      return;
    }
  }

  /*<span id='method-fm.websync.subscribedClient-fromJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a JSON-formatted subscribed client.
  	 </div>
  	@function fromJson
  	@param {String} subscribedClientJson The JSON-formatted subscribed client to deserialize.
  	@return {fm.websync.subscribedClient} The subscribed client.
  */


  subscribedClient.fromJson = function() {
    var subscribedClientJson;
    subscribedClientJson = arguments[0];
    return fm.websync.serializer.deserializeSubscribedClient(subscribedClientJson);
  };

  /*<span id='method-fm.websync.subscribedClient-fromJsonMultiple'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a JSON-formatted array of subscribed clients.
  	 </div>
  	@function fromJsonMultiple
  	@param {String} subscribedClientsJson The JSON-formatted array of subscribed clients to deserialize.
  	@return {fm.array} The array of subscribed clients.
  */


  subscribedClient.fromJsonMultiple = function() {
    var subscribedClientsJson;
    subscribedClientsJson = arguments[0];
    return fm.websync.serializer.deserializeSubscribedClientArray(subscribedClientsJson);
  };

  /*<span id='method-fm.websync.subscribedClient-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a subscribed client to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.subscribedClient} subscribedClient The subscribed client to serialize.
  	@return {String} The JSON-formatted subscribed client.
  */


  subscribedClient.toJson = function() {
    var subscribedClient;
    subscribedClient = arguments[0];
    return fm.websync.serializer.serializeSubscribedClient(subscribedClient);
  };

  /*<span id='method-fm.websync.subscribedClient-toJsonMultiple'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an array of subscribed clients to JSON.
  	 </div>
  	@function toJsonMultiple
  	@param {fm.array} subscribedClients The array of subscribed clients to serialize.
  	@return {String} The JSON-formatted array of subscribed clients.
  */


  subscribedClient.toJsonMultiple = function() {
    var subscribedClients;
    subscribedClients = arguments[0];
    return fm.websync.serializer.serializeSubscribedClientArray(subscribedClients);
  };

  /*<span id='method-fm.websync.subscribedClient-getBoundRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the subscribed client's bound records.
  	 </div>
  
  	@function getBoundRecords
  	@return {Object}
  */


  subscribedClient.prototype.getBoundRecords = function() {
    return this._boundRecords;
  };

  /*<span id='method-fm.websync.subscribedClient-getBoundRecordValueJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the JSON value of a record bound to the subscribed client.
  	 </div>
  	@function getBoundRecordValueJson
  	@param {String} key The record key.
  	@return {String} The JSON value of the record, if it exists, or null.
  */


  subscribedClient.prototype.getBoundRecordValueJson = function() {
    var key, record, _var0, _var1, _var2;
    key = arguments[0];
    _var0 = this.getBoundRecords();
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    record = null;
    _var1 = new fm.holder(record);
    _var2 = fm.hashExtensions.tryGetValue(this.getBoundRecords(), key, _var1);
    record = _var1.getValue();
    if (!_var2) {
      return null;
    }
    return record.getValueJson();
  };

  /*<span id='method-fm.websync.subscribedClient-getClientId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the subscribed client's ID.
  	 </div>
  
  	@function getClientId
  	@return {fm.guid}
  */


  subscribedClient.prototype.getClientId = function() {
    return this._clientId;
  };

  /*<span id='method-fm.websync.subscribedClient-setBoundRecords'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the subscribed client's bound records.
  	 </div>
  
  	@function setBoundRecords
  	@param {Object} value
  	@return {void}
  */


  subscribedClient.prototype.setBoundRecords = function() {
    var value;
    value = arguments[0];
    return this._boundRecords = value;
  };

  /*<span id='method-fm.websync.subscribedClient-setClientId'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the subscribed client's ID.
  	 </div>
  
  	@function setClientId
  	@param {fm.guid} value
  	@return {void}
  */


  subscribedClient.prototype.setClientId = function() {
    var value;
    value = arguments[0];
    return this._clientId = value;
  };

  /*<span id='method-fm.websync.subscribedClient-toJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String} The JSON-formatted subscribed client.
  */


  subscribedClient.prototype.toJson = function() {
    return fm.websync.subscribedClient.toJson(this);
  };

  subscribedClient.prototype.getBoundRecordValue = function() {
    var key;
    key = arguments[0];
    return fm.json.deserialize(this.getBoundRecordValueJson.apply(this, arguments));
  };

  return subscribedClient;

}).call(this, fm.serializable);


/*<span id='cls-fm.websync.webSocketOpenArgs'>&nbsp;</span>
*/

/**
@class fm.websync.webSocketOpenArgs
 <div>
 Open arguments for the <see cref="fm.websync.webSocket">fm.websync.webSocket</see> class.
 </div>

@extends fm.dynamic
*/


fm.websync.webSocketOpenArgs = (function(_super) {

  __extends(webSocketOpenArgs, _super);

  webSocketOpenArgs.prototype._handshakeTimeout = 0;

  webSocketOpenArgs.prototype._headers = null;

  webSocketOpenArgs.prototype._onFailure = null;

  webSocketOpenArgs.prototype._onReceive = null;

  webSocketOpenArgs.prototype._onRequestCreated = null;

  webSocketOpenArgs.prototype._onResponseReceived = null;

  webSocketOpenArgs.prototype._onStreamFailure = null;

  webSocketOpenArgs.prototype._onSuccess = null;

  webSocketOpenArgs.prototype._sender = null;

  webSocketOpenArgs.prototype._streamTimeout = 0;

  /*<span id='method-fm.websync.webSocketOpenArgs-fm.websync.webSocketOpenArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Creates a new instance of
  	 </div>
  
  	@function fm.websync.webSocketOpenArgs
  	@return {}
  */


  function webSocketOpenArgs() {
    this.setStreamTimeout = __bind(this.setStreamTimeout, this);

    this.setSender = __bind(this.setSender, this);

    this.setOnSuccess = __bind(this.setOnSuccess, this);

    this.setOnStreamFailure = __bind(this.setOnStreamFailure, this);

    this.setOnResponseReceived = __bind(this.setOnResponseReceived, this);

    this.setOnRequestCreated = __bind(this.setOnRequestCreated, this);

    this.setOnReceive = __bind(this.setOnReceive, this);

    this.setOnFailure = __bind(this.setOnFailure, this);

    this.setHeaders = __bind(this.setHeaders, this);

    this.setHandshakeTimeout = __bind(this.setHandshakeTimeout, this);

    this.getStreamTimeout = __bind(this.getStreamTimeout, this);

    this.getSender = __bind(this.getSender, this);

    this.getOnSuccess = __bind(this.getOnSuccess, this);

    this.getOnStreamFailure = __bind(this.getOnStreamFailure, this);

    this.getOnResponseReceived = __bind(this.getOnResponseReceived, this);

    this.getOnRequestCreated = __bind(this.getOnRequestCreated, this);

    this.getOnReceive = __bind(this.getOnReceive, this);

    this.getOnFailure = __bind(this.getOnFailure, this);

    this.getHeaders = __bind(this.getHeaders, this);

    this.getHandshakeTimeout = __bind(this.getHandshakeTimeout, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      webSocketOpenArgs.__super__.constructor.call(this);
      this.setHandshakeTimeout(15000);
      this.setStreamTimeout(40000);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    webSocketOpenArgs.__super__.constructor.call(this);
    this.setHandshakeTimeout(15000);
    this.setStreamTimeout(40000);
  }

  /*<span id='method-fm.websync.webSocketOpenArgs-getHandshakeTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the timeout for the handshake.
  	 </div>
  
  	@function getHandshakeTimeout
  	@return {Integer}
  */


  webSocketOpenArgs.prototype.getHandshakeTimeout = function() {
    return this._handshakeTimeout;
  };

  /*<span id='method-fm.websync.webSocketOpenArgs-getHeaders'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets headers to send with the handshake request.
  	 </div>
  
  	@function getHeaders
  	@return {fm.nameValueCollection}
  */


  webSocketOpenArgs.prototype.getHeaders = function() {
    return this._headers;
  };

  /*<span id='method-fm.websync.webSocketOpenArgs-getOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke when a connection could not be established.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
  */


  webSocketOpenArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };

  /*<span id='method-fm.websync.webSocketOpenArgs-getOnReceive'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke when a message is received.
  	 </div>
  
  	@function getOnReceive
  	@return {fm.singleAction}
  */


  webSocketOpenArgs.prototype.getOnReceive = function() {
    return this._onReceive;
  };

  /*<span id='method-fm.websync.webSocketOpenArgs-getOnRequestCreated'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke before the handshake request is sent.
  	 </div>
  
  	@function getOnRequestCreated
  	@return {fm.singleAction}
  */


  webSocketOpenArgs.prototype.getOnRequestCreated = function() {
    return this._onRequestCreated;
  };

  /*<span id='method-fm.websync.webSocketOpenArgs-getOnResponseReceived'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke after the handshake response is received.
  	 </div>
  
  	@function getOnResponseReceived
  	@return {fm.singleAction}
  */


  webSocketOpenArgs.prototype.getOnResponseReceived = function() {
    return this._onResponseReceived;
  };

  /*<span id='method-fm.websync.webSocketOpenArgs-getOnStreamFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke when a successful connection breaks down.
  	 </div>
  
  	@function getOnStreamFailure
  	@return {fm.singleAction}
  */


  webSocketOpenArgs.prototype.getOnStreamFailure = function() {
    return this._onStreamFailure;
  };

  /*<span id='method-fm.websync.webSocketOpenArgs-getOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke when a successful connection has been established.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
  */


  webSocketOpenArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };

  /*<span id='method-fm.websync.webSocketOpenArgs-getSender'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the sender of the request.
  	 </div>
  
  	@function getSender
  	@return {fm.object}
  */


  webSocketOpenArgs.prototype.getSender = function() {
    return this._sender;
  };

  /*<span id='method-fm.websync.webSocketOpenArgs-getStreamTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the timeout for the stream.
  	 </div>
  
  	@function getStreamTimeout
  	@return {Integer}
  */


  webSocketOpenArgs.prototype.getStreamTimeout = function() {
    return this._streamTimeout;
  };

  /*<span id='method-fm.websync.webSocketOpenArgs-setHandshakeTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the timeout for the handshake.
  	 </div>
  
  	@function setHandshakeTimeout
  	@param {Integer} value
  	@return {void}
  */


  webSocketOpenArgs.prototype.setHandshakeTimeout = function() {
    var value;
    value = arguments[0];
    return this._handshakeTimeout = value;
  };

  /*<span id='method-fm.websync.webSocketOpenArgs-setHeaders'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets headers to send with the handshake request.
  	 </div>
  
  	@function setHeaders
  	@param {fm.nameValueCollection} value
  	@return {void}
  */


  webSocketOpenArgs.prototype.setHeaders = function() {
    var value;
    value = arguments[0];
    return this._headers = value;
  };

  /*<span id='method-fm.websync.webSocketOpenArgs-setOnFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke when a connection could not be established.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  webSocketOpenArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };

  /*<span id='method-fm.websync.webSocketOpenArgs-setOnReceive'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke when a message is received.
  	 </div>
  
  	@function setOnReceive
  	@param {fm.singleAction} value
  	@return {void}
  */


  webSocketOpenArgs.prototype.setOnReceive = function() {
    var value;
    value = arguments[0];
    return this._onReceive = value;
  };

  /*<span id='method-fm.websync.webSocketOpenArgs-setOnRequestCreated'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke before the handshake request is sent.
  	 </div>
  
  	@function setOnRequestCreated
  	@param {fm.singleAction} value
  	@return {void}
  */


  webSocketOpenArgs.prototype.setOnRequestCreated = function() {
    var value;
    value = arguments[0];
    return this._onRequestCreated = value;
  };

  /*<span id='method-fm.websync.webSocketOpenArgs-setOnResponseReceived'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke after the handshake response is received.
  	 </div>
  
  	@function setOnResponseReceived
  	@param {fm.singleAction} value
  	@return {void}
  */


  webSocketOpenArgs.prototype.setOnResponseReceived = function() {
    var value;
    value = arguments[0];
    return this._onResponseReceived = value;
  };

  /*<span id='method-fm.websync.webSocketOpenArgs-setOnStreamFailure'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke when a successful connection breaks down.
  	 </div>
  
  	@function setOnStreamFailure
  	@param {fm.singleAction} value
  	@return {void}
  */


  webSocketOpenArgs.prototype.setOnStreamFailure = function() {
    var value;
    value = arguments[0];
    return this._onStreamFailure = value;
  };

  /*<span id='method-fm.websync.webSocketOpenArgs-setOnSuccess'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke when a successful connection has been established.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
  */


  webSocketOpenArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };

  /*<span id='method-fm.websync.webSocketOpenArgs-setSender'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the sender of the request.
  	 </div>
  
  	@function setSender
  	@param {fm.object} value
  	@return {void}
  */


  webSocketOpenArgs.prototype.setSender = function() {
    var value;
    value = arguments[0];
    return this._sender = value;
  };

  /*<span id='method-fm.websync.webSocketOpenArgs-setStreamTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the timeout for the stream.
  	 </div>
  
  	@function setStreamTimeout
  	@param {Integer} value
  	@return {void}
  */


  webSocketOpenArgs.prototype.setStreamTimeout = function() {
    var value;
    value = arguments[0];
    return this._streamTimeout = value;
  };

  return webSocketOpenArgs;

})(fm.dynamic);


/*<span id='cls-fm.websync.webSocketOpenFailureArgs'>&nbsp;</span>
*/

/**
@class fm.websync.webSocketOpenFailureArgs
 <div>
 Arguments for <see cref="fm.websync.webSocketOpenArgs.onFailure">fm.websync.webSocketOpenArgs.onFailure</see>.
 </div>

@extends fm.websync.socketOpenFailureArgs
*/


fm.websync.webSocketOpenFailureArgs = (function(_super) {

  __extends(webSocketOpenFailureArgs, _super);

  webSocketOpenFailureArgs.prototype._statusCode = null;

  function webSocketOpenFailureArgs() {
    this.setStatusCode = __bind(this.setStatusCode, this);

    this.getStatusCode = __bind(this.getStatusCode, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      webSocketOpenFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    webSocketOpenFailureArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.webSocketOpenFailureArgs-getStatusCode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the status code associated with the failure to connect.
  	 </div>
  
  	@function getStatusCode
  	@return {fm.websync.webSocketStatusCode}
  */


  webSocketOpenFailureArgs.prototype.getStatusCode = function() {
    return this._statusCode;
  };

  /*<span id='method-fm.websync.webSocketOpenFailureArgs-setStatusCode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the status code associated with the failure to connect.
  	 </div>
  
  	@function setStatusCode
  	@param {fm.websync.webSocketStatusCode} value
  	@return {void}
  */


  webSocketOpenFailureArgs.prototype.setStatusCode = function() {
    var value;
    value = arguments[0];
    return this._statusCode = value;
  };

  return webSocketOpenFailureArgs;

})(fm.websync.socketOpenFailureArgs);


/*<span id='cls-fm.websync.webSocketOpenSuccessArgs'>&nbsp;</span>
*/

/**
@class fm.websync.webSocketOpenSuccessArgs
 <div>
 Arguments for <see cref="fm.websync.webSocketOpenArgs.onSuccess">fm.websync.webSocketOpenArgs.onSuccess</see>.
 </div>

@extends fm.websync.socketOpenSuccessArgs
*/


fm.websync.webSocketOpenSuccessArgs = (function(_super) {

  __extends(webSocketOpenSuccessArgs, _super);

  function webSocketOpenSuccessArgs() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      webSocketOpenSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    webSocketOpenSuccessArgs.__super__.constructor.call(this);
  }

  return webSocketOpenSuccessArgs;

})(fm.websync.socketOpenSuccessArgs);


/*<span id='cls-fm.websync.webSocketReceiveArgs'>&nbsp;</span>
*/

/**
@class fm.websync.webSocketReceiveArgs
 <div>
 Arguments for <see cref="fm.websync.webSocketOpenArgs.onReceive">fm.websync.webSocketOpenArgs.onReceive</see>.
 </div>

@extends fm.dynamic
*/


fm.websync.webSocketReceiveArgs = (function(_super) {

  __extends(webSocketReceiveArgs, _super);

  webSocketReceiveArgs.prototype._binaryMessage = null;

  webSocketReceiveArgs.prototype._textMessage = null;

  function webSocketReceiveArgs() {
    this.setTextMessage = __bind(this.setTextMessage, this);

    this.setBinaryMessage = __bind(this.setBinaryMessage, this);

    this.getTextMessage = __bind(this.getTextMessage, this);

    this.getIsText = __bind(this.getIsText, this);

    this.getBinaryMessage = __bind(this.getBinaryMessage, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      webSocketReceiveArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    webSocketReceiveArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.webSocketReceiveArgs-getBinaryMessage'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the message received from the server as binary data.
  	 </div>
  
  	@function getBinaryMessage
  	@return {fm.array}
  */


  webSocketReceiveArgs.prototype.getBinaryMessage = function() {
    return this._binaryMessage;
  };

  /*<span id='method-fm.websync.webSocketReceiveArgs-getIsText'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets whether or not the received message is text.
  	 </div>
  
  	@function getIsText
  	@return {Boolean}
  */


  webSocketReceiveArgs.prototype.getIsText = function() {
    var _var0;
    _var0 = this.getTextMessage();
    return _var0 !== null && typeof _var0 !== 'undefined';
  };

  /*<span id='method-fm.websync.webSocketReceiveArgs-getTextMessage'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the message received from the server as text data.
  	 </div>
  
  	@function getTextMessage
  	@return {String}
  */


  webSocketReceiveArgs.prototype.getTextMessage = function() {
    return this._textMessage;
  };

  /*<span id='method-fm.websync.webSocketReceiveArgs-setBinaryMessage'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the message received from the server as binary data.
  	 </div>
  
  	@function setBinaryMessage
  	@param {fm.array} value
  	@return {void}
  */


  webSocketReceiveArgs.prototype.setBinaryMessage = function() {
    var value;
    value = arguments[0];
    return this._binaryMessage = value;
  };

  /*<span id='method-fm.websync.webSocketReceiveArgs-setTextMessage'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the message received from the server as text data.
  	 </div>
  
  	@function setTextMessage
  	@param {String} value
  	@return {void}
  */


  webSocketReceiveArgs.prototype.setTextMessage = function() {
    var value;
    value = arguments[0];
    return this._textMessage = value;
  };

  return webSocketReceiveArgs;

})(fm.dynamic);




fm.websync.webSocketRequest = (function(_super) {

  __extends(webSocketRequest, _super);

  webSocketRequest.prototype._args = null;

  webSocketRequest.prototype._callback = null;

  function webSocketRequest() {
    this.setCallback = __bind(this.setCallback, this);

    this.setArgs = __bind(this.setArgs, this);

    this.getCallback = __bind(this.getCallback, this);

    this.getArgs = __bind(this.getArgs, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      webSocketRequest.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    webSocketRequest.__super__.constructor.call(this);
  }

  webSocketRequest.prototype.getArgs = function() {
    return this._args;
  };

  webSocketRequest.prototype.getCallback = function() {
    return this._callback;
  };

  webSocketRequest.prototype.setArgs = function() {
    var value;
    value = arguments[0];
    return this._args = value;
  };

  webSocketRequest.prototype.setCallback = function() {
    var value;
    value = arguments[0];
    return this._callback = value;
  };

  return webSocketRequest;

})(fm.object);


/*<span id='cls-fm.websync.webSocketSendArgs'>&nbsp;</span>
*/

/**
@class fm.websync.webSocketSendArgs
 <div>
 Send arguments for the <see cref="fm.websync.webSocket">fm.websync.webSocket</see> class.
 </div>

@extends fm.dynamic
*/


fm.websync.webSocketSendArgs = (function(_super) {

  __extends(webSocketSendArgs, _super);

  webSocketSendArgs.prototype._binaryMessage = null;

  webSocketSendArgs.prototype._textMessage = null;

  webSocketSendArgs.prototype._timeout = 0;

  /*<span id='method-fm.websync.webSocketSendArgs-fm.websync.webSocketSendArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Creates a new <see cref="fm.websync.webSocketSendArgs">fm.websync.webSocketSendArgs</see> instance.
  	 </div>
  
  	@function fm.websync.webSocketSendArgs
  	@return {}
  */


  function webSocketSendArgs() {
    this.setTimeout = __bind(this.setTimeout, this);

    this.setTextMessage = __bind(this.setTextMessage, this);

    this.setBinaryMessage = __bind(this.setBinaryMessage, this);

    this.getTimeout = __bind(this.getTimeout, this);

    this.getTextMessage = __bind(this.getTextMessage, this);

    this.getIsText = __bind(this.getIsText, this);

    this.getBinaryMessage = __bind(this.getBinaryMessage, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      webSocketSendArgs.__super__.constructor.call(this);
      this.setTimeout(15000);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    webSocketSendArgs.__super__.constructor.call(this);
    this.setTimeout(15000);
  }

  /*<span id='method-fm.websync.webSocketSendArgs-getBinaryMessage'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the message to send as binary data.
  	 </div>
  
  	@function getBinaryMessage
  	@return {fm.array}
  */


  webSocketSendArgs.prototype.getBinaryMessage = function() {
    return this._binaryMessage;
  };

  webSocketSendArgs.prototype.getIsText = function() {
    var _var0;
    _var0 = this.getTextMessage();
    return _var0 !== null && typeof _var0 !== 'undefined';
  };

  /*<span id='method-fm.websync.webSocketSendArgs-getTextMessage'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the message to send as text data.
  	 </div>
  
  	@function getTextMessage
  	@return {String}
  */


  webSocketSendArgs.prototype.getTextMessage = function() {
    return this._textMessage;
  };

  /*<span id='method-fm.websync.webSocketSendArgs-getTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the timeout for the request.
  	 </div>
  
  	@function getTimeout
  	@return {Integer}
  */


  webSocketSendArgs.prototype.getTimeout = function() {
    return this._timeout;
  };

  /*<span id='method-fm.websync.webSocketSendArgs-setBinaryMessage'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the message to send as binary data.
  	 </div>
  
  	@function setBinaryMessage
  	@param {fm.array} value
  	@return {void}
  */


  webSocketSendArgs.prototype.setBinaryMessage = function() {
    var value;
    value = arguments[0];
    return this._binaryMessage = value;
  };

  /*<span id='method-fm.websync.webSocketSendArgs-setTextMessage'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the message to send as text data.
  	 </div>
  
  	@function setTextMessage
  	@param {String} value
  	@return {void}
  */


  webSocketSendArgs.prototype.setTextMessage = function() {
    var value;
    value = arguments[0];
    return this._textMessage = value;
  };

  /*<span id='method-fm.websync.webSocketSendArgs-setTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the timeout for the request.
  	 </div>
  
  	@function setTimeout
  	@param {Integer} value
  	@return {void}
  */


  webSocketSendArgs.prototype.setTimeout = function() {
    var value;
    value = arguments[0];
    return this._timeout = value;
  };

  return webSocketSendArgs;

})(fm.dynamic);


/*<span id='cls-fm.websync.webSocketStreamFailureArgs'>&nbsp;</span>
*/

/**
@class fm.websync.webSocketStreamFailureArgs
 <div>
 Arguments for <see cref="fm.websync.webSocketOpenArgs.onStreamFailure">fm.websync.webSocketOpenArgs.onStreamFailure</see>.
 </div>

@extends fm.websync.socketStreamFailureArgs
*/


fm.websync.webSocketStreamFailureArgs = (function(_super) {

  __extends(webSocketStreamFailureArgs, _super);

  webSocketStreamFailureArgs.prototype._statusCode = null;

  function webSocketStreamFailureArgs() {
    this.setStatusCode = __bind(this.setStatusCode, this);

    this.getStatusCode = __bind(this.getStatusCode, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      webSocketStreamFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    webSocketStreamFailureArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.websync.webSocketStreamFailureArgs-getStatusCode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the status code associated with the stream failure.
  	 </div>
  
  	@function getStatusCode
  	@return {fm.websync.webSocketStatusCode}
  */


  webSocketStreamFailureArgs.prototype.getStatusCode = function() {
    return this._statusCode;
  };

  /*<span id='method-fm.websync.webSocketStreamFailureArgs-setStatusCode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the status code associated with the stream failure.
  	 </div>
  
  	@function setStatusCode
  	@param {fm.websync.webSocketStatusCode} value
  	@return {void}
  */


  webSocketStreamFailureArgs.prototype.setStatusCode = function() {
    var value;
    value = arguments[0];
    return this._statusCode = value;
  };

  return webSocketStreamFailureArgs;

})(fm.websync.socketStreamFailureArgs);


/*<span id='cls-fm.websync.webSocketTransfer'>&nbsp;</span>
*/

/**
@class fm.websync.webSocketTransfer
 <div>
 Defines methods for transferring messages using the WebSocket protocol.
 </div>

@extends fm.websync.socketMessageTransfer
*/


fm.websync.webSocketTransfer = (function(_super) {

  __extends(webSocketTransfer, _super);

  webSocketTransfer.prototype._activeRequest = null;

  webSocketTransfer.prototype._webSocket = null;

  /*<span id='method-fm.websync.webSocketTransfer-fm.websync.webSocketTransfer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Creates a new instance of <see cref="fm.websync.webSocketTransfer">fm.websync.webSocketTransfer</see>.
  	 </div>
  	@function fm.websync.webSocketTransfer
  	@param {String} requestUrl The URL of the WebSync request handler.
  	@return {}
  */


  function webSocketTransfer() {
    this.streamFailure = __bind(this.streamFailure, this);

    this.shutdown = __bind(this.shutdown, this);

    this.setWebSocket = __bind(this.setWebSocket, this);

    this.sendMessagesAsync = __bind(this.sendMessagesAsync, this);

    this.sendMessages = __bind(this.sendMessages, this);

    this.receive = __bind(this.receive, this);

    this.open = __bind(this.open, this);

    this.getWebSocket = __bind(this.getWebSocket, this);

    this.connectSuccess = __bind(this.connectSuccess, this);

    this.connectFailure = __bind(this.connectFailure, this);

    var requestUrl;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      webSocketTransfer.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    requestUrl = arguments[0];
    webSocketTransfer.__super__.constructor.call(this);
    requestUrl = requestUrl.replace("https://", "wss://");
    requestUrl = requestUrl.replace("http://", "ws://");
    this.setWebSocket(new fm.websync.webSocket(requestUrl));
  }

  webSocketTransfer.prototype.connectFailure = function() {
    var e, _var0;
    e = arguments[0];
    _var0 = this.getOnOpenFailure();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return this.getOnOpenFailure()(e);
    }
  };

  webSocketTransfer.prototype.connectSuccess = function() {
    var e, _var0;
    e = arguments[0];
    _var0 = this.getOnOpenSuccess();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return this.getOnOpenSuccess()(e);
    }
  };

  webSocketTransfer.prototype.getWebSocket = function() {
    return this._webSocket;
  };

  /*<span id='method-fm.websync.webSocketTransfer-open'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Opens the WebSocket connection.
  	 </div>
  
  	@function open
  	@param {fm.nameValueCollection} headers
  	@return {void}
  */


  webSocketTransfer.prototype.open = function() {
    var headers, openArgs;
    headers = arguments[0];
    openArgs = new fm.websync.webSocketOpenArgs();
    openArgs.setHandshakeTimeout(this.getHandshakeTimeout());
    openArgs.setHeaders(headers);
    openArgs.setOnSuccess(this.connectSuccess);
    openArgs.setOnFailure(this.connectFailure);
    openArgs.setOnStreamFailure(this.streamFailure);
    openArgs.setOnRequestCreated(this.getOnRequestCreated());
    openArgs.setOnResponseReceived(this.getOnResponseReceived());
    openArgs.setOnReceive(this.receive);
    openArgs.setSender(this.getSender());
    return this.getWebSocket().open(openArgs);
  };

  webSocketTransfer.prototype.receive = function() {
    var e, messageArray, p;
    e = arguments[0];
    if (e.getIsText()) {
      messageArray = fm.websync.message.fromJsonMultiple(e.getTextMessage());
    } else {
      messageArray = fm.websync.message.fromBinaryMultiple(e.getBinaryMessage());
    }
    p = new fm.websync.messageResponseArgs(this._activeRequest.getArgs());
    p.setHeaders(new fm.nameValueCollection());
    p.setMessages(messageArray);
    return this._activeRequest.getCallback()(p);
  };

  /*<span id='method-fm.websync.webSocketTransfer-sendMessages'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends a request synchronously.
  	 </div>
  	@function sendMessages
  	@param {fm.websync.messageRequestArgs} requestArgs The request parameters.
  	@return {fm.websync.messageResponseArgs} The response parameters.
  */


  webSocketTransfer.prototype.sendMessages = function() {
    var requestArgs;
    requestArgs = arguments[0];
    throw new Error("Synchronous WebSockets are not supported.");
  };

  /*<span id='method-fm.websync.webSocketTransfer-sendMessagesAsync'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends a request asynchronously.
  	 </div>
  	@function sendMessagesAsync
  	@param {fm.websync.messageRequestArgs} requestArgs The request parameters.
  	@param {fm.singleAction} callback The callback to execute with the resulting response.
  	@return {void}
  */


  webSocketTransfer.prototype.sendMessagesAsync = function() {
    var args2, callback, request, request2, requestArgs, sendArgs;
    requestArgs = arguments[0];
    callback = arguments[1];
    request2 = new fm.websync.webSocketRequest();
    request2.setArgs(requestArgs);
    request2.setCallback(callback);
    request = request2;
    args2 = new fm.websync.webSocketSendArgs();
    args2.setTimeout(request.getArgs().getTimeout());
    sendArgs = args2;
    sendArgs.setTextMessage(fm.websync.message.toJsonMultiple(request.getArgs().getMessages()));
    if (request.getArgs().getIsBinary()) {
      sendArgs.setBinaryMessage(fm.websync.message.toBinaryMultiple(request.getArgs().getMessages()));
    }
    this._activeRequest = request;
    return this.getWebSocket().send(sendArgs);
  };

  webSocketTransfer.prototype.setWebSocket = function() {
    var value;
    value = arguments[0];
    return this._webSocket = value;
  };

  /*<span id='method-fm.websync.webSocketTransfer-shutdown'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Releases any resources and shuts down.
  	 </div>
  
  	@function shutdown
  	@return {void}
  */


  webSocketTransfer.prototype.shutdown = function() {
    return this.getWebSocket().close();
  };

  webSocketTransfer.prototype.streamFailure = function() {
    var e, _var0;
    e = arguments[0];
    _var0 = this.getOnStreamFailure();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return this.getOnStreamFailure()(e);
    }
  };

  return webSocketTransfer;

})(fm.websync.socketMessageTransfer);



(function() {
  var client, deleteActiveClient, deleteCookie, deleteCookieClient, insertActiveClient, insertCookie, insertCookieClient, selectActiveClients, selectCookieClient, selectCookies, _activeClients, _cookiePrefix;
  client = fm.websync.client;
  client.addOnConnectRequest(function(c, e) {
    var args;
    args = e.getMethodArgs();
    if (!args.getIsReconnect() && !args.getLastClientId() && !args.getLastSessionId()) {
      client = selectCookieClient();
      if (client) {
        args.setLastClientId(client.clientId);
        args.setLastSessionId(client.sessionId);
        if (client.token) {
          c.setToken(client.token);
        }
        deleteCookieClient(client.clientId);
      }
    }
  });
  client.addOnConnectEnd(function(c, e) {
    var args;
    if (!e.getException()) {
      args = e.getMethodArgs();
      if (args.getLastClientId()) {
        deleteActiveClient(args.getLastClientId());
      }
      insertActiveClient({
        clientId: c.getClientId(),
        sessionId: c.getSessionId(),
        token: c.getToken()
      });
    }
  });
  client.addOnDisconnectEnd(function(c, e) {
    if (!e.getException()) {
      deleteActiveClient(c.getClientId());
    }
  });
  fm.util.observe(window, 'beforeunload', function() {
    var activeClient, activeClients, _i, _len;
    activeClients = selectActiveClients();
    for (_i = 0, _len = activeClients.length; _i < _len; _i++) {
      activeClient = activeClients[_i];
      insertCookieClient(activeClient);
    }
  });
  _activeClients = [];
  selectActiveClients = function() {
    return _activeClients;
  };
  insertActiveClient = function(client) {
    _activeClients.push(client);
  };
  deleteActiveClient = function(clientId) {
    var activeClient, i, _i, _len;
    for (i = _i = 0, _len = _activeClients.length; _i < _len; i = ++_i) {
      activeClient = _activeClients[i];
      if (activeClient.clientId.equals(clientId)) {
        _activeClients.splice(i, 1);
        return;
      }
    }
  };
  _cookiePrefix = 'fm-websync-';
  selectCookieClient = function() {
    var cookieClient, cookieName, cookieValue, cookies;
    cookies = selectCookies();
    cookieClient = null;
    for (cookieName in cookies) {
      cookieValue = cookies[cookieName];
      if (fm.stringExtensions.startsWith(cookieName, _cookiePrefix)) {
        cookieValue = fm.json.deserialize(cookieValue);
        cookieClient = {
          clientId: new fm.guid(cookieValue.clientId),
          sessionId: new fm.guid(cookieValue.sessionId),
          token: cookieValue.token
        };
      }
    }
    return cookieClient;
  };
  insertCookieClient = function(client) {
    var cookieValue;
    cookieValue = {
      clientId: client.clientId.toString(),
      sessionId: client.sessionId.toString(),
      token: client.token
    };
    insertCookie(_cookiePrefix + client.clientId.toString(), fm.json.serialize(cookieValue), 60);
  };
  deleteCookieClient = function(clientId) {
    deleteCookie(_cookiePrefix + clientId.toString());
  };
  selectCookies = function() {
    var cookie, cookieSplit, cookies, equalsIndex, _i, _len;
    cookies = {};
    cookieSplit = document.cookie.split(';');
    for (_i = 0, _len = cookieSplit.length; _i < _len; _i++) {
      cookie = cookieSplit[_i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      equalsIndex = cookie.indexOf('=');
      if (equalsIndex >= 0) {
        cookies[cookie.substring(0, equalsIndex)] = decodeURIComponent(cookie.substring(equalsIndex + 1, cookie.length));
      }
    }
    return cookies;
  };
  insertCookie = function(name, value, seconds) {
    var date, expires;
    expires = '';
    if (seconds) {
      date = new Date();
      date.setTime(date.getTime() + (seconds * 1000));
      expires = '; expires=' + date.toGMTString();
    }
    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
  };
  return deleteCookie = function(name) {
    insertCookie(name, '', -1);
  };
})();



(function() {
  var client, methodName, oldClient, oldConstructor, oldPrototype, prop, _created, _fn, _i, _len, _ref;
  client = fm.websync.client;
  _ref = ['connect', 'disconnect', 'subscribe', 'unsubscribe', 'bind', 'unbind', 'publish', 'notify', 'service'];
  _fn = function(methodName) {
    var method;
    method = client.prototype[methodName];
    return client.prototype[methodName] = function() {
      var i, obj, record, _j, _len1, _ref1;
      if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
        obj = arguments[0];
        if (obj.record && fm.util.isPlainObject(obj.record)) {
          obj.record = new fm.websync.record(obj.record);
        }
        if (obj.records) {
          _ref1 = obj.records;
          for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
            record = _ref1[i];
            if (fm.util.isPlainObject(obj.records[i])) {
              obj.records[i] = new fm.websync.record(obj.records[i]);
            }
          }
        }
        return method.call(this, new fm.websync[methodName + 'Args'](obj));
      } else {
        return method.apply(this, arguments);
      }
    };
  };
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    methodName = _ref[_i];
    _fn(methodName);
  }
  oldConstructor = client.prototype.constructor;
  oldPrototype = client.prototype;
  oldClient = client;
  _created = false;
  fm.websync.client.enableMultiple = false;
  fm.websync.client = function() {
    var c;
    if (_created && !client.enableMultiple) {
      throw Error('To create multiple instances of the JavaScript client, set fm.websync.client.enableMultiple to true.');
    } else {
      _created = true;
      oldConstructor.apply(this, arguments);
      c = this;
      fm.util.observe(window, 'beforeunload', function() {
        var autoDisconnect, autoDisconnectConfig;
        autoDisconnect = c._autoDisconnect;
        if (autoDisconnect) {
          autoDisconnectConfig = c._autoDisconnectConfig;
          if (autoDisconnectConfig) {
            c.disconnect(autoDisconnectConfig);
          } else {
            c.disconnect();
          }
        }
      });
      return c;
    }
  };
  fm.websync.client.prototype = oldPrototype;
  for (prop in oldClient) {
    fm.websync.client[prop] = oldClient[prop];
  }
  client = fm.websync.client;
  client.prototype.setDisableCORS = function(disableCORS) {
    return this._disableCORS = disableCORS;
  };
  client.prototype.getDisableCORS = function() {
    return this._disableCORS || false;
  };
  client.prototype.setDisablePostMessage = function(disablePostMessage) {
    return this._disablePostMessage = disablePostMessage;
  };
  client.prototype.getDisablePostMessage = function() {
    return this._disablePostMessage || false;
  };
  client.prototype.setForceJSONP = function(forceJSONP) {
    return this._forceJSONP = forceJSONP;
  };
  client.prototype.getForceJSONP = function() {
    return this._forceJSONP || false;
  };
  return client.prototype.setAutoDisconnect = function(autoDisconnectConfig) {
    this._autoDisconnect = true;
    return this._autoDisconnectConfig = autoDisconnectConfig;
  };
})();


return fm.websync;
}));