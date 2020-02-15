// https://chaturbate.com/apps/user_uploads/1/tightasian20/
// https://chaturbate.com/apps/sourcecode/single-line-tip-menu/?version=&slot=1

/* Title: "Tip Menu Single Notice" bot
    Author: badbadbubba
    Version: 1.0.0 (06/01/2014)
    Version: 1.0.0b Added options to choose different separator characters

    This bot displays a tip menu in a single line notice.  Please keep menu items as concise
    as possible. Odd values for tip menu items will make each unique eg 21 tokens for flash tits,
    22 tokens to flash ass.
       
*/

var tip_amt = 0;
var separator_char = "| ";

cb.settings_choices = [
    {name: 'sepchar', type: 'choice', choice1: 'Vertical Bar', choice2: 'Hearts', defaultValue: 'Vertical Bar', label: "Separator character"},
    {name:'item1', type:'str', label:'Item 1',},
    {name:'item1price', type:'int', label:'Item 1 Price'},
    {name:'item2', type:'str', required: false, label:'Item 2',},
    {name:'item2price', type:'int', required: false, label:'Item 2 Price'},
    {name:'item3', type:'str', required: false, label:'Item 3',},
    {name:'item3price', type:'int', required: false, label:'Item 3 Price'},
    {name:'item4', type:'str', required: false, label:'Item 4',},
    {name:'item4price', type:'int', required: false, label:'Item 4 Price'},
    {name:'item5', type:'str', required: false, label:'Item 5',},
    {name:'item5price', type:'int', required: false, label:'Item 5 Price'},
    {name:'item6', type:'str', required: false, label:'Item 6',},
    {name:'item6price', type:'int', required: false, label:'Item 6 Price'},
    {name:'item7', type:'str', required: false, label:'Item 7',},
    {name:'item7price', type:'int', required: false, label:'Item 7 Price'},
    {name:'item8', type:'str', required: false, label:'Item 8',},
    {name:'item8price', type:'int', required: false, label:'Item 8 Price'},
    {name:'item9', type:'str', required: false, label:'Item 9',},
    {name:'item9price', type:'int', required: false, label:'Item 9 Price'},
    {name:'item10', type:'str', required: false, label:'Item 10',},
    {name:'item10price', type:'int', required: false, label:'Item 10 Price'},

   

    {name:'noticecolor', type:'str', label:'Notice color (html code default red #FF0000)', defaultValue: '#FF0000'},
    {name: 'chat_ad', type:'int', minValue: 1, maxValue: 999, defaultValue: 1,
        label: 'Delay in minutes between notice being displayed (minimum 1)'}
];

cb.onTip(function (tip)
{
    tip_amt=parseInt(tip['amount']);
           
    for (var i = 1; i <= 10; i++) {
        if (tip_amt == parseInt(cb.settings['item' + i + 'price'])) {
            cb.sendNotice(tip['from_user'] + ' tipped for ' + cb.settings['item' + i],'','',cb.settings['noticecolor'],'bold');
                       
        }       
    }

});

function chatAd() {
    var msg = 'Tip Menu: ';

    for (i=1;i<=10;i++) {
        if (parseInt(cb.settings['item' + i + 'price'])>0) {
            if (i>=2) {
               msg += separator_char;
            }
            msg += cb.settings['item' + i] + '(' + parseInt(cb.settings['item' + i + 'price']) + ') ';
        }       
    }
    cb.sendNotice(msg,'','',cb.settings['noticecolor'],'bold');
    cb.setTimeout(chatAd, (cb.settings.chat_ad * 60000));
}
cb.setTimeout(chatAd, (cb.settings.chat_ad * 60000));

function init()
{
     if  (cb.settings['sepchar'] == 'Hearts') {
           separator_char = ":heart2 ";     
     }
}

init();
