// https://chaturbate.com/apps/user_uploads/3/bobomb/
// https://chaturbate.com/apps/sourcecode/tagger/?version=&slot=3

/**
 * Tagger
 *
 * Author: Bobomb
 * Version: 2.0
 * Last update: 12-01-2014
 *
 * Build on:
 * Framework version 5.5
 *	<PluginBase (version 3.0.0)>
 *	<Bobomb (version 4.8.1)>
 *
 * Usage:
 * Set the initial settings. The bot will now tag people who tipped the set amount
 * with the set tag.
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
 * /settipamount
 * /settag
 * /taguser
 * /untaguser
 *
 *
 * Change log:
 * -- 2.0 (12-01-2014) --
 *  > Framework version upgrade.
 *
 * -- 1.6 (10-07-2013) --
 *  > Fixed a bug with the commands.
 *  > Fixed a bug in the high tip module.
 *
 * -- 1.5 (10-06-2013) --
 *  > Updated to the latest framework version.
 *  > Added a module to only tag the highest tipper.
 *
 * -- 1.1 (28-05-2013) --
 *  > Initial release.
 *
 */

/* ChaturBate set-up */
cb.settings_choices =
[
	{ name: 'safeMode', type: 'choice', choice1: 'Enabled', choice2: 'Disabled', defaultValue: 'Disabled', label: "Safe Mode (turn this on when this bots chat commands clash with another bot)" },
	{ name: 'tag', type: 'str', minLength: 1, maxLength: 10, label: "The text to use as tag" },
	{ name: 'tipAmount', type: 'int', minValue: 0, defaultValue: 100, maxValue: 9999, label: "The minimum tip amount to get tagged" },
	{ name: 'highestOnly', type: 'choice', choice1: 'Enabled', choice2: 'Disabled', defaultValue: 'Disabled', label: "Only tag the highest tipper" }
];
/* END */


/* Plugin */
var Plugin =
{
	// Variables
	settings: { safeMode: false, tipAmount: 100, tag: "", highestOnly: false },
	taggedUsers: [], // { name: "example", tip: 100 }

	// Constants
	name: "Tagger",
	commandList:
	[
		{ command: "/help", description: "show all available commands.", accessLevel: 2 },
		{ command: "/showmodules", description: "show all available modules to turn on and off.", accessLevel: 2 },
		{ command: "/setmodule", parameters: "[on/off] [module_name]", description: "turn a module on or off.", accessLevel: 2 },
		{ command: "/showsettings", description: "show the current settings.", accessLevel: 2 },
		{ command: "/exportsettings", description: "returns a JSON string that can be imported on the next run.", accessLevel: 2 },
		{ command: "/importsettings", description: "import settings from a previously exported JSON string.", accessLevel: 2 },
		{ command: "/settipamount", parameters: "#", description: "set the minimum tip amount to get tagged", accessLevel: 2 },
		{ command: "/settag", parameters: "x", description: "set the text to be displayed as tag", accessLevel: 2 },
		{ command: "/taguser", parameters: "[user]", description: "manually tag an user", accessLevel: 2 },
		{ command: "/untaguser", parameters: "[user]", description: "manually untag an user", accessLevel: 2 }
	],
	moduleList:
	[
		{ module: "safeMode", description: "in safe mode, chat commands will be ignored unless they use a special modifier." },
		{ module: "highestOnly", description: "only tag the highest tipper" }
	]
};

/* General functions */
/* processCommand - Plugin specific command processing */
/* Gets called from within the processCommand function in Bobomb when no matches were found */
/* Note: if both this function and the processNormalMessage function is not found, the messageHandler does not get set */
/* { command, description, module, parameter, variation, accessLevel, toRoom }, fullMessage, { name, hasTokens, isMod, tippedRecently, isFan, gender, accessLevel, isBroadcaster, isInList(target) } */
Plugin.processCommand = function(command, fullMessage, user)
{
	switch(command.command)
	{
		case "/settipamount":
		{
			var newAmount = fullMessage.match(/[0-9]{1,4}/);
			if(newAmount !== null)
			{
				newAmount = newAmount[0];
				if(isFinite(newAmount) && newAmount >= 0)
				{
					if(newAmount > Plugin.settings.tipAmount)
					{
						for(var tipper in Plugin.taggedUsers)
						{
							if(Plugin.taggedUsers[tipper].tip < newAmount)
							{
								Plugin.taggedUsers.splice(tipper, 1);
							}
						}
					}
					Plugin.settings.tipAmount = parseInt(newAmount);
					return "Minimum tip amount has been set to " + newAmount + " tokens!";
				}
				return Bobomb.MessageManager.errorNotice("InvalidValues", command.command, "Tip amount is not a valid number!");
			}
			return Bobomb.MessageManager.errorNotice("InvalidSyntax", command.command, "No tip amount found!");
		}
		case "/settag":
		{
			var newMessage = fullMessage.split(command.command + " ");
			if(newMessage.length === 2)
			{
				newMessage = newMessage[1];
				if(newMessage.length > 0 && newMessage.length <= 10)
				{
					Plugin.settings.tag = newMessage;
					return "Message has been changed to '" + newMessage + "'!";
				}
				return Bobomb.MessageManager.errorNotice("InvalidValues", command.command, "Text is not of the correct length! A tag should be between 1 and 10 characters.");
			}
			return Bobomb.MessageManager.errorNotice("InvalidSyntax", command.command, "No text found!");
		}
		case "/taguser":
		{
			var newUser = fullMessage.split(" ");
			if(newUser.length === 2)
			{
				newUser = newUser[1].toLowerCase();
				if(newUser.length > 0)
				{
					if(newUser !== cb.room_slug)
					{
						Plugin.taggedUsers.push({ name: newUser, tip: Plugin.settings.tipAmount });
						cb.sendNotice("You've been tagged by " + cb.room_slug + "!", newUser);
						return newUser + " added to the tag list!";
					}
					return Bobomb.MessageManager.errorNotice("InvalidValues", command.command, "Can't tag yourself!");
				}
				return Bobomb.MessageManager.errorNotice("InvalidValues", command.command, "No user found!");
			}
			return Bobomb.MessageManager.errorNotice("InvalidSyntax", command.command, "No user found!");
		}
		case "/untaguser":
		{
			var newUser = fullMessage.split(" ");
			if(newUser.length === 2)
			{
				newUser = newUser[1].toLowerCase();
				var userIndex = Bobomb.UserManager.findUserIndex(newUser, Plugin.taggedUsers);
				if(userIndex !== -1)
				{
					Plugin.taggedUsers.splice(userIndex, 1);
					cb.sendNotice("You've been untagged by " + cb.room_slug + "!", newUser);
					return newUser + " has been removed from the tag list!";
				}
				return Bobomb.MessageManager.errorNotice("InvalidValues", command.command, "User not found!");
			}
			return Bobomb.MessageManager.errorNotice("InvalidSyntax", command.command, "No user found!");
		}
		default:
		{
			return "";
		}
	}
	return "";
};

/* processNormalMessage - Process messages that aren't commands */
/* Gets called from within the messageHandler function in Bobomb when the message does not seem to be a command */
/* Note: if both this function and the processCommand function is not found, the messageHandler does not get set */
/* message, colour, font, { name, hasTokens, isMod, tippedRecently, isFan, gender, accessLevel, isBroadcaster, isInList(target) } */
Plugin.processNormalMessage = function(message, colour, font, user)
{
	if(user.isInList(Plugin.taggedUsers))
	{
		message = "[" + Plugin.settings.tag + "] " + message;
	}
	return { message: message, colour: colour, font: font };
};

/* processTip - Plugin specific tip processing */
/* Gets called from within the tipHandler function in Bobomb */
/* Note: if this function is not found, the tipHandler does not get set */
/* amount, message, { name }, { name, hasTokens, isMod, tippedRecently, isFan, gender, accessLevel, isBroadcaster, isInList(target) } */
Plugin.processTip = function(amount, message, toUser, fromUser)
{
	if(Plugin.settings.highestOnly && Plugin.taggedUsers.length !== 0 && amount > Plugin.taggedUsers[0].tip && fromUser.name !== Plugin.taggedUsers[0].name)
	{
		Plugin.taggedUsers.splice(0, 1, { name: fromUser.name, tip: amount });
	}
	else if(amount >= Plugin.settings.tipAmount && !fromUser.isInList(Plugin.taggedUsers))
	{
		Plugin.taggedUsers.push({ name: fromUser.name, tip: amount });
	}
};


/**
 * Bobomb
 *
 * Author: Bobomb
 * Version: 4.8.1
 * Last update: 12-01-2014
 *
 * Bobomb's main module with generic functions to extend CB's functionality. Appended to the end of all apps and bots made by Bobomb.
 *
 * Change log:
 * -- 4.8.1 (12-01-2014) --
 *  > Switched from deprecated cb.chatNotice to cb.sendNotice.
 *  > Enhanced logging.
 *
 * -- 4.7.8 (07-08-2013) --
 *  > Adaptation to the latest cb API version, including styling of chat notices and enter / leave event handling.
 *  > Improved the translation of settings to include choices apart from boolean structures and splitting strings to an array.
 *  > Added a way for Plugins to extend the user object.
 *  > Improved the way the Bobomb part handles missing parts on the Plugin side.
 *  > Improvements to make the code more stable (and to make sure it stays stable).
 *  > Improvements to user / developer feedback. Added more documentation, more standard logging and more errors / warnings.
 *
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
	ErrorManager: {},

	// Constants
	positives: ["Enabled", "On", "Yes", "Enable", "True"],
	negatives: ["Disabled", "Off", "No", "Disable", "False"],
	delimiter: ";"
};


/* Settings Manager */
/* translateSetting */
/* Resolve a setting and see if there is a corresponding setting in the ChaturBate settings object */
Bobomb.SettingsManager.translateSetting = function(parentObject, settingName)
{
	// Base the primary action of the type of setting.
	if(parentObject[settingName].constructor === Object)
	{
		// If this is an object, we will want to look at it's children.
		for(var part in parentObject[settingName])
		{
			// Give every child some attention.
			Bobomb.SettingsManager.translateSetting(parentObject[settingName], part);
		}
	}
	else
	{
		// First, prepare the cb setting name.
		var cbSettingName = settingName;
		if(parentObject[settingName].constructor === Array)
		{
			// If it is an array, try to find a (string) setting in cb with [name]Text.
			if(settingName.search(/s$/) !== -1)
			{
				cbSettingName = settingName.substring(0, (settingName.length - 1));
			}
			cbSettingName += "Text";
		}
		// Make a quick log to the developer.
		Bobomb.devLog("Processing setting... (Plugin name: " + settingName + ", cb name: " + cbSettingName + ")");
		// Now check if there is such a field to be found.
		if(cb.settings[cbSettingName] !== undefined)
		{
			// If the type is array and the cb type is string, try to parse it.
			if(parentObject[settingName].constructor === Array && cb.settings[cbSettingName].constructor === String)
			{
				// If such a setting exists, split up the string using the delimiter.
				var parts = cb.settings[cbSettingName].split(Bobomb.delimiter);
				for(var part in parts)
				{
					// And add them to the array.
					parentObject[settingName].push(parts[part].trim());
				}
			}
			// Check the type of the target setting.
			else if(parentObject[settingName].constructor === Boolean)
			{
				// If it is a boolean, compare to the known positives and negatives.
				if(Bobomb.positives.indexOf(cb.settings[cbSettingName]) !== -1)
				{
					parentObject[settingName] = true;
				}
				else if(Bobomb.negatives.indexOf(cb.settings[cbSettingName]) !== -1)
				{
					parentObject[settingName] = false;
				}
				else
				{
					// If we don't recognize the value, abort abort abort.
					Bobomb.ErrorManager.errorHandler(new Bobomb.ErrorManager.ValueError("Setting " + settingName + " has an unknown value (" + cb.settings[cbSettingName] + ")! Please contact Bobomb with this information."));
				}
			}
			// Else, check if the types are alike.
			else if(parentObject[settingName].constructor === cb.settings[cbSettingName].constructor)
			{
				if(parentObject[settingName].constructor === String)
				{
					// If it is a string, simply set the value.
					parentObject[settingName] = cb.settings[cbSettingName];
				}
				else if(parentObject[settingName].constructor === Number)
				{
					// If it is a number, parse it as such and then set it.
					parentObject[settingName] = parseInt(cb.settings[cbSettingName]);
				}
			}
			else
			{
				// Apparently, these two fields with the same name can't be matched...
				Bobomb.ErrorManager.errorHandler(new TypeError("Type mismatch while translating " + settingName + "!"));
			}
		}
		else
		{
			// No corresponding field found for this value!
			Bobomb.devLog("No corresponding field found by " + Plugin.name + " for " + settingName + " in the cb.settings object!", true);
		}
	}
};

/* translateSettings */
/* Loop through all settings and check for a CB version of it */
Bobomb.SettingsManager.translateSettings = function()
{
	// Check each part in Plugin that is not a constant.
	for(var part in Plugin)
	{
		// And not a function either.
		if(Plugin[part].constructor !== Function)
		{
			// And feed it to the translator.
			Bobomb.SettingsManager.translateSetting(Plugin, part);
		}
	}
	// At the end, do a check to see if there is an import string to parse.
	if(cb.settings.importString !== undefined && cb.settings.importString.length > 0)
	{
		Bobomb.SettingsManager.importAll(cb.settings.importString);
	}
};

/* exportSetting */
/* Turn a setting in a JSON string */
/* Note: when calling this, don't forget to surround the result in curly brackets! */
Bobomb.SettingsManager.exportSetting = function(setting)
{
	// Log which setting we are exporting.
	Bobomb.devLog("Exporting setting " + setting + "...");
	// Exporting to JSON is as simple as returning a string in the right format.
	return '"' + setting + '":' + JSON.stringify(Plugin[setting]);
};

/* exportAll */
/* Loop through all settings and prepare them for export */
/* Returns: A JSON string containing all settings */
Bobomb.SettingsManager.exportAll = function()
{
	// Build the export string.
	var string = "";
	for(var part in Plugin)
	{
		// For every non constant part of Plugin that isn't a function either.
		if(Plugin[part].constructor !== Function)
		{
			// If there is already content in the string, separate the new content from it with a comma.
			if(string.length > 0)
			{
				string += ",";
			}
			// Add it to the string.
			string += Bobomb.SettingsManager.exportSetting(part);
		}
	}
	// Return it with extra brackets.
	return "{" + string + "}";
};

/* importSetting */
/* Set a given setting to the value (if any) contained in the given importObject */
Bobomb.SettingsManager.importSetting = function(importObject, setting)
{
	// Log which setting we are attempting to import.
	Bobomb.devLog("Attempting to import setting " + setting + "...");
	// If the given object has a value for this setting and the Plugin has this setting as well, assign the values.
	if(importObject[setting] !== undefined && Plugin[setting] !== undefined)
	{
		Plugin[setting] = importObject[setting];
	}
};

/* importAll */
/* Parse the given JSON string and loop through all settings to pass them the imported values */
/* Returns: a string message informing the caller of success or failure */
Bobomb.SettingsManager.importAll = function(importString)
{
	// Clean the import string, expect people to accidentally copy the notice text when exporting.
	if(importString.search(/^[A-Z]?[a-z]*:/) !== -1)
	{
		importString = importString.substring(importString.indexOf("{"));
	}
	// Try to parse the string. Remember kids, always use protection: try to catch any errors that get thrown at us by the parser.
	try
	{
		// Get the import object by parsing the string.
		var importObject = JSON.parse(importString);
		// Check every setting in Plugin. Do it this way to automatically reject unknown content in import object.
		for(var part in Plugin)
		{
			// For every part in Plugin that is not a constant nor a function, try to import that part out of the importObject.
			if(Plugin[part].constructor !== Function)
			{
				Bobomb.SettingsManager.importSetting(importObject, part);
			}
		}
		return "Import successfull!";
	}
	catch(e)
	{
		// Successful catch! Now notify the user and return.
		Bobomb.ErrorManager.errorHandler(e);
	}
	return "Import failed!";
};
/* END */


/* Message Manager */
/* makeList */
/* This function is used to create the list of commands and modules */
/* Returns: a string containing all entries from a given list for a given user */
Bobomb.MessageManager.makeList = function(fromList, user)
{
	// Output string which will be filled hereafter and then returned.
	var output = "";
	// Check which known type of list we are dealing with.
	if(fromList === Plugin.commandList)
	{
		// First, make a header including the Plugin name so people know which commands they are looking at.
		output += "Commands for " + Plugin.name + ": \n";
		// Now build up the actual list of commands in this string. Do it this way because we can't be certain the first command is always added.
		var restOfOutput = "";
		for(var i = 0; i < Plugin.commandList.length; i++)
		{
			// For each string, check if the command should be displayed. Cases in which it shouldn't: it is linked to a module that isn't turned on or the users accessLevel is to low.
			if(Bobomb.UserManager.isAllowedToCall(Plugin.commandList[i], user, true))
			{
				// Insert new lines when needed.
				if(restOfOutput.length > 0)
				{
					restOfOutput += "\n";
				}
				// Add the actual command.
				restOfOutput += Plugin.commandList[i].command;
				// If there are parameters, add them.
				if(Plugin.commandList[i].parameters !== undefined)
				{
					restOfOutput += " " + Plugin.commandList[i].parameters;
				}
				// Add the description next, separating it with a pipeline ( | )
				restOfOutput += " | " + Plugin.commandList[i].description;
				// If there is a variation, build it up as well. (no need to check for parameters here, there wouldn't be a variation if there were no parameters)
				if(Plugin.commandList[i].variation !== undefined)
				{
					restOfOutput += "\n" + Plugin.commandList[i].command + " " + Plugin.commandList[i].parameters + " " + Plugin.commandList[i].variation + " | " + Plugin.commandList[i].description;
				}
			}
		}
		// Now inform the user of the modifiers it can use with the commands.
		var modifiers = "\nBy adding !private to a command, the return message will always be hidden from the room.";
		// If the Plugin is running in safe mode, there is a modifier to implicitly listen to the command, else there is a modifier to make it ignore the command.
		if(Plugin.settings.safeMode)
		{
			modifiers += "\nBy adding !" + Plugin.name.toLowerCase() + " to a command, the command is intercepted by this bot.";
		}
		else
		{
			modifiers += "\nBy adding !" + Plugin.name.toLowerCase() + "-ignore to a command, this bot will not respond to the command.";
		}
		// Now build up the complete output.
		output = output + restOfOutput + modifiers;
	}
	else if(fromList === Plugin.moduleList)
	{
		// First, make a header including the Plugin name so people know which commands they are looking at.
		output += "Modules for " + Plugin.name + ": \n";
		// Now loop through all modules in the list.
		for(var i = 0; i < Plugin.moduleList.length; i++)
		{
			// Insert new lines when needed.
			if(i !== 0)
			{
				output += "\n";
			}
			// Now add modules name and the description, separated by a pipeline ( | ).
			output += Plugin.moduleList[i].module + " | " + Plugin.moduleList[i].description;
		}
	}
	else
	{
		// Seems we don't know what type of list is given, notify the user.
		Bobomb.ErrorManager.errorHandler(new Bobomb.ErrorManager.ValueError("Unknown list type given!"));
	}
	// Return the build up output.
	return output;
};

/* getCommandInfo */
/* This function retrieves all information about the given command */
/* Returns: { command, description, module, parameter, variation, accessLevel, toRoom } (or null)*/
Bobomb.MessageManager.getCommandInfo = function(command)
{
	// Try to find the command.
	for(var commandIndex in Plugin.commandList)
	{
		if(Plugin.commandList[commandIndex].command === command.toLowerCase())
		{
			// When found, return the object.
			return Plugin.commandList[commandIndex];
		}
	}
	// When not found, return null.
	return null;
};

/* errorNotice */
/* DEPRECATED - Please use the all new ErrorManager functions! */
Bobomb.MessageManager.errorNotice = function(type, commandName, customMessage)
{
	// Tell all who are listening that they should use something else!
	Bobomb.devLog("Using deprecated function Bobomb.MessageManager.errorNotice! Please use the all new ErrorManager functions!");
	// Reroute to the new function.
	return Bobomb.ErrorManager.errorNotice(type, commandName, customMessage);
};

/* processCommand */
/* This function checks if the call to the matched command is legit and gives the implementation for the standard commands */
/* If the call is legit and it is not a standard command, the Plugin specific version of processCommand is called */
Bobomb.MessageManager.processCommand = function(command, fullMessage, user)
{
	// First, find out if the given command even exists and check if we are allowed to use it.
	if(Bobomb.UserManager.isAllowedToCall(command, user))
	{
		// Use a switch to check for every possible command.
		switch(command.command)
		{
			case "/help":
			{
				// Return a formatted representation of the list of commands.
				return Bobomb.MessageManager.makeList(Plugin.commandList, user);
			}
			case "/showsettings":
			{
				// Return an overview of all the settings in Plugin. Note: this doesn't return an overview of any arrays or objects outside of settings.
				var output = "Current settings:";
				for(var setting in Plugin.settings)
				{
					output += "\n" + setting + ": " + Plugin.settings[setting];
				}
				return output;
			}
			case "/showmodules":
			{
				// Return a formatted representation of the list of modules.
				if(Plugin.moduleList !== undefined)
				{
					return Bobomb.MessageManager.makeList(Plugin.moduleList, user);
				}
				return "No modules found!";
			}
			case "/setmodule":
			{
				// Check if there are any modules to be set in the first place.
				if(Plugin.moduleList !== undefined)
				{
					// Find out if the module has to be turned on or off. Add the extra spacing to make sure messages that have this word at the end are found properly.
					var action = null;
					if(fullMessage.concat(" ").indexOf(" on ") !== -1)
					{
						action = true;
					}
					else if(fullMessage.concat(" ").indexOf(" off ") !== -1)
					{
						action = false;
					}
					// Check if we found an action.
					if(action !== null)
					{
						// Now that we know what to do with the module, find out which one we are looking for.
						for(var i = 0; i < Plugin.moduleList.length; i++)
						{
							var name = Plugin.moduleList[i].module;
							if(fullMessage.indexOf(name) !== -1)
							{
								// When found, set it to the action and let the user know what we did with it.
								Plugin.settings[name] = action;
								return name.charAt(0).toUpperCase() + name.substr(1) + " turned " + (action ? "on" : "off") + "!";
							}
						}
						return Bobomb.ErrorManager.errorNotice("InvalidValues", command.command, "Unknown module!");
					}
					return Bobomb.ErrorManager.errorNotice("InvalidSyntax", command.command, "Action (on/off) not specified!");
				}
				return "";
			}
			case "/exportsettings":
			{
				// Return an export of everything in Plugin.
				return Bobomb.SettingsManager.exportAll();
			}
			case "/importsettings":
			{
				// Try to import the given string.
				return Bobomb.SettingsManager.importAll(fullMessage.slice(15));
			}
			default:
			{
				// If all else fails, try to see if the Plugin has any commands.
				try
				{
					return Plugin.processCommand(command, fullMessage, user);
				}
				catch(e)
				{
					// Let the user know they failed to implement a core function.
					Bobomb.ErrorManager.errorHandler(e);
				}
			}
		}
	}
	// Return an empty string to let the messageHandler know there is no output.
	return "";
};

/* messageHandler */
/* Invoked for each message. Calls the appropriate function for the type of message */
Bobomb.MessageManager.messageHandler = function(message)
{
	// Get the command part of the message.
	var command = message['m'].match(/^\/[A-z]+/);
	// Check if a command has been found.
	if(command !== null)
	{
		// Now check if the command should be ignored or not.
		Bobomb.devLog("Command " + command + " found! Processing...");
		if((!Plugin.settings.safeMode || message['m'].indexOf("!" + Plugin.name.toLowerCase()) !== -1) && message['m'].indexOf("!" + Plugin.name.toLowerCase() + "-ignore") === -1)
		{
			// Now check if this command is actually recognized and get the full command object.
			command = Bobomb.MessageManager.getCommandInfo(command[0]);
			if(command !== null)
			{
				// Recognized the given command! Now process it and get the output.
				Bobomb.devLog("Command " + command.command + " recognized by " + Plugin.name + ", taking action...");
				var returnMessage = Bobomb.MessageManager.processCommand(command, message.m, Bobomb.UserManager.makeUserObject(message));
				// Check if there is any output. If not, don't send out a notice.
				if(returnMessage.length > 0)
				{
					// Now check if the return message should be posted to the room or not.
					if(message.m.indexOf("!private") === -1 && command.toRoom)
					{
						cb.sendNotice(returnMessage);
					}
					else
					{
						cb.sendNotice(returnMessage + "\n(Not shown to room)", message.user);
					}
					// Add a string to message saying it has been intercepted and set the X-Spam to true. This is to let users know something has been done with it by this bot.
					message.m += " (intercepted as command by " + Plugin.name + ")";
					message['X-Spam'] = true;
				}
			}
		}
		else
		{
			// Log the fact that we are ignoring this.
			Bobomb.devLog("Ignoring command " + command + "!");
		}
	}
	else if(Plugin.processNormalMessage !== undefined)
	{
		// If this is not a command, process it as a normal message.
		// Note that a command means any message starting with a slash ( / ) and some text. This is done to prevent any other apps and bots ignoring the text because of any modifications made.
		var returnObject = Plugin.processNormalMessage(message.m, message.c, message.f, Bobomb.UserManager.makeUserObject(message));
		// Set the returned values to the original message.
		message.m = returnObject.message;
		message.c = returnObject.colour;
		message.f = returnObject.font;
	}
	// Return the message at all times.
	return message;
};

/* enterHandler */
/* Invoked for each person entering the chatroom. Calls the Plugin's processEnter function */
Bobomb.MessageManager.enterHandler = function(user)
{
	Plugin.processEnter(Bobomb.UserManager.makeUserObject(user));
};

/* leaveHandler */
/* Invoked for each person leaving the chatroom. Calls the Plugin's processLeave function */
Bobomb.MessageManager.leaveHandler = function(user)
{
	Plugin.processLeave(Bobomb.UserManager.makeUserObject(user));
};
/* END */


/* Tip Manager */
/* tipHandler */
/* Invoked for each tip. Calls the Plugin's processTip function */
Bobomb.TipManager.tipHandler = function(tip)
{
	// Simply call the Plugin's function.
	Plugin.processTip(tip.amount, tip.message, { name: tip.to_user }, Bobomb.UserManager.makeUserObject(tip));
};
/* END */


/* User Manager */
/* makeUserObject */
/* Create a standardized user object out of a given source object */
/* Returns: { name, hasTokens, isMod, tippedRecently, isFan, gender, accessLevel } */
Bobomb.UserManager.makeUserObject = function(sourceObject)
{
	// Begin by making a variable to store the future object.
	var returnObject = {};
	// Check if the source object is from a tip function or not. If it is, use a prefix to find the fields.
	var prefix = "";
	if(sourceObject.amount !== undefined)
	{
		prefix = "from_user";
	}
	// Now loop through the fields in the given field map and add them to the object.
	for(var field in [["is_mod", "isMod"], ["has_tokens", "hasTokens"], ["tipped_recently", "tippedRecently"], ["in_fanclub", "isFan"], ["gender", "gender"]])
	{
		returnObject[field[1]] = sourceObject[prefix + field[0]];
	}
	returnObject.name = sourceObject.user || sourceObject.from_user;
	// Now that we have the basic fields, add our custom fields.
	returnObject.isBroadcaster = (returnObject.name === cb.room_slug);
	returnObject.accessLevel = ((returnObject.name === cb.room_slug) ? 2 : (returnObject.isMod) ? 1 : 0);
	returnObject.isInList = function(target) { return (Bobomb.UserManager.findUserIndex(returnObject, target) !== -1); };
	// If there is an extension function in Plugin, call it.
	if(Plugin.extendUserObject !== undefined)
	{
		returnObject = Plugin.extendUserObject(returnObject);
	}
	// Now freeze and return it.
	return Object.freeze(returnObject);
};

/* isUserInList */
/* DEPRECATED - Use the one build into the user object! */
/* This function is used to determine if an user is in a given list */
/* Note: it is assumed that all lists containing users are arrays of objects with a key/value pair called name to contain the name of a user */
/* Returns: a boolean value */
Bobomb.UserManager.isUserInList = function(user, target)
{
	// Tell all who are listening that they should use something else!
	Bobomb.devLog("Using deprecated function Bobomb.UserManager.isUserInList! Please use the all functions in the user object!");
	return (Bobomb.UserManager.findUserIndex(user, target) !== -1);
};

/* findUserIndex */
/* This function is used to get the index of a given user in a given list */
/* Note: it is assumed that all lists containing users are arrays of objects with a key/value pair called name to contain the name of a user */
/* Returns: the numeric index of the user in the target list (or -1) */
Bobomb.UserManager.findUserIndex = function(user, target)
{
	// Check if the target constructor is an array.
	if(target.constructor === Array)
	{
		// Check if the array isn't empty.
		if(target.length > 0)
		{
			// Loop through the list and find the name.
			for(var i = 0; i < target.length; i++)
			{
				if(target[i].name === (user.name || user))
				{
					// When found, return the index.
					return i;
				}
			}
		}
		// When not found, return -1.
		return -1;
	}
	return Bobomb.ErrorManager.errorHandler(new TypeError("Target is not an array!"));
};

/* getAccessLevel */
/* DEPRECATED - This is now done only inside an user object.
/* This function is used to retrieve the access level of a given user */
/* Returns: an integer representing the users access level */
Bobomb.UserManager.getAccessLevel = function(user)
{
	// Tell all who are listening that they should use something else!
	Bobomb.devLog("Using deprecated function Bobomb.UserManager.isUserInList! Please use the all functions in the user object!");
	return (Bobomb.UserManager.findUserIndex(user, target) !== -1);
};

/* isAllowedToCall */
/* Check if the command can be used by this user */
Bobomb.UserManager.isAllowedToCall = function(command, user, notInvoked)
{
	// Check if this command has any module associated with it and if so, if it is turned on.
	if(command.module === undefined || Plugin.settings[command.module])
	{
		// Check if this command has an access level requirement and if so, if the user has a high enough access level.
		if(command.accessLevel === undefined || user.accessLevel >= command.accessLevel)
		{
			return true;
		}
		else if(notInvoked === undefined)
		{
			// Unauthorized use of command!
			Bobomb.devLog("User " + user.name + " tried to use command " + command.command + ", but his access level is to low (" + user.accessLevel + " instead of " + command.accessLevel + ")", true);
		}
	}
	else if(notInvoked === undefined)
	{
		// Unable to use command! Throw an error.
		Bobomb.ErrorManager.errorHandler(new Error("Unable to use command " + command.name + "! Module " + command.module + " is not turned on! (invoked by user " + user.name + ")"));
	}
	return false;
};
/* END */

/* Error Manager */
/* ValueError */
/* Use this error for value related errors */
Bobomb.ErrorManager.ValueError = function(message)
{
	this.message = "Invalid values found! " + (message || "");
};
Bobomb.ErrorManager.ValueError.prototype = new Error();
Bobomb.ErrorManager.ValueError.prototype.constructor = Bobomb.ErrorManager.ValueError;
Bobomb.ErrorManager.ValueError.prototype.name = "ValueError";
Bobomb.ErrorManager.ValueError.prototype.stack = Error().stack;

/* SyntaxError */
/* Use this error for syntax related errors */
Bobomb.ErrorManager.SyntaxError = function(message)
{
	this.message = "Invalid syntax found! " + (message || "");
};
Bobomb.ErrorManager.SyntaxError.prototype = new Error();
Bobomb.ErrorManager.SyntaxError.prototype.constructor = Bobomb.ErrorManager.SyntaxError;
Bobomb.ErrorManager.SyntaxError.prototype.name = "SyntaxError";
Bobomb.ErrorManager.SyntaxError.prototype.stack = Error().stack;

/* errorHandler */
/* Send a chat notice to the room owner about the given error or throw it if we are in test mode or forced to */
Bobomb.ErrorManager.errorHandler = function(error, get, forceThrow)
{
	// If we are in test mode or the parameter forceThrow is true, throw the error.
	if(Bobomb.TestManager !== undefined || forceThrow !== undefined)
	{
		throw error;
	}
	else if(get)
	{
		// If get is true, return the message instead of posting it.
		return error.toString();
	}
	else
	{
		// Log the stack trace and post a notice about the error to the room owner.
		Bobomb.devLog(error.stack, true);
		cb.sendNotice(error.toString(), cb.room_slug);
	}
};

/* errorNotice */
/* Make a big deal about something that happened */
/* Give a type, an commandName and a message and this function will pass an error to the error handler */
Bobomb.ErrorManager.errorNotice = function(type, commandName, customMessage)
{
	// Make sure the parameter has a value.
	customMessage = (customMessage || "");
	// Use a switch to find out what to do for this type of error.
	switch(type)
	{
		case "InvalidValues":
		{
			return Bobomb.ErrorManager.errorHandler(new Bobomb.ErrorManager.ValueError(customMessage + " For command " + commandName + ""), true);
		}
		case "InvalidSyntax":
		{
			return Bobomb.ErrorManager.errorHandler(new Bobomb.ErrorManager.SyntaxError(customMessage + " For command " + commandName + ""), true);
		}
		default:
		{
			Bobomb.ErrorManager.errorHandler(new Error("An error occured while processing an error! (type mismatch for type '" + type + "', original message: " + customMessage + " triggered by command " + commandName));
			break;
		}
	}
	// Return an empty string if we reach the end.
	return "";
};
/* END */


/* General functions */
/* safetyCheck */
/* Does a quick check of the Plugin side to make sure everything is there */
Bobomb.safetyCheck = function()
{
	try
	{
		// If the devMode is turned on, perform a quick shakedown on core parts of the system.
		if(Bobomb.TestManager !== undefined)
		{
			Bobomb.devLog("Checking Plugin:");
			Bobomb.devLog("\n" + Plugin);
			Bobomb.devLog("\n" + Plugin.name);
			Bobomb.devLog("\n" + Plugin.commandList);
			Bobomb.devLog("\n" + Plugin.moduleList);
			Bobomb.devLog("\n" + Plugin.settings);
		}
	}
	catch(e)
	{
		Bobomb.ErrorManager.errorHandler(e, false, true);
	}
};

/* devLog */
/* Sends out a log statement if appropiate */
Bobomb.devLog = function(message, force)
{
	if(Bobomb.TestManager !== undefined || force !== undefined)
	{
		cb.log("[" + Plugin.name + "] " + message);
	}
};

/* init */
/* Initializes the basic parts of the framework */
Bobomb.init = function()
{
	// Before doing anything, make a safety check!
	Bobomb.safetyCheck();
	// Make the Plugin constants actual constants and seal the object!
	Object.defineProperty(Plugin, "name", { enumerable: false, configurable: false, writable: false, value: Plugin.name });
	Object.defineProperty(Plugin, "commandList", { enumerable: false, configurable: false, writable: false, value: Plugin.commandList });
	Object.defineProperty(Plugin, "moduleList", { enumerable: false, configurable: false, writable: false, value: Plugin.moduleList });
	Plugin = Object.seal(Plugin);
	// Freeze the Bobomb object!
	Bobomb = Object.freeze(Bobomb);
	// Start the translation.
	Bobomb.SettingsManager.translateSettings();
	// Check needed functionality.
	if(Plugin.processCommand !== undefined || Plugin.processNormalMessage !== undefined)
	{
		cb.onMessage(Bobomb.MessageManager.messageHandler);
		Bobomb.devLog("Activated message handler!");
	}
	if(Plugin.processEnter !== undefined)
	{
		cb.onEnter(Bobomb.MessageManager.enterHandler);
		Bobomb.devLog("Activated enter handler!");
	}
	if(Plugin.processLeave !== undefined)
	{
		cb.onLeave(Bobomb.MessageManager.leaveHandler);
		Bobomb.devLog("Activated leave handler!");
	}
	if(Plugin.processTip !== undefined)
	{
		cb.onTip(Bobomb.TipManager.tipHandler);
		Bobomb.devLog("Activated tip handler!");
	}
	if(Plugin.init !== undefined)
	{
		Plugin.init();
	}
	Bobomb.devLog(Plugin.name + " has been fully initialized!");
};
/* END */


Bobomb.init();
