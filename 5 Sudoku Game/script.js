//Load Borads from file or Manually

var easy = [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
];
var medium = [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
];
var hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
];



//Game Variables
var timer;
var timeRemaining;
var lives;
var selectedNum;
var selectedTile;
var disableSelect;

window.onload =()=>{
    //Run startGame function when button is clicked
    id("start-btn").addEventListener('click', startGame);

    //set theme 
    id("theme-1").addEventListener('click', changeThemeLight);
    id("theme-2").addEventListener('click', changeThemeDark);
    changeThemeDark();  //makes dark as default theme
    
    for(let i=0; i<id("number-container").children.length; i++){
        // console.log(id("number-container").children[i])
        id("number-container").children[i].addEventListener("click", numberContainer)
    }

    //Add event listeners to keyboard
    document.addEventListener('keydown', (event) => {
        const keyName = event.key;
      
        switch(keyName){
            case '1' : id("number-container").children[0].click();
                        break;
            case '2' : id("number-container").children[1].click();
                        break;
            case '3' : id("number-container").children[2].click();
                        break;
            case '4' : id("number-container").children[3].click();
                        break;
            case '5' : id("number-container").children[4].click();
                        break;
            case '6' : id("number-container").children[5].click();
                        break;
            case '7' : id("number-container").children[6].click();
                        break;
            case '8' : id("number-container").children[7].click();
                        break;
            case '9' : id("number-container").children[8].click();
                        break;
        }
      }, false);
      
}

function numberContainer(){
    // console.log(this)
    //If selecting is not disabled 
    if(!disableSelect){
        
        //If number is already selected
        if(this.classList.contains("selected")){
            //then remove selection
            this.classList.remove("selected");
            selectedNum=null;
        }
        else{
            //Deselect all other numbers
            for(let i=0;i<9;i++){
                id("number-container").children[i].classList.remove("selected");
            }

            //Select it and update selectNum variable
            this.classList.add("selected");
            selectedNum = this;
            updateMove();
        }

    }
}

function startGame(){
    // alert('Start!!!');        

    //Choose Board difficulty
    let board;
    if(id('diff-1').checked)
        board = easy[0];
    else if (id('diff-2').checked)
        board = medium[0];
    else
        board = hard[0];

    //Set lives to 3 and enable selecting numbers and tiles
    lives = 3;
    disableSelect = false;
    id('lives').textContent = "Lives Remaining: 3";
    id("lives").style.color="inherit";

    //Create Board based on difficulty 
    generateBoard(board);

    //starts the timer
    startTimer();

    //Show number container
    id("number-container").classList.remove("hidden");
}

function startTimer(){
    //Set time remaining based on input
    if(id("time-1").checked)
        timeRemaining = 180;
    else if(id("time-2").checked)
        timeRemaining = 300;
    else
        timeRemaining = 600;

    //sets the timer for 1st second
    id("timer").textContent = timeConversion(timeRemaining);

    //sets timer to update every second
    timer = setInterval(()=>{
        timeRemaining--;

        //If no time remaining, end the game
        if(timeRemaining === 0)
            endGame();
        id("timer").textContent = timeConversion(timeRemaining);
    },1000)
}

function timeConversion(time){
    //convert seconds into string of MM:SS format
    let minutes = Math.floor(time/60);

    if(minutes<10) 
        minutes="0"+minutes;

    let seconds = time%60;
    if(seconds<10)
        seconds="0"+seconds;

    return minutes+":"+seconds;
}

function generateBoard(board){
    //Clear previous board
    clearPrevious();

    //variable used to increment tile ids
    let idCount=0;

    //Create 81 tile
    for(let i=0; i<81 ;i++){
        //Create new paragraph element
        let tile = document.createElement('p');

        // if the tile is not blank
        if(board.charAt(i)!="-"){
            tile.textContent = board.charAt(i);
        }
        //If the tile is blank, add event listener
        else{

            //Make Cursor pointer for each blank tile
            tile.style.cursor="pointer";

            tile.addEventListener('click', function(){
                //If selecting is not disabled
                if(!disableSelect){
                    //If the tile is already selected
                     if(tile.classList.contains("selected")){

                        //remove selection
                        tile.classList.remove("selected");
                        selectedTile = null;
                     }
                     else{
                         //deselect all other tiles
                        for(let i=0; i<81; i++){
                            qsa(".tile")[i].classList.remove("selected");
                        }
                        //add selection and update variable
                        tile.classList.add("selected");
                        selectedTile = tile;
                        updateMove();
                     }
                }
            })
        }

        //Assign tile id
        tile.id = idCount;

        //Increment for next tile
        idCount++;

        //Add tile class to all tiles
        tile.classList.add("tile");

        if((tile.id>17 && tile.id<27) || (tile.id>44 && tile.id<54))
            tile.classList.add("bottomBorder");
        
        if((tile.id+1)%9 == 3 || (tile.id+1)%9 == 6)
            tile.classList.add("rightBorder");

        //Add tile to board
        id("board").appendChild(tile);
    }

    //Make Cursor pointer for number-container
    for(let i=0; i<id("number-container").children.length;i++)
        id("number-container").children[i].style.cursor="pointer";
}

function updateMove(){

    //if a tile and number is selected
    if(selectedTile && selectedNum){ //they are both not null

        //set the tile to the correct number
        selectedTile.textContent = selectedNum.textContent;
        if(checkCorrect(selectedTile)){ //number matches the corresponding number in solution key

            //deselect the tile
            selectedTile.classList.remove("selected");
            selectedNum.classList.remove("selected");

            //clear the selected variables
            selectedNum =null;
            selectedTile=null;


            //check if all the tiles in board are correct
            if(checkDone()){
                endGame();
            }
        }
        else{// the number does not match the solution key 

            // Disable selecting numbers for 1 second
            disableSelect=true;

            //make the tile turn red
            selectedTile.classList.add("incorrect");

            // run in 1 second
            setTimeout(()=>{

                //subtract lives by one
                lives--;

                //if no lives left, end the game
                if(lives === 0)
                    endGame();
                else{   //if lives is not equal to zero

                    //Update lives text
                    id("lives").textContent = "Lives Remaining: "+lives;

                    //Rename selecting numbers and tiles
                    disableSelect=false;
                }
                //Restore tile color and remove selected from both
                selectedTile.classList.remove("incorrect");
                selectedTile.classList.remove("selected");
                selectedNum.classList.remove("selected");

                //Clear the tile's text and clear selection variables
                selectedTile.textContent = "";
                selectedTile = null;
                selectedNum  = null;
            },1000);
        }
    }
}

function endGame(){

    //disable moves and stop the timer
    disableSelect = true;
    clearTimeout(timer);

    //display won or lost message
    if(lives === 0 || timeRemaining === 0){
        id("lives").style.color="red";
        id("lives").textContent = "You Lost!!";
    }
    else{
        id("lives").style.color="blue";
        id("lives").textContent = "Congratulations! You Won!";
    }
    
    //Make cursors as not-allowed for tiles and number-container 
    for(let i=0; i<qsa(".tile").length; i++)
        qsa(".tile")[i].style.cursor="not-allowed";
    for(let i=0; i<id("number-container").children.length;i++)
        id("number-container").children[i].style.cursor="not-allowed";
}

function checkDone(){
    let tiles = qsa(".tile");
    for(let i=0; i<tiles.length; i++)  {
        if(tiles[i].textContent === "")
            return false;
    }
    return true;
}

function checkCorrect(tile){

    //set solution based on difficulty selection
    let solution;
    if(id("diff-1").checked)
        solution = easy[1];
    else if (id('diff-2').checked)
        solution = medium[1];
    else
        solution = hard[1];

    //If tile's number equals to solution's number 
    if(solution.charAt(tile.id)===tile.textContent)
        return true;
    else
        return false;
}

function clearPrevious(){
    //Access all the tiles
    let tiles = qsa(".tile");

    //Remove each tile
    for(let i=0; i<tiles.length; i++)
        tiles[i].remove();

    //If there is a timer, clear it Up
    if(timer)
        clearTimeout(timer);
    
    //Deselect any number
    for(let i=0;i<id("number-container").children.length; i++){
        id("number-container").children[i].classList.remove("selected");
    }

    //Clear selected Variables
    selectedTile=null;
    selectedNum =null;
}


function changeThemeLight(){    
    qs("body").classList.remove("dark");
    document.getElementsByTagName("button")[0].style.color="black";
}

function changeThemeDark(){
    qs("body").classList.add("dark");
    document.getElementsByTagName("button")[0].style.color="white";
}

//Helper functions
function id(id) {
    return document.getElementById(id);
}
function qs(selector) {
    return document.querySelector(selector);
}
function qsa(selector) {
    return document.querySelectorAll(selector);
}
