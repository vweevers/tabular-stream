var detect   = require('detect-tabular')
  , keys     = require('map-tabular-keys')
  , coerce   = require('coerce-tabular')
  , pick     = require('object.pick')
  , xtend    = require('xtend')
  , pipeline = require('stream-combiner2')
  , defaults = {
    defaultValue: 0,
    bare: false
}

module.exports = function (opts) {
  if (typeof opts === 'function') {
    opts = { keys: opts }
  }

  opts = xtend(defaults, opts)

  var keyOpts    = pick(opts, ['defaultValue', 'bare'])
    , detectOpts = pick(opts, 'phpexcel')

  return pipeline (
    detect(detectOpts),
    keys(keyOpts, opts.keys),
    coerce()
  )
}
