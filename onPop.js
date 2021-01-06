
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const button = document.querySelector('.bookmarkbtn');
      button.addEventListener('click', function() {
        
        const completed = document.getElementById('done').checked;
        let difficulty = false;
        if(document.querySelector('.container input:checked'))
              difficulty = document.querySelector('.container input:checked').value;
        chrome.tabs.sendMessage(tabs[0].id, {'type': "addData", 'done': completed, 'difficulty': difficulty});
      });
      return true;
    });

