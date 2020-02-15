// https://chaturbate.com/apps/user_uploads/1/jessica_shine/
// https://chaturbate.com/apps/sourcecode/jess-gf-or-wf/?version=&slot=1

//  sdsds
// CB app settings
cb.settings_choices = [
		{		name: 'doColoring',
				type: 'choice', 
				label: 'Change text and background coloring for members and girlfriends (choose colours below)?',
        			choice1: 'Yes',
        			choice2: 'No', 
				defaultValue: 'Yes'
		},
		{		name: 'doText',
				type: 'choice',
				label: 'Add text labels in front of members and sweethearts messages (choose text below)?',
        			choice1: 'Yes',
        			choice2: 'No',
				defaultValue: 'Yes'
		},
		{		name: 'mmText',
				label: 'Text to put in front of Jess Girlfriend members messages (e.g. JGF), the text will be put inside square brackets []',
				type: 'str', 
				minLength: 0,
				maxLength: 10,
				required: false,
				defaultValue: 'JGF'
		},
    {name: 'mmTextColor', label: 'Jess Girlfriend members text color - HTML colour code without starting \'#\' e.g. (FFFFFF is white)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '000000'},
    {name: 'mmBGColor', label: 'Jess Girlfriend members background color - HTML colour code without starting \'#\' e.g. (000000 is black)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '00c400'},
    {name: 'bothTextColor', label: 'Girlfriend and wife members text color - HTML colour code without starting \'#\' e.g. (FFFFFF is white)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '000000'},
    {name: 'bothBGColor', label: 'Girlfriend and Wife members background color - HTML colour code without starting \'#\' e.g. (000000 is black)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '4e67ff'},
    {name: 'mmMinTip', label: 'Minimum tip to become a member of JGF', type: 'int', minValue: 1, defaultValue: 1500},
    {name: 'mmAnnounce', label: 'Text to show when someone tips to become a member of Jess Girlfriend, the text MEMBERNAME will be replaced with the username of the new  (Note: graphics don\'t work in this text)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'MEMBERNAME just joined Jessica Shine Jess Girlfriends'},
    {name: 'mmMemberList', label: 'List of current members of Jess Girlfriends, separated by commas (and they need to be the CB username exactly)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'alexaluv'},
    {name: 'mmRainText', label: 'Text to use for The Jess Girlfroend rain lines', type: 'str', minLength: 0, maxLength: 80, required: false, defaultValue: 'NEW MEMBER OF THE Jess Girlfriends'},
    {name: 'mmRainCount', label: 'Number of lines of The Jess Girlfriend rain', type: 'int', minValue: 1, maxValue: 15, defaultValue: 3},

    {name: 'mgText', label: 'Text to put in front of The Jess Wives messages (e.g. EN)', type: 'str', minLength: 0, maxLength: 30, required: false, defaultValue: 'JWF'},
    {name: 'mgTextColor', label: 'The Jess Wives text color - HTML colour code without starting \'#\' e.g. (000000 is black)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: '04051C'},
    {name: 'mgBGColor', label: 'The Jess Wives background color - HTML colour code without starting \'#\' e.g. (F5B608 is orangey/gold)', type: 'str', minLength: 0, maxLength: 6, required: false, defaultValue: 'f5a0f2'},
    {name: 'mgMinTip', label: 'Minimum tip to become a Best', type: 'int', minValue: 1, defaultValue: 25},
    {name: 'mgAnnounce', label: 'Text to show when someone tips to become a Jess Wives  Member, the text MEMBERNAME will be replaced with the username of the new member (Note: graphics don\'t work in this text)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: 'MEMBERNAME just became a Jess Wives Club Member'},
    {name: 'mgMemberList', label: 'List of current The Jess Wives, separated by commas (and they need to be the CB username exactly)', type: 'str', minLength: 0, maxLength: 10240, required: false, defaultValue: ''},
    {name: 'mgRainText', label: 'Text to use for Jess Wives Club rain lines', type: 'str', minLength: 0, maxLength: 80, required: false, defaultValue: 'WATCH OUT THE Best USERS ARE OUT'},
    {name: 'mgRainCount', label: 'Number of lines of Best rain', type: 'int', minValue: 1, maxValue: 15, defaultValue: 15}
];

var mmMembers = {};
var mgMembers = {};

// For auto-silencing at least some of token_wh*re_c*nts usernames
var twcRegex = /t.?k.?n.?wh.?r.?_c.?nt.?/i;

cb.onMessage(function (msg) {
    // vars for ease of use
    var u = msg['user'];


    if ( isMG(u) && isMM(u) ) {
        msg['background'] = '#' + cb.settings.bothBGColor;
        msg['c'] = '#' + cb.settings.bothTextColor;
        msg['m'] = "[" +cb.settings.mmText+" / "+ cb.settings.mgText + "] " + msg['m'];
    } else if (isMG(u)) {
        msg['background'] = '#' + cb.settings.mgBGColor;
        msg['c'] = '#' + cb.settings.mgTextColor;
        msg['m'] = "[" + cb.settings.mgText + "] " + msg['m'];
    } else if ( isMM(u) ) {
        msg['background'] = '#' + cb.settings.mmBGColor;
        msg['c'] = '#' + cb.settings.mmTextColor;
        msg['m'] = "[" + cb.settings.mmText + "] " + msg['m'];
    }

    if (twcRegex.test(u)){
        // Auto-silencing at least some of token_wh*re_c*nts usernames
        msg['X-Spam'] = true;
    }
    return msg;
});


cb.onTip(function (tip) {
    var amountTipped = parseInt(tip['amount']);

    if (amountTipped == cb.settings.mgMinTip && !isMG(tip['from_user'])) {
        // Make Jess Girlfriend and announce it
        var announcement = cb.settings.mgAnnounce.replace("MEMBERNAME", tip['from_user']);
        makeMG(tip['from_user']);
        for (var i = 0; i < cb.settings.mgRainCount; i++) {
            cb.chatNotice(cb.settings.mgRainText);
        }
        cb.chatNotice(announcement);
    } 

    if (amountTipped == cb.settings.mmMinTip) {
        // Make Jess Wife and announce it
        var announcement = cb.settings.mmAnnounce.replace("MEMBERNAME", tip['from_user']);
        makeMM(tip['from_user']);
        for (var i = 0; i < cb.settings.mmRainCount; i++) {
            cb.chatNotice(cb.settings.mmRainText);
        }
        cb.chatNotice(announcement);
    }
});

function isMG(username) {
    return (username in mgMembers);
}

function isMM(username) {
    return (username in mmMembers);
}

function makeMG(username) {
    mgMembers[username] = {'u': 1};
}

function makeMM(username) {
    mmMembers[username] = {'u': 1};
}

function grabSettings() {
    cb.log("starting grabbing settings");
    // Get kings members
    if (cb.settings.mmMemberList) {
        var mmMemberSettings = cb.settings.mmMemberList.split(',');
        for (var ii = 0; ii < mmMemberSettings.length; ii++) {
            var clean = mmMemberSettings[ii].toLowerCase().replace(/ /g,"");
            mmMembers[clean] = {'u': 1};
        }
    }

    // Get Bests
    if (cb.settings.mgMemberList) {
        var mgMemberSettings = cb.settings.mgMemberList.split(',');
        for (var ii = 0; ii < mgMemberSettings.length; ii++) {
            var clean = mgMemberSettings[ii].toLowerCase().replace(/ /g,"");
            mgMembers[clean] = {'u': 1};
        }
    }
    cb.log("finished grabbing settings");
}

grabSettings();
