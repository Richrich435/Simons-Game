var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var ended = false;

$(document).keypress(function()
{
  if(!started)
  {
    nextSequence();
    started = true;
  }
  if(ended)
  {
    gamePattern = [];
    level = 0;
    started = false;
    nextSequence();
  }


});


$(".btn").click(function()
{
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  playSound(userChosenColor);
  animatePress(userChosenColor);
});


//This is used to store the color that is generated
function nextSequence()
{
  level++;
  userClickedPattern = [];
  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 3);
  // console.log(randomNumber);
  var randomChosenColor = buttonColors[randomNumber];
  // console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
}


//This is used to play the sounds of chosen color
function playSound(name)
{
  var soundAudio = new Audio("sounds/" + name + ".mp3");
  soundAudio.play();
}


//This is used to animate the button press
function animatePress(currentColor)
{
  $("#" + currentColor).addClass("pressed");

  setTimeout(function()
  {
    $("#" + currentColor).removeClass("pressed");
  },100);
}



function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {
    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function(){nextSequence()},1000);
      console.log("success");
    }
  }
  else
  {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},200);
    $("#level-title").text("GAME OVER, Press any key to restart");
    ended = true;
  }
}
