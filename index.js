let playing = false;
let score;
let action;
let timeremaining;
let correctAnswer;

let startRest = document.getElementById('startreset');
let scoreValue = document.getElementById("scorevalue");
let timeremainingValue= document.getElementById("timeremainingvalue");
let gameOver = document.getElementById('gameOver');
let question = document.getElementById('question');

startRest.addEventListener('click',()=>{//IF WE CLICK ON THE START RESET BUTTON
    if (playing == true) { //IF WE ARE PLAYING
      location.reload(); //THIS SYNTAX RELOADS THE PAGE IF WE ARE ALREADY PLAYING
    } else { //  IF WE ARE NOT PLAYING

      playing = true; //CHANGE MOOD TO PLAYING

      score = 0; //SET SCORE TO 0
      scoreValue.innerHTML = score; //SET THE INNERHTML OF THIS ELEMENT TO THE SCORE VALE
      show("timeremaining");//SHOW COUNTDOWN BOX

      timeremaining = 60; // SET AN INITIAL VALUE FOR THIS VARIABLE
      timeremainingValue.innerHTML = timeremaining;//SET THE INNERHTML OF THIS ELEMENT TO THE TIMEREMAINING VALUE

      hide("gameOver"); // HIDE GAME OVER BOX

      startRest.innerHTML = "Reset Game"; //CHANGE BUTTON TO RESET 

      startCountdown();   //START COUNTDOWN

      generateQA();  //GENERATE A NEW Q&A
   }
});

  


for (i = 1; i < 5; i++) { // FORLOOP ENABLES USER TO CLICK ANY BOX TO CHOOSE ANSWER
  const box = document.getElementById("box" + i)   //CLICKING ON AN ANSWER BOX
    box.addEventListener('click',(e)=>{
      if (playing == true) { //CHECK IF WE ARE PLAYING
          if ( e.target.innerHTML == correctAnswer) { //CORRECT ANSWER
          correct()  // TRIGGERS CORRECT ANSWER AUDIO
          score++;  //INCREASE SCORE BY 1
          scoreValue.innerHTML = score; //SET THE ELEMENT TO THE UPDATED VALUE OF SCORE

        //HIDE WRONG BOX AND SHOW CORRECT BOX
          hide("wrong");
          show("correct");

          setTimeout(() =>{ //HIDE THE CORRECT BOX AFTER 1 SECOND
            hide("correct");
          }, 1000);
  
        generateQA();   //GENERATE NEW Q&A ONLY IF ANSWER IS CORRECT
        } else { //IF USER CLICK WRONG ANSWER

          //SHOW WRONG BOX AND HIDE CORRECT BOX
          wrong() //TRIGGERS WRONG ANSWER AUDIO
          hide("correct");
          show("wrong");

          setTimeout(() =>{//HIDE THE WRONG BOX AFTER 1 SECOND
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
  //COUNTDOWN FUNCTION
  const startCountdown = () =>{
    action = setInterval(() =>{ //STORE VALUE OF SET INTERVAL IN ACTION VARIABLE
    timeremaining -= 1;         //REDUCE THE TIME BY 1
    timeremainingValue.innerHTML = timeremaining; //AGAIN SET THE INNERHTML OF THIS ELEMENT TO THE TIMEREMAINING VALUE
    if (timeremaining == 0){ // CONDITION THAT CHECK WHEN TIMEREMAINING IS EQUAL TO 0(GAME OVER).
      stopCountdown();      //INVOKE  FUNCTION THAT STOPS COUNTDOWN WHEN IT REACHES 0
      show("gameOver");     //SHOW THE GAME OVER DIV ONCE GAME IS FINISHED
      gameOver.innerHTML =  // ADD INNERHTML TO THE GAME OVER DIV WHEN GAME IS FINISHED.
        `<p>Game over!</p><p>Your score is ${score} .</p>`;

      //USE HIDE FUNCTION TO HIDE FOLLOWING BOXES
      hide("timeremaining");  
      hide("correct");
      hide("wrong");

      playing = false;  // CHANGE GAME MODE TO FALSE BACK TO THE INITIAL CODE
      startRest.innerHTML = "Start Game"; // CHANGE BUTTON BACK TO ITS INITIAL STATE WHEN GAME FINISHES
    }
  }, 1000); //DURATION IN MILLSECONDS
}
//STOP COUNTER FUNCTION
const stopCountdown = () => {
  clearInterval(action);
}

const show = id => document.getElementById(id).style.display = "block"; // FUNCTION THAT SHOWS ELEMENT

const hide = id =>document.getElementById(id).style.display = "none"; // FUNCTION THAT HIDES ELEMENT

//GENERATE QUESTIONS AND MULTIPLE ANSWERS
const generateQA = () =>{    
  let x = 1 + Math.round(9 * Math.random()); //GENERATE A NUMBER BETWEEN 1-10 AND STORE IT IN X
  let y = 1 + Math.round(9 * Math.random()); //GENERATE A NUMBER BETWEEN 1-10 AND STORE IT IN Y
  correctAnswer = x * y; //STORE THE PRODUCT OF X & Y IN A VARIABLE CALLED CORRECT ANSWER
  question.innerHTML = `${x}x${y}` ; //CHANGE THE INNERHTML TO THE X & Y VALUE
  let correctPosition = 1 + Math.round(3 * Math.random()); // GENERATE RANDOM NUMBER BETWEEN 1-4
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //FILL OTHER BOXES WITH WRONG ANSWERS

  let answers = [correctAnswer]; // CREATE AN ARRAY  OF UNIQUE  ANSWERS

// FILL OTHER BOXES WITH WRONG ANSWERS
  for (i = 1; i < 5; i++) {
    if (i != correctPosition) { //CHECK IF BOX HAS THE CORRECT ANSWER
      let wrongAnswer; //CREATE A VARIABLE CALLED WRONG ANSWER
      do { // DO WHILE MAKE SURE THE CODE IS EXECUTED ATLEAST ONE TIME
        wrongAnswer =
          (1 + Math.round(9 * Math.random())) *
          (1 + Math.round(9 * Math.random())); //GENERATE NUMBER UNTIL IT DIFFERS FROM CORRECT ANSWER
      } while (answers.indexOf(wrongAnswer) > -1); // CHECK IF THE INDEX OF WRONG ANS IN ARRAY IS > -1
      document.getElementById("box" + i).innerHTML = wrongAnswer; //POPULATE BOX WITH UNIQUE WRONG ANSWER
      answers.push(wrongAnswer); // PUSH THE UNIQUE WRONG ANSWER TO THE ANSWERS ARRAY
    }
  }
}
