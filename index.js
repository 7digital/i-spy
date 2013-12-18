/* jshint ignore:start */
if (typeof module === 'object' && typeof define !== 'function') {
	var define = function (factory) {
		module.exports = factory(require, exports, module);
	};
}
/* jshint ignore:end */

define(function (require, exports, module) {

	function createSpy(fn) {
		var fake = fn;

		if (fake !== void 0 && typeof(fn) !== 'function') {
			fake = function () { return fn; }
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
		spy.wasCalled = function wasCalled() {
			return spy.calls.length > 0;
		};
		spy.wasNotCalled = function wasNotCalled() {
			return spy.calls.length === 0;
		};
		spy.thatThrows = function thatThrows(err) {
			fake = function () { throw err; };
			return spy;
		};

		return spy;
	}

	return {
		createSpy: createSpy
	};
});
