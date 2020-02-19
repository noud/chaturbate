// JacketAdmin was developed by JacketTrap
// I have no real industry experience with JavaScript as I'm not a webdesigner so
// there may be some problems with this code-wise and it may just ~not work~
// every now and then, my solution to this just restart the app

var broadcaster = cb.room_slug;
var command;
var canChat = [broadcaster];
var canWatch = [broadcaster];
var userTips = [];
var allUsers = [];

var totalKing = ["no-one", 0];
var singleKing = ["no-one", 0];
var roomGoal;
var roomGoalLeft;

var roomMode;

var row1L = "Mode:";
var row1V = "No Mode Selected";
var row2L = "App Author:";
var row2V = "JacketTrap";
var row3L = "Special Thanks to:";
var row3V = "#r.gonewildcd";

var roomSubject;




cb.settings_choices = [
			{name:'block_grey_chat', type:'choice',
				choice1:"No",
				choice2:"Yes", defaultValue:"No", label: "Block greys from chatting?"},
			{name:'block_grey_viewing', type:'choice',
				choice1:"No",
				choice2:"Yes", defaultValue:"No", label: "Block greys from viewing?"},
			{name:'welcome_message', type: "str", minLength: 1, maxLength: 255, defaultValue:"Welcome to my room!", label: "Message this to people when they join the room"}
			];

var msInSec = 1000;
var secInMin = msInSec*60;

if (cb.settings.block_grey_viewing == "Yes" && !cb.limitCam_isRunning())
{
	cb.limitCam_start("This model does not allow grey users to see their cam, Buy some tokens and fap!", canWatch)
}
else if (cb.settings.block_grey_viewing == "No" && !cb.limitCam_isRunning())
{
	cb.limitCam_stop()
}

function hasRights(user)
{
	if (user['user'] == broadcaster || user['is_mod'] == true)
	{
		return true;
	}
}

function repeatMessage(message, seconds)
{
	cb.chatNotice(message);
	cb.setTimeout(repeatMessage, seconds);
}

cb.onEnter(function(user) {
    cb.chatNotice(cb.settings.welcome_message, user['user']);
	if (!cbjs.arrayContains(canChat, user['user']) && !cbjs.arrayContains(canWatch, user['user']) && user['has_tokens'])
	{
		canChat.push(user['user']);
		canWatch.push(user['user']);
		if (!cbjs.arrayContains(cb.limitCam_allUsersWithAccess(), user['user']))
		{
			cb.limitCam_addUsers([user['user']]);
		}
	}
	
	if (!cbjs.arrayContains(allUsers, user['user']))
	{
		allUsers.push(user['user']);
		allUsers[user['user']] = 0;
	}
});

cb.onTip(function (tip) {
	
	if (!cbjs.arrayContains(allUsers, tip['from_user']))
	{
		allUsers.push(tip['from_user']);
		allUsers[tip['from_user']] = 0;
	}
	
	if (!cbjs.arrayContains(canChat, tip['from_user']) && !cbjs.arrayContains(canWatch, tip['from_user']))
	{
		canChat.push(tip['from_user']);
		canWatch.push(tip['from_user']);
		if (!cbjs.arrayContains(cb.limitCam_allUsersWithAccess(), tip['from_user']))
		{
			cb.limitCam_addUsers([tip['from_user']]);
		}
		
	}
	if (roomMode == "Goal King")
	{
		allUsers[tip['from_user']] = allUsers[tip['from_user']] + tip['amount'];
		
		if (tip['amount'] > singleKing[1])
		{
			cb.sendNotice(tip['from_user'] + " beat the last Single Tip King!");
			singleKing = [tip['from_user'], tip['amount']];
			row2V = (tip['from_user'] + " (" + String(tip['amount']) + ")");
			
		}
		
		if (allUsers[tip['from_user']] > totalKing[1])
		{
			if (tip['from_user'] != totalKing[0])
			{
				cb.sendNotice(tip['from_user'] + " is the new Total Tip King!");
			}
			totalKing = [tip['from_user'], allUsers[tip['from_user']]];
			row3V = (tip['from_user'] + " (" + String(totalKing[1]) + ")");
		}
		
		roomGoalLeft = roomGoalLeft - tip['amount'];
		if (roomGoalLeft <= 0)
		{
			cb.sendNotice("Goal was reached thanks to " + tip['from_user'] + "! Restarting goal!");
			roomGoalLeft = roomGoal;
		}
		cb.changeRoomSubject(roomSubject + " [" + roomGoalLeft + " to go!]");		
		
		cb.drawPanel();
	}
});

cb.onDrawPanel(function(user) {
    return {
        'template': '3_rows_of_labels',
        'row1_label': row1L,
        'row1_value': row1V,
        'row2_label': row2L,
        'row2_value': row2V,
        'row3_label': row3L,
        'row3_value': row3V
    };
});


cb.onMessage(function (msg) 
{
	if (hasRights(msg))
	{
		if (msg['m'].charAt(0) == "/")
		{
			var command = msg['m'].split(" ");
			if (command[0] == "/subject")
			{
				command.splice(0,1);
				cb.changeRoomSubject(command.join(" "));
			}
			else if (command[0] == "/add")
			{
				canChat.push(command[1]);
				canWatch.push(command[1]);
				if (!cbjs.arrayContains(cb.limitCam_allUsersWithAccess(), command[1]))
				{
					cb.limitCam_addUsers([command[1]]);
				}
			}
			else if (command[0] == "/goalking")
			{
				roomGoal = Number(command[1]);
				roomGoalLeft = roomGoal;
				command.splice(0,2);
				roomSubject = command.join(" ")
				cb.changeRoomSubject(roomSubject + " [" + roomGoalLeft + " to go!]");
				row1V = "Goal King";
				if (roomMode != "Goal King")
				{
					row2L = "Highest Single Tip: ";
					row2V = "No-one :C";
					row3L = "Highest Total Tips: ";
					row3V = "No-one :C";
				}
				roomMode = "Goal King";
				cb.drawPanel()
			}

		}
	}

    if (msg['gender'] == "m")
	{
		msg['background'] = '#CCFFFF';
	}
	else if(msg['gender'] == "f")
	{
		msg['background'] = '#FFE4E1';
	}
	else if(msg['gender'] == "s")
	{
		msg['background'] = '#E6E6FA';
	}
	else if(msg['gender'] == "c")
	{
		msg['background'] = '#FFE4C4';
	}
	//cb.chatNotice(cb.settings.block_grey_chat)
	
	if (!cbjs.arrayContains(canChat, msg['user']) && cb.settings.block_grey_chat == "Yes")
	{
		if (msg['has_tokens'] == false)
		{
			cb.chatNotice("This models room currently does not allow grey users to chat, Buy some tokens and chat!", msg['user']);
			msg['X-Spam'] = true;
		}
		else
		{
			canChat.push(msg['user']);
			canWatch.push(msg['user']);
			if (!cbjs.arrayContains(cb.limitCam_allUsersWithAccess(), msg['user']))
			{
				cb.limitCam_addUsers([msg['user']]);
			}
		}
			
	}

	return msg;
});
