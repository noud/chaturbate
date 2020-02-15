// https://chaturbate.com/apps/user_uploads/3/bobomb/
// https://chaturbate.com/apps/app_details/trivia/?version=&slot=3

/**
 * Trivia
 *
 * Author: Bobomb
 * Version: 0.2.0
 * Last update: 24-07-2013
 *
 * Build on:
 * Framework version 3.7
 *	<PluginBase (version 2.7.2)>
 *	<Bobomb (version 3.8.2)>
 *
 * Usage:
 * Set the initial settings. The bot will now post trivia to the room.
 *
 * For more information, type /help in chat.
 *
 * 
 * Full list of supported commands: 
 * /help
 * /showmodules
 * /setmodule
 * /showsettings
 * /exportsettings
 * /importsettings
 * /movieinfo
 * /moviename
 * /postmoviename
 * /trivia
 * /addinfo
 * /setinterval
 * /setmoviename
 *
 *
 * Change log:
 * -- 0.2.0 (24-07-2013) --
 *  > Added a new module for giving tippers names from the movie.
 *
 * -- 0.1.0 (10-07-2013) --
 *  > Initial release.
 *
 */

/* ChaturBate set-up */
cb.settings_choices =
[
	{ name: 'safeMode', type: 'choice', choice1: 'Enabled', choice2: 'Disabled', defaultValue: 'Disabled', label: "Safe Mode (turn this on when this bots chat commands clash with another bot)" },
	{ name: 'triviaText', type: 'str', minLength: 3, defaultValue: "", label: "Trivia (separate lines with ;)" },
	{ name: 'movieName', type: 'str', minLength: 1, label: "Movie name" },
	{ name: 'interval', type: 'int', minValue: 1, defaultValue: 10, maxValue: 60, label: "Trivia posting interval (in minutes)" },
	{ name: 'random', type: 'choice', choice1: 'Enabled', choice2: 'Disabled', defaultValue: 'Disabled', label: "Post trivia in random order" },
	{ name: 'naming', type: 'choice', choice1: 'Enabled', choice2: 'Disabled', defaultValue: 'Enabled', label: "Give users who tip a name" },
	{ name: 'nameText', type: 'str', minLength: 3, defaultValue: "", label: "Movie names (separated with ;)", required: false },
	{ name: 'tipAmount', type: 'int', minValue: 1, defaultValue: 10, maxValue: 9999, label: "Minimum tip amount" }
];
	// { name: 'tipTriggered', type: 'choice', choice1: 'Enabled', choice2: 'Disabled', defaultValue: 'Disabled', label: "Unlock trivia through tips" },
	// { name: 'tipAmount', type: 'int', minValue: 5, defaultValue: 10, maxValue: 9999, label: "Amount to unlock" }
/* END */


/* Plugin */
var Plugin =
{
	// Variables
	settings: { safeMode: false, movieName: "", interval: 10, random: false, tipAmount: 10, naming: true }, /*, tipAmount: 10, tipTriggered: false*/
	trivia: [], // "Example text"
	names: [], // "Example M"
	userNames: [], // { name: "Example", movieName: "Example M" }
	moreInfo: {}, // "exampleField": "exampleValue"

	// Constants
	name: "Trivia",
	commandList:
	[
		{ command: "/help", description: "show all available commands." },
		{ command: "/showmodules", description: "show all available modules to turn on and off.", accessLevel: 2 },
		{ command: "/setmodule", parameters: "[on/off] [module_name]", description: "turn a module on or off.", accessLevel: 2 },
		{ command: "/showsettings", description: "show the current settings.", accessLevel: 2 },
		{ command: "/exportsettings", description: "returns a JSON string that can be imported on the next run.", accessLevel: 2 },
		{ command: "/importsettings", description: "import settings from a previously exported JSON string.", accessLevel: 2 },
		{ command: "/movieinfo", description: "show information about the movie.", accessLevel: 0 },
		{ command: "/moviename", description: "show the name of the movie.", accessLevel: 0 },
		{ command: "/postmoviename", description: "post the name of the movie to the room.", accessLevel: 1, toRoom: true },
		{ command: "/trivia", description: "show more trivia about this movie.", accessLevel: 0 },
		{ command: "/addinfo", parameters: "x: y", description: "add more info about this movie.", accessLevel: 2 },
		{ command: "/setinterval", parameters: "#", description: "set the interval at which trivia gets posted to # minutes.", accessLevel: 2 },
		{ command: "/setmoviename", parameters: "x", description: "set the movie name to x.", accessLevel: 2 }
	],
	moduleList:
	[
		{ module: "safeMode", description: "in safe mode, chat commands will be ignored unless they use a special modifier." },
		{ module: "random", description: "when turned on, the order in which messages are displayed is randomized." },
		{ module: "naming", description: "when turned on, users are given names from the movie based on tips." }
		// { module: "tipTriggered", description: "let users unlock trivia through tipping." }
	]
};

/* General functions */
/* processCommand - Plugin specific command processing */
/* Gets called from within the processCommand function in Bobomb when no matches were found */
/* Note: if both this function and the processNormalMessage function is not found, the messageHandler does not get set */
/* { command, description, module, parameter, variation, accessLevel, toRoom }, fullMessage, { name, accessLevel, gender } */
Plugin.processCommand = function(command, fullMessage, user)
{
	switch(command.command)
	{
		case "/movieinfo":
		{
			return Plugin.showMoreInfo();
		}
		case "/moviename":
		{
			return "Now playing: " + Plugin.settings.movieName;
		}
		case "/postmoviename":
		{
			return "Now playing: " + Plugin.settings.movieName;
		}
		case "/trivia":
		{
			return Plugin.showTrivia(true);
		}
		case "/addinfo":
		{
			var parts = fullMessage.split(" ");
			if(parts.length >= 2)
			{
				parts.shift();
				var joinStr = "";
				if(parts.length >= 2)
				{
					joinStr = " ";
				}
				parts = parts.join(joinStr);
				parts = parts.split(":");
				if(parts.length == 2)
				{
					Plugin.moreInfo[parts[0].trim()] = parts[1].trim();
					return "Info has been successfully added!";
				}
				return Bobomb.MessageManager.errorNotice("InvalidSyntax", command.command, "No valid key-value pair found!");
			}
			return Bobomb.MessageManager.errorNotice("InvalidSyntax", command.command, "No valid key-value pair found!");
		}
		case "/setinterval":
		{
			var newInterval = fullMessage.match(/[0-9]{1,2}/)[0];
			if(newInterval != null && isFinite(newInterval) && newInterval > 0 && newInterval <= 60)
			{
				Plugin.settings.interval = parseInt(newInterval);
				return "Interval has been set to " + newInterval + " minutes!";
			}
			return Bobomb.MessageManager.errorNotice("InvalidValues", command.command, "Interval isn't a valid number!");
		}
		case "/setmoviename":
		{
			var newName = fullMessage.split(" ");
			if(newName.length > 1)
			{
				newName.shift();
				newName = newName.join(" ");
				if(newName.length > 0 && newName != command.command)
				{
					Plugin.settings.movieName = newName;
					return "Movie name set to " + newName + "!";
				}
				return Bobomb.MessageManager.errorNotice("InvalidValues", command.command, "No valid name found!");
			}
			return Bobomb.MessageManager.errorNotice("InvalidSyntax", command.command, "No name found!");
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
	var uIndex = Bobomb.UserManager.findUserIndex(user.name, Plugin.userNames);
	if(uIndex != -1)
	{
		message = "[" + Plugin.userNames[uIndex].movieName + "] " + message;
	}
	return { message: message, colour: colour, font: font };
}

/* processTip - Plugin specific tip processing */
/* Gets called from within the tipHandler function in Bobomb */
/* Note: if this function is not found, the tipHandler does not get set */
/* amount, message, { name }, { name, hasTokens, isMod, tippedRecently, isFan, gender, accessLevel } */
Plugin.processTip = function(amount, message, toUser, fromUser)
{
	// For tip triggered mode and / or get a movie name mode
	if(Plugin.settings.naming && amount > Plugin.settings.tipAmount)
	{
		var index = Math.floor(Math.random() * Plugin.names.length);
		var uIndex = Bobomb.UserManager.findUserIndex(fromUser.name, Plugin.userNames);
		if(uIndex == -1)
		{
			Plugin.userNames.push({ name: fromUser.name, movieName: Plugin.names[index] });
		}
		else
		{
			Plugin.userNames[uIndex].movieName = Plugin.names[index];
		}
	}
}

/* showTrivia - format a trivia message */
Plugin.showTrivia = function(get)
{
	var baseString = "Trivia: ";
	var currentTrivia = Plugin.trivia[0];
	if(Plugin.settings.random || get)
	{
		var randomIndex = Math.floor(Math.random() * Plugin.trivia.length);
		currentTrivia = Plugin.trivia[randomIndex];
	}
	else
	{
		Plugin.trivia.push(Plugin.trivia.shift());
	}
	if(get)
	{
		return baseString + currentTrivia;
	}
	else
	{
		cb.chatNotice(baseString + currentTrivia);
	}
}

/* showMoreInfo - format more info */
Plugin.showMoreInfo = function()
{
	var output = "Movie info:\n";
	output += " Name: " + Plugin.settings.movieName + "\n";
	for(var info in Plugin.moreInfo)
	{
		output += " " + info + ": " + Plugin.moreInfo[info] + "\n";
	}
	return output;
}

/* postUpdate - periodic posting of information */
Plugin.postUpdate = function()
{
	Plugin.showTrivia(false);
	cb.chatNotice("To find out more about '" + Plugin.settings.movieName + "', use /movieinfo");
	cb.setTimeout(Plugin.postUpdate, (Plugin.settings.interval * 60000));
}

/* init - Plugin specific initiation */
/* Gets called from within the init function in Bobomb */
Plugin.init = function()
{
	if(cb.settings.triviaText != undefined)
	{
		if(cb.settings.triviaText.indexOf(";") != -1)
		{
			var parts = cb.settings.triviaText.split(";");
			for(var part in parts)
			{
				Plugin.trivia.push(parts[part].trim());
			}
		}
		else
		{
			Plugin.trivia.push(cb.settings.triviaText.trim());
		}
	}
	if(Plugin.settings.naming && cb.settings.nameText != undefined && cb.settings.nameText.length > 0)
	{
		if(cb.settings.nameText.indexOf(";") != -1)
		{
			var parts = cb.settings.nameText.split(";");
			for(var part in parts)
			{
				Plugin.names.push(parts[part].trim());
			}
		}
		else
		{
			Plugin.names.push(cb.settings.nameText.trim());
		}
	}
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
