// https://chaturbate.com/apps/user_uploads/2/transfat/
// https://chaturbate.com/apps/sourcecode/wheel-of-fortune-parsimonious/?version=&slot=2

// Wheel Of Fortune!
// Parsimonious version by TransFat
// (now with more changes than just parsimony)
// based on the original by SweetDann

cb.settings_choices = [
    {name:'cost_per_spin', type:'int', minValue:1, maxValue:999, defaultValue:25, label: 'Cost Per Spin Of The Wheel (1-999): '},
    {name:'advertise_in_chat', type:'int', minValue:1, maxValue:999, defaultValue:10, label: 'How Often To Advertise The Plugin: (min)'},
    {name:'pos1', type:'str', minLength: 1, maxLength: 255, label: 'Reward #1 '},
    {name:'pos2', type:'str', minLength: 1, maxLength: 255, label: 'Reward #2 '},
    {name:'pos3', type:'str', minLength: 1, maxLength: 255, label: 'Reward #3 '},
    {name:'pos4', type:'str', minLength: 0, maxLength: 255, label: 'Reward #4 ', required: false},
    {name:'pos5', type:'str', minLength: 0, maxLength: 255, label: 'Reward #5 ', required: false},
    {name:'pos6', type:'str', minLength: 0, maxLength: 255, label: 'Reward #6 ', required: false},
    {name:'pos7', type:'str', minLength: 0, maxLength: 255, label: 'Reward #7 ', required: false},
    {name:'pos8', type:'str', minLength: 0, maxLength: 255, label: 'Reward #8 ', required: false},
    {name:'pos9', type:'str', minLength: 0, maxLength: 255, label: 'Reward #9 ', required: false},
    {name:'pos10', type:'str', minLength: 0, maxLength: 255, label: 'Reward #10 ', required: false},
];

var total_tipped = 0;
var reminderCount = 100;
var temp = new Array(cb.settings.pos1,cb.settings.pos2,cb.settings.pos3,cb.settings.pos4,cb.settings.pos5,cb.settings.pos6,cb.settings.pos7,cb.settings.pos8,cb.settings.pos9,cb.settings.pos10);
var rewards = new Array();

for(var i = 0; i<temp.length; i++) {
	if(temp[i] != '')
	{
		rewards.push(temp[i]);
	}
}


cb.chatNotice('Wheel of Fortune, modified by @TransFat from the original by @SweetDann.');

function spinWheel() {
	var randomnumber = Math.floor(Math.random()*(rewards.length));
	cb.chatNotice('The wheel stops on: '  + rewards[randomnumber] + '.');
}

cb.onTip(function (tip) {
	if(tip['amount'] == cb.settings.cost_per_spin)
	{
		spinWheel();
	}
	
	total_tipped += parseInt(tip['amount']);
	cb.drawPanel();
});




cb.onMessage(function (msg) {
    var userName = msg['user'];
    if(msg['m'] == '/rewards')
    {
	for(var x = 0; x < rewards.length; x++) {
		cb.chatNotice('Reward ' + x + ': ' + rewards[x], userName);
	}
    }
    return msg;
});

cb.onDrawPanel(function(user) {
    return {
        'template': '3_rows_of_labels',
        'row1_label': 'Total Tips: ',
        'row1_value': total_tipped,
        'row2_label': 'Spin Cost: ',
        'row2_value': cb.settings.cost_per_spin + ' tokens.',
    };
});



function advert() {
    cb.chatNotice('Wheel of Fortune is active! Tip ' + cb.settings.cost_per_spin + ' to play! Type \'/rewards\' to get a wheel reward listing.');
    cb.setTimeout(advert, (cb.settings.advertise_in_chat * 60000));
}

cb.setTimeout(advert, (cb.settings.advertise_in_chat * 60000));
