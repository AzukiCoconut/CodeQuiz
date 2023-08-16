var questionArea = document.querySelector('.questions');
var answerArea = document.querySelector('.answers');
var feedbackArea = document.querySelector('.answerCheck');
var feedback = document.querySelector('.feedback');
var finish = document.querySelector('.allDone');
var startArea = document.querySelector('.start');
var highScoreArea = document.querySelector('.highScores');
var highScoreList = document.querySelector('.listHighScores');
var highScoreLink = document.querySelector('.highScoreLink');
var startBtn = document.querySelector('.start-button');
var goBackBtn = document.querySelector('.go-back');
var clearBtn = document.querySelector('.clear');
var current = 0;
var highScores = [{initial: "MT", score: 25}];
localStorage.setItem("highScores", JSON.stringify(highScores));


var allQuestions = {
    'What is Canada\'s national animal?' : ['Beaver', 'Duck', 'Horse', 0],
    
    'What is converted into alcohol during brewing?' : ['Grain', 'Sugar' , 'Water', 1],
    
    'In what year was Prince Andrew born? ' : ['1955', '1960', '1970', 1]
  };

  function checkAnswer(i, arr) {
    
    return function () {
      var givenAnswer = i;
      correctAnswer = arr[arr.length-1];

      if (givenAnswer === correctAnswer) {
        feedback.textContent = "Correct!";
      }
      else {
        feedback.textContent = "Wrong!";
      }
    };
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

function startGame() {
  setGameBoard();
  // setTimer();
  loadQuestion();
  loadAnswer();
}

function renderHighScores(storedScores) {
  if (storedScores === null){
    highScoreList.innerHTML = '';
    return;
  }
  
  highScoreList.innerHTML = '';
  var orderedList = document.createElement('ol');
  for (var i=0;i<storedScores.length;i++) {
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

function goBack() {
  toggleStart(true);
  toggleGame(false);
  toggleFinish(false);
  toggleHighScore(false);
}

function setGameBoard () {
  toggleStart(false);
  toggleGame(true);
  toggleFinish(false);
  toggleHighScore(false);
}

function showHighScoreList() {
  toggleStart(false);
  toggleGame(false);
  toggleFinish(false);
  toggleHighScore(true);
}

function clearScores() {
  localStorage.clear("highScores");
  getHighScores();
}

function init() {
  toggleGame(false);
  toggleFinish(false);
  toggleHighScore(false);
  getHighScores();
}

startBtn.addEventListener("click", startGame);
highScoreLink.addEventListener("click", showHighScoreList);
goBackBtn.addEventListener("click", goBack);
clearBtn.addEventListener("click", clearScores);

init();