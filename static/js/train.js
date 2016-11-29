currentFunction = function(){}
msPerChar = 500;
timebuffer = 3000;
phraselimit = 5;
turncount = 0;
sound_dict = {
    "next": "/static/sounds/chord_next.mp3",
    "done": "/static/sounds/chord_done.mp3"
};

$(document).ready(function(){
    console.log("starting...");
    $("#spinner_howmany").spinner({
        "min":1
        ,"max":99       
        ,"spin":function(event,ui){
            clearTimeout(currentFunction);
            currentFunction = function(){};
            console.log(ui.value);
            phraselimit = ui.value;
            resetGame();
        }
    });
    $("#spinner_interval").spinner({
        "min":100
        ,"max":2000       
        ,"step":50
        ,"spin":function(event,ui){
            clearTimeout(currentFunction);
            currentFunction = function(){};
            console.log(ui.value);
            msPerChar = ui.value;
            resetGame();
        }
    });

    resetGame();
});

function playsound(whichsound){
    var playme = new Audio();
    playme.src = sound_dict[whichsound];
    playme.play();
}

function randomColor(){
    var colors = ["blue","green","red","yellow","maroon","khaki","steelblue"];
    element = Math.floor(Math.random() * colors.length);
    return colors[element]
}

function changeColor(element){
    $(element).css({"color":randomColor()});
}

function getPhrase(howmany){
    var phraseurl = "/jsonphrases/" + howmany;
    $.getJSON(phraseurl,function(json){
        phrases =  json ;
    });
}

function resetGame(){
    $.getJSON('/jsonphrases/' + phraselimit,function(json){
        phrases = json;
    });
    $("#changeme").html("<button id='button_start'>Start</button>");
    $("#button_start").button().click(function(){changes("#changeme");});
    turncount = 0;
}

function changes(element){
    var currentPhrase = phrases['phrases'][turncount];
    currentPhrase = "(" + (turncount + 1) + ") " + currentPhrase;
    console.log(currentPhrase);
    var timelimit = timebuffer + (msPerChar * currentPhrase.length);
    $("#div_showresults").html("");
    playsound("next");
    $(element).html(currentPhrase);
    turncount++;
    if (turncount < phraselimit){
        currentFunction = setTimeout(
            function(){changes(element);}
            ,timelimit
        );
    }
    else {

        currentFunction = setTimeout(
            function(){
                playsound("done");
                var donelist = "<ol id='list_done'>";
                for(var i = 0; i < phraselimit; i++){
                    var p = phrases['phrases'][i];
                    donelist += "<li>" + p + "</li>";
                }
                donelist += "</ol>";
                $("#div_showresults").html(donelist);
                resetGame();
            }
            , timelimit
        );
    }
            
}
