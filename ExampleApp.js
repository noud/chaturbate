// https://www.makemoneyadultcontent.com/become-chaturbate-model/
// https://www.dmca.com/faq/How-do-I-add-the-DMCA-logo-in-front-of-my-chaturbate-video-Broadcast

// https://perseus1967cb.tumblr.com/post/150544491430/apps-bots-on-chaturbate

// https://chaturbate.com/apps/bot/3/
// https://free-cams.xyz/apps/bot/2/
// https://chaturbate.com/apps/

// https://chaturbate.com/apps/docs/index.html
// https://chaturbate.com/apps/docs/api/cb.panCam.html#example-app

// https://www.logitech.com/en-us/product/conferencecam-bcc950
// https://support.logitech.com/en_us/product/webcam-ptz-pro-business

// https://yyanx.github.io/CB-TestBed/
// https://chaturbate.com/apps/docs/testbed.html

// https://github.com/chaturbatecom
// https://github.com/paulallen87/chaturbate-overlay-app

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
    if (tip["amount"] === cb.settings.tokens) {
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

cb.panCam_onPanelButtonClicked(function(panCamPanelClicked) {
    "use strict";
    if (panCamPanelClicked.user === cb.room_slug){
        cb.panCam_move(panCamPanelClicked.direction);
        return;
    } else if (hasMove(panCamPanelClicked.user)) {
        removeMove(panCamPanelClicked.user);
        cb.panCam_move(panCamPanelClicked.direction);
        cb.drawPanel(panCamPanelClicked.user);
        cb.sendNotice(panCamPanelClicked.user + " moved camera " + panCamPanelClicked.direction + ".");
        return;
    }
    return;
});

cb.onDrawPanel( function(userData) {
    "use strict";
    if ((hasMove(userData.user)) || (userData.user === cb.room_slug)) {
        return {
            "template": "3_rows_12_21_31",
            "row1_label": "PanCam Enabled",
            "row1_value": "",
            "row2_value": "You have control of the camera",
            "row3_value": cb.panCam_controlsEnabled,
            "room_slug": "" + cb.room_slug
        };
    } else {
        return {
            "template": "3_rows_12_21_31",
            "row1_label": "Tip " + cb.settings.tokens + " token(s) to control cam",
            "row1_value": "",
            "row2_value": "",
            "row3_value": cb.panCam_controlsDisabled,
        };
    }
});
