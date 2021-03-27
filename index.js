let playing = false;
let score;
let action;
let timeremaining;
let correctAnswer;

let startRest = document.getElementById('startreset');
let scoreValue = document.getElementById("scorevalue");
let timeremainingValue= document.getElementById("timeremainingvalue");

startRest.addEventListener('click',()=>{

  //   IF WE ARE PLAYING

  if (playing == true) {
    location.reload(); //RELOAD PAGE
  } else {
    //CHANGE MODE TO PLAYING

    playing = true;

    //SET SCORE TO 0

    score = 0;
    scoreValue.innerHTML = score;

    //SHOW COUNTDOWN BOX

    show("timeremaining");

    timeremaining = 60;
    timeremainingValue.innerHTML = timeremaining;

    // HIDE GAME OVER BOX
    hide("gameOver");

    //change button to reset
    startRest.innerHTML = "Reset Game";

    //START COUNTDOWN

    startCountdown();

    //GENERATE A NEW Q&A

    generateQA();
  }
});

  


for (i = 1; i < 5; i++) {
  //CLICKING ON AN ANSWER BOX
    const box = document.getElementById("box" + i) 
    box.addEventListener('click',(e)=>{
      if (playing == true) {
        //YES
        //CORRECT ANSWER
        if ( e.target.innerHTML == correctAnswer) {
          correct()
          //INCREASE SCORE BY 1
          score++;
          scoreValue.innerHTML = score;
          //HIDE WRONG BOX AND SHOW CORRECT BOX
          hide("wrong");
          show("correct");
          setTimeout(() =>{
            hide("correct");
          }, 1000);
  
          //GENERATE NEW Q&A
  
          generateQA();
        } else {
          wrong()
          hide("correct");
          show("wrong");
          setTimeout(() =>{
            hide("wrong");
          }, 1000);
        }
      }
    })
   
  };
  const correct =() =>{
    let audio = new Audio('/audio/correct.mp3');
    audio.play()
  }
  
  const wrong =() =>{
    let audio = new Audio('/audio/wrong.mp3');
    audio.play()
  }
  
  const startCountdown = () =>{
  action = setInterval(() =>{
    timeremaining -= 1;
    timeremainingValue.innerHTML = timeremaining;
    if (timeremaining == 0){
      stopCountdown();
      show("gameOver");
      document.getElementById("gameOver").innerHTML =
        "<p>Game over!</p><p>Your score is " + score + ".</p>";
      hide("timeremaining");
      hide("correct");
      hide("wrong");
      playing = false;
      startRest.innerHTML = "Start Game";
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
