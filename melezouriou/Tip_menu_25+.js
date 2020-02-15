// https://chaturbate.com/apps/user_uploads/2/melezouriou/
// https://chaturbate.com/apps/sourcecode/tip-menu-25/?version=&slot=2

/* Title: "Tip Menu Single Line Plus" bot
    Author: badbadbubba
    Version: 1.0.0 (03/07/2016)
	
*/

var tip_amt = 0;
var separator_char = "| ";
var msg;
var MAXITEMS=25;
var tipmenuprice = [];
var tipmenuitem= [];
var MAXSEP = 6;
separators = [
{label:'Hearts',shortcut:':heart2'},
{label:'Glitter',shortcut:':pixelglitter'},
{label:'Flowers',shortcut:':tinyflower2'},
{label:'Bow',shortcut:':bluebow'},
{label:'Hearts2',shortcut:':pixelheart'},
{label:'Smiley',shortcut:':smile'},
]

cb.settings_choices = [
    {name: 'sepchar', type: 'choice', choice1: 'Vertical Bar', choice2: 'Hearts', choice3:'Glitter',choice4:'Flowers',choice5:'Bow',choice6:'Hearts2',choice7:'Smiley',defaultValue: 'Vertical Bar', label: "Separator character"},
    {name:'item1', type:'str', label:'Item 1 (eg 10--flash tits)',},
    {name:'item2', type:'str', required: false, label:'Item 2',},
    {name:'item3', type:'str', required: false, label:'Item 3',},
    {name:'item4', type:'str', required: false, label:'Item 4',},
    {name:'item5', type:'str', required: false, label:'Item 5',},
    {name:'item6', type:'str', required: false, label:'Item 6',},
    {name:'item7', type:'str', required: false, label:'Item 7',},
    {name:'item8', type:'str', required: false, label:'Item 8',},
    {name:'item9', type:'str', required: false, label:'Item 9',},
    {name:'item10', type:'str', required: false, label:'Item 10',},
    {name:'item11', type:'str', required: false, label:'Item 11',},
    {name:'item12', type:'str', required: false, label:'Item 12',},
    {name:'item13', type:'str', required: false, label:'Item 13',},
    {name:'item14', type:'str', required: false, label:'Item 14',},
    {name:'item15', type:'str', required: false, label:'Item 15',},
    {name:'item16', type:'str', required: false, label:'Item 16',},
    {name:'item17', type:'str', required: false, label:'Item 17',},
    {name:'item18', type:'str', required: false, label:'Item 18',},
    {name:'item19', type:'str', required: false, label:'Item 19',},
    {name:'item20', type:'str', required: false, label:'Item 20',},
	{name:'item21', type:'str', required: false, label:'Item 21',},
	{name:'item22', type:'str', required: false, label:'Item 22',},
	{name:'item23', type:'str', required: false, label:'Item 23',},
	{name:'item24', type:'str', required: false, label:'Item 24',},
	{name:'item25', type:'str', required: false, label:'Item 25',},
    {name:'noticecolor', type:'str', label:'Notice color (html code default red #FF0000)', defaultValue: '#FF0000'},
    {name: 'chat_ad', type:'int', minValue: 1, maxValue: 999, defaultValue: 1,
        label: 'Delay in minutes between notice being displayed (minimum 1)'}
];

cb.onTip(function (tip)
{
    tip_amt=parseInt(tip['amount']);
           
    for (var i = 1; i <= MAXITEMS; i++) {
        if (tip_amt == tipmenuprice[i]) {
            cb.sendNotice(tip['from_user'] + ' tipped for ' + tipmenuitem[i],'','',cb.settings['noticecolor'],'bold');
                       
        }       
    }

});

function chatAd() {

    cb.sendNotice(msg,'','',cb.settings['noticecolor'],'bold');
    cb.setTimeout(chatAd, (cb.settings.chat_ad * 60000));
}
cb.setTimeout(chatAd, (cb.settings.chat_ad * 60000));

function init()
{

     for (i=0;i<=MAXSEP-1;i++) {
          if  (cb.settings['sepchar'] == separators[i].label) {
                separator_char = separators[i].shortcut + ' ';     
          }
     }
    msg = 'Tip Menu: ';

    for (i=1;i<=MAXITEMS;i++) {
        var tmp;
        tmp=cb.settings['item' + i];
        if (tmp) {
             var arr= tmp.split('--');
             var amt=parseInt(arr[0]);
             if (amt>0) {
                 tipmenuprice[i]=amt;
                 tipmenuitem[i]=arr[1];
                 if (i>=2) {
                    msg += separator_char;
                 }
                 msg += arr[1] + '(' + amt + ') ';
             } 
       }
    }

     cb.sendNotice(msg,'','',cb.settings['noticecolor'],'bold');
}

init();
