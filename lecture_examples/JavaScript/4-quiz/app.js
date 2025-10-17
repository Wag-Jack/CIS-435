const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correct: 0 // index of the correct option
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        correct: 1
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1
    }
];

let currentQuestionIndex = 0
let score = 0;
let timerInterval;

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#options").addEventListener("click", (event) => {
        const target = event.target;

        if (target.tagName === "LI") {
            const selectedIndex = parseInt(target.dataset.index);
            const currentQuestion = questions[currentQuestionIndex];

            // Check to see if the selected answer is correct
            if (selectedIndex === currentQuestion.correct) {
                score++;
                target.classList.add("correct");
            } else {
                target.classList.add("wrong");
            }

            // Wait briefly before moving to the next question
            clearInterval(timerInterval);
            setTimeout(moveToNextQuestion, 1000);
        }
    });

    // Initialize the quiz
    displayQuestion();
}); //end DOMContentLoaded

// Display the questions
function displayQuestion() {
    const questionElement = document.querySelector("#question");
    const optionsElement = document.querySelector("#options");

    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = ""; // Clear previous options

    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.textContent = option;
        li.dataset.index = index; // Store the option index
        optionsElement.appendChild(li);
    });

    startTimer();
}

// The timer for the questions
function startTimer() {
    const timerElement = document.querySelector("#timer");
    let timeLeft = 10; // 10 seconds per question

    timerElement.textContent = `Time Left: ${timeLeft}s`;

    clearInterval(timerInterval); // Clear any existing timer
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEelemtn.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            moveToNextQuestion();
        }
    }, 1000);
}

// Move to the next question
function moveToNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showScore();
    }
}

// DIsplay the final score
function showScore() {
    document.querySelector("#quizContainer").style.display = "none";
    document.querySelector("#scoreContainer").style.display = "block";

    document.querySelector("#score").textContent = `${score} / ${questions.length}`;
}

document.querySelector("#restartBtn").addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;

    document.querySelector("#quizContainer").style.display = "block";
    document.querySelector("#scoreContainer").style.display = "none";

    displayQuestion();
});