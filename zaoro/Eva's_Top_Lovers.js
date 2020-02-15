// http://www.rlc-cams.com/apps/user_uploads/2/zaoro/
// http://www.rlc-cams.com/apps/sourcecode/evas-top-lovers/?version=&slot=2

// Top Eva's Top Lovers Today
// Author: :)

var OWNER_FLAG = 32;
var MODERATOR_FLAG = 16;
var FANCLUB_FLAG = 8;
var DKBLUE_FLAG = 4;
var LTBLUE_FLAG = 2;
var GREY_FLAG = 1;

var topn = {

        commands: {},
        registerCommand: function (command, helpText, owner, moderator, fanclub, dkblue, ltblue, grey, method) {
            "use strict";
            this.commands[command] = {method: method, helpText: helpText, perms: this.bool2Perm(owner, moderator, fanclub, dkblue, ltblue, grey)};
        },
        checkCommand: function (msg) {
            "use strict";
            var m = msg.m;
            var u = msg.user;

            if (m[0] === '/') {
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
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },

        bool2Perm: function (owner, moderator, fanclub, dkblue, ltblue, grey) {
            "use strict";
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
            "use strict";
            var perms = 0;
            perms = msg.user === cb.room_slug ? perms | OWNER_FLAG : perms;
            perms = msg.is_mod ? perms | MODERATOR_FLAG : perms;
            perms = msg.in_fanclub ? perms | FANCLUB_FLAG : perms;
            perms = msg.tipped_recently ? perms | DKBLUE_FLAG : perms;
            perms = msg.has_tokens ? perms | LTBLUE_FLAG : perms;
            perms = perms === 0 ? perms | GREY_FLAG : perms;
            return perms;
        },

        name: "Eva's Top Lovers Today",

// Useful globals
        wordBoundary: "(\\s|\\b)",

// Data structures for tippers and settings
        tippers: {},

        numberToShow: 6,
        interval: 10 * 60000,

        topNTippers: [],
        topNString: 'No lovers yet',
        topNCurrentCount: 0,
        changeThreshold: 0,
        lastNotice: new Date().getTime()

    }
    ;

// CB app settings
cb.settings_choices = [
    {name: 'nShow', label: 'Number of top lovers to show', type: 'int', minValue: 1, maxValue: 10, defaultValue: 6, required: true},
    {name: 'timer', label: 'Interval between displaying top lovers (minutes)', type: 'int', minValue: 1, defaultValue: 10, required: false}

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
    "use strict";
    return topn.onMessage(msg);
});

cb.onTip(function (tip) {
    "use strict";
    topn.onTip(tip);
});

//cb.onEnter(function (user) {
//   "use strict";
//    topn.onEnter(user);
//});

// Main on message callback function
topn.onMessage = function (msg) {
    "use strict";

    var newMsg = topn.checkCommand(msg);
    if (newMsg) {
        return newMsg;
    }

    return msg;
}
;

topn.onTip = function (tip) {
    "use strict";
    var amountTipped = parseInt(tip.amount, 10);

    var username = tip.from_user;

    if (!topn.tippers[username]) {
        topn.tippers[username] = {name: username, tips: 0, hightip: 0};
    }

    if (!topn.tippers[username].tips) {
        topn.tippers[username].tips = 0;
    }
    if (!topn.tippers[username].hightip) {
        topn.tippers[username].hightip = 0;
    }

    topn.tippers[username].tips += amountTipped;
    topn.tippers[username].tiptime = new Date().getTime();

    if (topn.tippers[username].tips > topn.changeThreshold) {
        topn.checkHighTippers();
    }
};

topn.checkHighTippers = function () {
    var ij = 0;
    var newHighTippers = objectToArray(topn.tippers);

//    newHighTippers.sort(dynamicSort('-tips'));
    newHighTippers.sort(dynamicSortMultiple('-tips','tiptime'));

    var topN = newHighTippers.slice(0, topn.numberToShow);

    topn.topNCurrentCount = topN.length;

    if (topn.topNCurrentCount == topn.numberToShow) {
        cb.log("ChangeThreshold changed: " + topn.changeThreshold);
        topn.changeThreshold = topN[topN.length - 1].tips;
    }

//    var top3Strings = [];
//    for (ij = 0; ij < topN.length; ij++) {
//        top3Strings[ij] = topN[ij].name + ": " + topN[ij].tips;
//    }

    topn.topNString = '';
    for (ij = 0; ij < topN.length; ij++) {
        topn.topNString += "\n" + topN[ij].name + ": " + topN[ij].tips;
    }
    topn.showTopTippers();
};

topn.showTopTippers = function () {
    if (topn.topNCurrentCount > 0) {
        cb.chatNotice('Top ' + topn.numberToShow + ' lovers today:' + topn.topNString);
        topn.lastNotice = new Date().getTime();
    }
};

topn.intervalPrinter = function () {
    var now = new Date().getTime();
    var gap = now - topn.lastNotice;

    if (gap >= topn.interval) {
        // Last time we showed the list was more than the interval ago
        topn.showTopTippers();
        cb.setTimeout(topn.intervalPrinter, topn.interval);
    } else {
        // Last time was more recent than the interval, so set new timer for the remaining time
        cb.setTimeout(topn.intervalPrinter, topn.interval - gap);
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
topn.usage = function (msg) {
    "use strict";
    var u = msg.user;
    cb.chatNotice('Available commands:', u);

    var msgPerms = topn.msg2Perm(msg);

    for (var key in topn.commands) {
        if (topn.commands[key].perms & msgPerms) {
            // Command allowed for this user
            cb.chatNotice(key + topn.commands[key].helpText, u);
        }
    }
};

topn.grabSettings = function () {
    "use strict";
    if (cb.settings.timer) {
        topn.interval = cb.settings.timer * 60000;
    }
    if (cb.settings.nShow) {
        topn.numberToShow = cb.settings.nShow;
    }
};

topn.wrapText = function (item, pre, suf) {
    "use strict";
    return pre + item + suf;
};

topn.init = function () {
    "use strict";
    this.grabSettings();

    this.registerCommand('/ttthelp', ' - show this help message', true, true, true, true, true, true, function (msg, commandParts) {
        topn.usage(msg);
        return msg;
    });
//    this.registerCommand('/ttlist', ' - print list of all tippers', true, true, true, true, true, true, function (msg, commandParts) {
//        topn.printBannedItemsMessage(msg.user);
//        return msg;
//
//    });

    cb.chatNotice('The ' + topn.name + ' tracks all of today\'s lovers and lists the top ' + topn.numberToShow);
    
    cb.setTimeout(topn.intervalPrinter, topn.interval);

};

topn.init();


// Start Helper functions section
function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1, property.length - 1);
    }
    var sortfunc = function (a, b) {
        if (typeof a[property] === "undefined") {
            if (typeof b[property] === "undefined") {
                // both undef
                return 0;
            } else {
                // b ok, a undef
                return -1;
            }
        }
        if (typeof b[property] === "undefined") {
            if (typeof a[property] === "undefined") {
                // both undef
                return 0;
            } else {
                // a ok, b undef
                return 1;
            }
        }

        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    };
    return sortfunc;
}

function dynamicSortMultiple() {
    /*
     * save the arguments object as it will be overwritten
     * note that arguments object is an array-like object
     * consisting of the names of the properties to sort by
     */
    var props = arguments;
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;
        /* try getting a different result from 0 (equal)
         * as long as we have extra properties to compare
         */
        while(result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}

function objectToArray(myObj) {
    var arr = [];
    for (var i in myObj) {
        if (myObj.hasOwnProperty(i)) {
            arr.push(myObj[i]);
        }
    }
    return arr;
}
