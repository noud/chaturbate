// https://chaturbate.com/apps/user_uploads/2/badbadbubba/
// https://chaturbate.com/apps/sourcecode/laurens-hitachi-game/?version=&slot=2

/* Title: "Lauren's Multi Level Hitachi" bot
    Author: badbadbubba
    Version: 1.1.0 (05/29/2014)

    This bot is for Lauren Phillip's (sexylphillips) multi-level hitachi control game.
    Feel free to use. Tip amounts are hardcoded for now.
    
    V1.10 - Deals with 100 token tip as increase if level 3 or lower
          - Use cb.sendNotice to bold chat messages
          - Message for OFF for level 0, and MAX for level 7
    
*/
var level = 0;
var tip_amt = 0;

cb.settings_choices = [
{
    name: 'chat_ad',
    type: 'int',
    minValue: 1,
    maxValue: 999,
    defaultValue: 1,
    label: 'Interval in minutes between notice being displayed (minimum 1)'
}
];

cb.onTip(function (tip)
{
    tip_amt=parseInt(tip['amount']);
    if (((tip_amt % 20 == 0) && (tip_amt <= 140) && (tip_amt != 100)) || ((tip_amt == 100) && (level <=3)))
    {
        
        mult = tip_amt / 20;
        level += mult;
        if (level >= 7) {
            //cb.chatNotice('Hitachi is at MAX. Tip 25 or multiples to decrease.  Tip 30 to stop.');
            cb.sendNotice('Hitachi is at MAX. Tip 25 or multiples to decrease.  Tip 30 to stop.','','','#D40046','bold','');
            level = 7;
        } else {
        HitachiLevel(level);
        }
            
    } else
    if ((tip_amt % 25 == 0) && (tip_amt <= 175))
    {
        mult = tip_amt / 25;
        level -= mult;
        if (level <= 0) {
            //cb.chatNotice('Hitachi is OFF. Tip 20 or multiples to restart.');
            cb.sendNotice('Hitachi is OFF. Tip 20 or multiples to restart.','','','#D40046','bold','');
            level = 0;
        } else {
        HitachiLevel(level);
        }       
    }    
    if (tip_amt == 30) {
        level=0;
        HitachiLevel(level);
        //cb.chatNotice('Tip 20 or multiples to restart.');
        cb.sendNotice('Tip 20 or multiples to restart.','','','#D40046','bold','');
    }
});

function HitachiLevel(level) {
    var levelmsg ='';
    
    if (level==0) {
       levelmsg='Hitachi is OFF. Max is 7.';    
    } else
    if (level==7) {
       levelmsg='Hitachi is at MAX.'; 
    }
    else {
        levelmsg='Hitachi is at level ' + level + '. Max is 7.';
    }
    //cb.chatNotice(levelmsg);
    cb.sendNotice(levelmsg,'','','#D40046','bold','');
}

function chatAd() {
    //cb.chatNotice('We are playing control my hitachi. Tip 20 or multiples to increase, 25 or multiples to decrease, 30 to stop.');
    cb.sendNotice('We are playing control my hitachi. Tip 20 or multiples to increase, 25 or multiples to decrease, 30 to stop.','','','#D40046','bold','');
    HitachiLevel(level);
    cb.setTimeout(chatAd, (cb.settings.chat_ad * 60000));
}
cb.setTimeout(chatAd, (cb.settings.chat_ad * 60000));

function init()
{

}

init();
