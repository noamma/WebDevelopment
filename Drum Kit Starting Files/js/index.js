var drumButtons = document.querySelectorAll(".drum");
var drumSounds = [];
for (var i = 0; i<drumButtons.length; i++){
  drumButtons[i].addEventListener("click", handleClick);
  //drumSounds[this.innerHtml] = this.getAttribute("back")
  // var drumImagePath = drumButtons[i].style.backgroundImage.url;
  // var drumName = drumImagePath.split('/');
  // drumName = drumName[1].split('.');
  // drumName = drumName[0];


}

function getDrumPath(param){
  var path = "";
  switch (param) {
    case 'w': path = "sounds/tom1.mp3"; break;
    case 'a': path = "sounds/tom2.mp3"; break;
    case 's': path = "sounds/tom3.mp3"; break;
    case 'd': path = "sounds/tom4.mp3"; break;
    case 'j': path = "sounds/snare.mp3"; break;
    case 'k': path = "sounds/kick.mp3"; break;
    case 'l': path = "sounds/crash.mp3"; break;
    default: console.log(param);break;
  }
  if(path.length>0){
      return path;
  }

}
function handleClick(){
    var param = this.innerHTML;//alert("i got clicked!");
    console.log("clicked button:  - " + param);
    playDrumSound(param);
}

function playDrumSound(_param){
  //var drumPath =
  var drumSound = new Audio(getDrumPath(_param));
  drumSound.play();
}

addEventListener("keydown", function(e){console.log("Keystroke detected: " + e.key);playDrumSound(e.key)});
