var tape = require('tape')
var EventEmitter = require('events').EventEmitter
var delayify = require('./index')

tape('delayed', function (t) {
  var emitter = new EventEmitter()
  emitter = delayify(emitter)

  t.notOk(emitter.listeners('data').length, 'no data listeners')

  var listenerGotCalled = false

  function listener () {
    listenerGotCalled = true
  }

  emitter.onDelayed('data', 1000, listener)

  t.ok(emitter.listeners('data').length, 'really pushed a listener')

  emitter.emit('data', 'fake data')

  t.false(listenerGotCalled, 'listener not called yet')

  setTimeout(function () {
    t.false(listenerGotCalled, 'listener still not called')
  }, 500)

  setTimeout(function () {
    
    t.true(listenerGotCalled, 'listener got called')

    emitter.removeDelayedListener('data', listener)
    t.notOk(emitter.listeners('data').length, 'removed a delayed listener')

    t.end()
  }, 1500)

})
