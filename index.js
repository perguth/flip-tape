var tape = require('tape')
const methods = require('./methods.json')

module.exports = (arg0, arg1, cb) => {
  if (global.flipTape.tapeMock) tape = global.flipTape.tapeMock // for testing
  cb = cb || arg1 || arg0

  String.prototype.test = function (arg1, cb) { // eslint-disable-line
    return tape(this, arg1, cb)
  }

  tape(arg0, arg1, testObject => {
    String.prototype.t = customCb => customCb(testObject) // eslint-disable-line
    methods.forEach(name => attachMethod(name, testObject))
    cb(testObject)
  })
}

function attachMethod (name, testObject) {
  String.prototype[name] = function (arg0, arg1) { // eslint-disable-line
    var arity = arguments.length
    if (arity === 2) {
      return testObject[name](arg0, arg1, this)
    }
    if (arity === 1) {
      return testObject[name](arg0, this)
    }
    return testObject[name](this)
  }
}
