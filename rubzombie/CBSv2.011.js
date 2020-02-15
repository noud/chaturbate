// ==ClosureCompiler==
// @output_file_name default.js
// @compilation_level ADVANCED_OPTIMIZATIONS
// @externs_url https://raw.githubusercontent.com/google/closure-compiler/master/contrib/externs/jquery-1.6.js
// @js_externs var cbjs = { "arrayContains": function () {}, "arrayJoin": function () {}, "arrayRemove": function () {} }
// @js_externs var old_cb = { "changeRoomSubject": function () {}, "chatNotice": function () {}, "drawPanel": function () {}, "in_show": function () {}, "limitCam_addUsers": function () {}, "limitCam_allUsersWithAccess": function () {}, "limitCam_isRunning": function () {}, "limitCam_removeAllUsers": function () {}, "limitCam_removeUsers": function () {}, "limitCam_start": function () {}, "limitCam_stop": function () {}, "limitCam_userHasAccess": function () {}, "log": function () {}, "onDrawPanel": function () {}, "onEnter": function () {}, "onLeave": function () {}, "onMessage": function () {}, "onShowStatus": function () {}, "onTip": function () {}, "room_slug": {}, "sendNotice": function () {}, "setTimeout": function () {}, "settings": function () {}, "settings_choices": function () {}, "show_message": {}, "show_users": function () {}, "slot": function () {}, "tipOptions": function () {} }
// @js_externs var cb = { "app_id": {}, "cancelTimeout": function () {}, "changeRoomSubject": function () {}, "chatNotice": function () {}, "drawPanel": function () {}, "limitCam_addUsers": function () {}, "limitCam_allUsersWithAccess": function () {}, "limitCam_isRunning": function () {}, "limitCam_removeAllUsers": function () {}, "limitCam_removeUsers": function () {}, "limitCam_start": function () {}, "limitCam_stop": function () {}, "limitCam_userHasAccess": function () {}, "log": function () {}, "onDrawPanel": function () {}, "onEnter": function () {}, "onLeave": function () {}, "onMessage": function () {}, "onTip": function () {}, "panCam_controlsDisabled": {}, "panCam_controlsEnabled": {}, "panCam_isValidDirection": function () {}, "panCam_move": function () {}, "panCam_onPanelButtonClicked": function () {}, "room_slug": {}, "sendNotice": function () {}, "setTimeout": function () {}, "settings": { "slot": {} }, "settings_choices": {}, "slot": {}, "tipOptions": function () {} }
// ==/ClosureCompiler==
/*jslint ass: true, vars: true, sub: true, nomen: true, plusplus: true, regexp: true, indent: 2, white: true */
/*global window, document, console, alert, setInterval, clearInterval, setTimeout, clearTimeout, unescape, cb:false, exports:false */
/**
 * @author rubzombie
 */
const app = "CBS";
const sDesc = "CB app/bot data Save/restore";
const sVer = "20171104.011";
const debug = false;
const persist = true; // persist element additions, i.e. don't reload the jquery/alertifyjs/fontawesome libraries each time
const ver = "v2";
const sSig = app + "::" + ver + "::" + sDesc + "::" + sVer + (debug ? "::Debug" : "::Release");
const magicnumber = app + ver;
const id = magicnumber + "Overlay";
const chunk_size = 512;
const yield_delay = 1;
/*javascript:*//*** CB app/bot data Save'n'restore bookmarklet v2 ***/(function () {
  "use strict";
  // Enable the passage of the 'this' object through the JavaScript timers
  window["__nativeST__"] = window["__nativeST__"] || window["setTimeout"];
  window["__nativeSI__"] = window["__nativeSI__"] || window["setInterval"];
  window["setTimeout"] = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */ ) {
    var oThis = this,
      aArgs = Array.prototype.slice.call(arguments, 2);
    return window["__nativeST__"](vCallback instanceof Function ? function () {
      vCallback.apply(oThis, aArgs);
    } : vCallback, nDelay);
  };
  window["setInterval"] = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */ ) {
    var oThis = this,
      aArgs = Array.prototype.slice.call(arguments, 2);
    return window["__nativeSI__"](vCallback instanceof Function ? function () {
      vCallback.apply(oThis, aArgs);
    } : vCallback, nDelay);
  };
}());
(function (window, document, version, app_callback) {
  "use strict";
  window[app] = { "version": sSig };
  /*** jQuery/alertifyjs/font-awesome preloader v3, startof ***/
  version = version || "1";
  app_callback = app_callback || function (a, b, c, d, cont) {
    setTimeout(cont, 10000, a, b, c, d);
  };
  const root = "//cdn.jsdelivr.net/alertifyjs/1.4.1/";
  var element = document.getElementById(id), // NB. element is re-cycled after first use
    cleanup = [],
    $,
    $_loaded = false,
    ajs,
    ajs_loaded = false,
    alertify,
    state;
  //
  /**
  * @param {Array<Function>} tasks
  * @param {number=} idx
  */
  function run(tasks, idx) {
    idx = idx || 0;
    tasks[idx++]((function next(tasks, idx) {
      return function () { // NB. this closure may be unnecessary, but better safe than sorry
        if (idx < tasks.length) {
          window.setTimeout(function () {
            run(tasks, idx);
          }, yield_delay);
        }
      };
    }(tasks, idx)));
  }
  // retrict to *chaturbate.com and prevent multiple instances
  if (!/(github|camgasm|chaturbate)\.(io|com)$/i.test(document.location.hostname)) {
    window.alert("*chaturbate.com, *.camgasm.com and github.io only bookmarklet");
  } else if (!element) {
    run([
      function (cont) {
        /**/
        // splash screen
        //var style = ("<style>." + magicnumber + "-no-overflow {overflow:hidden!important;outline:0;}${visibility:visible;position:fixed;top:0;left:0;height:100%;width:100%;z-index:10;background-color:rgba(0,0,0,0.05);}$ div {visibility:visible;width:300px;margin:100px auto;background-color:#fff;border:1px solid #000;padding:15px;text-align:center;}</style>").replace(/\$/g, "#" + id);
        var style = ("<style>." + magicnumber + "-no-overflow {overflow:hidden!important;outline:0;}${visibility:visible;position:fixed;top:0;right:0;left:0;bottom:0;overflow-y:auto;padding:0;z-index:10;background-color:rgba(0,0,0,0.05);}$ div {visibility:visible;width:300px;margin:100px auto;background-color:#fff;border:1px solid #000;padding:15px;text-align:center;}</style>").replace(/\$/g, "#" + id);
        //
        if (debug) {
          console.log(">do overlay and splash screen");
        }
        element = document.createElement("div");
        element.setAttribute("id", id);
        element.style.display = "block";
        element.innerHTML = style + "<div>Starting...</div>";
        document.body.appendChild(element);
        document.body.classList.add(magicnumber + "-no-overflow");
        cleanup.push(element);
        setTimeout(function () {
          cont();
        }, 1000);
      },
      function (cont) {
        if (debug) {
          console.log(">do jquery load");
        }
        $ = window.jQuery;
        if ($ && version <= $.fn.jquery) {
          cont();
        } else {
          element = document.createElement("script");
          element.type = "text/javascript";
          element.src = "//ajax.googleapis.com/ajax/libs/jquery/" + version + "/jquery.min.js";
          element.onload = element.onreadystatechange = function () {
            state = this.readyState;
            if (!$_loaded && (!state || state === "loaded" || state === "complete")) {
              ($ = window.jQuery).noConflict($_loaded = true);
              if (debug) {
                console.log("loaded: " + element.src);
              }
              // Handle memory leak in IE
              element.onload = element.onreadystatechange = null;
              cont();
            }
          };
          //document.head.appendChild(element);
          document.documentElement.childNodes[0].appendChild(element);
          if (!persist) {
            cleanup.push(element);
          }
        }
      },
      function (cont) {
        if (debug) {
          console.log(">do stylesheet load(s)");
        }
        // Loading style definitions
        [
          [root + "css/alertify.min.css", "alertify-notifier ajs-left", "left", "10px"],
          [root + "css/themes/default.min.css"], // note no adequate test for theme stylesheet, so just test for file presence
          ["//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css", "fa", "font-family", "FontAwesome"]
        ].forEach(function (val) {
          function testStyleRule(url, name, css, value) {
            var dummy = $("<div>").hide().css({
                height: 0,
                width: 0
              }).addClass(name || "").appendTo("body"),
              res = dummy.css(css || "") === value; // true if name css and value are all undefined
            //
            dummy.remove();
            return $("link[rel=\"stylesheet\"][href$=\"" + url.match(/(?:\/)[^\/]+$/) + "\"]").length && res;
          }
          if (!testStyleRule.apply(null, val)) {
            element = document.createElement("link");
            element.setAttribute("rel", "stylesheet");
            element.setAttribute("href", val[0]);
            document.head.appendChild(element);
            if (debug) {
              console.log("loaded: " + val[0]);
            }
            if (!persist) {
              cleanup.push(element);
            }
          }
        });
        cont();
      },
      function (cont) {
        if (debug) {
          console.log(">do alertifyjs load");
        }
        // check for alertifyjs else Load the script and when it's ready run the cont callback.
        ajs = window["alertify"];
        if (ajs && ajs["dialog"]) {
          cont();
        } else {
          // Load the script and when it's ready loading run the cont callback.
          // BEWARE. recycling element and state var
          element = document.createElement("script");
          element.src = root + "alertify.min.js";
          // Attach handlers for all browsers
          element.onload = element.onreadystatechange = function () {
            state = this.readyState;
            if (!ajs_loaded && (!state || state === "loaded" || state === "complete")) {
              alertify = window["alertify"];
              window["alertify"] = ajs;
              ajs = alertify;
              ajs_loaded = true;
              if (debug) {
                console.log("loaded: " + element.src);
              }
              // Handle memory leak in IE
              element.onload = element.onreadystatechange = null;
              cont();
            }
          };
          //document.head.appendChild(element);
          document.documentElement.childNodes[0].appendChild(element);
          if (!persist) {
            cleanup.push(element);
          }
        }
      },
      function (cont) {
        if (debug) {
          console.log(">clear splash screen, after 3s delay");
        }
        setTimeout(function () {
          var child = document.querySelector("#" + id + " div");
          if (child) {
            child.style.visibility = "hidden";
          }
        }, 3000);
        cont();
      },
      function (cont) {
        if (debug) {
          console.log(">run app");
        }
        app_callback($, $_loaded, ajs, ajs_loaded, cont);
      },
      function (cont) {
        if (debug) {
          console.log(">schedule alertifyjs remnants removal");
        }
        // delay alertify remnants removal, so as not to interfere with alertifyjs's own cleanup process
        if (ajs_loaded) {
          setTimeout(function () {
            Array.prototype.slice.call(document.querySelectorAll("div[class*=\"alertify-\"],div[class*=\"ajs-\"]")).forEach(function (node) {
              node.parentElement.removeChild(node);
            });
          }, 2000);
        }
        cont();
      },
      function (cont) {
        if (debug) {
          console.log(">do final cleanup, remove any added script and link tags");
        }
        // final cleanup
        cleanup.forEach(function (element) {
          element.parentNode.removeChild(element);
        });
        document.body.classList.remove(magicnumber + "-no-overflow");
        cont();
      }
    ]);
  }
  /*** jQuery/alertifyjs/font-awesome preloader v3, endof ***/
}(window, document, "1.6.4", function ($, $L, alertify, alertifyL, complete) {
  // CBS alertifyjs'd app/bot data combined save/restorer
  "use strict";
  if (debug) {
    console.log("jQuery loaded: ", $L, " AlertifyJS loaded: ", alertifyL);
  }
  const post_timeout_delay = 5 * 1000; // msec
  const autosave_interval_delay = (debug ? 1 : 3) * 60 * 1000; // msec
  const retry_max = 5;
  const retry_delay = 1000; // msec
  const notify_delay = 3; // sec
  var _alert,
    confirm,
    dialog,
    div = $("<div class=" + magicnumber + "_buttons></div>"),
    style = $("<style>.$_buttons{margin:0 auto;padding:10px 20px;}.$_buttons button{display:block;width:100%;margin:5px 0;}.$_buttons input[type=checkbox][disabled] + label{color: #ccc;}</style>".replace(/\$/g, magicnumber)),
    slots = ["Active App", "Bot #1", "Bot #2", "Bot #3"];
  /** @type {Object} */
  var apps = ["", "", "", ""];
  var ops = {
      4: "Query",
      6: "Save",
      7: "Restore"
    },
    ls = window["localStorage"],
    saves,
    timestamp,
    data,
    post_timeout = null,
    reTag = new RegExp("^\\/#[0-3]" + magicnumber + "\\/"); // NB. this must match reTag definition below
  //
  function inChat() {
    return ((window["ws_handler"] && window["ws_handler"]["connected"]) || (window["websocket_handler"] && window["websocket_handler"]["connected"]) || (window["flash_handler"] && window["flash_handler"]["connected"]) || (window["html_handler"] && window["html_handler"]["connected"]));
  }
  function ts() {
    var a = new Date(),
      b = /(..)(:..)(:..)/.exec(a),
      c = b[1] % 12 || 12; // NB.NB.NB. must manually insert space or convert to hex number format after ClosureCompiler optimization, as %12 will be interpreted as an escape character, in a bookmarklet! see "Uncaught SyntaxError: Unexpected token ILLEGAL"
    return " " + (10 > c ? "0" + c : c) + b[2] + b[3] + " " + (12 > b[1] ? "A" : "P") + "M " + a.getTime().toString().slice(-3);
  }
  window[magicnumber + "_autosave_interval"] = window[magicnumber + "_autosave_interval"] || null;
  if (window[magicnumber + "_autosave_interval"]) {
    window.clearInterval(window[magicnumber + "_autosave_interval"]); // temporarily suspend autosave while CBS menu open
    if (debug) {
      console.log(ts() + ": AutoSave suspended");
    }
  }
  window[magicnumber + "_ping"] = window[magicnumber + "_ping"] || null;
  //apps["enm"] = function (fn, cb) { // enumerate function
  /**
  * @this {Object}
  */
  Array.prototype["enm"] = Array.prototype["enm"] || function (fn, cb) { // enumerate function fn over an Array and call cb on completion
    this["idx"] = ++this["idx"] || 0;
    if (arguments.length) {
      this["fn"] = fn || null;
      this["cb"] = cb || null;
    }
    if (this["idx"] < this.length) {
      if (this["fn"]) {
        this["fn"]["call"](this);
      }
    } else {
      delete this["idx"];
      if (this["cb"]) {
        this["cb"]["call"](this);
      }
    }
  };
  function setDialog(content) {
    div.empty().append(style, $("<p>" + content + "</p>"));
    if (dialog && dialog["isOpen"]()) {
      dialog["setContent"](div[0])["set"]("closable", true);
    }
  }
  function closeDialog() {
    if (debug) {
      console.log(ts() + ": closeDialog", dialog, dialog["isOpen"]());
    }
    if (dialog && dialog["isOpen"]()) {
      dialog["close"]()["set"]("closable", true);
    }
  }
  alertify.set("notifier", "delay", notify_delay);
  //alertify.set("notifier", "callback", closeDialog); // NB. this doesn't work. see alertifyjs source code. only set position or delay. 'arse! so...
  function success(message) {
    alertify["success"](message)["callback"] = closeDialog;
  }
  function error(message) {
    alertify["error"](message)["callback"] = closeDialog;
  }
  /*function notify(message) {
    alertify["notify"](message)["callback"] = closeDialog;
  }*/
  function postChat(message) {
    if (debug) {
      console.log(ts() + "> " + JSON.stringify(window[magicnumber + "_ping"]) + " | " + JSON.stringify(message));
    }
    var op = ops[window[magicnumber + "_ping"].split("/").length],
      handler;
    window["$message_sender"]["confirmed_send"] = true; // avoid first-post hurdle
    // @ref *_handler.message_outbound.send_room_message
    if ((handler = window["flash_handler"]) !== undefined && handler["connected"]) {
      handler["consolelog"]("User is sending message: " + message);
      message = $.toJSON({
        "m": message,
        "c": "",
        "f": ""
      });
      handler["consolelog"](message);
      window["GetFlashObject"]("movie")["SendRoomMsg"](message);
    } else if ((handler = window["html_handler"]) !== undefined && handler["connected"]) {
      handler["consolelog"]("User is sending message: " + message);
      message = $.toJSON({
        "m": message,
        "c": "",
        "f": ""
      });
      handler["consolelog"](message);
      // either
      //handler["post_html_chat"](message);
      // or, this if we don't want any spurious alert popups alarming the user ;)
      $.ajax({
        "url": handler["post_address"],
        "dataType": "json",
        "data": {
          "room": handler["room_owner_nick"],
          "message": message,
          "username": handler["user"]
        },
        "type": "POST",
        "success": function (response) {
          if (response === "") {
            if (debug) {
              error("An error occurred");
            }
            return;
          }
          if (response["X-Spam"]) {
            handler["message_inbound"]["on_room_message"](handler["user"], message);
          }
        }
      });
    } else if ((handler = window["websocket_handler"]) !== undefined && handler["connected"]) {
      handler["connection"]["send"](JSON.stringify({
        'action': 'msg',
        'msg': message
      }));
    } else if ((handler = window["ws_handler"]) !== undefined && handler["connected"]) {
      handler["consolelog"]("User is sending message: " + message);
      var message = $.toJSON({
        "m": message,
        "c": "",
        "f": ""
      });
      handler["consolelog"](message);
      handler["SendRoomMsg"](message);
    } else {
      if (debug) {
        console.log(ts() + ": \"" + op + "\" Failed. Not connected.");
      }
      if (window[magicnumber + "_autosave_interval"]) {
        apps["enm"]();
      } else {
        setDialog(op + " Failed. Chat may be disconnected.");
      }
    }
    //} // else if no handler, no message will be posted and ping will timeout
  }
  function qryApps() {
    var self = this;
    var $app = $(".stop_link[name=\"/app/stop/" + self["idx"] + "/\"]");
    self[self["idx"]] = $app.length ? $app[0].parentNode.previousElementSibling.innerHTML.trim() : "";
    if (self[self["idx"]].length && inChat()) {
      window[magicnumber + "_ping"] = ["", "#" + self["idx"] + magicnumber, timestamp, ""].join("/");
      postChat(window[magicnumber + "_ping"]);
      post_timeout = setTimeout.call(self, function () {
        // if ?? qry times out, app is most likely not CBS aware, so blank it and move on
        this[this["idx"]] = "";
        this["enm"]();
      }, post_timeout_delay);
    } else {
      self["enm"]();
    }
  }
  function onPostTimeout() {
    var op = ops[window[magicnumber + "_ping"].split("/").length];
    post_timeout = null;
    if (debug) {
      console.log(ts() + ": \"" + op + "\" Failed. Post timed-out."); // ie. the posted ping did not show up in chat yet
    }
    if (window[magicnumber + "_autosave_interval"]) {
      apps["enm"]();
    } else {
      setDialog(op + " Failed. Chat may be unresponsive.");
    }
  }
  /**
  * @param {number} slot
  * @param {number=} start
  */
  function txData(slot, start) {
    var chunk;
    start = start || 0;
    chunk = data.slice(start, start + chunk_size);
    window[magicnumber + "_ping"] = ["", "#" + slot + magicnumber, timestamp, start, chunk, chunk.length, ""].join("/");
    postChat(window[magicnumber + "_ping"]);
    post_timeout = setTimeout(onPostTimeout, post_timeout_delay);
  }
  /**
  * @param {number} slot
  * @param {number=} start
  */
  function rxData(slot, start) {
    start = start || 0;
    window[magicnumber + "_ping"] = ["", "#" + slot + magicnumber, timestamp, start, ""].join("/");
    postChat([window[magicnumber + "_ping"], ""].join("/"));
    post_timeout = setTimeout(onPostTimeout, post_timeout_delay);
  }
  function autosaveApps() {
    var self = this;
    if (self[self["idx"]].length && inChat() && window[magicnumber + "_autosave_interval"]) {
      if (debug) {
        console.log(ts() + ": " + "AutoSave \"" + slots[self["idx"]] + "\"");
      }
      rxData(self["idx"]);
    } else {
      self["enm"]();
    }
  }
  /**
  * @param {Function=} cb
  */
  function onAutoSave(cb) {
    function onAutoSaved() {
      if (debug) {
        console.log(ts() + ": AutoSave: onAutoSaved: retry: " + onAutoSave.retry);
      }
      if (!onAutoSave.saving) {
        cb.call(this);
      } else if (--onAutoSave.retry) {
        setTimeout(onAutoSaved, retry_delay);
      } else {
        if (debug) {
          console.log(ts() + ": AutoSave: onAutoSaved: Failed. retry timed-out.");
        }
        cb.call(this);
      }
    }
    if (window[magicnumber + "_autosave_interval"]) {
      if (!onAutoSave.saving) {
        onAutoSave.saving = true;
        if (!$("#" + id).length) { // don't autosave while overlay exists, ie. dialog is open
          if (debug) {
            console.log(ts() + ": AutoSave: " + JSON.stringify(apps));
          }
          apps["enm"](qryApps, function () {
            timestamp = (new Date()).valueOf();
            apps["enm"](autosaveApps, function () {
              onAutoSave.saving = false;
              if (cb) {
                cb.call(this);
              }
            });
          });
        } else { // shouldn't be reachable, as onAutoSave shouldn't be being called while menu is up
          if (debug) {
            console.log(ts() + "! Missed AutoSave. CBS Menu open.");
          }
        }
      } else if (cb) { // only need to wait if there is a callback
        onAutoSave.retry = retry_max;
        setTimeout(onAutoSaved, retry_delay);
      }
    } else if (cb) {
      cb.call(this);
    }
  }
  function getSaves() {
    var a, i;
    //
    saves = [];
    for (i = 0; i < ls.length; i++) {
      a = ls.key(i).split("/");
      while (a.length > 4) { // deal with appnames that include '/'
        a[1] = [a[1]].concat(a.splice(2, 1)).join("/");
      }
      if (a.length === 4 && a[0] === magicnumber/* && apps.indexOf(a[1]) !== -1*/) {
        saves.push(a.concat(ls.key(i), [
          a[1], // appname
          (new Date(parseInt(a[3], 10))).toLocaleString(), // timestamp
          slots[parseInt(a[2], 10)] // slot
        ].join(" ")));
      }
    }
  }
  //
  // v2.1
  // obj.m transformations
  // Qr /[_tag]/[timestamp]/ => /[_tag]/[timestamp]/?
  // a.length === 4 && a[3] === "" => a.length === 4 && a[3] !== ""
  // Sv /[_tag]/[timestamp]/[start]// => /[_tag]/[timestamp]/[start]/[sent]/[sent.length]
  // a.length === 6 && a[5] === "" => a.length === 6 && a[5] !== ""
  // Ld /[_tag]/[timestamp]/[start]/[sent]/[sent.length]/ => /[_tag]/[timestamp]/[start]/[sent]/[sent.length]/[received.length]
  // a.length === 7 && a[6] === "" => a.length === 7 && a[6] !== ""
  //
  function onRestore(msg_hdr, msg_tag, msg_timestamp, msg_data_start, msg_data, msg_data_length, msg_data_received_length) {
    if (debug) {
      console.log(ts() + ": " + "onRestore: hdr, ts: ", msg_hdr, msg_timestamp);
    }
    var slot = parseInt(msg_tag[1], 10);
    if (debug) {
      console.log(ts() + ": onRestore: ", msg_data.length, msg_data_length, msg_data_received_length);
    }
    if (msg_data) {
      txData(slot, parseInt(msg_data_start, 10) + parseInt(msg_data_received_length, 10));
    } else {
      //success("Restored."); // let CBS enabled app/bot report success
      closeDialog();
    }
  }
  function destroyClickedElement(event) {
    document.body.removeChild(event.target);
  }
  function saveAsFile(key, data) {
    var blob = new window["Blob"]([JSON.stringify({
      "key": key,
      "value": data
    })], {
      "type": "application/json"
    });
    var fileName = key.split("/").slice(0, -1).join("_") + ".json";
    var downloadLink = document.createElement("a");
    downloadLink.download = fileName;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL !== null) {
      // Chrome allows the link to be clicked
      // without actually adding it to the DOM.
      downloadLink.href = window.webkitURL.createObjectURL(blob);
    } else {
      // Firefox requires the link to be added to the DOM
      // before it can be clicked.
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.onclick = destroyClickedElement;
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
    }
    downloadLink.click();
  }
  function loadFromFile(target_slot) {
    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = function (event) {
      var file = event.target.files[0];
      var reader = new window["FileReader"]();
      reader.onload = function (fileLoadedEvent) {
        var loaded = JSON["parse"](fileLoadedEvent.target.result);
        var a = (loaded["key"] || "").split("/");
        while (a.length > 4) { // deal with appnames that include '/'
          a[1] = [a[1]].concat(a.splice(2, 1)).join("/");
        }
        if (a.length === 4 && a[0] === magicnumber && a[1] === apps[target_slot]) {
          data = loaded["value"];
          txData(target_slot);
        } else {
          //setDialog("\"" + file["name"] + "\" does not contain \"" + apps[target_slot] + "\" save data."); // can't use dialog, cos it's closed by now
          alert("\"" + file["name"] + "\" does not contain \"" + apps[target_slot] + "\" save data.");
        }
      };
      reader.readAsText(file, "UTF-8");
      if (event.target.parentNode) {
        event.target.parentNode.removeChild(event.target);
      }
    };
    if (window.webkitURL !== null) { // yeah, it's an empty block, jslint. so what? it'll get compiled out.
      // Chrome allows the elements to be clicked
      // without actually adding them to the DOM.
    } else {
      // Firefox requires them to be added to the DOM
      // before they can be clicked.
      fileInput.style.display = "none";
      document.body.appendChild(fileInput); // potential memory leak if user cancels file open dialog
    }
    fileInput.click();
  }
  function onSave(msg_hdr, msg_tag, msg_timestamp, msg_data_start, msg_data, msg_data_length) {
    if (debug) {
      console.log(ts() + ": " + "onSave: hdr, ts: ", msg_hdr, msg_timestamp);
    }
    var i,
      slot = parseInt(msg_tag[1], 10),
      found = -1;
    function okSave() {
      var key = [magicnumber, apps[slot], slot, msg_timestamp].join("/"); // magicnumber/appname/slot/timestamp
      if (debug) {
        console.log(ts() + ": onSave: " + (window[magicnumber + "_autosave_interval"] ? "Auto" : "") + "Saved.");
      }
      if (ls[magicnumber + "_use_local_storage"] !== "false") {
        ls[key] = data;
        if (window[magicnumber + "_autosave_interval"]) {
          apps["enm"]();
        } else {
          success("Saved.");
        }
      } else {
        saveAsFile(key, data);
        closeDialog();
      }
    }
    function okOverwrite() {
      ls["removeItem"](saves[found][4]);
      okSave();
    }
    if (debug) {
      console.log(ts() + ": onSave: ", msg_data.length, parseInt(msg_data_length, 10));
    }
    if (msg_data_start === "0") {
      data = msg_data;
    } else {
      data += msg_data;
    }
    if (msg_data) {
      rxData(slot, data.length);
    } else {
      if (data.length) {
        if (ls[magicnumber + "_use_local_storage"] !== "false") {
          if (window[magicnumber + "_autosave_interval"]) {
            getSaves();
          }
          for (i = 0; i < saves.length; i++) {
            if (msg_tag[1] === saves[i][2] && apps[slot] === saves[i][1]) {
              found = i;
              break;
            }
          }
          if (found > -1) {
            if (window[magicnumber + "_autosave_interval"]) {
              okOverwrite();
            } else {
              confirm("Confirm Overwrite...", "Overwrite existing \"" + saves[found][5] + "\" saved data?", okOverwrite, function () {
                if (debug) {
                  console.log(ts() + ": Overwrite cancelled.");
                }
                error("Overwrite cancelled.");
              });
            }
          } else {
            okSave();
          }
        } else {
          okSave();
        }
      } else {
        if (debug) {
          console.log(ts() + ": onSave: null data");
        }
        if (window[magicnumber + "_autosave_interval"]) {
          apps["enm"]();
        } else {
          setDialog("No Data. \"" + apps[slot] + "\" did not respond with data to save.");
        }
      }
    }
  }
  function onData(message) {
    if (post_timeout) {
      clearTimeout(post_timeout);
      post_timeout = null;
    }
    if (debug) {
      console.log(ts() + ": onData: ", JSON.stringify(message));
    }
    var op = ops[window[magicnumber + "_ping"].split("/").length],
      a = message.split("/"),
      slot = parseInt(a[1][1], 10);
    //
    if (a[a.length - 1] === "") {
      if (a.length === 4) { // no response to Query means app is not CBS aware, so ignore it and move on
        // either
        apps[slot] = "";
        // or
        //apps[apps["idx"]] = ""; // in this case slot === apps[apps.idx]
        apps["enm"]();
      } else { // no response from any other ping type is an error
        if (debug) {
          console.log(ts() + ": \"" + op + "\" Failed. No Response");
        }
        setDialog(op + " Failed. \"" + apps[slot] + "\" did not respond to \"" + op + "\" command.");
      }
    } else if (a.length === 4) {
      // Qr
      apps["enm"](); // note apps.enm knows all about continue callback
    } else if (a.length === 6) {
      // Sv
      onSave.apply(this, a);
    } else if (a.length === 7) {
      // Ld
      onRestore.apply(this, a);
    } else {
      if (debug) {
        console.log(ts() + ": Houston, we have a problem!"); // 'when the myth becomes legend, print the myth'
      }
      if (window[magicnumber + "_autosave_interval"]) {
        if (debug) {
          console.log(ts() + ": \"" + apps[slot] + "\" gave an unknown response to \"AutoSave\" command.");
        }
        apps["enm"]();
      } else {
        setDialog(op + " Aborted. \"" + apps[slot] + "\" gave an unknown response to \"" + op + "\" command.");
      }
    }
  }
  function handle($btn) {
    var i;
    function cancelDeleteALL() {
      if (debug) {
        console.log(ts() + ": " + "Delete ALL cancelled.");
      }
      error("Delete ALL cancelled.");
    }
    dialog["set"]("closable", false);
    $btn.html("Processing...");
    switch ($btn.attr("class")) {
    case "da":
      if (debug) {
        console.log(ts() + ": " + "Delete ALL");
      }
      confirm("Confirm Delete ALL...", "Delete ALL saved data?", function () {
        confirm("Confirm Confirm Delete ALL...", "Are you really sure you want to Delete ALL saved data?", function () {
          for (i = 0; i < saves.length; i++) {
            ls["removeItem"](saves[i][4]);
          }
          success("ALL Deleted.");
        }, cancelDeleteALL);
      }, cancelDeleteALL);
      break;
    case "ld":
      if (debug) {
        console.log(ts() + ": Restore \"" + $btn.data("k") + "\" to \"" + $btn.data("s") + "\"");
      }
      data = ls[saves[$btn.data("i")][4]];
      txData(slots.indexOf($btn.data("s")));
      break;
    case "lf":
      if (debug) {
        console.log(ts() + ": Restore file to \"" + $btn.data("s") + "\"");
      }
      loadFromFile(slots.indexOf($btn.data("s")));
      closeDialog();
      break;
    case "rm":
      if (debug) {
        console.log(ts() + ": Delete \"" + $btn.data("k") + "\"");
      }
      confirm("Confirm Delete...", "Delete \"" + saves[$btn.data("i")][5] + "\" saved data?", function () {
        ls["removeItem"]($btn.data("k"));
        success("Deleted.");
      }, function () {
        if (debug) {
          console.log(ts() + ": Delete cancelled.");
        }
        error("Delete cancelled.");
      });
      break;
    case "sv":
      if (debug) {
        console.log(ts() + ": Save \"" + $btn.data("s") + "\"");
      }
      rxData(slots.indexOf($btn.data("s")));
      break;
    }
  }
  //function subclass(ns_string, func) {
    //function leaf(obj, ns_string) {
      //var parts = ns_string.split("."),
        //i,
        //length = parts.length;
      //for (i = 0; i < length; i++) {
        //if (obj === undefined || !obj.hasOwnProperty(parts[i])) {
          //return null;
        //}
        //obj = obj[parts[i]];
      //}
      //return obj;
    //}
    //var chain = ns_string.split("."),
      //target = chain[chain.length - 1],
      //handler = leaf(window, chain[0]),
      //node = leaf(window, chain.slice(0, -1).join("."));
    //if (handler && node && node.hasOwnProperty(target)) {
      //if (!node.hasOwnProperty("orig_" + target)) {
        //node["orig_" + target] = node[target];
      //}
      //node[target] = func;
    //}
  //}
  const _orig = "_orig";
  const _handler = "_root";
  function subclass2(ns_string, func) {
    function leaf(obj, ns_string) {
      var parts = ns_string.split("."),
        i,
        length = parts.length;
      for (i = 0; i < length; i++) {
        if (obj === undefined || !obj.hasOwnProperty(parts[i])) {
          return null;
        }
        obj = obj[parts[i]];
      }
      return obj;
    }
    var chain = ns_string.split("."),
      target = chain[chain.length - 1],
      handler = leaf(window, chain[0]),
      node = leaf(window, chain.slice(0, -1).join("."));
    if (handler && node && node.hasOwnProperty(target) && typeof node[target] === "function") {
      var orig = node[target][app + _orig];
      if (typeof orig !== "function") {
        orig = node[target];
      }
      node[target] = func;
      node[target][app + _orig] = orig;
      node[target][app + _handler] = handler;
    } else if (debug) {
      console.error("failed to subclass: ", ns_string);
    }
  }
  subclass2("flash_handler.message_inbound.on_room_message", function fn(nick, message) {
    var handler = fn[app + _handler],
      m = unescape(message),
      msginfo;
    try {
      msginfo = $.parseJSON(m);
    } catch (e) {
      if (debug) {
        console.error(e.message);
      }
      msginfo = {
        "m": m
      };
    }
    m = handler["striphtml"](msginfo["m"]).replace(/\s*/g, ""); // must strip space cos cb tends to add it to messages
    if (debug) {
      console.log(ts() + "< " + JSON.stringify(window[magicnumber + "_ping"]) + " | " + JSON.stringify(m));
    }
    if (m.indexOf(window[magicnumber + "_ping"]) === 0) {
      if (handler["sanitize"](nick) === handler["room"]) {
        onData(m);
      }
      return true;
    }
    return fn[app + _orig].call(this, nick, message);
  });
  subclass2("html_handler.message_inbound.on_room_message", function fn(nick, msginfo, index) {
    var handler = fn[app + _handler],
      m = handler["striphtml"](msginfo["m"]).replace(/\s*/g, ""); // must strip space cos cb tends to add it to messages
    if (m.indexOf(window[magicnumber + "_ping"]) === 0) {
      if (debug) {
        console.log(ts() + "< " + JSON.stringify(window[magicnumber + "_ping"]) + " | " + JSON.stringify(m));
      }
      if ((handler["sanitize"](nick) || handler["sanitize"](msginfo["user"])) === handler["room"]) {
        onData(m);
      }
      return true;
    }
    if (reTag.test(m)) {
      if (debug) {
        console.log(ts() + "? " + JSON.stringify(window[magicnumber + "_ping"]) + " | " + JSON.stringify(m));
      }
      return true;
    }
    if (debug) {
      console.log(ts() + "< " + JSON.stringify(m));
    }
    return fn[app + _orig].call(this, nick, msginfo, index);
  });
  subclass2("websocket_handler.message_inbound.on_room_message", function fn(msginfo) {
    if (msginfo["m"] === undefined) {
      return true;
    }
    var handler = fn[app + _handler],
      m = handler["striphtml"](msginfo["m"]).replace(/\s*/g, ""); // must strip space cos cb tends to add it to messages
    if (m.indexOf(window[magicnumber + "_ping"]) === 0) {
      if (debug) {
        console.log(ts() + "< " + JSON.stringify(window[magicnumber + "_ping"]) + " | " + JSON.stringify(m));
      }
      if (handler["sanitize"](msginfo["user"]) === handler["room"]) {
        onData(m);
      }
      return true;
    }
    if (reTag.test(m)) {
      if (debug) {
        console.log(ts() + "? " + JSON.stringify(window[magicnumber + "_ping"]) + " | " + JSON.stringify(m));
      }
      return true;
    }
    if (debug) {
      console.log(ts() + "< " + JSON.stringify(m));
    }
    return fn[app + _orig].call(this, msginfo);
  });
  subclass2("ws_handler.message_inbound.on_room_message", function fn(nick, message) {
    var handler = fn[app + _handler],
      m = /*unescape*/(message),
      msginfo;
    try {
      msginfo = $.parseJSON(m);
    } catch (e) {
      if (debug) {
        console.error(e.message);
      }
      msginfo = {
        "m": m
      };
    }
    m = handler["striphtml"](msginfo["m"]).replace(/\s*/g, ""); // must strip space cos cb tends to add it to messages
    if (debug) {
      console.log(ts() + "< " + JSON.stringify(window[magicnumber + "_ping"]) + " | " + JSON.stringify(m));
    }
    if (m.indexOf(window[magicnumber + "_ping"]) === 0) {
      if (handler["sanitize"](nick) === handler["room"]) {
        onData(m);
      }
      return true;
    }
    return fn[app + _orig].call(this, nick, message);
  });
  if (debug) {
    subclass2("jQuery.mydefchatconn", function fn(method) {
      if (method === "app_tab_refresh" || method === "update_panel") {
        console.log("$.mydefchatconn(\"" + method + "\")");
      }
      return fn[app + _orig].apply(this, arguments);
    });
  }
  function setStopLink() {
    $(".stop_link").unbind("click").click(function () {
      var that = this;
      onAutoSave(function () {
        $.ajax({
          url: $(that).attr('name'),
          dataType: 'text',
          data: '',
          type: 'POST',
          success: function (/*response*/) {
            $["mydefchatconn"]('app_tab_refresh');
          }
        });
      });
    });
  }
  if (inChat()) {
    $('.info-user a[data-tab="apps_and_bots"]').unbind("click").click(function () {
      (function (tab, target, func) {
        tab.show();
        tab.html(window["gettext"]("loading . . ."));
        if (func) {
          tab.load(target, func);
        } else {
          tab.load(target);
        }
      }($(".info-user div.apps_and_bots"), $(".info-user .buttons a[data-tab='apps_and_bots']").attr('href'), setStopLink));
    });
    setStopLink();
  }
  var headerSpan = "<span style=\"color:#dc5500; font-family: 'UbuntuBold', Arial, Helvetica, sans-serif;\">";
  function af(icon) {
    return "<i class=\"" + icon + "\" style=\"vertical-align:middle; margin-right:20px;\"></i>";
  }
  // custom 'confirm' dialog
  if (!confirm) {
    alertify["dialog"](magicnumber + "Confirm", function () {
      return {
        "build": function () {
          this["setting"]("defaultFocus", "cancel");
        },
        "prepare": function () {
          this["setHeader"](headerSpan + af("fa fa-exclamation-triangle fa-2x") + magicnumber + ": " + this["get"]("title") + "</span>");
        }
      };
    }, true, "confirm");
    confirm = alertify[magicnumber + "Confirm"];
  }
  // custom 'alert' dialog
  if (!_alert) {
    alertify["dialog"](magicnumber + "Alert", function () {
      return {
        "build": function () {
          this["setHeader"](headerSpan + af("fa fa-cog fa-2x") + magicnumber + ": CB app/bot data Save'n'restore bookmarklet " + ver + "</span>");
        },
        "setup": function () {
          return {
            "buttons": [{
              "text": "Close",
              "key": 27 /*Esc*/
            }],
            "focus": {
              "element": 0
            },
            "options": {
              "maximizable": false,
              "resizable": false,
              "padding": false
            }
          };
        },
        "prepare": function () {
          var $btns = $("." + magicnumber + "_buttons button");
          if (ls[magicnumber + "_use_local_storage"] !== "false") {
            $btns.filter(".lf").hide();
          } else {
            $("#" + magicnumber + "_as").prop("disabled", true);
            $btns.filter(".ld, .rm, .da").hide();
          }
          if ($(".chat-box ul.buttons li a[data-tab=\"autosave\"]").length) {
            $btns.filter(".sv, .ld, .lf").prop("disabled", true);
          }
          $btns.click(function (evt) {
            evt.preventDefault();
            // either
            //$btns.attr("disabled", true);
            // or
            $btns.prop("disabled", true);
            handle($(this));
          });
          $("#" + magicnumber + "_ls").change(function (/*evt*/) {
            var isAutoSave = $(".chat-box ul.buttons li a[data-tab=\"autosave\"]").length;
            ls[magicnumber + "_use_local_storage"] = $(this).is(':checked'); //!(ls[magicnumber + "_use_local_storage"] === "true");
            if (ls[magicnumber + "_use_local_storage"] !== "false") {
              $("#" + magicnumber + "_as").prop("disabled", false);
              $btns.filter(".ld").prop("disabled", isAutoSave);
              $btns.filter(".ld, .rm, .da").show();
              $btns.filter(".lf").hide();
            } else {
              $("#" + magicnumber + "_as").prop("disabled", true);
              $btns.filter(".ld, .rm, .da").hide();
              $btns.filter(".lf").prop("disabled", isAutoSave);
              $btns.filter(".lf").show();
              $("#" + magicnumber + "_as").removeProp("checked").change();
            }
          });
          $("#" + magicnumber + "_as").change(function (/*evt*/) {
            if ($(this).is(':checked')) {
              if (debug) {
                console.log(ts() + ": AutoSave On");
              }
              $(".chat-box ul.buttons li a[data-tab=\"settings\"]").parent().before($("<li></li>").html("<a href=\"#\" data-tab=\"autosave\" class=\"nooverlay\">AutoSave</a>"));
              $btns.filter(".sv, .ld, .lf").prop("disabled", true);
              // see dialog onclose hooks for actual autosave init
            } else {
              if (debug) {
                console.log(ts() + ": AutoSave Off");
              }
              $(".chat-box ul.buttons li a[data-tab=\"autosave\"]").parent().remove();
              $btns.filter(".sv, .ld, .lf").prop("disabled", false);
              /*if (window[magicnumber + "_autosave_interval"]) {
                clearInterval(window[magicnumber + "_autosave_interval"]);
              }
              window[magicnumber + "_autosave_interval"] = null;*/
            }
          });
        },
        "hooks": {
          "onclose": function () {
            // autosave
            if ($(".chat-box ul.buttons li a[data-tab=\"autosave\"]").length) {
              window[magicnumber + "_autosave_interval"] = setInterval(onAutoSave, autosave_interval_delay);
              if (debug) {
                console.log(ts() + ": AutoSave activated");
              }
              setTimeout(onAutoSave, notify_delay * 2 * 1000); // schedule an ~immediate autosave - won't work if menu is still open. fingers crossed!
            } else {
              window[magicnumber + "_autosave_interval"] = null;
            }
            // clear menu
            $("." + magicnumber + "_buttons").remove();
            complete();
          }
        }
      };
    }, null, "alert");
    _alert = alertify[magicnumber + "Alert"];
  }
  function menu() {
    var i, j, k, btn,
      bSomeCBSApps = apps.some(function (v) {
        return v;
      }),
      bInChat = inChat();
    if (debug) {
      console.log(ts() + ": apps: " + JSON.stringify(apps));
    }
    div.append(style);
    getSaves();
    if (saves.length || (bSomeCBSApps && bInChat)) {
      // NB. while autosave is enabled, manual saves/restores are disabled
      for (j = 0; j < apps.length; j++) {
        if (apps[j] && bInChat) {
          btn = $(("<button data-s=\"^\" data-a=\"$\" class=\"sv\">Save ^ \"$\" data</button>").replace(/\^/g, slots[j]).replace(/\$/g, apps[j]));
          div.append(btn);
          btn = $(("<button data-s=\"^\" data-a=\"$\" class=\"lf\">Restore ^ \"$\" saved data from file</button>").replace(/\^/g, slots[j]).replace(/\$/g, apps[j]));
          div.append(btn);
          for (i = 0; i < saves.length; i++) {
            if (apps[j] === saves[i][1]) {
              k = saves[i][4]; // key
              btn = $(("<button data-s=\"^\" data-i=\"" + i + "\" data-k=\"" + k + "\" class=\"ld\">Restore \"" + saves[i][5] + "\" saved data into ^</button>").replace(/\^/g, slots[j]));
              div.append(btn);
            }
          }
        }
      }
      for (i = 0; i < saves.length; i++) {
        btn = $("<button data-i=\"" + i + "\" data-k=\"" + k + "\" class=\"rm\">Delete \"" + saves[i][5] + "\" saved data</button>");
        div.append(btn);
      }
      if (saves.length > 1) {
        btn = $("<button class=\"da\">Delete ALL saved data</button>");
        div.append(btn);
      }
      btn = $("<input type=\"checkbox\" id=\"" + magicnumber + "_ls\"><label for=\"" + magicnumber + "_ls\">Use browser Local Storage</label>");
      if (ls[magicnumber + "_use_local_storage"] !== "false") {
        btn.prop("checked", true);
      }
      div.append(btn);
      if (/*bSomeCBSApps && */bInChat) {
        btn = $("<input type=\"checkbox\" id=\"" + magicnumber + "_as\"><label for=\"" + magicnumber + "_as\">AutoSave</label>");
        if ($(".chat-box ul.buttons li a[data-tab=\"autosave\"]").length) {
          btn.prop("checked", true);
        }
        div.append(btn);
      }
    } else {
      // alert: nothing to do
      div.append($("<p>Nothing to do!</p>"));
      if (debug) {
        console.log(ts() + ": " + JSON.stringify({ "saves.length": saves.length, "bSomeCBSApps": bSomeCBSApps, "bInChat": bInChat}));
      }
    }
    dialog = _alert(div[0]);
  }
  timestamp = (new Date()).valueOf();
  apps["enm"](qryApps, menu); // once all active app/bots have been Query'd, create menu dialog to prompt for further action
}));
(function (exports) {
  "use strict";
  // startof CBS module
  var _cb_onMessage = cb["onMessage"],
    _onSave = null,
    _onRestore = null,
    _data, // object with single property: session timestamp
    _tag = "#" + (cb["settings"].hasOwnProperty("slot") ? cb["settings"]["slot"] : "") + magicnumber, // #[slot][magicnumber]
    reTag = new RegExp("^\\/#[0-3]" + magicnumber + "\\/"); // NB. this must match reTag definition above
  //
  // v2.1
  // obj.m transformations
  // Qr /[_tag]/[timestamp]/ => /[_tag]/[timestamp]/?
  // a.length === 4 && a[3] === "" => a.length === 4 && a[3] !== ""
  // Sv /[_tag]/[timestamp]/[start]// => /[_tag]/[timestamp]/[start]/[sent]/[sent.length]
  // a.length === 6 && a[5] === "" => a.length === 6 && a[5] !== ""
  // Ld /[_tag]/[timestamp]/[start]/[sent]/[sent.length]/ => /[_tag]/[timestamp]/[start]/[sent]/[sent.length]/[received.length]
  // a.length === 7 && a[6] === "" => a.length === 7 && a[6] !== ""
  //
  function message(obj) {
    var match = obj["m"].replace(/\s*/g, "").split("/"), // whitespace removal should be unnecessary. do it anyway
      timestamp,
      start,
      chunk,
      raw;
    //
    if (match.length > 3 && match[0] === "" && match[1] === _tag) {
      if (_onSave && _onRestore && obj["user"] === cb["room_slug"]) {
        if (debug) {
          cb["log"](obj["user"] + ": " + obj["m"]);
        }
        timestamp = match[2];
        if (match.length === 4 /* && !match[3].length */ ) {
          match[3] = "?";
          obj["m"] = match.join("/");
        } else if (match.length === 6 /* && !match[4].length && !match[5].length */ ) {
          // Sv
          if (!(_data || {}).hasOwnProperty(timestamp)) {
            // regenerate session data
            /*try { // NB. is better if errors in onSave break the app/bot*/
            raw = _onSave();
            /*} catch (e) {
              cb["log"](e.message);
              raw = "";
            }*/
            if (debug) {
              cb["log"](JSON["stringify"](raw));
            }
            _data = {};
            _data[timestamp] = exports["btoa"](exports["unescape"](exports["encodeURIComponent"](raw))); // handle utf8 strings. see http://forums.enyojs.com/discussion/comment/9099/#Comment_9099
            if (!raw) {
              cb["log"]("onSave returned no data.");
            }
          }
          if (_data.hasOwnProperty(timestamp)) { // sanity check
            start = parseInt(match[3], 10);
            chunk = _data[timestamp].slice(start, start + chunk_size);
            match[4] = chunk;
            match[5] = chunk.length;
            obj["m"] = match.join("/");
          }
        } else if (match.length === 7 /* && match[5].length && parseInt(match[5], 10) === match[4].length && !match[6].length */ ) {
          // Ld
          if (debug) {
            cb["log"](parseInt(match[5], 10) === match[4].length);
          }
          if (match[3] === "0") {
            // reset session data
            _data = {};
            _data[timestamp] = "";
          }
          if (_data.hasOwnProperty(timestamp)) { // sanity check
            match[3] = _data[timestamp].length;
            match[6] = match[4].length;
            obj["m"] = match.join("/");
            if (match[4]) {
              _data[timestamp] += match[4];
            } else {
              raw = exports["decodeURIComponent"](exports["escape"](exports["atob"](_data[timestamp]))); // handle utf8 strings. see http://forums.enyojs.com/discussion/comment/9099/#Comment_9099
              if (debug) {
                cb["log"](raw);
              }
              /*try { // NB. is better if errors in onRestore break the app/bot*/
              _onRestore(raw);
              /*} catch(e) {
                cb["log"](e.message)
              }*/
              cb["chatNotice"]("Previously Saved Data Restored.", cb["room_slug"]);
            }
          } // else, if we don't alter obj.m, bookmarklet will detect restore fail
        }
        if (debug) {
          cb["log"](obj["user"] + ": " + obj["m"]);
        }
      }
      obj["X-Spam"] = true;
    } else if (reTag.test(obj["m"])) { // any detected CBS pings are marked as spam
      obj["X-Spam"] = true;
    }
    return obj;
  }
  cb["log"](sSig);
  cb["onMessage"] = function (handler) {
    if (typeof handler !== "function") {
      throw new TypeError(handler + " is not a function");
    }
    _cb_onMessage(function (obj) {
      return handler(message(obj));
    });
    return handler; // allow chaining
  };
  cb["onRestore"] = function (handler) {
    if (typeof handler !== "function") {
      throw new TypeError(handler + " is not a function");
    }
    _onRestore = handler;
    return handler; // allow chaining
  };
  cb["onSave"] = function (handler) {
    if (typeof handler !== "function") {
      throw new TypeError(handler + " is not a function");
    }
    _onSave = handler;
    return handler; // allow chaining
  };
  // set a default onMessage handler
  cb["onMessage"](function (obj) {
    return obj;
  });
  // endof CBS module
}(typeof exports === 'undefined' ? this : exports)); // ignore jslint warning. where this js is going, they don't like === undefined
// don't try to jslint beyond this point. here be dragons!
(function (exports, chars) {
  "use strict";
  // startof base64 module
  /**
  * @constructor
  * @param {string} message
  */
  function InvalidCharacterError(message) {
    this["message"] = message;
  }
  InvalidCharacterError.prototype = new Error();
  InvalidCharacterError.prototype["name"] = "InvalidCharacterError";
  // encoder
  // [https://gist.github.com/999166] by [https://github.com/nignag]
  exports["btoa"] || (exports["btoa"] = function (input) {
    var str = String(input);
    for (
      // initialize result and counter
      var block, charCode, idx = 0, map = chars, output = "";
      // if the next str index does not exist:
      // change the mapping table to "="
      // check if d has no fractional digits
      str.charAt(idx | 0) || (map = "=", idx % 1);
      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
      output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
      charCode = str.charCodeAt(idx += 3 / 4);
      if (charCode > 0xFF) {
        throw new InvalidCharacterError("\"btoa\" failed: The string to be encoded contains characters outside of the Latin1 range.");
      }
      block = block << 8 | charCode;
    }
    return output;
  });
  // decoder
  // [https://gist.github.com/1020396] by [https://github.com/atk]
  exports["atob"] || (exports["atob"] = function (input) {
    var str = String(input).replace(/=+$/, "");
    if (str.length % 4 == 1) {
      throw new InvalidCharacterError("\"atob\" failed: The string to be decoded is not correctly encoded.");
    }
    for (
      // initialize result and counters
      var bc = 0, bs, buffer, idx = 0, output = "";
      // get next character
      buffer = str.charAt(idx++);
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0 // ignore ClosureCompiler warning
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  });
  // endof base64 module
}(typeof exports === 'undefined' ? this : exports, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="));
// NB NB NB *** after closure compiling (debug), remember to convert '%12' => '% 12' or '%0xc' *** ALSO *** re-order app modules to put base64 first ***
