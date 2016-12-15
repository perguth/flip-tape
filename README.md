# flip-tape

> Write [`tape`](https://github.com/substack/tape)-tests starting with the message string: `'Two is less than three'.ok(2 < 3)`

Adds `'Two is less than three'.ok(2 < 3)` syntax to tape. Original functionality is kept.

```bash
npm install flip-tape
```

## Usage

```js
var tape = require('tape')
var flip = require('flip-tape')

var test = flip(tape)

test('Regular tape assertion group', t => {
  t.plan(3)
  t.ok(2 < 3, 'Regular tape syntax works as expected.')

  // This is new:
  'Two is less than three'.ok(2 < 3)
  'Five equals five'.equals(5, 5)

  'But there is a callback too'.test(t => {
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

#### `var test = flip(tape)`

Returns a tape wrapper that attaches all tape-methods that print out to the command-line to the String prototype.

#### `'[message]'.test([opt], cb)`

Calls `tape` like this: `tape([message], [opt], cb)`.

#### `'[message]'.[tapeTestMethodName]([actual, fn], [expected])`

Calls the according [tape method](https://github.com/substack/tape#methods) relaying the message string and the optional parameters.

#### `'[message]'.t(cb)`

`cb(t)` gets called with the [test object t](https://github.com/substack/tape#tplann).

## License

MIT
