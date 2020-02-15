// https://chaturbate.com/apps/user_uploads/1/justin/
// https://chaturbate.com/apps/sourcecode/secret-show/?version=&slot=1

//  Title:	Secret Show
//  Author: justin
//  Version: 1.0 (11/27/2013)

cb.settings_choices = [
    {name: 'min_start_tokens', type: 'int', minValue: 1, maxValue: 1000, defaultValue: 100, label: "Cost to Join Before Show Starts"},
    {name: 'min_join_tokens', type: 'int', minValue: 0, maxValue: 1000, defaultValue: 100, label: "Cost to Join During Show. Set to 0 to Disable Joining During Show."},
    {name: 'hide_message', label: 'Cam Message', type: 'str', minLength: 1, maxLength: 256, defaultValue: 'Secret Show in progress! Tip at least 100 tokens to join in on the fun!' },
];

cb.onTip(function(tip) {
    if (!cbjs.arrayContains(cb.limitCam_allUsersWithAccess(), tip['from_user'])) {
        if(!cb.limitCam_isRunning() && parseInt(tip['amount']) >= cb.settings.min_start_tokens) {
            output('Added '+ tip['from_user'] + ' to secret show!');
            cb.limitCam_addUsers([tip['from_user']]);
        }
        if(cb.limitCam_isRunning() && parseInt(tip['amount']) >= cb.settings.min_join_tokens && cb.settings.min_join_tokens > 0) {
            output('Added '+ tip['from_user'] + ' to secret show!');
            cb.limitCam_addUsers([tip['from_user']]);
        }
    }
});

cb.onMessage(function (msg) {
    var message = msg['m'];
    var user = msg['user'];
    var username = "";

    if (cb.room_slug === user && message == '/start' && !cb.limitCam_isRunning()) {
        output(cb.room_slug + ' has started the show!');
        cb.limitCam_start(cb.settings.hide_message);
    }

    if (cb.room_slug === user && message == '/stop' && cb.limitCam_isRunning()) {
        output(cb.room_slug + ' has stopped the show!');
        cb.limitCam_stop();
    }

    if (cb.room_slug === user && message.substring(0, 7) == '/remove' && cb.limitCam_allUsersWithAccess().length > 0 && cb.limitCam_isRunning()) {
        username = message.substring(8, message.length);
        if (cbjs.arrayContains(cb.limitCam_allUsersWithAccess(), username)) {
            cb.limitCam_removeUsers([username]);
            output(cb.room_slug + ' has removed ' + username + ' from the show!');
        }
    }
    
    if (cb.room_slug === user && message.substring(0, 6) == '/check') {
        username = message.substring(7, message.length);
        if (cb.limitCam_userHasAccess(username)) {
            output(username + " is in the show!");
        }
        else {
            output(username + " is not in the show!");
        }
    }

    if (cb.room_slug === user && message === '/list') {
        var userlist = cb.limitCam_allUsersWithAccess();
        if (userlist.length > 0) {
            output("" + userlist.length + (userlist.length > 1 ? " users" : " user") + " in show: " + cbjs.arrayJoin(userlist, ", "));
        }
        else {
            output("No users in show.");
        }
    }

    if (message[0] == '/') {
        msg['X-Spam'] = true;
    }
    return msg;
});

function output(message) {
    cb.chatNotice(message);
}
