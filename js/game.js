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