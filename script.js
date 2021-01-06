chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
      const difficulty = message['difficulty'];
      const done = message['done'];
      const url = window.location.href;
      const title = document.title.split('/').slice(1,-1).join('-');
      if(message.type === "addData") {
        chrome.storage.sync.get(['ctftime'], function(items) {
        if(Object.keys(items).length === 0 && items.constructor === Object) {
        let m = [{'url': url, 'title': title, 'done': done, 'difficulty': difficulty}];
        chrome.storage.sync.set({'ctftime': m});
        
      } else {
        let m = items['ctftime'];
        const val = m.findIndex(data => data.url === url);
        console.log(val);
        if(val === -1) {
          m.push({'url': url, 'difficulty': difficulty, 'done': done, 'title': title})
          chrome.storage.sync.set({'ctftime': m});
        }
        else {
          m[val] = {'url': url, 'difficulty': difficulty, 'done': done, 'title': title}
          chrome.storage.sync.set({'ctftime': m})
        }
      }
      console.log(items['ctftime']);
    });  
  }
  return true;
});
