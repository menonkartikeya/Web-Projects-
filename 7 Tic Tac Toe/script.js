
var clicked =true;   //X begins
var count=0;
var AI=false;

window.onload =()=>{
    //Run startGame function when button is clicked
    id("start-btn").addEventListener('click', startGame);

    //set theme 
    id("theme-1").addEventListener('click', changeThemeLight);
    id("theme-2").addEventListener('click', changeThemeDark);
    changeThemeDark();  //makes dark as default theme
     
}

function startGame(){
    // alert('Start!!!');

    clicked =true;   //X begins
    count=0;

    //Generate puzzle based on difficulty
    if(id('player-1').checked){
        AI = true;
    }
    else{
        AI = false;
    }

    id("foot").scrollIntoView({ behavior: 'smooth', block: 'end' });
    //Start Game based on players 
    generateBoard();
}

function generateBoard(){
    //Clear previous board
    clearPrevious();

    //Create 9 tile
    for(let i=0; i<9 ;i++){
        //Create new paragraph element
        let tile = document.createElement('p');

        // tile is blank, add event listener
        tile.innerHTML = " ";

        //Make Cursor pointer for each blank tile
        tile.style.cursor="pointer";

        tile.addEventListener('click', function(){
            // Function of this event listener :
            if(tile.innerHTML == " " && clicked==true && tile.style.cursor!="not-allowed"){
                tile.innerHTML ="X";
                tile.style.cursor="not-allowed";
                if(AI == true){
                    let num = findBestRowAndColumn();
                    if (num!=0){
                        id(num).innerHTML = "O";
                        id(num).style.cursor="not-allowed";
                        count+=1;
                    }
                }
                else{
                    clicked = false;
                }
                count+=1;
                checkIfWon();
            }
            else if (tile.innerHTML == " " && clicked==false && tile.style.cursor!="not-allowed"){
                tile.innerHTML ="O";
                tile.style.cursor="not-allowed";
                
                clicked = true;
                
                count+=1;
                checkIfWon();
            }
        })
        

        //Assign tile id
        tile.id = i;

        //Add tile class to all tiles
        tile.classList.add("tile");

        if(tile.id<6)
            tile.classList.add("bottomBorder");
        
        if((tile.id+1)%3 !=0)
            tile.classList.add("rightBorder");

        //Add tile to board
        id("board").appendChild(tile);

    }

}
function clearPrevious(){
    //Access all the tiles
    let tiles = qsa(".tile");

    //Remove each tile
    for(let i=0; i<tiles.length; i++)
        tiles[i].remove();

    id("print").innerHTML="Player X's Turn";

    //Clear selected Variables
    clicked=true;
    count=0;
}

function checkIfWon(){
    let winner = false;
    var b1, b1, b3, b4, b5, b6, b7, b8, b9;
    b1 = id("0").innerHTML;
    b2 = id("1").innerHTML;
    b3 = id("2").innerHTML;
    b4 = id("3").innerHTML;
    b5 = id("4").innerHTML;
    b6 = id("5").innerHTML;
    b7 = id("6").innerHTML;
    b8 = id("7").innerHTML;
    b9 = id("8").innerHTML;
 
    // Checking if Player X won or not and after that disabled all the other fields
    if (b1 == 'X' && b2 == 'X' && b3 == 'X') {
        winner = true;
        id("print").textContent = " Player X won!";
    }
    else if (b4 == 'X' && b5 == 'X' && b6 == 'X') {
        winner = true;
        id("print").textContent = " Player X won!";
    }
    else if (b7 == 'X' && b8 == 'X' && b9 == 'X') {
        winner = true;
        id("print").textContent = " Player X won!";
    }
    else if (b1 == 'X' && b4 == 'X' && b7 == 'X') {
        winner = true;
        id("print").textContent = " Player X won!";
    }
    else if (b2 == 'X' && b5 == 'X' && b8 == 'X') {
        winner = true;
        id("print").textContent = " Player X won!";
    }
    else if (b3 == 'X' && b6 == 'X' && b9 == 'X') {
        winner = true;
        id("print").textContent = " Player X won!";
    }
    else if (b1 == 'X' && b5 == 'X' && b9 == 'X') {
        winner = true;
        id("print").textContent = " Player X won!";
    }
    else if (b3 == 'X' && b5 == 'X' && b7 == 'X') {
        winner = true;
        id("print").textContent = " Player X won!";
    }

    // Checking for Player O
    else if (b1 == 'O' && b2 == 'O' && b3 == 'O') {
        winner = true;
        if (AI == true){
            id("print").textContent = "You Lost!!! Computer Won.";

        }
        id("print").textContent = " Player O won!";
    }
    else if (b4 == 'O' && b5 == 'O' && b6 == 'O') {
        winner = true;
        if (AI == true){
            id("print").textContent = "You Lost!!! Computer Won.";

        }
        id("print").textContent = " Player O won!";
    }
    else if (b7 == 'O' && b8 == 'O' && b9 == 'O') {
        winner = true;
        if (AI == true){
            id("print").textContent = "You Lost!!! Computer Won.";

        }
        id("print").textContent = " Player O won!";
    }
    else if (b1 == 'O' && b4 == 'O' && b7 == 'O') {
        winner = true;
        if (AI == true){
            id("print").textContent = "You Lost!!! Computer Won.";

        }
        id("print").textContent = " Player O won!";
    }
    else if (b2 == 'O' && b5 == 'O' && b8 == 'O') {
        winner = true;
        if (AI == true){
            id("print").textContent = "You Lost!!! Computer Won.";

        }
        id("print").textContent = " Player O won!";
    }
    else if (b3 == 'O' && b6 == 'O' && b9 == 'O') {
        winner = true;
        if (AI == true){
            id("print").textContent = "You Lost!!! Computer Won.";

        }
        id("print").textContent = " Player O won!";
    }
    else if (b1 == 'O' && b5 == 'O' && b9 == 'O') {
        winner = true;
        if (AI == true){
            id("print").textContent = "You Lost!!! Computer Won.";

        }
        id("print").textContent = " Player O won!";
    }
    else if (b3 == 'O' && b5 == 'O' && b7 == 'O') {
        winner = true;
        if (AI == true){
            id("print").textContent = "You Lost!!! Computer Won.";

        }
        id("print").textContent = " Player O won!";
    }
    if(winner==true){
        disableAllButtons();
    }
    //Checking if Tie
    if (winner==false) {
        if(count==9){
            id("print").textContent = " It's a Tie!\nNo one Wins!";

            disableAllButtons();
        }
        else{
            if (clicked == true) {
                id("print").textContent = "Player X's Turn";
            }
            else {
                id("print").textContent = "Player O's Turn";
            }
        }
    }
}

function disableAllButtons(){ 
    id("0").style.cursor="not-allowed";
    id("1").style.cursor="not-allowed";
    id("2").style.cursor="not-allowed";
    id("3").style.cursor="not-allowed";
    id("4").style.cursor="not-allowed";
    id("5").style.cursor="not-allowed";
    id("6").style.cursor="not-allowed";
    id("7").style.cursor="not-allowed";
    id("8").style.cursor="not-allowed";
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
