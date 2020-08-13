const ques = document.getElementById('ques');
const options = Array.from(document.getElementsByClassName('option-text')); //options are multiple so they are converted into array and fetching via class name.
const loadText = document.getElementById('loadText');
const scoreText = document.getElementById('score');
const loadBarFull = document.getElementById('loadBarFull');
const spinner = document.getElementById('spinner');
const game = document.getElementById('game');

let currentques = {};
let acceptingAnswers = false;
let score = 0;
let quesCounter = 0;
let availableQuesions = []; 
let quess = [];

//fetching quess via json fetch API
fetch(
    'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple'
)
    .then((res) => {
        return res.json();
    })
    .then((loadedques) => {
        quess = loadedques.results.map((loadedques) => {
            const formattedques = {
                ques: loadedques.question,
            };

            const answeroptions = [...loadedques.incorrect_answers]; 
            formattedques.answer = Math.floor(Math.random() * 4) + 1; 
            answeroptions.splice(
                formattedques.answer - 1,
                0,
                loadedques.correct_answer 
            );

            answeroptions.forEach((option, index) => {
                formattedques['option' + (index + 1)] = option;
            });

            return formattedques;
        });

        startGame();
    })
    .catch((err) => {
        console.error(err);
    });


const right_BONUS = 10;
const MAX_quesS = 3;

startGame = () => {
    quesCounter = 0;
    score = 0;
    availableQuesions = [...quess];
    getNewques();
    game.classList.remove('hidden');
    spinner.classList.add('hidden');
};

getNewques = () => {
    if (availableQuesions.length === 0 || quesCounter >= MAX_quesS) {
        localStorage.setItem('mostRecentScore', score);
        
        return window.location.assign('end.html');
    }
    quesCounter++;
    loadText.innerText = `Question ${quesCounter}/${MAX_quesS}`;
    
    loadBarFull.style.width = `${(quesCounter / MAX_quesS) * 100}%`;

    const quesIndex = Math.floor(Math.random() * availableQuesions.length); 
    currentques = availableQuesions[quesIndex];
    ques.innerHTML = currentques.ques;
    
    options.forEach((option) => {
        const number = option.dataset['number'];
        option.innerHTML = currentques['option' + number];
    });

    availableQuesions.splice(quesIndex, 1);
    acceptingAnswers = true;
};

options.forEach((option) => {
    option.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedoption = e.target;
        const selectedAnswer = selectedoption.dataset['number'];

        const classToApply =
            selectedAnswer == currentques.answer ? 'right' : 'wrong';

        if (classToApply === 'right') {
            incrementScore(right_BONUS);
        }

        selectedoption.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedoption.parentElement.classList.remove(classToApply);
            getNewques();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};
