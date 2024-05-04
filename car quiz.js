//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 16;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "What is an Automobile?",
        options: ["self-propelled vehicle", "used for carrying passengers and goods on the ground", " contains the power source for its propulsion", "All of the mentioned"],
        correct: "All of the mentioned",
    },
    {
        id: "1",
        question: "Automobile can be classified based on which of the following parameter?",
        options: ["Fuel Used", "Transmission", "Drive", "All of the mentioned"],
        correct: "All of the mentioned",
    },
    {
        id: "2",
        question: "Which of the following is a classification of automobiles based on Load?",
        options: ["Heavy transport vehicle (HTV)", "Sedan Hatchback car", "Four wheeler vehicle", "Front-wheel drive"],
        correct: "Heavy transport vehicle (HTV)",
    },
    {
        id: "3",
        question: "Which of these were or are used in automobiles to provide suspension?",
        options: ["Coil springs", "Torsion bars", " Leaf springs", "All of the mentioned"],
        correct: "All of the mentioned",
    },
    {
        id: "4",
        question: "Which of the following is not a part of the transmission system?",
        options: [" Clutch", "Wheels", "Gear box", " Axles"],
        correct: "Wheels",
    },
    {
        id: "5",
        question: " In which of the following year was the first automobile built?",
        options: ["1735", "1769", "1774", "1724"],
        correct: "1769",
    }, {
        id: "6",
        question: "Which of the following is a classification of IC Engine?",
        options: ["Otto cycle engine", "Four-stroke engines", "S.I Engines", "All of the above"],
        correct: "Otto cycle engine",
    },
    {
        id: "7",
        question: " Which of the following is found in an automobile's electrical system?",
        options: ["Lighting systems", "Battery", "Alternators", "All of the mentioned"],
        correct: "All of the mentioned",
    },
    {
        id: "8",
        question: "In which of the following year was Hindustan Motors Limited, Calcutta set up?",
        options: ["1940", "1941", "1942", "1943"],
        correct: "1943",
    },
    {
        id: "9",
        question: "Which of the following is necessary for the description of an automobile?",
        options: ["Model", "Capacity", "Make", "All of the mentioned"],
        correct: "All of the mentioned",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 16;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1100);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 16;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};