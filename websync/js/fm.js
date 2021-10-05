
/*
 * Title: FM Core for JavaScript
 * Version: 2.5.1
 * Copyright Frozen Mountain Software 2011+
 */

(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else this[name] = definition();
}('fm', function() {

if (typeof global !== 'undefined' && !global.window) { global.window = global; global.document = { cookie: '' }; }

if (!window.fm) { window.fm = {}; }

var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

var __hasProp = {}.hasOwnProperty;

var __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

/*
    http://www.JSON.org/json2.js
    2011-02-23

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSONFM
            method, its toJSONFM method will be called and the result will be
            stringified. A toJSONFM method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSONFM method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSONFM = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false, regexp: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSONFM, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    "use strict";

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSONFM !== 'function') {

        Date.prototype.toJSONFM = function (key) {

            return isFinite(this.valueOf()) ?
                this.getUTCFullYear()     + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate())      + 'T' +
                f(this.getUTCHours())     + ':' +
                f(this.getUTCMinutes())   + ':' +
                f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSONFM      =
            Number.prototype.toJSONFM  =
            Boolean.prototype.toJSONFM = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :
                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSONFM method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSONFM === 'function') {
            value = value.toJSONFM(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' : gap ?
                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                    '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' : gap ?
                '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());


fm.object = (function() {

  function object() {}

  return object;

})();




fm.util = (function() {
  var _this = this;

  function util() {}

  util._xdCache = {};

  util.isString = function(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
  };

  util.isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  util.isPlainObject = function(obj) {
    var key, x;
    if (!obj || Object.prototype.toString.call(obj) !== '[object Object]' || obj.nodeType || obj === obj.window) {
      return false;
    }
    try {
      if (obj.constructor && !Object.prototype.hasOwnProperty.call(obj, "constructor") && !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
      }
    } catch (error) {
      return false;
    }
    for (key in obj) {
      x = 0;
    }
    return key === void 0 || Object.prototype.hasOwnProperty.call(obj, key);
  };

  util.canAttachProperties = function(instance, obj) {
    var key, setter, setterName, value;
    for (key in obj) {
      value = obj[key];
      setterName = 'set' + key.charAt(0).toUpperCase() + key.substring(1);
      setter = instance[setterName];
      if (!setter || Object.prototype.toString.call(setter) !== '[object Function]') {
        return false;
      }
    }
    return true;
  };

  util.attachProperties = function(instance, obj) {
    var key, setter, setterName, value, _results;
    _results = [];
    for (key in obj) {
      value = obj[key];
      setterName = 'set' + key.charAt(0).toUpperCase() + key.substring(1);
      setter = instance[setterName];
      if (setter && Object.prototype.toString.call(setter) === '[object Function]') {
        _results.push(setter.call(instance, value));
      } else {
        setter = instance['setExtensionValue'];
        if (setter && Object.prototype.toString.call(setter) === '[object Function]') {
          setter.call(instance, key, value);
          _results.push(fm.log.debug('Property "' + key + '" did not match any known setter and is assumed to be an extension value.'));
        } else {
          _results.push(fm.log.debug('Property "' + key + '" did not match any known setter and was ignored.'));
        }
      }
    }
    return _results;
  };

  util.isIE = function() {
    return !!document.protocol;
  };

  util.isIE6 = function() {
    return util.isIE() && !window.XMLHttpRequest;
  };

  util.isIE7 = function() {
    return util.isIE() && window.XMLHttpRequest && !document.implementation;
  };

  util.isIE8 = function() {
    return util.isIE() && document.implementation && document.implementation.hasFeature && !document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
  };

  util.isIE9 = function() {
    return util.isIE() && document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
  };

  util.isAndroid = function() {
    return navigator.userAgent.match(/Android/i);
  };

  util.isBlackBerry = function() {
    return navigator.userAgent.match(/BlackBerry/i);
  };

  util.isiOS = function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  };

  util.isOpera = function() {
    return navigator.userAgent.match(/Opera Mini/i);
  };

  util.isWindows = function() {
    return navigator.userAgent.match(/IEMobile/i);
  };

  util.isMobile = function() {
    return util.isAndroid() || util.isBlackBerry() || util.isiOS() || util.isOpera() || util.isWindows();
  };

  util.hasActiveX = function() {
    return window.ActiveXObject !== void 0;
  };

  util.hasJava = function() {
    return util.getJavaVersion();
  };

  util.getJavaVersion = function() {
    var mime, mimes, parts, t, version, _i, _len;
    if (util.isIE() && util.hasActiveX()) {
      if (util.isJavaWebStartInstalledActiveX('1.9.0')) {
        return '1.9.0';
      }
      if (util.isJavaWebStartInstalledActiveX('1.8.0')) {
        return '1.8.0';
      }
      if (util.isJavaWebStartInstalledActiveX('1.7.0')) {
        return '1.7.0';
      }
      if (util.isJavaWebStartInstalledActiveX('1.6.0')) {
        return '1.6.0';
      }
      if (util.isJavaWebStartInstalledActiveX('1.5.0')) {
        return '1.5.0';
      }
      if (util.isJavaWebStartInstalledActiveX('1.4.2')) {
        return '1.4.2';
      }
      return false;
    } else {
      version = 0;
      mimes = window.navigator.mimeTypes;
      if (mimes) {
        for (_i = 0, _len = mimes.length; _i < _len; _i++) {
          mime = mimes[_i];
          t = mime.type;
          if (t.indexOf('java') > 0 && t.indexOf('jpi') > 0 && t.indexOf('applet') > 0) {
            parts = t.split('=');
            version = parts[parts.length - 1];
          }
        }
      }
      return version;
    }
  };

  util.isJavaWebStartInstalledActiveX = function(version) {
    try {
      return util.hasActiveX() && (new ActiveXObject('JavaWebStart.isInstalled.' + version + '.0') !== null);
    } catch (error) {
      return false;
    }
  };

  util.isXD = function(url1, url2) {
    var handlerHost, host1, host2, thisHost;
    try {
      if (url2) {
        host1 = util.getHost(url1);
        host2 = util.getHost(url2);
        return util.compareHost(host1, host2);
      } else {
        if (!util._xdCache[url1]) {
          handlerHost = util.getHost(url1);
          thisHost = util.getHost();
          util._xdCache[url1] = util.compareHost(handlerHost, thisHost) ? 'y' : 'n';
        }
        return util._xdCache[url1] === 'y';
      }
    } catch (error) {
      return false;
    }
  };

  util.getHost = function(url) {
    var parsed;
    if (!url) {
      return util.getCurrentHost();
    }
    parsed = util.parseUrl(url);
    if (!parsed.protocol) {
      return util.getCurrentHost();
    }
    return parsed;
  };

  util.compareHost = function(host1, host2) {
    return host1.server !== host2.server || ((host1.port || host2.port) && host1.port !== host2.port);
  };

  util.getCurrentHost = function() {
    var l;
    l = document.location;
    return {
      protocol: l.protocol,
      server: l.hostname,
      port: l.port
    };
  };

  util.parseUrl = function(url) {
    var parts;
    parts = /(((http|ws)s?:)\/\/)?([\-\w\.\*]+)+(:(\d+))?(\/([^\?]*(\?\S+)?)?)?/i.exec(url);
    if (parts.length < 6) {
      throw new Error('Invalid URL (' + url + ').');
    }
    return {
      prefix: parts[1],
      protocol: parts[2],
      server: parts[4],
      postfix: parts[5],
      port: parts[6],
      path: parts[7]
    };
  };

  util.absolutizeUrl = function(url) {
    var base, l, parsed;
    if (!url) {
      return url;
    }
    parsed = util.parseUrl(url);
    if (parsed.protocol) {
      if (parsed.server.indexOf('*') === -1) {
        return url;
      }
      url = parsed.prefix + util.wildcard(parsed.server);
      if (parsed.postfix) {
        url += parsed.postfix;
      }
      if (parsed.path) {
        url += parsed.path;
      }
      return url;
    }
    l = document.location;
    base = l.protocol + '//' + l.host;
    if (url.charAt(0) === '/') {
      return base + url;
    } else {
      return base + l.pathname.substring(0, l.pathname.lastIndexOf('/') + 1) + url;
    }
  };

  util.wildcard = function(str) {
    return str.replace('*', util.getWildcard());
  };

  util._chars = 'abcdefghijklmnopqrstuvwxyz';

  util.getWildcard = function() {
    if (!util._wildcard) {
      util._wildcard = util.randomChar(util._chars);
    }
    return util._wildcard;
  };

  util.randomChar = function(str) {
    if (!str) {
      return str;
    }
    return str.charAt(Math.floor(Math.random() * str.length));
  };

  util.observe = function(element, event, handler) {
    if (element.addEventListener) {
      return element.addEventListener(event, handler, false);
    } else if (element.attachEvent) {
      return element.attachEvent('on' + event, handler);
    } else {
      return element['on' + event] = handler;
    }
  };

  util.unobserve = function(element, event, handler) {
    if (element.removeEventListener) {
      return element.removeEventListener(event, handler, false);
    } else {
      return element.detachEvent('on' + event, handler);
    }
  };

  util.observeAttr = function(element, handler) {
    var MutationObserver, isDOMAttrModifiedSupported, observer, options;
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    isDOMAttrModifiedSupported = function() {
      var flag, p;
      p = document.createElement('p');
      flag = false;
      if (p.addEventListener) {
        p.addEventListener('DOMAttrModified', function() {
          return flag = true;
        }, false);
      } else if (p.attachEvent) {
        p.attachEvent('onDOMAttrModified', function() {
          return flag = true;
        });
      } else {
        return false;
      }
      p.setAttribute('id', 'target');
      return flag;
    };
    if (MutationObserver) {
      options = {
        subtree: false,
        attributes: true
      };
      observer = new MutationObserver(function(mutations) {
        var mutation, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = mutations.length; _i < _len; _i++) {
          mutation = mutations[_i];
          _results.push(handler.call(mutation.target, mutation.attributeName));
        }
        return _results;
      });
      return observer.observe(element, options);
    } else if (isDOMAttrModifiedSupported()) {
      return element.on('DOMAttrModified', function(e) {
        return handler.call(element, e.attrName);
      });
    } else if (__indexOf.call(document.body, 'onpropertychange') >= 0) {
      return element.on('propertychange', function(e) {
        return handler.call(element, window.event.propertyName);
      });
    }
  };

  util.extend = function(dest, src) {
    var key;
    for (key in src) {
      dest[key] = src[key];
    }
    return dest;
  };

  util.logging = true;

  util.log = function(text) {
    var div;
    if (!util.logging) {
      return;
    }
    if (!document.body) {
      util.addOnLoad(function() {
        return util.log(text);
      });
      return;
    }
    if (!util._logContainer) {
      util._logContainer = document.createElement('div');
      util._logContainer.className = 'fm-log';
      util._logContainer.style.position = 'absolute';
      util._logContainer.style.zIndex = 99999;
      util._logContainer.style.right = '5px';
      util._logContainer.style.top = '5px';
      document.body.appendChild(util._logContainer);
    }
    div = document.createElement('div');
    div.innerHTML = text;
    return util._logContainer.appendChild(div);
  };

  util._loadFunctions = [];

  util.addOnLoad = function(fn) {
    if (util._readyRun) {
      return window.setTimeout(fn, 1);
    } else {
      return util._loadFunctions.push(fn);
    }
  };

  util.ready = function() {
    if (util._readyRun) {
      return;
    }
    util._readyRun = true;
    return window.setTimeout(function() {
      var loadFunction, _i, _len, _ref, _results;
      _ref = util._loadFunctions;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        loadFunction = _ref[_i];
        _results.push(loadFunction());
      }
      return _results;
    }, 1);
  };

  util.bindReady = function() {
    var topLevel;
    if (util._readyBound) {
      return;
    }
    util._readyBound = true;
    if (document.readyState === 'complete') {
      return window.setTimeout(function() {
        return util.ready();
      }, 1);
    } else if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", function() {
        document.removeEventListener("DOMContentLoaded", arguments.callee, false);
        return util.ready();
      }, false);
      return window.addEventListener("load", function() {
        window.removeEventListener("load", arguments.callee, false);
        return util.ready();
      }, false);
    } else if (document.attachEvent) {
      document.attachEvent("onreadystatechange", function() {
        if (document.readyState === "complete") {
          document.detachEvent("onreadystatechange", arguments.callee);
          return util.ready();
        }
      });
      try {
        topLevel = window.frameElement === null;
      } catch (_error) {}
      if (document.documentElement.doScroll && topLevel) {
        return (function() {
          if (util._loaded) {
            return;
          }
          try {
            document.documentElement.doScroll("left");
          } catch (error) {
            window.setTimeout(arguments.callee, 0);
            return;
          }
          return util.ready();
        })();
      }
    } else {
      return util.ready();
    }
  };

  if (!util._loaded) {
    util.addOnLoad(function() {
      return util._loaded = true;
    });
  }

  util.bindReady();

  return util;

}).call(this);



fm.mathAssistant = (function() {

  function mathAssistant() {}

  mathAssistant.getPi = function() {
    return Math.PI;
  };

  mathAssistant.getE = function() {
    return Math.E;
  };

  mathAssistant.abs = function(val) {
    return Math.abs(val);
  };

  mathAssistant.acos = function(val) {
    return Math.acos(val);
  };

  mathAssistant.asin = function(val) {
    return Math.asin(val);
  };

  mathAssistant.atan = function(val) {
    return Math.atan(val);
  };

  mathAssistant.atan2 = function(y, x) {
    return Math.atan2(y, x);
  };

  mathAssistant.ceil = function(val) {
    return Math.ceil(val);
  };

  mathAssistant.cos = function(val) {
    return Math.cos(val);
  };

  mathAssistant.cosh = function(val) {
    return (Math.exp(val) + Math.exp(-val)) / 2;
  };

  mathAssistant.exp = function(val) {
    return Math.exp(val);
  };

  mathAssistant.floor = function(val) {
    return Math.floor(val);
  };

  mathAssistant.log = function(val) {
    return Math.log(val);
  };

  mathAssistant.log10 = function(val) {
    return Math.log(val) / 2.302585092994046;
  };

  mathAssistant.max = function(val1, val2) {
    return Math.max(val1, val2);
  };

  mathAssistant.min = function(val1, val2) {
    return Math.min(val1, val2);
  };

  mathAssistant.pow = function(x, y) {
    return Math.pow(x, y);
  };

  mathAssistant.sin = function(val) {
    return Math.sin(val);
  };

  mathAssistant.sinh = function(val) {
    return (Math.exp(val) - Math.exp(-val)) / 2;
  };

  mathAssistant.sqrt = function(val) {
    return Math.sqrt(val);
  };

  mathAssistant.tan = function(val) {
    return Math.tan(val);
  };

  mathAssistant.tanh = function(val) {
    return (Math.exp(val) - Math.exp(-val)) / (Math.exp(val) + Math.exp(-val));
  };

  return mathAssistant;

}).call(this);



fm.global = (function() {

  function global() {}

  global.tryCast = function(x, t) {
    if (!x || x instanceof t) {
      return x;
    }
    return null;
  };

  global.tryCastArray = function(x) {
    if (!x || x instanceof Array) {
      return x;
    }
    return null;
  };

  global.tryCastObject = function(x) {
    if (!x || x instanceof Object) {
      return x;
    }
    return null;
  };

  global.tryCastString = function(x) {
    if (!x || typeof x === "string") {
      return x;
    }
    return null;
  };

  global.tryCastInt = function(x) {
    if (!x || !isNaN(parseInt(x))) {
      return x;
    }
    return null;
  };

  global.tryCastFloat = function(x) {
    if (!x || !isNaN(parseFloat(x))) {
      return x;
    }
    return null;
  };

  return global;

}).call(this);



fm.stringComparison = {
  CurrentCulture: 0,
  CurrentCultureIgnoreCase: 1,
  InvariantCulture: 2,
  InvariantCultureIgnoreCase: 3,
  Ordinal: 4,
  OrdinalIgnoreCase: 5
};




fm.dateTime = (function() {

  function dateTime() {
    this.getSecond = __bind(this.getSecond, this);

    this.getMinute = __bind(this.getMinute, this);

    this.getHour = __bind(this.getHour, this);

    this.getDay = __bind(this.getDay, this);

    this.getMonth = __bind(this.getMonth, this);

    this.getYear = __bind(this.getYear, this);

    this.toUniversalTime = __bind(this.toUniversalTime, this);

    this.getTicks = __bind(this.getTicks, this);

    var day, hour, minute, month, second, year;
    if (arguments.length === 1) {
      this._date = arguments[0];
    } else if (arguments.length === 6) {
      year = arguments[0];
      month = arguments[1];
      day = arguments[2];
      hour = arguments[3];
      minute = arguments[4];
      second = arguments[5];
      this._date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    } else {
      throw new Error('Unknown argument set.');
    }
  }

  dateTime.getNow = function() {
    return new fm.dateTime(new Date());
  };

  dateTime.getUtcNow = function() {
    return new fm.dateTime(new Date());
  };

  dateTime.prototype.getTicks = function() {
    return 621355968000000000 + this._date.getTime() * 10000;
  };

  dateTime.prototype.toUniversalTime = function() {
    return new fm.dateTime(this._date);
  };

  dateTime.prototype.getYear = function() {
    return this._date.getUTCFullYear();
  };

  dateTime.prototype.getMonth = function() {
    return this._date.getUTCMonth() + 1;
  };

  dateTime.prototype.getDay = function() {
    return this._date.getUTCDate();
  };

  dateTime.prototype.getHour = function() {
    return this._date.getUTCHours();
  };

  dateTime.prototype.getMinute = function() {
    return this._date.getUTCMinutes();
  };

  dateTime.prototype.getSecond = function() {
    return this._date.getUTCSeconds();
  };

  return dateTime;

}).call(this);



fm.byteCollection = (function() {

  byteCollection.prototype._buffer = null;

  function byteCollection(buffer) {
    if (buffer) {
      this._buffer = new Uint8Array(buffer);
    } else {
      this._buffer = new Uint8Array();
    }
  }

  byteCollection.prototype.count = function() {
    return this._buffer.length;
  };

  byteCollection.prototype.add = function(b) {
    var bufferA, newBuffer;
    bufferA = this._buffer;
    newBuffer = new Uint8Array(bufferA.length + 1);
    newBuffer.set(bufferA);
    newBuffer[bufferA.length] = b;
    return this._buffer = newBuffer;
  };

  byteCollection.prototype.addRange = function(buffer) {
    var bufferA, bufferB, byteCollection, newBuffer;
    byteCollection = fm.global.tryCast(buffer, fm.byteCollection);
    if (byteCollection) {
      buffer = byteCollection._buffer;
    }
    bufferA = this._buffer;
    bufferB = buffer;
    newBuffer = new Uint8Array(bufferA.length + bufferB.length);
    newBuffer.set(bufferA);
    newBuffer.set(bufferB, bufferA.length);
    return this._buffer = newBuffer;
  };

  byteCollection.prototype.removeRange = function(index, count) {
    var bufferA, bufferB, newBuffer;
    bufferA = this._buffer.subarray(0, index);
    bufferB = this._buffer.subarray(index + count);
    newBuffer = new Uint8Array(bufferA.length + bufferB.length);
    newBuffer.set(bufferA);
    newBuffer.set(bufferB, bufferA.length);
    return this._buffer = newBuffer;
  };

  byteCollection.prototype.insertRange = function(index, buffer) {
    var bufferA, bufferB, bufferC, byteCollection, newBuffer;
    byteCollection = fm.global.tryCast(buffer, fm.byteCollection);
    if (byteCollection) {
      buffer = byteCollection._buffer;
    }
    bufferA = this._buffer.subarray(0, index);
    bufferB = buffer;
    bufferC = this._buffer.subarray(index);
    newBuffer = new Uint8Array(bufferA.length + bufferB.length + bufferC.length);
    newBuffer.set(bufferA);
    newBuffer.set(bufferB, bufferA.length);
    newBuffer.set(bufferC, bufferA.length + bufferB.length);
    return this._buffer = newBuffer;
  };

  byteCollection.prototype.getRange = function(index, count) {
    var buffer;
    buffer = new Uint8Array(count);
    buffer.set(this._buffer.subarray(index, index + count));
    return buffer;
  };

  byteCollection.prototype.get = function(index) {
    return this._buffer[index];
  };

  byteCollection.prototype.toArray = function() {
    return new Uint8Array(this._buffer);
  };

  return byteCollection;

})();




fm.nameValueCollection = (function() {

  function nameValueCollection() {
    this.getAllKeys = __bind(this.getAllKeys, this);

    this.getKeys = __bind(this.getKeys, this);

    var n, v, _ref;
    this._value = {};
    if (arguments.length === 1) {
      _ref = arguments[0];
      for (n in _ref) {
        v = _ref[n];
        this._value[n] = v;
      }
    }
  }

  nameValueCollection.prototype.source = function() {
    return this._value;
  };

  nameValueCollection.prototype.get = function(name) {
    var n;
    for (n in this._value) {
      if (n.toLowerCase() === name.toLowerCase()) {
        return this._value[n];
      }
    }
    return null;
  };

  nameValueCollection.prototype.set = function(name, value) {
    var n;
    for (n in this._value) {
      if (n.toLowerCase() === name.toLowerCase()) {
        this._value[n] = value;
        return;
      }
    }
    return this._value[name] = value;
  };

  nameValueCollection.prototype.getCount = function() {
    var i, n;
    i = 0;
    for (n in this._value) {
      i++;
    }
    return i;
  };

  nameValueCollection.prototype.toHash = function() {
    return this._value;
  };

  nameValueCollection.prototype.getKeys = function() {
    return this.getAllKeys();
  };

  nameValueCollection.prototype.getAllKeys = function() {
    var k, keys;
    keys = [];
    for (k in this._value) {
      keys.push(k);
    }
    return keys;
  };

  return nameValueCollection;

})();



fm.stringBuilder = (function() {

  function stringBuilder() {
    this._value = '';
    if (arguments.length === 1) {
      this._value = arguments[0];
    }
  }

  stringBuilder.prototype.append = function(s) {
    this._value = this._value + s;
    return this;
  };

  stringBuilder.prototype.toString = function() {
    return this._value;
  };

  stringBuilder.prototype.getLength = function() {
    return this._value.length;
  };

  stringBuilder.prototype.remove = function(startIndex, length) {
    this._value = this._value.substring(0, startIndex) + this._value.substring(startIndex + length);
    return this;
  };

  return stringBuilder;

})();



fm.bitAssistant = (function() {

  function bitAssistant() {}

  bitAssistant.getIntegerBytesNetwork = function(value) {
    var buffer, r;
    buffer = new Uint8Array(4);
    r = value % 16777216;
    buffer[0] = (value - r) / 16777216;
    value = r;
    r = value % 65536;
    buffer[1] = (value - r) / 65536;
    value = r;
    r = value % 256;
    buffer[2] = (value - r) / 256;
    buffer[3] = r;
    return buffer;
  };

  bitAssistant.toIntegerNetwork = function(buffer, startIndex) {
    var b0, b1, b2, b3;
    b0 = buffer[startIndex];
    b1 = buffer[startIndex + 1];
    b2 = buffer[startIndex + 2];
    b3 = buffer[startIndex + 3];
    return 16777216 * b0 + 65536 * b1 + 256 * b2 + b3 * 1;
  };

  bitAssistant.copy = function(source, sourceIndex, destination, destinationIndex, length) {
    return destination.set(source.subarray(sourceIndex, sourceIndex + length), destinationIndex);
  };

  bitAssistant.subArray = function(array, offset, count) {
    var subarray;
    if (arguments.length === 2) {
      return bitAssistant.subArray(array, offset, array.length - offset);
    } else {
      subarray = new Uint8Array(count);
      bitAssistant.copy(array, offset, subarray, 0, count);
      return subarray;
    }
  };

  return bitAssistant;

}).call(this);



fm.uri = (function() {

  function uri() {}

  uri.escapeDataString = function(s) {
    return encodeURIComponent(s);
  };

  return uri;

})();



fm.guid = (function() {

  function guid() {
    if (arguments.length === 0) {
      this._guid = '00000000-0000-0000-0000-000000000000';
    } else {
      this._guid = arguments[0];
    }
  }

  guid.prototype.equals = function(guid) {
    if (guid) {
      return guid.toString() === this._guid;
    }
    return false;
  };

  guid.prototype.toString = function() {
    return this._guid;
  };

  guid.newGuid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r, v;
      r = Math.random() * 16 | 0;
      v = (c === 'x' ? r : r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  guid.empty = new guid();

  return guid;

}).call(this);



fm.holder = (function() {

  function holder(value) {
    this._value = value;
  }

  holder.prototype.getValue = function() {
    return this._value;
  };

  holder.prototype.setValue = function(value) {
    return this._value = value;
  };

  return holder;

})();



fm.delegate = (function() {

  function delegate() {}

  delegate.combine = function(a, b) {
    var chain, f, fn, self, _i, _j, _len, _len1, _ref, _ref1;
    if (!a) {
      return b;
    }
    if (!b) {
      return a;
    }
    self = this;
    chain = [];
    fn = function() {
      var f, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = chain.length; _i < _len; _i++) {
        f = chain[_i];
        _results.push(f.apply(self, arguments));
      }
      return _results;
    };
    if (a._chain) {
      _ref = a._chain;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        f = _ref[_i];
        chain.push(f);
      }
    } else {
      chain.push(a);
    }
    if (b._chain) {
      _ref1 = b._chain;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        f = _ref1[_j];
        chain.push(f);
      }
    } else {
      chain.push(b);
    }
    fn._chain = chain;
    return fn;
  };

  delegate.remove = function(source, value) {
    var f, i, _i, _len, _ref;
    if (!source || source === value) {
      return null;
    }
    if (source._chain) {
      _ref = source._chain;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        f = _ref[i];
        if (f === value) {
          source._chain.splice(i, 1);
          break;
        }
      }
    }
    return source;
  };

  return delegate;

})();




fm.stack = (function() {

  function stack() {
    this.peek = __bind(this.peek, this);

    this.pop = __bind(this.pop, this);

    this.push = __bind(this.push, this);
    this._list = [];
  }

  stack.prototype.push = function(o) {
    return this._list.push(o);
  };

  stack.prototype.pop = function() {
    return this._list.pop();
  };

  stack.prototype.peek = function() {
    if (this._list.length === 0) {
      return null;
    }
    return this._list[this._list.length - 1];
  };

  return stack;

})();



fm.managedThread = (function() {

  function managedThread() {}

  managedThread.currentThreadId = function() {
    return '0';
  };

  return managedThread;

}).call(this);



fm.deferrer = (function() {

  function deferrer() {}

  deferrer.defer = function(callback, timeout, state) {
    var _this = this;
    return window.setTimeout(function() {
      return callback(state);
    }, timeout);
  };

  return deferrer;

})();



fm.dateTimeStyles = {
  AssumeUniversal: 1,
  AdjustToUniversal: 2
};



fm.dateTimeFormatInfo = (function() {

  function dateTimeFormatInfo() {}

  dateTimeFormatInfo.getInvariantInfo = function() {
    return new fm.dateTimeFormatInfo();
  };

  return dateTimeFormatInfo;

}).call(this);



fm.convert = (function() {

  function convert() {}

  convert.toInt32 = function(s) {
    return s.charCodeAt();
  };

  return convert;

}).call(this);



fm.parseAssistant = (function() {

  function parseAssistant() {}

  parseAssistant.parseIntegerValue = function(s) {
    return parseInt(s);
  };

  parseAssistant.parseLongValue = function(s) {
    return parseInt(s);
  };

  parseAssistant.parseFloatValue = function(s) {
    return parseFloat(s);
  };

  parseAssistant.parseDoubleValue = function(s) {
    return parseFloat(s);
  };

  parseAssistant.parseDecimalValue = function(s) {
    return parseFloat(s);
  };

  parseAssistant.parseBooleanValue = function(s) {
    if (s.toLowerCase() === "true" || s.toLowerCase() === "y" || s === "1") {
      return true;
    } else {
      return false;
    }
  };

  parseAssistant.parseGuidValue = function(s) {
    return new fm.guid(s);
  };

  parseAssistant.tryParseIntegerValue = function(s, h) {
    if (isNaN(parseInt(s))) {
      return false;
    }
    h.setValue(parseInt(s));
    return true;
  };

  parseAssistant.tryParseLongValue = function(s, h) {
    if (isNaN(parseInt(s))) {
      return false;
    }
    h.setValue(parseInt(s));
    return true;
  };

  parseAssistant.tryParseFloatValue = function(s, h) {
    if (isNaN(parseFloat(s))) {
      return false;
    }
    h.setValue(parseFloat(s));
    return true;
  };

  parseAssistant.tryParseDoubleValue = function(s, h) {
    if (isNaN(parseFloat(s))) {
      return false;
    }
    h.setValue(parseFloat(s));
    return true;
  };

  parseAssistant.tryParseDecimalValue = function(s, h) {
    if (isNaN(parseFloat(s))) {
      return false;
    }
    h.setValue(parseFloat(s));
    return true;
  };

  parseAssistant.tryParseBooleanValue = function(s, h) {
    if (s.toLowerCase() === "true" || s.toLowerCase() === "y" || s === "1") {
      h.setValue(true);
    } else {
      h.setValue(false);
    }
    return true;
  };

  parseAssistant.tryParseGuidValue = function(s, h) {
    if (!(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.test(s))) {
      return false;
    }
    h.setValue(new fm.guid(s));
    return true;
  };

  return parseAssistant;

}).call(this);



fm.stringExtensions = (function() {

  function stringExtensions() {}

  stringExtensions.empty = '';

  stringExtensions.toString = function() {
    return arguments[0];
  };

  stringExtensions.trim = function(s) {
    return s.replace(/^\s+|\s+$/g, '');
  };

  stringExtensions.concat = function() {
    var s, x, _i, _j, _len, _len1, _ref;
    s = '';
    if (arguments.length === 1 && fm.util.isArray(arguments[0])) {
      _ref = arguments[0];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        s = s + x;
      }
    } else {
      for (_j = 0, _len1 = arguments.length; _j < _len1; _j++) {
        x = arguments[_j];
        s = s + x;
      }
    }
    return s;
  };

  stringExtensions.join = function(separator, array) {
    var i, sb, str, _i, _len;
    sb = new fm.stringBuilder();
    for (i = _i = 0, _len = array.length; _i < _len; i = ++_i) {
      str = array[i];
      if (i > 0) {
        sb.append(separator);
      }
      sb.append(str);
    }
    return sb.toString();
  };

  stringExtensions.split = function(s, chars) {
    var c, i, splits, start, _i, _j, _len, _ref;
    splits = [];
    start = 0;
    for (i = _i = 0, _ref = s.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      for (_j = 0, _len = chars.length; _j < _len; _j++) {
        c = chars[_j];
        if (c === s.charAt(i)) {
          splits.push(s.substring(start, i));
          start = i + 1;
        }
      }
    }
    splits.push(s.substring(start, s.length));
    return splits;
  };

  stringExtensions.isNullOrEmpty = function(s) {
    return typeof s === 'undefined' || s === null || s === "";
  };

  stringExtensions.indexOf = function() {
    var s, str, stringComparison;
    str = arguments[0];
    s = arguments[1];
    if (arguments.length > 2) {
      stringComparison = arguments[2];
      if (stringComparison === fm.stringComparison.CurrentCultureIgnoreCase || stringComparison === fm.stringComparison.InvariantCultureIgnoreCase || stringComparison === fm.stringComparison.OrdinalIgnoreCase) {
        return str.toLowerCase().indexOf(s.toLowerCase());
      }
    }
    return str.indexOf(s);
  };

  stringExtensions.startsWith = function() {
    var s, str, stringComparison;
    str = arguments[0];
    s = arguments[1];
    if (arguments.length > 2) {
      stringComparison = arguments[2];
      if (stringComparison === fm.stringComparison.CurrentCultureIgnoreCase || stringComparison === fm.stringComparison.InvariantCultureIgnoreCase || stringComparison === fm.stringComparison.OrdinalIgnoreCase) {
        return str.toLowerCase().indexOf(s.toLowerCase()) === 0;
      }
    }
    return str.indexOf(s) === 0;
  };

  stringExtensions.endsWith = function() {
    var s, str, stringComparison;
    str = arguments[0];
    s = arguments[1];
    if (arguments.length > 2) {
      stringComparison = arguments[2];
      if (stringComparison === fm.stringComparison.CurrentCultureIgnoreCase || stringComparison === fm.stringComparison.InvariantCultureIgnoreCase || stringComparison === fm.stringComparison.OrdinalIgnoreCase) {
        return str.toLowerCase().indexOf(s.toLowerCase(), str.length - s.length) !== -1;
      }
    }
    return str.indexOf(s, str.length - s.length) !== -1;
  };

  stringExtensions.compareTo = function() {
    var s1, s2;
    s1 = arguments[0];
    s2 = arguments[1];
    if (s1.toString() < s2.toString()) {
      return -1;
    }
    if (s1.toString() > s2.toString()) {
      return 1;
    }
    return 0;
  };

  stringExtensions.format = function() {
    var args, format, formatter, i, _i, _ref;
    format = arguments[0];
    args = [];
    if (arguments.length > 1) {
      if (fm.util.isArray(arguments[1])) {
        args = arguments[1];
      } else {
        for (i = _i = 1, _ref = arguments.length - 1; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
          args.push(arguments[i] ? arguments[i] : '');
        }
      }
    }
    formatter = function(match, number) {
      if (args[number] != null) {
        return args[number];
      }
      return match;
    };
    return format.replace(/{(\d+)}/g, formatter);
  };

  stringExtensions.toLower = function() {
    return arguments[0].toLowerCase();
  };

  stringExtensions.toUpper = function() {
    return arguments[0].toUpperCase();
  };

  stringExtensions.getLength = function() {
    return arguments[0].length;
  };

  stringExtensions.getChars = function(str) {
    var chars, i, _i, _ref;
    chars = [];
    for (i = _i = 0, _ref = str.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      chars.push(str[i]);
    }
    return chars;
  };

  stringExtensions.substring = function(str, startIndex, length) {
    return str.substring(startIndex, startIndex + length);
  };

  return stringExtensions;

}).call(this);



fm.arrayExtensions = (function() {

  function arrayExtensions() {}

  arrayExtensions.getCount = function(array) {
    return array.length;
  };

  arrayExtensions.add = function(array, value) {
    return array.push(value);
  };

  arrayExtensions.remove = function(array, value) {
    var i, obj, _i, _len;
    for (i = _i = 0, _len = array.length; _i < _len; i = ++_i) {
      obj = array[i];
      if (obj === value) {
        array.splice(i, 1);
        return true;
      }
    }
    return false;
  };

  arrayExtensions.toArray = function(array) {
    return array;
  };

  arrayExtensions.clear = function(array) {
    return array.splice(0, array.length);
  };

  arrayExtensions.addRange = function(array, values) {
    var v, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = values.length; _i < _len; _i++) {
      v = values[_i];
      _results.push(array.push(v));
    }
    return _results;
  };

  arrayExtensions.contains = function(array, value) {
    var obj, _i, _len;
    for (_i = 0, _len = array.length; _i < _len; _i++) {
      obj = array[_i];
      if (obj === value) {
        return true;
      }
    }
    return false;
  };

  return arrayExtensions;

}).call(this);



fm.hashExtensions = (function() {

  function hashExtensions() {}

  hashExtensions.getCount = function(obj) {
    var i, k;
    i = 0;
    for (k in obj) {
      i++;
    }
    return i;
  };

  hashExtensions.getKeys = function(obj) {
    var k, keys;
    keys = [];
    for (k in obj) {
      keys.push(k);
    }
    return keys;
  };

  hashExtensions.getValues = function(obj) {
    var k, v, values;
    values = [];
    for (k in obj) {
      v = obj[k];
      values.push(v);
    }
    return values;
  };

  hashExtensions.tryGetValue = function(obj, key, holder) {
    if (hashExtensions.containsKey(obj, key)) {
      holder.setValue(obj[key]);
      return true;
    }
    return false;
  };

  hashExtensions.containsKey = function(obj, key) {
    if (key in obj) {
      return true;
    } else {
      return false;
    }
  };

  hashExtensions.containsValue = function(obj, value) {
    var k, v;
    for (k in obj) {
      v = obj[k];
      if (v === value) {
        return true;
      }
    }
    return false;
  };

  hashExtensions.add = function(obj, key, value) {
    return obj[key] = value;
  };

  hashExtensions.remove = function(obj, key) {
    return delete obj[key];
  };

  hashExtensions.clear = function(obj) {
    var key, _results;
    _results = [];
    for (key in obj) {
      _results.push(delete obj[key]);
    }
    return _results;
  };

  return hashExtensions;

}).call(this);



fm.intExtensions = (function() {

  function intExtensions() {}

  intExtensions.toString = function() {
    return arguments[0].toString();
  };

  return intExtensions;

})();



fm.xhr = (function() {
  var _this = this;

  function xhr() {}

  xhr._count = 0;

  xhr._current = {};

  xhr._disableBinary = false;

  xhr.setDisableBinary = function(disableBinary) {
    return xhr._disableBinary = disableBinary;
  };

  xhr.getDisableBinary = function() {
    if (typeof Uint8Array === 'undefined') {
      return true;
    }
    return xhr._disableBinary;
  };

  fm.util.observe(window, 'unload', function() {
    var c, x, _ref;
    _ref = xhr._current;
    for (c in _ref) {
      x = _ref[c];
      try {
        x._abortingOnUnload = true;
        x.abort();
      } catch (_error) {}
    }
  });

  xhr.failureHandler = function(options, message) {
    if (options.onFailure) {
      return options.onFailure({
        message: message
      });
    }
  };

  xhr.successHandler = function(options, x) {
    var content, contentBinary, headerString, headers, line, name, parts, receivedBinary, value, _i, _len, _ref;
    if (options.onSuccess) {
      headers = {};
      headerString = x.getAllResponseHeaders();
      if (headerString) {
        _ref = headerString.split(/\r?\n/);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          line = _ref[_i];
          parts = line.split(':');
          if (parts.length !== 2) {
            continue;
          }
          name = parts[0].replace(/\s+$/, '');
          value = parts[1].replace(/^\s+/, '');
          headers[name] = value;
        }
      }
      content = null;
      contentBinary = null;
      receivedBinary = false;
      if (!xhr.getDisableBinary()) {
        try {
          if (x.responseType === 'arraybuffer') {
            contentBinary = new Uint8Array(x.response);
            if (headers['Content-Type'] !== 'application/octet-stream') {
              content = fm.encoding.getUtf8().getString(contentBinary);
            }
            receivedBinary = true;
          }
        } catch (error) {
          xhr.setDisableBinary(true);
        }
      }
      if (receivedBinary) {
        if (content) {
          fm.log.debug('Received XHR text (binary).');
        } else {
          fm.log.debug('Received XHR binary.');
        }
      } else {
        content = x.responseText;
        fm.log.debug('Received XHR text.');
      }
      return options.onSuccess({
        content: content,
        contentBinary: contentBinary,
        statusCode: x.status,
        headers: headers
      });
    }
  };

  xhr.handler = function(options, x) {
    if (x._aborting) {
      return xhr.failureHandler(options, 'XHR request timed out.');
    } else {
      if (options.onResponseReceived) {
        options.onResponseReceived(x);
      }
      return xhr.successHandler(options, x);
    }
  };

  xhr.send = function(options) {
    var c, name, sentBinary, url, value, x, xhrTimeout, _ref;
    options = fm.util.extend({
      sync: false,
      url: '',
      method: 'POST',
      content: null,
      contentBinary: null,
      headers: {},
      timeout: 15000,
      abortOnUnload: false,
      cacheBusterParameterName: '_cb',
      onRequestCreated: function() {},
      onResponseReceived: function() {},
      onFailure: function() {},
      onSuccess: function() {}
    }, options || {});
    try {
      if (window.XMLHttpRequest) {
        x = new XMLHttpRequest();
      } else {
        try {
          x = new ActiveXObject('MSXML2.XMLHTTP.3.0');
        } catch (_error) {}
        if (!x) {
          try {
            x = new ActiveXObject('Microsoft.XMLHTTP');
          } catch (_error) {}
        }
      }
      if (!x) {
        return false;
      }
      url = options.url;
      if (options.method === 'GET') {
        url = url + (url.indexOf('?') === -1 ? '?' : '&') + options.cacheBusterParameterName + '=' + (new Date()).getTime();
      }
      x.open(options.method, url, !options.sync);
      _ref = options.headers;
      for (name in _ref) {
        value = _ref[name];
        if (name.toLowerCase() !== 'referer' && name.toLowerCase() !== 'origin') {
          x.setRequestHeader(name, value);
        }
      }
      if (xhr.getDisableBinary()) {
        x.setRequestHeader('X-FM-DisableBinary', 'true');
      }
      if ('withCredentials' in x) {
        x.withCredentials = true;
      }
      if (!xhr.getDisableBinary() && !options.sync) {
        try {
          x.responseType = 'arraybuffer';
        } catch (error) {
          xhr.setDisableBinary(true);
        }
      }
      if (options.onRequestCreated) {
        options.onRequestCreated(x);
      }
      if (options.abortOnUnload) {
        c = ++xhr._count;
        xhr._current[c] = x;
      }
      if (!options.sync) {
        x.onreadystatechange = function() {
          if (x.readyState > 3 && !x._abortingOnUnload) {
            clearTimeout(xhrTimeout);
            try {
              x.onreadystatechange = null;
            } catch (ex) {
              x.onreadystatechange = function() {};
            }
            if (x.status > 0) {
              xhr.handler(options, x);
            } else {
              xhr.failureHandler(options, 'Invalid XHR response.');
            }
            if (options.abortOnUnload) {
              return delete xhr._current[c];
            }
          }
        };
      }
      sentBinary = false;
      if (!xhr.getDisableBinary() && options.contentBinary) {
        try {
          x.send(options.contentBinary.buffer);
          sentBinary = true;
        } catch (error1) {
          try {
            x.send(options.contentBinary);
            sentBinary = true;
          } catch (error2) {
            xhr.setDisableBinary(true);
          }
        }
      }
      if (sentBinary) {
        fm.log.debug('Sent XHR binary.');
      } else {
        if (options.content) {
          x.setRequestHeader('Content-Type', 'application/json');
          x.send(options.content);
        } else {
          x.send();
        }
        fm.log.debug('Sent XHR text.');
      }
      xhrTimeout = window.setTimeout(function() {
        try {
          x._aborting = true;
          return x.abort();
        } catch (_error) {}
      }, options.timeout);
      if (options.sync) {
        xhr.handler(options, x);
        if (options.abortOnUnload) {
          delete xhr._xhrCurrent[c];
        }
      }
      return true;
    } catch (error) {
      return xhr.failureHandler(options, 'XHR request failed. ' + (error.message || error.error || error.description || error));
    }
  };

  return xhr;

}).call(this);



fm.postMessage = (function() {

  function postMessage() {}

  postMessage._cache = {};

  postMessage.createFrame = function(options, callback) {
    var activateFrame, callbacks, frame, loadTimeout, record;
    record = postMessage._cache[options.frameUrl];
    if (!record) {
      frame = document.createElement('iframe');
      frame.style.display = 'none';
      document.body.appendChild(frame);
      callbacks = [callback];
      frame.loading = true;
      postMessage._cache[options.frameUrl] = record = {
        frame: frame,
        callbacks: callbacks
      };
      loadTimeout = window.setTimeout(function() {
        var _results;
        frame.loading = false;
        frame.loaded = false;
        frame.timedOut = true;
        _results = [];
        while (callbacks.length > 0) {
          _results.push(callbacks.shift()(null, 'Frame load timed out.'));
        }
        return _results;
      }, options.timeout);
      activateFrame = null;
      fm.util.observe(frame, 'load', function() {
        var pongTimeout, receivePong;
        if (frame.timedOut) {
          return;
        }
        clearTimeout(loadTimeout);
        receivePong = function(e) {
          if (e.source === frame.contentWindow && e.data === 'pong') {
            if (frame.timedOut) {
              return;
            }
            clearTimeout(pongTimeout);
            frame.loading = false;
            frame.loaded = true;
            frame.timedOut = false;
            postMessage.listen(options, frame);
            while (callbacks.length > 0) {
              callbacks.shift()(frame);
            }
            return fm.util.unobserve(window, 'message', receivePong);
          }
        };
        pongTimeout = window.setTimeout(function() {
          frame.loading = false;
          frame.loaded = false;
          frame.timedOut = true;
          while (callbacks.length > 0) {
            callbacks.shift()(null, 'Frame pong timed out.');
          }
          if (receivePong) {
            return fm.util.unobserve(window, 'message', receivePong);
          }
        }, 500);
        fm.util.observe(window, 'message', receivePong);
        return frame.contentWindow.postMessage('ping', postMessage.getOrigin(options.url));
      });
      return frame.src = fm.httpTransfer.addQueryToUrl(options.frameUrl, 'type', 'pmf');
    } else {
      if (record.frame.loading) {
        return record.callbacks.push(callback);
      } else {
        return window.setTimeout(function() {
          if (record.frame.loaded) {
            return callback(record.frame);
          } else {
            return callback(null, 'Frame not loaded.');
          }
        }, 1);
      }
    }
  };

  postMessage._optionsCounter = 0;

  postMessage._optionsCache = {};

  postMessage.getOrigin = function(url) {
    return /\w+:\/\/[^/]+/.exec(url)[0];
  };

  postMessage.send = function(options) {
    options = fm.util.extend({
      url: '',
      onFailure: function() {},
      onSuccess: function() {},
      onRequestCreated: function() {},
      onResponseReceived: function() {}
    }, options || {});
    options.contentBinary = null;
    return postMessage.createFrame(options, function(frame, error) {
      var message;
      if (frame) {
        options.id = ++postMessage._optionsCounter;
        postMessage._optionsCache[options.id] = options;
        return frame.contentWindow.postMessage(fm.json.serialize(options), postMessage.getOrigin(options.url));
      } else {
        if (options.onFailure) {
          message = 'Could not initialize postMessage frame.';
          if (error) {
            message += ' ' + error;
          }
          return options.onFailure({
            message: message,
            local: true
          });
        }
      }
    });
  };

  postMessage.listen = function(options, frame) {
    return fm.util.observe(window, 'message', function(e) {
      if (e.source === frame.contentWindow) {
        try {
          e = fm.json.deserialize(e.data);
        } catch (err) {
          return;
        }
        if (!e.id) {
          return;
        }
        options = postMessage._optionsCache[e.id];
        if (!options) {
          return;
        }
        if (e.type === 1 || e.type === 2) {
          delete postMessage._optionsCache[e.id];
        }
        if (e.type === 1) {
          if (options.onFailure) {
            return options.onFailure(e);
          }
        } else if (e.type === 2) {
          if (options.onSuccess) {
            return options.onSuccess(e);
          }
        } else if (e.type === 3) {
          if (options.onRequestCreated) {
            return options.onRequestCreated(null);
          }
        } else if (e.type === 4) {
          if (options.onResponseReceived) {
            return options.onResponseReceived(null);
          }
        }
      }
    });
  };

  return postMessage;

}).call(this);



fm.jsonp = (function() {

  function jsonp() {}

  jsonp.send = function(options) {};

  jsonp._scriptFrame = null;

  jsonp._scriptFrameLoaded = false;

  jsonp._callbackCount = 0;

  jsonp._cb = {};

  jsonp._pastScriptFrames = [];

  jsonp._scriptFrameDestroyer = null;

  jsonp.maxUrlLength = 2048;

  jsonp.getNextCallback = function(options) {
    var name, namespace;
    name = 'cb' + (jsonp._callbackCount++);
    namespace = 'fm.jsonp._cb.';
    jsonp._cb[name] = function(response) {
      var content;
      try {
        fm.log.debug('Received JSON-P text.');
        if (options.onResponseReceived) {
          options.onResponseReceived(null);
        }
        if (options.onSuccess) {
          if (options.robustResponse) {
            content = response[options.contentParameterName];
            if (!content) {
              content = '';
            } else if (typeof content !== 'string') {
              content = fm.json.serialize(content);
            }
            return options.onSuccess({
              content: content,
              statusCode: response[options.statusCodeParameterName] || 200,
              headers: response[options.headersParameterName] || {}
            });
          } else {
            content = response;
            if (!content) {
              content = '';
            } else if (typeof content !== 'string') {
              content = fm.json.serialize(content);
            }
            return options.onSuccess({
              content: content,
              statusCode: 200,
              headers: {}
            });
          }
        }
      } catch (error) {
        throw error;
      } finally {
        jsonp.cleanup((options.useFrame ? 'parent.' : '') + namespace + name, options.useFrame);
      }
    };
    return (options.useFrame ? 'parent.' : '') + namespace + name;
  };

  jsonp.failureHandler = function(options, callbackName, message) {
    if (options.onFailure) {
      options.onFailure({
        message: message
      });
    }
    return jsonp.cleanup(callbackName, options.useFrame);
  };

  jsonp.send = function(options) {
    var callbackName, container, doc, script, url;
    try {
      options = fm.util.extend({
        url: '',
        method: 'POST',
        content: null,
        headers: {},
        timeout: 15000,
        canSegmentJsonArray: false,
        robustResponse: false,
        callbackParameterName: 'jsonp',
        contentParameterName: 'content',
        methodParameterName: 'method',
        headersParameterName: 'headers',
        statusCodeParameterName: 'statusCode',
        cacheBusterParameterName: '_cb',
        onRequestCreated: function() {},
        onResponseReceived: function() {},
        onFailure: function() {},
        onSuccess: function() {}
      }, options || {});
      options.useFrame = true;
      callbackName = jsonp.getNextCallback(options);
      if (options.useFrame) {
        if (!jsonp._scriptFrameDestroyer) {
          jsonp._scriptFrameDestroyer = window.setInterval(function() {
            var prop, _i, _len, _ref;
            if (jsonp._scriptFrame !== null) {
              jsonp._pastScriptFrames.push(jsonp._scriptFrame);
              jsonp._scriptFrame = null;
              jsonp._scriptFrameLoaded = false;
              if (jsonp._pastScriptFrames.length === 2) {
                _ref = jsonp._pastScriptFrames[0];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  prop = _ref[_i];
                  delete jsonp._pastScriptFrames[0][prop];
                }
                document.body.removeChild(jsonp._pastScriptFrames[0]);
                return jsonp._pastScriptFrames.splice(0, 1);
              }
            }
          }, 300000);
        }
      }
      container = document.getElementsByTagName('head')[0];
      if (options.useFrame) {
        if (!jsonp._scriptFrame) {
          jsonp._scriptFrame = document.createElement('iframe');
          jsonp._scriptFrame.style.display = 'none';
          jsonp._scriptFrame.src = 'PLEASE_IGNORE_THIS_404.htm';
          document.body.appendChild(jsonp._scriptFrame);
        }
        doc = jsonp._scriptFrame.contentWindow.document;
        if (!doc) {
          throw 'Could not create script frame.';
        }
        script = doc.createElement('script');
      } else {
        script = document.createElement('script');
      }
      script.type = 'text/javascript';
      script.charset = 'utf-8';
      script.id = callbackName;
      url = options.url;
      url = fm.httpTransfer.addQueryToUrl(url, options.methodParameterName, options.method);
      url = fm.httpTransfer.addQueryToUrl(url, options.headersParameterName, fm.json.serialize(options.headers));
      url = fm.httpTransfer.addQueryToUrl(url, options.callbackParameterName, callbackName);
      url = fm.httpTransfer.addQueryToUrl(url, options.cacheBusterParameterName, (new Date()).getTime());
      url = fm.httpTransfer.addQueryToUrl(url, options.contentParameterName, options.content);
      if (url.length > jsonp.maxUrlLength) {
        alert('URL length ' + url.length + ' exceeds maximum for JSON-P (' + jsonp.maxUrlLength + ').');
      }
      script.src = url;
      if (options.onRequestCreated) {
        options.onRequestCreated(null);
      }
      window.setTimeout(function() {
        if (jsonp.callbackExists(callbackName)) {
          return jsonp.failureHandler(options, callbackName, 'JSONP request timed out.');
        }
      }, options.timeout);
      if (options.useFrame) {
        if (!jsonp._scriptFrameLoaded) {
          return fm.util.observe(jsonp._scriptFrame, 'load', function() {
            window.setTimeout(function() {
              try {
                container = jsonp._scriptFrame.contentWindow.document.body;
                container.appendChild(script);
                return fm.log.debug('Sent JSON-P text.');
              } catch (error) {
                return jsonp.failureHandler(options, callbackName, 'JSONP request failed. Could not access script frame.');
              }
            }, 10);
            return jsonp._scriptFrameLoaded = true;
          });
        } else {
          try {
            container = jsonp._scriptFrame.contentWindow.document.body;
            container.appendChild(script);
            return fm.log.debug('Sent JSON-P text.');
          } catch (error) {
            return jsonp.failureHandler(options, callbackName, 'JSONP request failed. Could not access script frame.');
          }
        }
      } else {
        container.appendChild(script);
        return fm.log.debug('Sent JSON-P text.');
      }
    } catch (error) {
      return jsonp.failureHandler(options, callbackName, 'JSONP request failed. ' + (error.message || error.error || error.description || error));
    }
  };

  jsonp.cleanup = function(callbackName, useFrame) {
    var doc, i, name, parts, script, scriptFrames, _i, _ref;
    parts = callbackName.split('.');
    name = parts[parts.length - 1];
    jsonp._cb[name] = null;
    delete jsonp._cb[name];
    try {
      if (useFrame) {
        scriptFrames = jsonp._pastScriptFrames.concat([]);
        if (jsonp._scriptFrame !== null) {
          scriptFrames.push(jsonp._scriptFrame);
        }
        for (i = _i = _ref = scriptFrames.length - 1; _ref <= 0 ? _i <= 0 : _i >= 0; i = _ref <= 0 ? ++_i : --_i) {
          doc = scriptFrames[i].contentWindow.document;
          if (doc) {
            script = doc.getElementById(callbackName);
          }
          if (script) {
            break;
          }
        }
        if (script) {
          return doc.body.removeChild(script);
        }
      } else {
        script = document.getElementById(callbackName);
        if (script) {
          return document.getElementsByTagName('head')[0].removeChild(script);
        }
      }
    } catch (error) {
      if (window && window.console && window.console.error) {
        return window.console.error('Could not remove script element. ' + (error.message || error.error || error.description || error));
      }
    }
  };

  jsonp.callbackExists = function(callbackName) {
    var name, parts;
    parts = callbackName.split('.');
    name = parts[parts.length - 1];
    return name in jsonp._cb;
  };

  return jsonp;

}).call(this);


/*<span id='cls-fm.json'>&nbsp;</span>
*/

/**
@class fm.json
 <div>
 Provides Json serialize and deserialize methods for all browsers. It will also
 turn strings with form <code>"/Date(xxxxxxxxxx-xxxx)"</code> (Microsoft date serialization format) into actual dates. 
 </div>
*/

fm.json = (function() {
  /*<span id='prop-fm.json-useMicrosoftDateFormat'>&nbsp;</span>
  */

  /**
   <div>
      When true, will deserialize "/Date(0000000000-000)" to a Date.
      (default: true)
   </div>
  
  @field useMicrosoftDateFormat
  @type {Boolean}
  */

  function json() {}

  json.useMicrosoftDateFormat = true;

  json._dateRegex = /^\/Date\((\d+[\-|\+]?\d{0,4})\)\/$/;

  json._reviver = function(key, value) {
    var delim, parts, ticks, ticksAndZone;
    if (value && typeof value === 'string' && json._dateRegex.test(value)) {
      ticksAndZone = value.match(json._dateRegex)[1];
      delim = ticksAndZone.indexOf('-') > -1 ? '-' : '+';
      parts = ticksAndZone.split(delim);
      ticks = parseInt(parts[0], 10);
      return new Date(ticks);
    }
    return value;
  };

  json._build_reviver = function(reviver) {
    var _this = this;
    if (this.useMicrosoftDateFormat) {
      if (reviver != null) {
        return function(key, value) {
          return reviver(key, _this._reviver(key, value));
        };
      } else {
        return this._reviver;
      }
    } else {
      return reviver;
    }
  };

  Date.prototype.toJSONFM = function(key) {
    if (isFinite(this.valueOf())) {
      return '/Date(' + this.getTime() + '-0000)/';
    } else {
      return null;
    }
  };

  /*<span id='method-fm.json-deserialize'>&nbsp;</span>
  */


  /**
   <div>
   Parses a JSON string into a JavaScript object. 
   </div>
  @function deserialize
  @param {string} json the JSON string to deserialize.
  @param {function} [reviver] function called for every key and value at every level of the final result. Each value will be replaced by the result of the reviver function. This can be used to reform generic objects into instances of pseudoclasses, or to transform date strings into Date objects. 
  @return {object} The deserialized object
  */


  json.deserialize = function() {
    var args;
    args = Array.prototype.slice.call(arguments);
    if (args.length === 0 || args[0] === null || args[0] === '') {
      return null;
    }
    args[1] = json._build_reviver(args[1]);
    return JSON.parse.apply(json, args);
  };

  /*<span id='method-fm.json-serialize'>&nbsp;</span>
  */


  /**
   <div>
   Serializes an object into its JSON representation. If useMicrosoftDateFormat is true, Dates are converted to the microsoft format (prior to being passed to any)
   </div>
  @function serialize
  @param {object} object The object to serialize
  @param {function|array} [replacer] This function will be called after the toJSON method (if there is one) on each of the values in the structure. It will be passed each key and value as parameters, and this will be bound to object holding the key. The value returned will be stringified. If replacer is an array, the array's values indicate the names of the properties in the object that should be included in the resulting JSON string.
  @return {string} The serialized represenation
  */


  json.serialize = function() {
    var booleanToJSON, dateToJSON, j, numberToJSON, stringToJSON;
    if (json.useMicrosoftDateFormat) {
      dateToJSON = Date.prototype.toJSON;
      stringToJSON = String.prototype.toJSON;
      numberToJSON = Number.prototype.toJSON;
      booleanToJSON = Boolean.prototype.toJSON;
      Date.prototype.toJSON = Date.prototype.toJSONFM;
      String.prototype.toJSON = String.prototype.toJSONFM;
      Number.prototype.toJSON = Number.prototype.toJSONFM;
      Boolean.prototype.toJSON = Boolean.prototype.toJSONFM;
      j = JSON.stringify.apply(json, arguments).replace(/\//g, '\\/');
      Date.prototype.toJSON = dateToJSON;
      String.prototype.toJSON = stringToJSON;
      Number.prototype.toJSON = numberToJSON;
      Boolean.prototype.toJSON = booleanToJSON;
      return j;
    }
    return JSON.stringify.apply(json, arguments);
  };

  return json;

}).call(this);



fm.asyncException = (function() {

  function asyncException() {}

  asyncException.asyncThrow = function(ex, source) {
    var message;
    message = 'An exception in user code (' + source + ') was unhandled.';
    fm.log.error(message, ex);
    return window.setTimeout(function() {
      throw ex;
    }, 1);
  };

  return asyncException;

}).call(this);




fm.timeoutTimer = (function() {

  timeoutTimer.prototype._timer = null;

  timeoutTimer.prototype._callback = null;

  timeoutTimer.prototype._state = null;

  function timeoutTimer(callback, state) {
    this._timerCallback = __bind(this._timerCallback, this);

    this.stop = __bind(this.stop, this);

    this.start = __bind(this.start, this);
    this._callback = callback;
    this._state = state;
  }

  timeoutTimer.prototype.start = function(timeout) {
    if (this._timer) {
      throw new Error('Timer is currently active.');
    }
    return this._timer = setTimeout(this._timerCallback, timeout);
  };

  timeoutTimer.prototype.stop = function() {
    if (!this._timer) {
      return false;
    }
    clearTimeout(this._timer);
    this._timer = null;
    return true;
  };

  timeoutTimer.prototype._timerCallback = function() {
    if (this.stop() && this._callback) {
      return this._callback(this._state);
    }
  };

  return timeoutTimer;

})();



fm.base64 = (function() {

  function base64() {}

  base64.b64ToUint6 = function(cc) {
    if (cc > 64 && cc < 91) {
      return cc - 65;
    } else if (cc > 96 && cc < 123) {
      return cc - 71;
    } else if (cc > 47 && cc < 58) {
      return cc + 4;
    } else if (cc === 43) {
      return 62;
    } else if (cc === 47) {
      return 63;
    } else {
      return 0;
    }
  };

  base64.decode = function(str64, blocksSize) {
    var bi, blen, bytes, mod3, mod4, n, si, slen, str, _i, _ref;
    if (typeof Uint8Array === 'undefined') {
      return null;
    }
    str = str64.replace(/[^A-Za-z0-9\+\/]/g, '');
    slen = str.length;
    blen = blocksSize ? Math.ceil((slen * 3 + 1 >> 2) / blocksSize) * blocksSize : slen * 3 + 1 >> 2;
    bytes = new Uint8Array(blen);
    n = 0;
    bi = 0;
    for (si = _i = 0, _ref = slen - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; si = 0 <= _ref ? ++_i : --_i) {
      mod4 = si & 3;
      n |= this.b64ToUint6(str.charCodeAt(si)) << 18 - 6 * mod4;
      if (mod4 === 3 || slen - si === 1) {
        mod3 = 0;
        while ((mod3 < 3) && (bi < blen)) {
          bytes[bi] = n >>> (16 >>> mod3 & 24) & 255;
          mod3++;
          bi++;
        }
        n = 0;
      }
    }
    return bytes;
  };

  base64.uint6ToB64 = function(b) {
    if (b < 26) {
      return b + 65;
    } else if (b < 52) {
      return b + 71;
    } else if (b < 62) {
      return b - 4;
    } else if (b === 62) {
      return 43;
    } else if (b === 63) {
      return 47;
    } else {
      return 65;
    }
  };

  base64.encode = function(bytes) {
    var bi, blen, mod3, n, str, _i, _ref;
    if (typeof Uint8Array === 'undefined') {
      return null;
    }
    str = '';
    blen = bytes.length;
    n = 0;
    for (bi = _i = 0, _ref = blen - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; bi = 0 <= _ref ? ++_i : --_i) {
      mod3 = bi % 3;
      n |= bytes[bi] << (16 >>> mod3 & 24);
      if (mod3 === 2 || bytes.length - bi === 1) {
        str += String.fromCharCode(this.uint6ToB64(n >>> 18 & 63), this.uint6ToB64(n >>> 12 & 63), this.uint6ToB64(n >>> 6 & 63), this.uint6ToB64(n & 63));
        n = 0;
      }
    }
    return str.replace(/A(?=A$|$)/g, '=');
  };

  return base64;

})();



fm.encoding = (function() {

  function encoding() {}

  encoding.getUtf8 = function() {
    return new fm.encoding();
  };

  encoding.prototype.getString = function(bytes, index, count) {
    var c, i, s, str;
    if (!bytes) {
      return null;
    }
    if (typeof index === 'undefined') {
      index = 0;
    }
    if (typeof count === 'undefined') {
      count = bytes.length;
    }
    str = '';
    i = index;
    while (i < (index + count)) {
      if (bytes[i] <= 0x7f) {
        c = bytes[i];
      } else {
        if ((bytes[i] >> 5) === 0x6) {
          c = ((bytes[i] & 0x1f) << 6) | (bytes[++i] & 0x3f);
        } else if ((bytes[i] >> 4) === 0xe) {
          c = ((bytes[i] & 0xf) << 12) | ((bytes[++i] & 0x3f) << 6) | (bytes[++i] & 0x3f);
        } else {
          s = 1;
          while (bytes[i] & (0x20 >>> s)) {
            s++;
          }
          c = bytes[i] & (0x1f >>> s);
          while (s-- >= 0) {
            c = (c << 6) ^ (bytes[++i] & 0x3f);
          }
        }
      }
      str += String.fromCharCode(c);
      i++;
    }
    return str;
  };

  encoding.prototype.getBytes = function(str) {
    var c, i, idx, j, n, utf8;
    if (!str) {
      return null;
    }
    n = str.length;
    idx = 0;
    utf8 = new Uint8Array(new ArrayBuffer(n * 4));
    i = 0;
    while (i < n) {
      c = str.charCodeAt(i);
      if (c <= 0x7F) {
        utf8[idx++] = c;
      } else if (c <= 0x7FF) {
        utf8[idx++] = 0xC0 | (c >>> 6);
        utf8[idx++] = 0x80 | (c & 0x3F);
      } else if (c <= 0xFFFF) {
        utf8[idx++] = 0xE0 | (c >>> 12);
        utf8[idx++] = 0x80 | ((c >>> 6) & 0x3F);
        utf8[idx++] = 0x80 | (c & 0x3F);
      } else {
        j = 4;
        while (c >> (6 * j)) {
          j++;
        }
        utf8[idx++] = ((0xFF00 >>> j) & 0xFF) | (c >>> (6 * --j));
        while (j--) {
          utf8[idx++] = 0x80 | ((c >>> (6 * j)) & 0x3F);
        }
      }
      i++;
    }
    return utf8.subarray(0, idx);
  };

  encoding.prototype.getByteCount = function(str) {
    return this.getBytes(str).length;
  };

  return encoding;

})();




fm.randomizer = (function(_super) {

  __extends(randomizer, _super);

  function randomizer() {
    this.randomString = __bind(this.randomString, this);

    this.nextDouble = __bind(this.nextDouble, this);

    this.next = __bind(this.next, this);
    return randomizer.__super__.constructor.apply(this, arguments);
  }

  randomizer.prototype.next = function(minValue, maxValue) {
    if (!minValue && !maxValue) {
      minValue = 0;
      maxValue = 2147483647;
    } else if (!maxValue) {
      maxValue = minValue;
      minValue = 0;
    }
    return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
  };

  randomizer.prototype.nextDouble = function() {
    return Math.random();
  };

  randomizer.prototype._randomCharset = 'abcdefghijklmnopqrstuvwxyz0123456789';

  randomizer.prototype.randomString = function(size) {
    var i, s, _i, _ref;
    s = '';
    for (i = _i = 0, _ref = size - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      s += this._randomCharset.charAt(this.next(this._randomCharset.length));
    }
    return s;
  };

  return randomizer;

})(fm.object);


/*<span id='cls-fm.httpMethod'>&nbsp;</span>
*/

/**
@class fm.httpMethod
 <div>
 The method used by an HTTP request.
 </div>

@extends fm.enum
*/

fm.httpMethod = {
  /*<span id='prop-fm.httpMethod-Get'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates a GET request.
  	 </div>
  
  	@field Get
  	@type {fm.httpMethod}
  */

  Get: 1,
  /*<span id='prop-fm.httpMethod-Head'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates a HEAD request.
  	 </div>
  
  	@field Head
  	@type {fm.httpMethod}
  */

  Head: 2,
  /*<span id='prop-fm.httpMethod-Post'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates a POST request.
  	 </div>
  
  	@field Post
  	@type {fm.httpMethod}
  */

  Post: 3,
  /*<span id='prop-fm.httpMethod-Put'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates a PUT request.
  	 </div>
  
  	@field Put
  	@type {fm.httpMethod}
  */

  Put: 4,
  /*<span id='prop-fm.httpMethod-Patch'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates a PATCH request.
  	 </div>
  
  	@field Patch
  	@type {fm.httpMethod}
  */

  Patch: 5,
  /*<span id='prop-fm.httpMethod-Delete'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates a DELETE request.
  	 </div>
  
  	@field Delete
  	@type {fm.httpMethod}
  */

  Delete: 6
};


/*<span id='cls-fm.backoffMode'>&nbsp;</span>
*/

/**
@class fm.backoffMode
 <div>
 The algorithm to use when calculating sleep time between failed requests.
 </div>

@extends fm.enum
*/

fm.backoffMode = {
  /*<span id='prop-fm.backoffMode-Additive'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the backoff algorithm uses an additive calculation
  	 where the current backoff is equal to the previously calculated
  	 backoff plus the specified backoff in milliseconds.
  	 </div>
  
  	@field Additive
  	@type {fm.backoffMode}
  */

  Additive: 1,
  /*<span id='prop-fm.backoffMode-Constant'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that the backoff algorithm uses a constant calculation
  	 where the current backoff is always equal to exactly the specified
  	 backoff in milliseconds.
  	 </div>
  
  	@field Constant
  	@type {fm.backoffMode}
  */

  Constant: 2,
  /*<span id='prop-fm.backoffMode-None'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Indicates that no backoff interval exists between failed requests.
  	 </div>
  
  	@field None
  	@type {fm.backoffMode}
  */

  None: 3
};



fm.jsonCheckerMode = {
  Array: 1,
  Done: 2,
  Key: 3,
  Object: 4,
  String: 5
};


/*<span id='cls-fm.logLevel'>&nbsp;</span>
*/

/**
@class fm.logLevel
 <div>
 The level at which to log.
 </div>

@extends fm.enum
*/

fm.logLevel = {
  /*<span id='prop-fm.logLevel-Debug'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Logs messages relevant to development and troubleshooting.
  	 </div>
  
  	@field Debug
  	@type {fm.logLevel}
  */

  Debug: 1,
  /*<span id='prop-fm.logLevel-Info'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Logs messages relevant to expected use.
  	 </div>
  
  	@field Info
  	@type {fm.logLevel}
  */

  Info: 2,
  /*<span id='prop-fm.logLevel-Warn'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Logs messages relevant to potential pit-falls.
  	 </div>
  
  	@field Warn
  	@type {fm.logLevel}
  */

  Warn: 3,
  /*<span id='prop-fm.logLevel-Error'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Logs messages relevant to errors that allow program execution to continue.
  	 </div>
  
  	@field Error
  	@type {fm.logLevel}
  */

  Error: 4,
  /*<span id='prop-fm.logLevel-Fatal'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Logs messages relevant to errors that require the program to terminate.
  	 </div>
  
  	@field Fatal
  	@type {fm.logLevel}
  */

  Fatal: 5,
  /*<span id='prop-fm.logLevel-None'>&nbsp;</span>
  */

  /**
  	 <div>
  	 Logs nothing.
  	 </div>
  
  	@field None
  	@type {fm.logLevel}
  */

  None: 6
};



fm.stringType = {
  None: 1,
  Single: 2,
  Double: 3
};


/*<span id='cls-fm.serializable'>&nbsp;</span>
*/

/**
@class fm.serializable
 <div>
 Base definition for classes that allow serialization to/from JSON.
 </div>

@extends fm.object
*/


fm.serializable = (function(_super) {

  __extends(serializable, _super);

  serializable.prototype.__serialized = null;

  serializable.prototype._isDirty = false;

  serializable.prototype._isSerialized = false;

  /*<span id='method-fm.serializable-fm.serializable'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.serializable">fm.serializable</see> class.
  	 </div>
  
  	@function fm.serializable
  	@return {}
  */


  function serializable() {
    this.setSerialized = __bind(this.setSerialized, this);

    this.setIsSerialized = __bind(this.setIsSerialized, this);

    this.setIsDirty = __bind(this.setIsDirty, this);

    this.getSerialized = __bind(this.getSerialized, this);

    this.getIsSerialized = __bind(this.getIsSerialized, this);

    this.getIsDirty = __bind(this.getIsDirty, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      serializable.__super__.constructor.call(this);
      this.setIsSerialized(false);
      this.setIsDirty(false);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    serializable.__super__.constructor.call(this);
    this.setIsSerialized(false);
    this.setIsDirty(false);
  }

  /*<span id='method-fm.serializable-getIsDirty'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a value indicating whether this instance is dirty.
  	 </div>
  
  	@function getIsDirty
  	@return {Boolean}
  */


  serializable.prototype.getIsDirty = function() {
    return this._isDirty;
  };

  serializable.prototype.getIsSerialized = function() {
    return this._isSerialized;
  };

  serializable.prototype.getSerialized = function() {
    return this.__serialized;
  };

  /*<span id='method-fm.serializable-setIsDirty'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets a value indicating whether this instance is dirty.
  	 </div>
  
  	@function setIsDirty
  	@param {Boolean} value
  	@return {void}
  */


  serializable.prototype.setIsDirty = function() {
    var value;
    value = arguments[0];
    return this._isDirty = value;
  };

  serializable.prototype.setIsSerialized = function() {
    var value;
    value = arguments[0];
    return this._isSerialized = value;
  };

  serializable.prototype.setSerialized = function() {
    var value;
    value = arguments[0];
    this.__serialized = value;
    this.setIsSerialized(true);
    return this.setIsDirty(false);
  };

  return serializable;

})(fm.object);


/*<span id='cls-fm.dynamic'>&nbsp;</span>
*/

/**
@class fm.dynamic
 <div>
 Supplies class instances with a key-value
 mapping to support dynamic property storage.
 </div>

@extends fm.serializable
*/


fm.dynamic = (function(_super) {

  __extends(dynamic, _super);

  dynamic.prototype.__dynamicProperties = null;

  dynamic.prototype.__dynamicPropertiesLock = null;

  function dynamic() {
    this.unsetDynamicValue = __bind(this.unsetDynamicValue, this);

    this.setDynamicValue = __bind(this.setDynamicValue, this);

    this.setDynamicProperties = __bind(this.setDynamicProperties, this);

    this.getDynamicValue = __bind(this.getDynamicValue, this);

    this.getDynamicProperties = __bind(this.getDynamicProperties, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      dynamic.__super__.constructor.call(this);
      this.__dynamicProperties = {};
      this.__dynamicPropertiesLock = new fm.object();
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    dynamic.__super__.constructor.call(this);
    this.__dynamicProperties = {};
    this.__dynamicPropertiesLock = new fm.object();
  }

  /*<span id='method-fm.dynamic-getDynamicProperties'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the dynamic properties on this instance.
  	 </div>
  
  	@function getDynamicProperties
  	@return {Object}
  */


  dynamic.prototype.getDynamicProperties = function() {
    return this.__dynamicProperties;
  };

  /*<span id='method-fm.dynamic-getDynamicValue'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a property value from the local cache.
  	 </div>
  	@function getDynamicValue
  	@param {String} key The property key. This key is used internally only, but should be namespaced to avoid conflict with third-party extensions.
  	@return {fm.object} The stored value, if found; otherwise null.
  */


  dynamic.prototype.getDynamicValue = function() {
    var key, obj2, _var0, _var1;
    key = arguments[0];
    obj2 = null;
    _var0 = new fm.holder(obj2);
    _var1 = fm.hashExtensions.tryGetValue(this.getDynamicProperties(), key, _var0);
    obj2 = _var0.getValue();
    if (_var1) {
      return obj2;
    }
    return null;
  };

  /*<span id='method-fm.dynamic-setDynamicProperties'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the dynamic properties on this instance.
  	 </div>
  
  	@function setDynamicProperties
  	@param {Object} value
  	@return {void}
  */


  dynamic.prototype.setDynamicProperties = function() {
    var value;
    value = arguments[0];
    return this.__dynamicProperties = value != null ? value : {};
  };

  /*<span id='method-fm.dynamic-setDynamicValue'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets a property value in the local cache.
  	 </div>
  	@function setDynamicValue
  	@param {String} key The property key. This key is used internally only, but should be namespaced to avoid conflict with third-party extensions.
  	@param {fm.object} value The property value. This can be any object that needs to be stored for future use.
  	@return {void}
  */


  dynamic.prototype.setDynamicValue = function() {
    var key, value;
    key = arguments[0];
    value = arguments[1];
    return this.getDynamicProperties()[key] = value;
  };

  /*<span id='method-fm.dynamic-unsetDynamicValue'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Unsets a property value in the local cache.
  	 </div>
  	@function unsetDynamicValue
  	@param {String} key The property key. This key is used internally only, but should be namespaced to avoid conflict with third-party extensions.
  	@return {Boolean} true if the value was removed; otherwise, false.
  */


  dynamic.prototype.unsetDynamicValue = function() {
    var key;
    key = arguments[0];
    return fm.hashExtensions.remove(this.getDynamicProperties(), key);
  };

  return dynamic;

})(fm.serializable);


/*<span id='cls-fm.httpResponseReceivedArgs'>&nbsp;</span>
*/

/**
@class fm.httpResponseReceivedArgs
 <div>
 Arguments passed into callbacks when an HTTP response is received.
 </div>

@extends fm.object
*/


fm.httpResponseReceivedArgs = (function(_super) {

  __extends(httpResponseReceivedArgs, _super);

  httpResponseReceivedArgs.prototype._requestArgs = null;

  httpResponseReceivedArgs.prototype._response = null;

  httpResponseReceivedArgs.prototype._sender = null;

  function httpResponseReceivedArgs() {
    this.setSender = __bind(this.setSender, this);

    this.setResponse = __bind(this.setResponse, this);

    this.setRequestArgs = __bind(this.setRequestArgs, this);

    this.getSender = __bind(this.getSender, this);

    this.getResponse = __bind(this.getResponse, this);

    this.getRequestArgs = __bind(this.getRequestArgs, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      httpResponseReceivedArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    httpResponseReceivedArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.httpResponseReceivedArgs-getRequestArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the original request arguments.
  	 </div>
  
  	@function getRequestArgs
  	@return {fm.httpRequestArgs}
  */


  httpResponseReceivedArgs.prototype.getRequestArgs = function() {
    return this._requestArgs;
  };

  /*<span id='method-fm.httpResponseReceivedArgs-getResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the incoming HTTP response received from the server.
  	 </div>
  
  	@function getResponse
  	@return {fm.webResponse}
  */


  httpResponseReceivedArgs.prototype.getResponse = function() {
    return this._response;
  };

  /*<span id='method-fm.httpResponseReceivedArgs-getSender'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the sender of the request, either a client or publisher.
  	 </div>
  
  	@function getSender
  	@return {fm.object}
  */


  httpResponseReceivedArgs.prototype.getSender = function() {
    return this._sender;
  };

  /*<span id='method-fm.httpResponseReceivedArgs-setRequestArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the original request arguments.
  	 </div>
  
  	@function setRequestArgs
  	@param {fm.httpRequestArgs} value
  	@return {void}
  */


  httpResponseReceivedArgs.prototype.setRequestArgs = function() {
    var value;
    value = arguments[0];
    return this._requestArgs = value;
  };

  /*<span id='method-fm.httpResponseReceivedArgs-setResponse'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the incoming HTTP response received from the server.
  	 </div>
  
  	@function setResponse
  	@param {fm.webResponse} value
  	@return {void}
  */


  httpResponseReceivedArgs.prototype.setResponse = function() {
    var value;
    value = arguments[0];
    return this._response = value;
  };

  /*<span id='method-fm.httpResponseReceivedArgs-setSender'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the sender of the request, either a client or publisher.
  	 </div>
  
  	@function setSender
  	@param {fm.object} value
  	@return {void}
  */


  httpResponseReceivedArgs.prototype.setSender = function() {
    var value;
    value = arguments[0];
    return this._sender = value;
  };

  return httpResponseReceivedArgs;

})(fm.object);


/*<span id='cls-fm.byteHolder'>&nbsp;</span>
*/

/**
@class fm.byteHolder
 <div>
 Class to hold a byte value passed by reference.
 </div>

@extends fm.object
*/


fm.byteHolder = (function(_super) {

  __extends(byteHolder, _super);

  byteHolder.prototype._value = 0;

  /*<span id='method-fm.byteHolder-fm.byteHolder'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.byteHolder">fm.byteHolder</see> class.
  	 </div>
  	@function fm.byteHolder
  	@param {Integer} value The value.
  	@return {}
  */


  function byteHolder() {
    this.setValue = __bind(this.setValue, this);

    this.getValue = __bind(this.getValue, this);

    var value;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      byteHolder.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 0) {
      byteHolder.__super__.constructor.call(this);
      return;
    }
    if (arguments.length === 1) {
      value = arguments[0];
      byteHolder.__super__.constructor.call(this);
      this.setValue(value);
      return;
    }
  }

  /*<span id='method-fm.byteHolder-getValue'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the value.
  	 </div>
  
  	@function getValue
  	@return {Integer}
  */


  byteHolder.prototype.getValue = function() {
    return this._value;
  };

  /*<span id='method-fm.byteHolder-setValue'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the value.
  	 </div>
  
  	@function setValue
  	@param {Integer} value
  	@return {void}
  */


  byteHolder.prototype.setValue = function() {
    var value;
    value = arguments[0];
    return this._value = value;
  };

  return byteHolder;

})(fm.object);


/*<span id='cls-fm.callbackState'>&nbsp;</span>
*/

/**
@class fm.callbackState
 <div>
 A wrapper for a callback and state object.
 </div>

@extends fm.object
*/


fm.callbackState = (function(_super) {

  __extends(callbackState, _super);

  callbackState.prototype._callback = null;

  callbackState.prototype._state = null;

  /*<span id='method-fm.callbackState-fm.callbackState'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.callbackState">fm.callbackState</see> class.
  	 </div>
  	@function fm.callbackState
  	@param {fm.singleAction} callback The callback.
  	@param {fm.object} state The state.
  	@return {}
  */


  function callbackState() {
    this.setState = __bind(this.setState, this);

    this.setCallback = __bind(this.setCallback, this);

    this.getState = __bind(this.getState, this);

    this.getCallback = __bind(this.getCallback, this);

    this.execute = __bind(this.execute, this);

    var callback, state;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      callbackState.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    callback = arguments[0];
    state = arguments[1];
    callbackState.__super__.constructor.call(this);
    this.setCallback(callback);
    this.setState(state);
  }

  /*<span id='method-fm.callbackState-execute'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Executes the callback, passing in the state as a parameter.
  	 </div>
  
  	@function execute
  	@return {void}
  */


  callbackState.prototype.execute = function() {
    var _var0;
    _var0 = this.getCallback();
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return this.getCallback()(this.getState());
    }
  };

  /*<span id='method-fm.callbackState-getCallback'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback.
  	 </div>
  
  	@function getCallback
  	@return {fm.singleAction}
  */


  callbackState.prototype.getCallback = function() {
    return this._callback;
  };

  /*<span id='method-fm.callbackState-getState'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the state.
  	 </div>
  
  	@function getState
  	@return {fm.object}
  */


  callbackState.prototype.getState = function() {
    return this._state;
  };

  /*<span id='method-fm.callbackState-setCallback'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback.
  	 </div>
  
  	@function setCallback
  	@param {fm.singleAction} value
  	@return {void}
  */


  callbackState.prototype.setCallback = function() {
    var value;
    value = arguments[0];
    return this._callback = value;
  };

  /*<span id='method-fm.callbackState-setState'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the state.
  	 </div>
  
  	@function setState
  	@param {fm.object} value
  	@return {void}
  */


  callbackState.prototype.setState = function() {
    var value;
    value = arguments[0];
    return this._state = value;
  };

  return callbackState;

})(fm.object);


/*<span id='cls-fm.characterHolder'>&nbsp;</span>
*/

/**
@class fm.characterHolder
 <div>
 Class to hold a character value passed by reference.
 </div>

@extends fm.object
*/


fm.characterHolder = (function(_super) {

  __extends(characterHolder, _super);

  characterHolder.prototype._value = '\0';

  /*<span id='method-fm.characterHolder-fm.characterHolder'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.characterHolder">fm.characterHolder</see> class.
  	 </div>
  	@function fm.characterHolder
  	@param {Character} value The value.
  	@return {}
  */


  function characterHolder() {
    this.setValue = __bind(this.setValue, this);

    this.getValue = __bind(this.getValue, this);

    var value;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      characterHolder.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 0) {
      characterHolder.__super__.constructor.call(this);
      return;
    }
    if (arguments.length === 1) {
      value = arguments[0];
      characterHolder.__super__.constructor.call(this);
      this.setValue(value);
      return;
    }
  }

  /*<span id='method-fm.characterHolder-getValue'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the value.
  	 </div>
  
  	@function getValue
  	@return {Character}
  */


  characterHolder.prototype.getValue = function() {
    return this._value;
  };

  /*<span id='method-fm.characterHolder-setValue'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the value.
  	 </div>
  
  	@function setValue
  	@param {Character} value
  	@return {void}
  */


  characterHolder.prototype.setValue = function() {
    var value;
    value = arguments[0];
    return this._value = value;
  };

  return characterHolder;

})(fm.object);


/*<span id='cls-fm.logProvider'>&nbsp;</span>
*/

/**
@class fm.logProvider
 <div>
 Base class for all logging provider implementations.
 </div>

@extends fm.object
*/


fm.logProvider = (function(_super) {

  __extends(logProvider, _super);

  logProvider.prototype._level = null;

  /*<span id='method-fm.logProvider-fm.logProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.logProvider">fm.logProvider</see> class.
  	 </div>
  
  	@function fm.logProvider
  	@return {}
  */


  function logProvider() {
    this.writeLine = __bind(this.writeLine, this);

    this.warnFormat = __bind(this.warnFormat, this);

    this.warn = __bind(this.warn, this);

    this.setLevel = __bind(this.setLevel, this);

    this.log = __bind(this.log, this);

    this.isEnabled = __bind(this.isEnabled, this);

    this.infoFormat = __bind(this.infoFormat, this);

    this.info = __bind(this.info, this);

    this.getLevel = __bind(this.getLevel, this);

    this.getIsWarnEnabled = __bind(this.getIsWarnEnabled, this);

    this.getIsInfoEnabled = __bind(this.getIsInfoEnabled, this);

    this.getIsFatalEnabled = __bind(this.getIsFatalEnabled, this);

    this.getIsErrorEnabled = __bind(this.getIsErrorEnabled, this);

    this.getIsDebugEnabled = __bind(this.getIsDebugEnabled, this);

    this.formatAndWriteLine = __bind(this.formatAndWriteLine, this);

    this.fatalFormat = __bind(this.fatalFormat, this);

    this.fatal = __bind(this.fatal, this);

    this.errorFormat = __bind(this.errorFormat, this);

    this.error = __bind(this.error, this);

    this.debugFormat = __bind(this.debugFormat, this);

    this.debug = __bind(this.debug, this);

    this._log = __bind(this._log, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      logProvider.__super__.constructor.call(this);
      this.setLevel(fm.logLevel.None);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    logProvider.__super__.constructor.call(this);
    this.setLevel(fm.logLevel.None);
  }

  /*<span id='method-fm.logProvider-getPrefix'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Converts a log-level to a 5-character string for
  	 consistently-spaced character sequences.
  	 </div>
  	@function getPrefix
  	@param {fm.logLevel} level The log level.
  	@param {Boolean} includeTimestamp Whether to include a timestamp in the prefix.
  	@return {String} The log level as an upper-case string
  	 with right-side whitespace padding to ensure
  	 a 5-character sequence.
  */


  logProvider.getPrefix = function() {
    var includeTimestamp, level, prefixLevel;
    level = arguments[0];
    includeTimestamp = arguments[1];
    prefixLevel = fm.logProvider.getPrefixLevel(level);
    if (includeTimestamp) {
      prefixLevel = fm.stringExtensions.format("{0} {1}", prefixLevel, fm.logProvider.getPrefixTimestamp(fm.dateTime.getUtcNow()));
    }
    return prefixLevel;
  };

  /*<span id='method-fm.logProvider-getPrefixLevel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Converts a log-level to a 5-character string for
  	 consistently-spaced character sequences.
  	 </div>
  	@function getPrefixLevel
  	@param {fm.logLevel} level The log level.
  	@return {String} The log level as an upper-case string
  	 with right-side whitespace padding to ensure
  	 a 5-character sequence.
  */


  logProvider.getPrefixLevel = function() {
    var level;
    level = arguments[0];
    switch (level) {
      case fm.logLevel.Debug:
        return "DEBUG";
      case fm.logLevel.Info:
        return "INFO ";
      case fm.logLevel.Warn:
        return "WARN ";
      case fm.logLevel.Error:
        return "ERROR";
      case fm.logLevel.Fatal:
        return "FATAL";
      case fm.logLevel.None:
        return "NONE ";
    }
    return "?????";
  };

  /*<span id='method-fm.logProvider-getPrefixTimestamp'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Converts a timestamp to a string formatted for
  	 rendering in a log message (yyyy/MM/dd-hh:mm:ss).
  	 </div>
  	@function getPrefixTimestamp
  	@param {fm.dateTime} timestamp The timestamp.
  	@return {String} The timestamp as a formatted string.
  */


  logProvider.getPrefixTimestamp = function() {
    var str, str2, str3, str4, str5, str6, timestamp;
    timestamp = arguments[0];
    str = fm.intExtensions.toString(timestamp.getYear());
    str2 = fm.intExtensions.toString(timestamp.getMonth());
    str3 = fm.intExtensions.toString(timestamp.getDay());
    str4 = fm.intExtensions.toString(timestamp.getHour());
    str5 = fm.intExtensions.toString(timestamp.getMinute());
    str6 = fm.intExtensions.toString(timestamp.getSecond());
    while (str.length < 4) {
      str = fm.stringExtensions.concat("0", str);
    }
    while (str2.length < 2) {
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
    return fm.stringExtensions.format("{0}/{1}/{2}-{3}:{4}:{5}", [str, str2, str3, str4, str5, str6]);
  };

  logProvider.prototype._log = function() {
    var ex, level, message;
    if (arguments.length === 2) {
      level = arguments[0];
      message = arguments[1];
      if (this.isEnabled(level)) {
        this.log(level, message);
      }
      return;
    }
    if (arguments.length === 3) {
      level = arguments[0];
      message = arguments[1];
      ex = arguments[2];
      if (this.isEnabled(level)) {
        this.log(level, message, ex);
      }
    }
  };

  /*<span id='method-fm.logProvider-debug'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Logs a debug-level message.
  	 </div>
  	@function debug
  	@param {String} message The message.
  	@param {Error} ex The exception.
  	@return {void}
  */


  logProvider.prototype.debug = function() {
    var ex, message;
    if (arguments.length === 2) {
      message = arguments[0];
      ex = arguments[1];
      this._log(fm.logLevel.Debug, message, ex);
      return;
    }
    if (arguments.length === 1) {
      message = arguments[0];
      this._log(fm.logLevel.Debug, message);
    }
  };

  /*<span id='method-fm.logProvider-debugFormat'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Logs a debug-level message.
  	 </div>
  	@function debugFormat
  	@param {String} format A composite format string.
  	@param {fm.array} args An array containing zero or more objects to format.
  	@return {void}
  */


  logProvider.prototype.debugFormat = function() {
    var args, format;
    format = arguments[0];
    args = arguments[1];
    return this.debug(fm.stringExtensions.format(format, args));
  };

  /*<span id='method-fm.logProvider-error'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Logs an error-level message.
  	 </div>
  	@function error
  	@param {String} message The message.
  	@param {Error} ex The exception.
  	@return {void}
  */


  logProvider.prototype.error = function() {
    var ex, message;
    if (arguments.length === 1) {
      message = arguments[0];
      this._log(fm.logLevel.Error, message);
      return;
    }
    if (arguments.length === 2) {
      message = arguments[0];
      ex = arguments[1];
      this._log(fm.logLevel.Error, message, ex);
    }
  };

  /*<span id='method-fm.logProvider-errorFormat'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Logs an error-level message.
  	 </div>
  	@function errorFormat
  	@param {String} format A composite format string.
  	@param {fm.array} args An array containing zero or more objects to format.
  	@return {void}
  */


  logProvider.prototype.errorFormat = function() {
    var args, format;
    format = arguments[0];
    args = arguments[1];
    return this.error(fm.stringExtensions.format(format, args));
  };

  /*<span id='method-fm.logProvider-fatal'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Logs a fatal-level message.
  	 </div>
  	@function fatal
  	@param {String} message The message.
  	@param {Error} ex The exception.
  	@return {void}
  */


  logProvider.prototype.fatal = function() {
    var ex, message;
    if (arguments.length === 2) {
      message = arguments[0];
      ex = arguments[1];
      this._log(fm.logLevel.Fatal, message, ex);
      return;
    }
    if (arguments.length === 1) {
      message = arguments[0];
      this._log(fm.logLevel.Fatal, message);
    }
  };

  /*<span id='method-fm.logProvider-fatalFormat'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Logs a fatal-level message.
  	 </div>
  	@function fatalFormat
  	@param {String} format A composite format string.
  	@param {fm.array} args An array containing zero or more objects to format.
  	@return {void}
  */


  logProvider.prototype.fatalFormat = function() {
    var args, format;
    format = arguments[0];
    args = arguments[1];
    return this.fatal(fm.stringExtensions.format(format, args));
  };

  /*<span id='method-fm.logProvider-formatAndWriteLine'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Writes a line of text to the log.
  	 </div>
  	@function formatAndWriteLine
  	@param {String} format A composite format string.
  	@param {fm.array} args An array containing zero or more objects to format.
  	@return {void}
  */


  logProvider.prototype.formatAndWriteLine = function() {
    var args, format;
    format = arguments[0];
    args = arguments[1];
    return this.writeLine(fm.stringExtensions.format(format, args));
  };

  /*<span id='method-fm.logProvider-getIsDebugEnabled'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a value indicating whether logging is enabled for debug-level messages.
  	 </div><value>
  	 <c>true</c> if logging is enabled for debug-level messages; otherwise, <c>false</c>.
  	 </value>
  
  	@function getIsDebugEnabled
  	@return {Boolean}
  */


  logProvider.prototype.getIsDebugEnabled = function() {
    return this.isEnabled(fm.logLevel.Debug);
  };

  /*<span id='method-fm.logProvider-getIsErrorEnabled'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a value indicating whether logging is enabled for error-level messages.
  	 </div><value>
  	 <c>true</c> if logging is enabled for error-level messages; otherwise, <c>false</c>.
  	 </value>
  
  	@function getIsErrorEnabled
  	@return {Boolean}
  */


  logProvider.prototype.getIsErrorEnabled = function() {
    return this.isEnabled(fm.logLevel.Error);
  };

  /*<span id='method-fm.logProvider-getIsFatalEnabled'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a value indicating whether logging is enabled for fatal-level messages.
  	 </div><value>
  	 <c>true</c> if logging is enabled for fatal-level messages; otherwise, <c>false</c>.
  	 </value>
  
  	@function getIsFatalEnabled
  	@return {Boolean}
  */


  logProvider.prototype.getIsFatalEnabled = function() {
    return this.isEnabled(fm.logLevel.Fatal);
  };

  /*<span id='method-fm.logProvider-getIsInfoEnabled'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a value indicating whether logging is enabled for info-level messages.
  	 </div><value>
  	 <c>true</c> if logging is enabled for info-level messages; otherwise, <c>false</c>.
  	 </value>
  
  	@function getIsInfoEnabled
  	@return {Boolean}
  */


  logProvider.prototype.getIsInfoEnabled = function() {
    return this.isEnabled(fm.logLevel.Info);
  };

  /*<span id='method-fm.logProvider-getIsWarnEnabled'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a value indicating whether logging is enabled for warn-level messages.
  	 </div><value>
  	 <c>true</c> if logging is enabled for warn-level messages; otherwise, <c>false</c>.
  	 </value>
  
  	@function getIsWarnEnabled
  	@return {Boolean}
  */


  logProvider.prototype.getIsWarnEnabled = function() {
    return this.isEnabled(fm.logLevel.Warn);
  };

  /*<span id='method-fm.logProvider-getLevel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the log level.
  	 </div>
  
  	@function getLevel
  	@return {fm.logLevel}
  */


  logProvider.prototype.getLevel = function() {
    return this._level;
  };

  /*<span id='method-fm.logProvider-info'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Logs an info-level message.
  	 </div>
  	@function info
  	@param {String} message The message.
  	@param {Error} ex The exception.
  	@return {void}
  */


  logProvider.prototype.info = function() {
    var ex, message;
    if (arguments.length === 1) {
      message = arguments[0];
      this._log(fm.logLevel.Info, message);
      return;
    }
    if (arguments.length === 2) {
      message = arguments[0];
      ex = arguments[1];
      this._log(fm.logLevel.Info, message, ex);
    }
  };

  /*<span id='method-fm.logProvider-infoFormat'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Logs an info-level message.
  	 </div>
  	@function infoFormat
  	@param {String} format A composite format string.
  	@param {fm.array} args An array containing zero or more objects to format.
  	@return {void}
  */


  logProvider.prototype.infoFormat = function() {
    var args, format;
    format = arguments[0];
    args = arguments[1];
    return this.info(fm.stringExtensions.format(format, args));
  };

  /*<span id='method-fm.logProvider-isEnabled'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Determines whether logging is enabled for the specified log level.
  	 </div>
  	@function isEnabled
  	@param {fm.logLevel} level The log level.
  	@return {Boolean} true if logging is enabled for the specified log level; otherwise, false.
  */


  logProvider.prototype.isEnabled = function() {
    var level;
    level = arguments[0];
    return level >= this.getLevel();
  };

  /*<span id='method-fm.logProvider-log'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Logs a message at the specified log level.
  	 </div>
  	@function log
  	@param {fm.logLevel} level The log level.
  	@param {String} message The message.
  	@param {Error} ex The exception.
  	@return {void}
  */


  logProvider.prototype.log = function() {
    var ex, level, message;
    if (arguments.length === 2) {
      level = arguments[0];
      message = arguments[1];
      return;
    }
    if (arguments.length === 3) {
      level = arguments[0];
      message = arguments[1];
      ex = arguments[2];
    }
  };

  /*<span id='method-fm.logProvider-setLevel'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the log level.
  	 </div>
  
  	@function setLevel
  	@param {fm.logLevel} value
  	@return {void}
  */


  logProvider.prototype.setLevel = function() {
    var value;
    value = arguments[0];
    return this._level = value;
  };

  /*<span id='method-fm.logProvider-warn'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Logs a warn-level message.
  	 </div>
  	@function warn
  	@param {String} message The message.
  	@param {Error} ex The exception.
  	@return {void}
  */


  logProvider.prototype.warn = function() {
    var ex, message;
    if (arguments.length === 2) {
      message = arguments[0];
      ex = arguments[1];
      this._log(fm.logLevel.Warn, message, ex);
      return;
    }
    if (arguments.length === 1) {
      message = arguments[0];
      this._log(fm.logLevel.Warn, message);
    }
  };

  /*<span id='method-fm.logProvider-warnFormat'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Logs a warn-level message.
  	 </div>
  	@function warnFormat
  	@param {String} format A composite format string.
  	@param {fm.array} args An array containing zero or more objects to format.
  	@return {void}
  */


  logProvider.prototype.warnFormat = function() {
    var args, format;
    format = arguments[0];
    args = arguments[1];
    return this.warn(fm.stringExtensions.format(format, args));
  };

  /*<span id='method-fm.logProvider-writeLine'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Writes a line of text to the log.
  	 </div>
  	@function writeLine
  	@param {String} text The text to write to the log.
  	@return {void}
  */


  logProvider.prototype.writeLine = function() {
    var text;
    return text = arguments[0];
  };

  return logProvider;

}).call(this, fm.object);


/*<span id='cls-fm.booleanHolder'>&nbsp;</span>
*/

/**
@class fm.booleanHolder
 <div>
 Class to hold a boolean value passed by reference.
 </div>

@extends fm.object
*/


fm.booleanHolder = (function(_super) {

  __extends(booleanHolder, _super);

  booleanHolder.prototype._value = false;

  /*<span id='method-fm.booleanHolder-fm.booleanHolder'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.booleanHolder">fm.booleanHolder</see> class.
  	 </div>
  	@function fm.booleanHolder
  	@param {Boolean} value The value.
  	@return {}
  */


  function booleanHolder() {
    this.setValue = __bind(this.setValue, this);

    this.getValue = __bind(this.getValue, this);

    var value;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      booleanHolder.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 0) {
      booleanHolder.__super__.constructor.call(this);
      return;
    }
    if (arguments.length === 1) {
      value = arguments[0];
      booleanHolder.__super__.constructor.call(this);
      this.setValue(value);
      return;
    }
  }

  /*<span id='method-fm.booleanHolder-getValue'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the value.
  	 </div>
  
  	@function getValue
  	@return {Boolean}
  */


  booleanHolder.prototype.getValue = function() {
    return this._value;
  };

  /*<span id='method-fm.booleanHolder-setValue'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the value.
  	 </div>
  
  	@function setValue
  	@param {Boolean} value
  	@return {void}
  */


  booleanHolder.prototype.setValue = function() {
    var value;
    value = arguments[0];
    return this._value = value;
  };

  return booleanHolder;

})(fm.object);


/*<span id='cls-fm.jsonProvider'>&nbsp;</span>
*/

/**
@class fm.jsonProvider
 <div>
 Base class for all JSON provider implementations.
 </div>

@extends fm.object
*/


fm.jsonProvider = (function(_super) {

  __extends(jsonProvider, _super);

  function jsonProvider() {
    this.serialize = __bind(this.serialize, this);

    this.deserialize = __bind(this.deserialize, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      jsonProvider.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    jsonProvider.__super__.constructor.call(this);
  }

  /*<span id='method-fm.jsonProvider-deserialize'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a value from a JSON string.
  	 </div><typeparam name="T">The type the value to deserialize.</typeparam>
  	@function deserialize
  	@param {String} valueJson The JSON string to deserialize.
  	@return {fm.object} The deserialized value.
  */


  jsonProvider.prototype.deserialize = function() {
    var valueJson;
    return valueJson = arguments[0];
  };

  /*<span id='method-fm.jsonProvider-serialize'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a value to a JSON string.
  	 </div><typeparam name="T">The type the value to serialize.</typeparam>
  	@function serialize
  	@param {fm.object} value The value to serialize.
  	@return {String} The serialized JSON string.
  */


  jsonProvider.prototype.serialize = function() {
    var value;
    return value = arguments[0];
  };

  return jsonProvider;

})(fm.object);


/*<span id='cls-fm.nullJsonProvider'>&nbsp;</span>
*/

/**
@class fm.nullJsonProvider
 <div>
 An implementation of a JSON provider that does nothing.
 </div>

@extends fm.jsonProvider
*/


fm.nullJsonProvider = (function(_super) {

  __extends(nullJsonProvider, _super);

  function nullJsonProvider() {
    this.serialize = __bind(this.serialize, this);

    this.deserialize = __bind(this.deserialize, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      nullJsonProvider.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    nullJsonProvider.__super__.constructor.call(this);
  }

  /*<span id='method-fm.nullJsonProvider-deserialize'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a value from a JSON string.
  	 </div><typeparam name="T">The type the value to deserialize.</typeparam>
  	@function deserialize
  	@param {String} valueJson The JSON string to deserialize.
  	@return {fm.object} 
  	 The deserialized value.
  */


  nullJsonProvider.prototype.deserialize = function() {
    var valueJson;
    valueJson = arguments[0];
    return null;
  };

  /*<span id='method-fm.nullJsonProvider-serialize'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a value to a JSON string.
  	 </div><typeparam name="T">The type the value to serialize.</typeparam>
  	@function serialize
  	@param {fm.object} value The value to serialize.
  	@return {String} 
  	 The serialized JSON string.
  */


  nullJsonProvider.prototype.serialize = function() {
    var value;
    value = arguments[0];
    return null;
  };

  return nullJsonProvider;

})(fm.jsonProvider);


/*<span id='cls-fm.doubleHolder'>&nbsp;</span>
*/

/**
@class fm.doubleHolder
 <div>
 Class to hold a double value passed by reference.
 </div>

@extends fm.object
*/


fm.doubleHolder = (function(_super) {

  __extends(doubleHolder, _super);

  doubleHolder.prototype._value = 0.0;

  /*<span id='method-fm.doubleHolder-fm.doubleHolder'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.doubleHolder">fm.doubleHolder</see> class.
  	 </div>
  	@function fm.doubleHolder
  	@param {Decimal} value The value.
  	@return {}
  */


  function doubleHolder() {
    this.setValue = __bind(this.setValue, this);

    this.getValue = __bind(this.getValue, this);

    var value;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      doubleHolder.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 0) {
      doubleHolder.__super__.constructor.call(this);
      return;
    }
    if (arguments.length === 1) {
      value = arguments[0];
      doubleHolder.__super__.constructor.call(this);
      this.setValue(value);
      return;
    }
  }

  /*<span id='method-fm.doubleHolder-getValue'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the value.
  	 </div>
  
  	@function getValue
  	@return {Decimal}
  */


  doubleHolder.prototype.getValue = function() {
    return this._value;
  };

  /*<span id='method-fm.doubleHolder-setValue'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the value.
  	 </div>
  
  	@function setValue
  	@param {Decimal} value
  	@return {void}
  */


  doubleHolder.prototype.setValue = function() {
    var value;
    value = arguments[0];
    return this._value = value;
  };

  return doubleHolder;

})(fm.object);


/*<span id='cls-fm.floatHolder'>&nbsp;</span>
*/

/**
@class fm.floatHolder
 <div>
 Class to hold a float value passed by reference.
 </div>

@extends fm.object
*/


fm.floatHolder = (function(_super) {

  __extends(floatHolder, _super);

  floatHolder.prototype._value = 0.0;

  /*<span id='method-fm.floatHolder-fm.floatHolder'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.floatHolder">fm.floatHolder</see> class.
  	 </div>
  	@function fm.floatHolder
  	@param {Decimal} value The value.
  	@return {}
  */


  function floatHolder() {
    this.setValue = __bind(this.setValue, this);

    this.getValue = __bind(this.getValue, this);

    var value;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      floatHolder.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 0) {
      floatHolder.__super__.constructor.call(this);
      return;
    }
    if (arguments.length === 1) {
      value = arguments[0];
      floatHolder.__super__.constructor.call(this);
      this.setValue(value);
      return;
    }
  }

  /*<span id='method-fm.floatHolder-getValue'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the value.
  	 </div>
  
  	@function getValue
  	@return {Decimal}
  */


  floatHolder.prototype.getValue = function() {
    return this._value;
  };

  /*<span id='method-fm.floatHolder-setValue'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the value.
  	 </div>
  
  	@function setValue
  	@param {Decimal} value
  	@return {void}
  */


  floatHolder.prototype.setValue = function() {
    var value;
    value = arguments[0];
    return this._value = value;
  };

  return floatHolder;

})(fm.object);


/*<span id='cls-fm.httpRequestArgs'>&nbsp;</span>
*/

/**
@class fm.httpRequestArgs
 <div>
 Arguments for sending an HTTP request.
 </div>

@extends fm.dynamic
*/


fm.httpRequestArgs = (function(_super) {

  __extends(httpRequestArgs, _super);

  httpRequestArgs.prototype.__headers = null;

  httpRequestArgs.prototype._binaryContent = null;

  httpRequestArgs.prototype._method = null;

  httpRequestArgs.prototype._onRequestCreated = null;

  httpRequestArgs.prototype._onResponseReceived = null;

  httpRequestArgs.prototype._sender = null;

  httpRequestArgs.prototype._textContent = null;

  httpRequestArgs.prototype._timeout = 0;

  httpRequestArgs.prototype._url = null;

  /*<span id='method-fm.httpRequestArgs-fm.httpRequestArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.httpRequestArgs">fm.httpRequestArgs</see> class
  	 with default values.
  	 </div>
  
  	@function fm.httpRequestArgs
  	@return {}
  */


  function httpRequestArgs() {
    this.setUrl = __bind(this.setUrl, this);

    this.setTimeout = __bind(this.setTimeout, this);

    this.setTextContent = __bind(this.setTextContent, this);

    this.setSender = __bind(this.setSender, this);

    this.setOnResponseReceived = __bind(this.setOnResponseReceived, this);

    this.setOnRequestCreated = __bind(this.setOnRequestCreated, this);

    this.setMethod = __bind(this.setMethod, this);

    this.setHeaders = __bind(this.setHeaders, this);

    this.setBinaryContent = __bind(this.setBinaryContent, this);

    this.getUrl = __bind(this.getUrl, this);

    this.getTimeout = __bind(this.getTimeout, this);

    this.getTextContent = __bind(this.getTextContent, this);

    this.getSender = __bind(this.getSender, this);

    this.getOnResponseReceived = __bind(this.getOnResponseReceived, this);

    this.getOnRequestCreated = __bind(this.getOnRequestCreated, this);

    this.getMethod = __bind(this.getMethod, this);

    this.getHeaders = __bind(this.getHeaders, this);

    this.getBinaryContent = __bind(this.getBinaryContent, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      httpRequestArgs.__super__.constructor.call(this);
      this.setTimeout(15000);
      this.setMethod(fm.httpMethod.Post);
      this.__headers = new fm.nameValueCollection();
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    httpRequestArgs.__super__.constructor.call(this);
    this.setTimeout(15000);
    this.setMethod(fm.httpMethod.Post);
    this.__headers = new fm.nameValueCollection();
  }

  /*<span id='method-fm.httpRequestArgs-getBinaryContent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the binary content to transfer over HTTP.
  	 Overrides <see cref="fm.httpRequestArgs.textContent">fm.httpRequestArgs.textContent</see>.
  	 </div>
  
  	@function getBinaryContent
  	@return {fm.array}
  */


  httpRequestArgs.prototype.getBinaryContent = function() {
    return this._binaryContent;
  };

  /*<span id='method-fm.httpRequestArgs-getHeaders'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the headers to transfer over HTTP.
  	 </div>
  
  	@function getHeaders
  	@return {fm.nameValueCollection}
  */


  httpRequestArgs.prototype.getHeaders = function() {
    return this.__headers;
  };

  /*<span id='method-fm.httpRequestArgs-getMethod'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the HTTP method.
  	 </div>
  
  	@function getMethod
  	@return {fm.httpMethod}
  */


  httpRequestArgs.prototype.getMethod = function() {
    return this._method;
  };

  /*<span id='method-fm.httpRequestArgs-getOnRequestCreated'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke once the outgoing HTTP request is created.
  	 See <see cref="fm.httpRequestCreatedArgs">fm.httpRequestCreatedArgs</see> for callback argument details.
  	 </div>
  
  	@function getOnRequestCreated
  	@return {fm.singleAction}
  */


  httpRequestArgs.prototype.getOnRequestCreated = function() {
    return this._onRequestCreated;
  };

  /*<span id='method-fm.httpRequestArgs-getOnResponseReceived'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback to invoke once the incoming HTTP response has been
  	 received. See <see cref="fm.httpResponseReceivedArgs">fm.httpResponseReceivedArgs</see> for callback argument details.
  	 </div>
  
  	@function getOnResponseReceived
  	@return {fm.singleAction}
  */


  httpRequestArgs.prototype.getOnResponseReceived = function() {
    return this._onResponseReceived;
  };

  /*<span id='method-fm.httpRequestArgs-getSender'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the sender of the content, either a client or publisher.
  	 </div>
  
  	@function getSender
  	@return {fm.object}
  */


  httpRequestArgs.prototype.getSender = function() {
    return this._sender;
  };

  /*<span id='method-fm.httpRequestArgs-getTextContent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the text content to transfer over HTTP.
  	 </div>
  
  	@function getTextContent
  	@return {String}
  */


  httpRequestArgs.prototype.getTextContent = function() {
    return this._textContent;
  };

  /*<span id='method-fm.httpRequestArgs-getTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the number of milliseconds to wait before timing out the HTTP transfer.
  	 Defaults to 15000 (15 seconds).
  	 </div>
  
  	@function getTimeout
  	@return {Integer}
  */


  httpRequestArgs.prototype.getTimeout = function() {
    return this._timeout;
  };

  /*<span id='method-fm.httpRequestArgs-getUrl'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the target URL for the HTTP request.
  	 </div>
  
  	@function getUrl
  	@return {String}
  */


  httpRequestArgs.prototype.getUrl = function() {
    return this._url;
  };

  /*<span id='method-fm.httpRequestArgs-setBinaryContent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the binary content to transfer over HTTP.
  	 Overrides <see cref="fm.httpRequestArgs.textContent">fm.httpRequestArgs.textContent</see>.
  	 </div>
  
  	@function setBinaryContent
  	@param {fm.array} value
  	@return {void}
  */


  httpRequestArgs.prototype.setBinaryContent = function() {
    var value;
    value = arguments[0];
    return this._binaryContent = value;
  };

  /*<span id='method-fm.httpRequestArgs-setHeaders'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the headers to transfer over HTTP.
  	 </div>
  
  	@function setHeaders
  	@param {fm.nameValueCollection} value
  	@return {void}
  */


  httpRequestArgs.prototype.setHeaders = function() {
    var value, _var0;
    value = arguments[0];
    _var0 = value;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return this.__headers = new fm.nameValueCollection();
    } else {
      return this.__headers = value;
    }
  };

  /*<span id='method-fm.httpRequestArgs-setMethod'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the HTTP method.
  	 </div>
  
  	@function setMethod
  	@param {fm.httpMethod} value
  	@return {void}
  */


  httpRequestArgs.prototype.setMethod = function() {
    var value;
    value = arguments[0];
    return this._method = value;
  };

  /*<span id='method-fm.httpRequestArgs-setOnRequestCreated'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke once the outgoing HTTP request is created.
  	 See <see cref="fm.httpRequestCreatedArgs">fm.httpRequestCreatedArgs</see> for callback argument details.
  	 </div>
  
  	@function setOnRequestCreated
  	@param {fm.singleAction} value
  	@return {void}
  */


  httpRequestArgs.prototype.setOnRequestCreated = function() {
    var value;
    value = arguments[0];
    return this._onRequestCreated = value;
  };

  /*<span id='method-fm.httpRequestArgs-setOnResponseReceived'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback to invoke once the incoming HTTP response has been
  	 received. See <see cref="fm.httpResponseReceivedArgs">fm.httpResponseReceivedArgs</see> for callback argument details.
  	 </div>
  
  	@function setOnResponseReceived
  	@param {fm.singleAction} value
  	@return {void}
  */


  httpRequestArgs.prototype.setOnResponseReceived = function() {
    var value;
    value = arguments[0];
    return this._onResponseReceived = value;
  };

  /*<span id='method-fm.httpRequestArgs-setSender'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the sender of the content, either a client or publisher.
  	 </div>
  
  	@function setSender
  	@param {fm.object} value
  	@return {void}
  */


  httpRequestArgs.prototype.setSender = function() {
    var value;
    value = arguments[0];
    return this._sender = value;
  };

  /*<span id='method-fm.httpRequestArgs-setTextContent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the text content to transfer over HTTP.
  	 </div>
  
  	@function setTextContent
  	@param {String} value
  	@return {void}
  */


  httpRequestArgs.prototype.setTextContent = function() {
    var value;
    value = arguments[0];
    return this._textContent = value;
  };

  /*<span id='method-fm.httpRequestArgs-setTimeout'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the number of milliseconds to wait before timing out the HTTP transfer.
  	 Defaults to 15000 (15 seconds).
  	 </div>
  
  	@function setTimeout
  	@param {Integer} value
  	@return {void}
  */


  httpRequestArgs.prototype.setTimeout = function() {
    var value;
    value = arguments[0];
    return this._timeout = value;
  };

  /*<span id='method-fm.httpRequestArgs-setUrl'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the target URL for the HTTP request.
  	 </div>
  
  	@function setUrl
  	@param {String} value
  	@return {void}
  */


  httpRequestArgs.prototype.setUrl = function() {
    var value;
    value = arguments[0];
    return this._url = value;
  };

  return httpRequestArgs;

})(fm.dynamic);


/*<span id='cls-fm.httpRequestCreatedArgs'>&nbsp;</span>
*/

/**
@class fm.httpRequestCreatedArgs
 <div>
 Arguments passed into callbacks when an HTTP request is created.
 </div>

@extends fm.object
*/


fm.httpRequestCreatedArgs = (function(_super) {

  __extends(httpRequestCreatedArgs, _super);

  httpRequestCreatedArgs.prototype._request = null;

  httpRequestCreatedArgs.prototype._requestArgs = null;

  httpRequestCreatedArgs.prototype._sender = null;

  function httpRequestCreatedArgs() {
    this.setSender = __bind(this.setSender, this);

    this.setRequestArgs = __bind(this.setRequestArgs, this);

    this.setRequest = __bind(this.setRequest, this);

    this.getSender = __bind(this.getSender, this);

    this.getRequestArgs = __bind(this.getRequestArgs, this);

    this.getRequest = __bind(this.getRequest, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      httpRequestCreatedArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    httpRequestCreatedArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.httpRequestCreatedArgs-getRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the outgoing HTTP request about to be sent to the server.
  	 </div>
  
  	@function getRequest
  	@return {fm.webRequest}
  */


  httpRequestCreatedArgs.prototype.getRequest = function() {
    return this._request;
  };

  /*<span id='method-fm.httpRequestCreatedArgs-getRequestArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the original request arguments.
  	 </div>
  
  	@function getRequestArgs
  	@return {fm.httpRequestArgs}
  */


  httpRequestCreatedArgs.prototype.getRequestArgs = function() {
    return this._requestArgs;
  };

  /*<span id='method-fm.httpRequestCreatedArgs-getSender'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the sender of the request, either a client or publisher.
  	 </div>
  
  	@function getSender
  	@return {fm.object}
  */


  httpRequestCreatedArgs.prototype.getSender = function() {
    return this._sender;
  };

  /*<span id='method-fm.httpRequestCreatedArgs-setRequest'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the outgoing HTTP request about to be sent to the server.
  	 </div>
  
  	@function setRequest
  	@param {fm.webRequest} value
  	@return {void}
  */


  httpRequestCreatedArgs.prototype.setRequest = function() {
    var value;
    value = arguments[0];
    return this._request = value;
  };

  /*<span id='method-fm.httpRequestCreatedArgs-setRequestArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the original request arguments.
  	 </div>
  
  	@function setRequestArgs
  	@param {fm.httpRequestArgs} value
  	@return {void}
  */


  httpRequestCreatedArgs.prototype.setRequestArgs = function() {
    var value;
    value = arguments[0];
    return this._requestArgs = value;
  };

  /*<span id='method-fm.httpRequestCreatedArgs-setSender'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the sender of the request, either a client or publisher.
  	 </div>
  
  	@function setSender
  	@param {fm.object} value
  	@return {void}
  */


  httpRequestCreatedArgs.prototype.setSender = function() {
    var value;
    value = arguments[0];
    return this._sender = value;
  };

  return httpRequestCreatedArgs;

})(fm.object);


/*<span id='cls-fm.httpResponseArgs'>&nbsp;</span>
*/

/**
@class fm.httpResponseArgs
 <div>
 Arguments for receiving an HTTP response.
 </div>

@extends fm.object
*/


fm.httpResponseArgs = (function(_super) {

  __extends(httpResponseArgs, _super);

  httpResponseArgs.prototype._binaryContent = null;

  httpResponseArgs.prototype._exception = null;

  httpResponseArgs.prototype._headers = null;

  httpResponseArgs.prototype._requestArgs = null;

  httpResponseArgs.prototype._statusCode = 0;

  httpResponseArgs.prototype._textContent = null;

  /*<span id='method-fm.httpResponseArgs-fm.httpResponseArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.httpResponseArgs">fm.httpResponseArgs</see> class.
  	 </div>
  	@function fm.httpResponseArgs
  	@param {fm.httpRequestArgs} requestArgs The request arguments.
  	@return {}
  */


  function httpResponseArgs() {
    this.setTextContent = __bind(this.setTextContent, this);

    this.setStatusCode = __bind(this.setStatusCode, this);

    this.setRequestArgs = __bind(this.setRequestArgs, this);

    this.setHeaders = __bind(this.setHeaders, this);

    this.setException = __bind(this.setException, this);

    this.setBinaryContent = __bind(this.setBinaryContent, this);

    this.getTextContent = __bind(this.getTextContent, this);

    this.getStatusCode = __bind(this.getStatusCode, this);

    this.getRequestArgs = __bind(this.getRequestArgs, this);

    this.getHeaders = __bind(this.getHeaders, this);

    this.getException = __bind(this.getException, this);

    this.getBinaryContent = __bind(this.getBinaryContent, this);

    var requestArgs;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      httpResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    requestArgs = arguments[0];
    httpResponseArgs.__super__.constructor.call(this);
    this.setRequestArgs(requestArgs);
    this.setHeaders(new fm.nameValueCollection());
  }

  /*<span id='method-fm.httpResponseArgs-getBinaryContent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the binary content read from the HTTP response.
  	 </div>
  
  	@function getBinaryContent
  	@return {fm.array}
  */


  httpResponseArgs.prototype.getBinaryContent = function() {
    return this._binaryContent;
  };

  /*<span id='method-fm.httpResponseArgs-getException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the exception generated while completing the request.
  	 </div>
  
  	@function getException
  	@return {Error}
  */


  httpResponseArgs.prototype.getException = function() {
    return this._exception;
  };

  /*<span id='method-fm.httpResponseArgs-getHeaders'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the headers read from the HTTP response.
  	 </div>
  
  	@function getHeaders
  	@return {fm.nameValueCollection}
  */


  httpResponseArgs.prototype.getHeaders = function() {
    return this._headers;
  };

  /*<span id='method-fm.httpResponseArgs-getRequestArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the original <see cref="fm.httpRequestArgs">fm.httpRequestArgs</see>.
  	 </div>
  
  	@function getRequestArgs
  	@return {fm.httpRequestArgs}
  */


  httpResponseArgs.prototype.getRequestArgs = function() {
    return this._requestArgs;
  };

  /*<span id='method-fm.httpResponseArgs-getStatusCode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the status code read from the HTTP response.
  	 </div>
  
  	@function getStatusCode
  	@return {Integer}
  */


  httpResponseArgs.prototype.getStatusCode = function() {
    return this._statusCode;
  };

  /*<span id='method-fm.httpResponseArgs-getTextContent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the text content read from the HTTP response.
  	 </div>
  
  	@function getTextContent
  	@return {String}
  */


  httpResponseArgs.prototype.getTextContent = function() {
    return this._textContent;
  };

  /*<span id='method-fm.httpResponseArgs-setBinaryContent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the binary content read from the HTTP response.
  	 </div>
  
  	@function setBinaryContent
  	@param {fm.array} value
  	@return {void}
  */


  httpResponseArgs.prototype.setBinaryContent = function() {
    var value;
    value = arguments[0];
    return this._binaryContent = value;
  };

  /*<span id='method-fm.httpResponseArgs-setException'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the exception generated while completing the request.
  	 </div>
  
  	@function setException
  	@param {Error} value
  	@return {void}
  */


  httpResponseArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  httpResponseArgs.prototype.setHeaders = function() {
    var value;
    value = arguments[0];
    return this._headers = value;
  };

  /*<span id='method-fm.httpResponseArgs-setRequestArgs'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the original <see cref="fm.httpRequestArgs">fm.httpRequestArgs</see>.
  	 </div>
  
  	@function setRequestArgs
  	@param {fm.httpRequestArgs} value
  	@return {void}
  */


  httpResponseArgs.prototype.setRequestArgs = function() {
    var value;
    value = arguments[0];
    return this._requestArgs = value;
  };

  /*<span id='method-fm.httpResponseArgs-setStatusCode'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the status code read from the HTTP response.
  	 </div>
  
  	@function setStatusCode
  	@param {Integer} value
  	@return {void}
  */


  httpResponseArgs.prototype.setStatusCode = function() {
    var value;
    value = arguments[0];
    return this._statusCode = value;
  };

  /*<span id='method-fm.httpResponseArgs-setTextContent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the text content read from the HTTP response.
  	 </div>
  
  	@function setTextContent
  	@param {String} value
  	@return {void}
  */


  httpResponseArgs.prototype.setTextContent = function() {
    var value;
    value = arguments[0];
    return this._textContent = value;
  };

  return httpResponseArgs;

})(fm.object);


/*<span id='cls-fm.httpSendFinishArgs'>&nbsp;</span>
*/

/**
@class fm.httpSendFinishArgs
 <div>
 Arguments for <see cref="fm.httpTransfer.addOnSendStart">fm.httpTransfer.addOnSendStart</see>.
 </div>

@extends fm.object
*/


fm.httpSendFinishArgs = (function(_super) {

  __extends(httpSendFinishArgs, _super);

  httpSendFinishArgs.prototype._requestBinaryContent = null;

  httpSendFinishArgs.prototype._requestTextContent = null;

  httpSendFinishArgs.prototype._responseBinaryContent = null;

  httpSendFinishArgs.prototype._responseHeaders = null;

  httpSendFinishArgs.prototype._responseTextContent = null;

  httpSendFinishArgs.prototype._sender = null;

  function httpSendFinishArgs() {
    this.setSender = __bind(this.setSender, this);

    this.setResponseTextContent = __bind(this.setResponseTextContent, this);

    this.setResponseHeaders = __bind(this.setResponseHeaders, this);

    this.setResponseBinaryContent = __bind(this.setResponseBinaryContent, this);

    this.setRequestTextContent = __bind(this.setRequestTextContent, this);

    this.setRequestBinaryContent = __bind(this.setRequestBinaryContent, this);

    this.getSender = __bind(this.getSender, this);

    this.getResponseTextContent = __bind(this.getResponseTextContent, this);

    this.getResponseHeaders = __bind(this.getResponseHeaders, this);

    this.getResponseBinaryContent = __bind(this.getResponseBinaryContent, this);

    this.getRequestTextContent = __bind(this.getRequestTextContent, this);

    this.getRequestBinaryContent = __bind(this.getRequestBinaryContent, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      httpSendFinishArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    httpSendFinishArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.httpSendFinishArgs-getRequestBinaryContent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the binary content of the request.
  	 </div>
  
  	@function getRequestBinaryContent
  	@return {fm.array}
  */


  httpSendFinishArgs.prototype.getRequestBinaryContent = function() {
    return this._requestBinaryContent;
  };

  /*<span id='method-fm.httpSendFinishArgs-getRequestTextContent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the text content of the request.
  	 </div>
  
  	@function getRequestTextContent
  	@return {String}
  */


  httpSendFinishArgs.prototype.getRequestTextContent = function() {
    return this._requestTextContent;
  };

  /*<span id='method-fm.httpSendFinishArgs-getResponseBinaryContent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the binary content of the response.
  	 </div>
  
  	@function getResponseBinaryContent
  	@return {fm.array}
  */


  httpSendFinishArgs.prototype.getResponseBinaryContent = function() {
    return this._responseBinaryContent;
  };

  /*<span id='method-fm.httpSendFinishArgs-getResponseHeaders'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the headers of the response.
  	 </div>
  
  	@function getResponseHeaders
  	@return {fm.nameValueCollection}
  */


  httpSendFinishArgs.prototype.getResponseHeaders = function() {
    return this._responseHeaders;
  };

  /*<span id='method-fm.httpSendFinishArgs-getResponseTextContent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the binary content of the response.
  	 </div>
  
  	@function getResponseTextContent
  	@return {String}
  */


  httpSendFinishArgs.prototype.getResponseTextContent = function() {
    return this._responseTextContent;
  };

  /*<span id='method-fm.httpSendFinishArgs-getSender'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the sender of the request, either a client or publisher.
  	 </div>
  
  	@function getSender
  	@return {fm.object}
  */


  httpSendFinishArgs.prototype.getSender = function() {
    return this._sender;
  };

  httpSendFinishArgs.prototype.setRequestBinaryContent = function() {
    var value;
    value = arguments[0];
    return this._requestBinaryContent = value;
  };

  httpSendFinishArgs.prototype.setRequestTextContent = function() {
    var value;
    value = arguments[0];
    return this._requestTextContent = value;
  };

  httpSendFinishArgs.prototype.setResponseBinaryContent = function() {
    var value;
    value = arguments[0];
    return this._responseBinaryContent = value;
  };

  httpSendFinishArgs.prototype.setResponseHeaders = function() {
    var value;
    value = arguments[0];
    return this._responseHeaders = value;
  };

  httpSendFinishArgs.prototype.setResponseTextContent = function() {
    var value;
    value = arguments[0];
    return this._responseTextContent = value;
  };

  httpSendFinishArgs.prototype.setSender = function() {
    var value;
    value = arguments[0];
    return this._sender = value;
  };

  return httpSendFinishArgs;

})(fm.object);


/*<span id='cls-fm.httpSendStartArgs'>&nbsp;</span>
*/

/**
@class fm.httpSendStartArgs
 <div>
 Arguments for <see cref="fm.httpTransfer.addOnSendStart">fm.httpTransfer.addOnSendStart</see>.
 </div>

@extends fm.object
*/


fm.httpSendStartArgs = (function(_super) {

  __extends(httpSendStartArgs, _super);

  httpSendStartArgs.prototype._requestBinaryContent = null;

  httpSendStartArgs.prototype._requestTextContent = null;

  httpSendStartArgs.prototype._sender = null;

  function httpSendStartArgs() {
    this.setSender = __bind(this.setSender, this);

    this.setRequestTextContent = __bind(this.setRequestTextContent, this);

    this.setRequestBinaryContent = __bind(this.setRequestBinaryContent, this);

    this.getSender = __bind(this.getSender, this);

    this.getRequestTextContent = __bind(this.getRequestTextContent, this);

    this.getRequestBinaryContent = __bind(this.getRequestBinaryContent, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      httpSendStartArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    httpSendStartArgs.__super__.constructor.call(this);
  }

  /*<span id='method-fm.httpSendStartArgs-getRequestBinaryContent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the binary content of the request.
  	 </div>
  
  	@function getRequestBinaryContent
  	@return {fm.array}
  */


  httpSendStartArgs.prototype.getRequestBinaryContent = function() {
    return this._requestBinaryContent;
  };

  /*<span id='method-fm.httpSendStartArgs-getRequestTextContent'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the text content of the request.
  	 </div>
  
  	@function getRequestTextContent
  	@return {String}
  */


  httpSendStartArgs.prototype.getRequestTextContent = function() {
    return this._requestTextContent;
  };

  /*<span id='method-fm.httpSendStartArgs-getSender'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the sender of the request, either a client or publisher.
  	 </div>
  
  	@function getSender
  	@return {fm.object}
  */


  httpSendStartArgs.prototype.getSender = function() {
    return this._sender;
  };

  httpSendStartArgs.prototype.setRequestBinaryContent = function() {
    var value;
    value = arguments[0];
    return this._requestBinaryContent = value;
  };

  httpSendStartArgs.prototype.setRequestTextContent = function() {
    var value;
    value = arguments[0];
    return this._requestTextContent = value;
  };

  httpSendStartArgs.prototype.setSender = function() {
    var value;
    value = arguments[0];
    return this._sender = value;
  };

  return httpSendStartArgs;

})(fm.object);


/*<span id='cls-fm.integerHolder'>&nbsp;</span>
*/

/**
@class fm.integerHolder
 <div>
 Class to hold an integer value passed by reference.
 </div>

@extends fm.object
*/


fm.integerHolder = (function(_super) {

  __extends(integerHolder, _super);

  integerHolder.prototype._value = 0;

  /*<span id='method-fm.integerHolder-fm.integerHolder'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.integerHolder">fm.integerHolder</see> class.
  	 </div>
  	@function fm.integerHolder
  	@param {Integer} value The value.
  	@return {}
  */


  function integerHolder() {
    this.setValue = __bind(this.setValue, this);

    this.getValue = __bind(this.getValue, this);

    var value;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      integerHolder.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 0) {
      integerHolder.__super__.constructor.call(this);
      return;
    }
    if (arguments.length === 1) {
      value = arguments[0];
      integerHolder.__super__.constructor.call(this);
      this.setValue(value);
      return;
    }
  }

  /*<span id='method-fm.integerHolder-getValue'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the value.
  	 </div>
  
  	@function getValue
  	@return {Integer}
  */


  integerHolder.prototype.getValue = function() {
    return this._value;
  };

  /*<span id='method-fm.integerHolder-setValue'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the value.
  	 </div>
  
  	@function setValue
  	@param {Integer} value
  	@return {void}
  */


  integerHolder.prototype.setValue = function() {
    var value;
    value = arguments[0];
    return this._value = value;
  };

  return integerHolder;

})(fm.object);


/*<span id='cls-fm.lockedRandomizer'>&nbsp;</span>
*/

/**
@class fm.lockedRandomizer
 <div>
 Thread-safe class providing access to a single <see cref="fm.lockedRandomizer.Randomizer">fm.lockedRandomizer.Randomizer</see>.
 </div>

@extends fm.object
*/


fm.lockedRandomizer = (function(_super) {

  __extends(lockedRandomizer, _super);

  lockedRandomizer._randomizer = null;

  lockedRandomizer._randomLock = null;

  function lockedRandomizer() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      lockedRandomizer.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
  }

  /*<span id='method-fm.lockedRandomizer-next'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Returns a random number within a specified range.
  	 </div>
  	@function next
  	@param {Integer} minValue The mininum value (inclusive).
  	@param {Integer} maxValue The maximum value (exclusive).
  	@return {Integer}
  */


  lockedRandomizer.next = function() {
    var maxValue, minValue;
    if (arguments.length === 2) {
      minValue = arguments[0];
      maxValue = arguments[1];
      return fm.lockedRandomizer._randomizer.next(minValue, maxValue);
      return;
    }
    if (arguments.length === 0) {
      return fm.lockedRandomizer._randomizer.next();
      return;
    }
    if (arguments.length === 1) {
      maxValue = arguments[0];
      return fm.lockedRandomizer._randomizer.next(maxValue);
    }
  };

  /*<span id='method-fm.lockedRandomizer-nextBytes'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Fills the elements of a specified array of bytes with random numbers.
  	 </div>
  	@function nextBytes
  	@param {fm.array} buffer The array of bytes to fill.
  	@return {void}
  */


  lockedRandomizer.nextBytes = function() {
    var buffer;
    buffer = arguments[0];
    return fm.lockedRandomizer._randomizer.nextBytes(buffer);
  };

  /*<span id='method-fm.lockedRandomizer-nextDouble'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Returns a random number between 0.0 and 1.0.
  	 </div>
  	@function nextDouble
  	@return {Decimal}
  */


  lockedRandomizer.nextDouble = function() {
    return fm.lockedRandomizer._randomizer.nextDouble();
  };

  /*<span id='method-fm.lockedRandomizer-nextLong'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Returns a nonnegative random number.
  	 </div>
  	@function nextLong
  	@return {Integer}
  */


  lockedRandomizer.nextLong = function() {
    return fm.lockedRandomizer._randomizer.nextDouble() * 9.22337203685478e+18;
  };

  /*<span id='method-fm.lockedRandomizer-randomString'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Generates a random string of a specified size.
  	 </div>
  	@function randomString
  	@param {Integer} size The size of the output string.
  	@return {String}
  */


  lockedRandomizer.randomString = function() {
    var size;
    size = arguments[0];
    return fm.lockedRandomizer._randomizer.randomString(size);
  };

  lockedRandomizer._randomizer = new fm.randomizer();

  lockedRandomizer._randomLock = new fm.object();

  return lockedRandomizer;

}).call(this, fm.object);


/*<span id='cls-fm.log'>&nbsp;</span>
*/

/**
@class fm.log
 <div>
 Log utility class.
 </div>

@extends fm.object
*/


fm.log = (function(_super) {

  __extends(log, _super);

  log.__provider = null;

  function log() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      log.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    log.__super__.constructor.call(this);
  }

  /*<span id='method-fm.log-debug'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Logs a debug-level message.
  	 </div>
  	@function debug
  	@param {String} message The message.
  	@param {Error} ex The exception.
  	@return {void}
  */


  log.debug = function() {
    var ex, message;
    if (arguments.length === 1) {
      message = arguments[0];
      fm.log.getProvider().debug(message);
      return;
    }
    if (arguments.length === 2) {
      message = arguments[0];
      ex = arguments[1];
      fm.log.getProvider().debug(message, ex);
    }
  };

  /*<span id='method-fm.log-debugFormat'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Logs a debug-level message.
  	 </div>
  	@function debugFormat
  	@param {String} format A composite format string.
  	@param {fm.array} args An array containing zero or more objects to format.
  	@return {void}
  */


  log.debugFormat = function() {
    var args, format;
    format = arguments[0];
    args = arguments[1];
    return fm.log.getProvider().debugFormat(format, args);
  };

  /*<span id='method-fm.log-error'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Logs an error-level message.
  	 </div>
  	@function error
  	@param {String} message The message.
  	@param {Error} ex The exception.
  	@return {void}
  */


  log.error = function() {
    var ex, message;
    if (arguments.length === 2) {
      message = arguments[0];
      ex = arguments[1];
      fm.log.getProvider().error(message, ex);
      return;
    }
    if (arguments.length === 1) {
      message = arguments[0];
      fm.log.getProvider().error(message);
    }
  };

  /*<span id='method-fm.log-errorFormat'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Logs an error-level message.
  	 </div>
  	@function errorFormat
  	@param {String} format A composite format string.
  	@param {fm.array} args An array containing zero or more objects to format.
  	@return {void}
  */


  log.errorFormat = function() {
    var args, format;
    format = arguments[0];
    args = arguments[1];
    return fm.log.getProvider().errorFormat(format, args);
  };

  /*<span id='method-fm.log-fatal'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Logs a fatal-level message.
  	 </div>
  	@function fatal
  	@param {String} message The message.
  	@param {Error} ex The exception.
  	@return {void}
  */


  log.fatal = function() {
    var ex, message;
    if (arguments.length === 1) {
      message = arguments[0];
      fm.log.getProvider().fatal(message);
      return;
    }
    if (arguments.length === 2) {
      message = arguments[0];
      ex = arguments[1];
      fm.log.getProvider().fatal(message, ex);
    }
  };

  /*<span id='method-fm.log-fatalFormat'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Logs a fatal-level message.
  	 </div>
  	@function fatalFormat
  	@param {String} format A composite format string.
  	@param {fm.array} args An array containing zero or more objects to format.
  	@return {void}
  */


  log.fatalFormat = function() {
    var args, format;
    format = arguments[0];
    args = arguments[1];
    return fm.log.getProvider().fatalFormat(format, args);
  };

  log.getDefault = function() {
    return new fm.nullLogProvider();
  };

  /*<span id='method-fm.log-getIsDebugEnabled'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a value indicating whether logging is enabled for debug-level messages.
  	 </div><value>
  	 <c>true</c> if logging is enabled for debug-level messages; otherwise, <c>false</c>.
  	 </value>
  
  	@function getIsDebugEnabled
  	@return {Boolean}
  */


  log.getIsDebugEnabled = function() {
    return fm.log.getProvider().getIsDebugEnabled();
  };

  /*<span id='method-fm.log-getIsErrorEnabled'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a value indicating whether logging is enabled for error-level messages.
  	 </div><value>
  	 <c>true</c> if logging is enabled for error-level messages; otherwise, <c>false</c>.
  	 </value>
  
  	@function getIsErrorEnabled
  	@return {Boolean}
  */


  log.getIsErrorEnabled = function() {
    return fm.log.getProvider().getIsErrorEnabled();
  };

  /*<span id='method-fm.log-getIsFatalEnabled'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a value indicating whether logging is enabled for fatal-level messages.
  	 </div><value>
  	 <c>true</c> if logging is enabled for fatal-level messages; otherwise, <c>false</c>.
  	 </value>
  
  	@function getIsFatalEnabled
  	@return {Boolean}
  */


  log.getIsFatalEnabled = function() {
    return fm.log.getProvider().getIsFatalEnabled();
  };

  /*<span id='method-fm.log-getIsInfoEnabled'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a value indicating whether logging is enabled for info-level messages.
  	 </div><value>
  	 <c>true</c> if logging is enabled for info-level messages; otherwise, <c>false</c>.
  	 </value>
  
  	@function getIsInfoEnabled
  	@return {Boolean}
  */


  log.getIsInfoEnabled = function() {
    return fm.log.getProvider().getIsInfoEnabled();
  };

  /*<span id='method-fm.log-getIsWarnEnabled'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a value indicating whether logging is enabled for warn-level messages.
  	 </div><value>
  	 <c>true</c> if logging is enabled for warn-level messages; otherwise, <c>false</c>.
  	 </value>
  
  	@function getIsWarnEnabled
  	@return {Boolean}
  */


  log.getIsWarnEnabled = function() {
    return fm.log.getProvider().getIsWarnEnabled();
  };

  /*<span id='method-fm.log-getProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the log provider to use.
  	 </div>
  
  	@function getProvider
  	@return {fm.logProvider}
  */


  log.getProvider = function() {
    var _var0;
    _var0 = fm.log.__provider;
    if (_var0 === null || typeof _var0 === 'undefined') {
      log.__provider = fm.log.getDefault();
    }
    return fm.log.__provider;
  };

  /*<span id='method-fm.log-info'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Logs an info-level message.
  	 </div>
  	@function info
  	@param {String} message The message.
  	@param {Error} ex The exception.
  	@return {void}
  */


  log.info = function() {
    var ex, message;
    if (arguments.length === 2) {
      message = arguments[0];
      ex = arguments[1];
      fm.log.getProvider().info(message, ex);
      return;
    }
    if (arguments.length === 1) {
      message = arguments[0];
      fm.log.getProvider().info(message);
    }
  };

  /*<span id='method-fm.log-infoFormat'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Logs an info-level message.
  	 </div>
  	@function infoFormat
  	@param {String} format A composite format string.
  	@param {fm.array} args An array containing zero or more objects to format.
  	@return {void}
  */


  log.infoFormat = function() {
    var args, format;
    format = arguments[0];
    args = arguments[1];
    return fm.log.getProvider().infoFormat(format, args);
  };

  /*<span id='method-fm.log-setProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the log provider to use.
  	 </div>
  
  	@function setProvider
  	@param {fm.logProvider} value
  	@return {void}
  */


  log.setProvider = function() {
    var value, _var0;
    value = arguments[0];
    _var0 = value;
    if (_var0 === null || typeof _var0 === 'undefined') {
      value = fm.log.getDefault();
    }
    return log.__provider = value;
  };

  /*<span id='method-fm.log-warn'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Logs a warn-level message.
  	 </div>
  	@function warn
  	@param {String} message The message.
  	@param {Error} ex The exception.
  	@return {void}
  */


  log.warn = function() {
    var ex, message;
    if (arguments.length === 1) {
      message = arguments[0];
      fm.log.getProvider().warn(message);
      return;
    }
    if (arguments.length === 2) {
      message = arguments[0];
      ex = arguments[1];
      fm.log.getProvider().warn(message, ex);
    }
  };

  /*<span id='method-fm.log-warnFormat'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Logs a warn-level message.
  	 </div>
  	@function warnFormat
  	@param {String} format A composite format string.
  	@param {fm.array} args An array containing zero or more objects to format.
  	@return {void}
  */


  log.warnFormat = function() {
    var args, format;
    format = arguments[0];
    args = arguments[1];
    return fm.log.getProvider().warnFormat(format, args);
  };

  /*<span id='method-fm.log-writeLine'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Writes a line of text to the log.
  	 </div>
  	@function writeLine
  	@param {String} format A composite format string.
  	@param {fm.array} args An array containing zero or more objects to format.
  	@return {void}
  */


  log.writeLine = function() {
    var args, format, text;
    if (arguments.length === 1) {
      text = arguments[0];
      fm.log.getProvider().writeLine(text);
      return;
    }
    if (arguments.length === 2) {
      format = arguments[0];
      args = arguments[1];
      fm.log.getProvider().formatAndWriteLine(format, args);
    }
  };

  return log;

}).call(this, fm.object);


/*<span id='cls-fm.longHolder'>&nbsp;</span>
*/

/**
@class fm.longHolder
 <div>
 Class to hold a long value passed by reference.
 </div>

@extends fm.object
*/


fm.longHolder = (function(_super) {

  __extends(longHolder, _super);

  longHolder.prototype._value = 0;

  /*<span id='method-fm.longHolder-fm.longHolder'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.longHolder">fm.longHolder</see> class.
  	 </div>
  	@function fm.longHolder
  	@param {Integer} value The value.
  	@return {}
  */


  function longHolder() {
    this.setValue = __bind(this.setValue, this);

    this.getValue = __bind(this.getValue, this);

    var value;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      longHolder.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 0) {
      longHolder.__super__.constructor.call(this);
      return;
    }
    if (arguments.length === 1) {
      value = arguments[0];
      longHolder.__super__.constructor.call(this);
      this.setValue(value);
      return;
    }
  }

  /*<span id='method-fm.longHolder-getValue'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the value.
  	 </div>
  
  	@function getValue
  	@return {Integer}
  */


  longHolder.prototype.getValue = function() {
    return this._value;
  };

  /*<span id='method-fm.longHolder-setValue'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the value.
  	 </div>
  
  	@function setValue
  	@param {Integer} value
  	@return {void}
  */


  longHolder.prototype.setValue = function() {
    var value;
    value = arguments[0];
    return this._value = value;
  };

  return longHolder;

})(fm.object);


/*<span id='cls-fm.shortHolder'>&nbsp;</span>
*/

/**
@class fm.shortHolder
 <div>
 Class to hold a short value passed by reference.
 </div>

@extends fm.object
*/


fm.shortHolder = (function(_super) {

  __extends(shortHolder, _super);

  shortHolder.prototype._value = 0;

  /*<span id='method-fm.shortHolder-fm.shortHolder'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.shortHolder">fm.shortHolder</see> class.
  	 </div>
  	@function fm.shortHolder
  	@param {Integer} value The value.
  	@return {}
  */


  function shortHolder() {
    this.setValue = __bind(this.setValue, this);

    this.getValue = __bind(this.getValue, this);

    var value;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      shortHolder.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 0) {
      shortHolder.__super__.constructor.call(this);
      return;
    }
    if (arguments.length === 1) {
      value = arguments[0];
      shortHolder.__super__.constructor.call(this);
      this.setValue(value);
      return;
    }
  }

  /*<span id='method-fm.shortHolder-getValue'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the value.
  	 </div>
  
  	@function getValue
  	@return {Integer}
  */


  shortHolder.prototype.getValue = function() {
    return this._value;
  };

  /*<span id='method-fm.shortHolder-setValue'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the value.
  	 </div>
  
  	@function setValue
  	@param {Integer} value
  	@return {void}
  */


  shortHolder.prototype.setValue = function() {
    var value;
    value = arguments[0];
    return this._value = value;
  };

  return shortHolder;

})(fm.object);


/*<span id='cls-fm.textLogProvider'>&nbsp;</span>
*/

/**
@class fm.textLogProvider
 <div>
 Simple log provider that writes to a local string builder.
 </div>

@extends fm.logProvider
*/


fm.textLogProvider = (function(_super) {

  __extends(textLogProvider, _super);

  textLogProvider.prototype.__callback = null;

  textLogProvider.prototype.__text = null;

  textLogProvider.prototype.__textLock = null;

  /*<span id='method-fm.textLogProvider-fm.textLogProvider'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.textLogProvider">fm.textLogProvider</see> class.
  	 </div>
  	@function fm.textLogProvider
  	@param {fm.logLevel} level The log level.
  	@return {}
  */


  function textLogProvider() {
    this.writeLine = __bind(this.writeLine, this);

    this.setCallback = __bind(this.setCallback, this);

    this.log = __bind(this.log, this);

    this.getText = __bind(this.getText, this);

    this.getCallback = __bind(this.getCallback, this);

    this.clear = __bind(this.clear, this);

    var level;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      textLogProvider.call(this, fm.logLevel.Warn);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 0) {
      textLogProvider.call(this, fm.logLevel.Warn);
      return;
    }
    if (arguments.length === 1) {
      level = arguments[0];
      textLogProvider.__super__.constructor.call(this);
      this.__text = new fm.stringBuilder();
      this.__textLock = new fm.object();
      this.setLevel(level);
      return;
    }
  }

  /*<span id='method-fm.textLogProvider-clear'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Clears all text from the log
  	 and returns the former contents.
  	 </div>
  
  	@function clear
  	@return {String}
  */


  textLogProvider.prototype.clear = function() {
    var str;
    str = this.__text.toString();
    this.__text = new fm.stringBuilder();
    return str;
  };

  /*<span id='method-fm.textLogProvider-getCallback'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a callback to invoke
  	 whenever text is written to the log.
  	 </div>
  
  	@function getCallback
  	@return {fm.singleAction}
  */


  textLogProvider.prototype.getCallback = function() {
    return this.__callback;
  };

  /*<span id='method-fm.textLogProvider-getText'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the logged text.
  	 </div>
  
  	@function getText
  	@return {String}
  */


  textLogProvider.prototype.getText = function() {
    return this.__text.toString();
  };

  /*<span id='method-fm.textLogProvider-log'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Logs a message at the specified log level.
  	 </div>
  	@function log
  	@param {fm.logLevel} level The log level.
  	@param {String} message The message.
  	@param {Error} ex The exception.
  	@return {void}
  */


  textLogProvider.prototype.log = function() {
    var ex, level, message;
    if (arguments.length === 3) {
      level = arguments[0];
      message = arguments[1];
      ex = arguments[2];
      this.log(level, fm.stringExtensions.format("{0}\n{1}", message, ex));
      return;
    }
    if (arguments.length === 2) {
      level = arguments[0];
      message = arguments[1];
      this.writeLine(fm.stringExtensions.format("{0} {1}", fm.logProvider.getPrefix(level, true), message));
    }
  };

  /*<span id='method-fm.textLogProvider-setCallback'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets a callback to invoke
  	 whenever text is written to the log.
  	 </div>
  
  	@function setCallback
  	@param {fm.singleAction} value
  	@return {void}
  */


  textLogProvider.prototype.setCallback = function() {
    var str, value;
    value = arguments[0];
    str = this.__text.toString();
    if (!fm.stringExtensions.isNullOrEmpty(str)) {
      if (fm.stringExtensions.endsWith(str, "\n")) {
        str = fm.stringExtensions.substring(str, 0, str.length - 1);
      }
      value(str);
    }
    return this.__callback = value;
  };

  /*<span id='method-fm.textLogProvider-writeLine'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Writes a line of text to the log.
  	 </div>
  	@function writeLine
  	@param {String} text The text to write to the log.
  	@return {void}
  */


  textLogProvider.prototype.writeLine = function() {
    var text, _var0;
    text = arguments[0];
    this.__text.append(fm.stringExtensions.concat(text, "\n"));
    _var0 = this.__callback;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      return this.__callback(text);
    }
  };

  return textLogProvider;

})(fm.logProvider);


/*<span id='cls-fm.stringAssistant'>&nbsp;</span>
*/

/**
@class fm.stringAssistant
 <div>
 Contains methods for string manipulation.
 </div>

@extends fm.object
*/


fm.stringAssistant = (function(_super) {

  __extends(stringAssistant, _super);

  function stringAssistant() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      stringAssistant.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    stringAssistant.__super__.constructor.call(this);
  }

  /*<span id='method-fm.stringAssistant-subArray'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Creates a subarray from an existing array.
  	 </div>
  	@function subArray
  	@param {fm.array} array The source array.
  	@param {Integer} offset The offset into the source array.
  	@param {Integer} count The number of elements to copy into the subarray.
  	@return {fm.array} The subarray.
  */


  stringAssistant.subArray = function() {
    var array, count, i, offset, strArray;
    if (arguments.length === 2) {
      array = arguments[0];
      offset = arguments[1];
      return fm.stringAssistant.subArray(array, offset, array.length - offset);
      return;
    }
    if (arguments.length === 3) {
      array = arguments[0];
      offset = arguments[1];
      count = arguments[2];
      strArray = new Array(count);
      i = 0;
      while (i < count) {
        try {
          strArray[i] = array[offset + i];
        } finally {
          i++;
        }
      }
      return strArray;
    }
  };

  return stringAssistant;

}).call(this, fm.object);


/*<span id='cls-fm.httpTransfer'>&nbsp;</span>
*/

/**
@class fm.httpTransfer
 <div>
 Base class that defines methods for transferring content over HTTP.
 </div>

@extends fm.object
*/


fm.httpTransfer = (function(_super) {

  __extends(httpTransfer, _super);

  httpTransfer.__wildcardCharacters = null;

  httpTransfer.prototype._httpTransferCallbackKey = null;

  httpTransfer._onSendFinish = null;

  httpTransfer._onSendStart = null;

  function httpTransfer() {
    this.startRequest = __bind(this.startRequest, this);

    this.shutdown = __bind(this.shutdown, this);

    this.sendTextAsync = __bind(this.sendTextAsync, this);

    this.sendText = __bind(this.sendText, this);

    this.sendBinaryAsync = __bind(this.sendBinaryAsync, this);

    this.sendBinary = __bind(this.sendBinary, this);

    this.sendAsyncCallback = __bind(this.sendAsyncCallback, this);

    this.sendAsync = __bind(this.sendAsync, this);

    this.send = __bind(this.send, this);

    this.raiseOnSendStart = __bind(this.raiseOnSendStart, this);

    this.raiseOnSendFinish = __bind(this.raiseOnSendFinish, this);

    this.finishRequest = __bind(this.finishRequest, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      httpTransfer.__super__.constructor.call(this);
      this._httpTransferCallbackKey = "fm.httpTransfer.callback";
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    httpTransfer.__super__.constructor.call(this);
    this._httpTransferCallbackKey = "fm.httpTransfer.callback";
  }

  /*<span id='method-fm.httpTransfer-addOnSendFinish'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised before an HTTP request is sent.
  	 </div>
  	@function addOnSendFinish
  	@param {fm.singleAction} value
  	@return {void}
  */


  httpTransfer.addOnSendFinish = function() {
    var value;
    value = arguments[0];
    return fm.httpTransfer._onSendFinish = fm.delegate.combine(fm.httpTransfer._onSendFinish, value);
  };

  /*<span id='method-fm.httpTransfer-addOnSendStart'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Adds a handler that is raised before an HTTP request is sent.
  	 </div>
  	@function addOnSendStart
  	@param {fm.singleAction} value
  	@return {void}
  */


  httpTransfer.addOnSendStart = function() {
    var value;
    value = arguments[0];
    return fm.httpTransfer._onSendStart = fm.delegate.combine(fm.httpTransfer._onSendStart, value);
  };

  /*<span id='method-fm.httpTransfer-addQueryToUrl'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Escapes and adds a query parameter as a key/value pair to a URL.
  	 </div>
  	@function addQueryToUrl
  	@param {String} url The URL with the query to which the key/value should be added.
  	@param {String} key The key of the query parameter to add.
  	@param {String} value The value of the query parameter to add.
  	@return {String} The original URL with the query parameter added.
  */


  httpTransfer.addQueryToUrl = function() {
    var key, url, value, _var0;
    if (arguments.length === 2) {
      url = arguments[0];
      key = arguments[1];
      return fm.httpTransfer.addQueryToUrl(url, key, null);
      return;
    }
    if (arguments.length === 3) {
      url = arguments[0];
      key = arguments[1];
      value = arguments[2];
      if (fm.stringExtensions.isNullOrEmpty(key)) {
        return url;
      }
      _var0 = value;
      if (_var0 === null || typeof _var0 === 'undefined') {
        value = fm.stringExtensions.empty;
      }
      key = fm.uri.escapeDataString(key);
      value = fm.uri.escapeDataString(value);
      return fm.stringExtensions.concat([url, (fm.stringExtensions.indexOf(url, "?", fm.stringComparison.OrdinalIgnoreCase) === -1 ? "?" : "&"), key, "=", value]);
    }
  };

  /*<span id='method-fm.httpTransfer-getRandomWildcardCharacter'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets a random wildcard character.
  	 </div>
  	@function getRandomWildcardCharacter
  	@return {String} A random wildcard character.
  */


  httpTransfer.getRandomWildcardCharacter = function() {
    var startIndex, wildcardCharacters;
    wildcardCharacters = fm.httpTransfer.getWildcardCharacters();
    startIndex = new fm.randomizer().next(wildcardCharacters.length);
    return fm.stringExtensions.substring(wildcardCharacters, startIndex, 1);
  };

  /*<span id='method-fm.httpTransfer-getWildcardCharacters'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the wildcard characters used
  	 to replace asterisks in ReplaceWildcards.
  	 </div>
  
  	@function getWildcardCharacters
  	@return {String}
  */


  httpTransfer.getWildcardCharacters = function() {
    return fm.httpTransfer.__wildcardCharacters;
  };

  /*<span id='method-fm.httpTransfer-removeOnSendFinish'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised before an HTTP request is sent.
  	 </div>
  	@function removeOnSendFinish
  	@param {fm.singleAction} value
  	@return {void}
  */


  httpTransfer.removeOnSendFinish = function() {
    var value;
    value = arguments[0];
    return fm.httpTransfer._onSendFinish = fm.delegate.remove(fm.httpTransfer._onSendFinish, value);
  };

  /*<span id='method-fm.httpTransfer-removeOnSendStart'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Removes a handler that is raised before an HTTP request is sent.
  	 </div>
  	@function removeOnSendStart
  	@param {fm.singleAction} value
  	@return {void}
  */


  httpTransfer.removeOnSendStart = function() {
    var value;
    value = arguments[0];
    return fm.httpTransfer._onSendStart = fm.delegate.remove(fm.httpTransfer._onSendStart, value);
  };

  /*<span id='method-fm.httpTransfer-replaceWildcards'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Replaces asterisks in URLs with characters from
  	 WildcardCharacters.
  	 </div>
  	@function replaceWildcards
  	@param {String} url The URL with asterisks.
  	@return {String}
  */


  httpTransfer.replaceWildcards = function() {
    var url;
    url = arguments[0];
    return url.replace("*", fm.httpTransfer.getRandomWildcardCharacter());
  };

  /*<span id='method-fm.httpTransfer-setWildcardCharacters'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the wildcard characters used
  	 to replace asterisks in ReplaceWildcards.
  	 </div>
  
  	@function setWildcardCharacters
  	@param {String} value
  	@return {void}
  */


  httpTransfer.setWildcardCharacters = function() {
    var value;
    value = arguments[0];
    return httpTransfer.__wildcardCharacters = value;
  };

  httpTransfer.prototype.finishRequest = function() {
    var responseArgs;
    responseArgs = arguments[0];
    return this.raiseOnSendFinish(responseArgs);
  };

  httpTransfer.prototype.raiseOnSendFinish = function() {
    var onSendFinish, p, responseArgs, _var0;
    responseArgs = arguments[0];
    onSendFinish = fm.httpTransfer._onSendFinish;
    _var0 = onSendFinish;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      p = new fm.httpSendFinishArgs();
      p.setSender(responseArgs.getRequestArgs().getSender());
      p.setRequestBinaryContent(responseArgs.getRequestArgs().getBinaryContent());
      p.setRequestTextContent(responseArgs.getRequestArgs().getTextContent());
      p.setResponseBinaryContent(responseArgs.getBinaryContent());
      p.setResponseTextContent(responseArgs.getTextContent());
      p.setResponseHeaders(responseArgs.getHeaders());
      return onSendFinish(p);
    }
  };

  httpTransfer.prototype.raiseOnSendStart = function() {
    var onSendStart, p, requestArgs, _var0;
    requestArgs = arguments[0];
    onSendStart = fm.httpTransfer._onSendStart;
    _var0 = onSendStart;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      p = new fm.httpSendStartArgs();
      p.setSender(requestArgs.getSender());
      p.setRequestBinaryContent(requestArgs.getBinaryContent());
      p.setRequestTextContent(requestArgs.getTextContent());
      return onSendStart(p);
    }
  };

  /*<span id='method-fm.httpTransfer-send'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends a request synchronously.
  	 </div>
  	@function send
  	@param {fm.httpRequestArgs} requestArgs The request parameters.
  	@return {fm.httpResponseArgs} The resulting response.
  */


  httpTransfer.prototype.send = function() {
    var args, args2, requestArgs, _var0;
    requestArgs = arguments[0];
    this.startRequest(requestArgs);
    try {
      _var0 = requestArgs.getBinaryContent();
      if (_var0 !== null && typeof _var0 !== 'undefined') {
        args = this.sendBinary(requestArgs);
      } else {
        args = this.sendText(requestArgs);
      }
    } catch (exception) {
      args2 = new fm.httpResponseArgs(requestArgs);
      args2.setException(exception);
      args = args2;
    } finally {

    }
    this.finishRequest(args);
    return args;
  };

  /*<span id='method-fm.httpTransfer-sendAsync'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends a request asynchronously.
  	 </div>
  	@function sendAsync
  	@param {fm.httpRequestArgs} requestArgs The request parameters.
  	@param {fm.singleAction} callback The callback to execute with the resulting response.
  	@return {void}
  */


  httpTransfer.prototype.sendAsync = function() {
    var callback, p, requestArgs, _var0;
    requestArgs = arguments[0];
    callback = arguments[1];
    this.startRequest(requestArgs);
    requestArgs.setDynamicValue(this._httpTransferCallbackKey, callback);
    try {
      _var0 = requestArgs.getBinaryContent();
      if (_var0 !== null && typeof _var0 !== 'undefined') {
        return this.sendBinaryAsync(requestArgs, this.sendAsyncCallback);
      } else {
        return this.sendTextAsync(requestArgs, this.sendAsyncCallback);
      }
    } catch (exception) {
      p = new fm.httpResponseArgs(requestArgs);
      p.setException(exception);
      return callback(p);
    } finally {

    }
  };

  httpTransfer.prototype.sendAsyncCallback = function() {
    var dynamicValue, responseArgs;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getRequestArgs().getDynamicValue(this._httpTransferCallbackKey);
    this.finishRequest(responseArgs);
    return dynamicValue(responseArgs);
  };

  /*<span id='method-fm.httpTransfer-sendBinary'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends binary content synchronously using the specified arguments.
  	 </div>
  	@function sendBinary
  	@param {fm.httpRequestArgs} requestArgs The request arguments.
  	@return {fm.httpResponseArgs} The response arguments from the server.
  */


  httpTransfer.prototype.sendBinary = function() {
    var requestArgs;
    return requestArgs = arguments[0];
  };

  /*<span id='method-fm.httpTransfer-sendBinaryAsync'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends binary content asynchronously using the specified arguments.
  	 </div>
  	@function sendBinaryAsync
  	@param {fm.httpRequestArgs} requestArgs The request arguments.
  	@param {fm.singleAction} callback The callback to execute on success or failure.
  	@return {void}
  */


  httpTransfer.prototype.sendBinaryAsync = function() {
    var callback, requestArgs;
    requestArgs = arguments[0];
    return callback = arguments[1];
  };

  /*<span id='method-fm.httpTransfer-sendText'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends text content synchronously using the specified arguments.
  	 </div>
  	@function sendText
  	@param {fm.httpRequestArgs} requestArgs The request arguments.
  	@return {fm.httpResponseArgs} The response arguments from the server.
  */


  httpTransfer.prototype.sendText = function() {
    var requestArgs;
    return requestArgs = arguments[0];
  };

  /*<span id='method-fm.httpTransfer-sendTextAsync'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sends text content asynchronously using the specified arguments.
  	 </div>
  	@function sendTextAsync
  	@param {fm.httpRequestArgs} requestArgs The request arguments.
  	@param {fm.singleAction} callback The callback to execute on success or failure.
  	@return {void}
  */


  httpTransfer.prototype.sendTextAsync = function() {
    var callback, requestArgs;
    requestArgs = arguments[0];
    return callback = arguments[1];
  };

  /*<span id='method-fm.httpTransfer-shutdown'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Releases any resources and shuts down.
  	 </div>
  
  	@function shutdown
  	@return {void}
  */


  httpTransfer.prototype.shutdown = function() {};

  httpTransfer.prototype.startRequest = function() {
    var requestArgs;
    requestArgs = arguments[0];
    return this.raiseOnSendStart(requestArgs);
  };

  httpTransfer.__wildcardCharacters = "abcdefghijklmnopqrstuvwxyz";

  return httpTransfer;

}).call(this, fm.object);


/*<span id='cls-fm.httpTransferFactory'>&nbsp;</span>
*/

/**
@class fm.httpTransferFactory
 <div>
 Creates implementations of <see cref="fm.httpTransfer">fm.httpTransfer</see>.
 </div>

@extends fm.object
*/


fm.httpTransferFactory = (function(_super) {

  __extends(httpTransferFactory, _super);

  httpTransferFactory._createHttpTransfer = null;

  function httpTransferFactory() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      httpTransferFactory.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    httpTransferFactory.__super__.constructor.call(this);
  }

  httpTransferFactory.defaultCreateHttpTransfer = function() {
    return new fm.httpWebRequestTransfer();
  };

  /*<span id='method-fm.httpTransferFactory-getCreateHttpTransfer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets the callback that creates an HTTP-based transfer class.
  	 </div>
  
  	@function getCreateHttpTransfer
  	@return {fm.emptyFunction}
  */


  httpTransferFactory.getCreateHttpTransfer = function() {
    return fm.httpTransferFactory._createHttpTransfer;
  };

  /*<span id='method-fm.httpTransferFactory-getHttpTransfer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Gets an instance of the HTTP-based transfer class.
  	 </div>
  	@function getHttpTransfer
  	@return {fm.httpTransfer}
  */


  httpTransferFactory.getHttpTransfer = function() {
    var transfer, _var0, _var1;
    _var0 = fm.httpTransferFactory.getCreateHttpTransfer();
    if (_var0 === null || typeof _var0 === 'undefined') {
      httpTransferFactory.setCreateHttpTransfer(httpTransferFactory.defaultCreateHttpTransfer);
    }
    transfer = fm.httpTransferFactory.getCreateHttpTransfer()();
    _var1 = transfer;
    if (_var1 === null || typeof _var1 === 'undefined') {
      transfer = fm.httpTransferFactory.defaultCreateHttpTransfer();
    }
    return transfer;
  };

  /*<span id='method-fm.httpTransferFactory-setCreateHttpTransfer'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Sets the callback that creates an HTTP-based transfer class.
  	 </div>
  
  	@function setCreateHttpTransfer
  	@param {fm.emptyFunction} value
  	@return {void}
  */


  httpTransferFactory.setCreateHttpTransfer = function() {
    var value;
    value = arguments[0];
    return httpTransferFactory._createHttpTransfer = value;
  };

  return httpTransferFactory;

}).call(this, fm.object);




fm.jsonChecker = (function(_super) {

  __extends(jsonChecker, _super);

  jsonChecker.prototype.__depth = 0;

  jsonChecker.prototype.__offset = 0;

  jsonChecker.prototype.__stack = null;

  jsonChecker.prototype.__state = 0;

  jsonChecker._ascii_class = null;

  jsonChecker._state_transition_table = null;

  function jsonChecker() {
    this.push = __bind(this.push, this);

    this.pop = __bind(this.pop, this);

    this.onError = __bind(this.onError, this);

    this.finalCheck = __bind(this.finalCheck, this);

    this.checkString = __bind(this.checkString, this);

    this.check = __bind(this.check, this);

    var depth;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      jsonChecker.call(this, 0);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    if (arguments.length === 0) {
      jsonChecker.call(this, 0);
      return;
    }
    if (arguments.length === 1) {
      depth = arguments[0];
      jsonChecker.__super__.constructor.call(this);
      if (depth < 0) {
        throw new Error("Invalid depth.");
      }
      this.__state = 0;
      this.__depth = depth;
      this.__stack = new fm.stack(depth);
      this.push(fm.jsonCheckerMode.Done);
      return;
    }
  }

  jsonChecker.prototype.check = function() {
    var ch, mode, num, num2;
    ch = arguments[0];
    if (ch < 0) {
      this.onError();
    }
    if (ch >= 128) {
      num = 30;
    } else {
      num = fm.jsonChecker._ascii_class[ch];
      if (num <= -1) {
        this.onError();
      }
    }
    num2 = fm.jsonChecker._state_transition_table[this.__state][num];
    if (num2 >= 0) {
      this.__state = num2;
      return this.__offset = this.__offset + 1;
    } else {
      if (num2 === -9) {
        this.pop(fm.jsonCheckerMode.Key);
        this.__state = 1;
      } else {
        if (num2 === -8) {
          this.pop(fm.jsonCheckerMode.Object);
          this.__state = 1;
        } else {
          if (num2 === -7) {
            this.pop(fm.jsonCheckerMode.Array);
            this.__state = 1;
          } else {
            if (num2 === -6) {
              this.push(fm.jsonCheckerMode.Key);
              this.__state = 2;
            } else {
              if (num2 === -5) {
                this.push(fm.jsonCheckerMode.Array);
                this.__state = 6;
              } else {
                if (num2 === -4) {
                  mode = this.__stack.peek();
                  if (mode === fm.jsonCheckerMode.Key) {
                    this.__state = 4;
                  } else {
                    if ((mode === fm.jsonCheckerMode.Array) || (mode === fm.jsonCheckerMode.Object)) {
                      this.__state = 1;
                    } else {
                      if (mode === fm.jsonCheckerMode.Done) {
                        this.push(fm.jsonCheckerMode.String);
                        this.__state = 7;
                      } else {
                        if (mode === fm.jsonCheckerMode.String) {
                          this.pop(fm.jsonCheckerMode.String);
                          this.__state = 1;
                        } else {
                          this.onError();
                        }
                      }
                    }
                  }
                } else {
                  if (num2 === -3) {
                    mode = this.__stack.peek();
                    if (mode === fm.jsonCheckerMode.Object) {
                      this.pop(fm.jsonCheckerMode.Object);
                      this.push(fm.jsonCheckerMode.Key);
                      this.__state = 3;
                    } else {
                      if (mode === fm.jsonCheckerMode.Array) {
                        this.__state = 5;
                      } else {
                        this.onError();
                      }
                    }
                  } else {
                    if (num2 === -2) {
                      this.pop(fm.jsonCheckerMode.Key);
                      this.push(fm.jsonCheckerMode.Object);
                      this.__state = 5;
                    } else {
                      this.onError();
                    }
                  }
                }
              }
            }
          }
        }
      }
      return this.__offset = this.__offset + 1;
    }
  };

  jsonChecker.prototype.checkString = function() {
    var decimalResult, doubleResult, i, str, _var0, _var1, _var2, _var3;
    str = arguments[0];
    doubleResult = 0;
    decimalResult = 0;
    _var0 = new fm.holder(doubleResult);
    _var1 = fm.parseAssistant.tryParseDoubleValue(str, _var0);
    doubleResult = _var0.getValue();
    _var2 = new fm.holder(decimalResult);
    _var3 = fm.parseAssistant.tryParseDecimalValue(str, _var2);
    decimalResult = _var2.getValue();
    if ((((str === "true") || (str === "false")) || ((str === "null") || _var1)) || _var3) {
      return true;
    }
    try {
      i = 0;
      while (i < str.length) {
        try {
          this.check(fm.convert.toInt32(str.charAt(i)));
        } finally {
          i++;
        }
      }
      this.finalCheck();
      return true;
    } catch (exception1) {
      return false;
    } finally {

    }
  };

  jsonChecker.prototype.finalCheck = function() {
    if (this.__state !== 1) {
      this.onError();
    }
    return this.pop(fm.jsonCheckerMode.Done);
  };

  jsonChecker.prototype.onError = function() {
    throw new Error(fm.stringExtensions.format("Invalid JSON text at character offset {0}.", fm.intExtensions.toString(this.__offset, "N0")));
  };

  jsonChecker.prototype.pop = function() {
    var mode;
    mode = arguments[0];
    if (this.__stack.pop() !== mode) {
      return this.onError();
    }
  };

  jsonChecker.prototype.push = function() {
    var mode;
    mode = arguments[0];
    if ((this.__depth > 0) && (this.__stack.getCount() >= this.__depth)) {
      this.onError();
    }
    return this.__stack.push(mode);
  };

  jsonChecker._ascii_class = [-1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 30, 8, 30, 30, 30, 30, 30, 30, 30, 30, 11, 7, 12, 13, 10, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 6, 30, 30, 30, 30, 30, 30, 28, 28, 28, 28, 29, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 4, 9, 5, 30, 30, 30, 16, 17, 18, 19, 20, 21, 30, 30, 30, 30, 30, 22, 30, 23, 30, 30, 30, 24, 25, 26, 27, 30, 30, 30, 30, 30, 2, 30, 3, 30, 30];

  jsonChecker._state_transition_table = [[0, 0, -6, -1, -5, -1, -1, -1, -4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [1, 1, -1, -8, -1, -7, -1, -3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [2, 2, -1, -9, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [3, 3, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [4, 4, -1, -1, -1, -1, -2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [5, 5, -6, -1, -5, -1, -1, -1, 7, -1, -1, -1, 13, -1, 14, 15, -1, -1, -1, -1, -1, 23, -1, 27, -1, -1, 20, -1, -1, -1, -1], [6, 6, -6, -1, -5, -7, -1, -1, 7, -1, -1, -1, 13, -1, 14, 15, -1, -1, -1, -1, -1, 23, -1, 27, -1, -1, 20, -1, -1, -1, -1], [7, -1, 7, 7, 7, 7, 7, 7, -4, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7], [-1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 7, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, 7, -1, 7, 7, -1, 7, 9, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 10, 10, 10, 10, 10, 10, -1, -1, -1, -1, -1, -1, 10, 10, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 11, 11, 11, 11, 11, 11, 11, -1, -1, -1, -1, -1, -1, 11, 11, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 12, 12, 12, 12, 12, 12, 12, 12, -1, -1, -1, -1, -1, -1, 12, 12, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 7, 7, 7, 7, 7, 7, -1, -1, -1, -1, -1, -1, 7, 7, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14, 15, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [1, 1, -1, -8, -1, -7, -1, -3, -1, -1, -1, -1, -1, 16, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [1, 1, -1, -8, -1, -7, -1, -3, -1, -1, -1, -1, -1, 16, 15, 15, -1, -1, -1, -1, 17, -1, -1, -1, -1, -1, -1, -1, -1, 17, -1], [1, 1, -1, -8, -1, -7, -1, -3, -1, -1, -1, -1, -1, -1, 16, 16, -1, -1, -1, -1, 17, -1, -1, -1, -1, -1, -1, -1, -1, 17, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 18, 18, -1, 19, 19, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 19, 19, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [1, 1, -1, -8, -1, -7, -1, -3, -1, -1, -1, -1, -1, -1, 19, 19, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 21, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 22, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 24, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 25, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 26, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 28, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 29, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1]];

  return jsonChecker;

})(fm.object);


/*<span id='cls-fm.nullLogProvider'>&nbsp;</span>
*/

/**
@class fm.nullLogProvider
 <div>
 An implementation of a logging provider that does nothing.
 </div>

@extends fm.logProvider
*/


fm.nullLogProvider = (function(_super) {

  __extends(nullLogProvider, _super);

  function nullLogProvider() {
    this.writeLine = __bind(this.writeLine, this);

    this.log = __bind(this.log, this);
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      nullLogProvider.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    nullLogProvider.__super__.constructor.call(this);
  }

  /*<span id='method-fm.nullLogProvider-log'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Ignores a message at the specified log level.
  	 </div>
  	@function log
  	@param {fm.logLevel} level The log level.
  	@param {String} message The message.
  	@param {Error} ex The exception.
  	@return {void}
  */


  nullLogProvider.prototype.log = function() {
    var ex, level, message;
    if (arguments.length === 3) {
      level = arguments[0];
      message = arguments[1];
      ex = arguments[2];
      return;
    }
    if (arguments.length === 2) {
      level = arguments[0];
      message = arguments[1];
    }
  };

  /*<span id='method-fm.nullLogProvider-writeLine'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Writes a line of text to the log.
  	 </div>
  	@function writeLine
  	@param {String} text The text to write to the log.
  	@return {void}
  */


  nullLogProvider.prototype.writeLine = function() {
    var text;
    return text = arguments[0];
  };

  return nullLogProvider;

})(fm.logProvider);


/*<span id='cls-fm.serializer'>&nbsp;</span>
*/

/**
@class fm.serializer
 <div>
 Provides methods for serializing/deserializing .NET value types
 as well as facilities for converting objects and arrays if
 appropriate callbacks are supplied to assist with the conversion.
 </div>

@extends fm.object
*/


fm.serializer = (function(_super) {

  __extends(serializer, _super);

  function serializer() {
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      serializer.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return;
    }
    serializer.__super__.constructor.call(this);
  }

  serializer.charToUnicodeString = function() {
    var ch, ch2, ch3, ch4, value;
    value = arguments[0];
    ch = fm.serializer.intToHex((value >> 12) & 15);
    ch2 = fm.serializer.intToHex((value >> 8) & 15);
    ch3 = fm.serializer.intToHex((value >> 4) & 15);
    ch4 = fm.serializer.intToHex(value & 15);
    return fm.stringExtensions.concat(["\\u", ch, ch2, ch3, ch4]);
  };

  /*<span id='method-fm.serializer-deserializeBoolean'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a boolean value.
  	 </div>
  	@function deserializeBoolean
  	@param {String} valueJson The boolean JSON to deserialize.
  	@return {fm.nullable} The deserialized boolean value.
  */


  serializer.deserializeBoolean = function() {
    var boolResult, valueJson, _var0, _var1;
    valueJson = arguments[0];
    if (!fm.stringExtensions.isNullOrEmpty(valueJson)) {
      valueJson = fm.stringExtensions.trim(valueJson);
      if (valueJson === "null") {
        return null;
      }
      boolResult = false;
      _var0 = new fm.holder(boolResult);
      _var1 = fm.parseAssistant.tryParseBooleanValue(valueJson, _var0);
      boolResult = _var0.getValue();
      if (_var1) {
        return boolResult;
      }
    }
    return null;
  };

  /*<span id='method-fm.serializer-deserializeBooleanArray'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a boolean array from JSON.
  	 </div>
  	@function deserializeBooleanArray
  	@param {String} arrayJson A JSON-serialized boolean array.
  	@return {fm.array} An array of boolean values.
  */


  serializer.deserializeBooleanArray = function() {
    var arrayJson, flagArray, i, strArray;
    arrayJson = arguments[0];
    if (fm.stringExtensions.isNullOrEmpty(arrayJson)) {
      return null;
    }
    arrayJson = fm.stringExtensions.trim(arrayJson);
    if (arrayJson === "null") {
      return null;
    }
    flagArray = null;
    if (arrayJson.charAt(0) === '[') {
      arrayJson = fm.stringExtensions.substring(arrayJson, 1, arrayJson.length - 2);
      if (fm.stringExtensions.isNullOrEmpty(arrayJson)) {
        flagArray = new Array(0);
      } else {
        strArray = fm.stringExtensions.split(arrayJson, [',']);
        flagArray = new Array(strArray.length);
        i = 0;
        while (i < strArray.length) {
          try {
            flagArray[i] = fm.serializer.deserializeBoolean(fm.stringExtensions.trim(strArray[i]));
          } finally {
            i++;
          }
        }
      }
    }
    return flagArray;
  };

  /*<span id='method-fm.serializer-deserializeDecimal'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a decimal value.
  	 </div>
  	@function deserializeDecimal
  	@param {String} valueJson The decimal JSON to deserialize.
  	@return {fm.nullable} The deserialized decimal value.
  */


  serializer.deserializeDecimal = function() {
    var decimalResult, valueJson, _var0, _var1;
    valueJson = arguments[0];
    if (!fm.stringExtensions.isNullOrEmpty(valueJson)) {
      valueJson = fm.stringExtensions.trim(valueJson);
      if (valueJson === "null") {
        return null;
      }
      decimalResult = 0;
      _var0 = new fm.holder(decimalResult);
      _var1 = fm.parseAssistant.tryParseDecimalValue(valueJson, _var0);
      decimalResult = _var0.getValue();
      if (_var1) {
        return decimalResult;
      }
    }
    return null;
  };

  /*<span id='method-fm.serializer-deserializeDecimalArray'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a decimal array from JSON.
  	 </div>
  	@function deserializeDecimalArray
  	@param {String} arrayJson A JSON-serialized decimal array.
  	@return {fm.array} An array of decimal values.
  */


  serializer.deserializeDecimalArray = function() {
    var arrayJson, i, numArray, strArray;
    arrayJson = arguments[0];
    if (fm.stringExtensions.isNullOrEmpty(arrayJson)) {
      return null;
    }
    arrayJson = fm.stringExtensions.trim(arrayJson);
    if (arrayJson === "null") {
      return null;
    }
    numArray = null;
    if (arrayJson.charAt(0) === '[') {
      arrayJson = fm.stringExtensions.substring(arrayJson, 1, arrayJson.length - 2);
      if (fm.stringExtensions.isNullOrEmpty(arrayJson)) {
        numArray = new Array(0);
      } else {
        strArray = fm.stringExtensions.split(arrayJson, [',']);
        numArray = new Array(strArray.length);
        i = 0;
        while (i < strArray.length) {
          try {
            numArray[i] = fm.serializer.deserializeDecimal(fm.stringExtensions.trim(strArray[i]));
          } finally {
            i++;
          }
        }
      }
    }
    return numArray;
  };

  /*<span id='method-fm.serializer-deserializeDouble'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a double value.
  	 </div>
  	@function deserializeDouble
  	@param {String} valueJson The double JSON to deserialize.
  	@return {fm.nullable} The deserialized double value.
  */


  serializer.deserializeDouble = function() {
    var doubleResult, valueJson, _var0, _var1;
    valueJson = arguments[0];
    if (!fm.stringExtensions.isNullOrEmpty(valueJson)) {
      valueJson = fm.stringExtensions.trim(valueJson);
      if (valueJson === "null") {
        return null;
      }
      doubleResult = 0;
      _var0 = new fm.holder(doubleResult);
      _var1 = fm.parseAssistant.tryParseDoubleValue(valueJson, _var0);
      doubleResult = _var0.getValue();
      if (_var1) {
        return doubleResult;
      }
    }
    return null;
  };

  /*<span id='method-fm.serializer-deserializeDoubleArray'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a double array from JSON.
  	 </div>
  	@function deserializeDoubleArray
  	@param {String} arrayJson A JSON-serialized double array.
  	@return {fm.array} An array of double values.
  */


  serializer.deserializeDoubleArray = function() {
    var arrayJson, i, numArray, strArray;
    arrayJson = arguments[0];
    if (fm.stringExtensions.isNullOrEmpty(arrayJson)) {
      return null;
    }
    arrayJson = fm.stringExtensions.trim(arrayJson);
    if (arrayJson === "null") {
      return null;
    }
    numArray = null;
    if (arrayJson.charAt(0) === '[') {
      arrayJson = fm.stringExtensions.substring(arrayJson, 1, arrayJson.length - 2);
      if (fm.stringExtensions.isNullOrEmpty(arrayJson)) {
        numArray = new Array(0);
      } else {
        strArray = fm.stringExtensions.split(arrayJson, [',']);
        numArray = new Array(strArray.length);
        i = 0;
        while (i < strArray.length) {
          try {
            numArray[i] = fm.serializer.deserializeDouble(fm.stringExtensions.trim(strArray[i]));
          } finally {
            i++;
          }
        }
      }
    }
    return numArray;
  };

  /*<span id='method-fm.serializer-deserializeFloat'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a float value.
  	 </div>
  	@function deserializeFloat
  	@param {String} valueJson The float JSON to deserialize.
  	@return {fm.nullable} The deserialized float value.
  */


  serializer.deserializeFloat = function() {
    var floatResult, valueJson, _var0, _var1;
    valueJson = arguments[0];
    if (!fm.stringExtensions.isNullOrEmpty(valueJson)) {
      valueJson = fm.stringExtensions.trim(valueJson);
      if (valueJson === "null") {
        return null;
      }
      floatResult = 0;
      _var0 = new fm.holder(floatResult);
      _var1 = fm.parseAssistant.tryParseFloatValue(valueJson, _var0);
      floatResult = _var0.getValue();
      if (_var1) {
        return floatResult;
      }
    }
    return null;
  };

  /*<span id='method-fm.serializer-deserializeFloatArray'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a float array from JSON.
  	 </div>
  	@function deserializeFloatArray
  	@param {String} arrayJson A JSON-serialized float array.
  	@return {fm.array} An array of float values.
  */


  serializer.deserializeFloatArray = function() {
    var arrayJson, i, numArray, strArray;
    arrayJson = arguments[0];
    if (fm.stringExtensions.isNullOrEmpty(arrayJson)) {
      return null;
    }
    arrayJson = fm.stringExtensions.trim(arrayJson);
    if (arrayJson === "null") {
      return null;
    }
    numArray = null;
    if (arrayJson.charAt(0) === '[') {
      arrayJson = fm.stringExtensions.substring(arrayJson, 1, arrayJson.length - 2);
      if (fm.stringExtensions.isNullOrEmpty(arrayJson)) {
        numArray = new Array(0);
      } else {
        strArray = fm.stringExtensions.split(arrayJson, [',']);
        numArray = new Array(strArray.length);
        i = 0;
        while (i < strArray.length) {
          try {
            numArray[i] = fm.serializer.deserializeFloat(fm.stringExtensions.trim(strArray[i]));
          } finally {
            i++;
          }
        }
      }
    }
    return numArray;
  };

  /*<span id='method-fm.serializer-deserializeGuid'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a globally unique identifier.
  	 </div>
  	@function deserializeGuid
  	@param {String} valueJson The GUID JSON to deserialize.
  	@return {fm.nullable} The deserialized GUID.
  */


  serializer.deserializeGuid = function() {
    var empty, valueJson, _var0, _var1;
    valueJson = arguments[0];
    if (!fm.stringExtensions.isNullOrEmpty(valueJson)) {
      valueJson = fm.stringExtensions.trim(valueJson);
      if (valueJson === "null") {
        return null;
      }
      empty = fm.guid.empty;
      _var0 = new fm.holder(empty);
      _var1 = fm.parseAssistant.tryParseGuidValue(fm.serializer.deserializeString(valueJson), _var0);
      empty = _var0.getValue();
      if (_var1) {
        return empty;
      }
    }
    return null;
  };

  /*<span id='method-fm.serializer-deserializeGuidArray'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a GUID array from JSON.
  	 </div>
  	@function deserializeGuidArray
  	@param {String} arrayJson A JSON-serialized GUID array.
  	@return {fm.array} An array of GUID values.
  */


  serializer.deserializeGuidArray = function() {
    var arrayJson, guidArray, i, strArray;
    arrayJson = arguments[0];
    if (fm.stringExtensions.isNullOrEmpty(arrayJson)) {
      return null;
    }
    arrayJson = fm.stringExtensions.trim(arrayJson);
    if (arrayJson === "null") {
      return null;
    }
    guidArray = null;
    if (arrayJson.charAt(0) === '[') {
      arrayJson = fm.stringExtensions.substring(arrayJson, 1, arrayJson.length - 2);
      if (fm.stringExtensions.isNullOrEmpty(arrayJson)) {
        guidArray = new Array(0);
      } else {
        strArray = fm.stringExtensions.split(arrayJson, [',']);
        guidArray = new Array(strArray.length);
        i = 0;
        while (i < strArray.length) {
          try {
            guidArray[i] = fm.serializer.deserializeGuid(fm.stringExtensions.trim(strArray[i]));
          } finally {
            i++;
          }
        }
      }
    }
    return guidArray;
  };

  /*<span id='method-fm.serializer-deserializeInteger'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes an integer value.
  	 </div>
  	@function deserializeInteger
  	@param {String} valueJson The integer JSON to deserialize.
  	@return {fm.nullable} The deserialized integer value.
  */


  serializer.deserializeInteger = function() {
    var intResult, valueJson, _var0, _var1;
    valueJson = arguments[0];
    if (!fm.stringExtensions.isNullOrEmpty(valueJson)) {
      valueJson = fm.stringExtensions.trim(valueJson);
      if (valueJson === "null") {
        return null;
      }
      intResult = 0;
      _var0 = new fm.holder(intResult);
      _var1 = fm.parseAssistant.tryParseIntegerValue(valueJson, _var0);
      intResult = _var0.getValue();
      if (_var1) {
        return intResult;
      }
    }
    return null;
  };

  /*<span id='method-fm.serializer-deserializeIntegerArray'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a integer array from JSON.
  	 </div>
  	@function deserializeIntegerArray
  	@param {String} arrayJson A JSON-serialized integer array.
  	@return {fm.array} An array of integer values.
  */


  serializer.deserializeIntegerArray = function() {
    var arrayJson, i, numArray, strArray;
    arrayJson = arguments[0];
    if (fm.stringExtensions.isNullOrEmpty(arrayJson)) {
      return null;
    }
    arrayJson = fm.stringExtensions.trim(arrayJson);
    if (arrayJson === "null") {
      return null;
    }
    numArray = null;
    if (arrayJson.charAt(0) === '[') {
      arrayJson = fm.stringExtensions.substring(arrayJson, 1, arrayJson.length - 2);
      if (fm.stringExtensions.isNullOrEmpty(arrayJson)) {
        numArray = new Array(0);
      } else {
        strArray = fm.stringExtensions.split(arrayJson, [',']);
        numArray = new Array(strArray.length);
        i = 0;
        while (i < strArray.length) {
          try {
            numArray[i] = fm.serializer.deserializeInteger(fm.stringExtensions.trim(strArray[i]));
          } finally {
            i++;
          }
        }
      }
    }
    return numArray;
  };

  /*<span id='method-fm.serializer-deserializeLong'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a long value.
  	 </div>
  	@function deserializeLong
  	@param {String} valueJson The long JSON to deserialize.
  	@return {fm.nullable} The deserialized long value.
  */


  serializer.deserializeLong = function() {
    var longResult, valueJson, _var0, _var1;
    valueJson = arguments[0];
    if (!fm.stringExtensions.isNullOrEmpty(valueJson)) {
      valueJson = fm.stringExtensions.trim(valueJson);
      if (valueJson === "null") {
        return null;
      }
      longResult = 0;
      _var0 = new fm.holder(longResult);
      _var1 = fm.parseAssistant.tryParseLongValue(valueJson, _var0);
      longResult = _var0.getValue();
      if (_var1) {
        return longResult;
      }
    }
    return null;
  };

  /*<span id='method-fm.serializer-deserializeLongArray'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a long array from JSON.
  	 </div>
  	@function deserializeLongArray
  	@param {String} arrayJson A JSON-serialized long array.
  	@return {fm.array} An array of long values.
  */


  serializer.deserializeLongArray = function() {
    var arrayJson, i, numArray, strArray;
    arrayJson = arguments[0];
    if (fm.stringExtensions.isNullOrEmpty(arrayJson)) {
      return null;
    }
    arrayJson = fm.stringExtensions.trim(arrayJson);
    if (arrayJson === "null") {
      return null;
    }
    numArray = null;
    if (arrayJson.charAt(0) === '[') {
      arrayJson = fm.stringExtensions.substring(arrayJson, 1, arrayJson.length - 2);
      if (fm.stringExtensions.isNullOrEmpty(arrayJson)) {
        numArray = new Array(0);
      } else {
        strArray = fm.stringExtensions.split(arrayJson, [',']);
        numArray = new Array(strArray.length);
        i = 0;
        while (i < strArray.length) {
          try {
            numArray[i] = fm.serializer.deserializeLong(fm.stringExtensions.trim(strArray[i]));
          } finally {
            i++;
          }
        }
      }
    }
    return numArray;
  };

  /*<span id='method-fm.serializer-deserializeObject'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a JSON string into a target object type.
  	 </div><typeparam name="T">The type of the object to deserialize.</typeparam>
  	@function deserializeObject
  	@param {String} json The JSON-encoded string.
  	@param {fm.emptyFunction} creator The method used for creating a new object.
  	@param {fm.deserializeCallback} callback The method used for deserializing a property.
  	@return {fm.object} The deserialized object.
  */


  serializer.deserializeObject = function() {
    var callback, ch, creator, flag, flag2, flag3, i, json, none, num, num2, num3, num5, startIndex, str2, target, type2, valueJson, _var0;
    json = arguments[0];
    creator = arguments[1];
    callback = arguments[2];
    _var0 = json;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    json = fm.stringExtensions.trim(json);
    if ((json === "null") || (json.length < 2)) {
      return null;
    }
    target = creator();
    if (((json.charAt(0) === '{') && (json.charAt(json.length - 1) === '}')) && (json.length > 2)) {
      json = fm.stringExtensions.concat(fm.stringExtensions.substring(json, 1, json.length - 2), ",");
      num = 0;
      num2 = 0;
      flag = false;
      num3 = -2;
      none = fm.stringType.None;
      startIndex = 0;
      num5 = 0;
      valueJson = fm.stringExtensions.empty;
      str2 = fm.stringExtensions.empty;
      i = 0;
      while (i < json.length) {
        try {
          ch = json.charAt(i);
          flag2 = num3 === (i - 1);
          flag3 = false;
          if (!flag) {
            switch (ch) {
              case '[':
                num2++;
                flag3 = true;
                break;
              case ']':
                num2--;
                flag3 = true;
                break;
              case '{':
                num++;
                flag3 = true;
                break;
              case '}':
                num--;
                flag3 = true;
                break;
            }
          }
          if (!flag3) {
            if (flag && !((ch !== '\\') || flag2)) {
              num3 = i;
              flag3 = true;
            }
            if (!flag3) {
              if ((num === 0) && (num2 === 0)) {
                switch (ch) {
                  case ',':
                    if (!flag) {
                      str2 = fm.stringExtensions.trim(fm.stringExtensions.substring(json, num5, i - num5));
                      callback(target, fm.serializer.deserializeString(valueJson), str2);
                      startIndex = i + 1;
                    }
                    flag3 = true;
                    break;
                  case ':':
                    if (!flag) {
                      valueJson = fm.stringExtensions.trim(fm.stringExtensions.substring(json, startIndex, i - startIndex));
                      num5 = i + 1;
                    }
                    flag3 = true;
                    break;
                }
              }
              if (!flag3 && (((ch === '\'') || (ch === '"')) && !flag2)) {
                type2 = (ch === '"' ? fm.stringType.Double : fm.stringType.Single);
                if (!flag) {
                  flag = true;
                  none = type2;
                } else {
                  if (none === type2) {
                    flag = false;
                    none = fm.stringType.None;
                  }
                }
                flag3 = true;
              }
            }
          }
        } finally {
          i++;
        }
      }
    }
    return target;
  };

  /*<span id='method-fm.serializer-deserializeObjectArray'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a JSON string into an array of target object types.
  	 </div><typeparam name="T">The type of the object to deserialize.</typeparam>
  	@function deserializeObjectArray
  	@param {String} json The JSON-encoded string.
  	@param {fm.emptyFunction} creator The method used for creating an object.
  	@param {fm.deserializeCallback} callback The method used for deserializing an object.
  	@return {Array} An array of deserialized objects.
  */


  serializer.deserializeObjectArray = function() {
    var callback, creator, item, json, list, list2, str, _i, _len, _var0, _var1;
    json = arguments[0];
    creator = arguments[1];
    callback = arguments[2];
    list = fm.serializer.deserializeRawArray(json);
    _var0 = list;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    list2 = [];
    _var1 = list;
    for (_i = 0, _len = _var1.length; _i < _len; _i++) {
      str = _var1[_i];
      item = fm.serializer.deserializeObject(str, creator, callback);
      fm.arrayExtensions.add(list2, item);
    }
    return list2;
  };

  /*<span id='method-fm.serializer-deserializeObjectArrayFast'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a JSON string into an array of <see cref="fm.serializable">fm.serializable</see> target object types.
  	 </div><typeparam name="T">The type of the object to deserialize.</typeparam>
  	@function deserializeObjectArrayFast
  	@param {String} json The JSON-encoded string.
  	@param {fm.emptyFunction} creator The method used for creating an object.
  	@param {fm.deserializeCallback} callback The method used for deserializing an object.
  	@return {Array} An array of deserialized objects.
  */


  serializer.deserializeObjectArrayFast = function() {
    var callback, creator, item, json, list, list2, str, _i, _len, _var0, _var1;
    json = arguments[0];
    creator = arguments[1];
    callback = arguments[2];
    list = fm.serializer.deserializeRawArray(json);
    _var0 = list;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    list2 = [];
    _var1 = list;
    for (_i = 0, _len = _var1.length; _i < _len; _i++) {
      str = _var1[_i];
      item = fm.serializer.deserializeObject(str, creator, callback);
      item.setSerialized(str);
      fm.arrayExtensions.add(list2, item);
    }
    return list2;
  };

  /*<span id='method-fm.serializer-deserializeObjectFast'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a JSON string into a <see cref="fm.serializable">fm.serializable</see> target object type.
  	 </div><typeparam name="T">The type of the object to deserialize.</typeparam>
  	@function deserializeObjectFast
  	@param {String} json The JSON-encoded string.
  	@param {fm.emptyFunction} creator The method used for creating a new object.
  	@param {fm.deserializeCallback} callback The method used for deserializing a property.
  	@return {fm.object} The deserialized object.
  */


  serializer.deserializeObjectFast = function() {
    var callback, creator, json, local, _var0;
    json = arguments[0];
    creator = arguments[1];
    callback = arguments[2];
    local = fm.serializer.deserializeObject(json, creator, callback);
    _var0 = local;
    if (_var0 !== null && typeof _var0 !== 'undefined') {
      local.setSerialized(json);
    }
    return local;
  };

  /*<span id='method-fm.serializer-deserializeRaw'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a piece of raw JSON.
  	 </div>
  	@function deserializeRaw
  	@param {String} dataJson The raw data.
  	@return {String} The deserialized data.
  */


  serializer.deserializeRaw = function() {
    var dataJson;
    dataJson = arguments[0];
    if (fm.stringExtensions.isNullOrEmpty(dataJson)) {
      return null;
    }
    return fm.stringExtensions.trim(dataJson);
  };

  /*<span id='method-fm.serializer-deserializeRawArray'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a raw array from JSON.
  	 </div>
  	@function deserializeRawArray
  	@param {String} json A JSON-serialized raw array.
  	@return {Array} An array of raw values.
  */


  serializer.deserializeRawArray = function() {
    var ch, flag, flag2, i, json, list, none, num, num3, startIndex, type2, _var0;
    json = arguments[0];
    _var0 = json;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return null;
    }
    json = fm.stringExtensions.trim(json);
    if ((json === "null") || (json.length < 2)) {
      return null;
    }
    list = [];
    if (((json.charAt(0) === '[') && (json.charAt(json.length - 1) === ']')) && (json.length > 2)) {
      num = 0;
      startIndex = 0;
      flag = false;
      num3 = -2;
      none = fm.stringType.None;
      i = 1;
      while (i < (json.length - 1)) {
        try {
          ch = json.charAt(i);
          flag2 = num3 === (i - 1);
          if (!flag) {
            switch (ch) {
              case '{':
                if (num === 0) {
                  startIndex = i;
                }
                num++;
                break;
              case '}':
                num--;
                if (num === 0) {
                  fm.arrayExtensions.add(list, fm.stringExtensions.substring(json, startIndex, (i - startIndex) + 1));
                }
                break;
            }
          }
          if (flag && !((ch !== '\\') || flag2)) {
            num3 = i;
          } else {
            if (((ch === '\'') || (ch === '"')) && !flag2) {
              type2 = (ch === '"' ? fm.stringType.Double : fm.stringType.Single);
              if (!flag) {
                flag = true;
                none = type2;
              } else {
                if (none === type2) {
                  flag = false;
                  none = fm.stringType.None;
                }
              }
            }
          }
        } finally {
          i++;
        }
      }
    }
    return list;
  };

  /*<span id='method-fm.serializer-deserializeString'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a string.
  	 </div>
  	@function deserializeString
  	@param {String} valueJson The string to deserialize.
  	@return {String} The deserialized string value.
  */


  serializer.deserializeString = function() {
    var valueJson;
    valueJson = arguments[0];
    if (fm.stringExtensions.isNullOrEmpty(valueJson)) {
      return null;
    }
    valueJson = fm.stringExtensions.trim(valueJson);
    if (valueJson === "null") {
      return null;
    }
    return fm.serializer.unescapeString(fm.serializer.trimQuotes(valueJson));
  };

  /*<span id='method-fm.serializer-deserializeStringArray'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Deserializes a simple string array from JSON (no commas in strings).
  	 </div>
  	@function deserializeStringArray
  	@param {String} arrayJson A JSON-serialized string array.
  	@return {fm.array} An array of string values.
  */


  serializer.deserializeStringArray = function() {
    var arrayJson, i, strArray;
    arrayJson = arguments[0];
    if (fm.stringExtensions.isNullOrEmpty(arrayJson)) {
      return null;
    }
    arrayJson = fm.stringExtensions.trim(arrayJson);
    if (arrayJson === "null") {
      return null;
    }
    if (arrayJson.charAt(0) === '[') {
      arrayJson = fm.stringExtensions.substring(arrayJson, 1, arrayJson.length - 2);
      if (fm.stringExtensions.isNullOrEmpty(arrayJson)) {
        strArray = new Array(0);
      } else {
        strArray = fm.stringExtensions.split(arrayJson, [',']);
        i = 0;
        while (i < strArray.length) {
          try {
            strArray[i] = fm.serializer.unescapeString(fm.serializer.trimQuotes(fm.stringExtensions.trim(strArray[i])));
          } finally {
            i++;
          }
        }
      }
      return strArray;
    }
    return [arrayJson];
  };

  /*<span id='method-fm.serializer-escapeString'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Escapes any special characters in a string.
  	 </div>
  	@function escapeString
  	@param {String} text The string without escaped characters.
  	@return {String} The escaped string.
  */


  serializer.escapeString = function() {
    var builder, ch, i, text;
    text = arguments[0];
    builder = new fm.stringBuilder();
    i = 0;
    while (i < text.length) {
      try {
        ch = text.charAt(i);
        if (ch > '~') {
          builder.append(fm.serializer.charToUnicodeString(ch));
        } else {
          if (ch === '\b') {
            builder.append("\\b");
          } else {
            if (ch === '\f') {
              builder.append("\\f");
            } else {
              if (ch === '\n') {
                builder.append("\\n");
              } else {
                if (ch === '\r') {
                  builder.append("\\r");
                } else {
                  if (ch === '\t') {
                    builder.append("\\t");
                  } else {
                    if (ch === '"') {
                      builder.append("\\\"");
                    } else {
                      if (ch === '/') {
                        builder.append("\\/");
                      } else {
                        if (ch === '\\') {
                          builder.append("\\\\");
                        } else {
                          builder.append(ch.toString());
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } finally {
        i++;
      }
    }
    return builder.toString();
  };

  serializer.intToHex = function() {
    var value;
    value = arguments[0];
    if (value <= 9) {
      return value + 48;
    }
    return (value - 10) + 97;
  };

  /*<span id='method-fm.serializer-isValidJson'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Determines whether the specified JSON string is valid.
  	 </div>
  	@function isValidJson
  	@param {String} json The JSON string to validate.
  	@return {Boolean} True if the JSON string is valid; false otherwise.
  */


  serializer.isValidJson = function() {
    var json;
    json = arguments[0];
    return new fm.jsonChecker().checkString(json);
  };

  /*<span id='method-fm.serializer-serializeBoolean'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a boolean value.
  	 </div>
  	@function serializeBoolean
  	@param {fm.nullable} value The boolean to serialize.
  	@return {String} The serialized boolean value.
  */


  serializer.serializeBoolean = function() {
    var value;
    value = arguments[0];
    if (!(value !== null)) {
      return "null";
    }
    if (value) {
      return "true";
    }
    return "false";
  };

  /*<span id='method-fm.serializer-serializeBooleanArray'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a boolean array to JSON.
  	 </div>
  	@function serializeBooleanArray
  	@param {fm.array} array An array of boolean values.
  	@return {String} A JSON-serialized boolean array.
  */


  serializer.serializeBooleanArray = function() {
    var array, i, strArray, _var0;
    array = arguments[0];
    _var0 = array;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return "null";
    }
    strArray = new Array(array.length);
    i = 0;
    while (i < array.length) {
      try {
        strArray[i] = fm.serializer.serializeBoolean(array[i]);
      } finally {
        i++;
      }
    }
    return fm.stringExtensions.concat("[", fm.stringExtensions.join(",", strArray), "]");
  };

  /*<span id='method-fm.serializer-serializeDecimal'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a decimal value.
  	 </div>
  	@function serializeDecimal
  	@param {fm.nullable} value The decimal to serialize.
  	@return {String} The serialized decimal value.
  */


  serializer.serializeDecimal = function() {
    var value;
    value = arguments[0];
    if (!(value !== null)) {
      return "null";
    }
    return value.toString();
  };

  /*<span id='method-fm.serializer-serializeDecimalArray'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a decimal array to JSON.
  	 </div>
  	@function serializeDecimalArray
  	@param {fm.array} array An array of decimal values.
  	@return {String} A JSON-serialized decimal array.
  */


  serializer.serializeDecimalArray = function() {
    var array, i, strArray, _var0;
    array = arguments[0];
    _var0 = array;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return "null";
    }
    strArray = new Array(array.length);
    i = 0;
    while (i < array.length) {
      try {
        strArray[i] = fm.serializer.serializeDecimal(array[i]);
      } finally {
        i++;
      }
    }
    return fm.stringExtensions.concat("[", fm.stringExtensions.join(",", strArray), "]");
  };

  /*<span id='method-fm.serializer-serializeDouble'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a double value.
  	 </div>
  	@function serializeDouble
  	@param {fm.nullable} value The double to serialize.
  	@return {String} The serialized double value.
  */


  serializer.serializeDouble = function() {
    var value;
    value = arguments[0];
    if (!(value !== null)) {
      return "null";
    }
    return value.toString();
  };

  /*<span id='method-fm.serializer-serializeDoubleArray'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a double array to JSON.
  	 </div>
  	@function serializeDoubleArray
  	@param {fm.array} array An array of double values.
  	@return {String} A JSON-serialized double array.
  */


  serializer.serializeDoubleArray = function() {
    var array, i, strArray, _var0;
    array = arguments[0];
    _var0 = array;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return "null";
    }
    strArray = new Array(array.length);
    i = 0;
    while (i < array.length) {
      try {
        strArray[i] = fm.serializer.serializeDouble(array[i]);
      } finally {
        i++;
      }
    }
    return fm.stringExtensions.concat("[", fm.stringExtensions.join(",", strArray), "]");
  };

  /*<span id='method-fm.serializer-serializeFloat'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a float value.
  	 </div>
  	@function serializeFloat
  	@param {fm.nullable} value The float to serialize.
  	@return {String} The serialized float value.
  */


  serializer.serializeFloat = function() {
    var value;
    value = arguments[0];
    if (!(value !== null)) {
      return "null";
    }
    return value.toString();
  };

  /*<span id='method-fm.serializer-serializeFloatArray'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a float array to JSON.
  	 </div>
  	@function serializeFloatArray
  	@param {fm.array} array An array of float values.
  	@return {String} A JSON-serialized float array.
  */


  serializer.serializeFloatArray = function() {
    var array, i, strArray, _var0;
    array = arguments[0];
    _var0 = array;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return "null";
    }
    strArray = new Array(array.length);
    i = 0;
    while (i < array.length) {
      try {
        strArray[i] = fm.serializer.serializeFloat(array[i]);
      } finally {
        i++;
      }
    }
    return fm.stringExtensions.concat("[", fm.stringExtensions.join(",", strArray), "]");
  };

  /*<span id='method-fm.serializer-serializeGuid'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a globally unique identifier.
  	 </div>
  	@function serializeGuid
  	@param {fm.nullable} value The GUID to serialize.
  	@return {String} The serialized GUID.
  */


  serializer.serializeGuid = function() {
    var value;
    value = arguments[0];
    if (!(value !== null)) {
      return "null";
    }
    return fm.stringExtensions.concat("\"", value.toString(), "\"");
  };

  /*<span id='method-fm.serializer-serializeGuidArray'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a GUID array to JSON.
  	 </div>
  	@function serializeGuidArray
  	@param {fm.array} array An array of GUID values.
  	@return {String} A JSON-serialized GUID array.
  */


  serializer.serializeGuidArray = function() {
    var array, i, strArray, _var0;
    array = arguments[0];
    _var0 = array;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return "null";
    }
    strArray = new Array(array.length);
    i = 0;
    while (i < array.length) {
      try {
        strArray[i] = fm.serializer.serializeGuid(array[i]);
      } finally {
        i++;
      }
    }
    return fm.stringExtensions.concat("[", fm.stringExtensions.join(",", strArray), "]");
  };

  /*<span id='method-fm.serializer-serializeInteger'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an integer value.
  	 </div>
  	@function serializeInteger
  	@param {fm.nullable} value The integer to serialize.
  	@return {String} The serialized integer value.
  */


  serializer.serializeInteger = function() {
    var value;
    value = arguments[0];
    if (!(value !== null)) {
      return "null";
    }
    return fm.intExtensions.toString(value);
  };

  /*<span id='method-fm.serializer-serializeIntegerArray'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a integer array to JSON.
  	 </div>
  	@function serializeIntegerArray
  	@param {fm.array} array An array of integer values.
  	@return {String} A JSON-serialized integer array.
  */


  serializer.serializeIntegerArray = function() {
    var array, i, strArray, _var0;
    array = arguments[0];
    _var0 = array;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return "null";
    }
    strArray = new Array(array.length);
    i = 0;
    while (i < array.length) {
      try {
        strArray[i] = fm.serializer.serializeInteger(array[i]);
      } finally {
        i++;
      }
    }
    return fm.stringExtensions.concat("[", fm.stringExtensions.join(",", strArray), "]");
  };

  /*<span id='method-fm.serializer-serializeLong'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a long value.
  	 </div>
  	@function serializeLong
  	@param {fm.nullable} value The long to serialize.
  	@return {String} The serialized long value.
  */


  serializer.serializeLong = function() {
    var value;
    value = arguments[0];
    if (!(value !== null)) {
      return "null";
    }
    return fm.intExtensions.toString(value);
  };

  /*<span id='method-fm.serializer-serializeLongArray'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a long array to JSON.
  	 </div>
  	@function serializeLongArray
  	@param {fm.array} array An array of long values.
  	@return {String} A JSON-serialized long array.
  */


  serializer.serializeLongArray = function() {
    var array, i, strArray, _var0;
    array = arguments[0];
    _var0 = array;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return "null";
    }
    strArray = new Array(array.length);
    i = 0;
    while (i < array.length) {
      try {
        strArray[i] = fm.serializer.serializeLong(array[i]);
      } finally {
        i++;
      }
    }
    return fm.stringExtensions.concat("[", fm.stringExtensions.join(",", strArray), "]");
  };

  /*<span id='method-fm.serializer-serializeObject'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an object into a JSON string.
  	 </div><typeparam name="T">The type of the object to serialize.</typeparam>
  	@function serializeObject
  	@param {fm.object} source The object being serialized.
  	@param {fm.serializeCallback} callback The method used for serializing properties.
  	@return {String} The object as a JSON string.
  */


  serializer.serializeObject = function() {
    var callback, jsonObject, list, source, str, _i, _len, _var0, _var1;
    source = arguments[0];
    callback = arguments[1];
    _var0 = source;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return "null";
    }
    jsonObject = {};
    callback(source, jsonObject);
    list = [];
    _var1 = fm.hashExtensions.getKeys(jsonObject);
    for (_i = 0, _len = _var1.length; _i < _len; _i++) {
      str = _var1[_i];
      fm.arrayExtensions.add(list, fm.stringExtensions.concat(fm.serializer.serializeString(str), ":", jsonObject[str]));
    }
    return fm.stringExtensions.concat("{", fm.stringExtensions.join(",", fm.arrayExtensions.toArray(list)), "}");
  };

  /*<span id='method-fm.serializer-serializeObjectArray'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes an object array into a JSON string.
  	 </div><typeparam name="T">The type of the object to serialize.</typeparam>
  	@function serializeObjectArray
  	@param {fm.array} objects The object array being serialized.
  	@param {fm.serializeCallback} callback The method used for serializing objects.
  	@return {String} The object array as a JSON string.
  */


  serializer.serializeObjectArray = function() {
    var callback, i, objects, strArray, _var0;
    objects = arguments[0];
    callback = arguments[1];
    _var0 = objects;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return "null";
    }
    if (objects.length === 0) {
      return "[]";
    }
    strArray = new Array(objects.length);
    i = 0;
    while (i < objects.length) {
      try {
        strArray[i] = fm.serializer.serializeObject(objects[i], callback);
      } finally {
        i++;
      }
    }
    return fm.stringExtensions.concat("[", fm.stringExtensions.join(",", strArray), "]");
  };

  /*<span id='method-fm.serializer-serializeObjectArrayFast'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a <see cref="fm.serializable">fm.serializable</see> object array into a JSON string.
  	 </div><typeparam name="T">The type of the object to serialize.</typeparam>
  	@function serializeObjectArrayFast
  	@param {fm.array} objects The object array being serialized.
  	@param {fm.serializeCallback} callback The method used for serializing objects.
  	@return {String} The object array as a JSON string.
  */


  serializer.serializeObjectArrayFast = function() {
    var callback, i, objects, strArray, _var0;
    objects = arguments[0];
    callback = arguments[1];
    _var0 = objects;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return "null";
    }
    if (objects.length === 0) {
      return "[]";
    }
    strArray = new Array(objects.length);
    i = 0;
    while (i < objects.length) {
      try {
        strArray[i] = fm.serializer.serializeObjectFast(objects[i], callback);
      } finally {
        i++;
      }
    }
    return fm.stringExtensions.concat("[", fm.stringExtensions.join(",", strArray), "]");
  };

  /*<span id='method-fm.serializer-serializeObjectFast'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a <see cref="fm.serializable">fm.serializable</see> object into a JSON string.
  	 </div><typeparam name="T">The type of the object to serialize.</typeparam>
  	@function serializeObjectFast
  	@param {fm.object} source The object being serialized.
  	@param {fm.serializeCallback} callback The method used for serializing properties.
  	@return {String} The object as a JSON string.
  */


  serializer.serializeObjectFast = function() {
    var callback, source, _var0;
    source = arguments[0];
    callback = arguments[1];
    _var0 = source;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return "null";
    }
    if (!(source.getIsSerialized() && !source.getIsDirty())) {
      source.setSerialized(fm.serializer.serializeObject(source, callback));
    }
    return source.getSerialized();
  };

  /*<span id='method-fm.serializer-serializeRaw'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a piece of raw JSON.
  	 </div>
  	@function serializeRaw
  	@param {String} dataJson The raw data.
  	@return {String} The serialized data.
  */


  serializer.serializeRaw = function() {
    var dataJson;
    dataJson = arguments[0];
    return dataJson;
  };

  /*<span id='method-fm.serializer-serializeRawArray'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a raw array to JSON.
  	 </div>
  	@function serializeRawArray
  	@param {fm.array} jsons An array of raw values.
  	@return {String} A JSON-serialized raw array.
  */


  serializer.serializeRawArray = function() {
    var jsons, _var0;
    jsons = arguments[0];
    _var0 = jsons;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return "null";
    }
    return fm.stringExtensions.concat("[", fm.stringExtensions.join(",", jsons), "]");
  };

  /*<span id='method-fm.serializer-serializeString'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a string.
  	 </div>
  	@function serializeString
  	@param {String} value The string to serialize.
  	@return {String} The serialized string value.
  */


  serializer.serializeString = function() {
    var value, _var0;
    value = arguments[0];
    _var0 = value;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return "null";
    }
    return fm.stringExtensions.concat("\"", fm.serializer.escapeString(value), "\"");
  };

  /*<span id='method-fm.serializer-serializeStringArray'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Serializes a string array to JSON.
  	 </div>
  	@function serializeStringArray
  	@param {fm.array} array An array of string values.
  	@return {String} A JSON-serialized string array.
  */


  serializer.serializeStringArray = function() {
    var array, i, strArray, _var0;
    array = arguments[0];
    _var0 = array;
    if (_var0 === null || typeof _var0 === 'undefined') {
      return "null";
    }
    strArray = new Array(array.length);
    i = 0;
    while (i < array.length) {
      try {
        strArray[i] = fm.serializer.serializeString(array[i]);
      } finally {
        i++;
      }
    }
    return fm.stringExtensions.concat("[", fm.stringExtensions.join(",", strArray), "]");
  };

  /*<span id='method-fm.serializer-trimQuotes'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Trims the quotes from a JavaScript string value.
  	 </div>
  	@function trimQuotes
  	@param {String} value The JavaScript string value.
  	@return {String} The string without quotes.
  */


  serializer.trimQuotes = function() {
    var ch, ch2, value;
    value = arguments[0];
    if (value.length > 1) {
      ch = value.charAt(0);
      ch2 = value.charAt(value.length - 1);
      if ((ch === ch2) && ((ch === '\'') || (ch === '"'))) {
        value = fm.stringExtensions.substring(value, 1, value.length - 2);
      }
    }
    return value;
  };

  /*<span id='method-fm.serializer-unescapeString'>&nbsp;</span>
  */


  /**
  	 <div>
  	 Unescapes any special characters from a string.
  	 </div>
  	@function unescapeString
  	@param {String} text The string with escaped characters.
  	@return {String} The unescaped string.
  */


  serializer.unescapeString = function() {
    var builder, ch, ch2, i, text;
    text = arguments[0];
    builder = new fm.stringBuilder();
    i = 0;
    while (i < text.length) {
      try {
        ch = text.charAt(i);
        if (ch === '\\') {
          if (i === (text.length - 1)) {
            continue;
          }
          ch2 = text.charAt(i + 1);
          switch (ch2) {
            case 'b':
              builder.append("\b");
              break;
            case 'f':
              builder.append("\f");
              break;
            case 'n':
              builder.append("\n");
              break;
            case 'r':
              builder.append("\r");
              break;
            case 't':
              builder.append("\t");
              break;
            case '/':
              builder.append("/");
              break;
            case 'u':
              if (i < (text.length - 5)) {
                builder.append(fm.serializer.unicodeStringToChar(fm.stringExtensions.substring(text, i, 6)).toString());
                i = i + 4;
              } else {
                builder.append(ch2.toString());
              }
              break;
            case 'x':
              if (i < (text.length - 3)) {
                builder.append(fm.serializer.unicodeStringToChar(fm.stringExtensions.substring(text, i, 4)).toString());
                i = i + 2;
              } else {
                builder.append(ch2.toString());
              }
              break;
            default:
              builder.append(ch2.toString());
              break;
          }
          i++;
          continue;
        }
        builder.append(ch.toString());
      } finally {
        i++;
      }
    }
    return builder.toString();
  };

  serializer.unicodeStringToChar = function() {
    var value;
    value = arguments[0];
    if (value.length < 2) {
      throw new Error("Unicode string has invalid length.");
    }
    return fm.convert.toInt32(value.substring(2), 16);
  };

  return serializer;

}).call(this, fm.object);




fm.httpWebRequestTransfer = (function(_super) {

  __extends(httpWebRequestTransfer, _super);

  function httpWebRequestTransfer() {
    this.sendInternal = __bind(this.sendInternal, this);

    this.process = __bind(this.process, this);

    this.sendBinary = __bind(this.sendBinary, this);

    this.sendBinaryAsync = __bind(this.sendBinaryAsync, this);

    this.sendText = __bind(this.sendText, this);

    this.sendTextAsync = __bind(this.sendTextAsync, this);
    return httpWebRequestTransfer.__super__.constructor.apply(this, arguments);
  }

  httpWebRequestTransfer._corsFailCache = {};

  httpWebRequestTransfer._corsSuccessCache = {};

  httpWebRequestTransfer._pmFailCache = {};

  httpWebRequestTransfer._pmSuccessCache = {};

  httpWebRequestTransfer.getPlatformCode = function() {
    return 'js';
  };

  httpWebRequestTransfer.setDisableCORS = function(disableCORS) {
    return httpWebRequestTransfer._disableCORS = disableCORS;
  };

  httpWebRequestTransfer.getDisableCORS = function() {
    return httpWebRequestTransfer._disableCORS || false;
  };

  httpWebRequestTransfer.setDisablePostMessage = function(disablePostMessage) {
    return httpWebRequestTransfer._disablePostMessage = disablePostMessage;
  };

  httpWebRequestTransfer.getDisablePostMessage = function() {
    return httpWebRequestTransfer._disablePostMessage || false;
  };

  httpWebRequestTransfer.setForceJSONP = function(forceJSONP) {
    return httpWebRequestTransfer._forceJSONP = forceJSONP;
  };

  httpWebRequestTransfer.getForceJSONP = function() {
    return httpWebRequestTransfer._forceJSONP || false;
  };

  httpWebRequestTransfer.prototype.sendTextAsync = function(requestArgs, callback) {
    var _this = this;
    return fm.util.addOnLoad(function() {
      return _this.process(requestArgs, callback);
    });
  };

  httpWebRequestTransfer.prototype.sendText = function(requestArgs) {
    return this.process(requestArgs, null);
  };

  httpWebRequestTransfer.prototype.sendBinaryAsync = function(requestArgs, callback) {
    var _this = this;
    return fm.util.addOnLoad(function() {
      return _this.process(requestArgs, callback);
    });
  };

  httpWebRequestTransfer.prototype.sendBinary = function(requestArgs) {
    return this.process(requestArgs, null);
  };

  httpWebRequestTransfer.prototype.process = function(requestArgs, callback) {
    var cors, disableCORS, disablePostMessage, fn, forceJSONP, hwrt, pm, url;
    hwrt = fm.httpWebRequestTransfer;
    url = requestArgs.getUrl();
    if (!requestArgs._processed) {
      url = fm.util.absolutizeUrl(url);
      requestArgs.setUrl(url);
      requestArgs._processed = true;
    }
    disableCORS = hwrt.getDisableCORS() || requestArgs.getSender().getDisableCORS();
    disablePostMessage = hwrt.getDisablePostMessage() || requestArgs.getSender().getDisablePostMessage();
    forceJSONP = hwrt.getForceJSONP() || requestArgs.getSender().getForceJSONP();
    fn = fm.xhr.send;
    cors = false;
    pm = false;
    if (fm.util.isXD(url)) {
      if (!disableCORS && hwrt.canCORS() && !hwrt._corsFailCache[url]) {
        cors = true;
      } else if (!disablePostMessage && hwrt.canPostMessage() && !hwrt._pmFailCache[url]) {
        pm = true;
        fn = fm.postMessage.send;
      } else {
        fn = fm.jsonp.send;
      }
    }
    if (forceJSONP) {
      fn = fm.jsonp.send;
    }
    return this.sendInternal(fn, cors, pm, requestArgs, callback);
  };

  httpWebRequestTransfer.prototype.sendInternal = function(fn, cors, pm, requestArgs, callback) {
    var frameUrl, method, options, responseArgs, self, url,
      _this = this;
    self = this;
    responseArgs = new fm.httpResponseArgs(requestArgs);
    responseArgs.setException(new Error('Environment does not support synchronous requests.'));
    url = requestArgs.getUrl();
    frameUrl = requestArgs.getDynamicProperties()['frameUrl'];
    if (frameUrl && !requestArgs._processedFrame) {
      frameUrl = fm.util.absolutizeUrl(frameUrl);
      requestArgs.getDynamicProperties()['frameUrl'] = frameUrl;
      requestArgs._processedFrame = true;
    }
    frameUrl = frameUrl || url;
    method = 'GET';
    switch (requestArgs.getMethod()) {
      case fm.httpMethod.Head:
        method = 'HEAD';
        break;
      case fm.httpMethod.Post:
        method = 'POST';
        break;
      case fm.httpMethod.Put:
        method = 'PUT';
        break;
      case fm.httpMethod.Patch:
        method = 'PATCH';
        break;
      case fm.httpMethod.Delete:
        method = 'DELETE';
    }
    options = {
      sync: (callback ? false : true),
      url: url,
      frameUrl: frameUrl,
      method: method,
      content: requestArgs.getTextContent(),
      contentBinary: requestArgs.getBinaryContent(),
      headers: requestArgs.getHeaders().toHash(),
      timeout: requestArgs.getTimeout(),
      robustResponse: true,
      onRequestCreated: function(request) {
        var args, onRequestCreated;
        onRequestCreated = requestArgs.getOnRequestCreated();
        if (onRequestCreated) {
          args = new fm.httpRequestCreatedArgs();
          args.setRequestArgs(requestArgs);
          args.setSender(requestArgs.getSender());
          args.setRequest(request);
          return onRequestCreated(args);
        }
      },
      onResponseReceived: function(response) {
        var args, onResponseReceived;
        onResponseReceived = requestArgs.getOnResponseReceived();
        if (onResponseReceived) {
          args = new fm.httpResponseReceivedArgs();
          args.setRequestArgs(requestArgs);
          args.setSender(requestArgs.getSender());
          args.setResponse(response);
          return onResponseReceived(args);
        }
      },
      onSuccess: function(e) {
        if (e.statusCode === 0 && cors) {
          if (!fm.httpWebRequestTransfer._corsSuccessCache[url]) {
            fm.httpWebRequestTransfer._corsFailCache[url] = true;
          }
          if (callback) {
            self.sendTextAsync(requestArgs, callback);
          } else {
            responseArgs = self.sendText(requestArgs);
          }
          return;
        } else if (cors) {
          fm.httpWebRequestTransfer._corsSuccessCache[url] = true;
          delete fm.httpWebRequestTransfer._corsFailCache[url];
        } else if (pm) {
          fm.httpWebRequestTransfer._pmSuccessCache[url] = true;
          delete fm.httpWebRequestTransfer._pmFailCache[url];
        }
        responseArgs.setException(null);
        responseArgs.setTextContent(e.content);
        if (e.hasOwnProperty('contentBinary')) {
          responseArgs.setBinaryContent(e.contentBinary);
        }
        responseArgs.setStatusCode(e.statusCode);
        responseArgs.setHeaders(new fm.nameValueCollection(e.headers));
        if (callback) {
          return callback(responseArgs);
        }
      },
      onFailure: function(e) {
        var exception;
        if (cors && !fm.httpWebRequestTransfer._corsSuccessCache[url]) {
          fm.httpWebRequestTransfer._corsFailCache[url] = true;
          if (callback) {
            self.sendTextAsync(requestArgs, callback);
          } else {
            responseArgs = self.sendText(requestArgs);
          }
          return;
        } else if (pm && (e.local || !fm.httpWebRequestTransfer._pmSuccessCache[url])) {
          fm.httpWebRequestTransfer._pmFailCache[url] = true;
          if (callback) {
            self.sendTextAsync(requestArgs, callback);
          } else {
            responseArgs = self.sendText(requestArgs);
          }
          return;
        }
        exception = new Error(e.message);
        responseArgs.setException(exception);
        if (callback) {
          return callback(responseArgs);
        }
      }
    };
    fn(options);
    return responseArgs;
  };

  httpWebRequestTransfer.canCORS = function() {
    return window.XMLHttpRequest && ('withCredentials' in new XMLHttpRequest());
  };

  httpWebRequestTransfer.canPostMessage = function() {
    if (fm.util.isIE6() || fm.util.isIE7()) {
      return false;
    }
    if (window.postMessage) {
      return true;
    } else {
      return false;
    }
  };

  return httpWebRequestTransfer;

}).call(this, fm.httpTransfer);




fm.domLogProvider = (function(_super) {

  __extends(domLogProvider, _super);

  domLogProvider.prototype._container = null;

  function domLogProvider(container, level) {
    this.log = __bind(this.log, this);

    this.writeLine = __bind(this.writeLine, this);
    this._container = container;
    domLogProvider.__super__.constructor.call(this);
    if (!level) {
      level = fm.logLevel.Warn;
    }
    this.setLevel(level);
  }

  domLogProvider.prototype.writeLine = function(text) {
    var div;
    div = document.createElement('div');
    div.innerHTML = text.replace(/\n/g, '<br />');
    return this._container.appendChild(div);
  };

  domLogProvider.prototype.log = function(level, message, ex) {
    var text;
    text = fm.logProvider.getPrefix(level, true) + ' ' + (message || '');
    if (ex) {
      text += '<br />' + ex.message;
    }
    return this.writeLine(text);
  };

  return domLogProvider;

})(fm.logProvider);




fm.consoleLogProvider = (function(_super) {

  __extends(consoleLogProvider, _super);

  function consoleLogProvider(level) {
    this.log = __bind(this.log, this);

    this.writeLine = __bind(this.writeLine, this);
    consoleLogProvider.__super__.constructor.call(this);
    if (!level) {
      level = fm.logLevel.Warn;
    }
    this.setLevel(level);
  }

  consoleLogProvider.prototype.writeLine = function(text) {
    if (window.console && window.console.log) {
      return window.console.log(text);
    }
  };

  consoleLogProvider.prototype.log = function(level, message, ex) {
    var text;
    text = fm.logProvider.getPrefix(level, true) + ' ' + message;
    if (ex) {
      text += '\n' + ex.message;
    }
    return this.writeLine(text);
  };

  return consoleLogProvider;

})(fm.logProvider);



(function() {
  return fm.httpTransfer.addQueryToUrl = function() {
    var key, url, value;
    if (arguments.length === 1) {
      url = arguments[0];
      return url;
    }
    if (arguments.length === 2) {
      url = arguments[0];
      key = arguments[1];
      return fm.httpTransfer.addQueryToUrl(url, key, null);
    }
    if (arguments.length === 3) {
      url = arguments[0];
      key = arguments[1];
      value = arguments[2];
      if (fm.stringExtensions.isNullOrEmpty(key)) {
        return url;
      }
      if (value === null || typeof value === 'undefined') {
        value = '';
      }
      value = encodeURIComponent(value);
      return fm.stringExtensions.concat([url, (fm.stringExtensions.indexOf(url, "?", fm.stringComparison.OrdinalIgnoreCase) === -1 ? "?" : "&"), key, "=", value]);
    }
  };
})();


return fm;
}));