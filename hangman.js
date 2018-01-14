//Requires
	var inquirer = require("inquirer");
	var fs = require("fs");
	var Word = require("./word.js");
	var Letter = require("./letter.js");
//Variables and objects used
	var wordLists = {
		names: ["Hardest Hangman Words", "Most Common Words", "Pathfinder RPG Words"],
		filenames: ["words","words1000","wordsRPG"],
		descriptions: ["The 200 hardest hangman words","The 1000 most commonly used words in the English language","Over 400 words from the Tabletop RPG 'Pathfinder'. All are real words, but some are rarely used."],
		confirmText: ["These are very hard if you use normal hangman methods.", "These words are fairly well known.", "These are words from the Pathfinder RPG."],
		choice: -1,
		curList: []
	}
	var curWord = new Word();
	var letters = {
		used: [],
		unused: [],
		constructed: [],
		wrong: 0,
		maxWrong: 6,
		reset: function() {
			letters.used = [];
			letters.unused = 'abcdefghijklmnopqrstuvwxyz'.split('');
			letters.constructed = [];
			letters.wrong = 0;
		},
		pick: function(char) {
			letters.used.push(char);
			letters.unused.splice(letters.unused.indexOf(char),1);
		}
	}
	Letter.prototype.check = function(dataArr) {
		if(dataArr.indexOf(this.letter) != -1 || this.letter == this.letter.toUpperCase()) {
			this.shown = this.letter;
		} else {
			this.shown = "_";
		}
	};
//Game end
	function end() {
		inquirer
		  .prompt([
		    {
		      type: "confirm",
		      message: "Would you like to play again?",
		      name: "confirm",
		      default: true
		    }
		  ])
		  .then(function(response) {
		  	if(response.confirm){
		  		fs.appendFile( "log.txt", "\nNew Round...", function(error) {

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
		  		newWord();
		  	} else {
		  		fs.appendFile( "log.txt", "\nGame finished", function(error) {

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
		  	}
		  });

	}
//Inquirer to play game
	function letterPicker() {
		//create blanks
			var blanks = "";
			for (var i = 0; i < curWord.word.length; i++) {
				if (i > 0) {
					blanks = blanks + " ";
				}
				blanks = blanks + letters.constructed[i].shown;
			}
			console.log(blanks);
		//inquirer
		inquirer
		  .prompt([
		    {
		      type: "list",
		      message: "Pick a letter!",
		      choices: letters.unused,
		      name: "letter"
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
		  		var curLetter = response.letter;
		  		//update letters (so the letter is 'used')
		    		letters.pick(curLetter);
		    		fs.appendFile( "log.txt", "\n"+curLetter, function(error) {

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
		    	//check if in word
		    		if(curWord.word.indexOf(curLetter) != -1) {
		    			//it is in the word!
		    			console.log(curLetter+" is in the word!");
		    			//We only need to update the letters being shown if it has changed!
		    			var won = true;
		    			
				    	for (var i = 0; i < curWord.word.length; i++) {
		    				// console.log("Cur.word.length:"+curWord.word.length+"\nWon: " + won + "\nOther" + JSON.stringify(letters.constructed, null, 2));

				    		// console.log(letters.used);
				    		// console.log(JSON.stringify(letters.constructed[i]));
							letters.constructed[i].check(letters.used);
				    		// console.log(JSON.stringify(letters.constructed[i]));
							// console.log(letters.constructed[i].shown);
							if (letters.constructed[i].shown == "_") {
								won = false;
							}
						}
						if (won) {
							console.log("Yes! The word was '"+curWord.word+"'. You won!");
							fs.appendFile( "log.txt", "\nWon", function(error) {

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
							end();
						} else {
							letterPicker();
						}
		    		} else {
		    			//it is not in the word...
		    			console.log(curLetter+" is not in the word...");
		    			letters.wrong++;
		    			//need to check if too many letters are wrong.
		    			if(letters.wrong >= letters.maxWrong) {
		    				console.log("You ran out of tries! The word was "+curWord.word);
		    				fs.appendFile( "log.txt", "\nLost", function(error) {

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
		    				end();
		    			} else {
		    				letterPicker();
		    			}
		    		}
		  	} else {
		  		letterPicker();
		  	}
		    

		  });

	}

//Make a new word!
	function newWord() {
		// console.log(JSON.stringify(wordLists.curList, null, 2));
		curWord.reset(wordLists.curList, newWord2);
	}
	//this portion happens after coming back from reseting the word.
	function newWord2(choice) {
		curWord.word = choice;
		// console.log(JSON.stringify(curWord, null, 2));
		// console.log(curWord.word);
		letters.reset();
		curWord.word = curWord.word.trim();
		for (var i = 0; i < curWord.word.length; i++) {
			letters.constructed[i] = new Letter(curWord.word[i]);
			// console.log(curWord.word[i]);
		}			  		
		letterPicker();
	}
//Start up inquirer
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
    	fs.appendFile( "log.txt", "\nLists: "+JSON.stringify(wordLists.curList)+", Added from Command Line", function(error) {

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
		newWord();
	} else {
		setList();
	}