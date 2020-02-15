// https://chaturbate.com/apps/user_uploads/1/jessica_shine/
// https://chaturbate.com/apps/sourcecode/jessica-shine-game/?version=&slot=1

// Jessica Shine Game

// CB app settings
cb.settings_choices = [
    {name: 'doColoring', type: 'choice', label: 'Change text and background coloring for members and friends (choose colours below)?',
        choice1: 'Yes',
        choice2: 'No', defaultValue: 'Yes'},
    {name: 'doText', type: 'choice', label: 'Add text labels in front of members and friends messages (choose text below)?',
        choice1: 'Yes',
        choice2: 'No', defaultValue: 'Yes'},
    {name: 'mmText', label: 'Text to put in front of Jess Admirer members messages (e.g. JA), the text will be put inside square brackets []', type: 'str', minLength: 0, maxLength: 10, required: false, defaultValue: 'JA'},
    {name: 'mmTextColor', label: 'Jess Admirer members text color - HTML colour code without starting \'#\' e.g. (FFFFFF is white)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '060606'},
    {name: 'mmBGColor', label: 'Jess Admirers members background color - HTML colour code without starting \'#\' e.g. (000000 is black)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '62e401'},
    {name: 'mmMinTip', label: 'Minimum tip to become Jess Admirer member', type: 'int', minValue: 1, defaultValue: 333},
    {name: 'mmAnnounce', label: 'Text to show when someone tips to become a Jess Admirer member, the text MEMBERNAME will be replaced with the username of the new  (Note: graphics don\'t work in this text)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'MEMBERNAME just joined Shine\'s Jess Admirers'},
    {name: 'mmMemberList', label: 'List of current Jess Admirers members, separated by commas (and they need to be the CB username exactly)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'luckydevil,kdisk,ruckus74'},
    {name: 'mmRainText', label: 'Text to use for Jess Admirer lines', type: 'str', minLength: 0, maxLength: 80, required: false, defaultValue: 'Jess Admirer'},
    {name: 'mmRainCount', label: 'Number of lines of Jess Admirer rain', type: 'int', minValue: 1, maxValue: 15, defaultValue: 15},

    {name: 'mgText', label: 'Text to put in front of Jess Friends messages (e.g. JF)', type: 'str', minLength: 0, maxLength: 10, required: false, defaultValue: 'JF'},
    {name: 'mgTextColor', label: 'Jess Friends text color - HTML colour code without starting \'#\' e.g. (000000 is black)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '000000'},
    {name: 'mgBGColor', label: 'Jess Friends background color - HTML colour code without starting \'#\' e.g. (F5B608 is orangey/gold)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: 'EEFE1A'},
    {name: 'mgMinTip', label: 'Minimum tip to become Jess Friend', type: 'int', minValue: 1, defaultValue: 777},
    {name: 'mgAnnounce', label: 'Text to show when someone tips to become a Jess Friend, the text MEMBERNAME will be replaced with the username of the new member (Note: graphics don\'t work in this text)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'MEMBERNAME just became a JESS FRIEND'},
    {name: 'mgMemberList', label: 'List of current Jess Friends, separated by commas (and they need to be the CB username exactly)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'smokinggunns,justherluck'},
    {name: 'mgRainText', label: 'Text to use for Jess Friend rain lines', type: 'str', minLength: 0, maxLength: 80, required: false, defaultValue: 'Jess Friend'},
    {name: 'mgRainCount', label: 'Number of lines of Jess Friend rain', type: 'int', minValue: 1, maxValue: 15, defaultValue: 15},

    {name: 'bText', label: 'Text to put in front of Jess boyfriends messages (e.g. JBF)', type: 'str', minLength: 0, maxLength: 10, required: false, defaultValue: 'JBF'},
{name: 'bTextColor', label: 'Jess Boyfriend text color - HTML colour code without starting \'#\' e.g. (FFFFFF is white)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: 'FFFFFF'},
{name: 'bBGColor', label: 'Jess boyfriend background color - HTML colour code without starting \'#\' e.g. (2F1BE0 is blue)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '9C4CD4'},
    {name: 'bMinTip', label: 'Minimum tip to become Jess boyfriend', type: 'int', minValue: 1, defaultValue: 1500},
    {name: 'bAnnounce', label: 'Text to show when someone tips to become a Jess boyfriend, the text MEMBERNAME will be replaced with the username of the new member (Note: graphics don\'t work in this text)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'MEMBERNAME just became a JESS BOYFRIEND'},
    {name: 'bMemberList', label: 'List of current Jess boyfriends, separated by commas (and they need to be the CB username exactly)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'phillbo'},
    {name: 'bRainText', label: 'Text to use for Jess Boyfriend rain lines', type: 'str', minLength: 0, maxLength: 80, required: false, defaultValue: 'Jess Boyfriend'},
    {name: 'bRainCount', label: 'Number of lines of Jess Boyfriend rain', type: 'int', minValue: 1, maxValue: 15, defaultValue: 15},

    {name: 'dText', label: 'Text to put in front of Jess Hubby messages (e.g. JHB)', type: 'str', minLength: 0, maxLength: 10, required: false, defaultValue: 'JHB'},
    {name: 'dTextColor', label: 'Jess Hubby text color - HTML colour code without starting \'#\' e.g. (FFFFFF is white)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: 'FFFFFF'},
    {name: 'dBGColor', label: 'Jess Hubby background color - HTML colour code without starting \'#\' e.g. (A62121 is deep red)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '9C4CD4'},
    {name: 'dMinTip', label: 'Minimum tip to become Jess Hubby', type: 'int', minValue: 1, defaultValue: 2777},
    {name: 'dAnnounce', label: 'Text to show when someone tips to become a Jess Hubby, the text MEMBERNAME will be replaced with the username of the new member (Note: graphics don\'t work in this text)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'MEMBERNAME just became a JESS HUBBY'},
    {name: 'dMemberList', label: 'List of current Jess Hubbys, separated by commas (and they need to be the CB username exactly)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: ''},
    {name: 'dRainText', label: 'Text to use for Jess Hubby rain lines', type: 'str', minLength: 0, maxLength: 80, required: false, defaultValue: 'Jess Hubby Jess Hubby Jess Hubby'},
    {name: 'dRainCount', label: 'Number of lines of Jess Hubby rain', type: 'int', minValue: 1, maxValue: 15, defaultValue: 15}
];

var mmMembers = {};
var mgMembers = {};
var bMembers = {};
var dMembers = {};
var mmNotice = "Tip " + cb.settings.mmMinTip + " to get on the 1st level on Jess's MARIO GAME , Tip " + cb.settings.mgMinTip + " to get on the 2nd level\nTip " + cb.settings.bMinTip + " to get on the 3rd level! Tip " + cb.settings.dMinTip + " to WIN!\nAll you messages will be highlighted in chat and you also get exclusive content ( :jm3 see Jess's bio for details).";

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
        // Make Jess Hubby and announce it
        var announcement = cb.settings.dAnnounce.replace("MEMBERNAME", tip['from_user']);
        makeD(tip['from_user']);
        for (var i = 0; i < cb.settings.dRainCount; i++) {
            cb.chatNotice(cb.settings.dRainText);
        }
        cb.chatNotice(announcement);
    }
    else if ((amountTipped >= cb.settings.bMinTip || (amountTipped >= (cb.settings.bMinTip - cb.settings.mgMinTip) && isMG(tip['from_user'])) ) && !isB(tip['from_user']) && !isD(tip['from_user'])) {
        // Make Jess boyfriend and announce it
        var announcement = cb.settings.bAnnounce.replace("MEMBERNAME", tip['from_user']);
        makeB(tip['from_user']);
        for (var i = 0; i < cb.settings.bRainCount; i++) {
            cb.chatNotice(cb.settings.bRainText);
        }
        cb.chatNotice(announcement);
    }
    else if (amountTipped >= cb.settings.mgMinTip && !isMG(tip['from_user']) && !isB(tip['from_user']) && !isD(tip['from_user'])) {
        // Make Jess Friend and announce it
        var announcement = cb.settings.mgAnnounce.replace("MEMBERNAME", tip['from_user']);
        makeMG(tip['from_user']);
        for (var i = 0; i < cb.settings.mgRainCount; i++) {
            cb.chatNotice(cb.settings.mgRainText);
        }
        cb.chatNotice(announcement);
    } else if (amountTipped >= cb.settings.mmMinTip && !isMM(tip['from_user']) && !isMG(tip['from_user']) && !isB(tip['from_user']) && !isD(tip['from_user'])) {
        // Make Jess Admirers and announce it
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
    // Get jess admirers members
    if (cb.settings.mmMemberList) {
        var mmMemberSettings = cb.settings.mmMemberList.split(',');
        for (var ii = 0; ii < mmMemberSettings.length; ii++) {
            var clean = mmMemberSettings[ii].toLowerCase().replace(/ /g, "");
            mmMembers[clean] = {'u': 1};
        }
    }

    // Get jess friends
    if (cb.settings.mgMemberList) {
        var mgMemberSettings = cb.settings.mgMemberList.split(',');
        for (var ii = 0; ii < mgMemberSettings.length; ii++) {
            var clean = mgMemberSettings[ii].toLowerCase().replace(/ /g, "");
            mgMembers[clean] = {'u': 1};
        }
    }

    // Get jess boyfriends
    if (cb.settings.bMemberList) {
        var bMemberSettings = cb.settings.bMemberList.split(',');
        for (var ii = 0; ii < bMemberSettings.length; ii++) {
            var clean = bMemberSettings[ii].toLowerCase().replace(/ /g, "");
            bMembers[clean] = {'u': 1};
        }
    }

    // Get hubby
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
