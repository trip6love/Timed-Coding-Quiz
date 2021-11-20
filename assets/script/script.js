// MAIN CONTENT //
var boxStartEl = document.getElementById("home-box");
var boxQuestionEl = document.getElementById("question-box");
var boxScoreEl = document.getElementById("score-tag")
var nameForm = document.getElementById("name-form")
var boxHighScoresEl = document.getElementById("high-score-box")
var viewHighScoreEl = document.getElementById("high-scores")
var lsHighScoreEl = document.getElementById("high-score-list")
var correctEl = document.getElementById("correct")
var incorrectEl = document.getElementById("incorrect")
var boxEndEl = document.getElementById("end-box")

// QUESTIONS //
var questionsEl = document.getElementById("question")
var answerbuttonEl = document.getElementById("answer-buttons")
var timeEl = document.querySelector("#time");
var points = 0;
var remainingTime;
var gameover;
timeEl.innerText = 0;

// BUTTONS //
var btnStartEl = document.querySelector("#start-quiz");
var btnBackEl = document.querySelector("#back")
var btnClearRecord = document.querySelector("#clear-records")

// QUESTION ARRAY //
var randomQuestions
var questionIndex = 0

// RECORDS //
var records = [];

    
// GAME QUESTIONS //
var questions = [
    { 
        q: 'To link JavaScript which would be used?', 
        a: '2. <script>', 
        choices: [{choice: '1. <link>'}, {choice: '2. <script>'}, {choice: '3. <js>'}, {choice: '4. <href>'}]
    },
    { 
        q: 'You can do everything JS does in HTML.', 
        a: '2. False', 
        choices: [{choice: '1. True'}, {choice: '2. False'}]
    },
    { 
        q: 'To form an array you would use?', 
        a: '3. [ ]', 
        choices: [{choice: '1. { }'}, {choice: '2. ( )'}, {choice: '3. [ ]'}, {choice: '4. None of The Above'}]
    },
    { 
        q: 'JavaScript can be used to store local data.', 
        a: '1. True', 
        choices: [{choice: '1. True'}, {choice: '2. False'}]
    },
    { 
        q: 'To link CSS what would we add to the HTML', 
        a: '1. <link>', 
        choices: [{choice: '1. <link>'}, {choice: '2. <script>'}, {choice: '3. <js>'}, {choice: '4. <href>'}]
    },
    { 
        q: 'Javascript is a fairly new language.', 
        a: '2. False', 
        choices: [{choice: '1. True'}, {choice: '2. False'}]
    },
    { 
        q: 'To begin saving local data you would use which?', 
        a: '3. JSON', 
        choices: [{choice: '1. <link>'}, {choice: '2. GET'}, {choice: '3. JSON'}, {choice: '4. None of the Above'}]
    },
];
      
// HOME SCREEN //
var startPage = function () {
    boxHighScoresEl.classList.add("off")
    boxHighScoresEl.classList.remove("on")
    boxStartEl.classList.remove("off")
    boxStartEl.classList.add("on")
    boxScoreEl.removeChild(boxScoreEl.lastChild)
    questionIndex = 0
    gameover = ""
    timeEl.textContent = 0 
    points = 0

    if (correctEl.className = "on") {
        correctEl.classList.remove("on");
        correctEl.classList.add("off")
    }
    if (incorrectEl.className = "on") {
        incorrectEl.classList.remove("on");
        incorrectEl.classList.add("off");
    }
}

// SETTING UP TIMER // 
var timeSet = function() {
    timeleft = 60;

    var checkTime = setInterval(function() {
        timeEl.innerText = timeleft;
        timeleft--

        if (gameover) {
            clearInterval(checkTime)
        }
       
        if (timeleft < 0) {
            showScore()
            timeEl.innerText = 0
            clearInterval(checkTime)
        }

    }, 1000)
}

// STARTING THE GAME //
var gameStart = function() {
    
    boxStartEl.classList.add('off');
    boxStartEl.classList.remove('on');
    boxQuestionEl.classList.remove('off');
    boxQuestionEl.classList.add('on');
    
    randomQuestions = questions.sort(() => Math.random() - 0.5)
    timeSet();
    setQuestion();
}
    
// NEXT QUESTIONS //
var setQuestion = function() {
    resetSolved();
    displayQuestion(randomQuestions[questionIndex])
}

// REMOVE BUTTONS //
var resetSolved = function() {
    while (answerbuttonEl.firstChild) {
        answerbuttonEl.removeChild(answerbuttonEl.firstChild)
    };
};

// DISPLAY QUESTIONS //
var displayQuestion = function(index) {
    questionsEl.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {
        var answerbtn = document.createElement('button')
        answerbtn.innerText = index.choices[i].choice
        answerbtn.classList.add('btn')
        answerbtn.classList.add('answerbtn')
        answerbtn.addEventListener("click", checkAnswer)
        answerbuttonEl.appendChild(answerbtn)
    }
};

// CORRECT //
var correctAnswer = function() {
    if (correctEl.className = "off") {
        correctEl.classList.remove("off")
        correctEl.classList.add("tag")
        incorrectEl.classList.remove("tag")
        incorrectEl.classList.add("off")
    }
}  

// INCORRECT //
var incorrectAnswer = function() {
    if (incorrectEl.className = "off") {
        incorrectEl.classList.remove("off")
        incorrectEl.classList.add("tag")
        correctEl.classList.remove("tag")
        correctEl.classList.add("off")
    }
}

// CHECK TO SEE IF ANSWER IS CORRECT OR NOT //
var checkAnswer = function(event) {
    var selected = event.target 
        if (randomQuestions[questionIndex].a === selected.innerText) {
            correctAnswer()
            points = points + 8
        } else {
            incorrectAnswer()
            points = points - 1;
            timeleft = timeleft - 5;
        };

        //
        questionIndex++
        if  (randomQuestions.length > questionIndex + 1) {
            setQuestion()
        } else {
            gameover = "true";
            viewPoints();
        }
    
    
}

// SHOW POINTS AT END OF GAME //
var viewPoints = function() {
    boxQuestionEl.classList.add("off");
    boxEndEl.classList.remove("off");
    boxEndEl.classList.add("on");

    var pointView = document.createElement("p");
    pointView.innerText = ("Your final score is " + points + "!");
    boxHighScoresEl.appendChild(pointView);
}       
    
// HIGH SCORE FUNCTION //
var savedScore = function(event) { 
    event.preventDefault() 
    var name = document.querySelector("#name").value;
    if (!name) {
        alert("Please enter your name!");
        return;
    }

    nameForm.reset();

    var record = {
      name: name,
      points: points,
    } 

    records.push(record);
    records.sort((a, b) => {return b.points-a.points});

    while (lsHighScoreEl.firstChild) {
       lsHighScoreEl.removeChild(lsHighScoreEl.firstChild)
    }
    
    for (var i = 0; i < records.length; i++) {
      var recordsEl = document.createElement("li");
      recordsEl.className = "high-score";
      recordsEl.innerHTML = records[i].name + " - " + records[i].points;
      lsHighScoreEl.appendChild(recordsEl);
    }

    saveRecords();
    displayRecords();

}

// SAVE RECORDS //
var saveRecords = function () {
    localStorage.setItem("records", JSON.stringify(records))
            
}

// LOAD RECORDS ONTO SCREEN //
var loadRecords = function () {
    var loadedRecords = localStorage.getItem("records")
        if (!loadedRecords) {
        return false;
    }

    records = JSON.parse(loadedRecords);
    records.sort((a, b) => {return b.points-a.points})
 

    for (var i = 0; i < loadedRecords.length; i++) {
        var recordsEl = document.createElement("li");
        recordsEl.className = "high-score";
        recordsEl.innerText = loadedRecords[i].name + " - " + loadedRecords[i].points;
        lsHighScoreEl.appendChild(recordsEl);

        records.push(loadedRecords[i]);
            
    }
}  

// DISPLAY RECORDS //
var displayRecords = function() {

    boxHighScoresEl.classList.remove("off");
    boxHighScoresEl.classList.add("on");
    gameover = "true"

    if (boxEndEl.className = "on") {
        boxEndEl.classList.remove("on");
        boxEndEl.classList.add("off");
        }
    if (boxStartEl.className = "on") {
        boxStartEl.classList.remove("on");
        boxStartEl.classList.add("off");
        }
            
    if (boxQuestionEl.className = "on") {
        boxQuestionEl.classList.remove("on");
        boxQuestionEl.classList.add("off");
        }

    if (correctEl.className = "on") {
        correctEl.classList.remove("on");
        correctEl.classList.add("off");
    }

    if (incorrectEl.className = "on") {
        incorrectEl.classList.remove("on");
        incorrectEl.classList.add("off");
    }
}

// CLEAR RECORDS FUNCTION //
var recordClear = function() {
    records = [];

    while (lsHighScoreEl.firstChild) {
        lsHighScoreEl.removeChild(lsHighScoreEl.firstChild);
    }

    localStorage.clear(records)
}

loadRecords() 


        
// START GAME BUTTON //
btnStartEl.addEventListener("click", gameStart)

// BACK BTN //
btnBackEl.addEventListener("click", startPage)

// VIEW RECORDS //
viewHighScoreEl.addEventListener("click", displayRecords)

// NAME SUBMIT //
nameForm.addEventListener("submit", savedScore)

// CLEAR BUTTON
btnClearRecord.addEventListener("click", recordClear)
