buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isGameRunning = false;
var level = 0;

function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePressed(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    level++;
    $("#level-title").text("Level " + level);
}

function startOver() {
    level = 0;
    gamePattern = [];
    isGameRunning = false;
}

function checkAnswer(currentLevel) {
    console.log(userClickedPattern);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("faliure");

        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart.");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

$(".btn").click(function () {
    var userChosenColor = this.id;

    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePressed(userChosenColor);

    console.log("current level = " + level-1)
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function () {
    if(!isGameRunning) {
        isGameRunning = true;
        nextSequence();
    }
});