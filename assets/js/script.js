// Bring in all elements that require JS to be added or manipulated
var questionArea = document.querySelector('.questions');
var answerArea = document.querySelector('.answers');
var feedbackArea = document.querySelector('.answerCheck');
var feedback = document.querySelector('.feedback');
var finish = document.querySelector('.allDone');
var startArea = document.querySelector('.start');
var reset = document.querySelector('.reset');
var finalScore = document.querySelector('.score');
var initialsEl = document.querySelector('.initials');
var highScoreArea = document.querySelector('.highScores');
var highScoreList = document.querySelector('.listHighScores');
var highScoreLink = document.querySelector('.highScoreLink');
var startBtn = document.querySelector('.start-button');
var submitInit = document.querySelector('.submitInitial');
var goBackBtn = document.querySelector('.go-back');
var clearBtn = document.querySelector('.clear');
var timerEl = document.querySelector('.timer'); 
var errorMessage = document.querySelector('.error');
var current = 0;
var timer;
var timerCount;
var numQuestions;

// Add questions to the object allQuestions
var allQuestions = {
    'Inside which HTML element do we put the JavaScript' : ['<javascript>', '<scripting>', '<script>', '<js>', 2],
    
    'Where is the correct place to insert a JavaScript?' : ['The <body> section', 'Both the <head> section and the <body> section are correct' , 'The <head> section', 1],
    
    'What is the correct syntax for referring to an external script called xxx.js? ' : ['<script src="xxx.js">', '<script name="xxx.js">', '<script href="xxx.js">', 0],

    'The external JavaScript file must contain the <script> tags' : ['True', 'False', 1],

    'How do you create a function in JavaScript?' : ['function myFunction()', 'function = myFunction()', 'function:myFunction()', 0]
  };
  
  // gets the number of questions in the object allQuestions
  numQuestions = Object.keys(allQuestions).length;

  // A function that takes the answer given by the user and the array of answers and returns correct or wrong depending on if the answer matches
  // the actual answer for the question.
  function checkAnswer(i, arr) {
    
    return function () {
      var givenAnswer = i;
      correctAnswer = arr[arr.length-1];
      //validates the answer and determines if the answer is correct or not.  Also advances current and checks to see if the quiz is over.
      if (givenAnswer === correctAnswer) {
        feedback.textContent = "Correct!";
        current++;
        if (current > numQuestions-1){
          gameOver(timerCount);
          clearInterval(timer);
        } else {
          loadQuestion(current);
          loadAnswer(current);
        }
        //handles the wrong answer
      } else {
        feedback.textContent = "Wrong!"
        timerCount = timerCount - 10;
        current++;
        if (current > numQuestions-1){
          gameOver(timerCount);
          clearInterval(timer);
        } else {
          loadQuestion(current);
          loadAnswer(current);
        }
      }
    };
  }

  // A function that handles the game over scenario.  Opens the area to allow the user to enter their initials.
  function gameOver(score){
    questionArea.setAttribute("style", "display: none;");
    answerArea.setAttribute("style", "display: none;");
    
    // Checks to make sure the score is not negative
    if (score <= 0){
      finalScore.textContent = 0;
    } else {
      finalScore.textContent = score;
    }
    toggleFinish(true)
    timerEl.textContent = 0;
  }

  // Loads the question to the screen
  function loadQuestion(curr) {
    var question = Object.keys(allQuestions)[current];
    console.log(question);

    questionArea.innerHTML = '';
    questionArea.innerHTML = question;
  }
  
  //Loads the answers to the screen
  function loadAnswer(curr) {
    //Gets the answers from the allQuestions object
    var answers = allQuestions[Object.keys(allQuestions)[current]];

    answerArea.innerHTML = '';
    //Cycles through the answers and creates elements to place to the screen
    for (var i = 0; i < answers.length -1; i += 1) {
      console.log(answers[i]);
      var createDiv = document.createElement("div");
      choiceText = (i +1) + ". " + answers[i] 
      text = document.createTextNode(choiceText);

      createDiv.appendChild(text);
      createDiv.addEventListener("click", checkAnswer(i, answers));

      answerArea.appendChild(createDiv);
  }
}

// A function that loads and starts the timer.  Added functionality to handle when the timer is zero.
function startTimer(){
  timer = setInterval(function() {
    timerCount--;
    timerEl.textContent = timerCount;
    if (timerCount <= 0){
      clearInterval(timer);
      gameOver(0);
    }
  }, 1000);
}

// A function that starts the game.
function startGame() {
  current = 0;
  initialsEl.value = '';
  errorMessage.innerHTML = '';
  feedback.innerHTML = '';
  timerCount = 60;
  setGameBoard();
  startTimer();
  loadQuestion();
  loadAnswer();
}

//A function that adds the high score to local storage when the initials are entered.
function addHighScore(){
    //checks to see if the user entered something in the textbox.  If not display a message and do not proceed until the intiials are entered.
    if (initialsEl.value === '') {
      errorMessage.innerHTML = "Please enter your initials.";
      errorMessage.setAttribute("style", "display:block;");
      return;
    }

    var score = finalScore.textContent;
    var initHighScore = initialsEl.value;
    var storedScores = localStorage.getItem("highScores");
    let highScore = {"initial": initHighScore, "score": score.valueOf()};
    // if this is the first element to be added
    if (storedScores === null){
      var topScores = [];
      topScores.push(highScore);
      localStorage.setItem("highScores", JSON.stringify(topScores));
      
    } else {  // if there are other elements in local storage
      var topScores = JSON.parse(localStorage.getItem("highScores"));
      console.log(topScores);
      topScores.push(highScore);
      console.log(topScores);
      localStorage.setItem("highScores", JSON.stringify(topScores));
    }
    //proceed to view high scores.
    getHighScores();
    showHighScoreList();
    current = 0;
}

// A function that renders the high scores to the screen
function renderHighScores(storedScores) {
  console.log("rendered", storedScores);
  if (storedScores === null){
    highScoreList.innerHTML = '';
    return;
  }

  highScoreList.innerHTML = '';
  for (var i=0;i<storedScores.length;i++) {
    console.log(i);
    var listDiv = document.createElement('div');
    listDiv.textContent = (i+1) + ". " + storedScores[i].initial + " - " + storedScores[i].score;

    highScoreList.appendChild(listDiv);
  }

}

//A function that get's the high scores from Local Storage and passes it to the function to render the scores.
function getHighScores() {
  var storedScores = JSON.parse(localStorage.getItem("highScores"));
  renderHighScores(storedScores);
}


// A series of helper functions to toggle the various sections to display or not.

// Toggle the start section
function toggleStart(option) {
  if (option)
  {
    startArea.setAttribute("style", "display: block;");
  } else {
    startArea.setAttribute("style", "display: none;");
  }
}

// Toggle the game section and play
function toggleGame(option) {
  if (option) {
    questionArea.setAttribute("style", "display: block;");
    answerArea.setAttribute("style", "display: block;");
    feedbackArea.setAttribute("style", "display: block;");
  } else {
    questionArea.setAttribute("style", "display: none;");
    answerArea.setAttribute("style", "display: none;");
    feedbackArea.setAttribute("style", "display: none;");
  }
}

//Toggle the section that displays the final score and collects the initals
function toggleFinish(option) {
  if (option) {
    finish.setAttribute("style", "display: block;");
  } else {
    finish.setAttribute("style", "display: none;");
  }
}

//Toggles the section that displays the High score list.
function toggleHighScore(option) {
  if (option) {
    highScoreArea.setAttribute("style", "display:block;");
  } else {
    highScoreArea.setAttribute("style", "display:none;");
  }
}

// A function that manages the button click "Go Back"
function goBack() {
  current = 0;
  toggleStart(true);
  toggleGame(false);
  toggleFinish(false);
  toggleHighScore(false);

}

// A function that manages the button click to start the quiz
function setGameBoard () {
  toggleStart(false);
  toggleGame(true);
  toggleFinish(false);
  toggleHighScore(false);
}

// A function that manages the display of the High Score List
function showHighScoreList() {
  clearInterval(timer);
  timerEl.textContent = '60';
  toggleStart(false);
  toggleGame(false);
  toggleFinish(false);
  toggleHighScore(true);
}

// A function that clear's the scores from local storage
function clearScores() {
  localStorage.clear("highScores");
  getHighScores();
}


// A function to initalize the application
function init() {
  current = 0;
  feedback.innerHTML = '';
  toggleGame(false);
  toggleFinish(false);
  toggleHighScore(false);
  getHighScores();
}

// Event Listeners
startBtn.addEventListener("click", startGame);
highScoreLink.addEventListener("click", showHighScoreList);
goBackBtn.addEventListener("click", goBack);
clearBtn.addEventListener("click", clearScores);
submitInit.addEventListener("click", addHighScore);

// Start the application
init();