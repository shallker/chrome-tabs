/* dependencies */
var eventy = require('eventy');

/* chrome tabs collection */
var tabs = function () {
  chrome.tabs.onCreated.addListener(onTabCreated);
  return this;
}.call(eventy({}));

function onTabCreated(tb) {
  var tab = new Tab(tb);
  tabs.trigger('created', tab);
}

/* chrome tab instance creater */
function Tab(ctab) {

  var tab = function () {
    this.__proto__ = ctab;
    this.id = ctab.id;
    listen();
    return this;
  }.call(eventy({}));

  function listen() {
    chrome.tabs.onUpdated.addListener(onUpdated);
    chrome.tabs.onMoved.addListener(onMoved);
    chrome.tabs.onActivated.addListener(onActivated);
    chrome.tabs.onHighlighted.addListener(onHighlighted);
    chrome.tabs.onDetached.addListener(onDetached);
    chrome.tabs.onAttached.addListener(onAttached);
    chrome.tabs.onRemoved.addListener(onRemoved);
    chrome.tabs.onReplaced.addListener(onReplaced);
    chrome.browserAction.onClicked.addListener(onClicked);
  }

  function unlisten() {
    chrome.tabs.onUpdated.removeListener(onUpdated);
    chrome.tabs.onMoved.removeListener(onMoved);
    chrome.tabs.onActivated.removeListener(onActivated);
    chrome.tabs.onHighlighted.removeListener(onHighlighted);
    chrome.tabs.onDetached.removeListener(onDetached);
    chrome.tabs.onAttached.removeListener(onAttached);
    chrome.tabs.onRemoved.removeListener(onRemoved);
    chrome.tabs.onReplaced.removeListener(onReplaced);
    chrome.browserAction.onClicked.removeListener(onClicked);
  }

  function onClicked(tb) {
    if (tb.id !== tab.id) return;
    tab.trigger('clicked');
  }

  function onUpdated(tid, info) {
    if (tid !== tab.id) return;
    tab.trigger('updated', info);
  }

  function onMoved(tid, info) {
    if (tid !== tab.id) return;
    tab.trigger('moved', info);
  }

  function onActivated(info) {
    if (info.tabId !== tab.id) return;
    tab.trigger('activated', info);
  }

  function onHighlighted(info) {
    info.tabIds.forEach(function (tid, index) {
      if (tid !== tab.id) return;
      tab.trigger('highlighted', info);
    });
  }

  function onDetached(tid, info) {
    if (tid !== tab.id) return;
    tab.trigger('detached', info);
  }

  function onAttached(tid, info) {
    if (tid !== tab.id) return;
    tab.trigger('attached', info);
  }

  function onRemoved(tid, info) {
    if (tid !== tab.id) return;
    unlisten();
    tab.trigger('removed', info);
  }

  function onReplaced(newId, oldId) {
    if (oldId !== tab.id) return;
    chrome.tabs.get(newId, function (tb) {
      tab.__proto__ = tb;
      tab.id = newId;
      tab.trigger('replaced', newId);
    })
  }

  return tab;
}

module.exports = tabs;
