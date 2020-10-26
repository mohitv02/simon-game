var gamePattern = [];



var count = 0;
var level = 0;

var buttonColor = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var start = false;

$(document).keypress(function() {
    if (!start) {
        $("h1").text("Level " + level);
        start = true;
        next_Sequence();
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentlevel) {
    if ((gamePattern[currentlevel] === userClickedPattern[currentlevel])) {

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                next_Sequence();
            }, 1000);
        }


    } else {
        exit();
    }



}

function next_Sequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChoosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#" +
        randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);

}


function exit() {

    playSound("wrong");

    $("#level-title").text("Game Over, Press Any Key to Restart");

    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    start = false;
}

function playSound(name) {
    var musicName = name + ".mp3";
    var music = new Audio("./sounds/" + musicName);
    music.play();
}

function animatePress(currentColour) {

    $("#" + currentColour).addClass('pressed');
    setTimeout(function() {
        $("#" + currentColour).removeClass('pressed');
    }, 100);

}