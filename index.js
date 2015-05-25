var peek     = require('peek-stream')
  , detect   = require('detect-format')
  , csv      = require('csv-parser')
  , json     = require('JSONStream')
  , pipeline = require('stream-combiner2')
  , binary   = require('is-binary')

try {
  var phpexcel = require('phpexcel-stream')
  var spreadsheet = function() {
    return pipeline(phpexcel(), csv())
  }
} catch(e) {
  spreadsheet = require('excel-stream')
}

module.exports = function () {
  return peek({newline: false, maxBuffer: 8000}, function (data, swap) {
    // bullet-proof nor teally
    if (binary(data.slice(0,24).toString()))
      return swap(null, spreadsheet())

    var detected = detect(data)

    if(detected.format === 'json')
      swap(null, json.parse(detected.selector))
    else if(detected.format === 'csv')
      swap(null, csv({separator: detected.separator}))
    else
      swap(null, spreadsheet())
  })
}
