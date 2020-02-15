// https://chaturbate.com/apps/user_uploads/1/britney_and_justin/
// https://chaturbate.com/apps/app_details/chronic-loverboard/?version=&slot=1

/**
 Name: Chronic LoverBoard
 Author: britney_and_justin
 Creation Date: 11/3/14
 Date Last Edited: 11/9/14
 Live Verson: 1.10
 Test Version: 1.11
 **/

/**
 Purpose:

 chroniclove requested her own leaderboard.
 **/

/**
    change log

    1.11        added:
                    command to print club members
                    command to add club members
    1.10        added:
                    all time tip
                    club
                    rotating notifier

    1.01        support for "all time" tippers
**/

//user settings
{
/**
    trueStory           ==>         controls a fun spam toggle
    notiferEnter        ==>         toggle for message on enter
    enterMessage        ==>         message on enter
    notifierSpam        ==>         toggle for message on interval
    spamMessage1        ==>         message on interval
    spamMessage2        ==>         message on interval
    spamMessage3        ==>         message on interval
    spamTimer           ==>         length of interval
    notifierTip         ==>         toggle for message on tip
    tipMessage          ==>         message on tip
    tipMessageMin       ==>         min tip for message
    bigTipMin           ==>         tip required to join the club
    bigTipTitle         ==>         title for club members
    bigTipGif           ==>         gif for club members
    singleTipper        ==>         highest single tip
    singleTitle         ==>         singleTipper's title
    singleGif           ==>         singleTipper's gif
    firstTitle          ==>         title the king tipper will have
    firstGif            ==>         image the king tipper will have
    secondTitle         ==>         title the 2nd place tipper will have
    secondGif           ==>         image the 2nd place tipper will have
    thirdTitle          ==>         title the 3rd place tipper will have
    thirdGif            ==>         image the 3rd place tipper will have
    kingTipperSpam      ==>         toggles spamming "tip x to become king" every 5 minutes
    kingMin             ==>         minimum tip level for a user to be King
    kingTimer           ==>         interval for kingTipperSpam
    leaderBoard         ==>         toggles the Leader Board feature
    leaderBoardSpam     ==>         toggles spamming the top 3 tippers every 5 minutes
    leaderTimer         ==>         interval for leaderBoardSpam
**/

cb.settings_choices =
    [
        {name: 'trueStory', label: 'Are you aware of the fact that Britney and Justin would like to fuck you silly?', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'No', required: false},
        {name: 'notifierEnter', label: 'Would you like to display a message for users when they enter the room?', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'Yes'},
        {name: 'enterMessage', label: 'Enter the message you would like to display.', type: 'str', minLength: 1, maxLength: 1000, defaultValue: 'Welcome to my room!'},
        {name: 'notifierSpam', label: 'Would you like to periodicaly send a message to the room?', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'Yes'},
        {name: 'spamMessage1', label: 'Enter the message you would like to display.', type: 'str', minLength: 1, maxLength: 1000, defaultValue: 'Be nice!'},
        {name: 'spamMessage2', label: 'Enter the message you would like to display.', type: 'str', minLength: 1, maxLength: 1000, defaultValue: 'Or else!'},
        {name: 'spamMessage3', label: 'Enter the message you would like to display.', type: 'str', minLength: 1, maxLength: 1000, defaultValue: 'I\'ll cut you!'},
        {name: 'spamTimer', label: 'Change this value if you would like the room announcement to happen at a different interval:', type: 'int', minValue: 1, maxValue: 60, defaultValue: 5},
        {name: 'notifierTip', label: 'Would you like to display a message when a user tips?', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'Yes'},
        {name: 'tipMessage', label: 'Enter the message you would like to display.', type: 'str', minLength: 1, maxLength: 1000, defaultValue: 'Thank you!'},
        {name: 'tipMessageMin', label: 'Enter the minimum tip amount that you would like to trigger the message', type: 'int', minValue: 1, maxValue: 1000000, defaultValue: 10},
        {name: 'bigTipMin', label: 'Enter the minimum tip to join the club:', type: 'int', minValue: 0, maxValue: 1000000, defaultValue: 100, required: true},
        {name: 'bigTipTitle', label: 'Enter the title you want club members to have. (Leave it blank for no title)', type: 'str', minLength: '0', maxLength: '100', defaultValue: '', required: false},
        {name: 'bigTipGif', label: 'Enter the gif you want club members to have. (Leave it blank for no gif)', type: 'str', minLength: '0', maxLength: '100', defaultValue: '', required: false},
        {name: 'bigTipMSG', label: 'Enter the message you would like to send about joining the club:', type: 'str', minLength: '0', maxLength: '100', defaultValue: 'Tip 100 or more in a single tip to join my club!', required: false},
        {name: 'singleTipper', label: 'Enter the name of the user who gave you your highest single tip:', type: 'str', minLength: '0', maxLength: '100', defaultValue: '', required: false},
        {name: 'singleTip', label: 'Enter the value of your highest single tip:', type: 'int', minValue: 0, maxValue: 100000, defaultValue: 0, required: false},
        {name: 'singleTitle', label: 'Enter the title you would like your highest single tipper to have.  (Leave it blank for no title)', type: 'str', minLength: '0', maxLength: '100', defaultValue: 'the Baller', required: false},
        {name: 'singleGif', label: 'Enter the image you would like your highest single tipper to have.  (Leave it blank for no image)', type: 'str', minLength: '0', maxLength: '100', defaultValue: '', required: false},
        {name: 'firstTitle', label: 'Enter the title you would like your 1st place tipper to have (leaderboard).  (Leave it blank for no title)', type: 'str', minLength: '0', maxLength: '100', defaultValue: '', required: false},
        {name: 'firstGif', label: 'Enter the image you would like your 1st place tipper to have (leaderboard).  (Leave it blank for no image)', type: 'str', minLength: '0', maxLength: '100', defaultValue: '', required: false},
        {name: 'secondTitle', label: 'Enter the title you would like your 2nd place tipper to have.  (Leave it blank for no title)', type: 'str', minLength: '0', maxLength: '100', defaultValue: '', required: false},
        {name: 'secondGif', label: 'Enter the image you would like your 2nd place tipper to have.  (Leave it blank for no image)', type: 'str', minLength: '0', maxLength: '100', defaultValue: '', required: false},
        {name: 'thirdTitle', label: 'Enter the title you would like your 3rd place tipper to have.  (Leave it blank for no title)', type: 'str', minLength: '0', maxLength: '100', defaultValue: '', required: false},
        {name: 'thirdGif', label: 'Enter the image you would like your 3rd place tipper to have.  (Leave it blank for no image)', type: 'str', minLength: '0', maxLength: '100', defaultValue: '', required: false},
        {name: 'kingTipperSpam', label: 'Do you want to periodically announce the tip required to become King?', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'Yes'},
        {name: 'kingMin', label: 'Enter the minimum tip level for a user to become King:', type: 'int', minValue: 1, maxValue: 1000000, defaultValue: 25},
        {name: 'kingTimer', label: 'Change this value if you would like the King announcement to happen at a different interval:', type: 'int', minValue: 1, maxValue: 60, defaultValue: 5},
        {name: 'leaderBoard', label: 'Would you like to use the Leader Board feature?', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'Yes'},
        {name: 'leaderBoardSpam', label: 'Do you want to periodically announce the top three tippers?', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'Yes'},
        {name: 'leaderTimer', label: 'Change this value if you would like the Leaderboard announcement to happen at a different interval:', type: 'int', minValue: 1, maxValue: 60, defaultValue: 5}
    ]
}

if(cb.room_slug == "chroniclove")
{
//variables
{
    /**
     Variable           ==>     Purpose
     tipperArray        ==>     [i][0] = User's name    [i][1] = User's total tips this session    [i][2] = User tipped over "big tip" amount
     numTippers         ==>     number of users who have given tips this session
     currentKing        ==>     holds the user name of the current king
     kingTip            ==>     holds the value of the king tipper's tip total
     kingTimer          ==>     user defined interval for king spam
     initialize         ==>     runs init() once only
     kingTipperSpam     ==>     facilitates command to toggle king tipper spam
     singleArray        ==>     [0] = single tipper, [1] = cumulative tipper
     leaderArray        ==>     array that holds the top 3 tippers' names and tip totals
     leaderTimer        ==>     user defined interval for leader spam
     leaderboardSpam    ==>     facilitates command to toggle leaderboard spam
     notifierSpamTGL    ==>     facilitates command to toggle notifier spam
     notifierRotate     ==>     controls which notifier message prints
     **/
    {
        var tipperArray = new Array;
        var numTippers = 0;
        var currentKing = "";
        var kingTip = 0;
        var kingTimer = parseInt(cb.settings.kingTimer);
        var initialize = 0;
        var kingTipperSpam = 0;
        var leaderArray = [['',0],['',0],['',0]];
        var singleArray = [cb.settings.singleTipper,cb.settings.singleTip];
        var leaderTimer = parseInt(cb.settings.leaderTimer);
        var leaderboardSpam = 0;
        var notifierSpamTGL = 0;
        var notifierRotate = 0;
//color codes
        {
            var purple = '#C287C2';
        }
    }
}
//functions
{
    /**
     Function                ==>     Purpose

     tipperArrayPopulate     ==>     adds tippers to the tipperArray
     findTipper              ==>     finds and returns the index of a user
     setTipTitles            ==>     called from onMessage. appends the user's tips to the beginning of the message
     kingSpam                ==>     spams "tip x to be king" every 5 minutes if the user setting allows it
     kingSpamTimer           ==>     the actual timer for kingSpam
     leaderSpam              ==>     spams the leaderboard every 5 minutes
     leaderSpamTimer         ==>     the actual timer for leaderSpam
     showLeaderBoard         ==>     called when /leaderboard is used.  shows the leaderboard
     notifierSpam            ==>     called from init, starts the timer for notifer spam
     notiferSpamTimer        ==>     the actual timer for notifierSpam
     **/
    {
        function tipperArrayPopulate(user)
        {
            tipperArray[numTippers] = new Array;
            tipperArray[numTippers][0] = user;
            tipperArray[numTippers][1] = 0;
            tipperArray[numTippers][2] = 0;
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
        function setTipTitles(user, message)
        {
            if(user == singleArray[0])
            {
                if(user == currentKing)
                {
                    var m = cb.settings.singleTitle + ' ' + cb.settings.singleGif + ' |' + tipperArray[findTipper(user)][1] + '| ' + cb.settings.firstGif + ' : ' + message;
                }
                else
                {
                    var m = cb.settings.singleTitle + ' ' + cb.settings.singleGif + ' |' + tipperArray[findTipper(user)][1] + '| ' + message;
                }
            }
            else if(user == currentKing)
            {
                var m = cb.settings.firstTitle + ' ' + cb.settings.firstGif + ' |' + tipperArray[findTipper(user)][1] + '| ' + message;
            }
            else if(user == leaderArray[1][0] && leaderArray[0][1] >= parseInt(cb.settings.kingMin))
            {
                var m = cb.settings.secondTitle + ' ' + cb.settings.secondGif + ' |' + tipperArray[findTipper(user)][1] + '| ' + message;
            }
            else if(user == leaderArray[2][0] && leaderArray[0][1] >= parseInt(cb.settings.kingMin))
            {
                var m = cb.settings.thirdTitle + ' ' + cb.settings.thirdGif + ' |' + tipperArray[findTipper(user)][1] + '| ' + message;
            }
            else if(tipperArray[findTipper(user)][2] == 1)
            {
                var m = cb.settings.bigTipTitle + ' ' + cb.settings.bigTipGif + ' |' + tipperArray[findTipper(user)][1] + '| ' + message;
            }
            else
            {
                var m = '|' + tipperArray[findTipper(user)][1] + '| ' + message;
            }
            return m;
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
                if(cbjs.arrayContains(cb.settings.firstTitle, "over"))
                {
                    cb.sendNotice('Tip ' + supplant + ' to become my true lover!','',purple);
                }
                else
                {
                    cb.sendNotice('Tip ' + supplant + ' to become the new ' + cb.settings.firstTitle,'',purple);
                }
                supplant = parseInt(singleArray[1]) + 1;
                cb.sendNotice('Tip ' + supplant + ' in a single tip to become ' + cb.settings.singleTitle,'',purple);
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

                if(cb.settings.singleTipper.length > 1)
                {
                    cb.sendNotice
                        (
                            'Highest Single Tip of All Time: ' + singleArray[0] + ' : ' + singleArray[1]
                        ,'',purple);
                }

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
                if(cb.settings.singleTipper.length > 1)
                {
                    cb.sendNotice
                        (
                            'Highest Single Tip of All Time: ' + singleArray[0] + ' : ' + singleArray[1]
                        ,'',purple);
                }

                cb.sendNotice
                    (
                        'Today\'s Leaderboard!'
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
        function checkTotal(user, tip)
        {
            //check the highest single tip
            if(tip > singleArray[1] && user != singleArray[0])
            {
                cb.sendNotice
                    (
                        'We have a new all time highest single tip!\n' +
                        user + ' has surpassed ' + singleArray[0] + ' with a tip of ' + tip + '!'
                    );
                singleArray[0] = user;
                singleArray[1] = tip;
            }
            else if(tip > singleArray[1] && user == singleArray[0])
            {
                cb.sendNotice
                    (
                        'We have a new all time highest single tip!\n' +
                         user + ' has surpassed his own record with a tip of ' + tip + '!'
                    );
                singleArray[1] = tip;
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
                switch(notifierRotate)
                {
                    case 0:
                    {
                        cb.sendNotice(cb.settings.spamMessage1,'',purple);
                        notifierRotate = 1;
                        break;
                    }
                    case 1:
                    {
                        cb.sendNotice(cb.settings.spamMessage2,'',purple);
                        notifierRotate = 2;
                        break;
                    }
                    case 2:
                    {
                        cb.sendNotice(cb.settings.spamMessage3,'',purple);
                        notifierRotate = 0;
                        break;
                    }
                }
                cb.sendNotice(cb.settings.bigTipMSG,'',purple);
                notifierSpam();
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

        if(msg['m'].charAt(0) == '/')
        {
            msg['X-Spam'] =true;
            var m = "";
            var i;

            switch(message[0])
            {
                case '/leaderboard':
                {
                    showLeaderBoard(msg['user']);
                    break;
                }
                case '/club':
                {
                    if(msg['user'] == cb.room_slug)
                    {
                        for(i = 0; i < tipperArray.length; i++)
                        {
                            if(tipperArray[i][2] == 1)
                            {
                                m += tipperArray[i][0] + ',';
                            }
                        }
                        m = m.substring(0, m.length - 1);
                        cb.sendNotice(m,cb.room_slug,purple);
                    }
                    break;
                }
                case '/clubadd':
                {
                    if(msg['user'] == cb.room_slug)
                    {
                        m = new Array;
                        m = message[1].split(',');
                        for(i = 0; i < m.length; i++)
                        {
                            tipperArray[findTipper(m[i])][2] = 1;
                        }
                        cb.sendNotice("Done!",cb.room_slug,purple);
                    }
                    break;
                }
            }
        }
        //tip titles
        if(msg['m'].charAt(0) != '/' && msg['user'] != cb.room_slug)
        {
            msg['m'] = setTipTitles(msg['user'], msg['m']);
        }

        return msg;
    });
}
//onTip
{
    cb.onTip(function (tip)
    {
        tipperArray[findTipper(tip['from_user'])][1] += parseInt(tip['amount']);

        if(parseInt(tip['amount']) >= parseInt(cb.settings.bigTipMin) && tipperArray[findTipper(tip['from_user'])][2] == 0)
        {
            tipperArray[findTipper(tip['from_user'])][2] = 1;
        }

        if(tip['from_user'] != currentKing && parseInt(tipperArray[findTipper(tip['from_user'])][1]) > kingTip && parseInt(tipperArray[findTipper(tip['from_user'])][1]) >= parseInt(cb.settings.kingMin))
        {
            if(currentKing != '')
            {
                cb.sendNotice('You have been dethroned by ' + tip['from_user'] + ', but revenge is sweet...', currentKing, purple);
            }
            cb.sendNotice('We have a new ' + cb.settings.firstTitle + '!\nAll hail ' + tip['from_user'] + '!','',purple);
            currentKing = tip['from_user'];
            kingTip = parseInt(tipperArray[findTipper(tip['from_user'])][1]);
        }
        else if(tip['from_user'] == currentKing)
        {
            kingTip = parseInt(tipperArray[findTipper(tip['from_user'])][1]);
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
        checkTotal(tip['from_user'], tip['amount']);
        if(cb.settings.notifierTip == 'Yes' && parseInt(tip['amount']) >= cb.settings.tipMessageMin)
        {
            cb.sendNotice(cb.settings.tipMessage,tip['from_user'],purple);
        }
    });
}
//onEnter
{
    cb.onEnter(function(user)
    {
        if(cb.settings.notifierEnter == "Yes")
        {
            cb.sendNotice(cb.settings.enterMessage,user,purple);
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
        if(cb.settings.trueStory == 'No')
        {
            cb.sendNotice('Just so you know, Britney and Justin would like to fuck you silly.',cb.room_slug,purple);
        }
        else
        {
            cb.sendNotice('I consider three orgasms to be a good warm up.  Just saying.',cb.room_slug,purple);
        }
        initialize = 1;
    }

}
}
else
{
    cb.sendNotice('You are not Marley.', cb.room_slug, '#C287C2');
}
