/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wolfy87Eventemitter = __webpack_require__(2);

var _wolfy87Eventemitter2 = _interopRequireDefault(_wolfy87Eventemitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TIME = {
	bodys: [],
	delta: 16
};

var stop = false;
TIME.addBody = function (timeBody) {
	this.bodys.push(timeBody);
};

TIME.removeBody = function (timeBody) {
	var index = this.bodys.indexOf(timeBody);

	if (index !== -1) {
		this.bodys.splice(index, 1);
	}
};
TIME.tick = function () {
	var now = new Date().getTime();
	var last = now;
	var delta;
	return function () {
		delta = now - last;
		delta = delta > 500 ? 30 : delta < 16 ? 16 : delta;
		TIME.delta = delta;
		last = now;

		TIME.handleFrame(delta);
		if (!stop) {
			requestAnimationFrame(TIME.tick);
		}
	};
}();

TIME.start = function () {
	stop = false;
	this.tick();
};

TIME.stop = function () {
	stop = true;
};

TIME.handleFrame = function (delta) {

	TIME.bodys.forEach(function (body) {
		if (!body.isStop) {
			body.ticks.forEach(function (tick) {
				tick.fn && tick.fn(delta);
			});
		}
	});

	TWEEN.update();
};

window.TIME = window.TIME || TIME;

var Time = function (_EventEmitter) {
	_inherits(Time, _EventEmitter);

	function Time() {
		_classCallCheck(this, Time);

		var _this = _possibleConstructorReturn(this, (Time.__proto__ || Object.getPrototypeOf(Time)).call(this));

		_this.ticks = [];
		_this.tweens = [];
		_this.isStop = false;
		TIME.addBody(_this);
		return _this;
	}

	_createClass(Time, [{
		key: 'destory',
		value: function destory() {
			TIME.removeBody(this);
		}
	}, {
		key: 'addTick',
		value: function addTick(fn) {
			var tick = { 'fn': fn.bind(this) };

			tick.isStop = false;
			this.ticks.push(tick);
			return tick;
		}
	}, {
		key: 'removeTick',
		value: function removeTick(tick) {
			if (!tick) {
				this.ticks = [];
				return;
			}

			var index = this.ticks.indexOf(tick);

			if (index !== -1) {
				this.ticks.splice(index, 1);
			}
		}
	}, {
		key: 'addTween',
		value: function addTween(tween) {
			this.tweens.push(tween);
		}
	}, {
		key: 'removeTween',
		value: function removeTween(tween) {
			if (!tween) {
				this.tween = [];
				return;
			}

			var index = this.tweens.indexOf(tween);

			if (index !== -1) {
				this.tweens.splice(index, 1);
			}
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.isStop = true;
			this.tweens.forEach(function (tween) {
				tween.stop();
			});
		}
	}, {
		key: 'start',
		value: function start() {
			this.isStop = false;
			this.tweens.forEach(function (tween) {
				tween.start();
			});
		}
	}]);

	return Time;
}(_wolfy87Eventemitter2.default);

window.Time = Time;

for (var i = 0; i < 10000; i += 100) {
	window['TIME_' + i] = window.env === 'develop' ? 0 : i;
}

exports.default = Time;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * EventEmitter v5.1.0 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */

;(function (exports) {
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */
    function EventEmitter() {}

    // Shortcuts to improve speed and size
    var proto = EventEmitter.prototype;
    var originalGlobalValue = exports.EventEmitter;

    /**
     * Finds the index of the listener for the event in its storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */
    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */
    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;

        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        }
        else {
            response = events[evt] || (events[evt] = []);
        }

        return response;
    };

    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
    };

    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }

        return response || listeners;
    };

    function isValidListener (listener) {
        if (typeof listener === 'function' || listener instanceof RegExp) {
            return true
        } else if (listener && typeof listener === 'object') {
            return isValidListener(listener.listener)
        } else {
            return false
        }
    }

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListener = function addListener(evt, listener) {
        if (!isValidListener(listener)) {
            throw new TypeError('listener must be a function');
        }

        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }

        return this;
    };

    /**
     * Alias of addListener
     */
    proto.on = alias('addListener');

    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };

    /**
     * Alias of addOnceListener.
     */
    proto.once = alias('addOnceListener');

    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };

    /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };

    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);

                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }

        return this;
    };

    /**
     * Alias of removeListener
     */
    proto.off = alias('removeListener');

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt];
        }
        else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        return this;
    };

    /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */
    proto.removeAllListeners = alias('removeEvent');

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emitEvent = function emitEvent(evt, args) {
        var listenersMap = this.getListenersAsObject(evt);
        var listeners;
        var listener;
        var i;
        var key;
        var response;

        for (key in listenersMap) {
            if (listenersMap.hasOwnProperty(key)) {
                listeners = listenersMap[key].slice(0);

                for (i = 0; i < listeners.length; i++) {
                    // If the listener returns true then it shall be removed from the event
                    // The function is executed either with a basic call or an apply if there is an args array
                    listener = listeners[i];

                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }

                    response = listener.listener.apply(this, args || []);

                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }

        return this;
    };

    /**
     * Alias of emitEvent
     */
    proto.trigger = alias('emitEvent');

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };

    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };

    /**
     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
     *
     * @return {Function} Non conflicting EventEmitter class.
     */
    EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
    };

    // Expose the class either via AMD, CommonJS or the global object
    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return EventEmitter;
        }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
    else if (typeof module === 'object' && module.exports){
        module.exports = EventEmitter;
    }
    else {
        exports.EventEmitter = EventEmitter;
    }
}(this || {}));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var distPath = './dist';

var ASSETS = {
    presetjs: { url: distPath + '/preset.js', size: 100 },

    fonts: [{ url: 'http://cdn.bootcss.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0', size: 76 }, { url: 'http://cdn.bootcss.com/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0', size: 76 }],

    snippets: {
        'guitar': {
            url: __webpack_require__(22), size: 20
        },
        'lanqiu': {
            url: __webpack_require__(24), size: 20
        },
        'meizu': {
            url: __webpack_require__(25), size: 20
        },
        'pingpangqiu': {
            url: __webpack_require__(26), size: 20
        },
        'sumiao': {
            url: __webpack_require__(28), size: 20
        },
        'shufa': {
            url: __webpack_require__(27), size: 20
        },
        'yumaoqiu': {
            url: __webpack_require__(30), size: 20
        },
        'tenda': {
            url: __webpack_require__(29), size: 20
        },
        'html5': {
            url: __webpack_require__(23), size: 20
        },
        'css3': {
            url: __webpack_require__(21), size: 20
        }
    }
};
exports.default = ASSETS;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var loadedCache = {};

var Loader = function () {
	function Loader() {
		_classCallCheck(this, Loader);
	}

	_createClass(Loader, [{
		key: 'calculateSize',
		value: function calculateSize(loadParams) {
			var totalSize = 0;
			var loadTasks = this._getLoadTasks(loadParams);

			for (var i = 0; i < loadTasks.length; i++) {
				totalSize += loadTasks[i].size;
			}
			return totalSize;
		}
	}, {
		key: 'load',
		value: function load(loadParams, onProgress) {
			var that = this;
			return new Promise(function (onLoad, reject) {
				var loadedCount = 0;
				var totalSize = 0;
				var loadedSize = 0;
				var loadTasks = [];
				var loadTask = void 0;

				loadTasks = that._getLoadTasks(loadParams);

				function getLoadedSize() {
					var loadedSize = 0;
					loadTasks.forEach(function (_loadTask) {
						loadedSize += _loadTask.loaded;
					});
					return loadedSize;
				}
				for (var i = 0; i < loadTasks.length; i++) {
					loadTask = loadTasks[i];
					loadTask.loaded = 0;
					totalSize += loadTask.size;

					if (loadedCache[loadTask.url]) {
						loadedCount++;
						loadTask.loaded = loadTask.size;
						continue;
					}
					(function (loadTask) {
						loadMethod[loadTask.type](loadTask.url, function (res) {
							loadedCount++;
							loadedCache[loadTask.url] = res;
							loadTask.loaded = loadTask.size;

							if (getLoadedSize() / totalSize === 1 && loadedCount === loadTasks.length) {
								onProgress(getLoadedSize() / totalSize);
								onLoad(that._getResults(loadParams));
							}
						}, function (progress) {
							loadTask.loaded = loadTask.size * progress;
							onProgress(getLoadedSize() / totalSize);
						});
					})(loadTask);
				}
			});
		}
	}, {
		key: '_getLoaderType',
		value: function _getLoaderType(ext) {
			var typeExtMap = {
				'img': /(jpg|jpeg|gif|png)/,
				'json': /json/,
				'js': /js/,
				'font': /(woff|ttf)/
			};

			for (var type in typeExtMap) {
				if (typeExtMap[type].test(ext)) {
					return type;
				}
			}
		}
	}, {
		key: '_getLoadTasks',
		value: function _getLoadTasks(_params) {
			var urlRegx = /.+\.(\w{2,6})(\?.*)?$/;
			var sizeDefault = {
				'img': 100,
				'json': 100
			};
			var that = this;

			function _getLoadTasks(params) {
				var urls = [];
				var type = void 0;

				if (Object.prototype.toString.call(params) === '[object Array]') {
					params.forEach(function (param) {
						urls = urls.concat(_getLoadTasks(param));
					});
				} else if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object' && !params.url) {
					for (var key in params) {
						urls = urls.concat(_getLoadTasks(params[key]));
					}
				} else if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object' && params.url) {
					type = params.url.match(urlRegx)[1];

					urls.push({
						'url': params.url,
						'size': params.size || sizeDefault[type] || 1,
						'type': params.type || that._getLoaderType(type)
					});
				}
				return urls;
			}
			return _getLoadTasks(_params);
		}
	}, {
		key: '_getResults',
		value: function _getResults(_params) {
			var params = _extends({}, _params);

			function _getResults(params) {
				if (Object.prototype.toString.call(params) === '[object Array]') {
					return params.map(function (param) {
						return _getResults(param);
					});
				} else if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object' && !params.url) {
					for (var key in params) {
						params[key] = _getResults(params[key]);
					}
					return params;
				} else if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object' && params.url) {
					return loadedCache[params.url];
				} else {
					return params;
				}
			}
			return _getResults(params);
		}
	}]);

	return Loader;
}();

var XHRLoader = function () {
	function XHRLoader() {
		_classCallCheck(this, XHRLoader);
	}

	_createClass(XHRLoader, [{
		key: 'load',
		value: function load(url, onLoad, onProgress, onError) {
			var req = new XMLHttpRequest();

			req.addEventListener("progress", function (xhr) {
				if (xhr.lengthComputable) {
					onProgress(xhr.loaded / xhr.total);
				}
			}, false);

			req.addEventListener("load", function (event) {
				var response = event.target.response;
				if (this.status === 200) {
					if (onLoad) onLoad(response);
				} else if (this.status === 0) {
					if (onLoad) onLoad(response);
				} else {
					if (onError) onError(event);
				}
			}, false);

			req.open("GET", url);
			req.send(null);
		}
	}]);

	return XHRLoader;
}();

var loadMethod = {
	'img': function img(url, onLoad, onProgress) {
		var loader = new XHRLoader();
		loader.load(url, function (img) {
			var imgInfo = {};
			imgInfo.img = img;
			imgInfo.src = url;
			onLoad(imgInfo);
		}, onProgress);
	},

	'json': function json(url, onLoad, onProgress) {
		var xhrLoader = new XHRLoader();
		xhrLoader.load(url, onLoad, onProgress);
	},

	'model': function model(url, onLoad, onProgress) {
		var xhrLoader = new XHRLoader();
		xhrLoader.load(url, function (str) {
			onLoad(str.replace(/module\.exports\s*=\s*/, ''));
		}, onProgress);
	},

	'js': function js(url, onLoad, onProgress) {
		var xhrLoader = new XHRLoader();
		xhrLoader.load(url, function () {
			var jsInfo = {};
			jsInfo.src = url;
			onLoad(jsInfo);
		}, onProgress);
	},
	'font': function font(url, onLoad, onProgress) {
		var xhrLoader = new XHRLoader();
		xhrLoader.load(url, function () {
			var info = {};
			info.src = url;
			onLoad(info);
		}, onProgress);
	}
};

exports.default = Loader;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _time = __webpack_require__(0);

var _time2 = _interopRequireDefault(_time);

var _planets = __webpack_require__(13);

var _planets2 = _interopRequireDefault(_planets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Galaxy = function (_Time) {
    _inherits(Galaxy, _Time);

    function Galaxy() {
        _classCallCheck(this, Galaxy);

        var _this = _possibleConstructorReturn(this, (Galaxy.__proto__ || Object.getPrototypeOf(Galaxy)).call(this));

        _this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        _this.scene = new THREE.Scene();
        document.body.appendChild(_this.renderer.domElement);
        _this.renderer.setClearColor(0x2abced, 0);

        var winWidth = window.innerWidth;
        var winHeight = window.innerHeight;

        _this.renderer.setSize(winWidth, winHeight);

        _this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);

        _this.radius = 300;

        _this.planets = _planets2.default;

        _this._controls;

        _this.objects = {};

        _this.setup();
        _this.render();
        return _this;
    }

    _createClass(Galaxy, [{
        key: 'setup',
        value: function setup() {
            this.createBasic();
            this.setupPlanet();
            Object.keys(this.objects).forEach(function (o) {
                this.scene.add(this.objects[o]);
            }.bind(this));

            this._controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);
            this._controls.travel = true;
        }
    }, {
        key: 'createBasic',
        value: function createBasic() {
            var outCircleGeom = new THREE.TorusGeometry(this.radius, 0.3, 3, 100);

            var outMat = new THREE.MeshBasicMaterial({ 'color': '#35b4d9' });
            var outCircle = new THREE.Mesh(outCircleGeom, outMat);
            outCircle.rotation.x = Math.PI * 0.5;
            this.objects.outCircle = outCircle;

            var inCircleGeom = new THREE.TorusGeometry(300, 0.3, 3, 100);
            var inMat = new THREE.MeshBasicMaterial({ 'color': '#35b4d9' });
            var inCircle = new THREE.Mesh(inCircleGeom, inMat);
            inCircle.rotation.x = Math.PI * 0.5;
            this.objects.inCircle = inCircle;

            var cameraRotate = new THREE.Euler(0, 0, Math.PI * 0.3);
            this.camera.up.applyEuler(cameraRotate);

            this.camera.position.set(0, 200, 700);
            this.camera.lookAt(new THREE.Vector3());
        }
    }, {
        key: 'setupPlanet',
        value: function setupPlanet() {
            var _this2 = this;

            var snippetGroup = new THREE.Group();

            var planet = void 0;
            for (var key in _planets2.default) {
                planet = _planets2.default[key];
                planet.setup();
                planet.snippets.forEach(function (snippet, i) {
                    snippet.position.set(_this2.radius * Math.cos(planet.angle + i * 0.02), Math.random() * 40 - 20, _this2.radius * Math.sin(planet.angle + i * 0.02));
                    snippetGroup.add(snippet);
                });
            }
            this.objects.snippetGroup = snippetGroup;
        }
    }, {
        key: 'travel',
        value: function travel() {}
    }, {
        key: 'seePlanet',
        value: function seePlanet(planetname) {}
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            this.addTick(function () {
                _this3._controls.update();
                _this3.objects.snippetGroup.children.forEach(function (c) {
                    c.lookAt(_this3.camera.position);
                });
                _this3.renderer.render(_this3.scene, _this3.camera);
            });
        }
    }]);

    return Galaxy;
}(_time2.default);

exports.default = Galaxy;

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var resize = exports.resize = {
    body: document.body,
    mainElem: document.querySelector('.main'),
    init: function init() {
        var _this = this;

        this.resize();
        this.body.className = this.body.className.replace('hide', '');
        window.addEventListener('resize', function () {
            _this.resize();
        });
    },
    resize: function resize() {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var maxWidth = 500;
        var mainWidth = void 0;
        var scale = void 0;
        var transformStr = 'none';

        mainWidth = Math.min(windowWidth, windowHeight, maxWidth);

        scale = mainWidth / 500;

        if (scale !== 1) {
            transformStr = 'scale(' + scale + ')';
        }

        this.mainElem.style['transform'] = transformStr;
        this.mainElem.style['-webkit-transform'] = transformStr;
    }
};

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(35)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./index.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/index.js!./index.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _time = __webpack_require__(0);

var _time2 = _interopRequireDefault(_time);

var _snippets = __webpack_require__(14);

var _snippets2 = _interopRequireDefault(_snippets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Planet = function (_Time) {
    _inherits(Planet, _Time);

    function Planet(name, angle, snippetNames) {
        _classCallCheck(this, Planet);

        var _this = _possibleConstructorReturn(this, (Planet.__proto__ || Object.getPrototypeOf(Planet)).call(this));

        _this.name = name;
        _this.angle = angle;
        _this.snippetNames = snippetNames;
        _this.snippets;
        return _this;
    }

    _createClass(Planet, [{
        key: 'setup',
        value: function setup() {
            this.snippets = this.snippetNames.map(function (snippetName) {
                return _snippets2.default.create(snippetName).plane;
            });
        }
    }]);

    return Planet;
}(_time2.default);

var planetData = [{
    'name': 'name',
    'angle': 0,
    'snippets': ['name']
}, {
    'name': 'age',
    'angle': 0,
    'snippets': ['age', 'born']
}, {
    'name': 'gender',
    'angle': 0,
    'snippets': ['gender']
}, {
    'name': 'hobbies',
    'angle': 0,
    'snippets': ['guitar', 'shufa', 'pingpangqiu', 'yumaoqiu', 'sumiao']
}, {
    'name': 'works',
    'angle': 0,
    'snippets': ['meizu', 'tenda']
}, {
    'name': 'skills',
    'angle': 0,
    'snippets': ['html5', 'css3']
}];

var angleStep = Math.PI * 2 / planetData.length;
var planets = {};

for (var i = 0; i < planetData.length; i++) {
    planets[planetData[i].name] = new Planet(planetData[i].name, angleStep * i, planetData[i].snippets);
}
exports.default = planets;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Snippet = function () {
    function Snippet(snippetCfg) {
        _classCallCheck(this, Snippet);

        this.snippetCfg = snippetCfg;
        this.plane = this.createPlane();

        this.cvs = document.createElement('canvas');
        this.cvs.width = 256;
        this.cvs.height = 256;
        this.ctx = this.cvs.getContext('2d');

        this.snippetCfg = snippetCfg;
        this.createTexture();
    }

    _createClass(Snippet, [{
        key: 'createPlane',
        value: function createPlane() {
            var planeGeom = new THREE.PlaneGeometry(100, 100, 10, 10);
            var planeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

            planeMat.side = THREE.DoubleSide;
            planeMat.opacity = 1;
            planeMat.transparent = true;

            var plane = new THREE.Mesh(planeGeom, planeMat);

            plane.scale.multiplyScalar((this.snippetCfg.width || 100) / 100);

            return plane;
        }
    }, {
        key: 'createTexture',
        value: function createTexture() {}
    }]);

    return Snippet;
}();

var TextSnippet = function (_Snippet) {
    _inherits(TextSnippet, _Snippet);

    function TextSnippet() {
        _classCallCheck(this, TextSnippet);

        return _possibleConstructorReturn(this, (TextSnippet.__proto__ || Object.getPrototypeOf(TextSnippet)).apply(this, arguments));
    }

    _createClass(TextSnippet, [{
        key: 'createTexture',
        value: function createTexture() {
            var text = this.snippetCfg.text;
            var font = this.snippetCfg.font || '100px microsoft yahei';
            var pos = this.snippetCfg.pos || { x: 0, y: 100 };

            this.ctx.fillStyle = '#000';
            this.ctx.font = font;

            this.ctx.fillText(text, pos.x, pos.y);

            var texture = new THREE.CanvasTexture(this.cvs);
            this.plane.material.map = texture;
            this.plane.material.needsUpdate = true;
        }
    }]);

    return TextSnippet;
}(Snippet);

var ImgSnippet = function (_Snippet2) {
    _inherits(ImgSnippet, _Snippet2);

    function ImgSnippet() {
        _classCallCheck(this, ImgSnippet);

        return _possibleConstructorReturn(this, (ImgSnippet.__proto__ || Object.getPrototypeOf(ImgSnippet)).apply(this, arguments));
    }

    _createClass(ImgSnippet, [{
        key: 'createTexture',
        value: function createTexture() {
            var _this3 = this;

            var imgSrc = this.snippetCfg.imgSrc;
            var img = new Image();

            img.onload = function () {

                var radio = img.width / img.height;
                var drawWidth = _this3.cvs.width;
                var drawHeight = _this3.cvs.height;
                if (radio > 0) {
                    drawHeight = drawWidth / radio;
                } else {
                    drawWidth = drawHeight / radio;
                }

                _this3.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, drawWidth, drawHeight);
                var texture = new THREE.CanvasTexture(_this3.cvs);

                _this3.plane.material.map = texture;
                _this3.plane.material.needsUpdate = true;
            };

            img.src = imgSrc;
        }
    }]);

    return ImgSnippet;
}(Snippet);

var snippetCreator = {
    snippets: {
        'name': function name() {
            return new TextSnippet({
                text: 'Chaz',
                font: '70px microsoft yahei',
                pos: { x: 50, y: 150 }
            });
        },
        'age': function age() {
            return new TextSnippet({
                text: '25',
                font: '30px microsoft yahei'
            });
        },
        'born': function born() {
            return new TextSnippet({
                text: '1991.9',
                font: '30px microsoft yahei'
            });
        },

        'gender': function gender() {
            return new TextSnippet({
                text: '\uF222',
                font: "30px FontAwesome"
            });
        },

        'guitar': function guitar() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.guitar.src,
                width: 20
            });
        },
        'shufa': function shufa() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.shufa.src,
                width: 20
            });
        },
        'pingpangqiu': function pingpangqiu() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.pingpangqiu.src,
                width: 20
            });
        },
        'yumaoqiu': function yumaoqiu() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.yumaoqiu.src,
                width: 20
            });
        },
        'sumiao': function sumiao() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.sumiao.src,
                width: 20
            });
        },

        'meizu': function meizu() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.meizu.src,
                width: 20
            });
        },
        'tenda': function tenda() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.tenda.src,
                width: 20
            });
        },

        'html5': function html5() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.html5.src,
                width: 20
            });
        },
        'css3': function css3() {
            return new ImgSnippet({
                imgSrc: window.ZZC.ASSETS.snippets.css3.src,
                width: 20
            });
        }
    },

    create: function create(name) {
        return snippetCreator.snippets[name]();
    }
};

exports.default = snippetCreator;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)();
// imports


// module
exports.push([module.i, "/* RESET*/\nhtml,\nbody,\ndiv,\nul,\nol,\nli,\ndl,\ndt,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\npre,\nform,\np,\nblockquote,\nfieldset,\ninput,\nabbr,\narticle,\naside,\ncommand,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmark,\nmeter,\nnav,\noutput,\nprogress,\nsection,\nsummary,\ntime {\n  margin: 0;\n  padding: 0; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\npre,\ncode,\naddress,\ncaption,\ncite,\ncode,\nem,\nstrong,\nth,\nfigcaption {\n  font-size: 1em;\n  font-weight: normal;\n  font-style: normal; }\n\nfieldset,\niframe {\n  border: none; }\n\ncaption,\nth {\n  text-align: left; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\narticle,\naside,\nfooter,\nheader,\nhgroup,\nnav,\nsection,\nfigure,\nfigcaption {\n  display: block; }\n\n/* LAYOUT */\n* {\n  margin: 0;\n  padding: 0; }\n\nhtml,\nbody {\n  width: 100%;\n  height: 100%;\n  position: relative; }\n\nhtml {\n  background-color: #fff; }\n\n.clear {\n  clear: both; }\n\n.clearer {\n  clear: both;\n  display: block;\n  margin: 0;\n  padding: 0;\n  height: 0;\n  line-height: 1px;\n  font-size: 1px; }\n\n.selfclear {\n  zoom: 1; }\n\n.selfclear:after {\n  content: '.';\n  display: block;\n  height: 0;\n  clear: both;\n  visibility: hidden; }\n\nimg {\n  border: 0; }\n\na {\n  text-decoration: none;\n  color: #515151; }\n  a:focus {\n    outline: none; }\n\ni {\n  font-style: normal; }\n\nul,\nli {\n  list-style: none; }\n\nbody {\n  font-family: PingHei, 'PingFang SC', Helvetica Neue, 'Work Sans', 'Hiragino Sans GB', 'Microsoft YaHei', SimSun, sans-serif;\n  font-size: 14px;\n  color: #515151; }\n\n.clearfix:after,\n.clearfix:before {\n  content: \"\";\n  display: table;\n  height: 0px;\n  clear: both;\n  visibility: hidden; }\n\n.clearfix {\n  *zoom: 1; }\n\n.fl {\n  float: left; }\n\n.fr {\n  float: right; }\n\n.br0 {\n  border: none; }\n\ncanvas {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: -1;\n  pointer-events: none; }\n\n.main {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 400px;\n  height: 400px;\n  margin-top: -200px;\n  margin-left: -200px; }\n\n.main > .animate {\n  transition: opacity 1.5s; }\n\n.invisible {\n  position: relative;\n  opacity: 0;\n  z-index: -1; }\n\n.greeting h1 {\n  position: absolute;\n  top: 113px;\n  left: 40px;\n  font-size: 42px; }\n\n.greeting .ipt {\n  position: absolute;\n  top: 182px;\n  left: 45px;\n  box-sizing: border-box;\n  padding-left: 10px;\n  width: 140px;\n  height: 34px;\n  background: #fff;\n  border: 1px solid #c7c7c7;\n  font-size: 16px;\n  line-height: 34px; }\n  .greeting .ipt:focus {\n    outline: none; }\n\n.greeting .btn {\n  display: inline-block;\n  position: absolute;\n  top: 182px;\n  left: 200px;\n  width: 40px;\n  height: 34px;\n  background: #42e3e5 url(" + __webpack_require__(17) + ") center no-repeat;\n  cursor: pointer; }\n\n.greeting .g-icons {\n  position: absolute;\n  top: 242px;\n  left: 45px; }\n  .greeting .g-icons a {\n    margin-right: 5px; }\n\n.greeting .icon {\n  display: inline-block;\n  vertical-align: middle;\n  height: 16px;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: auto 100%; }\n  .greeting .icon.i-github {\n    width: 16px;\n    background-image: url(" + __webpack_require__(20) + "); }\n  .greeting .icon.i-codepen {\n    width: 94px;\n    background-image: url(" + __webpack_require__(19) + ");\n    background-size: auto 100%; }\n  .greeting .icon.i-blog {\n    width: 30px;\n    background-image: url(" + __webpack_require__(18) + "); }\n\n.about {\n  position: absolute;\n  top: 50%;\n  left: 0;\n  width: 100%;\n  margin-top: -140px; }\n  .about .back-btn {\n    position: absolute;\n    left: 50%;\n    bottom: -40px;\n    transform: translateX(-50%);\n    cursor: pointer;\n    font-size: 24px;\n    color: #35b4d9; }\n  .about .corner {\n    position: absolute; }\n    .about .corner:before, .about .corner:after {\n      position: absolute;\n      display: block;\n      content: '';\n      background: #35b4d9; }\n    .about .corner:before {\n      height: 1px;\n      width: 100px; }\n    .about .corner:after {\n      width: 1px;\n      height: 100px; }\n  .about .corner-1 {\n    left: 0;\n    top: 0; }\n    .about .corner-1:before, .about .corner-1:after {\n      left: 0;\n      top: 0; }\n  .about .corner-2 {\n    right: 0;\n    bottom: 0; }\n    .about .corner-2:before, .about .corner-2:after {\n      right: 0;\n      bottom: 0; }\n  .about .a-list {\n    width: 375px;\n    margin: 20px;\n    font-size: 18px;\n    line-height: 2;\n    *zoom: 1; }\n    .about .a-list:after, .about .a-list:before {\n      content: \"\";\n      display: table;\n      height: 0px;\n      clear: both;\n      visibility: hidden; }\n  .about .a-item {\n    float: left;\n    position: relative;\n    width: 110px;\n    height: 110px;\n    margin: 5px;\n    perspective: 800px;\n    transform-origin: left top; }\n    .about .a-item:nth-child(1) {\n      transition: transform 0.8s 0.05s; }\n    .about .a-item:nth-child(2) {\n      transition: transform 0.8s 0.1s; }\n    .about .a-item:nth-child(3) {\n      transition: transform 0.8s 0.15s; }\n    .about .a-item:nth-child(4) {\n      transition: transform 0.8s 0.2s; }\n    .about .a-item:nth-child(5) {\n      transition: transform 0.8s 0.25s; }\n    .about .a-item:nth-child(6) {\n      transition: transform 0.8s 0.3s; }\n    .about .a-item .a-item-box {\n      position: relative;\n      width: 100%;\n      height: 100%;\n      transition: transform 0.2s; }\n    .about .a-item .a-item-con {\n      transform-style: preserve-3d;\n      position: relative;\n      width: 100%;\n      height: 100%;\n      background: #79e0f6;\n      text-align: center;\n      color: #fff;\n      transition: all 0.7s 0.1s; }\n    .about .a-item .a-wrap {\n      display: table;\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      backface-visibility: hidden; }\n    .about .a-item .a-con {\n      display: table-cell;\n      vertical-align: middle;\n      width: 100%;\n      height: 100%; }\n  .about .a-desc {\n    transform: rotateX(180deg); }\n  .about .a-item.hover .a-item-con, .about .a-item:hover .a-item-con {\n    transform: rotateX(180deg); }\n  .about .a-item:nth-child(1) .a-item-con {\n    background: #79e0f6; }\n  .about .a-item:nth-child(2) .a-item-con {\n    background: #3eccea; }\n  .about .a-item:nth-child(3) .a-item-con {\n    background: #79eff6; }\n  .about .a-item:nth-child(4) .a-item-con {\n    background: #65bcff; }\n  .about .a-item:nth-child(5) .a-item-con {\n    background: #45e0f7; }\n  .about .a-item:nth-child(6) .a-item-con {\n    background: #45c7f7; }\n", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/enter.png";

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/i-blog.png";

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/i-codepen.svg";

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/i-github.png";

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/snippets/css3.png";

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/snippets/guitar.png";

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/snippets/html5.png";

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/snippets/lanqiu.png";

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/snippets/meizu.png";

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/snippets/pingpangqiu.png";

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/snippets/shufa.png";

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/snippets/sumiao.png";

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/snippets/tenda.png";

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/snippets/yumaoqiu.png";

/***/ }),
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(12);

var _resize = __webpack_require__(7);

var _galaxy = __webpack_require__(5);

var _galaxy2 = _interopRequireDefault(_galaxy);

var _assets = __webpack_require__(3);

var _assets2 = _interopRequireDefault(_assets);

var _loader = __webpack_require__(4);

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var assetsLoader = new _loader2.default();

assetsLoader.load(_assets2.default, function (p) {
    console.log(p);
}).then(function (assets) {
    var script = document.createElement('script');
    script.src = assets.presetjs.src;
    document.body.appendChild(script);
    script.onload = init;

    window.ZZC = {};
    window.ZZC.ASSETS = assets;
    console.log(_assets2.default, assets);
});

function init() {

    TIME.start();

    var galaxy = new _galaxy2.default();
    galaxy.travel();

    (function () {
        var $greeting = $('.greeting');
        var $about = $('.about');

        var $enterBtn = $('.enter-btn');
        var $backBtn = $('.back-btn');
        var $aItems = $('.a-item');

        var animateData = {};

        function init() {
            resize();
            hideAbout();
            $greeting.addClass('animate');
            $about.addClass('animate');
            $enterBtn.on('click', function () {
                showAbout();
            });
            $backBtn.on('click', function () {
                hideAbout();
            });
        }

        function showAbout() {
            $greeting.addClass('invisible');
            $about.removeClass('invisible');
            escapeFromEnter();
        }

        function hideAbout() {
            $about.addClass('invisible');
            $greeting.removeClass('invisible');
            hideIntoEnter();
        }

        function resize() {
            setAnimateData();
        }

        function setAnimateData() {
            var enterPos = $enterBtn[0].getBoundingClientRect();
            var enterWidth = $enterBtn.outerWidth();
            var enterHeight = $enterBtn.outerHeight();

            $aItems.each(function () {
                var $elem = $(this);
                var animateId = Math.random() + '';
                var elemPos = $elem[0].getBoundingClientRect();
                var elemWidth = $elem.outerWidth();
                var elemHeight = $elem.outerHeight();

                var translateX = enterPos.left - elemPos.left;
                var translateY = enterPos.top - elemPos.top;

                var scaleX = enterWidth / elemWidth;
                var scaleY = enterHeight / elemHeight;

                $(this).data('animate-id', animateId);
                animateData[animateId] = {
                    'transform': 'translate(' + translateX + 'px, ' + translateY + 'px) scale(' + scaleX + ', ' + scaleY + ') rotateX(' + (Math.random() * 360 - 180) + 'deg)'
                };
            });
        }

        function hideIntoEnter() {
            $aItems.each(function () {
                var $elem = $(this);
                var animateId = $elem.data('animate-id');
                var animateAttrs = animateData[animateId];

                for (var key in animateAttrs) {
                    $elem.css(key, animateAttrs[key]);
                }
            });
        }

        function escapeFromEnter() {
            $aItems.css({
                'transform': 'none'
            });
        }

        init();
    })();

    var HoverRotate = function () {
        function HoverRotate(elem) {
            _classCallCheck(this, HoverRotate);

            this.maxRotate = 50;
            this.$elem = $(elem);
            this.$effectElem = this.$elem.find('.a-item-box');
            this.init();
            this.resize();
        }

        _createClass(HoverRotate, [{
            key: 'init',
            value: function init() {
                var _this = this;

                $(window).on('resize', this.resize.bind(this));
                this.$elem.hover(function () {
                    _this.$elem.on('mousemove', _this.mousemove.bind(_this));
                }, function () {
                    _this.$elem.off('mousemove');
                    _this.reset();
                });
            }
        }, {
            key: 'resize',
            value: function resize() {
                this.width = this.$elem.width();
                this.height = this.$elem.height();
                this.center = {
                    x: this.width / 2,
                    y: this.height / 2
                };
            }
        }, {
            key: 'reset',
            value: function reset() {
                this.$effectElem.css({
                    'transform': 'rotate3d(0,0,0,0)'
                });
            }
        }, {
            key: 'mousemove',
            value: function mousemove(e) {
                var pos = this.$elem[0].getBoundingClientRect();
                var mouseRelativeX = e.clientX - pos.left;
                var mouseRelativeY = e.clientY - pos.top;

                var rotateX = (mouseRelativeX - this.center.x) / this.width;
                var rotateY = (mouseRelativeY - this.center.y) / this.height;

                if (rotateX * rotateY >= 0) {
                    rotateX *= -1;
                } else {
                    rotateY *= -1;
                }

                var rotateAngle = (Math.abs(rotateX) + Math.abs(rotateY)) * this.maxRotate + 'deg';

                this.$effectElem.css({
                    'transform': 'rotate3d(' + rotateX + ', ' + rotateY + ', 0, ' + rotateAngle + ')'
                });
            }
        }]);

        return HoverRotate;
    }();

    $.fn.hoverRotate = function ($) {
        this.each(function () {
            new HoverRotate(this);
        });

        return this;
    };

    $('.a-item').hoverRotate();

    _resize.resize.init();
}

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map