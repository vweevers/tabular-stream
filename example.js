var tabular = require('./')
  , fs      = require('fs')
  , snake   = require('snake-case')
  , format  = require('format-data')

fs.createReadStream('test/air_pollution_nl.xlsx')
  .pipe( tabular(snake) )
  .pipe( format('json') )
  .pipe( process.stdout )
