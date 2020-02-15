/**
 * App: roomManager
 * Version: 1.0.0
 * Author: noud41
 */

cb.settings_choices = [
    {name: 'room', type: 'str', label: 'Room title'},
    {name: 'panelImage', type: 'str', label: 'Panel image'},
    {name: 'panelText', type: 'str', label: 'Panel text'},
    {name: 'panelTextColor', type: 'str', label: 'Panel text color'},
    {name: 'panelTextTop', type: 'str', label: 'Panel text top'},
    {name: 'panelTextLeft', type: 'str', label: 'Panel text left'},
    {name: 'panelTextFontSize', type: 'str', label: 'Panel text font size'}
];

var images = {
    brb: '96349a24-b717-4a3d-aca1-46ea1cd6b5cb',
    kisses: 'a78c3fa9-4091-4a53-929e-8754b814d97a',
    what: '56e5c9fe-8671-48dd-80be-c7aa885fd694',
    wink: 'b222730f-7983-48ae-80fc-4f2c20c7936c'
};

cb.onDrawPanel(function (user) {
    var image = '';
    switch(cb.settings.panelImage) {
        case 'brb':
            image = images.brb;
          break;
        case 'kisses':
            image = images.kisses;
          break;
        case 'what':
            image = images.what;
            break;
        case 'wink':
            image = images.wink;
            break;
        default:
            image = images.brb;
    }

    var text = getPanelText();
    // const color = cb.settings.panelTextColor ? cb.settings.panelTextColor : 'green';
    // const fontSize = cb.settings.panelTextFontSize ? cb.settings.panelTextFontSize : '14';
    const color = cb.settings.panelTextColor;
    const fontSize = cb.settings.panelTextFontSize;

    // imageMargin and text positioning
    const top = cb.settings.panelTextTop;
    const left = cb.settings.panelTextLeft;
    // @todo make this variable
    // const imageMargin = 150;
    // const left = cb.settings.panelTextLeft + imageMargin;


    return {
        "template": "image_template",
        "layers": [
            {'type': 'image', 'fileID': image},
            {
                'type': 'text',
                'text': text,
                'left': left,
                'top': top,
                'font-size': fontSize,
                'color': color,
            },
          ],
      };
  
});

// onHandles

cb.onEnter(function (user) {
    const userName = getUserName(user['user']);
    cb.chatNotice('Hoi welcome ' + userName + '! (be fun)');
});

cb.onLeave(function (user) {
    const userName = getUserName(user['user']);
    cb.chatNotice('Houdoe bye ' + userName + '! (be fun)');
});

cb.onMessage(function (msg) {
    const userName = getUserName(msg['user']);
    const params = getParams(msg['m']);

    if (msg['user'] == cb.room_slug) {
        if (msg['m'].match(/\/room/i)) {
            cb.changeRoomSubject(params)
            cb.settings.room = params;
        }

        if (msg['m'].match(/\/cam_limit/i)) {
            cb.limitCam_start(params);
        }

        if (msg['m'].match(/\/cam_unlimit/i)) {
            cb.limitCam_stop();
        }
        
        if (msg['m'].match(/\/panel/i)) {
            cb.drawPanel();
        }

        if (msg['m'].match(/\/panel_image/i)) {
            cb.settings.panelImage = params;
        }

        if (msg['m'].match(/\/panel_text/i)) {
            cb.settings.panelText = params;
        }

        // experiment
        if (msg['m'].match(/\/flash/i)) {
            cb.chatNotice('>>flash **' + userName + '** flash<< !');
        }
        
        // if (msg['m'].match(/\/say/i)) {
        //     cb.chatNotice('' + userName + ' says ' + params);
        // }
    }
});

cb.onTip(function (tip) {
    tipCounter += parseInt(tip['amount']);
    cb.drawPanel();
});

// utility

function getUserName(user) {
    userName = user.replace(/\d+$/, '');
    return userName.replace(/_+$/,'');
};

function getPanelText() {
    // @todo limit to 27 chars
    // let's code and love black d
    panelText = cb.settings.panelText ? cb.settings.panelText : 'Howdy';
    return panelText;
};

function getParams(message) {
    const separator = " ";
    var messageArray = message.split(separator);
    messageArray.shift();
    return messageArray.join(separator);
};

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
    cb.changeRoomSubject(cb.settings.room);
    // advertise();
    //  cb.settings.tokens
    const roomSubject = 'room';
    cb.changeRoomSubject(roomSubject);
}
init();