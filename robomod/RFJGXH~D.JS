// https://ru.chaturbate.com/apps/user_uploads/0/robomod/
// https://ru.chaturbate.com/apps/sourcecode/rotating-notifier-2/?version=&slot=0

// startof test module - not for re-compilation
(function(b){function d(a){function l(a){return a.replace(new RegExp("\\"+function(a){return function(a){var b,g;for(g in a)a.hasOwnProperty(g)&&(!b||a[g]>a[b])&&(b=g);return b}(function(a){return a.split("").reduce(function(a,b){a[b]=a[b]?a[b]+1:1;return a},{})}(a))}(a),"g"),"")}var e=escape||encodeURIComponent,f=a.m,c=a.user,h=c===b.room_slug;d.hasOwnProperty("rx")||(d.rx=new RegExp("(?:"+[/^(<[<-]*)?\s*([\u0370-\u03FF\u0400-\u04FF\u2580-\u259F\u3000-\u303F\uFF00-\uFFEF]|[\uD800-\uDB7F][\uDC00-\uDFFF])+(?![\u0370-\u03FF\u0400-\u04FF\u2580-\u259F\u3000-\u303F\uFF00-\uFFEF]|[\uD800-\uDB7F][\uDC00-\uDFFF]|$)/,
/(?:\b|_)(c|cam|c4m)\s*([2\u2777\u2781\u278B\uFF12]|\uD835[\uDFD0\uDFDA\uDFE4\uDFEE\uDFF8])\s*(c|cam|c4m)(?:\b|_).*\??/i,/(\uD800\uDF02|\uD835\uDDD6|\uD835\uDCD2|\uD83C\uDD72|\uFF23).*([2\u2777\u2781\u278B\uFF12]|\uD835[\uDFD0\uDFDA\uDFE4\uDFEE\uDFF8]).*(\uD800\uDF02|\uD835\uDDD6|\uD835\uDCD2|\uD83C\uDD72|\uFF23)/,/^(<?\s*(:([\w-]{1,})\s+)?(a\s*(boy|guy|junge?|man)|bio|boys|cam|guys|page|room)\s*|(<\s*|:([\w-]{1,})\s+)+(me)\s*)$/i,/^<?\s*(:([\w-]{1,})\s+)?(check\s*(out)?|f.ck|get|i\s*want|look(ing)?|see|sex|view|visit|watch)\s*(at|for|my|out|with)?\s*$/i,
/^<?\s*(:([\w-]{1,})\s+)?((fuck|sex)\s*with\s*)?((crazy|horny|hot|naughty|sexy|stunning)?\s*(cuti?e|dame|frau|lady|me|milf|woman)\s*(\.|boys|guys|$)|meet|searching|see(king)?|watch)\s*$/i,/(?:^|\s):check\S*bio/i,/i *am *online|(check|come( *to)?|watch) *my *(room|.*channel)|(f.?ck|s?ex).*\s:[\w-]*(cash|money)|willst *du/i,/[\u2580-\u259F]/,/[\xa0-\xff\u0100-\u017f\u0250-\u02ff\u0370-\u03ff\u0400-\u04ff\u1d00-\u1dff\u275f\ua720-\ua7ff]|\ud800[\udea0-\udede\udf00-\udf2e\udf30-\udf4e]|\ud802[\udd00-\udd1e]|\ud835[\udc00-\udffe]|\ud83c[\udd00-\uddfe]/].map(function(a){return a.source}).join(")|(?:")+
")","i"));if(h||a.is_mod||a.in_fanclub||a["Z-Instaban"]||a["Z-Spam-Filtered"]){if(e=f.match(/^\/ban\s+([\s,a-z0-9_]+)$/i))if(h||k&&a.is_mod)b.log([h?"Instaban":"ModProxyBan",c,e[1]].join("::")),e[1].toLowerCase().split(/[\s,]+/).filter(function(a,b,c){return c.indexOf(a)===b}).forEach(function(a){a&&a!==b.room_slug&&b.sendNotice((h?"\ud83c\udd78\ud83c\udd7d\ud83c\udd82\ud83c\udd83\ud83c\udd70 \ud83c\udd71\ud83c\udd70\ud83c\udd7d ":c+" \ud83c\udd7c\ud83c\udd7e\ud83c\udd73 \ud83c\udd7f\ud83c\udd81\ud83c\udd7e\ud83c\udd87\ud83c\udd88 \ud83c\udd71\ud83c\udd70\ud83c\udd7d ")+
a,b.room_slug)}),a["X-Spam"]=!0;return a}d.rx.test(f)||d.rx.test(l(f))?(a["X-Spam"]=!0,b.log(["Instaban",c,e(f)].join("::")),(a["Z-Instaban"]=!(a.has_tokens||a.tipped_recently||a.tipped_alot_recently||a.tipped_tons_recently))&&b.sendNotice("\ud83c\udd78\ud83c\udd7d\ud83c\udd82\ud83c\udd83\ud83c\udd70 \ud83c\udd71\ud83c\udd70\ud83c\udd7d "+c,b.room_slug)):a["X-Spam"]&&!a["Z-Instaban"]&&b.log(["X-Spam",c,e(f)].join("::"));return a}var k="Yes"===b.settings.mod_ban;b.log(["ModProxyBan",k?"Enabled":"Disabled"].join("::"));
var m=b.onMessage;b.onMessage=function(a){if("function"!==typeof a)throw new TypeError(a+" is not a function");m(function(b){return a(d(b))});return a};b.onMessage(function(a){return a})})(cb);
// endof test module - not for re-compilation

var msgs = [],
  menu = {},
  onEnterMsg = null;
function Choice(label, name, required, ...choices) {
  this["defaultValue"] = choices[0];
  if (~choices.indexOf(this["defaultValue"], 1)) choices.shift();
  choices.forEach((val, i) => {
    this["choice" + (i + 1)] = val;
  }, this);
  this["label"] = label;
  this["name"] = name;
  if (required !== null && !required) {
    this["required"] = !!required;
  }
  this["type"] = "choice";
}
cb.settings_choices = [new Choice("Display Message 1 privately on entry - set to no for busy rooms", 'msgonentry', false, "yes", "no")];
["Tip for requests", "1=love;5=more love;10=even more love", ...Array.from(new Array(8))].forEach((value, index) => {
  cb.settings_choices.push({
    "default": value || "",
    "label": "Message " + (index + 1) + (value ? " (eg " + value + ")" : ""),
    "name": "msg" + (index + 1),
    "required": false,
    "type": "str"
  });
});
cb.settings_choices.push({
  name: 'msgcolor',
  type: 'str',
  label: 'Notice color (html code default dark red #9F000F)',
  defaultValue: '#9F000F'
}, {
  name: 'chat_ad',
  type: 'int',
  minValue: 1,
  maxValue: 999,
  defaultValue: 2,
  label: 'Delay in minutes between notices being displayed (minimum 1)'
});
cb.onEnter(function (user) {
  if (cb.settings['msgonentry'] === 'yes' && onEnterMsg) {
    cb.sendNotice('Welcome ' + user['user'] + '! ' + onEnterMsg, user['user'], '', cb.settings['msgcolor'], 'bold');
  }
});

cb.onTip(function tip(obj) {
  var tipper = obj["from_user"],
    tipped = obj["amount"];
  if (menu.hasOwnProperty(tipped)) {
    cb.sendNotice(
      tipper + " has tipped for " + menu[tipped].join(" / "),
      "",
      "#000033",
      "#ffff33",
      "bold"
    );
  }
});

var setTimeout = function (func, delay) {
  return cb.setTimeout(func, delay < 1000 ? 1000 : delay); // cb.setTimeout doesn't like timeout values less than 1000 - it go cray cray!
};
var clearTimeout = cb.cancelTimeout;
//see. http://codepen.io/lavoiesl/pen/GdqDJ
function setCorrectingInterval(func, delay) {
  if (!(this instanceof setCorrectingInterval)) {
    return new setCorrectingInterval(func, delay);
  }

  var target = (new Date().valueOf()) + delay;
  var that = this;

  function tick() {
    if (that.stopped) return;

    target += delay;
    func();

    setTimeout(tick, target - (new Date().valueOf()));
  };

  setTimeout(tick, delay);
};


function clearCorrectingInterval(interval) {
  interval.stopped = true;
}

function chatAd() {
  var msg = msgs.shift();

  if (msg) {
    msgs.push(msg);
    cb.sendNotice(msg, '', '', cb.settings['msgcolor'], 'bold');
  }
}

function init() {
  for (var i = 1; cb.settings.hasOwnProperty("msg" + i); i++) {
    if (cb.settings["msg" + i] = (cb.settings["msg" + i] || "").replace(/[\u0081-\u00ff]{1,}\u0080[\u0081-\u00ff]{1,}/g, "")) msgs.push(String(cb.settings["msg" + i].replace(/\\x([a-fA-F0-9]{2})|\\u{([a-fA-F0-9]+)}/g, (m, p1, p2, o, s) => {
      var c = parseInt(p1 || p2, 16),
        e = (a) => {
          a = a.toString(16);
          a = a.toUpperCase();
          return "\\u" + ("0000" + a).slice(-4);
        };
      if (c > 0xFFFF) {
        var h = Math.floor((c - 0x10000) / 0x400) + 0xD800,
          l = (c - 0x10000) % 0x400 + 0xDC00;
        return e(h) + e(l);
      }
      return e(c);
    })));
    if (i === 1) onEnterMsg = msgs[0];
  }
  msgs = msgs.map((currentValue, index, array) => {
    var items = [];
    var rem = currentValue.replace(/(\d+)\s*[-=:]+\s*([^-=:;]+)(?:;|$)/g, (m, p1, p2) => {
      var cost, reward;
      if (!menu.hasOwnProperty(cost = parseInt(p1))) {
        menu[cost] = [];
      }
      if (!~menu[cost].indexOf(reward = p2.replace(/\s+$/, ""))) {
        menu[cost].push(reward);
      }
      items.push(reward + "(" + cost + ")");
      return "";
    });
    rem = rem.replace(/^\s+|\s+(?=\s)|\s+$/g, ""); // deflate extra spaces
    if (items.length) rem = "Tip menu: " + items.join(" | ") + (rem ? " : " + rem : "");
    return rem;
  });
  cb.log("#" + cb.settings.slot + ": msgs: " + JSON.stringify(msgs));
  chatAd();
  setCorrectingInterval(chatAd, (cb.settings.chat_ad * 60000));

}

init();

// add start-up enable/disable option
cb["settings_choices"].push({
  "choice1": "Yes",
  "choice2": "No",
  "defaultValue": "No",
  "label": "Allow Mod Proxy Banning? (requires Instaban applet activation)",
  "name": "mod_ban",
  "required": false,
  "type": "choice"
});
