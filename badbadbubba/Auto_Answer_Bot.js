// https://chaturbate.com/apps/user_uploads/2/badbadbubba/
// https://chaturbate.com/apps/sourcecode/auto-answer-bot/?version=&slot=2

/* Title: Auto-answer bot
    Author: badbadbubba
    Version: 1.0.0 (07/22/2014)

    This bot is for automatically answering common questions.  Questions are currently hard-coded and not super efficient.
    
    V1.0.0 - Initial Release
    V1.0.1 (Aug 5 2014) - Search keywords are no longer hard coded.  Any combination of words can be searched.

    If you use 'mute-' in front of the answer, the message will not be displayed and the answer will be sent privately.
    
    Option to mute grey graphics.  A private notice is sent "No graphics please"
    Option to mute sticky keys (4 or more repeated characters).  A private notice is sent "No sticky keys please"
    Option to mute all caps.  A private notice is sent "No all caps please"
    
    This is an auto answer / mute bot.  Defaults are set for some common questions.
    Keywords are separated by '/' for synonyms and '&' for word combinations.  Do not start or end a question with these characters.
    Case insensitive and do not use spaces in questions.

    Examples
    Answer based on single word - word
    Answer base on two words - word1&word2
    Answer based on word1 or word2 and word3 - word1/word2&word3
*/

var srchexpr, maxquestions;

srchexpr = [];
maxquestions = 10;

cb.settings_choices = [

    {name: 'item1q', type: 'str', label: 'Question 1 keywords (no spaces)', defaultValue: 'what/how&size/big&boob/boobs/tits/tit'},
    {name: 'item1a', type: 'str', label: 'Question 1 answer', defaultValue: '36D'},
    {name: 'item2q', type: 'str', label: 'Question 2 keywords', defaultValue: 'what/have&twitter', required: false},
    {name: 'item2a', type: 'str', label: 'Question 2 answer', defaultValue: '@username', required: false},
    {name: 'item3q', type: 'str', label: 'Question 3 keywords', defaultValue: 'what/have&instagram', required: false},
    {name: 'item3a', type: 'str', label: 'Question 3 answer', defaultValue: '@username', required: false},
    {name: 'item4q', type: 'str', label: 'Question 4 keywords', defaultValue: 'boobs/tits&real/natural/fake', required: false},
    {name: 'item4a', type: 'str', label: 'Question 4 answer', defaultValue: "Don't ask please", required: false},
    {name: 'item5q', type: 'str', label: 'Question 5 keywords', defaultValue: 'what&are&tats/tattoos/ink', required: false},
    {name: 'item5a', type: 'str', label: 'Question 5 answer', defaultValue: ':readbio', required: false},
    {name: 'item6q', type: 'str', label: 'Question 6 keywords', defaultValue: 'show/open/zoom&boobs/boob/bobs/tits/pussy/ass', required: false},
    {name: 'item6a', type: 'str', label: 'Question 6 answer', defaultValue: 'mute-Please tip for requests', required: false},
    {name: 'item7q', type: 'str', label: 'Question 7 keywords', defaultValue: 'slut/whore/bitch/bb', required: false},
    {name: 'item7a', type: 'str', label: 'Question 7 answer', defaultValue: 'mute-Please do not use rude words in my room', required: false},
    {name: 'item8q', type: 'str', label: 'Question 8 keywords', defaultValue: 'watch&my&cam', required: false},
    {name: 'item8a', type: 'str', label: 'Question 8 answer', defaultValue: 'mute-Please do not spam my room', required: false},
    {name: 'item9q', type: 'str', label: 'Question 9 keywords', defaultValue: '', required: false},
    {name: 'item9a', type: 'str', label: 'Question 9 answer', defaultValue: '', required: false},
    {name: 'item10q', type: 'str', label: 'Question 10 keywords', defaultValue: '', required: false},
    {name: 'item10a', type: 'str', label: 'Question 10 answer', defaultValue: '', required: false},
    {name: 'mutegreygraphics', type: 'choice', choice1: 'yes', choice2: 'no', defaultValue: 'yes', label: "Mute grey graphics?"},
    {name: 'mutestickykeys', type: 'choice', choice1: 'yes', choice2: 'no', defaultValue: 'yes', label: "Mute sticky keys?"},
    {name: 'muteallcaps', type: 'choice', choice1: 'yes', choice2: 'no', defaultValue: 'yes', label: "Mute all caps?"},
];

function checkmsg(msg) {  
    var i, tmpmsg, re, ans;
    tmpmsg = msg['m'];
    for (i = 1; i <= maxquestions; i++) {
        ans = cb.settings['item' + i + 'a'];
        re = new RegExp(srchexpr[i], "i");
        if (srchexpr[i].length > 0) {
            if (tmpmsg.search(re) != -1) {
                if (ans.search('mute-') != -1) {
                    msg['X-Spam'] = true;          
                    cb.chatNotice(ans.replace('mute-',''),msg['user'],'','','bold');
                } else {
                    cb.chatNotice('Answer: ' + ans,'','','','bold');
                }
            }
        }  
    }
    if ((tmpmsg.search(/:\b/) != -1) && (!msg['has_tokens']) && (cb.settings['mutegreygraphics'] == 'yes')){
        msg['X-Spam'] = true;
        cb.chatNotice('No graphics please',msg['user'],'','','bold');
    }
    if ((tmpmsg.search(/(.)\1{3}/) != -1) && (cb.settings['mutestickykeys'] == 'yes')){
        msg['X-Spam'] = true;
        cb.chatNotice('No sticky keys please',msg['user'],'','','bold');
    }
    if ((tmpmsg === tmpmsg.toUpperCase()) && (cb.settings['muteallcaps'] == 'yes')){
        msg['X-Spam'] = true;
        cb.chatNotice('No all caps please',msg['user'],'','','bold');
    }
    if (msg['X-Spam'] == true) {
         cb.chatNotice(msg['user'] + "'s message has been muted");
    }
    
}

function retest() {
    var str, keywordarray, keywordstr, expressout, k, i, j;  
    for (k = 1; k <= maxquestions; k++) {
        expressout = "";
        str = cb.settings['item' + k + 'q'];
        if (str != null && str.length > 0) {
            keywordarray = str.split("&");
            for (i = 0; i <= (keywordarray.length - 1); i++) {
                keywordstr = keywordarray[i].split("/");
                expressout += "(";
                for (j = 0; j <= (keywordstr.length - 1); j++) {
                    if (j != 0) {
                        expressout += '|';
                    }
                    expressout += "(?=.*" + keywordstr[j] + ")";                       
                }
                expressout += ")";
            }
        }
        srchexpr[k] = expressout;
    }
}

function init() {
    retest();
}

cb.onMessage(function (msg) {
    checkmsg(msg);
    return msg;
});

init();
