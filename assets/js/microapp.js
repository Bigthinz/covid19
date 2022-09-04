/**
* A boilerplate microapp for ayoba that implements a stub interface and debug logging on the page
*/
var debug = false;
var ready = false;
var context;
var appcontext;

// 
var chatWidget; 

// TODO: Create a wrapper for this
var currentNickname = "";
var currentPhone = "";

// This is the magic line that pushes error event to the magic console
window.onerror = function (msg, url, line, col, error) { console.log(msg, url, line, col, error); };

console.log("Starting...");
var Ayoba = getAyoba();
console.log("Starting...", document.querySelector('#logger'));


// Alternative to load event
document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
      setTimeout(initiatePage, 3000);
  }
}


function initiatePage() {
    
    console.log("DOMContentLoaded");

    if (debug) {
        console.log("Debug mode: " + debug);
        document.querySelector("#log-container").style.display = "flex";
        console.log("Hosted at: " + window.location.href);
    } else {
        document.querySelector("#log-container").style.display = "none";
    }


    if (Ayoba === null) {
        console.log("Looks like we're not inside ayoba, stubbinng the situation...");
        Ayoba = new AyobaStub();

        Ayoba.triggerNicknameChanged();

        // Hide chat
        createChatWidget();
    }
    else {
        console.log("Looks like we're in ayoba...");
        // Ayoba.triggerNicknameChanged();

        // Hide chat
        createChatWidget();
    };

    console.log("List of methods available:");
    // Trigger to obtain name
    Ayoba.triggerNicknameChanged();

    Object.getOwnPropertyNames(Ayoba).forEach((value) => {
        console.log(value);
    })

    console.log("Now let's wait till the presence is updated...")
}

/**
* This function ensures that the console output is visible to the user on the page for debugging purposes
*/
(function (logger) {
    console.old = console.log;
    console.log = function () {
        var output = "", arg, i;

        for (i = 0; i < arguments.length; i++) {
            arg = arguments[i];
            output += "<span class=\"log-" + (typeof arg) + "\">";

            if (
                typeof arg === "object" &&
                typeof JSON === "object" &&
                typeof JSON.stringify === "function"
            ) {
                output += JSON.stringify(arg);
            } else {
                output += arg;
            }

            output += "</span>&nbsp;";
        }

        logger.innerHTML += output + "<br>";
        console.old.apply(undefined, arguments);
    };
})(document.querySelector("#logger"));


/**
 * Checks if the microapp is running inside ayoba and on which OS 
 * returns the OS name or null if not running inside ayoba
 */
function getAyoba() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return null;
    }

    if (/android/i.test(userAgent)) {
        try {
            return Android;
        } catch (error) {
            return null;
        }
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return null; // todo 
    }

    return null;
}

/**
* This function is called when the microapp is loaded and ready to be used
*/
 

/**
* This function is called to close the microapp
*/
function finish() {
    console.log(Ayoba.finish());
}


function onNicknameChanged(nickname) {
    currentNickname = nickname
    console.log("USERNAME ::::",nickname)
}


/**
 * Create the chat widget and appends it to the DOM
 * @param {string} username 
 * @param {string} phone 
 */
function createChatWidget(username, phone) {


    // Wait for a few seconds to make sure Ayoba has triggered the necessary commands 
    setTimeout(function () {
    chatWidget = document.createElement("dialogflowcx-chat-widget");
    chatWidget.setAttribute("agent-id", "1f76f765-cca3-49fb-a863-3cfba218bcad");
    chatWidget.setAttribute("agent-url", "/channels/web");
    chatWidget.setAttribute("chat-title", "Vaccine Appointments");
    chatWidget.setAttribute("phonenumber", "");
    chatWidget.setAttribute("username", currentNickname);

    document.body.appendChild(chatWidget);

    // Hide loader and pop up chat widget
    document.querySelector("#loading-section").style.display = "none";

    }, 2000);

    
}

 