# tabular-stream

> Note: the core of tabular-stream 1.0 has moved to `detect-tabular`. This is now a data normalizer on top of that.

**[Detects tabular data](https://www.npmjs.com/package/detect-tabular) (dsv, json, ndjson, xls, xlsx, xml, ods or sylk) and emits objects. Ensures all rows [have the same keys, optionally transforms keys](https://www.npmjs.com/package/map-tabular-keys) and tries to [coerce values to numbers](https://www.npmjs.com/package/coerce-tabular). Spreadsheets and DSV must have a header.**

[![npm status](http://img.shields.io/npm/v/tabular-stream.svg?style=flat-square)](https://www.npmjs.org/package/tabular-stream) [![Travis build status](https://img.shields.io/travis/vweevers/tabular-stream.svg?style=flat-square&label=travis)](http://travis-ci.org/vweevers/tabular-stream) [![AppVeyor build status](https://img.shields.io/appveyor/ci/vweevers/tabular-stream.svg?style=flat-square&label=appveyor)](https://ci.appveyor.com/project/vweevers/tabular-stream) [![Dependency status](https://img.shields.io/david/vweevers/tabular-stream.svg?style=flat-square)](https://david-dm.org/vweevers/tabular-stream)

## example

```
npm i tabular-stream snake-case format-data
```

```js
var tabular = require('tabular-stream')
  , fs      = require('fs')
  , snake   = require('snake-case')
  , format  = require('format-data')

fs.createReadStream('test/air_pollution_nl.xlsx')
  .pipe( tabular(snake) )
  .pipe( format('json') )
  .pipe( process.stdout )
```

**Need a CLI doing just this?** Jump to [tabular-cli](https://www.npmjs.com/package/tabular-cli), which pairs `tabular-stream` with `format-data` to convert tabular data to json, ndjson, dsv or sse. For example:

```
tabular -k snake-case -o tsv < input.xls > output.tsv
```

## api

### `tabular([keys || options])`

Returns a duplex stream - give it any tabular data, get back objects. `(keys)` is a shorthand for `({ keys: keys })`. The available options are:

#### `function keys`

An optional function to [transform and/or filter keys](https://www.npmjs.com/package/map-tabular-keys). Receives a single argument, for every key of the first row. Everything at [change-case](https://www.npmjs.com/package/change-case) works well. If it returns an empty string or anything other than a string, the key is ignored (i.e. not included in the emitted objects).

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

#### `boolean phpexcel`

Whether to use [phpexcel-stream](https://npmjs.com/package/phpexcel-stream) (memory efficient) or [excel-stream](https://npmjs.com/package/excel-stream) (usually faster) for spreadsheets. **Default is `undefined`**, meaning it will try to require `phpexcel-stream` but if PHP is not available, fallback to `excel-stream`. This might change in the future. Hopefully someone comes up with a native, pure streaming, memory efficient spreadsheet parser.

## install

With [npm](https://npmjs.org) do:

```
npm install tabular-stream
```

## license

[MIT](http://opensource.org/licenses/MIT) © [Vincent Weevers](http://vincentweevers.nl). Test data © Statistics Netherlands, The Hague/Heerlen.
