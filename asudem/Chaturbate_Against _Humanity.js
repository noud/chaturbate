// https://en.wikipedia.org/wiki/Cards_Against_Humanity
// http://www.donationcoder.com/forum/index.php?topic=42603.0
// https://chaturbate.com/apps/user_uploads/0/asudem/
// https://chaturbate.com/apps/sourcecode/chaturbate-against-humanity/?version=&slot=0

//Chaturbate Choices
cb.settings_choices = [

//Number of Players
{name:'num_players', type:'int', minValue:2, maxValue:10, defaultValue:5, label: "Number of Players?"},

//Tokens to play
{name:'tokens_to_play', type:'int', minValue:1, maxValue:100, defaultValue:50, label: "Tokens to Play"},

//Tokens to Vote
{name:'tokens_to_vote', type:'int', minValue:1, maxValue:1000, defaultValue:10, label: "Minimum Tokens To Vote"},

//Time to Vote
{name:'time_to_vote', type:'int', minValue:1, maxValue:10, defaultValue:5, label: "Minutes To Vote"},

//Can See White Card?
{name:'user_can_see', type:'choice',choice1:'Yes',choice2:'No', defaultValue:'Yes', label: "Can Users See Their White Card?"},

//Allow Greys to Vote?
{name:'grey_play', type:'choice',choice1:'Yes',choice2:'No', defaultValue:'No', label: "Enable Grey Play?"},

//Prize List
//Needs Optimization
{name:'dummy', type:'choice',choice1:'OK',choice2:'FINE', defaultValue:'OK', label: 'Prizes are distibuted by % out of the added total of % values. The lower the number, the rarer the prize.'},
{ name: 'first_prize', label: 'First Prize', type: 'str', minLength: 1, maxLength: 255, defaultValue: 'Prize A' },
{name:'first_prize_percent', label: 'First Prize%', type:'int', minValue:1, maxValue:100, defaultValue: 50},
{ name: 'second_prize', label: 'Second Prize', type: 'str', minLength: 1, maxLength: 255, defaultValue: 'Prize B' },
{name:'second_prize_percent', label: 'Second Prize%', type:'int', minValue:1, maxValue:100, defaultValue: 50},
{ name: 'third_prize', label: 'Third Prize', type: 'str', minLength: 1, maxLength: 255, defaultValue: '', required: false },
{name:'third_prize_percent', label: 'Third Prize%', type:'int', minValue:0, maxValue:100, required: false, defaultValue: 0},
{ name: 'fourth_prize', label: 'Fourth Prize', type: 'str', minLength: 1, maxLength: 255, defaultValue: '', required: false },
{name:'fourth_prize_percent', label: 'Fourth Prize%', type:'int', minValue:0, maxValue:100, required: false, defaultValue: 0},
{ name: 'fifth_prize', label: 'Fifth Prize', type: 'str', minLength: 1, maxLength: 255, defaultValue: '', required: false },
{name:'fifth_prize_percent', label: 'Fifth Prize%', type:'int', minValue:0, maxValue:100, required: false, defaultValue: 0},
{ name: 'sixth_prize', label: 'Sixth Prize', type: 'str', minLength: 1, maxLength: 255, defaultValue: '', required: false },
{name:'sixth_prize_percent', label: 'Sixth Prize%', type:'int', minValue:0, maxValue:100, required: false, defaultValue: 0},
{ name: 'seventh_prize', label: 'Seventh Prize', type: 'str', minLength: 1, maxLength: 255, defaultValue: '', required: false },
{name:'seventh_prize_percent', label: 'Seventh Prize%', type:'int', minValue:0, maxValue:100, required: false, defaultValue: 0},
{ name: 'eighth_prize', label: 'Eighth Prize', type: 'str', minLength: 1, maxLength: 255, defaultValue: '', required: false },
{name:'eighth_prize_percent', label: 'Eighth Prize%', type:'int', minValue:0, maxValue:100, required: false, defaultValue: 0},
{ name: 'ninth_prize', label: 'Ninth Prize', type: 'str', minLength: 1, maxLength: 255, defaultValue: '', required: false },
{name:'ninth_prize_percent', label: 'Ninth Prize%', type:'int', minValue:0, maxValue:100, required: false, defaultValue: 0},
{ name: 'tenth_prize', label: 'Tenth Prize', type: 'str', minLength: 1, maxLength: 255, defaultValue: '', required: false },
{name:'tenth_prize_percent', label: 'Tenth Prize%', type:'int', minValue:0, maxValue:100, required: false, defaultValue: 0}

//End Chaturbate Choices
];

//Setup Complete Boolean
var setupComplete = false;

//Winner Boolean
var winnerFlag = false;

//Tokens Required to Play
var playCost = cb.settings.tokens_to_play;

//Tokens Required to Vote
var voteCost = cb.settings.tokens_to_vote;

//Voting Duration Length
var voteTime = cb.settings.time_to_vote * 60 * 1000;

//Tip Total
var tipTotal = 0;

//Most Recent Tip
var lastTip = 0;

//The Most Recent Winner
var cbWinner = 'No one yet!';

//The Most Recent Prize Won
var lastPrize = 'Nothing';

//Setup Players
//The broadcaster will always be the first player.
var players = [{cbuser:cb.room_slug, message: 'Initial Card Setup', votes: 0}];

//List of users currently in play
//A minor speed hack
var currentlyPlaying = [cb.room_slug];

//Define Black Cards
var blackCards = ['Someone just tipped for ____', 'Nothing says "I love you" like ____', '___ tipped a measly 1 token for a request', '____ is now banned from the room',
cb.room_slug + ' has a secret fetish for ____', '____ was just featured on the Chaturbate front page', '____ wants to have sex with ' + cb.room_slug, '____? Yeah, I have seen that on Chaturbate',
'Sorry, but tipping for ____ is too unresonable', cb.room_slug + ' has a crush on ____', 'Deepthroat ____? I only do that in private', 'My errection was ruined by ____', '____ and a hot dicking really turn me on',
'No camgirl is complete without ____', 'Is that a ____ in your pocket or are you happy to see me?', '____ is my favorite sex position'];

//Define White Cards
var whiteCards  = ['A broken webcam','A stalker','Snapchat','Token Keno','1 measley token','1000 tokens','A vulgar emoticon','A cumshot in the eye','A tiny penis',
'A rimjob', 'A blowjob', 'A very worn out dildo', 'Lube. Lots of lube', 'A cum guzzling slut', 'Chaturbate', 'A pet that wanders onto cam', 'My 12-inch cock',
'A throbbing erection', 'A battery-drained OhMibod', 'A puffy vulva', 'Double penetration', 'Anal fisting', '50 tokens', '100 tokens', 'A spammer', 'A troll', 'A cracked cell phone',
'A sugar daddy', 'A grey who promises ' + cb.room_slug + ' the world', 'My alternate Chaturbate account', 'Twitter', 'Tumblr', 'Sex', 'Buttsex', 'Being under the influence on cam',
'A filthy cunt', 'Literal shit', 'A shoe on the head', '4chan', cb.room_slug + "'s secret sex tape", 'A grey who insists on buying and shipping you things instead of buying tokens', 
'An entitled Chaturbate user', '"Camgirl Privlage"', 'A reality check', 'That "other" cam site', 'Token generator spam', 'A fistfull of tokens', 'Anal leakage', 'Visible herpes',
'A tight pussy', 'Dick pics', "A cock so small you can't see it on cam", 'Mike Hunt', 'A latex catsuit', 'BDSM gear', 'A car alarm going off in the background of a cumshow',
'A steamy makout session', 'An excuse not to buy more tokens', 'A 12-hour private session', 'Skype','YEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEHHHHHHHHHAAAAAAAAAWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
'A femenist camgirl', '"Slutshaming"', 'Karma Sutra', 'A blumpkin'];

//Define Prizes
//Needs optimization
var prizes = [
{prize: cb.settings.first_prize, percent: cb.settings.first_prize_percent},
{prize: cb.settings.second_prize, percent: cb.settings.second_prize_percent},
{prize: cb.settings.third_prize, percent: cb.settings.third_prize_percent},
{prize: cb.settings.fourth_prize, percent: cb.settings.fourth_prize_percent},
{prize: cb.settings.fifth_prize, percent: cb.settings.fifth_prize_percent},
{prize: cb.settings.sixth_prize, percent: cb.settings.sixth_prize_percent},
{prize: cb.settings.seventh_prize, percent: cb.settings.seventh_prize_percent},
{prize: cb.settings.eighth_prize, percent: cb.settings.eighth_prize_percent},
{prize: cb.settings.ninth_prize, percent: cb.settings.ninth_prize_percent},
{prize: cb.settings.tenth_prize, percent: cb.settings.tenth_prize_percent}
];

//Number of needed players before voting
var numNeeded = cb.settings.num_players;

//Rules shown?
var showRules = true;

//Current Goal
var goal = [{goal: '', amount: 0, isActive :false}];

//Grey Array
greysVoted = [''];

//Black Card Init
var theBlackCard = '';

//Initialize CAH
function init()

{
     //Reset Votes
     cb.tipOptions(function(user) {
     return;
     });
     
     //Reset Players
     players = [];
     currentlyPlaying = [];
     
     //Setup Broadcaster As Player
     players = [{cbuser:cb.room_slug, message: 'Initial Card Setup', votes: 0}];
     currentlyPlaying = [cb.room_slug];
     
     //Init Black Card
     setBlack();
     
     //Set Broadcaster Card
     players[0]['message'] = whiteCard();
     
     //When User Tips
     cb.onTip(userTipped);
     
     //When User Chats
     cb.onMessage(OnMessage);
     
     //APP - Draw Panel
     drawPanel();
     
     
     //Should we show the rules?
     if (showRules == true
     )
     {
          //YES
          //Room Enter
               cb.onEnter(function(user) {
                   cb.chatNotice(rules(), user['user']);
               });
          
          //Initial Notice
          //Let users know the game has started
          cb.chatNotice('A new game of "Chaturbate Against Humanity" has begun. Type "/rules" for the rules or "/prizes" for a list of prizes.', '', 'gold','red', 'bold');
          
     }
     else
     {
          //NO
     };  //end of IF [Should we show the rules?]
     
};

//Get Value To See Card
function getViewBool(isYes)

{
     //TRUE
     if (isYes == 'Yes'
     )
     {
          //YES
          //Return True
          return true;
          
     }
     else
     {
          //NO
          //Return False
          return false;
          
     };  //end of IF [TRUE]
     
};

//Set Black Card
//Set the room topic to the CAH Black Card
function setBlack()

{
     //Get Random Number
     var rnd = Math.floor(Math.random() * blackCards.length);
     
     //Get Random Black Card
     var tempCard = blackCards[rnd];
     
     
     //While the Black Card is Undefined
     while (tempCard === undefined
     )
     {
          //Get Random Number
          rnd = Math.floor(Math.random() * blackCards.length);
          
          //Get Random White Card
          tempCard = blackCards[rnd];
          
          
     };  //end of WHILE [While the Black Card is Undefined]
     
     //Delete Card From Being Picked Twice
     delete blackCards[rnd];
     
     //APP - Change Room Subject
     cb.changeRoomSubject(tempCard + ' #CAH');
     
     //Return tempCard
     theBlackCard = tempCard;
     
};

//Handle Tip
function userTipped(tip)

{
     //Increment Total
     tipTotal += tip['amount'];
     
     //Latest Tip
     lastTip = tip['amount'];
     
     //Set Goal String
     var goalStr = '';
     
     //Is goal active?
     if (goal.isActive == true
     )
     {
          //YES
          //Subtract tip from goal
          goal.amount -= lastTip;
          
          //TRUE
          if (goal.amount <= 0
          )
          {
               //YES
               //Reset Goal String
               goalStr = 'Congrats ' + tip['from_user'] + '! You got us to "' + goal.goal + '!" ';
               
               //Make goal inactive
               goal.isActive = false;
               
          }
          else
          {
               //NO
               //Reset Goal String
               goalStr = 'Thank you ' + tip['from_user'] + ', now only ' + goal.amount + ' tokens until "' + goal.goal + '." ';
               
          };  //end of IF [TRUE]
          
          //Goal Info
          cb.chatNotice( goalStr, '', 'gold','red', 'bold');
          
     }
     else
     {
          //NO
     };  //end of IF [Is goal active?]
     
     //Is setup finished?
     if (setupComplete == true
     )
     {
          //YES
          //Did they tip enough to vote?
          if (tip['amount'] >= voteCost
          )
          {
               //YES
               //List all cards in play
               for (var i=0;i<players.length;i++
               )
               {
                    //Is this the card the user voted for?
                    if (tip['message'] == players[i].message
                    )
                    {
                         //YES
                         //Increaste the vote number by tip amount
                         players[i].votes +=  tip['amount'];
                         
                    }
                    else
                    {
                         //NO
                    };  //end of IF [Is this the card the user voted for?]
                    
                    //Display Cards
                    cb.chatNotice( (i+1).toString()  + ' . ' + players[i].message + ' - Votes: ' + players[i].votes);
                    
               };  //end of FOR [List all cards in play]
               
          }
          else
          {
               //NO
          };  //end of IF [Did they tip enough to vote?]
          
     }
     else
     {
          //NO
          //Wait for Players
          if (players.length < 2
          )
          {
               //Check for new tip
               //White Card Tip
               if (tip['amount'] == playCost
               )
               {
                    //Add White Card
                    //Run addUserCard
                    addUserCard(tip['from_user']);    
                    
               }
               else
               {
               };  //end of IF [White Card Tip]
               
          }
          else
          {
               //More than 1 player?
               //User Already Played?
               if (cbjs.arrayContains(currentlyPlaying, tip['from_user'])
               )
               {
                    //YES
                    //Can they see their white card?
                    if (getViewBool(cb.settings.user_can_see) == true
                    )
                    {
                         //YES
                         //Apologize
                         cb.sendNotice('Sorry, you are already playing the following card: ' + getCard(tip['from_user']) + '. You cannot play more than one card.' , tip['from_user']);
                         
                    }
                    else
                    {
                         //NO
                         //Apologize
                         cb.sendNotice('Sorry, you are already playing a card. You cannot play more than one card.' , tip['from_user']);
                         
                    };  //end of IF [Can they see their white card?]
                    
               }
               else
               {
                    //NO
                    //Add card to the new payer
                    //White Card Tip
                    if (tip['amount'] == playCost
                    )
                    {
                         //Run addUserCard
                         //Add New Card
                         addUserCard(tip['from_user']);    
                         
                    }
                    else
                    {
                    };  //end of IF [White Card Tip]
                    
               };  //end of IF [User Already Played?]
               
          };  //end of IF [Wait for Players]
          
     };  //end of IF [Is setup finished?]
     
     //DEBUG - # Users In Play
     cb.log(players.length.toString());
     
     //DEBUG - List All Players
     for (var i=0;i<players.length;i++
     )
     {
          //Display Players
          cb.log('cbuser: ' + players[i].cbuser + ' message: ' + players[i].message + ' votes: ' + players[i].votes);
          
     };  //end of FOR [DEBUG - List All Players]
     //APP - Redraw Panel
     drawPanel();
     
     //Do we have enough players?
     if (players.length >= numNeeded
     )
     {
          //YES
          //Begin the voting
          beginVote();
          
     }
     else
     {
          //NO
     };  //end of IF [Do we have enough players?]
     
};

//Add White Card
function whiteCard()

{
     //Get Random Number
     var rnd = Math.floor(Math.random() * whiteCards.length);
     
     //Get Random White Card
     var tempCard = whiteCards[rnd];
     
     
     //While the White Card is Undefined
     while (tempCard === undefined
     )
     {
          //Get Random Number
          rnd = Math.floor(Math.random() * whiteCards.length);
          
          //Get Random White Card
          tempCard = whiteCards[rnd];
          
          
     };  //end of WHILE [While the White Card is Undefined]
     
     //Delete Card From Being Picked Twice
     delete whiteCards[rnd];
     
     //Return White Card
     return tempCard;
     
};

//APP - drawPanel
function drawPanel()

{
     //Should we draw the template?
     if (showRules = true
     )
     {
          //YES
          //Draw Panel Setup
          cb.onDrawPanel(function() {
              return {
          
          //Define Template
          'template': '3_rows_of_labels',
          
          //Row 1 Label
          'row1_label': 'Number of Players:',
          
          //Row 1 Value
          'row1_value': players.length.toString() + '/' + numNeeded.toString(), 
          
          //Row 2 Label
          'row2_label': 'Winner:',
          
          //Row 2 Value
          'row2_value': cbWinner,
          
          //Row 3 Label
          'row3_label': 'Won Prize:',
          
          //Row 3 Value
          'row3_value': lastPrize
          
          //End Draw Panel Setup
              };
          });
          
     }
     else
     {
          //NO
     };  //end of IF [Should we draw the template?]
     
     //Actually draw the panel
     cb.drawPanel();
     
};

//Get Reward
//Give the user a reward for having the best card.
function getReward()

{
     //Reset Votes
     cb.tipOptions(function(user) {
     return;
     });
     
     //Initalize Highest Vote
     var highestVotes = 0;
     
     //List All Players
     for (var i=0;i<players.length;i++
     )
     {
          //If the player has more votes
          if (players[i].votes > highestVotes
          )
          {
               //YES
               //Save the High Vote User
               cbWinner = players[i].cbuser;
               
               //Update High Vote
               highestVotes = players[i].votes;
               
          }
          else
          {
               //NO
          };  //end of IF [If the player has more votes]
          
     };  //end of FOR [List All Players]
     
     //Check if anyone voted
     if (highestVotes != 0
     )
     {
          //YES
          //Did the broadcaster win?
          if (cbWinner == cb.room_slug
          
          )
          {
               //YES
               //Get Prize
               lastPrize = 'Nothing';
               
               //Announce Winner And Prize
               cb.chatNotice(cb.room_slug + ' just won. Better luck next time.\n Next round will start in 10 seconds.', '', 'gold','red', 'bold');
               
          }
          else
          {
               //NO
               //Get a real prize
               getPrize();
               
               //Announce Winner And Prize
               cb.chatNotice(cbWinner + ' just won a ' + lastPrize + '\n Next round will start in 10 seconds.', '', 'gold','red', 'bold');
               
          };  //end of IF [Did the broadcaster win?]
          
     }
     else
     {
          //NO
          //Get Prize
          lastPrize = 'Nothing';
          
          //Announce Winner And Prize
          cb.chatNotice('No one voted. ' + cb.room_slug + ' wins by default.\n Next round will start in 10 seconds.', '', 'gold','red', 'bold');
          
     };  //end of IF [Check if anyone voted]
     
     //APP - Redraw the Panel
     drawPanel();
     
     //Allow Setup Again
     setupComplete = false;
     
     //Reinitialize
     cb.setTimeout(init, 10000);
     
};

//Get User Card
function getCard(user)

{
     //Loop Through Players
     for (var i=0;i<players.length;i++
     )
     {
          //Find the User
          if (players[i].cbuser == user
          )
          {
               //YES
               //Return the Card
               return players[i].message;
               
          }
          else
          {
          };  //end of IF [Find the User]
          
     };  //end of FOR [Loop Through Players]
     
};

//On Message
function OnMessage(msg)

{
     //TRUE
     if (msg.m.startsWith('[') && msg.m.indexOf('/') > -1
     )
     {
          //YES
          //Remove Custom Title
          msg.m = msg.m.substring(msg.m.indexOf(']') + 1, msg.m.length).trim();
          
     }
     else
     {
          //NO
     };  //end of IF [TRUE]
     
     //If the user wants to see the rules...
     if (msg.m.startsWith('/rules')
     )
     {
          //YES
          //Show the rules
          cb.chatNotice(rules(), msg['user']);
          
     }
     else
     {
          //NO
     };  //end of IF [If the user wants to see the rules...]
     
     //Check if the broadcaster wants to set a goal
     simpleGoal(msg);
     
     //If the user wants to see the prizes...
     if (msg.m.startsWith('/prizes')
     )
     {
          //YES
          //Initialize Prize Array
          var prizeArray = [''];
          
          //For each prize
          for (var i=0; i<prizes.length;i++
          )
          {
               //Check for a valid prize
               if (prizes[i].prize
               )
               {
                    //YES
                    //Add it to the list.
                    prizeArray.push(prizes[i].prize);
                    
               }
               else
               {
                    //NO
               };  //end of IF [Check for a valid prize]
               
          };  //end of FOR [For each prize]
          
          //Shuffle prizes
          shuffle(prizeArray);
          
          //Create prize string
          var prizeString = 'The prizes are as follows: ' + prizeArray.join(', ');
          
          //List the prizes
          cb.chatNotice(prizeString.trim() + '.', msg['user']);
          
     }
     else
     {
          //NO
     };  //end of IF [If the user wants to see the prizes...]
     
     //Check if adjusting needs to happen
     if (((msg.user == cb.room_slug) && msg.m.startsWith('/adjust')) || ((msg.is_mod == true) && msg.m.startsWith('/adjust'))
     )
     {
          //YES
          //Hide the command
          msg['X-Spam'] = true;
          
          //Split Command
          var functProp = msg.m.split(' ');
          
          //Make sure the adjustment is correct
          if (functProp.length >= 4
          )
          {
               //YES
               //Get Adjustment Amount
               var amount = functProp[1];
               
               //Make adjustment
               players[functProp[2] - 1].votes += eval(amount);
               
               //Reason
               var reason = [''];
               
               //Create Reason String
               for (var i=3; i<functProp.length;i++
               )
               {
                    //Push it
                    reason.push(functProp[i]);
                    
               };  //end of FOR [Create Reason String]
               //Notify users of ajustment
               cb.chatNotice( 'The card "' + players[functProp[2] - 1].message + '" has been adjusted by ' + amount + ' votes by ' + msg.user + ' for the following reason: '+ reason.join(' ').trim(), '', 'gold','red', 'bold');
               
          }
          else
          {
               //NO
          };  //end of IF [Make sure the adjustment is correct]
          
     }
     else
     {
          //NO
     };  //end of IF [Check if adjusting needs to happen]
     
     //Add CPU player?
     if (((msg.user == cb.room_slug) && msg.m.startsWith('/addcpu')) || ((msg.is_mod == true) && msg.m.startsWith('/addcpu'))
     )
     {
          //YES
          //Hide the command
          msg['X-Spam'] = true;
          
          //Add Cpu
          addUserCard('CPU'+players.length);    
          
          //Notify users of ajustment
          cb.chatNotice( 'CPU'+players.length + ' has been added to the player list by ' + msg.user, '', 'gold','red', 'bold');
          
          //APP - Draw Panel
          drawPanel();
          
          
     }
     else
     {
          //NO
     };  //end of IF [Add CPU player?]
     
     //Do we have enough players?
     if (players.length >= numNeeded
     )
     {
          //YES
          //Begin the voting
          beginVote();
          
     }
     else
     {
          //NO
     };  //end of IF [Do we have enough players?]
     
     //Is Grey Play Enabled?
     if (cb.settings.grey_play == 'Yes'
     )
     {
          //YES
          //Code
          greyPlay(msg);
          
     }
     else
     {
          //NO
     };  //end of IF [Is Grey Play Enabled?]
     
};

//Add User Card
function addUserCard(user)

{
     //Create new card
     var userMessage = whiteCard();
     
     //Create Player data
     var card = {cbuser: user, message: userMessage, votes: 0};
     
     //Add to players
     players.push(card);
     
     //Add to playing list
     currentlyPlaying.push(user);
     
     //Can they see their white card?
     if (getViewBool(cb.settings.user_can_see) == true
     )
     {
          //YES
          //Inform them their card has been added
          cb.sendNotice('You are now playing Chaturbate Against Humanity this round! \n Your card is: ' + userMessage + '\n Good luck!', user);
          
     }
     else
     {
          //NO
          //Inform them their card has been added
          cb.sendNotice('You are now playing Chaturbate Against Humanity this round! \n Good luck!', user);
          
     };  //end of IF [Can they see their white card?]
     
};

//Begin Vote
function beginVote()

{
     //If setup isn't finished
     if (setupComplete == false
     )
     {
          //YES
          //Shuffle the Players
          shuffle(players);
          
          //Set up tip options
          cb.tipOptions(function() {
          
          //Initalize the options
          var options = [{label: players[0].message}];
          
          //Add all the other cards
          for (var i=1;i<players.length;i++
          )
          {
               //Push it
               options.push({label: players[i].message});
               
          };  //end of FOR [Add all the other cards]
          //Initalize the label
          var label = 'Please vote for a card';
          
          //Return everything
          return {options, label};
          
          //End tip options
          });
          
          //Anounce voting has begun
          cb.chatNotice('Now it is time to vote on your favorite card. 1 token = 1 vote. Minimum amount to vote is ' + voteCost +' [Tipnotes have temporarily been disabled]\n The Black Card: '+ theBlackCard);
          
          //Is Grey Play Enabled?
          if (cb.settings.grey_play == 'Yes'
          )
          {
               //YES
               //Initialize Grey Array
               greyArray = [''];
               
               //Anounce voting has begun
               cb.chatNotice('Grey Play is enabled. Greys may cast 1 vote by typing "/vote" and the number on the ballot. Ex. "/vote 4"');
               
          }
          else
          {
               //NO
          };  //end of IF [Is Grey Play Enabled?]
          
          //List all cards in play
          for (var i=0;i<players.length;i++
          )
          {
               //Display Cards
               cb.chatNotice( (i+1).toString()  + ' . ' + players[i].message + ' - Votes: ' + players[i].votes);
               
          };  //end of FOR [List all cards in play]
          //Complete Setup
          setupComplete = true;
          
          //Set Vote Duration
          cb.setTimeout(getReward, voteTime);
          
          //Initialize Times
          var timeLeft = [voteTime/2, voteTime/4, voteTime/8, voteTime/16, voteTime/32];
          
          //Set Timers
          cb.setTimeout(function(){cb.chatNotice((timeLeft[0]/ 1000) + ' seconds are left in the voting period. \n Black Card: ' + theBlackCard, '', 'gold','red', 'bold');}, voteTime - timeLeft[0])
          cb.setTimeout(function(){cb.chatNotice((timeLeft[1]/ 1000) + ' seconds are left in the voting period. \n Black Card: ' + theBlackCard, '', 'gold','red', 'bold');}, voteTime - timeLeft[1])
          cb.setTimeout(function(){cb.chatNotice((timeLeft[2]/ 1000) + ' seconds are left in the voting period. \n Black Card: ' + theBlackCard, '', 'gold','red', 'bold');}, voteTime - timeLeft[2])
          cb.setTimeout(function(){cb.chatNotice((timeLeft[3]/ 1000) + ' seconds are left in the voting period. \n Black Card: ' + theBlackCard, '', 'gold','red', 'bold');}, voteTime - timeLeft[3])
          cb.setTimeout(function(){cb.chatNotice((timeLeft[4]/ 1000) + ' seconds are left in the voting period. \n Black Card: ' + theBlackCard, '', 'gold','red', 'bold');}, voteTime - timeLeft[4])
          
     }
     else
     {
          //NO
     };  //end of IF [If setup isn't finished]
     
};

//Shuffle Function
//http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array)

{
     //Set Variables
         var currentIndex = array.length, temporaryValue, randomIndex;
     
     //While there remain elements to shuffle...
     while (0 !== currentIndex
     )
     {
          //Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          
          //And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
          
     };  //end of WHILE [While there remain elements to shuffle...]
     
     //Return the array
     return array;
     
};

//Rules
function rules()

{
     //Get Rule
     var isTrue = getViewBool(cb.settings.user_can_see);
     
     //Setup Card Viewing Option
     var cardStr = '';
     
     //Can the user see their own cards?
     if (isTrue == true
     )
     {
          //YES
          //Code
          cardStr = 'Only you can see your wite card, so you know which card to vote for during the voting period.';
          
          //Code
          seeCard = true;
          
     }
     else
     {
          //NO
          //Code
          cardStr = 'Your card will be played for you, and you will not know which card is yours during the voting period.';
          
          //Code
          seeCard = false;
          
     };  //end of IF [Can the user see their own cards?]
     
     //APP - Rules
     return 'Chaturbate Against Humanity is a Cards Against Humanity clone with similar rules. The black card is drawn first and is made the subject of the room. To draw a white card, a user must tip '
     + playCost + ' tokens. ' + cardStr + ' After enough users have played their white cards, a vote is cast. The choice with the most votes at the end of ' + cb.settings.time_to_vote + ' minutes wins the round!'
     + ' If the broadcaster wins, nothing happens. But if you win, you will recieve the prize listed in the info area below the cam. (Note: If you accidentally forget to select or select the wrong choice when voting let the broadcaster or mod know and they can adjust it for you)';
     
     //Don't show them again
     showRules = false;
     
};

//Simple Goal
function simpleGoal(msg)

{
     //Is the broadcaster setting a goal?
     if (((msg.user == cb.room_slug) && msg.m.startsWith('/goal')) || ((msg.is_mod == true) && msg.m.startsWith('/goal'))
     )
     {
          //YES
          //Hide message
          msg['X-Spam'] = true;
          
          //Split Command
          var functProp = msg.m.split(' ');
          
          //Get Goal Amount
          goal. amount = functProp[1];
          
          //Goal Array
          var goalArray = [''];
          
          //Join Goal
          for (var i = 2; i<functProp.length; i++
          )
          {
               //Push it
               goalArray.push(functProp[i]);
               
          };  //end of FOR [Join Goal]
          //Set Goal Text
          goal.goal = goalArray.join(' ').trim();
          
          //Make Goal Active
          goal.isActive = true;
          
          //Notify users off new goal
          cb.chatNotice( 'A new goal of "' + goal.goal + '" has been set for ' + goal.amount + ' tokens.', '', 'gold','red', 'bold');
          
     }
     else
     {
          //NO
     };  //end of IF [Is the broadcaster setting a goal?]
     
     //Is the broadcaster changing a goal?
     if (((msg.user == cb.room_slug) && msg.m.startsWith('/changegoal')) || ((msg.is_mod == true) && msg.m.startsWith('/changegoal'))
     
     )
     {
          //YES
          //Hide message
          msg['X-Spam'] = true;
          
          //Split Command
          var functProp = msg.m.split(' ');
          
          //Get Goal Amount
          goal. amount = functProp[1];
          
          //Goal Array
          var goalArray = [''];
          
          //Join Goal
          for (var i = 2; i<functProp.length; i++
          )
          {
               //Push it
               goalArray.push(functProp[i]);
               
          };  //end of FOR [Join Goal]
          //Set Goal Text
          goal.goal = goalArray.join(' ').trim();
          
          //Make Goal Active
          goal.isActive = true;
          
          //Notify users off new goal
          cb.chatNotice( 'The goal has been changed! A new goal of "' + goal.goal + '" has been set for ' + goal.amount + ' tokens.', '', 'gold','red', 'bold');
          
     }
     else
     {
          //NO
     };  //end of IF [Is the broadcaster changing a goal?]
     
};

//Get Prize
//This whole function requires optimization
function getPrize()

{
     //Percent Total
     var percentTotal = 0;
     
     //Shuffle Prizes
     shuffle(prizes);
     
     //Create number array
     var numberArray = [0];
     
     //Loop through prizes
     for (var i=0;i<prizes.length;i++
     )
     {
          //Add to percent total
          percentTotal += prizes[i].percent;
          
          //Add to number array
          numberArray.push(numberArray[i] += prizes[i].percent);
          
     };  //end of FOR [Loop through prizes]
     //Get Random Number
     var rnd = Math.floor(Math.random() * percentTotal);
     
     //DEBUG - Random and Ceiling numbers
     cb.log('Random number: ' + rnd + '\n Percent Total: ' + percentTotal);
     
     //Select a Prize
     switch (true
     )
     {
          //Prize 1
          case (rnd <= numberArray[1])
           : 
          {
               //code
               lastPrize = prizes[1].prize;
               
               //Odds
               cb.log('Odds of winning this prize: ' + (prizes[1].percent/percentTotal)*100 + '%');
               
               //break
               break;
               
          };  //end of CASE ITEM [Prize 1]
          
          //Prize 2
          case (rnd > numberArray[1]  && rnd <= numberArray[2])
           : 
          {
               //code
               lastPrize = prizes[2].prize;
               
               //Odds
               cb.log('Odds of winning this prize: ' + (prizes[2].percent/percentTotal)*100 + '%');
               
               //break
               break;
               
          };  //end of CASE ITEM [Prize 2]
          
          //Prize 3
          case (rnd > numberArray[2] && rnd <= numberArray[3])
          
           : 
          {
               //code
               lastPrize = prizes[3].prize;
               
               //Odds
               cb.log('Odds of winning this prize: ' + (prizes[3].percent/percentTotal)*100 + '%');
               
               //break
               break;
               
          };  //end of CASE ITEM [Prize 3]
          
          //Prize 4
          case (rnd > numberArray[3] && rnd <= numberArray[4])
          
          
           : 
          {
               //code
               lastPrize = prizes[4].prize;
               
               //Odds
               cb.log('Odds of winning this prize: ' + (prizes[4].percent/percentTotal)*100 + '%');
               
               //break
               break;
               
          };  //end of CASE ITEM [Prize 4]
          
          //Prize 5
          case (rnd > numberArray[4] && rnd <= numberArray[5])
           : 
          {
               //code
               lastPrize = prizes[5].prize;
               
               //Odds
               cb.log('Odds of winning this prize: ' + (prizes[5].percent/percentTotal)*100 + '%');
               
               //break
               break;
               
          };  //end of CASE ITEM [Prize 5]
          
          //Prize 6
          case (rnd > numberArray[5] && rnd <= numberArray[6])
           : 
          {
               //code
               lastPrize = prizes[6].prize;
               
               //Odds
               cb.log('Odds of winning this prize: ' + (prizes[6].percent/percentTotal)*100 + '%');
               
               //break
               break;
               
          };  //end of CASE ITEM [Prize 6]
          
          //Prize 7
          case (rnd > numberArray[6] && rnd <= numberArray[7])
           : 
          {
               //code
               lastPrize = prizes[7].prize;
               
               //Odds
               cb.log('Odds of winning this prize: ' + (prizes[7].percent/percentTotal)*100 + '%');
               
               //break
               break;
               
          };  //end of CASE ITEM [Prize 7]
          
          //Prize 8
          case (rnd > numberArray[7] && rnd <= numberArray[8])
           : 
          {
               //code
               lastPrize = prizes[8].prize;
               
               //Odds
               cb.log('Odds of winning this prize: ' + (prizes[8].percent/percentTotal)*100 + '%');
               
               //break
               break;
               
          };  //end of CASE ITEM [Prize 8]
          
          //Prize 9
          case (rnd > numberArray[8] && rnd <= numberArray[9])
           : 
          {
               //code
               lastPrize = prizes[9].prize;
               
               //Odds
               cb.log('Odds of winning this prize: ' + (prizes[9].percent/percentTotal)*100 + '%');
               
               //break
               break;
               
          };  //end of CASE ITEM [Prize 9]
          
          //Prize 10
          case (rnd > numberArray[9] && rnd <= numberArray[10])
           : 
          {
               //code
               lastPrize = prizes[10].prize;
               
               //Odds
               cb.log('Odds of winning this prize: ' + (prizes[10].percent/percentTotal)*100 + '%');
               
               //break
               break;
               
          };  //end of CASE ITEM [Prize 10]
          
          default :
          //default
               //No prize?
               lastPrize = 'Something went wrong...';
               
               //break
               break;
               
     };  //end of switch [Select a Prize]
     
};

//Grey Play
function greyPlay(msg)

{
     //Check if the grey is voting
     if (msg.m.startsWith('/vote') && msg.has_tokens == false
     )
     {
          //YES
          //User Already Played?
          if (cbjs.arrayContains(greyArray, msg.user)
          )
          {
               //YES
               //Stop it
               cb.sendNotice('Sorry, you cannot vote more than once per round.' , msg.user);
               
          }
          else
          {
               //NO
               //Add card to the new payer
               //Split Command
               var functProp = msg.m.split(' ');
               
               //Make sure the syntax is correct
               if (functProp.length = 2
               )
               {
                    //YES
                    //Make adjustment
                    players[functProp[1] - 1].votes += eval(1);
                    
                    //Notify users of ajustment
                    cb.chatNotice( 'You have cast your vote this round. Thank you for participating.', msg.user, 'gold','red', 'bold');
                    
                    //Add to already voted list
                    greyArray.push(msg.user);
                    
               }
               else
               {
                    //NO
               };  //end of IF [Make sure the syntax is correct]
               
          };  //end of IF [User Already Played?]
          
     }
     else
     {
          //NO
     };  //end of IF [Check if the grey is voting]
     
};

//Start Chaturbate Against Humanity
//Let's get on with it already!
init();
