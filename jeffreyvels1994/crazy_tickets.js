/*******************************************************
 *    Title: 	CrazyTicket + cinema
 *				A Hidden Cam Show Ticket Selling App
 *       By:	jeffreyvels1994
 * 
 *   Author: 	'acrazyguy' and 'phatkatmeow' and 'jeffreyvels1994'
 * Thumbsup: 	Concept and inspiration: 'birdylovesit'
 * 
 *  Version: 	1.002 (2016.07.03)
 *    Build: 	.003
 *******************************************************/


/**
 * Script: 
	Main developers: 'acrazyguy' and 'phatkatmeow'.
	With contributions from 'robx7', 'calvin06', and 'TheKnight2000' and 'jeffreyvels1994'.
	Originally developed for 'birdylovesit' and has since taken on a life of it's own.

 * Summary:
	Private Show App; Paying viewers get access to the private show automatically.
	Room-management commands for broadcaster and moderators available.
	Options for a goal and goal timer available. (And much more!)
	Catches non-ticket holders (room crashers) when they enter a passworded room.
	If a user would like to press their luck to try and win a ticket they may also do just that.


 * Description:
	Private Show App - Paying viewers get access to the private show automatically.
	- Passworded show: Upon paying the channel password is sent to the viewer
	- Normal show: Upon paying the viewer sees the limited-cam stream. 
	- Moderators have the ability to add users manually to cover special circumstances.
	- Ticket holders will have highlighted text in the chat (can be toggled off)
	- Broadcaster can change the password at any time and the new 
	  password is sent automatically to all ticket holders.

* IMPORTANT: (Hey broadcaster, hey channel mods, read this!)
	The broadcaster should NOT deactivate the App immediately after 
	entering the passworded room so that if required, a '/changepw' command 
	can be issued if room crashers are detected. If deactivated, the ticket 
	holder list will be lost to the App. The ticket holder list CAN be 
	restored however if the output from the '/tickets' command is saved along the way.
 
 * Awards:

 
*/


/********** App Data **********/
var app =
{
	name 	: "'CrazyTicket-cinema'",	/* Script name						*/
	type	: 'App',			/* Script type: bot|app				*/
	version	: '1.002',			/* Internal: Script version number	*/
	build	: '.006',			/* Internal: Script build number	*/
	date	: '2016.07.03',		/* Internal: Script build date		*/
	acg		: 'acrazyguy',		/* main developer					*/
	ph		: 'phatkatmeow',	/* main developer					*/
	te		: 'jeffreyvels1994',			/* testbed.cb account (phat)		*/
	pe		: 'perd',			/* testbed.cb account (crazy)		*/
	sf		: 'sartfack',		/* testbed.cb account (crazy)		*/
	rx		: 'robx7',			/* Associate developer				*/
	bli		: 'birdylovesit',	/* The inspiration					*/
	bf		: 'blazefyre',		/* The inspiration's sidekick		*/
	CD		: 'dump'			/* debug: quick overview			*/
};


/***** App colors *****/
var COLOR =
{
	DEVELOPER	: '#D9F7F7',	/* Very light blue: Highlight colour for developers		*/
	BRED		: '#FF1407',	/* Bright red: Timer notice, misc. important messages	*/
	MRED		: '#D80A00',	/* Medium red											*/
	HIGHLIGHT	: '#EEE5FF',	/* Pastel purple: Highlight colour for ticket holders	*/
	SUCCESS 	: '#468847',	/* Green: Everything is fine							*/
	ERROR 		: '#B94A48',	/* Red: Everything fails								*/
	INFO 		: '#144D8C',	/* Blue-grey: Help and misc info						*/
	NOTICE		: '#6900CC',	/* Bluish purple: General chat notice					*/
	DPURPLE		: '#663399',	/* Dark purple											*/
	LPURPLE		: '#8041BF',	/* Lighter purple										*/
	BLUE		: '#000099',	/* Dark blue											*/
	MOD			: '#DC0000',	/* Moderator red										*/
	FAN			: '#009900',	/* Fan green											*/
	SYNTAX		: '#995B00',	/* Brownish: Usage notice colour and messages
								   to broadcaster on mod-action							*/
	HVTEXT 		: '#D80A00',	/* Reddish: Text colour for Hi-Vis notices				*/
	HVBACK 		: '#FFFFBF',	/* Light yellow: Backbround colour for Hi-Vis notices	*/
	MAG			: '#E509E5',	/* Magenta												*/
	BLI			: '#DDFFCC',	/* Pastel green - Birdy									*/
	BF			: '#FFE0EA'		/* Pastel pink - Blaze									*/
	
};


/***** App commands *****/
var COMMAND =
{
	// Viewer Commands:
	CMDS		: 'cmds',		/* List of these commands					*/
	TICKETS		: 'tickets',	/* Lists users who paid for a ticket		*/
	PASSWORD	: 'pass',		/* Sends pass or Notice to ticket holder	*/
	TIMELEFT	: 'timeleft',	/* Check time remaining on goal timer		*/
	SHOWTIME	: 'showtime',	/* Displays current hidden cam show length	*/
	USETICKET	: 'useticket',	/* Allows viewer to use an OTS ticket		*/
	SAVETICKET	: 'saveticket',	/* Allows viewer to save a ticket to OTS	*/

	// Moderator Commands, IF broadcaster set include-mods to 'Yes':
	ADD			: 'add',		/* Add one or more viewers to ticket list	*/
	AU			: 'au',			/* Add user(s) alias						*/
	DEL			: 'del',		/* Delete a user							*/
	DU			: 'du',			/* Del user alias							*/

	// Moderator Commands:
	OTS			: 'ots',		/* Manipulates the OTS								*/
	SENDPW		: 'sendpw',		/* Send pass to all or to a user					*/
	ADDP		: 'addp',		/* Add viewer to array paidList						*/
	ADDOTS		: 'addots',		/* Add viewer(s) to otsTickets.						*/
	DELP		: 'delp',		/* Delete viewer from array paidList				*/
	DELOTS		: 'delots',		/* Delete viewer from array otsTickets				*/
	HILITE		: 'hilite',		/* Text highlighting toggler						*/
	HL			: 'hl',			/* Alias for HILITE command							*/
	STARTSHOW	: 'startshow',	/* Start the limited feed show						*/
	STOPSHOW	: 'stopshow',	/* Stops the limited feed show						*/
	SHOWOVER	: 'showover',	/* Notifies entering viewers the show is ending.	*/
	SHOWEND		: 'showend',	/* Notifies viewers the show has ended.				*/
	NEWSHOW		: 'newshow',	/* Resets for a new show after show is over.		*/
	VIEWERS		: 'viewers',	/* Toggles display of ticket holders in room ON/OFF	*/
	SUBJECT		: 'subject',	/* Change room subject - plain						*/
	CTSUBJECT	: 'ctsubject',	/* Change room subject - 'CT says:'					*/
	LOCK 		: 'lock',		/* Toggler to tell script we're in PWed room		*/
	CHECK 		: 'check',		/* Check if the viewer has a ticket
								   (supports multiple users)						*/
	FAQ			: 'faq', 		/* FAQ about the script, for the staff				*/
	CTN			: 'ctn',		/* Sends a notice to the chat.						*/
	CTB			: 'ctb',		/* Sends a notice to the broadcaster.				*/
	CTM			: 'ctm',		/* Sends a notice to the mods as a group.			*/
	CTT			: 'ctt',		/* Sends a notice to the ticket holders.			*/
	CTV			: 'ctv',		/* Sends a notice to a viewer.						*/
	SCHAT		: 'schat',		/* Suppresses public chat during 'hidden cam'.		*/
	SPASS		: 'spass',		/* Suppresses password send during ticket sales
								   for a 'hidden cam' show.							*/
	TIPSOFF		: 'tipsoff',	/* Suppresses tip total info.						*/
	STARTTIMER 	: 'starttimer',	/* Start an x minute timer							*/
	ADDTIME		: 'addtime',	/* Add time in minutes to the timer.				*/
	PLIST		: 'plist',		/* List only paid ticket holders list format		*/
	PLISTW		: 'plistw',		/* List only paid ticket holders wide format		*/
	VLIST		: 'vlist',		/* List only viewers watching the show				*/
	NRLIST		: 'nrlist',		/* List ticket holders who have left the room		*/
	ALIST		: 'alist',		/* List only manually added viewers.				*/
	AALIST		: 'aalist',		/* List only auto-added viewers.					*/
	EMLIST		: 'emlist',		/* List recorded emails								*/
	OTSLIST		: 'otslist',	/* List viewers on the outstanding ticket list.		*/
	USEDOTS		: 'usedots',	/* List used OTS tickets.							*/
	NEW			: 'new',		/* Display 'What's New' text.						*/
	EMAIL		: 'email',		/* Detect email in tip note							*/
	SIL			: 'sil',
	UNSIL		: 'unsil',
	SLIST		: 'slist',

	// Broadcaster Only Commands:
	CHANGEPW	: 'changepw',	/* Change the password				*/
	CTPRICE		: 'ctprice',	/* Change the ticket price			*/
	CTRESET		: 'ctreset'		/* Resets CT for a new show			*/
};


/***** Flags *****/
var FLAG =
{
	goal	: false,
	debug	: false,	/* internal debug state: false (off by default)			*/
	dev 	: false,	/* internal dev hl state: false (off by default)		*/
	hilite 	: true,		/* on (true) by default for COLOR.HIGHLIGHT.			*/
	bli		: true,
	bf		: true,
	lock 	: false,	/* off (false) by default for passed room toggler.		*/
	schat	: false,	/* Used by '/schat' command to suppress public chat.	*/
	spass	: false,	/* Used by '/spass' command to suppress password send.	*/
	toff	: false,	/* Used by '/tipsoff' to suppress the tip total info
						   from being written to the info panel.				*/
	timer	: false,	/* Indicates if timer has been started					*/
	hcam	: false,	/* Indicates 'hidden cam' show is on or off.			*/
	sover	: false,	/* Sell no tickets.										*/
	end		: false,	/* End of show.											*/
	email	: false,	/* Turns on/off email detection in tip note.			*/
	ots		: false		/* Indicates if the Outstanding Ticket System is in use.	
						   Off by default.										*/
};


/********** Misc Variables **********/

var cmdPrefix	= '/';

var dashLine	= "------------------------------------------------------------";

var typeCmds	= " Type " +cmdPrefix+COMMAND.CMDS+ " to see all commands.";

var ONLY_ROOMHOST	= "* Command is only available to the room host.";
var ONLY_MODS		= "* Command is only available to moderators and the room host.";

var newTeaser = "-------- WHAT'S NEW ---------- 2015.02.27 ---------\n* To see what's new in " +app.name+ ", type: /new\n" +dashLine+ "------";

var whatsNew = "---------- WHAT'S NEW ----------\n* The subgoal functionality has been removed.\n";

var otsMsg = "You have an outstanding ticket that you can use for this show.\n* To use your ticket simply type /useticket in the chat and you will be added to the ticket holders list for this show.\n* If you change your mind BEFORE the show starts simply type /saveticket in the chat, and your ticket will become available for another time.\n"

var otsNE = "\n* The Outstanding Ticket System is not ENABLED.\n";

var roomHost		= cb.room_slug;
var MODS			= 'red';
var FANS			= 'green';

var totalTipped		= 0;
var timerMinutes	= 0;
var hiddTime		= 0;
var RollTipAmount   = 0;
var rePassword;

/***** Arrays *****/
var paidList 		= [];	// Viewers who have paid for tickets
var viewerList		= [];	// Ticket holders currently in the room
var nirList			= [];	// Ticket holders currently NOT in the room
var addList			= [];	// Manually added ticket holders
var autoList		= [];	// Auto-added ticket holders
var silList			= [];	// Viewers who have been muted
var otsTickets		= [];	// Viewers who have an OTS ticket available to them
var usedOTS			= [];	// Viewers who have used their OTS tickets
var devList			= [];

var emList = 
{
	name	: [],
	email	: []
};

var startTime 		= new Date();	// The time the App is started.


/************* API *************/

cb.settings_choices =
[
{
	name: 'goal',
	type: 'int',
	minValue: 0,
	label: "Token Goal (optional)",
	required: false
},
{
	name: 'show_description',
	type: 'str',
	minLength: 1,
	maxLength: 255,
	defaultValue: "",
	label: "Show Description (optional)",
	required: false
},
{
	name: 'buyin',
	type: 'int',
	minValue: 1,
	defaultValue: 25,
	label: "Ticket Price"
},
{
	name: 'rollin',
	type: 'int',
	minValue: 1,
	defaultValue: 10,
	label: "Roll Dice Price"
},
{
	name: 'rollpercent',
	type: 'int',
	minValue: 1,
	defaultValue: 10,
	label: "Win Percent Rate"
},
{
	name: 'hidetips',
	type: 'choice',
		choice1: 'Yes',
		choice2: 'No',
	defaultValue: 'No',
	label: "Hide tip total from viewers?"
},
{
	name: 'showviewers',
	type: 'choice',
		choice1: 'Yes',
		choice2: 'No',
	defaultValue: 'Yes',
	label: "Show the no. of ticket holders actually in the room (Viewing)?"
},
{
	name: 'showtype',
	type: 'choice',
		choice1: 'Hidden Cam',
		choice2: 'Password',
	defaultValue: 'Hidden Cam',
	label: "Type of show?"
},
{
	name: 'password',
	type: 'str',
	minLength: 1,
	maxLength: 255,
	defaultValue: "",
	label: "Enter password (no spaces) - NOT required for Hidden Cam",
	required: false
},
{
	name: 'os_tickets',
	type: 'choice',
		choice1: 'Yes',
		choice2: 'No',
	defaultValue: 'No',
	label: "Enable the Outstanding Ticket System?"
},
{
	name: 'otsholders',
	type: 'str',
	minLength: 1,
	maxLength: 255,
	defaultValue: "",
	label: "Enter Outstanding Ticket holders' names here if you only have a few. * NAMES MUST BE SEPARATED BY A COMMA *",
	required: false
},
{
	name: 'include_mods',
	type: 'choice',
		choice1: 'Yes',
		choice2: 'No',
	defaultValue: 'Yes',
	label: "Allow moderators to add/delete users (and themselves) to the show?"
},
{
	name: 'modprice',
	type: 'choice',
		choice1: 'Yes',
		choice2: 'No',
	defaultValue: 'No',
	label: "Allow moderators to change the ticket price for you?"
},
{
	name: 'autoadd_mods',
	type: 'choice',
		choice1: 'Yes',
		choice2: 'No',
	defaultValue: 'No',
	label: "Automatically give Mods a ticket when they enter the room?"
},
{
	name: 'autoadd_fans',
	type: 'choice',
		choice1: 'Yes',
		choice2: 'No',
	defaultValue: 'No',
	label: "Automatically give Fanclub Members a ticket when they enter?"
}
];


if (cb.settings.goal)							FLAG.goal	= true;
if (cb.settings.showtype 	=== 'Hidden Cam') 	FLAG.spass 	= true;
if (cb.settings.hidetips 	=== 'Yes')			FLAG.toff 	= true;
if (cb.settings.goal 		> 0)				FLAG.toff 	= false;
if (cb.settings.os_tickets 	=== 'Yes')			FLAG.ots 	= true;

/***** cb.settings_choices end *****/


/***** Load otsTickets array from setup field if used *****/
if (FLAG.ots && cb.settings.otsholders != "") {
	otsTickets = cb.settings.otsholders.split(/[,\s]+/);
}


/**
 * onDrawPanel
 */

cb.onDrawPanel(function(viewer)
{
	var row1label	= "";
	var row1val		= "";
	if (FLAG.goal) {
		row1label	= "Total Tips / Goal";
		row1val		= "" + totalTipped + " / " + cb.settings.goal;
	} else {
		row1label	= "Tips Received:";
		row1val		= "" + totalTipped;
	}
	
	if (FLAG.sover && !FLAG.end) {	
		if (cb.settings.showviewers === 'Yes')
			return {
				'template'	: '3_rows_of_labels',
				'row1_label': "Tickets/Viewing:",
				'row1_value': cb.limitCam_allUsersWithAccess().length + " / " + viewerList.length,
				'row2_label': "",
				'row2_value': "",
				'row3_label': "",
				'row3_value': ""
			}
			else
			return {
				'template'	: '3_rows_of_labels',
				'row1_label': "Tickets Holders:",
				'row1_value': cb.limitCam_allUsersWithAccess().length,
				'row2_label': "",
				'row2_value': "",
				'row3_label': "",
				'row3_value': ""
			}
			
	} else if (FLAG.end) {	
		return {
			'template'	: '3_rows_11_21_31',
			'row1_value': "The show is over.",
			'row2_value': "Ticket sales have",
			'row3_value': "been suspended.",
		}
	} else if (FLAG.toff) {	
		if (cb.settings.showviewers === 'Yes')
		return {
			'template'	: '3_rows_of_labels',
			'row1_label': "Tickets/Viewing:",
			'row1_value': cb.limitCam_allUsersWithAccess().length + " / " + viewerList.length,
			'row2_label': "Ticket price:",
			'row2_value': cb.settings.buyin,
			'row3_label': "",
			'row3_value': ""
		}
		else
		return {
			'template'	: '3_rows_of_labels',
			'row1_label': "Tickets Holders:",
			'row1_value': cb.limitCam_allUsersWithAccess().length,
			'row2_label': "Ticket price:",
			'row2_value': cb.settings.buyin,
			'row3_label': "",
			'row3_value': ""
		}
		
	} else {
		if (cb.settings.showviewers === 'Yes')
		return {
			'template'	: '3_rows_of_labels',
			'row1_label': row1label,
			'row1_value': row1val,
			'row2_label': "Tickets/Viewing:",
			'row2_value': cb.limitCam_allUsersWithAccess().length + " / " + viewerList.length,
			'row3_label': "Ticket/Press Luck Price:",
			'row3_value': cb.settings.buyin + " / " + cb.settings.rollin
		}
		else
		return {
			'template'	: '3_rows_of_labels',
			'row1_label': row1label,
			'row1_value': row1val,
			'row2_label': "Tickets Holders:",
			'row2_value': cb.limitCam_allUsersWithAccess().length,
			'row3_label': "Ticket/Press Luck Price:",
			'row3_value': cb.settings.buyin + " / " + cb.settings.rollin
		}
	}
}); // End of onDrawPanel() 


/**
 * onTip
 */

cb.onTip(function(tip)
{
	// var ticketFlag.= false;
	var tipAmount	= parseInt(tip['amount'],10);
	var viewer		= tip['from_user'];
	var tMsg		= tip['message'];
	var address		= "";
	var idx			= 0;
	
	if (cb.limitCam_userHasAccess(viewer) && !cbjs.arrayContains(viewerList,viewer))
		viewerList.push(viewer);
	
	// track total tips
	totalTipped += tipAmount;

	if ((totalTipped >= cb.settings.goal) && FLAG.goal) {
		cb.sendNotice(dashLine+"\n* "+app.name+" says: GOAL ACHIEVED!\n* Thanks to all tippers.\n"+dashLine,'','',COLOR.MRED,'bold');
		cb.settings.goal = 0;
		FLAG.goal = false;
	}

	if (FLAG.email) {
		address = tMsg.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i) || "";
		idx = emList.name.indexOf(viewer);
		if (idx > -1 && !emList.email[idx]) {
			emList.email[idx] = address;
			cb.sendNotice("* Missing email address recorded.",roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
		}
	}
	

	// track viewers for ticketed show
	if ((tipAmount >= cb.settings.buyin) && !FLAG.end) {
		if (!cb.limitCam_userHasAccess(viewer)) {
			cb.sendNotice("* Ticket sold to '" + viewer + "'",'','',COLOR.NOTICE,'bold');
			user('add',viewer,true);
			if (!cbjs.arrayContains(paidList,viewer)) paidList.push(viewer);
			if (!cbjs.arrayContains(viewerList,viewer)) viewerList.push(viewer);
			// ticketFlag = true;

			if (FLAG.spass) {
				cb.sendNotice(dashLine+"\n* You will be able to view the 'Hidden Cam' show.\n"+dashLine,viewer,COLOR.HIGHLIGHT,COLOR.NOTICE,'bold');
			}

			if (FLAG.email) {
				address = tMsg.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i) || "";
				emList.name.push(viewer);
				emList.email.push(address);
				if (!address) {
					cb.sendNotice("* You may have forgotten your email address in the tip note.",viewer,'',COLOR.BRED,'bold');
					cb.sendNotice("* Viewer '" +viewer+ "' may have forgotten their email address in the tip note.",roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
					cb.sendNotice("* Viewer '" +viewer+ "' may have forgotten their email address in the tip note.",'','',COLOR.MOD,'bold',MODS);
				} else {
					cb.sendNotice("* Email address recorded.",roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
				}
			} // End if FLAG.email
		} // End if !cb.limit..
	} // End if tipAmou...
	
	else if((tipAmount >= cb.settings.rollin) && !FLAG.end)
	{
		if(!cb.limitCam_userHasAccess(viewer))
		{			
			var addedTotal = 0;
			var youwon = false;
			cb.sendNotice("Pressing Luck",'','',COLOR.NOTICE,'bold');
			while(addedTotal <= tipAmount)
			{
				if(cb.settings.rollpercent >= Math.ceil(Math.random() * 100))
				{
					//You Won
					cb.sendNotice("* Congrats you WON '" + viewer + "'",'','',COLOR.NOTICE,'bold');
					youwon = true;
					break;
				}
				else
				{
					//Sorry You did not win re rolling
					if(addedTotal + cb.settings.rollin < tipAmount)
					{
						cb.sendNotice("* Sorry you did not win '" + viewer + "'" + " pressing your luck again!",'','',COLOR.NOTICE,'bold');
					}
				}
				addedTotal += cb.settings.rollin;
			}
			
			
			if(youwon == true)
			{
				cb.sendNotice("* Ticket sold to '" + viewer + "'",'','',COLOR.NOTICE,'bold');
				user('add',viewer,true);
				if (!cbjs.arrayContains(paidList,viewer)) paidList.push(viewer);
				if (!cbjs.arrayContains(viewerList,viewer)) viewerList.push(viewer);
				
				if (FLAG.spass) {
				cb.sendNotice(dashLine+"\n* You will be able to view the 'Hidden Cam' show.\n"+dashLine,viewer,COLOR.HIGHLIGHT,COLOR.NOTICE,'bold');
				}

				if (FLAG.email) {
					address = tMsg.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i) || "";
					emList.name.push(viewer);
					emList.email.push(address);
					if (!address) {
						cb.sendNotice("* You may have forgotten your email address in the tip note.",viewer,'',COLOR.BRED,'bold');
						cb.sendNotice("* Viewer '" +viewer+ "' may have forgotten their email address in the tip note.",roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
						cb.sendNotice("* Viewer '" +viewer+ "' may have forgotten their email address in the tip note.",'','',COLOR.MOD,'bold',MODS);
					} else {
						cb.sendNotice("* Email address recorded.",roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
					}
				} // End if FLAG.email
			}
			else
			{
				cb.sendNotice("* Sorry you did not win '" + viewer + "'" + " please try again!",'','',COLOR.NOTICE,'bold');
			}
			
		}
	}
	cb.drawPanel();

}); // End of onTip()

/**
 * onEnter
 */

cb.onEnter(function(viewer)
{

	// Variables
	var u		= viewer['user'];
	var isMod	= viewer['is_mod'];
	var isFan	= viewer['in_fanclub'];

	if (isMod) cb.sendNotice(newTeaser,u,COLOR.HIGHLIGHT,COLOR.NOTICE,'bold');

	// Is the room password locked?
	if (FLAG.lock && !cb.limitCam_isRunning()) { // if this is a password show ..
		// The script assumes the room is passworded,
		// Check if the user has NOT paid for a ticket
		if (!user('check',u) && u != roomHost) {
			// Inform the passworded room we have a party crasher
			cb.sendNotice("Room Crasher! '" + u + "' does NOT have a ticket!",u,'',COLOR.BRED,'bold');
		}
	}

	if (user('check',u)) {
		if (!cbjs.arrayContains(viewerList,u)) viewerList.push(u);
		cb.drawPanel();
	}

	if (cbjs.arrayContains(nirList,u))
		cbjs.arrayRemove(nirList,u);

	// Show entering viewer how long the show has been in progress.
	if (FLAG.hcam) { getShowTime(u); }
	if (FLAG.sover && !FLAG.end) {
		cb.sendNotice(dashLine + "\n* THE SHOW IS ABOUT TO END OR IS OVER. BUYING A TICKET NOW IS NOT RECOMMENDED.\n" + dashLine,u,'',COLOR.BRED,'bold');
	}
	
	if (!FLAG.sover && !FLAG.end) {
		if (cbjs.arrayContains(otsTickets,u) && FLAG.ots) cb.sendNotice(dashLine+"\n* '"+u+"':\n* "+otsMsg+dashLine,u,'',COLOR.MRED,'bold');
	}

	// Automatically add Mods and Fanclub members to the ticket list
	if ((isMod && cb.settings.autoadd_mods === 'Yes') || (isFan && cb.settings.autoadd_fans === 'Yes')) {
		autoAdd(u);
		cb.sendNotice(dashLine+"\n* You've automatically been added to the ticket list because you are " + (isMod ? "a moderator." : "in the fan club.") + " :woohoo\n"+dashLine,u,COLOR.HIGHLIGHT,COLOR.MRED,'bold');
	}
	
}); // End of onEnter()


/**
 * onLeave
 */

cb.onLeave(function(viewer)
{
	
	var viewer = viewer['user'];
	
	if (cbjs.arrayContains(viewerList,viewer)) {
		cbjs.arrayRemove(viewerList,viewer);
		if (!cbjs.arrayContains(nirList,viewer))
			nirList.push(viewer);
		cb.drawPanel();
	} // End if
	
}); // End of onLeave()


/**
 * onMessage
 */

cb.onMessage(function(msg)
{
	// split the chat message into a command, "cmd" and its parameters "cmdval"
	// further splits cmdval into array "cmdValArray"
	var regexCommandSplit	= '^' + cmdPrefix + '(\\S+)(?:\\b\\s*)(.*)?';
	var regexListSplit		= /[,\s]+/;
	var reCmdSplit 			= new RegExp(regexCommandSplit);
	// TODO var reCmdSplit = new RegExp("^\/(\\S+)(?:\\b\\s*)(.*)?");
	var cmdSplit 			= msg['m'].match(reCmdSplit);
	var cmd;
	var cmdval;
	var cmdValArray;
	if (cmdSplit) {
		cmd 		= cmdSplit[1];
		cmdval 		= cmdSplit[2];
		if (cmdval != null) cmdval = cmdval.replace(/^\s+|\s+$/g,'');
		if (cmdval != null) {
			cmdValArray = cmdval.split(regexListSplit);
		} else {
			cmdValArray = '';
		}
	}

	// for convenience
	var m 			= msg['m'];
	var u 			= msg['user'];
	var isMod		= msg['is_mod'];
	var isFan		= msg['in_fanclub'];
	var isRoomHost	= (u == roomHost);
	var isACG		= (u == app.acg);
	var viewer, toViewer;


	if (/^(\?|!)/.test(m)) {
		msg['X-Spam'] = true;
		return cb.sendNotice(dashLine+"\n* " +app.name+ ": Incorrect command prefix.\n"+dashLine,u,'',COLOR.MRED,'bold');
	}
		
	if (cb.limitCam_isRunning() && !cb.limitCam_userHasAccess(u) && !isRoomHost && !isMod && (u!=app.acg) && FLAG.schat) {
		msg['m'] = ":huh";
		msg['X-Spam'] = true;
		cb.sendNotice("* A hidden cam show is in progress and public chat messages are suppressed.",u,'',COLOR.NOTICE,'bold');
	}

	if (cmdval && (/^</.test(cmdval))) {
		msg['X-Spam'] = true;
		return cb.sendNotice(dashLine+"\n* The < and > are not required. Please re-enter.\n"+dashLine,u,'',COLOR.MRED,'bold');
	}

	if (cbjs.arrayContains(silList,u)) {
		msg['X-Spam'] = true;
		return;
	}

	// Automatically add Fanclub Member to the ticket list
	if (isFan && cb.settings.autoadd_fans === 'Yes') {
		autoAdd(u);
		cb.sendNotice(dashLine+"\n* You've automatically been added to the ticket list because you are in the fan club. :woohoo\n" +dashLine,u,COLOR.HIGHLIGHT,COLOR.MRED,'bold');
	}
	
	if (cb.limitCam_userHasAccess(u) && !cbjs.arrayContains(viewerList,u))
		viewerList.push(u);
	

	/***** Ok, let's start processing commands *****/
	
	switch (cmd) {


	/*******************
	 * Viewer Commands *
	 *******************/
	
	/***** Command List ***** /cmds *****/
	case COMMAND.CMDS:
		cb.sendNotice(getCommandList(u,isMod),u,'',COLOR.INFO,'bold');
	break;


	/***** Ticket List ***** /tickets *****/
	case COMMAND.TICKETS:
		cb.sendNotice(dashLine + "\n" + (cb.limitCam_allUsersWithAccess().length < 1 == true ? "* No tickets sold!" : cbjs.arrayJoin(cb.limitCam_allUsersWithAccess(),", ")) + "\n" + dashLine + "\n* Ticket holders: " + cb.limitCam_allUsersWithAccess().length + "\n" + dashLine,u,'',COLOR.NOTICE,'bold');
	break;


	/***** Get Password ***** /pass *****/
	case COMMAND.PASSWORD:
		if (user('check',msg['user']) || isRoomHost) {
			if (FLAG.spass) {
				cb.sendNotice("* You are on the ticket list and will see the show when it starts.",u,'',COLOR.NOTICE,'bold');
			} else {
				sendPasswordToUser(msg['user']);
			}
		} else {
			// Paid = no, tell the viewer to pay first
			cb.sendNotice("* You must buy a ticket to get access to the show.",msg['user'],'',COLOR.NOTICE,'bold');
		}
	break;


	/***** Get Time Left ***** /timeleft *****/
	case COMMAND.TIMELEFT:
		if (FLAG.timer) cb.sendNotice("* Less than " + timerMinutes + " minutes remaining to buy a ticket for " +cb.settings.buyin+ " before the show starts!",u,'',COLOR.BRED,'bold');
		else cb.sendNotice("* No goal timer is running.",u,'',COLOR.NOTICE,'bold');
	break;


	case COMMAND.SHOWTIME:
		if (FLAG.hcam) getShowTime(u);
		else cb.sendNotice("* No Hidden Cam show is currently in progress.",u,'',COLOR.NOTICE,'bold');
	break;


	case COMMAND.USETICKET:
		if (FLAG.ots) {
			if (!cb.limitCam_userHasAccess(u) && cbjs.arrayContains(otsTickets,u)) {
				cb.limitCam_addUsers([u]);
				cbjs.arrayRemove(otsTickets,u);
				if (!cbjs.arrayContains(usedOTS,u)) usedOTS.push(u);
				if (!cbjs.arrayContains(viewerList,u)) viewerList.push(u);
				cb.drawPanel();
				cb.sendNotice("\n* You have been added to the ticket holders list for this show.\n",u,'',COLOR.NOTICE,'bold');
				cb.sendNotice("\n* '"+u+"' has used their outstanding ticket.\n",roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
				cb.sendNotice("\n* Mods: '"+u+"' has used their outstanding ticket.\n",'','',COLOR.NOTICE,'bold',MODS);
			} else {
				cb.sendNotice("\n* Sorry, you have no outstanding ticket available.\n",u,'',COLOR.NOTICE,'bold');
			}
		} else {
			cb.sendNotice(otsNE,u,'',COLOR.NOTICE,'bold');
		}
	break;


	case COMMAND.SAVETICKET:
		if (FLAG.ots) {
			if (cb.limitCam_userHasAccess(u) && !FLAG.hcam && !cbjs.arrayContains(addList,u)) {
				otsTickets.push(u);
				cb.limitCam_removeUsers([u]);
				if (cbjs.arrayContains(usedOTS,u)) cbjs.arrayRemove(usedOTS,u);
				if (cbjs.arrayContains(viewerList,u)) cbjs.arrayRemove(viewerList,u);
				cb.drawPanel();
				cb.sendNotice("\n* You have been removed from the ticket holders list for this show and your ticket saved for later use.\n",u,'',COLOR.NOTICE,'bold');
				cb.sendNotice("\n* '"+u+"' has saved their ticket for later use.\n",roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
				cb.sendNotice("\n* Mods: '"+u+"' has saved their ticket for later use.\n",'','',COLOR.NOTICE,'bold',MODS);
			} else {
				cb.sendNotice("\n* Sorry, you have no ticket to save or the show has started.\n",u,'',COLOR.NOTICE,'bold');
			}
		} else {
			cb.sendNotice(otsNE,u,'',COLOR.NOTICE,'bold');
		}
	break;


	
	/**************************************
	 * Moderator and Broadcaster Commands *
	 **************************************/
	
	/***** OTS ***** /ots *****/
	case COMMAND.OTS:
		if (isMod || isRoomHost) {
			if (cmdval) {
				if (cmdval === "on") {
					FLAG.ots = true;
					cb.sendNotice("\n* The Outstanding Ticket System is now ENABLED.\n",u,'',COLOR.NOTICE,'bold');
				}
				if (cmdval === "off") {
					FLAG.ots = false;
					cb.sendNotice("\n* The Outstanding Ticket System is now DISABLED.\n",u,'',COLOR.NOTICE,'bold');
				}
			} else {
				cb.sendNotice("\n* The Outstanding Ticket System is currently "  + (FLAG.ots == true ? "ENABLED.\n" : "DISABLED.\n"),u,'',COLOR.NOTICE,'bold');
			}
		}
	break;
	

	/***** Send Password ***** /sendpw *****/
	case COMMAND.SENDPW:
		if (isMod || isRoomHost) {
			
			if (cmdval === "?") {
				var sendpwHelp = "\n";
				sendpwHelp += "Usage: "+cmdPrefix+COMMAND.SENDPW+" <user>\n";
				sendpwHelp += "Use '"+cmdPrefix+COMMAND.SENDPW+"' to resend the password to all ticket holders. If the optional <user> argument is supplied, the password is sent ONLY to that viewer. The password CANNOT be sent to any non-ticket holders.\n";
				
				msg['X-Spam'] = true;
				return cb.sendNotice(sendpwHelp,u,'',COLOR.INFO,'bold');
			}

			if (cmdval) {
				// is cmdval a ticketed user? if so, we can send the pass, else complain
				if (user('check',cmdval)) {
					sendPasswordToUser(cmdval);
					cb.sendNotice("* Password sent to '" + cmdval + "'.",u,'',COLOR.NOTICE,'bold');					
				} else {
					cb.sendNotice("* User '" + cmdval + "' does NOT have a ticket.",u,'',COLOR.NOTICE,'bold');
				}
			} else {
				// Only send password if there's at least 1 ticket holder
				if (cb.limitCam_allUsersWithAccess().length > 0) {
					sendPasswordToUsers();
					cb.sendNotice("* Password sent to all ticket holders",'','',COLOR.NOTICE,'bold');
				} else {
					cb.sendNotice("* Password not sent, no tickets have been sold",'','',COLOR.NOTICE,'bold');
				}
			}
		} else {
			// if it is a viewer, and a ticket holder, re-send the password
			if (user('check',msg['user'])) {
				// has paid for a ticket, send viewer the pass
				sendPasswordToUser(msg['user']);
			} else {
				// has not paid for a ticket, tell the user to pay first
				cb.sendNotice("* You must buy a ticket to get the password",u,'',COLOR.ERROR,'bold');
			}
		}
	break;


	/***** Add user(s) ***** /add *****/
	case COMMAND.ADD:
	case COMMAND.AU:
		// is the user a mod, or the broadcaster, or a viewer?
		if ((isMod && cb.settings.include_mods == 'Yes') || isRoomHost) {

			// if an argument was given,..
			if (cmdval === "?") {
				var addHelp = "\n";
				addHelp += "Usage: "+cmdPrefix+COMMAND.ADD+" <user1 user2 user3 etc>\n";
				addHelp += "Use '"+cmdPrefix+COMMAND.ADD+"' and its alias to manually add a viewer or viewers to the ticket holder list. If no <user> is specified, the command issuer is added if the broadcaster allows.\n";
				addHelp += "The output from the '"+cmdPrefix+COMMAND.TICKETS+"' command can be copied and saved periodically in case the App crashes. Once the App is restarted, the '"+cmdPrefix+COMMAND.ADD+"' command can be issued and the saved list pasted in after the command to restore the ticket holder list.\n";
				addHelp += "Alias: "+cmdPrefix+COMMAND.AU+ " = [a]dd [u]ser.\n";
				
				msg['X-Spam'] = true;
				return cb.sendNotice(addHelp,u,'',COLOR.INFO,'bold');
			}

			
			if (cmdval) {

				if (cmdValArray.length > 1) {
					
					// We are adding multiple viewers at once
					// for each user in array, add the user to the ticket list
					cb.sendNotice("* Mass adding users to the ticket list",u,'',COLOR.NOTICE,'bold');
					
					for (var i=0; i<cmdValArray.length; i++) {

						if (!user('check',cmdValArray[i]) && cmdValArray[i] != "") {
							// User is not yet on the list
							user('add',cmdValArray[i],false); // And add the user (without sending the pass)
							if (!cbjs.arrayContains(addList,cmdValArray[i])) addList.push(cmdValArray[i]);
							cb.sendNotice("* Added: '" + cmdValArray[i] +  "'.",u,'',COLOR.SUCCESS,''); // say who.
							cb.sendNotice("* '"+cmdValArray[i]+"' you have been added to the ticket holders list.",cmdValArray[i],'',COLOR.NOTICE,'bold');
						} else if (cmdValArray[i] != "") {
							// Safe to assume we don't have to add this user?
							cb.sendNotice("* Skipped: '" + cmdValArray[i] + "' is already on the list.",u,'',COLOR.SYNTAX);
						}

					} // end for

					cb.sendNotice("* Mass adding completed - Viewers Notified.",u,'',COLOR.NOTICE,'bold'); // Kinda nice to know we're done
					cb.sendNotice("* Type " + cmdPrefix + COMMAND.TICKETS + " to confirm, or " + cmdPrefix + COMMAND.SENDPW + " to give the ticket holders the password",u,'',COLOR.NOTICE,'bold');
					cb.sendNotice("* Mod '" + u + "' mass-added viewers: " + cbjs.arrayJoin(cmdValArray,", ") + " to the ticket holders list.",roomHost,'',COLOR.SYNTAX,''); // inform broadcaster
					
				} else {
					
					if ( user('check',cmdval) ) {
						cb.sendNotice("* Skipped: '" + cmdval + "' is already on the list.",u,'',COLOR.NOTICE,'bold');
					} else {
						// We are just adding one viewer
						user('add',cmdval,true);
						if (!cbjs.arrayContains(addList,cmdval)) addList.push(cmdval);
						if (!cbjs.arrayContains(viewerList,cmdval)) viewerList.push(cmdval);
						// Inform viewer
						cb.sendNotice("* '" + cmdval + "' you have been added to the ticket holders list.",cmdval,'',COLOR.NOTICE,'bold');
					
						// Inform adder
						cb.sendNotice("* Viewer '" + cmdval + "' added to the ticket list.",u,'',COLOR.NOTICE,'bold');
					
						// Inform broadcaster
						cb.sendNotice("* Viewer '" + cmdval + "' added to the ticket list by '" + u + "'.",roomHost,'',COLOR.SYNTAX,'');
					}
					
				} // end if +cmdValArray.length
			} else { 

				// No user(s) provided, the mod is adding him/herself to the list:
				// Before we add, check if the user is already on the list.
				// Make sure we send the password
				if ( !user('check',msg['user']) ) {
					user('add',msg['user'],true);
					if (!cbjs.arrayContains(addList,msg['user'])) addList.push(msg['user']);
					// inform broadcaster that a mod took a free ticket
					cb.sendNotice("* Mod '" + msg['user'] + "' added themself to ticket list.",roomHost,'',COLOR.SYNTAX,'');
				} else {
					// the user is already on the list, skip
					cb.sendNotice("* Oops, '" + msg['user'] + "', it seems you are already on the ticket list.",msg['user'],'',COLOR.SYNTAX,'');
				}

			} // end if cmdval
		} else {
			if (isMod) {
				cb.sendNotice("* The broadcaster has disabled this command for moderators.",u,'',COLOR.NOTICE,'bold');
			} else {
				cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
			}
		} // end if isMod/bcaster/viewer
		cb.drawPanel(); // Update the info panel
	break;


	/***** Add to paidList ***** /addp *****/
	case COMMAND.ADDP:
		if (isMod || isRoomHost) { if (cmdval) paidList.push(cmdval); }
	break;


	/***** Add to osList ***** /addots *****/
	case COMMAND.ADDOTS:
		if (FLAG.ots) {
			if ((isMod && cb.settings.include_mods == 'Yes') || isRoomHost) {
				
				if (cmdval) {

					if (cmdValArray.length > 1) {
						
						for (var i=0; i<cmdValArray.length; i++) {
							
							if (!cbjs.arrayContains(otsTickets,cmdValArray[i])) {
								otsTickets.push(cmdValArray[i]);
								cb.sendNotice("* Added: '" + cmdValArray[i] + "'.",u,'',COLOR.SUCCESS,''); // say who.
								cb.sendNotice(dashLine+"\n* '"+cmdValArray[i]+"':\n* "+otsMsg+dashLine,cmdValArray[i],'',COLOR.MRED,'bold');
							}

						} // end for
						
						cb.sendNotice("* Mass adding completed - Viewers Notified.",u,'',COLOR.NOTICE,'bold'); // Kinda nice to know we're done
						cb.sendNotice("* Type " + cmdPrefix + COMMAND.OTSLIST + " to confirm",u,'',COLOR.NOTICE,'bold');
						cb.sendNotice("* Mod '" + u + "' mass-added viewers: " + cbjs.arrayJoin(cmdValArray,", ") + " to the outstanding ticket list.",roomHost,'',COLOR.SYNTAX,''); // inform broadcaster
						
					} else {
						
						if (!cbjs.arrayContains(otsTickets,cmdval)) {
							otsTickets.push(cmdval)
							// Inform viewer
							cb.sendNotice(dashLine+"\n* '" + cmdval + "':\n* "+otsMsg+dashLine,cmdval,'',COLOR.MRED,'bold');
						
							// Inform adder
							cb.sendNotice("* Viewer '" + cmdval + "' added to the outstanding ticket list.",u,'',COLOR.NOTICE,'bold');
						
							// Inform broadcaster
							cb.sendNotice("* Viewer '" + cmdval + "' added to the outstanding ticket list by '" + u + "'.",roomHost,'',COLOR.SYNTAX,'');
						}
					}
						
				} // end if cmdval
				
			} else {
				if (isMod) {
					cb.sendNotice("* The broadcaster has disabled this command for moderators.",u,'',COLOR.NOTICE,'bold');
				} else {
					cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
				}
			} // end if isMod/bcaster/viewer
		} else {
			cb.sendNotice(otsNE,u,'',COLOR.NOTICE,'bold');
		}
	break;


	/***** Delete User ***** /del *****/
	case COMMAND.DEL:
	case COMMAND.DU:
		if ((isMod && cb.settings.include_mods === 'Yes') || isRoomHost) {

			if (cmdval === "?") {
				var delHelp = "\n";
				delHelp += "Usage: "+cmdPrefix+COMMAND.DEL+" <user>\n";
				delHelp += "Use '"+cmdPrefix+COMMAND.DEL+"' and its alias to manually delete a viewer from the ticket holder list.\n";
				delHelp += "Alias: "+cmdPrefix+COMMAND.DU+ " = [d]elete [u]ser.\n";
				
				msg['X-Spam'] = true;
				return cb.sendNotice(delHelp,u,'',COLOR.INFO,'bold');
			}


			if (cmdval) {

				// Is the requested user really a ticket holder?
				if (user('check',cmdval)) {
					// Yes
					user('del',cmdval);
					cbjs.arrayRemove(addList,cmdval);
					cb.sendNotice("* Viewer '" + cmdval + "' removed from the ticket list.",u,'',COLOR.NOTICE,'bold');
					cb.sendNotice("* Viewer '" + cmdval + "' removed from the ticket list by '" + u + "'.",roomHost,'',COLOR.SYNTAX,''); // inform broadcaster
				} else {
					// No
					cb.sendNotice("* Viewer '" + cmdval + "' is not on the ticket list.",u,'',COLOR.ERROR,'bold');
				}
			} else {
				cb.sendNotice('* Syntax: '+cmdPrefix+COMMAND.DEL+' <user>',u,'',COLOR.SYNTAX,'bold');
			}
		} else {
			if (isMod) {
				cb.sendNotice("* The broadcaster has disabled this command for moderators.",u,'',COLOR.NOTICE,'bold');
			} else {
				cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
			}
		}
		cb.drawPanel();
	break;


	/***** Delete from paidList ***** /delp *****/
	case COMMAND.DELP:
		if (isMod || isRoomHost) { if (cmdval) cbjs.arrayRemove(paidList,cmdval); }
	break;


	case COMMAND.DELOTS:
		if (FLAG.ots) {
			if (isMod || isRoomHost) {
				if (cmdval) {
					cbjs.arrayRemove(otsTickets,cmdval);
					cb.sendNotice("\n* '"+cmdval+"' has been removed from the outstanding ticket list.\n",u,'',COLOR.NOTICE,'bold');
				}
			} else {
				cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
			}
		} else {
			cb.sendNotice(otsNE,u,'',COLOR.NOTICE,'bold');
		}
	break;


	/***** Highlight Text Toggle ***** /hl *****/
	case COMMAND.HILITE:
	case COMMAND.HL:
		if (isMod || isRoomHost) {
			
			if (cmdval === "?") {
				var hlHelp = "\n";
				hlHelp += "The '"+cmdPrefix+COMMAND.HILITE+"' command and its alias toggles the state of the text highlighting for ticket holders ON and OFF depending on the current state. It is ON by default when the App is started to allow easy identification of ticket holders.\n";
				hlHelp += "Alias: "+cmdPrefix+COMMAND.HL + " = [h]i[l]ite.\n";
				
				msg['X-Spam'] = true;
				return cb.sendNotice(hlHelp,u,'',COLOR.INFO,'bold');
			}
			
			// Toggle Highlighting ON/OFF
			FLAG.hilite ? FLAG.hilite = false : FLAG.hilite = true;
			
			if (!isRoomHost) {
				cb.sendNotice("* Highlighting of ticket holders is now " + (FLAG.hilite ? "ON." : "OFF."),u,'',COLOR.NOTICE,'bold');
			}
			cb.sendNotice("* Highlighting of ticket holders is now " + (FLAG.hilite	? "ON." : "OFF."),roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
			
		} else {
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		}
	break;


	/***** Suppress Public Chat ***** /schat *****/
	case COMMAND.SCHAT:
		if (isMod || isRoomHost) {
			
			if (cmdval === "?") {
				var schatHelp = "\n";
				schatHelp += "The '"+cmdPrefix+COMMAND.SCHAT+"' command toggles the suppression of the public chat ON and OFF when in 'hidden cam' mode. It is OFF by default when the App is started.\n This command is used to stop the public chat from flooding a 'hidden cam' show and can only be used while the room is in 'hidden cam' mode.\n";
				
				msg['X-Spam'] = true;
				return cb.sendNotice(schatHelp,u,'',COLOR.INFO,'bold');
			}
			
			if (cb.limitCam_isRunning()) {
				
				//Toggle hidden cam chat ON/OFF
				FLAG.schat ? FLAG.schat = false : FLAG.schat = true;
			
				if (!isRoomHost) {
					cb.sendNotice("* Suppression of public chat is now " + (FLAG.schat ? "ON." : "OFF."),u,'',COLOR.NOTICE,'bold');
				}
				cb.sendNotice("* Suppression of the public chat is now " + (FLAG.schat ? "ON." : "OFF."),roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
			} else {
				cb.sendNotice("* 'Hidden Cam' must be active for this command to be used",u,'',COLOR.NOTICE,'bold');
			}
			
		} else {
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		}
	break;


	/***** Suppress Password Send ***** /spass *****/
	case COMMAND.SPASS:
		if (isMod || isRoomHost) {
			
			if (cmdval === "?") {
				var spassHelp = "\n";
				spassHelp += "The '"+cmdPrefix+COMMAND.SPASS+"' command toggles the suppression of the password send when selling tickets for a 'hidden cam' show ON and OFF. It is OFF by default when the App is started.\n This command is used to suppress the sending of passwords when selling tickets for a 'hidden cam' show.\n Does NOT affect password sends via '/sendpw'.\n";
				
				msg['X-Spam'] = true;
				return cb.sendNotice(spassHelp,u,'',COLOR.INFO,'bold');
			}
			
			// Toggle password send ON/OFF
			FLAG.spass ? FLAG.spass = false : FLAG.spass = true;
			
			if (!isRoomHost) {
				cb.sendNotice("* Suppression of password send is now " + (FLAG.spass ? "ON." : "OFF."),u,'',COLOR.NOTICE,'bold');
			}
			cb.sendNotice("* Suppression of password send is now " + (FLAG.spass ? "ON." : "OFF."),roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
		} else {
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		}
	break;


	/***** Suppress Tip Total in Panel ***** /tipsoff *****/
	case COMMAND.TIPSOFF:
		if (isMod || isRoomHost) {
			
			if (cmdval === "?") {
				var tipsoffHelp = "\n";
				tipsoffHelp += "The '"+cmdPrefix+COMMAND.TIPSOFF+"' command toggles the suppression of the total tips display in the info panel ON and OFF. It is OFF by default when the App is started.\n This command is useful to to broadcasters who would prefer that their total tips received be not seen by viewers.\n";
				
				msg['X-Spam'] = true;
				return cb.sendNotice(tipsoffHelp,u,'',COLOR.INFO,'bold');
			}
			
			FLAG.toff ? FLAG.toff = false : FLAG.toff = true;

			cb.drawPanel();
			if (!isRoomHost) {
				cb.sendNotice("* Suppression of 'tip total' is now " + (FLAG.toff ? "ON." : "OFF."),u,'',COLOR.NOTICE,'bold');
			}
			cb.sendNotice("* Suppression of 'tip total' is now " + (FLAG.toff ? "ON." : "OFF."),roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
			
		} else {
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		}
	break;


	/***** Lock Room ***** /lock *****/
	case COMMAND.LOCK:
		// Is the user doing /lock the broadcaster or a moderator?
		if (isMod || isRoomHost) {
			// Is the room public?

			if (cmdval === "?") {
				var lockHelp = "\n";
				lockHelp += "Use '"+cmdPrefix+COMMAND.LOCK+"' after passwording a room to enable detection of the entry of non-ticket holders i.e 'room crashers'.\n";
				lockHelp += "The '"+cmdPrefix+COMMAND.LOCK+"' command toggles the lock state ON or OFF depending on the current state. It is OFF by default when the App is started.\n";
				
				msg['X-Spam'] = true;
				return cb.sendNotice(lockHelp,u,'',COLOR.INFO,'bold');
			}
			
			
			if (!cb.limitCam_isRunning()) {
				
				// Toggle room lock ON/OFF
				FLAG.lock ? FLAG.lock = false : FLAG.lock = true;
				
				if (FLAG.lock) {
					cb.changeRoomSubject(app.name + " says: Enjoy the show everybody, and please tip if you do! " + typeCmds);
				}
				
				if (!isRoomHost) {
					cb.sendNotice("* " + app.name + " will now assume the room is "+(FLAG.lock ? "passworded." : "public."),u,'',COLOR.NOTICE,'bold');
				}
				cb.sendNotice("* " + app.name + " will now assume the room is " +(FLAG.lock ? "passworded." : "public."),roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
			} else {
				cb.sendNotice("* The '"+cmdPrefix+COMMAND.LOCK+"' command cannot be used during a 'Hidden Cam' show.",u,'',COLOR.NOTICE,'bold'); 
			}
		} else {
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		}
	break;


	/***** Verify Viewer ***** /check *****/
	case COMMAND.CHECK:
		// is the user a mod, or the broadcaster, or a viewer?
		if (isMod || isRoomHost) {
			// if an argument was given,.. 
			
			if (cmdval === "?") {
				var checkHelp = "\n";
				checkHelp += "Usage: "+cmdPrefix+COMMAND.CHECK+" <user1 user2 user3 etc>\n";
				checkHelp += "Use '"+cmdPrefix+COMMAND.CHECK+"' to manually check if a viewer or viewers are valid ticket holders.\n";
				
				msg['X-Spam'] = true;
				return cb.sendNotice(checkHelp,u,'',COLOR.INFO,'bold');
			}

			if (cmdval) {				
				if (cmdValArray.length > 1) {
					// We are checking a list, not just one viewer
					// for each user in array, check the user against the ticket list
					cb.sendNotice("* Checking a list of users against the ticket list: "+cmdValArray.toString(),u,'',COLOR.NOTICE,'bold');
					for (var i=0; i<cmdValArray.length; i++) {
						if (!user('check',cmdValArray[i])) {
							cb.sendNotice("* Checked: User ''" + cmdValArray[i] + "' does NOT have a ticket.",u,'',COLOR.ERROR,'bold');
						} else {
							cb.sendNotice("* Checked: User '" + cmdValArray[i] + "' has a ticket.",u,'',COLOR.SUCCESS,'');
						}
					}
					cb.sendNotice("* Checking completed.",u,'',COLOR.NOTICE,'bold');
				} else {
					// We are checking just one viewer
					// check if cmdval has paid for a ticket or is a party crasher
					if (user('check',cmdval)) {
						// true (party boy)
						cb.sendNotice("* Checked: User '" + cmdval + "' has a ticket.",u,'',COLOR.SUCCESS,'bold');
					} else {
						// false (party crasher)
						cb.sendNotice("* Checked: User '" + cmdval + "' does NOT have a ticket.",u,'',COLOR.ERROR,'bold');
					} // end if isTicketed(cmdval)
				} // end if +cmdValArray.length
				
			} else { 
				cb.sendNotice("* Syntax: " + cmdPrefix + COMMAND.CHECK + " <user1,user2,user3> ",u,'',COLOR.SYNTAX,'bold');
			} // end if cmdval
		} else {
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		} // end if isMod/bcaster/viewer
	break;


	/***** Display FAQ ***** /faq *****/
	case COMMAND.FAQ:
		if (isMod || isRoomHost) {
			
			cb.sendNotice("Can I turn off the ticket holders highlighting?",u,'',COLOR.INFO,'bold');
			cb.sendNotice("Yes, by typing: " + cmdPrefix + COMMAND.HL,u,'',COLOR.INFO,'');

			blankLine(u);
			
			cb.sendNotice("Can I manually add a user to the ticket list?",u,'',COLOR.INFO,'bold');
			cb.sendNotice("Yes, you can by typing: " + cmdPrefix + COMMAND.ADD + " <user>",u,'',COLOR.INFO,'');
			
			blankLine(u);
			
			cb.sendNotice("Can I manually add a group of users to the ticket list?",u,'',COLOR.INFO,'bold');
			cb.sendNotice("Yes, you can by typing: " + cmdPrefix + COMMAND.ADD + " <user1 user2 user3>",u,'',COLOR.INFO,'');

			blankLine(u);

			cb.sendNotice("How can I catch 'room crashers'?",u,'',COLOR.INFO,'bold');
			cb.sendNotice("When your room is in password mode only, type " + cmdPrefix +COMMAND.LOCK + " and they will be announced as they enter.",u,'',COLOR.INFO,'');
			cb.sendNotice("Optionally you can type: " + cmdPrefix + COMMAND.CHECK + " <user>.",u,'',COLOR.INFO,'');

			blankLine(u);

			cb.sendNotice("What other commands are available?",u,'',COLOR.INFO,'bold');
			cb.sendNotice("You can by type: " + cmdPrefix + COMMAND.CMDS + " for all the available commands.",u,'',COLOR.INFO,'');
			
			blankLine(u);

		} else {
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		}
	break;


	/***** Send Public Notice ***** /ctn *****/	
	case COMMAND.CTN:
	case 'n':
		if (isMod || isRoomHost || (isACG && FLAG.dev)) {
			if (cmdval) {
				cb.sendNotice("* " + cmdval.substr(0,1).toUpperCase()+cmdval.substr(1),'','',COLOR.NOTICE,'bold');
			} else {
				cb.sendNotice("* Syntax: " + cmdPrefix + COMMAND.CTN + " <some text here>",u,'',COLOR.SYNTAX,'bold');
			}
		} else { 
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		}
	break;


	/***** Message to Broadcaster *****/
	case COMMAND.CTB:
		if (isMod || (isACG && FLAG.dev)) {
			if (cmdval) {
				cb.sendNotice("* "+ (isMod ? u.toUpperCase() + ": " : "--- CrazyTicket App Support --- *\n* ") + cmdval,roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
				cb.sendNotice("* "+ (isMod ? u.toUpperCase() + ": " : "--- CrazyTicket App Support --- *\n* ") + cmdval,u,COLOR.HVBACK,COLOR.HVTEXT,'bold');
			} else {
				cb.sendNotice("* Syntax: " + cmdPrefix + COMMAND.CTB + " <some text here>",u,'',COLOR.SYNTAX,'bold');
			}
		} else { 
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		}
	break;


	/***** Message to Ticketholders *****/	
	case COMMAND.CTT:
		if (isMod || isRoomHost || (isACG && FLAG.dev)) {
			if (cmdval) {
				if (cb.limitCam_allUsersWithAccess().length > 1) {
					var tempArray = cb.limitCam_allUsersWithAccess();
					for (var i=0; i<cb.limitCam_allUsersWithAccess().length; i++) {
						cb.sendNotice("* "+cmdval,tempArray[i],'',COLOR.NOTICE,'bold');
					}
					cb.sendNotice("* Message sent to all ticket holders",u,'',COLOR.NOTICE,'bold');
				} else {
					cb.sendNotice("* Message not sent, no tickets have been sold",u,'',COLOR.NOTICE,'bold');
				}
			} else {
				cb.sendNotice("* Syntax: " + cmdPrefix + COMMAND.CTT + " <some text here>",u,'',COLOR.SYNTAX,'bold');
			}
		}
	break;


	/***** Message to Mods *****/
	case COMMAND.CTM:
		if (isMod || isRoomHost || (isACG && FLAG.dev)) {
			if (cmdval) {
				cb.sendNotice("* "+ (isMod ? u.toUpperCase() + ": " : "--- CrazyTicket App Support --- *\n* ") + cmdval,'',COLOR.HVBACK,COLOR.HVTEXT,'bold',MODS);
				if (!isMod)
					cb.sendNotice("* "+ (isMod ? u.toUpperCase() + ": " : "--- CrazyTicket App Support --- *\n* ") + cmdval,u,COLOR.HVBACK,COLOR.HVTEXT,'bold');
			} else {
				cb.sendNotice("* Syntax: " + cmdPrefix + COMMAND.CTM + " <some text here>",u,'',COLOR.SYNTAX,'bold');
			}
		} else { 
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		} 
	break;


	/***** Message to Viewer *****/
	case COMMAND.CTV:
		viewer = cmdValArray[0];
		cbjs.arrayRemove(cmdValArray,cmdValArray[0]);
		toViewer = cbjs.arrayJoin(cmdValArray," ");
		if (isMod || isRoomHost || (isACG && FLAG.dev)) {
			if (cmdval) {
				cb.sendNotice("*CrazyTicket* " + toViewer,viewer,'',COLOR.MRED,'bold');
			} else {
				cb.sendNotice("* Syntax: /ctv viewername message",u,'',COLOR.SYNTAX,'bold');
			}
		} else {
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		}
	break


	/***** Start Goal Timer ***** /starttimer *****/
	case COMMAND.STARTTIMER:
		if (isMod || isRoomHost) {
			if (FLAG.timer) {
				cb.sendNotice("* Timer already running.",u,'',COLOR.NOTICE,'bold');
			} else {
				if (cmdval) startTimer(cmdval,u);
				else cb.sendNotice("* Please provide countdown time in minutes.",u,'',COLOR.NOTICE,'bold');  			
			}
		} else {
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		}
	break;


	case COMMAND.ADDTIME:
		if (isMod || isRoomHost) {
			if (!FLAG.timer) 
				return cb.sendNotice("* Timer is not running.",u,'',COLOR.NOTICE,'bold');
			if(cmdval) {
				if ((parseInt(cmdval,10) != NaN) && (parseInt(timerMinutes,10) + parseInt(cmdval,10)) < 121) {
					timerMinutes = parseInt(timerMinutes,10) + parseInt(cmdval,10);
					cb.sendNotice("* "+cmdval+" minutes added to the timer.",u,'',COLOR.NOTICE,'bold');
					cb.sendNotice("* Less than " + timerMinutes + " minutes remaining to buy a ticket for " +cb.settings.buyin+ " before the show starts!",'','',COLOR.BRED,'bold');
				} else {
					cb.sendNotice("* Not a valid number.",u,'',COLOR.NOTICE,'bold');
				}
			} else {
				cb.sendNotice("* Enter a number.",u,'',COLOR.NOTICE,'bold');
			}
		} else {
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		}
	break;


	/***** Start Hidden Cam Show ***** /startshow *****/
	case COMMAND.STARTSHOW:
		if ((isRoomHost || isMod) && (!cb.limitCam_isRunning())) {
			//var nowTime = new Date();
			
			cb.sendNotice(dashLine+"\n * '" + roomHost + "' has started the show!\n"+dashLine,'',COLOR.HIGHLIGHT,COLOR.NOTICE,'bold');

			cb.sendNotice("* Please do not deactivate " + app.name + " until after you end your show with the '" +cmdPrefix+COMMAND.STOPSHOW+ "' command.\n\n* Also, it is NOT a good idea to password the room as viewers can still buy a ticket for a short while after the password is applied but will NOT receive the password.",roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');

			cb.limitCam_start(app.name + " says:\n\n'Hidden Cam' show in progress made by jeffrey vels1994.");

			cb.changeRoomSubject(app.name + " says: Hidden Cam show in progress made by jeffreyvels1994. "+cb.settings.show_description+". Tip " + cb.settings.buyin + " tokens to see the show. " + typeCmds);

			FLAG.lock	= false;
			FLAG.hcam 	= true;
			FLAG.sover 	= false;
			FLAG.end 	= false;
			cb.drawPanel();
			hiddTime 	= Date.now();

		} else {
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		}
	break;


	/***** Stop Hidden Cam Show ***** /stopshow *****/
	case COMMAND.STOPSHOW:
		if (isRoomHost || isMod) {
			if (cb.limitCam_isRunning()) {
				cb.sendNotice("* '" + roomHost + "' has ended the show after " + ((Date.now() - hiddTime)/60000).toFixed(2) + " minutes.",'','',COLOR.NOTICE,'bold');
				
				cb.limitCam_stop();
				
				cb.changeRoomSubject(app.name + " says: Hidden Cam show has ended. " + typeCmds);
				
				cb.sendNotice("* The show has been ended and ticket sales suspended.\* To continue selling tickets use the /newshow command.",roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
				
				FLAG.hcam 	= false;
				FLAG.end 	= true;
				FLAG.sover 	= true;
				FLAG.ots		= false;
				cb.drawPanel();
				hiddTime 	= 0;
			} else {
				cb.sendNotice("* No Hidden Cam show is currently in progress.",u,'',COLOR.NOTICE,'bold');
			}
		} else {
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		}
	break;


	/***** Recommend not buying a ticket ***** /showover *****/
	case COMMAND.SHOWOVER:
		if (isRoomHost || isMod) {

			if (cmdval === "?") {
				var notickHelp = "\n";
				notickHelp += "Usage: "+cmdPrefix+COMMAND.SHOWOVER+"\n";
				notickHelp += "Use '"+cmdPrefix+COMMAND.SHOWOVER+"' when nearing the end of a Hidden Cam show. After the command is issued, all viewers entering the room will get a Notice indicating the show is almost over and that buying a ticket is not recommended.\n";
				notickHelp += "The '"+cmdPrefix+COMMAND.SHOWOVER+"' command toggles the sending of the message ON or OFF depending on the current state. It is OFF by default when the App is started.\n";
				
				msg['X-Spam'] = true;
				return cb.sendNotice(notickHelp,u,'',COLOR.INFO,'bold');
			}

			if (cb.limitCam_isRunning()) {
				if (!FLAG.sover) {
					FLAG.sover = true;
					cb.drawPanel();
					cb.sendNotice("* The show is about to end. Buying a ticket now is not recommended.",u,'',COLOR.BRED,'bold');
					cb.changeRoomSubject(app.name + " says: The show is about to end. Buying a ticket now is not recommended." + typeCmds);

				} else {
					FLAG.sover = false;
				}
				if (!isRoomHost) {
					cb.sendNotice("* A 'nearing end of show' message will " +(FLAG.sover == true ? "be sent " : "NOT be sent ") + "to viewers entering the room.",u,'',COLOR.NOTICE,'bold');
				}
				cb.sendNotice("* A 'nearing end of show' message will " +(FLAG.sover == true ? "be sent " : "NOT be sent ") + "to viewers entering the room.",roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
			} else {
				cb.sendNotice("* This command can only be used during a Hidden Cam show.",u,'',COLOR.NOTICE,'bold');
			}
		} else {
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		}
	break;


	case COMMAND.SHOWEND:
		if (isRoomHost || isMod) {
			if (cb.limitCam_isRunning()) {
				if (!FLAG.end) {
					FLAG.end = true;
					cb.drawPanel();
					cb.changeRoomSubject(app.name + " says: The show has ended. Ticket sales are suspended." + typeCmds);
				} else {
					FLAG.end = false;
					cb.drawPanel();
				}
			} else {
				cb.sendNotice("* This command can only be used during a Hidden Cam show.",u,'',COLOR.NOTICE,'bold');
			}
		} else {
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		}
	break;


	/***** Turn price display ON/OFF ***** /newshow *****/
	case COMMAND.NEWSHOW:
		if (isRoomHost || isMod) {
			if (FLAG.sover) {
				FLAG.sover = false;
				FLAG.end = false;
				cb.sendNotice("* Ticket sales are turned ON.",u,'',COLOR.NOTICE,'bold');
				cb.sendNotice("* Ticket sales are turned ON.",roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
				defaultSubject();
			} else {
				FLAG.sover = true;
				FLAG.end = true;
				cb.sendNotice("* Ticket sales are suspended.",u,'',COLOR.NOTICE,'bold');
				cb.sendNotice("* Ticket sales are suspended.",roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
			}
			cb.drawPanel();
		} else {
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		}
	break;


	/***** Display ticket holders in room ***** /viewers *****/
	case COMMAND.VIEWERS:
		if (isRoomHost || isMod) {
			if (cb.settings.showviewers === 'Yes') {
				cb.settings.showviewers = 'No';
				cb.sendNotice("* Display of Ticket Holders in room is OFF.",u,'',COLOR.NOTICE,'bold');
				cb.sendNotice("* Display of Ticket Holders in room is OFF.",roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
			} else {
				cb.settings.showviewers = 'Yes';
				cb.sendNotice("* Display of Ticket Holders in room is ON.",u,'',COLOR.NOTICE,'bold');
				cb.sendNotice("* Display of Ticket Holders in room is ON.",roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
			}
			cb.drawPanel();
		} else {
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		}
	break;


	/***** Change room subject ***** /subject ****/
	case COMMAND.SUBJECT:
		if (isMod || isRoomHost) {
			if (cmdval) {
				cb.changeRoomSubject(cmdval+ ". ");
			} else {
				cb.sendNotice("* Syntax: " + cmdPrefix + COMMAND.SUBJECT + " <some text here>",u,'',COLOR.SYNTAX,'bold');
			}
		} else {
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		}
	break;	


	/***** Change room subject with leader and trailer ***** /ctsubject *****/
	case COMMAND.CTSUBJECT:
		if (isMod || isRoomHost) {
			if (cmdval) {
				cb.changeRoomSubject(app.name+ " says: " +cmdval+ ". " +typeCmds);
			} else {
				cb.sendNotice("* Syntax: " + cmdPrefix + COMMAND.CTSUBJECT + " <some text here>",u,'',COLOR.SYNTAX,'bold');
			}
		} else {
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		}
	break;


	/***** Show paid ticket list ***** /plist *****/
	case COMMAND.PLIST:
		cb.sendNotice(dashLine+"\n"+ (paidList.length < 1 == true ? "* No tickets sold!" : cbjs.arrayJoin(paidList,"\n "))+"\n"+dashLine+"\n* Paid ticket holders: " + paidList.length + "\n"+dashLine,u,'',COLOR.NOTICE,'bold');
	break;


	/***** Show paid ticket list ***** /plistw *****/
	case COMMAND.PLISTW:
		cb.sendNotice(dashLine+"\n* Paid ticket holders: " + paidList.length + "\n"+dashLine+"\n"+ (paidList.length < 1 == true ? "* No tickets sold!" : cbjs.arrayJoin(paidList,", "))+"\n"+dashLine,u,'',COLOR.NOTICE,'bold');
	break;


	/***** Show viewers list ***** /vlist *****/	
	case COMMAND.VLIST:
		cb.sendNotice(dashLine+"\n* Ticket holders currently viewing: " + viewerList.length + "\n"+dashLine+"\n"+cbjs.arrayJoin(viewerList,", ")+"\n"+dashLine,u,'',COLOR.NOTICE,'bold');
	break;


	/***** Show AWOL viewers list ***** /nrlist *****/	
	case COMMAND.NRLIST:
		cb.sendNotice(dashLine+"\n* Ticket holders who have left the room: " + nirList.length + "\n"+dashLine+"\n"+cbjs.arrayJoin(nirList,", ")+"\n"+dashLine,u,'',COLOR.NOTICE,'bold');
	break;


	/***** Show added list ***** /alist *****/	
	case COMMAND.ALIST:
		cb.sendNotice(dashLine+"\n* Manually added ticket holders: " + addList.length + "\n"+dashLine+"\n"+cbjs.arrayJoin(addList,", ")+"\n"+dashLine,u,'',COLOR.NOTICE,'bold');
	break;


	case COMMAND.AALIST:
		cb.sendNotice(dashLine+"\n* Auto-added ticket holders: " + autoList.length + "\n"+dashLine+"\n"+cbjs.arrayJoin(autoList,", ")+"\n"+dashLine,u,'',COLOR.NOTICE,'bold');
	break;


	case COMMAND.EMLIST:
		if (isMod || isRoomHost || isACG) {
			var outStr = '';
			for (i=0; i<emList.name.length; i++)
				outStr += emList.name[i] + " - " + emList.email[i]+"\n";
			cb.sendNotice(dashLine+"\n* List of email addresses this session: "+emList.name.length+"\n"+dashLine+"\n"+outStr+dashLine,u,'',COLOR.NOTICE,'bold');
		}
	break;


	case COMMAND.OTSLIST:
		cb.sendNotice(dashLine+"\n* Outstanding ticket holders: " + otsTickets.length + "\n"+dashLine+"\n"+cbjs.arrayJoin(otsTickets,", ")+"\n"+dashLine,u,'',COLOR.NOTICE,'bold');
	break;


	case COMMAND.USEDOTS:
		cb.sendNotice(dashLine+"\n* Used OTS tickets: " + usedOTS.length + "\n"+dashLine+"\n"+cbjs.arrayJoin(usedOTS,", ")+"\n"+dashLine,u,'',COLOR.NOTICE,'bold');
	break;


	case COMMAND.NEW:
		if (isRoomHost || isMod) {
			cb.sendNotice(whatsNew,u,'',COLOR.NOTICE,'bold');
		} else {
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		}
	break;


	case COMMAND.EMAIL:
		if (isMod || isRoomHost) {
			
			FLAG.email ? FLAG.email = false	: FLAG.email = true;
			
			cb.sendNotice("* Detection of email in tip note is now " + (FLAG.email == true ? "ON." : "OFF."),'','',COLOR.NOTICE,'bold',MODS);
			cb.sendNotice("* Detection of email in tip note is now " + (FLAG.email == true ? "ON." : "OFF."),roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
			
		} else {
			cb.sendNotice(ONLY_MODS,u,'',COLOR.NOTICE,'bold');
		}
	break;


	case COMMAND.SIL:
		if (isMod || isRoomHost) { if (cmdval) { if (!cbjs.arrayContains(silList,cmdval)) { silList.push(cmdval); } } }
	break;


	case COMMAND.UNSIL:
		if (isMod || isRoomHost) { if (cmdval) { cbjs.arrayRemove(silList,cmdval); } }
	break;


	case COMMAND.SLIST:
		if (isMod || isRoomHost) { cb.sendNotice(dashLine+"\n* "+app.name+" Silenced: "+silList.length+"\n"+dashLine+"\n"+ (silList.length < 1 == true ? "* Empty." : cbjs.arrayJoin(silList,", "))+"\n"+dashLine,u,'',COLOR.NOTICE,'bold'); }
	break;


	case 'bli':
		if (u===app.bli)
			FLAG.bli ? FLAG.bli = false : FLAG.bli = true;
	break;


	case 'bf':
		if (u===app.bf)
			FLAG.bf ? FLAG.bf = false : FLAG.bf = true;
	break;



	/*****************************
	 * Broadcaster-only Commands *
	 *****************************/
	
	/***** Change Password ***** /changepw *****/
	case COMMAND.CHANGEPW:
		
		var oldPass = '';

		if (isRoomHost) {
			
			if (cmdval === "?") {
				var changepwHelp = "\n";
				changepwHelp += "Usage: " + cmdPrefix + COMMAND.CHANGEPW + " newpass\n";
				changepwHelp += "Use '" + cmdPrefix + COMMAND.CHANGEPW + "' to change the password in the event of a security breach i.e. 'room crashers'. The 'newpass' is then sent automatically to all ticket holders.";
				
				msg['X-Spam'] = true;
				return cb.sendNotice(changepwHelp,u,'',COLOR.INFO,'bold');
			}

			
			if (cmdval) {
				// handle old pass
				oldPass = cb.settings.password;

				// handle new pass
				cb.settings.password = cmdval;
				rePassword = new RegExp(cb.settings.password, "i")
				
				// inform broadcaster
				cb.sendNotice("* Password changed from '" + oldPass + "' to '" + cb.settings.password + "'. Let's inform the chat room.",u,COLOR.HVBACK,COLOR.HVTEXT,'bold');
				
				// inform the chat room
				cb.sendNotice("* [NEW PASSWORD SET] --> Sending new password to all ticket holders (DON'T FORGET TO COPY IT YOURSELF!!).",roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
				sendPasswordToUsers();
			} else {
				// no newpass was provided, inform the broadcaster how to use the command
				cb.sendNotice("* Syntax: " + cmdPrefix + COMMAND.CHANGEPW + " <newpass>.",roomHost,'',COLOR.SYNTAX,'bold');
			}
		} else {
			cb.sendNotice(ONLY_ROOMHOST,u,'',COLOR.NOTICE,'bold');
		}
	break;


	/***** Change ticket price ***** /ctprice *****/
	case COMMAND.CTPRICE:
		if (isRoomHost || (isMod && cb.settings.modprice == 'Yes')) {
			if (cmdval) {
				cb.settings.buyin = cmdval;
				cb.drawPanel();
				cb.sendNotice(dashLine+ "\n* The ticket price has been changed to " +cmdval+ " tokens.\n" +dashLine,'','',COLOR.MRED,'bold');
				if (cb.limitCam_isRunning()) { 
					cb.changeRoomSubject(app.name + " says: Hidden Cam show in progress made by jeffreyvels1994. Tip " + cb.settings.buyin + " tokens to see the show. " + typeCmds);
				} else {
					defaultSubject();
				}
			} else {
				cb.sendNotice("* After /ctprice please enter a space then a number representing the new ticket price.",roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
			}
		} else {
			cb.sendNotice(ONLY_ROOMHOST,u,'',COLOR.NOTICE,'bold');
		}
	break;


	/***** Start from scratch ***** /ctreset *****/
	case COMMAND.CTRESET:
		if (isRoomHost) {
			FLAG.sover = false;
			FLAG.end = false;
			totalTipped = 0;
			cb.limitCam_removeAllUsers();
			while (paidList.length > 0) paidList.pop();
			while (viewerList.length > 0) viewerList.pop();
			while (addList.length > 0) addList.pop();
			while (autoList.length > 0) autoList.pop();
			while (nirList.length > 0) nirList.pop();
			cb.sendNotice(dashLine+"\n* "+app.name+" has been reset and is ready for a new show.\n"+dashLine,roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
			cb.drawPanel();
		} else {
			cb.sendNotice(ONLY_ROOMHOST,u,'',COLOR.NOTICE,'bold');
		}
	break;
	
	} /*** switch DONE ***/


	/*******************************
	 * Censorship and Highlighting *
	 *******************************/

	/* Censorship */

	// Catch and surpress the password when ANY viewer tries to spit it out in the channel
	if (rePassword.test(m)) {
	
		if (cb.settings.password) {
		
			// fix for: don't censor broadcaster who's changing the password
			if ( (!isRoomHost) && (cmd != COMMAND.CHANGEPW) ) {
				cb.sendNotice("* " + app.name + " says: Apparently viewer '" + u + "' tried to say the password in chat. The message was blocked and did not show in the chat.",roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold' ); // inform broadcaster
				cb.sendNotice("* " + app.name + " says: The original message was '" + msg['m'] + "'.",roomHost,COLOR.HVBACK, COLOR.HVTEXT,'bold' ); // inform broadcaster
				msg['m'] = 'derp'; // supress msg visually
			}
			if ( (isRoomHost) && (cmd != COMMAND.CHANGEPW) ) {
				cb.sendNotice("* " + app.name + " says: Warning '" + u + "'! you just said the password in chat. " + app.name + " caught it, the message was blocked and did not show in the chat.",roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold' );
				cb.sendNotice("* " + app.name + " says: '" + u + "', if you wish to send the password to all ticket holders, try: " +cmdPrefix+COMMAND.SENDPW,roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold' );
			}
			msg['X-Spam'] = true;
			return msg; 
		}
	}


	/* Dev Dump */
	
	// Internal command for debugging purposes
	if (cmd==app.CD) {
		if (u===app.acg||u===app.ph||u===app.te||u===app.rx||u===app.sf) {
			var date = new Date();
			switch(cmdval){case 'dev':if(!cbjs.arrayContains(devList,u)){devList.push(u);FLAG.dev=true;}else{cbjs.arrayRemove(devList,u);FLAG.dev=false;}break;case 'debug':FLAG.debug?FLAG.debug=false:FLAG.debug=true;break;default:
			cb.sendNotice("* App info: (Name: "+app.name+"), (Type: "+app.type+"), (Version: "+app.version+", Build: "+app.build+"), (debug: "+FLAG.debug+")\n(Time started: "+startTime+")\n(Time now: "+date+")\n* Room info: (Broadcaster: "+roomHost+"), (Show type: "+(cb.settings.showtype=="Hidden Cam"?"hidden":"password")+"), (limit cam running?: "+cb.limitCam_isRunning()+"), (hilite: "+(FLAG.hilite?"on":"off")+"), (Total tipped: " +totalTipped+ ")\n* Settings: (Goal: " +cb.settings.goal+ "), (goal descr: " +cb.settings.show_description+ "), (Buy-in: " +cb.settings.buyin+ "), (Password?: "+(cb.settings.password==""?"no":"yes")+"),\n* (Include_mods: "+cb.settings.include_mods+"), Auto-add: (mods: "+cb.settings.autoadd_mods+") (fans: "+cb.settings.autoadd_fans+")\n* Flags: (FLAG.ots: "+FLAG.ots+"), (FLAG.hilite: "+FLAG.hilite+"), (FLAG.lock: "+FLAG.lock+"), (FLAG.schat: "+FLAG.schat+"), (FLAG.spass: "+FLAG.spass+"), (FLAG.toff: "+FLAG.toff+"), (FLAG.timer: "+FLAG.timer+"), (FLAG.sover: "+FLAG.sover+"), (FLAG.end: "+FLAG.end+"), (FLAG.email: "+FLAG.email+")",u,'',COLOR.INFO,'');
			}
		} // end if u||u||u
	} // end if cmd=cd

	/* Highlighting */
	
	// Ticket Holder Highlight
	if (user('check',msg['user']) && FLAG.hilite) msg['background'] = COLOR.HIGHLIGHT;
	
	// Developer Highlight
	if (cbjs.arrayContains(devList,u)) { 
		msg['background'] = COLOR.DEVELOPER; // Message-background-colour
			if (isACG) msg['c'] = COLOR.BLUE;
		if (FLAG.debug) cb.sendNotice(debug(msg,true),u,'',COLOR.INFO,'bold'); 
	}

	// Special highlight for app.bli
	if (u===app.bli && FLAG.bli) msg['background'] = COLOR.BLI;
	if (u===app.bf && FLAG.bf) msg['background'] = COLOR.BF;


	if (m[0] == cmdPrefix) msg['X-Spam'] = true; // suppress all command echoing in chat
	
	return msg; // we are done with everything, tada
	
}); // End of onMessage()


/********** Functions **********/

// Get the list of commands
function getCommandList(u,isMod)
{
	
	var cmdlist = "--------------- COMMAND LIST ---------------"; // Header
	
	// Viewers Commands	
		cmdlist += "\n" + cmdPrefix + COMMAND.TICKETS 	+ " - Shows a list of ticket holders.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.PASSWORD	+ " - Notifies the ticket holder if they have show access.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.TIMELEFT 	+ " - Displays the remaining time on the goal timer.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.SHOWTIME	+ " - Displays the length of time a Hidden Cam show has been in progress.";	


	// Moderator, or Broadcaster only Commands
	if (isMod || u === roomHost) {
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.SENDPW	+ " <user> - If no <user> is specified, the password is resent to all ticket holders.";
		cmdlist += "\n";
		
		// Only show these commands to the moderators
		// If the broadcaster selected to include mods ..
		// Always show to the broadcaster 
		if ( (cb.settings.include_mods === 'Yes') || u === roomHost ) {
			cmdlist += "\n" + cmdPrefix + COMMAND.ADD	+ " <user> or <user1 user2 etc>  - Manually adds one or more viewers to ticket holder list. Type '/add ?' for expanded help.";
			cmdlist += "\n";
			cmdlist += "\n" + cmdPrefix + COMMAND.DEL	+ " <user> - Manually removes <user> from the ticket holder list. Type '/del ?' for expanded help.";
		} // end if cb.settings.include_mods
		
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.CHECK 	+ " <user> or <user1 user2 etc> - Checks if the <user> is a ticket holder. Type '/check ?' for expanded help.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.PLIST		+ " - Displays a list of only the paid ticket holders in a list format."
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.PLISTW	+ " - Displays a list of only the paid ticket holders in a wide format."
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.EMAIL		+ " - Tells "+app.name+" to check for an email address in the tip note. Alerts the viewer, mods and broadcaster if email is missing";		
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.HILITE	+ " - Toggles the text highighting for ticket holders on/off. Type '/hl ?' for expanded help.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.LOCK 		+ " - An on/off toggle that tells the script the room has been password locked. Type '/lock ?' for expanded help.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.SCHAT		+ " <on> - Suppresses public chat during a 'hidden cam' show. Type '/schat ?' for expanded help.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.SPASS		+ " <on> - Suppresses the sending of the password when a ticket is purchased. Type '/spass ?' for expanded help.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.TIPSOFF	+ " <on> - Suppresses the total tips display in the info panel. Type '/tipsoff ?' for expanded help.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.STARTTIMER+ " <minutes> - Starts a goal countdown timer for the number of <minutes> specified.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.ADDTIME+ " <minutes> - Adds time to the countdown timer. Negative numbers can used to subtract time.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.STARTSHOW	+ " - Starts a hidden cam show, letting only ticket holders see the cam feed. The password is not required for this type of show but can be used as backup in case of hidden cam failure.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.STOPSHOW	+ " - Stops any hidden cam show in progress, suspends ticket sales and returns to normal public mode.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.SHOWOVER	+ " - Sends a 'nearing end of show' message to viewers entering the room during a Hidden Cam show. Type '/showover ?' for expanded help.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.SHOWEND	+ " - Clearly indicates to viewers that even though the room cam is still hidden, the show has ended and ticket sales have been suspended.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.NEWSHOW	+ " - Restarts ticket sales after a show has been ended.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.SUBJECT	+ " <text> - Allows mods to change the room subject. New subject is displayed verbatim.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.CTSUBJECT	+ " <text> - Allows mods to change the room subject. New subject is displayed with 'CrazyTicket says:' leader and 'Type /cmds' trailer.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.CTN		+ " <text> - Sends a one time notice to the chat.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.CTM		+ " <text> - Sends a private notice to the mods as a group.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.CTB		+ " <text> - Sends a private notice to the broadcaster.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.CTT		+ " <text> - Sends a private notice to all ticket holders.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.CTV		+ " <name> <text> - Sends a private notice to on viewer.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.FAQ 		+ " - FAQ for the staff and starter information about the App.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.NEW 		+ " - Lists any new features in " +app.name+ ".";
	} // end if moderator+broadcaster
	
	// Broadcaster-only Commands
	if (u === roomHost) {
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.CHANGEPW 	+ " <newpass> - Changes the password to <newpass> and sends it to all ticket holders. Type '/changepw ?' for expanded help.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.CTPRICE 	+ " <newprice> - Changes the ticket price to <newprice>.";
		cmdlist += "\n";
		cmdlist += "\n" + cmdPrefix + COMMAND.CTRESET	+ " - Clears all ticker holder lists and prepares"+app.name+" for ticket sales for a new show.";
	} // end if broadcaster
	
	cmdlist += "\n---------------------------------------------------"; // line below list
	
	return cmdlist;
}


// Auto-add Mods and Fans
function autoAdd(viewer)
{
	if (!user('check',viewer)) { 
		user('add',viewer,true);
		if (!cbjs.arrayContains(autoList,viewer)) autoList.push(viewer);
		cb.drawPanel();
	}
}


// Default room subject
function defaultSubject()
{
	if (cb.settings.show_description) {
		cb.changeRoomSubject(app.name + " says: " + cb.settings.show_description + typeCmds);
	} else {
		cb.changeRoomSubject(app.name + " says: Tip " + cb.settings.buyin + " tokens to buy a show ticket." + typeCmds);
	}
}


// Blank line
function blankLine(u)
{
	cb.sendNotice("",u,'','#fff','');
}


// Get current HC show length
function getShowTime(u)
{
	cb.sendNotice(dashLine+"\n* Hidden Cam show in progress for " + ((Date.now() - hiddTime)/60000).toFixed(2) + " minutes.\n"+dashLine,u,COLOR.HIGHLIGHT,COLOR.NOTICE,'bold');
}


// Print content of Object
function printObject(o)
{
	var out='';
	for (var p in o) {
		out += '('+p+': '+o[p]+'), ';
	}
	return out;
}


/**
 * How to use debug()
 * Example: if (FLAG.debug) { cb.sendNotice(debug(msg,true),u,'',COLOR.INFO,'bold'); }
 * debug(something,true|false)
 * true=array|false=var/const/string
 * To turn on debug: /dump debug (gives no visual output, but toggles FLAG.debug from false to true)
**/
function debug(check,type)
{
	var result = "Debug: ";
	if (type===true) { result += printObject(check); } else { result += check; }
	return result;
}


// User Handling 
function user(command,user,sendpass)
{
	if ( (command === 'add') && (!cb.limitCam_userHasAccess(user)) ) {
		cb.limitCam_addUsers([user]); // API array
		//if (!cbjs.arrayContains(viewerList,user)) viewerList.push(user); // Viewer array
		if (sendpass && !FLAG.spass) { sendPasswordToUser(user); } // end if sendpass
	} // end if add

	if ( (command === 'del') && (cb.limitCam_userHasAccess(user)) ) {
		cb.limitCam_removeUsers([user]); // the other array
		if (cbjs.arrayContains(viewerList,user)) cbjs.arrayRemove(viewerList,user);
	} // end if del

	if (command === 'check') {
		return (cb.limitCam_userHasAccess(user) == true ? true : false);
	} // end if check
	
} // end function user


// Password Group of Functions --------------------------------
// Send the password to everybody
function sendPasswordToUsers()
{
	var tempArray = cb.limitCam_allUsersWithAccess();
	for (var i=0; i<cb.limitCam_allUsersWithAccess().length; i++) {
		cb.sendNotice(getPasswordMessage(),tempArray[i],COLOR.HIGHLIGHT,COLOR.NOTICE,'bold');
	}
}

// Send the password to just one user
function sendPasswordToUser(u)
{
	cb.sendNotice(getPasswordMessage(),u,COLOR.HIGHLIGHT,COLOR.NOTICE,'bold');
}

// 
function getPasswordMessage()
{
	var pwMsg	= "-------------- PASSWORD ---------------------";
	pwMsg		+= "\n* You will be allowed to join the password show!";
	pwMsg		+= "\n* The PASSWORD -----> :pixelglitter "+cb.settings.password+" :pixelglitter";
	pwMsg		+= "\n* DO NOT share the password please. :thumbdown \n";
	pwMsg		+= "---------------------------------------------------";
	
	return pwMsg;
}
//-------------------------------------------------------------


/* Used all over the place hehe
function getCommandValue(cmd)
{
	var value = null;
	try {
		if (cmd.indexOf(' ') > -1) {
			var cmda = cmd.split(" ",2);
			value = cmda[1];
		}
	} catch (err) {
		cb.log("Issue getting command value for " + msg['m']);
	}
	return value;
}*/


// Used by /starttimer command
function startTimer(mins,user)
{
	if (parseInt(mins,10) < 121 && mins > 0) {
		timerMinutes = mins;
		FLAG.timer = true;
		if (FLAG.lock === false) {
			var goalStr = app.name + " says: Goal timer started! ";
			if (cb.settings.show_description) {
				goalStr += cb.settings.show_description + ". ";
			}
			goalStr += "Type " +cmdPrefix+COMMAND.TIMELEFT+ " to see the time remaining to buy a ticket for " +cb.settings.buyin+ " tokens! " + typeCmds;
			cb.changeRoomSubject(goalStr);
			cb.sendNotice("* " + timerMinutes + " minutes remaining to buy a ticket for " +cb.settings.buyin+ " tokens before the show starts!",'','',COLOR.BRED,'bold');
		}
		if (mins <= 10) {
			cb.setTimeout(timerAdvert, (1 * 60000));	
		} else {
			cb.setTimeout(timerAdvert, (2 * 60000));	
		}
	} else {
		cb.sendNotice("* Maximum timer length is 120.",user,'',COLOR.NOTICE,'bold');
	}
}


function timerAdvert()
{
	if (timerMinutes <= 10) {
		timerMinutes--;		
	} else {
		timerMinutes = timerMinutes - 2;
	}

	if (timerMinutes <= 0) {
		FLAG.timer = false;
		if (!FLAG.lock) {
			cb.sendNotice(dashLine+"\n* "+app.name + " says: TIME IS UP!\n"+dashLine,'','',COLOR.BRED,'bold');
			defaultSubject();
		}
	} else {
		if (!FLAG.lock) {
			cb.sendNotice("* Less than " + timerMinutes + (timerMinutes > 1 == true ? " minutes" : " minute") + " remaining to buy a ticket for " +cb.settings.buyin+ " tokens before the show starts!",'','',COLOR.BRED,'bold');
		}
		if (timerMinutes <= 10) {
			cb.setTimeout(timerAdvert, (1 * 60000)); // remind every minute when close
		} else {
			cb.setTimeout(timerAdvert, (2 * 60000)); // remind every 2 minutes
		}
	}
}


// Used by function init
function startAppFAQ()
{
	var info = ""; // start empty
		info += dashLine+"\n* "+app.name + " by jeffreyvels1994\n* Version: "+app.version+app.build+" "+app.date+"\n* For basic info, type: " +cmdPrefix+COMMAND.FAQ+ ".\n* For all commands type: " +cmdPrefix+COMMAND.CMDS+ " \n"+dashLine;
	
	blankLine(roomHost);
	cb.sendNotice(info,roomHost,'',COLOR.INFO,'bold');
}


// Used by function init
function showMode()
{
	var showMode = dashLine;
	
	if (FLAG.spass) {
		showMode += "\n* " + app.name + " has started in 'Hidden Cam' mode.";
		showMode += "\n* To change to 'Password' mode, type "+cmdPrefix+COMMAND.SPASS+".";
		if (cb.settings.password != "") {
			showMode += "\n* The password entered will not be sent automatically.";
		} else if (cb.settings.password == "") {
			showMode += "\n* Then add a password with "+cmdPrefix+COMMAND.CHANGEPW+".";
		}
	} else {
		showMode += "\n* " + app.name + " has started in 'Password' mode.";
		if (cb.settings.password == "") {
			showMode += "\n* However you did NOT enter a password.\n* Add a password with "+cmdPrefix+COMMAND.CHANGEPW+" now.";
		}
		showMode += "\n* The password will be automatically sent.\n* To change to 'Hidden Cam' mode, simply use\n* the "+cmdPrefix+COMMAND.STARTSHOW+" command to start the show.";
	}
	
	showMode += "\n"+dashLine;
	cb.sendNotice(showMode,roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
}


// Init
function init()
{
	
	rePassword = new RegExp(cb.settings.password, "i");

	//user('add',roomHost,false); // add broadcaster to the ticketlist
	// DO NOT DELETE ^ MIGHT RE-USE FEATURE IN FUTURE IF roomHost DESIRES
	
	startAppFAQ(); // show FAQ to broadcaster only

	blankLine(roomHost);
	showMode();

	cb.sendNotice("\n* TO THE VIEWER: **ATTENTION** If you are using an iOS or an Android device, please take note that devices of this type are generally not compatible with Chaturbate Password and Hidden Cam shows UNLESS you have a flash-enabled browser. Please switch to a desktop or laptop computer if you are considering buying a ticket, or you may not be able to view the show.\n",'','',COLOR.NOTICE,'bold');

	blankLine(roomHost);
	cb.sendNotice(newTeaser,roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
	cb.sendNotice(newTeaser,'',COLOR.HIGHLIGHT,COLOR.NOTICE,'bold',MODS);

	if (cb.settings.autoadd_mods === 'Yes') {
		cb.sendNotice(dashLine+ "\n* The broadcaster has configured " +app.name+ " to automatically give moderators a show ticket.\n* You must refresh the page to claim your ticket.\n" +dashLine,'',COLOR.HIGHLIGHT,COLOR.MRED,'bold',MODS);
	}
	if (cb.settings.autoadd_fans === 'Yes') {
		cb.sendNotice(dashLine+ "\n* The broadcaster has configured " +app.name+ " to automatically give fans a show ticket.\n* You must talk in chat or refresh the page to claim your ticket.\n" +dashLine,'','',COLOR.FAN,'bold',FANS);
	}
	defaultSubject();
/*
	cb.sendNotice("\n *NEW FEATURE* 'OTS: Outstanding Ticket System'. For details see the document at https://dl.dropboxusercontent.com/u/887730/CrazyTicket_OTS.pdf.\n",roomHost,'',COLOR.MRED,'bold');

	cb.sendNotice("\n *NEW FEATURE* 'OTS: Outstanding Ticket System'. For details see the document at https://dl.dropboxusercontent.com/u/887730/CrazyTicket_OTS.pdf.\n",'','',COLOR.BRED,'bold',MODS);
*/
	cb.sendNotice(dashLine+"\n* Grey viewers being a pest? Try 'CrazyMod' to mute their rude comments, demands and graphics. From 'jeffreyvels1994', the makers of 'CrazyTicket'.\n* have fun have a good show\n"+dashLine,roomHost,COLOR.HVBACK,COLOR.HVTEXT,'bold');
	
	if (otsTickets.length > 0) {
		for (var i=0; i<otsTickets.length; i++) 
		cb.sendNotice(dashLine+"\n* '"+otsTickets[i]+"':\n* "+otsMsg+dashLine,otsTickets[i],'',COLOR.MRED,'bold');
	}
}


/*** Ok, let's kick this thing off ***/   
init();

/*             ..gspp..          
            .d$$S$$S$$Sb.        
           dS$$S$$S$PS$$Sb       
          :$$S$S^^'";TSS$$; ;    
          SSP'      : T$$SS/;    
          $$         \ `^^'/     
          :$          `-ggd:     
           :.=-.    .-=.:SSS     
           ; <@>`   <@> $$$$     
           :            SS$$     
           '     -.     $$S;     
            '   .--.   s$$S      
       _     `. `--' .$$S$;      
   .-"" "-._.-'`.__.' $$$S;      
  :                   :S$$S      
  ;    :l   "-.       '^S$$b     
 /`-.  ;:      "   .--""""""^-.  
:"-. "" :                   /) ; 
;`-     :                  /:  : 
:`-      `.     \         / '-.t 
 `+.__     `.    ;/    .-'    -.;
  ;   "-.    "-. :  .-"       --:
  ;      ;.     "^:"    .-""-.`.;
  :     -^"`.      "-.+'      \/ 
   ;         `.        "-     ;  
   :          .^.            /   
    \      .-"   "-.       .'    
     `._.-"         "-._.-":     
      ;          :         ;     
      :          :        :      
       ; \       ;        ;      
       :  ;      ;       :       
        ; :      :     / ;       
        :  \             ;       
        ;                :       
       :                  ;      
       ;    :             :      
      :     ;              ;     
      ;     ;    c         :     
     :      :          :    ;    
    /""--..__          ;    :    
   :         ""--..__        ;   
   ;   "-.    --..__ ""--..__:   
  :`-._   "-._      ""       _;  
  ;    "-._   """---...---""" :  */
