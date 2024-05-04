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
        question: "An artificial satellite can be tracked very precisely from the Earth by using?",
        options: ["Doppler effect", "Radar", "Pulsar", "Sonar"],
        correct: "Doppler effect",
    },
    {
        id: "1",
        question: "Global satellite called GlobalSat for DRR was proposed to be named after which of the following:?",
        options: ["Jagadish Chandra Bose", "Vikram Sarabhai", " Dr. APJ Abdul Kalam", "Srinivasa Ramanujan"],
        correct: " Dr. APJ Abdul Kalam",
    },
    {
        id: "2",
        question: "Rocket works on the principle of the following?",
        options: ["Avogadro's concept", " Energy conservation", " Bernoulli's theorem", "Momentum conservation"],
        correct: "Momentum conservation",
    },
    {
        id: "3",
        question: "NASA-U.S. space agency, has launched a telescope named Kepler to find?",
        options: ["Distant stars", "Distant planets", "Earth like Planets", " Distant satellites"],
        correct: "Earth like Planets",
    },
    {
        id: "4",
        question: "Asia's biggest “Multi-Application Solar Telescope (MAST)” was recently inaugurated in which state?",
        options: [" Himachal Pradesh", "Madhya Pradesh", "Rajasthan", "Andhra Pradesh"],
        correct: "Rajasthan",
    },
    {
        id: "5",
        question: "Satellites used for telecommunication relay are kept in a geostationary orbit. A satellite is said to be in such as orbit when:1. The orbit is geosynchronous,2. The orbit is circular,3. The orbit lies in the plane of the earth's equator,4.The orbit is at an altitude of 22,236",
        options: ["2 and 4", "1,3 and 4", "1,2 and 3", "1,2,3 and 4"],
        correct: "1,2 and 3",
    }, {
        id: "6",
        question: "Consider the following Statements:1.China has launched Yaogan-26 a remote sensing satellite,2.It will mainly be used for scientific experiments, land surveys, crop yield estimates and disaster prevention,3. China launched Yaogan-1, first satellite in the Yaogan series in 2006. Which of the statements given above is/are correct?",
        options: ["2 and 3 only", "1 and 3 only", "1 and 2 only", "All of the above"],
        correct: "All of the above",
    },
    {
        id: "7",
        question: "The fuel tanks of the spacecraft 'Discovery' that was launched into space on 4 July, 2006 was filled with ?",
        options: ["Liquid hydrogen only", "Liquid oxygen only", "Mixture of liquid hydrogen, liquid oxygen and liquid helium", "Mixture of liquid hydrogen and liquid oxygen"],
        correct: "Mixture of liquid hydrogen and liquid oxygen",
    },
    {
        id: "8",
        question: "India's first remote sensing satellite (I.R.S.-IA) was launched from ?",
        options: ["Baikanour", "Cape Kennedy", "Sriharikota", "French Guana"],
        correct: "Baikanour",
    },
    {
        id: "9",
        question: "The Project Director of Chandrayaan-II was?",
        options: ["C. Rangarajan", "A.P.J. Kalam", "Dr. M. Annadurai", " P. Chidambaram"],
        correct: "Dr. M. Annadurai",
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