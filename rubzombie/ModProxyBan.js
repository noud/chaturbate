// https://chaturbate.com/apps/user_uploads/1/rubzombie/
// https://chaturbate.com/apps/sourcecode/-18/?version=&slot=1

// startof ModProxyBan module - not for re-compilation
(function(b){function d(a){function l(a){return a.replace(new RegExp("\\"+function(a){return function(a){var b,g;for(g in a)a.hasOwnProperty(g)&&(!b||a[g]>a[b])&&(b=g);return b}(function(a){return a.split("").reduce(function(a,b){a[b]=a[b]?a[b]+1:1;return a},{})}(a))}(a),"g"),"")}var e=escape||encodeURIComponent,f=a.m,c=a.user,h=c===b.room_slug;d.hasOwnProperty("rx")||(d.rx=new RegExp("(?:"+[/^(<[<-]*)?\s*([\u0370-\u03FF\u0400-\u04FF\u2580-\u259F\u3000-\u303F\uFF00-\uFFEF]|[\uD800-\uDB7F][\uDC00-\uDFFF])+(?![\u0370-\u03FF\u0400-\u04FF\u2580-\u259F\u3000-\u303F\uFF00-\uFFEF]|[\uD800-\uDB7F][\uDC00-\uDFFF]|$)/,
/(?:\b|_)(c|cam|c4m)\s*([2\u2777\u2781\u278B\uFF12]|\uD835[\uDFD0\uDFDA\uDFE4\uDFEE\uDFF8])\s*(c|cam|c4m)(?:\b|_).*\??/i,/(\uD800\uDF02|\uD835\uDDD6|\uD835\uDCD2|\uD83C\uDD72|\uFF23).*([2\u2777\u2781\u278B\uFF12]|\uD835[\uDFD0\uDFDA\uDFE4\uDFEE\uDFF8]).*(\uD800\uDF02|\uD835\uDDD6|\uD835\uDCD2|\uD83C\uDD72|\uFF23)/,/^(<?\s*(:([\w-]{1,})\s+)?(a\s*(boy|guy|junge?|man)|bio|boys|cam|guys|page|room)\s*|(<\s*|:([\w-]{1,})\s+)+(me)\s*)$/i,/^<?\s*(:([\w-]{1,})\s+)?(check\s*(out)?|f.ck|get|i\s*want|look(ing)?|see|sex|view|visit|watch)\s*(at|for|my|out|with)?\s*$/i,
/^<?\s*(:([\w-]{1,})\s+)?((fuck|sex)\s*with\s*)?((crazy|horny|hot|naughty|sexy|stunning)?\s*(cuti?e|dame|frau|lady|me|milf|woman)\s*(\.|boys|guys|$)|meet|searching|see(king)?|watch)\s*$/i,/(?:^|\s):check\S*bio/i,/i *am *online|(check|come( *to)?|watch) *my *(room|.*channel)|(f.?ck|s?ex).*\s:[\w-]*(cash|money)|willst *du/i,/[\u2580-\u259F]/,/[\xa0-\xff\u0100-\u017f\u0250-\u02ff\u0370-\u03ff\u0400-\u04ff\u1d00-\u1dff\u275f\ua720-\ua7ff]|\ud800[\udea0-\udede\udf00-\udf2e\udf30-\udf4e]|\ud802[\udd00-\udd1e]|\ud835[\udc00-\udffe]|\ud83c[\udd00-\uddfe]/].map(function(a){return a.source}).join(")|(?:")+
")","i"));if(h||a.is_mod||a.in_fanclub||a["Z-Instaban"]||a["Z-Spam-Filtered"]){if(e=f.match(/^\/ban\s+([\s,a-z0-9_]+)$/i))if(h||k&&a.is_mod)b.log([h?"RoboBan":"ModProxyBan",c,e[1]].join("::")),e[1].toLowerCase().split(/[\s,]+/).filter(function(a,b,c){return c.indexOf(a)===b}).forEach(function(a){a&&a!==b.room_slug&&b.sendNotice((h?"\ud83c\udd78\ud83c\udd7d\ud83c\udd82\ud83c\udd83\ud83c\udd70 \ud83c\udd71\ud83c\udd70\ud83c\udd7d ":c+" \ud83c\udd7c\ud83c\udd7e\ud83c\udd73 \ud83c\udd7f\ud83c\udd81\ud83c\udd7e\ud83c\udd87\ud83c\udd88 \ud83c\udd71\ud83c\udd70\ud83c\udd7d ")+
a,b.room_slug)}),a["X-Spam"]=!0;return a}d.rx.test(f)||d.rx.test(l(f))?(a["X-Spam"]=!0,b.log(["RoboBan",c,e(f)].join("::")),(a["Z-Instaban"]=!(a.has_tokens||a.tipped_recently||a.tipped_alot_recently||a.tipped_tons_recently))&&b.sendNotice("RoboBan Rx:ban:"+c,b.room_slug)):a["X-Spam"]&&!a["Z-Instaban"]&&b.log(["X-Spam",c,e(f)].join("::"));return a}var k="Yes"===b.settings.mod_ban;b.log(["ModProxyBan",k?"Enabled":"Disabled"].join("::"));var m=b.onMessage;b.onMessage=function(a){if("function"!==typeof a)throw new TypeError(a+
" is not a function");m(function(b){return a(d(b))});return a};b.onMessage(function(a){return a})})(cb);
// endof ModProxyBan module - not for re-compilation

// provide start-up enable/disable option
cb["settings_choices"] = [{
  "choice1": "Yes",
  "choice2": "No",
  "defaultValue": "No",
  "label": "Allow Mod Proxy Banning? (relies on applet activation. See description)",
  "name": "mod_ban",
  "required": false,
  "type": "choice"
}];
