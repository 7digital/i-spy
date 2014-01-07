var iSpy = require('../index');
var assert = require('chai').assert;

describe('spy', function () {

	describe('recording calls', function () {
		var spy;

		beforeEach(function () {
			spy = iSpy.createSpy();
		});

		it('returns a function that records its calls', function () {
			spy();

			assert(spy.wasCalled(), 'expected to wasCalled to be true');
			assert.lengthOf(spy.calls, 1, 'expected one call');
		});

		it('knows if it wasn\'t called', function () {
			assert(spy.wasNotCalled(), 'expected wasNotCalled to be true');
		});

		it('records multiple calls', function () {
			spy('first');
			spy('second', 'something');

			assert.lengthOf(spy.calls, 2, 'expected 2 calls');
			assert.lengthOf(spy.calls[0], 1, 'expected first call to have one arg');
			assert.lengthOf(spy.calls[1], 2, 'expected 2nd call to have 2 args');
		});

		it('records arguments', function () {
			spy('one', 'two', 'three');

			assert.lengthOf(spy.calls, 1, 'expected one call');
			assert.lengthOf(spy.calls[0], 3, 'expected call to have no args');
			assert.equal(spy.calls[0][0], 'one', 'expected first arg to equal "one"');
			assert.equal(spy.calls[0][1], 'two', 'expected 2nd arg to equal "two"');
			assert.equal(spy.calls[0][2], 'three', 'expected 3rd arg to equal "three"');
		});

		it('can be reset', function () {
			spy();
			assert.lengthOf(spy.calls, 1, 'expected one call');

			spy.reset();
			assert.lengthOf(spy.calls, 0, 'expected no calls after reset');
			assert(spy.wasNotCalled(), 'expected no calls after reset');
		});
	});

	describe('fake behaviour', function () {

		it('calls the fake function', function () {
			var wasCalled = false;
			var spy = iSpy.createSpy(function () {
				wasCalled = true;
			});
			spy();
			assert(wasCalled, 'expected the fake to be called');

		});

		it('sets the context on the fake', function () {
			var expectedContext = { ctx: 'fake' };
			var actualContext = false;
			var spy = iSpy.createSpy(function () {
				actualContext = this;
			});
			spy.bind(expectedContext)();
			assert.equal(actualContext, expectedContext,
						 'expected the fake context to be set');
		});

		it('returns the value returned by the fake', function () {
			var spy = iSpy.createSpy(function () {
				return 42;
			});
			var returnValue = spy();
			assert.equal(returnValue, 42);
		});

		it('returns the object supplied', function () {
			var spy = iSpy.createSpy('foo');

			assert.equal(spy('foo'), 'foo', 'expected same return value');
		})

		it('throws the error supplied', function () {
			var err = new Error('Oh noes');
			var spy = iSpy.createSpy(err);

			assert.throws(function () {
				spy('foo')
			},Error, 'Oh noes', 'expected same error');
		})

	});

	describe('fluent api', function () {

		it('calls the fake suppplied by the fluent call', function () {
			var spy = iSpy.createSpy(666).thatCalls(function () {
				return 42;
			});

			var returnValue = spy();
			assert.equal(returnValue, 42);
		});

		it('returns the object supplied', function () {
			var spy = iSpy.createSpy().thatReturns('foo');

			assert.equal(spy('foo'), 'foo', 'expected same return value');
		})

		it('throws the given error', function () {
			var expectedErr = new Error('Oh noes');
			var spy = iSpy.createSpy().thatThrows(expectedErr);

			assert.throws(function () {
				spy('foo')
			},Error, 'Oh noes', 'expected same error');
		});

	});


});
