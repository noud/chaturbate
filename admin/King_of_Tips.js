// https://chaturbate.com/apps/user_uploads/0/admin/
// https://chaturbate.com/apps/sourcecode/king-of-tips/?version=&slot=0

var total_tipped = 0;
var startup_time = new Date();
var scores = {
    _data:[],
    _last_king:null,
    increment:function (username, amount) {
        var score = scores._pop_user(username);
        score += amount;
        scores._insert_score_keeping_sort(username, score);
        scores._check_for_king_change();
    },
    is_user_king:function (username) {
        return scores._last_king == username;
    },
    _check_for_king_change:function () {
        if (scores._data.length == 0) {
            if (scores._last_king != null && cb.settings.remove_king_when == 'score decays to 0') {
                cb.chatNotice(scores._last_king + " is no longer the king.");
                scores._last_king = null;
            }
            return;
        }
        var king = scores._data[0].username;
        if (king != scores._last_king) {
            if (scores._data[0].score >= cb.settings.tokens_per_minute_to_be_king) {
                cb.chatNotice(king + " is the new king.");
                scores._last_king = king;
                return;
            }
        }
        if (scores._last_king != null && cb.settings.remove_king_when == 'score decays to 0' && scores.score_for(scores._last_king) == 0) {
            cb.chatNotice(scores._last_king + " is no longer the king.");
            scores._last_king = null;
            return;
        }
    },
    score_for:function (username) {
        for (var i = 0; i < scores._data.length; i++) {
            if (scores._data[i].username == username) {
                return scores._data[i].score;
            }
        }
        return 0;
    },
    get_current_king:function () {
        return scores._last_king;
    },
    _insert_score_keeping_sort:function (username, score) {
        var row = {score:score, username:username};
        for (var i = 0; i < scores._data.length; i++) {
            if (score > scores._data[i].score) {
                scores._data.splice(i, 0, row);
                return;
            }
        }
        scores._data.push(row);
    },
    _pop_user:function (username) {
        for (var i = 0; i < scores._data.length; i++) {
            if (scores._data[i].username == username) {
                var s = scores._data[i];
                scores._data.splice(i, 1);
                return s.score;
            }
        }
        return 0;
    },
    send_stats:function (to_user) {
        cb.chatNotice("== King of Tips Scores (Top 10) ==", to_user);
        var len = scores._data.length;
        if (len > 10) {
            len = 10;
        }
        for (var i = 0; i < len; i++) {
            cb.chatNotice(scores._data[i].username + ": (" + Math.ceil(scores._data[i].score) + " pts)", to_user);
        }
        if (len == 0) {
            cb.chatNotice("Nobody has any points. Send tips to get points.", to_user);
        } else {
            cb.chatNotice("All scores decay " + cb.settings.tokens_per_minute_to_be_king + " every minute.", to_user);
        }
        var seconds_running = ((new Date()).getTime() - startup_time.getTime()) / 1000;
        if (seconds_running == 0) {
            seconds_running = 1;
        }
        cb.chatNotice("King of tips has been running for " + Math.round(seconds_running / 36)/100 + " hours and has counted " + total_tipped + " tokens.", to_user);
        cb.chatNotice("Kings will remain until " + cb.settings.remove_king_when + ".", to_user);
    },
    decay:function () {
        var decay_amount = cb.settings.tokens_per_minute_to_be_king / 6;
        for (var i = 0; i < scores._data.length; i++) {
            scores._data[i].score -= decay_amount;
            if (scores._data[i].score <= 0) {
                scores._data.splice(i, 1);
            }
        }
        scores.schedule_decay();
        scores._check_for_king_change();
        cb.drawPanel();
    },
    schedule_decay:function () {
        setTimeout(scores.decay, 10000);
    }
};

scores.schedule_decay();


// Chaturbate hooks
cb.settings_choices = [
    {name:'tokens_per_minute_to_be_king', type:'int', minValue:1, maxValue:99,
        default:5},
    {name:'remove_king_when', type:'choice', choice1:'someone else outbids',
        choice2:'score decays to 0', default:5}
];

cb.onDrawPanel(function (user) {
    var king = scores.get_current_king();
    if (user == cb.room_slug) {
        if (king == null) {
            var kingstr = "--";
        } else {
            var kingstr = king + " (" + Math.ceil(scores.score_for(king)) + " pts)"
        }
        return {
            'template':'3_rows_12_22_31',
            'row1_label':'King of Tips:',
            'row1_value':kingstr,
            'row2_label':'Total Tokens Earned:',
            'row2_value':"" + total_tipped + ' Tokens',
            'row3_value':'Type /stats for more information.'
        };
    } else if (user == king) {
        var lead = scores.score_for(user);
        if (scores._data.length >= 2) {
            lead -= scores._data[1].score;
        }
        return {
            'template':'3_rows_11_21_31',
            'row1_value':'Welcome to King of Tips!',
            'row2_value':'You Are King! Lead: ' + Math.ceil(lead) + ' Tokens',
            'row3_value':'Type /stats for more information.'
        };
    } else {
        var tip_required = cb.settings.tokens_per_minute_to_be_king;
        if (king != null) {
            var kingscore = scores.score_for(king);
            if (kingscore >= tip_required) {
                tip_required = kingscore + 1;
            }
        }
        tip_required -= scores.score_for(user);
        return {
            'template':'3_rows_11_21_31',
            'row1_value':'Welcome to King of Tips!',
            'row2_value':'Tip required to become king: ' + Math.ceil(tip_required) + ' Tokens',
            'row3_value':'Type /stats for more information.'
        };
    }
});

cb.onTip(function (tip) {
    scores.increment(tip['from_user'], parseInt(tip['amount']));
    total_tipped += parseInt(tip['amount'])
    cb.drawPanel();
});


cb.onMessage(function (msg) {
    if (scores.is_user_king(msg['user'])) {
        msg['background'] = '#9F9';
    }
    if (msg['m'] == '/stats') {
        msg['X-Spam'] = true;
        scores.send_stats(msg['user']);
    }
    return msg;
});
