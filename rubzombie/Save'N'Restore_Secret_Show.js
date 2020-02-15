// https://chaturbate.com/apps/user_uploads/3/rubzombie/
// https://chaturbate.com/apps/sourcecode/savenrestore-secret-show/?version=&slot=3

// startof CBSv2 module - not for re-compilation
(function(a,k){function g(a){this.message=a}g.prototype=Error();g.prototype.name="InvalidCharacterError";a.btoa||(a.btoa=function(a){a=String(a);for(var f,b,n=0,c=k,q="";a.charAt(n|0)||(c="=",n%1);q+=c.charAt(63&f>>8-n%1*8)){b=a.charCodeAt(n+=.75);if(255<b)throw new g('"btoa" failed: The string to be encoded contains characters outside of the Latin1 range.');f=f<<8|b}return q});a.atob||(a.atob=function(a){a=String(a).replace(/=+$/,"");if(1==a.length%4)throw new g('"atob" failed: The string to be decoded is not correctly encoded.');
for(var f=0,b,n,c=0,q="";n=a.charAt(c++);~n&&(b=f%4?64*b+n:n,f++%4)?q+=String.fromCharCode(255&b>>(-2*f&6)):0)n=k.indexOf(n);return q})})("undefined"===typeof exports?this:exports,"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
(function(a){var k=cb.onMessage,g=null,u=null,f,b="#"+(cb.settings.hasOwnProperty("slot")?cb.settings.slot:"")+"CBSv2",n=/^\/#[0-3]CBSv2\//;cb.log("CBS::v2::CB app/bot data Save/restore::20170923.009::Release");cb.onMessage=function(c){if("function"!==typeof c)throw new TypeError(c+" is not a function");k(function(k){var d=k.m.replace(/\s*/g,"").split("/");if(3<d.length&&""===d[0]&&d[1]===b){if(g&&u&&k.user===cb.room_slug){var p=d[2];if(4===d.length)d[3]="?",k.m=d.join("/");else if(6===d.length){if(!(f||
{}).hasOwnProperty(p)){var q=g();f={};f[p]=a.btoa(a.unescape(a.encodeURIComponent(q)));q||cb.log("onSave returned no data.")}f.hasOwnProperty(p)&&(q=parseInt(d[3],10),p=f[p].slice(q,q+512),d[4]=p,d[5]=p.length,k.m=d.join("/"))}else 7===d.length&&("0"===d[3]&&(f={},f[p]=""),f.hasOwnProperty(p)&&(d[3]=f[p].length,d[6]=d[4].length,k.m=d.join("/"),d[4]?f[p]+=d[4]:(q=a.decodeURIComponent(a.escape(a.atob(f[p]))),u(q),cb.chatNotice("Previously Saved Data Restored.",cb.room_slug))))}k["X-Spam"]=!0}else n.test(k.m)&&
(k["X-Spam"]=!0);return c(k)});return c};cb.onRestore=function(a){if("function"!==typeof a)throw new TypeError(a+" is not a function");return u=a};cb.onSave=function(a){if("function"!==typeof a)throw new TypeError(a+" is not a function");return g=a};cb.onMessage(function(a){return a})})("undefined"===typeof exports?this:exports);
// endof CBSv2 module - not for re-compilation


// new handlers
cb.onSave(function () {
  // form the usernames that are allowed to view the cam into an array
  var data = cb.limitCam_allUsersWithAccess();
  // return that array in the form of a string
  return JSON.stringify(data);
});


cb.onRestore(function (data) {
  // parse the restored data string into an array
  var restored = JSON.parse(data);

  // reinstate the saved usernames
  restored.forEach(function (user) {
    if (!cbjs.arrayContains(cb.limitCam_allUsersWithAccess(), user)) {
      output("Reinstated " + user + " to secret show!");
      cb.limitCam_addUsers([user]);
    }
  });
});


function promo(user) {
  const sWarn = "\n\u26d4\n\u26d4 Secret Shows are ONLY viewable\n\u26d4 on Adobe Flash enabled browsers.\n\u26d4";
  user = user ? user.user : "";
  if (!user || !cbjs.arrayContains(cb.limitCam_allUsersWithAccess(), user)) {
    if (!cb.limitCam_isRunning()) {
      output("Tip at least " + cb.settings.min_start_tokens + " tokens to join in on the secret show fun!" + sWarn, user);
    }
    if (cb.limitCam_isRunning() && cb.settings.min_join_tokens > 0) {
      output("Tip at least " + cb.settings.min_join_tokens + " tokens to join in on the secret show fun!" + sWarn, user);
    }
  }
}
cb.onEnter(promo);


//  Title:	Secret Show
//  Author: justin
//  Version: 1.0 (11/27/2013)
//  Version: 1.0a (10/02/2016) rubzombie
cb.settings_choices = [{
  name: "min_start_tokens",
  type: "int",
  minValue: 1,
  maxValue: 1E3,
  defaultValue: 100,
  label: "Cost to Join Before Show Starts"
}, {
  name: "min_join_tokens",
  type: "int",
  minValue: 0,
  maxValue: 1E3,
  defaultValue: 100,
  label: "Cost to Join During Show. Set to 0 to Disable Joining During Show."
}, {
  name: "hide_message",
  label: "Cam Message",
  type: "str",
  minLength: 1,
  maxLength: 256,
  defaultValue: "Secret Show in progress! Tip at least $$$min_join_tokens$$$ tokens to join in on the fun!" //  Version: 1.0a
}];
cb.onTip(function (tip) {
  if (!cbjs.arrayContains(cb.limitCam_allUsersWithAccess(), tip["from_user"])) {
    if (!cb.limitCam_isRunning() && parseInt(tip["amount"]) >= cb.settings.min_start_tokens) {
      output("Added " + tip["from_user"] + " to secret show!");
      cb.limitCam_addUsers([tip["from_user"]]);
    }
    if (cb.limitCam_isRunning() && parseInt(tip["amount"]) >= cb.settings.min_join_tokens && cb.settings.min_join_tokens > 0) {
      output("Added " + tip["from_user"] + " to secret show!");
      cb.limitCam_addUsers([tip["from_user"]]);
    }
  }
});
cb.onMessage(function (msg) {
  var message = msg["m"];
  var user = msg["user"];
  var username = "";
  if (cb.room_slug === user && message == "/start" && !cb.limitCam_isRunning()) {
    output(cb.room_slug + " has started the show!");
    cb.limitCam_start(cb.settings.hide_message.replace(/\$\$\$min_join_tokens\$\$\$/g, cb.settings.min_join_tokens)); //  Version: 1.0a
    msg["X-Spam"] = true; //  Version: 1.0a
  }
  if (cb.room_slug === user && message == "/stop" && cb.limitCam_isRunning()) {
    output(cb.room_slug + " has stopped the show!");
    cb.limitCam_stop();
    msg["X-Spam"] = true; //  Version: 1.0a
  }
  if (cb.room_slug === user && message.substring(0, 7) == "/remove" && cb.limitCam_allUsersWithAccess().length > 0 && cb.limitCam_isRunning()) {
    username = message.substring(8, message.length);
    if (cbjs.arrayContains(cb.limitCam_allUsersWithAccess(), username)) {
      cb.limitCam_removeUsers([username]);
      output(cb.room_slug + " has removed " + username + " from the show!");
    }
    msg["X-Spam"] = true; //  Version: 1.0a
  }
  if (cb.room_slug === user && message.substring(0, 6) == "/check") {
    username = message.substring(7, message.length);
    if (cb.limitCam_userHasAccess(username)) {
      output(username + " is in the show!");
    } else {
      output(username + " is not in the show!");
    }
    msg["X-Spam"] = true; //  Version: 1.0a
  }
  if (cb.room_slug === user && message === "/list") {
    var userlist = cb.limitCam_allUsersWithAccess();
    if (userlist.length > 0) {
      output("" + userlist.length + (userlist.length > 1 ? " users" : " user") + " in show: " + cbjs.arrayJoin(userlist, ", "));
    } else {
      output("No users in show.");
    }
    msg["X-Spam"] = true; //  Version: 1.0a
  }
  //if (message[0] == "/") { //  Version: 1.0a
  if (cb.room_slug === user && message === "/promo") { //  Version: 1.0a
    promo(); //  Version: 1.0a
    msg["X-Spam"] = true;
  }
  return msg;
});

function output(message, to_user) { //  Version: 1.0a
  cb.chatNotice(message, to_user || ""); //  Version: 1.0a
};
promo(); //  Version: 1.0a
