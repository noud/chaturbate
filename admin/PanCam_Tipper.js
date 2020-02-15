// https://chaturbate.com/apps/user_uploads/0/admin/
// https://chaturbate.com/apps/sourcecode/pancam-tipper/?version=&slot=0

cb.settings_choices = [{
    name: "moves",
    label: "Move per",
    type: "int",
    minValue: 1,
    default: 1
}, {
    name: "tokens",
    label: "Tokens per Move",
    type: "int",
    minValue: 1,
    default: 1
}];
var usersWithControl = {};
var movesPerToken = cb.settings.moves/cb.settings.tokens

function parseUserMessage(message) {
    "use strict";
	var directions = {
		"/l": "left",
		"/r": "right",
		"/u": "up",
		"/d": "down",
		"/i": "in",
		"/o": "out",
	};
	var m = message.slice(0,2);
	if (m in directions) {
		var movement = {}
		movement["direction"] = directions[m];
		return movement;
	} else {
		return null;
	}
}

function makeMovesSentence(user) {
    "use strict";
		var count;
		if (user in usersWithControl) {
			count = Math.floor(usersWithControl[user]);
		} else {
			count = 0;
		}
		var moves = (count == 1) ? " move " : " moves ";
		return "You have " + count  + moves + "remaining."
}

function makeUserDirectSentence(user, direction) {
    "use strict";
		return user + " has moved the camera " + direction + "."
}

function makeMoveCountSentence() {
    "use strict";
	return currentOutstandingMoves() + " moves are outstanding."
}

function makeNoMovesSentence() {
	"use strict";
	return "You have no moves.  Tip to purchase moves."
}

function hasMove(user) {
    "use strict";
    if (user in usersWithControl) {
    		return usersWithControl[user] >= 1;
    } else {
    	return false;
    }
}

function changeUserMoves(user) {
    "use strict";
    if (user in usersWithControl) {
    		usersWithControl[user] -= 1;
        if (usersWithControl[user] <= 0) {
    				delete usersWithControl[user];
        }
    }
}

function currentOutstandingMoves() {
    "use strict";
	var count = 0;
	for (var u in usersWithControl) {
		count += Math.floor(usersWithControl[u]);
	}
	return count
}

function attemptCameraMove(user, message) {
    "use strict";
	var movement = parseUserMessage(message);
	if (movement == null) {
		return false;
	}
	if (user == cb.room_slug) {
		cb.panCam_move(movement["direction"]);
		return true;
	} else if (hasMove(user)) {
		changeUserMoves(user);
		cb.panCam_move(movement["direction"]);
		cb.sendNotice(makeMovesSentence(user), user);
		cb.sendNotice(makeUserDirectSentence(user, movement["direction"]));
		return true;
	} else {
		cb.sendNotice(makeNoMovesSentence(), user)
		return false;
	}
}

cb.onMessage(function (msg) {
    "use strict";
		attemptCameraMove(msg.user, msg.m);
		cb.drawPanel();
});

cb.onTip(function(tip) {
    "use strict";
    if (tip["amount"] > 0) {
        if (!(tip.from_user in usersWithControl)) {
            usersWithControl[tip.from_user] = 0;
        }
        usersWithControl[tip.from_user] += tip["amount"] * movesPerToken;
				attemptCameraMove(tip.from_user, tip.message);
				cb.drawPanel();
    }
});

cb.panCam_onPanelButtonClicked( function(pancamOnMoveInfo) {
    "use strict";
		if (pancamOnMoveInfo.user == cb.room_slug) {
			cb.panCam_move(pancamOnMoveInfo.direction);
		} else if (hasMove(pancamOnMoveInfo.user)) {
			cb.panCam_move(pancamOnMoveInfo.direction);
			changeUserMoves(pancamOnMoveInfo.user);
			cb.chatNotice(makeUserDirectSentence(pancamOnMoveInfo.user, pancamOnMoveInfo.direction));
			cb.sendNotice(makeMovesSentence(pancamOnMoveInfo.user), pancamOnMoveInfo.user);
			cb.drawPanel();
		} else {
			cb.sendNotice(makeNoMovesSentence(), pancamOnMoveInfo.user);
		}
		return;
});

cb.onDrawPanel( function(userData) {
    "use strict";
		if (userData.user == cb.room_slug) {
			return {
        "template": "3_rows_11_21_31",
        "row1_value": makeMoveCountSentence(),
        "row2_value": "Current exchange " + movesPerToken + " moves per token.",
        "row3_value": cb.panCam_controlsEnabled,
        "room_slug": "" + cb.room_slug
			};
		} else if (hasMove(userData.user)) {
			var sentence;
			if (hasMove(userData.user)) {
				sentence = makeMovesSentence(userData.user);
			} else if (hasMove(userData.user)) {
				sentence = "Tip to control of the camera";
			}
    	return {
        "template": "3_rows_11_21_31",
        "row1_value": sentence,
        "row2_value": "Receive " + movesPerToken + " moves per token.",
        "row3_value": cb.panCam_controlsEnabled,
        "room_slug": "" + cb.room_slug
    	};
		} else {
			return {
        "template": "3_rows_11_21_31",
        "row1_value": "Tip to control of the camera",
        "row2_value": "Receive " + movesPerToken + " moves per token.",
        "row3_value": cb.panCam_controlsDisabled,
        "intensity": "" + cb.settings.intensity,
        "room_slug": "" + cb.room_slug
    	};
		}
});
