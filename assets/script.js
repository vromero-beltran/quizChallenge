var timeLeft = 60; //Setting the timer seconds.
var timeInterval;
var question = [
    {
        question:"What is the color of the sun when it is cool hot?",
        option:["White","Blue","Red","Yellow"],
        answer: 0
    },
    {
        question:"What is the color of the sun when it is medium hot?",
        option:["Blue","Red","Yellow","White"],
        answer: 0
    },
    {
        question:"What is the color of the sun when it is very hot?",
        option:["Yellow","Blue","White","Red"],
        answer: 0
    },
    {
        question:"When looking at the Sun from Earth, What color is it? (Please don't stare at the Sun.)",
        option:["White","Yellow","Red","Blue"],
        answer: 0
    },
    {
        question:"When a painter wants to use a cooler colored paint, what color is that?",
        option:["Red","White","Blue","Yellow"],
        answer: 0
    },
    {
        question:"What color scatters the least from the sunlight when it hits the atmosphere?",
        option:["Blue","Red","Violet","Green"],
        answer: 0
    },
    {
        question:"When sunlight hits the atmosphere the shortest wavelengthsare scattered the most, what color is scattered the most but you don't see it in the atmosphere?",
        option:["Green","Orange","Endigo","Violet"],
        answer: 0
    },
    {
        qusetion:"What color light travels to least in the dark?",
        option:["Blue","Red","Yellow","Orange"],
        answer: 0
    },
    {
        question:"What color light helps you stay up in the dark?",
        option:["Red","Green","Blue","Yellow"],
        answer: 0
    },
    {
        question:"What wavelength of light does grass not absorb as energy",
        option:["Blue Wavelength","Violet Wavelength","Endigo Wavelength","Green Wavelength"],
        answer: 0
    }
];
var currentQuestion = 0;
var score = 0;
var startBtn = document.getElementById("start-btn");
var restartBtn = document.getElementById("restart-btn");
var submitBtn = document.getElementById("submit-btn");
var initialsInput = document.getElementById("initials-inout");

function startQuiz() { //This function starts the time and shows the questions.
    startBtn.style.display = "none";
    timeInterval = setInterval(updateTime, 1000);
    showQuestion();
    startBtn.addEventListener("click", startQuiz);
}

function showQuestion() {
    var questionElement = document.getElementById("question");
    var optionElement = document.getElementById("option");
    questionElement.textContent = question[currentQuestion].question;
    optionElement.innerHTML = "";

    for (var i = 0; i< questions[currentQuestion].options.length; i++) {
        var option = document.createElement("button");
        option.className = "option";
        option.textContent = questions[currentQuestion].options[i];

        option.addEventListener("click", checkAnwer);
    }
}

function checkAnwer(e) {
    var selectedOption = e.target;
    var answerIndex = question[currentQuestion].answer;

    if (selectedOption.textContent === questions[currentQuestion].options[answerIndex]) {
        score++;
    }
    currentQuestion++;

    if (currentQuestion <questions.length) {
        showQuestion()
    } else {
        endQuiz();
    }
}

function updateTimer() {
    var timeLeftElement = document.getElementById("time-left");

    if (timeLeft > 0) {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;    
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timeInterval);
    var highScoreElement = document.getElementById("high-score");
    var finalScoreElement = document.getElementById("final-score");

    highScoreElement.textContent = "High Score" + score;
    finalScoreElement.textContent = "Fianl Score" + score;

    initialsInput.style.display = "block";
    submitBtn.style.display = "block";
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
    initialsInput = "none";
    submitBtn.style.display = "none";
    startQuiz();
}