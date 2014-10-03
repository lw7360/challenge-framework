var editor = ace.edit("editor");
editor.setTheme("ace/theme/textmate");
editor.getSession().setMode("ace/mode/javascript");
editor.setShowPrintMargin(false);

challenge.whitelist = {
    "ForStatement": "Use a for loop",
    "VariableDeclaration": "Declare a variable"
};

challenge.blacklist = {
    "WhileStatement": "Don't use a while loop"
};

challenge.struct = {
    "'for loop' and inside of it 'if statement'.": {
        "ForStatement": {
            "IfStatement": null
        }
    }
};

var listGroupItem = function(txt, pass) {
    var ok = pass ? "ok" : "remove";
    var success = pass ? "success" : "danger";

    return '<li class="list-group-item"><span class="badge alert-' + success + '"><span class="glyphicon glyphicon-' + ok + '"></span></span>' + txt + '</li>';
}

var dispChallenge = function() {
    try {
        var parsed = challenge.parse(editor.getValue());
        //console.log(parsed);

        var success = true;

        $("#whitelistStatus").html('');
        for (prop in parsed.whitelist) {
            $("#whitelistStatus").append(listGroupItem(challenge.whitelist[prop], parsed.whitelist[prop]));
            if (!parsed.whitelist[prop]) success = false;
        }

        $("#blacklistStatus").html('');
        for (prop in parsed.blacklist) {
            $("#blacklistStatus").append(listGroupItem(challenge.blacklist[prop], parsed.blacklist[prop]));
            if (!parsed.blacklist[prop]) success = false;
        }

        $("#structStatus").html('');
        for (prop in parsed.struct) {
            $("#structStatus").append(listGroupItem(prop, parsed.struct[prop]));
            if (!parsed.struct[prop]) success = false;
        }

        if (success) {
            $("#success").html('<a target="_blank" href="http://i.imgur.com/w3PEgSw.gif">You did it!</a>');
        } else {
            $("#success").html('Keep on trucking...');
        }
    } catch (err) {
        // console.log(err);
        $("#success").html("Syntax error...");
    }
}

editor.getSession().on('change', function(e) {
    setTimeout(function() {
        dispChallenge();
    }, 0);
});

dispChallenge();
