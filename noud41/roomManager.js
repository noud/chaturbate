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
const fileID_BabyTipMenu = 'ef10ae98-2776-4d3d-b655-1f7565e5e8d8';
const fileID_Bienvenidos = '83426c6f-e5f7-4917-8860-ef082b756a42￼';
const fileID_Brb = 'ebf0ae98-d6a6-43a7-9eef-48e5ddfb590e';
const fileID_Bye = '57bfc63b-e696-474a-9e91-3e458c3bf269';
const fileID_Fuck = 'd9a19f5a-fde1-43f6-96d7-d312b189103a';
const fileID_Girl = '48ccd525-0514-4833-acd0-0e51c79d7e6f';
const fileID_GoodBye = '99558b49-a648-4b0a-b00b-320a00d7024b';
const fileID_Heart = '8fb2f2b0-b890-4035-bcb2-fc54f98ec881';
const fileID_Hello = 'b9099f3a-78c0-4565-9230-1eefe1345622';
const fileID_Homer = 'c91a4a00-e58f-4b89-9a76-6b65f10f4252';
const fileID_IfYouLikeThisShow = 'c4eea5a0-7627-4103-9e66-4c68c8099730';
const fileID_Kisses = 'a99ecf0f-ba69-4ff2-b989-f7556784c365';
const fileID_Kitten = 'b213b6cd-097d-40ea-be6f-9b37285edf52';
const fileID_Pole = 'dd2d7e7c-8cd8-4046-a3f2-6196002c3c32';
const fileID_QueRico = 'f2742abd-dc97-4351-912a-6ab74e8d3587';
const fileID_SheIsAPrincess = 'f13ab329-d8f6-47d2-8f76-bd38e4a19b8c';
const fileID_Shower = 'd23a6508-1976-4002-bbd0-2d28d140ecdf';
const fileID_SpankFat = 'ce511e47-8ad8-4d4b-88cb-f1954e6c2c43';
const fileID_SpankingFemales = 'eb3f7424-8315-4cf1-a697-1d7049877ada';
const fileID_Stars = 'bed20a4e-ec0a-47d7-9bd9-93f65114c9a2';
const fileID_Suck = 'cff21971-9744-41d1-ab12-74e3341e75ac';
const fileID_TipIfYouLikeHer = 'e67f518b-8a8b-4237-ab2b-6634939d42e1';
const fileID_Welcome = '74fd93b9-518e-41ef-8ffd-3f07ad2e40b6';
const fileID_WelcomeBackBeautiful = 'e12663f0-8600-4e68-af58-9456c882f82b';
const fileID_What = 'e10ed8ee-f981-4062-beda-bae1ee306b9d';
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
        choice2: 'babyTipMenu',
        choice3: 'bienvenidos',
        choice4: 'brb',
        choice5: 'bye',
        choice6: 'fuck',
        choice7: 'girl',
        choice8: 'goodBye',
        choice9: 'heart',
        choice10: 'hello',
        choice11: 'homer',
        choice12: 'ifYouLikeThisShow',
        choice13: 'kisses',
        choice14: 'kitten',
        choice15: 'pole',
        choice16: 'queRico',
        choice17: 'sheIsAPrincess',
        choice18: 'shower',
        choice19: 'spankFat',
        choice20: 'spankingFemales',
        choice21: 'stars',
        choice22: 'suck',
        choice23: 'tipIfYouLikeHer',
        choice24: 'welcome',
        choice25: 'welcomeBackBeautiful',
        choice26: 'what',
        choice27: 'wink',
        defaultValue: panelImageDefaultValue
    },
    {name: 'onDrawPanel_ImageLeft', type: 'int', minValue: panelImageTopMin, maxValue: panelImageTopMax, defaultValue: 0, label: 'onDrawPanel image left'},
    {name: 'onDrawPanel_ImageTop', type: 'int', minValue: panelImageLeftMin, maxValue: panelImageLeftMax, defaultValue: 0, label: 'onDrawPanel image top'},
    {name: 'onDrawPanel_ImageOpacity', type: 'int', minValue: 0, maxValue: 1, defaultValue: 1, label: 'onDrawPanel image opacity'},

    // onDrawPanel Text

    {name: 'onDrawPanel_Text1', defaultValue: panelText1, type: 'str', minLength: 1, maxLength: panelTextMax, label: 'onDrawPanel text 1'},
    {name: 'onDrawPanel_Text2', defaultValue: panelText2, type: 'str', minLength: 1, maxLength: panelTextMax, label: 'onDrawPanel text 2'},
    {name: 'onDrawPanel_Text3', defaultValue: panelText3, type: 'str', minLength: 1, maxLength: panelTextMax, label: 'onDrawPanel text 3'},
    {name: 'onDrawPanel_Text4', defaultValue: panelText4, type: 'str', minLength: 1, maxLength: panelTextMax, label: 'onDrawPanel text 4'},
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

    {name: 'onDrawPanel_TextFontSpacing', type: 'int', minValue: 12, maxValue: 46, defaultValue: 12, label: 'onDrawPanel text font spacing'},

    // image fileIDs
    
    {name: 'fileID_Ass', defaultValue: fileID_Ass, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID Ass'},
    {name: 'fileID_BabyTipMenu', defaultValue: fileID_BabyTipMenu, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID BabyTipMenu'},
    {name: 'fileID_Bienvenidos', defaultValue: fileID_Bienvenidos, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID Bienvenidos'},
    {name: 'fileID_Brb', defaultValue: fileID_Brb, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID Brb'},
    {name: 'fileID_Bye', defaultValue: fileID_Bye, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID Bye'},
    {name: 'fileID_Fuck', defaultValue: fileID_Fuck, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID Fuck'},
    {name: 'fileID_Girl', defaultValue: fileID_Girl, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID Girl'},
    {name: 'fileID_GoodBye', defaultValue: fileID_GoodBye, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID GoodBye'},
    {name: 'fileID_Heart', defaultValue: fileID_Heart, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID Heart'},
    {name: 'fileID_Hello', defaultValue: fileID_Hello, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID Hello'},
    {name: 'fileID_Homer', defaultValue: fileID_Homer, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID Homer'},
    {name: 'fileID_IfYouLikeThisShow', defaultValue: fileID_IfYouLikeThisShow, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID IfYouLikeThisShow'},
    {name: 'fileID_Kisses', defaultValue: fileID_Kisses, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID Kisses'},
    {name: 'fileID_Kitten', defaultValue: fileID_Kitten, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID Kitten'},
    {name: 'fileID_Pole', defaultValue: fileID_Pole, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID Pole'},
    {name: 'fileID_QueRico', defaultValue: fileID_QueRico, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID QueRico'},
    {name: 'fileID_SheIsAPrincess', defaultValue: fileID_SheIsAPrincess, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID SheIsAPrincess'},
    {name: 'fileID_Shower', defaultValue: fileID_Shower, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID Shower'},
    {name: 'fileID_SpankFat', defaultValue: fileID_SpankFat, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID SpankFat'},
    {name: 'fileID_SpankingFemales', defaultValue: fileID_SpankingFemales, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID SpankingFemales'},
    {name: 'fileID_Stars', defaultValue: fileID_Stars, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID Stars'},
    {name: 'fileID_Suck', defaultValue: fileID_Suck, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID Suck'},
    {name: 'fileID_TipIfYouLikeHer', defaultValue: fileID_TipIfYouLikeHer, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID TipIfYouLikeHer'},
    {name: 'fileID_Welcome', defaultValue: fileID_Welcome, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID Welcome'},
    {name: 'fileID_WelcomeBackBeautiful', defaultValue: fileID_WelcomeBackBeautiful, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID WelcomeBackBeautiful'},
    {name: 'fileID_What', defaultValue: fileID_What, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID What'},
    {name: 'fileID_Wink', defaultValue: fileID_Wink, type: 'str', minLength: 0, maxLength: imagefileIDMax, label: 'fileID Wink'}
];

cb.onDrawPanel(function (user) {
    var images = {
        ass: fileID_Ass,
        babyTipMenu: fileID_BabyTipMenu,
        bienvenidos: fileID_Bienvenidos,
        brb: fileID_Brb,
        bye: fileID_Bye,
        fuck: fileID_Fuck,
        girl: fileID_Girl,
        goodBye: fileID_GoodBye,
        heart: fileID_Heart,
        hello: fileID_Hello,
        homer: fileID_Homer,
        ifYouLikeThisShow: fileID_IfYouLikeThisShow,
        kisses: fileID_Kisses,
        kitten: fileID_Kitten,
        pole: fileID_Pole,
        queRico: fileID_QueRico,
        sheIsAPrincess: fileID_SheIsAPrincess,
        shower: fileID_Shower,
        spankFat: fileID_SpankFat,
        spankingFemales: fileID_SpankingFemales,
        stars: fileID_Stars,
        suck: fileID_Suck,
        tipIfYouLikeHer: fileID_TipIfYouLikeHer,
        welcome: fileID_Welcome,
        welcomeBackBeautiful: fileID_WelcomeBackBeautiful,
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