chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  url = tabs[0].url;
  let empty = false;
  let val = -1;
  chrome.storage.sync.get('ctftime', function (items) {
    if (Object.keys(items).length === 0 && items.constructor === Object) {
      empty = true;
    } else {
      const m = items['ctftime'];
      val = m.findIndex((data) => data.url === url);
      if (val !== -1) {
        document.getElementById('done').checked = m[val]['done'];
        document.getElementById(m[val]['difficulty']).checked = true;
      }
    }
  });
  const button = document.querySelector('.bookmarkbtn');
  const aggregate = document.querySelector('.aggregate');
  aggregate.addEventListener('click', function() {
    chrome.tabs.create({url: '/options/index.html'});
  })
  button.addEventListener('click', function() {
  const completed = document.getElementById('done').checked;
  if(completed)
    timeCompleted = getDateTime();
  else
    timeCompleted = '----';
  let difficulty = false;
  if(document.querySelector('.container input:checked'))
    difficulty = document.querySelector('.container input:checked').value;
    chrome.tabs.sendMessage(tabs[0].id, {'type': "addData", 'empty': empty, 'done': completed, 'val': val, 'difficulty': difficulty, 'timeCompleted': timeCompleted});
    window.location.reload();
  });
  return true;
});

function getDateTime() {
  var now     = new Date(); 
  var year    = now.getFullYear();
  var month   = now.getMonth()+1; 
  var day     = now.getDate();
  var hour    = now.getHours();
  var minute  = now.getMinutes();
  var second  = now.getSeconds(); 
  if(month.toString().length == 1) {
       month = '0'+month;
  }
  if(day.toString().length == 1) {
       day = '0'+day;
  }   
  if(hour.toString().length == 1) {
       hour = '0'+hour;
  }
  if(minute.toString().length == 1) {
       minute = '0'+minute;
  }
  if(second.toString().length == 1) {
       second = '0'+second;
  }   
  var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
   return dateTime;
}
