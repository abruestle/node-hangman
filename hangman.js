//Requires
	var inquirer = require("inquirer");
	var fs = require("fs");
	var word = require("./word.js");
	var letter = require("./letter.js");


//Inquirer to access game
	inquirer
	  .prompt([
	    // Here we create a basic text prompt.
	    {
	      type: "input",
	      message: "Pick a letter!",
	      name: "username"
	    },
	    {
	      type: "confirm",
	      message: "Are you sure:",
	      name: "confirm",
	      default: true
	    },
	    // Here we create a basic password-protected text prompt.
	    {
	      type: "password",
	      message: "Set your password",
	      name: "password"
	    },
	    {
	      type: "confirm",
	      message: "Are you sure:",
	      name: "confirm",
	      default: true
	    },
	    // Here we give the user a list to choose from.
	    {
	      type: "list",
	      message: "Which Pokemon do you choose?",
	      choices: ["Bulbasaur", "Squirtle", "Charmander"],
	      name: "pokemon"
	    },
	    // Here we ask the user to confirm.
	    {
	      type: "confirm",
	      message: "Are you sure:",
	      name: "confirm",
	      default: true
	    }
	  ])
	  .then(function(inquirerResponse) {
	    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
	    if (inquirerResponse.confirm) {
	      console.log("\nWelcome " + inquirerResponse.username);
	      console.log("Your " + inquirerResponse.pokemon + " is ready for battle!\n");
	    }
	    else {
	      console.log("\nThat's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
	    }
	  });
