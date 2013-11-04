
describe('idb-request', function(){

  var request = require('idb-request')
    , assert = require('assert');

  var db = window.indexedDB
    || window.webkitIndexedDB
    || window.mozIndexedDB
    || window.msIndexedDB;

  before(function(done){
    var req = db.open('baz', 2);
    req.onerror = function(e){ done(e.error); }
    req.onsuccess = done.bind(null, null);
  })

  it('should invoke fn(err) when error happens', function(done){
    var req = db.open('baz', 1);
    request(req, function(err){
      assert(err);
      assert(err.stack);
      assert('Error' == err.constructor.name);
      assert('Event' == err.e.constructor.name);
      assert('DOMError' == err.error.constructor.name);
      assert(err.message == err.error.message);
      done();
    })
  })

  it('should invoke fn(null, e) on success', function(done){
    var req = db.open('baz', 2);
    request(req, function(err, e){
      assert(null == err);
      assert(e);
      done();
    })
  })

});
