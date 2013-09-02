var ok = function (v) {if (!v) throw v + ' not ok'},
    eq = function (a, b) {if (a !== b) throw a + ' not equal ' + b},
    s = function (data) {eq(Object.prototype.toString.call(data), '[object String]')},
    f = function (data) {eq(Object.prototype.toString.call(data), '[object Function]')},
    a = function (data) {eq(Object.prototype.toString.call(data), '[object Array]')},
    b = function (data) {eq(Object.prototype.toString.call(data), '[object Boolean]')},
    o = function (data) {eq(Object.prototype.toString.call(data), '[object Object]')};
    n = function (data) {eq(Object.prototype.toString.call(data), '[object Number]')};

var tabs = require('chrome-tabs');

f(tabs.on)
f(tabs.off)

tabs.on('created', function (tab) {
  n(tab.id)
  f(tab.set)
  f(tab.get)
  f(tab.on)
  f(tab.off)

  ok(tab.set('icon.path', 'hi.icon'))
  eq(tab.get('icon.path'), 'hi.icon')
})
