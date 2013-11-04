
/**
 * Export `request`
 */

module.exports = request;

/**
 * Invoke the given `fn(err, e)`.
 *
 * @param {IDBRequest} req
 * @param {Function} fn
 * @api public
 */

function request(req, fn){
  req.onerror = done;
  req.onsuccess = done;

  function done(e){
    return 'error' == e.type
      ? fn(error(e))
      : fn(null, e);
  }
}

/**
 * Wrap `DOMError`, `DOMException`.
 *
 * @param {DOMError|DOMException} e
 * @return {Error}
 * @api private
 */

function error(e){
  var error = e.target.error;
  var err = new Error(error.message);
  err.error = error;
  err.e = e;
  return err;
}
