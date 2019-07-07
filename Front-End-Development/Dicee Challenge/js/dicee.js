var preffix = "images/dice";
var suffix = ".png"
var num1 = Math.floor((Math.random()*6)+1);
var num2 = Math.floor((Math.random()*6)+1);

if (performance.navigation.type == 1) {
   rollDice();
 }

 function rollDice(){
   console.log("player1 dice: " + num1);
   document.querySelector(".img1").setAttribute("src", preffix + num1 + suffix);
   console.log("player2 dice: " + num2);
   document.querySelector(".img2").setAttribute("src", preffix + num2 + suffix);
   if (num1>num2){
      console.log("player1 wins");
      document.querySelector("h1").innerHTML = "🚩 Player 1 Wins !";
   }else if(num1 === num2){
     console.log("draw");
     document.querySelector("h1").innerHTML = "Draw !";
   }else{
     console.log("player2 wins");
     document.querySelector("h1").innerHTML = "Player 2 Wins ! 🚩";
   }

 }
