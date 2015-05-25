var test       = require('tape')
  , tabular    = require('../')
  , fs         = require('fs')
  , concat     = require('concat-stream')
  , through2   = require('through2').obj
  , deepEqual  = require('deep-equal')

var formats = ['txt', 'csv', 'xlsx', 'xls', 'ods', 'json']
var expected = require('./air_pollution_nl.json').rows
var base = __dirname + require('path').sep + 'air_pollution_nl.'

formats.forEach(function(format){
  test(format, function(t){
    t.plan(1)

    fs.createReadStream(base + format)
      .pipe( tabular() )

      // Ignore tiny rounding differences and 
      // european number formatting
      .pipe( through2(function(obj, _, next){
        for(var k in obj) {
          var val = obj[k], num = val.replace(',', '.')
          if (!isNaN(num)) obj[k] = (+num).toFixed(2)
        }

        next(null, obj)
      }))

      .pipe( concat(function(data){
        // t.deepEqual(data, expected)
        t.ok(deepEqual(data, expected), 'deep equal')
      }))
  })
})
