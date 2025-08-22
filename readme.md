![connect four screenshot](./assets/connect_four_wide.png)

# **CONNECT FOUR**

Welcome to Connect Four! The point of the game is simple. Try and get four in a row before the other team does! Winning combos can either be horizontal, vertical or diagonal. As long as there is four in a row, you win! 

## Why I chose Connect Four.

I was inspired to pice this game because it was one that I played frequently as a kid. The games style is reminiscent of the board game from back in the 90's. 

I also wanted to practice manipulating the DOM and iteration over arrays and objects. 



## Instructions

1. Player clicks a column to drop a piece. The column the player clicks will be highlighted in red for visibility. 
2. When a column is clicked, a piece will drop. The game will then alternate whose turn it is. 
3. Players alternate clicking columns until one achieves a win by connecting four pieces in a row horizontally, diagonally, or vertically. 
4. If both players run out of pieces and no winner is declared, the game ends in a draw. 

>Note: The default of the game is to have Red team play first, Black team plays second. 



## Attributions:
1. Google Fonts for styling. 


## Technologies Used.
1. Github
2. VS code
3. MDN.com
4. General Assembly Lessons
5. Google
6. Chat GPT 

>*Chat GPT was utilized for some minor debugging (one particular one that stumped both the TA and I), as well as a pseudocode brainstorm/breakdown for my horizontal win condition (i.e. how to implement a counter within a loop for a certain condition).*



Original pseudocode and planning materials:
```
1. Define any variables used to track state of the game:
	-A Board variable (an empty array of arrays)
	-The Player’s turn
	-Match result (win lose draw)
	-Piece Counter (connect 4 has only 21 pieces per player)

2. Cached Element References:
	-circleEls (spot where piece is dropped to).
	-messageEl (display that updates to whose turn it is, win, lose, tie)
	-reset button (resets board, turn, win conditions, piece counter)
	-columnEls (column that player SELECTS when dropping a piece).

3. Constants:
	-Winning Combos (Array of possible winning combos. Defined by column (class A, B, C, D, E, F, G) and circle element id that becomes index for column array (id 0, 1, 2, 3, 4, 5, 6). (Might define circle ids as “A0” “A1” with zero being bottom most circle and “A5” being the top circle on the left most column. Like Below:

id = A0
id = A1
id = A2 
id = A3
id = A4 
id = A5
id = A6

etc.


***HTML will consist of section (id = board, cssflex box) for the board, a div (class = column, flexbox) that the player selects, then smaller
Divs (our circles) that turn color when a piece is dropped there. Players should see a column highlighted as they hover over it to make sure they know what column they are selecting (would also like to highlight the next available circle in that column as well)

4. -Handle a player clicking a button (reset)
	-Handle a player clicking a column

5. Generate random? (Not sure if random is correct or if it should be 2-player within browser like tic tac toe) selections for computer player

6. Each player ONLY has 21 pieces. Must be an object that counts down how many pieces player has left. (Include in click function? 
	when it clicks, -1 to pieces/moves counter)

7.Functions:
	-update board
	-update message
	-reset board
	-dropPiece
	-checkforWinner
	-checkforTie
	-switchPlayerTurn
	-handleClick
	-render
	-***updatePieceCounter (would this be a method for an object or a standalone function? I’m thinking of the depleting
		poke-balls counter and how I can link something like that to the game logic. Where if your available pieces = 0 => game 		over / draw/ can’t click the board anymore).  
```
