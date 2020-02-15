// https://chaturbate.com/apps/user_uploads/1/admin/
// https://chaturbate.com/apps/user_uploads/2/admin/
// https://chaturbate.com/apps/user_uploads/3/admin/
// https://chaturbate.com/apps/sourcecode/pancam-bot/?version=385547&slot=3

cb.settings_choices = [{
    name: "tokens",
    label: "Tokens per Move",
    type: "int",
    minValue: 1,
    default: 1
}];
var usersWithControl = {};
var movesPerToken = 1/cb.settings.tokens
var instructions = "Type /l (pan left), /r (pan right), /i (zoom in), /o (zoom out), /u (tilt up), /d (tilt down)"

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
		cb.chatNotice(makeMovesSentence(user), user);
		cb.chatNotice(makeUserDirectSentence(user, movement["direction"]));
		return true;
	} else {
		cb.chatNotice(makeNoMovesSentence(), user)
		return false;
	}
}

cb.onMessage(function (msg) {
    "use strict";
		attemptCameraMove(msg.user, msg.m);
});

cb.onTip(function(tip) {
    "use strict";
    if (tip["amount"] > 0) {
        if (!(tip.from_user in usersWithControl)) {
            usersWithControl[tip.from_user] = 0;
        }
        usersWithControl[tip.from_user] += tip["amount"] * movesPerToken;
				if (!(attemptCameraMove(tip.from_user, tip.message))) {
					cb.chatNotice("You have " + currentOutstandingMoves() + " moves of the camera. " + instructions, tip.from_user);
				}
    }
});
