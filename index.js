var
  urlStart = "https://hacker-news.firebaseio.com/v0/item/",
  urlEnd   = ".json?print=pretty";

function getHN() {
  var xhr = new XMLHttpRequest();
    xhr.onload = function() {
    var data = xhr.responseText;
    var parsedData = JSON.parse(data);
    parsedData = parsedData.slice(0,25);
    for (let id of parsedData) {
      var threadUrl = urlStart + id + urlEnd;
      //console.log(threadUrl);
      getThread(threadUrl);
      //console.log(datas);
    }
  };
  xhr.open("GET", "https://hacker-news.firebaseio.com/v0/topstories.json", true);
  xhr.send();
}
//should merge in to getHN at some point...
function getThread(url) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var data = xhr.responseText;
    var parsedData = JSON.parse(data);
    console.log(parsedData);
    parseData();
  };
  xhr.open("GET", url, false);
  xhr.send();
}

function parseData() {

}

function addToPage(data) {
  
}

window.addEventListener("load", getHN());
