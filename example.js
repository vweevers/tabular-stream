'use strict'

const tabular = require('.')
const fs = require('fs')
const snake = require('snake-case')
const format = require('format-data')

fs.createReadStream('test/air_pollution_nl.xlsx')
  .pipe(tabular(snake))
  .pipe(format('json'))
  .pipe(process.stdout)
