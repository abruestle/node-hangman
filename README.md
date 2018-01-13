# node-hangman
Hangman game from command line using Node

Word Lists:
- You can input the word lists you want to use directly in the command line, or you can use Inquirer to choose one.
- Current word lists: "words", "words1000", and "wordsRPG"
- more lists can be added by editting wordLists.name, and wordLists.filename, located lines 8, and 9. wordLists.descriptions and wordLists.confirmText are not in use yet, but if you add them, the additional code will work with them as well. Names of lists can be whatever, but filenames should be everything before the .txt. Words should be one per line with no extra spaces before or after.

Input:
node word words1000
-brings up just the words1000 list
node word words words1000 wordsRPG
-brings up random words from words, words1000, and the wordsRPG lists.
node word
-brings up inquirer to select word lists.

After you select a set of word lists, your first word will be automatically randomly picked from one of the lists. All further words while you are playing will come from the same set of lists.