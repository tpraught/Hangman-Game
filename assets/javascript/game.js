// Initializing Variables
// --------------------------------------------------------------------------------------------------------------
// Arrays for holding data
var wordSelections = ["christmas", "candy cane", "rudolph", "cookies", "santa", "frosty", "the grinch", "mistletoe"];
var chosenWord = "";
var lettersInWord = [];
var numDashes = 0;
var dashesVsLetters = [];
var wrongGuesses = [];

var numWins = 0;
var numLosses = 0;
var guessesLeft = 9;

// Global Functions
// --------------------------------------------------------------------------------------------------------------
function beginGame () {
	chosenWord = wordSelections[Math.floor(Math.random() * wordSelections.length)];
	lettersInWord = chosenWord.split("");
	numDashes = lettersInWord.length;

	// Restarting game data
	guessesLeft = 9;
	wrongGuesses = [];
	dashesVsLetters = [];

	// Creating the right number of dashshoes 
	for (var i=0; i<numDashes; i++) {
		dashesVsLetters.push("_");
	}

	// Updating HTML
	document.getElementById("hangmanWord").innerHTML = dashesVsLetters.join(" ");
	document.getElementById("guessesLeft").innerHTML = guessesLeft;
	document.getElementById("numWins").innerHTML = numWins;
	document.getElementById("numLosses").innerHTML = numLosses;

	// Testing code
	console.log(chosenWord);
	console.log(lettersInWord);
	console.log(numDashes);
	console.log(dashesVsLetters);
}

// Need to compare the letter chosen is within the chosen word
function compareLetters(letter) {
	// Comparing if the letter exists within chosen word
	var isLetterInWord = false;

	for (var i=0; i<numDashes; i++) {
		if (chosenWord[i] == letter) {
			isLetterInWord = true;
		}
	}

	// Where does the letter exist in word, then populate array
	if (isLetterInWord) {

		for (var i=0; i<numDashes; i++) {
			if (chosenWord[i] == letter) {
				dashesVsLetters[i] = letter;
			}
		}
	}

	// Run when the letter isn't found in chosen word
	else {
		wrongGuesses.push(letter);
		guessesLeft--
	}

	// Testing
	console.log(dashesVsLetters);

}

// Run when the round is complete

function roundOver() {

	// Update HTML with number of guesses left and win/loss count
	document.getElementById("guessesLeft").innerHTML = guessesLeft;
	document.getElementById("hangmanWord").innerHTML = dashesVsLetters.join(" ");
	document.getElementById("wrongGuesses").innerHTML = wrongGuesses.join(" ");

	// User won
	if (lettersInWord.toString() == dashesVsLetters.toString()) {
		numWins++
		alert("You won!!");

		// Update HTML
		document.getElementById("numWins").innerHTML = numWins;

		beginGame();
	}

	// User Lost
	else if (guessesLeft == 0) {
		numLosses++
		alert("You lost :(");

		// Update HTML
		document.getElementById("numLosses").innerHTML = numLosses;

		beginGame();
	}

	// Testing
	console.log("Win Count: " + numWins + " | Loss Count: " + numLosses + " | Guesses Left: " + guessesLeft);
}

// Main Process
// --------------------------------------------------------------------------------------------------------------
// Initializes code and restarts the game
beginGame();

// Capturing keystroke
document.onkeyup = function(event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	compareLetters(letterGuessed);
	roundOver();

	// Testing code
	console.log(letterGuessed);
}