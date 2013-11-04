
# idb-request

  Tiny IDBRequest wrapper that allows node style callbacks

## Installation

  Install with [component(1)](http://component.io):

    $ component install yields/idb-request

## Example

```js
var request = require('request');
var db = window.indexedDB;

var req = db.open('baz', 2);
request(req, function(err, e){
  var db = e.target.result;
  req = db.open('baz', 1);

  request(req, function(err, e){
    assert(err);
    assert(err.stack);
    assert('Error' == err.constructor.name);
    assert('Event' == err.e.constructor.name);
    assert('DOMError' == err.error.constructor.name);
    assert(err.message == err.error.message);
    log(err.message); // => "The requested version (1) is less than the existing version (2)."
  });
});
```

## License

  MIT
