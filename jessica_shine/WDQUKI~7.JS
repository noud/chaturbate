// https://chaturbate.com/apps/user_uploads/1/jessica_shine/
// https://chaturbate.com/apps/sourcecode/whats-your-mood-name-goal/?version=&slot=1

/*
*  Title:		Pervy app
*  Author:		Jessica_shine
*  Version: 	1.0




*  TODO:       Gender for first names when on Tip provides mood name
*/

// vars
var totalTipped = 0;
var topTipAmount = 0;
var topTipper = null;
var lastUserAssigned = null;
var lastMoodNameAssigned = null;

var CONFIG_TIPPER_COLOR = '#aeceeb';
var CONFIG_TOP_TIPPER_COLOR = '#eaacea';

var r=0;
var i=0;

cb.settings_choices = [
    {name: 'tokens', type: 'int', minValue: 1, defaultValue: 5, label: "Minimum tip for mood name"},
    {name: 'sexyadverts', type: 'int', minValue: 1, defaultValue: 5, label: "Minutes between random pervy phrases"},
    {name: 'goal', type: 'int', minValue: 0, defaultValue: 0, label: "Token goal", required:false},
    {name: 'goal_description', type: 'str', minLength: 0, maxLength: 500, label: 'Goal Description', required:false}
    
    //{name: 'customizefirstnames', type: 'str', minLength: 1, maxLength: 255, label: "Add more first names (separate by commas)"},
    //{name: 'customizelastnames', type: 'str', minLength: 1, maxLength: 255, label: "Add more last names (separate by commas)"}
];

var FMname = new Array("Pervy","Crazy","Sneaky","Classy","Kind","Nice","Cool","Awesome",
"Too pervy","Hidden"," The Biggestperv","Happy","a lover","Evil","Bad","Good",
"So hot","So horny","The king","a Chaturbator","a master","Pervert","Bad boy","a God"

                       );
/* Can't read gender onTip
var FFname = new Array("hotgirl","hornygirl","crazygirl","pervygirl","funnygirl","trickygirl","teasinggirl","sneakygirl"

		);
*/
var Lname = new Array("!","!","!","!","!","!","!","!",
"!","!","!","!","!","!","!","!",
"!","!","!","!","!","!","!","!",
"!","!","!","!","!","!","!","!",
"!","!","!","!","!","!","!","!",
"!","!","!","!","!","!","!","!",
"!","!","!","!","!","!","!","!",
"!","!","!","!","!","!","!","!",
"!","!","!","!","!","!","!","!"
		);
var sexyExclamations = new Array("WOW","OMG","I feel so pervy","I am crazy!","I am a king",
		"I feel it","OMFG! You kill me!","I am so horny and you are so hot:","Kiss me:","Don't Stop, Harder",
		"You are naughty:","Faint","You are the sex bomb:","Show me what u got!","That Feels Amazing",
		"You are a pervert and I fucking like that:","Rape me!","I am burningggg!","I want you!"
		
		);

var userMap = {};




// handlers
cb.onTip(function(tip) {
	// 1. track all tips received
	totalTipped += tip['amount'];
	if (cb.settings.goal && cb.settings.goal !=0 && totalTipped > cb.settings.goal) totalTipped = cb.settings.goal;
	
	if (tip['amount'] > topTipAmount) {
		topTipAmount = tip['amount'];
		topTipper = tip['from_user'];
	}

	// 2. see if user met assignment minimum
    if (tip['amount'] >= cb.settings.tokens) {
    	updateName(tip['from_user']);
    	lastUserAssigned = tip['from_user'];
    }

    updateSubject();
    
	// 3. update panel
    cb.drawPanel();
});

cb.onDrawPanel(function(user) {
	var row1label = 'Tips received:';
	var row1value = '' + totalTipped;
	if (cb.settings.goal && cb.settings.goal !=0) {
		row1label = 'Tips received / goal:';
		row1value = '' + totalTipped + ' / ' + cb.settings.goal;
	}
	var row2label = 'Highest Tipper:';
	var row2value = '--';
	if (topTipper) {
		row2value = '' + formatName(topTipper,12) + ' (' + topTipAmount +')';
	}
	
    return {
        'template': '3_rows_of_labels',
        'row1_label': row1label,
        'row1_value': row1value,
        'row2_label': row2label,
        'row2_value': row2value,
        'row3_label': 'Last tipper:',
        'row3_value': formatName(lastUserAssigned,8) + ' is ' + formatName(lastMoodNameAssigned,13)
    };
});

cb.onMessage(function (msg) {
    if (msg['user'] in userMap)  {
    	msg['background'] = CONFIG_TIPPER_COLOR;
        msg['m'] = "[is " + userMap[msg['user']] + "]: " + msg['m'];
    }
    if (msg['user'] == topTipper) {
    	msg['background'] = CONFIG_TOP_TIPPER_COLOR;
    }
    return msg;
});

function updateSubject() {
	cb.changeRoomSubject(getSubject());
}
function getSubject() {
	var subject = 'What\'s Your mood name? is running! Tip ' + cb.settings.tokens + ' to get your mood name or change it!';
	if (cb.settings.goal_description != '') {
		subject += ' Goal is [' +  cb.settings.goal_description +']';
	}
	if (cb.settings.goal != 0) {
		subject += ' [' + tipsRemaining() + '] tokens left to reach goal!';
	}
	return subject;
}

//helper functions
function updateName(origName) {
	lastMoodNameAssigned = getRandomName();
	userMap[origName] = lastMoodNameAssigned;
}

function getRandomName() { 
	i=Math.floor(Math.random() * FMname.length);
	r=Math.floor(Math.random() * Lname.length); 
	return FMname[i] + " " + Lname[r];
}

function formatName(val,length) {
    if (val === null) {
        return "--";
    } else {
        return val.substring(0, length);
    }
}
function userMapSize() {
	var count = 0;
	for (var k in userMap) {
		if (userMap.hasOwnProperty(k)) {	
			count++;
		}
	}
	return count;
}
function tipsRemaining() {
	if (!cb.settings.goal) return 0;
    var r = cb.settings.goal - totalTipped;
    if (r < 0) {
        return 0;
    } else {
        return r;
    }
}

function advert() {
	if (userMapSize() > 0) {
		var keys = Object.keys(userMap);
		var randomUser = keys[Math.floor(keys.length * Math.random())];
		var randomPhrase = sexyExclamations[Math.floor(Math.random() * sexyExclamations.length)];

		cb.chatNotice('Like mood name ' + randomUser + ' is ' + userMap[randomUser] + ' says, "' + randomPhrase + ' ' + cb.room_slug + '". \nTip ' + cb.settings.tokens + ' for your mood name!');
	}
	cb.setTimeout(advert, (cb.settings.sexyadverts * 60000));
}


function init() {
    cb.changeRoomSubject('What\'s Your Mood Name? by JS is running! Tip ' + cb.settings.tokens + ' to get your mood name or change it!');
    cb.setTimeout(advert, (cb.settings.sexyadverts * 60000));
}

init();
