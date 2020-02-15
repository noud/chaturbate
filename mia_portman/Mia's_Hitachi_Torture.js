// https://chaturbate.com/apps/user_uploads/2/mia_portman/
// https://chaturbate.com/apps/sourcecode/mias-hitachi-torture/?version=&slot=2

var CurrentSetting = null;
var TotalTips = 0;
var LastTipper = null;
var GoalsRunning = new Boolean();
var FirstGoal = null;
var SecondGoal = null;
var ThirdGoal = null;
var NextGoalName = null;
var NextGoalCost = 0;


cb.settings_choices = [ { 
        name: 'StopCost', type: 'int', minValue: 1, required: true, default:40, label:"Cost to stop" }, { 
        name: 'LowCost', type: 'int', minValue:  1, required: true, default: 10, label:"Cost for low" },{ 
        name: 'HighCost', type: 'int', minValue:  1, required: true, default: 20, label:"Cost for high" },{
        name: 'RunGoals', type:'choice', label:"Activate Goals?", choice1:'Yes', choice2:'No', defaultValue:'Yes'}, {
        name: 'FirstGoalName', type: 'str', minLength: 1, label:"First Goal" },{
        name: 'FirstGoalCost', type: 'int', minValue: 1, label:"First Goal Cost" },{ 
        name: 'SecondGoalName', type: 'str', minLength:  1, label:"Second Goal" },{
        name: 'SecondGoalCost', type: 'int', minValue:  1, label:"Second Goal Cost" },{
        name: 'ThirdGoalName', type: 'str', minLength:  1, label:"Third Goal" },{
        name: 'ThirdGoalCost', type: 'int', minValue:  1, label:"Third Goal cost" }
];

cb.onTip(function (tip) {
        TipAmount = parseInt(tip['amount']);
        TotalTips += TipAmount;
        LastTipper = tip['from_user'];
        if (TipAmount === HighCost && CurrentSetting !== "High") {
            CurrentSetting = "High";
            cb.chatNotice("Hitachi set to High!", "", '#fcb2bf', '#000000', 'bold');
        }
        if (TipAmount === LowCost && CurrentSetting !== "Low") {
            CurrentSetting = "Low";
            cb.chatNotice("Hitachi set to Low!", "", '#fcb2bf', '#000000', 'bold');
        }
        if (TipAmount === StopCost && CurrentSetting !== "Stop") {
            CurrentSetting = "Stop";
            cb.chatNotice("Hitachi set to Off!", "", '#fcb2bf', '#000000', 'bold');
        }
        if (GoalsRunning) {
            if (NextGoalName === FirstGoalName && NextGoalCost <= TotalTips) {
                NextGoalName = SecondGoalName;
                NextGoalCost = SecondGoalCost;
                cb.chatNotice("Goal Reached for: "+FirstGoalName+"!\n Next Goal: "+NextGoalName+" at "+NextGoalCost+" tokens!", "", '#fcb2bf', '#000000', 'bold');
                cb.changeRoomSubject("Hitachi Torture: Low-"+LowCost+" High-"+HighCost+" Stop-"+StopCost+" [Next Goal: "+NextGoalName+"]");
            }
            if (NextGoalName === SecondGoalName && NextGoalCost <= TotalTips) {
                NextGoalName = ThirdGoalName;
                NextGoalCost = ThirdGoalCost;
                cb.chatNotice("Goal Reached for: "+SecondGoalName+"!\n Next Goal: "+NextGoalName+" at "+NextGoalCost+" tokens!", "", '#fcb2bf', '#000000', 'bold');
                cb.changeRoomSubject("Hitachi Torture: Low-"+LowCost+" High-"+HighCost+" Stop-"+StopCost+" [Next Goal: "+NextGoalName+"]");
            }
            if (NextGoalName === ThirdGoalName && NextGoalCost <= TotalTips) {
                NextGoalName = "All Goals Reached";
                NextGoalCost = "<3";
                cb.chatNotice("Goal Reached for: "+ThirdGoalName+"!", "", '#fcb2bf', '#000000', 'bold');
                cb.changeRoomSubject("Hitachi Torture: Low-"+LowCost+" High-"+HighCost+" Stop-"+StopCost);
            }
        }
        cb.drawPanel();
});

cb.onDrawPanel(function(user) {
    if (GoalsRunning) {
        return {
            'template': '3_rows_of_labels',
            'row1_label': 'Current Setting: ',
            'row1_value': CurrentSetting,
            'row2_label': 'Next Goal: ',
            'row2_value': NextGoalName + " ("+NextGoalCost+")",
            'row3_label':  'Total Tips: ',
            'row3_value':  TotalTips
        }
    } else {
        return {
            'template': '3_rows_of_labels',
            'row1_label': 'Current Setting: ',
            'row1_value': CurrentSetting,
            'row2_label': 'Last Tipper: ',
            'row2_value': LastTipper,
            'row3_label':  'Total Tips: ',
            'row3_value':  TotalTips
        }   
    }
});

function init() {
    HighCost = cb.settings.HighCost;
    LowCost = cb.settings.LowCost;
    StopCost = cb.settings.StopCost;
    RunGoals = cb.settings.RunGoals;
    FirstGoalName = cb.settings.FirstGoalName;
    FirstGoalCost = cb.settings.FirstGoalCost;
    SecondGoalName = cb.settings.SecondGoalName;
    SecondGoalCost = cb.settings.SecondGoalCost;
    ThirdGoalName = cb.settings.ThirdGoalName;
    ThirdGoalCost = cb.settings.ThirdGoalCost;
    NextGoalName = FirstGoalName;
    NextGoalCost = FirstGoalCost;
    if (RunGoals === "Yes") {
        GoalsRunning = true;
        cb.changeRoomSubject("Hitachi Torture: Low-"+LowCost+" High-"+HighCost+" Stop-"+StopCost+" [Next Goal: "+FirstGoalName+"]");
        cb.chatNotice("Hitachi Torture: Low-"+LowCost+" High-"+HighCost+" Stop-"+StopCost+"\n Next Goal: "+FirstGoalName+" at "+FirstGoalCost+" tokens!", "", '#fcb2bf', '#000000', 'bold');
    } else {
        GoalsRunning = false;
        cb.changeRoomSubject("Hitachi Torture: Low-"+LowCost+" High-"+HighCost+" Stop-"+StopCost);
        cb.chatNotice("Hitachi Torture: Low-"+LowCost+" High-"+HighCost+" Stop-"+StopCost, "", '#fcb2bf', '#000000', 'bold');
    }
}
init();
