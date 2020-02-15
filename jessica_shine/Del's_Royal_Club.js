// https://chaturbate.com/apps/user_uploads/1/jessica_shine/
// https://chaturbate.com/apps/sourcecode/dels-royal-club/?version=&slot=1

// Del's Royal Club

// CB app settings
cb.settings_choices = [
    {name: 'doColoring', type: 'choice', label: 'Change text and background coloring for members and clubs (choose colours below)?',
        choice1: 'Yes',
        choice2: 'No', defaultValue: 'Yes'},
    {name: 'doText', type: 'choice', label: 'Add text labels in front of members and clubs messages (choose text below)?',
        choice1: 'Yes',
        choice2: 'No', defaultValue: 'Yes'},
    {name: 'mmText', label: 'Text to put in front of Vip Club members messages (e.g. GC), the text will be put inside square brackets []', type: 'str', minLength: 0, maxLength: 20, required: false, defaultValue: 'Vip Club'},
    {name: 'mmTextColor', label: 'Vip club members text color - HTML colour code without starting \'#\' e.g. (FFFFFF is white)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '000000'},
    {name: 'mmBGColor', label: 'Vip club members background color - HTML colour code without starting \'#\' e.g. (000000 is black)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: 'efff2c'},
    {name: 'mmMinTip', label: 'Minimum tip to become Vip Club member', type: 'int', minValue: 1, defaultValue: 3333},
    {name: 'mmAnnounce', label: 'Text to show when someone tips to become a Vip club member, the text MEMBERNAME will be replaced with the username of the new  (Note: graphics don\'t work in this text)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'MEMBERNAME just joined Del\'s Vip club'},
    {name: 'mmMemberList', label: 'List of current Vip club members, separated by commas (and they need to be the CB username exactly)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'jessica_shine'},
    {name: 'mmRainText', label: 'Text to use for Vip club lines', type: 'str', minLength: 0, maxLength: 80, required: false, defaultValue: 'Vip club'},
    {name: 'mmRainCount', label: 'Number of lines of Vip club rain', type: 'int', minValue: 1, maxValue: 15, defaultValue: 15},

    {name: 'mgText', label: 'Text to put in front of Platinum club messages (e.g. JF)', type: 'str', minLength: 0, maxLength: 30, required: false, defaultValue: 'Platinum club'},
    {name: 'mgTextColor', label: 'Platinum club text color - HTML colour code without starting \'#\' e.g. (000000 is black)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '000000'},
    {name: 'mgBGColor', label: 'Platinum club background color - HTML colour code without starting \'#\' e.g. (F5B608 is orangey/gold)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '8f9191'},
    {name: 'mgMinTip', label: 'Minimum tip to become Platinum club', type: 'int', minValue: 1, defaultValue: 5555},
    {name: 'mgAnnounce', label: 'Text to show when someone tips to become a Platinum club, the text MEMBERNAME will be replaced with the username of the new member (Note: graphics don\'t work in this text)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'MEMBERNAME just became a Platinum Club member'},
    {name: 'mgMemberList', label: 'List of current Platinum club, separated by commas (and they need to be the CB username exactly)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'jessica_shine'},
    {name: 'mgRainText', label: 'Text to use for Platinum club rain lines', type: 'str', minLength: 0, maxLength: 80, required: false, defaultValue: 'Platinum club'},
    {name: 'mgRainCount', label: 'Number of lines of Platinum club rain', type: 'int', minValue: 1, maxValue: 15, defaultValue: 15},

    {name: 'bText', label: 'Text to put in front of Tip master messages (e.g. TipM)', type: 'str', minLength: 0, maxLength: 23, required: false, defaultValue: 'Tip Master'},
{name: 'bTextColor', label: 'Tip master text color - HTML colour code without starting \'#\' e.g. (FFFFFF is white)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '000000'},
{name: 'bBGColor', label: 'Tip master background color - HTML colour code without starting \'#\' e.g. (2F1BE0 is blue)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '4888c4'},
    {name: 'bMinTip', label: 'Minimum tip to become Tip master', type: 'int', minValue: 1, defaultValue: 10000},
    {name: 'bAnnounce', label: 'Text to show when someone tips to become a Tip master, the text MEMBERNAME will be replaced with the username of the new member (Note: graphics don\'t work in this text)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'MEMBERNAME just became a TIP MASTER'},
    {name: 'bMemberList', label: 'List of current Tip masters, separated by commas (and they need to be the CB username exactly)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'fooledperv,ruckus74'},
    {name: 'bRainText', label: 'Text to use for Tip master rain lines', type: 'str', minLength: 0, maxLength: 80, required: false, defaultValue: 'Tip master'},
    {name: 'bRainCount', label: 'Number of lines of Tip master rain', type: 'int', minValue: 1, maxValue: 15, defaultValue: 15},

    {name: 'dText', label: 'Text to put in front of Dels King messages (e.g. Dking)', type: 'str', minLength: 0, maxLength: 20, required: false, defaultValue: 'The king'},
    {name: 'dTextColor', label: 'Dels king text color - HTML colour code without starting \'#\' e.g. (FFFFFF is white)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: 'fdb2f5'},
    {name: 'dBGColor', label: 'Dels king background color - HTML colour code without starting \'#\' e.g. (A62121 is deep red)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: 'f96868'},
    {name: 'dMinTip', label: 'Minimum tip to become Dels king', type: 'int', minValue: 1, defaultValue: 15000},
    {name: 'dAnnounce', label: 'Text to show when someone tips to become a Dels king, the text MEMBERNAME will be replaced with the username of the new member (Note: graphics don\'t work in this text)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'MEMBERNAME just became a DELS KING'},
    {name: 'dMemberList', label: 'List of current Dels king, separated by commas (and they need to be the CB username exactly)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: ''},
    {name: 'dRainText', label: 'Text to use for Dels king rain lines', type: 'str', minLength: 0, maxLength: 80, required: false, defaultValue: 'Dels king'},
    {name: 'dRainCount', label: 'Number of lines of Dels king rain', type: 'int', minValue: 1, maxValue: 15, defaultValue: 15}
];

var mmMembers = {};
var mgMembers = {};
var bMembers = {};
var dMembers = {};
var mmNotice = "Tip " + cb.settings.mmMinTip + " to become a member of the Vip club, Tip " + cb.settings.mgMinTip + " to become a Platinum club\nTip " + cb.settings.bMinTip + " to become a Tip master! Tip " + cb.settings.dMinTip + " to become a Dels king!\nAll you messages will be highlighted in chat and you also get exclusive content (see Del's bio for details).";

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
        // Make Dels king and announce it
        var announcement = cb.settings.dAnnounce.replace("MEMBERNAME", tip['from_user']);
        makeD(tip['from_user']);
        for (var i = 0; i < cb.settings.dRainCount; i++) {
            cb.chatNotice(cb.settings.dRainText);
        }
        cb.chatNotice(announcement);
    }
    else if ((amountTipped >= cb.settings.bMinTip || (amountTipped >= (cb.settings.bMinTip - cb.settings.mgMinTip) && isMG(tip['from_user'])) ) && !isB(tip['from_user']) && !isD(tip['from_user'])) {
        // Make Tip master and announce it
        var announcement = cb.settings.bAnnounce.replace("MEMBERNAME", tip['from_user']);
        makeB(tip['from_user']);
        for (var i = 0; i < cb.settings.bRainCount; i++) {
            cb.chatNotice(cb.settings.bRainText);
        }
        cb.chatNotice(announcement);
    }
    else if (amountTipped >= cb.settings.mgMinTip && !isMG(tip['from_user']) && !isB(tip['from_user']) && !isD(tip['from_user'])) {
        // Make Platinum club and announce it
        var announcement = cb.settings.mgAnnounce.replace("MEMBERNAME", tip['from_user']);
        makeMG(tip['from_user']);
        for (var i = 0; i < cb.settings.mgRainCount; i++) {
            cb.chatNotice(cb.settings.mgRainText);
        }
        cb.chatNotice(announcement);
    } else if (amountTipped >= cb.settings.mmMinTip && !isMM(tip['from_user']) && !isMG(tip['from_user']) && !isB(tip['from_user']) && !isD(tip['from_user'])) {
        // Make Vip club and announce it
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
    // Get Vip club members
    if (cb.settings.mmMemberList) {
        var mmMemberSettings = cb.settings.mmMemberList.split(',');
        for (var ii = 0; ii < mmMemberSettings.length; ii++) {
            var clean = mmMemberSettings[ii].toLowerCase().replace(/ /g, "");
            mmMembers[clean] = {'u': 1};
        }
    }

    // Get platinum club
    if (cb.settings.mgMemberList) {
        var mgMemberSettings = cb.settings.mgMemberList.split(',');
        for (var ii = 0; ii < mgMemberSettings.length; ii++) {
            var clean = mgMemberSettings[ii].toLowerCase().replace(/ /g, "");
            mgMembers[clean] = {'u': 1};
        }
    }

    // Get tip master
    if (cb.settings.bMemberList) {
        var bMemberSettings = cb.settings.bMemberList.split(',');
        for (var ii = 0; ii < bMemberSettings.length; ii++) {
            var clean = bMemberSettings[ii].toLowerCase().replace(/ /g, "");
            bMembers[clean] = {'u': 1};
        }
    }

    // Get dels king
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
