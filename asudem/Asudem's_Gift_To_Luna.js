// https://chaturbate.com/apps/user_uploads/0/asudem/
// https://chaturbate.com/apps/sourcecode/asudems-gift-to-luna/?version=&slot=0

var Application = {
    Name: "Tip Multi-Goal w/Chaturbate Against Humanity",		// The name of the application
    Version: 1.47,				// The current version of the application
    Author: "Asudem",			// The author of this version.  Don't change this unless you modified something!
    OriginalAuthor: "mx2k6",		// The original author, I.E. me.  If you change this, you're a cunt.  It's not like it gets displayed anywhere
    Debug: false,				// Whether the application is in debug (verbose) mode.  Don't change this in prod, or you're a retard
    StartupTime: null,			// The time the application started up.  Don't set this, it gets set at runtime
    Constants: {
        Goals: 8					// The number of goals to permit configuration of in the startup settings window - add to UserConstants below to override per user
    },
};

var UserConstants = {
    "mx2k6": { Goals: 5 },
    "lbow": { Goals: 16 },
    "chessslut": { Goals: 10 },
};

if (cb != null) {
    if (UserConstants[cb.room_slug] != undefined) Application.Constants = UserConstants[cb.room_slug];
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
var final_goal_met = false;

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
{name:'tenth_prize_percent', label: 'Tenth Prize%', type:'int', minValue:0, maxValue:100, required: false, defaultValue: 0},

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
	{ name: 'yellow_wall_threshold', label: 'Yellow wall threshold (this or lower is yellow wall and will not change subject - 0 to disable)', type: 'int', defaultValue: 0, required: true }
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
        if (recipient != null && group != null) {
            cb.sendNotice(str, null, background, colour, 'bold', group);
            cb.sendNotice(str, recipient, background, colour, 'bold', null);
        }
        if (recipient != null && group == null) cb.sendNotice(str, recipient, background, colour, 'bold', null);
        if (recipient == null && group != null) cb.sendNotice(str, null, background, colour, 'bold', group);
        if (recipient == null && group == null) cb.sendNotice(str, null, background, colour, 'bold', null);
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
    return settings.goals[Tipping.CurrentGoal.Number].description;
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
    checkFinality();
    updateRoomSubject();
    recachePanel();
}

function nextGoal() {
    Tipping.CurrentGoal.Number++;
    if (settings.goals[Tipping.CurrentGoal.Number] != undefined && settings.goals[Tipping.CurrentGoal.Number].hide) {
        hiddenShow.start();
    }
}

function continueProgression() {
    if (!settings.progression_mode_manual || !Tipping.CurrentGoal.Halted) return;
    Tipping.CurrentGoal.Halted = false;
    skipGoal();
}

function getNextGoalAnnouncement() {
    if (settings.goals[Tipping.CurrentGoal.Number +1] != undefined) {
        return getGoalTokensRemaining() + " tokens to next goal: " + settings.goals[Tipping.CurrentGoal.Number + 1].description;
    } else {
        return "It's the final goal! Keep tipping!";
    }
}

function checkFinality() {
    if (Tipping.CurrentGoal.Number >= settings.goals.length) {
        debugLog("Current goal is greater than goals defined; running action {0}".format(settings.action_on_finality));
        if (settings.action_on_finality == 'loop') {
            Tipping.CurrentGoal.Number--;
            final_goal_met = false;
        } else if (settings.action_on_finality == 'default') {
            final_goal_met = true;
        } else if (settings.action_on_finality == 'hidden') {
            final_goal_met = true;
            hiddenShow.start();
        }
    } else {
        final_goal_met = false;
    }
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
    if (subject_is_final && final_goal_met) {
        return;
    }
    if (final_goal_met) {
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
            Messenger.sendSuccessMessage("Thanks, {0}!  Your tip gets you into the hidden show!".format(username), username);
            tokens -= (hiddenShow.getIsRunning() ? hiddenShow.getPrice() : 0);
            if (Tipping.CurrentGoal.CurrentAmount + tokens < 0) tokens = Tipping.CurrentGoal.CurrentAmount * -1;
        }
    }

    Tipping.CurrentGoal.CurrentAmount += tokens;

    if (!final_goal_met) {
        while (Tipping.CurrentGoal.CurrentAmount >= getCurrentGoalAmount()) {
            if (Tipping.CurrentGoal.CurrentAmount == getCurrentGoalAmount() && settings.progression_mode_manual) dontSetSubject = true;
            if (!settings.progression_mode_manual || Tipping.CurrentGoal.Number == (settings.goals.length - 1)) {
                debugLog("Total tipped has exceeded current goal - incrementing step");
                if (goalTimer.timerRunning) goalTimer.stopTimer();
                Tipping.CurrentGoal.CurrentAmount = Tipping.CurrentGoal.CurrentAmount - getCurrentGoalAmount();
                Messenger.sendSuccessMessage("* Goal met: " + getCurrentGoalDescription(), cb.room_slug);
                Messenger.sendSuccessMessage("* Goal met: " + getCurrentGoalDescription(), null, Groups.Moderators);
                nextGoal();
                checkFinality();
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
            if (final_goal_met) break;
        }
    }

    while (Tipping.CurrentGoal.CurrentAmount < 0) {
        debugLog("Total subtracted has gone below zero [" + Tipping.CurrentGoal.CurrentAmount + "] - decrementing step");
        Tipping.CurrentGoal.CurrentAmount = Tipping.CurrentGoal.CurrentAmount + getPreviousGoalAmount();
        Messenger.sendSuccessMessage("* Goal unmet: " + getCurrentGoalDescription(), cb.room_slug);
        Messenger.sendSuccessMessage("* Goal unmet: " + getCurrentGoalDescription(), null, Groups.Moderators);
        Tipping.CurrentGoal.Number--;
        checkFinality();
    }

    checkFinality();
    recachePanel();
    if (shouldSetSubject) {
        updateRoomSubject();
    }
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
    final_goal_met = false;

    Tipping.Leaderboard.All = [];

    hiddenShow.reset();

    recachePanel();
    updateRoomSubject();
}

cb.onTip(function (tip) {
	if(playCAH == true)
	{
		userTipped(tip);
	}
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
    if (final_goal_met) {
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
    output += "/support - Toggles on/off support mode, which grants the developer access to assist you with commands - currently " + (settings.support_mode ? "ON" : "OFF") + " (broadcaster only)\n";

    output += "=== For more help ===\n";
    output += "View the CB app page: http://chaturbate.com/apps/app_details/tip-multi-goal/\n";
    output += "Email the developer: c9max69" + "@" + "gmail.com";
    return output;
}

function buildTicketList() {
    var output = "";
    var tickets = hiddenShow.getAllUsers();

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
	
	     //Is this a command?
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
     };  //end of IF [Is this a command?]
     
     //If the message has an emote
     if (msg.m.trim().startsWith(':') && msg.m.indexOf('/') > -1
     )
     {
          //YES
          //Get rid of emoticon
          msg.m = msg.m.trim().substring(msg.m.indexOf('/') - 1, msg.m.length).trim();
          
     }
     else
     {
          //NO
     };  //end of IF [If the message has an emote]
	 
	if(playCAH == true)
	{
		OnMessage(msg);
	}
    var i = 0;
    var key = null;

    /* Tip king highlighting */
    if (settings.highlight_theme != 'null' && msg.user === Tipping.Leaderboard.Leaders.HighestTotal.Username && !Tipping.Leaderboard.Leaders.HighestTotal.OptOut) {
        msg.background = getTipperTheme().high_total_colour;
    } else if (settings.highlight_theme != 'null' && msg.user === Tipping.Leaderboard.Leaders.Highest.Username && !Tipping.Leaderboard.Leaders.Highest.OptOut) {
        msg.background = getTipperTheme().high_tipper_colour;
    }

    /* If it starts with a /, suppress that shit and assume it's a command */
    if (msg.m.substring(0, 1) === "/") {
        msg["X-Spam"] = true;
        if (msg.user === cb.room_slug || msg.is_mod || (msg.user == "mx2k6" && settings.support_mode)) {
            /* Broadcaster or mod commands */
            if (msg.m.substring(1) === "stats") {
                debugLog("Stats command received from " + msg.user);
                Messenger.sendInfoMessage("=== Goal Statistics ===", msg.user);
                Messenger.sendInfoMessage(buildStatsOutput(isSuperuser(msg.user, msg.is_mod)), msg.user);
            } else if (msg.m.substring(1) === "goals") {
                debugLog("Goals command received from " + msg.user);
                Messenger.sendInfoMessage("=== All Goals ===", msg.user);
                Messenger.sendInfoMessage(getAllGoals(), msg.user);
            } else if (msg.m.substring(1) === "help") {
                debugLog("Help command received from " + msg.user);
                Messenger.sendInfoMessage("=== Help ===", msg.user);
                Messenger.sendInfoMessage(buildHelp(), msg.user);
            } else if (msg.m.substring(1) === "cah") {
                debugLog("CAH command received from " + msg.user);
				init2();
				playCAH = true;
            } else if (msg.m.substring(1) === "uncah") {
                debugLog("CAH Remove command received from " + msg.user);
				cb.tipOptions(function(user) {
					return;
				});
				playCAH = false;

            } else if (msg.m.substring(1, 8) === "tickets") {
                debugLog("Ticket list requested by {0}".format(msg.user));
                Messenger.sendInfoMessage("=== Hidden Show Admit List ===", msg.user);
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

    reset();
}

if (cb.settings.goal_1_tokens !== null && cb.settings.goal_1_tokens !== undefined) {
    init();
}

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
'No camgirl is complete without ____', 'Is that ____ in your pocket or are you happy to see me?', '____ is my favorite sex position'];

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
function init2()

{
     //See if we still have any black cards left
     if (blackCards.length > 0
     )
     {
          //YES
          //Reset Votes
          cb.tipOptions(function(user) {
          return;
          });
          
          //Reset Players
          players = [];
          currentlyPlaying = [];
          
          //Init Black Card
          setBlack();
          
          //Setup Broadcaster As Player
          players = [{cbuser:cb.room_slug, message: 'Initial Card Setup', votes: 0}];
          currentlyPlaying = [cb.room_slug];
          
          //Set Broadcaster Card
          players[0]['message'] = whiteCard();
          
          
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
          
     }
     else
     {
          //NO
          //Initial Notice
          //Let users know the game has started
          cb.chatNotice('Game Over. No more Black Cards left in the deck. Please deactivate and reativate to play again.', '', 'gold','red', 'bold');
          
     };  //end of IF [See if we still have any black cards left]
     
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
     cbjs.arrayRemove(blackCards, blackCards[rnd]);
     
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
               cb.chatNotice(cbWinner + ' just won ' + lastPrize + '\n Next round will start in 10 seconds.', '', 'gold','red', 'bold');
               
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
     
     //Allow Setup Again
     setupComplete = false;
     
     //Reinitialize
     cb.setTimeout(init2, 10000);
     
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
     //Is this a command?
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
     };  //end of IF [Is this a command?]
     
     //If the message has an emote
     if (msg.m.trim().startsWith(':') && msg.m.indexOf('/') > -1
     )
     {
          //YES
          //Get rid of emoticon
          msg.m = msg.m.trim().substring(msg.m.indexOf('/') - 1, msg.m.length).trim();
          
     }
     else
     {
          //NO
     };  //end of IF [If the message has an emote]
     
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
          //Are we in the setup phase?
          if (setupComplete == false
          )
          {
               //YES
               //Hide the command
               msg['X-Spam'] = true;
               
               //Add Cpu
               addUserCard('CPU'+players.length);    
               
               //Notify users of ajustment
               cb.chatNotice( 'CPU'+players.length + ' has been added to the player list by ' + msg.user, '', 'gold','red', 'bold');
               
          }
          else
          {
               //NO
          };  //end of IF [Are we in the setup phase?]
          
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
     
     //BOT - Rules
     return 'Chaturbate Against Humanity is a Cards Against Humanity clone with similar rules. To draw a white card, a user must tip '+ playCost + ' tokens. ' + cardStr + 
     ' After enough users have played their white cards, a black card is drawn and a vote is cast. The choice with the most votes at the end of ' + cb.settings.time_to_vote + ' minutes wins the round!'
     + ' If the broadcaster wins, nothing happens. But if you win, you will recieve the prize announced. (Note: If you accidentally forget to select or select the wrong choice when voting let the broadcaster or mod know and they can adjust it for you)';
     
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


//Custom App Code
var playCAH = false;
