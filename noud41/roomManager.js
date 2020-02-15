/**
 * App: roomManager
 * Version: 1.0.0
 * Author: noud41
 */

cb.settings_choices = [
    {name: 'prize_1', type: 'str', label: 'Prize for rolling 1'},
];


cb.onTip(function (tip) {
    tipCounter += parseInt(tip['amount']);
    if (parseInt(tip['amount']) >= cb.settings.tokens) {
    } else {
        cb.drawPanel();
    }
});

var backgroundImage = '96349a24-b717-4a3d-aca1-46ea1cd6b5cb';
cb.drawPanel(function (user) {
    return {
        "template": "image_template",
        "layers": [
            {'type': 'image', 'fileID': backgroundImage},
        ],
      };
  
});

function getUserName(user) {
    userName = user.replace(/\d+$/, '');
    return userName.replace(/_+$/,'');
};

cb.onEnter(function (user) {
    const userName = getUserName(user['user']);
    cb.chatNotice('Hoi welcome ' + userName + '! (be fun)');
    showAppAd(user['user']);
});

cb.onLeave(function (user) {
    const userName = getUserName(user['user']);
    cb.chatNotice('Houdoe bye ' + userName + '! (be fun)');
});

cb.onMessage(function (msg) {
    const userName = getUserName(msg['user']);
  
    if (msg['m'].match(/\/say/i)) {
        const separator = " ";
        var resArray = msg['m'].split(separator);
        resArray.shift();
        var talk = resArray.join(separator);
        cb.chatNotice('' + userName + ' says ' + talk);
    }
    
    if (msg['m'].match(/\/brb/i)) {
        cb.drawPanel();
    }

    if (msg['m'].match(/\/flash/i)) {
        cb.chatNotice('>>flash **' + userName + '** flash<< !');
    }
});


function advertise() {
    showAppAd();
    cb.setTimeout(advertise, parseInt(cb.settings.notice_wait_time) * 60000);
}

function showAppAd(username) {
    // var msg = "welcome to have you on board";
    // msg += "Type \"/say talk\" to talk.";
    // msg += "Type \"/flash\" to flash.";
    // cb.sendNotice(msg, username, '', '#15A6B0', 'bold');
}

function init() {
    advertise();
    // roomSubject = 'room (roll the dice if you like. it\'s ' + (cb.settings.tokens + 1) + ' tokens to roll the dice!)';
    const roomSubject = 'room';
    cb.changeRoomSubject(roomSubject);
}
init();