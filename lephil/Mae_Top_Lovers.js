// http://www.rlc-cams.com/apps/user_uploads/2/lephil/
// http://www.rlc-cams.com/apps/sourcecode/mae-top-lovers/?version=&slot=2

/*  
 * 	Title: Mae Top Lovers
 * 	Author: lephil
 * 		Email: lephil.chaturbate@outlook.com
 * 	Version: 1.0.2 Aug 04, 2018
 * 
 * 
*/
(function(a,k){function g(a){this.message=a}g.prototype=Error();g.prototype.name="InvalidCharacterError";a.btoa||(a.btoa=function(a){a=String(a);for(var f,b,n=0,c=k,q="";a.charAt(n|0)||(c="=",n%1);q+=c.charAt(63&f>>8-n%1*8)){b=a.charCodeAt(n+=.75);if(255<b)throw new g('"btoa" failed: The string to be encoded contains characters outside of the Latin1 range.');f=f<<8|b}return q});a.atob||(a.atob=function(a){a=String(a).replace(/=+$/,"");if(1==a.length%4)throw new g('"atob" failed: The string to be decoded is not correctly encoded.');

for(var f=0,b,n,c=0,q="";n=a.charAt(c++);~n&&(b=f%4?64*b+n:n,f++%4)?q+=String.fromCharCode(255&b>>(-2*f&6)):0)n=k.indexOf(n);return q})})("undefined"===typeof exports?this:exports,"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");

(function(a){var k=cb.onMessage,g=null,u=null,f,b="#"+(cb.settings.hasOwnProperty("slot")?cb.settings.slot:"")+"CBSv2",n=/^\/#[0-3]CBSv2\//;cb.log("CBS::v2::CB app/bot data Save/restore::20171104.010::Release");cb.onMessage=function(c){if("function"!==typeof c)throw new TypeError(c+" is not a function");k(function(k){var d=k.m.replace(/\s*/g,"").split("/");if(3<d.length&&""===d[0]&&d[1]===b){if(g&&u&&k.user===cb.room_slug){var p=d[2];if(4===d.length)d[3]="?",k.m=d.join("/");else if(6===d.length){if(!(f||

{}).hasOwnProperty(p)){var q=g();f={};f[p]=a.btoa(a.unescape(a.encodeURIComponent(q)));q||cb.log("onSave returned no data.")}f.hasOwnProperty(p)&&(q=parseInt(d[3],10),p=f[p].slice(q,q+512),d[4]=p,d[5]=p.length,k.m=d.join("/"))}else 7===d.length&&("0"===d[3]&&(f={},f[p]=""),f.hasOwnProperty(p)&&(d[3]=f[p].length,d[6]=d[4].length,k.m=d.join("/"),d[4]?f[p]+=d[4]:(q=a.decodeURIComponent(a.escape(a.atob(f[p]))),u(q),cb.chatNotice("Previously Saved Data Restored.",cb.room_slug))))}k["X-Spam"]=!0}else n.test(k.m)&&

(k["X-Spam"]=!0);return c(k)});return c};cb.onRestore=function(a){if("function"!==typeof a)throw new TypeError(a+" is not a function");return u=a};cb.onSave=function(a){if("function"!==typeof a)throw new TypeError(a+" is not a function");return g=a};cb.onMessage(function(a){return a})})("undefined"===typeof exports?this:exports);

// endof CBSv2.010 module - not for re-compilation
// CONSTANTS
var COLORS = [
	{name: 'Amaranth', 	code: '#c92572',	bgcode: '#f9eaf1'},	
	{name: 'Black',		code: '#000000',	bgcode: '#e8e8e8'},
	{name: 'Blue', 		code: '#016ea6',	bgcode: '#e3eff6'},	
	{name: 'SteelBlue',	code: '#4159b5',	bgcode: '#e7ebfb'},
	{name: 'DarkBlue', 	code: '#364785',	bgcode: '#e4e9f9'},
	{name: 'BrownRed', 	code: '#b31313',	bgcode: '#fbe9e9'},
	{name: 'DarkViolet',	code: '#9c3dc4',	bgcode: '#efdff4'},
	{name: 'SeanceViolet',	code: '#ba21bf',	bgcode: '#ffdffe'},	
	{name: 'Green', 	code: '#327939',	bgcode: '#e1f9e3'},
	{name: 'DarkGreen', 	code: '#436446',	bgcode: '#d0e8d3'},
	{name: 'Pink', 		code: '#FF00BA',	bgcode: '#ffe6f8'},    
	{name: 'Purple', 	code: '#800080',	bgcode: '#f1e4f1'},
	{name: 'Red', 		code: '#ff3232',	bgcode: '#f6e5e9'},
	{name: 'TorchRed', 		code: '#FF0040',	bgcode: '#ffe5e5'},	
	{name: 'Turquoise',	code: '#188b8c', 	bgcode: '#e2f6f6'},
	{name: 'SlateGray', 	code: '#708090',	bgcode: '#eaeff3'},
];

var HEARTS = [
	{name: 'Fuchsya',	icon: ':mtlhfu'},
	{name: 'Pink',		icon: ':mtlhpi'},
	{name: 'Purple', 	icon: ':mtlhpu'},
	{name: 'Red', 		icon: ':mtlhre'}
];

// Some useful characters
var HEART 	= '\u2665';	// ♥
    BDIAMOND 	= '\u2666';	// ♦
    BSTAR 	= '\u2605';	// ★
    WSTAR 	= '\u2606';	// ☆

// Number of Top Lovers to show
var loversMaxItems = 3;
    
// Variables for Settings   
var loversModelName = '';
var loversListColor = '';
var loversListBgColor = '';
var loversTextWeight = '';
var loversListTimer = 0;
var loversHearts = true;
var loversIcon = '';
var loversAnnounce = true;

// VARIABLES
var botVersion = "1.0.2";
var botDate = "Aug 04,  2018";
var botNoticeDelay = 500;
var loversList = [];
var totalLoversList = {};
var fcMembers = {};
var sneakyMembers ={};
var kingOverall = '';

// TEXTS
var botCommand = '/bot';
var theHeader = ':mtlpheart Mae Top Lovers v' + botVersion + ' :mtlpheart2';
var loadText = 'Built by lephil (' + botDate + ')';

// SETTINGS
cb.settings_choices = [
	{
		name: 'model_lb',
		type: 'str',
		minLength: 0,
		maxLength: 21,
		required: true,
		defaultValue: cb.room_slug.charAt(0).toUpperCase() + cb.room_slug.slice(1),
		label: 'Model name in the leaderboard header'
	},
	{
		name: 'max_lb', 
		type: 'choice',
		choice1: 3,
		choice2: 4,
		choice3: 5,
		defaultValue: 3, 
		label: 'Number of Top Lovers',
	},
	{
		name: 'hearts_lb', 
		type: 'choice', 
		choice1: 'Yes', 
		choice2: 'No', 
		defaultValue: 'Yes', 
		label: 'Show hearts before Top Lovers\' messages'
	},
	{
		name: 'icons_lb', 
		type: 'choice', 
		label: 'Hearts color',
		choice1: 'Fuchsya', 
		choice2: 'Pink', 
		choice3: 'Purple', 
		choice4: 'Red', 		
		defaultValue: 'Fuchsya'
	},	
	{
		name: 'announce_lb', 
		type: 'choice', 
		choice1: 'Yes', 
		choice2: 'No', 
		defaultValue: 'Yes', 
		label: "Announce new Top Lover"
	},	
	{
		name: 'timer_lb', 
		type: 'choice',
		choice1: 1,
		choice2: 2,
		choice3: 3,
		choice4: 4,
		choice5: 5,
		choice6: 6,				
		choice7: 8,
		choice8: 10,
		choice9: 12,
		choice10: 15,
		choice11: 20,
		choice12: 30,
		choice13: 'Never',
		defaultValue: 6, 
		label: 'Top Lovers Display frequency (mins)'
	},	
	{
		name: 'color_lb', 
		type:'choice', 
		label:'Color scheme',
		choice1: 'Amaranth',
		choice2: 'Black', 
		choice3: 'Blue', 
		choice4: 'SteelBlue',
		choice5: 'DarkBlue',
		choice6: 'BrownRed',
		choice7: 'DarkViolet', 
		choice8: 'SeanceViolet',
		choice9: 'Green',
		choice10: 'DarkGreen',
		choice11: 'Pink',
		choice12: 'Purple',		
		choice13: 'Red',
		choice14: 'TorchRed',
		choice15: 'Turquoise',
		choice16: 'SlateGray',  	 
		defaultValue: 'Purple'
	},	
	{
		name: 'style_lb', 
		type: 'choice', 
		label: 'Leaderboard style',
		choice1: 'Classic', 
		choice2: 'Colored background',
		defaultValue: 'Colored background'
    },
    {
		name: 'fanClubFirstLevel',
		type: 'str',
		required: true,
		defaultValue: "Space Engineer",
		label: 'Fanclub First Level Name'
    },
    {
		name: 'fanClubFirstLevelAmount',
		type: 'int',
		minValue: 111,
		required: true,
		defaultValue: '111',
		label: 'Amount of Tokens to join the Fanclub'
    },
    {
		name: 'fanClubSecondLevel',
		type: 'str',
		required: true,
		defaultValue: "Astronaut",
		label: 'Fanclub Second Level Name'
    },
    {
		name: 'fanClubSecondLevelMin',
		type: 'int',
		minValue: 112,
		required: true,
		defaultValue: '500',
		label: 'Total amount of Tokens to join the second level Fanclub'
    }

];
if(cb.room_slug == "mae_mars" || cb.room_slug == "lephil")
{
// FUNCTIONS 
cb.onMessage(function (msg) 
{
	// Some variables
	var name = msg['user'];
	var model = cb.room_slug;
	var isModel = (name == model);
	var isUnknownCmd = (msg.m.charAt(0) == '/');
  var isSpam = false;
	// Command /lovers
	if (msg.m.indexOf('/lovers') == 0 || msg.m.indexOf('!lovers') == 0)
	{
		var message = msg['m'].substr(1);
		var userParam = getParam(message,0);	
		var userParam2 = getParam(message,1);
		var userParam3 = getParam(message,2);
		var userParam4 = getParam(message,3);	
		var botPrefix = '/';
		var head = '';
		var userMsg = '';
        isUnknownCmd = false;
        isSpam = true;

		if (!userParam2) {
			model = model.charAt(0).toUpperCase() + model.slice(1);
			msg['m'] = msg['m'] + " (lovers list sent to " + msg['user'] + ")";
			if (loversList.length > 0) {
				head = ':mtlpheart ' + loversModelName + '\'s Lovers List :mtlpheart2';
				for (var i = 0; i < loversList.length; i++){
					/* Add \n before starting a new line */
					if (i > 0) {
						userMsg += '\n';
					}	      
					/* Add a new tipper if available */
					if (i < loversList.length) {
                        userMsg += '' + (i + 1) + '. ' + loversList[i].name + '  (' + loversList[i].tokens + ' tks this session, ' +totalLoversList[loversList[i].name].tokens+ ' tks overall. )';
					}
					else {
						userMsg += '' + (i + 1) + '. ---------------------';
                    }
                   
                }
                
			}
			else {
				userMsg = 'No lovers yet! Tip now and become the top lover!';
            }	
            if(kingOverall!=''){
                userMsg += '\n';
                userMsg += "Tip more than " + totalLoversList[kingOverall].tokens +" tokens to replace " +kingOverall + " as the #1 Top Lover of all time.";
            }		
		}
		else {
			if (isModel || msg.is_mod) {
				msg['X-Spam'] = true;
				switch (userParam2)
				{
                    case 'tip':
                        break;
                    case 'addfc':
                            if(!isFC(userParam3)){
                                cb.sendNotice(userParam3 + " got a promotion. He is now part of the " + cb.settings.fanClubFirstLevel + ' crew ');
                                cb.sendNotice("Tip " + cb.settings.fanClubFirstLevelAmount + " to join the crew ");
                                makeFirstLevelFC(userParam3);
                            }
                        break;
                    case 'promote':
                            if(isFC(userParam3) && GetFCLevel(userParam3) == 1)
                            {
                                cb.sendNotice(userParam3 + " got a promotion. He is now part of the " + cb.settings.fanClubSecondLevel + ' crew ');
                                makeSecondLevelFC(userParam3);
                            }
                        break;
                    case 'addsneaky':
                        if(!isSneaky(userParam3))
                        {
                            cb.sendNotice(userParam3 + " has been added to the sneaky club");
                            cb.sendNotice("The membership expires in 30 days!");
                            makeSneaky(userParam3);
                        }
                    break;
					case 'add':
						// Add a new tip
						if (userParam3 && userParam4) {
							if (isInteger(userParam4) && userParam4 > 0) {
								handleTip(userParam3, userParam4);
								userMsg = 'A tip of ' + userParam4 + 'tks from user ' + userParam3 + ' has been added to the Lovers List.';
							}
							else {
								userMsg = 'You need to pass an integer value greater than 0 (e.g. ' + botPrefix + userParam + ' ' + userParam2 + ' username 100).';
							}
						}
						else {
							userMsg = 'You need to pass a valid username and value (e.g. ' + botPrefix + userParam + ' tip username 100).';	
						}
					break;
                    
                    case 'alltime':

                    if (Object.keys(totalLoversList).length > 0) {
                        head = ':mtlpheart ' + loversModelName + '\'s All-Time Lovers List :mtlpheart2';
                    
                        
                        for (var key in totalLoversList) {
                            userMsg += '\n  ' + key +' '+ totalLoversList[key].tokens+ ' tks overall. ';
                        }
                       
                               
                                  
                          
                        
                    }
                    else {
                        userMsg = 'No lovers yet! Tip now and become the top lover!';
                    }	
                    if(kingOverall!=''){
                        userMsg += '\n';
                        userMsg += "Tip more than " + totalLoversList[kingOverall].tokens +" tokens to replace " +kingOverall + " as the #1 Top Lover of all time.";
                    }		
                    break;
					case 'remove':
						// Remove lover
						if (userParam3) {
							var objTipper = getTipper(userParam3);
							if (objTipper) {
								cbjs.arrayRemove(loversList, objTipper);
								userMsg = 'User ' + userParam3 + ' has been removed from the Lovers List.';
							}
							else {
								userMsg = 'User ' + userParam3 + ' is not in the Lovers List.';
							}
						}
						else {
							userMsg = 'You need to pass a valid username (e.g. ' + botPrefix + userParam + ' ' + userParam2 + ' username).';	
						}
					break;
								
					default:
						userMsg = 'You need to pass a valid option (e.g. ' + botPrefix + userParam + ' tip username 100).';	
					break;
				}
			}
		}
		// Send results
		// Workaround for CB bug: this delay prevents message from being broken by command text in the room
		if (head) delayedNotice(300,head,name,loversListColor,'#FFFFFF','bold');
		delayedNotice(600,userMsg,name,loversListBgColor,loversListColor,'normal');		
	}
	
	// Top Tipper? Let's add a heart to the msg
	if (loversHearts && !isUnknownCmd && !isSpam) {
		var pos = getTopLover(msg['user']);
		if (pos > 0) {
			msg['m'] = ' ' + loversIcon + pos + ' | ' + msg['m'];
		}
    }  
    
    if(isSneaky(msg['user']) && !isSpam){
       
        msg['m'] = '' + BDIAMOND  + ' ' + msg['m'];
    }
    if(isFC(msg['user'])&& !isSpam){
        msg['m'] = '' + getFCIcon(msg['user'])  + ' ' + msg['m'];
    }

	return msg;
});

/*
 * Handle new tip
 */
cb.onTip(function (tip) 
{
	var username = tip.from_user;
	var amount = tip.amount;
	var found = false;
	var isMVP = false;

	// Handle Lovers List
	if (loversList.length > 0) {
        isMVP = (username == loversList[0].name);
       
	}
	
	handleTip(username, amount);
	
	/* Is new Top Lover? Let's announce it! */
	if (!isMVP && loversList[0].name == username && loversAnnounce) {
		var msg = ':mtlstar ' + loversList[0].name + ' :mtlstar is the new Top Lover with ' + loversList[0].tokens + ' tokens in this session!\n He tipped ' +totalLoversList[username].tokens +' overall ';
		cb.sendNotice(msg,'',loversListColor,'#ffffff','bold');
    }	
    
});

/*
 * Adds a new tip to the loversList Array, adding a new user if needed
 * @username : user who tipped
 * @tokens : amount tipped
 */
function handleTip(username, tokens)
{
	var found = false;
	tokens = parseInt(tokens);
	// Update tipper
	for (var i = 0; i < loversList.length; i++) {
		if (loversList[i].name == username) {
			loversList[i].tokens += tokens;
			found = true;
			break;
		}
	}
	
	// Add a new one
	if (!found) loversList.push({ name: username, tokens: tokens });
	     
	// Sort the array
	loversList.sort(function(a, b) {
		return b.tokens - a.tokens;
    });
    if(username in totalLoversList){
        totalLoversList[username].tokens += tokens;
    }else
    {
        totalLoversList[username] = {
            'tokens': tokens
        }
    }
    
   if(kingOverall != ''){
    if(totalLoversList[kingOverall].tokens < totalLoversList[username].tokens ){
    kingOverall = username;
    cb.sendNotice(username + " earned his place as the #1 Top Lover of all time. He tipped a total amount of "+totalLoversList[username].tokens );
   }
}
   else
   {
    kingOverall = username;
    cb.sendNotice(username + " earned his place as the #1 Top Lover of all time. He tipped a total amount of "+totalLoversList[username].tokens );   
   }
   if(!isFC(username))
   {
       if(tokens== cb.settings.fanClubFirstLevelAmount)
       {
           cb.sendNotice(username + " joined the " + cb.settings.fanClubFirstLevel +" crew");
           makeFirstLevelFC(username);
           if(totalLoversList[username].tokens>cb.settings.fanClubSecondLevelMin-1)
           {
            cb.sendNotice(username + " instantly got promoted to the "  + cb.settings.fanClubSecondLevel +" crew as he already tipped at least " + cb.settings.fanClubSecondLevelMin +" tokens");
            makeSecondLevelFC(username);
           }

       }
   }
   else{
    if(totalLoversList[username].tokens>cb.settings.fanClubSecondLevelMin-1)
    { if(getFCLevel(username)<2){
     cb.sendNotice(username + " got promoted to the "  + cb.settings.fanClubSecondLevel +" crew as he tipped at least " + cb.settings.fanClubSecondLevelMin +" tokens");
     makeSecondLevelFC(username);
    }
    }
   }
}

/*
 * Returns the user object from the tippers list matching the name
 */
function getTipper(name) 
{
	if (loversList.length > 0) {
		for (var i=0; i<loversList.length; i++) {
			if (loversList[i].name == name) {
				return loversList[i];
			}
		}			
	}
	return 0;
}

/*
 * Returns the name of the lover with more tokens
 */
function getTopLover(name) 
{
	if (loversList.length > 0) {
		for (var i=0; i<Math.min(loversList.length, loversMaxItems); i++) {
			if (loversList[i].name == name) {
				return i+1;
			}
		}
	}
	cb.log('User not in the top ' + loversMaxItems + ' lovers.');
	return 0;
}

/*
 * Returns the name of the heart emote of a certain color
 */
function getHeartsIcon(name) 
{
	for (var i=0; i<HEARTS.length; i++) {
		if (HEARTS[i].name == name) {
			return HEARTS[i].icon;
		}
	}
	return false;
	cb.log('Error: Could not find the icon for this heart color: ' + name);
}

/*
 * Returns the code of a requested color name
 */
function getColorCode(name) 
{
	for (var i=0; i<=COLORS.length; i++) {
		if (COLORS[i].name == name) {
			return COLORS[i].code;
		}
	}
	return "#FFFFFF";
	cb.log('Error: Could not find the code for this color: ' + name);
}

/*
 * Returns the code of a requested color background
 */
function getBgColorCode(name) 
{
	for (var i=0; i<=COLORS.length; i++) {
		if (COLORS[i].name == name) {
			return COLORS[i].bgcode;
		}
	}
	return "#FFFFFF";
	cb.log('Error: Could not find the bgcode for this color: ' + name);
}

/*
 * Return parameter in a certain position in a string
 */
function getParam(msg, position) 
{
	var tmp = msg.split(' ');
	return tmp[position];
}

/*
 * Validates if number is Integer type
 * 
 */
function isInteger(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}

/*
 * Send delayed notice
 * @msg: message to send
 * @target: send the notice to this target
 * @delay: delay time in miliseconds
 * @weight: font weight
 * @group: send to group of users
 * 
 */
function delayedNotice(delay, msg, target, bgcolor, fgcolor, weight, group) 
{
	if (msg && isInteger(delay) && delay > 0) 
	{
		// Send Notice
		setTimeout(function(){
			cb.sendNotice(msg,target,bgcolor,fgcolor,weight,group);
		}, delay);
		
		return true;
	} 
	else {
		return false;
	}
}

/*
 * Sends the lovers list to the room
 */
function announceLoversList() 
{
	var target = '';
	var msgHead = '';
	var msgRoom = '';	
	
	/* Build the lovers list */
	if (loversList.length > 0) {
		
		/* Add header */
		msgHead = ':mtlpheart ' + loversModelName + '\'s Top Lovers :mtlpheart2';	
		
		for (var i = 0; i < loversMaxItems; i++){
			/* Add \n before starting a new line */
			if (i > 0) {
			msgRoom += '\n';
			}	      
		
			/* Add a new tipper if exists */
			if (i < loversList.length) {
				msgRoom += '' + (i + 1) + '. ' + loversList[i].name + '  (' + loversList[i].tokens + ' tks in this session and a total of '+ totalLoversList[loversList[i].name].tokens + ')';
			}
			else {
				msgRoom += '' + (i + 1) + '. ---------------------';
            }	
           
        }
        
		
		/* More lovers? Invite viewers to see full list! */
		if (loversList.length > loversMaxItems) {
			msgRoom += '\nType /lovers to see the full list!';
		}
	}
	else {
		msgRoom = 'No lovers in this session yet! Tip now and become the top lover!';
	}
    if(kingOverall!=''){
        msgRoom +="\nTip more than " + totalLoversList[kingOverall].tokens +" tokens to replace " +kingOverall + " as the #1 Top Lover of all time.";   
    } 
	if (msgHead) cb.sendNotice(msgHead,target,loversListColor,'#FFFFFF','bold');
	cb.sendNotice(msgRoom,target,loversListBgColor,loversListColor,'normal');
	
	cb.setTimeout(announceLoversList, (loversListTimer * 60000));
}


/*
 * Builds user vars and arrays based on settings
 */
function loadSettings() 
{
	if (cb.settings.model_lb) {
		loversModelName = cb.settings.model_lb.trim();
	}
	
	if (!loversModelName) loversModelName = cb.room_slug.charAt(0).toUpperCase() + cb.room_slug.slice(1);
	
	if (cb.settings.color_lb) {
		loversListColor = getColorCode(cb.settings.color_lb);
	}
	
	if (cb.settings.style_lb == 'Colored background') {
		loversListBgColor = getBgColorCode(cb.settings.color_lb);
		loversTextWeight = 'bold';
	}
	else {
		loversListBgColor = '';
		loversTextWeight = 'normal';	
	}

	loversMaxItems = cb.settings.max_lb;
	if (cb.settings.timer_lb == 'Never') {
		loversListTimer = 0;
	}
	else {
		loversListTimer = cb.settings.timer_lb;
	}
	loversHearts = (cb.settings.hearts_lb == 'Yes') ? 1 : 0;
	loversAnnounce = (cb.settings.announce_lb == 'Yes') ? 1 : 0;
	loversIcon = getHeartsIcon(cb.settings.icons_lb);
	if (!loversIcon) loversIcon = ':001h';
}

/*
 * Setting up the bot at start
 */
function init()
{
	//Load values in settings to global variables
	loadSettings();
	
	// Start Lovers list
	if (loversListTimer) cb.setTimeout(announceLoversList, (loversListTimer * 70000));
	
	// Bot loaded message
	// Workaround for CB bug: this delay prevents message from being showed in wrong order
	setTimeout(function(){
		cb.sendNotice(theHeader,'',loversListColor,"#FFFFFF",'bolder');
		setTimeout(function(){
			cb.sendNotice(loadText,'','',loversListColor,'bold');
        }, 300);	
        setTimeout(function(){
			cb.sendNotice("Hello Pao. Grab a hug and rock todays show! :hugyou69 :mtlpheart Phil", cb.room_slug,'',loversListColor,'bold');
		}, 300);
	}, botNoticeDelay);		
}

init();
}
else
{
    cb.sendNotice("This is a bot made for mae_mars, not for you. Contact lephil if you want your own one.");
}
cb.onSave(function () {
  // form the variables into an object, using their names as the object keys
  var data = {
    kingOverall: kingOverall,
    totalLoversList: totalLoversList,
    fcMembers: fcMembers,
    sneakyMembers: sneakyMembers
  };
  // return that object in the form of a string
  return JSON.stringify(data);
});


cb.onRestore(function (data) {
  // parse the restored data string into an object
  var restored = JSON.parse(data);

  // reinstate the saved variables
  Object.keys(restored).forEach(function (variable) {
    if (this.hasOwnProperty(variable)) {
      this[variable] = restored[variable]
    }
  });
});

function isFC(username) {
    return (username in fcMembers);
  }
function getFCIcon(username){
  if(!isFC(username)) return '';
  else
  {
      if(fcMembers[username].u==1)
      {
        return WSTAR;
      }
      else
      {
        return BSTAR;
      }
  }
}
function getFCLevel(username)
{
    if(!isFC(username)) return 0;
  else
  {
      return fcMembers[username].u;
  }
}

  function makeFirstLevelFC(username){
    fcMembers[username] = {
        'u': 1,
        'firstDate': new Date(),
        'active':true,
        'lastRenewed': new Date()
      };
  }
  function makeSecondLevelFC(username){
    fcMembers[username].u = 2;
    fcMembers[username].active = true;
    fcMembers[username].lastRenewed = new Date();
  }
  function deleteFC(username) {
    delete fcMembers[username];
  }
  function makeSneaky(username){
      sneakyMembers[username] ={
          'u':1
      }
  }
  function deleteSneaky(username){
    sneakyMembers[username] ={
        'u':1,
        'firstDate': new Date()

    }
}
    function isSneaky(username) {
        if(username in sneakyMembers)
        {
            var timestamp = new Date().getTime() - (30 * 24 * 60 * 60 * 1000)
            if(timestamp > sneakyMembers[username].firstDate){
                deleteSneaky(username);
                return false;
            }
            return true;
        }
        return false;
       
      }
      
cb.onEnter(function(user) {
    var u = user['user'];
    var sneaky =  isSneaky(u) ? 'Sneaky ': '';
    if (isFC(u)){
        if(getFCLevel(u)==1){
            cb.chatNotice(sneaky + cb.settings.fanClubFirstLevel + " " + u + " has joined the room! ");
        }else{
            cb.chatNotice(sneaky + cb.settings.fanClubSecondLevel + " " + u + " has joined the room! ");
        }
    }
    else
    {
        if(isSneaky(u)){
            cb.chatNotice(sneaky  + u + " has joined the room! ");
        }
    }
});
      
      
cb.onLeave(function(user) {
    var u = user['user'];
    var sneaky =  isSneaky(u) ? 'Sneaky ': '';
    if (isFC(u)){
        if(getFCLevel(u)==1){
            cb.chatNotice(sneaky + cb.settings.fanClubFirstLevel + " " + u + " has left the room! ");
        }else{
            cb.chatNotice(sneaky + cb.settings.fanClubSecondLevel + " " + u + " has left the room! ");
        }
    }
    else
    {
        if(isSneaky(u)){
            cb.chatNotice(sneaky  + u + " has left the room! ");
        }
    }
});
