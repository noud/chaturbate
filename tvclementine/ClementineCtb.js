// https://hi.chaturbate.com/apps/user_uploads/0/tvclementine/
// https://hi.chaturbate.com/apps/sourcecode/clementinectb-2/?version=&slot=0

// Author: beaglefarm

// CONST
var UPDATE_FREQ = 15;

// vars
var current_tips = 0;
var seconds_left = 0;
var tick_count = 0;
var last_event_label = "";
var last_event_value = "";

cb.settings_choices = [
    {name:'seconds_per_token', type:'int',
        minValue:1, maxValue:100, defaultValue:2, label: "How many seconds cam is unhidden per token"},
    {name:'tokens_to_unhide_cam', type:'int',
        minValue:1, maxValue:1000, defaultValue:50, label: "How many tokens to start show"},
    {name:'subject', type:'str',
        minLength:1, maxLength:255, label: "Subject (will appear before tipping instructions)"}
];

cb.onTip(function(tip) {
    current_tips += parseInt(tip['amount']);
    seconds_left += parseInt(tip['amount']) * cb.settings.seconds_per_token;
    if (cb.limitCam_isRunning() && current_tips >= cb.settings.tokens_to_unhide_cam) {
        last_event_label = tip['from_user'];
        last_event_value = 'started the show!';
        startShow();
    } else if (!cb.limitCam_isRunning()) {
        last_event_label = tip['from_user'];
        last_event_value = 'added ' + timeString(parseInt(tip['amount']) * cb.settings.seconds_per_token);

    }
        
    cb.drawPanel();
});

cb.onDrawPanel(function(user) {
    return {
        'template': '3_rows_of_labels',
        'row1_label': 'Tokens needed:',
        'row1_value': tokensNeeded() + ' / ' + cb.settings.tokens_to_unhide_cam,
        'row2_label': 'Time remaining:',
        'row2_value': timeRemaining(),
        'row3_label': last_event_label,
        'row3_value': last_event_value
    };
});

function tokensNeeded() {
    if (current_tips >= cb.settings.tokens_to_unhide_cam) {
        return cb.settings.tokens_to_unhide_cam;
    } else {
        return current_tips;
    }
}

function timeString(total_seconds) {
    var minutes = ("00" + Math.floor(total_seconds / 60)).slice(-2);
    var seconds = ("00" + total_seconds % 60).slice(-2); 
    return minutes + ":" + seconds;
}

function timeRemaining() {
    if (!cb.limitCam_isRunning()) {
        return timeString(seconds_left);
    } else {
        return "Show hidden!";
    }
}

function startShow() {
    cb.changeRoomSubject(cb.settings.subject + ' The show has started!  Each token adds another ' + cb.settings.seconds_per_token + ' seconds to the show!  Don\'t let the timer run out, or the show will be hidden!');
    cb.limitCam_stop();
    cb.setTimeout(tick, 1000);
    cb.drawPanel();
}

function stopShow() {
    seconds_left = 0;
    current_tips = 0;
    last_event_label = "";
    last_event_value = "";
    cb.changeRoomSubject(cb.settings.subject + ' ' + cb.settings.tokens_to_unhide_cam + ' tokens needed to start show!');
    if (!cb.limitCam_isRunning()) {
        cb.limitCam_start(cb.settings.tokens_to_unhide_cam + ' tokens needed to start show!');
    }
    cb.drawPanel();
}

function updatePanel() {
    tick_count++;
    if (tick_count % UPDATE_FREQ == 0) {
        cb.drawPanel();
    }
}

function tick() {
    updatePanel();
    seconds_left--;
    if (seconds_left <= 0) {
        stopShow();
    } else {
        cb.setTimeout(tick, 1000);
    }
}

function init() {
    stopShow();
}

function output(msg) {
    cb.sendNotice(msg, "", "#ff69b4", "#000000");
}

init();
