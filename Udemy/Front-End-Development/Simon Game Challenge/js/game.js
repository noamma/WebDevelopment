//console.log("game.js loaded");
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameCommance = false;

$(document).keypress(function(e){if ((e.key == 'a'|| e.key == 'A') && (gameCommance === false)){
  gameCommance = true;
  nextSequence();
}});

$(".btn").click(function(){
  var userChosenColor = this.getAttribute('id');
  animatePress(userChosenColor);
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkAnswer((userClickedPattern.length)-1);
  console.log(userClickedPattern);
});

function playSound(name){
  var buttonSound = new Audio("sounds/"+name+".mp3");
  buttonSound.play();
}

function startOver(){
  $(document).keypress(function(){
    if(gameCommance === false){
      gameCommance = true;
      nextSequence();
    }
  });
  gamePattern = [];
  level = 0;
  gameCommance = false;
}

function animatePress(currentColor){
  $("#"+currentColor).toggleClass("pressed");
  setTimeout(function(){$("#"+currentColor).toggleClass("pressed");},250);
}
function nextSequence(){
  $("h1").text ("Level " + level);
  var randomNumber = Math.floor((Math.random())*4);
  console.log(randomNumber);
  var randomChosenColor = buttonColors[randomNumber];
  console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
  userClickedPattern = [];
}

function gameOver(){
  playSound("wrong");
  $("body").toggleClass("game-over");
  setTimeout(function(){$("body").toggleClass("game-over");},200);
  $("h1").text("Game Over, Press Any Key to Restart");
  startOver();
}

function checkAnswer(currentLevel){
  var userAnswerColor = userClickedPattern[currentLevel];
  var gamePatternColor = gamePattern[currentLevel];
  console.log("User color: " + userAnswerColor + "\nGame Last Color: " + gamePatternColor);
  if(userAnswerColor === gamePatternColor){
    console.log("Correct");
    console.log ("Current User Index: " + currentLevel + "\nGame Pattern Total Steps: " + gamePattern.length);
    if(currentLevel === (gamePattern.length - 1)){
      console.log("Greate job! finished level: " + level + "\nLoading next level");
      level++;
      setTimeout(nextSequence, 1000);
    }
  }else {console.log("Wrong");
          gameOver();}
}
