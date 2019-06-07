'use strict'

const detect = require('detect-tabular')
const keys = require('map-tabular-keys')
const coerce = require('coerce-tabular')
const pumpify = require('pumpify')

module.exports = function (opts) {
  if (typeof opts === 'function') {
    opts = { keys: opts }
  } else if (!opts) {
    opts = {}
  }

  return pumpify.obj(
    detect(opts),
    keys(opts, opts.keys),
    coerce()
  )
}
