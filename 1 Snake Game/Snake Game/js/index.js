//Game Constants & Variables:
let inputDir = {x: 0, y: 0};    //Input Direction

const foodSound = new Audio('sounds/food.mp3');
const GameOverSound = new Audio('sounds/gameover.mp3');
const moveSound = new Audio('sounds/move.mp3');
const musicSound = new Audio('sounds/music.mp3');

let speed = 5;  //every 1/5 seconds it will paint the screen
let lastPaintTime = 0;

let snakeArr = [            //This is an array
    {x: 13, y:15}
]
let food = {x: 6, y:7};   //Not an array, only one particle
let score=0;
var level = "1";

//Game Functions:


function setLevel(){
    level = document.getElementById("selectLevel").value;
    switch(level){
        case "1": speed=2;
                break;
        case "2": speed=3;
                break;
        case "3": speed=5;
                break;
        case "4": speed=7;
                break;
        case "5": speed=10;
                break;
        case "6": speed=14;
                break;
        case "7": speed=17;
                break;
        case "8": speed=19;
                break;
        case "9": speed=25;
                break;
        case "10": speed=35;
                break;
        default: speed=5;
                break;
    }
}

function main(ctime){
    window.requestAnimationFrame(main); //Call again
    
    setLevel();
    // console.log( ctime);
    //Condition for fps:
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;

    var m = document.getElementById("musicOnOff");
    if(m.classList.contains("MUSICON")) {
        m.innerHTML = "🎵 Turn Music On";
        musicSound.pause();
    }
    else{
        m.innerHTML = "🎵 Turn Music Off";
        musicSound.play();
    }

    gameEngine();
    

}



function isCollide(snake){
    //If Snake bumps into itself:
    for (let i = 1; i < snakeArr.length; i++) {
        if( snake[0].x === snake[i].x && snake[0].y === snake[i].y){    //head's coordinates equal to any of its body's coordinates
            return true;
        }
    }
    //If Snake bumps into the wall:
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <=0)
        return true;
    
    return false;
}


function gameEngine(){
    //Part 1 : Updating the snake variable
    if(isCollide(snakeArr)){
        GameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over! Press Any Key To Play Again");

        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score=0;
        scoreBox.innerHTML = "Score : "+score;
    }
    //If Eaten the Food, increment the score and regenerate the food:
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();

        score+=1;
        scoreBox.innerHTML = "Score : "+score;
        //We get a variable for all ids in JS

        if(score>highscoreval){
            highscoreval = score;
            levelForhighscoreVal=level;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            localStorage.setItem("levelForhighscore", JSON.stringify(levelForhighscoreVal));

            highScoreBox.innerHTML = "High Score: " + highscoreval;
            LevelForhighScoreBox.innerHTML = "For Level : "+ levelForhighscoreVal;
            console.log(level)
        }

        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})//unshift adds element at start of the array
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a+(b-a)*Math.random())};
    }


    //Moving the snake:
    for (let i = snakeArr.length-2; i >=0; i--) {
        snakeArr[i+1]= {...snakeArr[i]}; //Destructuring the object, else all will point to one last element at the end. So to fix this referencing,: this {...snakeArr[i]} now is one single object consisting only of snakeArr[i]
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //Part 2 : Display the snake :
    board.innerHTML = ""
    snakeArr.forEach((e , index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //Part 3 : Display the food :
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

//Game function ends

//Main Logic starts here:--------------------------------------------------------------------
let highscore = localStorage.getItem("highscore");
let levelForhighscore = localStorage.getItem("levelForhighscore");
if(highscore === null){
    highscoreval = 0;
    levelForhighscoreVal="1";
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
    localStorage.setItem("levelForhighscore", JSON.stringify(levelForhighscoreVal));
}
else{
    highscoreval = JSON.parse(highscore);
    levelForhighscoreVal = JSON.parse(levelForhighscore);
    highScoreBox.innerHTML = "High Score: " + highscore;
    LevelForhighScoreBox.innerHTML = "For Level: " + levelForhighscore;
}

// Game Loop:
window.requestAnimationFrame(main);
//Using set interval method is easy but not recommended


// Keyboard events:
window.addEventListener('keydown', e =>{    
    switch(e.key){
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowDown":
            moveDown();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
        default:
            if(inputDir.x===0 && inputDir.y===0){  //not started game yet
                moveSound.play();
                inputDir = {x: 0, y: -1} //move up on start
            }
            break;
    }
})
// Touch Swipe Events:
document.addEventListener('swiped-up', function(e) {
    console.log("Swiped");  // console.log(e.target); 
    moveUp();
});
document.addEventListener('swiped-down', function(e) {
    console.log("Swiped");  // console.log(e.target); 
    moveDown();
});
document.addEventListener('swiped-left', function(e) {
    console.log("Swiped");  // console.log(e.target);     
    moveLeft();
});
document.addEventListener('swiped-right', function(e) {
    console.log("Swiped");  // console.log(e.target); 
    moveRight();
});

//Setting diretions:
function moveUp(){
    if(inputDir.x===0 && inputDir.y===1 && snakeArr.length>2){
        //going down and has length above 2, then do nothing
    }
    else{
        moveSound.play();
        inputDir.x = 0;
        inputDir.y = -1;
        console.log("ArrowUp");
    }
}
function moveDown(){
    if(inputDir.x===0 && inputDir.y===-1 && snakeArr.length>2){
        //going up and has length above 2, then do nothing
    }
    else{
        moveSound.play();
        inputDir.x = 0;
        inputDir.y = 1;
        console.log("ArrowDown");
    }
}
function moveLeft(){
    if(inputDir.x===1 && inputDir.y===0 && snakeArr.length>2){
        //going right and has length above 2, then do nothing
    }
    else{
        moveSound.play();
        inputDir.x = -1;
        inputDir.y = 0;
        console.log("ArrowLeft");
    }
}
function moveRight(){
    if(inputDir.x===-1 && inputDir.y===0 && snakeArr.length>2){
        //going left and has length above 2, then do nothing
    }
    else{
        moveSound.play();
        inputDir.x = 1;
        inputDir.y = 0;
        console.log("ArrowRight");
    }
}


//Main Logic Ends here-------------------------------------------------------------------



// The Settings modal
var modal = document.getElementById("settingsModal");

var btn = document.getElementById("gameSettings");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


var m = document.getElementById("musicOnOff");
m.addEventListener("click", function(){
    m.classList.toggle("MUSICON");
})
