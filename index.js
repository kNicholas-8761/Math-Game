var playing = false;
var score;

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



  }
};
