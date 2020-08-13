const ques = document.getElementById('ques');
const options = Array.from(document.getElementsByClassName('option-text'));

let currentques = {};
let acceptingAnswers = false;
let score = 0;
let quesCounter = 0;
let availableQuesions = []; 
let quess = [];