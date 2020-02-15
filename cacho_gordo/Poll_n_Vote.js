// https://chaturbate.com/apps/user_uploads/3/cacho_gordo/
// https://chaturbate.com/apps/sourcecode/poll-n-vote/?version=&slot=3

// startof CBSv2 module - not for re-compilation
(function(a,k){function h(a){this.message=a}h.prototype=Error();h.prototype.name="InvalidCharacterError";a.btoa||(a.btoa=function(a){a=String(a);for(var g,b,p=0,c=k,r="";a.charAt(p|0)||(c="=",p%1);r+=c.charAt(63&g>>8-p%1*8)){b=a.charCodeAt(p+=.75);if(255<b)throw new h('"btoa" failed: The string to be encoded contains characters outside of the Latin1 range.');g=g<<8|b}return r});a.atob||(a.atob=function(a){a=String(a).replace(/=+$/,"");if(1==a.length%4)throw new h('"atob" failed: The string to be decoded is not correctly encoded.');
for(var g=0,b,p,c=0,r="";p=a.charAt(c++);~p&&(b=g%4?64*b+p:p,g++%4)?r+=String.fromCharCode(255&b>>(-2*g&6)):0)p=k.indexOf(p);return r})})("undefined"===typeof exports?this:exports,"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
(function(a){var k=cb.onMessage,h=null,r=null,g,b="#"+(cb.settings.hasOwnProperty("slot")?cb.settings.slot:"")+"CBSv2",p=/^\/#[0-3]CBSv2\//;cb.log("CBS::v2::CB app/bot data Save/restore::20170118.008::Release");cb.onMessage=function(c){if("function"!==typeof c)throw new TypeError(c+" is not a function");k(function(k){var d=k.m.replace(/\s*/g,"").split("/"),n,t;3<d.length&&""===d[0]&&d[1]===b?(h&&r&&k.user===cb.room_slug&&(n=d[2],4===d.length?(d[3]="?",k.m=d.join("/")):6===d.length?((g||{}).hasOwnProperty(n)||
(t=h(),g={},g[n]=a.btoa(a.unescape(a.encodeURIComponent(t))),t||cb.log("onSave returned no data.")),g.hasOwnProperty(n)&&(t=parseInt(d[3],10),n=g[n].slice(t,t+512),d[4]=n,d[5]=n.length,k.m=d.join("/"))):7===d.length&&("0"===d[3]&&(g={},g[n]=""),g.hasOwnProperty(n)&&(d[3]=g[n].length,d[6]=d[4].length,k.m=d.join("/"),d[4]?g[n]+=d[4]:(t=a.decodeURIComponent(a.escape(a.atob(g[n]))),r(t),cb.chatNotice("Previously Saved Data Restored.",cb.room_slug))))),k["X-Spam"]=!0):p.test(k.m)&&(k["X-Spam"]=!0);return c(k)});
return c};cb.onRestore=function(a){if("function"!==typeof a)throw new TypeError(a+" is not a function");return r=a};cb.onSave=function(a){if("function"!==typeof a)throw new TypeError(a+" is not a function");return h=a};cb.onMessage(function(a){return a})})("undefined"===typeof exports?this:exports);
// endof CBSv2 module - not for re-compilation


/***********************************\
  Poll n Vote (c)2017 (10/10/17)
  Author: cacho_gordo
  Version: v1.1 (10/10/2017)
  <- Tips Vote Author: undefined
     --- fixed and modified ---
  -> Add POLL FREE OPINION
\***********************************/

"use strict";
const version = [
  "Poll n Vote (c)2017 (10/10/17)",
  "Version: v1.1 (10/10/2017)",
  "Author: cacho_gordo (cachotest)"
];

// POLL - VOTE
var foreground = '#FFFFFF',
       fg_warn = '#FF0000',
    background = '#0164EE',
	      navy = "#000080",
	    yellow = "#FFFF00", // amarillo	
      forenice = '#0164EE', // mismo de fondo para fg
	   micolor = "#2991f8"; // mi color especial en ayuda	  

var nbsp = '\xa0',	// no elimina trim() ni html
   stars = ' \u2605 \u2605 \u2605 ', // ★ ★ ★ alrederdor titulo ★ ★ ★
  bullet = '\u2022',  // •
 diamond = '\u2666';  // ♦
   
// spaces
function spaces(n){
  var s = nbsp;
  if (n>1) 
    for (var i=1;i<n;i++)
       s += nbsp;
  //
  return s;  
}   

var txt_never     = 'When I end it',
    txt_votecount = 'After x votes',
    txt_wincount  = 'One gets x votes';
	
////// CBS  ////////////////////////////
var opt_votes    = [0, 0, 0, 0, 0];
var opt_labels   = [cb.settings.opt1_label, cb.settings.opt2_label, cb.settings.opt3_label, cb.settings.opt4_label, cb.settings.opt5_label];
var opt_tokens   = [cb.settings.opt1_tokens, cb.settings.opt2_tokens, cb.settings.opt3_tokens, cb.settings.opt4_tokens, cb.settings.opt5_tokens];
//
var aPollKeys = []; // palabras de las opciones para votar en el mensaje
var aUsrsVote = []; // no se puede repetir votos en poll free (solo con tokens)
var txtPoll = "";  // corta descripcion de la encuesta

var votes_remain = cb.settings.vote_count;
var votes_winner = votes_remain;
var vote_mode = cb.settings.vote_mode;
var vote_running = true;
//
var actMode = cb.settings.action_mode;
var modeBot = "Token Votes"; // for titles
if (actMode == 'POLL') {
    modeBot = "Poll FREE";
	opt_tokens = [];
	opt_labels = [];
	vote_running = false;
}
/////////////////
// CBS handlers
cb.onSave(function () {
  // form the variables into an object, using their names as the object keys
  var data = {
	 opt_votes: opt_votes,
	 opt_labels: opt_labels,
	 opt_tokens: opt_tokens,
	 aPollKeys: aPollKeys,
	 aUsrsVote: aUsrsVote,
	 txtPoll: txtPoll,
	 votes_remain: votes_remain,
	 votes_winner: votes_winner,
	 vote_mode: vote_mode,
	 vote_running: vote_running,
	 actMode: actMode
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
/////////////////

// bot options
cb.settings_choices = [
    {name: 'action_mode', type: 'choice', label: 'Mode of Action', choice1: 'POLL', choice2: 'VOTE', defaultValue: 'VOTE'},
    // msg text ppal. poll msg por comando /poll 'mensaje de la encuesta' op1 op2 [op3 op4 op5] 
    {name: 'poll_title', type: 'str', defaultValue:"Poll FREE your opinion in messages with quotes", minLength: 10, maxLength: 200, label: 'For board MAIN TITLE MODE POLL'}, 
    {name: 'vote_title', type: 'str', defaultValue:"Vote by tips for my GOAL", minLength: 10, maxLength: 200, label: 'For board TITLE MODE VOTE'},
    {name: 'board_interval', type: 'int', minValue: 1, maxValue: 15, defaultValue: 3, label: 'Board Display Interval (mins)'},
    {name: 'vote_mode', type: 'choice', label: 'Voting ends...', 
      choice1: txt_never,
      choice2: txt_votecount, 
      choice3: txt_wincount, defaultValue: txt_wincount},
    {name: 'vote_count', type: 'int', minValue: 10, defaultValue: 15, label: '...where x is'},
    {name: 'opt1_label', type: 'str', defaultValue: "ANAL dildo", minLength: 2, maxLength: 200, label: 'TOKEN Votes... Option 1'},
    {name: 'opt1_tokens', type: 'int', minValue: 10, defaultValue: 11, label: 'Tokens op.1'},
    {name: 'opt2_label', type: 'str', defaultValue: "Finguering", minLength: 2, maxLength: 200, label: 'Option 2'},
    {name: 'opt2_tokens', type: 'int', minValue: 10, defaultValue: 12, label: 'Tokens op.2'},
    {name: 'opt3_label', type: 'str', defaultValue: "Cream a lot", maxLength: 200, label: 'Option 3', required: false},
    {name: 'opt3_tokens', type: 'int', minValue: 0, defaultValue: 13, label: 'Tokens op.3', required: false},
    {name: 'opt4_label', type: 'str', defaultValue: "DP"  ,maxLength: 200, label: 'Option 4', required: false},
    {name: 'opt4_tokens', type: 'int', minValue: 0, defaultValue: 14, label: 'Tokens op.4', required: false},
    {name: 'opt5_label', type: 'str', defaultValue: "Cum SQUIRT", maxLength: 200, label: 'Option 5', required: false},
    {name: 'opt5_tokens', type: 'int', minValue: 0, defaultValue: 16, label: 'Tokens op.5', required: false}
];

// // --------------------------------
function showBoard(user) {
 if (actMode == 'VOTE' || txtPoll !== '') {
   var response1 = spaces(3) + stars + '\xA0 Votes Board \xA0' +  stars + spaces(12) + '\n';
   var response2 = "";
   if (actMode == 'POLL') {
	    response2 = '\xA0' + diamond + ' ' + cb.settings.poll_title + ' ' + diamond + '\xA0\n';
	    response2 += spaces(3) + bullet + ' ' + txtPoll + ' ' + bullet + spaces (8);
   } else
        response2 = spaces(3) + bullet + ' ' + cb.settings.vote_title + ' ' + bullet + spaces (8);
   // 
   var response3 = '';
   if (vote_running) {
    for (var i=0; i<opt_tokens.length; i++) {
	  if (0 != opt_tokens[i]) {
	     if (actMode == 'VOTE')
	        response2 += "\n \xA0 - " + opt_labels[i] + "  [" + opt_votes[i] + ' vote' + (opt_votes[i]!==1?'s':'') +'] \xA0 Tip ' + opt_tokens[i] + ' tkns. \xA0';
		 else  // POLL
	        response2 += '\n \xA0 - ' + opt_labels[i] + '  [' + opt_votes[i] + ' votes] \xA0 Type "' + aPollKeys[i] + '" \xA0';      		 
	  }		
    }
    if (vote_mode == txt_votecount)
	     response3 = votes_remain + ' vote' + (votes_remain > 1 ? 's' : '') + ' remaining before votes closes. \xA0\n';
    else if (vote_mode == txt_wincount)
	     response3 = 'First option to ' + cb.settings.vote_count + ' votes wins! \xA0\n';
    //
	if (actMode == 'POLL') 
       response3 += 'Type shown words in message to register your vote. \xA0\nType !votes at any time to see votes board. \xA0';
	else 
       response3 += 'Tip shown tokens to register your vote. \xA0\nType !votes at any time to see votes board. \xA0';	
   } 
   //
   var send = user;
   if (!user) send = '';
   cb.sendNotice(response1 + response2, send, background, foreground, 'bold');
   if (vote_running)
      cb.sendNotice(response3, send, background, foreground);
   else
      showWinner();
  } 
  else {
		cb.sendNotice("Poll n Vote Warning: Not running yet!", (user?user:cb.room_slug), '', fg_warn, 'bold');
  }  
  //
  if (!user) {
	   // we were triggered by a timeout
	   checkVoteEnd();
	   cb.setTimeout(showBoard, cb.settings.board_interval*60*1000);
  }  
}

function lenOpts(){
  var ops = 0;
  for (var i=0; i<opt_tokens.length; i++)
    if (opt_tokens[i] != 0)  
	  ++ops;
  //
  return ops;  
}
function validaDatos() {
  for (var i=1; i<opt_tokens.length; i++) {
	// start at option 2
	if (0 != opt_tokens[i] && ('' == opt_labels[i])) {
	    // make sure no option labels are left blank
	    cb.sendNotice("Poll n Vote Warning: Label for option " + (i+1) + " is blank -- removing from vote board!", cb.room_slug, '', fg_warn, 'bold');
	    opt_tokens[i] = 0;
	    continue;
	} 
	for (var j=0; j<i; j++) {  //// ?????? opciones token en modo creciente y distintos
	    // check all options before this one
	    if (0 != opt_tokens[i] && opt_tokens[i] == opt_tokens[j]) {
		  // make sure we don't have two options with the same token amounts
		  cb.sendNotice("Poll n Vote Warning: Token amount for option " + (i+1) + " is not unique -- removing from votes board!", cb.room_slug, '', fg_warn, 'bold');
		  opt_tokens[i] = 0;
		  break;
	    } else if (0 != opt_tokens[i] && opt_labels[i].toLowerCase() == opt_labels[j].toLowerCase()) {
		  // make sure we don't have two options with the same label
		  cb.sendNotice("Poll n Vote Warning: Label for option " + (i+1) + " is not unique -- removing from votes board!", cb.room_slug, '', fg_warn, 'bold');
		  opt_tokens[i] = 0;
		  break;
	    }
	}
  }
  //
  if (lenOpts() < 2) {
	 cb.sendNotice("Poll n Vote Warning:  No running with less of 2 options!", cb.room_slug, '', fg_warn, 'bold');
	 vote_running = false;
	 return false; 
  }
  return true;
}

function showWinner() {
  if (!opt_tokens.length) {
	cb.sendNotice("Poll n Vote Warning: Action Mode " + modeBot + ". NO options yet!", cb.room_slug, '', fg_warn, 'bold'); 
	return;
  }
  var options = [];
  for (var i=0; i<opt_tokens.length; i++) 
	  options[i] = i;

  options.sort(function(a, b){return opt_votes[b]-opt_votes[a]});

  if (opt_votes[options[0]] == 0) {
	cb.sendNotice("Poll n Vote Warning: Action Mode " + modeBot + ". NO votes yet!", cb.room_slug, '', fg_warn, 'bold'); 
	return; // no vote_running porque no opciones
  }
  //
  var win_count = 1;
  for (var i=1; i<opt_tokens.length; i++) {
	if (opt_votes[options[i]] != opt_votes[options[0]]) 
	    break;
	if (0 != opt_tokens[options[i]]) 
	    win_count++;
  }

  var response1 = '--- ' + modeBot + ' has ended! --- ' + spaces(8) + '\n';
  var response2 = 'Winner' + (win_count > 1 ? 's (' + win_count + '-way tie)':'') + ': \xA0';
  for (var i=0; i<win_count; i++) {
	if (opt_tokens[options[i]] != 0) 
	    response2 += "\n  - " + opt_labels[options[i]] + ": " + opt_votes[options[i]] + " votes \xA0";
  }
  //
  if (win_count == 1 || actMode == 'POLL')
      vote_running = false;
  else { //if (win_count > 1) { // por si ==0 comentado
      response2 += '\nContinues voting for a few minutes, tie-break!';
	  cb.sendNotice("Poll n Vote NOTE: Continues voting until when you end it with !endvotes command. \xA0", cb.room_slug, '', fg_warn,  'bold');
	  vote_mode = txt_never;
	  vote_running = true;
  }
  //
  cb.sendNotice(response1 + response2, '', background, foreground, 'bold');
}

function checkVoteEnd() {
  switch (vote_mode) {
	case txt_never:
	   return;

	case txt_votecount:
	  if (votes_remain > 0) return;
	  vote_running = false;	  
	  break;

	case txt_wincount:
	  for (var i=0; i<opt_tokens.length; i++)
	    if (opt_votes[i] >= votes_winner){
		    vote_running = false;
			break;
		}	
	  //
	  if (vote_running) return;		
	  break; // fin switch no es necesario
  }
  // ok endvotes
  showWinner();
}

function parsePollParams(spars){
    resetData();
    spars = spars.replace(/\\/g,'');
	var desc = "";
	var aOps = [], aParts = [], aParOps = [];
	var ind2, ind1 = spars.indexOf('"');
	if (ind1>-1) {
		ind2 = spars.indexOf('"',ind1+7); // +7 minimo de texto
		if (ind2>-1){ // hay cierre
			desc = spars.substring(ind1+1, ind2).trim();
		}
	}
    if (desc == "") return false; // no encuentra
	spars = spars.substr(ind2+1);
    aOps = spars.split(';');
	for (var i=0;i<aOps.length;i++){
	   if (!aOps[i] || aOps[i] == '' ) continue;
	   aParts = aOps[i].trim().split('=');
	   if (aParts.length != 2  || aParts[0]=='') continue;
	   aParOps.push([aParts[0].trim(), aParts[1].trim()]);
	}
	// Sólo 5 max. <2 en validaDatos
	// datos
	for (var i=0;i<aParOps.length && i<5;i++){
		aPollKeys[i]  = aParOps[i][0];
		opt_labels[i] = aParOps[i][1];
		opt_tokens[i] = i+1; // <> 0 distintos para validar
	}
	// validar entradas
	if (validaDatos()) {
	   txtPoll = desc; // cuestion poll
	   aUsrsVote = [];
	   opt_votes  = [0, 0, 0, 0, 0];
	   vote_running = true;
	   return true;
	}
    // else
    resetData();
	return false; 	
}
function isModSlug(m){ 
   return (cb.room_slug == m.user || m.is_mod);
}

function resetData(){ // no se valida del parse POLL <2 opciones
    txtPoll = ""; // no running
	aUsrsVote = [];
	vote_running = false;
	aPollKeys  = [];
	opt_labels = [];
	opt_tokens = []; 
	opt_votes  = [0, 0, 0, 0, 0];
	votes_remain = cb.settings.vote_count;
	vote_mode = cb.settings.vote_mode;
}
function reinit(){ // !revotes
    aUsrsVote = [];
	vote_running = true;
	opt_votes  = [0, 0, 0, 0, 0];
	vote_mode = cb.settings.vote_mode;
	votes_remain = cb.settings.vote_count;
}
////////////////////////////////////
// handlers
cb.onMessage(function (m) {
  if (!m.has_tokens) return m; // no grises has_tokens
  var amsgs = m['m'].trim().split(/\s+/g);
  var modslug = isModSlug(m);
  if (amsgs[0].charAt(0) == '!') {
   m['X-Spam'] = true;
   switch (amsgs[0]) {
	case '!help' : // publico - solo se ven comms publicos
		if (amsgs.length < 2 )
			cb.sendNotice(helpNotice(modslug), m.user,'',micolor);
		else
			cb.sendNotice(helpNotice(modslug, amsgs[1]), m.user,'',micolor);
		break;
    case '!votes': // show votos / resultados op. ganadora
	  // other users don't need to see this message
	  if (modslug) {
	    if (vote_running) 
		   showBoard('');
	    else 
		   showWinner();
	  } else {
	    if (vote_running) 
		   showBoard(m.user);
	    else 
		   showWinner();
	  }
	  break;

    case '!endvotes':
	  if (cb.room_slug != m.user && 'cacho_gordo' !== m.user) // para pruebas
    	  break;
      //
	  showWinner();
	  break;

    case '!revotes':
	  if (cb.room_slug != m.user && 'cacho_gordo' !== m.user) // para pruebas
    	  break;
      //
	  if (actMode == 'POLL' && txtPoll == "") {
		cb.sendNotice("Poll n Vote Warning: Action Mode " + modeBot + ". NO options yet!!", cb.room_slug, '', fg_warn, 'bold'); 
		break;
	  }
	  if (!vote_running) {
	     reinit();
		 showBoard('');
	  }
	  else
	     cb.sendNotice("Poll n Vote Warning: Action Mode " + modeBot + " is running!", cb.room_slug, '', fg_warn, 'bold'); 
	  break;
	  
	case '!poll':
	  if (cb.room_slug != m.user && 'cacho_gordo' !== m.user) // para pruebas
    	  break;
      //
	  if (actMode == 'VOTE') {
	      cb.sendNotice("Poll n Vote Warning: Action Mode " + modeBot + ". NO POLL available!", cb.room_slug, '', fg_warn, 'bold');
		  break;
	  }	  
	  if (vote_running) {
	      cb.sendNotice("Poll n Vote Warning: Action Mode " + modeBot + " is running!", cb.room_slug, '', fg_warn, 'bold');
		  break;
	  }
	  //
	  amsgs.splice(0,1);
	  if (parsePollParams(amsgs.join(' '))) {
		   vote_running = true;
		   showBoard();
	  }	   
	  else
           m.m += ' => Error parse params!';	  
	  //
	  break;
	  
	case '!ver' : // version ( for developer hardcoded)
		if (m.user == cb.room_slug || m.user=='cacho_gordo')
		    cb.sendNotice(version.join('\n'), m.user,'',micolor);
        break;	  
   } // eofswith
  } // endif !comando
  else { // otros msgs a buscar entradas de poll en m.m 
   if (!vote_running) return m;
   // - contabilizar en opt_votes
   // - y marcar al user en aUsrsVote - ya votó
   var words = /"([^"]+)"/.exec(m.m); // sin comillas
   if (!words || words.length == 0) {
       words = /'([^']+)'/.exec(m.m);
       if (!words || words.length == 0) return m; // nada	  
   }
   //
   if (aUsrsVote.indexOf(m.user) >=0 ) {
	   cb.sendNotice("Poll n Vote Warning: You already voted before, only allowed once!", m.user, '', fg_warn, 'bold');
	   m['X-Spam'] = true;
	   return m;
   }
   //   
   words = words[1].toLowerCase().trim(); //sin comillas en minusculas
   for (var i=0; i<aPollKeys.length; i++) {    
	 if (words == aPollKeys[i].toLowerCase()) {
	     cb.sendNotice(m.user + " has voted for " + opt_labels[i], '', yellow, forenice, 'bold');
	     opt_votes[i]++;
	     if (txt_votecount == vote_mode)
	 	    votes_remain--;
         //
	     checkVoteEnd();
	     break;
	 }
   }
   if (i == aPollKeys.length) { // no exite opcion
       cb.sendNotice("Poll n Vote Warning: Your option voted not exist!", m.user, '', fg_warn, 'bold');
	   return m;
   }
   //
   aUsrsVote.push(m.user);
  }
  //
  return m;
});

cb.onEnter(function (user) {
  if (isModSlug(user) || !user.has_tokens) return;
    cb.sendNotice("Welcome " + user.user + ", the Poll n Vote bot run in my room. \xA0\n" +
	'In Action Mode "' + modeBot + '" for voting options. \xA0\n' +
	"Type !votes to see voting options. " +(actMode=='VOTE'?'Tip tokens':'Type words') + " \xA0", user.user, background, foreground);
});

cb.onTip(function (tip) {
  if (!vote_running || txtPoll !== '') return;
  //
  var amount = parseInt(tip.amount);
  for (var i=0; i<opt_tokens.length; i++) {
	if (amount == opt_tokens[i]) {
	    cb.sendNotice(tip.from_user + " has voted for " + opt_labels[i], '', yellow, forenice, 'bold');
	    opt_votes[i]++;
	    if (txt_votecount == vote_mode)
		    votes_remain--;
        //
	    checkVoteEnd();
	    break;
	}
  }
});

//////////////// INIT //////////
function init(){
  cb.sendNotice();
  cb.sendNotice("********************************",'','',navy,'bolder');
  cb.sendNotice(nbsp + " "+ version[0],'','',navy,'bolder');
  cb.sendNotice(nbsp + " "+ version[1],'','',navy,'bolder');
  cb.sendNotice(nbsp + " "+ version[2],'','',navy,'bolder');
  cb.sendNotice("********************************",'','',navy,'bolder');
  cb.sendNotice("Action Mode: " + modeBot, '', '', micolor, 'bold');
  cb.sendNotice("Commands:", '', '',navy);
  cb.sendNotice(" !votes - to see status of voting", '', '',navy);
  cb.sendNotice(" !help - see all commands.", '', '',navy);
  cb.sendNotice();
  //
  if (actMode == 'VOTE') {
     validaDatos();
     showBoard();
  }
}

//////// H E L P ////////////
var ahelp0 = [
"\xA0 * * * * \xA0Poll n Vote \xA0 H E L P \xA0* * * *",
"\xA0\xA0 * * * created by cacho_gordo * * *",
"Votes for GOAL with tips or Poll FREE in messages.",
" Commands you can use:"
];
var ahelp1 = [
"!votes - show state of voting - private, public if broadcaster.",
"!help [command] - this commands list [info of one of them] - private",
""
];

var ahelp2 = [
"!endvotes - end voting and  publishes winning result - broadcaster only",
"!revotes - reinit voting if TOKEN Vote is ended - broadcaster only",
"!poll \"text\" <options> - set params for Poll free voting - broadcaster only",
"!ver - current version - private - use broadcaster and developer ( if mod ).",
""
];
function helpNotice(slmd, hp) {
	var msg = '';
	if (!hp || hp==''){
		msg = ahelp0.join('\n') + '\n';
		if (slmd) msg += ahelp2.join('\n') + '\n';
		msg += ahelp1.join('\n');
	} else  // /lhelp cmd - comprobar los slmd - y break 
	  switch (hp) {
        case 'votes' :
			return [
			  " * Help votes command *",
			  "!votes - show state of voting.",
			  "Show private Notice of the voting or end result.",
			  "Show public if broadcaster."
			].join('\n');
		    break;

		/*** only slug commands ***/  			  
		case 'endvotes' :
		  if (slmd) // modelo y mods solo verlo
			return [
			  " * Help endvotes command *",
			  "!endvotes - end voting, if running.",
			  "Public show winning result.",
			  "Only use of the broadcaster."
			].join('\n');		
		  break;
		case 'revotes' :
		  if (slmd) // modelo y mods solo verlo
			return [
			  " * Help revotes command *",
			  "!revotes - reinit voting if is TOKEN Vote ended. ",
			  "Only use of the broadcaster."
			].join('\n');		
		  break;
		case 'poll' :
		  if (slmd) // modelo y mods solo verlo
			return [
			  " * Help poll command *",
			  "!poll \"text question\" <options>",
			  "Set params for Start Poll FREE voting,",
			  "<options=>> op1=desc1;op2=desc2 [;op3=desc3[;op4=desc4[;op5=desc5]]]",
			  "Maximum 5 options, min. 2",
			  "Eg: !poll \"What do we play?\" pussy=PUSSY;anal=ANAL;dp=DP",
			  "Only use of the broadcaster."
			].join('\n');		
		  break;		  
		case 'ver' :
		  if (slmd) // solo modelo y mods tambien
			return [
			  " * Help ver command *",
			  "!ver - Show software current version for developer info.",
			  "Only use of the broadcaster and developer (if mod) - private."
			].join('\n');		
		  break;		  
//
	    default :
	  }
	//
	return msg;
}

///////////
init();
//////////
