// https://chaturbate.com/apps/user_uploads/2/badbadbubba/
// https://chaturbate.com/apps/sourcecode/tip-menu-plus/?version=&slot=2

/* Title: "Tip Menu Plus" bot
    Author: badbadbubba
    Version: 1.0.0c (01/14/2016) - Changed to double dash separator
    1.0.1 Use data structure for separator graphic
    1.0.2 Added new heart and smiley separator 
    1.0.3 (09/07/16) Improved error checking and reporting for missing double dash and missing menu items 
    1.0.4 (09/08/16) Added text character separators
*/

var  HEART 	= '\u2665';	// ♥
    BDIAMOND 	= '\u2666';	// ♦
    BSTAR 	= '\u2605';	// ★

var tip_amt = 0;
var separator_char = "| ";
var msg;
var MAXITEMS=10;
var tipmenuprice = [];
var tipmenuitem= [];
var MAXSEP = 9;
separators = [
{label:'Hearts',shortcut:':heart2'},
{label:'Glitter',shortcut:':pixelglitter'},
{label:'Flowers',shortcut:':tinyflower2'},
{label:'Bow',shortcut:':bluebow'},
{label:'Hearts2',shortcut:':pixelheart'},
{label:'Smiley',shortcut:':smile'},
{label:'Text Heart',shortcut:HEART},
{label:'Text Diamond',shortcut:BDIAMOND},
{label:'Text Star',shortcut:BSTAR},
]

cb.settings_choices = [
    {name: 'sepchar', type: 'choice', choice1: 'Vertical Bar', choice2: 'Hearts', choice3:'Glitter',choice4:'Flowers',choice5:'Bow',choice6:'Hearts2',choice7:'Smiley',choice8:'Text Heart', choice9:'Text Diamond', choice10:'Text Star', defaultValue: 'Vertical Bar', label: "Separator character"},
    {name:'item1', type:'str', label:'Item 1 (eg 10--flash tits)',},
    {name:'item2', type:'str', required: false, label:'Item 2',},
    {name:'item3', type:'str', required: false, label:'Item 3',},
    {name:'item4', type:'str', required: false, label:'Item 4',},
    {name:'item5', type:'str', required: false, label:'Item 5',},
    {name:'item6', type:'str', required: false, label:'Item 6',},
    {name:'item7', type:'str', required: false, label:'Item 7',},
    {name:'item8', type:'str', required: false, label:'Item 8',},
    {name:'item9', type:'str', required: false, label:'Item 9',},
    {name:'item10', type:'str', required: false, label:'Item 10',},
    {name:'noticecolor', type:'str', label:'Notice color (html code default red #FF0000)', defaultValue: '#FF0000'},
    {name: 'chat_ad', type:'int', minValue: 1, maxValue: 999, defaultValue: 1,
        label: 'Delay in minutes between notice being displayed (minimum 1)'}
];

cb.onTip(function (tip)
{
    tip_amt=parseInt(tip['amount']);
           
    for (var i = 1; i <= MAXITEMS; i++) {
        if (tip_amt == tipmenuprice[i]) {
            cb.sendNotice(tip['from_user'] + ' tipped for ' + tipmenuitem[i],'','',cb.settings['noticecolor'],'bold');
                       
        }       
    }

});

function chatAd() {

    if (msg!='Tip Menu: ') {
         cb.sendNotice(msg,'','',cb.settings['noticecolor'],'bold');
    }
    cb.setTimeout(chatAd, (cb.settings.chat_ad * 60000));
}
cb.setTimeout(chatAd, (cb.settings.chat_ad * 60000));

function init()
{

     for (i=0;i<=MAXSEP-1;i++) {
          if  (cb.settings['sepchar'] == separators[i].label) {
                separator_char = separators[i].shortcut + ' ';     
          }
     }
    msg = 'Tip Menu: ';

    for (i=1;i<=MAXITEMS;i++) {
        var tmp;
        tmp=cb.settings['item' + i];
        if (tmp) {
             var arr= tmp.split('--');
             if (arr[1]===undefined) {
              cb.sendNotice('Error-You need two dashes to separate the tip amount and menu item for item no '+ i,'','',cb.settings['noticecolor'],'bold');
             } else {
             var amt=parseInt(arr[0]);
             if (amt>0) {
                 tipmenuprice[i]=amt;
                 tipmenuitem[i]=arr[1];
                 if (i>=2) {
                    msg += separator_char;
                 }
                 msg += arr[1] + '(' + amt + ') ';

             }
             }
       }
    }

     if (msg!= 'Tip Menu: ') {
          cb.sendNotice(msg,'','',cb.settings['noticecolor'],'bold');
     } else {
          cb.sendNotice('Error-No menu items found','','',cb.settings['noticecolor'],'bold');
     }
}

init();
