// http://www.rlc-cams.com/apps/user_uploads/2/lephil/
// http://www.rlc-cams.com/apps/sourcecode/lephil-bot/?version=&slot=2

var purple = "#C287C2";
    var yellow = "#e5b13a";
    var black = "#000000";
    var red = "#cc0000";
    var specialUsers = []; //silenced users
    var mucCounter = 6;
    function Announcer(user) {
        cb.sendNotice("LePhil Bot Command list:", user, black, yellow);
        cb.sendNotice('/commands' +
            '\n/addsong' +
            '\n/about' +
            '\n/whisper' +
            '\n/beep' +
            '\n/lbhelp', user);
        
            
    };

    function SnapAnnouncer(){
    cb.sendNotice("Feel free to add cb.lephil on Snap :snapchatt",'','white',yellow);
        setTimeout(SnapAnnouncer, 700000);

    };
    function FollowAnnouncer(){
        cb.sendNotice(":01dontforgettofollow",'','white');
            setTimeout(FollowAnnouncer, 700000);
        
    };
    Announcer(); //Make sure the function fires as soon as the page is loaded
    setTimeout(Announcer, 600000); //Then set it to run again after ten minutes
    setTimeout(SnapAnnouncer, 500000); 
    setTimeout(FollowAnnouncer); 
    cb.onMessage(function(msg) {
        var validMessage = true;
        var message = msg['m'].split(' ');
        //0 = invalid command, 1 = valid command
        var cmd = 0;
        //1 = user is already silenced
        var silenced = 0;
        var symbolString = '~`!@#$%^&*()_-+={[}]|\\:;"\'<,>.?/';
    

        if ((message[0].charAt(0) == '/') || (message[0].charAt(0) == '@')) {
            //don't print this message to chat
            msg['X-Spam'] = true;
        }
        msg['m'] = msg['m'].replace("i hate lephil","i love lephil, he is awesome");
        msg['m'] = msg['m'].replace("i hate phil","lephil is the best");
        msg['m'] = msg['m'].replace("lephil is stupid","lephil is awesome");

        var user = msg["user"];
        var from = user;
        
        if (msg["user"] == cb.room_slug) {
            msg.c = "#009";
            msg.f = "bold"
        }
        if (msg['m'][0] == '/') {
            msg['X-Spam'] = true;
            switch (message[0]) {
                case '/song':
                    {
                        if (user == cb.room_slug) {
                            cb.sendNotice("Currently playing: " + msg['m'].replace("/song ",""),"","",purple);
                        } else {
                            cb.sendNotice('This command is only allowed for LePhil. Get out!', from, red);
                        }
                        break;
                    }
                case '/beep':
                    {
                        var number = Math.floor(Math.random() * 6);
                        switch (number) {
                            case 0:
                                cb.sendNotice(from + " :tippedsixpack \nLePhil is going to get drunk soon.");
                                break;
                            case 1:
                                cb.sendNotice(from + " :tippedspinach \nLePhil is turning into Popeye. :lol ");
                                break;
                            case 2:
                                cb.sendNotice(from + " :bananatipps \nDoes LePhil look like a monkey to you?");
                                break;
                            case 3:
                                cb.sendNotice(from + " :tippedsushi \nMmmhh Yummy!");
                                break;
                            case 4:
                                cb.sendNotice(from + " :tippedcarrot \nLiving the healthy lifestyle.");
                                break;
                            case 5:
                                cb.sendNotice(from + " :tippedacow \nTime to get some juicy milk :wink");
                                break;
                        }
                        break;
                    }
                case '/kick':
                    if(msg["is_mod"]||user ==cb.room_slug)  
                    {
                        cb.sendNotice('Kick:' +message[1], cb.room_slug);
                        
                    }
                    break;
                case '/gifwars':
                    {
                        if (user == cb.room_slug) {
                            cb.sendNotice("A long time ago in a chaturbate room far, far away...");
                            cb.sendNotice("GIF WARS", "", black, yellow);
                            cb.sendNotice("Episode I", '', black, yellow);
                            cb.sendNotice("Turmoil has engulfed the chaturbate Republic. The taxation of token purchases to outlying members is in dispute.." +
                                "\nHoping to resolve  the matter with a blockade of deadly gifs,  the greedy broadcasters have stopped the show for all users of chaturbate" +
                                "\nWhile the chaturbate staff endlessy debates this alarming chain of events lephil has secretly dispatched more gifs in chaturbate to settle the conflict...", "", black, yellow);
                            cb.sendNotice("LET THE GIF WAR BEGIN! :round1");
                        } else {
                            cb.sendNotice('This command is only allowed for LePhil. Get out!', from, red);

                        }
                        break;
                    }

                case '/commands':
                    {

                        if (from == cb.room_slug) {
                            from = '';
                        }

                        cb.sendNotice('LePhil Bot Command List', from, purple);
                        cb.sendNotice(
                            'Type /lbhelp x, where x is one of the following commands, for more detailed information.' +
                            '\nEx: /lbhelp addsong', from
                        );
                        cb.sendNotice(
                            '/commands' +
                            '\n/addsong' +
                            '\n/about' +
                            '\n/whisper' +
                            '\n/lbhelp', from);
                        cb.sendNotice(
                            '', from, purple
                        );
                        break;
                    }
                case '/lbhelp':
                    {
                        help(message[1], msg['user']);

                        break;
                    }
                case '/about':
                    {
                        cb.sendNotice('LePhil himself programmed this awesome, mindblowing bot. JK :lol LePhil Bot Version: 3.0', from, black, yellow);
                        break;
                    }
                case '/addsong':
                    {
                        if (message[1] == null) {
                            cb.sendNotice('Invalid Command!', from, red);
                            cb.sendNotice('Try typing /lbhelp addsong', from, purple);
                        } else {
                            cb.sendNotice(from + ' just requested a song!');
                            cb.sendNotice(from + " requested a song. + " + msg['m'], cb.room_slug, purple);
                        }
                        break;
                    }
                case '/whisper':
                    cb.sendNotice("Whisper is a function to send private messages through public chat. You don't have to switch to PMs anymore." +
                        "\nJust type @username followed by your message. Other users will not be able to see it, it will only get displayed to the target user." +
                        "\nexample: @lephil you are so hot", from, black, yellow);
                    break;
                default:
                    cb.sendNotice("Invalid command. Try /commands or /lphelp", from, red);
                    break;




            }
        } else {
            if (msg['m'][0] == '@') {
                msg['X-Spam'] = true;
                var toUser = message[0].substr(1);
                message.shift();
                var replaceString = '@' + toUser;
                var messageToSend = msg['m'].replace(replaceString,'');
                sendMessage(msg['user'], toUser, messageToSend);
            }
            


        }
        if(user=="camfunmuc" && msg['X-Spam']!=true)
        {
            validMessage = false;

            mucCounter++;
            if(mucCounter%7 == 0)
            {
                validMessage = true;
            }
            else
            {
                msg['X-Spam'] = true;
                cb.sendNotice("Muc: "  + msg['m'], cb.room_slug, purple);
            }
        

        }
        if(validMessage)
        {
            return msg;
        }
        



    });

    function help(option, from) {
        var valid = 0;

        if (option == null) {
            option = '';
        }

        switch (option) {
            case '':
                {
                    cb.sendNotice(
                        'LePhil Bot Help Menu'+
                        '\nType /lbhelp x, where x is one of the following choices, for more detailed information.' +
                        '\nEx: /lbhelp commands'+
                        '\n'+
                        '\n/commands\n' +
                        '/addsong\n' +
                        '/whisper\n'+
                        '/about', from, purple
                    );
                    break;
                }
            case 'addsong':
                {
                    cb.sendNotice('How to add a song request?', from, purple);
                    cb.sendNotice(
                        '/addsong is a command that is usable by everyone in my room.' +
                        '\nThe syntax for using addsong is "/addsong x", where x is the songtitle and interpret.' +
                        '\nAfter typing in the command LePhil will get a notice about your song request. ' +
                        "\nIt is up to him when the song is going to be played. If you're nice to him he might play it earlier. Don't be sad if he does not like the song ;).", from
                    );
                    cb.sendNotice(
                        '', from, purple
                    );
                    break;
                }

            case 'commands':
                {
                    cb.sendNotice('LePhil Bot Command List', from, purple);
                    cb.sendNotice(
                        'Type /lbhelp x, where x is one of the following commands, for more detailed information.' +
                        '\nEx: /lbhelp addsong', from
                    );
                    cb.sendNotice(
                        '', from, purple
                    );
                    cb.sendNotice(
                        '/commands' +
                        '\n/addsong' +
                        '\n/about' +
                        '\n/whisper' +
                        '\n/lbhelp', from);
                    cb.sendNotice(
                        '', from, purple
                    );
                    break;
                }
            case 'about':
                {
                    cb.sendNotice('/about displays information about the mastermind that programmed LePhil Bot.', from, purple);
                    break;
                }
            case 'lbhelp':
                {

                    cb.sendNotice('/lphelp Help', from, purple);
                    cb.sendNotice(
                        '/lphelp is a command that is usable by everyone.' +
                        '\nThe syntax for using lphelp is "/lphelp x", where x is the subsection of the help menu that you want to access.', from
                    );
                    cb.sendNotice(
                        '', from, purple
                    );
                    break;


                }
            case 'whisper':
            {
                    cb.sendNotice("Whisper is a function to send private messages through public chat. You don't have to switch to PMs anymore." +
                    "\nJust type @username followed by your message. Other users will not be able to see it, it will only get displayed to the target user." +
                    "\nexample: @lephil you are so hot", from, black, yellow);
                break;
            }
        }

    };

    function sendMessage(fromUser, toUser, message) {
        if (fromUser == toUser) {
            cb.sendNotice("Sending a message to yourself is just silly, don't you think?", fromUser, '', '', 'bold');
        } else {
            if(toUser!='')
            {
                    cb.sendNotice("Message from "+fromUser + ": " + message, toUser, "#FFFF00", "", "bold");
                    cb.sendNotice("" + fromUser + " to  " +toUser +": " + message, cb.room_slug, "#FFFF00", "", "bold");
                    cb.sendNotice("To reply, type @" + fromUser + " and your message.", toUser);
                    cb.sendNotice("Message successfully sent to " + toUser + "!", fromUser);
                
            }
            else
            {
                cb.sendNotice("You forget to set the user after the @ sign. Silly you :lol ", fromUser, '', '', 'bold');
        
            }
        }

    };
    cb.onTip(function(tip) {

        if(tip['amount'] < 25)
        {
            cb.sendNotice(":thanks2");
        }else
        {
            if(tip['amount'] >24 && tip['amount'] < 100)
            {
                cb.sendNotice(":THANKs");
            }
            else
            {
                cb.sendNotice(":thanksfortipping");
            }
        }

    });

    function userCannotSendMessages(fromUser) {
        return false;
    };

    cb.onEnter(function(user) {
        Announcer(user['user']);
    });
