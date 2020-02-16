/**
 * App: roomManager
 * Version: 1.0.0
 * Author: noud41
 * Readme: https://github.com/noud/chaturbate/blob/master/noud41/roomManager.md
 */

const colorYellow = 'yellow';
const colorRed = 'red';
const colorGreen = 'green';
const colorBlue = 'blue';
const colorBlack = 'black';

const colorCodeGreen = '#008000';
const colorCodeBlue = '#0000FF';

// Panel

const panelImageDefaultValue = 'fuck';

const panelText1 = 'so';
const panelText2 = 'nice';
const panelText3 = 'code loves';

const panelTextColorDefaultValue = colorGreen;

// Chat

const chatTextMaxLength = 270;

// Panel 270 X 69 pixels

const panelMin = 0;
const panelTop = 270;
const panelLeft = 69;

const panelTopMin = panelMin;
const panelTopMax = panelTop;
const panelLeftMin = panelMin;
const panelLeftMax = panelLeft;

const panelImageTopMin = panelTopMin;
const panelImageTopMax = panelTopMax;
const panelImageLeftMin = panelLeftMin;
const panelImageLeftMax = panelLeftMax;

const panelTextMax = 27;

const panelTextTopMin = panelTopMin;
const panelTextTopMax = panelTopMax;
const panelTextLeftMin = panelLeftMin;
const panelTextLeftMax = panelLeftMax;

cb.settings_choices = [
    // Room
    {name: 'room', type: 'str', minLength: 0, maxLength: 70, label: 'Room title'},
    // onHandles
    {name: 'enterMessage', type: 'str', minLength: 0, maxLength: chatTextMaxLength, label: 'Enter message'},
    {name: 'enterColor', type:'choice', label: 'Enter color',
        choice1: colorYellow,
        choice2: colorRed,
        choice3: colorGreen,
        choice4: colorBlue,
        choice5: colorBlack,
        defaultValue: colorCodeGreen
    },
    {name: 'leaveMessage', type: 'str', minLength: 0, maxLength: chatTextMaxLength, label: 'Leave message'},
    {name: 'leaveColor', type:'choice', label: 'Leave color',
        choice1: colorYellow,
        choice2: colorRed,
        choice3: colorGreen,
        choice4: colorBlack,
        defaultValue: colorCodeBlue
    },
    // Panel
    // Panel Image
    {name: 'panelImage', type:'choice', label: 'Panel image',
        choice1: 'ass',
        choice2: 'brb',
        choice3: panelImageDefaultValue,
        choice4: 'hello',
        choice5: 'kisses',
        choice6: 'suck',
        choice7: 'what',
        choice8: 'wink',
        defaultValue: panelImageDefaultValue
    },
    {name: 'panelImageLeft', type: 'int', minValue: panelImageTopMin, maxValue: panelImageTopMax, defaultValue: 0, label: 'Panel image left'},
    {name: 'panelImageTop', type: 'int', minValue: panelImageLeftMin, maxValue: panelImageLeftMax, defaultValue: 0, label: 'Panel image top'},
    {name: 'panelImageOpacity', type: 'int', minValue: 0, maxValue: 1, defaultValue: 1, label: 'Panel image opacity'},  // @todo double
    // Panel Text
    {name: 'panelText1', defaultValue: panelText1, type: 'str', minLength: 0, maxLength: panelTextMax, label: 'Panel text 1'},
    {name: 'panelText2', defaultValue: panelText2, type: 'str', minLength: 0, maxLength: panelTextMax, label: 'Panel text 2'},
    {name: 'panelText3', defaultValue: panelText3, type: 'str', minLength: 0, maxLength: panelTextMax, label: 'Panel text 3'},
    {name: 'panelTextColor', type:'choice', label: 'Panel text color',
        choice1: colorYellow,
        choice2: colorRed,
        choice3: panelTextColorDefaultValue,
        choice4: colorBlack,
        defaultValue: panelTextColorDefaultValue
    },
    {name: 'panelTextLeft', type: 'int', minValue: panelTextTopMin, maxValue: panelTextTopMax, defaultValue: 0, label: 'Panel text left'},
    {name: 'panelTextTop', type: 'int', minValue: panelTextLeftMin, maxValue: panelTextLeftMax, defaultValue: 0, label: 'Panel text top'},
    {name: 'panelTextFontSize', type: 'int', label: 'Panel text font size'},
    // design
    {name: 'panelTextFontSpacing', type: 'int', minValue: 12, maxValue: 46, defaultValue: 24, label: 'Panel text font spacing'}
];

var images = {
    ass: '6735e182-6178-46a1-a7cf-79c0ea86fa77',
    brb: '96349a24-b717-4a3d-aca1-46ea1cd6b5cb',
    fuck: '90284acc-63cc-440a-b4b1-600f7cce31c0',
    hello: 'a0ecf610-7516-41eb-9f1c-ebdc7feec449',
    kisses: 'a78c3fa9-4091-4a53-929e-8754b814d97a',
    suck: '4842d1ea-ae15-411b-a41c-1eda7bd85ce4',
    // weed: '7df8979a-1b66-49e0-905d-7bbddd242f6e',
    // weed: 'accbe726-1503-4fdc-94fa-3d5e4fcd537f',
    weed: 'ee7eee18-caee-425f-8502-fbb9d7fae342',
    what: '56e5c9fe-8671-48dd-80be-c7aa885fd694',
    wink: 'b222730f-7983-48ae-80fc-4f2c20c7936c'
};

cb.onDrawPanel(function (user) {
    const color = cb.settings.panelTextColor;
    const fontSize = cb.settings.panelTextFontSize;
    const fontSpacing = cb.settings.panelTextFontSpacing;

    // imageMargin and text positioning
    const top = cb.settings.panelTextTop;
    const left = cb.settings.panelTextLeft;
    // @todo make this variable
    // const imageMargin = 150;
    // const left = cb.settings.panelTextLeft + imageMargin;

    const imageLayer = {
        'type': 'image',
        'fileID': images[cb.settings.panelImage],
        'left':  cb.settings.panelImageLeft,
        'top': cb.settings.panelImageTop,
        'opacity': cb.settings.panelImageOpacity
    };

    var layers = [
        {
            'type': 'text',
            'text': cb.settings.panelText1,
            'top': top - (fontSpacing * 2),
            'left': left,
            'font-size': fontSize,
            'color': color,
        },
        {
            'type': 'text',
            'text': cb.settings.panelText2,
            'top': top - fontSpacing,
            'left': left,
            'font-size': fontSize,
            'color': color,
        },
        {
            'type': 'text',
            'text': cb.settings.panelText3,
            'left': left,
            'top': top,
            'font-size': fontSize,
            'color': color,
        },
    ];
    layers.unshift(imageLayer);

    const panel = {
        "template": "image_template",
        "layers": layers,
      };
      return panel;
});

// onHandles

cb.onEnter(function (user) {
    const userName = getUserName(user['user']);
    cb.chatNotice(cb.settings.enterMessage.replace('<userName>', userName), null, null, cb.settings.enterColor);
});

cb.onLeave(function (user) {
    const userName = getUserName(user['user']);
    cb.chatNotice(cb.settings.leaveMessage.replace('<userName>', userName), null, null, cb.settings.leaveColor);
});

cb.onMessage(function (msg) {
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

        if (msg['m'].match(/\/on_enter_message/i)) {
            cb.settings.enterMessage = params;
        }
        if (msg['m'].match(/\/on_enter_color/i)) {
            cb.settings.enterColor = params;
        }
        if (msg['m'].match(/\/on_leave_message/i)) {
            cb.settings.leaveMessage = params;
        }
        if (msg['m'].match(/\/on_leave_color/i)) {
            cb.settings.leaveColor = params;
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