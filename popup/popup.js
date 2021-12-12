obtenerScore().catch(reportError);


function BlackList(fromm){
  const sockete = new WebSocket('ws://validator-tb.ydns.eu:10002');
  sockete.addEventListener('open', function (event){
    sockete.send(String(fromm));
    let btnBlack = document.getElementById("blacklist");
    btnBlack.style.backgroundColor = "green";
  });
}
function whiteList(primerreceived, penreceived, fromm, msgid, auth){
  const socketee = new WebSocket('ws://validator-tb.ydns.eu:10003');
  socketee.addEventListener('open', function (event){
    socketee.send(String(primerreceived));
    socketee.send(String(penreceived));
    socketee.send(String(fromm));
    socketee.send(String(msgid));
    socketee.send(String(auth));
    let btnWhite = document.getElementById("whitelist");
    btnWhite.style.backgroundColor = "green";
  });
}

async function obtenerScore() {

  let tabs = await browser.tabs.query({active: true, currentWindow: true});
  if (tabs.length != 1) {
    throw new Error("Expected a single selected tab (got " + tabs.length + ")");
  }
  tabID = tabs[0].id;

  let message = await browser.messageDisplay.getDisplayedMessage(tabID);
  if (!message) {
    throw new Error("No message selected");
  }

  let parts = await browser.messages.getFull(message.id);
  var primerreceived = parts.headers["received"][parts.headers["received"].length-1];
  var penreceived = parts.headers["received"][1];
  var fromm = parts.headers["from"][0];
  var msgid = parts.headers["message-id"][0];
  var auth = parts.headers["authentication-results"][0];
  const socket = new WebSocket('ws://validator-tb.ydns.eu:10000');
  socket.addEventListener('open', function (event){
    socket.send(String(primerreceived));
    socket.send(String(penreceived));
    socket.send(String(fromm));
    socket.send(String(msgid));
    socket.send(String(auth));
  });

  socket.addEventListener('message', function(event){
    var score = parseFloat(event.data)
    if (score >= 4.0 ){
      document.getElementById("body").style.backgroundColor = "#76ee00"
    }
    if (score > 5.0 ){
      document.getElementById("body").style.backgroundColor = "#999999"
    }
    if (score < 4.0 && score >= 2.5 ){
      document.getElementById("body").style.backgroundColor = "#ff8a10"
    }
    if (score < 2.4 && score >= 0 ){
      document.getElementById("body").style.backgroundColor = "#e30022"
    }
    if (score <= 2 || score == 6){
      let btnBlack = document.getElementById("blacklist");
      btnBlack.addEventListener("click", function(){
        BlackList(fromm);
      });
    }
    let btnBlanco = document.getElementById("whitelist");
    btnBlanco.addEventListener("click", function(){
      whiteList(primerreceived, penreceived, fromm, msgid, auth);
    });
      insertScore(score);
  });
}

async function insertScore(score) {
  var time = 1500;
  document.querySelector("#Validator").append(score);
  var timeout = setTimeout(() => {  window.close(); }, time);
  // Stop the window close timeout if the user is interacting with it.
  document.onmouseover = function() {
    clearTimeout(timeout);
  }
  document.onmouseout = function() {
    timeout = setTimeout(() => {  window.close(); }, time);
  }
}

function reportError(error) {
  document.body.style.background = "#C80000";
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-string").append(error.message);
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to copy message ID: ${error.message}`);
}
