const ques = document.getElementById('ques');
const options = Array.from(document.getElementsByClassName('option-text'));

let currentques = {};
let acceptingAnswers = false;
let score = 0;
let quesCounter = 0;
let availableQuesions = []; 
let quess = [];

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

            const answeroptions = [...loadedques.incorrect_answers]; // copying all the wrong answers in an array to make all the options to show.
            formattedques.answer = Math.floor(Math.random() * 4) + 1; // getting right answer at a random position from 0-4.
            answeroptions.splice(
                formattedques.answer - 1,
                0,
                loadedques.correct_answer //putting the right answer in the selected position
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