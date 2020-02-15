// https://chaturbate.com/apps/user_uploads/2/badbadbubba/
// https://chaturbate.com/apps/sourcecode/rotating-notifier-with-tip-menu/?version=&slot=2

/* Title: "Rotating Notifier with Tip Menu " bot
    Author: badbadbubba
    Version: 1.0.0 (06/03/2014)

    Combined functionality of Rotating Notifier and Tip Menu - Single Line.
       
*/

var tip_amt = 0;
var tip_menu_msg = '';
var msg4 = '';
var msg_index = 1;

cb.settings_choices = [
    {name:'msg1', type:'str', label:'Message 1 (displayed on room entry also)'},
    {name:'msg2', type:'str', required: false, label:'Message 2'},
    {name:'msg3', type:'str', required: false, label:'Message 3'},
    {name: 'enableTipMenu', type: 'choice', choice1: 'yes', choice2: 'no', defaultValue: 'yes', label: "Enable Tip Menu?"},
    {name:'item1', type:'str', required: false, label:'Item 1'},
    {name:'item1price', type:'int', required: false, label:'Item 1 Price'},
    {name:'item2', type:'str', required: false, label:'Item 2'},
    {name:'item2price', type:'int', required: false, label:'Item 2 Price'},
    {name:'item3', type:'str', required: false, label:'Item 3'},
    {name:'item3price', type:'int', required: false, label:'Item 3 Price'},
    {name:'item4', type:'str', required: false, label:'Item 4'},
    {name:'item4price', type:'int', required: false, label:'Item 4 Price'},
    {name:'item5', type:'str', required: false, label:'Item 5'},
    {name:'item5price', type:'int', required: false, label:'Item 5 Price'},
    {name:'item6', type:'str', required: false, label:'Item 6'},
    {name:'item6price', type:'int', required: false, label:'Item 6 Price'},
    {name:'noticecolor', type:'str', label:'Notice color (html code default dark red #9F000F)', defaultValue: '#9F000F'},
    {name: 'chat_ad', type:'int', minValue: 1, maxValue: 999, defaultValue: 2,
        label: 'Delay in minutes between notice being displayed (minimum 1)'}
];


cb.onTip(function (tip)
{
    if (cb.settings['enableTipMenu']=='yes') {
    tip_amt=parseInt(tip['amount']);
       
    for (var i = 1; i <= 6; i++) {
        if (tip_amt == parseInt(cb.settings['item' + i + 'price'])) {
            cb.sendNotice(tip['from_user'] + ' tipped for ' + cb.settings['item' + i],'','',cb.settings['noticecolor'],'bold');
                       
        }       
    }
    }
});

cb.onEnter(function(user) {
    cb.sendNotice('Welcome ' + user['user'] + '! ' + cb.settings['msg1'],user['user'],'',cb.settings['noticecolor'],'bold');
});

function msg_menu() {
    msg4='Tip Menu: ';
    for (i=1;i<=6;i++) {
        if (parseInt(cb.settings['item' + i + 'price'])>0) {

            if (i>=2) {
               msg4 += ' | ';
            }

            msg4 += cb.settings['item' + i] + '(' + parseInt(cb.settings['item' + i + 'price']) + ') ';
        }       
    }
}

function chatAd() {
    var msg;
    
        while ((cb.settings['msg' + msg_index ] == 0) && (msg_index <=3)) {      //skip empty messages
           msg_index ++;
        }
        
        msg = cb.settings['msg' + msg_index ];
        if (msg_index==4) {
             msg=msg4;
        }

        if ((cb.settings['enableTipMenu']=='no') && (msg_index  == 4)) {
            msg_index=1;
        }
               
        if (((cb.settings['enableTipMenu']=='yes') && (msg_index  == 4)) || (msg_index  !=4)) {                   
            cb.sendNotice(msg,'','',cb.settings['noticecolor'],'bold');
        }
        msg_index++;
        if (msg_index>4) {
             msg_index=1;
       }
        
    cb.setTimeout(chatAd, (cb.settings.chat_ad * 60000));

}
cb.setTimeout(chatAd, (cb.settings.chat_ad * 60000));

function init()
{
    msg_menu();
}

init();
