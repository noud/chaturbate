// https://fr.chaturbate.com/apps/user_uploads/2/nightseduce/
// https://fr.chaturbate.com/apps/sourcecode/nightseduce-family/?version=&slot=2

/* ChaturBate set-up */
cb.settings_choices = [

// Information
 {name:'rule1', type:'str', minLength:1, maxLength:255, label:'Rule #1'},
    {name:'rule2', type:'str', minLength:1, maxLength:255, label:'Rule #2 (optional)', required:false},
    {name:'rule3', type:'str', minLength:1, maxLength:255, label:'Rule #3 (optional)', required:false},
    {name:'rule4', type:'str', minLength:1, maxLength:255, label:'Rule #4 (optional)', required:false},
    {name:'rule5', type:'str', minLength:1, maxLength:255, label:'Rule #5 (optional)', required:false},
    {name:'rule6', type:'str', minLength:1, maxLength:255, label:'Rule #6 (optional)', required:false},
    {name:'rule7', type:'str', minLength:1, maxLength:255, label:'Rule #7 (optional)', required:false},
    {name:'rule8', type:'str', minLength:1, maxLength:255, label:'Rule #8 (optional)', required:false},
    {name:'rule9', type:'str', minLength:1, maxLength:255, label:'Rule #9 (optional)', required:false},
    {name:'rule10', type:'str', minLength:1, maxLength:255, label:'Rule #10 (optional)', required:false},
    {name:'advertisement_wait_time', type:'choice', label:'Notification Time (in minutes)',
        choice1:5, choice2:10, choice3:15, choice4:20, choice5:25, choice6:30, choice7:45, choice8:60,
        defaultValue:15},

// slang
{name: 'slang1', type: 'str', minLength: 1, maxLength: 255, required: false},

{name: 'replace', type: 'str', minLength: 1, maxLength: 255, required: false},

{name: 'slang2', type: 'str', minLength: 1, maxLength: 255, required: false},

{name: 'replace2', type: 'str', minLength: 1, maxLength: 255, required: false},
{name: 'slang3', type: 'str', minLength: 1, maxLength: 255, required: false},

{name: 'replace3', type: 'str', minLength: 1, maxLength: 255, required: false},
{name: 'slang4', type: 'str', minLength: 1, maxLength: 255, required: false},

{name: 'replace4', type: 'str', minLength: 1, maxLength: 255, required: false},
{name: 'slang5', type: 'str', minLength: 1, maxLength: 255, required: false},

{name: 'replace5', type: 'str', minLength: 1, maxLength: 255, required: false},
{name: 'slang6', type: 'str', minLength: 1, maxLength: 255, required: false},

{name: 'replace6', type: 'str', minLength: 1, maxLength: 255, required: false},
{name: 'slang7', type: 'str', minLength: 1, maxLength: 255, required: false},

{name: 'replace7', type: 'str', minLength: 1, maxLength: 255, required: false},
{name: 'slang8', type: 'str', minLength: 1, maxLength: 255, required: false},


{name: 'replace8', type: 'str', minLength: 1, maxLength: 255, required: false},
{name: 'slang9', type: 'str', minLength: 1, maxLength: 255, required: false},


{name: 'replace9', type: 'str', minLength: 1, maxLength: 255, required: false},
{name: 'slang10', type: 'str', minLength: 1, maxLength: 255, required: false},

{name: 'replace10', type: 'str', minLength: 1, maxLength: 255, required: false},
		// husband
		{		name: 'heMinTip',
				label: 'Minimum tip to become pakies cyber husband ',
				type: 'int',
				minValue: 1,
				defaultValue: 888
		},
		{		name: 'heAnnounce',
				label: 'Text to show when someone tips to become a pakies husband cyber, the text MEMBERNAME will be replaced with the username of the new (Note: graphics don\'t work in this text)',
				type: 'str',
				minLength: 0,
				maxLength: 10240,
				required: false,
				defaultValue: 'MEMBERNAME - Welcome to pakies cyber husband List!'
		},
		{		name: 'heRainText',
				label: 'Text to use for rain lines',
				type: 'str',
				minLength: 0,
				maxLength: 80,
				required: false,
				defaultValue: 'pakie cyber husband arrived!'
		},
		{		name: 'heTextColor',
				label: 'pakies cyber husband text color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: '013ADF'
		},
		{		name: 'heBGColor',
				label: 'pakies cyber husband background color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: '87CEEB'
		},
		{		name: 'heMemberList',
				label: 'List of current pakies cyber husband, separated by commas (and they need to be the CB username exactly)',
				type: 'str',
				minLength: 0,
				maxLength: 10240,
				required: false,
				defaultValue: ''
		},
		// The Hero
		{		name: 'siMinTip',
				label: 'Minimum tip to become The Hero ',
				type: 'int',
				minValue: 1,
				defaultValue: 2014
		},
		{		name: 'siAnnounce',
				label: 'Text to show when someone tips to become The Hero, the text MEMBERNAME will be replaced with the username of the new (Note: graphics don\'t work in this text)',
				type: 'str',
				minLength: 0,
				maxLength: 10240,
				required: false,
				defaultValue: 'MEMBERNAME - Welcome to The hero List!'
		},
		{		name: 'siRainText',
				label: 'Text to use for rain lines',
				type: 'str',
				minLength: 0,
				maxLength: 80,
				required: false,
				defaultValue: 'The Hero arrived!'
		},
		{		name: 'siText',
				label: 'Text to put in front of Hero members, the text will be put inside square brackets [ ]',
				type: 'str', 
				minLength: 0,
				maxLength: 15,
				required: false,
				defaultValue: 'DF0101'
		},
		{		name: 'siTextColor',
				label: 'hero text color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: '424242'
		},
		{		name: 'siBGColor',
				label: 'hero background color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: 'B8860B'
		},
		{		name: 'siMemberList',
				label: 'List of current hero users, separated by commas (and they need to be the CB username exactly)',
				type: 'str',
				minLength: 0,
				maxLength: 10240,
				required: false,
				defaultValue: 'hopefree'
		},
		// The King
		{		name: 'moMinTip',
				label: 'Minimum tip to become The King ',
				type: 'int',
				minValue: 1,
				defaultValue: 1234
		},
		{		name: 'moAnnounce',
				label: 'Text to show when someone tips to become The King, the text MEMBERNAME will be replaced with the username of the new (Note: graphics don\'t work in this text)',
				type: 'str',
				minLength: 0,
				maxLength: 10240,
				required: false,
				defaultValue: 'MEMBERNAME - Welcome to The King List!'
		},
		{		name: 'moRainText',
				label: 'Text to use for rain lines',
				type: 'str',
				minLength: 0,
				maxLength: 80,
				required: false,
				defaultValue: 'The King arrived!'
		},
		{		name: 'moTextColor',
				label: 'King text color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: 'DF0101'
		},
		{		name: 'moBGColor',
				label: 'King background color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: 'DAA520'
		},
		{		name: 'moMemberList',
				label: 'List of current king, separated by commas (and they need to be the CB username exactly)',
				type: 'str',
				minLength: 0,
				maxLength: 10240,
				required: false,
				defaultValue: 'noon3,wholuvsya'
		},
		// VIP
		{		name: 'piMinTip',
				label: 'Minimum tip to VIP ',
				type: 'int',
				minValue: 1,
				defaultValue: 1000
		},
		{		name: 'piAnnounce',
				label: 'Text to show when someone tips to become VIP, the text MEMBERNAME will be replaced with the username of the new (Note: graphics don\'t work in this text)',
				type: 'str',
				minLength: 0,
				maxLength: 10240,
				required: false,
				defaultValue: 'MEMBERNAME - Welcome to VIP List!'
		},
		{		name: 'piRainText',
				label: 'Text to use for rain lines',
				type: 'str',
				minLength: 0,
				maxLength: 80,
				required: false,
				defaultValue: 'VIP arrived!'
		},
		{		name: 'piText',
				label: 'Text to put in front of VIP members, the text will be put inside square brackets [ ]',
				type: 'str', 
				minLength: 0,
				maxLength: 15,
				required: false,
				defaultValue: 'DF0101'
		},
		{		name: 'piTextColor',
				label: 'VIP text color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: '424242'
		},
		{		name: 'piBGColor',
				label: 'VIP background color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: '98FB98'
		},
		{		name: 'piMemberList',
				label: 'List of current VIP users, separated by commas (and they need to be the CB username exactly)',
				type: 'str',
				minLength: 0,
				maxLength: 10240,
				required: false,
				defaultValue: 'ar3a51,txpcock,miamdogg80,ohioman2480,yusuke000,matt_1966,jon_doh,garfield1002,shaynecomeback,marcloveslegs'
		},
		// Bodyguard
		{		name: 'poTextColor',
				label: 'Bodyguard text color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: 'DF0101'
		},
		{		name: 'poBGColor',
				label: 'Bodyguard background color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: 'CD853F'
		},
		{		name: 'poMemberList',
				label: 'List of current Bodyguard, separated by commas (and they need to be the CB username exactly)',
				type: 'str',
				minLength: 0,
				maxLength: 10240,
				required: false,
				defaultValue: 'texasjp'
		},
		// Manager
		{		name: 'kaTextColor',
				label: 'Manager text color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: 'DF0101'
		},
		{		name: 'kaBGColor',
				label: 'Manager background color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: '8470FF'
		},
		{		name: 'kaMemberList',
				label: 'List of current Manager, separated by commas (and they need to be the CB username exactly)',
				type: 'str',
				minLength: 0,
				maxLength: 10240,
				required: false,
				defaultValue: 'asianyellowdog1'
		},
		// PVT Lover
		{		name: 'paTextColor',
				label: 'PVT Lover members text color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: '035A20'
		},
		{		name: 'paBGColor',
				label: 'PVT Lover members background color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: 'FFA07A'
		},
		{		name: 'paMemberList',
				label: 'List of current PVT Lover members, separated by commas (and they need to be the CB username exactly)',
				type: 'str',
				minLength: 0,
				maxLength: 10240,
				required: false,
				defaultValue: 'someone06,jangjang32,cambtis'
		},
		{		name: 'bothTextColors',
				label: 'member & Manager & Bodyguard text color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: '013ADF'
		},	
		// Member
		{		name: 'peMinTip',
				label: 'Minimum tip to become Member ',
				type: 'int',
				minValue: 1,
				defaultValue: 200
		},
		{		name: 'peAnnounce',
				label: 'Text to show when someone tips to become Member, the text MEMBERNAME will be replaced with the username of the new (Note: graphics don\'t work in this text)',
				type: 'str',
				minLength: 0,
				maxLength: 10240,
				required: false,
				defaultValue: 'MEMBERNAME - Welcome to Member List!'
		},
		{		name: 'peRainText',
				label: 'Text to use for rain lines',
				type: 'str',
				minLength: 0,
				maxLength: 80,
				required: false,
				defaultValue: 'Member arrived!'
		},
		{		name: 'peTextColor',
				label: 'Members text color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: '035A20'
		},
		{		name: 'peBGColor',
				label: 'Members background color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: 'AFEEEE'
		},
		{		name: 'peMemberList',
				label: 'List of current members, separated by commas (and they need to be the CB username exactly)',
				type: 'str',
				minLength: 0,
				maxLength: 10240,
				required: false,
				defaultValue: 'davidlb,notimportant2know,stayinfit66,tecaterocks,ctshimi,vernzzz'
		},
		{		name: 'bothTextColors',
				label: 'member & Manager & Bodyguard text color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: '013ADF'
		},
		// Sexy Boss
		{		name: 'seTextColor',
				label: 'sexy Members text color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: 'FF1493'
		},
		{		name: 'seBGColor',
				label: 'Sexy Boss background color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: 'FFE4E1'
		},
		{		name: 'seMemberList',
				label: 'List of current sexy boss, separated by commas (and they need to be the CB username exactly)',
				type: 'str',
				minLength: 0,
				maxLength: 10240,
				required: false,
				defaultValue: 'teasegirl'
		},
		{		name: 'bothTextColors',
				label: 'member & Manager & Bodyguard text color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: '013ADF'
		},
		// Family Members
		{		name: 'faTextColor',
				label: 'pakie Family members text color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: '035A20'
		},
		{		name: 'faBGColor',
				label: 'pakie Family members background color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: 'EEDD82'
		},
		{		name: 'faMemberList',
				label: 'List of current Family members, separated by commas (and they need to be the CB username exactly)',
				type: 'str',
				minLength: 0,
				maxLength: 10240,
				required: false,
				defaultValue: 'texasjp,someone06,drjoseph1966,letsgan,asianyellowdog1,schlegelli46,agentjimmy,jangjang32,cambtis,bkindfaith,lovehatechatubate,nexus7556,rainyspirit,gino6'
		},
		{		name: 'bothTextColor',
				label: 'Family member & Hero & King text color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: '013ADF'
		},
		{		name: 'bothBGColor',
				label: 'Family member & Hero & king background color - HTML colour code',
				type: 'str',
				minLength: 0,
				maxLength: 6,
				required: false,
				defaultValue: 'FAFAFA'
		}
];

var heMembers = {};
var siMembers = {};
var moMembers = {};
var piMembers = {};
var poMembers = {};
var kaMembers = {};
var paMembers = {};
var peMembers = {};
var seMembers = {};
var faMembers = {};
var mmNotice = "Tip " + cb.settings.mmMinTip + " to become a member of the Jess Admirers, Tip " + cb.settings.mgMinTip + " to become a Jess Friend\nTip " + cb.settings.bMinTip + " to become a Jess Boyfriend! Tip " + cb.settings.dMinTip + " to become a Jess Hubby!\nAll you messages will be highlighted in chat and you also get exclusive content (see Jess's bio for details).";

// For auto-silencing at least some of token_wh*re_c*nts usernames
var twcRegex = /t.?k.?n.?wh.?r.?_c.?nt.?/i;

cb.onMessage(function (msg) {
    // vars for ease of use
    var u = msg['user'];

    if ( isSI(u) && isMO(u) ) {
        msg['background'] = '#' + cb.settings.bothBGColor;
        msg['c'] = '#' + cb.settings.bothTextColor;
        msg['m'] = " :pkhe2 :pkking2  ... " + msg['m'];
     } else if ( isHE(u) && isMO(u) ) {
        msg['background'] = '#' + cb.settings.moBGColor;
        msg['c'] = '#' + cb.settings.moTextColor;
        msg['m'] = " :pkhb2 :pkking2... " + msg['m'];
    } else if ( isHE(u) ) {
        msg['background'] = '#' + cb.settings.heBGColor;
        msg['c'] = '#' + cb.settings.ulTextColor;
        msg['m'] = " :pkhb2 ... " + msg['m'];
    } else if ( isSI(u) ) {
        msg['background'] = '#' + cb.settings.siBGColor;
        msg['c'] = '#' + cb.settings.siTextColor;
        msg['m'] = " :pkhe2 ... " + msg['m'];
    } else if ( isMO(u) ) {
        msg['background'] = '#' + cb.settings.moBGColor;
        msg['c'] = '#' + cb.settings.moTextColor;
        msg['m'] = " :pkking2 ... " + msg['m'];
    } else if ( isPE(u) ) {
        msg['background'] = '#' + cb.settings.peBGColor;
        msg['c'] = '#' + cb.settings.ulTextColor;
        msg['m'] = " :pkmember ... " + msg['m'];
    } else if ( isPI(u) ) {
        msg['background'] = '#' + cb.settings.piBGColor;
        msg['c'] = '#' + cb.settings.piTextColor;
        msg['m'] = " :pkvip1 ... " + msg['m'];
    } else if ( isPO(u) ) {
        msg['background'] = '#' + cb.settings.poBGColor;
        msg['c'] = '#' + cb.settings.poTextColor;
        msg['m'] = " :pkbg ... " + msg['m'];
    } else if ( isKA(u) ) {
        msg['background'] = '#' + cb.settings.kaBGColor;
        msg['c'] = '#' + cb.settings.kaTextColor;
        msg['m'] = " :pkmanager ... " + msg['m'];
    } else if ( isPA(u) ) {
        msg['background'] = '#' + cb.settings.paBGColor;
        msg['c'] = '#' + cb.settings.paTextColor;
        msg['m'] = " :pkpvt ... " + msg['m'];
    } else if ( isPE(u) ) {
        msg['background'] = '#' + cb.settings.peBGColor;
        msg['c'] = '#' + cb.settings.peTextColor;
        msg['m'] = " :pkmember ... " + msg['m'];
    } else if ( isSE(u) ) {
        msg['background'] = '#' + cb.settings.seBGColor;
        msg['c'] = '#' + cb.settings.seTextColor;
        msg['m'] = " :pkboss ... " + msg['m'];
    } else if ( isFA(u) ) {
        msg['background'] = '#' + cb.settings.faBGColor;
        msg['c'] = '#' + cb.settings.faTextColor;
        msg['m'] = " :pkfam2 ... " + msg['m'];
    }

    if (twcRegex.test(u)){
        // Auto-silencing at least some of token_wh*re_c*nts usernames
        msg['X-Spam'] = true;
    }
var n=msg.m.indexOf("sex");
var n1=msg.m.indexOf("fuck");
var n2=msg.m.indexOf("lol");
				   
				
var st=1;
if (st>0)
  {
  
  x="Good day";
var n2=msg.m.replace("fuck","fuck").replace(cb.settings.slang1,cb.settings.replace).replace(cb.settings.slang1,cb.settings.replace).replace(cb.settings.slang2,cb.settings.replace2).replace(cb.settings.slang3,cb.settings.replace3).replace(cb.settings.slang4,cb.settings.replace4).replace(cb.settings.slang5,cb.settings.replace5).replace(cb.settings.slang6,cb.settings.replace6).replace(cb.settings.slang7,cb.settings.replace7).replace(cb.settings.slang8,cb.settings.replace8).replace(cb.settings.slang9,cb.settings.replace9).replace(cb.settings.slang10,cb.settings.replace10).replace(cb.settings.slang1,cb.settings.replace).replace(cb.settings.slang1,cb.settings.replace).replace(cb.settings.slang1,cb.settings.replace).replace(cb.settings.slang1,cb.settings.replace).replace(cb.settings.slang1,cb.settings.replace).replace(cb.settings.slang1,cb.settings.replace).replace(cb.settings.slang1,cb.settings.replace).replace(cb.settings.slang1,cb.settings.replace).replace(cb.settings.slang1,cb.settings.replace).replace(cb.settings.slang2,cb.settings.replace2).replace(cb.settings.slang1,cb.settings.replace);
msg.m = n2;


  }
return msg;


	

});


cb.onTip(function (tip) {
    var amountTipped = parseInt(tip['amount']);

    if ((amountTipped >= cb.settings.heMinTip || (amountTipped >= (cb.settings.siMinTip - cb.settings.peMinTip) && isSI(tip['from_user'])) || (amountTipped >= (cb.settings.moMinTip - cb.settings.heMinTip) && isHE(tip['from_user']))) && !isMO(tip['from_user'])) {
        // Make The King and announce it
        var announcement = cb.settings.moAnnounce.replace("MEMBERNAME", tip['from_user']);
        makeMO(tip['from_user']);
        for (var i = 0; i < cb.settings.moRainCount; i++) {
            cb.chatNotice(cb.settings.moRainText);
        }
        cb.chatNotice(announcement);
    }
    else if ((amountTipped >= cb.settings.siMinTip || (amountTipped >= (cb.settings.siMinTip - cb.settings.heMinTip) && isHE(tip['from_user'])) ) && !isSI(tip['from_user']) && !isMO(tip['from_user'])) {
        // Make The Hero and announce it
        var announcement = cb.settings.siAnnounce.replace("MEMBERNAME", tip['from_user']);
        makeSI(tip['from_user']);
        for (var i = 0; i < cb.settings.siRainCount; i++) {
            cb.chatNotice(cb.settings.siRainText);
        }
        cb.chatNotice(announcement);
    }
    else if (amountTipped >= cb.settings.heMinTip && !isHE(tip['from_user']) && !isSI(tip['from_user']) && !isMO(tip['from_user'])) {
        // Make cyber hunband and announce it
        var announcement = cb.settings.heAnnounce.replace("MEMBERNAME", tip['from_user']);
        makeHE(tip['from_user']);
        for (var i = 0; i < cb.settings.heRainCount; i++) {
            cb.chatNotice(cb.settings.heRainText);
        }
        cb.chatNotice(announcement);
    } 
    else if (amountTipped >= cb.settings.piMinTip && !isPI(tip['from_user']) && !isHE(tip['from_user']) && !isSI(tip['from_user']) && !isMO(tip['from_user'])) {
        // Make VIP and announce it
        var announcement = cb.settings.piAnnounce.replace("MEMBERNAME", tip['from_user']);
        makePI(tip['from_user']);
        for (var i = 0; i < cb.settings.piRainCount; i++) {
            cb.chatNotice(cb.settings.piRainText);
        }
        cb.chatNotice(announcement);
    } 
    else if (amountTipped >= cb.settings.peMinTip && !isPE(tip['from_user']) && !isHE(tip['from_user']) && !isSI(tip['from_user']) && !isMO(tip['from_user']) && !isPI(tip['from_user'])) {
        // Make VIP and announce it
        var announcement = cb.settings.peAnnounce.replace("MEMBERNAME", tip['from_user']);
        makePE(tip['from_user']);
        for (var i = 0; i < cb.settings.peRainCount; i++) {
            cb.chatNotice(cb.settings.peRainText);
        }
        cb.chatNotice(announcement);
    }
});

function isHE(username) {
    return (username in heMembers);
}

function isSI(username) {
    return (username in siMembers);
}

function isMO(username) {
    return (username in moMembers);
}

function isPI(username) {
    return (username in piMembers);
}

function isPO(username) {
    return (username in poMembers);
}

function isKA(username) {
    return (username in kaMembers);
}

function isPA(username) {
    return (username in paMembers);
}

function isPE(username) {
    return (username in peMembers);
}

function isSE(username) {
    return (username in seMembers);
}

function isFA(username) {
    return (username in faMembers);
}

function makeHE(username) {
    heMembers[username] = {'u': 1};
}

function makeSI(username) {
    siMembers[username] = {'u': 1};
}

function makeMO(username) {
    moMembers[username] = {'u': 1};
}

function makePI(username) {
    piMembers[username] = {'u': 1};
}

function makePO(username) {
    poMembers[username] = {'u': 1};
}

function makeKA(username) {
    kaMembers[username] = {'u': 1};
}

function makePA(username) {
    paMembers[username] = {'u': 1};
}

function makePE(username) {
    peMembers[username] = {'u': 1};
}

function makeSE(username) {
    seMembers[username] = {'u': 1};
}

function makeFA(username) {
    faMembers[username] = {'u': 1};
}

function grabSettings() {
    cb.log("starting grabbing settings");
    // Get husband
    if (cb.settings.heMemberList) {
        var heMemberSettings = cb.settings.heMemberList.split(',');
        for (var ii = 0; ii < heMemberSettings.length; ii++) {
            var clean = heMemberSettings[ii].toLowerCase().replace(/ /g,"");
            heMembers[clean] = {'u': 1};
        }
    }

    // Get The Hero
    if (cb.settings.siMemberList) {
        var siMemberSettings = cb.settings.siMemberList.split(',');
        for (var ii = 0; ii < siMemberSettings.length; ii++) {
            var clean = siMemberSettings[ii].toLowerCase().replace(/ /g,"");
            siMembers[clean] = {'u': 1};
        }
    }

    // Get The king
    if (cb.settings.moMemberList) {
        var moMemberSettings = cb.settings.moMemberList.split(',');
        for (var ii = 0; ii < moMemberSettings.length; ii++) {
            var clean = moMemberSettings[ii].toLowerCase().replace(/ /g,"");
            moMembers[clean] = {'u': 1};
        }
    }

    // Get VIP
    if (cb.settings.piMemberList) {
        var piMemberSettings = cb.settings.piMemberList.split(',');
        for (var ii = 0; ii < piMemberSettings.length; ii++) {
            var clean = piMemberSettings[ii].toLowerCase().replace(/ /g,"");
            piMembers[clean] = {'u': 1};
        }
    }

    // Get Bodyguard
    if (cb.settings.poMemberList) {
        var poMemberSettings = cb.settings.poMemberList.split(',');
        for (var ii = 0; ii < poMemberSettings.length; ii++) {
            var clean = poMemberSettings[ii].toLowerCase().replace(/ /g,"");
            poMembers[clean] = {'u': 1};
        }
    }

    // Get Manager
    if (cb.settings.kaMemberList) {
        var kaMemberSettings = cb.settings.kaMemberList.split(',');
        for (var ii = 0; ii < kaMemberSettings.length; ii++) {
            var clean = kaMemberSettings[ii].toLowerCase().replace(/ /g,"");
            kaMembers[clean] = {'u': 1};
        }
    }

    // Get PVT Lover
    if (cb.settings.paMemberList) {
        var paMemberSettings = cb.settings.paMemberList.split(',');
        for (var ii = 0; ii < paMemberSettings.length; ii++) {
            var clean = paMemberSettings[ii].toLowerCase().replace(/ /g,"");
            paMembers[clean] = {'u': 1};
        }
    }

    // Get Member
    if (cb.settings.peMemberList) {
        var peMemberSettings = cb.settings.peMemberList.split(',');
        for (var ii = 0; ii < peMemberSettings.length; ii++) {
            var clean = peMemberSettings[ii].toLowerCase().replace(/ /g,"");
            peMembers[clean] = {'u': 1};
        }
    }

    // Get Sexy Boss
    if (cb.settings.seMemberList) {
        var seMemberSettings = cb.settings.seMemberList.split(',');
        for (var ii = 0; ii < seMemberSettings.length; ii++) {
            var clean = seMemberSettings[ii].toLowerCase().replace(/ /g,"");
            seMembers[clean] = {'u': 1};
        }
    }

    // Get Family members
    if (cb.settings.faMemberList) {
        var faMemberSettings = cb.settings.faMemberList.split(',');
        for (var ii = 0; ii < faMemberSettings.length; ii++) {
            var clean = faMemberSettings[ii].toLowerCase().replace(/ /g,"");
            faMembers[clean] = {'u': 1};
        }
    }
    cb.log("finished grabbing settings");
}

grabSettings();

cb.onEnter(function(user) {
    cb.sendNotice('Welcome to my room, ' + user['user'] + '. Please take a moment to read my room rules before chatting. Thank you!', user['user'], '#CCF5EB', '', 'bold');
    displayRules(user);
});

function displayRules(user) {
    var username = ' ';
    if(user) username = user['user'];
    var notices = '########## ROOM RULES ##########';
    for(var i=1; i<=10;i++) {
        if(cb.settings['rule' + i]) notices += '\nRule #'+ i +': ' + cb.settings['rule'+i];
    }

    cb.sendNotice(notices, username, '', '#0066CC', 'bold');
    if(!user || user == null) cb.setTimeout(displayRules, cb.settings.advertisement_wait_time * 60000);
}

function init() {

    displayRules();
}

init();
