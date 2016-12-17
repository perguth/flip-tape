const tape = require('tape')
const wrappedMethods = require('./methods')

let tapeMock = (arg0, arg1, cb) => {
  cb = cb || arg1 || arg0 // `arg0` and `arg1` are optional in `tape`
  let res = cb(testObjectMock)
  return [arg0, arg1, res]
}
let testObjectMock = { end: function () {} }
wrappedMethods.forEach(elem => {
  testObjectMock[elem] = function () { return arguments }
})
global.flipTape = { tapeMock }
let flippedTape = require('.')

tape('`String.prototype.test(cb)`', t => {
  t.plan(2)
  let cbMock = tapeObject => tapeObject
  let testOpts = {test: 123}

  t.equal(typeof ''.test, 'function', '`.test` function is attached to `String.prototype` before the first call to `flip-tape`')

  let result = 'msg'.test(testOpts, cbMock)
  t.deepEqual(result, tapeMock('msg', testOpts, cbMock), 'arguments are passed on')
})

flippedTape(x => {
  var arityToMethod = {
    1: ['fail', 'pass', 'skip'],
    2: ['ok', 'notOk', 'error'],
    3: ['equal', 'notEqual', 'deepEqual', 'notDeepEqual', 'deepLooseEqual', 'notDeepLooseEqual', 'throws', 'doesNotThrow', 'comment']
  }

  tape('`String.prototype.t(cb)`', t => {
    t.plan(2)

    t.equal(typeof ''.t, 'function', '`.t` function is attached to `String.prototype`')

    let cbArgument = null
    let cbMock = t => { cbArgument = t }
    'msg'.t(cbMock)
    t.deepEqual(cbArgument, testObjectMock, 'test object is passed on to cb')
  })

  Object.keys(arityToMethod).forEach(arity => {
    arity = +arity
    arityToMethod[arity].forEach(method => {
      let args = callMethod(method, arity)

      tape('`String.prototype.' + method + '()`', t => {
        if (arity === 3) {
          t.equal(args[1].toString(), 'arg1', 'second argument is passed on')
        }

        if ([2, 3].includes(arity)) {
          t.equal(args[0].toString(), 'arg0', 'first argument is passed on')
        }

        t.equal(args[arity - 1].toString(), 'msg', 'message argument is passed on')

        t.end()
      })
    })
  })
})

function callMethod (method, arity) {
  if (arity === 3) return 'msg'[method]('arg0', 'arg1')
  if (arity === 2) return 'msg'[method]('arg0')
  return 'msg'[method]()
}
