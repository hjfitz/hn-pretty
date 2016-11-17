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
  //Can I please learn how to parse time nicer
  addToPage(title,url,score,dateAdded);
}

function addToPage(title,link,score,time) {
  var
   newLink          = document.createElement("a"),
   postScore        = document.createElement("p"),
   timeAdded        = document.createElement("p"),
   postContainer    = document.createElement("div"),
   row              = document.createElement("div"),
   col              = document.createElement("div"),
   card             = document.createElement("div"),
   content          = document.createElement("div"),
   titleS           = document.createElement("span")
  ;

  postContainer.id     = "post card";
  newLink.className   += "link";
  postScore.className += "score";
  timeAdded.className += "time";
  row.className        = "row";
  col.className        = "col s12 m12";
  card.className       = "card";
  content.className    = "card-content";
  titleS.className     = "card-title";

  titleS.textContent = title;

  newLink.href = link;

  postScore.textContent = "Score: " + score;

  timeAdded.textContent = "Time Submitted: " + time;

  newLink.appendChild(titleS);

  content.appendChild(newLink);
  content.appendChild(postScore);
  content.appendChild(timeAdded);

  card.appendChild(content);
  col.appendChild(card);
  row.appendChild(col);

  window.container.appendChild(row);
}
window.addEventListener("load", getHN());
