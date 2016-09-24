module.exports = (function() {
	"use strict";
	const Button = require('./button.js');
	const Textfield = {
		create_textfield(callback) {
			return Object.create(this.textfield[callback]);
		},

		textfield: {
			submit_textfield: {
				submit() {
					const text = document.getElementById('submit_textfield');
					const submit_button = Button.create_button('submit_button');

					text.addEventListener('keyup', function(event) {
						if (event.keyCode === 13) {
							submit_button.submit();
						}
					});				
				}
			}
		}
	}
	return Textfield;
})();