// https://chaturbate.com/apps/user_uploads/1/britney_and_justin/
// https://chaturbate.com/apps/sourcecode/ultra-bot/?version=&slot=1

/**
 Name: Ultra Bot
 Author: britney_and_justin
 Creation Date: 3/17/14
 Date Last Edited: 12/13/16
 Live Verson: 1.13
 Test Version: 1.13
**/

/**

 Purpose

 Room Control
 King Tip
 Leader Board
 Notifier
 Private Messages in Chat
 The Chaturbate Dick(less) List
 The Nice List

**/
/**
Change Log
 1.13       Made a change so that a person can't whisper the entire room.
            Change made as a result of comments from Carlos and 4Science
            Made it impossible to use /silence on moderators and room hosts.
            Change made as a result of a bug pointed out by lo_ol
 1.12       Add an option to enable or disable whispering, defaults to off
 1.11       Change made as a result of a suggestion by rz
            /silence and /unsilence now notify all mods that the command was issued.
 1.10       Change made as a result of a suggestion by rz
            Added a setting to change the background highlight color
 1.09       Changes made as a result of bugs pointed out by DeHaan
            Fixed typos in the help section.  Changed silencelevel and graphiclevel to avoid potential flooding
 1.08       Change made as a result of a bug pointed out by Dionne
            Added a check to make sure that a message consisting entirely of numbers does not trigger the "caps lock" feedback
 1.07       Change made as a result of a request from Lewis Goddard and wodinsday
            Added a setting for the host to toggle the automatic changing of "caps lock" messages to lower case
 1.06       Change made as a result of a suggestion from bate_n_switch and mnpugdog
            Changing the silence or graphic level will no longer send a message to the entire room; it will only send a message to mods and casters.
 1.05       Once again, thanks to acrazyguy for suggesting this change.
            Tip titles will no longer accidentally stop commands from going through
 1.04       Changes made as a result of suggestions from acrazyguy.  Thank you!
            Lightened the purple highlight to increase text contrast
            Added a toggle for "invalid command" warnings
 1.03       Fixed bugs with leaderboard, king tipper, and ultra app command support
 1.02       Added Level Up command support
            Added Ultra App command support
            Added a check to stop the bot from yelling about all caps if the message is all symbols
 1.01       Fixed a bug with leaderboard
            Fixed a bug with king tipper
 1.00       Initial release version
**/

//user settings
{
/**
    setting             ==>     result
    capsToggle          ==>     toggles the automatic toLower funciton for all caps messages
    invalidToggle       ==>     toggles the invalid command message
    tipTitles           ==>     toggles displaying the users' tips at the beginning of their messages
    kingTipper          ==>     toggle the King Tipper feature
    kingTipperSpam      ==>     toggles spamming "tip x to become king" every 5 minutes
    kingMin             ==>     minimum tip level for a user to be King
    kingTimer           ==>     interval for kingTipperSpam
    leaderBoard         ==>     toggles the Leader Board feature
    leaderBoardSpam     ==>     toggles spamming the top 3 tippers every 5 minutes
    leaderTimer         ==>     interval for leaderBoardSpam
    notiferEnter        ==>     toggle for message on enter
    enterMessage        ==>     message on enter
    notifierSpam        ==>     toggle for message on interval
    spamMessage         ==>     message on interval
    spamTimer           ==>     length of interval
    notifierTip         ==>     toggle for message on tip
    tipMessage          ==>     message on tip
    tipMessageMin       ==>     min tip for message
    dickList            ==>     toggle for auto-silencing users on the Chaturbate Dick(less) List
    niceList            ==>     list of users the host wants to guarantee voice and graphic privileges
    enableWhispers      ==>     enables whispering in chat
**/
cb.settings_choices =
[
    {name: 'color', label: 'Enter the six digit hex color code you would like to use for the background highlight.', type: 'str', minLength: 6, maxLength: 6, defaultValue: 'C287C2'},
    {name: 'capsToggle', label: 'Would you like the bot to convert all capital messages to all lowercase messages?', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'Yes'},
    {name: 'invalidToggle', label: 'Would you like the bot to send the user a message when an invalid command is entered?', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'Yes'},
    {name: 'tipTitles', label: 'Do you want to display users\' tip totals as titles?', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'Yes'},
    {name: 'kingTipper', label: 'Do you want to use the "King Tipper" feature?', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'Yes'},
    {name: 'kingTipperSpam', label: 'Do you want to periodically announce the tip required to become King?', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'Yes'},
    {name: 'kingMin', label: 'Enter the minimum tip level for a user to become King:', type: 'int', minValue: 1, maxValue: 1000000, defaultValue: 25},
    {name: 'kingTimer', label: 'Change this value if you would like the King announcement to happen at a different interval:', type: 'int', minValue: 1, maxValue: 60, defaultValue: 5},
    {name: 'leaderBoard', label: 'Would you like to use the Leader Board feature?', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'Yes'},
    {name: 'leaderBoardSpam', label: 'Do you want to periodically announce the top three tippers?', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'Yes'},
    {name: 'leaderTimer', label: 'Change this value if you would like the Leaderboard announcement to happen at a different interval:', type: 'int', minValue: 1, maxValue: 60, defaultValue: 5},
    {name: 'notifierEnter', label: 'Would you like to display a message for users when they enter the room?', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'Yes'},
    {name: 'enterMessage', label: 'Enter the message you would like to display.', type: 'str', minLength: 1, maxLength: 1000, defaultValue: 'Welcome to my room!'},
    {name: 'notifierSpam', label: 'Would you like to periodicaly send a message to the room?', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'Yes'},
    {name: 'spamMessage', label: 'Enter the message you would like to display.', type: 'str', minLength: 1, maxLength: 1000, defaultValue: 'Be nice!'},
    {name: 'spamTimer', label: 'Change this value if you would like the room announcement to happen at a different interval:', type: 'int', minValue: 1, maxValue: 60, defaultValue: 5},
    {name: 'notifierTip', label: 'Would you like to display a message when a user tips?', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'Yes'},
    {name: 'tipMessage', label: 'Enter the message you would like to display.', type: 'str', minLength: 1, maxLength: 1000, defaultValue: 'Thank you!'},
    {name: 'tipMessageMin', label: 'Enter the minimum tip amount that you would like to trigger the message', type: 'int', minValue: 1, maxValue: 1000000, defaultValue: 10},
    {name: 'dickList', label: 'Would you like to take advantage of the Chaturbate Dick(less) List?', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'Yes'},
    {name: 'niceList', label: 'Enter the names of any users you would like to guarantee voice and graphic usage privileges, regardless of the silence and graphic levels, separated by commas and without spaces:', type: 'str', minLength: 1, maxLength: 1000, defaultValue: '', required: false},
    {name: 'enableWhispers', label: 'Enable whispering (Private message to a user in chat)', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'No'}
]
}
//variables
{
/**
    Variable            ==>     Purpose
    tipperArray         ==>     [i][0] = User's name    [i][1] = User's total tips this session
    numTippers          ==>     number of users who have given tips this session
    modArray            ==>     array of mods
    eModArray           ==>     [i] = User's name, list of users who have been given emergency mod powers
    numMods             ==>     number of moderators this session
    numEMods            ==>     number of users who have been given emergency mod powers this session
    niceArray           ==>     [i] = user's name, list of users who have been added to the nice list
    numNice             ==>     number of users who have been added to the nice list
    silenceArray        ==>     [i] = User's name, list of users who have been silenced
    numSilenced         ==>     number of users who have been added to the silence list
    ignoreArray         ==>     [i][0] = user's name, [i][1] = user's ignore level, [i][j>1] = person on the user's ignore list
    numIgnorers         ==>     number of users who have added people to their ignore lists
    whisperArray        ==>     [i][0] = user's name, [i][1] = user who most recently whispered user [i][0]
    numWhispers         ==>     number of users stored in whisperArray
    silenceLevel        ==>     0 = anyone can talk 1 = users with tips can talk, 2 users who have tipped can talk, 3 = users who have tipped >=10 can talk
    graphicLevel        ==>     0 = anyone can use graphics 1 = users with tips can use graphics, 2 users who have tipped can use graphics, 3 = users who have tipped >=10 can use graphics
    startTime           ==>     the time the timer was started.  it is used to calculate time left
    timerDuration       ==>     length of the timer in minutes
    timeAdded           ==>     amount of time being added to a currently running timer
    currentKing         ==>     holds the user name of the current king
    kingTip             ==>     holds the value of the king tipper's tip total
    kingTimer           ==>     user defined interval for king spam
    leaderArray         ==>     array that holds the top 3 tippers' names and tip totals
    leaderTimer         ==>     user defined interval for leader spam
    initialize          ==>     runs init() once only
    kingTipperSpam      ==>     facilitates command to toggle king tipper spam
    notifierSpamTGL     ==>     facilitates command to toggle notifier spam
    leaderboardSpam     ==>     facilitates command to toggle leaderboard spam
    notifierMessage     ==>     message the user wants to send periodically
 **/
{
var tipperArray = new Array;
var numTippers = 0;
var modArray = new Array;
    modArray[0] = cb.room_slug;
var eModArray = new Array;
var numMods = 1;
var numEMods = 0;
var dickArray = [''];
var niceArray = new Array;
var numNice = 0;
var silenceArray = new Array;
var numSilenced = 0;
var ignoreArray = new Array;
var numIgnorers = 0;
var whisperArray = new Array;
var numWhispers = 0;
var silenceLevel = 0;
var graphicLevel = 1;
var startTime = 0;
var timerDuration = 0;
var timeAdded = 0;
var currentKing = '';
var kingTip = 0;
var kingTimer = parseInt(cb.settings.kingTimer);
var leaderArray = [['',0],['',0],['',0]];
var leaderTimer = parseInt(cb.settings.leaderTimer);
var initialize = 0;
var kingTipperSpam = 0;
var notifierSpamTGL = 0;
var leaderboardSpam = 0;
var notifierMessage = cb.settings.spamMessage;
//color codes
{
var purple = "#C287C2";//original color: #B369B3
}
}
}
//functions
{
/**
    Function                ==>     Purpose

    tipperArrayPopulate     ==>     adds tippers to the tipperArray
    findTipper              ==>     finds and returns the index of a user
    eModArrayPopulate       ==>     adds users to the eModArray
    niceArrayPopulate       ==>     adds users to the niceArray
    setSilenceLevel         ==>     called when /silencelevel is used.  sets silenceLevel
    setGraphicLevel         ==>     called when /graphiclevel is used.  sets graphiclevel
    silence                 ==>     called when /silence is used.  adds a user to the silenceArray
    unsilence               ==>     called when /unsilence is used.  removes a user from the silenceArray
    startTimer              ==>     called when /starttimer is used.  starts a timer for t minutes
    timer                   ==>     called from startTimer.  it's the actual timer
    fiveMinuteWarning       ==>     called from startTimer.  if t > 5, sounds a warning at 5 minutes remaining
    oneMinuteWarning        ==>     called from startTimer.  if t > 2, sounds a warning at 1 minute remaining
    timeLeft                ==>     called when /timeleft is used.  sends the user a notice with the time remaining
    addTime                 ==>     called when /addtime is used.  adds t minutes to the timer, if one is running
    sendWhisper             ==>     called when /whisper or an alias of /whisper is used.  sends a private message to a user in chat
    ignoreUser              ==>     called when /ignore is used.  adds a member to the user's ignore list
    unignoreUser            ==>     called when /unignore is used.  removes a member from the user's ignore list
    setIgnoreLevel          ==>     called when /ignorelevel is used.  sets ignoreLevel for the user
    setTipTitles            ==>     called from onMessage. appends the user's tips to the beginning of the message
    eMod                    ==>     called when /emod is used.  adds or removes a user from the eModArray
    kingSpam                ==>     spams "tip x to be king" every 5 minutes if the user setting allows it
    kingSpamTimer           ==>     the actual timer for kingSpam
    leaderSpam              ==>     spams the leaderboard every 5 minutes
    leaderSpamTimer         ==>     the actual timer for leaderSpam
    showLeaderBoard         ==>     called when /leaderboard is used.  shows the leaderboard
    notifierSpam            ==>     called from init, starts the timer for notifer spam
    notiferSpamTimer        ==>     the actual timer for notifierSpam
    nice                    ==>     called from /addnice and /removenice. adds and removes users from the niceArray
    kingSpamToggle          ==>     called when /kingspam is used. toggles the spam
    notifierSpamToggle      ==>     called when /notifierspam is used.  toggles the spam
    colorChecker            ==>     verifies the color code is valid
**/
{
function tipperArrayPopulate(user)
{
    tipperArray[numTippers] = new Array;
    tipperArray[numTippers][0] = user;
    tipperArray[numTippers][1] = 0;
    numTippers++;
}
function findTipper(user)
{
    //find the index of the user
    for(var i = 0; i < tipperArray.length; i++)
    {
        if(tipperArray[i][0] == user)
        {
            break;
        }
    }
    //the user is not in the array. add him and call findTipper
    if(i == tipperArray.length)
    {
        tipperArrayPopulate(user);
        findTipper(user);
    }
    return i;
}
function modArrayPopulate(user)
{
    modArray[numMods] = user;
    numMods++;
}
function eModArrayPopulate(user)
{
    eModArray[numEMods] = user;
    numEMods++;
}
function niceArrayPopulate(user)
{
    niceArray[numNice] = user;
    numNice++;
}
function silenceArrayPopulate(user)
{
    silenceArray[numSilenced] = user;
    numSilenced++;
}
function ignoreArrayPopulate(user)
{
    ignoreArray[numIgnorers] = new Array;
    ignoreArray[numIgnorers][0] = user;
    ignoreArray[numIgnorers][1] = 0;
    numIgnorers++;
}
function findIgnorer(user)
{
    for(i = 0; i < ignoreArray.length; i++)
    {
        if(ignoreArray[i][0] == user)
        {
            break;
        }
    }
    if(i == ignoreArray.length)
    {
        ignoreArrayPopulate(user);
        findIgnorer(user);
    }
    return i;
}
function whisperArrayPopulate(user)
{
    whisperArray[numWhispers] = new Array;
    whisperArray[numWhispers][0] = user;
    whisperArray[numWhispers][1] = '';
    numWhispers++;
}
function findWhisper(user)
{
    //find the index of the user
    for(var i = 0; i < whisperArray.length; i++)
    {
        if(whisperArray[i][0] == user)
        {
            break;
        }
    }
    //the user is not in the array. add him and call findWhisper
    if(i == whisperArray.length)
    {
        whisperArrayPopulate(user);
        findWhisper(user);
    }
    return i;
}
function setSilenceLevel(s, mod)
{
    if(parseInt(s) >= 0 && parseInt(s) <= 3)
    {
        silenceLevel = parseInt(s);

        cb.sendNotice("The silence level has been set to " + s + ".", cb.room_slug, purple);
        cb.sendNotice("The silence level has been set to " + s + ".", "", purple, "", "", 'red');

        switch(parseInt(s))
            {
                case 0:
                    cb.sendNotice('All members can talk in chat.',cb.room_slug,purple);
                    cb.sendNotice('All members can talk in chat.',"",purple,"","",'red');
                    break;
                case 1:
                    cb.sendNotice('Only members with tokens can talk in chat.',cb.room_slug,purple);
                    cb.sendNotice('Only members with tokens can talk in chat.',"",purple,"","",'red');
                    break;
                case 2:
                    cb.sendNotice('Only members who have tipped can talk in chat.',cb.room_slug,purple);
                    cb.sendNotice('Only members who have tipped can talk in chat.',"",purple,"","",'red');
                    break;
                case 3:
                    cb.sendNotice('Only members who have tipped at least 10 tokens can talk in chat.',cb.room_slug,purple);
                    cb.sendNotice('Only members who have tipped at least 10 tokens can talk in chat.',"",purple,"","",'red');
                    break;
            }
    }
    else
    {
        cb.sendNotice(s + ' is not a valid setting.\nType "/ubhelp silencelevel" to see how to use /silencelevel.',mod,purple);
    }
}
function setGraphicLevel(s, mod)
{
    if(parseInt(s) >= 0 && parseInt(s) <= 3)
    {
        graphicLevel = parseInt(s);

            cb.sendNotice('The graphic level has been set to ' + s + '.',cb.room_slug,purple);
            cb.sendNotice('The graphic level has been set to ' + s + '.',"",purple,"","",'red');

            switch(parseInt(s))
            {
                case 0:
                    cb.sendNotice('All members can use graphics in chat.',cb.room_slug,purple);
                    cb.sendNotice('All members can use graphics in chat.',"",purple,"","",'red');
                    break;
                case 1:
                    cb.sendNotice('Only members with tokens can use graphics in chat.',cb.room_slug,purple);
                    cb.sendNotice('Only members with tokens can use graphics in chat.',"",purple,"","",'red');
                    break;
                case 2:
                    cb.sendNotice('Only members who have tipped can use graphics in chat.',cb.room_slug,purple);
                    cb.sendNotice('Only members who have tipped can use graphics in chat.',"",purple,"","",'red');
                    break;
                case 3:
                    cb.sendNotice('Only members who have tipped at least 10 tokens can use graphics in chat.',cb.room_slug,purple);
                    cb.sendNotice('Only members who have tipped at least 10 tokens can use graphics in chat.',"",purple,"","",'red');
                    break;
            }
    }
    else
    {
        cb.sendNotice(s + ' is not a valid setting.\nType "/ubhelp graphiclevel" to see how to use /graphiclevel.',mod,purple);
    }

}
function silence(user, mod)
{
    if(cbjs.arrayContains(silenceArray,user))
    {
        cb.sendNotice(user + ' has already been silenced.',mod,purple);
    }
    else if(!cbjs.arrayContains(modArray,user) && user != cb.room_slug)
    {
        silenceArrayPopulate(user);
        cb.sendNotice(mod + ' has silenced ' + user + '.','',purple,'','','red');
    }
    if(cbjs.arrayContains(modArray,user) || user == cb.room_slug)
    {
        cb.sendNotice(user + ' is either a moderator or the room host and cannot be silenced.',mod,purple);
    }
}
function unsilence(user, mod)
{
    if(cbjs.arrayContains(silenceArray,user))
    {
        cbjs.arrayRemove(silenceArray,user);
        cb.sendNotice(mod + ' has unsilenced ' + user + '.','',purple,'','','red');
        cb.sendNotice('You have been unsilenced by ' + mod + '. Be nice and don\'t make demands. :smile',user,purple);
    }
    else
    {
        cb.sendNotice(user + ' does not need to be unsilenced.',mod,purple);
    }
}
function startTimer(t, mod)
{
    //there is no timer already running
    if(startTime == 0 && timeAdded == 0)
    {
        //verify a valid option was sent with /starttimer
        if(t >= 0 && t.toString().indexOf('.') == -1)
        {
            timerDuration = t;
            //notice of timer start
            if(mod != null)
            {
                cb.sendNotice(mod + ' has set a timer for ' + timerDuration + ' minutes!','',purple);
            }
            //local variable to convert noticeTime (minutes) to milliseconds
            var millis = timerDuration * 60000;
            var fiveMinutes = millis - 300000;
            var oneMinute = millis - 60000;

            //actual timer
            cb.setTimeout(timer,millis);
            //five minutes remaining announcement
            if(fiveMinutes > 0)
            {
                cb.setTimeout(fiveMinuteWarning,fiveMinutes);
            }
            //one minute remaining announcement
            cb.setTimeout(oneMinuteWarning,oneMinute);
            //set the start time
            startTime = new Date();
        }
        else if(t != null)
        {
            cb.sendNotice(t + ' is not a valid option for /starttimer.\nType /ubhelp starttimer to see how to use /starttimer.',mod,purple);
        }
        else if(t == null)
        {
            cb.sendNotice('You did not enter a valid option for /starttimer.\nType /ubhelp starttimer to see how to use /starttimer.',mod,purple);
        }
    }
    //there is a timer running and time has been added
    else if(startTime != 0 && timeAdded != 0 && mod == null)
    {
        timeAdded = 0;
        timerDuration = t;
        //local variable to convert noticeTime (minutes) to milliseconds
        var millis = timerDuration * 60000;
        var fiveMinutes = millis - 300000;
        var oneMinute = millis - 60000;

        //actual timer
        cb.setTimeout(timer,millis);
        //five minutes remaining announcement
        if(fiveMinutes > 0)
        {
            cb.setTimeout(fiveMinuteWarning,fiveMinutes);
        }
        //one minute remaining announcement
        cb.setTimeout(oneMinuteWarning,oneMinute);
    }
    //there is a timer running and someone tried to start a new timer
    else if(startTime != 0 && timeAdded == 0 || startTime != 0 && timeAdded != 0 && mod != null)
    {
        cb.sendNotice('There is a timer running already.',mod,purple);
    }
}
function timer()
{
    //check to see if /addTime has been used
    if(timeAdded == 0)
    {
        cb.sendNotice('Time is up!','',purple);
        startTime = 0;
        timerDuration = 0;
    }
    else
    {
        if(timeAdded == 5)
        {
            cb.sendNotice('There are 5 minutes remaining!','',purple);
        }
        startTimer(timeAdded);
    }
}
function fiveMinuteWarning()
{
    if(timeAdded == 0)
    {
        cb.sendNotice('There are 5 minutes remaining!','',purple);
    }
}
function oneMinuteWarning()
{
    if(timeAdded == 0)
    {
        cb.sendNotice('There is 1 minute remaining!','',purple);
    }
}
function timeLeft(user)
{
    if(startTime != 0)
    {
        //local variable for the current time
        var currentTime = new Date();
        //local variable to hold the time left
        var timeLeft = startTime.getHours()*3600 + startTime.getMinutes()*60 + startTime.getSeconds() + timerDuration*60 -
            currentTime.getHours()*3600 - currentTime.getMinutes()*60 - currentTime.getSeconds();
        //local variables for hours, minutes, and seconds remaining
        var hours = timeLeft/3600;
        hours = Math.floor(hours);
        var minutes = (timeLeft-hours*3600)/60;
        minutes = Math.floor(minutes);
        var seconds = timeLeft-hours*3600-minutes*60;
        //account for timeAdded
        minutes += timeAdded;

        //fix numbers after timeAdded
        if(hours < 0)
        {
            hours = 0;
            minutes = 0;
        }
        if(hours > 0)
        {
            if(hours > 9)
            {
                if(minutes > 9 && seconds > 9)
                {
                    cb.sendNotice('Time Remaining: ' + hours + ':' + minutes + ':' + seconds,user,purple);
                }
                else if(minutes > 9 && seconds <= 9)
                {
                    cb.sendNotice('Time Remaining: ' + hours + ':' + minutes + ':0' + seconds,user,purple);
                }
                else if(minutes <= 9 && seconds > 9)
                {
                    cb.sendNotice('Time Remaining: ' + hours + ':' + minutes + ':' + seconds,user,purple);
                }
                else if(minutes <= 9 && seconds <= 9)
                {
                    cb.sendNotice('Time Remaining: ' + hours + ':' + minutes + ':0' + seconds,user,purple);
                }
            }
            else
            {
                if(minutes > 9 && seconds > 9)
                {
                    cb.sendNotice('Time Remaining: 0' + hours + ':' + minutes + ':' + seconds,user,purple);
                }
                else if(minutes > 9 && seconds <= 9)
                {
                    cb.sendNotice('Time Remaining: 0' + hours + ':' + minutes + ':0' + seconds,user,purple);
                }
                else if(minutes <= 9 && seconds > 9)
                {
                    cb.sendNotice('Time Remaining: 0' + hours + ':' + minutes + ':' + seconds,user,purple);
                }
                else if(minutes <= 9 && seconds <= 9)
                {
                    cb.sendNotice('Time Remaining: 0' + hours + ':' + minutes + ':0' + seconds,user,purple);
                }
            }
        }
        else if(hours == 0 && minutes > 0)
        {

            if(minutes > 9 && seconds > 9)
            {
                cb.sendNotice('Time Remaining: 00:' + minutes + ':' + seconds,user,purple);
            }
            else if(minutes > 9 && seconds <= 9)
            {
                cb.sendNotice('Time Remaining: 00:' + minutes + ':0' + seconds,user,purple);
            }
            else if(minutes <= 9 && seconds > 9)
            {
                cb.sendNotice('Time Remaining: 00:0' + minutes + ':' + seconds,user,purple);
            }
            else if(minutes <= 9 && seconds <= 9)
            {
                cb.sendNotice('Time Remaining: 00:0' + minutes + ':0' + seconds,user,purple);
            }
        }
        else if(hours == 0 && minutes == 0 && seconds > 0)
        {
            if(seconds > 9)
            {
                cb.sendNotice('Time Remaining: 00:00' + ':' + seconds,user,purple);
            }
            else
            {
                cb.sendNotice('Time Remaining: 00:00' + ':0' + seconds,user,purple);
            }
        }
        else
        {
            cb.sendNotice('hours: ' + hours + '\nminutes: ' + minutes + '\nseconds: ' + seconds);
        }
    }
    else
    {
        cb.sendNotice('There is no timer running.',user,purple);
    }
}
function addTime(t, mod)
{
    if(t > 0 && t.toString().indexOf('.') == -1)
    {
        if(startTime != 0)
        {
            timeAdded = parseInt(t);

            //notice of timer start
            if(timeAdded == 1)
            {
                cb.sendNotice(mod + ' has has added 1 minute to the timer!','',purple);
            }
            else
            {
                cb.sendNotice(mod + ' has has added ' + timeAdded + ' minutes to the timer!','',purple);
            }
        }
        else
        {
            cb.sendNotice('There is no timer running.',mod,purple);
        }
    }
    else if(t != null)
    {
        cb.sendNotice(t + ' is not a valid option for /addtime.\nType /ubhelp addtime to see how to use /addtime.',mod,purple);
    }
    else if(t == null)
    {
        cb.sendNotice('You did not enter a valid option for /addtime.\nType /ubhelp addtime to see how to use /addtime.',mod,purple);
    }
}
function sendWhisper(message,from, mod, tokens)
{
    if(message[1] != from && message[1] != " ")
    {
        if(!cbjs.arrayContains(ignoreArray[findIgnorer(message[1])],from) || mod == 'true')
        {
            switch(parseInt(ignoreArray[findIgnorer(message[1])][1]))
            {
                case 0:
                    var m = from + ': ';
                    //build the message
                    for(var i = 2; i < message.length; i++)
                    {
                        if(i == 2)
                        {
                            m += message[i];
                        }
                        else
                        {
                            m += ' ' + message[i];
                        }
                    }
                    whisperArray[findWhisper(message[1])][1] = from;
                    cb.sendNotice(m,message[1],purple);
                    break;
                case 1:
                    if(tokens || mod)
                    {
                        var m = from + ': ';
                        //build the message
                        for(var i = 2; i < message.length; i++)
                        {
                            if(i == 2)
                            {
                                m += message[i];
                            }
                            else
                            {
                                m += ' ' + message[i];
                            }
                        }
                        whisperArray[findWhisper(message[1])][1] = from;
                        cb.sendNotice(m,message[1],purple);
                    }
                    else
                    {
                        cb.sendNotice(message[1] + ' is ignoring whispers from all members who don\'t have tokens.',from,purple);
                    }
                    break;
                case 2:
                    if(tipperArray[findTipper(from)][1] > 0 || mod)
                    {
                        var m = from + ': ';
                        //build the message
                        for(var i = 2; i < message.length; i++)
                        {
                            if(i == 2)
                            {
                                m += message[i];
                            }
                            else
                            {
                                m += ' ' + message[i];
                            }
                        }
                        whisperArray[findWhisper(message[1])][1] = from;
                        cb.sendNotice(m,message[1],purple);
                    }
                    else
                    {
                        cb.sendNotice(message[1] + ' is ignoring whispers from all members who haven\'t tipped any tokens.',from,purple);
                    }
                    break;
                case 3:
                    if(tipperArray[findTipper(from)][1] > 10 || mod)
                    {
                        var m = from + ': ';
                        //build the message
                        for(var i = 2; i < message.length; i++)
                        {
                            if(i == 2)
                            {
                                m += message[i];
                            }
                            else
                            {
                                m += ' ' + message[i];
                            }
                        }
                        whisperArray[findWhisper(message[1])][1] = from;
                        cb.sendNotice(m,message[1],purple);
                    }
                    else
                    {
                        cb.sendNotice(message[1] + ' is ignoring whispers from all members who haven\'t tipped at least 10 tokens.',from,purple);
                    }
                    break;
            }

        }
        else
        {
            cb.sendNotice(message[1] + ' is ignoring whispers from you.  Your message was not sent.',from,purple)
        }
    }
    else if(message[1] == from)
    {
        cb.sendNotice('Talking to yourself is a little odd...',from,purple);
    }
    else if(message[1] == " ")
    {
        cb.sendNotice('You failed to enter a recipient for your message.',from,purple);
    }
}
function sendReply(message, from)
{
    if(!cbjs.arrayContains(ignoreArray[findIgnorer(whisperArray[findWhisper(from)][1])],from))
    {
        if(whisperArray[findWhisper(from)][1] != '')
        {
            var m = from + ': ';
            //build the message
            for(var i = 1; i < message.length; i++)
            {
                if(i == 1)
                {
                    m += message[i];
                }
                else
                {
                    m += ' ' + message[i];
                }
            }
            whisperArray[findWhisper(whisperArray[findWhisper(from)][1])][1] = from;
            cb.sendNotice(m,whisperArray[findWhisper(from)][1],purple);
        }
        else
        {
            cb.sendNotice('No one has whispered you.',from,purple);
        }
    }
    else
    {
        cb.sendNotice(whisperArray[findWhisper(from)][1] + ' is ignoring whispers from you.  Your message was not sent.',from,purple)
    }

}
function ignoreUser(user, from)
{
    if(cbjs.arrayContains(ignoreArray[findIgnorer(from)],user))
    {
        if(user == from)
        {
            cb.sendNotice('You can\'t ignore yourself.  You may want to consult a therapist.',from,purple);
        }
        else
        {
            cb.sendNotice('You are already ignoring that user\'s whispers.',from,purple);
        }
    }
    else
    {
        ignoreArray[findIgnorer(from)][ignoreArray[findIgnorer(from)].length] = user;
        cb.sendNotice('You are now ignoring whispers from ' + user + '.',from,purple);
        cb.sendNotice('Remember, the room host, moderators, and fan club members will always be able to whisper you!',user,purple);
    }
}
function unignoreUser(user,from)
{
    if(user == from)
    {
        cb.sendNotice('My, you are an odd one, aren\'t you?', from, purple);
    }
    else if(cbjs.arrayContains(ignoreArray[findIgnorer(from)],user))
    {
        cbjs.arrayRemove(ignoreArray[findIgnorer(from)],user);
        cb.sendNotice('You are no longer ignoring whispers from ' + user, from, purple);
    }
    else
    {
        cb.sendNotice(user + ' is not being ignored.  There is no need to unignore ' + user, from, purple);
    }
}
function setIgnoreLevel(l,user)
{
    ignoreArray[findIgnorer(user)][1] = l;
    switch(parseInt(l))
    {
        case 0:
            cb.sendNotice('You have set your whisper ignore level to ' + l + '.\nYou are accepting whispers from everyone.',user,purple);
            break;
        case 1:
            cb.sendNotice('You have set your whisper ignore level to ' + l + '.\nYou are accepting whispers from everyone who has tokens.',user,purple);
            break;
        case 2:
            cb.sendNotice('You have set your whisper ignore level to ' + l + '.\nYou are accepting whispers from everyone who has tipped at least 1 token.',user,purple);
            break;
        case 3:
            cb.sendNotice('You have set your whisper ignore level to ' + l + '.\nYou are accepting whispers from everyone who has tipped at least 10 tokens.',user,purple);
            break;
    }
    cb.sendNotice('Remember, the room host, moderators, and fan club members will always be able to whisper you!',user,purple);
}
function setTipTitles(user, message)
{
    if(cb.settings.kingTipper == 'Yes' && user == currentKing)
    {
        var m = ':smallCrown |' + tipperArray[findTipper(user)][1] + '| ' + message;
    }
    else
    {
        var m = '|' + tipperArray[findTipper(user)][1] + '| ' + message;
    }

    return m;
}
function eMod(ar,user,from)
{
    if(ar == 'add')
    {
        if(!cbjs.arrayContains(eModArray,user))
        {
            eModArrayPopulate(user);
            cb.sendNotice('Emergency moderator powers have been granted to ' + user,from,purple);
            cb.sendNotice('You have been granted emergency moderator powers by ' + from,user,purple);
        }
        else
        {
            cb.sendNotice(user + ' has already been granted emergency moderator powers.',from,purple);
        }
    }
    else if(ar == 'remove')
    {
        if(cbjs.arrayContains(eModArray,user))
        {
            cbjs.arrayRemove(eModArray,user);
            cb.sendNotice('Emergency moderator powers have been removed from ' + user,from,purple);
            cb.sendNotice('Your emergency moderator powers have been removed by ' + from,user,purple);
        }
        else
        {
            cb.sendNotice(user + ' has not been granted emergency moderator powers.',from,purple);
        }
    }
    else
    {
        cb.sendNotice(ar + ' is not a valid option for /emod.  Type /ubhelp emod to see how to use /emod.',from,purple);
    }
}
function help(option,from)
{
    var valid = 0;

    if(option == null){option = '';}

    switch(option)
    {
        case '':
        {
            valid = 1;
            cb.sendNotice
                (
                    'Ultra Bot Help Menu'
                    ,from,purple
                );
            cb.sendNotice
                (
                    'Type /ubhelp x, where x is one of the following choices, for more detailed information.' +
                    '\nEx: /ubhelp commands'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            cb.sendNotice
                (
                    'commands\n' +
                    'dicklist\n' +
                    'nicelist\n' +
                    'about'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'commands':
        {
            valid = 1;
            cb.sendNotice
                ('Ultra Bot Command List'
                    ,from,purple
                );
            cb.sendNotice
                (
                    'Type /ubhelp x, where x is one of the following commands, for more detailed information.' +
                    '\nEx: /ubhelp silencelevel'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            cb.sendNotice
                (
                    '/silencelevel' +
                    '\n/graphiclevel' +
                    '\n/silence' +
                    '\n/unsilence' +
                    '\n/starttimer' +
                    '\n/addtime' +
                    '\n/timeleft' +
                    '\n/whisper' +
                    '\n/reply' +
                    '\n/ignore' +
                    '\n/unignore' +
                    '\n/ignorelevel' +
                    '\n/emod' +
                    '\n/addnice' +
                    '\n/removenice' +
                    '\n/leaderboard' +
                    '\n/kingspam' +
                    '\n/notifierspam' +
                    '\n/ubhelp'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'dicklist':
        {
            valid = 1;
            cb.sendNotice
                ('The Chaturbate Dick(less) List'
                    ,from,purple
                );
            cb.sendNotice
                (
                    'Sometimes, users are real dicks in chat.  ' +
                        'They make rude comments about the hosts\' appearances, pick fights with other users, and do various other things that warrant calling them dicks.  ' +
                        'As a room host, I would very much like to be able to silence those dicks before they ever get the chance to be dicks in my room, ' +
                        'and I am quite certain that the other hosts would like to be able to do that as well.' +
                        'With that in mind, I created the Chaturbate dick(less) List.' +
                        '\nWhen a user does something that qualifies him as being a dick, take a screenshot before he is silenced or banned.  ' +
                        'Save the screenshot and upload it to your Chaturbate profile page.  ' +
                        'Once it is uploaded, either post a message on the Ultra Bot page in the chaturbate.com/bots section including your username, ' +
                        'so I can find the screenshot, and the name of the user you would like to have added to the Chaturbate Dick(less) List, ' +
                        'or send a Tweet @brit_and_justin with the information.  ' +
                        'I will check the screenshot, to verify that you have found a real dick, and then add him to the Chaturbate Dick(less) List.  ' +
                        'Users on that list will be unable to send messages in any rooms that are running Ultra Bot!  ' +
                        'The more rooms that are running Ultra Bot, the more effective this list will become, so tell everyone to use it!' +
                        '\nIf you would like to see the current Chaturbate Dick(less) List, ' +
                        'I post the names of the users and the screenshots of the evidence on the Chaturbate Dick(less) Blog at http://britandjustin.tumblr.com/.'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'nicelist':
        {
            cb.sendNotice
                ('The Nice List'
                    ,from,purple
                );
            cb.sendNotice
                (
                    'Sometimes, there are users whose comments are desirable, but they either do not have tokens or do not tip frequently.  ' +
                        'When rooms get rowdy, hosts and mods are forced to do things like silence users without tokens or who have not tipped and those groups often includes the users whose comments hosts would like to see.  ' +
                        'To fix this problem, hosts and mods can add users to the Nice List.  ' +
                        'Users who are on the nice list can send messages regardless of the global silence setting.'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            valid = 1;
            break;
        }
        case 'about':
        {
            valid = 1;
            cb.sendNotice
                ('About Ultra Bot'
                    ,from,purple
                );
            cb.sendNotice
                (
                    'Ultra Bot was written by Justin of the Chaturbate couple britney_and_justin.' +
                    '\nComments, suggestions, requests, and bug reports can be communicated by either tweeting @brit_and_justin, ' +
                    'or by posting comments on Ultra Bot\'s page at chaturbate.com/bots.' +
                    '\nThe purpose of Ultra Bot is to make the lives of hosts and mods as easy as possible. ' +
                    'It adds popular features such as King Tipper, Leader Board, and Notifier, ' +
                    'grants quite a bit of power to moderators, and allows private messages to be sent in the main chat window.' +
                    '\nIt also has two new features called the "Dick List" and the "Nice List". ' +
                    'See the help sections of those two features for more information on them!' +
                    '\nBe on the lookout for Ultra App!'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'silencelevel':
        {
            valid = 1;
            cb.sendNotice
                ('/silencelevel Help'
                    ,from,purple
                );
            cb.sendNotice
                (
                    '/silencelevel is a command that is usable by moderators and room hosts.' +
                    '\nThe syntax for using silencelevel is "/silencelevel x", where x is a number between 0 and 3.' +
                    '\nSetting the Silence Level to 0 will grant voice privileges to all users, ' +
                    'setting it to 1 will revoke voice privileges from users without tokens, ' +
                    'setting it to 2 will revoke voice privileges from users who have not tipped, ' +
                    'and setting it to 3 will revoke voice privileges from users who have not tipped at least 10 tokens.' +
                    '\nThe default setting for /silencelevel is 0.' +
                    '\nRoom hosts, moderators, and fan club members are unaffected by the Silence Level.'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'graphiclevel':
        {
            valid = 1;
            cb.sendNotice
                ('/graphiclevel Help'
                    ,from,purple
                );
            cb.sendNotice
                (
                    '/graphiclevel is a command that is usable by moderators and room hosts.' +
                    '\nThe syntax for using graphiclevel is "/graphiclevel x", where x is a number between 0 and 3.' +
                    '\nSetting the Graphic Level to 0 will grant graphic usage privileges to all users, ' +
                    'setting it to 1 will revoke graphic usage privileges from users without tokens, ' +
                    'setting it to 2 will revoke graphic usage privileges from users who have not tipped, ' +
                    'and setting it to 3 will revoke graphic usage privileges from users who have not tipped at least 10 tokens.' +
                    '\nThe default setting for /graphiclevel is 0.' +
                    '\nRoom hosts, moderators, and fan club members are unaffected by the Graphic Level.'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'silence':
        {
            valid = 1;
            cb.sendNotice
                ('/silence Help'
                    ,from,purple
                );
            cb.sendNotice
                (
                    '/silence is a command that is usable by moderators and room hosts.' +
                    '\nThe syntax for using silence is "/silence x", where x is the username of the user you want to silence.' +
                    '\nThe effect of /silence is the same as Chaturbate\'s silence feature, ' +
                    'except that it lasts for the duration of the current session instead of for six hours.' +
                    '\nThe effect of /silence can be reversed by using the command /unsilence.'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'unsilence':
        {
            valid = 1;
            cb.sendNotice
                ('/unsilence Help'
                    ,from,purple
                );
            cb.sendNotice
                (
                    '/unsilence is a command that is usable by moderators and room hosts.' +
                    '\nThe syntax for using unsilence is "/unsilence x", where x is the username of the user you want to unsilence.' +
                    '\nunsilence simply grants voice privileges back to a user who was previously silenced.' +
                    '\nNOTE: /unsilence WILL NOT undo the effect of Chaturbate\'s silence feature!' +
                    '\n/unsilence WILL ONLY reverse the effect of /silence!'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'starttimer':
        {
            valid = 1;
            cb.sendNotice
                ('/starttimer Help'
                    ,from,purple
                );
            cb.sendNotice
                (
                    '/starttimer is a command that is usable by moderators and room hosts.' +
                    '\nThe syntax for using starttimer is "/starttimer x", where x is the desired duration of the timer in minutes.' +
                    '\n/starttimer will accept whole numbers only.' +
                    '\nThe timer will make announcements at five minutes remaining and at one minute remaining.' +
                    '\n/addtime can be used to add time to a currently running timer.' +
                    '\n/timeleft can be used to display the amount of time remaining on the timer.'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'addtime':
        {
            valid = 1;
            cb.sendNotice
                ('/addtime Help'
                    ,from,purple
                );
            cb.sendNotice
                (
                    '/addtime is a command that is usable by moderators and room hosts.' +
                    '\nThe syntax for using addtime is "/addtime x", where x is the amount of time you want to add in minutes.' +
                    '\n/addtime will accept whole numbers only.' +
                    '\nSee the help section for starttimer for more information on timers.'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'timeleft':
        {
            valid = 1;
            cb.sendNotice
                ('/timeleft Help'
                    ,from,purple
                );
            cb.sendNotice
                (
                    '/timeleft is a command that is usable by everyone.' +
                    '\nThe syntax for using timeleft is /timeleft' +
                    '\n/timeleft will display the amount of time left on the timer in the format 00:00:00' +
                    '\nSee the help section for starttimer for more information on timers.'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'whisper':
        {
            valid = 1;
	        if (cb.settings.enableWhispers != 'Yes') {
		        break;
	        }
            cb.sendNotice
                ('/whisper Help'
                    ,from,purple
                );
            cb.sendNotice
                (
                    '/whisper is a command that is usable by everyone.' +
                    '\nThe syntax for using whisper is "/whisper x y", where x is the username of the user you want to send a whisper and y is the message you want to send.' +
                    '\n/whisper, /w, /tell, /t, and /pm are all available commands that will send a whisper.' +
                    '\nA whisper is a private message that will be sent in the main chat window.' +
                    '\nOther related commands are /reply, /ignore, /unignore, and /ignorelevel.'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'reply':
        {
            valid = 1;
	        if (cb.settings.enableWhispers != 'Yes') {
		        break;
	        }
            cb.sendNotice
                ('/reply Help'
                    ,from,purple
                );
            cb.sendNotice
                (
                    '/reply is a command that is usable by everyone.' +
                    '\nThe syntax for using whisper is "/reply x", where x is message that you want to whisper to the user who most recently sent a whisper to you.' +
                    '\n/reply and /r are available commands that will send a whisper in reply.' +
                    '\nSee the help section for whisper for more information on whispers.' +
                    '\nOther related commands are /whisper, /ignore, /unignore, and /ignorelevel.'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'ignore':
        {
            valid = 1;
            cb.sendNotice
                ('/ignore Help'
                    ,from,purple
                );
            cb.sendNotice
                (
                    '/ignore is a command that is usable by everyone.' +
                    '\nThe syntax for using ignore is "/ignore x", where x is the user from whom you wish to ignore whispers.' +
                    '\nIgnoring a user will prevent him from sending you whispers, but it will not prevent him from talking normally in chat.' +
                    '\n/unignore will reverse the effect of /ignore.' +
                    '\nSee the help section for whisper for more information on whispers.' +
                    '\nOther related commands are /whisper, /reply, /unignore, and /ignorelevel.'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'unignore':
        {
            valid = 1;
            cb.sendNotice
                ('/unignore Help'
                    ,from,purple
                );
            cb.sendNotice
                (
                    '/unignore is a command that is usable by everyone.' +
                    '\nThe syntax for using unignore is "/unignore x", where x is the user you wish to remove from your ignore list.' +
                    '\nSee the help section for ignore for more information on ignoring users.' +
                    '\nSee the help section for whisper for more information on whispers.' +
                    '\nOther related commands are /whisper, /reply, /ignore, and /ignorelevel.'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'ingorelevel':
        {
            valid = 1;
            cb.sendNotice
                ('/ignorelevel Help'
                    ,from,purple
                );
            cb.sendNotice
                (
                    '/ignorelevel is a command that is usable by everyone.' +
                    '\nThe syntax for using ignorelevel is "/ignorelevel x", where x is a number between 0 and 3.' +
                    '\nSetting the Ignore Level to 0 will allow all users to send you whispers, ' +
                    'setting it to 1 will only allow users with tokens to send you whispers, ' +
                    'setting it to 2 will only allow users who have tipped to send you whispers, ' +
                    'and setting it to 3 will only allow users who have tipped at least 10 tokens to send you whispers.' +
                    '\nThe default setting for /ignorelevel is 0.' +
                    '\nSee the help section for whisper for more information on whispers' +
                    '\nOther related commands are /whisper, /reply, /ignore, and /unignore.'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'emod':
        {
            valid = 1;
            cb.sendNotice
                ('/emod Help'
                    ,from,purple
                );
            cb.sendNotice
                (
                    '/emod is a command that is usable by moderators and room hosts.' +
                    '\nThe syntax for using emod is "/emod x y", where x is either "add" or "remove" and y is the username of the user you want to either grant or revoke emergency moderator powers.' +
                    '\n/emod allows moderators to quickly grant other users access to moderator-only commands in the event that he is having difficulty controlling the room by himself.' +
                    '\nEmergency moderators have access to all moderator-only commands with the exceptions of /emod, /addnice, and /removenice.'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'addnice':
        {
            valid = 1;
            cb.sendNotice
                ('/addnice Help'
                    ,from,purple
                );
            cb.sendNotice
                (
                    '/addnice is a command that is usable by moderators and room hosts.' +
                    '\nThe syntax for using addnice is "/addnice x", where x is the username of the user you want to add to the nice list.' +
                    '\nAdding a user to the nice list guarantees that user voice and graphic usage privileges regardless of the silence, graphic, and ignore level settings.  ' +
                    'Using /silence or /ignore will still silence or ignore a user on the nice list.' +
                    '\nUsers can be removed from the nice list by using the command /removenice.' +
                    '\nSee the help sections for silencelevel, graphiclevel, and ignorelevel for more information on the global settings or the help section for nicelist for more information on the nice list.'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'removenice':
        {
            valid = 1;
            cb.sendNotice
                ('/removenice Help'
                    ,from,purple
                );
            cb.sendNotice
                (
                    '/removenice is a command that is usable by moderators and room hosts.' +
                    '\nThe syntax for using removenice is "/removenice x", where x is the username of the user you want to remove from the nice list.' +
                    '\nSee the help section for nicelist for more information on the nice list.'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'ubhelp':
        {
            valid = 1;
            cb.sendNotice
                ('/ubhelp Help'
                    ,from,purple
                );
            cb.sendNotice
                (
                    '/ubhelp is a command that is usable by everyone.' +
                    '\nThe syntax for using ubhelp is "/ubhelp x", where x is the subsection of the help menu that you want to access.'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'leaderboard':
        {
            valid = 1;
            cb.sendNotice
                ('/leaderboard Help'
                    ,from,purple
                );
            cb.sendNotice
                (
                    '/leaderboard is a command that is usable by everyone.' +
                    '\nThe syntax for using leaderboard is "/leaderboard".' +
                    '\n/leaderboard shows the top 3 tippers of the current session.'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'kingspam':
        {
            valid = 1;
            cb.sendNotice
                ('/kingspam Help'
                    ,from,purple
                );
            cb.sendNotice
                (
                    '/kingspam is a command that is usable by moderators and room hosts.' +
                    '\nThe syntax for using kingspam is /kingspam x, where x is either on or off.  ' +
                    'Using this command toggles the spamming of the message "Tip x to become the new King!"'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'notifierspam':
        {
            valid = 1;
            cb.sendNotice
                ('/notifierspam Help'
                    ,from,purple
                );
            cb.sendNotice
                (
                    '/notifierspam is a command that is usable by moderators and room hosts.' +
                    '\nThe syntax for using notifierspam is /notifierspam x, where x is either on or off.  ' +
                    'Using this command toggles the spamming of the periodic message defined by the host.'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
        case 'leaderboardspam':
        {
            valid = 1;
            cb.sendNotice
                ('/leaderboardspam Help'
                    ,from,purple
                );
            cb.sendNotice
                (
                    '/leaderboardspam is a command that is usable by moderators and room hosts.' +
                    '\nThe syntax for using leaderboardspam is /leaderboardspam x, where x is either on or off.  ' +
                    'Using this command toggles the spamming of the top three tippers.'
                    ,from
                );
            cb.sendNotice
                (
                    ''
                    ,from,purple
                );
            break;
        }
    }
    if(valid == 0)
    {
        cb.sendNotice(option + ' is not a valid subsection of the help menu.  Type /ubhelp to access the main help menu.',from,purple);
    }
}
function kingSpam()
{
    cb.setTimeout(kingSpamTimer,cb.settings.kingTimer*60000);
}
function kingSpamTimer()
{
    if(kingTip < parseInt(cb.settings.kingMin))
    {
        var supplant = cb.settings.kingMin;
    }
    else
    {
        var supplant = kingTip + 1;
    }
    if(kingTipperSpam == 1)
    {
        cb.sendNotice('Tip ' + supplant + ' to become the new King!','',purple);
        kingSpam();
    }
}
function leaderSpam()
{
    cb.setTimeout(leaderSpamTimer,cb.settings.leaderTimer*60000);
}
function leaderSpamTimer()
{
    if(leaderboardSpam == 1)
    {
        cb.sendNotice('Leaderboard!','',purple);
        cb.sendNotice
            (
                leaderArray[0][0] + ' : ' + leaderArray[0][1] +
                    '\n' + leaderArray[1][0] + ' : ' + leaderArray[1][1] +
                    '\n' + leaderArray[2][0] + ' : ' + leaderArray[2][1]
            );
        cb.sendNotice
            (
                ''
                ,'',purple);

        leaderSpam();
    }
}
function showLeaderBoard(from)
{
    if(cb.settings.leaderBoard == 'Yes')
    {
        cb.sendNotice
            (
                'Leaderboard!'
                ,from,purple
            );
        cb.sendNotice
            (
                leaderArray[0][0] + ' : ' + leaderArray[0][1] +
                    '\n' + leaderArray[1][0] + ' : ' + leaderArray[1][1] +
                    '\n' + leaderArray[2][0] + ' : ' + leaderArray[2][1]
                ,from);
        cb.sendNotice
            (
                ''
                ,from,purple);
    }
    else
    {
        cb.sendNotice('The room host has decided not to use the Leaderboard feature.',from,purple);
    }

}
function notifierSpam()
{
    cb.setTimeout(notifierSpamTimer,cb.settings.spamTimer*60000);
}
function notifierSpamTimer()
{
    if(notifierSpamTGL == 1)
    {
        cb.sendNotice(notifierMessage,'',purple);
        notifierSpam();
    }
}
function nice(user,mod,ar)
{
    if(ar == 'a')
    {
        if(!cbjs.arrayContains(niceArray,user))
        {
            niceArrayPopulate(user);
            cb.sendNotice('You have added ' + user + ' to the nice list.', mod, purple);
            cb.sendNotice(mod + ' has added you to the nice list.  You will be able to chat and use graphcs regardless of the global room settings.  Thank you for being nice!',user,purple);
        }
        else
        {
            cb.sendNotice(user + ' is already on the nice list.', mod, purple);
        }
    }
    else if(ar == 'r')
    {
        if(cbjs.arrayContains(niceArray,user))
        {
            cbjs.arrayRemove(niceArray,user);
            cb.sendNotice('You have removed ' + user + ' from the nice list.', mod, purple);
            cb.sendNotice(mod + ' has removed you from the nice list.', user, purple);
        }
        else
        {
            cb.sendNotice(user + ' is not on the nice list.', mod, purple);
        }
    }
}
function kingSpamToggle(option, mod)
{
    if(option == 'on')
    {
        if(kingTipperSpam == 1)
        {
            cb.sendNotice('The King Tipper spam is already turned on.',mod,purple);
        }
        else
        {
            kingTipperSpam == 1;
            cb.sendNotice('You have turned on King Tipper spam.',mod,purple);
        }
    }
    else if(option == 'off')
    {
        if(kingTipperSpam == 0)
        {
            cb.sendNotice('The King Tipper spam is already turned off.',mod,purple);
        }
        else
        {
            kingTipperSpam == 0;
            cb.sendNotice('You have turned off the King Tipper spam.',mod,purple);
        }
    }
    else if(option != null)
    {
        cb.sendNotice(option + ' is not a valid option for /kingspam.\nType /ubhelp kingspam to see how to use /kingspam.',mod,purple);
    }
    else if(option == null)
    {
        cb.sendNotice('You did not enter a valid option for /kingspam.\nType /ubhelp kingspam to see how to use /kingspam.',mod,purple);
    }
}
function notifierSpamToggle(option, mod)
{
    if(option == 'on')
    {
        if(notifierSpamTGL == 1)
        {
            cb.sendNotice('The Notifier spam is already turned on.',mod,purple);
        }
        else
        {
            notifierSpamTGL == 1;
            cb.sendNotice('You have turned on the Notifier spam.',mod,purple);
        }
    }
    else if(option == 'off')
    {
        if(notifierSpamTGL == 0)
        {
            cb.sendNotice('The Notifier spam is already turned off.',mod,purple);
        }
        else
        {
            notifierSpamTGL == 0;
            cb.sendNotice('You have turned off the Notifier spam.',mod,purple);
        }
    }
    else if(option != null)
    {
        cb.sendNotice(option + ' is not a valid option for /notifierspam.\nType /ubhelp notifierspam to see how to use /notifierspam.',mod,purple);
    }
    else if(option == null)
    {
        cb.sendNotice('You did not enter a valid option for /notifierspam.\nType /ubhelp notifierspam to see how to use /notifierspam.',mod,purple);
    }
}
function leaderboardSpamToggle(option, mod)
{
    if(option == 'on')
    {
        if(leaderboardSpam == 1)
        {
            cb.sendNotice('The Leaderboard spam is already turned on.',mod,purple);
        }
        else
        {
            leaderboardSpam == 1;
            cb.sendNotice('You have turned on the Leaderboard spam.',mod,purple);
        }
    }
    else if(option == 'off')
    {
        if(leaderboardSpam == 0)
        {
            cb.sendNotice('The Leaderboard spam is already turned off.',mod,purple);
        }
        else
        {
            leaderboardSpam == 0;
            cb.sendNotice('You have turned off the Leaderboard spam.',mod,purple);
        }
    }
    else if(option != null)
    {
        cb.sendNotice(option + ' is not a valid option for /leaderboardspam.\nType /ubhelp leaderboardspam to see how to use /leaderboardspam.',mod,purple);
    }
    else if(option == null)
    {
        cb.sendNotice('You did not enter a valid option for /leaderboardspam.\nType /ubhelp leaderboardspam to see how to use /leaderboardspam.',mod,purple);
    }
}
function colorChecker()
{
    var colorString = '0123456789abcdefABCDEF';
    var valid = true;
    var color = "C287C2";

    if(cb.settings.color != null)
    {
        color = cb.settings.color;
    }

    for(var i = 0; i < 6; i++)
    {
        if(colorString.indexOf(color.charAt(i)) == -1)
        {
            valid = false;
        }

        if(valid == false)
        {
            purple = '#C287C2';
            cb.sendNotice(color + ' is not a valid option for the highlight color.  Hex color codes use numbers and letters only.\nUse www.color-hex.com to find the code for the color you want.\nDo not include the #.\nReverting to default color.',cb.room_slug,purple);
            break;
        }
    }
    if(valid)
    {
        purple = '#' + cb.settings.color;
    }
}
}
}
//onMessage
{
cb.onMessage(function (msg)
{
    //turn the message into an array
    var message = msg['m'].split(' ');
    //0 = invalid command, 1 = valid command
    var cmd = 0;
    //1 = user is already silenced
    var silenced = 0;
    var symbolString = '~`!@#$%^&*()_-+={[}]|\\:;"\'<,>.?/';

    //check to see if the user is attempting to use a command
    if(message[0].charAt(0) == '/')
    {
        //don't print this message to chat
        msg['X-Spam'] = true;

        switch(message[0])
        {
            case '/silencelevel':
            {
                //user entered a proper command
                cmd = 1;

                //permission check
                if(msg['is_mod'] || msg['user'] == cb.room_slug || cbjs.arrayContains(eModArray,msg['user']))
                {
                    setSilenceLevel(message[1], msg['user']);
                }
                else
                {
                    cb.sendNotice('Only moderators and broadcasters are able to use that command.\nType "/ubhelp commands" to see a full list of the available commands.',msg['user'],purple);
                }
                break;
            }
            case '/graphiclevel':
            {
                //user entered a proper command
                cmd = 1;

                //permission check
                if(msg['is_mod'] || msg['user'] == cb.room_slug || cbjs.arrayContains(eModArray,msg['user']))
                {
                    setGraphicLevel(message[1], msg['user']);
                }
                else
                {
                    cb.sendNotice('Only moderators and broadcasters are able to use that command.\nType "/ubhelp commands" to see a full list of the available commands.',msg['user'],purple);
                }
                break;
            }
            case '/silence':
            {
                //user entered a proper command
                cmd = 1;

                //permission check
                if(msg['is_mod'] || msg['user'] == cb.room_slug || cbjs.arrayContains(eModArray,msg['user']))
                {
                    silence(message[1], msg['user']);
                }
                else
                {
                    cb.sendNotice('Only moderators and broadcasters are able to use that command.\nType "/ubhelp commands" to see a full list of the available commands.',msg['user'],purple);
                }
                break;
            }
            case '/unsilence':
            {
                //user entered a proper command
                cmd = 1;

                //permission check
                if(msg['is_mod'] || msg['user'] == cb.room_slug || cbjs.arrayContains(eModArray,msg['user']))
                {
                    unsilence(message[1], msg['user']);
                }
                else
                {
                    cb.sendNotice('Only moderators and broadcasters are able to use that command.\nType "/ubhelp commands" to see a full list of the available commands.',msg['user'],purple);
                }
                break;
            }
            case '/starttimer':
            {
                //user entered a proper command
                cmd = 1;

                //permission check
                if(msg['is_mod'] || msg['user'] == cb.room_slug || cbjs.arrayContains(eModArray,msg['user']))
                {
                    startTimer(message[1], msg['user']);
                }
                else
                {
                    cb.sendNotice('Only moderators and broadcasters are able to use that command.\nType "/ubhelp commands" to see a full list of the available commands.',msg['user'],purple);
                }
                break;
            }
            case '/addtime':
            {
                //user entered a proper command
                cmd = 1;

                //permission check
                if(msg['is_mod'] || msg['user'] == cb.room_slug || cbjs.arrayContains(eModArray,msg['user']))
                {
                    addTime(message[1], msg['user']);
                }
                else
                {
                    cb.sendNotice('Only moderators and broadcasters are able to use that command.\nType "/ubhelp commands" to see a full list of the available commands.',msg['user'],purple);
                }
                break;
            }
            case '/timeleft':
            {
                //user entered a proper command
                cmd = 1;
                timeLeft(msg['user']);
                break;
            }
            case '/whisper':
            case '/w':
            case '/tell':
            case '/t':
            case '/pm':
            {
	            if (cb.settings.enableWhispers != 'Yes') {
		            break;
	            }
                //user entered a proper command
                cmd = 1;
                //check to see if the whisperer is a mod/host
                if(msg['is_mod'] || msg['in_fanclub'] || msg['user'] == cb.room_slug || cbjs.arrayContains(eModArray,msg['user']) || cbjs.arrayContains(niceArray,msg['user']))
                {
                    sendWhisper(message,msg['user'],true,msg['has_tokens']);
                }
                else
                {
                    sendWhisper(message,msg['user'],false,msg['has_tokens']);
                }
                msg['background'] = purple;
                break;
            }
            case '/reply':
            case '/r':
            {
	            if (cb.settings.enableWhispers != 'Yes') {
		            break;
	            }
                //user entered a proper command
                cmd = 1;

                sendReply(message, msg['user']);
                msg['background'] = purple;
                break;
            }
            case '/ignorelevel':
            {
                //user entered a proper command
                cmd = 1;
                setIgnoreLevel(message[1],msg['user']);
                break;
            }
            case '/ignore':
            {
                //user entered a proper command
                cmd = 1;
                ignoreUser(message[1],msg['user']);
                break;
            }
            case '/unignore':
            {
                //user entered a proper command
                cmd = 1;
                unignoreUser(message[1],msg['user']);
                break;
            }
            case '/emod':
            {
                //user entered a proper command
                cmd = 1;

                if(msg['is_mod'] || msg['user'] == cb.room_slug)
                {
                    eMod(message[1],message[2],msg['user']);
                }
                else
                {
                    cb.sendNotice('Only moderators and broadcasters are able to use that command.\nType "/ubhelp commands" to see a full list of the available commands.',msg['user'],purple);
                }

                break;
            }
            case '/addnice':
            {
                //user entered a proper command
                cmd = 1;

                if(msg['is_mod'] || msg['user'] == cb.room_slug)
                {
                    nice(message[1],msg['user'],'a');
                }
                break;
            }
            case '/removenice':
            {
                //user entered a proper command
                cmd = 1;

                if(msg['is_mod'] || msg['user'] == cb.room_slug)
                {
                    nice(message[1],msg['user'],'r');
                }
                break;
            }
            case '/ubhelp':
            {
                //user entered a proper command
                cmd = 1;

                help(message[1],msg['user']);
                break;
            }
            case '/leaderboard':
            {
                //user entered a proper command
                cmd = 1;

                showLeaderBoard(msg['user']);
                break;
            }
            case '/kingspam':
            {
                //user entered a proper command
                cmd = 1;

                //permission check
                if(msg['is_mod'] || msg['user'] == cb.room_slug || cbjs.arrayContains(eModArray,msg['user']))
                {
                    kingSpamToggle(message[1],msg['user'])
                }
                else
                {
                    cb.sendNotice('Only moderators and broadcasters are able to use that command.\nType "/ubhelp commands" to see a full list of the available commands.',msg['user'],purple);
                }
                break;
            }
            case '/notifierspam':
            {
                //user entered a proper command
                cmd = 1;

                //permission check
                if(msg['is_mod'] || msg['user'] == cb.room_slug || cbjs.arrayContains(eModArray,msg['user']))
                {
                    notifierSpamToggle(message[1],msg['user'])
                }
                else
                {
                    cb.sendNotice('Only moderators and broadcasters are able to use that command.\nType "/ubhelp commands" to see a full list of the available commands.',msg['user'],purple);
                }
                break;
            }
            case '/leaderboardspam':
            {
                //user entered a proper command
                cmd = 1;

                //permission check
                if(msg['is_mod'] || msg['user'] == cb.room_slug || cbjs.arrayContains(eModArray,msg['user']))
                {
                    leaderboardSpamToggle(message[1],msg['user'])
                }
                else
                {
                    cb.sendNotice('Only moderators and broadcasters are able to use that command.\nType "/ubhelp commands" to see a full list of the available commands.',msg['user'],purple);
                }
                break;
            }
            case '/notifiermessage':
            {
                //user entered a proper command
                cmd = 1;

                //permission check
                if(msg['is_mod'] || msg['user'] == cb.room_slug || cbjs.arrayContains(eModArray,msg['user']))
                {
                    if(message[1] == '' || message[1] == null)
                    {
                        cb.sendNotice('You must enter a new message for the notifier feature.  If you want to disable the notifications, enter /notifierspam off.',msg['user'],purple)
                    }
                    else
                    {
                        notifierMessage = msg['m'].substring(16).trim();
                        cb.sendNotice('You have set the notifier spam message to: ' + notifierMessage,msg['user'],purple);
                    }
                }
                else
                {
                    cb.sendNotice('Only moderators and broadcasters are able to use that command.\nType "/ubhelp commands" to see a full list of the available commands.',msg['user'],purple);
                }
                break;
            }
        }

        //Level Up! command support
        if(message[0] == '/luhelp' || message[0] == '/levels')
        {
            cmd = 1;
        }
        //Ultra App command support
        if(message[0] == '/startshow' || message[0] == '/showtimeleft' || message[0] == '/printtime' || message[0] == '/addshowtime' || message[0] == '/adduser' || message[0] == '/changegoal' || message[0] == '/hide' || message[0] == '/unhide' || message[0] == '/selltickets' || message[0] == '/uacommands')
        {
            cmd = 1;
        }
        //the user entered an invalid command
        if(cmd == 0 && cb.settings.invalidToggle == 'Yes')
        {
            cb.sendNotice(message[0] + ' is not a command.\nType /ubhelp commands to see a full list of the available commands.',msg['user'],purple);
        }
    }
    //let dickArray do its thing
    if(cbjs.arrayContains(dickArray,msg['user']))
    {
        msg['X-Spam'] = true;
        silenced = 1;
        cb.sendNotice('You are on the Chaturbate Dick(less) List and do not have voice privileges in this room.  Either stop being an ass hole to people or fuck off and die in a fire.',msg['user'],purple);
    }
    //let silence do its thing
    if(cbjs.arrayContains(silenceArray,msg['user']) && silenced == 0)
    {
        msg['X-Spam'] = true;
        silenced = 1;
        cb.sendNotice('Your message was not sent because you have been silenced.  Be nice and don\'t make demands.',msg['user'],purple);
    }
    //let silenceLevel do its thing
    if(silenceLevel > 0 && !msg['is_mod'] && msg['user'] != cb.room_slug && !cbjs.arrayContains(eModArray,msg['user']) && !cbjs.arrayContains(niceArray,msg['user']) && !msg['in_fanclub'] && silenced == 0)
    {
        switch(silenceLevel)
        {
            case 1:
                if(!msg['has_tokens'])
                {
                    msg['X-Spam'] = true;
                    silenced = 1;
                    cb.sendNotice('I\'m sorry, but the silence level has been set to 1; your message was not sent.  Only members who have tokens are currently permitted to talk in chat.  \nType "/ubhelp silencelevel" to see how the various silence levels work.\nPlease enjoy the show :smile',msg['user'],purple);
                }
                break;
            case 2:
                if(parseInt(tipperArray[findTipper(msg['user'])][1]) == 0)
                {
                    msg['X-Spam'] = true;
                    silenced = 1;
                    cb.sendNotice('I\'m sorry, but the silence level has been set to 2; your message was not sent.  Only members who have tipped at least 1 token are currently permitted to talk in chat.  \nType "/ubhelp silencelevel" to see how the various silence levels work.\nPlease enjoy the show :smile',msg['user'],purple);
                }
                break;
            case 3:
                if(parseInt(tipperArray[findTipper(msg['user'])][1]) < 10)
                {
                    msg['X-Spam'] = true;
                    silenced = 1;
                    cb.sendNotice('I\'m sorry, but the silence level has been set to 3; your message was not sent.  Only members who have tipped at least 10 token are currently permitted to talk in chat.  \nType "/ubhelp silencelevel" to see how the various silence levels work.\nPlease enjoy the show :smile',msg['user'],purple);
                }
                break;
        }
    }
    //let graphicLevel do its thing
    if(graphicLevel > 0 && !msg['is_mod'] && msg['user'] != cb.room_slug && !cbjs.arrayContains(eModArray,msg['user']) && !cbjs.arrayContains(niceArray,msg['user']) && !msg['in_fanclub'] && silenced == 0)
    {
        switch(graphicLevel)
        {
            case 1:
                if(!msg['has_tokens'])
                {
                    for(var i = 0; i < message.length; i++)
                    {
                        if(message[i].charAt(0) == ':')
                        {
                            msg['X-Spam'] = true;
                            cb.sendNotice('Your message was not sent because you tried to use ' + message[i] + ' and the graphic level has been set to ' + graphicLevel + '.\nType "/ubhelp graphiclevel to see how the various graphic levels work.\nPlease enjoy the show :smile',msg['user'],purple);
                        }
                    }
                }
                break;
            case 2:
                if(parseInt(tipperArray[findTipper(msg['user'])][1]) == 0)
                {
                    for(var i = 0; i < message.length; i++)
                    {
                        if(message[i].charAt(0) == ':')
                        {
                            msg['X-Spam'] = true;
                            cb.sendNotice('Your message was not sent because you tried to use ' + message[i] + ' and the graphic level has been set to ' + graphicLevel + './nType "/ubhelp graphiclevel to see how the various graphic levels work.\nPlease enjoy the show :smile',msg['user'],purple);
                        }
                    }
                }
                break;
            case 3:
                if(parseInt(tipperArray[findTipper(msg['user'])][1]) < 10)
                {
                    for(var i = 0; i < message.length; i++)
                    {
                        if(message[i].charAt(0) == ':')
                        {
                            msg['X-Spam'] = true;
                            cb.sendNotice('Your message was not sent because you tried to use ' + message[i] + ' and the graphic level has been set to ' + graphicLevel + './nType "/ubhelp graphiclevel to see how the various graphic levels work.\nPlease enjoy the show :smile',msg['user'],purple);
                        }
                    }
                }
                break;
        }
    }
    //stop people from sending messages in all caps
    if(msg['m'] == msg['m'].toUpperCase() && msg['m'].toUpperCase() != msg['m'].toLowerCase() && !msg['is_mod'] && msg['user'] != cb.room_slug && !cbjs.arrayContains(eModArray,msg['user']) && cb.settings.capsToggle == 'Yes')
    {
        for(var i = 0; i < msg['m'].length; i++)
        {
            if(symbolString.indexOf(msg['m'].charAt(i)) == -1)
            {
                msg['m'] = msg['m'].toLowerCase();
                cb.sendNotice('I\'m sure you didn\'t actually mean to send that message in all capital letters, so I fixed it for you :smile',msg['user'],purple);
                break;
            }
        }
    }
    //tip titles, if turned on, as well as king's crown
    if(cb.settings.tipTitles == 'Yes' && parseInt(tipperArray[findTipper(msg['user'])][1]) > 0 && message[0].charAt(0) != "/")
    {
        msg['m'] = setTipTitles(msg['user'],msg['m']);
    }
    return msg;
});
}
//onTip
{
cb.onTip(function (tip)
{
    tipperArray[findTipper(tip['from_user'])][1] += parseInt(tip['amount']);

    if(cb.settings.kingTipper == 'Yes')
    {
        if(tip['from_user'] != currentKing && parseInt(tipperArray[findTipper(tip['from_user'])][1]) > kingTip && parseInt(tipperArray[findTipper(tip['from_user'])][1]) >= parseInt(cb.settings.kingMin))
        {
            if(currentKing != '')
            {
                cb.sendNotice('You have been dethroned by ' + tip['from_user'] + ', but revenge is sweet...', currentKing, purple);
            }
            cb.sendNotice('We have a new King!\nAll hail ' + tip['from_user'] + '!','',purple);
            currentKing = tip['from_user'];
            kingTip = parseInt(tipperArray[findTipper(tip['from_user'])][1]);
        }
        else if(tip['from_user'] == currentKing)
        {
            kingTip = parseInt(tipperArray[findTipper(tip['from_user'])][1]);
        }
    }
    if(cb.settings.leaderBoard == 'Yes')
    {
        //create an array of the names
        var nameArray = new Array;
        for(var i = 0; i < leaderArray.length; i++)
        {
            nameArray[i] = leaderArray[i][0];
        }

        //the user is not currently in the top 3
        if(!cbjs.arrayContains(nameArray,tip['from_user']))
        {
            if(tipperArray[findTipper(tip['from_user'])][1] > leaderArray[0][1])
            {
                leaderArray[2][0] = leaderArray[1][0];
                leaderArray[2][1] = leaderArray[1][1];

                leaderArray[1][0] = leaderArray[0][0];
                leaderArray[1][1] = leaderArray[0][1];

                leaderArray[0][0] = tip['from_user'];
                leaderArray[0][1] = tipperArray[findTipper(tip['from_user'])][1];
            }
            else if(tipperArray[findTipper(tip['from_user'])][1] < leaderArray[0][1] && tipperArray[findTipper(tip['from_user'])][1] > leaderArray[1][1] || tipperArray[findTipper(tip['from_user'])][1] == leaderArray[0][1])
            {
                leaderArray[2][0] = leaderArray[1][0];
                leaderArray[2][1] = leaderArray[1][1];

                leaderArray[1][0] = tip['from_user'];
                leaderArray[1][1] = tipperArray[findTipper(tip['from_user'])][1];
            }
            else if(tipperArray[findTipper(tip['from_user'])][1] < leaderArray[1][1] && tipperArray[findTipper(tip['from_user'])][1] > leaderArray[2][1] || tipperArray[findTipper(tip['from_user'])][1] == leaderArray[1][1])
            {
                leaderArray[2][0] = tip['from_user'];
                leaderArray[2][1] = tipperArray[findTipper(tip['from_user'])][1];
            }
        }
        //the user is currently in the top 3
        else
        {
            //the user is already #1
            if(leaderArray[0][0] == tip['from_user'])
            {
                leaderArray[0][1] = tipperArray[findTipper(tip['from_user'])][1];
            }
            //the user is #2 and is moving to #1
            if(leaderArray[1][0] == tip['from_user'] && tipperArray[findTipper(tip['from_user'])][1] > parseInt(leaderArray[0][1]))
            {
                leaderArray[1][0] = leaderArray[0][0];
                leaderArray[1][1] = leaderArray[0][1];

                leaderArray[0][0] = tip['from_user'];
                leaderArray[0][1] = parseInt(tipperArray[findTipper(tip['from_user'])][1]);
            }
            //the user is #2 and is not moving to #1
            else if(leaderArray[1][0] == tip['from_user'] && tipperArray[findTipper(tip['from_user'])][1] <= parseInt(leaderArray[0][1]))
            {
                leaderArray[1][1] = parseInt(tipperArray[findTipper(tip['from_user'])][1]);
            }
            //the user is #3 and is moving to #2
            else if(leaderArray[2][0] == tip['from_user'] && tipperArray[findTipper(tip['from_user'])][1] > parseInt(leaderArray[1][1]))
            {
                leaderArray[2][0] = leaderArray[1][0];
                leaderArray[2][1] = leaderArray[1][1];

                leaderArray[1][0] = tip['from_user'];
                leaderArray[1][1] = parseInt(tipperArray[findTipper(tip['from_user'])][1]);
            }
            //the user is #3 and is moving to #1
            else if(leaderArray[2][0] == tip['from_user'] && tipperArray[findTipper(tip['from_user'])][1] > parseInt(leaderArray[0][1]))
            {
                leaderArray[2][0] = leaderArray[1][0];
                leaderArray[2][1] = leaderArray[1][1];

                leaderArray[1][0] = leaderArray[0][0];
                leaderArray[1][1] = leaderArray[0][1];

                leaderArray[0][0] = tip['from_user'];
                leaderArray[0][1] = parseInt(tipperArray[findTipper(tip['from_user'])][1]);
            }
            //the user is #3 and is not moving
            else if(leaderArray[2][0] == tip['from_user'] && tipperArray[findTipper(tip['from_user'])][1] <= parseInt(leaderArray[1][1]))
            {
                leaderArray[2][1] = tipperArray[findTipper(tip['from_user'])][1];
            }
            if(leaderArray[2][0] == leaderArray[1][0] || leaderArray[2][0] == leaderArray[0][0])
            {
                leaderArray[2][0] = '';
                leaderArray[2][1] = 0;
            }
            if(leaderArray[1][0] == leaderArray[0][0])
            {
                leaderArray[1][0] = '';
                leaderArray[1][1] = 0;
            }
        }
    }
    if(cb.settings.notifierTip == 'Yes' && parseInt(tip['amount']) >= cb.settings.tipMessageMin)
    {
        cb.sendNotice(cb.settings.tipMessage,'',purple);
    }
});
}
//onEnter
{
cb.onEnter(function(user)
{
    if(cb.settings.notifierEnter == "Yes")
    {
        cb.sendNotice(cb.settings.enterMessage,user['user'],purple);
    }
    if(user['is_mod'] && !cbjs.arrayContains(modArray,user))
    {
        modArrayPopulate(user['user']);
    }
});
}
//init
{
    if(initialize == 0)
    {
        if(cb.settings.kingTipperSpam == 'Yes')
        {
            kingTipperSpam = 1;
            kingSpam();
        }
        if(cb.settings.leaderBoardSpam == 'Yes')
        {
            leaderboardSpam = 1;
            leaderSpam();
        }
        if(cb.settings.notifierSpam == 'Yes')
        {
            notifierSpamTGL = 1;
            notifierSpam();
        }
        if(cb.settings.niceList != '' && cb.settings.niceList != null)
        {
            var n = cb.settings.niceList;
            niceArray = n.split(',');
            numNice = niceArray.length;
        }
        if(cb.settings.color != 'C287C2')
        {
            colorChecker();
        }
        cb.sendNotice('Grey users are now unable to use graphics by default.  If you would like grey users to be able to use graphics, type /graphiclevel 0.', cb.room_slug, purple);
        initialize = 1;
    }

}
