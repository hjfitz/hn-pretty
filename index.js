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
    //console.log(parsedData);
    parseData(parsedData);
  };
  xhr.open("GET", url, false);
  xhr.send();
}

function parseData(data) {
  var title = data.title;
  var url = data.url;
  var score = parseInt(data.score);
  var added = parseInt(data.time);
  var dateAdded = new Date(added);
  //dateAdded = dateAdded.setUTCSeconds(added);
  //console.log(dateAdded);
  //console.log(title);
  addToPage(title,url,score,dateAdded);
}

function addToPage(title,link,score,time) {
  var heading          = document.createElement("h1");
  var newLink          = document.createElement("a");
  var postScore        = document.createElement("p");
  var timeAdded        = document.createElement("p");

  var postContainer    = document.createElement("div");
  //var container        = window.container;

  postContainer.id     = "post";
  newLink.className   += "link";
  postScore.className += "score";
  timeAdded.className += "time";

  heading.textContent = title;
  newLink.href = link;
  newLink.textContent = "link";
  postScore.textContent = score;
  timeAdded.textContent = time;

  postContainer.appendChild(heading);
  postContainer.appendChild(newLink);
  postContainer.appendChild(postScore);
  postContainer.appendChild(timeAdded);

  window.container.appendChild(postContainer);
  console.log("oioi");
}

window.addEventListener("load", getHN());
