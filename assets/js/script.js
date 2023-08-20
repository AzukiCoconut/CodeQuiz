var questionArea = document.querySelector('.questions');
var answerArea = document.querySelector('.answers');
var feedbackArea = document.querySelector('.answerCheck');
var feedback = document.querySelector('.feedback');
var finish = document.querySelector('.allDone');
var gameOverEl = document.querySelector('.GameOver');
var startArea = document.querySelector('.start');
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
var current = 0;
var timer;
var timerCount;
var numQuestions;

var allQuestions = {
    'What is Canada\'s national animal?' : ['Beaver', 'Duck', 'Horse', 0],
    
    'What is converted into alcohol during brewing?' : ['Grain', 'Sugar' , 'Water', 1],
    
    'In what year was Prince Andrew born? ' : ['1955', '1960', '1970', 1]
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
    toggleFinish(true);
    finalScore.textContent = score;

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

function loseGame() {
  toggleStart(false);
  toggleGame(false);
  toggleFinish(false);
  toggleHighScore(false);
  toggleGameOver(true);
}
function startTimer(){
  timer = setInterval(function() {
    timerCount--;
    timerEl.textContent = timerCount;
    if (timerCount === 0){
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}

function startGame() {
  feedback.innerHTML = '';
  timerCount = 60;
  setGameBoard();
  startTimer();
  loadQuestion();
  loadAnswer();
}
function addHighScore(){
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
  var orderedList = document.createElement('ol');
  for (var i=0;i<storedScores.length;i++) {
    console.log(i);
    var listItem = document.createElement('li');
    listItem.textContent = storedScores[i].initial + " - " + storedScores[i].score;

    orderedList.appendChild(listItem);
  }
  highScoreList.appendChild(orderedList);
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

init();