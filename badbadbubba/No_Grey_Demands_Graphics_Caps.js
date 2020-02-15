// https://chaturbate.com/apps/user_uploads/2/badbadbubba/
// https://chaturbate.com/apps/sourcecode/no-grey-demands-graphics-caps/?version=&slot=2

/* Title: No Grey Demands,Graphics,Stickykeys,Caps bot
    Author: badbadbubba
    Version: 2.0.6e (9/18/2016)

    This bot is a simplified version of Auto Answer Bot for muting greys.
    
    V2.0 Rewrite to optimize code and add new keywords
    V2.0.1 Added some keywords, added index for multiple regular expression handling
    V2.0.2 Add option to send rules to greys
    V2.0.3 Improved ALL Caps detection
    V2.0.4 More efficient grey rules message, more spam words
    V2.0.4m Added more keywords
    V2.0.5b Added option to disable message on entry to reduce server load for busy rooms (removed duplicate feature)
    V2.0.6e Improved spam detection
  
*/

var MAX_REASONS = 9;
var MAX_CHECKS = 11;
var EnterMsg = '';

mutereasons = [
    {regexp: /(?=.*\b(f?ck|finger|suck|show|zoom|open|see|touch|spread|lick)\b)(?=.*\b(body|ass|pussy|boobs?|bobs?|tits?|vagina|nipples?|breasts?|asshole|cock|penis|vagina|face)\b)/i,
        notice: 'demands',
        index: 0},
    {regexp: /:\b/,
        notice: 'graphics',
        index: 1},  
    {regexp: /(.)\1{2}/,
        notice: 'sticky keys',
        index: 2},
    {regexp: /((?=.*pm)|(?=.*c2c)|(?=.*cam?2?cam)|(?=.*private)|(?=.*pvt)|(?=.*prvt))/i,
        notice: 'PM requests',
        index: 3},
    {regexp:  /((swipegirls)|(freecambook)|(skype)|(freetoken)|(kik)|(mypage)|(leaked)|(mybio)|(mycam)|(myprofile)|(mypr0file)|(myroom)|(tokengenerator)|(streamingnaked)|(erotimo)|(amecam)|(1.?f)|(bestwork)|(premiumcheat)|(ellagocam)|(visitthis)|(fucktubate)|(goo\.gl)|(goodotgl)|(\.com)|(dotcom)|(aly.sky)|(www))/i,
        notice: 'spam',
        index: 4},
    {regexp: /((?=.*bitch)|(?=.*slut)|(?=.*whore)|(?=.*ugly)|(?=.*fat)|(?=.*pee)|(?=.*poo)|(?=.*peeing)|(?=.*fist)|(?=.*fart))/i,
        notice: 'rudeness',
        index: 5},
    {regexp: /((?=.*bb)|(?=.*baby)|(?=.*babby)|(?=.*daddy))/i,
        notice: 'bb or baby',
        index: 6},
    {regexp: /((?=.*f.?e.?e.?t)|(?=.*f33t?)|(?=.*foot)|(?=.*soles?)|(?=.*toes?))/i,
        notice: 'feet',
        index: 7},
    {regexp: /[^\x00-\x7F]+/,
        notice: 'non-english',
        index: 8},
    {regexp: /\b[A-Z]{2,}\b/,
        notice: 'all caps',
        index: 9},
    {regexp: /(please|plz|pls|pleas).?.?$/i,
        notice: 'demands',
        index: 0},      
    {regexp: /((^mast.?rbate.?.?$)|(^squirt.?.?$)|(^kiss.?.?$)|(^cum.?.?$)|(^twerk.?.?$)|(^ass.?.?$)|(^boobs?.?.?$)|(^pussy.?.?$)|(^doggy.?.?$)|(^anal.?.?$)|(^zoom.?.?$)|(^show.?.?$)|(^tits?.?.?$)|(?=.*stand up.?.?)|(?=.*face.?.?)|(?=.*watch my cam.?.?)|(?=.*watch me.?.?))/i,
        notice: 'demands',
        index: 0},           
]

cb.settings_choices = [
    {name: 'msgonentry', type: 'choice', choice1: 'yes', choice2: 'no', defaultValue: 'yes', label: "Display warning to greys on entry - set to no for busy rooms"},
    {name: 'mutehide', type: 'choice', choice1: 'mute', choice2: 'hide', defaultValue: 'mute', label: "Mute (replaces message) or hide (no notifications)"},
    {name: 're0', type: 'choice', choice1: 'yes', choice2: 'no', defaultValue: 'yes', label: "Mute demands (open/show/zoom/see/spread/touch & boobs/tits/ass/pussy/body/vagina/nipple)?"},
    {name: 're1', type: 'choice', choice1: 'yes', choice2: 'no', defaultValue: 'yes', label: "Mute graphics?"},
    {name: 're2', type: 'choice', choice1: 'yes', choice2: 'no', defaultValue: 'yes', label: "Mute sticky keys (3+ repeating characters eg. mmmm)?"},
    {name: 're3', type: 'choice', choice1: 'yes', choice2: 'no', defaultValue: 'yes', label: "Mute demand words (pm,c2c,private,pvt,prvt)?"},
    {name: 're4', type: 'choice', choice1: 'yes', choice2: 'no', defaultValue: 'yes', label: "Mute spam words (streamingnaked,18f cam,18female,erotimo,amecam,goo)?"},
    {name: 're5', type: 'choice', choice1: 'yes', choice2: 'no', defaultValue: 'yes', label: "Mute rude words (bitch,slut,whore,ugly,fat,pee,poo,peeing,fist,fart)?"},
    {name: 're6', type: 'choice', choice1: 'yes', choice2: 'no', defaultValue: 'yes', label: "Mute baby words (bb,baby,daddy)?"},
    {name: 're7', type: 'choice', choice1: 'yes', choice2: 'no', defaultValue: 'yes', label: "Mute feet words (feet,foot,soles,toes)?"},
    {name: 're8', type: 'choice', choice1: 'yes', choice2: 'no', defaultValue: 'yes', label: "Mute non-english characters (cyrillic,arabic,chinese,accented)?"},
    {name: 're9', type: 'choice', choice1: 'yes', choice2: 'no', defaultValue: 'yes', label: "Mute all caps?"},
];

cb.onEnter(function(user) {
    var i;
    
    if (cb.settings['msgonentry'] == 'yes') {

        if ((!user['has_tokens']) && (!user['is_mod']) && (!user['in_fanclub']) && (user['user'] != cb['room_slug'])) {
            cb.chatNotice('Welcome ' + user['user'] + '! No Grey Demands Graphics bot is running',user['user'],'',cb.settings['msgcolor'],'bold');   
            cb.chatNotice(EnterMsg,user['user'],'',cb.settings['msgcolor'],'bold');
            cb.chatNotice('Your message will be muted and you risk being silenced for violating these rules',user['user'],'',cb.settings['msgcolor'],'bold');   
        }
    }
});

function onEnterMsg(){
        var EnterMsg='';
        
        for (i=0; i<= MAX_REASONS; i++) {
            if (cb.settings['re' + i] == 'yes'){
                EnterMsg += 'No ' + mutereasons[i].notice + ', ';
            }
        }
        return EnterMsg;
}

function checkmsg(msg) {  
    var i, tmpmsg, reason, mutemsg;
    mutemsg = false;
    if ((!msg['has_tokens']) && (!msg['is_mod']) && (!msg['in_fanclub']) && (!is_broadcaster(msg))) {

        for (i=0; i<= MAX_CHECKS; i++) {
            if (i==4) {
               tmpmsg = tmpmsg.replace(/\s+/g, '');
            } else {
               tmpmsg = msg['m'];
            }
            if ((tmpmsg.search(mutereasons[i].regexp) != -1) && (cb.settings['re' + mutereasons[i].index] == 'yes')){
                mutemsg = true;
                reason = mutereasons[i].notice;
            }
        }         
        if (mutemsg == true) {
            msg['m'] = "*** Muted for " + reason + " ***";
            if (cb.settings['mutehide'] == 'hide') {
                msg['X-Spam'] = true;
                cb.chatNotice('Your msg was hidden from chat',msg['user'],'','','bold');
            }
        }
    } 
}

function is_broadcaster(msg) {
    return (msg['user'] == cb.room_slug);
}

function init() {
    if (cb.settings['sendrules'] == 'yes') {
       EnterMsg = onEnterMsg();
    }
}

cb.onMessage(function (msg) {
    checkmsg(msg);
    return msg;
});

init();
