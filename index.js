var playing = false;
var score;
var action;
var timeremaining;

document.getElementById("startreset").onclick = function () {
  //if we are playing

  if (playing == true) {
    location.reload(); //reload page
  } else {
    //change mode to playing

    playing = true;

    //set score to 0

    score = 0;
    document.getElementById("scorevalue").innerHTML = score;

    //show countdown box

    document.getElementById("timeremaining").style.display = "block";

    timeremaining = 5;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;

    //change button to reset
    document.getElementById("startreset").innerHTML = "Reset Game";

    //start countdown

    startCountdown();  
  }
  function startCountdown(){
    action = setInterval(function () {
      timeremaining -= 1;
      document.getElementById("timeremainingvalue").innerHTML = timeremaining;
      if (timeremaining == 0) {
        stopCountdown()
        document.getElementById("gameOver").style.display = "block";
      }

  }, 1000);
}
 function stopCountdown(){
   clearInterval(action);
 }
};
