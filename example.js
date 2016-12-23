var test = require('.')

/*
'`tape.only`'.only(t => {
  t.plan(1)
  t.pass()
})
*/

test('regular syntax', t => {
  t.plan(1)
  t.pass()
})

'Flipped `.test` syntax'.test(t => {
  t.plan(1)
  t.pass()
})

'`.t` callback'.test(t => {
  t.plan(1)
  'Comment callback'.t(t => {
    t.pass()
  })
})

'All combined'.test(t => {
  t.plan(4)
  'Flipped Pass'.pass()

  'Comment'.t(t => {
    'Flipped pass within comment'.pass()
    t.pass('Regular `.pass`')
  })
  t.pass('Just a `.pass`')
})
