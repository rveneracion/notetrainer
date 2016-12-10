$(document).foundation()

var phrasecount = 5;
var interval = 500;
var graceperiod = 3000;
var myorbiter;
var orbitOptions = {};
var slideCount = 0;
var currentSlide = 0;
var startingCountdown = 3000;

$(document).ready(function(){
});

function getPhrases(num) {
    slideCount = 0;
    currentSlide = 0;
    var ran = Math.floor((Math.random() * 1000000) + 1);
    $(document).load(
       '/getphrases/' + num.toString() + '?ran=' + ran.toString(),
      function(data){
          $("#orbit-wrapper").html(data);
          myorbit = new Foundation.Orbit($("#orbiter"), orbitOptions);
          slideCount = $(".orbit-slide").length;
          $(document).foundation();
          setTimeout(nextSlide, startingCountdown);
      } 
    );
}

function clearOrbit() {
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
    myorbit.changeSlide(idx=currentSlide);
    if (currentSlide < (slideCount - 1)) {
        setTimeout(nextSlide, totaltime);
    }
}

function setPhrasecount(){
    phrasecount = $("#inputPhrasecount").val();
    console.log("phrasecount: " + phrasecount);
}
