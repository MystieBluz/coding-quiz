// Elements
const quiz = document.getElementById("quiz");
const quizQuestions = document.getElementById("quizQuestions");
const quizChocies = document.getElementById("quizChoices");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");



// Questions with Choices and Answer for Quiz
let questions = [
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


const lastQuestion = questions.length - 1;

let firstQuestion = 0;

// Render Questions
function renderQuestion() {
    let q = questions[firstQuestion];

    questions.innerHTML = "<p>"+ q.questions +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB
}

// Start Quiz Button
function startQuizBtn() {
    var counter = 65;
    setInterval(function(){
        counter--;
        if (counter >= 0) {
             span = document.getElementById("count"); span.innerHTML = counter;
        }
        if (counter === 0) {
            alert('Quiz Completed!')
            clearInterval(counter);
        }
    }, 1000);
};

