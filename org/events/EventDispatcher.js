/**
 * Created by marco on 19/12/2014.
 */



(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory;
	} else {
		// Browser globals (root is window)
		root.EventDispatcher = factory;
	}
}(this, function () {
	function EventDispatcher() {
		this._currentListeners = {};
	}

	EventDispatcher.prototype = {
		/**
		 *
		 * @param type
		 * @param callback
		 * @param scope
		 * @returns {*}
		 */
		addEventListener: function (type, callback, scope) {
			var listener = {
				type: type,
				callback: callback,
				scope: scope
			};
			if (!this._currentListeners[type]) {
				this._currentListeners[type] = [];
			}
			this._currentListeners[type].push(listener);
			return listener;
		},
		/**
		 *
		 * @param eventName
		 * @param callback
		 * @param scope
		 */
		removeEventListener: function (eventName, callback, scope) {
			var listeners = this._currentListeners[eventName] || [];
			this._currentListeners[eventName] = listeners.filter(function (listener) {
				var sameCB = listener.callback == callback;
				var sameScope = listener.scope == scope;
				return !(sameCB && sameScope);
			});
		},
		removeAllEventListeners: function (eventName) {
			// var listeners = this._currentListeners[eventName] || [];
			this._currentListeners[eventName] = null;
		},
		/**
		 *
		 * @param eventName
		 * @returns {*}
		 */
		hasEventListener: function (eventName) {
			return this._currentListeners[eventName] && this._currentListeners[eventName].length
		},
		/**
		 *
		 * @param type
		 * @param data
		 */
		dispatchEvent: function (type, data) {
			var listeners = this._currentListeners[type] || [];
			var length = listeners.length, l, c, s;
			for (var i = 0; i < length; i++) {
				l = listeners[i];
				c = l.callback;
				s = l.scope;
				c.call(s, data);
			}
		}
	};
	var ____instance;
	EventDispatcher.getInstance = function () {
		"use strict";
		if (!____instance) {
			____instance = new EventDispatcher();
		}
		return ____instance;
	};
	return EventDispatcher;
}));
