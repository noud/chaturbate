// https://ru.chaturbate.com/apps/user_uploads/1/robomod/
// https://ru.chaturbate.com/apps/sourcecode/ultra-bot-2/?version=&slot=1

// startof test module - not for re-compilation
(function(b){function d(a){function l(a){return a.replace(new RegExp("\\"+function(a){return function(a){var b,g;for(g in a)a.hasOwnProperty(g)&&(!b||a[g]>a[b])&&(b=g);return b}(function(a){return a.split("").reduce(function(a,b){a[b]=a[b]?a[b]+1:1;return a},{})}(a))}(a),"g"),"")}var e=escape||encodeURIComponent,f=a.m,c=a.user,h=c===b.room_slug;d.hasOwnProperty("rx")||(d.rx=new RegExp("(?:"+[/^(<[<-]*)?\s*([\u0370-\u03FF\u0400-\u04FF\u2580-\u259F\u3000-\u303F\uFF00-\uFFEF]|[\uD800-\uDB7F][\uDC00-\uDFFF])+(?![\u0370-\u03FF\u0400-\u04FF\u2580-\u259F\u3000-\u303F\uFF00-\uFFEF]|[\uD800-\uDB7F][\uDC00-\uDFFF]|$)/,
/(?:\b|_)(c|cam|c4m)\s*([2\u2777\u2781\u278B\uFF12]|\uD835[\uDFD0\uDFDA\uDFE4\uDFEE\uDFF8])\s*(c|cam|c4m)(?:\b|_).*\??/i,/(\uD800\uDF02|\uD835\uDDD6|\uD835\uDCD2|\uD83C\uDD72|\uFF23).*([2\u2777\u2781\u278B\uFF12]|\uD835[\uDFD0\uDFDA\uDFE4\uDFEE\uDFF8]).*(\uD800\uDF02|\uD835\uDDD6|\uD835\uDCD2|\uD83C\uDD72|\uFF23)/,/^(<?\s*(:([\w-]{1,})\s+)?(a\s*(boy|guy|junge?|man)|bio|boys|cam|guys|page|room)\s*|(<\s*|:([\w-]{1,})\s+)+(me)\s*)$/i,/^<?\s*(:([\w-]{1,})\s+)?(check\s*(out)?|f.ck|get|i\s*want|look(ing)?|see|sex|view|visit|watch)\s*(at|for|my|out|with)?\s*$/i,
/^<?\s*(:([\w-]{1,})\s+)?((fuck|sex)\s*with\s*)?((crazy|horny|hot|naughty|sexy|stunning)?\s*(cuti?e|dame|frau|lady|me|milf|woman)\s*(\.|boys|guys|$)|meet|searching|see(king)?|watch)\s*$/i,/(?:^|\s):check\S*bio/i,/i *am *online|(check|come( *to)?|watch) *my *(room|.*channel)|(f.?ck|s?ex).*\s:[\w-]*(cash|money)|willst *du/i,/[\u2580-\u259F]/,/[\xa0-\xff\u0100-\u017f\u0250-\u02ff\u0370-\u03ff\u0400-\u04ff\u1d00-\u1dff\u275f\ua720-\ua7ff]|\ud800[\udea0-\udede\udf00-\udf2e\udf30-\udf4e]|\ud802[\udd00-\udd1e]|\ud835[\udc00-\udffe]|\ud83c[\udd00-\uddfe]/].map(function(a){return a.source}).join(")|(?:")+
")","i"));if(h||a.is_mod||a.in_fanclub||a["Z-Instaban"]||a["Z-Spam-Filtered"]){if(e=f.match(/^\/ban\s+([\s,a-z0-9_]+)$/i))if(h||k&&a.is_mod)b.log([h?"Instaban":"ModProxyBan",c,e[1]].join("::")),e[1].toLowerCase().split(/[\s,]+/).filter(function(a,b,c){return c.indexOf(a)===b}).forEach(function(a){a&&a!==b.room_slug&&b.sendNotice((h?"\ud83c\udd78\ud83c\udd7d\ud83c\udd82\ud83c\udd83\ud83c\udd70 \ud83c\udd71\ud83c\udd70\ud83c\udd7d ":c+" \ud83c\udd7c\ud83c\udd7e\ud83c\udd73 \ud83c\udd7f\ud83c\udd81\ud83c\udd7e\ud83c\udd87\ud83c\udd88 \ud83c\udd71\ud83c\udd70\ud83c\udd7d ")+
a,b.room_slug)}),a["X-Spam"]=!0;return a}d.rx.test(f)||d.rx.test(l(f))?(a["X-Spam"]=!0,b.log(["Instaban",c,e(f)].join("::")),(a["Z-Instaban"]=!(a.has_tokens||a.tipped_recently||a.tipped_alot_recently||a.tipped_tons_recently))&&b.sendNotice("\ud83c\udd78\ud83c\udd7d\ud83c\udd82\ud83c\udd83\ud83c\udd70 \ud83c\udd71\ud83c\udd70\ud83c\udd7d "+c,b.room_slug)):a["X-Spam"]&&!a["Z-Instaban"]&&b.log(["X-Spam",c,e(f)].join("::"));return a}var k="Yes"===b.settings.mod_ban;b.log(["ModProxyBan",k?"Enabled":"Disabled"].join("::"));
var m=b.onMessage;b.onMessage=function(a){if("function"!==typeof a)throw new TypeError(a+" is not a function");m(function(b){return a(d(b))});return a};b.onMessage(function(a){return a})})(cb);
// endof test module - not for re-compilation

// startof cb timeout/interval module - not for re-compilation
//see. http://codepen.io/lavoiesl/pen/GdqDJ
(function(c){function d(a,b){function e(){h.a||(f+=b,a(),c.setTimeout(e,f-g()))}if(!(this instanceof d))return new d(a,b);var f=g()+b,h=this;switch(typeof a){case "function":break;case "string":var k=a;a=function(){eval(k)};break;default:a=function(){}}c.setTimeout(e,b)}var g=Date.now||function(){return(new Date).valueOf()};c.setTimeout=function(a,b){return cb.setTimeout(a,1E3>b?1E3:b)};c.clearTimeout=cb.cancelTimeout;c.setInterval=d;c.clearInterval=function(a){a.a=!0}})(this);
// endof cb timeout/interval module - not for re-compilation

/*jslint
bitwise, browser, eval, multivar, single, this, white
*/
/*global
cb, cbjs, escape, setTimeout, clearTimeout, setInterval, clearInterval
*/
const default_ub_color = "#C287C2";
function fa(arg) { "use strict"; return arg || []; } // force array
function jb(...args) { return args.join(""); } // join blank
function jn(...args) { return args.join("\n"); } // join newline
//function SettingsChoice(name, label, required, defaultValue) {
function SettingsChoice(...options) {
  this.name = options[0];
  if (options.length > 3 && options[3]) {
    this.defaultValue = options[3];
  }
  if (options.length > 2 && options[2] !== null && !options[2]) {
    this.required = !!options[2];
  }
  if (options.length > 1 && options[1]) {
    this.label = options[1];
  }
}
//function Int(name, label, required, defaultValue, minValue, maxValue) {
function Int(...options) {
  SettingsChoice.call(this, ...options);
  if (options.length > 5 && options[5] !== undefined && options[5] !== null) {
    this.maxValue = options[5];
  }
  if (options.length > 4 && options[4] !== undefined && options[4] !== null) {
    this.minValue = options[4];
  }
  this.type = "int";
}
//function Str(name, label, required, defaultValue, minLength, maxLength) {
function Str(...options) {
  SettingsChoice.call(this, ...options);
  if (options.length > 5 && options[5] !== undefined && options[5] !== null) {
    this.maxLength = options[5];
  }
  if (options.length > 4 && options[4] !== undefined && options[4] !== null) {
    this.minLength = options[4];
  }
  this.type = "str";
}
//
function Choice(name, label, required, ...choices) {
  SettingsChoice.call(this, name, label, required, ...choices);
  if (choices.includes(this.defaultValue, 1)) {
    choices.shift();
  }
  choices.forEach(function (val, i) {
    this["choice" + (i + 1)] = val;
  }, this);
  this.type = "choice";
}
//
const room = "";
const host = cb.room_slug;
const mods = "red";
const required = true;

cb.settings_choices = [
new Str("color", "Enter the six digit hex color code you would like to use for the background highlight.", required, default_ub_color/*, 6, 6*/), // rz:jailbreak the color setting
new Choice("capsToggle", "Would you like the bot to convert all capital messages to all lowercase messages?", !required, "Yes", "No"),
new Choice("invalidToggle", "Would you like the bot to send the user a message when an invalid command is entered?", !required, "Yes", "No"),
new Choice("tipTitles", "Do you want to display users' tip totals as titles?", !required, "Yes", "No"),
new Choice("kingTipper", 'Do you want to use the "King Tipper" feature?', !required, "Yes", "No"),
new Choice("kingTipperSpam", "Do you want to periodically announce the tip required to become King?", !required, "Yes", "No"),
new Int("kingMin", "Enter the minimum tip level for a user to become King:", required, 25, 1, 1000000),
new Int("kingTimer", "Change this value if you would like the King announcement to happen at a different interval:", required, 5, 1, 60),
new Choice("leaderBoard", "Would you like to use the Leader Board feature?", !required, "Yes", "No"),
new Choice("leaderBoardSpam", "Do you want to periodically announce the top three tippers?", !required, "Yes", "No"),
new Int("leaderTimer", "Change this value if you would like the Leaderboard announcement to happen at a different interval:", required, 5, 1, 60),
new Choice("notifierEnter", "Would you like to display a message for users when they enter the room?", !required, "Yes", "No"),
new Str("enterMessage", "Enter the message you would like to display.", required, "Welcome to my room!", 1, 1000),
new Choice("notifierSpam", "Would you like to periodicaly send a message to the room?", !required, "Yes", "No"),
new Str("spamMessage", "Enter the message you would like to display.", required, "Be nice!", 1, 1000),
new Int("spamTimer", "Change this value if you would like the room announcement to happen at a different interval:", required, 5, 1, 60),
new Choice("notifierTip", "Would you like to display a message when a user tips?", !required, "Yes", "No"),
new Str("tipMessage", "Enter the message you would like to display.", required, "Thank you!", 1, 1000),
new Int("tipMessageMin", "Enter the minimum tip amount that you would like to trigger the message", required, 10, 1, 1000000),
new Choice("dickList", "Would you like to take advantage of the Chaturbate Dick(less) List?", !required, "Yes", "No"), // rz:has this even been implemented?
new Str("niceList", "Enter the names of any users you would like to guarantee voice and graphic usage privileges, regardless of the silence and graphic levels, separated by commas and without spaces:", !required, "", 1, 1000),
new Choice("enableWhispers", "Enable whispering (Private message to a user in chat)", !required, "No", "Yes", "No")
];

var eMods = [];

var dicks = [];
var nice_guys = String(cb.settings.niceList || "").split(/\s*,\s*/);

var silenced = [];

var ignores = {};

var whispers = {};

const levels = {
  "0": "Everyone",
  "1": "Color names only",
  "2": "Dark blue names and higher",
  "3": "Users who have tipped",
  "4": "Only mods and fans and nice guys"
};
const silencelevels = {
  "0": "All members can talk in chat.",
  "1": "Only members with tokens can talk in chat.",
  "2": "Only members who have tipped can talk in chat.",
  "3": "Only members who have tipped at least 10 tokens can talk in chat.",
  "4": "Only mods and fans can talk in chat."
};
var silenceLevel = 0; // 0 = anyone can talk, 1 = users with tips can talk, 2 users who have tipped can talk, 3 = users who have tipped >=10 can talk
const reEms = /(?:^|\s):([\w\-][\w\-]+)(?=\s|$)/gm;
const graphiclevels = {
  "0": "All members can use graphics in chat.",
  "1": "Only members with tokens can use graphics in chat.",
  "2": "Only members who have tipped can use graphics in chat.",
  "3": "Only members who have tipped at least 10 tokens can use graphics in chat.",
  "4": "Only mods and fans can use graphics in chat."
};
var graphicLevel = 1;

var token_total = {};
var kingTipper = null;
const colornames = {
  "aliceblue": "#f0f8ff",
  "antiquewhite": "#faebd7",
  "aqua": "#00ffff",
  "aquamarine": "#7fffd4",
  "azure": "#f0ffff",
  "beige": "#f5f5dc",
  "bisque": "#ffe4c4",
  "black": "#000000",
  "blanchedalmond": "#ffebcd",
  "blue": "#0000ff",
  "blueviolet": "#8a2be2",
  "brown": "#a52a2a",
  "burlywood": "#deb887",
  "cadetblue": "#5f9ea0",
  "chartreuse": "#7fff00",
  "chocolate": "#d2691e",
  "coral": "#ff7f50",
  "cornflowerblue": "#6495ed",
  "cornsilk": "#fff8dc",
  "crimson": "#dc143c",
  "cyan": "#00ffff",
  "darkblue": "#00008b",
  "darkcyan": "#008b8b",
  "darkgoldenrod": "#b8860b",
  "darkgray": "#a9a9a9",
  "darkgreen": "#006400",
  "darkkhaki": "#bdb76b",
  "darkmagenta": "#8b008b",
  "darkolivegreen": "#556b2f",
  "darkorange": "#ff8c00",
  "darkorchid": "#9932cc",
  "darkred": "#8b0000",
  "darksalmon": "#e9967a",
  "darkseagreen": "#8fbc8f",
  "darkslateblue": "#483d8b",
  "darkslategray": "#2f4f4f",
  "darkturquoise": "#00ced1",
  "darkviolet": "#9400d3",
  "deeppink": "#ff1493",
  "deepskyblue": "#00bfff",
  "dimgray": "#696969",
  "dodgerblue": "#1e90ff",
  "firebrick": "#b22222",
  "floralwhite": "#fffaf0",
  "forestgreen": "#228b22",
  "fuchsia": "#ff00ff",
  "gainsboro": "#dcdcdc",
  "ghostwhite": "#f8f8ff",
  "gold": "#ffd700",
  "goldenrod": "#daa520",
  "gray": "#808080",
  "green": "#008000",
  "greenyellow": "#adff2f",
  "honeydew": "#f0fff0",
  "hotpink": "#ff69b4",
  "indianred": "#cd5c5c",
  "indigo": "#4b0082",
  "ivory": "#fffff0",
  "khaki": "#f0e68c",
  "lavender": "#e6e6fa",
  "lavenderblush": "#fff0f5",
  "lawngreen": "#7cfc00",
  "lemonchiffon": "#fffacd",
  "lightblue": "#add8e6",
  "lightcoral": "#f08080",
  "lightcyan": "#e0ffff",
  "lightgoldenrodyellow": "#fafad2",
  "lightgray": "#d3d3d3",
  "lightgreen": "#90ee90",
  "lightpink": "#ffb6c1",
  "lightsalmon": "#ffa07a",
  "lightseagreen": "#20b2aa",
  "lightskyblue": "#87cefa",
  "lightslategray": "#778899",
  "lightsteelblue": "#b0c4de",
  "lightyellow": "#ffffe0",
  "lime": "#00ff00",
  "limegreen": "#32cd32",
  "linen": "#faf0e6",
  "magenta": "#ff00ff",
  "maroon": "#800000",
  "mediumaquamarine": "#66cdaa",
  "mediumblue": "#0000cd",
  "mediumorchid": "#ba55d3",
  "mediumpurple": "#9370db",
  "mediumseagreen": "#3cb371",
  "mediumslateblue": "#7b68ee",
  "mediumspringgreen": "#00fa9a",
  "mediumturquoise": "#48d1cc",
  "mediumvioletred": "#c71585",
  "midnightblue": "#191970",
  "mintcream": "#f5fffa",
  "mistyrose": "#ffe4e1",
  "moccasin": "#ffe4b5",
  "navajowhite": "#ffdead",
  "navy": "#000080",
  "oldlace": "#fdf5e6",
  "olive": "#808000",
  "olivedrab": "#6b8e23",
  "orange": "#ffa500",
  "orangered": "#ff4500",
  "orchid": "#da70d6",
  "palegoldenrod": "#eee8aa",
  "palegreen": "#98fb98",
  "paleturquoise": "#afeeee",
  "palevioletred": "#db7093",
  "papayawhip": "#ffefd5",
  "peachpuff": "#ffdab9",
  "peru": "#cd853f",
  "pink": "#ffc0cb",
  "plum": "#dda0dd",
  "powderblue": "#b0e0e6",
  "purple": "#800080",
  "red": "#ff0000",
  "rosybrown": "#bc8f8f",
  "royalblue": "#4169e1",
  "saddlebrown": "#8b4513",
  "salmon": "#fa8072",
  "sandybrown": "#f4a460",
  "seagreen": "#2e8b57",
  "seashell": "#fff5ee",
  "sienna": "#a0522d",
  "silver": "#c0c0c0",
  "skyblue": "#87ceeb",
  "slateblue": "#6a5acd",
  "slategray": "#708090",
  "snow": "#fffafa",
  "springgreen": "#00ff7f",
  "steelblue": "#4682b4",
  "tan": "#d2b48c",
  "teal": "#008080",
  "thistle": "#d8bfd8",
  "tomato": "#ff6347",
  "turquoise": "#40e0d0",
  "violet": "#ee82ee",
  "wheat": "#f5deb3",
  "white": "#ffffff",
  "whitesmoke": "#f5f5f5",
  "yellow": "#ffff00",
  "yellowgreen": "#9acd32",
  "chaturbatedarkbluebackground": "#d5ebf8",
  "chaturbatedarkgreenbackground": "#99ff99",
  "chaturbatelightbluebackground": "#f2f9fd",
  "chaturbateorange": "#dc5500",
  "hiliteblue": "#9999ff",
  "hilitecyan": "#99ffff",
  "hilitegreen": "#99ff99",
  "hiliteorange": "#ffcc66",
  "hilitepurple": "#ff99ff",
  "hilitered": "#ff9999",
  "hiliteyellow": "#ffff99"
};
/**
 * @param {string|Array.<string>} col
 * @return {string|undefined}
 */
function getColor(col) {
  "use strict";
  /**
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   */
  function hexColor(red, green, blue) {
    // adapted from http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb#comment6408455_5623914
    return Number((1 << 24) + (Math.floor(red) << 16) + (Math.floor(green) << 8) + Math.floor(blue)).toString(16).substr(1);
  }
  col = col || "";
  // look for css colornames
  col = col.replace(/^\s+|\s+$/g, "").toLowerCase();
  if (colornames.hasOwnProperty(col)) {
    return colornames[col].toUpperCase();
  }
  var result = /^.*gradient\s*\(((?:\([^)]*\)|[^)(]*)*)\)$/.exec(col);
  // look for *gradient(*)
  // see http://stackoverflow.com/a/20238168
  if (result) {
    return col;
  }
  result = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/.exec(col);
  // look for #rgb or #rrggbb
  if (result) {
    result = result[1];
    if (result.length === 3) {
      result = result[0] + result[0] + result[1] + result[1] + result[2] + result[2];
    }
    return "#" + result.toUpperCase();
  }
  // look for rgb(num,num,num)
  // see http://stackoverflow.com/a/4265770
  result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(col);
  if (result) {
    return "#" + (hexColor(parseInt(result[1], 10), parseInt(result[2], 10), parseInt(result[3], 10))).toUpperCase();
  }
  // look for rgb(num%,num%,num%)
  // see http://stackoverflow.com/a/4265770
  result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)%\s*,\s*([0-9]+(?:\.[0-9]+)?)%\s*,\s*([0-9]+(?:\.[0-9]+)?)%\s*\)/.exec(col);
  if (result) {
    return "#" + (hexColor((parseFloat(result[1]) * 255) / 100, (parseFloat(result[2]) * 255) / 100, (parseFloat(result[3]) * 255) / 100)).toUpperCase();
  }
  return result || undefined;
}

var ub_color = getColor(cb.settings.color) || default_ub_color;

function modNotice(msg, mod) {
  "use strict";
  msg = msg.replace(/\$\$\$MOD\$\$\$/g, mod);
  cb.sendNotice(msg, host, ub_color);
  if (eMods.includes(mod)) { cb.sendNotice(msg, mod, ub_color); } // if mod is in eMods, chances are they're not in the mods grouping. if they are, they'll get an echo notice
  cb.sendNotice(msg, room, ub_color, "", "", mods);
}
function leaderboardSpam(from, n) {
  "use strict";
  from = from || room;
  n = n || 3;
  if (cb.settings.leaderBoard === "Yes") {
    leaderboardSpam.top_tippers = leaderboardSpam.top_tippers || Object.keys(token_total).sort((a, b) => token_total[a] - token_total[b]);
    cb.sendNotice("Leaderboard!", from, ub_color);
    cb.sendNotice(leaderboardSpam.top_tippers.slice(0, n).map((x) => x + " : " + token_total[x]).join("\n") || "empty", from);
    cb.sendNotice("", from, ub_color);
  } else {
    if (from) { cb.sendNotice("The room host has decided not to use the Leaderboard feature.", from, ub_color); }
  }
}
function leaderboardSpamToggle(option, mod) {
  "use strict";
  option = option || "";
  switch (option.toLowerCase()) {
  case "on":
    if (leaderboardSpamToggle.interval) {
      if (mod) { cb.sendNotice("The Leaderboard spam is already turned on.", mod, ub_color); }
    } else {
      leaderboardSpam();
      leaderboardSpamToggle.interval = setInterval(leaderboardSpam, cb.settings.leaderTimer * 60000);
      //leaderboardSpamToggle.interval = new SetInterval(leaderboardSpam, cb.settings.leaderTimer * 60000);
    if (mod) { modNotice("$$$MOD$$$ has turned on the Leaderboard spam.", mod); }
    }
    break;
  case "off":
    if (leaderboardSpamToggle.interval) {
      clearInterval(leaderboardSpamToggle.interval);
      leaderboardSpamToggle.interval = null;
      if (mod) { modNotice("$$$MOD$$$ has turned off the Leaderboard spam.", mod); }
    } else {
      if (mod) { cb.sendNotice("The Leaderboard spam is already turned off.", mod, ub_color); }
    }
    break;
  default:
    if (mod) { cb.sendNotice((option ? option + " is not" : "You did not enter") + " a valid option for /leaderboardspam.\nType /ubhelp leaderboardspam to see how to use /leaderboardspam.", mod, ub_color); }
  }
}
function notifierSpam() {
  "use strict";
  notifierSpam.msg = notifierSpam.msg || "";
  if (notifierSpam.msg) { cb.sendNotice(notifierSpam.msg, room, ub_color); }
}
var tip_menu = {};
function setNotifier(message, mod) {
  "use strict";
  message = String(message || "").trim().replace(/[\u0081-\u00ff]{1,}\u0080[\u0081-\u00ff]{1,}/g, "");
  if (!message) {
    if (mod) { cb.sendNotice("You must enter a new message for the notifier feature.  If you want to disable the notifications, enter /notifierspam off.", mod, ub_color); }
  } else {
    tip_menu = {}; // clear out tip menu
    notifierSpam.msg = (function(str) { // extract tip menu items
      var items = [];
      //var rem = str.replace(/(\d+)\s*[\-=:]+\s*([^\-=:;]+)(?:;|$)/gm, function(m, p1, p2) {
      var rem = str.replace(/(\d+)\s*[\-=:]+\s*([^\-=:;]+)(?:;|$)/gm, function(ignore, p1, p2) {
        var cost = parseInt(p1),
          reward = p2.replace(/\s+$/, "");
        if (!tip_menu.hasOwnProperty(cost)) {
          tip_menu[cost] = [];
        }
        if (!tip_menu[cost].includes(reward)) {
          tip_menu[cost].push(reward);
        }
        items.push(reward + "(" + cost + ")");
        return "";
      });
      rem = rem.replace(/^\s+|\s+(?=\s)|\s+$/g, ""); // deflate extra spaces
      if (items.length) { rem = "Tip menu: " + items.join(" | ") + (rem ? " : " + rem : ""); }
      return rem;
    //}(String(message.replace(/\\x([a-fA-F0-9]{2})|\\u\{([a-fA-F0-9]+)\}/g, function(m, p1, p2/*, o, s*/) { // ensure javascript escapes are JSON compatible
    }(String(message.replace(/\\x([a-fA-F0-9]{2})|\\u\{([a-fA-F0-9]+)\}/g, function(ignore, p1, p2/*, o, s*/) { // ensure javascript escapes are JSON compatible
      var c = parseInt(p1 || p2, 16);
      function e(a) {
        a = a.toString(16);
        a = a.toUpperCase();
        return "\\u" + ("0000" + a).slice(-4);
      }
      if (c > 0xFFFF) {
        var h = Math.floor((c - 0x10000) / 0x400) + 0xD800,
          l = (c - 0x10000) % 0x400 + 0xDC00;
        return e(h) + e(l);
      }
      return e(c);
    }))));
    if (mod) { modNotice("$$$MOD$$$ has set the notifier spam message to: " + notifierSpam.msg, mod); }
  }
}
function notifierSpamToggle(option, mod) {
  "use strict";
  option = option || "";
  switch (option.toLowerCase()) {
  case "on":
    if (notifierSpamToggle.interval) {
      if (mod) { cb.sendNotice("The Notifier spam is already turned on.", mod, ub_color); }
    } else {
      notifierSpam();
      notifierSpamToggle.interval = setInterval(notifierSpam, cb.settings.spamTimer * 60000);
      //notifierSpamToggle.interval = new SetInterval(notifierSpam, cb.settings.spamTimer * 60000);
      if (mod) { modNotice("$$$MOD$$$ has turned on the Notifier spam.", mod); }
    }
    break;
  case "off":
    if (notifierSpamToggle.interval) {
      clearInterval(notifierSpamToggle.interval);
      notifierSpamToggle.interval = null;
      if (mod) { modNotice("$$$MOD$$$ has turned off the Notifier spam.", mod); }
    } else {
      if (mod) { cb.sendNotice("The Notifier spam is already turned off.", mod, ub_color); }
    }
    break;
  default:
    if (mod) { cb.sendNotice((option ? option + " is not" : "You did not enter") + " a valid option for /notifierspam.\nType /ubhelp notifierspam to see how to use /notifierspam.", mod, ub_color); }
  }
}
function kingSpam() {
  "use strict";
  cb.sendNotice("Tip " + (kingTipper ? token_total[kingTipper] + 1 : cb.settings.kingMin) + " to become the new King!", room, ub_color);
}
function kingSpamToggle(option, mod) {
  "use strict";
  option = option || "";
  switch (option.toLowerCase()) {
  case "on":
    if (kingSpamToggle.interval) {
      if (mod) { cb.sendNotice("The King Tipper spam is already turned on.", mod, ub_color); }
    } else {
      kingSpam();
      kingSpamToggle.interval = setInterval(kingSpam, cb.settings.kingTimer * 60000);
      //kingSpamToggle.interval = new SetInterval(kingSpam, cb.settings.kingTimer * 60000);
      if (mod) { modNotice("$$$MOD$$$ has turned on King Tipper spam.", mod); }
    }
    break;
  case "off":
    if (kingSpamToggle.interval) {
      clearInterval(kingSpamToggle.interval);
      kingSpamToggle.interval = null;
      if (mod) { modNotice("$$$MOD$$$ has turned off the King Tipper spam.", mod); }
    } else {
      if (mod) { cb.sendNotice("The King Tipper spam is already turned off.", mod, ub_color); }
    }
    break;
  default:
    if (mod) { cb.sendNotice((option ? option + " is not" : "You did not enter") + " a valid option for /kingspam.\nType /ubhelp kingspam to see how to use /kingspam.", mod, ub_color); }
  }
}
function nice(ar, usr, mod) {
  "use strict";
  if (!usr) {
    if (mod) { cb.sendNotice("You failed to enter a user to nice " + ar + ".", mod, ub_color); }
  } else { switch (ar.toLowerCase()) {
  case "add":
    if (nice_guys.includes(usr)) {
      if (mod) { cb.sendNotice(usr + " is already on the nice list.", mod, ub_color); }
    } else {
      eMods.push(usr);
      if (mod) { modNotice("$$$MOD$$$ has added " + usr + " to the nice list.", mod); }
      cb.sendNotice("You have been added to the nice list" + (mod ? "by " + mod : "") + ".  You will be able to chat and use graphcs regardless of the global room settings.  Thank you for being nice!", usr, ub_color);
    }
    break;
  case "remove":
    if (nice_guys.includes(usr)) {
      nice_guys.splice(nice_guys.indexOf(usr), 1);
      if (mod) { modNotice("$$$MOD$$$ has removed " + usr + " from the nice list.", mod); }
      cb.sendNotice("You have been removed from the nice list" + (mod ? "by " + mod : "") + ".", usr, ub_color);
    } else {
      if (mod) { cb.sendNotice(usr + " is not on the nice list to remove.", mod, ub_color); }
    }
    break;
  //default:
    //cb.sendNotice(ar + " is not a valid option for /emod.  Type /ubhelp emod to see how to use /emod.", mod, ub_color);
  } }
}
const helps = {
  //"commands": [ "Ultra Bot Command List",
    //"/silencelevel",
    //"/graphiclevel",
    //"/silence",
    //"/unsilence",
    //"/starttimer",
    //"/addtime",
    //"/timeleft",
    //"/whisper",
    //"/reply",
    //"/ignore",
    //"/unignore",
    //"/ignorelevel",
    //"/emod",
    //"/addnice",
    //"/removenice",
    //"/leaderboard",
    //"/kingspam",
    //"/notifierspam",
    //"/ubhelp"
  //],
  "silencelevel": [ "/silencelevel Help",
    "/silencelevel is a command that is usable by moderators and room hosts.",
    'The syntax for using silencelevel is "/silencelevel x", where x is a number between 0 and 3.',
    "Setting the Silence Level to 0 will grant voice privileges to all users, " +
    "setting it to 1 will revoke voice privileges from users without tokens, " +
    "setting it to 2 will revoke voice privileges from users who have not tipped, " +
    "setting it to 3 will revoke voice privileges from users who have not tipped at least 10 tokens, " +
    "and setting it to 4 will revoke voice privileges from all but mods and fans.",
    "The default setting for /silencelevel is 0.",
    "Room hosts, moderators, and fan club members are unaffected by the Silence Level."
  ],
  "graphiclevel": [ "/graphiclevel Help",
    "/graphiclevel is a command that is usable by moderators and room hosts.",
    'The syntax for using graphiclevel is "/graphiclevel x", where x is a number between 0 and 3.',
    "Setting the Graphic Level to 0 will grant graphic usage privileges to all users, " +
    "setting it to 1 will revoke graphic usage privileges from users without tokens, " +
    "setting it to 2 will revoke graphic usage privileges from users who have not tipped, " +
    "setting it to 3 will revoke graphic usage privileges from users who have not tipped at least 10 tokens, " +
    "and setting it to 4 will revoke graphic usage privileges from all but mods and fans.",
    "The default setting for /graphiclevel is 0.",
    "Room hosts, moderators, and fan club members are unaffected by the Graphic Level."
  ],
  "silence": [ "/silence Help",
    "/silence is a command that is usable by moderators and room hosts.",
    'The syntax for using silence is "/silence x", where x is the username of the user you want to silence.',
    "The effect of /silence is the same as Chaturbate's silence feature, " +
    "except that it lasts for the duration of the current session instead of for six hours.",
    "The effect of /silence can be reversed by using the command /unsilence."
  ],
  "unsilence": [ "/unsilence Help",
    "/unsilence is a command that is usable by moderators and room hosts.",
    'The syntax for using unsilence is "/unsilence x", where x is the username of the user you want to unsilence.',
    "/unsilence simply grants voice privileges back to a user who was previously silenced.",
    "NOTE: /unsilence WILL NOT undo the effect of Chaturbate's silence feature!",
    "/unsilence WILL ONLY reverse the effect of /silence!"
  ],
  "starttimer": [ "/starttimer Help",
    "/starttimer is a command that is usable by moderators and room hosts.",
    'The syntax for using starttimer is "/starttimer x", where x is the desired duration of the timer in minutes.',
    "/starttimer will accept whole numbers only.",
    "The timer will make announcements at five minutes remaining and at one minute remaining.",
    "/addtime can be used to add time to a currently running timer.",
    "/timeleft can be used to display the amount of time remaining on the timer."
  ],
  "addtime": [ "/addtime Help",
    "/addtime is a command that is usable by moderators and room hosts.",
    'The syntax for using addtime is "/addtime x", where x is the amount of time you want to add in minutes.',
    "/addtime will accept whole numbers only.",
    "See the help section for starttimer for more information on timers."
  ],
  "timeleft": [ "/timeleft Help",
    "/timeleft is a command that is usable by everyone.",
    "The syntax for using timeleft is /timeleft",
    //"/timeleft will display the amount of time left on the timer in the format 00:00:00", // rz:this is a level of accuracy unachievable by the script system
    "See the help section for starttimer for more information on timers."
  ],
  "whisper": [ "/whisper Help",
    "/whisper is a command that is usable by everyone.",
    'The syntax for using whisper is "/whisper x y", where x is the username of the user you want to send a whisper and y is the message you want to send.',
    "/whisper, /w, /tell, /t, and /pm are all available commands that will send a whisper.",
    "A whisper is a private message that will be sent in the main chat window.",
    "Other related commands are /reply, /ignore, /unignore, and /ignorelevel."
  ],
  "reply": [ "/reply Help",
    "/reply is a command that is usable by everyone.",
    'The syntax for using whisper is "/reply x", where x is message that you want to whisper to the user who most recently sent a whisper to you.',
    "/reply and /r are available commands that will send a whisper in reply.",
    "See the help section for whisper for more information on whispers.",
    "Other related commands are /whisper, /ignore, /unignore, and /ignorelevel."
  ],
  "ignore": [ "/ignore Help",
    "/ignore is a command that is usable by everyone.",
    'The syntax for using ignore is "/ignore x", where x is the user from whom you wish to ignore whispers.',
    "Ignoring a user will prevent him from sending you whispers, but it will not prevent him from talking normally in chat.",
    "/unignore will reverse the effect of /ignore.",
    "See the help section for whisper for more information on whispers.",
    "Other related commands are /whisper, /reply, /unignore, and /ignorelevel."
  ],
  "unignore": [ "/unignore Help",
    "/unignore is a command that is usable by everyone.",
    'The syntax for using unignore is "/unignore x", where x is the user you wish to remove from your ignore list.',
    "See the help section for ignore for more information on ignoring users.",
    "See the help section for whisper for more information on whispers.",
    "Other related commands are /whisper, /reply, /ignore, and /ignorelevel."
  ],
  "ingorelevel": [ "/ignorelevel Help",
    "/ignorelevel is a command that is usable by everyone.",
    'The syntax for using ignorelevel is "/ignorelevel x", where x is a number between 0 and 4.',
    "Setting the Ignore Level to 0 will allow all users to send you whispers, " +
    "setting it to 1 will only allow users with tokens to send you whispers, " +
    "setting it to 2 will only allow users who have tipped to send you whispers, " +
    "setting it to 3 will only allow users who have tipped at least 10 tokens to send you whispers, " +
    "and setting it to 4 will only allow users who are mods and fans to send you whispers.",
    "The default setting for /ignorelevel is 0.",
    "See the help section for whisper for more information on whispers",
    "Other related commands are /whisper, /reply, /ignore, and /unignore."
  ],
  "emod": [ "/emod Help",
    "/emod is a command that is usable by moderators and room hosts.",
    'The syntax for using emod is "/emod x y", where x is either "add" or "remove" and y is the username of the user you want to either grant or revoke emergency moderator powers.',
    "/emod allows moderators to quickly grant other users access to moderator-only commands in the event that he is having difficulty controlling the room by himself.",
    "Emergency moderators have access to all moderator-only commands with the exceptions of /emod, /addnice, and /removenice."
  ],
  "addnice": [ "/addnice Help",
    "/addnice is a command that is usable by moderators and room hosts.",
    'The syntax for using addnice is "/addnice x", where x is the username of the user you want to add to the nice list.',
    "Adding a user to the nice list guarantees that user voice and graphic usage privileges regardless of the silence, graphic, and ignore level settings.  " +
    "Using /silence or /ignore will still silence or ignore a user on the nice list.",
    "Users can be removed from the nice list by using the command /removenice.",
    "See the help sections for silencelevel, graphiclevel, and ignorelevel for more information on the global settings or the help section for nicelist for more information on the nice list."
  ],
  "removenice": [ "/removenice Help",
    "/removenice is a command that is usable by moderators and room hosts.",
    'The syntax for using removenice is "/removenice x", where x is the username of the user you want to remove from the nice list.',
    "See the help section for nicelist for more information on the nice list."
  ],
  "leaderboard": [ "/leaderboard Help",
    "/leaderboard is a command that is usable by everyone.",
    'The syntax for using leaderboard is "/leaderboard".',
    "/leaderboard shows the top 3 tippers of the current session."
  ],
  "kingspam": [ "/kingspam Help",
    "/kingspam is a command that is usable by moderators and room hosts.",
    "The syntax for using kingspam is /kingspam x, where x is either on or off.  ",
    'Using this command toggles the spamming of the message "Tip x to become the new King!"'
  ],
  "notifierspam": [ "/notifierspam Help",
    "/notifierspam is a command that is usable by moderators and room hosts.",
    "The syntax for using notifierspam is /notifierspam x, where x is either on or off.  ",
    "Using this command toggles the spamming of the periodic message defined by the host."
  ],
  "leaderboardspam": [ "/leaderboardspam Help",
    "/leaderboardspam is a command that is usable by moderators and room hosts.",
    "The syntax for using leaderboardspam is /leaderboardspam x, where x is either on or off.  ",
    "Using this command toggles the spamming of the top three tippers."
  ],
  "ubhelp": [ "/ubhelp Help",
    "/ubhelp is a command that is usable by everyone.",
    'The syntax for using ubhelp is "/ubhelp x", where x is the subsection of the help menu that you want to access.'
  ],
  "dicklist": [ "The Chaturbate Dick(less) List", // rz:what a colossal waste of time this turned out to be.
    "Sometimes, users are real dicks in chat.  " +
    "They make rude comments about the hosts' appearances, pick fights with other users, and do various other things that warrant calling them dicks.  " +
    "As a room host, I would very much like to be able to silence those dicks before they ever get the chance to be dicks in my room, " +
    "and I am quite certain that the other hosts would like to be able to do that as well." +
    "With that in mind, I created the Chaturbate dick(less) List.",
    "When a user does something that qualifies him as being a dick, take a screenshot before he is silenced or banned.  " +
    "Save the screenshot and upload it to your Chaturbate profile page.  " +
    "Once it is uploaded, either post a message on the Ultra Bot page in the chaturbate.com/bots section including your username, " +
    "so I can find the screenshot, and the name of the user you would like to have added to the Chaturbate Dick(less) List, " +
    "or send a Tweet @brit_and_justin with the information.  " +
    "I will check the screenshot, to verify that you have found a real dick, and then add him to the Chaturbate Dick(less) List.  " +
    "Users on that list will be unable to send messages in any rooms that are running Ultra Bot!  " +
    "The more rooms that are running Ultra Bot, the more effective this list will become, so tell everyone to use it!",
    "If you would like to see the current Chaturbate Dick(less) List, " +
    "I post the names of the users and the screenshots of the evidence on the Chaturbate Dick(less) Blog at http://britandjustin.tumblr.com/."
  ],
  "nicelist": [ "The Nice List",
    "Sometimes, there are users whose comments are desirable, but they either do not have tokens or do not tip frequently.  " +
    "When rooms get rowdy, hosts and mods are forced to do things like silence users without tokens or who have not tipped and those groups often includes the users whose comments hosts would like to see.  " +
    "To fix this problem, hosts and mods can add users to the Nice List.  " +
    "Users who are on the nice list can send messages regardless of the global silence setting."
  ],
  "about": [ "About Ultra Bot",
    "Ultra Bot was written by Justin of the Chaturbate couple britney_and_justin.",
    "Comments, suggestions, requests, and bug reports can be communicated by either tweeting @brit_and_justin, " +
    "or by posting comments on Ultra Bot's page at chaturbate.com/bots.",
    "The purpose of Ultra Bot is to make the lives of hosts and mods as easy as possible. " +
    "It adds popular features such as King Tipper, Leader Board, and Notifier, " +
    "grants quite a bit of power to moderators, and allows private messages to be sent in the main chat window.",
    'It also has two new features called the "Dick List" and the "Nice List". ' +
    "See the help sections of those two features for more information on them!",
    "Be on the lookout for Ultra App!"
  //],
  //"luhelp": [ "/luhelp Help",
    //""
  //],
  //"levels": [ "/levels Help",
    //""
  //],
  //"startshow": [ "/startshow Help",
    //"Starts a hidden cam show, letting only ticket holders see the cam feed.",
    //"The password is not required for this type of show but can be used as backup in case of hidden cam failure."
  //],
  //"showtimeleft": [ "/showtimeleft Help",
    //""
  //],
  //"printtime": [ "/printtime Help",
    //""
  //],
  //"addshowtime": [ "/addshowtime Help",
    //""
  //],
  //"adduser": [ "/adduser Help",
    //""
  //],
  //"changegoal": [ "/changegoal Help",
    //""
  //],
  //"hide": [ "/hide Help",
    //""
  //],
  //"unhide": [ "/unhide Help",
    //""
  //],
  //"selltickets": [ "/selltickets Help",
    //""
  //],
  //"uacommands": [ "/uacommands Help",
    //""
  ]
};
function help(option, from) {
  "use strict";
  option = String(option || "").toLowerCase();
  if (helps.hasOwnProperty(option)) {
    cb.sendNotice(helps[option][0], from, ub_color);
    cb.sendNotice(helps[option].slice(1).join("\n"), from);
    cb.sendNotice("", from, ub_color);
  } else { switch (option) {
  case "":
    cb.sendNotice("Ultra Bot Help Menu", from, ub_color);
    cb.sendNotice("Type /ubhelp x, where x is one of the following choices, for more detailed information." + "\nEx: /ubhelp commands", from);
    cb.sendNotice("", from, ub_color);
    cb.sendNotice("commands\n" + "dicklist\n" + "nicelist\n" + "about", from);
    cb.sendNotice("", from, ub_color);
    break;
  case "commands":
    cb.sendNotice("Ultra Bot Command List", from, ub_color);
    cb.sendNotice("Type /ubhelp x, where x is one of the following commands, for more detailed information." + "\nEx: /ubhelp silencelevel", from);
    cb.sendNotice("", from, ub_color);
    cb.sendNotice("/" + Object.keys(helps).join("\n/"), from);
    cb.sendNotice("", from, ub_color);
    break;
  default:
    cb.sendNotice(option + " is not a valid subsection of the help menu.  Type /ubhelp to access the main help menu.", from, ub_color);
  } }
}
function eMod(ar, usr, mod) {
  "use strict";
  if (!usr) {
    if (mod) { cb.sendNotice("You failed to enter a user to eMod " + ar + ".", mod, ub_color); }
  } else { switch (ar.toLowerCase()) {
  case "add":
    if (eMods.includes(usr)) {
      if (mod) { cb.sendNotice(usr + " has already been granted emergency moderator powers.", mod, ub_color); }
    } else {
      eMods.push(usr);
      if (mod) { modNotice("$$$MOD$$$ has granted emergency moderator powers to " + usr + ".", mod); }
      cb.sendNotice("You have been granted emergency moderator powers" + (mod ? "by " + mod : "") + ".", usr, ub_color);
    }
    break;
  case "remove":
    if (eMods.includes(usr)) {
      eMods.splice(eMods.indexOf(usr), 1);
      if (mod) { modNotice("$$$MOD$$$ has removed emergency moderator powers from " + usr + ".", mod); }
      cb.sendNotice("Your emergency moderator powers have been removed" + (mod ? "by " + mod : "") + ".", usr, ub_color);
    } else {
      if (mod) { cb.sendNotice(usr + " does not have emergency moderator powers to remove.", mod, ub_color); }
    }
    break;
  default:
    cb.sendNotice(ar + " is not a valid option for /emod.  Type /ubhelp emod to see how to use /emod.", mod, ub_color);
  } }
}

const ignorelevels = {
  "0": ".",
  "1": " without tokens.",
  "2": " who haven't tipped.",
  "3": " who haven't tipped at least 10 tokens.",
  "4": " who aren't mods or fans or nice guys."
};
var whisperLevels = {};
function setIgnoreLevel(level, usr) {
  "use strict";
  level = parseInt(level) || level;
  if (ignorelevels.hasOwnProperty(level)) {
    whisperLevels[usr] = level;
    cb.sendNotice(jn(
      "You have set your whisper ignore level to " + level + ".",
      "You are ignoring whispers from all members" + ignorelevels[level] + "."
    ), usr, ub_color);
  } else {
    cb.sendNotice(jn(
      level + " is not a valid setting.",
      'Type "/ubhelp ignorelevel" to see how to use /ignorelevel.'/*,
      "Remember, the room host, moderators, fan club members, and nice guys will always be able to whisper you, unless your silence them!"*/ // rz:this seems contrary
    ), usr, ub_color);
  }
}
function unignoreUser(usr, from) {
  "use strict";
  if (!usr) {
    cb.sendNotice("You failed to enter a user to unignore.", from, ub_color);
  } else if (usr === from) {
    cb.sendNotice("My, you are an odd one, aren't you?", from, ub_color);
  } else {
    if (fa(ignores[from]).includes(usr)) {
      ignores[from].splice(ignores[from].indexOf(usr), 1);
      cb.sendNotice("You are no longer ignoring whispers from " + usr + ".", from, ub_color);
    } else {
      cb.sendNotice(usr + " is not being ignored.  There is no need to unignore them.", from, ub_color);
    }
  }
}
function ignoreUser(usr, from) {
  "use strict";
  if (!ignores[from]) { ignores[from] = []; }
  if (!usr) {
    cb.sendNotice("You failed to enter a user to ignore.", from, ub_color);
  } else if (usr === from) {
    cb.sendNotice("You can't ignore yourself.  You may want to consult a therapist.", from, ub_color); // rz:too much quippery
  } else if (ignores[from].includes(usr)) {
    cb.sendNotice("You are already ignoring " + usr + "'s whispers.", from, ub_color);
  } else {
    ignores[from].push(usr);
    cb.sendNotice("You are now ignoring whispers from " + usr + ".", from, ub_color);
    //cb.sendNotice("Remember, the room host, moderators, and fan club members will always be able to whisper you!", usr, ub_color);
  }
}
function sendWhisper(type, to, from, level, message) {
  "use strict";
  if (cb.settings.enableWhispers !== "Yes") {
    cb.sendNotice("Whispers are disabled.  Your " + type + " was not sent.", from, ub_color);
  } else if (!to) {
    switch (type) {
      case "message":
        cb.sendNotice("You failed to enter a recipient for your message.  Your message was not sent.", from, ub_color);
        break;
      case "reply":
        cb.sendNotice("No one has whispered you.  Your reply was not sent.", from, ub_color);
        break;
    }
  } else if (to === from) {
    cb.sendNotice("Talking to yourself is a little odd...  Your " + type + " was not sent.", from, ub_color);
  } else if (!message) {
    cb.sendNotice("You failed to enter a " + type + ".  Your " + type + " was not sent.", from, ub_color);
  } else if (fa(ignores[to]).includes(from)) {
    cb.sendNotice(to + " is ignoring whispers from you.  Your " + type + " was not sent.", from, ub_color);
  } else if (whisperLevels[to] > level) {
    cb.sendNotice(to + " is ignoring whispers from all members" + ignorelevels[whisperLevels[to]] + "  Your " + type + " was not sent.", from, ub_color);
  } else {
    cb.sendNotice(from + ": " + message, to, ub_color);
    whispers[to] = from;
  }
}
var setTimer; // rz:forward reference to placate jslint
function addTime(mins, mod) {
  "use strict";
  mins = parseInt(mins) || 0;
  if (mins <= 0) {
    if (mod) { cb.sendNotice("You did not enter a valid option for /addtime.\nType /ubhelp addtime to see how to use /addtime.", mod, ub_color); }
  } else if (setTimer.interval) {
    setTimer.mins += mins;
    if (mod) { cb.sendNotice(mod + " has has added " + mins + " minute" + (mins === 1 ? "" : "s") + " to the timer!", room, ub_color); }
  } else {
    if (mod) { cb.sendNotice("There is no timer running.", mod, ub_color); }
  }
}
function fd(x) { // format description
  "use strict";
  return x ? "(" + x + ") " : "";
}
function timeLeft(usr) {
  "use strict";
  if (setTimer.interval) {
    if (usr) { cb.sendNotice(fd(setTimer.description) + "Timer: There " + (setTimer.mins === 1 ? "is" : "are") + " less than " + setTimer.mins + " minute" + (setTimer.mins === 1 ? "" : "s") + " remaining!", usr, ub_color); }
  } else {
    if (usr) { cb.sendNotice("There is no timer running.", usr, ub_color); }
  }
}
function timer() {
  "use strict";
  var x = fd(setTimer.description);
  setTimer.mins -= 1;
  switch (setTimer.mins) {
    case 0:
      clearInterval(setTimer.interval);
      setTimer.interval = null;
      setTimer.description = null;
      cb.sendNotice(x + "Timer: Time is up!", room, ub_color);
      break;
    case 1:
      cb.sendNotice(x + "Timer: There is less than 1 minute remaining!", room, ub_color);
      break;
    case 5:
      cb.sendNotice(x + "Timer: There are less than 5 minutes remaining!", room, ub_color);
      break;
  }
}
setTimer = function (mins, mod, description) {
  "use strict";
  mins = parseInt(mins) || 0;
  description = description || "";
  if (mins <= 0) {
    if (setTimer.interval) {
      clearInterval(setTimer.interval);
      setTimer.interval = null;
      if (mod) { cb.sendNotice(mod + " has cancelled the " + fd(setTimer.description) + "Timer with " + (setTimer.mins) + " minute" + (setTimer.mins === 1 ? "" : "s") + " remaining.", room, ub_color); }
      setTimer.mins = 0;
      setTimer.description = null;
    } else {
      if (mod) { cb.sendNotice("The Timer is not running.", mod, ub_color); }
    }
  } else {
    if (setTimer.interval) {
      clearInterval(setTimer.interval);
      setTimer.interval = null;
      if (mod) { cb.sendNotice(mod + " has reset the " + fd(setTimer.description) + "Timer with " + (setTimer.mins) + " minute" + (setTimer.mins === 1 ? "" : "s") + " remaining.", room, ub_color); }
    } else {
      if (mod) { cb.sendNotice(mod + " has set a " + fd(description) + "Timer for " + mins + " minute" + (mins === 1 ? "" : "s") + "!", room, ub_color); }
    }
    setTimer.description = description;
    setTimer.mins = mins;
    setTimer.interval = setInterval(timer, 60000);
    //setTimer.interval = new SetInterval(timer, 60000);
  }
};
function silence(usr, mod) {
  "use strict";
  if (usr === host || eMods.includes(usr)) {
    cb.sendNotice(usr + " is either a moderator or the room host and cannot be silenced.", mod, ub_color);
  } else if (silenced.includes(usr)) {
    cb.sendNotice(usr + " has already been silenced.", mod, ub_color);
  } else {
    if (mod) { modNotice("$$$MOD$$$  has silenced " + usr + ".", mod); }
    silenced.push(usr);
  }
}

function unsilence(usr, mod) {
  "use strict";
  if (silenced.includes(usr)) {
    if (mod) { modNotice("$$$MOD$$$  has unsilenced " + usr + ".", mod); }
    cbjs.arrayRemove(silenced, usr);
    cb.sendNotice("You have been unsilenced by " + mod + ". Be nice and don't make demands. :smile", usr, ub_color);
  } else {
    cb.sendNotice(usr + " does not need to be unsilenced.", mod, ub_color);
  }
}

function setGraphicLevel(s, mod) {
  "use strict";
  s = parseInt(s) || s;
  if (graphiclevels.hasOwnProperty(s)) {
    graphicLevel = s;
    if (mod) { modNotice("$$$MOD$$$ has set the graphic level to " + s + ": " + graphiclevels[s], mod); }
  } else {
    cb.sendNotice(jn(
      s + " is not a valid setting.",
      'Type "/ubhelp graphiclevel" to see how to use /graphiclevel.'
    ), mod, ub_color);
  }
}

function setSilenceLevel(s, mod) {
  "use strict";
  s = parseInt(s) || s;
  if (silencelevels.hasOwnProperty(s)) {
    silenceLevel = s;
    if (mod) { modNotice("$$$MOD$$$ has set the silence level to " + s + ": " + silencelevels[s], mod); }
  } else {
    cb.sendNotice(jn(
      s + " is not a valid setting.",
      'Type "/ubhelp silencelevel" to see how to use /silencelevel.'
    ), mod, ub_color);
  }
}

cb.onMessage(function (msg) {
  "use strict";
  //turn the message into an array
  var m = msg.m;
  var a = m.split(/\s+/);
  var usr = msg.user;
  var isHost = usr === host;
  var isMod = msg.is_mod;
  var level = (isMod || isHost || eMods.includes(usr) || msg.in_fanclub || nice_guys.includes(usr)) ? 4 : (token_total[usr] >= 10 ? 3 : (token_total[usr] ? 2 : (msg.has_tokens ? 1 : 0)));
  function modCmd(cmd, ...args) {
    //permission check
    if (isMod || isHost || eMods.includes(usr)) {
      cmd.apply(null, args);
    } else {
      cb.sendNotice(jn(
        "Only moderators and broadcasters are able to use that command.",
        'Type "/ubhelp commands" to see a full list of the available commands.'
      ), usr, ub_color);
    }
  }

  if (msg["X-Spam"]) {
    // ignore any message already flagged as x-spam
    const esc = escape || encodeURIComponent;
    cb.log(usr + ":X-Spam:" + esc(m));
  } else if (a[0].charAt(0) === "/") {
    msg["X-Spam"] = true;
    switch (a[0].toLowerCase()) {
    case "/about":
    case "/commands":
    case "/dicklist":
    case "/nicelist":
      help(a[0].slice(1), usr);
      break;
    case "/silencelevel":
      modCmd(setSilenceLevel, a[1], usr);
      break;
    case "/graphiclevel":
      modCmd(setGraphicLevel, a[1], usr);
      break;
    case "/silence":
      modCmd(silence, a[1], usr);
      break;
    case "/unsilence":
      modCmd(unsilence, a[1], usr);
      break;
    case "/settimer":
    case "/starttimer":
      modCmd(setTimer, a[1], usr, a.slice(2).join(" "));
      break;
    case "/addtime":
      modCmd(addTime, a[1], usr);
      break;
    case "/timeleft":
      timeLeft(usr);
      break;
    case "/@":
    case "/pm":
    case "/t":
    case "/tell":
    case "/w":
    case "/whisper":
      sendWhisper("message", a[1], usr, level, a.slice(2).join(" "));
      msg.background = ub_color;
      break;
    case "/r":
    case "/reply":
      sendWhisper("reply", whispers[usr], usr, level, a.slice(1).join(" "));
      msg.background = ub_color;
      break;
    case "/ignorelevel":
      setIgnoreLevel(a[1], usr);
      break;
    case "/ignore":
      ignoreUser(a[1], usr);
      break;
    case "/unignore":
      unignoreUser(a[1], usr);
      break;
    case "/emod":
      if (isMod || isHost) {
        eMod(a[1], a[2], usr);
      } else {
        cb.sendNotice(jn(
          "Only moderators and broadcasters are able to use that command.",
          'Type "/ubhelp commands" to see a full list of the available commands.'
        ), usr, ub_color);
      }
      break;
    case "/addnice":
      if (isMod || isHost) {
        nice("add", a[1], usr);
      }
      break;
    case "/removenice":
      if (isMod || isHost) {
        nice("remove", a[1], usr);
      }
      break;
    case "/ubhelp":
      help(a[1], usr);
      break;
    case "/leaderboard":
      leaderboardSpam(usr);
      break;
    case "/kingspam":
      modCmd(kingSpamToggle, a[1], usr);
      break;
    case "/notifierspam":
      modCmd(notifierSpamToggle, a[1], usr);
      break;
    case "/leaderboardspam":
      modCmd(leaderboardSpamToggle, a[1], usr);
      break;
    case "/notifiermessage":
      modCmd(setNotifier, a.slice(1).join(" "), usr);
      break;
    case "/luhelp":
    case "/levels":
      break; // undocumented/unimplemented commands
    case "/startshow":
    case "/showtimeleft":
    case "/printtime":
    case "/addshowtime":
    case "/adduser":
    case "/changegoal":
    case "/hide":
    case "/unhide":
    case "/selltickets":
    case "/uacommands":
      break; // more undocumented/unimplemented commands - looks like they intended to include a limitCam feature. or maybe these are placeholders for Ultra App :lol
    default:
      if (cb.settings.invalidToggle === "Yes") {
        cb.sendNotice(a[0] + " is not an Ultra Bot command.\nType /ubhelp commands to see a full list of the available commands.", usr, ub_color);
      }
    }
  } else {
    if (dicks.includes(usr)) {
      msg["X-Spam"] = true;
      cb.sendNotice("You are on the Chaturbate Dick(less) List and do not have voice privileges in this room." /* + "  Either stop being an ass hole to people or fuck off and die in a fire."*/ , usr, ub_color);
    } else if (silenced.includes(usr)) {
      msg["X-Spam"] = true;
      cb.sendNotice("Your message was not sent because you have been silenced.  Be nice and don't make demands.", usr, ub_color);
    } else if (silenceLevel > level) {
      msg["X-Spam"] = true;
      cb.sendNotice(jn(
        "I'm sorry, but the silence level has been set to " + silenceLevel + " (" + levels[silenceLevel] + "); your message was not sent.  " +
        "Chat from members" + ignorelevels[silenceLevel] + " is being silenced.  ",
        'Type "/ubhelp silencelevel" to see how the various silence levels work.  ',
        "Please enjoy the show :smile  "
      ), usr, ub_color);
    } else if (graphicLevel > level && reEms.test(m)) {
      msg["X-Spam"] = true;
      cb.sendNotice(jn(
        "Your message was not sent because the graphic level has been set to " + graphicLevel + " (" + levels[graphicLevel] + ").",
        'Type "/ubhelp graphiclevel to see how the various graphic levels work.',
        "Please enjoy the show :smile  "
      ), usr, ub_color);
    } else if (cb.settings.capsToggle === "Yes" && level < Math.max(...Object.keys(levels))) {
      // emoticon safe ALL CAPS filter
      const rePh = /\[\[\[(\d+)\]\]\]/g; // placeholder regexp
      var emc = []; // emoticon cache
      var m_ = m.replace(reEms, (m) => jb("[[[", emc.push(m) - 1, "]]]")); // replace cached emoticons with placeholders
      var m_test = m_.replace(rePh, "").replace(/[\s~`!@#$%\^&*()_\-+={\[}\]|\\:;"'<,>.?\/]/g, ""); // strip out placeholders, spaces and symbols
      if (m_test && m_test.toUpperCase() === m_test) { // test if what's left is in ALL CAPS
        //m = m_.toLowerCase().replace(rePh, (m, p1) => emc[parseInt(p1)]); // force lower case and restore cached emoticons
        m = m_.toLowerCase().replace(rePh, (ignore, p1) => emc[parseInt(p1)]); // force lower case and restore cached emoticons
        cb.sendNotice("I'm sure you didn't actually mean to send that message in all capital letters, so I fixed it for you :smile", usr, ub_color);
      }
    }
    if (cb.settings.tipTitles === "Yes" && !isHost) {
      m = jb("|", token_total[usr] || 0, "| ", m); // rz:tag everyone, so non-tippers can't fake tag themselves
    }
    if (cb.settings.kingTipper === "Yes" && usr === kingTipper) {
      //m = jb(":smallCrown ", m);
      m = jb("\u{1f451} ", m);
    }
    msg.m = m;
  }
  return msg;
});

cb.onTip(function (tip) {
  "use strict";
  var amount = tip.amount;
  var tipper = tip.from_user;
  token_total[tipper] = (token_total[tipper] || 0) + amount;
  if (token_total[tipper] >= (kingTipper ? token_total[kingTipper] + 1 : cb.settings.kingMin)) {
    if (cb.settings.kingTipper === "Yes" && kingTipper !== tipper) {
      if (kingTipper) { cb.sendNotice("You have been dethroned by " + tipper + ", but revenge is sweet...", kingTipper, ub_color); }
      cb.sendNotice("We have a new King!\nAll hail " + tipper + "!", room, ub_color);
    }
    kingTipper = tipper;
  }
  delete leaderboardSpam.top_tippers; // reset leaderboard
  if (tip_menu.hasOwnProperty(amount)) {
    cb.sendNotice(
      tipper + " has tipped for " + tip_menu[amount].join(" / "),
      "",
      "#000033",
      "#ffff33",
      "bold"
    );
  }
  if (cb.settings.notifierTip === "Yes" && amount >= cb.settings.tipMessageMin) {
    cb.sendNotice(cb.settings.tipMessage.replace(/\$\$\$TIPPER\$\$\$/g, tipper), room, ub_color);
  }
});

cb.onEnter(function (usr) {
  "use strict";
  if (cb.settings.notifierEnter === "Yes" && cb.settings.enterMessage) {
    cb.sendNotice(cb.settings.enterMessage.replace(/\$\$\$MEMBER\$\$\$/g, usr.user), usr.user, ub_color);
  }

});

kingSpamToggle(cb.settings.kingTipperSpam === "Yes" ? "on" : "off");

leaderboardSpamToggle(cb.settings.leaderBoardSpam === "Yes" ? "on" : "off");

setNotifier(cb.settings.spamMessage);

notifierSpamToggle(cb.settings.notifierSpam === "Yes" ? "on" : "off");

cb.sendNotice("Grey users are now unable to use graphics by default.  If you would like grey users to be able to use graphics, type /graphiclevel 0.", host, ub_color);

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
