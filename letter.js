function Letter(character) {
	this.letter = character;
	this.shown = "_";
	this.show = function() {
		this.shown = this.letter + " ";
	};
	this.hide = function() {
		this.shown = "_ ";
	};
	this.check = function(dataArr) {
		if(dataArr.indexOf(this.letter) != -1) {
			this.show;
		} else {
			this.hide;
		}
	};
};

module.exports = Letter;