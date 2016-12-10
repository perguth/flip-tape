# flip-tape

> Write `tape`-tests starting with the message string: `'Two is less than three'.ok(2 < 3)`

```bash
npm install flip-tape
```

## Usage

```js
var tape = require('tape')
var flipTape = require('flip-tape')

tape = flipTape(tape, true)

tape(t => {
  'Two is less than three'.ok(2 < 3)

  // this is new and we enabled it with `true`:
  'This function should return false'.notOk(t => {
    return false
  })
})
```

All of [tapes methods](https://github.com/substack/tape#methods) that print out to the command-line are usable.

## API

#### `var flippedTape = flipTape(tape, [executeFunctions])`

Returns a tape wrapper that attaches all tape methods that print out to the command-line to the String prototype. Setting `executeFunctions` to true will cause `flippedTape` to execute arguments that go into the `expected` slot if they are of type function.

## License

MIT
