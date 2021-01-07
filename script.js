chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
      const difficulty = message['difficulty'];
      const done = message['done'];
      const url = window.location.href;
      const title = document.title.split('/').slice(1,-1).join('-');
      const empty = message['empty'];
      const val = message['val'];
      let timeCompleted = message['timeCompleted'];
      if(message.type === "addData") {
        chrome.storage.sync.get(['ctftime'], function(items) {
        if(empty) {
        let m = [{'url': url, 'title': title, 'done': done, 'difficulty': difficulty, 'timeCompleted': timeCompleted}];
        chrome.storage.sync.set({'ctftime': m});
      } else {
        let m = items['ctftime'];
        if(val === -1) {
          m.push({'url': url, 'difficulty': difficulty, 'done': done, 'title': title, 'timeCompleted': timeCompleted})
          chrome.storage.sync.set({'ctftime': m});
        }
        else {
          if(done == m[val].done)
            timeCompleted =  m[val].timeCompleted;
          m[val] = {'url': url, 'difficulty': difficulty, 'done': done, 'title': title, 'timeCompleted': timeCompleted}
          chrome.storage.sync.set({'ctftime': m})
        }
      }
    });  
  }
  return true;
});
