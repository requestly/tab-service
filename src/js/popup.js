var tabService = chrome.extension.getBackgroundPage().tabService;

function log(info) {
  if (info) {
    chrome.tabs.executeScript(null, {code: "alert('" + info + "')"});
  }
  window.close();
}

function getTabMarkup(tab) {
  return [
    '<div class="tab" data-id="' + tab.id + '">',
      '<div class="row">',
        '<span class="title-group">',
          '<img class="icon" src="' + tab.favIconUrl + '" height="16" width="16">',
          '<strong class="title">' + tab.title + '</strong>',
        '</span>',
        '<span class="close" title="Close tab">&times;</span>',
      '</div>',
      '<div class="row">',
        '<div class="url">' + tab.url + '</div>',
      '</div>',
    '</div>'
  ].join('');
}

document.addEventListener('DOMContentLoaded', function () {
  var $tabList = $('#tab-list').empty(),
    tabs = tabService.getTabs();

  for (var tabId in tabs) {
    $tabList.append(getTabMarkup(tabs[tabId]));
  }

  $('.tab').click(function (e) {
    var $tab = $(e.currentTarget);
    tabService.focusTab($tab.data('id'));
  });

  $('.close').click(function (e) {
    e.stopPropagation();
    e.preventDefault();

    var $tab = $(e.currentTarget).closest('.tab');
    tabService.closeTab($tab.data('id'));
    $tab.remove();
  });
});
