const question = [
  {
    question: "siapakah perawi di bawah Imam Ibn Kathir?",
    answer: [
      { text: "Imam Khallaf", correct: false},
      { text: "Imam Bazi", correct: true},
      { text: "Imam Qalun", correct: false},
      { text: "Imam Hafs", correct: false},
    ]
  },
  {
    question: "ada berapa imam dalam ilmu qiraat?",
    answer: [
      { text: "7", correct: false},
      { text: "9", correct: false},
      { text: "10", correct: true},
      { text: "5", correct: false},
    ]
  },
  {
    question: "Imam Qalun membaca berapa harakat pada mad munfasil?",
    answer: [
      { text: "2 dan 4", correct: true},
      { text: "2, 4 dan 6", correct: false},
      { text: "4 sahaja", correct: false},
      { text: "2 sahaja", correct: false},
    ]
  },
  {
    question: "Pada tahun berapa Imam warash dilahirkan?",
    answer: [
      { text: "120 Hijrah", correct: false},
      { text: "70 Hijrah", correct: false},
      { text: "169 Hijrah", correct: false},
      { text: "110 Hijrah", correct: true},
    ]
  },
  {
    question: "Bagaimana Imam Ibn Kathir membaca mad muttasil?",
    answer: [
      { text: "4 dan 5 harakat", correct: false},
      { text: "4 harakat", correct: true},
      { text: "6 harakat", correct: false},
      { text: "2, 4 dan 6 harakat", correct: false},
    ]
  },
  {
    question: "Who is one of the main narrators (Rawi) for the Qiraat of Imam Nafi'?",
    answer: [
      { text: "Hafs", correct: false},
      { text: "Hisham", correct: false},
      { text: "Al Bazzi", correct: false},
      { text: "Warsh", correct: true},
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = question[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

//will remove the previous answer
function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < question.length) {
    showQuestion();
  } else {
    showScore()
  }
};

nextButton.addEventListener("click", () => {
  if(currentQuestionIndex < question.length){
    handleNextButton();
  }else {
    startQuiz();
  }
})

startQuiz();