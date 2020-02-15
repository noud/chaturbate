// https://chaturbate.com/apps/user_uploads/1/admin/
// https://chaturbate.com/apps/user_uploads/2/admin/
// https://chaturbate.com/apps/user_uploads/3/admin/
// https://chaturbate.com/apps/sourcecode/pancam-auto-zoom-out/?version=&slot=3

cb.settings_choices = [
    {
        name: "tokens",
        label: "Minimum Tip to Move Cam",
        type: "int",
        minValue: 1,
        default: 5
    }, {
        name: "enableReset",
        label: "Zoom cam out after move",
        type: "choice",
        choice1: 'No',
        choice2: 'Yes', defaultValue: 'No'
    }, {
        name: "reset",
        label: "Seconds until zoom out after last move",
        type: "int",
        minValue: 1,
        default: 30
    }
];

var msg = "Select cam movement (" + cb.settings.tokens + " tokens)";

cb.tipOptions(function (user) {
    "use strict";
    return {options: [{label: "Zoom in"}, {label: "Zoom out"},{label: "Tilt camera up"}, {label: "Pan camera left"}, {label: "Pan camera right"}, {label: "Tilt camera down"}], label: msg};
});

function zoomOut() {
    "use strict";
    cb.panCam_move("out");
}

var tips = 0;

cb.onTip(function (tip) {
    "use strict";
    if (tip.amount < cb.settings.tokens) {
        return;
    }
    var direction = tip.message.split(" ").slice(-1)[0];
    if (!cb.panCam_isValidDirection(direction)) {
        return;
    }
    cb.chatNotice(tip.from_user + " moved camera " + direction +"!")
    cb.panCam_move(direction);
    tips += tip.amount;
    var tipsWhenStarted = tips;
    if (cb.settings.enableReset == 'Yes'){
        setTimeout(function () {
            if (tipsWhenStarted != tips) {
                return;
            } else {
                zoomOut();
            }
        }, cb.settings.reset * 1000);
    }
});
