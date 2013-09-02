
# chrome-tabs

  Play with chrome.tabs in a enjoyable way.

## Installation

  Install with [component(1)](http://component.io):

    $ component install shallker/chrome-tabs

## Quick Start
```
var tabs = require('chrome-tabs');
tabs.on('created', function (tab) {
  tab.on('updated', function () {})
  tab.on('removed', function () {})
  tab.on('clicked', function () {})
  tab.set('icon.path', 'big.icon')
  tab.get('icon.path')
  tab.script.insert('file.js')
  tab.script.execute('js code')
  tab.style.insert('file.css')
  tab.style.execute('css code')
})
```

## License

  MIT
