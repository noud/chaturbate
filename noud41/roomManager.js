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

const colorCodeGreen = '#008000';
const colorCodeBlue = '#0000FF';

// Chat

const chatTextMaxLength = 270;
const wordSeparator = " ";

// Panel

const panelImageDefaultValue = 'hello';

// Panel image

const imageMax = 9;
const imagefileIDMax = 44;

// fileID is Filename on the web

const image1fileIDDefaultValue = '6735e182-6178-46a1-a7cf-79c0ea86fa77';
const image2fileIDDefaultValue = '96349a24-b717-4a3d-aca1-46ea1cd6b5cb';
const image3fileIDDefaultValue = '90284acc-63cc-440a-b4b1-600f7cce31c0';
const image4fileIDDefaultValue = 'a0ecf610-7516-41eb-9f1c-ebdc7feec449';
const image5fileIDDefaultValue = 'a78c3fa9-4091-4a53-929e-8754b814d97a';
// 250x80
const image6fileIDDefaultValue = 'c10b1583-2b46-432a-b8a7-162fdb288178';
// full: '2439a58a-8b1c-4917-8c5c-d8b2d1f0f243',
const image7fileIDDefaultValue = '4842d1ea-ae15-411b-a41c-1eda7bd85ce4';
const image8fileIDDefaultValue = '56e5c9fe-8671-48dd-80be-c7aa885fd694';
const image9fileIDDefaultValue = 'b222730f-7983-48ae-80fc-4f2c20c7936c';

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

    {name: 'room', type: 'str', minLength: 1, maxLength: 70, label: 'RoomSubject'},

    // onHandles

    {name: 'enterMessage', type: 'str', minLength: 0, maxLength: chatTextMaxLength, label: 'Enter message'},
    {name: 'enterColor', type:'choice', label: 'Enter color',
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
    {name: 'leaveMessage', type: 'str', minLength: 0, maxLength: chatTextMaxLength, label: 'Leave message'},
    {name: 'leaveColor', type:'choice', label: 'Leave color',
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

    // Panel

    // Panel Image

    {name: 'panelImage', type:'choice', label: 'Panel image',
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
    {name: 'panelImageLeft', type: 'int', minValue: panelImageTopMin, maxValue: panelImageTopMax, defaultValue: 0, label: 'Panel image left'},
    {name: 'panelImageTop', type: 'int', minValue: panelImageLeftMin, maxValue: panelImageLeftMax, defaultValue: 0, label: 'Panel image top'},
    {name: 'panelImageOpacity', type: 'int', minValue: 0, maxValue: 1, defaultValue: 1, label: 'Panel image opacity'},

    // Panel Text

    {name: 'panelText1', defaultValue: panelText1, type: 'str', minLength: 0, maxLength: panelTextMax, label: 'Panel text 1'},
    {name: 'panelText2', defaultValue: panelText2, type: 'str', minLength: 0, maxLength: panelTextMax, label: 'Panel text 2'},
    {name: 'panelText3', defaultValue: panelText3, type: 'str', minLength: 0, maxLength: panelTextMax, label: 'Panel text 3'},
    {name: 'panelText4', defaultValue: panelText4, type: 'str', minLength: 0, maxLength: panelTextMax, label: 'Panel text 4'},
    {name: 'panelTextColor', type:'choice', label: 'Panel text color',
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
    {name: 'panelTextLeft', type: 'int', minValue: panelTextTopMin, maxValue: panelTextTopMax, defaultValue: 0, label: 'Panel text left'},
    {name: 'panelTextTop', type: 'int', minValue: panelTextLeftMin, maxValue: panelTextLeftMax, defaultValue: 0, label: 'Panel text top'},
    {name: 'panelTextFontSize', type: 'int', label: 'Panel text font size'},

    // Panel image fileIDs

    {name: 'image1fileID', defaultValue: image1fileIDDefaultValue, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'Panel image fileID 1'},
    {name: 'image2fileID', defaultValue: image2fileIDDefaultValue, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'Panel image fileID 2'},
    {name: 'image3fileID', defaultValue: image3fileIDDefaultValue, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'Panel image fileID 3'},
    {name: 'image4fileID', defaultValue: image4fileIDDefaultValue, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'Panel image fileID 4'},
    {name: 'image5fileID', defaultValue: image5fileIDDefaultValue, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'Panel image fileID 5'},
    {name: 'image6fileID', defaultValue: image6fileIDDefaultValue, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'Panel image fileID 6'},
    {name: 'image7fileID', defaultValue: image7fileIDDefaultValue, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'Panel image fileID 7'},
    {name: 'image8fileID', defaultValue: image8fileIDDefaultValue, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'Panel image fileID 8'},
    {name: 'image9fileID', defaultValue: image9fileIDDefaultValue, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'Panel image fileID 9'},

    // design

    {name: 'panelTextFontSpacing', type: 'int', minValue: 12, maxValue: 46, defaultValue: 12, label: 'Panel text font spacing'},
];

cb.onDrawPanel(function (user) {
    // @todo make variable
    var images = {
        ass: cb.settings.image1fileID,
        brb: cb.settings.image2fileID,
        fuck: cb.settings.image3fileID,
        hello: cb.settings.image4fileID,
        kisses: cb.settings.image5fileID,
        shower: cb.settings.image6fileID,
        suck: cb.settings.image7fileID,
        what: cb.settings.image8fileID,
        wink: cb.settings.image9fileID
    };

    const image = images[cb.settings.panelImage];
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
        'fileID': image,
        'left':  cb.settings.panelImageLeft,
        'top': cb.settings.panelImageTop,
        'opacity': cb.settings.panelImageOpacity
    };

    var layers = [];
    var i;
    for (i = 0; i < textLayers; i++) {
        var text = '';
        switch(i) {
            case 0:
                text = cb.settings.panelText4;
                break;
            case 1:
                text = cb.settings.panelText3;
                break;
            case 2:
                text = cb.settings.panelText2;
                break;
            case 3:
                text = cb.settings.panelText1;
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
    chatNotice(cb.settings.enterMessage, user['user'], cb.settings.enterColor)
});

cb.onLeave(function (user) {
    chatNotice(cb.settings.leaveMessage, user['user'], cb.settings.leaveColor)
});

cb.onMessage(function (msg) {
    var params = getParams(msg['m']);

    if (msg['user'] == cb.room_slug) {
        if (msg['m'].match(/\/changeRoomSubject/i)) {
            cb.settings.room = params;
            cb.changeRoomSubject(params)
        }

        if (msg['m'].match(/\/limitCam_start/i)) {
            cb.limitCam_start(params);
        }
        if (msg['m'].match(/\/limitCam_stop/i)) {
            cb.limitCam_stop();
        }
        
        if (msg['m'].match(/\/drawPanel/i)) {
            cb.drawPanel();
        }

        if (msg['m'].match(/\/drawPanelImage/i)) {
            cb.settings.panelImage = params;
        }

        if (msg['m'].match(/\/drawPanelTextColor/i)) {
            cb.settings.panelTextColor = params;
        }

        if (msg['m'].match(/\/onEnterText/i)) {
            cb.settings.enterMessage = params;
        }
        if (msg['m'].match(/\/onEnterColor/i)) {
            cb.settings.enterColor = params;
        }
        if (msg['m'].match(/\/onLeaveText/i)) {
            cb.settings.leaveMessage = params;
        }
        if (msg['m'].match(/\/onLeaveColor/i)) {
            cb.settings.leaveColor = params;
        }

        if (msg['m'].match(/\/drawPanelTextColor/i)) {
            cb.settings.panelTextColor = params;
        }

        if (msg['m'].match(/\/drawPanelText/i)) {
            const line = getFirstParam(params);
            params = getParams(params);
            switch(line) {
                case '1':
                    cb.settings.panelText1 = params;
                    break;
                case '2':
                    cb.settings.panelText2 = params;
                    break;
                case '3':
                    cb.settings.panelText3 = params;
                    break;
                case '4':
                    cb.settings.panelText4 = params;
                    break;
            }
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
    cb.chatNotice(message.replace('<userName>', userName), null, null, cb.settings.enterColor);
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
    cb.changeRoomSubject(cb.settings.room);
}
init();