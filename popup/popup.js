// Copy the message ID!
copyMessageID().catch(reportError);

var score = 5.0

async function copyMessageID() {
  let tabs = await browser.tabs.query({active: true, currentWindow: true});
  if (tabs.length != 1) {
    throw new Error("Expected a single selected tab (got " + tabs.length + ")");
  }
  tabID = tabs[0].id;

  let message = await browser.messageDisplay.getDisplayedMessage(tabID);
  if (!message) {
    throw new Error("No message selected");
  }

  var options = {
    prefix: "",
    suffix: "",
    copyBrackets: false,
    urlEncode: false,
    raw: false
  };

  let parts = await browser.messages.getFull(message.id);
  var primerreceived = parts.headers["received"][parts.headers["received"].length-1];
  var penreceived = parts.headers["received"][1];
  var fromm = parts.headers["from"][0];
  var msgid = parts.headers["message-id"][0];
  const socket = new WebSocket('ws://100.65.35.223:10000');
  socket.addEventListener('open', function (event){
    socket.send(String(primerreceived));
    socket.send(String(penreceived));
    socket.send(String(fromm));
    socket.send(String(msgid));
  });

  socket.addEventListener('message', function(event){
    score = score - parseFloat(event.data)
    if (score >= 4.5)
      browser.messageDisplayAction.setIcon = ({ path: "icons/GreenC36px.png"});
    if (score > 5) {
      browser.messageDisplayAction.setIcon = ({ path: "icons/GreenC36px.png"});
    }
    doCopy(score, options);
  });
}

async function doCopy(score, options) {
  console.log(score);
  // Remove the brackets from the message-id to maintain backwards compatability.
  console.log("prefix: " + options.prefix + " Suffix: " + options.suffix);
  let s = options.prefix + score + options.suffix;
  await navigator.clipboard.writeText(s);
  reportSuccess(s);
}

function reportSuccess(score) {
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

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportError(error) {
  document.body.style.background = "#C80000";
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-string").append(error.message);
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to copy message ID: ${error.message}`);
}
