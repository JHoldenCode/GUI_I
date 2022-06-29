Application URL: https://jholdencode.github.io/GUI_I/HW_5/scrabble.html

My Github URL: https://github.com/JHoldenCode/GUI_I

IMPLEMENTED FEATURES
-----------------------------

CURRENTLY & FULLY WORKING
My Scrabble Application has many features that work that make the game more enjoyable to play.
It has all of the basic, required features such as being able to drag tiles onto the scrabble
board, submitting a word, scoring the word, keeping track of the score, restarting the game,
dishing out random letters accoring to the actual number of letters in the real game, and 
restarting the game, but it also has more features. One feature I added in that I think will help
the user is the ability to reset your current word. Since you are not allowed to move tiles after
they have been placed, I thought it would be best to help the user in case they make a mistake. I
added in a button that, when letters are present on the board, will send the letters back to the players
rack. It does not score these letters and does not remove them from the letters left in the JSON object,
This button just reverses the previous few actions that the user took in case they chage their mind.
Another feature that I added in is the high score feature. The high score starts off at 0 just like the
regular score. On the first game, it then climbs up at the same rate as the regular score (because you
set a new high score with each increase in points your first game). After you click reset, though, and start
your second game, the high score remains at its value and will only continue to climb if you surpass it.
This allows the user to track their progress throughout multiple games of scrabble and adds more fun to
the game. Users can compete against each other to get the higher high score and continue playing the game.
The only time this high score resets to zero is when the page is reloaded and all the scripts start from
the beginnning. Another feature I added is a backgroud behind each focal point of the screen. This contrasts
each interactable element from the busy (but cool) background image and makes for a more enjoyable experience
with less eye strain.

PARTIALLY WORKING
Some features of this application are still in the partially working stage. For example, the user is able to
enter any string of letters onto the scrabble board. Since I was able to create the scoring functionality,
the program is able to distinguish between which letter was placed in which tile. Using this knowledge, the program could concatenate the individula letters together from the smallest index to the largest in order to create a string of the word. Once we have that the only problem would be to check if that string is contained within the given dictionary which would be as simple as doing a binary search through the dictionary and checking to see if the string in question is present. If it is, continue like normal and award points to the user. If it is not, send the letters back to the rack in the same way as the reset word button functions and ask the user to try again. So all the functionality for this feature is present, just not implemented. Another partially working feature is the responsiveness of the application. As of now, the letter tiles and scrabble board tiles are always in the correct position no matter the size of the window they are in, but the window always stays at the same full size. This was accomplished thorugh absolute positioning and some math to determine what top and left offset each tile should have. If we wanted to make the page more responsive, we could maybe implement a grid or use some bootstrap to change the location of all these tiles based on the actual size of the screen. This has not been fully implemented yet.