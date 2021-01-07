chrome.storage.sync.get(['ctftime'], function(items) {
  let fakeData = items['ctftime'];
  console.log(fakeData);

const addData = (data) => {
  const ans = data.reduce(
    (str, d, index) =>
      (str += `<tr>
      <td>${index + 1}</td>
      <td><a href="${d.url}" target="_blank" rel="noopener noreferrer">${
        d.title
      }</a> <span class="delete-button"><img src="./assets/delete.svg" alt="" height="18px" width="18px"></span></td>
      <td>${d.difficulty}</td>
      <td class="${d.done ? "green" : "red"}" data-status= 'Mark as ${
        d.done ? "un-done" : "done"
      }'>${d.done ? "&#10003" : "&#10005"}</td>
    </tr>`),
    ""
  );
  return ans;
};

document.querySelector("#table-body").innerHTML = addData(fakeData);

// FILTER DOM MANIPULATION

document
  .querySelectorAll("#filter .category")
  .forEach((elem) =>
    elem.childNodes[1].addEventListener("click", (_) =>
      elem.children[1].classList.toggle("active")
    )
  );

document.querySelectorAll("#filter .category input").forEach((inp, index) => {
  inp.addEventListener("change", function () {
    if (index < 3) {
      this.checked
        ? filters.difficulty.push(this.name)
        : filters.difficulty.splice(filters.difficulty.indexOf(this.name), 1);
    } else {
      let bool = this.name == "done" ? true : false;
      this.checked
        ? filters.done.push(bool)
        : filters.done.splice(filters.done.indexOf(bool), 1);
    }
    console.log(filters);
    filterElements();
  });
});

const filters = {
  difficulty: ["easy", "medium", "hard"],
  done: [true, false],
};

const filterElements = () => {
  const filteredData = fakeData.filter((d) => {
    let bool = true;
    if (!filters.difficulty.includes(d.difficulty)) bool = false;
    if (!filters.done.includes(d.done)) bool = false;
    return bool;
  });
  document.querySelector("#table-body").innerHTML = addData(filteredData);
};

const handleUpdates = () => {
  document
    .querySelectorAll("#table-body tr td:nth-of-type(4)")
    .forEach((elem) => {
      elem.addEventListener("click", function (_) {
        console.log(this);
        // Change element
      });
    });

  document
    .querySelectorAll("#table-body tr td:nth-of-type(2)")
    .forEach((elem) => {
      elem.children[1].addEventListener("click", function () {
        // Handle delete
        console.log(elem.children[0].href);
      });
    });
};

});

