// http://www.rlc-cams.com/apps/user_uploads/0/lephil/
// http://www.rlc-cams.com/apps/sourcecode/tip-multigoal-fixed/?version=&slot=0

/*
	Name:			Tip Multi-Goal
	Author:			mx2k6
	Last Modified:		2016-12-30 19:21:00+13:00

	For support enquiries, contact c9max69@gmail.com
	
	The moral right of "mx2k6" to be identified as the author of this work has been asserted.

	Version History
	============================================
	v1.0 08/02/2013: First release
	v1.1 22/02/2013: Added /stats and /reset commands.  See Description for more
	v1.2 08/03/2013: Added /skip (suggestion from jcummings)
	v1.3 12/03/2013: Added /goals command for moderators and /upnext command for broadcasters.  See Description for more
	v1.4 13/03/2013: Minor cleanup to make code more readable.  Modified /upnext to actually use the broadcaster's message instead of chat notice
	v1.5 07/04/2013: Added some debugging code so I can get to the bottom of why chat commands don't always respond
	v1.6 13/04/2013: Fixed an embarrassing bug where all broadcaster and debug commands were ignored
	v1.7 20/04/2013: Tipper leaderboard now available on /stats output - see who your top 10 tippers are
	v1.8 21/04/2013: Goal timer function now available - /timer x now sets a countdown to when the goal needs tp be in by
	v1.9 05/05/2013: Stats junkies rejoice!  /stats will now display an approximate token count per minute, to help you work out whether you'll make more tokens camming or flipping burgers.  Also, tip goal king now stands out more!
	v1.10 05/05/2013: Now optionally highlight your highest total tipper (light purple currently - make suggestions people!) so the one who contributes the most can show off too!
	v1.11 05/05/2013: Timer stability improvements.  Added timer debugging code.  Type '/verbose' (broadcaster ONLY) to get precise dates and times of timer interval for when requesting support
	v1.12 18/05/2013: Clarified stats text relating to per minute figures.  Changed highest tipper to no longer have a green "fanclub" name until such time as we can change the colour to a custom one
	v1.13 31/05/2013: Added ability for high tippers to "opt out" of being highlighted by typing "/donotwant" after they tip
	v1.14 05/06/2013: Added ability to directly manipulate tokens toward goals with /addtokens and /removetokens.  See /help for more
	v1.15 02/07/2013: Timer now automatically clears if a goal is met rather than continuing on to zero
	v1.16 03/07/2013: Added a sixth goal... HOW MANY DO YOU PEOPLE NEED?!?  Also, fixed a defect where total highest tipper got notified even when their highlight is disabled
	v1.17 04/07/2013: Allowed looping final goal if broadcaster chooses to
	v1.18 05/07/2013: Time's up message (when timer is in use) now uses a graphic to draw attention to it
	v1.19 19/07/2013: Notices (where applicable) now stand out more
	v1.20 10/08/2013: Colour schemes for the tipper highlights (suggestion from ashley93bad), defect fixes for opt-out
	v1.21 17/08/2013: More colour schemes added
	v1.22 28/09/2013: Fixed an issue with /skip which could reduce ongoing goal token quantities.  Added manual progression mode- app eats tips once each goal is met until superuser types /continue command
	v1.23 16/11/2013: Added "Random" colour scheme
	v1.24 07/12/2013: Added "Purple" colour scheme, changed "Timer Countdown" warnings to be orange (stand out more)
	v1.25 21/12/2013: Changed to use new cb.sendNotice instead of cb.chatNotice, so we can send messages to entire groups
	v1.26 06/01/2014: Removed redundant "Amethyst" and "Ocean" schemes.  Cleaned up colour codes so I can add new themes easier
	v1.27 10/01/2014: Added debugging code in case of an error I've been alerted to.  IF YOU SEE THE NASTY ERROR MESSAGE, LET ME KNOW!
	v1.28 20/01/2014: Updated parseOptions to quit parsing goals if a blank goal is found, which occurs if settings are incorrectly filled in
	v1.29 01/02/2014: Added new "hide total tips" option, stats beefed up a (little) bit.  Added '/support' command for broadcaster to grant developer broadcaster access.  See notes!
	v1.30 03/02/2014: Removed "/verbose" command.  The verbose data was effectively useless anyway, so now if verbose is activated by the developer cb.log() is used instead.  Also, fix for potential crash if random colour scheme used.
						Also ran Resharper over the code to clean it up a bit
	v1.31 06/02/2014: Fixed defect which caused panel to not appear until someone tipped
	v1.32 09/03/2014: Added notification functions so that important actions are notified
	v1.33 01/05/2014: Added ability to add goals at runtime with /add <tokens> <description>, or remove the final goal with /delete
	v1.34 23/05/2014: Fixed a grammatical error in the panel that's been pissing me off for months
	v1.35 25/05/2014: Added options for what to do at end of final goal, go hidden/repeat/default
	v1.36 26/05/2014: Added ability to start hidden show at any time, no longer count entry fees towards primary goal
	v1.37 27/05/2014: Fixed defect where crash could occur at final goal
	v1.38 31/05/2014: Fixed defect where moderator notice didn't go to moderators.  Also made it so fanclub members and mods get free admission to hidden show components.  Fixed where hidden show wouldn't start unless it was set as the end goal action
	v1.39 21/06/2014: Rationalised some settings.  Slight refactoring in preparation for much larger refactoring.  Fixed defect where mod notices went to entirely too many people.  Goal setup a little more resilient
	v1.40 24/11/2014: Changed so moderator messages go to room owner as well
	v1.41 20/01/2015: Moderators now auto-added to hidden show (if they enter the room after the app starts.  I can't detect them otherwise, and I'm not wasting CPU cycles checking the ACL every time they speak)
	v1.42 08/02/2015: Changed so moderator messages only go to room owner once.  For fuck sake.  Also, starting a goal description with a number and a / repeats it that number times
	v1.43 12/03/2015: Added preshow entry fee option.  Also, fuck yo shit messaging.  I think it works now.  It probably doesn't.  Whatever.
	v1.44 13/03/2015: /addtokens now works for moderators if enabled.  /removetokens does NOT.
	v1.45 30/11/2015: New setting so that you can choose NOT to change the room subject on each tip. I think. Unless I got it backwards, or something.
	v1.46 17/01/2016: Fixed defect where the application would crash if /upnext were used on the final goal
	v1.47 31/01/2016: We no longer change the subject if it has been less than a defined number of tokens worth of one token tips. Yellow walls yo (thanks MissJanieJones)
	v1.48 18/06/2016: Add a 60 second delay to goal-driven Hidden Show, because it's a little abrupt right now. Some refactoring relating to timers which will be rolled out more in v2
	v1.49 19/06/2016: Add a "hashtags" setting to drop hashtags or other stuff at the end of the subject (after the tokens left counter)
	v1.50 20/06/2016: Bug fixes
	v1.51 26/06/2016: More bug fixes, added support for gifting Hidden Show tickets
	v1.52 28/08/2016: Notice when hidden cam show is going to start to encourage tipping to join. Repeats at 30 second marker and at start
    v1.53 30/12/2016: Bug fixes. Like an Uber update but less descriptive (somehow)

	To-Do
	============================================
	* Add minimum tip to count towards hidden show?
	* Alter un-goal to allow decrementing to shut down a hidden show if not manually started

	Credits and Props
	============================================
	Based on the bog standard tip goal app, with multiple goals, tip goal king, goal timers, some random crap and less general suckfulness.
*/

var Application = {
	Name: "Tip Multi-Goal",		// The name of the application
	Version: 1.53,				// The current version of the application
	Author: "mx2k6",			// The author of this version.  Don't change this unless you modified something!
	OriginalAuthor: "mx2k6",		// The original author, I.E. me.  If you change this, you're a cunt.  It's not like it gets displayed anywhere
	Debug: false,				// Whether the application is in debug (verbose) mode.  Don't change this in prod, or you're a retard
	StartupTime: null,			// The time the application started up.  Don't set this, it gets set at runtime
	Constants: {
		Goals: 8					// The number of goals to permit configuration of in the startup settings window - add to UserConstants below to override per user
	},
};

var TimerManager = {
	Timers: [],
	onElapsed: function () {
		var now = new Date();
		now.setMilliseconds(0);

		for (var timerId in TimerManager.Timers) {
			if (!(TimerManager.Timers[timerId] instanceof Timer)) {
				delete TimerManager.Timers[timerId];
				continue;
			} else {
				var timer = TimerManager.Timers[timerId];
				if (now <= timer.getDeadline() && now >= timer.getDeadline()) {
					debugLog("Timer {0} matches current time, calling onElapsed event".format(timerId));
					timer.onElapsed();
					delete TimerManager.Timers[timerId];
					break;
				}
			}
		}

		cb.setTimeout(TimerManager.onElapsed, 1000);
	},
	addTimer: function (id, timer) {
		if (!(timer instanceof Timer)) return false;
		debugLog("Adding timer with id {0}".format(id));
		TimerManager.Timers[id] = timer;
		return true;
	},
	removeTimer: function (id) {
		if (isUndefined(TimerManager.Timers[id])) return true;
		delete TimerManager.Timers[id];
		if (isUndefined(TimerManager.Timers[id])) return true;
		return false
	},
	initialise: function () {
		cb.setTimeout(TimerManager.onElapsed, 1000);
	},
};

/* Setup some common objects - these will be utilised more as we approach v2 */
function Timer(elapsed, seconds) {
	var now = new Date();
	now.setSeconds(seconds);
	now.setMilliseconds(0);

	this.deadline = now;
	this.onElapsed = elapsed;
}
Timer.prototype.getDeadline = function () { return this.deadline; };

var UserConstants = {
	"mx2k6": { Goals: 3 },
	"lbow": { Goals: 16 },
	"chessslut": { Goals: 10 },
	"TheLadyRousseau": { Goals: 25 },
	"420stonerchick": { Goals: 10 },
};

if (cb != null) {
	if (UserConstants[cb.room_slug] != undefined) {
		Application.Constants = UserConstants[cb.room_slug];
		Application.Constants.Overriden = true;
	}
}

var Tipping = {
	CurrentGoal: {
		Number: 0,
		TargetAmount: 0,
		CurrentAmount: 0,
		Halted: false,
	},
	Leaderboard: {
		Leaders: {
			Highest: {
				Username: null,
				Amount: 0,
				OptOut: false,
			},
			HighestTotal: {
				Username: null,
				Amount: 0,
				OptOut: false,
			},
			Lowest: {
				Username: null,
				Amount: 0,
				OptOut: false,
			},
			MostRecent: {
				Username: null,
				Amount: 0,
				OptOut: false,
			}
		},
		All: [],
	},
	VirtualTotal: 0,
	ActualTotal: 0,
	Finality: false,
	AdvanceTracker: {
		Count: 0,
		shouldAdvance: function (tokens) {
			if (this.Count >= 15 || tokens > settings.yellow_wall_threshold) {
				this.Count = 0;
				return true;
			} else {
				if (this.Count == 1) {
					Messenger.sendInfoMessage("A yellow wall has started! We're turning off room subject updates until either 15 tips have been received, or someone tips more than {0}.".format(settings.yellow_wall_threshold), cb.room_slug, null);
				}
				this.Count++;
				return false;
			}
		}
	}
};

var settingsHelper = {
	parseBoolean: function (str) {
		return (str == "Yes");
	}
};

// vars
var subject_is_final = false;

if (cb == null) {
	var cb = {
		changeRoomSubject: function (new_subject) { },
		drawPanel: function () { },
		log: function (message) { },
		onDrawPanel: function (func) { },
		onEnter: function (func) { },
		onLeave: function (func) { },
		onMessage: function (func) { },
		onShowStatus: function (func) { },
		onTip: function (func) { },
		room_slug: '',
		sendNotice: function (message, to_user, background, foreground, weight, to_group) { },
		setTimeout: function (func, msec) { },
		settings_choices: [],
		settings: {},
		tipOptions: function (func) { },
		limitCam_start: function (message, allowed_users) { },
		limitCam_stop: function () { },
		limitCam_addUsers: function (allowed_users) { },
		limitCam_removeUsers: function (removed_users) { },
		limitCam_removeAllUsers: function () { },
		limitCam_userHasAccess: function (user) { },
		limitCam_allUsersWithAccess: function () { },
		limitCam_isRunning: function () { },
	};
}
// colours
var Colours = { AliceBlue: "#F0F8FF", AntiqueWhite: "#FAEBD7", Aqua: "#00FFFF", Aquamarine: "#7FFFD4", Azure: "#F0FFFF", Beige: "#F5F5DC", Bisque: "#FFE4C4", Black: "#000000", BlanchedAlmond: "#FFEBCD", Blue: "#0000FF", BlueViolet: "#8A2BE2", Brown: "#A52A2A", BurlyWood: "#DEB887", CadetBlue: "#5F9EA0", Chartreuse: "#7FFF00", Chocolate: "#D2691E", Coral: "#FF7F50", CornflowerBlue: "#6495ED", Cornsilk: "#FFF8DC", Crimson: "#DC143C", Cyan: "#00FFFF", DarkBlue: "#00008B", DarkCyan: "#008B8B", DarkGoldenRod: "#B8860B", DarkGrey: "#A9A9A9", DarkGreen: "#006400", DarkKhaki: "#BDB76B", DarkMagenta: "#8B008B", DarkOliveGreen: "#556B2F", DarkOrange: "#FF8C00", DarkOrchid: "#9932CC", DarkRed: "#8B0000", DarkSalmon: "#E9967A", DarkSeaGreen: "#8FBC8F", DarkSlateBlue: "#483D8B", DarkSlateGrey: "#2F4F4F", DarkTurquoise: "#00CED1", DarkViolet: "#9400D3", DeepPink: "#FF1493", DeepSkyBlue: "#00BFFF", DimGrey: "#696969", DodgerBlue: "#1E90FF", FireBrick: "#B22222", FloralWhite: "#FFFAF0", ForestGreen: "#228B22", Fuschia: "#FF00FF", Gainsboro: "#DCDCDC", GhostWhite: "#F8F8FF", Gold: "#FFD700", GoldenRod: "#DAA520", Grey: "#808080", Green: "#008000", GreenYellow: "#ADFF2F", HoneyDew: "#F0FFF0", HotPink: "#FF69B4", IndianRed: "#CD5C5C", Indigo: "#4B0082", Ivory: "#FFFFF0", Khaki: "#F0E68C", Lavender: "#E6E6FA", LavenderBlush: "#FFF0F5", LawnGreen: "#7CFC00", LemonChiffon: "#FFFACD", LightBlue: "#ADD8E6", LightCoral: "#F08080", LightCyan: "#E0FFFF", LightGoldenRodYellow: "#FAFAD2", LightGrey: "#D3D3D3", LightGreen: "#90EE90", LightPink: "#FFB6C1", LightSalmon: "#FFA07A", LightSeaGreen: "#20B2AA", LightSkyBlue: "#87CEFA", LightSlateGrey: "#778899", LightSteelBlue: "#B0C4DE", LightYellow: "#FFFFE0", Lime: "#00FF00", LimeGreen: "#32CD32", Linen: "#FAF0E6", Magenta: "#FF00FF", Maroon: "#800000", MediumAquaMarine: "#66CDAA", MediumBlue: "#0000CD", MediumOrchid: "#BA55D3", MediumPurple: "#9370DB", MediumSeaGreen: "#3CB371", MediumSlateBlue: "#7B68EE", MediumSpringGreen: "#00FA9A", MediumTurquoise: "#48D1CC", MediumVioletRed: "#C71585", MidnightBlue: "#191970", MintCream: "#F5FFFA", MistyRose: "#FFE4E1", Moccasin: "#FFE4B5", NavajoWhite: "#FFDEAD", Navy: "#000080", OldLace: "#FDF5E6", Olive: "#808000", OliveDrab: "#6B8E23", Orange: "#FFA500", OrangeRed: "#FF4500", Orchid: "#DA70D6", PaleGoldenRod: "#EEE8AA", PaleGreen: "#98FB98", PaleTurquoise: "#AFEEEE", PaleVioletRed: "#DB7093", PapayaWhip: "#FFEFD5", PeachPuff: "#FFDAB9", Peru: "#CD853F", Pink: "#FFC0CB", Plum: "#DDA0DD", PowderBlue: "#B0E0E6", Purple: "#800080", Red: "#FF0000", RosyBrown: "#BC8F8F", RoyalBlue: "#4169E1", SaddleBrown: "#8B4513", Salmon: "#FA8072", SandyBrown: "#F4A460", SeaGreen: "#2E8B57", SeaShell: "#FFF5EE", Sienna: "#A0522D", Silver: "#C0C0C0", SkyBlue: "#87CEEB", SlateBlue: "#6A5ACD", SlateGrey: "#708090", Snow: "#FFFAFA", SpringGreen: "#00FF7F", SteelBlue: "#4682B4", Tan: "#D2B48C", Teal: "#008080", Thistle: "#D8BFD8", Tomato: "#FF6347", Turquoise: "#40E0D0", Violet: "#EE82EE", Wheat: "#F5DEB3", White: "#FFFFFF", WhiteSmoke: "#F5F5F5", Yellow: "#FFFF00", YellowGreen: "#9ACD32" };

var tipper_colours = {
	legacy: { high_tipper_colour: '#9F9', high_total_colour: '#CCF' },
	pink: { high_tipper_colour: Colours.Pink, high_total_colour: Colours.Violet },
	forest: { high_tipper_colour: Colours.SpringGreen, high_total_colour: Colours.LimeGreen },
	sky: { high_tipper_colour: Colours.PowderBlue, high_total_colour: Colours.SkyBlue },
	purple: { high_tipper_colour: Colours.Orchid, high_total_colour: Colours.MediumSlateBlue },
	sunshine: { high_tipper_colour: Colours.Yellow, high_total_colour: Colours.Gold },
};

var Groups = {
	TokenHolders: 'cyan',
	Tippers: 'blue',
	Fans: 'green',
	Moderators: 'red',
};

var goalSettings = [];
for (var gSetting = 1; gSetting <= Application.Constants.Goals; gSetting++) {
	goalSettings.push({ name: 'goal_' + gSetting + '_tokens', label: 'Goal ' + gSetting + ' Token Amount', type: 'int', minValue: 1, defaultValue: 200, required: (gSetting === 1) });
	goalSettings.push({ name: 'goal_' + gSetting + '_description', label: 'Goal ' + gSetting + ' Description', type: 'str', minLength: (gSetting === 1 ? 1 : 0), maxLength: 255, required: (gSetting === 1) });
}

cb.settings_choices = [
	{ name: 'action_on_finality', label: 'After last goal', type: 'choice', choice1: 'Default', choice2: 'Loop last goal', choice3: 'Start hidden show' },
	{ name: 'hidden_preshow_entry_fee', label: 'Tokens to enter hidden show before starting (if selected)', type: 'int', defaultValue: 1, required: true },
	{ name: 'hidden_show_entry_fee', label: 'Tokens to enter hidden show after starting (if selected)', type: 'int', defaultValue: 50, required: true },
	{ name: 'finality_message', label: 'Final Goal Met Subject', type: 'str', minLength: 1, maxLength: 255, defaultValue: 'Goal reached!  Thanks to all tippers!' },
	{ name: 'progression_mode', label: 'Progression Mode', type: 'choice', choice1: 'Automatic', choice2: 'Manual', defaultValue: 'Automatic' },
	{ name: 'tipper_colour_scheme', label: 'Tipper Highlight Colour Scheme', type: 'choice', choice1: 'None', choice2: 'Pink', choice3: 'Forest', choice4: 'Sky', choice5: 'Purple', choice6: 'Sunshine', choice7: 'Legacy', choice8: 'Random', defaultValue: 'Legacy' },
	{ name: 'show_timer_in_subject', label: 'Add time remaining to subject if running?', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'No' },
	{ name: 'mod_allow_broadcaster_cmd', label: 'Allow mods to use broadcaster commands?', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'No' },
	{ name: 'hide_token_haul', label: 'Hide your total token haul?', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'No' },
	{ name: 'change_subject_on_tip', label: 'Change the subject for each tip (if no, tokens remaining not shown in subject)', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'Yes' },
	{ name: 'yellow_wall_threshold', label: 'Yellow wall threshold (this or lower is yellow wall and will not change subject - 0 to disable)', type: 'int', defaultValue: 0, required: true },
	{ name: 'subject_suffix', label: 'Hashtags (appended after the goal and token counter to the room subject)', type: 'str', required: false },
];

cb.settings_choices = cb.settings_choices.concat(goalSettings);

var settings = {
	progression_mode_manual: false,
	goals: [],
	action_on_finality: 'default',
	hidden_show_entry_fee: 0,
	finality_message: 'Goal reached!  Thanks to all tippers!',
	highlight_theme: 'legacy',
	timer_in_subject: false,
	allow_mod_superuser_cmd: false,
	hide_token_haul: false,
	support_mode: false,
	goals_defined: 0,
	change_subject_on_tip: true,
	yellow_wall_threshold: 0,
	subject_suffix: '',
	toString: function () {
		var settingsStr = "";
		for (var prop in this) {
			if (typeof (this[prop]) == "string" || typeof (this[prop]) == "boolean" || typeof (this[prop]) == "number") {
				settingsStr += ", " + prop + ": '" + this[prop] + "'";
			}
		}
		cb.log(settingsStr.substring(2));
		return settingsStr.substring(2);
	}
};

var caches = {
	panel: {}
};

var Messenger = {
	sendModeratorNotice: function (str) {
		this.sendGenericMessage(str, Colours.Blue, null, cb.room_slug, Groups.Moderators);
	},
	sendErrorMessage: function (str, recipient, group) {
		this.sendGenericMessage(str, Colours.Red, null, recipient, group);
	},
	sendWarningMessage: function (str, recipient, group) {
		this.sendGenericMessage(str, Colours.Orange, null, recipient, group);
	},
	sendSuccessMessage: function (str, recipient, group) {
		this.sendGenericMessage(str, Colours.DarkGreen, null, recipient, group);
	},
	sendInfoMessage: function (str, recipient, group) {
		this.sendGenericMessage(str, Colours.Black, null, recipient, group);
	},
	sendGenericMessage: function (str, colour, background, recipient, group) {
		if (!isUndefined(recipient) && !isUndefined(group)) {
			cb.sendNotice(str, null, background, colour, 'bold', group);
			cb.sendNotice(str, recipient, background, colour, 'bold', null);
		}
		if (!isUndefined(recipient) && isUndefined(group)) cb.sendNotice(str, recipient, background, colour, 'bold', null);
		if (isUndefined(recipient) && !isUndefined(group)) cb.sendNotice(str, null, background, colour, 'bold', group);
		if (isUndefined(recipient) && isUndefined(group)) cb.sendNotice(str, null, background, colour, 'bold', null);
	},
};

function internalGetTipperTheme() {
	if (settings.highlight_theme === 'random') {
		var themeBail = Math.floor(Math.random() * 6);
		var themeIndex = 1;
		debugLog("Random theme selected, index " + themeBail);
		for (var themeName in tipper_colours) {
			if (themeIndex == themeBail && tipper_colours[themeName] !== undefined) {
				debugLog("Selected theme: [Rand] " + themeName);
				return tipper_colours[themeName];
			}
			themeIndex++;
		}
		return tipper_colours.legacy;
	} else {
		debugLog("Selected theme: '" + settings.highlight_theme + "'");
		return tipper_colours[settings.highlight_theme];
	}
}

function getTipperTheme() {
	var theme = internalGetTipperTheme();
	return (theme === undefined || theme == null) ? tipper_colours.legacy : theme;
}

function debugLog(message) {
	if (Application.Debug) cb.log("[{0}] TMG: {1}".format(new Date().toString(), message));
}

var goalTimer = {
	secondsDown: 60,
	timeRemaining: 0,
	timerRunning: false,
	timerReallyRunning: false,
	spamMessage: "Time's running out!  Only %time minutes left to tip to the goal!",
	timesUpMessage: ":timesup Sorry, this goal was not met.",
	hookOnTimer: function () {

	},
	startTimer: function (minutes) {
		debugLog("Timer started at " + new Date().toString());
		this.timeRemaining = minutes;
		this.timerRunning = true;
		this.timerReallyRunning = true;
		this.hookOnTimer();
		this.announce();
		cb.setTimeout(function () { goalTimer.onTimer(); }, 60000);
	},
	stopTimer: function () {
		debugLog("Timer stopped at " + new Date().toString());
		this.timerRunning = false;
		this.hookOnTimer();
	},
	onTimer: function () {
		this.timerReallyRunning = false;
		if (this.timerRunning) {
			debugLog("Timer interval reached at " + new Date().toString());
			this.timeRemaining--;
			this.hookOnTimer();
			this.announce();
			if (this.timeRemaining === 0) {
				debugLog("Timer expired at " + new Date().toString());
				this.timerRunning = false;
			} else {
				this.timerReallyRunning = true;
				cb.setTimeout(function () { goalTimer.onTimer(); }, 60000);
			}
		}
	},
	getExtraText: function () {
		if (this.timerRunning) {
			return this.timeRemaining + " min left";
		} else {
			return "";
		}
	},
	announce: function () {
		if (this.timeRemaining > 0 && !settings.timer_in_subject) {
			Messenger.sendWarningMessage(this.spamMessage.replace("%time", this.timeRemaining), null);
		} else if (this.timeRemaining === 0) {
			Messenger.sendErrorMessage(this.timesUpMessage, null);
		}
	}
};

var hiddenShow = {
	enabled: false,
	message: '',
	price: 0,
	preshowPrice: 0,
	setPrice: function (price) {
		this.price = parseInt(price);
	},
	setPreshowPrice: function (price) {
		this.preshowPrice = price;
	},
	setMessage: function (message) {
		this.message = message;
	},
	setEnabled: function (enabled) {
		this.enabled = enabled;
	},
	getPrice: function () {
		return this.price;
	},
	getPreshowPrice: function () {
		return this.preshowPrice;
	},
	getMessage: function () {
		return this.message;
	},
	getEnabled: function () {
		return this.enabled;
	},
	_getTokenizedMessage: function () {
		return "{0}\n\n{1}".format(this.message, "Tip {0} tokens to see the show".format(this.price));
	},
	getIsRunning: function () {
		return cb.limitCam_isRunning();
	},
	reset: function () {
		if (!this.enabled) return;

		debugLog("Resetting hiddenShow");

		cb.limitCam_removeAllUsers();
		if (!cb.limitCam_isRunning()) return;
		this.stop();
	},
	start: function () {
		if (!this.enabled) return;
		if (cb.limitCam_isRunning()) return;

		debugLog("Starting hiddenShow");

		cb.limitCam_start(this._getTokenizedMessage());
	},
	stop: function () {
		if (!this.enabled) return;

		debugLog("Stopping hiddenShow");

		if (!cb.limitCam_isRunning()) return;
		cb.limitCam_stop();
	},
	addUserWithTip: function (user, tokens) {
		if (!this.enabled) return false;
		if (cb.limitCam_userHasAccess(user)) return false;
		if (cb.limitCam_isRunning() && tokens < this.price) return false;
		if (!cb.limitCam_isRunning() && tokens < this.preshowPrice) return false;

		this.addUser(user);
		return true;
	},
	addUser: function (user) {
		if (cb.limitCam_userHasAccess(user)) return;

		debugLog("Adding user {0} to hiddenShow ACL".format(user));

		cb.limitCam_addUsers([user]);
	},
	removeUser: function (user) {
		if (!cb.limitCam_userHasAccess(user)) return;

		debugLog("Removing user {0} from hiddenShow ACL".format(user));

		cb.limitCam_removeUsers([user]);
	},
	checkUser: function (user) {
		return cb.limitCam_userHasAccess(user);
	},
	getAllUsers: function () {
		return cb.limitCam_allUsersWithAccess();
	},
};

function getCurrentGoalDescription() {
	if (!isUndefined(settings.goals[Tipping.CurrentGoal.Number])) {
		return settings.goals[Tipping.CurrentGoal.Number].description;
	} else {
		return "[unknown goal]";
	}
}

function getPreviousGoalAmount() {
    return settings.goals[Tipping.CurrentGoal.Number - 1].tokens;
}

function getCurrentGoalAmount() {
	try {
		return settings.goals[Tipping.CurrentGoal.Number].tokens;
	} catch (e) {
		Messenger.sendErrorMessage(e.toString() + ".  You have encountered an error in Tip Multi-Goal that should not happen.  Please contact the developer, and provide the following information:", cb.room_slug);
		Messenger.sendErrorMessage(settings.toString(), cb.room_slug);
		Messenger.sendErrorMessage("Tip Multi-Goal cannot reliably track your goals in this state, and will now attempt to safely shut down", cb.room_slug);
		unload();
		return 1;
	}
}

function getSumTotalGoal() {
	var totalGoal = 0;
	for (var i = 0; i < settings.goals.length; i++) {
		totalGoal += settings.goals[i].tokens;
	}
	return totalGoal;
}

function getAllGoals() {
	var allGoals = "";
	for (var i = 0; i < settings.goals.length; i++) {
		allGoals += settings.goals[i].description + ' (' + settings.goals[i].tokens + ' tokens)\n';
	}
	allGoals += "-- Tokens if all goals met: " + getSumTotalGoal();
	return allGoals;
}

function getLeaderBoard() {
	var leaderboard = "";
	for (var idx = 0; idx < Tipping.Leaderboard.All.length && idx < 10; idx++) {
		if (Tipping.Leaderboard.All[idx] !== undefined) {
			leaderboard += Tipping.Leaderboard.All[idx].name + ' (' + Tipping.Leaderboard.All[idx].tokens + ')\n';
		}
	}
	return leaderboard;
}

function getTokensPerMinute() {
	var now = new Date();
	var timespan = now - Application.StartupTime;

	var tokensPerMin = ((Math.round(Tipping.ActualTotal * 10) / 10) / (Math.round(timespan / 1000 / 60 * 10) / 10));
	return (Math.round(tokensPerMin * 10) / 10);
}

function getDollarsPerMinute() {
	return (0.05 * Math.floor(getTokensPerMinute())).toFixed(2);
}

function getTotalDollars() {
	return (0.05 * Tipping.VirtualTotal).toFixed(2);
}

function skipGoal() {
	Tipping.CurrentGoal.CurrentAmount = 0;
	nextGoal();
	checkFinality(true);
	recachePanel();
}

function nextGoal() {
	Tipping.CurrentGoal.Number++;
	if (settings.goals[Tipping.CurrentGoal.Number] != undefined && settings.goals[Tipping.CurrentGoal.Number].hide) {
		Messenger.sendWarningMessage("Hidden Show will start in one minute! Tip {0} before the start to join!".format(hiddenShow.getPreshowPrice()));
		for (var user in hiddenShow.getAllUsers()) {
			if (!isUndefined(user)) Messenger.sendSuccessMessage("You are in the Hidden Show! Thanks for your contribution!", user);
		}
		TimerManager.addTimer("startHiddenShow" + Tipping.CurrentGoal.toString(), new Timer(function () {
			Messenger.sendWarningMessage("Hidden Show has started! Tip {0} to join!".format(hiddenShow.getPrice()));
			hiddenShow.start();
		}, 60));
		TimerManager.addTimer("warnHiddenShow" + Tipping.CurrentGoal.toString(), new Timer(function () {
			Messenger.sendWarningMessage("Hidden Show will start in 30 seconds! Tip {0} before the start to join!".format(hiddenShow.getPreshowPrice()));
		}, 30));
	}
}

function continueProgression() {
	if (!settings.progression_mode_manual || !Tipping.CurrentGoal.Halted) return;
	Tipping.CurrentGoal.Halted = false;
	skipGoal();
}

function getNextGoalAnnouncement() {
	if (settings.goals[Tipping.CurrentGoal.Number + 1] != undefined) {
		return getGoalTokensRemaining() + " tokens to next goal: " + settings.goals[Tipping.CurrentGoal.Number + 1].description;
	} else {
		return "It's the final goal! Keep tipping!";
	}
}

function checkFinality(shouldSetSubject) {
	if (Tipping.CurrentGoal.Number >= settings.goals.length) {
		debugLog("Current goal is greater than goals defined; running action {0}".format(settings.action_on_finality));
		if (settings.action_on_finality == 'loop') {
			Tipping.CurrentGoal.Number--;
			Tipping.Finality = false;
		} else if (settings.action_on_finality == 'default') {
			Tipping.Finality = true;
		} else if (settings.action_on_finality == 'hidden') {
			if (!Tipping.Finality) {
				TimerManager.addTimer("startHiddenShowFinal", new Timer(function () {
					hiddenShow.start();
				}, 60));
				Messenger.sendWarningMessage("The final goal has been met! The Hidden Show starts in 60 seconds!");
				for (var user in hiddenShow.getAllUsers()) {
					Messenger.sendSuccessMessage("You are in the Hidden Show! Thanks for your contribution!", user);
				}
			}
			Tipping.Finality = true;
		}
	} else {
		Tipping.Finality = false;
	}
	if (shouldSetSubject) {
		updateRoomSubject();
	}
	recachePanel();
}

function getGoalTokensRemaining() {
	var r = getCurrentGoalAmount() - Tipping.CurrentGoal.CurrentAmount;
	return (r < 0) ? 0 : r;
}

function formatUsername(val) {
	return (val === null || val === undefined) ? "--" : val.substring(0, 12);
}

function updateRoomSubject() {
	var newSubject = "";
	if (subject_is_final && Tipping.Finality) {
		return;
	}
	if (Tipping.Finality) {
		debugLog("Final goal met - notifying broadcaster and setting finality");
		Messenger.sendSuccessMessage("Your final goal has been met!  You can type '/reset' to start again from zero.", cb.room_slug);
		newSubject = settings.finality_message;
		subject_is_final = true;
	} else {
		if (settings.change_subject_on_tip) {
			newSubject = getCurrentGoalDescription() + " [" + getGoalTokensRemaining() + " tokens left]";
		} else {
			newSubject = getCurrentGoalDescription();
		}
		if (settings.timer_in_subject === "Yes" && goalTimer.timerRunning) {
			newSubject += " (" + goalTimer.getExtraText() + ")";
		}
		subject_is_final = false;
	}
	if (!isUndefined(settings.subject_suffix) && settings.subject_suffix != '') {
		newSubject += " {0}".format(settings.subject_suffix);
	}

	debugLog("Changing subject to: " + newSubject);
	cb.changeRoomSubject(newSubject);
}

function recordTip(username, tokens, countsToActual) {
	var tipperFound = false;
	var shouldSetSubject = (settings.change_subject_on_tip && Tipping.AdvanceTracker.shouldAdvance(tokens));
	var actualTokens = tokens;

	Tipping.VirtualTotal += tokens;

	if (countsToActual) {
		Tipping.ActualTotal += actualTokens;

		Tipping.Leaderboard.Leaders.MostRecent.Amount = tokens;
		Tipping.Leaderboard.Leaders.MostRecent.Username = username;

		if (tokens > Tipping.Leaderboard.Leaders.Highest.Amount) {
			if (Tipping.Leaderboard.Leaders.Highest.Username !== username && settings.highlight_theme != 'none') {
				Messenger.sendInfoMessage("You are now the highest tipper.  If you do not want your name highlighted in chat, simply type the command '/donotwant' (without quotes) now", username);
				Tipping.Leaderboard.Leaders.Highest.OptOut = false;
			}
			Tipping.Leaderboard.Leaders.Highest.Amount = tokens;
			Tipping.Leaderboard.Leaders.Highest.Username = username;
		}
		if (tokens <= Tipping.Leaderboard.Leaders.Lowest.Amount || Tipping.Leaderboard.Leaders.Lowest.Amount == 0) {
			Tipping.Leaderboard.Leaders.Lowest.Amount = tokens;
			Tipping.Leaderboard.Leaders.Lowest.Username = username;
		}

		var totalTokens = tokens;
		for (var idx = 0; idx < Tipping.Leaderboard.All.length; idx++) {
			if (Tipping.Leaderboard.All[idx].name == username) {
				Tipping.Leaderboard.All[idx].tokens += tokens;
				totalTokens = Tipping.Leaderboard.All[idx].tokens;
				tipperFound = true;
				break;
			}
		}
		if (!tipperFound) {
			Tipping.Leaderboard.All.push({ name: username, tokens: tokens });
		}
		Tipping.Leaderboard.All.sort(function (a, b) {
			return b.tokens - a.tokens;
		});

		if (Tipping.Leaderboard.Leaders.HighestTotal.Username !== Tipping.Leaderboard.All[0].name && settings.highlight_theme != 'none') {
			Messenger.sendInfoMessage("You are now the highest total tipper.  If you do not want your name highlighted in chat, simply type the command '/donotwant' (without quotes) now", Tipping.Leaderboard.All[0].name);
			Tipping.Leaderboard.Leaders.HighestTotal.OptOut = false;
		}
		Tipping.Leaderboard.Leaders.HighestTotal.Username = Tipping.Leaderboard.All[0].name;
		Tipping.Leaderboard.Leaders.HighestTotal.Amount = Tipping.Leaderboard.All[0].tokens;

		if (hiddenShow.addUserWithTip(username, totalTokens) && hiddenShow.getEnabled()) {
			Messenger.sendSuccessMessage("Thanks, {0}!  Your tip gets you into the hidden show! You can also gift this ticket to someone else with '/gift <user>'. Enjoy!".format(username), username);
			tokens -= (hiddenShow.getIsRunning() ? hiddenShow.getPrice() : 0);
			if (Tipping.CurrentGoal.CurrentAmount + tokens < 0) tokens = Tipping.CurrentGoal.CurrentAmount * -1;
		}
	}

	Tipping.CurrentGoal.CurrentAmount += tokens;

	if (!Tipping.Finality) {
		while (Tipping.CurrentGoal.CurrentAmount >= getCurrentGoalAmount()) {
			if (Tipping.CurrentGoal.CurrentAmount == getCurrentGoalAmount() && settings.progression_mode_manual) dontSetSubject = true;
			if (!settings.progression_mode_manual || Tipping.CurrentGoal.Number == (settings.goals.length - 1)) {
				debugLog("Total tipped has exceeded current goal - incrementing step");
				if (goalTimer.timerRunning) goalTimer.stopTimer();
				Tipping.CurrentGoal.CurrentAmount = Tipping.CurrentGoal.CurrentAmount - getCurrentGoalAmount();
				Messenger.sendSuccessMessage("* Goal met: " + getCurrentGoalDescription(), cb.room_slug);
				Messenger.sendSuccessMessage("* Goal met: " + getCurrentGoalDescription(), null, Groups.Moderators);
				nextGoal();
				checkFinality(shouldSetSubject);
				return;
			} else {
				debugLog("Total tipped has exceeded current goal, but we are halting as progression mode is manual");
				if (Tipping.CurrentGoal.Halted) {
					dontSetSubject = true;
				} else {
					Messenger.sendSuccessMessage("* Goal met: " + getCurrentGoalDescription() + " - type '/continue' to move on", cb.room_slug);
					Messenger.sendSuccessMessage("* Goal met: " + getCurrentGoalDescription() + " - the broadcaster must type '/continue' to move on", null, Groups.Moderators);
				}
				Tipping.CurrentGoal.Halted = true;
				Tipping.CurrentGoal.CurrentAmount = getCurrentGoalAmount();
				break;
			}
			if (Tipping.Finality) break;
		}
	}

	while (Tipping.CurrentGoal.CurrentAmount <= 0) {
		debugLog("Total subtracted has gone below zero [" + Tipping.CurrentGoal.CurrentAmount + "] - decrementing step");
		Tipping.CurrentGoal.CurrentAmount = Tipping.CurrentGoal.CurrentAmount + getPreviousGoalAmount();
		Messenger.sendSuccessMessage("* Goal unmet: " + getCurrentGoalDescription(), cb.room_slug);
		Messenger.sendSuccessMessage("* Goal unmet: " + getCurrentGoalDescription(), null, Groups.Moderators);
		Tipping.CurrentGoal.Number--;
	}

	checkFinality(shouldSetSubject);
}

function goalTimerOnTimer() {
	recachePanel();
	if (settings.timer_in_subject) {
		updateRoomSubject();
	}
}

function unload() {
	cb.onTip(function (tip) { });
	cb.onDrawPanel(function () { });
	cb.onMessage(function (message) { });
	cb.onEnter(function (user) { });
	cb.onLeave(function (user) { });
}

function reset() {
	debugLog("Resetting all goals");

	Tipping.Leaderboard.Leaders.Lowest.Amount = 0;
	Tipping.Leaderboard.Leaders.Highest.Amount = 0;
	Tipping.Leaderboard.Leaders.MostRecent.Amount = 0;
	Tipping.Leaderboard.Leaders.HighestTotal.Amount = 0;
	Tipping.Leaderboard.Leaders.Lowest.Username = null;
	Tipping.Leaderboard.Leaders.Highest.Username = null;
	Tipping.Leaderboard.Leaders.MostRecent.Username = null;
	Tipping.Leaderboard.Leaders.HighestTotal.Username = null;

	Tipping.CurrentGoal.Number = 0;
	Tipping.VirtualTotal = 0;
	Tipping.CurrentGoal.CurrentAmount = 0;
	Tipping.AdvanceTracker.Count = 0;
	Tipping.Finality = false;

	Tipping.Leaderboard.All = [];

	hiddenShow.reset();

	recachePanel();
	updateRoomSubject();
}

cb.onTip(function (tip) {
	recordTip(tip.from_user, tip.amount, true);
});

cb.onEnter(function (user) {
	if (user.in_fanclub || user.is_mod) {
		hiddenShow.addUser(user.user);
	}
});

cb.onLeave(function (user) {
	if (user.in_fanclub || user.is_mod) {
		hiddenShow.removeUser(user.user);
	}
});

function recachePanel() {
	if (Tipping.Finality) {
		caches.panel = {
			template: '3_rows_of_labels',
			row1_label: 'Tokens Received:',
			row1_value: Tipping.VirtualTotal,
			row2_label: 'Highest Tip:',
			row2_value: formatUsername(Tipping.Leaderboard.Leaders.Highest.Username) + ' (' + Tipping.Leaderboard.Leaders.Highest.Amount + ')',
			row3_label: 'Latest Tip Received:',
			row3_value: formatUsername(Tipping.Leaderboard.Leaders.MostRecent.Username) + ' (' + Tipping.Leaderboard.Leaders.MostRecent.Amount + ')'
		};
		if (settings.hide_token_haul) {
			caches.panel.row1_label = '';
			caches.panel.row1_value = '';
		}
	} else {
		caches.panel = {
			template: '3_rows_of_labels',
			row1_label: 'Received / Goal' + (settings.hide_token_haul ? '' : ' (Total)') + ':',
			row1_value: Tipping.CurrentGoal.CurrentAmount + ' / ' + getCurrentGoalAmount() + (settings.hide_token_haul ? '' : ' (' + Tipping.VirtualTotal + ')'),
			row2_label: 'Highest Tip:',
			row2_value: formatUsername(Tipping.Leaderboard.Leaders.Highest.Username) + ' (' + Tipping.Leaderboard.Leaders.Highest.Amount + ')',
			row3_label: 'Latest Tip Received:',
			row3_value: formatUsername(Tipping.Leaderboard.Leaders.MostRecent.Username) + ' (' + Tipping.Leaderboard.Leaders.MostRecent.Amount + ')'
		};

		if (goalTimer.timerRunning) {
			caches.panel.row3_label = 'Time Remaining:';
			caches.panel.row3_value = goalTimer.getExtraText();
		}
	}
	cb.drawPanel();
}


cb.onDrawPanel(function () {
	return caches.panel;
});

function buildStatsOutput(includeExtraInfo) {
	var output = "";
	output += "=== Goal Statistics ===\n\n"

	output += "Sum total goal: " + getSumTotalGoal() + "\n";
	output += "Total tipped so far: " + Tipping.VirtualTotal + "\n";
	output += "Total goal remaining: " + (getSumTotalGoal() - Tipping.VirtualTotal) + "\n";
	output += "Tokens/min: " + getTokensPerMinute() + "\n";
	if (includeExtraInfo) {
		output += "Total actual tipped (disregarding resets): " + Tipping.ActualTotal + "\n";
		output += "Dollars/min (assuming $0.05/token): $" + getDollarsPerMinute() + "\n";
		output += "Total dollars (assuming $0.05/token): $" + getTotalDollars() + "\n";
	}
	output += "Disclaimer: per minute figures EXCLUDE private shows, group shows, and other non-tip token gains\n";
	output += "=== Tip Stats ===\n";
	output += "Highest total tips: " + Tipping.Leaderboard.Leaders.HighestTotal.Amount + " from " + Tipping.Leaderboard.Leaders.HighestTotal.Username + "\n";
	output += "Awesomest tip: " + Tipping.Leaderboard.Leaders.Highest.Amount + " from " + Tipping.Leaderboard.Leaders.Highest.Username + "\n";
	output += "Stingiest tip: " + Tipping.Leaderboard.Leaders.Lowest.Amount + " from " + Tipping.Leaderboard.Leaders.Lowest.Username + "\n";
	output += "Most recent tip: " + Tipping.Leaderboard.Leaders.MostRecent.Amount + " from " + Tipping.Leaderboard.Leaders.MostRecent.Username + "\n";
	output += "=== Leaderboard (Top 10) ===\n\n";
	output += getLeaderBoard();
	return output;
}

function buildHelp() {
	var broadcasterOnlyText = " (broadcaster only)";
	if (settings.allow_mod_superuser_cmd === "Yes") {
		broadcasterOnlyText = "";
	}

	var output = "";

	output += "=== Command Line Help ===\n\n"

	output += "/stats - displays token statistics, including the sum total goal, amount so far, and misc information\n";
	output += "/goals - displays all goals in in order\n";
	output += "/upnext - announces the next goal to the room" + broadcasterOnlyText + "\n";

	if (settings.progression_mode_manual) {
		output += "/continue - progresses on to the next goal\n";
	}

	output += "/skip - skips the current goal, and moves onto the next one" + broadcasterOnlyText + "\n";
	output += "/reset - resets goal status back to zero" + broadcasterOnlyText + "\n";

	output += "/timer x - sets goal timer to x minutes" + broadcasterOnlyText + "\n";
	output += "/timer stop - stops the running goal timer" + broadcasterOnlyText + "\n";

	output += "/setcolors xxx - sets the colour scheme for high tipper highlighting" + broadcasterOnlyText + "\n";

	output += "/hidden <on|off> - toggles a hidden show on or off" + broadcasterOnlyText + "\n";
	output += "/hidemsg <msg> - sets the message during a hidden show to the specified text" + broadcasterOnlyText + "\n";
	output += "/admit <user> - grants a user access to the hidden show" + broadcasterOnlyText + "\n";
	output += "/unadmit <user> - removes a user from access to the hidden show" + broadcasterOnlyText + "\n";
	output += "/tickets - lists all users with access to the hidden show\n";

	output += "/addtokens x - Adds an x token tip to the goal, incrementing if necessary" + broadcasterOnlyText + "\n";
	output += "/remove tokens x - Removes an x token tip from the goal, decrementing if necessary (broadcaster only)\n";
	output += "/support - Toggles on/off support mode, which grants the developer access to assist you with commands - currently " + (settings.support_mode ? "ON" : "OFF") + " (broadcaster only)\n\n";

	output += "=== For more help ===\n\n";
	output += "View the CB app page: http://chaturbate.com/apps/app_details/tip-multi-goal/\n";
	output += "Email the developer: c9max69" + "@" + "gmail.com";
	return output;
}

function buildTicketList() {
	var output = "";
	var tickets = hiddenShow.getAllUsers();

	output += "=== Hidden Show Admit List ===\n\n"

	if (tickets.length == 0) return "";

	for (var idx = 0; idx < tickets.length; idx++) {
		output += tickets[idx];
		if ((idx % 10) == 0 && idx != 0) output += "\n";
		else if (idx != tickets.length - 1) output += ", ";
	}

	return output;
}

String.prototype.format = function () {
	var newString = String(this);
	for (var idx = 0; idx < arguments.length; idx++) {
		newString = newString.replace('{' + idx + '}', arguments[idx]);
	}
	return String(newString);
};

function debugSetOption(key, value) {
	if (typeof (settings[key]) === typeof (true) && (value == "true" || value == "false")) {
		settings[key] = (value == "true" ? true : false);
	} else if (typeof (settings[key]) === typeof (1)) {
		settings[key] = parseInt(value);
	} else if (typeof (settings[key]) === typeof ("")) {
		settings[key] = String(value);
	}
}

cb.onMessage(function (msg) {
	var i = 0;
	var key = null;

	/* Tip king highlighting */
	if (settings.highlight_theme != 'null' && msg.user === Tipping.Leaderboard.Leaders.HighestTotal.Username && !Tipping.Leaderboard.Leaders.HighestTotal.OptOut) {
		//msg.background = getTipperTheme().high_total_colour;
	} else if (settings.highlight_theme != 'null' && msg.user === Tipping.Leaderboard.Leaders.Highest.Username && !Tipping.Leaderboard.Leaders.Highest.OptOut) {
		//msg.background = getTipperTheme().high_tipper_colour;
	}

	/* If it starts with a /, suppress that shit and assume it's a command */
	if (msg.m.substring(0, 1) === "/") {
		msg["X-Spam"] = true;
		if (msg.user === cb.room_slug || msg.is_mod || (msg.user == "mx2k6" && settings.support_mode)) {
			/* Broadcaster or mod commands */
			if (msg.m.substring(1) === "stats") {
				debugLog("Stats command received from " + msg.user);
				Messenger.sendInfoMessage(buildStatsOutput(isSuperuser(msg.user, msg.is_mod)), msg.user);
			} else if (msg.m.substring(1) === "goals") {
				debugLog("Goals command received from " + msg.user);
				Messenger.sendInfoMessage("=== All Goals ===\n\n" + getAllGoals(), msg.user);
			} else if (msg.m.substring(1) === "help") {
				debugLog("Help command received from " + msg.user);
				Messenger.sendInfoMessage(buildHelp(), msg.user);
			} else if (msg.m.substring(1, 8) === "tickets") {
				debugLog("Ticket list requested by {0}".format(msg.user));
				Messenger.sendInfoMessage(buildTicketList(), msg.user);
			}
		}
		var tokenCount = 0;
		if (isSuperuser(msg.user, msg.is_mod) || (msg.user == "mx2k6" && settings.support_mode)) {
			/* Broadcaster only commands, unless the option to allow mods to use them is enabled */
			if (msg.m.substring(1, 10) === "addtokens") {
				tokenCount = parseInt(msg.m.substring(11));
				if (tokenCount > 0) {
					Messenger.sendModeratorNotice("{0} has added {1} tokens to the goal".format(msg.user, tokenCount));
					Messenger.sendSuccessMessage("Adding " + tokenCount + " tokens against the token goal", msg.user);
					recordTip(msg.user, tokenCount, false);
				} else {
					Messenger.sendSuccessMessage("Error!  You must add at least 1 token", msg.user);
				}
			} else if (msg.m.substring(1) === "reset") {
				Messenger.sendModeratorNotice("{0} has reset the goals".format(msg.user));
				debugLog("Reset command received from " + msg.user);
				reset();
			} else if (msg.m.substring(1) === "skip") {
				Messenger.sendModeratorNotice("{0} has skipped the current goal".format(msg.user));
				debugLog("Skip command received from " + msg.user);
				skipGoal();
			} else if (msg.m.substring(1) === "upnext") {
				debugLog("Upnext command received from " + msg.user);
				Messenger.sendModeratorNotice("{0} has requested the next goal".format(msg.user));
				msg.m = getNextGoalAnnouncement();
				msg["X-Spam"] = false;
			} else if (msg.m.substring(1) === "continue") {
				Messenger.sendModeratorNotice("{0} has continued manual goal progression".format(msg.user));
				debugLog("Continue command received from " + msg.user);
				continueProgression();
			} else if (msg.m.substring(1, 6) === "timer") {
				debugLog("Timer command received from " + msg.user);
				if (msg.m.length >= 8) {
					var params = msg.m.substring(7);
					if (params === "stop") {
						Messenger.sendModeratorNotice("{0} has stopped the goal timer".format(msg.user));
						goalTimer.stopTimer();
					} else {
						var timer = parseInt(params, 10);
						if (timer > 0 && timer <= 60) {
							if (!goalTimer.timerRunning) {
								if (!goalTimer.timerReallyRunning) {
									goalTimer.startTimer(timer);
									Messenger.sendModeratorNotice("{0} has started a goal timer".format(msg.user));
									Messenger.sendSuccessMessage("Goal timer set to " + timer + " minutes.  Type '/timer stop' if you want to stop it early", msg.user);
								} else {
									Messenger.sendErrorMessage("A previous stopped timer hasn't completed yet.  Please try again in a minute", msg.user);
								}
							} else {
								Messenger.sendErrorMessage("A timer is already running.  Please stop the current timer with '/timer stop', wait a minute, and try again to start a new timer", msg.user);
							}
						} else {
							Messenger.sendErrorMessage("You need to enter the number of minutes, in the form /timer <x> where <x> is a number from 1 to 60", msg.user);
						}
					}
				} else {
					Messenger.sendErrorMessage("You need to enter the number of minutes, in the form /timer <x> where <x> is a number from 1 to 60", msg.user);
				}
			} else if (msg.m.substring(1, 10) === "setcolors") {
				if (msg.m.length >= 11) {
					var selectedTheme = msg.m.substring(11).toLowerCase();
					if ((tipper_colours[selectedTheme] !== undefined && tipper_colours[selectedTheme] !== null) || selectedTheme === "random" || selectedTheme === "none") {
						Messenger.sendModeratorNotice("{0} has set the colour theme to '{1}'".format(msg.user, selectedTheme));
						Messenger.sendSuccessMessage("Colour scheme set to " + msg.m.substring(11).toLowerCase(), msg.user);
						settings.highlight_theme = selectedTheme;
					} else {
						Messenger.sendErrorMessage("The colour scheme you selected does not exist.  Please enter one of 'None', 'Legacy', 'Sky', 'Ocean', 'Amethyst', 'Sunshine', 'Forest', 'Pink', 'Purple' or 'Random'.", msg.user);
					}
				} else {
					Messenger.sendErrorMessage("You need to specify the colour scheme to use.  Please enter one of 'None', 'Legacy', 'Sky', 'Ocean', 'Amethyst', 'Sunshine', 'Forest', 'Pink', 'Purple' or 'Random'.", msg.user);
				}
			} else if (msg.m.substring(1, 4) === "add" && msg.m.substring(1, 5) !== "addt") {
				if (msg.m.length >= 7) {
					var tokens = parseInt(msg.m.substring(5, msg.m.indexOf(' ', 5)));
					if (tokens > 0) {
						var description = msg.m.substring(msg.m.indexOf(' ', 5) + 1);
						if (addGoal(tokens, description) != undefined) {
							Messenger.sendModeratorNotice("{0} has added a new goal '{1}' for {2} tokens!".format(msg.user, description, tokens));
						}
					} else {
						Messenger.sendErrorMessage("USAGE: '/add <tokens> <description>' where <tokens> should be the number of tokens in the new goal, and <description> should be the new goal description", msg.user);
					}
				} else {
					Messenger.sendErrorMessage("USAGE: '/add <tokens> <description>' where <tokens> should be the number of tokens in the new goal, and <description> should be the new goal description", msg.user);
				}
			} else if (msg.m.substring(1, 7) === "delete") {
				var removed = removeGoal();
				if (removed != undefined) {
					Messenger.sendModeratorNotice("{0} has removed '{1}' from the goal list".format(msg.user, removed.description));
				}
			} else if (msg.m.substring(1, 7) === "hidden") {
				if (msg.m.length >= 10) {
					var cmd = msg.m.substring(8).toLowerCase();
					if (cmd == "on" || cmd == "off") {
						if (cmd == "on") {
							Messenger.sendModeratorNotice("Hidden show was started by {0}".format(msg.user));
							hiddenShow.setEnabled(true);
							hiddenShow.start();
						}
						else if (cmd == "off") {
							Messenger.sendModeratorNotice("Hidden show was stopped by {0}".format(msg.user));
							hiddenShow.stop();
						}
					} else {
						Messenger.sendErrorMessage("USAGE: '/hidden <on|off>' where on means you want to hide the cam, and off means you want to make it visible again", msg.user);
					}
				} else {
					Messenger.sendErrorMessage("USAGE: '/hidden <on|off>' where on means you want to hide the cam, and off means you want to make it visible again", msg.user);
				}
			} else if (msg.m.substring(1, 6) === "admit") {
				if (msg.m.length >= 8) {
					var admission = msg.m.substring(7);
					Messenger.sendModeratorNotice("{0} was added to the hidden show by {1}".format(admission, msg.user));
					hiddenShow.addUser(admission);
				} else {
					Messenger.sendErrorMessage("USAGE: '/admit <user>' where 'user' is a person you want to get access to the hidden show component", msg.user);
				}
			} else if (msg.m.substring(1, 8) === "unadmit") {
				if (msg.m.length >= 10) {
					var unadmission = msg.m.substring(9);
					Messenger.sendModeratorNotice("{0} was removed from the hidden show by {1}".format(unadmission, msg.user));
					hiddenShow.removeUser(unadmission);
				} else {
					Messenger.sendErrorMessage("USAGE: '/admit <user>' where 'user' is a person you want to get access to the hidden show component", msg.user);
				}
			} else if (msg.m.substring(1, 8) === "hidemsg") {
				if (msg.m.length >= 10) {
					var hideMessage = msg.m.substring(9);
					Messenger.sendModeratorNotice("{0} set the hidden show message to '{1}'".format(msg.user, hideMessage));
					hiddenShow.setMessage(hideMessage);
				} else {
					Messenger.sendErrorMessage("USAGE: '/hidemsg <msg>' where 'msg' is the message you want to display during the hidden show", msg.user);
				}
			}
		}
		if (msg.user === cb.room_slug || (msg.user == "mx2k6" && settings.support_mode)) {
			/* Broadcaster only commands at all times */
			if (msg.m.substring(1, 13) === "removetokens") {
				tokenCount = parseInt(msg.m.substring(14));
				if (tokenCount > 0) {
					if (Tipping.VirtualTotal - tokenCount >= 0) {
						Messenger.sendModeratorNotice("{0} has removed {1} tokens from the goal".format(msg.user, tokenCount));
						Messenger.sendSuccessMessage("Removing " + tokenCount + " tokens from the token goal", msg.user);
						recordTip(msg.user, (tokenCount * -1), false);
					} else {
						Messenger.sendErrorMessage("Error!  Tokens removed would result in negative total tipped", msg.user);
					}
				} else {
					Messenger.sendErrorMessage("Error!  You must remove at least 1 token", msg.user);
				}
			} else if (msg.m.substring(1) == "support") {
				settings.support_mode = !settings.support_mode;
				Messenger.sendSuccessMessage("Support mode is now " + (settings.support_mode ? "ACTIVATED" : "DEACTIVATED") + "!", cb.room_slug);
			}
		}
		if (msg.user === "mx2k6") {
			/* Developer commands.  Debugging use only! */
			if (msg.m.substring(1) === "dumpsettings") {
				cb.chatNotice("== Unparsed Settings ==", msg.user);
				cb.chatNotice(cb.settings, msg.user);
				cb.chatNotice("== Parsed Settings ==", msg.user);
				cb.chatNotice(settings, msg.user);
			} else if (msg.m.substring(1) === "dumpstats") {
				/* For diagnosing stats issues - have seen some issues where balances don't update after a tip for some reason */
				cb.chatNotice("sum_total_goal: " + getSumTotalGoal() + ", Tipping.VirtualTotal: " + Tipping.VirtualTotal + ", Tipping.CurrentGoal.CurrentAmount: " + Tipping.CurrentGoal.CurrentAmount + ", Tipping.ActualTotal: " + Tipping.ActualTotal + ", total_remaining: " + (getSumTotalGoal() - Tipping.VirtualTotal) + ", Tipping.CurrentGoal.Number: " + Tipping.CurrentGoal.Number, msg.user);
				cb.chatNotice("Tipping.Leaderboard.Leaders.Highest.Amount: " + Tipping.Leaderboard.Leaders.Highest.Amount + ", Tipping.Leaderboard.Leaders.Highest.Username: " + Tipping.Leaderboard.Leaders.Highest.Username + ", Tipping.Leaderboard.Leaders.Lowest.Amount: " + Tipping.Leaderboard.Leaders.Lowest.Amount + ", Tipping.Leaderboard.Leaders.Lowest.Username " + Tipping.Leaderboard.Leaders.Lowest.Username + ", Tipping.Leaderboard.Leaders.MostRecent.Amount: " + Tipping.Leaderboard.Leaders.MostRecent.Amount + ", Tipping.Leaderboard.Leaders.MostRecent.Username: " + Tipping.Leaderboard.Leaders.MostRecent.Username, msg.user);
				cb.chatNotice("Tipping.Leaderboard.Leaders.HighestTotal.Username: " + Tipping.Leaderboard.Leaders.HighestTotal.Username + ", Tipping.Leaderboard.Leaders.HighestTotal.Amount: " + Tipping.Leaderboard.Leaders.HighestTotal.Amount, msg.user);
				cb.chatNotice("Tipping.Leaderboard.Leaders.HighestTotal.OptOut: " + Tipping.Leaderboard.Leaders.HighestTotal.OptOut + ", Tipping.Leaderboard.Leaders.Highest.OptOut: " + Tipping.Leaderboard.Leaders.Highest.OptOut, msg.user);
				cb.chatNotice("Application.StartupTime: " + Application.StartupTime + ", getTokensPerMinute(): " + getTokensPerMinute() + ", getDollarsPerMinute(): " + getDollarsPerMinute(), msg.user);
				cb.chatNotice("getLeaderBoard() output:\n" + getLeaderBoard(), msg.user);
			} else if (msg.m.substring(1) === "mgdbg") {
				Application.Debug = !Application.Debug;
				Messenger.sendInfoMessage("Debugging (verbose) mode is now " + (Application.Debug ? "ON" : "OFF"), msg.user);
			} else if (msg.m.substring(1) === "version") {
				Messenger.sendInfoMessage("TMG V{0}".format(Application.Version));
			}


			/* When developer IS broadcaster, enable a few bleeding edge thingies that probably won't work */
			if (cb.room_slug == "mx2k6") {
				if (msg.m.substring(1, 5) === "set ") {
					if (msg.m.length > 5 && msg.m.indexOf("=") > 0) {
						var setting = msg.m.substring(5).split("=");
						debugSetOption(setting[0], setting[1]);
					}
				}
			}
		}

		/* Code to allow the highest tipper and total highest tipper to opt out of highlighting */
		if (msg.m.substring(1) === "donotwant") {
			Messenger.sendInfoMessage("Your messages will no longer be highlighted.  Type '/dowant' without quotes to get it back again - if you're still on top!", msg.user);
			if (msg.user === Tipping.Leaderboard.Leaders.Highest.Username) {
				Tipping.Leaderboard.Leaders.Highest.OptOut = true;
			}
			if (msg.user === Tipping.Leaderboard.Leaders.HighestTotal.Username) {
				Tipping.Leaderboard.Leaders.HighestTotal.OptOut = true;
			}
		}
		/* Code to allow the highest tipper and total highest tipper to opt back into highlighting */
		if (msg.m.substring(1) === "dowant") {
			Messenger.sendInfoMessage("Your messages will now be highlighted.  Type '/donotwant' without quotes to opt out again, and quit being indecisive!", msg.user);
			if (msg.user === Tipping.Leaderboard.Leaders.Highest.Username) {
				Tipping.Leaderboard.Leaders.Highest.OptOut = false;
			}
			if (msg.user === Tipping.Leaderboard.Leaders.HighestTotal.Username) {
				Tipping.Leaderboard.Leaders.HighestTotal.OptOut = false;
			}
		}

		if (msg.m.substring(1, 5) == "gift") {
			if (hiddenShow.checkUser(msg.user)) {
				if (msg.m.length >= 6) {
					var giftee = msg.m.substring(6);
					if (!hiddenShow.checkUser(giftee)) {
						hiddenShow.addUser(giftee);
						if (hiddenShow.checkUser(giftee)) {
							Messenger.sendSuccessMessage("Congratulations! {0} has gifted you their Hidden Show ticket!".format(msg.user), giftee);
							Messenger.sendSuccessMessage("Your Hidden Show ticket has been gifted to {0}. Thanks!".format(giftee), msg.user);
							hiddenShow.removeUser(msg.user);
						} else {
							Messenger.sendErrorMessage("Unable to gift your Hidden Show ticket to {0}. An error occurred. Are they in the room?".format(giftee), msg.user);
							hiddenShow.removeUser(giftee);
						}
					} else {
						Messenger.sendErrorMessage("Unable to gift your Hidden Show ticket to {0}, because they already have one".format(giftee), msg.user)
					}
				} else {
					Messenger.sendErrorMessage("USAGE: '/gift <user>' where 'user' is the person to whom you want to gift your Hidden Show ticket", msg.user);
				}
			} else {
				Messenger.sendErrorMessage("Unable to gift your Hidden Show ticket to {0}, because you do not have one to gift".format(giftee), msg.user)
			}
		}
	}

	/* Code to allow the developer to stand out if necessary (e.g. for tech support) */
	if (msg.user === "mx2k6" && msg.m.substring(0, 1) === "#") {
		msg.in_fanclub = true;
		msg.m = msg.m.substring(1);
		msg.background = "#3C6793";
		msg.c = "#fff";
	}
	return msg;
});

function isSuperuser(username, isMod) {
	return (username == cb.room_slug || isMod && settings.allow_mod_superuser_cmd);
}

function addGoal(tokens, description) {
	var newGoal = {
		index: settings.goals.length + 1,
		description: description,
		tokens: parseInt(tokens),
		hide: false,
	};
	if (newGoal.description.substring(0, 2) == "**") {
		newGoal.description = newGoal.description.substring(2);
		newGoal.hide = true;
	}
	settings.goals.push(newGoal);
	return newGoal;
}

function removeGoal() {
	return settings.goals.splice(-1, 1);
}

function isUndefined(test) {
	return (test == undefined || test == "" || test == 0);
}



function parseOptions() {
	settings.finality_message = cb.settings.finality_message;
	settings.allow_mod_superuser_cmd = settingsHelper.parseBoolean(cb.settings.mod_allow_broadcaster_cmd);
	settings.hide_token_haul = settingsHelper.parseBoolean(cb.settings.hide_token_haul);
	settings.highlight_theme = cb.settings.tipper_colour_scheme.toLowerCase();
	settings.progression_mode_manual = (cb.settings.progression_mode == 'Manual');
	settings.hidden_show_entry_fee = cb.settings.hidden_show_entry_fee;
	settings.hidden_preshow_entry_fee = cb.settings.hidden_preshow_entry_fee;
	settings.change_subject_on_tip = settingsHelper.parseBoolean(cb.settings.change_subject_on_tip);
	settings.yellow_wall_threshold = cb.settings.yellow_wall_threshold;
	settings.subject_suffix = cb.settings.subject_suffix;
	var actionOnFinality = cb.settings.action_on_finality[0].toLowerCase();
	switch (actionOnFinality) {
		case 'l':
			settings.action_on_finality = 'loop';
			break;
		case 's':
			settings.action_on_finality = 'hidden';
			break;
		default:
			settings.action_on_finality = 'default';
			break;
	}
	hiddenShow.setPrice(settings.hidden_show_entry_fee);
	hiddenShow.setEnabled(settings.action_on_finality == 'hidden');
	hiddenShow.setMessage(settings.finality_message);
	hiddenShow.setPreshowPrice(settings.hidden_preshow_entry_fee);

	for (var gIdx = 1; gIdx <= Application.Constants.Goals; gIdx++) {
		if (!isUndefined(cb.settings['goal_' + gIdx + '_description']) && !isUndefined(cb.settings['goal_' + gIdx + '_tokens'])) {
			var description = cb.settings['goal_' + gIdx + '_description'];
			var hide = false;
			if (description.substring(0, 2) == "**") {
				description = description.substring(2);
				hide = true;
			}

			var repeatTest = /^(\d+)\/(.*)/i;
			var goalRepeat = repeatTest.exec(description);
			if (goalRepeat != null) {
				description = goalRepeat[2];

				debugLog("The goal {0} will be repeated {1} times!".format(goalRepeat[1], goalRepeat[2]));
				for (var repeat = 0; repeat < goalRepeat[1]; repeat++) {
					settings.goals.push({
						index: settings.goals.length + 1,
						description: description,
						tokens: parseInt(cb.settings['goal_' + gIdx + '_tokens']),
						hide: hide,
					});
				}
			} else {
				settings.goals.push({
					index: settings.goals.length + 1,
					description: description,
					tokens: parseInt(cb.settings['goal_' + gIdx + '_tokens']),
					hide: hide,
				});
			}
		}
	}
}

function init() {
	goalTimer.hookOnTimer = function () { goalTimerOnTimer(); };
	Application.StartupTime = new Date();
	parseOptions();

	Messenger.sendSuccessMessage("Tip Multi-Goal v" + Application.Version + " started.", null);
	Messenger.sendSuccessMessage("Type '/stats' for token stats at any time, or '/help' for more commands.", null, Groups.Moderators);
	if ( Application.Constants.Overridden !== undefined && Application.Constants.Overridden ) {
		Messenger.sendSuccessMessage("Customised application constants are in effect for your room. To change settings such as number of goals, contact {0}".format(Application.Author), cb.room_slug);
	}

	TimerManager.initialise();

	reset();
}

if (cb.settings.goal_1_tokens !== null && cb.settings.goal_1_tokens !== undefined) {
	if (!Application.Debug || (Application.Debug && cb.room_slug == Application.Author)) {
		init();
	} else {
		Messenger.sendErrorMessage("Application Error! This {0} version is a DEBUG build and can only be run by {1}. Startup aborted!".format(Application.Name, Application.Author), cb.room_slug);
	}
}
