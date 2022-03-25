// Gathering HTML elements for manipulation
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Questions with Choices and Answer for Quiz
var quizQuestions = [
    {
        question : "Commonly used data types DO NOT include:",
        choiceA : "strings", 
        choiceB : "booleans", 
        choiceC : "alerts", 
        choiceD : "numbers",
        correct : "C"
    },
    {
        question : "The condition in an if / else statement is enclosed within ____.",
        choiceA : "quotes", 
        choiceB : "curly brackets", 
        choiceC : "parentheses", 
        choiceD : "square brackets",
        correct: "C"
    },
    {
        question: "Arrays in Javascript can be used to store ____.",
        choiceA: "numbers and strings", 
        choiceB : "other arrays", 
        choiceC :"booleans", 
        choiceD : "all of the above",
        correct: "D"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choiceA : "commas", 
        choiceB : "curly brackets", 
        choiceC : "quotes", 
        choiceD : "parenthesis",
        correct: "C"
    },
    {
        question: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choiceA : "Javascript",
        choiceB :  "terminal / bash", 
        choiceC : "for loops", 
        choiceD : "console log",
        correct: "D"
    },
];

// Other global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 65;
var timerInterval;
var score = 0;
var correct;

// This function cycles through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// This function checks the response to each answer 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    }else{
        showScore();
    }
}

// This button starts the quiz!
startQuizButton.addEventListener("click",startQuiz);
