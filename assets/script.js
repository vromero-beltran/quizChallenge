var questions = [
    {
        question: "What is the color of the sun when it is at its coolest point?",
        option:[
            "White",
            "Blue",
            "Red",
            "Yellow"
        ],
        answerIndex: 'Red'
    },
    {
        question: "What is the color of the sun when it is at a medium point of heat?",
        option:[
            "Blue",
            "Red",
            "Yellow",
            "White"
        ],
        answerIndex: 'White'
    },
    {
        question: "What is the color of the sun at its hottest point?",
        option:[
            "Yellow",
            "Blue",
            "White",
            "Red"
        ],
        answerIndex: 'Blue'
    },
    {
        question: "When looking at the Sun from Earth, What color is it? (Please don't stare at the Sun.)",
        option:[
            "White",
            "Yellow",
            "Red",
            "Blue"
        ],
        answerIndex: 'White'
    },
    {
        question: "When a painter wants to use a cooler colored paint, what color is that?",
        option:[
            "Red",
            "White",
            "Blue",
            "Yellow"
        ],
        answerIndex: 'Blue'
    },
    {
        question: "What color scatters the least from the sunlight when it hits the atmosphere?",
        option:[
            "Blue",
            "Red",
            "Violet",
            "Green"
        ],
        answerIndex: 'Red'
    },
    {
        question: "When sunlight hits the atmosphere the shortest wavelengths are scattered the most, what color is scattered the most but you don't see it in the sky?",
        option:[
            "Green",
            "Orange",
            "indigo",
            "Violet"
        ],
        answerIndex: 'Violet'
    },
    {
        question: "What color light travels the least in the dark?",
        option:[
            "Blue",
            "Red",
            "Yellow",
            "Orange"
        ],
        answerIndex: 'Red'
    },
    {
        question: "What color light helps you stay up in the dark/night?",
        option:[
            "Red",
            "Green",
            "Blue",
            "Yellow"
        ],
        answerIndex: 'Blue'
    },
    {
        question: "What wavelength of light does grass not absorb as energy?",
        option:[
            "Blue Wavelength",
            "Violet Wavelength",
            "Indigo Wavelength",
            "Green Wavelength"
        ],
        answerIndex: 'Green Wavelength'
    }
];
// These are my Global Variables
let restartButton = document.querySelector('#restart');
let currentQuestionIndex;
let timeLeft;
var startingTime = 70;
let timerInterval;
let score;
let updateTimer;

// These are my DOM elements
var startButton = document.getElementById('start-btn');
var questionElement = document.getElementById('question');
var optionElement = document.getElementById('options');
// This starts the quiz when start button is clicked
startButton.addEventListener('click', startQuiz);

function startQuiz() {
    timeLeft = 70; // This sets time and starts timer
    startTimer ();
    document.getElementById('start-btn').style.display = 'none'; // makes the start button disapear.
    showQuestion(); // Display first question and options
//    displayOptions();
}

function startTimer () {
    timerInterval = setInterval (() =>{
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
    
}

function showQuestion() { // code to display the current question and option DOM element.
    for (let i = 0; i < questions.length; i++) { // loops through each question in the question array.
        // console.log(questions);
        const element = questions[i]; // stores curent question object in element.
        console.log("element", element); // logs the current question object.
        questionElement.innerText = questions[i].question; // sets question div text to current queston text.
        for (let x = 0; x < questions[i].option.length; x++) {
            let newOption = document.createElement('button'); // creates a new button tag with an id of optionX where X is the index number
            newOption.setAttribute('class', 'answers');
            newOption.setAttribute('value', questions[i].option[x]);
            newOption.textContent = questions[i].option[x];
            optionElement.append = newOption;
        };
    };
    
    
}

//function displayOptions() {
//    for (let i = 0; i < displayOptions.length; i++) {
//        const element = options[i];
//        console.log('element', element);
//        optionElement.innerText = options[i].option;
//    };
//    console.log('is the displayOptions function working?')
//}

function checkAnswer(answer) {
    if ((questions[currentQuestionIndex].option)[answer] === (questions[currentQuestionIndex].correct)) {
        alert ("Correct!");
        score++;
        } else{
            alert ('Wrong!');
            timeLeft -=15;
        }
            currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length){
            endQuiz();
        };
}

function endQuiz () {
    clearInterval(timerInterval);
    displayLastHighScore();
}

function saveLastHighScore() {
    // Save related form data as an object
    var highScore = {
        score: score.value,
        initials: initials.value
    };
    // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
    localStorage.setItem('highscore', JSON.stringify(highScore));
}

function renderLastHighScore() {
    // Use JSON.parse() to convert text to JavaScript object
    var lastHighScore = JSON.parse(localStorage.getItem('highScore'));
    // Check if data is returned, if not exit out of the function
    if (lastHighScore !== null) {
        document.getElementById('saved-score').innerHTML = lastHighScore.score;
        document.getElementById('saved-initials').innerHTML = lastHighScore.initials;
    }
}

function displayLastHighScore () {
    var highScores = JSON.parse(localStorage.getItem('highScore')) || [];
    highScores.sort(function(a,b) {
        return b.score - a.score;
    });
    var topScore = highScores[0];
    if (topScore) {
        var highScoreEl =document.querySelector('final-score');
        highScoreEl.textContent = topScore.initials + ' - ' + topScore.score;
    } else {
        var highScoreEl = document.querySelector('#final-score');
        highScoreEl.textContent = 'No Scores Yet';
    };
}


restartButton.addEventListener('click', function (e) { // anonymous function to restart the page.
    if (e.target.matches('#restart')) {
            document.location.reload();
        };
        currentQuestionIndex = 0;
        score = 0;
        timeLeft = 10;
        restartButton.addEventListener('click', restartQuiz);
})

