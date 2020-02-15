// https://chaturbate.com/apps/user_uploads/1/alzhoric/
// https://chaturbate.com/apps/sourcecode/the-triple-xxx-league/?version=&slot=1

// The xXx League Controller - v1.0.6

// Version Control
// 1.0.6 - 12/11/2013 - Alistair Zhoric - Published to Chaturbate Main Site (graduated from testbed.chaturbate.com). Appended xXx League to Notice1
// 1.0.5 - 11/11/2013 - Alistair Zhoric - Reworded The Upper Echelon section to conform with the rest of the control parameters. Moved the notice to three variables.
// 1.0.4 - 10/11/2013 - Alistair Zhoric - Removed twcRegex due to errors
// 1.0.3 - 05/11/2013 - Alistair Zhoric - Changed colour of Upper Echelon to #FF9999 for a more 'pastel' coloured red. Published to Chaturbate.
// 1.0.2 - 01/11/2013 - Alistair Zhoric - After testing modified line 134 having forgotten to insert 'el'
// 1.0.1 - 30/10/2013 - Alistair Zhoric - Fist script modified based on work by 'jessica_shine'

// Statement of Purpose
// This controller application will carry out two functions:
// 1. Highlight any username who is within a certain group to a certain colour
// 2. Append some text after the username to deonate the group they belong to

// The groups that are targeted in this application are:
// Tokens	Group Name				Background Highlight		Text Colour
// 1,500 - 	The Untouchable 		Purple #ff99ff				Black #000000
// 1,000 - 	The Upper Echelon 		Red #ff9999					Black #000000
// 700   - 	The Elite 				Yellow #ffff99				Black #000000
// 500   - 	The Exclusive 			Blue #ccccff				Black #000000
// Note: All colours have been specifically chosen as they were lighter and more 'pastel' to ensure the colour wouldn't be harsh on people's eyes.

// Application Settings & Control Parameters
cb.settings_choices = [
    {name: 'doColoring', type: 'choice', label: 'Apply Colouring?',
        choice1: 'Yes',
        choice2: 'No', defaultValue: 'Yes'},
    {name: 'doText', type: 'choice', label: 'Append Text Labels?',
        choice1: 'Yes',
        choice2: 'No', defaultValue: 'Yes'},
		
    {name: 'mmText', label: 'The Untouchable - Text to append to the username', type: 'str', minLength: 0, maxLength: 30, required: false, defaultValue: 'Untouchable'},
    {name: 'mmTextColor', label: 'The Untouchable - Colour of text using HTML codes', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '000000'},
    {name: 'mmBGColor', label: 'The Untouchable - Colour of background using HTML code', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: 'ff99ff'},
    {name: 'mmMinTip', label: 'The Untouchable - Tokens required', type: 'int', minValue: 1, defaultValue: 1500},
    {name: 'mmAnnounce', label: 'The Untouchable - Text to appear upon joining the group (no graphics)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'xXx - MEMBERNAME is now part of The Untouchables. Welcome.'},
    {name: 'mmMemberList', label: 'The Untouchable - Member Names (precise usernames)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'alzhoric,myn85'},
    {name: 'mmRainText', label: 'The Untouchable - Text to use for lines', type: 'str', minLength: 0, maxLength: 80, required: false, defaultValue: 'Untouchable'},
    {name: 'mmRainCount', label: 'The Untouchable - Number of lines for rain', type: 'int', minValue: 1, maxValue: 15, defaultValue: 5},

	{name: 'mgText', label: 'The Upper Echelon - Text to append to the username', type: 'str', minLength: 0, maxLength: 30, required: false, defaultValue: 'Upper Echelon'},
    {name: 'mgTextColor', label: 'The Upper Echelon - Colour of text using HTML codes', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '000000'},
    {name: 'mgBGColor', label: 'The Upper Echelon - Colour of background using HTML code', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: 'ff9999'},
    {name: 'mgMinTip', label: 'The Upper Echelon - Tokens required', type: 'int', minValue: 1, defaultValue: 1000},
    {name: 'mgAnnounce', label: 'The Upper Echelon - Text to appear upon joining the group (no graphics)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'xXx - MEMBERNAME is now part of The Upper Echelon. Welcome.'},
    {name: 'mgMemberList', label: 'The Upper Echelon - Member Names (precise usernames)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: ''},
    {name: 'mgRainText', label: 'The Upper Echelon - Text to use for lines', type: 'str', minLength: 0, maxLength: 80, required: false, defaultValue: 'Upper Echelon'},
    {name: 'mgRainCount', label: 'The Upper Echelon - Number of lines for rain', type: 'int', minValue: 1, maxValue: 15, defaultValue: 5},
	
	{name: 'bText', label: 'The Elite - Text to append to the username', type: 'str', minLength: 0, maxLength: 30, required: false, defaultValue: 'Elite'},
    {name: 'bTextColor', label: 'The Elite - Colour of text using HTML codes', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '000000'},
    {name: 'bBGColor', label: 'The Elite - Colour of background using HTML code', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: 'ffff99'},
    {name: 'bMinTip', label: 'The Elite - Tokens required', type: 'int', minValue: 1, defaultValue: 1000},
    {name: 'bAnnounce', label: 'The Elite - Text to appear upon joining the group (no graphics)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'xXx - MEMBERNAME is now part of The Elite. Welcome.'},
    {name: 'bMemberList', label: 'The Elite - Member Names (precise usernames)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: ''},
    {name: 'bRainText', label: 'The Elite - Text to use for lines', type: 'str', minLength: 0, maxLength: 80, required: false, defaultValue: 'Elite'},
    {name: 'bRainCount', label: 'The Elite - Number of lines for rain', type: 'int', minValue: 1, maxValue: 15, defaultValue: 5},

	{name: 'dText', label: 'The Exclusive - Text to append to the username', type: 'str', minLength: 0, maxLength: 30, required: false, defaultValue: 'Exclusive'},
    {name: 'dTextColor', label: 'The Exclusive - Colour of text using HTML codes', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '000000'},
    {name: 'dBGColor', label: 'The Exclusive - Colour of background using HTML code', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: 'ccccff'},
    {name: 'dMinTip', label: 'The Exclusive - Tokens required', type: 'int', minValue: 1, defaultValue: 1000},
    {name: 'dAnnounce', label: 'The Exclusive - Text to appear upon joining the group (no graphics)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'xXx - MEMBERNAME is now part of The Exclusive. Welcome.'},
    {name: 'dMemberList', label: 'The Exclusive - Member Names (precise usernames)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: ''},
    {name: 'dRainText', label: 'The Exclusive - Text to use for lines', type: 'str', minLength: 0, maxLength: 80, required: false, defaultValue: 'Exclusive'},
    {name: 'dRainCount', label: 'The Exclusive - Number of lines for rain', type: 'int', minValue: 1, maxValue: 15, defaultValue: 5},
];

var mmMembers = {};
var mgMembers = {};
var bMembers = {};
var dMembers = {};
var xxxNotice = "The xXx League. The only place to be. Tip " + cb.settings.mmMinTip + " to become a member of The Untouchables, Tip " + cb.settings.mgMinTip + " to become a member of The Upper Echelon.";
var xxxNotice2 = "Tip " + cb.settings.bMinTip + " to become a member of the Elite, Tip " + cb.settings.dMinTip + " to become a member of The Exclusive.";
var xxxNotice3 = "You will receive special attention and all of your messages will be highlighted in chat. See the bio below for further information.";

function showxxxNotice() {
    cb.chatNotice(xxxNotice);
    cb.setTimeout(showxxxNotice, 900000);
}

function showxxxNotice2() {
    cb.chatNotice(xxxNotice2);
    cb.setTimeout(showxxxNotice2, 900000);
}

function showxxxNotice3() {
    cb.chatNotice(xxxNotice3);
    cb.setTimeout(showxxxNotice3, 900000);
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
    
    return msg;
});


cb.onTip(function (tip) {
    var amountTipped = parseInt(tip['amount']);

    if ((amountTipped >= cb.settings.dMinTip || (amountTipped >= (cb.settings.dMinTip - cb.settings.bMinTip) && isB(tip['from_user'])) || (amountTipped >= (cb.settings.dMinTip - cb.settings.mgMinTip) && isMG(tip['from_user']))) && !isD(tip['from_user'])) {
        // The Exclusive
        var announcement = cb.settings.dAnnounce.replace("MEMBERNAME", tip['from_user']);
        makeD(tip['from_user']);
        for (var i = 0; i < cb.settings.dRainCount; i++) {
            cb.chatNotice(cb.settings.dRainText);
        }
        cb.chatNotice(announcement);
    }
    else if ((amountTipped >= cb.settings.bMinTip || (amountTipped >= (cb.settings.bMinTip - cb.settings.mgMinTip) && isMG(tip['from_user'])) ) && !isB(tip['from_user']) && !isD(tip['from_user'])) {
        // The Elite
        var announcement = cb.settings.bAnnounce.replace("MEMBERNAME", tip['from_user']);
        makeB(tip['from_user']);
        for (var i = 0; i < cb.settings.bRainCount; i++) {
            cb.chatNotice(cb.settings.bRainText);
        }
        cb.chatNotice(announcement);
    }
    else if (amountTipped >= cb.settings.mgMinTip && !isMG(tip['from_user']) && !isB(tip['from_user']) && !isD(tip['from_user'])) {
        // The Upper Echelon
        var announcement = cb.settings.mgAnnounce.replace("MEMBERNAME", tip['from_user']);
        makeMG(tip['from_user']);
        for (var i = 0; i < cb.settings.mgRainCount; i++) {
            cb.chatNotice(cb.settings.mgRainText);
        }
        cb.chatNotice(announcement);
    } else if (amountTipped >= cb.settings.mmMinTip && !isMM(tip['from_user']) && !isMG(tip['from_user']) && !isB(tip['from_user']) && !isD(tip['from_user'])) {
        // The Untouchable
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
    // Retrieve Members
    if (cb.settings.mmMemberList) {
        var mmMemberSettings = cb.settings.mmMemberList.split(',');
        for (var ii = 0; ii < mmMemberSettings.length; ii++) {
            var clean = mmMemberSettings[ii].toLowerCase().replace(/ /g, "");
            mmMembers[clean] = {'u': 1};
        }
    }

    // Retrieve Members
    if (cb.settings.mgMemberList) {
        var mgMemberSettings = cb.settings.mgMemberList.split(',');
        for (var ii = 0; ii < mgMemberSettings.length; ii++) {
            var clean = mgMemberSettings[ii].toLowerCase().replace(/ /g, "");
            mgMembers[clean] = {'u': 1};
        }
    }

    // Retrieve Members
    if (cb.settings.bMemberList) {
        var bMemberSettings = cb.settings.bMemberList.split(',');
        for (var ii = 0; ii < bMemberSettings.length; ii++) {
            var clean = bMemberSettings[ii].toLowerCase().replace(/ /g, "");
            bMembers[clean] = {'u': 1};
        }
    }

    // Retrieve Members
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
showxxxNotice();
showxxxNotice2();
showxxxNotice3();
