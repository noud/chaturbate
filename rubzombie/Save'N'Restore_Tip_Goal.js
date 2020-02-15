// https://chaturbate.com/apps/user_uploads/0/rubzombie/
// https://chaturbate.com/apps/app_details/savenrestore-tip-goal/?version=&slot=0
// https://chaturbate.com/apps/sourcecode/savenrestore-tip-goal/?version=&slot=0

// startof CBSv2.010 module - not for re-compilation
(function(a,k){function g(a){this.message=a}g.prototype=Error();g.prototype.name="InvalidCharacterError";a.btoa||(a.btoa=function(a){a=String(a);for(var f,b,n=0,c=k,q="";a.charAt(n|0)||(c="=",n%1);q+=c.charAt(63&f>>8-n%1*8)){b=a.charCodeAt(n+=.75);if(255<b)throw new g('"btoa" failed: The string to be encoded contains characters outside of the Latin1 range.');f=f<<8|b}return q});a.atob||(a.atob=function(a){a=String(a).replace(/=+$/,"");if(1==a.length%4)throw new g('"atob" failed: The string to be decoded is not correctly encoded.');
for(var f=0,b,n,c=0,q="";n=a.charAt(c++);~n&&(b=f%4?64*b+n:n,f++%4)?q+=String.fromCharCode(255&b>>(-2*f&6)):0)n=k.indexOf(n);return q})})("undefined"===typeof exports?this:exports,"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
(function(a){var k=cb.onMessage,g=null,u=null,f,b="#"+(cb.settings.hasOwnProperty("slot")?cb.settings.slot:"")+"CBSv2",n=/^\/#[0-3]CBSv2\//;cb.log("CBS::v2::CB app/bot data Save/restore::20171104.010::Release");cb.onMessage=function(c){if("function"!==typeof c)throw new TypeError(c+" is not a function");k(function(k){var d=k.m.replace(/\s*/g,"").split("/");if(3<d.length&&""===d[0]&&d[1]===b){if(g&&u&&k.user===cb.room_slug){var p=d[2];if(4===d.length)d[3]="?",k.m=d.join("/");else if(6===d.length){if(!(f||
{}).hasOwnProperty(p)){var q=g();f={};f[p]=a.btoa(a.unescape(a.encodeURIComponent(q)));q||cb.log("onSave returned no data.")}f.hasOwnProperty(p)&&(q=parseInt(d[3],10),p=f[p].slice(q,q+512),d[4]=p,d[5]=p.length,k.m=d.join("/"))}else 7===d.length&&("0"===d[3]&&(f={},f[p]=""),f.hasOwnProperty(p)&&(d[3]=f[p].length,d[6]=d[4].length,k.m=d.join("/"),d[4]?f[p]+=d[4]:(q=a.decodeURIComponent(a.escape(a.atob(f[p]))),u(q),cb.chatNotice("Previously Saved Data Restored.",cb.room_slug))))}k["X-Spam"]=!0}else n.test(k.m)&&
(k["X-Spam"]=!0);return c(k)});return c};cb.onRestore=function(a){if("function"!==typeof a)throw new TypeError(a+" is not a function");return u=a};cb.onSave=function(a){if("function"!==typeof a)throw new TypeError(a+" is not a function");return g=a};cb.onMessage(function(a){return a})})("undefined"===typeof exports?this:exports);
// endof CBSv2.010 module - not for re-compilation

// new handlers
cb.onSave(function () {
  // form the variables into an object, using their names as the object keys
  var data = {
    total_tipped: total_tipped,
    high_tip_username: high_tip_username,
    high_tip_amount: high_tip_amount,
    last_tip_username: last_tip_username,
    last_tip_amount: last_tip_amount,
    subject_is_set_with_0: subject_is_set_with_0
  };
  // return that object in the form of a string
  return JSON.stringify(data);
});


cb.onRestore(function (data) {
  // parse the restored data string into an object
  var restored = JSON.parse(data);

  // reinstate the saved variables
  Object.keys(restored).forEach(function (variable) {
    if (this.hasOwnProperty(variable)) {
      this[variable] = restored[variable]
    }
  });
});


// vars
var total_tipped = 0;
var high_tip_username = null;
var high_tip_amount = 0;
var last_tip_username = null;
var last_tip_amount = 0;
var subject_is_set_with_0 = false;

cb.settings_choices = [
    {name: 'tokens', type: 'int', minValue: 1, default: 100},
    {name: 'goal_description', type: 'str', minLength: 1, maxLength: 255}
];

// handlers
cb.onTip(function(tip) {
    total_tipped += tip['amount']
    if (total_tipped > cb.settings.tokens) {
        total_tipped = cb.settings.tokens;
    }
    update_subject();
    last_tip_amount = tip['amount']
    last_tip_username = tip['from_user']
    if (tip['amount'] > high_tip_amount) {
        high_tip_amount = tip['amount']
        high_tip_username = tip['from_user']
    }
    cb.drawPanel();
});


cb.onDrawPanel(function(user) {
    return {
        'template': '3_rows_of_labels',
        'row1_label': 'Tip Received / Goal :',
        'row1_value': '' + total_tipped + ' / ' + cb.settings.tokens,
        'row2_label': 'Highest Tip:',
        'row2_value': format_username(high_tip_username) + ' (' + high_tip_amount + ')',
        'row3_label': 'Latest Tip Received:',
        'row3_value': format_username(last_tip_username) + ' (' + last_tip_amount + ')'
    };
});


// helper functions
function update_subject() {
    if (tips_remaining() == 0) {
        if (subject_is_set_with_0) {
            return;
        }
        subject_is_set_with_0 = true;
    } else {
        subject_is_set_with_0 = false;
    }
    var new_subject = cb.settings.goal_description +
        " [" + tips_remaining() + " tokens remaining]";
    cb.log("Changing subject to: " + new_subject);
    cb.changeRoomSubject(new_subject);
}

function tips_remaining() {
    var r = cb.settings.tokens - total_tipped;
    if (r < 0) {
        return 0;
    } else {
        return r;
    }
}

function format_username(val) {
    if (val === null) {
        return "--";
    } else {
        return val.substring(0, 12);
    }
}

function init() {
    update_subject();
}

init();
