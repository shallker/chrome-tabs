/* dependencies */
var eventy = require('eventy'),
    Tab = require('./script/tab');

/* chrome tabs collection */
var tabs = function () {
  chrome.tabs.onCreated.addListener(onTabCreated);
  return this;
}.call(eventy({}));

function onTabCreated(tb) {
  var tab = new Tab(tb);
  tabs.trigger('created', tab);
}

module.exports = tabs;
