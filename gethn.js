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
      console.log(id);
      getThread(threadUrl, id);
      //console.log(datas);
    }
  };
  xhr.open("GET", "https://hacker-news.firebaseio.com/v0/topstories.json", true);
  xhr.send();
}

//should merge in to getHN at some point...
function getThread(url, urlId) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var data = xhr.responseText;
    var parsedData = JSON.parse(data);
    //console.log(parsedData);
    parseData(parsedData, urlId);
  };
  xhr.open("GET", url, false);
  xhr.send();
}

function parseData(data, urlId) {
  var
    title = data.title,
    url = data.url,
    score = data.score,
    comments = data.descendants,
    commentUrl = "https://news.ycombinator.com/item?id=" + urlId
  ;

  addToPage(title,url,score,comments,commentUrl);
}

function addToPage(title,link,score,commentCount,commentUrl) {
  var
   newLink          = document.createElement("a"),
   postScore        = document.createElement("p"),
   comments         = document.createElement("a"),
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
  comments.className  += "comments";
  row.className        = "row";
  col.className        = "col s12 m12";
  card.className       = "card";
  content.className    = "card-content";
  titleS.className     = "card-title";

  titleS.textContent = title;

  newLink.href = link;

  postScore.textContent = "Score: " + score;

  comments.textContent = "Comments: " + commentCount;
  comments.href = commentUrl;

  newLink.appendChild(titleS);

  content.appendChild(newLink);
  content.appendChild(postScore);
  content.appendChild(comments);

  card.appendChild(content);
  col.appendChild(card);
  row.appendChild(col);

  window.container.appendChild(row);
}
window.addEventListener("load", getHN());
console.log("console works");
