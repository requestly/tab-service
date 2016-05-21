# Tab Service
Chrome Tab Service - Query any information about any tab from Tab Service

## Getting started
Once you have setup script [TabService.js](https://github.com/requestly/tab-service/blob/master/src/js/TabService.js)
to run in background page of your extension, you need to instantiate the service as:

```js
var tabService = new TabService();
```

The instance of service exposes following APIs:

##### getTabs()
Returns a map of [tab](https://developer.chrome.com/extensions/tabs#type-Tab) objects indexed by their tab ids.

##### getTab(tabId)
Returns the tab object with id equal to `tabId`.

##### getTabUrl(tabId)
Returns the URL of page opened in tab with id equal to `tabId`.

##### focusTab(tabId)
Brings to focus the tab with id equal to `tabId`.

##### closeTab(tabId)
Closes the tab with id equal to `tabId`.


