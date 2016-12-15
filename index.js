const methods = require('./methods.json')

module.exports = tape => (arg0, arg1, cb) => {
  cb = cb || arg1 || arg0 // `arg0` and `arg1` are optional in `tape`

  tape(arg0, arg1, testObject => {
    String.prototype.test = testCb => testCb(testObject) // eslint-disable-line
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
