// Main content //
var boxStartEl = document.getElementById("home-box");
var boxQuestionEl = document.getElementById("question-box");
var boxEndEl = document.getElementById("end-box");
var nameForm = document.getElementById("name-form");
var boxHighScoreEl = document.getElementById("high-score-box");
var ViewHighScoreEl = document.getElementById("high-scores");
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