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

    show("timeremaining");

    timeremaining = 5;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;

    //change button to reset
    document.getElementById("startreset").innerHTML = "Reset Game";

    //start countdown

    startCountdown();
  }
  function startCountdown() {
    action = setInterval(function () {
      timeremaining -= 1;
      document.getElementById("timeremainingvalue").innerHTML = timeremaining;
      if (timeremaining == 0) {
        stopCountdown();
        show("gameOver");
        document.getElementById("gameOver").innerHTML =
          "<p>Game over!</p><p>Your score is " + score + ".</p>";
        hide("timeremaining");
        hide("correct");
        hide("wrong");
        playing = false;
      }
    }, 1000);
  }
  function stopCountdown() {
    clearInterval(action);
  }
  function show(id) {
    document.getElementById(id).style.display = "block";
  }
  function hide(id) {
    document.getElementById(id).style.display = "none";
  }
};
