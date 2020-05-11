buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Action on click
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    // Check the last answer every time we click
    checkAnswer(userClickedPattern.length - 1);

});


$(document).keydown(function () {
    $("h1").text("Press A key to Start");
    nextSequence();
})

// Checks 2 arrays of answers
function checkAnswer(currentLevel) {
    // userClickedPattern array gets bigger with every click and it compares the last value with gamePattern array, one by one.
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        console.log("success");
        // If length of two arrays are equal initiate the next sequence
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);
            
        }
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}

// Creates a random sequence in the array called gamePattern
function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}