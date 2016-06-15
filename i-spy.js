'use strict';

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

	spy.calls = [];

	spy.reset = function reset() {
		spy.calls = [];
	};

	// Checkers
	spy.callCount = function callCount() {
		return spy.calls.length;
	}

	spy.wasCalled = function wasCalled() {
		return spy.calls.length > 0;
	};

	spy.wasNotCalled = function wasNotCalled() {
		return spy.calls.length === 0;
	};

	spy.firstCall = function firstCall() {
		return spy.calls[0];
	};

	spy.lastCall = function lastCall() {
		return spy.calls[spy.calls.length - 1];
	};

	// Fluent interface
	spy.thatThrows = function thatThrows(err) {
		fake = thrower(err);
		return spy;
	};

	spy.thatReturns = function thatReturns(err) {
		fake = returner(err);
		return spy;
	};

	spy.thatCalls = function thatCalls(fn) {
		fake = fn;
		return spy;
	};

	return spy;
}

module.exports = {
	createSpy: createSpy
};
