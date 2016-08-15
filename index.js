module.exports = function(obj, log) {
  log = log || console.log.bind(console);

  for (var key in obj) {
    if (typeof obj[key] === 'function') {
      wrap(obj, key, log);
    }
  }
};

function wrap(obj, key, log) {
  var orig = obj[key];
  obj[key] = function() {
    var args = [].slice.call(arguments);
    log('> ' + key + '(' + args.map(pretty).join(', ') + ')');
    var result = orig.apply(this, arguments);
    log('< ' + pretty(result) + '\n');
    return result;
  };
}

function pretty(obj) {
  var serialized;
  try {
    serialized = JSON.stringify(obj, null, 2);
  } catch(e) {
    serialized = '<object>';
  }
  return serialized;
}
