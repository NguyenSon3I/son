//
// Title: IceLink for JavaScript
// Version: 3.8.1.24993
// Copyright Frozen Mountain Software 2011+
//
declare namespace fm.icelink {
    class ArrayExtensions {
        getTypeString(): string;
        static getCount<T>(array: T[]): number;
        static add<T>(array: T[], value: T): void;
        static remove<T>(array: T[], value: T): boolean;
        static removeAt<T>(array: T[], index: number): void;
        static insert<T>(array: T[], index: number, value: T): void;
        static toArray<T>(array: T[]): T[];
        static clear<T>(array: T[]): void;
        static addRange<T>(array: T[], values: T[]): void;
        static getRange<T>(array: T[], index: number, count: number): T[];
        static contains<T>(array: T[], value: T): boolean;
        static newArray<T>(values: T[]): T[];
        static clone<T>(array: T[]): T[];
        static map<T, R>(array: T[], callback: IFunction3<T, number, T[], R>): R[];
    }
}
declare namespace fm.icelink {
    /** @hidden */
    abstract class AsyncLoggerBase implements fm.icelink.ILog {
        getTypeString(): string;
        /** @hidden */
        private _tag;
        constructor(tag: string);
        protected static processLogEvent(logEvent: fm.icelink.LogEvent): void;
        debug(message: string): void;
        debug(message: string, ex: fm.icelink.Exception): void;
        debug(scope: string, message: string): void;
        debug(scope: string, message: string, ex: fm.icelink.Exception): void;
        protected doLog(level: fm.icelink.LogLevel, scope: string, message: string, exception: fm.icelink.Exception): void;
        protected abstract doQueueLogEvent(logEvent: fm.icelink.LogEvent): void;
        error(message: string): void;
        error(message: string, ex: fm.icelink.Exception): void;
        error(scope: string, message: string): void;
        error(scope: string, message: string, ex: fm.icelink.Exception): void;
        fatal(message: string): void;
        fatal(message: string, ex: fm.icelink.Exception): void;
        fatal(scope: string, message: string): void;
        fatal(scope: string, message: string, ex: fm.icelink.Exception): void;
        abstract flush(): void;
        getIsDebugEnabled(): boolean;
        getIsErrorEnabled(): boolean;
        getIsFatalEnabled(): boolean;
        getIsInfoEnabled(): boolean;
        getIsVerboseEnabled(): boolean;
        getIsWarnEnabled(): boolean;
        getTag(): string;
        info(message: string): void;
        info(message: string, ex: fm.icelink.Exception): void;
        info(scope: string, message: string): void;
        info(scope: string, message: string, ex: fm.icelink.Exception): void;
        isLogEnabled(level: fm.icelink.LogLevel): boolean;
        log(logEvent: fm.icelink.LogEvent): void;
        log(message: string): void;
        log(scope: string, message: string): void;
        /** @hidden */
        private setTag;
        verbose(message: string): void;
        verbose(message: string, ex: fm.icelink.Exception): void;
        verbose(scope: string, message: string): void;
        verbose(scope: string, message: string, ex: fm.icelink.Exception): void;
        warn(message: string): void;
        warn(message: string, ex: fm.icelink.Exception): void;
        warn(scope: string, message: string): void;
        warn(scope: string, message: string, ex: fm.icelink.Exception): void;
    }
}
declare namespace fm.icelink {
}
declare namespace fm.icelink {
    class AtomicInteger {
        private _value;
        constructor(startValue?: number);
        compareAndSwap(expected: number, newValue: number): number;
        getValue(): number;
        add(value: number): number;
        subtract(value: number): number;
        increment(): number;
        decrement(): number;
    }
}
declare namespace fm.icelink {
    class AtomicLong {
        private _value;
        constructor(startValue?: number);
        compareAndSwap(expected: number, newValue: number): number;
        getValue(): number;
        add(value: number): number;
        subtract(value: number): number;
        increment(): number;
        decrement(): number;
    }
}
declare namespace fm.icelink {
    class Base64 {
        getTypeString(): string;
        private static _base64Regex;
        static encode(b: Uint8Array): string;
        static encodeBuffer(buffer: DataBuffer): string;
        static decode(s: string): Uint8Array;
        static tryEncode(b: Uint8Array, result: Holder<string>): boolean;
        static tryEncodeBuffer(buffer: DataBuffer, result: Holder<string>): boolean;
        static tryDecode(s: string, result: Holder<Uint8Array>): boolean;
        private static b64ToUint6;
        private static decodeIt;
        private static uint6ToB64;
        private static encodeIt;
    }
}
declare namespace fm.icelink {
    class BitAssistant {
        getTypeString(): string;
        static castByte(value: number): number;
        static castInteger(value: number): number;
        static castLong(value: number): number;
        static leftShift(value: number, count: number): number;
        static leftShiftShort(value: number, count: number): number;
        static leftShiftInteger(value: number, count: number): number;
        static leftShiftLong(value: number, count: number): number;
        static rightShift(value: number, count: number): number;
        static rightShiftShort(value: number, count: number): number;
        static rightShiftInteger(value: number, count: number): number;
        static rightShiftLong(value: number, count: number): number;
        static sequencesAreEqual(array1: Uint8Array, array2: Uint8Array): boolean;
        static sequencesAreEqual(array1: Uint8Array, offset1: number, array2: Uint8Array, offset2: number, length: number): boolean;
        static sequencesAreEqualConstantTime(array1: Uint8Array, array2: Uint8Array): boolean;
        static sequencesAreEqualConstantTime(array1: Uint8Array, offset1: number, array2: Uint8Array, offset2: number, length: number): boolean;
        static subArray(array: Uint8Array, offset: number, count?: number): Uint8Array;
        static reverse(array: Uint8Array): void;
        static copy(source: Uint8Array, sourceIndex: number, destination: Uint8Array, destinationIndex: number, length: number): void;
        static set(array: Uint8Array, index: number, length: number, value: number): void;
        static getHexString(array: Uint8Array): string;
        static getHexString(array: Uint8Array, offset: number, length: number): string;
        static getHexBytes(s: string): Uint8Array;
    }
}
declare namespace fm.icelink {
    class BooleanExtensions {
        getTypeString(): string;
        static toString(value: boolean, format?: string): string;
    }
}
declare namespace fm.icelink {
    class ByteCollection {
        getTypeString(): string;
        private _buffer;
        constructor(buffer?: Uint8Array);
        count(): number;
        add(b: number): void;
        addRange(buffer: Uint8Array): void;
        removeRange(index: number, count: number): void;
        insertRange(index: number, buffer: Uint8Array): void;
        getRange(index: number, count: number): Uint8Array;
        get(index: number): number;
        toArray(): Uint8Array;
    }
}
declare namespace fm.icelink {
    /**
    Base class for all logging provider implementations.
    */
    abstract class LogProvider {
        getTypeString(): string;
        /** @hidden */
        private _filter;
        /** @hidden */
        private _level;
        /** @hidden */
        private _processId;
        private fmicelinkLogProviderInit;
        /**
        Initializes a new instance of the [[fm.icelink.logProvider]] class.
        */
        constructor();
        /**
        Converts a log-level to a 5-character string for consistently-spaced character sequences.
        @param level The log level.
        @return The log level as an upper-case string
                    with right-side whitespace padding to ensure
                    a 5-character sequence.
        */
        static getLogLevelString(level: fm.icelink.LogLevel): string;
        /**
        Converts a timestamp to an ISO-8601-formatted string for rendering in a log message (YYYY-MM-DDThh:mm:ss.sssZ).
        @param timestamp The timestamp.
        @return The timestamp as a formatted string.
        */
        static getPrefixTimestamp(timestamp: fm.icelink.DateTime): string;
        /**
        Returns the name of the current product.
        */
        static getProduct(): string;
        /**
        Logs a message at the specified log level.
        @param logEvent The log event details.
        */
        protected abstract doLog(logEvent: fm.icelink.LogEvent): void;
        /**
        Generates a default log line.
        @param logEvent The log event details.
        */
        protected generateLogLine(logEvent: fm.icelink.LogEvent): string;
        /**
        Gets a filter on the log provider. Returning `true` will log the event, while returning `false` will skip it.
        */
        getFilter(): fm.icelink.IFunction1<fm.icelink.LogEvent, boolean>;
        /**
        Gets the log level.
        */
        getLevel(): fm.icelink.LogLevel;
        /**
        Converts a log-level to a 5-character string for consistently-spaced character sequences.
        @param level The log level.
        @param includeTimestamp Whether to include a timestamp in the prefix.
        @return The log level as an upper-case string
                    with right-side whitespace padding to ensure
                    a 5-character sequence.
        */
        protected getPrefix(level: fm.icelink.LogLevel, includeTimestamp: boolean): string;
        /**
        Gets the current process id.
        */
        protected getProcessId(): number;
        /**
        Log a message.
        @param logEvent The log event details.
        */
        log(logEvent: fm.icelink.LogEvent): void;
        /**
        Sets a filter on the log provider. Returning `true` will log the event, while returning `false` will skip it.
        */
        setFilter(value: fm.icelink.IFunction1<fm.icelink.LogEvent, boolean>): void;
        /**
        Sets the log level.
        */
        setLevel(value: fm.icelink.LogLevel): void;
        /** @hidden */
        private setProcessId;
    }
}
declare namespace fm.icelink {
    class ConsoleLogProvider extends LogProvider {
        getTypeString(): string;
        constructor(level?: LogLevel);
        writeLine(text: string): void;
        doLog(logItem: fm.icelink.LogEvent): void;
    }
}
declare namespace fm.icelink {
    class Convert {
        getTypeString(): string;
        static toInt32(s: string, base: number): number;
    }
}
declare namespace fm.icelink {
    class DataBufferPool {
        private static fm_DataBufferPool___singleton;
        static getInstance(): fm.icelink.DataBufferPool;
        static getIsSupported(): boolean;
        take(size: number): fm.icelink.DataBuffer;
    }
}
declare namespace fm.icelink {
    class DateTime {
        getTypeString(): string;
        private _date;
        constructor(date: Date);
        constructor(ticks: number);
        constructor(year: number, month: number, day: number, hour: number, minute: number, second: number);
        constructor(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number);
        static getNow(): DateTime;
        static getUtcNow(): DateTime;
        getDate(): Date;
        getTicks(): number;
        toUniversalTime(): DateTime;
        getYear(): number;
        getMonth(): number;
        getDay(): number;
        getHour(): number;
        getMinute(): number;
        getSecond(): number;
        getMillisecond(): number;
        addHours(hours: number): DateTime;
        addMinutes(minutes: number): DateTime;
        addSeconds(seconds: number): DateTime;
        addMilliseconds(milliseconds: number): DateTime;
    }
}
declare namespace fm.icelink {
    class DateTimeFormatInfo {
        getTypeString(): string;
        static getInvariantInfo(): DateTimeFormatInfo;
    }
}
declare namespace fm.icelink {
    enum DateTimeStyles {
        AssumeUniversal = 1,
        AdjustToUniversal = 2
    }
}
declare namespace fm.icelink {
    /**
    A dispatch queue interface.
    */
    interface IDispatchQueue<T> {
        destroy(): void;
        enqueue(item: T): void;
        getQueueCount(): number;
    }
}
declare namespace fm.icelink {
    class DispatchQueue<T> implements IDispatchQueue<T> {
        getTypeString(): string;
        private _count;
        private _action;
        constructor(action: IAction1<T>);
        getQueueCount(): number;
        destroy(): void;
        enqueue(item: T): void;
    }
}
declare namespace fm.icelink {
    class DomLogProvider extends LogProvider {
        getTypeString(): string;
        private _container;
        constructor(container: HTMLElement, level?: LogLevel);
        writeLine(text: string): void;
        doLog(logItem: fm.icelink.LogEvent): void;
    }
}
declare namespace fm.icelink {
    class Encoding {
        getTypeString(): string;
        static getAscii(): Encoding;
        static getUtf8(): Encoding;
        getString(bytes: Uint8Array, index?: number, count?: number): string;
        getBytes(str: string): Uint8Array;
        getByteCount(str: string): number;
    }
}
declare class fmicelinkGlobalError extends Error {
}
declare namespace fm.icelink {
    class Exception extends fmicelinkGlobalError {
        constructor(message?: string);
    }
}
declare namespace fm.icelink {
    /**
    Future base properties/methods.
    */
    abstract class FutureBase<T> {
        getTypeString(): string;
        /** @hidden */
        private _exception;
        /** @hidden */
        private _result;
        /** @hidden */
        private _state;
        constructor();
        /**
        Gets the exception if rejected.
        */
        getException(): fm.icelink.Exception;
        /**
        Gets the result if resolved.
        */
        getResult(): T;
        /**
        Gets the current state.
        */
        getState(): fm.icelink.FutureState;
        /**
        Sets the exception if rejected.
        */
        protected setException(value: fm.icelink.Exception): void;
        /**
        Sets the result if resolved.
        */
        protected setResult(value: T): void;
        /**
        Sets the current state.
        */
        protected setState(value: fm.icelink.FutureState): void;
    }
}
declare namespace fm.icelink {
    abstract class Future<T> extends FutureBase<T> {
        getTypeString(): string;
        abstract fail(rejectAction: IAction1<Exception>): Future<T>;
        abstract then<R>(resolve: IAction1<T> | IFunction1<T, Future<R>>): Future<R>;
        abstract then<R>(resolve: IAction1<T> | IFunction1<T, Future<R>>, reject: IAction1<Exception>): Future<R>;
    }
}
declare namespace fm.icelink {
    class Global {
        getTypeString(): string;
        static tryCast<T>(x: any, t: any): T;
        static tryCastArray(x: any): any[];
        static tryCastObject(x: any): Object;
        static tryCastString(x: any): string;
        static tryCastInt(x: any): number;
        static tryCastFloat(x: any): number;
        static equals(x1: any, x2: any): boolean;
    }
}
declare namespace fm.icelink {
    class Guid {
        getTypeString(): string;
        static empty: Guid;
        private _guidString;
        constructor();
        constructor(guidString: string);
        equals(guid: Guid): boolean;
        toString(): string;
        static newGuid(): Guid;
        static equals(guid1: Guid, guid2: Guid): boolean;
    }
}
declare namespace fm.icelink {
    interface Hash<K, V> {
        [key: string]: V;
    }
}
declare namespace fm.icelink {
    /**
    A hash context.
    */
    abstract class HashContextBase {
        getTypeString(): string;
        /** @hidden */
        private _type;
        /**
        Initializes a new instance of the [[fm.icelink.hashContextBase]] class.
        @param type The type.
        */
        constructor(type: fm.icelink.HashType);
        /**
        Computes the hash for a given type.
        @param type The type.
        @param input The input.
        */
        static compute(type: fm.icelink.HashType, input: fm.icelink.DataBuffer): fm.icelink.DataBuffer;
        /**
        Computes the hash for a given type.
        @param type The type.
        @param inputString The input string.
        */
        static compute(type: fm.icelink.HashType, inputString: string): fm.icelink.DataBuffer;
        /**
        Computes the hash.
        @param input The input.
        */
        compute(input: fm.icelink.DataBuffer): fm.icelink.DataBuffer;
        /**
        Computes the hash.
        @param inputString The input.
        */
        compute(inputString: string): fm.icelink.DataBuffer;
        /**
        Destroys this instance.
        */
        destroy(): void;
        /**
        Computes the hash.
        @param input The input.
        */
        protected abstract doCompute(input: fm.icelink.DataBuffer): fm.icelink.DataBuffer;
        /**
        Destroys this instance.
        */
        protected abstract doDestroy(): void;
        /**
        Gets the type.
        */
        getType(): fm.icelink.HashType;
        /** @hidden */
        private setType;
    }
}
declare namespace fm.icelink {
    class HashContext extends HashContextBase {
        getTypeString(): string;
        constructor(type: HashType);
        doCompute(input: DataBuffer): DataBuffer;
        doDestroy(): void;
    }
}
declare namespace fm.icelink {
    class HashExtensions {
        getTypeString(): string;
        static getCount<T>(obj: Hash<string, T>): number;
        static getKeys<T>(obj: Hash<string, T>): string[];
        static getValues<T>(obj: Hash<string, T>): T[];
        static tryGetValue<T>(obj: Hash<any, T>, key: any, holder: Holder<T>): boolean;
        static containsKey<T>(obj: Hash<any, T>, key: any): boolean;
        static containsValue<T>(obj: Hash<string, T>, value: T): boolean;
        static add<T>(obj: Hash<string, T>, key: string, value: T): T;
        static remove<T>(obj: Hash<string, T>, key: string): boolean;
        static clear<T>(obj: Hash<string, T>): void;
    }
}
declare namespace fm.icelink {
    class Holder<T> {
        getTypeString(): string;
        private _value;
        constructor(value: T);
        getValue(): T;
        setValue(value: T): void;
    }
}
declare namespace fm.icelink {
    /**
    Base class that defines methods for transferring content over HTTP.
    */
    abstract class HttpTransfer {
        getTypeString(): string;
        /** @hidden */
        private static fm_icelink_HttpTransfer___onSendFinish;
        /** @hidden */
        private static fm_icelink_HttpTransfer___onSendStart;
        /** @hidden */
        private static fm_icelink_HttpTransfer___wildcardCharacters;
        /** @hidden */
        private static fm_icelink_HttpTransfer__onSendFinish;
        /** @hidden */
        private static fm_icelink_HttpTransfer__onSendStart;
        constructor();
        /**
        Adds a handler that is raised before an HTTP request is sent.
        */
        static addOnSendFinish(value: fm.icelink.IAction1<fm.icelink.HttpSendFinishArgs>): void;
        /**
        Adds a handler that is raised before an HTTP request is sent.
        */
        static addOnSendStart(value: fm.icelink.IAction1<fm.icelink.HttpSendStartArgs>): void;
        /**
        Escapes and adds a query parameter as a key/empty-value pair to a URL.
        @param url The URL with the query to which the key/value should be added.
        @param key The key of the query parameter to add.
        @return The original URL with the query parameter added.
        */
        static addQueryToUrl(url: string, key: string): string;
        /**
        Escapes and adds a query parameter as a key/value pair to a URL.
        @param url The URL with the query to which the key/value should be added.
        @param key The key of the query parameter to add.
        @param value The value of the query parameter to add.
        @return The original URL with the query parameter added.
        */
        static addQueryToUrl(url: string, key: string, value: string): string;
        /**
        Gets a random wildcard character.
        @return A random wildcard character.
        */
        static getRandomWildcardCharacter(): string;
        /**
        Gets the wildcard characters used to replace asterisks in ReplaceWildcards.
        */
        static getWildcardCharacters(): string;
        /**
        Removes a handler that is raised before an HTTP request is sent.
        */
        static removeOnSendFinish(value: fm.icelink.IAction1<fm.icelink.HttpSendFinishArgs>): void;
        /**
        Removes a handler that is raised before an HTTP request is sent.
        */
        static removeOnSendStart(value: fm.icelink.IAction1<fm.icelink.HttpSendStartArgs>): void;
        /**
        Replaces asterisks in URLs with characters from WildcardCharacters.
        @param url The URL with asterisks.
        */
        static replaceWildcards(url: string): string;
        /**
        Sets the wildcard characters used to replace asterisks in ReplaceWildcards.
        */
        static setWildcardCharacters(value: string): void;
        /** @hidden */
        private finishRequest;
        /** @hidden */
        private raiseOnSendFinish;
        /** @hidden */
        private raiseOnSendStart;
        /**
        Sends a request synchronously.
        @param requestArgs The request parameters.
        @return The resulting response.
        */
        send(requestArgs: fm.icelink.HttpRequestArgs): fm.icelink.HttpResponseArgs;
        /**
        Sends a request asynchronously.
        @param requestArgs The request parameters.
        @param callback The callback to execute with the resulting response.
        */
        sendAsync(requestArgs: fm.icelink.HttpRequestArgs, callback: fm.icelink.IAction1<fm.icelink.HttpResponseArgs>): void;
        /**
        Sends binary content synchronously using the specified arguments.
        @param requestArgs The request arguments.
        @return The response arguments from the server.
        */
        abstract sendBinary(requestArgs: fm.icelink.HttpRequestArgs): fm.icelink.HttpResponseArgs;
        /**
        Sends binary content asynchronously using the specified arguments.
        @param requestArgs The request arguments.
        @param callback The callback to execute on success or failure.
        */
        abstract sendBinaryAsync(requestArgs: fm.icelink.HttpRequestArgs, callback: fm.icelink.IAction1<fm.icelink.HttpResponseArgs>): void;
        /**
        Sends text content synchronously using the specified arguments.
        @param requestArgs The request arguments.
        @return The response arguments from the server.
        */
        abstract sendText(requestArgs: fm.icelink.HttpRequestArgs): fm.icelink.HttpResponseArgs;
        /**
        Sends text content asynchronously using the specified arguments.
        @param requestArgs The request arguments.
        @param callback The callback to execute on success or failure.
        */
        abstract sendTextAsync(requestArgs: fm.icelink.HttpRequestArgs, callback: fm.icelink.IAction1<fm.icelink.HttpResponseArgs>): void;
        /**
        Releases any resources and shuts down.
        */
        abstract shutdown(): void;
        /** @hidden */
        private startRequest;
        /** @hidden */
        private static __fmicelinkHttpTransferInitialized;
        /** @hidden */
        static fmicelinkHttpTransferInitialize(): void;
    }
}
declare let fmicelinkGlobalIsError: (obj: any) => boolean;
declare namespace fm.icelink {
    class Util {
        getTypeString(): string;
        private static _xdCache;
        private static _chars;
        private static _loadFunctions;
        private static _wildcard;
        private static _readyRun;
        private static _readyBound;
        private static _loaded;
        static isNumber(obj: any): boolean;
        static isString(obj: any): boolean;
        static isBoolean(obj: any): boolean;
        static isNull(obj: any): boolean;
        static isUndefined(obj: any): boolean;
        static isNullOrUndefined(obj: any): boolean;
        static isFunction(obj: any): boolean;
        static isArray(obj: any): boolean;
        static isUint8Array(obj: any): boolean;
        static isDate(obj: any): boolean;
        static isRegExp(obj: any): boolean;
        static isError(obj: any): boolean;
        static isObject(obj: any): boolean;
        static isObjectType(obj: any, typeString: string): boolean;
        static isArrayType(obj: any, typeString: string): boolean;
        static isPlainObject(obj: any): boolean;
        static canAttachProperties<T>(instance: T, obj: any): boolean;
        static attachProperties<T>(instance: T, obj: any): T;
        static isIE(): boolean;
        static isIE6(): boolean;
        static isIE7(): boolean;
        static isIE8(): boolean;
        static isIE9(): boolean;
        static isEdge(): boolean;
        static isChrome(): boolean;
        static isSafari9(): boolean;
        static isSafari10(): boolean;
        static isSafari11(): boolean;
        static isSafari12(): boolean;
        static isSafari12_1(): boolean;
        static isSafari(): boolean;
        static isOpera(): boolean;
        static isWindows(): boolean;
        static isAndroid(): boolean;
        static isBlackBerry(): boolean;
        static isiOS(): boolean;
        static isMobile(): boolean;
        static hasActiveX(checkFiltering?: boolean): boolean;
        static hasJava(): boolean;
        static getJavaVersion(): string;
        static isJavaWebStartInstalledActiveX(version: string): boolean;
        static isXD(url1: string, url2?: string): boolean;
        private static getHost;
        private static compareHost;
        private static getCurrentHost;
        private static parseUrl;
        static absolutizeUrl(url?: string): string;
        static wildcard(str: string): string;
        static getWildcard(): string;
        static randomChar(str: string): string;
        static observe(element: EventTarget, event: string, handler: Function): void;
        static unobserve(element: EventTarget, event: string, handler: Function): void;
        static observeAttr(element: EventTarget, handler: Function): void;
        static construct<T>(func: Function, args: IArguments): T;
        static extend(dest: any, src: any): any;
        static addOnLoad(fn: Function): void;
        static ready(): void;
        static bindReady(): void;
        private static __initialized;
        static initialize(): void;
    }
}
declare namespace fm.icelink {
    interface HttpWebRequestSendOptions {
        sync: boolean;
        url: string;
        frameUrl: string;
        method: string;
        content: string;
        contentBinary: Uint8Array;
        headers: Hash<string, string>;
        timeout: number;
        robustResponse: boolean;
        onRequestCreated?: IFunction1<HttpWebRequest, HttpWebRequestSendOptions>;
        onResponseReceived?: IAction1<HttpWebResponse>;
        onSuccess?: IAction1<HttpWebRequestSuccessArgs>;
        onFailure?: IAction1<HttpWebRequestFailureArgs>;
    }
    interface HttpWebRequest {
    }
    interface HttpWebResponse {
    }
    interface HttpWebRequestSuccessArgs {
        content: string;
        contentBinary: Uint8Array;
        headers: Hash<string, string>;
        statusCode: number;
    }
    interface HttpWebRequestFailureArgs {
        message: string;
        local: boolean;
    }
    class HttpWebRequestTransfer extends HttpTransfer {
        getTypeString(): string;
        private static _corsFailCache;
        private static _corsSuccessCache;
        private static _pmFailCache;
        private static _pmSuccessCache;
        private static _disableCors;
        private static _disablePostMessage;
        private static _disableJsonp;
        private static _forceJsonp;
        constructor();
        static getPlatformCode: () => string;
        static setDisableCors(disableCors: boolean): void;
        static getDisableCors(): boolean;
        static setDisablePostMessage(disablePostMessage: boolean): void;
        static getDisablePostMessage(): boolean;
        static setDisableJsonp(disableJsonp: boolean): void;
        static getDisableJsonp(): boolean;
        static setForceJsonp(forceJsonp: boolean): void;
        static getForceJsonp(): boolean;
        static canCors(): boolean;
        static canPostMessage(): boolean;
        sendTextAsync(requestArgs: HttpRequestArgs, callback: IAction1<HttpResponseArgs>): void;
        sendText(requestArgs: HttpRequestArgs): HttpResponseArgs;
        sendBinaryAsync(requestArgs: HttpRequestArgs, callback: IAction1<HttpResponseArgs>): void;
        sendBinary(requestArgs: HttpRequestArgs): HttpResponseArgs;
        process(requestArgs: HttpRequestArgs, callback: IAction1<HttpResponseArgs>): HttpResponseArgs;
        sendInternal(fn: IAction1<Object>, cors: boolean, pm: boolean, requestArgs: HttpRequestArgs, callback: IAction1<HttpResponseArgs>): HttpResponseArgs;
        shutdown(): void;
    }
}
declare namespace fm.icelink {
    interface IAction0 {
        (): void;
    }
}
declare namespace fm.icelink {
    interface IAction1<T> {
        (p: T): void;
    }
}
declare namespace fm.icelink {
    interface IAction2<T1, T2> {
        (p1: T1, p2: T2): void;
    }
}
declare namespace fm.icelink {
    interface IAction3<T1, T2, T3> {
        (p1: T1, p2: T2, p3: T3): void;
    }
}
declare namespace fm.icelink {
    interface IAction4<T1, T2, T3, T4> {
        (p1: T1, p2: T2, p3: T3, p4: T4): void;
    }
}
declare namespace fm.icelink {
    interface IAction5<T1, T2, T3, T4, T5> {
        (p1: T1, p2: T2, p3: T3, p4: T4, p5: T5): void;
    }
}
declare namespace fm.icelink {
    interface IAction6<T1, T2, T3, T4, T5, T6> {
        (p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, p6: T6): void;
    }
}
declare namespace fm.icelink {
    interface IFunction0<R> {
        (): R;
    }
}
declare namespace fm.icelink {
    interface IFunction1<T, R> {
        (p: T): R;
    }
}
declare namespace fm.icelink {
    interface IFunction2<T1, T2, R> {
        (p1: T1, p2: T2): R;
    }
}
declare namespace fm.icelink {
    interface IFunction3<T1, T2, T3, R> {
        (p1: T1, p2: T2, p3: T3): R;
    }
}
declare namespace fm.icelink {
    interface IFunction4<T1, T2, T3, T4, R> {
        (p1: T1, p2: T2, p3: T3, p4: T4): R;
    }
}
declare namespace fm.icelink {
    interface IFunction5<T1, T2, T3, T4, T5, R> {
        (p1: T1, p2: T2, p3: T3, p4: T4, p5: T5): R;
    }
}
declare namespace fm.icelink {
    interface IFunction6<T1, T2, T3, T4, T5, T6, R> {
        (p1: T1, p2: T2, p3: T3, p4: T4, p5: T5, p6: T6): R;
    }
}
declare namespace fm.icelink {
    class InternalConcurrentDictionary<TKey, TValue> {
        getTypeString(): string;
        private __dict;
        private __hashFunction;
        constructor(hashCallback: fm.icelink.IFunction1<TKey, string>);
        getIsEmpty(): boolean;
        getKeys(): TKey[];
        getValues(): TValue[];
        getCount(): number;
        containsKey(key: TKey): boolean;
        getOrAdd(key: TKey, valueFactory: fm.icelink.IFunction1<TKey, TValue>): TValue;
        addOrUpdate(key: TKey, addValue: TValue, updateValueFactory: fm.icelink.IFunction2<TKey, TValue, TValue>): TValue;
        tryAdd(key: TKey, value: TValue): boolean;
        tryGetValue(key: TKey, holder: fm.icelink.Holder<TValue>): boolean;
        tryRemove(key: TKey, value: fm.icelink.Holder<TValue>): boolean;
        tryUpdate(key: TKey, newValue: TValue, comparisonValue: TValue): boolean;
        clear(): void;
    }
}
declare namespace fm.icelink {
    /**
     <div>
     Provides Json serialize and deserialize methods for all browsers. It will also
     turn strings with form <code>"/Date(xxxxxxxxxx-xxxx)"</code> (Microsoft date serialization format) into actual dates.
     </div>
     */
    class Json {
        getTypeString(): string;
        static useMicrosoftDateFormat: boolean;
        private static _dateRegex;
        private static _reviver;
        private static _buildReviver;
        static deserialize(text: string, reviver?: (key: any, value: any) => any): any;
        static serialize(value: any): string;
        static serialize(value: any, replacer: (key: string, value: any) => any): string;
        static serialize(value: any, replacer: any[]): string;
        static serialize(value: any, replacer: (key: string, value: any) => any, space: string | number): string;
        static serialize(value: any, replacer: any[], space: string | number): string;
    }
}
interface Date {
    toJSONFM(key?: any): string;
}
declare namespace fm.icelink {
    interface JsonpSendOptions extends HttpWebRequestSendOptions {
        canSegmentJsonArray: boolean;
        callbackParameterName: string;
        contentParameterName: string;
        methodParameterName: string;
        headersParameterName: string;
        statusCodeParameterName: string;
        cacheBusterParameterName: string;
        useFrame: boolean;
    }
    class Jsonp {
        getTypeString(): string;
        static maxUrlLength: number;
        private static _scriptFrame;
        private static _scriptFrameLoaded;
        private static _callbackCount;
        private static _cb;
        private static _pastScriptFrames;
        private static _scriptFrameDestroyer;
        static getNextCallback(options: JsonpSendOptions): string;
        private static failureHandler;
        static send(options: JsonpSendOptions): void;
        private static cleanup;
        private static callbackExists;
    }
}
declare namespace fm.icelink {
    /**
    A message authentication code (MAC) context.
    */
    abstract class MacContextBase {
        getTypeString(): string;
        /** @hidden */
        private _type;
        /**
        Initializes a new instance of the [[fm.icelink.macContextBase]] class.
        @param type The type.
        */
        constructor(type: fm.icelink.MacType);
        /**
        Computes the message authentication code (MAC) for a given type.
        @param type The type.
        @param key The key.
        @param input The input.
        */
        static compute(type: fm.icelink.MacType, key: fm.icelink.DataBuffer, input: fm.icelink.DataBuffer): fm.icelink.DataBuffer;
        /**
        Computes the message authentication code (MAC).
        @param input The input.
        */
        compute(input: fm.icelink.DataBuffer): fm.icelink.DataBuffer;
        /**
        Destroys this instance.
        */
        destroy(): void;
        /**
        Computes the message authentication code (MAC).
        @param input The input.
        */
        protected abstract doCompute(input: fm.icelink.DataBuffer): fm.icelink.DataBuffer;
        /**
        Destroys this instance.
        */
        protected abstract doDestroy(): void;
        /**
        Gets the type.
        */
        getType(): fm.icelink.MacType;
        /** @hidden */
        private setType;
    }
}
declare namespace fm.icelink {
    class MacContext extends MacContextBase {
        getTypeString(): string;
        private _key;
        constructor(type: MacType, key: DataBuffer);
        doCompute(input: DataBuffer): DataBuffer;
        doDestroy(): void;
    }
}
declare namespace fm.icelink {
    class ManagedStopwatch {
        getTypeString(): string;
        static dispatch(action: IAction0): void;
        private startTime;
        private stopTime;
        static getTimestamp(): number;
        getElapsedTicks(): number;
        getElapsedMilliseconds(): number;
        start(): void;
        stop(): void;
        restart(): void;
    }
}
declare namespace fm.icelink {
    class ManagedThread {
        getTypeString(): string;
        static getCurrentThreadId(): number;
        static dispatch(action: IAction0): void;
    }
}
declare namespace fm.icelink {
    class MathAssistant {
        getTypeString(): string;
        static getPi(): number;
        static getE(): number;
        static abs(val: number): number;
        static acos(val: number): number;
        static asin(val: number): number;
        static atan(val: number): number;
        static atan2(y: number, x: number): number;
        static ceil(val: number): number;
        static cos(val: number): number;
        static cosh(val: number): number;
        static exp(val: number): number;
        static floor(val: number): number;
        static log(val: number): number;
        static log10(val: number): number;
        static max(val1: number, val2: number): number;
        static min(val1: number, val2: number): number;
        static pow(x: number, y: number): number;
        static round(value: number): number;
        static sin(val: number): number;
        static sinh(val: number): number;
        static sqrt(val: number): number;
        static tan(val: number): number;
        static tanh(val: number): number;
    }
}
declare namespace fm.icelink {
    class NameValueCollection {
        getTypeString(): string;
        private _value;
        constructor(value?: Hash<string, string>);
        source: () => Hash<string, string>;
        get(name: string): string;
        set(name: string, value: string): void;
        getCount(): number;
        toHash(): Hash<string, string>;
        getKeys(): string[];
        getAllKeys(): string[];
    }
}
declare namespace fm.icelink {
    class NumberExtensions {
        getTypeString(): string;
        static toString(value: number, format?: string): string;
    }
}
declare namespace fm.icelink {
    class ObjectExtensions {
        getTypeString(): string;
        static getType(obj: any): Type;
        static getHashCode(obj: any): number;
    }
}
declare namespace fm.icelink {
    class ParseAssistant {
        getTypeString(): string;
        static parseByteValue(s: string): number;
        static parseShortValue(s: string): number;
        static parseIntegerValue(s: string): number;
        static parseLongValue(s: string): number;
        static parseFloatValue(s: string): number;
        static parseDoubleValue(s: string): number;
        static parseDecimalValue(s: string): number;
        static parseBooleanValue(s: string): boolean;
        static parseGuidValue(s: string): Guid;
        static tryParseByteValue(s: string, h: Holder<number>): boolean;
        static tryParseShortValue(s: string, h: Holder<number>): boolean;
        static tryParseIntegerValue(s: string, h: Holder<number>): boolean;
        static tryParseLongValue(s: string, h: Holder<number>): boolean;
        static tryParseFloatValue(s: string, h: Holder<number>): boolean;
        static tryParseDoubleValue(s: string, h: Holder<number>): boolean;
        static tryParseDecimalValue(s: string, h: Holder<number>): boolean;
        static tryParseBooleanValue(s: string, h: Holder<boolean>): boolean;
        static tryParseGuidValue(s: string, h: Holder<Guid>): boolean;
    }
}
declare namespace fm.icelink {
    /**
    Platform-specific methods.
    */
    interface IPlatform {
        getArchitecture(): fm.icelink.Architecture;
        getCoreCount(): number;
        getCryptoLibrary(): fm.icelink.CryptoLibrary;
        getDirectorySeparator(): string;
        getIsLittleEndian(): boolean;
        getIsMobile(): boolean;
        getMachineName(): string;
        getOperatingSystem(): fm.icelink.OperatingSystem;
        getOperatingSystemVersion(): string;
        getPhysicalMemory(): number;
        getProcessId(): number;
        getSourceLanguage(): fm.icelink.SourceLanguage;
        getUseFipsAlgorithms(): boolean;
        setCryptoLibrary(value: fm.icelink.CryptoLibrary): void;
        setIsMobile(value: boolean): void;
        setUseFipsAlgorithms(value: boolean): void;
    }
}
declare namespace fm.icelink {
    class Platform implements IPlatform {
        private static instance;
        static getInstance(): IPlatform;
        constructor();
        private littleEndianChecked;
        private isLittleEndian;
        private isMobile;
        private useFipsAlgorithms;
        getIsMobile(): boolean;
        setIsMobile(isMobile: boolean): void;
        getIsLittleEndian(): boolean;
        getOperatingSystem(): OperatingSystem;
        getOperatingSystemVersion(): string;
        getArchitecture(): Architecture;
        getSourceLanguage(): SourceLanguage;
        getCoreCount(): number;
        getPhysicalMemory(): number;
        getMachineName(): string;
        getDirectorySeparator(): string;
        getProcessId(): number;
        getUseFipsAlgorithms(): boolean;
        setUseFipsAlgorithms(useFipsAlgorithms: boolean): void;
        getCryptoLibrary(): CryptoLibrary;
        setCryptoLibrary(cryptoLibrary: CryptoLibrary): void;
    }
}
declare namespace fm.icelink {
    interface XhrSendOptions extends HttpWebRequestSendOptions {
        abortOnUnload?: boolean;
        cacheBusterParameterName?: string;
    }
    class Xhr {
        getTypeString(): string;
        private static _count;
        private static _current;
        private static _disableBinary;
        private static _defaultWithCredentials;
        static setDisableBinary(disableBinary: boolean): void;
        static getDisableBinary(): boolean;
        static setDefaultWithCredentials(defaultWithCredentials: boolean): void;
        static getDefaultWithCredentials(): boolean;
        private static failureHandler;
        private static successHandler;
        private static handler;
        static send(options: XhrSendOptions): boolean;
        private static __initialized;
        static initialize(): void;
    }
}
declare namespace fm.icelink {
    interface PostMessageSendOptions extends XhrSendOptions {
        id: number;
    }
    class PostMessage {
        getTypeString(): string;
        private static _cache;
        private static _optionsCounter;
        private static _optionsCache;
        private static getOrigin;
        private static createFrame;
        static send(options: PostMessageSendOptions): void;
        private static listen;
    }
}
declare namespace fm.icelink {
    /**
    Promise base properties/methods.
    */
    abstract class PromiseBase<T> extends fm.icelink.Future<T> implements fm.icelink.IPromise {
        getTypeString(): string;
        /** @hidden */
        private __id;
        /** @hidden */
        private __pendingPromisesToReject;
        /** @hidden */
        private __pendingPromisesToResolve;
        /** @hidden */
        private __pendingRejects;
        /** @hidden */
        private __pendingResolves;
        /** @hidden */
        private __stateLock;
        /**
        Initializes a new instance of the [[fm.icelink.promiseBase]] class.
        */
        constructor();
        /**
        Returns a promise that resolves when all passed in promises resolve.
        @param promises The promises to check.
        */
        static all<R extends Object>(promises: fm.icelink.Future<R>[]): fm.icelink.Future<R>;
        /**
        Creates a promise and rejects it immediately.
        @param ex The exception.
        */
        static rejectNow<R extends Object>(ex: fm.icelink.Exception): fm.icelink.Future<R>;
        /**
        Creates a promise and resolves it immediately using a null result value.
        */
        static resolveNow(): fm.icelink.Future<Object>;
        /**
        Creates a promise and resolves it immediately using the given result value.
        @param result The result.
        */
        static resolveNow<R extends Object>(result: R): fm.icelink.Future<R>;
        /**
        Creates a promise and resolves it using the result from a callback function, or rejects it if an exception is thrown.
        @param callback The callback function.
        */
        static wrapPromise<R extends Object>(callback: fm.icelink.IFunction0<fm.icelink.Future<R>>): fm.icelink.Future<R>;
        /** @hidden */
        private addReject;
        /** @hidden */
        private addResolve;
        /**
        Internal DoAll.
        */
        protected doAll<R extends Object>(promises: fm.icelink.Future<R>[], counter: fm.icelink.AtomicInteger): void;
        /** @hidden */
        private doRejectAsync;
        /** @hidden */
        private doResolveAsync;
        /**
        Gets the identifier of this promise.
        */
        getId(): string;
        /**
        Processes the specified promise.
        @param promise The promise.
        @param resolve The resolve.
        @param reject The reject.
        */
        protected process(promise: fm.icelink.IPromise, resolve: fm.icelink.IAction1<T>, reject: fm.icelink.IAction1<fm.icelink.Exception>): void;
        /** @hidden */
        private raiseReject;
        /** @hidden */
        private raiseRejects;
        /** @hidden */
        private raiseResolve;
        /** @hidden */
        private raiseResolves;
        /**
        Rejects the promise.
        @param exception The exception.
        */
        reject(exception: fm.icelink.Exception): boolean;
        /**
        Rejects the promise asynchronously.
        @param exception The exception.
        */
        rejectAsync(exception: fm.icelink.Exception): fm.icelink.Future<Object>;
        /** @hidden */
        private reset;
        /**
        Resolves the promise.
        @param result The result.
        */
        resolve(result: T): boolean;
        /**
        Resolves the promise asynchronously.
        @param result The result.
        */
        resolveAsync(result: T): fm.icelink.Future<Object>;
    }
}
declare namespace fm.icelink {
    class Promise<T> extends PromiseBase<T> {
        getTypeString(): string;
        then<R>(resolve: IFunction1<T, R | Future<R>>, reject?: IAction1<Exception>): Future<R>;
        fail(reject?: IAction1<Exception>): Future<T>;
        static wrap(callbackAction: IAction0): Future<Object>;
        static wrap<R extends Object>(callbackFunction: IFunction0<R>): Future<R>;
        static wrapAsync(callbackAction: IAction0): Future<Object>;
        static wrapAsync<R extends Object>(callbackFunction: IFunction0<R>): Future<R>;
    }
}
declare namespace fm.icelink {
    class Randomizer {
        getTypeString(): string;
        private static _randomCharset;
        next(): number;
        next(maxValue: number): number;
        next(minValue: number, maxValue: number): number;
        nextDouble(): number;
        nextBytes(buffer: Uint8Array): void;
        randomString(size: number): string;
    }
}
declare namespace fm.icelink {
    class Regex {
        getTypeString(): string;
        private pattern;
        constructor(pattern: string);
        static isMatch(input: string, pattern: string): boolean;
        isMatch(input: string): boolean;
    }
}
declare namespace fm.icelink {
    class Sha256 {
        digestLength: number;
        blockSize: number;
        private state;
        private temp;
        private buffer;
        private bufferLength;
        private bytesHashed;
        finished: boolean;
        constructor();
        reset(): this;
        clean(): void;
        update(data: Uint8Array, dataLength?: number): this;
        finish(out: Uint8Array): this;
        digest(): Uint8Array;
        _saveState(out: Uint32Array): void;
        _restoreState(from: Uint32Array, bytesHashed: number): void;
    }
    class HmacSha256 {
        private inner;
        private outer;
        blockSize: number;
        digestLength: number;
        private istate;
        private ostate;
        constructor(key: Uint8Array);
        reset(): this;
        clean(): void;
        update(data: Uint8Array): this;
        finish(out: Uint8Array): this;
        digest(): Uint8Array;
    }
}
declare namespace fm.icelink {
}
declare namespace fm.icelink {
    class Stack<T> {
        getTypeString(): string;
        private _list;
        private _depth;
        constructor(depth?: number);
        push(o: T): void;
        pop(): T;
        peek(): T;
        getCount(): number;
    }
}
declare namespace fm.icelink {
    class StringBuilder {
        getTypeString(): string;
        private _value;
        constructor(value?: string);
        append(s: string, startIndex?: number, count?: number): StringBuilder;
        toString(): string;
        getLength(): number;
        remove(startIndex: number, length: number): StringBuilder;
    }
}
declare namespace fm.icelink {
    enum StringComparison {
        CurrentCulture = 0,
        CurrentCultureIgnoreCase = 1,
        InvariantCulture = 2,
        InvariantCultureIgnoreCase = 3,
        Ordinal = 4,
        OrdinalIgnoreCase = 5
    }
}
declare namespace fm.icelink {
    class StringExtensions {
        getTypeString(): string;
        static empty: string;
        static nullCoalesce(value1: string, value2: string): string;
        static toString(s: string): string;
        static trim(s: string): string;
        static trimEnd(s: string, chars: number[]): string;
        static trimStart(s: string, chars: number[]): string;
        static replace(s: string, search: string, replace: string): string;
        static concat(...strings: any[]): string;
        static contains(str: string, s: string): boolean;
        static join(separator: string, ...array: any[]): string;
        static split(s: string, chars: number[]): string[];
        static isNullOrEmpty(s: string): boolean;
        static isEqual(str: string, s: string, stringComparison?: StringComparison): boolean;
        static indexOf(str: string, s: string, stringComparison?: StringComparison): number;
        static lastIndexOf(str: string, s: string, stringComparison?: StringComparison): number;
        static startsWith(str: string, s: string, stringComparison?: StringComparison): boolean;
        static endsWith(str: string, s: string, stringComparison?: StringComparison): boolean;
        static compareTo(s1: string, s2: string): number;
        static format(format: string, ...args: any[]): string;
        static toLower(str: string): string;
        static toUpper(str: string): string;
        static getLength(str: string): number;
        static getChars(str: string): string[];
        static substring(str: string, startIndex: number, length: number): string;
        static getHashCode(str: string): number;
    }
}
declare namespace fm.icelink {
    /**
    A thread-safe class for running timeouts on asynchronous methods.
    */
    interface ITimeoutTimer {
        start(timeout: number): void;
        stop(): boolean;
    }
}
declare namespace fm.icelink {
    class TimeoutTimer implements ITimeoutTimer {
        getTypeString(): string;
        private _timer;
        private _callback;
        private _state;
        private _currentTimeout;
        constructor(callback: IAction1<any>, state: any);
        start(timeout: number): void;
        stop(): boolean;
    }
}
declare namespace fm.icelink {
    class TimeSpan {
        private _hours;
        private _minutes;
        private _seconds;
        private _milliseconds;
        constructor(ticks: number);
        constructor(hours: number, minutes: number, seconds: number);
        getTotalSeconds(): number;
        getTotalMilliseconds(): number;
    }
}
declare namespace fm.icelink {
    class Type {
        getTypeString(): string;
        private _typeString;
        constructor(typeString: string);
        getFullName(): string;
        getBaseType(): Type;
    }
}
declare namespace fm.icelink {
    class Uri {
        getTypeString(): string;
        private _uriString;
        constructor(uriString: string);
        toString(): string;
        static escapeDataString(s: string): string;
    }
}
declare namespace fm.icelink {
    /**
    WebSocket base properties/methods.
    */
    class WebSocketBase {
        getTypeString(): string;
        /** @hidden */
        private static fm_icelink_WebSocketBase___log;
        constructor();
        /**
        Raises the close complete callback.
        @param closeArgs The close arguments.
        @param statusCode The status code.
        @param reason The reason.
        */
        protected raiseCloseComplete(closeArgs: fm.icelink.WebSocketCloseArgs, statusCode: fm.icelink.WebSocketStatusCode, reason: string): void;
        /**
        Raises the open failure callback.
        @param openArgs The open arguments.
        @param statusCode The status code.
        @param exception The exception.
        */
        protected raiseOpenFailure(openArgs: fm.icelink.WebSocketOpenArgs, statusCode: fm.icelink.WebSocketStatusCode, exception: fm.icelink.Exception): void;
        /**
        Raises the open success callback.
        @param openArgs The open arguments.
        */
        protected raiseOpenSuccess(openArgs: fm.icelink.WebSocketOpenArgs): void;
        /**
        Raises the receive callback.
        @param openArgs The open arguments.
        @param textMessage The text message.
        @param binaryMessage The binary message.
        */
        protected raiseReceive(openArgs: fm.icelink.WebSocketOpenArgs, textMessage: string, binaryMessage: Uint8Array): void;
        /**
        Raises the stream failure callback.
        @param openArgs The open arguments.
        @param statusCode The status code.
        @param exception The exception.
        */
        protected raiseStreamFailure(openArgs: fm.icelink.WebSocketOpenArgs, statusCode: fm.icelink.WebSocketStatusCode, exception: fm.icelink.Exception): void;
        /** @hidden */
        private static __fmicelinkWebSocketBaseInitialized;
        /** @hidden */
        static fmicelinkWebSocketBaseInitialize(): void;
    }
}
declare namespace fm.icelink {
    class WebSocket extends WebSocketBase implements IWebSocket {
        getTypeString(): string;
        private static _disableBinary;
        private _requestUrl;
        private _webSocket;
        private _protocol;
        private _onRequestCreated;
        private _onResponseReceived;
        private _opening;
        private _closing;
        private _aborting;
        private _openArgs;
        private _sendArgs;
        private _timer;
        private _raisedStreamFailure;
        private _raisedOpenFailure;
        static getExists(): boolean;
        static setDisableBinary(disableBinary: boolean): void;
        static getDisableBinary(): boolean;
        getSecure(): boolean;
        constructor(requestUrl: string, protocol?: string);
        getBufferedAmount(): number;
        getIsOpen(): boolean;
        open(args: WebSocketOpenArgs): void;
        private onOpen;
        private onError;
        private onClose;
        private processOnClose;
        private onMessage;
        send(args: WebSocketSendArgs): void;
        close(): void;
        close(args: WebSocketCloseArgs): void;
        private raiseOnRequestCreated;
        private raiseOnResponseReceived;
    }
}
declare namespace fm.icelink {
    /**
    Base definition for classes that allow serialization to/from JSON.
    */
    abstract class Serializable {
        getTypeString(): string;
        /** @hidden */
        private __serialized;
        /** @hidden */
        private _isDirty;
        /** @hidden */
        private _isSerialized;
        private fmicelinkSerializableInit;
        /**
        Initializes a new instance of the [[fm.icelink.serializable]] class.
        */
        constructor();
        /** @hidden */
        getIsDirty(): boolean;
        /** @hidden */
        getIsSerialized(): boolean;
        /** @hidden */
        getSerialized(): string;
        /** @hidden */
        setIsDirty(value: boolean): void;
        /** @hidden */
        setIsSerialized(value: boolean): void;
        /** @hidden */
        setSerialized(value: string): void;
    }
}
declare namespace fm.icelink {
    /**
    Supplies class instances with a key-value mapping to support dynamic property storage.
    */
    abstract class Dynamic extends fm.icelink.Serializable {
        getTypeString(): string;
        /** @hidden */
        private __dynamicProperties;
        /** @hidden */
        private __dynamicPropertiesLock;
        constructor();
        /**
        Gets the dynamic properties on this instance.
        */
        getDynamicProperties(): fm.icelink.Hash<string, Object>;
        /**
        Gets a property value from the local cache.
        @param key The property key. This key is used internally only, but should be namespaced to avoid conflict with third-party extensions.
        @return The stored value, if found; otherwise null.
        */
        getDynamicValue(key: string): Object;
        /** @hidden */
        setDynamicProperties(value: fm.icelink.Hash<string, Object>): void;
        /**
        Sets a property value in the local cache.
        @param key The property key. This key is used internally only, but should be namespaced to avoid conflict with third-party extensions.
        @param value The property value. This can be any object that needs to be stored for future use.
        */
        setDynamicValue(key: string, value: Object): void;
        /** @hidden */
        private tryInitDynamicProperties;
        /**
        Unsets a property value in the local cache.
        @param key The property key. This key is used internally only, but should be namespaced to avoid conflict with third-party extensions.
        @return `true` if the value was removed; otherwise, `false`.
        */
        unsetDynamicValue(key: string): boolean;
    }
}
declare namespace fm.icelink {
    interface IExternalStream extends IStream, IExternal<IInternalStream> {
    }
    interface IInternalStream extends IStream, IInternal<IExternalStream> {
    }
    abstract class Stream extends Dynamic implements IExternalStream {
        getTypeString(): string;
        getState(): StreamState;
        addOnStateChange(value: IAction0): void;
        removeOnStateChange(value: IAction0): void;
        changeDirection(newDirection: StreamDirection): Error;
        getDirection(): StreamDirection;
        getLocalReceive(): boolean;
        setLocalReceive(receiveEnabled: boolean): void;
        getLocalSend(): boolean;
        setLocalSend(sendEnabled: boolean): void;
        getRemoteReceive(): boolean;
        getRemoteSend(): boolean;
        getRemoteDirection(): StreamDirection;
        getId(): string;
        getExternalId(): string;
        getLabel(): string;
        getLocalDirection(): StreamDirection;
        getTag(): string;
        getType(): StreamType;
        setExternalId(value: string): void;
        setLocalDirection(value: StreamDirection): void;
        setTag(value: string): void;
        addOnDirectionChange(value: IAction0): void;
        removeOnDirectionChange(value: IAction0): void;
        getTransportInfo(): TransportInfo;
    }
}
declare namespace fm.icelink {
    interface IExternalMediaStream extends IMediaStream, IExternal<IInternalMediaStream> {
    }
    interface IInternalMediaStream extends IMediaStream, IInternal<IExternalMediaStream> {
    }
    abstract class MediaStream<TTrack> extends Stream implements IMediaStream, IExternalMediaStream {
        getTypeString(): string;
        getLocalTrack(): TTrack;
        getRemoteTrack(): TTrack;
        getLocalBandwidth(): number;
        getMuted(): boolean;
        getInputMuted(): boolean;
        getOutputMuted(): boolean;
        getRemoteBandwidth(): number;
        setLocalBandwidth(value: number): void;
        setMuted(value: boolean): void;
        setInputMuted(value: boolean): void;
        setOutputMuted(value: boolean): void;
        getPreferredCodecs(): string[];
        setPreferredCodecs(names: string[]): void;
        getCodecDisabled(name: string): boolean;
        setCodecDisabled(name: string, disabled: boolean): void;
        getRemoteEncoding(): EncodingInfo;
        setRemoteEncoding(value: EncodingInfo): void;
        getSimulcastMode(): SimulcastMode;
        setSimulcastMode(value: SimulcastMode): void;
        getInfo(): MediaStreamInfo;
        constructor(localTrack: TTrack, remoteTrack: TTrack);
        getControlTransportInfo(): TransportInfo;
        getLocalCanonicalName(): string;
        getRemoteCanonicalName(): string;
        addOnLocalEncodingDisabled(value: IAction1<EncodingInfo>): void;
        addOnLocalEncodingEnabled(value: IAction1<EncodingInfo>): void;
        removeOnLocalEncodingDisabled(value: IAction1<EncodingInfo>): void;
        removeOnLocalEncodingEnabled(value: IAction1<EncodingInfo>): void;
    }
}
declare namespace fm.icelink {
    interface IExternalAudioStream extends IAudioStream, IExternal<IInternalAudioStream> {
    }
    interface IInternalAudioStream extends IAudioStream, IInternal<IExternalAudioStream> {
    }
    class AudioStream extends MediaStream<AudioTrack> implements IAudioStream, IExternalAudioStream {
        getTypeString(): string;
        getLocalMedia(): LocalMedia;
        getRemoteMedia(): RemoteMedia;
        constructor(localTrack: AudioTrack);
        constructor(localTrack: AudioTrack, remoteTrack: AudioTrack);
        constructor(localMedia: LocalMedia);
        constructor(localMedia: LocalMedia, remoteMedia: RemoteMedia);
        constructor(remoteMedia: RemoteMedia);
        addOnReceiveDtmfTone(value: IAction1<dtmf.Tone>): void;
        addOnReceiveDtmfToneChange(value: IAction1<dtmf.Tone>): void;
        addOnSendDtmfTone(value: IAction1<dtmf.Tone>): void;
        addOnSendDtmfToneChange(value: IAction1<dtmf.Tone>): void;
        insertDtmfTone(dtmfTone: dtmf.Tone): boolean;
        insertDtmfTones(dtmfTones: dtmf.Tone[]): boolean;
        removeOnReceiveDtmfTone(value: IAction1<dtmf.Tone>): void;
        removeOnReceiveDtmfToneChange(value: IAction1<dtmf.Tone>): void;
        removeOnSendDtmfTone(value: IAction1<dtmf.Tone>): void;
        removeOnSendDtmfToneChange(value: IAction1<dtmf.Tone>): void;
        getOpusDisabled(): boolean;
        getG722Disabled(): boolean;
        getPcmuDisabled(): boolean;
        getPcmaDisabled(): boolean;
        setOpusDisabled(value: boolean): void;
        setG722Disabled(value: boolean): void;
        setPcmuDisabled(value: boolean): void;
        setPcmaDisabled(value: boolean): void;
    }
}
declare namespace fm.icelink {
    interface IExternalMediaTrack extends IMediaTrack, IExternal<IInternalMediaTrack> {
    }
    interface IInternalMediaTrack extends IMediaTrack, IInternal<IExternalMediaTrack> {
    }
    abstract class MediaTrack extends Dynamic implements IMediaTrack, IExternalMediaTrack {
        getTypeString(): string;
        getMedia(): Media;
        constructor(media: Media);
        addOnStarted(value: IAction0): void;
        addOnStopped(value: IAction0): void;
        addOnDestroyed(value: IAction0): void;
        removeOnStarted(value: IAction0): void;
        removeOnStopped(value: IAction0): void;
        removeOnDestroyed(value: IAction0): void;
        changeSinkOutput(sinkOutput: SinkOutput): Future<Object>;
        changeSourceInput(sourceInput: SourceInput): Future<Object>;
        destroy(): boolean;
        getMuted(): boolean;
        getSinkOutput(): SinkOutput;
        getSinkOutputs(): Future<SinkOutput[]>;
        getSourceInput(): SourceInput;
        getSourceInputs(): Future<SourceInput[]>;
        setMuted(value: boolean): void;
        setSinkOutput(value: SinkOutput): void;
        setSourceInput(value: SourceInput): void;
    }
}
declare namespace fm.icelink {
    interface IExternalAudioTrack extends IAudioTrack, IExternal<IInternalAudioTrack> {
    }
    interface IInternalAudioTrack extends IAudioTrack, IInternal<IExternalAudioTrack> {
    }
    class AudioTrack extends MediaTrack implements IAudioTrack, IExternalAudioTrack {
        getTypeString(): string;
        constructor(media: Media, internalMedia?: IInternalMedia);
        addOnLevel(value: IAction1<number>): void;
        getGain(): number;
        getVolume(): number;
        removeOnLevel(value: IAction1<number>): void;
        setGain(value: number): void;
        setVolume(value: number): void;
    }
}
declare namespace fm.icelink {
    interface IExternalConnection extends IConnection<IExternalConnection, IExternalStream, IExternalAudioStream, IExternalVideoStream, IExternalDataStream>, IExternal<IInternalConnection> {
    }
    interface IInternalConnection extends IConnection<IInternalConnection, IInternalStream, IInternalAudioStream, IInternalVideoStream, IInternalDataStream>, IInternal<IExternalConnection> {
    }
    class Connection extends Dynamic implements IConnection<Connection, Stream, AudioStream, VideoStream, DataStream>, IExternalConnection {
        getTypeString(): string;
        private _onExternalIdChangeValues;
        constructor(stream: Stream);
        constructor(streams: Stream[]);
        addIceServer(iceServer: IceServer): void;
        addIceServers(iceServers: IceServer[]): void;
        addOnGatheringStateChange(value: IAction1<Connection>): void;
        addOnIceConnectionStateChange(value: IAction1<Connection>): void;
        addOnLocalCandidate(value: IAction2<Connection, Candidate>): void;
        addOnLocalDescription(value: IAction2<Connection, SessionDescription>): void;
        addOnRemoteCandidate(value: IAction2<Connection, Candidate>): void;
        addOnRemoteDescription(value: IAction2<Connection, SessionDescription>): void;
        addOnSignallingStateChange(value: IAction1<Connection>): void;
        addOnStateChange(value: IAction1<Connection>): void;
        addRemoteCandidate(remoteCandidate: Candidate): Future<Candidate>;
        close(): boolean;
        createAnswer(): Future<SessionDescription>;
        createOffer(): Future<SessionDescription>;
        getDeadStreamTimeout(): number;
        getError(): Error;
        getExternalId(): string;
        getBundlePolicy(): BundlePolicy;
        getIceGatherPolicy(): IceGatherPolicy;
        getIceServer(): IceServer;
        getGatheringState(): IceGatheringState;
        getIceConnectionState(): IceConnectionState;
        getIceServers(): IceServer[];
        getId(): string;
        getCanonicalName(): string;
        getLocalDescription(): SessionDescription;
        getRemoteDescription(): SessionDescription;
        getSignallingState(): SignallingState;
        getState(): ConnectionState;
        getStats(): Future<ConnectionStats>;
        getStreams(): Stream[];
        getTieBreaker(): string;
        getLegacyTimeout(): boolean;
        getTimeout(): number;
        getTrickleIcePolicy(): TrickleIcePolicy;
        getHasAudio(): boolean;
        getHasVideo(): boolean;
        getHasData(): boolean;
        getAudioStream(): AudioStream;
        getAudioStreams(): AudioStream[];
        getVideoStream(): VideoStream;
        getVideoStreams(): VideoStream[];
        getDataStream(): DataStream;
        getDataStreams(): DataStream[];
        removeIceServer(iceServer: IceServer): void;
        removeIceServers(iceServers: IceServer[]): void;
        removeOnGatheringStateChange(value: IAction1<Connection>): void;
        removeOnIceConnectionStateChange(value: IAction1<Connection>): void;
        removeOnLocalCandidate(value: IAction2<Connection, Candidate>): void;
        removeOnLocalDescription(value: IAction2<Connection, SessionDescription>): void;
        removeOnRemoteCandidate(value: IAction2<Connection, Candidate>): void;
        removeOnRemoteDescription(value: IAction2<Connection, SessionDescription>): void;
        removeOnSignallingStateChange(value: IAction1<Connection>): void;
        removeOnStateChange(value: IAction1<Connection>): void;
        setDeadStreamTimeout(value: number): void;
        setExternalId(value: string): void;
        setError(value: Error): void;
        addOnExternalIdChange(value: IAction2<string, string>): void;
        removeOnExternalIdChange(value: IAction2<string, string>): void;
        setBundlePolicy(value: BundlePolicy): void;
        setIceGatherPolicy(value: IceGatherPolicy): void;
        setIceServer(value: IceServer): void;
        setIceServers(value: IceServer[]): void;
        setLocalDescription(localDescription: SessionDescription): Future<SessionDescription>;
        setLegacyTimeout(legacyTimeout: boolean): void;
        setRemoteDescription(remoteDescription: SessionDescription): Future<SessionDescription>;
        setTimeout(value: number): void;
        setTrickleIcePolicy(value: TrickleIcePolicy): void;
        setTieBreaker(value: string): void;
        getRemoteMedia(): RemoteMedia;
        private externalsToInternals;
        private externalToInternal;
        private internalsToExternals;
        private internalToExternal;
    }
}
declare namespace fm.icelink {
    interface IExternalDataChannel extends IDataChannel<IExternalDataChannel>, IExternal<IInternalDataChannel> {
    }
    interface IInternalDataChannel extends IDataChannel<IInternalDataChannel>, IInternal<IExternalDataChannel> {
    }
    class DataChannel extends Dynamic implements IDataChannel<DataChannel>, IExternalDataChannel {
        getTypeString(): string;
        getInfo(): DataChannelInfo;
        constructor(label: string, ordered?: boolean, subprotocol?: string);
        setOnReceive(value: IAction1<DataChannelReceiveArgs>): void;
        getSubprotocol(): string;
        getOnReceive(): IAction1<DataChannelReceiveArgs>;
        sendDataString(dataString: string): fm.icelink.Future<Object>;
        sendDataBytes(dataBytes: DataBuffer): fm.icelink.Future<Object>;
        getState(): DataChannelState;
        getLabel(): string;
        getId(): string;
        getOrdered(): boolean;
        addOnStateChange(value: IAction1<DataChannel>): void;
        removeOnStateChange(value: IAction1<DataChannel>): void;
    }
}
declare namespace fm.icelink {
    interface IExternalDataStream extends IDataStream<IExternalDataChannel>, IExternal<IInternalDataStream> {
    }
    interface IInternalDataStream extends IDataStream<IInternalDataChannel>, IInternal<IExternalDataStream> {
    }
    class DataStream extends Stream implements IDataStream<DataChannel>, IExternalDataStream {
        getTypeString(): string;
        getInfo(): DataStreamInfo;
        constructor(channel: DataChannel);
        constructor(channels: DataChannel[]);
        setGetRemoteConnectionInfo(value: IFunction1<string, any>): void;
        getChannels(): DataChannel[];
        private externalToInternal;
        private externalsToInternals;
        private internalToExternal;
        private internalsToExternals;
    }
}
declare namespace fm.icelink {
    class DomAudioSink extends Dynamic {
        getTypeString(): string;
        constructor(track: AudioTrack);
    }
}
declare namespace fm.icelink {
    /**
    A layout preset.
    */
    class LayoutPreset extends fm.icelink.Dynamic {
        getTypeString(): string;
        /** @hidden */
        private __blockHeight;
        /** @hidden */
        private __blockHeightPercent;
        /** @hidden */
        private __blockMarginX;
        /** @hidden */
        private __blockMarginXPercent;
        /** @hidden */
        private __blockMarginY;
        /** @hidden */
        private __blockMarginYPercent;
        /** @hidden */
        private __blockWidth;
        /** @hidden */
        private __blockWidthPercent;
        /** @hidden */
        private __floatHeight;
        /** @hidden */
        private __floatHeightPercent;
        /** @hidden */
        private __floatMarginX;
        /** @hidden */
        private __floatMarginXPercent;
        /** @hidden */
        private __floatMarginY;
        /** @hidden */
        private __floatMarginYPercent;
        /** @hidden */
        private __floatWidth;
        /** @hidden */
        private __floatWidthPercent;
        /** @hidden */
        private _alignment;
        /** @hidden */
        private _direction;
        /** @hidden */
        private _inlineMargin;
        /** @hidden */
        private _mode;
        private fmicelinkLayoutPresetInit;
        /**
        Initializes a new instance of the [[fm.icelink.layoutPreset]] class.
        */
        constructor();
        /** @hidden */
        private static calculateTable;
        /** @hidden */
        private static divideByTwo;
        /**
        Gets a Facetime-style layout preset.
        */
        static getFacetime(): fm.icelink.LayoutPreset;
        /**
        Gets a Google Hangouts-style layout preset. Note that this will present differently on mobile devices.
        */
        static getGoogleHangouts(): fm.icelink.LayoutPreset;
        /** @hidden */
        private static getSingleLayout;
        /**
        Gets a Skype-style layout preset. Note that this will present differently on mobile devices.
        */
        static getSkype(): fm.icelink.LayoutPreset;
        /** @hidden */
        private static getXMax;
        /** @hidden */
        private static getXMid;
        /** @hidden */
        private static getXMin;
        /** @hidden */
        private static getYMax;
        /** @hidden */
        private static getYMid;
        /** @hidden */
        private static getYMin;
        /** @hidden */
        private static mergeLayoutFrames;
        /** @hidden */
        private static spliceLayoutFrame;
        /** @hidden */
        private static takeLayoutFrames;
        /** @hidden */
        static transformFrame(frame: fm.icelink.LayoutFrame, origin: fm.icelink.LayoutOrigin, layoutWidth: number, layoutHeight: number): void;
        /**
        Applies a preset.
        @param preset The preset to apply.
        */
        applyPreset(preset: fm.icelink.LayoutPreset): void;
        /** @hidden */
        private calculateBlockFrame;
        /** @hidden */
        private calculateFillFrame;
        /** @hidden */
        private calculateFloatFrame;
        /** @hidden */
        private calculateFloatFrames;
        /** @hidden */
        private calculateInlineFrame;
        /** @hidden */
        private calculateInlineFrames;
        /**
        Gets a video frame layout.
        @param layoutWidth The total width of the layout.
        @param layoutHeight The total height of the layout.
        @param remoteCount The number of remote frames.
        @param origin The layout origin
        @return The video frame layout.
        */
        calculateLayout(layoutWidth: number, layoutHeight: number, remoteCount: number, origin: fm.icelink.LayoutOrigin): fm.icelink.Layout;
        /**
        Copies this preset's properties to another preset.
        @param preset The target preset.
        */
        copyToPreset(preset: fm.icelink.LayoutPreset): void;
        /**
        Gets the alignment of the layout. Defaults to [[fm.icelink.layoutAlignment.BottomRight]].
        */
        getAlignment(): fm.icelink.LayoutAlignment;
        /**
        Gets the height of block elements in pixels. Overrides [[fm.icelink.layoutPreset.blockHeightPercent]].
        */
        getBlockHeight(): number;
        /**
        Gets the height of block elements as a percent of the container height between 0.0 and 1.0. Overrides [[fm.icelink.layoutPreset.blockHeight]].
        */
        getBlockHeightPercent(): number;
        /** @hidden */
        private getBlockLayout;
        /**
        Gets the X-margin between block elements and the layout edge in pixels. Overrides [[fm.icelink.layoutPreset.blockMarginXPercent]].
        */
        getBlockMarginX(): number;
        /**
        Gets the X-margin between block elements and the layout edge as a percent of the container width between 0.0 and 1.0. Overrides [[fm.icelink.layoutPreset.blockMarginX]].
        */
        getBlockMarginXPercent(): number;
        /**
        Gets the Y-margin between block elements and the layout edge in pixels. Overrides [[fm.icelink.layoutPreset.blockMarginYPercent]].
        */
        getBlockMarginY(): number;
        /**
        Gets the Y-margin between block elements and the layout edge as a percent of the container height between 0.0 and 1.0. Overrides [[fm.icelink.layoutPreset.blockMarginY]].
        */
        getBlockMarginYPercent(): number;
        /**
        Gets the width of block elements in pixels. Overrides [[fm.icelink.layoutPreset.blockWidthPercent]].
        */
        getBlockWidth(): number;
        /**
        Gets the width of block elements as a percent of the container width between 0.0 and 1.0. Overrides [[fm.icelink.layoutPreset.blockWidth]].
        */
        getBlockWidthPercent(): number;
        /** @hidden */
        private getBottomRowIndexes;
        /** @hidden */
        private getCenterColumnIndexes;
        /** @hidden */
        private getCenterRowIndexes;
        /**
        Gets the direction of the layout flow. Defaults to [[fm.icelink.layoutDirection.Horizontal]].
        */
        getDirection(): fm.icelink.LayoutDirection;
        /**
        Gets the height of floating elements in pixels. Overrides [[fm.icelink.layoutPreset.floatHeightPercent]].
        */
        getFloatHeight(): number;
        /**
        Gets the height of floating elements as a percent of the container height between 0.0 and 1.0. Overrides [[fm.icelink.layoutPreset.floatHeight]].
        */
        getFloatHeightPercent(): number;
        /** @hidden */
        private getFloatLocalLayout;
        /**
        Gets the X-margin between floating elements and the layout edge in pixels. Overrides [[fm.icelink.layoutPreset.floatMarginXPercent]].
        */
        getFloatMarginX(): number;
        /**
        Gets the X-margin between floating elements and the layout edge as a percent of the container width between 0.0 and 1.0. Overrides [[fm.icelink.layoutPreset.floatMarginX]].
        */
        getFloatMarginXPercent(): number;
        /**
        Gets the Y-margin between floating elements and the layout edge in pixels. Overrides [[fm.icelink.layoutPreset.floatMarginYPercent]].
        */
        getFloatMarginY(): number;
        /**
        Gets the Y-margin between floating elements and the layout edge as a percent of the container height between 0.0 and 1.0. Overrides [[fm.icelink.layoutPreset.floatMarginY]].
        */
        getFloatMarginYPercent(): number;
        /** @hidden */
        private getFloatRemoteLayout;
        /**
        Gets the width of floating elements in pixels. Overrides [[fm.icelink.layoutPreset.floatWidthPercent]].
        */
        getFloatWidth(): number;
        /**
        Gets the width of floating elements as a percent of the container width between 0.0 and 1.0. Overrides [[fm.icelink.layoutPreset.floatWidth]].
        */
        getFloatWidthPercent(): number;
        /** @hidden */
        private getInlineLayout;
        /**
        Gets the size of the margin in pixels to use between inline elements.
        */
        getInlineMargin(): number;
        /** @hidden */
        private getLeftColumnIndexes;
        /**
        Gets the mode used by the layout engine. Defaults to [[fm.icelink.layoutMode.FloatLocal]].
        */
        getMode(): fm.icelink.LayoutMode;
        /** @hidden */
        private getRightColumnIndexes;
        /** @hidden */
        private getTopRowIndexes;
        /**
        Sets the alignment of the layout. Defaults to [[fm.icelink.layoutAlignment.BottomRight]].
        */
        setAlignment(value: fm.icelink.LayoutAlignment): void;
        /**
        Sets the height of block elements in pixels. Overrides [[fm.icelink.layoutPreset.blockHeightPercent]].
        */
        setBlockHeight(value: number): void;
        /**
        Sets the height of block elements as a percent of the container height between 0.0 and 1.0. Overrides [[fm.icelink.layoutPreset.blockHeight]].
        */
        setBlockHeightPercent(value: number): void;
        /**
        Sets the X-margin between block elements and the layout edge in pixels. Overrides [[fm.icelink.layoutPreset.blockMarginXPercent]].
        */
        setBlockMarginX(value: number): void;
        /**
        Sets the X-margin between block elements and the layout edge as a percent of the container width between 0.0 and 1.0. Overrides [[fm.icelink.layoutPreset.blockMarginX]].
        */
        setBlockMarginXPercent(value: number): void;
        /**
        Sets the Y-margin between block elements and the layout edge in pixels. Overrides [[fm.icelink.layoutPreset.blockMarginYPercent]].
        */
        setBlockMarginY(value: number): void;
        /**
        Sets the Y-margin between block elements and the layout edge as a percent of the container height between 0.0 and 1.0. Overrides [[fm.icelink.layoutPreset.blockMarginY]].
        */
        setBlockMarginYPercent(value: number): void;
        /**
        Sets the width of block elements in pixels. Overrides [[fm.icelink.layoutPreset.blockWidthPercent]].
        */
        setBlockWidth(value: number): void;
        /**
        Sets the width of block elements as a percent of the container width between 0.0 and 1.0. Overrides [[fm.icelink.layoutPreset.blockWidth]].
        */
        setBlockWidthPercent(value: number): void;
        /**
        Sets the direction of the layout flow. Defaults to [[fm.icelink.layoutDirection.Horizontal]].
        */
        setDirection(value: fm.icelink.LayoutDirection): void;
        /**
        Sets the height of floating elements in pixels. Overrides [[fm.icelink.layoutPreset.floatHeightPercent]].
        */
        setFloatHeight(value: number): void;
        /**
        Sets the height of floating elements as a percent of the container height between 0.0 and 1.0. Overrides [[fm.icelink.layoutPreset.floatHeight]].
        */
        setFloatHeightPercent(value: number): void;
        /**
        Sets the X-margin between floating elements and the layout edge in pixels. Overrides [[fm.icelink.layoutPreset.floatMarginXPercent]].
        */
        setFloatMarginX(value: number): void;
        /**
        Sets the X-margin between floating elements and the layout edge as a percent of the container width between 0.0 and 1.0. Overrides [[fm.icelink.layoutPreset.floatMarginX]].
        */
        setFloatMarginXPercent(value: number): void;
        /**
        Sets the Y-margin between floating elements and the layout edge in pixels. Overrides [[fm.icelink.layoutPreset.floatMarginYPercent]].
        */
        setFloatMarginY(value: number): void;
        /**
        Sets the Y-margin between floating elements and the layout edge as a percent of the container height between 0.0 and 1.0. Overrides [[fm.icelink.layoutPreset.floatMarginY]].
        */
        setFloatMarginYPercent(value: number): void;
        /**
        Sets the width of floating elements in pixels. Overrides [[fm.icelink.layoutPreset.floatWidthPercent]].
        */
        setFloatWidth(value: number): void;
        /**
        Sets the width of floating elements as a percent of the container width between 0.0 and 1.0. Overrides [[fm.icelink.layoutPreset.floatWidth]].
        */
        setFloatWidthPercent(value: number): void;
        /**
        Sets the size of the margin in pixels to use between inline elements.
        */
        setInlineMargin(value: number): void;
        /**
        Sets the mode used by the layout engine. Defaults to [[fm.icelink.layoutMode.FloatLocal]].
        */
        setMode(value: fm.icelink.LayoutMode): void;
    }
}
declare namespace fm.icelink {
    /**
    A class that supplies simple video frame layout management.
    */
    abstract class LayoutManager<T> extends fm.icelink.LayoutPreset {
        getTypeString(): string;
        /** @hidden */
        private __onLayout;
        /** @hidden */
        private _inBatch;
        /** @hidden */
        private _layoutOrigin;
        /** @hidden */
        private _localView;
        /** @hidden */
        private _onLayout;
        /** @hidden */
        private _remoteViewsLock;
        /** @hidden */
        private _remoteViewsTable;
        private fmicelinkLayoutManagerInit;
        /**
        Initializes a new instance of the [[fm.icelink.layoutManager]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.layoutManager]] class.
        */
        constructor(preset: fm.icelink.LayoutPreset);
        /**
        Adds a handler that is raised when a layout is calculated.
        */
        addOnLayout(value: fm.icelink.IAction1<fm.icelink.Layout>): void;
        /**
        Adds remote media to the layout.
        @param remoteMedia The remote media.
        @return `true` if successful; otherwise, `false`.
            
        */
        addRemoteMedia(remoteMedia: fm.icelink.IViewableMedia<T>): boolean;
        /**
        Adds a remote view to the layout.
        @param idValue The remote view ID.
        @param view The remote view.
        @return `true` if successful; otherwise, `false`. Check the logs for additional information.
        */
        addRemoteView(idValue: string, view: T): boolean;
        /**
        Adds remote views to the layout.
        @param ids The remote view IDs.
        @param views The remote views.
        @return `true` if successful; otherwise, `false`. Check the logs for additional information.
        */
        addRemoteViews(ids: string[], views: T[]): boolean;
        /** @hidden */
        private addRemoteViewsUI;
        /** @hidden */
        private addRemoteViewUI;
        /**
        Adds a view to the container.
        @param view The view to add.
        */
        protected abstract addView(view: T): void;
        /**
        Dispatches an action to the main thread.
        @param action The action to invoke.
        @param arg1 The first argument.
        @param arg2 The second argument.
        */
        protected abstract dispatchToMainThread(action: fm.icelink.IAction2<Object, Object>, arg1: Object, arg2: Object): void;
        /** @hidden */
        private doSwapRemoteView;
        /** @hidden */
        private doSwapRemoteViews;
        /**
        Gets a video frame layout.
        @param layoutWidth The total width of the layout.
        @param layoutHeight The total height of the layout.
        @param remoteCount The number of remote frames.
        @return The video frame layout.
        */
        protected getLayout(layoutWidth: number, layoutHeight: number, remoteCount: number): fm.icelink.Layout;
        /**
        Gets a video frame layout.
        @param layoutWidth The total width of the layout.
        @param layoutHeight The total height of the layout.
        @param remoteCount The number of remote frames.
        @param remoteViewIds The array of remote view ids.
        @return The video frame layout.
        */
        protected getLayout(layoutWidth: number, layoutHeight: number, remoteCount: number, remoteViewIds: string[]): fm.icelink.Layout;
        /**
        Gets the layout origin. Defaults to TopLeft.
        */
        getLayoutOrigin(): fm.icelink.LayoutOrigin;
        /**
        Gets the local view from the layout.
        @return The local view.
        */
        getLocalView(): T;
        /** @hidden */
        private getNewestRemoteView;
        /** @hidden */
        private getOldestRemoteView;
        /**
        Gets a remote view from the layout.
        @param idValue The remote view ID.
        @return The remote view.
        */
        getRemoteView(idValue: string): T;
        /**
        Gets the IDs of the remote views in the layout.
        @return The remote view IDs.
        */
        getRemoteViewIds(): string[];
        /**
        Gets all remote views from the layout.
        @return The remote views.
        */
        getRemoteViews(): Array<T>;
        /**
        Gets remote views from the layout.
        @param ids The remote view IDs.
        @return The remote views.
        */
        getRemoteViews(ids: string[]): Array<T>;
        /** @hidden */
        private getRemoteViewsInternal;
        /**
        Positions the local and remote views within the layout.
        */
        abstract layout(): void;
        /**
        Positions the local and remote views within the layout after dispatching to the main thread.
        */
        layoutOnMainThread(): void;
        /** @hidden */
        private layoutOnMainThreadUI;
        /**
        Removes a handler that is raised when a layout is calculated.
        */
        removeOnLayout(value: fm.icelink.IAction1<fm.icelink.Layout>): void;
        /**
        Removes remote media from the layout.
        @param remoteMedia The remote media.
        @return `true` if successful; otherwise, `false`.
            
        */
        removeRemoteMedia(remoteMedia: fm.icelink.IViewableMedia<T>): boolean;
        /**
        Removes a remote view from the layout.
        @param idValue The remote view ID.
        @return `true` if successful; otherwise, `false`. Check the logs for additional information.
        */
        removeRemoteView(idValue: string): boolean;
        /**
        Removes all remote views from the layout.
        */
        removeRemoteViews(): void;
        /**
        Removes remote views from the layout.
        @param ids The remote view IDs.
        @return `true` if successful; otherwise, `false`. Check the logs for additional information.
        */
        removeRemoteViews(ids: string[]): boolean;
        /** @hidden */
        private removeRemoteViewsUI;
        /** @hidden */
        private removeRemoteViewUI;
        /**
        Removes a view from the container.
        @param view The view to remove.
        */
        protected abstract removeView(view: T): void;
        /**
        Removes all remote views from the layout, then removes the local view from the layout.
        */
        reset(): void;
        /**
        Sets the layout origin. Defaults to TopLeft.
        */
        protected setLayoutOrigin(value: fm.icelink.LayoutOrigin): void;
        /**
        Adds the local media to the layout.
        @param localMedia The local media.
        @return `true` if successful; otherwise, `false`.
        */
        setLocalMedia(localMedia: fm.icelink.IViewableMedia<T>): boolean;
        /**
        Adds the local view to the layout.
        @param view The local view.
        @return `true` if successful; otherwise, `false`. Check the logs for additional information.
        */
        setLocalView(view: T): boolean;
        /** @hidden */
        private setLocalViewUI;
        /**
        Swaps remote media in the layout.
        @param remoteMediaToRemove The remote media to remove.
        @param remoteMediaToAdd The remote media to add.
        */
        swapRemoteMedia(remoteMediaToRemove: fm.icelink.IViewableMedia<T>, remoteMediaToAdd: fm.icelink.IViewableMedia<T>): boolean;
        /**
        Swaps a remote view in the layout.
        @param idToRemove The remote view ID to remove.
        @param idToAdd The remote view ID to add.
        @param viewToAdd The remote view to add.
        */
        swapRemoteView(idToRemove: string, idToAdd: string, viewToAdd: T): boolean;
        /**
        Swaps remote views in the layout.
        @param idsToRemove The remote view IDs to remove.
        @param idsToAdd The remote view IDs to add.
        @param viewsToAdd The remote views to add.
        @return `true` if successful; otherwise, `false`. Check the logs for additional information.
        */
        swapRemoteViews(idsToRemove: string[], idsToAdd: string[], viewsToAdd: T[]): boolean;
        /**
        Removes the local view from the layout.
        @return `true` if successful; otherwise, `false`. Check the logs for additional information.
        */
        unsetLocalView(): boolean;
        /** @hidden */
        private unsetLocalViewUI;
    }
}
declare namespace fm.icelink {
    class DomLayoutManager extends LayoutManager<HTMLElement> {
        getTypeString(): string;
        getContainer(): HTMLElement;
        constructor(container: HTMLElement, preset?: LayoutPreset);
        protected addView(view: HTMLElement): void;
        protected removeView(view: HTMLElement): void;
        protected dispatchToMainThread(action: IAction2<any, any>, arg1: any, arg2: any): void;
        layout(): void;
    }
}
declare namespace fm.icelink {
    interface IExternalDomVideoSink extends IViewSink<HTMLElement>, IExternal<IInternalDomVideoSink> {
    }
    interface IInternalDomVideoSink extends IViewSink<HTMLElement>, IInternal<IExternalDomVideoSink> {
    }
    class DomVideoSink extends Dynamic implements IExternalDomVideoSink {
        getTypeString(): string;
        getView(): HTMLElement;
        getViewScale(): LayoutScale;
        setViewScale(viewScale: LayoutScale): void;
        getViewMirror(): boolean;
        setViewMirror(viewMirror: boolean): void;
        constructor(track: VideoTrack);
    }
}
declare namespace fm.icelink {
    class Factory {
        getTypeString(): string;
        static createConnection(streams: Stream[]): Connection;
        static createAudioStream(localMedia: LocalMedia): AudioStream;
        static createVideoStream(localMedia: LocalMedia): VideoStream;
        static createDataChannel(label: string): DataChannel;
        static createDataStream(channel: DataChannel): DataStream;
        static createDomVideoSink(track: VideoTrack): DomVideoSink;
        static createLocalMedia(audio: any, video: any, screen?: boolean): LocalMedia;
    }
}
declare namespace fm.icelink {
    interface IExternal<TInternal> {
    }
}
declare namespace fm.icelink {
    interface IInternal<TExternal> {
    }
}
declare namespace fm.icelink {
    interface IExternalMedia extends IMedia<IExternalAudioTrack, IExternalVideoTrack>, IViewSinkableMedia<HTMLElement, IExternalDomVideoSink>, IExternal<IInternalMedia> {
    }
    interface IInternalMedia extends IMedia<IInternalAudioTrack, IInternalVideoTrack>, IViewSinkableMedia<HTMLElement, IInternalDomVideoSink>, IInternal<IExternalMedia> {
    }
    abstract class Media extends Dynamic implements IMedia<AudioTrack, VideoTrack>, IExternalMedia {
        getTypeString(): string;
        addOnAudioDestroyed(value: IAction0): void;
        addOnVideoDestroyed(value: IAction0): void;
        removeOnAudioDestroyed(value: IAction0): void;
        removeOnVideoDestroyed(value: IAction0): void;
        addOnAudioLevel(value: IAction1<number>): void;
        addOnVideoSize(value: IAction1<Size>): void;
        getAudioGain(): number;
        getAudioMuted(): boolean;
        getAudioTrack(): AudioTrack;
        getAudioTracks(): AudioTrack[];
        getAudioVolume(): number;
        getId(): string;
        getVideoMuted(): boolean;
        getVideoSize(): Size;
        getVideoTrack(): VideoTrack;
        getVideoTracks(): VideoTrack[];
        grabVideoFrame(): Future<VideoBuffer>;
        removeOnAudioLevel(value: IAction1<number>): void;
        removeOnVideoSize(value: IAction1<Size>): void;
        setAudioGain(value: number): void;
        setAudioMuted(value: boolean): void;
        setAudioVolume(value: number): void;
        setId(value: string): void;
        setVideoMuted(value: boolean): void;
        destroy(): void;
        getView(): HTMLElement;
        getViewSink(): DomVideoSink;
        private externalsToInternals;
        private externalToInternal;
        private internalsToExternals;
        private internalToExternal;
    }
}
declare namespace fm.icelink {
    interface IExternalLocalMedia extends ILocalMedia<IExternalLocalMedia, IExternalAudioTrack, IExternalVideoTrack>, IViewSinkableMedia<HTMLElement, IExternalDomVideoSink>, IExternal<IInternalLocalMedia> {
    }
    interface IInternalLocalMedia extends ILocalMedia<IInternalLocalMedia, IInternalAudioTrack, IInternalVideoTrack>, IViewSinkableMedia<HTMLElement, IInternalDomVideoSink>, IInternal<IExternalLocalMedia> {
    }
    class LocalMedia extends Media implements ILocalMedia<LocalMedia, AudioTrack, VideoTrack>, IExternalLocalMedia {
        getTypeString(): string;
        private _internal;
        addOnAudioStarted(value: IAction0): void;
        addOnAudioStopped(value: IAction0): void;
        addOnVideoStarted(value: IAction0): void;
        addOnVideoStopped(value: IAction0): void;
        removeOnAudioStarted(value: IAction0): void;
        removeOnAudioStopped(value: IAction0): void;
        removeOnVideoStarted(value: IAction0): void;
        removeOnVideoStopped(value: IAction0): void;
        getAudioEncoding(): AudioEncodingConfig;
        getAudioEncodings(): AudioEncodingConfig[];
        setAudioEncodings(value: AudioEncodingConfig[]): void;
        getVideoEncoding(): VideoEncodingConfig;
        getVideoEncodings(): VideoEncodingConfig[];
        setVideoEncodings(value: VideoEncodingConfig[]): void;
        /**
         * Deprecated: Use fm.icelink.Plugin.getChromeExtensionId()
         */
        static getChromeExtensionId(): string;
        /**
         * Deprecated: Use fm.icelink.Plugin.setChromeExtensionId()
         */
        static setChromeExtensionId(chromeExtensionId: string): void;
        /**
         * Deprecated: Use fm.icelink.Plugin.getChromeExtensionUrl()
         */
        static getChromeExtensionUrl(): string;
        /**
         * Deprecated: Use fm.icelink.Plugin.getChromeExtensionInstalled()
         */
        static getChromeExtensionInstalled(): boolean;
        /**
         * Deprecated: Use fm.icelink.Plugin.getChromeExtensionRequiresUserGesture()
         */
        static getChromeExtensionRequiresUserGesture(): boolean;
        /**
         * Deprecated: Use fm.icelink.Plugin.setChromeExtensionRequiresUserGesture()
         */
        static setChromeExtensionRequiresUserGesture(chromeExtensionRequiresUserGesture: boolean): void;
        constructor(audio: any, video: any, screen?: boolean);
        changeAudioSourceInput(audioSourceInput: SourceInput): Future<Object>;
        changeVideoSourceInput(videoSourceInput: SourceInput): Future<Object>;
        getAudioSourceInput(): SourceInput;
        getAudioSourceInputs(): Future<SourceInput[]>;
        getVideoSourceInput(): SourceInput;
        getVideoSourceInputs(): Future<SourceInput[]>;
        setAudioSourceInput(value: SourceInput): void;
        setVideoSourceInput(value: SourceInput): void;
        start(): Future<LocalMedia>;
        stop(): Future<LocalMedia>;
        changeAudioInput(audioInput: SourceInput): Future<Object>;
        changeVideoInput(videoInput: SourceInput): Future<Object>;
        getAudioInput(): SourceInput;
        getAudioInputs(): Future<SourceInput[]>;
        getVideoInput(): SourceInput;
        getVideoInputs(): Future<SourceInput[]>;
        setAudioInput(audioInput: SourceInput): void;
        setVideoInput(videoInput: SourceInput): void;
        getState(): LocalMediaState;
    }
}
declare namespace fm.icelink {
    class LocalNetwork {
        getTypeString(): string;
        static getAddressType(ipAddress: string): AddressType;
    }
}
declare namespace fm.icelink {
    /** @hidden */
    abstract class MediaDescriptionManagerBase {
        getTypeString(): string;
        /** @hidden */
        private _mediaStreamIdentifier;
        constructor();
        static syncroniseMediaIdentification(sdpMediaDescription: fm.icelink.sdp.MediaDescription, index: number): string;
        getMediaStreamIdentifier(): string;
        processSdpMediaDescription(mediaRequirements: fm.icelink.MediaDescriptionRequirementsBase, sdpMessage: fm.icelink.sdp.Message, index: number, isLocalDescription: boolean, isRenegotiation: boolean, isOffer: boolean): fm.icelink.Error;
        setMediaStreamIdentifier(value: string): void;
    }
}
declare namespace fm.icelink {
    /**
    @hidden
    */
    class MediaDescriptionManager extends MediaDescriptionManagerBase {
        getTypeString(): string;
        constructor();
        processSdpMediaDescription(mediaRequirements: fm.icelink.MediaDescriptionRequirementsBase, sdpMessage: fm.icelink.sdp.Message, index: number, isLocalDescription: boolean, isRenegotiation: boolean, isOffer: boolean): fm.icelink.Error;
    }
}
declare namespace fm.icelink {
    /** @hidden */
    abstract class MediaDescriptionRequirementsBase {
        getTypeString(): string;
        /** @hidden */
        private _mediaStreamIdentifier;
        constructor();
        getMediaStreamIdentifier(): string;
        setMediaStreamIdentifier(value: string): void;
    }
}
declare namespace fm.icelink {
}
declare namespace fm.icelink {
    class PluginConstants {
        static getLoaderClassId(): string;
        static getDomVideoSinkClassId(): string;
    }
}
declare namespace fm.icelink {
    class Plugin {
        static install(pluginConfig: PluginConfig): Future<Object>;
        static getPluginConfig(): PluginConfig;
        static hasRtcPeerConnection(): boolean;
        static hasRtcDataChannel(): boolean;
        static hasGetUserMedia(): boolean;
        static hasRtcIceGatherer(): boolean;
        static hasRtcIceTransport(): boolean;
        static hasRtcDtlsTransport(): boolean;
        static hasRtcRtpSender(): boolean;
        static hasRtcRtpReceiver(): boolean;
        static hasWebRtc(localMedia?: boolean, dataChannels?: boolean): boolean;
        static hasOrtc(localMedia?: boolean, dataChannels?: boolean): boolean;
        static hasNative(localMedia?: boolean, dataChannels?: boolean): boolean;
        static hasActiveX(): boolean;
        static isReady(localMedia?: boolean, dataChannels?: boolean): boolean;
        static isSupported(localMedia?: boolean, dataChannels?: boolean): boolean;
        static useActiveX(localMedia?: boolean, dataChannels?: boolean): boolean;
        static useNative(localMedia?: boolean, dataChannels?: boolean): boolean;
        private static checkForActiveX;
        static getChromeExtensionId(): string;
        static setChromeExtensionId(chromeExtensionId: string): void;
        static getChromeExtensionUrl(): string;
        static getChromeExtensionInstalled(): boolean;
        static getChromeExtensionRequiresUserGesture(): boolean;
        static setChromeExtensionRequiresUserGesture(chromeExtensionRequiresUserGesture: boolean): void;
        static getChromeExtensionRequired(): boolean;
    }
}
declare namespace fm.icelink {
    abstract class PluginStream extends Dynamic implements IStream, IInternalStream {
        getTypeString(): string;
        abstract getState(): StreamState;
        abstract addOnStateChange(value: IAction0): void;
        abstract removeOnStateChange(value: IAction0): void;
        abstract getLocalReceive(): boolean;
        abstract setLocalReceive(localReceiveEnabled: boolean): void;
        abstract getLocalSend(): boolean;
        abstract setLocalSend(localSendEnabled: boolean): void;
        abstract getRemoteSend(): boolean;
        abstract getRemoteReceive(): boolean;
        abstract getRemoteDirection(): StreamDirection;
        abstract getHandle(): number;
        abstract addOnDirectionChange(value: IAction0): void;
        abstract removeOnDirectionChange(value: IAction0): void;
        abstract changeDirection(newDirection: StreamDirection): Error;
        abstract getDirection(): StreamDirection;
        abstract getId(): string;
        abstract getExternalId(): string;
        abstract setExternalId(value: string): void;
        abstract getLabel(): string;
        abstract getLocalDirection(): StreamDirection;
        abstract getTag(): string;
        abstract getType(): StreamType;
        abstract setLocalDirection(value: StreamDirection): void;
        abstract setTag(value: string): void;
        abstract getTransportInfo(): TransportInfo;
    }
}
declare namespace fm.icelink {
    abstract class PluginMediaStream<TTrack extends PluginMediaTrack> extends PluginStream implements IMediaStream, IInternalMediaStream {
        getTypeString(): string;
        getLocalTrack(): TTrack;
        getRemoteTrack(): TTrack;
        abstract getLocalBandwidth(): number;
        abstract setLocalBandwidth(value: number): void;
        abstract getInputMuted(): boolean;
        abstract getOutputMuted(): boolean;
        abstract getRemoteBandwidth(): number;
        abstract setInputMuted(muted: boolean): void;
        abstract setOutputMuted(muted: boolean): void;
        abstract getPreferredCodecs(): string[];
        abstract setPreferredCodecs(names: string[]): void;
        abstract getCodecDisabled(name: string): boolean;
        abstract setCodecDisabled(name: string, disabled: boolean): void;
        abstract getRemoteEncoding(): EncodingInfo;
        abstract setRemoteEncoding(value: EncodingInfo): void;
        abstract getSimulcastMode(): SimulcastMode;
        abstract setSimulcastMode(value: SimulcastMode): void;
        abstract getLocalCanonicalName(): string;
        abstract getRemoteCanonicalName(): string;
        abstract getInfo(): MediaStreamInfo;
        abstract getControlTransportInfo(): TransportInfo;
        abstract addOnLocalEncodingDisabled(value: IAction1<EncodingInfo>): void;
        abstract addOnLocalEncodingEnabled(value: IAction1<EncodingInfo>): void;
        abstract removeOnLocalEncodingDisabled(value: IAction1<EncodingInfo>): void;
        abstract removeOnLocalEncodingEnabled(value: IAction1<EncodingInfo>): void;
        constructor(localTrack: TTrack, remoteTrack: TTrack);
    }
}
declare namespace fm.icelink {
    /**
    An interface for COM usage.
    */
    interface IPluginAudioStream {
        ChangeDirection(newDirection: number): string;
        GetCodecDisabled(name: string): boolean;
        GetControlTransportInfo(): string;
        GetDirection(): number;
        GetExternalId(): string;
        GetG722Disabled(): boolean;
        GetHandle(): number;
        GetId(): string;
        GetInfo(): string;
        GetInputMuted(): boolean;
        GetLabel(): string;
        GetLocalBandwidth(): number;
        GetLocalCanonicalName(): string;
        GetLocalDirection(): number;
        GetLocalReceive(): boolean;
        GetLocalSend(): boolean;
        GetOpusDisabled(): boolean;
        GetOutputMuted(): boolean;
        GetPcmaDisabled(): boolean;
        GetPcmuDisabled(): boolean;
        GetPreferredCodecs(): string[];
        GetRemoteBandwidth(): number;
        GetRemoteCanonicalName(): string;
        GetRemoteDirection(): number;
        GetRemoteEncoding(): string;
        GetRemoteReceive(): boolean;
        GetRemoteSend(): boolean;
        GetSimulcastMode(): number;
        GetTag(): string;
        GetTransportInfo(): string;
        Initialize(localMediaHandle: number, remoteMediaHandle: number): void;
        InsertDtmfTone(dtmfToneJson: string): boolean;
        InsertDtmfTones(dtmfTonesJson: string): boolean;
        SetCodecDisabled(name: string, disabled: boolean): void;
        SetExternalId(externalId: string): void;
        SetG722Disabled(disabled: boolean): void;
        SetInputMuted(muted: boolean): void;
        SetLocalBandwidth(bandwidth: number): void;
        SetLocalDirection(direction: number): void;
        SetLocalReceive(localReceiveEnabled: boolean): void;
        SetLocalSend(localSendEnabled: boolean): void;
        SetOnDirectionChange(callback: Object): void;
        SetOnLocalEncodingDisabled(callback: Object): void;
        SetOnLocalEncodingEnabled(callback: Object): void;
        SetOnReceiveDtmfTone(callback: Object): void;
        SetOnReceiveDtmfToneChange(callback: Object): void;
        SetOnSendDtmfTone(callback: Object): void;
        SetOnSendDtmfToneChange(callback: Object): void;
        SetOnStateChange(callback: Object): void;
        SetOpusDisabled(disabled: boolean): void;
        SetOutputMuted(muted: boolean): void;
        SetPcmaDisabled(disabled: boolean): void;
        SetPcmuDisabled(disabled: boolean): void;
        SetPreferredCodecs(names: string[]): void;
        SetRemoteEncoding(remoteEncodingJson: string): void;
        SetSimulcastMode(simulcastMode: number): void;
        SetTag(tag: string): void;
    }
}
declare namespace fm.icelink.dtmf {
    /**
    A DTMF (telephone-event) tone.
    */
    class Tone {
        getTypeString(): string;
        /** @hidden */
        private _duration;
        /** @hidden */
        private _remainingDuration;
        /** @hidden */
        private _timestamp;
        /** @hidden */
        private _value;
        private fmicelinkdtmfToneInit;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.dtmf.tone]] class.
        @param value The value.
        */
        constructor(value: string);
        /**
        Initializes a new instance of the [[fm.icelink.dtmf.tone]] class.
        @param value The value.
        @param duration The duration.
        */
        constructor(value: string, duration: number);
        /** @hidden */
        private static eventCodeFromValue;
        /**
        Deserializes from JSON.
        @param toneJson The JSON.
        */
        static fromJson(toneJson: string): fm.icelink.dtmf.Tone;
        /**
        Deserializes an array from JSON.
        @param tonesJson The JSON.
        */
        static fromJsonArray(tonesJson: string): fm.icelink.dtmf.Tone[];
        /**
        Converts a DTMF tone string into an array of tones. Each tone will have a duration of 100ms and an inter-tone gap of 100ms.
        @param toneString The tone string.
        */
        static fromToneString(toneString: string): fm.icelink.dtmf.Tone[];
        /**
        Converts a DTMF tone string into an array of tones. Each tone will have an inter-tone gap of 100ms.
        @param toneString The tone string.
        @param duration The duration, in milliseconds (minimum of 40, maximum of 2,000).
        */
        static fromToneString(toneString: string, duration: number): fm.icelink.dtmf.Tone[];
        /**
        Converts a DTMF tone string into an array of tones.
        @param toneString The tone string.
        @param duration The duration, in milliseconds (minimum of 40, maximum of 2,000).
        @param interToneGap The time between tones, in milliseconds (minimum of 40).
        */
        static fromToneString(toneString: string, duration: number, interToneGap: number): fm.icelink.dtmf.Tone[];
        /**
        Gets A tone.
        */
        static getA(): fm.icelink.dtmf.Tone;
        /**
        Gets the A value ("A").
        */
        static getAValue(): string;
        /**
        Gets the B tone.
        */
        static getB(): fm.icelink.dtmf.Tone;
        /**
        Gets the B value ("B").
        */
        static getBValue(): string;
        /**
        Gets the C tone.
        */
        static getC(): fm.icelink.dtmf.Tone;
        /**
        Gets the C value ("C").
        */
        static getCValue(): string;
        /**
        Gets the D tone.
        */
        static getD(): fm.icelink.dtmf.Tone;
        /**
        Gets the D value ("D").
        */
        static getDValue(): string;
        /**
        Gets the eight tone.
        */
        static getEight(): fm.icelink.dtmf.Tone;
        /**
        Gets the eight value ("8").
        */
        static getEightValue(): string;
        /**
        Gets the empty tone.
        */
        static getEmpty(): fm.icelink.dtmf.Tone;
        /**
        Gets the empty value ("").
        */
        static getEmptyValue(): string;
        /**
        Gets the five tone.
        */
        static getFive(): fm.icelink.dtmf.Tone;
        /**
        Gets the five value ("5").
        */
        static getFiveValue(): string;
        /**
        Gets the four tone.
        */
        static getFour(): fm.icelink.dtmf.Tone;
        /**
        Gets the four value ("4").
        */
        static getFourValue(): string;
        /**
        Gets the hash tone.
        */
        static getHash(): fm.icelink.dtmf.Tone;
        /**
        Gets the hash value ("#").
        */
        static getHashValue(): string;
        /**
        Gets the nine tone.
        */
        static getNine(): fm.icelink.dtmf.Tone;
        /**
        Gets the nine value ("9").
        */
        static getNineValue(): string;
        /**
        Gets the one tone.
        */
        static getOne(): fm.icelink.dtmf.Tone;
        /**
        Gets the one value ("1").
        */
        static getOneValue(): string;
        /**
        Gets the pause tone.
        */
        static getPause(): fm.icelink.dtmf.Tone;
        /**
        Gets the pause duration in milliseconds (2000).
        */
        static getPauseDuration(): number;
        /**
        Gets the pause value (",").
        */
        static getPauseValue(): string;
        /**
        Gets the seven tone.
        */
        static getSeven(): fm.icelink.dtmf.Tone;
        /**
        Gets the seven value ("7").
        */
        static getSevenValue(): string;
        /**
        Gets the six tone.
        */
        static getSix(): fm.icelink.dtmf.Tone;
        /**
        Gets the six value ("6").
        */
        static getSixValue(): string;
        /**
        Gets the star tone.
        */
        static getStar(): fm.icelink.dtmf.Tone;
        /**
        Gets the star value ("*").
        */
        static getStarValue(): string;
        /**
        Gets the three tone.
        */
        static getThree(): fm.icelink.dtmf.Tone;
        /**
        Gets the three value ("3").
        */
        static getThreeValue(): string;
        /**
        Gets the two tone.
        */
        static getTwo(): fm.icelink.dtmf.Tone;
        /**
        Gets the two value ("2").
        */
        static getTwoValue(): string;
        /**
        Gets the zero tone.
        */
        static getZero(): fm.icelink.dtmf.Tone;
        /**
        Gets the zero value ("0").
        */
        static getZeroValue(): string;
        /**
        Serializes to JSON.
        */
        static toJson(tone: fm.icelink.dtmf.Tone): string;
        /**
        Serializes an array to JSON.
        @param tones The array.
        */
        static toJsonArray(tones: fm.icelink.dtmf.Tone[]): string;
        /**
        Converts an array of DTMF tones into a tone string. This discards duration and inter-tone gap data.
        @param tones The tones.
        */
        static toToneString(tones: fm.icelink.dtmf.Tone[]): string;
        /** @hidden */
        private static valueFromEventCode;
        /**
        Clones this instance.
        */
        clone(): fm.icelink.dtmf.Tone;
        /**
        Clones this instance.
        @param duration The new duration.
        */
        clone(duration: number): fm.icelink.dtmf.Tone;
        /**
        Gets the duration in milliseconds.
        */
        getDuration(): number;
        /** @hidden */
        getRemainingDuration(): number;
        /** @hidden */
        getTimestamp(): number;
        /**
        Gets the value.
        */
        getValue(): string;
        /** @hidden */
        setDuration(value: number): void;
        /** @hidden */
        setRemainingDuration(value: number): void;
        /** @hidden */
        setTimestamp(value: number): void;
        /** @hidden */
        private setValue;
        /**
        Serializes to JSON.
        */
        toJson(): string;
        /**
        Serializes to a string.
        */
        toString(): string;
    }
}
declare namespace fm.icelink {
    class PluginAudioStream extends PluginMediaStream<PluginAudioTrack> implements IAudioStream, IInternalAudioStream {
        getTypeString(): string;
        private _state;
        constructor(external: IExternalAudioStream, localTrack: PluginAudioTrack, remoteTrack: PluginAudioTrack);
        getState(): StreamState;
        addOnStateChange(value: IAction0): void;
        removeOnStateChange(value: IAction0): void;
        getInfo(): MediaStreamInfo;
        getLocalReceive(): boolean;
        getLocalSend(): boolean;
        getRemoteReceive(): boolean;
        getRemoteSend(): boolean;
        setLocalReceive(value: boolean): void;
        setLocalSend(value: boolean): void;
        getRemoteDirection(): StreamDirection;
        getHandle(): number;
        changeDirection(newDirection: StreamDirection): Error;
        getDirection(): StreamDirection;
        getId(): string;
        getExternalId(): string;
        setExternalId(value: string): void;
        getLabel(): string;
        getLocalBandwidth(): number;
        getLocalDirection(): StreamDirection;
        getInputMuted(): boolean;
        getLocalCanonicalName(): string;
        getRemoteCanonicalName(): string;
        getOutputMuted(): boolean;
        getRemoteBandwidth(): number;
        getTag(): string;
        getType(): StreamType;
        setLocalDirection(value: StreamDirection): void;
        setLocalBandwidth(value: number): void;
        setInputMuted(value: boolean): void;
        setOutputMuted(value: boolean): void;
        setTag(value: string): void;
        addOnDirectionChange(value: IAction0): void;
        removeOnDirectionChange(value: IAction0): void;
        addOnReceiveDtmfTone(value: IAction1<dtmf.Tone>): void;
        addOnReceiveDtmfToneChange(value: IAction1<dtmf.Tone>): void;
        addOnSendDtmfTone(value: IAction1<dtmf.Tone>): void;
        addOnSendDtmfToneChange(value: IAction1<dtmf.Tone>): void;
        insertDtmfTone(dtmfTone: dtmf.Tone): boolean;
        insertDtmfTones(dtmfTones: dtmf.Tone[]): boolean;
        removeOnReceiveDtmfTone(value: IAction1<dtmf.Tone>): void;
        removeOnReceiveDtmfToneChange(value: IAction1<dtmf.Tone>): void;
        removeOnSendDtmfTone(value: IAction1<dtmf.Tone>): void;
        removeOnSendDtmfToneChange(value: IAction1<dtmf.Tone>): void;
        getPreferredCodecs(): string[];
        setPreferredCodecs(names: string[]): void;
        getCodecDisabled(name: string): boolean;
        setCodecDisabled(name: string, disabled: boolean): void;
        getOpusDisabled(): boolean;
        getG722Disabled(): boolean;
        getPcmuDisabled(): boolean;
        getPcmaDisabled(): boolean;
        setOpusDisabled(value: boolean): void;
        setG722Disabled(value: boolean): void;
        setPcmuDisabled(value: boolean): void;
        setPcmaDisabled(value: boolean): void;
        getRemoteEncoding(): EncodingInfo;
        setRemoteEncoding(value: EncodingInfo): void;
        getSimulcastMode(): SimulcastMode;
        setSimulcastMode(value: SimulcastMode): void;
        getTransportInfo(): TransportInfo;
        getControlTransportInfo(): TransportInfo;
        addOnLocalEncodingDisabled(value: IAction1<EncodingInfo>): void;
        addOnLocalEncodingEnabled(value: IAction1<EncodingInfo>): void;
        removeOnLocalEncodingDisabled(value: IAction1<EncodingInfo>): void;
        removeOnLocalEncodingEnabled(value: IAction1<EncodingInfo>): void;
    }
}
declare namespace fm.icelink {
    abstract class PluginMediaTrack extends Dynamic implements IMediaTrack, IInternalMediaTrack {
        getTypeString(): string;
        getMedia(): PluginMedia;
        constructor(media: PluginMedia);
        abstract changeSinkOutput(sinkOutput: SinkOutput): Future<Object>;
        abstract changeSourceInput(sourceInput: SourceInput): Future<Object>;
        destroy(): boolean;
        abstract addOnStarted(value: IAction0): void;
        abstract addOnStopped(value: IAction0): void;
        abstract addOnDestroyed(value: IAction0): void;
        abstract removeOnStarted(value: IAction0): void;
        abstract removeOnStopped(value: IAction0): void;
        abstract removeOnDestroyed(value: IAction0): void;
        abstract getMuted(): boolean;
        abstract getSinkOutput(): SinkOutput;
        abstract getSinkOutputs(): Future<SinkOutput[]>;
        abstract getSourceInput(): SourceInput;
        abstract getSourceInputs(): Future<SourceInput[]>;
        abstract setMuted(value: boolean): void;
        abstract setSinkOutput(value: SinkOutput): void;
        abstract setSourceInput(value: SourceInput): void;
    }
}
declare namespace fm.icelink {
    class PluginAudioTrack extends PluginMediaTrack implements IAudioTrack, IInternalAudioTrack {
        getTypeString(): string;
        constructor(external: IExternalAudioTrack, media: PluginMedia);
        private isLocal;
        addOnStarted(value: IAction0): void;
        addOnStopped(value: IAction0): void;
        addOnDestroyed(value: IAction0): void;
        removeOnStarted(value: IAction0): void;
        removeOnStopped(value: IAction0): void;
        removeOnDestroyed(value: IAction0): void;
        changeSinkOutput(sinkOutput: SinkOutput): Future<Object>;
        getSinkOutput(): SinkOutput;
        getSinkOutputs(): Future<SinkOutput[]>;
        setSinkOutput(value: SinkOutput): void;
        changeSourceInput(sourceInput: SourceInput): Future<Object>;
        getSourceInput(): SourceInput;
        getSourceInputs(): Future<SourceInput[]>;
        setSourceInput(value: SourceInput): void;
        addOnLevel(value: IAction1<number>): void;
        getGain(): number;
        getMuted(): boolean;
        getVolume(): number;
        removeOnLevel(value: IAction1<number>): void;
        setGain(value: number): void;
        setMuted(value: boolean): void;
        setVolume(value: number): void;
    }
}
declare namespace fm.icelink {
    class PluginConfig {
        private _activeXPath;
        private _activeXTimeout;
        private _preferActiveX;
        getActiveXPath(): string;
        setActiveXPath(activeXPath: string): void;
        getActiveXTimeout(): number;
        setActiveXTimeout(activeXTimeout: number): void;
        getPreferActiveX(): boolean;
        setPreferActiveX(preferActiveX: boolean): void;
    }
}
declare namespace fm.icelink {
    /**
    An interface for COM usage.
    */
    interface IPluginConnection {
        AddIceServer(iceServer: string): void;
        AddIceServers(iceServers: string): void;
        AddRemoteCandidate(remoteCandidate: string, promise: Object): void;
        Close(): boolean;
        CreateAnswer(promise: Object): void;
        CreateOffer(promise: Object): void;
        GetBundlePolicy(): number;
        GetCanonicalName(): string;
        GetDeadStreamTimeout(): number;
        GetError(): string;
        GetExternalId(): string;
        GetHandle(): number;
        GetIceGatherPolicy(): number;
        GetIceServer(): string;
        GetIceServers(): string;
        GetId(): string;
        GetLegacyTimeout(): boolean;
        GetLocalDescription(): string;
        GetRemoteDescription(): string;
        GetStats(promise: Object): void;
        GetTieBreaker(): string;
        GetTimeout(): number;
        GetTrickleIcePolicy(): number;
        Initialize(streamPtrs: Object): void;
        RemoveIceServer(iceServer: string): void;
        RemoveIceServers(iceServers: string): void;
        SetBundlePolicy(bundlePolicy: number): void;
        SetDeadStreamTimeout(deadStreamTimeout: number): void;
        SetError(errorJson: string): void;
        SetExternalId(externalId: string): void;
        SetIceGatherPolicy(iceGatherPolicy: number): void;
        SetIceServer(iceServer: string): void;
        SetIceServers(iceServers: string): void;
        SetLegacyTimeout(value: boolean): void;
        SetLocalDescription(localDescription: string, promise: Object): void;
        SetOnExternalIdChange(callback: Object): void;
        SetOnGatheringStateChange(callback: Object): void;
        SetOnIceConnectionStateChange(callback: Object): void;
        SetOnLocalCandidate(callback: Object): void;
        SetOnLocalDescription(callback: Object): void;
        SetOnRemoteCandidate(callback: Object): void;
        SetOnRemoteDescription(callback: Object): void;
        SetOnSignallingStateChange(callback: Object): void;
        SetOnStateChange(callback: Object): void;
        SetRemoteDescription(remoteDescription: string, promise: Object): void;
        SetTieBreaker(tieBreaker: string): void;
        SetTimeout(timeout: number): void;
        SetTrickleIcePolicy(trickleIcePolicy: number): void;
    }
}
declare namespace fm.icelink {
    class PluginConnection extends Dynamic implements IConnection<PluginConnection, PluginStream, PluginAudioStream, PluginVideoStream, PluginDataStream>, IInternalConnection {
        getTypeString(): string;
        private _gatheringState;
        private _iceConnectionState;
        private _signallingState;
        private _state;
        constructor(external: IExternalConnection, streams: PluginStream[]);
        addIceServer(iceServer: IceServer): void;
        addIceServers(iceServers: IceServer[]): void;
        addOnLocalCandidate(value: IAction2<PluginConnection, Candidate>): void;
        addOnExternalIdChange(value: IAction2<string, string>): void;
        addOnIceConnectionStateChange(value: IAction1<PluginConnection>): void;
        addOnGatheringStateChange(value: IAction1<PluginConnection>): void;
        addOnLocalDescription(value: IAction2<PluginConnection, SessionDescription>): void;
        addOnRemoteCandidate(value: IAction2<PluginConnection, Candidate>): void;
        addOnRemoteDescription(value: IAction2<PluginConnection, SessionDescription>): void;
        addOnSignallingStateChange(value: IAction1<PluginConnection>): void;
        addOnStateChange(value: IAction1<PluginConnection>): void;
        addRemoteCandidate(remoteCandidate: Candidate): Future<Candidate>;
        close(): boolean;
        createAnswer(): Future<SessionDescription>;
        createOffer(): Future<SessionDescription>;
        getHasAudio(): boolean;
        getHasVideo(): boolean;
        getHasData(): boolean;
        getAudioStream(): PluginAudioStream;
        getAudioStreams(): PluginAudioStream[];
        getVideoStream(): PluginVideoStream;
        getVideoStreams(): PluginVideoStream[];
        getDataStream(): PluginDataStream;
        getDataStreams(): PluginDataStream[];
        getDeadStreamTimeout(): number;
        getExternalId(): string;
        getError(): Error;
        getIceGatherPolicy(): IceGatherPolicy;
        getBundlePolicy(): BundlePolicy;
        getIceServer(): IceServer;
        getIceServers(): IceServer[];
        getId(): string;
        getCanonicalName(): string;
        getLocalDescription(): SessionDescription;
        getRemoteDescription(): SessionDescription;
        getSignallingState(): SignallingState;
        getState(): ConnectionState;
        getStats(): Future<ConnectionStats>;
        getStreams(): PluginStream[];
        getTieBreaker(): string;
        getTimeout(): number;
        getLegacyTimeout(): boolean;
        getTrickleIcePolicy(): TrickleIcePolicy;
        getIceConnectionState(): IceConnectionState;
        getGatheringState(): IceGatheringState;
        removeIceServer(iceServer: IceServer): void;
        removeIceServers(iceServers: IceServer[]): void;
        removeOnLocalCandidate(value: IAction2<PluginConnection, Candidate>): void;
        removeOnIceConnectionStateChange(value: IAction1<PluginConnection>): void;
        removeOnExternalIdChange(value: IAction2<string, string>): void;
        removeOnGatheringStateChange(value: IAction1<PluginConnection>): void;
        removeOnLocalDescription(value: IAction2<PluginConnection, SessionDescription>): void;
        removeOnRemoteCandidate(value: IAction2<PluginConnection, Candidate>): void;
        removeOnRemoteDescription(value: IAction2<PluginConnection, SessionDescription>): void;
        removeOnSignallingStateChange(value: IAction1<PluginConnection>): void;
        removeOnStateChange(value: IAction1<PluginConnection>): void;
        setDeadStreamTimeout(value: number): void;
        setExternalId(value: string): void;
        setError(value: Error): void;
        setIceGatherPolicy(value: IceGatherPolicy): void;
        setBundlePolicy(value: BundlePolicy): void;
        setIceServer(value: IceServer): void;
        setIceServers(value: IceServer[]): void;
        setLegacyTimeout(value: boolean): void;
        setTieBreaker(value: string): void;
        setLocalDescription(localDescription: SessionDescription): Future<SessionDescription>;
        setRemoteDescription(remoteDescription: SessionDescription): Future<SessionDescription>;
        setTimeout(value: number): void;
        setTrickleIcePolicy(value: TrickleIcePolicy): void;
    }
}
declare namespace fm.icelink {
    /**
    An interface for COM usage.
    */
    interface IPluginDataChannel {
        GetHandle(): number;
        GetId(): string;
        GetInfo(): string;
        GetLabel(): string;
        GetOrdered(): boolean;
        GetSubprotocol(): string;
        Initialize(label: string, ordered: boolean, subprotocol: string): void;
        PrepareAndSendBytes(data: string, promise: Object): void;
        PrepareAndSendString(dataString: string, promise: Object): void;
        SetOnReceive(callback: Object): void;
        SetOnStateChange(callback: Object): void;
    }
}
declare namespace fm.icelink {
    class PluginDataChannel extends Dynamic implements IDataChannel<PluginDataChannel>, IInternalDataChannel {
        getTypeString(): string;
        getHandle(): number;
        private _state;
        constructor(external: IExternalDataChannel, label: string, ordered?: boolean, subprotocol?: string);
        private _getRemoteConnectionInfo;
        setGetRemoteConnectionInfo(value: IFunction1<string, any>): void;
        getInfo(): DataChannelInfo;
        addOnStateChange(value: IAction1<PluginDataChannel>): void;
        getLabel(): string;
        getOnReceive(): IAction1<DataChannelReceiveArgs>;
        getOrdered(): boolean;
        getId(): string;
        getState(): DataChannelState;
        getSubprotocol(): string;
        removeOnStateChange(value: IAction1<PluginDataChannel>): void;
        sendDataBytes(dataBytes: DataBuffer): fm.icelink.Future<Object>;
        sendDataString(dataString: string): fm.icelink.Future<Object>;
        setOnReceive(value: IAction1<DataChannelReceiveArgs>): void;
    }
}
declare namespace fm.icelink {
    /**
    An interface for COM usage.
    */
    interface IPluginDataStream {
        ChangeDirection(newDirection: number): string;
        GetDirection(): number;
        GetExternalId(): string;
        GetHandle(): number;
        GetId(): string;
        GetInfo(): string;
        GetLabel(): string;
        GetLocalDirection(): number;
        GetLocalReceive(): boolean;
        GetLocalSend(): boolean;
        GetRemoteDirection(): number;
        GetRemoteReceive(): boolean;
        GetRemoteSend(): boolean;
        GetTag(): string;
        GetTransportInfo(): string;
        Initialize(channelHandles: Object): void;
        SetExternalId(externalId: string): void;
        SetLocalDirection(direction: number): void;
        SetLocalReceive(localReceiveEnabled: boolean): void;
        SetLocalSend(localSendEnabled: boolean): void;
        SetOnDirectionChange(callback: Object): void;
        SetOnStateChange(callback: Object): void;
        SetTag(tag: string): void;
    }
}
declare namespace fm.icelink {
    class PluginDataStream extends PluginStream implements IDataStream<PluginDataChannel>, IInternalDataStream {
        getTypeString(): string;
        private _state;
        constructor(external: IExternalDataStream, channels: PluginDataChannel[]);
        getState(): StreamState;
        addOnStateChange(value: IAction0): void;
        removeOnStateChange(value: IAction0): void;
        getInfo(): DataStreamInfo;
        getLocalReceive(): boolean;
        getLocalSend(): boolean;
        getRemoteReceive(): boolean;
        getRemoteSend(): boolean;
        setLocalReceive(value: boolean): void;
        setLocalSend(value: boolean): void;
        getRemoteDirection(): StreamDirection;
        getHandle(): number;
        changeDirection(newDirection: StreamDirection): Error;
        getDirection(): StreamDirection;
        getId(): string;
        getExternalId(): string;
        setExternalId(value: string): void;
        getLabel(): string;
        getLocalDirection(): StreamDirection;
        getTag(): string;
        getType(): StreamType;
        setLocalDirection(value: StreamDirection): void;
        setTag(value: string): void;
        addOnDirectionChange(callback: Object): void;
        removeOnDirectionChange(callback: Object): void;
        getChannels(): PluginDataChannel[];
        getTransportInfo(): TransportInfo;
    }
}
declare namespace fm.icelink {
    class PluginDomAudioSink extends Dynamic implements /*ISoundSink<HTMLElement>,*/ IInternal<DomAudioSink> {
        getTypeString(): string;
        getTrack(): PluginAudioTrack;
        getLocal(): boolean;
        constructor(external: DomAudioSink, track: PluginAudioTrack);
        setTrack(track: PluginAudioTrack): boolean;
    }
}
declare namespace fm.icelink {
    class PluginDomVideoSink extends Dynamic implements IInternalDomVideoSink {
        getTypeString(): string;
        getTrack(): PluginVideoTrack;
        getLocal(): boolean;
        getView(): HTMLElement;
        getViewScale(): LayoutScale;
        setViewScale(viewScale: LayoutScale): void;
        getVideoWidth(): number;
        getVideoHeight(): number;
        getViewMirror(): boolean;
        setViewMirror(viewMirror: boolean): void;
        constructor(external: IExternalDomVideoSink, track: PluginVideoTrack);
        setTrack(track: PluginVideoTrack): boolean;
        private checkifLoaded;
    }
}
declare namespace fm.icelink {
    abstract class PluginMedia extends Dynamic implements IMedia<PluginAudioTrack, PluginVideoTrack>, IInternalMedia {
        getTypeString(): string;
        getHandle(): number;
        abstract addOnAudioDestroyed(value: IAction0): void;
        abstract addOnVideoDestroyed(value: IAction0): void;
        abstract removeOnAudioDestroyed(value: IAction0): void;
        abstract removeOnVideoDestroyed(value: IAction0): void;
        destroy(): void;
        addOnAudioLevel(value: IAction1<number>): void;
        addOnVideoSize(value: IAction1<Size>): void;
        getAudioGain(): number;
        getAudioMuted(): boolean;
        getAudioTrack(): PluginAudioTrack;
        getAudioTracks(): PluginAudioTrack[];
        getAudioVolume(): number;
        getId(): string;
        getVideoMuted(): boolean;
        getVideoSize(): Size;
        getVideoTrack(): PluginVideoTrack;
        getVideoTracks(): PluginVideoTrack[];
        grabVideoFrame(): Future<VideoBuffer>;
        removeOnAudioLevel(value: IAction1<number>): void;
        removeOnVideoSize(value: IAction1<Size>): void;
        setAudioGain(value: number): void;
        setAudioMuted(value: boolean): void;
        setAudioVolume(value: number): void;
        setId(value: string): void;
        setVideoMuted(value: boolean): void;
        getView(): HTMLElement;
        getViewSink(): PluginDomVideoSink;
        protected _videoSink: PluginDomVideoSink;
        constructor(external: IExternalMedia);
    }
}
declare namespace fm.icelink {
    /**
    An interface for COM usage.
    */
    interface IPluginLocalMedia {
        AttachView(viewHandle: number): void;
        ChangeAudioSourceInput(promise: Object, audioSourceInput: string): void;
        ChangeVideoSourceInput(promise: Object, videoSourceInput: string): void;
        Destroy(): void;
        GetAudioEncoding(): string;
        GetAudioEncodings(): string;
        GetAudioGain(): number;
        GetAudioMuted(): boolean;
        GetAudioSourceInput(): string;
        GetAudioSourceInputs(promise: Object): void;
        GetAudioVolume(): number;
        GetHandle(): number;
        GetId(): string;
        GetState(): number;
        GetVideoEncoding(): string;
        GetVideoEncodings(): string;
        GetVideoMuted(): boolean;
        GetVideoSize(): string;
        GetVideoSourceInput(): string;
        GetVideoSourceInputs(promise: Object): void;
        GrabVideoFrame(promise: Object): void;
        Initialize(disableAudio: boolean, disableVideo: boolean, isScreenShare: boolean): void;
        SetAudioEncodings(valueJson: string): void;
        SetAudioGain(gain: number): void;
        SetAudioMuted(muted: boolean): void;
        SetAudioSourceInput(value: string): void;
        SetAudioVolume(volume: number): void;
        SetId(idValue: string): void;
        SetOnAudioDestroyed(callback: Object): void;
        SetOnAudioLevel(callback: Object): void;
        SetOnAudioStarted(callback: Object): void;
        SetOnAudioStopped(callback: Object): void;
        SetOnVideoDestroyed(callback: Object): void;
        SetOnVideoSize(callback: Object): void;
        SetOnVideoStarted(callback: Object): void;
        SetOnVideoStopped(callback: Object): void;
        SetVideoEncodings(valueJson: string): void;
        SetVideoMuted(muted: boolean): void;
        SetVideoSourceInput(value: string): void;
        Start(promise: Object): void;
        Stop(promise: Object): void;
    }
}
declare namespace fm.icelink {
    class PluginLocalMedia extends PluginMedia implements ILocalMedia<PluginLocalMedia, PluginAudioTrack, PluginVideoTrack>, IInternalLocalMedia {
        getTypeString(): string;
        getAudio(): any;
        setAudio(audio: any): void;
        getVideo(): any;
        setVideo(video: any): void;
        getScreen(): boolean;
        setScreen(screen: boolean): void;
        getState(): LocalMediaState;
        constructor(external: IExternalLocalMedia, audio: any, video: any, screen?: boolean);
        start(): Future<PluginLocalMedia>;
        stop(): Future<PluginLocalMedia>;
        getHandle(): number;
        addOnAudioStarted(value: IAction0): void;
        addOnVideoStarted(value: IAction0): void;
        addOnAudioStopped(value: IAction0): void;
        addOnVideoStopped(value: IAction0): void;
        addOnAudioDestroyed(value: IAction0): void;
        addOnVideoDestroyed(value: IAction0): void;
        removeOnAudioStarted(value: IAction0): void;
        removeOnVideoStarted(value: IAction0): void;
        removeOnAudioStopped(value: IAction0): void;
        removeOnVideoStopped(value: IAction0): void;
        removeOnAudioDestroyed(value: IAction0): void;
        removeOnVideoDestroyed(value: IAction0): void;
        getAudioEncoding(): AudioEncodingConfig;
        getAudioEncodings(): AudioEncodingConfig[];
        setAudioEncodings(value: AudioEncodingConfig[]): void;
        getVideoEncoding(): VideoEncodingConfig;
        getVideoEncodings(): VideoEncodingConfig[];
        setVideoEncodings(value: VideoEncodingConfig[]): void;
        changeAudioSourceInput(audioSourceInput: SourceInput): Future<Object>;
        changeVideoSourceInput(videoSourceInput: SourceInput): Future<Object>;
        getAudioSourceInput(): SourceInput;
        getAudioSourceInputs(): Future<SourceInput[]>;
        getVideoSourceInput(): SourceInput;
        getVideoSourceInputs(): Future<SourceInput[]>;
        setAudioSourceInput(value: SourceInput): void;
        setVideoSourceInput(value: SourceInput): void;
        destroy(): void;
        getAudioGain(): number;
        getAudioMuted(): boolean;
        getId(): string;
        getVideoMuted(): boolean;
        setAudioGain(value: number): void;
        setAudioMuted(value: boolean): void;
        setVideoMuted(value: boolean): void;
        private checkifLoaded;
    }
}
declare namespace fm.icelink {
    /**
    An interface for COM usage.
    */
    interface IPluginRemoteMedia {
        AttachView(viewHandle: number): void;
        ChangeAudioSinkOutput(promise: Object, audioSinkOutput: string): void;
        ChangeVideoSinkOutput(promise: Object, videoSinkOutput: string): void;
        Destroy(): void;
        GetAudioGain(): number;
        GetAudioMuted(): boolean;
        GetAudioSinkOutput(): string;
        GetAudioSinkOutputs(promise: Object): void;
        GetAudioVolume(): number;
        GetHandle(): number;
        GetId(): string;
        GetVideoMuted(): boolean;
        GetVideoSinkOutput(): string;
        GetVideoSinkOutputs(promise: Object): void;
        GetVideoSize(): string;
        GrabVideoFrame(promise: Object): void;
        Initialize(disableAudio: boolean, disableVideo: boolean): void;
        SetAudioGain(gain: number): void;
        SetAudioMuted(muted: boolean): void;
        SetAudioSinkOutput(value: string): void;
        SetAudioVolume(volume: number): void;
        SetId(idValue: string): void;
        SetOnAudioDestroyed(callback: Object): void;
        SetOnAudioLevel(callback: Object): void;
        SetOnVideoDestroyed(callback: Object): void;
        SetOnVideoSize(callback: Object): void;
        SetVideoMuted(muted: boolean): void;
        SetVideoSinkOutput(value: string): void;
    }
}
declare namespace fm.icelink {
    class PluginRemoteMedia extends PluginMedia implements IRemoteMedia<PluginAudioTrack, PluginVideoTrack>, IInternalRemoteMedia {
        getTypeString(): string;
        constructor(external: IExternalRemoteMedia);
        private checkifLoaded;
        getHandle(): number;
        addOnAudioDestroyed(value: IAction0): void;
        addOnVideoDestroyed(value: IAction0): void;
        removeOnAudioDestroyed(value: IAction0): void;
        removeOnVideoDestroyed(value: IAction0): void;
        changeAudioSinkOutput(audioSinkOutput: SinkOutput): Future<Object>;
        changeVideoSinkOutput(videoSinkOutput: SinkOutput): Future<Object>;
        getAudioSinkOutput(): SinkOutput;
        getAudioSinkOutputs(): Future<SinkOutput[]>;
        getVideoSinkOutput(): SinkOutput;
        getVideoSinkOutputs(): Future<SinkOutput[]>;
        setAudioSinkOutput(value: SinkOutput): void;
        setVideoSinkOutput(value: SinkOutput): void;
        destroy(): void;
        getAudioGain(): number;
        getAudioMuted(): boolean;
        getId(): string;
        getVideoMuted(): boolean;
        setAudioGain(value: number): void;
        setAudioMuted(value: boolean): void;
        setVideoMuted(value: boolean): void;
    }
}
declare namespace fm.icelink {
    /**
    An interface for COM usage.
    */
    interface IPluginVideoStream {
        ChangeDirection(newDirection: number): string;
        GetCodecDisabled(name: string): boolean;
        GetControlTransportInfo(): string;
        GetDirection(): number;
        GetExternalId(): string;
        GetH264Disabled(): boolean;
        GetHandle(): number;
        GetId(): string;
        GetInfo(): string;
        GetInputMuted(): boolean;
        GetLabel(): string;
        GetLocalBandwidth(): number;
        GetLocalCanonicalName(): string;
        GetLocalDirection(): number;
        GetLocalReceive(): boolean;
        GetLocalSend(): boolean;
        GetOutputMuted(): boolean;
        GetPreferredCodecs(): string[];
        GetRemoteBandwidth(): number;
        GetRemoteCanonicalName(): string;
        GetRemoteDirection(): number;
        GetRemoteEncoding(): string;
        GetRemoteReceive(): boolean;
        GetRemoteSend(): boolean;
        GetSimulcastMode(): number;
        GetTag(): string;
        GetTransportInfo(): string;
        GetVp8Disabled(): boolean;
        GetVp9Disabled(): boolean;
        Initialize(localMediaHandle: number, remoteMediaHandle: number): void;
        SetCodecDisabled(name: string, disabled: boolean): void;
        SetExternalId(externalId: string): void;
        SetH264Disabled(disabled: boolean): void;
        SetInputMuted(muted: boolean): void;
        SetLocalBandwidth(bandwidth: number): void;
        SetLocalDirection(direction: number): void;
        SetLocalReceive(localReceiveEnabled: boolean): void;
        SetLocalSend(localSendEnabled: boolean): void;
        SetOnDirectionChange(callback: Object): void;
        SetOnLocalEncodingDisabled(callback: Object): void;
        SetOnLocalEncodingEnabled(callback: Object): void;
        SetOnStateChange(callback: Object): void;
        SetOutputMuted(muted: boolean): void;
        SetPreferredCodecs(names: string[]): void;
        SetRemoteEncoding(remoteEncodingJson: string): void;
        SetSimulcastMode(simulcastMode: number): void;
        SetTag(tag: string): void;
        SetVp8Disabled(disabled: boolean): void;
        SetVp9Disabled(disabled: boolean): void;
    }
}
declare namespace fm.icelink {
    class PluginVideoStream extends PluginMediaStream<PluginVideoTrack> implements IVideoStream, IInternalVideoStream {
        getTypeString(): string;
        private _state;
        constructor(external: IExternalVideoStream, localTrack: PluginVideoTrack, remoteTrack: PluginVideoTrack);
        getState(): StreamState;
        addOnStateChange(value: IAction0): void;
        removeOnStateChange(value: IAction0): void;
        getInfo(): MediaStreamInfo;
        getLocalReceive(): boolean;
        getLocalSend(): boolean;
        getRemoteReceive(): boolean;
        getRemoteSend(): boolean;
        setLocalReceive(value: boolean): void;
        setLocalSend(value: boolean): void;
        getRemoteDirection(): StreamDirection;
        getHandle(): number;
        changeDirection(newDirection: StreamDirection): Error;
        getDirection(): StreamDirection;
        getLocalCanonicalName(): string;
        getRemoteCanonicalName(): string;
        getId(): string;
        getExternalId(): string;
        setExternalId(value: string): void;
        getLabel(): string;
        getLocalBandwidth(): number;
        getLocalDirection(): StreamDirection;
        getInputMuted(): boolean;
        getOutputMuted(): boolean;
        getRemoteBandwidth(): number;
        getTag(): string;
        getType(): StreamType;
        setLocalDirection(value: StreamDirection): void;
        setLocalBandwidth(value: number): void;
        setInputMuted(value: boolean): void;
        setOutputMuted(value: boolean): void;
        setTag(value: string): void;
        addOnDirectionChange(callback: Object): void;
        removeOnDirectionChange(callback: Object): void;
        getPreferredCodecs(): string[];
        setPreferredCodecs(names: string[]): void;
        getCodecDisabled(name: string): boolean;
        setCodecDisabled(name: string, disabled: boolean): void;
        getVp8Disabled(): boolean;
        getVp9Disabled(): boolean;
        getH264Disabled(): boolean;
        setVp8Disabled(value: boolean): void;
        setVp9Disabled(value: boolean): void;
        setH264Disabled(value: boolean): void;
        getRemoteEncoding(): EncodingInfo;
        setRemoteEncoding(value: EncodingInfo): void;
        getSimulcastMode(): SimulcastMode;
        setSimulcastMode(value: SimulcastMode): void;
        getTransportInfo(): TransportInfo;
        getControlTransportInfo(): TransportInfo;
        addOnLocalEncodingDisabled(value: IAction1<EncodingInfo>): void;
        addOnLocalEncodingEnabled(value: IAction1<EncodingInfo>): void;
        removeOnLocalEncodingDisabled(value: IAction1<EncodingInfo>): void;
        removeOnLocalEncodingEnabled(value: IAction1<EncodingInfo>): void;
    }
}
declare namespace fm.icelink {
    class PluginVideoTrack extends PluginMediaTrack implements IVideoTrack, IInternalVideoTrack {
        getTypeString(): string;
        constructor(external: IExternalVideoTrack, media: PluginMedia);
        private isLocal;
        addOnStarted(value: IAction0): void;
        addOnStopped(value: IAction0): void;
        addOnDestroyed(value: IAction0): void;
        removeOnStarted(value: IAction0): void;
        removeOnStopped(value: IAction0): void;
        removeOnDestroyed(value: IAction0): void;
        changeSinkOutput(sinkOutput: SinkOutput): Future<Object>;
        getSinkOutput(): SinkOutput;
        getSinkOutputs(): Future<SinkOutput[]>;
        setSinkOutput(value: SinkOutput): void;
        changeSourceInput(sourceInput: SourceInput): Future<Object>;
        getSourceInput(): SourceInput;
        getSourceInputs(): Future<SourceInput[]>;
        setSourceInput(value: SourceInput): void;
        addOnSize(value: IAction1<Size>): void;
        getMuted(): boolean;
        getSize(): Size;
        grabFrame(): Future<VideoBuffer>;
        setMuted(value: boolean): void;
        removeOnSize(value: IAction1<Size>): void;
    }
}
declare namespace fm.icelink {
    interface IExternalRemoteMedia extends IRemoteMedia<IExternalAudioTrack, IExternalVideoTrack>, IViewSinkableMedia<HTMLElement, IExternalDomVideoSink>, IExternal<IInternalRemoteMedia> {
    }
    interface IInternalRemoteMedia extends IRemoteMedia<IInternalAudioTrack, IInternalVideoTrack>, IViewSinkableMedia<HTMLElement, IInternalDomVideoSink>, IInternal<IExternalRemoteMedia> {
    }
    class RemoteMedia extends Media implements IRemoteMedia<AudioTrack, VideoTrack>, IExternalRemoteMedia {
        getTypeString(): string;
        constructor();
        changeAudioSinkOutput(audioSinkOutput: SinkOutput): Future<Object>;
        changeVideoSinkOutput(videoSinkOutput: SinkOutput): Future<Object>;
        getAudioSinkOutput(): SinkOutput;
        getAudioSinkOutputs(): Future<SinkOutput[]>;
        getVideoSinkOutput(): SinkOutput;
        getVideoSinkOutputs(): Future<SinkOutput[]>;
        setAudioSinkOutput(value: SinkOutput): void;
        setVideoSinkOutput(value: SinkOutput): void;
    }
}
declare namespace fm.icelink {
    /** @hidden */
    abstract class SessionDescriptionManagerBase<TStream extends fm.icelink.WebRtcStreamBase, TAudioStream extends fm.icelink.IAudioStream, TVideoStream extends fm.icelink.IVideoStream, TDataStream extends fm.icelink.IDataStream<TDataChannel>, TDataChannel extends fm.icelink.IDataChannel<TDataChannel>> {
        getTypeString(): string;
        protected __audioStreamIndex: Array<TStream>;
        protected __dataStreamIndex: Array<TStream>;
        protected __streamIndex: Array<TStream>;
        protected __streamMatcher: fm.icelink.SessionDescriptionStreamMatcher<TStream>;
        protected __videoStreamIndex: Array<TStream>;
        constructor();
        /** @hidden */
        static updateTrickleIcePolicy(message: fm.icelink.sdp.Message, policy: fm.icelink.TrickleIcePolicy): void;
        /** @hidden */
        addMediaDescriptions(msg: fm.icelink.sdp.Message, descriptions: fm.icelink.sdp.MediaDescription[]): void;
        addStream(stream: TStream): void;
        /** @hidden */
        private addToIndex;
        protected abstract getAudioStreams(): TStream[];
        protected abstract getDataStreams(): TStream[];
        /** @hidden */
        getOffererStreamIndexFor(answererStreamIndex: number): number;
        protected abstract getStreams(): fm.icelink.Hash<string, TStream>;
        protected abstract getVideoStreams(): TStream[];
        /** @hidden */
        matchAndProcessDescriptionPerType(streams: Array<TStream>, description: fm.icelink.SessionDescription, isLocalDescription: boolean, streamMatcher: fm.icelink.SessionDescriptionStreamMatcher<TStream>, processSdpMediaDescriptionForStreamHandler: fm.icelink.IFunction5<TStream, fm.icelink.sdp.MediaDescription, number, boolean, boolean, fm.icelink.Error>, processSdpMediaDescriptionInternal: boolean): fm.icelink.Error;
        /** @hidden */
        parseSessionDescriptionForStreamChangesAndUpdateMids(newRemoteDescription: fm.icelink.SessionDescription, existingAudioStreams: TStream[], existingVideoStreams: TStream[], existingDataStreams: TStream[]): fm.icelink.Pair<fm.icelink.StreamDescription[], Object[]>;
        /** @hidden */
        populateStreamTypeIndexes(descriptions: fm.icelink.sdp.MediaDescription[], streams: Array<TStream>, streamMatcher: fm.icelink.SessionDescriptionStreamMatcher<TStream>): fm.icelink.Error;
        processDescription(description: fm.icelink.SessionDescription, isLocalDescription: boolean): fm.icelink.Error;
        /** @hidden */
        private processMSection;
        protected abstract processSdpMediaDescriptionForStream(stream: TStream, sdpMediaDescription: fm.icelink.sdp.MediaDescription, sdpMediaIndex: number, isLocalDescription: boolean, isRenegotiation: boolean): fm.icelink.Error;
        /** @hidden */
        private removeFromIndex;
        removeStream(stream: TStream): boolean;
        /** @hidden */
        private resetStreamMatcher;
        updateLocalDescription(localDescription: fm.icelink.SessionDescription): void;
        /** @hidden */
        private validateBaseDescription;
    }
}
declare namespace fm.icelink {
    /**
    @hidden
    */
    class SessionDescriptionManager extends SessionDescriptionManagerBase<WebRtcStream, WebRtcAudioStream, WebRtcVideoStream, WebRtcDataStream, WebRtcDataChannel> {
        getTypeString(): string;
        /** @hidden */
        private _streams;
        constructor();
        getStreams(): fm.icelink.Hash<string, WebRtcStream>;
        getAudioStreams(): WebRtcAudioStream[];
        getVideoStreams(): WebRtcVideoStream[];
        getDataStreams(): WebRtcDataStream[];
        protected processSdpMediaDescriptionForStream(stream: WebRtcStream, sdpMediaDescription: fm.icelink.sdp.MediaDescription, sdpMediaIndex: number, isLocalDescription: boolean, isRenegotiation: boolean): fm.icelink.Error;
    }
}
declare namespace fm.icelink {
    interface IExternalVideoStream extends IVideoStream, IExternal<IInternalVideoStream> {
    }
    interface IInternalVideoStream extends IVideoStream, IInternal<IExternalVideoStream> {
    }
    class VideoStream extends MediaStream<VideoTrack> implements IVideoStream, IExternalVideoStream {
        getTypeString(): string;
        getLocalMedia(): LocalMedia;
        getRemoteMedia(): RemoteMedia;
        constructor(localTrack: VideoTrack);
        constructor(localTrack: VideoTrack, remoteTrack: VideoTrack);
        constructor(localMedia: LocalMedia);
        constructor(localMedia: LocalMedia, remoteMedia: RemoteMedia);
        constructor(remoteMedia: RemoteMedia);
        getVp8Disabled(): boolean;
        getVp9Disabled(): boolean;
        getH264Disabled(): boolean;
        setVp8Disabled(value: boolean): void;
        setVp9Disabled(value: boolean): void;
        setH264Disabled(value: boolean): void;
        addOnDiscardKeyFrameRequest(value: IAction1<number[]>): void;
        removeOnDiscardKeyFrameRequest(value: IAction1<number[]>): void;
        raiseKeyFrameRequest(synchronizationSources: number[]): void;
    }
}
declare namespace fm.icelink {
    interface IExternalVideoTrack extends IVideoTrack, IExternal<IInternalVideoTrack> {
    }
    interface IInternalVideoTrack extends IVideoTrack, IInternal<IExternalVideoTrack> {
    }
    class VideoTrack extends MediaTrack implements IVideoTrack, IExternalVideoTrack {
        getTypeString(): string;
        constructor(media: Media, internalMedia?: IInternalMedia);
        addOnSize(value: IAction1<Size>): void;
        getSize(): Size;
        grabFrame(): Future<VideoBuffer>;
        removeOnSize(value: IAction1<Size>): void;
    }
}
declare namespace fm.icelink {
    /**
    Stream base properties/methods.
    */
    abstract class WebRtcStreamBase extends fm.icelink.Dynamic implements fm.icelink.IStream {
        getTypeString(): string;
        /** @hidden */
        private __id;
        /** @hidden */
        private __mediaStreamIdentification;
        /** @hidden */
        private __onDirectionChange;
        /** @hidden */
        private __onStateChange;
        /** @hidden */
        private __stateLock;
        /** @hidden */
        private __stateMachine;
        /** @hidden */
        private _connectedTimestamp;
        /** @hidden */
        private _connectionId;
        /** @hidden */
        private _externalId;
        /** @hidden */
        private _onDirectionChange;
        /** @hidden */
        private _onStateChange;
        /** @hidden */
        private _tag;
        /** @hidden */
        private _type;
        private fmicelinkWebRtcStreamBaseInit;
        /**
        Initializes a new instance of the [[fm.icelink.streamBase]] class.
        @param type The type.
        */
        constructor(type: fm.icelink.StreamType);
        /**
        Adds a handler that is raised when the stream direction change has occurred.
        */
        addOnDirectionChange(value: fm.icelink.IAction0): void;
        /**
        Adds a handler that is raised when the stream state changes.
        */
        addOnStateChange(value: fm.icelink.IAction0): void;
        /**
        Changes this stream's direction.
        */
        abstract changeDirection(newDirection: fm.icelink.StreamDirection): fm.icelink.Error;
        /**
        Gets the ManagedStopwatch.GetTimestamp() value representing the ticks that passed when this stream's connection state changed to connected.
        */
        protected getConnectedTimestamp(): number;
        /**
        Gets the connection identifier.
        */
        getConnectionId(): string;
        /**
        Gets the current direction.
        */
        abstract getDirection(): fm.icelink.StreamDirection;
        /** @hidden */
        abstract getDirectionCapabilities(): fm.icelink.StreamDirection;
        /**
        Gets the external identifier.
        */
        getExternalId(): string;
        /**
        Gets the identifier.
        */
        getId(): string;
        /**
        Gets a value indicating whether the stream is currently closed or failed.
        */
        getIsTerminated(): boolean;
        /**
        Gets a value indicating whether the stream is currently closing or failing.
        */
        getIsTerminating(): boolean;
        /**
        Gets a value indicating whether the stream is currently closing, failing, closed, or failed.
        */
        getIsTerminatingOrTerminated(): boolean;
        /**
        Gets a label that identifies this class.
        */
        abstract getLabel(): string;
        /**
        Gets current direction indicated by the local description.
        */
        abstract getLocalDirection(): fm.icelink.StreamDirection;
        /**
        Gets a value indicating whether receiving media is supported by the local peer on this stream.
        */
        getLocalReceive(): boolean;
        /**
        Gets a value indicating whether sending media is supported by the local peer on this stream.
        */
        getLocalSend(): boolean;
        /** @hidden */
        abstract getMediaDescriptionManager(): fm.icelink.MediaDescriptionManagerBase;
        /** @hidden */
        getMediaStreamIdentification(): string;
        /**
        Gets current direction indicated by the remote description.
        */
        abstract getRemoteDirection(): fm.icelink.StreamDirection;
        /**
        Gets a value indicating whether receiving media is supported by the local peer on this stream. Returns false if the remote stream direction has not been received.
        */
        getRemoteReceive(): boolean;
        /**
        Gets a value indicating whether sending media is supported by the remote peer on this stream. Returns false if the remote stream direction has not been received.
        */
        getRemoteSend(): boolean;
        /**
        Gets the state of the stream.
        */
        getState(): fm.icelink.StreamState;
        /** @hidden */
        getStateLock(): Object;
        /**
        Gets optional data to associate with this instance.
        */
        getTag(): string;
        /**
        Gets the stream transport info.
        */
        abstract getTransportInfo(): fm.icelink.TransportInfo;
        /**
        Gets the type.
        */
        getType(): fm.icelink.StreamType;
        /** @hidden */
        private logInvalidStateTransition;
        /** @hidden */
        abstract processSdpMediaDescription(sdpMessage: fm.icelink.sdp.Message, sdpMediaDescription: fm.icelink.sdp.MediaDescription, index: number, isLocalDescription: boolean, isOffer: boolean, isRenegotiation: boolean): fm.icelink.Error;
        /**
        Processes a state change.
        */
        protected processStateChange(): void;
        /**
        Processes a state lock change.
        */
        protected processStateLockChange(): void;
        /** @hidden */
        processUpdateToMediaStreamIdentification(oldValue: string): void;
        /** @hidden */
        raiseDirectionChange(): void;
        /** @hidden */
        private raiseStateChange;
        /**
        Removes a handler that is raised when the stream direction change has occurred.
        */
        removeOnDirectionChange(value: fm.icelink.IAction0): void;
        /**
        Removes a handler that is raised when the stream state changes.
        */
        removeOnStateChange(value: fm.icelink.IAction0): void;
        /** @hidden */
        private setConnectedTimestamp;
        /** @hidden */
        setConnectionId(value: string): void;
        /**
        Sets the external identifier.
        */
        setExternalId(value: string): void;
        /**
        Sets current direction indicated by the local description.
        */
        abstract setLocalDirection(value: fm.icelink.StreamDirection): void;
        /**
        Sets a value indicating whether receiving media is supported by the local peer on this stream.
        */
        setLocalReceive(value: boolean): void;
        /**
        Sets a value indicating whether sending media is supported by the local peer on this stream.
        */
        setLocalSend(value: boolean): void;
        /** @hidden */
        setMediaStreamIdentification(value: string): void;
        /** @hidden */
        abstract setRemoteDirection(value: fm.icelink.StreamDirection): void;
        /** @hidden */
        setState(state: fm.icelink.StreamState): boolean;
        /** @hidden */
        setStateLock(value: Object): void;
        /**
        Sets optional data to associate with this instance.
        */
        setTag(value: string): void;
        /** @hidden */
        private setType;
        /**
        Returns a string that represents this instance.
        */
        toString(): string;
    }
}
declare namespace fm.icelink {
    abstract class WebRtcStream extends WebRtcStreamBase implements IInternalStream {
        getTypeString(): string;
        /** @hidden */
        private _connection;
        getConnection(): WebRtcConnection;
        setConnection(remoteTrack: WebRtcConnection): void;
        /** @hidden */
        abstract _getExternal(): IExternalStream;
        private _transportInfo;
        /** @hidden */
        getMediaDescriptionManager(): MediaDescriptionManager;
        /** @hidden */
        setMediaDescriptionManager(manager: MediaDescriptionManager): void;
        private _mediaDescriptionManager;
        setTransportInfo(transportInfo: TransportInfo): void;
        getTransportInfo(): TransportInfo;
    }
}
declare namespace fm.icelink {
    /**
    Media stream base properties/methods.
    */
    abstract class WebRtcMediaStreamBase extends fm.icelink.WebRtcStream implements fm.icelink.IMediaStream, fm.icelink.IStream {
        getTypeString(): string;
        /** @hidden */
        private __disabledCodecs;
        /** @hidden */
        private __localCanonicalName;
        /** @hidden */
        private __localDirection;
        /** @hidden */
        private __onLocalEncodingDisabled;
        /** @hidden */
        private __onLocalEncodingEnabled;
        /** @hidden */
        private __pendingLocalDirection;
        /** @hidden */
        private __remoteDirection;
        /** @hidden */
        private _localBandwidth;
        /** @hidden */
        private _onLocalEncodingDisabled;
        /** @hidden */
        private _onLocalEncodingEnabled;
        /** @hidden */
        private _preferredCodecs;
        /** @hidden */
        private _remoteBandwidth;
        /** @hidden */
        private _remoteCanonicalName;
        /** @hidden */
        private _remoteEncoding;
        /** @hidden */
        private _renegotiationLock;
        /** @hidden */
        private _renegotiationPending;
        private fmicelinkWebRtcMediaStreamBaseInit;
        /**
        Initializes a new instance of the [[fm.icelink.mediaStreamBase]] class.
        @param type The type.
        */
        constructor(type: fm.icelink.StreamType);
        /**
        Adds a handler that is raised when a local encoding is disabled.
        */
        addOnLocalEncodingDisabled(value: fm.icelink.IAction1<fm.icelink.EncodingInfo>): void;
        /**
        Adds a handler that is raised when a local encoding is enabled.
        */
        addOnLocalEncodingEnabled(value: fm.icelink.IAction1<fm.icelink.EncodingInfo>): void;
        /**
        Records the pending direction of this stream. The LocalDirection of this stream will be updated when the connection renegotiation commences.
        */
        changeDirection(newDirection: fm.icelink.StreamDirection): fm.icelink.Error;
        /** @hidden */
        extractCanonicalName(mediaDescription: fm.icelink.sdp.MediaDescription, isLocalDescription: boolean): void;
        /**
        Gets the canonical name. Getting the value of MediaStream.CanonicalName is deprecated. Get the value of MediaStream.LocalCanonicalName instead.
        */
        getCanonicalName(): string;
        /**
        Gets whether a codec is disabled.
        @param name The codec name.
        @return Whether the codec is disabled.
        */
        getCodecDisabled(name: string): boolean;
        /**
        Gets control transport info.
        */
        abstract getControlTransportInfo(): fm.icelink.TransportInfo;
        /**
        Gets the direction.
        */
        getDirection(): fm.icelink.StreamDirection;
        /**
        Gets the media stream info.
        */
        getInfo(): fm.icelink.MediaStreamInfo;
        /**
        Gets whether the input track is muted.
        */
        abstract getInputMuted(): boolean;
        /**
        Gets a label that identifies this class.
        */
        getLabel(): string;
        /**
        Gets the local bandwidth, in kbps.
        */
        getLocalBandwidth(): number;
        /**
        Gets the local canonical name.
        */
        getLocalCanonicalName(): string;
        /**
        Gets current direction indicated by the local description.
        */
        getLocalDirection(): fm.icelink.StreamDirection;
        /**
        Gets whether the input track is muted. Alias for [[fm.icelink.mediaStreamBase.inputMuted]].
        */
        getMuted(): boolean;
        /**
        Gets whether the output track is muted.
        */
        abstract getOutputMuted(): boolean;
        /** @hidden */
        getPendingLocalDirection(): fm.icelink.StreamDirection;
        /**
        Gets any preferred codecs, in order of preference.
        */
        getPreferredCodecs(): string[];
        /**
        Gets the remote bandwidth, in kbps.
        */
        getRemoteBandwidth(): number;
        /**
        Gets the remote canonical name.
        */
        getRemoteCanonicalName(): string;
        /**
        Gets current direction indicated by the remote description.
        */
        getRemoteDirection(): fm.icelink.StreamDirection;
        /**
        Gets the remote encoding.
        */
        getRemoteEncoding(): fm.icelink.EncodingInfo;
        /**
        Gets whether there exist changes that are pending SDP renegotiation.
        */
        protected getRenegotiationPending(): boolean;
        /**
        Gets the simulcast mode.
        */
        abstract getSimulcastMode(): fm.icelink.SimulcastMode;
        /**
        Populates the media stream info.
        @param info
        */
        protected abstract populateInfo(info: fm.icelink.MediaStreamInfo): void;
        /**
        Raises the OnLocalEncodingDisabled event.
        @param encoding The encoding.
        */
        protected raiseLocalEncodingDisabled(encoding: fm.icelink.EncodingInfo): void;
        /**
        Raises the OnLocalEncodingEnabled event.
        @param encoding The encoding.
        */
        protected raiseLocalEncodingEnabled(encoding: fm.icelink.EncodingInfo): void;
        /**
        Removes a handler that is raised when a local encoding is disabled.
        */
        removeOnLocalEncodingDisabled(value: fm.icelink.IAction1<fm.icelink.EncodingInfo>): void;
        /**
        Removes a handler that is raised when a local encoding is enabled.
        */
        removeOnLocalEncodingEnabled(value: fm.icelink.IAction1<fm.icelink.EncodingInfo>): void;
        /**
        Sets whether a codec is disabled.
        @param name The codec name.
        @param disabled Whether to disable the codec.
        */
        setCodecDisabled(name: string, disabled: boolean): void;
        /**
        Sets whether the input track is muted.
        */
        abstract setInputMuted(value: boolean): void;
        /**
        Sets the local bandwidth, in kbps.
        */
        setLocalBandwidth(value: number): void;
        /** @hidden */
        setLocalCanonicalName(value: string): void;
        /**
        Sets current direction indicated by the local description.
        */
        setLocalDirection(value: fm.icelink.StreamDirection): void;
        /**
        Sets whether the input track is muted. Alias for [[fm.icelink.mediaStreamBase.inputMuted]].
        */
        setMuted(value: boolean): void;
        /**
        Sets whether the output track is muted.
        */
        abstract setOutputMuted(value: boolean): void;
        /** @hidden */
        setPendingLocalDirection(value: fm.icelink.StreamDirection): void;
        /**
        Sets any preferred codecs, in order of preference.
        */
        setPreferredCodecs(value: string[]): void;
        /**
        Sets the remote bandwidth, in kbps.
        */
        protected setRemoteBandwidth(value: number): void;
        /** @hidden */
        setRemoteCanonicalName(value: string): void;
        /** @hidden */
        setRemoteDirection(value: fm.icelink.StreamDirection): void;
        /**
        Sets the remote encoding.
        */
        setRemoteEncoding(value: fm.icelink.EncodingInfo): void;
        /**
        Sets whether there exist changes that are pending SDP renegotiation.
        */
        protected setRenegotiationPending(value: boolean): void;
        /**
        Sets the simulcast mode.
        */
        abstract setSimulcastMode(value: fm.icelink.SimulcastMode): void;
    }
}
declare namespace fm.icelink {
    abstract class WebRtcMediaStream<TTrack extends WebRtcMediaTrack> extends WebRtcMediaStreamBase implements IInternalMediaStream {
        getTypeString(): string;
        /** @hidden */
        abstract _getExternal(): IExternalMediaStream;
        /** @hidden */
        private _localTrack;
        getLocalTrack(): TTrack;
        setLocalTrack(localTrack: TTrack): void;
        /** @hidden */
        private _remoteTrack;
        getRemoteTrack(): TTrack;
        setRemoteTrack(remoteTrack: TTrack): void;
        setInputMuted(muted: boolean): void;
        getInputMuted(): boolean;
        setOutputMuted(muted: boolean): void;
        getOutputMuted(): boolean;
        constructor(external: IExternalMediaStream, localTrack: TTrack, remoteTrack: TTrack, type: StreamType);
        /** @hidden */
        private _maxVideoSize;
        /** @hidden */
        setMaxWidthAndHeight(width: number, height: number): void;
        populateInfo(info: MediaStreamInfo): void;
        /** @hidden */
        private toFormatInfos;
        /** @hidden */
        private _sender;
        /** @hidden */
        getSender(): RTCRtpSender;
        /** @hidden */
        setSender(value: RTCRtpSender, applySendEncodings: boolean): void;
        /** @hidden */
        private _receiver;
        /** @hidden */
        getReceiver(): RTCRtpReceiver;
        /** @hidden */
        setReceiver(value: RTCRtpReceiver): void;
        /** @hidden */
        private _sendEncodings;
        /** @hidden */
        getSendEncodings(): EncodingConfig[];
        /** @hidden */
        setSendEncodings(sendEncodings: EncodingConfig[]): void;
        /** @hidden */
        private applySendEncodings;
        /** @hidden */
        private _receiveEncodings;
        /** @hidden */
        getReceiveEncodings(): EncodingConfig[];
        /** @hidden */
        setReceiveEncodings(receiveEncodings: EncodingConfig[]): void;
        /** @hidden */
        getNativeSendEncodings(): RTCRtpEncodingParameters[];
        /** @hidden */
        getSendEncodingInfos(): EncodingInfo[];
        /** @hidden */
        getReceiveEncodingInfos(): EncodingInfo[];
        /** @hidden */
        private updateNativeEncoding;
        /** @hidden */
        private updateEncodingInfo;
        /** @hidden */
        private getNativeTrack;
        /** @hidden */
        replaceLocalTrack(localTrack: TTrack): Future<object>;
        /** @hidden */
        replaceRemoteTrack(remoteTrack: TTrack): Future<object>;
        processCachedChanges(): void;
        resetRemoteDirection(): void;
        processSdpMediaDescription(sdpMessage: sdp.Message, sdpMediaDescription: sdp.MediaDescription, index: number, isLocalDescription: boolean, isOffer: boolean, isRenegotiation: boolean): Error;
        getDirectionCapabilities(): StreamDirection;
        private _controlTransportInfo;
        setControlTransportInfo(info: TransportInfo): void;
        getControlTransportInfo(): TransportInfo;
        private _simulcastMode;
        getSimulcastMode(): SimulcastMode;
        setSimulcastMode(value: SimulcastMode): void;
    }
}
declare namespace fm.icelink {
    class WebRtcAudioStream extends WebRtcMediaStream<WebRtcAudioTrack> implements IAudioStream, IInternalAudioStream {
        getTypeString(): string;
        /** @hidden */
        private _dtmfSender;
        /** @hidden */
        private _onSendDtmfToneValues;
        /** @hidden */
        private _onSendDtmfToneChangeValues;
        /** @hidden */
        private _external;
        /** @hidden */
        _getExternal(): IExternalAudioStream;
        constructor(external: IExternalAudioStream, localTrack: WebRtcAudioTrack, remoteTrack: WebRtcAudioTrack);
        addOnReceiveDtmfTone(value: IAction1<dtmf.Tone>): void;
        addOnReceiveDtmfToneChange(value: IAction1<dtmf.Tone>): void;
        addOnSendDtmfTone(value: IAction1<dtmf.Tone>): void;
        addOnSendDtmfToneChange(value: IAction1<dtmf.Tone>): void;
        insertDtmfTone(dtmfTone: dtmf.Tone): boolean;
        insertDtmfTones(dtmfTones: dtmf.Tone[]): boolean;
        removeOnReceiveDtmfTone(value: IAction1<dtmf.Tone>): void;
        removeOnReceiveDtmfToneChange(value: IAction1<dtmf.Tone>): void;
        removeOnSendDtmfTone(value: IAction1<dtmf.Tone>): void;
        removeOnSendDtmfToneChange(value: IAction1<dtmf.Tone>): void;
        getOpusDisabled(): boolean;
        getG722Disabled(): boolean;
        getPcmuDisabled(): boolean;
        getPcmaDisabled(): boolean;
        setOpusDisabled(value: boolean): void;
        setG722Disabled(value: boolean): void;
        setPcmuDisabled(value: boolean): void;
        setPcmaDisabled(value: boolean): void;
    }
}
declare namespace fm.icelink {
    /**
    Media track base properties/methods.
    */
    abstract class WebRtcMediaTrackBase extends fm.icelink.Dynamic implements fm.icelink.IMediaTrack {
        getTypeString(): string;
        constructor();
        /**
        Adds a handler that is raised when the track is destroyed.
        */
        abstract addOnDestroyed(value: fm.icelink.IAction0): void;
        /**
        Adds a handler that is raised when the track is started. Only applicable for local media tracks.
        */
        abstract addOnStarted(value: fm.icelink.IAction0): void;
        /**
        Adds a handler that is raised when the track is stopped. Only applicable for local media tracks.
        */
        abstract addOnStopped(value: fm.icelink.IAction0): void;
        /**
        Changes the sink output while the media track is active.
        @param sinkOutput The sink output.
        */
        abstract changeSinkOutput(sinkOutput: fm.icelink.SinkOutput): fm.icelink.Future<Object>;
        /**
        Changes the source input while the media track is active.
        @param sourceInput The source input.
        */
        abstract changeSourceInput(sourceInput: fm.icelink.SourceInput): fm.icelink.Future<Object>;
        /**
        Destroys this media track.
        */
        abstract destroy(): boolean;
        /**
        Gets a value indicating whether this track is muted.
        */
        abstract getMuted(): boolean;
        /**
        Gets the current sink output.
        */
        abstract getSinkOutput(): fm.icelink.SinkOutput;
        /**
        Gets the available sink outputs.
        @return
                    A future with an array of sink outputs.
            
        */
        abstract getSinkOutputs(): fm.icelink.Future<fm.icelink.SinkOutput[]>;
        /**
        Gets the current source input.
        */
        abstract getSourceInput(): fm.icelink.SourceInput;
        /**
        Gets the available source inputs.
        @return
                    A future with an array of source inputs.
            
        */
        abstract getSourceInputs(): fm.icelink.Future<fm.icelink.SourceInput[]>;
        /**
        Removes a handler that is raised when the track is destroyed.
        */
        abstract removeOnDestroyed(value: fm.icelink.IAction0): void;
        /**
        Removes a handler that is raised when the track is started. Only applicable for local media tracks.
        */
        abstract removeOnStarted(value: fm.icelink.IAction0): void;
        /**
        Removes a handler that is raised when the track is stopped. Only applicable for local media tracks.
        */
        abstract removeOnStopped(value: fm.icelink.IAction0): void;
        /**
        Sets a value indicating whether this track is muted.
        */
        abstract setMuted(value: boolean): void;
        /**
        Sets the current sink output.
        */
        abstract setSinkOutput(value: fm.icelink.SinkOutput): void;
        /**
        Sets the current source input.
        */
        abstract setSourceInput(value: fm.icelink.SourceInput): void;
    }
}
interface MediaStreamTrack {
}
declare var MediaStreamTrack: {
    prototype: MediaStreamTrack;
    new (): MediaStreamTrack;
};
declare namespace fm.icelink {
    abstract class WebRtcMediaTrack extends WebRtcMediaTrackBase implements IMediaTrack, IInternalMediaTrack {
        getTypeString(): string;
        addOnStarted(value: IAction0): void;
        addOnStopped(value: IAction0): void;
        addOnDestroyed(value: IAction0): void;
        removeOnStarted(value: IAction0): void;
        removeOnStopped(value: IAction0): void;
        removeOnDestroyed(value: IAction0): void;
        getMedia(): WebRtcMedia<WebRtcAudioTrack, WebRtcVideoTrack>;
        constructor(external: IExternalMediaTrack, media: WebRtcMedia<WebRtcAudioTrack, WebRtcVideoTrack>);
        private _muted;
        getMuted(): boolean;
        setMuted(muted: boolean): void;
        getOnEnded(): EventListener;
        setOnEnded(onEnded: EventListener): void;
        stop(): void;
        destroy(): boolean;
        private raiseOnStopped;
    }
}
declare namespace fm.icelink {
    class WebRtcAudioTrack extends WebRtcMediaTrack implements IAudioTrack, IInternalAudioTrack {
        getTypeString(): string;
        constructor(external: IExternalAudioTrack, media: WebRtcMedia<WebRtcAudioTrack, WebRtcVideoTrack>);
        private isLocal;
        changeSinkOutput(sinkOutput: SinkOutput): Future<Object>;
        getSinkOutput(): SinkOutput;
        getSinkOutputs(): Future<SinkOutput[]>;
        setSinkOutput(value: SinkOutput): void;
        changeSourceInput(sourceInput: SourceInput): Future<Object>;
        getSourceInput(): SourceInput;
        getSourceInputs(): Future<SourceInput[]>;
        setSourceInput(value: SourceInput): void;
        addOnLevel(value: IAction1<number>): void;
        getGain(): number;
        getVolume(): number;
        removeOnLevel(value: IAction1<number>): void;
        setGain(value: number): void;
        setVolume(value: number): void;
    }
}
declare namespace fm.icelink {
    /**
    Connection base properties/methods.
    */
    abstract class WebRtcConnectionBase<TConnection extends fm.icelink.WebRtcConnectionBase<TConnection, TStream, TAudioStream, TVideoStream, TDataStream, TDataChannel>, TStream extends fm.icelink.WebRtcStreamBase, TAudioStream extends fm.icelink.IAudioStream, TVideoStream extends fm.icelink.IVideoStream, TDataStream extends fm.icelink.IDataStream<TDataChannel>, TDataChannel extends fm.icelink.IDataChannel<TDataChannel>> extends fm.icelink.Dynamic implements fm.icelink.IConnection<TConnection, TStream, TAudioStream, TVideoStream, TDataStream> {
        getTypeString(): string;
        /** @hidden */
        private __bundlePolicy;
        /** @hidden */
        private __closed;
        /** @hidden */
        private __connected;
        /** @hidden */
        private __externalId;
        /** @hidden */
        private __failed;
        /** @hidden */
        private __iceServers;
        /** @hidden */
        private __id;
        /** @hidden */
        private __onExternalIdChange;
        /** @hidden */
        private __onGatheringStateChange;
        /** @hidden */
        private __onIceConnectionStateChange;
        /** @hidden */
        private __onLocalCandidate;
        /** @hidden */
        private __onLocalDescription;
        /** @hidden */
        private __onRemoteCandidate;
        /** @hidden */
        private __onRemoteDescription;
        /** @hidden */
        private __onSignallingStateChange;
        /** @hidden */
        private __onStateChange;
        /** @hidden */
        private __signallingState;
        /** @hidden */
        private __stateMachine;
        /** @hidden */
        private __trickleIcePolicy;
        /** @hidden */
        private __useTrickleIce;
        /** @hidden */
        _connectionLock: Object;
        /** @hidden */
        private _deadStreamTimeout;
        /** @hidden */
        private _earlyRemoteCandidatePromises;
        /** @hidden */
        private _error;
        /** @hidden */
        private _iceGatherPolicy;
        /** @hidden */
        private _legacyTimeout;
        /** @hidden */
        private _onExternalIdChange;
        /** @hidden */
        private _onGatheringStateChange;
        /** @hidden */
        private _onIceConnectionStateChange;
        /** @hidden */
        private _onLocalCandidate;
        /** @hidden */
        private _onLocalDescription;
        /** @hidden */
        private _onRemoteCandidate;
        /** @hidden */
        private _onRemoteDescription;
        /** @hidden */
        private _onSignallingStateChange;
        /** @hidden */
        private _onStateChange;
        /** @hidden */
        private _tieBreaker;
        /** @hidden */
        private _timeout;
        private fmicelinkWebRtcConnectionBaseInit;
        /**
        Initializes a new instance of the [[fm.icelink.connectionBase]] class.
        */
        constructor(sharedLock: Object);
        /**
        Adds an ICE server.
        @param iceServer The ICE server.
        */
        addIceServer(iceServer: fm.icelink.IceServer): void;
        /**
        Adds some ICE servers.
        @param iceServers The ICE servers.
        */
        addIceServers(iceServers: fm.icelink.IceServer[]): void;
        /**
        Adds a handler that is raised when external Id of this connection changes. Old external Id as well as internal Id are raised.
        */
        addOnExternalIdChange(value: fm.icelink.IAction2<string, string>): void;
        /**
        Adds a handler that is raised when the gathering state changes.
        */
        addOnGatheringStateChange(value: fm.icelink.IAction1<TConnection>): void;
        /**
        Adds a handler that is raised when the ice connection state changes.
        */
        addOnIceConnectionStateChange(value: fm.icelink.IAction1<TConnection>): void;
        /**
        Adds a handler that is raised when a local candidate is added.
        */
        addOnLocalCandidate(value: fm.icelink.IAction2<TConnection, fm.icelink.Candidate>): void;
        /**
        Adds a handler that is raised when a local description is set.
        */
        addOnLocalDescription(value: fm.icelink.IAction2<TConnection, fm.icelink.SessionDescription>): void;
        /**
        Adds a handler that is raised when a remote description is added.
        */
        addOnRemoteCandidate(value: fm.icelink.IAction2<TConnection, fm.icelink.Candidate>): void;
        /**
        Adds a handler that is raised when a remote description is set.
        */
        addOnRemoteDescription(value: fm.icelink.IAction2<TConnection, fm.icelink.SessionDescription>): void;
        /**
        Adds a handler that is raised when the signalling state changes.
        */
        addOnSignallingStateChange(value: fm.icelink.IAction1<TConnection>): void;
        /**
        Adds a handler that is raised when the connection state changes.
        */
        addOnStateChange(value: fm.icelink.IAction1<TConnection>): void;
        /**
        Adds the remote candidate.
        @param remoteCandidate The remote candidate.
        */
        addRemoteCandidate(remoteCandidate: fm.icelink.Candidate): fm.icelink.Future<fm.icelink.Candidate>;
        /** @hidden */
        private addRemoteCandidatePromise;
        /**
        Closes this instance.
        */
        abstract close(): boolean;
        /**
        Creates an answer.
        */
        createAnswer(): fm.icelink.Future<fm.icelink.SessionDescription>;
        /** @hidden */
        private createAnswerWrapper;
        /**
        Creates an offer.
        */
        createOffer(): fm.icelink.Future<fm.icelink.SessionDescription>;
        /** @hidden */
        private createOfferWrapper;
        /**
        Adds the remote candidate.
        @param promise The promise.
        @param remoteCandidate The remote candidate.
        */
        protected abstract doAddRemoteCandidate(promise: fm.icelink.Promise<fm.icelink.Candidate>, remoteCandidate: fm.icelink.Candidate): void;
        /**
        Creates an answer.
        */
        protected abstract doCreateAnswer(promise: fm.icelink.Promise<fm.icelink.SessionDescription>): void;
        /**
        Creates an offer.
        */
        protected abstract doCreateOffer(promise: fm.icelink.Promise<fm.icelink.SessionDescription>): boolean;
        /**
        Processes a session description.
        @param description The session description.
        @param isLocalDescription Whether this is a local session description.
        */
        protected doProcessDescription(description: fm.icelink.SessionDescription, isLocalDescription: boolean): fm.icelink.Error;
        /**
        Dispatches cached local candidates that were gathered while Connection generated session description.
        */
        protected abstract doSendCachedLocalCandidates(): void;
        /**
        Sets the local description.
        @param promise The promise.
        @param localDescription The local description.
        */
        protected abstract doSetLocalDescription(promise: fm.icelink.Promise<fm.icelink.SessionDescription>, localDescription: fm.icelink.SessionDescription): void;
        /** @hidden */
        private doSetLocalDescriptionInternal;
        /**
        Sets the remote description.
        @param promise The promise.
        @param remoteDescription The remote description.
        */
        protected abstract doSetRemoteDescription(promise: fm.icelink.Promise<fm.icelink.SessionDescription>, remoteDescription: fm.icelink.SessionDescription): void;
        /** @hidden */
        private doSetRemoteDescriptionInternal;
        /**
        Gets the first audio stream.
        */
        getAudioStream(): TAudioStream;
        /**
        Gets the audio streams.
        */
        abstract getAudioStreams(): TAudioStream[];
        /**
        Gets the bundle policy.
        */
        getBundlePolicy(): fm.icelink.BundlePolicy;
        /**
        Gets the canonical name. Getting the value of Connection.CanonicalName is deprecated. Get the value of MediaStream.LocalCanonicalName instead.
        */
        getCanonicalName(): string;
        /**
        Gets a future that resolves if the connection enters the Closed state or rejects if the connection enters the Failed state before that happens.
        */
        getClosed(): fm.icelink.Future<Object>;
        /**
        Gets a future that resolves if the connection enters the Connected state or rejects if the connection enters the Failed state before that happens.
        */
        getConnected(): fm.icelink.Future<Object>;
        /** @hidden */
        getConnectionWideCanonicalName(): string;
        /**
        Gets the first data stream.
        */
        getDataStream(): TDataStream;
        /**
        Gets the data streams.
        */
        abstract getDataStreams(): TDataStream[];
        /**
        Gets the amount of time (in milliseconds) to wait for connectivity checks to re-establish after they start to fail on a live connection. Defaults to 15,000.
        */
        getDeadStreamTimeout(): number;
        /**
        Gets the error.
        */
        getError(): fm.icelink.Error;
        /**
        Gets the external identifier.
        */
        getExternalId(): string;
        /**
        Gets a future that resolves if the connection enters the Failed state or rejects if the connection enters the Closed state before that happens.
        */
        getFailed(): fm.icelink.Future<Object>;
        /**
        Gets the ICE gathering state.
        */
        abstract getGatheringState(): fm.icelink.IceGatheringState;
        /**
        Gets whether this connection has an audio stream.
        */
        getHasAudio(): boolean;
        /**
        Gets whether this connection has a data stream.
        */
        getHasData(): boolean;
        /**
        Gets whether this connection has a video stream.
        */
        getHasVideo(): boolean;
        /**
        Gets the ICE connection state.
        */
        abstract getIceConnectionState(): fm.icelink.IceConnectionState;
        /**
        Gets the ICE gather policy.
        */
        getIceGatherPolicy(): fm.icelink.IceGatherPolicy;
        /**
        Gets the ICE server.
        */
        getIceServer(): fm.icelink.IceServer;
        /**
        Gets the ICE servers.
        */
        getIceServers(): fm.icelink.IceServer[];
        /**
        Gets the identifier.
        */
        getId(): string;
        /**
        Gets the current instance.
        */
        protected abstract getInstance(): TConnection;
        /**
        Gets a value indicating whether the connection is currently closed or failed.
        */
        getIsTerminated(): boolean;
        /**
        Gets a value indicating whether the connection is currently closing or failing.
        */
        getIsTerminating(): boolean;
        /**
        Gets a value indicating whether the connection is currently closing, failing, closed, or failed.
        */
        getIsTerminatingOrTerminated(): boolean;
        /**
        Gets a value indicating whether legacy Connection.Timeout should be used. When disabled, Connection.Timeout only accounts for the time spent trying to establish connectivity (i.e. time it takes to transition from the Connecting to the Connected state; from the time point when both offer and answer had been set to the connection being fully established). When enabled, Connection.Timeout accounts for the time spent from receiving an offer (or creating an offer) to establishing connectivity (i.e. time it takes to transition from Initializing to Connected state). By default, LegacyTimeout is set to true, so that existing behavior is preserved. However, in the future default will be updated to false. This means that IL will not account for any signalling delays that may occur while establishing connectivity. This option will be later deprecated.
        */
        getLegacyTimeout(): boolean;
        /**
        Gets the local description.
        */
        abstract getLocalDescription(): fm.icelink.SessionDescription;
        /**
        Gets the remote description.
        */
        abstract getRemoteDescription(): fm.icelink.SessionDescription;
        /** @hidden */
        abstract getSessionDescriptionManager(): fm.icelink.SessionDescriptionManagerBase<TStream, TAudioStream, TVideoStream, TDataStream, TDataChannel>;
        /**
        Gets the state of the signalling.
        */
        getSignallingState(): fm.icelink.SignallingState;
        /**
        Gets the state of the connection.
        */
        getState(): fm.icelink.ConnectionState;
        /**
        Gets the current connection stats.
        */
        abstract getStats(): fm.icelink.Future<fm.icelink.ConnectionStats>;
        /**
        Gets the first stream.
        */
        getStream(): TStream;
        /**
        Gets the streams.
        */
        abstract getStreams(): TStream[];
        /**
        Gets the tie breaker.
        */
        getTieBreaker(): string;
        /**
        Gets the amount of time (in milliseconds) to wait for a connection to establish before giving up and closing it. Defaults to 30,000.
        */
        getTimeout(): number;
        /**
        Gets Trickle Ice Support Policy. Cf. https://tools.ietf.org/html/draft-ietf-ice-trickle-05
        */
        getTrickleIcePolicy(): fm.icelink.TrickleIcePolicy;
        /** @hidden */
        getUseTrickleIce(): boolean;
        /**
        Gets the first video stream.
        */
        getVideoStream(): TVideoStream;
        /**
        Gets the video streams.
        */
        abstract getVideoStreams(): TVideoStream[];
        /** @hidden */
        private logInvalidStateTransition;
        /**
        Processes a session description.
        @param description The session description.
        @param isLocalDescription Whether this is a local session description.
        */
        protected processDescription(description: fm.icelink.SessionDescription, isLocalDescription: boolean): fm.icelink.Error;
        /**
        Processes a state change.
        */
        protected processStateChange(): void;
        /** @hidden */
        raiseCachedCandidates(): void;
        /** @hidden */
        private raiseConnected;
        /**
        Raises gathering state change.
        */
        protected raiseGatheringStateChange(connection: TConnection): void;
        /**
        Raises ICE connection state change.
        */
        protected raiseIceConnectionStateChange(connection: TConnection): void;
        /**
        Raises a local candidate but only if it has not been already raised.
        @param localCandidate The local candidate.
        */
        protected raiseLocalCandidate(localCandidate: fm.icelink.Candidate): void;
        /** @hidden */
        private raiseLocalDescription;
        /** @hidden */
        private raiseRemoteCandidate;
        /** @hidden */
        private raiseRemoteDescription;
        /** @hidden */
        private raiseStateChange;
        /** @hidden */
        private raiseTerminated;
        /** @hidden */
        registerStreamWithSessionDescriptionManager(stream: TStream): void;
        /**
        Removes an ICE server.
        @param iceServer The ICE server.
        */
        removeIceServer(iceServer: fm.icelink.IceServer): void;
        /**
        Removes some ICE servers.
        @param iceServers The ICE servers.
        */
        removeIceServers(iceServers: fm.icelink.IceServer[]): void;
        /**
        Removes a handler that is raised when external Id of this connection changes. Old external Id as well as internal Id are raised.
        */
        removeOnExternalIdChange(value: fm.icelink.IAction2<string, string>): void;
        /**
        Removes a handler that is raised when the gathering state changes.
        */
        removeOnGatheringStateChange(value: fm.icelink.IAction1<TConnection>): void;
        /**
        Removes a handler that is raised when the ice connection state changes.
        */
        removeOnIceConnectionStateChange(value: fm.icelink.IAction1<TConnection>): void;
        /**
        Removes a handler that is raised when a local candidate is added.
        */
        removeOnLocalCandidate(value: fm.icelink.IAction2<TConnection, fm.icelink.Candidate>): void;
        /**
        Removes a handler that is raised when a local description is set.
        */
        removeOnLocalDescription(value: fm.icelink.IAction2<TConnection, fm.icelink.SessionDescription>): void;
        /**
        Removes a handler that is raised when a remote description is added.
        */
        removeOnRemoteCandidate(value: fm.icelink.IAction2<TConnection, fm.icelink.Candidate>): void;
        /**
        Removes a handler that is raised when a remote description is set.
        */
        removeOnRemoteDescription(value: fm.icelink.IAction2<TConnection, fm.icelink.SessionDescription>): void;
        /**
        Removes a handler that is raised when the signalling state changes.
        */
        removeOnSignallingStateChange(value: fm.icelink.IAction1<TConnection>): void;
        /**
        Removes a handler that is raised when the connection state changes.
        */
        removeOnStateChange(value: fm.icelink.IAction1<TConnection>): void;
        /**
        Sets the bundle policy.
        */
        setBundlePolicy(value: fm.icelink.BundlePolicy): void;
        /**
        Sets the amount of time (in milliseconds) to wait for connectivity checks to re-establish after they start to fail on a live connection. Defaults to 15,000.
        */
        setDeadStreamTimeout(value: number): void;
        /**
        Sets the error.
        */
        setError(value: fm.icelink.Error): void;
        /**
        Sets the external identifier.
        */
        setExternalId(value: string): void;
        /**
        Sets the ICE gathering state.
        */
        protected abstract setGatheringState(value: fm.icelink.IceGatheringState): void;
        /**
        Sets the ICE connection state.
        */
        protected abstract setIceConnectionState(value: fm.icelink.IceConnectionState): void;
        /**
        Sets the ICE gather policy.
        */
        setIceGatherPolicy(value: fm.icelink.IceGatherPolicy): void;
        /**
        Sets the ICE server.
        */
        setIceServer(value: fm.icelink.IceServer): void;
        /**
        Sets the ICE servers.
        */
        setIceServers(value: fm.icelink.IceServer[]): void;
        /**
        Sets a value indicating whether legacy Connection.Timeout should be used. When disabled, Connection.Timeout only accounts for the time spent trying to establish connectivity (i.e. time it takes to transition from the Connecting to the Connected state; from the time point when both offer and answer had been set to the connection being fully established). When enabled, Connection.Timeout accounts for the time spent from receiving an offer (or creating an offer) to establishing connectivity (i.e. time it takes to transition from Initializing to Connected state). By default, LegacyTimeout is set to true, so that existing behavior is preserved. However, in the future default will be updated to false. This means that IL will not account for any signalling delays that may occur while establishing connectivity. This option will be later deprecated.
        */
        setLegacyTimeout(value: boolean): void;
        /**
        Sets the local description.
        @param localDescription The local description.
        */
        setLocalDescription(localDescription: fm.icelink.SessionDescription): fm.icelink.Future<fm.icelink.SessionDescription>;
        /** @hidden */
        private setLocalDescriptionInternal;
        /**
        Sets the remote description.
        @param remoteDescription The remote description.
        */
        setRemoteDescription(remoteDescription: fm.icelink.SessionDescription): fm.icelink.Future<fm.icelink.SessionDescription>;
        /** @hidden */
        private setRemoteDescriptionInternal;
        /** @hidden */
        abstract setSessionDescriptionManager(value: fm.icelink.SessionDescriptionManagerBase<TStream, TAudioStream, TVideoStream, TDataStream, TDataChannel>): void;
        /**
        Sets the state of the signalling.
        */
        protected setSignallingState(value: fm.icelink.SignallingState): void;
        /** @hidden */
        setState(state: fm.icelink.ConnectionState): boolean;
        /** @hidden */
        setState(state: fm.icelink.ConnectionState, error: fm.icelink.Error): boolean;
        /**
        Sets the tie breaker.
        */
        setTieBreaker(value: string): void;
        /**
        Sets the amount of time (in milliseconds) to wait for a connection to establish before giving up and closing it. Defaults to 30,000.
        */
        setTimeout(value: number): void;
        /**
        Sets Trickle Ice Support Policy. Cf. https://tools.ietf.org/html/draft-ietf-ice-trickle-05
        */
        setTrickleIcePolicy(value: fm.icelink.TrickleIcePolicy): void;
        /** @hidden */
        setUseTrickleIce(value: boolean): void;
        /** @hidden */
        unregisterStreamWithSessionDescriptionManager(stream: TStream): void;
        /** @hidden */
        updateBundlePolicy(policy: fm.icelink.BundlePolicy): void;
        /** @hidden */
        updateRemoteCandidateIndex(candidate: fm.icelink.Candidate): void;
        /** @hidden */
        private verifySessionIdAndVersion;
    }
}
declare function makeMediaStream(): MediaStream;
declare namespace fm.icelink {
    class WebRtcConnection extends WebRtcConnectionBase<WebRtcConnection, WebRtcStream, WebRtcAudioStream, WebRtcVideoStream, WebRtcDataStream, WebRtcDataChannel> implements IInternalConnection {
        getTypeString(): string;
        /** @hidden */
        private _external;
        /** @hidden */
        _getExternal(): IExternalConnection;
        /** @hidden */
        private _streams;
        /** @hidden */
        private _mediaStreams;
        /** @hidden */
        private _audioStreams;
        /** @hidden */
        private _videoStreams;
        /** @hidden */
        private _dataStreams;
        /** @hidden */
        private _offerer;
        /** @hidden */
        private _initialized;
        /** @hidden */
        private _localDescription;
        /** @hidden */
        private _remoteDescription;
        /** @hidden */
        private _gatheringState;
        /** @hidden */
        private _iceConnectionState;
        /** @hidden */
        private _remoteMedia;
        /** @hidden */
        private _isRenegotiation;
        getRemoteMedia(): WebRtcRemoteMedia;
        /** @hidden */
        private _nativePeerConnection;
        getNativePeerConnection(): RTCPeerConnection;
        /** @hidden */
        private _discoveredCandidates;
        private _remoteMediaTrackCount;
        private _dataStreamsReady;
        private _mediaStreamsReady;
        /** @hidden */
        private _nativeIceGatherers;
        getNativeIceGatherers(): RTCIceGatherer[];
        /** @hidden */
        private _nativeIceTransports;
        getNativeIceTransports(): RTCIceTransport[];
        /** @hidden */
        private _nativeDtlsTransports;
        getNativeDtlsTransports(): RTCDtlsTransport[];
        /** @hidden */
        private _nativeRtpSenders;
        getNativeRtpSenders(): RTCRtpSender[];
        /** @hidden */
        private _nativeRtpReceivers;
        getNativeRtpReceivers(): RTCRtpReceiver[];
        /** @hidden */
        private _remoteNativeMediaStream;
        /** @hidden */
        private _rtpKinds;
        /** @hidden */
        private _ortcLocalDescription;
        /** @hidden */
        private _ortcRemoteDescription;
        /** @hidden */
        private _remoteCandidatesTimer;
        /** @hidden */
        private _remoteCandidatesDone;
        /** @hidden */
        private _transportsRemaining;
        /** @hidden */
        private _ortcSupportsTcp;
        constructor(external: IExternalConnection, streams: WebRtcStream[], remoteMedia: WebRtcRemoteMedia);
        getInstance(): WebRtcConnection;
        private addStreamInternal;
        private addStreamsInternal;
        processStateChange(): void;
        private startConnectionTimeout;
        getStreams(): WebRtcStream[];
        getMediaStreams(): WebRtcMediaStream<WebRtcMediaTrack>[];
        getAudioStreams(): WebRtcAudioStream[];
        getVideoStreams(): WebRtcVideoStream[];
        getDataStreams(): WebRtcDataStream[];
        getStats(): Future<ConnectionStats>;
        private getMediaSenderStats;
        private getMediaReceiverStats;
        private getTransportStats;
        private getCertificateStats;
        private getCandidateStats;
        private getCandidatePairStats;
        private getCodecStats;
        private getWebRTCBundlePolicyString;
        private getMediaTrackStats;
        private initialize;
        private initializeTrack;
        private validateCandidate;
        private createIceGatherer;
        private sessionDescriptionTypeToString;
        private sessionDescriptionTypeToEnum;
        private webrtcCandidateToCandidate;
        private webrtcCandidateFromCandidate;
        private webrtcSessionDescriptionToSessionDescription;
        private webrtcSessionDescriptionFromSessionDescription;
        private rtcCandidateToSdpCandidateAttribute;
        private rtcCandidateFromSdpCandidateAttribute;
        private ortcCandidateToCandidate;
        private ortcCandidateFromCandidate;
        private ortcSessionDescriptionToSessionDescription;
        private ortcSessionDescriptionFromSessionDescription;
        private applyMediaFormatParametersAttributes;
        private applyMediaFeedbackAttributes;
        /** @hidden */
        private _iceCandidateProcessingTimeout;
        /**<span id='method-fm.icelink.Connection-getIceCandidateProcessingTimeout'>&nbsp;</span>**/
        /**
         <div>
         Gets the amount of time (in milliseconds) to wait
         before halting gathering efforts for early candidates.
         Only applies when TrickleIceSupport is set to NotSupported.
         Defaults to 2000.
         </div>


        @return {number}
        */
        getIceCandidateProcessingTimeout(): number;
        /**<span id='method-fm.icelink.ConnectionBase-setIceCandidateProcessingTimeout'>&nbsp;</span>**/
        /**
         <div>
         Sets the amount of time (in milliseconds) to wait
         before halting gathering efforts for early candidates.
         Only applies when TrickleIceSupport is set to NotSupported.
         Defaults to 1000.
         </div>


        @param {number} value
        @return {void}
        */
        setIceCandidateProcessingTimeout(value: number): void;
        protected doCreateOffer(promise: Promise<SessionDescription>): boolean;
        protected doCreateAnswer(promise: Promise<SessionDescription>): void;
        private processIceGatheringStateComplete;
        private injectDiscoveredCandidatesIntoSdp;
        private setNativeDescriptionSuccess;
        private doCreate;
        getLocalDescription(): SessionDescription;
        getGatheringState(): IceGatheringState;
        getIceConnectionState(): IceConnectionState;
        protected setGatheringState(state: IceGatheringState): void;
        protected setIceConnectionState(state: IceConnectionState): void;
        getRemoteDescription(): SessionDescription;
        /** @hidden */
        private _sessionDescriptionManager;
        /** @hidden */
        getSessionDescriptionManager(): SessionDescriptionManager;
        /** @hidden */
        setSessionDescriptionManager(manager: SessionDescriptionManager): void;
        private updateLocalDescription;
        protected doSetLocalDescription(promise: Promise<SessionDescription>, localDescription: SessionDescription): void;
        private processRemoteDescriptionOnRenegotiation;
        private removeSdesAttributesIfNeeded;
        protected doSetRemoteDescription(promise: Promise<SessionDescription>, remoteDescription: SessionDescription): void;
        protected doSendCachedLocalCandidates(): void;
        private startOrtc;
        private startOrtcTrack;
        private selectCodecs;
        private selectEncodings;
        private selectRtcp;
        protected doAddRemoteCandidate(promise: Promise<Candidate>, remoteCandidate: Candidate): void;
        private setRemoteCandidatesDoneTimer;
        protected assignRemoteDescriptionInternal(sessionDescription: SessionDescription): void;
        close(): boolean;
        private doClose;
        private dtmfSender;
        getDtmfSender(): RTCDtmfSender;
        replaceLocalTrack(localTrack: WebRtcMediaTrack, mediaStream: WebRtcMediaStream<WebRtcMediaTrack>): Future<object>;
        replaceRemoteTrack(remoteTrack: WebRtcMediaTrack, mediaStream: WebRtcMediaStream<WebRtcMediaTrack>): Future<object>;
        private getRtpSender;
        private tryGetRtpSender;
        /** @hidden */
        private static __webRtcConnectionInitialized;
        /** @hidden */
        static webRtcConnectionInitialize(): void;
    }
}
declare namespace fm.icelink {
    /**
    Data channel base properties/methods.
    */
    abstract class WebRtcDataChannelBase<TDataChannel> extends fm.icelink.Dynamic implements fm.icelink.IDataChannel<TDataChannel> {
        getTypeString(): string;
        /** @hidden */
        private __bytesReceived;
        /** @hidden */
        private __bytesSent;
        /** @hidden */
        private __id;
        /** @hidden */
        private __messagesReceived;
        /** @hidden */
        private __messagesSent;
        /** @hidden */
        private __onDataReceived;
        /** @hidden */
        private __onDataSent;
        /** @hidden */
        private __onStateChange;
        /** @hidden */
        private __stateLock;
        /** @hidden */
        private __stateMachine;
        /** @hidden */
        private _connectionId;
        /** @hidden */
        private _getRemoteConnectionInfo;
        /** @hidden */
        private _label;
        /** @hidden */
        private _onDataReceived;
        /** @hidden */
        private _onDataSent;
        /** @hidden */
        private _onReceive;
        /** @hidden */
        private _onStateChange;
        /** @hidden */
        private _ordered;
        /** @hidden */
        private _streamId;
        /** @hidden */
        private _subprotocol;
        private fmicelinkWebRtcDataChannelBaseInit;
        /**
        Initializes a new instance of the [[fm.icelink.dataChannelBase]] class.
        @param label The label.
        @param ordered Whether messages will be delivered in the order they are sent.
        @param subprotocol The subprotocol.
        */
        constructor(label: string, ordered: boolean, subprotocol: string);
        /** @hidden */
        addOnDataReceived(value: fm.icelink.IAction1<number>): void;
        /** @hidden */
        addOnDataSent(value: fm.icelink.IAction1<number>): void;
        /**
        Adds a handler that is raised when the data channel state changes.
        */
        addOnStateChange(value: fm.icelink.IAction1<TDataChannel>): void;
        /**
        Gets the number of bytes received.
        */
        getBytesReceived(): number;
        /**
        Gets the number of bytes sent.
        */
        getBytesSent(): number;
        /**
        Gets the connection identifier.
        */
        getConnectionId(): string;
        /** @hidden */
        getGetRemoteConnectionInfo(): fm.icelink.IFunction1<string, Object>;
        /**
        Gets the identifier.
        */
        getId(): string;
        /**
        Gets the data channel info.
        */
        getInfo(): fm.icelink.DataChannelInfo;
        /**
        Gets the current instance.
        */
        protected abstract getInstance(): TDataChannel;
        /**
        Gets a value indicating whether the data channel is currently closed or failed.
        */
        getIsTerminated(): boolean;
        /**
        Gets a value indicating whether the data channel is currently closing.
        */
        getIsTerminating(): boolean;
        /**
        Gets a value indicating whether the data channel is currently closing, closed, or failed.
        */
        getIsTerminatingOrTerminated(): boolean;
        /**
        Gets the label.
        */
        getLabel(): string;
        /**
        Gets the number of messages received.
        */
        getMessagesReceived(): number;
        /**
        Gets the number of messages sent.
        */
        getMessagesSent(): number;
        /**
        Gets the callback to execute when a message is received.
        */
        getOnReceive(): fm.icelink.IAction1<fm.icelink.DataChannelReceiveArgs>;
        /**
        Gets a value indicating whether messages will be delivered in the order they are sent.
        */
        getOrdered(): boolean;
        /**
        Gets the state.
        */
        getState(): fm.icelink.DataChannelState;
        /** @hidden */
        getStateLock(): Object;
        /**
        Gets the stream identifier.
        */
        getStreamId(): string;
        /**
        Gets the subprotocol.
        */
        getSubprotocol(): string;
        /** @hidden */
        private logInvalidStateTransition;
        /** @hidden */
        prepareAndSendMessage(buffer: fm.icelink.DataBuffer, promise: fm.icelink.Promise<Object>): void;
        /** @hidden */
        prepareAndSendMessage(msg: string, promise: fm.icelink.Promise<Object>): void;
        /**
        Processes a state change.
        */
        protected processStateChange(): void;
        /**
        Processes a state lock change.
        */
        protected processStateLockChange(): void;
        /** @hidden */
        abstract promisedSendDataBytes(dataBytes: fm.icelink.DataBuffer, dataLength: number, promise: fm.icelink.Promise<Object>): void;
        /** @hidden */
        abstract promisedSendDataString(dataString: string, dataLength: number, promise: fm.icelink.Promise<Object>): void;
        /**
        Raises the OnReceive callback with data bytes.
        @param dataBytes The data bytes.
        */
        protected raiseDataBytes(dataBytes: fm.icelink.DataBuffer): void;
        /**
        Raises the OnReceive callback with a data string.
        @param dataString The data string.
        */
        protected raiseDataString(dataString: string): void;
        /** @hidden */
        private raiseStateChange;
        /**
        Registers that a data has been sent.
        @param dataLength The data length.
        */
        protected registerDataReceived(dataLength: number): void;
        /**
        Registers that a data has been sent.
        @param dataLength The data length.
        */
        protected registerDataSent(dataLength: number): void;
        /** @hidden */
        removeOnDataReceived(value: fm.icelink.IAction1<number>): void;
        /** @hidden */
        removeOnDataSent(value: fm.icelink.IAction1<number>): void;
        /**
        Removes a handler that is raised when the data channel state changes.
        */
        removeOnStateChange(value: fm.icelink.IAction1<TDataChannel>): void;
        /**
        Sends some bytes.
        @param dataBytes The data bytes.
        */
        abstract sendDataBytes(dataBytes: fm.icelink.DataBuffer): fm.icelink.Future<Object>;
        /**
        Sends a string.
        @param dataString The data string.
        */
        abstract sendDataString(dataString: string): fm.icelink.Future<Object>;
        /** @hidden */
        setConnectionId(value: string): void;
        /** @hidden */
        setGetRemoteConnectionInfo(value: fm.icelink.IFunction1<string, Object>): void;
        /** @hidden */
        private setLabel;
        /**
        Sets the callback to execute when a message is received.
        */
        setOnReceive(value: fm.icelink.IAction1<fm.icelink.DataChannelReceiveArgs>): void;
        /** @hidden */
        private setOrdered;
        /** @hidden */
        setState(state: fm.icelink.DataChannelState): boolean;
        /** @hidden */
        setStateLock(value: Object): void;
        /** @hidden */
        setStreamId(value: string): void;
        /** @hidden */
        private setSubprotocol;
    }
}
declare namespace fm.icelink {
    class WebRtcDataChannel extends WebRtcDataChannelBase<WebRtcDataChannel> implements IInternalDataChannel {
        getTypeString(): string;
        /** @hidden */
        private _external;
        /** @hidden */
        _getExternal(): IExternalDataChannel;
        /** @hidden */
        private sendQueue;
        /** @hidden */
        private _nativeDataChannel;
        getNativeDataChannel(): any;
        setNativeDataChannel(nativeDataChannel: any): void;
        constructor(external: IExternalDataChannel, label: string, ordered?: boolean, subprotocol?: string);
        getInstance(): WebRtcDataChannel;
        sendDataString(dataString: string): fm.icelink.Future<Object>;
        /** @hidden */
        promisedSendDataBytes(dataBytes: fm.icelink.DataBuffer, dataLength: number, promise: fm.icelink.Promise<Object>): void;
        /** @hidden */
        promisedSendDataString(dataString: string, dataLength: number, promise: fm.icelink.Promise<Object>): void;
        sendDataBytes(dataBytes: DataBuffer): fm.icelink.Future<Object>;
    }
}
declare namespace fm.icelink {
    /**
    Data stream base properties/methods.
    */
    abstract class WebRtcDataStreamBase<TDataChannel extends fm.icelink.WebRtcDataChannelBase<TDataChannel>> extends fm.icelink.WebRtcStream implements fm.icelink.IDataStream<TDataChannel>, fm.icelink.IStream {
        getTypeString(): string;
        /** @hidden */
        private __bytesReceived;
        /** @hidden */
        private __bytesSent;
        /** @hidden */
        private __getRemoteConnectionInfo;
        /** @hidden */
        private __messagesReceived;
        /** @hidden */
        private __messagesSent;
        /** @hidden */
        private __obsoleteCanonicalName;
        /**
        Initializes a new instance of the [[fm.icelink.dataStreamBase]] class.
        */
        constructor();
        /**
        Attaches a data channel to this stream (events and IDs).
        @param channel
        */
        protected attachToChannel(channel: TDataChannel): void;
        /**
        Changes this stream's direction
        */
        changeDirection(newDirection: fm.icelink.StreamDirection): fm.icelink.Error;
        /**
        Gets the number of bytes received.
        */
        getBytesReceived(): number;
        /**
        Gets the number of bytes sent.
        */
        getBytesSent(): number;
        /**
        Gets the canonical name. Getting the value of DataStream.CanonicalName is deprecated and will be removed in a future release.
        */
        getCanonicalName(): string;
        /**
        Gets the channels.
        */
        abstract getChannels(): TDataChannel[];
        /**
        Gets the current direction.
        */
        getDirection(): fm.icelink.StreamDirection;
        /** @hidden */
        getDirectionCapabilities(): fm.icelink.StreamDirection;
        /** @hidden */
        getGetRemoteConnectionInfo(): fm.icelink.IFunction1<string, Object>;
        /**
        Gets the data stream info.
        */
        getInfo(): fm.icelink.DataStreamInfo;
        /**
        Gets a label that identifies this class.
        */
        getLabel(): string;
        /**
        Gets the current direction.
        */
        getLocalDirection(): fm.icelink.StreamDirection;
        /**
        Gets the number of messages received.
        */
        getMessagesReceived(): number;
        /**
        Gets the number of messages sent.
        */
        getMessagesSent(): number;
        /**
        Gets the current direction.
        */
        getRemoteDirection(): fm.icelink.StreamDirection;
        /**
        Processes a state change.
        */
        protected processStateChange(): void;
        /**
        Processes a state lock change.
        */
        protected processStateLockChange(): void;
        /**
        Registers that a data has been received.
        @param dataLength The data length.
        */
        protected registerDataReceived(dataLength: number): void;
        /**
        Registers that a data has been received.
        @param dataLength The data length.
        */
        protected registerDataSent(dataLength: number): void;
        /** @hidden */
        setCanonicalName(canonicalName: string): void;
        /** @hidden */
        setGetRemoteConnectionInfo(value: fm.icelink.IFunction1<string, Object>): void;
        /**
        Sets the current direction.
        */
        setLocalDirection(value: fm.icelink.StreamDirection): void;
        /** @hidden */
        setRemoteDirection(value: fm.icelink.StreamDirection): void;
    }
}
declare namespace fm.icelink {
    class WebRtcDataStream extends WebRtcDataStreamBase<WebRtcDataChannel> implements IInternalDataStream {
        getTypeString(): string;
        processSdpMediaDescription(sdpMessage: sdp.Message, sdpMediaDescription: sdp.MediaDescription, index: number, isLocalDescription: boolean, isOffer: boolean, isRenegotiation: boolean): Error;
        /** @hidden */
        private _external;
        /** @hidden */
        _getExternal(): IExternalDataStream;
        /** @hidden */
        private _channels;
        constructor(external: IExternalDataStream, channels: WebRtcDataChannel[]);
        getChannels(): WebRtcDataChannel[];
    }
}
declare namespace fm.icelink {
    class WebRtcDomAudioSink extends Dynamic implements /*ISoundSink<HTMLElement>,*/ IInternal<DomAudioSink> {
        getTypeString(): string;
        getTrack(): WebRtcAudioTrack;
        getLocal(): boolean;
        getAudio(): HTMLAudioElement;
        getVolume(): number;
        setVolume(volume: number): void;
        getMuted(): boolean;
        setMuted(muted: boolean): void;
        constructor(external: DomAudioSink, track: WebRtcAudioTrack);
        setTrack(track: WebRtcAudioTrack): boolean;
        private playAudio;
    }
}
declare namespace fm.icelink {
    class WebRtcDomVideoSink extends Dynamic implements IInternalDomVideoSink {
        getTypeString(): string;
        getTrack(): WebRtcVideoTrack;
        getLocal(): boolean;
        getView(): HTMLElement;
        getViewScale(): LayoutScale;
        setViewScale(viewScale: LayoutScale): void;
        getViewMirror(): boolean;
        setViewMirror(viewMirror: boolean): void;
        getVideo(): HTMLVideoElement;
        getVideoWidth(): number;
        getVideoHeight(): number;
        getVolume(): number;
        setVolume(volume: number): void;
        getMuted(): boolean;
        setMuted(muted: boolean): void;
        destroy(): void;
        constructor(external: IExternalDomVideoSink, track: WebRtcVideoTrack);
        setTrack(track: WebRtcVideoTrack): boolean;
        private playVideo;
        private applyScale;
    }
}
declare namespace fm.icelink {
    /**
    A collection of audio/video track base methods/properties.
    */
    abstract class WebRtcMediaBase<TIAudioTrack extends fm.icelink.IAudioTrack, TIVideoTrack extends fm.icelink.IVideoTrack> extends fm.icelink.Dynamic implements fm.icelink.IMedia<TIAudioTrack, TIVideoTrack> {
        getTypeString(): string;
        /** @hidden */
        private _id;
        /**
        Initializes a new instance of the [[fm.icelink.mediaBase]] class.
        */
        constructor();
        /**
        Adds a handler that is raised when the first audio track is destroyed.
        */
        abstract addOnAudioDestroyed(value: fm.icelink.IAction0): void;
        /**
        Adds a handler that is raised whenever the level of the first audio track is calculated.
        */
        abstract addOnAudioLevel(value: fm.icelink.IAction1<number>): void;
        /**
        Adds a handler that is raised when the first video track is destroyed.
        */
        abstract addOnVideoDestroyed(value: fm.icelink.IAction0): void;
        /**
        Adds a handler that is raised whenever the size of the first video track is calculated.
        */
        abstract addOnVideoSize(value: fm.icelink.IAction1<fm.icelink.Size>): void;
        /**
        Destroys this media.
        */
        abstract destroy(): void;
        /**
        Gets a value indicating the gain (input amplification) of the first audio track.
        */
        getAudioGain(): number;
        /**
        Gets a value indicating whether the first audio track is muted.
        */
        getAudioMuted(): boolean;
        /**
        Gets the first audio track.
        */
        getAudioTrack(): TIAudioTrack;
        /**
        Gets the audio tracks.
        */
        abstract getAudioTracks(): TIAudioTrack[];
        /**
        Gets a value indicating the volume (output resistance) of the first audio track.
        */
        getAudioVolume(): number;
        /**
        Gets the identifier.
        */
        getId(): string;
        /**
        Gets a value indicating whether the first video track is muted.
        */
        getVideoMuted(): boolean;
        /**
        Gets the size of the first video track.
        */
        abstract getVideoSize(): fm.icelink.Size;
        /**
        Gets the first video track.
        */
        getVideoTrack(): TIVideoTrack;
        /**
        Gets the video tracks.
        */
        abstract getVideoTracks(): TIVideoTrack[];
        /**
        Grabs a frame from the first video track.
        */
        abstract grabVideoFrame(): fm.icelink.Future<fm.icelink.VideoBuffer>;
        /**
        Removes a handler that is raised when the first audio track is destroyed.
        */
        abstract removeOnAudioDestroyed(value: fm.icelink.IAction0): void;
        /**
        Removes a handler that is raised whenever the level of the first audio track is calculated.
        */
        abstract removeOnAudioLevel(value: fm.icelink.IAction1<number>): void;
        /**
        Removes a handler that is raised when the first video track is destroyed.
        */
        abstract removeOnVideoDestroyed(value: fm.icelink.IAction0): void;
        /**
        Removes a handler that is raised whenever the size of the first video track is calculated.
        */
        abstract removeOnVideoSize(value: fm.icelink.IAction1<fm.icelink.Size>): void;
        /**
        Sets a value indicating the gain (input amplification) of the first audio track.
        */
        setAudioGain(value: number): void;
        /**
        Sets a value indicating whether the first audio track is muted.
        */
        setAudioMuted(value: boolean): void;
        /**
        Sets a value indicating the volume (output resistance) of the first audio track.
        */
        setAudioVolume(value: number): void;
        /**
        Sets the identifier.
        */
        setId(value: string): void;
        /**
        Sets a value indicating whether the first video track is muted.
        */
        setVideoMuted(value: boolean): void;
    }
}
declare type fmicelinkGlobalMediaStream = MediaStream;
declare namespace fm.icelink {
    abstract class WebRtcMedia<TAudioTrack extends WebRtcAudioTrack, TVideoTrack extends WebRtcVideoTrack> extends WebRtcMediaBase<WebRtcAudioTrack, WebRtcVideoTrack> implements IMedia<WebRtcAudioTrack, WebRtcVideoTrack>, IInternalMedia {
        getTypeString(): string;
        protected _setAudioMediaStream(audioMediaStream: fmicelinkGlobalMediaStream): boolean;
        protected _setVideoMediaStream(videoMediaStream: fmicelinkGlobalMediaStream): boolean;
        constructor(external: any | IExternalMedia);
        addOnAudioDestroyed(value: IAction0): void;
        addOnVideoDestroyed(value: IAction0): void;
        removeOnAudioDestroyed(value: IAction0): void;
        removeOnVideoDestroyed(value: IAction0): void;
        addOnAudioLevel(value: IAction1<number>): void;
        addOnVideoSize(value: IAction1<Size>): void;
        destroy(): void;
        getAudioGain(): number;
        getAudioTracks(): WebRtcAudioTrack[];
        getAudioVolume(): number;
        getVideoSize(): Size;
        getVideoTracks(): WebRtcVideoTrack[];
        getView(): HTMLElement;
        getViewSink(): WebRtcDomVideoSink;
        grabVideoFrame(): Future<VideoBuffer>;
        removeOnAudioLevel(value: IAction1<number>): void;
        removeOnVideoSize(value: IAction1<Size>): void;
        setAudioGain(value: number): void;
        setAudioVolume(value: number): void;
        protected initializeAudioContext(): void;
        protected destroyAudioContext(): void;
    }
}
declare namespace fm.icelink {
    /**
    A collection of local audio/video track base methods.
    */
    abstract class WebRtcLocalMediaBase<TLocalMedia extends fm.icelink.WebRtcLocalMediaBase<TLocalMedia, TAudioTrack, TVideoTrack>, TAudioTrack extends fm.icelink.WebRtcAudioTrack, TVideoTrack extends fm.icelink.WebRtcVideoTrack> extends fm.icelink.WebRtcMedia<TAudioTrack, TVideoTrack> {
        getTypeString(): string;
        /** @hidden */
        private __audioEncodingsSet;
        /** @hidden */
        private __audioEncodingsSetLock;
        /** @hidden */
        private __stateLock;
        /** @hidden */
        private __videoEncodingsSet;
        /** @hidden */
        private __videoEncodingsSetLock;
        /** @hidden */
        private _state;
        private fmicelinkWebRtcLocalMediaBaseInit;
        /**
        Initializes a new instance of the [[fm.icelink.localMediaBase]] class.
        @param external The external.
        */
        constructor(external: Object);
        /**
        Aborts the start.
        @param promise The promise.
        @param exception The exception.
        */
        protected abortStart(promise: fm.icelink.Promise<TLocalMedia>, exception: fm.icelink.Exception): void;
        /**
        Gets the local audio encodings.
        @return The local audio encodings.
        */
        protected abstract doGetAudioEncodings(): fm.icelink.AudioEncodingConfig[];
        /**
        Gets the local video encodings.
        @return The local video encodings.
        */
        protected abstract doGetVideoEncodings(): fm.icelink.VideoEncodingConfig[];
        /**
        Sets the local audio encodings.
        @param encodings The local audio encodings.
        */
        protected abstract doSetAudioEncodings(encodings: fm.icelink.AudioEncodingConfig[]): void;
        /**
        Sets the local video encodings.
        @param encodings The local video encodings.
        */
        protected abstract doSetVideoEncodings(encodings: fm.icelink.VideoEncodingConfig[]): void;
        /**
        Starts the local media.
        */
        protected abstract doStart(): fm.icelink.Future<TLocalMedia>;
        /**
        Stops the local media.
        */
        protected abstract doStop(): fm.icelink.Future<TLocalMedia>;
        /**
        Gets the first (primary) local audio encoding.
        */
        getAudioEncoding(): fm.icelink.AudioEncodingConfig;
        /**
        Gets the local audio encodings.
        */
        getAudioEncodings(): fm.icelink.AudioEncodingConfig[];
        /**
        Gets the state.
        */
        getState(): fm.icelink.LocalMediaState;
        /**
        Gets the first (primary) local video encoding.
        */
        getVideoEncoding(): fm.icelink.VideoEncodingConfig;
        /**
        Gets the local video encodings.
        */
        getVideoEncodings(): fm.icelink.VideoEncodingConfig[];
        /**
        Sets the local audio encodings.
        */
        setAudioEncodings(value: fm.icelink.AudioEncodingConfig[]): void;
        /** @hidden */
        private setState;
        /**
        Sets the local video encodings.
        */
        setVideoEncodings(value: fm.icelink.VideoEncodingConfig[]): void;
        /**
        Starts the media track sources.
        */
        start(): fm.icelink.Future<TLocalMedia>;
        /** @hidden */
        private startInternal;
        /**
        Stops the media track sources.
        */
        stop(): fm.icelink.Future<TLocalMedia>;
        /** @hidden */
        private stopInternal;
    }
}
declare namespace fm.icelink {
    class WebRtcLocalMedia extends WebRtcLocalMediaBase<WebRtcLocalMedia, WebRtcAudioTrack, WebRtcVideoTrack> implements ILocalMedia<WebRtcLocalMedia, WebRtcAudioTrack, WebRtcVideoTrack>, IInternalLocalMedia {
        getTypeString(): string;
        addOnAudioStarted(value: IAction0): void;
        addOnAudioStopped(value: IAction0): void;
        addOnVideoStarted(value: IAction0): void;
        addOnVideoStopped(value: IAction0): void;
        removeOnAudioStarted(value: IAction0): void;
        removeOnAudioStopped(value: IAction0): void;
        removeOnVideoStarted(value: IAction0): void;
        removeOnVideoStopped(value: IAction0): void;
        getAudioSourceInputs(): Future<SourceInput[]>;
        getVideoSourceInputs(): Future<SourceInput[]>;
        private getSourceInputs;
        private _audioSourceInput;
        getAudioSourceInput(): SourceInput;
        setAudioSourceInput(audioInput: SourceInput): void;
        private _videoSourceInput;
        getVideoSourceInput(): SourceInput;
        setVideoSourceInput(videoInput: SourceInput): void;
        getAudio(): any;
        setAudio(audio: any): void;
        getVideo(): any;
        setVideo(video: any): void;
        getScreen(): boolean;
        setScreen(screen: boolean): void;
        getAudioConstraints(): MediaTrackConstraints;
        getVideoConstraints(): MediaTrackConstraints;
        changeAudioConstraints(audioConstraints: MediaTrackConstraints): Future<Object>;
        changeVideoConstraints(videoConstraints: MediaTrackConstraints): Future<Object>;
        changeAudioSourceInput(audioSourceInput: SourceInput): Future<Object>;
        changeVideoSourceInput(videoSourceInput: SourceInput): Future<Object>;
        constructor(external: IExternalLocalMedia, audio: any, video: any, screen?: boolean);
        doStart(): Future<WebRtcLocalMedia>;
        private doStartInternal;
        doStop(): Future<WebRtcLocalMedia>;
        protected doGetAudioEncodings(): AudioEncodingConfig[];
        protected doSetAudioEncodings(encodings: AudioEncodingConfig[]): void;
        protected doGetVideoEncodings(): VideoEncodingConfig[];
        protected doSetVideoEncodings(encodings: VideoEncodingConfig[]): void;
    }
}
declare namespace fm.icelink {
    class WebRtcRemoteMedia extends WebRtcMedia<WebRtcAudioTrack, WebRtcVideoTrack> implements IRemoteMedia<WebRtcAudioTrack, WebRtcVideoTrack>, IInternalRemoteMedia {
        getTypeString(): string;
        constructor(external: IExternalRemoteMedia);
        getAudioSinkOutputs(): Future<SinkOutput[]>;
        getVideoSinkOutputs(): Future<SinkOutput[]>;
        private getSinkOutputs;
        getAudioSinkOutput(): SinkOutput;
        setAudioSinkOutput(audioSinkOutput: SinkOutput): void;
        private attachAudioSinkOutput;
        getVideoSinkOutput(): SinkOutput;
        setVideoSinkOutput(videoSinkOutput: SinkOutput): void;
        changeAudioSinkOutput(audioInput: SinkOutput): Future<Object>;
        changeVideoSinkOutput(videoInput: SinkOutput): Future<Object>;
    }
}
declare namespace fm.icelink {
    class WebRtcVideoStream extends WebRtcMediaStream<WebRtcVideoTrack> implements IVideoStream, IInternalVideoStream {
        getTypeString(): string;
        /** @hidden */
        private _external;
        /** @hidden */
        _getExternal(): IExternalVideoStream;
        constructor(external: IExternalVideoStream, localTrack: WebRtcVideoTrack, remoteTrack: WebRtcVideoTrack);
        getVp8Disabled(): boolean;
        getVp9Disabled(): boolean;
        getH264Disabled(): boolean;
        setVp8Disabled(value: boolean): void;
        setVp9Disabled(value: boolean): void;
        setH264Disabled(value: boolean): void;
    }
}
declare namespace fm.icelink {
    class WebRtcVideoTrack extends WebRtcMediaTrack implements IVideoTrack, IInternalVideoTrack {
        getTypeString(): string;
        constructor(external: IExternalVideoTrack, media: WebRtcMedia<WebRtcAudioTrack, WebRtcVideoTrack>);
        setConfig(config: VideoConfig): void;
        private isLocal;
        changeSinkOutput(sinkOutput: SinkOutput): Future<Object>;
        getSinkOutput(): SinkOutput;
        getSinkOutputs(): Future<SinkOutput[]>;
        setSinkOutput(value: SinkOutput): void;
        changeSourceInput(sourceInput: SourceInput): Future<Object>;
        getSourceInput(): SourceInput;
        getSourceInputs(): Future<SourceInput[]>;
        setSourceInput(value: SourceInput): void;
        addOnSize(value: IAction1<Size>): void;
        getSize(): Size;
        grabFrame(): Future<VideoBuffer>;
        removeOnSize(value: IAction1<Size>): void;
    }
}
declare namespace fm.icelink {
    /**
    A crypto library.
    */
    enum CryptoLibrary {
        /**
        Indicates that the default library should be used.
        */
        Default = 1
    }
}
declare namespace fm.icelink {
    /**
    Address types.
    */
    enum AddressType {
        /**
        Indicates an IP version 4 address.
        */
        IPv4 = 1,
        /**
        Indicates an IP version 6 address.
        */
        IPv6 = 2,
        /**
        Indicates an unknown address type.
        */
        Unknown = 3
    }
}
declare namespace fm.icelink {
    /** @hidden */
    enum JsonCheckerMode {
        Array = 1,
        Done = 2,
        Key = 3,
        Object = 4,
        String = 5
    }
}
declare namespace fm.icelink {
    /**
    An operating system.
    */
    enum OperatingSystem {
        /**
        Indicates an unknown or default OS.
        */
        Unknown = 1,
        /**
        Indicates a Windows operating system.
        */
        Windows = 2,
        /**
        Indicates a Android operating system.
        */
        Android = 3,
        /**
        Indicates a macOS operating system.
        */
        MacOS = 4,
        /**
        Indicates a iOS operating system.
        */
        IOS = 5,
        /**
        Indicates a Linux operating system.
        */
        Linux = 6,
        /**
        Indicates a tvOS operating system.
        */
        TvOS = 7,
        /**
        Indicates a watchOS operating system.
        */
        WatchOS = 8
    }
}
declare namespace fm.icelink {
    /**
    A CPU architecture.
    */
    enum Architecture {
        /**
        Indicates an unknown or default CPU architecture.
        */
        Unknown = 1,
        /**
        Indicates an Intel-based 32-bit CPU architecture.
        */
        X86 = 2,
        /**
        Indicates an Intel-based 64-bit CPU architecture.
        */
        X64 = 3,
        /**
        Indicates an ARMv7-based 32-bit CPU architecture.
        */
        Armv7 = 4,
        /**
        Indicates an ARMv8-based 32-bit CPU architecture.
        */
        Armv8 = 5,
        /**
        Indicates an ARM-based 64-bit CPU architecture.
        */
        Arm64 = 6,
        /**
        Indicates a MIPS-based 32-bit CPU architecture.
        */
        Mips = 7,
        /**
        Indicates a MIPS-based 64-bit CPU architecture.
        */
        Mips64 = 8
    }
}
declare namespace fm.icelink {
    /**
    A protocol type.
    */
    enum ProtocolType {
        /**
        Indicates the UDP protocol.
        */
        Udp = 1,
        /**
        Indicates the TCP protocol.
        */
        Tcp = 2,
        /**
        Indicates the TLS protocol.
        */
        Tls = 3,
        /**
        Indicates an unknown protocol.
        */
        Unknown = 4
    }
}
declare namespace fm.icelink {
    /**
    A source language.
    */
    enum SourceLanguage {
        /**
        Indicates that the source language is C#.
        */
        CSharp = 1,
        /**
        Indicates that the source language is Java.
        */
        Java = 2,
        /**
        Indicates that the source language is Objective-C.
        */
        ObjectiveC = 3,
        /**
        Indicates that the source language is TypeScript.
        */
        TypeScript = 4
    }
}
declare namespace fm.icelink {
    /** @hidden */
    enum StringType {
        None = 1,
        Single = 2,
        Double = 3
    }
}
declare namespace fm.icelink {
    /**
    The compare result in a sort operation.
    */
    enum CompareResult {
        /**
        Indicates that the two elements are equal.
        */
        Equal = 1,
        /**
        Indicates that the first element belongs before the second.
        */
        Negative = 2,
        /**
        Indicates that ths second element belongs before the first.
        */
        Positive = 3
    }
}
declare namespace fm.icelink {
    /**
    A hash algorithm.
    */
    enum HashType {
        /**
        Indciates MD5.
        */
        Md5 = 1,
        /**
        Indicates SHA1.
        */
        Sha1 = 2,
        /**
        Indicates SHA256.
        */
        Sha256 = 3
    }
}
declare namespace fm.icelink {
    /**
    A message authentication code (MAC) algorithm.
    */
    enum MacType {
        /**
        Indicates HMAC-MD5.
        */
        HmacMd5 = 1,
        /**
        Indicates HMAC-SHA1
        */
        HmacSha1 = 2,
        /**
        Indicates HMAC-SHA256
        */
        HmacSha256 = 3
    }
}
declare namespace fm.icelink {
    /**
    Error codes are six digit values, where the first three digits indicate component, while the remaining three digits particular problem with the component.
    */
    enum ErrorCode {
        /**
        Indicates that the socket encountered an error while sending.
        */
        SocketSendError = 100000,
        /**
        Indicates that the socket encountered an error while receiving.
        */
        SocketReceiveError = 100001,
        /**
        Indicates that the socket is closed.
        */
        SocketClosed = 100002,
        /**
        Indicates that the socket's send buffer is full.
        */
        SocketSendBufferFull = 100003,
        /**
        Indicates the IP Protocol mismatch has occurred.
        */
        IPProtocolMismatch = 100004,
        /**
        Indicates the supplied Turn relay server is invalid or not resolved.
        */
        PacketTooLarge = 100005,
        /**
        300 Try Alternate. RFC5389. Indicates that a server using this extension redirects a client to another server by replying to a request message with an error response message with an error code of 300 (Try Alternate). The server MUST include an ALTERNATE-SERVER attribute in the error response.  The error response message MAY be authenticated; however, there are uses cases for ALTERNATE-SERVER where authentication of the response is not possible or practical.
        */
        StunTryAlternate = 114000,
        /**
        400 Bad Request. RFC5389. Idicates that the original request was malformed.  The client SHOULD NOT retry the request without modification from the previous attempt.  The server may not be able to generate a valid MESSAGE-INTEGRITY for this error, so the client MUST NOT expect a valid MESSAGE-INTEGRITY attribute on this response.
        */
        StunBadRequest = 114001,
        /**
        401  Unauthorized. RFC5389. Indicates that the request did not contain the correct credentials to proceed.  The client should retry the request with proper credentials.
        */
        StunUnauthorized = 114002,
        /**
        403 Forbidden. RFC 5766. Indicates that the request is valid, but the server is refusing to perform it, likely due to administrative restrictions. The client considers the current transaction as having failed. The client MAY notify the user or operator and SHOULD NOT retry the same request with this server until it believes the problem has been fixed.
        */
        StunTurnForbidden = 114003,
        /**
        405 Mobility Forbidden. RFC 8016. Indicates that the request is valid, but the server is refusing to perform it, likely due to administrative restrictions. The client considers the current transaction as having failed. The client can notify the user or operator.  The client SHOULD NOT retry sending the Allocate request containing the MOBILITY-TICKET with this server until it believes the problem has been fixed.
        */
        StunTurnMobilityForbidden = 114004,
        /**
        420  Unknown Attribute. RFC5389. Indicates that the server received a STUN packet containing a comprehension-required attribute that it did not understand. The server MUST put this unknown attribute in the UNKNOWN-ATTRIBUTE attribute of its error response.
        */
        StunUnknownAttribute = 114005,
        /**
        430 Stale credentials; the shared secret sent in the request is expired; the client should obtain a new shared secret.
        */
        StunStaleCredentials = 114006,
        /**
        431 Integrity Check Failure.
        */
        StunIntegrityCheckFailure = 114007,
        /**
        432 Missing Username; the username attribute is not present in the request.
        */
        StunMissingUsername = 114008,
        /**
        437 Allocation Mismatch. RFC 5766. This indicates that the client has picked a 5-tuple that the server sees as already in use. One way this could happen is if an intervening NAT assigned a mapped transport address that was used by another client that recently crashed.  The client considers the current transaction as having failed. The client SHOULD pick another client transport address and retry the Allocate request (using a different transaction id). The client SHOULD try three different client transport addresses before giving up on this server.Once the client gives up on the server, it SHOULD NOT try to create another allocation on the server for 2 minutes.
        */
        StunTurnAllocationMismatch = 114009,
        /**
        438 Stale Nonce. RFC5389. Indicates that the NONCE used by the client was no longer valid. The client should retry, using the NONCE provided in the response.
        */
        StunStaleNonce = 114010,
        /**
        440 Address Family Not Supported. RFC 6156. Indicates that the server does not support the address family requested by the client.
        */
        StunAddressFamilyNotSupported = 114011,
        /**
        441 Wrong Credentials. RFC 5766. Indicates that wrong credential were used by the client. The client should not receive this error in response to an Allocate request.  The client MAY notify the user or operator and SHOULD NOT retry the same request with this server until it believes the problem has been fixed.
        */
        StunTurnWrongCredentials = 114012,
        /**
        442 Unsupported Transport Protocol. The client should not receive this error in response to a request for a UDP allocation. The client MAY notify the user or operator and SHOULD NOT reattempt the request with this server until it believes the problem has been fixed.
        */
        StunTurnUnsupportedTransportProtocol = 114013,
        /**
        443 Peer Address Family Mismatch. A peer address was of a different address family than that of the relayed transport address of the allocation.
        */
        StunTurnPeerAddressFamilyMismatch = 114014,
        /**
        446 Connection Already exists. This indicates that either 1) the server is currently processing a Connect request for this allocation with the same XOR-PEER-ADDRESS; OR 2) the server has already successfully processed a Connect request for this allocation with the same XOR-PEER-ADDRESS, and the resulting client and peer data connections are either pending or active
        */
        StunTurnConnectionAlreadyExists = 114015,
        /**
        447 Connection Timeout or Failure. This indicates that the TURN server was unable to connect to the peer. The client MAY retry with the same XOR-PEER-ADDRESS attribute, but MUST wait at least 10 seconds.
        */
        StunTurnConnectionTimeoutOrFailure = 114016,
        /**
        486 Allocation Quota Reached. The server is currently unable to create any more allocations with this username.  The client considers the current transaction as having failed. The client SHOULD wait at least 1 minute before trying to create any more allocations on the server.
        */
        StunTurnAllocationQuotaReached = 114017,
        /**
        487 Role Conflict. The Binding request contained either the ICE-CONTROLLING or ICE-CONTROLLED attribute, indicating a role that conflicted with the server. The server ran a tie-breaker based on the tie-breaker value in the request and determined that the client needs to switch roles.
        */
        StunIceRoleConflict = 114018,
        /**
        500 Server Error. RFC5389. Indicates that the server has suffered a temporary error. The client should try again.
        */
        StunServerError = 114019,
        /**
        508 Insufficient Capacity. The server has no more relayed transport addresses available, or has none with the requested properties, or the one that was reserved is no longer available. The client considers the current operation as having failed. If the client is using either the EVEN-PORT or the RESERVATION-TOKEN attribute, then the client MAY choose to remove or modify this attribute and try again immediately.  Otherwise, the client SHOULD wait at least 1 minute before trying to create any more allocations on this server.
        */
        StunTurnInsufficientCapacity = 114020,
        /**
        Indicates Invalid Response Type, where message type obtained in reponse to a request is of unexpected type.
        */
        StunInvalidResponseType = 114021,
        /**
        Indicates that a failed response does not contain an error code or when the error code is inconsistent with the contents of the response.
        */
        StunInvalidErrorCode = 114022,
        /**
        Indicates Invalid Stun Transaction Id
        */
        StunInvalidTransactionId = 114023,
        /**
        Indicates Unknown Stun Error Code
        */
        StunUnknownStunErrorCode = 114024,
        /**
        Indicates Invalid Stun Message Integrity
        */
        StunInvalidMessageIntegrity = 114025,
        /**
        Indicates that the stream socket ip is invalid, remote server ip is invalid or there is a mimatch in the the ip of the socket and the remote server ip version
        */
        SocketIPError = 115001,
        /**
        Indicates the local relayed candidate could not be processed.
        */
        IceLocalRelayedDatagramCandidateError = 101000,
        /**
        Indicates the local server reflexive could not be processed.
        */
        IceLocalServerReflexiveCandidateError = 101001,
        /**
        Indicates that an operation was attempted in an invalid state.
        */
        SocketManagerInvalidState = 101002,
        /**
        Indicates that the ICE gatherer could not be started.
        */
        IceStartError = 102000,
        /**
        Indicates that RTCP datagram sockets were assigned incorrectly after the gatherer was started.
        */
        IceUnsuitableSocketAssignment = 102001,
        /**
        Indicates that all ports are in use.
        */
        IceAllPortsInUse = 102002,
        /**
        Indicates that no local addresses were found.
        */
        IceLocalAddressUnavailable = 102003,
        /**
        Indicates that an Ice Gatherer error occurred.
        */
        IceGenericGathererError = 102004,
        /**
        Indicates that the relayed candidate refresh request timed out.
        */
        IceRefreshTimeout = 103000,
        /**
        Indicates that the relayed candidate refresh request failed.
        */
        IceRefreshError = 103001,
        /**
        Indicates that the candidate pair create-permission request timed out.
        */
        IceCreatePermissionTimeout = 104000,
        /**
        Indicates that the candidate pair create-permission request failed.
        */
        IceCreatePermissionError = 104001,
        /**
        Indicates that connectivity checks failed on the candidate pair.
        */
        IceConnectivityCheckFailed = 104002,
        /**
        Indicates that the ICE transport encountered an error while sending.
        */
        IceSendError = 105000,
        /**
        Indicates that the ICE transport encountered a problem creating a peer reflexive candidate.
        */
        IcePeerReflexiveError = 105001,
        /**
        Indicates that the IcePolicy requirements are not supported by the remote client.
        */
        IncompatibleIceSetup = 105002,
        /**
        Indicates that an internal DTLS error occurred.
        */
        DtlsInternalError = 106000,
        /**
        Indicates that the DTLS key exchange failed.
        */
        DtlsKeyExchangeFailed = 106001,
        /**
        Indicates that a DTLS message was received before the DTLS endpoint was ready.
        */
        DtlsNotReady = 106002,
        /**
        Indicates that an SCTP message had no payload data.
        */
        SctpNoPayloadData = 107000,
        /**
        Indicates that an attempt was made to send data on an unsupported stream.
        */
        SctpUnsupportedStream = 107001,
        /**
        Indicates that an operation was attempted while in a state that doesn't allow it.
        */
        SctpInvalidState = 107002,
        /**
        Indicates that an internal SCTP error occurred.
        */
        SctpInternalError = 107003,
        /**
        Indicates the media transport failed.
        */
        MediaTransportFailed = 108000,
        /**
        Indicates that the reliable data channel encountered an error while opening.
        */
        ReliableDataChannelOpenError = 109000,
        /**
        Indicates that the reliable data channel encountered an error while sending.
        */
        ReliableDataChannelSendError = 109001,
        /**
        Indicates that the connection architecture is invalid.
        */
        ConnectionInvalidArchitecture = 110000,
        /**
        Indicates that an internal connection error occurred.
        */
        ConnectionInternalError = 110001,
        /**
        Indicates that the connection's inner transport could not be started.
        */
        ConnectionTransportStartError = 110002,
        /**
        Indicates that the connection's inner transport is closed.
        */
        ConnectionTransportClosed = 110003,
        /**
        Indicates that a connection has failed connectivity checks for an extended period.
        */
        ConnectionDeadStream = 110004,
        /**
        Indicates that a connection has not been established within allocated timeframe.
        */
        ConnectionNotEstablished = 110005,
        /**
        Indicates that the remote end of the connection signalled failure.
        */
        ConnectionRemoteFailure = 110006,
        /**
        Indicates that simulcast is not supported.
        */
        ConnectionSimulcastNotSupported = 110007,
        /**
        Indicates that the stream was disabled.
        */
        StreamDisabled = 111000,
        /**
        Indicates that the local and remote stream encryption modes are not compatible.
        */
        StreamEncryptionMismatch = 111001,
        /**
        Indicates that the local and remote stream directions are not compatible.
        */
        StreamDirectionMismatch = 111002,
        /**
        Indicates that an attempt was made to modify Data Stream direction; however, this is not allowed.
        */
        DataStreamDirectionCannotBeChanged = 111003,
        /**
        Indicates that a Media Stream direction change attempt was made; however, new direction setting is not supported by the existing stream capabilities (inputs or outpus are missing).
        */
        InvalidStreamDirectionChange = 111004,
        /**
        Indicates that an error was encountered while processing the local description.
        */
        LocalDescriptionError = 112000,
        /**
        Indicates that an error was encountered while processing the remote description.
        */
        RemoteDescriptionError = 112001,
        /**
        Indicates the local relayed candidate could not be processed.
        */
        IceLocalRelayedStreamCandidateError = 113000,
        /**
        Indicates the supplied Turn relay server is invalid or not resolved
        */
        IceInvalidServerAssignmentError = 113001
    }
}
declare namespace fm.icelink {
    /**
    The method used by an HTTP request.
    */
    enum HttpMethod {
        /**
        Indicates a GET request.
        */
        Get = 1,
        /**
        Indicates a HEAD request.
        */
        Head = 2,
        /**
        Indicates a POST request.
        */
        Post = 3,
        /**
        Indicates a PUT request.
        */
        Put = 4,
        /**
        Indicates a PATCH request.
        */
        Patch = 5,
        /**
        Indicates a DELETE request.
        */
        Delete = 6
    }
}
declare namespace fm.icelink {
    /**
    The level at which to log.
    */
    enum LogLevel {
        /**
        Logs extensive messages detailing the program's state for troubleshooting.
        */
        Verbose = 1,
        /**
        Logs messages relevant to development and troubleshooting.
        */
        Debug = 2,
        /**
        Logs messages relevant to expected use.
        */
        Info = 3,
        /**
        Logs messages relevant to potential pit-falls.
        */
        Warn = 4,
        /**
        Logs messages relevant to errors that allow program execution to continue.
        */
        Error = 5,
        /**
        Logs messages relevant to errors that require the program to terminate.
        */
        Fatal = 6,
        /**
        Logs nothing.
        */
        None = 7
    }
}
declare namespace fm.icelink {
    /**
    The state of a future.
    */
    enum FutureState {
        /**
        Indicates that the promise has not been resolved or rejected.
        */
        Pending = 1,
        /**
        Indicates that the promise has been resolved.
        */
        Resolved = 2,
        /**
        Indicates that the promise has been rejected.
        */
        Rejected = 3
    }
}
declare namespace fm.icelink {
    /**
    An enumeration of potential WebSocket status codes.
    */
    enum WebSocketStatusCode {
        /**
        Indicates normal closure, meaning that the purpose for which the connection was established has been fulfilled.
        */
        Normal = 1000,
        /**
        Indicates that an endpoint is "going away", such as a server going down or a browser having navigated away from a page.
        */
        GoingAway = 1001,
        /**
        Indicates that an endpoint is terminating the connection due to a protocol error.
        */
        ProtocolError = 1002,
        /**
        Indicates that an endpoint is terminating the connection because it has received a type of data that it cannot accept.
        */
        InvalidType = 1003,
        /**
        Indicates that no status code was present in the Close frame. Reserved for use outside Close frames.
        */
        NoStatus = 1005,
        /**
        Indicates that the connection was closed abnormally, without sending a Close frame. Reserved for use outside Close frames.
        */
        Abnormal = 1006,
        /**
        Indicates that an endpoint is terminating the connection because it has received data within a message that was not consistent with the type of message.
        */
        InvalidData = 1007,
        /**
        Indicates that an endpoint is terminating the connection because it has received a message that violates its policy.
        */
        PolicyViolation = 1008,
        /**
        Indicates that an endpoint is terminating the connection because it has received a message that is too big for it to process.
        */
        MessageTooLarge = 1009,
        /**
        Indicates that the client is terminating the connection because it has expected the server to negotiate one or more extensions, but the server didn't return them in the response message of the WebSocket handshake.
        */
        UnsupportedExtension = 1010,
        /**
        Indicates that the server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.
        */
        UnexpectedCondition = 1011,
        /**
        Indicates that the connection was closed due to a failure to perform a TLS handshake. Reserved for use outside Close frames.
        */
        SecureHandshakeFailure = 1015
    }
}
declare namespace fm.icelink {
    /**
    The CCM LRR policy.
    */
    enum CcmLrrPolicy {
        /**
        The usage of CCM LRR is disabled.
        */
        Disabled = 1,
        /**
        The usage of CCM LRR is negotiated with the peer.
        */
        Negotiated = 2
    }
}
declare namespace fm.icelink {
    /**
    The CCM FIR policy.
    */
    enum CcmFirPolicy {
        /**
        The usage of CCM FIR is disabled.
        */
        Disabled = 1,
        /**
        The usage of CCM FIR is negotiated with the peer.
        */
        Negotiated = 2
    }
}
declare namespace fm.icelink {
    /**
    The NACK PLI policy.
    */
    enum NackPliPolicy {
        /**
        The usage of NACK PLI is disabled.
        */
        Disabled = 1,
        /**
        The usage of NACK PLI is negotiated with the peer.
        */
        Negotiated = 2
    }
}
declare namespace fm.icelink {
    /**
    The simulcast mode.
    */
    enum SimulcastMode {
        /**
        Simulcast will not be signalled.
        */
        Disabled = 1,
        /**
        Simulcast will be signalled using RTP stream identifiers and the "simulcast" media attribute.
        */
        RtpStreamId = 3
    }
}
declare namespace fm.icelink {
    /**
    The local bundle negotiation policy. Denotes the policy this peer uses when negotiating resulting connection bundling policy.
    */
    enum BundlePolicy {
        /**
        Indicates that the first media section of each type will contain transport parameters. The second and any subsequent media sections of each type will be marked as "bundle only".
        */
        Balanced = 1,
        /**
        Indicates that all media sections will contain transport parameters. No media sections will be marked as "bundle only".
        */
        MaxCompatibility = 2,
        /**
        Indicates that only the first media section will contain transport parameters. All other media sections will be marked as "bundle only".
        */
        MaxBundle = 3,
        /**
        Indicates that all media sections will contain transport parameters. No support for bundling.
        */
        Disabled = 4
    }
}
declare namespace fm.icelink {
    /**
    Indicates encryption policy for a connection.
    */
    enum EncryptionPolicy {
        /**
        Encryption is required. If encryption is not supported by peer, connection must fail.
        */
        Required = 1,
        /**
        Encryption is preferred but not required. If the other peer does not support encryption, connection will be established without encryption.
        */
        Negotiated = 2,
        /**
        Encryption will not be available for the given connection.
        */
        Disabled = 3
    }
}
declare namespace fm.icelink {
    /**
    The state of an ICE gatherer.
    */
    enum IceConnectionState {
        /**
        Indicates that the ICE agent(s) is(are) gathering addresses or is(are) waiting to be given remote candidates (or both)..
        */
        New = 1,
        /**
        Indicates that the ICE agent(s) has(ve) been given one or more remote candidates and is(are) checking pairs of local and remote candidates against one another to try to find a compatible match, but has(ve) not yet found a pair which will allow the peer connection to be made. It's possible that gathering of candidates is also still underway.
        */
        Checking = 2,
        /**
        Indicates that a usable pairing of local and remote candidates has been found for all components of the connection, and the connection has been established. It's possible that gathering is still underway, and it's also possible that the ICE agent is still checking candidates against one another looking for a better connection to use.
        */
        Connected = 3,
        /**
        Indicates that the ICE agent has finished gathering candidates, has checked all pairs against one another, and has found a connection for all components.
        */
        Completed = 4,
        /**
        Indicates that the ICE candidate has checked all candidates pairs against one another and has failed to find compatible matches for all components of the connection. It is, however, possible that the ICE agent did find compatible connections for some components.
        */
        Failed = 5,
        /**
        Indicates that checks to ensure that components are still connected failed for at least one component of the RTCPeerConnection. This is a less stringent test than "failed" and may trigger intermittently and resolve just as spontaneously on less reliable networks, or during temporary disconnections. When the problem resolves, the connection may return to the "Connected" state.
        */
        Disconnected = 6,
        /**
        The ICE agent(s) for this RTCPeerConnection has shut down and is no longer handling requests
        */
        Closed = 7
    }
}
declare namespace fm.icelink {
    /**
    The state of an ICE gatherer.
    */
    enum IceGatheringState {
        /**
        Indicates that the gatherer has been created and no gathering has occurred yet.
        */
        New = 1,
        /**
        Indicates that the gatherer is in the process of gathering candidates.
        */
        Gathering = 2,
        /**
        Indicates that the gatherer has completed gathering candidates.
        */
        Complete = 3,
        /**
        Indicates that the gatherer has started closing intentionally via a call to stop.
        */
        Closing = 4,
        /**
        Indicates that the gatherer has been closed intentionally via a call to stop.
        */
        Closed = 5,
        /**
        Indicates that the gatherer failed due to an error.
        */
        Failed = 6
    }
}
declare namespace fm.icelink {
    /**
    The local policy for gathering candidates.
    */
    enum IceGatherPolicy {
        /**
        All candidates (host, reflexive, and relay) will be gathered.
        */
        All = 1,
        /**
        Only reflexive and relay candidates will be gathered.
        */
        NoHost = 2,
        /**
        Only relay candidates will be gathered.
        */
        Relay = 3
    }
}
declare namespace fm.icelink {
    /**
    A layout alignment definition.
    */
    enum LayoutAlignment {
        /**
        Indicates a top-left alignment.
        */
        TopLeft = 1,
        /**
        Indicates a top-center alignment.
        */
        Top = 2,
        /**
        Indicates a top-right alignment.
        */
        TopRight = 3,
        /**
        Indicates a center-left alignment.
        */
        Left = 4,
        /**
        Indicates a center-center alignment.
        */
        Center = 5,
        /**
        Indicates a center-right alignment.
        */
        Right = 6,
        /**
        Indicates a bottom-left alignment.
        */
        BottomLeft = 7,
        /**
        Indicates a bottom-center alignment.
        */
        Bottom = 8,
        /**
        Indicates a bottom-right alignment.
        */
        BottomRight = 9
    }
}
declare namespace fm.icelink {
    /**
    Specifies the direction of the layout flow.
    */
    enum LayoutDirection {
        /**
        Indicates that the layout should flow horizontally, filling rows as needed.
        */
        Horizontal = 1,
        /**
        Indicates that the layout should flow vertically, filling columns as needed.
        */
        Vertical = 2
    }
}
declare namespace fm.icelink {
    /**
    Specifies the layout mode that should be used.
    */
    enum LayoutMode {
        /**
        Indicates that the local video feed should be displayed as a floating element above the remote video feeds.
        */
        FloatLocal = 1,
        /**
        Indicates that the remote video feeds should be displayed as floating elements above the local video feed.
        */
        FloatRemote = 2,
        /**
        Indicates that the video feed should be displayed as a block element on its own row, separate from other video feeds.
        */
        Block = 3,
        /**
        Indicates that the video feed should be displayed as an inline element that shares a row with other video feeds.
        */
        Inline = 4
    }
}
declare namespace fm.icelink {
    /**
    A layout origin definition.
    */
    enum LayoutOrigin {
        /**
        Indicates an origin where 0,0 is in the top-left corner.
        */
        TopLeft = 1,
        /**
        Indicates an origin where 0,0 is in the top-right corner.
        */
        TopRight = 2,
        /**
        Indicates an origin where 0,0 is in the bottom-right corner.
        */
        BottomRight = 3,
        /**
        Indicates an origin where 0,0 is in the bottom-left corner.
        */
        BottomLeft = 4
    }
}
declare namespace fm.icelink {
    /**
    The state of local media.
    */
    enum LocalMediaState {
        /**
        Indicates that the local media has not been started yet.
        */
        New = 1,
        /**
        Indicates that the local media is starting.
        */
        Starting = 2,
        /**
        Indicates that the local media has started.
        */
        Started = 3,
        /**
        Indicates that the local media is stopping.
        */
        Stopping = 4,
        /**
        Indicates that the local media has stopped.
        */
        Stopped = 5,
        /**
        Indicates that the local media is being destroyed.
        */
        Destroying = 6,
        /**
        Indicates that the local media has been destroyed.
        */
        Destroyed = 7
    }
}
declare namespace fm.icelink {
    /**
    The local policy for the use of generic RTP Negative Acknowledgements (NACK). Cf. https://tools.ietf.org/html/draft-ietf-rtcweb-rtp-usage-26  NackPolicy is for enabling/configuring negative acknowledgement. Negative acknowledgements are used by media receivers to request that a media sender retransmit a packet. It is highly effective for video in low-latency networks since video is stateful and the cost of losing a packet is high. It is far less effective for audio, where any delay is especially harmful and the cost of losing a packet is not significant. Because of this, it is enabled by default for video and disabled by default for audio. You can modify the buffer size using NackConfig, but generally, it should be left with default values. The option to set these values will most likely be removed in a future release as our adaptive algorithms improve.
    */
    enum NackPolicy {
        /**
        The usage of generic NACKs is disabled.
        */
        Disabled = 1,
        /**
        The usage of generic NACKs is negotiated with the peer.
        */
        Negotiated = 2
    }
}
declare namespace fm.icelink {
    /**
    The local policy for the RED Forward Error Correction support. Cf. https://tools.ietf.org/html/draft-ietf-rtcweb-fec-04  RedFecPolicy is for enabling/configuring forward error correction. Forward error correction adds redundancy to the media stream (increased bandwidth) with the intention that media receivers can recover from packet loss without requiring the media server to retransmit anything. It is a last resort for high latency networks. It is disabled by default and not currently supported as it does not have sufficient test coverage.
    */
    enum RedFecPolicy {
        /**
        The usage of RED FEC is disabled.
        */
        Disabled = 1,
        /**
        The usage of RED FEC is negotiated with the peer.
        */
        Negotiated = 2
    }
}
declare namespace fm.icelink {
    /**
    The local policy for the use of Receiver Estimated Maximum Bitrates (goog-remb). Cf. https://tools.ietf.org/html/draft-alvestrand-rmcat-remb-03
    */
    enum RembPolicy {
        /**
        The usage of goog-rembs is disabled.
        */
        Disabled = 1,
        /**
        The usage of goog-rembs is negotiated with the peer.
        */
        Negotiated = 2
    }
}
declare namespace fm.icelink.rtp {
    /** @hidden */
    enum HeaderExtensionForm {
        OneByte = 1,
        TwoByte = 2
    }
}
declare namespace fm.icelink {
    /**
    Indicates Sdes policy for stream.
    */
    enum SdesPolicy {
        /**
        Sdes is preferred but not required. If stream type is compatible (i.e. not a DataStream) Crypto attributes will be included in the session description.
        */
        Negotiated = 2,
        /**
        Sdes is disabled. Crypto attributes will not be included in the session description.
        */
        Disabled = 3
    }
}
declare namespace fm.icelink {
    /**
    The signalling state of a connection.
    */
    enum SignallingState {
        /**
        Indicates that no offer/answer exchange ever occurred.
        */
        New = 1,
        /**
        Indicates that the connection has a local offer and remote answer is outstanding.
        */
        HaveLocalOffer = 2,
        /**
        Indicates that the connection has a remote offer and local answer is outstanding.
        */
        HaveRemoteOffer = 3,
        /**
        Indicates that for each offer there is a matching answer.
        */
        Stable = 4
    }
}
declare namespace fm.icelink {
    /** @hidden */
    enum TransportType {
        Gatherer = 1,
        IceTransport = 2,
        DtlsTransport = 3,
        SctpTransport = 4,
        ReliableDataTransport = 5,
        SrtpTransport = 6,
        Unset = 7,
        MediaTransport = 8
    }
}
declare namespace fm.icelink {
    /**
    The local policy for TrickleIce support. Cf. https://tools.ietf.org/html/draft-ietf-ice-trickle-04
    */
    enum TrickleIcePolicy {
        /**
        A Trickle ICE mode of operation where the offerer gathers all of the possible candidates strictly before creating and sending the offer.
        */
        NotSupported = 1,
        /**
        The regular mode of operation for Trickle ICE agents, in which an initial offer can include any number of candidates (even zero candidates) and does not need to include the entire first generation of candidates as in half trickle.
        */
        FullTrickle = 2,
        /**
        A Trickle ICE mode of operation where the offerer gathers its first generation of candidates strictly before creating and sending the offer. Once sent, that offer can be processed by Vanilla ICE agents and does not require support for this specification. It also allows Trickle ICE capable answerers to still gather candidates and perform connectivity checks in a non-blocking way, thus roughly offering "half" the advantages of Trickle ICE. The mechanism is mostly meant for use in cases where support for Trickle ICE cannot be confirmed prior to sending an initial offer.
        */
        HalfTrickle = 3
    }
}
declare namespace fm.icelink {
    /**
    The state of a candidate pair.
    */
    enum CandidatePairState {
        /**
        Indicates that the candidate pair has been formed, but connectivity checks have not yet started.
        */
        New = 1,
        /**
        Indicates that the connectivity check is ready for connectivity checks, but checks have not yet started.
        */
        Waiting = 2,
        /**
        Indicates that connectivity checks are in progress.
        */
        InProgress = 3,
        /**
        Indicates that a connectivity check was successful.
        */
        Succeeded = 4,
        /**
        Indicates that all connectivity checks have timed out or produced a failure response.
        */
        Failed = 5,
        /**
        Indicates that connectivity checks have been stopped intentionally due to transport closure.
        */
        Closed = 6,
        /**
        Indicates that connectivity checks have succeeded in the past, but are currently not responding.
        */
        ConnectivityLost = 7
    }
}
declare namespace fm.icelink {
    /**
    The type of a candidate.
    */
    enum CandidateType {
        /**
        Indicates a 'host' candidate, discovered by querying a local network interface adapter. The candidate should contain a private IP address of this client.
        */
        Host = 1,
        /**
        Indicates a 'srflx' candidate, discovered by using a STUN server to echo back the source IP address it sees in a UDP binding request. When the STUN server is properly configured, the candidate should contain a public IP address of this client.
        */
        ServerReflexive = 2,
        /**
        Indicates a 'relay' candidate, discovered by using a TURN server to set up a public port in response to a UDP or TCP allocate request. When the TURN server is properly configured, the candidate should contain a public IP address of the TURN server.
        */
        Relayed = 3,
        /**
        Indicates a 'prflx' candidate, discovered by sending STUN connectivity checks between peers residing behind more restrictive firewalls. The candidate should contain a public IP address of this client.
        */
        PeerReflexive = 4,
        /**
        Indicates an unknown candidate type.
        */
        Unknown = 5
    }
}
declare namespace fm.icelink {
    /**
    A value used to indicate whether this codec is used to encode or decode.
    */
    enum CodecType {
        /**
        The attached RTCCodecStats represents a media format that is being encoded, or that the implementation is prepared to encode.
        */
        Encode = 1,
        /**
        The attached RTCCodecStats represents a media format that the implementation is prepared to decode.
        */
        Decode = 2
    }
}
declare namespace fm.icelink {
    /**
    The state of a connection.
    */
    enum ConnectionState {
        /**
        Indicates that the connection is new and has not been started.
        */
        New = 1,
        /**
        Indicates that the connection is being initialized but no connecting attempts have been made.
        */
        Initializing = 2,
        /**
        Indicates that the connection is currently connecting.
        */
        Connecting = 3,
        /**
        Indicates that the connection is currently connected.
        */
        Connected = 4,
        /**
        Indicates that the connection has encountered an error and is cleaning up.
        */
        Failing = 5,
        /**
        Indicates that the connection has encountered an error and has cleaned up.
        */
        Failed = 6,
        /**
        Indicates that the connection has been instructed to close and is cleaning up.
        */
        Closing = 7,
        /**
        Indicates that the connection has been instructed to close and has cleaned up.
        */
        Closed = 8
    }
}
declare namespace fm.icelink {
    /**
    A data channel state.
    */
    enum DataChannelState {
        /**
        Indicates the data channel has been created and has not started negotiating yet.
        */
        New = 1,
        /**
        Indicates the data channel is in the process of negotiating a secure connection.
        */
        Connecting = 2,
        /**
        Indicates the data channel has completed negotiation of a secure connection.
        */
        Connected = 3,
        /**
        Indicates the data channel is in the process of closing due to an intentional request.
        */
        Closing = 4,
        /**
        Indicates the data channel has been closed due to an intentional request.
        */
        Closed = 5,
        /**
        Indicates the data channel has been closed as the result of an error.
        */
        Failed = 6
    }
}
declare namespace fm.icelink {
    /**
    The encryption mode for the stream.
    */
    enum EncryptionMode {
        /**
        No encryption and no integrity checking.
        */
        Null = 1,
        /**
        AES 128-bit encryption with strong HMAC-SHA1 integrity checking (80-bit).
        */
        Aes128Strong = 2,
        /**
        AES 128-bit encryption with weak HMAC-SHA1 integrity checking (32-bit).
        */
        Aes128Weak = 3,
        /**
        Null encryption with strong HMAC-SHA1 integrity checking (80-bit).
        */
        NullStrong = 4,
        /**
        Null encryption with weak HMAC-SHA1 integrity checking (32-bit).
        */
        NullWeak = 5
    }
}
declare namespace fm.icelink {
    /**
    Specifies how an element should be scaled within a layout.
    */
    enum LayoutScale {
        /**
        Indicates that the element should be uniformly scaled (maintaining aspect ratio) to the largest size such that both its width and its height can fit inside its bounding box.
        */
        Contain = 1,
        /**
        Indicates that the element should be uniformly scaled (maintaining aspect ratio) to be as large as possible so that the bounding box is completely covered. Some parts of the element may not be in view (cropped).
        */
        Cover = 2,
        /**
        Indicates that the element should be non-uniformly scaled (not maintaining aspect ratio) so that the bounding box is completely covered, but all parts of the element are in view (no cropping).
        */
        Stretch = 3
    }
}
declare namespace fm.icelink.sdp {
    /**
    Specified Multiplexing category of SDP Attribute. Rules governing SDP Attribute multiplexing are as per draft-ietf-mmusic-sdp-mux-attributes
    */
    enum AttributeCategory {
        /**
        The attributes in the NORMAL category can be independently specified when multiplexed and they retain their original semantics.
        */
        Normal = 1,
        /**
        The attributes in the CAUTION category are advised against multiplexing since their usage under multiplexing might lead to incorrect behaviour.
        */
        Caution = 2,
        /**
        The attributes and their associated values (if any) in the IDENTICAL category MUST be repeated across all the media descriptions under multiplexing.
        */
        Identical = 3,
        /**
        The attributes in the SUM category can be set as they are normally used but software using them in the multiplexing scenario MUST apply the sum of all the attributes being multiplexed instead of trying to use them independently.This is typically used for bandwidth or other rate limiting attributes to the underlying transport.
        */
        Sum = 4,
        /**
        The attributes in the TRANSPORT category can be set normally for multiple items in a multiplexed group but the software MUST pick the one that's associated with the "m=" line whose information is used for setting up the underlying transport.
        */
        Transport = 5,
        /**
        The attributes in the INHERIT category encapsulate other SDP attributes or parameters.  These attributes inherit their multiplexing characteristics from the attributes or parameters they encapsulate.  Such attributes are defined in [RFC3407], [RFC5939] and [RFC6871] as part of a generic framework for indicating and negotiating transport, media, and media format related capabilities in the SDP.  The inheritance manifests itself when the encapsulated attribute or parameter is being leveraged.  In the case of SDP Capability Negotiation [RFC5939] for example, this occurs when a capability (encapsulating attribute) is used as part of a configuration; the configuration inherits the multiplexing category of each of its constituent (encapsulated) attributes and parameters.  The inherited attributes MUST be coherent in order to form a valid configuration from a multiplexing point of view (see Section 14 for further details).
        */
        Inherit = 6,
        /**
        The attributes in the IDENTICAL-PER-PT category define the RTP payload configuration on per Payload Type basis and MUST have identical values across all the media descriptions for a given RTP Payload Type when repeated.  These Payload Types identify the same codec configuration as defined in the Section 10.1.2 of [I-D.ietf-mmusic-sdp-bundle-negotiation] under this context.
        */
        IdenticalPerPT = 7,
        /**
        For the attributes in the SPECIAL category, the text in the specification defining the attribute MUST be consulted for further handling when multiplexed.
        */
        Special = 8
    }
}
declare namespace fm.icelink.sdp {
    /**
    SDP Attribute types
    */
    enum AttributeType {
        /**
        Unknown SDP Attribute
        */
        UnknownAttribute = 999666,
        /**
        SDP Direction Attribute
        */
        DirectionAttribute = 1,
        /**
        SDP Category Attribute
        */
        CategoryAttribute = 2,
        /**
        SDP Character Set Attribute
        */
        CharacterSetAttribute = 3,
        /**
        SDP Conference Type Attribute
        */
        ConferenceTypeAttribute = 4,
        /**
        SDP Crypto Attribute
        */
        CryptoAttribute = 5,
        /**
        SDP Format Parameters Attribute
        */
        FormatParametersAttribute = 6,
        /**
        SDP Frame Rate Attribute
        */
        FrameRateAttribute = 7,
        /**
        SDP Keywords Attribute
        */
        KeywordsAttribute = 8,
        /**
        SDP Language Attribute
        */
        LanguageAttribute = 9,
        /**
        SDP Max Packet Time Attribute
        */
        MaxPacketTimeAttribute = 10,
        /**
        SDP Orientiation Attribute
        */
        OrientationAttribute = 11,
        /**
        SDP Packet Time Attribute
        */
        PacketTimeAttribute = 12,
        /**
        SDP Quality Attribute
        */
        QualityAttribute = 13,
        /**
        SDP Sdp Language Attribute
        */
        SdpLanguageAttribute = 14,
        /**
        SDP Setup Attribute
        */
        SetupAttribute = 15,
        /**
        SDP Tool  Attribute
        */
        ToolAttribute = 16,
        /**
        SDP Media Stream Id Semantic Attribute
        */
        MediaStreamIdSemanticAttribute = 17,
        /**
        SDP Stream Id Attribute
        */
        MediaStreamIdAttribute = 18,
        /**
        SDP Bundle-only Attribute
        */
        BundleOnlyAttribute = 40,
        /**
        SDP Ice Candidate Attribute
        */
        IceCandidateAttribute = 19,
        /**
        SDP Ice Fingerprint Attribute
        */
        IceFingerprintAttribute = 20,
        /**
        SDP Ice Lite Attribute
        */
        IceLiteAttribute = 21,
        /**
        SDP Ice Mismatch Attribute
        */
        IceMismatchAttribute = 22,
        /**
        SDP Ice Options Attribute
        */
        IceOptionsAttribute = 23,
        /**
        SDP Ice Password Attribute
        */
        IcePasswordAttribute = 24,
        /**
        SDP Ice Ufrag Attribute
        */
        IceUfragAttribute = 25,
        /**
        SDP Ice Remote Candidates Attribute
        */
        IceRemoteCandidatesAttribute = 26,
        /**
        SDP RTP Map Attribute
        */
        RtpMapAttribute = 27,
        /**
        SDP RTP SSRC Attribute
        */
        RtpSsrcAttribute = 28,
        /**
        SDP RTP Extension Map Attribute (https://tools.ietf.org/html/rfc5285#section-5)
        */
        RtpExtMapAttribute = 29,
        /**
        SDP RTCP Attribute
        */
        RtcpAttribute = 30,
        /**
        SDP RTCP Feedback Attribute
        */
        RtcpFeedbackAttribute = 31,
        /**
        SDP RTCP Mux Attribute
        */
        RtcpMuxAttribute = 32,
        /**
        SDP SCTP Port Attribute
        */
        SctpPortAttribute = 33,
        /**
        SDP SCTP Map Attribute
        */
        SctpMapAttribute = 34,
        /**
        SDP SCTP Max Message Size Attribute
        */
        SctpMaxMessageSizeAttribute = 35,
        /**
        SDP Group Attribute
        */
        GroupAttribute = 36,
        /**
        SDP RTP RID Attribute
        */
        RtpRidAttribute = 37,
        /**
        SDP Simulcast Attribute
        */
        SimulcastAttribute = 38,
        /**
        SDP RTP SSRC Group Attribute
        */
        RtpSsrcGroupAttribute = 39
    }
}
declare namespace fm.icelink.sdp {
    /**
    SDP Group Semantics
    */
    enum GroupSemanticsType {
        /**
        An application that receives a session description that contains "m" lines that are grouped together using LS semantics MUST synchronize the playout of the corresponding media streams.Note that LS semantics not only apply to a video stream that has to be synchronized with an audio stream.The playout of two streams of the same type can be synchronized as well.
        */
        LipSynchronization = 1,
        /**
        An "m" line in an SDP session description defines a media stream. However, SDP does not define what a media stream is.  This definition can be found in the RTSP specification.The RTSP RFC[5] defines a media stream as "a single media instance, e.g., an audio stream or a video stream as well as a single whiteboard or shared application group. When using RTP, a stream consists of all RTP and RTCP packets created by a source within an RTP session".
        */
        FlowIdentification = 2,
        /**
        The extension can be used with the Session Description Protocol(SDP) Offer/Answer mechanism[RFC3264] to negotiate which "m=" sections will become part of a BUNDLE group.
        */
        Bundling = 3,
        /**
        Unknown Group semantics type.
        */
        Unknown = 4
    }
}
declare namespace fm.icelink.sdp.ice {
    /**
    A list of known types for [[fm.icelink.sdp.ice.optionTag]].
    */
    enum OptionTagType {
        /**
        Indicates an unknown option tag.
        */
        Unknown = 1,
        /**
        Indicates the trickle-ice option tag.
        */
        Trickle = 2
    }
}
declare namespace fm.icelink.sdp {
    /**
    Media Stream Id Semantic Tokens
    */
    enum MediaStreamIdSemanticToken {
        /**
        WebRTC Media Stream Semantic
        */
        Wms = 1
    }
}
declare namespace fm.icelink {
    /**
    A session description type.
    */
    enum SessionDescriptionType {
        /**
        Indicates an offer.
        */
        Offer = 1,
        /**
        Indicates an answer.
        */
        Answer = 2
    }
}
declare namespace fm.icelink {
    /**
    A stream direction.
    */
    enum StreamDirection {
        /**
        Indicates a stream that can send and can receive.
        */
        SendReceive = 1,
        /**
        Indicates a stream that can send.
        */
        SendOnly = 2,
        /**
        Indicates a stream that can receive.
        */
        ReceiveOnly = 3,
        /**
        Indicates a stream that cannot send or receive.
        */
        Inactive = 4,
        /**
        Indicates that a stream direction has not been set.
        */
        Unset = 5
    }
}
declare namespace fm.icelink {
    /**
    The state of a stream.
    */
    enum StreamState {
        /**
        Indicates that the stream is new and has not been started.
        */
        New = 1,
        /**
        Indicates that the stream is being initialized but no connecting attempts have been made.
        */
        Initializing = 2,
        /**
        Indicates that the stream is currently connecting.
        */
        Connecting = 3,
        /**
        Indicates that the stream is currently connected.
        */
        Connected = 4,
        /**
        Indicates that the stream has encountered an error and is cleaning up.
        */
        Failing = 5,
        /**
        Indicates that the stream has encountered an error and has cleaned up.
        */
        Failed = 6,
        /**
        Indicates that the stream has been instructed to close and is cleaning up.
        */
        Closing = 7,
        /**
        Indicates that the stream has been instructed to close and has cleaned up.
        */
        Closed = 8
    }
}
declare namespace fm.icelink {
    /**
    A stream type.
    */
    enum StreamType {
        /**
        Indicates an audio stream.
        */
        Audio = 1,
        /**
        Indicates a video stream.
        */
        Video = 2,
        /**
        Indicates an application stream.
        */
        Application = 3,
        /**
        Indicates a message stream.
        */
        Message = 4,
        /**
        Indicates a text stream.
        */
        Text = 5
    }
}
declare namespace fm.icelink {
    class CryptoLibraryWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.CryptoLibrary);
        toString(): string;
    }
}
declare namespace fm.icelink {
    class AddressTypeWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.AddressType);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    ASCII encoding/decoding utility.
    */
    class Ascii {
        getTypeString(): string;
        constructor();
        /**
        Decodes a UTF-8 byte array to a string.
        @param input The input byte array.
        */
        static decode(input: Uint8Array): string;
        /**
        Decodes a UTF-8 byte array to a string.
        @param input The input byte array.
        @param index The index to start reading.
        @param length The length.
        */
        static decode(input: Uint8Array, index: number, length: number): string;
        /**
        Encodes a string to a UTF-8 byte array.
        @param input The input string.
        */
        static encode(input: string): Uint8Array;
        /**
        Gets the number of bytes that would be returned by a call to encode.
        @param input The input string.
        */
        static getByteCount(input: string): number;
    }
}
declare namespace fm.icelink {
    /**
    ILog interface for loggers.
    */
    interface ILog {
        debug(message: string): void;
        debug(message: string, ex: fm.icelink.Exception): void;
        debug(scope: string, message: string): void;
        debug(scope: string, message: string, ex: fm.icelink.Exception): void;
        error(message: string): void;
        error(message: string, ex: fm.icelink.Exception): void;
        error(scope: string, message: string): void;
        error(scope: string, message: string, ex: fm.icelink.Exception): void;
        fatal(message: string): void;
        fatal(message: string, ex: fm.icelink.Exception): void;
        fatal(scope: string, message: string): void;
        fatal(scope: string, message: string, ex: fm.icelink.Exception): void;
        flush(): void;
        getIsDebugEnabled(): boolean;
        getIsErrorEnabled(): boolean;
        getIsFatalEnabled(): boolean;
        getIsInfoEnabled(): boolean;
        getIsVerboseEnabled(): boolean;
        getIsWarnEnabled(): boolean;
        getTag(): string;
        info(message: string): void;
        info(message: string, ex: fm.icelink.Exception): void;
        info(scope: string, message: string): void;
        info(scope: string, message: string, ex: fm.icelink.Exception): void;
        isLogEnabled(level: fm.icelink.LogLevel): boolean;
        log(logEvent: fm.icelink.LogEvent): void;
        log(message: string): void;
        log(scope: string, message: string): void;
        verbose(message: string): void;
        verbose(message: string, ex: fm.icelink.Exception): void;
        verbose(scope: string, message: string): void;
        verbose(scope: string, message: string, ex: fm.icelink.Exception): void;
        warn(message: string): void;
        warn(message: string, ex: fm.icelink.Exception): void;
        warn(scope: string, message: string): void;
        warn(scope: string, message: string, ex: fm.icelink.Exception): void;
    }
}
declare namespace fm.icelink {
    /**
    A managed mutex.
    */
    class AtomicMutex {
        getTypeString(): string;
        /** @hidden */
        private __lock;
        /**
        Creates a new instance of an AtomicMutex.
        */
        constructor();
        /**
        Gets if the mutex is locked or not.
        */
        getIsLocked(): boolean;
        /**
        Releases the lock.
        */
        release(): void;
        /**
        Tries to obtain a lock with this thread.
        */
        tryLock(): boolean;
    }
}
declare namespace fm.icelink {
    /**
    Common binary methods.
    */
    class Binary {
        getTypeString(): string;
        /** @hidden */
        private static fm_icelink_Binary___bitmasks;
        constructor();
        /**
        Converts a bit-string to bytes.
        @param bitString The bit-string.
        */
        static bitStringToBytes(bitString: string): Uint8Array;
        /**
        Converts a bit-string to bytes.
        @param bitString The bit-string.
        @param numberOfUnusedBits The number of unused bits.
        */
        static bitStringToBytes(bitString: string, numberOfUnusedBits: fm.icelink.Holder<number>): Uint8Array;
        /**
        Converts a bit-string to bytes.
        @param bitString The bit-string.
        @param padLeft Whether to pad extra zero-bits to the left.
        */
        static bitStringToBytes(bitString: string, padLeft: boolean): Uint8Array;
        /**
        Converts a bit-string to bytes.
        @param bitString The bit-string.
        @param padLeft Whether to pad extra zero-bits to the left.
        @param numberOfUnusedBits The number of unused bits.
        */
        static bitStringToBytes(bitString: string, padLeft: boolean, numberOfUnusedBits: fm.icelink.Holder<number>): Uint8Array;
        /**
        Converts bytes to a bit-string.
        @param bytes The bytes.
        */
        static bytesToBitString(bytes: Uint8Array): string;
        /**
        Converts bytes to a bit-string.
        @param bytes The bytes.
        @param offset The offset.
        @param length The length.
        */
        static bytesToBitString(bytes: Uint8Array, offset: number, length: number): string;
        /**
        Converts bytes to a bit-string.
        @param bytes The bytes.
        @param offset The offset.
        @param length The length.
        @param numberOfUnusedBits The number of unused bits.
        */
        static bytesToBitString(bytes: Uint8Array, offset: number, length: number, numberOfUnusedBits: number): string;
        /**
        Converts bytes to a bit-string.
        @param bytes The bytes.
        @param offset The offset.
        @param length The length.
        @param numberOfUnusedBits The number of unused bits.
        @param trimLeft Whether to trim unused bits from the left.
        */
        static bytesToBitString(bytes: Uint8Array, offset: number, length: number, numberOfUnusedBits: number, trimLeft: boolean): string;
        /**
        Deinterleaves a byte array i.e. XYXYXYXY to XXXXYYYY
        @param inputFrame The inputFrame.
        @param outputFrame The outputFrame.
        */
        static deinterleave(inputFrame: Uint8Array, outputFrame: Uint8Array): void;
        /**
        Deinterleaves a byte array i.e. XYXYXYXY to XXXXYYYY
        @param inputFrame The inputFrame.
        @param outputFrame The outputFrame.
        @param start The start.
        @param length The length.
        */
        static deinterleave(inputFrame: Uint8Array, outputFrame: Uint8Array, start: number, length: number): void;
        /**
        Deinterleaves a byte array
        @param inputFrame The inputFrame.
        @param outputFrame The outputFrame.
        @param start The start.
        @param length The length.
        @param reversePlanes The reversePlanes.
        */
        static deinterleave(inputFrame: Uint8Array, outputFrame: Uint8Array, start: number, length: number, reversePlanes: boolean): void;
        /**
        Deinterleave and transform (rotate) a byte array containing two planes
        @param inputFrame The inputFrame.
        @param outputFrame The outputFrame.
        @param width The width.
        @param height The height.
        @param stride The stride.
        @param rotation Values 0, 90, 180, 270.
        */
        static deinterleaveTransform(inputFrame: Uint8Array, outputFrame: Uint8Array, width: number, height: number, stride: number, rotation: number): void;
        /**
        Deinterleave and transform (rotate) a byte array containing two planes
        @param inputFrame The inputFrame.
        @param outputFrame The outputFrame.
        @param width The width.
        @param height The height.
        @param stride The stride.
        @param rotation Values 0, 90, 180, 270.
        @param start The start.
        */
        static deinterleaveTransform(inputFrame: Uint8Array, outputFrame: Uint8Array, width: number, height: number, stride: number, rotation: number, start: number): void;
        /**
        Deinterleave and transform (rotate) a byte array containing two planes
        @param inputFrame The inputFrame.
        @param outputFrame The outputFrame.
        @param width The width.
        @param height The height.
        @param stride The stride.
        @param start The start.
        @param rotation Values 0, 90, 180, 270.
        @param reversePlanes Reverse output plane order.
        */
        static deinterleaveTransform(inputFrame: Uint8Array, outputFrame: Uint8Array, width: number, height: number, stride: number, rotation: number, start: number, reversePlanes: boolean): void;
        /**
        Reads a 1-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @return The value.
        */
        static fromBytes1(input: Uint8Array, inputIndex: number, bitOffset: number): boolean;
        /**
        Reads a 10-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @return The value.
        */
        static fromBytes10(input: Uint8Array, inputIndex: number, bitOffset: number): number;
        /**
        Reads a 11-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @return The value.
        */
        static fromBytes11(input: Uint8Array, inputIndex: number, bitOffset: number): number;
        /**
        Reads a 12-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @return The value.
        */
        static fromBytes12(input: Uint8Array, inputIndex: number, bitOffset: number): number;
        /**
        Reads a 13-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @return The value.
        */
        static fromBytes13(input: Uint8Array, inputIndex: number, bitOffset: number): number;
        /**
        Reads a 14-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @return The value.
        */
        static fromBytes14(input: Uint8Array, inputIndex: number, bitOffset: number): number;
        /**
        Reads a 15-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @return The value.
        */
        static fromBytes15(input: Uint8Array, inputIndex: number, bitOffset: number): number;
        /**
        Reads a 16-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param littleEndian Whether to use little-endian format.
        @return The value.
        */
        static fromBytes16(input: Uint8Array, inputIndex: number, littleEndian: boolean): number;
        /**
        Reads an 17-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @return The value.
        */
        static fromBytes17(input: Uint8Array, inputIndex: number, bitOffset: number): number;
        /**
        Reads an 18-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @return The value.
        */
        static fromBytes18(input: Uint8Array, inputIndex: number, bitOffset: number): number;
        /**
        Reads an 19-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @return The value.
        */
        static fromBytes19(input: Uint8Array, inputIndex: number, bitOffset: number): number;
        /**
        Reads a 2-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @return The value.
        */
        static fromBytes2(input: Uint8Array, inputIndex: number, bitOffset: number): number;
        /**
        Reads an 20-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @return The value.
        */
        static fromBytes20(input: Uint8Array, inputIndex: number, bitOffset: number): number;
        /**
        Reads an 21-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @return The value.
        */
        static fromBytes21(input: Uint8Array, inputIndex: number, bitOffset: number): number;
        /**
        Reads an 22-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @return The value.
        */
        static fromBytes22(input: Uint8Array, inputIndex: number, bitOffset: number): number;
        /**
        Reads an 23-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @return The value.
        */
        static fromBytes23(input: Uint8Array, inputIndex: number, bitOffset: number): number;
        /**
        Reads a 24-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param littleEndian Whether to use little-endian format.
        @return The value.
        */
        static fromBytes24(input: Uint8Array, inputIndex: number, littleEndian: boolean): number;
        /**
        Reads a 3-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @return The value.
        */
        static fromBytes3(input: Uint8Array, inputIndex: number, bitOffset: number): number;
        /**
        Reads a 32-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param littleEndian Whether to use little-endian format.
        @return The value.
        */
        static fromBytes32(input: Uint8Array, inputIndex: number, littleEndian: boolean): number;
        /**
        Reads a 4-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @return The value.
        */
        static fromBytes4(input: Uint8Array, inputIndex: number, bitOffset: number): number;
        /**
        Reads a 40-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param littleEndian Whether to use little-endian format.
        @return The value.
        */
        static fromBytes40(input: Uint8Array, inputIndex: number, littleEndian: boolean): number;
        /**
        Reads a 48-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param littleEndian Whether to use little-endian format.
        @return The value.
        */
        static fromBytes48(input: Uint8Array, inputIndex: number, littleEndian: boolean): number;
        /**
        Reads a 5-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @return The value.
        */
        static fromBytes5(input: Uint8Array, inputIndex: number, bitOffset: number): number;
        /**
        Reads a 56-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param littleEndian Whether to use little-endian format.
        @return The value.
        */
        static fromBytes56(input: Uint8Array, inputIndex: number, littleEndian: boolean): number;
        /**
        Reads a 6-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @return The value.
        */
        static fromBytes6(input: Uint8Array, inputIndex: number, bitOffset: number): number;
        /**
        Reads a 64-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param littleEndian Whether to use little-endian format.
        @return The value.
        */
        static fromBytes64(input: Uint8Array, inputIndex: number, littleEndian: boolean): number;
        /**
        Reads a 7-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @return The value.
        */
        static fromBytes7(input: Uint8Array, inputIndex: number, bitOffset: number): number;
        /**
        Reads an 8-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @return The value.
        */
        static fromBytes8(input: Uint8Array, inputIndex: number): number;
        /**
        Reads a 9-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @return The value.
        */
        static fromBytes9(input: Uint8Array, inputIndex: number, bitOffset: number): number;
        /**
        Interleaves a byte array i.e. XXXXYYYY to XYXYXYXY
        @param inputFrame The inputFrame.
        @param outputFrame The outputFrame.
        */
        static interleave(inputFrame: Uint8Array, outputFrame: Uint8Array): void;
        /**
        Interleaves a byte array i.e. XXXXYYYY to XYXYXYXY
        @param inputFrame The inputFrame.
        @param outputFrame The outputFrame.
        @param start The start.
        @param length The length.
        */
        static interleave(inputFrame: Uint8Array, outputFrame: Uint8Array, start: number, length: number): void;
        /**
        Interleaves a byte array  i.e. XXXXYYYY to XYXYXYXY
        @param inputFrame The inputFrame.
        @param outputFrame The outputFrame.
        @param start The start.
        @param length The length.
        @param reversePlanes XXXXYYYY to YXYXYXYX
        */
        static interleave(inputFrame: Uint8Array, outputFrame: Uint8Array, start: number, length: number, reversePlanes: boolean): void;
        /**
        Interleave and transform (rotate) a byte array containing two planes
        @param inputFrame The inputFrame.
        @param outputFrame The outputFrame.
        @param width The width.
        @param height The height.
        @param stride The stride.
        @param rotation Values 0, 90, 180, 270.
        */
        static interleaveTransform(inputFrame: Uint8Array, outputFrame: Uint8Array, width: number, height: number, stride: number, rotation: number): void;
        /**
        Interleave and transform (rotate) a byte array containing two planes
        @param inputFrame The inputFrame.
        @param outputFrame The outputFrame.
        @param width The width.
        @param height The height.
        @param stride The stride.
        @param rotation Values 0, 90, 180, 270.
        @param start The start.
        */
        static interleaveTransform(inputFrame: Uint8Array, outputFrame: Uint8Array, width: number, height: number, stride: number, rotation: number, start: number): void;
        /**
        Interleave and transform (rotate) a byte array containing two planes
        @param inputFrame The inputFrame.
        @param outputFrame The outputFrame.
        @param width The width.
        @param height The height.
        @param stride The stride.
        @param start The start.
        @param rotation Values 0, 90, 180, 270.
        @param reversePlanes Reverse output plane order.
        */
        static interleaveTransform(inputFrame: Uint8Array, outputFrame: Uint8Array, width: number, height: number, stride: number, rotation: number, start: number, reversePlanes: boolean): void;
        /** @hidden */
        private static roundUp;
        /** @hidden */
        private static toBytes;
        /**
        Converts a 1-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @return The output byte array.
        */
        static toBytes1(value: boolean, bitOffset: number): Uint8Array;
        /**
        Writes a 1-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes1(value: boolean, bitOffset: number, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 10-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @return The output byte array.
        */
        static toBytes10(value: number, bitOffset: number, littleEndian: boolean): Uint8Array;
        /**
        Writes a 10-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes10(value: number, bitOffset: number, littleEndian: boolean, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 11-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @return The output byte array.
        */
        static toBytes11(value: number, bitOffset: number, littleEndian: boolean): Uint8Array;
        /**
        Writes a 11-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes11(value: number, bitOffset: number, littleEndian: boolean, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 12-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @return The output byte array.
        */
        static toBytes12(value: number, bitOffset: number, littleEndian: boolean): Uint8Array;
        /**
        Writes a 12-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes12(value: number, bitOffset: number, littleEndian: boolean, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 13-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @return The output byte array.
        */
        static toBytes13(value: number, bitOffset: number, littleEndian: boolean): Uint8Array;
        /**
        Writes a 13-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes13(value: number, bitOffset: number, littleEndian: boolean, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 14-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @return The output byte array.
        */
        static toBytes14(value: number, bitOffset: number, littleEndian: boolean): Uint8Array;
        /**
        Writes a 14-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes14(value: number, bitOffset: number, littleEndian: boolean, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 15-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @return The output byte array.
        */
        static toBytes15(value: number, bitOffset: number, littleEndian: boolean): Uint8Array;
        /**
        Writes a 15-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes15(value: number, bitOffset: number, littleEndian: boolean, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 16-bit value to a byte array.
        @param value The value to write.
        @param littleEndian Whether to use little-endian format.
        @return The output byte array.
        */
        static toBytes16(value: number, littleEndian: boolean): Uint8Array;
        /**
        Writes a 16-bit value to a byte array.
        @param value The value to write.
        @param littleEndian Whether to use little-endian format.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes16(value: number, littleEndian: boolean, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 17-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @return The output byte array.
        */
        static toBytes17(value: number, bitOffset: number, littleEndian: boolean): Uint8Array;
        /**
        Writes a 17-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes17(value: number, bitOffset: number, littleEndian: boolean, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts an 18-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @return The output byte array.
        */
        static toBytes18(value: number, bitOffset: number, littleEndian: boolean): Uint8Array;
        /**
        Writes an 18-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes18(value: number, bitOffset: number, littleEndian: boolean, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 19-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @return The output byte array.
        */
        static toBytes19(value: number, bitOffset: number, littleEndian: boolean): Uint8Array;
        /**
        Writes a 19-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes19(value: number, bitOffset: number, littleEndian: boolean, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 2-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @return The output byte array.
        */
        static toBytes2(value: number, bitOffset: number): Uint8Array;
        /**
        Writes a 2-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes2(value: number, bitOffset: number, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 20-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @return The output byte array.
        */
        static toBytes20(value: number, bitOffset: number, littleEndian: boolean): Uint8Array;
        /**
        Writes a 20-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes20(value: number, bitOffset: number, littleEndian: boolean, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 21-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @return The output byte array.
        */
        static toBytes21(value: number, bitOffset: number, littleEndian: boolean): Uint8Array;
        /**
        Writes a 21-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes21(value: number, bitOffset: number, littleEndian: boolean, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 22-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @return The output byte array.
        */
        static toBytes22(value: number, bitOffset: number, littleEndian: boolean): Uint8Array;
        /**
        Writes a 22-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes22(value: number, bitOffset: number, littleEndian: boolean, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 23-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @return The output byte array.
        */
        static toBytes23(value: number, bitOffset: number, littleEndian: boolean): Uint8Array;
        /**
        Writes a 23-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes23(value: number, bitOffset: number, littleEndian: boolean, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 24-bit value to a byte array.
        @param value The value to write.
        @param littleEndian Whether to use little-endian format.
        @return The output byte array.
        */
        static toBytes24(value: number, littleEndian: boolean): Uint8Array;
        /**
        Writes a 24-bit value to a byte array.
        @param value The value to write.
        @param littleEndian Whether to use little-endian format.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes24(value: number, littleEndian: boolean, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 3-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @return The output byte array.
        */
        static toBytes3(value: number, bitOffset: number): Uint8Array;
        /**
        Writes a 3-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes3(value: number, bitOffset: number, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 32-bit value to a byte array.
        @param value The value to write.
        @param littleEndian Whether to use little-endian format.
        @return The output byte array.
        */
        static toBytes32(value: number, littleEndian: boolean): Uint8Array;
        /**
        Writes a 32-bit value to a byte array.
        @param value The value to write.
        @param littleEndian Whether to use little-endian format.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes32(value: number, littleEndian: boolean, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 4-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @return The output byte array.
        */
        static toBytes4(value: number, bitOffset: number): Uint8Array;
        /**
        Writes a 4-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes4(value: number, bitOffset: number, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 40-bit value to a byte array.
        @param value The value to write.
        @param littleEndian Whether to use little-endian format.
        @return The output byte array.
        */
        static toBytes40(value: number, littleEndian: boolean): Uint8Array;
        /**
        Writes a 40-bit value to a byte array.
        @param value The value to write.
        @param littleEndian Whether to use little-endian format.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes40(value: number, littleEndian: boolean, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 48-bit value to a byte array.
        @param value The value to write.
        @param littleEndian Whether to use little-endian format.
        @return The output byte array.
        */
        static toBytes48(value: number, littleEndian: boolean): Uint8Array;
        /**
        Writes a 48-bit value to a byte array.
        @param value The value to write.
        @param littleEndian Whether to use little-endian format.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes48(value: number, littleEndian: boolean, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 5-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @return The output byte array.
        */
        static toBytes5(value: number, bitOffset: number): Uint8Array;
        /**
        Writes a 5-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes5(value: number, bitOffset: number, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 56-bit value to a byte array.
        @param value The value to write.
        @param littleEndian Whether to use little-endian format.
        @return The output byte array.
        */
        static toBytes56(value: number, littleEndian: boolean): Uint8Array;
        /**
        Writes a 56-bit value to a byte array.
        @param value The value to write.
        @param littleEndian Whether to use little-endian format.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes56(value: number, littleEndian: boolean, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 6-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @return The output byte array.
        */
        static toBytes6(value: number, bitOffset: number): Uint8Array;
        /**
        Writes a 6-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes6(value: number, bitOffset: number, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 64-bit value to a byte array.
        @param value The value to write.
        @param littleEndian Whether to use little-endian format.
        @return The output byte array.
        */
        static toBytes64(value: number, littleEndian: boolean): Uint8Array;
        /**
        Writes a 64-bit value to a byte array.
        @param value The value to write.
        @param littleEndian Whether to use little-endian format.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes64(value: number, littleEndian: boolean, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 7-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @return The output byte array.
        */
        static toBytes7(value: number, bitOffset: number): Uint8Array;
        /**
        Writes a 7-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes7(value: number, bitOffset: number, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts an 8-bit value to a byte array.
        @param value The value to write.
        @return The output byte array.
        */
        static toBytes8(value: number): Uint8Array;
        /**
        Writes an 8-bit value to a byte array.
        @param value The value to write.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes8(value: number, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Converts a 9-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @return The output byte array.
        */
        static toBytes9(value: number, bitOffset: number, littleEndian: boolean): Uint8Array;
        /**
        Writes a 9-bit value to a byte array.
        @param value The value to write.
        @param bitOffset The offset of the value within the byte.
        @param littleEndian Whether to use little-endian format.
        @param output The output byte array.
        @param outputIndex The index to start writing.
        @return The output byte array.
        */
        static toBytes9(value: number, bitOffset: number, littleEndian: boolean, output: Uint8Array, outputIndex: number): Uint8Array;
        /**
        Transforms a byte containing a 2D plane (rotates 90, 180, 270)
        @param inputFrame The inputFrame.
        @param outputFrame The outputFrame.
        @param rotation The rotation.
        @param width The width.
        @param height The height.
        @param stride The stride.
        */
        static transform(inputFrame: Uint8Array, outputFrame: Uint8Array, width: number, height: number, stride: number, rotation: number): void;
        /**
        Transforms a byte containing a 2D plane (rotates 90, 180, 270)
        @param inputFrame The inputFrame.
        @param outputFrame The outputFrame.
        @param rotation The rotation.
        @param width The width.
        @param height The height.
        @param stride The stride.
        @param inputStart The inputStart.
        @param outputStart The outputStart.
        */
        static transform(inputFrame: Uint8Array, outputFrame: Uint8Array, width: number, height: number, stride: number, rotation: number, inputStart: number, outputStart: number): void;
        /**
        Transforms a byte containing a 2D plane (rotates 90, 180, 270). When transforming interleaved planes. Set the chunkLength to the number of planes.
        @param inputFrame The inputFrame.
        @param outputFrame The outputFrame.
        @param rotation The rotation.
        @param width The width.
        @param height The height.
        @param stride The stride.
        @param inputStart The inputStart.
        @param outputStart The outputStart.
        @param chunkLength The chunkLength.
        */
        static transform(inputFrame: Uint8Array, outputFrame: Uint8Array, width: number, height: number, stride: number, rotation: number, inputStart: number, outputStart: number, chunkLength: number): void;
        /**
        Transforms a byte containing a 2D plane (rotates 90, 180, 270)
        @param inputFrame The inputFrame.
        @param outputFrame The outputFrame.
        @param rotation The rotation.
        @param width The width.
        @param height The height.
        @param stride The stride.
        @param start Start position for both input and output frame
        */
        static transform(inputFrame: Uint8Array, outputFrame: Uint8Array, width: number, height: number, stride: number, rotation: number, start: number): void;
        /**
        Tries to read a 1-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes1(input: Uint8Array, inputIndex: number, bitOffset: number, value: fm.icelink.Holder<boolean>): boolean;
        /**
        Tries to read a 10-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes10(input: Uint8Array, inputIndex: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 11-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes11(input: Uint8Array, inputIndex: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 12-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes12(input: Uint8Array, inputIndex: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 13-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes13(input: Uint8Array, inputIndex: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 14-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes14(input: Uint8Array, inputIndex: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 15-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes15(input: Uint8Array, inputIndex: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 16-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param littleEndian Whether to use little-endian format.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes16(input: Uint8Array, inputIndex: number, littleEndian: boolean, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 17-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes17(input: Uint8Array, inputIndex: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 18-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes18(input: Uint8Array, inputIndex: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 19-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes19(input: Uint8Array, inputIndex: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 2-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes2(input: Uint8Array, inputIndex: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 20-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes20(input: Uint8Array, inputIndex: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 21-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes21(input: Uint8Array, inputIndex: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 22-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes22(input: Uint8Array, inputIndex: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 23-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes23(input: Uint8Array, inputIndex: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 24-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param littleEndian Whether to use little-endian format.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes24(input: Uint8Array, inputIndex: number, littleEndian: boolean, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 3-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes3(input: Uint8Array, inputIndex: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 32-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param littleEndian Whether to use little-endian format.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes32(input: Uint8Array, inputIndex: number, littleEndian: boolean, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 4-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes4(input: Uint8Array, inputIndex: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 40-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param littleEndian Whether to use little-endian format.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes40(input: Uint8Array, inputIndex: number, littleEndian: boolean, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 48-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param littleEndian Whether to use little-endian format.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes48(input: Uint8Array, inputIndex: number, littleEndian: boolean, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 5-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes5(input: Uint8Array, inputIndex: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 56-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param littleEndian Whether to use little-endian format.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes56(input: Uint8Array, inputIndex: number, littleEndian: boolean, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 6-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes6(input: Uint8Array, inputIndex: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 64-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param littleEndian Whether to use little-endian format.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes64(input: Uint8Array, inputIndex: number, littleEndian: boolean, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 7-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes7(input: Uint8Array, inputIndex: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read an 8-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes8(input: Uint8Array, inputIndex: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 9-bit value from a byte array.
        @param input The input byte array.
        @param inputIndex The index to start reading.
        @param bitOffset The offset of the value within the byte.
        @param value The value.
        @return `true` if the index is valid and the value was read; otherwise, `false`
        */
        static tryFromBytes9(input: Uint8Array, inputIndex: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /** @hidden */
        private static __fmicelinkBinaryInitialized;
        /** @hidden */
        static fmicelinkBinaryInitialize(): void;
    }
}
declare namespace fm.icelink {
    /**
    Class to hold a boolean value passed by reference.
    */
    class BooleanHolder {
        getTypeString(): string;
        /** @hidden */
        private _value;
        private fmicelinkBooleanHolderInit;
        /**
        Initializes a new instance of the [[fm.icelink.booleanHolder]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.booleanHolder]] class.
        @param value The value.
        */
        constructor(value: boolean);
        /**
        Gets the value.
        */
        getValue(): boolean;
        /**
        Sets the value.
        */
        setValue(value: boolean): void;
    }
}
declare namespace fm.icelink {
    /**
    Details about the current build.
    */
    class Build {
        getTypeString(): string;
        /**
        Gets the build version.
        */
        static readonly VersionConstant: string;
        constructor();
        /**
        Gets the build date.
        */
        static getDate(): fm.icelink.DateTime;
        /**
        Gets the build day.
        */
        static getDay(): number;
        /**
        Gets the build major version.
        */
        static getMajorVersion(): number;
        /**
        Gets the build minor version.
        */
        static getMinorVersion(): number;
        /**
        Gets the build month.
        */
        static getMonth(): number;
        /**
        Gets the build patch version.
        */
        static getPatchVersion(): number;
        /**
        Gets the build revision version.
        */
        static getRevisionVersion(): number;
        /**
        Gets the full build version.
        */
        static getVersion(): string;
        /**
        Gets the build year.
        */
        static getYear(): number;
    }
}
declare namespace fm.icelink {
    /**
    Class to hold a byte value passed by reference.
    */
    class ByteHolder {
        getTypeString(): string;
        /** @hidden */
        private _value;
        private fmicelinkByteHolderInit;
        /**
        Initializes a new instance of the [[fm.icelink.byteHolder]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.byteHolder]] class.
        @param value The value.
        */
        constructor(value: number);
        /**
        Gets the value.
        */
        getValue(): number;
        /**
        Sets the value.
        */
        setValue(value: number): void;
    }
}
declare namespace fm.icelink {
    /**
    Class to hold a character value passed by reference.
    */
    class CharacterHolder {
        getTypeString(): string;
        /** @hidden */
        private _value;
        private fmicelinkCharacterHolderInit;
        /**
        Initializes a new instance of the [[fm.icelink.characterHolder]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.characterHolder]] class.
        @param value The value.
        */
        constructor(value: number);
        /**
        Gets the value.
        */
        getValue(): number;
        /**
        Sets the value.
        */
        setValue(value: number): void;
    }
}
declare namespace fm.icelink {
    /**
    A circular buffer.
    */
    class CircularBuffer {
        getTypeString(): string;
        /** @hidden */
        private __allowRead;
        /** @hidden */
        private __buffer;
        /** @hidden */
        private _latency;
        /** @hidden */
        private _littleEndian;
        /** @hidden */
        private _readOffset;
        /** @hidden */
        private _writeOffset;
        private fmicelinkCircularBufferInit;
        /**
        Initializes a new instance of the [[fm.icelink.circularBuffer]] class.
        @param length The length.
        @param latency The latency.
        */
        constructor(length: number, latency: number);
        /**
        Initializes a new instance of the [[fm.icelink.circularBuffer]] class.
        @param length The length.
        @param latency The latency.
        @param littleEndian Whether the data is little-endian.
        */
        constructor(length: number, latency: number, littleEndian: boolean);
        /**
        Gets the number of bytes available for reading.
        */
        getAvailable(): number;
        /**
        Gets the latency.
        */
        getLatency(): number;
        /**
        Gets the length.
        */
        getLength(): number;
        /**
        Gets whether the data is little-endian.
        */
        getLittleEndian(): boolean;
        /**
        Gets the read offset.
        */
        getReadOffset(): number;
        /**
        Gets the read offset.
        */
        getWriteOffset(): number;
        /**
        Reads data from the buffer.
        @param length The number of bytes to read.
        */
        read(length: number): fm.icelink.DataBuffer;
        /** @hidden */
        private setLatency;
        /** @hidden */
        private setLittleEndian;
        /** @hidden */
        private setReadOffset;
        /** @hidden */
        private setWriteOffset;
        /**
        Writes data to the buffer.
        @param buffer The data to write.
        */
        write(buffer: fm.icelink.DataBuffer): void;
    }
}
declare namespace fm.icelink {
    /**
    A collection of values.
    */
    abstract class Collection<T, TCollection extends fm.icelink.Collection<T, TCollection>> {
        getTypeString(): string;
        /** @hidden */
        private __values;
        /** @hidden */
        private __valuesCache;
        /** @hidden */
        private __valuesLock;
        /**
        Initializes a new instance of the [[fm.icelink.collection]] class.
        */
        constructor();
        /**
        Adds a value.
        @param value The value.
        */
        add(value: T): boolean;
        /**
        Adds some values.
        @param values The values.
        */
        addMany(values: T[]): void;
        /**
        Invoked when an element is added to the collection.
        @param value The value.
        */
        protected addSuccess(value: T): void;
        /**
        Invoked after an element is added to the collection.
        @param value The value.
        */
        protected addSuccessNoLock(value: T): void;
        /**
        Determined whether the collection contains at least one value.
        */
        any(): boolean;
        /**
        Determined whether the collection contains at least one value that matches the specified predicate.
        @param predicate The predicate.
        */
        any(predicate: fm.icelink.IFunction1<T, boolean>): boolean;
        /**
        Creates an array from a list.
        @param list The list.
        */
        protected abstract arrayFromList(list: Array<T>): T[];
        /**
        Determines whether the collection contains a value.
        @param value The value.
        */
        contains(value: T): boolean;
        /**
        Creates a collection.
        */
        protected abstract createCollection(): TCollection;
        /**
        Gets the first value. Throws an exception if there are no values in the collection.
        */
        first(): T;
        /**
        Gets the first value that matches the specified predicate. Throws an exception if there are no such values in the collection.
        @param predicate The predicate.
        */
        first(predicate: fm.icelink.IFunction1<T, boolean>): T;
        /**
        Gets the first value. Returns a default value if there are no values in the collection.
        */
        firstOrDefault(): T;
        /**
        Gets the first value that matches the specified predicate. Returns a default value if there are no such values in the collection.
        @param predicate The predicate.
        */
        firstOrDefault(predicate: fm.icelink.IFunction1<T, boolean>): T;
        /**
        Executes a callback function once per value.
        @param callback The callback to execute.
        */
        forEach(callback: fm.icelink.IAction2<T, number>): void;
        /**
        Gets the count.
        */
        getCount(): number;
        /**
        Gets the value.
        */
        getValue(): T;
        /**
        Gets the values.
        */
        getValues(): T[];
        /**
        Gets the last value. Throws an exception if there are no values in the collection.
        */
        last(): T;
        /**
        Gets the last value that matches the specified predicate. Throws an exception if there are no such values in the collection.
        @param predicate The predicate.
        */
        last(predicate: fm.icelink.IFunction1<T, boolean>): T;
        /**
        Gets the last value. Returns a default value if there are no values in the collection.
        */
        lastOrDefault(): T;
        /**
        Gets the last value that matches the specified predicate. Returns a default value if there are no such values in the collection.
        @param predicate The predicate.
        */
        lastOrDefault(predicate: fm.icelink.IFunction1<T, boolean>): T;
        /**
        Removes a value.
        @param value The value.
        */
        remove(value: T): boolean;
        /**
        Removes all values.
        */
        removeAll(): void;
        /**
        Removes the first value.
        */
        removeFirst(): T;
        /**
        Removes the first value that matches a given condition.
        */
        removeFirst(condition: fm.icelink.IFunction1<T, boolean>): T;
        /**
        Removes the last value.
        */
        removeLast(): T;
        /**
        Removes the last value that matches a given condition.
        */
        removeLast(condition: fm.icelink.IFunction1<T, boolean>): T;
        /**
        Removes some values.
        @param values The values.
        */
        removeMany(values: T[]): void;
        /**
        Invoked when an element is removed from the collection.
        @param value The value.
        */
        protected removeSuccess(value: T): void;
        /**
        Invoked after an element is removed from the collection.
        @param value The value.
        */
        protected removeSuccessNoLock(value: T): void;
        /**
        Replaces the collection with a new set of values.
        @param values The values.
        */
        replace(values: T[]): void;
        /**
        Sets the value.
        */
        setValue(value: T): void;
        /**
        Sets the values.
        */
        setValues(value: T[]): void;
        /**
        Gets the only value. Throws an exception if there are no values or more than one value in the collection.
        */
        single(): T;
        /**
        Gets the only value that matches the specified predicate. Throws an exception if there are no values or more than one value in the collection.
        */
        single(predicate: fm.icelink.IFunction1<T, boolean>): T;
        /**
        Gets the only value. Returns a default value if there are no values or more than one value in the collection.
        */
        singleOrDefault(): T;
        /**
        Gets the only value that matches the specified predicate. Returns a default value if there are no values or more than one value in the collection.
        */
        singleOrDefault(predicate: fm.icelink.IFunction1<T, boolean>): T;
        /**
        Clones the values into a new array.
        */
        toArray(): T[];
        /**
        Gets the value at the specified index. Throws an exception if a value does not exist at that index.
        @param index The index.
        */
        valueAt(index: number): T;
        /**
        Gets the value at the specified index. Returns a default value if a value does not exist at that index.
        @param index The index.
        */
        valueAtOrDefault(index: number): T;
        /**
        Creates a new collection with values that match the specified predicate.
        @param predicate The predicate.
        */
        where(predicate: fm.icelink.IFunction2<T, number, boolean>): TCollection;
    }
}
declare namespace fm.icelink {
    /**
    A record that calculates the min, max, and average from integer samples.
    */
    class DiagnosticSampler {
        getTypeString(): string;
        /** @hidden */
        private __arrayPointer;
        /** @hidden */
        private __count;
        /** @hidden */
        private __max;
        /** @hidden */
        private __min;
        /** @hidden */
        private __samples;
        /** @hidden */
        private __sum;
        /** @hidden */
        private _label;
        /** @hidden */
        private _lastValue;
        private fmicelinkDiagnosticSamplerInit;
        /**
        Creates a new instance of the DiagnosticRecord.
        */
        constructor();
        /**
        Creates a new instance of the DiagnosticRecord.
        @param averageSampleCount How many samples to include in the average.
        */
        constructor(averageSampleCount: number);
        /**
        Creates a new instance of the DiagnosticRecord.
        @param averageSampleCount How many samples to include in the average.
        @param label The label for this sampler.
        */
        constructor(averageSampleCount: number, label: string);
        /**
        Creates a new instance of the DiagnosticRecord.
        @param label The label for this sampler.
        */
        constructor(label: string);
        /**
        Adds a new sample to the calculation.
        @param longSample The sample to add.
        */
        addSample(longSample: number): void;
        /**
        Gets the average of all samples.
        */
        getAverage(): number;
        /**
        Gets how many samples this record has used.
        */
        getCount(): number;
        /**
        Gets the label for this sampler.
        */
        getLabel(): string;
        /**
        Gets the value of the last sample recorded.
        */
        getLastValue(): number;
        /**
        Gets the maximum sample ever recorded.
        */
        getMax(): number;
        /**
        Gets the minimum sample ever recorded.
        */
        getMin(): number;
        /**
        Gets how many samples are included in the average.
        */
        getSamplesInAverage(): number;
        /**
        Gets the sum of all values.
        */
        getSum(): number;
        /** @hidden */
        private setLabel;
        /** @hidden */
        private setLastValue;
    }
}
declare namespace fm.icelink {
    /**
    An interface for detecting equivalency.
    */
    interface IEquivalent<T> {
        isEquivalent(instance: T): boolean;
    }
}
declare namespace fm.icelink {
    /**
    Utility class to assist with ISO-8601 timestamp conversions.
    */
    class Iso8601Timestamp {
        getTypeString(): string;
        constructor();
        /**
        Converts a date to a ISO-8601 timestamp.
        @param dateTime The date to convert.
        @return The equivalent ISO-8601 timestamp.
        */
        static dateTimeToIso8601(dateTime: fm.icelink.DateTime): string;
        /** @hidden */
        private static getMinimumNeedleIndex;
        /**
        Gets the current UTC time in ISO-8601 format.
        */
        static getUtcNow(): string;
        /**
        Converts a ISO-8601 timestamp to a date.
        @param iso8601 The ISO-8601 timestamp to convert.
        @return The equivalent date.
        */
        static iso8601ToDateTime(iso8601: string): fm.icelink.DateTime;
        /** @hidden */
        private static tryParseDate;
        /** @hidden */
        private static tryParseTime;
        /** @hidden */
        private static tryParseTimezone;
        /** @hidden */
        private static tryRead;
    }
}
declare namespace fm.icelink {
    /** @hidden */
    class JsonCheckerModeWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.JsonCheckerMode);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    A countdown latch that will signal when the counter reaches zero.
    */
    class ManagedCountdownLatch {
        getTypeString(): string;
        /** @hidden */
        private __counter;
        /** @hidden */
        private __waitPromise;
        /**
        Creates a new instance of the latch with an unknown count. This will cause the latch to count into the negatives until SetCount is called.
        */
        constructor();
        /**
        Creates a new instance of the latch with a count.
        @param initialCount The initial counter value.
        */
        constructor(initialCount: number);
        /**
        Decrements the counter by one and signals if it reaches zero.
        */
        decrement(): void;
        /**
        Gets the current count on the latch.
        */
        getCount(): number;
        /**
        Resets the latch with an unknown count. This will cause the latch to count into the negatives until SetCount is called.
        */
        reset(): void;
        /**
        Resets the latch with a count.
        @param initialCount The initial counter value.
        */
        reset(initialCount: number): void;
        /**
        Sets the counter for the latch. This brings the count back up into positive numbers.
        */
        setCount(count: number): void;
        /**
        Generates a string description of this instance.
        */
        toString(): string;
        /**
        Returns a promise that resolves once the counter reaches zero.
        */
        waitAsync(): fm.icelink.Future<Object>;
    }
}
declare namespace fm.icelink {
    class OperatingSystemWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.OperatingSystem);
        toString(): string;
    }
}
declare namespace fm.icelink {
    class ArchitectureWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.Architecture);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    A pool of objects.
    */
    class Pool<T> {
        getTypeString(): string;
        /** @hidden */
        private __createObject;
        /** @hidden */
        private __createObjectCounter;
        /** @hidden */
        private __destroyLock;
        /** @hidden */
        private __isDestroyed;
        /** @hidden */
        private __stack;
        /** @hidden */
        private _maxSize;
        /** @hidden */
        private _minSize;
        private fmicelinkPoolInit;
        /**
        Initializes a new instance of the [[fm.icelink.pool]] class with a minimum size of 0 and a maximum size of 2,147,483,647.
        @param createObject A function that creates an object.
        */
        constructor(createObject: fm.icelink.IFunction0<T>);
        /**
        Initializes a new instance of the [[fm.icelink.pool]] class with a specified minimum size and a maximum size of 2,147,483,647.
        @param createObject A function that creates an object.
        @param minSize The minimum size.
        */
        constructor(createObject: fm.icelink.IFunction0<T>, minSize: number);
        /**
        Initializes a new instance of the [[fm.icelink.pool]] class. with a specified minimum size and a specified maximum size.
        @param createObject A function that creates an object.
        @param minSize The minimum size.
        @param maxSize The maximum size.
        */
        constructor(createObject: fm.icelink.IFunction0<T>, minSize: number, maxSize: number);
        /**
        Removes all items from the pool and calls a callback for each one.
        @param destroyCallback
        */
        destroy(destroyCallback: fm.icelink.IAction1<T>): boolean;
        /**
        Gets an object.
        */
        get(): T;
        /**
        Gets the number of available objects.
        */
        getAvailable(): number;
        /**
        Gets the maximum size. Value must be >= 0. A value of 0 indicates no maximum.
        */
        getMaxSize(): number;
        /**
        Gets the minimum size. Value must be >= 0.
        */
        getMinSize(): number;
        /**
        Gets the current size of the pool.
        */
        getSize(): number;
        /**
        Put an object back.
        @param item
        */
        put(item: T): boolean;
        /** @hidden */
        private setMaxSize;
        /** @hidden */
        private setMinSize;
    }
}
declare namespace fm.icelink {
    class ProtocolTypeWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.ProtocolType);
        toString(): string;
    }
}
declare namespace fm.icelink {
    class SourceLanguageWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.SourceLanguage);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    Provides methods for serializing/deserializing .NET value types to/from JSON as well as facilities for converting objects and arrays if appropriate callbacks are supplied to assist with the conversion.
    */
    class JsonSerializer {
        getTypeString(): string;
        constructor();
        /** @hidden */
        private static charToUnicodeString;
        /**
        Deserializes a boolean value.
        @param valueJson The boolean JSON to deserialize.
        @return The deserialized boolean value.
        */
        static deserializeBoolean(valueJson: string): boolean;
        /**
        Deserializes a boolean array from JSON.
        @param arrayJson A JSON-serialized boolean array.
        @return An array of boolean values.
        */
        static deserializeBooleanArray(arrayJson: string): boolean[];
        /**
        Deserializes a decimal value.
        @param valueJson The decimal JSON to deserialize.
        @return The deserialized decimal value.
        */
        static deserializeDecimal(valueJson: string): number;
        /**
        Deserializes a decimal array from JSON.
        @param arrayJson A JSON-serialized decimal array.
        @return An array of decimal values.
        */
        static deserializeDecimalArray(arrayJson: string): number[];
        /**
        Deserializes a JSON string into a dictionary.
        @param dictionaryJson The JSON-encoded dictionary.
        @param createDictionaryCallback The callback that creates a blank dictionary.
        @param deserializeValueCallback The callback that deserializes a value.
        @return
                    The deserialized dictionary.
            
        */
        static deserializeDictionary<T>(dictionaryJson: string, createDictionaryCallback: fm.icelink.IFunction0<fm.icelink.Hash<string, T>>, deserializeValueCallback: fm.icelink.IFunction1<string, T>): fm.icelink.Hash<string, T>;
        /**
        Deserializes a double value.
        @param valueJson The double JSON to deserialize.
        @return The deserialized double value.
        */
        static deserializeDouble(valueJson: string): number;
        /**
        Deserializes a double array from JSON.
        @param arrayJson A JSON-serialized double array.
        @return An array of double values.
        */
        static deserializeDoubleArray(arrayJson: string): number[];
        /**
        Deserializes a float value.
        @param valueJson The float JSON to deserialize.
        @return The deserialized float value.
        */
        static deserializeFloat(valueJson: string): number;
        /**
        Deserializes a float array from JSON.
        @param arrayJson A JSON-serialized float array.
        @return An array of float values.
        */
        static deserializeFloatArray(arrayJson: string): number[];
        /**
        Deserializes a globally unique identifier.
        @param valueJson The GUID JSON to deserialize.
        @return The deserialized GUID.
        */
        static deserializeGuid(valueJson: string): fm.icelink.Guid;
        /**
        Deserializes a GUID array from JSON.
        @param arrayJson A JSON-serialized GUID array.
        @return An array of GUID values.
        */
        static deserializeGuidArray(arrayJson: string): fm.icelink.Guid[];
        /**
        Deserializes an integer value.
        @param valueJson The integer JSON to deserialize.
        @return The deserialized integer value.
        */
        static deserializeInteger(valueJson: string): number;
        /**
        Deserializes a integer array from JSON.
        @param arrayJson A JSON-serialized integer array.
        @return An array of integer values.
        */
        static deserializeIntegerArray(arrayJson: string): number[];
        /**
        Deserializes a long value.
        @param valueJson The long JSON to deserialize.
        @return The deserialized long value.
        */
        static deserializeLong(valueJson: string): number;
        /**
        Deserializes a long array from JSON.
        @param arrayJson A JSON-serialized long array.
        @return An array of long values.
        */
        static deserializeLongArray(arrayJson: string): number[];
        /**
        Deserializes a JSON string into a target object type.
        @param json The JSON-encoded string.
        @param creator The method used for creating a new object.
        @param callback The method used for deserializing a property.
        @return The deserialized object.
        */
        static deserializeObject<T>(json: string, creator: fm.icelink.IFunction0<T>, callback: fm.icelink.IAction3<T, string, string>): T;
        /**
        Deserializes a JSON string into an array of target object types.
        @param json The JSON-encoded string.
        @param deserializer The callback used to deserialize each item in the array.
        @return An array of deserialized objects.
        */
        static deserializeObjectArray<T>(json: string, deserializer: fm.icelink.IFunction1<string, T>): Array<T>;
        /**
        Deserializes a JSON string into a [[fm.icelink.serializable]] target object type.
        @param json The JSON-encoded string.
        @param creator The method used for creating a new object.
        @param callback The method used for deserializing a property.
        @return The deserialized object.
        */
        static deserializeObjectFast<T extends fm.icelink.Serializable>(json: string, creator: fm.icelink.IFunction0<T>, callback: fm.icelink.IAction3<T, string, string>): T;
        /**
        Deserializes a piece of raw JSON.
        @param dataJson The raw data.
        @return The deserialized data.
        */
        static deserializeRaw(dataJson: string): string;
        /**
        Deserializes a raw array from JSON.
        @param json A JSON-serialized raw array.
        @return An array of raw values.
        */
        static deserializeRawArray(json: string): Array<string>;
        /**
        Deserializes a string.
        @param valueJson The string to deserialize.
        @return The deserialized string value.
        */
        static deserializeString(valueJson: string): string;
        /**
        Deserializes a simple string array from JSON.
        @param arrayJson A JSON-serialized string array.
        @return An array of string values.
        */
        static deserializeStringArray(arrayJson: string): string[];
        /**
        Escapes any special characters in a string.
        @param text The string without escaped characters.
        @return The escaped string.
        */
        static escapeString(text: string): string;
        /** @hidden */
        private static intToHex;
        /**
        Determines whether the specified JSON string is valid.
        @param json The JSON string to validate.
        @return True if the JSON string is valid; false otherwise.
        */
        static isValidJson(json: string): boolean;
        /**
        Serializes a boolean value.
        @param value The boolean to serialize.
        @return The serialized boolean value.
        */
        static serializeBoolean(value: boolean): string;
        /**
        Serializes a boolean array to JSON.
        @param array An array of boolean values.
        @return A JSON-serialized boolean array.
        */
        static serializeBooleanArray(array: boolean[]): string;
        /**
        Serializes a decimal value.
        @param value The decimal to serialize.
        @return The serialized decimal value.
        */
        static serializeDecimal(value: number): string;
        /**
        Serializes a decimal array to JSON.
        @param array An array of decimal values.
        @return A JSON-serialized decimal array.
        */
        static serializeDecimalArray(array: number[]): string;
        /**
        Serializes a dictionary into a JSON string.
        @param dictionary The dictionary being serialized.
        @param serializeValueCallback The callback that serializes a value.
        @return The dictionary as a JSON string.
        */
        static serializeDictionary<T>(dictionary: fm.icelink.Hash<string, T>, serializeValueCallback: fm.icelink.IFunction1<T, string>): string;
        /**
        Serializes a double value.
        @param value The double to serialize.
        @return The serialized double value.
        */
        static serializeDouble(value: number): string;
        /**
        Serializes a double array to JSON.
        @param array An array of double values.
        @return A JSON-serialized double array.
        */
        static serializeDoubleArray(array: number[]): string;
        /**
        Serializes a float value.
        @param value The float to serialize.
        @return The serialized float value.
        */
        static serializeFloat(value: number): string;
        /**
        Serializes a float array to JSON.
        @param array An array of float values.
        @return A JSON-serialized float array.
        */
        static serializeFloatArray(array: number[]): string;
        /**
        Serializes a globally unique identifier.
        @param value The GUID to serialize.
        @return The serialized GUID.
        */
        static serializeGuid(value: fm.icelink.Guid): string;
        /**
        Serializes a GUID array to JSON.
        @param array An array of GUID values.
        @return A JSON-serialized GUID array.
        */
        static serializeGuidArray(array: fm.icelink.Guid[]): string;
        /**
        Serializes an integer value.
        @param value The integer to serialize.
        @return The serialized integer value.
        */
        static serializeInteger(value: number): string;
        /**
        Serializes a integer array to JSON.
        @param array An array of integer values.
        @return A JSON-serialized integer array.
        */
        static serializeIntegerArray(array: number[]): string;
        /**
        Serializes a long value.
        @param value The long to serialize.
        @return The serialized long value.
        */
        static serializeLong(value: number): string;
        /**
        Serializes a long array to JSON.
        @param array An array of long values.
        @return A JSON-serialized long array.
        */
        static serializeLongArray(array: number[]): string;
        /**
        Serializes an object into a JSON string.
        @param source The object being serialized.
        @param callback The method used for serializing properties.
        @return The object as a JSON string.
        */
        static serializeObject<T>(source: T, callback: fm.icelink.IAction2<T, fm.icelink.Hash<string, string>>): string;
        /**
        Serializes an object array into a JSON string.
        @param objects The object array being serialized.
        @param serializer The callback used to serialize each item in the array.
        @return The object array as a JSON string.
        */
        static serializeObjectArray<T>(objects: T[], serializer: fm.icelink.IFunction1<T, string>): string;
        /**
        Serializes a [[fm.icelink.serializable]] object into a JSON string.
        @param source The object being serialized.
        @param callback The method used for serializing properties.
        @return The object as a JSON string.
        */
        static serializeObjectFast<T extends fm.icelink.Serializable>(source: T, callback: fm.icelink.IAction2<T, fm.icelink.Hash<string, string>>): string;
        /**
        Serializes a piece of raw JSON.
        @param dataJson The raw data.
        @return The serialized data.
        */
        static serializeRaw(dataJson: string): string;
        /**
        Serializes a raw array to JSON.
        @param jsons An array of raw values.
        @return A JSON-serialized raw array.
        */
        static serializeRawArray(jsons: string[]): string;
        /**
        Serializes a string.
        @param value The string to serialize.
        @return The serialized string value.
        */
        static serializeString(value: string): string;
        /**
        Serializes a string array to JSON.
        @param array An array of string values.
        @return A JSON-serialized string array.
        */
        static serializeStringArray(array: string[]): string;
        /**
        Trims the quotes from a JavaScript string value.
        @param value The JavaScript string value.
        @return The string without quotes.
        */
        static trimQuotes(value: string): string;
        /**
        Unescapes any special characters from a string.
        @param text The string with escaped characters.
        @return The unescaped string.
        */
        static unescapeString(text: string): string;
        /** @hidden */
        private static unicodeStringToChar;
    }
}
declare namespace fm.icelink {
    /**
    Provides methods for serializing/deserializing .NET value types to/from JSON as well as facilities for converting objects and arrays if appropriate callbacks are supplied to assist with the conversion.
    */
    class Serializer extends fm.icelink.JsonSerializer {
        getTypeString(): string;
        constructor();
    }
}
declare namespace fm.icelink {
    /**
    A simple state machine.
    */
    abstract class StateMachine<T> {
        getTypeString(): string;
        /** @hidden */
        private __stateValue;
        /** @hidden */
        private __transitions;
        /** @hidden */
        private __transitionsLock;
        /** @hidden */
        private _lastStateTicks;
        /** @hidden */
        private _systemTimestamp;
        private fmicelinkStateMachineInit;
        /**
        Initializes a new instance of the [[fm.icelink.stateMachine]] class.
        @param initialState The initial state.
        */
        constructor(initialState: T);
        /**
        Adds an allowed transition.
        @param fromState The "from" state.
        @param toState The "to" state.
        */
        addTransition(fromState: T, toState: T): void;
        /**
        Determines whether a transition to the specified state is allowed.
        @param toState The "to" state.
        @return `true` if a transition to the specified state is allowed; otherwise, `false`.
            
        */
        canTransition(toState: T): boolean;
        /**
        Gets the length of time spent in the last state, in milliseconds.
        */
        getLastStateMillis(): number;
        /**
        Gets the length of time spent in the last state, in ticks.
        */
        getLastStateTicks(): number;
        /**
        Gets the state.
        */
        getState(): T;
        /**
        Gets the state value.
        */
        protected getStateValue(): number;
        /**
        Gets the system timestamp of the last state transition.
        */
        getSystemTimestamp(): number;
        /** @hidden */
        private setLastStateTicks;
        /** @hidden */
        private setStateValue;
        /** @hidden */
        private setSystemTimestamp;
        /**
        Converts a state to an integer value.
        @param state The state.
        */
        protected abstract stateToValue(state: T): number;
        /**
        Transitions to the specified state.
        @param toState The "to" state.
        @return `true` if a transition to the specified state is allowed; otherwise, `false`.
            
        */
        transition(toState: T): boolean;
        /**
        Converts an integer value to a state.
        @param value The integer value.
        */
        protected abstract valueToState(value: number): T;
    }
}
declare namespace fm.icelink {
    /** @hidden */
    class StringTypeWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.StringType);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    A linked list node.
    */
    class LinkedListNode<T> {
        getTypeString(): string;
        /** @hidden */
        private _next;
        /** @hidden */
        private _previous;
        /** @hidden */
        private _value;
        /**
        Initializes a new instance of the [[fm.icelink.linkedListNode]] class.
        @param item The item.
        */
        constructor(item: T);
        /**
        Gets the next node. Will be `null` if last.
        */
        getNext(): fm.icelink.LinkedListNode<T>;
        /**
        Gets the previous node. Null if first.
        */
        getPrevious(): fm.icelink.LinkedListNode<T>;
        /**
        Gets the item in the linked list.
        */
        getValue(): T;
        /** @hidden */
        setNext(value: fm.icelink.LinkedListNode<T>): void;
        /** @hidden */
        setPrevious(value: fm.icelink.LinkedListNode<T>): void;
        /** @hidden */
        private setValue;
    }
}
declare namespace fm.icelink {
    /**
    A linked list enumerator.
    */
    class LinkedListEnumerator<T> {
        getTypeString(): string;
        /** @hidden */
        private __currentNode;
        /** @hidden */
        private __root;
        /** @hidden */
        private __started;
        private fmicelinkLinkedListEnumeratorInit;
        /**
        Initializes a new instance of the [[fm.icelink.linkedListEnumerator]] class.
        @param root The root node.
        */
        constructor(root: fm.icelink.LinkedListNode<T>);
        /**
        Gets the current value.
        */
        getCurrent(): T;
        /**
        Gets the current node.
        */
        getCurrentNode(): fm.icelink.LinkedListNode<T>;
        /**
        Moves to the next node.
        */
        moveNext(): boolean;
        /**
        Resets this instance.
        */
        reset(): void;
    }
}
declare namespace fm.icelink {
    /** @hidden */
    class InternalConcurrentQueue<T> {
        getTypeString(): string;
        /** @hidden */
        private _backingData;
        constructor();
        enqueue(item: T): void;
        getCount(): number;
        getIsEmpty(): boolean;
        tryDequeue(item: fm.icelink.Holder<T>): boolean;
        tryPeek(item: fm.icelink.Holder<T>): boolean;
    }
}
declare namespace fm.icelink {
    /** @hidden */
    class InternalConcurrentStack<T> {
        getTypeString(): string;
        /** @hidden */
        private _backingData;
        constructor();
        clear(): void;
        getCount(): number;
        getIsEmpty(): boolean;
        push(item: T): void;
        tryPeek(result: fm.icelink.Holder<T>): boolean;
        tryPop(result: fm.icelink.Holder<T>): boolean;
    }
}
declare namespace fm.icelink {
    /**
    A ConcurrentDictonary that maps to the appropriate platform version.
    */
    class ManagedConcurrentDictionary<TKey, TValue> {
        getTypeString(): string;
        /** @hidden */
        private __dictionary;
        /**
        Creates a new instance.
        */
        constructor();
        /**
        Creates a new ManagedConcurrentDictionary.
        @param hashCallback The hash function to use when the backing dictionary requires the key to be a string.
        */
        constructor(hashCallback: fm.icelink.IFunction1<TKey, string>);
        /**
        Updates a value in the dictionary or adds it if it does not exist.
        @param key The key to use for updating for adding.
        @param addValue The value to be added for an absent key.
        */
        addOrUpdate(key: TKey, addValue: TValue): TValue;
        /**
        Updates a value in the dictionary or adds it if it does not exist.
        @param key The key to use for updating for adding.
        @param addValue The value to be added for an absent key.
        @param updateValueFactory The function to use for generating a value based on an existing key.
        */
        addOrUpdate(key: TKey, addValue: TValue, updateValueFactory: fm.icelink.IFunction2<TKey, TValue, TValue>): TValue;
        /**
        Clears the dictionary of all items.
        */
        clear(): void;
        /**
        True if the dictionary contains the key.
        @param key The key to check.
        */
        containsKey(key: TKey): boolean;
        /**
        Gets the number of items in the dictionary.
        */
        getCount(): number;
        /**
        Gets true if dictionary is empty.
        */
        getIsEmpty(): boolean;
        /**
        Gets an array of keys.
        */
        getKeys(): Array<TKey>;
        /**
        Gets the value from the dictionary or adds a new one if it does not exist.
        @param key The key to use when adding to the dictionary.
        @param valueFactory The Func that will create a value if needed.
        @return The dictionary value if exist, the value returned by the Func if not.
        */
        getOrAdd(key: TKey, valueFactory: fm.icelink.IFunction1<TKey, TValue>): TValue;
        /**
        Gets an array of Values.
        */
        getValues(): Array<TValue>;
        /** @hidden */
        private hash;
        /**
        Tries to add a new value to the dictionary.
        @param key The key to use when adding.
        @param value The value to be added to the dictionary.
        @return True if added, false if key already exists.
        */
        tryAdd(key: TKey, value: TValue): boolean;
        /**
        Tries to get a value from the dictionary.
        @param key They key of the item to get form the dictionary.
        @param value The value that was just received or null if failed.
        @return True if succeeded.
        */
        tryGetValue(key: TKey, value: fm.icelink.Holder<TValue>): boolean;
        /**
        Tries and removes a value from the dictionary.
        @param key The key of the item to remove.
        @return True if successful.
        */
        tryRemove(key: TKey): boolean;
        /**
        Tries and removes a value from the dictionary.
        @param key The key of the item to remove.
        @param value The value that was just removed.
        @return True if successful.
        */
        tryRemove(key: TKey, value: fm.icelink.Holder<TValue>): boolean;
        /**
        Tries to update the value in the dictionary.
        @param key The key to use when updating.
        @param newValue The new value.
        @param comparisonValue The value to compare with the current value in the dictionary.
        @return True if succeeded.
        */
        tryUpdate(key: TKey, newValue: TValue, comparisonValue: TValue): boolean;
    }
}
declare namespace fm.icelink {
    /**
    A thread-safe queue.
    */
    class ManagedConcurrentQueue<T> {
        getTypeString(): string;
        /** @hidden */
        private __queue;
        /**
        Creates a new ConcurrentQueue.
        */
        constructor();
        /**
        Add the item to the end of the queue.
        @param item The item to add.
        */
        enqueue(item: T): void;
        /**
        Gets the amount of items in this queue.
        */
        getCount(): number;
        /**
        Gets true if the queue is empty.
        */
        getIsEmpty(): boolean;
        /**
        Removes and returns the item at the front of the queue.
        @param item The dequeued item.
        @return True if item received, false if no item.
        */
        tryDequeue(item: fm.icelink.Holder<T>): boolean;
        /**
        Peeks at the first item in the queue.
        @param item The item at the front of the queue.
        @return False if queue is empty. True if first item peeked at.
        */
        tryPeek(item: fm.icelink.Holder<T>): boolean;
    }
}
declare namespace fm.icelink {
    /**
    A ConcurrentStack that maps to the appropriate platform version.
    */
    class ManagedConcurrentStack<TValue> {
        getTypeString(): string;
        /** @hidden */
        private __stack;
        /**
        Creates a new instance of a ConcurrentStack.
        */
        constructor();
        /**
        Clears the stack of all items.
        */
        clear(): void;
        /**
        Gets the amount of items in the stack.
        */
        getCount(): number;
        /**
        Gets true if the stack is empty.
        */
        getIsEmpty(): boolean;
        /**
        Pushes a new item on top of the stack.
        @param item The item to push.
        */
        push(item: TValue): void;
        /**
        Tries to peek at the top value in stack.
        @param result The value from the stack if possible, null otherwise.
        @return True if peek succeeded, false if not.
        */
        tryPeek(result: fm.icelink.Holder<TValue>): boolean;
        /**
        Tries to pop the top value off of the stack.
        @param result The value from the top of the stack if possible, null otherwise.
        @return True if pop suceeded, false if not.
        */
        tryPop(result: fm.icelink.Holder<TValue>): boolean;
    }
}
declare namespace fm.icelink {
    /**
    A mutable 2-tuple.
    */
    class MutablePair<T1, T2> {
        getTypeString(): string;
        /** @hidden */
        private _item1;
        /** @hidden */
        private _item2;
        /**
        Initializes a new instance of the [[fm.icelink.mutablePair]] class.
        @param item1 First item the tuple holds.
        @param item2 Second item the tuple holds.
        */
        constructor(item1: T1, item2: T2);
        /**
        Gets the first item in the tuple.
        */
        getItem1(): T1;
        /**
        Gets the second item in the tuple.
        */
        getItem2(): T2;
        /**
        Sets the first item in the tuple.
        */
        setItem1(value: T1): void;
        /**
        Sets the second item in the tuple.
        */
        setItem2(value: T2): void;
    }
}
declare namespace fm.icelink {
    /**
    A mutable 1-tuple.
    */
    class MutableUnit<T> {
        getTypeString(): string;
        /** @hidden */
        private _item;
        /**
        Initializes a new instance of the [[fm.icelink.mutableUnit]] class.
        @param item The item to hold.
        */
        constructor(item: T);
        /**
        Gets the first item in the tuple.
        */
        getItem(): T;
        /**
        Sets the first item in the tuple.
        */
        setItem(value: T): void;
    }
}
declare namespace fm.icelink {
    /**
    A 2-tuple.
    */
    class Pair<T1, T2> {
        getTypeString(): string;
        /** @hidden */
        private _item1;
        /** @hidden */
        private _item2;
        /**
        Initializes a new instance of the [[fm.icelink.pair]] class.
        @param item1 First item the tuple holds.
        @param item2 Second item the tuple holds.
        */
        constructor(item1: T1, item2: T2);
        /**
        Calculates the hashcode for this pair.
        */
        getHashCode(): number;
        /**
        Gets the first item in the tuple.
        */
        getItem1(): T1;
        /**
        Gets the second item in the tuple.
        */
        getItem2(): T2;
        /** @hidden */
        private setItem1;
        /** @hidden */
        private setItem2;
    }
}
declare namespace fm.icelink {
    /**
    Simple log provider that writes log events to a local array.
    */
    class LogEventLogProvider extends fm.icelink.LogProvider {
        getTypeString(): string;
        /** @hidden */
        private __events;
        /** @hidden */
        private __eventsLock;
        /**
        Initializes a new instance of the [[fm.icelink.logEventLogProvider]] class using [[fm.icelink.logLevel.Info]].
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.logEventLogProvider]] class.
        @param level The log level.
        */
        constructor(level: fm.icelink.LogLevel);
        /**
        Clears all text from the log and returns the former contents.
        */
        clear(): fm.icelink.LogEvent[];
        /**
        Logs a message at the specified log level.
        @param logEvent The log event details.
        */
        protected doLog(logEvent: fm.icelink.LogEvent): void;
        /**
        Gets the logged events.
        */
        getEvents(): fm.icelink.LogEvent[];
    }
}
declare namespace fm.icelink {
    /**
    A 3-tuple.
    */
    class Triple<T1, T2, T3> {
        getTypeString(): string;
        /** @hidden */
        private _item1;
        /** @hidden */
        private _item2;
        /** @hidden */
        private _item3;
        /**
        Initializes a new instance of the [[fm.icelink.triple]] class.
        @param item1 First item the tuple holds.
        @param item2 Second item the tuple holds.
        @param item3 Third item the tuple holds.
        */
        constructor(item1: T1, item2: T2, item3: T3);
        /**
        Gets the first item in the tuple.
        */
        getItem1(): T1;
        /**
        Gets the second item in the tuple.
        */
        getItem2(): T2;
        /**
        Gets the third item in the tuple.
        */
        getItem3(): T3;
        /** @hidden */
        private setItem1;
        /** @hidden */
        private setItem2;
        /** @hidden */
        private setItem3;
    }
}
declare namespace fm.icelink {
    /**
    A 1-tuple.
    */
    class Unit<T> {
        getTypeString(): string;
        /** @hidden */
        private _item;
        /**
        Initializes a new instance of the [[fm.icelink.unit]] class.
        @param item The item to hold.
        */
        constructor(item: T);
        /**
        Gets the item in the tuple.
        */
        getItem(): T;
        /** @hidden */
        private setItem;
    }
}
declare namespace fm.icelink {
    class CompareResultWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.CompareResult);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    A collection of platform-independent constant values.
    */
    class Constants {
        getTypeString(): string;
        /** @hidden */
        private static fm_icelink_Constants___hoursPerDay;
        /** @hidden */
        private static fm_icelink_Constants___millisecondsPerDay;
        /** @hidden */
        private static fm_icelink_Constants___millisecondsPerHour;
        /** @hidden */
        private static fm_icelink_Constants___millisecondsPerMinute;
        /** @hidden */
        private static fm_icelink_Constants___millisecondsPerSecond;
        /** @hidden */
        private static fm_icelink_Constants___minutesPerDay;
        /** @hidden */
        private static fm_icelink_Constants___minutesPerHour;
        /** @hidden */
        private static fm_icelink_Constants___nanosecondsPerTick;
        /** @hidden */
        private static fm_icelink_Constants___secondsPerDay;
        /** @hidden */
        private static fm_icelink_Constants___secondsPerHour;
        /** @hidden */
        private static fm_icelink_Constants___secondsPerMinute;
        /** @hidden */
        private static fm_icelink_Constants___ticksPerDay;
        /** @hidden */
        private static fm_icelink_Constants___ticksPerHour;
        /** @hidden */
        private static fm_icelink_Constants___ticksPerMillisecond;
        /** @hidden */
        private static fm_icelink_Constants___ticksPerMinute;
        /** @hidden */
        private static fm_icelink_Constants___ticksPerSecond;
        constructor();
        /**
        Gets the number of hours in one day.
        */
        static getHoursPerDay(): number;
        /**
        Gets the number of milliseconds in one hour.
        */
        static getMillisecondsPerDay(): number;
        /**
        Gets the number of milliseconds in one hour.
        */
        static getMillisecondsPerHour(): number;
        /**
        Gets the number of milliseconds in one minute.
        */
        static getMillisecondsPerMinute(): number;
        /**
        Gets the number of milliseconds in one second.
        */
        static getMillisecondsPerSecond(): number;
        /**
        Gets the number of minutes in one day.
        */
        static getMinutesPerDay(): number;
        /**
        Gets the number of minutes in one hour.
        */
        static getMinutesPerHour(): number;
        /**
        Gets the number of nanoseconds in one tick.
        */
        static getNanosecondsPerTick(): number;
        /**
        Gets the number of seconds in one day.
        */
        static getSecondsPerDay(): number;
        /**
        Gets the number of seconds in one hour.
        */
        static getSecondsPerHour(): number;
        /**
        Gets the number of seconds in one minute.
        */
        static getSecondsPerMinute(): number;
        /**
        Gets the number of ticks in one day.
        */
        static getTicksPerDay(): number;
        /**
        Gets the number of ticks in one hour.
        */
        static getTicksPerHour(): number;
        /**
        Gets the number of ticks in one millisecond.
        */
        static getTicksPerMillisecond(): number;
        /**
        Gets the number of ticks in one minute.
        */
        static getTicksPerMinute(): number;
        /**
        Gets the number of ticks in one second.
        */
        static getTicksPerSecond(): number;
        /** @hidden */
        private static __fmicelinkConstantsInitialized;
        /** @hidden */
        static fmicelinkConstantsInitialize(): void;
    }
}
declare namespace fm.icelink {
    /**
    A data buffer stream.
    */
    class DataBufferStream {
        getTypeString(): string;
        /** @hidden */
        private __bitPosition;
        /** @hidden */
        private __buffer;
        /** @hidden */
        private __position;
        private fmicelinkDataBufferStreamInit;
        /**
        Initializes a new instance of the [[fm.icelink.dataBufferStream]] class.
        @param buffer The buffer.
        */
        constructor(buffer: fm.icelink.DataBuffer);
        /**
        Initializes a new instance of the [[fm.icelink.dataBufferStream]] class.
        @param dataBufferSize Size of the data buffer.
        */
        constructor(dataBufferSize: number);
        /**
        Initializes a new instance of the [[fm.icelink.dataBufferStream]] class.
        @param dataBufferSize Size of the data buffer.
        @param littleEndian Whether the data is little-endian.
        */
        constructor(dataBufferSize: number, littleEndian: boolean);
        /**
        Gets the available bytes to be read from the DataBuffer.
        */
        getAvailable(): number;
        /**
        Gets the bit position within a byte.
        */
        getBitPosition(): number;
        /**
        Gets the buffer.
        */
        getBuffer(): fm.icelink.DataBuffer;
        /**
        Gets the buffer length.
        */
        getLength(): number;
        /**
        Gets the position within the stream.
        */
        getPosition(): number;
        /**
        Resets the bit count to 0 and advances to the next byte.
        */
        nextByte(): void;
        /**
        Reads an 8-bit value from the DataBuffer without advancing the Position.
        */
        peek(): number;
        /**
        Reads the specified length from the DataBuffer and advances the position by the length.
        @param length The length.
        */
        read(length: number): fm.icelink.DataBuffer;
        /**
        Read a single bit and advance the bit position by 1.
        */
        read1(): boolean;
        /**
        Reads an 15-bit value from the DataBuffer and advances the Position by 1 and the BitPosition by 7.
        */
        read15(): number;
        /**
        Reads an 16-bit value from the DataBuffer and advances the Position by 2.
        */
        read16(): number;
        /**
        Read a 2-bit value and advance the BitPosition by 2.
        */
        read2(): number;
        /**
        Reads an 24-bit value from the DataBuffer and advances the Position by 3.
        */
        read24(): number;
        /**
        Read a 3-bit value and advance the BitPosition by 3.
        */
        read3(): number;
        /**
        Reads an 32-bit value from the DataBuffer and advances the Position by 4.
        */
        read32(): number;
        /**
        Read a 4-bit value and advance the BitPosition by 4.
        */
        read4(): number;
        /**
        Reads an 40-bit value from the DataBuffer and advances the Position by 5.
        */
        read40(): number;
        /**
        Reads an 48-bit value from the DataBuffer and advances the Position by 6.
        */
        read48(): number;
        /**
        Reads an 56-bit value from the DataBuffer and advances the Position by 7.
        */
        read56(): number;
        /**
        Reads an 64-bit value from the DataBuffer and advances the Position by 8.
        */
        read64(): number;
        /**
        Reads an 7-bit value from the DataBuffer and advances the BitPosition by 7.
        */
        read7(): number;
        /**
        Reads an 8-bit value from the DataBuffer and advances the Position by 1.
        */
        read8(): number;
        /**
        Reads a single byte from the stream and advances the Position by 1.
        */
        readByte(): number;
        /**
        Read a specified number of bytes from the DataBuffer and advance the Position by that number.
        @param length The number of bytes to read.
        */
        readBytes(length: number): Uint8Array;
        /**
        Sets the bit position within a byte.
        */
        setBitPosition(value: number): void;
        /**
        Sets the position within the stream.
        */
        setPosition(value: number): void;
        /**
        Writes the specified buffer to the DataBuffer and advances the Position by the length of the buffer.
        @param buffer The buffer.
        */
        write(buffer: fm.icelink.DataBuffer): fm.icelink.DataBufferStream;
        /**
        Writes an 16-bit value to the DataBuffer and advances the Position by 2.
        @param value The value.
        */
        write16(value: number): fm.icelink.DataBufferStream;
        /**
        Writes an 32-bit value to the DataBuffer and advances the Position by 4.
        @param value The value.
        */
        write32(value: number): fm.icelink.DataBufferStream;
        /**
        Writes an 64-bit value to the DataBuffer and advances the Position by 8.
        @param value The value.
        */
        write64(value: number): fm.icelink.DataBufferStream;
        /**
        Writes an 8-bit value to the DataBuffer and advances the Position by 1.
        @param value The value.
        */
        write8(value: number): fm.icelink.DataBufferStream;
        /**
        Writes the specified data to the DataBuffer and advances the Position by the length of the data.
        @param data The data.
        */
        writeBytes(data: Uint8Array): fm.icelink.DataBufferStream;
        /**
        Writes the specified data to the DataBuffer and advances the Position by the length.
        @param data The data.
        @param index The index.
        @param length The length.
        */
        writeBytes(data: Uint8Array, index: number, length: number): fm.icelink.DataBufferStream;
    }
}
declare namespace fm.icelink {
    /**
    Binary data buffer implementation
    */
    class DataBuffer {
        getTypeString(): string;
        /** @hidden */
        private _index;
        /** @hidden */
        private _innerData;
        /** @hidden */
        private _length;
        /** @hidden */
        private _littleEndian;
        private fmicelinkDataBufferInit;
        constructor();
        constructor(data: Uint8Array, index: number, length: number, littleEndian: boolean);
        /**
        Allocates a new data buffer with a given size (in bytes) in big-endian format.
        @param count Pre-allocated data buffer size  (in bytes).
        */
        static allocate(count: number): fm.icelink.DataBuffer;
        /**
        Allocates a new data buffer with a given size (in bytes).
        @param count Pre-allocated data buffer size  (in bytes).
        @param littleEndian Whether the data is little-endian.
        */
        static allocate(count: number, littleEndian: boolean): fm.icelink.DataBuffer;
        /**
        Tests if the two buffers have equal contents.
        @param buffer1 First buffer to test.
        @param buffer2 Second buffer to test.
        */
        static areEqual(buffer1: fm.icelink.DataBuffer, buffer2: fm.icelink.DataBuffer): boolean;
        /** @hidden */
        private static check;
        /** @hidden */
        private static checkSequenceEqual;
        /**
        Creates an instance from an array of bytes.
        */
        static fromBytes(bytes: Uint8Array): fm.icelink.DataBuffer;
        /**
        Creates an instance from an array of bytes.
        */
        static fromBytes(bytes: Uint8Array, littleEndian: boolean): fm.icelink.DataBuffer;
        /**
        Creates an instance from a hexadecimal string.
        */
        static fromHexString(hexString: string): fm.icelink.DataBuffer;
        /**
        Creates an instance from a hexadecimal string.
        */
        static fromHexString(hexString: string, littleEndian: boolean): fm.icelink.DataBuffer;
        /**
        Deserializes an instance from JSON.
        @param dataBufferJson The data buffer JSON.
        */
        static fromJson(dataBufferJson: string): fm.icelink.DataBuffer;
        /**
        Deserializes an array of instances from JSON.
        @param dataBuffersJson The data buffers JSON.
        */
        static fromJsonArray(dataBuffersJson: string): fm.icelink.DataBuffer[];
        /**
        Gets an empty data buffer.
        */
        static getEmpty(): fm.icelink.DataBuffer;
        /**
        Serializes an instance to JSON.
        @param dataBuffer The data buffer.
        */
        static toJson(dataBuffer: fm.icelink.DataBuffer): string;
        /**
        Serializes an array of instances to JSON.
        @param dataBuffers The data buffers.
        */
        static toJsonArray(dataBuffers: fm.icelink.DataBuffer[]): string;
        /**
        Produces a new data buffer containing supplied data in big-endian format.
        @param data The data.
        */
        static wrap(data: Uint8Array): fm.icelink.DataBuffer;
        /**
        Produces a new data buffer containing supplied data in big-endian format.
        @param data The data.
        @param index The index.
        */
        static wrap(data: Uint8Array, index: number): fm.icelink.DataBuffer;
        /**
        Produces a new data buffer containing supplied data in big-endian format.
        @param data The data.
        @param index The index.
        @param length The length.
        */
        static wrap(data: Uint8Array, index: number, length: number): fm.icelink.DataBuffer;
        /**
        Produces a new data buffer containing supplied data.
        @param data The data.
        @param index The index.
        @param length The length.
        @param littleEndian Whether the data is little-endian.
        */
        static wrap(data: Uint8Array, index: number, length: number, littleEndian: boolean): fm.icelink.DataBuffer;
        /**
        Produces a new data buffer containing supplied data.
        @param data The data.
        @param index The index.
        @param littleEndian Whether the data is little-endian.
        */
        static wrap(data: Uint8Array, index: number, littleEndian: boolean): fm.icelink.DataBuffer;
        /**
        Produces a new data buffer containing supplied data.
        @param data The data.
        @param littleEndian Whether the data is little-endian.
        */
        static wrap(data: Uint8Array, littleEndian: boolean): fm.icelink.DataBuffer;
        /**
        Performs a bitwise "and" operation on a value.
        @param value The value.
        @param offset The offset.
        */
        and(value: number, offset: number): boolean;
        /**
        Appends a buffer.
        @param buffer The buffer.
        */
        append(buffer: fm.icelink.DataBuffer): fm.icelink.DataBuffer;
        /**
        Appends some buffers.
        @param buffers The buffers.
        */
        append(buffers: fm.icelink.DataBuffer[]): fm.icelink.DataBuffer;
        /**
        Gets whether this buffer can be resized to the new length.
        @param newLength The new length.
        @param offset The offset.
        */
        canResize(newLength: number, offset: number): boolean;
        /**
        Clones this instance.
        */
        clone(): fm.icelink.DataBuffer;
        /**
        Clones this instance.
        @param littleEndian Whether to clone into a little endian buffer.
        */
        clone(littleEndian: boolean): fm.icelink.DataBuffer;
        /**
        Copies this instance into new memory.
        */
        copy(): fm.icelink.DataBuffer;
        /**
        Copies this instance.
        */
        copy(usePool: boolean): fm.icelink.DataBuffer;
        /**
        Decrements the retain count by one and returns the Buffer to the pool if zero.
        */
        free(): fm.icelink.DataBuffer;
        /**
        Gets the data.
        */
        getData(): Uint8Array;
        /**
        Gets the index.
        */
        getIndex(): number;
        /**
        Gets backing data buffer.
        */
        protected getInnerData(): Uint8Array;
        /**
        Gets whether this DataBuffer is from a pool.
        */
        getIsPooled(): boolean;
        /**
        Gets whether this DataBuffer is a subset.
        */
        getIsSubset(): boolean;
        /**
        Gets the length.
        */
        getLength(): number;
        /**
        Gets whether [[fm.icelink.dataBuffer.data]] is little-endian.
        */
        getLittleEndian(): boolean;
        /**
        Increment the retain count by one.
        */
        keep(): fm.icelink.DataBuffer;
        /**
        Performs a bitwise "or" operation on a value.
        @param value The value.
        @param offset The offset.
        */
        or(value: number, offset: number): boolean;
        /**
        Prepends a buffer.
        @param buffer The buffer.
        */
        prepend(buffer: fm.icelink.DataBuffer): fm.icelink.DataBuffer;
        /**
        Prepends some buffers.
        @param buffers The buffers.
        */
        prepend(buffers: fm.icelink.DataBuffer[]): void;
        /**
        Reads a 1-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read1(offset: number, bitOffset: number): boolean;
        /**
        Reads a 10-bit value.
        @param offset The offset.
        @param bitOffset The bitoffset.
        */
        read10(offset: number, bitOffset: number): number;
        /**
        Reads a 10-bit signed value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read10Signed(offset: number, bitOffset: number): number;
        /**
        Reads a 11-bit value.
        @param offset The offset.
        @param bitOffset The bitoffset.
        */
        read11(offset: number, bitOffset: number): number;
        /**
        Reads a 11-bit signed value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read11Signed(offset: number, bitOffset: number): number;
        /**
        Reads a 12-bit value.
        @param offset The offset.
        @param bitOffset The bitoffset.
        */
        read12(offset: number, bitOffset: number): number;
        /**
        Reads a 12-bit signed value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read12Signed(offset: number, bitOffset: number): number;
        /**
        Reads a 13-bit value.
        @param offset The offset.
        @param bitOffset The bitoffset.
        */
        read13(offset: number, bitOffset: number): number;
        /**
        Reads a 13-bit signed value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read13Signed(offset: number, bitOffset: number): number;
        /**
        Reads a 14-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read14(offset: number, bitOffset: number): number;
        /**
        Reads a 14-bit signed value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read14Signed(offset: number, bitOffset: number): number;
        /**
        Reads a 15-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read15(offset: number, bitOffset: number): number;
        /**
        Reads a 15-bit signed value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read15Signed(offset: number, bitOffset: number): number;
        /**
        Reads a 16-bit value.
        @param offset The offset.
        */
        read16(offset: number): number;
        /**
        Reads a 16-bit value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        read16(offset: number, offsetPlus: fm.icelink.Holder<number>): number;
        /**
        Reads a 16-bit signed value.
        @param offset The offset.
        */
        read16Signed(offset: number): number;
        /**
        Reads a 16-bit signed value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        read16Signed(offset: number, offsetPlus: fm.icelink.Holder<number>): number;
        /**
        Reads a 17-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read17(offset: number, bitOffset: number): number;
        /**
        Reads a 17-bit signed value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read17Signed(offset: number, bitOffset: number): number;
        /**
        Reads an 18-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read18(offset: number, bitOffset: number): number;
        /**
        Reads an 18-bit signed value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read18Signed(offset: number, bitOffset: number): number;
        /**
        Reads a 19-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read19(offset: number, bitOffset: number): number;
        /**
        Reads a 19-bit signed value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read19Signed(offset: number, bitOffset: number): number;
        /**
        Reads a 2-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read2(offset: number, bitOffset: number): number;
        /**
        Reads a 20-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read20(offset: number, bitOffset: number): number;
        /**
        Reads a 20-bit signed value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read20Signed(offset: number, bitOffset: number): number;
        /**
        Reads a 21-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read21(offset: number, bitOffset: number): number;
        /**
        Reads a 21-bit signed value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read21Signed(offset: number, bitOffset: number): number;
        /**
        Reads a 22-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read22(offset: number, bitOffset: number): number;
        /**
        Reads a 22-bit signed value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read22Signed(offset: number, bitOffset: number): number;
        /**
        Reads a 23-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read23(offset: number, bitOffset: number): number;
        /**
        Reads a 23-bit signed value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read23Signed(offset: number, bitOffset: number): number;
        /**
        Reads a 24-bit value.
        @param offset The offset.
        */
        read24(offset: number): number;
        /**
        Reads a 24-bit value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        read24(offset: number, offsetPlus: fm.icelink.Holder<number>): number;
        /**
        Reads a 24-bit signed value.
        @param offset The offset.
        */
        read24Signed(offset: number): number;
        /**
        Reads a 24-bit signed value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        read24Signed(offset: number, offsetPlus: fm.icelink.Holder<number>): number;
        /**
        Reads a 2-bit signed value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read2Signed(offset: number, bitOffset: number): number;
        /**
        Reads a 3-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read3(offset: number, bitOffset: number): number;
        /**
        Reads a 32-bit value.
        @param offset The offset.
        */
        read32(offset: number): number;
        /**
        Reads a 32-bit value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        read32(offset: number, offsetPlus: fm.icelink.Holder<number>): number;
        /**
        Reads a 32-bit signed value.
        @param offset The offset.
        */
        read32Signed(offset: number): number;
        /**
        Reads a 32-bit signed value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        read32Signed(offset: number, offsetPlus: fm.icelink.Holder<number>): number;
        /**
        Reads a 3-bit signed value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read3Signed(offset: number, bitOffset: number): number;
        /**
        Reads a 4-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read4(offset: number, bitOffset: number): number;
        /**
        Reads a 40-bit value.
        @param offset The offset.
        */
        read40(offset: number): number;
        /**
        Reads a 40-bit value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        read40(offset: number, offsetPlus: fm.icelink.Holder<number>): number;
        /**
        Reads a 40-bit signed value.
        @param offset The offset.
        */
        read40Signed(offset: number): number;
        /**
        Reads a 40-bit signed value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        read40Signed(offset: number, offsetPlus: fm.icelink.Holder<number>): number;
        /**
        Reads a 48-bit value.
        @param offset The offset.
        */
        read48(offset: number): number;
        /**
        Reads a 48-bit value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        read48(offset: number, offsetPlus: fm.icelink.Holder<number>): number;
        /**
        Reads a 48-bit signed value.
        @param offset The offset.
        */
        read48Signed(offset: number): number;
        /**
        Reads a 48-bit signed value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        read48Signed(offset: number, offsetPlus: fm.icelink.Holder<number>): number;
        /**
        Reads a 4-bit signed value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read4Signed(offset: number, bitOffset: number): number;
        /**
        Reads a 5-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read5(offset: number, bitOffset: number): number;
        /**
        Reads a 56-bit value.
        @param offset The offset.
        */
        read56(offset: number): number;
        /**
        Reads a 56-bit value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        read56(offset: number, offsetPlus: fm.icelink.Holder<number>): number;
        /**
        Reads a 56-bit signed value.
        @param offset The offset.
        */
        read56Signed(offset: number): number;
        /**
        Reads a 56-bit signed value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        read56Signed(offset: number, offsetPlus: fm.icelink.Holder<number>): number;
        /**
        Reads a 5-bit signed value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read5Signed(offset: number, bitOffset: number): number;
        /**
        Reads a 6-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read6(offset: number, bitOffset: number): number;
        /**
        Reads a 64-bit value.
        @param offset The offset.
        */
        read64(offset: number): number;
        /**
        Reads a 64-bit value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        read64(offset: number, offsetPlus: fm.icelink.Holder<number>): number;
        /**
        Reads a 64-bit signed value.
        @param offset The offset.
        */
        read64Signed(offset: number): number;
        /**
        Reads a 64-bit signed value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        read64Signed(offset: number, offsetPlus: fm.icelink.Holder<number>): number;
        /**
        Reads a 6-bit signed value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read6Signed(offset: number, bitOffset: number): number;
        /**
        Reads a 7-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read7(offset: number, bitOffset: number): number;
        /**
        Reads a 7-bit signed value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read7Signed(offset: number, bitOffset: number): number;
        /**
        Reads an 8-bit value.
        @param offset The offset.
        */
        read8(offset: number): number;
        /**
        Reads an 8-bit value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        read8(offset: number, offsetPlus: fm.icelink.Holder<number>): number;
        /**
        Reads an 8-bit signed value.
        @param offset The offset.
        */
        read8Signed(offset: number): number;
        /**
        Reads an 8-bit signed value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        read8Signed(offset: number, offsetPlus: fm.icelink.Holder<number>): number;
        /**
        Reads a 9-bit value.
        @param offset The offset.
        @param bitOffset The bitoffset.
        */
        read9(offset: number, bitOffset: number): number;
        /**
        Reads a 9-bit signed value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        read9Signed(offset: number, bitOffset: number): number;
        /**
        Read a UTF-8 string.
        @param offset The offset.
        */
        readUtf8String(offset: number): string;
        /**
        Reads a UTF-8 string.
        @param offset The offset.
        @param length The length.
        */
        readUtf8String(offset: number, length: number): string;
        /**
        Resizes this buffer to a new length with new data being inserted at the end.
        @param newLength The new length.
        */
        resize(newLength: number): void;
        /**
        Resizes this buffer to a new length with new data being inserted at a given offset.
        @param newLength The new length.
        @param offset The offset.
        */
        resize(newLength: number, offset: number): void;
        /**
        Resizes this buffer to a new length with new data being inserted at a given offset.
        @param newLength The new length.
        @param offset The offset.
        @param setZero Sets empty space to zero.
        */
        resize(newLength: number, offset: number, setZero: boolean): void;
        /**
        Compares a data buffer for equality.
        @param buffer The data buffer.
        @return `true` if the sequences are equal; otherwise, `false`.
            
        */
        sequenceEquals(buffer: fm.icelink.DataBuffer): boolean;
        /**
        Compares a data buffer for equality in constant time.
        @param buffer The buffer.
        @return `true` if the sequences are equal; otherwise, `false`.
            
        */
        sequenceEqualsConstantTime(buffer: fm.icelink.DataBuffer): boolean;
        /**
        Sets the data buffer to the specified value.
        @param value The value.
        */
        set(value: number): void;
        /**
        Sets a subset of the data buffer to the specified value.
        @param value The value.
        @param offset The offset.
        */
        set(value: number, offset: number): void;
        /**
        Sets a subset of the data buffer to the specified value.
        @param value The value.
        @param offset The offset.
        @param length The length.
        */
        set(value: number, offset: number, length: number): void;
        /** @hidden */
        setIndex(value: number): void;
        /**
        Sets backing data buffer.
        */
        protected setInnerData(value: Uint8Array): void;
        /** @hidden */
        setLength(value: number): void;
        /**
        Sets whether [[fm.icelink.dataBuffer.data]] is little-endian.
        */
        setLittleEndian(value: boolean): void;
        /**
        Gets a subset of this instance.
        @param offset The offset.
        */
        subset(offset: number): fm.icelink.DataBuffer;
        /**
        Gets a subset of this instance.
        @param offset The offset.
        @param length The length.
        */
        subset(offset: number, length: number): fm.icelink.DataBuffer;
        /**
        Converts this instance to an array of bytes.
        */
        toArray(): Uint8Array;
        /**
        Converts this instance to an array of bytes.
        */
        toBytes(): Uint8Array;
        /**
        Converts this instance to a hexadecimal string.
        */
        toHexString(): string;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
        /**
        Attempts to increment the retain count by one.
        @return True if successful.
        */
        tryKeep(): boolean;
        /**
        Tries to read a 1-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        @param value if set to `true` [value].
        */
        tryRead1(offset: number, bitOffset: number, value: fm.icelink.Holder<boolean>): boolean;
        /**
        Tries to read a 10-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        @param value The value.
        */
        tryRead10(offset: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read an 11-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        @param value The value.
        */
        tryRead11(offset: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 12-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        @param value The value.
        */
        tryRead12(offset: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 13-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        @param value The value.
        */
        tryRead13(offset: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 14-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        @param value The value.
        */
        tryRead14(offset: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 15-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        @param value The value.
        */
        tryRead15(offset: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 16-bit value.
        @param offset The offset.
        @param value The value.
        */
        tryRead16(offset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 17-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        @param value The value.
        */
        tryRead17(offset: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read an 18-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        @param value The value.
        */
        tryRead18(offset: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 19-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        @param value The value.
        */
        tryRead19(offset: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 2-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        @param value The value.
        */
        tryRead2(offset: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 20-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        @param value The value.
        */
        tryRead20(offset: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 21-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        @param value The value.
        */
        tryRead21(offset: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 22-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        @param value The value.
        */
        tryRead22(offset: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 23-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        @param value The value.
        */
        tryRead23(offset: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 24-bit value.
        @param offset The offset.
        @param value The value.
        */
        tryRead24(offset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 3-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        @param value The value.
        */
        tryRead3(offset: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 32-bit value.
        @param offset The offset.
        @param value The value.
        */
        tryRead32(offset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 4-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        @param value The value.
        */
        tryRead4(offset: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 40-bit value.
        @param offset The offset.
        @param value The value.
        */
        tryRead40(offset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 48-bit value.
        @param offset The offset.
        @param value The value.
        */
        tryRead48(offset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 5-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        @param value The value.
        */
        tryRead5(offset: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 56-bit value.
        @param offset The offset.
        @param value The value.
        */
        tryRead56(offset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 6-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        @param value The value.
        */
        tryRead6(offset: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 64-bit value.
        @param offset The offset.
        @param value The value.
        */
        tryRead64(offset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 7-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        @param value The value.
        */
        tryRead7(offset: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read an 8-bit value.
        @param offset The offset.
        @param value The value.
        */
        tryRead8(offset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Tries to read a 9-bit value.
        @param offset The offset.
        @param bitOffset The bit offset.
        @param value The value.
        */
        tryRead9(offset: number, bitOffset: number, value: fm.icelink.Holder<number>): boolean;
        /**
        Writes a data buffer to this instance.
        @param buffer The buffer.
        */
        write(buffer: fm.icelink.DataBuffer): void;
        /**
        Writes a data buffer to this instance.
        @param buffer The buffer.
        @param offset The offset.
        */
        write(buffer: fm.icelink.DataBuffer, offset: number): void;
        /**
        Writes a data buffer to this instance.
        @param buffer The buffer.
        @param offset The offset.
        @param offsetPlus The offset plus the buffer length.
        */
        write(buffer: fm.icelink.DataBuffer, offset: number, offsetPlus: fm.icelink.Holder<number>): void;
        /**
        Writes a 1-bit value.
        @param value The value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        write1(value: boolean, offset: number, bitOffset: number): boolean;
        /**
        Writes a 10-bit value.
        @param value The value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        write10(value: number, offset: number, bitOffset: number): boolean;
        /**
        Writes an 11-bit value.
        @param value The value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        write11(value: number, offset: number, bitOffset: number): boolean;
        /**
        Writes a 12-bit value.
        @param value The value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        write12(value: number, offset: number, bitOffset: number): boolean;
        /**
        Writes a 13-bit value.
        @param value The value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        write13(value: number, offset: number, bitOffset: number): boolean;
        /**
        Writes a 14-bit value.
        @param value The value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        write14(value: number, offset: number, bitOffset: number): boolean;
        /**
        Writes a 15-bit value.
        @param value The value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        write15(value: number, offset: number, bitOffset: number): boolean;
        /**
        Writes a 16-bit value.
        @param value The value.
        @param offset The offset.
        */
        write16(value: number, offset: number): boolean;
        /**
        Writes a 16-bit value.
        @param value The value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        write16(value: number, offset: number, offsetPlus: fm.icelink.Holder<number>): boolean;
        /**
        Writes a 17-bit value.
        @param value The value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        write17(value: number, offset: number, bitOffset: number): boolean;
        /**
        Writes an 18-bit value.
        @param value The value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        write18(value: number, offset: number, bitOffset: number): boolean;
        /**
        Writes a 19-bit value.
        @param value The value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        write19(value: number, offset: number, bitOffset: number): boolean;
        /**
        Writes a 2-bit value.
        @param value The value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        write2(value: number, offset: number, bitOffset: number): boolean;
        /**
        Writes a 20-bit value.
        @param value The value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        write20(value: number, offset: number, bitOffset: number): boolean;
        /**
        Writes a 21-bit value.
        @param value The value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        write21(value: number, offset: number, bitOffset: number): boolean;
        /**
        Writes a 22-bit value.
        @param value The value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        write22(value: number, offset: number, bitOffset: number): boolean;
        /**
        Writes a 23-bit value.
        @param value The value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        write23(value: number, offset: number, bitOffset: number): boolean;
        /**
        Writes a 24-bit value.
        @param value The value.
        @param offset The offset.
        */
        write24(value: number, offset: number): boolean;
        /**
        Writes a 24-bit value.
        @param value The value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        write24(value: number, offset: number, offsetPlus: fm.icelink.Holder<number>): boolean;
        /**
        Writes a 3-bit value.
        @param value The value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        write3(value: number, offset: number, bitOffset: number): boolean;
        /**
        Writes a 32-bit value.
        @param value The value.
        @param offset The offset.
        */
        write32(value: number, offset: number): boolean;
        /**
        Writes a 32-bit value.
        @param value The value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        write32(value: number, offset: number, offsetPlus: fm.icelink.Holder<number>): boolean;
        /**
        Writes a 4-bit value.
        @param value The value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        write4(value: number, offset: number, bitOffset: number): boolean;
        /**
        Writes a 40-bit value.
        @param value The value.
        @param offset The offset.
        */
        write40(value: number, offset: number): boolean;
        /**
        Writes a 40-bit value.
        @param value The value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        write40(value: number, offset: number, offsetPlus: fm.icelink.Holder<number>): boolean;
        /**
        Writes a 48-bit value.
        @param value The value.
        @param offset The offset.
        */
        write48(value: number, offset: number): boolean;
        /**
        Writes a 48-bit value.
        @param value The value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        write48(value: number, offset: number, offsetPlus: fm.icelink.Holder<number>): boolean;
        /**
        Writes a 5-bit value.
        @param value The value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        write5(value: number, offset: number, bitOffset: number): boolean;
        /**
        Writes a 56-bit value.
        @param value The value.
        @param offset The offset.
        */
        write56(value: number, offset: number): boolean;
        /**
        Writes a 56-bit value.
        @param value The value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        write56(value: number, offset: number, offsetPlus: fm.icelink.Holder<number>): boolean;
        /**
        Writes a 6-bit value.
        @param value The value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        write6(value: number, offset: number, bitOffset: number): boolean;
        /**
        Writes a 64-bit value.
        @param value The value.
        @param offset The offset.
        */
        write64(value: number, offset: number): boolean;
        /**
        Writes a 64-bit value.
        @param value The value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        write64(value: number, offset: number, offsetPlus: fm.icelink.Holder<number>): boolean;
        /**
        Writes a 7-bit value.
        @param value The value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        write7(value: number, offset: number, bitOffset: number): boolean;
        /**
        Writes an 8-bit value.
        @param value The value.
        @param offset The offset.
        */
        write8(value: number, offset: number): boolean;
        /**
        Writes an 8-bit value.
        @param value The value.
        @param offset The offset.
        @param offsetPlus The offset plus the value length.
        */
        write8(value: number, offset: number, offsetPlus: fm.icelink.Holder<number>): boolean;
        /**
        Writes a 9-bit value.
        @param value The value.
        @param offset The offset.
        @param bitOffset The bit offset.
        */
        write9(value: number, offset: number, bitOffset: number): boolean;
        /**
        Writes a byte array to this instance.
        @param bytes The bytes.
        */
        writeBytes(bytes: Uint8Array): void;
        /**
        Writes a byte array to this instance.
        @param bytes The bytes.
        @param bytesIndex The bytes index.
        @param bytesLength The bytes length.
        @param offset The offset.
        */
        writeBytes(bytes: Uint8Array, bytesIndex: number, bytesLength: number, offset: number): void;
        /**
        Writes a byte array to this instance.
        @param bytes The bytes.
        @param bytesIndex The bytes index.
        @param bytesLength The bytes length.
        @param offset The offset.
        @param offsetPlus The offset plus the buffer length.
        */
        writeBytes(bytes: Uint8Array, bytesIndex: number, bytesLength: number, offset: number, offsetPlus: fm.icelink.Holder<number>): void;
        /**
        Writes a byte array to this instance.
        @param bytes The bytes.
        @param bytesIndex The bytes index.
        @param offset The offset.
        */
        writeBytes(bytes: Uint8Array, bytesIndex: number, offset: number): void;
        /**
        Writes a byte array to this instance.
        @param bytes The bytes.
        @param offset The offset.
        */
        writeBytes(bytes: Uint8Array, offset: number): void;
        /**
        Performs a bitwise "xor" operation on a value.
        @param value The value.
        @param offset The offset.
        */
        xor(value: number, offset: number): boolean;
    }
}
declare namespace fm.icelink {
    /**
    A subset of a DataBuffer.
    */
    class DataBufferSubset extends fm.icelink.DataBuffer {
        getTypeString(): string;
        /** @hidden */
        private _parent;
        /** @hidden */
        constructor(buffer: fm.icelink.DataBuffer, index: number, length: number);
        /**
        Appends a buffer.
        @param buffer The buffer.
        */
        append(buffer: fm.icelink.DataBuffer): fm.icelink.DataBuffer;
        /**
        Appends some buffers.
        @param buffers The buffers.
        */
        append(buffers: fm.icelink.DataBuffer[]): fm.icelink.DataBuffer;
        /**
        Decrements the retain count by one and returns the Buffer to the pool if zero.
        */
        free(): fm.icelink.DataBuffer;
        /**
        Gets the data.
        */
        getData(): Uint8Array;
        /**
        Gets whether this DataBuffer is from a pool.
        */
        getIsPooled(): boolean;
        /**
        Gets whether this DataBuffer is a subset.
        */
        getIsSubset(): boolean;
        /**
        Gets the Subset parent.
        */
        getParent(): fm.icelink.DataBuffer;
        /**
        Increment the retain count by one.
        */
        keep(): fm.icelink.DataBuffer;
        /**
        Prepends a buffer.
        @param buffer The buffer.
        */
        prepend(buffer: fm.icelink.DataBuffer): fm.icelink.DataBuffer;
        /**
        Prepends some buffers.
        @param buffers The buffers.
        */
        prepend(buffers: fm.icelink.DataBuffer[]): void;
        /** @hidden */
        private setParent;
        /**
        Gets a subset of this instance.
        @param offset The offset.
        */
        subset(offset: number): fm.icelink.DataBuffer;
        /**
        Gets a subset of this instance.
        @param offset The offset.
        @param length The length.
        */
        subset(offset: number, length: number): fm.icelink.DataBuffer;
    }
}
declare namespace fm.icelink {
    /**
    Details about a specific log event.
    */
    class LogEvent {
        getTypeString(): string;
        /** @hidden */
        private _exception;
        /** @hidden */
        private _level;
        /** @hidden */
        private _message;
        /** @hidden */
        private _scope;
        /** @hidden */
        private _tag;
        /** @hidden */
        private _threadId;
        /** @hidden */
        private _timestamp;
        private fmicelinkLogEventInit;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.logEvent]] class.
        @param timestamp The event timestamp.
        @param tag The event tag.
        @param scope The event scope.
        @param level The event level.
        @param message The event message.
        @param exception The event exception, if one exists.
        @param threadId The ID of the thread generating the event.
        */
        constructor(timestamp: fm.icelink.DateTime, tag: string, scope: string, level: fm.icelink.LogLevel, message: string, exception: fm.icelink.Exception, threadId: number);
        /**
        Deserializes a log event from JSON.
        @param logEventJson The log event JSON.
        */
        static fromJson(logEventJson: string): fm.icelink.LogEvent;
        /** @hidden */
        private static logLevelToString;
        /** @hidden */
        private static stringToLogLevel;
        /**
        Serializes a log event to JSON.
        @param logEvent The log event.
        */
        static toJson(logEvent: fm.icelink.LogEvent): string;
        /**
        Gets the event exception, if one exists.
        */
        getException(): fm.icelink.Exception;
        /**
        Gets the event level.
        */
        getLevel(): fm.icelink.LogLevel;
        /**
        Gets the level of this log event. Alias for [[fm.icelink.logEvent.level]].
        */
        getLogLevel(): fm.icelink.LogLevel;
        /**
        Gets the event message.
        */
        getMessage(): string;
        /**
        Gets the event scope.
        */
        getScope(): string;
        /**
        Gets the event tag.
        */
        getTag(): string;
        /**
        Gets the ID of the thread generating the event.
        */
        getThreadId(): number;
        /**
        Gets the event timestamp.
        */
        getTimestamp(): fm.icelink.DateTime;
        /**
        Sets the event exception, if one exists.
        */
        setException(value: fm.icelink.Exception): void;
        /**
        Sets the event level.
        */
        setLevel(value: fm.icelink.LogLevel): void;
        /** @hidden */
        private setLogLevel;
        /**
        Sets the event message.
        */
        setMessage(value: string): void;
        /**
        Sets the event scope.
        */
        setScope(value: string): void;
        /**
        Sets the event tag.
        */
        setTag(value: string): void;
        /**
        Sets the ID of the thread generating the event.
        */
        setThreadId(value: number): void;
        /**
        Sets the event timestamp.
        */
        setTimestamp(value: fm.icelink.DateTime): void;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
        /**

        */
        toString(): string;
    }
}
declare namespace fm.icelink {
    class HashTypeWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.HashType);
        toString(): string;
    }
}
declare namespace fm.icelink {
    class MacTypeWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.MacType);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    Utility class to assist with Unix timestamp conversions.
    */
    class UnixTimestamp {
        getTypeString(): string;
        /** @hidden */
        private static fm_icelink_UnixTimestamp__baseTicks;
        constructor();
        /**
        Converts a date to a Unix timestamp.
        @param dateTime The date to convert.
        @return The equivalent Unix timestamp.
        */
        static dateTimeToUnix(dateTime: fm.icelink.DateTime): number;
        /**
        Converts a date to a Unix timestamp with millisecond precision.
        @param dateTime The date to convert.
        @return The equivalent Unix timestamp.
        */
        static dateTimeToUnixMillis(dateTime: fm.icelink.DateTime): number;
        /**
        Gets the current UTC time in Unix format.
        */
        static getUtcNow(): number;
        /**
        Gets the current UTC time in Unix format with millisecond precision.
        */
        static getUtcNowMillis(): number;
        /**
        Converts ticks to a Unix timestamp.
        @param ticks The ticks to convert.
        @return The equivalent Unix timestamp.
        */
        static ticksToUnix(ticks: number): number;
        /**
        Converts ticks to a Unix timestamp with millisecond precision.
        @param ticks The ticks to convert.
        @return The equivalent Unix timestamp.
        */
        static ticksToUnixMillis(ticks: number): number;
        /**
        Converts a Unix timestamp with millisecond precision to a date.
        @param unix The Unix timestamp to convert.
        @return The equivalent date.
        */
        static unixMillisToDateTime(unix: number): fm.icelink.DateTime;
        /**
        Converts a Unix timestamp with millisecond precision to ticks.
        @param unix The Unix timestamp to convert.
        @return The equivalent ticks.
        */
        static unixMillisToTicks(unix: number): number;
        /**
        Converts a Unix timestamp to a date.
        @param unix The Unix timestamp to convert.
        @return The equivalent date.
        */
        static unixToDateTime(unix: number): fm.icelink.DateTime;
        /**
        Converts a Unix timestamp to ticks.
        @param unix The Unix timestamp to convert.
        @return The equivalent ticks.
        */
        static unixToTicks(unix: number): number;
        /** @hidden */
        private static __fmicelinkUnixTimestampInitialized;
        /** @hidden */
        static fmicelinkUnixTimestampInitialize(): void;
    }
}
declare namespace fm.icelink {
    /**
    Class to hold a double value passed by reference.
    */
    class DoubleHolder {
        getTypeString(): string;
        /** @hidden */
        private _value;
        private fmicelinkDoubleHolderInit;
        /**
        Initializes a new instance of the [[fm.icelink.doubleHolder]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.doubleHolder]] class.
        @param value The value.
        */
        constructor(value: number);
        /**
        Gets the value.
        */
        getValue(): number;
        /**
        Sets the value.
        */
        setValue(value: number): void;
    }
}
declare namespace fm.icelink {
    /**
    An error.
    */
    class Error {
        getTypeString(): string;
        /** @hidden */
        private _code;
        /** @hidden */
        private _exception;
        /**
        Initializes a new instance of the [[fm.icelink.error]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.error]] class.
        @param code The code.
        @param exception The exception.
        */
        constructor(code: fm.icelink.ErrorCode, exception: fm.icelink.Exception);
        /**
        Initializes a new instance of the [[fm.icelink.error]] class.
        @param code The code.
        @param message The message.
        */
        constructor(code: fm.icelink.ErrorCode, message: string);
        /**
        Deserializes an instance from JSON.
        @param errorJson The JSON to deserialize.
        @return The deserialized error.
        */
        static fromJson(errorJson: string): fm.icelink.Error;
        /**
        Serializes an instance to JSON.
        @param error The error.
        @return
                    The serialized JSON.
            
        */
        static toJson(error: fm.icelink.Error): string;
        /**
        Gets the code.
        */
        getCode(): fm.icelink.ErrorCode;
        /**
        Gets the code.
        */
        getCodeValue(): number;
        /**
        Gets the description for this [[fm.icelink.error]].
        */
        getDescription(): string;
        /**
        Gets the code. Obsolete. Alias for [[fm.icelink.error.code]].
        */
        getErrorCode(): fm.icelink.ErrorCode;
        /**
        Gets the exception.
        */
        getException(): fm.icelink.Exception;
        /**
        Gets the message.
        */
        getMessage(): string;
        /**
        Sets the code.
        */
        setCode(value: fm.icelink.ErrorCode): void;
        /**
        Sets the code.
        */
        setCodeValue(value: number): void;
        /**
        Sets the code. Obsolete. Alias for [[fm.icelink.error.code]].
        */
        setErrorCode(value: fm.icelink.ErrorCode): void;
        /**
        Sets the exception.
        */
        setException(value: fm.icelink.Exception): void;
        /**
        Sets the message.
        */
        setMessage(value: string): void;
        /**
        Serializes this instance to JSON.
        @return
                    The serialized JSON.
            
        */
        toJson(): string;
        /**
        Returns the string representation of this error.
        */
        toString(): string;
    }
}
declare namespace fm.icelink {
    class ErrorCodeWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.ErrorCode);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    Class to hold a float value passed by reference.
    */
    class FloatHolder {
        getTypeString(): string;
        /** @hidden */
        private _value;
        private fmicelinkFloatHolderInit;
        /**
        Initializes a new instance of the [[fm.icelink.floatHolder]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.floatHolder]] class.
        @param value The value.
        */
        constructor(value: number);
        /**
        Gets the value.
        */
        getValue(): number;
        /**
        Sets the value.
        */
        setValue(value: number): void;
    }
}
declare namespace fm.icelink {
    class HttpMethodWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.HttpMethod);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    Arguments for sending an HTTP request.
    */
    class HttpRequestArgs extends fm.icelink.Dynamic {
        getTypeString(): string;
        /** @hidden */
        private __headers;
        /** @hidden */
        private _binaryContent;
        /** @hidden */
        private _method;
        /** @hidden */
        private _onRequestCreated;
        /** @hidden */
        private _onResponseReceived;
        /** @hidden */
        private _sender;
        /** @hidden */
        private _textContent;
        /** @hidden */
        private _timeout;
        /** @hidden */
        private _url;
        private fmicelinkHttpRequestArgsInit;
        /**
        Initializes a new instance of the [[fm.icelink.httpRequestArgs]] class with default values.
        */
        constructor();
        /**
        Gets the binary content to transfer over HTTP. Overrides [[fm.icelink.httpRequestArgs.textContent]].
        */
        getBinaryContent(): Uint8Array;
        /**
        Gets the headers to transfer over HTTP.
        */
        getHeaders(): fm.icelink.NameValueCollection;
        /**
        Gets the HTTP method.
        */
        getMethod(): fm.icelink.HttpMethod;
        /**
        Gets the callback to invoke once the outgoing HTTP request is created. See [[fm.icelink.httpRequestCreatedArgs]] for callback argument details.
        */
        getOnRequestCreated(): fm.icelink.IAction1<fm.icelink.HttpRequestCreatedArgs>;
        /**
        Gets the callback to invoke once the incoming HTTP response has been received. See [[fm.icelink.httpResponseReceivedArgs]] for callback argument details.
        */
        getOnResponseReceived(): fm.icelink.IAction1<fm.icelink.HttpResponseReceivedArgs>;
        /**
        Gets the sender of the content, either a client or publisher.
        */
        getSender(): Object;
        /**
        Gets the text content to transfer over HTTP.
        */
        getTextContent(): string;
        /**
        Gets the number of milliseconds to wait before timing out the HTTP transfer. Defaults to 15000 ms (15 seconds).
        */
        getTimeout(): number;
        /**
        Gets the target URL for the HTTP request.
        */
        getUrl(): string;
        /**
        Sets the binary content to transfer over HTTP. Overrides [[fm.icelink.httpRequestArgs.textContent]].
        */
        setBinaryContent(value: Uint8Array): void;
        /**
        Sets the headers to transfer over HTTP.
        */
        setHeaders(value: fm.icelink.NameValueCollection): void;
        /**
        Sets the HTTP method.
        */
        setMethod(value: fm.icelink.HttpMethod): void;
        /**
        Sets the callback to invoke once the outgoing HTTP request is created. See [[fm.icelink.httpRequestCreatedArgs]] for callback argument details.
        */
        setOnRequestCreated(value: fm.icelink.IAction1<fm.icelink.HttpRequestCreatedArgs>): void;
        /**
        Sets the callback to invoke once the incoming HTTP response has been received. See [[fm.icelink.httpResponseReceivedArgs]] for callback argument details.
        */
        setOnResponseReceived(value: fm.icelink.IAction1<fm.icelink.HttpResponseReceivedArgs>): void;
        /**
        Sets the sender of the content, either a client or publisher.
        */
        setSender(value: Object): void;
        /**
        Sets the text content to transfer over HTTP.
        */
        setTextContent(value: string): void;
        /**
        Sets the number of milliseconds to wait before timing out the HTTP transfer. Defaults to 15000 ms (15 seconds).
        */
        setTimeout(value: number): void;
        /**
        Sets the target URL for the HTTP request.
        */
        setUrl(value: string): void;
    }
}
declare namespace fm.icelink {
    /**
    Arguments passed into callbacks when an HTTP request is created.
    */
    class HttpRequestCreatedArgs {
        getTypeString(): string;
        /** @hidden */
        private _request;
        /** @hidden */
        private _requestArgs;
        /** @hidden */
        private _sender;
        constructor();
        /**
        Gets the outgoing HTTP request about to be sent to the server.
        */
        getRequest(): any;
        /**
        Gets the original request arguments.
        */
        getRequestArgs(): fm.icelink.HttpRequestArgs;
        /**
        Gets the sender of the request, either a client or publisher.
        */
        getSender(): Object;
        /**
        Sets the outgoing HTTP request about to be sent to the server.
        */
        setRequest(value: any): void;
        /**
        Sets the original request arguments.
        */
        setRequestArgs(value: fm.icelink.HttpRequestArgs): void;
        /**
        Sets the sender of the request, either a client or publisher.
        */
        setSender(value: Object): void;
    }
}
declare namespace fm.icelink {
    /**
    Arguments for receiving an HTTP response.
    */
    class HttpResponseArgs {
        getTypeString(): string;
        /** @hidden */
        private _binaryContent;
        /** @hidden */
        private _exception;
        /** @hidden */
        private _headers;
        /** @hidden */
        private _requestArgs;
        /** @hidden */
        private _statusCode;
        /** @hidden */
        private _textContent;
        private fmicelinkHttpResponseArgsInit;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.httpResponseArgs]] class.
        @param requestArgs The request arguments.
        */
        constructor(requestArgs: fm.icelink.HttpRequestArgs);
        /**
        Gets the binary content read from the HTTP response.
        */
        getBinaryContent(): Uint8Array;
        /**
        Gets the exception generated while completing the request.
        */
        getException(): fm.icelink.Exception;
        /**
        Gets the headers read from the HTTP response.
        */
        getHeaders(): fm.icelink.NameValueCollection;
        /**
        Gets the original [[fm.icelink.httpRequestArgs]].
        */
        getRequestArgs(): fm.icelink.HttpRequestArgs;
        /**
        Gets the status code read from the HTTP response.
        */
        getStatusCode(): number;
        /**
        Gets the text content read from the HTTP response.
        */
        getTextContent(): string;
        /**
        Sets the binary content read from the HTTP response.
        */
        setBinaryContent(value: Uint8Array): void;
        /**
        Sets the exception generated while completing the request.
        */
        setException(value: fm.icelink.Exception): void;
        /** @hidden */
        private setHeaders;
        /**
        Sets the original [[fm.icelink.httpRequestArgs]].
        */
        setRequestArgs(value: fm.icelink.HttpRequestArgs): void;
        /**
        Sets the status code read from the HTTP response.
        */
        setStatusCode(value: number): void;
        /**
        Sets the text content read from the HTTP response.
        */
        setTextContent(value: string): void;
    }
}
declare namespace fm.icelink {
    /**
    Arguments passed into callbacks when an HTTP response is received.
    */
    class HttpResponseReceivedArgs {
        getTypeString(): string;
        /** @hidden */
        private _requestArgs;
        /** @hidden */
        private _response;
        /** @hidden */
        private _sender;
        constructor();
        /**
        Gets the original request arguments.
        */
        getRequestArgs(): fm.icelink.HttpRequestArgs;
        /**
        Gets the incoming HTTP response received from the server.
        */
        getResponse(): any;
        /**
        Gets the sender of the request, either a client or publisher.
        */
        getSender(): Object;
        /**
        Sets the original request arguments.
        */
        setRequestArgs(value: fm.icelink.HttpRequestArgs): void;
        /**
        Sets the incoming HTTP response received from the server.
        */
        setResponse(value: any): void;
        /**
        Sets the sender of the request, either a client or publisher.
        */
        setSender(value: Object): void;
    }
}
declare namespace fm.icelink {
    /**
    Arguments for [[fm.icelink.httpTransfer.addOnSendStart]].
    */
    class HttpSendFinishArgs {
        getTypeString(): string;
        /** @hidden */
        private _requestBinaryContent;
        /** @hidden */
        private _requestTextContent;
        /** @hidden */
        private _responseBinaryContent;
        /** @hidden */
        private _responseHeaders;
        /** @hidden */
        private _responseTextContent;
        /** @hidden */
        private _sender;
        constructor();
        /**
        Gets the binary content of the request.
        */
        getRequestBinaryContent(): Uint8Array;
        /**
        Gets the text content of the request.
        */
        getRequestTextContent(): string;
        /**
        Gets the binary content of the response.
        */
        getResponseBinaryContent(): Uint8Array;
        /**
        Gets the headers of the response.
        */
        getResponseHeaders(): fm.icelink.NameValueCollection;
        /**
        Gets the binary content of the response.
        */
        getResponseTextContent(): string;
        /**
        Gets the sender of the request, either a client or publisher.
        */
        getSender(): Object;
        /** @hidden */
        setRequestBinaryContent(value: Uint8Array): void;
        /** @hidden */
        setRequestTextContent(value: string): void;
        /** @hidden */
        setResponseBinaryContent(value: Uint8Array): void;
        /** @hidden */
        setResponseHeaders(value: fm.icelink.NameValueCollection): void;
        /** @hidden */
        setResponseTextContent(value: string): void;
        /** @hidden */
        setSender(value: Object): void;
    }
}
declare namespace fm.icelink {
    /**
    Arguments for [[fm.icelink.httpTransfer.addOnSendStart]].
    */
    class HttpSendStartArgs {
        getTypeString(): string;
        /** @hidden */
        private _requestBinaryContent;
        /** @hidden */
        private _requestTextContent;
        /** @hidden */
        private _sender;
        constructor();
        /**
        Gets the binary content of the request.
        */
        getRequestBinaryContent(): Uint8Array;
        /**
        Gets the text content of the request.
        */
        getRequestTextContent(): string;
        /**
        Gets the sender of the request, either a client or publisher.
        */
        getSender(): Object;
        /** @hidden */
        setRequestBinaryContent(value: Uint8Array): void;
        /** @hidden */
        setRequestTextContent(value: string): void;
        /** @hidden */
        setSender(value: Object): void;
    }
}
declare namespace fm.icelink {
    /**
    Creates implementations of [[fm.icelink.httpTransfer]].
    */
    class HttpTransferFactory {
        getTypeString(): string;
        /** @hidden */
        private static fm_icelink_HttpTransferFactory__createHttpTransfer;
        constructor();
        /** @hidden */
        static defaultCreateHttpTransfer(): fm.icelink.HttpTransfer;
        /**
        Gets the callback that creates an HTTP-based transfer class.
        */
        static getCreateHttpTransfer(): fm.icelink.IFunction0<fm.icelink.HttpTransfer>;
        /**
        Gets an instance of the HTTP-based transfer class.
        */
        static getHttpTransfer(): fm.icelink.HttpTransfer;
        /**
        Sets the callback that creates an HTTP-based transfer class.
        */
        static setCreateHttpTransfer(value: fm.icelink.IFunction0<fm.icelink.HttpTransfer>): void;
    }
}
declare namespace fm.icelink {
    /**
    An HTTP web request sender.
    */
    class HttpWebRequestSender extends fm.icelink.Dynamic {
        getTypeString(): string;
        /** @hidden */
        private __disableJsonp;
        /** @hidden */
        private __forceJsonp;
        /** @hidden */
        private _disableCors;
        /** @hidden */
        private _disablePostMessage;
        private fmicelinkHttpWebRequestSenderInit;
        constructor();
        /**
        Gets a value indicating whether to disable the cross-origin resource sharing (CORS) transport.
        */
        getDisableCors(): boolean;
        /**
        Gets a value indicating whether to disable the JSON-P transport.
        */
        getDisableJsonp(): boolean;
        /**
        Gets a value indicating whether to disable the postMessage transport.
        */
        getDisablePostMessage(): boolean;
        /**
        Gets a value indicating whether to force the JSON-P transport.
        */
        getForceJsonp(): boolean;
        /**
        Sets a value indicating whether to disable the cross-origin resource sharing (CORS) transport.
        */
        setDisableCors(value: boolean): void;
        /**
        Sets a value indicating whether to disable the JSON-P transport.
        */
        setDisableJsonp(value: boolean): void;
        /**
        Sets a value indicating whether to disable the postMessage transport.
        */
        setDisablePostMessage(value: boolean): void;
        /**
        Sets a value indicating whether to force the JSON-P transport.
        */
        setForceJsonp(value: boolean): void;
    }
}
declare namespace fm.icelink {
    /**
    Class to hold an integer value passed by reference.
    */
    class IntegerHolder {
        getTypeString(): string;
        /** @hidden */
        private _value;
        private fmicelinkIntegerHolderInit;
        /**
        Initializes a new instance of the [[fm.icelink.integerHolder]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.integerHolder]] class.
        @param value The value.
        */
        constructor(value: number);
        /**
        Gets the value.
        */
        getValue(): number;
        /**
        Sets the value.
        */
        setValue(value: number): void;
    }
}
declare namespace fm.icelink {
    /**
    Interface for a promise that can be rejected.
    */
    interface IPromise {
        reject(exception: fm.icelink.Exception): boolean;
    }
}
declare namespace fm.icelink {
    /** @hidden */
    class JsonChecker {
        getTypeString(): string;
        /** @hidden */
        private __depth;
        /** @hidden */
        private __offset;
        /** @hidden */
        private __stack;
        /** @hidden */
        private __state;
        /** @hidden */
        private static fm_icelink_JsonChecker__ascii_class;
        /** @hidden */
        private static fm_icelink_JsonChecker__state_transition_table;
        private fmicelinkJsonCheckerInit;
        constructor();
        constructor(depth: number);
        /** @hidden */
        private check;
        checkString(str: string): boolean;
        /** @hidden */
        private finalCheck;
        /** @hidden */
        private onError;
        /** @hidden */
        private pop;
        /** @hidden */
        private push;
        /** @hidden */
        private static __fmicelinkJsonCheckerInitialized;
        /** @hidden */
        static fmicelinkJsonCheckerInitialize(): void;
    }
}
declare namespace fm.icelink {
    /**
    Base class for all JSON provider implementations.
    */
    abstract class JsonProvider {
        getTypeString(): string;
        constructor();
        /**
        Deserializes a value from a JSON string.
        @param valueJson The JSON string to deserialize.
        @return The deserialized value.
        */
        abstract deserialize<T>(valueJson: string): T;
        /**
        Serializes a value to a JSON string.
        @param value The value to serialize.
        @return The serialized JSON string.
        */
        abstract serialize<T>(value: T): string;
    }
}
declare namespace fm.icelink {
    /**
    Thread-safe class providing access to a single [[fm.icelink.lockedRandomizer.Randomizer]].
    */
    abstract class LockedRandomizer {
        getTypeString(): string;
        /** @hidden */
        private static fm_icelink_LockedRandomizer__randomizer;
        /** @hidden */
        private static fm_icelink_LockedRandomizer__randomLock;
        /**
        Returns a nonnegative random number.
        */
        static next(): number;
        /**
        Returns a nonnegative random number less than the specified maximum.
        @param maxValue The maximum value (exclusive).
        */
        static next(maxValue: number): number;
        /**
        Returns a random number within a specified range.
        @param minValue The minimum value (inclusive).
        @param maxValue The maximum value (exclusive).
        */
        static next(minValue: number, maxValue: number): number;
        /**
        Fills the elements of a specified array of bytes with random numbers.
        @param buffer The array of bytes to fill.
        */
        static nextBytes(buffer: Uint8Array): void;
        /**
        Returns a random number between 0.0 and 1.0.
        */
        static nextDouble(): number;
        /**
        Returns a nonnegative random number.
        */
        static nextLong(): number;
        /**
        Generates a random string of a specified size.
        @param size The size of the output string.
        */
        static randomString(size: number): string;
        /** @hidden */
        private static __fmicelinkLockedRandomizerInitialized;
        /** @hidden */
        static fmicelinkLockedRandomizerInitialize(): void;
    }
}
declare namespace fm.icelink {
    /**
    Log utility class.
    */
    class Log {
        getTypeString(): string;
        /** @hidden */
        private static fm_icelink_Log___staticLogger;
        constructor();
        /**
        Registers a log provider as a logging target. Alias for RegisterProvider.
        @param provider The new provider.
        */
        static addProvider(provider: fm.icelink.LogProvider): void;
        /**
        Registers a log provider as a logging target, setting its log level in the process. Alias for RegisterProvider.
        @param provider The new provider.
        @param level The log level.
        */
        static addProvider(provider: fm.icelink.LogProvider, level: fm.icelink.LogLevel): void;
        /**
        Logs a debug-level message.
        @param message The message.
        */
        static debug(message: string): void;
        /**
        Logs a debug-level message.
        @param message The message.
        @param ex The exception.
        */
        static debug(message: string, ex: fm.icelink.Exception): void;
        /**
        Logs an error-level message.
        @param message The message.
        */
        static error(message: string): void;
        /**
        Logs an error-level message.
        @param message The message.
        @param ex The exception.
        */
        static error(message: string, ex: fm.icelink.Exception): void;
        /**
        Logs a fatal-level message.
        @param message The message.
        */
        static fatal(message: string): void;
        /**
        Logs a fatal-level message.
        @param message The message.
        @param ex The exception.
        */
        static fatal(message: string, ex: fm.icelink.Exception): void;
        /**
        Blocks until all logs are written out.
        */
        static flush(): void;
        /**
        Gets a value indicating whether logging is enabled for debug-level messages.
        */
        static getIsDebugEnabled(): boolean;
        /**
        Gets a value indicating whether logging is enabled for error-level messages.
        */
        static getIsErrorEnabled(): boolean;
        /**
        Gets a value indicating whether logging is enabled for fatal-level messages.
        */
        static getIsFatalEnabled(): boolean;
        /**
        Gets a value indicating whether logging is enabled for info-level messages.
        */
        static getIsInfoEnabled(): boolean;
        /**
        Gets a value indicating whether logging is enabled for verbose-level messages.
        */
        static getIsVerboseEnabled(): boolean;
        /**
        Gets a value indicating whether logging is enabled for warn-level messages.
        */
        static getIsWarnEnabled(): boolean;
        /**
        Get a logger for a specific Tag.
        @param tag The tag to log to.
        @return A ILog that will log to the specified tag.
        */
        static getLogger(tag: string): fm.icelink.ILog;
        /**
        Get a logger for a specific Tag.
        @param tag The tag to log to.
        @param level Logger's default log level.
        @return A ILog that will log to the specified tag.
        */
        static getLogger(tag: string, level: fm.icelink.LogLevel): fm.icelink.ILog;
        /**
        Get a logger for a specific Tag. The tag is taken from the class namespace and name.
        @param type The type to use as the tag.
        @return A ILog that will log to the specified tag.
        */
        static getLogger(type: fm.icelink.Type): fm.icelink.ILog;
        /**
        Get a logger for a specific Tag.  The tag is taken from the class namespace and name.
        @param type The type to use as the tag.
        @param level Logger's default log level.
        @return A ILog that will log to the specified tag.
        */
        static getLogger(type: fm.icelink.Type, level: fm.icelink.LogLevel): fm.icelink.ILog;
        /**
        Gets the default log level.
        */
        static getLogLevel(): fm.icelink.LogLevel;
        /**
        Gets the first log provider.
        */
        static getProvider(): fm.icelink.LogProvider;
        /**
        Gets the log providers.
        */
        static getProviders(): fm.icelink.LogProvider[];
        /**
        Logs an info-level message.
        @param message The message.
        */
        static info(message: string): void;
        /**
        Logs an info-level message.
        @param message The message.
        @param ex The exception.
        */
        static info(message: string, ex: fm.icelink.Exception): void;
        /**
        Registers a log provider as a logging target.
        @param provider The provider.
        */
        static registerProvider(provider: fm.icelink.LogProvider): void;
        /**
        Registers a log provider as a logging target, setting its log level in the process.
        @param provider The provider.
        @param level The log level.
        */
        static registerProvider(provider: fm.icelink.LogProvider, level: fm.icelink.LogLevel): void;
        /**
        Unregisters a log provider as a logging target. Alias for UnregisterProvider.
        @param provider The provider.
        */
        static removeProvider(provider: fm.icelink.LogProvider): boolean;
        /**
        Unregisters all log providers as logging targets. Alias for UnregisterProviders.
        */
        static removeProviders(): void;
        /**
        Sets the default log level.
        */
        static setLogLevel(value: fm.icelink.LogLevel): void;
        /**
        Sets the first log provider.
        */
        static setProvider(value: fm.icelink.LogProvider): void;
        /**
        Override the default log level for a specific tag.
        @param tag The Tag to set the log level to.
        @param level The new loglevel to use.
        */
        static setTagOverride(tag: string, level: fm.icelink.LogLevel): void;
        /**
        Unregisters a log provider as a logging target.
        @param provider The provider.
        */
        static unregisterProvider(provider: fm.icelink.LogProvider): boolean;
        /**
        Unregisters all log providers as logging targets.
        */
        static unregisterProviders(): void;
        /**
        Logs a verbose-level message.
        @param message The message.
        */
        static verbose(message: string): void;
        /**
        Logs a verbose-level message.
        @param message The message.
        @param ex The exception.
        */
        static verbose(message: string, ex: fm.icelink.Exception): void;
        /**
        Logs a warn-level message.
        @param message The message.
        */
        static warn(message: string): void;
        /**
        Logs a warn-level message.
        @param message The message.
        @param ex The exception.
        */
        static warn(message: string, ex: fm.icelink.Exception): void;
        /**
        Writes a line of text to the log.
        @param text The text to write to the log.
        */
        static writeLine(text: string): void;
        /** @hidden */
        private static __fmicelinkLogInitialized;
        /** @hidden */
        static fmicelinkLogInitialize(): void;
    }
}
declare namespace fm.icelink {
    /** @hidden */
    class LogConfiguration {
        getTypeString(): string;
        /** @hidden */
        private static fm_icelink_LogConfiguration___lock;
        /** @hidden */
        private static fm_icelink_LogConfiguration___logProviders;
        /** @hidden */
        private static fm_icelink_LogConfiguration___providerCount;
        /** @hidden */
        private static fm_icelink_LogConfiguration___tagOverrides;
        /** @hidden */
        private static fm_icelink_LogConfiguration___tagOverridesLock;
        /** @hidden */
        private static fm_icelink_LogConfiguration__defaultLogLevel;
        constructor();
        static addLogProvider(provider: fm.icelink.LogProvider): void;
        static clearLogProviders(): void;
        /** @hidden */
        private static get_TagOverrides;
        static getDefaultLogLevel(): fm.icelink.LogLevel;
        static getHasProviders(): boolean;
        static getLogProviders(): fm.icelink.LogProvider[];
        static getTagLogLevel(tag: string): fm.icelink.LogLevel;
        static removeLogProvider(provider: fm.icelink.LogProvider): boolean;
        /** @hidden */
        private static set_TagOverrides;
        static setDefaultLogLevel(value: fm.icelink.LogLevel): void;
        static setTagLogLevel(tag: string, logLevel: fm.icelink.LogLevel): void;
        /** @hidden */
        private static __fmicelinkLogConfigurationInitialized;
        /** @hidden */
        static fmicelinkLogConfigurationInitialize(): void;
    }
}
declare namespace fm.icelink {
    class LogLevelWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.LogLevel);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    Class to hold a long value passed by reference.
    */
    class LongHolder {
        getTypeString(): string;
        /** @hidden */
        private _value;
        private fmicelinkLongHolderInit;
        /**
        Initializes a new instance of the [[fm.icelink.longHolder]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.longHolder]] class.
        @param value The value.
        */
        constructor(value: number);
        /**
        Gets the value.
        */
        getValue(): number;
        /**
        Sets the value.
        */
        setValue(value: number): void;
    }
}
declare namespace fm.icelink {
    /**
    An implementation of a JSON provider that does nothing.
    */
    class NullJsonProvider extends fm.icelink.JsonProvider {
        getTypeString(): string;
        constructor();
        /**
        Deserializes a value from a JSON string.
        @param valueJson The JSON string to deserialize.
        @return
                    The deserialized value.
            
        */
        deserialize<T>(valueJson: string): T;
        /**
        Serializes a value to a JSON string.
        @param value The value to serialize.
        @return
                    The serialized JSON string.
            
        */
        serialize<T>(value: T): string;
    }
}
declare namespace fm.icelink {
    /**
    An implementation of a logging provider that does nothing.
    */
    class NullLogProvider extends fm.icelink.LogProvider {
        getTypeString(): string;
        constructor();
        /**
        Logs a message at the specified log level.
        @param logEvent The log event details.
        */
        protected doLog(logEvent: fm.icelink.LogEvent): void;
    }
}
declare namespace fm.icelink {
    class FutureStateWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.FutureState);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    Class to hold a short value passed by reference.
    */
    class ShortHolder {
        getTypeString(): string;
        /** @hidden */
        private _value;
        private fmicelinkShortHolderInit;
        /**
        Initializes a new instance of the [[fm.icelink.shortHolder]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.shortHolder]] class.
        @param value The value.
        */
        constructor(value: number);
        /**
        Gets the value.
        */
        getValue(): number;
        /**
        Sets the value.
        */
        setValue(value: number): void;
    }
}
declare namespace fm.icelink {
    /**
    Encapsulates useful sorting utilities.
    */
    class Sort {
        getTypeString(): string;
        constructor();
        /** @hidden */
        private static doQuickSort;
        /** @hidden */
        private static partition;
        /**
        Sorts an array using the in-place quick-sort algorithm.
        @param array The array of elements.
        @param comparer The function used to compare elements in the array -
                    should return less than 0 if item 1 is less than item 2 (item 1 should appear
                    before item 2), 0 if the items are equal, or more than 0 is item 1 is greater
                    than item 2 (item 1 should appear after item 2).
        */
        static quickSort<T>(array: Array<T>, comparer: fm.icelink.IFunction2<T, T, fm.icelink.CompareResult>): void;
        /** @hidden */
        private static swap;
    }
}
declare namespace fm.icelink {
    /**
    Utility class for splitting strings.
    */
    class Splitter {
        getTypeString(): string;
        constructor();
        /**
        Splits a string using a given delimiter.
        @param str The string.
        @param delimiter The delimiter.
        */
        static split(str: string, delimiter: string): string[];
    }
}
declare namespace fm.icelink {
    /**
    Contains methods for string manipulation.
    */
    class StringAssistant {
        getTypeString(): string;
        constructor();
        /**

        @param s The s.
        */
        static isNullOrWhiteSpace(s: string): boolean;
        /**
        Creates a subarray from an existing array.
        @param array The source array.
        @param offset The offset into the source array.
        @return The subarray.
        */
        static subArray(array: string[], offset: number): string[];
        /**
        Creates a subarray from an existing array.
        @param array The source array.
        @param offset The offset into the source array.
        @param count The number of elements to copy into the subarray.
        @return The subarray.
        */
        static subArray(array: string[], offset: number, count: number): string[];
    }
}
declare namespace fm.icelink {
    /**
    Simple log provider that writes to a local string builder.
    */
    class TextLogProvider extends fm.icelink.LogProvider {
        getTypeString(): string;
        /** @hidden */
        private __callback;
        /** @hidden */
        private __text;
        /** @hidden */
        private __textLock;
        /**
        Initializes a new instance of the [[fm.icelink.textLogProvider]] class using [[fm.icelink.logLevel.Info]].
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.textLogProvider]] class.
        @param level The log level.
        */
        constructor(level: fm.icelink.LogLevel);
        /**
        Clears all text from the log and returns the former contents.
        */
        clear(): string;
        /**
        Logs a message at the specified log level.
        @param logEvent The log event details.
        */
        protected doLog(logEvent: fm.icelink.LogEvent): void;
        /**
        Gets a callback to invoke whenever text is written to the log.
        */
        getCallback(): fm.icelink.IAction1<string>;
        /**
        Gets the logged text.
        */
        getText(): string;
        /**
        Sets a callback to invoke whenever text is written to the log.
        */
        setCallback(value: fm.icelink.IAction1<string>): void;
        /** @hidden */
        private writeLine;
    }
}
declare namespace fm.icelink {
    /**
    Throws exceptions on a separate thread.
    */
    class Unhandled {
        getTypeString(): string;
        constructor();
        /**
        Logs an unhandled exception.
        @param ex The exception to throw.
        @param source The source of the exception.
        */
        static logException(ex: fm.icelink.Exception, source: string): void;
    }
}
declare namespace fm.icelink {
    /**
    Arguments for an unhandled exception.
    */
    class UnhandledExceptionArgs {
        getTypeString(): string;
        /** @hidden */
        private __exception;
        /** @hidden */
        private _handled;
        private fmicelinkUnhandledExceptionArgsInit;
        /**
        Initializes a new instance of the [[fm.icelink.unhandledExceptionArgs]] class.
        @param exception The exception.
        */
        constructor(exception: fm.icelink.Exception);
        /**
        Gets the unhandled exception.
        */
        getException(): fm.icelink.Exception;
        /**
        Gets whether the exception has been appropriately handled. If set to `true`, then the exception will not be thrown.
        */
        getHandled(): boolean;
        /**
        Sets whether the exception has been appropriately handled. If set to `true`, then the exception will not be thrown.
        */
        setHandled(value: boolean): void;
    }
}
declare namespace fm.icelink {
    /**
    UTF-8 encoding/decoding utility.
    */
    class Utf8 {
        getTypeString(): string;
        constructor();
        /**
        Decodes a UTF-8 data buffer to a string.
        @param buffer The input byte array.
        */
        static decode(buffer: fm.icelink.DataBuffer): string;
        /**
        Decodes a UTF-8 byte array to a string.
        @param input The input byte array.
        */
        static decode(input: Uint8Array): string;
        /**
        Decodes a UTF-8 byte array to a string.
        @param input The input byte array.
        @param index The index to start reading.
        @param length The length.
        */
        static decode(input: Uint8Array, index: number, length: number): string;
        /**
        Encodes a string to a UTF-8 byte array.
        @param input The input string.
        */
        static encode(input: string): Uint8Array;
        /**
        Gets the number of bytes that would be returned by a call to encode.
        @param input The input string.
        */
        static getByteCount(input: string): number;
    }
}
declare namespace fm.icelink {
    /** @hidden */
    class WebSocketSendState {
        getTypeString(): string;
        /** @hidden */
        private _requestBytes;
        /** @hidden */
        private _sendArgs;
        constructor();
        getRequestBytes(): Uint8Array;
        getSendArgs(): fm.icelink.WebSocketSendArgs;
        setRequestBytes(value: Uint8Array): void;
        setSendArgs(value: fm.icelink.WebSocketSendArgs): void;
    }
}
declare namespace fm.icelink {
    /**
    Contract for an implementation of the WebSocket protocol v8.
    */
    interface IWebSocket {
        close(): void;
        close(closeArgs: fm.icelink.WebSocketCloseArgs): void;
        getBufferedAmount(): number;
        getIsOpen(): boolean;
        getSecure(): boolean;
        open(openArgs: fm.icelink.WebSocketOpenArgs): void;
        send(sendArgs: fm.icelink.WebSocketSendArgs): void;
    }
}
declare namespace fm.icelink {
    /**
    Close arguments for the [[fm.icelink.webSocket]] class.
    */
    class WebSocketCloseArgs extends fm.icelink.Dynamic {
        getTypeString(): string;
        /** @hidden */
        private _onComplete;
        /** @hidden */
        private _reason;
        /** @hidden */
        private _statusCode;
        /**
        Creates a new instance of [[fm.icelink.webSocketCloseArgs]] with default values.
        */
        constructor();
        /**
        Gets the callback to execute when the connection is closed.
        */
        getOnComplete(): fm.icelink.IAction1<fm.icelink.WebSocketCloseCompleteArgs>;
        /**
        Gets the reason to send with the close frame.
        */
        getReason(): string;
        /**
        Gets the status code to send with the close frame.
        */
        getStatusCode(): fm.icelink.WebSocketStatusCode;
        /**
        Sets the callback to execute when the connection is closed.
        */
        setOnComplete(value: fm.icelink.IAction1<fm.icelink.WebSocketCloseCompleteArgs>): void;
        /**
        Sets the reason to send with the close frame.
        */
        setReason(value: string): void;
        /**
        Sets the status code to send with the close frame.
        */
        setStatusCode(value: fm.icelink.WebSocketStatusCode): void;
    }
}
declare namespace fm.icelink {
    /**
    Arguments for [[fm.icelink.webSocketCloseArgs.onComplete]].
    */
    class WebSocketCloseCompleteArgs extends fm.icelink.Dynamic {
        getTypeString(): string;
        /** @hidden */
        private _closeArgs;
        /** @hidden */
        private _reason;
        /** @hidden */
        private _statusCode;
        constructor();
        /**
        Gets the original arguments passed to the close method.
        */
        getCloseArgs(): fm.icelink.WebSocketCloseArgs;
        /**
        Gets the reason given for closing the connection.
        */
        getReason(): string;
        /**
        Gets the status code associated with the close operation.
        */
        getStatusCode(): fm.icelink.WebSocketStatusCode;
        /**
        Sets the original arguments passed to the close method.
        */
        setCloseArgs(value: fm.icelink.WebSocketCloseArgs): void;
        /**
        Sets the reason given for closing the connection.
        */
        setReason(value: string): void;
        /**
        Sets the status code associated with the close operation.
        */
        setStatusCode(value: fm.icelink.WebSocketStatusCode): void;
    }
}
declare namespace fm.icelink {
    /**
    Open arguments for the [[fm.icelink.webSocket]] class.
    */
    class WebSocketOpenArgs extends fm.icelink.Dynamic {
        getTypeString(): string;
        /** @hidden */
        private _handshakeTimeout;
        /** @hidden */
        private _headers;
        /** @hidden */
        private _onFailure;
        /** @hidden */
        private _onReceive;
        /** @hidden */
        private _onRequestCreated;
        /** @hidden */
        private _onResponseReceived;
        /** @hidden */
        private _onStreamFailure;
        /** @hidden */
        private _onSuccess;
        /** @hidden */
        private _sender;
        /** @hidden */
        private _streamTimeout;
        private fmicelinkWebSocketOpenArgsInit;
        /**
        Creates a new instance of
        */
        constructor();
        /**
        Gets the timeout for the handshake (in ms).
        */
        getHandshakeTimeout(): number;
        /**
        Gets headers to send with the handshake request.
        */
        getHeaders(): fm.icelink.NameValueCollection;
        /**
        Gets the callback to invoke when a connection could not be established.
        */
        getOnFailure(): fm.icelink.IAction1<fm.icelink.WebSocketOpenFailureArgs>;
        /**
        Gets the callback to invoke when a message is received.
        */
        getOnReceive(): fm.icelink.IAction1<fm.icelink.WebSocketReceiveArgs>;
        /**
        Gets the callback to invoke before the handshake request is sent.
        */
        getOnRequestCreated(): fm.icelink.IAction1<fm.icelink.HttpRequestCreatedArgs>;
        /**
        Gets the callback to invoke after the handshake response is received.
        */
        getOnResponseReceived(): fm.icelink.IAction1<fm.icelink.HttpResponseReceivedArgs>;
        /**
        Gets the callback to invoke when a successful connection breaks down.
        */
        getOnStreamFailure(): fm.icelink.IAction1<fm.icelink.WebSocketStreamFailureArgs>;
        /**
        Gets the callback to invoke when a successful connection has been established.
        */
        getOnSuccess(): fm.icelink.IAction1<fm.icelink.WebSocketOpenSuccessArgs>;
        /**
        Gets the sender of the request.
        */
        getSender(): Object;
        /**
        Gets the timeout for the stream (in ms).
        */
        getStreamTimeout(): number;
        /**
        Sets the timeout for the handshake (in ms).
        */
        setHandshakeTimeout(value: number): void;
        /**
        Sets headers to send with the handshake request.
        */
        setHeaders(value: fm.icelink.NameValueCollection): void;
        /**
        Sets the callback to invoke when a connection could not be established.
        */
        setOnFailure(value: fm.icelink.IAction1<fm.icelink.WebSocketOpenFailureArgs>): void;
        /**
        Sets the callback to invoke when a message is received.
        */
        setOnReceive(value: fm.icelink.IAction1<fm.icelink.WebSocketReceiveArgs>): void;
        /**
        Sets the callback to invoke before the handshake request is sent.
        */
        setOnRequestCreated(value: fm.icelink.IAction1<fm.icelink.HttpRequestCreatedArgs>): void;
        /**
        Sets the callback to invoke after the handshake response is received.
        */
        setOnResponseReceived(value: fm.icelink.IAction1<fm.icelink.HttpResponseReceivedArgs>): void;
        /**
        Sets the callback to invoke when a successful connection breaks down.
        */
        setOnStreamFailure(value: fm.icelink.IAction1<fm.icelink.WebSocketStreamFailureArgs>): void;
        /**
        Sets the callback to invoke when a successful connection has been established.
        */
        setOnSuccess(value: fm.icelink.IAction1<fm.icelink.WebSocketOpenSuccessArgs>): void;
        /**
        Sets the sender of the request.
        */
        setSender(value: Object): void;
        /**
        Sets the timeout for the stream (in ms).
        */
        setStreamTimeout(value: number): void;
    }
}
declare namespace fm.icelink {
    /**
    Arguments for [[fm.icelink.webSocketOpenArgs.onFailure]].
    */
    class WebSocketOpenFailureArgs extends fm.icelink.Dynamic {
        getTypeString(): string;
        /** @hidden */
        private _exception;
        /** @hidden */
        private _openArgs;
        /** @hidden */
        private _statusCode;
        constructor();
        /**
        Gets the exception generated while connecting.
        */
        getException(): fm.icelink.Exception;
        /**
        Gets the original arguments passed to the open method.
        */
        getOpenArgs(): fm.icelink.WebSocketOpenArgs;
        /**
        Gets the status code associated with the failure to connect.
        */
        getStatusCode(): fm.icelink.WebSocketStatusCode;
        /**
        Sets the exception generated while connecting.
        */
        setException(value: fm.icelink.Exception): void;
        /**
        Sets the original arguments passed to the open method.
        */
        setOpenArgs(value: fm.icelink.WebSocketOpenArgs): void;
        /**
        Sets the status code associated with the failure to connect.
        */
        setStatusCode(value: fm.icelink.WebSocketStatusCode): void;
    }
}
declare namespace fm.icelink {
    /**
    Arguments for [[fm.icelink.webSocketOpenArgs.onSuccess]].
    */
    class WebSocketOpenSuccessArgs extends fm.icelink.Dynamic {
        getTypeString(): string;
        /** @hidden */
        private _openArgs;
        constructor();
        /**
        Gets the original arguments passed to the open method.
        */
        getOpenArgs(): fm.icelink.WebSocketOpenArgs;
        /**
        Sets the original arguments passed to the open method.
        */
        setOpenArgs(value: fm.icelink.WebSocketOpenArgs): void;
    }
}
declare namespace fm.icelink {
    /**
    Arguments for [[fm.icelink.webSocketOpenArgs.onReceive]].
    */
    class WebSocketReceiveArgs extends fm.icelink.Dynamic {
        getTypeString(): string;
        /** @hidden */
        private _binaryMessage;
        /** @hidden */
        private _openArgs;
        /** @hidden */
        private _textMessage;
        constructor();
        /**
        Gets the message received from the server as binary data.
        */
        getBinaryMessage(): Uint8Array;
        /**
        Gets whether or not the received message is text.
        */
        getIsText(): boolean;
        /**
        Gets the original arguments passed to the open method.
        */
        getOpenArgs(): fm.icelink.WebSocketOpenArgs;
        /**
        Gets the message received from the server as text data.
        */
        getTextMessage(): string;
        /**
        Sets the message received from the server as binary data.
        */
        setBinaryMessage(value: Uint8Array): void;
        /**
        Sets the original arguments passed to the open method.
        */
        setOpenArgs(value: fm.icelink.WebSocketOpenArgs): void;
        /**
        Sets the message received from the server as text data.
        */
        setTextMessage(value: string): void;
    }
}
declare namespace fm.icelink {
    /** @hidden */
    class WebSocketRequest {
        getTypeString(): string;
        /** @hidden */
        private _args;
        /** @hidden */
        private _callback;
        constructor();
        getArgs(): fm.icelink.HttpRequestArgs;
        getCallback(): fm.icelink.IAction1<fm.icelink.HttpResponseArgs>;
        setArgs(value: fm.icelink.HttpRequestArgs): void;
        setCallback(value: fm.icelink.IAction1<fm.icelink.HttpResponseArgs>): void;
    }
}
declare namespace fm.icelink {
    /**
    Send arguments for the [[fm.icelink.webSocket]] class.
    */
    class WebSocketSendArgs extends fm.icelink.Dynamic {
        getTypeString(): string;
        /** @hidden */
        private _binaryMessage;
        /** @hidden */
        private _textMessage;
        /** @hidden */
        private _timeout;
        private fmicelinkWebSocketSendArgsInit;
        /**
        Creates a new [[fm.icelink.webSocketSendArgs]] instance.
        */
        constructor();
        /**
        Gets the message to send as binary data.
        */
        getBinaryMessage(): Uint8Array;
        /** @hidden */
        getIsText(): boolean;
        /**
        Gets the message to send as text data.
        */
        getTextMessage(): string;
        /**
        Gets the timeout for the request (in ms).
        */
        getTimeout(): number;
        /**
        Sets the message to send as binary data.
        */
        setBinaryMessage(value: Uint8Array): void;
        /**
        Sets the message to send as text data.
        */
        setTextMessage(value: string): void;
        /**
        Sets the timeout for the request (in ms).
        */
        setTimeout(value: number): void;
    }
}
declare namespace fm.icelink {
    class WebSocketStatusCodeWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.WebSocketStatusCode);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    Arguments for [[fm.icelink.webSocketOpenArgs.onStreamFailure]].
    */
    class WebSocketStreamFailureArgs extends fm.icelink.Dynamic {
        getTypeString(): string;
        /** @hidden */
        private _exception;
        /** @hidden */
        private _openArgs;
        /** @hidden */
        private _statusCode;
        constructor();
        /**
        Gets the exception generated by the active connection.
        */
        getException(): fm.icelink.Exception;
        /**
        Gets the original arguments passed to the open method.
        */
        getOpenArgs(): fm.icelink.WebSocketOpenArgs;
        /**
        Gets the status code associated with the stream failure.
        */
        getStatusCode(): fm.icelink.WebSocketStatusCode;
        /**
        Sets the exception generated by the active connection.
        */
        setException(value: fm.icelink.Exception): void;
        /**
        Sets the original arguments passed to the open method.
        */
        setOpenArgs(value: fm.icelink.WebSocketOpenArgs): void;
        /**
        Sets the status code associated with the stream failure.
        */
        setStatusCode(value: fm.icelink.WebSocketStatusCode): void;
    }
}
declare namespace fm.icelink {
    /**
    Base class that defines methods for transferring content over the WebSocket protocol.
    */
    abstract class WebSocketTransfer {
        getTypeString(): string;
        /** @hidden */
        private __url;
        /** @hidden */
        private _handshakeTimeout;
        /** @hidden */
        private _onOpenFailure;
        /** @hidden */
        private _onOpenSuccess;
        /** @hidden */
        private _onRequestCreated;
        /** @hidden */
        private _onResponseReceived;
        /** @hidden */
        private _onStreamFailure;
        /** @hidden */
        private _sender;
        /** @hidden */
        private _streamTimeout;
        private fmicelinkWebSocketTransferInit;
        /**
        Initializes a new instance of the [[fm.icelink.webSocketTransfer]] class.
        @param url The URL.
        */
        constructor(url: string);
        /**
        Gets the timeout for the initial handshake (in ms).
        */
        getHandshakeTimeout(): number;
        /**
        Gets the callback to invoke if the handshake fails.
        */
        getOnOpenFailure(): fm.icelink.IAction1<fm.icelink.WebSocketOpenFailureArgs>;
        /**
        Gets the callback to invoke if the handshake succeeds.
        */
        getOnOpenSuccess(): fm.icelink.IAction1<fm.icelink.WebSocketOpenSuccessArgs>;
        /**
        Gets the callback to invoke when the handshake request is created.
        */
        getOnRequestCreated(): fm.icelink.IAction1<fm.icelink.HttpRequestCreatedArgs>;
        /**
        Gets the callback to invoke when the handshake response is received.
        */
        getOnResponseReceived(): fm.icelink.IAction1<fm.icelink.HttpResponseReceivedArgs>;
        /**
        Gets the callback to invoke if the stream errors out.
        */
        getOnStreamFailure(): fm.icelink.IAction1<fm.icelink.WebSocketStreamFailureArgs>;
        /**
        Gets the sender of the messages.
        */
        getSender(): Object;
        /**
        Gets the timeout for the stream (in ms).
        */
        getStreamTimeout(): number;
        /**
        Gets the URL.
        */
        getUrl(): string;
        /**
        Opens the socket.
        @param headers The headers to pass in with the initial handshake.
        */
        abstract open(headers: fm.icelink.NameValueCollection): void;
        /**
        Sends a request synchronously.
        @param requestArgs The request parameters.
        @return The response parameters.
        */
        abstract send(requestArgs: fm.icelink.HttpRequestArgs): fm.icelink.HttpResponseArgs;
        /**
        Sends a request asynchronously.
        @param requestArgs The request parameters.
        @param callback The callback to execute with the resulting response.
        */
        abstract sendAsync(requestArgs: fm.icelink.HttpRequestArgs, callback: fm.icelink.IAction1<fm.icelink.HttpResponseArgs>): void;
        /**
        Sets the timeout for the initial handshake (in ms).
        */
        setHandshakeTimeout(value: number): void;
        /**
        Sets the callback to invoke if the handshake fails.
        */
        setOnOpenFailure(value: fm.icelink.IAction1<fm.icelink.WebSocketOpenFailureArgs>): void;
        /**
        Sets the callback to invoke if the handshake succeeds.
        */
        setOnOpenSuccess(value: fm.icelink.IAction1<fm.icelink.WebSocketOpenSuccessArgs>): void;
        /**
        Sets the callback to invoke when the handshake request is created.
        */
        setOnRequestCreated(value: fm.icelink.IAction1<fm.icelink.HttpRequestCreatedArgs>): void;
        /**
        Sets the callback to invoke when the handshake response is received.
        */
        setOnResponseReceived(value: fm.icelink.IAction1<fm.icelink.HttpResponseReceivedArgs>): void;
        /**
        Sets the callback to invoke if the stream errors out.
        */
        setOnStreamFailure(value: fm.icelink.IAction1<fm.icelink.WebSocketStreamFailureArgs>): void;
        /**
        Sets the sender of the messages.
        */
        setSender(value: Object): void;
        /**
        Sets the timeout for the stream (in ms).
        */
        setStreamTimeout(value: number): void;
        /**
        Sets the URL.
        */
        setUrl(value: string): void;
        /**
        Releases any resources and shuts down.
        */
        abstract shutdown(): void;
    }
}
declare namespace fm.icelink {
    /**
    Creates implementations of [[fm.icelink.webSocketWebRequestTransfer]].
    */
    class WebSocketTransferFactory {
        getTypeString(): string;
        /** @hidden */
        private static fm_icelink_WebSocketTransferFactory__createWebSocketTransfer;
        constructor();
        /** @hidden */
        static defaultCreateWebSocketTransfer(url: string): fm.icelink.WebSocketTransfer;
        /**
        Gets the callback that creates a WebSocket-based transfer class.
        */
        static getCreateWebSocketTransfer(): fm.icelink.IFunction1<string, fm.icelink.WebSocketTransfer>;
        /**
        Gets an instance of the WebSocket-based transfer class.
        */
        static getWebSocketTransfer(url: string): fm.icelink.WebSocketTransfer;
        /**
        Sets the callback that creates a WebSocket-based transfer class.
        */
        static setCreateWebSocketTransfer(value: fm.icelink.IFunction1<string, fm.icelink.WebSocketTransfer>): void;
    }
}
declare namespace fm.icelink {
    /**
    Defines methods for transferring messages using the WebSocket protocol.
    */
    class WebSocketWebRequestTransfer extends fm.icelink.WebSocketTransfer {
        getTypeString(): string;
        /** @hidden */
        private _activeRequest;
        /** @hidden */
        private _webSocket;
        /**
        Creates a new instance of [[fm.icelink.webSocketWebRequestTransfer]].
        @param url The URL.
        */
        constructor(url: string);
        /** @hidden */
        private connectFailure;
        /** @hidden */
        private connectSuccess;
        /** @hidden */
        private getWebSocket;
        /**
        Opens the WebSocket connection.
        */
        open(headers: fm.icelink.NameValueCollection): void;
        /** @hidden */
        private receive;
        /**
        Sends a request synchronously.
        @param requestArgs The request parameters.
        @return The response parameters.
        */
        send(requestArgs: fm.icelink.HttpRequestArgs): fm.icelink.HttpResponseArgs;
        /**
        Sends a request asynchronously.
        @param requestArgs The request parameters.
        @param callback The callback to execute with the resulting response.
        */
        sendAsync(requestArgs: fm.icelink.HttpRequestArgs, callback: fm.icelink.IAction1<fm.icelink.HttpResponseArgs>): void;
        /** @hidden */
        private setWebSocket;
        /**
        Releases any resources and shuts down.
        */
        shutdown(): void;
        /** @hidden */
        private streamFailure;
    }
}
declare namespace fm.icelink {
    /**
    A media buffer.
    */
    abstract class MediaBuffer<TFormat extends fm.icelink.MediaFormat<TFormat>, TBuffer extends fm.icelink.MediaBuffer<TFormat, TBuffer>> extends fm.icelink.Dynamic {
        getTypeString(): string;
        /** @hidden */
        private __dataBuffers;
        /** @hidden */
        private __format;
        /** @hidden */
        private _recoveredByFec;
        /** @hidden */
        private _rtpHeaders;
        /** @hidden */
        private _sequenceNumbers;
        /** @hidden */
        private _sourceId;
        private fmicelinkMediaBufferInit;
        /**
        Initializes a new instance of the [[fm.icelink.mediaBuffer]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.mediaBuffer]] class.
        @param dataBuffer The data buffer.
        @param format The format.
        */
        constructor(dataBuffer: fm.icelink.DataBuffer, format: TFormat);
        /**
        Initializes a new instance of the [[fm.icelink.mediaBuffer]] class.
        @param dataBuffers The data buffers.
        @param format The format.
        */
        constructor(dataBuffers: fm.icelink.DataBuffer[], format: TFormat);
        /**
        Clones this instance.
        */
        clone(): TBuffer;
        /**
        Creates a new instance.
        */
        protected abstract createInstance(): TBuffer;
        /**
        Frees the data buffers referenced by this instance.
        @return This instance.
        */
        free(): TBuffer;
        /**
        Gets the data buffer.
        */
        getDataBuffer(): fm.icelink.DataBuffer;
        /**
        Gets the data buffers.
        */
        getDataBuffers(): fm.icelink.DataBuffer[];
        /**
        Gets the approximate footprint of this media buffer by returning the sum of its data buffer lengths.
        */
        getFootprint(): number;
        /**
        Gets the format.
        */
        getFormat(): TFormat;
        /**
        Gets a value indicating whether this instance has been muted.
        */
        abstract getIsMuted(): boolean;
        /** @hidden */
        getIsPacketized(): boolean;
        /**
        Gets the last sequence number.
        */
        getLastSequenceNumber(): number;
        /**
        Gets a value indicating whether this buffer contains data recovered by forward error correction (FEC).
        */
        getRecoveredByFec(): boolean;
        /**
        Gets the Rtp Packet Header for this media buffer.
        */
        getRtpHeader(): fm.icelink.RtpPacketHeader;
        /**
        Gets the RTP Packet Headers for this media buffer.
        */
        getRtpHeaders(): fm.icelink.RtpPacketHeader[];
        /**
        Gets the RTP sequence number.
        */
        getRtpSequenceNumber(): number;
        /**
        Gets the RTP sequence numbers.
        */
        getRtpSequenceNumbers(): number[];
        /**
        Gets the sequence number.
        */
        getSequenceNumber(): number;
        /**
        Gets the sequence numbers.
        */
        getSequenceNumbers(): number[];
        /**
        Gets the source identifier.
        */
        getSourceId(): string;
        /**
        Keeps the data buffers referenced by this instance.
        @return This instance.
        */
        keep(): TBuffer;
        /**
        Mutes this instance. This is a one-way operation that clears the underlying data buffer. If the buffer has an unsupported format, this method will return `false`.
        */
        abstract mute(): boolean;
        /**
        Sets the data buffer.
        */
        setDataBuffer(value: fm.icelink.DataBuffer): void;
        /**
        Sets the data buffers.
        */
        setDataBuffers(value: fm.icelink.DataBuffer[]): void;
        /**
        Sets the format.
        */
        setFormat(value: TFormat): void;
        /**
        Sets a value indicating whether this buffer contains data recovered by forward error correction (FEC).
        */
        setRecoveredByFec(value: boolean): void;
        /**
        Sets the Rtp Packet Header for this media buffer.
        */
        setRtpHeader(value: fm.icelink.RtpPacketHeader): void;
        /**
        Sets the RTP Packet Headers for this media buffer.
        */
        setRtpHeaders(value: fm.icelink.RtpPacketHeader[]): void;
        /**
        Sets the sequence number.
        */
        setSequenceNumber(value: number): void;
        /**
        Sets the sequence numbers.
        */
        setSequenceNumbers(value: number[]): void;
        /**
        Sets the source identifier.
        */
        setSourceId(value: string): void;
        /**
        Returns a string that represents this instance.
        */
        toString(): string;
        /**
        Attempts to keep the data buffers referenced by this instance.
        @return True if succeeded.
        */
        tryKeep(): boolean;
    }
}
declare namespace fm.icelink {
    /**
    A media format.
    */
    abstract class MediaFormat<TFormat extends fm.icelink.MediaFormat<TFormat>> {
        getTypeString(): string;
        /** @hidden */
        private __name;
        /** @hidden */
        private __packetizationMode;
        /** @hidden */
        private _clockRate;
        /** @hidden */
        private _isEncrypted;
        /** @hidden */
        private _isFixedBitrate;
        /** @hidden */
        private _isInjected;
        /** @hidden */
        private _isPacketized;
        /** @hidden */
        private _level;
        /** @hidden */
        private _levelIsStrict;
        /** @hidden */
        private _profile;
        /** @hidden */
        private _registeredPayloadType;
        /** @hidden */
        private _staticPayloadType;
        private fmicelinkMediaFormatInit;
        /**
        Initializes a new instance of the [[fm.icelink.mediaFormat]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.mediaFormat]] class.
        @param name The name.
        @param clockRate The clock rate.
        */
        constructor(name: string, clockRate: number);
        /**
        Initializes a new instance of the [[fm.icelink.mediaFormat]] class.
        @param name The name.
        @param clockRate The clock rate.
        @param packetizationMode The packetization mode.
        */
        constructor(name: string, clockRate: number, packetizationMode: string);
        /**
        Initializes a new instance of the [[fm.icelink.mediaFormat]] class.
        @param name The name.
        @param clockRate The clock rate.
        @param level The media format level.
        @param profile The media format profile.
        */
        constructor(name: string, clockRate: number, profile: string, level: string);
        /**
        Initializes a new instance of the [[fm.icelink.mediaFormat]] class.
        @param name The name.
        @param clockRate The clock rate.
        @param level The media format level
        @param profile The media format profile
        @param packetizationMode The packetization mode.
        */
        constructor(name: string, clockRate: number, profile: string, level: string, packetizationMode: string);
        /**
        Gets the name of the RED media format.
        */
        static getRedName(): string;
        /**
        Gets the name of the ULPFEC media format.
        */
        static getUlpFecName(): string;
        /**
        Clones this instance.
        */
        clone(): TFormat;
        /**
        Creates a new instance.
        */
        protected abstract createInstance(): TFormat;
        /**
        Gets the clock rate.
        */
        getClockRate(): number;
        /**
        Gets the full name, including clock rate and encoding parameters.
        */
        getFullName(): string;
        /**
        Gets this format as an info object.
        */
        abstract getInfo(): fm.icelink.FormatInfo;
        /**
        Gets whether this is a compressed format.
        */
        abstract getIsCompressed(): boolean;
        /**
        Gets a value indicating that the data is encrypted.
        */
        getIsEncrypted(): boolean;
        /**
        Gets a value indicating whether a format only supports fixed bitrate.
        */
        getIsFixedBitrate(): boolean;
        /**
        Gets a value indicating that the data is injected into the primary media stream (e.g. DTMF).
        */
        getIsInjected(): boolean;
        /**
        Gets a value indicating whether the data is packetized.
        */
        getIsPacketized(): boolean;
        /**
        Gets the level.
        */
        getLevel(): string;
        /**
        Gets a value indicating whether the level is strict.
        */
        getLevelIsStrict(): boolean;
        /**
        Gets the maximum level.
        @param level1 The first level.
        @param level2 The second level.
        @return The maximum level.
        */
        protected getMaxLevel(level1: string, level2: string): string;
        /**
        Gets the minimum level.
        @param level1 The first level.
        @param level2 The second level.
        @return The minimum level.
        */
        protected getMinLevel(level1: string, level2: string): string;
        /**
        Gets the name.
        */
        getName(): string;
        /**
        Gets the packetization mode.
        */
        getPacketizationMode(): string;
        /**
        Gets the parameters.
        */
        abstract getParameters(): string;
        /**
        Gets the profile.
        */
        getProfile(): string;
        /** @hidden */
        getRegisteredPayloadType(): number;
        /**
        Gets the static payload type, if this format has a static payload type registered with IANA.
        */
        getStaticPayloadType(): number;
        /** @hidden */
        private initialize;
        /**
        Determines whether the specified format is compatible.
        @param format The format.
        */
        isCompatible(format: TFormat): boolean;
        /**
        Determines whether the specified format is equivalent.
        @param format The format.
        @param ignoreIsPacketized Whether to ignore if the two formats differ in whether they are packetized.
        */
        isEquivalent(format: TFormat, ignoreIsPacketized: boolean): boolean;
        /**
        Gets whether a level is compatible.
        @param level The level.
        */
        protected isLevelCompatible(level: string): boolean;
        /**
        Gets whether a profile is compatible.
        @param profile The profile.
        */
        protected isProfileCompatible(profile: string): boolean;
        /**
        Sets the clock rate.
        */
        setClockRate(value: number): void;
        /**
        Sets a value indicating that the data is encrypted.
        */
        setIsEncrypted(value: boolean): void;
        /**
        Sets a value indicating whether a format only supports fixed bitrate.
        */
        protected setIsFixedBitrate(value: boolean): void;
        /**
        Sets a value indicating that the data is injected into the primary media stream (e.g. DTMF).
        */
        setIsInjected(value: boolean): void;
        /**
        Sets a value indicating whether the data is packetized.
        */
        setIsPacketized(value: boolean): void;
        /**
        Sets the level.
        */
        setLevel(value: string): void;
        /**
        Sets a value indicating whether the level is strict.
        */
        setLevelIsStrict(value: boolean): void;
        /**
        Sets the name.
        */
        setName(value: string): void;
        /**
        Sets the packetization mode.
        */
        setPacketizationMode(value: string): void;
        /**
        Sets the profile.
        */
        setProfile(value: string): void;
        /** @hidden */
        setRegisteredPayloadType(value: number): void;
        /**
        Sets the static payload type, if this format has a static payload type registered with IANA.
        */
        protected setStaticPayloadType(value: number): void;
        /**
        Returns a string that represents this instance.
        */
        toString(): string;
        /**
        Updates the level-is-strict flag to a compatible value.
        @param format The format.
        */
        protected updateLevelIsStrictToCompatible(format: TFormat): void;
        /**
        Updates the level to a compatible value.
        @param format The format.
        */
        protected updateLevelToCompatible(format: TFormat): void;
        /**
        Updates the profile to a compatible value.
        @param format The format.
        */
        protected updateProfileToCompatible(format: TFormat): void;
        /** @hidden */
        updateToCompatible(format: TFormat): void;
    }
}
declare namespace fm.icelink {
    /**
    An audio format.
    */
    class AudioFormat extends fm.icelink.MediaFormat<fm.icelink.AudioFormat> {
        getTypeString(): string;
        /** @hidden */
        private _channelCount;
        /** @hidden */
        private _littleEndian;
        private fmicelinkAudioFormatInit;
        /**
        Initializes a new instance of the [[fm.icelink.audioFormat]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.audioFormat]] class.
        @param name The name.
        @param clockRate The clock rate.
        @param channelCount The channel count.
        */
        constructor(name: string, clockRate: number, channelCount: number);
        /**
        Initializes a new instance of the [[fm.icelink.audioFormat]] class.
        @param name The name.
        @param config The configuration.
        */
        constructor(name: string, config: fm.icelink.AudioConfig);
        /**
        Deserializes an instance from JSON.
        @param audioFormatJson The audio format JSON.
        */
        static fromJson(audioFormatJson: string): fm.icelink.AudioFormat;
        /**
        Gets the name of the DTMF audio format ("telephone-event").
        */
        static getDtmfName(): string;
        /**
        Gets the name of the G.722 audio format ("G722").
        */
        static getG722Name(): string;
        /**
        Gets the name of the Opus audio format ("opus").
        */
        static getOpusName(): string;
        /**
        Gets the name of the PCMA audio format ("PCMA").
        */
        static getPcmaName(): string;
        /**
        Gets the name of the PCM audio format ("PCM").
        */
        static getPcmName(): string;
        /**
        Gets the name of the PCMU audio format ("PCMU").
        */
        static getPcmuName(): string;
        /**
        Serializes an instance to JSON.
        @param audioFormat The audio format.
        */
        static toJson(audioFormat: fm.icelink.AudioFormat): string;
        /**
        Clones this instance.
        */
        clone(): fm.icelink.AudioFormat;
        /**
        Creates a new instance.
        */
        protected createInstance(): fm.icelink.AudioFormat;
        /**
        Gets the channel count.
        */
        getChannelCount(): number;
        /**
        Gets the clock rate and channel count as a configuration.
        */
        getConfig(): fm.icelink.AudioConfig;
        /**
        Gets this format as an info object.
        */
        getInfo(): fm.icelink.FormatInfo;
        /**
        Gets whether this is a compressed format.
        */
        getIsCompressed(): boolean;
        /**
        Gets a value indicating whether this format is DTMF.
        */
        getIsDtmf(): boolean;
        /**
        Gets a value indicating whether this format is G.722.
        */
        getIsG722(): boolean;
        /**
        Gets a value indicating whether this format is Opus.
        */
        getIsOpus(): boolean;
        /**
        Gets a value indicating whether this format is PCM.
        */
        getIsPcm(): boolean;
        /**
        Gets a value indicating whether this format is PCMA.
        */
        getIsPcma(): boolean;
        /**
        Gets a value indicating whether this format is PCMU.
        */
        getIsPcmu(): boolean;
        /**
        Gets whether the format uses little endian byte order.
        */
        getLittleEndian(): boolean;
        /**
        Gets the parameters.
        */
        getParameters(): string;
        /**
        Determines whether the specified format is compatible.
        @param format The format.
        */
        isCompatible(format: fm.icelink.AudioFormat): boolean;
        /**
        Determines whether the specified format is equivalent.
        @param format The format.
        @param ignoreIsPacketized Whether to ignore if the two formats differ in whether they are packetized.
        */
        isEquivalent(format: fm.icelink.AudioFormat, ignoreIsPacketized: boolean): boolean;
        /**
        Sets the channel count.
        */
        setChannelCount(value: number): void;
        /**
        Sets whether the format uses little endian byte order.
        */
        setLittleEndian(value: boolean): void;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Media sink base properties/methods.
    */
    abstract class MediaSinkBase extends fm.icelink.Dynamic {
        getTypeString(): string;
        /** @hidden */
        private __id;
        /** @hidden */
        private _externalId;
        /** @hidden */
        private _tag;
        constructor();
        /**
        Gets the external identifier.
        */
        getExternalId(): string;
        /**
        Gets the identifier.
        */
        getId(): string;
        /**
        Gets optional data to associate with this instance.
        */
        getTag(): string;
        /**
        Sets the external identifier.
        */
        setExternalId(value: string): void;
        /**
        Sets optional data to associate with this instance.
        */
        setTag(value: string): void;
    }
}
declare namespace fm.icelink {
    /**
    Media source base properties/methods.
    */
    abstract class MediaSourceBase extends fm.icelink.Dynamic {
        getTypeString(): string;
        /** @hidden */
        private __id;
        /** @hidden */
        private _externalId;
        /** @hidden */
        private _tag;
        constructor();
        /**
        Gets the external identifier.
        */
        getExternalId(): string;
        /**
        Gets the identifier.
        */
        getId(): string;
        /**
        Gets optional data to associate with this instance.
        */
        getTag(): string;
        /**
        Sets the external identifier.
        */
        setExternalId(value: string): void;
        /**
        Sets optional data to associate with this instance.
        */
        setTag(value: string): void;
        /**
        Starts this instance.
        */
        abstract start(): fm.icelink.Future<Object>;
        /**
        Stops this instance.
        */
        abstract stop(): fm.icelink.Future<Object>;
    }
}
declare namespace fm.icelink {
    /**
    Stream interface.
    */
    interface IStream {
        addOnDirectionChange(value: fm.icelink.IAction0): void;
        addOnStateChange(value: fm.icelink.IAction0): void;
        changeDirection(newDirection: fm.icelink.StreamDirection): fm.icelink.Error;
        getDirection(): fm.icelink.StreamDirection;
        getExternalId(): string;
        getId(): string;
        getLabel(): string;
        getLocalDirection(): fm.icelink.StreamDirection;
        getLocalReceive(): boolean;
        getLocalSend(): boolean;
        getRemoteDirection(): fm.icelink.StreamDirection;
        getRemoteReceive(): boolean;
        getRemoteSend(): boolean;
        getState(): fm.icelink.StreamState;
        getTag(): string;
        getTransportInfo(): fm.icelink.TransportInfo;
        getType(): fm.icelink.StreamType;
        removeOnDirectionChange(value: fm.icelink.IAction0): void;
        removeOnStateChange(value: fm.icelink.IAction0): void;
        setExternalId(value: string): void;
        setLocalDirection(value: fm.icelink.StreamDirection): void;
        setLocalReceive(value: boolean): void;
        setLocalSend(value: boolean): void;
        setTag(value: string): void;
    }
}
declare namespace fm.icelink {
    /**
    Media stream interface.
    */
    interface IMediaStream extends fm.icelink.IStream {
        addOnLocalEncodingDisabled(value: fm.icelink.IAction1<fm.icelink.EncodingInfo>): void;
        addOnLocalEncodingEnabled(value: fm.icelink.IAction1<fm.icelink.EncodingInfo>): void;
        getCodecDisabled(name: string): boolean;
        getControlTransportInfo(): fm.icelink.TransportInfo;
        getInfo(): fm.icelink.MediaStreamInfo;
        getInputMuted(): boolean;
        getLocalBandwidth(): number;
        getLocalCanonicalName(): string;
        getOutputMuted(): boolean;
        getPreferredCodecs(): string[];
        getRemoteBandwidth(): number;
        getRemoteCanonicalName(): string;
        getRemoteEncoding(): fm.icelink.EncodingInfo;
        getSimulcastMode(): fm.icelink.SimulcastMode;
        removeOnLocalEncodingDisabled(value: fm.icelink.IAction1<fm.icelink.EncodingInfo>): void;
        removeOnLocalEncodingEnabled(value: fm.icelink.IAction1<fm.icelink.EncodingInfo>): void;
        setCodecDisabled(name: string, disabled: boolean): void;
        setInputMuted(value: boolean): void;
        setLocalBandwidth(value: number): void;
        setOutputMuted(value: boolean): void;
        setPreferredCodecs(value: string[]): void;
        setRemoteEncoding(value: fm.icelink.EncodingInfo): void;
        setSimulcastMode(value: fm.icelink.SimulcastMode): void;
    }
}
declare namespace fm.icelink {
    /**
    Audio stream interface.
    */
    interface IAudioStream extends fm.icelink.IMediaStream, fm.icelink.IStream {
        addOnReceiveDtmfTone(value: fm.icelink.IAction1<fm.icelink.dtmf.Tone>): void;
        addOnReceiveDtmfToneChange(value: fm.icelink.IAction1<fm.icelink.dtmf.Tone>): void;
        addOnSendDtmfTone(value: fm.icelink.IAction1<fm.icelink.dtmf.Tone>): void;
        addOnSendDtmfToneChange(value: fm.icelink.IAction1<fm.icelink.dtmf.Tone>): void;
        getG722Disabled(): boolean;
        getOpusDisabled(): boolean;
        getPcmaDisabled(): boolean;
        getPcmuDisabled(): boolean;
        insertDtmfTone(dtmfTone: fm.icelink.dtmf.Tone): boolean;
        insertDtmfTones(dtmfTones: fm.icelink.dtmf.Tone[]): boolean;
        removeOnReceiveDtmfTone(value: fm.icelink.IAction1<fm.icelink.dtmf.Tone>): void;
        removeOnReceiveDtmfToneChange(value: fm.icelink.IAction1<fm.icelink.dtmf.Tone>): void;
        removeOnSendDtmfTone(value: fm.icelink.IAction1<fm.icelink.dtmf.Tone>): void;
        removeOnSendDtmfToneChange(value: fm.icelink.IAction1<fm.icelink.dtmf.Tone>): void;
        setG722Disabled(value: boolean): void;
        setOpusDisabled(value: boolean): void;
        setPcmaDisabled(value: boolean): void;
        setPcmuDisabled(value: boolean): void;
    }
}
declare namespace fm.icelink {
    class CcmLrrPolicyWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.CcmLrrPolicy);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /** @hidden */
    class DataMessage {
        getTypeString(): string;
        /** @hidden */
        private __elements;
        /** @hidden */
        private _dataBytes;
        /** @hidden */
        private _dataString;
        /** @hidden */
        private static fm_icelink_DataMessage___log;
        /** @hidden */
        static readonly IntUnset: number;
        constructor(messageBytes: fm.icelink.DataBuffer);
        constructor(messageString: string);
        /** @hidden */
        static parseBytes(buffer: fm.icelink.DataBuffer): fm.icelink.DataMessage;
        /** @hidden */
        getBytes(): fm.icelink.DataBuffer;
        getDataBytes(): fm.icelink.DataBuffer;
        getDataString(): string;
        /** @hidden */
        getElements(): fm.icelink.datamessageheader.Element[];
        /** @hidden */
        getNumberOfRetransmissions(): number;
        /** @hidden */
        getRemoteConnectionId(): string;
        /** @hidden */
        getTimeToLive(): number;
        /** @hidden */
        getVersion(): number;
        /** @hidden */
        private setDataBytes;
        /** @hidden */
        private setDataString;
        /** @hidden */
        setElements(value: fm.icelink.datamessageheader.Element[]): void;
        /** @hidden */
        setNumberOfRetransmissions(value: number): void;
        /** @hidden */
        setRemoteConnectionId(value: string): void;
        /** @hidden */
        setTimeToLive(value: number): void;
        /** @hidden */
        private static __fmicelinkDataMessageInitialized;
        /** @hidden */
        static fmicelinkDataMessageInitialize(): void;
    }
}
declare namespace fm.icelink.datamessageheader {
    /** @hidden */
    abstract class Element {
        getTypeString(): string;
        /** @hidden */
        private _type;
        private fmicelinkdatamessageheaderElementInit;
        constructor();
        static parseBytes(buffer: fm.icelink.DataBuffer, offset: number, offsetPlus: fm.icelink.Holder<number>): fm.icelink.datamessageheader.Element;
        abstract getBytes(): fm.icelink.DataBuffer;
        abstract getLength(): number;
        getType(): number;
        protected setType(value: number): void;
    }
}
declare namespace fm.icelink.datamessageheader {
    /** @hidden */
    class DeliveryAttemptsElement extends fm.icelink.datamessageheader.Element {
        getTypeString(): string;
        /** @hidden */
        private _deliveryAttempts;
        private fmicelinkdatamessageheaderDeliveryAttemptsElementInit;
        constructor(numAttempts: number);
        /** @hidden */
        static doParseBytes(buffer: fm.icelink.DataBuffer, index: number, offsetPlus: fm.icelink.Holder<number>): fm.icelink.datamessageheader.Element;
        getBytes(): fm.icelink.DataBuffer;
        getDeliveryAttempts(): number;
        getLength(): number;
        /** @hidden */
        private setDeliveryAttempts;
    }
}
declare namespace fm.icelink.datamessageheader {
    /** @hidden */
    class ConnectionIdElement extends fm.icelink.datamessageheader.Element {
        getTypeString(): string;
        /** @hidden */
        private __connectionId;
        constructor(idValue: string);
        /** @hidden */
        static doParseBytes(buffer: fm.icelink.DataBuffer, index: number, offsetPlus: fm.icelink.Holder<number>): fm.icelink.datamessageheader.Element;
        getBytes(): fm.icelink.DataBuffer;
        getConnectionId(): string;
        getLength(): number;
        /** @hidden */
        private setConnectionId;
    }
}
declare namespace fm.icelink.datamessageheader {
    /** @hidden */
    class TimeToLiveElement extends fm.icelink.datamessageheader.Element {
        getTypeString(): string;
        /** @hidden */
        private _timeToLive;
        private fmicelinkdatamessageheaderTimeToLiveElementInit;
        constructor(ttl: number);
        /** @hidden */
        static doParseBytes(buffer: fm.icelink.DataBuffer, index: number, offsetPlus: fm.icelink.Holder<number>): fm.icelink.datamessageheader.Element;
        getBytes(): fm.icelink.DataBuffer;
        getLength(): number;
        getTimeToLive(): number;
        /** @hidden */
        private setTimeToLive;
    }
}
declare namespace fm.icelink.datamessageheader {
    /** @hidden */
    class Type {
        getTypeString(): string;
        constructor();
        static getConnectionId(): number;
        static getDeliveryAttempts(): number;
        static getTimeToLive(): number;
    }
}
declare namespace fm.icelink.datamessageheader {
    /** @hidden */
    class UnknownElement extends fm.icelink.datamessageheader.Element {
        getTypeString(): string;
        /** @hidden */
        private __length;
        /** @hidden */
        private __payload;
        private fmicelinkdatamessageheaderUnknownElementInit;
        constructor(type: number, payload: fm.icelink.DataBuffer);
        /** @hidden */
        static doParseBytes(buffer: fm.icelink.DataBuffer, index: number, offsetPlus: fm.icelink.Holder<number>): fm.icelink.datamessageheader.Element;
        getBytes(): fm.icelink.DataBuffer;
        getLength(): number;
        /** @hidden */
        getPayload(): fm.icelink.DataBuffer;
        /** @hidden */
        setPayload(value: fm.icelink.DataBuffer): void;
    }
}
declare namespace fm.icelink {
    class CcmFirPolicyWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.CcmFirPolicy);
        toString(): string;
    }
}
declare namespace fm.icelink {
    class NackPliPolicyWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.NackPliPolicy);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /** @hidden */
    class SessionDescriptionStreamMatcher<TStream extends fm.icelink.WebRtcStreamBase> {
        getTypeString(): string;
        /** @hidden */
        private __internalAudioStreamIndex;
        /** @hidden */
        private __internalDataStreamIndex;
        /** @hidden */
        private __internalStreamIndexByOfferIndex;
        /** @hidden */
        private __internalVideoStreamIndex;
        /** @hidden */
        private __offererAudioStreamIndex;
        /** @hidden */
        private __offererDataStreamIndex;
        /** @hidden */
        private __offererStreamIndexByInternalIndex;
        /** @hidden */
        private __offererVideoStreamIndex;
        constructor(numStreams: number);
        getInternalStreamIndexFor(oferrerStreamIndex: number): number;
        /** @hidden */
        getInternalStreamMediaIndexForStream(type: fm.icelink.StreamType, indexInType: number): number;
        getOffererStreamIndexFor(internalStreamIndex: number): number;
        /** @hidden */
        getOffererStreamMediaIndexForStream(type: fm.icelink.StreamType, indexInType: number): number;
        /** @hidden */
        populateInternalStreamTypeIndexes(streams: Array<TStream>): fm.icelink.Error;
        /** @hidden */
        populateOffererStreamTypeIndexes(sdpMediaDescriptions: fm.icelink.sdp.MediaDescription[]): fm.icelink.Error;
        reset(): void;
        reset(numStreams: number): void;
        setMatchingIndexes(internalStreamIndex: number, offererStreamIndex: number): void;
    }
}
declare namespace fm.icelink {
    class SimulcastModeWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.SimulcastMode);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    Media track interface.
    */
    interface IMediaTrack {
        addOnDestroyed(value: fm.icelink.IAction0): void;
        addOnStarted(value: fm.icelink.IAction0): void;
        addOnStopped(value: fm.icelink.IAction0): void;
        changeSinkOutput(sinkOutput: fm.icelink.SinkOutput): fm.icelink.Future<Object>;
        changeSourceInput(sourceInput: fm.icelink.SourceInput): fm.icelink.Future<Object>;
        destroy(): boolean;
        getMuted(): boolean;
        getSinkOutput(): fm.icelink.SinkOutput;
        getSinkOutputs(): fm.icelink.Future<fm.icelink.SinkOutput[]>;
        getSourceInput(): fm.icelink.SourceInput;
        getSourceInputs(): fm.icelink.Future<fm.icelink.SourceInput[]>;
        removeOnDestroyed(value: fm.icelink.IAction0): void;
        removeOnStarted(value: fm.icelink.IAction0): void;
        removeOnStopped(value: fm.icelink.IAction0): void;
        setMuted(value: boolean): void;
        setSinkOutput(value: fm.icelink.SinkOutput): void;
        setSourceInput(value: fm.icelink.SourceInput): void;
    }
}
declare namespace fm.icelink {
    /**
    Audio track interface.
    */
    interface IAudioTrack extends fm.icelink.IMediaTrack {
        addOnLevel(value: fm.icelink.IAction1<number>): void;
        getGain(): number;
        getVolume(): number;
        removeOnLevel(value: fm.icelink.IAction1<number>): void;
        setGain(value: number): void;
        setVolume(value: number): void;
    }
}
declare namespace fm.icelink {
    class BundlePolicyWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.BundlePolicy);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    A candidate.
    */
    class Candidate {
        getTypeString(): string;
        /** @hidden */
        private __protocol;
        /** @hidden */
        private __relayProtocol;
        /** @hidden */
        private __sdpCandidateAttribute;
        /** @hidden */
        private _dispatched;
        /** @hidden */
        private _sdpMediaIndex;
        private fmicelinkCandidateInit;
        constructor();
        /**
        Deserializes an instance from JSON.
        @param candidateJson The JSON to deserialize.
        @return
                    The deserialized candidate.
            
        */
        static fromJson(candidateJson: string): fm.icelink.Candidate;
        /**
        Serializes an instance to JSON.
        @param candidate The candidate to serialize.
        @return
                    The serialized JSON.
            
        */
        static toJson(candidate: fm.icelink.Candidate): string;
        /**
        Gets a value indicating whether this candidate has been already been dispatched as a part of a session description.
        */
        getDispatched(): boolean;
        /** @hidden */
        getProtocol(): fm.icelink.ProtocolType;
        /**
        Gets the relay protocol, the protocol used by this candidate to communicate with the relay (TURN) server.
        */
        getRelayProtocol(): fm.icelink.ProtocolType;
        /**
        Gets the SDP candidate attribute.
        */
        getSdpCandidateAttribute(): fm.icelink.sdp.ice.CandidateAttribute;
        /**
        Gets the media index.
        */
        getSdpMediaIndex(): number;
        /**
        Gets the relay protocol, the protocol used by this candidate to communicate with the relay (TURN) server. Obsolete. Alias for [[fm.icelink.candidate.relayProtocol]].
        */
        getTurnTransportProtocol(): fm.icelink.ProtocolType;
        /**
        Sets a value indicating whether this candidate has been already been dispatched as a part of a session description.
        */
        setDispatched(value: boolean): void;
        /** @hidden */
        setProtocol(value: fm.icelink.ProtocolType): void;
        /**
        Sets the relay protocol, the protocol used by this candidate to communicate with the relay (TURN) server.
        */
        setRelayProtocol(value: fm.icelink.ProtocolType): void;
        /**
        Sets the SDP candidate attribute.
        */
        setSdpCandidateAttribute(value: fm.icelink.sdp.ice.CandidateAttribute): void;
        /**
        Sets the media index.
        */
        setSdpMediaIndex(value: number): void;
        /**
        Sets the relay protocol, the protocol used by this candidate to communicate with the relay (TURN) server. Obsolete. Alias for [[fm.icelink.candidate.relayProtocol]].
        */
        setTurnTransportProtocol(value: fm.icelink.ProtocolType): void;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    A color.
    */
    class Color {
        getTypeString(): string;
        /** @hidden */
        private _b;
        /** @hidden */
        private _g;
        /** @hidden */
        private _r;
        private fmicelinkColorInit;
        /**
        Initializes a new instance of the [[fm.icelink.color]] class.
        @param r The red value (0-255).
        @param g The green value (0-255).
        @param b The blue value (0-255).
        */
        constructor(r: number, g: number, b: number);
        /**
        Creates a [[fm.icelink.color]] using hue, saturation, and brightness.
        @param hue The hue value (0-359).
        @param saturation The saturation value (0.0-1.0).
        @param brightness The brightness value (0.0-1.0).
        */
        static fromHsb(hue: number, saturation: number, brightness: number): fm.icelink.Color;
        /**
        Gets a black color.
        */
        static getBlack(): fm.icelink.Color;
        /**
        Gets a blue color.
        */
        static getBlue(): fm.icelink.Color;
        /**
        Gets a cyan color.
        */
        static getCyan(): fm.icelink.Color;
        /**
        Gets a dark-blue color.
        */
        static getDarkBlue(): fm.icelink.Color;
        /**
        Gets a dark-green color.
        */
        static getDarkGreen(): fm.icelink.Color;
        /**
        Gets a dark-red color.
        */
        static getDarkRed(): fm.icelink.Color;
        /**
        Gets a gray color.
        */
        static getGray(): fm.icelink.Color;
        /**
        Gets a green color.
        */
        static getGreen(): fm.icelink.Color;
        /**
        Gets a magenta color.
        */
        static getMagenta(): fm.icelink.Color;
        /**
        Gets an olive color.
        */
        static getOlive(): fm.icelink.Color;
        /**
        Gets a purple color.
        */
        static getPurple(): fm.icelink.Color;
        /**
        Gets a red color.
        */
        static getRed(): fm.icelink.Color;
        /**
        Gets a teal color.
        */
        static getTeal(): fm.icelink.Color;
        /**
        Gets a white color.
        */
        static getWhite(): fm.icelink.Color;
        /**
        Gets a yellow color.
        */
        static getYellow(): fm.icelink.Color;
        /**
        Gets the blue value (0-255).
        */
        getB(): number;
        /**
        Gets the green value (0-255).
        */
        getG(): number;
        /**
        Gets the red value (0-255).
        */
        getR(): number;
        /** @hidden */
        private setB;
        /** @hidden */
        private setG;
        /** @hidden */
        private setR;
    }
}
declare namespace fm.icelink {
    /**
    Connection interface.
    */
    interface IConnection<TConnection, TStream, TAudioStream, TVideoStream, TDataStream> {
        addIceServer(iceServer: fm.icelink.IceServer): void;
        addIceServers(iceServers: fm.icelink.IceServer[]): void;
        addOnExternalIdChange(value: fm.icelink.IAction2<string, string>): void;
        addOnGatheringStateChange(value: fm.icelink.IAction1<TConnection>): void;
        addOnIceConnectionStateChange(value: fm.icelink.IAction1<TConnection>): void;
        addOnLocalCandidate(value: fm.icelink.IAction2<TConnection, fm.icelink.Candidate>): void;
        addOnLocalDescription(value: fm.icelink.IAction2<TConnection, fm.icelink.SessionDescription>): void;
        addOnRemoteCandidate(value: fm.icelink.IAction2<TConnection, fm.icelink.Candidate>): void;
        addOnRemoteDescription(value: fm.icelink.IAction2<TConnection, fm.icelink.SessionDescription>): void;
        addOnSignallingStateChange(value: fm.icelink.IAction1<TConnection>): void;
        addOnStateChange(value: fm.icelink.IAction1<TConnection>): void;
        addRemoteCandidate(remoteCandidate: fm.icelink.Candidate): fm.icelink.Future<fm.icelink.Candidate>;
        close(): boolean;
        createAnswer(): fm.icelink.Future<fm.icelink.SessionDescription>;
        createOffer(): fm.icelink.Future<fm.icelink.SessionDescription>;
        getAudioStream(): TAudioStream;
        getAudioStreams(): TAudioStream[];
        getBundlePolicy(): fm.icelink.BundlePolicy;
        getCanonicalName(): string;
        getDataStream(): TDataStream;
        getDataStreams(): TDataStream[];
        getDeadStreamTimeout(): number;
        getError(): fm.icelink.Error;
        getExternalId(): string;
        getGatheringState(): fm.icelink.IceGatheringState;
        getHasAudio(): boolean;
        getHasData(): boolean;
        getHasVideo(): boolean;
        getIceConnectionState(): fm.icelink.IceConnectionState;
        getIceGatherPolicy(): fm.icelink.IceGatherPolicy;
        getIceServer(): fm.icelink.IceServer;
        getIceServers(): fm.icelink.IceServer[];
        getId(): string;
        getLegacyTimeout(): boolean;
        getLocalDescription(): fm.icelink.SessionDescription;
        getRemoteDescription(): fm.icelink.SessionDescription;
        getSignallingState(): fm.icelink.SignallingState;
        getState(): fm.icelink.ConnectionState;
        getStats(): fm.icelink.Future<fm.icelink.ConnectionStats>;
        getStreams(): TStream[];
        getTieBreaker(): string;
        getTimeout(): number;
        getTrickleIcePolicy(): fm.icelink.TrickleIcePolicy;
        getVideoStream(): TVideoStream;
        getVideoStreams(): TVideoStream[];
        removeIceServer(iceServer: fm.icelink.IceServer): void;
        removeIceServers(iceServers: fm.icelink.IceServer[]): void;
        removeOnExternalIdChange(value: fm.icelink.IAction2<string, string>): void;
        removeOnGatheringStateChange(value: fm.icelink.IAction1<TConnection>): void;
        removeOnIceConnectionStateChange(value: fm.icelink.IAction1<TConnection>): void;
        removeOnLocalCandidate(value: fm.icelink.IAction2<TConnection, fm.icelink.Candidate>): void;
        removeOnLocalDescription(value: fm.icelink.IAction2<TConnection, fm.icelink.SessionDescription>): void;
        removeOnRemoteCandidate(value: fm.icelink.IAction2<TConnection, fm.icelink.Candidate>): void;
        removeOnRemoteDescription(value: fm.icelink.IAction2<TConnection, fm.icelink.SessionDescription>): void;
        removeOnSignallingStateChange(value: fm.icelink.IAction1<TConnection>): void;
        removeOnStateChange(value: fm.icelink.IAction1<TConnection>): void;
        setBundlePolicy(value: fm.icelink.BundlePolicy): void;
        setDeadStreamTimeout(value: number): void;
        setError(value: fm.icelink.Error): void;
        setExternalId(value: string): void;
        setIceGatherPolicy(value: fm.icelink.IceGatherPolicy): void;
        setIceServer(value: fm.icelink.IceServer): void;
        setIceServers(value: fm.icelink.IceServer[]): void;
        setLegacyTimeout(value: boolean): void;
        setLocalDescription(localDescription: fm.icelink.SessionDescription): fm.icelink.Future<fm.icelink.SessionDescription>;
        setRemoteDescription(remoteDescription: fm.icelink.SessionDescription): fm.icelink.Future<fm.icelink.SessionDescription>;
        setTieBreaker(value: string): void;
        setTimeout(value: number): void;
        setTrickleIcePolicy(value: fm.icelink.TrickleIcePolicy): void;
    }
}
declare namespace fm.icelink {
    /**
    A collection of connections.
    */
    class ConnectionCollection extends fm.icelink.Collection<fm.icelink.Connection, fm.icelink.ConnectionCollection> {
        getTypeString(): string;
        /** @hidden */
        private __lookupByExternalId;
        /** @hidden */
        private __lookupByInternalId;
        /** @hidden */
        private __lookupLock;
        constructor();
        /**
        Invoked when an element is added to the collection.
        @param value The value.
        */
        protected addSuccess(value: fm.icelink.Connection): void;
        /**
        Creates an array from a list.
        @param list The list.
        */
        protected arrayFromList(list: Array<fm.icelink.Connection>): fm.icelink.Connection[];
        /**
        Creates a collection.
        */
        protected createCollection(): fm.icelink.ConnectionCollection;
        /**
        Gets a connection by extenral connection ID.
        @param idValue The external connection identifier.
        @return The connection, or `null` if the connection does not exist.
        */
        getByExternalId(idValue: string): fm.icelink.Connection;
        /**
        Gets a connection by internal connection ID.
        @param idValue The internal connection identifier.
        @return The connection, or `null` if the connection does not exist.
        */
        getById(idValue: string): fm.icelink.Connection;
        /** @hidden */
        private processExternalIdChange;
        /**
        Invoked when an element is removed from the collection.
        @param value The value.
        */
        protected removeSuccess(value: fm.icelink.Connection): void;
        /**
        Tries to get a connection by external connection ID.
        @param idValue The internal Connection identifier.
        @param connection The connection.
        @return The connection, or `null` if the connection does not exist.
        */
        tryGetByExternalId(idValue: string, connection: fm.icelink.Holder<fm.icelink.Connection>): boolean;
        /**
        Tries to get a connection by internal connection ID.
        @param idValue The internal Connection identifier.
        @param connection The connection.
        @return The connection, or `null` if the connection does not exist.
        */
        tryGetById(idValue: string, connection: fm.icelink.Holder<fm.icelink.Connection>): boolean;
    }
}
declare namespace fm.icelink {
    /**
    A state machine for data channel states.
    */
    class DataChannelStateMachine extends fm.icelink.StateMachine<fm.icelink.DataChannelState> {
        getTypeString(): string;
        /**
        Initializes a new instance of the [[fm.icelink.dataChannelStateMachine]] class.
        */
        constructor();
        /**
        Converts a state to an integer value.
        @param state The state.
        */
        protected stateToValue(state: fm.icelink.DataChannelState): number;
        /**
        Converts an integer value to a state.
        @param value The integer value.
        */
        protected valueToState(value: number): fm.icelink.DataChannelState;
    }
}
declare namespace fm.icelink {
    /**
    View sink interface.
    */
    interface IViewSink<TView> {
        getView(): TView;
        getViewMirror(): boolean;
        getViewScale(): fm.icelink.LayoutScale;
        setViewMirror(value: boolean): void;
        setViewScale(value: fm.icelink.LayoutScale): void;
    }
}
declare namespace fm.icelink {
    /**
    A state machine for stream states.
    */
    class StreamStateMachine extends fm.icelink.StateMachine<fm.icelink.StreamState> {
        getTypeString(): string;
        /**
        Initializes a new instance of the [[fm.icelink.streamStateMachine]] class.
        */
        constructor();
        /**
        Converts a state to an integer value.
        @param state The state.
        */
        protected stateToValue(state: fm.icelink.StreamState): number;
        /**
        Converts an integer value to a state.
        @param value The integer value.
        */
        protected valueToState(value: number): fm.icelink.StreamState;
    }
}
declare namespace fm.icelink {
    /**
    A state machine for connection states.
    */
    class ConnectionStateMachine extends fm.icelink.StateMachine<fm.icelink.ConnectionState> {
        getTypeString(): string;
        /**
        Initializes a new instance of the [[fm.icelink.connectionStateMachine]] class.
        */
        constructor();
        /**
        Converts a state to an integer value.
        @param state The state.
        */
        protected stateToValue(state: fm.icelink.ConnectionState): number;
        /**
        Converts an integer value to a state.
        @param value The integer value.
        */
        protected valueToState(value: number): fm.icelink.ConnectionState;
    }
}
declare namespace fm.icelink {
    /**
    Data channel interface.
    */
    interface IDataChannel<TDataChannel> {
        addOnStateChange(value: fm.icelink.IAction1<TDataChannel>): void;
        getId(): string;
        getInfo(): fm.icelink.DataChannelInfo;
        getLabel(): string;
        getOnReceive(): fm.icelink.IAction1<fm.icelink.DataChannelReceiveArgs>;
        getOrdered(): boolean;
        getState(): fm.icelink.DataChannelState;
        getSubprotocol(): string;
        removeOnStateChange(value: fm.icelink.IAction1<TDataChannel>): void;
        sendDataBytes(dataBytes: fm.icelink.DataBuffer): fm.icelink.Future<Object>;
        sendDataString(dataString: string): fm.icelink.Future<Object>;
        setOnReceive(value: fm.icelink.IAction1<fm.icelink.DataChannelReceiveArgs>): void;
    }
}
declare namespace fm.icelink {
    /**
    A collection of data channels.
    */
    class DataChannelCollection extends fm.icelink.Collection<fm.icelink.DataChannel, fm.icelink.DataChannelCollection> {
        getTypeString(): string;
        constructor();
        /**
        Creates an array from a list.
        @param list The list.
        */
        protected arrayFromList(list: Array<fm.icelink.DataChannel>): fm.icelink.DataChannel[];
        /**
        Creates a collection.
        */
        protected createCollection(): fm.icelink.DataChannelCollection;
    }
}
declare namespace fm.icelink {
    /**
    Arguments for the data channel receive event.
    */
    class DataChannelReceiveArgs {
        getTypeString(): string;
        /** @hidden */
        private __remoteConnectionInfo;
        /** @hidden */
        private _dataBytes;
        /** @hidden */
        private _dataString;
        constructor();
        /**
        Gets the data buffer.
        */
        getDataBytes(): fm.icelink.DataBuffer;
        /**
        Gets the data string.
        */
        getDataString(): string;
        /**
        Sets the data buffer.
        */
        setDataBytes(value: fm.icelink.DataBuffer): void;
        /**
        Sets the data string.
        */
        setDataString(value: string): void;
        /** @hidden */
        setRemoteConnectionInfo(remoteConnectionInfo: Object): void;
    }
}
declare namespace fm.icelink {
    /**
    Data stream interface.
    */
    interface IDataStream<TDataChannel> extends fm.icelink.IStream {
        getChannels(): TDataChannel[];
        getInfo(): fm.icelink.DataStreamInfo;
    }
}
declare namespace fm.icelink {
    class EncryptionPolicyWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.EncryptionPolicy);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    A video format.
    */
    class VideoFormat extends fm.icelink.MediaFormat<fm.icelink.VideoFormat> {
        getTypeString(): string;
        /** @hidden */
        private static fm_icelink_VideoFormat__fourCCLookup;
        /** @hidden */
        private static fm_icelink_VideoFormat__reverseFourCCLookup;
        /**
        Initializes a new instance of the [[fm.icelink.videoFormat]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.videoFormat]] class.
        @param name The name.
        */
        constructor(name: string);
        /**
        Initializes a new instance of the [[fm.icelink.videoFormat]] class.
        @param name The name.
        @param clockRate The clock rate.
        */
        constructor(name: string, clockRate: number);
        /**
        Initializes a new instance of the [[fm.icelink.videoFormat]] class.
        @param name The name.
        @param clockRate The clock rate.
        @param packetizationMode The packetization mode.
        */
        constructor(name: string, clockRate: number, packetizationMode: string);
        /**
        Initializes a new instance of the [[fm.icelink.videoFormat]] class.
        @param name The name.
        @param clockRate The clock rate.
        @param profile The media format profile.
        @param level The media format level.
        */
        constructor(name: string, clockRate: number, profile: string, level: string);
        /**
        Initializes a new instance of the [[fm.icelink.videoFormat]] class.
        @param name The name.
        @param clockRate The clock rate.
        @param packetizationMode The packetization mode.
        @param level The media format level.
        @param profile The media format profile.
        */
        constructor(name: string, clockRate: number, profile: string, level: string, packetizationMode: string);
        /**
        Converts a format name to its FourCC value.
        @param formatName The format name.
        @return The FourCC value, or 0 if the format name is not recognized.
        */
        static formatNameToFourCC(formatName: string): number;
        /**
        Deserializes an instance from JSON.
        @param videoFormatJson The video format JSON.
        */
        static fromJson(videoFormatJson: string): fm.icelink.VideoFormat;
        /**
        Gets an ABGR video format.
        */
        static getAbgr(): fm.icelink.VideoFormat;
        /**
        Gets the name of the ABGR video format ("ABGR"). Indicates that each pixel occupies 32 bits (8 bits for alpha, then 8 bits for blue, then8 bits for green, then 8 bits for red).
        */
        static getAbgrName(): string;
        /**
        Gets an ARGB video format.
        */
        static getArgb(): fm.icelink.VideoFormat;
        /**
        Gets the name of the ARGB video format ("ARGB"). Indicates that each pixel occupies 32 bits (8 bits for alpha, then 8 bits for red, then 8 bits for green, then 8 bits for blue).
        */
        static getArgbName(): string;
        /**
        Gets a BGR video format.
        */
        static getBgr(): fm.icelink.VideoFormat;
        /**
        Gets an BGRA video format.
        */
        static getBgra(): fm.icelink.VideoFormat;
        /**
        Gets the name of the BGRA video format ("BGRA"). Indicates that each pixel occupies 32 bits (8 bits for blue, then8 bits for green, then 8 bits for red, then 8 bits for alpha).
        */
        static getBgraName(): string;
        /**
        Gets the name of the BGR video format ("BGR"). Indicates that each pixel occupies 24 bits (8 bits for blue, then8 bits for green, then 8 bits for red).
        */
        static getBgrName(): string;
        /**
        Gets the default clock rate.
        */
        static getDefaultClockRate(): number;
        /**
        Gets an H.264 video format.
        */
        static getH264(): fm.icelink.VideoFormat;
        /**
        Gets the name of the H.264 video format ("H264").
        */
        static getH264Name(): string;
        /**
        Gets an I420 video format.
        */
        static getI420(): fm.icelink.VideoFormat;
        /**
        Gets the name of the I420 video format ("I420"). Indicates that each pixel occupies 12 bits (8 bits for Y, 2 bits for U, and 2 bits for V). Y plane is followed by U plane and then V plane.
        */
        static getI420Name(): string;
        /**
        Gets an NV12 video format.
        */
        static getNv12(): fm.icelink.VideoFormat;
        /**
        Gets the name of the NV12 video format ("NV12"). Indicates that each pixel occupies 12 bits (8 bits for Y, 2 bits for U, and 2 bits for V). Y plane is followed by interleaved U/V plane.
        */
        static getNv12Name(): string;
        /**
        Gets an NV21 video format.
        */
        static getNv21(): fm.icelink.VideoFormat;
        /**
        Gets the name of the NV21 video format ("NV21"). Indicates that each pixel occupies 12 bits (8 bits for Y, 2 bits for U, and 2 bits for V). Y plane is followed by interleaved V/U plane.
        */
        static getNv21Name(): string;
        /**
        Gets an RGB video format.
        */
        static getRgb(): fm.icelink.VideoFormat;
        /**
        Gets an RGBA video format.
        */
        static getRgba(): fm.icelink.VideoFormat;
        /**
        Gets the name of the RGBA video format ("RGBA"). Indicates that each pixel occupies 32 bits (8 bits for red, then 8 bits for green, then 8 bits for blue, then 8 bits for alpha).
        */
        static getRgbaName(): string;
        /**
        Gets the name of the RGB video format ("RGB"). Indicates that each pixel occupies 24 bits (8 bits for red, then 8 bits for green, then 8 bits for blue).
        */
        static getRgbName(): string;
        /**
        Gets a VP8 video format.
        */
        static getVp8(): fm.icelink.VideoFormat;
        /**
        Gets the name of the VP8 video format ("VP8").
        */
        static getVp8Name(): string;
        /**
        Gets a VP9 video format.
        */
        static getVp9(): fm.icelink.VideoFormat;
        /**
        Gets the name of the VP9 video format ("VP9").
        */
        static getVp9Name(): string;
        /**
        Gets a YV12 video format.
        */
        static getYv12(): fm.icelink.VideoFormat;
        /**
        Gets the name of the YV12 video format ("YV12"). Indicates that each pixel occupies 12 bits (8 bits for Y, 2 bits for U, and 2 bits for V). Y plane is followed by V plane and then U plane.
        */
        static getYv12Name(): string;
        /**
        Converts 4 FourCC characters to an int.
        */
        static toFourCC(a: number, b: number, c: number, d: number): number;
        /**
        Converts a FourCC string to a int.
        @param fourcc The fourcc.
        */
        static toFourCC(fourcc: string): number;
        /**
        Serializes an instance to JSON.
        @param videoFormat The video format.
        */
        static toJson(videoFormat: fm.icelink.VideoFormat): string;
        /**
        Clones this instance.
        */
        clone(): fm.icelink.VideoFormat;
        /**
        Creates a new instance.
        */
        protected createInstance(): fm.icelink.VideoFormat;
        /**
        Converts a FourCC value to its format name.
        @param fourcc The FourCC value.
        @return The format name, or an empty string if the FourCC value is not recognized.
        */
        fourCCToFormatName(fourcc: number): string;
        /**
        Gets the FourCC value for this format.
        */
        getFourCC(): number;
        /**
        Gets this format as an info object.
        */
        getInfo(): fm.icelink.FormatInfo;
        /**
        Gets a value indicating whether this format is ABGR.
        */
        getIsAbgr(): boolean;
        /**
        Gets a value indicating whether this format is ARGB.
        */
        getIsArgb(): boolean;
        /**
        Gets a value indicating whether this format is BGR.
        */
        getIsBgr(): boolean;
        /**
        Gets a value indicating whether this format is BGRA.
        */
        getIsBgra(): boolean;
        /**
        Gets whether this is a compressed format.
        */
        getIsCompressed(): boolean;
        /**
        Gets a value indicating whether this format is H.264.
        */
        getIsH264(): boolean;
        /**
        Gets a value indicating whether this format is I420.
        */
        getIsI420(): boolean;
        /**
        Gets a value indicating whether this format is NV12.
        */
        getIsNv12(): boolean;
        /**
        Gets a value indicating whether this format is NV21.
        */
        getIsNv21(): boolean;
        /**
        Gets a value indicating whether this format is RGB, BGR, I420, YV12, NV12, NV21, RGBA, BGRA, ARGB, or ABGR.
        */
        getIsRaw(): boolean;
        /**
        Gets a value indicating whether this format is RGB.
        */
        getIsRgb(): boolean;
        /**
        Gets a value indicating whether this format is RGBA.
        */
        getIsRgba(): boolean;
        /**
        Gets a value indicating whether this format is RGBA, BGRA, ARGB, or ABGR.
        */
        getIsRgbaType(): boolean;
        /**
        Gets a value indicating whether this format is RGB or BGR.
        */
        getIsRgbType(): boolean;
        /**
        Gets a value indicating whether this format is VP8.
        */
        getIsVp8(): boolean;
        /**
        Gets a value indicating whether this format is VP9.
        */
        getIsVp9(): boolean;
        /**
        Gets a value indicating whether this format is I420, YV12, NV12, or NV21.
        */
        getIsYuvType(): boolean;
        /**
        Gets a value indicating whether this format is YV12.
        */
        getIsYv12(): boolean;
        /**
        Gets the maximum level.
        @param level1 The first level.
        @param level2 The second level.
        @return The maximum level.
        */
        protected getMaxLevel(level1: string, level2: string): string;
        /**
        Gets the minimum level.
        @param level1 The first level.
        @param level2 The second level.
        @return The minimum level.
        */
        protected getMinLevel(level1: string, level2: string): string;
        /**
        Gets the parameters.
        */
        getParameters(): string;
        /**
        Gets whether a level is compatible.
        @param level The level.
        */
        protected isLevelCompatible(level: string): boolean;
        /**
        Gets whether a profile is compatible.
        @param profile The profile.
        */
        protected isProfileCompatible(profile: string): boolean;
        /**
        Sets the FourCC value for this format.
        */
        setFourCC(value: number): void;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
        /**
        Updates the profile to a compatible value.
        @param format The format.
        */
        protected updateProfileToCompatible(format: fm.icelink.VideoFormat): void;
        /** @hidden */
        private static __fmicelinkVideoFormatInitialized;
        /** @hidden */
        static fmicelinkVideoFormatInitialize(): void;
    }
}
declare namespace fm.icelink.h264 {
    /**
    An H.264 format.
    */
    class Format extends fm.icelink.VideoFormat {
        getTypeString(): string;
        /**
        Initializes a new instance of the [[fm.icelink.h264.format]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.h264.format]] class.
        @param clockRate The clock rate.
        */
        constructor(clockRate: number);
        /**
        Initializes a new instance of the [[fm.icelink.h264.format]] class.
        @param clockRate The clock rate.
        @param packetizationMode The packetization mode.
        */
        constructor(clockRate: number, packetizationMode: number);
        /**
        Initializes a new instance of the [[fm.icelink.h264.format]] class.
        @param clockRate The clock rate.
        @param profile The profile.
        @param level The level.
        @param packetizationMode The packetization mode.
        */
        constructor(clockRate: number, profile: string, level: string, packetizationMode: number);
        /**
        Initializes a new instance of the [[fm.icelink.h264.format]] class.
        @param clockRate The clock rate.
        @param profileLevelId The profile level ID.
        @param packetizationMode The packetization mode.
        */
        constructor(clockRate: number, profileLevelId: fm.icelink.h264.ProfileLevelId, packetizationMode: number);
        /**
        Initializes a new instance of the [[fm.icelink.h264.format]] class.
        @param profile The profile.
        @param level The level.
        @param packetizationMode The packetization mode.
        */
        constructor(profile: string, level: string, packetizationMode: number);
        /**
        Initializes a new instance of the [[fm.icelink.h264.format]] class.
        @param profileLevelId The profile level ID.
        */
        constructor(profileLevelId: fm.icelink.h264.ProfileLevelId);
        /**
        Initializes a new instance of the [[fm.icelink.h264.format]] class.
        @param profileLevelId The profile level ID.
        @param packetizationMode The packetization mode.
        */
        constructor(profileLevelId: fm.icelink.h264.ProfileLevelId, packetizationMode: number);
    }
}
declare namespace fm.icelink.h264 {
    /**
    An H.264 Profile IOP.
    */
    class ProfileIop {
        getTypeString(): string;
        /** @hidden */
        private _dataBuffer;
        /**
        Initializes a new instance of the [[fm.icelink.h264.profileIop]] class.
        @param profileIop The profile IOP.
        */
        constructor(profileIop: number);
        /**
        Gets a value indicating whether constraint 0 is set.
        */
        getConstraintSet0(): boolean;
        /**
        Gets a value indicating whether constraint 1 is set.
        */
        getConstraintSet1(): boolean;
        /**
        Gets a value indicating whether constraint 2 is set.
        */
        getConstraintSet2(): boolean;
        /**
        Gets the backing data buffer.
        */
        getDataBuffer(): fm.icelink.DataBuffer;
        /**
        Sets a value indicating whether constraint 0 is set.
        */
        setConstraintSet0(value: boolean): void;
        /**
        Sets a value indicating whether constraint 1 is set.
        */
        setConstraintSet1(value: boolean): void;
        /**
        Sets a value indicating whether constraint 2 is set.
        */
        setConstraintSet2(value: boolean): void;
        /** @hidden */
        private setDataBuffer;
    }
}
declare namespace fm.icelink.h264 {
    /**
    An H.264 Profile Level ID.
    */
    class ProfileLevelId {
        getTypeString(): string;
        /** @hidden */
        private _levelIdc;
        /** @hidden */
        private _profileIdc;
        /** @hidden */
        private _profileIop;
        private fmicelinkh264ProfileLevelIdInit;
        /**
        Initializes a new instance of the [[fm.icelink.h264.profileLevelId]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.h264.profileLevelId]] class.
        @param profile The profile.
        @param level The level.
        */
        constructor(profile: string, level: string);
        /**
        Initializes a new instance of the [[fm.icelink.h264.profileLevelId]] class.
        @param profileIdc The profile ID code.
        @param profileIop The profile constraints.
        @param levelIdc The level ID code.
        */
        constructor(profileIdc: number, profileIop: number, levelIdc: number);
        /**
        Initializes a new instance of the [[fm.icelink.h264.profileLevelId]] class.
        @param profileLevelId The profile level identifier.
        */
        constructor(profileLevelId: string);
        /**
        Gets baseline profile level 1.0.
        */
        static getBaselineLevel10(): fm.icelink.h264.ProfileLevelId;
        /**
        Gets baseline profile level 3.1.
        */
        static getBaselineLevel31(): fm.icelink.h264.ProfileLevelId;
        /**
        Gets constrained baseline profile level 1.0.
        */
        static getConstrainedBaselineLevel10(): fm.icelink.h264.ProfileLevelId;
        /**
        Gets constrained baseline profile level 3.1.
        */
        static getConstrainedBaselineLevel31(): fm.icelink.h264.ProfileLevelId;
        /**
        Gets [[fm.icelink.h264.profileLevelId.constrainedBaselineLevel31]].
        */
        static getDefault(): fm.icelink.h264.ProfileLevelId;
        /**
        Gets high profile level 5.0.
        */
        static getHighLevel50(): fm.icelink.h264.ProfileLevelId;
        /**
        Gets main profile level 5.0.
        */
        static getMainLevel50(): fm.icelink.h264.ProfileLevelId;
        /**
        Gets the level.
        */
        getLevel(): string;
        /**
        Gets the level ID code.
        */
        getLevelIdc(): number;
        /**
        Gets the max encoding info value for the given level.
        @return EncodingInfo relating to the h264 profile level
        */
        getMaxEncoding(): fm.icelink.EncodingInfo;
        /**
        Gets the profile.
        */
        getProfile(): string;
        /**
        Gets the profile ID Code.
        */
        getProfileIdc(): number;
        /**
        Gets the profile constraints.
        */
        getProfileIop(): fm.icelink.h264.ProfileIop;
        /**
        Sets the level ID code.
        */
        setLevelIdc(value: number): void;
        /**
        Sets the profile ID Code.
        */
        setProfileIdc(value: number): void;
        /**
        Sets the profile constraints.
        */
        setProfileIop(value: fm.icelink.h264.ProfileIop): void;
        /**
        Returns a string that represents this instance.
        */
        toString(): string;
    }
}
declare namespace fm.icelink {
    class IceConnectionStateWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.IceConnectionState);
        toString(): string;
    }
}
declare namespace fm.icelink {
    class IceGatheringStateWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.IceGatheringState);
        toString(): string;
    }
}
declare namespace fm.icelink {
    class IceGatherPolicyWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.IceGatherPolicy);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    An ICE server.
    */
    class IceServer {
        getTypeString(): string;
        /** @hidden */
        private __ipAddress;
        /** @hidden */
        private __ipAddresses;
        /** @hidden */
        private _password;
        /** @hidden */
        private _url;
        /** @hidden */
        private _username;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.iceServer]] class.
        @param url The URL.
        */
        constructor(url: string);
        /**
        Initializes a new instance of the [[fm.icelink.iceServer]] class.
        @param url The URL.
        @param username The username.
        @param password The password.
        */
        constructor(url: string, username: string, password: string);
        /**
        Deserializes an instance from JSON.
        @param iceServerJson The JSON to deserialize.
        @return The deserialized ICE server.
        */
        static fromJson(iceServerJson: string): fm.icelink.IceServer;
        /**
        Deserializes an array of instances from JSON.
        @param iceServersJson The JSON to deserialize.
        @return The deserialized ICE server array.
        */
        static fromJsonArray(iceServersJson: string): fm.icelink.IceServer[];
        /**
        Gets the default non-secure port (in use for STUN and TURN).
        */
        static getDefaultPort(): number;
        /**
        Gets the default STUN port.
        */
        static getDefaultStunPort(): number;
        /**
        Gets the default STUNS port.
        */
        static getDefaultStunsPort(): number;
        /**
        Gets the default TURN port.
        */
        static getDefaultTurnPort(): number;
        /**
        Gets the default TURNS port.
        */
        static getDefaultTurnsPort(): number;
        /** @hidden */
        private static parseAddress;
        /** @hidden */
        private static parsePort;
        /**
        Serializes an instance to JSON.
        @param iceServer The ICE server.
        @return
                    The serialized JSON.
            
        */
        static toJson(iceServer: fm.icelink.IceServer): string;
        /**
        Serializes an array of instances to JSON.
        @param iceServers The ICE servers.
        @return
                    The serialized JSON.
            
        */
        static toJsonArray(iceServers: fm.icelink.IceServer[]): string;
        /**
        Gets the host.
        */
        getHost(): string;
        /** @hidden */
        getIPAddress(): string;
        /** @hidden */
        getIPAddresses(): string[];
        /**
        Gets a value indicating whether this represents a secure STUN or TURN server.
        */
        getIsSecure(): boolean;
        /**
        Gets a value indicating whether this represents a STUN server.
        */
        getIsStun(): boolean;
        /**
        Gets a value indicating whether this represents a TCP server.
        */
        getIsTcp(): boolean;
        /**
        Gets a value indicating whether this represents a TURN server.
        */
        getIsTurn(): boolean;
        /**
        Gets a value indicating whether this represents a UDP server.
        */
        getIsUdp(): boolean;
        /**
        Gets the password.
        */
        getPassword(): string;
        /**
        Gets the port.
        */
        getPort(): number;
        /**
        Gets the URL.
        */
        getUrl(): string;
        /**
        Gets the username.
        */
        getUsername(): string;
        /** @hidden */
        setIPAddress(value: string): void;
        /** @hidden */
        setIPAddresses(value: string[]): void;
        /** @hidden */
        private setPassword;
        /** @hidden */
        private setUrl;
        /** @hidden */
        private setUsername;
        /**
        Serializes this instance to JSON.
        @return
                    The serialized JSON.
            
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    An ICE server collection.
    */
    class IceServerCollection extends fm.icelink.Collection<fm.icelink.IceServer, fm.icelink.IceServerCollection> {
        getTypeString(): string;
        constructor();
        /**
        Creates an array from a list.
        @param list The list.
        */
        protected arrayFromList(list: Array<fm.icelink.IceServer>): fm.icelink.IceServer[];
        /**
        Creates a collection.
        */
        protected createCollection(): fm.icelink.IceServerCollection;
    }
}
declare namespace fm.icelink {
    /**
    Media interface.
    */
    interface IMedia<TIAudioTrack extends fm.icelink.IAudioTrack, TIVideoTrack extends fm.icelink.IVideoTrack> {
        addOnAudioDestroyed(value: fm.icelink.IAction0): void;
        addOnAudioLevel(value: fm.icelink.IAction1<number>): void;
        addOnVideoDestroyed(value: fm.icelink.IAction0): void;
        addOnVideoSize(value: fm.icelink.IAction1<fm.icelink.Size>): void;
        destroy(): void;
        getAudioGain(): number;
        getAudioMuted(): boolean;
        getAudioTrack(): TIAudioTrack;
        getAudioTracks(): TIAudioTrack[];
        getAudioVolume(): number;
        getId(): string;
        getVideoMuted(): boolean;
        getVideoSize(): fm.icelink.Size;
        getVideoTrack(): TIVideoTrack;
        getVideoTracks(): TIVideoTrack[];
        grabVideoFrame(): fm.icelink.Future<fm.icelink.VideoBuffer>;
        removeOnAudioDestroyed(value: fm.icelink.IAction0): void;
        removeOnAudioLevel(value: fm.icelink.IAction1<number>): void;
        removeOnVideoDestroyed(value: fm.icelink.IAction0): void;
        removeOnVideoSize(value: fm.icelink.IAction1<fm.icelink.Size>): void;
        setAudioGain(value: number): void;
        setAudioMuted(value: boolean): void;
        setAudioVolume(value: number): void;
        setId(value: string): void;
        setVideoMuted(value: boolean): void;
    }
}
declare namespace fm.icelink {
    /**
    Local media interface.
    */
    interface ILocalMedia<TLocalMedia, TIAudioTrack extends fm.icelink.IAudioTrack, TIVideoTrack extends fm.icelink.IVideoTrack> extends fm.icelink.IMedia<TIAudioTrack, TIVideoTrack> {
        addOnAudioStarted(value: fm.icelink.IAction0): void;
        addOnAudioStopped(value: fm.icelink.IAction0): void;
        addOnVideoStarted(value: fm.icelink.IAction0): void;
        addOnVideoStopped(value: fm.icelink.IAction0): void;
        changeAudioSourceInput(audioSourceInput: fm.icelink.SourceInput): fm.icelink.Future<Object>;
        changeVideoSourceInput(videoSourceInput: fm.icelink.SourceInput): fm.icelink.Future<Object>;
        getAudioEncoding(): fm.icelink.AudioEncodingConfig;
        getAudioEncodings(): fm.icelink.AudioEncodingConfig[];
        getAudioSourceInput(): fm.icelink.SourceInput;
        getAudioSourceInputs(): fm.icelink.Future<fm.icelink.SourceInput[]>;
        getState(): fm.icelink.LocalMediaState;
        getVideoEncoding(): fm.icelink.VideoEncodingConfig;
        getVideoEncodings(): fm.icelink.VideoEncodingConfig[];
        getVideoSourceInput(): fm.icelink.SourceInput;
        getVideoSourceInputs(): fm.icelink.Future<fm.icelink.SourceInput[]>;
        removeOnAudioStarted(value: fm.icelink.IAction0): void;
        removeOnAudioStopped(value: fm.icelink.IAction0): void;
        removeOnVideoStarted(value: fm.icelink.IAction0): void;
        removeOnVideoStopped(value: fm.icelink.IAction0): void;
        setAudioEncodings(value: fm.icelink.AudioEncodingConfig[]): void;
        setAudioSourceInput(value: fm.icelink.SourceInput): void;
        setVideoEncodings(value: fm.icelink.VideoEncodingConfig[]): void;
        setVideoSourceInput(value: fm.icelink.SourceInput): void;
        start(): fm.icelink.Future<TLocalMedia>;
        stop(): fm.icelink.Future<TLocalMedia>;
    }
}
declare namespace fm.icelink {
    /**
    Viewable media interface.
    */
    interface IViewableMedia<TView> {
        getId(): string;
        getView(): TView;
    }
}
declare namespace fm.icelink {
    /**
    Viewable media interface with a view sink.
    */
    interface IViewSinkableMedia<TView, TViewSink extends fm.icelink.IViewSink<TView>> extends fm.icelink.IViewableMedia<TView> {
        getViewSink(): TViewSink;
    }
}
declare namespace fm.icelink {
    /**
    Remote media interface.
    */
    interface IRemoteMedia<TIAudioTrack extends fm.icelink.IAudioTrack, TIVideoTrack extends fm.icelink.IVideoTrack> extends fm.icelink.IMedia<TIAudioTrack, TIVideoTrack> {
        changeAudioSinkOutput(audioSinkOutput: fm.icelink.SinkOutput): fm.icelink.Future<Object>;
        changeVideoSinkOutput(videoSinkOutput: fm.icelink.SinkOutput): fm.icelink.Future<Object>;
        getAudioSinkOutput(): fm.icelink.SinkOutput;
        getAudioSinkOutputs(): fm.icelink.Future<fm.icelink.SinkOutput[]>;
        getVideoSinkOutput(): fm.icelink.SinkOutput;
        getVideoSinkOutputs(): fm.icelink.Future<fm.icelink.SinkOutput[]>;
        setAudioSinkOutput(value: fm.icelink.SinkOutput): void;
        setVideoSinkOutput(value: fm.icelink.SinkOutput): void;
    }
}
declare namespace fm.icelink {
    /**
    Video stream interface.
    */
    interface IVideoStream extends fm.icelink.IMediaStream, fm.icelink.IStream {
        getH264Disabled(): boolean;
        getVp8Disabled(): boolean;
        getVp9Disabled(): boolean;
        setH264Disabled(value: boolean): void;
        setVp8Disabled(value: boolean): void;
        setVp9Disabled(value: boolean): void;
    }
}
declare namespace fm.icelink {
    /**
    Video track interface.
    */
    interface IVideoTrack extends fm.icelink.IMediaTrack {
        addOnSize(value: fm.icelink.IAction1<fm.icelink.Size>): void;
        getSize(): fm.icelink.Size;
        grabFrame(): fm.icelink.Future<fm.icelink.VideoBuffer>;
        removeOnSize(value: fm.icelink.IAction1<fm.icelink.Size>): void;
    }
}
declare namespace fm.icelink {
    /**
    A layout definition, including local and remote frame definitions.
    */
    class Layout {
        getTypeString(): string;
        /** @hidden */
        private __localFrame;
        /** @hidden */
        private __remoteFrames;
        /** @hidden */
        private _height;
        /** @hidden */
        private _origin;
        /** @hidden */
        private _width;
        private fmicelinkLayoutInit;
        constructor();
        /**
        Gets all frames (local and remote).
        */
        getAllFrames(): fm.icelink.LayoutFrame[];
        /**
        Gets the layout height.
        */
        getHeight(): number;
        /**
        Gets the local frame.
        */
        getLocalFrame(): fm.icelink.LayoutFrame;
        /**
        Gets the layout origin.
        */
        getOrigin(): fm.icelink.LayoutOrigin;
        /**
        Gets the remote frames.
        */
        getRemoteFrames(): fm.icelink.LayoutFrame[];
        /**
        Gets the layout width.
        */
        getWidth(): number;
        /**
        Sets the layout height.
        */
        setHeight(value: number): void;
        /**
        Sets the local frame.
        */
        setLocalFrame(value: fm.icelink.LayoutFrame): void;
        /**
        Sets the layout origin.
        */
        setOrigin(value: fm.icelink.LayoutOrigin): void;
        /**
        Sets the remote frames.
        */
        setRemoteFrames(value: fm.icelink.LayoutFrame[]): void;
        /**
        Sets the layout width.
        */
        setWidth(value: number): void;
        /**
        Swaps the properties of two frames.
        @param frame1 The first frame.
        @param frame2 The second frame.
        */
        swapFrames(frame1: fm.icelink.LayoutFrame, frame2: fm.icelink.LayoutFrame): void;
        /**
        Swaps the local frame with a remote frame.
        @param remoteFrameIndex The index of the remote frame.
        */
        swapLocalFrame(remoteFrameIndex: number): void;
        /**
        Swaps two remote frames.
        @param remoteFrameIndex1 The index of the first remote frame.
        @param remoteFrameIndex2 The index of the second remote frame.
        */
        swapRemoteFrames(remoteFrameIndex1: number, remoteFrameIndex2: number): void;
    }
}
declare namespace fm.icelink {
    class LayoutAlignmentWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.LayoutAlignment);
        toString(): string;
    }
}
declare namespace fm.icelink {
    class LayoutDirectionWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.LayoutDirection);
        toString(): string;
    }
}
declare namespace fm.icelink {
    class LayoutModeWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.LayoutMode);
        toString(): string;
    }
}
declare namespace fm.icelink {
    class LayoutOriginWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.LayoutOrigin);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    Defines the results of a layout calculation.
    */
    class LayoutTable {
        getTypeString(): string;
        /** @hidden */
        private _cellHeight;
        /** @hidden */
        private _cellWidth;
        /** @hidden */
        private _columnCount;
        /** @hidden */
        private _rowCount;
        private fmicelinkLayoutTableInit;
        /**
        Initializes a new instance of the [[fm.icelink.layoutTable]] class.
        @param columnCount The column count.
        @param rowCount The row count.
        @param cellWidth The width of each cell.
        @param cellHeight The height of each cell.
        */
        constructor(columnCount: number, rowCount: number, cellWidth: number, cellHeight: number);
        /**
        Gets the height of each cell.
        */
        getCellHeight(): number;
        /**
        Gets the width of each cell.
        */
        getCellWidth(): number;
        /**
        Gets the column count.
        */
        getColumnCount(): number;
        /**
        Gets the row count.
        */
        getRowCount(): number;
        /**
        Sets the height of each cell.
        */
        setCellHeight(value: number): void;
        /**
        Sets the width of each cell.
        */
        setCellWidth(value: number): void;
        /**
        Sets the column count.
        */
        setColumnCount(value: number): void;
        /**
        Sets the row count.
        */
        setRowCount(value: number): void;
    }
}
declare namespace fm.icelink {
    class LocalMediaStateWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.LocalMediaState);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    A video buffer.
    */
    class VideoBuffer extends fm.icelink.MediaBuffer<fm.icelink.VideoFormat, fm.icelink.VideoBuffer> {
        getTypeString(): string;
        /** @hidden */
        private __height;
        /** @hidden */
        private __isMuted;
        /** @hidden */
        private __orientation;
        /** @hidden */
        private __width;
        /** @hidden */
        private _strides;
        private fmicelinkVideoBufferInit;
        /**
        Initializes a new instance of the [[fm.icelink.videoBuffer]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.videoBuffer]] class.
        @param width The width.
        @param height The height.
        @param dataBuffer The data buffer.
        @param format The format.
        */
        constructor(width: number, height: number, dataBuffer: fm.icelink.DataBuffer, format: fm.icelink.VideoFormat);
        /**
        Initializes a new instance of the [[fm.icelink.videoBuffer]] class.
        @param width The width.
        @param height The height.
        @param dataBuffers The data buffers.
        @param format The format.
        */
        constructor(width: number, height: number, dataBuffers: fm.icelink.DataBuffer[], format: fm.icelink.VideoFormat);
        /**
        Initializes a new instance of the [[fm.icelink.videoBuffer]] class.
        @param width The width.
        @param height The height.
        @param stride The stride.
        @param dataBuffer The data buffer.
        @param format The format.
        */
        constructor(width: number, height: number, stride: number, dataBuffer: fm.icelink.DataBuffer, format: fm.icelink.VideoFormat);
        /**
        Initializes a new instance of the [[fm.icelink.videoBuffer]] class.
        @param width The width.
        @param height The height.
        @param strides The strides.
        @param dataBuffers The data buffers.
        @param format The format.
        */
        constructor(width: number, height: number, strides: number[], dataBuffers: fm.icelink.DataBuffer[], format: fm.icelink.VideoFormat);
        /** @hidden */
        private static calculateByteCount;
        /** @hidden */
        private static canPackWithoutCopy;
        /** @hidden */
        private static clamp;
        /**
        Creates a black (0, 0, 0) video buffer with the specified width/height.
        @param width The width.
        @param height The height.
        @param formatName Name of the format.
        */
        static createBlack(width: number, height: number, formatName: string): fm.icelink.VideoBuffer;
        /**
        Creates a blue (0, 0, 255) video buffer with the specified width/height.
        @param width The width.
        @param height The height.
        @param formatName Name of the format.
        */
        static createBlue(width: number, height: number, formatName: string): fm.icelink.VideoBuffer;
        /**
        Creates a custom video buffer with the specified width/height and red/green/blue values for the specified format name. If the format is not supported, returns null.
        @param width The width.
        @param height The height.
        @param red The red value.
        @param green The green value.
        @param blue The blue value.
        @param formatName Name of the format.
        */
        static createCustom(width: number, height: number, red: number, green: number, blue: number, formatName: string): fm.icelink.VideoBuffer;
        /**
        Creates a custom video buffer with the specified width/height and red/green/blue values for the specified format name. If the format is not supported, returns null.
        @param width The width.
        @param height The height.
        @param red The red value.
        @param green The green value.
        @param blue The blue value.
        @param formatName Name of the format.
        @param buffer The output data buffer.
        */
        static createCustom(width: number, height: number, red: number, green: number, blue: number, formatName: string, buffer: fm.icelink.DataBuffer): fm.icelink.VideoBuffer;
        /**
        Creates a cyan (0, 255, 255) video buffer with the specified width/height.
        @param width The width.
        @param height The height.
        @param formatName Name of the format.
        */
        static createCyan(width: number, height: number, formatName: string): fm.icelink.VideoBuffer;
        /**
        Creates a dark blue (0, 0, 128) video buffer with the specified width/height.
        @param width The width.
        @param height The height.
        @param formatName Name of the format.
        */
        static createDarkBlue(width: number, height: number, formatName: string): fm.icelink.VideoBuffer;
        /**
        Creates a dark green (0, 128, 0) video buffer with the specified width/height.
        @param width The width.
        @param height The height.
        @param formatName Name of the format.
        */
        static createDarkGreen(width: number, height: number, formatName: string): fm.icelink.VideoBuffer;
        /**
        Creates a dark red (128, 0, 0) video buffer with the specified width/height.
        @param width The width.
        @param height The height.
        @param formatName Name of the format.
        */
        static createDarkRed(width: number, height: number, formatName: string): fm.icelink.VideoBuffer;
        /**
        Creates a gray (255, 255, 255) video buffer with the specified width/height.
        @param width The width.
        @param height The height.
        @param formatName Name of the format.
        */
        static createGray(width: number, height: number, formatName: string): fm.icelink.VideoBuffer;
        /**
        Creates a green (0, 255, 0) video buffer with the specified width/height.
        @param width The width.
        @param height The height.
        @param formatName Name of the format.
        */
        static createGreen(width: number, height: number, formatName: string): fm.icelink.VideoBuffer;
        /**
        Creates a magenta (255, 0, 255) video buffer with the specified width/height.
        @param width The width.
        @param height The height.
        @param formatName Name of the format.
        */
        static createMagenta(width: number, height: number, formatName: string): fm.icelink.VideoBuffer;
        /**
        Creates an olive (128, 128, 0) video buffer with the specified width/height.
        @param width The width.
        @param height The height.
        @param formatName Name of the format.
        */
        static createOlive(width: number, height: number, formatName: string): fm.icelink.VideoBuffer;
        /**
        Creates a purple (128, 0, 128) video buffer with the specified width/height.
        @param width The width.
        @param height The height.
        @param formatName Name of the format.
        */
        static createPurple(width: number, height: number, formatName: string): fm.icelink.VideoBuffer;
        /**
        Creates a red (255, 0, 0) video buffer with the specified width/height.
        @param width The width.
        @param height The height.
        @param formatName Name of the format.
        */
        static createRed(width: number, height: number, formatName: string): fm.icelink.VideoBuffer;
        /**
        Creates a teal (0, 128, 128) video buffer with the specified width/height.
        @param width The width.
        @param height The height.
        @param formatName Name of the format.
        */
        static createTeal(width: number, height: number, formatName: string): fm.icelink.VideoBuffer;
        /**
        Creates a white (255, 255, 255) video buffer with the specified width/height.
        @param width The width.
        @param height The height.
        @param formatName Name of the format.
        */
        static createWhite(width: number, height: number, formatName: string): fm.icelink.VideoBuffer;
        /**
        Creates a yellow (255, 255, 0) video buffer with the specified width/height.
        @param width The width.
        @param height The height.
        @param formatName Name of the format.
        */
        static createYellow(width: number, height: number, formatName: string): fm.icelink.VideoBuffer;
        /**
        Deserializes an instance from JSON.
        @param videoBufferJson The video buffer JSON.
        */
        static fromJson(videoBufferJson: string): fm.icelink.VideoBuffer;
        /**
        Deserializes an array of instances from JSON.
        @param videoBuffersJson The video buffers JSON.
        */
        static fromJsonArray(videoBuffersJson: string): fm.icelink.VideoBuffer[];
        /**
        Gets the minimum data buffer length for a given width, height, and format.
        @param width The width.
        @param height The height.
        @param formatName Name of the format.
        */
        static getMinimumBufferLength(width: number, height: number, formatName: string): number;
        /**
        Serializes an instance to JSON.
        @param videoBuffer The video buffer.
        */
        static toJson(videoBuffer: fm.icelink.VideoBuffer): string;
        /**
        Serializes an array of instances to JSON.
        @param videoBuffers The video buffers.
        */
        static toJsonArray(videoBuffers: fm.icelink.VideoBuffer[]): string;
        /**
        Clones this instance.
        */
        clone(): fm.icelink.VideoBuffer;
        /**
        Creates a new video buffer using the specified format.
        @param format The format.
        */
        convert(format: fm.icelink.VideoFormat): fm.icelink.VideoBuffer;
        /**
        Creates a new video buffer using the specified format.
        @param format The format.
        @param dataBuffer The data buffer.
        */
        convert(format: fm.icelink.VideoFormat, dataBuffer: fm.icelink.DataBuffer): fm.icelink.VideoBuffer;
        /**
        Creates a new video buffer using the specified format.
        @param format The format.
        @param usePool Whether to use the DataBufferPool.
        */
        convert(format: fm.icelink.VideoFormat, usePool: boolean): fm.icelink.VideoBuffer;
        /** @hidden */
        private convertRgbaToYuv;
        /** @hidden */
        private convertYuvToRgba;
        /**
        Creates a new instance.
        */
        protected createInstance(): fm.icelink.VideoBuffer;
        /**
        Gets the A value at a given index. If the video buffer is not RGBA-type, then this will return 255.
        @param index The index.
        @return The A value.
        */
        getAValue(index: number): number;
        /** @hidden */
        private getAValueOffset;
        /**
        Gets the B value at a given index.
        @param index The index.
        @return The B value, or -1 if the video buffer is not RGB/RGBA-type.
        */
        getBValue(index: number): number;
        /** @hidden */
        private getBValueOffset;
        /** @hidden */
        private getDefaultStrides;
        /**
        Gets the G value at a given index.
        @param index The index.
        @return The G value, or -1 if the video buffer is not RGB/RGBA-type.
        */
        getGValue(index: number): number;
        /** @hidden */
        private getGValueOffset;
        /**
        Gets the height.
        */
        getHeight(): number;
        /**
        Gets a value indicating whether this buffer has ABGR video.
        */
        getIsAbgr(): boolean;
        /**
        Gets a value indicating whether this buffer has ARGB video.
        */
        getIsArgb(): boolean;
        /**
        Gets a value indicating whether this buffer has BGR video.
        */
        getIsBgr(): boolean;
        /**
        Gets a value indicating whether this buffer has BGRA video.
        */
        getIsBgra(): boolean;
        /**
        Gets a value indicating whether this buffer has H.264 video.
        */
        getIsH264(): boolean;
        /**
        Gets a value indicating whether this buffer has I420 video.
        */
        getIsI420(): boolean;
        /**
        Gets a value indicating whether this instance has been muted.
        */
        getIsMuted(): boolean;
        /**
        Gets a value indicating whether this buffer has NV12 video.
        */
        getIsNv12(): boolean;
        /**
        Gets a value indicating whether this buffer has NV21 video.
        */
        getIsNv21(): boolean;
        /**
        Gets a value indicating whether the data is packed into a single data buffer.
        */
        getIsPacked(): boolean;
        /**
        Gets a value indicating whether the data is spread across multiple data buffers (planes).
        */
        getIsPlanar(): boolean;
        /**
        Gets a value indicating whether this buffer has raw video.
        */
        getIsRaw(): boolean;
        /**
        Gets a value indicating whether this buffer has RGB video.
        */
        getIsRgb(): boolean;
        /**
        Gets a value indicating whether this buffer has RGBA video.
        */
        getIsRgba(): boolean;
        /**
        Gets a value indicating whether this buffer has raw RGBA, BGRA, ARGB, or ABGR video.
        */
        getIsRgbaType(): boolean;
        /**
        Gets a value indicating whether this buffer has raw RGB or BGR video.
        */
        getIsRgbType(): boolean;
        /**
        Gets a value indicating whether this buffer has VP8 video.
        */
        getIsVp8(): boolean;
        /**
        Gets a value indicating whether this buffer has VP9 video.
        */
        getIsVp9(): boolean;
        /**
        Gets a value indicating whether this buffer has raw I420, YV12, NV12, or NV21 video.
        */
        getIsYuvType(): boolean;
        /**
        Gets a value indicating whether this buffer has YV12 video.
        */
        getIsYv12(): boolean;
        /**
        Gets the orientation.
        */
        getOrientation(): number;
        /**
        Gets the R value at a given index.
        @param index The index.
        @return The R value, or -1 if the video buffer is not RGB/RGBA-type.
        */
        getRValue(index: number): number;
        /** @hidden */
        private getRValueOffset;
        /**
        Gets the stride.
        */
        getStride(): number;
        /**
        Gets the strides.
        */
        getStrides(): number[];
        /**
        Gets the U value at a given index.
        @param index The index.
        @return The U value, or -1 if the video buffer is not YUV-type.
        */
        getUValue(index: number): number;
        /** @hidden */
        private getUValueOffset;
        /**
        Gets the V value at a given index.
        @param index The index.
        @return The V value, or -1 if the video buffer is not YUV-type.
        */
        getVValue(index: number): number;
        /** @hidden */
        private getVValueOffset;
        /**
        Gets the width.
        */
        getWidth(): number;
        /**
        Gets the Y value at a given index.
        @param index The index.
        @return The Y value, or -1 if the video buffer is not YUV-type.
        */
        getYValue(index: number): number;
        /** @hidden */
        private getYValueOffset;
        /**
        Mutes this instance. This is a one-way operation that clears the underlying data buffer.
        */
        mute(): boolean;
        /** @hidden */
        private readRgba;
        /** @hidden */
        private readYuv;
        /**
        Gets the A value at a given index. If the video buffer is not RGBA-type, then this will return false.
        @param aValue The A value.
        @param index The index.
        @return `true` if the video buffer is RGBA-type.
        */
        setAValue(aValue: number, index: number): boolean;
        /**
        Gets the B value at a given index.
        @param bValue The B value.
        @param index The index.
        @return `true` if the video buffer is RGB/RGBA-type.
        */
        setBValue(bValue: number, index: number): boolean;
        /**
        Sets the G value at a given index.
        @param gValue The G value.
        @param index The index.
        @return `true` if the video buffer is RGB/RGBA-type.
        */
        setGValue(gValue: number, index: number): boolean;
        /**
        Sets the height.
        */
        setHeight(value: number): void;
        /** @hidden */
        setIsMuted(value: boolean): void;
        /**
        Sets the orientation.
        */
        setOrientation(value: number): void;
        /**
        Sets the R value at a given index.
        @param rValue The R value.
        @param index The index.
        @return `true` if the video buffer is RGB/RGBA-type.
        */
        setRValue(rValue: number, index: number): boolean;
        /**
        Sets the stride.
        */
        setStride(value: number): void;
        /**
        Sets the strides.
        */
        setStrides(value: number[]): void;
        /**
        Sets the U value at a given index.
        @param uValue The U value.
        @param index The index.
        @return `true` if the video buffer is YUV-type.
        */
        setUValue(uValue: number, index: number): boolean;
        /**
        Sets the V value at a given index.
        @param vValue The V value.
        @param index The index.
        @return `true` if the video buffer is YUV-type.
        */
        setVValue(vValue: number, index: number): boolean;
        /**
        Sets the width.
        */
        setWidth(value: number): void;
        /**
        Sets the Y value at a given index.
        @param yValue The Y value.
        @param index The index.
        @return `true` if the video buffer is YUV-type.
        */
        setYValue(yValue: number, index: number): boolean;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
        /**
        Creates a packed representation of this planar buffer, if in YUV-planar format. Otherwise, returns the current buffer. If the planar data is not contiguous in memory, new memory will be allocated for the packed representation.
        */
        toPacked(): fm.icelink.VideoBuffer;
        /**
        Creates a packed representation of this planar buffer, if in YUV-planar format. Otherwise, returns the current buffer. If the planar data is not contiguous in memory, new memory will be allocated or taken from the data buffer pool for the packed representation.
        @param usePool Whether to use the data buffer pool for any required memory allocations.
        */
        toPacked(usePool: boolean): fm.icelink.VideoBuffer;
        /**
        Creates a planar representation of this packed buffer, if in YUV-packed format. Otherwise, returns the current buffer.
        */
        toPlanar(): fm.icelink.VideoBuffer;
        /** @hidden */
        private writeRgba;
        /** @hidden */
        private writeYuv;
    }
}
declare namespace fm.icelink {
    /** @hidden */
    class RemoteCandidatePromise extends fm.icelink.Promise<fm.icelink.Candidate> {
        getTypeString(): string;
        /** @hidden */
        private _remoteCandidate;
        constructor(remoteCandidate: fm.icelink.Candidate);
        getRemoteCandidate(): fm.icelink.Candidate;
        /** @hidden */
        private setRemoteCandidate;
    }
}
declare namespace fm.icelink {
    /**
    A collection of remote medias.
    */
    class RemoteMediaCollection extends fm.icelink.Collection<fm.icelink.RemoteMedia, fm.icelink.RemoteMediaCollection> {
        getTypeString(): string;
        /** @hidden */
        private __lookup;
        /** @hidden */
        private __lookupLock;
        constructor();
        /**
        Invoked when an element is added to the collection.
        @param value The value.
        */
        protected addSuccess(value: fm.icelink.RemoteMedia): void;
        /**
        Creates an array from a list.
        @param list The list.
        */
        protected arrayFromList(list: Array<fm.icelink.RemoteMedia>): fm.icelink.RemoteMedia[];
        /**
        Creates a collection.
        */
        protected createCollection(): fm.icelink.RemoteMediaCollection;
        /**
        Gets a media by ID.
        @param idValue The identifier.
        */
        getById(idValue: string): fm.icelink.RemoteMedia;
        /**
        Invoked when an element is removed from the collection.
        @param value The value.
        */
        protected removeSuccess(value: fm.icelink.RemoteMedia): void;
    }
}
declare namespace fm.icelink {
    /**
    A collection of remote medias.
    */
    class MediaCollection extends fm.icelink.RemoteMediaCollection {
        getTypeString(): string;
        constructor();
    }
}
declare namespace fm.icelink {
    class NackPolicyWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.NackPolicy);
        toString(): string;
    }
}
declare namespace fm.icelink {
    class RedFecPolicyWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.RedFecPolicy);
        toString(): string;
    }
}
declare namespace fm.icelink {
    class RembPolicyWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.RembPolicy);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    An RTP packet header.
    */
    class RtpPacketHeader {
        getTypeString(): string;
        /** @hidden */
        private __headerExtension;
        /** @hidden */
        private _contributingSourceCount;
        /** @hidden */
        private _contributingSources;
        /** @hidden */
        private _extension;
        /** @hidden */
        private _marker;
        /** @hidden */
        private _padding;
        /** @hidden */
        private _paddingLength;
        /** @hidden */
        private _payloadType;
        /** @hidden */
        private _sequenceNumber;
        /** @hidden */
        private _synchronizationSource;
        /** @hidden */
        private _timestamp;
        /** @hidden */
        private _version;
        private fmicelinkRtpPacketHeaderInit;
        /**
        Creates a new instance of the [[fm.icelink.rtpPacketHeader]] class.
        */
        constructor();
        /**
        Gets the length of the fixed header.
        */
        static getFixedHeaderLength(): number;
        /**
        Calculates the length of the header. At least 12 bytes.
        */
        calculateHeaderLength(): number;
        /**
        Clones this instance.
        */
        clone(): fm.icelink.RtpPacketHeader;
        /**
        Gets the number of contributing sources.
        */
        getContributingSourceCount(): number;
        /**
        Gets the contributing sources.
        */
        getContributingSources(): number[];
        /**
        Gets if there is an extension.
        */
        getExtension(): boolean;
        /**
        Gets the header extension.
        */
        getHeaderExtension(): fm.icelink.IRtpHeaderExtension;
        /**
        Gets if the marker bit is set.
        */
        getMarker(): boolean;
        /**
        Gets if the packet has padding.
        */
        getPadding(): boolean;
        /**
        Gets the number of bytes of padding.
        */
        getPaddingLength(): number;
        /**
        Gets the payload type.
        */
        getPayloadType(): number;
        /**
        Gets the sequence number.
        */
        getSequenceNumber(): number;
        /**
        Gets the synchronization source.
        */
        getSynchronizationSource(): number;
        /**
        Gets the timestamp.
        */
        getTimestamp(): number;
        /**
        Gets the version of the packet. Should be 2.
        */
        getVersion(): number;
        /**
        Sets the number of contributing sources.
        */
        setContributingSourceCount(value: number): void;
        /**
        Sets the contributing sources.
        */
        setContributingSources(value: number[]): void;
        /** @hidden */
        private setExtension;
        /**
        Sets the header extension.
        */
        setHeaderExtension(value: fm.icelink.IRtpHeaderExtension): void;
        /**
        Sets if the marker bit is set.
        */
        setMarker(value: boolean): void;
        /**
        Sets if the packet has padding.
        */
        setPadding(value: boolean): void;
        /** @hidden */
        private setPaddingLength;
        /**
        Sets the payload type.
        */
        setPayloadType(value: number): void;
        /**
        Sets the sequence number.
        */
        setSequenceNumber(value: number): void;
        /**
        Sets the synchronization source.
        */
        setSynchronizationSource(value: number): void;
        /**
        Sets the timestamp.
        */
        setTimestamp(value: number): void;
        /**
        Sets the version of the packet. Should be 2.
        */
        setVersion(value: number): void;
        /**
        Writes this header to a buffer starting at the offset.
        @param buffer The target buffer.
        @param offset The starting offset.
        */
        writeTo(buffer: fm.icelink.DataBuffer, offset: number): void;
    }
}
declare namespace fm.icelink {
    /**
    The interface that all rtp header extensions must implement.
    */
    interface IRtpHeaderExtension {
        fillBuffer(buffer: fm.icelink.DataBuffer, offset: number): void;
        getId(): Uint8Array;
        getLength(): number;
    }
}
declare namespace fm.icelink.rtp {
    /** @hidden */
    class HeaderExtensionFormWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.rtp.HeaderExtensionForm);
        toString(): string;
    }
}
declare namespace fm.icelink.rtp {
    /** @hidden */
    class RawHeaderExtension implements fm.icelink.IRtpHeaderExtension {
        getTypeString(): string;
        /** @hidden */
        private _appBits;
        /** @hidden */
        private _form;
        /** @hidden */
        private _id;
        /** @hidden */
        private _payload;
        private fmicelinkrtpRawHeaderExtensionInit;
        constructor(idValue: Uint8Array, payload: Uint8Array);
        fillBuffer(buffer: fm.icelink.DataBuffer, offset: number): void;
        getAppBits(): number;
        getForm(): fm.icelink.rtp.HeaderExtensionForm;
        getId(): Uint8Array;
        getLength(): number;
        getPayload(): Uint8Array;
        /** @hidden */
        private setAppBits;
        /** @hidden */
        private setForm;
        /** @hidden */
        private setId;
        /** @hidden */
        private setPayload;
    }
}
declare namespace fm.icelink {
    class SdesPolicyWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.SdesPolicy);
        toString(): string;
    }
}
declare namespace fm.icelink {
    class SignallingStateWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.SignallingState);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    A sink output (e.g. device, track, screen).
    */
    class SinkOutput {
        getTypeString(): string;
        /** @hidden */
        private _id;
        /** @hidden */
        private _name;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sinkOutput]] class.
        @param idValue The identifier.
        @param name The name.
        */
        constructor(idValue: string, name: string);
        /**
        Deserializes an instance from JSON.
        @param sinkOutputJson The sink output JSON.
        */
        static fromJson(sinkOutputJson: string): fm.icelink.SinkOutput;
        /**
        Deserializes an instance array from JSON.
        @param sinkOutputsJson The sink outputs JSON.
        */
        static fromJsonArray(sinkOutputsJson: string): fm.icelink.SinkOutput[];
        /**
        Serializes an instance to JSON.
        @param sinkOutput The sink output.
        */
        static toJson(sinkOutput: fm.icelink.SinkOutput): string;
        /**
        Serializes an instance array to JSON.
        @param sinkOutputs The sink outputs.
        */
        static toJsonArray(sinkOutputs: fm.icelink.SinkOutput[]): string;
        /**
        Gets the identifier.
        */
        getId(): string;
        /**
        Gets the name.
        */
        getName(): string;
        /** @hidden */
        private setId;
        /** @hidden */
        private setName;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
        /**
        Returns a string that represents this instance.
        @return
                    A string that represents this instance.
            
        */
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    A source input (e.g. device, track, screen).
    */
    class SourceInput {
        getTypeString(): string;
        /** @hidden */
        private _id;
        /** @hidden */
        private _name;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sourceInput]] class.
        @param idValue The identifier.
        @param name The name.
        */
        constructor(idValue: string, name: string);
        /**
        Deserializes an instance from JSON.
        @param sourceInputJson The source input JSON.
        */
        static fromJson(sourceInputJson: string): fm.icelink.SourceInput;
        /**
        Deserializes an instance array from JSON.
        @param sourceInputsJson The source inputs JSON.
        */
        static fromJsonArray(sourceInputsJson: string): fm.icelink.SourceInput[];
        /**
        Serializes an instance to JSON.
        @param sourceInput The source input.
        */
        static toJson(sourceInput: fm.icelink.SourceInput): string;
        /**
        Serializes an instance array to JSON.
        @param sourceInputs The source inputs.
        */
        static toJsonArray(sourceInputs: fm.icelink.SourceInput[]): string;
        /**
        Gets the identifier.
        */
        getId(): string;
        /**
        Gets the name.
        */
        getName(): string;
        /**
        Sets the identifier.
        */
        setId(value: string): void;
        /**
        Sets the name.
        */
        setName(value: string): void;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
        /**
        Returns a string that represents this instance.
        @return
                    A string that represents this instance.
            
        */
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    A stream collection.
    */
    class StreamCollection extends fm.icelink.Collection<fm.icelink.WebRtcStream, fm.icelink.StreamCollection> {
        getTypeString(): string;
        constructor();
        /**
        Creates an array from a list.
        @param list The list.
        */
        protected arrayFromList(list: Array<fm.icelink.WebRtcStream>): fm.icelink.WebRtcStream[];
        /**
        Creates a collection.
        */
        protected createCollection(): fm.icelink.StreamCollection;
        /**
        Gets a stream by its type.
        */
        getByType<T extends fm.icelink.WebRtcStream>(type: fm.icelink.StreamType): T;
        /**
        Gets some streams by their type.
        */
        getManyByType<T extends fm.icelink.WebRtcStream>(type: fm.icelink.StreamType): Array<T>;
    }
}
declare namespace fm.icelink {
    /** @hidden */
    class TransportTypeWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.TransportType);
        toString(): string;
    }
}
declare namespace fm.icelink {
    class TrickleIcePolicyWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.TrickleIcePolicy);
        toString(): string;
    }
}
declare namespace fm.icelink.vp8 {
    /**
    A VP8 format.
    */
    class Format extends fm.icelink.VideoFormat {
        getTypeString(): string;
        /**
        Initializes a new instance of the [[fm.icelink.vp8.format]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.vp8.format]] class.
        @param clockRate The clock rate.
        */
        constructor(clockRate: number);
    }
}
declare namespace fm.icelink.vp9 {
    /**
    A VP9 format.
    */
    class Format extends fm.icelink.VideoFormat {
        getTypeString(): string;
        /**
        Initializes a new instance of the [[fm.icelink.vp9.format]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.vp9.format]] class.
        @param clockRate The clock rate.
        */
        constructor(clockRate: number);
    }
}
declare namespace fm.icelink {
    /**
    A media configuration.
    */
    abstract class MediaConfig<TConfig extends fm.icelink.MediaConfig<TConfig>> {
        getTypeString(): string;
        /** @hidden */
        private _clockRate;
        private fmicelinkMediaConfigInit;
        /**
        Initializes a new instance of the [[fm.icelink.mediaConfig]] class.
        @param clockRate The clock rate.
        */
        constructor(clockRate: number);
        /**
        Gets the clock rate.
        */
        getClockRate(): number;
        /**
        Determines whether the specified configuration is equivalent.
        @param config The configuration.
        */
        isEquivalent(config: TConfig): boolean;
        /** @hidden */
        private setClockRate;
    }
}
declare namespace fm.icelink {
    /**
    An audio configuration.
    */
    class AudioConfig extends fm.icelink.MediaConfig<fm.icelink.AudioConfig> {
        getTypeString(): string;
        /** @hidden */
        private _channelCount;
        private fmicelinkAudioConfigInit;
        /**
        Initializes a new instance of the [[fm.icelink.audioConfig]] class.
        @param clockRate The clock rate.
        @param channelCount The channel count.
        */
        constructor(clockRate: number, channelCount: number);
        /**
        Gets the channel count.
        */
        getChannelCount(): number;
        /**
        Determines whether the specified configuration is equivalent.
        @param config The configuration.
        */
        isEquivalent(config: fm.icelink.AudioConfig): boolean;
        /** @hidden */
        private setChannelCount;
        /**
        Returns a string that represents this instance.
        */
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    Base stats.
    */
    abstract class BaseStats {
        getTypeString(): string;
        /** @hidden */
        private _id;
        /** @hidden */
        private _timestamp;
        constructor();
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the identifier of the object generating these stats.
        */
        getId(): string;
        /**
        Gets the timestamp when these stats were generated.
        */
        getTimestamp(): fm.icelink.DateTime;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /** @hidden */
        setId(value: string): void;
        /** @hidden */
        setTimestamp(value: fm.icelink.DateTime): void;
    }
}
declare namespace fm.icelink {
    /**
    Information.
    */
    abstract class Info {
        getTypeString(): string;
        /** @hidden */
        private _id;
        constructor();
        /**
        Processes an array for an info.
        @param newValues The new values.
        @param oldValues The old values.
        @return The new values, if the new values are not equivalent to the old values; otherwise null.
        */
        static processArray<T extends fm.icelink.IEquivalent<T>>(newValues: T[], oldValues: T[]): T[];
        /**
        Processes a boolean for an info.
        @param newValue The new value.
        @param oldValue The old value.
        @return The new value, if the new value does not equal the old value; otherwise null.
        */
        static processBoolean(newValue: boolean, oldValue: boolean): boolean;
        /**
        Processes a boolean array for an info.
        @param newValues The new values.
        @param oldValues The old values.
        @return The new values, if the new values do not equal the old values; otherwise null.
        */
        static processBooleanArray(newValues: boolean[], oldValues: boolean[]): boolean[];
        /**
        Processes a double for an info.
        @param newValue The new value.
        @param oldValue The old value.
        @return The new value, if the new value does not equal the old value; otherwise null.
        */
        static processDouble(newValue: number, oldValue: number): number;
        /**
        Processes a float for an info.
        @param newValue The new value.
        @param oldValue The old value.
        @return The new value, if the new value does not equal the old value; otherwise null.
        */
        static processFloat(newValue: number, oldValue: number): number;
        /**
        Processes a float array for an info.
        @param newValues The new values.
        @param oldValues The old values.
        @return The new values, if the new values do not equal the old values; otherwise null.
        */
        static processFloatArray(newValues: number[], oldValues: number[]): number[];
        /**
        Processes an integer for an info.
        @param newValue The new value.
        @param oldValue The old value.
        @return The new value, if the new value does not equal the old value; otherwise null.
        */
        static processInteger(newValue: number, oldValue: number): number;
        /**
        Processes a integer array for an info.
        @param newValues The new values.
        @param oldValues The old values.
        @return The new values, if the new values do not equal the old values; otherwise null.
        */
        static processIntegerArray(newValues: number[], oldValues: number[]): number[];
        /**
        Processes a long for an info.
        @param newValue The new value.
        @param oldValue The old value.
        @return The new value, if the new value does not equal the old value; otherwise null.
        */
        static processLong(newValue: number, oldValue: number): number;
        /**
        Processes a long array for an info.
        @param newValues The new values.
        @param oldValues The old values.
        @return The new values, if the new values do not equal the old values; otherwise null.
        */
        static processLongArray(newValues: number[], oldValues: number[]): number[];
        /**
        Processes an object for an info.
        @param newValue The new value.
        @param oldValue The old value.
        @return The new value, if the new value does not equal the old value; otherwise null.
        */
        static processObject<T extends Object & fm.icelink.IEquivalent<T>>(newValue: T, oldValue: T): T;
        /**
        Processes a short for an info.
        @param newValue The new value.
        @param oldValue The old value.
        @return The new value, if the new value does not equal the old value; otherwise null.
        */
        static processShort(newValue: number, oldValue: number): number;
        /**
        Processes a short array for an info.
        @param newValues The new values.
        @param oldValues The old values.
        @return The new values, if the new values do not equal the old values; otherwise null.
        */
        static processShortArray(newValues: number[], oldValues: number[]): number[];
        /**
        Processes a string for an info.
        @param newValue The new value.
        @param oldValue The old value.
        @return The new value, if the new value does not equal the old value; otherwise null.
        */
        static processString(newValue: string, oldValue: string): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the identifier.
        */
        getId(): string;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets the identifier.
        */
        setId(value: string): void;
    }
}
declare namespace fm.icelink {
    /**
    Candidate information.
    */
    class CandidateInfo extends fm.icelink.Info {
        getTypeString(): string;
        /** @hidden */
        private _ipAddress;
        /** @hidden */
        private _port;
        /** @hidden */
        private _priority;
        /** @hidden */
        private _protocol;
        /** @hidden */
        private _relatedIPAddress;
        /** @hidden */
        private _relatedPort;
        /** @hidden */
        private _relayProtocol;
        /** @hidden */
        private _type;
        private fmicelinkCandidateInfoInit;
        /**
        Initializes a new instance of the [[fm.icelink.candidateInfo]] class.
        */
        constructor();
        constructor(stats: fm.icelink.CandidateStats, lastStats: fm.icelink.CandidateStats);
        /**
        Deserializes an instance from JSON.
        @param candidateReportJson The JSON.
        @return The deserialized instance.
        */
        static fromJson(candidateReportJson: string): fm.icelink.CandidateInfo;
        /**
        Deserializes an array from JSON.
        @param candidateReportsJson The JSON.
        @return The deserialized array.
        */
        static fromJsonArray(candidateReportsJson: string): fm.icelink.CandidateInfo[];
        /**
        Serializes an instance to JSON.
        @param candidateReport The instance.
        @return The serialized JSON.
        */
        static toJson(candidateReport: fm.icelink.CandidateInfo): string;
        /**
        Serializes an array to JSON.
        @param candidateReports The array.
        @return The serialized JSON.
        */
        static toJsonArray(candidateReports: fm.icelink.CandidateInfo[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the candidate IP address.
        */
        getIPAddress(): string;
        /**
        Gets the candidate port.
        */
        getPort(): number;
        /**
        Gets the candidate priority.
        */
        getPriority(): number;
        /**
        Gets the candidate protocol.
        */
        getProtocol(): string;
        /**
        Gets the candidate related IP address.
        */
        getRelatedIPAddress(): string;
        /**
        Gets the candidate related port.
        */
        getRelatedPort(): number;
        /**
        Gets the candidate relay protocol.
        */
        getRelayProtocol(): string;
        /**
        Gets the candidate type.
        */
        getType(): string;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets the candidate IP address.
        */
        setIPAddress(value: string): void;
        /**
        Sets the candidate port.
        */
        setPort(value: number): void;
        /**
        Sets the candidate priority.
        */
        setPriority(value: number): void;
        /**
        Sets the candidate protocol.
        */
        setProtocol(value: string): void;
        /**
        Sets the candidate related IP address.
        */
        setRelatedIPAddress(value: string): void;
        /**
        Sets the candidate related port.
        */
        setRelatedPort(value: number): void;
        /**
        Sets the candidate relay protocol.
        */
        setRelayProtocol(value: string): void;
        /**
        Sets the candidate type.
        */
        setType(value: string): void;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Candidate pair information.
    */
    class CandidatePairInfo extends fm.icelink.Info {
        getTypeString(): string;
        /** @hidden */
        private _localCandidateId;
        /** @hidden */
        private _nominated;
        /** @hidden */
        private _priority;
        /** @hidden */
        private _remoteCandidateId;
        /** @hidden */
        private _state;
        private fmicelinkCandidatePairInfoInit;
        /**
        Initializes a new instance of the [[fm.icelink.candidatePairInfo]] class.
        */
        constructor();
        constructor(stats: fm.icelink.CandidatePairStats, lastStats: fm.icelink.CandidatePairStats);
        /**
        Deserializes an instance from JSON.
        @param instanceJson The instance JSON.
        @return The deserialized instance.
        */
        static fromJson(instanceJson: string): fm.icelink.CandidatePairInfo;
        /**
        Derializes an array from JSON.
        @param arrayJson The array JSON.
        @return The deserialized array.
        */
        static fromJsonArray(arrayJson: string): fm.icelink.CandidatePairInfo[];
        /**
        Serializes an instance to JSON.
        @param instance The instance.
        @return The serialized instance JSON.
        */
        static toJson(instance: fm.icelink.CandidatePairInfo): string;
        /**
        Serializes an array to JSON.
        @param array The array.
        @return The serialized array JSON.
        */
        static toJsonArray(array: fm.icelink.CandidatePairInfo[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the candidate pair's local candidate identifier.
        */
        getLocalCandidateId(): string;
        /**
        Gets whether the candidate pair is nominated.
        */
        getNominated(): boolean;
        /**
        Gets the candidate pair priority.
        */
        getPriority(): number;
        /**
        Gets the candidate pair's remote candidate identifier.
        */
        getRemoteCandidateId(): string;
        /**
        Gets the candidate pair state.
        */
        getState(): string;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets the candidate pair's local candidate identifier.
        */
        setLocalCandidateId(value: string): void;
        /**
        Sets whether the candidate pair is nominated.
        */
        setNominated(value: boolean): void;
        /**
        Sets the candidate pair priority.
        */
        setPriority(value: number): void;
        /**
        Sets the candidate pair's remote candidate identifier.
        */
        setRemoteCandidateId(value: string): void;
        /**
        Sets the candidate pair state.
        */
        setState(value: string): void;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    class CandidatePairStateWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.CandidatePairState);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    Candidate pair stats.
    */
    class CandidatePairStats extends fm.icelink.BaseStats implements fm.icelink.IEquivalent<fm.icelink.CandidatePairStats> {
        getTypeString(): string;
        /** @hidden */
        private _bytesReceived;
        /** @hidden */
        private _bytesSent;
        /** @hidden */
        private _consentRequestsReceived;
        /** @hidden */
        private _consentRequestsSent;
        /** @hidden */
        private _consentResponsesReceived;
        /** @hidden */
        private _consentResponsesSent;
        /** @hidden */
        private _currentRoundTripTime;
        /** @hidden */
        private _localCandidateId;
        /** @hidden */
        private _nominated;
        /** @hidden */
        private _priority;
        /** @hidden */
        private _remoteCandidateId;
        /** @hidden */
        private _requestsReceived;
        /** @hidden */
        private _requestsSent;
        /** @hidden */
        private _responsesReceived;
        /** @hidden */
        private _responsesSent;
        /** @hidden */
        private _state;
        /** @hidden */
        private _totalRoundTripTime;
        /** @hidden */
        private _transportId;
        private fmicelinkCandidatePairStatsInit;
        /**
        Initializes a new instance of the [[fm.icelink.candidatePairStats]] class.
        */
        constructor();
        /**
        Derializes candidate pair stats from JSON.
        @param candidatePairJson The candidate pair's stats JSON.
        */
        static fromJson(candidatePairJson: string): fm.icelink.CandidatePairStats;
        /**
        Derializes an array of candidate pair stats from JSON.
        @param candidatePairsJson The candidate pairs' stats JSON.
        */
        static fromJsonArray(candidatePairsJson: string): fm.icelink.CandidatePairStats[];
        /**
        Serializes candidate pair stats to JSON.
        @param candidatePair The candidate pair's stats.
        */
        static toJson(candidatePair: fm.icelink.CandidatePairStats): string;
        /**
        Serializes an array of candidate pair stats to JSON.
        @param candidatePairs The candidate pairs' stats.
        */
        static toJsonArray(candidatePairs: fm.icelink.CandidatePairStats[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the number of bytes received.
        */
        getBytesReceived(): number;
        /**
        Gets the number of bytes sent.
        */
        getBytesSent(): number;
        /**
        Gets the number of consent requests received.
        */
        getConsentRequestsReceived(): number;
        /**
        Gets the number of consent requests sent.
        */
        getConsentRequestsSent(): number;
        /**
        Gets the number of consent responses received.
        */
        getConsentResponsesReceived(): number;
        /**
        Gets the number of consent responses sent.
        */
        getConsentResponsesSent(): number;
        /**
        Gets the current round trip time in milliseconds.
        */
        getCurrentRoundTripTime(): number;
        /**
        Gets the local candidate identifier.
        */
        getLocalCandidateId(): string;
        /**
        Gets whether the candidate pair is nominated.
        */
        getNominated(): boolean;
        /**
        Gets the priority.
        */
        getPriority(): number;
        /**
        Gets the remote candidate identifier.
        */
        getRemoteCandidateId(): string;
        /**
        Gets the number of requests received.
        */
        getRequestsReceived(): number;
        /**
        Gets the number of requests sent.
        */
        getRequestsSent(): number;
        /**
        Gets the number of responses received.
        */
        getResponsesReceived(): number;
        /**
        Gets the number of responses sent.
        */
        getResponsesSent(): number;
        /**
        Gets the state.
        */
        getState(): fm.icelink.CandidatePairState;
        /**
        Gets the total round trip time in milliseconds.
        */
        getTotalRoundTripTime(): number;
        /**
        Gets the transport identifier.
        */
        getTransportId(): string;
        /**
        Checks if a candidate pair is equivalent to this one.
        @param instance The candidate pair.
        */
        isEquivalent(instance: fm.icelink.CandidatePairStats): boolean;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /** @hidden */
        setBytesReceived(value: number): void;
        /** @hidden */
        setBytesSent(value: number): void;
        /** @hidden */
        setConsentRequestsReceived(value: number): void;
        /** @hidden */
        setConsentRequestsSent(value: number): void;
        /** @hidden */
        setConsentResponsesReceived(value: number): void;
        /** @hidden */
        setConsentResponsesSent(value: number): void;
        /** @hidden */
        setCurrentRoundTripTime(value: number): void;
        /** @hidden */
        setLocalCandidateId(value: string): void;
        /** @hidden */
        setNominated(value: boolean): void;
        /** @hidden */
        setPriority(value: number): void;
        /** @hidden */
        setRemoteCandidateId(value: string): void;
        /** @hidden */
        setRequestsReceived(value: number): void;
        /** @hidden */
        setRequestsSent(value: number): void;
        /** @hidden */
        setResponsesReceived(value: number): void;
        /** @hidden */
        setResponsesSent(value: number): void;
        /** @hidden */
        setState(value: fm.icelink.CandidatePairState): void;
        /** @hidden */
        setTotalRoundTripTime(value: number): void;
        /** @hidden */
        setTransportId(value: string): void;
        /**
        Serializes this to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Candidate stats.
    */
    class CandidateStats extends fm.icelink.BaseStats implements fm.icelink.IEquivalent<fm.icelink.CandidateStats> {
        getTypeString(): string;
        /** @hidden */
        private _ipAddress;
        /** @hidden */
        private _port;
        /** @hidden */
        private _priority;
        /** @hidden */
        private _protocol;
        /** @hidden */
        private _relatedIPAddress;
        /** @hidden */
        private _relatedPort;
        /** @hidden */
        private _relayProtocol;
        /** @hidden */
        private _type;
        private fmicelinkCandidateStatsInit;
        /**
        Initializes a new instance of the [[fm.icelink.candidateStats]] class.
        */
        constructor();
        /**
        Derializes candidate stats from JSON.
        @param candidateJson The candidate's stats JSON.
        */
        static fromJson(candidateJson: string): fm.icelink.CandidateStats;
        /**
        Derializes an array of candidate stats from JSON.
        @param candidatesJson The candidates' stats JSON.
        */
        static fromJsonArray(candidatesJson: string): fm.icelink.CandidateStats[];
        /**
        Serializes candidate stats to JSON.
        @param candidate The candidate's stats.
        */
        static toJson(candidate: fm.icelink.CandidateStats): string;
        /**
        Serializes an array of candidate stats to JSON.
        @param candidates The candidates' stats.
        */
        static toJsonArray(candidates: fm.icelink.CandidateStats[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the IP address.
        */
        getIPAddress(): string;
        /**
        Gets whether the candidate is host/local.
        */
        getIsHost(): boolean;
        /**
        Gets whether the candidate is reflexive.
        */
        getIsReflexive(): boolean;
        /**
        Gets whether the candidate is relayed.
        */
        getIsRelayed(): boolean;
        /**
        Gets the port.
        */
        getPort(): number;
        /**
        Gets the priority.
        */
        getPriority(): number;
        /**
        Gets the protocol.
        */
        getProtocol(): fm.icelink.ProtocolType;
        /**
        Gets the related IP address.
        */
        getRelatedIPAddress(): string;
        /**
        Gets the related port.
        */
        getRelatedPort(): number;
        /**
        Gets the relay protocol.
        */
        getRelayProtocol(): fm.icelink.ProtocolType;
        /**
        Gets the relay protocol. Obsolete. Alias for [[fm.icelink.candidateStats.relayProtocol]].
        */
        getTurnProtocol(): fm.icelink.ProtocolType;
        /**
        Gets the type.
        */
        getType(): fm.icelink.CandidateType;
        /**
        Checks if a candidate is equivalent to this one.
        @param instance The candidate.
        */
        isEquivalent(instance: fm.icelink.CandidateStats): boolean;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /** @hidden */
        setIPAddress(value: string): void;
        /** @hidden */
        setPort(value: number): void;
        /** @hidden */
        setPriority(value: number): void;
        /** @hidden */
        setProtocol(value: fm.icelink.ProtocolType): void;
        /** @hidden */
        setRelatedIPAddress(value: string): void;
        /** @hidden */
        setRelatedPort(value: number): void;
        /** @hidden */
        setRelayProtocol(value: fm.icelink.ProtocolType): void;
        /** @hidden */
        setType(value: fm.icelink.CandidateType): void;
        /**
        Serializes this to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    class CandidateTypeWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.CandidateType);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    Utility functions for candidate and candidate pair.
    */
    class CandidateUtility {
        getTypeString(): string;
        constructor();
        /**
        Convert string to CandidatePairState.
        @param stateString
        */
        static candidatePairStateFromString(stateString: string): fm.icelink.CandidatePairState;
        /**
        Convert CandidatePairState to string.
        @param state
        */
        static candidatePairStateToString(state: fm.icelink.CandidatePairState): string;
        /**
        Convert string to ProtocolType.
        @param protocolTypeString
        */
        static protocolTypeFromString(protocolTypeString: string): fm.icelink.ProtocolType;
        /**
        Convert ProtocolType to string.
        @param protocolType
        */
        static protocolTypeToString(protocolType: fm.icelink.ProtocolType): string;
        /**
        Convert string to CandidateType.
        @param typeString
        */
        static typeFromString(typeString: string): fm.icelink.CandidateType;
        /**
        Convert CandidateType to string.
        @param type
        */
        static typeToString(type: fm.icelink.CandidateType): string;
    }
}
declare namespace fm.icelink {
    /**
    Certificate information.
    */
    class CertificateInfo extends fm.icelink.Info {
        getTypeString(): string;
        /** @hidden */
        private _base64;
        /** @hidden */
        private _fingerprint;
        /** @hidden */
        private _fingerprintAlgorithm;
        /**
        Initializes a new instance of the [[fm.icelink.certificateInfo]] class.
        */
        constructor();
        constructor(stats: fm.icelink.CertificateStats, lastStats: fm.icelink.CertificateStats);
        /**
        Deserializes an instance from JSON.
        @param instanceJson The instance JSON.
        @return The deserialized instance.
        */
        static fromJson(instanceJson: string): fm.icelink.CertificateInfo;
        /**
        Derializes an array from JSON.
        @param arrayJson The array JSON.
        @return The deserialized array.
        */
        static fromJsonArray(arrayJson: string): fm.icelink.CertificateInfo[];
        /**
        Serializes an instance to JSON.
        @param instance The instance.
        @return The serialized instance JSON.
        */
        static toJson(instance: fm.icelink.CertificateInfo): string;
        /**
        Serializes an array to JSON.
        @param array The array.
        @return The serialized array JSON.
        */
        static toJsonArray(array: fm.icelink.CertificateInfo[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the certificate in Base64 format.
        */
        getBase64(): string;
        /**
        Gets the certificate fingerprint.
        */
        getFingerprint(): string;
        /**
        Gets the certificate fingerprint algorithm.
        */
        getFingerprintAlgorithm(): string;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets the certificate in Base64 format.
        */
        setBase64(value: string): void;
        /**
        Sets the certificate fingerprint.
        */
        setFingerprint(value: string): void;
        /**
        Sets the certificate fingerprint algorithm.
        */
        setFingerprintAlgorithm(value: string): void;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Certificate stats.
    */
    class CertificateStats extends fm.icelink.BaseStats implements fm.icelink.IEquivalent<fm.icelink.CertificateStats> {
        getTypeString(): string;
        /** @hidden */
        private _certificateBase64;
        /** @hidden */
        private _fingerprint;
        /** @hidden */
        private _fingerprintAlgorithm;
        constructor();
        /**
        Derializes certificate stats from JSON.
        @param certificateJson The certificate's stats JSON.
        */
        static fromJson(certificateJson: string): fm.icelink.CertificateStats;
        /**
        Derializes an array of certificate stats from JSON.
        @param certificatesJson The certificates' stats JSON.
        */
        static fromJsonArray(certificatesJson: string): fm.icelink.CertificateStats[];
        /**
        Serializes certificate stats to JSON.
        @param certificate The certificate's stats.
        */
        static toJson(certificate: fm.icelink.CertificateStats): string;
        /**
        Serializes an array of certificate stats to JSON.
        @param certificates The certificates' stats.
        */
        static toJsonArray(certificates: fm.icelink.CertificateStats[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the certificate in Base64 format.
        */
        getCertificateBase64(): string;
        /**
        Gets the fingerprint.
        */
        getFingerprint(): string;
        /**
        Gets the fingerprint algorithm.
        */
        getFingerprintAlgorithm(): string;
        /**
        Checks if a certificate is equivalent to this one.
        @param instance The certificate.
        */
        isEquivalent(instance: fm.icelink.CertificateStats): boolean;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /** @hidden */
        setCertificateBase64(value: string): void;
        /** @hidden */
        setFingerprint(value: string): void;
        /** @hidden */
        setFingerprintAlgorithm(value: string): void;
        /**
        Serializes this to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Codec information.
    */
    class CodecInfo extends fm.icelink.Info {
        getTypeString(): string;
        /** @hidden */
        private _channelCount;
        /** @hidden */
        private _clockRate;
        /** @hidden */
        private _name;
        /** @hidden */
        private _parameters;
        /** @hidden */
        private _payloadType;
        private fmicelinkCodecInfoInit;
        constructor();
        /**
        Deserializes an instance from JSON.
        @param codecInfoJson The serialized JSON.
        @return The deserialized instance.
        */
        static fromJson(codecInfoJson: string): fm.icelink.CodecInfo;
        /**
        Deserializes an array from JSON.
        @param codecInfosJson The serialized JSON.
        @return The deserialized array.
        */
        static fromJsonArray(codecInfosJson: string): fm.icelink.CodecInfo[];
        /**
        Serializes an instance to JSON.
        @param codecInfo The instance to serialize.
        @return The serialized JSON.
        */
        static toJson(codecInfo: fm.icelink.CodecInfo): string;
        /**
        Serializes an array to JSON.
        @param codecInfos The array to serialize.
        @return The serialized JSON.
        */
        static toJsonArray(codecInfos: fm.icelink.CodecInfo[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the codec channel count.
        */
        getChannelCount(): number;
        /**
        Gets the codec clock rate.
        */
        getClockRate(): number;
        /**
        Gets the codec name.
        */
        getName(): string;
        /**
        Gets the codec parameters.
        */
        getParameters(): string;
        /**
        Gets the codec payload type.
        */
        getPayloadType(): number;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets the codec channel count.
        */
        setChannelCount(value: number): void;
        /**
        Sets the codec clock rate.
        */
        setClockRate(value: number): void;
        /**
        Sets the codec name.
        */
        setName(value: string): void;
        /**
        Sets the codec parameters.
        */
        setParameters(value: string): void;
        /**
        Sets the codec payload type.
        */
        setPayloadType(value: number): void;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Codec stats.
    */
    class CodecStats extends fm.icelink.BaseStats implements fm.icelink.IEquivalent<fm.icelink.CodecStats> {
        getTypeString(): string;
        /** @hidden */
        private _channelCount;
        /** @hidden */
        private _clockRate;
        /** @hidden */
        private _codecType;
        /** @hidden */
        private _name;
        /** @hidden */
        private _parameters;
        /** @hidden */
        private _payloadType;
        private fmicelinkCodecStatsInit;
        constructor();
        /**
        Derializes codec stats from JSON.
        @param codecJson The codec's stats JSON.
        */
        static fromJson(codecJson: string): fm.icelink.CodecStats;
        /**
        Serializes codec stats to JSON.
        @param codec The codec's stats.
        */
        static toJson(codec: fm.icelink.CodecStats): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the channel count.
        */
        getChannelCount(): number;
        /**
        Gets the clock rate.
        */
        getClockRate(): number;
        /**
        Gets the codec type, "encode" or "decode", depending on whether this object represents a media format that the implementation is prepared to encode or decode.
        */
        getCodecType(): fm.icelink.CodecType;
        /**
        Gets the name.
        */
        getName(): string;
        /**
        Gets the parameters.
        */
        getParameters(): string;
        /**
        Gets the payload type.
        */
        getPayloadType(): number;
        /**
        Checks if a codec is equivalent to this one.
        @param instance The codec.
        */
        isEquivalent(instance: fm.icelink.CodecStats): boolean;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /** @hidden */
        setChannelCount(value: number): void;
        /** @hidden */
        setClockRate(value: number): void;
        /** @hidden */
        setCodecType(value: fm.icelink.CodecType): void;
        /** @hidden */
        setName(value: string): void;
        /** @hidden */
        setParameters(value: string): void;
        /** @hidden */
        setPayloadType(value: number): void;
        /**
        Serializes this to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    class CodecTypeWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.CodecType);
        toString(): string;
    }
}
declare namespace fm.icelink {
    class ConnectionStateWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.ConnectionState);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    Connection stats.
    */
    class ConnectionStats extends fm.icelink.BaseStats {
        getTypeString(): string;
        /** @hidden */
        private _dataStream;
        /** @hidden */
        private _externalId;
        /** @hidden */
        private _mediaStreams;
        /** @hidden */
        private _state;
        constructor();
        /**
        Derializes connection stats from JSON.
        @param connectionJson The connection's stats JSON.
        */
        static fromJson(connectionJson: string): fm.icelink.ConnectionStats;
        /**
        Serializes connection stats to JSON.
        @param connection The connection's stats.
        */
        static toJson(connection: fm.icelink.ConnectionStats): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the first audio stream's stats.
        */
        getAudioStream(): fm.icelink.MediaStreamStats;
        /**
        Gets the audio streams' stats.
        */
        getAudioStreams(): fm.icelink.MediaStreamStats[];
        /**
        Gets the data stream's stats.
        */
        getDataStream(): fm.icelink.DataStreamStats;
        /**
        Gets the external identifier.
        */
        getExternalId(): string;
        /**
        Gets whether any of the streams are using a transport whose active candidate pair has a host candidate.
        */
        getIsHost(): boolean;
        /**
        Gets whether any of the streams are using a transport whose active candidate pair has a reflexive candidate.
        */
        getIsReflexive(): boolean;
        /**
        Gets whether any of the streams are using a transport whose active candidate pair has a relayed candidate.
        */
        getIsRelayed(): boolean;
        /**
        Gets the first media stream's stats.
        */
        getMediaStream(): fm.icelink.MediaStreamStats;
        /**
        Gets a media stream by its identifier.
        @param mediaStreamId The media stream identifier.
        */
        getMediaStream(mediaStreamId: string): fm.icelink.MediaStreamStats;
        /**
        Gets the media streams' stats.
        */
        getMediaStreams(): fm.icelink.MediaStreamStats[];
        /**
        Gets the state.
        */
        getState(): fm.icelink.ConnectionState;
        /**
        Gets the streams' stats.
        */
        getStreams(): fm.icelink.StreamStats[];
        /**
        Gets the first video stream's stats.
        */
        getVideoStream(): fm.icelink.MediaStreamStats;
        /**
        Gets the video streams' stats.
        */
        getVideoStreams(): fm.icelink.MediaStreamStats[];
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /** @hidden */
        setDataStream(value: fm.icelink.DataStreamStats): void;
        /**
        Sets the external identifier.
        */
        setExternalId(value: string): void;
        /** @hidden */
        setMediaStreams(value: fm.icelink.MediaStreamStats[]): void;
        /**
        Sets the state.
        */
        setState(value: fm.icelink.ConnectionState): void;
        /** @hidden */
        private stateFromString;
        /** @hidden */
        private stateToString;
        /**
        Serializes this to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Data channel information.
    */
    class DataChannelInfo extends fm.icelink.Info {
        getTypeString(): string;
        /** @hidden */
        private _label;
        /** @hidden */
        private _ordered;
        /** @hidden */
        private _subprotocol;
        private fmicelinkDataChannelInfoInit;
        constructor();
        /**
        Deserializes Json to a DataChannelInfo.
        @param dataChannelInfoJson The serialized Json.
        @return The deserialized DataChannelInfo.
        */
        static fromJson(dataChannelInfoJson: string): fm.icelink.DataChannelInfo;
        /**
        Deserializes JSON to an array.
        @param dataChannelInfosJson The serialized JSON.
        @return The deserialized array.
        */
        static fromJsonArray(dataChannelInfosJson: string): fm.icelink.DataChannelInfo[];
        /**
        Serializes an instance to Json.
        @param dataChannelInfo The instance to serialize.
        @return Serialized Json.
        */
        static toJson(dataChannelInfo: fm.icelink.DataChannelInfo): string;
        /**
        Serializes an array to JSON.
        @param dataChannelInfos The array to serialize.
        @return The serialized JSON.
        */
        static toJsonArray(dataChannelInfos: fm.icelink.DataChannelInfo[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the data channel label.
        */
        getLabel(): string;
        /**
        Gets whether the data channel is ordered.
        */
        getOrdered(): boolean;
        /**
        Gets the data channel subprotocol.
        */
        getSubprotocol(): string;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets the data channel label.
        */
        setLabel(value: string): void;
        /**
        Sets whether the data channel is ordered.
        */
        setOrdered(value: boolean): void;
        /**
        Sets the data channel subprotocol.
        */
        setSubprotocol(value: string): void;
        /**
        Serializes this instance to Json.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    class DataChannelStateWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.DataChannelState);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    Data channel stats.
    */
    class DataChannelStats extends fm.icelink.BaseStats {
        getTypeString(): string;
        /** @hidden */
        private _bytesReceived;
        /** @hidden */
        private _bytesSent;
        /** @hidden */
        private _label;
        /** @hidden */
        private _messagesReceived;
        /** @hidden */
        private _messagesSent;
        /** @hidden */
        private _ordered;
        /** @hidden */
        private _protocol;
        /** @hidden */
        private _state;
        private fmicelinkDataChannelStatsInit;
        /**
        Initializes a new instance of [[fm.icelink.dataChannelStats]].
        */
        constructor();
        /**
        Derializes data channel stats from JSON.
        @param dataChannelJson The data channel's stats JSON.
        */
        static fromJson(dataChannelJson: string): fm.icelink.DataChannelStats;
        /**
        Derializes an array of data channel stats from JSON.
        @param dataChannelsJson The data channels' stats JSON.
        */
        static fromJsonArray(dataChannelsJson: string): fm.icelink.DataChannelStats[];
        /**
        Serializes data channel stats to JSON.
        @param dataChannel The data channel's stats.
        */
        static toJson(dataChannel: fm.icelink.DataChannelStats): string;
        /**
        Serializes an array of data channel stats to JSON.
        @param dataChannels The data channels' stats.
        */
        static toJsonArray(dataChannels: fm.icelink.DataChannelStats[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the number of bytes received.
        */
        getBytesReceived(): number;
        /**
        Gets the number of bytes sent.
        */
        getBytesSent(): number;
        /**
        Gets the label.
        */
        getLabel(): string;
        /**
        Gets the number of messages received.
        */
        getMessagesReceived(): number;
        /**
        Gets the number of messages sent.
        */
        getMessagesSent(): number;
        /**
        Gets whether the channel is ordered.
        */
        getOrdered(): boolean;
        /**
        Gets the protocol.
        */
        getProtocol(): string;
        /**
        Gets the state.
        */
        getState(): fm.icelink.DataChannelState;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /** @hidden */
        setBytesReceived(value: number): void;
        /** @hidden */
        setBytesSent(value: number): void;
        /** @hidden */
        setLabel(value: string): void;
        /** @hidden */
        setMessagesReceived(value: number): void;
        /** @hidden */
        setMessagesSent(value: number): void;
        /** @hidden */
        setOrdered(value: boolean): void;
        /** @hidden */
        setProtocol(value: string): void;
        /** @hidden */
        setState(value: fm.icelink.DataChannelState): void;
        /** @hidden */
        private stateFromString;
        /** @hidden */
        private stateToString;
        /**
        Serializes this to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Stream information.
    */
    abstract class StreamInfo extends fm.icelink.Info {
        getTypeString(): string;
        /** @hidden */
        private _tag;
        /** @hidden */
        private _transportId;
        constructor();
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the tag.
        */
        getTag(): string;
        /**
        Gets the transport id.
        */
        getTransportId(): string;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets the tag.
        */
        setTag(value: string): void;
        /**
        Sets the transport id.
        */
        setTransportId(value: string): void;
    }
}
declare namespace fm.icelink {
    /**
    Data stream information.
    */
    class DataStreamInfo extends fm.icelink.StreamInfo {
        getTypeString(): string;
        /** @hidden */
        private _channels;
        constructor();
        /**
        Deserializes Json to a DataStreamInfo.
        @param dataStreamInfoJson The serialized Json.
        @return The deserialized DataStreamInfo.
        */
        static fromJson(dataStreamInfoJson: string): fm.icelink.DataStreamInfo;
        /**
        Deserializes JSON to a DataStreamInfo array.
        @param dataStreamInfosJson The serialized JSON.
        @return The deserialized DataStreamInfo array.
        */
        static fromJsonArray(dataStreamInfosJson: string): fm.icelink.DataStreamInfo[];
        /**
        Serializes an instance to Json.
        @param dataStreamInfo The instance to serialize.
        @return Serialized Json.
        */
        static toJson(dataStreamInfo: fm.icelink.DataStreamInfo): string;
        /**
        Serializes an instance array to JSON.
        @param dataStreamInfos The instance array to serialize.
        @return Serialized Json.
        */
        static toJsonArray(dataStreamInfos: fm.icelink.DataStreamInfo[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the data stream channels.
        */
        getChannels(): fm.icelink.DataChannelInfo[];
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets the data stream channels.
        */
        setChannels(value: fm.icelink.DataChannelInfo[]): void;
        /**
        Serializes this instance to Json.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Stream stats.
    */
    abstract class StreamStats extends fm.icelink.BaseStats {
        getTypeString(): string;
        /** @hidden */
        private _transport;
        /** @hidden */
        private _type;
        constructor();
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets whether the transport's active candidate pair has a host candidate.
        */
        getIsHost(): boolean;
        /**
        Gets whether the transport's active candidate pair has a reflexive candidate.
        */
        getIsReflexive(): boolean;
        /**
        Gets whether the transport's active candidate pair has a relayed candidate.
        */
        getIsRelayed(): boolean;
        /**
        Gets the transport's stats.
        */
        getTransport(): fm.icelink.TransportStats;
        /**
        Gets the type.
        */
        getType(): fm.icelink.StreamType;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /** @hidden */
        setTransport(value: fm.icelink.TransportStats): void;
        /** @hidden */
        setType(value: fm.icelink.StreamType): void;
        /** @hidden */
        private typeFromString;
        /** @hidden */
        private typeToString;
    }
}
declare namespace fm.icelink {
    /**
    Data stream stats.
    */
    class DataStreamStats extends fm.icelink.StreamStats {
        getTypeString(): string;
        /** @hidden */
        private _bytesReceived;
        /** @hidden */
        private _bytesSent;
        /** @hidden */
        private _channels;
        /** @hidden */
        private _messagesReceived;
        /** @hidden */
        private _messagesSent;
        private fmicelinkDataStreamStatsInit;
        constructor();
        /**
        Derializes data stream stats from JSON.
        @param dataStreamJson The data stream's stats JSON.
        */
        static fromJson(dataStreamJson: string): fm.icelink.DataStreamStats;
        /**
        Derializes an array of data stream stats from JSON.
        @param dataStreamsJson The data streams' stats JSON.
        */
        static fromJsonArray(dataStreamsJson: string): fm.icelink.DataStreamStats[];
        /**
        Serializes data stream stats to JSON.
        @param dataStream The data stream's stats.
        */
        static toJson(dataStream: fm.icelink.DataStreamStats): string;
        /**
        Serializes an array of data stream stats to JSON.
        @param dataStreams The data streams' stats.
        */
        static toJsonArray(dataStreams: fm.icelink.DataStreamStats[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the number of bytes received.
        */
        getBytesReceived(): number;
        /**
        Gets the number of bytes sent.
        */
        getBytesSent(): number;
        /**
        Gets the first channel's stats.
        */
        getChannel(): fm.icelink.DataChannelStats;
        /**
        Gets a channel by its identifier.
        @param channelId The channel identifier.
        */
        getChannel(channelId: string): fm.icelink.DataChannelStats;
        /**
        Gets the channels' stats.
        */
        getChannels(): fm.icelink.DataChannelStats[];
        /**
        Gets the first channel's stats. Obsolete. Alias for [[fm.icelink.dataStreamStats.channel]].
        */
        getDataChannel(): fm.icelink.DataChannelStats;
        /**
        Gets a channel by its identifier. Obsolete. Alias for GetChannel.
        @param dataChannelId The channel identifier.
        */
        getDataChannel(dataChannelId: string): fm.icelink.DataChannelStats;
        /**
        Gets the channels' stats. Obsolete. Alias for [[fm.icelink.dataStreamStats.channels]].
        */
        getDataChannels(): fm.icelink.DataChannelStats[];
        /**
        Gets the number of messages received.
        */
        getMessagesReceived(): number;
        /**
        Gets the number of messages sent.
        */
        getMessagesSent(): number;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /** @hidden */
        setBytesReceived(value: number): void;
        /** @hidden */
        setBytesSent(value: number): void;
        /** @hidden */
        setChannels(value: fm.icelink.DataChannelStats[]): void;
        /** @hidden */
        setMessagesReceived(value: number): void;
        /** @hidden */
        setMessagesSent(value: number): void;
        /**
        Serializes this to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Encoding configuration.
    */
    abstract class EncodingConfig {
        getTypeString(): string;
        /** @hidden */
        private _bitrate;
        /** @hidden */
        private _deactivated;
        /** @hidden */
        private _rtpStreamId;
        /** @hidden */
        private _synchronizationSource;
        private fmicelinkEncodingConfigInit;
        /**
        Initializes a new instance of the [[fm.icelink.encodingConfig]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.encodingConfig]] class.
        @param encoding The encoding.
        */
        constructor(encoding: fm.icelink.EncodingInfo);
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the bitrate, in kbps.
        */
        getBitrate(): number;
        /**
        Gets whether this encoding is deactivated.
        */
        getDeactivated(): boolean;
        /**
        Gets the RTP stream identifier.
        */
        getRtpStreamId(): string;
        /**
        Gets the synchronization source.
        */
        getSynchronizationSource(): number;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets the bitrate, in kbps.
        */
        setBitrate(value: number): void;
        /**
        Sets whether this encoding is deactivated.
        */
        setDeactivated(value: boolean): void;
        /** @hidden */
        setRtpStreamId(value: string): void;
        /** @hidden */
        setSynchronizationSource(value: number): void;
    }
}
declare namespace fm.icelink {
    /**
    Audio encoding configuration.
    */
    class AudioEncodingConfig extends fm.icelink.EncodingConfig {
        getTypeString(): string;
        /**
        Initializes a new instance of the [[fm.icelink.audioEncodingConfig]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.audioEncodingConfig]] class.
        @param encoding The encoding.
        */
        constructor(encoding: fm.icelink.EncodingInfo);
        /**
        Deserializes an instance from JSON.
        @param encodingConfigJson The serialized JSON.
        @return The deserialized instance.
        */
        static fromJson(encodingConfigJson: string): fm.icelink.AudioEncodingConfig;
        /**
        Deserializes an array from JSON.
        @param encodingConfigsJson The serialized JSON.
        @return The deserialized array.
        */
        static fromJsonArray(encodingConfigsJson: string): fm.icelink.AudioEncodingConfig[];
        /**
        Serializes an instance to JSON.
        @param encodingConfig The instance to serialize.
        @return The serialized JSON.
        */
        static toJson(encodingConfig: fm.icelink.AudioEncodingConfig): string;
        /**
        Serializes an array to JSON.
        @param encodingConfigs The array to serialize.
        @return The serialized JSON.
        */
        static toJsonArray(encodingConfigs: fm.icelink.AudioEncodingConfig[]): string;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
        /**
        Returns a string that represents this instance.
        @return
                    A string that represents this instance.
            
        */
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    A stream description.
    */
    class StreamDescription {
        getTypeString(): string;
        /** @hidden */
        private _mediaDescription;
        /**
        Creates a new StreamDescription object.
        @param description SDP MediaDescription of the stream.
        */
        constructor(description: fm.icelink.sdp.MediaDescription);
        /**
        Gets the media description associated with this stream.
        */
        getMediaDescription(): fm.icelink.sdp.MediaDescription;
        /**
        Gets the mid associated with this stream, if present. Null if not.
        */
        getMediaDescriptionIdentifier(): string;
        /**
        Gets the stream type.
        */
        getStreamType(): fm.icelink.StreamType;
        /**
        Sets the media description associated with this stream.
        */
        setMediaDescription(value: fm.icelink.sdp.MediaDescription): void;
    }
}
declare namespace fm.icelink {
    /**
    Video encoding configuration.
    */
    class VideoEncodingConfig extends fm.icelink.EncodingConfig {
        getTypeString(): string;
        /** @hidden */
        private _frameRate;
        /** @hidden */
        private _scale;
        private fmicelinkVideoEncodingConfigInit;
        /**
        Initializes a new instance of the [[fm.icelink.videoEncodingConfig]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.videoEncodingConfig]] class.
        @param encoding The encoding.
        */
        constructor(encoding: fm.icelink.EncodingInfo);
        /**
        Deserializes an instance from JSON.
        @param encodingConfigJson The serialized JSON.
        @return The deserialized instance.
        */
        static fromJson(encodingConfigJson: string): fm.icelink.VideoEncodingConfig;
        /**
        Deserializes an array from JSON.
        @param encodingConfigsJson The serialized JSON.
        @return The deserialized array.
        */
        static fromJsonArray(encodingConfigsJson: string): fm.icelink.VideoEncodingConfig[];
        /**
        Serializes an instance to JSON.
        @param encodingConfig The instance to serialize.
        @return The serialized JSON.
        */
        static toJson(encodingConfig: fm.icelink.VideoEncodingConfig): string;
        /**
        Serializes an array to JSON.
        @param encodingConfigs The array to serialize.
        @return The serialized JSON.
        */
        static toJsonArray(encodingConfigs: fm.icelink.VideoEncodingConfig[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the frame-rate, in fps.
        */
        getFrameRate(): number;
        /**
        Gets the target scale.
        */
        getScale(): number;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets the frame-rate, in fps.
        */
        setFrameRate(value: number): void;
        /**
        Sets the target scale.
        */
        setScale(value: number): void;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
        /**
        Returns a string that represents this instance.
        @return
                    A string that represents this instance.
            
        */
        toString(): string;
    }
}
declare namespace fm.icelink {
    class EncryptionModeWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.EncryptionMode);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    Format information.
    */
    class FormatInfo implements fm.icelink.IEquivalent<fm.icelink.FormatInfo> {
        getTypeString(): string;
        /** @hidden */
        private _channelCount;
        /** @hidden */
        private _clockRate;
        /** @hidden */
        private _name;
        private fmicelinkFormatInfoInit;
        /**
        Creates a new instance of a FormatInfo.
        */
        constructor();
        /**
        Creates an instance of a FormatInfo from an AudioFormat.
        @param audioFormat The audio format.
        */
        constructor(audioFormat: fm.icelink.AudioFormat);
        /**
        Creates a new instance of a FormatInfo.
        @param codecName The codec name.
        @param clockRate The clock rate.
        */
        constructor(codecName: string, clockRate: number);
        /**
        Creates a new instance of a FormatInfo.
        @param name The name.
        @param clockRate The clock rate.
        @param channelCount The channel count.
        */
        constructor(name: string, clockRate: number, channelCount: number);
        /**
        Creates an instance of a FormatInfo from a VideoFormat.
        @param videoFormat The video format.
        */
        constructor(videoFormat: fm.icelink.VideoFormat);
        /**
        Deserializes Json to a FormatInfo.
        @param formatInfoJson The serialized Json.
        @return The deserialized FormatInfo.
        */
        static fromJson(formatInfoJson: string): fm.icelink.FormatInfo;
        /**
        Derializes an array of format infos from JSON.
        @param formatInfosJson The format infos in JSON format.
        */
        static fromJsonArray(formatInfosJson: string): fm.icelink.FormatInfo[];
        /**
        Converts the RTP map attributes in an SDP media description to an array of FormatInfo objects.
        @param sdpMediaDescription The SDP media description.
        @return An array of FormatInfo objects.
        */
        static fromSdpMediaDescription(sdpMediaDescription: fm.icelink.sdp.MediaDescription): fm.icelink.FormatInfo[];
        /**
        Serializes an instance to Json.
        @param formatInfo The instance to serialize.
        @return Serialized Json.
        */
        static toJson(formatInfo: fm.icelink.FormatInfo): string;
        /**
        Serializes an array of format infos to JSON.
        @param formatInfos The format infos.
        */
        static toJsonArray(formatInfos: fm.icelink.FormatInfo[]): string;
        /**
        Gets the channel count if available. Unused for video codecs.
        */
        getChannelCount(): number;
        /**
        Gets the clock rate.
        */
        getClockRate(): number;
        /**
        Gets the name. Obsolete. Alias for [[fm.icelink.formatInfo.name]].
        */
        getCodecName(): string;
        /**
        Gets the name.
        */
        getName(): string;
        /**
        Checks if an instance is equivalent to this one.
        @param instance The instance.
        */
        isEquivalent(instance: fm.icelink.FormatInfo): boolean;
        /**
        Tests for equivalency.
        @param channelCount The channel count.
        @param clockRate The clock rate.
        @param name The format name.
        @return `true` if equivalent; otherwise, `false`.
            
        */
        isEquivalent(name: string, clockRate: number, channelCount: number): boolean;
        /**
        Sets the channel count if available. Unused for video codecs.
        */
        setChannelCount(value: number): void;
        /**
        Sets the clock rate.
        */
        setClockRate(value: number): void;
        /**
        Sets the name. Obsolete. Alias for [[fm.icelink.formatInfo.name]].
        */
        setCodecName(value: string): void;
        /**
        Sets the name.
        */
        setName(value: string): void;
        /**
        Serializes this instance to Json.
        */
        toJson(): string;
        /**
        Returns a string that represents this instance.
        */
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    A layout frame definition, including X/Y coordinates and width/height values.
    */
    class LayoutFrame {
        getTypeString(): string;
        /** @hidden */
        private _height;
        /** @hidden */
        private _viewId;
        /** @hidden */
        private _width;
        /** @hidden */
        private _x;
        /** @hidden */
        private _y;
        private fmicelinkLayoutFrameInit;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.layoutFrame]] class.
        @param x The X coordinate.
        @param y The Y coordinate.
        @param width The width value.
        @param height The height value.
        */
        constructor(x: number, y: number, width: number, height: number);
        /**
        Deserializes a layout frame from JSON.
        @param layoutFrameJson The layout frame JSON.
        */
        static fromJson(layoutFrameJson: string): fm.icelink.LayoutFrame;
        /**
        Gets a scaled frame.
        @param scale The scaling algorithm to use.
        @param outerWidth The width of the outer container.
        @param outerHeight The height of the outer container.
        @param innerWidth The width of the inner element.
        @param innerHeight The height of the inner element.
        */
        static getScaledFrame(scale: fm.icelink.LayoutScale, outerWidth: number, outerHeight: number, innerWidth: number, innerHeight: number): fm.icelink.LayoutFrame;
        /**
        Serializes a layout frame to JSON.
        @param layoutFrame The layout frame.
        */
        static toJson(layoutFrame: fm.icelink.LayoutFrame): string;
        /**
        Gets the height value.
        */
        getHeight(): number;
        /**
        Gets the view ID.
        */
        getViewId(): string;
        /**
        Gets the width value.
        */
        getWidth(): number;
        /**
        Gets the X coordinate.
        */
        getX(): number;
        /**
        Gets the Y coordinate.
        */
        getY(): number;
        /**
        Determines whether the specified layout frame is equivalent.
        @param layoutFrame The layout frame.
        */
        isEquivalent(layoutFrame: fm.icelink.LayoutFrame): boolean;
        /**
        Sets the height value.
        */
        setHeight(value: number): void;
        /**
        Sets the view ID.
        */
        setViewId(value: string): void;
        /**
        Sets the width value.
        */
        setWidth(value: number): void;
        /**
        Sets the X coordinate.
        */
        setX(value: number): void;
        /**
        Sets the Y coordinate.
        */
        setY(value: number): void;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    class LayoutScaleWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.LayoutScale);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    Media component information.
    */
    class MediaComponentInfo extends fm.icelink.Info {
        getTypeString(): string;
        /** @hidden */
        private _codec;
        /** @hidden */
        private _synchronizationSource;
        /** @hidden */
        private _track;
        private fmicelinkMediaComponentInfoInit;
        /**
        Initializes a new instance of the [[fm.icelink.mediaComponentInfo]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.mediaComponentInfo]] class.
        @param stats
        @param lastStats
        */
        constructor(stats: fm.icelink.MediaComponentStats, lastStats: fm.icelink.MediaComponentStats);
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets codec.
        */
        getCodec(): fm.icelink.CodecInfo;
        /**
        Gets synchronization source of media track.
        */
        getSynchronizationSource(): number;
        /**
        Gets track.
        */
        getTrack(): fm.icelink.MediaTrackInfo;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets codec.
        */
        setCodec(value: fm.icelink.CodecInfo): void;
        /**
        Sets synchronization source of media track.
        */
        setSynchronizationSource(value: number): void;
        /**
        Sets track.
        */
        setTrack(value: fm.icelink.MediaTrackInfo): void;
    }
}
declare namespace fm.icelink {
    /**
    Media component stats.
    */
    abstract class MediaComponentStats extends fm.icelink.BaseStats {
        getTypeString(): string;
        /** @hidden */
        private _codec;
        /** @hidden */
        private _firCount;
        /** @hidden */
        private _lrrCount;
        /** @hidden */
        private _nackCount;
        /** @hidden */
        private _pliCount;
        /** @hidden */
        private _repairedRtpStreamId;
        /** @hidden */
        private _rtpStreamId;
        /** @hidden */
        private _sliCount;
        /** @hidden */
        private _synchronizationSource;
        /** @hidden */
        private _track;
        private fmicelinkMediaComponentStatsInit;
        constructor();
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the codec stats.
        */
        getCodec(): fm.icelink.CodecStats;
        /**
        Gets the FIR count.
        */
        getFirCount(): number;
        /**
        Gets the LRR count.
        */
        getLrrCount(): number;
        /**
        Gets the NACK count.
        */
        getNackCount(): number;
        /**
        Gets the PLI count.
        */
        getPliCount(): number;
        /**
        Gets the repaired RTP stream identifier.
        */
        getRepairedRtpStreamId(): string;
        /**
        Gets the RTP stream identifier.
        */
        getRtpStreamId(): string;
        /**
        Gets the SLI count.
        */
        getSliCount(): number;
        /**
        Gets the synchronization source.
        */
        getSynchronizationSource(): number;
        /**
        Gets the track's stats.
        */
        getTrack(): fm.icelink.MediaTrackStats;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets the codec stats.
        */
        setCodec(value: fm.icelink.CodecStats): void;
        /**
        Sets the FIR count.
        */
        setFirCount(value: number): void;
        /**
        Sets the LRR count.
        */
        setLrrCount(value: number): void;
        /**
        Sets the NACK count.
        */
        setNackCount(value: number): void;
        /**
        Sets the PLI count.
        */
        setPliCount(value: number): void;
        /**
        Sets the repaired RTP stream identifier.
        */
        setRepairedRtpStreamId(value: string): void;
        /**
        Sets the RTP stream identifier.
        */
        setRtpStreamId(value: string): void;
        /**
        Sets the SLI count.
        */
        setSliCount(value: number): void;
        /**
        Sets the synchronization source.
        */
        setSynchronizationSource(value: number): void;
        /**
        Sets the track's stats.
        */
        setTrack(value: fm.icelink.MediaTrackStats): void;
    }
}
declare namespace fm.icelink {
    /**
    Media receiver information.
    */
    class MediaReceiverInfo extends fm.icelink.MediaComponentInfo {
        getTypeString(): string;
        /** @hidden */
        private _sink;
        /**
        Initializes a new instance of the [[fm.icelink.mediaReceiverInfo]] class.
        */
        constructor();
        constructor(stats: fm.icelink.MediaReceiverStats, lastStats: fm.icelink.MediaReceiverStats);
        /**
        Deserializes an instance from JSON.
        @param mediaReceiverJson The serialized JSON.
        @return The deserialized instance.
        */
        static fromJson(mediaReceiverJson: string): fm.icelink.MediaReceiverInfo;
        /**
        Deserializes an array from JSON.
        @param mediaReceiversJson The serialized JSON.
        @return The deserialized array.
        */
        static fromJsonArray(mediaReceiversJson: string): fm.icelink.MediaReceiverInfo[];
        /**
        Serializes an instance to JSON.
        @param mediaReceiver The instance to serialize.
        @return The serialized JSON.
        */
        static toJson(mediaReceiver: fm.icelink.MediaReceiverInfo): string;
        /**
        Serializes an array to JSON.
        @param mediaReceivers The array to serialize.
        @return The serialized JSON.
        */
        static toJsonArray(mediaReceivers: fm.icelink.MediaReceiverInfo[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets sink.
        */
        getSink(): fm.icelink.MediaSinkInfo;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets sink.
        */
        setSink(value: fm.icelink.MediaSinkInfo): void;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Media receiver stats.
    */
    class MediaReceiverStats extends fm.icelink.MediaComponentStats implements fm.icelink.IEquivalent<fm.icelink.MediaReceiverStats> {
        getTypeString(): string;
        /** @hidden */
        private _bytesReceived;
        /** @hidden */
        private _jitter;
        /** @hidden */
        private _packetsDiscarded;
        /** @hidden */
        private _packetsDuplicated;
        /** @hidden */
        private _packetsLost;
        /** @hidden */
        private _packetsReceived;
        /** @hidden */
        private _packetsRepaired;
        /** @hidden */
        private _sink;
        private fmicelinkMediaReceiverStatsInit;
        constructor();
        /**
        Derializes media receiver stats from JSON.
        @param mediaReceiverJson The media receiver's stats JSON.
        */
        static fromJson(mediaReceiverJson: string): fm.icelink.MediaReceiverStats;
        /**
        Derializes media receiver stats array from JSON.
        @param mediaReceiversJson The media receivers' stats JSON.
        */
        static fromJsonArray(mediaReceiversJson: string): fm.icelink.MediaReceiverStats[];
        /**
        Serializes media receiver stats to JSON.
        @param mediaReceiver The media receiver's stats.
        */
        static toJson(mediaReceiver: fm.icelink.MediaReceiverStats): string;
        /**
        Serializes media receiver stats array to JSON.
        @param mediaReceivers The media receivers' stats.
        */
        static toJsonArray(mediaReceivers: fm.icelink.MediaReceiverStats[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the number of bytes received.
        */
        getBytesReceived(): number;
        /**
        Gets the jitter in milliseconds.
        */
        getJitter(): number;
        /**
        Gets the number of packets discarded.
        */
        getPacketsDiscarded(): number;
        /**
        Gets the number of packets duplicated.
        */
        getPacketsDuplicated(): number;
        /**
        Gets the number of packets lost.
        */
        getPacketsLost(): number;
        /**
        Gets the number of packets received.
        */
        getPacketsReceived(): number;
        /**
        Gets the number of packets repaired.
        */
        getPacketsRepaired(): number;
        /**
        Gets the sink stats.
        */
        getSink(): fm.icelink.MediaSinkStats;
        /**
        Checks if a media receiver is equivalent to this one.
        @param instance The media receiver.
        */
        isEquivalent(instance: fm.icelink.MediaReceiverStats): boolean;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /** @hidden */
        setBytesReceived(value: number): void;
        /** @hidden */
        setJitter(value: number): void;
        /** @hidden */
        setPacketsDiscarded(value: number): void;
        /** @hidden */
        setPacketsDuplicated(value: number): void;
        /** @hidden */
        setPacketsLost(value: number): void;
        /** @hidden */
        setPacketsReceived(value: number): void;
        /** @hidden */
        setPacketsRepaired(value: number): void;
        /** @hidden */
        setSink(value: fm.icelink.MediaSinkStats): void;
        /**
        Serializes this to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Media sender information.
    */
    class MediaSenderInfo extends fm.icelink.MediaComponentInfo {
        getTypeString(): string;
        /** @hidden */
        private _source;
        /**
        Initializes a new instance of the [[fm.icelink.mediaSenderInfo]] class.
        */
        constructor();
        constructor(stats: fm.icelink.MediaSenderStats, lastStats: fm.icelink.MediaSenderStats);
        /**
        Deserializes an instance from JSON.
        @param mediaSenderJson The serialized JSON.
        @return The deserialized instance.
        */
        static fromJson(mediaSenderJson: string): fm.icelink.MediaSenderInfo;
        /**
        Deserializes an array from JSON.
        @param mediaSendersJson The serialized JSON.
        @return The deserialized array.
        */
        static fromJsonArray(mediaSendersJson: string): fm.icelink.MediaSenderInfo[];
        /**
        Serializes an instance to JSON.
        @param mediaSender The instance to serialize.
        @return The serialized JSON.
        */
        static toJson(mediaSender: fm.icelink.MediaSenderInfo): string;
        /**
        Serializes an array to JSON.
        @param mediaSenders The array to serialize.
        @return The serialized JSON.
        */
        static toJsonArray(mediaSenders: fm.icelink.MediaSenderInfo[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets source.
        */
        getSource(): fm.icelink.MediaSourceInfo;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets source.
        */
        setSource(value: fm.icelink.MediaSourceInfo): void;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Media sender stats.
    */
    class MediaSenderStats extends fm.icelink.MediaComponentStats implements fm.icelink.IEquivalent<fm.icelink.MediaSenderStats> {
        getTypeString(): string;
        /** @hidden */
        private _bytesSent;
        /** @hidden */
        private _packetsSent;
        /** @hidden */
        private _roundTripTime;
        /** @hidden */
        private _source;
        private fmicelinkMediaSenderStatsInit;
        constructor();
        /**
        Derializes media sender stats from JSON.
        @param mediaSenderJson The media sender's stats JSON.
        */
        static fromJson(mediaSenderJson: string): fm.icelink.MediaSenderStats;
        /**
        Derializes a media sender stats array from JSON.
        @param mediaSendersJson The media senders' stats JSON.
        */
        static fromJsonArray(mediaSendersJson: string): fm.icelink.MediaSenderStats[];
        /**
        Serializes media sender stats to JSON.
        @param mediaSender The media sender's stats.
        */
        static toJson(mediaSender: fm.icelink.MediaSenderStats): string;
        /**
        Serializes a media sender stats array to JSON.
        @param mediaSenders The media senders' stats.
        */
        static toJsonArray(mediaSenders: fm.icelink.MediaSenderStats[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the number of bytes sent.
        */
        getBytesSent(): number;
        /**
        Gets the number of packets sent.
        */
        getPacketsSent(): number;
        /**
        Gets the round trip time in milliseconds.
        */
        getRoundTripTime(): number;
        /**
        Gets the source stats.
        */
        getSource(): fm.icelink.MediaSourceStats;
        /**
        Checks if a media sender is equivalent to this one.
        @param instance The media sender.
        */
        isEquivalent(instance: fm.icelink.MediaSenderStats): boolean;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /** @hidden */
        setBytesSent(value: number): void;
        /** @hidden */
        setPacketsSent(value: number): void;
        /** @hidden */
        setRoundTripTime(value: number): void;
        /** @hidden */
        setSource(value: fm.icelink.MediaSourceStats): void;
        /**
        Serializes this to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Media sink information.
    */
    class MediaSinkInfo extends fm.icelink.Info {
        getTypeString(): string;
        /** @hidden */
        private _inputFormat;
        /** @hidden */
        private _label;
        /** @hidden */
        private _outputId;
        /** @hidden */
        private _outputName;
        /** @hidden */
        private _tag;
        /**
        Initializes a new instance of the [[fm.icelink.mediaSinkInfo]] class.
        */
        constructor();
        constructor(stats: fm.icelink.MediaSinkStats, lastStats: fm.icelink.MediaSinkStats);
        /**
        Deserializes an instance from JSON.
        @param mediaSinkInfoJson The serialized JSON.
        @return The deserialized instance.
        */
        static fromJson(mediaSinkInfoJson: string): fm.icelink.MediaSinkInfo;
        /**
        Deserializes an array from JSON.
        @param mediaSinkInfosJson The serialized JSON.
        @return The deserialized array.
        */
        static fromJsonArray(mediaSinkInfosJson: string): fm.icelink.MediaSinkInfo[];
        /**
        Serializes an instance to JSON.
        @param mediaSinkInfo The instance to serialize.
        @return The serialized JSON.
        */
        static toJson(mediaSinkInfo: fm.icelink.MediaSinkInfo): string;
        /**
        Serializes an array to JSON.
        @param mediaSinkInfos The array to serialize.
        @return The serialized JSON.
        */
        static toJsonArray(mediaSinkInfos: fm.icelink.MediaSinkInfo[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the media sink input format.
        */
        getInputFormat(): fm.icelink.FormatInfo;
        /**
        Gets the media sink label.
        */
        getLabel(): string;
        /**
        Gets the media sink output id.
        */
        getOutputId(): string;
        /**
        Gets the media sink output name.
        */
        getOutputName(): string;
        /**
        Gets the media sink tag.
        */
        getTag(): string;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets the media sink input format.
        */
        setInputFormat(value: fm.icelink.FormatInfo): void;
        /**
        Sets the media sink label.
        */
        setLabel(value: string): void;
        /**
        Sets the media sink output id.
        */
        setOutputId(value: string): void;
        /**
        Sets the media sink output name.
        */
        setOutputName(value: string): void;
        /**
        Sets the media sink tag.
        */
        setTag(value: string): void;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Media sink stats.
    */
    class MediaSinkStats extends fm.icelink.BaseStats implements fm.icelink.IEquivalent<fm.icelink.MediaSinkStats> {
        getTypeString(): string;
        /** @hidden */
        private _inputFormat;
        /** @hidden */
        private _label;
        /** @hidden */
        private _muted;
        /** @hidden */
        private _outputId;
        /** @hidden */
        private _outputName;
        /** @hidden */
        private _tag;
        private fmicelinkMediaSinkStatsInit;
        constructor();
        /**
        Deserializes an instance from JSON.
        @param instanceJson The serialized JSON.
        @return The deserialized instance.
        */
        static fromJson(instanceJson: string): fm.icelink.MediaSinkStats;
        /**
        Deserializes an array from JSON.
        @param arrayJson The serialized JSON.
        @return The deserialized array.
        */
        static fromJsonArray(arrayJson: string): fm.icelink.MediaSinkStats[];
        /**
        Serializes an instance to JSON.
        @param instance The instance to serialize.
        @return Serialized JSON.
        */
        static toJson(instance: fm.icelink.MediaSinkStats): string;
        /**
        Serializes an array to JSON.
        @param array The array to serialize.
        @return The serialized JSON.
        */
        static toJsonArray(array: fm.icelink.MediaSinkStats[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the input format.
        */
        getInputFormat(): fm.icelink.FormatInfo;
        /**
        Gets the label.
        */
        getLabel(): string;
        /**
        Gets the muted flag.
        */
        getMuted(): boolean;
        /**
        Gets the output identifier.
        */
        getOutputId(): string;
        /**
        Gets the output name.
        */
        getOutputName(): string;
        /**
        Gets the tag.
        */
        getTag(): string;
        /**
        Checks if a source is equivalent to this one.
        @param instance The source.
        */
        isEquivalent(instance: fm.icelink.MediaSinkStats): boolean;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets the input format.
        */
        setInputFormat(value: fm.icelink.FormatInfo): void;
        /**
        Sets the label.
        */
        setLabel(value: string): void;
        /**
        Sets the muted flag.
        */
        setMuted(value: boolean): void;
        /**
        Sets the output identifier.
        */
        setOutputId(value: string): void;
        /**
        Sets the output name.
        */
        setOutputName(value: string): void;
        /**
        Sets the tag.
        */
        setTag(value: string): void;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Media source stats.
    */
    class MediaSourceStats extends fm.icelink.BaseStats implements fm.icelink.IEquivalent<fm.icelink.MediaSourceStats> {
        getTypeString(): string;
        /** @hidden */
        private _inputId;
        /** @hidden */
        private _inputName;
        /** @hidden */
        private _label;
        /** @hidden */
        private _muted;
        /** @hidden */
        private _outputFormat;
        /** @hidden */
        private _tag;
        private fmicelinkMediaSourceStatsInit;
        constructor();
        /**
        Deserializes an instance from JSON.
        @param instanceJson The serialized Json.
        @return The deserialized VideoSourceInfo.
        */
        static fromJson(instanceJson: string): fm.icelink.MediaSourceStats;
        /**
        Serializes an instance to JSON.
        @param instance The instance to serialize.
        @return Serialized Json.
        */
        static toJson(instance: fm.icelink.MediaSourceStats): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the input identifier.
        */
        getInputId(): string;
        /**
        Gets the input name.
        */
        getInputName(): string;
        /**
        Gets the label.
        */
        getLabel(): string;
        /**
        Gets the muted flag.
        */
        getMuted(): boolean;
        /**
        Gets the output format.
        */
        getOutputFormat(): fm.icelink.FormatInfo;
        /**
        Gets the tag.
        */
        getTag(): string;
        /**
        Checks if a source is equivalent to this one.
        @param instance The source.
        */
        isEquivalent(instance: fm.icelink.MediaSourceStats): boolean;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets the input identifier.
        */
        setInputId(value: string): void;
        /**
        Sets the input name.
        */
        setInputName(value: string): void;
        /**
        Sets the label.
        */
        setLabel(value: string): void;
        /**
        Sets the muted flag.
        */
        setMuted(value: boolean): void;
        /**
        Sets the output format.
        */
        setOutputFormat(value: fm.icelink.FormatInfo): void;
        /**
        Sets the tag.
        */
        setTag(value: string): void;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Media stats.
    */
    class MediaStats extends fm.icelink.BaseStats {
        getTypeString(): string;
        /** @hidden */
        private _tracks;
        constructor();
        /**
        Derializes media stats from JSON.
        @param mediaJson The media's stats JSON.
        */
        static fromJson(mediaJson: string): fm.icelink.MediaStats;
        /**
        Serializes media stats to JSON.
        @param media The media's stats.
        */
        static toJson(media: fm.icelink.MediaStats): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the first track's stats.
        */
        getTrack(): fm.icelink.MediaTrackStats;
        /**
        Gets a track by its identifier.
        @param trackId The track identifier.
        */
        getTrack(trackId: string): fm.icelink.MediaTrackStats;
        /**
        Gets the tracks' stats.
        */
        getTracks(): fm.icelink.MediaTrackStats[];
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /** @hidden */
        setTracks(value: fm.icelink.MediaTrackStats[]): void;
        /**
        Serializes this to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Encoding information.
    */
    class EncodingInfo extends fm.icelink.Info {
        getTypeString(): string;
        /** @hidden */
        private __bitrate;
        /** @hidden */
        private __frameRate;
        /** @hidden */
        private __scale;
        /** @hidden */
        private __synchronizationSource;
        /** @hidden */
        private _deactivated;
        /** @hidden */
        private _rtpStreamId;
        /** @hidden */
        private _size;
        /** @hidden */
        private static fm_icelink_EncodingInfo___pausedKey;
        private fmicelinkEncodingInfoInit;
        constructor();
        /** @hidden */
        private static findEncoding;
        /**
        Deserializes an instance from JSON.
        @param encodingInfoJson The serialized JSON.
        @return The deserialized instance.
        */
        static fromJson(encodingInfoJson: string): fm.icelink.EncodingInfo;
        /**
        Deserializes an array from JSON.
        @param encodingInfosJson The serialized JSON.
        @return The deserialized array.
        */
        static fromJsonArray(encodingInfosJson: string): fm.icelink.EncodingInfo[];
        /**
        Converts an SDP RID attribute into an instance.
        @param ridAttribute The SDP RID attribute.
        */
        static fromSdpRidAttribute(ridAttribute: fm.icelink.sdp.rtp.RidAttribute): fm.icelink.EncodingInfo;
        /**
        Determines whether the two encodings are equivalent.
        @param encoding1 The first encoding.
        @param encoding2 The second encoding.
        */
        static isEquivalent(encoding1: fm.icelink.EncodingInfo, encoding2: fm.icelink.EncodingInfo): boolean;
        /**
        Determines whether the two encodings are equivalent.
        @param encoding1 The first encoding.
        @param encoding2 The second encoding.
        @param restrictionsOnly Whether to check restrictions only.
        */
        static isEquivalent(encoding1: fm.icelink.EncodingInfo, encoding2: fm.icelink.EncodingInfo, restrictionsOnly: boolean): boolean;
        /** @hidden */
        private static isEquivalentNoCheck;
        /** @hidden */
        static merge(encodings: fm.icelink.EncodingInfo[]): fm.icelink.EncodingInfo[];
        /**
        Serializes an instance to JSON.
        @param encodingInfo The instance to serialize.
        @return The serialized JSON.
        */
        static toJson(encodingInfo: fm.icelink.EncodingInfo): string;
        /**
        Serializes an array to JSON.
        @param encodingInfos The array to serialize.
        @return The serialized JSON.
        */
        static toJsonArray(encodingInfos: fm.icelink.EncodingInfo[]): string;
        /**
        Converts an instance into an SDP RID attribute.
        @param encoding The encoding.
        @param direction The direction.
        */
        static toSdpRidAttribute(encoding: fm.icelink.EncodingInfo, direction: string): fm.icelink.sdp.rtp.RidAttribute;
        /**
        Converts an instance into an SDP RID attribute.
        @param encoding The encoding.
        @param direction The direction.
        @param includeRestrictions Whether to include restrictions.
        */
        static toSdpRidAttribute(encoding: fm.icelink.EncodingInfo, direction: string, includeRestrictions: boolean): fm.icelink.sdp.rtp.RidAttribute;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /** @hidden */
        extend(encoding: fm.icelink.EncodingInfo): fm.icelink.EncodingInfo;
        /**
        Gets the bitrate, in kbps.
        */
        getBitrate(): number;
        /**
        Gets whether this encoding is deactivated.
        */
        getDeactivated(): boolean;
        /**
        Gets the frame-rate, in fps.
        */
        getFrameRate(): number;
        /**
        Gets the height.
        */
        getHeight(): number;
        /**
        Gets whether this encoding is empty.
        */
        getIsEmpty(): boolean;
        /** @hidden */
        private getRidRestrictionValue;
        /**
        Gets the RTP stream identifier.
        */
        getRtpStreamId(): string;
        /**
        Gets the target scale.
        */
        getScale(): number;
        /**
        Gets the scaled height.
        */
        getScaledHeight(): number;
        /**
        Gets the scaled size.
        */
        getScaledSize(): fm.icelink.Size;
        /**
        Gets the scaled width.
        */
        getScaledWidth(): number;
        /** @hidden */
        getSdpRidRestrictions(): fm.icelink.sdp.rtp.RidRestriction[];
        /** @hidden */
        getSdpSimulcastStream(): fm.icelink.sdp.rtp.SimulcastStream;
        /** @hidden */
        getSdpSimulcastStreamId(): fm.icelink.sdp.rtp.SimulcastStreamId;
        /** @hidden */
        getSdpSsrcRestrictionAttributes(): fm.icelink.sdp.rtp.SsrcAttribute[];
        /**
        Gets the size.
        */
        getSize(): fm.icelink.Size;
        /** @hidden */
        private getSsrcRestrictionAttributeValue;
        /**
        Gets the synchronization source.
        */
        getSynchronizationSource(): number;
        /**
        Gets the width.
        */
        getWidth(): number;
        /**
        Determines whether the specified encoding is equivalent.
        @param encoding The encoding.
        */
        isEquivalent(encoding: fm.icelink.EncodingInfo): boolean;
        /**
        Determines whether the specified encoding is equivalent.
        @param encoding The encoding.
        @param restrictionsOnly Whether to check restrictions only.
        */
        isEquivalent(encoding: fm.icelink.EncodingInfo, restrictionsOnly: boolean): boolean;
        /** @hidden */
        private parseBitrate;
        /** @hidden */
        private parseDeactivated;
        /** @hidden */
        private parseFrameRate;
        /** @hidden */
        private parseSize;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets the bitrate, in kbps.
        */
        setBitrate(value: number): void;
        /**
        Sets whether this encoding is deactivated.
        */
        setDeactivated(value: boolean): void;
        /**
        Sets the frame-rate, in fps.
        */
        setFrameRate(value: number): void;
        /**
        Sets the RTP stream identifier.
        */
        setRtpStreamId(value: string): void;
        /**
        Sets the target scale.
        */
        setScale(value: number): void;
        /** @hidden */
        setSdpRidRestrictions(value: fm.icelink.sdp.rtp.RidRestriction[]): void;
        /** @hidden */
        setSdpSimulcastStreamId(value: fm.icelink.sdp.rtp.SimulcastStreamId): void;
        /** @hidden */
        setSdpSsrcRestrictionAttributes(value: fm.icelink.sdp.rtp.SsrcAttribute[]): void;
        /**
        Sets the size.
        */
        setSize(value: fm.icelink.Size): void;
        /**
        Sets the synchronization source.
        */
        setSynchronizationSource(value: number): void;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
        /**
        Converts this instance into an SDP RID attribute.
        @param direction The direction.
        */
        toSdpRidAttribute(direction: string): fm.icelink.sdp.rtp.RidAttribute;
        /**
        Converts this instance into an SDP RID attribute.
        @param direction The direction.
        @param includeRestrictions Whether to include restrictions.
        */
        toSdpRidAttribute(direction: string, includeRestrictions: boolean): fm.icelink.sdp.rtp.RidAttribute;
        /**
        Returns a string that represents this instance.
        @return
                    A string that represents this instance.
            
        */
        toString(): string;
        /** @hidden */
        private static __fmicelinkEncodingInfoInitialized;
        /** @hidden */
        static fmicelinkEncodingInfoInitialize(): void;
    }
}
declare namespace fm.icelink {
    /**
    Media stream information.
    */
    class MediaStreamInfo extends fm.icelink.StreamInfo {
        getTypeString(): string;
        /** @hidden */
        private __localBandwidth;
        /** @hidden */
        private __remoteBandwidth;
        /** @hidden */
        private _maxFrameHeight;
        /** @hidden */
        private _maxFrameWidth;
        /** @hidden */
        private _receiveDisabled;
        /** @hidden */
        private _receiveEncodings;
        /** @hidden */
        private _receiveFormats;
        /** @hidden */
        private _sendDisabled;
        /** @hidden */
        private _sendEncodings;
        /** @hidden */
        private _sendFormats;
        /** @hidden */
        private _sendMuted;
        private fmicelinkMediaStreamInfoInit;
        constructor();
        /**
        Deserializes an instance from JSON.
        @param mediaStreamInfoJson The serialized JSON.
        @return The deserialized instance.
        */
        static fromJson(mediaStreamInfoJson: string): fm.icelink.MediaStreamInfo;
        /**
        Deserializes an array from JSON.
        @param mediaStreamInfosJson The serialized JSON.
        @return The deserialized array.
        */
        static fromJsonArray(mediaStreamInfosJson: string): fm.icelink.MediaStreamInfo[];
        /**
        Serializes an instance to JSON.
        @param mediaStreamInfo The instance to serialize.
        @return The serialized JSON.
        */
        static toJson(mediaStreamInfo: fm.icelink.MediaStreamInfo): string;
        /**
        Serializes an array to JSON.
        @param mediaStreamInfos The array to serialize.
        @return The serialized JSON.
        */
        static toJsonArray(mediaStreamInfos: fm.icelink.MediaStreamInfo[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the media stream direction.
        */
        getDirection(): string;
        /**
        Gets the media stream's local bandwidth.
        */
        getLocalBandwidth(): number;
        /**
        Gets the media stream's maximum frame height.
        */
        getMaxFrameHeight(): number;
        /**
        Gets the media stream's maximum frame width.
        */
        getMaxFrameWidth(): number;
        /**
        Gets whether the media stream has the receive direction disabled.
        */
        getReceiveDisabled(): boolean;
        /**
        Gets the media stream receive encodings.
        */
        getReceiveEncodings(): fm.icelink.EncodingInfo[];
        /**
        Gets the media stream receive formats.
        */
        getReceiveFormats(): fm.icelink.FormatInfo[];
        /**
        Gets the media stream's remote bandwidth.
        */
        getRemoteBandwidth(): number;
        /**
        Gets whether the media stream has the send direction disabled.
        */
        getSendDisabled(): boolean;
        /**
        Gets the media stream send encodings.
        */
        getSendEncodings(): fm.icelink.EncodingInfo[];
        /**
        Gets the media stream send formats.
        */
        getSendFormats(): fm.icelink.FormatInfo[];
        /**
        Gets whether the media stream has muted sending.
        */
        getSendMuted(): boolean;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets the media stream direction.
        */
        setDirection(value: string): void;
        /**
        Sets the media stream's local bandwidth.
        */
        setLocalBandwidth(value: number): void;
        /**
        Sets the media stream's maximum frame height.
        */
        setMaxFrameHeight(value: number): void;
        /**
        Sets the media stream's maximum frame width.
        */
        setMaxFrameWidth(value: number): void;
        /**
        Sets whether the media stream has the receive direction disabled.
        */
        setReceiveDisabled(value: boolean): void;
        /**
        Sets the media stream receive encodings.
        */
        setReceiveEncodings(value: fm.icelink.EncodingInfo[]): void;
        /**
        Sets the media stream receive formats.
        */
        setReceiveFormats(value: fm.icelink.FormatInfo[]): void;
        /**
        Sets the media stream's remote bandwidth.
        */
        setRemoteBandwidth(value: number): void;
        /**
        Sets whether the media stream has the send direction disabled.
        */
        setSendDisabled(value: boolean): void;
        /**
        Sets the media stream send encodings.
        */
        setSendEncodings(value: fm.icelink.EncodingInfo[]): void;
        /**
        Sets the media stream send formats.
        */
        setSendFormats(value: fm.icelink.FormatInfo[]): void;
        /**
        Sets whether the media stream has muted sending.
        */
        setSendMuted(value: boolean): void;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Media stream stats.
    */
    class MediaStreamStats extends fm.icelink.StreamStats {
        getTypeString(): string;
        /** @hidden */
        private _direction;
        /** @hidden */
        private _receivers;
        /** @hidden */
        private _senders;
        constructor();
        /**
        Derializes media stream stats from JSON.
        @param mediaStreamJson The media stream's stats JSON.
        */
        static fromJson(mediaStreamJson: string): fm.icelink.MediaStreamStats;
        /**
        Derializes an array of media stream stats from JSON.
        @param mediaStreamsJson The media streams' stats JSON.
        */
        static fromJsonArray(mediaStreamsJson: string): fm.icelink.MediaStreamStats[];
        /**
        Serializes media stream stats to JSON.
        @param mediaStream The media stream's stats.
        */
        static toJson(mediaStream: fm.icelink.MediaStreamStats): string;
        /**
        Serializes an array of media stream stats to JSON.
        @param mediaStreams The media streams' stats.
        */
        static toJsonArray(mediaStreams: fm.icelink.MediaStreamStats[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the direction.
        */
        getDirection(): fm.icelink.StreamDirection;
        /**
        Gets the first receiver's stats.
        */
        getReceiver(): fm.icelink.MediaReceiverStats;
        /**
        Gets the receivers' stats.
        */
        getReceivers(): fm.icelink.MediaReceiverStats[];
        /**
        Gets the first sender's stats.
        */
        getSender(): fm.icelink.MediaSenderStats;
        /**
        Gets the senders' stats.
        */
        getSenders(): fm.icelink.MediaSenderStats[];
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /** @hidden */
        setDirection(value: fm.icelink.StreamDirection): void;
        /** @hidden */
        setReceivers(value: fm.icelink.MediaReceiverStats[]): void;
        /** @hidden */
        setSenders(value: fm.icelink.MediaSenderStats[]): void;
        /**
        Serializes this to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Media track information
    */
    class MediaTrackInfo extends fm.icelink.Info {
        getTypeString(): string;
        /** @hidden */
        private _detached;
        /** @hidden */
        private _muted;
        /** @hidden */
        private _stopped;
        private fmicelinkMediaTrackInfoInit;
        /**
        Create MediaTrackInfo instance.
        */
        constructor();
        /**
        Create MediaTrackInfo instance.
        @param stats
        @param lastStats
        */
        constructor(stats: fm.icelink.MediaTrackStats, lastStats: fm.icelink.MediaTrackStats);
        /**
        Deserializes an instance from JSON.
        @param mediaTrackInfoJson The serialized JSON.
        @return The deserialized instance.
        */
        static fromJson(mediaTrackInfoJson: string): fm.icelink.MediaTrackInfo;
        /**
        Deserializes an array from JSON.
        @param mediaTrackInfosJson The serialized JSON.
        @return The deserialized array.
        */
        static fromJsonArray(mediaTrackInfosJson: string): fm.icelink.MediaTrackInfo[];
        /**
        Serializes an instance to JSON.
        @param mediaTrackInfo The instance to serialize.
        @return The serialized JSON.
        */
        static toJson(mediaTrackInfo: fm.icelink.MediaTrackInfo): string;
        /**
        Serializes an array to JSON.
        @param mediaTrackInfos The array to serialize.
        @return The serialized JSON.
        */
        static toJsonArray(mediaTrackInfos: fm.icelink.MediaTrackInfo[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the whether the media track is detached.
        */
        getDetached(): boolean;
        /**
        Gets the whether the media track is muted.
        */
        getMuted(): boolean;
        /**
        Gets the whether the media track is stopped.
        */
        getStopped(): boolean;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets the whether the media track is detached.
        */
        setDetached(value: boolean): void;
        /**
        Sets the whether the media track is muted.
        */
        setMuted(value: boolean): void;
        /**
        Sets the whether the media track is stopped.
        */
        setStopped(value: boolean): void;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Media track stats.
    */
    class MediaTrackStats extends fm.icelink.BaseStats implements fm.icelink.IEquivalent<fm.icelink.MediaTrackStats> {
        getTypeString(): string;
        /** @hidden */
        private _detached;
        /** @hidden */
        private _frameHeight;
        /** @hidden */
        private _frameRate;
        /** @hidden */
        private _framesCorrupted;
        /** @hidden */
        private _framesDecoded;
        /** @hidden */
        private _framesDropped;
        /** @hidden */
        private _framesEncoded;
        /** @hidden */
        private _framesReceived;
        /** @hidden */
        private _framesSent;
        /** @hidden */
        private _frameWidth;
        /** @hidden */
        private _muted;
        /** @hidden */
        private _repairedRtpStreamIds;
        /** @hidden */
        private _rtpStreamIds;
        /** @hidden */
        private _stopped;
        /** @hidden */
        private _synchronizationSources;
        private fmicelinkMediaTrackStatsInit;
        constructor();
        /**
        Derializes media track stats from JSON.
        @param mediaTrackJson The media track's stats JSON.
        */
        static fromJson(mediaTrackJson: string): fm.icelink.MediaTrackStats;
        /**
        Derializes an array of media track stats from JSON.
        @param mediaTracksJson The media tracks' stats JSON.
        */
        static fromJsonArray(mediaTracksJson: string): fm.icelink.MediaTrackStats[];
        /**
        Serializes media track stats to JSON.
        @param mediaTrack The media track's stats.
        */
        static toJson(mediaTrack: fm.icelink.MediaTrackStats): string;
        /**
        Serializes an array of media track stats to JSON.
        @param mediaTracks The media tracks' stats.
        */
        static toJsonArray(mediaTracks: fm.icelink.MediaTrackStats[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets whether the track is detached.
        */
        getDetached(): boolean;
        /**
        Gets the frame height. Video-only. Set by encoder or decoder.
        */
        getFrameHeight(): number;
        /**
        Gets the frame rate. Video-only. Set by encoder or decoder.
        */
        getFrameRate(): number;
        /**
        Gets the number of corrupted frames. Video-only. Set by depacketizer.
        */
        getFramesCorrupted(): number;
        /**
        Gets the number of frames decoded. Set by decoder.
        */
        getFramesDecoded(): number;
        /**
        Gets the number of frames dropped. Video-only. Set by depacketizer.
        */
        getFramesDropped(): number;
        /**
        Gets the number of frames encoded. Set by encoder.
        */
        getFramesEncoded(): number;
        /**
        Gets the number of frames received. Set by depacketizer.
        */
        getFramesReceived(): number;
        /**
        Gets the number of frames sent. Set by packetizer.
        */
        getFramesSent(): number;
        /**
        Gets the frame width. Video-only. Set by encoder or decoder.
        */
        getFrameWidth(): number;
        /**
        Gets whether the track is muted.
        */
        getMuted(): boolean;
        /**
        Gets the first repaired RTP stream identifier.
        */
        getRepairedRtpStreamId(): string;
        /**
        Gets the repaired RTP stream identifiers.
        */
        getRepairedRtpStreamIds(): string[];
        /**
        Gets the first RTP stream identifier.
        */
        getRtpStreamId(): string;
        /**
        Gets the RTP stream identifiers.
        */
        getRtpStreamIds(): string[];
        /**
        Gets whether the track is stopped. Set by source.
        */
        getStopped(): boolean;
        /**
        Gets the first synchronization source.
        */
        getSynchronizationSource(): number;
        /**
        Gets the synchronization sources.
        */
        getSynchronizationSources(): number[];
        /**
        Checks if a track is equivalent to this one.
        @param instance The track.
        */
        isEquivalent(instance: fm.icelink.MediaTrackStats): boolean;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /** @hidden */
        setDetached(value: boolean): void;
        /** @hidden */
        setFrameHeight(value: number): void;
        /** @hidden */
        setFrameRate(value: number): void;
        /** @hidden */
        setFramesCorrupted(value: number): void;
        /** @hidden */
        setFramesDecoded(value: number): void;
        /** @hidden */
        setFramesDropped(value: number): void;
        /** @hidden */
        setFramesEncoded(value: number): void;
        /** @hidden */
        setFramesReceived(value: number): void;
        /** @hidden */
        setFramesSent(value: number): void;
        /** @hidden */
        setFrameWidth(value: number): void;
        /** @hidden */
        setMuted(value: boolean): void;
        /** @hidden */
        setRepairedRtpStreamIds(value: string[]): void;
        /** @hidden */
        setRtpStreamIds(value: string[]): void;
        /** @hidden */
        setStopped(value: boolean): void;
        /** @hidden */
        setSynchronizationSources(value: number[]): void;
        /**
        Serializes this to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Media source information.
    */
    class MediaSourceInfo extends fm.icelink.Info {
        getTypeString(): string;
        /** @hidden */
        private _inputId;
        /** @hidden */
        private _inputName;
        /** @hidden */
        private _label;
        /** @hidden */
        private _muted;
        /** @hidden */
        private _outputFormat;
        /** @hidden */
        private _tag;
        private fmicelinkMediaSourceInfoInit;
        /**
        Initializes a new instance of the [[fm.icelink.mediaSourceInfo]] class.
        */
        constructor();
        constructor(stats: fm.icelink.MediaSourceStats, lastStats: fm.icelink.MediaSourceStats);
        /**
        Deserializes an instance from JSON.
        @param mediaSourceInfoJson The serialized JSON.
        @return The deserialized instance.
        */
        static fromJson(mediaSourceInfoJson: string): fm.icelink.MediaSourceInfo;
        /**
        Deserializes an array from JSON.
        @param mediaSourceInfosJson The serialized JSON.
        @return The deserialized array.
        */
        static fromJsonArray(mediaSourceInfosJson: string): fm.icelink.MediaSourceInfo[];
        /**
        Serializes an instance to JSON.
        @param mediaSourceInfo The instance to serialize.
        @return The serialized JSON.
        */
        static toJson(mediaSourceInfo: fm.icelink.MediaSourceInfo): string;
        /**
        Serializes an array to JSON.
        @param mediaSourceInfos The array to serialize.
        @return The serialized JSON.
        */
        static toJsonArray(mediaSourceInfos: fm.icelink.MediaSourceInfo[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the media source input identifier.
        */
        getInputId(): string;
        /**
        Gets the media source input name.
        */
        getInputName(): string;
        /**
        Gets the media source label.
        */
        getLabel(): string;
        /**
        Gets the whether the media source is muted.
        */
        getMuted(): boolean;
        /**
        Gets the media source output format.
        */
        getOutputFormat(): fm.icelink.FormatInfo;
        /**
        Gets the media source tag.
        */
        getTag(): string;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets the media source input identifier.
        */
        setInputId(value: string): void;
        /**
        Sets the media source input name.
        */
        setInputName(value: string): void;
        /**
        Sets the media source label.
        */
        setLabel(value: string): void;
        /**
        Sets the whether the media source is muted.
        */
        setMuted(value: boolean): void;
        /**
        Sets the media source output format.
        */
        setOutputFormat(value: fm.icelink.FormatInfo): void;
        /**
        Sets the media source tag.
        */
        setTag(value: string): void;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    A point (x and y coordinates).
    */
    class Point {
        getTypeString(): string;
        /** @hidden */
        private __x;
        /** @hidden */
        private __y;
        /** @hidden */
        private static fm_icelink_Point___empty;
        private fmicelinkPointInit;
        /**
        Initializes a new instance of the [[fm.icelink.point]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.point]] class.
        @param x The X coordinate.
        @param y The Y coordinate.
        */
        constructor(x: number, y: number);
        /**
        Deserializes an instance from JSON.
        @param pointJson The JSON to deserialize.
        @return The deserialized point.
        */
        static fromJson(pointJson: string): fm.icelink.Point;
        /**
        Gets the empty point (0,0).
        */
        static getEmpty(): fm.icelink.Point;
        /**
        Determines whether the two points are equivalent.
        @param point1 The first point.
        @param point2 The second point.
        */
        static isEquivalent(point1: fm.icelink.Point, point2: fm.icelink.Point): boolean;
        /** @hidden */
        private static isEquivalentNoCheck;
        /**
        Serializes an instance to JSON.
        @param point The point.
        @return
                    The serialized JSON.
            
        */
        static toJson(point: fm.icelink.Point): string;
        /**
        Gets the X coordinate.
        */
        getX(): number;
        /**
        Gets the Y coordinate.
        */
        getY(): number;
        /**
        Determines whether the specified point is equivalent.
        @param point The point.
        */
        isEquivalent(point: fm.icelink.Point): boolean;
        /**
        Sets the X coordinate.
        */
        setX(value: number): void;
        /**
        Sets the Y coordinate.
        */
        setY(value: number): void;
        /**
        Serializes this instance to JSON.
        @return
                    The serialized JSON.
            
        */
        toJson(): string;
        /**
        Returns a string that represents this instance using format "{x},{y}".
        */
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    A rectangle (size and origin).
    */
    class Rectangle {
        getTypeString(): string;
        /** @hidden */
        private __origin;
        /** @hidden */
        private __size;
        /** @hidden */
        private static fm_icelink_Rectangle___empty;
        /**
        Initializes a new instance of the [[fm.icelink.rectangle]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.rectangle]] class.
        @param origin The origin.
        @param size The size.
        */
        constructor(origin: fm.icelink.Point, size: fm.icelink.Size);
        /**
        Deserializes an instance from JSON.
        @param rectangleJson The JSON to deserialize.
        @return The deserialized rectangle.
        */
        static fromJson(rectangleJson: string): fm.icelink.Rectangle;
        /**
        Gets the empty rectangle (0,0/0x0).
        */
        static getEmpty(): fm.icelink.Rectangle;
        /**
        Determines whether the two rectangles are equivalent.
        @param rectangle1 The first rectangle.
        @param rectangle2 The second rectangle.
        */
        static isEquivalent(rectangle1: fm.icelink.Rectangle, rectangle2: fm.icelink.Rectangle): boolean;
        /** @hidden */
        private static isEquivalentNoCheck;
        /**
        Serializes an instance to JSON.
        @param rectangle The rectangle.
        @return
                    The serialized JSON.
            
        */
        static toJson(rectangle: fm.icelink.Rectangle): string;
        /**
        Gets the size height.
        */
        getHeight(): number;
        /**
        Gets the origin.
        */
        getOrigin(): fm.icelink.Point;
        /**
        Gets the size.
        */
        getSize(): fm.icelink.Size;
        /**
        Gets the size width.
        */
        getWidth(): number;
        /**
        Gets the origin X coordinate.
        */
        getX(): number;
        /**
        Gets the origin Y coordinate.
        */
        getY(): number;
        /**
        Determines whether the specified rectangle is equivalent.
        @param rectangle The rectangle.
        */
        isEquivalent(rectangle: fm.icelink.Rectangle): boolean;
        /**
        Sets the origin.
        */
        setOrigin(value: fm.icelink.Point): void;
        /**
        Sets the size.
        */
        setSize(value: fm.icelink.Size): void;
        /**
        Serializes this instance to JSON.
        @return
                    The serialized JSON.
            
        */
        toJson(): string;
        /**
        Returns a string that represents this instance using format "{origin}/{size}".
        */
        toString(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    Defines valid SDP address types.
    */
    abstract class AddressType {
        getTypeString(): string;
        /**
        Gets the SDP address type for the specified IP address.
        @param ipAddress The IP address.
        */
        static getAddressTypeForAddress(ipAddress: string): string;
        /**
        Gets the SDP address type meaning "IP version 4".
        */
        static getIP4(): string;
        /**
        Gets the SDP address type meaning "IP version 6".
        */
        static getIP6(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    An SDP attribute.
    */
    abstract class Attribute {
        getTypeString(): string;
        /** @hidden */
        private _attributeType;
        /** @hidden */
        private _multiplexingCategory;
        /** @hidden */
        private static fm_icelink_sdp_Attribute__registeredAttributes;
        /** @hidden */
        private static fm_icelink_sdp_Attribute__registeredAttributesLock;
        /** @hidden */
        private static fm_icelink_sdp_Attribute__unknownAttributeTypeName;
        constructor();
        /**
        Creates an attribute.
        @param name The name.
        @param value The value.
        */
        static createAttribute(name: string, value: string): fm.icelink.sdp.Attribute;
        /** @hidden */
        private static createSDPBundleOnlyAttribute;
        /** @hidden */
        private static createSDPCandidateAttribute;
        /** @hidden */
        private static createSDPCategoryAttribute;
        /** @hidden */
        private static createSDPCharacterSetAttribute;
        /** @hidden */
        private static createSDPConferenceTypeAttribute;
        /** @hidden */
        private static createSDPCryptoAttribute;
        /** @hidden */
        private static createSDPExtMapAttribute;
        /** @hidden */
        private static createSDPFingerprintAttribute;
        /** @hidden */
        private static createSDPFormatParametersAttribute;
        /** @hidden */
        private static createSDPFrameRateAttribute;
        /** @hidden */
        private static createSDPGroupAttribute;
        /** @hidden */
        private static createSDPIceLiteAttribute;
        /** @hidden */
        private static createSDPIceMismatchAttribute;
        /** @hidden */
        private static createSDPIceOptionsAttribute;
        /** @hidden */
        private static createSDPIcePasswordAttribute;
        /** @hidden */
        private static createSDPIceUfragAttribute;
        /** @hidden */
        private static createSDPInactiveAttribute;
        /** @hidden */
        private static createSDPKeywordsAttribute;
        /** @hidden */
        private static createSDPLanguageAttribute;
        /** @hidden */
        private static createSDPMaxPacketTimeAttribute;
        /** @hidden */
        private static createSDPMediaStreamIdAttribute;
        /** @hidden */
        private static createSDPMediaStreamIdSemanticAttribute;
        /** @hidden */
        private static createSDPOrientationAttribute;
        /** @hidden */
        private static createSDPPacketTimeAttribute;
        /** @hidden */
        private static createSDPQualityAttribute;
        /** @hidden */
        private static createSDPReceiveOnlyAttribute;
        /** @hidden */
        private static createSDPRemoteCandidatesAttribute;
        /** @hidden */
        private static createSDPRidAttribute;
        /** @hidden */
        private static createSDPRtcpAttribute;
        /** @hidden */
        private static createSDPRtcpFeedbackAttribute;
        /** @hidden */
        private static createSDPRtcpMuxAttribute;
        /** @hidden */
        private static createSDPRtpMapAttribute;
        /** @hidden */
        private static createSDPSctpMapAttribute;
        /** @hidden */
        private static createSDPSctpMaxMessageSizeAttribute;
        /** @hidden */
        private static createSDPSctpPortAttribute;
        /** @hidden */
        private static createSDPSdpLanguageAttribute;
        /** @hidden */
        private static createSDPSendOnlyAttribute;
        /** @hidden */
        private static createSDPSendReceiveAttribute;
        /** @hidden */
        private static createSDPSetupAttribute;
        /** @hidden */
        private static createSDPSimulcastAttribute;
        /** @hidden */
        private static createSDPSSRCAttribute;
        /** @hidden */
        private static createSDPSSRCGroupAttribute;
        /** @hidden */
        private static createSDPToolAttribute;
        /**
        Gets the name of the attribute type.
        @param type The attribute type.
        */
        static getTypeName(type: fm.icelink.Type): string;
        /**
        Determines whether the type applies to media streams.
        @param type The type.
        */
        static isMediaLevel(type: fm.icelink.Type): boolean;
        /**
        Determines whether the type applies to sessions.
        @param type The type.
        */
        static isSessionLevel(type: fm.icelink.Type): boolean;
        /**
        Creates an [[fm.icelink.sdp.connectionData]] instance from a string.
        @param s The string to parse.
        */
        static parse(s: string): fm.icelink.sdp.Attribute;
        /** @hidden */
        private static registerAttribute;
        /** @hidden */
        private static unregisterAttribute;
        /**
        Gets this Attribute's Type.
        */
        getAttributeType(): fm.icelink.sdp.AttributeType;
        /**
        Gets the internal value of the attribute.
        */
        protected abstract getAttributeValue(): string;
        /**
        Gets the Multiplexing Category of this Attribute.
        */
        getMultiplexingCategory(): fm.icelink.sdp.AttributeCategory;
        /**
        Sets this Attribute's Type.
        */
        setAttributeType(value: fm.icelink.sdp.AttributeType): void;
        /**
        Sets the Multiplexing Category of this Attribute.
        */
        protected setMultiplexingCategory(value: fm.icelink.sdp.AttributeCategory): void;
        /**
        Converts this instance to a string.
        */
        toString(): string;
        /** @hidden */
        private static __fmicelinksdpAttributeInitialized;
        /** @hidden */
        static fmicelinksdpAttributeInitialize(): void;
    }
}
declare namespace fm.icelink.sdp {
    class AttributeCategoryWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.sdp.AttributeCategory);
        toString(): string;
    }
}
declare namespace fm.icelink.sdp {
    /** @hidden */
    class AttributeCollection {
        getTypeString(): string;
        /** @hidden */
        private __attributes;
        constructor();
        addAttribute(attribute: fm.icelink.sdp.Attribute): void;
        remove(attribute: fm.icelink.sdp.Attribute): boolean;
        remove(attributeType: fm.icelink.sdp.AttributeType): boolean;
        replaceAttribute(attribute: fm.icelink.sdp.Attribute): void;
        toArray(): fm.icelink.sdp.Attribute[];
        tryGetAttribute(type: fm.icelink.sdp.AttributeType, attribute: fm.icelink.Holder<fm.icelink.sdp.Attribute>): boolean;
        tryGetAttributes(type: fm.icelink.sdp.AttributeType, attributes: fm.icelink.Holder<fm.icelink.sdp.Attribute[]>): boolean;
    }
}
declare namespace fm.icelink.sdp {
    /** @hidden */
    class AttributeCreationArgs {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: string);
        getValue(): string;
        /** @hidden */
        private setValue;
    }
}
declare namespace fm.icelink.sdp {
    /** @hidden */
    class AttributeRegistration {
        getTypeString(): string;
        /** @hidden */
        private _creationDelegate;
        /** @hidden */
        private _mediaLevel;
        /** @hidden */
        private _name;
        /** @hidden */
        private _sessionLevel;
        private fmicelinksdpAttributeRegistrationInit;
        constructor(name: string, sessionLevel: boolean, mediaLevel: boolean, creationDelegate: fm.icelink.IFunction1<fm.icelink.sdp.AttributeCreationArgs, fm.icelink.sdp.Attribute>);
        getCreationDelegate(): fm.icelink.IFunction1<fm.icelink.sdp.AttributeCreationArgs, fm.icelink.sdp.Attribute>;
        getMediaLevel(): boolean;
        getName(): string;
        getSessionLevel(): boolean;
        setCreationDelegate(value: fm.icelink.IFunction1<fm.icelink.sdp.AttributeCreationArgs, fm.icelink.sdp.Attribute>): void;
        setMediaLevel(value: boolean): void;
        setName(value: string): void;
        setSessionLevel(value: boolean): void;
    }
}
declare namespace fm.icelink.sdp {
    class AttributeTypeWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.sdp.AttributeType);
        toString(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    An SDP bandwidth element.
    */
    class Bandwidth {
        getTypeString(): string;
        /** @hidden */
        private _bandwidthType;
        /** @hidden */
        private _value;
        private fmicelinksdpBandwidthInit;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.bandwidth]] class.
        @param bandwidthType The type of bandwidth. See [[fm.icelink.sdp.bandwidth.bandwidthType]] for possible values.
        @param value The bandwidth, typically in kilobits per second.
        */
        constructor(bandwidthType: string, value: number);
        /**
        Creates an [[fm.icelink.sdp.bandwidth]] instance from a string.
        @param s The string to parse.
        */
        static parse(s: string): fm.icelink.sdp.Bandwidth;
        /**
        Gets the type of bandwidth. See [[fm.icelink.sdp.bandwidth.bandwidthType]] for possible values.
        */
        getBandwidthType(): string;
        /**
        Gets the bandwidth, typically in kilobits per second.
        */
        getValue(): number;
        /** @hidden */
        private setBandwidthType;
        /** @hidden */
        private setValue;
        /**
        Converts this instance to a string.
        */
        toString(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    Defines valid SDP bandwidth types.
    */
    abstract class BandwidthType {
        getTypeString(): string;
        /**
        Gets the SDP bandwidth type meaning "Application Specific".
        */
        static getApplicationSpecific(): string;
        /**
        Gets the SDP bandwidth type meaning "Conference Total".
        */
        static getConferenceTotal(): string;
        /**
        Gets the SDP bandwidth type meaning "RTCP Receivers".
        */
        static getRtcpReceivers(): string;
        /**
        Gets the SDP bandwidth type meaning "RTCP Senders".
        */
        static getRtcpSenders(): string;
        /**
        Gets the SDP bandwidth type meaning "Transport Independent Application Specific Maximum".
        */
        static getTransportIndependentApplicationSpecificMaximum(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    An SDP encryption key element.
    */
    abstract class EncryptionKey {
        getTypeString(): string;
        constructor();
        /**
        Creates an [[fm.icelink.sdp.encryptionKey]] instance from a string.
        @param s The string to parse.
        */
        static parse(s: string): fm.icelink.sdp.EncryptionKey;
        /** @hidden */
        abstract getMethodAndValue(): string;
        /**
        Converts this instance to a string.
        */
        toString(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    An SDP encryption key with a method of "base64".
    */
    class Base64EncryptionKey extends fm.icelink.sdp.EncryptionKey {
        getTypeString(): string;
        /** @hidden */
        private _encodedEncryptionKey;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.base64EncryptionKey]] class.
        @param encodedEncryptionKey The base64-encoded encryption key.
        */
        constructor(encodedEncryptionKey: string);
        /**
        Gets the base64-encoded encryption key.
        */
        getEncodedEncryptionKey(): string;
        /** @hidden */
        getMethodAndValue(): string;
        /** @hidden */
        private setEncodedEncryptionKey;
    }
}
declare namespace fm.icelink.sdp {
    /**
    Defined in draft-ietf-mmusic-sdp-bundle-negotiation. Attribute is used to identify that a gioven media description can only be used  in bundled group. Its formatting in SDP is described by the following BNF: Name: bundle-only  Value: N/A  Usage Level: media  Charset Dependent: no  Example:  a=bundle-only
    */
    class BundleOnlyAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.bundleOnlyAttribute]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.groupAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.BundleOnlyAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    This attribute gives the dot-separated hierarchical category of the session.  This is to enable a receiver to filter unwanted sessions by category.  There is no central registry of categories.  It is a session-level attribute, and it is not dependent on charset.
    */
    class CategoryAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _category;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.categoryAttribute]] class.
        @param category The dot-separated hierarchical category of the session.
        */
        constructor(category: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.categoryAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.CategoryAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the dot-separated hierarchical category of the session.
        */
        getCategory(): string;
        /** @hidden */
        private setCategory;
    }
}
declare namespace fm.icelink.sdp {
    /**
    This specifies the character set to be used to display the session name and information data.  By default, the ISO-10646 character set in UTF-8 encoding is used.  If a more compact representation is required, other character sets may be used. For example, the ISO 8859-1 is specified with the following SDP attribute:  a=charset:ISO-8859-1
    */
    class CharacterSetAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _characterSet;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.characterSetAttribute]] class.
        @param characterSet The character set to be used to display the session name and information data.
        */
        constructor(characterSet: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.characterSetAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.CharacterSetAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the character set to be used to display the session name and information data.
        */
        getCharacterSet(): string;
        /** @hidden */
        private setCharacterSet;
    }
}
declare namespace fm.icelink.sdp {
    /**
    An SDP encryption key with a method of "clear".
    */
    class ClearEncryptionKey extends fm.icelink.sdp.EncryptionKey {
        getTypeString(): string;
        /** @hidden */
        private _encryptionKey;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.clearEncryptionKey]] class.
        @param encryptionKey The untransformed encryption key.
        */
        constructor(encryptionKey: string);
        /**
        Gets the untransformed encryption key.
        */
        getEncryptionKey(): string;
        /** @hidden */
        getMethodAndValue(): string;
        /** @hidden */
        private setEncryptionKey;
    }
}
declare namespace fm.icelink.sdp {
    /**
    Defines valid SDP conference types.
    */
    abstract class ConferenceType {
        getTypeString(): string;
        /**
        Gets the SDP conference type meaning "Broadcast", which should imply receive-only.
        */
        static getBroadcast(): string;
        /**
        Gets the SDP conference type meaning "H332", which should imply receive-only and indicate that this loosely coupled session is part of an H.332 session.
        */
        static getH332(): string;
        /**
        Gets the SDP conference type meaning "Meeting", which should imply send-receive.
        */
        static getMeeting(): string;
        /**
        Gets the SDP conference type meaning "Moderated", which should indicate the use of a floor control tool and that the media tools are started so as to mute new sites joining the conference.
        */
        static getModerated(): string;
        /**
        Gets the SDP conference type meaning "Test", which should imply that unless explicitly requested otherwise, receivers can safely avoid displaying this session description to users.
        */
        static getTest(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    This specifies the type of the conference.  Suggested values are "broadcast", "meeting", "moderated", "test", and "H332". "recvonly" should be the default for "type:broadcast" sessions, "type:meeting" should imply "sendrecv", and "type:moderated" should indicate the use of a floor control tool and that the media tools are started so as to mute new sites joining the conference.
    */
    class ConferenceTypeAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _conferenceType;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.conferenceTypeAttribute]] class.
        @param conferenceType The type of the conference. See [[fm.icelink.sdp.conferenceTypeAttribute.conferenceType]] for possible values.
        */
        constructor(conferenceType: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.conferenceTypeAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.ConferenceTypeAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the type of the conference. See [[fm.icelink.sdp.conferenceTypeAttribute.conferenceType]] for possible values.
        */
        getConferenceType(): string;
        /** @hidden */
        private setConferenceType;
    }
}
declare namespace fm.icelink.sdp {
    /**
    An SDP connection data element.
    */
    class ConnectionData {
        getTypeString(): string;
        /** @hidden */
        private _addressType;
        /** @hidden */
        private _connectionAddress;
        /** @hidden */
        private _networkType;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.connectionData]] class.
        @param connectionAddress The connection address.
        */
        constructor(connectionAddress: string);
        /**
        Creates an [[fm.icelink.sdp.connectionData]] instance from a string.
        @param s The string to parse.
        */
        static parse(s: string): fm.icelink.sdp.ConnectionData;
        /**
        Gets the type of the address. See [[fm.icelink.sdp.connectionData.addressType]] for possible values.
        */
        getAddressType(): string;
        /**
        Gets the connection address.
        */
        getConnectionAddress(): string;
        /**
        Gets the type of network. See [[fm.icelink.sdp.connectionData.networkType]] for possible values.
        */
        getNetworkType(): string;
        /**
        Sets the type of the address. See [[fm.icelink.sdp.connectionData.addressType]] for possible values.
        */
        setAddressType(value: string): void;
        /**
        Sets the connection address.
        */
        setConnectionAddress(value: string): void;
        /**
        Sets the type of network. See [[fm.icelink.sdp.connectionData.networkType]] for possible values.
        */
        setNetworkType(value: string): void;
        /**
        Converts this instance to a string.
        */
        toString(): string;
        /**
        Updates the connection address.
        @param connectionAddress The connection address.
        */
        update(connectionAddress: string): void;
    }
}
declare namespace fm.icelink.sdp {
    /**
    This gives the maximum amount of media that can be encapsulated in each packet, expressed as time in milliseconds.  The time SHALL be calculated as the sum of the time the media present in the packet represents.  For frame-based codecs, the time SHOULD be an integer multiple of the frame size.  This attribute is probably only meaningful for audio data, but may be used with other media types if it makes sense.  It is a media-level attribute, and it is not dependent on charset.  Note that this attribute was introduced after RFC 2327, and non-updated implementations will ignore this attribute.
    */
    class CryptoAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _cryptoSuite;
        /** @hidden */
        private _keyParams;
        /** @hidden */
        private _sessionParams;
        /** @hidden */
        private _tag;
        private fmicelinksdpCryptoAttributeInit;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.cryptoAttribute]] class.
        @param tag The tag.
        @param cryptoSuite The crypto suite.
        */
        constructor(tag: number, cryptoSuite: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.cryptoAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.CryptoAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the crypto suite. See [[fm.icelink.sdp.cryptoAttribute.cryptoSuite]] for possible values.
        */
        getCryptoSuite(): string;
        /**
        Gets the key from the "inline" key parameter.
        */
        getKey(): fm.icelink.DataBuffer;
        /**
        Gets the key parameters.
        */
        getKeyParams(): fm.icelink.Hash<string, string>;
        /**
        Gets the salt from the "inline" key parameter.
        */
        getSalt(): fm.icelink.DataBuffer;
        /**
        Gets the session parameters.
        */
        getSessionParams(): Array<string>;
        /**
        Gets the tag.
        */
        getTag(): number;
        /** @hidden */
        private setCryptoSuite;
        /** @hidden */
        private setKeyParams;
        /**
        Sets the key and salt for the "inline" key parameter.
        @param key The key.
        @param salt The salt.
        */
        setKeySalt(key: Uint8Array, salt: Uint8Array): fm.icelink.sdp.CryptoAttribute;
        /** @hidden */
        private setSessionParams;
        /**
        Sets the tag.
        */
        setTag(value: number): void;
    }
}
declare namespace fm.icelink.sdp {
    /**
    Defines valid SDP crypto key methods.
    */
    abstract class CryptoKeyMethod {
        getTypeString(): string;
        /**
        Gets the SDP crypto key method meaning "inline".
        */
        static getInline(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    Defines valid SDP crypto session parameters.
    */
    abstract class CryptoSessionParam {
        getTypeString(): string;
        /**
        Gets the SDP crypto session parameter meaning "unauthenticated SRTP".
        */
        static getUnauthenticatedSRTP(): string;
        /**
        Gets the SDP crypto session parameter meaning "unencrypted SRTCP".
        */
        static getUnencryptedSRTCP(): string;
        /**
        Gets the SDP crypto session parameter meaning "unencrypted SRTP".
        */
        static getUnencryptedSRTP(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    Defines valid SDP crypto suites.
    */
    abstract class CryptoSuite {
        getTypeString(): string;
        /**
        Gets the SDP crypto suite meaning "AES-CM 128-bit cipher and HMAC-SHA1 message authentication with a 32-bit authentication tag".
        */
        static getAesCm128HmacSha132(): string;
        /**
        Gets the SDP crypto suite meaning "AES-CM 128-bit cipher and HMAC-SHA1 message authentication with an 80-bit authentication tag".
        */
        static getAesCM128HmacSha180(): string;
        /**
        Converts an EncryptionMode enum to a crypto-suite string.
        @param encryptionMode The EncryptionMode enum.
        @return The crypto-suite string.
        */
        static getCryptoSuite(encryptionMode: fm.icelink.EncryptionMode): string;
        /**
        Converts a crypto-suite string to an EncryptionMode enum.
        @param cryptoSuite The crypto-suite string.
        @return The EncryptionMode enum.
        */
        static getEncryptionMode(cryptoSuite: string): fm.icelink.EncryptionMode;
        /**
        Gets the SDP crypto suite meaning "NULL cipher and HMAC-SHA1 message authentication with a 32-bit authentication tag".
        */
        static getNullHmacSha132(): string;
        /**
        Gets the SDP crypto suite meaning "NULL cipher and HMAC-SHA1 message authentication with an 80-bit authentication tag".
        */
        static getNullHmacSha180(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    This specifies the mode in which tools should be started.
    */
    abstract class DirectionAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        constructor();
        /**
        Creates a DirectionAttribute for a required direction.
        @param direction Direction.
        */
        static generateDirectionAttribute(direction: fm.icelink.StreamDirection): fm.icelink.sdp.DirectionAttribute;
        /**
        Gets the stream direction.
        */
        abstract getStreamDirection(): fm.icelink.StreamDirection;
    }
}
declare namespace fm.icelink.sdp {
    /**
    This attribute allows parameters that are specific to a particular format to be conveyed in a way that SDP does not have to understand them.  The format must be one of the formats specified for the media.  Format-specific parameters may be any set of parameters required to be conveyed by SDP and given unchanged to the media tool that will use this format.  At most one instance of this attribute is allowed for each format.
    */
    class FormatParametersAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _format;
        /** @hidden */
        private _formatSpecificParameters;
        private fmicelinksdpFormatParametersAttributeInit;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.formatParametersAttribute]] class.
        @param format The format.
        */
        constructor(format: number);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.formatParametersAttribute]] class.
        @param format The format.
        @param formatSpecificParameters The format-specific parameters.
        */
        constructor(format: number, formatSpecificParameters: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.formatParametersAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.FormatParametersAttribute;
        /**
        Creates a dictionary map from the format specific parameters.
        */
        deserializeFormatSpecificParameters(): fm.icelink.Hash<string, string>;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the format.
        */
        getFormat(): number;
        /**
        Gets a format specific parameter.
        @param key The key.
        */
        getFormatSpecificParameter(key: string): string;
        /**
        Gets the format-specific parameters.
        */
        getFormatSpecificParameters(): string;
        /**
        Updates the format specific parameters based on a dictionary map.
        @param map The map.
        */
        serializeFormatSpecificParameters(map: fm.icelink.Hash<string, string>): void;
        /**
        Sets the format.
        */
        setFormat(value: number): void;
        /**
        Sets a format specific parameter.
        @param key The key.
        @param value The value.
        */
        setFormatSpecificParameter(key: string, value: string): void;
        /** @hidden */
        private setFormatSpecificParameters;
        /**
        Tries to get a format specific parameter.
        @param key The key.
        @param value The value.
        */
        tryGetFormatSpecificParameter(key: string, value: fm.icelink.Holder<string>): boolean;
        /**
        Unsets a format specific parameter.
        @param key The key.
        */
        unsetFormatSpecificParameter(key: string): boolean;
    }
}
declare namespace fm.icelink.sdp {
    /**
    This gives the maximum video frame rate in frames/sec.  It is intended as a recommendation for the encoding of video data. Decimal representations of fractional values using the notation "integer.fraction" are allowed.  It is a media-level attribute, defined only for video media, and it is not dependent on charset.
    */
    class FrameRateAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _frameRate;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.frameRateAttribute]] class.
        @param frameRate The maximum video frame rate in frames/second.
        */
        constructor(frameRate: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.frameRateAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.FrameRateAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the maximum video frame rate in frames/second.
        */
        getFrameRate(): string;
        /** @hidden */
        private setFrameRate;
    }
}
declare namespace fm.icelink.sdp {
    /**
    A bundle group of SDP Media Description elements.
    */
    class BundleGroup {
        getTypeString(): string;
        /** @hidden */
        private __mediaDescriptions;
        /** @hidden */
        private __mids;
        /** @hidden */
        private _bundleOnly;
        /** @hidden */
        private _groupType;
        /** @hidden */
        private _taggedMSection;
        private fmicelinksdpBundleGroupInit;
        /**
        Creates a BundleGroup object.
        @param groupType
        */
        constructor(groupType: fm.icelink.sdp.GroupSemanticsType);
        /**
        Adds a media description to this bundle group.
        @param mediaDescription
        */
        addMediaDescription(mediaDescription: fm.icelink.sdp.MediaDescription): void;
        /**
        Gets a value indicating whether this group contains Bundle-only elements.
        */
        getBundleOnly(): boolean;
        /**
        Gets the semntic type of this group.
        */
        getGroupType(): fm.icelink.sdp.GroupSemanticsType;
        /**
        Gets the mecia descriptions in this bundle group.
        */
        getMediaDescriptions(): fm.icelink.sdp.MediaDescription[];
        /**
        Gets media description identifiers associated with this bundle group.
        */
        getMids(): string[];
        /**
        Gets the tagged m-section of this bundle group.
        */
        getTaggedMSection(): fm.icelink.sdp.MediaDescription;
        /** @hidden */
        private setBundleOnly;
        /** @hidden */
        private setGroupType;
        /**
        Sets the tagged m-section of this bundle group.
        */
        setTaggedMSection(value: fm.icelink.sdp.MediaDescription): void;
    }
}
declare namespace fm.icelink.sdp {
    /**
    Defined in RFC 3388. Attribute is used for grouping together different media streams. Its formatting in SDP is described by the following BNF: group-attribute    = "a=group:" semantics * (space identification-tag) semantics          = "LS" | "FID" | "BUNDLE"
    */
    class GroupAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _ids;
        /** @hidden */
        private _semantics;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.groupAttribute]] class.
        @param type The semantics type.
        @param ids Group identification ID tags.
        */
        constructor(type: fm.icelink.sdp.GroupSemanticsType, ids: string[]);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.groupAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.GroupAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the group identification tags.
        */
        getIds(): string[];
        /**
        Gets the semantics.
        */
        getSemantics(): fm.icelink.sdp.GroupSemanticsType;
        /** @hidden */
        private setIds;
        /** @hidden */
        private setSemantics;
    }
}
declare namespace fm.icelink.sdp {
    class GroupSemanticsTypeWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.sdp.GroupSemanticsType);
        toString(): string;
    }
}
declare namespace fm.icelink.sdp.ice {
    /**
    The candidate attribute is a media-level attribute only.  It contains a transport address for a candidate that can be used for connectivity checks.
    */
    class CandidateAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private __candidateType;
        /** @hidden */
        private __connectionAddress;
        /** @hidden */
        private __foundation;
        /** @hidden */
        private _componentId;
        /** @hidden */
        private _extensions;
        /** @hidden */
        private _port;
        /** @hidden */
        private _priority;
        /** @hidden */
        private _protocol;
        /** @hidden */
        private _relatedAddress;
        /** @hidden */
        private _relatedPort;
        private fmicelinksdpiceCandidateAttributeInit;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.ice.candidateAttribute]] class.
        @param foundation The candidate's foundation.
        @param priority The priority of the candidate.
        @param connectionAddress The IP address of the candidate.
        @param port The port of the candidate.
        @param candidateType The type of the candidate. See [[fm.icelink.sdp.ice.candidateAttribute.candidateType]] for possible values.
        @param componentId The component identifier.
        */
        constructor(foundation: string, priority: number, connectionAddress: string, port: number, candidateType: string, componentId: number);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.ice.candidateAttribute]] class.
        @param foundation The candidate's foundation.
        @param priority The priority of the candidate.
        @param connectionAddress The IP address of the candidate.
        @param port The port of the candidate.
        @param candidateType The type of the candidate. See [[fm.icelink.sdp.ice.candidateAttribute.candidateType]] for possible values.
        @param relatedAddress The IP address related to the candidate.
        @param relatedPort The port related to the candidate.
        @param protocol The protocol.
        @param componentId The ID of the component for which this is a candidate.
        */
        constructor(foundation: string, priority: number, connectionAddress: string, port: number, candidateType: string, relatedAddress: string, relatedPort: number, protocol: string, componentId: number);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.ice.candidateAttribute]] class.
        @param value The attribute as a string.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.ice.CandidateAttribute;
        /**
        Gets the value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the type of the candidate. See [[fm.icelink.sdp.ice.candidateAttribute.candidateType]] for possible values.
        */
        getCandidateType(): string;
        /**
        Gets the ID of the component for which this is a candidate.
        */
        getComponentId(): number;
        /**
        Gets the IP address of the candidate.
        */
        getConnectionAddress(): string;
        /**
        Gets the extensions.
        */
        getExtensions(): fm.icelink.Hash<string, string>;
        /**
        Gets the candidate's foundation.
        */
        getFoundation(): string;
        /**
        Gets the port of the candidate.
        */
        getPort(): number;
        /**
        Gets the priority of the candidate.
        */
        getPriority(): number;
        /**
        Gets the protocol of this candidate.
        */
        getProtocol(): string;
        /**
        Gets the IP address related to the candidate.
        */
        getRelatedAddress(): string;
        /**
        Gets the port related to the candidate.
        */
        getRelatedPort(): number;
        /**
        Sets the type of the candidate. See [[fm.icelink.sdp.ice.candidateAttribute.candidateType]] for possible values.
        */
        setCandidateType(value: string): void;
        /**
        Sets the ID of the component for which this is a candidate.
        */
        setComponentId(value: number): void;
        /**
        Sets the IP address of the candidate.
        */
        setConnectionAddress(value: string): void;
        /** @hidden */
        private setExtensions;
        /**
        Sets the candidate's foundation.
        */
        setFoundation(value: string): void;
        /**
        Sets the port of the candidate.
        */
        setPort(value: number): void;
        /**
        Sets the priority of the candidate.
        */
        setPriority(value: number): void;
        /**
        Sets the protocol of this candidate.
        */
        setProtocol(value: string): void;
        /**
        Sets the IP address related to the candidate.
        */
        setRelatedAddress(value: string): void;
        /**
        Sets the port related to the candidate.
        */
        setRelatedPort(value: number): void;
    }
}
declare namespace fm.icelink.sdp.ice {
    /**
    Defines valid SDP candidate types.
    */
    abstract class CandidateType {
        getTypeString(): string;
        /**
        Gets the SDP candidate type meaning "Host".
        */
        static getHost(): string;
        /**
        Gets the SDP candidate type meaning "Peer Reflexive".
        */
        static getPeerReflexive(): string;
        /**
        Gets the SDP candidate type meaning "Relayed".
        */
        static getRelayed(): string;
        /**
        Gets the SDP candidate type meaning "Server Reflexive".
        */
        static getServerReflexive(): string;
    }
}
declare namespace fm.icelink.sdp.ice {
    /**
    The SDP session attribute "fingerprint" provides an encryption certificate fingerprint to a remote peer for use with DTLS.
    */
    class FingerprintAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _fingerprint;
        /** @hidden */
        private _hashFunction;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.ice.fingerprintAttribute]] class.
        @param hashFunction The hash function.
        @param fingerprint The fingerprint.
        */
        constructor(hashFunction: string, fingerprint: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.ice.fingerprintAttribute]] class.
        @param value The attribute as a string.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.ice.FingerprintAttribute;
        /**
        Gets the value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the fingerprint.
        */
        getFingerprint(): string;
        /**
        Gets the hash function (i.e. sha-256).
        */
        getHashFunction(): string;
        /** @hidden */
        private setFingerprint;
        /** @hidden */
        private setHashFunction;
    }
}
declare namespace fm.icelink.sdp.ice {
    /**
    "ice-lite" is a session-level attribute only, and indicates that an agent is a lite implementation.
    */
    class LiteAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.ice.liteAttribute]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.ice.liteAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.ice.LiteAttribute;
        /**
        Gets the value of the attribute.
        */
        protected getAttributeValue(): string;
    }
}
declare namespace fm.icelink.sdp.ice {
    /**
    "ice-mismatch" is a media-level attribute only, and when present in an answer, indicates that the offer arrived with a default destination for a media component that didn't have a corresponding candidate attribute.
    */
    class MismatchAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.ice.mismatchAttribute]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.ice.mismatchAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.ice.MismatchAttribute;
        /**
        Gets the value of the attribute.
        */
        protected getAttributeValue(): string;
    }
}
declare namespace fm.icelink.sdp.ice {
    /**
    The "ice-options" attribute is a session-level attribute.  It contains a series of tokens that identify the options supported by the agent.
    */
    class OptionsAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private __tags;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.ice.optionsAttribute]] class.
        @param tags The tokens that identify options supported by the agent.
        */
        constructor(tags: Array<fm.icelink.sdp.ice.OptionTag>);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.ice.optionsAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.ice.OptionsAttribute;
        /**
        Gets the value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the tokens that identify options supported by the agent.
        */
        getTags(): Array<fm.icelink.sdp.ice.OptionTag>;
        /**
        Gets a value indicating whether trickle-ice is supported.
        */
        getTrickleOptionSet(): boolean;
        /**
        Sets the tokens that identify options supported by the agent.
        */
        setTags(value: Array<fm.icelink.sdp.ice.OptionTag>): void;
        /**
        Sets a value indicating whether trickle-ice is supported.
        */
        setTrickleOptionSet(value: boolean): void;
    }
}
declare namespace fm.icelink.sdp.ice {
    /**
    A tag for an [[fm.icelink.sdp.ice.optionsAttribute]].
    */
    abstract class OptionTag {
        getTypeString(): string;
        /** @hidden */
        private _type;
        constructor();
        /**
        Gets the "trickle" option string.
        */
        static getTrickle(): string;
        /**
        Generates a tag object from a string.
        @param tagString The tag string.
        */
        static parse(tagString: string): fm.icelink.sdp.ice.OptionTag;
        /**
        Gets the type of this tag.
        */
        getType(): fm.icelink.sdp.ice.OptionTagType;
        /**
        Sets the type of this tag.
        */
        protected setType(value: fm.icelink.sdp.ice.OptionTagType): void;
        /**
        Gets the string representation of this tag.
        */
        abstract toString(): string;
    }
}
declare namespace fm.icelink.sdp.ice {
    class OptionTagTypeWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.sdp.ice.OptionTagType);
        toString(): string;
    }
}
declare namespace fm.icelink.sdp.ice {
    /**
    The "ice-pwd" attribute conveys the password used by ICE for message integrity.
    */
    class PasswordAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _password;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.ice.passwordAttribute]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.ice.passwordAttribute]] class.
        @param password The password used by ICE for message integrity.
        */
        constructor(password: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.ice.passwordAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.ice.PasswordAttribute;
        /**
        Generates a random password.
        */
        static generatePassword(): string;
        /**
        Gets the value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the password used by ICE for message integrity.
        */
        getPassword(): string;
        /** @hidden */
        private setPassword;
    }
}
declare namespace fm.icelink.sdp.ice {
    /**
    An SDP remote candidate element.
    */
    class RemoteCandidate {
        getTypeString(): string;
        /** @hidden */
        private _componentId;
        /** @hidden */
        private _connectionAddress;
        /** @hidden */
        private _port;
        private fmicelinksdpiceRemoteCandidateInit;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.ice.remoteCandidate]] class.
        @param componentId The ID of the component for which this is a remote candidate.
        @param connectionAddress The IP address of the remote candidate.
        @param port The port of the remote candidate.
        */
        constructor(componentId: number, connectionAddress: string, port: number);
        /**
        Creates an [[fm.icelink.sdp.ice.remoteCandidate]] instance from a string.
        @param s The string to parse.
        */
        static parse(s: string): fm.icelink.sdp.ice.RemoteCandidate;
        /**
        Gets the ID of the component for which this is a remote candidate.
        */
        getComponentId(): number;
        /**
        Gets the IP address of the remote candidate.
        */
        getConnectionAddress(): string;
        /**
        Gets the port of the remote candidate.
        */
        getPort(): number;
        /** @hidden */
        private setComponentId;
        /** @hidden */
        private setConnectionAddress;
        /** @hidden */
        private setPort;
        /**
        Converts this instance to a string.
        */
        toString(): string;
    }
}
declare namespace fm.icelink.sdp.ice {
    /**
    The attribute contains a connection-address and port for each component.  The ordering of components is irrelevant.  However, a value MUST be present for each component of a media stream.  This attribute MUST be included in an offer by a controlling agent for a media stream that is Completed, and MUST NOT be included in any other case.
    */
    class RemoteCandidatesAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _candidates;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.ice.remoteCandidatesAttribute]] class.
        @param candidates The array of remote candidates.
        */
        constructor(candidates: fm.icelink.sdp.ice.RemoteCandidate[]);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.ice.remoteCandidatesAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.ice.RemoteCandidatesAttribute;
        /**
        Gets the value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the array of remote candidates.
        */
        getCandidates(): fm.icelink.sdp.ice.RemoteCandidate[];
        /** @hidden */
        private setCandidates;
    }
}
declare namespace fm.icelink.sdp.ice {
    /**
    Defines valid SDP transport protocols.
    */
    abstract class TransportProtocol {
        getTypeString(): string;
        /**
        Gets the SDP transport protocol meaning "tcp".
        */
        static getTcp(): string;
        /**
        Gets the SDP transport protocol meaning "udp".
        */
        static getUdp(): string;
    }
}
declare namespace fm.icelink.sdp.ice {
    /**
    A trickle-ice tag for an [[fm.icelink.sdp.ice.optionsAttribute]]
    */
    class TrickleIceOptionTag extends fm.icelink.sdp.ice.OptionTag {
        getTypeString(): string;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.ice.trickleIceOptionTag]] class.
        */
        constructor();
        /**
        Gets the string representation of this tag
        */
        toString(): string;
    }
}
declare namespace fm.icelink.sdp.ice {
    /**
    The "ice-ufrag" attribute conveys the username fragment used by ICE for message integrity.
    */
    class UfragAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _ufrag;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.ice.ufragAttribute]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.ice.ufragAttribute]] class.
        @param ufrag The username fragment used by ICE for message integrity.
        */
        constructor(ufrag: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.ice.ufragAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.ice.UfragAttribute;
        /**
        Generates a username fragment.
        */
        static generateUfrag(): string;
        /**
        Gets the value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the username fragment used by ICE for message integrity.
        */
        getUfrag(): string;
        /** @hidden */
        private setUfrag;
    }
}
declare namespace fm.icelink.sdp.ice {
    /**
    An unknown tag for an [[fm.icelink.sdp.ice.optionsAttribute]]
    */
    class UnknownIceOptionTag extends fm.icelink.sdp.ice.OptionTag {
        getTypeString(): string;
        /** @hidden */
        private _tagString;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.ice.unknownIceOptionTag]] class.
        */
        constructor(tagString: string);
        /**
        Gets the tag string.
        */
        getTagString(): string;
        /** @hidden */
        private setTagString;
        /**
        Gets the string representation of this tag.
        */
        toString(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    This specifies that the tools should be started in inactive mode.  This is necessary for interactive conferences where users can put other users on hold.  No media is sent over an inactive media stream.  Note that an RTP-based system SHOULD still send RTCP, even if started inactive.  It can be either a session or media-level attribute, and it is not dependent on charset.
    */
    class InactiveAttribute extends fm.icelink.sdp.DirectionAttribute {
        getTypeString(): string;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.inactiveAttribute]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.inactiveAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.InactiveAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the stream direction.
        */
        getStreamDirection(): fm.icelink.StreamDirection;
    }
}
declare namespace fm.icelink.sdp {
    /**
    Like the cat attribute, this is to assist identifying wanted sessions at the receiver.  This allows a receiver to select interesting session based on keywords describing the purpose of the session; there is no central registry of keywords.  It is a session-level attribute.  It is a charset-dependent attribute, meaning that its value should be interpreted in the charset specified for the session description if one is specified, or by default in ISO 10646/UTF-8.
    */
    class KeywordsAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _keywords;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.keywordsAttribute]] class.
        @param keywords The keywords describing the purpose of the session.
        */
        constructor(keywords: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.keywordsAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.KeywordsAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the keywords describing the purpose of the session.
        */
        getKeywords(): string;
        /** @hidden */
        private setKeywords;
    }
}
declare namespace fm.icelink.sdp {
    /**
    This can be a session-level attribute or a media-level attribute.  As a session-level attribute, it specifies the default language for the session being described.  As a media- level attribute, it specifies the language for that media, overriding any session-level language specified.  Multiple lang attributes can be provided either at session or media level if the session description or media use multiple languages, in which case the order of the attributes indicates the order of importance of the various languages in the session or media from most important to least important.
    */
    class LanguageAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _languageTag;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.languageAttribute]] class.
        @param languageTag The default language for the session being described
                    (if used as a session-level attribute) or the language for a media
                    stream (if used as a media-level attribute).
        */
        constructor(languageTag: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.languageAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.LanguageAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the default language for the session being described (if used as a session-level attribute) or the language for a media stream (if used as a media-level attribute).
        */
        getLanguageTag(): string;
        /** @hidden */
        private setLanguageTag;
    }
}
declare namespace fm.icelink.sdp {
    /**
    This gives the maximum amount of media that can be encapsulated in each packet, expressed as time in milliseconds.  The time SHALL be calculated as the sum of the time the media present in the packet represents.  For frame-based codecs, the time SHOULD be an integer multiple of the frame size.  This attribute is probably only meaningful for audio data, but may be used with other media types if it makes sense.  It is a media-level attribute, and it is not dependent on charset.  Note that this attribute was introduced after RFC 2327, and non-updated implementations will ignore this attribute.
    */
    class MaxPacketTimeAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _maxPacketTime;
        private fmicelinksdpMaxPacketTimeAttributeInit;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.maxPacketTimeAttribute]] class.
        @param maxPacketTime The maximum amount of media that can be encapsulated,
                    in each packet, expressed as time in milliseconds.
        */
        constructor(maxPacketTime: number);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.maxPacketTimeAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.MaxPacketTimeAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the maximum amount of media that can be encapsulated, in each packet, expressed as time in milliseconds.
        */
        getMaxPacketTime(): number;
        /** @hidden */
        private setMaxPacketTime;
    }
}
declare namespace fm.icelink.sdp {
    /**
    An SDP media element.
    */
    class Media {
        getTypeString(): string;
        /** @hidden */
        private _formatDescription;
        /** @hidden */
        private _mediaType;
        /** @hidden */
        private _numberOfPorts;
        /** @hidden */
        private _transportPort;
        /** @hidden */
        private _transportProtocol;
        /** @hidden */
        private static fm_icelink_sdp_Media__defaultNumberOfPorts;
        private fmicelinksdpMediaInit;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.media]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.media]] class.
        @param mediaType The media type. See [[fm.icelink.sdp.media.mediaType]] for possible values.
        @param transportPort The transport port.
        @param transportProtocol The transport protocol.
        */
        constructor(mediaType: string, transportPort: number, transportProtocol: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.media]] class.
        @param mediaType The media type. See [[fm.icelink.sdp.media.mediaType]] for possible values.
        @param transportPort The transport port.
        @param transportProtocol The transport protocol.
        @param formatDescription The format description.
        */
        constructor(mediaType: string, transportPort: number, transportProtocol: string, formatDescription: string);
        /**
        Creates an [[fm.icelink.sdp.media]] instance from a string.
        @param s The string to parse.
        */
        static parse(s: string): fm.icelink.sdp.Media;
        /**
        Gets the format description.
        */
        getFormatDescription(): string;
        /**
        Gets the media type. See [[fm.icelink.sdp.media.mediaType]] for possible values.
        */
        getMediaType(): string;
        /**
        Gets the number of ports.
        */
        getNumberOfPorts(): number;
        /**
        Gets the transport port.
        */
        getTransportPort(): number;
        /**
        Gets the transport protocol.
        */
        getTransportProtocol(): string;
        /**
        Sets the format description.
        */
        setFormatDescription(value: string): void;
        /**
        Sets the media type. See [[fm.icelink.sdp.media.mediaType]] for possible values.
        */
        setMediaType(value: string): void;
        /**
        Sets the number of ports.
        */
        setNumberOfPorts(value: number): void;
        /**
        Sets the transport port.
        */
        setTransportPort(value: number): void;
        /**
        Sets the transport protocol.
        */
        setTransportProtocol(value: string): void;
        /**
        Converts this instance to a string.
        */
        toString(): string;
        /** @hidden */
        private static __fmicelinksdpMediaInitialized;
        /** @hidden */
        static fmicelinksdpMediaInitialize(): void;
    }
}
declare namespace fm.icelink.sdp {
    /**
    An SDP media description element.
    */
    class MediaDescription {
        getTypeString(): string;
        /** @hidden */
        private __bandwidths;
        /** @hidden */
        private __mediaAttributes;
        /** @hidden */
        private __orphanedAttributes;
        /** @hidden */
        private _connectionData;
        /** @hidden */
        private _encryptionKey;
        /** @hidden */
        private _media;
        /** @hidden */
        private _mediaTitle;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.mediaDescription]] class.
        @param media The media name and transport address.
        */
        constructor(media: fm.icelink.sdp.Media);
        /** @hidden */
        static getBundleOnlyAttributeFromCollection(attributes: fm.icelink.sdp.AttributeCollection): fm.icelink.sdp.Attribute;
        /** @hidden */
        static getCryptoAttributesFromCollection(attributes: fm.icelink.sdp.AttributeCollection): fm.icelink.sdp.CryptoAttribute[];
        /** @hidden */
        static getFingerprintAttributeFromCollection(attributes: fm.icelink.sdp.AttributeCollection): fm.icelink.sdp.ice.FingerprintAttribute;
        /** @hidden */
        static getGroupAttributesFromCollection(collection: fm.icelink.sdp.AttributeCollection): fm.icelink.sdp.GroupAttribute[];
        /** @hidden */
        static getIceOptionAttributesFromCollection(attributes: fm.icelink.sdp.AttributeCollection): fm.icelink.sdp.Attribute[];
        /** @hidden */
        static getIcePasswordAttributeFromCollection(attributes: fm.icelink.sdp.AttributeCollection): fm.icelink.sdp.ice.PasswordAttribute;
        /** @hidden */
        static getIceUfragAttributeFromCollection(attributes: fm.icelink.sdp.AttributeCollection): fm.icelink.sdp.ice.UfragAttribute;
        /** @hidden */
        static getQualityAttributeFromCollection(attributes: fm.icelink.sdp.AttributeCollection): fm.icelink.sdp.QualityAttribute;
        /** @hidden */
        static getRtcpMultiplexingSupportFromCollection(attributes: fm.icelink.sdp.AttributeCollection): boolean;
        /** @hidden */
        static getRtpExtMapAttributesFromCollection(attributes: fm.icelink.sdp.AttributeCollection): fm.icelink.sdp.Attribute[];
        /** @hidden */
        static getSetupAttributeFromCollection(attributes: fm.icelink.sdp.AttributeCollection): fm.icelink.sdp.SetupAttribute;
        /** @hidden */
        static getStreamDirectionFromCollection(attributes: fm.icelink.sdp.AttributeCollection): fm.icelink.StreamDirection;
        /** @hidden */
        static getSupportsIceFromCollection(attributes: fm.icelink.sdp.AttributeCollection): boolean;
        /**
        Creates an [[fm.icelink.sdp.mediaDescription]] instance from a string.
        @param s The string to parse.
        */
        static parse(s: string): fm.icelink.sdp.MediaDescription;
        /**
        Adds a proposed bandwidth.
        @param bandwidth The proposed bandwidth to add.
        */
        addBandwidth(bandwidth: fm.icelink.sdp.Bandwidth): void;
        /**
        Adds a media-level attribute.
        @param attribute The session-level attribute to add.
        */
        addMediaAttribute(attribute: fm.icelink.sdp.Attribute): void;
        /**
        Gets the array of proposed bandwidths to be used by the media.
        */
        getBandwidths(): fm.icelink.sdp.Bandwidth[];
        /**
        Gets a value indicating whether this media description has been marked as bundle-only.
        */
        getBundleOnly(): boolean;
        /**
        Obtains Ice Candidate attributes associated with this media description.
        */
        getCandidateAttributes(): fm.icelink.sdp.Attribute[];
        /** @hidden */
        private getCategoryAttributes;
        /**
        Gets the RTCP "ccm fir" feedback attribute for the given payload type.
        @param payloadType The payload type.
        */
        getCcmFirFeedbackAttribute(payloadType: number): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Gets the RTCP "ccm lrr" feedback attribute for the given payload type.
        @param payloadType The payload type.
        */
        getCcmLrrFeedbackAttribute(payloadType: number): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Gets media-level connection data.
        */
        getConnectionData(): fm.icelink.sdp.ConnectionData;
        /**
        Gets CryptoAttributes associated with this MediaDescription.
        */
        getCryptoAttributes(): fm.icelink.sdp.CryptoAttribute[];
        /**
        Gets the media-level encryption key.
        */
        getEncryptionKey(): fm.icelink.sdp.EncryptionKey;
        /**
        Gets the Fingerprint Attribute from this MediaDescription
        */
        getFingerprintAttribute(): fm.icelink.sdp.ice.FingerprintAttribute;
        /**
        Gets the format parameters attribute for the given payload type.
        @param payloadType The payload type.
        */
        getFormatParametersAttribute(payloadType: number): fm.icelink.sdp.FormatParametersAttribute;
        /**
        Sets a format parameter value.
        */
        getFormatParameterValue(payloadType: number, formatParameterName: string): string;
        /**
        Obtains Ice Options attributes associated with this media description.
        */
        getIceOptionAttributes(): fm.icelink.sdp.Attribute[];
        /**
        Gets the IcePasswordAttribute associated with this MediaDescription
        */
        getIcePasswordAttribute(): fm.icelink.sdp.ice.PasswordAttribute;
        /**
        Gets the IceUfragAttribute associated with this MediaDescription
        */
        getIceUfragAttribute(): fm.icelink.sdp.ice.UfragAttribute;
        /**
        Gets the attributes with Identical Multiplexing Category present in this description.
        @return Attributes with Identical Multiplexing Category present in this description.
        */
        getIdenticalCategoryAttributes(): fm.icelink.sdp.Attribute[];
        /**
        Gets whether this media description represents an application stream (media type == "application").
        */
        getIsApplication(): boolean;
        /**
        Gets whether this media description represents an audio stream (media type == "audio").
        */
        getIsAudio(): boolean;
        /**
        Gets whether this media description represents a message stream (media type == "message").
        */
        getIsMessage(): boolean;
        /**
        Gets whether this media description represents a text stream (media type == "text").
        */
        getIsText(): boolean;
        /**
        Gets whether this media description represents a video stream (media type == "video").
        */
        getIsVideo(): boolean;
        /**
        Obtains the maximum packet time attribute.
        */
        getMaxPacketTimeAttribute(): fm.icelink.sdp.MaxPacketTimeAttribute;
        /**
        Gets the media name and transport address.
        */
        getMedia(): fm.icelink.sdp.Media;
        /**
        Gets the array of media-level attributes.
        */
        getMediaAttributes(): fm.icelink.sdp.Attribute[];
        /**
        Obtains the media stream identifier attribute.
        */
        getMediaStreamIdentifierAttribute(): fm.icelink.sdp.MediaStreamIdAttribute;
        /**
        Gets the media title.
        */
        getMediaTitle(): string;
        /**
        Gets the RTCP "nack" feedback attribute for the given payload type.
        @param payloadType The payload type.
        */
        getNackFeedbackAttribute(payloadType: number): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Gets the RTCP "nack pli" feedback attribute for the given payload type.
        @param payloadType The payload type.
        */
        getNackPliFeedbackAttribute(payloadType: number): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Gets the RTCP "nack rpsi" feedback attribute for the given payload type.
        @param payloadType The payload type.
        */
        getNackRpsiFeedbackAttribute(payloadType: number): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Gets the RTCP "nack sli" feedback attribute for the given payload type.
        @param payloadType The payload type.
        */
        getNackSliFeedbackAttribute(payloadType: number): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Obtains the packet time attribute.
        */
        getPacketTimeAttribute(): fm.icelink.sdp.PacketTimeAttribute;
        /**
        Obtains the RTP map attributes in preference order.
        */
        getPreferredRtpMapAttributes(): fm.icelink.sdp.rtp.MapAttribute[];
        /**
        Gets the QualityAttribute associated with this MediaDescription.
        */
        getQualityAttribute(): fm.icelink.sdp.QualityAttribute;
        /**
        Obtains an RID attribute by its RID.
        */
        getRidAttribute(rid: string): fm.icelink.sdp.rtp.RidAttribute;
        /**
        Obtains the RID attributes.
        */
        getRidAttributes(): fm.icelink.sdp.rtp.RidAttribute[];
        /**
        Obtains the RID attributes.
        @param direction The RID attribute direction.
        */
        getRidAttributes(direction: string): fm.icelink.sdp.rtp.RidAttribute[];
        /**
        Gets Rtcp Attributes associated with this media description.
        */
        getRtcpAttribute(): fm.icelink.sdp.rtcp.Attribute;
        /**
        Gets the RTCP feedback attribute for the given payload type.
        @param payloadType The payload type.
        @param type The type.
        @param subType The sub-type.
        */
        getRtcpFeedbackAttribute(payloadType: number, type: string, subType: string): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Gets a value indicating support for RTCP Multiplexing.
        */
        getRtcpMultiplexingSupported(): boolean;
        /** @hidden */
        getRtcpMuxAttribute(): fm.icelink.sdp.Attribute;
        /**
        Obtains the RTP ext-map attributes.
        */
        getRtpExtMapAttributes(): fm.icelink.sdp.Attribute[];
        /**
        Obtains the RTP map attribute for a given format.
        @param formatName Format name.
        @param clockRate Clock rate.
        */
        getRtpMapAttribute(formatName: string, clockRate: number): fm.icelink.sdp.rtp.MapAttribute;
        /**
        Obtains the RTP map attribute for a given format.
        @param formatName Format name.
        @param clockRate Clock rate.
        @param formatParameters Format parameters.
        */
        getRtpMapAttribute(formatName: string, clockRate: number, formatParameters: string): fm.icelink.sdp.rtp.MapAttribute;
        /**
        Obtains the RTP map attribute for a given format.
        @param formatName Format name.
        @param clockRate Clock rate.
        @param formatParameters Format parameters.
        @param rtpMapAttributeIndex The index of the [[fm.icelink.sdp.rtp.mapAttribute]].
        */
        getRtpMapAttribute(formatName: string, clockRate: number, formatParameters: string, rtpMapAttributeIndex: fm.icelink.Holder<number>): fm.icelink.sdp.rtp.MapAttribute;
        /**
        Obtains the RTP map attribute for a given payload type.
        @param payloadType The payload type.
        */
        getRtpMapAttribute(payloadType: number): fm.icelink.sdp.rtp.MapAttribute;
        /**
        Obtains the RTP map attribute for a given payload type.
        @param payloadType The payload type.
        @param rtpMapAttributeIndex The index of the [[fm.icelink.sdp.rtp.mapAttribute]].
        */
        getRtpMapAttribute(payloadType: number, rtpMapAttributeIndex: fm.icelink.Holder<number>): fm.icelink.sdp.rtp.MapAttribute;
        /**
        Obtains the RTP map attributes.
        */
        getRtpMapAttributes(): fm.icelink.sdp.rtp.MapAttribute[];
        /**
        Obtains the RTP map attributes for a given format.
        @param formatName Format name.
        @param clockRate Clock rate.
        @param formatParameters Format parameters.
        */
        getRtpMapAttributes(formatName: string, clockRate: number, formatParameters: string): fm.icelink.sdp.rtp.MapAttribute[];
        /**
        Obtains the RTP map attributes for a given format.
        @param formatName Format name.
        @param clockRate Clock rate.
        @param formatParameters Format parameters.
        @param rtpMapAttributeIndices The indeces of the [[fm.icelink.sdp.rtp.mapAttribute]].
        */
        getRtpMapAttributes(formatName: string, clockRate: number, formatParameters: string, rtpMapAttributeIndices: fm.icelink.Holder<number[]>): fm.icelink.sdp.rtp.MapAttribute[];
        /**
        Gets the Sctp Map Attribute, if it is present in the Media Description.
        */
        getSctpMapAttribute(): fm.icelink.sdp.sctp.MapAttribute;
        /**
        Gets the Sctp Max Message Size Attribute, if it is present in the Media Description.
        */
        getSctpMaxMessageSizeAttribute(): fm.icelink.sdp.sctp.MaxMessageSizeAttribute;
        /**
        Gets the Sctp Port Attribute, if it is present in the Media Description.
        */
        getSctpPortAttribute(): fm.icelink.sdp.sctp.PortAttribute;
        /**
        Gets the SetupAttribute associated with this MediaDescription.
        */
        getSetupAttribute(): fm.icelink.sdp.SetupAttribute;
        /**
        Obtains the simulcast attribute.
        */
        getSimulcastAttribute(): fm.icelink.sdp.rtp.SimulcastAttribute;
        /**
        Obtains the first SSRC attribute matching a given synchronization source and name.
        @param ssrc The synchronization source.
        @param name The attribute name.
        */
        getSsrcAttribute(ssrc: number, name: string): fm.icelink.sdp.rtp.SsrcAttribute;
        /**
        Obtains the SSRC attribute matching a given synchronization source, name, and value.
        @param ssrc The synchronization source.
        @param name The attribute name.
        @param value The attribute value.
        */
        getSsrcAttribute(ssrc: number, name: string, value: string): fm.icelink.sdp.rtp.SsrcAttribute;
        /**
        Obtains the SSRC attributes.
        */
        getSsrcAttributes(): fm.icelink.sdp.rtp.SsrcAttribute[];
        /**
        Obtains the SSRC attributes.
        @param name The SSRC attribute name.
        */
        getSsrcAttributes(name: string): fm.icelink.sdp.rtp.SsrcAttribute[];
        /**
        Obtains the SSRC attributes matching a given synchronization source.
        @param ssrc The synchronization source.
        */
        getSsrcAttributes(ssrc: number): fm.icelink.sdp.rtp.SsrcAttribute[];
        /**
        Obtains the SSRC attributes matching a given synchronization source and name.
        @param ssrc The synchronization source.
        @param name The attribute name.
        */
        getSsrcAttributes(ssrc: number, name: string): fm.icelink.sdp.rtp.SsrcAttribute[];
        /**
        Obtains the SSRC Group attributes.
        */
        getSsrcGroupAttributes(): fm.icelink.sdp.rtp.SsrcGroupAttribute[];
        /**
        Obtains the SSRCS from the first SSRC Group with matching semantics.
        */
        getSsrcGroupSsrcs(semantics: string): number[];
        /**
        Gets the stream direction indicated in Media Description. Getter returns StreamDirection if DirectionAttribute is present; otherwise, returns StreamDirection.Unset.
        */
        getStreamDirection(): fm.icelink.StreamDirection;
        /**
        Gets a value indicating whether this SDP MediaDescription suggests support for ICE.
        */
        getSupportsIce(): boolean;
        /**
        Gets the attributes with Transport Multiplexing Category present in this description.
        @return Attributes with Transport Multiplexing Category present in this description.
        */
        getTransportCategoryAttributes(): fm.icelink.sdp.Attribute[];
        /**
        DEPRECATED: Use AddMediaAttribute instead. Inserts a media-level attribute at the given index.
        @param attribute The session-level attribute to add.
        @param index The index.
        */
        insertMediaAttribute(attribute: fm.icelink.sdp.Attribute, index: number): void;
        /** @hidden */
        private isMediaType;
        /**
        Orders the formats in preference order.
        @param names The format names.
        @return `false` if a media element does not exist; otherwise `true`.
        */
        orderFormats(names: string[]): boolean;
        /**
        Removes a format by name.
        @param name The format name.
        @return `true` if the format was found and removed; otherwise, `false`
        */
        purgeFormat(name: string): boolean;
        /**
        Removes a format by name and clock rate.
        @param name The format name.
        @param clockRate The clock rate.
        @return `true` if the format was found and removed; otherwise, `false`
        */
        purgeFormat(name: string, clockRate: number): boolean;
        /**
        Removes a format by name, clock rate, and channel count.
        @param name The format name.
        @param clockRate The clock rate.
        @param channelCount The channel count.
        @return `true` if the format was found and removed; otherwise, `false`
        */
        purgeFormat(name: string, clockRate: number, channelCount: number): boolean;
        /** @hidden */
        private purgeRtpMapAttribute;
        /**
        Removes a proposed bandwidth.
        @param bandwidth The proposed bandwidth to remove.
        */
        removeBandwidth(bandwidth: fm.icelink.sdp.Bandwidth): boolean;
        /**
        Removes Bundle (i.e. Transport and Identical) Category Attributes.
        */
        removeBundleCategoryAttributes(): void;
        /** @hidden */
        removeIdenticalCategoryAttributes(): void;
        /**
        Removes a media-level attribute.
        @param attribute The session-level attribute to remove.
        */
        removeMediaAttribute(attribute: fm.icelink.sdp.Attribute): boolean;
        /** @hidden */
        removeTransportCategoryAttributes(): void;
        /**
        Sets media-level connection data.
        */
        setConnectionData(value: fm.icelink.sdp.ConnectionData): void;
        /**
        Sets the media-level encryption key.
        */
        setEncryptionKey(value: fm.icelink.sdp.EncryptionKey): void;
        /**
        Sets a format parameter value.
        */
        setFormatParameterValue(payloadType: number, formatParameterName: string, formatParameterValue: string): boolean;
        /** @hidden */
        private setMedia;
        /**
        Sets the media title.
        */
        setMediaTitle(value: string): void;
        /**
        Sets the QualityAttribute associated with this MediaDescription.
        */
        setQualityAttribute(value: fm.icelink.sdp.QualityAttribute): void;
        /**
        Sets Rtcp Attributes associated with this media description.
        */
        setRtcpAttribute(value: fm.icelink.sdp.rtcp.Attribute): void;
        /**
        Sets a value indicating support for RTCP Multiplexing.
        */
        setRtcpMultiplexingSupported(value: boolean): void;
        /**
        Sets the SetupAttribute associated with this MediaDescription.
        */
        setSetupAttribute(value: fm.icelink.sdp.SetupAttribute): void;
        /**
        Sets the stream direction indicated in Media Description. Getter returns StreamDirection if DirectionAttribute is present; otherwise, returns StreamDirection.Unset.
        */
        setStreamDirection(value: fm.icelink.StreamDirection): void;
        /**
        Converts this instance to a string.
        */
        toString(): string;
        /**
        Updates SDP Quality Attribute associated with this media description if one is present. Otherwise, creates a new one and inserts it into this media description.
        @param quality
        */
        updateQualityAttributeValue(quality: number): void;
    }
}
declare namespace fm.icelink.sdp {
    /**
    https://tools.ietf.org/html/rfc5888#page-4 "Media stream identification" media attribute, which is used for identifying media streams within a session description. Its formatting in SDP [RFC4566] is described by the following Augmented Backus-Naur Form(ABNF) [RFC5234]:  mid-attribute      = "a=mid:" identification-tag identification-tag = token ; token is defined in RFC 4566 The identification-tag MUST be unique within an SDP session description.
    */
    class MediaStreamIdAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _identificationTag;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.mediaStreamIdAttribute]] class.
        @param idValue The identifier.
        */
        constructor(idValue: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.mediaStreamIdAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.MediaStreamIdAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the identification tag.
        */
        getIdentificationTag(): string;
        /** @hidden */
        private setIdentificationTag;
    }
}
declare namespace fm.icelink.sdp {
    /**
    https://tools.ietf.org/html/draft-ietf-mmusic-msid-08 - NB: Removed in subsequent drafts, most likely will not be used eventually. Used here for compatibility with Google Chrome and Mozilla Firefox.  A session-level attribute is defined for signalling the semantics associated with an msid grouping.This allows msid groupings with different semantics to coexist.  This OPTIONAL attribute gives the group identifier and its group semantic; it carries the same meaning as the ssrc-group-attr of RFC 5576 section 4.2, but uses the identifier of the group rather than a list of SSRC values.  This attribute MUST be present if "a=msid" is used.  An empty list of identifiers is an indication that the sender supports the indicated semantic, but has no msid groupings of the given type in the present SDP.  An identifier of "*" is an indication that all "a=msid" lines in the SDP have this specific semantic.  If "*" is not used, each msid-id in the SDP MUST appear in one and only one "msid-semantic" line. The name of the attribute is "msid-semantic". The value of the attribute is given by the following ABNF:  msid-semantic-value = msid - semantic msid-list msid-semantic = token ; see RFC 4566 msid-list = *(" " msid-id) / " *"  The semantic field holds values from the IANA registriy "Semantics for the msid-semantic SDP attribute" (which is defined in Section 6 of https://tools.ietf.org/html/draft-ietf-mmusic-msid-08 ).  An example msid-semantic might look like this, if a semantic LS was registered by IANA for the same purpose as the existing LS grouping semantic:  a= msid-semantic:LS xyzzy forolow  This means that the SDP description has two lip sync groups, with the group identifiers xyzzy and forolow, respectively.  The msid-semantic attribute can occur more than once, but MUST NOT occur more than once with the same msid-semantic value.
    */
    class MediaStreamIdSemanticAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _msIdList;
        /** @hidden */
        private _semanticToken;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.mediaStreamIdSemanticAttribute]] class.
        @param semanticToken The semantic token.
        */
        constructor(semanticToken: fm.icelink.sdp.MediaStreamIdSemanticToken);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.mediaStreamIdSemanticAttribute]] class.
        @param semanticToken The semantic token.
        @param msidList The msid list for the given semantic token.
        */
        constructor(semanticToken: fm.icelink.sdp.MediaStreamIdSemanticToken, msidList: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.mediaStreamIdSemanticAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.MediaStreamIdSemanticAttribute;
        /** @hidden */
        private static getSemanticTokenFromString;
        /** @hidden */
        private static getSemanticTokenString;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the space-delimited list of msids for which a given semantic is used. An empty list of identifiers is an indication that the sender supports the indicated semantic, but has no msid groupings of the given type in the present SDP.  An identifier of "*" is an indication that all "a=msid" lines in the SDP have this specific semantic.  If "*" is not used, each msid-id in the SDP MUST appear in one and only one "msid-semantic" line.
        */
        getMsIdList(): string;
        /** @hidden */
        private getSemanticToken;
        /**
        Sets the space-delimited list of msids for which a given semantic is used. An empty list of identifiers is an indication that the sender supports the indicated semantic, but has no msid groupings of the given type in the present SDP.  An identifier of "*" is an indication that all "a=msid" lines in the SDP have this specific semantic.  If "*" is not used, each msid-id in the SDP MUST appear in one and only one "msid-semantic" line.
        */
        setMsIdList(value: string): void;
        /** @hidden */
        private setSemanticToken;
    }
}
declare namespace fm.icelink.sdp {
    class MediaStreamIdSemanticTokenWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.sdp.MediaStreamIdSemanticToken);
        toString(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    Defines valid SDP media types.
    */
    abstract class MediaType {
        getTypeString(): string;
        /**
        Convert a StreamType enum to an SDP media type.
        @param streamType The StreamType enum.
        */
        static fromStreamType(streamType: fm.icelink.StreamType): string;
        /**
        Gets the SDP media type meaning "Application".
        */
        static getApplication(): string;
        /**
        Gets the SDP media type meaning "Audio".
        */
        static getAudio(): string;
        /**
        Gets the SDP media type meaning "Message".
        */
        static getMessage(): string;
        /**
        Gets the SDP media type meaning "Text".
        */
        static getText(): string;
        /**
        Gets the SDP media type meaning "Video".
        */
        static getVideo(): string;
        /**
        Converts an SDP media type to a StreamType enum.
        @param mediaType The SDP media type.
        */
        static toStreamType(mediaType: string): fm.icelink.StreamType;
    }
}
declare namespace fm.icelink.sdp {
    /**
    An SDP message.
    */
    class Message {
        getTypeString(): string;
        /** @hidden */
        private __bandwidths;
        /** @hidden */
        private __mediaDescriptions;
        /** @hidden */
        private __sessionAttributes;
        /** @hidden */
        private __timeDescriptions;
        /** @hidden */
        private _connectionData;
        /** @hidden */
        private _emailAddress;
        /** @hidden */
        private _encryptionKey;
        /** @hidden */
        private _origin;
        /** @hidden */
        private _phoneNumber;
        /** @hidden */
        private _protocolVersion;
        /** @hidden */
        private _sessionInformation;
        /** @hidden */
        private _sessionName;
        /** @hidden */
        private _timeZoneAdjustments;
        /** @hidden */
        private _uri;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.message]] class.
        @param origin The originator of the session plus a session identifier and version number.
        */
        constructor(origin: fm.icelink.sdp.Origin);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.message]] class.
        @param origin The originator of the session plus a session identifier and version number.
        @param sessionName The textual session name.
        */
        constructor(origin: fm.icelink.sdp.Origin, sessionName: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.message]] class.
        @param origin The originator of the session plus a session identifier and version number.
        @param sessionName The textual session name.
        @param timeDescriptions The array of start, stop, and repeat times for the session.
        */
        constructor(origin: fm.icelink.sdp.Origin, sessionName: string, timeDescriptions: fm.icelink.sdp.TimeDescription[]);
        /**
        Creates an [[fm.icelink.sdp.message]] instance from a string.
        @param s The string to parse.
        */
        static parse(s: string): fm.icelink.sdp.Message;
        /**
        Adds a proposed bandwidth.
        @param bandwidth The proposed bandwidth to add.
        */
        addBandwidth(bandwidth: fm.icelink.sdp.Bandwidth): void;
        /**
        Adds a media description.
        @param mediaDescription The media description to add.
        */
        addMediaDescription(mediaDescription: fm.icelink.sdp.MediaDescription): void;
        /**
        Adds a session-level attribute.
        @param attribute The session-level attribute to add.
        */
        addSessionAttribute(attribute: fm.icelink.sdp.Attribute): void;
        /**
        Adds a start, stop, and repeat time.
        @param timeDescription The start, stop, and repeat time to add.
        */
        addTimeDescription(timeDescription: fm.icelink.sdp.TimeDescription): void;
        /** @hidden */
        findBundleGroups(): fm.icelink.sdp.BundleGroup[];
        /** @hidden */
        findMediaDescription(mid: string): fm.icelink.sdp.MediaDescription;
        /** @hidden */
        private findMediaDescriptions;
        /**
        Gets the first media description of type "application".
        */
        getApplicationDescription(): fm.icelink.sdp.MediaDescription;
        /**
        Gets any media descriptions of type "application".
        */
        getApplicationDescriptions(): fm.icelink.sdp.MediaDescription[];
        /**
        Gets the first media description of type "audio".
        */
        getAudioDescription(): fm.icelink.sdp.MediaDescription;
        /**
        Gets any media descriptions of type "audio".
        */
        getAudioDescriptions(): fm.icelink.sdp.MediaDescription[];
        /**
        Gets the array of proposed bandwidths to be used by the session.
        */
        getBandwidths(): fm.icelink.sdp.Bandwidth[];
        /**
        Gets bundle groups in this media description.
        */
        getBundleGroups(): fm.icelink.sdp.BundleGroup[];
        /**
        Gets session-level connection data.
        */
        getConnectionData(): fm.icelink.sdp.ConnectionData;
        /**
        Gets the email address for the person responsible for the conference.
        */
        getEmailAddress(): string;
        /**
        Gets the session-level encryption key.
        */
        getEncryptionKey(): fm.icelink.sdp.EncryptionKey;
        /** @hidden */
        private getFirstMediaDescription;
        /**
        Gets the array of media descriptions.
        */
        getMediaDescriptions(): fm.icelink.sdp.MediaDescription[];
        /**
        Gets the first media description of type "message".
        */
        getMessageDescription(): fm.icelink.sdp.MediaDescription;
        /**
        Gets any media descriptions of type "message".
        */
        getMessageDescriptions(): fm.icelink.sdp.MediaDescription[];
        /**
        Gets the originator of the session plus a session identifier and version number.
        */
        getOrigin(): fm.icelink.sdp.Origin;
        /**
        Gets the phone number for the person responsible for the conference.
        */
        getPhoneNumber(): string;
        /**
        Gets the version of the Session Description Protocol.
        */
        getProtocolVersion(): string;
        /**
        Gets the array of session-level attributes.
        */
        getSessionAttributes(): fm.icelink.sdp.Attribute[];
        /**
        Gets textual information about the session.
        */
        getSessionInformation(): string;
        /**
        Obtains Crypto attributes from the session-level attributes in this message. Crypto attributes may also be sent as a media-level argument, so individual media descriptions must also be examined.
        */
        getSessionLevelCryptoAttributes(): fm.icelink.sdp.CryptoAttribute[];
        /**
        Obtains the stream direction indicated as a session-level attribute in this message. If none is supplied, StreamDirection.Unset is returned. Stream Direction may also be (and most likely is) indicated as a media-level attribute, so individual media descriptions must also be examined.
        */
        getSessionLevelDirection(): fm.icelink.StreamDirection;
        /**
        Obtains Fingerprint attribute from the session-level attributes in this message. Fingerprint attribute may also be sent as a media-level argument, so individual media descriptions must also be examined.
        */
        getSessionLevelFingerprintAttribute(): fm.icelink.sdp.ice.FingerprintAttribute;
        /**
        Obtains session-level Ice Options attributes associated with the Sdp Message.
        */
        getSessionLevelIceOptionAttributes(): fm.icelink.sdp.Attribute[];
        /**
        Obtains Ice Password Attribute from the session-level attributes in this message. Ice Password attribute may also be sent as a media-level argument, so individual media descriptions must also be examined.
        */
        getSessionLevelIcePasswordAttribute(): fm.icelink.sdp.ice.PasswordAttribute;
        /**
        Obtains Ice Ufrag Attribute from the session-level attributes in this message. Ice Ufrag Attributes may also be sent as a media-level argument, so individual media descriptions must also be examined.
        */
        getSessionLevelIceUfragAttribute(): fm.icelink.sdp.ice.UfragAttribute;
        /**
        Returns a value stating whether Rtcp Multiplexing support is indicated  as a session-level attribute in this message. Rtcp Multiplexing support may also be indicated via a media-level argument, so individual media descriptions must also be examined.
        */
        getSessionLevelRtcpMultiplexingSupport(): boolean;
        /**
        Obtains session-level RTP ext-map attributes associated with the Sdp Message.
        */
        getSessionLevelRtpExtMapAttributes(): fm.icelink.sdp.Attribute[];
        /**
        Obtains Setup Attribute from the session-level attributes in this message. Setup Attributes may also be sent as a media-level argument, so individual media descriptions must also be examined.
        */
        getSessionLevelSetupAttribute(): fm.icelink.sdp.SetupAttribute;
        /**
        Gets the textual session name.
        */
        getSessionName(): string;
        /**
        Gets a value indicating whether Trickle-ICE is supported.
        */
        getSupportsTrickleIce(): boolean;
        /**
        Gets the first media description of type "text".
        */
        getTextDescription(): fm.icelink.sdp.MediaDescription;
        /**
        Gets any media descriptions of type "text".
        */
        getTextDescriptions(): fm.icelink.sdp.MediaDescription[];
        /**
        Gets the array of start, stop, and repeat times for the session.
        */
        getTimeDescriptions(): fm.icelink.sdp.TimeDescription[];
        /**
        Gets the time zone adjustments.
        */
        getTimeZoneAdjustments(): fm.icelink.sdp.TimeZones;
        /**
        Gets the pointer to additional information about the session.
        */
        getUri(): fm.icelink.Uri;
        /**
        Gets the first media description of type "video".
        */
        getVideoDescription(): fm.icelink.sdp.MediaDescription;
        /**
        Gets any media descriptions of type "video".
        */
        getVideoDescriptions(): fm.icelink.sdp.MediaDescription[];
        /**
        Adds a media description at the given index.
        @param index The index at which to add the media description.
        @param mediaDescription The media description to add.
        */
        insertMediaDescription(index: number, mediaDescription: fm.icelink.sdp.MediaDescription): void;
        /**
        Removes a proposed bandwidth.
        @param bandwidth The proposed bandwidth to remove.
        */
        removeBandwidth(bandwidth: fm.icelink.sdp.Bandwidth): boolean;
        /**
        Removes a media description.
        @param mediaDescription The media description to remove.
        */
        removeMediaDescription(mediaDescription: fm.icelink.sdp.MediaDescription): boolean;
        /**
        Removes a session-level attribute.
        @param attributeType The session-level attribute type to remove.
        */
        removeSessionAttribute(attributeType: fm.icelink.sdp.AttributeType): boolean;
        /**
        Removes a start, stop, and repeat time.
        @param timeDescription The start, stop, and repeat time to remove.
        */
        removeTimeDescription(timeDescription: fm.icelink.sdp.TimeDescription): boolean;
        /**
        Removes all time descriptions.
        */
        removeTimeDescriptions(): void;
        /**
        Sets session-level connection data.
        */
        setConnectionData(value: fm.icelink.sdp.ConnectionData): void;
        /**
        Sets the email address for the person responsible for the conference.
        */
        setEmailAddress(value: string): void;
        /**
        Sets the session-level encryption key.
        */
        setEncryptionKey(value: fm.icelink.sdp.EncryptionKey): void;
        /** @hidden */
        private setOrigin;
        /**
        Sets the phone number for the person responsible for the conference.
        */
        setPhoneNumber(value: string): void;
        /** @hidden */
        private setProtocolVersion;
        /**
        Sets textual information about the session.
        */
        setSessionInformation(value: string): void;
        /** @hidden */
        private setSessionName;
        /**
        Sets a value indicating whether Trickle-ICE is supported.
        */
        setSupportsTrickleIce(value: boolean): void;
        /**
        Sets the time zone adjustments.
        */
        setTimeZoneAdjustments(value: fm.icelink.sdp.TimeZones): void;
        /**
        Sets the pointer to additional information about the session.
        */
        setUri(value: fm.icelink.Uri): void;
        /**
        Converts this instance to a string.
        */
        toString(): string;
        /**
        Updates SDP Setup Value associated with the session description.
        @param setupValue
        */
        updateSetupValue(setupValue: string): void;
    }
}
declare namespace fm.icelink.sdp {
    /**
    Defines valid SDP network types.
    */
    abstract class NetworkType {
        getTypeString(): string;
        /**
        Gets the SDP network type meaning "Internet".
        */
        static getInternet(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    Defines valid SDP orientations.
    */
    abstract class Orientation {
        getTypeString(): string;
        /**
        Gets the SDP orientation meaning "Landscape".
        */
        static getLandscape(): string;
        /**
        Gets the SDP orientation meaning "Portrait".
        */
        static getPortrait(): string;
        /**
        Gets the SDP orientation meaning "Upside-Down Landscape".
        */
        static getSeascape(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    Normally this is only used for a whiteboard or presentation tool.  It specifies the orientation of a the workspace on the screen.  It is a media-level attribute.  Permitted values are "portrait", "landscape", and "seascape" (upside-down landscape).  It is not dependent on charset.
    */
    class OrientationAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _orientation;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.orientationAttribute]] class.
        @param orientation The orientation of a workspace on the screen. See [[fm.icelink.sdp.orientationAttribute.orientation]] for possible values.
        */
        constructor(orientation: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.orientationAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.OrientationAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the orientation of a workspace on the screen. See [[fm.icelink.sdp.orientationAttribute.orientation]] for possible values.
        */
        getOrientation(): string;
        /** @hidden */
        private setOrientation;
    }
}
declare namespace fm.icelink.sdp {
    /**
    An SDP origin element.
    */
    class Origin {
        getTypeString(): string;
        /** @hidden */
        private _addressType;
        /** @hidden */
        private _networkType;
        /** @hidden */
        private _sessionId;
        /** @hidden */
        private _sessionVersion;
        /** @hidden */
        private _unicastAddress;
        /** @hidden */
        private _username;
        private fmicelinksdpOriginInit;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.origin]] class.
        @param unicastAddress The address of the machine from which the session was created.
        */
        constructor(unicastAddress: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.origin]] class.
        @param unicastAddress The address of the machine from which the session was created.
        @param username The user's login on the originating host.
        */
        constructor(unicastAddress: string, username: string);
        /**
        Creates an [[fm.icelink.sdp.origin]] instance from a string.
        @param s The string to parse.
        */
        static parse(s: string): fm.icelink.sdp.Origin;
        /** @hidden */
        private generateSessionId;
        /** @hidden */
        private generateSessionVersion;
        /**
        Gets the type of the address. See [[fm.icelink.sdp.origin.addressType]] for possible values.
        */
        getAddressType(): string;
        /**
        Gets the type of network. See [[fm.icelink.sdp.origin.networkType]] for possible values.
        */
        getNetworkType(): string;
        /**
        Gets the globally unique identifier for the session.
        */
        getSessionId(): number;
        /**
        Gets the version number for the session.
        */
        getSessionVersion(): number;
        /**
        Gets the address of the machine from which the session was created.
        */
        getUnicastAddress(): string;
        /**
        Gets the user's login on the originating host.
        */
        getUsername(): string;
        /**
        Sets the type of the address. See [[fm.icelink.sdp.origin.addressType]] for possible values.
        */
        setAddressType(value: string): void;
        /**
        Sets the type of network. See [[fm.icelink.sdp.origin.networkType]] for possible values.
        */
        setNetworkType(value: string): void;
        /**
        Sets the globally unique identifier for the session.
        */
        setSessionId(value: number): void;
        /**
        Sets the version number for the session.
        */
        setSessionVersion(value: number): void;
        /**
        Sets the address of the machine from which the session was created.
        */
        setUnicastAddress(value: string): void;
        /**
        Sets the user's login on the originating host.
        */
        setUsername(value: string): void;
        /**
        Converts this instance to a string.
        */
        toString(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    This gives the length of time in milliseconds represented by the media in a packet.  This is probably only meaningful for audio data, but may be used with other media types if it makes sense.  It should not be necessary to know ptime to decode RTP or vat audio, and it is intended as a recommendation for the encoding/packetisation of audio.  It is a media-level attribute, and it is not dependent on charset.
    */
    class PacketTimeAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _packetTime;
        private fmicelinksdpPacketTimeAttributeInit;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.packetTimeAttribute]] class.
        @param packetTime The length of time in milliseconds represented by
                    the media in a packet.
        */
        constructor(packetTime: number);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.packetTimeAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.PacketTimeAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the length of time in milliseconds represented by the media in a packet.
        */
        getPacketTime(): number;
        /** @hidden */
        private setPacketTime;
    }
}
declare namespace fm.icelink.sdp {
    /**
    An SDP encryption key with a method of "prompt".
    */
    class PromptEncryptionKey extends fm.icelink.sdp.EncryptionKey {
        getTypeString(): string;
        constructor();
        /** @hidden */
        getMethodAndValue(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    This gives a suggestion for the quality of the encoding as an integer value.  The intention of the quality attribute for video is to specify a non-default trade-off between frame-rate and still-image quality.  For video, the value is in the range 0 to 10, with the following suggested meaning:  10 - the best still-image quality the compression scheme can give. 5  - the default behaviour given no quality suggestion. 0  - the worst still-image quality the codec designer thinks is still usable.  It is a media-level attribute, and it is not dependent on charset.
    */
    class QualityAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _quality;
        private fmicelinksdpQualityAttributeInit;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.qualityAttribute]] class.
        @param quality The suggested quality of the encoding as an integer value from 0-10.
        */
        constructor(quality: number);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.qualityAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.QualityAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the suggested quality of the encoding as an integer value from 0-10.
        */
        getQuality(): number;
        /** @hidden */
        private setQuality;
    }
}
declare namespace fm.icelink.sdp {
    /**
    This specifies that the tools should be started in receive-only mode where applicable.  It can be either a session- or media- level attribute, and it is not dependent on charset.  Note that recvonly applies to the media only, not to any associated control protocol (e.g., an RTP-based system in recvonly mode SHOULD still send RTCP packets).
    */
    class ReceiveOnlyAttribute extends fm.icelink.sdp.DirectionAttribute {
        getTypeString(): string;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.receiveOnlyAttribute]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.receiveOnlyAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.ReceiveOnlyAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the stream direction.
        */
        getStreamDirection(): fm.icelink.StreamDirection;
    }
}
declare namespace fm.icelink.sdp {
    /**
    An SDP repeat time element.
    */
    class RepeatTime {
        getTypeString(): string;
        /** @hidden */
        private __offsets;
        /** @hidden */
        private _activeDuration;
        /** @hidden */
        private _repeatInterval;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.repeatTime]] class.
        @param repeatInterval The repeat interval.
        @param activeDuration The active duration.
        */
        constructor(repeatInterval: fm.icelink.TimeSpan, activeDuration: fm.icelink.TimeSpan);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.repeatTime]] class.
        @param repeatInterval The repeat interval.
        @param activeDuration The active duration.
        @param offsets The offsets from the start time.
        */
        constructor(repeatInterval: fm.icelink.TimeSpan, activeDuration: fm.icelink.TimeSpan, offsets: fm.icelink.TimeSpan[]);
        /**
        Creates an [[fm.icelink.sdp.repeatTime]] instance from a string.
        @param s The string to parse.
        */
        static parse(s: string): fm.icelink.sdp.RepeatTime;
        /**
        Adds an offset from the start time.
        @param offset The offset from the start time to add.
        */
        addOffset(offset: fm.icelink.TimeSpan): void;
        /**
        Gets the active duration.
        */
        getActiveDuration(): fm.icelink.TimeSpan;
        /**
        Gets the array of offsets from the start time.
        */
        getOffsets(): fm.icelink.TimeSpan[];
        /**
        Gets the repeat interval.
        */
        getRepeatInterval(): fm.icelink.TimeSpan;
        /**
        Removes an offset from the start time.
        @param offset The offset from the start time to remove.
        */
        removeOffset(offset: fm.icelink.TimeSpan): boolean;
        /** @hidden */
        private setActiveDuration;
        /** @hidden */
        private setRepeatInterval;
        /**
        Converts this instance to a string.
        */
        toString(): string;
    }
}
declare namespace fm.icelink.sdp.rtcp {
    /**
    The RTCP attribute is used to document the RTCP port used for media stream, when that port is not the next higher (odd) port number following the RTP port described in the media line.
    */
    class Attribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _addressType;
        /** @hidden */
        private _connectionAddress;
        /** @hidden */
        private _networkType;
        /** @hidden */
        private _port;
        private fmicelinksdprtcpAttributeInit;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtcp.attribute]] class.
        @param port The RTCP port number.
        @param connectionAddress The RTCP connection address.
        */
        constructor(port: number, connectionAddress: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtcp.attribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.rtcp.Attribute;
        /**
        Gets the type of the address. See [[fm.icelink.sdp.rtcp.attribute.addressType]] for possible values.
        */
        getAddressType(): string;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the RTCP connection address.
        */
        getConnectionAddress(): string;
        /**
        Gets the type of network. See [[fm.icelink.sdp.rtcp.attribute.networkType]] for possible values.
        */
        getNetworkType(): string;
        /**
        Gets the RTCP port number.
        */
        getPort(): number;
        /** @hidden */
        private setAddressType;
        /** @hidden */
        private setConnectionAddress;
        /** @hidden */
        private setNetworkType;
        /** @hidden */
        private setPort;
        /**
        Updates the port and connection address.
        @param port The port.
        @param connectionAddress The connection address.
        */
        update(port: number, connectionAddress: string): void;
    }
}
declare namespace fm.icelink.sdp.rtcp {
    /**
    This attribute is used to indicate the capability of using RTCP feedback.
    */
    class FeedbackAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _payloadType;
        /** @hidden */
        private _subType;
        /** @hidden */
        private _type;
        private fmicelinksdprtcpFeedbackAttributeInit;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtcp.feedbackAttribute]] class.
        @param payloadType The payload type.
        @param type The type.
        */
        constructor(payloadType: number, type: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtcp.feedbackAttribute]] class.
        @param payloadType The payload type.
        @param type The type.
        @param subtype The subtype.
        */
        constructor(payloadType: number, type: string, subtype: string);
        /**
        Creates a "ccm fir" feedback attribute.
        @param payloadType The payload type.
        */
        static ccmFirAttribute(payloadType: number): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Creates a "ccm lrr" feedback attribute.
        @param payloadType The payload type.
        */
        static ccmLrrAttribute(payloadType: number): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtcp.feedbackAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Gets the payload type that represents wildcard feedback attributes ('*').
        */
        static getWildcardPayloadType(): number;
        /**
        Creates a "nack" feedback attribute.
        @param payloadType The payload type.
        */
        static nackAttribute(payloadType: number): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Creates a "nack pli" feedback attribute.
        @param payloadType The payload type.
        */
        static nackPliAttribute(payloadType: number): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Creates a "nack rpsi" feedback attribute.
        @param payloadType The payload type.
        */
        static nackRpsiAttribute(payloadType: number): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Creates a "nack sli" feedback attribute.
        @param payloadType The payload type.
        */
        static nackSliAttribute(payloadType: number): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Creates a "goog-remb" feedback attribute.
        @param payloadType The payload type.
        */
        static rembAttribute(payloadType: number): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the payload type.
        */
        getPayloadType(): number;
        /**
        Gets the sub-type.
        */
        getSubType(): string;
        /**
        Gets the type.
        */
        getType(): string;
        /**
        Sets the payload type.
        */
        setPayloadType(value: number): void;
        /**
        Sets the sub-type.
        */
        setSubType(value: string): void;
        /**
        Sets the type.
        */
        setType(value: string): void;
    }
}
declare namespace fm.icelink.sdp.rtcp {
    /**
    A feedback attribute sub type.
    */
    class FeedbackAttributeSubType {
        getTypeString(): string;
        constructor();
        /**
        Gets the "full intraframe refresh" sub-type.
        */
        static getFir(): string;
        /**
        Gets the "layer refresh request" sub-type.
        */
        static getLrr(): string;
        /**
        Gets the "picture loss indication" sub-type.
        */
        static getPli(): string;
        /**
        Gets the "reference picture selection indication" sub-type.
        */
        static getRpsi(): string;
        /**
        Gets the "slice loss indication" sub-type.
        */
        static getSli(): string;
    }
}
declare namespace fm.icelink.sdp.rtcp {
    /**
    A feedback attribute type.
    */
    class FeedbackAttributeType {
        getTypeString(): string;
        constructor();
        /**
        Gets the "positive acknowledgement" type.
        */
        static getAck(): string;
        /**
        Gets the application-defined type.
        */
        static getApp(): string;
        /**
        Gets the "codec control message" type.
        */
        static getCcm(): string;
        /**
        Gets the "negative acknowledgement" type.
        */
        static getNack(): string;
        /**
        Gets the "receiver estimated maximum bitrate" type.
        */
        static getRemb(): string;
    }
}
declare namespace fm.icelink.sdp.rtcp {
    /**
    This attribute is used to signal that RTP and RTCP traffic should be multiplexed on a single port.  It is a property attribute, which does not take a value.
    */
    class MuxAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtcp.muxAttribute]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtcp.muxAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.rtcp.MuxAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
    }
}
declare namespace fm.icelink.sdp.rtp {
    /**
    https://tools.ietf.org/html/rfc5285#section-5 Stream or media-level attribute used to indicate the presence of RTP Header Extensions, and the mapping of local identifiers used in the header extension to a larger namespace.  A usable mapping MUST use IDs in the valid range, and each ID in this range MUST be used only once for each media (or only once if the mappings are session level).  Mappings that do not conform to these rules MAY be presented, for instance, during offer/answer negotiation as described in the next section, but remapping to conformant values is necessary before they can be applied.  Each extension is named by a URI. Each local identifier potentially used in the stream is mapped to a string using an attribute of the form: a=extmap:VALUE["/"DIRECTION] URI EXTENSIONATTRIBUTES Where URI is a URI, as above, VALUE is the local identifier (ID) of this extension and is an integer in the valid range inclusive (0 is reserved for padding in both forms, and 15 is reserved in the one-byte header form), and direction is one of "sendonly", "recvonly", "sendrecv", or "inactive" (without the quotes). Example:  a=extmap:1 http://example.com/082005/ext.htm#ttime a=extmap:2/sendrecv http://example.com/082005/ext.htm#xmeta short
    */
    class ExtMapAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private __direction;
        /** @hidden */
        private _extensionAttributes;
        /** @hidden */
        private _id;
        /** @hidden */
        private _uri;
        private fmicelinksdprtpExtMapAttributeInit;
        constructor();
        /**
        RTP Extension Map Attribute.
        @param idValue Local identifier of this extension and is an integer in the valid range inclusive (0 is reserved for padding in both forms, and 15 is reserved in the one-byte header form.
        @param uri Well known extension identifier.
        */
        constructor(idValue: number, uri: string);
        /**
        RTP Extension Map Attribute.
        @param idValue Local identifier of this extension and is an integer in the valid range inclusive (0 is reserved for padding in both forms, and 15 is reserved in the one-byte header form.
        @param uri Well known extension identifier.
        @param direction Disered direction of this RTP Extension Header.
        */
        constructor(idValue: number, uri: string, direction: fm.icelink.StreamDirection);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.mapAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.rtp.ExtMapAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the direction of this extension (optional). If not present, stream direction is assumed to be the direction of the extension.
        */
        getDirection(): fm.icelink.StreamDirection;
        /**
        Gets extension attributes (optional).
        */
        getExtensionAttributes(): string;
        /**
        Gets the local identifier of this extension.
        */
        getId(): number;
        /**
        Gets the well-known URI of this extension
        */
        getUri(): string;
        /**
        Sets the direction of this extension (optional). If not present, stream direction is assumed to be the direction of the extension.
        */
        setDirection(value: fm.icelink.StreamDirection): void;
        /**
        Sets extension attributes (optional).
        */
        setExtensionAttributes(value: string): void;
        /**
        Sets the local identifier of this extension.
        */
        setId(value: number): void;
        /** @hidden */
        private setUri;
    }
}
declare namespace fm.icelink.sdp.rtp {
    /** @hidden */
    class FeedbackAttributeCollection {
        getTypeString(): string;
        /** @hidden */
        private __attributes;
        constructor();
        addAttribute(attribute: fm.icelink.sdp.rtcp.FeedbackAttribute): boolean;
        /** @hidden */
        private calculateFeedbackAttributeKey;
        clear(): void;
        remove(attribute: fm.icelink.sdp.rtcp.FeedbackAttribute): boolean;
        toArray(): fm.icelink.sdp.rtcp.FeedbackAttribute[];
        tryGetFeedbackAttribute(payloadType: number, feedbackAttributeType: string, subType: string, feedbackAttribute: fm.icelink.Holder<fm.icelink.sdp.rtcp.FeedbackAttribute>): boolean;
    }
}
declare namespace fm.icelink.sdp.rtp {
    /**
    This attribute maps from an RTP payload type number (as used in an "m=" line) to an format name denoting the payload format to be used.  It also provides information on the clock rate and format parameters.  It is a media-level attribute that is not dependent on charset.
    */
    class MapAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private __relatedRtcpFeedbackAttributes;
        /** @hidden */
        private _clockRate;
        /** @hidden */
        private _formatName;
        /** @hidden */
        private _formatParameters;
        /** @hidden */
        private _payloadType;
        /** @hidden */
        private _relatedFormatParametersAttribute;
        /** @hidden */
        private static fm_icelink_sdp_rtp_MapAttribute___ianaMapAttributes;
        private fmicelinksdprtpMapAttributeInit;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.mapAttribute]] class.
        @param payloadType The RTP payload type number.
        @param formatName The format name denoting the payload format to be used.
        @param clockRate The payload clock rate.
        */
        constructor(payloadType: number, formatName: string, clockRate: number);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.mapAttribute]] class.
        @param payloadType The RTP payload type number.
        @param formatName The format name denoting the payload format to be used.
        @param clockRate The payload clock rate.
        @param formatParameters The format parameters for the payload.
        */
        constructor(payloadType: number, formatName: string, clockRate: number, formatParameters: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.mapAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.rtp.MapAttribute;
        /**
        Gets the RTP map attribute for an IANA-reserved payload type.
        @param payloadType The payload type.
        */
        static getIanaMapAttribute(payloadType: number): fm.icelink.sdp.rtp.MapAttribute;
        /**
        Adds an Rtcp Feedback attribute associated with this Map Attribute.
        @param attribute
        */
        addRelatedRtcpFeedbackAttribute(attribute: fm.icelink.sdp.rtcp.FeedbackAttribute): void;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the payload clock rate.
        */
        getClockRate(): number;
        /**
        Gets the format name denoting the payload format to be used.
        */
        getFormatName(): string;
        /**
        Gets format parameters for the payload.
        */
        getFormatParameters(): string;
        /**
        Gets the RTP payload type number.
        */
        getPayloadType(): number;
        /**
        Gets the RTCP "ccm fir" feedback attribute associated with this payload type.
        */
        getRelatedCcmFirFeedbackAttribute(): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Gets the RTCP "ccm lrr" feedback attribute associated with this payload type.
        */
        getRelatedCcmLrrFeedbackAttribute(): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Gets Format Parameters attribute associated with this Map Attribute
        */
        getRelatedFormatParametersAttribute(): fm.icelink.sdp.FormatParametersAttribute;
        /**
        Gets the RTCP "nack" feedback attribute associated with this payload type.
        */
        getRelatedNackFeedbackAttribute(): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Gets the RTCP "nack pli" feedback attribute associated with this payload type.
        */
        getRelatedNackPliFeedbackAttribute(): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Gets the RTCP "nack rpsi" feedback attribute associated with this payload type.
        */
        getRelatedNackRpsiFeedbackAttribute(): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Gets the RTCP "nack sli" feedback attribute associated with this payload type.
        */
        getRelatedNackSliFeedbackAttribute(): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Gets the RTCP "goog-remb" feedback attribute associated with this payload type.
        */
        getRelatedRembFeedbackAttribute(): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Gets the RTCP feedback attribute for the given payload type, type and subtype associated with this payload type.
        @param payloadType The payload type.
        @param type The type.
        @param subType The sub-type.
        */
        getRelatedRtcpFeedbackAttribute(payloadType: number, type: string, subType: string): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Gets the RTCP feedback attribute for the given type and subtype associated with this payload type.
        @param type The type.
        @param subType The sub-type.
        */
        getRelatedRtcpFeedbackAttribute(type: string, subType: string): fm.icelink.sdp.rtcp.FeedbackAttribute;
        /**
        Gets Rtcp Feedback attributes associated with this Map Attribute.
        */
        getRelatedRtcpFeedbackAttributes(): fm.icelink.sdp.rtcp.FeedbackAttribute[];
        /**
        Removes an Rtcp Feedback attribute associated with this Map Attribute. Returns true if the attribute was reomved; if the attribute was not present, returns false.
        @param attribute
        */
        removeRelatedRtcpFeedbackAttribute(attribute: fm.icelink.sdp.rtcp.FeedbackAttribute): boolean;
        /**
        Resets Rtcp Feedback attributes associated with this Map Attribute.
        */
        resetRtcpFeedbackAttributes(attributes: fm.icelink.sdp.rtcp.FeedbackAttribute[]): void;
        /** @hidden */
        private setClockRate;
        /** @hidden */
        private setFormatName;
        /** @hidden */
        private setFormatParameters;
        /**
        Sets the RTP payload type number.
        */
        setPayloadType(value: number): void;
        /**
        Sets Format Parameters attribute associated with this Map Attribute
        */
        setRelatedFormatParametersAttribute(value: fm.icelink.sdp.FormatParametersAttribute): void;
        /** @hidden */
        private static __fmicelinksdprtpMapAttributeInitialized;
        /** @hidden */
        static fmicelinksdprtpMapAttributeInitialize(): void;
    }
}
declare namespace fm.icelink.sdp.rtp {
    /**
    An SDP media description with a transport protocol of "RTP/AVP" or "RTP/SAVP".
    */
    class Media extends fm.icelink.sdp.Media {
        getTypeString(): string;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.media]] class.
        @param mediaType The media type. See [[fm.icelink.sdp.mediaType]] for possible values.
        @param transportPort The transport port.
        @param transportProtocol The transport protocol.
        @param rtpPayloadTypeNumbers The RTP payload type numbers.
        */
        constructor(mediaType: string, transportPort: number, transportProtocol: string, rtpPayloadTypeNumbers: number[]);
        /**
        Generates Rtp Prfile for a given combination of stream type, whjether or not RTCP-based feedback is supported, whether (D)TLS is in use and whether encryption is in use in general.
        @param type Stream type.
        @param rtcpFeedbackSupported Indicates whether Rtcp-based feedback is supported.
        @param useDtls Indicates whether (D)TLS is in use.
        @param useEncryption Indicates whether encryption is in use.
        */
        static generateRtpProfile(type: fm.icelink.StreamType, rtcpFeedbackSupported: boolean, useDtls: boolean, useEncryption: boolean): string;
        /**
        Gets the payload types.
        @param formatDesciption The media format desciption.
        */
        static getPayloadTypes(formatDesciption: string): number[];
        /**
        Gets the protocol keyword for the extended RTP audio/video profile.
        */
        static getRtpAvpfTransportProtocol(): string;
        /**
        Gets the protocol keyword for the RTP audio/video profile.
        */
        static getRtpAvpTransportProtocol(): string;
        /**
        Gets the protocol keyword for the extended Secure RTP audio/video profile.
        */
        static getRtpSavpfTransportProtocol(): string;
        /**
        Gets the protocol keyword for the Secure RTP audio/video profile.
        */
        static getRtpSavpTransportProtocol(): string;
        /**
        Gets the protocol keyword for the extended Secure RTP audio/video profile with DTLS key exchange.
        */
        static getUdpTlsRtpSavpfTransportProtocol(): string;
        /**
        Gets the protocol keyword for the Secure RTP audio/video profile with DTLS key exchange.
        */
        static getUdpTlsRtpSavpTransportProtocol(): string;
        /**
        Returns the clockrate of a well-known payload type.
        @param payloadType The well-known payload type to get the clockrate of.
        */
        static getWellKnownPayloadClockRate(payloadType: number): number;
        /**
        Returns the name of a well-known payload type.
        @param payloadType The well-known payload type to get the name of.
        */
        static getWellKnownPayloadName(payloadType: number): string;
        /**
        Returns a value indicating whther a given protocol supports encryption.
        @param protocol Protocol keyword.
        @return Value indicating whther a given protocol supports encryption.
        */
        static supportsEncryption(protocol: string): boolean;
        /**
        Returns a value indicating whther a given protocol supports encryption.
        @param protocol Protocol keyword.
        @return Value indicating whther a given protocol supports encryption.
        */
        static supportsRtcpBasedFeedback(protocol: string): boolean;
    }
}
declare namespace fm.icelink.sdp.rtp {
    /**
    A stream for a simulcast stream description.
    */
    class SimulcastStream {
        getTypeString(): string;
        /** @hidden */
        private _ids;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.simulcastStream]] class.
        @param idValue The identifier.
        */
        constructor(idValue: fm.icelink.sdp.rtp.SimulcastStreamId);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.simulcastStream]] class.
        @param ids The identifiers.
        */
        constructor(ids: fm.icelink.sdp.rtp.SimulcastStreamId[]);
        /**
        Gets the identifiers.
        */
        getIds(): fm.icelink.sdp.rtp.SimulcastStreamId[];
        /** @hidden */
        private setIds;
    }
}
declare namespace fm.icelink.sdp.rtp {
    /**
    The allowed directions for a simulcast attribute.
    */
    class SimulcastDirection {
        getTypeString(): string;
        constructor();
        /**
        Gets the receive direction ("recv").
        */
        static getReceive(): string;
        /**
        Gets the send direction ("send").
        */
        static getSend(): string;
    }
}
declare namespace fm.icelink.sdp.rtp {
    /**
    A stream description for a simulcast attribute.
    */
    class SimulcastStreamDescription {
        getTypeString(): string;
        /** @hidden */
        private __direction;
        /** @hidden */
        private _streams;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.simulcastStreamDescription]] class.
        @param direction The direction.
        @param streams The streams.
        */
        constructor(direction: string, streams: fm.icelink.sdp.rtp.SimulcastStream[]);
        /** @hidden */
        private directionIsValid;
        /**
        Gets the direction.
        */
        getDirection(): string;
        /**
        Gets the streams.
        */
        getStreams(): fm.icelink.sdp.rtp.SimulcastStream[];
        /** @hidden */
        private setDirection;
        /** @hidden */
        private setStreams;
    }
}
declare namespace fm.icelink.sdp.rtp {
    /**
    The allowed directions for an RID attribute.
    */
    class RidDirection {
        getTypeString(): string;
        constructor();
        /**
        Gets the receive direction ("recv").
        */
        static getReceive(): string;
        /**
        Gets the send direction ("send").
        */
        static getSend(): string;
    }
}
declare namespace fm.icelink.sdp.rtp {
    /**
    A restriction for an RID attribute.
    */
    class RidRestriction {
        getTypeString(): string;
        /** @hidden */
        private _key;
        /** @hidden */
        private _value;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.ridRestriction]] class.
        @param key The key.
        */
        constructor(key: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.ridRestriction]] class.
        @param key The key.
        @param value The value.
        */
        constructor(key: string, value: string);
        /**
        Gets the "depend" key, for spatial resolution in pixels. The value is a comma-separated list of rid-ids.These rid-ids identify RTP streams that this stream depends on in order to allow for proper interpretation.  The mechanism defined in this document allows for such dependencies to be expressed only when the streams are in the same media section.
        */
        static getDependKey(): string;
        /**
        Gets the "max-br" key, for bit rate in bits per second. The restriction applies to the media payload only, and does not include overhead introduced by other layers(e.g., RTP, UDP, IP, or Ethernet).  The exact means of keeping within this limit are left up to the implementation, and instantaneous excursions outside the limit are permissible. For any given one-second sliding window, however, the total number of bits in the payload portion of RTP SHOULD NOT exceed the value specified in "max-br."
        */
        static getMaxBitrateKey(): string;
        /**
        Gets the "max-bpp" key, for maximum number of bits per pixel, calculated as an average of all samples of any given coded picture. This is expressed as a floating point value, with an allowed range of 0.0001 to 48.0.  These values MUST NOT be encoded with more than four digits to the right of the decimal point.
        */
        static getMaxBitsPerPixelKey(): string;
        /**
        Gets the "max-fs" key, for frame size in pixels per frame. This is the product of frame width and frame height, in pixels, for rectangular frames.
        */
        static getMaxFrameSizeKey(): string;
        /**
        Gets the "max-fps" key, for frame rate in frames per second. For encoders that do not use a fixed framerate for encoding, this value is used to restrict the minimum amount of time between frames: the time between any two consecutive frames SHOULD NOT be less than 1 / max - fps seconds.
        */
        static getMaxFramesPerSecondKey(): string;
        /**
        Gets the "max-height" key, for spatial resolution in pixels. In the case that stream orientation signaling is used to modify the intended display orientation, this attribute refers to the height of the stream when a rotation of zero degrees is encoded.
        */
        static getMaxHeightKey(): string;
        /**
        Gets the "max-pps" key, for pixel rate in pixels per second. This value SHOULD be handled identically to max-fps, after performing the following conversion: max-fps = max-pps / (width* height).  If the stream resolution changes, this value is recalculated. Due to this recalculation, excursions outside the specified maximum are possible near resolution change boundaries.
        */
        static getMaxPixelsPerSecondKey(): string;
        /**
        Gets the "max-width" key, for spatial resolution in pixels. In the case that stream orientation signaling is used to modify the intended display orientation, this attribute refers to the width of the stream when a rotation of zero degrees is encoded.
        */
        static getMaxWidthKey(): string;
        /**
        Gets the restriction key.
        */
        getKey(): string;
        /**
        Gets the restriction value.
        */
        getValue(): string;
        /** @hidden */
        private setKey;
        /**
        Sets the restriction value.
        */
        setValue(value: string): void;
    }
}
declare namespace fm.icelink.sdp.rtp {
    /**
    The SDP media attribute "rid" specifies restrictions defining a unique RTP payload configuration.
    */
    class RidAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private __direction;
        /** @hidden */
        private _id;
        /** @hidden */
        private _payloadTypes;
        /** @hidden */
        private _restrictions;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.ridAttribute]] class.
        @param idValue The identifier.
        @param direction The direction.
        */
        constructor(idValue: string, direction: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.ridAttribute]] class.
        @param idValue The identifier.
        @param direction The direction.
        @param payloadTypes The payload types.
        */
        constructor(idValue: string, direction: string, payloadTypes: number[]);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.ridAttribute]] class.
        @param idValue The identifier.
        @param direction The direction.
        @param payloadTypes The payload types.
        @param restrictions The restrictions.
        */
        constructor(idValue: string, direction: string, payloadTypes: number[], restrictions: fm.icelink.sdp.rtp.RidRestriction[]);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.ridAttribute]] class.
        @param idValue The identifier.
        @param direction The direction.
        @param restrictions The restrictions.
        */
        constructor(idValue: string, direction: string, restrictions: fm.icelink.sdp.rtp.RidRestriction[]);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.ridAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.rtp.RidAttribute;
        /**
        Validates that the identifier conforms to RFC syntax, which means that it only contains alpha-numeric characters and/or the hyphen and underscore. See https://tools.ietf.org/html/draft-ietf-avtext-rid/ and https://tools.ietf.org/html/draft-ietf-mmusic-rid/ for more info.
        @param idValue The identifier
        */
        static validateId(idValue: string): boolean;
        /** @hidden */
        private directionIsValid;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the direction.
        */
        getDirection(): string;
        /**
        Gets the identifier.
        */
        getId(): string;
        /**
        Gets the payload types that can be used in the associated stream. This property is optional and may be null.
        */
        getPayloadTypes(): number[];
        /**
        Gets the codec-agnostic restrictions to which the corresponding stream will conform. This property is optional and may be null.
        */
        getRestrictions(): fm.icelink.sdp.rtp.RidRestriction[];
        /**
        Gets a restriction value.
        @param restrictionKey The restriction key.
        */
        getRestrictionValue(restrictionKey: string): string;
        /** @hidden */
        private setDirection;
        /** @hidden */
        private setId;
        /**
        Sets the payload types that can be used in the associated stream. This property is optional and may be null.
        */
        setPayloadTypes(value: number[]): void;
        /**
        Sets the codec-agnostic restrictions to which the corresponding stream will conform. This property is optional and may be null.
        */
        setRestrictions(value: fm.icelink.sdp.rtp.RidRestriction[]): void;
    }
}
declare namespace fm.icelink.sdp.rtp {
    /**
    The SDP media attribute "simulcast" describes, independently for send and receive directions, the number of simulcast RTP streams as well as potential alternative formats for each simulcast RTP stream.
    */
    class SimulcastAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _description1;
        /** @hidden */
        private _description2;
        /** @hidden */
        private _draftVersion;
        private fmicelinksdprtpSimulcastAttributeInit;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.simulcastAttribute]] class.
        @param description The description.
        */
        constructor(description: fm.icelink.sdp.rtp.SimulcastStreamDescription);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.simulcastAttribute]] class.
        @param description1 The first description.
        @param description2 The second description.
        */
        constructor(description1: fm.icelink.sdp.rtp.SimulcastStreamDescription, description2: fm.icelink.sdp.rtp.SimulcastStreamDescription);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.simulcastAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.rtp.SimulcastAttribute;
        /** @hidden */
        private static streamsFromString;
        /** @hidden */
        private static streamsToString;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /** @hidden */
        private getDescription;
        /**
        Gets the first description.
        */
        getDescription1(): fm.icelink.sdp.rtp.SimulcastStreamDescription;
        /**
        Gets the second description.
        */
        getDescription2(): fm.icelink.sdp.rtp.SimulcastStreamDescription;
        /**
        Gets the version of the IETF draft to comply with. https://tools.ietf.org/html/draft-ietf-mmusic-sdp-simulcast
        */
        getDraftVersion(): number;
        /**
        Gets the 'receive' description.
        */
        getReceiveDescription(): fm.icelink.sdp.rtp.SimulcastStreamDescription;
        /**
        Gets the 'send' description.
        */
        getSendDescription(): fm.icelink.sdp.rtp.SimulcastStreamDescription;
        /** @hidden */
        private setDescription1;
        /** @hidden */
        private setDescription2;
        /**
        Sets the version of the IETF draft to comply with. https://tools.ietf.org/html/draft-ietf-mmusic-sdp-simulcast
        */
        setDraftVersion(value: number): void;
    }
}
declare namespace fm.icelink.sdp.rtp {
    /**
    A simulcast stream identifier.
    */
    class SimulcastStreamId {
        getTypeString(): string;
        /** @hidden */
        private _id;
        /** @hidden */
        private _paused;
        private fmicelinksdprtpSimulcastStreamIdInit;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.simulcastStreamId]] class.
        @param idValue The identifier.
        */
        constructor(idValue: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.simulcastStreamId]] class.
        @param idValue The identifier.
        @param paused Whether the stream is paused.
        */
        constructor(idValue: string, paused: boolean);
        /**
        Gets the identifier.
        */
        getId(): string;
        /**
        Gets whether the stream is paused.
        */
        getPaused(): boolean;
        /** @hidden */
        private setId;
        /** @hidden */
        private setPaused;
    }
}
declare namespace fm.icelink.sdp.rtp {
    /**
    The SDP media attribute "ssrc-group" expresses a relationship among several sources of an RTP session.
    */
    class SsrcGroupAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _semantics;
        /** @hidden */
        private _synchronizationSources;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.ssrcGroupAttribute]] class.
        @param semantics The semantics.
        @param synchronizationSources The synchronization sources.
        */
        constructor(semantics: string, synchronizationSources: number[]);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.ssrcGroupAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.rtp.SsrcGroupAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the semantics.
        */
        getSemantics(): string;
        /**
        Gets the synchronization sources.
        */
        getSynchronizationSources(): number[];
        /** @hidden */
        private setSemantics;
        /** @hidden */
        private setSynchronizationSources;
    }
}
declare namespace fm.icelink.sdp.rtp {
    /**
    The SDP media attribute "ssrc" indicates a property (known as a "source-level attribute") of a media source (RTP stream) within an RTP session.
    */
    class SsrcAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _name;
        /** @hidden */
        private _synchronizationSource;
        /** @hidden */
        private _value;
        private fmicelinksdprtpSsrcAttributeInit;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.ssrcAttribute]] class.
        @param synchronizationSource The synchronization source.
        @param attributeName Name of the attribute.
        */
        constructor(synchronizationSource: number, attributeName: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.ssrcAttribute]] class.
        @param synchronizationSource The synchronization source.
        @param attributeName Name of the attribute.
        @param attributeValue The attribute value.
        */
        constructor(synchronizationSource: number, attributeName: string, attributeValue: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.rtp.ssrcAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.rtp.SsrcAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the name of the attribute.
        */
        getName(): string;
        /**
        Gets the synchronization source.
        */
        getSynchronizationSource(): number;
        /**
        Gets the attribute value.
        */
        getValue(): string;
        /** @hidden */
        private setName;
        /** @hidden */
        private setSynchronizationSource;
        /**
        Sets the attribute value.
        */
        setValue(value: string): void;
    }
}
declare namespace fm.icelink.sdp.rtp {
    /**
    SSRC atribute names.
    */
    class SsrcAttributeName {
        getTypeString(): string;
        constructor();
        /**
        Gets a value indicating canonical name.
        */
        static getCName(): string;
        /**
        Gets a value indicating format parameters.
        */
        static getFormatParameters(): string;
        /**
        Gets a value indicating label.
        */
        static getLabel(): string;
        /**
        Gets a value indicating media stream ID.
        */
        static getMediaStreamId(): string;
        /**
        Gets a value indicating media stream label.
        */
        static getMediaStreamLabel(): string;
        /**
        Gets a value indicating previous SSRC.
        */
        static getPreviousSsrc(): string;
    }
}
declare namespace fm.icelink.sdp.sctp {
    /**
    AB: Legacy attribute. To be removed when Firefox and Chrome stop using it. The sctpmap attribute maps from a port number (as used in an "m=" line) to an encoding name denoting the payload format to be used on top of the SCTP association or the actual protocol running on top of it. Last appears in https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-06#page-6 Has been replaced in subsequent drafts but is used in Firefox and Chrome for now.
    */
    class MapAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _port;
        /** @hidden */
        private _sctpProtocol;
        /** @hidden */
        private _streams;
        private fmicelinksdpsctpMapAttributeInit;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.sctp.portAttribute]] class.
        @param port The SCTP port.
        @param protocol The protocol.
        @param streams The streams.
        */
        constructor(port: number, protocol: string, streams: number);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.sctp.portAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.sctp.MapAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the SCTP port.
        */
        getPort(): number;
        /**
        Gets the SCTP sub-protocol (association usage).
        */
        getSctpProtocol(): string;
        /**
        Gets the number of incoming streams.
        */
        getStreams(): number;
        /** @hidden */
        private setPort;
        /** @hidden */
        private setSctpProtocol;
        /** @hidden */
        private setStreams;
    }
}
declare namespace fm.icelink.sdp.sctp {
    /**
    The attribute can be associated with an m- line to indicate the maximum message size (indicated in bytes) that an SCTP endpoint is willing to receive on the SCTP association associated with the m- line. Different attribute values can be used in each direction.
    */
    class MaxMessageSizeAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _maxMessageSize;
        private fmicelinksdpsctpMaxMessageSizeAttributeInit;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.sctp.maxMessageSizeAttribute]] class.
        @param maxMessageSize The maximum message size in bytes.
        */
        constructor(maxMessageSize: number);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.sctp.maxMessageSizeAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.sctp.MaxMessageSizeAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the maximum message size in bytes.
        */
        getMaxMessageSize(): number;
        /** @hidden */
        private setMaxMessageSize;
    }
}
declare namespace fm.icelink.sdp.sctp {
    /**
    An SDP media description with a transport protocol of "RTP/AVP" or "RTP/SAVP".
    */
    class Media extends fm.icelink.sdp.Media {
        getTypeString(): string;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.sctp.media]] class.
        @param mediaType The media type. See [[fm.icelink.sdp.mediaType]] for possible values.
        @param transportPort The transport port.
        @param transportProtocol The transport protocol.
        @param associationUsage The association usage.
        */
        constructor(mediaType: string, transportPort: number, transportProtocol: string, associationUsage: string);
        /**
        Gets the protocol keyword for the SCTP over DTLS data profile.
        */
        static getDtlsSctpTransportProtocol(): string;
        /**
        Gets the protocol keyword for the DTLS over SCTP data profile.
        */
        static getSctpDtlsTransportProtocol(): string;
        /**
        Gets the protocol keyword for the SCTP data profile.
        */
        static getSctpTransportProtocol(): string;
        /**
        Gets the protocol keyword for the SCTP over DTLS over TCP data profile.
        */
        static getTcpDtlsSctpTransportProtocol(): string;
        /**
        Gets the protocol keyword for the SCTP over DTLS over UDP data profile.
        */
        static getUdpDtlsSctpTransportProtocol(): string;
        /**
        Gets the Association Usage name registry for WebRTC Datachannel.
        */
        static getWebRtcDatachannelAssociationUsage(): string;
        /**
        Returns a value indicating whther a given protocol is supported.
        @param protocol Protocol keyword.
        @return Value indicating whther a given protocol is supported.
        */
        static isSupported(protocol: string): boolean;
        /**
        Returns a value indicating whther a given protocol supports encryption.
        @param protocol Protocol keyword.
        @return Value indicating whther a given protocol supports encryption.
        */
        static supportsEncryption(protocol: string): boolean;
    }
}
declare namespace fm.icelink.sdp.sctp {
    /**
    The attribute can be associated with an SDP media description (m- line) with a 'UDP/DTLS/SCTP' or a 'TCP/DTLS/SCTP' proto value, in which case the m- line port value indicates the port of the underlying transport-layer protocol (UDP or TCP), on which SCTP is carried, and the 'sctp-port' value indicates the SCTP port.
    */
    class PortAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _port;
        private fmicelinksdpsctpPortAttributeInit;
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.sctp.portAttribute]] class.
        @param port The SCTP port.
        */
        constructor(port: number);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.sctp.portAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.sctp.PortAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the SCTP port.
        */
        getPort(): number;
        /** @hidden */
        private setPort;
    }
}
declare namespace fm.icelink.sdp {
    /**
    This can be a session-level attribute or a media-level attribute.  As a session-level attribute, it specifies the language for the session description.  As a media-level attribute, it specifies the language for any media-level SDP information field associated with that media.  Multiple sdplang attributes can be provided either at session or media level if multiple languages in the session description or media use multiple languages, in which case the order of the attributes indicates the order of importance of the various languages in the session or media from most important to least important.
    */
    class SdpLanguageAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _languageTag;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.sdpLanguageAttribute]] class.
        @param languageTag The language for either the session description
                    (if used as a session-level attribute) or any media-level SDP
                    information field associated with that media (if used as a
                    media-level attribute).
        */
        constructor(languageTag: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.sdpLanguageAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.SdpLanguageAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the language for either the session description (if used as a session-level attribute) or any media-level SDP information field associated with that media (if used as a media-level attribute).
        */
        getLanguageTag(): string;
        /** @hidden */
        private setLanguageTag;
    }
}
declare namespace fm.icelink.sdp {
    /**
    This specifies that the tools should be started in send-only mode.  An example may be where a different unicast address is to be used for a traffic destination than for a traffic source. In such a case, two media descriptions may be used, one sendonly and one recvonly.  It can be either a session- or media-level attribute, but would normally only be used as a media attribute.  It is not dependent on charset.  Note that sendonly applies only to the media, and any associated control protocol (e.g., RTCP) SHOULD still be received and processed as normal.
    */
    class SendOnlyAttribute extends fm.icelink.sdp.DirectionAttribute {
        getTypeString(): string;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.sendOnlyAttribute]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.sendOnlyAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.SendOnlyAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the stream direction.
        */
        getStreamDirection(): fm.icelink.StreamDirection;
    }
}
declare namespace fm.icelink.sdp {
    /**
    This specifies that the tools should be started in send and receive mode.  This is necessary for interactive conferences with tools that default to receive-only mode.  It can be either a session or media-level attribute, and it is not dependent on charset.
    */
    class SendReceiveAttribute extends fm.icelink.sdp.DirectionAttribute {
        getTypeString(): string;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.sendReceiveAttribute]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.sendReceiveAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.SendReceiveAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the stream direction.
        */
        getStreamDirection(): fm.icelink.StreamDirection;
    }
}
declare namespace fm.icelink.sdp {
    /**
    Defines valid SDP setups.
    */
    abstract class Setup {
        getTypeString(): string;
        /**
        Gets the SDP setup meaning "Active".
        */
        static getActive(): string;
        /**
        Gets the SDP setup meaning "Active or Passive".
        */
        static getActPass(): string;
        /**
        Gets the SDP setup meaning "Passive".
        */
        static getPassive(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    The 'setup' attribute indicates which of the end points should initiate the TCP connection establishment (i.e., send the initial TCP SYN).  The 'setup' attribute is charset-independent and can be a session-level or a media-level attribute.
    */
    class SetupAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _setup;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.setupAttribute]] class.
        @param setup Which end point should initiate the connection establishment. See [[fm.icelink.sdp.setupAttribute.setup]] for possible values.
        */
        constructor(setup: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.setupAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.SetupAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets which end point should initiate the connection establishment. See [[fm.icelink.sdp.setupAttribute.setup]] for possible values.
        */
        getSetup(): string;
        /** @hidden */
        private setSetup;
    }
}
declare namespace fm.icelink.sdp {
    /**
    An SDP time description element.
    */
    class TimeDescription {
        getTypeString(): string;
        /** @hidden */
        private __repeatTimes;
        /** @hidden */
        private _timing;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.timeDescription]] class.
        @param timing The start and stop time.
        */
        constructor(timing: fm.icelink.sdp.Timing);
        /**
        Creates an [[fm.icelink.sdp.timeDescription]] instance from a string.
        @param s The string to parse.
        */
        static parse(s: string): fm.icelink.sdp.TimeDescription;
        /**
        Adds a repeat time.
        @param repeatTime The repeat time to add.
        */
        addRepeatTime(repeatTime: fm.icelink.sdp.RepeatTime): void;
        /**
        Gets the array of repeat times.
        */
        getRepeatTimes(): fm.icelink.sdp.RepeatTime[];
        /**
        Gets the start and stop time.
        */
        getTiming(): fm.icelink.sdp.Timing;
        /**
        Removes a repeat time.
        @param repeatTime The repeat time to remove.
        */
        removeRepeatTime(repeatTime: fm.icelink.sdp.RepeatTime): boolean;
        /** @hidden */
        private setTiming;
        /**
        Converts this instance to a string.
        */
        toString(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    An SDP time zone element.
    */
    class TimeZone {
        getTypeString(): string;
        /** @hidden */
        private _adjustmentTime;
        /** @hidden */
        private _offset;
        private fmicelinksdpTimeZoneInit;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.timeZone]] class.
        @param adjustmentTime The time that a time zone adjustment happens (network time protocol).
        @param offset The offset from the time when the session was first scheduled.
        */
        constructor(adjustmentTime: number, offset: fm.icelink.TimeSpan);
        /**
        Creates an [[fm.icelink.sdp.timeZone]] instance from a string.
        @param s The string to parse.
        */
        static parse(s: string): fm.icelink.sdp.TimeZone;
        /**
        Gets the time that a time zone adjustment happens (network time protocol).
        */
        getAdjustmentTime(): number;
        /**
        Gets the offset from the time when the session was first scheduled.
        */
        getOffset(): fm.icelink.TimeSpan;
        /** @hidden */
        private setAdjustmentTime;
        /** @hidden */
        private setOffset;
        /**
        Converts this instance to a string.
        */
        toString(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    An SDP time zones element.
    */
    class TimeZones {
        getTypeString(): string;
        /** @hidden */
        private __values;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.timeZones]] class.
        @param values The values.
        */
        constructor(values: fm.icelink.sdp.TimeZone[]);
        /**
        Creates an [[fm.icelink.sdp.timeZones]] instance from a string.
        @param s The string to parse.
        */
        static parse(s: string): fm.icelink.sdp.TimeZones;
        /**
        Adds a time zone adjustment.
        @param value The time zone adjustment to add.
        */
        addTimeZone(value: fm.icelink.sdp.TimeZone): void;
        /**
        Gets the array of time zone adjustments.
        */
        getValues(): fm.icelink.sdp.TimeZone[];
        /**
        Removes a time zone adjustment.
        @param value The time zone adjustment to remove.
        */
        removeTimeZone(value: fm.icelink.sdp.TimeZone): boolean;
        /**
        Converts this instance to a string.
        */
        toString(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    An SDP timing element.
    */
    class Timing {
        getTypeString(): string;
        /** @hidden */
        private _startTime;
        /** @hidden */
        private _stopTime;
        private fmicelinksdpTimingInit;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.timing]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.sdp.timing]] class.
        @param startTime The start time.
        @param stopTime The stop time.
        */
        constructor(startTime: number, stopTime: number);
        /**
        Creates an [[fm.icelink.sdp.timing]] instance from a string.
        @param s The string to parse.
        */
        static parse(s: string): fm.icelink.sdp.Timing;
        /**
        Gets the start time.
        */
        getStartTime(): number;
        /**
        Gets the stop time.
        */
        getStopTime(): number;
        /**
        Sets the start time.
        */
        setStartTime(value: number): void;
        /**
        Sets the stop time.
        */
        setStopTime(value: number): void;
        /**
        Converts this instance to a string.
        */
        toString(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    This gives the name and version number of the tool used to create the session description.  It is a session-level attribute, and it is not dependent on charset.
    */
    class ToolAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _tool;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.toolAttribute]] class.
        @param tool The name and version number of the
                    tool used to create the session description.
        */
        constructor(tool: string);
        /**
        Initializes a new instance of the [[fm.icelink.sdp.toolAttribute]] class.
        @param value The attribute value.
        */
        static fromAttributeValue(value: string): fm.icelink.sdp.ToolAttribute;
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the name and version number of the tool used to create the session description.
        */
        getTool(): string;
        /** @hidden */
        private setTool;
    }
}
declare namespace fm.icelink.sdp {
    /**
    An SDP media description with a transport protocol of "udp".
    */
    class UdpMedia extends fm.icelink.sdp.Media {
        getTypeString(): string;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.udpMedia]] class.
        @param mediaType The media type. See [[fm.icelink.sdp.mediaType]] for possible values.
        @param transportPort The transport port.
        @param formatDescription The format description.
        */
        constructor(mediaType: string, transportPort: number, formatDescription: string);
        /**
        Gets the protocol keyword for UDP.
        */
        static getUdpTransportProtocol(): string;
    }
}
declare namespace fm.icelink.sdp {
    /**
    This attribute is used to encapsulate unrecognized SDP attributes.
    */
    class UnknownAttribute extends fm.icelink.sdp.Attribute {
        getTypeString(): string;
        /** @hidden */
        private _name;
        /** @hidden */
        private _value;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.unknownAttribute]] class.
        @param name The name.
        @param value The value.
        */
        constructor(name: string, value: string);
        /**
        Gets the internal value of the attribute.
        */
        protected getAttributeValue(): string;
        /**
        Gets the attribute name.
        */
        getName(): string;
        /**
        Gets the attribute value.
        */
        getValue(): string;
        /** @hidden */
        private setName;
        /** @hidden */
        private setValue;
    }
}
declare namespace fm.icelink.sdp {
    /**
    An SDP encryption key with a method of "uri".
    */
    class UriEncryptionKey extends fm.icelink.sdp.EncryptionKey {
        getTypeString(): string;
        /** @hidden */
        private _uri;
        /**
        Initializes a new instance of the [[fm.icelink.sdp.uriEncryptionKey]] class.
        @param uri The URI referring to the data containing the key.
        */
        constructor(uri: fm.icelink.Uri);
        /** @hidden */
        getMethodAndValue(): string;
        /**
        Gets the URI referring to the data containing the key.
        */
        getUri(): fm.icelink.Uri;
        /** @hidden */
        private setUri;
    }
}
declare namespace fm.icelink.sdp {
    /** @hidden */
    class Utility {
        getTypeString(): string;
        constructor();
        static splitAndClean(s: string): string[];
    }
}
declare namespace fm.icelink {
    /**
    A session description.
    */
    class SessionDescription {
        getTypeString(): string;
        /** @hidden */
        private _renegotiation;
        /** @hidden */
        private _sdpMessage;
        /** @hidden */
        private _tieBreaker;
        /** @hidden */
        private _type;
        private fmicelinkSessionDescriptionInit;
        constructor();
        /**
        Deserializes an instance from JSON.
        @param sessionDescriptionJson The JSON to deserialize.
        @return The deserialized session description.
        */
        static fromJson(sessionDescriptionJson: string): fm.icelink.SessionDescription;
        /**
        Serializes an instance to JSON.
        @param sessionDescription The session description.
        @return
                    The serialized JSON.
            
        */
        static toJson(sessionDescription: fm.icelink.SessionDescription): string;
        /**
        Gets a value indicating whether an audio stream is described.
        */
        getHasAudio(): boolean;
        /**
        Gets a value indicating whether a data stream is described.
        */
        getHasData(): boolean;
        /**
        Gets a value indicating whether a video stream is described.
        */
        getHasVideo(): boolean;
        /**
        Gets a value indicating whether this instance is offer.
        */
        getIsOffer(): boolean;
        /** @hidden */
        getRenegotiation(): boolean;
        /**
        Gets the SDP message.
        */
        getSdpMessage(): fm.icelink.sdp.Message;
        /**
        Gets the session id of the remote description, if remote description is set. Returns null otherwise.
        */
        getSessionId(): number;
        /**
        Gets the version of the remote description, if remote description is set. Returns null otherwise.
        */
        getSessionVersion(): number;
        /**
        Gets the tie breaker in case of a role conflict.
        */
        getTieBreaker(): string;
        /**
        Gets the type.
        */
        getType(): fm.icelink.SessionDescriptionType;
        /** @hidden */
        setRenegotiation(value: boolean): void;
        /**
        Sets the SDP message.
        */
        setSdpMessage(value: fm.icelink.sdp.Message): void;
        /**
        Sets the tie breaker in case of a role conflict.
        */
        setTieBreaker(value: string): void;
        /**
        Sets the type.
        */
        setType(value: fm.icelink.SessionDescriptionType): void;
        /**
        Serializes this instance to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    class SessionDescriptionTypeWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.SessionDescriptionType);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    A size (width and height).
    */
    class Size {
        getTypeString(): string;
        /** @hidden */
        private __height;
        /** @hidden */
        private __width;
        /** @hidden */
        private static fm_icelink_Size___empty;
        private fmicelinkSizeInit;
        /**
        Initializes a new instance of the [[fm.icelink.size]] class.
        */
        constructor();
        /**
        Initializes a new instance of the [[fm.icelink.size]] class.
        @param width The width.
        @param height The height.
        */
        constructor(width: number, height: number);
        /**
        Deserializes an instance from JSON.
        @param sizeJson The JSON to deserialize.
        @return The deserialized size.
        */
        static fromJson(sizeJson: string): fm.icelink.Size;
        /**
        Gets the empty size (0x0).
        */
        static getEmpty(): fm.icelink.Size;
        /**
        Determines whether the two sizes are equivalent.
        @param size1 The first size.
        @param size2 The second size.
        */
        static isEquivalent(size1: fm.icelink.Size, size2: fm.icelink.Size): boolean;
        /** @hidden */
        private static isEquivalentNoCheck;
        /**
        Serializes an instance to JSON.
        @param size The size.
        @return
                    The serialized JSON.
            
        */
        static toJson(size: fm.icelink.Size): string;
        /**
        Gets the height.
        */
        getHeight(): number;
        /**
        Gets the width.
        */
        getWidth(): number;
        /**
        Determines whether the specified size is equivalent.
        @param size The size.
        */
        isEquivalent(size: fm.icelink.Size): boolean;
        /**
        Sets the height.
        */
        setHeight(value: number): void;
        /**
        Sets the width.
        */
        setWidth(value: number): void;
        /**
        Serializes this instance to JSON.
        @return
                    The serialized JSON.
            
        */
        toJson(): string;
        /**
        Returns a string that represents this instance using format "{width}x{height}".
        */
        toString(): string;
    }
}
declare namespace fm.icelink {
    class StreamDirectionWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.StreamDirection);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    Class containing utility methods to manipulate [[fm.icelink.streamDirection]].
    */
    class StreamDirectionHelper {
        getTypeString(): string;
        constructor();
        /**
        Converts string representations of stream directions to [[fm.icelink.streamDirection]].
        @param directionString The direction string.
        @return The direction.
        */
        static directionFromString(directionString: string): fm.icelink.StreamDirection;
        /**
        Obtains the string representation of [[fm.icelink.streamDirection]].
        @param direction The direction.
        @return The direction string.
        */
        static directionToString(direction: fm.icelink.StreamDirection): string;
        /**
        Checks the receive flag.
        @param direction The direction.
        @return The receive flag.
        */
        static isReceiveDisabled(direction: fm.icelink.StreamDirection): boolean;
        /**
        Checks the receive flag.
        @param directionString The direction string.
        @return The receive flag.
        */
        static isReceiveDisabled(directionString: string): boolean;
        /**
        Checks the send flag.
        @param direction The direction.
        @return The send flag.
        */
        static isSendDisabled(direction: fm.icelink.StreamDirection): boolean;
        /**
        Checks the send flag.
        @param directionString The direction string.
        @return The send flag.
        */
        static isSendDisabled(directionString: string): boolean;
        /**
        Sets the receive flag.
        @param direction The direction.
        @param disabled Whether to disable the receive flag.
        @return The new direction.
        */
        static setReceiveDisabled(direction: fm.icelink.StreamDirection, disabled: boolean): fm.icelink.StreamDirection;
        /**
        Sets the receive flag.
        @param directionString The direction string.
        @param disabled Whether to disable the receive flag.
        @return The new direction.
        */
        static setReceiveDisabled(directionString: string, disabled: boolean): string;
        /**
        Sets the send flag.
        @param direction The direction.
        @param disabled Whether to disable the send flag.
        @return The new direction.
        */
        static setSendDisabled(direction: fm.icelink.StreamDirection, disabled: boolean): fm.icelink.StreamDirection;
        /**
        Sets the send flag.
        @param directionString The direction string.
        @param disabled Whether to disable the send flag.
        @return The new direction.
        */
        static setSendDisabled(directionString: string, disabled: boolean): string;
        /**
        Toggles the receive flag.
        @param direction The direction.
        @return The new direction.
        */
        static toggleReceive(direction: fm.icelink.StreamDirection): fm.icelink.StreamDirection;
        /**
        Toggles the receive flag.
        @param directionString The direction string.
        @return The new direction.
        */
        static toggleReceive(directionString: string): string;
        /**
        Toggles the send flag.
        @param direction The direction.
        @return The new direction.
        */
        static toggleSend(direction: fm.icelink.StreamDirection): fm.icelink.StreamDirection;
        /**
        Toggles the send flag.
        @param directionString The direction string.
        @return The new direction.
        */
        static toggleSend(directionString: string): string;
    }
}
declare namespace fm.icelink {
    class StreamStateWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.StreamState);
        toString(): string;
    }
}
declare namespace fm.icelink {
    class StreamTypeWrapper {
        getTypeString(): string;
        /** @hidden */
        private _value;
        constructor(value: fm.icelink.StreamType);
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    Transport Information.
    */
    class TransportInfo extends fm.icelink.Info {
        getTypeString(): string;
        /** @hidden */
        private _activeCandidatePairId;
        /** @hidden */
        private _candidatePairs;
        /** @hidden */
        private _localCandidates;
        /** @hidden */
        private _localCertificate;
        /** @hidden */
        private _remoteCandidates;
        /** @hidden */
        private _remoteCertificate;
        /**
        Initializes a new instance of the [[fm.icelink.transportInfo]] class.
        */
        constructor();
        constructor(stats: fm.icelink.TransportStats, lastStats: fm.icelink.TransportStats);
        /**
        Deserializes Json to a TransportReport.
        @param transportReportJson The serialized Json.
        @return The deserialized TransportReport.
        */
        static fromJson(transportReportJson: string): fm.icelink.TransportInfo;
        /**
        Deserializes an array from JSON.
        @param transportInfosJson The serialized JSON.
        @return The deserialized array.
        */
        static fromJsonArray(transportInfosJson: string): fm.icelink.TransportInfo[];
        /**
        Serializes an instance to Json.
        @param transportReport The instance to serialize.
        @return Serialized Json.
        */
        static toJson(transportReport: fm.icelink.TransportInfo): string;
        /**
        Serializes an array to JSON.
        @param transportInfos The array to serialize.
        @return The serialized JSON.
        */
        static toJsonArray(transportInfos: fm.icelink.TransportInfo[]): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /** @hidden */
        private findMatchingCandidate;
        /** @hidden */
        private findMatchingCandidatePair;
        /**
        Gets the active candidate pair identifier.
        */
        getActiveCandidatePairId(): string;
        /**
        Gets the candidate pairs.
        */
        getCandidatePairs(): fm.icelink.CandidatePairInfo[];
        /**
        Gets the local candidates.
        */
        getLocalCandidates(): fm.icelink.CandidateInfo[];
        /**
        Gets the local certificate.
        */
        getLocalCertificate(): fm.icelink.CertificateInfo;
        /**
        Gets the remote candidates.
        */
        getRemoteCandidates(): fm.icelink.CandidateInfo[];
        /**
        Gets the remote certificate.
        */
        getRemoteCertificate(): fm.icelink.CertificateInfo;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets the active candidate pair identifier.
        */
        setActiveCandidatePairId(value: string): void;
        /**
        Sets the candidate pairs.
        */
        setCandidatePairs(value: fm.icelink.CandidatePairInfo[]): void;
        /**
        Sets the local candidates.
        */
        setLocalCandidates(value: fm.icelink.CandidateInfo[]): void;
        /**
        Sets the local certificate.
        */
        setLocalCertificate(value: fm.icelink.CertificateInfo): void;
        /**
        Sets the remote candidates.
        */
        setRemoteCandidates(value: fm.icelink.CandidateInfo[]): void;
        /**
        Sets the remote certificate.
        */
        setRemoteCertificate(value: fm.icelink.CertificateInfo): void;
        /**
        Serializes this instance to Json.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Transport stats.
    */
    class TransportStats extends fm.icelink.BaseStats {
        getTypeString(): string;
        /** @hidden */
        private _activeCandidatePair;
        /** @hidden */
        private _bytesReceived;
        /** @hidden */
        private _bytesSent;
        /** @hidden */
        private _candidatePairs;
        /** @hidden */
        private _localCandidates;
        /** @hidden */
        private _localCertificate;
        /** @hidden */
        private _remoteCandidates;
        /** @hidden */
        private _remoteCertificate;
        /** @hidden */
        private _rtcpTransport;
        private fmicelinkTransportStatsInit;
        constructor();
        /**
        Derializes transport stats from JSON.
        @param transportJson The transport's stats JSON.
        */
        static fromJson(transportJson: string): fm.icelink.TransportStats;
        /**
        Serializes transport stats to JSON.
        @param transport The transport's stats.
        */
        static toJson(transport: fm.icelink.TransportStats): string;
        /**
        Deserializes the properties.
        @param key The key.
        @param valueJson The value in JSON format.
        */
        protected deserializeProperties(key: string, valueJson: string): void;
        /**
        Gets the active candidate pair's stats.
        */
        getActiveCandidatePair(): fm.icelink.CandidatePairStats;
        /**
        Gets the number of bytes received.
        */
        getBytesReceived(): number;
        /**
        Gets the number of bytes sent.
        */
        getBytesSent(): number;
        /**
        Gets a candidate pair by its identifier.
        @param candidatePairId The candidate pair identifier.
        */
        getCandidatePair(candidatePairId: string): fm.icelink.CandidatePairStats;
        /**
        Gets the candidate pairs' stats.
        */
        getCandidatePairs(): fm.icelink.CandidatePairStats[];
        /**
        Gets whether the active candidate pair has a host candidate.
        */
        getIsHost(): boolean;
        /**
        Gets whether the active candidate pair has a reflexive candidate.
        */
        getIsReflexive(): boolean;
        /**
        Gets whether the active candidate pair has a relayed candidate.
        */
        getIsRelayed(): boolean;
        /**
        Gets a local candidate by its identifier.
        @param candidateId The candidate identifier.
        */
        getLocalCandidate(candidateId: string): fm.icelink.CandidateStats;
        /**
        Gets the local candidates' stats.
        */
        getLocalCandidates(): fm.icelink.CandidateStats[];
        /**
        Gets the local certificate's stats.
        */
        getLocalCertificate(): fm.icelink.CertificateStats;
        /**
        Gets a remote candidate by its identifier.
        @param candidateId The candidate identifier.
        */
        getRemoteCandidate(candidateId: string): fm.icelink.CandidateStats;
        /**
        Gets the remote candidates' stats.
        */
        getRemoteCandidates(): fm.icelink.CandidateStats[];
        /**
        Gets the remote certificate's stats.
        */
        getRemoteCertificate(): fm.icelink.CertificateStats;
        /**
        Gets the RTCP transport's stats.
        */
        getRtcpTransport(): fm.icelink.TransportStats;
        /**
        Serializes the properties.
        @param jsonObject The JSON object.
        */
        protected serializeProperties(jsonObject: fm.icelink.Hash<string, string>): void;
        /**
        Sets the active candidate pair's stats.
        */
        setActiveCandidatePair(value: fm.icelink.CandidatePairStats): void;
        /**
        Sets the number of bytes received.
        */
        setBytesReceived(value: number): void;
        /**
        Sets the number of bytes sent.
        */
        setBytesSent(value: number): void;
        /**
        Sets the candidate pairs' stats.
        */
        setCandidatePairs(value: fm.icelink.CandidatePairStats[]): void;
        /**
        Sets the local candidates' stats.
        */
        setLocalCandidates(value: fm.icelink.CandidateStats[]): void;
        /**
        Sets the local certificate's stats.
        */
        setLocalCertificate(value: fm.icelink.CertificateStats): void;
        /**
        Sets the remote candidates' stats.
        */
        setRemoteCandidates(value: fm.icelink.CandidateStats[]): void;
        /**
        Sets the remote certificate's stats.
        */
        setRemoteCertificate(value: fm.icelink.CertificateStats): void;
        /**
        Sets the RTCP transport's stats.
        */
        setRtcpTransport(value: fm.icelink.TransportStats): void;
        /**
        Serializes this to JSON.
        */
        toJson(): string;
    }
}
declare namespace fm.icelink {
    /**
    Utility methods.
    */
    class Utility {
        getTypeString(): string;
        constructor();
        /**
        Clones the specified list.
        @param list The list.
        */
        static clone<T>(list: Array<T>): Array<T>;
        /**
        Gets the first element in the array or the default value if the array is null or empty.
        @param array The array.
        */
        static firstOrDefault<T>(array: T[]): T;
        /**
        Gets the first element in the list or the default value if the list is null or empty.
        @param list The list.
        */
        static firstOrDefault<T>(list: Array<T>): T;
        /**
        Formats a double as a percentage string.
        @param value The value.
        @param decimalPlaces The number of decimal places to include.
        */
        static formatDoubleAsPercent(value: number, decimalPlaces: number): string;
        /**
        Generates a unique identifier.
        */
        static generateId(): string;
        /**
        Generates a synchronization source.
        */
        static generateSynchronizationSource(): number;
        /**
        Generates a tie-breaker. Obsolete. Alias for [[fm.icelink.utility.generateId]].
        */
        static generateTieBreaker(): string;
        /**
        Gets the last element in the array or the default value if the array is null or empty.
        @param array The array.
        */
        static lastOrDefault<T>(array: T[]): T;
        /**
        Gets the last element in the list or the default value if the list is null or empty.
        @param list The list.
        */
        static lastOrDefault<T>(list: Array<T>): T;
        /**
        Gets the only element in the array or the default value if the array is null or does not have exactly one value.
        @param array The array.
        */
        static singleOrDefault<T>(array: T[]): T;
        /**
        Gets the only element in the list or the default value if the list is null or does not have exactly one value.
        @param list The list.
        */
        static singleOrDefault<T>(list: Array<T>): T;
        /**
        Splices an array.
        @param array The array.
        @param index The splice index.
        @param addItems The items to add.
        @param createArray A function that creates an array of the given size.
        */
        static splice<T>(array: T[], index: number, addItems: T[], createArray: fm.icelink.IFunction1<number, T[]>): T[];
        /**
        Splices an array.
        @param array The array.
        @param index The splice index.
        @param removeCount The number of items to remove.
        @param addItems The items to add.
        @param createArray A function that creates an array of the given size.
        */
        static splice<T>(array: T[], index: number, removeCount: number, addItems: T[], createArray: fm.icelink.IFunction1<number, T[]>): T[];
        /**
        Splices an array.
        @param array The array.
        @param index The splice index.
        @param removeCount The number of items to remove.
        @param createArray A function that creates an array of the given size.
        */
        static splice<T>(array: T[], index: number, removeCount: number, createArray: fm.icelink.IFunction1<number, T[]>): T[];
        /**
        Converts a list of int values to an array of int values.
        @param intList A list of int values.
        */
        static toIntArray(intList: Array<number>): number[];
        /**
        Converts an array to a list.
        @param array The array.
        */
        static toList<T>(array: T[]): Array<T>;
        /**
        Converts a list of long values to an array of long values.
        @param longList A list of long values.
        */
        static toLongArray(longList: Array<number>): number[];
        /**
        Converts a list of string values to an array of string values.
        @param stringList A list of string values.
        */
        static toStringArray(stringList: Array<string>): string[];
        /**
        Enumerates over all nodes in the tree, invoking the callback for each one.
        @param root The root.
        @param childrenCallback The children callback.
        @param nodeCallback The node callback.
        */
        static treeFindLeaves<T>(root: T, childrenCallback: fm.icelink.IFunction1<T, T[]>, nodeCallback: fm.icelink.IAction1<T>): void;
        /**
        Enumerates over all nodes in the tree, invoking the callback for each one.
        @param root The root.
        @param childrenCallback The children callback.
        @param nodeCallback The node callback.
        */
        static treeSearch<T>(root: T, childrenCallback: fm.icelink.IFunction1<T, T[]>, nodeCallback: fm.icelink.IAction1<T>): void;
    }
}
declare namespace fm.icelink {
    /**
    A screen configuration.
    */
    class ScreenConfig extends fm.icelink.MediaConfig<fm.icelink.ScreenConfig> {
        getTypeString(): string;
        /** @hidden */
        private __frameRate;
        /** @hidden */
        private __region;
        private fmicelinkScreenConfigInit;
        /**
        Initializes a new instance of the [[fm.icelink.screenConfig]] class.
        @param origin The region origin.
        @param size The region size.
        @param frameRate The frame rate.
        */
        constructor(origin: fm.icelink.Point, size: fm.icelink.Size, frameRate: number);
        /**
        Initializes a new instance of the [[fm.icelink.screenConfig]] class.
        @param origin The region origin.
        @param size The region size.
        @param frameRate The frame rate.
        @param clockRate The clock rate.
        */
        constructor(origin: fm.icelink.Point, size: fm.icelink.Size, frameRate: number, clockRate: number);
        /**
        Initializes a new instance of the [[fm.icelink.screenConfig]] class.
        @param region The region.
        @param frameRate The frame rate.
        */
        constructor(region: fm.icelink.Rectangle, frameRate: number);
        /**
        Initializes a new instance of the [[fm.icelink.screenConfig]] class.
        @param region The region.
        @param frameRate The frame rate.
        @param clockRate The clock rate.
        */
        constructor(region: fm.icelink.Rectangle, frameRate: number, clockRate: number);
        /**
        Initializes a new instance of the [[fm.icelink.screenConfig]] class.
        @param x The region origin X coordinate.
        @param y The region origin Y coordinate.
        @param width The region size width.
        @param height The region size height.
        @param frameRate The frame rate.
        */
        constructor(x: number, y: number, width: number, height: number, frameRate: number);
        /**
        Initializes a new instance of the [[fm.icelink.screenConfig]] class.
        @param x The region origin X coordinate.
        @param y The region origin Y coordinate.
        @param width The region size width.
        @param height The region size height.
        @param frameRate The frame rate.
        @param clockRate The clock rate.
        */
        constructor(x: number, y: number, width: number, height: number, frameRate: number, clockRate: number);
        /**
        Gets the frame-rate.
        */
        getFrameRate(): number;
        /**
        Gets the region size height.
        */
        getHeight(): number;
        /**
        Gets the region origin.
        */
        getOrigin(): fm.icelink.Point;
        /**
        Gets the region.
        */
        getRegion(): fm.icelink.Rectangle;
        /**
        Gets the region size.
        */
        getSize(): fm.icelink.Size;
        /**
        Gets the region size width.
        */
        getWidth(): number;
        /**
        Gets the region origin X coordinate.
        */
        getX(): number;
        /**
        Gets the region origin Y coordinate.
        */
        getY(): number;
        /**
        Determines whether the specified configuration is equivalent.
        @param config The configuration.
        */
        isEquivalent(config: fm.icelink.ScreenConfig): boolean;
        /**
        Sets the frame-rate.
        */
        setFrameRate(value: number): void;
        /**
        Sets the region origin.
        */
        setOrigin(value: fm.icelink.Point): void;
        /**
        Sets the region.
        */
        setRegion(value: fm.icelink.Rectangle): void;
        /**
        Sets the region size.
        */
        setSize(value: fm.icelink.Size): void;
        /**
        Returns a string that represents this instance.
        */
        toString(): string;
    }
}
declare namespace fm.icelink {
    /**
    A video configuration.
    */
    class VideoConfig extends fm.icelink.MediaConfig<fm.icelink.VideoConfig> {
        getTypeString(): string;
        /** @hidden */
        private __frameRate;
        /** @hidden */
        private __size;
        private fmicelinkVideoConfigInit;
        /**
        Initializes a new instance of the [[fm.icelink.videoConfig]] class.
        @param size The size.
        @param frameRate The frame rate.
        */
        constructor(size: fm.icelink.Size, frameRate: number);
        /**
        Initializes a new instance of the [[fm.icelink.videoConfig]] class.
        @param size The size.
        @param frameRate The frame rate.
        @param clockRate The clock rate.
        */
        constructor(size: fm.icelink.Size, frameRate: number, clockRate: number);
        /**
        Initializes a new instance of the [[fm.icelink.videoConfig]] class.
        @param width The width.
        @param height The height.
        @param frameRate The frame rate.
        */
        constructor(width: number, height: number, frameRate: number);
        /**
        Initializes a new instance of the [[fm.icelink.videoConfig]] class.
        @param width The width.
        @param height The height.
        @param frameRate The frame rate.
        @param clockRate The clock rate.
        */
        constructor(width: number, height: number, frameRate: number, clockRate: number);
        /**
        Gets the frame duration in milliseconds.
        */
        getFrameDuration(): number;
        /**
        Gets the frame-rate.
        */
        getFrameRate(): number;
        /**
        Gets the size height.
        */
        getHeight(): number;
        /**
        Gets the size.
        */
        getSize(): fm.icelink.Size;
        /**
        Gets the size width.
        */
        getWidth(): number;
        /**
        Determines whether the specified configuration is equivalent.
        @param config The configuration.
        */
        isEquivalent(config: fm.icelink.VideoConfig): boolean;
        /**
        Sets the frame-rate.
        */
        setFrameRate(value: number): void;
        /**
        Sets the size.
        */
        setSize(value: fm.icelink.Size): void;
        /**
        Returns a string that represents this instance.
        */
        toString(): string;
    }
}
declare namespace fm.icelink {
}
declare namespace fm.icelink {
}
declare namespace fm.icelink {
}
declare namespace fm.icelink {
}
declare namespace fm.icelink {
}
declare namespace fm.icelink {
}
declare namespace fm.icelink {
}
declare namespace fm.icelink {
}
declare namespace fm.icelink {
}
declare namespace fm.icelink {
}
declare namespace fm.icelink {
}
declare namespace fm.icelink {
}
declare namespace fm.icelink.sdp {
}
declare namespace fm.icelink.sdp {
}
declare namespace fm.icelink.sdp.rtp {
}
