//Requires
	var inquirer = require("inquirer");
	var fs = require("fs");
	var word = require("./word.js");
	var letter = require("./letter.js");
//Letters object
	//this is not a constructor because there is only one.
	var letters = {
		used: [],
		unused: [],
		reset: function() {
			letters.used = [];
			letters.unused = 'abcdefghijklmnopqrstuvwxyz'.split('');
		},
		pick: function(char) {
			letters.used.push(char);
			letters.unused.splice(letters.unused.indexOf(char),1);
		}
	}
//Inquirer to play game
	function letterPicker() {
		inquirer
		  .prompt([
		    // Here we create a basic text prompt.
		    {
		      type: "list",
		      message: "Pick a letter!",
		      choices: letters.unused,
		      name: "letter",
			    //If validating rather than list
			      // validate: function(char) {
			      // 	if(letters.used.indexOf(char) == -1) {
			      // 		return true;
			      // 	} else {
			      // 		return "Please pick a letter you have not used.";
			      // 	}
			      	
			      // }
		      
		    },
		    {
		      type: "confirm",
		      message: "Are you sure:",
		      name: "confirm",
		      default: true
		    }
		  ])
		  .then(function(response) {
		  	if(response.confirm){
		  		//update letters
		    		letters.pick(response.letter);
		    	//check if in word
		    	//update each letter shown
		  	}
		    

		  });

	}

//Make a new word!
	function newWord(argument) {
		// body...
	}
//Start up inquirer
	var wordLists = {
		names: ["Hardest Hangman Words", "Most Common Words", "Pathfinder RPG Words"],
		filenames: ["words","words1000","wordsRPG"],
		descriptions: [],
		confirmText: ["These are very hard if you use normal hangman methods.", "These words are fairly well known.", "These are words from the Pathfinder RPG."],
		choice: -1,
		curList: []
	}
	function setList() {
		inquirer
		    .prompt([
		      // Here we create a basic text prompt.
		            // Here we give the user a list to choose from.
		      {
		        type: "checkbox",
		        message: "Word lists to use:",
		        choices: wordLists.names,
		        filter: function(values) {
		        	//change names to filenames
		        	var curList = [];
		        	for(i = 0; i < values.length; i++) {
		        		var num = wordLists.names.indexOf(values[i]);
		        		curList[i] = wordLists.filenames[num];
		        	}
		        	return curList;
		        },
		        name: "words",
		        validate: function(answer) {
					if (answer.length < 1) {
						return 'You must choose at least one list.';
					}
					return true;
				}
		      },
		      {
		      	type: "confirm",
		      	message: "Are you sure?",
		      	name: "confirm"
		      }
		    ])
		    .then(function(inquirerResponse) {
		    	wordLists.curList = inquirerResponse.words
		    	// console.log(JSON.stringify(wordLists.curList, null, 2));
		    	// console.log(typeof inquirerResponse.words);
		    	fs.appendFile( "log.txt", "\nLists: "+inquirerResponse.words+", Confirmed: "+inquirerResponse.confirm, function(error) {

				  // If an error was experienced we say it.
				  if (error) {
				    console.log(error);
				    fs.appendFile( "log.txt", "\n"+ JSON.stringify(error, null, 2), function(err) {
					  // If an error was experienced we say it.
					  if (err) {
					    console.log(err);
					  }
				  	});
				  }
				});
		    	if(inquirerResponse.confirm) {
		    		newWord();
		    	} else {
		    		console.log("Choose again...");
		    		setList();
		    	}
		    	
		    });
	}
//Start up command line
	if (process.argv[2]) {
		//if an input is given for list of words
		wordLists.curList = process.argv.splice(2, process.argv.length - 2);
		newWord();
	} else {
		setList();
	}