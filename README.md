# flip-tape

> Write [`tape`](https://github.com/substack/tape)-tests starting with the message string: `'Two is less than three'.ok(2 < 3)`

Adds `'Two is less than three'.ok(2 < 3)` syntax to tape plus two further callback-executing methods. Original functionality is kept.

```bash
npm install flip-tape
```

![flipped tape machine](vendor/flipped-tape.png)

## Usage

```js
var test = require('flip-tape')

test('Regular tape assertion group', t => {
  t.plan(4)
  t.ok(2 < 3, 'Regular tape syntax works as expected.')

  // This is new:
  'Two is less than three'.ok(2 < 3)
  'Five equals five'.equals(5, 5)

  'But there is a callback too'.t(t => {
    t.notOk(2 > 3)
  })
})

'You can also start a group of assertions that way'.test(t => {
  t.plan(1)
  t.pass()
})
```

All of [tapes methods](https://github.com/substack/tape#methods) that print out `msg` to the command-line are usable with the flipped syntax.

## API

#### `var test = require('flip-tape')`

Attaches all tape-methods that print out to the command-line plus the `.t()` and `.test()` methods to the String prototype.

#### `'[message]'.test([opt], cb)`

Calls `tape` like this: `tape([message], [opt], cb)`.

#### `'[message]'.t(cb)`

`cb(t)` gets called with the [test object t](https://github.com/substack/tape#tplann).

#### `'[message]'.[tapeTestMethodName]([actual, fn], [expected])`

Calls the according [tape method](https://github.com/substack/tape#methods) relaying the message string and the optional parameters.

## License

MIT
