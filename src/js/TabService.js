(function(window, chrome) {
  var TabService = function () {
    this.construct.apply(this, arguments);
  };

  TabService.prototype = {
    construct: function() {
      this.map = {};
      this.initTabs();
      this.addEventListeners();
    },

    initTabs: function () {
      var that = this;
      chrome.tabs.query({}, function (tabs) {
        that.map = {};
        for (var i = 0; i < tabs.length; i++) {
          var tab = tabs[i];
          that.map[tab.id] = tab;
        }
      });
    },

    addEventListeners: function() {
      var that = this;

      chrome.tabs.onCreated.addListener(function (tab) {
        that.map[tab.id] = tab;
      });

      chrome.tabs.onRemoved.addListener(function (tabId) {
        that.map.hasOwnProperty(tabId) && delete map[tabId];
      });

      chrome.tabs.onReplaced.addListener(function (addedTabId, removedTabId) {
        that.map.hasOwnProperty(removedTabId) && delete map[removedTabId];
        chrome.tabs.get(addedTabId, function (tab) {
          that.map[tab.id] = tab;
        });
      });

      chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        that.map[tabId] = tab;
      });
    },

    getTabs: function () {
      return this.map;
    },

    getTab: function (tabId) {
      return this.map[tabId];
    },

    focusTab: function (tabId) {
      var tab = this.map[tabId];

      chrome.windows.update(tab.windowId, { focused: true }, function() {
        chrome.tabs.highlight({windowId: tab.windowId, tabs: tab.index});
      });
    },

    closeTab: function (tabId) {
      chrome.tabs.remove(tabId);
    }
  };

  window.TabService = TabService;
})(window, chrome);