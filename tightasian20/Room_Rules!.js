// https://chaturbate.com/apps/user_uploads/1/tightasian20/
// https://chaturbate.com/apps/sourcecode/room-rules-2/?version=&slot=1

/**
 * Bot: Room Rules
 * Version: 1.12
 * Author: zingknaat
 * Date: 01.18.14
 */


cb.settings_choices = [
    {name:'rule1', type:'str', minLength:1, maxLength:255, label:'Rule #1'},
    {name:'rule2', type:'str', minLength:1, maxLength:255, label:'Rule #2 (optional)', required:false},
    {name:'rule3', type:'str', minLength:1, maxLength:255, label:'Rule #3 (optional)', required:false},
    {name:'rule4', type:'str', minLength:1, maxLength:255, label:'Rule #4 (optional)', required:false},
    {name:'rule5', type:'str', minLength:1, maxLength:255, label:'Rule #5 (optional)', required:false},
    {name:'advertisement_wait_time', type:'choice', label:'Notification Time (in minutes)',
        choice1:5, choice2:10, choice3:15, choice4:20, choice5:25, choice6:30, choice7:45, choice8:60,
        defaultValue:15}
];

cb.onEnter(function(user) {
    cb.sendNotice('Welcome to my room, ' + user['user'] + '. Please take a moment to read my room rules before chatting. Thank you!', user['user'], '#CCF5EB', '', 'bold');
    displayRules(user);
});

function displayRules(user) {
    var username = '';
    if(user) username = user['user'];
    var notices = '########## ROOM RULES ##########';
    for(var i=1; i<=10;i++) {
        if(cb.settings['rule' + i]) notices += '\nRule #'+ i +': ' + cb.settings['rule'+i];
    }

    cb.sendNotice(notices, username, '', '#0066CC', 'bold');
    if(!user || user == null) cb.setTimeout(displayRules, cb.settings.advertisement_wait_time * 60000);
}

function init() {

    displayRules();
}

init();
