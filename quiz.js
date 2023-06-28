"use strict";

// import { userName } from "./script.js";
// console.log(userName);

let urlParams = new URLSearchParams(window.location.search);
let selectedCategory = urlParams.get("category");

let apiUrl = `https://opentdb.com/api.php?amount=10&category=${selectedCategory}`;

/////////////////////
let currentQuestionIndex = 0;
let questions = [];
let questionEle = document.querySelector(".question");
let optionsEle = document.getElementById("options");
let score = document.getElementById("score");

let timerEle = document.getElementById("timer");
let container = document.querySelector(".quiz-container");
let scoreInGame = 0;
//////////////////////

// hiding the contents of the container

container.style.display = "none";

function populateQuestions(time) {
  clearTimeout(timerId);
  questionEle.innerHTML = "";
  optionsEle.innerHTML = "";

  if (currentQuestionIndex >= questions.length) {
    console.log(scoreInGame);
    setTimeout(() => {
      window.location.assign("index.html");
    }, 3000);
  }

  let currentQuestion = questions[currentQuestionIndex];
  questionEle.innerHTML = currentQuestion.question;

  const options = currentQuestion.incorrect_answers.concat(
    currentQuestion.correct_answer
  );

  options.forEach((option) => {
    let optionElement = document.createElement("button");
    optionElement.innerHTML = option;
    optionElement.classList.add("option-btn");
    optionElement.setAttribute("type", "button");

    optionElement.addEventListener("click", onClickingTheOption);

    optionsEle.appendChild(optionElement);
  });

  container.style.display = "block";
  start(time);

  // let timeBar = document.querySelector(".progress-bar");
  // timeBar.style.animation = "none";
  // timeBar.style.widt = "100%";

  // setTimeout(() => {
  //   timeBar.style.animation = `timebar ${time}s linear forwards`;
  // }, 1000);
}

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    questions = data.results;
    populateQuestions(15);
  })
  .catch((error) => {
    console.error("Error: ", error);
  });

score.innerHTML = 0 + "/10";

function checkAnswer(selected, correct) {
  if (selected === correct) {
    scoreInGame += 1;
    score.innerHTML = scoreInGame + "/ 10";
    return "correct";
  } else {
    return "incorrect";
  }
}

function onClickingTheOption(event) {
  let selected = event.target;
  let chosenAnswer = selected.textContent;
  //   console.log(chosenAnswer);

  let currentQuestion = questions[currentQuestionIndex];
  let correctAnswer = currentQuestion.correct_answer;
  //   console.log(correctAnswer);

  let result1 = checkAnswer(chosenAnswer, correctAnswer);
  let result = document.querySelector(".result");
  //   result.innerHTML = result1;

  let options = document.querySelectorAll(".option-btn");

  options.forEach((option) => {
    option.classList.remove("correct-answer");
    option.classList.remove("incorrect-answer");

    if (option.textContent === correctAnswer) {
      option.classList.add("correct-answer");
    } else if (option.textContent === chosenAnswer) {
      option.classList.add("incorrect-answer");
    }
  });

  // let timeBar = document.querySelector(".progress-bar");
  // // timeBar.classList.remove("timebar-animation");
  // // void timeBar.offsetWidth;
  // // timeBar.classList.add("timebar-animation");
  // timeBar.style.animation = "none";
  // void timeBar.offsetWidth;

  setTimeout(() => {
    // timeBar.style.animation = "timebar 16s linear forwards";
    currentQuestionIndex++;
    populateQuestions(15);
  }, 3000);
  //   populateQuestions(questions);
  //   correctAnswerEle.innerHTMl = "";

  console.log(result1);
}

let timerId;

function highlight() {
  let currentQuestion = questions[currentQuestionIndex];
  let correctAnswer = currentQuestion.correct_answer;

  let options = optionsEle.querySelectorAll(".option-btn");

  options.forEach((option) => {
    if (option.textContent === correctAnswer) {
      option.style.backgroundColor = "rgba(11, 231, 11, 0.459)";
    }
  });

  currentQuestionIndex++;
  setTimeout(function () {
    populateQuestions(15);
  }, 3000);
}

function start(time) {
  let timeLeft = time;

  function run() {
    timerEle.textContent = "Time left: " + timeLeft + "seconds";

    if (timeLeft <= 0) {
      clearTimeout(timerId);

      highlight();
    } else {
      timeLeft--;
      timerId = setTimeout(function () {
        run();
      }, 1000);
    }
  }
  run();
}

start(15);
