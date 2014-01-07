/* jshint ignore:start */
if (typeof module === 'object' && typeof define !== 'function') {
	var define = function (factory) {
		module.exports = factory(require, exports, module);
	};
}
/* jshint ignore:end */

define(function (require, exports, module) {

	function thrower(err) {
		return function () { throw err; }
	}

	function returner(obj) {
		return function () { return obj; }
	}

	function createSpy(fn) {
		var fake = fn;

		if (fake !== void 0 && typeof(fn) !== 'function') {
			if (fn instanceof Error) {
				fake = thrower(fn);
			} else {
				fake = returner(fn);
			}
		}

		function spy() {
			var spyArgs = [].slice.call(arguments);
			spy.calls.push(spyArgs);
			spy.context = this;
			return fake && fake.apply(spy.context, spyArgs);
		}

		// Checkers
		spy.calls = [];

		spy.reset = function reset() {
			spy.calls = [];
		};

		spy.wasCalled = function wasCalled() {
			return spy.calls.length > 0;
		};

		spy.wasNotCalled = function wasNotCalled() {
			return spy.calls.length === 0;
		};


		// Fluent interface
		spy.thatThrows = function thatThrows(err) {
			fake = thrower(err);
			return spy;
		};

		spy.thatReturns = function thatThrows(err) {
			fake = returner(err);
			return spy;
		};

		spy.thatCalls = function thatCalls(fn) {
			fake = fn;
			return spy;
		};

		return spy;
	}

	return {
		createSpy: createSpy
	};
});
