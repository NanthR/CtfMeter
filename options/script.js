// class Writeup {
//   title;
//   url;

// }

// chrome.storage.sync.get(["key"], function (result) {
//   console.log("Value currently is " + result.key);
// });

const fakeData = [
  {
    url: "https://google.co.in",
    name: "Bookmark 1",
    finished: false,
    difficulty: "hard", // hard / medium / easy
  },
  {
    url: "https://google.co.in",
    name: "Bookmark 2",
    finished: true,
    difficulty: "easy", // hard / medium / easy
  },
  {
    url: "https://google.co.in",
    name: "Bookmark 3",
    finished: false,
    difficulty: "medium", // hard / medium / easy
  },
  {
    url: "https://google.co.in",
    name: "Bookmark 4",
    finished: true,
    difficulty: "easy", // hard / medium / easy
  },
  {
    url: "https://google.co.in",
    name: "Bookmark 5",
    finished: false,
    difficulty: "hard", // hard / medium / easy
  },
  {
    url: "https://google.co.in",
    name: "Bookmark 6",
    finished: false,
    difficulty: "hard", // hard / medium / easy
  },
  {
    url: "https://google.co.in",
    name: "Bookmark 7",
    finished: false,
    difficulty: "hard", // hard / medium / easy
  },
  {
    url: "https://google.co.in",
    name: "Bookmark 8",
    finished: false,
    difficulty: "hard", // hard / medium / easy
  },
  {
    url: "https://google.co.in",
    name: "Bookmark 9",
    finished: false,
    difficulty: "hard", // hard / medium / easy
  },
  {
    url: "https://google.co.in",
    name: "Bookmark 10",
    finished: false,
    difficulty: "hard", // hard / medium / easy
  },
];

const addData = (data) => {
  const ans = data.reduce(
    (str, d, index) =>
      (str += `<tr>
      <td>${index + 1}</td>
      <td><a href="${d.url}" target="_blank" rel="noopener noreferrer">${
        d.name
      }</a></td>
      <td>${d.difficulty}</td>
      <td class="${d.finished ? "green" : "red"}">${
        d.finished ? "&#10003" : "&#10005"
      }</td>
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
      let bool = this.name == done ? true : false;
      this.checked
        ? filters.finished.push(bool)
        : filters.finished.splice(filters.finished.indexOf(bool), 1);
    }
    console.log(filters);
    filterElements();
  });
});

const filters = {
  difficulty: ["easy", "medium", "hard"],
  finished: [true, false],
};

const filterElements = () => {
  const filteredData = fakeData.filter((d) => {
    let bool = true;
    if (!filters.difficulty.includes(d.difficulty)) bool = false;
    if (!filters.finished.includes(d.finished)) bool = false;
    return bool;
  });
  document.querySelector("#table-body").innerHTML = addData(filteredData);
};
