var detect   = require('detect-tabular')
  , keys     = require('map-tabular-keys')
  , coerce   = require('coerce-tabular')
  , pick     = require('object.pick')
  , xtend    = require('xtend')
  , pumpify  = require('pumpify')
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
    , detectOpts = opts

  return pumpify.obj(
    detect(detectOpts),
    keys(keyOpts, opts.keys),
    coerce()
  )
}
