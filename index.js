const methods = require('./methods.json')

module.exports = (tape, executeFunctions) => (opt1, opt2, cb) => {
  cb = cb || opt2 || opt1 // `opt1` and/or `opt2` could be missing

  tape(opt1, opt2, t => {
    methods.forEach(name => attachMethod(name, executeFunctions, t))
    cb(t) // hand t over to the actual test
  })
}

function attachMethod (name, executeFunctions, t) {
  var tryToExecute = noop => noop
  if (executeFunctions) tryToExecute = (t, arg) => (typeof arg === 'function') ? arg(t) : arg

  String.prototype[name] = function (arg0, arg1) { // eslint-disable-line
    var arity = arguments.length
    if (arity === 2) {
      arg1 = tryToExecute(arg1, t)
      return t[name](arg0, arg1, this)
    }
    if (arity === 1) {
      arg0 = tryToExecute(arg0, t)
      return t[name](arg0, this)
    }
    return t[name](this)
  }
}
