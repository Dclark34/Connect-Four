//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `dropPiece` function.





/*-------------------------------- Constants --------------------------------*/
/*ADD WINNING COMBOS LIST HERE. MUST ITERATE OVER EACH OF THESE.*/

const winningCombos = [['0_0', '0_1', '0_2', '0_3', '0_4', '0_5']];

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

//const redMovesLeft = document.querySelector("#redTeamPieces");

//const blackMovesLeft = document.querySelector("#blackTeamPieces");





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
    //ADD RENDER
}




//RESET BOARD
function resetBoard () {
    board = [['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']];
    turn = `R`;
    messageEl.innerText = `It's ${turn} teams move.`;
    winner = false;
    draw = false;
    initialize();
    render();
}


//UPDATE MESSAGE
function updateMessage() {
    if(winner === false && draw === false){
        messageEl.innerHTML = `It's ${turn} teams move.`;
    }else if (winner === false && teamMoves.redTeam === 0 && teamMoves.blackTeam === 0) {
        messageEl.innerHTML = "DRAW!"
    }else { messageEl.innerHTML = `Congrats you won!`; //way to specify team? like congrats ${turn} team you won!
    }
}



//UPDATE BOARD:// need to access COLUMNS first THEN ROWS.
// Part of your problem is that you're mixing up DOM elements and strings. EX OLD CODE:
// let updateRox = board[i][j];
// if updateRow.innerText === 'R'

// board[j] is a column ARRAY. A list of strings. You can't access it like an actual DOM element. so nothing
// was changing. were mixing up our strings and DOMS. 

function updateBoard() {
    for (let col = 0; col < board.length; col++){
        for (let row = 0; row < board[col].length; row++){
            const circleId = `${col}_${row}`; //necessary to take id of each Circle Div and convert it into a string. 
            // This is because HTML elements are strings. so getElementById (how we'll seelect our circles) will expect a string input.
            const circle = document.getElementById(circleId);//selects the circle we want based on its id. 
            const circleValue = board [col][row];// Maps the actuall array of arrays to our board. 
            if (circleValue === "R"){    //ANOTHET CHANGE, because we now have a map of our values called circleValue. You do not need the .innerText, because the value of board [col][row] will be either R or B.
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
        if (turn === 'R'){
            turn = 'B';
        } else {
            turn = 'R';
        }
    }
}


function checkForWinner() {
    for (let col = 0; col < board.length; col++) {
        for (let row = 0; row <board[col].length; row++){
            
        }
    }
}
    
//CLICK FUNCTION // this is also your drop piece handler. 
//Column has been clicked. You hav id for column. You want to use that
//column Id to check if the row array has ANY values. If no value exists, the last
// available slot is styled based on the player whose currently playing. If the last spot 
// DOES have a value, then the next available spot at the END of the array should be styled. 

const clickColumn = (event) => { /// this is your "handleclick".
    let columnId = parseInt(event.currentTarget.id);
    let columnCircles = event.currentTarget.querySelectorAll('.circle');
    console.log(columnId);
    //console.log('currentTarget:', event.currentTarget);
    //console.log('target', event.target);
     if (columnCircles[5].innerText  === '') { 
         board[columnId][5] = turn;
         columnCircles[5].innerText = turn; 
         console.log(board[columnId]);
    } else if (columnCircles[4].innerText  === '') { 
         board[columnId][4] = turn;
         columnCircles[4].innerText = turn; 
         console.log(board[columnId]);
    } else if(columnCircles[3].innerText  === '') { 
        board[columnId][3] = turn;
        columnCircles[3].innerText = turn; 
        console.log(board[columnId]);
    } else if (columnCircles[2].innerText  === '') { 
        board[columnId][2] = turn;
        columnCircles[2].innerText = turn;// HAD TO UPDATE THIS TO ACTUALLY SEE THE UPDATED Values and CHANGE ARRAY. 
        console.log(board[columnId]);
      //  columnCircles[2].innerText = turn; // will use this later
    } else if (columnCircles[1].innerText === ''){
        board[columnId][1] = turn;
        console.log(board[columnId]);
         columnCircles[1].innerText = turn;
    } else if (columnCircles[0].innerText === '') {
        board[columnId][0]= turn;
        console.log(board[columnId]);
        columnCircles[0].innerText = turn;
    } else if (columnCircles.innerText !== ''){
        return;
    }
    updateBoard();
    switchPlayerTurn();
    updateMessage();
}  

// WHY currentTarget.id was necessary:
// currentTarget.id refers to the element the EVENT LISTENER IS ATTACHED TO. 
// So our eventlistener was attached to our Columns, not the individual circle (which is ideal).
//However, this meant that if you clicked a circle, it would return UNDEFINED. 

//SO currentTarget.id always gave us the COLUMN, and therefore the correct id was selected,
// REGARDLESS oof what part inside of the columnn was clicked. 

//original event.target.id was giving us EITHER the column OR the circle. Column was defined,
// circle was not. This is because event.target refers
// to the actual DOM element that was clicked. so clicking on the circle with
// event.target would try and give us the id of the circle divs, which is not the 
// right value for indexing our board [columnId]. (ASK SAM ABOUT HOW THIS GETS PASSED ON.)


// QUESITON FOR SAM: This raises a potential problem. When I click on the array, I get back an
// array with an updated row. However, when we see it in the dev tools it always says 
// "prototype.array(0)". Even for columns in the board[columnId[1]]. Will this be a problem
// later when checking for wins? How will I be able to create those if statements?
// need circle ids I think for win conditions. 




//UPDATE DISPLAY (will reference object piece count.)





/*----------------------------- Event Listeners -----------------------------*/
//LOAD APP

document.addEventListener('DOMContentLoaded', function(){
    initialize();
    columnEls.forEach((column) => {
        column.addEventListener('click', clickColumn,); 
    });
});

//RESTART
restartButton.addEventListener('click', resetBoard);


