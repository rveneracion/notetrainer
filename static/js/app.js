$(document).foundation()

var phrasecount = 3;
var interval = 500;
var graceperiod = 3000;

$(document).ready(function(){
});

function getPhrases(num) {
    var ran = Math.floor((Math.random() * 1000000) + 1);
    $(document).load(
       '/getphrases/' + num.toString() + '?ran=' + ran.toString(),
      function(data){
          $("#orbit-wrapper").html(data);
          $(document).foundation();
      } 
    );
}

function clearOrbit() {
  $("#orbit-wrapper").html('<h1>Get ready to write...</h1>');
        
}
