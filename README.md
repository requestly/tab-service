# Tab Service
Chrome Tab Service - Query any information about any tab from Tab Service. Syntactic Sugar over Chrome tab api.

## Why use Requestly Chrome Tab Service ?
[Chrome Tabs API](https://developer.chrome.com/extensions/tabs) provides all information about tabs in asynchronous manner.
When we need to query a tab related information from inside an asyncronously called handler, we can not use chrome.tabs api.
We aggresively need that info. For example: If you intercepted an HTTP(s) request and you want to know the Url of the tab which made
this request, you get a hard time doing this. While with requestly's tab service makes life easier.
It maintains tab related information (currently Url and tabId) in sync with tabs in your browser.

## Getting started
Once you have setup script [TabService.js](https://github.com/requestly/tab-service/blob/master/src/js/TabService.js)
to run in background page of your extension, you need to instantiate the service as:

```js
var tabService = new TabService();
```

```manifest permissions
  webRequest
  tabs
  http://*/*
  https://*/*
  ... more such schemes
```

Check Issue #6 for explanation of webRequest permissions

### API Documentation
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


