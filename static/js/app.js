$(document).foundation()

var phrasecount = 5;
var interval = 500;
var graceperiod = 3000;
var myorbiter;
var orbitOptions = {};
var slideCount = 0;
var currentSlide = 0;
var startingCountdown = 3000;
var timeOut = setTimeout(noFunc,0);

$(document).ready(function(){
    $('.setspeed').click(function(){
        setSpeed(this);
    });
});

function noFunc() {
}
function getPhrases(num) {
    timeOut = setTimeout(noFunc,0);
    clearTimeout(timeOut);
    slideCount = 0;
    currentSlide = 0;
    var ran = Math.floor((Math.random() * 1000000) + 1);
    $(document).load(
       '/getphrases/' + num.toString() + '?ran=' + ran.toString(),
      function(data){
          $("#orbit-wrapper").html(data);
          myorbiter = new Foundation.Orbit($("#orbiter"), orbitOptions);
          slideCount = $(".orbit-slide").length;
          $(document).foundation();
          timeOut = setTimeout(nextSlide, startingCountdown);
      } 
    );
}

function clearOrbit() {
    timeOut = setTimeout(noFunc,0);
    clearTimeout(timeOut);
    slideCount = 0;
    currentSlide = 0;
    $("#orbit-wrapper").html('<h1>Click Start to play</h1>');
}

function nextSlide() {
    currentSlide += 1;
    var slideName = "#phraseslide_" + currentSlide; 
    var phraseLength = $(slideName).attr("phraselength");
    var totaltime = graceperiod + (phraseLength * interval);
    console.log("slideName: " + slideName);
    console.log("phraseLength: " + phraseLength);
    console.log("totaltime: " + totaltime);
    myorbiter.changeSlide(idx=currentSlide);
    if (currentSlide < (slideCount - 1)) {
        setTimeout(nextSlide, totaltime);
    }
}

function setPhrasecount(){
    phrasecount = $("#inputPhrasecount").val();
    console.log("phrasecount: " + phrasecount);
}

function setSpeed(whichButton) {
    interval = $(whichButton).attr("speed");
    $('.setspeed').addClass('secondary');
    $(whichButton).addClass('primary').removeClass('secondary');
    console.log('interval: ' + interval);
}
