// https://chaturbate.com/apps/user_uploads/1/zingknaat/
// https://chaturbate.com/apps/sourcecode/perv-alert/?version=&slot=1

/**
 * Bot: Perv Alert
 * Version: 1.00
 * Author: zingknaat
 * Date: 02.02.14
 */

/** BIG THANKS TO DISCONNECTING FOR THE AWESOME PERVYMINION4 GIF! **/

cb.settings_choices = [
    {name: 'usernames', type: 'str', label: 'Usernames of Pervs (separate each with a comma (,). Example: dynasty87, oksagen, chaiasian', }
];

var pervertedList = [];

function updatePervertedList() {
    if (pervertedList.length == 0) {
        var usernames = cb.settings.usernames;
        if (usernames != undefined) {
            usernames = usernames.split(',');
            for(var i=0;i < usernames.length; i++) {
                if (!userInPervertedList(usernames[i].trim())) {
                    pervertedList.push(usernames[i].trim());
                }
            }        
        }
        
    }
    return pervertedList;
}

function userInPervertedList(username) {
    if (pervertedList.indexOf(username) >= 0) {
        return true;
    }
    return false;
}

function addPerv(username) {
    if (!userInPervertedList(username)) {
        pervertedList.push(username);
        cb.sendNotice(username + " has been added to the pervered list.", cb.room_slug);
    }
}

cb.onEnter(function(user) {
    if (userInPervertedList(user['user'])) {
        var notices = ":pervyminion4  \n";
        notices += "***** " + user['user'].toUpperCase() + " IS HERE! *****";
        cb.sendNotice(notices, '', '', '#CC0000', 'bold');
    }
});

cb.onMessage(function(msg) {
    if((msg['user'] == cb.room_slug) && (msg['m'].match(/\/addperv/i))) {
        msg['X-Spam'] = true;
        var userMsg = msg['m'].trim().split(' ');
        addPerv(userMsg[1].trim());
    }
});

function init() {
    updatePervertedList();
    cb.sendNotice("Perv Alert by zingknaat \nType /addperv <username> to add a user to the perverted list.", cb.room_slug, '#888888', '#FFFFFF', 'bold');
}

init();
