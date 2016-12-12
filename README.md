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

tape = flip(tape)

tape(t => {
  t.plan(3)
  t.ok(2 < 3, 'Regular tape syntax works as expected.')
  // This is new:
  'Two is less than three'.ok(2 < 3)
  'Five equals five'.equals(5, 5)
})
```

All of [tapes methods](https://github.com/substack/tape#methods) that print out `msg` to the command-line are usable with the flipped syntax.

## API

#### `var flippedTape = flip(tape)`

Returns a tape wrapper that attaches all tape-methods that print out to the command-line to the String prototype.

## License

MIT
