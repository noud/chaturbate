// https://chaturbate.com/apps/user_uploads/2/badbadbubba/
// https://chaturbate.com/apps/sourcecode/kaelins-wheel-of-torture/?version=&slot=2

/* Title: "Kaelin's Wheel of Torture" bot
    Author: badbadbubba
    Version: 1.0.1 (06/02/2014)

    This bot is for Kaelin Blake's Wheel of Torture. Tip amounts and prizes are hardcoded.
    
    V1.0.0 - Initial Release
    V1.0.1 - Changed default color to #9F000F, default interval to 5 min
    
*/

var prizes = [['Closepin nips 30s','Ice in kitty 30s','5 spanks','Naked macarena','5 kitty smacks','5 squats'],
              ['Closepin nips 2min','Ice in kitty until melted','20 spanks','Naked macarena closepin nips','20 kitty smacks','20 squats'],
              ['Closepin nips 5min','Ice on clit 30s','50 spanks','Naked macarena ice in kitty','50 kitty smacks','50 squats']];

cb.settings_choices = [
{
    name: 'chat_ad',
    type: 'int',
    minValue: 1,
    maxValue: 999,
    defaultValue: 5,
    label: 'Delay in minutes between notice being displayed (minimum 1)'
}
];



cb.onTip(function (tip)
{
    var spinnum = 0;
    var reward='';
       
    tip_amt=parseInt(tip['amount']);
    if ((tip_amt == 101) || (tip_amt == 202) || (tip_amt == 303))
    {
        if (tip_amt == 101) {
            prize_index=0;
        }
        if (tip_amt == 202) {
            prize_index=1;
        }
        if (tip_amt == 303) {
            prize_index=2;
        }
        spinnum=Math.floor(Math.random()*6)+1;
        
        reward = prizes[prize_index][spinnum-1];
           
        cb.sendNotice('Wheel of Torture! Wheel stopped on ' + spinnum + '.  Prize is ' + reward,'','','#9F000F','bold','');
        
    }

});


function chatAd() {

    cb.sendNotice('Wheel of Torture is active. Tip 101, 202, or 303 to play. See bio for prizes.','','','#9F000F','bold','');
    cb.setTimeout(chatAd, (cb.settings.chat_ad * 60000));
}
cb.setTimeout(chatAd, (cb.settings.chat_ad * 60000));

function init()
{

}

init();
