var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern =[];
var level = 0;
var started = false;


//start game
$(document).keypress(function() {
    if (!started) {
  
      
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

//which buttons clicked
$(".btn").click(function handler(){
    var userChosenColour =$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

//check answer
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
        if (gamePattern.length=== userClickedPattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);  
        }
    }
    else {
        // console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
       //restart the game
      
        startOver();
      
    }
};

// next sequence
function nextSequence() {
    userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  
 playSound(randomChosenColour);
 
 
};

//play sound
function playSound(name){
      var audio = new Audio("sounds/"+ name+".mp3"); 
      audio.play();

};

//animate
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
         $("#"+currentColour).removeClass("pressed");
    }, 100);
};


//restart the game
function startOver() {
 level =0;
 gamePattern = [];
 started =  false; 
}