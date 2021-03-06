var inquirer = require('inquirer');
var prompt = require('prompt');

var gameOptions = require("./gameword.js"); // holds the array of possible words to be guessed, aka gameword

var computerChoice; // Computer picks a random word from  the gameOptions array
var blanks = "";
var winword = "";
var lives = 6; // According to Wikipedia, the user has 6 lives in this game, this might be set to one for testing only! 

// ---------------------------------------------------------------------------------------------------------------------//

// Word to be guessed: 
gameOptionsLength = gameOptions.length; // finds the length of array "gameOptions"
computerChoice = gameOptions[Math.floor(Math.random() * gameOptionsLength)]; // selects a random word from the "gameOptions" array
gameWord = computerChoice.toUpperCase(); // changes the selected word to all uppercase
gamewordLength = gameWord.length; // finds the length of the randome gameword

var j = 0; // Creates the blanks i.e. Flower has 6 characters and needs 6 blanks _ _ _ _ _ _
while (j < gamewordLength) {
    blanks += " _";
    j++;
}

var j = 0; // Creates the blanks i.e. Flower has 6 characters and needs 6 blanks _ _ _ _ _ _
while (j < gamewordLength) {

    winword += " " + gameWord.charAt(j);
    j++;

}
var main = function myFunction() {

    inquirer.prompt([
            // Here we create a basic text prompt, which asks the user to insert one letter
            // The validation will check that only one letter is inputted. 
            {
                type: 'input',
                message: 'Pick your letter, one letter only \n',
                name: 'letter',
                validate: function(string) {
                    var regEx = new RegExp('^[a-zA-Z\s]{1,1}$');
                    if (regEx.test(string)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            {
                type: 'confirm',
                message: 'Are you sure:',
                name: 'confirm',
                default: true
                // quick input confirm
            }
        ])

        .then(function(inquirerResponse) {
            
            // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
            var userInput = inquirerResponse.letter;
            userInput = userInput.toUpperCase();
            var index = gameWord.indexOf(userInput);
            // console.log("The index is " + index); // uncomment, if you want to see the index
            if (inquirerResponse.confirm) {
                if (index >= 0) {

                    for (var i = 0; i < gamewordLength; i++) {
                        var index = gameWord.indexOf(userInput, i) // indexOf checks whether a character is within a string, if the character exists the return value is >=0

                        // console.log("Later, you will have to guess " + gameWord); // uncomment if you want the gameword to be shown

                        blanks = blanks.split('');
                        blanks[index * 2 + 1] = userInput;
                        blanks = blanks.join('');

                    }
                    if (blanks === winword) {
                    	console.log("\n----------------------------- Word:" + blanks +" -------------------\n");
                    	console.log("\n--------------------------------- YOU WON ----------------------\n");

                    } else {
                    myFunction();
                    console.log("\n----------------------------- Word:" + blanks +" -------------------\n");
                    }

                } else if (index < 0 && lives > 0) {
                    // if index < 0, then the letter the user input does not exist in the gamword
                    lives = lives - 1; // subtracting 1 life

                    console.log('\n---------- Nope, "' + userInput + '" is not existing, try another letter!! --------- \n');
                    console.log("----------------------------- Lives = " + lives + " ----------------------------")

                    myFunction();

             
            } else if (lives === 0) {
                // adding GameOver
                console.log("\n----------------------------- GAMEOVER ----------------------------")
                
            }

        }
});
    }


main();