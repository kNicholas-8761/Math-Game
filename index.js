let playing = false;
let score;
let action;
let timeremaining;
let correctAnswer;

document.getElementById("startreset").onclick = () =>{
  
  //   IF WE ARE PLAYING

  if (playing == true) {
    location.reload(); //RELOAD PAGE
  } else {
    //CHANGE MODE TO PLAYING

    playing = true;

    //SET SCORE TO 0

    score = 0;
    document.getElementById("scorevalue").innerHTML = score;

    //SHOW COUNTDOWN BOX

    show("timeremaining");

    timeremaining = 60;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;

    // HIDE GAME OVER BOX
    hide("gameOver");

    //change button to reset
    document.getElementById("startreset").innerHTML = "Reset Game";

    //START COUNTDOWN

    startCountdown();

    //GENERATE A NEW Q&A

    generateQA();
  }
};
for (i = 1; i < 5; i++) {
  //CLICKING ON AN ANSWER BOX
    const box = document.getElementById("box" + i) 
    box.addEventListener('click',(e)=>{
      if (playing == true) {
        //YES
        if ( e.target.innerHTML == correctAnswer) {
          //CORRECT ANSWER
  
          //INCREASE SCORE BY 1
          score++;
          document.getElementById("scorevalue").innerHTML = score;
          //HIDE WRONG BOX AND SHOW CORRECT BOX
          hide("wrong");
          show("correct");
          setTimeout(() =>{
            hide("correct");
          }, 1000);
  
          //GENERATE NEW Q&A
  
          generateQA();
        } else {
          hide("correct");
          show("wrong");
          setTimeout(() =>{
            hide("wrong");
          }, 1000);
        }
      }
    })
   
  };


  const startCountdown = () =>{
  action = setInterval(() =>{
    timeremaining -= 1;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;
    if (timeremaining == 0){
      stopCountdown();
      show("gameOver");
      document.getElementById("gameOver").innerHTML =
        "<p>Game over!</p><p>Your score is " + score + ".</p>";
      hide("timeremaining");
      hide("correct");
      hide("wrong");
      playing = false;
      document.getElementById("startreset").innerHTML = "Start Game";
    }
  }, 1000);
}

const stopCountdown = () => {
  clearInterval(action);
}

const show = id => document.getElementById(id).style.display = "block";

const hide = (id) =>document.getElementById(id).style.display = "none";


const generateQA = () =>{
  let x = 1 + Math.round(9 * Math.random());
  let y = 1 + Math.round(9 * Math.random());
  correctAnswer = x * y;
  document.getElementById("question").innerHTML = x + "x" + y;
  let correctPosition = 1 + Math.round(3 * Math.random());
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer;

  //FILL OTHER BOXES WITH WRONG ANSWERS

  let answers = [correctAnswer];

  for (i = 1; i < 5; i++) {
    if (i != correctPosition) {
      let wrongAnswer;
      do {
        wrongAnswer =
          (1 + Math.round(9 * Math.random())) *
          (1 + Math.round(9 * Math.random()));
      } while (answers.indexOf(wrongAnswer) > -1);
      document.getElementById("box" + i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}
