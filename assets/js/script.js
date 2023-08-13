var allQuestions = {
    'What is Canada\'s national animal?' : ['Beaver', 'Duck', 'Horse', 0],
    
    'What is converted into alcohol during brewing?' : ['Grain', 'Sugar' , 'Water', 1],
    
    'In what year was Prince Andrew born? ' : ['1955', '1960', '1970', 1]
  };

  var question = Object.keys(allQuestions)[0];
console.log(question);
  var answers = allQuestions[Object.keys(allQuestions)[0]];
console.log(answers);

for (var i = 0; i < answers.length -1; i += 1) {
    console.log(answers[i]);
}