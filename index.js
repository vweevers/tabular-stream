var detect   = require('detect-tabular')
  , keys     = require('map-tabular-keys')
  , coerce   = require('coerce-tabular')
  , pick     = require('object.pick')
  , pumpify  = require('pumpify')
  , defaults = {
    defaultValue: 0,
    bare: false
}

module.exports = function (opts) {
  if (typeof opts === 'function') {
    opts = { keys: opts }
  }

  opts = Object.assign({}, defaults, opts)

  var keyOpts    = pick(opts, ['defaultValue', 'bare'])
    , detectOpts = opts

  return pumpify.obj(
    detect(detectOpts),
    keys(keyOpts, opts.keys),
    coerce()
  )
}
