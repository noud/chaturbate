// https://chaturbate.com/apps/user_uploads/1/jessica_shine/
// https://chaturbate.com/apps/sourcecode/dels-high-rollers/?version=&slot=1

// Del's High Rollers

// CB app settings
cb.settings_choices = [
    {name: 'doColoring', type: 'choice', label: 'Change text and background coloring for members and friends (choose colours below)?',
        choice1: 'Yes',
        choice2: 'No', defaultValue: 'Yes'},
    {name: 'doText', type: 'choice', label: 'Add text labels in front of members and friends messages (choose text below)?',
        choice1: 'Yes',
        choice2: 'No', defaultValue: 'Yes'},
    {name: 'mmText', label: 'Text to put in front of Legend members messages (e.g. JA), the text will be put inside square brackets []', type: 'str', minLength: 0, maxLength: 30, required: false, defaultValue: 'Legend'},
    {name: 'mmTextColor', label: 'Legend members text color - HTML colour code without starting \'#\' e.g. (FFFFFF is white)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '000000'},
    {name: 'mmBGColor', label: 'Legend members background color - HTML colour code without starting \'#\' e.g. (000000 is black)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: 'ffb4fd'},
    {name: 'mmMinTip', label: 'Minimum tip to become Legend member', type: 'int', minValue: 1, defaultValue: 555},
    {name: 'mmAnnounce', label: 'Text to show when someone tips to become a Legend member, the text MEMBERNAME will be replaced with the username of the new  (Note: graphics don\'t work in this text)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'MEMBERNAME just joined Del\'s Legend'},
    {name: 'mmMemberList', label: 'List of current Legend members, separated by commas (and they need to be the CB username exactly)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'jessica_shine'},
    {name: 'mmRainText', label: 'Text to use for Legend lines', type: 'str', minLength: 0, maxLength: 80, required: false, defaultValue: 'Legend'},
    {name: 'mmRainCount', label: 'Number of lines of Legend rain', type: 'int', minValue: 1, maxValue: 15, defaultValue: 15},

    {name: 'mgText', label: 'Text to put in front of Ace messages (e.g. JF)', type: 'str', minLength: 0, maxLength: 30, required: false, defaultValue: 'Ace'},
    {name: 'mgTextColor', label: 'Ace text color - HTML colour code without starting \'#\' e.g. (000000 is black)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '000000'},
    {name: 'mgBGColor', label: 'Ace background color - HTML colour code without starting \'#\' e.g. (F5B608 is orangey/gold)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: 'd1f3f9'},
    {name: 'mgMinTip', label: 'Minimum tip to become Ace', type: 'int', minValue: 1, defaultValue: 777},
    {name: 'mgAnnounce', label: 'Text to show when someone tips to become a Ace, the text MEMBERNAME will be replaced with the username of the new member (Note: graphics don\'t work in this text)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'MEMBERNAME just became a ACE'},
    {name: 'mgMemberList', label: 'List of current Ace, separated by commas (and they need to be the CB username exactly)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'jessica_shine'},
    {name: 'mgRainText', label: 'Text to use for Ace rain lines', type: 'str', minLength: 0, maxLength: 80, required: false, defaultValue: 'Ace'},
    {name: 'mgRainCount', label: 'Number of lines of Ace rain', type: 'int', minValue: 1, maxValue: 15, defaultValue: 15},

    {name: 'bText', label: 'Text to put in front of Champion stud messages (e.g. JBF)', type: 'str', minLength: 0, maxLength: 30, required: false, defaultValue: 'Champion stud'},
{name: 'bTextColor', label: 'Champion stud text color - HTML colour code without starting \'#\' e.g. (FFFFFF is white)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '000000'},
{name: 'bBGColor', label: 'Champion stud background color - HTML colour code without starting \'#\' e.g. (2F1BE0 is blue)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: 'f7d69e'},
    {name: 'bMinTip', label: 'Minimum tip to become Champion stud', type: 'int', minValue: 1, defaultValue: 999},
    {name: 'bAnnounce', label: 'Text to show when someone tips to become a Champion stud, the text MEMBERNAME will be replaced with the username of the new member (Note: graphics don\'t work in this text)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'MEMBERNAME just became a CHAMPION STUD'},
    {name: 'bMemberList', label: 'List of current Champion studs, separated by commas (and they need to be the CB username exactly)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'jessica_shine'},
    {name: 'bRainText', label: 'Text to use for Champion stud rain lines', type: 'str', minLength: 0, maxLength: 80, required: false, defaultValue: 'Champion stud'},
    {name: 'bRainCount', label: 'Number of lines of Champion stud rain', type: 'int', minValue: 1, maxValue: 15, defaultValue: 15},

    {name: 'dText', label: 'Text to put in front of High roller messages (e.g. JHB)', type: 'str', minLength: 0, maxLength: 30, required: false, defaultValue: 'High Roller'},
    {name: 'dTextColor', label: 'High roller text color - HTML colour code without starting \'#\' e.g. (FFFFFF is white)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '000000'},
    {name: 'dBGColor', label: 'High roller background color - HTML colour code without starting \'#\' e.g. (A62121 is deep red)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: 'b1f9c4'},
    {name: 'dMinTip', label: 'Minimum tip to become High roller', type: 'int', minValue: 1, defaultValue: 1111},
    {name: 'dAnnounce', label: 'Text to show when someone tips to become a High roller, the text MEMBERNAME will be replaced with the username of the new member (Note: graphics don\'t work in this text)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'MEMBERNAME just became a HIGH ROLLER'},
    {name: 'dMemberList', label: 'List of current High rollers, separated by commas (and they need to be the CB username exactly)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: ''},
    {name: 'dRainText', label: 'Text to use for High roller rain lines', type: 'str', minLength: 0, maxLength: 80, required: false, defaultValue: 'High roller'},
    {name: 'dRainCount', label: 'Number of lines of High roller rain', type: 'int', minValue: 1, maxValue: 15, defaultValue: 15}
];

var mmMembers = {};
var mgMembers = {};
var bMembers = {};
var dMembers = {};
var mmNotice = "Tip " + cb.settings.mmMinTip + " to become a member of the Legend, Tip " + cb.settings.mgMinTip + " to become a Ace\nTip " + cb.settings.bMinTip + " to become a Champion stud! Tip " + cb.settings.dMinTip + " to become a High roller!\nAll you messages will be highlighted in chat and you also get exclusive content (see Del's bio for details).";

// For auto-silencing at least some of token_wh*re_c*nts usernames
var twcRegex = /t.?k.?n.?wh.?r.?_c.?nt.?/i;

function showMMNotice() {
    cb.chatNotice(mmNotice);
    cb.setTimeout(showMMNotice, 900000);
}

cb.onMessage(function (msg) {
    // vars for ease of use
    var u = msg['user'];

    // Don't process commands and hide them
    if (/^\//.test(msg['m'])) {
        msg['X-Spam'] = true;
        return msg;
    }
    if (isD(u)) {
        msg['background'] = '#' + cb.settings.dBGColor;
        msg['c'] = '#' + cb.settings.dTextColor;
        msg['m'] = "[" + cb.settings.dText + "] " + msg['m'];
    }
    else if (isB(u)) {
        msg['background'] = '#' + cb.settings.bBGColor;
        msg['c'] = '#' + cb.settings.bTextColor;
        msg['m'] = "[" + cb.settings.bText + "] " + msg['m'];
    }
    else if (isMG(u)) {
        msg['background'] = '#' + cb.settings.mgBGColor;
        msg['c'] = '#' + cb.settings.mgTextColor;
        msg['m'] = "[" + cb.settings.mgText + "] " + msg['m'];
    } else if (isMM(u)) {
        msg['background'] = '#' + cb.settings.mmBGColor;
        msg['c'] = '#' + cb.settings.mmTextColor;
        msg['m'] = "[" + cb.settings.mmText + "] " + msg['m'];
    }
    if (twcRegex.test(u)) {
        // Auto-silencing at least some of token_wh*re_c*nts usernames
        msg['X-Spam'] = true;
    }
    return msg;
});


cb.onTip(function (tip) {
    var amountTipped = parseInt(tip['amount']);

    if ((amountTipped >= cb.settings.dMinTip || (amountTipped >= (cb.settings.dMinTip - cb.settings.bMinTip) && isB(tip['from_user'])) || (amountTipped >= (cb.settings.dMinTip - cb.settings.mgMinTip) && isMG(tip['from_user']))) && !isD(tip['from_user'])) {
        // Make High roller and announce it
        var announcement = cb.settings.dAnnounce.replace("MEMBERNAME", tip['from_user']);
        makeD(tip['from_user']);
        for (var i = 0; i < cb.settings.dRainCount; i++) {
            cb.chatNotice(cb.settings.dRainText);
        }
        cb.chatNotice(announcement);
    }
    else if ((amountTipped >= cb.settings.bMinTip || (amountTipped >= (cb.settings.bMinTip - cb.settings.mgMinTip) && isMG(tip['from_user'])) ) && !isB(tip['from_user']) && !isD(tip['from_user'])) {
        // Make Champion stud and announce it
        var announcement = cb.settings.bAnnounce.replace("MEMBERNAME", tip['from_user']);
        makeB(tip['from_user']);
        for (var i = 0; i < cb.settings.bRainCount; i++) {
            cb.chatNotice(cb.settings.bRainText);
        }
        cb.chatNotice(announcement);
    }
    else if (amountTipped >= cb.settings.mgMinTip && !isMG(tip['from_user']) && !isB(tip['from_user']) && !isD(tip['from_user'])) {
        // Make Ace and announce it
        var announcement = cb.settings.mgAnnounce.replace("MEMBERNAME", tip['from_user']);
        makeMG(tip['from_user']);
        for (var i = 0; i < cb.settings.mgRainCount; i++) {
            cb.chatNotice(cb.settings.mgRainText);
        }
        cb.chatNotice(announcement);
    } else if (amountTipped >= cb.settings.mmMinTip && !isMM(tip['from_user']) && !isMG(tip['from_user']) && !isB(tip['from_user']) && !isD(tip['from_user'])) {
        // Make Legend and announce it
        var announcement = cb.settings.mmAnnounce.replace("MEMBERNAME", tip['from_user']);
        makeMM(tip['from_user']);
        for (var i = 0; i < cb.settings.mmRainCount; i++) {
            cb.chatNotice(cb.settings.mmRainText);
        }
        cb.chatNotice(announcement);
    }
});

function isD(username) {
    return (username in dMembers);
}

function isB(username) {
    return (username in bMembers);
}

function isMG(username) {
    return (username in mgMembers);
}

function isMM(username) {
    return (username in mmMembers);
}

function makeD(username) {
    dMembers[username] = {'u': 1};
}

function makeB(username) {
    bMembers[username] = {'u': 1};
}

function makeMG(username) {
    mgMembers[username] = {'u': 1};
}

function makeMM(username) {
    mmMembers[username] = {'u': 1};
}

function grabSettings() {
    cb.log("starting grabbing settings");
    // Get legend members
    if (cb.settings.mmMemberList) {
        var mmMemberSettings = cb.settings.mmMemberList.split(',');
        for (var ii = 0; ii < mmMemberSettings.length; ii++) {
            var clean = mmMemberSettings[ii].toLowerCase().replace(/ /g, "");
            mmMembers[clean] = {'u': 1};
        }
    }

    // Get ace
    if (cb.settings.mgMemberList) {
        var mgMemberSettings = cb.settings.mgMemberList.split(',');
        for (var ii = 0; ii < mgMemberSettings.length; ii++) {
            var clean = mgMemberSettings[ii].toLowerCase().replace(/ /g, "");
            mgMembers[clean] = {'u': 1};
        }
    }

    // Get champion stud
    if (cb.settings.bMemberList) {
        var bMemberSettings = cb.settings.bMemberList.split(',');
        for (var ii = 0; ii < bMemberSettings.length; ii++) {
            var clean = bMemberSettings[ii].toLowerCase().replace(/ /g, "");
            bMembers[clean] = {'u': 1};
        }
    }

    // Get high roller
    if (cb.settings.dMemberList) {
        var dMemberSettings = cb.settings.dMemberList.split(',');
        for (var ii = 0; ii < dMemberSettings.length; ii++) {
            var clean = dMemberSettings[ii].toLowerCase().replace(/ /g, "");
            dMembers[clean] = {'u': 1};
        }
    }

    cb.log("finished grabbing settings");
}

grabSettings();
showMMNotice();
