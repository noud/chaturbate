// https://chaturbate.com/apps/user_uploads/0/admin/
// https://chaturbate.com/apps/sourcecode/vote-with-tips/?version=&slot=0

var total_tipped = 0;


cb.settings_choices = [
    {name:'goal_tokens', type:'int', minValue:1, maxValue:99999, default:500},
    {name:'choice_1', type:'str', maxLength: 200},
    {name:'choice_2', type:'str', maxLength: 200},
    {name:'choice_3', type:'str', maxLength: 200, required: false},
    {name:'choice_4', type:'str', maxLength: 200, required: false},
    {name:'choice_5', type:'str', maxLength: 200, required: false}
];


cb.tipOptions(function(user) {
    var options = [];
    for (var i=0; i < all_choices().length; i++) {
        options.push({label:all_choices()[i]});
    }
    return {options:options, label:"Vote for next goal:"};
});


cb.onDrawPanel(function (user) {
    var top_goal_display = '--';
    if (goal_tracker.top_goal) {
        top_goal_display = goal_tracker.top_goal.choice;
    }
    return {
        'template':'3_rows_12_22_31',
        'row1_label':'Tip Received / Goal:',
        'row1_value':'' + total_tipped + ' / ' + cb.settings.goal_tokens,
        'row2_label':'Top Goal:',
        'row2_value':top_goal_display,
        'row3_value':'Tip to vote for the goal, /stats for more info'
    };
});


var _all_choices_cache = null;
function all_choices() {
    if (_all_choices_cache) {
        return _all_choices_cache;
    }
    var choices = [];
    for (var i=0; i < 5; i++) {
        var name = 'choice_' + i;
        if (cb.settings[name]) {
            choices.push(cb.settings[name]);
        }
    }
    _all_choices_cache = choices;
    return choices;
}


var goal_tracker = {
    _data:[],
    top_goal: null,
    init:function() {
        for (var i=0; i < all_choices().length; i++) {
            goal_tracker.track_tip(0, all_choices()[i]);
        }
    },
    track_tip:function(tip_amount, choice) {
        var found = false;
        for (var i=0; i < goal_tracker._data.length; i++) {
            if (goal_tracker._data[i].choice == choice) {
                goal_tracker._data[i].amount_tipped += tip_amount;
                found = true;
            }
        }
        if (!found) {
            goal_tracker._data.push({
                choice:choice,
                amount_tipped:tip_amount
            });
        }
        goal_tracker._update_top_goal();
    },
    _update_top_goal:function() {
        if (goal_tracker._data.length == 0) {
            return;
        }
        goal_tracker._data.sort(function(a,b) { return b.amount_tipped - a.amount_tipped });
        if (goal_tracker._data[0].amount_tipped > 0) {
            goal_tracker.top_goal = goal_tracker._data[0];
        }
    },
    send_stats:function(user) {
        var msg = "Goal stats: ";
        for (var i=0; i < goal_tracker._data.length; i++) {
            if (i > 0) { msg += ", "; }
            msg += goal_tracker._data[i].choice + " (+" + goal_tracker._data[i].amount_tipped + ")";
        }
        cb.chatNotice(msg, user);
    }
};
goal_tracker.init();


cb.onTip(function(tip) {
    total_tipped += tip['amount']
    for (var i=0; i < all_choices().length; i++) {
        if (all_choices()[i] == tip['message']) {
            goal_tracker.track_tip(tip['amount'], tip['message']);
        }
    }
    cb.drawPanel();
    update_subject();
});


function tips_remaining() {
    var r = cb.settings.goal_tokens - total_tipped;
    if (r < 0) {
        return 0;
    } else {
        return r;
    }
}


var _subject_set_with_0 = false;
function update_subject() {
    if (tips_remaining() == 0) {
        if (subject_is_set_with_0) {
            return;
        }
        subject_is_set_with_0 = true;
    } else {
        subject_is_set_with_0 = false;
    }
    if (goal_tracker.top_goal) {
        var goal = goal_tracker.top_goal.choice;
    } else {
        var goal = '--not set--';
    }
    var new_subject = "Top goal: " + goal +
        " [" + tips_remaining() + " tokens remaining]";
    cb.changeRoomSubject(new_subject);
}
update_subject();


cb.onMessage(function (msg) {
    if (msg['m'] == '/stats') {
        msg['X-Spam'] = true;
        goal_tracker.send_stats(msg['user']);
    }
    return msg;
});
