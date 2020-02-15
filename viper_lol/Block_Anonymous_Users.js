// https://chaturbate.com/apps/user_uploads/1/viper_lol/
// https://chaturbate.com/apps/sourcecode/block-anonymous-users/?version=&slot=1

//Written by Viper

cb.onEnter(function(user) {
    if (!cbjs.arrayContains(cb.limitCam_allUsersWithAccess(), user['user'])) {
        cb.limitCam_addUsers([user['user']]);
        cb.chatNotice("Hello, " +user['user']+ ". As a registered user you can view " +cb.room_slug+"'s cam.", user['user'], '#fcb2bf', '#000000', 'bold');
    }
    if (cbjs.arrayContains(cb.limitCam_allUsersWithAccess(), user['user'])) {
        cb.chatNotice("Welcome back, " +user['user']+ ". As a registered user you can view " +cb.room_slug+"'s cam.", user['user'], '#fcb2bf', '#000000', 'bold');
    }
});

cb.onMessage(function(msg) {
    if (!cbjs.arrayContains(cb.limitCam_allUsersWithAccess(), msg['user'])) {
        cb.limitCam_addUsers([msg['user']]);
        cb.chatNotice("Hello, " +msg['user']+ ". As a registered user you can view " +cb.room_slug+"'s cam.", msg['user'], '#fcb2bf', '#000000', 'bold');
    }
    return msg; 
});

function init() {
    cb.limitCam_start("Now blocking anonymous viewers. If you are a registered user please type a message in the chat or refresh!");
    cb.chatNotice("Now blocking anonymous viewers!", '', '#fcb2bf', '#000000', 'bold');
    cb.chatNotice("If you are signed in and can't see " +cb.room_slug+"'s cam, refresh the page or type in the chat.", '', '#fcb2bf', '#000000', 'bold');
}

init();
