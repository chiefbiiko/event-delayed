/* TODO
 + incorporate once for registering
*/

function listen (toHead, eventName, delay, listener) {
  function proxy (...args) {
    setTimeout(listener, delay, ...args)
  }
  this._delayedListenersMap.set(listener, proxy)
  if (toHead) this.prependListener(eventName, proxy)
  else this.addListener(eventName, proxy)
}

function unlisten (eventName, listener) {
  this.removeListener(eventName, this._delayedListenersMap.get(listener))
}

function delayify (emitter) {
  if (!emitter._delayedListenersMap) emitter._delayedListenersMap = new Map()
  emitter.onDelayed = emitter.addDelayedListener = listen.bind(emitter, false)
  emitter.prependDelayedListener = listen.bind(emitter, true)
  emitter.offDelayed = emitter.removeDelayedListener = unlisten.bind(emitter)
  return emitter
}

module.exports = delayify
