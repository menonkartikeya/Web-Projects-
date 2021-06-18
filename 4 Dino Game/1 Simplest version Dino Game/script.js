document.addEventListener('keydown', logKey);
function logKey(e) {
    if(e.code=="Space")
        jump();
}

var score = 0;
document.getElementById("scoreBoard").innerHTML=score;

var character = document.getElementById("character");
var block = document.getElementById("block");

function jump(){
    if(character.classList != "animate"){
        character.classList.add("animate");
    }

    setTimeout(function(){
        character.classList.remove("animate");
       
         score++;
         document.getElementById("scoreBoard").innerHTML=score;
        
    },500);
}

var checkOver = setInterval(function(){
    var characterTop = 
    parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var blockLeft = 
    parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    if(blockLeft<70 && blockLeft>50 && characterTop>=130){
        flag=0;
        block.style.animation =  "none";
        block.style.display = "none";
        
        var r = confirm("You lose! Restart the game?");
        if(r==true){
            score=0;
            document.getElementById("scoreBoard").innerHTML=score;
            block.style.display = "block";
            block.style.animation =  "block 1s infinite linear";
        }
        // else   
            // close();
    }
},10);