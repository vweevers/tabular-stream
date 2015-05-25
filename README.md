# tabular-stream

**Detects tabular data (dsv, json, ndjson, xls, xlsx, xml, ods or sylk) and emits objects. Memory efficient for spreadsheets if PHP is available (weird huh), but does not require it. Spreadsheets and DSV must have a header.**

[![npm status](http://img.shields.io/npm/v/tabular-stream.svg?style=flat-square)](https://www.npmjs.org/package/tabular-stream) [![Travis build status](https://img.shields.io/travis/vweevers/tabular-stream.svg?style=flat-square&label=travis)](http://travis-ci.org/vweevers/tabular-stream) [![AppVeyor build status](https://img.shields.io/appveyor/ci/vweevers/tabular-stream.svg?style=flat-square&label=appveyor)](https://ci.appveyor.com/project/vweevers/tabular-stream) [![Dependency status](https://img.shields.io/david/vweevers/tabular-stream.svg?style=flat-square)](https://david-dm.org/vweevers/tabular-stream)

## example

```js
var tabular    = require('tabular-stream')
  , fs         = require('fs')
  , JSONStream = require('jsonstream')

fs.createReadStream('test/air_pollution_nl.xlsx')
  .pipe( tabular() )
  .pipe( JSONStream.stringify() )
  .pipe( process.stdout )
```

## api

### `tabular()`

Returns a duplex stream - give it any tabular data, get back objects.

## supported file formats

- DSV (CSV, TSV or anything) through [csv-parser](https://npmjs.com/package/csv-parser)
- JSON and NDJSON through [JSONStream](https://npmjs.com/package/JSONStream)

And through [excel-stream](https://npmjs.com/package/excel-stream) or [phpexcel-stream](https://npmjs.com/package/phpexcel-stream):

- Office Open XML (.xlsx) (Excel 2007 and above)
- SpreadsheetML (.xml) (Excel 2003)
- BIFF 5-8 (.xls) (Excel 95 and above)
- Open Document Format/OASIS (.ods)
- SYLK

It actually supports even more formats - depending on whether excel-stream or phpexcel-stream is used - but only the shared formats are listed here.

## install

With [npm](https://npmjs.org) do:

```
npm install tabular-stream
```

## license

[MIT](http://opensource.org/licenses/MIT) © [Vincent Weevers](http://vincentweevers.nl). Test data © Statistics Netherlands, The Hague/Heerlen.
