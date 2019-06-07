'use strict'

const test = require('tape')
const concat = require('concat-stream')
const through2 = require('through2').obj
const deepEqual = require('deep-equal')
const snake = require('snake-case')
const fs = require('fs')
const path = require('path')
const tabular = require('..')

const formats = ['txt', 'csv', 'xlsx', 'xls', 'ods', 'json']
const expected = require('./expected.json').rows
const base = path.join(__dirname, 'air_pollution_nl.')

expected.forEach(numstr)

formats.forEach(function (format) {
  test(format, function (t) {
    t.plan(5)

    let sawNumbers = false
    fs.createReadStream(base + format)
      .pipe(tabular({ keys: snake }))
      .pipe(through2(function (obj, _, next) {
        sawNumbers = numstr(obj)
        next(null, obj)
      }))

      .pipe(concat(function (data) {
        t.ok(sawNumbers, 'saw numbers')
        t.equal(data.length, expected.length, 'length ok')
        t.deepEqual(data[data.length - 1], expected[expected.length - 1], 'last row ok')
        t.deepEqual(data[0], expected[0], 'first row ok')
        t.ok(deepEqual(data, expected), 'deep equal')
      }))
  })
})

// Ignore rounding differences
function numstr (obj) {
  let sawNumbers = false

  for (let k in obj) {
    if (typeof obj[k] === 'number') {
      obj[k] = obj[k].toFixed(2)
      sawNumbers = true
    }
  }

  return sawNumbers
}
