//Sample test Borads if Want To Load Manually
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


/*--------------------------------Sudoku Building Logic---------------------------------------*/
var strSol;
var str;
var ans=[]; //our final array of sudoku puzzle and its solution

var Sudoku = /** @class */ (function () {
    function Sudoku(N, K) {
        if (this.mat === undefined) {
            this.mat = null;
        }
        if (this.N === undefined) {
            this.N = 0;
        }
        if (this.SRN === undefined) {
            this.SRN = 0;
        }
        if (this.K === undefined) {
            this.K = 0;
        }
        this.N = N;
        this.K = K;
        var SRNd = Math.sqrt(N);
        this.SRN = /* intValue */ (SRNd | 0);
        this.mat = (function (dims) { var allocate = function (dims) { if (dims.length === 0) {
            return 0;
        }
        else {
            var array = [];
            for (var i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([N, N]);
    }
    Sudoku.prototype.fillValues = function () {
        this.fillDiagonal();
        this.fillRemaining(0, this.SRN);

        strSol="";
        for(let i=0;i<9;i++)
            for(let j=0;j<9;j++)
                strSol+= this.mat[i][j].toString();

        this.removeKDigits();
    };
    Sudoku.prototype.fillDiagonal = function () {
        for (var i = 0; i < this.N; i = i + this.SRN) {
            this.fillBox(i, i);
        }
    };
    Sudoku.prototype.unUsedInBox = function (rowStart, colStart, num) {
        for (var i = 0; i < this.SRN; i++) {
            for (var j = 0; j < this.SRN; j++) {
                if (this.mat[rowStart + i][colStart + j] === num)
                    return false;
                ;
            }
            ;
        }
        return true;
    };
    Sudoku.prototype.fillBox = function (row, col) {
        var num;
        for (var i = 0; i < this.SRN; i++) {
            {
                for (var j = 0; j < this.SRN; j++) {
                    {
                        do {
                            {
                                num = this.randomGenerator(this.N);
                            }
                        } while ((!this.unUsedInBox(row, col, num)));
                        this.mat[row + i][col + j] = num;
                    }
                    ;
                }
            }
            ;
        }
    };
    Sudoku.prototype.randomGenerator = function (num) {
        return (Math.floor((Math.random() * num + 1)) | 0);
    };
    Sudoku.prototype.CheckIfSafe = function (i, j, num) {
        return (this.unUsedInRow(i, num) && this.unUsedInCol(j, num) && this.unUsedInBox(i - i % this.SRN, j - j % this.SRN, num));
    };
    Sudoku.prototype.unUsedInRow = function (i, num) {
        for (var j = 0; j < this.N; j++) {
            if (this.mat[i][j] === num)
                return false;
            ;
        }
        return true;
    };
    Sudoku.prototype.unUsedInCol = function (j, num) {
        for (var i = 0; i < this.N; i++) {
            if (this.mat[i][j] === num)
                return false;
            ;
        }
        return true;
    };
    Sudoku.prototype.fillRemaining = function (i, j) {
        if (j >= this.N && i < this.N - 1) {
            i = i + 1;
            j = 0;
        }
        if (i >= this.N && j >= this.N)
            return true;
        if (i < this.SRN) {
            if (j < this.SRN)
                j = this.SRN;
        }
        else if (i < this.N - this.SRN) {
            if (j === (((i / this.SRN | 0)) | 0) * this.SRN)
                j = j + this.SRN;
        }
        else {
            if (j === this.N - this.SRN) {
                i = i + 1;
                j = 0;
                if (i >= this.N)
                    return true;
            }
        }
        for (var num = 1; num <= this.N; num++) {
            {
                if (this.CheckIfSafe(i, j, num)) {
                    this.mat[i][j] = num;
                    if (this.fillRemaining(i, j + 1))
                        return true;
                    this.mat[i][j] = 0;
                }
            }
            ;
        }
        return false;
    };
    Sudoku.prototype.removeKDigits = function () {
        var count = this.K;
        while ((count !== 0)) {
            {
                var cellId = this.randomGenerator(this.N * this.N) - 1;
                var i = ((cellId / this.N | 0));
                var j = cellId % 9;
                if (j !== 0)
                    j = j - 1;
                if (this.mat[i][j] !== 0) {
                    count--;
                    this.mat[i][j] = 0;
                }
            }
        }
        ;
    };
    Sudoku.prototype.printSudoku = function () {
        // for (var i = 0; i < this.N; i++) {
        //     {
        //         for (var j = 0; j < this.N; j++) {
        //             console.info(this.mat[i][j] + " ");
        //         }
        //         console.info();
        //     }
        //     ;
        // }
        // console.info();
     
     

    console.log(strSol)
    str="";
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(this.mat[i][j]==0)
                str+="-";
            else
                str+= this.mat[i][j].toString();
        }
    }
        
            
        ans = [str, strSol];
        console.log(ans)
    };
    Sudoku.main = function (N,K) {
        var sudoku = new Sudoku(N, K);
        sudoku.fillValues();
        sudoku.printSudoku();
    };
    return Sudoku;
}());
Sudoku["__class"] = "Sudoku";


/*----------------------------------------Logic of Game Frontend Starts---------------------- */

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
      id("pausebtn").addEventListener('click', pauseGame);
      id("continuebtn").addEventListener('click', play);
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
export var K 
function startGame(){
    // alert('Start!!!');

    //Generate puzzle based on difficulty
    if(id('diff-1').checked){
        Sudoku.main(9,30);                      //Generating sudoku puzzle called
        easy = ans;
    }
    else if (id('diff-2').checked){
        Sudoku.main(9,45);                      //Generating sudoku puzzle called
        medium = ans;
    }
    else{
        Sudoku.main(9,55);                      //Generating sudoku puzzle called
        hard = ans;
    }
        

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

    id("pausebtn").textContent="| |";
    id("pausebtn").style.color="inherit";

    window.scrollTo(0,id("head").scrollHeight);
    
    //Create Board based on difficulty 
    generateBoard(board);
    
    //starts the timer
    startTimer();

    //Show number container & pause button
    id("number-container").classList.remove("hidden");
    id("pausebtn").classList.remove("hidden");

    play();
}

var isPaused=false;
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
        if(!isPaused) {
            timeRemaining--;
            //If no time remaining, end the game
            if(timeRemaining === 0)
                endGame();
            id("timer").textContent = timeConversion(timeRemaining);
        }
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
        id("pausebtn").textContent = "View Solution";
    }
    else{
        id("lives").style.color="blue";
        id("lives").textContent = "Congratulations! You Won!";
        id("pausebtn").classList.add("hidden");
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

var modal = id("myModal");
function pauseGame(){
    var b = id("pausebtn");
    if(b.textContent=="View Solution"){
        showSolution();
    }
    else if(!b.classList.contains("paused")){
        b.classList.add('paused');
        isPaused = true;
        id("board").style.visibility = "hidden";
        modal.style.display = "block";
        id("pausebtn").textContent="▷";
    }
}

function play(){
    id("board").style.visibility = "visible";
    id("pausebtn").classList.remove('paused');
    isPaused = false;
    modal.style.display = "none";

    id("pausebtn").textContent="| |";
}
id("quitbtn").onclick = function() {
    if (confirm('Are you sure you want to quit the game and see the solution?')) {
        console.log('Quitter!');
        id("board").style.visibility = "visible";
        modal.style.display = "none";
        lives=0;
        endGame();
        showSolution();
    }
    else {
        console.log("Don't quit! By mistake");
    }
}

function showSolution(){
    let tiles = qsa(".tile");

    //set solution based on difficulty selection
    let solution;
    if(id("diff-1").checked)
        solution = easy[1];
    else if (id('diff-2').checked)
        solution = medium[1];
    else
        solution = hard[1];
        
    for(let i=0; i<tiles.length; i++)  {
        if(tiles[i].textContent==''){
            tiles[i].textContent = solution.charAt(i);
            tiles[i].style.color = "skyblue";
        }                    
    }
}

function changeThemeLight(){    
    qs("body").classList.remove("dark");
    document.getElementsByTagName("button")[0].style.color="black";
    qs(".modal-content").classList.add("dark");
    id("continuebtn").style.color="white";
    id("quitbtn").style.color="white";
}

function changeThemeDark(){
    qs("body").classList.add("dark");
    document.getElementsByTagName("button")[0].style.color="white";
    qs(".modal-content").classList.remove("dark");
    id("continuebtn").style.color="black";
    id("quitbtn").style.color="black";
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
