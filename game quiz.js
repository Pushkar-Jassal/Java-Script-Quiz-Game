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
        question: "Indo-Kazakhstan Joint Military Exercise 'Kazind - 2022' is organised at which Indian state?",
        options: ["Sikkim", "West Bengal", "Andhra Pradesh", "Meghalaya"],
        correct: "Meghalaya",
    },
    {
        id: "1",
        question: "India successfully carried out trials of which nuclear-capable ballistic missile?",
        options: ["Agni V", "Rudra V", "Dhruv V", "Akash"],
        correct: "Agni V",
    },
    {
        id: "2",
        question: "The Indian Army has handed over first-ever 3D printed houses for soldiers at which city?",
        options: ["Leh", "Ahmedabad", "Jaisalmer", "Tawang"],
        correct: "Ahmedabad",
    },
    {
        id: "3",
        question: "The Armed Forces Veterans' Day is celebrated during which month?",
        options: [" January", " February", "March", "April"],
        correct: " January",
    },
    {
        id: "4",
        question: "Which armed force started the 'Ops Alert' exercise to enhance security?",
        options: [" Indo-Tibetan Border Police Force", "Border Security Force", "Central Railway Protection Force", "Central Industrial Security Force"],
        correct: "Border Security Force",
    },
    {
        id: "5",
        question: "Which Union Ministry is the top buyer of goods and services from MSME sellers in 2022?",
        options: [" Ministry of Defence", " Ministry of Finance", "Ministry of Steel", "Ministry of Rural Development"],
        correct: " Ministry of Defence",
    }, {
        id: "6",
        question: "Which institution has designed the 'Advanced Towed Artillery Gun System (ATAGS)'?",
        options: ["HAL", "DRDO", "BEL", "ISRO"],
        correct: "DRDO",
    },
    {
        id: "7",
        question: "What is the name of the second Anti-Submarine Warfare Shallow Water Craft (ASW SWC), which was launched recently?",
        options: ["Andrea", "Androth", "Arnab", "Arnala"],
        correct: "Androth",
    },
    {
        id: "8",
        question: "FRINJEX-23 is the first-ever joint military exercise between India and which country?",
        options: ["Israel", "France", "Ukraine", "Nepal"],
        correct: "France",
    },
    {
        id: "9",
        question: "'TROPEX 2023' is a major Operational level exercise conducted by which country?",
        options: ["India", "Australia", "USA", "China"],
        correct: "India",
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