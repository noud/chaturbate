// https://chaturbate.com/littlemissmiarose/
// https://chaturbate.com/apps/sourcecode/test_app_mr/?version=370180&slot=0

// vars
var total_tipped = 0;
var high_tip_username = null;
var high_tip_amount = 0;
var last_tip_username = null;
var last_tip_amount = 0;
var subject_is_set_with_0 = false;

cb.settings_choices = [
    {name: 'tokens', type: 'int', minValue: 1, default: 100},
    {name: 'goal_description', type: 'str', minLength: 1, maxLength: 255}
];

// handlers
cb.onTip(function(tip) {
    total_tipped += tip['amount']
    if (total_tipped > cb.settings.tokens) {
        total_tipped = cb.settings.tokens;
    }
    update_subject();
    last_tip_amount = tip['amount']
    last_tip_username = tip['from_user']
    if (tip['amount'] > high_tip_amount) {
        high_tip_amount = tip['amount']
        high_tip_username = tip['from_user']
    }
    cb.drawPanel();
});


cb.onDrawPanel(function(user) {
    return {
        'template': '3_rows_of_labels',
        'row1_label': 'Tip Received / Goal :',
        'row1_value': '' + total_tipped + ' / ' + cb.settings.tokens,
        'row2_label': 'Highest Tip:',
        'row2_value': format_username(high_tip_username) + ' (' + high_tip_amount + ')',
        'row3_label': 'Latest Tip Received:',
        'row3_value': format_username(last_tip_username) + ' (' + last_tip_amount + ')'
    };
});


// helper functions
function update_subject() {
    if (tips_remaining() == 0) {
        if (subject_is_set_with_0) {
            return;
        }
        subject_is_set_with_0 = true;
    } else {
        subject_is_set_with_0 = false;
    }
    var new_subject = cb.settings.goal_description +
        " [" + tips_remaining() + " tokens remaining]";
    cb.log("Changing subject to: " + new_subject);
    cb.changeRoomSubject(new_subject);
}

function tips_remaining() {
    var r = cb.settings.tokens - total_tipped;
    if (r < 0) {
        return 0;
    } else {
        return r;
    }
}

function format_username(val) {
    if (val === null) {
        return "--";
    } else {
        return val.substring(0, 12);
    }
}

function init() {
    update_subject();
}

init();
