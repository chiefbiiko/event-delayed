var EventEmitter = require('events').EventEmitter

// TODO: unregister function return 4 all my event-x modules

function onDelayed (event, delay, handler) {
  this.on(event, function proxy (...args) {
    setTimeout(handler, delay, ...args)
  })
}

function delayify (emitter) {
  // duck check...
  emitter.onDelayed = onDelayed
  return emitter
}

module.exports = delayify