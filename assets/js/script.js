var questionArea = document.querySelector('.questions');
var answerArea = document.querySelector('.answers');
var feedbackArea = document.querySelector('.answerCheck');
var feedback = document.querySelector('.feedback');
var finish = document.querySelector('.allDone');
var gameOverEl = document.querySelector('.GameOver');
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

var allQuestions = {
    'Inside which HTML element do we put the JavaScript' : ['<javascript>', '<scripting>', '<script>', '<js>', 2],
    
    'Where is the correct place to insert a JavaScript?' : ['The <body> section', 'Both the <head> section and the <body> section are correct' , 'The <head> section', 1],
    
    'What is the correct syntax for referring to an external script called xxx.js? ' : ['<script src="xxx.js">', '<script name="xxx.js">', '<script href="xxx.js">', 0],

    'The external JavaScript file must contain the <script> tags' : ['True', 'False', 1],

    'How do you create a function in JavaScript?' : ['function myFunction()', 'function = myFunction()', 'function:myFunction()', 0]
  };
  
  numQuestions = Object.keys(allQuestions).length;

  function checkAnswer(i, arr) {
    
    return function () {
      var givenAnswer = i;
      correctAnswer = arr[arr.length-1];

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

  function gameOver(score){
    questionArea.setAttribute("style", "display: none;");
    answerArea.setAttribute("style", "display: none;");
    
    if (score <= 0){
      finalScore.textContent = 0;
    } else {
      finalScore.textContent = score;
    }
    toggleFinish(true)
    timerEl.textContent = 0;
  }

  function loadQuestion(curr) {
    var question = Object.keys(allQuestions)[current];
    console.log(question);

    questionArea.innerHTML = '';
    questionArea.innerHTML = question;
  }
  
  function loadAnswer(curr) {

    var answers = allQuestions[Object.keys(allQuestions)[current]];

    answerArea.innerHTML = '';

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
function addHighScore(){
    if (initialsEl.value === '') {
      errorMessage.innerHTML = "Please enter your initials.";
      errorMessage.setAttribute("style", "display:block;");
      return;
    }
    var score = finalScore.textContent;
    var initHighScore = initialsEl.value;
    var storedScores = localStorage.getItem("highScores");
    let highScore = {"initial": initHighScore, "score": score.valueOf()};
    if (storedScores === null){
      var topScores = [];
      topScores.push(highScore);
      localStorage.setItem("highScores", JSON.stringify(topScores));
      
    } else {
      var topScores = JSON.parse(localStorage.getItem("highScores"));
      console.log(topScores);
      topScores.push(highScore);
      console.log(topScores);
      localStorage.setItem("highScores", JSON.stringify(topScores));
    }
    getHighScores();
    showHighScoreList();
    current = 0;
}

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

function getHighScores() {
  var storedScores = JSON.parse(localStorage.getItem("highScores"));
  renderHighScores(storedScores);
}

function toggleStart(option) {
  if (option)
  {
    startArea.setAttribute("style", "display: block;");
  } else {
    startArea.setAttribute("style", "display: none;");
  }
}

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

function toggleFinish(option) {
  if (option) {
    finish.setAttribute("style", "display: block;");
  } else {
    finish.setAttribute("style", "display: none;");
  }
}

function toggleHighScore(option) {
  if (option) {
    highScoreArea.setAttribute("style", "display:block;");
  } else {
    highScoreArea.setAttribute("style", "display:none;");
  }
}

function toggleGameOver(option){
  if (option) {
    gameOverEl.setAttribute("style", "display:block;");
  } else {
    gameOverEl.setAttribute("style", "display: none;");
  }
}

function goBack() {
  current = 0;
  toggleStart(true);
  toggleGame(false);
  toggleFinish(false);
  toggleHighScore(false);
  toggleGameOver(false);
}

function setGameBoard () {
  toggleStart(false);
  toggleGame(true);
  toggleFinish(false);
  toggleHighScore(false);
  toggleGameOver(false);
}

function showHighScoreList() {
  clearInterval(timer);
  timerEl.textContent = '60';
  toggleStart(false);
  toggleGame(false);
  toggleFinish(false);
  toggleHighScore(true);
  toggleGameOver(false);
}

function clearScores() {
  localStorage.clear("highScores");
  getHighScores();
}

function init() {
  current = 0;
  feedback.innerHTML = '';
  toggleGame(false);
  toggleFinish(false);
  toggleHighScore(false);
  getHighScores();
}

startBtn.addEventListener("click", startGame);
highScoreLink.addEventListener("click", showHighScoreList);
goBackBtn.addEventListener("click", goBack);
clearBtn.addEventListener("click", clearScores);
submitInit.addEventListener("click", addHighScore);
reset.addEventListener("click", goBack);

init();