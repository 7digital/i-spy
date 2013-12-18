i-spy
=====

A super simple spying library that mimics the jasmine spy API for use with
other frameworks.  Doesn't force you into the stub / mock / fake choice like
sinon.js.

Wrapped in the UMD node adaptor for use from requirejs or nodejs.

Installation (nodejs)
---------------------

```bash
  npm install i-spy
```

Usage
-----

```javascript
   var iSpy = require('i-spy');
   var spy = iSpy.createSpy(function fake() {
     // do stuff
     return 'foo';
   });

   describe('frobnicator', function () {

      it('frobnicates', function () {
         frob.fronicate(spy);
         assert(spyWasCalled());
         assert(spy.calls.length === 1);
         assert(spy.calls[0].length, 2);
      });

   });
```

See the tests for more complete usage examples.
