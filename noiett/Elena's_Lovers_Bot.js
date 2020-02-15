// http://www.rlc-cams.com/apps/user_uploads/2/noiett/
// http://www.rlc-cams.com/apps/sourcecode/elenas-lovers-bot/?version=&slot=2

/*  
 * 	Title: Dream Bot ++
 * 	Author: noiett
 * 		Email: noiett.cb@gmail.com
 * 		Twitter: @biosandapps
 * 	Version: 3.7.1 Aug 15, 2018
 * 	Description: Multi-bot with leaderboard, notifiers, tipmenu, room control, hidden show, thanks messages.
 * 
 * 	This bot uses modified code and ideas from these apps, so some credit to the author:
 * 		- Tip Menu - Single Line (badbadbubba)
 * 		- No Grey Demands Graphics (badbadbubba)
 * 	
 * 
*/

// Some useful characters
const	HEART 	= '\u2665';	// ♥
	BDIAMOND = '\u2666';	// ♦
	BSTAR 	= '\u2605';	// ★
	SSTAR	= '\u22c6';	// ⋆
	WSTAR 	= '\u2606';	// ☆
	POINT	= '\u00B7';	// ·
	ARROW	= '\u2192';	// →
	SBSQR	= '\u25AA';	// ▪    
	SARROW	= '\u10148'; 	// ➤
    
/* --------------------------------------------
 * Constants for different uses
 * --------------------------------------------
*/ 

// CONSTANTS
var BOT_THEMES = [];
var COLORS = [];

var TEXT_COLORS = [
	{name: 'No color',	code: ''},
	{name: 'Black',		code: '#000000'},
	{name: 'Blue',		code: '#0000ff'},
	{name: 'DarkBlue', 	code: '#1b1b7b'},
	{name: 'Brown', 	code: '#8B0000'},
	{name: 'CeriseRed', 	code: '#e32370'},	
	{name: 'DarkViolet',	code: '#8600b3'},
	{name: 'Green', 	code: '#00ac26'},
	{name: 'Red',		code: '#ff0000'},
	{name: 'Orange',	code: '#ff6734'},	
	{name: 'Pink', 		code: '#FF00BA'},    
	{name: 'Purple', 	code: '#800080'},
	{name: 'DarkRed', 	code: '#C10000'},
	{name: 'Gray', 		code: '#7c7c7c'},
	{name: 'LightBlue', 	code: '#3877ff'},
	{name: 'Yellow', 	code: '#FFA500'},	
];

var HIGHLIGHT_COLORS = [
	{name: 'No highlight',	code: ''},
	{name: 'BabyPink',	code: '#fff0f0'},
	{name: 'Blue',		code: '#e9f0fd'},	
	{name: 'Gray',		code: '#f1f1f1'},
	{name: 'Green',		code: '#eef6ed'},	
	{name: 'Pink',		code: '#ffedf6'},
	{name: 'Purple', 	code: '#edebff'},
	{name: 'Turquioise', 	code: '#e8f6f6'},	
	{name: 'Yellow', 	code: '#feffc3'},
];

var THANKS_COLORS = [
	{name: 'Yellow & Black', 	code: '#ffff00',	bgcode: '#000000'},	
	{name: 'Blue & Black', 	code: '#00ffff',	bgcode: '#000000'},	
];

var 	BOT_ICONS = [];
	BOT_ICONS['bot_left'] = ':mooncloud15';
	BOT_ICONS['bot_right'] = ':mooncloud15';
	BOT_ICONS['menu_left'] = ':dblabel16';
	BOT_ICONS['menu_right'] = ':dblabel16';	
	BOT_ICONS['room_info'] = ':mtlstar';
	BOT_ICONS['secret_left'] = ':mtlcamleft';
	BOT_ICONS['secret_right'] = ':mtlcamright';
	BOT_ICONS['crew_left'] = ':mtlcrew';
	BOT_ICONS['crew_right'] = ':mtlcrew';
	BOT_ICONS['crew_join'] = ':mtljoin';
	BOT_ICONS['crew_part'] = ':mtlleft2';	
	BOT_ICONS['lovers_left'] = ':mtlpheart';
	BOT_ICONS['lovers_right'] = ':mtlpheart2';

var GREY_EMOTES = [
	'blush','curse','confused','cool','cry','drool','huh','roll',
	'mellow', 'ohmy',  'smile',  'thumbdown', 'thumbup', 'wink', 'woot', 'angel', 'bounce', 'smoke', 'crazy', 'hello', 'thumbsup', 'yes',
	'hearts', 'what',  'upset', 'bow', 'rofl', 'help', 'innocent', 'yawn', 'yawn', 'gangsta', 'kissy', 'oo', 'lmao',
];	

var HEARTS = [
	{name: 'Fuchsia',	icon: ':mtlhfu'},
	{name: 'Pink',		icon: ':mtlhpi'},
	{name: 'Purple', 	icon: ':mtlhpu'},
	{name: 'Red', 		icon: ':mtlhre'}
];

var SEP_CHARS = [];
	SEP_CHARS['Glitter'] = ':pixelglitter';
	SEP_CHARS['Flowers'] = ':tinyflower2';
	SEP_CHARS['Bow'] = ':bluebow';
	SEP_CHARS['Hearts'] = ':pixelheart';
	SEP_CHARS['Hearts 2'] = ':heart2';	
	SEP_CHARS['Pink Sparkle'] = ':sparklpink';	
	SEP_CHARS['Text Heart'] = HEART;
	SEP_CHARS['Text Diamond'] = BDIAMOND;
	SEP_CHARS['Text Star'] = BSTAR;
	SEP_CHARS['Vertical Bar'] = '|';

/* -----------------------------------------------------------------
 * Constants and Variables to set up the custom bot for the model
 * -----------------------------------------------------------------
*/ 

var CUSTOM_COLORS = [];
var CUSTOM_ICONS = [];
var CUSTOM_THEMES = [];

var NICKNAMES_MAX_LENGTH = 20;
var TAGS_MAX_LENGTH = 12;
var	TIPMENU_CUSTOM_ITEMS = 20;
var NOTIFIERS_MAX = 8;

var botName = 'Dream Bot ++';
var ownerName = cb.room_slug.charAt(0).toUpperCase() + cb.room_slug.slice(1);
var ownerRoom = cb.room_slug;

var nickOpen = '(';
var nickClose = ')';
var tagOpen = '[';
var tagClose = ']';

// VIP people
var botVIPS = ['noiett','dirtydreamx','hotbunny'];
		
// Features loaded to settings
var botFeatures = [
	'roomControl',
	'modelFeatures',
	'chatFeatures',
	'tipMessages',
	'secretShow',
	'topLovers',
	'notifiers',
	'tipMenu'
];

var defaultSettings = {
	botTheme: 'Metal Blue',
	totalTipped: 'Yes',
	genderIcon: 'No',
	modelFeatures: 'Yes',
	ownerColor: 'Pink',
	ownerTag: '',
	ownerIcon: ':icon_crown',
	ownerHighlight: 'Pink',
	chatFeatures: 'Yes',	
	tipMessages: 'Yes',
	whispers: 'Yes',
	roomControl: 'Yes',
	customCrew: 'Yes',
	crewHighlight: 'Gray',
	crewExpireTime: 0,
	topLovers: 'Yes',
	loversIcon: 'Fuchsia',
	loversTimer: 10,
	secretShow: 'Yes',
	secretModsViewers: 'No',
	secretPrice: 50,
	secretMinTip: 0,
	notifiers: 'Yes',
	notifiersTimer: 4,
	notifiersColor: 'Theme colors',
	notifiersBg: 'Yes',
	tipMenu: 'Yes',
	tipMenuSep: 'Theme separator',
	tipMenuSingle: 'Yes',
	tipMenuColor: 'Theme colors',
	tipMenuTimer: 5
};

// TipMenu : (hide = don't show in settings or room announcement, only tip response) 
var menuItems = [];

/* ---------------------------------------------------
 * Variables for the Room Control, Whispers, Commands
 * ---------------------------------------------------
*/ 
var controlLevels = ['No','Everyone','Greys only', 'No'];
var commandLevels = ['Everyone', 'Users with tokens', 'Mods and Fan Club', 'Moderators only'];
var thanksLevels = ['Everyone', 'The tipper only'];

var commandsList = [
//	{name: 'help',		option: '',		params: '',			level: 0,	help: 'Shows a list with all available commands'},
	{name: 'about',		option: '',		params: '',			level: 0,	help: 'Shows information about this bot'},
	{name: 'lovers',	option: '',		params: '',			level: 0,	help: 'Shows a list with all tippers'},
	{name: 'tipmenu',	option: '',		params: '',			level: 0,	help: 'Shows a complete tip menu'},
	{name: 'showmenu',	option: '',		params: '',			level: 3,	help: 'Sends the tip menu to the room'},
	{name: 'color',		option: '',		params: '[#fgcolor]',		level: 2,	help: 'Sets a custom text color'},
	{name: 'bgcolor',	option: '',		params: '[#bgcolor]',		level: 2,	help: 'Sets a custom background color'},
	{name: 'tag',		option: '',		params: '[tag]',		level: 2,	help: 'Sets a custom tag'},
	{name: 'icon',		option: '',		params: '[:name]',		level: 2,	help: 'Sets a custom icon'},	
	{name: 'remove',	option: '',		params: '[feature]',		level: 2,	help: 'Removes one feature: '},
	{name: 'w',			option: '',		params: '[username] [message]',	level: 2,	help: 'Sends a whisper to another user'},
	{name: 'wb',		option: '',		params: '[message]',		level: 2,	help: 'Sends a whisper to the broadcaster'},
	{name: 'wm',		option: '',		params: '[message]',		level: 2,	help: 'Sends a whisper to all mods'},
	{name: 'r',			option: '',		params: '[message]',		level: 2,	help: 'Replies the last whisper received'},
	{name: 'set',		option: 'color',	params: '[username] [#fgcolor]',level: 3,	help: 'Sets a custom text color to the user'},
	{name: 'set',		option: 'bgcolor',	params: '[username] [#bgcolor]',level: 3,	help: 'Sets a custom background color to the user'},
	{name: 'set',		option: 'tag',		params: '[username] [tag]',	level: 3,	help: 'Set custom tag to the user'},
	{name: 'set',		option: 'icon',		params: '[username] [:icon]',	level: 3,	help: 'Sets a custom icon to the user'},
	{name: 'uset',		option: '',		params: '[feature] [username]',	level: 3,	help: 'Removes one of these features: '},
	{name: 'silence',	option: '',		params: '[username]',		level: 3,	help: 'Silences a user permanently in chat'},
	{name: 'silence',	option: '',		params: '[username] [minutes]',	level: 3,	help: 'Silences a user temporarily in chat'},
	{name: 'usilence',	option: '',		params: '[username]',		level: 3,	help: 'Allows the user to chat again'},
	{name: 'usilence',	option: '',		params: '',			level: 3,	help: 'Allows the last user silenced to chat again'},	
	{name: 'filters',	option: '',		params: '[on|off]',		level: 4,	help: 'Enables/disables the chat filters'},
	{name: 'greys',		option: '',		params: '[on|off]',		level: 4,	help: 'Enables/disables the chat for grey users'},
	{name: 'notice',	option: '',		params: '[message]',		level: 4,	help: 'Sends a custom notice to the room'},
	{name: 'inotice',	option: '',		params: '[message]',		level: 4,	help: 'Sends a custom info notice to the room'},
	{name: 'start',		option: '',		params: '',			level: 4,	help: 'Hides the cam and starts a secret show'},
	{name: 'start',		option: '',		params: '[price]',		level: 4,	help: 'Starts a secret show with a custom price'},
	{name: 'stop',		option: '',		params: '',			level: 4,	help: 'Stops the current secret show'},
	{name: 'secret',	option: 'add',		params: '[username]',		level: 4,	help: 'Adds a user to the secret viewers list'},
	{name: 'secret',	option: 'remove',	params: '[username]',		level: 4,	help: 'Removes a user from the secret viewers list'},
	{name: 'secret',	option: 'check',	params: '[username]',		level: 4,	help: 'Shows all users in the secret viewers list'},
	{name: 'secret',	option: 'list',		params: '',			level: 4,	help: 'Adds a user to the secret viewers list'},		
];

var controlItems = [
	{reason: 'Sticky keys', level: 0, 	regexp: /([^0-9])\1{3,}/ },
	{reason: 'All caps',	level: 0,	regexp: /^[^a-z]*$/ },
	{reason: 'Baby words',	level: 0,	regexp: /\b(bb|ba?bb?yy?|b(a|e)b?b?ee?|bibi)\b/i },
	{reason: 'Demands',	level: 0,	regexp: /\b(pm|ca?m?2ca?m?|pr?i?va?te?)\b/i },		
	{reason: 'Demands',	level: 0, 	regexp: /(?=.*\b(fu?ck|finger|suck|show|zoom|open|see|touch|spread|lick))(?=.*\b(body|ass|pussy|boobs?|bobs?|tits?|vagina|nipples?|breasts?|asshole|face|legs))/i },
	{reason: 'Demands',	level: 0,	regexp: /(?=.*\b(folla|masturba|mete|chupa|muestra|ver|ense\u00F1a|acerca|abre|toca|acaricia|abre|lame)\b)(?=.*\b(cuerpo|culo|concha|pechos?|tetas?|vagina|pezon|pezones|ano|polla|verga|vagina|cara|boca|piernas)\b)/i },	
	{reason: 'Demands',	level: 0, 	regexp: /((^mast.?rbate.?.?$)|(^squirt.?.?$)|(^kiss.?.?$)|(^cum.?.?$)|(^twerk.?.?$)|(^ass.?.?$)|(^boobs?.?.?$)|(^pussy.?.?$)|(^doggy.?.?$)|(^anal.?.?$)|(^zoom.?.?$)|(^show.?.?$)|(^tits?.?.?$)|(?=.*stand up.?.?)|(?=.*face.?.?)|(?=.*(watch|open) my cam.?.?)|(?=.*watch me.?.?))/i },
	{reason: 'Demands',	level: 0, 	regexp: /(?=.*\b(please|plz|pls|pleas).?.?\b)(?=.*\b(ass|pussy|boobs?|bobs?|tits?|nipples?|breasts?|asshole|cock|penis|face|nude|naked)\b)/i },	
	{reason: 'Demands',	level: 0,	regexp: /\b(s+o+l+e+s*|t+o+e+s*)\b|(f+e+e+t+|f+o+o+t+|p+e+d+i+c+u|f+o+t+j+o+b)/i },	
	{reason: 'Demands',	level: 0, 	regexp: /(?=.*\b(pant(i|y)?.?s?|bra|dress|clothes?)\b)(?=.*\b(off|out|remove)\b)/i  },	
	{reason: 'Rudeness',	level: 0, 	regexp: /\b(b+i+t+c+h+|s+l+u+t+|w+h+o+r+e+|p+r+o+s+t+i+t+u+t+e+|u+g+l+y+|f+a+t+|j+e+r+k+|w+a+n+k+(ing+)?|(e+)?s+t+u+p+i+d+(a+|o+)?|i+d+i+o+t+|fu?ck y?o?u+|f+a+k+e+|r+a+p+e+)\b/i },		
	{reason: 'Rudeness',	level: 0, 	regexp: /\b(z+o+r+r+a+|p+u+t+a+|f+e+a+|g+o+r+d+a+|i+m+b+e+c+i+l+|gilipollas+|i+d+i+o+t+a+|te follen+|te jodan+)\b/i },		
	{reason: 'Rudeness',	level: 0, 	regexp: /\b(pee+|poo+|pee+ing|f+i+s+t+|f+a+r+t+)\b/i },		
	{reason: 'Graphics',	level: 0,	regexp: /:[a-zA-Z0-9]{2,}\b/ },		
];  

/* --------------------------------------------
 * Global bot variables
 * --------------------------------------------
*/ 
var modelName = cb.room_slug;
var ownerIcon = '';
var ownerBgColor = '';
var modelIsOwner = true;
var botVersion = "3.7.1";
var botDate = "Aug 15, 2018";
var botStartTime = '';
var botTheme = '';
var botHeaderFg = '';
var botHeaderBg = '';
var botTextColor = '';
var botBgColor = '';
var botTextWeight = 'bold';
var botWarnColor = '#ff0000';
var botNoticeDelay = 500;
var botAnnounce = true;

// Variables for features
var showTotalTipped = false;
var showGender = false;
var safeCommands = false;
var silencedTimeout = 0;
var silencedTimeoutFreq = 0.5;
var chatColorsLevel = '';
var chatIconsLevel = '';
var chatTagsLevel = '';
var chatSep = '::';
var tipMessageText = '';
var tipMessageTarget = ''; // 'Everyone' vs 'The tipper only'
var tipMessageMin = 15;
var tipMessageTextColor = '';
var tipMessageBgColor = '';
var whispersLevel = 1;
var whispersMods = 1; 
var whispersModel = 1; 
var controlFilters = true;
var controlMods = true;
var controlGreys = true;
var controlGreysEmotes = true;
var controlAutoSilence = false;
var controlMaxWarnings = 0;
var controlWordsList = [];
var controlWarningsList = [];
var controlTextColor = '#636363';
var secretModsViewers = true;
var secretPrice = 50;
var secretMin = 0;
var secretTimer = 0;
var secretTimeout = 0;
var secretMessage = '';
var secretAutoclean = true;
var secretStartTime = 0;
var secretList =  [];
var loversMaxItems = 3; // Number of highlighted top lovers
var loversListTimer = 0;
var loversHearts = true;
var loversAnnounce = true;
var loversIcon = '';
var loversList = [];
var notifiers = [];
var notifierColor = '';
var notifierBgColor = '';
var notifierIcon = '';
var notifierTimer = 0;
var notifierNext = 1;
var tipMenuSingleLine = true;
var tipMenuColor = '';
var tipMenuTimer = 0;
var tipMenuSepChar = '';

// Features enabled/disabled in settings
var useModelFeatures = true;
var useChatFeatures = true;
var useTipMessages = true;
var useWhispers = true;
var useRoomControl = true;
var useLovers = true;
var useSecret = true;
var useNotifiers = true;
var useTipMenu = true;

var isChristmas = false;
	
// Arrays
var silencedList = [];
var usersList = [];

usersList['noiett'] = {username: 'noiett', fgColor: '#3877ff', bgColor: '#f1f1f1', tag: '', icon: ':giconn18'};
usersList['leaden89'] = {username: 'leaden89', fgColor: '', bgColor: '#ffe7c8', tag: '', icon: ''};


/* --------------------------------------------
 * Text variables
 * --------------------------------------------
*/ 
var botCommand = '';
var publicHelp = '';
var fanHelp = '';
var modHelp = '';
var modelHelp = '';
var botWelcome = '';

/* --------------------------------------------
 * Bot base settings Array
 * --------------------------------------------
*/ 
cb.settings_choices = [];

/* ------------------------------------------------
 * Bot events: onMessage, onTip, onEnter, onLeave
 * ------------------------------------------------
*/ 

/*
 * Handle new message
 */
cb.onMessage(function (msg) 
{
	// Some variables
	var name = msg['user'];
	var isModel = (name == cb.room_slug);
	var isMod = msg['is_mod'];
	var isFan = msg['in_fanclub'];	
	var isCreator = (name == 'noiett' && (ownerRoom == 'mery_lo' || ownerRoom == 'dirtydreamx'));
	var hasTokens = msg['has_tokens'];
	var hasTipped = (msg['tipped_recently'] || msg['tipped_alot_recently'] || msg['tipped_tons_recently']);
	var isGrey = !(hasTokens || isMod || isModel || isFan);	
	var isBlocked = false;
	var isCommand = false;
	var isPublicCmd = false;
	var isUnknownCmd = false;
	var userMsg = '';
	var modelMsg = '';	
	var roomInfoNotice = '';
	var roomNotice = '';
	var target = '';
	var targetMsg = '';
	var targetGroup = '';
	var targetTextColor = botTextColor;
	var targetBgColor = '';
	var msgTextColor = botTextColor;
	var msgTextWeight = 'bold'; //botTextWeight;
	var isWhisper = false;
	var botPrefix = '';

	if (useRoomControl) 
	{
		// Check if greys are blocked
		if (isGrey && !controlGreys && !isModel && !isCreator) {
			msg['X-Spam'] = true;
			msg['m'] = 'Message blocked ' + SBSQR + ' Grey users are currently silenced in the room';
			msg['background'] = '#f1f1f1';
			return msg;
		}
		else {
			// Check whether user is allowed to chat
			var silencedUser = getSilencedUser( name );
			
			if (silencedUser) 
			{
				msg['X-Spam'] = true;
				msg['m'] = 'Message blocked ' + SBSQR + ' You are currently silenced in the room';
				msg['background'] = '#f1f1f1';
				
				if (silencedUser.time) 
				{
					userMsg = 'You will be released from silence in ' + getSilenceReleaseTime( name ) + '.';
					delayedNotice( 200, userMsg, name, '', botWarnColor, 'bold' );
				}
				return msg;
			}
		}
	}
	
	// If command then process
	msg['m'] = msg['m'].trim();
	isCommand = (msg.m.indexOf('/') == 0 || msg.m.indexOf('!') == 0);
		
	if (isCommand)
	{
		// Handling commands
		var userLevel = 0;
		var message = msg['m'].trim().substr(1);
		var userParam = getParam(message,0);	
		var userParam2 = getParam(message,1);
		var userParam3 = getParam(message,2);
		var userParam4 = getParam(message,3);	
		var userParam5 = getParam(message,4);	
		var botPrefix = (safeCommands) ? botCommand + ' ' : botCommand;
		isCommand = true;

		// If command starts with ! we will jump to other commands
		if (msg.m.indexOf('!') == 0) userParam = "other";
		
		// Set user level for certain commands (colors, whispers)
		if (isModel || isCreator) {
			userLevel = 4;
		}
		else if (isMod) {
			userLevel = 3;
		}
		else if (isFan) {
			userLevel = 2;
		}
		else if (!isGrey) {
			userLevel = 1;
		}
		else {
			userLevel = 0;
		}	
					
		switch (userParam)
		{
			// Public bot commands
			case 'about':
				isPublicCmd	= true;	
				msg['m'] = msg['m'] + " (bot info sent to " + msg['user'] + ")";
				if (name == 'noiett') {
					msg['X-Spam'] = true;
					sendCommand(name, 'modabout');
				}
				else {
					sendCommand(name, 'about');
				}
			break;
			
			case 'ahelp':
				if (isCreator || isModel) {	
					isPublicCmd	= true;			
					msg['m'] = msg['m'] + " (model help sent to " + msg['user'] + ")";
					sendCommand(name, 'modelhelp');
				}
				else {
					userMsg = 'Only the broadcaster can use this command.';
				}
			break;
			
			case 'help':
				isPublicCmd	= true;			
				msg['m'] = msg['m'] + " (help sent to " + msg['user'] + ")";
				if (isCreator || isModel || isMod) {
					sendCommand(name, 'modhelp');
				}
				else {
					sendCommand(name, 'help');
				}
			break;
			
			case 'lovers':
				if (useLovers) {
					if (!userParam2) {
						isPublicCmd	= true;	
						msg['m'] = msg['m'] + " (lovers list sent to " + msg['user'] + ")";
						sendCommand(name, 'lovers');
					}
					else {
						if (isModel || isCreator) {
							msg['X-Spam'] = true;
							switch (userParam2)
							{
								case 'tip':
								case 'add':
									// Add a new tip
									if (userParam3 && userParam4) {
										if (isInteger(userParam4) && userParam4 > 0) {
											handleTopLovers(userParam3, userParam4);
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
				}
			break;

			case 'faketip':
				if (isCreator || isModel) {
					msg['X-Spam'] = true;
					if (isInteger(userParam2)) {
						var myTip = {
							'from_user': 'noiett',
							'amount': userParam2
						}
						processTip(myTip);
					}
					else {
						userMsg = 'You need to pass a valid tip value (e.g. /' + userParam + ' 15).';
					}
				}
			break;
			
			case 'tipmenu':
				if (useTipMenu) {
					isPublicCmd	= true;		
					msg['m'] = msg['m'] + " (tip menu sent to " + msg['user'] + ")";
					sendCommand(name, 'tipmenu');
				}
				else {
					userMsg = 'Tip menu is disabled at the moment. Try later.';
				}
			break;
			
			case 'showmenu':
				if (useTipMenu) {
					if (isModel || isCreator || isMod) {				
						if (useTipMenu) {
							isPublicCmd	= true;	
							msg['m'] = msg['m'] + " (tip menu sent to all)";
							sendCommand('', 'showmenu');
							break;
						}
						else{
							userMsg = 'Tip menu is disabled at the moment. Try later.';
						}
					}
					else {
						userMsg = 'Only mods and fan club members can use this command.';
					}		
				}
			break;	

			case 'start':
				if (useSecret) {
					if (isModel || isCreator) {	
						msg['X-Spam'] = true;
						if (!userParam2) {
							if (!cb.limitCam_isRunning()) {
								cb.limitCam_start(secretMessage);
								roomInfoNotice = ':mtlcamleft ' + modelName + ' has started a Secret Show. Tip ' + secretPrice + 'tks to Join! :mtlcamright';	
								secretStartTime = new Date();
								addTippersToShow();
								secretTimeout = cb.setTimeout(announceSecretShow, (Math.floor(Math.random() * 60) + 15) * 1000);
							}
							else {
								userMsg = 'Secret Show is already running!';
							}	
						}
						else {
							// Parameter is Integer to start a secret show?
							if (userParam2 && isInteger(userParam2)) {
								if (!cb.limitCam_isRunning()) {
									if (userParam2 >= 1 && userParam2 <= 999) {
										secretPrice = userParam2;
										secretMessage = 'Secret Show in progress! Tip ' + secretPrice + ' To Join!';		
										cb.limitCam_start(secretMessage);
										roomInfoNotice = ':mtlcamleft ' + modelName + ' has started a Secret Show. Tip ' + secretPrice + 'tks to Join! :mtlcamright';												
										secretStartTime = new Date();
										addTippersToShow();
										secretTimeout = cb.setTimeout(announceSecretShow, (Math.floor(Math.random() * 60) + 15) * 1000);
									}
									else {
										userMsg = 'Secret Show price must be between 1 and 999.';
									}
								}
								else {
									userMsg = 'Secret Show is already running!';
								}	
							}
							else {
								userMsg = 'You need to pass a valid parameter (e.g. ' + botPrefix + userParam + ' 50).';
							}					
						}
					}
					else {
						userMsg = 'Only the broadcaster can use this command.';						
					}
				}
			break;
							
			case 'stop':
				if (useSecret) {
					if (isModel || isCreator) {		
						msg['X-Spam'] = true;
						if (cb.limitCam_isRunning()) {
							cb.limitCam_stop();
							roomInfoNotice = ':mtlcamleft Secret Show is over! Duration time: ' + getTimeElapsed(secretStartTime) + ' :mtlcamright';
							secretStartTime = 0;
							secretPrice = cb.settings.secret_price;
							if (secretAutoclean) {
								cb.limitCam_removeAllUsers();
								roomNotice  = 'All users have been removed from the Secret Show.';
							}
							if (secretTimeout) {
								cb.cancelTimeout(secretTimeout);
								secretTimeout = 0;
							}
						}	
						else {
							userMsg = 'Secret Show is not running at the moment.';
						}
					}
					else {
						userMsg = 'Only the broadcaster can use this command.';						
					}						
				}
			break;
					
			// Fan Club commands
			case 'fgcolor':						
			case 'color':
				if (useChatFeatures) {				
					if (userLevel >= chatColorsLevel) {
						msg['X-Spam'] = true;
						// Check color format
						if ( /^#[0-9A-F]{6}$/i.test(userParam2)) {
							// Init user in array if needed
							if (!usersList[name]) initUser(name);
							usersList[name].fgColor = userParam2;
							userMsg = 'Your text color has been set to ' + userParam2 + '.';
						}
						else {
							userMsg = 'You need to pass a valid hex color code (e.g. ' + botPrefix + userParam + ' #FF1122).';
						}
					}
					else {
						userMsg = 'This command is available for ' + commandLevels[chatColorsLevel].replace(' only','').toLowerCase() + ' only.';
					}	
				}
			break;
			
			case 'bgcolor':
			case 'background':
				if (useChatFeatures) {				
					if (userLevel >= chatColorsLevel) {
						msg['X-Spam'] = true;
						// Check color format
						if ( /^#[0-9A-F]{6}$/i.test(userParam2)) {
							// Init user in array if needed
							if (!usersList[name]) initUser(name);
							usersList[name].bgColor = userParam2;
							userMsg = 'Your background color has been set to ' + userParam2 + '.';
						}
						else {
							userMsg = 'You need to pass a valid hex color code (e.g. ' + botPrefix + userParam + ' #FF1122).';
						}
					}
					else {
						userMsg = 'This command is available for ' + commandLevels[chatColorsLevel].replace(' only','').toLowerCase() + ' only.';
					}
				}
			break;

			case 'icon':
				if (useChatFeatures) {
					if (userLevel >= chatIconsLevel) {
						msg['X-Spam'] = true;
						if (userParam2) {
							userParam2 = userParam2.trim();
							if (userParam2.indexOf(':') == 0 && userParam2.indexOf(' ') == -1) {
								// Init user in array if needed
								if (!usersList[name]) initUser(name);
								usersList[name].icon = userParam2;
								userMsg = 'Your custom icon has been set: ' + userParam2;
							}
							else {
								userMsg = 'Icons must start with : and cannot contain spaces. Try again.';
							}
						}
						else {
							userMsg = 'You need to pass a valid icon (e.g. ' + botPrefix + userParam + ' :smile).';
						}
					}
					else {
						userMsg = 'This command is available for ' + commandLevels[chatIconsLevel].replace(' only','').toLowerCase() + ' only.';
					}
				}
			break;
			
			case 'tag':
				if (useChatFeatures) {
					if (userLevel >= chatTagsLevel) {
						msg['X-Spam'] = true;
						var newTag = message.split(' ').slice(1).join(' ');
						newTag = newTag.trim();						
						if (newTag) {
							if (newTag.length >= 3 && newTag.length <= TAGS_MAX_LENGTH) {
								// Init user in array if needed
								if (!usersList[name]) initUser(name);
								usersList[name].tag = tagOpen + newTag + tagClose;
								userMsg = 'Your custom tag has been set to ' + usersList[name].tag + '.';
							}
							else {
								userMsg = 'Tags should be 3 to ' + TAGS_MAX_LENGTH + ' characters long. Try another one.';
							}
						}
						else {
							userMsg = 'You need to pass a valid tag (e.g. ' + botPrefix + userParam + ' New Tag).';
						}						
					}
					else {
						userMsg = 'This command is available for ' + commandLevels[chatTagsLevel].replace(' only','').toLowerCase() + ' only.';
					}
				}
			break;
			
			case 'remove':
			case 'del':
				if (useChatFeatures) {
					msg['X-Spam'] = true;
					if (userParam2) {
						var isSet = false;
						if (['color', 'bgcolor', 'tag', 'icon', 'all'].indexOf(userParam2) != -1) {
							
							// Select target feature
							if (userParam2 == 'color' || userParam2 == 'bgcolor') {
								var targetLevel = chatColorsLevel;
							}
							else if (userParam2 == 'tag') {
								var targetLevel = chatTagsLevel;
							}
							else if (userParam2 == 'icon') {
								var targetLevel = chatIconsLevel;	
							}
							else if (userParam2 == 'all') {
								var targetLevel = Math.max( Math.max(chatColorsLevel, chatTagsLevel), chatIconsLevel);
							}
							if (userLevel >= targetLevel) {

								// Adjustements to match the obj property
								if (userParam2 == 'color') userParam2 = 'fgColor';
								if (userParam2 == 'bgcolor') userParam2 = 'bgColor';
	     
								// Init obj if it doesn't exist
								if (!usersList[name]) initUser(name);
								
								if (userParam2 == 'all') {
									usersList[name].fgColor = '';
									usersList[name].bgColor = '';
									usersList[name].icon = '';
									usersList[name].tag = '';
									userMsg = 'All your custom features have been removed.';
								}
								else {
									if (usersList[name]) {
										isSet = usersList[name][userParam2];
									}
									
									if (isSet) {
										usersList[name][userParam2] = '';
										userParam2 = userParam2.replace('fgColor','text color');
										userParam2 = userParam2.replace('bgColor','background color');
										userMsg = 'Your custom ' + userParam2 + ' has been removed.';
									}
									else {
										userParam2 = userParam2.replace('fgColor','text color');
										userParam2 = userParam2.replace('bgColor','background color');								
										userMsg = 'You don\'t seem to have any custom ' + userParam2 + ' to remove.';
									}
								}
							}
							else {
								userMsg = 'This command is available for ' + commandLevels[targetLevel].replace(' only','').toLowerCase() + ' only.';
								
							}
						}
						else {
							userMsg = 'Sorry, I can\'t remove \'' + userParam2 + '\'. It\'s not a custom feature.';
						}
					}
					else {
						userMsg = 'You need to pass a valid feature (e.g. ' + botPrefix + userParam + ' tag).';	
					}
				}
			break;

			case 'wc':
			case 'wb':
			case 'wm':
			case 'w':
			case 'r':
				if (useWhispers) {
					var 	whisperText;
					msg['X-Spam'] = true;					
					// Check target and targetLevel
					if (userParam != 'r') {
						switch (userParam.charAt(1)) {
							case 'c': 
								target = 'noiett';
								targetLevel = whispersLevel;
								whisperText = message.split(' ').slice(1).join(' ');						
							break;
							
							case 'b': 
								target = modelName;
								targetLevel = whispersModel;
								whisperText = message.split(' ').slice(1).join(' ');	
							break;
							
							case 'm': 
								targetGroup = 'red';
								targetLevel = whispersMods;
								whisperText = message.split(' ').slice(1).join(' ');	
							break;
							
							default:
								target = userParam2;
								targetLevel = (target == modelName ? whispersModel : whispersLevel);
								whisperText = message.split(' ').slice(2).join(' ');	
							break;
						}
					}
					else {
						if (usersList[name]) {
							target = usersList[name].lastWhisper;
						}
						targetLevel = whispersLevel;
						whisperText = message.split(' ').slice(1).join(' ');
						
					}

					if (userLevel >= targetLevel) {
						if (!(target == name)) {
							if (userParam2) {
								if (!(userParam == 'r' && !target)) {
									// Update target user in array if not a group whisper
									if (!targetGroup) {
										if (!usersList[target]) initUser(target);
										usersList[target].lastWhisper = name;
									}
									
									// Whisper format
									var userTextColor = ' #3376a4'; // Blue
									var userBgColor = '#f1f1f1'; // Gray
									targetBgColor = '#feffc3'; // Yellow
									msgTextColor = '#313131';
									msgTextWeight = 'bold';
									
									// Whisper content
									msg['c'] = userTextColor;
									msg['background'] = userBgColor;
									
									if (targetGroup == 'red') {
										targetTextColor = '#d71313'; // Red
										targetMsg = ':mtlwred ' + name + ' says to mods :: ' + whisperText;
										modelMsg = targetMsg;
										msg['m'] = ':mtlwblue (to room mods) :: ' + whisperText;
									}
									else {
										targetTextColor = '#319b45'; // Green
										targetMsg = ':mtlwgreen ' + name + ' says :: ' + whisperText;
										msg['m'] = ':mtlwblue (to ' + target + ') :: ' + whisperText;
									}
									
									isWhisper = true;
								}
								else {
									userMsg = 'You can\'t reply a whisper you have not received yet.';
								}
							}
							else {
								userMsg = 'You need to pass a message (e.g. ' + botPrefix + userParam + ' hello there).';
							}
						}
						else {
							userMsg = 'Sending a message to yourself doesn\'t make much sense.';
						}
					}
					else {
						if (target == modelName && userParam == 'w') {
							userMsg = 'Whispers to the broadcaster are available for ' + commandLevels[targetLevel].replace(' only','').toLowerCase() + ' only.';
						}
						else {
							userMsg = 'This command is available for ' + commandLevels[targetLevel].replace(' only','').toLowerCase() + ' only.';
						}
					}
				}
			break;
			
			case 'set':
				if (isCreator || isModel || isMod) {
					msg['X-Spam'] = true;
					if (userParam2 && userParam3) {
						switch (userParam2)
						{
							case 'color':
							case 'bgcolor':
								// Check Hex code format
								if (/^#[0-9A-F]{6}$/i.test(userParam4)) {
									// Init user in array if needed
									if (!usersList[userParam3]) initUser(userParam3);
									if (userParam2 == 'color') {
										usersList[userParam3].fgColor = userParam4;
										userMsg = userParam3 + '\'s text color has been set to ' + userParam4 + '.';
										if (name != userParam3) targetMsg = name + ' has set your text color to ' + userParam4 + '.'; 
									}
									if (userParam2 == 'bgcolor') {
										usersList[userParam3].bgColor = userParam4;
										userMsg = userParam3 + '\'s background color has been set to ' + userParam4 + '.';
										if (name != userParam3) targetMsg = name + ' has set your background color to ' + userParam4 + '.'; 
									}											
									target = userParam3;
								}
								else {
									userMsg = 'You need to pass a valid hex code (e.g. ' + botPrefix + userParam + ' ' + userParam2 + ' #000000).';
								}
							break;
								
							case 'icon':
								if (userParam3 && userParam4) {
									userParam4 = userParam4.trim();
									if (userParam4.indexOf(':') == 0 && userParam4.indexOf(' ') == -1) {
										// Init user in array if needed
										if (!usersList[userParam3]) initUser(userParam3);
										usersList[userParam3].icon = userParam4;
										userMsg = 'You set a new custom icon for ' + userParam3 + ': ' + userParam4;
										if (name != userParam3) targetMsg = name + ' has set this custom icon for you: ' + userParam4; 
										target = userParam3;
									}
									else {
										userMsg = 'Icons must start with : and cannot contain spaces. Try again.';
									}
								}
								else {
									userMsg = 'You need to pass a valid username and icon (e.g. ' + botPrefix + userParam + ' ' + userParam2 + ' username :smile).';	
								}
							break;
							
							case 'tag':
								if (userParam3 && userParam4) {
									var newTag = message.split(' ').slice(3).join(' ');
									newTag = newTag.trim();	
									if (newTag.length >= 3 && newTag.length <= TAGS_MAX_LENGTH) {
										// Init user in array if needed
										if (!usersList[userParam3]) initUser(userParam3);
										usersList[userParam3].tag = tagOpen + newTag + tagClose;
										userMsg = userParam3 + '\'s tag has been set to ' + usersList[userParam3].tag + '.';
										if (name != userParam3) targetMsg = name + ' has set your tag to ' + usersList[userParam3].tag + '.'; 
										target = userParam3;
									}
									else {
										userMsg = 'Tags should be 3 to ' + TAGS_MAX_LENGTH + ' characters long. Try another one.';
									}
								}
								else {
									userMsg = 'You need to pass a valid username and tag (e.g. ' + botPrefix + userParam + ' ' + userParam2 + ' username Tag).';	
								}									
							break;
								
							case 'timer':
								if (isCreator || isModel) {
									if ( [ 'loverslist', 'notifier', 'tipmenu', 'secretshow' ].indexOf( userParam3 ) > -1 ) {
										if (isInteger(userParam4)) {
											if (userParam4 >= 1 && userParam4 <= 30) {
												switch (userParam3) {
													case 'loverslist':
														loversListTimer = userParam4;
														break;
														
													case 'notifier':
														notifierTimer = userParam4;
														break;
														
													case 'secretshow':
														secretTimer = userParam4;
														break;																
														
													case 'tipmenu':
														tipMenuTimer = userParam4;
														break;
												}
												userMsg = 'Timer for ' + userParam3 + ' is now set to ' + userParam4 + '.';
											}
											else {
												userMsg = 'The value of the timer must be between 1 and 30 (e.g. ' + botPrefix + 'set ' + userParam2 + ' tipmenu 5).';
											}
										}
										else {
											userMsg = 'You need to pass an integer value (e.g. ' + botPrefix + 'set ' + userParam2 + ' tipmenu 5).';
										}
									}
									else {
										userMsg = 'You need to pass a valid timer [loverslist/notifier/tipmenu/secretshow] (e.g. ' + botPrefix + 'set ' + userParam2 + ' tipmenu 5).';
									}
								}
								else {
									userMsg = 'Only the broadcaster can use this command.';
								}
							break;										
								
							default:
								userMsg = 'You need to pass a valid option and value.';	
							break;
						}
					}
					else {
						userMsg = 'You need to pass a valid option and value.';	
					}
				}
				else {
					userMsg = 'Only broadcaster and mods can use this command.';
				}								
			break;

			case 'uset':
				if (isModel || isCreator || isAdmin || isMod) {
					msg['X-Spam'] = true;	
					if (userParam2 && userParam3) {
						var isSet = false;
						if (['color', 'bgcolor', 'tag', 'icon', 'all'].indexOf(userParam2) != -1) {
							// Adjustements to match the obj property
							if (userParam2 == 'color') userParam2 = 'fgColor';
							if (userParam2 == 'bgcolor') userParam2 = 'bgColor';

							//  Check if user has features
							if (usersList[userParam3]) {
								// Features available
								if (userParam2 == 'all') {
									usersList[userParam3].fgColor = '';
									usersList[userParam3].bgColor = '';
									usersList[userParam3].icon = '';
									usersList[userParam3].tag = '';
									userMsg = 'All custom features of user ' + userParam3 + ' have been removed.';
									target = userParam3;
									targetMsg = name + ' has removed all your custom features.';								
								}
								else {
									usersList[userParam3][userParam2] = '';
									userParam2 = userParam2.replace('fgColor','text color');
									userParam2 = userParam2.replace('bgColor','background color');
									userMsg = 'Custom ' + userParam2 + ' of user ' + userParam3 + ' has been removed.';
									if (name != userParam3) {
										target = userParam3;
										targetMsg = name + ' has removed your custom ' + userParam2 + '.';
									}
								}								
							}
							else {
								// No features
								if (userParam2 == 'all') {
									userMsg = 'User ' + userParam3 + ' doesn\'t seem to have a custom ' + userParam2 + ' to remove.';																		
								}
								else {
									userParam2 = userParam2.replace('fgColor','text color');
									userParam2 = userParam2.replace('bgColor','background color');
									userMsg = 'User ' + userParam3 + ' doesn\'t seem to have any feature to remove.';									
								}
							}
						}
						else {
							userMsg = 'Sorry, I can\'t remove \'' + userParam2 + '\'. It\'s not a valid custom feature.';
						}
					}
					else {
						userMsg = 'You need to pass a valid feature and username (e.g. ' + botPrefix + userParam + ' tag New Tag).';	
					}
				}
				else {
					
					userMsg = 'Only broadcaster and mods can use this command.';
				}					
			break;
			
			case 'notice':
			case 'inotice':
				if (isCreator || isModel) {
					msg['X-Spam'] = true;
					if (userParam2) {
						var noticeText = message.split(' ').slice(1).join(' ');
						if (userParam == 'inotice') {
							roomInfoNotice = getIcon('room_info') + ' ' + noticeText + ' ' + getIcon('room_info');
						}
						if (userParam == 'notice') {
							roomNotice = noticeText;
							msgTextWeight = 'bold';
						}
					}
					else {
						userMsg = 'You need to pass a valid message (e.g. ' + botPrefix + userParam + ' hello guys).';
					}
				}
				else {
					userMsg = 'Only the broadcaster can use this command.';
				}
			break;
					
			case 'secret':
				if (useSecret) {
					if (isCreator || isModel || (isMod && secretModsViewers)) {
						msg['X-Spam'] = true;
						switch (userParam2) {
							case 'add':
							case 'remove':
							case 'check':
								if (userParam3) {
									switch (userParam2) {
										case 'add':
											if (!cb.limitCam_userHasAccess(userParam3)) {
												cb.limitCam_addUsers(userParam3);
												roomInfoNotice = getIcon('room_info') + ' ' + userParam3 + ' has been added to the Secret Show! ' + getIcon('room_info');
											}
											else {
												userMsg = 'User ' + userParam3 + ' is already in the viewers list.';
											}
										break;
										
										case 'remove':
											if (cb.limitCam_userHasAccess(userParam3)) {
												cb.limitCam_removeUsers(userParam3);
												roomNotice = userParam3 + ' has been removed from the Secret Show';
											}
											else {
												userMsg = 'User ' + userParam3 + ' is not in the viewers list.';
											}
										break;
										
										case 'check':
											if (cb.limitCam_userHasAccess(userParam3)) {
												userMsg = 'User ' + userParam3 + ' is in the viewers list.';
											}
											else {
												userMsg = 'User ' + userParam3 + ' is not in the viewers list.';
											}													
										break;
									}
								}
								else {
									userMsg = 'You need to pass a valid parameter (e.g. ' + botPrefix + userParam + ' ' + userParam2 + ' username).';	
								}
							break;
							
							case 'list':
								var userList = cb.limitCam_allUsersWithAccess();
								if (userList.length > 0) {
									userMsg = "" + userList.length + (userList.length > 1 ? " users" : " user") + " in Secret Show: " + cbjs.arrayJoin(userList, ", ");
								}
								else {
									userMsg = 'There are no users added to the Secret Show.';
								}
							break;
						}
					}
					else {
						userMsg = 'Only the broadcaster can use this command.';
					}
				}
			break;

			case 'filters':
			case 'greys':
				if (useRoomControl) {
					if (isModel || isCreator || isAdmin) {
						msg['X-Spam'] = true;
						if ((userParam2 == 'on' || userParam2 == 'off')) {
							if (userParam == 'greys') {
								controlGreys = (userParam2 == 'on') ? true : false;
								roomInfoNotice = getIcon('room_info') + ' ' + name + ' has '
								+ (controlGreys ? 'enabled' : 'disabled')
								+ ' the chat for grey users ' + getIcon('room_info');
							}
							else if (userParam == 'filters') {
								controlFilters = (userParam2 == 'on') ? true : false;
								roomInfoNotice = getIcon('room_info') + ' ' + name + ' has '
								+ (controlFilters ? 'enabled' : 'disabled')
								+ ' the chat filters ' + getIcon('room_info');								
							}
						}
						else {
							userMsg = 'You need to pass a valid value (e.g. ' + botPrefix + userParam + ' on).';	
						}
					}
					else {
						userMsg = 'Only the broadcaster can use this command.';
					}
				}
			break;
							
			case 'silence':
			case 'usilence':
				if (useRoomControl) {
					if (isCreator || isModel || (isMod && controlMods)) {	
						msg['X-Spam'] = true;
						if (userParam2 || userParam == 'usilence') {
							if (userParam == 'silence') {
								if  (userParam2 != modelName && userParam2 != "noiett") {
									// Add user to array if it's not there
									var selectedUser = getSilencedUser(userParam2);
									if (!selectedUser) {
										if (userParam3) {
											// Timer for temporary silence
											if (isInteger(userParam3)) {
												if (userParam3>=1 && userParam3<=15) {
													silencedList.push({ name: userParam2, time: userParam3, startTime: new Date() });
													if (!silencedTimeout) {
														// Launch timer to release silenced users
														silencedTimeout = cb.setTimeout(releaseSilencedUsers, silencedTimeoutFreq * 60000);
													}
													roomNotice = 'User ' + userParam2 + ' has been invited to stay quiet for ' + userParam3 + ' ' + ((userParam3 > 1) ? 'minutes' : 'minute') + '.';	
												}
												else {
													userMsg = 'The duration of the silence must be between 1 and 15 minutes.';
												}
											}
											else {
												userMsg = 'You need to pass an integer value (e.g. ' + botPrefix + 'silence user 5).';
											}
										}
										else {
											// No timer: permanent silence
											silencedList.push({ name: userParam2, time: 0, startTime: 0 });
											roomNotice = 'User ' + userParam2 + ' has been invited to stay quiet from now on.';										
										}
									}
									else {
										userMsg = 'User ' + userParam2 + ' is already silenced in the room.';
									}
								}
								else {
									userMsg = 'Trying to silence that person doesn\'t seem a brilliant idea.';
								}
							}
							else {
								if (userParam2) {
									// Remove user if it's there
									var selectedUser = getSilencedUser(userParam2);
									if (selectedUser) {
										// Remove from Array
										cbjs.arrayRemove(silencedList, selectedUser);
										roomNotice = 'User ' + userParam2 + ' has '
											+ ' been granted permission to chat again!';
										// Stop timeout if needed
										if (selectedUser.time) {
											updateSilencedTimeout();
										}
												
									}
									else {
										userMsg = 'User ' + userParam2 + ' wasn\'t silenced in the room.';
									}
								}
								else {
									// No parameter, let's remove the last one.
									if (silencedList.length) {
										var selectedUser = getSilencedUser(silencedList[silencedList.length-1].name);
										cbjs.arrayRemove(silencedList, selectedUser);
										roomNotice = 'User ' + selectedUser.name + ' has '
											+ ' been granted permission to chat again!';
										// Stop timeout if needed
										if (selectedUser.time) {
											updateSilencedTimeout();
										}									
									}
									else {
										userMsg = 'There are no users silenced in the room.';
									}
								}
							}
						}
						else {
							userMsg = 'You need to pass a valid username (e.g. ' + botPrefix + userParam + ' spammer33).';	
						}
					}
					else {
						userMsg = 'Only broadcaster and mods can use this command.';
					}
				}
			break;
			
			default:
				// Other command (maybe from other bot)
				msg['X-Spam'] = true;
				isUnknownCmd = true;
			break;
		}
	}

	// Room Control
	//isGrey = true; // Please remove
	//isModel = false; // Please remove
	if (useRoomControl && controlFilters) {
		if (!isCreator && !isModel && !isMod) {
			var correctedReasons = [];
			var blockedReasons = [];			
			for (i = 0; i<controlItems.length; i++) {
				// Level control
				if (controlItems[i].level == 1 || (controlItems[i].level == 2 && isGrey)) {
					// Check item regexp
					if ((msg['m'].search(controlItems[i].regexp) != -1)){
						// Handle message modifications and notifications
						switch (controlItems[i].reason)
						{
							case 'Sticky keys':
								msg['m'] = msg['m'].replace(/(.)\1{3,}/g, '$1$1$1');
								correctedReasons.push(controlItems[i].reason);
							break;
							
							case 'All caps':
								// Special case: 1 word and starts with ":" (emote), don't apply
								if ( !(msg.m.split(" ").length == 1 && msg.m.indexOf(':') == 0) ) {
									// There are characters and none is lower case
									if (msg.m == msg.m.toUpperCase() && msg.m.toUpperCase() != msg.m.toLowerCase()) {
										msg['m'] = msg['m'].replace(/\b[A-Z]{2,}\b/g, function(x) { return x.toLowerCase() });
										correctedReasons.push(controlItems[i].reason);
									}
								}
							break;
							
							case 'Baby words':
								while (msg['m'].search(controlItems[i].regexp) != -1) {
									msg['m'] = msg['m'].replace(controlItems[i].regexp, '');
								}
								correctedReasons.push(controlItems[i].reason);							
							break;
							
							case 'Graphics':
								var reasonsSize = correctedReasons.length;
								msg['m'] = msg['m'].replace(/:([a-zA-Z0-9]{2,})\b/g,
									function(match, capture) { 
										if (controlGreysEmotes) {
											if (GREY_EMOTES.includes(capture)) {
												return ':' + capture;
											}
										}
										if (reasonsSize == correctedReasons.length) 
											correctedReasons.push(controlItems[i].reason);
										return '[emote: ' + capture + ']';
									}
								);
							break;
							
							case 'Demands':
							case 'Rudeness':
							case 'Ilegal words':
								if (!cbjs.arrayContains(blockedReasons, controlItems[i].reason)) {
									blockedReasons.push(controlItems[i].reason);
								}								
							break;
						}
					}
				}
			}
			
			// Report corrected message
			if (correctedReasons.length) {
				// Info sent to user
				msgTextColor = controlTextColor;
				userMsg = 'Your message was fixed because it contained ';
				for (i=0; i<correctedReasons.length; i++) {
					if (i>0) {
						if (i == (correctedReasons.length -1)) {
							userMsg += ' and ';
						}
						else {
							userMsg += ', ';
						}
					}
					userMsg += correctedReasons[i].toLowerCase();
				}
				userMsg += '.';
			}	
			
			// Report blocked message
			if (blockedReasons.length) {
				// Hide message
				isBlocked = true;
				msg['X-Spam'] = true;
				// Info sent to user
				msg['background'] = '#f1f1f1';
				msg['m'] = 'Message blocked ' + SBSQR + ' Reason: ';
				for (i=0; i<blockedReasons.length; i++) {
					if (i>0) {
						if (i == (blockedReasons.length -1)) {
							msg['m'] += ' and ';
						}
						else {
							msg['m'] += ', ';
						}
						msg['m'] += blockedReasons[i].toLowerCase();
					}
					else {
						msg['m'] += blockedReasons[i];
					}
				}
				
				// Handle Auto-silence
				if (controlAutoSilence && isGrey) {
					// Init counter
					if (!controlWarningsList[name]) {
						controlWarningsList[name] = 0;
					}
					controlWarningsList[name] ++;						
					// Silence if it reaches the X warning
					if (controlWarningsList[name] > controlMaxWarnings) {
						controlWarningsList[name] = 0;
						silencedList.push({name: name, timer: 0 });
						roomNotice = 'User ' + name + ' has been invited to stay quiet from now on.';
						userMsg = '';
					}
					else {
						msgTextColor = botWarnColor;
						if (userMsg) userMsg += '\n';
						userMsg = 'Persistent rude/demanding behaviour will get you silenced (' + controlWarningsList[name] + '/' + (parseInt(controlMaxWarnings) + 1) + ').';
					}
				}				
			}
		}
	}
	
	// Add extras to the message (unless it's blocked or it's a whisper)
	if (!isBlocked && !isWhisper) {
		
		var msgPrefix = '';		
		var totalTipped = '';
		var newHeart = '';
		var newIcon = '';
		var newTag = '';
		var newColor = '';
		var newBgColor = '';		
		
		// Add total tipped if needed
		if (showTotalTipped) {
			var objTipper = getTipper(name);
			if (objTipper) {
				if (objTipper.tokens > 0) {
					totalTipped = '|' + objTipper.tokens + '|';
				}
			}
		}

		// Apply custom colors and tag to message (override ones from crew)
		// Only if modelFeatures or chatFeatures are enabled
		if (useChatFeatures || (isModel && useModelFeatures)) {
			if (usersList[name]) {
				if (usersList[name].fgColor) newColor = usersList[name].fgColor;
				if (usersList[name].bgColor) newBgColor = usersList[name].bgColor;
				if (usersList[name].tag) {
					newTag = usersList[name].tag;
				}
				if (usersList[name].icon) newIcon = usersList[name].icon;
			}
		}

		// Top Tipper? Let's add a heart to the msg
		if (useLovers && loversHearts) {
			var pos = getTopLover(msg['user']);
			if (pos > 0) {
				newHeart = '' + loversIcon + pos;
			}
		} 

		// Create message prefix and colors
		// Apply message colors
		if (isCommand && (isUnknownCmd || !isPublicCmd)) {
			msg['c'] = '#000000';
			msg['background'] = '#F1F1F1';	
		}
		else {
			if (newColor) msg['c'] = newColor;
			if (newBgColor) msg['background'] = newBgColor;
		}
		
		if (!isUnknownCmd) {
			//1. Icon
			// Gender icon
			if (!newIcon && showGender) {
				// User gender icon
				switch (msg['gender']) {
					case 'm':
							msgPrefix += ' :avatar_gen_male';
						break;
					case 'f':
							msgPrefix += ' :avatar_gen_female';
						break;
					case 's':
							msgPrefix += ' :avatar_gen_trans';
						break;
					case 'c':
							msgPrefix += ' :avatar_gen_couple';
						break;
				}			
			}	
			// Custom icon
			if (newIcon) {
				// Custom icon
				msgPrefix += ' ' + newIcon;
			}
			//2. Hearts
			if (newHeart) msgPrefix += ' ' + newHeart;
			//3. Tag
			if (newTag) msgPrefix += ' ' + newTag;
			//4. Total tipped
			if (totalTipped) msgPrefix += ' ' + totalTipped;
			//5. Separator
			if (newIcon ) msgPrefix += ' ' + chatSep;
				
			// Apply prefix unless user sent a command
			msg['m'] = msgPrefix + ' ' + msg['m'];
		}
	}
	
	// Sending output messages
	// Workaround for CB bug: delayed notices prevent messages from being broken by command message
	if (roomInfoNotice) delayedNotice(botNoticeDelay,roomInfoNotice,'',botHeaderBg,botHeaderFg,'bolder');
	if (roomNotice) delayedNotice(botNoticeDelay,roomNotice, '', botBgColor, botTextColor, msgTextWeight);	     
	if (userMsg) delayedNotice(botNoticeDelay,userMsg, name, '', msgTextColor, msgTextWeight);
	if (targetMsg) cb.sendNotice(targetMsg, target, targetBgColor, targetTextColor, msgTextWeight, targetGroup);
	// Mainly mod whispers here
	if (modelMsg) {
		cb.sendNotice(modelMsg, modelName, targetBgColor, targetTextColor, msgTextWeight);
		//delayedNotice(botNoticeDelay, modelMsg, 'noiett', targetBgColor, targetTextColor, msgTextWeight);
	}
		
	return msg;
});

/*
 * Handle new tip
 */
cb.onTip(function (tip) 
{
	processTip(tip);
});

function processTip(tip) {
	var username = tip.from_user;
	var amount = tip.amount;
	var found = false;
	var isMVP = false;

	// Handle Lovers List: used for Leaderboard and Secret Show
	// so it must be enabled in any case
	if (loversList.length > 0) {
		isMVP = (username == loversList[0].name);
	}
	
	handleTopLovers(username, amount);
	
	// Is new Top Lover? Let's announce it!
	if (useLovers) {
		if (!isMVP && loversList[0].name == username && loversAnnounce) {
			var msg = getIcon('room_info') + ' ' + loversList[0].name + ' ' + getIcon('room_info') + ' is the new Top Lover with ' + loversList[0].tokens + ' tokens!';
			cb.sendNotice(msg,'',botHeaderBg,botHeaderFg,'bold');
		}	
	}
	
	// Handle Secret Show viewers
	if (cb.limitCam_isRunning()) {
		if (amount >= secretPrice) {
			// Check if user is already in list
			if (!cbjs.arrayContains(cb.limitCam_allUsersWithAccess(), username)) {
				// Not in list, let's add it				
				cb.limitCam_addUsers(username);
				var msg = getIcon('room_info') + ' ' + username + ' has been added to the Secret Show ' + getIcon('room_info');
			cb.sendNotice(msg,'',botHeaderBg,botHeaderFg,'bold');
			}
		}
	}
	
	// Handle Tip Menu 
	if (useTipMenu) {
		var tokensTip = parseInt(amount);
	
		for (i = 0; i < menuItems.length; i++) {
			if (tokensTip == menuItems[i].tokens) {
				cb.sendNotice(username + ' tipped for ' + menuItems[i].name + '!','','',tipMenuColor,'bold');
			}       
		}
	}		
	
	// Handle Tip Messages
	if (useTipMessages) {
		if (amount >= tipMessageMin) {
			var target = '';
			var out = tipMessageText.replace('[user]',username);
			out = out.replace('[amount]',amount);
			if (tipMessageTarget == 'The tipper only') target = username;
	 		cb.sendNotice(out,target,tipMessageBgColor,tipMessageTextColor,'bold');
		}
	}		
};

/*
 * handle user entrance messages
 */
cb.onEnter(function(user) 
{
	var name = user['user'];
	var isMod = user['is_mod'];
	var isFan = user['in_fanclub'];
	var isModel = (name == cb.room_slug);
	var hasTokens = user['has_tokens'];
	var hasTipped = user['tipped_recently']; 
	var isGrey = !(hasTokens || isMod || isModel || isFan);
	
	var out = '';
	
	// Bot announcement
	if (!isGrey && botAnnounce) {
		out = botWelcome.replace('[user]',name);
		if (useTipMenu) {
			out += '\n' + 'Dream bot is running. Type /tipmenu to see all prices and /help to see all commands!';
		}
		else {
			out += '\n' + 'Dream bot is running. Type /help to see all commands available!';
		}
		
		// Secret show running
		if (secretStartTime) {
			out += '\nSecret Show is running [ ' + getTimeElapsed(secretStartTime)
					+ ' ]. Tip ' + secretPrice + 'tks to unblock the cam!';
		}
		
	}

	if (out) cb.sendNotice(out,name,botBgColor,botTextColor,'bold');	   
});

/* ------------------------------------------------
 * Functions for different uses
 * ------------------------------------------------
*/ 

function vipRooms() {
	if (cbjs.arrayContains(botVIPS, ownerRoom)) {
		//TIPMENU_CUSTOM_ITEMS = 20;
		NOTIFIERS_MAX = 10;
		botFeatures = [
			'roomControl',
			'modelFeatures',
			'chatFeatures',
			'tipMessages',
			'whispers',
			'secretShow',
			'topLovers',
			'notifiers',
			'tipMenu'
		];	
		BOT_THEMES.push(
			{
				name: 'Blue Dream',
				headerfg: '#a8daf9',
				headerbg: '#002136',
				text: '#23aaff',
				background: '#ddf2ff',
				textweight: 'normal',
				tipmenu: '#002136',
				notifierfg: '#23aaff',
				notifierbg: '#ddf2ff', 
				themeIcons: {
					bot_left: ':mooncloud15',
					bot_right: ':mooncloud15',
				},
				sepChar: ':bluebow',		
			}			
		);
	}
}

// Set string variables inside a function that otherwise won't get encrypted
function setStringVars() {
	// Bot Themes
	BOT_THEMES = [
		{
			name: 'Gold Elegance',
			headerfg: '#e8eaec',
			headerbg: '#000000',
			text: '#939227',
			background: '#fffadd',
			textweight: 'normal',
			tipmenu: '#000000',
			notifierfg: '#939227',
			notifierbg: '#fffadd', 
			themeIcons: {
				bot_left: ':dbmoongold',
				bot_right: ':dbmoongold',
				menu_left: ':awstargold',
				menu_right: ':awstargold',
				room_info: ':awstargold',
			},
			sepChar: ':bluebow',		
		},
		{
			name: 'Metal Blue',
			headerfg: '#e8eaec',
			headerbg: '#364785',
			text: '#364785',
			background: '#f1f1f1',
			textweight: 'normal',
			tipmenu: '#708090',
			notifierfg: '#364785',
			notifierbg: '#f1f1f1', 
			themeIcons: {	},
			sepChar: ':bluebow',		
		},
		{
			name: 'Pinky Purple',
			headerfg: '#ffe6f8',
			headerbg: '#800080',
			text: '#FF00BA',
			background: '#ffe6f8',
			textweight: 'normal',
			tipmenu: '#800080',
			notifierfg: '#FF00BA',
			notifierbg: '#ffe6f8', 
			themeIcons: {	},
			sepChar: ':pixelglitter',		
		},		
	];	
	// Bot Colors
	COLORS = [
		{name: 'Amaranth', 	code: '#c92572',	bgcode: '#f9eaf1'},	
		{name: 'Black',		code: '#000000',	bgcode: '#e8e8e8'},
		{name: 'Blue', 		code: '#016ea6',	bgcode: '#e3eff6'},	
		{name: 'LightBlue', 	code: '#4682b4',	bgcode: '#e5f0f9'},	
		{name: 'SteelBlue',	code: '#4159b5',	bgcode: '#e7ebfb'},
		{name: 'DarkBlue', 	code: '#364785',	bgcode: '#e4e9f9'},
		{name: 'DarkBrown', 	code: '#571010',	bgcode: '#ede0e4'},
		{name: 'BrownRed', 	code: '#b31313',	bgcode: '#fbe9e9'},
		{name: 'DarkViolet',	code: '#8600b3',	bgcode: '#efdff4'},
		{name: 'SeanceViolet',	code: '#ba21bf',	bgcode: '#ffdffe'},	
		{name: 'Green', 	code: '#327939',	bgcode: '#e1f9e3'},
		{name: 'DarkGreen', 	code: '#436446',	bgcode: '#d0e8d3'},
		{name: 'Pink', 		code: '#FF00BA',	bgcode: '#ffe6f8'},    
		{name: 'Purple', 	code: '#800080',	bgcode: '#f1e4f1'},
		{name: 'Red', 		code: '#ff3232',	bgcode: '#ffe5e5'},
		{name: 'SlateGray', 	code: '#708090',	bgcode: '#eaeff3'},
		{name: 'Turquoise',	code: '#1ba0a2', 	bgcode: '#e2f6f6'},
	];	
}

/*
 * Adds a new tip to the loversList Array, adding a new user if needed
 * @username : user who tipped
 * @tokens : amount tipped
 */
function handleTopLovers(username, tokens)
{
	var found = false;
	// Update tipper
	for (var i = 0; i < loversList.length; i++) {
		if (loversList[i].name == username) {
			loversList[i].tokens += parseInt(tokens);
			found = true;
			break;
		}
	}
	
	// Add a new one
	if (!found) loversList.push({ name: username, tokens: parseInt(tokens) });
	     
	// Sort the array
	loversList.sort(function(a, b) {
		return b.tokens - a.tokens;
	});	     
}

/*
 * Returns the name of the lover with more tokens
 */
function getTopLover(name) 
{
	if (loversList.length > 0) {
		for (var i=0; i<Math.min(loversList.length, 3); i++) {
			if (loversList[i].name == name) {
				return i+1;
			}
		}
	}
	return 0;
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

Date.prototype.getStringDate = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [(dd>9 ? '' : '0') + dd,'/',
	  (mm>9 ? '' : '0') + mm,'/',
          this.getFullYear()
         ].join('');
};

/*
 * Returns the time in a Date object in string format: 1h 2mins 45secs
 */
function dateToString(date) 
{
	var out = '';
	if (date.getHours()) out += date.getHours() + 'h';
	if (date.getMinutes()) {
		out += ' ' + date.getMinutes();
		out += (date.getMinutes() > 1) ? 'mins' : 'min';
	}
	if (date.getSeconds()) {
		out += ' ' + date.getSeconds();
		out += (date.getSeconds() > 1) ? 'secs' : 'sec';
	}
	return out;
}

/*
 * Returns a Date (time) object equivalent to the number of seconds in @secs
 */
function secondsToDate(secs) 
{
	var dateTime = new Date();
	dateTime.setHours(Math.floor(secs / 3600));
	dateTime.setMinutes(Math.floor((secs - dateTime.getHours() * 3600) / 60));
	dateTime.setSeconds(Math.floor((secs - dateTime.getHours() * 3600 - dateTime.getMinutes() * 60)));	
	return dateTime;
}

/*
 * Returns the number of seconds of a Date object
 */
function dateToSeconds( date )  
{
	return ( date.getTime() / 1000 );
}

/*
 * Returns a string with the time elapsed since a date value botStartTime
 */
function getTimeElapsed(startTime) 
{
	var currentTime = new Date();
	var elapsedSeconds =    currentTime.getHours() * 3600 + currentTime.getMinutes() * 60  + currentTime.getSeconds() 
			- startTime.getHours() * 3600 - startTime.getMinutes() * 60 - startTime.getSeconds();
	var elapsedTime = secondsToDate(elapsedSeconds);
	return dateToString(elapsedTime);
}

/*
 * Returns the user object from the silenced list matching the name
 */
function getSilencedUser(name) 
{
	for (var i=0; i<silencedList.length; i++) {
		if (silencedList[i].name == name) {
			return silencedList[i];
		}
	}
	return 0;
}

/*
 * Returns the time left (string format) before a silence release
 */
function getSilenceReleaseTime( name ) 
{
	var silencedUser = getSilencedUser( name );
	
	// Check if exists
	if ( silencedUser ) 
	{
		// Check if it's a temporary silence
		if ( silencedUser.time ) 
		{
			// Calculate time left
			var currentTime = new Date();
			var releaseSeconds = dateToSeconds( silencedUser.startTime ) + ( silencedUser.time * 60 );
			var secondsLeft = releaseSeconds - dateToSeconds( currentTime );
			
			var out = '';
			if ( secondsLeft < 10 ) {
				out = 'a few seconds';
			}
			else {
				out = dateToString( secondsToDate( secondsLeft ) );
			}
			return out;
		}
	}
	return 0;
}

/*
 * This function checks times for all silenced users 
 * and stops the silencedTimout if no temporary silences are found.
 */
function updateSilencedTimeout() 
{
	var found = false;
	
	// Make sure there's an active timeout
	if (silencedTimeout) {
		
		// Check if there are pending users
		for (var i=0; i<silencedList.length; i++) {
			if (silencedList[i].time) {
				found = true;
				break;
			}
		}
		
		if (!found) {
			// Kill the timeout as it has nothing left to do
			cb.cancelTimeout(silencedTimeout);
			silencedTimeout = 0;
		}
	}
}

/*
 * This function is called by a timeout enabled with command /silence [user] [time]
 * and triggered regularly to remove expired silences until there are no more pending ones.
 */
function releaseSilencedUsers() 
{
	var pending = false;
	var currentTime = new Date();
	var elapsedTime = 0;
	var elapsedSeconds = 0;
	var roomNotice = '';
	var removeList = [];
	
	// Search al silenced users
	for (var i=0; i<silencedList.length; i++) {
		// Check if silenced user has timer
		if (silencedList[i].time) {
			// Check if timer has expired
			elapsedSeconds =    currentTime.getHours() * 3600 + currentTime.getMinutes() * 60  + currentTime.getSeconds() 
					  - silencedList[i].startTime.getHours() * 3600 - silencedList[i].startTime.getMinutes() * 60 - silencedList[i].startTime.getSeconds();
			elapsedTime = secondsToDate(elapsedSeconds);
 			//cb.log('User ' + silencedList[i].name + ' has been banned for + ' + dateToString(elapsedTime) + ' and timer was ' + silencedList[i].time + '.');
			
			if (elapsedTime.getMinutes() >= silencedList[i].time) {
				// Time expired: add user to remove list
				removeList.push(silencedList[i]);
			}
			else {
				// Time not expired: silence is pending
				pending = true;
			}
		}
	}
	
	// Remove all picked users (if any)
	for (i=0; i<removeList.length; i++) {
		cbjs.arrayRemove(silencedList, removeList[i]);
		roomNotice = 'User ' + removeList[i].name + ' has '
			+ ' been granted permission to chat again!';		
		cb.sendNotice(roomNotice, '', botBgColor, botTextColor, botTextWeight);	
	}
	
	if (!pending) {
		// No temporary silences left: stop the timeout
		cb.cancelTimeout(silencedTimeout);
		silencedTimeout = 0;
	}
	else {		
		// Launch timeout again
		silencedTimeout = cb.setTimeout(releaseSilencedUsers, silencedTimeoutFreq * 60000);
	}
}

/*
 * Returns a string the cb emote for a certain icon in app.
 * Before returning the default icon it checks if there is a custom one.
 * @name: name of the icon in index.
 * 
*/
function getIcon(name) 
{
	// 1. Check custom icons
	if (modelIsOwner && CUSTOM_ICONS[name]) {
		return CUSTOM_ICONS[name];
	}
	
	// 2. Check theme icons
	var themeObj = getTheme(botTheme);
	if (themeObj) {
		if (themeObj.themeIcons[name]) {
			return themeObj.themeIcons[name];
		}
	}
	
	// 3. Check bot icons
	if (BOT_ICONS[name]) {
		return BOT_ICONS[name];
	}
	else {
		return '';
	}
}

/*
 * Returns the theme obj of a requested theme name
 */
function getTheme(name) 
{
	// Search custom themes first
	for (var i=0; i<CUSTOM_THEMES.length; i++) {
		if (CUSTOM_THEMES[i].name == name) {
			return CUSTOM_THEMES[i];
		}
	}
	
	for (var i=0; i<BOT_THEMES.length; i++) {
		if (BOT_THEMES[i].name == name) {
			return BOT_THEMES[i];
		}
	}
	return null;
	cb.log('Error: Could not find the theme ' + name);
}

/*
 * Returns the code of a requested color name
 */
function getColorCode(name) 
{
	// Search custom colors first
	for (var i=0; i<CUSTOM_COLORS.length; i++) {
		if (CUSTOM_COLORS[i].name == name) {
			return CUSTOM_COLORS[i].code;
		}
	}
	
	for (var i=0; i<COLORS.length; i++) {
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
	// Search custom colors first
	for (var i=0; i<CUSTOM_COLORS.length; i++) {
		if (CUSTOM_COLORS[i].name == name) {
			return CUSTOM_COLORS[i].bgcode;
		}
	}
	
	for (var i=0; i<COLORS.length; i++) {
		if (COLORS[i].name == name) {
			return COLORS[i].bgcode;
		}
	}
	return "#FFFFFF";
	cb.log('Error: Could not find the bgcode for this color: ' + name);
}

/*
 * Returns the code of a requested color name
 */
function getTextColorCode(name) 
{
	for (var i=0; i<=TEXT_COLORS.length; i++) {
		if (TEXT_COLORS[i].name == name) {
			return TEXT_COLORS[i].code;
		}
	}
	return "#FFFFFF";
	cb.log('Error: Could not find the code for this color: ' + name);
}

/*
 * Returns the code of a requested highlight color name
 */
function getHighlightColorCode(name) 
{
	for (var i=0; i<=HIGHLIGHT_COLORS.length; i++) {
		if (HIGHLIGHT_COLORS[i].name == name) {
			return HIGHLIGHT_COLORS[i].code;
		}
	}
	return "#FFFFFF";
	cb.log('Error: Could not find the code for this color: ' + name);
}

/*
 * Returns the obj of a requested thanks theme name
 */
function getTipMessageTheme(name) 
{
	for (var i=0; i<=THANKS_COLORS.length; i++) {
		if (THANKS_COLORS[i].name == name) {
			return THANKS_COLORS[i];
		}
	}
	return "#FFFFFF";
	cb.log('Error: Could not find the code for this color: ' + name);
}

/*
 * Returns the control level code (0=No, 1=All, 2=Greys only)
 * for a given @value (string description from settings)
 */
function getControlLevel(value) {
	for (i=0; i<3; i++) {
		if (controlLevels[i] == value) {
			return i;
		}
	}
	return 0;
}

/*
 * Returns the command level code (0=Everyone, 1=Mods and fans, 2=Mods only)
 * for a given @value (string description from settings)
 */
function getCommandLevel(value) {
	for (i=0; i<commandLevels.length; i++) {
		if (commandLevels[i] == value) {
			return i;
		}
	}
	return 0;
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
 * Valides a date in String format
 * 
*/
function isValidDate(strDate) {
	
	// Remove any spaces
	strDate = strDate.trim();
	
	// Split into parts separated with '/'
	var dateArray = strDate.split('/');  
	
	if (dateArray.length == 3) {
		if (isInteger(dateArray[0]) && isInteger(dateArray[0]) && isInteger(dateArray[0])) {
			var dd = parseInt(dateArray[0]);
			var mm = parseInt(dateArray[1]);
			var yyyy = parseInt(dateArray[2]);
			var listOfDays = [31,28,31,30,31,30,31,31,30,31,30,31]; 
			
			if (yyyy >= 2017 && yyyy < 3000) {
				if (mm >= 1 && mm <= 12) {
					if (dd >= 1 && dd <= listOfDays[mm-1]) {
						return true;
					}
				}
			}
		}
	}
	return false;
}

/*
 * Returns a string date  in a date object
 * 
*/
function stringToDate(strDate) {
	
	// Remove any spaces
	strDate = strDate.trim();
	
	// Split into parts separated with '/'
	var dateArray = strDate.split('/');  
	
	if (dateArray.length == 3) {
		if (isInteger(dateArray[0]) && isInteger(dateArray[0]) && isInteger(dateArray[0])) {
			var dd = parseInt(dateArray[0]);
			var mm = parseInt(dateArray[1]) ;
			var yyyy = parseInt(dateArray[2]);
			var listOfDays = [31,28,31,30,31,30,31,31,30,31,30,31]; 
			
			if (yyyy >= 2017 && yyyy < 3000) {
				if (mm >= 1 && mm <= 12) {
					if (dd >= 1 && dd <= listOfDays[mm-1]) {
						return new Date(yyyy,mm-1,dd);
					}
				}
			}
		}
	}
	return false;
}

/*
 * Makes sure any string has tag format [] using tagOpen, tagClose
 * 
*/
function stringToTag(tag) {
	if (tag) {
		if (tag.charAt(0) != tagOpen) 
			tag = tagOpen + tag;
		if (tag.substr(tag.length - 1) != tagClose)
			tag = tag + tagClose;
	}
	return tag;
}

/* 
 *  Inits a user in userList array
 */
function initUser(name) {
	usersList[name] = {username: name, fgColor: '', bgColor: '', tag: '', icon: ''};
}

/*
 * Add users that tipped the minimum to the Secret Show 
 */
function addTippersToShow()
{
	if (secretMin && loversList.length) {
		// Add tippers
		var out = '';
		var added = 0;
		for ( i=0; i<loversList.length; i++) {
			if (loversList[i].tokens >= secretMin) {
				if (!cb.limitCam_userHasAccess(loversList[i].name)) {
					cb.limitCam_addUsers(loversList[i].name);
					added++;
				}
			}
			else break;
		}
		if (added) {
			out = added + ' user' + ((added > 1) ? 's' : '') 
				+ ' that tipped ' + secretMin + 'tks or more ha' + ((added > 1) ? 've' : 's') 
				+ ' been added to the show';
		}
		if (out) {
			setTimeout(function(){
				cb.sendNotice(out,'',botBgColor,botTextColor,'bolder');
			}, 800);
		}
	}
}

/*
 * Send delayed notice
 * @msg: message to send
 * @target: send the notice to this target
 * @delay: delay time in miliseconds
 * @type: Type of notice: 0=Default, 1=White BG, 2=Highlighted, 3=Warning
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
 * Sends info from this commands to the user or the room:
 *	/tipmenu
 *	/showmenu
 *	/help
 *	/lovers
 * 	@name: name of the user, '' = send to the room
 */
function sendCommand(target, command, param) 
{
	var head = '';
	var outMsg = '';
	var msgBgColor = botBgColor;
	var msgWeight = botTextWeight;
		
	switch (command) 
	{
		case 'about':
			head = getIcon('bot_left') + ' About ' + botName + ' ' + getIcon('bot_right')
			outMsg += 'Version: ' + botVersion + ' (' + botDate + ')\n'
						+ 'Creator: noiett (noiett.cb@gmail.com)\n'
						+ 'Time running: ' + getTimeElapsed(botStartTime);
						/*+ '\nBot theme: ' + botTheme
						+ '\nTipMenu: ' + (useTipMenu && menuItems.length > 0 ? 'Enabled' : 'Disabled');*/
		break; 
		
		case 'modabout':
			head = getIcon('bot_left') + ' About ' + botName + ' ' + getIcon('bot_right')
			outMsg += 'Version: ' + botVersion + ' (' + botDate + ')\n'
						+ 'Creator: noiett (noiett.cb@gmail.com)\n'
						+ 'Time running: ' + getTimeElapsed(botStartTime) + '\n'		
						+ 'Enabled features: ';
			var newFeature = '';
			var featuresStr = '';			
			for (var i=0; i<botFeatures.length; i++) {
				newFeature = '';
				switch (botFeatures[i]) {
					case 'roomControl':
						if (useRoomControl) newFeature = 'Room Control';
					break;

					case 'modelFeatures':
						if (useModelFeatures) newFeature = 'Model features';
					break;	
					
					case 'chatFeatures':
						if (useChatFeatures) newFeature = 'Tags & Colors';
					break;					
					
					case 'tipMessages':
						if (useTipMessages) newFeature = 'Thanks Messages';
					break;	
					
					case 'secretShow':
						if (useSecret) newFeature = 'Secret show';
					break;		
					
					case 'whispers':
						if (useWhispers) newFeature = 'Whispers';
					break;							
					
					case 'topLovers':
						if (useLovers) newFeature = 'Top lovers';
					break;

					case 'notifiers':
						if (useNotifiers && notifiers.length > 0)
							newFeature = 'Rotating notifier';
					break;			

					case 'tipMenu':
						if (useTipMenu && menuItems.length > 0)
							newFeature = 'Tip menu';
					break;						
				}		
				if (newFeature) {
					if (featuresStr) featuresStr += ', ';
					featuresStr += newFeature;
				}
			}
			outMsg += featuresStr;
		break;
		
		case 'help':
			head = getIcon('bot_left') + ' ' + botName + ' Help ' + getIcon('bot_right');
			outMsg = publicHelp;
			if (fanHelp) outMsg += '\n' + fanHelp;
		break;
		
		case 'modhelp':
			head = getIcon('bot_left') + ' ' + botName + ' Help ' + getIcon('bot_right');
			outMsg = publicHelp;
			if (fanHelp) outMsg += '\n' + fanHelp;			
			if (modHelp) outMsg += '\n' + modHelp;		
		break;
		
		case 'modelhelp':
			head = getIcon('bot_left') + ' ' + botName + ' Model Help ' + getIcon('bot_right');
			outMsg = modelHelp;
		break;	
		
		case 'lovers':
			if (loversList.length > 0) {
				msgWeight = 'normal';
				//msgBgColor = '#FFFFFF';
				head = getIcon('lovers_left') + ' ' + ownerName + '\'s Lovers List ' + getIcon('lovers_right');
				for (var i = 0; i < loversList.length; i++){
					/* Add \n before starting a new line */
					if (i > 0) {
						outMsg += '\n';
					}	      
					/* Add a new tipper if available */
					if (i < loversList.length) {
						outMsg += '' + (i + 1) + '. ' + loversList[i].name + '  (' + loversList[i].tokens + ' tks)';
					}
					else {
						outMsg += '' + (i + 1) + '. ---------------------';
					}	    
				}
			}
			else {
				outMsg = 'No lovers yet! Tip now and become the top lover!';
			}
		break;
		
		case 'tipmenu':
		case 'showmenu':
			msgWeight = 'normal';
			head = getIcon('menu_left') + ' ' + ownerName + '\'s Tip Menu ' + getIcon('menu_right');
			for (i=0; i<menuItems.length; i++)
			{
				if (menuItems[i].tokens) {
					outMsg += '(' + menuItems[i].tokens + ')' + '  ' + menuItems[i].name;
					if (i < (menuItems.length - 1))
					{
						outMsg += '\n';
					}
				}
			}			
		break;
		
	}

	// Workaround for CB bug: this delayed notice prevents message from being broken or shown in wrong order
	// Send Command response to user
	if (head) delayedNotice(300,head,target,botHeaderBg,botHeaderFg,'bold');
	delayedNotice(600,outMsg,target,msgBgColor,botTextColor,msgWeight);
}

/*
 * Sends the lovers list to the room
 */
function announceLoversList() 
{
	var target = '';
	var msgHead = '';
	var msgRoom = '';	
	var msgBg = '#FFFFFF';
	var msgWg = 'normal';
	
	/* Build the lovers list */
	if (loversList.length > 0) {
		
		/* Add header */
		msgHead = getIcon('lovers_left') + ' ' + ownerName + '\'s Top Lovers ' + getIcon('lovers_right');	
		
		for (var i = 0; i < loversMaxItems; i++){
			/* Add \n before starting a new line */
			if (i > 0) {
			msgRoom += '\n';
			}	      
		
			/* Add a new tipper if exists */
			if (i < loversList.length) {
				msgRoom += '' + (i + 1) + '. ' + loversList[i].name + '  (' + loversList[i].tokens + ' tks)';
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
		msgRoom = 'No lovers yet! Tip now and become the top lover!';
	}

	if (msgHead) cb.sendNotice(msgHead,target,botHeaderBg,botHeaderFg,'bold');
	cb.sendNotice(msgRoom,target,botBgColor,botTextColor,msgWg);
	
	cb.setTimeout(announceLoversList, (loversListTimer * 60000));
}

/*
 * Sends the Secret Show notifier
 */
function announceSecretShow() 
{
	if (cb.limitCam_isRunning()) {
		var msg = 'Secret Show is running [ ' + getTimeElapsed(secretStartTime)
				+ ' ]. Tip ' + secretPrice + 'tks to unblock the cam!';
		
		// Random added delay -15 to +15s	
		var delay = (Math.floor(Math.random() * 30) - 10) * 1000;
		cb.log('Delay: ' + delay);
		cb.sendNotice(msg, '', botBgColor, botTextColor, 'bold');
		secretTimeout = cb.setTimeout(announceSecretShow, (secretTimer * 60000) + delay);
	}
	else {
		secretTimeout = 0;		
	}
}

/*
 * Sends the next notifier to the room
 */
function announceNotifier() 
{
	if (notifiers.length) {
		// Get next notifier
		var msg = '';
		while (!msg) {
			msg = notifiers[notifierNext - 1];
			notifierNext = (notifierNext == NOTIFIERS_MAX) ? 1 : notifierNext + 1;			
		}
		
		// Add custom icon
		if (notifierIcon) msg = notifierIcon + ' ' + msg;
		
		// Send notifier
		cb.sendNotice(msg,'',notifierBgColor,notifierColor,'bold');
		cb.setTimeout(announceNotifier, (notifierTimer * 60000));
	}
}

/*
 * Sends the tip menu to the room
 */
function announceTipMenu() {
	var msg = '';
	var hidden = false;

	if (tipMenuSingleLine) {
		msg += 'Dream Menu: ';
		for (i=0; i<menuItems.length; i++) {
			if (menuItems[i].tokens > 0 && !menuItems[i].hide) {
			if (i >= 1) {
			msg += tipMenuSepChar + ' ';
			}
			msg += menuItems[i].name + '(' + menuItems[i].tokens + ') ';
			}
			else {
				if (menuItems[i].hide) hidden = true;
			}
		}
		
		if (hidden) {
			msg += ' ' + tipMenuSepChar + ' Type /tipmenu to see the full menu!';
		}
	}
	else {
		msg = 'Tip Menu is active, use /tipmenu to see the tip menu.';
	}
	cb.sendNotice(msg,'','',tipMenuColor,'bold');
	cb.setTimeout(announceTipMenu, (tipMenuTimer * 60000));
}

/*
 *  Sets variables for special dates
 */

function setSpecialDates() {
	var currentDate = new Date();
	
	// Christmas period
	if (currentDate.getMonth() == 11 && (currentDate.getDate() > 23) && (currentDate.getDate() < 26)) {
		isChristmas = true;
	}
	
	// New Year's Eve

	// Valentine's Day
	
	// Model Birthday
}

/*
 * Builds user vars and arrays based on settings
 */
function parseSettings() 
{
	var themeObj;
	
	// Load bot theme
	if (cb.settings.bot_theme) {
		botTheme = cb.settings.bot_theme;
		themeObj = getTheme(botTheme);
		if (themeObj) {
			botTextColor = themeObj.text;
			botBgColor = themeObj.background;
			botTextWeight = themeObj.textweight;
			botHeaderFg = themeObj.headerfg;
			botHeaderBg = themeObj.headerbg;
			tipMenuColor = themeObj.tipmenu;
			notifierColor = themeObj.notifierfg;
			notifierBgColor = themeObj.notifierbg;
		}
	}		
	
	botAnnounce = (cb.settings.welcome_flag == 'Yes') ? 1 : 0;
	if (cb.settings.welcome_text) {
		botWelcome = cb.settings.welcome_text.trim();
	}
	
	showTotalTipped = (cb.settings.total_tipped == 'Yes') ? 1 : 0;
	showGender = (cb.settings.gender_icons == 'Yes') ? 1 : 0;
	safeCommands = (cb.settings.safeMode == 'Yes') ? 1 : 0;
	botCommand = (safeCommands) ? '/bot' : '/';
	
	// Model Features
	useModelFeatures = (cb.settings.model_features_flag == 'Yes') ? 1 : 0;
	if (useModelFeatures) {
		var newTag = '',
			newIcon = '',
			newColor = '',
			newBgColor = '';
		newTag = stringToTag(cb.settings.model_tittle);
		newIcon = cb.settings.model_icon;
		newColor = getTextColorCode(cb.settings.model_text_color);
		newBgColor = getHighlightColorCode(cb.settings.model_highlight);
		usersList[modelName] = {username: modelName, fgColor: newColor, bgColor: newBgColor, tag: newTag, icon: newIcon};		
	}
	
	// Chat features
	useChatFeatures = (cb.settings.room_colors_flag == 'Yes') ? 1 : 0;
	if (useChatFeatures) {
		// Colors & Icons
		chatColorsLevel = getCommandLevel(cb.settings.colors_levels);
		chatIconsLevel = getCommandLevel(cb.settings.icons_levels);
		// Tags
		chatTagsLevel = getCommandLevel(cb.settings.tags_levels);
	}
	
	// Tip Messages
	useTipMessages = (cb.settings.thanks_flag == 'Yes') ? 1 : 0;
	if (useTipMessages) {
		if (cb.settings.thanks_text) {
			tipMessageText = cb.settings.thanks_text.trim();
		}
		tipMessageTarget = cb.settings.thanks_target;
		tipMessageMin = cb.settings.thanks_min;
		
		if (cb.settings.thanks_color != 'Theme colors') {
			var tipMessageTheme = getTipMessageTheme(cb.settings.thanks_color);
			tipMessageTextColor = tipMessageTheme.code;
			tipMessageBgColor = tipMessageTheme.bgcode;
		}
		else {
			tipMessageTextColor = botTextColor;
			tipMessageBgColor = botBgColor;
		}
	}
	
	// Whispers
	useWhispers = (cb.settings.whispers_flag == 'Yes') ? 1 : 0;
	if (useWhispers) {
		whispersLevel = getCommandLevel(cb.settings.whispers_users_levels);
		whispersMods = getCommandLevel(cb.settings.whispers_mods_levels);
		whispersModel = getCommandLevel(cb.settings.whispers_model_levels);
	}
	
	// Room Control settings
	useRoomControl = (cb.settings.control_flag == 'Yes') ? 1 : 0;
	if (useRoomControl) {
		if (cb.settings.control_mods) {
			controlMods = (cb.settings.control_mods == 'Yes') ? 1 : 0;
		}
		if (cb.settings.control_greys) {
			controlGreys = (cb.settings.control_greys == 'Yes') ? 1 : 0;
		}					
		controlAutoSilence = (cb.settings.control_silence == 'Greys only') ? 1 : 0;
		if (controlAutoSilence) {
			controlMaxWarnings = cb.settings.control_maxwarns;
		}
		controlItems[0].level = getControlLevel(cb.settings.control_sticky);
		controlItems[1].level = getControlLevel(cb.settings.control_caps);
		controlItems[2].level = getControlLevel(cb.settings.control_baby);
		controlItems[3].level = getControlLevel(cb.settings.control_demands);
		controlItems[4].level = getControlLevel(cb.settings.control_demands);
		controlItems[5].level = getControlLevel(cb.settings.control_demands);
		controlItems[6].level = getControlLevel(cb.settings.control_demands);
		controlItems[7].level = getControlLevel(cb.settings.control_demands);		
		controlItems[8].level = getControlLevel(cb.settings.control_demands);
		controlItems[9].level = getControlLevel(cb.settings.control_demands);		
		controlItems[10].level = getControlLevel(cb.settings.control_rudeness);
		controlItems[11].level = getControlLevel(cb.settings.control_rudeness);	
		controlItems[12].level = getControlLevel(cb.settings.control_rudeness);			
		controlItems[13].level = (cb.settings.control_grey_graphics == 'All graphics' ? 0 : 2);
		controlGreysEmotes = (cb.settings.control_grey_graphics == 'All graphics' 
								|| cb.settings.control_grey_graphics == 'Standard emotes only');
								
		cb.settings.control_words = (cb.settings.control_words.toLowerCase()).trim();
		
		if (cb.settings.control_words.length > 0) {
			controlWordsList = cb.settings.control_words.split(',');
			// If not empty let's snap into action
			if (controlWordsList) {
				// Create string regexp
				var strRegexp = '(';
				for (i=0; i<controlWordsList.length; i++) {
					controlWordsList[i] = controlWordsList[i].trim();
					// Ignore empty
					if (controlWordsList[i]) {
						if (i>0) strRegexp += '|';
						strRegexp += '(?=.*' + controlWordsList[i] + ')';
					}
				}
				strRegexp += ')';
				
				// Create regexp variable
				var re = new RegExp(strRegexp, "i");
				var strLevel = cb.settings.control_words_flag;
				strLevel = strLevel.replace(' (Skip next setting)','');
				
				// Add new line in controlItems Array
				controlItems.push({
					reason: 'Ilegal words', 
					level: getControlLevel(strLevel), 
					regexp: re
					})
			}
		}
	}

	// Secret Show settings
	useSecret = (cb.settings.secret_flag == 'Yes') ? 1 : 0;
	if (useSecret) {
		secretModsViewers = (cb.settings.secret_mods_viewers == 'Yes') ? 1 : 0;	
		secretPrice = cb.settings.secret_price;
		secretMessage = 'Secret Show in progress! Tip ' + secretPrice + ' To Join!';
		secretMin = cb.settings.secret_min;
		secretTimer = cb.settings.secret_timer;
		secretAutoclean = (cb.settings.secret_autoclean == 'Yes') ? 1 : 0;
	}
	
	// Leaderboard My Top Lovers settings
	useLovers = (cb.settings.show_lb == 'Yes') ? 1 : 0;
	if (useLovers) {
		loversListTimer = cb.settings.timer_lb;
		loversHearts = (cb.settings.hearts_lb == 'Yes') ? 1 : 0;
		loversAnnounce = (cb.settings.announce_lb == 'Yes') ? 1 : 0;
		loversIcon = getHeartsIcon(cb.settings.icons_lb);	
		if (isChristmas) {
			BOT_ICONS['lovers_left'] = ':mtlsanta2';
			BOT_ICONS['lovers_right'] = ':mtlsanta';		
		}
		if (!loversIcon) loversIcon = ':001h';	
	}

	// Rotating notifiers settings
	useNotifiers = (cb.settings.show_ad == 'Yes') ? 1 : 0;	
	if (useNotifiers) {
		var count = 0;
		for (i=0; i<NOTIFIERS_MAX; i++) {
			if (cb.settings['text_ad'+(i+1)].trim()) {
				notifiers.push(cb.settings['text_ad'+(i+1)].trim());
				count++;
			}
		}
		if (!count) useNotifiers = false;
		if (cb.settings.color_ad) {
			if (cb.settings.color_ad != 'Theme colors') notifierColor = getColorCode(cb.settings.color_ad);
		}	
		if (cb.settings.bgcolor_ad == 'Yes') {
			if (cb.settings.color_ad != 'Theme colors') notifierBgColor = getBgColorCode(cb.settings.color_ad);
		}
		else {
			notifierBgColor = '';
		}
		notifierIcon = getIcon('notifier');
		notifierTimer = cb.settings.timer_ad;
	}
	
	// TipMenu settings
	useTipMenu = (cb.settings.show_tm == 'Yes') ? 1 : 0;
	if (useTipMenu) {
		var out = '';
		
		// Add custom items
		for (var i=0; i<TIPMENU_CUSTOM_ITEMS; i++) {
			if (cb.settings['custom_menu_item'+(i+1)]) {
				var itemArray = cb.settings['custom_menu_item'+(i+1)].trim().split('--');
				if (itemArray.length == 2) {
					itemArray[0] = itemArray[0].trim();
					itemArray[1] = itemArray[1].trim();
					if (itemArray[0] && itemArray[1]) {
						if (isInteger(itemArray[0]) && itemArray[0] > 0) {
							menuItems.push({
								name: itemArray[1],
								tokens: itemArray[0],
								field: 'custom_menu_item'+(i+1),
								hide: false
							});					
						}
						else if (isInteger(itemArray[1]) && itemArray[1] > 0) {
							menuItems.push({
								name: itemArray[0],
								tokens: itemArray[1],
								field: 'custom_menu_item'+(i+1),
								hide: false
							});							
						}
						else {
							if (out) out += '\n';
							out += 'TipMenu: Price for item #' + (i+1) + ' is not an integer and cannot be loaded.';		
						}					
					
					}
					else {
						if (out) out += '\n';
						out += 'TipMenu: Price or description in item #' + (i+1) + ' is empty and cannot be loaded.';						
					}
				}
				else {
					if (out) out += '\n';
					out += 'TipMenu: Item #' + (i+1) + ' is not correct and cannot be loaded.';											
				}
			}
		}
		
		// Send errors
		if (out) delayedNotice(2000,out,modelName,'', botWarnColor,'bold');		
		
		// Sort if needed
		if (cb.settings.tipmenu_sort != 'Do not sort') {
			// Sort the array
			menuItems.sort(function(a, b) {
				if (cb.settings.tipmenu_sort == 'Descending') {
					return b.tokens - a.tokens;
				}
				else {
					return a.tokens - b.tokens;
				}
			});	 
		}
		
		tipMenuSingleLine = (cb.settings.single_tm == 'Yes') ? 1 : 0;
		if (cb.settings.sepchar == 'Theme separator') {
			tipMenuSepChar = themeObj.sepChar;
		}
		else {
			tipMenuSepChar = SEP_CHARS[ cb.settings.sepchar ];
		}
		tipMenuTimer = cb.settings.timer_tm;
		
		if (cb.settings.color_tm) {
			if (cb.settings.color_tm != 'Theme colors') tipMenuColor = getColorCode(cb.settings.color_tm);
		}
	}	
	
	// Disable tipmenu with no items loaded
	useTipMenu = menuItems.length ? true : false;
	
	// Update Commands array with settings
	var featuresList = [];
	for (var i=0; i<commandsList.length; i++) {
		
		var initLevel = commandsList[i].level;
		commandsList[i].level = 5;
		
		switch (commandsList[i].name) 
		{
			case 'lovers':
				commandsList[i].level = useLovers ? 0 : 5;
			break;
			
			case 'tipmenu':
				commandsList[i].level = useTipMenu ? 0 : 5;
			break;

			case 'showmenu':
				commandsList[i].level = useTipMenu ? 3 : 5;
			break;
			
			case 'color':
			case 'bgcolor':
				commandsList[i].level = useChatFeatures ? chatColorsLevel : 5;
				featuresList.push(commandsList[i].name);
			break;
			
			case 'tag':
				commandsList[i].level = useChatFeatures ? chatTagsLevel : 5;
				featuresList.push(commandsList[i].name);
			break;
			
			case 'icon':
				commandsList[i].level = useChatFeatures ? chatIconsLevel : 5;
				featuresList.push(commandsList[i].name);
			break;
			
			case 'remove':
				commandsList[i].level = useChatFeatures ? 
					 Math.min( Math.min(chatColorsLevel, chatTagsLevel), chatIconsLevel)
					 : 5;
				commandsList[i].help = 'Removes one feature: ' + featuresList.join(", ");
			break;

			case 'w':
			case 'r':				
				if (commandsList[i].name == 'r') {
					commandsList[i].level = useWhispers ? Math.min(whispersLevel, whispersMods) : 5;
				}
				else {
					commandsList[i].level = useWhispers ? whispersLevel : 5;
				}
			break;
			
			case 'wb':
				commandsList[i].level = useWhispers ? whispersModel : 5;
			break;

			case 'wm':
				commandsList[i].level = useWhispers ? whispersMods : 5;
			break;
			
			case 'set':
				commandsList[i].level = useChatFeatures ? 3 : 5;
			break;
			
			case 'uset':
				commandsList[i].level = (useChatFeatures) ? 3 : 5;
				commandsList[i].help = 'Removes one feature: ' + featuresList.join(", ");
			break;
			
			case 'filters':
			case 'greys':
				commandsList[i].level = useRoomControl ? 4 : 5;
			break;	
			
			case 'silence':
			case 'usilence':
				if (useRoomControl) {
					commandsList[i].level = controlMods ? 3 : 4;
				}
				else {
					commandsList[i].level = 5;
				}
			break;
			
			case 'secret':
				commandsList[i].level = useSecret ? 
					(secretModsViewers ? 3 : 4)
					: 5;			
			break;
			
			case 'start':
			case 'stop':
				commandsList[i].level = useSecret ? 4 : 5;
			break;
			
			default:
				// Keep the original value
				commandsList[i].level = initLevel;
			break;
		}
	}
	
	// Create Users and model help
	var prefix = safeCommands ? botCommand + ' ' : botCommand;
	
	for (var i=0; i<commandsList.length; i++) {
		if (commandsList[i].level <= 1) {
			// General help commands
			if (publicHelp) publicHelp += '\n';
			publicHelp += prefix + commandsList[i].name
				+ (commandsList[i].option ? ' ' + commandsList[i].option : '')
				+ (commandsList[i].params ? ' ' + commandsList[i].params : '')
				+ ' ' + ARROW + (commandsList[i].help ? ' ' + commandsList[i].help : '');
		}
		else if (commandsList[i].level == 2) {
			// Fan club only commands
			if (fanHelp) {
				fanHelp += '\n';
			}
			else {
				fanHelp = '--( Fan Club Commands )--------------------\n';
			}
			fanHelp += prefix + commandsList[i].name
				+ (commandsList[i].option ? ' ' + commandsList[i].option : '')
				+ (commandsList[i].params ? ' ' + commandsList[i].params : '')
				+ ' ' + ARROW + (commandsList[i].help ? ' ' + commandsList[i].help : '');		
		}
		else if (commandsList[i].level == 3) {
			// Mods only commands
			if (modHelp) {
				modHelp += '\n';
			}
			else {
				modHelp = '--( Mod Commands )---------------------------\n';
			}
			modHelp += prefix + commandsList[i].name
				+ (commandsList[i].option ? ' ' + commandsList[i].option : '')
				+ (commandsList[i].params ? ' ' + commandsList[i].params : '')
				+ ' ' + ARROW + (commandsList[i].help ? ' ' + commandsList[i].help : '');		
		}
		else if (commandsList[i].level == 4) {
			// Model only commands
			if (modelHelp) modelHelp += '\n';
			modelHelp += prefix + commandsList[i].name
				+ (commandsList[i].option ? ' ' + commandsList[i].option : '')
				+ (commandsList[i].params ? ' ' + commandsList[i].params : '')
				+ ' ' + ARROW + (commandsList[i].help ? ' ' + commandsList[i].help : '');		
		}		
	}	
}

/*
 * Loads custom options in settings
 */
function buildSettings() 
{
	cb.settings_choices.push({
		name: 'bot_theme', 
		type:'choice', 
		label:'Bot color theme', 
		defaultValue: defaultSettings.botTheme		
	});
	cb.settings_choices.push({
		name: 'welcome_flag', 
		type: 'choice', 
		choice1: 'Yes', 
		choice2: 'No (Skip next setting)', 
		defaultValue: 'Yes', 
		label: 'Show welcome message to users joining the room'	
	});		
	cb.settings_choices.push({
		name: 'welcome_text',
		type: 'str',
		minLength: 0,
		maxLength: 240,
		required: false,
		defaultValue: 'Welcome [user] to my room! :mwink',
		label: 'Welcome message (type [user] for username)'		
	});
	cb.settings_choices.push({
		name: 'total_tipped', 
		type: 'choice', 
		choice1: 'Yes', 
		choice2: 'No', 
		defaultValue: defaultSettings.totalTipped, 
		label: 'Display total tipped before every message'		
	});
	cb.settings_choices.push({
		name: 'gender_icons', 
		type: 'choice', 
		choice1: 'Yes', 
		choice2: 'No', 		
		defaultValue: defaultSettings.genderIcon,
		label: 'Display gender icon'	
	});		

	// Load settings from botFeatures
	for (var z=0; z<botFeatures.length; z++) {
		switch (botFeatures[z])
		{
			case 'modelFeatures':
				cb.settings_choices.push({
					name: 'model_features_flag', 
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No (Skip to next section)', 
					defaultValue: defaultSettings.modelFeatures,
					label: '........................................ ( x ) [ Enable Model Tags & Colors ]'					
				});		
				cb.settings_choices.push({
					name: 'model_text_color',
					type: 'choice',
					defaultValue: defaultSettings.ownerColor, 
					label: 'Your text color',			
				});
				cb.settings_choices.push({
					name: 'model_highlight',
					type: 'choice', 
					defaultValue: defaultSettings.ownerHighlight, 
					label: 'Your highlight color'
				});	
				cb.settings_choices.push({
					name: 'model_tittle',
					type: 'str',
					minLength: 0,
					maxLength: TAGS_MAX_LENGTH,
					required: false, 			     
					defaultValue: defaultSettings.ownerTag, 
					label: 'Your default tag (e.g. Queen)',
				});		
				cb.settings_choices.push({
					name: 'model_icon',
					type: 'str',
					minLength: 0,
					maxLength: 30,
					required: false, 			     
					defaultValue: defaultSettings.ownerIcon,
					label: 'Your icon/avatar (default is ' + defaultSettings.ownerIcon + ')',
				});				
			break;
			
			case 'chatFeatures':
				cb.settings_choices.push({
					name: 'room_colors_flag', 
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No (Skip to next section)', 
					defaultValue: defaultSettings.chatFeatures,
					label: '.......................................... ( x ) [ Enable Users Tags & Colors ]'					
				});
				cb.settings_choices.push({
					name: 'colors_levels', 
					type: 'choice', 
					defaultValue: 'Mods and Fan Club', 
					label: 'Who can set their custom text & BG color?'					
				});	
				cb.settings_choices.push({
					name: 'tags_levels', 
					type: 'choice', 
					defaultValue: 'Mods and Fan Club', 
					label: 'Who can set their custom tag?'					
				});	
				cb.settings_choices.push({
					name: 'icons_levels', 
					type: 'choice', 
					defaultValue: 'Mods and Fan Club', 
					label: 'Who can set their custom icon/avatar?'					
				});		
			break;
			
			case 'tipMessages':
				cb.settings_choices.push({
					name: 'thanks_flag', 
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No (Skip to next section)', 
					defaultValue: defaultSettings.tipMessages,
					label: '..................................................... ( x ) [ Enable Thanks Messages ]'					
				});
				cb.settings_choices.push({
					name: 'thanks_text',
					type: 'str',
					minLength: 0,
					maxLength: 64,
					required: false,
					defaultValue: 'Thank you [user] for your tip! :dbthanks35',
					label: 'Thanks message to show when someone tips'					
				});
				cb.settings_choices.push({
					name: 'thanks_target', 
					type: 'choice', 
					choice1: 'Everyone', 
					choice2: 'The tipper only', 
					defaultValue: defaultSettings.tipMessages,
					label: 'Who can see the thanks message?'					
				});				
				cb.settings_choices.push({
					name: 'thanks_min', 
					type:'int', 
					minValue: 1, 
					maxValue: 1000, 
					defaultValue: 15, 
					label: 'Minimum tipped to display message'					
				});
				cb.settings_choices.push({	
					name: 'thanks_color', 
					type:'choice', 
					label:'Color scheme', 
					defaultValue: 'Yellow & Black',
				});	
			break;

			case 'whispers':
				cb.settings_choices.push({
					name: 'whispers_flag', 
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No (Skip to next section)', 
					defaultValue: defaultSettings.whispers,
					label: '............................................................... ( x ) [ Enable Whispers ]'					
				});
				cb.settings_choices.push({
					name: 'whispers_users_levels', 
					type: 'choice', 
					defaultValue: 'Mods and Fan Club', 
					label: 'Who can use whispers?'					
				});
				cb.settings_choices.push({
					name: 'whispers_mods_levels', 
					type: 'choice', 
					defaultValue: 'Moderators only',
					label: 'Who can send whispers to all mods?'					
				});					
				cb.settings_choices.push({
					name: 'whispers_model_levels', 
					type: 'choice', 
					defaultValue: 'Mods and Fan Club',
					label: 'Who can send whispers to the broadcaster?'					
				});	
			break;
						
			case 'roomControl':
				cb.settings_choices.push({
					name: 'control_flag', 
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No (Skip to next section)', 
					defaultValue: defaultSettings.roomControl,
					label: '.................................................... ( x ) [ Enable Room Control ]'					
				});
				cb.settings_choices.push({
					name: 'control_mods', 
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No', 
					defaultValue: 'Yes', 
					label: 'Allow mods to use commands (e.g. /silence)'					
				});	
				cb.settings_choices.push({
					name: 'control_greys', 
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No', 
					defaultValue: defaultSettings.roomGreys,
					label: 'Allow grey users to chat'					
				});					
				cb.settings_choices.push({
					name: 'control_grey_graphics', 
					type: 'choice', 
					choice1: 'All graphics', 
					choice2: 'Standard emotes only', 		
					choice3: 'No graphics', 	
					defaultValue: 'Standard emotes only', 
					label: 'Graphics allowed for grey users'					
				});						
				cb.settings_choices.push({
					name: 'control_sticky', 
					type: 'choice', 
					choice1: 'Everyone', 
					choice2: 'Greys only', 
					choice3: 'No', 
					defaultValue: 'Greys only', 
					label: 'Correct sticky keys (e.g. hellooooo)'					
				});	
				cb.settings_choices.push({
					name: 'control_caps', 
					type: 'choice', 
					choice1: 'Everyone', 
					choice2: 'Greys only', 
					choice3: 'No', 
					defaultValue: 'Everyone', 
					label: 'Convert ALL CAPS to lowercase'					
				});
				cb.settings_choices.push({
					name: 'control_baby', 
					type: 'choice', 
					choice1: 'Everyone', 
					choice2: 'Greys only', 
					choice3: 'No', 
					defaultValue: 'Greys only', 
					label: 'Remove baby words (e.g. bb, baby)'					
				});					
				cb.settings_choices.push({
					name: 'control_rudeness', 
					type: 'choice', 
					choice1: 'Greys only', 
					choice2: 'No', 	
					defaultValue: 'Greys only', 
					label: 'Block messages containing rudeness (e.g. bitch, slut)'					
				});
				cb.settings_choices.push({
					name: 'control_demands', 
					type: 'choice', 
					choice1: 'Greys only', 
					choice2: 'No', 	
					defaultValue: 'Greys only', 
					label: 'Block messages containing demands'					
				});	
				cb.settings_choices.push({
					name: 'control_words_flag', 
					type: 'choice', 
					choice1: 'Everyone', 
					choice2: 'Greys only', 
					choice3: 'No (Skip next setting)', 
					defaultValue: 'Greys only', 
					label: 'Block messages with custom ilegal words (type below)'					
				});
				cb.settings_choices.push({
					name: 'control_words',
					type: 'str',
					minLength: 0,
					maxLength: 1024,
					required: false,
					defaultValue: '',
					label: 'Custom ilegal words/expressions, separated by commas'					
				});	
				cb.settings_choices.push({
					name: 'control_silence', 
					type: 'choice', 
					choice1: 'Greys only', 
					choice2: 'No (Skip next setting) ', 
					defaultValue: 'Greys only', 
					label: 'Silence rude/demanding users permanently'					
				});
				cb.settings_choices.push({
					name: 'control_maxwarns', 
					type: 'choice',
					choice1: 0,		
					choice2: 1,
					choice3: 2,
					choice4: 3,
					choice5: 4,
					defaultValue: 2, 
					label: 'Warnings before silencing them?'					
				});					
			break;

			case 'topLovers':
				cb.settings_choices.push({
					name: 'show_lb', 
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No (Skip to next section)', 
					defaultValue: defaultSettings.topLovers,
					label: '................................... ( x ) [ Enable Top Lovers Leaderboard ]'					
				});
				cb.settings_choices.push({
					name: 'hearts_lb', 
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No (Skip next setting)', 
					defaultValue: 'Yes', 
					label: 'Display hearts before Top Lover\'s messages'					
				});
				cb.settings_choices.push({
					name: 'icons_lb', 
					type: 'choice', 
					label: 'Hearts color',
					choice1: 'Fuchsia', 
					choice2: 'Pink', 
					choice3: 'Purple', 
					choice4: 'Red', 		
					defaultValue: defaultSettings.loversIcon					
				});
				cb.settings_choices.push({
					name: 'announce_lb', 
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No', 
					defaultValue: 'Yes', 
					label: 'Announce new Top Lover'				
				});
				cb.settings_choices.push({
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
					choice11: 30,		
					defaultValue: defaultSettings.loversTimer, 
					label: 'Top Lovers Display frequency (mins)'					
				});
			break;
			
			case 'secretShow':
				cb.settings_choices.push({
					name: 'secret_flag', 
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No (Skip to next section)', 
					defaultValue: defaultSettings.secretShow,
					label: '....................................................... ( x ) [ Enable Secret Show ]'					
				});		
				cb.settings_choices.push({
					name: 'secret_mods_viewers', 
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No', 
					defaultValue: defaultSettings.secretModsViewers, 
					label: 'Allow mods to add/remove viewers'					
				});
				cb.settings_choices.push({
					name: 'secret_price', 
					type:'int', 
					minValue: 1, 
					maxValue: 999, 
					defaultValue: defaultSettings.secretPrice,
					label: 'Default price'
				});
				cb.settings_choices.push({
					name: 'secret_min', 
					type:'int', 
					minValue: 0, 
					maxValue: 999, 
					defaultValue: defaultSettings.secretMinTip, 
					label: 'Minimum tipped to have access to all shows (0=disabled)'  
				});
				cb.settings_choices.push({
					name: 'secret_timer', 
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
					choice11: 30,		
					defaultValue: 3, 
					label: 'Announcement frequency (mins)'					
				});
				cb.settings_choices.push({
					name: 'secret_autoclean', 
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No', 
					defaultValue: 'Yes', 
					label: 'Clear the viewers list when the show is over'					
				});
			break;
			
			case 'notifiers':
				cb.settings_choices.push({	
					name: 'show_ad', 
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No (Skip to next section)', 
					defaultValue: defaultSettings.notifiers,
					label: '............................................. ( x ) [ Enable Rotating Notifiers ]'
				});	
				// Texts
				for (var i=0; i<NOTIFIERS_MAX; i++) {
					cb.settings_choices.push({
						name: 'text_ad'+(i+1), 
						type: 'str', 
						minLength: 0,
						maxLength: 512,			
						required: false, 
						label: 'Notifier #'+(i+1),
					});
				}
				cb.settings_choices.push({	
					name: 'color_ad', 
					type:'choice', 
					label:'Color scheme', 
					defaultValue: defaultSettings.notifiersColor
				});	
				cb.settings_choices.push({	
					name: 'bgcolor_ad', 
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No', 
					defaultValue: defaultSettings.notifiersBg, 
					label: 'Colored background?'
				});	
				cb.settings_choices.push({	
					name: 'timer_ad', 
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
					choice11: 30,		
					defaultValue: defaultSettings.notifiersTimer, 
					label: 'Display frequency (mins)'
				});					
			break;
			
			case 'tipMenu':
				cb.settings_choices.push({
					name: 'show_tm', 
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No (Skip to next section)', 
					defaultValue: defaultSettings.tipMenu,
					label: '............................................................ ( x ) [ Enable Tip Menu ]'					
				});
				cb.settings_choices.push({
					name: 'single_tm', 
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No (Skip next setting)', 
					defaultValue: defaultSettings.tipMenuSingle, 
					label: 'Announce it periodically'	
				});	
				cb.settings_choices.push({
					name: 'sepchar', 
					type: 'choice', 
					defaultValue: defaultSettings.tipMenuSep, 
					label: 'Separator character'	
				});				
				cb.settings_choices.push({
					name: 'color_tm', 
					type:'choice', 
					label:'Color scheme', 
					defaultValue: defaultSettings.tipMenuColor	
				});	
				cb.settings_choices.push({
					name: 'tipmenu_sort', 
					type: 'choice', 
					choice1: 'Do not sort', 
					choice2: 'Ascending', 
					choice3: 'Descending', 					
					defaultValue: 'Ascending', 
					label: 'Sort menu items by price'	
				});					
				cb.settings_choices.push({
					name: 'timer_tm', 
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
					choice11: 30,		
					defaultValue: defaultSettings.tipMenuTimer, 
					label: 'Display frequency (mins)'		
				});					

				for (var i=0; i<TIPMENU_CUSTOM_ITEMS; i++) {
					var strLabel = 'Item #' + (i+1);
					
					if (i==0) strLabel += ' (e.g. 50--Boobs)';
					cb.settings_choices.push({
						name: 'custom_menu_item' + (i+1),
						type: 'str', 
						minLength: 0,
						maxLength: 128,
						required: false,		
						defaultValue: '', 
						label: strLabel,
					});
				}
			break;
		}
	}

	// Modifications: Numbers in sections, theme list, color lists, etc
	var str = '';
	var a = 1;
	var removeOptions = [];
	
	for (i=0; i<cb.settings_choices.length; i++) {
		str = cb.settings_choices[i].label;
		field = cb.settings_choices[i].name;
		
		// Add numbers to sections and update options
		if (str.indexOf('( x )') > 0) {
			str = str.replace('( x )', '( ' + a + ' )');
			cb.settings_choices[i].label = str;
			a++;
			// Update option2 but not in Secret Show
			if (str.indexOf('Tip Menu') < 0) {
				cb.settings_choices[i].choice2 = 'No (Skip to section ' + a + ')';
			}
			else {
				cb.settings_choices[i].choice2 = 'No (Skip this section)';
			}
			str = 'No (Skip to next section)';
		}
		// Add themes to theme option
		else if (field == 'bot_theme') {
			var customCount = 0;

			// Add custom themes
			for (var b=0; b<CUSTOM_THEMES.length; b++) {
				customCount++;
				cb.settings_choices[i]['choice' + (customCount)] = CUSTOM_THEMES[b].name;
			}	
			
			// Add bot themes
			for (var b=0; b<BOT_THEMES.length; b++) {
				customCount++;
				cb.settings_choices[i]['choice' + (customCount)] = BOT_THEMES[b].name;
			}			
		}
		// Add thanks themes
		else if (field == 'thanks_color') {
			var customCount = 0;
			
			// Add theme color option
			cb.settings_choices[i]['choice1'] = 'Theme colors';
			customCount++;
			
			for (var b=0; b<THANKS_COLORS.length; b++) {
				cb.settings_choices[i]['choice' + (customCount+1)] = THANKS_COLORS[b].name;
				customCount++;
			}				
		}		
		// Add colors and custom colors to Scheme options
		else if (str == 'Color scheme' || str == 'Bot color scheme') {
			var customCount = 0;
			
			// Add theme color option
			cb.settings_choices[i]['choice1'] = 'Theme colors';
			customCount++;
				
			// Add custom colors
			for (var b=0; b<CUSTOM_COLORS.length; b++) {
				cb.settings_choices[i]['choice' + (b+1+customCount)] = CUSTOM_COLORS[b].name;
				customCount++;
			}		
		
			// Add bot colors
			for (var c=0; c<COLORS.length; c++) {
				cb.settings_choices[i]['choice' + (c+1+customCount)] = COLORS[c].name;
			}
		}
		// Add text colors
		else if ((field == 'model_text_color') || (field.indexOf('crew_color_') != -1)) {
			var customCount = 0;
			
			// Add bot colors
			for (var c=0; c<TEXT_COLORS.length; c++) {
				cb.settings_choices[i]['choice' + (c+1+customCount)] = TEXT_COLORS[c].name;
			}			
		}
		// Add highlight colors
		else if (field == 'model_highlight' || field == 'crew_highlight') {
			var customCount = 0;
			
			// Add bot colors
			for (var c=0; c<HIGHLIGHT_COLORS.length; c++) {
				cb.settings_choices[i]['choice' + (c+1+customCount)] = HIGHLIGHT_COLORS[c].name;
			}			
		}
		// Add command commandLevels
		else if ((field.indexOf('_level') != -1)) {
			var customCount = 0;

			for (var cl=0; cl<commandLevels.length; cl++) {
				cb.settings_choices[i]['choice' + (cl+1+customCount)] = commandLevels[cl];
			} 
		}
		// Add tip menu icons
		else if ((field == 'sepchar')) {
			var customCount = 0;
			
			// Add theme custom sepchar
			customCount++;
			cb.settings_choices[i]['choice' + customCount] = 'Theme separator';
		
			// Add bot sepchars
			for (var obj in SEP_CHARS) {
				customCount ++;
				cb.settings_choices[i]['choice' + customCount] = obj;
			}
		}
	}
}

/*
 * Setting up the bot at start
 */
function init()
{
	setStringVars();
	setSpecialDates();

	// Set new params for friends
	vipRooms();
	
	// Add custom options to settings
	buildSettings();

	//Load user's settings values into global variables
	parseSettings();

	// Start TipMenu
	if (useTipMenu) cb.setTimeout(announceTipMenu, (20000));
	
	// Start notifier
	if (useNotifiers) {
		cb.setTimeout(announceNotifier, (notifierTimer * 40000));
	}
	
	// Start Lovers list
	if (useLovers) cb.setTimeout(announceLoversList, (loversListTimer * 70000));
	
	// Loaded message
	var theHeader = getIcon('bot_left') + ' ' + botName + ' v' + botVersion + ' ' + getIcon('bot_right');
	var loadText = 'Built by noiett (' + botDate + ')\n'
			+ 'Type /help to see all user commands.\n'
			+ 'Type /ahelp to see all model commands.';	
	delayedNotice(botNoticeDelay,theHeader,'',botHeaderBg,botHeaderFg,'bold');
	delayedNotice(botNoticeDelay+200,loadText,'','',botTextColor,'bold');
	botStartTime = new Date();
}

init();
