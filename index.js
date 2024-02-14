var colorcode=["green","red","yellow","blue"];
var patternGenerated=[];
var userPattern=[];
var l=1;
var flag=1;

$(document).on("keypress",function(){
    if(flag==1)
    start();
});


function start(){
    l=1;
    flag=0;
    patternGenerated=[];
    userPattern=[];
    patternGeneration();
}


$(".btn").on("click",function(){
    var buttonID=$(this).attr("id");
    buttonAnimationOnPress(buttonID);
    userPattern.push(buttonID);
    if(!checkPattern())
    {
        gameOverAnimation();
    }
    else
    {
        if(userPattern.length==l)
        {
            l++;
            setTimeout(patternGeneration,1000);
        }
    }
});



function patternGeneration(){
    if(flag==1)
    {
        start();
        return;
    }
    userPattern=[];
    $("#level-title").text("Level "+l);
    var n=Math.floor(Math.random()*4);
    patternGenerated.push(colorcode[n]);
    patternGenerateAnimation(colorcode[n]);

}

function checkPattern(){
    var index=userPattern.length-1;
    
    if(userPattern[index]!=patternGenerated[index])
    {
        return false;
    }
    return true;
}

function patternGenerateAnimation(btncolor)
{
    $("#"+btncolor).fadeOut(100).fadeIn(100);
    var sound=new Audio("sounds/"+btncolor+".mp3");
    sound.play();
}



function buttonAnimationOnPress(btncolor){
    $("#"+btncolor).addClass("pressed");
    setTimeout(function(){
    $("#"+btncolor).removeClass("pressed");
    },100);
    var sound=new Audio("sounds/"+btncolor+".mp3");
    sound.play();
}


function gameOverAnimation(){
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },100);
    var sound=new Audio("sounds/wrong.mp3");
    sound.play();
    flag=1;
}