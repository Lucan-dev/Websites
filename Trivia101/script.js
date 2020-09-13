let correct_answer = undefined;
let api_question = undefined;

// Get HTML elements
const is_correct = document.querySelector('#is_correct');
const question = document.querySelector('#question');
const TRUE = document.querySelector('#TRUE');
const FALSE = document.querySelector('#FALSE');

function play_sound(src) {
    sound = document.createElement("audio");
    sound.src = src;
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.style.display = "none";
    document.body.appendChild(sound);
    sound.play();
}

// Api link
// const api_link = 'https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=boolean';

// Get data from api
async function get_data() {
    let difficulties = ["easy", "medium", "hard"];
    let index = Math.floor(Math.random() * difficulties.length);
    let difficulty = difficulties[index];

    // let category = 9 + Math.round(Math.random() * 19);

    let api_link = `https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&type=boolean`;
    console.log(api_link);
    // Storing response 
    const response = await fetch(api_link); 

    // Storing data in form of JSON 
    var data = await response.json();

    if (data.response_code == 0) {
        let result = data.results[0];

        api_question = result.question;
        correct_answer = result.correct_answer;

        console.log("The answer is: " + correct_answer);

        // add question
        question.innerHTML = api_question;

    } else {
        console.log("Error");
        console.log(index);
    }
}

get_data();

// Add event listeners
TRUE.addEventListener('click', function() {
    if (correct_answer == "True") {
        play_sound("./Sounds/Tada.wav");
        is_correct.innerHTML = "Correct!"
        get_data();
    } else {
        play_sound("./Sounds/Oops.wav");
        is_correct.innerHTML = 'Incorrect! the correct answer was "false"'
        get_data();
    }
});

FALSE.addEventListener('click', function() {
    if (correct_answer == "False") {
        play_sound("./Sounds/Tada.wav");
        is_correct.innerHTML = "Correct!"
        get_data();
    } else {
        play_sound("./Sounds/Oops.wav");
        is_correct.innerHTML = 'Incorrect! the correct answer was "true"'
        get_data();
    }
});
