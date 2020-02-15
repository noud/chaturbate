// https://ru.chaturbate.com/apps/user_uploads/0/kiminoegao90/
// https://ru.chaturbate.com/apps/sourcecode/pm-tokens/?version=&slot=0

// https://ru.chaturbate.com/apps/user_uploads/0/spainn76/
// https://ru.chaturbate.com/apps/sourcecode/pm-tokens-manu/?version=&slot=0

/**
 * Bot: Private Messages
 * Version: 1.02
 * Author: zingknaat
 * Date: 01.24.14
 */

cb.settings_choices = [
    {name: 'tokens', type: 'int', label: 'Cost per Message (in tokens; 0 = free)', defaultValue: 1},
    {name: 'notice_wait_time', type: 'choice', label: 'Notification Time (in minutes)',
        choice1: 1, choice2: 2, choice3: 3, choice4: 4, choice5: 5, choice6: 10, choice7: 15, choice8: 20, choice9: 25, choice10: 30,
        choice11: 45, choice12: 60, defaultValue: 10}
];

cb.onEnter(function(user) {
   advertise(user['user']); 
});

cb.onTip(function(tip) {
    if (parseInt(tip['amount']) >= cb.settings.tokens) {
        var messageQty = Math.floor(parseInt(tip['amount'])/cb.settings.tokens);
        updateSpecialUsers(tip['from_user'], messageQty, true);
        if (!isFreeMessages()) {
            cb.sendNotice("You now have " + getUserMessageQty(tip['from_user']) + " message(s) to send.", tip['from_user'], "#FF00FF", "", "bold");
        }
    }
});

cb.onMessage(function(msg) {
    if(msg['m'][0] == '@') {
        msg['X-Spam'] = true;
        var msgArray = msg['m'].split(' ');
        var toUser = msgArray[0].substr(1);
        msgArray.shift();
        var message = msgArray.join(' ');
        sendMessage(msg['user'], toUser, message);
    }
    return msg;
});

var specialUsers = []; // users that can send messages

function isFreeMessages() {
    if (cb.settings.tokens) return false;
    return true;
}

function sendMessage(fromUser, toUser, message) {
    if (fromUser == toUser) {
        cb.sendNotice("Sending a message to yourself is just silly, don't you think?", fromUser, '', '', 'bold');
    } else {
        if (userCanSendMessage(fromUser)) {
            cb.sendNotice("      tipped 1 token" + fromUser + ": " + message, toUser, "#FFFF00", "", "bold");
            cb.sendNotice("To reply, type @" + fromUser + " and your message.", toUser);
            cb.sendNotice("Message successfully sent to " + toUser + "!", fromUser);
            if (!isFreeMessages() && (fromUser != cb.room_slug)) {
                updateSpecialUsers(fromUser, 1);
                cb.sendNotice("You now have " + getUserMessageQty(fromUser) + " message(s) to send.", fromUser, "#9494FF", "", "bold");
            }
        } else {
            cb.sendNotice("Sorry. You must tip " + cb.settings.tokens + " token(s) to send one (1) message.", fromUser, "", "", "bold");
        }
    }
    
}

function getSpecialIndex(user) {
    if (specialUsers.length) {
        for (var i=0;i<specialUsers.length;i++) {
            if (specialUsers[i].indexOf(user) >= 0) {
                return i
            }
        }
    }
    return null;
}

function updateSpecialUsers(user, messageQty, add) {
    var userIndex = getSpecialIndex(user);
    
    if (userIndex != null) {
        if (add) {
            specialUsers[userIndex][1] += messageQty;
        } else {
            if (specialUsers[userIndex][1] > 0) {
                specialUsers[userIndex][1] -= messageQty;
                if (specialUsers[userIndex][1] < 0) specialUsers[userIndex][1] = 0;
            }
        }
        
    } else {
        specialUsers.push([user, messageQty]);
    }
}

function userCanSendMessage(user) {
    if (user == cb.room_slug) return true;
    if (!isFreeMessages()) {
        var userIndex = getSpecialIndex(user);
        if (userIndex != null) {
            var messageQty = specialUsers[userIndex][1];
            if (messageQty > 0) {
                return true;
            }
        }
        return false;
    }
    return true;
}

function getUserMessageQty(user) {
    var userIndex = getSpecialIndex(user);
    if (userIndex != null) {
        var messageQty = specialUsers[userIndex][1];
        return messageQty;
    }
    return 0;
}

function advertise(user) {
    if (user == undefined) {
        user = '';
    }
    var notices = "Private Messages by Kiminoegao90 \n";
    notices += 'Type "@username message" to send a private message to a user in this room.\n';
    notices += 'Example: @' + cb.room_slug + ' Hi. How are you?\n';
    if (isFreeMessages()) {
        notices += "You do not need to tip to message anyone today.";
    } else {
        notices += "Cost per message: " + cb.settings.tokens + " token(s)";
    }
    
    cb.sendNotice(notices, user, '', '#FF0000', 'bold');
    
    if (!user) cb.setTimeout(advertise, cb.settings.notice_wait_time * 60000)
    
}

function init() {
    advertise();
}

init();
