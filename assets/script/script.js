// Main content //
var boxStartEl = document.getElementById("home-box");
var boxQuestionEl = document.getElementById("question-box");
var boxEndEl = document.getElementById("end-box");
var nameForm = document.getElementById("name-form");
var boxHighScoreEl = document.getElementById("high-score-box");
var viewHighScoreEl = document.getElementById("high-scores");
var highScoreLsEl = document.getElementById("high-score-list");
var boxScoreEl = document.getElementById("score-banner");
var incorrectEl = document.getElementById("incorrect");
var correctEl = document.getElementById("correct");

// Questions & Answers //
var questionsEl = document.getElementById("question");
var answerbuttonEl = document.getElementById("answer-buttons");
var timeEl = document.querySelector("#time")
timeEl.innerText = 0;
var points = 0;
var remainingTime;
var gameOver;

// Button //
var btnClearRecord = document.querySelector("#clear-records");
var btnBack = document.querySelector("#back");
var btnStart = document.querySelector("#start-quiz")

// High Score & Questions Array //
var records = [];
var randomQuestions
var questionIndex = 0

// Game Questions //
var questions = [
    {
       q: "",
       a: "",
       options: [{option: "1. "}, {option: "2. "}, {option: "2. "}, {option: "3. "}, {option: "4. "}]
    },
    {
        q: "",
        a: "",
        options: [{option: "1. "}, {option: "2. "}, {option: "2. "}, {option: "3. "}, {option: "4. "}]
    },
    {
        q: "",
        a: "",
        options: [{option: "1. "}, {option: "2. "}, {option: "2. "}, {option: "3. "}, {option: "4. "}]
    },
    {
        q: "",
        a: "",
        options: [{option: "1. "}, {option: "2. "}, {option: "2. "}, {option: "3. "}, {option: "4. "}]
    },
    {
        q: "",
        a: "",
        options: [{option: "1. "}, {option: "2. "}, {option: "2. "}, {option: "3. "}, {option: "4. "}]
    },
    {
        q: "",
        a: "",
        options: [{option: "1. "}, {option: "2. "}, {option: "2. "}, {option: "3. "}, {option: "4. "}]
    },
    {
        q: "",
        a: "",
        options: [{option: "1. "}, {option: "2. "}, {option: "2. "}, {option: "3. "}, {option: "4. "}]
    },
    {
        q: "",
        a: "",
        options: [{option: "1. "}, {option: "2. "}, {option: "2. "}, {option: "3. "}, {option: "4. "}]
    },

];

var startPage = function() {
    boxHighScoreEl.classList.add("off");
    boxHighScoreEl.classList.remove("on");
    boxStartEl.classList.add("on");
    boxStartEl.classList.add("off");
    boxScoreEl.removeChild(boxScoreEl.lastChild)
    points = 0
    timeEl.textContent = 0
    questionIndex = 0
    gameOver = ""

    if (correctEl.className = "on") {
        correctEl.classList.add("off");
        correctEl.classList.remove("on");
    
    } 
    if (wrongEl.className = "show") {
         
        wrongEl.classList.remove("on");
        wrongEl.classList.add("off");
        
    }
    
};

// Setting Up The Timer //
var timeLeft = function() {
    timeleft = 60;

    var checkTime = setInterval(function() {
        timeEl.innerText = timeleft;
        timeleft--

        if (gameOver) {
            clearInterval(checkTime)
        }
        if (timeleft < 0) {
            viewPoints()
            timerEl.innerText = 0
            clearInterval(checkTime)
        }

        
    }, 1000);
};

// Starting The Game //
var gameStart = function() {
    boxStartEl.classList.remove("on");
    boxStartEl.classList.add("off");
    boxQuestionEl.classList.add("on");
    boxQuestionEl.classList.remove("off")

    // Randomize The Questions //
    randomQuestions = questions.sort(() => Math.random() - 0.5);
    timeLeft();
    setQuestion();
};

// Next Questions //
var setQuestion = function() {
    resetSolved()
    displayQuestion(randomQuestions[questionIndex])
};

// Remove Buttons //
var resetSolved = function () {
    while (answerbuttonEl.firstChild) {
        answerbuttonEl.removeChild(answerbuttonEl.firstChild);
    };
};

// Display question and answer buttons
var displayQuestion = function(index) {
    questionsEl.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {
        var answerbtn = document.createElement("button");
        answerbtn.innerText = index.options[i].choices
        answerbtn.classList.add("answerbtn");
        answerbtn.classList.add("btn");
        answerbtn.addEventListener("click", checkAnswer)
    }
}

// Check to see if it is correct or not //
var checkAnswer = function(event) {
    var selected = event.target
        if (randomQuestions[questionIndex].a === selected.innerText) {
            correctAnswer();
            points = points + 8
        } else {
            incorrectAnswer()
            points = points - 3;
            timeleft = timeleft - 5;

        };
        questionIndex++
            if (randomQuestions.length > questionIndex + 1) {
                setQuestion();
            } else {
                gameOver = "true";
                (viewPoints);
            }
    
}

// ALERT correct on users screen //
var correctAnswer = function() {
    if (correctEl.className = "off") {
        correctEl.classList.remove("off");
        correctEl.classList.add("banner");
        wrongEl.classList.add("off");
        wrongEl.classList.remove("banner");
    }
}

// ALERT incorrect on users screen // 
var incorrectAnswer = function() {
    if (wrongEl.className = "off") {
        wrongEl.classList.remove("off")
        wrongEl.classList.add("banner")
        correctEl.classList.add("off")
        correctEl.classList.remove("banner")

    }

}

// Show points at end game //
var viewPoints = function() {
    boxQuestionEl.classList.add("off");
    boxEndEl.classList.remove("off");
    boxEndEl.classList.add("show");

    var pointView = document.createElement("p");
    pointView.innerText = (" Final score is " + points + "!!!");
    boxScoreEl.appendChild(pointView);
}

// HIGH SCORE FUNCTION //
var savedScore = function(event) {
    event.preventDefault();
    var name = document.querySelector("#name").value;
    if(!name) {
        alert("Please enter your name!!!")
        return;
    }

    nameForm.reset();

    var record = {
        name: name,
        points: points,
    }

    records.push(record);
    records.sort((a, b) => {return b.points-a.points});

    for (var i = 0; i < records.length; i++) {
        var recordsEl = document.createElement("li");
        records.className = "high-score";
        records.innerHTML = records[i].name + " - " + records[i].score;
        highScoreLsEl.appendChild(recordsEl)
    } while (highScoreLsEl.firstChild) {
        highScoreLsEl.removeChild(highScoreLsEl.firstChild);
    }

    saveRecords();
    displayRecords();
    
}

// saving the records //
var saveRecords = function () {
    localStorage.setItem("records", JSON.stringify(records))
}

// pull records in on the loading of page //
var loadRecords = function() {
    var loadedRecords = localStorage.getItem("records");
        if (!loadedRecords) {
        return false;
    }

    loadedRecords = JSON.parse(loadedRecords);
    loadedRecords.sort((a,b) => {return b.points-a.points})

    for (var i = 0; i < loadedRecords.length; i++) {
        var recordsEl = document.createElement("li");
        recordsEl.className = "high-score";
        recordsEl.innerText = loadedRecords[i].name + " - " +loadedRecords[i].score;

        records.push(loadedRecords[i]);
    }
    
}