/* Dependencies */
var eventy = require('eventy'),
    ObjectData = require('object-data');

/* Chrome tab instance creater */
module.exports = function Tab(ctab) {
  var setting = ObjectData({
        icon: {
          path: String
        }
      })();

  var tab = function () {
    this.__proto__ = ctab;
    this.id = ctab.id;
    setting.icon.path.on('update', onIconPathUpdate);
    listenChrome();
    return this;
  }.call(eventy({}));

  function listenChrome() {
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

  function unlistenChrome() {
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

  function onIconPathUpdate(path) {
    chrome.browserAction.setIcon({path: path, tabId: tab.id});
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
    unlistenChrome();
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

  function setter(setting, names, value) {
    var name = names.shift();
    if (!setting[name]) {
      return;
    }
    if (names.length) {
      return setter(setting[name], names, value);
    }
    return setting[name].update(value);
  }

  function getter(setting, names) {
    var name = names.shift();
    if (!setting[name]) {
      return;
    }
    if (names.length) {
      return getter(setting[name], names);
    }
    return setting[name].valueOf();
  }

  tab.set = function (chain, value) {
    setter(setting, chain.split('.'), value);
    return this;
  }

  tab.get = function (chain, value) {
    return getter(setting, chain.split('.'), value);
  }

  return tab;
}
