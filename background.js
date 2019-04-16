console.log("background");

var cur_tab = 0;
var seconds = 0.5 * 1000;
var screenshots = new Map();

setInterval(function() {
  chrome.tabs.captureVisibleTab(function takeScreenshot(img) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabArray) {
      var tab_id = tabArray[0].id;
      // for very first screenshot
      if (cur_tab == 0) {
        cur_tab = tab_id;
        console.log(cur_tab);
      }
      // if the tab is changed
      if (cur_tab != tab_id) {
        // if a screenshot already exists
        if (screenshots.has(tab_id)) {
          console.log("send message");
          chrome.tabs.sendMessage(tab_id, [screenshots.get(tab_id), img]);
        }
      }
      // update the tab and screenshots
      cur_tab = tab_id;
      console.log(cur_tab);
      screenshots.set(cur_tab, img);
    });
  });
}, seconds);