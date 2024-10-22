const questions = [
    {
        question: "How many Kilobytes are there in 1 megabyte?",
        answer: [
            { Text: "1000", correct: false },
            { Text: "1024", correct: true },
            { Text: "1048", correct: false },
            { Text: "1020", correct: false }
        ]
    },
    {
        question: "Which of the following is the first high level programming language created in the 1950s?",
        answer: [
            { Text: "FORTRAN", correct: true },
            { Text: "C++", correct: false },
            { Text: "COBOL", correct: false },
            { Text: "JAVA", correct: false }
        ]
    },
    {
        question: "Which of the following is not an operating system?",
        answer: [
            { Text: "macOS Catalina", correct: false },
            { Text: "Microsoft Office XP", correct: true },
            { Text: "Windows Vista", correct: false },
            { Text: "Linux", correct: false }
        ]
    },
    {
        question: "Which component is known as the heart of a computer?",
        answer: [
            { Text: "RAM", correct: false },
            { Text: "CPU", correct: true },
            { Text: "CHIP", correct: false },
            { Text: "GPU", correct: false }
        ]
    },
    {
        question: "Who is the father of the first modern computer?",
        answer: [
            { Text: "Vint Cerf", correct: false },
            { Text: "Alan Turing", correct: false },
            { Text: "Charles Babbage", correct: true },
            { Text: "Newton😂", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionindex = 0;
let score = 0;

function startQuiz() {
    currentQuestionindex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionindex];
    let questionNo = currentQuestionindex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.Text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answers.correct) {
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectbtn = e.target;
    const isCorrect = selectbtn.dataset.correct === "true";
    if (isCorrect) {
        selectbtn.classList.add("correct");
        score++;
    } else {
        selectbtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionindex++;
    if (currentQuestionindex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionindex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
