// https://chaturbate.com/apps/user_uploads/0/__your_dream__/
// https://chaturbate.com/apps/sourcecode/-19/?version=&slot=0

// vars
var total_tipped = 0;
var high_tip_username = null;
var high_tip_amount = 0;
var last_tip_username = null;
var last_tip_amount = 0;

cb.settings_choices = [
];

// handlers
cb.onTip(function(tip) {
    total_tipped += tip['amount']
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
        'row1_label': 'Welcome Guys',
        'row2_label': 'Highest Tip:',
        'row2_value': format_username(high_tip_username) + ' (' + high_tip_amount + ')',
        'row3_label': 'Latest Tip:',
        'row3_value': format_username(last_tip_username) + ' (' + last_tip_amount + ')'
    };
});

function format_username(val) {
    if (val === null) {
        return "--";
    } else {
        return val.substring(0, 12);
    }
}
