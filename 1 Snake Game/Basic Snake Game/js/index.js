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



//Game Functions:

function main(ctime){
    window.requestAnimationFrame(main); //Call again
    // console.log( ctime);
    //Condition for fps:
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;

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
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highScoreBox.innerHTML = "High Score: " +highscoreval;
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

//Main Logic starts here:
musicSound.play();
let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
}
else{
    highscoreval = JSON.parse(highscore);
    highScoreBox.innerHTML = "High Score: " + highscore;
}

// Game Loop:
window.requestAnimationFrame(main);
//Using set interval method is easy but not recommended

window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} //Start the Game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            console.log("ArrowUp");
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            console.log("ArrowDown");
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            console.log("ArrowLeft");
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            console.log("ArrowRight");
            break;
        default:
            break;
    }
})


//Main Logic Ends here