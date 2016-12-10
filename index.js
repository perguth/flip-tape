const methods = require('./methods.json')

module.exports = (tape, executeFunctions) => (opt1, opt2, cb) => {
  cb = cb || opt2 || opt1 // `opt1` and/or `opt2` could be missing

  tape(opt1, opt2, t => {
    methods.forEach(name => attachMethod(t, name, executeFunctions))
    cb(t) // hand t over to the actual test
  })
}

function attachMethod (t, name, executeFunctions) {
  var tryToExecute = noop => noop
  if (executeFunctions) tryToExecute = (t, arg) => (typeof arg === 'function') ? arg(t) : arg

  String.prototype[name] = function (arg1, arg2) { // eslint-disable-line
    var arity = arguments.length
    if (arity === 2) {
      arg2 = tryToExecute(t, arg2)
      t[name](arg1, arg2, this)
      return
    }
    if (arity === 1) {
      arg1 = tryToExecute(t, arg1)
      t[name](arg1, this)
      return
    }
    t[name](this)
  }
}
