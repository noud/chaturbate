// https://chaturbate.com/apps/user_uploads/2/jeffreyvels1994/
// https://chaturbate.com/apps/sourcecode/roll-the-dice-5/?version=&slot=2

/**
 * Roll the Dice
 * Version: 1.1.1
 * Author: jeffreyvels1994
 * Date: 2018-03-31
 */

cb.settings_choices = [
    {
        name: 'tokens', type: 'int', minValue: 1,
        label: 'How much do you want to charge per roll?',
        defaultValue: 33
    },
    {
        name: 'die_type',
        type: 'choice',
        label: 'Use Traditional (6-sided) or Chinese (10-sided) dice? (NOTE: If you choose the '
        + 'Chinese die, please set all of the 21 prizes. Otherwise, just set the first 13.)',
        choice1: 'Traditional',
        choice2: 'Chinese',
        defaultValue: 'Traditional'
    },
    {
        name: 'multirolls', type: 'int', minValue: 1,
        label: 'What is the maximum number of rolls you want a user to be able to make in a single tip? (set to 1 to disable) Example: If you set this to 3 and you charge 33 tokens per roll, a user could tip 66 for 2 rolls or 99 for 3 rolls. Any other tip amounts will be ignored.',
        defaultValue: 3
    },
    {
        name: 'minimum_rolls',
        type: 'choice',
        label: 'What is the minimum number of rolls before the rare dice can appear? (Keep this a secret!)',
        choice1: 5,
        choice2: 10,
        choice3: 15,
        choice4: 20,
        choice5: 25,
        choice6: 30,
        choice7: 35,
        choice8: 40,
        choice9: 45,
		choice10: 50,
		choice11: 55,
		choice12: 60,
        defaultValue: 20
    },
    {
        name: 'notice_wait_time',
        type: 'choice',
        label: 'In minutes, how often should the app advertise itself?',
        choice1: 5,
        choice2: 10,
        choice3: 15,
        choice4: 20,
        choice5: 25,
        choice6: 30,
        choice7: 45,
        choice8: 60,
        defaultValue: 10
    },
    {
        name: 'change_room_subject', type: 'choice', label: 'Change room subject when using this bot?',
        choice1: 'Yes', choice2: 'No', defaultValue: 'Yes'
    },

    {name: 'prize_1', type: 'str', label: 'Prize for rolling 1', defaultValue: 'dance'},
    {name: 'prize_2', type: 'str', label: 'Prize for rolling 2', defaultValue: 'dance (you choose song)'},
    {name: 'prize_3', type: 'str', label: 'Prize for rolling 3', defaultValue: 'flash boobs'},
    {name: 'prize_4', type: 'str', label: 'Prize for rolling 4', defaultValue: 'flash pussy'},
    {name: 'prize_5', type: 'str', label: 'Prize for rolling 5', defaultValue: 'flash butt'},
    {name: 'prize_6', type: 'str', label: 'Prize for rolling 6', defaultValue: 'flash (you choose what)'},
    {name: 'prize_7', type: 'str', label: 'Prize for rolling 7', defaultValue: 'suck nipples'},
    {name: 'prize_8', type: 'str', label: 'Prize for rolling 8', defaultValue: 'pussy close up'},
    {name: 'prize_9', type: 'str', label: 'Prize for rolling 9', defaultValue: 'camel toe'},
    {name: 'prize_10', type: 'str', label: 'Prize for rolling 10', defaultValue: 'spank butt'},
    {name: 'prize_11', type: 'str', label: 'Prize for rolling 11', defaultValue: 'spank butt both hands'},
    {name: 'prize_12', type: 'str', label: 'Prize for rolling 12', defaultValue: 'spank pussy'},
    {name: 'prize_13', type: 'str', label: 'Prize for rolling 13 (RARE if using traditional dice)', defaultValue: 'finger pussy 10 mins'},
    {name: 'prize_14', type: 'str', label: 'Prize for rolling 14 (only shown if using Chinese dice)', defaultValue: '.'},
    {name: 'prize_15', type: 'str', label: 'Prize for rolling 15 (only shown if using Chinese dice)', defaultValue: '.'},
    {name: 'prize_16', type: 'str', label: 'Prize for rolling 16 (only shown if using Chinese dice)', defaultValue: '.'},
    {name: 'prize_17', type: 'str', label: 'Prize for rolling 17 (only shown if using Chinese dice)', defaultValue: '.'},
    {name: 'prize_18', type: 'str', label: 'Prize for rolling 18 (only shown if using Chinese dice)', defaultValue: '.'},
    {name: 'prize_19', type: 'str', label: 'Prize for rolling 19 (only shown if using Chinese dice)', defaultValue: '.'},
    {name: 'prize_20', type: 'str', label: 'Prize for rolling 20 (only shown if using Chinese dice)', defaultValue: '.'},
    {name: 'prize_21', type: 'str', label: 'Prize for rolling 21 (RARE if using Chinese dice)', defaultValue: '.'}
];





var price = cb.settings.tokens;
var langTokens = (price > 1) ? 'tokens' : 'token';
var numberOfSides = (cb.settings.die_type == 'Traditional') ? 6 : 10;
var multiRolls = cb.settings.multirolls;
var lastRoller = '--';
var lastPrizeWon = '--';
var rollCounter = 0;
var tipCounter = 0;
var winners = [];
var prizes = [];
var minimumRollsToGetRareDice = parseInt(cb.settings.minimum_rolls);
var maxOutcome = (cb.settings.die_type == 'Traditional') ? 13 : 21;
var dieImagePrefix = (cb.settings.die_type == 'Traditional') ? ':reddie' : ':cdie';
var rareChance = 10;    // percent chance of rolling a RARE (minimum rolls must also be met)

cb.onTip(function (tip) {

    var maxTip = multiRolls * price;
    var tipAmount = parseInt(tip['amount']);

    // check to see if tip was for a dice roll
    if (tipAmount >= price && (maxTip / tipAmount <= multiRolls) && (tipAmount % price == 0)) {
        var numberOfRolls = Math.floor(parseInt(tip['amount']) / price);
        for (var i = 0; i < numberOfRolls; i++) {
            roll(tip['from_user']);
            lastRoller = tip['from_user'];
        }
    }
    else {
        // Tip was for something else, don't roll the dice
        var textColor = '#FFFFFF';
        var bgColor = '#0000FF';
        //cb.sendNotice('Tip was not for dice roll.', '', bgColor, textColor, 'bold');
        //tipCounter += parseInt(tip['amount']);
        cb.drawPanel();
    }

});

cb.onDrawPanel(function (user) {
    return {
        'template': '3_rows_12_22_31',
        'row1_label': 'Last prize won:',
        'row1_value': lastPrizeWon,
        'row2_label': 'Last player:',
        'row2_value': lastRoller,
        'row3_value': tipCounter + ' ' + langTokens + ' received / rolled ' + rollCounter + ' time(s)'
    };
});

cb.onEnter(function (user) {
    showAppAd(user['user']);
});

cb.onMessage(function (msg) {
    if (msg['m'].match(/!winners/i)) {
        msg['X-Spam'] = true;
        showPrizesWon(msg['user']);
    } else if (msg['m'].match(/!lol/i)) {
        msg['X-Spam'] = true;

        if (msg['m'].match(/all/i) && ((msg['is_mod'] == true) || (msg['user'] == cb.room_slug))) {
            showPrizes();
        } else {
            showPrizes(msg['user']);
        }
    }
	if (msg['m'].match(/!info/i)) {
        msg['X-Spam'] = true;
        showappinformation(msg['user']);
    }
    return msg;
});

function roll(username) {
    rollCounter++;

    var die1 = Math.floor(Math.random() * numberOfSides) + 1;
    var die2 = Math.floor(Math.random() * numberOfSides) + 1;

    // see if there's a chance we can roll a rare die
    if (rollCounter > minimumRollsToGetRareDice) {
        if (Math.random() <= 1 / (rareChance / 100)) {
            die1 = 7;
        }
    }
    var total = die1 + die2;
    var winner = false;

    if (total >= 1) {
        winner = true;
        var prize = cb.settings['prize_' + total];
    } else {
        winner = false;
        var prize = 'A Thank You!';
    }

    var prizeIndex = prizes.indexOf(prize);

    if (prizeIndex >= 0) {
        if (cb.settings.remove_winning_prize == 'Yes') prizes.splice(prizeIndex, 1);
    } else {
        prize = 'A Thank You!';
    }

    var msg = dieImagePrefix + die1 + " " + dieImagePrefix + die2 + "\n";
    msg += username + " rolled a " + total + "! \n".toUpperCase();
    msg += "Roll #" + rollCounter + " | Prize: " + prize;

    var textColor = '#FFFFFF';
    var bgColor = '#0000FF';

    if (winner) textColor = '#FFFFFF';
    if (total == maxOutcome) {
        bgColor = '#0000FF';
        textColor = '#FFFFFF';
    }

    cb.sendNotice(msg, '', bgColor, textColor, 'bold');
    lastPrizeWon = prize;
    winners.push("Roll #" + rollCounter + " (" + total + "): " + username + " - " + prize);
    cb.drawPanel();
}

function setPrizes() {
    var rareText = '';
    for (var i = 1; i <= maxOutcome; i++) {
        if (i == maxOutcome) rareText = " (RARE)";
        prizes.push(cb.settings['prize_' + i] + rareText);
    }
}

function showPrizes(username) {
    if (prizes.length) {
        var rareText = '';
        var msg = "##### POSSIBLE PRIZES #####";
        for (var i = 1; i <= maxOutcome; i++) {
            if (i == maxOutcome) rareText = " (RARE)";
            if (prizes.indexOf(cb.settings['prize_' + i] + rareText) >= 0)
                msg += "\nRoll " + i + " - " + cb.settings['prize_' + i] + rareText;
        }
    } else {
        var msg = "SORRY! There are no prizes left in the list, but thank you for the tip. :thumbsup";
    }
    cb.sendNotice(msg, username, '#0000FF', '#FFFFFF', 'bold');
}

function showPrizesWon(username) {
    var msg = "##### LAST 20 WINNERS #####";
    msg += "\nList sorted in chronological order";
    if (winners.length == 0) {
        cb.sendNotice('No one has won anything yet. Roll the dice to win a prize!', username, '#0000FF', '#FFFFFF', 'bold');
    } else {
        var recentWinners = winners.slice(-20);
        for (var i = 0; i < recentWinners.length; i++) msg += "\n" + recentWinners[i];

        cb.sendNotice(msg, username, '#0000FF', '#FFFFFF', 'bold');
    }
}

function showappinformation(username) {
    var msg = "##### app information ##### ";
    msg += "\nRoll the Dice  \n";
    msg += "made by jeffreyvels1994  \n";
	msg += "version - 1.1.1 \n";
    msg += "release date - 2018-03-31 \n";
	msg += "(Tweaked from the original game and its modifications by zingknaat) \n";
    msg += "for questions or suggestions you can mail to jvels16@gmail.com \n";
	msg += "Type \"!lol\" to see the list of prizes \n";
    msg += "Type \"!lol all\" to send the list to all viewers if you're a mod or the broadcaster\n";
    msg += "Type \"!winners\" to see a list of the last 20 winners ";
    
        cb.sendNotice(msg, username, '#0000FF', '#FFFFFF', 'bold');
    }

function advertise() {
    showAppAd();
    cb.setTimeout(advertise, parseInt(cb.settings.notice_wait_time) * 60000);
}

function showAppAd(username) {
    var msg = "";
	msg += "We are playing Roll the Dice - by jeffreyvels1994  \n";
    msg += "Each roll reveals a prize. There are " + prizes.length + " possible prizes.\n";

    if (cb.settings.remove_winning_prize == 'Yes') {
        msg += "Each prize won will be removed from the list.\n";
    } else {
        msg += "Each prize won will stay on the list.\n";
    }

    msg += "Tip " + price + " " + langTokens + " to roll the dice. \n";
    if (multiRolls > 1) msg += "You can roll a maximum of " + multiRolls + " times in a single tip (" + (multiRolls*price) + " tokens). \n";
	msg += "Type \"!info\" to see the (app information)\n";
    msg += "Type \"!lol\" to see the list of prizes \n";
    msg += "Type \"!lol all\" to send the list to all viewers if you're a mod or the broadcaster \n";
    msg += "Type \"!winners\" to see a list of the last 20 winners ";
    cb.sendNotice(msg, username, '#0000FF', '#FFFFFF', 'bold');
    }

function init() {
    setPrizes();
    advertise();
    if (cb.settings.change_room_subject == 'Yes') {
        cb.changeRoomSubject('Tip ' + price + ' ' + langTokens + ' to roll the dice and win a prize!');
    }
}

init();
