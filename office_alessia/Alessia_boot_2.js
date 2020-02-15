// https://chaturbate.com/apps/user_uploads/2/office_alessia/
// https://chaturbate.com/apps/sourcecode/alessia-boot-2/?version=&slot=2

//  Title: Token Raffle
//  Author: Langerz30 - Copyright Joshua Langley 2012, Crazycharlie 2013 (Ticket Price).
//  Version: 2.1 (26/07/13)
//  Description: Raffle Ticket Application
//  Based on: Tip Goal - Copyright Chaturbate 2012.

/*jslint passfail: false, continue: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true */

//var cb;
var COMMAND_INFO = '!i';
var COMMAND_WINNERS = '!w';
var COMMAND_HELP = '!help';
var COMMAND_SET_TIME = '!time';
var COMMAND_ADD_PRIZE = '!prize';
var COMMAND_DRAW_WINNERS = '!draw';


// vars
var g_ticket_sold = 0;
var g_ticket_array = [];
var g_is_winners = false;
var g_winners = []; // global because of delayed show winner.
var g_cost_label;
var g_prizes = [];

// vars timer
var g_start_time = new Date().getTime();
var g_mins_left = 0;


// UTILITY FUNCTIONS
/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Gets a bunch of random unique numbers specified within the range.
 */
function getUniqueNumbers (count, min, max)
{
    var arr = [], i, randomnumber, found;
    while(arr.length < count){
        randomnumber = getRandomInt(min, max);
        found = false;
        for(i=0;i<arr.length;i++)
        {
            if(arr[i]==randomnumber)
            {
                found = true;
                break;
            }
        }
        if(!found)
        {
            arr[arr.length] = randomnumber;
        }
    }
    return arr;
}
// END UTILITY FUNCTIONS.

function displayHelpSummary()
{
	return 'Type ' + COMMAND_HELP + ' -- for more info on Performer commands.';
}

// DISPLAY FUNCTIONS
function displayHelp()
{
	// Display Help.
	return 'Performers use can use the following options:\n' +
		COMMAND_SET_TIME + ' (minutes) -- to set a new time.\n' +
		COMMAND_ADD_PRIZE + ' (prize) -- to set a new prize.\n' +
		COMMAND_DRAW_WINNERS + ' -- To end the raffle and draw early.';
}

function displayRules()
{
    // Build Rules Message.
    var msg = 'RAFFLE TICKET RULES\n' + g_cost_label;

    if (cb.settings.user_win_many == 'No')
    {
        msg += '\nOne User can win only One Prize.';
    }
    var max_tickets = cb.settings.max_tickets;
    if (max_tickets > 0)
    {
        msg += '\nEach User can only purchase a maximum of ' + max_tickets + ' tickets. Extra tokens tipped will be deducted as normal.';
    }
    return msg;
}

function displayPrizes()
{
    var i;
    // Build Prizes Message.
    var msg = 'RAFFLE TICKET PRIZES:';
    for (i=0; i < g_prizes.length; ++i)
    {
        msg += '\n' + (i+1) + '. ' + g_prizes[i] + '.';
    }
    return msg;
}

function displayWinners()
{
    // Build Winners Message.
    var msg;
    if (g_winners.length == 0)
    {
        msg = 'There are no Winners for this raffle.';
        return msg;
    }

    var winner, a;
    msg = 'The Winners of the raffle are:';
    for (a=0; a < g_winners.length; a++)
    {
        winner = g_winners[a];
        msg += '\nPrize ' + (a+1) + '. ' + winner.username + ' (Ticket ' + winner.number + ')' + ' wins a ' + g_prizes[a] + '.';
    }
    return msg;
}

// END DISPLAY FUNCTIONS.

// RAFFLE FUNCTIONS

// Show Rules.
function showRules()
{
    if (g_is_winners == true)
    {
        return;
    }

    cb.chatNotice(displayRules() + '\n' + displayPrizes());
    cb.setTimeout(showRules, 300000);
}

// Count of the users tickets.
function countUserTickets(username)
{
    var ticket_count, i;
	if (g_ticket_array.length == 0)
    {
        return 0;
    }

    ticket_count = 0;
    for (i=0; i < g_ticket_array.length; ++i)
    {
        if (username == g_ticket_array[i].username)
        {
            ++ticket_count;
        }
    }
    return ticket_count;
}

// Add tickets to the ticket array.
function addTicket(tip_index, username, amount)
{
    // to clip tips that overflow the token amount.
    var overflow = tip_index + amount - cb.settings.tickets;
    if (overflow > 0)
    {
        amount -= overflow;
    }

    if (amount == 1)
    {
        cb.chatNotice(username + " received Ticket " + (tip_index+1) + ".");
    }
    else
    {
        cb.chatNotice(username + " received Tickets " + (tip_index+1) + "-" + (tip_index+amount) + ".");
    }

    var index, ticket, i;
    for (i=0; i < amount; ++i)
    {
        index = (tip_index + i);
        ticket = {username: username, number: (index+1) };
        g_ticket_array[index] = ticket;
    }
}

// Removes the tickets belong to a username.
function removeTicketsByUser(tickets, username)
{
    var i=0;
    while(i < tickets.length)
    {
        if (username == tickets[i].username)
        {
            tickets.splice(i, 1);
        }
        else
        {
            ++i;
        }
    }
}


// Generate the Winners of the raffle.
function getWinners()
{
    if (g_ticket_array.length == 0)
    {
        return [];
    }

    var l_winners = [];
    var draw_amount = g_prizes.length;
    var raffle_num, ticket, draw;

    if (cb.settings.user_win_many == 'No')
    {
        var l_g_ticket_array = g_ticket_array.slice();
        for (draw=0; draw < draw_amount; ++draw)
        {
            // No tickets left so abort.
            if (l_g_ticket_array.length == 0)
            {
                break;
            }

            // Get a raffle ticket index.
            if (l_g_ticket_array.length == 1)
            {
                raffle_num = 0;
            }
            else
            {
                raffle_num = getRandomInt (0, (l_g_ticket_array.length - 1));
            }

            ticket = l_g_ticket_array[raffle_num];
            l_winners.push(ticket);

            // Remove all the winners other tickets.
            removeTicketsByUser(l_g_ticket_array, ticket.username);
        }
    }
    else
    {
        // Get the raffle number indexes.
        var raffle_numbers = getUniqueNumbers(draw_amount, 0, (g_ticket_sold - 1));

        for (draw=0; draw < draw_amount; ++draw)
        {
            raffle_num = raffle_numbers[draw];

            ticket = g_ticket_array[raffle_num];
            l_winners.push(ticket);
        }
    }
    return l_winners;
}


function buildPrizes()
{
    var i, prize;
    
    // Build the Secret array.
    for(i=0; i < 10; ++i)
    {
        prize = cb.settings['prize_' + i];
        if (prize == '')
        {
            continue;
        }
        g_prizes.push(prize);
    }
}

// END RAFFLE FUNCTIONS.


// START HELPER FUNCTIONS

// Draw the Winners.
function drawWinners() {
    // Get the winners of the raffle.
    cb.chatNotice("Raffle Closed - Drawing the winning tickets...");
    g_winners = getWinners();

    cb.chatNotice(displayWinners());
    g_is_winners = true;
    cb.drawPanel();
}

// The amount of tickets remaining.
function tickets_remaining() {
    var r = cb.settings.tickets - g_ticket_sold;
    return (r < 0) ? 0 : r;
}

// Update the room subject.
function update_subject() {
    var new_subject = "Raffle: " + cb.settings.goal_description +
        " For Info type !i, Winners !w [" + tickets_remaining() + " Tickets remaining]";

    //cb.log(new_subject);
    cb.changeRoomSubject(new_subject);
}

// Returns the time left in minutes as a string.
function getTimeLeft()
{
    if (g_mins_left == 0)
    {
        return 'No time';
    }

    return g_mins_left + ((g_mins_left > 1) ? ' minutes' : ' minute');
}

// END HELPER FUNCTIONS.

// CHATURBATE VARIABLES
// Performers Choice Settings.
cb.settings_choices = [
    {name: 'goal_description', label: 'Raffle Description', type: 'str', minLength: 1, maxLength: 255, defaultValue: 'I am running a Raffle.'},
    {name: 'tickets', label: 'Amount of Tickets (max 1,000)', type: 'int', minValue: 1, maxValue: 1000, defaultValue: 200},
    {name: 'ticket_price', label: 'Cost of Tickets', type: 'int', minValue: 1, maxValue: 1000, defaultValue: 1},    

    {name: 'user_win_many', label: 'Can Users win several Prizes?', type: 'choice', choice1: 'Yes', choice2: 'No', defaultValue: 'No'},
    {name: 'draw_minutes', label: 'Time Limit (Minutes, 0 = No Time Limit)', type: 'int', defaultValue: 0, minValue: 0, maxValue: 10080},
    {name: 'max_tickets', label: 'Maximum Tickets per User (0 = No Maximum Limit)', type: 'int', minValue: 0, defaultValue: 0},

    {name: 'prize_0', label: 'Prize 1', type: 'str', minLength: 1, maxLength: 64},
    {name: 'prize_1', label: 'Prize 2', type: 'str', minLength: 1, maxLength: 64, required: false},
    {name: 'prize_2', label: 'Prize 3', type: 'str', minLength: 1, maxLength: 64, required: false},
    {name: 'prize_3', label: 'Prize 4', type: 'str', minLength: 1, maxLength: 64, required: false},
    {name: 'prize_4', label: 'Prize 5', type: 'str', minLength: 1, maxLength: 64, required: false},
    {name: 'prize_5', label: 'Prize 6', type: 'str', minLength: 1, maxLength: 64, required: false},
    {name: 'prize_6', label: 'Prize 7', type: 'str', minLength: 1, maxLength: 64, required: false},
    {name: 'prize_7', label: 'Prize 8', type: 'str', minLength: 1, maxLength: 64, required: false},
    {name: 'prize_8', label: 'Prize 9', type: 'str', minLength: 1, maxLength: 64, required: false},
    {name: 'prize_9', label: 'Prize 10', type: 'str', minLength: 1, maxLength: 64, required: false}
];

// START CHATURBATE HANDLER FUNCTIONS.
// On a persons Tip.
cb.onTip(function(tip)
{
    if (g_is_winners == true)
    {
        cb.chatNotice('Raffle is Closed.', tip.from_user);
        return;
    }

    var ticket_purchase = Math.floor(tip.amount / cb.settings.ticket_price);
    if (ticket_purchase == 0) 
    {
        cb.chatNotice(g_cost_label, tip.from_user);
        return;
    }

    // Enforces a limit on how many tickets a person can get.
    var max_tickets = cb.settings.max_tickets;
    if (max_tickets > 0)
    {
        var user_tickets = countUserTickets( tip.from_user);
        if ((user_tickets + ticket_purchase) > max_tickets )
        {
            ticket_purchase = max_tickets - user_tickets;
            if (ticket_purchase == 0)
            {
                cb.chatNotice('You have purchased the maximum amount of Tickets.', tip.from_user);
                return;
            }
        }
    }

    // Add the Tickets to the array.
    addTicket(g_ticket_sold, tip.from_user, ticket_purchase);

    g_ticket_sold += ticket_purchase;
    if (g_ticket_sold >= cb.settings.tickets) {
        g_ticket_sold = cb.settings.tickets;

        // If there is no timer then draw winners as per normal.
        drawWinners();
    }

    update_subject();
    cb.drawPanel();
});

// Re-Draw the Panel.
cb.onDrawPanel(function(user) {
    var fields = {
        template: '3_rows_of_labels',
        row1_label: 'Tickets Sold / Left:',
        row1_value: g_ticket_sold + ' / ' + (cb.settings.tickets - g_ticket_sold),
        row2_label: 'Ticket Cost:',
        row2_value: cb.settings.ticket_price,
        row3_label: '',
        row3_value: ''
    };

    if (user == null)
    {
        fields.row3_label = 'Owned / Max:';
        fields.row3_value = '0 / ' + cb.settings.max_tickets;
        return fields;
    }

    if (g_is_winners == true)
    {
        fields.row2_label = 'Raffle:';
        fields.row2_value = 'Finished.';
        fields.row3_label = '';
        fields.row3_value = '';
    }

    // Show the Performer how many minutes remain.
    if (user == cb.room_slug && cb.settings.draw_minutes > 0)
    {
        fields.row3_label = 'Time Left:';
        fields.row3_value = getTimeLeft() + ' left';
        return fields;
    }

    // It's a registered user.
    fields.row3_label = 'Owned / Max:';
    fields.row3_value = countUserTickets(user) + ' / ' + cb.settings.max_tickets;

    return fields;
});

cb.onMessage(function (msg) {
	// user commands
	if (msg.user == cb.room_slug)
	{
		if (msg.m.indexOf(COMMAND_HELP) == 0)
		{
			cb.chatNotice(displayHelp());
		}
		if (msg.m.indexOf(COMMAND_SET_TIME) == 0)
		{	
			var str_time = msg.m.substring(COMMAND_SET_TIME.length).trim();
			//cb.log(str_time);
			var new_time = parseInt(str_time,10);
			//cb.log(new_time);
			if (isNaN(new_time) || new_time <= 0)
			{
				cb.chatNotice(displayHelp());
				return;
			}
			cb.settings.draw_minutes = g_mins_left = new_time;
			g_start_time = new Date().getTime();
			cb.chatNotice('New time countdown set to ' + new_time + ' minutes.');
			cb.drawPanel();
		}
		if (msg.m.indexOf(COMMAND_ADD_PRIZE) == 0)
		{		
			var new_prize = msg.m.substring(COMMAND_ADD_PRIZE.length).trim();
			if (new_prize === '')
			{
				cb.chatNotice(displayHelp());
				return;
			}
			g_prizes.push(new_prize);
			cb.chatNotice(displayPrizes());
		}
		if (msg.m.indexOf(COMMAND_DRAW_WINNERS) == 0)
		{
			drawWinners();
		}
	}

	if (msg.m.indexOf(COMMAND_INFO) > -1) {
		var display = displayRules() + '\n' + displayPrizes();
		if (msg.user == cb.room_slug || msg.is_mod) {
			cb.chatNotice(display);
		} else {
			cb.chatNotice(display,msg.user);
		}
	}
	if (msg.m.indexOf(COMMAND_WINNERS) > -1) {
		if (msg.user == cb.room_slug || msg.is_mod) {
			cb.chatNotice(displayWinners());
		} else {
			cb.chatNotice(displayWinners(),msg.user);
		}
	}

	return msg;
});
// END CHATURBATE HANDLER FUNCTIONS.

// TIMER FUNCTIONS.

// If the timer is activated it keeps track of the raffle duration.
function updateTimer() {
    if (g_is_winners == true)
    {
        return;
    }

    var old_mins_left = g_mins_left;
    var elapsed_time = new Date().getTime() - g_start_time;
    cb.log('elapsed_time: ' + elapsed_time);

    var elapsed_mins = Math.floor(elapsed_time / 60000);
    cb.log('elapsed_mins: ' + elapsed_mins);

    if (elapsed_mins >= cb.settings.draw_minutes)
    {
        drawWinners();
    }

    //cb.log('old_mins_left: ' + old_mins_left + ', g_mins_left: ' + g_mins_left);
    g_mins_left = cb.settings.draw_minutes - elapsed_mins;
    if (g_mins_left == cb.settings.draw_minutes || old_mins_left > g_mins_left)
    {
        if (old_mins_left == 0 ||
            (g_mins_left >= 5 && (g_mins_left % 5) == 0) ||
            (g_mins_left > 0 && g_mins_left < 5))
        {
            cb.chatNotice(getTimeLeft() + ' left until the winners are drawn.');
            cb.drawPanel();
        }
    }
    cb.chatNotice(displayHelpSummary(), cb.room_slug);
    // Grace period of up to 10 seconds.
    cb.setTimeout(updateTimer, 60000);
}
// END TIMER FUNCTIONS.


// Initialize the application.
function init() {
    g_cost_label = 'Cost is ' + cb.settings.ticket_price + (cb.settings.ticket_price > 1 ? ' Tokens' : ' Token' ) + ' per Raffle Ticket.';

    buildPrizes();
    update_subject();
    showRules();
    cb.chatNotice(displayHelpSummary(), cb.room_slug);

    if (cb.settings.draw_minutes > 0)
    {
        updateTimer();
    }
    cb.drawPanel();
}

init();
