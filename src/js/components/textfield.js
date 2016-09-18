module.exports = (function() {
	"use strict";

	function Textfield(id, button) {
		this.textfield = document.getElementById(id);
		this.button = button;
	}

	Textfield.prototype.submit = function() {
		var self = this;
		this.textfield.addEventListener('keyup', function(event) {
			if (event.keyCode === 13) {
				// LOL SELF.BUTTON.BUTTON??? FIX
				self.button.button.click();
			}
		});
	}

	return Textfield;
})();