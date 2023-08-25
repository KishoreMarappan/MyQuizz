const questions = [
    {
        question: "Who invented JavaScript?",
        answers: [
            { text: "Dennis Ritchie", correct: false },
            { text: "Brendan Eich", correct: true },
            { text: "Bjarne Stroustrup", correct: false },
            { text: "Guido van Rossum", correct: false },
        ]
    },
    
    {
        question:"Which of the following does the unshift() method do?",
                answers:[
                    {text:"add element at first",correct:true},
                    {text:"prints first element",correct:false},
                    {text:"removes last element",correct:false},
                    {text:"add elemants at last",correct:false}, 
                ]
            
    },
    {
        question:"Which array method sorts the elements of an array?",
                answers:[
                    {text:"order()",correct:false},
                    {text:"changeOrder(order)",correct:false},
                    {text:"sort()",correct:true},
                    {text:"None of the above",correct:false},
                ]
    },
    {
        question:"Which of the following events occurs when the user clicks on an HTML element?",
                answers:[
                    {text:"onchange",correct:false},
                    {text:"onmouseclick",correct:false},
                    {text:"byclick",correct:false},
                    {text:"onclick",correct:true},
                ]
    },
    
    {
        question:"Which of the following does the pop() method do?",
                answers:[
                    {text:"Increments total length by 1",correct:false},
                    {text:"prints first element",correct:false},
                    {text:"removes last element",correct:true},
                    {text:"Dncrements total length by 1",correct:false},
                ]
    },
    {
        question:"Which of the following is/are not a JS keyword?",
        answers:[
                {text:"Int",correct:true},
                {text:"var",correct:false},
                {text:"const",correct:false},
                {text:"let ",correct:false},
                ]
    }
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-question-btn");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "NEXT";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener("click", selectAnswer);
        console.log("button is clicked");
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score+=5;
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}
function showScore() {
    resetState();
    questionElement.innerHTML = `Your Score is ${score} out of 30!`;
    nextButton.innerHTML = "Retake Quiz";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener("click",() => {
        if (currentQuestionIndex < questions.length) {
            handleNextButton();
        } else {
            startQuiz();
        }
    });



startQuiz();

