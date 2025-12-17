// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "Which is not a programming language?",
    answers: [
      { text: "Python", correct: false },
      { text: "Java", correct: false },
      { text: "C++", correct: false },
      { text: "Flutter", correct: true },
    ],
  },
  {
    question: "What is a framework?",
    answers: [
      { text: "A programming language used to build mobile apps", correct: false },
      { text: "A collection of pre-built tools and structures that helps developers build applications faster", correct: true },
      { text: "A type of database storage system", correct: false },
      { text: "A tool that only designs UI without any backend support", correct: false },
    ],
  },
  {
    question: "Which programming language is primarily used for web development?",
    answers: [
      { text: "Python", correct: false },
      { text: "C++", correct: false },
      { text: "Java", correct: false },
      { text: "JavaScript", correct: true },
    ],
  },
  {
    question: "What is the main purpose of using Java?",
    answers: [
      { text: "Designing graphics for websites", correct: false },
      { text: "Creating simple scripts for browsers", correct: false },
      { text: "Building cross-platform applications using OOP principles", correct: true },
      { text: "Only used for making mobile games", correct: false },
    ],
  },
  {
    question: "Which programming language is considered the most powerful in the future?",
    answers: [
      { text: "Python", correct: false },
      { text: "Go", correct: false },
      { text: "Rust", correct: true },
      { text: "Zig", correct: false },
    ],
  }
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;
  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius! 🌟";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff! 🎯";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning! 📚";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve! 💪";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better! 🚀";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}