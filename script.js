  let questions = [{
    title: "Who invented the Golden Gun?",
    choices: ["Shin Malphur", "Dredgen Yor", "Nicolas Cage", "Cayde-6"],
    answer: "Shin Malphur"
},
{
    title: "Who voices Cayde-6?",
    choices: ["Robert Downey Jr.", "Tom Cruise", "Nathan Fillion", "Jaret Leto"],
    answer: "Nathan Fillion"
},
{
    title: "How many subclasses are there currently in game?",
    choices: ["4", "2", "8", "None of the above."],
    answer: "4"
},
{
    title: "What was 'The Crows' previous identity?",
    choices: ["Gilgamesh", "Shin Malfur", "Morbius", "Uldren Sov"],
    answer: "Uldren Sov"
},
{
    title: "What 3 characters were the original siblins from the planet Fundament?",
    choices: ["Morbius, Dr. Morbius and Morbo", "Xivu Arath, Aurash and Sathona", "Ironman, Captain America and Dr. Strange", "Ben, Josh and Zach"],
    answer: "Xivu Arath, Aurash and Sathona"
}
]

let score = 0;
let currentQuestion = -1;
let timeLeft = 0;
let timer;

function start() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

function endGame() {
clearInterval(timer);
let quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;
document.getElementById("quizBody").innerHTML = quizContent;
}

function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}

function getScore() {
let quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 
<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>`;
document.getElementById("quizBody").innerHTML = quizContent;
}

function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");
resetGame();
}

function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

let quizContent = `
<h1>
    Destiny 2 Quiz!
</h1>
<h3>
    Click to play!   
</h3>
<button onclick="start()">Start!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

function incorrect() {
timeLeft -= 15; 
next();
}

function correct() {
score += 20;
next();
}

function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

let quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (let buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    let buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
}

document.getElementById("quizBody").innerHTML = quizContent;
}
