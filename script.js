const matches = document.documentElement.getElementsByTagName('a');
console.log(matches.length);
// chrome.runtime.sendMessage({
//   url: window.location.href,
//   count: matches.length
// })