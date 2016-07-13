i-spy
=====

[![Build Status](https://travis-ci.org/7digital/i-spy.png?branch=master)](http://travis-ci.org/7digital/i-spy)

A super simple spying library that mimics the jasmine spy API for use with
other frameworks.  Doesn't force you into the stub / mock / fake choice like
sinon.js.

Installation (nodejs)
---------------------

```bash
  npm install i-spy
```
Api
-----
`createSpy()`
-----

Returns a function spy, optionally takes a function that will be executed when the spy is called.

```
var iSpy = require('i-spy');
var spy = iSpy.createSpy();
var spyWithAction(function () {
  console.log('hi');
});

spy();
spyWithAction(); //-> hi

```

`spy.calls`
-----

A 2 dimentional array of all the recorded calls to the spy.

```javascript
var spy = iSpy.createSpy();

spy('hello', 'world');
spy({foo: 'bar'});

spy.calls[0][0] // -> 'hello'
spy.calls[0][1] // -> 'world'
spy.calls[1][0] // -> '{foo: 'bar'}'
```

`spy.wasCalled()`
-----
Returns a boolean that determines whether a spy has been called

```javascript
var spy = iSpy.createSpy();

spy.wasCalled(); // -> false

spy('anything');
spy.wasCalled(); // -> true
```

`spy.reset()`
-----
Clears any recorded calls on the spy

```javascript
var spy = iSpy.createSpy();

spy(1);
spy.calls.length; // -> 1

spy.reset();

spy.calls.length; // -> 0
```



Usage
-----

Simple usage:

```javascript
   var iSpy = require('i-spy');
   var spy = iSpy.createSpy(function fake() {
     // do stuff
     return 'foo';
   });

   describe('frobnicator', function () {

      it('frobnicates', function () {
         frob.fronicate(spy);
         assert(spy.wasCalled());
         assert(spy.calls.length === 1);
         assert(spy.calls[0].length, 2);
      });

   });
```

Asynchronous tests:

```javascript
   var iSpy = require('i-spy');

   describe('frobnicator', function () {

      it('frobnicates', function (done) {
        var spy = iSpy.createSpy(function fake(err, frobs) {
          // do stuff with frobs
          done(err);
        });

        frob.fronicate(spy);

        assert(spy.wasCalled());
        assert(spy.calls.length === 1);
        assert(spy.calls[0].length, 2);
        // Assert on err and frobs which are available through spy.calls
      });

   });
```

Spy behaviour can also be controlled via a fluent interface:

```javascript
   var iSpy = require('i-spy');

   var erroringSpy = iSpy.createSpy().thatThrows(new Error('Oops'));

   var returningSpy = iSpy.createSpy().thatReturns('Woohoo');

   var callThroughSpy = iSpy.createSpy().thatCalls(function () {
       // Do some stuff
   });
```
