var fs = require('fs')

function Word() {
	this.word = "";
	this.reset = function(lists) {
		//Select used list
			listUsed = lists[Math.floor(Math.random()*lists.length)] + ".txt";
		//makes a new word
			fs.readFile(listUsed, "utf8", function(error, data) {
				// If the code experiences any errors it will log the error to the console.
					if (error) {
						return console.log(error);
						fs.appendFile( "log.txt", "\n"+ JSON.stringify(error, null, 2), function(err) {
							// If an error was experienced we say it.
							if (err) {
								console.log(err);
							}
						});
					}
			  	//For doing a random word (splits at line)
			  		var allOptions = data.split("\n");
			  	// We will then print the contents of data
			  		var randomChoice = allOptions[Math.floor( Math.random() * allOptions.length)];
					console.log(randomChoice);
					fs.appendFile( "log.txt", "\n" + randomChoice, function(error) {
						// If an error was experienced we say it.
							if (error) {
						    	console.log(error);
							}
					});
				//And set the word!
			  		this.word = randomChoice;
				//Log the word!
		  			fs.appendFile( "log.txt", "\n"+ this.word, function(err) {
						// If an error was experienced we say it.
							if (err) {
						    	console.log(err);
							}
			  		});
			  	//This is all asyncronous! We need something to go back!

			});

	};
	this.check = function(char) {
		//gives array back of where character shows up

	};
};

module.exports = Word;