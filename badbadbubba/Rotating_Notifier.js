// https://chaturbate.com/apps/user_uploads/2/badbadbubba/
// https://chaturbate.com/apps/sourcecode/rotating-notifier/?version=&slot=2

/* Title: "Rotating Notifier" bot
    Author: badbadbubba
    Version: 1.1 (03/07/2015)

    A simple rotating notifier bot.  Only options are to set color and display interval.  Messages are rotated in
    sequence.  Message 1 will also be displayed on room entry privately.
    V1.0.1 - Removed unnecessary check for valid first messages
    V1.0.2 - Increase messages to 5
    V1.0.3 - Added option to display msg1 on room entry
    V1.1 - Optimized code, expanded to 10 lines      
*/

var i=0;
var MAXITEMS=10;

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
    {name: 'chat_ad', type:'int', minValue: 1, maxValue: 999, defaultValue: 2,
        label: 'Delay in minutes between notices being displayed (minimum 1)'}
];

cb.onEnter(function(user) {
    if (cb.settings['msgonentry'] == 'yes') {
        cb.sendNotice('Welcome ' + user['user'] + '! ' + cb.settings['msg1'],user['user'],'',cb.settings['msgcolor'],'bold');
    }
});

function chatAd() {
    var msg;
    
        while (cb.settings['msg' + (i + 1)] == 0) {      //skip empty messages
             i++;
             i %= MAXITEMS;
        }
        
       msg = cb.settings['msg' + (i + 1)];
       i++;
       i %= MAXITEMS;
           
        cb.sendNotice(msg,'','',cb.settings['msgcolor'],'bold');
        cb.setTimeout(chatAd, (cb.settings.chat_ad * 60000));
}
cb.setTimeout(chatAd, (cb.settings.chat_ad * 60000));

function init()
{

}

init();
