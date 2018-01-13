function Letter(character) {
	this.letter = character;
	this.shown = "_";
	this.check = function(dataArr) {
		if(dataArr.indexOf(this.letter) != -1) {
			this.shown = this.letter;
		} else {
			if(this.letter == this.letter.toUpperCase()){
				this.shown = "_";
			}
		}
	};
};

module.exports = Letter;