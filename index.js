function listen (prepend, once, eventName, delay, listener) {
  function proxy (...args) {
    setTimeout(listener, delay, ...args)
  }
  this._delayedListenersMap.set(listener, proxy)
  if (prepend && once) this.prependOnceListener(eventName, proxy)
  else if (prepend && !once) this.prependListener(eventName, proxy)
  else if (!prepend && once) this.once(eventName, proxy)
  else if (!prepend && !once) this.addListener(eventName, proxy)
}

function unlisten (eventName, listener) {
  this.removeListener(eventName, this._delayedListenersMap.get(listener))
}

function delayify (emitter) {
  if (!emitter._delayedListenersMap) emitter._delayedListenersMap = new Map()
  emitter.onDelayed = emitter.addDelayedListener =
    listen.bind(emitter, false, false)
  emitter.onceDelayed = emitter.addDelayedOnceListener =
    listen.bind(emitter, false, true)
  emitter.prependDelayedListener = listen.bind(emitter, true, false)
  emitter.prependDelayedOnceListener = listen.bind(emitter, true, true)
  emitter.offDelayed = emitter.removeDelayedListener = unlisten.bind(emitter)
  return emitter
}

module.exports = delayify
