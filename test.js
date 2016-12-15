const tape = require('tape')
const flip = require('.')
const wrappedMethods = require('./methods')

const arityToMethod = {
  1: ['fail', 'pass', 'skip'],
  2: ['ok', 'notOk', 'error'],
  3: ['equal', 'notEqual', 'deepEqual', 'notDeepEqual', 'deepLooseEqual', 'notDeepLooseEqual', 'throws', 'doesNotThrow', 'comment']
}

const tapeMock = (opt0, opt1, t) => t(testObjectMock)
const testObjectMock = { end: function () {} }
wrappedMethods.forEach(elem => {
  testObjectMock[elem] = function () { return arguments }
})

flip(tapeMock)(function () {
  tape('execute callback', t => {
    t.plan(1)
    let res = null
    let cbMock = (t) => { res = t }
    'msg'.test(cbMock)
    t.equal(res, testObjectMock, 'test object is passed on to cb')
  })
  Object.keys(arityToMethod).forEach(arity => {
    arity = +arity
    arityToMethod[arity].forEach(method => {
      let args = callMethod(method, arity)

      tape(method, t => {
        t.equal(args.length, arity, 'the correct amount of arguments are used')

        if (arity === 3) {
          t.equal(args[1].toString(), 'arg1', 'second argument is passed on correctly')
        }

        if ([2, 3].includes(arity)) {
          t.equal(args[0].toString(), 'arg0', 'first argument is passed on correctly')
        }

        t.equal(args[arity - 1].toString(), 'msg', 'message argument is passed on correctly')

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
