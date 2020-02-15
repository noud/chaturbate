/*
	Name:		Office_Alessia's Auto-Reset Tip Goal
	Author:		Ypsilon1975
	
	Version History
	======================================================
	v1.0 20/02/2014: First Release
	v1.1 23/02/2014: Add the Settings Choice "Already
					 received tokens"
	
	Credits
	======================================================
	Based on the Auto-Reset Tip Goal App from biron
	
*/


// vars
var times_goal_reached = 0;
var last_time_goal_reached = null;
var current_goal_tipped = 0;
var current_description = null;

var set_tokens_command = '!settok';
var set_reached_command = '!setreached';
var new_subject_command = '!status';
var help_command = '!help';

cb.settings_choices = [
    {name: 'tokens', type: 'int', minValue: 0, default: 100, label: 'Tokens'},
    {name: 'goal_description', type: 'str', minLength: 1, maxLength: 555, label: 'Goal Description'},
	{name: 'received_tokens', type: 'int', minValue: 0, default: 0, label: 'Already received tokens'}
];

// handlers
cb.onTip(function(tip) {
    current_goal_tipped += tip['amount']
    if (current_goal_tipped >= cb.settings.tokens) {
    	goalReached(tip['from_user']);
    }
    
	update_subject();   
    cb.drawPanel();
});


cb.onDrawPanel(function(user) {
	if (times_goal_reached == 0) {
			return {
			'template': '3_rows_of_labels',
			'row1_label': 'Autoreset Goal',
'row1_value': '' + ' [ ' + current_goal_tipped + ' to ' + cb.settings.tokens +  ' ] ',
			'row2_label': 'Goal reached by:',
			'row2_value': '' + times_goal_reached + ' times',
			
		};
	} else {
		return {
			'template': '3_rows_of_labels',
			'row1_label': 'Autoreset Goal',
'row1_value': '' + ' [ ' + current_goal_tipped + ' to ' + cb.settings.tokens  +  ' ] ',
			'row2_label': 'Goal reached by:',
			'row2_value': '' + times_goal_reached + ' times',
			
			
		};
	}
});

cb.onMessage(function (msg) {
	if (msg['m'][0] == '!') {
		if (msg['user'] == cb.room_slug) {
			if (startsWith(msg['m'], set_tokens_command)) {
				msg['X-Spam'] = true;

				var number = msg['m'].slice(set_tokens_command.length);
				times_goal_reached = Math.floor(number / cb.settings.tokens);
				current_goal_tipped = number % cb.settings.tokens;
				last_time_goal_reached = new Date();

				cb.drawPanel();

				cb.sendNotice('The tokens received has been updated!', msg['user']);
			} else if (startsWith(msg['m'], set_reached_command)) {
				msg['X-Spam'] = true;

				var number = msg['m'].slice(set_reached_command.length);
				times_goal_reached = number;
				last_time_goal_reached = new Date();
				current_goal_tipped = 0;

				cb.drawPanel();

				cb.sendNotice('The number of times reached has been updated!', msg['user']);
			} else if (startsWith(msg['m'], new_subject_command)) {
				msg['X-Spam'] = true;
				
				var new_sub = msg['m'].slice(new_subject_command.length+1);
				current_description = new_sub;
				update_subject();   
				cb.drawPanel();
			} else if (startsWith(msg['m'], help_command)) {
				msg['X-Spam'] = true;
				
				cb.sendNotice('Broadcaster can use following commands:', msg['user'], '#FF0000', '#FFFFFF', 'bolder');
				cb.sendNotice('', msg['user']);
				cb.sendNotice('!help', msg['user'], '', '', 'bold');
				cb.sendNotice('Display this notice only for the broadcaster.', msg['user']);
				cb.sendNotice('!status [your goal description here]', msg['user'], '', '', 'bold');
				cb.sendNotice('Change the goal description. The description will not be resetted after a new tip.', msg['user']);
				cb.sendNotice('!settok [Number of tokens]', msg['user'], '', '', 'bold');
				cb.sendNotice('Define how many tokens broadcaster has already received. Can be used when broadcaster decides to change the goal. Values "Hit Goal For" and "Received/Goal (Total)" will be updated on the panel.', msg['user']);
				cb.sendNotice('!setreached [Number of goals reached]', msg['user'], '', '', 'bold');
				cb.sendNotice('Define how many times goal was already reached. Can be used when broadcaster decides to change the goal. Values "Hit Goal For" and "Received/Goal (Total)" will be updated on the panel.', msg['user']);
			}
		}
	}
});

// Functions

function refresh() {
	cb.log("Refresh called");
	cb.setTimeout(refresh, 20000);
	cb.drawPanel();
}

function update_subject() {
    var new_subject_command = current_description +
        " [" + tips_remaining() + " tokens remaining]";
    cb.log("Changing subject to: " + new_subject_command);
    cb.changeRoomSubject(new_subject_command);
}

function goalReached(userName) {
	last_time_goal_reached = new Date();
	
	var curr_times_reached = Math.floor(current_goal_tipped / cb.settings.tokens);
	
	for (var i = 0; i < curr_times_reached; i++) {
		times_goal_reached++;
		current_goal_tipped -= cb.settings.tokens;
		if (userName != '') {
			cb.sendNotice("Goal was reached for the " + getNumberString(times_goal_reached) + " time!");
			cb.sendNotice('The user ' + userName + ' has reached the goal.', cb.room_slug, "#FEF9CD", "#1A1AD7", "bold");
		}
	}
}

function getNumberString(number) {
	var numberString = null;
	
	var lastChar = String(number).charAt(String(number).length - 1);

	if ((lastChar == '1') && ((number % 100) != 11)) {
		numberString = number + "st";
	} else if ((lastChar == '2') && ((number % 100) != 12)) {
		numberString = number + "nd";
	} else if ((lastChar == '3') && ((number % 100) != 13)) {
		numberString = number + "rd";
	} else {
		numberString = "" + number + "th";
	}
	
	return (numberString);
}

function tips_remaining() {
    var r = cb.settings.tokens - current_goal_tipped;
    if (r < 0) {
        return 0;
    } else {
        return r;
    }
}

function startsWith(source, str) {
	return source.substring(0, str.length) === str;
}

function init() {
	cb.sendNotice('Broadcaster can use following commands:', cb.room_slug, '#FF0000', '#FFFFFF', 'bolder');
	cb.sendNotice('', cb.room_slug);
	cb.sendNotice('!help', cb.room_slug, '', '', 'bold');
	cb.sendNotice('Display this notice only for the broadcaster.', cb.room_slug);
	cb.sendNotice('!status [your goal description here]', cb.room_slug, '', '', 'bold');
	cb.sendNotice('Change the goal description. The description will not be resetted after a new tip.', cb.room_slug);
	cb.sendNotice('!settok [Number of tokens]', cb.room_slug, '', '', 'bold');
	cb.sendNotice('Define how many tokens broadcaster has already received. Can be used when broadcaster decides to change the goal. Values "Hit Goal For" and "Received/Goal (Total)" will be updated on the panel.', cb.room_slug);
	cb.sendNotice('!setreached [Number of goals reached]', cb.room_slug, '', '', 'bold');
	cb.sendNotice('Define how many times goal was already reached. Can be used when broadcaster decides to change the goal. Values "Hit Goal For" and "Received/Goal (Total)" will be updated on the panel.', cb.room_slug);
	current_description = cb.settings.goal_description;
	current_goal_tipped = cb.settings.received_tokens;
	if (current_goal_tipped >= cb.settings.tokens) {
    	goalReached('');
    }
	cb.drawPanel();
    update_subject();
}

init();
cb.setTimeout(refresh, 20000);