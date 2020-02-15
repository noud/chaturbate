// https://chaturbate.com/apps/user_uploads/0/admin/
// https://chaturbate.com/apps/sourcecode/pancam-tip-jar-app/?version=&slot=0

var applicationName = "PanCam Tip Jar App";
cb.settings_choices = [
    {
        name: "secondsBetweenDrain",
        label: "Tip jar drain seconds.",
        type: "int",
        minValue: 1,
        default: 1
    },
    {
        name: "numOfTokensToDrain",
        label: "Number of tokens to drain.",
        type: "int",
        minValue: 1,
        default: 1
    },
    {
        name: "tokens",
        label: "Token cost to earn moves.",
        type: "int",
        minValue: 1,
        default: 1
    },
    {
        name: "moves",
        label: "Moves earned per token(s)",
        type: "int",
        minValue: 1,
        default: 1
    },
    {
        name: "panCamBackgroundMessageColor",
        label: "PanCam Move message background color.",
        type: "str",
        default: "A474F0"
    }
];
var usersWithControl = {};
var movesPerToken = cb.settings.moves / cb.settings.tokens;
var hasTip = false;
var tokens = 0;
var secondsBetweenDrain = cb.settings.secondsBetweenDrain * 1000; // number of seconds to drain the jar
var zoomCount = 0;

var appNoticeMessage =  "This room is running " + applicationName + "."
                        + " Tip to fill the jar while earning PanCam moves."
                        + " Keep the jar full to keep control of PanCam."
                        + " When the jar empties, PanCam control will be lost and zoom out.!";

function sendAppNotice(username) {
    if (username === "") {
        cb.sendNotice(appNoticeMessage, "", "#00DBFF");
    } else {
        cb.sendNotice(appNoticeMessage, username, "#00DBFF");
    }
}
sendAppNotice("");

cb.onEnter(function(user) {
    sendAppNotice(user.user);
});

function hasMove(user) {
    if (user in usersWithControl) {
        return usersWithControl[user] >= 1;
    } else {
        return false;
    }
}

function decrementUserMoves(user) {
    if (user in usersWithControl) {
        usersWithControl[user] -= 1;
        if (usersWithControl[user] <= 0) {
            delete usersWithControl[user];
        }
    }
}

cb.panCam_onPanelButtonClicked(function (pancamOnMoveInfo) {
    if (pancamOnMoveInfo.user === cb.room_slug) {
        cb.panCam_move(pancamOnMoveInfo.direction);
    } else if (hasMove(pancamOnMoveInfo.user)) {
        cb.panCam_move(pancamOnMoveInfo.direction);
        decrementUserMoves(pancamOnMoveInfo.user);
        cb.sendNotice(pancamOnMoveInfo.user + " moved the PanCam " + pancamOnMoveInfo.direction + ".", "", "#" + cb.settings.panCamBackgroundMessageColor);
        cb.drawPanel();
    }
    return;
});

function secondRowSubject() {
    var pancamMoveText = "move";
    if (cb.settings.moves > 1) {
        pancamMoveText = "moves"
    }
    var tokenText = " per token";
    if (cb.settings.tokens > 1) {
        tokenText = " per " + cb.settings.tokens + " tokens";
    }
    return "Earn " + cb.settings.moves + " PanCam " + pancamMoveText + tokenText
}

function currentNumOfMoves(user) {
    if (user in usersWithControl) {
        return usersWithControl[user];
    }
    return 0;
}

function tipJarCountSentence() {
    if (tokens === 0) {
        return "Keep the jar full";
    }
    return tokens + " tokens left untill the jar is empty!";
}

// get number of tokens from the cb.onTip();
function zoomPanCamOutNoTokens() {
    if (!hasTip && zoomCount > 0) {
        cb.panCam_move("out");
        zoomCount--;
        cb.setTimeout(zoomPanCamOutNoTokens, 1000);
    }
}

cb.onTip(function (data) {
    tokens += data.amount;
    hasTip = true;
    var movesEarned = Math.floor(data.amount * movesPerToken);
    if (data.from_user in usersWithControl) {
        usersWithControl[data.from_user] += movesEarned;
    } else {
        usersWithControl[data.from_user] = movesEarned;
    }
    cb.drawPanel();

    // Notify the tipper the number of panCam moves earned and currently own.
    var tipperTotalMoves = currentNumOfMoves(data.from_user);
    cb.sendNotice(movesEarned + " PanCam moves earned. " + "Remaining moves: " + tipperTotalMoves + ".", data.from_user, "#00FF00");

    // Notify the broadcaster who has tipped and how many moves they earned.
    cb.sendNotice(data.from_user + " earned: " + movesEarned + " moves. Total pending moves for " + data.from_user + ": " + tipperTotalMoves + ".", data.to_user, "#00FF00");
});

function emptyTheJar() {
    if (tokens > 0) {
        tokens = Math.max(tokens - cb.settings.numOfTokensToDrain, 0);
        cb.drawPanel()
    } else {
        // Remove all user controls
        usersWithControl = {};
        if (hasTip) {
            hasTip = false;
            zoomCount = 10;
            cb.drawPanel();
            zoomPanCamOutNoTokens();
        }
    }
    cb.setTimeout(emptyTheJar, secondsBetweenDrain);
}

cb.onDrawPanel(function (userData) {
    var panelTemplate = {
        "template": "3_rows_11_21_31",
        "row1_value": tipJarCountSentence(),
        "row2_value": secondRowSubject(),
        "room_slug": "" + cb.room_slug
    };
    cb.sendNotice(hasMove(userData.user), [userData.user]);
    if (userData.user === cb.room_slug || hasMove(userData.user)) {
        panelTemplate["row3_value"] = cb.panCam_controlsEnabled;
    } else {
        cb.sendNotice(hasMove(userData.user), [userData.user]);
        panelTemplate["row3_value"] = cb.panCam_controlsDisabled;

    }
    return panelTemplate;
});

emptyTheJar();
