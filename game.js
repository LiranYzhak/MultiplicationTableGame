// יצירת משתנים
let correctAnswer;
let difficulty;
const optionsDiv = document.getElementById("options");
const feedbackDiv = document.getElementById("feedback");
const questionDiv = document.getElementById("question");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

// פונקציה להתחלת המשחק
function startGame(maxValue) {
  difficulty = maxValue;
  document.getElementById("difficulty").style.display = 'none';
  questionDiv.style.display = 'block';
  optionsDiv.style.display = 'block';
  document.getElementById("back-to-menu").style.display = 'block';
  generateQuestion();
}

// פונקציה ליצירת תרגיל כפל אקראי
function generateQuestion() {
  // ניקוי המידע הקודם
  feedbackDiv.innerText = '';
  optionsDiv.innerHTML = '';

  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * (difficulty / 10)) + 1;
  correctAnswer = num1 * num2;

  document.getElementById("question").innerText = `כמה זה ${num1} כפול ${num2}?`;

  // יצירת אפשרויות תשובה
  const answers = [correctAnswer];
  while (answers.length < 4) {
    let wrongAnswer = Math.floor(Math.random() * difficulty) + 1;
    if (!answers.includes(wrongAnswer)) answers.push(wrongAnswer);
  }

  // ערבוב תשובות והצגתן
  answers.sort(() => Math.random() - 0.5);
  answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer;
    button.classList.add("option");
    button.onclick = () => checkAnswer(answer, button);
    optionsDiv.appendChild(button);
  });
}

// פונקציה לבדיקת תשובה
function checkAnswer(answer, button) {
  if (answer === correctAnswer) {
    button.classList.add("correct");
    feedbackDiv.innerText = "כל הכבוד! תשובה נכונה!";
    correctSound.play();
    setTimeout(generateQuestion, 2000); // מעבר לשאלה הבאה
  } else {
    button.classList.add("wrong");
    feedbackDiv.innerText = "אופס! נסה שוב.";
    wrongSound.play();
  }
}

// Add backToMenu function
function backToMenu() {
  document.getElementById("difficulty").style.display = 'block';
  document.getElementById("question").style.display = 'none';
  document.getElementById("options").style.display = 'none';
  document.getElementById("back-to-menu").style.display = 'none';
  document.getElementById("player-stats").style.display = 'none';
  feedbackDiv.innerText = '';
}