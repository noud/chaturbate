/**
 * App: roomManager
 * Version: 1.0.0
 * Author: noud41
 */

const colorCodeGreen = '#008000';
const colorCodeBlue = '#0000FF';

const panelTextColorDefaultValue = 'green';
const panelImageDefaultValue = 'fuck';

cb.settings_choices = [
    {name: 'room', type: 'str', minLength: 1, maxLength: 270, label: 'Room title'},
    {name: 'panelImage', type:'choice', label: 'Panel image',
        choice1: 'ass',
        choice2: 'brb',
        choice3: panelImageDefaultValue,
        choice4: 'hello',
        choice5: 'kisses',
        choice6: 'what',
        choice7: 'wink',
        defaultValue: panelImageDefaultValue
    },
    {name: 'panelText1', type: 'str', label: 'Panel text 1'},
    {name: 'panelText2', type: 'str', label: 'Panel text 2'},
    {name: 'panelText3', type: 'str', label: 'Panel text 3'},
    {name: 'panelTextColor', type:'choice', label: 'Panel text color',
        choice1: 'yellow',
        choice2: 'red',
        choice3: panelTextColorDefaultValue,
        choice4: 'black',
        defaultValue: panelTextColorDefaultValue
    },
    {name: 'panelTextTop', type: 'int', minValue: 0, maxValue: 100, defaultValue: 48, label: 'Panel text top'},
    {name: 'panelTextLeft', type: 'int', minValue: 0, maxValue: 270, defaultValue: 100, label: 'Panel text left'},
    {name: 'panelTextFontSize', type: 'int', label: 'Panel text font size'}
];

var images = {
    ass: '6735e182-6178-46a1-a7cf-79c0ea86fa77',
    brb: '96349a24-b717-4a3d-aca1-46ea1cd6b5cb',
    fuck: '90284acc-63cc-440a-b4b1-600f7cce31c0',
    hello: 'a0ecf610-7516-41eb-9f1c-ebdc7feec449',
    kisses: 'a78c3fa9-4091-4a53-929e-8754b814d97a',
    what: '56e5c9fe-8671-48dd-80be-c7aa885fd694',
    wink: 'b222730f-7983-48ae-80fc-4f2c20c7936c'
};

cb.onDrawPanel(function (user) {
    var image = '';
    switch(cb.settings.panelImage) {
        case 'ass':
            image = images.ass;
            break;
        case 'brb':
            image = images.brb;
            break;
        case 'fuck':
            image = images.fuck;
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
        case 'hello':
        default:
            image = images.hello;
    }

    var text1 = getPanelText1();
    var text2 = getPanelText2();
    var text3 = getPanelText3();
    const color = cb.settings.panelTextColor;
    const fontSize = cb.settings.panelTextFontSize;
    const fontSpacing = 24;

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
                'text': text1,
                'top': top - (fontSpacing * 2),
                'left': left,
                'font-size': fontSize,
                'color': color,
            },
            {
                'type': 'text',
                'text': text2,
                'top': top - fontSpacing,
                'left': left,
                'font-size': fontSize,
                'color': color,
            },
            {
                'type': 'text',
                'text': text3,
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
    cb.chatNotice('Hoi welcome ' + userName + '! (be fun)', null, null, colorCodeGreen);
});

cb.onLeave(function (user) {
    const userName = getUserName(user['user']);
    cb.chatNotice('Houdoe bye ' + userName + '! (be fun)', null, null, colorCodeBlue);
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
        if (msg['m'].match(/\/panel_text_color/i)) {
            cb.settings.panelTextColor = params;
        }

        // @todo clean this
        if (msg['m'].match(/\/panel_text_1/i)) {
            cb.settings.panelText1 = params;
        }
        if (msg['m'].match(/\/panel_text_2/i)) {
            cb.settings.panelText2 = params;
        }
        if (msg['m'].match(/\/panel_text_3/i)) {
            cb.settings.panelText3 = params;
        }
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

// @todo clean this

function getPanelText1() {
    // @todo limit to 27 chars
    // let's code and love black d
    panelText1 = cb.settings.panelText1 ? cb.settings.panelText1 : 'so';
    return panelText1;
};

function getPanelText2() {
    // @todo limit to 27 chars
    // let's code and love black d
    panelText2 = cb.settings.panelText2 ? cb.settings.panelText2 : 'nice';
    return panelText2;
};

function getPanelText3() {
    // @todo limit to 27 chars
    // let's code and love black d
    panelText3 = cb.settings.panelText3 ? cb.settings.panelText3 : 'nice';
    return panelText3;
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
}

function init() {
    cb.changeRoomSubject(cb.settings.room);
}
init();