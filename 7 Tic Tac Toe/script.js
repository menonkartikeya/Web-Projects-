// -----------------------------MiniMax Algorithm portion-------------------------------------

var player = "O";
var opponent = "X";

function findBestRowAndColumn(){
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

    var board_grid = [
        [b1, b2, b3],
        [b4, b5, b6],
        [b7, b8, b9]
    ];

    var bestMove = findBestMove(board_grid)
    console.log("The Optimal Move is :")
    console.log("ROW:", bestMove[0], " COL:", bestMove[1])
    if (bestMove[0]==-1 && bestMove[1]==-1)
        return 0
    else if (bestMove[0]==0)
        return bestMove[1]+1
    else if (bestMove[0]==1)
        return bestMove[1]+4
    else
        return bestMove[1]+7
}

function findBestMove(board) {
    let bestVal = -1000
	var bestMove = [-1, -1]

	// Traverse all cells, evaluate minimax function for all empty cells. 
    // And return the cell with optimal value.
	for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            // if cell is empty
            if (board[i][j] == " ") {
				board[i][j] = player     // Make the move
                let moveVal = minimax(board, 0, false)  //compute evaluation function for this move
                board[i][j] = " "   //Undo the move
                //If the value of the current move is more than the best value, then update best

                if (moveVal > bestVal) {		
					bestMove = [i, j]
					bestVal = moveVal
                }
            }
        }
    }
	console.log("The value of the best Move is : ", bestVal) 
	return bestMove
}

//Minimax function: considers all the possible ways game can go and returns the value of board
function minimax(board, depth, isMax) {
	let score = evaluate(board)

	//If Maximizer has won the game return his/her evaluated score
	if (score == 10) 
		return score

	//If Minimizer has won the game return his/her evaluated score
	if (score == -10) 
		return score

	//If there are no more moves and no winner then it is a tie
	if (isMovesLeft(board) == false) 
		return 0

	//If this is maximizer's move
	if (isMax) {	
		let best = -1000

		//Traverse all the cells
		for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
				//Check if cell is empty
				if (board[i][j]==" ") {
				    //Make the move
					board[i][j] = player
                    //Call minimax recursively and choose the maximum value
					best = max( best, minimax(board, depth + 1, !isMax) )
					// Undo the move
					board[i][j] = " "
                }
            }
        }
		return best
    }
	//If this is minimizer's move
	else {
		let best = 1000

		// Traverse all cells
		for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
				//Check if cell is empty
				if (board[i][j] == " ") {
				    //Make the move
					board[i][j] = opponent
                    //Call minimax recursively and choose the minimum value
					best = min(best, minimax(board, depth + 1, !isMax))
                    //Undo the move
					board[i][j] = " "
                }
            }
        }
		return best
    }
}

function evaluate(b) {
    //Checking for Rows for X or O victory.
	for (let row=0;row<3;row++){
		if (b[row][0] == b[row][1] && b[row][1] == b[row][2]) {
			if (b[row][0] == player) 
				return 10
			else if (b[row][0] == opponent) 
				return -10
        }
    }
	//Checking for Columns for X or O victory.
	for (let col=0;col<3;col++){	
		if (b[0][col] == b[1][col] && b[1][col] == b[2][col]) {
			if (b[0][col] == player) 
				return 10
			else if (b[0][col] == opponent) 
				return -10
        }
    }
	//Checking for Diagonals for X or O victory.
	if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) {
		if (b[0][0] == player) 
			return 10
		else if (b[0][0] == opponent) 
			return -10
    }
	if (b[0][2] == b[1][1] && b[1][1] == b[2][0]) {
		if (b[0][2] == player) 
			return 10
		else if (b[0][2] == opponent) 
			return -10
    }
	// Else if none of them have won then return 0
	return 0
}

// moves remcomputerning on the board or not
function isMovesLeft(board) {
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if (board[i][j] == " ") 
                return true
        }
    }
    return false
}
function min(x,y){
    if (x<y)
        return x
    else
        return y
}
function max(x,y){
    if (x>y)
        return x
    else
        return y
}

// --------------------------------------------Frontend Major portion---------------------------
var clicked =true;   //X begins
var count=0;
var computer=false;

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
        computer = true;
    }
    else{
        computer = false;
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
                if(computer == true){
                    let num = findBestRowAndColumn()-1;
                    if (num!=-1){
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
    id('canvas').style.display="none";

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
    
    let begin , end; 
    // Checking if Player X won or not 
    if (b1 == 'X' && b2 == 'X' && b3 == 'X') {
        winner = true;
        id("print").textContent = " Player X won!";
        begin = [95, 40];
        end = [420, 40];
    }
    else if (b4 == 'X' && b5 == 'X' && b6 == 'X') {
        winner = true;
        id("print").textContent = " Player X won!";
        begin = [95, 195];
        end = [420, 195];
    }
    else if (b7 == 'X' && b8 == 'X' && b9 == 'X') {
        winner = true;
        id("print").textContent = " Player X won!";
        begin = [95, 350];
        end = [420, 350];
    }
    else if (b1 == 'X' && b4 == 'X' && b7 == 'X') {
        winner = true;
        id("print").textContent = " Player X won!";
        begin = [95, 30];
        end = [95, 370];
    }   
    else if (b2 == 'X' && b5 == 'X' && b8 == 'X') {
        winner = true;
        id("print").textContent = " Player X won!";
        begin = [250, 30];
        end = [250, 370];
    }
    else if (b3 == 'X' && b6 == 'X' && b9 == 'X') {
        winner = true;
        id("print").textContent = " Player X won!";
        begin = [405, 30];
        end = [405, 370];
    }
    else if (b1 == 'X' && b5 == 'X' && b9 == 'X') {
        winner = true;
        id("print").textContent = " Player X won!";
        begin = [95, 40];
        end = [420, 370];
    }
    else if (b3 == 'X' && b5 == 'X' && b7 == 'X') {
        winner = true;
        id("print").textContent = " Player X won!";
        begin = [410, 30];
        end = [85, 370];
    }

    // Checking if Player O won or not
    else if (b1 == 'O' && b2 == 'O' && b3 == 'O') {
        winner = true;
        if (computer == true)
            id("print").textContent = "You Lost!!! Computer Won.";
        else
            id("print").textContent = " Player O won!";
        begin = [95, 40];
        end = [420, 40];
    }
    else if (b4 == 'O' && b5 == 'O' && b6 == 'O') {
        winner = true;
        if (computer == true)
            id("print").textContent = "You Lost!!! Computer Won.";
        else
            id("print").textContent = " Player O won!";
        begin = [95, 195];
        end = [420, 195];
    }
    else if (b7 == 'O' && b8 == 'O' && b9 == 'O') {
        winner = true;
        if (computer == true)
            id("print").textContent = "You Lost!!! Computer Won.";
        else
            id("print").textContent = " Player O won!";
        begin = [95, 195];
        end = [420, 195];
    }
    else if (b1 == 'O' && b4 == 'O' && b7 == 'O') {
        winner = true;
        if (computer == true)
            id("print").textContent = "You Lost!!! Computer Won.";
        else
            id("print").textContent = " Player O won!";
        begin = [95, 30];
        end = [95, 370];
    }
    else if (b2 == 'O' && b5 == 'O' && b8 == 'O') {
        winner = true;
        if (computer == true)
            id("print").textContent = "You Lost!!! Computer Won.";
        else
            id("print").textContent = " Player O won!";
        begin = [250, 30];
        end = [250, 370];
    }
    else if (b3 == 'O' && b6 == 'O' && b9 == 'O') {
        winner = true;
        if (computer == true)
            id("print").textContent = "You Lost!!! Computer Won.";
        else
            id("print").textContent = " Player O won!";
        begin = [405, 30];
        end = [405, 370];
    }
    else if (b1 == 'O' && b5 == 'O' && b9 == 'O') {
        winner = true;
        if (computer == true)
            id("print").textContent = "You Lost!!! Computer Won.";
        else
            id("print").textContent = " Player O won!";
        begin = [95, 40];
        end = [420, 370];
    }
    else if (b3 == 'O' && b5 == 'O' && b7 == 'O') {
        winner = true;
        if (computer == true)
            id("print").textContent = "You Lost!!! Computer Won.";
        else
            id("print").textContent = " Player O won!";
        begin = [410, 30];
        end = [85, 370];
    }
    //after that disable all the other fields if someone won
    if(winner==true){
        disableAllButtons();

        const canvas = id('canvas');
        canvas.style.display="block";
        if (canvas.getContext) {
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);   //to clear the entire canvas.
            drawLine(context, begin, end, 'skyblue', 15);
        }
    }
    //Checking if Tie
    if (winner==false) {
        if(count==9){
            id("print").textContent = " It's a Tie!\nNo one Wins!";
            disableAllButtons();
        }
        else{   //game is still on
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



function drawLine(ctx, begin, end, stroke = 'black', width = 1) {
    if (stroke) {
        ctx.strokeStyle = stroke;
    }

    if (width) {
        ctx.lineWidth = width;
    }

    ctx.beginPath();
    ctx.lineCap = "round";  //rounded end caps (canvas lineCap Property)
    // ctx.moveTo(...begin);
    // ctx.lineTo(...end);
    // ctx.stroke();

    //drawing with animation effect:
    var startX = begin[0];
    var startY = begin[1];
    var endX = end[0];
    var endY = end[1];
    var amount = 0;
    var drawInterval = setInterval(function() {
        amount += 0.05; 
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + (endX - startX) * amount, startY + (endY - startY) * amount);
        ctx.stroke();

        //base case
        if (amount >= 1) {         //using clearInterval to exit the setInterval
            clearInterval(drawInterval);
        }
    }, 15);
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
