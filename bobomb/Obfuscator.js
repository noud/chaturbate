// https://chaturbate.com/apps/user_uploads/3/bobomb/
// https://chaturbate.com/apps/sourcecode/obfuscator/?version=&slot=3

// **************************************************
// Hacked up version of the following bots:
// **************************************************
// Auto-moderator bot
// Author: asdfghjkl28
// ------ HODOR by Glenn205 ------ *
// (Based on Blapp by Prnsvh) *
// **************************************************
// By Bobomb
// **************************************************

// Auto-moderator bot
// Author: asdfghjkl28

var OWNER_FLAG = 32;
var MODERATOR_FLAG = 16;
var FANCLUB_FLAG = 8;
var DKBLUE_FLAG = 4;
var LTBLUE_FLAG = 2;
var GREY_FLAG = 1;

var autoBot = {

        commands: {},
        registerCommand: function (command, helpText, owner, moderator, fanclub, dkblue, ltblue, grey, method) {
            this.commands[command] = {method: method, helpText: helpText, perms: this.bool2Perm(owner, moderator, fanclub, dkblue, ltblue, grey)};
        },
        checkCommand: function (msg) {

            var m = msg['m'];
            var u = msg['user'];

            if (m[0] == '/') {
                // don't print commands
                msg['X-Spam'] = true;

                // Remove trailing spaces
                m = m.replace(/\s+$/, '');

                // Find command parameters
                var commandParts = m.split(/\s+/);

                var commandName = commandParts.shift();
//                cb.log(u + ' issued command: ' + commandName);

                if (this.commands[commandName] && (this.commands[commandName].perms & this.msg2Perm(msg))) {
//                    cb.log(u + " allowed to run command:" + commandName);
                    msg = this.commands[commandName].method(msg, commandParts);
                    // Only don't print if it is a command we handle
                    return msg;
                }
                else {
                    if (!this.canControlBot(msg)) {
                        cb.log(u + " NOT allowed to run command:" + commandName);
                    }
                    return false;
                }
            } else {
                return false;
            }
        },

        bool2Perm: function (owner, moderator, fanclub, dkblue, ltblue, grey) {
            var perms = 0;
            perms = owner ? perms | OWNER_FLAG : perms;
            perms = moderator ? perms | MODERATOR_FLAG : perms;
            perms = fanclub ? perms | FANCLUB_FLAG : perms;
            perms = dkblue ? perms | DKBLUE_FLAG : perms;
            perms = ltblue ? perms | LTBLUE_FLAG : perms;
            perms = grey ? perms | GREY_FLAG : perms;
            return perms;
        },

        msg2Perm: function (msg) {
            var perms = 0;
            perms = msg['user'] == cb.room_slug ? perms | OWNER_FLAG : perms;
            perms = msg['is_mod'] ? perms | MODERATOR_FLAG : perms;
            perms = msg['in_fanclub'] ? perms | FANCLUB_FLAG : perms;
            perms = msg['tipped_recently'] ? perms | DKBLUE_FLAG : perms;
            perms = msg['has_tokens'] ? perms | LTBLUE_FLAG : perms;
            perms = perms == 0 ? perms | GREY_FLAG : perms;
            return perms;
        },


// Commands the room owner and moderators can use
        unsilenceCommand: '/unsil',
        silenceCommand: '/silence',
        silenceListCommand: '/silencelist',
        silenceManyCommand: '/silenceMany',
        statsCommand: '/amstats',
        addCommand: '/add',
        addManyCommand: '/addManyWords',
        deleteCommand: '/del',
        modeCommand: '/mode',
        protectCommand: '/protect',
        unProtectCommand: '/unprotect',
        protectListCommand: '/protectlist',
        addSCommand: '/addSilent',
        addManySCommand: '/addManySilent',
        addSUserCommand: '/addSilentUser',
        addSUserPatternCommand: '/addSUserPattern',
        unsilenceSCommand: '/unsilS',

// Commands that everyone can use
        helpCommand: '/amhelp',
        listCommand: '/list',

// Useful globals
        wordBoundary: "(\\s|\\b)",

// Data structures for silenced and warned lists
        silenced: {
        },
        Ssilenced: {
        },
        warned: {
        },
        protected: {
        },
        notified: {
        },
        maxWarnings: 1,
        totalWarnings: 0,
        totalSilenced: 0,
        totalMessagesBlocked: 0,
// Default patterns for single word matches (covers the three cases)
        wordPatternStart: '',
        wordPatternEnd: '',
        wordPatternMiddle: '',

// Default pattern for phrase matches (not as rigorous as the word matcher
        phrasePatternStart: '',
        phrasePatternEnd: '',
        phrasePatternMiddle: '',

        // Default patterns for single word matches (covers the three cases)
        SwordPatternStart: '',
        SwordPatternEnd: '',
        SwordPatternMiddle: '',

        SuserPattern: '',

// Pattern to find phrases in the bad word list
        phraseFinder: /\s+/i,

        repeatedCharPattern: /(([:]*)[^\s]*([^\s])\3{6,})/ig,
        emotePattern: /^:/,
        capitalised: /^[A-Z][^A-Z]*$/,

        repeatedCharWhiteListPattern: /(e+w+)/i,

        anonibRegex: /anon.{0,3}ib/i,

        actualBanList: "",

        actualBannedWords: {
        },
        actualBannedPhrases: {
        },
        actualBannedSWords: {
        },
        actualBannedSUsers: {
        },

        haveBadWords: false,
        haveBadPhrases: false,
        haveBadSWords: false,
        haveBadSUserPattern: false
    }
    ;

// CB app settings
cb.settings_choices = [
	{name: 'baseString', label: 'The text to use', type: 'str', minLength: 1, maxLength: 20, defaultValue: "hodor" }, // Bobomb Edit
	{name: 'listOnEnter', type: 'choice', label: "Post the list of banned words on room enter and enable the /list command for everyone",
        choice1: 'Yes',
        choice2: 'No', defaultValue: 'No'}, // Bobomb Edit
    {name: 'silenced', label: 'Users you want permanently silenced (separated by commas)', type: 'str', minLength: 0, maxLength: 10240, required: false},
    {name: 'badwords', label: 'Words or phrases you want to silence users for saying (separated by commas)', type: 'str', minLength: 0, maxLength: 10240, defaultValue: 'bb,baby,babe,show boobs,show feet,:goat'},
    {name: 'blockRepeatedChars', type: 'choice', label: 'Also block messages with lots of repeated letters (e.g. mmmmmmmmmmmm)',
        choice1: 'Yes',
        choice2: 'No', defaultValue: 'No'},
    {name: 'allCapsChanger', type: 'choice', label: 'Also change all caps messages to lowercase (doesn\'t affect emotes e.g. :HELLO)',
        choice1: 'Yes',
        choice2: 'No', defaultValue: 'Yes'},
    {name: 'maxWarnings', label: 'Number of times to warn users before permanently silencing them (enter 0 to silence on first offence)', type: 'int', minValue: 0, maxValue: 10, defaultValue: 5},
    {name: 'hideOrSilence', type: 'choice', label: 'Just Hide messages with the bad words, or completely Silence users who use the the bad words after being warned',
        choice1: 'Hide',
        choice2: 'Silence', defaultValue: 'Hide'},
    {name: 'allowTipToUnsilence', type: 'choice', label: 'Allow users to tip to become unsilenced',
        choice1: 'Yes',
        choice2: 'No', defaultValue: 'No'},
    {name: 'tokensToBeUnsilenced', label: 'Minimum size of tip to become unsilenced', type: 'int', minValue: 0, defaultValue: 50},
    {name: 'usersToProcess', label: 'User groups whose messages will be moderated (fan club members are always safe, users who have tipped within the last 24hrs are counted as blues)', type: 'choice', choice1: 'Greys only', choice2: 'Greys & Blues', defaultValue: 'Greys only'}
];


// c: message color
// m: the message text
// user: username of message sender
// f: message font
// in_fanclub: is the user in the broadcasters fan club
// has_tokens: does the user have at least 1 token
// is_mod: is the user a moderator
// tipped_recently: is the user a dark blue?
// gender: m (male), f (female), s (shemale), or c (couple)
cb.onMessage(function (msg) {
    return autoBot.onMessage(msg);
});

cb.onTip(function (tip) {
    autoBot.onTip(tip);
});

cb.onEnter(function (user) {
    autoBot.onEnter(user);
});

autoBot.onEnter = function (user) {
    if (cb.settings.listOnEnter == "Yes" && autoBot.canProcessContent(user) && !(user['user'] in this.notified)) { // Bobomb Edit
        cb.chatNotice('WARNING: The auto-moderator bot is running. It hides messages containing words or phrases that the broadcaster has banned.', user['user'], '#c33E3E', '#ffffff', 'normal');
        if (cb.settings.hideOrSilence == 'Silence') {
            if (cb.settings.maxWarnings > 0) {
                cb.chatNotice('If you choose to use a banned word or phrase, you will be warned up to ' + cb.settings.maxWarnings + ' times before being automatically silenced, be careful!', user['user'], '#E0C21B', '#000000', 'normal');
            } else {
                cb.chatNotice('The broadcaster has chosen a zero tolerance policy, you will be automatically silenced the first time you use a banned word or phrase, be careful!', user['user'], '#E0C21B', '#000000', 'normal');
            }
        }
        cb.chatNotice('To see the banned words and phrases, type /list into the chat window', user['user']);
        this.notified[user['user']] = 1;
    }
};

// Main on message callback function
autoBot.onMessage = function (msg) {
    // vars for ease of use
    var m = msg['m'];
    var u = msg['user'];

    var newMsg = autoBot.checkCommand(msg);
    if (newMsg) {
        return msg;
    }

    var Ssilenced = false;


    // check for action
    if (m[0] == '/') {
        // don't print commands
        msg['X-Spam'] = true;

        // Remove trailing spaces
        m = m.replace(/\s+$/, '');

        // Find command parameters
        var commandParts = m.split(/\s+/);

        var commandName = commandParts[0];
//        cb.log(u + ' issued command: ' + commandName);

        // check if controller (owner or moderator)
        if (!this.canControlBot(msg)) {
        }
        else {
            if (commandName == this.unsilenceCommand && commandParts.length > 1) // unsilence with username parameter
            {
                var commandParam = commandParts[1];
                if (this.unSilenceUser(commandParam)) {
                    cb.chatNotice('User ' + commandParam + ' has been unsilenced by ' + u, "", '#C7F2CC', '#000000', 'normal');
                    cb.chatNotice('You have been unsilenced by ' + u + ' however if you break the rules again, you will be warned and/or silenced.', commandParam);
                } else {
                    cb.chatNotice('User ' + commandParam + ' was not on the unsilence list.', u);
                }
            }
            else if (commandName == this.protectCommand && commandParts.length > 1) // protect with username parameter
            {
                var commandParam = commandParts[1];
                if (this.protectUser(commandParam)) {
                    cb.chatNotice('You have been protected by ' + u + ' so your messages won\'t be moderated by the auto-moderator bot however if you behave badly you may be unprotected.', commandParam);
                    cb.chatNotice('You have protected ' + commandParam, u);
                } else {
                    cb.chatNotice('User ' + commandParam + ' was already on the protect list.', u);
                }
            }
            else if (commandName == this.unProtectCommand && commandParts.length > 1) // unprotect with username parameter
            {
                var commandParam = commandParts[1];
                if (this.unProtectUser(commandParam)) {
                    cb.chatNotice('You have been unprotected by ' + u + ' so your messages will now be moderated by the auto-moderator bot.', commandParam);
                    cb.chatNotice('You have unprotected ' + commandParam, u);
                } else {
                    cb.chatNotice('User ' + commandParam + ' was not on the protect list.', u);
                }
            }
            else if (commandName == this.modeCommand && commandParts.length > 1) // mode command with parameter
            {
                var commandParam = commandParts[1];
                if (commandParam == 'silence') {
                    if (cb.settings.hideOrSilence == 'Hide') {
                        cb.chatNotice('Changing to silence mode', u);
                        cb.settings.hideOrSilence = 'Silence';
                    } else {
                        cb.chatNotice('Already in silence mode', u);
                    }

                } else if (commandParam == 'hide') {
                    if (cb.settings.hideOrSilence == 'Silence') {
                        cb.chatNotice('Changing to hide mode', u);
                        cb.settings.hideOrSilence = 'Hide';
                    } else {
                        cb.chatNotice('Already in hide mode', u);
                    }
                } else {
                    cb.chatNotice('Unrecognised mode: ' + commandParam, u);
                    this.usage(msg);
                }
            }
            else if (commandParts[0] == this.addCommand && commandParts.length > 1) // add word/phrase
            {
                if (commandParts.length > 2) {
                    // phrase
                    commandParts.shift();
                    var localPhrase = commandParts.join(' ');
                    this.addToActualBanList(localPhrase, 'phrase');
                    this.buildBanLists();
                    cb.chatNotice("Added new phrase [" + localPhrase + "] to banned list", u);
                } else {
                    this.addToActualBanList(commandParts[1], 'word');
                    this.buildBanLists();
                    cb.chatNotice("Added new word [" + commandParts[1] + "] to banned list", u);
                }
            }
            else if (commandParts[0] == this.addManyCommand && commandParts.length > 1) // add many words
            {
                if (/,/.test(m)) {
                    cb.chatNotice("You must use spaces not commas as the separator for the /addManyWords command, not processing");
                } else {
                    commandParts.shift();

                    for (var jj = 0; jj < commandParts.length; jj++) {
                        this.addToActualBanList(commandParts[jj], 'word');
                    }
                    this.buildBanLists();
                    cb.chatNotice("Added new words [" + commandParts.join(',') + "] to banned list", u);
                }
            }
            else if (commandParts[0] == this.addSCommand && commandParts.length > 1) // add word/phrase
            {
                this.addToActualSBanList(commandParts[1]);
                this.buildBanLists();
                cb.chatNotice("Added new word [" + commandParts[1] + "] to silent ban list", u);
            }
            else if (commandParts[0] == this.addSUserCommand && commandParts.length > 1) // add S user
            {
                this.SsilenceUser(commandParts[1]);
                cb.chatNotice("Added user [" + commandParts[1] + "] to silent ban list", u);
            }
            else if (commandParts[0] == this.unsilenceSCommand && commandParts.length > 1) // unsilence S user
            {
                if (this.unSsilenceUser(commandParts[1])) {
                    cb.chatNotice("Removed user [" + commandParts[1] + "] from silent ban list", u);
                } else {
                    cb.chatNotice("User [" + commandParts[1] + "] was not on the silent ban list", u);
                }
            }
            else if (commandParts[0] == this.addSUserPatternCommand && commandParts.length > 1) // add S user pattern
            {
                this.addToActualSUserBanList(commandParts[1]);
                this.buildBanLists();
                cb.chatNotice("Added user pattern [" + commandParts[1] + "] to silent ban list", u);
            }
            else if (commandParts[0] == this.addManySCommand && commandParts.length > 1) // add many S words
            {
                if (/,/.test(m)) {
                    cb.chatNotice("You must use spaces not commas as the separator for the /addManyWords command, not processing");
                } else {
                    commandParts.shift();

                    for (var jj = 0; jj < commandParts.length; jj++) {
                        this.addToActualSBanList(commandParts[jj]);
                    }
                    this.buildBanLists();
                    cb.chatNotice("Added new words [" + commandParts.join(',') + "] to silent ban list", u);
                }
            }
            else if (commandParts[0] == this.deleteCommand && commandParts.length > 1) // delete word/phrase
            {
                if (commandParts.length > 2) {
                    // phrase
                    commandParts.shift();
                    var localPhrase = commandParts.join(' ');
                    if (this.removeFromActualBanList(localPhrase, 'phrase')) {
                        this.buildBanLists();
                        cb.chatNotice("Deleted phrase [" + localPhrase + "] from banned list", u);
                    } else {
                        cb.chatNotice("Phrase [" + localPhrase + "] was not found in banned list, can't remove", u);
                    }
                } else {
                    if (this.removeFromActualBanList(commandParts[1], 'word')) {
                        this.buildBanLists();
                        cb.chatNotice("Deleted word [" + commandParts[1] + "] from banned list", u);
                    } else {
                        cb.chatNotice("Word [" + commandParts[1] + "] was not found in banned list, can't remove", u);
                    }
                }
            }
//            else {
//                cb.chatNotice('Command \'' + commandName + '\' not recognised.', u);
//                this.usage(msg);
//            }
        }
    }
   else if (this.isSSilenced(u)) {
        msg['X-Spam'] = true;
    }
    else if (this.hasBannedSWord(m)) {
        msg['X-Spam'] = true;
        if (!this.canControlBot(msg)) {
            cb.chatNotice("Private notice: The automod bot just secret silenced user [" + u + "] because they said something bad. This notice was not broadcast to the room.", cb.room_slug);
            this.SsilenceUser(u);
        }
    }
    else if (!autoBot.canControlBot(msg) && this.haveBadSUserPattern) {
        if (this.SuserPattern.exec(u)) {
            cb.chatNotice("Private notice: The automod bot just secret silenced user [" + u + "] because of their username. This notice was not broadcast to the room.", cb.room_slug);
            this.SsilenceUser(u);
            msg['X-Spam'] = true;
        }
    }
    else if (this.isSilenced(u)) {
        cb.chatNotice('Your message was rejected because you have been silenced because you ignored the warnings about banned words or behaviour (either this session on or a previous occasion), your messages won\'t be seen by anyone else', u, '#B32E2E', '#ffffff', 'normal');
        //msg['X-Spam'] = true; // Bobomb Edit
        this.totalMessagesBlocked++;

        if (cb.settings.allowTipToUnsilence == "Yes") {
            cb.chatNotice('You can tip ' + cb.settings.tokensToBeUnsilenced + ' tokens or more in one tip to become unsilenced.', u, '#B32E2E', '#ffffff', 'normal');
        }
    } else {
        if (!autoBot.canControlBot(msg)) {
            // Block all caps for everyone except controllers
            // All caps changer
            if (cb.settings.allCapsChanger == "Yes") {
                var parts = m.split(" ");
                var cleaned = [];
                for (var kk = 0; kk < parts.length; kk++) {
                    var word = parts[kk];
                    if (this.emotePattern.test(word) || this.capitalised.test(word)) {
                        cleaned.push(word);
                    } else {
                        cleaned.push(word.toLowerCase());
                    }
                }
                m = cleaned.join(' ');
            }
        }

        if (this.canProcessContent(msg)) {
            // Not room owner or moderator and not silenced so test message content against patterns

            // Special unicode blocker for cunning spammers
            for (var i = 0; i < msg['m'].length; i++) {
                if (msg['m'].charCodeAt(i) >= 65280 && msg['m'].charCodeAt(i) <= 65519) {
                    msg['X-Spam'] = true;
                    break;
                }
            }

            var bannedWord = this.hasBannedWord(m);
            if (bannedWord) {
                this.totalMessagesBlocked++;
                m = autoBot.obfuscate(u, m, bannedWord); // Bobomb Edit
            }
            else {
                var bannedPhrase = this.hasBannedPhrase(m);
                if (bannedPhrase) {
                    this.totalMessagesBlocked++;
                    m = autoBot.obfuscate(u, m, bannedPhrase); // Bobomb Edit
                } else {
                    var repeatedChars = this.hasRepeatedChars(m);
                    if (repeatedChars) {
                        this.totalMessagesBlocked++;
                        m = autoBot.obfuscate(u, m, repeatedChars); // Bobomb Edit
                    }
                }
            }


            if (this.anonibRegex.test(u)) {
                // Auto-silencing anonib
                msg['X-Spam'] = true;
            }
        }
        else {
            //cb.log('Not checking content of message because user is a controller, or settings set to greys only or on protected list');
        }
    }


    msg['m'] = m;
    return msg;
};

autoBot.canProcessContent = function (msg) {
    if (this.canControlBot(msg) || msg['in_fanclub'] || autoBot.isProtected(msg['user'])) {
        // Owner, moderator or fan club or protected
        return false;
    }
    else {
        if (cb.settings.usersToProcess == 'Greys only') {
            if (msg['has_tokens'] || msg['tipped_recently']) {
                // Blue or recently blue
                return false;
            }
            // Greys are the only ones left by this point
            return true;
        } else {
            // Everyone left
            return true;
        }
    }
};

autoBot.protectUser = function (username) {
    if (this.isProtected(username)) {
        return false;
    } else {
        this.protected[username] = 1;
        this.unSilenceUser(username);
        return true;
    }
};

autoBot.unProtectUser = function (username) {
    if (this.isProtected(username)) {
        delete this.protected[username];
        return true;
    } else {
        return false;
    }
};

autoBot.isProtected = function (username) {
    return username in autoBot.protected;
};

autoBot.obfuscate = function (u, message, badThing) {
	 // Used a bad word or phrase
    if (cb.settings.hideOrSilence == 'Silence') {

        // cb.log("Doing silence routine");
        if (u in this.warned) {
            this.warned[u] = {'warnedScore': this.warned[u].warnedScore + 1};
        } else {
            this.warned[u] = {'warnedScore': 1};
        }
        //   cb.log("Warned: " + u + " " + this.warned[u].warnedScore + " times.");
        this.totalWarnings++;

		var modified = "";
		if(cb.settings.baseString.search(autoBot.emotePattern) === -1)
		{
			var index;
			var modIndex = 0;
			for(index in message)
			{
				if(message.charAt(index).search(/[\w]/) == -1)
				{
					modified += message.charAt(index);
					if(message.charAt(index).search(/[\s]/) != -1)
					{
						modIndex = 0;
					}
				}
				else
				{
					var picked = cb.settings.baseString[modIndex%cb.settings.baseString.length];
					if(message.charAt(index).search(/[A-Z]/) != -1)
					{
						picked.toUpperCase();
					}
					modified += picked;
					modIndex++;
				}
			}
		}
		else
		{
			modified = cb.settings.baseString;
		}
		if(cb.settings.allowTipToUnsilence == "Yes")
		{
			cb.chatNotice("Your message has been obfuscated by " + cb.room_slug + ". To undo this, you can tip " + cb.settings.tokensToBeUnsilenced + " tokens or more in one tip.", u);
		}
		return modified;
    } else {
        // Just hide this message
        cb.chatNotice('Your last message was rejected because you said "' + badThing + '" which is on the banned list.', u);
        cb.chatNotice('To see the full banned list, type /list', u);
    }
};

autoBot.doBanOrSilence = function (u, badThing) {

    // Used a bad word or phrase
    if (cb.settings.hideOrSilence == 'Silence') {
        // cb.log("Doing silence routine");
        if (u in this.warned) {
            this.warned[u] = {'warnedScore': this.warned[u].warnedScore + 1};
        } else {
            this.warned[u] = {'warnedScore': 1};
        }
        //   cb.log("Warned: " + u + " " + this.warned[u].warnedScore + " times.");
        this.totalWarnings++;
        // Actually silence users who have been warned more than threshold
        if (this.warned[u].warnedScore > cb.settings.maxWarnings) {
            // Silence the user
            this.silenceUser(u);
            cb.chatNotice('You have been silenced because you ignored the warnings and said "' + badThing + '" which is on the banned list, your messages won\'t be seen by anyone else', u, '#B32E2E', '#ffffff', 'normal');
            cb.chatNotice('User ' + u + ' has been silenced by the auto-moderator bot', "", '#F2C7EF', '#000000', 'normal');
            cb.chatNotice('Broadcaster: you can unsilence this user by typing the following:\n' + this.unsilenceCommand + ' ' + u, cb.room_slug);
        } else {
            // Actually warn the user
            var remainingWarnings = (cb.settings.maxWarnings - this.warned[u].warnedScore) + 1;
            if (remainingWarnings > 1) {
                cb.chatNotice('Your last message was rejected because you said "' + badThing + '" which is on the banned list. If you do this ' + remainingWarnings + ' more times, you will be permanently silenced and all of your messages will be rejected.', u, '#E0C21B', '#000000', 'normal');
                cb.chatNotice('To see the full banned list, type /list', u);
            } else {
                cb.chatNotice('Your last message was rejected because you said "' + badThing + '" which is on the banned list. If you do this again, you will be permanently silenced and all of your messages will be rejected.', u, '#E0C21B', '#000000', 'normal');
                cb.chatNotice('To see the full banned list, type /list', u);
            }

        }
    } else {
        // Just hide this message
        cb.chatNotice('Your last message was rejected because you said "' + badThing + '" which is on the banned list.', u);
        cb.chatNotice('To see the full banned list, type /list', u);
    }
};

autoBot.onTip = function (tip) {
    var amountTipped = parseInt(tip['amount']);
    if (cb.settings.allowTipToUnsilence == "Yes" && this.isSilenced(tip['from_user'])) {
        if (amountTipped >= cb.settings.tokensToBeUnsilenced) {
            this.unSilenceUser(tip['from_user']);
            cb.chatNotice('User ' + tip['from_user'] + ' has been unsilenced because they tipped at least ' + cb.settings.tokensToBeUnsilenced + ' tokens');
        }
    }
};

autoBot.hasBannedWord = function (text) {
    if (!this.haveBadWords) {
        // No banned words
        return false;
    } else {
        var match;
        while (match = this.wordPatternStart.exec(text)) {
            if (match[1] != cb.room_slug) {
                cb.log("Matched " + match[1] + " on word start");
                this.wordPatternStart.lastIndex = 0;
                return match[1];
            }
        }
        while (match = this.wordPatternEnd.exec(text)) {
            if (match[2] != cb.room_slug) {
                cb.log("Matched " + match[2] + " on word end");
                this.wordPatternEnd.lastIndex = 0;
                return match[2];
            }
        }
        while (match = this.wordPatternMiddle.exec(text)) {
            if (match[2] != cb.room_slug) {
                cb.log("Matched " + match[2] + " on word middle");
                this.wordPatternMiddle.lastIndex = 0;
                return match[2];
            }
        }
    }
    //  cb.log("No banned words found");
    return false;
};

autoBot.hasBannedPhrase = function (text) {
    if (!this.haveBadPhrases) {
        // No banned words
        return false;
    } else {
        var match;
        while (match = this.phrasePatternStart.exec(text)) {
            if (match[1] != cb.room_slug) {
                cb.log("Matched " + match[1] + " on phrase start");
                this.phrasePatternStart.lastIndex = 0;
                return match[1];
            }
        }
        while (match = this.phrasePatternEnd.exec(text)) {
            if (match[2] != cb.room_slug) {
                cb.log("Matched " + match[2] + " on phrase end");
                this.phrasePatternEnd.lastIndex = 0;
                return match[2];
            }
        }
        while (match = this.phrasePatternMiddle.exec(text)) {
            if (match[2] != cb.room_slug) {
                cb.log("Matched " + match[2] + " on phrase middle");
                this.phrasePatternMiddle.lastIndex = 0;
                return match[2];
            }
        }
    }
//    cb.log("No banned phrases found");
    return false;
};

autoBot.hasRepeatedChars = function (text) {
    if (cb.settings.blockRepeatedChars == 'Yes') {
        var match;
        while (match = this.repeatedCharPattern.exec(text)) {
            if (!match[2] && !(match[1] == cb.room_slug)) {
                // Only return true if the 'word' isn't an emoticon code

                // Check whitelist
                if (autoBot.repeatedCharWhiteListPattern.test(match[1])) {
//                    cb.log("Whitelisted repeated word");
                    return false;
                }

                // Didn't hit whitelist so this is a rejection
//                cb.log("Found repeated letters");
                this.repeatedCharPattern.lastIndex = 0;
                return match[1];
            }
        }
        // None found so ok
        return false;
    }
    // feature turned off so ok
    return false;
};

autoBot.hasBannedSWord = function (text) {
    if (!this.haveBadSWords) {
        // No S banned words
        return false;
    } else {
        var match;
        while (match = this.SwordPatternStart.exec(text)) {
            if (match[1] != cb.room_slug) {
                this.SwordPatternStart.lastIndex = 0;
                return match[1];
            }
        }
        while (match = this.SwordPatternEnd.exec(text)) {
            if (match[2] != cb.room_slug) {
                this.SwordPatternEnd.lastIndex = 0;
                return match[2];
            }
        }
        while (match = this.SwordPatternMiddle.exec(text)) {
            if (match[2] != cb.room_slug) {
                this.SwordPatternMiddle.lastIndex = 0;
                return match[2];
            }
        }
    }
    return false;
};


autoBot.printBannedItemsMessage = function (user) {
    cb.chatNotice('Banned words and phrases: ' + this.actualBanList, user);
    if (cb.settings.blockRepeatedChars == 'Yes') {
        cb.chatNotice('Messages with lots of repeated characters (e.g. mmmmmmm) are also banned', user);
    }
};

// c: message color
// m: the message text
// user: username of message sender
// f: message font
// in_fanclub: is the user in the broadcasters fan club
// has_tokens: does the user have at least 1 token
// is_mod: is the user a moderator
// tipped_recently: is the user a dark blue?
// gender: m (male), f (female), s (shemale), or c (couple)
autoBot.usage = function (msg) {
    var u = msg['user'];
    cb.chatNotice('Available commands:', u);

    var msgPerms = autoBot.msg2Perm(msg);

    for (var key in autoBot.commands) {
        if (autoBot.commands[key].perms & msgPerms) {
            // Command allowed for this user
            cb.chatNotice(key + autoBot.commands[key].helpText, u);
        }
    }
};

autoBot.silenceUser = function (username) {
    if (this.isSilenced(username)) {
        return false;
    } else {
        this.silenced[username] = 1;
        return true;
    }
};

autoBot.SsilenceUser = function (username) {
    if (this.isSSilenced(username)) {
        return false;
    } else {
        this.Ssilenced[username] = 1;
        return true;
    }
};

autoBot.unSilenceUser = function (username) {
    if (this.isSilenced(username)) {
        delete this.silenced[username];
        delete this.warned[username];
        return true;
    } else {
        return false;
    }
};


autoBot.unSsilenceUser = function (username) {
    if (this.isSSilenced(username)) {
        delete this.Ssilenced[username];
        return true;
    } else {
        return false;
    }
};


autoBot.isSilenced = function (username) {
    return (username in this.silenced);
};

autoBot.isSSilenced = function (username) {
    return (username in this.Ssilenced);
}

autoBot.canControlBot = function (msg) {
    return (msg['user'] == cb.room_slug || msg.is_mod);
};

autoBot.grabSettings = function () {
    if (cb.settings.silenced) {
        var silencedSettings = cb.settings.silenced.replace(/\s+/, ",").split(',');
        for (var ii = 0; ii < silencedSettings.length; ii++) {
            this.silenced[silencedSettings[ii]] = {'u': 1};
        }
    }

    if (cb.settings.badwords) {
        var badWordsSettings = cb.settings.badwords.split(',');
        for (var ii = 0; ii < badWordsSettings.length; ii++) {
            // Trim leading and following spaces
            var clean = badWordsSettings[ii].replace(/^\s+/, "");
            clean = clean.replace(/\s+$/, "");

            // Check still something left to add!
            if (clean.length > 1) {
                if (this.phraseFinder.test(clean)) {
                    // Only add phrases which are long enough (likely to have 2 chars in each word)
                    if (clean.length > 4) {
                        this.addToActualBanList(clean, 'phrase');
                    } else {
                        cb.chatNotice("WARNING: This phrase was too short (must be at least 4 letters long), didn't add to list: " + clean, cb.room_slug);
                    }
                } else {
                    this.addToActualBanList(clean, 'word');
                }
            } else {
                cb.chatNotice("WARNING: This word was too short (must be at least 2 letters long), didn't add to list: " + clean, cb.room_slug)
            }
        }
        this.buildBanLists();
    }
};

autoBot.addToActualBanList = function (item, type) {
    if (type == 'phrase') {
        var lengthBefore = this.actualBannedPhrases.length;
        this.actualBannedPhrases[item] = {u: 1};
        var diff = this.actualBannedPhrases.length - lengthBefore;
        if (diff > 0) {
            return true;
        }
    } else if (type == 'word') {
        var lengthBefore = this.actualBannedWords.length;
        this.actualBannedWords[item] = {u: 1};
        var diff = this.actualBannedWords.length - lengthBefore;
        if (diff > 0) {
            return true;
        }
    } else {
        cb.log("Unrecognised type [" + type + "] for item [" + item + "]");
        return false;
    }
    return false;
};

autoBot.removeFromActualBanList = function (item, type) {
    if (type == 'phrase') {
        var lengthBefore = Object.keys(this.actualBannedPhrases).length;
        delete this.actualBannedPhrases[item];
        var diff = Object.keys(this.actualBannedPhrases).length - lengthBefore;
        if (diff < 0) {
            return true;
        }
    } else if (type == 'word') {
        var lengthBefore = Object.keys(this.actualBannedWords).length;
        delete this.actualBannedWords[item];
        var diff = Object.keys(this.actualBannedWords).length - lengthBefore;
        if (diff < 0) {
            return true;
        }
    } else {
        cb.log("Unrecognised type [" + type + "] for item [" + item + "]");
        return false;
    }
    return false;
};

autoBot.addToActualSBanList = function (item) {
    var lengthBefore = this.actualBannedSWords.length;
    this.actualBannedSWords[item] = {u: 1};
    var diff = this.actualBannedSWords.length - lengthBefore;
    if (diff > 0) {
        return true;
    }
};

autoBot.addToActualSUserBanList = function (item) {
    var lengthBefore = this.actualBannedSUsers.length;
    this.actualBannedSUsers[item] = {u: 1};
    var diff = this.actualBannedSUsers.length - lengthBefore;
    if (diff > 0) {
        return true;
    }
};

autoBot.buildBanLists = function () {
    this.actualBanList = "";
    var maxLineLength = 60;
    var currentLineLength = 0;
    if (Object.keys(this.actualBannedWords).length > 0) {
//        cb.log("have banned words");
        this.haveBadWords = true;
        var localBadWordPattern = '(' + Object.keys(this.actualBannedWords).join('|') + ')';
//        cb.log("Builder: " + localBadWordPattern);
        this.wordPatternStart = new RegExp('^' + localBadWordPattern + '' + this.wordBoundary, 'ig');
        this.wordPatternEnd = new RegExp(this.wordBoundary + localBadWordPattern + '$', 'ig');
        this.wordPatternMiddle = new RegExp(this.wordBoundary + localBadWordPattern + this.wordBoundary, 'ig');
//        this.actualBanList += localBadWordPattern;

        for (var word in this.actualBannedWords) {
            if (currentLineLength == 0) {
                this.actualBanList += word;
                currentLineLength = word.length;
            } else if ((currentLineLength + word.length) > maxLineLength) {
                this.actualBanList += '\n' + word;
                currentLineLength = word.length;
            }
            else {
                this.actualBanList += ',' + word;
                currentLineLength += word.length;
            }
        }
    }
    if (Object.keys(this.actualBannedPhrases).length > 0) {
        this.haveBadPhrases = true;
//        cb.log("have banned phrases");
        var localBadPhrasePattern = '(' + Object.keys(this.actualBannedPhrases).join('|') + ')';
//        cb.log("Builder" + localBadPhrasePattern);
        this.phrasePatternStart = new RegExp('^' + localBadPhrasePattern + this.wordBoundary, 'ig');
        this.phrasePatternEnd = new RegExp(this.wordBoundary + localBadPhrasePattern + '$', 'ig');
        this.phrasePatternMiddle = new RegExp(this.wordBoundary + localBadPhrasePattern + this.wordBoundary, 'ig');
//        this.actualBanList += localBadPhrasePattern;
        for (var word in this.actualBannedPhrases) {
            if (currentLineLength == 0) {
                this.actualBanList += word;
                currentLineLength = word.length;
            } else if ((currentLineLength + word.length) > maxLineLength) {
                this.actualBanList += '\n' + word;
                currentLineLength = word.length;
            }
            else {
                this.actualBanList += ',' + word;
                currentLineLength += word.length;
            }
        }
    }


    if (Object.keys(this.actualBannedSWords).length > 0) {
//        cb.log("have banned words");
        this.haveBadSWords = true;
        var localBadSWordPattern = '(' + Object.keys(this.actualBannedSWords).join('|') + ')';
//        cb.log("Builder: " + localBadWordPattern);
        this.SwordPatternStart = new RegExp('^' + localBadSWordPattern + '' + this.wordBoundary, 'ig');
        this.SwordPatternEnd = new RegExp(this.wordBoundary + localBadSWordPattern + '$', 'ig');
        this.SwordPatternMiddle = new RegExp(this.wordBoundary + localBadSWordPattern + this.wordBoundary, 'ig');
//        this.actualBanList += localBadWordPattern;
    }

    if (Object.keys(this.actualBannedSUsers).length > 0) {
//        cb.log("have banned words");
        this.haveBadSUserPattern = true;
        var localBadSUserPattern = '';
        if (Object.keys(this.actualBannedSUsers).length > 1) {
            localBadSUserPattern = '(' + Object.keys(this.actualBannedSUsers).join('|') + ')';
        } else {
            localBadSUserPattern = Object.keys(this.actualBannedSUsers)[0];
        }
        this.SuserPattern = new RegExp(localBadSUserPattern, 'ig');
    }

};

autoBot.wrapText = function (item, pre, suf) {
    return pre + item + suf;
};

autoBot.init = function () {
    this.grabSettings();

    this.registerCommand('/unsil', ' <username> - unsilence <username>', true, true, false, false, false, false, function (msg, commandParts) {
    });
    this.registerCommand('/silence', ' <username> - silence <username> [<optional reason>]', true, true, false, false, false, false, function (msg, commandParts) {
        var u = msg['user'];
        if (commandParts.length > 0) {
            var commandParam = commandParts.shift();
            if (autoBot.silenceUser(commandParam)) {
                var reason = " probably for breaking room rules.";
                if (commandParts.length > 0) {
                    // Custom reason given
                    reason = " for reason: " + commandParts.join(' ');
                }

                cb.chatNotice('User ' + commandParam + ' has been silenced by ' + u + reason, "", '#F2C7EF', '#000000', 'normal');
                cb.chatNotice('You have been silenced by ' + u + reason, commandParam, '#B32E2E', '#ffffff', 'normal');
                if (cb.settings.allowTipToUnsilence == "Yes") {
                    cb.chatNotice('You can tip ' + cb.settings.tokensToBeUnsilenced + ' tokens or more in one tip to become unsilenced.', commandParam);
                }
            } else {
                cb.chatNotice('User ' + commandParam + ' was already on the silence list.', u);
            }
        } else {
            cb.chatNotice('Invalid /silence command - you need to tell me who to silence', u);
        }
        return msg;
    });
    this.registerCommand('/silencelist', ' - show list of silenced users', true, true, false, false, false, false, function (msg, commandParts) {
        cb.chatNotice('Silence list: ' + Object.keys(autoBot.silenced), msg['user']);
        return msg;
    });
//    this.registerCommand('/silenceMany', 'Silence many', true, true, false, false, false, false, function (msg, commandParts) {
//    });
    this.registerCommand('/amstats', ' - show stats on total messages blocked, users silenced etc.', true, true, false, false, false, false, function (msg, commandParts) {
        var u = msg['user'];
        cb.chatNotice('Auto-moderator stats', u);
        cb.chatNotice('Messages blocked: ' + autoBot.totalMessagesBlocked, u);
        if (cb.settings.hideOrSilence == 'Silence') {
            cb.chatNotice('Warnings issued: ' + autoBot.totalWarnings, u);
            cb.chatNotice('Users silenced: ' + autoBot.totalSilenced, u);
        }
        return msg;
    });
    this.registerCommand('/add', ' <word/phrase> - add word or phrase to banned list for this session only', true, true, false, false, false, false, function (msg, commandParts) {
    });
    this.registerCommand('/addManyWords', ' <words separated by spaces> - add many words at once', true, true, false, false, false, false, function (msg, commandParts) {
    });
    this.registerCommand('/del', ' <word/phrase> - delete word or phrase from banned list for this session only', true, true, false, false, false, false, function (msg, commandParts) {
    });
    this.registerCommand('/mode', ' <hide|silence> - change to hide or silence mode', true, true, false, false, false, false, function (msg, commandParts) {
    });
    this.registerCommand('/protect', ' <username> - protect <username> (they won\'t be moderated by the bot, automatically unsilences them)', true, true, false, false, false, false, function (msg, commandParts) {
    });
    this.registerCommand('/unprotect', ' <username> - unprotect <username> (they will be moderated by the bot again)', true, true, false, false, false, false, function (msg, commandParts) {
    });
    this.registerCommand('/protectlist', ' - show list of protected users', true, true, false, false, false, false, function (msg, commandParts) {
        cb.chatNotice('Protect list: ' + Object.keys(autoBot.protected), msg['user']);
        return msg;
    });
    this.registerCommand('/amhelp', ' - show this help message', true, true, true, true, true, true, function (msg, commandParts) {
        autoBot.usage(msg);
        return msg;
    });
	if(cb.settings.listOnEnter == "Yes")
	{
		this.registerCommand('/list', ' - print list of current banned words', true, true, true, true, true, true, function (msg, commandParts) {
			autoBot.printBannedItemsMessage(msg['user']);
			return msg;
		});
	}
	else
	{
		this.registerCommand('/list', ' - print list of current banned words', true, true, true, false, false, false, function (msg, commandParts) {
			autoBot.printBannedItemsMessage(msg['user']);
			return msg;
		});
	}

	if(cb.settings.listOnEnter == "Yes") // Bobomb Edit
	{
		cb.chatNotice('The auto-moderator bot hides messages containing words or phrases that the broadcaster has banned. It may also automatically silence all messages from users who repeatedly use these words.\nIf one of your messages is hidden you will be notified to help you avoid it in future.');
		this.printBannedItemsMessage();
		cb.chatNotice('The auto-moderator bot was written by asdfghjkl28 and modified to the Obfuscator bot by Bobomb. If you like the bot, you can thank either of them by tipping your favourite model.')
	}
	cb.chatNotice('To see the available commands, type /amhelp into the chat window', cb.room_slug);
};

autoBot.init();
