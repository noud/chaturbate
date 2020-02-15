// https://chaturbate.com/apps/user_uploads/2/mia_thicke/
// https://chaturbate.com/apps/sourcecode/mias-wheel-of-torture/?version=&slot=2

/* Title: "Mia's Wheel of Torture" bot
    Author: badbadbubba
    Version: 1.0.1a (06/02/2014)
    Revision by: Mia (12/12/2014)

    This bot is for Mia's Wheel of Torture. Tip amounts and prizes are hardcoded.
    
    V1.0.0 - Initial Release
    V1.0.1 - Changed default color to #9F000F, default interval to 5 min
    
*/

var prizes = [['Collar n Clamps 30s','Ice in kitty 30s','5 Whips','3 Edgings','5 Kitty Smacks','5 Squats'],
              ['Collar n Clamps 2min','Ice in kitty til melts','20 Whips','5 Edgings w CNC','10 kitty smacks','10 squats'],
              ['Collar n clamps 5m','Ice on clit 30s','50 Whips','3 Edgings w ice in kitty','20 kitty smacks','20 squats'],
              ['Choose Gag CNC','Choose 30 Whips 10 Edgings','Choose toy n CNC', '3 mins request','Choose toy N Style','Tell Master what i need done to me']];

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
    if ((tip_amt == 70) || (tip_amt == 85) || (tip_amt == 100) || (tip_amt == 150)) 
    {
        if (tip_amt == 70)  {
            prize_index=0;
        }
        if (tip_amt == 85) {
            prize_index=1;
        }
        if (tip_amt == 100) {
            prize_index=2;
        }
         if (tip_amt == 150) {
             prize_index=3;
        }
        spinnum=Math.floor(Math.random()*6)+1;
        
        reward = prizes[prize_index][spinnum-1];
           
        cb.sendNotice('Wheel of Torture! Wheel stopped on ' + spinnum + '.  Prize is ' + reward,'','','#9F000F','bold','');
        
    }

});


function chatAd() {

    cb.sendNotice('Wheel of Torture Active. Tip 70, 85, 100,or 150 to play.See bio for prizes.','','','#9F000F','bold','');
    cb.setTimeout(chatAd, (cb.settings.chat_ad * 60000));
}
cb.setTimeout(chatAd, (cb.settings.chat_ad * 60000));

function init()
{

}

init();
