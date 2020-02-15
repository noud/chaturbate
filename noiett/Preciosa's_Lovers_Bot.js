// http://www.rlc-cams.com/apps/user_uploads/2/noiett/
// http://www.rlc-cams.com/apps/sourcecode/preciosas-lovers-bot/?version=&slot=2

/*  
 * 	Title: Preciosa's Lovers Bot
 * 	Author: noiett
 * 		Email: noiett.cb@gmail.com
 * 		Twitter: @biosandapps
 * 	Version: 3.4.1 Apr 10, 2018
 * 	Description: Bot for PreciosaX's room
 * 
 * 	This bot uses modified code and ideas from these apps, so some credit to the author:
 * 		- Tip Menu - Single Line (badbadbubba)
 * 		- No Grey Demands Graphics (badbadbubba)
 * 	
 * 	Main features:
 * 		
 * 		1. Leaderboard 'My Top Lovers' with improved features:
 * 			- Full lovers list available with command /lovers
 * 			- Top 3 lovers get a heart in their messages showing their position
 * 			- The bot makes an announcement when a user reaches the 1st position
 * 
 * 		2. Rotating notifier
 * 
 * 		3. Tip Menu Single Line enhanced
 * 			- Full tip menu available with command /tipmenu
 * 			- Customizable appearance
 * 			- Items are set in bot code and can be hidden (not announced).
 * 
 * 		4. Room control
 * 			- Corrects sticky keys, all caps and baby words in messages.
 * 			- Blocks demands and rudeness (English + Spanish) and graphics.
 * 			- Features can be set for Greys only or everyone (or disabled).
 * 			- Auto-silence users infringing the rules repeatedly.
 * 			- List of custom words and expressions to block.
 * 
 * 		5. Secret Show
 * 			- Start/stop a secret show any time using commands.
 * 			- Set a default price for Secret Show or a custom one passing a parameter.
 * 			- Add/remove/list viewers any time.
 * 			- Set a minimum tipped to be added to all secret shows automatically.
 * 
 * 		6. Custom Crew
 * 			- Configure different categories/lists/teams for your users.
 * 			- Users in each list can have a custom icon, tag and text color in chat.
 * 			- Set an amount to tip to be automatically added to a category.
 * 			- Use a custom command to manage your lists and users.
 * 
 * 	What's new since version v3.0:
 * 
 *		- Customizable color themes
 * 		- Added Room Colors & Tags section
 * 		- Added optional gender icons
 * 		- Added settings to change the custom family announcement message (when joining the room)
 * 		- Custom icons can be now changed with commands /icon and /set icon
 * 		- Added custom color system (custom colors can be added and used everywhere)
 * 		- Custom names with expiry dates
 * 		- Added custom command to list the custom names and family categories
 * 		- Added custom names in the family feature (similar to lists but only 1 user per name)
 * 		- Bot icons can now be customized for each room in a simple way
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
var BOT_THEMES = [
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
			menu_left: ':dbmoongold',
			menu_right: ':dbmoongold',
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
];

var COLORS = [
	{name: 'Amaranth', 	code: '#c92572',	bgcode: '#f9eaf1'},	
	{name: 'Black',		code: '#000000',	bgcode: '#e8e8e8'},
	{name: 'Blue', 		code: '#016ea6',	bgcode: '#e3eff6'},	
	{name: 'LightBlue', 	code: '#4682b4',	bgcode: '#e5f0f9'},	
	{name: 'SteelBlue',	code: '#4159b5',	bgcode: '#e7ebfb'},
	{name: 'DarkBlue', 	code: '#364785',	bgcode: '#e4e9f9'},
	{name: 'DarkBrown', 	code: '#4c0017',	bgcode: '#ede0e4'},
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

var 	BOT_ICONS = [];
	BOT_ICONS['bot_left'] = ':mtlstar';
	BOT_ICONS['bot_right'] = ':mtlstar';
	BOT_ICONS['menu_left'] = ':mtlstar';
	BOT_ICONS['menu_right'] = ':mtlstar';	
	BOT_ICONS['room_info'] = ':mtlstar';
	BOT_ICONS['secret_left'] = ':mtlcamleft';
	BOT_ICONS['secret_right'] = ':mtlcamright';
	BOT_ICONS['crew_left'] = ':mtlcrew';
	BOT_ICONS['crew_right'] = ':mtlcrew';
	BOT_ICONS['crew_join'] = ':mtljoin';
	BOT_ICONS['crew_part'] = ':mtlleft2';	
	BOT_ICONS['lovers_left'] = ':mtlpheart';
	BOT_ICONS['lovers_right'] = ':mtlpheart2';

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
	SEP_CHARS['Text Heart'] = HEART;
	SEP_CHARS['Text Diamond'] = BDIAMOND;
	SEP_CHARS['Text Star'] = BSTAR;
	SEP_CHARS['Vertical Bar'] = '|';

/* -----------------------------------------------------------------
 * Constants and Variables to set up the custom bot for the model
 * -----------------------------------------------------------------
*/ 

var 	CUSTOM_COLORS = [];

var CUSTOM_THEMES = [
	{
		name: 'Preciosa\'s Theme',
		headerbg: '#800080',
		headerfg: '#ffffff',
		text: '#800080',
		background: '#f1e4f1',
		textweight: 'normal',
		tipmenu: '#FF00BA', // '#6f6f6f',
		notifierfg: '#800080',
		notifierbg: '#f1e4f1',
		themeIcons: {
		},
		sepChar: ':pixelglitter',
	}
];

var	TIPMENU_CUSTOM_ITEMS = 3;
var NOTIFIERS_MAX = 6;

var botName = 'Preciosa\'s Lovers';
var ownerName = 'Preciosa';
var ownerRoom = 'preciosax';
var ownerBgColor = '';
var ownerIcon = ':icon_crown';
		
// Features loaded to settings
var botFeatures = [
//	'tipMessages',
	'roomColors',
	'whispers',
	'roomControl',
//	'customCrew',
	'topLovers',
	'secretShow',
	'notifiers',
	'tipMenu'
];

var defaultSettings = {
	botTheme: 'Preciosa\'s Theme',
	totalTipped: 'No',
	genderIcon: 'No',
	tipMessages: 'Yes',
	whispers: 'Yes',
	roomControl: 'Yes',
	customCrew: 'Yes',
	ownerColor: 'Pink',
	ownerName: 'Preciosa',
	ownerTag: '',
	ownerIcon: ':icon_crown',
	ownerHighlight: 'Pink',
	crewHighlight: 'Gray',
	crewExpireTime: 0,
	topLovers: 'Yes',
	loversIcon: 'Fuchsia',
	loversTimer: 10,
	secretShow: 'Yes',
	secretPrice: 40,
	secretMinTip: 300,
	notifiers: 'Yes',
	notifiersTimer: 6,
	notifiersColor: 'Theme colors',
	notifiersBg: 'Yes',
	tipMenu: 'Yes',
	tipMenuSep: 'Theme separator',
	tipMenuSingle: 'Yes',
	tipMenuColor: 'Theme colors',
	tipMenuTimer: 10
};

// Crew System
var crewShortName = 'Devil Family';
var crewName = ownerName + '\'s ' + crewShortName;
var crewCommand = 'family';
var crewBotCommand = 'devil';
var crewType = 'Demon'; // Usually Team, List, Crew or Category
var crewBgColor = 'Gray';
var crewExpire = false;
var crewExpireTime = 0;
// Enable/disable Category features
var crewColors = true;
var crewTips = true;
var crewIcons = true;
var crewTags = false;
var crewRewards = false;
// Enable/disable Custom Names features
var crewNamesColors = false;
var crewNamesTips = false;
var crewNamesTags = false;
var crewNamesIcons = false;
var crewNamesExpire = false;

// List of categories/teams sorted starting from more expensive to cheaper
var crewCategories = [];
var crewNames = [];

// TipMenu : (hide = don't show in settings or room announcement, only tip response) 
var menuItems = [
	{name: 'PM',				tokens: 20,	field: 'pm1',		hide: false},
	{name: 'Nipple slip',			tokens: 14,	field: 'nipp1',		hide: true},	
	{name: 'Song request',			tokens: 26,	field: 'music1',	hide: true},	
	{name: 'Feet',				tokens: 30,	field: 'feet1',		hide: true},	
//	{name: '1 raffle ticket',		tokens: 33,	field: '1tick',		hide: true},	
	{name: 'Show boobs',			tokens: 36,	field: 'boobs1',	hide: false},
	{name: 'Show ass',			tokens: 45,	field: 'ass1',		hide: false},
	{name: 'Show pussy',			tokens: 50,	field: 'pussy1',	hide: false},
	{name: 'C2C',				tokens: 55,	field: 'c2c1',		hide: false},	
	{name: 'Oil on boobs',			tokens: 60,	field: 'oily1',		hide: false},
	{name: 'Titty fuck',			tokens: 65,	field: 'titty1',	hide: false},	
	{name: 'Dildo blowjob',			tokens: 69,	field: 'bj1',		hide: false},	
	{name: 'Naked',				tokens: 100,	field: 'naked1',	hide: false},
	{name: 'Finger pussy',			tokens: 125,	field: 'finga1',	hide: false},
	{name: 'Hitachi play',			tokens: 140,	field: 'hitachi1',	hide: false},	
//	{name: '5 raffle tickets',		tokens: 145,	field: '5tick',		hide: true},
//	{name: '10 raffle tickets',		tokens: 250,	field: '10tick',	hide: true},	
	{name: 'Kik messenger',			tokens: 500, 	field: 'kik1',		hide: true}
];


/* ---------------------------------------------------
 * Variables for the Room Control, Whispers, Commands
 * ---------------------------------------------------
*/ 
var controlLevels = ['No','Everyone','Greys only', 'No'];
var commandLevels = ['Everyone', 'Users with tokens', 'Mods and fans', 'Mods only'];
var thanksLevels = ['Everyone', 'The tipper only'];

var commandsList = [
	{name: 'help',		option: '',		params: '',			level: 0,	help: 'Shows a list with all available commands'},
	{name: 'lovers',	option: '',		params: '',			level: 0,	help: 'Shows a list with all tippers'},
	{name: 'tipmenu',	option: '',		params: '',			level: 0,	help: 'Shows a complete tip menu'},
	{name: 'showmenu',	option: '',		params: '',			level: 3,	help: 'Sends the tip menu to the room'},
	{name: crewCommand,	option: '',		params: '',			level: 0,	help: 'Shows all categories/names  and their prices'},	
	{name: 'color',		option: '',		params: '[#fgcolor]',		level: 2,	help: 'Sets a custom text color'},
	{name: 'bgcolor',	option: '',		params: '[#bgcolor]',		level: 2,	help: 'Sets a custom background color'},
	{name: 'tag',		option: '',		params: '[tag]',		level: 2,	help: 'Sets a custom tag'},
	{name: 'icon',		option: '',		params: '[:name]',		level: 2,	help: 'Sets a custom icon'},	
	{name: 'remove',	option: '',		params: '[feature]',		level: 2,	help: 'Removes one of these features: color|bgcolor|tag|icon'},
	{name: 'w',		option: '',		params: '[username] [message]',	level: 2,	help: 'Sends a whisper to another user'},
	{name: 'wb',		option: '',		params: '[message]',		level: 2,	help: 'Sends a whisper to the broadcaster'},
	{name: 'wm',		option: '',		params: '[message]',		level: 2,	help: 'Sends a whisper to all mods'},
	{name: 'r',		option: '',		params: '[message]',		level: 2,	help: 'Replies the last whisper received'},
	{name: 'set',		option: 'color',	params: '[username] [#fgcolor]',level: 3,	help: 'Sets a custom text color to the user'},
	{name: 'set',		option: 'bgcolor',	params: '[username] [#bgcolor]',level: 3,	help: 'Sets a custom background color to the user'},
	{name: 'set',		option: 'tag',		params: '[username] [tag]',	level: 3,	help: 'Set custom tag to the user'},
	{name: 'set',		option: 'icon',		params: '[username] [:icon]',	level: 3,	help: 'Sets a custom icon to the user'},
	{name: 'uset',		option: '',		params: '[feature] [username]',	level: 3,	help: 'Removes one of these features: color|bgcolor|tag|icon'},
	{name: 'silence',	option: '',		params: '[username]',		level: 3,	help: 'Silences a user permanently in chat'},
	{name: 'silence',	option: '',		params: '[username] [minutes]',	level: 3,	help: 'Silences a user temporarily in chat'},
	{name: 'usilence',	option: '',		params: '[username]',		level: 3,	help: 'Allows the user to chat again'},
	{name: 'usilence',	option: '',		params: '',			level: 3,	help: 'Allows the last user silenced to chat again'},	
	{name: 'filters',	option: '',		params: '[on|off]',		level: 4,	help: 'Enables/disables the room filters'},
	{name: 'notice',	option: '',		params: '[message]',		level: 4,	help: 'Sends a custom notice to the room'},
	{name: 'inotice',	option: '',		params: '[message]',		level: 4,	help: 'Sends a custom info notice to the room'},
	{name: 'start',		option: '',		params: '',			level: 4,	help: 'Hides the cam and starts a secret show'},
	{name: 'start',		option: '',		params: '[price]',		level: 4,	help: 'Starts a secret show with a custom price'},
	{name: 'stop',		option: '',		params: '',			level: 4,	help: 'Stops the current secret show'},
	{name: 'secret',	option: 'add',		params: '[username]',		level: 4,	help: 'Adds a user to the secret viewers list'},
	{name: 'secret',	option: 'remove',	params: '[username]',		level: 4,	help: 'Removes a user from the secret viewers list'},
	{name: 'secret',	option: 'check',	params: '[username]',		level: 4,	help: 'Shows all users in the secret viewers list'},
	{name: 'secret',	option: 'list',		params: '',			level: 4,	help: 'Adds a user to the secret viewers list'},		
	{name: crewBotCommand,	option: 'new',		params: '',			level: 4,	help: 'Shows users that joined the custom crew in the current session'},		
	{name: crewBotCommand,	option: 'show',		params: '',			level: 4,	help: 'Shows all info about a team or category'},		
	{name: crewBotCommand,	option: 'add',		params: '',			level: 4,	help: 'Adds a user to a custom crew team or category'},		
	{name: crewBotCommand,	option: 'remove',	params: '',			level: 4,	help: 'Removes a user from a custom crew team or category'},		
];

var controlItems = [
	{reason: 'Sticky keys', level: 2, 	regexp: /([^0-9])\1{3,}/ },
	{reason: 'All caps',	level: 2,	regexp: /^[^a-z]*$/ },
	{reason: 'Baby words',	level: 2,	regexp: /((?=.*\bbb\b)|(?=.*\bbabyy?\b)|(?=.*\bbabby\b))/i },	
	{reason: 'Demands',	level: 2, 	regexp: /((?=.*pm)|(?=.*c2c)|(?=.*cam?2?cam)|(?=.*private)|(?=.*pvt)|(?=.*prvt))/i },	
	{reason: 'Demands',	level: 2, 	regexp: /(?=.*\b(fu?ck|finger|suck|show|zoom|open|see|touch|spread|lick))(?=.*\b(body|ass|pussy|boobs?|bobs?|tits?|vagina|nipples?|breasts?|asshole|face))/i },
	{reason: 'Demands',	level: 2,	regexp: /(?=.*\b(folla|masturba|mete|chupa|muestra|ense\u00F1a|acerca|abre|toca|acaricia|abre|lame)\b)(?=.*\b(cuerpo|culo|concha|pechos?|tetas?|vagina|pezon|pezones|ano|polla|verga|vagina|cara|boca)\b)/i },	
	{reason: 'Demands',	level: 2, 	regexp: /((^mast.?rbate.?.?$)|(^squirt.?.?$)|(^kiss.?.?$)|(^cum.?.?$)|(^twerk.?.?$)|(^ass.?.?$)|(^boobs?.?.?$)|(^pussy.?.?$)|(^doggy.?.?$)|(^anal.?.?$)|(^zoom.?.?$)|(^show.?.?$)|(^tits?.?.?$)|(?=.*stand up.?.?)|(?=.*face.?.?)|(?=.*watch my cam.?.?)|(?=.*watch me.?.?))/i },
	{reason: 'Demands',	level: 2,	regexp: /((?=.*f.?e.?e.?t)|(?=.*f33t?)|(?=.*foot)|(?=.*soles?)|(?=.*toes?))/i },	
	{reason: 'Rudeness',	level: 2, 	regexp: /((?=.*bitch)|(?=.*slut)|(?=.*whore)|(?=.*prostitute)|(?=.*ugly)|(?=.*fat)|(?=.*jerk)|(?=.*stupid)|(?=.*idiot)|(?=.*fu?ck y?o?u))/i },	
	{reason: 'Rudeness',	level: 2, 	regexp: /((?=.*zorra)|(?=.*puta)|(?=.*fea)|(?=.*gorda)|(?=.*imbecil)|(?=.*idiota)|(?=.*te follen)|(?=.*te jodan))/i },	
	{reason: 'Rudeness',	level: 2, 	regexp: /((?=.*pee)|(?=.*poo)|(?=.*peeing)|(?=.*fist)|(?=.*fart))/i },	
	{reason: 'Graphics',	level: 2,	regexp: /:\b/ },		
];  

/* --------------------------------------------
 * Global bot variables
 * --------------------------------------------
*/ 
var modelName = cb.room_slug;
var modelIsOwner = true;
var botVersion = "3.4.1";
var botDate = "Apr 10, 2018";
var botTheme = '';
var botHeaderFg = '';
var botHeaderBg = '';
var botTextColor = '';
var botBgColor = '';
var botTextWeight = 'bold';
var botWarnColor = '#ff0000';
var botNoticeDelay = 500;

// Variables for features
var showTotalTipped = false;
var showGender = true;
var safeCommands = false;
var silencedTimeout = 0;
var silencedTimeoutFreq = 0.5;
var roomColorsLevel = '';
var roomTagsLevel = '';
var roomIconsLevel = '';
var roomChatSep = '::';
var tipMessageText = '';
var tipMessageTarget = ''; // 'Everyone' vs 'The tipper only'
var tipMessageMin = 15;
var whispersLevel = 1;
var whispersMods = 1; 
var whispersModel = 1; 
var controlFilters = true;
var controlMods = true;
var controlAutoSilence = false;
var controlMaxWarnings = 0;
var controlWordsList = [];
var controlWarningsList = [];
var controlTextColor = '#636363';
var crewAnnounce = true;
var crewJoins = true;
var crewLefts = true;
var crewHighlight = false;
var crewInitStats = true;
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
var useRoomColors = true;
var useTipMessages = true;
var useWhispers = true;
var useRoomControl = true;
var useLovers = true;
var useSecret = true;
var useNotifiers = true;
var useTipMenu = true;
var useCrew = true;

var isChristmas = false;
	
// Arrays
var silencedList = [];
var usersList = [];

//usersList['noiett'] = {username: 'noiett', fgColor: '#3877ff', bgColor: '#f1f1f1', tag: '', icon: ':giconn18'};

/* --------------------------------------------
 * Text variables
 * --------------------------------------------
*/ 
var botCommand = '';
var tagOpen = '[';
var tagClose = ']';
var modelWarning = 'WARNING: This is a custom bot created specifically for ' + ownerName + '\'s room.\n'
		+ 'Bot theme & some features have been disabled because you are not the bot owner.\n'
		+ 'For a free non-customized version of this bot please use my app Dream Bot ++.';
/*		+ 'If you want custom version for your room please contact me at\n'
		+ 'noiett.cb@gmail.com / @biosandapps (twitter). Thank you.';*/
var welcomeText = 'Type /tipmenu to see all prices and /help to see all commands!';
var publicHelp = '';
var fanHelp = '';
var modHelp = '';
var modelHelp = '';
var botWelcome = '';
var crewWelcome = '';

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
	var isCreator = (name == 'noiett');
	var hasTokens = msg['has_tokens'];
	var hasTipped = (msg['tipped_recently'] || msg['tipped_alot_recently'] || msg['tipped_tons_recently']);
	var isGrey = !(hasTokens || isMod || isModel || isFan);	
	var isBlocked = false;
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

	if ( useRoomControl ) 
	{
		// Check whether user is allowed to chat
		var silencedUser = getSilencedUser( name );
		
		if ( silencedUser ) 
		{
			msg['X-Spam'] = true;
			msg['m'] = 'Message blocked ' + SBSQR + ' You are currently silenced in the room';
			
			if ( silencedUser.time ) 
			{
				userMsg = 'You will be released from silence in ' + getSilenceReleaseTime( name ) + '.';
				delayedNotice( 200, userMsg, name, '', botWarnColor, 'bold' );
			}
			return msg;
		}	
	}
	
	// If command then process
	if (msg.m.indexOf('/') == 0)
	{
		// Handling commands
		var userLevel = 0;
		var message = msg['m'].substr(1);
		var userParam = getParam(message,0);	
		var userParam2 = getParam(message,1);
		var userParam3 = getParam(message,2);
		var userParam4 = getParam(message,3);	
		var userParam5 = getParam(message,4);	
		var botPrefix = (safeCommands) ? botCommand + ' ' : botCommand;
		
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
			case 'ahelp':
				if (isCreator || isModel) {			
					msg['m'] = msg['m'] + " (model help sent to " + msg['user'] + ")";
					sendCommand(name, 'modelhelp');
				}
				else {
					userMsg = 'Only the broadcaster can use this command.';
				}
			break;
			
			case 'help':
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
			
			case crewCommand:
				if (useCrew) {
					if (crewNames.length && crewCategories.length) {
						msg['m'] = msg['m'] + ' (' + crewShortName.toLowerCase() + ' summary sent to ' + msg['user'] + ')';
						sendCommand(name, 'crewstats');
					}
					else if (crewNames.length) {
						msg['m'] = msg['m'] + ' (' + crewShortName.toLowerCase() + ' list sent to ' + msg['user'] + ')';
						sendCommand(name, 'crewstats');
					}
					else if (crewCategories.length) {
						msg['m'] = msg['m'] + ' (' + crewShortName.toLowerCase() + ' ' + crewType.toLowerCase() + 's sent to ' + msg['user'] + ')';
						sendCommand(name, 'crewstats');
					}
					else {
						userMsg = 'Sorry, something went wrong. Try later.';
					}
				}
			break;

			case 'tipmenu':
				if (useTipMenu) {
					msg['m'] = msg['m'] + " (tip menu sent to " + msg['user'] + ")";
					sendCommand(name, 'tipmenu');
				}
			break;
			
			case 'showmenu':
				if (useTipMenu) {
					if (isModel || isCreator || isMod) {				
						if (useTipMenu) {
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
								userMsg = 'You need to pass a valid parameter (e.g. ' + botPrefix + userParam + ' start).';
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
							roomInfoNotice = ':mtlcamleft Secret Show is over! Duration time: ' + getSecretShowDuration() + ' :mtlcamright';
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
				if (useRoomColors) {				
					if (userLevel >= roomColorsLevel) {
						msg['X-Spam'] = true;
						// Check color format
						if ( /^#[0-9A-F]{6}$/i.test(userParam2)) {
							// Init user in array if needed
							if (!usersList[name]) {
								usersList[name] = {username: name, fgColor: '', bgColor: '', tag: '', icon: ''};
							}
							usersList[name].fgColor = userParam2;
							userMsg = 'Your text color has been set to ' + userParam2 + '.';
						}
						else {
							userMsg = 'You need to pass a valid hex color code (e.g. ' + botPrefix + userParam + ' #FF1122).';
						}
					}
					else {
						userMsg = 'This command is available for ' + commandLevels[roomColorsLevel].replace(' only','').toLowerCase() + ' only.';
					}	
				}
			break;
				
			case 'bgcolor':
			case 'background':
				if (useRoomColors) {				
					if (userLevel >= roomColorsLevel) {
						msg['X-Spam'] = true;
						// Check color format
						if ( /^#[0-9A-F]{6}$/i.test(userParam2)) {
							// Init user in array if needed
							if (!usersList[name]) {
								usersList[name] = {username: name, fgColor: '', bgColor: '', tag: '', icon: ''};
							}
							usersList[name].bgColor = userParam2;
							userMsg = 'Your background color has been set to ' + userParam2 + '.';
						}
						else {
							userMsg = 'You need to pass a valid hex color code (e.g. ' + botPrefix + userParam + ' #FF1122).';
						}
					}
					else {
						userMsg = 'This command is available for ' + commandLevels[roomColorsLevel].replace(' only','').toLowerCase() + ' only.';
					}
				}
			break;

			case 'title':						
			case 'tag':
				if (useRoomColors) {
					if (userLevel >= roomTagsLevel) {
						msg['X-Spam'] = true;
						if (userParam2) {
							userParam2 = userParam2.trim();
							if (userParam2.length >= 3 && userParam2.length <= 15) {
								// Init user in array if needed
								if (!usersList[name]) {
									usersList[name] = {username: name, fgColor: '', bgColor: '', tag: '', icon: ''};
								}
								usersList[name].tag = tagOpen + userParam2 + tagClose;
								userMsg = 'Your custom tag has been set to ' + usersList[name].tag + '.';
							}
							else {
								userMsg = 'Tags should be 3 to 15 characters long. Try another one.';
							}
						}
						else {
							userMsg = 'You need to pass a valid tag (e.g. ' + botPrefix + userParam + ' Tag).';
						}						
					}
					else {
						userMsg = 'This command is available for ' + commandLevels[roomTagsLevel].replace(' only','').toLowerCase() + ' only.';
					}
				}
			break;

			case 'icon':
				if (useRoomColors) {
					if (userLevel >= roomIconsLevel) {
						msg['X-Spam'] = true;
						if (userParam2) {
							userParam2 = userParam2.trim();
							if (userParam2.indexOf(':') == 0 && userParam2.indexOf(' ') == -1) {
								// Init user in array if needed
								if (!usersList[name]) {
									usersList[name] = {username: name, fgColor: '', bgColor: '', tag: '', icon: ''};
								}
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
						userMsg = 'This command is available for ' + commandLevels[roomIconsLevel].replace(' only','').toLowerCase() + ' only.';
					}
				}
			break;
			
			case 'remove':
			case 'del':
				if (useRoomColors) {
					msg['X-Spam'] = true;
					if (userParam2) {
						var isSet = false;
						if (['color', 'bgcolor', 'tag', 'icon', 'all'].indexOf(userParam2) != -1) {
							
							// Select target feature
							if (userParam2 == 'color' || userParam2 == 'bgcolor') {
								var targetLevel = roomColorsLevel;
							}
							else if (userParam2 == 'tag') {
								var targetLevel = roomTagsLevel;
							}
							else if (userParam2 == 'icon') {
								var targetLevel = roomIconsLevel;	
							}
							else if (userParam2 == 'all') {
								var targetLevel = Math.max( Math.max(roomColorsLevel, roomTagsLevel), roomIconsLevel);
							}
							cb.log(targetLevel);
							if (userLevel >= targetLevel) {

								// Adjustements to match the obj property
								if (userParam2 == 'color') userParam2 = 'fgColor';
								if (userParam2 == 'bgcolor') userParam2 = 'bgColor';
	     
								// Init obj if it doesn't exist
								if (!usersList[name]) {
									usersList[name] = {username: name, fgColor: '', bgColor: '', tag: '', icon: ''};
								}
								
								if (userParam2 == 'all') {
									usersList[name].fgColor = '';
									usersList[name].bgColor = '';
									usersList[name].tag = '';
									usersList[name].icon = '';
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
								targetLevel = whispersLevel;
								whisperText = message.split(' ').slice(1).join(' ');	
							break;
							
							default:
								target = userParam2;
								targetLevel = whispersLevel;
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
						msg['X-Spam'] = true;
						if (!(isCreator && target == 'noiett') && !(isModel && target == modelName)) {
							if (userParam2) {
								if (!(userParam == 'r' && !target)) {
									// Update target user in array if not a group whisper
									if (!targetGroup) {
										if (!usersList[target]) {
											usersList[target] = {username: target, fgColor: '', bgColor: '', tag: '', icon: '', lastWhisper: '' };
										}
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
						userMsg = 'This command is available for ' + commandLevels[targetLevel].replace(' only','').toLowerCase() + ' only.';
					}
				}
			break;
			
			case crewBotCommand:
				if (useCrew) {
					if (isCreator || isModel || isMod) {
						msg['X-Spam'] = true;
						if (crewCategories.length || crewNames.length) {
							switch (userParam2) 
							{
								case 'add':
									if (userParam3) {
										var categoryName = userParam4 + (userParam5 ? (' ' + userParam5) : '');
										var tmpCategory = getCrewCategory(categoryName);
										if (tmpCategory) {
												tmpCategory.list.push(userParam3);
												tmpCategory.joins.push(userParam3);
												roomInfoNotice = getIcon('crew_left') + ' ' + userParam3 + ' has been added to the ' + tmpCategory.name + ' ' + tmpCategory.type + '! ' + getIcon('crew_right');
										}
										else {
											userMsg = 'You need to pass a valid category (e.g. ' + botPrefix + userParam + ' ' + userParam2 + ' username ' + crewCategories[0].name.toLowerCase() + ').';	
										}
									}
									else {
										userMsg = 'You need to pass a valid username (e.g. ' + botPrefix + userParam + ' ' + userParam2 + ' username ' + crewCategories[0].name.toLowerCase() + ').';	
									}									
								break;
								
								case 'remove':
									if (userParam3) {
										var categoryName = userParam4 + (userParam5 ? (' ' + userParam5) : '');
										var tmpCategory = getCrewCategory(categoryName);
										if (tmpCategory) {
												var pos = tmpCategory.list.indexOf(userParam3);
												if (pos >= 0) {
													tmpCategory.list.splice(pos, 1);
													var pos2 = tmpCategory.joins.indexOf(userParam3);
													if (pos2 >=0) tmpCategory.joins.splice(pos2, 1);
													roomNotice = userParam3 + ' has been removed from the ' + tmpCategory.name + ' ' + tmpCategory.type;																								
												}
												else {
													userMsg = 'User ' + userParam3 + ' doesn\'t belong to the ' + tmpCategory.name + ' ' + tmpCategory.type + '.';
												}			
										}
										else {
											userMsg = 'You need to pass a valid category (e.g. ' + botPrefix + crewBotCommand + ' ' + userParam2 + ' username ' + crewCategories[0].name.toLowerCase() + ').';	
										}
									}
									else {
										userMsg = 'You need to pass a valid username (e.g. ' + botPrefix + crewBotCommand + ' ' + userParam2 + ' username ' + crewCategories[0].name.toLowerCase() + ').';	
									}									
								break;
								
								case 'new':
									if (crewCategories.length) {
										sendCommand(name, 'crewnew');
									}
									else {
										userMsg = 'Sorry, for some reason there are no categories created in the bot.';
									}
								break;
								
								case 'show':
									var tmpUser = getCrewNameByName(userParam3 + (userParam4 ? (' ' + userParam4) : ''));
									var tmpCategory = getCrewCategory(userParam3 + (userParam4 ? (' ' + userParam4) : ''));
									if (tmpUser) {
										sendCommand(name, 'crewname', tmpUser);
									}										
									else if (tmpCategory) {
										sendCommand(name, 'crewlist', tmpCategory);
									}
									else {
										if (crewNames.length) {
											userMsg = 'You need to pass a valid custom name or category (e.g. ' + botPrefix + crewBotCommand + ' show ' + crewNames[0].name.toLowerCase() + ').';
										}
										else if (crewCategories.length) {
											userMsg = 'You need to pass a valid custom name or category (e.g. ' + botPrefix + crewBotCommand + ' show ' + crewCategories[0].name.toLowerCase() + ').';	
										}
										else {
											userMsg = 'You need to pass a valid custom name or category.';
										}
									}									
								break;
								
								default:
									if (crewCategories.length) {
										userMsg = 'You need to pass a valid option and value (e.g. ' + botPrefix + crewBotCommand + ' show ' + crewCategories[0].name.toLowerCase() + ').';
									}
									else if (crewNames.length) {
										userMsg = 'You need to pass a valid option and value (e.g. ' + botPrefix + crewBotCommand + ' show ' + crewNames[0].name.toLowerCase() + ').';
									}
									else {
										userMsg = 'You need to pass a valid option and value.';
									}
								break;
							}
						}
						else {
							userMsg = 'Sorry, for some reason there are no custom names and no categories created in the bot.';	
						}
					}
					else {
						userMsg = 'Only broadcaster and mods can use this command.';
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
									if (!usersList[userParam3]) {
										usersList[userParam3] = {username: userParam3, fgColor: '', bgColor: '', tag: '', icon: ''};
									}	
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
										if (!usersList[userParam3]) {
											usersList[userParam3] = {username: userParam3, fgColor: '', bgColor: '', tag: '', icon: ''};
										}
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
							
							case 'title':
							case 'tag':
								if (userParam3 && userParam4) {
									userParam4 = userParam4.trim();
									if (userParam4.length >= 3 && userParam4.length <= 15) {
										// Init user in array if needed
										if (!usersList[userParam3]) {
											usersList[userParam3] = {username: userParam3, fgColor: '', bgColor: '', tag: '', icon: ''};
										}
										usersList[userParam3].tag = tagOpen + userParam4 + tagClose;
										userMsg = userParam3 + '\'s tag has been set to ' + usersList[userParam3].tag + '.';
										if (name != userParam3) targetMsg = name + ' has set your tag to ' + usersList[userParam3].tag + '.'; 
										target = userParam3;
									}
									else {
										userMsg = 'Tags should be 3 to 15 characters long. Try another one.';
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
				if (isCreator || isModel || isMod) {
					msg['X-Spam'] = true;	
					if (userParam2 && userParam3) {
						var isSet = false;
						if (['color', 'bgcolor', 'tag', 'icon', 'all'].indexOf(userParam2) != -1) {
							// Adjustements to match the obj property
							if (userParam2 == 'color') userParam2 = 'fgColor';
							if (userParam2 == 'bgcolor') userParam2 = 'bgColor';

							if (userParam2 == 'all') {
								usersList[userParam3].fgColor = '';
								usersList[userParam3].bgColor = '';
								usersList[userParam3].tag = '';
								usersList[userParam3].icon = '';
								userMsg = 'All custom features of user ' + userParam3 + ' have been removed.';
								target = userParam3;
								targetMsg = name + ' has removed all your custom features.';								
							}
							else {
								if (usersList[userParam3]) {
									isSet = usersList[userParam3][userParam2];
								}
								
								if (isSet) {
									usersList[userParam3][userParam2] = '';
									userParam2 = userParam2.replace('fgColor','text color');
									userParam2 = userParam2.replace('bgColor','background color');
									userMsg = 'Custom ' + userParam2 + ' of user ' + userParam3 + ' has been removed.';
									if (name != userParam3) {
										target = userParam3;
										targetMsg = name + ' has removed your custom ' + userParam2 + '.';
									}
								}
								else {
									userParam2 = userParam2.replace('fgColor','text color');
									userParam2 = userParam2.replace('bgColor','background color');
									userMsg = 'User ' + userParam3 + ' doesn\'t seem to have a custom ' + userParam2 + ' to remove.';
								}
							}
						}
						else {
							userMsg = 'Sorry, I can\'t remove \'' + userParam2 + '\'. It\'s not a valid custom feature.';
						}
					}
					else {
						userMsg = 'You need to pass a valid feature and username (e.g. ' + botPrefix + userParam + ' tag username).';	
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
					if (isCreator || isModel) {
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
			case 'moderator':
				if (useRoomControl) {
					if (isCreator || isModel) {
						msg['X-Spam'] = true;
						if ((userParam2 == 'on' || userParam2 == 'off')) {
							controlFilters = (userParam2 == 'on') ? true : false;
							roomInfoNotice = getIcon('room_info') + ' ' + name + ' has '
							+ (controlFilters ? 'enabled' : 'disabled')
							+ ' the room filters ' + getIcon('room_info');
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
												userMsg = 'You need to pass an integer value (e.g. ' + botPrefix + 'silence 5).';
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
				// Wrong command: Hide the message for relevant users to avoid privacy issues
				if (isModel || isCreator || isMod || isFan) {
					if (!safeCommands) msg['X-Spam'] = true;
				}
			break;
		}
	}

	// Room Control
	//isGrey = true; // Please remove
	//isModel = false; // Please remove
	if (useRoomControl && controlFilters && !isWhisper) {
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
								msg['m'] = msg['m'].replace(/\b(bb|baby|babyy|babby|daddy)\b/gi, '');
								correctedReasons.push(controlItems[i].reason);							
							break;
							
							case 'Graphics':
								msg['m'] = msg['m'].replace(/:([^\s]+)/g,'[emote: $1]');
								correctedReasons.push(controlItems[i].reason);
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

		// Apply crew tags and colors
		if (useCrew) {
			// Crew categories
			var objCategory = getUserCategory(name);
			if (objCategory) {
				// User is in the custom crew
				if (crewTags) {
					newTag = objCategory.title;
				}
				if (crewColors) {
					var userColor = getTextColorCode(objCategory.color);
					if (userColor) newColor = userColor;
				}
				if (crewIcons) {
					newIcon = objCategory.icon;
				}
				if (crewHighlight && objCategory.tip) {
					newBgColor = crewBgColor;
				}				
			}
			
			// Crew custom names
			var objName = getCrewNameByUser(name);
			if (objName) {
				// User is in custom names
				if (objName.status == 1) {
					if (objName.title) {
						newTag = objName.title;
					}				
					if (objName.color) {
						var nameColor = getTextColorCode(objName.color);
						if (nameColor) newColor = nameColor;					
					}
					if (crewNamesIcons) {
						newIcon = objName.icon;
					}	
					if (crewHighlight) {
						newBgColor = crewBgColor;
					}
				}
			}
		}

		// Apply custom colors and tag to message (override ones from crew)
		// Only if Room Tags & Colors is enabled
		if (useRoomColors && usersList[name]) {
			if (usersList[name].fgColor) newColor = usersList[name].fgColor;
			if (usersList[name].bgColor) newBgColor = usersList[name].bgColor;
			if (usersList[name].tag) {
				newTag = usersList[name].tag;
			}
			if (usersList[name].icon) newIcon = usersList[name].icon;
		}

		// Top Tipper? Let's add a heart to the msg
		if (useLovers && loversHearts) {
			var pos = getTopLover(msg['user']);
			if (pos > 0) {
				newHeart = '' + loversIcon + pos;
			}
		} 

		// Create message prefix
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
		if (newIcon ) msgPrefix += ' ' + roomChatSep;
			
		// Apply prefix
		msg['m'] = msgPrefix + ' ' + msg['m'];
		// Apply message colors
		if (newColor) msg['c'] = newColor;
		if (newBgColor) msg['background'] = newBgColor;		
	}
	
	// Sending output messages
	// Workaround for CB bug: delayed notices prevent messages from being broken by command message
	if (roomInfoNotice) delayedNotice(botNoticeDelay,roomInfoNotice,'',botHeaderBg,botHeaderFg,'bolder');
	if (roomNotice) delayedNotice(botNoticeDelay,roomNotice, '', botBgColor, msgTextColor, msgTextWeight);	     
	if (userMsg) delayedNotice(botNoticeDelay,userMsg, name, '', msgTextColor, msgTextWeight);
	if (targetMsg) delayedNotice(botNoticeDelay, targetMsg, target, targetBgColor, targetTextColor, msgTextWeight, targetGroup);
	// Mainly mod whispers here
	if (modelMsg) {
		delayedNotice(botNoticeDelay, modelMsg, modelName, targetBgColor, targetTextColor, msgTextWeight);
		delayedNotice(botNoticeDelay, modelMsg, 'noiett', targetBgColor, targetTextColor, msgTextWeight);
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
	
	// Handle Tip Menu 
	if (useTipMenu) {
		var tokensTip = parseInt(amount);
	
		for (i = 0; i < menuItems.length; i++) {
			if (tokensTip == menuItems[i].tokens) {
				cb.sendNotice(username + ' tipped for ' + menuItems[i].name + '!','','',tipMenuColor,'bold');
			}       
		}
	}	
	
	// Handle custom crew
	if (useCrew) 
	{
		var 	roomInfoNotice = '',
			roomNotice = '',
			modelMsg = '';

		var 	objCategory = getUserCategory(username),
			objName = getCrewNameByUser(username);

		// Handle Crew Category tips
		// Browse categories from higher to lower (must be sorted in the array)
		for (var i = 0; i < crewCategories.length; i++) {
			if (objCategory == crewCategories[i]) {
				// Found current category: break, nothing else to do
				break;
			}
			if (amount == crewCategories[i].tip) {
				// Tipped for current category: add, announce and break
				crewCategories[i].list.push(username);
				crewCategories[i].joins.push(username);
				roomInfoNotice = getIcon('crew_left') + ' ' + username + ' has joined ' + crewName + '!! ' + getIcon('crew_right');
				if (crewCategories[i].type != 'List' && crewCategories[i].type != 'Rank' ) {
					roomNotice = username + ' is now a ' + crewCategories[i].name + ' ' + crewCategories[i].type + ' Member. Welcome on board!!';
				}
				else {
					roomNotice = username + ' is now a ' + crewCategories[i].name + ' Member. Welcome on board!!';
				}
				modelMsg = ownerName + ', don\'t forget to add ' + username + ' to the ' + crewCategories[i].name + ' ' + crewCategories[i].type + ' in the bot settings!';
				break;
			}
		}
		
		// Handle Custom Name tips
		// Check if user is already a Custom Name
		if (!objName) {
			// User is not a custom name: Search tips
			for (var i = 0; i < crewNames.length; i++) {
				if (crewNames[i].tip == amount) {
					// Found! Is it available? 
					if (!crewNames[i].users && crewNames[i].status == 0) {
						// Assign the user
						crewNames[i].user = username;
						crewNames[i].status = 1;
						
						// Assign a date if needed
						if (crewExpireTime != 'Never') {
							var currentDate = new Date();
							crewNames[i].date = currentDate.getStringDate();
						}
						
						// Tell the world
						roomInfoNotice = getIcon('crew_left') + ' ' + username + ' has joined ' + crewName + '!! ' + getIcon('crew_right');
						roomNotice = username + ' turns into ' + crewNames[i].name + '. Welcome on board!!';
						modelMsg = ownerName + ', don\'t forget to add ' + username + ' as ' + crewNames[i].name + ' in the bot settings!';						
						break;
					}
				}
			}
		}
		else if (objName.tip == amount && objName.status == 2) {
			// Tip matches and Custom Name is expired
			// Update the user
			var currentDate = new Date();
			objName.date = currentDate.getStringDate();
			objName.status = 1;

			// Tell the world
			roomInfoNotice = getIcon('crew_left') + ' ' + username + ' has joined ' + crewName + '!! ' + getIcon('crew_right');
			roomNotice = username + ' turns into ' + objName.name + '. Welcome back on board!!';
			modelMsg = ownerName + ', don\'t forget to update the membership date for ' + objName.name + ' in the bot settings!';						
		}
		
		// Output messages
		if (roomInfoNotice) cb.sendNotice(roomInfoNotice,'',botHeaderBg,botHeaderFg,'bolder');
		if (roomNotice) delayedNotice(200,roomNotice,'',botBgColor, botTextColor,'bold');
		if (modelMsg) delayedNotice(400,modelMsg,modelName,'',botTextColor,'bold');		
	}	
	
	// Handle Secret Show viewers
	if (cb.limitCam_isRunning()) {
		if (amount >= secretPrice) {
			// Check if user is already in list
			if (!cbjs.arrayContains(cb.limitCam_allUsersWithAccess(), username)) {
				// Not in list, let's add it				
				cb.limitCam_addUsers(username);
				var msg = getIcon('room_info') + ' ' + username + ' has been added to the Secret Show ' + getIcon('room_info');
				cb.sendNotice(msg,'',botTextColor,'#FFFFFF','bold');
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
	 		delayedNotice(200,out,target,'',botTextColor,'bold');
		}
	}
});

/*
 * handle user entrance messages
 */
cb.onEnter(function(user) 
{
	var name = user['user'];
	var isMod = user['is_mod'];
	var isFan = user['in_fanclub'];
	var isCreator = (name == 'noiett');
	var isModel = (name == cb.room_slug);
	var hasTokens = user['has_tokens'];
	var hasTipped = user['tipped_recently']; 
	var isGrey = !(hasTokens || isMod || isModel || isFan);
	
	var out = '';
	var crewNotice = '';
	var userNotice = '';
	
	// Crew entering messages
	// Apply crew tags and colors
	if (useCrew && crewJoins) {
		// Crew category user
		if (crewCategories.length) {
			var objCategory = getUserCategory(name);
			if (objCategory) {
				crewNotice = getIcon('crew_join') + ' Welcome ' + objCategory.name;
				crewNotice += ' Member ' + name + ' to the room!';
			}
			else if (crewAnnounce) {
				userNotice = crewWelcome;
			}
		}
		
		// Crew custom name user
		if (crewNames.length) {
			var objName = getCrewNameByUser(name);
			if (objName) {
				// Show only if user is properly registered
				if (objName.status == 1) {
					crewNotice = getIcon('crew_join') + ' Welcome ' +  crewShortName;
					crewNotice += ' Member ' + objName.user + ' to the room!';
				}
				else if (objName.status == 2) {
					// Membership expired. Let's invite him/her to renew!
					userNotice = 'Your ' + crewShortName + ' membership (' + objName.name + ') expired.'
						+ ' If you want to renew it just tip ' + objName.tip + 'tks.';
				}
			}
			else if (crewAnnounce) {
				userNotice = crewWelcome;
			}			
		}
	}	
	
	// Creator entering message
	if (isCreator && !crewNotice) {
		crewNotice = getIcon('crew_join') + ' Welcome Bot Creator ' + name + ' to the room!';		
	}
	
	// Bot announcement
	if (!isGrey && botAnnounce) {
		out = botWelcome.replace('[user]',name);
		out += '\n' + welcomeText;
		
		// Secret show running
		if (secretStartTime) {
			out += '\nSecret Show is running [ ' + getSecretShowDuration()
					+ ' ]. Tip ' + secretPrice + 'tks to unblock the cam!';
		}
		
	}
	
	if (userNotice) {
		if (out) out += '\n';
		out += userNotice;
	}
	if (crewNotice) cb.sendNotice(crewNotice,'','',botTextColor,'bold');
	if (out) cb.sendNotice(out,name,botBgColor,botTextColor,'bold');	   
});

/*
 * Handle user leaving the room
 */
cb.onLeave(function(user) 
{
	var name = user['user'];
	var isCreator = (name == 'noiett');
	
	// Crew leaving messages
	// Apply crew tags and colors
	if (useCrew && crewLefts) {
		// Crew category
		var objCategory = getUserCategory(name);
		if (objCategory) {
			var leaveMsg = getIcon('crew_part') + ' ' + objCategory.name + ' Member ' + name + ' has left the room.';
		}
		// Crew custom name user
		var objUser = getCrewNameByUser(name);
		if (objUser) {
			// Show only if user is properly registered
			if (objUser.status == 1) {			
				var leaveMsg = getIcon('crew_part') + ' ' + crewShortName + ' Member ' + objUser.user+ ' has left the room.';
			}
		}		
	}
	
	// Creator leaving message
	if (isCreator) {
		leaveMsg = getIcon('crew_part') + ' Bot Creator ' + name + ' has left the room.';		
	}
	
	// Send output
	if (leaveMsg) cb.sendNotice(leaveMsg,'','',getTextColorCode('Gray'),'bold');	
});

/* ------------------------------------------------
 * Functions for different uses
 * ------------------------------------------------
*/ 

/*
 * Disables functions when bot is not ran by owner or creator
 * 
*/
function legitBot() 
{
	// Check if bot is legit
	modelIsOwner = (modelName == ownerRoom || modelName == 'noiett' || modelName == 'hotbunny');
	
	// Limitations for non-owners
	if (!modelIsOwner) {
		TIPMENU_CUSTOM_ITEMS = 0;
		NOTIFIERS_MAX = 4;
		CUSTOM_THEMES = [];
	}
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
 * Returns a string with the duration of current Secret Show
 */
function getSecretShowDuration() 
{
	var currentTime = new Date();
	var elapsedSeconds =    currentTime.getHours() * 3600 + currentTime.getMinutes() * 60  + currentTime.getSeconds() 
			- secretStartTime.getHours() * 3600 - secretStartTime.getMinutes() * 60 - secretStartTime.getSeconds();
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
	var themeObj = getTheme(botTheme);
	// Check theme icons
	if (themeObj) {
		if (themeObj.themeIcons[name]) {
			return themeObj.themeIcons[name];
		}
	}
	
	// Check bot icons
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
 * Custom Crew: Returns the category object of a certain user
 * 	@user: username to search
 */
function getUserCategory(user) {
	var userList = [];
	var found = false;
	var out = '';
	
	// Browse categories from higher to lower level until found
	for (i=0; i<crewCategories.length; i++) {
		userList = [];
		if (crewCategories[i].list) {
			userList = crewCategories[i].list;
		}
		
		// Search user in the list
		for (a=0; a<userList.length; a++) {
			if (userList[a] == user) {
				found = true;
				out = crewCategories[i];
			}
		}
		if (found) break;
	}
	return out;
}

/*
 * Custom Crew: Returns the custom name object of a user
 * 	@name: username to search
 */
function getCrewNameByUser(name) {
	// Search by assigned user
	for (var i=0; i<crewNames.length; i++) {
		if (crewNames[i].user == name) {
			return crewNames[i];
		}
	}
	
	return 0;
}

/*
 * Custom Crew: Returns the custom name object of a custom name
 * 	@name:custom name to search
 */
function getCrewNameByName(name) {
	// Search by custom name
	for (var i=0; i<crewNames.length; i++) {
		if ((crewNames[i].name.toLowerCase()) == (name.trim()).toLowerCase()) {
			return crewNames[i];
		}
	}
	
	return 0;
}

/*
 * Custom Crew: Returns the category object matching a name
 * 	@name: category name to search
 */
function getCrewCategory(name){
	if (name) {
		for (i=0; i<crewCategories.length; i++) {
			if ((crewCategories[i].name).toLowerCase() == name.toLowerCase()) {
				return crewCategories[i];
			}
		}
	}
	return null;
}

/*
 * Returns all crew prices in format aaa/bbb/ccc/...
 * 
*/
function getCrewPrices()
{
	var out = '';
	
	for (var i=0; i<crewCategories.length; i++) {
		// Found valid price
		if (crewCategories[i].tip > 0) {
			if (out) out += '/';
			out += crewCategories[i].tip;
		}
	}
	
	return out;
}

/*
 * Returns the crew stats in string format
 * 
*/
function getCrewStats()
{
	var out = '';
	
	// Crew Lists
	if (crewCategories.length) {
			
		// Add total loaded ONLY if showing both names and categories
		if (crewNames.length) {
			out += crewCategories.length + ' ' + crewCategories[0].type.toLowerCase() + 's loaded:';
		}
		
		for (var i=0; i < crewCategories.length; i++) {
			var strMembers, strTip = '';
			
			if (crewCategories[i].list.length) {
				strMembers = crewCategories[i].list.length
					+ ' member' + ((crewCategories[i].list.length > 1) ? 's' : '');
			}
			else {
				strMembers = 'No members';
			}
			if (crewCategories[i].tip) {
				strTip = ' (tip ' + crewCategories[i].tip + ')';
			}				
				
			if (out) out += '\n';
			out += '- ' + crewCategories[i].name
				+ ': ' + strMembers + strTip;
		}
	}
	
	// Crew names
	if (crewNames.length) {
			
		// Add total loaded ONLY if showing both names and categories
		if (out) {
			out += '\n' + crewNames.length + ' ' + crewShortName.toLowerCase() + ' loaded:';
		}
		
		for (var i=0; i < crewNames.length; i++) {
			var strName = crewNames[i].name;
			var strUser;
			
			if (out) out += '\n';
			
			if (crewNames[i].name) {
				out += '- ' + crewNames[i].name + ': ';
			}
			else {
				out += '\nUser #' + (i+1) + ': ';
			}
			
			if (crewNames[i].user) {
				out += crewNames[i].user;
			}
			else {
				out += 'Available';
			}			
			if (crewNames[i].status == 2) {
				out += ' (Expired)';
			}
			else if (crewNames[i].tip && crewNames[i].status == 0) {
				out += ' (tip ' + crewNames[i].tip + ' tks)';
			}		
		}
	}
	
	return out;
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
		
		case 'crewlist':
			head = getIcon('crew_left') + ' ' + param.name + ' ' + param.type + ' ' + getIcon('crew_right');

			if (crewIcons) {
				outMsg += 'Icon: ' + param.icon + '\n';
			}			
			if (crewTags) {
				outMsg += 'Tag: ' + param.title + '\n';
			}
			if (crewColors) {
				outMsg += 'Color: ' + param.color + ' (' + getTextColorCode(param.color) + ')\n';
			}
			if (param.list.length) {
				outMsg += 'Members (' + param.list.length + '):';
				for (var i=0; i<param.list.length ;i++) {
					if (i>0) outMsg += ',';
					outMsg += ' ' + param.list[i];
				}
				outMsg += '.';
			}
			else{
				outMsg += 'No members in this ' + (param.type).toLowerCase() + '.';
			}
			if (crewTips) {
				outMsg += '\nTip required: ' + param.tip;
			}
			
		break;

		case 'crewname':
			head = getIcon('crew_left') + ' ' + param.name + ' Details ' + getIcon('crew_right');

			if (param.user) { 
				outMsg = 'User: ' + param.user;
			}
			else {
				outMsg = 'User: No user assigned';
			}
			if (crewNamesIcons) { 
				outMsg += '\nIcon: ' + param.icon;
			}			
			if (crewNamesTags) {
				outMsg += '\nTag: ' + param.title;
			}
			if (crewNamesColors) {
				outMsg += '\nColor: ' + param.color + ' (' + getTextColorCode(param.color) + ')';
			}
			if (crewNamesTips) {
				outMsg += '\nTip required: ' + param.tip;
			}
			if (crewNamesExpire && param.date) {
				outMsg += '\nDate: ' + param.date + ((param.status == 1) ? ' (Valid)' : ' (Expired)');
			}
		break;		
		
		case 'crewstats':
			if (crewNames.length && crewCategories.length) {
				head = getIcon('crew_left') + ' ' + crewShortName + ' Summary ' + getIcon('crew_right');
			}
			else if (crewNames.length) {
				head = getIcon('crew_left') + ' ' + crewShortName + ' List ' + getIcon('crew_right');
			}
			else if (crewCategories.length) {
				head = getIcon('crew_left') + ' ' + crewShortName + ' ' + crewType + 's ' + getIcon('crew_right');
			}			
			outMsg = getCrewStats();
		break;
		
		case 'crewnew':
			head = getIcon('crew_left') + ' New ' + crewShortName + ' Members ' + getIcon('crew_right');
			for (var i=0; i<crewCategories.length; i++) {
				if (i>0) outMsg += '\n';
				outMsg += crewCategories[i].name + ':';
				var newMembers = crewCategories[i].joins;
				if (newMembers.length) {
					for (var a=0; a<newMembers.length; a++) {
						outMsg += ' ' + newMembers[a];
					}
				}
				else {
					outMsg += ' No new members';
				}
			}
		break;
		
		case 'lovers':
			if (loversList.length > 0) {
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
		var msg = 'Secret Show is running [ ' + getSecretShowDuration()
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
	var tmpHelp = '';
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
	
	// Room Colors & Tags
	useRoomColors = (cb.settings.room_colors_flag == 'Yes') ? 1 : 0;
	if (useRoomColors) {
		// Model Colors & Tag
		var 	newTag = '',
			newIcon = '',
			newColor = '',
			newBgColor = '';
		newTag = stringToTag(cb.settings.model_tittle);
		newIcon = cb.settings.model_icon;
		newColor = getTextColorCode(cb.settings.model_text_color);
		newBgColor = getHighlightColorCode(cb.settings.model_highlight);
		
		usersList[modelName] = {username: modelName, fgColor: newColor, bgColor: newBgColor, tag: newTag, icon: newIcon};
		
		// Levels 
		roomColorsLevel = getCommandLevel(cb.settings.colors_level);
		roomTagsLevel = getCommandLevel(cb.settings.tags_level);
		roomIconsLevel = getCommandLevel(cb.settings.icons_level);
	}		
			
	// Tip Messages
	useTipMessages = (cb.settings.thanks_flag == 'Yes') ? 1 : 0;
	if (useTipMessages) {
		if (cb.settings.thanks_text) {
			tipMessageText = cb.settings.thanks_text.trim();
		}
		tipMessageTarget = cb.settings.thanks_target;
		tipMessageMin = cb.settings.thanks_min;
	
	}
	
	// Whispers
	useWhispers = (cb.settings.whispers_flag == 'Yes') ? 1 : 0;
	if (useWhispers) {
		whispersLevel = getCommandLevel(cb.settings.whispers_users_level);
		whispersMods = getCommandLevel(cb.settings.whispers_mods_level);
		whispersModel = getCommandLevel(cb.settings.whispers_model_level);
	}
	
	// Room Control settings
	useRoomControl = (cb.settings.control_flag == 'Yes') ? 1 : 0;
	if (useRoomControl) {
		if (cb.settings.control_mods) {
			controlMods = (cb.settings.control_mods == 'Yes') ? 1 : 0;
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
		controlItems[7].level = getControlLevel(cb.settings.control_rudeness);
		controlItems[8].level = getControlLevel(cb.settings.control_rudeness);	
		controlItems[9].level = getControlLevel(cb.settings.control_rudeness);			
		controlItems[10].level = getControlLevel(cb.settings.control_graphics);
		cb.settings.control_words = (cb.settings.control_words.toLowerCase()).trim();
		
		if (cb.settings.control_words.length > 0) {
			controlWordsList = cb.settings.control_words.split(',');
			// If not empty let's snap into action
			if (controlWordsList) {
				// Create string regexp
				var strRegexp = '(';
				for (i=0; i<controlWordsList.length; i++) {
					if (i>0) strRegexp += '|';
					controlWordsList[i] = controlWordsList[i].trim();
					strRegexp += '(?=.*' + controlWordsList[i] + ')';
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
			CUSTOM_ICONS['lovers_left'] = ':mtlsanta2';
			CUSTOM_ICONS['lovers_right'] = ':mtlsanta';			
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
		
		// Save values to menuItems Array
		for (var i=0; i<menuItems.length; i++) {
			menuItems[i].tokens = parseInt(cb.settings['price_' + menuItems[i].field]);
		}
		
		// Add custom items v2
		for (var i=0; i<TIPMENU_CUSTOM_ITEMS; i++) {
			if (cb.settings['custom_menu_item'+(i+1)]) {
				var itemArray = cb.settings['custom_menu_item'+(i+1)].trim().split('--');
				if (itemArray.length == 2) {
					itemArray[0] = itemArray[0].trim();
					itemArray[1] = itemArray[1].trim();
					if (itemArray[0]) {
						if (isInteger(itemArray[1]) && itemArray[1] > 0) {
							menuItems.push({
								name: itemArray[0],
								tokens: itemArray[1],
								field: 'custom_menu_item'+(i+1),
								hide: false
							});					
						}
						else {
							if (out) out += '\n';
							out += 'TipMenu: Price for ' + (menuItems.length ? 'custom item' : 'item') + ' #' + (i+1) + ' is not an integer and cannot be loaded.';		
						}
					}
					else {
						if (out) out += '\n';
						out += 'TipMenu: Description of ' + (menuItems.length ? 'custom item' : 'item') + ' #' + (i+1) + ' is empty and cannot be loaded.';						
					}
				}
				else {
					if (out) out += '\n';
					out += 'TipMenu: ' + (menuItems.length ? 'Custom item' : 'Item') + ' #' + (i+1) + ' is not correct and cannot be loaded.';											
				}
			}
		}
		
		// Disable tipmenu with no items loaded
		useTipMenu = menuItems.length ? true : false;
	
		// Send errors
		if (out) delayedNotice(2000,out,modelName,'', botWarnColor,'bold');		
		
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
	
	// Custom Crew settings
	useCrew = (cb.settings.use_crew == 'Yes') ? 1 : 0;
	if (useCrew) {
		useCrew = (cb.settings.use_crew == 'Yes') ? 1 : 0;
		crewInitStats = (cb.settings.crew_init_stats == 'Yes') ? 1 : 0;
		crewAnnounce = (cb.settings.crew_welcome_flag == 'Yes') ? 1 : 0;
		crewWelcome = cb.settings.crew_welcome_text;		
		crewJoins = (cb.settings.crew_announce_join == 'Yes') ? 1 : 0;
		crewLefts = (cb.settings.crew_announce_leave == 'Yes') ? 1 : 0;
		crewHighlight = (cb.settings.crew_highlight != 'No highlight') ? 1 : 0;
		if (crewHighlight) crewBgColor = getHighlightColorCode(cb.settings.crew_highlight);
		
		crewExpireTime = cb.settings.crew_expire;
		if (useCrew) {
			//Crew Categories/Teams/Lists
			for (i=0; i<crewCategories.length; i++) {
				var catName = (crewCategories[i].name).toLowerCase();
				cb.settings['crew_list_' + catName] = (cb.settings['crew_list_' + catName].toLowerCase()).trim();
				if (cb.settings['crew_list_' + catName].length > 0) {
					crewCategories[i].list = cb.settings['crew_list_' + catName].split(' ');
				}
				crewCategories[i].title = stringToTag(cb.settings['crew_title_' + catName]);
				if (crewTips && crewCategories[i].tip > 0) crewCategories[i].tip = cb.settings['crew_price_' + catName];
				if (crewColors) crewCategories[i].color = cb.settings['crew_color_' + catName];			
			}
			//Crew users
			for (i=0; i<crewNames.length; i++) {
				var userName = (crewNames[i].name).replace(' ','_').toLowerCase();
				crewNames[i].user = (cb.settings['crew_' + userName + '_user']).trim();
				crewNames[i].status = (crewNames[i].user) ? 1 : 0;
				
				// Pick title only if enabled 
				if (crewNamesTags) {
					crewNames[i].title = cb.settings['crew_' + userName + '_title'];
				}		
				// Pick icon only if enabled 
				if (crewNamesIcons) {
					crewNames[i].icon = cb.settings['crew_' + userName + '_icon'];
				}								
				// Pick price only if default value > 0 (that means it is enabled)
				if (crewNamesTips && crewNames[i].tip > 0) {
					crewNames[i].tip = cb.settings['crew_' + userName + '_tip'];
				}
				// Pick color only if default color is not null (that means it is enabled)
				if (crewNamesColors && crewNames[i].color) {
					crewNames[i].color = cb.settings['crew_' + userName + '_color'];
				}
				// Pick expiry date and update status
				// only if expire is enabled and there's a user and a value entered
				if (crewNames[i].user && crewNamesExpire && crewExpireTime != 'Never') {
					
					var strDate = cb.settings['crew_' + userName + '_date'];
					var out = '';
					
					// Check date format and date <= current date
					if (isValidDate(strDate)) {
						
						// Date is valid
						var userDate = stringToDate(strDate);
						var currentDate = new Date();						
						
						// Check if date is <= current date
						if  (userDate.getTime() <= currentDate.getTime()) {
						
							// Save correct date
							crewNames[i].date = strDate;
							
							// Calculate expire date (current + X months)
							var expDate = stringToDate(crewNames[i].date);
							expDate.setMonth((parseInt(expDate.getMonth()) + parseInt(crewExpireTime)));
							
							if (currentDate.getTime() >= expDate.getTime()) {
								// Expired user
								crewNames[i].status = 2;
							}
							else {
								// User is up to date
								crewNames[i].status = 1;
							}
						}
						else {
							// Date not valid, registered in the future!
							out = 'Membership date of ' + crewNames[i].name + ' (' + crewNames[i].user + ') is not valid and could not be loaded.';
							out += '\nThis user will not expire unless you add a valid date.';
							crewNames[i].status = 1;	
						}
					}
					else {
						// If date is not empty send a warning
						if (strDate) {
							// Date not valid
							out = 'Membership date of ' + crewNames[i].name + ' (' + crewNames[i].user + ') is not valid and could not be loaded.';
							out += '\nThis user will not expire unless you add a valid date.';
						}
						crewNames[i].status = 1;						
					}
					
					if (out) delayedNotice(2000,out,modelName,'', botWarnColor,'bold');	
				}
			}
		}
	}
	
	// Legit Flag
	if (!modelIsOwner) {
		useCrew = false;
	}	
	
	// Update Commands array with settings
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
			
			case crewCommand:
				if (useCrew) {
					if (crewNames.length && crewCategories.length) {
						commandsList[i].help = 'Shows all categories and custom names and their prices';
					}
					else if (crewNames.length) {
						commandsList[i].help = ' Shows all ' + crewShortName.toLowerCase() + '  and their prices';
					} 
					else if (crewCategories.length) {
						commandsList[i].help = ' Shows all ' + crewShortName.toLowerCase() + ' ' + crewType.toLowerCase() + 's and their prices';
					}	
					commandsList[i].level = 0;
				}
			break;
			
			case 'color':
			case 'bgcolor':
				commandsList[i].level = useRoomColors ? roomColorsLevel : 5;
			break;
			
			case 'tag':
				commandsList[i].level = useRoomColors ? roomTagsLevel : 5;
			break;
			
			case 'icon':
				commandsList[i].level = useRoomColors ? roomIconsLevel : 5;
			break;
			
			case 'remove':
				commandsList[i].level = useRoomColors ? 
					 Math.min( Math.min(roomColorsLevel, roomTagsLevel), roomIconsLevel)
					 : 5;
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
			
			case crewBotCommand:
				commandsList[i].level = (useCrew && crewCategories.length) ? 4 : 5;
				if (crewCategories.length) {
					if (commandsList[i].option == 'new') {
						commandsList[i].help = 'Shows users that joined the ' + crewShortName.toLowerCase() + ' in the current session';
					}
					else if (commandsList[i].option == 'show') {
						commandsList[i].help = 'Shows all info about a ' + crewShortName.toLowerCase() + ' ' + crewType.toLowerCase();
						commandsList[i].params = '[' + crewType.toLowerCase() + ']';
						
					}
					else if (commandsList[i].option == 'add') {
						commandsList[i].help = 'Adds a user to a ' + crewShortName.toLowerCase() + ' ' + crewType.toLowerCase();
						commandsList[i].params = 'username [' + crewType.toLowerCase() + ']';
						
					}	
					else if (commandsList[i].option == 'remove') {
						commandsList[i].help = 'Removes a user from a ' + crewShortName.toLowerCase() + ' ' + crewType.toLowerCase();
						commandsList[i].params = 'username [' + crewType.toLowerCase() + ']';					
					}						
				}					
			break;

			case 'set':
			case 'uset':
				commandsList[i].level = useRoomColors ? 3 : 5;
			break;
			
			case 'filters':
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
		defaultValue: (modelIsOwner ? defaultSettings.botTheme : 'Metal Blue'),
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
			case 'roomColors':
				cb.settings_choices.push({
					name: 'room_colors_flag', 
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No (Skip to next section)', 
					defaultValue: defaultSettings.roomControl,
					label: '........................................... ( x ) [ Enable Room Colors & Tags ]'					
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
					maxLength: 15,
					required: false, 			     
					defaultValue: defaultSettings.ownerTag, 
					label: 'Your default tag (e.g. Queen)',
				});
				cb.settings_choices.push({
					name: 'model_icon',
					type: 'str',
					minLength: 0,
					maxLength: 20,
					required: false, 			     
					defaultValue: defaultSettings.ownerIcon,
					label: 'Your icon/avatar (default is ' + defaultSettings.ownerIcon + ')',
				});				
				cb.settings_choices.push({
					name: 'colors_level', 
					type: 'choice', 
					defaultValue: 'Mods and fans', 
					label: 'Who can set their custom text & BG color?'					
				});
				cb.settings_choices.push({
					name: 'tags_level', 
					type: 'choice', 
					defaultValue: 'Mods and fans', 
					label: 'Who can set their custom tag?'					
				});
				cb.settings_choices.push({
					name: 'icons_level', 
					type: 'choice', 
					defaultValue: 'Mods and fans', 
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
					defaultValue: 'Thank you [user] for your tip of [amount] tokens!',
					label: 'Thanks message (type [amount] for amount tipped)'					
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
			break;
			
			case 'whispers':
				cb.settings_choices.push({
					name: 'whispers_flag', 
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No (Skip to next section)', 
					defaultValue: defaultSettings.whispers,
					label: '............................................................ ( x ) [ Enable Whispers ]'					
				});
				cb.settings_choices.push({
					name: 'whispers_users_level', 
					type: 'choice', 
					defaultValue: 'Mods and fans', 
					label: 'Who can use whispers?'					
				});
				cb.settings_choices.push({
					name: 'whispers_mods_level', 
					type: 'choice', 
					defaultValue: 'Mods only',
					label: 'Who can send whispers to all mods?'					
				});					
				cb.settings_choices.push({
					name: 'whispers_model_level', 
					type: 'choice', 
					defaultValue: 'Mods and fans',
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
					name: 'control_graphics', 
					type: 'choice', 
					choice1: 'Greys only', 
					choice2: 'No', 		
					defaultValue: 'Greys only', 
					label: 'Remove any graphics in messages'					
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
					defaultValue: 3, 
					label: 'Warnings before silencing them?'					
				});					
			break;
			
			case 'customCrew':
				// General settings
				cb.settings_choices.push({
					name: 'use_crew',
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No (Skip to next section)', 
					defaultValue: defaultSettings.customCrew,
					label: '.................................................... ( x ) [ Enable ' + crewName + ' ]'
				});
				cb.settings_choices.push({
					name: 'crew_init_stats',
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No', 
					defaultValue: 'Yes', 
					label: 'Show stats when loading the bot'
				});		
				cb.settings_choices.push({
					name: 'crew_welcome_flag', 
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No (Skip next setting)', 
					defaultValue: 'Yes', 
					label: 'Announce ' + crewName + ' to users joining the room'
				});
				cb.settings_choices.push({
					name: 'crew_welcome_text',
					type: 'str',
					minLength: 0,
					maxLength: 240,
					required: false,
					defaultValue: crewName + ' is active! Type /' + crewCommand + ' to see all ' + crewShortName.toLowerCase() + ' ' + crewType.toLowerCase() + 's and join the fun!',
					label: crewName + ' welcome message'
				});			
				cb.settings_choices.push({
					name: 'crew_announce_join',
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No', 
					defaultValue: 'Yes', 
					label: 'Announce when members join the room'
				});
				cb.settings_choices.push({
					name: 'crew_announce_leave',
					type: 'choice', 
					choice1: 'Yes', 
					choice2: 'No', 
					defaultValue: 'Yes', 
					label: 'Announce when members leave the room'
				});
				cb.settings_choices.push({
					name: 'crew_highlight',
					type: 'choice', 
					defaultValue: defaultSettings.crewHighlight, 
					label: 'Highlight color of messages from members'
				});
				if (crewExpire) {
					cb.settings_choices.push({
						name: 'crew_expire',
						type: 'choice',
						choice1: 'Never',
						choice2: 1,
						choice3: 2,
						choice4: 3,
						choice5: 4,
						choice6: 5,	
						choice7: 6,	
						choice8: 8,
						choice9: 10,
						choice10: 12,
						defaultValue: defaultSettings.crewExpireTime, 
						label: 'Membership expire after (in months)'
					});
				}
				// Crew lists
				for (i=0; i<crewCategories.length; i++) {
					cb.settings_choices.push({
						name: 'crew_list_' + (crewCategories[i].name).toLowerCase(), 
						type: 'str',
						minLength: 0,
						maxLength: 1024,
						required: false,
						defaultValue: '',
						label: '[ ' + crewCategories[i].name + ' Members ] :: separated by space (exact usernames)',			
					});	    
					if (crewTags) {
						cb.settings_choices.push({
							name: 'crew_title_' + (crewCategories[i].name).toLowerCase(),
							type: 'str',
							minLength: 0,
							maxLength: 15,
							defaultValue: crewCategories[i].title, 
							label: 'Tag for ' + crewCategories[i].name + ' members'
						});
					}
					if (crewTips && crewCategories[i].tip > 0) {
						cb.settings_choices.push({
							name: 'crew_price_' + (crewCategories[i].name).toLowerCase(), 
							type:'int', 
							minValue: 0, 
							maxValue: 9999, 
							defaultValue: crewCategories[i].tip, 
							label: 'Tip needed to become a ' + crewCategories[i].name + ' (0=disable)'
						});
					}
					if (crewColors) {
						cb.settings_choices.push({
							name: 'crew_color_' + (crewCategories[i].name).toLowerCase(),
							type: 'choice',
							defaultValue: crewCategories[i].color, 
							label: 'Text color of ' + crewCategories[i].name + ' members',			
						});
					}
				}
				// Crew users
				for (i=0; i<crewNames.length; i++) {
					var userName = (crewNames[i].name).replace(' ','_').toLowerCase();
					cb.settings_choices.push({
						name: 'crew_' + userName + '_user', 
						type: 'str',
						minLength: 0,
						maxLength: 25,
						required: false,
						defaultValue: '',
						label: '[ ' + crewNames[i].name + ' ] :: username',			
					});	
					if (crewNamesTags) {
						cb.settings_choices.push({
							name: 'crew_' + (crewNames[i].name).toLowerCase() + '_title',
							type: 'str',
							minLength: 0,
							maxLength: 15,
							defaultValue: crewNames[i].title, 
							label: 'Tag for ' + crewNames[i].name ,
						});
					}
					if (crewNamesIcons) {
						cb.settings_choices.push({
							name: 'crew_' + (crewNames[i].name).toLowerCase() + '_icon',
							type: 'str',
							minLength: 0,
							maxLength: 18,
							defaultValue: crewNames[i].icon, 
							label: 'Icon for ' + crewNames[i].name,
						});
					}					
					if (crewNamesTips && crewNames[i].tip > 0) {
						cb.settings_choices.push({
							name: 'crew_' + userName + '_tip', 
							type:'int', 
							minValue: 0, 
							maxValue: 9999, 
							defaultValue: crewNames[i].tip, 
							label: 'Tip needed to gain/renew membership'
						});
					}
					if (crewNamesColors) {
						cb.settings_choices.push({
							name: 'crew_' + userName + '_color',
							type: 'choice',
							defaultValue: crewNames[i].color, 
							label: 'Text color of ' + crewNames[i].name,		
						});
					}
					if (crewNamesExpire) {			
						cb.settings_choices.push({
							name: 'crew_' + (crewNames[i].name).replace(' ','_').toLowerCase() + '_date', 
							type: 'str',
							minLength: 10,
							maxLength: 10,
							required: false,
							defaultValue: crewNames[i].date,
							label: 'Membership date (format dd/mm/yyyy)',			
						});
					}
				}
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
					defaultValue:  (modelIsOwner ? defaultSettings.notifiersColor : 'Theme colors'),
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
					label: 'Announce Tip Menu Single Line'
				});	
				cb.settings_choices.push({
					name: 'sepchar', 
					type: 'choice', 
					defaultValue: (modelIsOwner ? defaultSettings.tipMenuSep : 'Theme separator'),
					label: 'Separator character'	
				});
				cb.settings_choices.push({
					name: 'color_tm', 
					type:'choice', 
					label:'Color scheme', 
					defaultValue: (modelIsOwner ? defaultSettings.tipMenuColor : 'Theme colors'),
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

				// Load Tip Menu Single Lines Items into Array
				var firstItem = true;
				for (var i=0; i<menuItems.length; i++) {
					if (!menuItems[i].hide) {
						cb.settings_choices.push({
							name: 'price_' + menuItems[i].field,
							type:'int', 
							minValue: 0, 
							maxValue: 9999, 
							defaultValue: menuItems[i].tokens, 
							label: (firstItem ? 'Single Line Prices (0=disabled) :: ' : '') 
								+ menuItems[i].name 
						});
						firstItem = false;
					}
				}
				
				// Load Other Items into Array
				firstItem = true;
				for (var i=0; i<menuItems.length; i++) {
					if (menuItems[i].hide) {
						cb.settings_choices.push({
							name: 'price_' + menuItems[i].field,
							type:'int', 
							minValue: 0, 
							maxValue: 9999, 
							defaultValue: menuItems[i].tokens, 
							label: (firstItem ? 'Other Items Prices (0=disabled) :: ' : '') 
								+ menuItems[i].name 
						});
						firstItem = false;
					}
				}	
				
				// Custom Menu Items: Only for legit models!
				if (modelIsOwner) {
					for (var i=0; i<TIPMENU_CUSTOM_ITEMS; i++) {
						var strLabel = (menuItems.length ? 'Custom item' : 'Item') + ' #' + (i+1);
						
						if (i==0) strLabel += ' (e.g. Boobs--50)';
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

			// Add custom themes if model is owner
			if (modelIsOwner) {
				for (var b=0; b<CUSTOM_THEMES.length; b++) {
					customCount++;
					cb.settings_choices[i]['choice' + (customCount)] = CUSTOM_THEMES[b].name;
				}	
			}
			
			// Add bot themes
			for (var b=0; b<BOT_THEMES.length; b++) {
				customCount++;
				cb.settings_choices[i]['choice' + (customCount)] = BOT_THEMES[b].name;
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
	// Legit Bot verification and updates
	legitBot();

	// Add custom options to settings
	buildSettings();

	setSpecialDates();
	
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
	
	// Crew stats at loading
	if (useCrew && crewInitStats) {	
		if (crewNames.length && crewCategories.length) {
			var statsHead = getIcon('crew_left') + ' ' + crewShortName + ' Summary ' + getIcon('crew_right');
		}
		else if (crewNames.length) {
			var statsHead = getIcon('crew_left') + ' ' + crewShortName + ' List ' + getIcon('crew_right');
		}
		else if (crewCategories.length) {
			var statsHead = getIcon('crew_left') + ' ' + crewShortName + ' ' + crewType + 's ' + getIcon('crew_right');
		}
		var statsText = getCrewStats();	
		delayedNotice(botNoticeDelay+400,statsHead,'',botHeaderBg,botHeaderFg,'bold');
		delayedNotice(botNoticeDelay+600,statsText,'','',botTextColor,'bold');
	}
		
	// Warning for other models
	if (!modelIsOwner) {	
		delayedNotice(1800,modelWarning,modelName,'',botWarnColor,'bold');
	}	
}

init();
