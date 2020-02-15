/**
 * App: Roll The Dice
 * Version: 2.0.5
 * Author: zingknaat
 * Date: 2014-12-22
 * Edited: noud41
 * Date: 2020-02-15
 */

cb.settings_choices = [
    {
        name: 'tokens', type: 'int', minValue: 0, maxValue: 100, label: 'How much do you want to charge per roll?',
        defaultValue: 25
    },
    {
        name: 'remove_winning_prize', type: 'choice', label: 'Remove prize from list after each roll?',
        choice1: 'Yes', choice2: 'No', defaultValue: 'No'
    },
    {
        name: 'die_type',
        type: 'choice',
        label: 'Use traditional (6-sided) or Chinese (10-sided) die? (NOTE: If you choose the '
        + 'Chinese die, please set all of the 21 prizes. Otherwise, just set the first 13.)',
        choice1: 'Traditional',
        choice2: 'Chinese',
        default: 'Traditional'
    },
    {
        name: 'minimum_rolls',
        type: 'choice',
        label: 'What is the minimum number of rolls before the rare dice can appear? (Keep this a secret!)',
        choice1: 10,
        choice2: 15,
        choice3: 20,
        choice4: 25,
        choice5: 30,
        choice6: 35,
        choice7: 40,
        choice8: 45,
        choice9: 50,
        defaultValue: 10
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
    {name: 'prize_1', type: 'str', label: 'Prize for rolling 1'},
    {name: 'prize_2', type: 'str', label: 'Prize for rolling 2'},
    {name: 'prize_3', type: 'str', label: 'Prize for rolling 3'},
    {name: 'prize_4', type: 'str', label: 'Prize for rolling 4'},
    {name: 'prize_5', type: 'str', label: 'Prize for rolling 5'},
    {name: 'prize_6', type: 'str', label: 'Prize for rolling 6'},
    {name: 'prize_7', type: 'str', label: 'Prize for rolling 7'},
    {name: 'prize_8', type: 'str', label: 'Prize for rolling 8'},
    {name: 'prize_9', type: 'str', label: 'Prize for rolling 9'},
    {name: 'prize_10', type: 'str', label: 'Prize for rolling 10'},
    {name: 'prize_11', type: 'str', label: 'Prize for rolling 11'},
    {name: 'prize_12', type: 'str', label: 'Prize for rolling 12'},
    {
        name: 'prize_13',
        type: 'str',
        default: 'A smile',
        label: 'Prize for rolling 13 (RARE if using traditional dice)'
    },
    {
        name: 'prize_14',
        type: 'str',
        default: 'A smile',
        label: 'Prize for rolling 14 (only shown if using Chinese dice)'
    },
    {
        name: 'prize_15',
        type: 'str',
        default: 'A smile',
        label: 'Prize for rolling 15 (only shown if using Chinese dice)'
    },
    {
        name: 'prize_16',
        type: 'str',
        default: 'A smile',
        label: 'Prize for rolling 16 (only shown if using Chinese dice)'
    },
    {
        name: 'prize_17',
        type: 'str',
        default: 'A smile',
        label: 'Prize for rolling 17 (only shown if using Chinese dice)'
    },
    {
        name: 'prize_18',
        type: 'str',
        default: 'A smile',
        label: 'Prize for rolling 18 (only shown if using Chinese dice)'
    },
    {
        name: 'prize_19',
        type: 'str',
        default: 'A smile',
        label: 'Prize for rolling 19 (only shown if using Chinese dice)'
    },
    {
        name: 'prize_20',
        type: 'str',
        default: 'A smile',
        label: 'Prize for rolling 20 (only shown if using Chinese dice)'
    },
    {
        name: 'prize_21',
        type: 'str',
        default: 'A smile',
        label: 'Prize for rolling 21 (RARE; only shown if using Chinese dice)'
    }
];

var langTokens = (cb.settings.tokens > 0) ? 'tokens' : 'token';
var numberOfSides = (cb.settings.die_type == 'Traditional') ? 6 : 10;
var lastRoller = '--';
var lastPrizeWon = '--';
var rollCounter = 0;
var tipCounter = 0;
var winners = [];
var prizes = [];
var minimumRollsToGetRareDice = parseInt(cb.settings.minimum_rolls);
var maxOutcome = (cb.settings.die_type == 'Traditional') ? 13 : 21;
var dieImagePrefix = (cb.settings.die_type == 'Traditional') ? ':reddie' : ':cdie';

cb.onTip(function (tip) {
    tipCounter += parseInt(tip['amount']);
    if (parseInt(tip['amount']) >= cb.settings.tokens) {
        var numberOfRolls = Math.floor(parseInt(tip['amount']) / cb.settings.tokens);
        for (var i = 0; i < numberOfRolls; i++) {
            roll(tip['from_user']);
            lastRoller = tip['from_user'];
        }
    } else {
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
    cb.chatNotice('Hoi welcome ' + user['user'] + '! (be fun)');
    showAppAd(user['user']);
});

cb.onMessage(function (msg) {
    if (msg['m'].match(/\/winners/i)) {
        msg['X-Spam'] = true;
        showPrizesWon(msg['user']);
    } else if (msg['m'].match(/\/prizes/i)) {
        msg['X-Spam'] = true;

        if (msg['m'].match(/all/i) && ((msg['is_mod'] == true) || (msg['user'] == cb.room_slug))) {
            showPrizes();
        } else {
            showPrizes(msg['user']);
        }
    }

    return msg;
});

function roll(username) {
    rollCounter++;

    var die1 = Math.floor(Math.random() * numberOfSides+1);
    var die2 = Math.floor(Math.random() * numberOfSides+1);

    // convoluted logic to appease the dev gods on cb
    var randomNum = Math.ceil(Math.random() * (100 - minimumRollsToGetRareDice) + minimumRollsToGetRareDice);
    if (rollCounter == randomNum) {
        if ((die1 == 1) && (die2 != 1)) die1 = (cb.settings.die_type == 'Traditional') ? 7 : 11;
        if ((die2 == 1) && (die1 != 1)) die2 = (cb.settings.die_type == 'Traditional') ? 7 : 11;
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

    var textColor = '#000000';
    var bgColor = '#D9FAD7';

    if (winner) textColor = '#067D00';
    if (total == maxOutcome) {
        bgColor = '#FFDBF3';
        textColor = '#A805A6';
    }

    cb.sendNotice(msg, '', bgColor, textColor, 'bold');
    lastPrizeWon = prize;
    winners.push("Roll #" + rollCounter + " (" + total + "): " + username + " - " + prize);
    cb.drawPanel();
}

function setPrizes() {
    var rareText = '';
    for (var i = 1; i <= maxOutcome; i++) {
        if (i == maxOutcome) rareText = " (VERY RARE)";
        prizes.push(cb.settings['prize_' + i] + rareText);
    }
}

function showPrizes(username) {
    if (prizes.length) {
        var rareText = '';
        var msg = "We are playing Roll the Dice - by https://chaturbate.com/apps/app_details/roll-the-dice-2";
        for (var i = 1; i <= maxOutcome; i++) {
            if (i == maxOutcome) rareText = " (VERY RARE)";
            if (prizes.indexOf(cb.settings['prize_' + i] + rareText) >= 0)
                msg += "\nRoll " + i + " - " + cb.settings['prize_' + i] + rareText;
        }
    } else {
        var msg = "SORRY! There are no prizes left in the list, but thank you for the tip. :thumbsup";
    }
    cb.sendNotice(msg, username, '#DBFBFF', '#008596', 'bold');
}

function showPrizesWon(username) {
    var msg = "##### LAST 40 WINNERS #####";
    msg += "\nList sorted in chronological order";
    if (winners.length == 0) {
        cb.sendNotice('No one has won anything yet. Roll the dice to win a prize!', username, '', '', 'bold');
    } else {
        var recentWinners = winners.slice(-40);
        for (var i = 0; i < recentWinners.length; i++) msg += "\n" + recentWinners[i];

        cb.sendNotice(msg, username, '#FFF0DE', '#8A4900', 'bold');
    }
}

function advertise() {
    showAppAd();
    cb.setTimeout(advertise, parseInt(cb.settings.notice_wait_time) * 60000);
}

function showAppAd(username) {
    var msg = "";
    if (username != undefined) {
        msg += "Welcome, " + username + "! We are playing Roll The Dice. \n";
    } else {
        msg += "Roll The Dice by zingknaat \n";
    }
    msg += "Each roll reveals a prize. There are " + prizes.length + " possible prizes. \n";

    if (cb.settings.remove_winning_prize == 'Yes') {
        msg += "Each prize won will be removed from the list.\n";
    } else {
        msg += "Each prize won will stay on the list.\n";
    }

    msg += "Tip " + cb.settings.tokens + " " + langTokens + " to roll the dice. \n";
    msg += "Type \"/prizes\" to see the list of prizes. \n";
    msg += "Type \"/prizes all\" to send the list to all viewers if you're a mod or the broadcaster.\n";
    msg += "Type \"/winners\" to see a list of the last 20 winners.";
    cb.sendNotice(msg, username, '', '#15A6B0', 'bold');
}

function init() {
    setPrizes();
    advertise();
    cb.changeRoomSubject('Tip ' + cb.settings.tokens + ' tokens to roll the dice!');
}

init();