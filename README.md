# node-hangman
This is a hangman game from command line using Node

## Start here: [Game - start using node](hangman.js)


## Word Lists:

* You can input the word lists you want to use directly in the command line, or you can use Inquirer to choose one.
* Current word lists: "words", "words1000", and "wordsRPG"
* more lists can be added by editting wordLists.name, and wordLists.filename, located lines 8, and 9. wordLists.descriptions and wordLists.confirmText are not in use yet, but if you add them, the additional code will work with them as well. Names of lists can be whatever, but filenames should be everything before the .txt. Words should be one per line with no extra spaces before or after.

##Input:

#### node word words1000
* brings up just the words1000 list

#### node word words words1000 wordsRPG
* brings up random words from words, words1000, and the wordsRPG lists.

#### node word
* brings up inquirer to select word lists.

* After you select a set of word lists, your first word will be automatically randomly picked from one of the lists. All further words while you are playing will come from the same set of lists.

# Please enjoy!

#### What next/Suggestions welcome
While the basic function is working, there are a few additional ideas I would like to add. If anyone wants to contribute additional suggestions, I would love to hear them!

- [x] Allow spaces or alternate characters in words. Currently the word lists will accept that, but they appear as blanks and you can't guess them, so they would be impossible. All that is needed is checking if the letter is in the alphabet (maybe check that lowercase equals uppercase?) before making it blank.
- [ ] Add descriptions to inquirer for the word lists. While this would easily be added by just making the names include the descriptions, I want to experiment with inquirer to see how it could be done without the full description being the output...possibly using filters.
- [ ] Add a different confirmation text based on which word lists you choose. Probably will need a second inquirer statement for that.
- [ ] More word lists!
- [ ] Foreign word lists (I know some French, Japanese, and Dutch, and it would be good to have some volcab game). Program will also warn which language it is in.
- [ ] In combination with the foreign word lists, alternate alphabets used if needed.

## Further word lists suggestions:
Please help me add to this list!

* Intro to French
* Intro to Japanese (Romaji only for now...)
* Intro to Dutch
* Easiest Hangman Words (I have yet to find a list for this...)
* Programming words and terms