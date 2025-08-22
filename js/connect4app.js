
/*-------------------------------- Constants --------------------------------*/


/*---------------------------- Variables (state) ----------------------------*/

let board = [['', '', '', '', '', ''],
['', '', '', '', '', ''],
['', '', '', '', '', ''],
['', '', '', '', '', ''],
['', '', '', '', '', ''],
['', '', '', '', '', ''],
['', '', '', '', '', '']];

let turn;
let winner = false;
let draw = false;



/*------------------------ Cached Element References ------------------------*/

const circleEls = document.querySelectorAll(".circle");

const columnEls = document.querySelectorAll(".column");

const messageEl = document.querySelector("#message");

const restartButton = document.querySelector("#restart");

const redMovesLeft = document.querySelector("#redTeamPieces");

const blackMovesLeft = document.querySelector("#blackTeamPieces");





/*-------------------------------- Functions --------------------------------*/

//RENDER
const render = () => {
    updateMessage();
    updateBoard();
}


//INIT BOARD
function initialize() {
    board = [['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', '']];
    turn = "R";
    messageEl.innerText = 'Let\'s Play!';
    redMovesLeft.innerText = `Red Pieces: ${teamMoves.redTeam}`;
    blackMovesLeft.innerText = `Black Pieces: ${teamMoves.blackTeam}`;
}




//RESET BOARD
function resetBoard() {
    board = [['', '', '', '', '', ''], 
             ['', '', '', '', '', ''], 
             ['', '', '', '', '', ''], 
             ['', '', '', '', '', ''], 
             ['', '', '', '', '', ''], 
             ['', '', '', '', '', ''], 
             ['', '', '', '', '', '']];
    turn = `R`;
    messageEl.innerText = `It's ${turn} teams move.`;
    redMovesLeft.innerText = `Red Pieces: ${redTeamPieces}`;
    blackMovesLeft.innerText = `Black Pieces: ${blackTeamPieces}`;
    winner = false;
    draw = false;
    initialize();
    render();
}


//UPDATE MESSAGE
function updateMessage() {
    if (winner === false && draw === false) {
        messageEl.innerHTML = `It's ${turn} teams move.`;
    } else if (winner === false && draw === true) {
        messageEl.innerHTML = "DRAW!"
    } else if (winner === true && draw === false) {
        messageEl.innerHTML = `Congrats ${turn} team! You won!`; //way to specify team? like congrats ${turn} team you won!
    }
}


//UPDATE BOARD:// need to access COLUMNS first THEN ROWS.
// Part of your problem is that you're mixing up DOM elements and strings. EX OLD CODE:
// let updateRox = board[i][j];
// if updateRow.innerText === 'R'

// board[j] is a column ARRAY. A list of strings. You can't access it like an actual DOM element. so nothing
// was changing. were mixing up our strings and DOMS. 

function updateBoard() {
    for (let col = 0; col < board.length; col++) {
        for (let row = 0; row < board[col].length; row++) {
            const circleId = `${col}_${row}`; 
            const circle = document.getElementById(circleId);
            const circleValue = board[col][row];
            if (circleValue === "R") {  
                circle.style.backgroundColor = "red";
                circle.style.color = "white";
            } else if (circleValue === "B") {
                circle.style.backgroundColor = "black";
                circle.style.color = "white";
            } else {
                circle.style.backgroundColor = "white";
                circle.innerText = '';
            }
        }
    }
}


//SWITCH PLAYER TURN

function switchPlayerTurn() {
    if (winner === false && draw === false) {
        if (turn === 'R') {
            turn = 'B';
        } else {
            turn = 'R';
        }
    }
}

//DEDUCT PIECE.

let redTeamPieces;
let blackTeamPieces;

function deductPiece() {
    redTeamPieces = teamMoves.redTeam;
    blackTeamPieces = teamMoves.blackTeam;
    for (let col = 0; col < board.length; col++) {
        for (let row = 0; row < board[col].length; row++) {
            let circleId = board[col][row];
            if (circleId === 'R') {
                redTeamPieces -= 1;
            } if (circleId === 'B') {
                blackTeamPieces -= 1;
            }
        }
    }
}



//UPDATE DISPLAY 
function updateDisplay() {
    if (winner === false && draw === false) {
        redMovesLeft.innerText = `Red Pieces: ${redTeamPieces}`;
        blackMovesLeft.innerText = `Black Pieces: ${blackTeamPieces}`;
    }
}


//CHECK FOR TIE

function checkForDraw() {
    if (redTeamPieces === 0 && blackTeamPieces === 0 && winner === false) {
        draw = true;
    }
}


//CHECK FOR WINNER
function checkForWinner() {
    for (let col = 0; col < board.length; col++) {
        for (let row = 0; row < board[col].length; row++) {
            let currentCircle = board[col][row];
            if (currentCircle === '') {
                continue; // MDN to find continue. Loop kept stopping here originally.
                //Check horizontal win.     
            } if (col <= board.length - 4) { 
                let hCount = 1;
                for (let i = 1; i <= 3; i++) {
                    if (board[col + i][row] === currentCircle) { //chatGTP to debug this line. had ==+ instead of ===. 
                        hCount += 1;
                    } else {
                        break;
                    }
                }
                if (hCount === 4) {
                    return winner = true;
                }
                // CHECK FOR VERT WIN. 
            } if (row <= board[col].length - 4) {
                let vCount = 1;
                for (let i = 1; i <= 3; i++) {
                    if (board[col][row + i] === currentCircle) {
                        vCount += 1;
                    } else {
                        break;
                    }
                } if (vCount === 4) {
                    return winner = true;
                }
                //CHECK DIAG DOWN RIGHT       
            } if (col <= board.length - 4 && row <= board[col].length - 4) {
                let rDownCount = 1;
                for (let i = 1; i <= 3; i++) {
                    if (board[col + i][row + i] === currentCircle) {
                        rDownCount += 1;
                    } else {
                        break;
                    }
                } if (rDownCount === 4) {
                    return winner = true;
                }
                //CHECK DIAG DOWN LEFT                 
            } if (col >= 3 && row <= board[col].length - 4) {
                let lDownCount = 1;
                for (let i = 1; i <= 3; i++) {
                    if (board[col - i][row + i] === currentCircle) {
                        lDownCount += 1;
                    } else {
                        break;
                    }
                } if (lDownCount === 4) {
                    return winner = true;
                }
            }
        }
    }
}


//CLICK FUNCTION (also drop piece handler).

const clickColumn = (event) => { 
    let columnId = parseInt(event.currentTarget.id); //Used chatGPT to debug this line. was getting an error depending on DOM element that was click (column vs circle). 
    let columnCircles = event.currentTarget.querySelectorAll('.circle');
    if (winner === true) {
        return;
    } else if (columnCircles[5].innerText === '') {
        board[columnId][5] = turn;
        columnCircles[5].innerText = turn;
    } else if (columnCircles[4].innerText === '') {
        board[columnId][4] = turn;
        columnCircles[4].innerText = turn;
    } else if (columnCircles[3].innerText === '') {
        board[columnId][3] = turn;
        columnCircles[3].innerText = turn;
    } else if (columnCircles[2].innerText === '') {
        board[columnId][2] = turn;
        columnCircles[2].innerText = turn;
    } else if (columnCircles[1].innerText === '') {
        board[columnId][1] = turn;
        columnCircles[1].innerText = turn;
    } else if (columnCircles[0].innerText === '') {
        board[columnId][0] = turn;
        columnCircles[0].innerText = turn;
    } else if (columnCircles.innerText !== '') {
        return;
    }
    updateBoard();
    deductPiece();
    updateDisplay();
    checkForWinner();
    checkForDraw();
    switchPlayerTurn();
    updateMessage();
}



/*----------------------------- Event Listeners -----------------------------*/
//LOAD APP

document.addEventListener('DOMContentLoaded', function () {
    initialize();
    columnEls.forEach((column) => {
        column.addEventListener('click', clickColumn,);
    });
});

//RESTART
restartButton.addEventListener('click', resetBoard);




/*------------------------GRAVEYARD-----------------------------------------*/

/*
ADD WINNING COMBOS LIST HERE. MUST ITERATE OVER EACH OF THESE.
const winningCombos = [['0_0', '0_1', '0_2', '0_3', '0_4', '0_5']];

-DC no longer necessary. Went different route for check win condition based on Jan's suggestion. 

CLICK COLUMN NOTES and THINGS I LEARNED:

const clickColumn = (event) => { ///
    let columnId = parseInt(event.currentTarget.id); //Used chatGPT to debug this line. was getting an error depending on DOM element that was click (column vs circle). 
    let columnCircles = event.currentTarget.querySelectorAll('.circle');


click function pseudocode:
Column has been clicked. You hav id for column. You want to use that
column Id to check if the row array has ANY values. If no value exists, the last
 available slot is styled based on the player whose currently playing. If the last spot 
 DOES have a value, then the next available spot at the END of the array should be styled. 

NOTE for 271 -274
    } else if (columnCircles[2].innerText === '') {
        board[columnId][2] = turn;
        columnCircles[2].innerText = turn;  //Had to update this to innerText from innerHTML to see R or B updates in array.  
        console.log(board[columnId]);



 Notes on line 239 for clickColumn Function:


 WHY currentTarget.id was necessary:

 currentTarget.id refers to the element the EVENT LISTENER IS ATTACHED TO. Think of it as targeting only the Parent elements,
 while updating the children. Our eventlistener is attached to our Columns, not the individual circle (which is ideal).
However, this meant that if you clicked a circle, it would return UNDEFINED. 

SO currentTarget.id always gave us the COLUMN, and therefore the correct id was selected,
 REGARDLESS oof what part inside of the columnn was clicked. 

original event.target.id was giving us EITHER the column OR the circle. Column was defined,
circle was not. This is because event.target refers
to the actual DOM element that was clicked. so clicking on the circle with
event.target would try and give us the id of the circle divs, which is not the 
right value for indexing our board [columnId]. (ASK SAM ABOUT HOW THIS GETS PASSED ON.)


WIN CONDITION NOTES

CHECK FOR WINNER
function checkForWinner() {
    for (let col = 0; col < board.length; col++) {
        for (let row = 0; row < board[col].length; row++) {
            let currentCircle = board[col][row];
            if (currentCircle === '') {
                continue; // _____________________________continue means to skip the current iteration of the loop. (i.e. if circle is empty, skip to next part) MDN.
                CHECK HORIZONTAL WIN     
            } if (col <= board.length - 4) { //NOTE ABOUT THIS LINE: cols - 4 means it will look at the next 3 columns and EXCLUDE the 4th. Its not subtracting 4 columns, just creating a hard stop at 3 by excluding the 4th column (it in the intro to arrays lesson)
                let hCount = 1;
                for (let i = 1; i <= 3; i++) {
                    if (board[col + i][row] === currentCircle) { //chatGTP to debug this line. had ==+ instead of ===. 
                        hCount += 1;
                    } else {
                        break;
                    }
                }
                CHECK DIAG DOWN LEFT                 
            } if (col >= 3 && row <= board[col].length - 4) { //NOTE_________________ col must be >= to 3 because we are checking backwards. Col is established to be the outer arry at 0 (our 0 column). You cant subtract from col because that would be -3 (out of bounds). SO you must be at least 3 columns away from outer columns. 
                let lDownCount = 1;
                for (let i = 1; i <= 3; i++) {
                    if (board[col - i][row + i] === currentCircle) {
                        lDownCount += 1;
                    } else {
                        break;
                    }
                } if (lDownCount === 4) {
                    return winner = true;
                }
            }
        }
    }
}



UPDATE BOARDN NOTES_________________________________________________________________

PSEUDOCODE:
 need to access COLUMNS first THEN ROWS.
 Part of your problem is that you're mixing up DOM elements and strings. EX OLD CODE:
 let updateRox = board[i][j];
 if updateRow.innerText === 'R'

 board[j] is a column ARRAY. A list of strings. You can't access it like an actual DOM element. so nothing
 was changing. were mixing up our strings and DOMS. 

function updateBoard() {
    for (let col = 0; col < board.length; col++) {
        for (let row = 0; row < board[col].length; row++) {
            const circleId = `${col}_${row}`; _____________________________necessary to take id of each Circle Div and convert it into a string. 
            _______________This is because HTML elements are strings. so getElementById (how we'll seelect our circles) will expect a string input.
            const circle = document.getElementById(circleId);________________________________selects the circle we want based on its id. 
            const circleValue = board[col][row];_____________________Maps the actuall array of arrays to our board. 
            if (circleValue === "R") {  _________________ANOTHER CHANGE, because we now have a map of our values called circleValue. You do not need the .innerText, because the value of board [col][row] will be either R or B.
                circle.style.backgroundColor = "red";
                circle.style.color = "white";
            } else if (circleValue === "B") {
                circle.style.backgroundColor = "black";
                circle.style.color = "white";
            } else {
                circle.style.backgroundColor = "white";
                circle.innerText = '';
            }
        }
    }
}


BASIC PSEUDOCODE

1) Define the required variables used to track the state of the game.

2) Store cached element references.

3) Upon loading, the game state should be initialized, and a function should 
   be called to render this game state.

4) The state of the game should be rendered to the user.

5) Define the required constants.

6) Handle a player clicking a square with a `dropPiece` function.


*/