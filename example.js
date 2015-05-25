var tabular    = require('./')
  , fs         = require('fs')
  , JSONStream = require('jsonstream')

fs.createReadStream('test/air_pollution_nl.xlsx')
  .pipe( tabular() )
  .pipe( JSONStream.stringify() )
  .pipe( process.stdout )
