// https://chaturbate.com/apps/user_uploads/3/bobomb/
// https://chaturbate.com/apps/sourcecode/txstarz-chat-enhancement/?version=&slot=3

/**
 * Txstarz chat enhancement bot
 *
 * Author: Bobomb
 * Version: 3.6.5
 * Last update: 19-06-2013
 *
 * Build on:
 * Framework version 3.7
 *	<PluginBase (version 2.7.2)>
 *	<Bobomb (version 3.8.2)>
 *
 * Usage:
 * Set the initial settings.
 *
 * At every tip that is above 100 and contains the word 'vote' or 'voting' and either of your names,
 * the vote will be added to the total and the total will be posted to the room. If the tip is a multitude of 100 (200, 300, 400)
 * the bot will turn it into multiple votes (2, 3, 4 votes).
 *
 * If the tip message contains the word 'empire' and an action (and the amount is sufficient for the action),
 * the given action will be posted to the room.
 *
 * If the tipped amount is 500 (above), the user will be tagged as a 'Gazer' or 'Hotshot'.
 *
 * For more information on functions, type /help in chat.
 *
 *
 * Full list of supported commands:
 * /help
 * /showmodules
 * /setmodule
 * /showsettings
 * /postvotes
 * /showvotes
 * /showvoters
 * /setinterval
 * /setvotes
 * /addvotes
 * /postempires
 * /showempires
 * /addempire
 * /addregion
 * /addsoldiers
 * /removeempire
 * /removeregion
 * /removesoldiers
 * /showrights
 * /adduser
 * /removeuser
 * /addgazer
 * /removegazer
 * /addhotshot
 * /removehotshot
 * /myvotes
 * /myempire
 * /mystats
 * /exportsettings
 * /importsettings
 *
 *
 * Change log:
 * -- 3.6.5 (19-06-2013) --
 *  > Voting module now looks for both "vote" and "voting" in the tip message.
 *  > Added a new module for hotshots.
 *  > Added room rule posting.
 *  > Added a new command to get some basic statistics (/mystats).
 *
 * -- 3.4.0 (10-06-2013) --
 *  > Updated to the latest framework version.
 *
 * -- 3.3.0 (19-05-2013) --
 *  > Reworked the code to my framework.
 *
 * -- 2.3.8 (04-05-2013) --
 *  > Minor changes in messages and command handling.
 *
 * -- 2.3.6 (02-05-2013) --
 *  > Added a new module for gazers.
 *
 * -- 2.2.5 (30-04-2013) --
 *  > Various little bugfixes.
 *
 * -- 2.2.3 (29-04-2013) --
 *  > Added commands for all users.
 *  > Major changes to the empires module, including new commands.
 *  > Major hanges to the user rights module, including new commands.
 *  > Updates will now alternate between vote count and empires.
 *  > Added global modifier !private. Use this to hide return messages from commands from the room.
 *
 * -- 2.0.0 (29-04-2013) --
 *  > Completely rewritten over 60% of the code.
 *  > Minor progress on the user rights system.
 *  > Added a module for displaying supporters. When turned on, it will add the prefix [Team Name] to the message a user sends.
 *
 * -- 1.2.2 (28-04-2013) --
 *  > Implemented a hot fix for a rare case where the tip message could not be resolved.
 *  > Changed the /addvotes command to also accept a 'from' parameter, so you can add the user that voted.
 *  > Added a field to the launch settings for importing a settings string.
 *
 * -- 1.2.0 (27-04-2013) --
 *  > Import / export functionality is back and functioning!
 *  > Some minor changes to various notices.
 *
 * -- 1.1.9 (26-04-2013) --
 *  > Added some more safety checks, seems I forgot a few! Oops...
 *  > Added some notices for when a command is wrong.
 *
 * -- 1.1.7 (25-04-2013) --
 *  > Disabled import / export functionality due to unresolvable errors.
 *  > Implemented a basic structure for rights management.
 * 
 * -- 1.1.0 (25-04-2013) --
 *  > Added import / export functionality.
 *  > Updated /help to reflect the new commands for import and export.
 *  > Added some more basic notices for empires and turned it on by default.
 *  > Added notices for a few commands that previously executed in silence so users know if something happened or not.
 *
 * -- 1.0.4 (23-04-2013) --
 *  > Added a few harmless commands for the mods.
 *  > Implemented the basic structure for empires.
 *
 * -- 0.9.8 (23-04-2013) --
 *  > Added several safety checks to the chat commands.
 *  > Added a module for tracking the users that voted. Use the new command /showvoters to see the list of people who voted, who they voted for and how many times they voted.
 *  > Cleaned up some bad code.
 *  > Added a message to indicate if a message is intercepted as chat commands.
 *  > Added a message to indicate if a notice is shown to the room or not.
 *  > Reformated the output for /help and /showfunctions.
 *  > Updated /help and /showfunctions to reflect the new commands and functions.
 *  > Changed the default value of the update interval to 15.
 *
 * -- 0.8.5 (22-04-2013) --
 *  > Initial release.
 *  > Implemented the native settings structure of Chaturbate (cb.settings_choices). It now asks for certain settings at launch.
 *  > Added the commands /help and /showfunctions to aid the user.
 *  > Reformated the output of the vote count to the room.
 *
 * -- 0.7.1 (21-04-2013) --
 *  > First version. Almost became release version, but I had some extra time and decided to postpone uploading it.
 *
 */

/* ChaturBate set-up */
cb.settings_choices =
[
	{ name: 'safeMode', type: 'choice', choice1: 'Enabled', choice2: 'Disabled', defaultValue: 'Disabled', label: "Safe Mode (turn this on when this bots chat commands clash with another bot)" },
	{ name: 'voting', type: 'choice', choice1: 'Enabled', choice2: 'Disabled', defaultValue: 'Disabled', label: 'Voting' },
	{ name: 'mr', type: 'int', minValue: 0, defaultValue: 0, label: "Current vote count (Mr)" },
	{ name: 'jess', type: 'int', minValue: 0, defaultValue: 0, label: "Current vote count (Jess)" },
	{ name: 'userLogging', type: 'choice', choice1: 'Enabled', choice2: 'Disabled', defaultValue: 'Enabled', label: 'Keep track of the users that voted this session' },
	{ name: 'teams', type: 'choice', choice1: 'Enabled', choice2: 'Disabled', defaultValue: 'Enabled', label: 'Show which team an user supports' },
	{ name: 'empires', type: 'choice', choice1: 'Enabled', choice2: 'Disabled', defaultValue: 'Enabled', label: 'Empires' },
	{ name: 'gazers', type: 'choice', choice1: 'Enabled', choice2: 'Disabled', defaultValue: 'Enabled', label: 'Gazers (Tagger)' },
	{ name: 'hotshot', type: 'choice', choice1: 'Enabled', choice2: 'Disabled', defaultValue: 'Disabled', label: 'Hotshot (Tagger)' },
	{ name: 'roomRules', type: 'choice', choice1: 'Enabled', choice2: 'Disabled', defaultValue: 'Enabled', label: 'Rules posting (Notifier)' },
	{ name: 'rules', type: 'str', minLength: 1, label: "The rules to post to the room", required: false },
	{ name: 'periodicUpdates', type: 'choice', choice1: 'Enabled', choice2: 'Disabled', defaultValue: 'Enabled', label: 'Periodic posting of vote count, rules and / or Empires' },
	{ name: 'updateInterval', type: 'int', minValue: 1, maxValue: 60, defaultValue: 15, label: "The interval for posting the updates (in minutes)" },
	{ name: 'userRights', type: 'choice', choice1: 'Enabled', choice2: 'Disabled', defaultValue: 'Enabled', label: 'User rights system' },
	{ name: 'importString', type: 'str', required: false, label: 'Import settings' }
];
/* END */


/* Plugin */
var Plugin =
{
	// Variables
	totalVotes: { mr: 0, jess: 0 },
	settings: { safeMode: false, voting: false, userLogging: true, teams: true, empires: true, gazers: true, hotshot: false, roomRules: false, rules: "", periodicUpdates: true, updateInterval: 15, userRights: true },
	userLog: { mr: [], jess: [], multiVote: [] },	// { name: "ExampleUser", votes: 10 }
	userRights: [ { name: "!mods", accessLevel: 1 }, { name: "bobomb", accessLevel: 2 } ],	// { name: "ExampleUser", accessLevel: 2 }
	empires: [],	// { name: "ExampleUser", soldiers: 20, regions: ["South America", "North America"] }
	gazers: [],	// { name: "ExampleUser" }
	hotshots: [], // { name: "ExampleUser" }
	
	// Constants
	name: "Txstarz Chat Enhancement",
	commandList:
	[
		{ command: "/help", description: "show all available commands.", accessLevel: 0 },
		{ command: "/showmodules", description: "show all available modules to turn on and off.", accessLevel: 2 },
		{ command: "/setmodule", parameters: "[on/off] [module_name]", description: "turn a module on or off.", accessLevel: 2 },
		{ command: "/showsettings", description: "show the current settings.", accessLevel: 2 },
		{ command: "/postvotes", description: "show the vote count to the room.", accessLevel: 1, toRoom: true, module: "voting" },
		{ command: "/showvotes", description: "show the vote count.", accessLevel: 0, module: "voting" },
		{ command: "/showvoters", description: "show the users that voted and how many times they voted for someone.", accessLevel: 1, module: "userLogging" },
		{ command: "/setinterval", parameters: "#", description: "set interval # in minutes for the periodic vote count update.", accessLevel: 2, module: "periodicUpdates" },
		{ command: "/setvotes", parameters: "[name]: # [name]: #", description: "set the vote count for both [name]'s to the corresponding #'s.", accessLevel: 2, module: "voting" },
		{ command: "/addvotes", parameters: "[name]: #", variation: "from: [user]", description: "add votes to one person, where [name] is the name of the person, # is the number of votes and optionally with [user] being the user who gave the votes.", accessLevel: 1, module: "voting" },
		{ command: "/postempires", description: "show the empires.", accessLevel: 1, toRoom: true, module: "empires" },
		{ command: "/showempires", description: "show the empires.", accessLevel: 0, module: "empires" },
		{ command: "/addempire", parameters: "[user]", description: "add an empire for user [user].", accessLevel: 2, module: "empires" },
		{ command: "/addregion", parameters: "[user]: [region]", description: "add region [region] to the empire of user [user].", accessLevel: 2, module: "empires" },
		{ command: "/addsoldiers", parameters: "[user]: #", description: "add # soldiers to the empire of user [user].", accessLevel: 2, module: "empires" },
		{ command: "/removeempire", parameters: "[user]", description: "remove the empire of user [user].", accessLevel: 2, module: "empires" },
		{ command: "/removeregion", parameters: "[user]: [region]", description: "remove region [region] from the empire of user [user].", accessLevel: 2, module: "empires" },
		{ command: "/removesoldiers", parameters: "[user]: #", description: "remove # soldiers from the empire of user [user].", accessLevel: 2, module: "empires" },
		{ command: "/showrights", description: "show the user rights list", accessLevel: 2, module: "userRights" },
		{ command: "/adduser", parameters: "[user]: #", description: "add user [user] to the user rights list with access level #.", accessLevel: 2, module: "userRights" },
		{ command: "/removeuser", parameters: "[user]", description: "remove user [user] from the user rights list.", accessLevel: 2, module: "userRights" },
		{ command: "/addgazer", parameters: "[user]", description: "add user [user] to the gazer list", accessLevel: 2, module: "gazers" },
		{ command: "/removegazer", parameters: "[user]", description: "remove user [user] from the gazer list", accessLevel: 2, module: "gazers" },
		{ command: "/addhotshot", parameters: "[user]", description: "add user [user] to the hotshot list", accessLevel: 2, module: "hotshot" },
		{ command: "/removehotshot", parameters: "[user]", description: "remove user [user] from the hotshot list", accessLevel: 2, module: "hotshot" },
		{ command: "/setrules", parameters: "x", description: "set the room rules to x", accessLevel: 1, module: "roomRules" },
		{ command: "/myvotes", description: "see who you voted for.", accessLevel: 0, module: "voting" },
		{ command: "/myempire", description: "see the statistics of your empire.", accessLevel: 0, module: "empires" },
		{ command: "/mystats", description: "see statistics about yourself.", accessLevel: 0 },
		{ command: "/exportsettings", description: "returns a JSON string that can be imported on the next run.", accessLevel: 2 },
		{ command: "/importsettings", description: "import settings from a previously exported JSON string.", accessLevel: 2 }
	],
	moduleList:
	[
		{ module: "safeMode", description: "in safe mode, chat commands will be ignored unless they use a special modifier." },
		{ module: "voting", description: "turn the voting module (Jess vs Mr) on or off." },
		{ module: "userLogging", description: "turn the user logging module on or off." },
		{ module: "teams", description: "turn the displaying of supporters for team Jess and team Mr on or off." },
		{ module: "empires", description: "turn the empires module on or off." },
		{ module: "periodicUpdates", description: "turn the periodic posting of the vote count and empires on or off." },
		{ module: "gazers", description: "turn the gazers module on or off." },
		{ module: "roomRules", description: "turn the rules module on or off." },
		{ module: "userRights", description: "turn command access for trusted users on or off" }
	]
};


/* General Functions */
/* tagMessage */
/* Tag a given message if the given user is in a list */
Plugin.tagMessage = function(message, user)
{
	if(Plugin.settings.gazers && Plugin.isGazer(user))
	{
		message = "[Gazer] " + message;
	}
	else if(Plugin.settings.hotshot && Plugin.isHotshot(user))
	{
		message = "[Hotshot] " + message;
	}
	if(Plugin.settings.voting && Plugin.isSupporter(user))
	{
		message = "[" + Plugin.getTeam(user) + "] " + message;
	}
	return message;
}

/* getTeam */
/* Determine which team this user supports */
Plugin.getTeam = function(user)
{
	if(user == "Topdog4400")
	{
		return "Team Derp";
	}
	else
	{
		var teamMrIndex = Bobomb.UserManager.findUserIndex(user, Plugin.userLog.mr);
		var teamJessIndex = Bobomb.UserManager.findUserIndex(user, Plugin.userLog.jess);
		if(teamJessIndex != -1)
		{
			if(teamMrIndex != -1 && (Plugin.userLog.mr[teamMr].votes > Plugin.userLog.jess[teamJess].votes))
			{
				return "Team Mr";
			}
			return "Team Jess";
		}
		else if(teamMrIndex != -1)
		{
			return "Team Mr";
		}
	}
}

/* processCommand - Plugin specific command processing */
/* Gets called from within the processCommand function in Bobomb when no matches were found */
/* Note: if both this function and the processNormalMessage function is not found, the messageHandler does not get set */
/* { command, description, module, parameter, variation, accessLevel, toRoom }, fullMessage, { name, accessLevel, gender } */
Plugin.processCommand = function(command, fullMessage, user)
{
	switch(command.command)
	{
		case "/mystats":
		{
			var output = "Stats: \n";
			if(user.name != cb.room_slug)
			{
				if(Plugin.settings.gazers)
				{
					output += "Gazer: ";
					if(Plugin.isGazer(user.name))
					{
						output += "yes";
					}
					else
					{
						output += "no";
					}
					output += "\n";
				}
				if(Plugin.settings.hotshots)
				{
					output += "Hotshot: ";
					if(Plugin.isHotshot(user.name))
					{
						output += "yes";
					}
					else
					{
						output += "no";
					}
					output += "\n";
				}
				if(Plugin.settings.voting)
				{
					if(Plugin.settings.teams && Plugin.isSupporter(user.name))
					{
						output += "Supporting: " + Plugin.getTeam(user.name) + "\n";
					}
					output += "Votes: \n" + Plugin.showVotes(true, user.name) + "\n";
				}
				if(Plugin.settings.empires)
				{
					output += "Empire: \n" + Plugin.showEmpires(true, user.name) + "\n";
				}
			}
			else
			{
				if(Plugin.settings.gazers)
				{
					output += "Nr of Gazers: " + Plugin.gazers.length + "\n";
				}
				if(Plugin.settings.hotshots)
				{
					output += "Nr of Hotshots: " + Plugin.hotshots.length + "\n";
				}
				if(Plugin.settings.voting)
				{
					if(Plugin.settings.userLogging)
					{
						output += "Nr of logged voters: " + (Plugin.userLog.mr.length + Plugin.userLog.jess.length + Plugin.userLog.multiVote.length) + "\n";
						output += "Voters: \n" + Plugin.showVoters() + "\n";
					}
					output += "Votes: \n" + Plugin.showVotes(true) + "\n";
				}
				if(Plugin.settings.empires)
				{
					output += "Nr of empires: " + Plugin.empires.length + "\n";
					output += "Empires: \n" + Plugin.showEmpires(true) + "\n";
				}
			}
			return output += "- - - -";
		}
		case "/myvotes":
		{
			if(user.name != cb.room_slug)
			{
				return Plugin.showVotes(true, user.name);
			}
			return "";
		}
		case "/myempire":
		{
			if(user.name != cb.room_slug)
			{
				return Plugin.showEmpires(true, user.name);
			}
			return "";
		}
		case "/showvotes":
		{
			return Plugin.showVotes(true);
		}
		case "/showempires":
		{
			return Plugin.showEmpires(true);
		}
		case "/showvoters":
		{
			return Plugin.showVoters();
		}
		case "/addempire":
		{
			var newUser = fullMessage.split(" ")[1].toLowerCase();
			Plugin.empires.push({ name: newUser, soldiers: 0, regions: [] });
			return "Empire made for user " + newUser + "!";
		}
		case "/addregion":
		{
			var parts = fullMessage.split(": ");
			var newUser = parts[0].split(" ")[1].toLowerCase();
			var region = parts[1];
			var userIndex = Bobomb.UserManager.findUserIndex(newUser, Plugin.empires);
			if(userIndex != -1)
			{
				Plugin.empires[userIndex].regions.push(region);
				return "Region " + region + " added to " + newUser + "'s empire!";
			}
			return Bobomb.MessageManager.errorNotice("InvalidValues", command.command, "No empire found for " + newUser + "!");
		}
		case "/addsoldiers":
		{
			var parts = fullMessage.split(": ");
			var newUser = parts[0].split(" ")[1].toLowerCase();
			var soldiers = parts[1];
			var userIndex = Bobomb.UserManager.findUserIndex(newUser, Plugin.empires);
			if(userIndex != -1)
			{
				if(isFinite(soldiers) && soldiers > 0)
				{
					Plugin.empires[userIndex].soldiers += parseInt(soldiers);
					return soldiers + " added to " + newUser + "'s empire!";
				}
				return Bobomb.MessageManager.errorNotice("InvalidValues", command.command, "Number of soldiers isn't a valid number!");
			}
			return Bobomb.MessageManager.errorNotice("InvalidValues", command.command, "No empire found for " + newUser + "!");
		}
		case "/removeregion":
		{
			var parts = fullMessage.split(": ");
			var newUser = parts[0].split(" ")[1].toLowerCase();
			var region = parts[1];
			var userIndex = Bobomb.UserManager.findUserIndex(newUser, Plugin.empires);
			if(userIndex != -1)
			{
				for(var i = 0; i < Plugin.empires[userIndex]; i++)
				{
					if(Plugin.empires[userIndex].regions[i] == region)
					{
						Plugin.empires[userIndex].regions.splice(i, 1);
						return "Region " + region + " removed from " + newUser + "'s empire!";
					}
				}
			}
			return Bobomb.MessageManager.errorNotice("InvalidValues", command.command, "No empire found for " + newUser + "!");
		}
		case "/removesoldiers":
		{
			var parts = fullMessage.split(": ");
			var newUser = parts[0].split(" ")[1].toLowerCase();
			var soldiers = parts[1];
			var userIndex = Bobomb.UserManager.findUserIndex(newUser, Plugin.empires);
			if(userIndex != -1)
			{
				if(isFinite(soldiers) && soldiers > 0)
				{
					Plugin.empires[userIndex].soldiers -= parseInt(soldiers);
					return soldiers + " removed from " + newUser + "'s empire!";
				}
				return Bobomb.MessageManager.errorNotice("InvalidValues", command.command, "Number of soldiers isn't a valid number!");
			}
			return Bobomb.MessageManager.errorNotice("InvalidValues", command.command, "No empire found for " + newUser + "!");
		}
		case "/removeempire":
		{
			var newUser = fullMessage.split(" ")[1].toLowerCase();
			var userIndex = Bobomb.UserManager.findUserIndex(newUser, Plugin.empires);
			if(userIndex != -1)
			{
				Plugin.empires.splice(userIndex, 1);
				return newUser + "'s empire has been removed!";
			}
			return Bobomb.MessageManager.errorNotice("InvalidValues", command.command, "No empire found for " + newUser + "!");
		}
		case "/addgazer":
		{
			var newUser = fullMessage.split(" ")[1].toLowerCase();
			Plugin.gazers.push({ name: newUser });
			return newUser + " added to the list with gazers!";
		}
		case "/removegazer":
		{
			var newUser = fullMessage.split(" ")[1].toLowerCase();
			var userIndex = Bobomb.UserManager.findUserIndex(newUser, Plugin.gazers);
			if(userIndex != -1)
			{
				Plugin.gazers.splice(userIndex, 1);
				return newUser + " is no longer a gazer!";
			}
			return Bobomb.MessageManager.errorNotice("InvalidValues", command.command, newUser + " is not a gazer!");
		}
		case "/addhotshot":
		{
			var newUser = fullMessage.split(" ")[1].toLowerCase();
			Plugin.hotshots.push({ name: newUser });
			return newUser + " added to the list with hotshots!";
		}
		case "/removehotshot":
		{
			var newUser = fullMessage.split(" ")[1].toLowerCase();
			var userIndex = Bobomb.UserManager.findUserIndex(newUser, Plugin.hotshots);
			if(userIndex != -1)
			{
				Plugin.hotshots.splice(userIndex, 1);
				return newUser + " is no longer a hotshot!";
			}
			return Bobomb.MessageManager.errorNotice("InvalidValues", command.command, newUser + " is not a hotshot!");
		}
		case "/setrules":
		{
			var newRules = fullMessage.split(" ");
			if(newRules.length > 1)
			{
				newRules.shift();
				Plugin.settings.rules = newRules.join(" ");
				Plugin.showRules(false);
				return "Rules have been successfully updated!";
			}
			return Bobomb.MessageManager.errorNotice("InvalidSyntax", command.command, "No new rules found!");
		}
		case "/addvotes":
		{
			if(fullMessage.search(/[A-z]{2,4}: [0-9]{1,3}/) != -1)
			{
				var newVotes = fullMessage.match(/[0-9]{1,3}/)[0];
				var target = "";
				if(isFinite(newVotes) && newVotes > 0)
				{
					if(fullMessage.toLowerCase().indexOf("mr") != -1)
					{
						Plugin.totalVotes.mr += parseInt(newVotes);
						target = "mr";
					}
					else if(fullMessage.toLowerCase().indexOf("jess") != -1)
					{
						Plugin.totalVotes.jess += parseInt(newVotes);
						target = "jess";
					}
					
					if(Plugin.settings.userLogging && fullMessage.toLowerCase().search(/from: [A-z]+/) != -1)
					{
						var voter = fullMessage.toLowerCase().split("from: ")[1];
						var voterIndex = Bobomb.UserManager.findUserIndex(voter, Plugin.userLog[target]);
						if(voterIndex != -1)
						{
							Plugin.userLog[target][voterIndex].votes += parseInt(newVotes);
						}
						else
						{
							Plugin.userLog[target].push({ name: voter, votes: parseInt(newVotes) });
						}
					}
					var formattedTarget = target.charAt(0).toUpperCase() + target.substr(1);
					return newVotes + " added to " + formattedTarget + "'s vote count!\n" + formattedTarget + " now has " + Plugin.totalVotes[target] + " voters";
				}
				return Bobomb.MessageManager.errorNotice("InvalidValues", command.command, "Number of votes isn't a valid number!");
			}
			return Bobomb.MessageManager.errorNotice("InvalidSyntax", command.command);
		}
		case "/setvotes":
		{
			var counts = fullMessage.match(/[A-z]{2,4}: [0-9]{1,3}/g);
			if(counts != null && counts.length == 2)
			{
				var newVote1 = counts[0].split(": ")[1];
				var newVote2 = counts[1].split(": ")[1];
				if(isFinite(newVote1) && isFinite(newVote2) && newVote1 > 0 && newVote2 > 0)
				{
					if(counts[0].toLowerCase().indexOf("mr") != -1)
					{
						Plugin.totalVotes.mr = parseInt(newVote1);
						Plugin.totalVotes.jess = parseInt(newVote2);
					}
					else if(counts[0].toLowerCase().indexOf("jess") != -1)
					{
						Plugin.totalVotes.mr = parseInt(newVote2);
						Plugin.totalVotes.jess = parseInt(newVote1);
					}
					return "Votes have been successfully set!\n" + Plugin.totalVotes.mr + " for Mr and " + Plugin.totalVotes.jess + " for Jess";
				}
				return Bobomb.MessageManager.errorNotice("InvalidValues", command.command, "Number of votes isn't a valid number!");
			}
			return Bobomb.MessageManager.errorNotice("InvalidSyntax", command.command);
		}
		case "/setinterval":
		{
			var newInterval = fullMessage.match(/[0-9]{1,2}/)[0];
			if(newInterval != null && isFinite(newInterval) && newInterval > 0 && newInterval <= 60)
			{
				Plugin.settings.updateInterval = parseInt(newInterval);
				return "Interval has been set to " + newInterval + " minutes!";
			}
			return Bobomb.MessageManager.errorNotice("InvalidValues", command.command, "Interval isn't a valid number!");
		}
		case "/showrights":
		{
			var output = "";
			for(var i = 0; i < Plugin.userRights; i++)
			{
				if(i > 0)
				{
					output += ", ";
				}
				output += Plugin.userRights[i].name + " (" + Plugin.userRights[i].accessLevel + ")";
			}
			return output;
		}
		case "/adduser":
		{
			if(fullMessage.search(/[A-z]+: [0-9]{1}/) != -1)
			{
				var parts = fullMessage.split(": ");
				var newUser = parts[0].split(" ")[1].toLowerCase();
				var accessLevel = parts[1];
				if(isFinite(accessLevel) && accessLevel >= 0 && accessLevel <= 2 && newUser != cb.room_slug && newUser != "!mods")
				{
					Plugin.userRights.push({ name: newUser, accessLevel: parseInt(accessLevel) });
					return "User " + newUser + " added to the list with accessLevel " + accessLevel + "!";
				}
				return Bobomb.MessageManager.errorNotice("InvalidValues", command.command);
			}
			return Bobomb.MessageManager.errorNotice("InvalidSyntax", command.command);
		}
		case "/removeuser":
		{
			var newUser = fullMessage.split(" ")[1].toLowerCase();
			var userIndex = Bobomb.UserManager.findUserIndex(newUser, Plugin.userRights);
			if(userIndex != -1 && newUser != "!mods")
			{
				Plugin.userRights.splice(userIndex, 1);
				return "All rights of " + newUser + " have been revoked!";
			}
			return Bobomb.MessageManager.errorNotice("InvalidValues", command.command, "User not found!");
		}
		default:
		{
			return "";
		}
	}
	return "";
}

/* processNormalMessage - Process messages that aren't commands */
/* Gets called from within the messageHandler function in Bobomb when the message does not seem to be a command */
/* Note: if both this function and the processCommand function is not found, the messageHandler does not get set */
/* message, colour, font, { name, hasTokens, isMod, tippedRecently, isFan, gender, accessLevel } */
Plugin.processNormalMessage = function(message, colour, font, user)
{
	return { message: Plugin.tagMessage(message, user.name), colour: colour, font: font };
}

/* processTip - Plugin specific tip processing */
/* Gets called from within the tipHandler function in Bobomb */
/* Note: if this function is not found, the tipHandler does not get set */
/* amount, message, { name }, { name, hasTokens, isMod, tippedRecently, isFan, gender, accessLevel } */
Plugin.processTip = function(amount, message, toUser, fromUser)
{
	if(amount >= 500)
	{
		if(Plugin.settings.gazers && !Plugin.isGazer(fromUser.name))
		{
			Plugin.gazers.push({ name: fromUser.name });
			cb.chatNotice(fromUser.name + " just became a Txstarz Gazer!");
		}
		else if(Plugin.settings.hotshot && !Plugin.isHotshot(fromUser.name))
		{
			Plugin.hotshot.push({ name: fromUser.name });
			cb.chatNotice(fromUser.name + " just became a JessiJayde Hotshot!");
		}
	}
	if(amount >= 100)
	{
		var confirmedTipMessage = message.toLowerCase();
		var dividedByHundred = parseInt(Math.floor(parseInt(amount) / 100));
		if(Plugin.settings.voting && confirmedTipMessage.search(/(vote|voting)/) != -1)
		{
			var output = fromUser.name + " voted " + dividedByHundred + " time";
			if(dividedByHundred > 1)
			{
				output += "s";
			}
			output += " for";
			var restOfOutput = "";
			
			// DEV //
			var multiVote = false;
			var combinedVote = false;
			
			if(confirmedTipMessage.indexOf("jess") != -1)
			{
				restOfOutput += " Jess";
				Plugin.totalVotes.jess += dividedByHundred;
				
				if(Plugin.settings.userLogging)
				{
					var jessUserIndex = Bobomb.UserManager.findUserIndex(fromUser.name, Plugin.userLog.jess);
					if(jessUserIndex != -1)
					{
						Plugin.userLog.jess[jessUserIndex][1] += dividedByHundred;
					}
					else
					{
						Plugin.userLog.jess.push([fromUser.name, dividedByHundred]);
					}
				}
			}
			if(confirmedTipMessage.indexOf("mr") != -1)
			{
				if(restOfOutput.length > 0)
				{
					if(tip['amount'] > 100)
					{
						output = tip['from_user'] + " voted for";
						restOfOutput += " and";
						
						// DEV //
						multiVote = true;
						cb.chatNotice("Multi votes (a tip above 100 saying that there are votes for both of you) are not yet fully implemented, please adjust the total vote count manually using /setvotes or /addvotes.", cb.room_slug);
						
						if(Plugin.settings.userLogging)
						{
							var multiUserIndex = Bobomb.UserManager.findUserIndex(fromUser.name, Plugin.userLog.multiVote);
							if(multiUserIndex != -1)
							{
								Plugin.userLog.multiVote[multiUserIndex][1] += dividedByHundred;
							}
							else
							{
								Plugin.userLog.multiVote.push([fromUser.name, dividedByHundred]);
							}
						}
					}
					else
					{
						combinedVote = true;
						cb.chatNotice("The tip message could not be resolved. Because it is not clear to who the vote should go, it is not added to the count.\nPlease add the vote manually", cb.room_slug);
					}
				}
				restOfOutput += " Mr";
				Plugin.totalVotes.mr += dividedByHundred;
				
				if(Plugin.settings.userLogging)
				{
					var mrUserIndex = Bobomb.UserManager.findUserIndex(fromUser.name, Plugin.userLog.mr);
					if(mrUserIndex != -1)
					{
						Plugin.userLog.mr[mrUserIndex][1] += dividedByHundred;
					}
					else
					{
						Plugin.userLog.mr.push([fromUser.name, dividedByHundred]);
					}
				}
			}
			
			// DEV //
			if(multiVote)
			{
				Plugin.totalVotes.mr -= dividedByHundred;
				Plugin.totalVotes.jess -= dividedByHundred;
				
				if(Plugin.settings.userLogging)
				{
					Plugin.userLog.mr[mrUserIndex][1] -= dividedByHundred;
					Plugin.userLog.jess[jessUserIndex][1] -= dividedByHundred;
					if(Plugin.userLog.mr[mrUserIndex][1] == 0)
					{
						Plugin.userLog.mr.splice(mrUserIndex, 1);
					}
					if(Plugin.userLog.jess[jessUserIndex][1] == 0)
					{
						Plugin.userLog.jess.splice(jessUserIndex, 1);
					}
				}
			}
			if(combinedVote)
			{
				restOfOutput = "";
				
				Plugin.totalVotes.mr -= dividedByHundred;
				Plugin.totalVotes.jess -= dividedByHundred;
				
				if(Plugin.settings.userLogging)
				{
					Plugin.userLog.jess[jessUserIndex][1] -= dividedByHundred;
					Plugin.userLog.mr[mrUserIndex][1] -= dividedByHundred;
					if(Plugin.userLog.jess[jessUserIndex][1] == 0)
					{
						Plugin.userLog.jess.splice(jessUserIndex, 0);
					}
					if(Plugin.userLog.mr[mrUserIndex][1] == 0)
					{
						Plugin.userLog.mr.splice(mrUserIndex, 0);
					}
				}
			}
			
			if(restOfOutput.length > 0)
			{
				cb.chatNotice(output + restOfOutput + "!");
				Plugin.showVotes(false);
			}
		}
		else if(Plugin.settings.empires && confirmedTipMessage.indexOf("empires") != -1)
		{
			// DEV //
			var userIndex = Bobomb.UserManager.findUserIndex(fromUser.name, Plugin.empires);
			if(userIndex == -1)
			{
				Plugin.empires.push({ name: fromUser.name, soldiers: 0, regions: [] });
				cb.chatNotice(fromUser.name + " has just signed up for empires!");
				cb.chatNotice("Please assign a starting region to " + fromUser.name, cb.room_slug);
			}
			
			var output = "";
			if(confirmedTipMessage.indexOf("soldier") != -1)
			{
				Plugin.empires[userIndex].soldiers += dividedByHundred;
				output = fromUser.name + " hired " + dividedByHundred + " soldier";
				if(dividedByHundred > 1)
				{
					output += "s";
				}
				output += "!";
			}
			else if(amount >= 500 && (confirmedTipMessage.indexOf("transfer") != -1 || confirmedTipMessage.indexOf("transport") != -1))
			{
				if(output.length > 0)
				{
					output += "\n";
				}
				output = fromUser.name + " called in an one time troop transport!";
				cb.chatNotice("Please adjust the regions accordingly.", cb.room_slug);
			}
			else if(amount >= 400 && confirmedTipMessage.indexOf("spy") != -1)
			{
				if(output.length > 0)
				{
					output += "\n";
				}
				output = fromUser.name + " has sent out ";
				if(fromUser.gender == "m")
				{
					output += "his";
				}
				else if(fromUser.gender == "c")
				{
					output += "their";
				}
				else
				{
					output += "her";
				}
				output += " spies to collect information!";
			}
			else if(amount >= 250 && (confirmedMessage.indexOf("invade") != -1 || confirmedTipMessage.indexOf("attack") != -1))
			{
				if(output.length > 0)
				{
					output += "\n";
				}
				output = fromUser.name + " is invading a neighboring country!";
				cb.chatNotice("Don't forget to adjust the regions of the involved empires.", cb.room_slug);
			}
			
			if(output.length > 0)
			{
				cb.chatNotice(output + "\nFor more information on Empires, see http://www.jessijayde.com/empires");
			}
		}
	}
}

/* showVotes */
/* Post or return the vote count to the room or the given user */
Plugin.showVotes = function(get, user)
{
	var output = "";
	if(user == undefined)
	{
		if(Plugin.totalVotes.mr > Plugin.totalVotes.jess)
		{
			output += "Mr is leading by " + (Plugin.totalVotes.mr - Plugin.totalVotes.jess) + " votes!";
		}
		else if(Plugin.totalVotes.jess > Plugin.totalVotes.mr)
		{
			output += "Jess is leading by " + (Plugin.totalVotes.jess - Plugin.totalVotes.mr) + " votes!";
		}
		else if(Plugin.totalVotes.mr == Plugin.totalVotes.jess)
		{
			output += "It's a tie!";
		}
		output += "\n(" + Plugin.totalVotes.mr + " for Mr vs " + Plugin.totalVotes.jess + " for Jess)";
	}
	else
	{
		var jessIndex = Bobomb.UserManager.findUserIndex(user, Plugin.userLog.jess);
		var mrIndex = Bobomb.UserManager.findUserIndex(user, Plugin.userLog.mr);
		var multiIndex = Bobomb.UserManager.findUserIndex(user, Plugin.userLog.multiVote);
		if(jessIndex != -1)
		{
			output += "Votes for Jess: " + Plugin.userLog.jess[jessIndex].votes;
		}
		if(mrIndex != -1)
		{
			if(output.length > 0)
			{
				output += "\n";
			}
			output += "Votes for Mr: " + Plugin.userLog.mr[mrIndex].votes;
		}
		if(multiIndex != -1)
		{
			if(output.length > 0)
			{
				output += "\n";
			}
			output += "Multi votes: " + Plugin.userLog.multiVote[multiIndex].votes;
		}
		
		if(output.length <= 0)
		{
			output += "No votes made yet!";
		}
	}
	
	if(!get)
	{
		cb.chatNotice(output);
	}
	else
	{
		return output;
	}
}

/* getVoteLog */
/* Return the given vote log to the caller */
Plugin.getVoteLog = function(log)
{
	var output = "";
	if(log.length > 0)
	{
		for(var i = 0; i < log.length; i++)
		{
			if(i > 0)
			{
				output += ", ";
			}
			output += log[i].name + " (" + log[i].votes + " times)";
		}
	}
	else
	{
		output += "None";
	}
	return output;
}

/* showVoters */
/* Return the voters log to the caller */
Plugin.showVoters = function()
{
	var output = "The following users voted for Jess:\n";
	output += Plugin.getVoteLog(Plugin.userLog.jess);
	
	output += "\nThe following users voted for Mr:\n";
	output += Plugin.getVoteLog(Plugin.userLog.mr);
	
	// DEV //
	if(Plugin.userLog.multiVote.length > 0)
	{
		output += "\nThe following users casted multivotes:\n";
		output += Plugin.getVoteLog(Plugin.userLog.multiVote);
	}
	
	return output;
}

/* getEmpire */
/* Return the given empire to the caller */
Plugin.getEmpire = function(empire)
{
	var output = "";
	output += empire.name + "'s empire: \n";
	output += "Army size: " + empire.soldiers + " soldiers.\nRegions: ";
	for(var i = 0; i < empire.regions.length; i++)
	{
		if(i > 0)
		{
			output += ", ";
		}
		output += empire.regions[i];
	}
	return output + ".";
}

/* showEmpires */
/* Post or return the empires to the room or the given user */
Plugin.showEmpires = function(get, user)
{
	var output = "";
	if(user == undefined)
	{
		if(Plugin.empires.lenght > 0)
		{
			for(var i = 0; i < Plugin.empires.length; i++)
			{
				if(i > 0)
				{
					output += "\n";
				}
				output += Plugin.getEmpire(Plugin.empires[i]);
			}
		}
		else
		{
			output += "No empires found!";
		}
	}
	else
	{
		var empireIndex = Bobomb.UserManager.findUserIndex(user, Plugin.empires);
		if(empireIndex != -1)
		{
			output += Plugin.getEmpire(Plugin.empires[empireIndex]);
		}
		else
		{
			output += "No empire found!";
		}
	}
	
	if(!get)
	{
		cb.chatNotice(output);
	}
	else
	{
		return output;
	}
}

/* isGazer */
/* Determine if the given user is a gazer */
Plugin.isGazer = function(user)
{
	return Bobomb.UserManager.isUserInList(user, Plugin.gazers);
}

/* isHotshot */
/* Determine if the given user is a hotshot */
Plugin.isHotshot = function(hotshot)
{
	return Bobomb.UserManager.isUserInList(user, Plugin.hotshots);
}

/* isSupporter */
/* Determine if the given user is a supporter */
Plugin.isSupporter = function(user)
{
	return (Bobomb.UserManager.isUserInList(user, Plugin.userLog.jess) || Bobomb.UserManager.isUserInList(user, Plugin.userLog.mr));
}

/* showRules */
/* Show the room rules */
Plugin.showRules = function(get)
{
	if(!get)
	{
		cb.chatNotice(Plugin.settings.rules);
	}
	else
	{
		return Plugin.settings.rules;
	}
}

/* postUpdate */
/* Post an update of the voting or the empires to the room */
Plugin.postUpdate = function()
{
	if(Plugin.settings.periodicUpdates)
	{
		if(Plugin.settings.voting)
		{
			Plugin.showVotes(false);
			cb.chatNotice("To vote, tip 100 tokens (or a multitude of 100) and type 'vote [name]' ([name] being Jess or Mr) in the tip message");
		}
		if(Plugin.settings.empires)
		{
			Plugin.showEmpires(false);
			cb.chatNotice("For more information on Empires, see http://www.jessijayde.com/empires");
		}
		if(Plugin.settings.roomRules)
		{
			Plugin.showRules(false);
		}
		cb.setTimeout(Plugin.postUpdate, (Plugin.settings.updateInterval * 60000));
	}
}

/* init - Plugin specific initiation */
/* Gets called from within the init function in Bobomb */
Plugin.init = function()
{
	Plugin.postUpdate();
}
/* END */


/**
 * Bobomb
 *
 * Author: Bobomb
 * Version: 3.8.2
 * Last update: 10-07-2013
 *
 * Bobomb's main module with generic functions to extend CB's functionality. Appended to the end of all apps and bots made by Bobomb.
 *
 * Change log:
 * -- 3.8.2 (10-07-2013) --
 *  > Fixed a bug with the chatcommands.
 *
 * -- 3.8.1 (10-06-2013) --
 *  > Added two new modifiers to the chat commands.
 *  > Added support for safe mode.
 *
 * -- 3.7.0 (10-06-2013) --
 *  > Added code to make Plugin constants behave like constants.
 *
 * -- 3.6.4 (09-06-2013) --
 *  > Cleaned up some code.
 *  > Added documentation.
 *  > Expanded the translate settings logic.
 *  > Fixed the registering for message events not working when only normal messages are being used.
 * 
 * -- 3.6.1 (19-05-2013) --
 *  > Altered the handeling of messages and tips.
 *  > Fixed an issue with bad switches.
 *  > Renamed the function system to module system.
 *
 * -- 2.2.2 (16-05-2013) --
 *  > Reworked settings translation.
 *  > Added functionality to work with TCE.
 *  > Among these functionalities is the inclusion of the TipManager.
 *
 * -- 1.9.1 (10-05-2013) --
 *  > Added MessageManager.getCommandInfo.
 *  > Changed the way commands are processed.
 *
 * -- 1.7.3 (09-05-2013) --
 *  > Initial public release.
 *
 * -- 1.3.5 (08-05-2013) --
 *  > Initial implementation.
 *
 */

/* Bobomb */
var Bobomb =
{
	// Function grouping
	SettingsManager: {},
	MessageManager: {},
	TipManager: {},
	UserManager: {},
	
	// Constants
	positives: ["Enabled", "On", "Yes", "Enable", "True"]
};


/* Settings Manager */
/* translateSetting */
/* Resolve a setting and see if there is a corresponding setting in the ChaturBate settings object */
Bobomb.SettingsManager.translateSetting = function(parentObject, settingName)
{
	if(parentObject[settingName].constructor == Object)
	{
		for(var part in parentObject[settingName])
		{
			Bobomb.SettingsManager.translateSetting(parentObject[settingName], part);
		}
	}
	else if(cb.settings[settingName] != undefined)
	{
		if(parentObject[settingName].constructor == Boolean)
		{
			if(Bobomb.positives.indexOf(cb.settings[settingName]) != -1)
			{
				parentObject[settingName] = true;
			}
			else
			{
				parentObject[settingName] = false;
			}
		}
		else if(parentObject[settingName].constructor == String || parentObject[settingName].constructor == Number)
		{
			parentObject[settingName] = cb.settings[settingName];
		}
	}
}

/* translateSettings */
/* Loop through all settings and check for a CB version of it */
Bobomb.SettingsManager.translateSettings = function()
{
	for(var part in Plugin)
	{
		if(Plugin[part].constructor != Function)
		{
			Bobomb.SettingsManager.translateSetting(Plugin, part);
		}
	}
	
	if(cb.settings.importString != undefined && cb.settings.importString.length > 0)
	{
		Bobomb.SettingsManager.importAll(cb.settings.importString);
	}
}

/* exportSetting */
/* Turn a setting in a JSON string */
Bobomb.SettingsManager.exportSetting = function(setting)
{
	return '"' + setting + '":' + JSON.stringify(Plugin[setting]);
}

/* exportAll */
/* Loop through all settings and prepare them for export */
/* Returns: A JSON string containing all settings */
Bobomb.SettingsManager.exportAll = function()
{
	var parts = [];
	for(var part in Plugin)
	{
		if(Plugin[part].constructor != Function)
		{
			parts.push(Bobomb.SettingsManager.exportSetting(part));
		}
	}
	var string = "";
	for(var part in parts)
	{
		if(part > 0)
		{
			string += ",";
		}
		string += parts[part];
	}
	return "{" + string + "}";
}

/* importSetting */
/* Set a given setting to the value (if any) contained in the given importObject */
Bobomb.SettingsManager.importSetting = function(importObject, setting)
{
	if(importObject[setting] != undefined && Plugin[setting] != undefined)
	{
		Plugin[setting] = importObject[setting];
	}
}

/* importAll */
/* Parse the given JSON string and loop through all settings to pass them the imported values */
/* Returns: a string message informing the caller of succes or failure */
Bobomb.SettingsManager.importAll = function(importString)
{
	if(importString.indexOf("Notice:") != -1)
	{
		importString = importString.split("Notice: ")[1];
	}
	try
	{
		var importObject = JSON.parse(importString);
	}
	catch(e)
	{
		return "Import failed!";
	}
	for(var part in Plugin)
	{
		if(Plugin[part].constructor != Function)
		{
			Bobomb.SettingsManager.importSetting(importObject, part);
		}
	}
	return "Import successfull!";
}
/* END */


/* Message Manager */
/* makeList */
/* This function is used to create the list of commands and modules */
/* Returns: a string containing all entries from a given list for a given user */
Bobomb.MessageManager.makeList = function(fromList, user)
{
	var output = "";
	if(fromList == Plugin.commandList)
	{
		output += "Commands for " + Plugin.name + ": \n";
		var restOfOutput = "";
		for(var i = 0; i < Plugin.commandList.length; i++)
		{
			if((Plugin.commandList[i].module == undefined || Plugin.settings[Plugin.commandList[i].module]) && Plugin.commandList[i].accessLevel <= user.accessLevel)
			{
				if(restOfOutput.length > 0)
				{
					restOfOutput += "\n";
				}
				restOfOutput += Plugin.commandList[i].command;
				if(Plugin.commandList[i].parameters != undefined)
				{
					restOfOutput += " " + Plugin.commandList[i].parameters;
				}
				restOfOutput += " | " + Plugin.commandList[i].description;
				if(Plugin.commandList[i].variation != undefined)
				{
					restOfOutput += "\n" + Plugin.commandList[i].command + " " + Plugin.commandList[i].parameters + " " + Plugin.commandList[i].variation + " | " + Plugin.commandList[i].description;
				}
			}
		}
		var modifiers = "\nBy adding !private to a command, the return message will always be hidden from the room.";
		if(Plugin.settings.safeMode)
		{
			modifiers += "\nBy adding !" + Plugin.name.toLowerCase() + " to a command, the command is intercepted by this bot.";
		}
		else
		{
			modifiers += "\nBy adding !" + Plugin.name.toLowerCase() + "-ignore to a command, this bot will not respond to the command.";
		}
		output = output + restOfOutput + modifiers;
	}
	else if(fromList == Plugin.moduleList)
	{
		output += "Modules for " + Plugin.name + ": \n";
		for(var i = 0; i < Plugin.moduleList.length; i++)
		{
			if(i != 0)
			{
				output += "\n";
			}
			output += Plugin.moduleList[i].module + " | " + Plugin.moduleList[i].description;
		}
	}
	return output;
}

/* getCommandInfo */
/* This function retrieves all information about the given command */
/* Returns: { command, description, module, parameter, variation, accessLevel, toRoom } (or null)*/
Bobomb.MessageManager.getCommandInfo = function(command)
{
	for(var commandIndex in Plugin.commandList)
	{
		if(Plugin.commandList[commandIndex].command == command.toLowerCase())
		{
			return Plugin.commandList[commandIndex];
		}
	}
	return null;
}

/* errorNotice */
/* Send a chat notice to the room owner with an error message for a given command */
/* You can also pass a custom message to the function */
Bobomb.MessageManager.errorNotice = function(type, commandName, customMessage)
{
	var user = { name: cb.room_slug };
	if(customMessage == undefined)
	{
		customMessage = "";
	}
	switch(type)
	{
		case "InvalidValues":
		{
			cb.chatNotice("Invalid values found for command " + commandName + "! " + customMessage, user.name);
			return "";
		}
		case "InvalidSyntax":
		{
			cb.chatNotice("Invalid syntax found for command " + commandName + "! " + customMessage, user.name);
			return "";
		}
		default:
		{
			cb.log("An error occured while processing an error! " + customMessage);
			return "";
		}
	}
	return "";
}

/* processCommand */
/* This function checks if the call to the matched command is legit and gives the implementation for the standard commands */
/* If the call is legit and it is not a standard command, the Plugin specific version of processCommand is called */
Bobomb.MessageManager.processCommand = function(command, fullMessage, user)
{
	if(command.command != null && (command.accessLevel == undefined || user.accessLevel >= command.accessLevel) && (command.module == undefined || Plugin.settings[command.module]))
	{
		switch(command.command)
		{
			case "/help":
			{
				return Bobomb.MessageManager.makeList(Plugin.commandList, user);
			}
			case "/showsettings":
			{
				var output = "Current settings:";
				for(var setting in Plugin.settings)
				{
					output += "\n" + setting + ": " + Plugin.settings[setting];
				}
				return output;
			}
			case "/showmodules":
			{
				if(Plugin.moduleList != undefined)
				{
					return Bobomb.MessageManager.makeList(Plugin.moduleList, user);
				}
				return "";
			}
			case "/setmodule":
			{
				if(Plugin.moduleList != undefined)
				{
					if(fullMessage.indexOf(" on") != -1)
					{
						for(var i = 0; i < Plugin.moduleList.length; i++)
						{
							var name = Plugin.moduleList[i].module;
							if(fullMessage.indexOf(name) != -1)
							{
								Plugin.settings[name] = true;
								return name.charAt(0).toUpperCase() + name.substr(1) + " turned on!";
							}
						}
						return Bobomb.MessageManager.errorNotice("InvalidValues", command.command, "Unknown module!");
					}
					else if(fullMessage.indexOf(" off") != -1)
					{
						for(var i = 0; i < Plugin.moduleList.length; i++)
						{
							var name = Plugin.moduleList[i].module;
							if(fullMessage.indexOf(name) != -1)
							{
								Plugin.settings[name] = false;
								return name.charAt(0).toUpperCase() + name.substr(1) + " turned off!";
							}
						}
						return Bobomb.MessageManager.errorNotice("InvalidValues", command.command, "Unknown module!");
					}
					return Bobomb.MessageManager.errorNotice("InvalidSyntax", command.command, "Action (on/off) not specified!");
				}
				break;
			}
			case "/exportsettings":
			{
				return Bobomb.SettingsManager.exportAll();
			}
			case "/importsettings":
			{
				return Bobomb.SettingsManager.importAll(fullMessage.slice(15));
			}
			default:
			{
				return Plugin.processCommand(command, fullMessage, user);
			}
		}
	}
	return "";
}

/* messageHandler */
/* Invoked for each message. Calls the appropiate function for the type of message */
Bobomb.MessageManager.messageHandler = function(message)
{
	var command = message['m'].match(/^\/[A-z]+/);
	if(command != null && (!Plugin.settings.safeMode || message['m'].indexOf("!" + Plugin.name.toLowerCase()) != -1) && message['m'].indexOf("!" + Plugin.name.toLowerCase() + "-ignore") == -1)
	{
		command = Bobomb.MessageManager.getCommandInfo(command[0]);
		if(command != null)
		{
			var returnMessage = Bobomb.MessageManager.processCommand(command, message.m, Bobomb.UserManager.makeUserObject(message, true));
			if(returnMessage.length > 0)
			{
				if(message.m.indexOf("!private") == -1 && command.toRoom)
				{
					cb.chatNotice(returnMessage);
				}
				else
				{
					cb.chatNotice(returnMessage + "\n(Not shown to room)", message.user);
				}
				message.m += " (intercepted as command by " + Plugin.name + ")";
				message['X-Spam'] = true;
			}
		}
	}
	else if(Plugin.processNormalMessage != undefined)
	{
		var returnObject = Plugin.processNormalMessage(message.m, message.c, message.f, Bobomb.UserManager.makeUserObject(message));
		message.m = returnObject.message;
		message.c = returnObject.colour;
		message.f = returnObject.font;
	}
	return message;
}
/* END */


/* Tip Manager */
/* tipHandler */
/* Invoked for each tip. Calls the Plugin's processTip function */
Bobomb.TipManager.tipHandler = function(tip)
{
	Plugin.processTip(tip.amount, tip.message, { name: tip.to_user }, Bobomb.UserManager.makeUserObject(tip));
}
/* END */


/* User Manager */
/* makeUserObject */
/* Create a standarized user object out of a given sourceobject */
/* Note: set the commandingUser parameter to any value to get a special user object for use with the processCommand function */
/* Returns: { name, hasTokens, isMod, tippedRecently, isFan, gender, accessLevel } (or null) */
Bobomb.UserManager.makeUserObject = function(sourceObject, commandingUser)
{
	if(commandingUser != undefined)
	{
		return { name: sourceObject.user, accessLevel: Bobomb.UserManager.getAccessLevel({ name: sourceObject.user, isMod: sourceObject.is_mod }), gender: sourceObject.gender };
	}
	else
	{
		var returnObject = {};
		var prefix = "";
		if(sourceObject.amount != undefined)
		{
			returnObject.name = sourceObject.from_user;
			prefix = "from_user";
		}
		else
		{
			returnObject.name = sourceObject.user;
		}
		for(var field in [["is_mod", "isMod"], ["has_tokens", "hasTokens"], ["tipped_recently", "tippedRecently"], ["in_fanclub", "isFan"], ["gender", "gender"]])
		{
			returnObject[field[1]] = sourceObject[prefix + field[0]];
		}
		returnObject.accessLevel = Bobomb.UserManager.getAccessLevel(returnObject);
		return returnObject;
	}
	return null;
}

/* isUserInList */
/* This function is used to determine if an user is in a given list */
/* Note: it is assumed that all lists containing users are arrays of objects with a key/value pair called name to contain the name of a user */
/* Returns: a boolean value */
Bobomb.UserManager.isUserInList = function(user, target)
{
	return (Bobomb.UserManager.findUserIndex(user, target) != -1);
}

/* findUserIndex */
/* This function is used to get the index of a given user in a given list */
/* Note: it is assumed that all lists containing users are arrays of objects with a key/value pair called name to contain the name of a user */
/* Returns: the numeric index of the user in the target list (or -1) */
Bobomb.UserManager.findUserIndex = function(user, target)
{
	if(target.constructor == Array && target.length > 0)
	{
		for(var i = 0; i < target.length; i++)
		{
			if(target[i].name == user)
			{
				return i;
			}
		}
		return -1;
	}
	return -1;
}

/* getAccessLevel */
/* This function is used to retrieve the access level of a given user */
/* Returns: an integer representing the users access level */
Bobomb.UserManager.getAccessLevel = function(user)
{
	if(user.name == cb.room_slug)
	{
		return 2;
	}
	else if(user.isMod)
	{
		return 1;
	}
	return 0;
}
/* END */


/* General functions */
/* init */
/* Initializes the basic parts of the framework */
Bobomb.init = function()
{
	// Make the Plugin constants actual constants!
	Object.defineProperty(Plugin, "name", { enumerable: false, configurable: false, writable: false, value: Plugin.name });
	Object.defineProperty(Plugin, "commandList", { enumerable: false, configurable: false, writable: false, value: Plugin.commandList });
	Object.defineProperty(Plugin, "moduleList", { enumerable: false, configurable: false, writable: false, value: Plugin.moduleList });
	Bobomb.SettingsManager.translateSettings();
	if(Plugin.processCommand != undefined || Plugin.processNormalMessage != undefined)
	{
		cb.onMessage(Bobomb.MessageManager.messageHandler);
	}
	if(Plugin.processTip != undefined)
	{
		cb.onTip(Bobomb.TipManager.tipHandler);
	}
	if(Plugin.init != undefined)
	{
		Plugin.init();
	}
}
/* END */


Bobomb.init();
