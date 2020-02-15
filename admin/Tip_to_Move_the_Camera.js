// https://chaturbate.com/apps/user_uploads/0/admin/
// https://chaturbate.com/apps/sourcecode/tip-to-move-the-camera/?version=&slot=0

//Each tip gives user one move of the camera
var usersWithControl = [];

cb.settings_choices = [{
    name: "tokens",
    label: "Tokens per Move",
    type: "int",
    minValue: 1,
    default: 3
}];

cb.onTip(function(tip) {
    "use strict";
    if (tip["amount"] >= cb.settings.tokens) {
        usersWithControl.push(tip.from_user)
        cb.chatNotice("Use control panel to move camera", tip.from_user);
        cb.drawPanel(tip.from_user);
    }
});

function hasMove(user) {
    "use strict";
    return cbjs.arrayContains(usersWithControl, user);
}

function removeMove(user) {
    "use strict";
    var index = null;
    index = usersWithControl.indexOf(user);
    if (index >= 0) {
        usersWithControl.splice(index, 1);
    }
}

cb.panCam_onPanelButtonClicked(function(pancamOnMoveInfo) {
    "use strict";
    if (pancamOnMoveInfo.user == cb.room_slug) {
        cb.panCam_move(pancamOnMoveInfo.direction);
    } else if (hasMove(pancamOnMoveInfo.user)) {
        cb.panCam_move(pancamOnMoveInfo.direction);
        removeMove(pancamOnMoveInfo.user);
        cb.drawPanel(pancamOnMoveInfo.user);
        cb.sendNotice(pancamOnMoveInfo.user + " moved camera " + pancamOnMoveInfo.direction + ".");
    }
    return;
});

cb.onDrawPanel( function(userData) {
    "use strict";
    if ((hasMove(userData.user)) || (userData.user == cb.room_slug)) {
        return {
            "template": "3_rows_11_21_31",
            "row1_value": "You have control of the camera",
            "row2_value": "Tip " + cb.settings.tokens + " tokens for additional moves",
            "row3_value": cb.panCam_controlsEnabled,
            "room_slug": "" + cb.room_slug
        };
    } else {
        return {
            "template": "3_rows_11_21_31",
            "row1_value": "Tip " + cb.settings.tokens + " tokens to control cam",
            "row2_value": "",
            "row3_value": cb.panCam_controlsDisabled,
            "room_slug": "" + cb.room_slug
        };
    }
});
