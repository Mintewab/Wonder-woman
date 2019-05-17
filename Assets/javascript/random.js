var randomResponseResult;

var currentRandomQuestion;
var currentRandomIncorrect;
var currentRandomCorrect;
var currentCategory;
var randomIndex = 0;
var timeLeft = 10;



$(function () {
    $.ajax({
        method: 'GET',
        url: 'https://opentdb.com/api.php?amount=10',
    }).then(function (response) {
        console.log(response);
        randomResponseResult = response.results;
        console.log(randomResponseResult);
    })
    console.log("hi");

    $("#play").click(gameLoad);
})



$("#play").click(gameLoad);

function gameLoad() {
    // hiding the button
    $("#play").hide();

    currentCategory = randomResponseResult[randomIndex].category;
    console.log("currentCategory: " + currentCategory);

    currentRandomQuestion = randomResponseResult[randomIndex].question;
    console.log("currentRandomQuestion: " + currentRandomQuestion);

    currentRandomCorrect = randomResponseResult[randomIndex].correct_answer;
    console.log("currentRandomCorrect: " + currentRandomCorrect);

    currentRandomIncorrect = randomResponseResult[randomIndex].incorrect_answers;
    console.log("currentRandomIncorrect: " + currentRandomIncorrect);

    $("#question").text(currentRandomQuestion);
    $("#category").text(currentCategory);
    $("#options").text(currentRandomIncorrect);
    

    runrun = setInterval(function () {
        loseTime();
    }, 1000);
}
function loseTime() {
    console.log("in loseTime");
    timeLeft--;
    $("#displayTimeLeft").text(timeLeft);
    if (timeLeft < 1) { gameOver(); }
}

function gameOver() {
    clearInterval(runrun);
    $("#answer").text(currentRandomCorrect);

    setTimeout(function () {
        if (urlIndex < imgUrlList.length) {
            randomIndex++;

            currentCategory = randomResponseResult[randomIndex].category;
            
            $('#answer').empty();
            playCurrentImg(currentImgUrl);
            timeLeft = 10;
            runrun = setInterval(function () {
                loseTime();
            }, 1000);
        }
    }, 3000)
}