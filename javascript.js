// Gloabl Variables
var introPageEl = document.getElementById("introPage");
var quizCountdownEl = document.getElementById("countdown");
var quizEl = document.getElementById("quizPage");
var resultsEl = document.getElementById("result");
var userScoreEl = document.getElementById("userScore");
var quizCompleteEl = document.getElementById("quizComplete");
var questionsEl = document.getElementById("questionsPage");
var startQuizBtnEl = document.getElementById("startQuizBtn2");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitBtnEl = document.getElementById("submitBtn");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Quiz questions with choices and answers
var quizQuestions = [ {
    
    question: "Commonly used data types DO NOT include:",
    choiceA: "strings",
    choiceB: "booleans",
    choiceC: "alerts",
    choiceD: "numbers",
    correctAnswer: "c"},
  {
    question: "The condition in an if / else statement is enclosed within ____.",
    choiceA: "parentheses",
    choiceB: "curly brackets",
    choiceC: "quotes",
    choiceD: "square brackets",
    correctAnswer: "a"},
   {
    question: "Arrays in Javascript can be used to store ____.",
    choiceA: "numbers and strings",
    choiceB: "other arrays",
    choiceC: "booleans",
    choiceD: "all of the above",
    correctAnswer: "d"},
    {
    question: "String values must be enclosed within ____ when being assigned to variables.",
    choiceA: "commas",
    choiceB: "curly brackets",
    choiceC: "parentheses",
    choiceD: "quotes",
    correctAnswer: "d"},
    {
    question: "A very useful tool for used during development and debugging for printing content to the debugger is:",
    choiceA: "console log",
    choiceB: "terminal / bash",
    choiceC: "for loops",
    choiceD: "Javascript",
    correctAnswer: "a"},  
    {  
    question: "What does HTML stand for?",
    choiceA: "Cascading Style Sheet",
    choiceB: "Hungry Tommy Made Lasagna",
    choiceC: "Hypertext Markup Language",
    choiceD: "Document Object Method",
    correctAnswer: "c"},     
];


// Gloabl Variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeRemaining = 65;
var timerInterval;
var score = 0;
var correct;

// Renders questions and choices
function generateQuizQuestion(){
    quizCompleteEl.style.display = "none";
    if (currentQuestionIndex == finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;

};
 

// Starts the quiz and starts the timer -- **Figure out how to decrement time for incorrect answer by 10 seconds
function startQuiz(){
    quizCompleteEl.style.display = "none";
    introPageEl.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeRemaining--;
        quizCountdownEl.textContent = "Time left: " + timeRemaining;
    
        if(timeRemaining === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizEl.style.display = "block";
}
// Quiz completed and shows user's score
function showScore(){
    quizEl.style.display = "none"
    quizCompleteEl.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    userScoreEl.innerHTML = "Your final score is " + score;
}

// Submit button section allows user to enter intials and save intials and score
submitBtnEl.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        quizCompleteEl.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// Generates the high scores list
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// View High Score Page
function showHighscore(){
    introPageEl.style.display = "none"
    quizCompleteEl.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// Clears high score page
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// Allow user to Go Back to Intro Page
function goBack(){
    highscoreContainer.style.display = "none";
    quizCompleteEl.style.display = "none";
    introPageEl.style.display = "flex";
    timeRemaining = 65;
    score = 0;
    currentQuestionIndex = 0;
}

// Check the answer to determine if correct or incorrect and displays in alert message
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("Correct");
        currentQuestionIndex++;
        generateQuizQuestion();
        
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex)
    {
        // Decerements time when incorrect answer is chosen
        timeRemaining = timeRemaining - 10;
        alert("Incorrect")
        currentQuestionIndex++;
        generateQuizQuestion();
        
    }else 
    {
        showScore();
    }
}

// Starts the quiz
startQuizBtnEl.addEventListener("click",startQuiz);