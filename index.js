const methods = require('./methods.json')
var test = require('tape')

module.exports = flipTape

if (global.flipTape && global.flipTape.tapeMock) {
  test = global.flipTape.tapeMock // for testing
}

String.prototype.test = function (arg1, cb) { // eslint-disable-line
  var msg = this.toString()
  return flipTape(msg, arg1, cb, null, null, test)
}

String.prototype.only = function (arg1, cb) { // eslint-disable-line
  var msg = this.toString()
  return flipTape(msg, arg1, cb, null, null, test.only)
}

function flipTape (arg0, arg1, cb, _, __, tape) {
  // arg0, arg1 are optional
  if (!tape) tape = test
  cb = cb || arg1 || arg0
  return tape(arg0, arg1, testObject => {
    String.prototype.t = function (customCb) { // eslint-disable-line
      var msg = this.toString()
      testObject.comment(msg)
      customCb(testObject)
    }
    methods.forEach(name => attachMethod(name, testObject))
    return cb(testObject)
  })
}

function attachMethod (name, testObject) {
  String.prototype[name] = function (arg0, arg1) { // eslint-disable-line
    var arity = arguments.length
    var msg = this.toString()
    if (arity === 2) {
      return testObject[name](arg0, arg1, msg)
    }
    if (arity === 1) {
      return testObject[name](arg0, msg)
    }
    return testObject[name](msg)
  }
}
