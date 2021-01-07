const updater = () => {
  browser.storage.sync.get(['ctftime'], function (items) {
    let fakeData = items['ctftime'];

    const addData = (data) => {
      const ans = data.reduce(
        (str, d, index) =>
          (str += `<tr>
      <td>${index + 1}</td>
      <td><a href="${d.url}" target="_blank" rel="noopener noreferrer">${
            d.title
          }</a> <span class="delete-button"><img src="./assets/delete.svg" alt="" height="18px" width="18px"></span></td>
      <td>${d.difficulty}</td>
      <td class="${d.done ? 'green' : 'red'}" data-status= 'Mark as ${
            d.done ? 'un-done' : 'done'
          }'>${d.done ? '&#10003' : '&#10005'}</td>
          <td>${d.timeCompleted || "-"}</td>
    </tr>`),
        ''
      );
      const download = document.querySelector('.download');
      download.addEventListener('click', () => {
        let m = JSON.stringify(fakeData);
        const a = document.createElement('a');
        a.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(m));
        a.download = 'ctftime.json';
        a.click();
        URL.revokeObjectURL(a.href);
      });
      return ans;
    };

    function checkIfPresent(obj, prop) {
      if(obj.hasOwnProperty(prop)) {
        console.log(obj[prop]);
        return obj[prop];
      }
      return null;
    }
    const upload = document.querySelector('.upload');
    const input = document.querySelector('#selectFiles');
    upload.addEventListener('click', () => {
      input.click();  
    });
    input.addEventListener('change', () => {
      let files = document.getElementById('selectFiles').files;
      if(files.length <= 0) {
        alert("Select a file first");
        return false;
      }
      const fr = new FileReader();
      fr.addEventListener('load', (event) => {
        const val = event.target.result;
        try {
          const data = JSON.parse(val);
          let m = new Array();
          for(i in data) {
            if(!(data[i].hasOwnProperty('url')) || !(data[i].hasOwnProperty('timeCompleted'))) {
              alert("One or more of the objects lacks an url or date. Kindly provide a valid file");
              return false;
            }
            m.push({'url': data[i]['url'], 'difficulty': checkIfPresent(data[i], 'difficulty'), 'done': checkIfPresent(data[i], 'done'), 'timeCompleted': data[i]['timeCompleted'], 'title': data[i]['title']}) 
          }
          browser.storage.sync.set({'ctftime': m});
          window.location.reload();
        } catch {
          alert("File error. Retry");
          return false;
        }
      });
      fr.readAsText(files[0]);
    });

    document.querySelector('#table-body').innerHTML = addData(fakeData);

    // FILTER DOM MANIPULATION

    document
      .querySelectorAll('#filter .category')
      .forEach((elem) =>
        elem.childNodes[1].addEventListener('click', (_) =>
          elem.children[1].classList.toggle('active')
        )
      );

    const filters = {
      difficulty: ['easy', 'medium', 'difficult'],
      done: [true, false],
    };
    document
      .querySelectorAll('#filter .category input')
      .forEach((inp, index) => {
        inp.addEventListener('change', function () {
          if (index < 3) {
            this.checked
              ? filters.difficulty.push(this.name)
              : filters.difficulty.splice(
                  filters.difficulty.indexOf(this.name),
                  1
                );
          } else {
            let bool = this.name == 'done' ? true : false;
            this.checked
              ? filters.done.push(bool)
              : filters.done.splice(filters.done.indexOf(bool), 1);
          }
          console.log(filters);
          filterElements();
        });
      });

    const filterElements = () => {
      const filteredData = fakeData.filter((data) => {
        // let bool = true;
        // if (!filters.difficulty.includes(d.difficulty)) bool = false;
        // if (!filters.done.includes(d.done)) bool = false;
        // return bool;
        return (
          filters.difficulty.some((val) => {
            return val == data.difficulty;
          }) &&
          filters.done.some((val) => {
            return val == data.done;
          })
        );
      });
      console.log(filteredData);
      document.querySelector('#table-body').innerHTML = addData(filteredData);
    };

    const handleUpdates = () => {
      document
        .querySelectorAll('#table-body tr td:nth-of-type(4)')
        .forEach((elem) => {
          elem.addEventListener('click', function () {
            const urlOfEntry = elem.parentElement.children[1].children[0].href;
            const newData = fakeData.map((val) => {
              if (val.url == urlOfEntry) {
								val.done = !val.done;
								if (val.timeCompleted=== '----') val.timeCompleted = getDateTime();
								else val.timeCompleted =  '----';
							}
              return val;
            });
            browser.storage.sync.set({ ['ctftime']: newData });
            window.location.reload();
          });
        });

      document
        .querySelectorAll('#table-body tr td:nth-of-type(2)')
        .forEach((elem) => {
          elem.children[1].addEventListener('click', function () {
            const urlOfEntry = elem.children[0].href;
            const newData = fakeData.filter((val) => {
              return val.url !== urlOfEntry;
            });
            browser.storage.sync.set({ ['ctftime']: newData });
            window.location.reload();
          });
        });
    };
    handleUpdates();
  });
};
updater();




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
