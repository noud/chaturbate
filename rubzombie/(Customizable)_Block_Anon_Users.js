// https://chaturbate.com/apps/user_uploads/1/rubzombie/
// https://chaturbate.com/apps/sourcecode/customizable-block-anon-users/?version=&slot=1

// startof CBSv2 module - not for re-compilation
(function(a,k){function g(a){this.message=a}g.prototype=Error();g.prototype.name="InvalidCharacterError";a.btoa||(a.btoa=function(a){a=String(a);for(var f,b,n=0,c=k,q="";a.charAt(n|0)||(c="=",n%1);q+=c.charAt(63&f>>8-n%1*8)){b=a.charCodeAt(n+=.75);if(255<b)throw new g('"btoa" failed: The string to be encoded contains characters outside of the Latin1 range.');f=f<<8|b}return q});a.atob||(a.atob=function(a){a=String(a).replace(/=+$/,"");if(1==a.length%4)throw new g('"atob" failed: The string to be decoded is not correctly encoded.');
for(var f=0,b,n,c=0,q="";n=a.charAt(c++);~n&&(b=f%4?64*b+n:n,f++%4)?q+=String.fromCharCode(255&b>>(-2*f&6)):0)n=k.indexOf(n);return q})})("undefined"===typeof exports?this:exports,"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
(function(a){var k=cb.onMessage,g=null,u=null,f,b="#"+(cb.settings.hasOwnProperty("slot")?cb.settings.slot:"")+"CBSv2",n=/^\/#[0-3]CBSv2\//;cb.log("CBS::v2::CB app/bot data Save/restore::20170923.009::Release");cb.onMessage=function(c){if("function"!==typeof c)throw new TypeError(c+" is not a function");k(function(k){var d=k.m.replace(/\s*/g,"").split("/");if(3<d.length&&""===d[0]&&d[1]===b){if(g&&u&&k.user===cb.room_slug){var p=d[2];if(4===d.length)d[3]="?",k.m=d.join("/");else if(6===d.length){if(!(f||
{}).hasOwnProperty(p)){var q=g();f={};f[p]=a.btoa(a.unescape(a.encodeURIComponent(q)));q||cb.log("onSave returned no data.")}f.hasOwnProperty(p)&&(q=parseInt(d[3],10),p=f[p].slice(q,q+512),d[4]=p,d[5]=p.length,k.m=d.join("/"))}else 7===d.length&&("0"===d[3]&&(f={},f[p]=""),f.hasOwnProperty(p)&&(d[3]=f[p].length,d[6]=d[4].length,k.m=d.join("/"),d[4]?f[p]+=d[4]:(q=a.decodeURIComponent(a.escape(a.atob(f[p]))),u(q),cb.chatNotice("Previously Saved Data Restored.",cb.room_slug))))}k["X-Spam"]=!0}else n.test(k.m)&&
(k["X-Spam"]=!0);return c(k)});return c};cb.onRestore=function(a){if("function"!==typeof a)throw new TypeError(a+" is not a function");return u=a};cb.onSave=function(a){if("function"!==typeof a)throw new TypeError(a+" is not a function");return g=a};cb.onMessage(function(a){return a})})("undefined"===typeof exports?this:exports);
// endof CBSv2 module - not for re-compilation
//Written by Viper
// custom notification text feature added by rubzombie
var settings = {
  enter_notice: "Hello, %%USER%%. As a registered user you can view %%ROOM%%'s cam.",
  message_notice: "Hello, %%USER%%. As a registered user you can view %%ROOM%%'s cam.",
  re_enter_notice: "Welcome back, %%USER%%. As a registered user you can view %%ROOM%%'s cam.",
  start_msg: "Now blocking anonymous viewers. If you are a registered user please type a message in the chat or refresh!",
  start_notice: "Now blocking anonymous viewers!\\nIf you are signed in and can't see %%ROOM%%'s cam, refresh the page or type in the chat."
},
  reRoom = /%%ROOM%%/g,
  reUser = /%%USER%%/g;
cb['settings_choices'] = [{
  //'defaultValue': settings.enter_notice,
  'label': 'On Enter notice (e.g. ' + settings.enter_notice + ')',
  'minLength': 1,
  'name': 'enter_notice',
  'required': false,
  'type': 'str'
}, {
  //'defaultValue': settings.message_notice,
  'label': 'On Message notice (e.g. ' + settings.message_notice + ')',
  'minLength': 1,
  'name': 'message_notice',
  'required': false,
  'type': 'str'
}, {
  //'defaultValue': settings.re_enter_notice,
  'label': 'On Re-enter notice (e.g. ' + settings.re_enter_notice + ')',
  'minLength': 1,
  'name': 're_enter_notice',
  'required': false,
  'type': 'str'
}, {
  //'defaultValue': settings.start_msg,
  'label': 'On Start message (e.g. ' + settings.start_msg + ')',
  'minLength': 1,
  'name': 'start_msg',
  'required': false,
  'type': 'str'
}, {
  //'defaultValue': settings.start_notice,
  'label': 'On Start notice (e.g. ' + settings.start_notice + ')',
  'minLength': 1,
  'name': 'start_notice',
  'required': false,
  'type': 'str'
}];
cb['onEnter'](function (user) {
  if (user['user'] !== cb['room_slug'] && !cbjs['arrayContains'](cb['limitCam_allUsersWithAccess'](), user['user'])) {
    cb['limitCam_addUsers']([user['user']]);
    cb['chatNotice'](settings.enter_notice.replace(reUser, user['user']).replace(reRoom, cb['room_slug']), user['user'], '#fcb2bf', '#000000', 'bold');
  } else if (cbjs['arrayContains'](cb['limitCam_allUsersWithAccess'](), user['user'])) {
    cb['chatNotice'](settings.re_enter_notice.replace(reUser, user['user']).replace(reRoom, cb['room_slug']), user['user'], '#fcb2bf', '#000000', 'bold');
  }
});

cb['onMessage'](function (msg) {
  if (msg['user'] !== cb['room_slug'] && !cbjs['arrayContains'](cb['limitCam_allUsersWithAccess'](), msg['user'])) {
    cb['limitCam_addUsers']([msg['user']]);
    cb['chatNotice'](settings.message_notice.replace(reUser, msg['user']).replace(reRoom, cb['room_slug']), msg['user'], '#fcb2bf', '#000000', 'bold');
  }
  return msg;
});

function init() {
  var choice;
  for (choice in settings) {
    if (settings.hasOwnProperty(choice)) {
      if (cb['settings'].hasOwnProperty(choice) && cb['settings'][choice] && cb['settings'][choice].length) {
        settings[choice] = cb['settings'][choice];
      }
      settings[choice] = settings[choice].replace(/\s*\\n\s*/g, '\n');
    }
  }
  cb['limitCam_start'](settings.start_msg.replace(/\n/g, ' ').replace(reRoom, cb['room_slug'])); // not sure if start message can include newlines ?
  cb['chatNotice'](settings.start_notice.replace(reRoom, cb['room_slug']), '', '#fcb2bf', '#000000', 'bold');
}

init();
