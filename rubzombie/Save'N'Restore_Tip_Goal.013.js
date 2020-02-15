
// new handlers



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
