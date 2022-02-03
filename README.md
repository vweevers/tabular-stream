# tabular-stream

> Note: the core of `tabular-stream` 1.0 has moved to [`detect-tabular`](https://www.npmjs.com/package/detect-tabular). This is now a data normalizer on top of that.

**[Detects tabular data](https://www.npmjs.com/package/detect-tabular) (spreadsheets, dsv or json, 20+ different formats) and emits objects. Ensures all rows [have the same keys, optionally transforms keys](https://www.npmjs.com/package/map-tabular-keys) and tries to [coerce values to numbers](https://www.npmjs.com/package/coerce-tabular). Spreadsheets and DSV must have a header.**

[![npm status](http://img.shields.io/npm/v/tabular-stream.svg)](https://www.npmjs.org/package/tabular-stream)
[![node](https://img.shields.io/node/v/tabular-stream.svg)](https://www.npmjs.org/package/tabular-stream)
[![Test](https://img.shields.io/github/workflow/status/vweevers/tabular-stream/Test?label=test)](https://github.com/vweevers/tabular-stream/actions/workflows/test.yml)
[![Standard](https://img.shields.io/badge/standard-informational?logo=javascript&logoColor=fff)](https://standardjs.com)

## Example

```
npm i tabular-stream snake-case format-data
```

```js
const tabular = require('tabular-stream')
const fs = require('fs')
const snake = require('snake-case').snakeCase
const format = require('format-data')

fs.createReadStream('test/air_pollution_nl.xlsx')
  .pipe(tabular(snake))
  .pipe(format('json'))
  .pipe(process.stdout)
```

**Need a CLI doing just this?** Jump to [`tabular-cli`](https://www.npmjs.com/package/tabular-cli), which pairs `tabular-stream` with `format-data` to convert tabular data to json, ndjson, dsv or sse. For example:

```
tabular -k snake-case -o tsv < input.xls > output.tsv
```

## API

### `tabular([keys || options])`

Returns a duplex stream - give it any tabular data, get back objects. `(keys)` is a shorthand for `({ keys: keys })`. The available options are:

#### `function keys`

An optional function to [transform and/or filter keys](https://www.npmjs.com/package/map-tabular-keys). Receives a single argument, for every key of the first row. Everything at [`change-case`](https://www.npmjs.com/package/change-case) works well. If it returns an empty string or anything other than a string, the key is ignored (i.e. not included in the emitted objects).

```js
function keys(key) {
  if (key === 'useless') return false
  return key.toUpperCase()
}
```

#### `mixed defaultValue`

Fallback value to use for `null` and `undefined` values. **Default is `0`**.

#### `boolean bare`

Whether to emit null prototype objects via `Object.create(null)` or plain javascript objects **(the default)**.

#### Other

Other options are passed as-is to [`spreadsheet-stream`](https://github.com/vweevers/spreadsheet-stream) (if applicable). NB. Because the binary spreadsheets formats are not streamable, `spreadsheet-stream` will buffer the whole thing in memory. As a safe-guard you can set the `maxSize` option (in bytes): `tabular({ maxSize: 1024 * 1024 })`. See [`spreadsheet-stream`](https://github.com/vweevers/spreadsheet-stream) for details.

## Install

With [npm](https://npmjs.org) do:

```
npm install tabular-stream
```

## License

[MIT](LICENSE.md) © 2015-present Vincent Weevers. Test data © Statistics Netherlands, The Hague/Heerlen.
