# flip-tape

> Write [`tape`](https://github.com/substack/tape)-tests starting with the message string: `'Two is less than three'.ok(2 < 3)`

```bash
npm install flip-tape
```

## Usage

```js
var tape = require('tape')
var flip = require('flip-tape')

tape = flip(tape)

tape(t => {
  t.plan(2)

  'Two is less than three'.ok(2 < 3)
  'Five equals five'.equals(5, 5)
})
```

All of [tapes methods](https://github.com/substack/tape#methods) that print out to the command-line are usable.

## API

#### `var flippedTape = flip(tape, [executeFunctions])`

Returns a tape wrapper that attaches all tape methods that print out to the command-line to the String prototype. Setting `executeFunctions` to true will cause `flippedTape` to execute arguments that go into the `expected` slot if they are of type function.

## License

MIT
