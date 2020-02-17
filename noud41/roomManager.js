/**
 * App: roomManager
 * Version: 1.0.0
 * Author: noud41
 * Readme: https://github.com/noud/chaturbate/blob/master/noud41/roomManager.md
 */
 
// CSS v1

// 17 standard colors

const colorAqua = 'aqua';
const colorBlack = ' black';
const colorBlue = 'blue';
const colorFuchsia = 'fuchsia';
const colorGray = ' gray';
const colorGrey = 'grey';
const colorGreen = 'green';
const colorLime = 'lime';
const colorMaroon = 'maroon';
const colorNavy = 'navy';
const colorOlive = 'olive';
const colorPurple = 'purple';
const colorRed = 'red';
const colorSilver = 'silver';
const colorTeal = 'teal';
const colorWhite = 'white';
const colorYellow = 'yellow';

// image
// fileIDs (fixed)
// Filename (web)

// 250x80
const fileID_Ass = '6735e182-6178-46a1-a7cf-79c0ea86fa77';
const fileID_Brb = '96349a24-b717-4a3d-aca1-46ea1cd6b5cb';
const fileID_Fuck = '90284acc-63cc-440a-b4b1-600f7cce31c0';
const fileID_Hello = 'a0ecf610-7516-41eb-9f1c-ebdc7feec449';
const fileID_Kisses = 'a78c3fa9-4091-4a53-929e-8754b814d97a';
const fileID_Shower = 'c10b1583-2b46-432a-b8a7-162fdb288178';
const fileID_Suck = '4842d1ea-ae15-411b-a41c-1eda7bd85ce4';
const fileID_What = '56e5c9fe-8671-48dd-80be-c7aa885fd694';
const fileID_Wink = 'b222730f-7983-48ae-80fc-4f2c20c7936c';

const fullID_Shower = '2439a58a-8b1c-4917-8c5c-d8b2d1f0f243';

// 17 colorCodes

const colorCodeGreen = '#008000';
const colorCodeBlue = '#0000FF';

// Chat

const chatTextMaxLength = 270;
const wordSeparator = " ";

const templateUserName = '<userName>';

// Panel

const panelImageDefaultValue = 'hello';

// Panel image

const imageMax = 9;
const imagefileIDMax = 44;

const textLayers = 4;
const panelText1 = 'so';
const panelText2 = 'nice';
const panelText3 = 'code loves';
const panelText4 = 'github.com/noud/chaturbate';

const panelTextColorDefaultValue = colorGreen;

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

// Panel TextMax 27

const panelTextMax = 27;

const panelTextTopMin = panelTopMin;
const panelTextTopMax = panelTopMax;
const panelTextLeftMin = panelLeftMin;
const panelTextLeftMax = panelLeftMax;

cb.settings_choices = [

    // Room

    {name: 'subject', type: 'str', minLength: 1, maxLength: 70, label: 'RoomSubject'},

    // onHandles

    {name: 'onEnter_Text', type: 'str', minLength: 0, maxLength: chatTextMaxLength, label: 'onEnter text'},
    {name: 'onEnter_Color', type:'choice', label: 'onEnter color',
        choice1: colorAqua,
        choice2: colorBlack,
        choice3: colorBlue,
        choice4: colorFuchsia,
        choice5: colorGray,
        choice6: colorGrey,
        choice7: colorGreen,
        choice8: colorLime,
        choice9: colorMaroon,
        choice10: colorNavy,
        choice11: colorOlive,
        choice12: colorPurple,
        choice13: colorRed,
        choice14: colorSilver,
        choice15: colorTeal,
        choice16: colorWhite,
        choice17: colorYellow,
        defaultValue: colorCodeGreen
    },
    {name: 'onLeave_Text', type: 'str', minLength: 0, maxLength: chatTextMaxLength, label: 'onLeave text'},
    {name: 'onLeave_Color', type:'choice', label: 'onLeave color',
        choice1: colorAqua,
        choice2: colorBlack,
        choice3: colorBlue,
        choice4: colorFuchsia,
        choice5: colorGray,
        choice6: colorGrey,
        choice7: colorGreen,
        choice8: colorLime,
        choice9: colorMaroon,
        choice10: colorNavy,
        choice11: colorOlive,
        choice12: colorPurple,
        choice13: colorRed,
        choice14: colorSilver,
        choice15: colorTeal,
        choice16: colorWhite,
        choice17: colorYellow,
        defaultValue: colorCodeBlue
    },

    // onDrawPanel

    // onDrawPanel Image

    {name: 'onDrawPanel_Image', type:'choice', label: 'onDrawPanel image',
        choice1: 'ass',
        choice2: 'brb',
        choice3: 'fuck',
        choice4: 'hello',
        choice5: 'kisses',
        choice6: 'shower',
        choice7: 'suck',
        choice8: 'what',
        choice9: 'wink',
        defaultValue: panelImageDefaultValue
    },
    {name: 'onDrawPanel_ImageLeft', type: 'int', minValue: panelImageTopMin, maxValue: panelImageTopMax, defaultValue: 0, label: 'onDrawPanel image left'},
    {name: 'onDrawPanel_ImageTop', type: 'int', minValue: panelImageLeftMin, maxValue: panelImageLeftMax, defaultValue: 0, label: 'onDrawPanel image top'},
    {name: 'onDrawPanel_ImageOpacity', type: 'int', minValue: 0, maxValue: 1, defaultValue: 1, label: 'onDrawPanel image opacity'},

    // onDrawPanel Text

    {name: 'onDrawPanel_Text1', defaultValue: panelText1, type: 'str', minLength: 0, maxLength: panelTextMax, label: 'onDrawPanel text 1'},
    {name: 'onDrawPanel_Text2', defaultValue: panelText2, type: 'str', minLength: 0, maxLength: panelTextMax, label: 'onDrawPanel text 2'},
    {name: 'onDrawPanel_Text3', defaultValue: panelText3, type: 'str', minLength: 0, maxLength: panelTextMax, label: 'onDrawPanel text 3'},
    {name: 'onDrawPanel_Text4', defaultValue: panelText4, type: 'str', minLength: 0, maxLength: panelTextMax, label: 'onDrawPanel text 4'},
    {name: 'onDrawPanel_TextColor', type:'choice', label: 'onDrawPanel text color',
        choice1: colorAqua,
        choice2: colorBlack,
        choice3: colorBlue,
        choice4: colorFuchsia,
        choice5: colorGray,
        choice6: colorGrey,
        choice7: colorGreen,
        choice8: colorLime,
        choice9: colorMaroon,
        choice10: colorNavy,
        choice11: colorOlive,
        choice12: colorPurple,
        choice13: colorRed,
        choice14: colorSilver,
        choice15: colorTeal,
        choice16: colorWhite,
        choice17: colorYellow,
        defaultValue: panelTextColorDefaultValue
    },
    {name: 'onDrawPanel_TextLeft', type: 'int', minValue: panelTextTopMin, maxValue: panelTextTopMax, defaultValue: 0, label: 'onDrawPanel text left'},
    {name: 'onDrawPanel_TextTop', type: 'int', minValue: panelTextLeftMin, maxValue: panelTextLeftMax, defaultValue: 0, label: 'onDrawPanel text top'},
    {name: 'onDrawPanel_TextFontSize', type: 'int', label: 'onDrawPanel text font size'},

    // design

    {name: 'onDrawPanel_TextFontSpacing', type: 'int', minValue: 12, maxValue: 46, defaultValue: 12, label: 'onDrawPanel text font spacing'}
];

cb.onDrawPanel(function (user) {
    var images = {
        ass: fileID_Ass,
        brb: fileID_Brb,
        fuck: fileID_Fuck,
        hello: fileID_Hello,
        kisses: fileID_Kisses,
        shower: fileID_Shower,
        suck: fileID_Suck,
        what: fileID_What,
        wink: fileID_Wink
    };

    const image = images[cb.settings.onDrawPanel_Image];
    const color = cb.settings.onDrawPanel_TextColor;
    const fontSize = cb.settings.onDrawPanel_TextFontSize;
    const fontSpacing = cb.settings.onDrawPanel_TextFontSpacing;

    // imageMargin and text positioning
    const top = cb.settings.onDrawPanel_TextTop;
    const left = cb.settings.onDrawPanel_TextLeft;
    // @todo make this variable
    // const imageMargin = 150;
    // const left = cb.settings.onDrawPanel_TextLeft + imageMargin;

    const imageLayer = {
        'type': 'image',
        'fileID': image,
        'left':  cb.settings.onDrawPanel_ImageLeft,
        'top': cb.settings.onDrawPanel_ImageTop,
        'opacity': cb.settings.onDrawPanel_ImageOpacity
    };

    var layers = [];
    var i;
    for (i = 0; i < textLayers; i++) {
        var text = '';
        switch(i) {
            case 0:
                text = cb.settings.onDrawPanel_Text4;
                break;
            case 1:
                text = cb.settings.onDrawPanel_Text3;
                break;
            case 2:
                text = cb.settings.onDrawPanel_Text2;
                break;
            case 3:
                text = cb.settings.onDrawPanel_Text1;
                break;
        }
        layers.push({
            'type': 'text',
            'text': text,
            'top': top - (fontSpacing * i),
            'left': left,
            'font-size': fontSize,
            'color': color,
        });
    }
    layers.unshift(imageLayer);

    const panel = {
        "template": "image_template",   // @todo variable
        "layers": layers,
      };
      return panel;
});

// onHandles

cb.onEnter(function (user) {
    chatNotice(cb.settings.onEnter_Text, user['user'], cb.settings.onEnter_Color)
});

cb.onLeave(function (user) {
    chatNotice(cb.settings.onLeave_Text, user['user'], cb.settings.onLeave_Color)
});

cb.onMessage(function (msg) {
    var params = getParams(msg['m']);

    if (msg['user'] == cb.room_slug) {
        if (msg['m'].match(/\/changeRoomSubject/i)) {
            cb.settings.subject = params;
            cb.changeRoomSubject(params)
        }

        if (msg['m'].match(/\/limitCam_start/i)) {
            cb.limitCam_start(params);
        }
        if (msg['m'].match(/\/limitCam_stop/i)) {
            cb.limitCam_stop();
        }
        
        if (msg['m'].match(/\/onDrawPanel/i)) {
            cb.drawPanel();
        }
        if (msg['m'].match(/\/onDrawPanel_Image/i)) {
            cb.settings.onDrawPanel_Image = params;
        }
        if (msg['m'].match(/\/onDrawPanel_TextColor/i)) {
            cb.settings.onDrawPanel_TextColor = params;
        }
        if (msg['m'].match(/\/onDrawPanel_Text/i)) {
            const line = getFirstParam(params);
            params = getParams(params);
            switch(line) {
                case '1':
                    cb.settings.onDrawPanel_Text1 = params;
                    break;
                case '2':
                    cb.settings.onDrawPanel_Text2 = params;
                    break;
                case '3':
                    cb.settings.onDrawPanel_Text3 = params;
                    break;
                case '4':
                    cb.settings.onDrawPanel_Text4 = params;
                    break;
            }
        }

        if (msg['m'].match(/\/onEnter_Text/i)) {
            cb.settings.onEnter_Text = params;
        }
        if (msg['m'].match(/\/onEnter_Color/i)) {
            cb.settings.onEnter_Color = params;
        }
        
        if (msg['m'].match(/\/onLeave_Text/i)) {
            cb.settings.onLeave_Text = params;
        }
        if (msg['m'].match(/\/onLeave_Color/i)) {
            cb.settings.onLeave_Color = params;
        }

    }
});

cb.onTip(function (tip) {
    tipCounter += parseInt(tip['amount']);
    cb.drawPanel();
});

// utility

function chatNotice(message, user) {
    const userName = getUserName(user);
    cb.chatNotice(message.replace(templateUserName, userName), null, null, cb.settings.onEnterColor);
}

function getUserName(user) {
    userName = user.replace(/\d+$/, '');
    return userName.replace(/_+$/,'');
};

function getParams(message) {
    var messageArray = message.split(wordSeparator);
    messageArray.shift();
    return messageArray.join(wordSeparator);
};

function getFirstParam(message) {
    var messageArray = message.split(wordSeparator);
    return messageArray[0];
};

function advertise() {
    showAppAd();
    cb.setTimeout(advertise, parseInt(cb.settings.notice_wait_time) * 60000);
}

function showAppAd(username) {
}

function init() {
    cb.changeRoomSubject(cb.settings.subject);
}
init();