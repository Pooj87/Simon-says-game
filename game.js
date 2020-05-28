var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var keyPressed = false;

var level = 0;

// BUTTON CLICK ANIMATION + SOUND TRIGGER

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});

// RANDOM COLOUR PICKER + FADEIN/FADEOUT WHEN PICKED RANDOMLY EFFECT

function nextSequence() {

  //Once nextSequence() is triggered again BELOW in the CHECKING ANSWER section, we reset the userClickedPattern to an empty array ready for the next level
  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

// CHECKING ANSWER

function checkAnswer(currentLevel) {

// If statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

  console.log("Success");

  //If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
  if(userClickedPattern.length === gamePattern.length) {

    //Call nextSequence() after a 1000 millisecond delay.
    setTimeout(function() {

      nextSequence();

    }, 1000);

  }

} else { // IF THEY GOT THE ANSWER WRONG - WRONG NOISE, RED BACKGROUND FLASH & H1 CHANGE TO WRONG ANSWER

    var audioWrong = new Audio("sounds/wrong.mp3");
    audioWrong.play();

    $("body").addClass("game-over");

    setTimeout(function() {

      $("body").removeClass("game-over");

    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();

  }

}

function startOver() {

  level = 0;
  gamePattern = [];
  keyPressed = false;

}

// KEYPRESS TO START GAME BUT ONLY ONCE!

$(document).keypress(function() {

  if(keyPressed == false) {

    $("#level-title").text("Level " + level);

    nextSequence();

    keyPressed = true;

      }

});

// BUTTON SOUND EFFECTS

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

// BUTTON PRESS ANIMATION

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {

    $("#" + currentColor).removeClass("pressed");

  }, 100);

}
