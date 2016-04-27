var TabService = function () {
  var map = {};

  var initTabs = function () {
    chrome.tabs.query({}, function (tabs) {
      map = {};
      for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[i];
        map[tab.id] = tab;
      }
    });
  };

  initTabs();

  chrome.tabs.onCreated.addListener(function (tab) {
    map[tab.id] = tab;
  });

  chrome.tabs.onRemoved.addListener(function (tabId) {
    map.hasOwnProperty(tabId) && delete map[tabId];
  });

  chrome.tabs.onReplaced.addListener(function (addedTabId, removedTabId) {
    map.hasOwnProperty(removedTabId) && delete map[removedTabId];
    chrome.tabs.get(addedTabId, function (tab) {
      map[tab.id] = tab;
    });
  });

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    map[tabId] = tab;
  });

  return {
    getTabs: function () {
      return map;
    },
    getTab: function (tabId) {
      return map[tabId];
    },
    focusTab: function (tabId) {
      var tab = map[tabId];
      chrome.windows.update(tab.windowId, { focused: true }, function() {
        chrome.tabs.highlight({windowId: tab.windowId, tabs: tab.index});
      });
    },
    closeTab: function (tabId) {
      chrome.tabs.remove(tabId);
    }
  };
};

var tabService = new TabService();