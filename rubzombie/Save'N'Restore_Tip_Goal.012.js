// https://chaturbate.com/apps/user_uploads/0/rubzombie/
// https://chaturbate.com/apps/app_details/savenrestore-tip-goal/?version=&slot=0
// https://chaturbate.com/apps/sourcecode/savenrestore-tip-goal/?version=&slot=0

// startof CBSv2.012 module - not for re-compilation
(function(a){var g=cb.onMessage,h=null,v=null,n,b="#"+(cb.settings.hasOwnProperty("slot")?cb.settings.slot:"")+"CBSv2",c=/^\/#[0-3]CBSv2\//;cb.log("CBS::v2::CB app/bot data Save/restore::20171104.012::Debug");cb.onMessage=function(f){if("function"!==typeof f)throw new TypeError(f+" is not a function");g(function(g){var e=g.m.replace(/\s*/g,"").split("/");if(3<e.length&&""===e[0]&&e[1]===b){if(h&&v&&g.user===cb.room_slug){cb.log(g.user+": "+g.m);var p=e[2];if(4===e.length)e[3]="?",g.m=e.join("/"); else if(6===e.length){if(!(n||{}).hasOwnProperty(p)){var k=h();cb.log(JSON.stringify(k));n={};n[p]=a.btoa(a.unescape(a.encodeURIComponent(k)));k||cb.log("onSave returned no data.")}n.hasOwnProperty(p)&&(k=parseInt(e[3],10),p=n[p].slice(k,k+512),e[4]=p,e[5]=p.length,g.m=e.join("/"))}else 7===e.length&&(cb.log(parseInt(e[5],10)===e[4].length),"0"===e[3]&&(n={},n[p]=""),n.hasOwnProperty(p)&&(e[3]=n[p].length,e[6]=e[4].length,g.m=e.join("/"),e[4]?n[p]+=e[4]:(k=a.decodeURIComponent(a.escape(a.atob(n[p]))), cb.log(k),v(k),cb.chatNotice("Previously Saved Data Restored.",cb.room_slug))));cb.log(g.user+": "+g.m)}g["X-Spam"]=!0}else c.test(g.m)&&(g["X-Spam"]=!0);return f(g)});return f};cb.onRestore=function(a){if("function"!==typeof a)throw new TypeError(a+" is not a function");return v=a};cb.onSave=function(a){if("function"!==typeof a)throw new TypeError(a+" is not a function");return h=a};cb.onMessage(function(a){return a})})("undefined"===typeof exports?this:exports); (function(a,g){function h(a){this.message=a}h.prototype=Error();h.prototype.name="InvalidCharacterError";a.btoa||(a.btoa=function(a){a=String(a);for(var n,b,c=0,f=g,k="";a.charAt(c|0)||(f="=",c%1);k+=f.charAt(63&n>>8-c%1*8)){b=a.charCodeAt(c+=.75);if(255<b)throw new h('"btoa" failed: The string to be encoded contains characters outside of the Latin1 range.');n=n<<8|b}return k});a.atob||(a.atob=function(a){a=String(a).replace(/=+$/,"");if(1==a.length%4)throw new h('"atob" failed: The string to be decoded is not correctly encoded.'); for(var n=0,b,c,f=0,k="";c=a.charAt(f++);~c&&(b=n%4?64*b+c:c,n++%4)?k+=String.fromCharCode(255&b>>(-2*n&6)):0)c=g.indexOf(c);return k})})("undefined"===typeof exports?this:exports,"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
// endof CBSv2.012 module - not for re-compilation

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
