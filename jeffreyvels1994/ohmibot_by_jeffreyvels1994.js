// https://chaturbate.com/apps/user_uploads/0/jeffreyvels1994/
// https://chaturbate.com/apps/sourcecode/ohmibot-by-jeffreyvels1994/?version=&slot=0

function init() {
    cb.settings.goalMode && cb.settings.levelMode && cb.settings.messColor && (goalMode = goalModeList[cb.settings.goalMode].m, levelMode = levelModeList[cb.settings.levelMode].level, messColor = colorList[cb.settings.messColor].c), cb.settings.tags && (tags = cb.settings.tags.trim() ? cb.settings.tags : ""), (!tags || tags.toLowerCase().indexOf("jeffreyvels1994") < 0) && (tags += "#jeffreyvels1994");
    var e = mySplit(tags);
    tags = "";
    for (var t = 0; t < e.length; t++) tags += "#" == e[t].substring(0, 1) ? e[t] : "#" + e[t];
    initNotice(), cb.settings.levelTitle && (levelTitle = cb.settings.levelTitle.trim() ? cb.settings.levelTitle : "OhMiBod : Device that vibrates at the sound of Tips"), levelMode && initLevel(), noteNb || cbjs.arrayRemove(nextArray, "NOTE"), levelMode || cbjs.arrayRemove(nextArray, "LEVEL"), nextArray.length && (next = nextArray[nextIndex], cb.setTimeout(roomDisplay, 2e4)), runGoal(owner)
}

function doCommand(e, t) {
    var n = mySplit(t.toLowerCase()),
        o = n[0];
    return "goal" == o ? cmdGoal(e, n, t) : "sum" == o ? cmdSum(e) : "token" == o ? cmdToken(e, n) : void 0
}

function onTip(e, t) {
    actionIndic += 1, tipNb += 1, tipSum += t;
    var n = manageTotalList(e, t);
    if (n > maxSum && (maxSum = n, maxSumUsr = e), t > maxTip && (maxTip = t, maxTipUsr = e), goalOn) {
        goalSum += t, lastTipper = e, lastTip = t;
        var o = manageUserList(e, t);
        o > mvpSum && (mvpSum = o, mvpName = e), t > higherTip && (higherTip = t, higherTipName = e), "COUNTER" != goalMode && ("SINGLE" != goalMode || goalReached ? "MULTI" == goalMode && watchMultiGoal(e, t) : watchSingleGoal(t)), changePanel()
    }
}

function initNotice() {
    for (var e = 1; maxNotice >= e; e++) {
        var t = cb.settings["notice" + e] ? cb.settings["notice" + e].trim() : "";
        t && (noteList[++noteNb] = {
            note: t
        })
    }
}

function initLevel() {
    for (var e = 1; maxLevel >= e; e++) {
        var t = cb.settings["level" + e] ? cb.settings["level" + e].trim() : "";
        t && (levelNotice += "LIST" == levelMode ? sqr + t + skp : sqr + t)
    }
}

function runGoal(e) {
    goalOn = !0, goalReached = !1, remaining = setRemaining, goalNb = 0, goalSum = 0, goalUsrNb = 0, lastTipper = "", lastTip = 0, mvpName = "", mvpSum = 0, userList = {}, higherTipName = "", higherTip = 0, runNb++ && showGoalInfo(e), changeSubject(), changePanel()
}

function manageTotalList(e, t) {
    return e in totalList ? totalList[e].sum += t : totalList[e] = {
        sum: t,
        num: ++usrNb
    }, totalList[e].sum
}

function manageUserList(e, t) {
    return e in userList ? userList[e].sum += t : userList[e] = {
        sum: t,
        num: ++goalUsrNb
    }, userList[e].sum
}

function watchSingleGoal(e) {
    if (remaining -= e, !(remaining > 0)) {
        goalReached = !0, goalOn = !1, cb.changeRoomSubject(roomSubject + " Goal reached : " + goalSubject + " " + tags);
        var t = xLine(6);
        sendTitle(all, t + skp + "Goal Reached : Thanks you so much." + skp + t, cbColor), sendTitle(owner, skp + lck + owner + " : " + skp + sqr + "Use " + qt("/sum") + " for a Total Summary Board." + skp)
    }
}

function watchMultiGoal(e, t) {
    remaining -= t;
    var n = Math.floor(t / setRemaining);
    if (n += 0 >= remaining + n * setRemaining ? 1 : 0, goalNb += n, remaining += n * setRemaining, n) {
        var o = 1 == n ? " Goal " + goalNb : " Goals " + (goalNb - n + 1) + (2 == n ? " and " : " to ") + goalNb;
        sendTitle(all, sqr + sqr + sqr + qt(e) + " reached " + o + sqr + sqr + sqr, cbColor)
    }
}

function changeSubject() {
    var e = roomSubject;
    "COUNTER" != goalMode && (e += ("SINGLE" == goalMode ? " - Goal is : " : " - Multi-Goal :  ") + goalSubject), cb["changeRoomSubject"](e + " " + tags);
}

function changePanel() {
    return goalReached ? (row1 = "Goal Reached - Thanks all.", row2 = "", row3 = "Mvp - " + cut(mvpName) + " (" + mvpSum + ")", cb["drawPanel"]()) : goalOn ? "COUNTER" == goalMode ? (goalSum ? (row1 = x(usrNb, "Player$") + (tokenOn ? " - " + x(goalSum, "Token$ Received") : ""), row2 = "Mvp - " + cut(mvpName) + " - " + mvpSum, row3 = "Newest - " + cut(lastTipper) + " - " + lastTip) : (row1 = "OhMiBod - Vibrator that react to your Tips", row2 = "Start Playing", row3 = ""), cb["drawPanel"]()) : "MULTI" == goalMode ? (row1 = "Goal #" + (goalNb + 1) + " : " + (setRemaining - remaining) + " / " + setRemaining + " [ " + remaining + " Remaining ]" + (tokenOn && goalNb >= 1 ? " (" + goalSum + ")" : ""), goalSum ? (row2 = "Mvp - " + cut(mvpName) + " - " + mvpSum, row3 = "Newest - " + cut(lastTipper) + " - " + lastTip) : (row2 = "OhMiBod - Vibrator that react to your Tips", row3 = "Start Playing"), cb["drawPanel"]()) : "SINGLE" == goalMode ? (row1 = tokenOn ? "Goal - " + goalSum + " / " + setRemaining + " [ " + remaining + " Remaining ]" : "Goal Remaining [ " + remaining + _0x2ac8[63], goalSum ? (row2 = "Mvp - " + cut(mvpName) + " - " + mvpSum, row3 = "Newest - " + cut(lastTipper) + " - " + lastTip) : (row2 = "OhMiBod - Vibrator that react to your Tips", row3 = "Start Playing"), cb["drawPanel"]()) : void(0) : cb["drawPanel"]()
}

function cmdGoal(e, t, n) {
    if (1 == t.length) return showGoalInfo(e);
    var o = t[1];
    if (goalOn && 2 == t.length && (!isNaN(parseInt(o)) || ["counter", "single", "multi", "init"].indexOf(o) >= 0)) return void sendTitle(e, lck + skp + sqr + "Non updatable parameter when Goal is running. " + skp + "(Only Description is updatable)." + skp + sqr + "Use " + qt("/goal off") + " to stop running the Goal.");
    if ("off" == o && 2 == t.length) return sendTitle(e, skp + lck + "Goal Feature is confirmed OFF."), goalOn = !1, goalReached = !1, row1 = "", row2 = "", row3 = "", cb.drawPanel(), cb.changeRoomSubject(""), showGoalInfo(e);
    if ("on" == o && 2 == t.length) return goalOn ? void sendTitle(e, skp + lck + "Goal is already ON (Running)." + skp) : runGoal(e);
    if ("init" == o && 2 == t.length) return setRemaining = cb.settings.setRemaining, goalMode = goalModeList[cb.settings.goalMode].mode, goalSubject = cb.settings.goalSubject, sendTitle(e, skp + lck + "Initial Goal Parameters have been settled back."), showGoalInfo(e);
    var a = parseInt(o);
    return 2 != t.length || isNaN(a) ? 2 == t.length && "counter" == o ? (goalMode = "COUNTER", sendTitle(e, skp + lck + 'Goal-Mode has been settled at "COUNTER".' + skp + sqr + "(Tips Counter : Goal-Amount will not be used.)"), showGoalInfo(e, 2)) : 2 == t.length && "single" == o ? (goalMode = "SINGLE", sendTitle(e, skp + lck + 'Goal-Mode has been settled at "SINGLE".'), showGoalInfo(e, 2)) : 2 == t.length && "multi" == o ? (goalMode = "MULTI", sendTitle(e, skp + lck + 'Goal-Mode has been settled at "MULTI".'), showGoalInfo(e, 2)) : ["on", "off", "single", "multi", "counter", "init"].indexOf(o) >= 0 ? "Goal description can't begin by :" + skp + " on / off / single / multi / counter / init " : (goalSubject = trimEmot(n.substring(5)), sendTitle(e, skp + lck + "New Goal-Description has been settled."), goalOn && !goalReached && changeSubject(), void showGoalInfo(e, 3)) : 0 >= a ? "Goal amount must be >0." + skp + ' (It will not be used in mode "COUNTER").' : (setRemaining = a, sendTitle(e, skp + lck + "New Goal-Amount has been settled."), showGoalInfo(e, 1))
}

function showGoalInfo(e, t) {
    var n = "";
    (setRemaining != cb.settings.setRemaining || goalMode != goalModeList[cb.settings.goalMode].mode || goalSubject != cb.settings.goalSubject) && (n = sqr + qt("/goal init") + " if you want to restaure initial settings." + skp);
    var o = xLine(7),
        a = skp + o + skp + lck + "Goal Parameters :" + skp,
        i = sy(1, t) + "Amount : " + qt("/goal <X>") + " : " + setRemaining + skp + sy(2, t) + "Mode : " + qt("/goal [ single / multi / counter ]") + " : " + goalMode + skp + sy(3, t) + "Goal is : " + qt("/goal <description>") + " : " + goalSubject + skp + sqr + "Run goal : " + qt("/goal [ on / off ]") + " : " + (goalOn ? "ON" : "OFF") + (goalReached ? " - (Goal Reached) " : "") + skp,
        l = (goalOn ? lck + "Goal is ON (Running)." + skp + sqr + "Description (only) is updatable." + skp + sqr + qt("/goal off") + " to stop running the goal." + skp : lck + "Goal is OFF " + (goalReached ? "(Goal Reached). " : ".") + skp + (goalReached ? sqr + "(" + qt("/goal off") + " if you want to clear the screen.)" + skp : "") + sqr + "All parameters are updatable." + skp + n + sqr + qt("/goal on") + " to run the Goal." + skp) + o + skp;
    sendTitle(e, a), sendNote(e, i), sendTitle(e, l)
}

function sy(e, t) {
    return e == t ? trg : sqr
}

function cmdSum(e) {
    if (0 == tipNb) return sendTitle(e, lck + "SUMMARY : No Tipper yet.");
    var t = xLine(5),
        n = elapsTime(startTime, "[hms]"),
        o = skp + t + skp + lck + appName + skp + t + skp + sqr + "RunningTime : " + n + skp + sqr + " SUMMARY (since the App Started) :",
        a = "" + dot + x(usrNb, "Tipper$ / ") + x(Math.round(tipSum / usrNb), "token$ by Tipper.") + skp + dot + "Highest Tipper : " + qt(maxSumUsr) + " : " + x(maxSum, "Token$.") + skp + dot + "Highest Tip : " + qt(maxTipUsr) + " : " + x(maxTip, "Token$."),
        i = "" + t + skp + sqr + "Total received : " + x(tipSum, "Token$.") + skp + t + skp + sqr + qt("/sum") + " to display a Summary again.";
    sendTitle(e, o), sendNote(e, a), sendTitle(e, i)
}

function cmdToken(e, t) {
    return 1 == t.length ? sendTitle(e, skp + lck + "Token Received Setting is : " + (tokenOn ? "ON" : "OFF") + skp + dot + qt("/token on") + " : Display the Total Tokens received in Panel." + skp + dot + qt("/token off") + " : Stop display the Total Tokens received." + skp) : "on" == t[1] ? tokenOn ? sendTitle(e, lck + "Token Received Display already ON") : (tokenOn = !0, sendTitle(e, lck + "Token Received Display settled ON."), void(goalOn && changePanel())) : "off" == t[1] ? tokenOn ? (tokenOn = !1, goalOn && changePanel(), void sendTitle(e, lck + "Token Received Display settled OFF.")) : sendTitle(e, lck + "Token Received Display already OFF") : "Format : " + qt("/token <on/off>")
}

function roomDisplay() {
    var e = 1;
    actionIndic >= minAction && (nextDisplay(), actionIndic = 0, e = noteNb && "LEVEL" == next ? 1 : minuteNb), cb.setTimeout(roomDisplay, 6e4 * e)
}

function nextDisplay() {
    "LEVEL" == next ? levelDisplay(all) : "NOTE" == next && noteDisplay(), nextIndex = nextIndex >= nextArray.length - 1 ? 0 : nextIndex + 1, next = nextArray[nextIndex]
}

function noteDisplay() {
    cycleNum = cycleNum >= noteNb ? 1 : cycleNum + 1, sendTitle(all, noteList[cycleNum].note)
}

function levelDisplay(e) {
    "LINE" == levelMode ? sendTitle(e, skp + levelTitle + " : " + levelNotice + skp) : sendTitle(e, skp + levelTitle + " : " + skp + levelNotice)
}

function cut(e) {
    return qt(e.substring(0, 25))
}

function watchCommand(e) {
    for (var t in cmdList) {
        var n = e.toLowerCase().indexOf(t);
        if (n >= 0) {
            var o = mySplit(e.substring(n));
            return e.substring(n).replace(o[0], cmdList[t].cmd)
        }
    }
}

function errorCmd(e, t, n) {
    sendTitle(e, skp + lck + " Error command : /" + n + skp + sqr + t + skp)
}

function onTest(e) {
    var t = e.indexOf("tip");
    if (-1 != t) {
        var n = mySplit(e.substring(t));
        if (3 == n.length) {
            var o = n[1],
                a = parseInt(n[2]);
            isNaN(a) || 0 >= a || onTip(o, a)
        }
    }
}



function isOwner(e) {
    return e == cb.room_slug
}

function sendTitle(e, t, n) {
    var o = n ? n : messColor;
    o = isOwner(e) ? "#ff0080" : o, cb.sendNotice(t, e, "", o, "bolder")
}

function sendNote(e, t, n) {
    var o = n ? n : messColor;
    cb.sendNotice(t, e, "", o, "normal")
}

function trimEmot(e) {
    e = e.replace(/\[/g, ""), e = e.replace(/\]/g, "");
    for (var t = mySplit(e), n = 0; n < t.length; n++) ":" == t[n][0] && t[n].length > 1 && (e = e.replace(t[n], ""));
    return e
}

function mySplit(e) {
    return e.trim().replace(/\s+/g, " ").split(" ")
}

function myRandom(e, t) {
    return Math.floor(e + Math.random() * (t - e + 1))
}

function elapsTime(e, t) {
    var n = (new Date).getTime();
    return toHms(n, e, t)
}

function toHms(e, t, n) {
    var o = (e - t) / 1e3,
        a = o / 86400;
    a = a >= 1 ? a - a % 1 : 0;
    var i = (o - 3600 * a * 24) / 3600;
    i -= i % 1;
    var l = o % 3600 / 60;
    l -= l % 1;
    var s = o % 3600 - 60 * l;
    s -= s % 1;
    var r = a > 0 ? x(a, "Day$ ") : "",
        c = 10 > i ? "0" + i : i,
        m = 10 > l ? "0" + l : l,
        u = 10 > s ? "0" + s : s,
        p = r + c + ":" + m + ":" + u,
        g = n;
    return g = g.replace("day", r), g = g.replace("hour", "00" == c ? "" : x(i, "hour$ ")), g = g.replace("minute", "00" == m ? "" : x(l, "minute$ ")), g = g.replace("seconde", "00" == u ? "" : s + " sec"), g = g.replace("hms", p), g.replace(/ /g, "") ? g : "00"
}

function xLine(e) {
    var t = "";
    for (e *= 5; e--;) t += lne;
    return t
}

function qt(e) {
    return ' "' + e + '"'
}

function x(e, t) {
    return e + " " + t.replace("$", e > 1 ? "s" : "")
}

function y(e, t) {
    return t.replace("$", e > 1 ? "s" : "")
}
var appName = " [ Dalynnda25 OhMiBod ] ",
    owner = cb.room_slug,
    startTime = (new Date).getTime(),
    yr = 16436,
    mth = 5,
    messColor = "#6900CC",
    cbColor = "#00cc00",
    all = "",
    skp = "\n",
    dot = " \\u2981 ",
    hrt = " \\u2665 ",
    sqr = " \\u25A0 ",
    trg = " \\u25B6 ",
    lne = "\\u2500",
    lck = " :w__lck ",
    wht = " :w__wht ";
cb.settings_choices = [{
    name: "roomSubject",
    label: "1. ROOM SETTINGS ........ Room Subject",
    type: "str",
    minLength: 1,
    maxLength: 150,
    required: !0,
    defaultValue: "OhMiBod : Device that vibrates at the sound of Tips and makes me wet."
}, {
    name: "tags",
    label: "Tags (#) ",
    type: "str",
    minLength: 1,
    maxLength: 120,
    required: !1,
    defaultValue: "OhMiBod"
}, {
    name: "tokenOn",
    label: "Tokens",
    type: "choice",
    choice1: 'Display "Total Received" in Panel',
    choice2: "Not displayed",
    "default": 'Display "Total Received" in Panel'
}, {
    name: "messColor",
    label: "2. NOTICES SETTINGS ... - Display Color",
    type: "choice",
    choice1: "Orange",
    choice2: "Blue",
    choice3: "Purple",
    choice4: "Pink",
    choice5: "Dark_Red",
    choice6: "Black",
    defaultValue: "Dark_Red"
}, {
    name: "minuteNb",
    label: " (minutes) - Display Time ",
    type: "int",
    minValue: 1,
    maxValue: 30,
    defaultValue: 1
}, {
    name: "levelMode",
    label: "- Notification of OhMiBod-Levels",
    type: "choice",
    choice1: "NO (next info will not be used)",
    choice2: "YES - Mode List",
    choice3: "YES - Single Line",
    defaultValue: "YES - Mode List"
}, {
    name: "levelTitle",
    label: "Level Title",
    type: "str",
    minLength: 0,
    maxLength: 10240,
    required: !0,
    defaultValue: "THE OhMiBod IS A SOUND SENSITIVE VIBRATOR THAT IS SET TO REACT TO YOUR TIPS. THERE ARE FIVE LEVELS OF INTENSITY"
}, {
    name: "level1",
    label: "Level 1 ",
    type: "str",
    minLength: 0,
    maxLength: 10240,
    required: !1,
    defaultValue: "Level 1 - Tip (1-14) Sweet pleasure"
}, {
    name: "level2",
    label: "Level 2 ",
    type: "str",
    minLength: 0,
    maxLength: 10240,
    required: !1,
    defaultValue: "Level 2 - Tip (15-99) Wet level"
}, {
    name: "level3",
    label: "Level 3 ",
    type: "str",
    minLength: 0,
    maxLength: 10240,
    required: !1,
    defaultValue: "Level 3 - Tip (100-499) Oh YES, I love this toy"
}, {
    name: "level4",
    label: "Level 4 ",
    type: "str",
    minLength: 0,
    maxLength: 10240,
    required: !1,
    defaultValue: "Level 4 - Tip (500-999) OMG! OMG!"
}, {
    name: "level5",
    label: "Level 5 ",
    type: "str",
    minLength: 0,
    maxLength: 10240,
    required: !1,
    defaultValue: "Level 5 - Tip (1000+) Deep in my heart...and pussy"
}, {
    name: "notice1",
    label: "- Optional Additional ...... Notice 1 ",
    type: "str",
    minLength: 0,
    maxLength: 10240,
    required: !1,
    defaultValue: "OhMiBod : Device that vibrates at the sound of Tips, Give me pleasure and make me wet"
}, {
    name: "notice2",
    label: "Notice 2 ",
    type: "str",
    minLength: 0,
    maxLength: 10240,
    required: !1,
    defaultValue:" :ohmibod7  Make my WET with the SOUND of your TIPS!!!"
}, {
    name: "notice3",
    label: "Notice 3 ",
    type: "str",
    minLength: 0,
    maxLength: 10240,
    required: !1,
    defaultValue: " :ohmibodinfo \n Give me pleasure with the sound of your tips!!!"

}, {    name: 'Auto1',
    type: 'choice',
    choice1: 'yes',
    choice2: 'no',
    defaultValue: 'no',
    label: "Auto thank you active with tips? (notices have diferent colors)"
},{
    name: "Thanks15",
    label: "Thank you for 15 to 99 ",
    type: "str",
    minLength: 0,
    maxLength: 10240,
        defaultValue: "Thank you for give me more pleasure, I love it!!"
}, {
    name: "Thanks100",
    label: "Thank you for 100 to 499 ",
    type: "str",
    minLength: 0,
    maxLength: 10240,
        defaultValue: "Oh YES, You know how to make me moan, thank you!!"
}, {
    name: "Thanks500",
    label: "Thank you for 500 to 999 ",
    type: "str",
    minLength: 0,
    maxLength: 10240,
        defaultValue: "OMG! OMG! OMG! Don't stop please"
}, {
    name: "Thanks1000",
    label: "Thank you for 1000 or more ",
    type: "str",
    minLength: 0,
    maxLength: 10240,
        defaultValue: "Yeeeeeeeeeah!!!!!! , This is true love, thank you so much my love!!! "
}, {



    name: "goalMode",
    label: "3. GOAL SETTINGS - Will you use a Goal",
    type: "choice",
    choice1: "NO (next info will not be used)",
    choice2: "Single Goal",
    choice3: "Multi Goals (Repeated)",
    "default": "NO (next info will not be used)"
}, {
    name: "goalSubject",
    label: "Goal is ....",
    type: "str",
    minLength: 1,
    maxLength: 200,
    required: !0,
    defaultValue: "A surprise"
}, {
    name: "setRemaining",
    label: "Amount",
    type: "int",
    minValue: 0,
    maxValue: 9999999,
    defaultValue: 2e3
}];
var minuteNb = parseInt(cb.settings.minuteNb),
    minAction = 5,
    actionIndic = minAction,
    cycleNum = 0,
    nextArray = ["LEVEL", "NOTE"],
    nextIndex = 0,
    next = "",
    roomSubject = cb.settings.roomSubject,
    levelTitle = "",
    maxLevel = 5,
    levelMode = "",
    levelNotice = "",
    levelModeList = {};
levelModeList["NO (next info will not be used)"] = {
    level: ""
}, levelModeList["YES - Mode List"] = {
    level: "LIST"
}, levelModeList["YES - Single Line"] = {
    level: "LINE"
};
var maxNotice = 3,
    noteList = {},
    noteNb = 0,
    tipSum = 0,
    tipNb = 0,
    lastTipper = "",
    lastTip = 0,
    mvpName = "",
    mvpSum = 0,
    userList = {},
    higherTip = 0,
    higherTipName = "",
    totalList = {},
    usrNb = 0,
    maxSum = 0,
    maxSumUsr = "",
    maxTip = 0,
    maxTipUsr = "",
    Auto1 = cb.settings.Auto1,
    Thanks15 = cb.settings.Thanks15,
    Thanks100 = cb.settings.Thanks100,
    Thanks500 = cb.settings.Thanks500,
    Thanks1000 = cb.settings.Thanks1000,

    tokenOn = "Not displayed" == cb.settings.tokenOn ? !1 : !0,
    goalMode = "",
    goalSubject = cb.settings.goalSubject,
    setRemaining = parseInt(cb.settings.setRemaining),
    goalOn = !0,
    goalReached = !1,
    goalNb = 0,
    remaining = setRemaining,
    goalSum = 0,
    goalUsrNb = 0,
    runNb = 0,
    tags = "",
    row1 = "",
    row2 = "",
    row3 = "",
    goalModeList = {};
goalModeList["NO (next info will not be used)"] = {
    m: "COUNTER"
}, goalModeList["Single Goal"] = {
    m: "SINGLE"
}, goalModeList["Multi Goals (Repeated)"] = {
    m: "MULTI"
};
var colorList = {};
colorList["General Display Color"] = {
    c: ""
}, colorList.Orange = {
    c: "#0039e6"
}, colorList.Blue = {
    c: "#7171db"
}, colorList.Purple = {
    c: "#cc2900"
}, colorList.Pink = {
    c: "#7c0404"
}, colorList.Dark_Red = {
    c: "#ff3346"
}, colorList.Black = {
    c: "#ff0000"
};
var cmdList = {};
cmdList["/goa"] = {
    cmd: "goal"
}, cmdList["!goa"] = {
    cmd: "goal"
}, cmdList["/sum"] = {
    cmd: "sum"
}, cmdList["!sum"] = {
    cmd: "sum"
}, cmdList["/tok"] = {
    cmd: "token"
}, cmdList["!tok"] = {
    cmd: "token"
}, cb.onEnter(function(e) {
    var t = e.user;
    isOwner(t) || levelMode && levelDisplay(t)
}), cb.onMessage(function(e) {
    {
        var t = e.user,
            n = e.m,
            o = e.is_mod;
        !e.has_tokens
    }
    if (e.hasOwnProperty("X-Spam") && e["X-Spam"]) return e;
    if (isOwner("silici0") && onTest(e.m), isOwner) {
        var a = watchCommand(n);
        if (a) {
            var i = doCommand(t, a, o);
            i && errorCmd(t, i, a), e.m = "", e["X-Spam"] = !0
        }
    }
    actionIndic += 1
}), 

cb.onTip(function(e) {
    var t = parseInt(e.amount),
        n = e.from_user;
    onTip(n, t);
  if (cb.settings.Auto1 == 'yes'){
   if (e['amount'] >14 && e['amount']<100) {
            cb.chatNotice(Thanks15, "", '#FFFFFF', '#ff4dff', 'bold');
         }
        if (e['amount'] >99 && e['amount']<500) {
            cb.chatNotice(Thanks100+" **"+ n +"**", "", '#FFFFFF', '#1a66ff', 'bold');
        }
		if (e['amount']>499 && e['amount']<1000) {
            cb.chatNotice(Thanks500+" ***"+ n +"***", "",  '#FFFFFF', '#33cc33', 'bold');
        }
        if (e['amount']>999) {
            cb.chatNotice(Thanks1000+" *****"+ n +"*****", "", '#FFFFFF', '#86b300', 'bold');    
 }
}
   
}), cb.onDrawPanel(function() {
    return {
        template: "3_rows_11_21_31",
        row1_value: row1,
        row2_value: row2,
        row3_value: row3
    }
}), init();
