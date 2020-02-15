// https://chaturbate.com/apps/user_uploads/1/badbadbubba/
// https://chaturbate.com/apps/sourcecode/rotating-notifier-tip-menu-plus/?version=&slot=1

/* Title: "Rotating Notifier with Tip Menu Plus" bot
    Author: badbadbubba
    Version: 1.0 (10/07/2016)

   Rotating Notifier combined with Tip Menu Plus

*/

var index=0;
var MAXITEMS=10;

var  HEART 	= '\u2665';	// ♥
    BDIAMOND 	= '\u2666';	// ♦
    BSTAR 	= '\u2605';	// ★

var tip_amt = 0;
var separator_char = "| ";
var tipmsg;
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
    {name: 'msgonentry', type: 'choice', choice1: 'yes', choice2: 'no', defaultValue: 'yes', label: "Display Message 1 privately on entry - set to no for busy rooms"},
    {name:'msg1', type:'str', required: true, label:'Message 1',},
    {name:'msg2', type:'str', required: false, label:'Message 2',},
    {name:'msg3', type:'str', required: false, label:'Message 3',},
    {name:'msg4', type:'str', required: false, label:'Message 4',},
    {name:'msg5', type:'str', required: false, label:'Message 5',},
    {name:'msg6', type:'str', required: false, label:'Message 6',},
    {name:'msg7', type:'str', required: false, label:'Message 7',},
    {name:'msg8', type:'str', required: false, label:'Message 8',},
    {name:'msg9', type:'str', required: false, label:'Message 9',},
    {name:'msg10', type:'str', required: false, label:'Message 10',},
    {name:'msgcolor', type:'str', label:'Notice color (html code default dark red #9F000F)', defaultValue: '#9F000F'},
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
    {name: 'chat_ad', type:'int', minValue: 1, maxValue: 999, defaultValue: 2,
        label: 'Delay in minutes between notices being displayed (minimum 1)'}
];

cb.onEnter(function(user) {
    if (cb.settings['msgonentry'] == 'yes') {
        cb.sendNotice('Welcome ' + user['user'] + '! ' + cb.settings['msg1'],user['user'],'',cb.settings['msgcolor'],'bold');
    }
});

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

    
        while (cb.settings['msg' + (index + 1)] == 0) {      //skip empty messages
             index++;
             index %= MAXITEMS;
        }
 
       if (index==0 && msg!=tipmsg) {  
                msg=tipmsg;
       } else {
            msg = cb.settings['msg' + (index + 1)];
            index++;
            index %= MAXITEMS;
       }   
        cb.sendNotice(msg,'','',cb.settings['msgcolor'],'bold');
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
    tipmsg = 'Tip Menu: ';

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
                    tipmsg += separator_char;
                 }
                 tipmsg += arr[1] + '(' + amt + ') ';

             }
             }
       }
    }

     if (tipmsg!= 'Tip Menu: ') {
          cb.sendNotice(tipmsg,'','',cb.settings['msgcolor'],'bold');
     } else {
          cb.sendNotice('Error-No menu items found','','',cb.settings['msgcolor'],'bold');
     }
}

init();
