//console.log("game.js loaded");
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameCommance = false;

$(document).keypress(function(e){if ((e.key == 'a'|| e.key == 'A') && (gameCommance === false)){
  gameCommance = true;
  nextSequence();
}})
$(".btn").click(function(){var userChosenColor = this.getAttribute('id');animatePress(userChosenColor);playSound(userChosenColor);userClickedPattern.push(userChosenColor);console.log(userClickedPattern);});

function playSound(name){
  var buttonSound = new Audio("sounds/"+name+".mp3");
  buttonSound.play();
}

function animatePress(currentColor){
  $("#"+currentColor).toggleClass("pressed");
  setTimeout(function(){$("#"+currentColor).toggleClass("pressed");},250);
}
function nextSequence(){
  $("h1").text ("Level " + level);
  level++;
  var randomNumber = Math.floor((Math.random())*4);
  console.log(randomNumber);
  var randomChosenColor = buttonColors[randomNumber];
  console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
}
