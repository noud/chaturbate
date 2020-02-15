// https://chaturbate.com/apps/user_uploads/2/sweetdann/
// https://chaturbate.com/apps/sourcecode/wheel-of-fortune-bot/?version=&slot=2

// Wheel Of Fortune!
// by SweetDann

cb.settings_choices = [
    {name:'cost_per_spin', type:'int', minValue:1, maxValue:999, defaultValue:25, label: 'Cost Per Spin Of The Wheel (1-999): '},
    {name:'advertise_in_chat', type:'int', minValue:1, maxValue:999, defaultValue:10, label: 'How Often To Advertise The Plugin: (min)'},
    {name:'multispin_count', type:'int', minValue:0, maxValue:999, defaultValue:3, label: 'How Many Multi-Spins To Allow? (0-999)'},
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
var multiMessage = 'Disabled!';
var temp = new Array(cb.settings.pos1,cb.settings.pos2,cb.settings.pos3,cb.settings.pos4,cb.settings.pos5,cb.settings.pos6,cb.settings.pos7,cb.settings.pos8,cb.settings.pos9,cb.settings.pos10);
var rewards = new Array();

for(var i = 0; i<temp.length; i++) {
	if(temp[i] != '')
	{
		rewards.push(temp[i]);
	}
}




if(cb.settings.multispin_count > 0)
{
	multiMessage = 'Enabled! x ' + cb.settings.multispin_count;
}

cb.chatNotice('  Wheel of fortune!');
cb.chatNotice('--------------------------------');
cb.chatNotice('Wheel Value Set To : ' + cb.settings.cost_per_spin + ' tokens.');
cb.chatNotice('--------------------------------');
cb.chatNotice('      -= Rewards Active =-      ');
for(var x = 0; x < rewards.length; x++) {
	cb.chatNotice(rewards[x]);
}
cb.chatNotice('--------------------------------');
cb.chatNotice('     Good Luck And Have Fun.    ');
cb.chatNotice('--------------------------------');
cb.chatNotice('      Developed by @SweetDann     ');


function spinWheel() {
	cb.chatNotice('********* Spinning The Wheel! ********');
	var randomnumber = Math.floor(Math.random()*(rewards.length));
	cb.chatNotice('**** The Wheel Stop On : '  + rewards[randomnumber] + ' *********');
	cb.chatNotice('**************************************');
}

cb.onTip(function (tip) {
	var tipJar = tip['amount'];
	var spinCount = 0;

	//While the Tip Jar Has More In it Then The Spin Cost...
	while(tipJar >= cb.settings.cost_per_spin)
	{
		//And If We Have A SpinCount Left...
    		if(spinCount <= (cb.settings.multispin_count))
		{
			//Spin The Wheel.
			if(spinCount > 0)
			{
				cb.chatNotice('! Multi-Spin Bonus Activated !');
			}
		
			//Spin The Wheel in 3 seconds.
			//cb.setTimeout(spinWheel, 3000);
			spinWheel();
    		}
		//Remove The Spin Amount From The Tip Jar.
		tipJar -= cb.settings.cost_per_spin;
		//And Increase The SpinCount.
		spinCount++;
	}
    
	total_tipped += parseInt(tip['amount'])
    	cb.drawPanel();
});




cb.onMessage(function (msg) {
    var userName = msg['user'];
    if(msg['m'] == '/rewards')
    {
	for(var x = 0; x < rewards.length; x++) {
		cb.chatNotice('Reward ' + x + ': ' + rewards[x], userName);
	}
    	cb.chatNotice('--------------------------------', userName);
    	cb.chatNotice('     Good Luck And Have Fun.    ', userName);
    	cb.chatNotice('--------------------------------', userName);
    }
    return msg;
});

cb.onDrawPanel(function(user) {
    return {
        'template': '3_rows_of_labels',
        'row1_label': 'Total Tips: ',
        'row1_value': total_tipped,
        'row2_label': 'Spin Cost',
        'row2_value': cb.settings.cost_per_spin + ' tokens.',
        'row3_label': 'Multi-Spin:',
        'row3_value': multiMessage
        
    };
});



function advert() {
    cb.chatNotice('Wheel of fortune Is ACTIVE! Tip ' + cb.settings.cost_per_spin + ' To Play! Type \'/rewards\' to get a wheel reward listing');
    cb.setTimeout(advert, (cb.settings.advertise_in_chat * 60000));
}

cb.setTimeout(advert, (cb.settings.advertise_in_chat * 60000));
